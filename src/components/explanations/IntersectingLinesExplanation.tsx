import { useState, useEffect } from 'react';

interface IntersectingLinesExplanationProps {
  givenAngle: number;
  rotation?: number;
}

const IntersectingLinesExplanation = ({ givenAngle, rotation = 0 }: IntersectingLinesExplanationProps) => {
  const [step, setStep] = useState(0);

  const svgSize = 300;
  const center = svgSize / 2;
  const lineLength = 110;

  // Calculate all angles
  const angleA = givenAngle;
  const angleB = 180 - angleA;
  const angleC = angleA; // Vertical opposite
  const angleD = angleB; // Vertical opposite

  // Calculate line endpoints based on rotation and given angle
  const rad1 = (rotation * Math.PI) / 180;
  const rad2 = ((rotation + givenAngle) * Math.PI) / 180;

  const line1 = {
    x1: center - lineLength * Math.cos(rad1),
    y1: center - lineLength * Math.sin(rad1),
    x2: center + lineLength * Math.cos(rad1),
    y2: center + lineLength * Math.sin(rad1),
  };

  const line2 = {
    x1: center - lineLength * Math.cos(rad2),
    y1: center - lineLength * Math.sin(rad2),
    x2: center + lineLength * Math.cos(rad2),
    y2: center + lineLength * Math.sin(rad2),
  };

  // Label positions (at bisectors of each angle)
  const labelOffset = 45;
  const angleBetween = ((givenAngle * Math.PI) / 180); // Convert givenAngle to radians
  const labels = [
    // A: bisector of angle between line1 (rad1) and line2 (rad2)
    { text: 'A', value: angleA, x: center + labelOffset * Math.cos(rad1 + angleBetween / 2), y: center + labelOffset * Math.sin(rad1 + angleBetween / 2) },
    // B: bisector of angle between line1 (rad1) and line2 opposite (rad2 + π)
    { text: 'B', value: angleB, x: center + labelOffset * Math.cos(rad1 - (Math.PI - angleBetween) / 2), y: center + labelOffset * Math.sin(rad1 - (Math.PI - angleBetween) / 2) },
    // C: opposite to A
    { text: 'C', value: angleC, x: center + labelOffset * Math.cos(rad1 + angleBetween / 2 + Math.PI), y: center + labelOffset * Math.sin(rad1 + angleBetween / 2 + Math.PI) },
    // D: opposite to B
    { text: 'D', value: angleD, x: center + labelOffset * Math.cos(rad1 - (Math.PI - angleBetween) / 2 + Math.PI), y: center + labelOffset * Math.sin(rad1 - (Math.PI - angleBetween) / 2 + Math.PI) },
  ];

  // Animation steps
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 4 : prev + 1));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-muted/30 p-4 rounded-xl space-y-4">
      <p className="font-bold text-center text-primary">
        交わる直線の角度のきまり / Rules of Intersecting Lines
      </p>

      {/* Animated SVG */}
      <svg width={svgSize} height={svgSize} className="mx-auto bg-background rounded-xl border border-border">
        {/* Grid background */}
        <defs>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="hsl(var(--muted-foreground))" opacity="0.15" />
          </pattern>
        </defs>
        <rect width={svgSize} height={svgSize} fill="url(#grid2)" />

        {/* Intersecting lines */}
        <line {...line1} stroke="hsl(var(--primary))" strokeWidth={3} strokeLinecap="round" />
        <line {...line2} stroke="hsl(var(--primary))" strokeWidth={3} strokeLinecap="round" />

        {/* Intersection point */}
        <circle cx={center} cy={center} r={5} fill="hsl(var(--destructive))" />

        {/* Angle arcs - animate based on step */}
        {step >= 1 && (
          <g>
            {/* Angle A arc */}
            <path
              d={`M ${center + 30 * Math.cos(rad1)} ${center + 30 * Math.sin(rad1)}
                  A 30 30 0 0 1 ${center + 30 * Math.cos(rad2)} ${center + 30 * Math.sin(rad2)}`}
              fill="none"
              stroke="hsl(var(--kid-yellow))"
              strokeWidth={3}
              opacity={0.8}
            />
            <text
              x={center + 50 * Math.cos((rad1 + rad2) / 2)}
              y={center + 50 * Math.sin((rad1 + rad2) / 2)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-kid-yellow font-bold"
              fontSize={14}
            >
              {angleA}°
            </text>
          </g>
        )}

        {step >= 2 && (
          <g>
            {/* Angle B arc - from line2 (rad2) to line1 opposite (rad1 + π) */}
            <path
              d={`M ${center + 30 * Math.cos(rad2)} ${center + 30 * Math.sin(rad2)}
                  A 30 30 0 0 1 ${center + 30 * Math.cos(rad1 + Math.PI)} ${center + 30 * Math.sin(rad1 + Math.PI)}`}
              fill="none"
              stroke="hsl(var(--kid-orange))"
              strokeWidth={3}
              opacity={0.8}
            />
            <text
              x={center + 50 * Math.cos(rad2 + (Math.PI - angleBetween) / 2)}
              y={center + 50 * Math.sin(rad2 + (Math.PI - angleBetween) / 2)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-kid-orange font-bold"
              fontSize={14}
            >
              {angleB}°
            </text>
          </g>
        )}

        {step >= 3 && (
          <g>
            {/* Angle C arc - from line1 opposite (rad1 + π) to line2 opposite (rad2 + π) */}
            <path
              d={`M ${center + 30 * Math.cos(rad1 + Math.PI)} ${center + 30 * Math.sin(rad1 + Math.PI)}
                  A 30 30 0 0 1 ${center + 30 * Math.cos(rad2 + Math.PI)} ${center + 30 * Math.sin(rad2 + Math.PI)}`}
              fill="none"
              stroke="hsl(var(--kid-green))"
              strokeWidth={3}
              opacity={0.8}
            />
            <text
              x={center + 50 * Math.cos(rad1 + Math.PI + angleBetween / 2)}
              y={center + 50 * Math.sin(rad1 + Math.PI + angleBetween / 2)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-kid-green font-bold"
              fontSize={14}
            >
              {angleC}°
            </text>
          </g>
        )}

        {step >= 4 && (
          <g>
            {/* Angle D arc - from line2 opposite (rad2 + π) to line1 (rad1) */}
            <path
              d={`M ${center + 30 * Math.cos(rad2 + Math.PI)} ${center + 30 * Math.sin(rad2 + Math.PI)}
                  A 30 30 0 0 1 ${center + 30 * Math.cos(rad1)} ${center + 30 * Math.sin(rad1)}`}
              fill="none"
              stroke="hsl(var(--kid-blue))"
              strokeWidth={3}
              opacity={0.8}
            />
            <text
              x={center + 50 * Math.cos(rad2 + Math.PI + (Math.PI - angleBetween) / 2)}
              y={center + 50 * Math.sin(rad2 + Math.PI + (Math.PI - angleBetween) / 2)}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-kid-blue font-bold"
              fontSize={14}
            >
              {angleD}°
            </text>
          </g>
        )}

        {/* Angle labels */}
        {labels.map((label) => (
          <text
            key={label.text}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-bold fill-foreground"
            fontSize={16}
          >
            {label.text}
          </text>
        ))}
      </svg>

      {/* Step-by-step explanation */}
      <div className="space-y-2 text-sm">
        {step >= 1 && (
          <div className="bg-kid-yellow/10 p-2 rounded-lg">
            <p className="font-medium">① 与えられた角A / Given angle A = {angleA}°</p>
          </div>
        )}

        {step >= 2 && (
          <div className="bg-kid-orange/10 p-2 rounded-lg">
            <p className="font-medium">② となり合う角B / Adjacent angle B = 180° − {angleA}° = {angleB}°</p>
            <p className="text-xs text-muted-foreground">直線上の角度は180°だから / Angles on a straight line add to 180°</p>
          </div>
        )}

        {step >= 3 && (
          <div className="bg-kid-green/10 p-2 rounded-lg">
            <p className="font-medium">③ 対頂角C / Vertical angle C = {angleA}° (Aと同じ)</p>
            <p className="text-xs text-muted-foreground">向かい合う角は等しい / Vertical angles are equal</p>
          </div>
        )}

        {step >= 4 && (
          <div className="bg-kid-blue/10 p-2 rounded-lg">
            <p className="font-medium">④ 角D / Angle D = {angleB}° (Bと同じ)</p>
            <p className="text-xs text-muted-foreground">対頂角だから等しい / Equal as vertical angles</p>
          </div>
        )}

        {step >= 4 && (
          <div className="bg-primary/10 p-3 rounded-lg mt-3">
            <p className="font-bold text-center">まとめ / Summary</p>
            <ul className="list-disc list-inside space-y-1 text-sm mt-2">
              <li>となり合う角の和 = 180° (A + B = 180°)</li>
              <li>対頂角は等しい (A = C, B = D)</li>
              <li>4つの角の合計 = 360°</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntersectingLinesExplanation;
