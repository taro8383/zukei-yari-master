import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { CalculationRulesQuestion, CalculationRulesTopic, CALCULATION_RULES_TOPICS } from '@/lib/calculationRules';
import OrderOfOperationsTree from './OrderOfOperationsTree';
import AreaModel from './AreaModel';

interface CalculationRulesQuestionItemProps {
  question: CalculationRulesQuestion;
  index: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  graded: boolean;
  isCorrect?: boolean;
  onTeachMe?: () => void;
  // For multi-step questions
  stepAnswers?: string[];
  onStepAnswerChange?: (stepIndex: number, value: string) => void;
  // For equation building
  equationAnswer?: string;
  onEquationChange?: (equation: string) => void;
}

const CalculationRulesQuestionItem = ({
  question,
  index,
  userAnswer,
  onAnswerChange,
  graded,
  isCorrect,
  onTeachMe,
  stepAnswers = [],
  onStepAnswerChange,
  equationAnswer = '',
  onEquationChange,
}: CalculationRulesQuestionItemProps) => {
  const [showHint, setShowHint] = useState(false);
  const topicInfo = CALCULATION_RULES_TOPICS[question.topic];

  // Get hint text based on topic
  const getHintText = () => {
    switch (question.topic) {
      case 'order-of-operations':
        if (question.expression?.includes('(')) {
          return {
            ja: (
              <>
                💡 <strong>順序のきまり:</strong><br />
                ① かっこの中を先に計算<br />
                ② その答えで次の計算<br />
                ③ 自分で計算して答えを出そう！
              </>
            ),
            en: (
              <>
                <strong>Order Rules:</strong><br />
                ① Parentheses first<br />
                ② Then use that result<br />
                ③ Calculate yourself!
              </>
            ),
          };
        }
        return {
          ja: (
            <>
              💡 <strong>順序のきまり:</strong><br />
              ① かけ算(×)とわり算(÷)を先に<br />
              ② たし算(+)とひき算(-)はあと<br />
              ③ 自分で計算して答えを出そう！
            </>
          ),
          en: (
            <>
              <strong>Order Rules:</strong><br />
              ① Multiply/Divide first<br />
              ② Add/Subtract last<br />
              ③ Calculate yourself!
            </>
          ),
        };
      case 'calculate-smartly':
        return {
          ja: (
            <>
              💡 <strong>コツ:</strong> ぴったり100や1000になるペアを探そう！<br />
              <strong>例:</strong> 25 × 4 = 100, 125 × 8 = 1000
            </>
          ),
          en: (
            <>
              <strong>Tip:</strong> Look for pairs that make exactly 100 or 1000!<br />
              <strong>Example:</strong> 25 × 4 = 100, 125 × 8 = 1000
            </>
          ),
        };
      case 'distributive-property':
        return {
          ja: (
            <>
              💡 <strong>ステップ1:</strong> むずかしい数を100に近い数に分ける<br />
              <strong>ステップ2:</strong> かんたんなかけ算をする<br />
              <strong>ステップ3:</strong> 最後に足すまたは引く
            </>
          ),
          en: (
            <>
              <strong>Step 1:</strong> Split the hard number into parts near 100<br />
              <strong>Step 2:</strong> Do the easy multiplication<br />
              <strong>Step 3:</strong> Add or subtract at the end
            </>
          ),
        };
      case 'combining-into-one-equation':
        return {
          ja: (
            <>
              💡 <strong>ステップ1:</strong> 問題を読んで、先に計算する部分を見つける<br />
              <strong>ステップ2:</strong> 先に計算する部分を( )で囲む<br />
              <strong>ステップ3:</strong> 1つの式にまとめる
            </>
          ),
          en: (
            <>
              <strong>Step 1:</strong> Read the problem and find what to calculate first<br />
              <strong>Step 2:</strong> Put parentheses ( ) around the first part<br />
              <strong>Step 3:</strong> Combine into one equation
            </>
          ),
        };
      default:
        return { ja: '', en: '' };
    }
  };

  const hintText = getHintText();

  // Render visual aid based on topic
  const renderVisualAid = () => {
    // Only show visual aids AFTER grading (for review), not before answering
    if (!graded) {
      return null;
    }

    if (question.topic === 'order-of-operations' && question.expression) {
      return (
        <OrderOfOperationsTree
          expression={question.expression}
          highlightStep={0}
          steps={question.steps}
        />
      );
    }

    if (question.topic === 'distributive-property' && question.visualAid?.data) {
      const { baseNum, adjustment, multiplier, isAddition } = question.visualAid.data;
      return (
        <AreaModel
          baseNum={baseNum}
          adjustment={adjustment}
          multiplier={multiplier}
          isAddition={isAddition}
        />
      );
    }

    return null;
  };

  // Check if this is a multi-step question (distributive property)
  const isMultiStep = question.isMultiStep && question.stepPrompts && question.stepAnswers;

  // Check if this is equation building topic
  const isEquationBuilder = question.topic === 'combining-into-one-equation';

  // Handle equation button clicks
  const handleEquationButton = (part: string) => {
    onEquationChange?.(equationAnswer + part);
  };

  // Handle backspace for equation
  const handleEquationBackspace = () => {
    onEquationChange?.(equationAnswer.slice(0, -1));
  };

  // Handle clear for equation
  const handleEquationClear = () => {
    onEquationChange?.('');
  };

  return (
    <div
      className={`bg-card rounded-2xl shadow-kid p-5 border-2 transition-all ${
        graded
          ? isCorrect
            ? 'border-correct'
            : 'border-incorrect'
          : 'border-border hover:border-primary/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="text-lg font-medium leading-relaxed">{question.text}</p>
          <p className="text-sm text-gray-500 mb-4">{question.textEn}</p>

          {/* Visual Aid */}
          {renderVisualAid() && (
            <div className="mb-4">
              {renderVisualAid()}
            </div>
          )}

          {/* Hint Toggle */}
          {!graded && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-gray-500 hover:text-primary transition-colors mb-3 flex items-center gap-1"
            >
              <span>{showHint ? '💡 ヒントをかくす' : '💡 ヒントをみる'}</span>
              <span className="text-xs">({showHint ? 'Hide hint' : 'Show hint'})</span>
            </button>
          )}

          {/* Hint */}
          {(showHint || graded) && !isCorrect && (
            <div className="bg-kid-yellow/10 rounded-lg p-3 mb-4 text-sm">
              {graded ? (
                <>
                  <p className="font-medium text-foreground">{question.explanation}</p>
                  <p className="text-gray-500">{question.explanationEn}</p>
                </>
              ) : (
                <>
                  <div className="font-medium text-foreground">{hintText.ja}</div>
                  <div className="text-gray-500">{hintText.en}</div>
                </>
              )}
            </div>
          )}

          {/* Equation Builder for combining-into-one-equation topic */}
          {isEquationBuilder && (
            <div className="mb-4 bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
              <p className="font-bold text-foreground mb-3">
                1つの式を作りましょう / Build one equation:
              </p>

              {/* Equation Display */}
              <div className="bg-background rounded-lg p-3 mb-3 min-h-[48px] flex items-center justify-center font-mono text-lg font-bold border-2 border-input">
                {equationAnswer || <span className="text-muted-foreground text-sm">式をここに作る / Build equation here...</span>}
              </div>

              {/* Feedback when graded */}
              {graded && (
                <div className={`mb-3 text-sm font-bold ${equationAnswer.replace(/\s/g, '') === question.correctEquation?.replace(/\s/g, '') ? 'text-green-600' : 'text-red-500'}`}>
                  {equationAnswer.replace(/\s/g, '') === question.correctEquation?.replace(/\s/g, '')
                    ? '✓ 正しい式です！ / Correct equation!'
                    : `✗ 正しい式: ${question.correctEquation}`}
                </div>
              )}

              {/* Equation Builder Buttons */}
              {!graded && (
                <div className="space-y-2">
                  {/* Numbers */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground self-center mr-1">数字:</span>
                    {question.numbers?.map((num) => (
                      <button
                        key={num}
                        onClick={() => handleEquationButton(num.toString())}
                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg font-bold text-primary transition-colors"
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  {/* Operators */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground self-center mr-1">記号:</span>
                    {['+', '-', '×', '÷', '(', ')'].map((op) => (
                      <button
                        key={op}
                        onClick={() => handleEquationButton(` ${op} `)}
                        className="px-3 py-1.5 bg-kid-purple/10 hover:bg-kid-purple/20 rounded-lg font-bold text-kid-purple transition-colors"
                      >
                        {op}
                      </button>
                    ))}
                  </div>

                  {/* Controls */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleEquationBackspace}
                      className="px-3 py-1.5 bg-kid-yellow/20 hover:bg-kid-yellow/30 rounded-lg font-bold text-foreground transition-colors"
                    >
                      ← けす / Back
                    </button>
                    <button
                      onClick={handleEquationClear}
                      className="px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg font-bold text-red-600 transition-colors"
                    >
                      クリア / Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Answer Input Section */}
          {isMultiStep && question.stepPrompts ? (
            // Multi-step input for distributive property
            <div className="space-y-3">
              {question.stepPrompts.map((prompt, stepIdx) => (
                <div key={stepIdx} className="flex items-center gap-3 flex-wrap">
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium text-sm">{prompt.ja}</span>
                    <span className="text-xs text-gray-500">{prompt.en}</span>
                  </div>
                  {!graded ? (
                    <input
                      type="number"
                      step="1"
                      value={stepAnswers[stepIdx] || ''}
                      onChange={(e) => onStepAnswerChange?.(stepIdx, e.target.value)}
                      disabled={graded}
                      className="w-24 h-10 text-center text-lg font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                      placeholder="?"
                    />
                  ) : (
                    <>
                      <input
                        type="number"
                        value={stepAnswers[stepIdx] || ''}
                        disabled
                        className={`w-24 h-10 text-center text-lg font-bold rounded-xl border-2 ${
                          parseInt(stepAnswers[stepIdx]) === question.stepAnswers?.[stepIdx]
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                        } opacity-60`}
                      />
                      {parseInt(stepAnswers[stepIdx]) === question.stepAnswers?.[stepIdx] ? (
                        <span className="text-2xl font-black text-green-500">〇</span>
                      ) : (
                        <span className="text-xl font-black text-red-500">×</span>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Final answer */}
              <div className="flex items-center gap-3 flex-wrap pt-3 border-t border-border">
                <div className="flex flex-col">
                  <span className="text-foreground font-medium">答え：</span>
                  <span className="text-xs text-gray-500">Answer:</span>
                </div>
                {!graded ? (
                  <input
                    type="number"
                    step="1"
                    value={userAnswer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    disabled={graded}
                    className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                    placeholder="?"
                  />
                ) : (
                  <>
                    <input
                      type="number"
                      value={userAnswer}
                      disabled
                      className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background opacity-60"
                    />
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="text-4xl font-black text-green-500">〇</span>
                      ) : (
                        <span className="text-3xl font-black text-red-500">×</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            // Single input for other topics
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex flex-col">
                <span className="text-foreground font-medium">答え：</span>
                <span className="text-xs text-gray-500">Answer:</span>
              </div>

              {!graded ? (
                <>
                  <input
                    type="number"
                    step="1"
                    value={userAnswer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    disabled={graded}
                    className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                    placeholder="?"
                  />
                </>
              ) : (
                <>
                  <input
                    type="number"
                    value={userAnswer}
                    disabled
                    className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background opacity-60"
                  />
                  <div className="flex items-center gap-2 animate-bounce-in">
                    {isCorrect ? (
                      <span className="text-4xl font-black text-green-500">〇</span>
                    ) : (
                      <>
                        <span className="text-3xl font-black text-red-500">×</span>
                        <span className="text-sm text-red-500 font-bold">
                          {question.formula}
                        </span>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Formula for incorrect multi-step answers */}
          {graded && !isCorrect && isMultiStep && (
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-sm text-red-500 font-bold">
                {question.formula}
              </span>
              <span className="text-xs text-red-400 block">
                {question.formulaEn}
              </span>
            </div>
          )}

          {/* Teach Me Button for incorrect answers */}
          {graded && !isCorrect && onTeachMe && (
            <button
              onClick={onTeachMe}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-sm font-medium transition-colors mt-3"
            >
              <Lightbulb className="w-4 h-4" />
              <span>おしえて / Teach Me</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculationRulesQuestionItem;
