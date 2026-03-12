import { useState } from 'react';

interface LongDivisionVisualizerProps {
  dividend: number;
  divisor: number;
  quotient: number;
}

const LongDivisionVisualizer = ({
  dividend,
  divisor,
  quotient,
}: LongDivisionVisualizerProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const dividendStr = dividend.toString();
  const quotientStr = quotient.toString();

  // Calculate the steps for long division
  const steps = [];
  let remaining = 0;
  let currentDividend = '';

  for (let i = 0; i < dividendStr.length; i++) {
    currentDividend += dividendStr[i];
    let currentNum = parseInt(currentDividend) + remaining * 10;

    // Find how many times divisor goes into current number
    const digit = Math.floor(currentNum / divisor);
    const product = digit * divisor;
    const remainder = currentNum - product;

    steps.push({
      position: i,
      digit: digit,
      currentNum: currentNum,
      product: product,
      remainder: remainder,
      currentDividend: currentDividend,
    });

    remaining = remainder;
    currentDividend = '';
  }

  const stepDescriptions = [
    { title: '準備', titleEn: 'Setup', desc: `${dividend} ÷ ${divisor} の筆算を始めます`, descEn: `Starting long division for ${dividend} ÷ ${divisor}` },
    ...steps.flatMap((step, idx) => [
      {
        title: `ステップ ${idx + 1}①: たてる`,
        titleEn: `Step ${idx + 1}①: Estimate`,
        desc: `${step.currentNum} ÷ ${divisor} = ${step.digit}（${divisor}×${step.digit}=${step.product}）`,
        descEn: `${step.currentNum} ÷ ${divisor} = ${step.digit} (${divisor}×${step.digit}=${step.product})`,
      },
      {
        title: `ステップ ${idx + 1}②: かける・ひく`,
        titleEn: `Step ${idx + 1}②: Multiply & Subtract`,
        desc: `${step.currentNum} - ${step.product} = ${step.remainder}`,
        descEn: `${step.currentNum} - ${step.product} = ${step.remainder}`,
      },
      ...(idx < steps.length - 1 ? [{
        title: `ステップ ${idx + 1}③: おろす`,
        titleEn: `Step ${idx + 1}③: Bring down`,
        desc: `次の桁「${dividendStr[idx + 1]}」を下ろす → ${step.remainder}${dividendStr[idx + 1]}`,
        descEn: `Bring down next digit "${dividendStr[idx + 1]}" → ${step.remainder}${dividendStr[idx + 1]}`,
      }] : []),
    ]),
    { title: '完成', titleEn: 'Complete', desc: `答えは ${quotient}`, descEn: `The answer is ${quotient}` },
  ];

  const totalSteps = stepDescriptions.length;
  const currentStepData = stepDescriptions[currentStep];

  // Calculate which digits to highlight
  let highlightQuotientIndex = -1;
  let highlightDividendIndex = -1;
  let showProduct = false;
  let showRemainder = false;
  let currentProduct = 0;
  let currentRemainder = 0;

  if (currentStep > 0 && currentStep < totalSteps - 1) {
    const stepProgress = currentStep - 1;
    const stepGroup = Math.floor(stepProgress / 3);
    const subStep = stepProgress % 3;

    if (stepGroup < steps.length) {
      const step = steps[stepGroup];
      highlightQuotientIndex = stepGroup;
      highlightDividendIndex = stepGroup;
      currentProduct = step.product;
      currentRemainder = step.remainder;

      if (subStep === 0) {
        // Estimate step
        showProduct = false;
      } else if (subStep === 1) {
        // Multiply and subtract
        showProduct = true;
        showRemainder = true;
      } else {
        // Bring down
        highlightDividendIndex = stepGroup + 1;
      }
    }
  }

  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📝 筆算のステップ / Long Division Steps
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

      {/* Division bracket visualization */}
      <div className="flex justify-center mb-4">
        <svg viewBox="0 0 300 150" className="w-full max-w-sm">
          {/* Background */}
          <rect x="0" y="0" width="300" height="150" fill="transparent" />

          {/* Divisor */}
          <text
            x="40"
            y="70"
            textAnchor="middle"
            className="fill-foreground text-3xl font-bold"
          >
            {divisor}
          </text>

          {/* Bracket */}
          <path
            d="M 65 30 L 65 90 Q 65 100 75 100 L 250 100"
            fill="none"
            stroke="#374151"
            strokeWidth="3"
          />

          {/* Dividend */}
          {dividendStr.split('').map((digit, index) => (
            <g key={`div-${index}`}>
              <text
                x={85 + index * 45}
                y="70"
                textAnchor="middle"
                className={`text-3xl font-bold transition-all duration-500 ${
                  index === highlightDividendIndex
                    ? 'fill-primary bg-kid-yellow/30'
                    : 'fill-foreground'
                }`}
                style={{
                  filter: index === highlightDividendIndex ? 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))' : 'none',
                }}
              >
                {digit}
              </text>
              {/* Highlight box */}
              {index === highlightDividendIndex && (
                <rect
                  x={60 + index * 45}
                  y="40"
                  width="50"
                  height="40"
                  fill="#fbbf24"
                  fillOpacity="0.3"
                  rx="8"
                />
              )}
            </g>
          ))}

          {/* Quotient on top */}
          {quotientStr.split('').map((digit, index) => (
            <g key={`quot-${index}`}>
              <text
                x={85 + index * 45}
                y="25"
                textAnchor="middle"
                className={`text-3xl font-bold transition-all duration-500 ${
                  index === highlightQuotientIndex
                    ? 'fill-primary'
                    : currentStep < index * 3 + 1
                    ? 'fill-gray-300'
                    : 'fill-foreground'
                }`}
              >
                {currentStep > index * 3 + 1 ? digit : '?'}
              </text>
              {/* Highlight for quotient */}
              {index === highlightQuotientIndex && currentStep > 0 && currentStep < totalSteps - 1 && (
                <>
                  <rect
                    x={60 + index * 45}
                    y="0"
                    width="50"
                    height="35"
                    fill="#3b82f6"
                    fillOpacity="0.2"
                    rx="8"
                  />
                  <text x={85 + index * 45} y="-5" textAnchor="middle" className="fill-primary text-xs font-bold">
                    たてる
                  </text>
                </>
              )}
            </g>
          ))}

          {/* Show product (multiply step) */}
          {showProduct && currentStep > 0 && (
            <g className="animate-bounce-in">
              <text
                x="140"
                y="120"
                textAnchor="middle"
                className="fill-blue-600 text-xl font-bold"
              >
                {currentProduct} ← かける
              </text>
            </g>
          )}

          {/* Show remainder (subtract step) */}
          {showRemainder && currentStep > 0 && (
            <g className="animate-bounce-in">
              <text
                x="200"
                y="120"
                textAnchor="middle"
                className="fill-green-600 text-xl font-bold"
              >
                = {currentRemainder} ← ひく
              </text>
            </g>
          )}

          {/* Final answer */}
          {currentStep === totalSteps - 1 && (
            <g>
              <text
                x="150"
                y="140"
                textAnchor="middle"
                className="fill-primary text-2xl font-black"
              >
                答え = {quotient}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Step navigation */}
      <div className="flex items-center justify-center gap-3">
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

export default LongDivisionVisualizer;
