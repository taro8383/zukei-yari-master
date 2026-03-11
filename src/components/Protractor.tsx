import { useState, useCallback, useRef } from 'react';

interface ProtractorProps {
  visible: boolean;
  onClose: () => void;
}

const Protractor = ({ visible, onClose }: ProtractorProps) => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const centerRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  }, [pos]);

  const handleRotateDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRotating(true);
    centerRef.current = { x: pos.x + 120, y: pos.y + 120 };
  }, [pos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    } else if (isRotating) {
      const cx = centerRef.current.x;
      const cy = centerRef.current.y;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      setRotation(angle + 90);
    }
  }, [isDragging, isRotating]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsRotating(false);
  }, []);

  if (!visible) return null;

  const size = 240;
  const r = 110;
  const cx = size / 2;
  const cy = size / 2;

  const ticks = [];
  for (let deg = 0; deg <= 180; deg += 1) {
    const rad = (deg * Math.PI) / 180;
    const isMajor = deg % 10 === 0;
    const isMid = deg % 5 === 0;
    const tickLen = isMajor ? 14 : isMid ? 8 : 4;
    const x1 = cx + (r - tickLen) * Math.cos(Math.PI - rad);
    const y1 = cy - (r - tickLen) * Math.sin(Math.PI - rad);
    const x2 = cx + r * Math.cos(Math.PI - rad);
    const y2 = cy - r * Math.sin(Math.PI - rad);
    ticks.push(
      <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="hsl(220, 30%, 25%)" strokeWidth={isMajor ? 1.2 : 0.5} opacity={isMajor ? 1 : isMid ? 0.7 : 0.4} />
    );
    if (isMajor) {
      const lx = cx + (r - 22) * Math.cos(Math.PI - rad);
      const ly = cy - (r - 22) * Math.sin(Math.PI - rad) + 4;
      ticks.push(
        <text key={`t${deg}`} x={lx} y={ly} textAnchor="middle" fontSize={8} fontWeight="bold" fill="hsl(220, 30%, 25%)">{deg}</text>
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : isRotating ? 'crosshair' : 'default' }}
    >
      {/* Make only the protractor interactive */}
      <div
        className="absolute pointer-events-auto"
        style={{
          left: pos.x,
          top: pos.y,
          width: size,
          height: size / 2 + 20,
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
          height={size / 2 + 20}
          viewBox={`0 0 ${size} ${size / 2 + 20}`}
          onMouseDown={handleMouseDown}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          className="drop-shadow-lg"
        >
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
          {/* Ticks and labels */}
          {ticks}
        </svg>

        {/* Rotation handle */}
        <div
          onMouseDown={handleRotateDown}
          className="absolute w-6 h-6 rounded-full bg-kid-orange border-2 border-background shadow-kid cursor-crosshair hover:scale-125 transition-transform"
          style={{ left: cx + r - 12, top: cy - 3 }}
          title="ドラッグして回す / Drag to rotate"
        />
      </div>
    </div>
  );
};

export default Protractor;
