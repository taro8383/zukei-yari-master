import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { LargeNumberQuestion } from '@/lib/largeNumbers';
import PlaceValueChart from './PlaceValueChart';
import NumberLine from './NumberLine';

interface LargeNumbersQuestionItemProps {
  question: LargeNumberQuestion;
  index: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  graded: boolean;
  isCorrect?: boolean;
}

const LargeNumbersQuestionItem = ({
  question,
  index,
  userAnswer,
  onAnswerChange,
  graded,
  isCorrect,
}: LargeNumbersQuestionItemProps) => {
  const [showHint, setShowHint] = useState(false);

  // For reading-oku-cho and calculating-oku-cho topics: custom input with kanji unit buttons
  const isKanjiInput = question.topic === 'reading-oku-cho' || question.topic === 'calculating-oku-cho';

  // Handle kanji button clicks for reading-oku-cho
  const handleKanjiClick = (kanji: string) => {
    onAnswerChange(userAnswer + kanji);
  };

  // Handle backspace for kanji input
  const handleBackspace = () => {
    onAnswerChange(userAnswer.slice(0, -1));
  };

  // Handle clear for kanji input
  const handleClear = () => {
    onAnswerChange('');
  };

  // Render the appropriate visual aid
  const renderVisualAid = () => {
    if (question.topic === 'reading-oku-cho' && question.numericValue) {
      return <PlaceValueChart number={question.numericValue} />;
    }
    // For rounding-off, show number line WITHOUT the answer
    if (question.topic === 'rounding-off' && question.originalNumber) {
      return (
        <NumberLine
          originalNumber={question.originalNumber}
          targetPlace={question.targetPlace}
        />
      );
    }
    return null;
  };

  return (
    <div
      className={`
        bg-card rounded-2xl shadow-kid p-5 border-2 transition-all
        ${graded
          ? isCorrect
            ? 'border-correct'
            : 'border-incorrect'
          : 'border-border hover:border-primary/30'
        }
      `}
    >
      {/* Question Number and Text */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">{question.questionText}</p>
          <p className="text-sm text-gray-500">{question.questionTextEn}</p>
        </div>
      </div>

      {/* Visual Aid */}
      {renderVisualAid() && (
        <div className="mb-4">
          {renderVisualAid()}
        </div>
      )}

      {/* Hint Toggle */}
      <button
        onClick={() => setShowHint(!showHint)}
        className="text-sm text-primary hover:text-primary/80 mb-3 flex items-center gap-1"
      >
        💡 {showHint ? 'ヒントをかくす / Hide Hint' : 'ヒントをみる / Show Hint'}
      </button>

      {/* Hint Content */}
      {showHint && (
        <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow/40">
          {question.topic === 'reading-oku-cho' && question.numericValue && (
            <>
              <p className="font-medium text-foreground">
                💡 右から4けたごとに区切ってみよう：
              </p>
              <p className="text-foreground text-sm mt-1">
                {question.numericValue.toLocaleString()} → {' '}
                {question.numericValue.toLocaleString().split(',').map((group, i, arr) => (
                  <span key={i}>
                    <strong className="text-primary">{group}</strong>
                    {i < arr.length - 1 && <span className="text-muted-foreground"> / </span>}
                  </span>
                ))}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                右から順に：一の位 → 万の位 → 億の位 → 兆の位
              </p>
            </>
          )}
          {question.topic === 'rounding-off' && question.originalNumber && (
            <>
              <p className="font-medium text-foreground">
                💡 {question.targetPlace}を探すコツ：
              </p>
              <p className="text-foreground text-sm mt-1">
                {question.originalNumber.toLocaleString()} の<strong className="text-primary">「{question.targetPlace}」</strong>の右隣の数字をチェック！
              </p>
              <p className="text-gray-500 text-sm mt-2">
                0-4なら切り捨て、5-9なら切り上げ
              </p>
            </>
          )}
          {question.topic === 'rounding-up-down' && (
            <>
              <p className="font-medium text-foreground">
                💡 この問題の解き方：
              </p>
              {question.roundUp ? (
                <>
                  <p className="text-foreground text-sm mt-1">
                    ① まず合計金額を計算しよう
                  </p>
                  <p className="text-foreground text-sm">
                    ② 1000円で割って、小数点は<strong className="text-primary">切り上げ</strong>（足りなくなると困るから）
                  </p>
                </>
              ) : (
                <>
                  <p className="text-foreground text-sm mt-1">
                    ① 合計金額 ÷ 1個の値段 を計算しよう
                  </p>
                  <p className="text-foreground text-sm">
                    ② 小数点は<strong className="text-primary">切り捨て</strong>（お金が足りないと買えないから）
                  </p>
                </>
              )}
            </>
          )}
          {question.topic === 'calculating-oku-cho' && question.num1 && question.num2 && (
            <>
              <p className="font-medium text-foreground">
                💡 大きな数の計算のコツ：
              </p>
              <p className="text-foreground text-sm mt-1">
                ① 単位（億、兆）をそろえる
              </p>
              <p className="text-foreground text-sm">
                ② 数字部分を{question.operation === 'add' ? 'たし算' : 'ひき算'}する
              </p>
              <p className="text-foreground text-sm">
                ③ 最後に単位をつける
              </p>
            </>
          )}
          {question.topic === 'estimating-calculations' && question.num1 && question.num2 && (
            <>
              <p className="font-medium text-foreground">
                💡 がい算のステップ：
              </p>
              <p className="text-foreground text-sm mt-1">
                ① {question.num1} を{question.roundPlace}で四捨五入 → <strong className="text-primary">{question.roundedNum1}</strong>
              </p>
              <p className="text-foreground text-sm">
                ② {question.num2} を{question.roundPlace}で四捨五入 → <strong className="text-primary">{question.roundedNum2}</strong>
              </p>
              <p className="text-foreground text-sm">
                ③ {question.roundedNum1} + {question.roundedNum2} = およその答え
              </p>
            </>
          )}
        </div>
      )}

      {/* Answer Input Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex flex-col">
          <span className="text-foreground font-medium">答え：</span>
          <span className="text-xs text-gray-500">Answer:</span>
        </div>

        {isKanjiInput ? (
          /* Custom Kanji Input for Reading Oku and Cho */
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => onAnswerChange(e.target.value)}
                disabled={graded}
                placeholder="例: 45億"
                className="flex-1 text-lg font-bold"
              />
              {graded && (
                <div className="flex-shrink-0">
                  {isCorrect ? (
                    <span className="text-4xl font-black text-green-500">〇</span>
                  ) : (
                    <span className="text-3xl font-black text-red-500">×</span>
                  )}
                </div>
              )}
            </div>
            {/* Kanji Unit Buttons */}
            {!graded && (
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => handleKanjiClick('万')}
                  className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg font-bold text-primary transition-colors"
                >
                  万
                </button>
                <button
                  onClick={() => handleKanjiClick('億')}
                  className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg font-bold text-primary transition-colors"
                >
                  億
                </button>
                <button
                  onClick={() => handleKanjiClick('兆')}
                  className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg font-bold text-primary transition-colors"
                >
                  兆
                </button>
                <button
                  onClick={() => handleKanjiClick('0')}
                  className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg font-bold transition-colors"
                >
                  0
                </button>
                <button
                  onClick={handleBackspace}
                  className="px-3 py-1.5 bg-kid-yellow/20 hover:bg-kid-yellow/30 rounded-lg font-bold text-foreground transition-colors"
                >
                  ← けす
                </button>
                <button
                  onClick={handleClear}
                  className="px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg font-bold text-red-600 transition-colors"
                >
                  クリア
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Standard Number Input for Rounding Topics */
          <div className="flex items-center gap-2 flex-1">
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              disabled={graded}
              placeholder="答えを入力"
              className="flex-1 text-lg font-bold"
            />
            {graded && (
              <div className="flex-shrink-0">
                {isCorrect ? (
                  <span className="text-4xl font-black text-green-500">〇</span>
                ) : (
                  <span className="text-3xl font-black text-red-500">×</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Formula / Explanation for Incorrect Answers */}
      {graded && !isCorrect && (
        <div className="mt-3 pt-3 border-t border-border">
          <span className="text-sm text-red-500 font-bold">
            {question.formula}
          </span>
          <span className="text-xs text-red-400 block">
            {question.formulaEn}
          </span>
        </div>
      )}
    </div>
  );
};

export default LargeNumbersQuestionItem;
