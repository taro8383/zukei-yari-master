import { useState } from 'react';
import { DecimalQuestion } from '@/lib/decimals';
import VerticalDecimalGrid from './VerticalDecimalGrid';
import DecimalShiftArrow from './DecimalShiftArrow';
import { Lightbulb } from 'lucide-react';

interface DecimalQuestionItemProps {
  question: DecimalQuestion;
  index: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  graded: boolean;
  isCorrect?: boolean;
  // For vertical decimal grid (add/subtract)
  gridAnswers?: string[];
  onGridAnswerChange?: (cellIndex: number, value: string) => void;
  // For teach me feature
  onTeachMe?: () => void;
}

const DecimalQuestionItem = ({
  question,
  index,
  userAnswer,
  onAnswerChange,
  graded,
  isCorrect,
  gridAnswers = [],
  onGridAnswerChange,
  onTeachMe,
}: DecimalQuestionItemProps) => {
  const [showHint, setShowHint] = useState(false);

  // Get hint text based on topic
  const getHintText = () => {
    switch (question.topic) {
      case 'decimal-structure':
        if (question.targetUnit === '0.1') {
          return {
            ja: (
              <>
                💡 <strong>0.1は1を10こに分けた1つ分</strong><br />
                1の位は0.1を10こ集めたものだよ！<br />
                {question.decimalNumber} の1の位は {Math.floor(question.decimalNumber || 0)} だから、<br />
                0.1は {Math.floor(question.decimalNumber || 0) * 10} こあるね
              </>
            ),
            en: (
              <>
                <strong>0.1 is one part of 1 divided into 10</strong><br />
                The ones place equals 10 tenths!<br />
                {question.decimalNumber} has {Math.floor(question.decimalNumber || 0)} in the ones place,<br />
                so there are {Math.floor(question.decimalNumber || 0) * 10} tenths.
              </>
            ),
          };
        } else {
          const ones = Math.floor(question.decimalNumber || 0);
          const tenths = Math.floor(((question.decimalNumber || 0) * 10) % 10);
          const hundredths = Math.floor(((question.decimalNumber || 0) * 100) % 10);
          return {
            ja: (
              <>
                💡 <strong>0.01は0.1を10こに分けた1つ分</strong><br />
                1の位：{ones} → 0.01を{ones * 100}こ<br />
                0.1の位：{tenths} → 0.01を{tenths * 10}こ<br />
                0.01の位：{hundredths} → 0.01を{hundredths}こ<br />
                全部で：{ones * 100 + tenths * 10 + hundredths}こ
              </>
            ),
            en: (
              <>
                <strong>0.01 is one part of 0.1 divided into 10</strong><br />
                Ones: {ones} → {ones * 100} hundredths<br />
                Tenths: {tenths} → {tenths * 10} hundredths<br />
                Hundredths: {hundredths} → {hundredths} hundredths<br />
                Total: {ones * 100 + tenths * 10 + hundredths}
              </>
            ),
          };
        }
      case 'decimal-add-subtract':
        return {
          ja: (
            <>
              💡 <strong>ステップ:</strong><br />
              ① 小数点の位置をそろえる<br />
              ② 桁がないところは0を入れる<br />
              ③ 普通に計算する
            </>
          ),
          en: (
            <>
              <strong>Steps:</strong><br />
              1. Align decimal points<br />
              2. Fill empty places with zeros<br />
              3. Calculate normally
            </>
          ),
        };
      case 'decimal-shift':
        const shiftText = {
          'x10': '右へ1つ',
          'x100': '右へ2つ',
          'divide10': '左へ1つ',
          'divide100': '左へ2つ',
        };
        const shiftTextEn = {
          'x10': 'right 1',
          'x100': 'right 2',
          'divide10': 'left 1',
          'divide100': 'left 2',
        };
        return {
          ja: (
            <>
              💡 <strong>小数点を{shiftText[question.shiftType || 'x10']}移動！</strong><br />
              {question.originalNumber} → 小数点を動かすと？
            </>
          ),
          en: (
            <>
              <strong>Move decimal point {shiftTextEn[question.shiftType || 'x10']}!</strong><br />
              {question.originalNumber} → Move the decimal point
            </>
          ),
        };
      case 'decimal-multiply-divide':
        if (question.operation === 'multiply') {
          // Get decimal places from the question
          const decimalStr = question.decimalNumber?.toString() || '';
          const decimalPlaces = decimalStr.includes('.') ? decimalStr.split('.')[1].length : 0;

          return {
            ja: (
              <>
                💡 <strong>かけ算のコツ：</strong><br />
                ① {question.decimalNumber} → {decimalStr.replace('.', '')} としてかける（小数点を一時的に消す）<br />
                ② かけ算の答えに、小数点を{decimalPlaces}つ左から入れる
              </>
            ),
            en: (
              <>
                <strong>Multiplication Tip:</strong><br />
                1. Multiply {decimalStr.replace('.', '')} × {question.wholeNumber} (temporarily remove decimal)<br />
                2. Place decimal {decimalPlaces} place{decimalPlaces > 1 ? 's' : ''} from the right in your answer
              </>
            ),
          };
        } else {
          return {
            ja: (
              <>
                💡 <strong>わり算のコツ：</strong><br />
                ① 小数点を一時的に無視して、{question.decimalNumber?.toString().replace('.', '')} ÷ {question.wholeNumber} と考える<br />
                ② {question.decimalNumber?.toString().replace('.', '')} ÷ {question.wholeNumber} = {parseInt(question.decimalNumber?.toString().replace('.', '') || '0') / (question.wholeNumber || 1)}<br />
                ③ 元の数の小数点の位置に合わせて、答えに小数点を入れる（{question.decimalNumber?.toString().includes('.') ? question.decimalNumber?.toString().split('.')[1].length : 1}つ左から）
              </>
            ),
            en: (
              <>
                <strong>Division Tip:</strong><br />
                1. Temporarily ignore the decimal: divide {question.decimalNumber?.toString().replace('.', '')} ÷ {question.wholeNumber}<br />
                2. {question.decimalNumber?.toString().replace('.', '')} ÷ {question.wholeNumber} = {parseInt(question.decimalNumber?.toString().replace('.', '') || '0') / (question.wholeNumber || 1)}<br />
                3. Match the original decimal position: place decimal {question.decimalNumber?.toString().includes('.') ? question.decimalNumber?.toString().split('.')[1].length : 1} place{question.decimalNumber?.toString().includes('.') && question.decimalNumber?.toString().split('.')[1].length > 1 ? 's' : ''} from the right
              </>
            ),
          };
        }
      default:
        return { ja: '', en: '' };
    }
  };

  const hintText = getHintText();

  // Render visual aid based on topic
  const renderVisualAid = () => {
    if (question.topic === 'decimal-add-subtract' && question.num1 !== undefined && question.num2 !== undefined) {
      return (
        <VerticalDecimalGrid
          num1={question.num1}
          num2={question.num2}
          operation={question.operation || 'add'}
          decimalPlaces1={question.decimalPlaces1 || 1}
          decimalPlaces2={question.decimalPlaces2 || 2}
          gridAnswers={gridAnswers}
          onGridAnswerChange={onGridAnswerChange || (() => {})}
          graded={graded}
        />
      );
    }

    if (question.topic === 'decimal-shift' && question.originalNumber !== undefined) {
      return (
        <DecimalShiftArrow
          originalNumber={question.originalNumber}
          shiftType={question.shiftType || 'x10'}
        />
      );
    }

    if (question.topic === 'decimal-multiply-divide' && question.decimalNumber !== undefined && question.wholeNumber !== undefined) {
      // Show a visual representation of the problem
      const isMultiply = question.operation === 'multiply';
      return (
        <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
          <p className="text-sm font-bold text-foreground mb-3 text-center">
            {isMultiply ? '✖️ 小数のかけ算 / Decimal Multiplication' : '➗ 小数のわり算 / Decimal Division'}
          </p>
          <div className="flex items-center justify-center gap-3 text-xl font-bold">
            <span className="text-primary">{question.decimalNumber}</span>
            <span className="text-muted-foreground">{isMultiply ? '×' : '÷'}</span>
            <span className="text-kid-purple">{question.wholeNumber}</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-foreground">?</span>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            {isMultiply
              ? 'ヒント：' + question.decimalNumber?.toString().replace('.', '') + ' × ' + question.wholeNumber + ' を計算して、小数点を' + (question.decimalNumber?.toString().includes('.') ? question.decimalNumber?.toString().split('.')[1].length : 2) + 'つ左から入れる / Hint: Calculate ' + question.decimalNumber?.toString().replace('.', '') + ' × ' + question.wholeNumber + ', then place decimal ' + (question.decimalNumber?.toString().includes('.') ? question.decimalNumber?.toString().split('.')[1].length : 2) + ' place' + ((question.decimalNumber?.toString().includes('.') ? question.decimalNumber?.toString().split('.')[1].length : 2) > 1 ? 's' : '') + ' from the right'
              : 'ヒント：' + question.decimalNumber?.toString().replace('.', '') + ' ÷ ' + question.wholeNumber + ' を計算して、小数点を' + (question.decimalNumber?.toString().includes('.') ? question.decimalNumber?.toString().split('.')[1].length : 1) + 'つ左から入れる / Hint: Calculate ' + question.decimalNumber?.toString().replace('.', '') + ' ÷ ' + question.wholeNumber + ', then place decimal ' + (question.decimalNumber?.toString().includes('.') ? question.decimalNumber?.toString().split('.')[1].length : 1) + ' place' + ((question.decimalNumber?.toString().includes('.') ? question.decimalNumber?.toString().split('.')[1].length : 1) > 1 ? 's' : '') + ' from the right'}
          </p>
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

            {!graded ? (
              <input
                type="number"
                step="0.001"
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

          {/* Formula for incorrect answers */}
          {graded && !isCorrect && (
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-sm text-red-500 font-bold">
                {question.formula}
              </span>
              <span className="text-xs text-red-400 block">
                {question.formulaEn}
              </span>
              {onTeachMe && (
                <button
                  onClick={onTeachMe}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-sm font-medium transition-colors mt-3"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>おしえて / Teach Me</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecimalQuestionItem;
