interface DivisionPropertiesVisualizerProps {
  dividend: number;
  divisor: number;
  simplifiedDividend: number;
  simplifiedDivisor: number;
  quotient: number;
}

const DivisionPropertiesVisualizer = ({
  dividend,
  divisor,
  simplifiedDividend,
  simplifiedDivisor,
  quotient,
}: DivisionPropertiesVisualizerProps) => {
  // Calculate what we're dividing by (10, 100, etc.)
  const divisorFactor = dividend / simplifiedDividend;

  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        ⚡ わり算の性質 / Division Property
      </p>

      {/* Explanation */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-sm font-bold text-center text-foreground">
          💡 両方の数を同じ数で割っても、答えは変わらない！
        </p>
        <p className="text-xs text-center text-muted-foreground mt-1">
          Dividing both numbers by the same amount keeps the answer the same!
        </p>
      </div>

      {/* Original Problem */}
      <div className="bg-background rounded-lg p-4 border border-border mb-4">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          元の問題 / Original Problem
        </p>
        <div className="flex justify-center items-center gap-2 text-2xl font-bold">
          <span className="text-gray-400">{dividend}</span>
          <span className="text-muted-foreground">÷</span>
          <span className="text-gray-400">{divisor}</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-muted-foreground">?</span>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">
          大きな数で計算しにくい... / Hard to calculate with big numbers...
        </p>
      </div>

      {/* Transformation Arrow */}
      <div className="flex justify-center items-center mb-4">
        <div className="bg-kid-blue/20 rounded-full p-2 border-2 border-kid-blue">
          <span className="text-2xl">⬇️</span>
        </div>
      </div>
      <p className="text-xs text-center text-muted-foreground mb-4">
        両方を {divisorFactor} で割る / Divide both by {divisorFactor}
      </p>

      {/* Simplified Problem */}
      <div className="bg-kid-green/10 rounded-lg p-4 border-2 border-kid-green">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          簡単な問題に変身！ / Transformed to easier problem!
        </p>
        <div className="flex justify-center items-center gap-2 text-2xl font-bold">
          <span className="text-kid-green">{simplifiedDividend}</span>
          <span className="text-primary">÷</span>
          <span className="text-kid-green">{simplifiedDivisor}</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-kid-green text-3xl">{quotient}</span>
        </div>
        <p className="text-xs text-center text-kid-green mt-2">
          パッと計算できる！ / Easy to calculate!
        </p>
      </div>

      {/* Visual representation */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-background/70 rounded-lg p-3 border border-border">
          <p className="text-xs font-bold text-center text-muted-foreground mb-2">
            元の数 / Original
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs w-20 text-right">{dividend}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div className="bg-gray-400 h-3 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-20 text-right">{divisor}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div className="bg-gray-400 h-3 rounded-full" style={{ width: `${(divisor / dividend) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-kid-green/10 rounded-lg p-3 border border-kid-green">
          <p className="text-xs font-bold text-center text-kid-green mb-2">
            簡単化後 / Simplified
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs w-20 text-right">{simplifiedDividend}</span>
              <div className="flex-1 bg-kid-green/20 rounded-full h-3">
                <div className="bg-kid-green h-3 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-20 text-right">{simplifiedDivisor}</span>
              <div className="flex-1 bg-kid-green/20 rounded-full h-3">
                <div className="bg-kid-green h-3 rounded-full" style={{ width: `${(simplifiedDivisor / simplifiedDividend) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Same answer indicator */}
      <div className="mt-4 text-center">
        <p className="text-sm font-bold text-foreground">
          答えは同じ！ / Same answer!
        </p>
        <div className="flex justify-center items-center gap-2 mt-1">
          <span className="text-2xl font-bold text-kid-green">{quotient}</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-2xl font-bold text-kid-green">{quotient}</span>
        </div>
      </div>
    </div>
  );
};

export default DivisionPropertiesVisualizer;
