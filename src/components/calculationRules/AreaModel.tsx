interface AreaModelProps {
  baseNum: number;
  adjustment: number;
  multiplier: number;
  isAddition: boolean;
}

const AreaModel = ({ baseNum, adjustment, multiplier, isAddition }: AreaModelProps) => {
  const hardNum = isAddition ? baseNum + adjustment : baseNum - adjustment;
  const area1 = baseNum * multiplier;
  const area2 = adjustment * multiplier;
  const totalArea = hardNum * multiplier;

  // SVG dimensions
  const svgWidth = 400;
  const svgHeight = 280;
  const rectX = 50;
  const rectY = 60;
  const rectWidth = 300;
  const rectHeight = 160;

  // Split position (proportional to baseNum and adjustment)
  const splitRatio = baseNum / (baseNum + adjustment);
  const splitX = rectX + rectWidth * splitRatio;

  return (
    <div className="bg-kid-green/10 rounded-xl p-4 border border-kid-green/30">
      <p className="text-sm font-bold text-foreground mb-2 text-center">
        📐 面積図で考える / Area Model
      </p>

      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-lg mx-auto">
        {/* Background */}
        <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="transparent" />

        {/* Title equation */}
        <text x={svgWidth / 2} y="25" textAnchor="middle" className="fill-foreground text-base font-bold">
          {hardNum} × {multiplier} = ({baseNum} {isAddition ? '+' : '-'} {adjustment}) × {multiplier}
        </text>

        {/* Left side label - Multiplier */}
        <text x="30" y={rectY + rectHeight / 2} textAnchor="middle" className="fill-muted-foreground text-sm font-bold"
          transform={`rotate(-90, 30, ${rectY + rectHeight / 2})`}>
          × {multiplier}
        </text>

        {/* Bottom labels */}
        <text x={rectX + (splitX - rectX) / 2} y={rectY + rectHeight + 20} textAnchor="middle" className="fill-foreground text-sm font-bold">
          {baseNum}
        </text>
        <text x={splitX + (rectX + rectWidth - splitX) / 2} y={rectY + rectHeight + 20} textAnchor="middle" className="fill-foreground text-sm font-bold">
          {adjustment}
        </text>

        {/* Left rectangle (BaseNum × Multiplier) */}
        <rect
          x={rectX}
          y={rectY}
          width={splitX - rectX}
          height={rectHeight}
          fill="#93c5fd"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <text x={rectX + (splitX - rectX) / 2} y={rectY + rectHeight / 2 + 5} textAnchor="middle" className="fill-blue-900 text-lg font-bold">
          {baseNum} × {multiplier}
        </text>

        {/* Right rectangle (Adjustment × Multiplier) */}
        <rect
          x={splitX}
          y={rectY}
          width={rectX + rectWidth - splitX}
          height={rectHeight}
          fill={isAddition ? "#86efac" : "#fca5a5"}
          stroke={isAddition ? "#22c55e" : "#ef4444"}
          strokeWidth="2"
        />
        <text x={splitX + (rectX + rectWidth - splitX) / 2} y={rectY + rectHeight / 2 + 5} textAnchor="middle" className="fill-foreground text-base font-bold">
          {adjustment} × {multiplier}
        </text>

        {/* Vertical divider line */}
        <line x1={splitX} y1={rectY} x2={splitX} y2={rectY + rectHeight} stroke="#374151" strokeWidth="2" strokeDasharray="5,5" />

        {/* Bracket showing total */}
        <path
          d={`M${rectX - 10} ${rectY} Q${rectX - 20} ${rectY + rectHeight / 2} ${rectX - 10} ${rectY + rectHeight}`}
          fill="none"
          stroke="#6b7280"
          strokeWidth="2"
        />
        <text x={rectX - 25} y={rectY + rectHeight / 2} textAnchor="end" className="fill-foreground text-sm font-bold">
          {hardNum}
        </text>

        {/* Legend */}
        <g transform={`translate(${rectX}, ${rectY + rectHeight + 65})`}>
          <rect x="0" y="0" width="15" height="15" fill="#93c5fd" stroke="#3b82f6" />
          <text x="20" y="12" className="fill-foreground text-xs">大きな長方形 / Big rectangle ({baseNum} × {multiplier})</text>

          <rect x="180" y="0" width="15" height="15" fill={isAddition ? "#86efac" : "#fca5a5"} stroke={isAddition ? "#22c55e" : "#ef4444"} />
          <text x="200" y="12" className="fill-foreground text-xs">小さな長方形 / Small rectangle ({adjustment} × {multiplier})</text>
        </g>
      </svg>

      {/* Step explanation */}
      <div className="mt-3 bg-background/70 rounded-lg p-3 text-sm">
        <p className="font-bold text-foreground mb-2">
          💡 分配法則のステップ:
        </p>
        <div className="space-y-1">
          <p className="text-foreground">
            ① {hardNum} を {baseNum} {isAddition ? '+' : '-'} {adjustment} に分ける
          </p>
          <p className="text-foreground">
            ② {baseNum} × {multiplier} = ?
          </p>
          <p className="text-foreground">
            ③ {adjustment} × {multiplier} = ?
          </p>
          <p className="text-foreground font-bold">
            ④ ? {isAddition ? '+' : '-'} ? = ?
          </p>
        </div>
      </div>
    </div>
  );
};

export default AreaModel;
