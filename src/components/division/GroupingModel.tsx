interface GroupingModelProps {
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
}

const GroupingModel = ({
  dividend,
  divisor,
  quotient,
  remainder,
}: GroupingModelProps) => {
  // Generate star icons for visualization
  // We'll show groups of stars representing the division
  const itemsPerRow = 5;
  const totalRows = Math.ceil(dividend / itemsPerRow);

  // For the visual, we'll create a simplified representation
  // Showing circles representing groups and remaining items
  const groupRadius = 30;
  const itemRadius = 6;
  const svgHeight = 220;

  // Calculate positions for groups - make it responsive based on divisor
  const groupSpacing = Math.min(70, 320 / Math.max(divisor, 1));
  const startX = groupSpacing / 2 + 10;
  const centerY = 85;

  // Calculate SVG width dynamically based on number of groups
  // Add extra space for remainder display
  const groupsWidth = divisor * groupSpacing + 40;
  const remainderWidth = remainder > 0 ? 100 : 0;
  const svgWidth = Math.max(350, groupsWidth + remainderWidth);

  return (
    <div className="bg-kid-yellow/10 rounded-xl p-4 border border-kid-yellow/30">
      <p className="text-sm font-bold text-foreground mb-2 text-center">
        📦 グループ分けモデル / Grouping Model
      </p>

      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-lg mx-auto">
        {/* Background */}
        <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="transparent" />

        {/* Title equation */}
        <text x={svgWidth / 2} y="25" textAnchor="middle" className="fill-foreground text-lg font-bold">
          {dividend} ÷ {divisor} = ? ... ?
        </text>

        {/* Groups (circles with items inside) */}
        {Array.from({ length: divisor }, (_, groupIndex) => {
          const cx = startX + groupIndex * groupSpacing;

          return (
            <g key={`group-${groupIndex}`}>
              {/* Group circle */}
              <circle
                cx={cx}
                cy={centerY}
                r={groupRadius}
                fill="#dbeafe"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,3"
              />

              {/* Items inside this group */}
              {Array.from({ length: quotient }, (_, itemIndex) => {
                // Position items in a circle pattern inside the group
                const angle = (itemIndex / quotient) * 2 * Math.PI - Math.PI / 2;
                const itemDistance = groupRadius * 0.5;
                const itemX = cx + Math.cos(angle) * itemDistance;
                const itemY = centerY + Math.sin(angle) * itemDistance;

                return (
                  <circle
                    key={`item-${groupIndex}-${itemIndex}`}
                    cx={itemX}
                    cy={itemY}
                    r={itemRadius}
                    fill="#fbbf24"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Group label */}
              <text
                x={cx}
                y={centerY + groupRadius + 20}
                textAnchor="middle"
                className="fill-foreground text-sm font-bold"
              >
                {quotient}個ずつ
              </text>
            </g>
          );
        })}

        {/* Remainder items (outside groups) */}
        {remainder > 0 && (
          <g transform={`translate(${Math.min(startX + divisor * groupSpacing + 10, svgWidth - 80)}, ${centerY - 20})`}>
            <text x="0" y="-25" className="fill-foreground text-sm font-bold">
              あまり
            </text>
            <text x="0" y="-10" className="fill-muted-foreground text-xs">
              Remainder
            </text>

            {/* Remainder items */}
            {Array.from({ length: remainder }, (_, i) => (
              <circle
                key={`remainder-${i}`}
                cx={(i % 2) * 20}
                cy={20 + Math.floor(i / 2) * 20}
                r={itemRadius}
                fill="#fca5a5"
                stroke="#ef4444"
                strokeWidth="2"
              />
            ))}

            {/* Remainder count */}
            <text x="20" y="55" textAnchor="middle" className="fill-red-500 text-base font-bold">
              {remainder}個
            </text>
          </g>
        )}

        {/* Equation at bottom */}
        <text x={svgWidth / 2} y="195" textAnchor="middle" className="fill-foreground text-sm">
          <tspan className="font-bold">{dividend}</tspan>
          <tspan>÷</tspan>
          <tspan className="font-bold">{divisor}</tspan>
          <tspan> = </tspan>
          <tspan className="font-bold text-primary">?</tspan>
          <tspan> ... </tspan>
          <tspan className="font-bold text-red-500">?</tspan>
        </text>
      </svg>

      {/* Explanation */}
      <div className="mt-3 bg-background/70 rounded-lg p-3 text-sm">
        <p className="font-bold text-foreground mb-2">
          💡 わり算の意味:
        </p>
        <div className="space-y-1">
          <p className="text-foreground">
            ① {dividend}個のものを{divisor}人で平等に分ける
          </p>
          <p className="text-foreground">
            ② 1人あたり何個ずつもらえる？ → 答えをたてる
          </p>
          <p className="text-foreground">
            ③ 分け終わったあと、何個残る？ → あまりを求める
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupingModel;
