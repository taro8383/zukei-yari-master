import { useState, useEffect } from 'react';

interface DiagonalsExplanationProps {
  sides: number;
  correctAnswer: number;
}

const DiagonalsExplanation = ({ sides, correctAnswer }: DiagonalsExplanationProps) => {
  const [step, setStep] = useState(0);
  const [showFormula, setShowFormula] = useState(false);

  const svgSize = 280;
  const center = svgSize / 2;
  const radius = 90;

  // Calculate polygon vertices
  const vertices: { x: number; y: number; label: string }[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    vertices.push({
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      label: String.fromCharCode(65 + i),
    });
  }

  // Generate all possible diagonals
  const allDiagonals: { from: number; to: number; color: string }[] = [];
  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--kid-orange))',
    'hsl(var(--kid-green))',
    'hsl(var(--kid-yellow))',
    'hsl(var(--kid-blue))',
  ];

  for (let i = 0; i < sides; i++) {
    for (let j = i + 2; j < sides; j++) {
      if (i === 0 && j === sides - 1) continue; // Skip closing edge
      allDiagonals.push({
        from: i,
        to: j,
        color: colors[i % colors.length],
      });
    }
  }

  // Animation: show diagonals from each vertex one by one
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= sides) {
          setShowFormula(true);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [sides]);

  // Get diagonals to show based on current step
  const visibleDiagonals = allDiagonals.filter((d) => d.from < step);

  // Count diagonals from each vertex
  const diagonalsPerVertex = sides - 3;

  return (
    <div className="bg-muted/30 p-4 rounded-xl space-y-4">
      <p className="font-bold text-center text-primary">
        対角線の数え方 / How to count diagonals
      </p>

      {/* Animated SVG */}
      <svg
        width={svgSize}
        height={svgSize}
        className="mx-auto bg-background rounded-xl border border-border"
      >
        {/* Polygon edges */}
        <polygon
          points={vertices.map((v) => `${v.x},${v.y}`).join(' ')}
          fill="none"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={2}
          opacity={0.5}
        />

        {/* Diagonals */}
        {visibleDiagonals.map((diag, idx) => (
          <line
            key={idx}
            x1={vertices[diag.from].x}
            y1={vertices[diag.from].y}
            x2={vertices[diag.to].x}
            y2={vertices[diag.to].y}
            stroke={diag.color}
            strokeWidth={2}
            opacity={0.7}
            strokeLinecap="round"
          />
        ))}

        {/* Current vertex highlight */}
        {step < sides && (
          <circle
            cx={vertices[step].x}
            cy={vertices[step].y}
            r={12}
            fill="hsl(var(--kid-green))"
            opacity={0.3}
          />
        )}

        {/* Vertices */}
        {vertices.map((v, i) => (
          <g key={i}>
            <circle cx={v.x} cy={v.y} r={6} fill="hsl(var(--primary))" />
            <text
              x={v.x}
              y={v.y - 12}
              textAnchor="middle"
              className="fill-foreground font-bold text-sm"
            >
              {v.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Step-by-step explanation */}
      <div className="space-y-2 text-sm">
        {step === 0 && (
          <p className="text-muted-foreground text-center">
            各頂点からひける対角線を数えます...<br />
            Counting diagonals from each vertex...
          </p>
        )}

        {step > 0 && step <= sides && (
          <div className="space-y-1">
            <p className="font-medium">
              頂点 {String.fromCharCode(64 + step)} から: {Math.min(step - 1, diagonalsPerVertex)}本
              {step > 1 && ` (${diagonalsPerVertex}本まで)`}
            </p>
            <p className="text-muted-foreground text-xs">
              From vertex {String.fromCharCode(64 + step)}: {Math.min(step - 1, diagonalsPerVertex)} diagonals
              {step > 1 && ` (max ${diagonalsPerVertex})`}
            </p>
          </div>
        )}

        {showFormula && (
          <div className="bg-primary/10 p-3 rounded-lg space-y-2">
            <p className="font-bold text-center">公式 / Formula</p>
            <div className="text-center space-y-1">
              <p className="font-mono text-lg">
                {sides} × ({sides} − 3) ÷ 2 = {correctAnswer}
              </p>
              <p className="text-xs text-muted-foreground">
                {sides} vertices × {sides - 3} diagonals each ÷ 2 (don't double count)
              </p>
            </div>

            <div className="text-xs space-y-1 pt-2 border-t border-border">
              <p>
                <strong>考え方 / Explanation:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>1つの頂点から {sides - 3} 本の対角線がひける</li>
                <li>自分自身と、となりの2点にはひけない</li>
                <li>全部で {sides} × {sides - 3} = {sides * (sides - 3)}</li>
                <li>2回数えているので ÷ 2 = {correctAnswer}本</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagonalsExplanation;
