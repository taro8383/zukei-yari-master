import { useState, useEffect } from 'react';

interface DiagonalsDrawingExplanationProps {
  shapeType: 'parallelogram' | 'trapezoid' | 'kite';
}

const DiagonalsDrawingExplanation = ({ shapeType }: DiagonalsDrawingExplanationProps) => {
  const [step, setStep] = useState(0);

  const svgSize = 280;
  const center = svgSize / 2;

  // Shape vertices based on type
  const getVertices = (): { x: number; y: number; label: string }[] => {
    switch (shapeType) {
      case 'parallelogram':
        return [
          { x: center - 60, y: center - 40, label: 'A' },
          { x: center + 80, y: center - 40, label: 'B' },
          { x: center + 60, y: center + 60, label: 'C' },
          { x: center - 80, y: center + 60, label: 'D' },
        ];
      case 'trapezoid':
        return [
          { x: center - 40, y: center - 50, label: 'A' },
          { x: center + 40, y: center - 50, label: 'B' },
          { x: center + 80, y: center + 50, label: 'C' },
          { x: center - 80, y: center + 50, label: 'D' },
        ];
      case 'kite':
        return [
          { x: center, y: center - 70, label: 'A' },
          { x: center + 60, y: center, label: 'B' },
          { x: center, y: center + 70, label: 'C' },
          { x: center - 60, y: center, label: 'D' },
        ];
      default:
        return [
          { x: center - 60, y: center - 40, label: 'A' },
          { x: center + 60, y: center - 40, label: 'B' },
          { x: center + 60, y: center + 40, label: 'C' },
          { x: center - 60, y: center + 40, label: 'D' },
        ];
    }
  };

  const vertices = getVertices();

  // Animation: show wrong attempts, then correct diagonals
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 4 : prev + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const shapeNames: Record<string, [string, string]> = {
    parallelogram: ['平行四辺形', 'parallelogram'],
    trapezoid: ['台形', 'trapezoid'],
    kite: ['ひし形', 'rhombus'],
  };
  const [nameJa, nameEn] = shapeNames[shapeType];

  return (
    <div className="bg-muted/30 p-4 rounded-xl space-y-4">
      <p className="font-bold text-center text-primary">
        対角線のひき方 / How to Draw Diagonals
      </p>

      <svg width={svgSize} height={svgSize} className="mx-auto bg-background rounded-xl border border-border">
        {/* Shape edges */}
        <polygon
          points={vertices.map((v) => `${v.x},${v.y}`).join(' ')}
          fill="hsl(var(--primary) / 0.1)"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />

        {/* Wrong attempt - adjacent vertices */}
        {step === 1 && (
          <g>
            <line
              x1={vertices[0].x}
              y1={vertices[0].y}
              x2={vertices[1].x}
              y2={vertices[1].y}
              stroke="hsl(var(--destructive))"
              strokeWidth={3}
              strokeDasharray="5,5"
              opacity={0.5}
            />
            <text x={center} y={svgSize - 20} textAnchor="middle" className="fill-destructive text-xs">
              × となり合う頂点 / Adjacent vertices
            </text>
          </g>
        )}

        {/* First diagonal */}
        {step >= 2 && (
          <g>
            <line
              x1={vertices[0].x}
              y1={vertices[0].y}
              x2={vertices[2].x}
              y2={vertices[2].y}
              stroke="hsl(var(--kid-orange))"
              strokeWidth={3}
              strokeLinecap="round"
            />
            {step === 2 && (
              <text x={center} y={svgSize - 20} textAnchor="middle" className="fill-kid-orange text-xs">
                対角線 1本目 / 1st diagonal
              </text>
            )}
          </g>
        )}

        {/* Second diagonal */}
        {step >= 3 && (
          <g>
            <line
              x1={vertices[1].x}
              y1={vertices[1].y}
              x2={vertices[3].x}
              y2={vertices[3].y}
              stroke="hsl(var(--kid-green))"
              strokeWidth={3}
              strokeLinecap="round"
            />
            {step === 3 && (
              <text x={center} y={svgSize - 20} textAnchor="middle" className="fill-kid-green text-xs">
                対角線 2本目 / 2nd diagonal
              </text>
            )}
          </g>
        )}

        {/* Intersection point */}
        {step >= 4 && (
          <circle cx={center} cy={center} r={6} fill="hsl(var(--destructive))" />
        )}

        {/* Vertices */}
        {vertices.map((v, i) => (
          <g key={i}>
            <circle cx={v.x} cy={v.y} r={8} fill="hsl(var(--primary))" />
            <text
              x={v.x}
              y={v.y - 12}
              textAnchor="middle"
              className="font-bold fill-foreground text-sm"
            >
              {v.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Step-by-step explanation */}
      <div className="space-y-2 text-sm">
        <div className="bg-primary/10 p-2 rounded-lg">
          <p className="font-medium">{nameJa} / {nameEn}</p>
          <p className="text-xs text-muted-foreground">4つの頂点: A, B, C, D</p>
        </div>

        {step >= 1 && (
          <div className="bg-destructive/10 p-2 rounded-lg">
            <p className="font-medium">× だめな例 / Wrong:</p>
            <p className="text-xs text-muted-foreground">
              となり合う頂点（A→Bなど）は辺になる / Adjacent vertices form edges
            </p>
          </div>
        )}

        {step >= 2 && (
          <div className="bg-kid-orange/10 p-2 rounded-lg">
            <p className="font-medium">① A → C（向かい合う頂点）</p>
            <p className="text-xs text-muted-foreground">
              1つ目の対角線 / 1st diagonal (opposite vertices)
            </p>
          </div>
        )}

        {step >= 3 && (
          <div className="bg-kid-green/10 p-2 rounded-lg">
            <p className="font-medium">② B → D（向かい合う頂点）</p>
            <p className="text-xs text-muted-foreground">
              2つ目の対角線 / 2nd diagonal (opposite vertices)
            </p>
          </div>
        )}

        {step >= 4 && (
          <div className="bg-kid-green/20 p-3 rounded-lg">
            <p className="font-bold text-kid-green text-center">
              〇 完成！2本の対角線
            </p>
            <p className="text-xs text-center text-muted-foreground">
              Complete! 2 diagonals intersect at center
            </p>
          </div>
        )}

        <div className="bg-muted p-3 rounded-lg mt-3">
          <p className="font-bold text-xs">ポイント / Key Point:</p>
          <p className="text-xs text-muted-foreground mt-1">
            対角線は<span className="font-bold text-primary">向かい合う頂点</span>をむすぶ
          </p>
          <p className="text-xs text-muted-foreground">
            Diagonals connect <span className="font-bold text-primary">opposite vertices</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagonalsDrawingExplanation;
