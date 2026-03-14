import { useState } from 'react';
import { FractionQuestion } from '@/lib/fractions';
import { FractionInput } from './FractionInput';
import { cn } from '@/lib/utils';

interface FractionsQuestionItemProps {
  question: FractionQuestion;
  index: number;
  userAnswer: string;
  userNumerator: number | '';
  userDenominator: number | '';
  userWholeNumber?: number | '';
  onAnswerChange: (value: string) => void;
  onNumeratorChange: (value: string) => void;
  onDenominatorChange: (value: string) => void;
  onWholeNumberChange?: (value: string) => void;
  graded: boolean;
  isCorrect?: boolean;
}

const FractionsQuestionItem = ({
  question,
  index,
  userAnswer,
  userNumerator,
  userDenominator,
  userWholeNumber,
  onAnswerChange,
  onNumeratorChange,
  onDenominatorChange,
  onWholeNumberChange,
  graded,
  isCorrect,
}: FractionsQuestionItemProps) => {
  const [showHint, setShowHint] = useState(false);

  // Get hint text based on topic
  const getHintText = () => {
    switch (question.topic) {
      case 'fraction-types':
        return {
          ja: (
            <>
              💡 <strong>分数の種類の見分け方:</strong><br />
              ① 分子と分母を比べる<br />
              ② 分子 &lt; 分母 → 「真分数」<br />
              ③ 分子 ≧ 分母 → 「仮分数」<br />
              ④ 整数がある → 「帯分数」
            </>
          ),
          en: (
            <>
              <strong>How to identify fraction types:</strong><br />
              1. Compare numerator and denominator<br />
              2. Numerator &lt; Denominator → "Proper"<br />
              3. Numerator ≥ Denominator → "Improper"<br />
              4. Has whole number → "Mixed"
            </>
          ),
        };
      case 'converting-fractions':
        return {
          ja: (
            <>
              💡 <strong>分数の変換のコツ:</strong><br />
              仮分数→帯分数：分子÷分母＝商と余り<br />
              帯分数→仮分数：(整数×分母)＋分子
            </>
          ),
          en: (
            <>
              <strong>Conversion tips:</strong><br />
              Improper→Mixed: numerator÷denominator = quotient and remainder<br />
              Mixed→Improper: (whole×denominator) + numerator
            </>
          ),
        };
      case 'adding-fractions':
        return {
          ja: (
            <>
              💡 <strong>分数のたし算:</strong><br />
              ① 分母はそのまま！<br />
              ② 分子だけをたし算する<br />
              ③ 仮分数になったら帯分数に変換
            </>
          ),
          en: (
            <>
              <strong>Adding fractions:</strong><br />
              1. Keep the denominator the same!<br />
              2. Add only the numerators<br />
              3. Convert improper to mixed if needed
            </>
          ),
        };
      case 'subtracting-fractions':
        return {
          ja: (
            <>
              💡 <strong>分数のひき算（くり下げ）:</strong><br />
              ① 1＝分母/分母 として整数をくずす<br />
              ② 分母はそのまま、分子をひき算する<br />
              ③ <strong>約分する</strong>：偶数なら2で、各桁の和が3で割れるなら3で割る
            </>
          ),
          en: (
            <>
              <strong>Subtracting fractions (borrowing):</strong><br />
              1. Break 1 whole into denominator/denominator<br />
              2. Keep denominator, subtract numerators<br />
              3. <strong>Simplify:</strong> If even ÷2, if digit sum ÷3 then ÷3
            </>
          ),
        };
      default:
        return { ja: '', en: '' };
    }
  };

  const hintText = getHintText();

  // Check if this is a fraction-types question (dropdown)
  const isFractionTypes = question.topic === 'fraction-types';

  // Check if this is a converting-fractions question
  const isConverting = question.topic === 'converting-fractions';

  // Check if this is adding or subtracting fractions
  const isAddingOrSubtracting = question.topic === 'adding-fractions' || question.topic === 'subtracting-fractions';

  // Check if the answer needs a whole number input
  // - Converting to mixed number
  // - Adding fractions that result in mixed numbers
  // - Subtracting fractions that result in mixed numbers
  const needsWholeNumber =
    (isConverting && question.convertTo === 'mixed') ||
    (isAddingOrSubtracting && question.answerMixedWhole !== undefined && question.answerMixedWhole > 0);

  // Parse the original fraction for display
  const parseFraction = (fractionStr: string | undefined) => {
    if (!fractionStr) return { num: 0, den: 1, whole: 0 };

    // Check if it's a mixed number format like "1と2/5"
    if (fractionStr.includes('と')) {
      const [wholePart, fracPart] = fractionStr.split('と');
      const [num, den] = fracPart.split('/').map(Number);
      return { num, den, whole: Number(wholePart) };
    }

    // Simple fraction like "3/5"
    const [num, den] = fractionStr.split('/').map(Number);
    return { num, den, whole: 0 };
  };

  // Render fraction bar visual aid
  const renderFractionBar = () => {
    if (!graded) return null;

    const { num, den, whole } = parseFraction(question.fraction || question.originalFraction);
    const barWidth = 200;
    const barHeight = 30;
    const segmentWidth = den > 0 ? barWidth / den : barWidth;

    return (
      <div className="flex flex-col items-center gap-2 mb-4">
        <p className="text-sm text-muted-foreground">
          {question.topic === 'subtracting-fractions' ? '分数のイメージ / Fraction Visualization' : '分数の図 / Fraction Diagram'}
        </p>
        <svg width={barWidth + 40} height={barHeight + (whole > 0 ? 40 : 20)} className="border rounded-lg bg-white">
          {/* Whole number bars if any */}
          {whole > 0 && (
            <>
              <rect
                x={20}
                y={5}
                width={barWidth}
                height={barHeight}
                fill="#4ade80"
                stroke="#16a34a"
                strokeWidth={2}
              />
              <text x={20 + barWidth / 2} y={5 + barHeight / 2 + 5} textAnchor="middle" fontSize={14} fill="#166534">
                1
              </text>
            </>
          )}
          {/* Fraction bar */}
          <g transform={whole > 0 ? `translate(20, ${45})` : 'translate(20, 10)'}>
            {/* Background segments */}
            {Array.from({ length: den }).map((_, i) => (
              <rect
                key={`bg-${i}`}
                x={i * segmentWidth}
                y={0}
                width={segmentWidth - 1}
                height={barHeight}
                fill="#e5e7eb"
                stroke="#9ca3af"
                strokeWidth={1}
              />
            ))}
            {/* Filled segments */}
            {Array.from({ length: num }).map((_, i) => (
              <rect
                key={`fill-${i}`}
                x={i * segmentWidth}
                y={0}
                width={segmentWidth - 1}
                height={barHeight}
                fill="#60a5fa"
                stroke="#3b82f6"
                strokeWidth={1}
              />
            ))}
          </g>
        </svg>
        <p className="text-xs text-muted-foreground">
          {whole > 0 ? `${whole}と${num}/${den}` : `${num}/${den}`}
        </p>
      </div>
    );
  };

  // Render fraction bars for addition
  const renderAdditionBars = () => {
    if (!graded || !isAddingOrSubtracting) return null;

    const num1 = question.numerator1 || 0;
    const den1 = question.denominator1 || 1;
    const num2 = question.numerator2 || 0;
    const den2 = question.denominator2 || 1;

    const barWidth = 150;
    const barHeight = 25;
    const segmentWidth1 = barWidth / den1;
    const segmentWidth2 = barWidth / den2;

    return (
      <div className="flex flex-col items-center gap-3 mb-4">
        <p className="text-sm text-muted-foreground">分数のたし算のイメージ / Addition Visualization</p>
        <div className="flex items-center gap-4">
          {/* First fraction bar */}
          <div className="flex flex-col items-center">
            <svg width={barWidth + 4} height={barHeight + 10} className="border rounded bg-white">
              {Array.from({ length: den1 }).map((_, i) => (
                <rect
                  key={`f1-${i}`}
                  x={2 + i * segmentWidth1}
                  y={2}
                  width={segmentWidth1 - 1}
                  height={barHeight}
                  fill={i < num1 ? '#60a5fa' : '#e5e7eb'}
                  stroke="#3b82f6"
                  strokeWidth={1}
                />
              ))}
            </svg>
            <span className="text-xs mt-1">{num1}/{den1}</span>
          </div>

          <span className="text-2xl font-bold">+</span>

          {/* Second fraction bar */}
          <div className="flex flex-col items-center">
            <svg width={barWidth + 4} height={barHeight + 10} className="border rounded bg-white">
              {Array.from({ length: den2 }).map((_, i) => (
                <rect
                  key={`f2-${i}`}
                  x={2 + i * segmentWidth2}
                  y={2}
                  width={segmentWidth2 - 1}
                  height={barHeight}
                  fill={i < num2 ? '#f472b6' : '#e5e7eb'}
                  stroke="#ec4899"
                  strokeWidth={1}
                />
              ))}
            </svg>
            <span className="text-xs mt-1">{num2}/{den2}</span>
          </div>
        </div>
      </div>
    );
  };

  // Render borrowing visualization for subtraction
  const renderBorrowingVisualization = () => {
    if (!graded || question.topic !== 'subtracting-fractions') return null;

    const whole1 = question.visualAid?.wholeParts || 1;
    const den = question.denominator1 || 4;
    const num1 = question.numerator1 || 1;

    return (
      <div className="flex flex-col items-center gap-3 mb-4">
        <p className="text-sm text-muted-foreground">くり下げのイメージ / Borrowing Visualization</p>
        <div className="bg-kid-yellow/10 rounded-lg p-3 text-sm">
          <p className="text-center mb-2">
            <strong>1 = {den}/{den}</strong> として整数をくずす
          </p>
          <p className="text-xs text-muted-foreground text-center">
            Break 1 whole into {den}/{den}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Whole number representation */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center text-lg font-bold">
              1
            </div>
            <span className="text-xs mt-1">整数</span>
          </div>
          <span className="text-xl">→</span>
          <div className="flex flex-col items-center">
            <div className="flex">
              {Array.from({ length: den }).map((_, i) => (
                <div
                  key={`break-${i}`}
                  className="w-6 h-8 bg-blue-200 border border-blue-500 flex items-center justify-center text-xs"
                >
                  1/{den}
                </div>
              ))}
            </div>
            <span className="text-xs mt-1">{den}個の 1/{den}</span>
          </div>
          <span className="text-xl">+</span>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-300 border-2 border-blue-600 rounded flex items-center justify-center text-sm font-bold">
              {num1}/{den}
            </div>
            <span className="text-xs mt-1">あまり</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'bg-card rounded-2xl shadow-kid p-5 border-2 transition-all',
        graded
          ? isCorrect
            ? 'border-correct'
            : 'border-incorrect'
          : 'border-border hover:border-primary/30'
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="text-lg font-medium leading-relaxed">{question.text}</p>
          <p className="text-sm text-gray-500 mb-4">{question.textEn}</p>

          {/* Visual Aids - only show when graded */}
          {graded && isFractionTypes && renderFractionBar()}
          {graded && question.topic === 'adding-fractions' && renderAdditionBars()}
          {graded && question.topic === 'subtracting-fractions' && renderBorrowingVisualization()}

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

          {/* Answer Input Section */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex flex-col">
              <span className="text-foreground font-medium">答え：</span>
              <span className="text-xs text-gray-500">Answer:</span>
            </div>

            {isFractionTypes ? (
              // Dropdown for fraction types
              <div className="flex items-center gap-2">
                {!graded ? (
                  <select
                    value={userAnswer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    disabled={graded}
                    className="h-12 px-4 text-lg font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                  >
                    <option value="">-- 選択してください --</option>
                    <option value="proper">真分数 / Proper</option>
                    <option value="improper">仮分数 / Improper</option>
                    <option value="mixed">帯分数 / Mixed</option>
                  </select>
                ) : (
                  <>
                    <input
                      type="text"
                      value={
                        userAnswer === 'proper'
                          ? '真分数 / Proper'
                          : userAnswer === 'improper'
                          ? '仮分数 / Improper'
                          : userAnswer === 'mixed'
                          ? '帯分数 / Mixed'
                          : ''
                      }
                      disabled
                      className="w-48 h-12 text-center text-lg font-bold rounded-xl border-2 border-input bg-background opacity-60"
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
            ) : (
              // Fraction input for other topics
              <div className="flex items-center gap-3 flex-wrap">
                {!graded ? (
                  <FractionInput
                    numerator={userNumerator}
                    denominator={userDenominator}
                    wholeNumber={needsWholeNumber ? userWholeNumber : undefined}
                    onNumeratorChange={onNumeratorChange}
                    onDenominatorChange={onDenominatorChange}
                    onWholeNumberChange={needsWholeNumber ? onWholeNumberChange : undefined}
                    disabled={graded}
                    size="md"
                  />
                ) : (
                  <>
                    <FractionInput
                      numerator={userNumerator}
                      denominator={userDenominator}
                      wholeNumber={needsWholeNumber ? userWholeNumber : undefined}
                      onNumeratorChange={() => {}}
                      onDenominatorChange={() => {}}
                      onWholeNumberChange={needsWholeNumber ? () => {} : undefined}
                      disabled={true}
                      size="md"
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
            )}
          </div>

          {/* Formula for incorrect answers */}
          {graded && !isCorrect && (
            <div className="mt-3 pt-3 border-t border-border">
              {isFractionTypes ? (
                // For fraction type questions, show the correct type
                <>
                  <span className="text-sm text-red-500 font-bold">
                    正解：{question.fractionType === 'proper'
                      ? '真分数 / Proper'
                      : question.fractionType === 'improper'
                      ? '仮分数 / Improper'
                      : '帯分数 / Mixed'}
                  </span>
                  <span className="text-xs text-red-400 block">
                    Correct: {question.fractionType === 'proper'
                      ? 'Proper Fraction'
                      : question.fractionType === 'improper'
                      ? 'Improper Fraction'
                      : 'Mixed Number'}
                  </span>
                </>
              ) : (
                // For other questions, show the fraction answer
                <>
                  <span className="text-sm text-red-500 font-bold">
                    正解：{question.answerFraction ||
                      (question.answerMixedWhole !== undefined && question.answerMixedWhole > 0
                        ? `${question.answerMixedWhole}と${question.answerNum}/${question.answerDen}`
                        : `${question.answerNum}/${question.answerDen}`)}
                  </span>
                  <span className="text-xs text-red-400 block">
                    Correct: {question.answerFraction ||
                      (question.answerMixedWhole !== undefined && question.answerMixedWhole > 0
                        ? `${question.answerMixedWhole} ${question.answerNum}/${question.answerDen}`
                        : `${question.answerNum}/${question.answerDen}`)}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FractionsQuestionItem;
