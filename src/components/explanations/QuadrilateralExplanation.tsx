import { useState, useEffect } from 'react';

const QuadrilateralExplanation = () => {
  const [step, setStep] = useState(0);

  const gridSize = 10;
  const dotSpacing = 22;
  const padding = 30;
  const svgSize = gridSize * dotSpacing + padding * 2;

  // Example quadrilateral points (pre-defined example)
  const examplePoints = [
    { x: padding + 2 * dotSpacing, y: padding + 2 * dotSpacing, label: '1' },
    { x: padding + 6 * dotSpacing, y: padding + 2 * dotSpacing, label: '2' },
    { x: padding + 7 * dotSpacing, y: padding + 5 * dotSpacing, label: '3' },
    { x: padding + 2 * dotSpacing, y: padding + 6 * dotSpacing, label: '4' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev >= 5 ? 5 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate grid points
  const gridPoints: { x: number; y: number }[] = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      gridPoints.push({
        x: padding + col * dotSpacing,
        y: padding + row * dotSpacing,
      });
    }
  }

  return (
    <div className="bg-muted/30 p-4 rounded-xl space-y-4">
      <p className="font-bold text-center text-primary">
        四角形のかき方 / How to Draw a Quadrilateral
      </p>

      <svg
        width={svgSize}
        height={svgSize}
        className="mx-auto bg-background rounded-xl border border-border"
      >
        {/* Grid dots */}
        {gridPoints.map((point, idx) => (
          <circle
            key={idx}
            cx={point.x}
            cy={point.y}
            r={2}
            fill="hsl(var(--muted-foreground))"
            opacity={0.2}
          />
        ))}

        {/* Show lines connecting points as steps progress */}
        {step >= 2 && (
          <line
            x1={examplePoints[0].x}
            y1={examplePoints[0].y}
            x2={examplePoints[1].x}
            y2={examplePoints[1].y}
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            strokeLinecap="round"
          />
        )}

        {step >= 3 && (
          <line
            x1={examplePoints[1].x}
            y1={examplePoints[1].y}
            x2={examplePoints[2].x}
            y2={examplePoints[2].y}
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            strokeLinecap="round"
          />
        )}

        {step >= 4 && (
          <line
            x1={examplePoints[2].x}
            y1={examplePoints[2].y}
            x2={examplePoints[3].x}
            y2={examplePoints[3].y}
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            strokeLinecap="round"
          />
        )}

        {step >= 5 && (
          <line
            x1={examplePoints[3].x}
            y1={examplePoints[3].y}
            x2={examplePoints[0].x}
            y2={examplePoints[0].y}
            stroke="hsl(var(--kid-green))"
            strokeWidth={3}
            strokeLinecap="round"
          />
        )}

        {/* Points with labels */}
        {examplePoints.map((point, idx) => (
          <g key={idx}>
            <circle
              cx={point.x}
              cy={point.y}
              r={step > idx ? 8 : 5}
              fill={step > idx ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
              opacity={step >= idx + 1 ? 1 : 0.3}
            />
            {step >= idx + 1 && (
              <text
                x={point.x}
                y={point.y - 12}
                textAnchor="middle"
                className="font-bold fill-foreground text-sm"
              >
                {point.label}
              </text>
            )}
          </g>
        ))}

        {/* Start point highlight */}
        {step >= 5 && (
          <text
            x={examplePoints[0].x}
            y={examplePoints[0].y + 20}
            textAnchor="middle"
            className="fill-kid-green font-bold text-xs"
          >
            スタートに戻る
          </text>
        )}
      </svg>

      {/* Step-by-step instructions */}
      <div className="space-y-2 text-sm">
        {step >= 0 && (
          <div className={`p-2 rounded-lg ${step === 0 ? 'bg-primary/20' : 'bg-primary/10'}`}>
            <p className="font-medium">① 1つ目の点を選ぶ / Select 1st point</p>
          </div>
        )}

        {step >= 1 && (
          <div className={`p-2 rounded-lg ${step === 1 ? 'bg-primary/20' : 'bg-primary/10'}`}>
            <p className="font-medium">② 2つ目の点を選ぶ / Select 2nd point</p>
            <p className="text-xs text-muted-foreground">線がひかれる / Line is drawn</p>
          </div>
        )}

        {step >= 2 && (
          <div className={`p-2 rounded-lg ${step === 2 ? 'bg-primary/20' : 'bg-primary/10'}`}>
            <p className="font-medium">③ 3つ目の点を選ぶ / Select 3rd point</p>
          </div>
        )}

        {step >= 3 && (
          <div className={`p-2 rounded-lg ${step === 3 ? 'bg-primary/20' : 'bg-primary/10'}`}>
            <p className="font-medium">④ 4つ目の点を選ぶ / Select 4th point</p>
          </div>
        )}

        {step >= 4 && (
          <div className={`p-2 rounded-lg ${step === 4 ? 'bg-kid-green/20' : 'bg-kid-green/10'}`}>
            <p className="font-medium">⑤ 最初の点をもう一度クリック！ / Click 1st point again!</p>
            <p className="text-xs text-muted-foreground">形を閉じる / Close the shape</p>
          </div>
        )}

        {step >= 5 && (
          <div className="bg-kid-green/20 p-3 rounded-lg">
            <p className="font-bold text-kid-green text-center">
              〇 完成！四角形ができた！
            </p>
            <p className="text-xs text-center text-muted-foreground">
              Complete! Quadrilateral formed!
            </p>
          </div>
        )}

        <div className="bg-muted p-3 rounded-lg mt-3">
          <p className="font-bold text-xs">ポイント / Key Points:</p>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground mt-1">
            <li>4つの点を選ぶ / Select 4 points</li>
            <li>最初の点に戻ってクリック / Click back on 1st point</li>
            <li>4辺で形を閉じる / Close shape with 4 sides</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuadrilateralExplanation;
