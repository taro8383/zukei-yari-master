interface DivisionWithRemainderVisualizerProps {
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
}

const DivisionWithRemainderVisualizer = ({
  dividend,
  divisor,
  quotient,
  remainder,
}: DivisionWithRemainderVisualizerProps) => {
  // Generate items array for visualization
  const totalItems = dividend;
  const itemsPerGroup = quotient;
  const remainingItems = remainder;

  // Create groups - each person gets exactly the quotient amount
  const groups = Array.from({ length: divisor }, (_, groupIndex) => {
    return {
      id: groupIndex,
      items: itemsPerGroup, // Everyone gets the same amount
      isRemainder: false,
    };
  });

  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📦 分け方の例 / How to Divide
      </p>

      {/* Main equation */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <div className="flex justify-center items-center gap-2 text-xl font-bold">
          <span className="text-foreground">{dividend}</span>
          <span className="text-primary">÷</span>
          <span className="text-foreground">{divisor}</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-kid-green">{quotient}</span>
          {remainder > 0 && (
            <>
              <span className="text-muted-foreground">...</span>
              <span className="text-kid-yellow">{remainder}</span>
            </>
          )}
        </div>
        <p className="text-xs text-center text-muted-foreground mt-1">
          {dividend}個を{divisor}人で分けると、1人{quotient}個ずつ、あまり{remainder}個
        </p>
        <p className="text-xs text-center text-muted-foreground">
          Divide {dividend} items among {divisor} people: {quotient} each, {remainder} left over
        </p>
      </div>

      {/* Visual grouping */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-center text-muted-foreground">
          🎨 ビジュアルで見てみよう / Visual representation
        </p>

        {/* Groups */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-kid-green/20 rounded-lg p-2 border-2 border-kid-green"
            >
              <p className="text-xs text-center font-bold text-kid-green mb-1">
                人 {group.id + 1}
              </p>
              <div className="flex flex-wrap justify-center gap-1">
                {Array.from({ length: group.items }).map((_, i) => (
                  <span key={i} className="text-lg">🎁</span>
                ))}
              </div>
              <p className="text-center text-sm font-bold text-foreground mt-1">
                ×{group.items}
              </p>
            </div>
          ))}
        </div>

        {/* Remainder (if any) */}
        {remainder > 0 && (
          <div className="bg-kid-yellow/20 rounded-lg p-3 border-2 border-kid-yellow">
            <p className="text-xs text-center font-bold text-kid-yellow mb-1">
              📦 あまり / Remainder
            </p>
            <div className="flex flex-wrap justify-center gap-1">
              {Array.from({ length: remainder }).map((_, i) => (
                <span key={i} className="text-lg">📦</span>
              ))}
            </div>
            <p className="text-center text-lg font-bold text-kid-yellow mt-1">
              ×{remainder}
            </p>
          </div>
        )}
      </div>

      {/* Verification */}
      <div className="mt-4 pt-3 border-t border-border">
        <p className="text-xs text-center text-muted-foreground mb-2">
          ✅ 確かめ算 / Check:
        </p>
        <div className="flex justify-center items-center gap-1 text-sm flex-wrap">
          <span className="text-kid-green font-bold">{divisor}</span>
          <span>×</span>
          <span className="text-kid-green font-bold">{quotient}</span>
          {remainder > 0 && (
            <>
              <span>+</span>
              <span className="text-kid-yellow font-bold">{remainder}</span>
            </>
          )}
          <span>=</span>
          <span className="text-primary font-bold text-lg">{dividend}</span>
          <span>✓</span>
        </div>
      </div>
    </div>
  );
};

export default DivisionWithRemainderVisualizer;
