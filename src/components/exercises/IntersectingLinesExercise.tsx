import { useState, useMemo, useEffect } from 'react';

interface IntersectingLinesExerciseProps {
  givenAngle: number;
  rotation?: number;
  onAnswerSubmit: (answers: { angleB: number; comparison: 'gt' | 'lt' | 'eq' }) => void;
  graded: boolean;
  isCorrect?: boolean;
  correctAnswer?: number;
}

const IntersectingLinesExercise = ({
  givenAngle,
  rotation = 0,
  onAnswerSubmit,
  graded,
  isCorrect,
  correctAnswer
}: IntersectingLinesExerciseProps) => {
  const [angleBInput, setAngleBInput] = useState('');
  const [comparison, setComparison] = useState<'gt' | 'lt' | 'eq' | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [localIsCorrect, setLocalIsCorrect] = useState(false);

  // Calculate all angles based on given angle A
  const angles = useMemo(() => {
    const angleA = givenAngle;
    const angleB = 180 - angleA; // Supplementary (adjacent)
    const angleC = angleA; // Vertical opposite to A
    const angleD = angleB; // Vertical opposite to B
    return { A: angleA, B: angleB, C: angleC, D: angleD };
  }, [givenAngle]);

  // Submit answer when graded becomes true
  useEffect(() => {
    if (graded && !hasSubmitted && angleBInput && comparison) {
      const userAngleB = parseInt(angleBInput);
      const correct = userAngleB === angles.B && comparison === 'eq';
      setLocalIsCorrect(correct);
      setHasSubmitted(true);
      onAnswerSubmit({
        angleB: userAngleB,
        comparison
      });
    }
  }, [graded, hasSubmitted, angleBInput, comparison, angles.B, onAnswerSubmit]);

  const svgSize = 280;
  const center = svgSize / 2;
  const lineLength = 100;

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
  const labelOffset = 35;
  const angleBetween = ((givenAngle * Math.PI) / 180); // Convert givenAngle to radians
  const labels = [
    // A: bisector of angle between line1 (rad1) and line2 (rad2)
    { text: 'A', x: center + labelOffset * Math.cos(rad1 + angleBetween / 2), y: center + labelOffset * Math.sin(rad1 + angleBetween / 2) },
    // B: bisector of angle between line1 (rad1) and line2 opposite (rad2 + π)
    { text: 'B', x: center + labelOffset * Math.cos(rad1 - (Math.PI - angleBetween) / 2), y: center + labelOffset * Math.sin(rad1 - (Math.PI - angleBetween) / 2) },
    // C: opposite to A
    { text: 'C', x: center + labelOffset * Math.cos(rad1 + angleBetween / 2 + Math.PI), y: center + labelOffset * Math.sin(rad1 + angleBetween / 2 + Math.PI) },
    // D: opposite to B
    { text: 'D', x: center + labelOffset * Math.cos(rad1 - (Math.PI - angleBetween) / 2 + Math.PI), y: center + labelOffset * Math.sin(rad1 - (Math.PI - angleBetween) / 2 + Math.PI) },
  ];

  return (
    <div className="space-y-4">
      {/* SVG Diagram */}
      <svg width={svgSize} height={svgSize} className="mx-auto bg-muted/30 rounded-xl">
        {/* Grid background */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="hsl(var(--muted-foreground)" opacity="0.2" />
          </pattern>
        </defs>
        <rect width={svgSize} height={svgSize} fill="url(#grid)" />

        {/* Intersecting lines */}
        <line {...line1} stroke="hsl(var(--primary))" strokeWidth={3} strokeLinecap="round" />
        <line {...line2} stroke="hsl(var(--primary))" strokeWidth={3} strokeLinecap="round" />

        {/* Intersection point */}
        <circle cx={center} cy={center} r={4} fill="hsl(var(--destructive))" />

        {/* Angle labels */}
        {labels.map((label) => (
          <text
            key={label.text}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-bold text-lg fill-primary"
          >
            {label.text}
          </text>
        ))}

        {/* Given angle arc for A */}
        <path
          d={`M ${center + 25 * Math.cos(rad1)} ${center + 25 * Math.sin(rad1)}
              A 25 25 0 0 1 ${center + 25 * Math.cos(rad2)} ${center + 25 * Math.sin(rad2)}`}
          fill="none"
          stroke="hsl(var(--kid-yellow))"
          strokeWidth={2}
        />
        <text
          x={center + 40 * Math.cos((rad1 + rad2) / 2)}
          y={center + 40 * Math.sin((rad1 + rad2) / 2)}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-bold fill-foreground"
        >
          {angles.A}°
        </text>
      </svg>

      {/* Questions */}
      <div className="space-y-4 bg-muted/30 p-4 rounded-xl">
        {/* Angle B question */}
        <div className="space-y-2">
          <p className="font-medium">
            角Aは <span className="text-primary font-bold">{angles.A}°</span> です。角Bは何度ですか？
          </p>
          <p className="text-sm text-muted-foreground">
            Angle A is {angles.A}°. How many degrees is angle B?
          </p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={angleBInput}
              onChange={(e) => setAngleBInput(e.target.value)}
              disabled={graded || hasSubmitted}
              className="w-24 h-10 text-center text-lg font-bold rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none disabled:opacity-60"
              placeholder="？"
            />
            <span className="font-medium">°</span>
          </div>
        </div>

        {/* Comparison question */}
        <div className="space-y-2">
          <p className="font-medium">角Aと角Cを比べましょう：</p>
          <p className="text-sm text-muted-foreground">Compare angles A and C:</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'gt', label: 'A > C', labelEn: 'A is greater' },
              { value: 'lt', label: 'A < C', labelEn: 'A is smaller' },
              { value: 'eq', label: 'A = C (同じ)', labelEn: 'A equals C' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => !graded && !hasSubmitted && setComparison(opt.value as 'gt' | 'lt' | 'eq')}
                disabled={graded || hasSubmitted}
                className={`px-4 py-2 rounded-lg border-2 font-bold transition-all disabled:opacity-60 ${
                  comparison === opt.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-input bg-background hover:border-primary/50'
                }`}
              >
                <span>{opt.label}</span>
                <span className="block text-xs font-normal opacity-80">{opt.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {(graded || hasSubmitted) && (
          <div className={`p-3 rounded-lg ${(isCorrect ?? localIsCorrect) ? 'bg-correct/10' : 'bg-incorrect/10'}`}>
            {(isCorrect ?? localIsCorrect) ? (
              <p className="text-correct font-bold text-center">〇 せいかい！ / Correct!</p>
            ) : (
              <div className="text-center space-y-1">
                <p className="text-incorrect font-bold">× ざんねん / Incorrect</p>
                <p className="text-sm text-muted-foreground">
                  正しいこたえ / Correct answer: 角B = <strong>{angles.B}°</strong>, A = C (同じ)
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntersectingLinesExercise;
