import { useState, useCallback, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface ParallelLinesDrawingProps {
  exerciseType: 1 | 2; // 1: through point A, 2: 2cm apart
  onAnswerSubmit: (isCorrect: boolean) => void;
  graded: boolean;
  isCorrect?: boolean;
}

const ParallelLinesDrawing = ({
  exerciseType,
  onAnswerSubmit,
  graded,
  isCorrect,
}: ParallelLinesDrawingProps) => {
  const [userLines, setUserLines] = useState<{ p1: Point; p2: Point }[]>([]);
  const [currentLine, setCurrentLine] = useState<{ p1: Point | null; p2: Point | null }>({
    p1: null,
    p2: null,
  });

  const gridSize = 14;
  const dotSpacing = 22;
  const padding = 30;
  const svgSize = gridSize * dotSpacing + padding * 2;

  // Reference line (line a) - fixed at an angle
  const refLine = useMemo(
    () => ({
      p1: { x: padding + 3 * dotSpacing, y: padding + 4 * dotSpacing },
      p2: { x: padding + 10 * dotSpacing, y: padding + 8 * dotSpacing },
    }),
    []
  );

  // Reference point A (for exercise type 1)
  const pointA = useMemo(
    () => ({ x: padding + 7 * dotSpacing, y: padding + 3 * dotSpacing }),
    []
  );

  // Calculate slope of reference line
  const refSlope = useMemo(() => {
    return (refLine.p2.y - refLine.p1.y) / (refLine.p2.x - refLine.p1.x);
  }, [refLine]);

  // Snap to nearest grid point
  const snapToGrid = useCallback(
    (x: number, y: number): Point => {
      const col = Math.round((x - padding) / dotSpacing);
      const row = Math.round((y - padding) / dotSpacing);
      return {
        x: padding + Math.max(0, Math.min(gridSize - 1, col)) * dotSpacing,
        y: padding + Math.max(0, Math.min(gridSize - 1, row)) * dotSpacing,
      };
    },
    []
  );

  const handleSvgClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (graded) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const snapped = snapToGrid(x, y);

      if (!currentLine.p1) {
        setCurrentLine({ p1: snapped, p2: null });
      } else if (!currentLine.p2) {
        const newLine = { p1: currentLine.p1, p2: snapped };

        if (exerciseType === 1) {
          // Exercise 1: Only one line needed
          setUserLines([newLine]);
          // Validate immediately
          const userSlope = (newLine.p2.y - newLine.p1.y) / (newLine.p2.x - newLine.p1.x);
          const slopeMatch = Math.abs(userSlope - refSlope) < 0.1;
          const passesThroughA =
            Math.abs(newLine.p1.x - pointA.x) < 5 && Math.abs(newLine.p1.y - pointA.y) < 5;
          onAnswerSubmit(slopeMatch && passesThroughA);
        } else {
          // Exercise 2: Two lines needed
          const newLines = [...userLines, newLine];
          if (newLines.length === 2) {
            setUserLines(newLines);
            // Validate: both parallel and 2 units apart
            const validations = newLines.map((line) => {
              const slope = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
              return Math.abs(slope - refSlope) < 0.1;
            });
            const bothParallel = validations.every((v) => v);

            // Check perpendicular distance (approximate for grid)
            const distance1 = calculatePerpendicularDistance(refLine, newLines[0].p1);
            const distance2 = calculatePerpendicularDistance(refLine, newLines[1].p1);
            const correctDistance1 = Math.abs(distance1 - 2 * dotSpacing) < 10;
            const correctDistance2 = Math.abs(distance2 - 2 * dotSpacing) < 10;

            onAnswerSubmit(bothParallel && correctDistance1 && correctDistance2);
          } else {
            setUserLines(newLines);
            setCurrentLine({ p1: null, p2: null });
          }
        }
      }
    },
    [currentLine, userLines, graded, exerciseType, refSlope, pointA, snapToGrid, onAnswerSubmit]
  );

  const calculatePerpendicularDistance = (line: { p1: Point; p2: Point }, point: Point) => {
    const numerator = Math.abs(
      (line.p2.y - line.p1.y) * point.x -
        (line.p2.x - line.p1.x) * point.y +
        line.p2.x * line.p1.y -
        line.p2.y * line.p1.x
    );
    const denominator = Math.sqrt(
      Math.pow(line.p2.y - line.p1.y, 2) + Math.pow(line.p2.x - line.p1.x, 2)
    );
    return numerator / denominator;
  };

  const handleReset = useCallback(() => {
    if (graded) return;
    setUserLines([]);
    setCurrentLine({ p1: null, p2: null });
  }, [graded]);

  // Generate grid points for visual reference
  const gridPoints: Point[] = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      gridPoints.push({
        x: padding + col * dotSpacing,
        y: padding + row * dotSpacing,
      });
    }
  }

  return (
    <div className="space-y-4">
      {/* SVG Canvas */}
      <svg
        width={svgSize}
        height={svgSize}
        onClick={handleSvgClick}
        className="mx-auto bg-background rounded-xl border-2 border-border touch-none cursor-crosshair"
        style={{ touchAction: 'none' }}
      >
        {/* Faint grid background */}
        {gridPoints.map((point, idx) => (
          <circle
            key={idx}
            cx={point.x}
            cy={point.y}
            r={2}
            fill="hsl(var(--muted-foreground))"
            opacity={0.15}
          />
        ))}

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
        <text
          x={refLine.p2.x + 8}
          y={refLine.p2.y}
          className="fill-primary font-bold"
          fontSize={14}
        >
          あ
        </text>

        {/* Point A (for exercise type 1) - with pulsing hint when waiting for first click */}
        {exerciseType === 1 && (
          <g>
            {/* Pulsing hint ring when no line being drawn */}
            {!currentLine.p1 && !graded && (
              <circle
                cx={pointA.x}
                cy={pointA.y}
                r={12}
                fill="none"
                stroke="hsl(var(--kid-orange))"
                strokeWidth={2}
                opacity={0.5}
              >
                <animate
                  attributeName="r"
                  values="10;16;10"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8;0.2;0.8"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <circle cx={pointA.x} cy={pointA.y} r={7} fill="hsl(var(--kid-orange))" stroke="white" strokeWidth={2} />
            <text
              x={pointA.x + 12}
              y={pointA.y - 12}
              className="fill-kid-orange font-black"
              fontSize={16}
            >
              A
            </text>
            {/* Click here hint */}
            {!currentLine.p1 && !graded && (
              <text
                x={pointA.x}
                y={pointA.y + 25}
                textAnchor="middle"
                className="fill-kid-orange font-bold"
                fontSize={11}
              >
                ここをクリック！
              </text>
            )}
          </g>
        )}

        {/* Distance indicator (for exercise type 2) */}
        {exerciseType === 2 && (
          <text
            x={padding + 2}
            y={padding + 10}
            className="fill-muted-foreground"
            fontSize={10}
          >
            2cm = 2マス / 2 grid units
          </text>
        )}

        {/* User drawn lines */}
        {userLines.map((line, idx) => (
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
            <text
              x={line.p2.x + 8}
              y={line.p2.y}
              className="fill-kid-green font-bold"
              fontSize={12}
            >
              {exerciseType === 2 ? String.fromCharCode(98 + idx) : 'あ\''}
            </text>
          </g>
        ))}

        {/* Current line being drawn */}
        {currentLine.p1 && !currentLine.p2 && (
          <>
            <circle
              cx={currentLine.p1.x}
              cy={currentLine.p1.y}
              r={6}
              fill="hsl(var(--kid-green))"
              opacity={0.7}
            />
            <text
              x={currentLine.p1.x}
              y={currentLine.p1.y - 12}
              textAnchor="middle"
              className="fill-kid-green font-bold text-xs"
            >
              クリックして終了 / Click to finish
            </text>
          </>
        )}
      </svg>

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleReset}
          disabled={userLines.length === 0 || graded}
          className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground font-bold rounded-xl shadow-kid disabled:opacity-50 disabled:shadow-none hover:scale-105 active:scale-95 transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">リセット / Reset</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-muted/30 p-4 rounded-xl space-y-2">
        {exerciseType === 1 ? (
          <>
            <p className="font-bold text-center text-primary">
              点Aをとおって、直線あに平行な線をひこう！
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Draw a line through point A parallel to line あ!
            </p>
          </>
        ) : (
          <>
            <p className="font-bold text-center text-primary">
              直線あから2cmはなれた平行線を2本ひこう！
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Draw 2 parallel lines 2cm away from line あ!
            </p>
          </>
        )}
        <div className="bg-kid-yellow/20 rounded-lg p-2 border border-kid-yellow/40">
          <p className="text-sm font-bold text-center text-foreground">
            ✏️ まず、点Aをクリック！→ 次に、点Aと同じ高さの右側をクリック！
          </p>
          <p className="text-xs text-muted-foreground text-center">
            First, click on point A! → Then, click to the right at the same height!
          </p>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          かくど: {userLines.length} / {exerciseType === 1 ? 1 : 2}本 drawn
        </p>
      </div>

      {/* Feedback */}
      {graded && (
        <div className={`p-3 rounded-lg ${isCorrect ? 'bg-correct/10' : 'bg-incorrect/10'}`}>
          {isCorrect ? (
            <p className="text-correct font-bold text-center">〇 せいかい！ / Correct!</p>
          ) : (
            <div className="text-center space-y-1">
              <p className="text-incorrect font-bold">× ざんねん / Incorrect</p>
              <p className="text-sm text-muted-foreground">
                {exerciseType === 1
                  ? '平行な線を点Aをとおってひいてください'
                  : '2cmはなれた平行線を2本ひいてください'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParallelLinesDrawing;
