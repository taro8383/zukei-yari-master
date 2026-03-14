import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { DivisionQuestion, DivisionTopic } from '@/lib/division';
import DivisionBracket from './DivisionBracket';
import GroupingModel from './GroupingModel';

interface DivisionQuestionItemProps {
  question: DivisionQuestion;
  index: number;
  // For division with remainder
  quotientAnswer?: string;
  remainderAnswer?: string;
  onQuotientChange?: (value: string) => void;
  onRemainderChange?: (value: string) => void;
  // For long division and properties (step answers)
  stepAnswers?: string[];
  onStepAnswerChange?: (stepIndex: number, value: string) => void;
  // For final answer
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  graded: boolean;
  isCorrect?: boolean;
  onTeachMe?: () => void;
}

const DivisionQuestionItem = ({
  question,
  index,
  quotientAnswer,
  remainderAnswer,
  onQuotientChange,
  onRemainderChange,
  stepAnswers = [],
  onStepAnswerChange,
  userAnswer,
  onAnswerChange,
  graded,
  isCorrect,
  onTeachMe,
}: DivisionQuestionItemProps) => {
  const [showHint, setShowHint] = useState(false);

  // Get hint text based on topic
  const getHintText = () => {
    switch (question.topic) {
      case 'division-with-remainder':
        return {
          ja: (
            <>
              💡 <strong>ステップ1:</strong> {question.dividend} ÷ {question.divisor} = ?<br />
              <strong>ステップ2:</strong> あまりは {question.divisor} より小さくなるよ
            </>
          ),
          en: (
            <>
              <strong>Step 1:</strong> {question.dividend} ÷ {question.divisor} = ?<br />
              <strong>Step 2:</strong> The remainder must be less than {question.divisor}
            </>
          ),
        };
      case 'long-division':
        return {
          ja: (
            <>
              💡 <strong>筆算の4コンボ:</strong><br />
              ① たてる → ② かける → ③ ひく → ④ おろす
            </>
          ),
          en: (
            <>
              <strong>4-Step Combo:</strong><br />
              1. Estimate → 2. Multiply → 3. Subtract → 4. Bring down
            </>
          ),
        };
      case 'division-properties':
        return {
          ja: (
            <>
              💡 <strong>コツ:</strong> 両方の数を同じ数で割ると簡単になるよ！<br />
              例：84 ÷ 12 → 42 ÷ 6 = 7
            </>
          ),
          en: (
            <>
              <strong>Tip:</strong> Divide both numbers by the same factor to simplify!<br />
              Example: 84 ÷ 12 → 42 ÷ 6 = 7
            </>
          ),
        };
      case 'long-division-2digit':
        return {
          ja: (
            <>
              💡 <strong>2けた筆算のコツ:</strong><br />
              ① {question.divisor} × ? = {question.dividend} またはそれ以下の数を見つける<br />
              ② かけ算して、ひき算する
            </>
          ),
          en: (
            <>
              <strong>2-Digit Long Division Tip:</strong><br />
              1. Find what number × {question.divisor} = {question.dividend} (or less)<br />
              2. Multiply and subtract
            </>
          ),
        };
      case 'mental-division':
        return {
          ja: (
            <>
              💡 <strong>暗算のコツ:</strong> 0を1つずつ消してから計算！<br />
              例：600 ÷ 20 → 60 ÷ 2 = 30
            </>
          ),
          en: (
            <>
              <strong>Mental Math Tip:</strong> Cancel one zero from each, then calculate!<br />
              Example: 600 ÷ 20 → 60 ÷ 2 = 30
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
    // Don't show GroupingModel before grading - it reveals the answer by showing items
    // It will be shown in the explanation after grading instead
    if (question.topic === 'division-with-remainder') {
      return (
        <div className="bg-kid-yellow/10 rounded-xl p-4 border border-kid-yellow/30">
          <p className="text-sm font-bold text-foreground mb-2 text-center">
            📦 あまりのあるわり算 / Division with Remainder
          </p>
          <div className="text-center space-y-2">
            <p className="text-lg">
              <span className="font-bold">{question.dividend}</span> ÷ <span className="font-bold">{question.divisor}</span> = ? ... ?
            </p>
            <p className="text-xs text-muted-foreground">
              計算して、商とあまりを求めよう / Calculate to find the quotient and remainder
            </p>
          </div>
        </div>
      );
    }

    if (question.topic === 'long-division' || question.topic === 'long-division-2digit') {
      return (
        <DivisionBracket
          dividend={question.dividend}
          divisor={question.divisor}
          showSteps={true}
        />
      );
    }

    if (question.topic === 'division-properties') {
      // Don't show the simplified version - let students figure it out
      return (
        <div className="bg-kid-green/10 rounded-xl p-4 border border-kid-green/30">
          <p className="text-sm font-bold text-foreground mb-2 text-center">
            ⚡ わり算の性質 / Division Property
          </p>
          <div className="text-center space-y-2">
            <p className="text-lg">
              <span className="font-bold">{question.dividend}</span> ÷ <span className="font-bold">{question.divisor}</span> = ?
            </p>
            <p className="text-xs text-muted-foreground">
              ヒント：両方の数を同じ数で割ると簡単になるよ / Hint: Divide both numbers by the same amount to simplify
            </p>
          </div>
        </div>
      );
    }

    if (question.topic === 'mental-division') {
      // For mental division, DON'T show the simplified version - let students figure it out
      return (
        <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
          <p className="text-sm font-bold text-foreground mb-2 text-center">
            🧠 暗算の問題 / Mental Math Problem
          </p>
          <div className="text-center space-y-2">
            <p className="text-lg">
              <span className="font-bold">{question.dividend}</span> ÷ <span className="font-bold">{question.divisor}</span> = ?
            </p>
            <p className="text-xs text-muted-foreground">
              ヒント：両方の数から0を同じ数だけ消せるよ / Hint: Cancel the same number of zeros from both
            </p>
          </div>
        </div>
      );
    }

    return null;
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

          {/* Hint - Show GroupingModel after grading for division-with-remainder */}
          {(showHint || graded) && (
            <div className="mb-4">
              {graded && question.topic === 'division-with-remainder' && (
                <GroupingModel
                  dividend={question.dividend}
                  divisor={question.divisor}
                  quotient={question.quotient}
                  remainder={question.remainder}
                />
              )}
              {!isCorrect && (
                <div className="bg-kid-yellow/10 rounded-lg p-3 text-sm mt-3">
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
            </div>
          )}

          {/* Answer Input Section */}
          {question.topic === 'division-with-remainder' ? (
            // Two inputs for quotient and remainder
            <div className="flex items-center gap-3 flex-wrap">
              {/* Quotient */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-foreground font-medium">答え：</span>
                  <span className="text-xs text-gray-500">Answer:</span>
                </div>
                {!graded ? (
                  <input
                    type="number"
                    step="1"
                    value={quotientAnswer || ''}
                    onChange={(e) => onQuotientChange?.(e.target.value)}
                    disabled={graded}
                    className="w-24 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                    placeholder="?"
                  />
                ) : (
                  <input
                    type="number"
                    value={quotientAnswer || ''}
                    disabled
                    className={`w-24 h-12 text-center text-xl font-bold rounded-xl border-2 ${
                      parseInt(quotientAnswer || '0') === question.quotient
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                    } opacity-60`}
                  />
                )}
              </div>

              <span className="text-2xl text-muted-foreground">...</span>

              {/* Remainder */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-foreground font-medium">あまり：</span>
                  <span className="text-xs text-gray-500">Remainder:</span>
                </div>
                {!graded ? (
                  <input
                    type="number"
                    step="1"
                    value={remainderAnswer || ''}
                    onChange={(e) => onRemainderChange?.(e.target.value)}
                    disabled={graded}
                    className="w-24 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                    placeholder="?"
                  />
                ) : (
                  <input
                    type="number"
                    value={remainderAnswer || ''}
                    disabled
                    className={`w-24 h-12 text-center text-xl font-bold rounded-xl border-2 ${
                      parseInt(remainderAnswer || '0') === question.remainder
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                    } opacity-60`}
                  />
                )}
              </div>

              {/* Result indicators */}
              {graded && (
                <div className="flex items-center gap-2">
                  {parseInt(quotientAnswer || '0') === question.quotient &&
                  parseInt(remainderAnswer || '0') === question.remainder ? (
                    <span className="text-4xl font-black text-green-500">〇</span>
                  ) : (
                    <span className="text-3xl font-black text-red-500">×</span>
                  )}
                </div>
              )}
            </div>
          ) : question.topic === 'division-properties' || question.topic === 'mental-division' ? (
            // Step-by-step inputs for division properties
            <div className="space-y-3">
              {/* Step 1: Simplify by dividing both */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex flex-col">
                  <span className="text-foreground font-medium text-sm">ステップ1：同じ数で割る</span>
                  <span className="text-xs text-gray-500">Step 1: Divide both by same number</span>
                </div>
                {!graded ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="1"
                      value={stepAnswers[0] || ''}
                      onChange={(e) => onStepAnswerChange?.(0, e.target.value)}
                      disabled={graded}
                      className="w-20 h-10 text-center text-lg font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                      placeholder="?"
                    />
                    <span className="text-lg">÷</span>
                    <input
                      type="number"
                      step="1"
                      value={stepAnswers[1] || ''}
                      onChange={(e) => onStepAnswerChange?.(1, e.target.value)}
                      disabled={graded}
                      className="w-20 h-10 text-center text-lg font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                      placeholder="?"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={stepAnswers[0] || ''}
                      disabled
                      className={`w-20 h-10 text-center text-lg font-bold rounded-xl border-2 ${
                        parseInt(stepAnswers[0] || '0') === question.simplifiedDividend
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                      } opacity-60`}
                    />
                    <span className="text-lg">÷</span>
                    <input
                      type="number"
                      value={stepAnswers[1] || ''}
                      disabled
                      className={`w-20 h-10 text-center text-lg font-bold rounded-xl border-2 ${
                        parseInt(stepAnswers[1] || '0') === question.simplifiedDivisor
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                      } opacity-60`}
                    />
                  </div>
                )}
              </div>

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
            // Long division - single answer
            <div className="flex items-center gap-3 flex-wrap">
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

          {/* Formula for incorrect answers */}
          {graded && !isCorrect && question.topic !== 'long-division' && (
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

export default DivisionQuestionItem;
