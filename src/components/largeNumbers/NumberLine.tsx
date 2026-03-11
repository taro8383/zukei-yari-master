interface NumberLineProps {
  originalNumber: number;
  targetPlace?: string;
}

const NumberLine = ({ originalNumber, targetPlace }: NumberLineProps) => {
  // Determine the range based on the original number - don't show the answer!
  // Show a range that includes the number and nearby round numbers
  const magnitude = Math.pow(10, Math.floor(Math.log10(originalNumber)));
  const min = Math.floor(originalNumber / (magnitude * 5)) * (magnitude * 5) - magnitude;
  const max = min + magnitude * 6;
  const range = max - min;

  // SVG dimensions
  const width = 600;
  const height = 120;
  const padding = 50;
  const lineY = 70;

  // Scale function
  const scale = (val: number) => padding + ((val - min) / range) * (width - 2 * padding);

  // Generate tick marks at regular intervals
  const tickInterval = magnitude;
  const ticks = [];
  for (let val = Math.ceil(min / tickInterval) * tickInterval; val <= max; val += tickInterval) {
    ticks.push({ value: val, x: scale(val) });
  }

  const originalX = scale(originalNumber);

  // Find nearest round numbers for hint arrows (without showing answer)
  const lowerRound = Math.floor(originalNumber / magnitude) * magnitude;
  const upperRound = lowerRound + magnitude;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-xl mx-auto">
        {/* Background */}
        <rect x="10" y="10" width={width - 20} height={height - 20} rx="12" fill="hsl(var(--muted))" opacity="0.3" />

        {/* Title */}
        <text x={width / 2} y="25" textAnchor="middle" className="fill-foreground font-bold text-xs">
          数直線 (Number Line) - どっちに近いかな？
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
              y={lineY + 22}
              textAnchor="middle"
              className="fill-muted-foreground text-xs"
            >
              {formatNumber(tick.value)}
            </text>
          </g>
        ))}

        {/* Question mark at possible round positions - shows there are options */}
        <text
          x={scale(lowerRound)}
          y={lineY - 25}
          textAnchor="middle"
          className="fill-muted-foreground font-bold text-lg"
        >
          ?
        </text>
        <text
          x={scale(upperRound)}
          y={lineY - 25}
          textAnchor="middle"
          className="fill-muted-foreground font-bold text-lg"
        >
          ?
        </text>

        {/* Original number marker - this is the only number shown */}
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
          className="fill-primary font-black text-sm"
        >
          {originalNumber.toLocaleString()}
        </text>

        {/* Distance indicators to nearest round numbers (visual hint only) */}
        <line
          x1={originalX}
          y1={lineY + 5}
          x2={scale(lowerRound)}
          y2={lineY + 5}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.5"
        />
        <line
          x1={originalX}
          y1={lineY + 5}
          x2={scale(upperRound)}
          y2={lineY + 5}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity="0.5"
        />
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
