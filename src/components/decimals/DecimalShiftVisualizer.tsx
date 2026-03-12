import { useState } from 'react';

interface DecimalShiftVisualizerProps {
  original: number;
  x10: number;
  x100: number;
  divide10: number;
}

const DecimalShiftVisualizer = ({
  original,
  x10,
  x100,
  divide10,
}: DecimalShiftVisualizerProps) => {
  const [selectedOperation, setSelectedOperation] = useState<'x10' | 'x100' | 'divide10' | 'divide100'>('x10');

  const operations = [
    { key: 'x10', label: '×10', labelEn: '×10', result: x10, direction: 'right', spaces: 1 },
    { key: 'x100', label: '×100', labelEn: '×100', result: x100, direction: 'right', spaces: 2 },
    { key: 'divide10', label: '÷10', labelEn: '÷10', result: divide10, direction: 'left', spaces: 1 },
    { key: 'divide100', label: '÷100', labelEn: '÷100', result: divide10 / 10, direction: 'left', spaces: 2 },
  ] as const;

  const currentOp = operations.find(op => op.key === selectedOperation)!;

  return (
    <div className="bg-kid-green/10 rounded-xl p-4 border border-kid-green/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🎯 小数点の移動 / Decimal Point Movement
      </p>

      {/* Operation Selector */}
      <div className="flex justify-center gap-2 mb-4">
        {operations.map((op) => (
          <button
            key={op.key}
            onClick={() => setSelectedOperation(op.key)}
            className={`px-3 py-2 rounded-lg font-bold text-sm transition-colors ${
              selectedOperation === op.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {op.label}
          </button>
        ))}
      </div>

      {/* Visualization */}
      <div className="bg-background/70 rounded-lg p-4">
        <svg viewBox="0 0 400 120" className="w-full max-w-md mx-auto">
          {/* Background */}
          <rect x="0" y="0" width="400" height="120" fill="transparent" />

          {/* Original number */}
          <text x="80" y="40" textAnchor="middle" className="fill-muted-foreground text-sm">
            もとの数 / Original
          </text>
          <text x="80" y="70" textAnchor="middle" className="fill-foreground text-3xl font-bold">
            {original}
          </text>

          {/* Arrow */}
          <g>
            <path
              d={currentOp.direction === 'right' ? 'M 130 60 L 170 60' : 'M 170 60 L 130 60'}
              stroke="#3b82f6"
              strokeWidth="3"
              markerEnd="url(#shiftarrow)"
            />
            <text x="150" y="50" textAnchor="middle" className="fill-primary text-sm font-bold">
              {currentOp.direction === 'right' ? '→' : '←'}
            </text>
            <text x="150" y="85" textAnchor="middle" className="fill-muted-foreground text-xs">
              {currentOp.spaces}つ / {currentOp.spaces} space{currentOp.spaces > 1 ? 's' : ''}
            </text>
          </g>

          {/* Result */}
          <text x="280" y="40" textAnchor="middle" className="fill-muted-foreground text-sm">
            答え / Answer
          </text>
          <text x="280" y="70" textAnchor="middle" className="fill-green-600 text-3xl font-bold">
            {currentOp.result}
          </text>

          {/* Highlight the decimal movement */}
          <g>
            {/* Original decimal point position */}
            <circle cx={80 + (original.toString().indexOf('.') * 8 || 12)} cy="75" r="4" fill="#ef4444" />

            {/* Arrow showing movement */}
            <path
              d={currentOp.direction === 'right'
                ? `M ${80 + (original.toString().indexOf('.') * 8 || 12)} 85 Q ${150} 100 ${280 + (currentOp.result.toString().indexOf('.') * 8 || 12)} 85`
                : `M ${80 + (original.toString().indexOf('.') * 8 || 12)} 85 Q ${150} 100 ${280 + (currentOp.result.toString().indexOf('.') * 8 || 12)} 85`
              }
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5,3"
            />

            {/* New decimal point position */}
            <circle cx={280 + (currentOp.result.toString().indexOf('.') * 8 || 12)} cy="75" r="4" fill="#22c55e" />
          </g>

          {/* Arrow marker */}
          <defs>
            <marker id="shiftarrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
          </defs>
        </svg>

        {/* Explanation text */}
        <div className="mt-3 text-center">
          <p className="text-sm text-foreground font-medium">
            {selectedOperation === 'x10' && `${original} × 10 = ${x10}（小数点を右へ1つ）`}
            {selectedOperation === 'x100' && `${original} × 100 = ${x100}（小数点を右へ2つ）`}
            {selectedOperation === 'divide10' && `${original} ÷ 10 = ${divide10}（小数点を左へ1つ）`}
            {selectedOperation === 'divide100' && `${original} ÷ 100 = ${divide10 / 10}（小数点を左へ2つ）`}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {selectedOperation === 'x10' && `Move decimal right 1 space`}
            {selectedOperation === 'x100' && `Move decimal right 2 spaces`}
            {selectedOperation === 'divide10' && `Move decimal left 1 space`}
            {selectedOperation === 'divide100' && `Move decimal left 2 spaces`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DecimalShiftVisualizer;
