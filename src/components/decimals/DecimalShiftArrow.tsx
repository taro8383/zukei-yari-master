interface DecimalShiftArrowProps {
  originalNumber: number;
  shiftType: 'x10' | 'x100' | 'divide10' | 'divide100';
}

const DecimalShiftArrow = ({
  originalNumber,
  shiftType,
}: DecimalShiftArrowProps) => {
  const shiftInfo = {
    'x10': { label: '×10', direction: 'right', spaces: 1, labelEn: '10 times' },
    'x100': { label: '×100', direction: 'right', spaces: 2, labelEn: '100 times' },
    'divide10': { label: '÷10', direction: 'left', spaces: 1, labelEn: '1/10' },
    'divide100': { label: '÷100', direction: 'left', spaces: 2, labelEn: '1/100' },
  };

  const info = shiftInfo[shiftType];

  return (
    <div className="bg-kid-green/10 rounded-xl p-4 border border-kid-green/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🔄 {info.label} / {info.labelEn}
      </p>

      <svg viewBox="0 0 300 80" className="w-full max-w-sm mx-auto">
        {/* Background */}
        <rect x="0" y="0" width="300" height="80" fill="transparent" />

        {/* Original number */}
        <text x="80" y="35" textAnchor="middle" className="fill-foreground text-2xl font-bold">
          {originalNumber}
        </text>

        {/* Arrow - generic, no direction indicator (student figures out from operation) */}
        <g>
          <path
            d={info.direction === 'right' ? 'M 120 45 L 180 45' : 'M 180 45 L 120 45'}
            stroke="#3b82f6"
            strokeWidth="3"
            markerEnd="url(#exerciseArrow)"
          />
        </g>

        {/* Result placeholder */}
        <rect x="200" y="20" width="80" height="40" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" rx="8" />
        <text x="240" y="45" textAnchor="middle" className="fill-muted-foreground text-sm">
          ?
        </text>

        {/* Arrow marker */}
        <defs>
          <marker id="exerciseArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
        </defs>
      </svg>

      <!-- Hint text is now generic - students must figure out direction and spaces from the operation -->
      <p className="text-xs text-center text-muted-foreground mt-2">
        小数点を動かして答えを求めよう / Shift the decimal point to find the answer
      </p>
    </div>
  );
};

export default DecimalShiftArrow;
