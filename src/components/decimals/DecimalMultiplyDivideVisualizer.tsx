interface DecimalMultiplyDivideVisualizerProps {
  decimalNumber: number;
  wholeNumber: number;
  operation: 'multiply' | 'divide';
  result: number;
  decimalPlaces: number;
}

const DecimalMultiplyDivideVisualizer = ({
  decimalNumber,
  wholeNumber,
  operation,
  result,
  decimalPlaces,
}: DecimalMultiplyDivideVisualizerProps) => {
  const isMultiply = operation === 'multiply';

  // Format numbers
  const formatDecimal = (num: number, places: number) => num.toFixed(places);

  // For multiplication: show the calculation steps
  // For division: show the long division format
  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📝 {isMultiply ? 'かけ算' : 'わり算'}の例 / {isMultiply ? 'Multiplication' : 'Division'} Example
      </p>

      {isMultiply ? (
        // Multiplication Visualization
        <div className="space-y-4">
          {/* Step 1: Ignore decimal and multiply */}
          <div className="bg-background rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-2 text-center">
              ステップ1：小数点を無視してかける / Step 1: Multiply ignoring decimal
            </p>
            <div className="flex justify-center items-center gap-2 text-lg font-bold">
              <span>{decimalNumber.toString().replace('.', '')}</span>
              <span className="text-primary">×</span>
              <span>{wholeNumber}</span>
              <span className="text-muted-foreground">=</span>
              <span className="text-kid-blue">
                {Math.round(decimalNumber * Math.pow(10, decimalPlaces)) * wholeNumber}
              </span>
            </div>
          </div>

          {/* Step 2: Place decimal */}
          <div className="bg-kid-green/10 rounded-lg p-3 border border-kid-green/30">
            <p className="text-xs text-muted-foreground mb-2 text-center">
              ステップ2：小数点を戻す / Step 2: Place decimal point
            </p>
            <div className="flex justify-center items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold">
                  {Math.round(decimalNumber * Math.pow(10, decimalPlaces)) * wholeNumber}
                </span>
                <span className="text-2xl text-primary">→</span>
                <span className="text-2xl font-bold text-kid-green bg-white px-2 py-1 rounded border-2 border-kid-green">
                  {formatDecimal(result, decimalPlaces)}
                </span>
              </div>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              小数第{decimalPlaces}位まで / {decimalPlaces} decimal place{decimalPlaces > 1 ? 's' : ''}
            </p>
          </div>

          {/* Final answer */}
          <div className="flex justify-center items-center gap-2 pt-2 border-t border-border">
            <span className="text-lg">{decimalNumber}</span>
            <span className="text-primary text-xl">×</span>
            <span className="text-lg">{wholeNumber}</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-2xl font-bold text-kid-green">{formatDecimal(result, decimalPlaces)}</span>
          </div>
        </div>
      ) : (
        // Division Visualization
        <div className="space-y-4">
          {/* Long division format */}
          <div className="flex justify-center">
            <div className="inline-flex items-start gap-1">
              {/* Divisor */}
              <div className="flex flex-col justify-end h-16">
                <span className="text-xl font-bold text-primary">{wholeNumber}</span>
              </div>
              {/* Division bracket */}
              <div className="relative">
                <div className="border-t-2 border-r-2 border-foreground w-24 h-4 rounded-tr-lg"></div>
                <div className="border-r-2 border-foreground h-12"></div>
                {/* Dividend */}
                <div className="absolute top-5 left-2 text-xl font-bold tracking-wider">
                  {decimalNumber}
                </div>
              </div>
              {/* Answer */}
              <div className="text-xl font-bold text-kid-green pt-0.5">
                = {result}
              </div>
            </div>
          </div>

          {/* Explanation steps */}
          <div className="bg-background rounded-lg p-3 border border-border space-y-2">
            <p className="text-xs text-muted-foreground text-center">
              計算のポイント / Calculation Key Points
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-kid-blue text-white text-xs flex items-center justify-center">1</span>
                <span>普通にわり算する / Divide normally</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-kid-green text-white text-xs flex items-center justify-center">2</span>
                <span>小数点はそのまま下ろす / Bring decimal point straight down</span>
              </div>
            </div>
          </div>

          {/* Final answer */}
          <div className="flex justify-center items-center gap-2 pt-2 border-t border-border">
            <span className="text-lg">{decimalNumber}</span>
            <span className="text-primary text-xl">÷</span>
            <span className="text-lg">{wholeNumber}</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-2xl font-bold text-kid-green">{result}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecimalMultiplyDivideVisualizer;
