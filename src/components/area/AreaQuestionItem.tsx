import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AreaQuestionItemProps {
  question: {
    id: number;
    topic: 'calculating-area' | 'large-area-units' | 'choosing-units' | 'composite-shapes';
    text: string;
    textEn: string;
    explanation?: string;
    explanationEn?: string;
    shape?: 'rectangle' | 'square';
    width?: number;
    height?: number;
    side?: number;
    answerArea?: number;
    fromUnit?: 'm2' | 'a' | 'ha' | 'km2';
    toUnit?: 'm2' | 'a' | 'ha' | 'km2';
    answerConversion?: number;
    appropriateUnit?: 'cm2' | 'm2' | 'a' | 'ha' | 'km2';
    dimensions?: {
      outerWidth: number;
      outerHeight: number;
      cutoutWidth: number;
      cutoutHeight: number;
    };
  };
  index: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  graded: boolean;
  isCorrect?: boolean;
}

const AreaQuestionItem = ({
  question,
  index,
  userAnswer,
  onAnswerChange,
  graded,
  isCorrect,
}: AreaQuestionItemProps) => {
  const [showHint, setShowHint] = useState(false);

  // Get hint text based on topic
  const getHintText = () => {
    switch (question.topic) {
      case 'calculating-area':
        if (question.shape === 'rectangle') {
          return {
            ja: `💡 長方形の面積 = たて × よこ\n${question.height} cm × ${question.width} cm = ?`,
            en: `Rectangle area = height × width\n${question.height} cm × ${question.width} cm = ?`,
          };
        } else {
          return {
            ja: `💡 正方形の面積 = 一辺 × 一辺\n${question.side} cm × ${question.side} cm = ?`,
            en: `Square area = side × side\n${question.side} cm × ${question.side} cm = ?`,
          };
        }
      case 'large-area-units':
        const unitNames: Record<string, { ja: string; en: string }> = {
          m2: { ja: 'm²', en: 'm²' },
          a: { ja: 'a', en: 'ares' },
          ha: { ja: 'ha', en: 'hectares' },
          km2: { ja: 'km²', en: 'km²' },
        };
        const fromUnit = unitNames[question.fromUnit!];
        const toUnit = unitNames[question.toUnit!];
        return {
          ja: `💡 単位の換算:\n1${fromUnit.ja} → ${getConversionMultiplier(question.fromUnit!, question.toUnit!)}${toUnit.ja}`,
          en: `Unit conversion:\n1 ${fromUnit.en} → ${getConversionMultiplier(question.fromUnit!, question.toUnit!)} ${toUnit.en}`,
        };
      case 'choosing-units':
        return {
          ja: `💡 ヒント: ${question.explanation?.split('。')[1] || '小さいものはcm²、部屋はm²、大きな土地はhaやkm²'}`,
          en: `Hint: ${question.explanationEn?.split('.')[1] || 'Small items: cm², rooms: m², large land: ha or km²'}`,
        };
      case 'composite-shapes':
        const dims = question.dimensions;
        if (dims) {
          const rect1W = dims.outerWidth - dims.cutoutWidth;
          const rect1H = dims.outerHeight;
          const rect2W = dims.cutoutWidth;
          const rect2H = dims.outerHeight - dims.cutoutHeight;
          return {
            ja: `💡 L字の形の計算方法:\n① 長方形A：${rect1W} × ${rect1H} = ${rect1W * rect1H} cm²\n② 長方形B：${rect2W} × ${rect2H} = ${rect2W * rect2H} cm²\n③ 合計：${rect1W * rect1H} + ${rect2W * rect2H} = ${(rect1W * rect1H) + (rect2W * rect2H)} cm²`,
            en: `L-shape calculation:\n1. Rectangle A: ${rect1W} × ${rect1H} = ${rect1W * rect1H} cm²\n2. Rectangle B: ${rect2W} × ${rect2H} = ${rect2W * rect2H} cm²\n3. Total: ${(rect1W * rect1H) + (rect2W * rect2H)} cm²`,
          };
        }
        return {
          ja: `💡 L字の形の計算方法:\n① 2つの長方形に分ける\n② それぞれの面積を計算\n③ たし算する`,
          en: `L-shape calculation:\n1. Split into 2 rectangles\n2. Calculate each area\n3. Add together`,
        };
      default:
        return { ja: '', en: '' };
    }
  };

  const getConversionMultiplier = (from: string, to: string): number => {
    const conversions: Record<string, Record<string, number>> = {
      m2: { a: 0.01, ha: 0.0001, km2: 0.000001 },
      a: { m2: 100, ha: 0.01, km2: 0.0001 },
      ha: { m2: 10000, a: 100, km2: 0.01 },
      km2: { m2: 1000000, a: 10000, ha: 100 },
    };
    return conversions[from]?.[to] || 1;
  };

  const hintText = getHintText();

  // Check topic types
  const isCalculatingArea = question.topic === 'calculating-area';
  const isLargeAreaUnits = question.topic === 'large-area-units';
  const isChoosingUnits = question.topic === 'choosing-units';
  const isCompositeShapes = question.topic === 'composite-shapes';

  // Render SVG for calculating area
  const renderAreaShape = () => {
    if (!isCalculatingArea) return null;

    const width = question.width || question.side || 5;
    const height = question.height || question.side || 5;

    // Scale to fit SVG while maintaining aspect ratio
    const maxSize = 150;
    const scale = Math.min(maxSize / Math.max(width, height), 25);
    const svgWidth = width * scale + 60;
    const svgHeight = height * scale + 60;

    return (
      <div className="flex flex-col items-center gap-2 mb-4">
        <p className="text-sm text-muted-foreground">
          図形 / Shape
        </p>
        <svg width={svgWidth} height={svgHeight} className="border rounded-lg bg-white">
          {/* Shape */}
          <rect
            x="40"
            y="20"
            width={width * scale}
            height={height * scale}
            fill="#60a5fa"
            stroke="#3b82f6"
            strokeWidth={2}
          />
          {/* Grid lines */}
          {Array.from({ length: width + 1 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={40 + i * scale}
              y1="20"
              x2={40 + i * scale}
              y2={20 + height * scale}
              stroke="#93c5fd"
              strokeWidth={1}
              strokeDasharray="4"
            />
          ))}
          {Array.from({ length: height + 1 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="40"
              y1={20 + i * scale}
              x2={40 + width * scale}
              y2={20 + i * scale}
              stroke="#93c5fd"
              strokeWidth={1}
              strokeDasharray="4"
            />
          ))}
          {/* Width label */}
          <text
            x={40 + (width * scale) / 2}
            y={20 + height * scale + 20}
            textAnchor="middle"
            fontSize={14}
            fill="#374151"
          >
            {width} cm
          </text>
          {/* Height label */}
          <text
            x={20}
            y={20 + (height * scale) / 2 + 5}
            textAnchor="middle"
            fontSize={14}
            fill="#374151"
          >
            {height} cm
          </text>
        </svg>
      </div>
    );
  };

  // Render L-shape for composite shapes
  const renderLShape = () => {
    if (!isCompositeShapes || !question.dimensions) return null;

    const { outerWidth, outerHeight, cutoutWidth, cutoutHeight } = question.dimensions;

    // Scale to fit SVG
    const maxSize = 150;
    const scale = Math.min(maxSize / Math.max(outerWidth, outerHeight), 20);
    const svgWidth = outerWidth * scale + 80;
    const svgHeight = outerHeight * scale + 80;

    const rect1Width = outerWidth - cutoutWidth;
    const rect1Height = outerHeight;
    const rect2Width = cutoutWidth;
    const rect2Height = outerHeight - cutoutHeight;

    return (
      <div className="flex flex-col items-center gap-2 mb-4">
        <p className="text-sm text-muted-foreground">
          L字の形 / L-Shape
        </p>
        <svg width={svgWidth} height={svgHeight} className="border rounded-lg bg-white">
          {/* Rectangle 1 (left/vertical part) */}
          <rect
            x="50"
            y="30"
            width={rect1Width * scale}
            height={rect1Height * scale}
            fill="#60a5fa"
            stroke="#3b82f6"
            strokeWidth={2}
          />
          <text
            x={50 + (rect1Width * scale) / 2}
            y={30 + (rect1Height * scale) / 2 + 5}
            textAnchor="middle"
            fontSize={14}
            fill="white"
            fontWeight="bold"
          >
            A
          </text>

          {/* Rectangle 2 (bottom/right part) */}
          <rect
            x={50 + rect1Width * scale}
            y={30 + rect2Height * scale}
            width={rect2Width * scale}
            height={rect2Height * scale}
            fill="#a78bfa"
            stroke="#8b5cf6"
            strokeWidth={2}
          />
          <text
            x={50 + rect1Width * scale + (rect2Width * scale) / 2}
            y={30 + rect2Height * scale + (rect2Height * scale) / 2 + 5}
            textAnchor="middle"
            fontSize={14}
            fill="white"
            fontWeight="bold"
          >
            B
          </text>

          {/* Dimension labels - show actual rectangle dimensions */}
          {/* Rectangle A width (top) */}
          <text x={50 + (rect1Width * scale) / 2} y="20" textAnchor="middle" fontSize={12} fill="#374151" fontWeight="bold">
            {rect1Width} cm
          </text>
          {/* Rectangle A height (left) */}
          <text x="30" y={30 + (rect1Height * scale) / 2 + 5} textAnchor="middle" fontSize={12} fill="#374151" fontWeight="bold">
            {rect1Height} cm
          </text>
          {/* Rectangle B width (bottom right) */}
          <text x={50 + rect1Width * scale + (rect2Width * scale) / 2} y={30 + outerHeight * scale + 25} textAnchor="middle" fontSize={12} fill="#374151" fontWeight="bold">
            {rect2Width} cm
          </text>
          {/* Rectangle B height (right) */}
          <text x={50 + outerWidth * scale + 20} y={30 + rect2Height * scale + (rect2Height * scale) / 2 + 5} textAnchor="middle" fontSize={12} fill="#374151" fontWeight="bold">
            {rect2Height} cm
          </text>
          {/* Cutout indicators (smaller, secondary) */}
          <text x={50 + rect1Width * scale + (cutoutWidth * scale) / 2} y={30 + cutoutHeight * scale / 2 + 5} textAnchor="middle" fontSize={10} fill="#9ca3af" fontStyle="italic">
            (くりぬき / cutout)
          </text>
        </svg>
        <p className="text-xs text-muted-foreground">
          方法：Aの面積 + Bの面積 / Method: Area A + Area B
        </p>
      </div>
    );
  };

  // Unit options for choosing units
  const unitOptions = [
    { value: 'cm2', label: 'cm² (平方センチメートル / sq cm)' },
    { value: 'm2', label: 'm² (平方メートル / sq m)' },
    { value: 'a', label: 'a (アール / are)' },
    { value: 'ha', label: 'ha (ヘクタール / hectare)' },
    { value: 'km2', label: 'km² (平方キロメートル / sq km)' },
  ];

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

          {/* Visual Aids - only show when graded for calculating area, always for composite shapes */}
          {isCalculatingArea && renderAreaShape()}
          {(isCompositeShapes || graded) && renderLShape()}

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
                  <div className="font-medium text-foreground whitespace-pre-line">{hintText.ja}</div>
                  <div className="text-gray-500 whitespace-pre-line">{hintText.en}</div>
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

            {isChoosingUnits ? (
              // Dropdown for choosing units
              <div className="flex items-center gap-2">
                {!graded ? (
                  <select
                    value={userAnswer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    disabled={graded}
                    className="h-12 px-4 text-base font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                  >
                    <option value="">-- 選択してください / Select --</option>
                    {unitOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <input
                      type="text"
                      value={
                        unitOptions.find((opt) => opt.value === userAnswer)?.label || userAnswer
                      }
                      disabled
                      className="w-64 h-12 text-base font-bold rounded-xl border-2 border-input bg-background opacity-60"
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
              // Number input for other topics
              <div className="flex items-center gap-3 flex-wrap">
                {!graded ? (
                  <>
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => onAnswerChange(e.target.value)}
                      disabled={graded}
                      className="w-32 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                      placeholder="?"
                    />
                    <span className="text-foreground font-medium">
                      {isCalculatingArea && 'cm²'}
                      {isCompositeShapes && 'cm²'}
                      {isLargeAreaUnits && unitOptions.find((opt) => opt.value === question.toUnit)?.label.split(' ')[0]}
                    </span>
                  </>
                ) : (
                  <>
                    <input
                      type="number"
                      value={userAnswer}
                      disabled
                      className="w-32 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background opacity-60"
                    />
                    <span className="text-foreground font-medium">
                      {isCalculatingArea && 'cm²'}
                      {isCompositeShapes && 'cm²'}
                      {isLargeAreaUnits && unitOptions.find((opt) => opt.value === question.toUnit)?.label.split(' ')[0]}
                    </span>
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
              {isChoosingUnits ? (
                // For choosing units questions, show the correct unit
                <>
                  <span className="text-sm text-red-500 font-bold">
                    正解：
                    {unitOptions.find((opt) => opt.value === question.appropriateUnit)?.label}
                  </span>
                </>
              ) : (
                // For other questions, show the numeric answer
                <>
                  <span className="text-sm text-red-500 font-bold">
                    正解：{isCalculatingArea && `${question.answerArea} cm²`}
                    {isCompositeShapes && `${question.answerArea} cm²`}
                    {isLargeAreaUnits && `${question.answerConversion} ${unitOptions.find((opt) => opt.value === question.toUnit)?.label.split(' ')[0]}`}
                  </span>
                  <span className="text-xs text-red-400 block">
                    Correct: {isCalculatingArea && `${question.answerArea} cm²`}
                    {isCompositeShapes && `${question.answerArea} cm²`}
                    {isLargeAreaUnits && `${question.answerConversion} ${unitOptions.find((opt) => opt.value === question.toUnit)?.label.split(' ')[0]}`}
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

export default AreaQuestionItem;
