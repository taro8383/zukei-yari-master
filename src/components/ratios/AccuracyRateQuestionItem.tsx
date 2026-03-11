import { useState } from 'react';
import { AccuracyRateQuestion, AccuracyRateTopic, ACCURACY_RATE_TOPICS } from '@/lib/ratios';
import BatteryBar from './BatteryBar';

interface AccuracyRateQuestionItemProps {
  question: AccuracyRateQuestion;
  index: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  graded: boolean;
  isCorrect?: boolean;
}

const AccuracyRateQuestionItem = ({
  question,
  index,
  userAnswer,
  onAnswerChange,
  graded,
  isCorrect,
}: AccuracyRateQuestionItemProps) => {
  const [showHint, setShowHint] = useState(false);
  const topicInfo = ACCURACY_RATE_TOPICS[question.topic];

  // Determine input unit/suffix based on topic
  const getInputSuffix = () => {
    switch (question.topic) {
      case 'decimal-ratio':
        return { ja: '倍 / times', unit: '' };
      case 'convert-percent':
      case 'calculate-accuracy':
        return { ja: '% / percent', unit: '%' };
      default:
        return { ja: '', unit: '' };
    }
  };

  const suffix = getInputSuffix();

  // Get hint text based on topic - provides step-by-step guidance
  const getHintText = () => {
    switch (question.topic) {
      case 'decimal-ratio':
        return {
          ja: (
            <>
              💡 <strong>ステップ1:</strong> 正解の数は {question.correctAnswers}、全部の数は {question.totalQuestions}<br/>
              <strong>ステップ2:</strong> {question.correctAnswers} ÷ {question.totalQuestions} を計算しよう！
            </>
          ),
          en: (
            <>
              <strong>Step 1:</strong> Correct: {question.correctAnswers}, Total: {question.totalQuestions}<br/>
              <strong>Step 2:</strong> Calculate {question.correctAnswers} ÷ {question.totalQuestions}!
            </>
          ),
        };
      case 'convert-percent':
        return {
          ja: (
            <>
              💡 <strong>ステップ1:</strong> 小数の割合は {question.decimalRatio}<br/>
              <strong>ステップ2:</strong> {question.decimalRatio} × 100 = ?<br/>
              <strong>ステップ3:</strong> 答えの後に「%」をつけよう！
            </>
          ),
          en: (
            <>
              <strong>Step 1:</strong> Decimal ratio: {question.decimalRatio}<br/>
              <strong>Step 2:</strong> {question.decimalRatio} × 100 = ?<br/>
              <strong>Step 3:</strong> Add "%" to your answer!
            </>
          ),
        };
      case 'calculate-accuracy':
        return {
          ja: (
            <>
              💡 <strong>ステップ1:</strong> {question.correctAnswers} ÷ {question.totalQuestions} を計算<br/>
              <strong>ステップ2:</strong> その結果 × 100 をする<br/>
              <strong>ステップ3:</strong> 「%」をつけたら完成！
            </>
          ),
          en: (
            <>
              <strong>Step 1:</strong> Calculate {question.correctAnswers} ÷ {question.totalQuestions}<br/>
              <strong>Step 2:</strong> Multiply result × 100<br/>
              <strong>Step 3:</strong> Add "%" and you're done!
            </>
          ),
        };
      default:
        return { ja: '', en: '' };
    }
  };

  const hintText = getHintText();

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

          {/* Battery / EXP Bar Visual Aid - only for topics that have correct/total */}
          {(question.topic === 'decimal-ratio' || question.topic === 'calculate-accuracy') && (
            <div className="mb-4">
              <BatteryBar
                correctAnswers={question.correctAnswers}
                totalQuestions={question.totalQuestions}
                showAnswer={graded}
              />
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

          {/* Answer Input */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex flex-col">
              <span className="text-foreground font-medium">答え：</span>
              <span className="text-xs text-gray-500">Answer:</span>
            </div>

            {!graded ? (
              <>
                <input
                  type="number"
                  step="0.01"
                  value={userAnswer}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  disabled={graded}
                  className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                  placeholder="？"
                />
                <span className="font-medium text-gray-500">{suffix.ja}</span>
              </>
            ) : (
              <>
                <input
                  type="number"
                  value={userAnswer}
                  disabled
                  className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background opacity-60"
                />
                <span className="font-medium text-gray-500">{suffix.ja}</span>
                <div className="flex items-center gap-2 animate-bounce-in">
                  {isCorrect ? (
                    <span className="text-4xl font-black text-green-500">〇</span>
                  ) : (
                    <>
                      <span className="text-3xl font-black text-red-500">×</span>
                      {/* Formula in red text for incorrect answers */}
                      <span className="text-sm text-red-500 font-bold">
                        {question.formula}
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

export default AccuracyRateQuestionItem;
