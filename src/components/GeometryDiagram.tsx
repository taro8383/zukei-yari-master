import { DiagramData } from '@/lib/geometry';

interface GeometryDiagramProps {
  diagram: DiagramData;
}

const GeometryDiagram = ({ diagram }: GeometryDiagramProps) => {
  if (!diagram) return null;
  const { type, params } = diagram;

  return (
    <div className="flex justify-center my-4">
      <svg
        viewBox="0 0 280 200"
        className="w-full max-w-[280px] h-auto"
        style={{ minHeight: 160 }}
      >
        {renderDiagram(type, params)}
      </svg>
    </div>
  );
};

function renderDiagram(type: string, params: Record<string, number>) {
  switch (type) {
    case 'straight-line-angle':
      return <StraightLineAngle givenAngle={params.givenAngle} />;
    case 'triangle-angle':
      return <TriangleAngle angle1={params.angle1} angle2={params.angle2} />;
    case 'circle-angle':
      return <CircleAngle givenAngle={params.givenAngle} />;
    case 'rectangle-area':
      return <RectangleArea width={params.width} height={params.height} />;
    case 'square-area':
      return <SquareArea side={params.side} />;
    case 'perpendicular':
      return <Perpendicular />;
    case 'parallel-corresponding':
      return <ParallelCorresponding givenAngle={params.givenAngle} />;
    case 'parallel-supplementary':
      return <ParallelSupplementary givenAngle={params.givenAngle} />;
    default:
      return null;
  }
}

// Helper: draw an arc for angle indication
function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const startRad = (startDeg * Math.PI) / 180;
  const endRad = (endDeg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy - r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy - r * Math.sin(endRad);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 0 ${x2} ${y2}`;
}

// Small right-angle square marker
function RightAngleMarker({ cx, cy, size = 12, rotation = 0 }: { cx: number; cy: number; size?: number; rotation?: number }) {
  return (
    <rect
      x={cx}
      y={cy - size}
      width={size}
      height={size}
      fill="none"
      stroke="hsl(210, 70%, 50%)"
      strokeWidth={1.5}
      transform={`rotate(${rotation}, ${cx}, ${cy})`}
    />
  );
}

/* ===== ANGLE DIAGRAMS ===== */

function StraightLineAngle({ givenAngle }: { givenAngle: number }) {
  const cx = 140, cy = 140;
  const lineLen = 110;
  // Straight line along 0° and 180°
  const rad = (givenAngle * Math.PI) / 180;
  const armX = cx + lineLen * Math.cos(rad);
  const armY = cy - lineLen * Math.sin(rad);

  return (
    <g>
      {/* base line */}
      <line x1={cx - lineLen} y1={cy} x2={cx + lineLen} y2={cy} stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      {/* angled arm */}
      <line x1={cx} y1={cy} x2={armX} y2={armY} stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      {/* given angle arc */}
      <path d={arcPath(cx, cy, 30, 0, givenAngle)} fill="none" stroke="hsl(340, 70%, 55%)" strokeWidth={2} />
      <text x={cx + 38 * Math.cos((givenAngle / 2) * Math.PI / 180)} y={cy - 38 * Math.sin((givenAngle / 2) * Math.PI / 180)} textAnchor="middle" fontSize={13} fontWeight="bold" fill="hsl(340, 70%, 55%)">{givenAngle}°</text>
      {/* unknown angle arc */}
      <path d={arcPath(cx, cy, 22, givenAngle, 180)} fill="none" stroke="hsl(210, 70%, 50%)" strokeWidth={2} strokeDasharray="4 3" />
      <text x={cx - 36} y={cy - 12} textAnchor="middle" fontSize={14} fontWeight="bold" fill="hsl(210, 70%, 50%)">ア</text>
      {/* vertex dot */}
      <circle cx={cx} cy={cy} r={3} fill="hsl(220, 30%, 20%)" />
    </g>
  );
}

function TriangleAngle({ angle1, angle2 }: { angle1: number; angle2: number }) {
  // Build a triangle. Bottom-left = angle1, bottom-right = angle2, top = unknown
  const bx = 40, by = 165;
  const cx2 = 240, cy2 = 165;
  const baseLen = cx2 - bx;
  // top vertex using angles
  const rad1 = (angle1 * Math.PI) / 180;
  const rad2 = ((180 - angle2) * Math.PI) / 180;
  const t = baseLen / (Math.cos(rad1) - Math.cos(rad2));
  const topX = bx + t * Math.cos(rad1);
  const topY = by - t * Math.sin(rad1);

  return (
    <g>
      <polygon
        points={`${bx},${by} ${cx2},${cy2} ${topX},${topY}`}
        fill="hsl(210, 70%, 50%, 0.08)"
        stroke="hsl(220, 30%, 20%)"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {/* angle1 arc at bottom-left */}
      <path d={arcPath(bx, by, 28, 0, angle1)} fill="none" stroke="hsl(340, 70%, 55%)" strokeWidth={2} />
      <text x={bx + 40} y={by - 10} fontSize={12} fontWeight="bold" fill="hsl(340, 70%, 55%)">{angle1}°</text>
      {/* angle2 arc at bottom-right */}
      <path d={arcPath(cx2, cy2, 28, 180 - angle2, 180)} fill="none" stroke="hsl(340, 70%, 55%)" strokeWidth={2} />
      <text x={cx2 - 44} y={cy2 - 10} fontSize={12} fontWeight="bold" fill="hsl(340, 70%, 55%)">{angle2}°</text>
      {/* unknown angle at top */}
      {/* Compute angle directions at top vertex */}
      <text x={topX + 2} y={topY - 12} textAnchor="middle" fontSize={14} fontWeight="bold" fill="hsl(210, 70%, 50%)">ア</text>
    </g>
  );
}

function CircleAngle({ givenAngle }: { givenAngle: number }) {
  const cx = 140, cy = 100, r = 65;
  const rad = (givenAngle * Math.PI) / 180;
  const armX = cx + r * Math.cos(rad);
  const armY = cy - r * Math.sin(rad);

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(220, 30%, 20%)" strokeWidth={2} strokeDasharray="5 4" />
      {/* two radii */}
      <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      <line x1={cx} y1={cy} x2={armX} y2={armY} stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      {/* given angle arc */}
      <path d={arcPath(cx, cy, 25, 0, givenAngle)} fill="none" stroke="hsl(340, 70%, 55%)" strokeWidth={2} />
      <text x={cx + 38 * Math.cos((givenAngle / 2) * Math.PI / 180)} y={cy - 38 * Math.sin((givenAngle / 2) * Math.PI / 180) + 4} textAnchor="middle" fontSize={11} fontWeight="bold" fill="hsl(340, 70%, 55%)">{givenAngle}°</text>
      {/* unknown angle */}
      <path d={arcPath(cx, cy, 18, givenAngle, 360)} fill="none" stroke="hsl(210, 70%, 50%)" strokeWidth={2} strokeDasharray="4 3" />
      <text x={cx - 28} y={cy + 28} textAnchor="middle" fontSize={14} fontWeight="bold" fill="hsl(210, 70%, 50%)">ア</text>
      <circle cx={cx} cy={cy} r={3} fill="hsl(220, 30%, 20%)" />
    </g>
  );
}

/* ===== AREA DIAGRAMS ===== */

function RectangleArea({ width, height }: { width: number; height: number }) {
  const maxW = 200, maxH = 130;
  const scale = Math.min(maxW / width, maxH / height);
  const rw = width * scale, rh = height * scale;
  const rx = (280 - rw) / 2, ry = (180 - rh) / 2;

  return (
    <g>
      <rect x={rx} y={ry} width={rw} height={rh} fill="hsl(150, 50%, 45%, 0.1)" stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      {/* right angle markers */}
      <RightAngleMarker cx={rx} cy={ry + 12} size={10} />
      <RightAngleMarker cx={rx + rw - 10} cy={ry + 12} size={10} />
      {/* width label (bottom) */}
      <text x={rx + rw / 2} y={ry + rh + 20} textAnchor="middle" fontSize={14} fontWeight="bold" fill="hsl(220, 30%, 20%)">{width}cm</text>
      {/* height label (left) */}
      <text x={rx - 14} y={ry + rh / 2 + 5} textAnchor="middle" fontSize={14} fontWeight="bold" fill="hsl(220, 30%, 20%)" transform={`rotate(-90, ${rx - 14}, ${ry + rh / 2 + 5})`}>{height}cm</text>
      {/* dimension arrows */}
      <line x1={rx} y1={ry + rh + 10} x2={rx + rw} y2={ry + rh + 10} stroke="hsl(220, 30%, 20%)" strokeWidth={1.5} markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
      <line x1={rx - 8} y1={ry} x2={rx - 8} y2={ry + rh} stroke="hsl(220, 30%, 20%)" strokeWidth={1.5} markerStart="url(#arrowU)" markerEnd="url(#arrowD)" />
      <defs>
        <marker id="arrowR" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="hsl(220,30%,20%)" /></marker>
        <marker id="arrowL" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto"><path d="M6,0 L0,3 L6,6" fill="hsl(220,30%,20%)" /></marker>
        <marker id="arrowD" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto"><path d="M0,0 L3,6 L6,0" fill="hsl(220,30%,20%)" /></marker>
        <marker id="arrowU" markerWidth="6" markerHeight="6" refX="3" refY="1" orient="auto"><path d="M0,6 L3,0 L6,6" fill="hsl(220,30%,20%)" /></marker>
      </defs>
    </g>
  );
}

function SquareArea({ side }: { side: number }) {
  const maxS = 130;
  const s = maxS;
  const rx = (280 - s) / 2, ry = (180 - s) / 2;

  return (
    <g>
      <rect x={rx} y={ry} width={s} height={s} fill="hsl(45, 95%, 60%, 0.12)" stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      <RightAngleMarker cx={rx} cy={ry + 12} size={10} />
      {/* equal marks on sides */}
      <line x1={rx + s / 2 - 4} y1={ry + s + 3} x2={rx + s / 2 + 4} y2={ry + s + 3} stroke="hsl(340,70%,55%)" strokeWidth={2} />
      <line x1={rx + s / 2 - 4} y1={ry - 3} x2={rx + s / 2 + 4} y2={ry - 3} stroke="hsl(340,70%,55%)" strokeWidth={2} />
      <line x1={rx - 3} y1={ry + s / 2 - 4} x2={rx - 3} y2={ry + s / 2 + 4} stroke="hsl(340,70%,55%)" strokeWidth={2} />
      <line x1={rx + s + 3} y1={ry + s / 2 - 4} x2={rx + s + 3} y2={ry + s / 2 + 4} stroke="hsl(340,70%,55%)" strokeWidth={2} />
      {/* label */}
      <text x={rx + s / 2} y={ry + s + 22} textAnchor="middle" fontSize={14} fontWeight="bold" fill="hsl(220, 30%, 20%)">{side}cm</text>
      <line x1={rx} y1={ry + s + 12} x2={rx + s} y2={ry + s + 12} stroke="hsl(220, 30%, 20%)" strokeWidth={1.5} markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
      <defs>
        <marker id="arrowR" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="hsl(220,30%,20%)" /></marker>
        <marker id="arrowL" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto"><path d="M6,0 L0,3 L6,6" fill="hsl(220,30%,20%)" /></marker>
      </defs>
    </g>
  );
}

/* ===== LINE DIAGRAMS ===== */

function Perpendicular() {
  const cx = 140, cy = 100;
  return (
    <g>
      <line x1={40} y1={cy} x2={240} y2={cy} stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      <line x1={cx} y1={30} x2={cx} y2={170} stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      <RightAngleMarker cx={cx} cy={cy} size={14} rotation={0} />
      <text x={cx + 22} y={cy - 18} fontSize={15} fontWeight="bold" fill="hsl(210, 70%, 50%)">ア</text>
      <circle cx={cx} cy={cy} r={3} fill="hsl(220, 30%, 20%)" />
    </g>
  );
}

function ParallelCorresponding({ givenAngle }: { givenAngle: number }) {
  // Two horizontal parallel lines with a transversal
  const y1 = 50, y2 = 150;
  const rad = (givenAngle * Math.PI) / 180;
  // transversal crosses at x=140 on each line
  const dx = 80;

  return (
    <g>
      {/* parallel lines */}
      <line x1={20} y1={y1} x2={260} y2={y1} stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      <line x1={20} y1={y2} x2={260} y2={y2} stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      {/* parallel arrows */}
      <text x={260} y={y1 - 6} fontSize={11} fill="hsl(220,30%,20%)">あ</text>
      <text x={260} y={y2 - 6} fontSize={11} fill="hsl(220,30%,20%)">い</text>
      {/* transversal */}
      <line x1={140 - dx * Math.cos(rad) / Math.cos(rad)} y1={y1 - 30} x2={140 + dx * Math.cos(rad) / Math.cos(rad)} y2={y2 + 30} stroke="hsl(150, 50%, 45%)" strokeWidth={2} />
      {/* given angle at top intersection */}
      <path d={arcPath(140, y1, 22, 0, givenAngle)} fill="none" stroke="hsl(340, 70%, 55%)" strokeWidth={2} />
      <text x={140 + 32} y={y1 - 8} fontSize={12} fontWeight="bold" fill="hsl(340, 70%, 55%)">{givenAngle}°</text>
      {/* unknown angle at bottom intersection (corresponding = same) */}
      <path d={arcPath(140, y2, 22, 0, givenAngle)} fill="none" stroke="hsl(210, 70%, 50%)" strokeWidth={2} strokeDasharray="4 3" />
      <text x={140 + 32} y={y2 - 8} fontSize={14} fontWeight="bold" fill="hsl(210, 70%, 50%)">ア</text>
      {/* parallel markers */}
      <ParallelMarks x={30} y={(y1 + y2) / 2 - 20} />
      <ParallelMarks x={30} y={(y1 + y2) / 2 + 10} />
    </g>
  );
}

function ParallelSupplementary({ givenAngle }: { givenAngle: number }) {
  const y1 = 50, y2 = 150;

  return (
    <g>
      {/* parallel lines */}
      <line x1={20} y1={y1} x2={260} y2={y1} stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      <line x1={20} y1={y2} x2={260} y2={y2} stroke="hsl(220, 30%, 20%)" strokeWidth={2.5} />
      <text x={260} y={y1 - 6} fontSize={11} fill="hsl(220,30%,20%)">あ</text>
      <text x={260} y={y2 - 6} fontSize={11} fill="hsl(220,30%,20%)">い</text>
      {/* transversal */}
      <line x1={100} y1={y1 - 30} x2={180} y2={y2 + 30} stroke="hsl(150, 50%, 45%)" strokeWidth={2} />
      {/* given angle at top (right side of transversal) */}
      <path d={arcPath(120, y1, 22, 0, givenAngle)} fill="none" stroke="hsl(340, 70%, 55%)" strokeWidth={2} />
      <text x={120 + 32} y={y1 - 8} fontSize={12} fontWeight="bold" fill="hsl(340, 70%, 55%)">{givenAngle}°</text>
      {/* supplementary angle at bottom (left side) */}
      <path d={arcPath(160, y2, 22, givenAngle, 180)} fill="none" stroke="hsl(210, 70%, 50%)" strokeWidth={2} strokeDasharray="4 3" />
      <text x={160 - 38} y={y2 - 8} fontSize={14} fontWeight="bold" fill="hsl(210, 70%, 50%)">ア</text>
      <ParallelMarks x={30} y={(y1 + y2) / 2 - 20} />
      <ParallelMarks x={30} y={(y1 + y2) / 2 + 10} />
    </g>
  );
}

function ParallelMarks({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x + 6} y2={y + 10} stroke="hsl(340, 70%, 55%)" strokeWidth={1.5} />
      <line x1={x + 5} y1={y} x2={x + 11} y2={y + 10} stroke="hsl(340, 70%, 55%)" strokeWidth={1.5} />
    </g>
  );
}

export default GeometryDiagram;
