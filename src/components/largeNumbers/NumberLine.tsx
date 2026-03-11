interface NumberLineProps {
  originalNumber: number;
  roundedNumber: number;
  targetPlace?: string;
}

const NumberLine = ({ originalNumber, roundedNumber, targetPlace }: NumberLineProps) => {
  // Determine the range based on the numbers
  const min = Math.min(originalNumber, roundedNumber) * 0.8;
  const max = Math.max(originalNumber, roundedNumber) * 1.2;
  const range = max - min;

  // SVG dimensions
  const width = 600;
  const height = 150;
  const padding = 50;
  const lineY = 80;

  // Scale function
  const scale = (val: number) => padding + ((val - min) / range) * (width - 2 * padding);

  // Generate tick marks
  const tickCount = 5;
  const ticks = [];
  for (let i = 0; i <= tickCount; i++) {
    const value = min + (range * i) / tickCount;
    ticks.push({ value, x: scale(value) });
  }

  const originalX = scale(originalNumber);
  const roundedX = scale(roundedNumber);
  const isRoundingUp = roundedNumber > originalNumber;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-xl mx-auto">
        {/* Background */}
        <rect x="10" y="10" width={width - 20} height={height - 20} rx="12" fill="hsl(var(--muted))" opacity="0.3" />

        {/* Title */}
        <text x={width / 2} y="25" textAnchor="middle" className="fill-foreground font-bold text-xs">
          数直線 (Number Line) - {targetPlace || '四捨五入'}
        </text>

        {/* Main number line */}
        <line
          x1={padding}
          y1={lineY}
          x2={width - padding}
          y2={lineY}
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />

        {/* Tick marks */}
        {ticks.map((tick, i) => (
          <g key={i}>
            <line
              x1={tick.x}
              y1={lineY - 8}
              x2={tick.x}
              y2={lineY + 8}
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
            />
            <text
              x={tick.x}
              y={lineY + 25}
              textAnchor="middle"
              className="fill-muted-foreground text-xs"
            >
              {formatNumber(tick.value)}
            </text>
          </g>
        ))}

        {/* Original number marker */}
        <circle
          cx={originalX}
          cy={lineY}
          r="8"
          fill="hsl(var(--primary))"
          stroke="white"
          strokeWidth="2"
        />
        <text
          x={originalX}
          y={lineY - 15}
          textAnchor="middle"
          className="fill-primary font-bold text-sm"
        >
          {originalNumber.toLocaleString()}
        </text>

        {/* Arrow showing rounding direction */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={isRoundingUp ? '#22c55e' : '#ef4444'} />
          </marker>
        </defs>

        {/* Curved arrow from original to rounded */}
        <path
          d={`M ${originalX} ${lineY - 20} Q ${(originalX + roundedX) / 2} ${lineY - 50} ${roundedX} ${lineY - 20}`}
          fill="none"
          stroke={isRoundingUp ? '#22c55e' : '#ef4444'}
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
          strokeDasharray="5,3"
        />

        {/* Rounded number marker */}
        <rect
          x={roundedX - 30}
          y={lineY - 55}
          width="60"
          height="25"
          rx="6"
          fill={isRoundingUp ? '#22c55e' : '#ef4444'}
          opacity="0.9"
        />
        <text
          x={roundedX}
          y={lineY - 38}
          textAnchor="middle"
          className="fill-white font-black text-sm"
        >
          {roundedNumber.toLocaleString()}
        </text>

        {/* Arrow pointing down to the rounded position */}
        <line
          x1={roundedX}
          y1={lineY - 30}
          x2={roundedX}
          y2={lineY - 10}
          stroke={isRoundingUp ? '#22c55e' : '#ef4444'}
          strokeWidth="2"
        />

        {/* Rounding direction label */}
        <text
          x={(originalX + roundedX) / 2}
          y={lineY - 60}
          textAnchor="middle"
          className={`font-bold text-xs ${isRoundingUp ? 'fill-green-500' : 'fill-red-500'}`}
        >
          {isRoundingUp ? '切り上げ (Round Up)' : '切り捨て (Round Down)'}
        </text>
      </svg>
    </div>
  );
};

// Helper to format large numbers compactly
function formatNumber(num: number): string {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '億';
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(0) + '万';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'k';
  }
  return Math.round(num).toString();
}

export default NumberLine;
