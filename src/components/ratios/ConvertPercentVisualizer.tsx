interface ConvertPercentVisualizerProps {
  decimalValue: number;
  percentValue: number;
}

const ConvertPercentVisualizer = ({
  decimalValue,
  percentValue,
}: ConvertPercentVisualizerProps) => {
  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🔋 パーセント(%)になおす / Converting to Percentage
      </p>

      {/* Battery visual */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          バッテリー表示 / Battery Display
        </p>
        <div className="flex justify-center mb-2">
          <div className="relative">
            {/* Battery outline */}
            <div className="w-48 h-20 border-4 border-gray-400 rounded-lg relative bg-gray-100">
              {/* Battery fill */}
              <div
                className="h-full bg-gradient-to-r from-accent to-primary rounded transition-all duration-1000"
                style={{ width: `${percentValue}%` }}
              />
              {/* Percentage text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-white drop-shadow-md">
                  {percentValue}%
                </span>
              </div>
            </div>
            {/* Battery terminal */}
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-8 bg-gray-400 rounded-r" />
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          {decimalValue} = {percentValue}%
        </p>
      </div>

      {/* Conversion steps */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          📝 変換の仕方 / How to Convert
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-kid-blue/20 rounded-lg p-2 border border-kid-blue text-center">
              <p className="text-xs text-muted-foreground">小数 / Decimal</p>
              <p className="text-xl font-bold text-kid-blue">{decimalValue}</p>
            </div>
            <span className="text-2xl text-primary">→</span>
            <div className="bg-kid-purple/20 rounded-lg p-2 border border-kid-purple text-center">
              <p className="text-xs text-muted-foreground">計算 / Calculation</p>
              <p className="text-lg font-bold text-kid-purple">× 100</p>
            </div>
          </div>
          <div className="flex justify-center">
            <span className="text-2xl text-primary">↓</span>
          </div>
          <div className="flex justify-center">
            <div className="bg-kid-green/20 rounded-lg p-3 border-2 border-kid-green text-center">
              <p className="text-xs text-muted-foreground">パーセント / Percent</p>
              <p className="text-2xl font-bold text-kid-green">{percentValue}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formula */}
      <div className="bg-kid-blue/20 rounded-lg p-3 mb-4 border border-kid-blue">
        <p className="text-xs font-bold text-kid-blue mb-2 text-center">
          📐 公式 / Formula
        </p>
        <div className="text-center">
          <p className="text-lg font-bold">
            <span className="text-kid-blue">{decimalValue}</span>
            <span className="text-primary mx-2">×</span>
            <span className="text-kid-purple">100</span>
            <span className="text-muted-foreground mx-2">=</span>
            <span className="text-kid-green">{percentValue}%</span>
          </p>
        </div>
      </div>

      {/* Key point */}
      <div className="bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 小数を%にするには×100、%を小数にするには÷100 / Decimal to %: ×100, % to decimal: ÷100
        </p>
      </div>
    </div>
  );
};

export default ConvertPercentVisualizer;
