import { useState, useCallback, useMemo, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface Diagonal {
  from: number; // vertex index
  to: number; // vertex index
}

interface DiagonalsDrawingProps {
  shapeType: 'parallelogram' | 'trapezoid' | 'kite';
  onComplete: () => void;
  graded: boolean;
  // Props for restoring saved state in test mode
  savedDiagonals?: Diagonal[];
  savedIsComplete?: boolean;
  onStateChange?: (state: { diagonals: Diagonal[]; isComplete: boolean }) => void;
}

const DiagonalsDrawing = ({
  shapeType,
  onComplete,
  graded,
  savedDiagonals,
  savedIsComplete,
  onStateChange
}: DiagonalsDrawingProps) => {
  const [selectedVertex, setSelectedVertex] = useState<number | null>(null);
  const [diagonals, setDiagonals] = useState<Diagonal[]>(savedDiagonals || []);
  const [flashError, setFlashError] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(savedIsComplete || false);

  // Reset state when shapeType changes (new question)
  useEffect(() => {
    setSelectedVertex(null);
    setDiagonals(savedDiagonals || []);
    setFlashError(null);
    setIsComplete(savedIsComplete || false);
  }, [shapeType, savedDiagonals, savedIsComplete]);

  // Notify parent when state changes (for test mode persistence)
  useEffect(() => {
    if (onStateChange) {
      onStateChange({ diagonals, isComplete });
    }
  }, [diagonals, isComplete, onStateChange]);

  const svgWidth = 280;
  const svgHeight = 180;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;

  // Generate quadrilateral vertices based on shape type
  const vertices = useMemo((): Point[] => {
    switch (shapeType) {
      case 'parallelogram':
        return [
          { x: centerX - 60, y: centerY - 40 },
          { x: centerX + 80, y: centerY - 40 },
          { x: centerX + 60, y: centerY + 50 },
          { x: centerX - 80, y: centerY + 50 },
        ];
      case 'trapezoid':
        return [
          { x: centerX - 40, y: centerY - 50 },
          { x: centerX + 40, y: centerY - 50 },
          { x: centerX + 80, y: centerY + 50 },
          { x: centerX - 80, y: centerY + 50 },
        ];
      case 'kite':
        return [
          { x: centerX, y: centerY - 65 },
          { x: centerX + 55, y: centerY },
          { x: centerX, y: centerY + 65 },
          { x: centerX - 55, y: centerY },
        ];
      default:
        return [
          { x: centerX - 60, y: centerY - 40 },
          { x: centerX + 60, y: centerY - 40 },
          { x: centerX + 60, y: centerY + 40 },
          { x: centerX - 60, y: centerY + 40 },
        ];
    }
  }, [shapeType, centerX, centerY]);

  // Calculate which vertices are adjacent
  const getAdjacentVertices = useCallback((index: number): number[] => {
    const n = vertices.length;
    return [(index - 1 + n) % n, (index + 1) % n];
  }, [vertices.length]);

  // Check if two vertices are opposite (not adjacent)
  const areOpposite = useCallback((v1: number, v2: number): boolean => {
    const adjacent = getAdjacentVertices(v1);
    return !adjacent.includes(v2) && v1 !== v2;
  }, [getAdjacentVertices]);

  const handleVertexClick = useCallback(
    (index: number) => {
      if (graded || isComplete) return;

      if (selectedVertex === null) {
        // First vertex selected
        setSelectedVertex(index);
      } else if (selectedVertex === index) {
        // Deselect if clicking same vertex
        setSelectedVertex(null);
      } else {
        // Second vertex selected - check if opposite
        if (areOpposite(selectedVertex, index)) {
          // Check if this diagonal already exists
          const exists = diagonals.some(
            (d) =>
              (d.from === selectedVertex && d.to === index) ||
              (d.from === index && d.to === selectedVertex)
          );

          if (!exists) {
            const newDiagonals = [...diagonals, { from: selectedVertex, to: index }];
            setDiagonals(newDiagonals);

            // Check completion (2 diagonals for quadrilateral)
            if (newDiagonals.length === 2) {
              setIsComplete(true);
              onComplete();
            }
          }
          setSelectedVertex(null);
        } else {
          // Adjacent vertices - flash error
          setFlashError(index);
          setTimeout(() => setFlashError(null), 500);
          setSelectedVertex(null);
        }
      }
    },
    [selectedVertex, diagonals, graded, isComplete, areOpposite, onComplete]
  );

  const handleReset = useCallback(() => {
    if (graded) return;
    setDiagonals([]);
    setSelectedVertex(null);
    setIsComplete(false);
  }, [graded]);

  // Generate shape path
  const shapePath = useMemo(() => {
    return vertices.map((v, i) => `${i === 0 ? 'M' : 'L'} ${v.x} ${v.y}`).join(' ') + ' Z';
  }, [vertices]);

  return (
    <div>
      {/* SVG Canvas */}
      <svg
        width={svgWidth}
        height={svgHeight}
        className="mx-auto bg-muted/30 rounded-xl border-2 border-border touch-none"
        style={{ touchAction: 'none' }}
      >
        {/* Shape fill */}
        <path
          d={shapePath}
          fill="hsl(var(--primary) / 0.1)"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />

        {/* Diagonals */}
        {diagonals.map((diag, idx) => (
          <line
            key={idx}
            x1={vertices[diag.from].x}
            y1={vertices[diag.from].y}
            x2={vertices[diag.to].x}
            y2={vertices[diag.to].y}
            stroke="hsl(var(--kid-orange))"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.9}
          />
        ))}

        {/* Vertices (clickable) */}
        {vertices.map((v, idx) => {
          const isSelected = selectedVertex === idx;
          const isFlashing = flashError === idx;
          const isConnected = diagonals.some(
            (d) => d.from === idx || d.to === idx
          );

          return (
            <g key={idx}>
              {/* Invisible hit area */}
              <circle
                cx={v.x}
                cy={v.y}
                r={20}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => handleVertexClick(idx)}
                style={{ pointerEvents: graded || isComplete ? 'none' : 'auto' }}
              />
              {/* Visible vertex */}
              <circle
                cx={v.x}
                cy={v.y}
                r={isSelected ? 10 : 8}
                fill={
                  isFlashing
                    ? 'hsl(var(--destructive))'
                    : isSelected
                    ? 'hsl(var(--kid-green))'
                    : isConnected
                    ? 'hsl(var(--kid-orange))'
                    : 'hsl(var(--primary))'
                }
                opacity={isFlashing ? 0.5 : 1}
                className="transition-all duration-200 pointer-events-none"
              />
              {/* Vertex label */}
              <text
                x={v.x}
                y={v.y - 16}
                textAnchor="middle"
                className="font-bold fill-foreground"
              >
                {String.fromCharCode(65 + idx)}
              </text>
            </g>
          );
        })}

        {/* Instructions overlay */}
        {selectedVertex !== null && (
          <text
            x={centerX}
            y={svgHeight - 10}
            textAnchor="middle"
            className="fill-muted-foreground text-xs"
          >
            向かい合う頂点を選んでください / Select opposite vertex
          </text>
        )}
      </svg>

      {/* Controls */}
      <div className="flex gap-2 justify-center mt-4">
        <button
          onClick={handleReset}
          disabled={diagonals.length === 0 || graded}
          className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground font-bold rounded-xl shadow-kid disabled:opacity-50 disabled:shadow-none hover:scale-105 active:scale-95 transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">リセット / Reset</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-muted/30 p-4 rounded-xl space-y-2 mt-4">
        {!isComplete ? (
          <>
            <p className="font-medium text-center">
              向かい合う頂点をクリックして対角線をひこう！
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Click opposite vertices to draw diagonals!
            </p>
            <p className="text-xs text-muted-foreground text-center">
              となり合う頂点は選べません / Cannot select adjacent vertices
            </p>
          </>
        ) : (
          <p className="font-bold text-correct text-center">
            〇 かんせい！ / Complete!
          </p>
        )}
        <p className="text-xs text-muted-foreground text-center">
          対角線: {diagonals.length} / 2 本
        </p>
      </div>
    </div>
  );
};

export default DiagonalsDrawing;
