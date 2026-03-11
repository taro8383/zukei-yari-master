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
        viewBox="-20 -20 320 240"
        className="w-full max-w-[320px] h-auto"
        style={{ minHeight: 180, overflow: 'visible' }}
      >
        {renderDiagram(type, params)}
      </svg>
    </div>
  );
};

function renderDiagram(type: string, params: Record<string, number>) {
  switch (type) {
    case 'straight-line-angle':
      return <StraightLineAngle givenAngle={params.givenAngle} rotation={params.rotation || 0} />;
    case 'triangle-angle':
      return <TriangleAngle angle1={params.angle1} angle2={params.angle2} rotation={params.rotation || 0} />;
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
    case 'intersecting-lines':
      return <IntersectingLines givenAngle={params.givenAngle} rotation={params.rotation} askType={params.askType} />;
    case 'parallelogram-angle':
      return <ParallelogramAngle givenAngle={params.givenAngle} />;
    case 'trapezoid-angle':
      return <TrapezoidAngle angle1={params.angle1} />;
    case 'rhombus-perimeter':
      return <RhombusPerimeter side={params.side} />;
    case 'polygon-diagonals':
      return <PolygonDiagonals sides={params.sides} />;
    case 'count-right-angles':
      return <CountRightAngles count={params.count} />;
    default:
      return null;
  }
}

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

function RightAngleMarker({ cx, cy, size = 12, rotation = 0 }: { cx: number; cy: number; size?: number; rotation?: number }) {
  return (
    <rect
      x={cx} y={cy - size} width={size} height={size}
      fill="none" stroke="hsl(210, 70%, 50%)" strokeWidth={1.5}
      transform={`rotate(${rotation}, ${cx}, ${cy})`}
    />
  );
}

const STROKE = "hsl(220, 30%, 20%)";
const PINK = "hsl(340, 70%, 55%)";
const BLUE = "hsl(210, 70%, 50%)";
const FILL_LIGHT = "hsl(210, 70%, 50%, 0.08)";

/* ===== ANGLE DIAGRAMS ===== */

function StraightLineAngle({ givenAngle, rotation }: { givenAngle: number; rotation: number }) {
  const cx = 140, cy = 120;
  const lineLen = 100;
  const rad = (givenAngle * Math.PI) / 180;
  const armX = cx + lineLen * Math.cos(rad);
  const armY = cy - lineLen * Math.sin(rad);

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      <line x1={cx - lineLen} y1={cy} x2={cx + lineLen} y2={cy} stroke={STROKE} strokeWidth={2.5} />
      <line x1={cx} y1={cy} x2={armX} y2={armY} stroke={STROKE} strokeWidth={2.5} />
      <path d={arcPath(cx, cy, 30, 0, givenAngle)} fill="none" stroke={PINK} strokeWidth={2} />
      <text x={cx + 42 * Math.cos((givenAngle / 2) * Math.PI / 180)} y={cy - 42 * Math.sin((givenAngle / 2) * Math.PI / 180)} textAnchor="middle" fontSize={12} fontWeight="bold" fill={PINK}>{givenAngle}°</text>
      <path d={arcPath(cx, cy, 22, givenAngle, 180)} fill="none" stroke={BLUE} strokeWidth={2} strokeDasharray="4 3" />
      <text x={cx - 32} y={cy - 10} textAnchor="middle" fontSize={14} fontWeight="bold" fill={BLUE}>ア</text>
      <circle cx={cx} cy={cy} r={3} fill={STROKE} />
    </g>
  );
}

function TriangleAngle({ angle1, angle2, rotation }: { angle1: number; angle2: number; rotation: number }) {
  const bx = 50, by = 155;
  const cx2 = 230, cy2 = 155;
  const baseLen = cx2 - bx;
  const rad1 = (angle1 * Math.PI) / 180;
  const rad2 = ((180 - angle2) * Math.PI) / 180;
  const t = baseLen / (Math.cos(rad1) - Math.cos(rad2));
  const topX = bx + t * Math.cos(rad1);
  const topY = by - t * Math.sin(rad1);
  const centerX = (bx + cx2 + topX) / 3;
  const centerY = (by + cy2 + topY) / 3;

  return (
    <g transform={`rotate(${rotation}, ${centerX}, ${centerY})`}>
      <polygon
        points={`${bx},${by} ${cx2},${cy2} ${topX},${topY}`}
        fill={FILL_LIGHT} stroke={STROKE} strokeWidth={2.5} strokeLinejoin="round"
      />
      <path d={arcPath(bx, by, 28, 0, angle1)} fill="none" stroke={PINK} strokeWidth={2} />
      <text x={bx + 42} y={by - 8} fontSize={11} fontWeight="bold" fill={PINK}>{angle1}°</text>
      <path d={arcPath(cx2, cy2, 28, 180 - angle2, 180)} fill="none" stroke={PINK} strokeWidth={2} />
      <text x={cx2 - 42} y={cy2 - 8} fontSize={11} fontWeight="bold" fill={PINK}>{angle2}°</text>
      <text x={topX + 2} y={topY - 10} textAnchor="middle" fontSize={14} fontWeight="bold" fill={BLUE}>ア</text>
    </g>
  );
}

function CircleAngle({ givenAngle }: { givenAngle: number }) {
  const cx = 140, cy = 100, r = 60;
  const rad = (givenAngle * Math.PI) / 180;
  const armX = cx + r * Math.cos(rad);
  const armY = cy - r * Math.sin(rad);

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={STROKE} strokeWidth={2} strokeDasharray="5 4" />
      <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke={STROKE} strokeWidth={2.5} />
      <line x1={cx} y1={cy} x2={armX} y2={armY} stroke={STROKE} strokeWidth={2.5} />
      <path d={arcPath(cx, cy, 25, 0, givenAngle)} fill="none" stroke={PINK} strokeWidth={2} />
      <text x={cx + 38 * Math.cos((givenAngle / 2) * Math.PI / 180)} y={cy - 38 * Math.sin((givenAngle / 2) * Math.PI / 180) + 4} textAnchor="middle" fontSize={11} fontWeight="bold" fill={PINK}>{givenAngle}°</text>
      <path d={arcPath(cx, cy, 18, givenAngle, 360)} fill="none" stroke={BLUE} strokeWidth={2} strokeDasharray="4 3" />
      <text x={cx - 28} y={cy + 28} textAnchor="middle" fontSize={14} fontWeight="bold" fill={BLUE}>ア</text>
      <circle cx={cx} cy={cy} r={3} fill={STROKE} />
    </g>
  );
}

/* ===== AREA DIAGRAMS ===== */

function ArrowDefs() {
  return (
    <defs>
      <marker id="arrowR" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill={STROKE} /></marker>
      <marker id="arrowL" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto"><path d="M6,0 L0,3 L6,6" fill={STROKE} /></marker>
      <marker id="arrowD" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto"><path d="M0,0 L3,6 L6,0" fill={STROKE} /></marker>
      <marker id="arrowU" markerWidth="6" markerHeight="6" refX="3" refY="1" orient="auto"><path d="M0,6 L3,0 L6,6" fill={STROKE} /></marker>
    </defs>
  );
}

function RectangleArea({ width, height }: { width: number; height: number }) {
  const maxW = 180, maxH = 120;
  const scale = Math.min(maxW / width, maxH / height);
  const rw = width * scale, rh = height * scale;
  const rx = (280 - rw) / 2, ry = (180 - rh) / 2;

  return (
    <g>
      <ArrowDefs />
      <rect x={rx} y={ry} width={rw} height={rh} fill="hsl(150, 50%, 45%, 0.1)" stroke={STROKE} strokeWidth={2.5} />
      <RightAngleMarker cx={rx} cy={ry + 12} size={10} />
      <text x={rx + rw / 2} y={ry + rh + 22} textAnchor="middle" fontSize={14} fontWeight="bold" fill={STROKE}>{width}cm</text>
      <text x={rx - 16} y={ry + rh / 2 + 5} textAnchor="middle" fontSize={14} fontWeight="bold" fill={STROKE} transform={`rotate(-90, ${rx - 16}, ${ry + rh / 2 + 5})`}>{height}cm</text>
      <line x1={rx} y1={ry + rh + 12} x2={rx + rw} y2={ry + rh + 12} stroke={STROKE} strokeWidth={1.5} markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
      <line x1={rx - 10} y1={ry} x2={rx - 10} y2={ry + rh} stroke={STROKE} strokeWidth={1.5} markerStart="url(#arrowU)" markerEnd="url(#arrowD)" />
    </g>
  );
}

function SquareArea({ side }: { side: number }) {
  const s = 120;
  const rx = (280 - s) / 2, ry = (180 - s) / 2;

  return (
    <g>
      <ArrowDefs />
      <rect x={rx} y={ry} width={s} height={s} fill="hsl(45, 95%, 60%, 0.12)" stroke={STROKE} strokeWidth={2.5} />
      <RightAngleMarker cx={rx} cy={ry + 12} size={10} />
      {/* equal marks */}
      {[
        [rx + s / 2, ry + s + 3, true],
        [rx + s / 2, ry - 3, true],
        [rx - 3, ry + s / 2, false],
        [rx + s + 3, ry + s / 2, false],
      ].map(([x, y, horiz], i) => (
        <line key={i} x1={(x as number) - (horiz ? 4 : 0)} y1={(y as number) - (horiz ? 0 : 4)} x2={(x as number) + (horiz ? 4 : 0)} y2={(y as number) + (horiz ? 0 : 4)} stroke={PINK} strokeWidth={2} />
      ))}
      <text x={rx + s / 2} y={ry + s + 24} textAnchor="middle" fontSize={14} fontWeight="bold" fill={STROKE}>{side}cm</text>
      <line x1={rx} y1={ry + s + 14} x2={rx + s} y2={ry + s + 14} stroke={STROKE} strokeWidth={1.5} markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
    </g>
  );
}

/* ===== LINE DIAGRAMS ===== */

function Perpendicular() {
  const cx = 140, cy = 100;
  return (
    <g>
      <line x1={40} y1={cy} x2={240} y2={cy} stroke={STROKE} strokeWidth={2.5} />
      <line x1={cx} y1={20} x2={cx} y2={180} stroke={STROKE} strokeWidth={2.5} />
      <RightAngleMarker cx={cx} cy={cy} size={14} rotation={0} />
      <text x={cx + 22} y={cy - 18} fontSize={15} fontWeight="bold" fill={BLUE}>ア</text>
      <circle cx={cx} cy={cy} r={3} fill={STROKE} />
    </g>
  );
}

function ParallelMarks({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x + 6} y2={y + 10} stroke={PINK} strokeWidth={1.5} />
      <line x1={x + 5} y1={y} x2={x + 11} y2={y + 10} stroke={PINK} strokeWidth={1.5} />
    </g>
  );
}

function ParallelCorresponding({ givenAngle }: { givenAngle: number }) {
  const y1 = 50, y2 = 150;
  return (
    <g>
      <line x1={20} y1={y1} x2={260} y2={y1} stroke={STROKE} strokeWidth={2.5} />
      <line x1={20} y1={y2} x2={260} y2={y2} stroke={STROKE} strokeWidth={2.5} />
      <text x={264} y={y1 - 6} fontSize={11} fill={STROKE}>あ</text>
      <text x={264} y={y2 - 6} fontSize={11} fill={STROKE}>い</text>
      <line x1={100} y1={y1 - 30} x2={180} y2={y2 + 30} stroke="hsl(150, 50%, 45%)" strokeWidth={2} />
      <path d={arcPath(140, y1, 22, 0, givenAngle)} fill="none" stroke={PINK} strokeWidth={2} />
      <text x={140 + 32} y={y1 - 8} fontSize={12} fontWeight="bold" fill={PINK}>{givenAngle}°</text>
      <path d={arcPath(140, y2, 22, 0, givenAngle)} fill="none" stroke={BLUE} strokeWidth={2} strokeDasharray="4 3" />
      <text x={140 + 32} y={y2 - 8} fontSize={14} fontWeight="bold" fill={BLUE}>ア</text>
      <ParallelMarks x={30} y={(y1 + y2) / 2 - 20} />
      <ParallelMarks x={30} y={(y1 + y2) / 2 + 10} />
    </g>
  );
}

function ParallelSupplementary({ givenAngle }: { givenAngle: number }) {
  const y1 = 50, y2 = 150;
  return (
    <g>
      <line x1={20} y1={y1} x2={260} y2={y1} stroke={STROKE} strokeWidth={2.5} />
      <line x1={20} y1={y2} x2={260} y2={y2} stroke={STROKE} strokeWidth={2.5} />
      <text x={264} y={y1 - 6} fontSize={11} fill={STROKE}>あ</text>
      <text x={264} y={y2 - 6} fontSize={11} fill={STROKE}>い</text>
      <line x1={100} y1={y1 - 30} x2={180} y2={y2 + 30} stroke="hsl(150, 50%, 45%)" strokeWidth={2} />
      <path d={arcPath(120, y1, 22, 0, givenAngle)} fill="none" stroke={PINK} strokeWidth={2} />
      <text x={120 + 32} y={y1 - 8} fontSize={12} fontWeight="bold" fill={PINK}>{givenAngle}°</text>
      <path d={arcPath(160, y2, 22, givenAngle, 180)} fill="none" stroke={BLUE} strokeWidth={2} strokeDasharray="4 3" />
      <text x={160 - 38} y={y2 - 8} fontSize={14} fontWeight="bold" fill={BLUE}>ア</text>
      <ParallelMarks x={30} y={(y1 + y2) / 2 - 20} />
      <ParallelMarks x={30} y={(y1 + y2) / 2 + 10} />
    </g>
  );
}

/* ===== NEW: INTERSECTING LINES ===== */

function IntersectingLines({ givenAngle, rotation, askType }: { givenAngle: number; rotation: number; askType: number }) {
  const cx = 140, cy = 100;
  const len = 100;
  const rad = (givenAngle * Math.PI) / 180;

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      {/* Line 1: horizontal */}
      <line x1={cx - len} y1={cy} x2={cx + len} y2={cy} stroke={STROKE} strokeWidth={2.5} />
      {/* Line 2: at givenAngle */}
      <line x1={cx - len * Math.cos(rad)} y1={cy + len * Math.sin(rad)} x2={cx + len * Math.cos(rad)} y2={cy - len * Math.sin(rad)} stroke={STROKE} strokeWidth={2.5} />
      {/* Angle A - given */}
      <path d={arcPath(cx, cy, 28, 0, givenAngle)} fill="none" stroke={PINK} strokeWidth={2} />
      <text x={cx + 40 * Math.cos((givenAngle / 2) * Math.PI / 180)} y={cy - 40 * Math.sin((givenAngle / 2) * Math.PI / 180)} textAnchor="middle" fontSize={11} fontWeight="bold" fill={PINK}>A={givenAngle}°</text>
      {/* Angle B - adjacent (if askType=1) */}
      {askType === 1 ? (
        <>
          <path d={arcPath(cx, cy, 22, givenAngle, 180)} fill="none" stroke={BLUE} strokeWidth={2} strokeDasharray="4 3" />
          <text x={cx - 34} y={cy - 14} textAnchor="middle" fontSize={13} fontWeight="bold" fill={BLUE}>B=?</text>
        </>
      ) : (
        <>
          {/* Angle C - vertical (opposite) */}
          <path d={arcPath(cx, cy, 22, 180, 180 + givenAngle)} fill="none" stroke={BLUE} strokeWidth={2} strokeDasharray="4 3" />
          <text x={cx - 40 * Math.cos((givenAngle / 2) * Math.PI / 180)} y={cy + 40 * Math.sin((givenAngle / 2) * Math.PI / 180) + 6} textAnchor="middle" fontSize={13} fontWeight="bold" fill={BLUE}>C=?</text>
        </>
      )}
      <circle cx={cx} cy={cy} r={3} fill={STROKE} />
    </g>
  );
}

/* ===== NEW: QUADRILATERAL DIAGRAMS ===== */

function ParallelogramAngle({ givenAngle }: { givenAngle: number }) {
  const cx = 140, cy = 100;
  const w = 120, h = 70;
  const skew = 30;
  // Four corners
  const pts = [
    [cx - w / 2 + skew, cy - h / 2],
    [cx + w / 2 + skew, cy - h / 2],
    [cx + w / 2 - skew, cy + h / 2],
    [cx - w / 2 - skew, cy + h / 2],
  ];

  return (
    <g>
      <polygon points={pts.map(p => p.join(',')).join(' ')} fill={FILL_LIGHT} stroke={STROKE} strokeWidth={2.5} strokeLinejoin="round" />
      {/* Given angle at bottom-left */}
      <path d={arcPath(pts[3][0], pts[3][1], 22, 0, givenAngle > 90 ? givenAngle - 90 + 45 : 45)} fill="none" stroke={PINK} strokeWidth={2} />
      <text x={pts[3][0] + 30} y={pts[3][1] - 4} fontSize={12} fontWeight="bold" fill={PINK}>{givenAngle}°</text>
      {/* Unknown adjacent angle */}
      <text x={pts[2][0] - 30} y={pts[2][1] - 4} fontSize={14} fontWeight="bold" fill={BLUE}>?°</text>
      {/* Parallel marks */}
      <ParallelMarks x={(pts[0][0] + pts[1][0]) / 2 - 5} y={(pts[0][1] + pts[1][1]) / 2 - 5} />
      <ParallelMarks x={(pts[2][0] + pts[3][0]) / 2 - 5} y={(pts[2][1] + pts[3][1]) / 2 - 5} />
    </g>
  );
}

function TrapezoidAngle({ angle1 }: { angle1: number }) {
  const cx = 140, cy = 100;
  const topW = 80, botW = 160, h = 80;
  const pts = [
    [cx - topW / 2, cy - h / 2],
    [cx + topW / 2, cy - h / 2],
    [cx + botW / 2, cy + h / 2],
    [cx - botW / 2, cy + h / 2],
  ];

  return (
    <g>
      <polygon points={pts.map(p => p.join(',')).join(' ')} fill={FILL_LIGHT} stroke={STROKE} strokeWidth={2.5} strokeLinejoin="round" />
      {/* Angle A at bottom-left */}
      <text x={pts[3][0] + 24} y={pts[3][1] - 8} fontSize={12} fontWeight="bold" fill={PINK}>A={angle1}°</text>
      {/* Angle B at bottom-right */}
      <text x={pts[2][0] - 38} y={pts[2][1] - 8} fontSize={14} fontWeight="bold" fill={BLUE}>B=?</text>
      {/* Parallel marks on top and bottom */}
      <text x={264} y={cy - h / 2 - 4} fontSize={10} fill={STROKE}>あ</text>
      <text x={264} y={cy + h / 2 - 4} fontSize={10} fill={STROKE}>い</text>
      <ParallelMarks x={(pts[0][0] + pts[1][0]) / 2 - 5} y={pts[0][1] - 8} />
      <ParallelMarks x={(pts[2][0] + pts[3][0]) / 2 - 5} y={pts[2][1] + 2} />
    </g>
  );
}

function RhombusPerimeter({ side }: { side: number }) {
  const cx = 140, cy = 100;
  const s = 65;
  // Diamond shape (rotated square)
  const pts = [
    [cx, cy - s],
    [cx + s, cy],
    [cx, cy + s],
    [cx - s, cy],
  ];

  return (
    <g>
      <polygon points={pts.map(p => p.join(',')).join(' ')} fill="hsl(45, 95%, 60%, 0.12)" stroke={STROKE} strokeWidth={2.5} strokeLinejoin="round" />
      {/* Equal marks on all sides */}
      {[[0, 1], [1, 2], [2, 3], [3, 0]].map(([a, b], i) => {
        const mx = (pts[a][0] + pts[b][0]) / 2;
        const my = (pts[a][1] + pts[b][1]) / 2;
        return <line key={i} x1={mx - 3} y1={my - 3} x2={mx + 3} y2={my + 3} stroke={PINK} strokeWidth={2} />;
      })}
      {/* Side label */}
      <text x={cx + s / 2 + 14} y={cy - s / 2 - 2} fontSize={13} fontWeight="bold" fill={STROKE}>{side}cm</text>
    </g>
  );
}

/* ===== NEW: POLYGON DIAGONALS ===== */

function PolygonDiagonals({ sides }: { sides: number }) {
  const cx = 140, cy = 100, r = 70;
  const pts: [number, number][] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
    pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }

  return (
    <g>
      {/* Polygon outline */}
      <polygon points={pts.map(p => p.join(',')).join(' ')} fill={FILL_LIGHT} stroke={STROKE} strokeWidth={2.5} strokeLinejoin="round" />
      {/* Vertices */}
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={4} fill={PINK} />
      ))}
      {/* Vertex labels */}
      {pts.map((p, i) => {
        const labelAngle = (2 * Math.PI * i) / sides - Math.PI / 2;
        const lx = cx + (r + 16) * Math.cos(labelAngle);
        const ly = cy + (r + 16) * Math.sin(labelAngle);
        return <text key={i} x={lx} y={ly + 4} textAnchor="middle" fontSize={11} fontWeight="bold" fill={STROKE}>{String.fromCharCode(65 + i)}</text>;
      })}
      {/* Question mark for diagonals */}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize={16} fontWeight="bold" fill={BLUE}>?本</text>
    </g>
  );
}

/* ===== COUNT RIGHT ANGLES ===== */

function CountRightAngles({ count }: { count: number }) {
  // Create a shape with the specified number of right angles
  // We'll use combinations of rectangles and L-shapes
  const cx = 140, cy = 100;

  if (count === 2) {
    // Two right angles: An L-shape
    const pts = [
      [cx - 60, cy - 60],
      [cx + 20, cy - 60],
      [cx + 20, cy + 20],
      [cx + 60, cy + 20],
      [cx + 60, cy + 60],
      [cx - 60, cy + 60],
    ];
    return (
      <g>
        <polygon points={pts.map(p => p.join(',')).join(' ')} fill={FILL_LIGHT} stroke={STROKE} strokeWidth={2.5} strokeLinejoin="round" />
        {/* Right angle markers */}
        <RightAngleMarker cx={cx - 60} cy={cy - 60} size={14} rotation={0} />
        <RightAngleMarker cx={cx + 60} cy={cy + 60} size={14} rotation={180} />
      </g>
    );
  } else if (count === 3) {
    // Three right angles: A rectangle with one corner extended
    const pts = [
      [cx - 50, cy - 50],
      [cx + 50, cy - 50],
      [cx + 50, cy],
      [cx + 80, cy],
      [cx + 80, cy + 50],
      [cx - 50, cy + 50],
    ];
    return (
      <g>
        <polygon points={pts.map(p => p.join(',')).join(' ')} fill={FILL_LIGHT} stroke={STROKE} strokeWidth={2.5} strokeLinejoin="round" />
        {/* Right angle markers */}
        <RightAngleMarker cx={cx - 50} cy={cy - 50} size={14} rotation={0} />
        <RightAngleMarker cx={cx + 50} cy={cy - 50} size={14} rotation={90} />
        <RightAngleMarker cx={cx - 50} cy={cy + 50} size={14} rotation={270} />
      </g>
    );
  } else {
    // Four right angles: A rectangle
    const w = 100, h = 70;
    return (
      <g>
        <rect x={cx - w/2} y={cy - h/2} width={w} height={h} fill={FILL_LIGHT} stroke={STROKE} strokeWidth={2.5} />
        {/* Right angle markers at all corners */}
        <RightAngleMarker cx={cx - w/2} cy={cy - h/2} size={14} rotation={0} />
        <RightAngleMarker cx={cx + w/2} cy={cy - h/2} size={14} rotation={90} />
        <RightAngleMarker cx={cx + w/2} cy={cy + h/2} size={14} rotation={180} />
        <RightAngleMarker cx={cx - w/2} cy={cy + h/2} size={14} rotation={270} />
      </g>
    );
  }
}

export default GeometryDiagram;
