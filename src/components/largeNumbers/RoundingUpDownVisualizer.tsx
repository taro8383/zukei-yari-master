interface RoundingUpDownVisualizerProps {
  unitPrice: number;
  quantity: number;
  totalAmount: number;
  scenario: 'up' | 'down';
  answer: number;
}

const RoundingUpDownVisualizer = ({
  unitPrice,
  quantity,
  totalAmount,
  scenario,
  answer,
}: RoundingUpDownVisualizerProps) => {
  const isRoundUp = scenario === 'up';

  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        ⬆️⬇️ 切り捨てと切り上げ / Round Down and Round Up
      </p>

      {/* Scenario explanation */}
      <div className={`rounded-lg p-3 mb-4 border-2 ${isRoundUp ? 'bg-kid-red/10 border-kid-red' : 'bg-kid-green/10 border-kid-green'}`}>
        <p className="text-xs font-bold text-center mb-1">
          {isRoundUp ? '切り上げ / Round Up' : '切り捨て / Round Down'}
        </p>
        <p className="text-xs text-center text-muted-foreground">
          {isRoundUp
            ? 'お金が足りなくなったら困るので、多めに準備する / Prepare extra so you don\'t run short'
            : 'お金が足りないと買えないので、買える分だけ数える / Count only what you can afford'}
        </p>
      </div>

      {/* Calculation */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          計算 / Calculation
        </p>
        <div className="flex justify-center items-center gap-2 text-lg font-bold">
          <span>{unitPrice}円</span>
          <span className="text-primary">×</span>
          <span>{quantity}個</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-2xl text-kid-blue">{totalAmount.toLocaleString()}円</span>
        </div>
      </div>

      {/* Visual representation */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-center text-muted-foreground">
          🎨 ビジュアルで見てみよう / Visual Representation
        </p>

        {isRoundUp ? (
          // Round up scenario - 1000 yen bills
          <div className="bg-kid-yellow/20 rounded-lg p-3 border border-kid-yellow">
            <p className="text-xs text-center text-muted-foreground mb-2">
              1000円札で払う / Pay with 1000-yen bills
            </p>
            <div className="flex justify-center items-center gap-2 flex-wrap">
              {Array.from({ length: answer }).map((_, i) => (
                <div key={i} className="bg-kid-yellow rounded-lg p-2 border-2 border-kid-yellow">
                  <span className="text-lg font-bold">💴</span>
                  <span className="block text-xs text-center font-bold">1000</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              合計 {answer * 1000}円（実際は{totalAmount.toLocaleString()}円）/ Total {answer * 1000} yen (actual: {totalAmount.toLocaleString()})
            </p>
          </div>
        ) : (
          // Round down scenario - items you can buy
          <div className="bg-kid-green/20 rounded-lg p-3 border border-kid-green">
            <p className="text-xs text-center text-muted-foreground mb-2">
              買える個数 / Items you can buy
            </p>
            <div className="flex justify-center items-center gap-2 flex-wrap">
              {Array.from({ length: answer }).map((_, i) => (
                <div key={i} className="bg-kid-green rounded-lg p-2 border-2 border-kid-green">
                  <span className="text-lg">🎁</span>
                </div>
              ))}
              {Array.from({ length: Math.max(0, quantity - answer) }).map((_, i) => (
                <div key={`x-${i}`} className="bg-gray-200 rounded-lg p-2 border-2 border-gray-300 opacity-50">
                  <span className="text-lg">❌</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              {answer}個まで買える / Can buy up to {answer} items
            </p>
          </div>
        )}
      </div>

      {/* Result */}
      <div className={`mt-4 rounded-lg p-4 border-2 text-center ${isRoundUp ? 'bg-kid-red/20 border-kid-red' : 'bg-kid-green/20 border-kid-green'}`}>
        <p className="text-xs text-muted-foreground mb-1">
          答え / Answer
        </p>
        <p className={`text-3xl font-bold ${isRoundUp ? 'text-kid-red' : 'text-kid-green'}`}>
          {isRoundUp ? `${answer}枚` : `${answer}個`}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {isRoundUp
            ? `${answer} bills needed (rounding up)`
            : `${answer} items can be bought (rounding down)`}
        </p>
      </div>

      {/* Key point */}
      <div className="mt-3 bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 {isRoundUp
            ? 'お金準備→切り上げ（足りなくなったら困る）/ Prepare money→round up (can\'t be short)'
            : '何個買える→切り捨て（お金が足りないと買えない）/ How many→round down (can\'t buy without enough)'}
        </p>
      </div>
    </div>
  );
};

export default RoundingUpDownVisualizer;
