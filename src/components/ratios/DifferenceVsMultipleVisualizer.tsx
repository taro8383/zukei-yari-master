interface DifferenceVsMultipleVisualizerProps {
  smallerNumber: number;
  largerNumber: number;
  difference: number;
  multiple: number;
}

const DifferenceVsMultipleVisualizer = ({
  smallerNumber,
  largerNumber,
  difference,
  multiple,
}: DifferenceVsMultipleVisualizerProps) => {
  return (
    <div className="bg-kid-yellow/10 rounded-xl p-4 border border-kid-yellow/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🤔 差と倍のちがい / Difference vs. Multiple
      </p>

      {/* Visual comparison */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          比べてみよう / Let's compare
        </p>

        <div className="flex justify-center items-center gap-6 mb-4">
          {/* Smaller number */}
          <div className="text-center">
            <div className="flex gap-1 justify-center mb-2">
              {Array.from({ length: Math.min(smallerNumber, 10) }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-primary/40 rounded-sm" />
              ))}
              {smallerNumber > 10 && <span className="text-xs">+{smallerNumber - 10}</span>}
            </div>
            <div className="bg-primary/20 rounded-lg p-2 border border-primary">
              <p className="text-lg font-bold text-primary">{smallerNumber}</p>
              <p className="text-xs text-muted-foreground">小さい数</p>
            </div>
          </div>

          <div className="text-2xl text-muted-foreground">vs</div>

          {/* Larger number */}
          <div className="text-center">
            <div className="flex gap-1 justify-center mb-2">
              {Array.from({ length: Math.min(largerNumber, 10) }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-accent/40 rounded-sm" />
              ))}
              {largerNumber > 10 && <span className="text-xs">+{largerNumber - 10}</span>}
            </div>
            <div className="bg-accent/20 rounded-lg p-2 border border-accent">
              <p className="text-lg font-bold text-accent">{largerNumber}</p>
              <p className="text-xs text-muted-foreground">大きい数</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two methods side by side */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Difference (Subtraction) */}
        <div className="bg-red-50 rounded-lg p-3 border-2 border-red-300">
          <p className="text-xs font-bold text-red-600 mb-2 text-center">
            ➖ 差（ひき算）/ Difference
          </p>
          <p className="text-xs text-center mb-2">
            「どちらが大きいか」<br/>
            How much bigger?
          </p>
          <div className="text-center mb-2">
            <div className="flex justify-center items-center gap-1 text-lg font-bold">
              <span className="text-accent">{largerNumber}</span>
              <span className="text-red-500">-</span>
              <span className="text-primary">{smallerNumber}</span>
              <span className="text-muted-foreground">=</span>
            </div>
            <div className="text-2xl font-bold text-red-500 mt-1">
              {difference}
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            {difference} 多い / more
          </p>
        </div>

        {/* Multiple (Division) */}
        <div className="bg-green-50 rounded-lg p-3 border-2 border-green-300">
          <p className="text-xs font-bold text-green-600 mb-2 text-center">
            ➗ 倍（わり算）/ Multiple
          </p>
          <p className="text-xs text-center mb-2">
            「何倍か」<br/>
            How many times?
          </p>
          <div className="text-center mb-2">
            <div className="flex justify-center items-center gap-1 text-lg font-bold">
              <span className="text-accent">{largerNumber}</span>
              <span className="text-green-500">÷</span>
              <span className="text-primary">{smallerNumber}</span>
              <span className="text-muted-foreground">=</span>
            </div>
            <div className="text-2xl font-bold text-green-500 mt-1">
              {multiple}
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            {multiple} 倍 / times
          </p>
        </div>
      </div>

      {/* When to use which */}
      <div className="space-y-3 mb-4">
        <div className="bg-red-50 rounded-lg p-3 border border-red-200">
          <p className="text-xs font-bold text-red-600 mb-1">
            🔴 差を使うとき / Use Difference when:
          </p>
          <ul className="text-xs space-y-1">
            <li>• 「いくつ多いか」「いくつ少ないか」と聞かれたとき</li>
            <li>• When asked "how much more/less"</li>
            <li>• 長さや重さの差を知りたいとき</li>
            <li>• When you want to know the gap in length/weight</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <p className="text-xs font-bold text-green-600 mb-1">
            🟢 倍を使うとき / Use Multiple when:
          </p>
          <ul className="text-xs space-y-1">
            <li>• 「何倍ですか」と聞かれたとき</li>
            <li>• When asked "how many times"</li>
            <li>• 比率や割合を知りたいとき</li>
            <li>• When you want to know the ratio</li>
          </ul>
        </div>
      </div>

      {/* Example sentences */}
      <div className="bg-kid-blue/20 rounded-lg p-3 mb-4 border border-kid-blue">
        <p className="text-xs font-bold text-kid-blue mb-2 text-center">
          💬 例文 / Example Sentences
        </p>
        <div className="space-y-2 text-xs">
          <div className="bg-white/50 rounded p-2">
            <p className="text-red-600">📝 差を使う例:</p>
            <p>「お兄ちゃんは {difference}cm 背が高い」</p>
            <p className="text-muted-foreground">"My brother is {difference}cm taller"</p>
          </div>
          <div className="bg-white/50 rounded p-2">
            <p className="text-green-600">📝 倍を使う例:</p>
            <p>「お兄ちゃんは {multiple}倍の身長」</p>
            <p className="text-muted-foreground">"My brother is {multiple} times as tall"</p>
          </div>
        </div>
      </div>

      {/* Key point */}
      <div className="bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 問題をよく読んで、求めているものが「差」か「倍」かを見分けよう！/ Read carefully to determine if the problem asks for difference or multiple!
        </p>
      </div>
    </div>
  );
};

export default DifferenceVsMultipleVisualizer;
