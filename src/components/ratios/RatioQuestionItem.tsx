import { RatioQuestion, formatRatio } from '@/lib/ratios';
import TapeDiagram from './TapeDiagram';
import SmartHintPanel from '@/components/SmartHintPanel';
import { generateRatioHints } from '@/lib/gameState';
import { useState } from 'react';

interface RatioQuestionItemProps {
  question: RatioQuestion;
  index: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  // For difference-vs-multiple topic
  selectedOperation?: 'difference' | 'multiple' | '';
  onOperationChange?: (operation: 'difference' | 'multiple') => void;
  graded: boolean;
  isCorrect?: boolean;
  // For smart hints
  noHintsMode?: boolean;
  onHintUsed?: () => void;
}

const RatioQuestionItem = ({
  question,
  index,
  userAnswer,
  onAnswerChange,
  selectedOperation,
  onOperationChange,
  graded,
  isCorrect,
  noHintsMode = false,
  onHintUsed,
}: RatioQuestionItemProps) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const isDifferenceVsMultiple = question.type === 'difference-vs-multiple';

  // Generate progressive hints
  const hints = generateRatioHints(question.type, question.ratio);

  // Determine if operation selection is correct
  const isOperationCorrect = isDifferenceVsMultiple
    ? selectedOperation === question.correctOperation
    : true;

  return (
    <div
      className={`bg-card rounded-2xl shadow-kid p-5 border-2 transition-all ${
        graded
          ? isCorrect && isOperationCorrect
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
          <p className="text-sm text-muted-foreground mb-4">{question.textEn}</p>

          {/* Tape Diagram - hide for difference-vs-multiple */}
          {!isDifferenceVsMultiple && (
            <div className="mb-4">
              <TapeDiagram
                baseAmount={question.baseAmount}
                comparedAmount={question.comparedAmount}
                ratio={question.ratio}
                showAnswer={graded}
                hideComparedValue={question.type === 'finding-compared'}
                hideBaseValue={question.type === 'finding-base'}
              />
            </div>
          )}

          {/* Difference vs Multiple - Operation Selection */}
          {isDifferenceVsMultiple && (
            <div className="mb-4 bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
              <p className="font-bold text-foreground mb-3">
                どの計算を使いますか？ / Which operation should you use?
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => onOperationChange?.('difference')}
                  disabled={graded}
                  className={`px-4 py-3 rounded-xl font-bold transition-all ${
                    selectedOperation === 'difference'
                      ? 'bg-kid-green text-white shadow-kid'
                      : 'bg-muted hover:bg-muted/80'
                  } ${graded && question.correctOperation === 'difference' ? 'ring-2 ring-correct' : ''} ${graded && selectedOperation === 'difference' && question.correctOperation !== 'difference' ? 'ring-2 ring-incorrect' : ''}`}
                >
                  <span className="text-xl">➖</span>
                  <div className="text-sm">
                    <div>ひき算（差）</div>
                    <div className="text-xs opacity-80">Difference</div>
                  </div>
                </button>
                <button
                  onClick={() => onOperationChange?.('multiple')}
                  disabled={graded}
                  className={`px-4 py-3 rounded-xl font-bold transition-all ${
                    selectedOperation === 'multiple'
                      ? 'bg-kid-purple text-white shadow-kid'
                      : 'bg-muted hover:bg-muted/80'
                  } ${graded && question.correctOperation === 'multiple' ? 'ring-2 ring-correct' : ''} ${graded && selectedOperation === 'multiple' && question.correctOperation !== 'multiple' ? 'ring-2 ring-incorrect' : ''}`}
                >
                  <span className="text-xl">➗</span>
                  <div className="text-sm">
                    <div>わり算（倍）</div>
                    <div className="text-xs opacity-80">Multiple</div>
                  </div>
                </button>
              </div>
              {graded && (
                <div className={`mt-3 text-sm font-bold ${isOperationCorrect ? 'text-correct' : 'text-incorrect'}`}>
                  {isOperationCorrect
                    ? '✓ 正しい計算を選びました！ / Correct operation!'
                    : `✗ 正しい計算は「${question.correctOperation === 'difference' ? 'ひき算（差）' : 'わり算（倍）'}」です / The correct operation is ${question.correctOperation === 'difference' ? 'subtraction' : 'division'}`}
                </div>
              )}
            </div>
          )}

          {/* Smart Hint Panel */}
          {!graded && (
            <SmartHintPanel
              hints={hints}
              onHintUsed={onHintUsed}
              disabled={noHintsMode}
            />
          )}

          {/* Explanation after grading */}
          {graded && (
            <div className="bg-kid-yellow/10 rounded-lg p-3 mb-4 text-sm mt-4">
              <p className="font-medium text-foreground">{question.explanation}</p>
              <p className="text-muted-foreground">{question.explanationEn}</p>
            </div>
          )}

          {/* Answer Input */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex flex-col">
              <span className="text-muted-foreground font-medium">答え：</span>
              <span className="text-xs text-muted-foreground">Answer:</span>
            </div>

            {!graded ? (
              <>
                <input
                  type="number"
                  step="0.1"
                  value={userAnswer}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  disabled={graded}
                  className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                  placeholder="？"
                />
                <span className="font-medium text-muted-foreground">
                  {question.type === 'finding-compared'
                    ? 'L / liters'
                    : question.type === 'finding-base'
                    ? 'cm'
                    : isDifferenceVsMultiple
                    ? selectedOperation === 'difference'
                      ? '(差 / difference)'
                      : selectedOperation === 'multiple'
                      ? '(倍 / times)'
                      : ''
                    : '倍 / times'}
                </span>
              </>
            ) : (
              <>
                <input
                  type="number"
                  value={userAnswer}
                  disabled
                  className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background opacity-60"
                />
                <span className="font-medium text-muted-foreground">
                  {question.type === 'finding-compared'
                    ? 'L / liters'
                    : question.type === 'finding-base'
                    ? 'cm'
                    : isDifferenceVsMultiple
                    ? question.correctOperation === 'difference'
                      ? '(差 / difference)'
                      : '(倍 / times)'
                    : '倍 / times'}
                </span>
                <div className="flex items-center gap-2 animate-bounce-in">
                  {isCorrect && isOperationCorrect ? (
                    <span className="text-3xl font-black text-correct">〇</span>
                  ) : (
                    <>
                      <span className="text-3xl font-black text-incorrect">×</span>
                      <span className="text-sm text-muted-foreground">
                        正しい答え / Correct answer：
                        <strong className="text-foreground">
                          {question.type === 'finding-compared'
                            ? `${formatRatio(question.answer)}L`
                            : question.type === 'finding-base'
                            ? `${formatRatio(question.answer)}cm`
                            : isDifferenceVsMultiple
                            ? question.correctOperation === 'difference'
                              ? `${question.differenceAnswer} (差)`
                              : `${formatRatio(question.multipleAnswer || 0)}倍`
                            : `${formatRatio(question.answer)}倍`}
                        </strong>
                      </span>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatioQuestionItem;
