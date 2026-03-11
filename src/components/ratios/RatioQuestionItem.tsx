import { RatioQuestion, formatRatio } from '@/lib/ratios';
import TapeDiagram from './TapeDiagram';
import { useState } from 'react';

interface RatioQuestionItemProps {
  question: RatioQuestion;
  index: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  graded: boolean;
  isCorrect?: boolean;
}

const RatioQuestionItem = ({
  question,
  index,
  userAnswer,
  onAnswerChange,
  graded,
  isCorrect,
}: RatioQuestionItemProps) => {
  const [showHint, setShowHint] = useState(false);

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
          <p className="text-sm text-muted-foreground mb-4">{question.textEn}</p>

          {/* Tape Diagram */}
          <div className="mb-4">
            <TapeDiagram
              baseAmount={question.baseAmount}
              comparedAmount={question.comparedAmount}
              ratio={question.answer}
              showAnswer={graded}
            />
          </div>

          {/* Hint Toggle */}
          {!graded && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors mb-3 flex items-center gap-1"
            >
              <span>{showHint ? '💡 ヒントをかくす' : '💡 ヒントをみる'}</span>
              <span className="text-xs">({showHint ? 'Hide hint' : 'Show hint'})</span>
            </button>
          )}

          {/* Hint - shows formula explanation */}
          {(showHint || graded) && (
            <div className="bg-kid-yellow/10 rounded-lg p-3 mb-4 text-sm">
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
                <span className="font-medium text-muted-foreground">倍 / times</span>
              </>
            ) : (
              <>
                <input
                  type="number"
                  value={userAnswer}
                  disabled
                  className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background opacity-60"
                />
                <span className="font-medium text-muted-foreground">倍 / times</span>
                <div className="flex items-center gap-2 animate-bounce-in">
                  {isCorrect ? (
                    <span className="text-3xl font-black text-correct">〇</span>
                  ) : (
                    <>
                      <span className="text-3xl font-black text-incorrect">×</span>
                      <span className="text-sm text-muted-foreground">
                        正しい答え / Correct answer：
                        <strong className="text-foreground">{formatRatio(question.answer)}倍</strong>
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
