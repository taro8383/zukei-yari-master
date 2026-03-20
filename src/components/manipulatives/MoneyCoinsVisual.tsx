interface MoneyCoinsVisualProps {
  amount: number; // integer yen
}

const DENOMS = [
  { value: 1000, label: '1000円', isNote: true, hole: false, borderColor: '#16a34a', bgColor: '#dcfce7', textColor: '#166534' },
  { value: 500, label: '500円', isNote: false, hole: false, borderColor: '#b45309', bgColor: '#fef3c7', textColor: '#92400e' },
  { value: 100, label: '100円', isNote: false, hole: false, borderColor: '#6b7280', bgColor: '#f3f4f6', textColor: '#374151' },
  { value: 50, label: '50円', isNote: false, hole: true, borderColor: '#6b7280', bgColor: '#e5e7eb', textColor: '#374151' },
  { value: 10, label: '10円', isNote: false, hole: false, borderColor: '#92400e', bgColor: '#fef3c7', textColor: '#78350f' },
  { value: 5, label: '5円', isNote: false, hole: true, borderColor: '#b45309', bgColor: '#fef9c3', textColor: '#78350f' },
  { value: 1, label: '1円', isNote: false, hole: false, borderColor: '#9ca3af', bgColor: '#f9fafb', textColor: '#6b7280' },
] as const;

const MoneyCoinsVisual = ({ amount }: MoneyCoinsVisualProps) => {
  const intAmount = Math.abs(Math.floor(amount));

  let remaining = intAmount;
  const breakdown: { denom: typeof DENOMS[number]; count: number }[] = [];
  for (const denom of DENOMS) {
    const count = Math.floor(remaining / denom.value);
    if (count > 0) {
      breakdown.push({ denom, count });
      remaining -= count * denom.value;
    }
  }

  return (
    <div className="bg-yellow-50 rounded-xl border-2 border-yellow-200 p-4">
      <p className="text-center text-sm font-bold text-yellow-800 mb-3">
        💴 お金 / Money: <span className="text-primary">{intAmount.toLocaleString()}円</span>
      </p>
      {breakdown.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">0円</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {breakdown.map(({ denom, count }) => {
            const shown = Math.min(count, 8);
            return (
              <div key={denom.value} className="flex flex-col items-center gap-1">
                <div className="flex flex-wrap gap-1 justify-center" style={{ maxWidth: 110 }}>
                  {Array.from({ length: shown }).map((_, i) =>
                    denom.isNote ? (
                      <div
                        key={i}
                        className="w-12 h-7 rounded border-2 flex items-center justify-center text-[10px] font-bold"
                        style={{ borderColor: denom.borderColor, backgroundColor: denom.bgColor, color: denom.textColor }}
                      >
                        1000円
                      </div>
                    ) : (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold relative"
                        style={{ borderColor: denom.borderColor, backgroundColor: denom.bgColor, color: denom.textColor }}
                      >
                        {denom.hole ? (
                          <div className="absolute w-2.5 h-2.5 rounded-full bg-white border border-gray-300" />
                        ) : (
                          <span>{denom.value}</span>
                        )}
                      </div>
                    )
                  )}
                  {count > 8 && (
                    <span className="text-xs text-gray-500 self-center">+{count - 8}</span>
                  )}
                </div>
                <span className="text-xs font-bold" style={{ color: denom.textColor }}>{denom.label}</span>
                <span className="text-xs text-gray-500">×{count}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MoneyCoinsVisual;
