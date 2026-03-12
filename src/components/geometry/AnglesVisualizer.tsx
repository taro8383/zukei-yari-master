const AnglesVisualizer = () => {
  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📐 角度のけいさん / Calculating Angles
      </p>

      {/* Straight line angle */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          一直線の角 / Straight Line Angle
        </p>
        <svg viewBox="0 0 200 80" className="w-full h-20">
          {/* Line */}
          <line x1="20" y1="40" x2="180" y2="40" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          {/* Angle arc */}
          <path d="M 100 40 L 60 40 A 40 40 0 0 0 100 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          {/* Labels */}
          <text x="55" y="35" className="fill-foreground text-xs">A</text>
          <text x="140" y="35" className="fill-foreground text-xs">B</text>
          <text x="75" y="70" className="fill-primary text-xs font-bold">120°</text>
          <text x="105" y="70" className="fill-accent text-xs font-bold">60°</text>
        </svg>
        <p className="text-xs text-center text-muted-foreground mt-1">
          A + B = 180° (一直線)
        </p>
      </div>

      {/* Triangle angles */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          三角形の内角 / Triangle Interior Angles
        </p>
        <svg viewBox="0 0 200 100" className="w-full h-24">
          {/* Triangle */}
          <polygon points="100,20 40,80 160,80" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          {/* Angle arcs */}
          <path d="M 100 20 L 75 35 A 20 20 0 0 1 100 45" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          <path d="M 40 80 L 55 65 A 20 20 0 0 1 65 80" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
          <path d="M 160 80 L 145 65 A 20 20 0 0 0 135 80" fill="none" stroke="hsl(var(--kid-yellow))" strokeWidth="2" />
          {/* Labels */}
          <text x="95" y="15" className="fill-primary text-xs font-bold">60°</text>
          <text x="25" y="85" className="fill-accent text-xs font-bold">70°</text>
          <text x="145" y="85" className="fill-kid-yellow text-xs font-bold">50°</text>
        </svg>
        <p className="text-xs text-center text-muted-foreground mt-1">
          60° + 70° + 50° = 180°
        </p>
      </div>

      {/* Full rotation */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          一周の角 / Full Rotation
        </p>
        <svg viewBox="0 0 200 100" className="w-full h-24">
          {/* Circle */}
          <circle cx="100" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          {/* Center point */}
          <circle cx="100" cy="50" r="3" className="fill-foreground" />
          {/* Angle arc */}
          <path d="M 100 50 L 135 50 A 35 35 0 1 1 100 15" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4" />
          {/* Labels */}
          <text x="100" y="45" className="fill-foreground text-xs" textAnchor="middle">中心</text>
          <text x="100" y="95" className="fill-primary text-sm font-bold" textAnchor="middle">360°</text>
        </svg>
        <p className="text-xs text-center text-muted-foreground mt-1">
          一周 = 360°
        </p>
      </div>

      {/* Key formulas */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          📐 重要な公式 / Key Formulas
        </p>
        <div className="text-xs space-y-1">
          <p>• 一直線の角 / Straight line: 180°</p>
          <p>• 三角形の内角の和 / Triangle sum: 180°</p>
          <p>• 一周の角 / Full rotation: 360°</p>
        </div>
      </div>
    </div>
  );
};

export default AnglesVisualizer;
