interface FractionBarVisualProps {
  numerator: number;
  denominator: number;
  whole?: number;
  color?: string;
}

const FractionBarVisual = ({ numerator, denominator, whole = 0, color = '#60a5fa' }: FractionBarVisualProps) => {
  const barWidth = 200;
  const barHeight = 30;
  const den = Math.max(denominator, 1);
  const num = Math.min(numerator, den);
  const segmentWidth = barWidth / den;
  const hasWhole = whole > 0;
  const svgHeight = barHeight + (hasWhole ? 45 : 20);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={barWidth + 40} height={svgHeight} className="border rounded-lg bg-white">
        {/* Whole number bar */}
        {hasWhole && (
          <>
            <rect x={20} y={5} width={barWidth} height={barHeight} fill="#4ade80" stroke="#16a34a" strokeWidth={2} />
            <text x={20 + barWidth / 2} y={5 + barHeight / 2 + 5} textAnchor="middle" fontSize={14} fill="#166534">
              1
            </text>
          </>
        )}
        {/* Fraction segments */}
        <g transform={hasWhole ? 'translate(20, 45)' : 'translate(20, 10)'}>
          {Array.from({ length: den }).map((_, i) => (
            <rect
              key={`bg-${i}`}
              x={i * segmentWidth}
              y={0}
              width={segmentWidth - 1}
              height={barHeight}
              fill="#e5e7eb"
              stroke="#9ca3af"
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: num }).map((_, i) => (
            <rect
              key={`fill-${i}`}
              x={i * segmentWidth}
              y={0}
              width={segmentWidth - 1}
              height={barHeight}
              fill={color}
              stroke={color}
              strokeWidth={1}
            />
          ))}
        </g>
      </svg>
      <p className="text-xs text-gray-500">
        {hasWhole ? `${whole}と${num}/${den}` : `${num}/${den}`}
      </p>
    </div>
  );
};

export default FractionBarVisual;
