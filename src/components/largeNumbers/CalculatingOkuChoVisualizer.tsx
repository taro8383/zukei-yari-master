interface CalculatingOkuChoVisualizerProps {
  num1: number;
  num2: number;
  operation: 'add' | 'subtract';
  unit: string;
  result: number;
}

const CalculatingOkuChoVisualizer = ({
  num1,
  num2,
  operation,
  unit,
  result,
}: CalculatingOkuChoVisualizerProps) => {
  // Format numbers with Japanese units
  const formatWithUnit = (num: number): string => {
    if (num >= 100000000) {
      const oku = Math.floor(num / 100000000);
      const remainder = num % 100000000;
      const man = Math.floor(remainder / 10000);
      if (man > 0) return `${oku}億${man}万`;
      return `${oku}億`;
    }
    if (num >= 10000) {
      const man = Math.floor(num / 10000);
      return `${man}万`;
    }
    return num.toString();
  };

  const num1Formatted = formatWithUnit(num1);
  const num2Formatted = formatWithUnit(num2);
  const resultFormatted = formatWithUnit(result);

  // Extract numerical parts for calculation display
  const getNumericPart = (str: string): number => {
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const num1Value = getNumericPart(num1Formatted);
  const num2Value = getNumericPart(num2Formatted);

  return (
    <div className="bg-kid-green/10 rounded-xl p-4 border border-kid-green/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🧮 大きな数の計算 / Calculating with Large Numbers
      </p>

      {/* Numbers with units */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          単位をそろえて計算 / Calculate with aligned units
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="text-center bg-kid-blue/20 rounded-lg p-2 border border-kid-blue">
            <p className="text-lg font-bold text-kid-blue">{num1Formatted}</p>
          </div>
          <span className="text-2xl text-primary">{operation === 'add' ? '+' : '-'}</span>
          <div className="text-center bg-kid-purple/20 rounded-lg p-2 border border-kid-purple">
            <p className="text-lg font-bold text-kid-purple">{num2Formatted}</p>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">
          両方とも「{unit}」の単位 / Both in "{unit}" units
        </p>
      </div>

      {/* Step visualization */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-center text-muted-foreground">
          計算のステップ / Calculation Steps
        </p>

        {/* Step 1: Identify units */}
        <div className="bg-kid-yellow/20 rounded-lg p-2 border border-kid-yellow">
          <p className="text-xs font-bold text-kid-yellow mb-1">
            ステップ1: 単位を確認 / Step 1: Check Units
          </p>
          <p className="text-sm text-center">
            {num1Formatted} と {num2Formatted} → 同じ「{unit}」の単位
          </p>
        </div>

        {/* Step 2: Calculate numbers */}
        <div className="bg-kid-blue/20 rounded-lg p-2 border border-kid-blue">
          <p className="text-xs font-bold text-kid-blue mb-1">
            ステップ2: 数字を計算 / Step 2: Calculate Numbers
          </p>
          <div className="flex justify-center items-center gap-2 text-lg font-bold">
            <span>{num1Value}</span>
            <span className="text-primary">{operation === 'add' ? '+' : '-'}</span>
            <span>{num2Value}</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-kid-blue">{operation === 'add' ? num1Value + num2Value : num1Value - num2Value}</span>
          </div>
        </div>

        {/* Step 3: Add unit */}
        <div className="bg-kid-purple/20 rounded-lg p-2 border border-kid-purple">
          <p className="text-xs font-bold text-kid-purple mb-1">
            ステップ3: 単位をつける / Step 3: Add the Unit
          </p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg font-bold text-kid-blue">
              {operation === 'add' ? num1Value + num2Value : num1Value - num2Value}
            </span>
            <span className="text-2xl text-primary">+</span>
            <span className="text-lg font-bold text-kid-purple">{unit}</span>
            <span className="text-2xl text-primary">=</span>
            <span className="text-xl font-bold text-kid-green">{resultFormatted}</span>
          </div>
        </div>
      </div>

      {/* Final answer */}
      <div className="mt-4 bg-kid-green/20 rounded-lg p-4 border-2 border-kid-green text-center">
        <p className="text-xs text-muted-foreground mb-1">
          答え / Answer
        </p>
        <p className="text-3xl font-bold text-kid-green">
          {resultFormatted}
        </p>
      </div>

      {/* Key point */}
      <div className="mt-3 bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 単位（億・兆など）をそろえてから計算しよう！ / Align units (Oku, Cho, etc.) before calculating!
        </p>
      </div>
    </div>
  );
};

export default CalculatingOkuChoVisualizer;
