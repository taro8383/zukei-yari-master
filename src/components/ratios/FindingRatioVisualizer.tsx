interface FindingRatioVisualizerProps {
  baseAmount: number;
  comparedAmount: number;
  ratio: number;
}

const FindingRatioVisualizer = ({
  baseAmount,
  comparedAmount,
  ratio,
}: FindingRatioVisualizerProps) => {
  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📏 何倍ですか / Finding the Multiple
      </p>

      {/* Visual comparison with bars */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          長さを比べる / Comparing lengths
        </p>

        {/* Base amount bar */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold w-20">もとにする数</span>
            <span className="text-xs text-muted-foreground">Base</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-8 bg-primary/40 rounded border-2 border-primary flex items-center justify-center text-sm font-bold min-w-[3rem]"
              style={{ width: `${Math.min(baseAmount * 8, 200)}px` }}
            >
              {baseAmount}
            </div>
            <span className="text-xs text-muted-foreground">(1倍 / 1×)</span>
          </div>
        </div>

        {/* Compared amount bar */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold w-20">くらべる数</span>
            <span className="text-xs text-muted-foreground">Compared</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-8 bg-accent/40 rounded border-2 border-accent flex items-center justify-center text-sm font-bold min-w-[3rem]"
              style={{ width: `${Math.min(comparedAmount * 8, 280)}px` }}
            >
              {comparedAmount}
            </div>
            <span className="text-xs font-bold text-accent">({ratio}倍 / {ratio}×)</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          ❓ 問題 / Question
        </p>
        <p className="text-sm text-center">
          {comparedAmount} は {baseAmount} の何倍ですか？
        </p>
        <p className="text-xs text-muted-foreground text-center">
          How many times bigger is {comparedAmount} than {baseAmount}?
        </p>
      </div>

      {/* Formula */}
      <div className="bg-kid-purple/20 rounded-lg p-3 mb-4 border border-kid-purple">
        <p className="text-xs font-bold text-kid-purple mb-2 text-center">
          📐 公式 / Formula
        </p>
        <div className="text-center text-sm">
          <p className="font-bold mb-1">
            くらべる数 ÷ もとにする数 = 何倍
          </p>
          <p className="text-xs text-muted-foreground">
            Compared ÷ Base = Multiple
          </p>
        </div>
      </div>

      {/* Calculation */}
      <div className="bg-kid-green/20 rounded-lg p-3 mb-4 border border-kid-green">
        <p className="text-xs font-bold text-kid-green mb-2 text-center">
          📝 計算 / Calculation
        </p>
        <div className="flex justify-center items-center gap-2 text-lg font-bold">
          <span className="text-accent">{comparedAmount}</span>
          <span className="text-primary">÷</span>
          <span className="text-primary">{baseAmount}</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-2xl text-kid-green">{ratio}</span>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-1">
          倍 / times
        </p>
      </div>

      {/* Result */}
      <div className="bg-kid-green/20 rounded-lg p-4 border-2 border-kid-green text-center">
        <p className="text-xs text-muted-foreground mb-1">
          答え / Answer
        </p>
        <p className="text-3xl font-bold text-kid-green">
          {ratio}倍
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {ratio} times
        </p>
      </div>

      {/* Key point */}
      <div className="mt-3 bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 「何倍か」を求めるときは「くらべる数 ÷ もとにする数」/ To find "how many times", divide compared by base
        </p>
      </div>
    </div>
  );
};

export default FindingRatioVisualizer;
