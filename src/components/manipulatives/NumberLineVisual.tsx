interface NumberLineVisualProps {
  start: number;
  operand: number;
  direction: '+' | '-';
  result: number;
  jumps?: number; // number of equal jumps (default 1)
}

const NumberLineVisual = ({ start, operand, direction, result, jumps = 1 }: NumberLineVisualProps) => {
  const svgWidth = 320;
  const svgHeight = 85;
  const padding = 30;
  const lineY = 60;
  const axisWidth = svgWidth - 2 * padding;

  const lo = Math.min(start, result);
  const hi = Math.max(start, result);
  const range = hi - lo || 1;

  const toX = (val: number) => padding + ((val - lo) / range) * axisWidth;

  // Show up to 6 arcs; for more, annotate
  const maxShow = 6;
  const showCount = Math.min(jumps, maxShow);

  const arcPoints: { from: number; to: number }[] = [];
  for (let i = 0; i < showCount; i++) {
    const from = direction === '+' ? start + i * operand : start - i * operand;
    const to = direction === '+' ? from + operand : from - operand;
    arcPoints.push({ from, to });
  }

  const arcH = 28;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-3">
      <p className="text-center text-xs text-gray-500 mb-1">📏 数直線 / Number Line</p>
      <svg width={svgWidth} height={svgHeight} className="overflow-visible">
        <defs>
          <marker id="nl-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#6366f1" />
          </marker>
          <marker id="nl-axis-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#9ca3af" />
          </marker>
        </defs>

        {/* Axis */}
        <line
          x1={padding - 4}
          y1={lineY}
          x2={svgWidth - padding + 8}
          y2={lineY}
          stroke="#9ca3af"
          strokeWidth={2}
          markerEnd="url(#nl-axis-arrow)"
        />

        {/* Tick marks */}
        {[lo, hi].map((val) => (
          <g key={val}>
            <line x1={toX(val)} y1={lineY - 5} x2={toX(val)} y2={lineY + 5} stroke="#6b7280" strokeWidth={1.5} />
            <text x={toX(val)} y={lineY + 18} textAnchor="middle" fontSize={11} fill="#374151" fontWeight="500">
              {val}
            </text>
          </g>
        ))}

        {/* Jump arcs */}
        {arcPoints.map(({ from, to }, i) => {
          const x1 = toX(from);
          const x2 = toX(to);
          const mx = (x1 + x2) / 2;
          const isLast = i === arcPoints.length - 1;
          return (
            <g key={i}>
              <path
                d={`M ${x1} ${lineY} Q ${mx} ${lineY - arcH} ${x2} ${lineY}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth={isLast && jumps > maxShow ? 1.5 : 2}
                strokeDasharray={isLast && jumps > maxShow ? '4 3' : undefined}
                markerEnd={i === arcPoints.length - 1 ? 'url(#nl-arrow)' : undefined}
              />
              {i === 0 && (
                <text x={mx} y={lineY - arcH - 4} textAnchor="middle" fontSize={10} fill="#6366f1" fontWeight="bold">
                  {direction}{operand}
                </text>
              )}
            </g>
          );
        })}

        {/* Overflow annotation */}
        {jumps > maxShow && (
          <text x={toX((lo + hi) / 2)} y={lineY - arcH - 18} textAnchor="middle" fontSize={10} fill="#6366f1">
            ×{jumps}回
          </text>
        )}

        {/* Start dot (green) */}
        <circle cx={toX(start)} cy={lineY} r={5} fill="#10b981" />
        {/* Result dot (indigo) */}
        <circle cx={toX(result)} cy={lineY} r={5} fill="#6366f1" />
      </svg>
      <p className="text-center text-xs font-bold text-indigo-600">
        {start} {direction === '+' ? '+' : '−'} {operand}
        {jumps > 1 ? ` × ${jumps}` : ''} = {result}
      </p>
    </div>
  );
};

export default NumberLineVisual;
