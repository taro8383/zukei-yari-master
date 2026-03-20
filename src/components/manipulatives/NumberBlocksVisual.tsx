interface NumberBlocksVisualProps {
  number: number;
}

// For small numbers (≤9999): colored blocks. For large numbers: digit place-value table.
const NumberBlocksVisual = ({ number }: NumberBlocksVisualProps) => {
  const n = Math.abs(Math.floor(number));

  if (n <= 9999) {
    return <SmallBlocksView n={n} />;
  }
  return <LargePlaceValueView n={n} />;
};

// Colored blocks for numbers 0–9999
const SmallBlocksView = ({ n }: { n: number }) => {
  const thousands = Math.floor(n / 1000);
  const hundreds = Math.floor((n % 1000) / 100);
  const tens = Math.floor((n % 100) / 10);
  const ones = n % 10;

  const places = [
    { label: '千', sub: '(1000)', count: thousands, bgClass: 'bg-purple-400', borderClass: 'border-purple-600', textClass: 'text-purple-700', cellSize: 'w-9 h-9' },
    { label: '百', sub: '(100)', count: hundreds, bgClass: 'bg-blue-400', borderClass: 'border-blue-600', textClass: 'text-blue-700', cellSize: 'w-7 h-7' },
    { label: '十', sub: '(10)', count: tens, bgClass: 'bg-green-400', borderClass: 'border-green-600', textClass: 'text-green-700', cellSize: 'w-5 h-5' },
    { label: '一', sub: '(1)', count: ones, bgClass: 'bg-orange-400', borderClass: 'border-orange-600', textClass: 'text-orange-700', cellSize: 'w-4 h-4' },
  ];

  const hasAny = places.some(p => p.count > 0);

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
      <p className="text-center text-sm font-bold text-gray-600 mb-3">
        🧱 位取り積み木 / Place Value Blocks: <span className="text-primary">{n.toLocaleString()}</span>
      </p>
      {hasAny ? (
        <div className="flex items-end justify-center gap-5 flex-wrap">
          {places.map(({ label, sub, count, bgClass, borderClass, textClass, cellSize }) =>
            count > 0 ? (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="flex flex-wrap gap-1 justify-center" style={{ maxWidth: 110 }}>
                  {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className={`${cellSize} ${bgClass} ${borderClass} border-2 rounded-sm`} />
                  ))}
                </div>
                <span className={`text-xs font-bold ${textClass}`}>{label} {sub}</span>
                <span className="text-xs text-gray-500">×{count}</span>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-sm">0</p>
      )}
    </div>
  );
};

// Place-value digit table for large numbers (billions/trillions)
const LargePlaceValueView = ({ n }: { n: number }) => {
  const str = n.toString();

  // Define columns from the largest supported (兆) down to 一
  const allPlaces = [
    { label: '兆', color: '#a855f7' },
    { label: '千億', color: '#8b5cf6' },
    { label: '百億', color: '#7c3aed' },
    { label: '十億', color: '#6d28d9' },
    { label: '億', color: '#2563eb' },
    { label: '千万', color: '#1d4ed8' },
    { label: '百万', color: '#1e40af' },
    { label: '十万', color: '#15803d' },
    { label: '万', color: '#16a34a' },
    { label: '千', color: '#b45309' },
    { label: '百', color: '#d97706' },
    { label: '十', color: '#dc2626' },
    { label: '一', color: '#ea580c' },
  ];

  // Pad string to 13 digits (兆~一)
  const padded = str.padStart(13, '0');
  const digits = padded.slice(-13).split('');

  // Find the first non-zero position to trim leading columns
  const firstNonZero = digits.findIndex(d => d !== '0');
  const visibleStart = Math.max(0, firstNonZero);
  const visiblePlaces = allPlaces.slice(visibleStart);
  const visibleDigits = digits.slice(visibleStart);

  // Group by 万/億/兆 for background shading
  const groupBg = (idx: number) => {
    const total = visiblePlaces.length;
    const posFromRight = total - 1 - idx;
    const group = Math.floor(posFromRight / 4);
    return group % 2 === 0 ? '#f0f9ff' : '#f0fdf4';
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
      <p className="text-center text-sm font-bold text-gray-600 mb-3">
        📊 位取り表 / Place Value Chart: <span className="text-primary">{n.toLocaleString()}</span>
      </p>
      <div className="overflow-x-auto">
        <div className="flex gap-0 justify-center min-w-0">
          {visiblePlaces.map((place, i) => (
            <div
              key={place.label}
              className="flex flex-col items-center border border-gray-300"
              style={{ backgroundColor: groupBg(i), minWidth: 36 }}
            >
              <div
                className="text-xs font-bold py-1 px-0.5 text-center w-full border-b border-gray-300"
                style={{ color: place.color, fontSize: 10 }}
              >
                {place.label}
              </div>
              <div
                className="text-lg font-black py-2 text-center w-full"
                style={{ color: visibleDigits[i] === '0' ? '#d1d5db' : '#111827' }}
              >
                {visibleDigits[i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumberBlocksVisual;
