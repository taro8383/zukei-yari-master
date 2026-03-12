const QuadrilateralsVisualizer = () => {
  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🔷 四角形のなかま分け / Classifying Quadrilaterals
      </p>

      {/* Quadrilateral family tree */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          四角形の分類 / Quadrilateral Classification
        </p>

        <div className="grid grid-cols-3 gap-2">
          {/* Trapezoid */}
          <div className="bg-white/50 rounded p-2 border border-gray-200">
            <svg viewBox="0 0 100 50" className="w-full h-10">
              <polygon points="20,45 30,5 70,5 80,45" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2" />
              {/* Parallel markers */}
              <line x1="35" y1="8" x2="65" y2="8" stroke="currentColor" strokeWidth="1" className="stroke-primary" />
              <line x1="35" y1="10" x2="65" y2="10" stroke="currentColor" strokeWidth="1" className="stroke-primary" />
            </svg>
            <p className="text-xs font-bold text-center text-primary">台形</p>
            <p className="text-xs text-center text-muted-foreground">Trapezoid</p>
            <p className="text-xs text-center leading-tight">1組の辺が平行</p>
            <p className="text-xs text-center text-muted-foreground leading-tight">1 pair parallel</p>
          </div>

          {/* Parallelogram */}
          <div className="bg-white/50 rounded p-2 border border-gray-200">
            <svg viewBox="0 0 100 50" className="w-full h-10">
              <polygon points="25,45 15,5 75,5 85,45" fill="hsl(var(--accent) / 0.2)" stroke="hsl(var(--accent))" strokeWidth="2" />
              {/* Parallel markers */}
              <line x1="20" y1="8" x2="70" y2="8" stroke="currentColor" strokeWidth="1" className="stroke-accent" />
              <line x1="20" y1="10" x2="70" y2="10" stroke="currentColor" strokeWidth="1" className="stroke-accent" />
              <line x1="30" y1="42" x2="80" y2="42" stroke="currentColor" strokeWidth="1" className="stroke-accent" />
              <line x1="30" y1="44" x2="80" y2="44" stroke="currentColor" strokeWidth="1" className="stroke-accent" />
            </svg>
            <p className="text-xs font-bold text-center text-accent">平行四辺形</p>
            <p className="text-xs text-center text-muted-foreground">Parallelogram</p>
            <p className="text-xs text-center leading-tight">2組の辺が平行</p>
            <p className="text-xs text-center text-muted-foreground leading-tight">2 pairs parallel</p>
          </div>

          {/* Kite */}
          <div className="bg-white/50 rounded p-2 border border-gray-200">
            <svg viewBox="0 0 100 60" className="w-full h-10">
              <polygon points="50,5 80,30 50,55 20,30" fill="hsl(var(--orange-500) / 0.2)" stroke="hsl(var(--orange-500))" strokeWidth="2" />
              {/* Equal adjacent side markers */}
              <line x1="30" y1="22" x2="33" y2="24" stroke="hsl(var(--orange-500))" strokeWidth="1" />
              <line x1="35" y1="18" x2="38" y2="20" stroke="hsl(var(--orange-500))" strokeWidth="1" />
              <line x1="62" y1="20" x2="65" y2="22" stroke="hsl(var(--orange-500))" strokeWidth="1" />
              <line x1="67" y1="24" x2="70" y2="26" stroke="hsl(var(--orange-500))" strokeWidth="1" />
            </svg>
            <p className="text-xs font-bold text-center text-orange-500">たこ形</p>
            <p className="text-xs text-center text-muted-foreground">Kite</p>
            <p className="text-xs text-center leading-tight">隣り合う2組が同じ</p>
            <p className="text-xs text-center text-muted-foreground leading-tight">2 pairs adjacent equal</p>
          </div>

          {/* Rectangle */}
          <div className="bg-white/50 rounded p-2 border border-gray-200">
            <svg viewBox="0 0 100 50" className="w-full h-10">
              <rect x="20" y="5" width="60" height="40" fill="hsl(var(--kid-green) / 0.2)" stroke="hsl(var(--kid-green))" strokeWidth="2" />
              {/* Right angle markers */}
              <path d="M 20 10 L 25 10 L 25 5" fill="none" stroke="currentColor" strokeWidth="1" className="stroke-kid-green" />
              <path d="M 80 10 L 75 10 L 75 5" fill="none" stroke="currentColor" strokeWidth="1" className="stroke-kid-green" />
            </svg>
            <p className="text-xs font-bold text-center text-kid-green">長方形</p>
            <p className="text-xs text-center text-muted-foreground">Rectangle</p>
            <p className="text-xs text-center leading-tight">4つの角が90°</p>
            <p className="text-xs text-center text-muted-foreground leading-tight">4 right angles</p>
          </div>

          {/* Rhombus */}
          <div className="bg-white/50 rounded p-2 border border-gray-200">
            <svg viewBox="0 0 100 60" className="w-full h-10">
              <polygon points="50,5 95,30 50,55 5,30" fill="hsl(var(--kid-yellow) / 0.2)" stroke="hsl(var(--kid-yellow))" strokeWidth="2" />
              {/* Equal side markers */}
              <line x1="25" y1="18" x2="28" y2="20" stroke="currentColor" strokeWidth="1" className="stroke-kid-yellow" />
              <line x1="72" y1="18" x2="75" y2="20" stroke="currentColor" strokeWidth="1" className="stroke-kid-yellow" />
              <line x1="25" y1="42" x2="28" y2="40" stroke="currentColor" strokeWidth="1" className="stroke-kid-yellow" />
              <line x1="72" y1="42" x2="75" y2="40" stroke="currentColor" strokeWidth="1" className="stroke-kid-yellow" />
            </svg>
            <p className="text-xs font-bold text-center text-kid-yellow">ひし形</p>
            <p className="text-xs text-center text-muted-foreground">Rhombus</p>
            <p className="text-xs text-center leading-tight">4つの辺が同じ</p>
            <p className="text-xs text-center text-muted-foreground leading-tight">4 equal sides</p>
          </div>

          {/* Square */}
          <div className="bg-white/50 rounded p-2 border border-gray-200">
            <svg viewBox="0 0 100 50" className="w-full h-10">
              <rect x="30" y="5" width="40" height="40" fill="hsl(var(--kid-purple) / 0.2)" stroke="hsl(var(--kid-purple))" strokeWidth="2" />
              {/* Right angle markers */}
              <path d="M 30 10 L 35 10 L 35 5" fill="none" stroke="currentColor" strokeWidth="1" className="stroke-kid-purple" />
              <path d="M 70 10 L 65 10 L 65 5" fill="none" stroke="currentColor" strokeWidth="1" className="stroke-kid-purple" />
              <path d="M 30 40 L 35 40 L 35 45" fill="none" stroke="currentColor" strokeWidth="1" className="stroke-kid-purple" />
              <path d="M 70 40 L 65 40 L 65 45" fill="none" stroke="currentColor" strokeWidth="1" className="stroke-kid-purple" />
            </svg>
            <p className="text-xs font-bold text-center text-kid-purple">正方形</p>
            <p className="text-xs text-center text-muted-foreground">Square</p>
            <p className="text-xs text-center leading-tight">4辺同じ、4角90°</p>
            <p className="text-xs text-center text-muted-foreground leading-tight">4 equal, 4 right</p>
          </div>
        </div>
      </div>

      {/* Properties table */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          📋 特徴まとめ / Properties Summary
        </p>
        <div className="text-xs space-y-1">
          <p><strong>台形 / Trapezoid:</strong> 1組の対辺が平行 / 1 pair of parallel sides</p>
          <p><strong>平行四辺形 / Parallelogram:</strong> 2組の対辺が平行 / 2 pairs of parallel sides</p>
          <p><strong>たこ形 / Kite:</strong> 隣り合う2組の辺が同じ / 2 pairs of adjacent equal sides</p>
          <p><strong>長方形 / Rectangle:</strong> 平行四辺形 + 4角が90° / Parallelogram + 4 right angles</p>
          <p><strong>ひし形 / Rhombus:</strong> 平行四辺形 + 4辺が等しい / Parallelogram + 4 equal sides</p>
          <p><strong>正方形 / Square:</strong> 長方形 + ひし形 / Rectangle + Rhombus</p>
        </div>
      </div>
    </div>
  );
};

export default QuadrilateralsVisualizer;
