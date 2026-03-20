interface AreaModelGridVisualProps {
  factor1: number;
  factor2: number;
}

const MAX_GRID = 12;

const AreaModelGridVisual = ({ factor1, factor2 }: AreaModelGridVisualProps) => {
  const product = factor1 * factor2;
  const tooLarge = factor1 > MAX_GRID || factor2 > MAX_GRID;
  const cellSize = tooLarge ? 0 : Math.min(24, Math.floor(220 / Math.max(factor1, factor2, 1)));

  if (tooLarge) {
    return (
      <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4">
        <p className="text-center text-sm font-bold text-blue-700 mb-3">
          📐 面積モデル / Area Model
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div
              className="bg-blue-300 border-2 border-blue-600 rounded flex items-center justify-center text-blue-800 font-bold text-lg"
              style={{ width: 140, height: 90 }}
            >
              {factor1} × {factor2}
            </div>
            <div className="absolute -top-5 left-0 right-0 text-center text-xs text-blue-600">
              ← {factor1} →
            </div>
            <div className="absolute top-0 bottom-0 -right-10 flex items-center text-xs text-blue-600 writing-vertical">
              ↑{factor2}↓
            </div>
          </div>
          <p className="text-base font-bold text-blue-800 mt-4">
            = {product.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4">
      <p className="text-center text-sm font-bold text-blue-700 mb-3">
        📐 面積モデル / Area Model
      </p>
      <div className="flex flex-col items-center gap-1">
        {/* Top dimension label */}
        <div className="flex items-center" style={{ paddingLeft: 20 }}>
          <div style={{ width: factor1 * cellSize }} className="text-center text-xs text-blue-600">
            ← {factor1} →
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Left dimension label */}
          <div style={{ width: 18, height: factor2 * cellSize }} className="flex items-center justify-center">
            <span className="text-xs text-blue-600" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              ↑{factor2}↓
            </span>
          </div>
          {/* Grid */}
          <div>
            {Array.from({ length: factor2 }).map((_, rowIdx) => (
              <div key={rowIdx} className="flex">
                {Array.from({ length: factor1 }).map((_, colIdx) => (
                  <div
                    key={colIdx}
                    style={{ width: cellSize, height: cellSize }}
                    className="bg-blue-400 border border-blue-600"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm font-bold text-blue-800 mt-1">
          {factor1} × {factor2} = {product}
        </p>
      </div>
    </div>
  );
};

export default AreaModelGridVisual;
