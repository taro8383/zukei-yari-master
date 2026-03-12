interface EstimatingCalculationsVisualizerProps {
  num1: number;
  num2: number;
  roundedNum1: number;
  roundedNum2: number;
  roundPlace: string;
  roundPlaceEn: string;
  estimatedResult: number;
  exactResult: number;
}

const EstimatingCalculationsVisualizer = ({
  num1,
  num2,
  roundedNum1,
  roundedNum2,
  roundPlace,
  roundPlaceEn,
  estimatedResult,
  exactResult,
}: EstimatingCalculationsVisualizerProps) => {
  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📊 がい算（見積もり）/ Estimating Calculations
      </p>

      {/* Original numbers */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          元の数 / Original Numbers
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="text-center bg-kid-blue/20 rounded-lg p-2 border border-kid-blue">
            <p className="text-lg font-bold text-kid-blue">{num1}</p>
          </div>
          <span className="text-2xl text-primary">+</span>
          <div className="text-center bg-kid-purple/20 rounded-lg p-2 border border-kid-purple">
            <p className="text-lg font-bold text-kid-purple">{num2}</p>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">
          {roundPlace}の位で四捨五入 / Round to the {roundPlaceEn}
        </p>
      </div>

      {/* Rounding step */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          ステップ1: 四捨五入 / Step 1: Round Off
        </p>
        <div className="space-y-2">
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg">{num1}</span>
            <span className="text-xl text-primary">→</span>
            <span className="text-xl font-bold text-kid-green">{roundedNum1}</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg">{num2}</span>
            <span className="text-xl text-primary">→</span>
            <span className="text-xl font-bold text-kid-green">{roundedNum2}</span>
          </div>
        </div>
      </div>

      {/* Estimated calculation */}
      <div className="bg-kid-green/20 rounded-lg p-3 mb-4 border border-kid-green">
        <p className="text-xs font-bold text-kid-green mb-2 text-center">
          ステップ2: がい算 / Step 2: Estimate
        </p>
        <div className="flex justify-center items-center gap-2 text-xl font-bold">
          <span>{roundedNum1}</span>
          <span className="text-primary">+</span>
          <span>{roundedNum2}</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-2xl text-kid-green">{estimatedResult}</span>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-1">
          およその答え / Approximate answer
        </p>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-kid-green/10 rounded-lg p-3 border border-kid-green text-center">
          <p className="text-xs text-muted-foreground mb-1">
            がい数 / Estimate
          </p>
          <p className="text-2xl font-bold text-kid-green">{estimatedResult}</p>
        </div>
        <div className="bg-kid-blue/10 rounded-lg p-3 border border-kid-blue text-center">
          <p className="text-xs text-muted-foreground mb-1">
            正確な答え / Exact
          </p>
          <p className="text-2xl font-bold text-kid-blue">{exactResult}</p>
        </div>
      </div>

      {/* Key point */}
      <div className="mt-3 bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 パッと計算したいときは、四捨五入して簡単な数にしよう！ / When you need a quick estimate, round to make numbers simpler!
        </p>
      </div>
    </div>
  );
};

export default EstimatingCalculationsVisualizer;
