import { useState, useCallback } from 'react';
import { Undo, RotateCcw } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  col?: number;
  row?: number;
}

interface DottedPaperQuadrilateralProps {
  onComplete: () => void;
  graded: boolean;
  requiredType?: 'rectangle' | 'square' | 'trapezoid' | 'parallelogram' | 'rhombus' | 'kite' | 'any';
}

// Check if three points are collinear (on the same horizontal, vertical, or diagonal line)
const areCollinear = (p1: Point, p2: Point, p3: Point): boolean => {
  // Check horizontal
  if (p1.y === p2.y && p2.y === p3.y) return true;
  // Check vertical
  if (p1.x === p2.x && p2.x === p3.x) return true;
  // Check diagonal (45 degrees)
  const slope1 = (p2.y - p1.y) / (p2.x - p1.x);
  const slope2 = (p3.y - p2.y) / (p3.x - p2.x);
  if (Math.abs(slope1) === 1 && Math.abs(slope2) === 1 && slope1 === slope2) return true;
  return false;
};

// Calculate distance between two points
const getDistance = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

// Check if angle at vertex is 90 degrees (for rectangles)
const isRightAngle = (p1: Point, vertex: Point, p2: Point): boolean => {
  const vec1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const vec2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
  const dotProduct = vec1.x * vec2.x + vec1.y * vec2.y;
  return Math.abs(dotProduct) < 1; // Should be 0 for perpendicular vectors
};

// Check if two line segments are parallel
const areParallel = (p1: Point, p2: Point, p3: Point, p4: Point): boolean => {
  // Vector for first segment
  const vec1 = { x: p2.x - p1.x, y: p2.y - p1.y };
  // Vector for second segment
  const vec2 = { x: p4.x - p3.x, y: p4.y - p3.y };
  // Cross product should be 0 for parallel lines
  const crossProduct = vec1.x * vec2.y - vec1.y * vec2.x;
  return Math.abs(crossProduct) < 1;
};

// Validate quadrilateral type
const validateQuadrilateral = (vertices: Point[], type: 'rectangle' | 'square' | 'trapezoid' | 'parallelogram' | 'rhombus' | 'kite' | 'any'): { isValid: boolean; message: string } => {
  if (vertices.length !== 4) return { isValid: false, message: '4つの頂点が必要です / Need 4 vertices' };

  if (type === 'any') return { isValid: true, message: 'OK' };

  // Calculate side lengths
  const sides = [
    getDistance(vertices[0], vertices[1]),
    getDistance(vertices[1], vertices[2]),
    getDistance(vertices[2], vertices[3]),
    getDistance(vertices[3], vertices[0]),
  ];

  // Check if opposite sides are equal
  const oppositeSidesEqual =
    Math.abs(sides[0] - sides[2]) < 1 && Math.abs(sides[1] - sides[3]) < 1;

  // Check if all angles are 90 degrees
  const allRightAngles =
    isRightAngle(vertices[3], vertices[0], vertices[1]) &&
    isRightAngle(vertices[0], vertices[1], vertices[2]) &&
    isRightAngle(vertices[1], vertices[2], vertices[3]) &&
    isRightAngle(vertices[2], vertices[3], vertices[0]);

  // Check for parallel sides
  const side1ParallelToSide3 = areParallel(vertices[0], vertices[1], vertices[2], vertices[3]);
  const side2ParallelToSide4 = areParallel(vertices[1], vertices[2], vertices[3], vertices[0]);

  if (type === 'rectangle') {
    if (!allRightAngles) {
      return { isValid: false, message: '角が90度になっていません / Angles must be 90°' };
    }
    if (!oppositeSidesEqual) {
      return { isValid: false, message: '向かい合う辺の長さが違います / Opposite sides must be equal' };
    }
    // Rectangle should NOT have all sides equal (that would be a square)
    const allSidesEqual = sides.every((s) => Math.abs(s - sides[0]) < 1);
    if (allSidesEqual) {
      return { isValid: false, message: 'これは正方形です。たてとよこを違う長さにしてください / This is a square. Make width and height different' };
    }
    return { isValid: true, message: 'OK' };
  }

  if (type === 'square') {
    const allSidesEqual = sides.every((s) => Math.abs(s - sides[0]) < 1);
    if (!allRightAngles) {
      return { isValid: false, message: '角が90度になっていません / Angles must be 90°' };
    }
    if (!allSidesEqual) {
      return { isValid: false, message: '4つの辺の長さが同じである必要があります / All sides must be equal' };
    }
    return { isValid: true, message: 'OK' };
  }

  if (type === 'trapezoid') {
    // Trapezoid needs at least 1 pair of parallel sides
    if (!side1ParallelToSide3 && !side2ParallelToSide4) {
      return { isValid: false, message: '1組の平行な辺が必要です / Need 1 pair of parallel sides' };
    }
    return { isValid: true, message: 'OK' };
  }

  if (type === 'parallelogram') {
    // Parallelogram needs 2 pairs of parallel sides
    if (!side1ParallelToSide3 || !side2ParallelToSide4) {
      return { isValid: false, message: '2組の平行な辺が必要です / Need 2 pairs of parallel sides' };
    }
    if (!oppositeSidesEqual) {
      return { isValid: false, message: '向かい合う辺の長さが違います / Opposite sides must be equal' };
    }
    // Parallelogram should NOT have 90° angles (that would be a rectangle or square)
    // Check for square (all sides equal + right angles)
    const allSidesEqual = sides.every((s) => Math.abs(s - sides[0]) < 1);
    if (allSidesEqual && allRightAngles) {
      return { isValid: false, message: 'これは正方形です。90度にならないようにしてください / This is a square. Avoid 90° angles' };
    }
    // Check for rectangle (opposite sides equal + right angles)
    if (allRightAngles) {
      return { isValid: false, message: 'これは長方形です。90度にならないようにしてください / This is a rectangle. Avoid 90° angles' };
    }
    return { isValid: true, message: 'OK' };
  }

  if (type === 'rhombus') {
    // Rhombus needs 4 equal sides
    const allSidesEqual = sides.every((s) => Math.abs(s - sides[0]) < 1);
    if (!allSidesEqual) {
      return { isValid: false, message: '4つの辺の長さが同じである必要があります / All sides must be equal' };
    }
    // Rhombus should NOT have 90° angles (that would be a square)
    if (allRightAngles) {
      return { isValid: false, message: 'これは正方形です。90度にならないようにしてください / This is a square. Avoid 90° angles' };
    }
    return { isValid: true, message: 'OK' };
  }

  if (type === 'kite') {
    // Kite needs 2 pairs of adjacent equal sides
    // sides[0]=AB, sides[1]=BC, sides[2]=CD, sides[3]=DA
    // Check pattern: AB=AD and BC=CD (adjacent pairs)
    const pair1Equal = Math.abs(sides[0] - sides[3]) < 1; // AB = DA
    const pair2Equal = Math.abs(sides[1] - sides[2]) < 1; // BC = CD
    const isKitePattern1 = pair1Equal && pair2Equal;

    // Alternative pattern: AB=BC and CD=DA
    const pair3Equal = Math.abs(sides[0] - sides[1]) < 1; // AB = BC
    const pair4Equal = Math.abs(sides[2] - sides[3]) < 1; // CD = DA
    const isKitePattern2 = pair3Equal && pair4Equal;

    if (!isKitePattern1 && !isKitePattern2) {
      return { isValid: false, message: '隣り合う2組の辺が同じ長さである必要があります / Need 2 pairs of adjacent equal sides' };
    }
    return { isValid: true, message: 'OK' };
  }

  return { isValid: true, message: 'OK' };
};

const DottedPaperQuadrilateral = ({ onComplete, graded, requiredType = 'any' }: DottedPaperQuadrilateralProps) => {
  const [vertices, setVertices] = useState<Point[]>([]); // The 4 corner vertices
  const [allPoints, setAllPoints] = useState<Point[]>([]); // All clicked points including intermediate
  const [isClosed, setIsClosed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const gridSize = 12;
  const dotSpacing = 25;
  const padding = 30;
  const svgSize = gridSize * dotSpacing + padding * 2;

  // Generate grid points
  const gridPoints: Point[] = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      gridPoints.push({
        x: padding + col * dotSpacing,
        y: padding + row * dotSpacing,
        col,
        row,
      });
    }
  }

  const handleDotClick = useCallback((point: Point) => {
    if (graded || isComplete) return;

    setAllPoints((prevPoints) => {
      setVertices((prevVertices) => {
        // Check if clicking the first vertex to close the shape
        if (prevVertices.length === 4 && prevVertices[0].x === point.x && prevVertices[0].y === point.y) {
          // Validate the quadrilateral type
          const validation = validateQuadrilateral(prevVertices, requiredType);
          if (!validation.isValid) {
            setValidationError(validation.message);
            return prevVertices;
          }
          setValidationError(null);
          setIsClosed(true);
          setIsComplete(true);
          onComplete();
          return prevVertices;
        }

        // Don't allow clicking existing vertices (except first to close)
        const isExistingVertex = prevVertices.some((p, idx) =>
          idx > 0 && p.x === point.x && p.y === point.y
        );
        if (isExistingVertex) return prevVertices;

        // First point always becomes vertex 1
        if (prevVertices.length === 0) {
          return [point];
        }

        // Check if we can extend the current side
        if (prevVertices.length >= 1 && prevPoints.length >= 1) {
          const lastVertex = prevVertices[prevVertices.length - 1];
          const prevPoint = prevPoints[prevPoints.length - 1];

          // Check if new point is collinear with the last segment
          if (prevVertices.length >= 2) {
            const secondLastVertex = prevVertices[prevVertices.length - 2];
            if (areCollinear(secondLastVertex, lastVertex, point)) {
              // Extend the current side by replacing the last vertex
              const newVertices = [...prevVertices];
              newVertices[newVertices.length - 1] = point;
              return newVertices;
            }
          } else {
            // For the first side, check if extending from last vertex
            // Allow extension if it's in a straight line from previous points
            const isExtending = prevPoints.length >= 2 &&
              areCollinear(prevPoints[prevPoints.length - 2], prevPoints[prevPoints.length - 1], point);

            if (isExtending && prevVertices.length < 4) {
              // Replace last vertex with this new point (extending the side)
              const newVertices = [...prevVertices];
              newVertices[newVertices.length - 1] = point;
              return newVertices;
            }
          }
        }

        // Add new vertex (start a new side)
        if (prevVertices.length < 4) {
          return [...prevVertices, point];
        }

        return prevVertices;
      });

      // Add to all points for tracking the path
      if (!prevPoints.some((p) => p.x === point.x && p.y === point.y)) {
        return [...prevPoints, point];
      }
      return prevPoints;
    });
  }, [graded, isComplete, onComplete]);

  const handleUndo = useCallback(() => {
    if (graded) return;
    setAllPoints((prev) => {
      if (prev.length === 0) return prev;
      const newPoints = prev.slice(0, -1);

      // Recalculate vertices from remaining points
      const newVertices: Point[] = [];
      for (let i = 0; i < newPoints.length && newVertices.length < 4; i++) {
        const point = newPoints[i];
        if (newVertices.length === 0) {
          newVertices.push(point);
        } else {
          const lastVertex = newVertices[newVertices.length - 1];
          // Check if this point extends the current side
          if (newVertices.length >= 2) {
            const secondLastVertex = newVertices[newVertices.length - 2];
            if (areCollinear(secondLastVertex, lastVertex, point)) {
              newVertices[newVertices.length - 1] = point;
            } else {
              newVertices.push(point);
            }
          } else {
            // Check if extending first side
            const isExtending = newPoints.length >= 2 && i > 0 &&
              areCollinear(newPoints[i - 1], lastVertex, point);
            if (isExtending) {
              newVertices[newVertices.length - 1] = point;
            } else {
              newVertices.push(point);
            }
          }
        }
      }

      setVertices(newVertices);
      if (isComplete) {
        setIsComplete(false);
        setIsClosed(false);
      }
      return newPoints;
    });
  }, [graded, isComplete]);

  const handleReset = useCallback(() => {
    if (graded) return;
    setVertices([]);
    setAllPoints([]);
    setIsClosed(false);
    setIsComplete(false);
  }, [graded]);

  // Generate polyline points string
  const polylinePoints = allPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Check if a dot is part of the path
  const isDotInPath = (point: Point) =>
    allPoints.some((p) => p.x === point.x && p.y === point.y);

  // Check if this is the first vertex
  const isFirstVertex = (point: Point) =>
    vertices.length > 0 && vertices[0].x === point.x && vertices[0].y === point.y;

  // Check if this is a vertex (corner)
  const isVertex = (point: Point) =>
    vertices.some((p) => p.x === point.x && p.y === point.y);

  // Get vertex index (1-4)
  const getVertexIndex = (point: Point) => {
    const index = vertices.findIndex((p) => p.x === point.x && p.y === point.y);
    return index >= 0 ? index + 1 : null;
  };

  return (
    <div className="space-y-4">
      {/* SVG Canvas */}
      <svg
        width={svgSize}
        height={svgSize}
        className="mx-auto bg-background rounded-xl border-2 border-border touch-none"
        style={{ touchAction: 'none' }}
      >
        {/* Grid dots */}
        {gridPoints.map((point, idx) => {
          const inPath = isDotInPath(point);
          const isCorner = isVertex(point);
          const isFirst = isFirstVertex(point);
          const vertexIndex = getVertexIndex(point);
          const showCloseHint = vertices.length === 4 && isFirst && !isClosed;

          return (
            <g key={idx}>
              {/* Grid dot */}
              <circle
                cx={point.x}
                cy={point.y}
                r={inPath ? (isCorner ? 8 : 4) : 3}
                fill={inPath
                  ? (isCorner ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.5)')
                  : 'hsl(var(--muted-foreground))'}
                opacity={inPath ? 1 : 0.25}
                onClick={() => handleDotClick(point)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                style={{ pointerEvents: graded || isComplete ? 'none' : 'auto' }}
              />
              {/* Vertex number label */}
              {vertexIndex && (
                <text
                  x={point.x}
                  y={point.y - 16}
                  textAnchor="middle"
                  className="font-bold fill-primary text-base"
                >
                  {vertexIndex}
                </text>
              )}
              {/* Close shape hint */}
              {showCloseHint && (
                <>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={14}
                    fill="none"
                    stroke="hsl(var(--kid-green))"
                    strokeWidth={3}
                    strokeDasharray="4,4"
                    className="animate-pulse"
                  />
                  <text
                    x={point.x}
                    y={point.y + 28}
                    textAnchor="middle"
                    className="font-bold fill-kid-green text-xs"
                  >
                    クリックして閉じる
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Path line (shows the full path including extended sides) */}
        {allPoints.length > 1 && (
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Closing line when shape is closed */}
        {isClosed && vertices.length === 4 && (
          <line
            x1={vertices[3].x}
            y1={vertices[3].y}
            x2={vertices[0].x}
            y2={vertices[0].y}
            stroke="hsl(var(--kid-green))"
            strokeWidth={4}
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleUndo}
          disabled={allPoints.length === 0 || graded}
          className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground font-bold rounded-xl shadow-kid disabled:opacity-50 disabled:shadow-none hover:scale-105 active:scale-95 transition-transform"
        >
          <Undo className="w-4 h-4" />
          <span className="text-sm">やりなおす / Undo</span>
        </button>
        <button
          onClick={handleReset}
          disabled={allPoints.length === 0 || graded}
          className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground font-bold rounded-xl shadow-kid disabled:opacity-50 disabled:shadow-none hover:scale-105 active:scale-95 transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">リセット / Reset</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-muted/30 p-4 rounded-xl space-y-3">
        {/* Required type explanation */}
        {requiredType !== 'any' && (
          <div className="bg-primary/10 p-3 rounded-lg">
            <p className="font-bold text-center text-primary">
              {requiredType === 'rectangle' && '長方形をかこう！ / Draw a Rectangle!'}
              {requiredType === 'square' && '正方形をかこう！ / Draw a Square!'}
              {requiredType === 'trapezoid' && '台形をかこう！ / Draw a Trapezoid!'}
              {requiredType === 'parallelogram' && '平行四辺形をかこう！ / Draw a Parallelogram!'}
              {requiredType === 'rhombus' && 'ひし形をかこう！ / Draw a Rhombus!'}
              {requiredType === 'kite' && '凧形をかこう！ / Draw a Kite!'}
            </p>
            <p className="text-xs text-center text-muted-foreground mt-1">
              {requiredType === 'rectangle' && '4つの角が90度、向かい合う辺が同じ長さ / 4 right angles, opposite sides equal'}
              {requiredType === 'square' && '4つの角が90度、4つの辺が全部同じ長さ / 4 right angles, all sides equal'}
              {requiredType === 'trapezoid' && '1組の辺が平行 / 1 pair of parallel sides'}
              {requiredType === 'parallelogram' && '2組の辺が平行、向かい合う辺が同じ長さ / 2 pairs of parallel sides, opposite sides equal'}
              {requiredType === 'rhombus' && '4つの辺が全部同じ長さ / All 4 sides equal'}
              {requiredType === 'kite' && '隣り合う2組の辺が同じ長さ / 2 pairs of adjacent equal sides'}
            </p>
          </div>
        )}

        {!isComplete ? (
          <>
            <p className="font-medium text-center">
              {vertices.length === 0
                ? '点を選んで辺をひこう（まっすぐに複数の点を選ぶと長い辺になる）'
                : vertices.length < 4
                ? `頂点${vertices.length}を決めよう。まっすぐな線で長さを調整できます`
                : '最初の点（1）をクリックして形を閉じよう！'}
            </p>
            <p className="text-sm text-muted-foreground text-center">
              {vertices.length === 0
                ? 'Click dots to draw sides (click multiple in a line for longer sides)'
                : vertices.length < 4
                ? `Select points for vertex ${vertices.length}. Extend in a straight line to adjust length`
                : 'Click the first dot (1) again to close the shape!'}
            </p>
            {validationError && (
              <p className="text-destructive text-sm text-center font-medium">
                {validationError}
              </p>
            )}
          </>
        ) : (
          <p className="font-bold text-correct text-center">
            〇 かんせい！
            {requiredType === 'rectangle' ? '長方形' :
              requiredType === 'square' ? '正方形' :
              requiredType === 'trapezoid' ? '台形' :
              requiredType === 'parallelogram' ? '平行四辺形' :
              requiredType === 'rhombus' ? 'ひし形' :
              requiredType === 'kite' ? '凧形' : '四角形'}完成！
            <br />
            <span className="text-sm">
              Complete! {' '}
              {requiredType === 'rectangle' ? 'Rectangle' :
                requiredType === 'square' ? 'Square' :
                requiredType === 'trapezoid' ? 'Trapezoid' :
                requiredType === 'parallelogram' ? 'Parallelogram' :
                requiredType === 'rhombus' ? 'Rhombus' :
                requiredType === 'kite' ? 'Kite' : 'Quadrilateral'} drawn!
            </span>
          </p>
        )}
        <div className="flex justify-center gap-6 text-sm">
          <span className="font-medium">頂点: {vertices.length} / 4</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">選んだ点: {allPoints.length}個</span>
        </div>
      </div>
    </div>
  );
};

export default DottedPaperQuadrilateral;
