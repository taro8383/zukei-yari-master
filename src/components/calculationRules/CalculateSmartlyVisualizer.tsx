interface CalculateSmartlyVisualizerProps {
  type: 'addition' | 'multiplication';
  numbers: number[];
  easyPair: [number, number];
  result: number;
}

const CalculateSmartlyVisualizer = ({
  type,
  numbers,
  easyPair,
  result,
}: CalculateSmartlyVisualizerProps) => {
  const isAddition = type === 'addition';
  const [easy1, easy2] = easyPair;
  const otherNumber = numbers.find(n => n !== easy1 && n !== easy2) || 0;
  const pairResult = isAddition ? easy1 + easy2 : easy1 * easy2;

  return (
    <div className="bg-kid-yellow/10 rounded-xl p-4 border border-kid-yellow/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        ⚡ くふうして計算 / Calculate Smartly
      </p>

      {/* Original Problem */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          元の問題 / Original Problem
        </p>
        <div className="flex justify-center items-center gap-2 text-2xl font-bold">
          {isAddition ? (
            <>
              <span>{numbers[0]}</span>
              <span className="text-primary">+</span>
              <span>{numbers[1]}</span>
              <span className="text-primary">+</span>
              <span>{numbers[2]}</span>
            </>
          ) : (
            <>
              <span>{numbers[0]}</span>
              <span className="text-primary">×</span>
              <span>{numbers[1]}</span>
              <span className="text-primary">×</span>
              <span>{numbers[2]}</span>
            </>
          )}
        </div>
      </div>

      {/* Smart Reordering */}
      <div className="flex justify-center items-center mb-4">
        <div className="bg-kid-blue/20 rounded-full p-2 border-2 border-kid-blue">
          <span className="text-2xl">⬇️</span>
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground mb-3">
        順番を入れ替えて楽に計算！ / Swap order to calculate easily!
      </p>

      {/* Step visualization */}
      <div className="space-y-3">
        {/* Step 1: Find the easy pair */}
        <div className="bg-kid-green/10 rounded-lg p-3 border border-kid-green">
          <p className="text-xs font-bold text-kid-green mb-2">
            ステップ1: かんたんなペアを見つける / Step 1: Find easy pair
          </p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg font-bold">{easy1}</span>
            <span className="text-primary">{isAddition ? '+' : '×'}</span>
            <span className="text-lg font-bold">{easy2}</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-2xl font-bold text-kid-green">{pairResult}</span>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-1">
            {isAddition ? `${pairResult}になるペア！ / Makes ${pairResult}!` : `${pairResult}になるペア！ / Makes ${pairResult}!`}
          </p>
        </div>

        {/* Step 2: Calculate with remaining number */}
        <div className="bg-kid-purple/10 rounded-lg p-3 border border-kid-purple">
          <p className="text-xs font-bold text-kid-purple mb-2">
            ステップ2: 残りの数と計算 / Step 2: Calculate with remaining
          </p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg font-bold text-kid-green">{pairResult}</span>
            <span className="text-primary">{isAddition ? '+' : '×'}</span>
            <span className="text-lg font-bold">{otherNumber}</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-2xl font-bold text-kid-green">{result}</span>
          </div>
        </div>
      </div>

      {/* Visual representation */}
      <div className="mt-4 bg-background/70 rounded-lg p-3 border border-border">
        <p className="text-xs font-bold text-center text-muted-foreground mb-2">
          🎨 ビジュアルで見てみよう / Visual
        </p>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {isAddition ? (
            <>
              <div className="bg-kid-green/20 rounded-lg p-2 border-2 border-kid-green text-center">
                <span className="text-lg">{easy1}</span>
                <span className="text-primary mx-1">+</span>
                <span className="text-lg">{easy2}</span>
                <div className="text-sm font-bold text-kid-green">= {pairResult}</div>
              </div>
              <span className="text-xl text-primary">+</span>
              <div className="bg-kid-blue/20 rounded-lg p-2 border-2 border-kid-blue text-center">
                <span className="text-lg">{otherNumber}</span>
              </div>
              <span className="text-xl text-primary">=</span>
              <div className="bg-kid-purple/20 rounded-lg p-2 border-2 border-kid-purple text-center">
                <span className="text-2xl font-bold text-kid-purple">{result}</span>
              </div>
            </>
          ) : (
            <>
              <div className="bg-kid-green/20 rounded-lg p-2 border-2 border-kid-green text-center">
                <span className="text-lg">{easy1}</span>
                <span className="text-primary mx-1">×</span>
                <span className="text-lg">{easy2}</span>
                <div className="text-sm font-bold text-kid-green">= {pairResult}</div>
              </div>
              <span className="text-xl text-primary">×</span>
              <div className="bg-kid-blue/20 rounded-lg p-2 border-2 border-kid-blue text-center">
                <span className="text-lg">{otherNumber}</span>
              </div>
              <span className="text-xl text-primary">=</span>
              <div className="bg-kid-purple/20 rounded-lg p-2 border-2 border-kid-purple text-center">
                <span className="text-2xl font-bold text-kid-purple">{result}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-3 bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 順番を入れ替えても答えは同じ！ / Order doesn&apos;t change the answer!
        </p>
      </div>
    </div>
  );
};

export default CalculateSmartlyVisualizer;
