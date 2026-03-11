interface PlaceValueChartProps {
  number: number;
}

const PlaceValueChart = ({ number }: PlaceValueChartProps) => {
  // Convert number to string and pad to show all place values
  const numStr = number.toString();

  // Define the Japanese place value groups (4 digits each)
  const groups = [
    { name: '一', nameEn: 'Ones', digits: ['千', '百', '十', '一'] },
    { name: '万', nameEn: 'Ten-Thousands', digits: ['千', '百', '十', '万'] },
    { name: '億', nameEn: 'Hundred-Millions', digits: ['千', '百', '十', '億'] },
    { name: '兆', nameEn: 'Trillions', digits: ['千', '百', '十', '兆'] },
  ];

  // Pad the number to 16 digits (4 groups × 4 digits)
  const paddedNum = numStr.padStart(16, '0');

  // Split into groups of 4 from right
  const groupValues = [];
  for (let i = 0; i < 4; i++) {
    const start = i * 4;
    groupValues.push(paddedNum.substring(start, start + 4));
  }
  groupValues.reverse(); // Reverse to get [一, 万, 億, 兆] order

  // Check if a group has any non-zero digits
  const hasValue = (groupStr: string) => groupStr !== '0000';

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 800 200" className="w-full max-w-3xl mx-auto">
        {/* Background */}
        <rect x="10" y="10" width="780" height="180" rx="12" fill="hsl(var(--muted))" opacity="0.3" />

        {/* Title */}
        <text x="400" y="35" textAnchor="middle" className="fill-foreground font-bold text-sm">
          位取り表 (Place Value Chart)
        </text>

        {/* Draw groups from right to left */}
        {groups.map((group, groupIndex) => {
          const x = 760 - (groupIndex * 190); // Start from right
          const groupValue = groupValues[groupIndex];
          const groupHasValue = hasValue(groupValue);

          return (
            <g key={group.name}>
              {/* Group background - highlight if has value */}
              <rect
                x={x - 180}
                y="50"
                width="180"
                height="110"
                rx="8"
                fill={groupHasValue ? 'hsl(var(--primary) / 0.15)' : 'transparent'}
                stroke={groupHasValue ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--border))'}
                strokeWidth={groupHasValue ? 2 : 1}
              />

              {/* Group label */}
              <text
                x={x - 90}
                y="70"
                textAnchor="middle"
                className="fill-primary font-black text-lg"
              >
                {group.name}
              </text>
              <text
                x={x - 90}
                y="85"
                textAnchor="middle"
                className="fill-muted-foreground text-xs"
              >
                {group.nameEn}
              </text>

              {/* Individual digit places */}
              {group.digits.map((digit, digitIndex) => {
                const digitX = x - 170 + (digitIndex * 45);
                const digitValue = groupValue[digitIndex];
                const isZero = digitValue === '0';

                return (
                  <g key={digit}>
                    {/* Place label */}
                    <text
                      x={digitX + 20}
                      y="105"
                      textAnchor="middle"
                      className="fill-muted-foreground text-xs"
                    >
                      {digit}
                    </text>

                    {/* Digit value */}
                    <text
                      x={digitX + 20}
                      y="140"
                      textAnchor="middle"
                      className={`font-black text-xl ${isZero ? 'fill-muted-foreground/30' : 'fill-foreground'}`}
                    >
                      {digitValue}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Example label */}
        <text x="400" y="185" textAnchor="middle" className="fill-muted-foreground text-xs">
          例: {number.toLocaleString()} = {formatJapaneseNumber(number)}
        </text>
      </svg>
    </div>
  );
};

// Helper function to format Japanese number
function formatJapaneseNumber(num: number): string {
  if (num >= 1000000000000) {
    const cho = Math.floor(num / 1000000000000);
    const remainder = num % 1000000000000;
    if (remainder === 0) return `${cho}兆`;
    const oku = Math.floor(remainder / 100000000);
    if (oku === 0) return `${cho}兆`;
    return `${cho}兆${oku}億`;
  }
  if (num >= 100000000) {
    const oku = Math.floor(num / 100000000);
    const remainder = num % 100000000;
    if (remainder === 0) return `${oku}億`;
    const man = Math.floor(remainder / 10000);
    if (man === 0) return `${oku}億`;
    return `${oku}億${man}万`;
  }
  if (num >= 10000) {
    const man = Math.floor(num / 10000);
    const remainder = num % 10000;
    if (remainder === 0) return `${man}万`;
    return `${man}万${remainder}`;
  }
  return num.toString();
}

export default PlaceValueChart;
