interface MentalDivisionVisualizerProps {
  dividend: number;
  divisor: number;
  simplifiedDividend: number;
  simplifiedDivisor: number;
  quotient: number;
}

const MentalDivisionVisualizer = ({
  dividend,
  divisor,
  simplifiedDividend,
  simplifiedDivisor,
  quotient,
}: MentalDivisionVisualizerProps) => {
  // Count trailing zeros
  const countTrailingZeros = (num: number): number => {
    let count = 0;
    let n = num;
    while (n % 10 === 0 && n > 0) {
      count++;
      n /= 10;
    }
    return count;
  };

  const zerosRemoved = countTrailingZeros(dividend);

  return (
    <div className="bg-kid-yellow/10 rounded-xl p-4 border border-kid-yellow/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🧠 暗算の裏ワザ / Mental Math Trick
      </p>

      {/* Main trick explanation */}
      <div className="bg-kid-yellow/30 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-sm font-bold text-center text-foreground">
          💡 0を同じ数だけ消すと簡単！
        </p>
        <p className="text-xs text-center text-muted-foreground mt-1">
          Cancel the same number of zeros from both!
        </p>
      </div>

      {/* Original Problem */}
      <div className="bg-background rounded-lg p-4 border border-border mb-4">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          元の問題 / Original Problem
        </p>
        <div className="flex justify-center items-center gap-2 text-3xl font-bold">
          <span className="text-foreground">{dividend}</span>
          <span className="text-primary">÷</span>
          <span className="text-foreground">{divisor}</span>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">
          大きな数...難しい？ / Big numbers... Hard?
        </p>
      </div>

      {/* Zero cancellation animation */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{dividend}</p>
          <div className="mt-1">
            {Array.from({ length: zerosRemoved }).map((_, i) => (
              <span key={i} className="text-kid-red text-xl line-through">0</span>
            ))}
          </div>
        </div>
        <div className="text-2xl text-muted-foreground">÷</div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{divisor}</p>
          <div className="mt-1">
            {Array.from({ length: zerosRemoved }).map((_, i) => (
              <span key={i} className="text-kid-red text-xl line-through">0</span>
            ))}
          </div>
        </div>
      </div>

      {/* Transformation arrow */}
      <div className="flex justify-center items-center mb-4">
        <div className="bg-kid-blue/20 rounded-full p-2 border-2 border-kid-blue">
          <span className="text-2xl">⬇️</span>
        </div>
      </div>
      <p className="text-xs text-center text-muted-foreground mb-4">
        0を {zerosRemoved} 個ずつ消す / Remove {zerosRemoved} zero{zerosRemoved > 1 ? 's' : ''} from each
      </p>

      {/* Simplified Problem */}
      <div className="bg-kid-green/10 rounded-lg p-4 border-2 border-kid-green">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          簡単な問題！ / Easy problem!
        </p>
        <div className="flex justify-center items-center gap-2 text-3xl font-bold">
          <span className="text-kid-green">{simplifiedDividend}</span>
          <span className="text-primary">÷</span>
          <span className="text-kid-green">{simplifiedDivisor}</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-kid-green text-4xl">{quotient}</span>
        </div>
        <p className="text-xs text-center text-kid-green mt-2">
          パッと答えが出る！ / Answer in a flash!
        </p>
      </div>

      {/* Examples grid */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-background/70 rounded-lg p-2 border border-border text-center">
          <p className="text-xs text-muted-foreground">600 ÷ 20</p>
          <p className="text-sm font-bold text-kid-green">→ 60 ÷ 2 = 30</p>
        </div>
        <div className="bg-background/70 rounded-lg p-2 border border-border text-center">
          <p className="text-xs text-muted-foreground">800 ÷ 40</p>
          <p className="text-sm font-bold text-kid-green">→ 80 ÷ 4 = 20</p>
        </div>
        <div className="bg-background/70 rounded-lg p-2 border border-border text-center">
          <p className="text-xs text-muted-foreground">120 ÷ 30</p>
          <p className="text-sm font-bold text-kid-green">→ 12 ÷ 3 = 4</p>
        </div>
        <div className="bg-background/70 rounded-lg p-2 border border-border text-center">
          <p className="text-xs text-muted-foreground">900 ÷ 30</p>
          <p className="text-sm font-bold text-kid-green">→ 90 ÷ 3 = 30</p>
        </div>
      </div>

      {/* Key point */}
      <div className="mt-4 bg-kid-blue/10 rounded-lg p-3 border border-kid-blue">
        <p className="text-sm font-bold text-center text-kid-blue">
          🎯 ポイント / Key Point
        </p>
        <p className="text-xs text-center text-muted-foreground mt-1">
          両方の数から同じ数の0を消すと、答えは変わらない！
        </p>
        <p className="text-xs text-center text-muted-foreground">
          Cancel the same zeros from both numbers, answer stays the same!
        </p>
      </div>
    </div>
  );
};

export default MentalDivisionVisualizer;
