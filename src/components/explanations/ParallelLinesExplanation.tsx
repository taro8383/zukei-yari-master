import { useState, useEffect } from 'react';

interface ParallelLinesExplanationProps {
  exerciseType: 1 | 2;
}

const ParallelLinesExplanation = ({ exerciseType }: ParallelLinesExplanationProps) => {
  const [step, setStep] = useState(0);

  const svgSize = 320;
  const padding = 40;

  // Reference line (line a)
  const refLine = {
    p1: { x: padding + 40, y: padding + 80 },
    p2: { x: padding + 200, y: padding + 120 },
  };

  // Calculate slope of reference line
  const refSlope = (refLine.p2.y - refLine.p1.y) / (refLine.p2.x - refLine.p1.x);

  // Point A (for exercise type 1)
  const pointA = { x: padding + 140, y: padding + 40 };

  // Correct parallel line through A
  const correctLine = {
    p1: pointA,
    p2: {
      x: pointA.x + (refLine.p2.x - refLine.p1.x),
      y: pointA.y + (refLine.p2.y - refLine.p1.y),
    },
  };

  // Grid spacing (for 2cm distance)
  const gridSpacing = 40; // 2 grid units = 2cm

  // Parallel lines 2cm away (for exercise type 2)
  const parallelLines2cm = [
    {
      p1: { x: padding + 20, y: padding + 40 },
      p2: { x: padding + 220, y: padding + 80 },
      distance: '2cm上',
    },
    {
      p1: { x: padding + 60, y: padding + 120 },
      p2: { x: padding + 260, y: padding + 160 },
      distance: '2cm下',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev >= (exerciseType === 1 ? 3 : 4) ? prev : prev + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, [exerciseType]);

  return (
    <div className="bg-muted/30 p-4 rounded-xl space-y-4">
      <p className="font-bold text-center text-primary">
        {exerciseType === 1
          ? '平行線のひき方 / How to Draw Parallel Lines'
          : '平行線の間隔 / Distance Between Parallel Lines'}
      </p>

      <svg width={svgSize} height={svgSize} className="mx-auto bg-background rounded-xl border border-border">
        {/* Grid background */}
        <defs>
          <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="hsl(var(--muted-foreground))" opacity="0.15" />
          </pattern>
        </defs>
        <rect width={svgSize} height={svgSize} fill="url(#grid3)" />

        {/* Reference line (line a) */}
        <line
          x1={refLine.p1.x}
          y1={refLine.p1.y}
          x2={refLine.p2.x}
          y2={refLine.p2.y}
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <text x={refLine.p2.x + 8} y={refLine.p2.y} className="fill-primary font-bold" fontSize={14}>
          あ
        </text>

        {exerciseType === 1 ? (
          <>
            {/* Point A */}
            <g>
              <circle cx={pointA.x} cy={pointA.y} r={6} fill="hsl(var(--kid-orange))" />
              <text x={pointA.x + 10} y={pointA.y - 8} className="fill-kid-orange font-bold" fontSize={14}>
                A
              </text>
            </g>

            {/* Step 1: Show direction arrows */}
            {step >= 1 && (
              <g>
                {/* Arrow showing parallel direction */}
                <line
                  x1={pointA.x}
                  y1={pointA.y}
                  x2={pointA.x + 60}
                  y2={pointA.y + (refLine.p2.y - refLine.p1.y) * (60 / (refLine.p2.x - refLine.p1.x))}
                  stroke="hsl(var(--kid-green))"
                  strokeWidth={2}
                  strokeDasharray="5,5"
                  opacity={0.6}
                />
                <text x={pointA.x + 30} y={pointA.y - 15} className="fill-kid-green text-xs">
                  同じ角度 / Same angle
                </text>
              </g>
            )}

            {/* Step 2: Show correct parallel line */}
            {step >= 2 && (
              <g>
                <line
                  x1={correctLine.p1.x}
                  y1={correctLine.p1.y}
                  x2={correctLine.p2.x}
                  y2={correctLine.p2.y}
                  stroke="hsl(var(--kid-green))"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <text x={correctLine.p2.x + 8} y={correctLine.p2.y} className="fill-kid-green font-bold" fontSize={12}>
                  正解 / Correct
                </text>
              </g>
            )}

            {/* Step 3: Show angle indicators */}
            {step >= 3 && (
              <g>
                {/* Parallel arrows */}
                <path
                  d={`M ${refLine.p1.x + 20} ${refLine.p1.y - 15} L ${refLine.p1.x + 35} ${refLine.p1.y - 15}`}
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  markerEnd="url(#arrowhead)"
                />
                <path
                  d={`M ${correctLine.p1.x + 20} ${correctLine.p1.y - 15} L ${correctLine.p1.x + 35} ${correctLine.p1.y - 15}`}
                  stroke="hsl(var(--kid-green))"
                  strokeWidth={2}
                  markerEnd="url(#arrowhead)"
                />
              </g>
            )}
          </>
        ) : (
          <>
            {/* Distance indicator lines */}
            {step >= 1 && (
              <g>
                {/* Vertical distance markers */}
                <line
                  x1={padding + 100}
                  y1={refLine.p1.y}
                  x2={padding + 100}
                  y2={parallelLines2cm[0].p1.y}
                  stroke="hsl(var(--kid-orange))"
                  strokeWidth={1}
                  strokeDasharray="3,3"
                />
                <text x={padding + 105} y={(refLine.p1.y + parallelLines2cm[0].p1.y) / 2} className="fill-kid-orange text-xs">
                  2cm
                </text>

                <line
                  x1={padding + 140}
                  y1={refLine.p1.y}
                  x2={padding + 140}
                  y2={parallelLines2cm[1].p1.y}
                  stroke="hsl(var(--kid-orange))"
                  strokeWidth={1}
                  strokeDasharray="3,3"
                />
                <text x={padding + 145} y={(refLine.p1.y + parallelLines2cm[1].p1.y) / 2} className="fill-kid-orange text-xs">
                  2cm
                </text>
              </g>
            )}

            {/* Show parallel lines */}
            {step >= 2 && (
              <g>
                {parallelLines2cm.map((line, idx) => (
                  <g key={idx}>
                    <line
                      x1={line.p1.x}
                      y1={line.p1.y}
                      x2={line.p2.x}
                      y2={line.p2.y}
                      stroke="hsl(var(--kid-green))"
                      strokeWidth={3}
                      strokeLinecap="round"
                    />
                    <text x={line.p2.x + 5} y={line.p2.y} className="fill-kid-green text-xs">
                      {line.distance}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* Grid unit explanation */}
            {step >= 3 && (
              <g>
                <rect
                  x={padding + 200}
                  y={padding + 160}
                  width={gridSpacing}
                  height={gridSpacing}
                  fill="none"
                  stroke="hsl(var(--kid-yellow))"
                  strokeWidth={2}
                />
                <text x={padding + 220} y={padding + 190} className="fill-kid-yellow text-xs" textAnchor="middle">
                  1cm
                </text>
              </g>
            )}
          </>
        )}

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
          </marker>
        </defs>
      </svg>

      {/* Step-by-step explanation */}
      <div className="space-y-2 text-sm">
        {exerciseType === 1 ? (
          <>
            {step >= 0 && (
              <div className="bg-primary/10 p-2 rounded-lg">
                <p className="font-medium">① 直線あの角度を確認 / Check angle of line あ</p>
              </div>
            )}
            {step >= 1 && (
              <div className="bg-kid-green/10 p-2 rounded-lg">
                <p className="font-medium">② 点Aから同じ角度で線をひく / Draw from point A at same angle</p>
              </div>
            )}
            {step >= 2 && (
              <div className="bg-kid-yellow/10 p-2 rounded-lg">
                <p className="font-medium">③ 平行な線が完成！ / Parallel line complete!</p>
                <p className="text-xs text-muted-foreground">同じ傾き（かたむき） = 平行 / Same slope = Parallel</p>
              </div>
            )}
          </>
        ) : (
          <>
            {step >= 0 && (
              <div className="bg-primary/10 p-2 rounded-lg">
                <p className="font-medium">① 直線あを確認 / Check line あ</p>
              </div>
            )}
            {step >= 1 && (
              <div className="bg-kid-orange/10 p-2 rounded-lg">
                <p className="font-medium">② 2cm = 2マス（grid units）の距離をとる / Measure 2cm (2 grid units)</p>
              </div>
            )}
            {step >= 2 && (
              <div className="bg-kid-green/10 p-2 rounded-lg">
                <p className="font-medium">③ 同じ角度で2本の平行線をひく / Draw 2 parallel lines at same angle</p>
              </div>
            )}
          </>
        )}

        <div className="bg-muted p-3 rounded-lg mt-3">
          <p className="font-bold text-xs">ポイント / Key Point:</p>
          <p className="text-xs text-muted-foreground">
            平行な線は同じ傾き（角度）を持つ / Parallel lines have the same slope (angle)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParallelLinesExplanation;
