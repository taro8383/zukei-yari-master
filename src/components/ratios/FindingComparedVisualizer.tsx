interface FindingComparedVisualizerProps {
  baseAmount: number;
  ratio: number;
  comparedAmount: number;
}

const FindingComparedVisualizer = ({
  baseAmount,
  ratio,
  comparedAmount,
}: FindingComparedVisualizerProps) => {
  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🪣 くらべる数を求める / Finding the Compared Amount
      </p>

      {/* Bucket visual */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          バケツの水 / Water in buckets
        </p>

        <div className="flex justify-center items-end gap-8 mb-3">
          {/* Red bucket (base) */}
          <div className="text-center">
            <div
              className="w-16 bg-red-400/40 border-2 border-red-500 rounded-b-lg mx-auto flex items-end justify-center relative"
              style={{ height: `${Math.min(baseAmount * 3 + 40, 100)}px` }}
            >
              <div
                className="w-full bg-red-500/60 rounded-b absolute bottom-0"
                style={{ height: `${Math.min(baseAmount * 3, 80)}%` }}
              />
              <span className="relative z-10 text-white font-bold text-sm mb-1">{baseAmount}L</span>
            </div>
            <p className="text-xs font-bold mt-1 text-red-600">赤いバケツ</p>
            <p className="text-xs text-muted-foreground">Red bucket</p>
          </div>

          {/* Multiplication sign */}
          <div className="text-2xl text-primary font-bold pb-8">×</div>

          {/* Ratio indicator */}
          <div className="text-center pb-8">
            <div className="w-16 h-16 rounded-full bg-kid-yellow/30 border-2 border-kid-yellow flex items-center justify-center">
              <span className="text-xl font-bold text-kid-yellow">{ratio}倍</span>
            </div>
          </div>

          {/* Arrow */}
          <div className="text-2xl text-primary font-bold pb-8">→</div>

          {/* Blue bucket (compared) */}
          <div className="text-center">
            <div
              className="w-16 bg-blue-400/40 border-2 border-blue-500 rounded-b-lg mx-auto flex items-end justify-center relative"
              style={{ height: `${Math.min(comparedAmount * 3 + 40, 140)}px` }}
            >
              <div
                className="w-full bg-blue-500/60 rounded-b absolute bottom-0"
                style={{ height: `${Math.min(comparedAmount * 3, 100)}%` }}
              />
              <span className="relative z-10 text-white font-bold text-sm mb-1">{comparedAmount}L</span>
            </div>
            <p className="text-xs font-bold mt-1 text-blue-600">青いバケツ</p>
            <p className="text-xs text-muted-foreground">Blue bucket</p>
          </div>
        </div>
      </div>

      {/* Problem statement */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          ❓ 問題 / Question
        </p>
        <p className="text-sm text-center">
          赤いバケツに {baseAmount}L、青いバケツは {ratio} 倍の水が入ります。青いバケツには何L入りますか？
        </p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          The red bucket has {baseAmount}L. The blue bucket holds {ratio} times that. How much does the blue bucket hold?
        </p>
      </div>

      {/* Formula */}
      <div className="bg-kid-blue/20 rounded-lg p-3 mb-4 border border-kid-blue">
        <p className="text-xs font-bold text-kid-blue mb-2 text-center">
          📐 公式 / Formula
        </p>
        <div className="text-center text-sm">
          <p className="font-bold mb-1">
            もとにする数 × 倍 = くらべる数
          </p>
          <p className="text-xs text-muted-foreground">
            Base × Multiple = Compared
          </p>
        </div>
      </div>

      {/* Calculation */}
      <div className="bg-kid-green/20 rounded-lg p-3 mb-4 border border-kid-green">
        <p className="text-xs font-bold text-kid-green mb-2 text-center">
          📝 計算 / Calculation
        </p>
        <div className="flex justify-center items-center gap-2 text-lg font-bold">
          <span className="text-primary">{baseAmount}</span>
          <span className="text-primary">×</span>
          <span className="text-kid-yellow">{ratio}</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-2xl text-kid-green">{comparedAmount}</span>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-1">
          L (リットル / liters)
        </p>
      </div>

      {/* Result */}
      <div className="bg-kid-green/20 rounded-lg p-4 border-2 border-kid-green text-center">
        <p className="text-xs text-muted-foreground mb-1">
          答え / Answer
        </p>
        <p className="text-3xl font-bold text-kid-green">
          {comparedAmount}L
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {comparedAmount} liters
        </p>
      </div>

      {/* Key point */}
      <div className="mt-3 bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 「くらべる数」を求めるときは「もとにする数 × 倍」/ To find the compared amount, multiply base by multiple
        </p>
      </div>
    </div>
  );
};

export default FindingComparedVisualizer;
