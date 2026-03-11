import { useState, useCallback, useRef } from 'react';

interface ProtractorProps {
  visible: boolean;
  onClose: () => void;
  type?: '180' | '360';
}

// Helper to get coordinates from mouse or touch event
const getClientCoords = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
  if ('touches' in e) {
    const touch = e.touches[0] || (e as TouchEvent).changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
};

const Protractor = ({ visible, onClose, type = '180' }: ProtractorProps) => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const centerRef = useRef({ x: 0, y: 0 });

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const { x, y } = getClientCoords(e);
    dragOffset.current = { x: x - pos.x, y: y - pos.y };
  }, [pos]);

  const handleRotateStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRotating(true);
    centerRef.current = { x: pos.x + 120, y: pos.y + 120 };
  }, [pos]);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getClientCoords(e);
    if (isDragging) {
      setPos({ x: x - dragOffset.current.x, y: y - dragOffset.current.y });
    } else if (isRotating) {
      const cx = centerRef.current.x;
      const cy = centerRef.current.y;
      const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      setRotation(angle + 90);
    }
  }, [isDragging, isRotating]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    setIsRotating(false);
  }, []);

  if (!visible) return null;

  const size = 240;
  const r = 110;
  const cx = size / 2;
  const cy = size / 2;
  const is360 = type === '360';
  const svgHeight = is360 ? size : size / 2 + 20;
  const viewBoxHeight = is360 ? size : size / 2 + 20;

  const ticks = [];
  const maxDeg = is360 ? 360 : 180;
  for (let deg = 0; deg <= maxDeg; deg += 1) {
    const rad = (deg * Math.PI) / 180;
    const isMajor = deg % 10 === 0;
    const isMid = deg % 5 === 0;
    const tickLen = isMajor ? 14 : isMid ? 8 : 4;

    let x1, y1, x2, y2;
    if (is360) {
      // Full circle layout - 0° at top, clockwise
      const angleRad = (deg - 90) * (Math.PI / 180);
      x1 = cx + (r - tickLen) * Math.cos(angleRad);
      y1 = cy + (r - tickLen) * Math.sin(angleRad);
      x2 = cx + r * Math.cos(angleRad);
      y2 = cy + r * Math.sin(angleRad);
    } else {
      // Semi-circle layout - 0° at left
      x1 = cx + (r - tickLen) * Math.cos(Math.PI - rad);
      y1 = cy - (r - tickLen) * Math.sin(Math.PI - rad);
      x2 = cx + r * Math.cos(Math.PI - rad);
      y2 = cy - r * Math.sin(Math.PI - rad);
    }

    ticks.push(
      <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="hsl(220, 30%, 25%)" strokeWidth={isMajor ? 1.2 : 0.5} opacity={isMajor ? 1 : isMid ? 0.7 : 0.4} />
    );
    if (isMajor) {
      let lx, ly;
      if (is360) {
        const angleRad = (deg - 90) * (Math.PI / 180);
        lx = cx + (r - 24) * Math.cos(angleRad);
        ly = cy + (r - 24) * Math.sin(angleRad);
      } else {
        lx = cx + (r - 22) * Math.cos(Math.PI - rad);
        ly = cy - (r - 22) * Math.sin(Math.PI - rad) + 4;
      }
      // Only show labels for key angles to avoid crowding in 360 mode
      if (!is360 || deg % 30 === 0 || deg === 0) {
        ticks.push(
          <text key={`t${deg}`} x={lx} y={ly} textAnchor="middle" fontSize={8} fontWeight="bold" fill="hsl(220, 30%, 25%)">{deg}</text>
        );
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      style={{ cursor: isDragging ? 'grabbing' : isRotating ? 'crosshair' : 'default' }}
    >
      {/* Make only the protractor interactive */}
      <div
        className="absolute pointer-events-auto"
        style={{
          left: pos.x,
          top: pos.y,
          width: size,
          height: svgHeight,
          transform: `rotate(${rotation}deg)`,
          transformOrigin: `${cx}px ${cy}px`,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold shadow-kid z-10 hover:scale-110 transition-transform"
        >
          ×
        </button>

        <svg
          width={size}
          height={svgHeight}
          viewBox={`0 0 ${size} ${viewBoxHeight}`}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
          className="drop-shadow-lg"
        >
          {is360 ? (
            <>
              {/* Full circle body */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="hsl(210, 70%, 50%, 0.15)"
                stroke="hsl(220, 30%, 25%)"
                strokeWidth={1.5}
              />
              {/* Crosshairs for 360 */}
              <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="hsl(340, 70%, 55%)" strokeWidth={0.5} opacity={0.5} />
              <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="hsl(340, 70%, 55%)" strokeWidth={0.5} opacity={0.5} />
              {/* Center point */}
              <circle cx={cx} cy={cy} r={4} fill="hsl(340, 70%, 55%)" />
              <circle cx={cx} cy={cy} r={2} fill="hsl(0, 0%, 100%)" />
            </>
          ) : (
            <>
              {/* Semi-circle body */}
              <path
                d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} L ${cx - r} ${cy}`}
                fill="hsl(210, 70%, 50%, 0.15)"
                stroke="hsl(220, 30%, 25%)"
                strokeWidth={1.5}
              />
              {/* Center baseline */}
              <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="hsl(340, 70%, 55%)" strokeWidth={1} />
              {/* Center point */}
              <circle cx={cx} cy={cy} r={3} fill="hsl(340, 70%, 55%)" />
              <circle cx={cx} cy={cy} r={1} fill="hsl(0, 0%, 100%)" />
            </>
          )}
          {/* Ticks and labels */}
          {ticks}
        </svg>

        {/* Rotation handle */}
        <div
          onMouseDown={handleRotateStart}
          onTouchStart={handleRotateStart}
          className="absolute w-6 h-6 rounded-full bg-kid-orange border-2 border-background shadow-kid cursor-crosshair hover:scale-125 transition-transform"
          style={{
            left: is360 ? cx + r * Math.cos(-Math.PI / 2) - 12 : cx + r - 12,
            top: is360 ? cy + r * Math.sin(-Math.PI / 2) - 12 : cy - 3,
            touchAction: 'none'
          }}
          title="ドラッグして回す / Drag to rotate"
        />
      </div>
    </div>
  );
};

export default Protractor;
