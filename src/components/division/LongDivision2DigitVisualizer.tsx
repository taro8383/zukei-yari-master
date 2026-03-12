interface LongDivision2DigitVisualizerProps {
  dividend: number;
  divisor: number;
  quotient: number;
}

const LongDivision2DigitVisualizer = ({
  dividend,
  divisor,
  quotient,
}: LongDivision2DigitVisualizerProps) => {
  // For 2-digit divisor, we need to estimate the quotient digit
  const quotientStr = quotient.toString();
  const dividendStr = dividend.toString();

  // Calculate steps
  const steps = [];
  let remaining = 0;
  let currentDividend = '';

  for (let i = 0; i < dividendStr.length; i++) {
    currentDividend += dividendStr[i];
    let currentNum = parseInt(currentDividend) + remaining * 10;

    const digit = Math.floor(currentNum / divisor);
    const product = digit * divisor;
    const remainder = currentNum - product;

    steps.push({
      position: i,
      digit,
      currentNum,
      product,
      remainder,
      currentDividend,
    });

    remaining = remainder;
    currentDividend = '';
  }

  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        ✏️ 2けたのわり算 / 2-Digit Division
      </p>

      {/* Main equation */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <div className="flex justify-center items-center gap-2 text-xl font-bold">
          <span>{dividend}</span>
          <span className="text-primary">÷</span>
          <span>{divisor}</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-kid-green text-2xl">{quotient}</span>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-center text-muted-foreground">
          ステップ / Steps
        </p>

        {steps.map((step, idx) => (
          <div key={idx} className="bg-background rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-kid-blue text-white text-xs flex items-center justify-center font-bold">
                {idx + 1}
              </span>
              <span className="text-sm font-bold text-foreground">
                見当をつける / Estimate
              </span>
            </div>

            <div className="ml-8 space-y-2">
              {/* Current number being divided */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {step.currentNum} ÷ {divisor} =
                </span>
                <span className="text-lg font-bold text-kid-green">
                  {step.digit}
                </span>
              </div>

              {/* Estimation hint */}
              <div className="bg-kid-yellow/20 rounded p-2 text-xs">
                <p className="text-muted-foreground">
                  💡 {divisor} × {step.digit} = {step.product}（{step.product} ≤ {step.currentNum}）
                </p>
              </div>

              {/* Multiply and subtract */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-kid-blue/10 rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground">かける / Multiply</p>
                  <p className="font-bold text-kid-blue">{divisor} × {step.digit}</p>
                  <p className="font-bold text-lg">= {step.product}</p>
                </div>
                <div className="bg-kid-green/10 rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground">ひく / Subtract</p>
                  <p className="font-bold text-kid-green">{step.currentNum} - {step.product}</p>
                  <p className="font-bold text-lg">= {step.remainder}</p>
                </div>
              </div>

              {/* Bring down (if not last step) */}
              {idx < steps.length - 1 && (
                <div className="bg-kid-purple/10 rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground">
                    おろす / Bring down: 次の「{dividendStr[idx + 1]}」を下ろす
                  </p>
                  <p className="font-bold text-kid-purple">
                    {step.remainder} → {step.remainder}{dividendStr[idx + 1]}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Final answer */}
      <div className="mt-4 bg-kid-green/20 rounded-lg p-4 border-2 border-kid-green">
        <p className="text-center font-bold text-kid-green text-lg">
          答え / Answer: {quotient}
        </p>
        <p className="text-xs text-center text-muted-foreground mt-1">
          {divisor} × {quotient} = {dividend} ✓
        </p>
      </div>
    </div>
  );
};

export default LongDivision2DigitVisualizer;
