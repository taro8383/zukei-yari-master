interface DecimalStructureVisualizerProps {
  number: number;
  ones: number;
  tenths: number;
  hundredths: number;
}

const DecimalStructureVisualizer = ({
  number,
  ones,
  tenths,
  hundredths,
}: DecimalStructureVisualizerProps) => {
  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🎯 例：{number} = 1を{ones}こ、0.1を{tenths}こ、0.01を{hundredths}こ
      </p>

      <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto">
        {/* Background */}
        <rect x="0" y="0" width="400" height="200" fill="transparent" />

        {/* Title */}
        <text x="200" y="20" textAnchor="middle" className="fill-foreground text-sm font-bold">
          小数のしくみ / How decimals work
        </text>

        {/* Large Square representing 1 (ones place) */}
        <g transform="translate(30, 40)">
          <rect x="0" y="0" width="80" height="80" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" rx="4" />
          <text x="40" y="50" textAnchor="middle" className="fill-foreground text-2xl font-bold">
            1
          </text>
          <text x="40" y="95" textAnchor="middle" className="fill-foreground text-xs">
            1の位 (Ones)
          </text>
          {ones > 0 && (
            <text x="40" y="-5" textAnchor="middle" className="fill-primary text-sm font-bold">
              ×{ones}
            </text>
          )}
        </g>

        {/* Arrow from 1 to 0.1 */}
        <g>
          <path d="M 120 80 L 150 80" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead1)" />
          <text x="135" y="70" textAnchor="middle" className="fill-muted-foreground text-xs">
            ÷10
          </text>
        </g>

        {/* Rectangle representing 0.1 (tenths) - divided into 10 columns */}
        <g transform="translate(160, 40)">
          <rect x="0" y="0" width="80" height="80" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" rx="4" />
          {/* Vertical lines dividing into 10 */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <line key={i} x1={i * 8} y1="0" x2={i * 8} y2="80" stroke="#10b981" strokeWidth="1" strokeOpacity="0.5" />
          ))}
          <text x="40" y="50" textAnchor="middle" className="fill-foreground text-2xl font-bold">
            0.1
          </text>
          <text x="40" y="95" textAnchor="middle" className="fill-foreground text-xs">
            1/10の位
          </text>
          {tenths > 0 && (
            <text x="40" y="-5" textAnchor="middle" className="fill-primary text-sm font-bold">
              ×{tenths}
            </text>
          )}
        </g>

        {/* Arrow from 0.1 to 0.01 */}
        <g>
          <path d="M 250 80 L 280 80" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead2)" />
          <text x="265" y="70" textAnchor="middle" className="fill-muted-foreground text-xs">
            ÷10
          </text>
        </g>

        {/* Small squares representing 0.01 (hundredths) */}
        <g transform="translate(290, 40)">
          <rect x="0" y="0" width="80" height="80" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" rx="4" />
          {/* Grid dividing into 100 small squares */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <g key={i}>
              <line x1={i * 8} y1="0" x2={i * 8} y2="80" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.5" />
              <line x1="0" y1={i * 8} x2="80" y2={i * 8} stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.5" />
            </g>
          ))}
          <text x="40" y="50" textAnchor="middle" className="fill-foreground text-xl font-bold">
            0.01
          </text>
          <text x="40" y="95" textAnchor="middle" className="fill-foreground text-xs">
            1/100の位
          </text>
          {hundredths > 0 && (
            <text x="40" y="-5" textAnchor="middle" className="fill-primary text-sm font-bold">
              ×{hundredths}
            </text>
          )}
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowhead1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
          </marker>
          <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
          </marker>
        </defs>

        {/* Summary at bottom */}
        <text x="200" y="165" textAnchor="middle" className="fill-foreground text-sm">
          <tspan className="font-bold">{number}</tspan>
          <tspan className="fill-muted-foreground"> = </tspan>
          <tspan className="fill-blue-600 font-bold">1×{ones}</tspan>
          <tspan className="fill-muted-foreground"> + </tspan>
          <tspan className="fill-green-600 font-bold">0.1×{tenths}</tspan>
          <tspan className="fill-muted-foreground"> + </tspan>
          <tspan className="fill-amber-600 font-bold">0.01×{hundredths}</tspan>
        </text>
      </svg>
    </div>
  );
};

export default DecimalStructureVisualizer;
