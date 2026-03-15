interface PlaceValueChartProps {
  number: number;
}

const PlaceValueChart = ({ number }: PlaceValueChartProps) => {
  // Define the Japanese place value groups (4 digits each)
  // This is now a static teaching aid, not showing the actual number
  const groups = [
    { name: '一', nameEn: 'Ones', digits: ['千', '百', '十', '一'] },
    { name: '万', nameEn: 'Ten-Thousands', digits: ['千', '百', '十', '万'] },
    { name: '億', nameEn: 'Hundred-Millions', digits: ['千', '百', '十', '億'] },
    { name: '兆', nameEn: 'Trillions', digits: ['千', '百', '十', '兆'] },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 800 220" className="w-full max-w-3xl mx-auto">
        {/* Background */}
        <rect x="10" y="10" width="780" height="200" rx="12" fill="hsl(var(--muted))" opacity="0.3" />

        {/* Title */}
        <text x="400" y="35" textAnchor="middle" className="fill-foreground font-bold text-sm">
          位取り表 (Place Value Chart)
        </text>

        {/* Instruction text */}
        <text x="400" y="55" textAnchor="middle" className="fill-muted-foreground text-xs">
          右から4けたずつ「一・万・億・兆」の単位に分けます
        </text>

        {/* Draw groups from right to left */}
        {groups.map((group, groupIndex) => {
          const x = 760 - (groupIndex * 190); // Start from right

          return (
            <g key={group.name}>
              {/* Group background */}
              <rect
                x={x - 180}
                y="65"
                width="180"
                height="120"
                rx="8"
                fill="transparent"
                stroke="hsl(var(--border))"
                strokeWidth={1}
              />

              {/* Group label */}
              <text
                x={x - 90}
                y="85"
                textAnchor="middle"
                className="fill-primary font-black text-lg"
              >
                {group.name}
              </text>
              <text
                x={x - 90}
                y="100"
                textAnchor="middle"
                className="fill-muted-foreground text-xs"
              >
                {group.nameEn}
              </text>

              {/* Individual digit places - show empty boxes for students to fill mentally */}
              {group.digits.map((digit, digitIndex) => {
                const digitX = x - 170 + (digitIndex * 45);

                return (
                  <g key={digit}>
                    {/* Place label */}
                    <text
                      x={digitX + 20}
                      y="120"
                      textAnchor="middle"
                      className="fill-muted-foreground text-xs"
                    >
                      {digit}
                    </text>

                    {/* Empty box for digit (visual guide only) */}
                    <rect
                      x={digitX + 5}
                      y="130"
                      width="30"
                      height="35"
                      rx="4"
                      fill="white"
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                      opacity="0.5"
                    />

                    {/* Question mark as placeholder */}
                    <text
                      x={digitX + 20}
                      y="155"
                      textAnchor="middle"
                      className="fill-muted-foreground/40 text-lg"
                    >
                      ?
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Visual separator lines between groups */}
        <line x1="395" y1="65" x2="395" y2="185" stroke="hsl(var(--primary) / 0.3)" strokeWidth="2" strokeDasharray="5,3" />
        <line x1="205" y1="65" x2="205" y2="185" stroke="hsl(var(--primary) / 0.3)" strokeWidth="2" strokeDasharray="5,3" />
        <line x1="585" y1="65" x2="585" y2="185" stroke="hsl(var(--primary) / 0.3)" strokeWidth="2" strokeDasharray="5,3" />

        {/* Grouping explanation */}
        <text x="400" y="205" textAnchor="middle" className="fill-muted-foreground text-xs">
          例: 12,3000,0000 → 12億3000万 → 「123億」と読みます
        </text>
      </svg>
    </div>
  );
};

export default PlaceValueChart;
