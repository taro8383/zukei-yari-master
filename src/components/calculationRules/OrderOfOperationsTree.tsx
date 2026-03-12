import { useState } from 'react';

interface OrderOfOperationsTreeProps {
  expression: string;
  steps?: Array<{
    description: string;
    descriptionEn: string;
    operation: string;
    result: number;
  }>;
}

const OrderOfOperationsTree = ({ expression, steps }: OrderOfOperationsTreeProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Parse expression to extract numbers
  // Type A: "A + B × C" (multiplication first)
  // Type B: "(A - B) ÷ C" (parentheses first)

  const isTypeB = expression.includes('(');

  let a: number, b: number, c: number;

  if (isTypeB) {
    // Parse (A - B) ÷ C
    const match = expression.match(/\((\d+)\s*[-]\s*(\d+)\)\s*÷\s*(\d+)/);
    if (match) {
      a = parseInt(match[1]);
      b = parseInt(match[2]);
      c = parseInt(match[3]);
    } else {
      a = 30; b = 10; c = 5; // defaults
    }
  } else {
    // Parse A + B × C
    const match = expression.match(/(\d+)\s*\+\s*(\d+)\s*×\s*(\d+)/);
    if (match) {
      a = parseInt(match[1]);
      b = parseInt(match[2]);
      c = parseInt(match[3]);
    } else {
      a = 20; b = 5; c = 4; // defaults
    }
  }

  const firstResult = isTypeB ? a - b : b * c;
  const finalResult = isTypeB ? firstResult / c : a + firstResult;

  // Define step descriptions
  const stepDescriptions = [
    { title: '準備', titleEn: 'Setup', desc: `${expression} の計算を始めます`, descEn: `Starting calculation for ${expression}` },
    {
      title: isTypeB ? 'ステップ1: かっこを先に' : 'ステップ1: かけ算を先に',
      titleEn: isTypeB ? 'Step 1: Parentheses First' : 'Step 1: Multiply First',
      desc: isTypeB ? `(${a} - ${b}) = ${firstResult}` : `${b} × ${c} = ${firstResult}`,
      descEn: isTypeB ? `(${a} - ${b}) = ${firstResult}` : `${b} × ${c} = ${firstResult}`,
    },
    {
      title: isTypeB ? 'ステップ2: わり算' : 'ステップ2: たし算',
      titleEn: isTypeB ? 'Step 2: Division' : 'Step 2: Addition',
      desc: isTypeB ? `${firstResult} ÷ ${c} = ${finalResult}` : `${a} + ${firstResult} = ${finalResult}`,
      descEn: isTypeB ? `${firstResult} ÷ ${c} = ${finalResult}` : `${a} + ${firstResult} = ${finalResult}`,
    },
    { title: '完成', titleEn: 'Complete', desc: `答えは ${finalResult}`, descEn: `The answer is ${finalResult}` },
  ];

  const totalSteps = stepDescriptions.length;
  const currentStepData = stepDescriptions[currentStep];

  // Determine highlight state based on current step
  const highlightFirstBox = currentStep === 1;
  const highlightSecondBox = currentStep === 2;
  const showFirstResult = currentStep >= 2;
  const showFinalResult = currentStep === 3;

  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📊 計算のじゅんじょツリー / Order of Operations Tree
      </p>

      {/* Step description */}
      <div className="bg-background/70 rounded-lg p-3 mb-4 text-center">
        <p className="font-bold text-primary text-sm">
          {currentStepData.title}
        </p>
        <p className="text-xs text-muted-foreground">{currentStepData.titleEn}</p>
        <p className="text-foreground font-medium mt-1 text-sm">
          {currentStepData.desc}
        </p>
        <p className="text-xs text-muted-foreground">{currentStepData.descEn}</p>
      </div>

      <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto">
        {/* Background */}
        <rect x="0" y="0" width="400" height="200" fill="transparent" />

        {/* Title */}
        <text x="200" y="20" textAnchor="middle" className="fill-foreground text-base font-bold">
          {expression}
        </text>

        {isTypeB ? (
          // Type B: (A - B) ÷ C
          <>
            {/* First operation box - highlighted */}
            <rect
              x="80" y="40" width="120" height="40"
              rx="8"
              fill={highlightFirstBox ? "#fbbf24" : "#e5e7eb"}
              stroke={highlightFirstBox ? "#f59e0b" : "#9ca3af"}
              strokeWidth="2"
            />
            <text x="140" y="65" textAnchor="middle" className="fill-foreground text-sm font-bold">
              ({a} - {b})
            </text>

            {/* Arrow down */}
            <path
              d="M140 100 L140 110 L200 120 L200 130"
              fill="none"
              stroke={highlightFirstBox ? "#f59e0b" : "#9ca3af"}
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />

            {/* Second operation box */}
            <rect
              x="130" y="130" width="140" height="40"
              rx="8"
              fill={highlightSecondBox ? "#fbbf24" : "#e5e7eb"}
              stroke={highlightSecondBox ? "#f59e0b" : "#9ca3af"}
              strokeWidth="2"
            />
            <text x="200" y="155" textAnchor="middle" className="fill-foreground text-sm font-bold">
              {showFirstResult ? `${firstResult} ÷ ${c}` : '? ÷ ' + c}
            </text>

            {/* Division symbol on the right */}
            <text x="260" y="65" textAnchor="middle" className="fill-muted-foreground text-lg">
              ÷ {c}
            </text>

            {/* Legend */}
            <text x="320" y="60" textAnchor="start" className="fill-foreground text-xs">
              ① かっこを先に
            </text>
            <text x="320" y="75" textAnchor="start" className="fill-gray-500 text-xs">
              Parentheses first
            </text>

            {/* Final answer */}
            {showFinalResult && (
              <text x="200" y="195" textAnchor="middle" className="fill-primary text-xl font-black">
                答え = {finalResult}
              </text>
            )}
          </>
        ) : (
          // Type A: A + B × C
          <>
            {/* First operation box - highlighted */}
            <rect
              x="180" y="40" width="100" height="40"
              rx="8"
              fill={highlightFirstBox ? "#fbbf24" : "#e5e7eb"}
              stroke={highlightFirstBox ? "#f59e0b" : "#9ca3af"}
              strokeWidth="2"
            />
            <text x="230" y="65" textAnchor="middle" className="fill-foreground text-sm font-bold">
              {b} × {c}
            </text>

            {/* Arrow down */}
            <path
              d="M230 90 L230 110 L200 120 L200 130"
              fill="none"
              stroke={highlightFirstBox ? "#f59e0b" : "#9ca3af"}
              strokeWidth="2"
            />

            {/* Second operation box */}
            <rect
              x="130" y="130" width="140" height="40"
              rx="8"
              fill={highlightSecondBox ? "#fbbf24" : "#e5e7eb"}
              stroke={highlightSecondBox ? "#f59e0b" : "#9ca3af"}
              strokeWidth="2"
            />
            <text x="200" y="155" textAnchor="middle" className="fill-foreground text-sm font-bold">
              {showFirstResult ? `${a} + ${firstResult}` : `${a} + ?`}
            </text>

            {/* Plus and A on the left */}
            <text x="110" y="65" textAnchor="middle" className="fill-muted-foreground text-lg">
              {a} +
            </text>

            {/* Legend */}
            <text x="320" y="60" textAnchor="start" className="fill-foreground text-xs">
              ① ×を先に
            </text>
            <text x="320" y="75" textAnchor="start" className="fill-gray-500 text-xs">
              Multiply first
            </text>

            {/* Final answer */}
            {showFinalResult && (
              <text x="200" y="195" textAnchor="middle" className="fill-primary text-xl font-black">
                答え = {finalResult}
              </text>
            )}
          </>
        )}

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
          </marker>
        </defs>
      </svg>

      {/* Step details */}
      {steps && steps.length > 0 && (
        <div className="mt-3 space-y-2">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 text-sm p-2 rounded-lg transition-all ${
                idx + 1 === currentStep
                  ? 'bg-kid-yellow/30 border border-kid-yellow/50'
                  : idx + 1 < currentStep
                  ? 'bg-kid-green/20 border border-kid-green/30'
                  : 'bg-background/50'
              }`}
            >
              <span className="font-bold text-primary">{idx + 1}.</span>
              <span className="text-foreground">
                {idx + 1 < currentStep
                  ? `${step.operation} = ${step.result} ✓`
                  : idx + 1 === currentStep
                  ? `${step.operation} = ?`
                  : step.operation + ' = ?'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Step navigation */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-3 py-2 rounded-lg bg-muted text-foreground font-bold text-sm disabled:opacity-50 hover:bg-muted/80 transition-colors"
        >
          ← 前へ / Prev
        </button>

        <div className="flex gap-1">
          {stepDescriptions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep
                  ? 'bg-primary'
                  : index < currentStep
                  ? 'bg-primary/50'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
          disabled={currentStep === totalSteps - 1}
          className="px-3 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm disabled:opacity-50 hover:bg-primary/90 transition-colors"
        >
          次へ → / Next →
        </button>
      </div>

      {/* Step counter */}
      <p className="text-center text-xs text-muted-foreground mt-2">
        Step {currentStep + 1} of {totalSteps}
      </p>
    </div>
  );
};

export default OrderOfOperationsTree;
