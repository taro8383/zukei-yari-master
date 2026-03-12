const AreaVisualizer = () => {
  return (
    <div className="bg-kid-green/10 rounded-xl p-4 border border-kid-green/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📏 面積のけいさん / Calculating Area
      </p>

      {/* Rectangle area */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          長方形の面積 / Rectangle Area
        </p>
        <svg viewBox="0 0 200 120" className="w-full h-28">
          {/* Rectangle */}
          <rect x="40" y="30" width="120" height="60" fill="hsl(var(--primary) / 0.2)" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          {/* Grid pattern */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="stroke-muted-foreground" opacity="0.3" />
            </pattern>
          </defs>
          <rect x="40" y="30" width="120" height="60" fill="url(#grid)" />
          {/* Dimension lines */}
          <line x1="40" y1="20" x2="160" y2="20" stroke="currentColor" strokeWidth="1" className="stroke-foreground" />
          <line x1="30" y1="30" x2="30" y2="90" stroke="currentColor" strokeWidth="1" className="stroke-foreground" />
          {/* Labels */}
          <text x="100" y="15" className="fill-foreground text-xs" textAnchor="middle">8 cm (よこ)</text>
          <text x="20" y="65" className="fill-foreground text-xs" textAnchor="middle" transform="rotate(-90 20 65)">5 cm (たて)</text>
          <text x="100" y="65" className="fill-primary text-lg font-bold" textAnchor="middle">40 cm²</text>
        </svg>
        <div className="mt-2 text-center">
          <p className="text-xs font-bold">たて × よこ = 面積</p>
          <p className="text-xs text-muted-foreground">length × width = area</p>
          <p className="text-xs text-muted-foreground">5 × 8 = 40 cm²</p>
        </div>
      </div>

      {/* Square area */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          正方形の面積 / Square Area
        </p>
        <svg viewBox="0 0 200 120" className="w-full h-28">
          {/* Square */}
          <rect x="60" y="25" width="70" height="70" fill="hsl(var(--accent) / 0.2)" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          {/* Grid pattern */}
          <defs>
            <pattern id="grid2" width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M 14 0 L 0 0 0 14" fill="none" stroke="currentColor" strokeWidth="0.5" className="stroke-muted-foreground" opacity="0.3" />
            </pattern>
          </defs>
          <rect x="60" y="25" width="70" height="70" fill="url(#grid2)" />
          {/* Labels */}
          <text x="95" y="20" className="fill-foreground text-xs" textAnchor="middle">7 cm</text>
          <text x="50" y="65" className="fill-foreground text-xs" textAnchor="middle">7 cm</text>
          <text x="95" y="65" className="fill-accent text-lg font-bold" textAnchor="middle">49 cm²</text>
        </svg>
        <div className="mt-2 text-center">
          <p className="text-xs font-bold">辺 × 辺 = 面積</p>
          <p className="text-xs text-muted-foreground">side × side = area</p>
          <p className="text-xs text-muted-foreground">7 × 7 = 49 cm²</p>
        </div>
      </div>

      {/* Key formulas */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          📐 公式 / Formulas
        </p>
        <div className="text-xs space-y-1">
          <p>• 長方形 / Rectangle: たて × よこ / length × width</p>
          <p>• 正方形 / Square: 辺 × 辺 / side × side</p>
          <p>• 単位 / Unit: cm² (平方センチメートル / sq cm)</p>
        </div>
      </div>
    </div>
  );
};

export default AreaVisualizer;
