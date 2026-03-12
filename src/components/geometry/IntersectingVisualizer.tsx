const IntersectingVisualizer = () => {
  return (
    <div className="bg-kid-yellow/10 rounded-xl p-4 border border-kid-yellow/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        ✂️ 交わる直線と角 / Intersecting Lines & Angles
      </p>

      {/* Intersecting lines with angles */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          交わる直線でできる4つの角 / 4 Angles from Intersecting Lines
        </p>
        <svg viewBox="0 0 200 150" className="w-full h-36">
          {/* Line 1 */}
          <line x1="30" y1="75" x2="170" y2="75" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          {/* Line 2 - diagonal */}
          <line x1="100" y1="20" x2="100" y2="130" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />

          {/* Angle A - top right */}
          <path d="M 100 75 L 130 75 A 30 30 0 0 0 100 45" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="125" y="60" className="fill-primary text-sm font-bold">A</text>
          <text x="140" y="55" className="fill-primary text-xs">60°</text>

          {/* Angle B - top left */}
          <path d="M 100 75 L 100 45 A 30 30 0 0 0 70 75" fill="hsl(var(--accent) / 0.3)" stroke="hsl(var(--accent))" strokeWidth="2" />
          <text x="75" y="60" className="fill-accent text-sm font-bold">B</text>
          <text x="55" y="55" className="fill-accent text-xs">120°</text>

          {/* Angle C - bottom left */}
          <path d="M 100 75 L 70 75 A 30 30 0 0 0 100 105" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="75" y="95" className="fill-primary text-sm font-bold">C</text>
          <text x="55" y="105" className="fill-primary text-xs">60°</text>

          {/* Angle D - bottom right */}
          <path d="M 100 75 L 100 105 A 30 30 0 0 0 130 75" fill="hsl(var(--accent) / 0.3)" stroke="hsl(var(--accent))" strokeWidth="2" />
          <text x="125" y="95" className="fill-accent text-sm font-bold">D</text>
          <text x="140" y="105" className="fill-accent text-xs">120°</text>
        </svg>
      </div>

      {/* Vertical angles */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          対頂角（向かい合う角）/ Vertical Angles
        </p>
        <svg viewBox="0 0 200 100" className="w-full h-24">
          {/* X shape */}
          <line x1="50" y1="20" x2="150" y2="80" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          <line x1="150" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />

          {/* Highlight opposite angles */}
          <path d="M 100 50 L 130 35 A 25 25 0 0 0 100 20" fill="hsl(var(--primary) / 0.4)" />
          <path d="M 100 50 L 70 65 A 25 25 0 0 0 100 80" fill="hsl(var(--primary) / 0.4)" />

          <path d="M 100 50 L 70 35 A 25 25 0 0 1 100 20" fill="hsl(var(--accent) / 0.4)" />
          <path d="M 100 50 L 130 65 A 25 25 0 0 1 100 80" fill="hsl(var(--accent) / 0.4)" />

          {/* Center point */}
          <circle cx="100" cy="50" r="3" className="fill-foreground" />
        </svg>
        <p className="text-xs text-center text-muted-foreground mt-1">
          A = C (対頂角は等しい / Vertical angles are equal)
        </p>
      </div>

      {/* Adjacent angles */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          となり合う角 / Adjacent Angles
        </p>
        <svg viewBox="0 0 200 80" className="w-full h-20">
          <line x1="30" y1="40" x2="170" y2="40" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          <line x1="100" y1="10" x2="100" y2="70" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />

          {/* Adjacent angles */}
          <path d="M 100 40 L 130 40 A 30 30 0 0 0 100 10" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="2" />
          <path d="M 100 40 L 100 10 A 30 30 0 0 0 70 40" fill="hsl(var(--accent) / 0.3)" stroke="hsl(var(--accent))" strokeWidth="2" />

          <text x="125" y="30" className="fill-primary text-xs font-bold">60°</text>
          <text x="75" y="30" className="fill-accent text-xs font-bold">120°</text>
        </svg>
        <p className="text-xs text-center text-muted-foreground mt-1">
          A + B = 180° (となり合う角を足すと180° / Adjacent angles sum to 180°)
        </p>
      </div>

      {/* Key rules */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          📐 重要なルール / Key Rules
        </p>
        <div className="text-xs space-y-1">
          <p>• 対頂角（向かい合う角）は同じ大きさ / Vertical angles are equal</p>
          <p>• となり合う角を足すと180° / Adjacent angles sum to 180°</p>
          <p>• 4つの角を全部足すと360° / All 4 angles sum to 360°</p>
        </div>
      </div>
    </div>
  );
};

export default IntersectingVisualizer;
