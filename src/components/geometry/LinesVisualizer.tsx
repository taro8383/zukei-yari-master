const LinesVisualizer = () => {
  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📝 垂直と平行 / Perpendicular & Parallel
      </p>

      {/* Perpendicular lines */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          垂直 (すいちょく) / Perpendicular
        </p>
        <svg viewBox="0 0 200 120" className="w-full h-28">
          {/* Vertical line */}
          <line x1="100" y1="20" x2="100" y2="100" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          {/* Horizontal line */}
          <line x1="60" y1="60" x2="140" y2="60" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          {/* Right angle marker */}
          <path d="M 100 60 L 100 75 L 85 75" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          <rect x="88" y="63" width="9" height="9" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          {/* Labels */}
          <text x="145" y="65" className="fill-foreground text-xs">水平</text>
          <text x="105" y="15" className="fill-foreground text-xs">垂直</text>
          <text x="110" y="75" className="fill-primary text-lg font-bold">90°</text>
        </svg>
        <p className="text-xs text-center text-muted-foreground mt-1">
          2つの線が90°で交わる / Two lines meet at 90°
        </p>
      </div>

      {/* Parallel lines */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          平行 (へいこう) / Parallel
        </p>
        <svg viewBox="0 0 200 120" className="w-full h-28">
          {/* Line 1 */}
          <line x1="30" y1="40" x2="170" y2="40" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          {/* Line 2 */}
          <line x1="30" y1="80" x2="170" y2="80" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />
          {/* Arrow markers */}
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="currentColor" className="fill-foreground" />
            </marker>
          </defs>
          <line x1="50" y1="40" x2="150" y2="40" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
          <line x1="50" y1="80" x2="150" y2="80" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
          {/* Labels */}
          <text x="100" y="35" className="fill-foreground text-xs" textAnchor="middle">直線 a</text>
          <text x="100" y="95" className="fill-foreground text-xs" textAnchor="middle">直線 b</text>
          <text x="100" y="65" className="fill-primary text-xs font-bold" textAnchor="middle">//</text>
        </svg>
        <p className="text-xs text-center text-muted-foreground mt-1">
          2つの線がどこまでいっても交わらない / Two lines that never meet
        </p>
      </div>

      {/* Real life examples */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          🏠 生活の中の例 / Real Life Examples
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/50 rounded p-2 text-center">
            <p className="font-bold">垂直の例 / Perpendicular</p>
            <p>ビルの壁と地面 / Building wall & ground</p>
            <p>本の角 / Book corner</p>
          </div>
          <div className="bg-white/50 rounded p-2 text-center">
            <p className="font-bold">平行の例 / Parallel</p>
            <p>電車のレール / Train rails</p>
            <p>道路の白線 / Road lines</p>
          </div>
        </div>
      </div>

      {/* Key point */}
      <div className="bg-kid-blue/20 rounded-lg p-3 border border-kid-blue">
        <p className="text-xs font-bold text-kid-blue mb-2 text-center">
          💡 ポイント / Key Point
        </p>
        <p className="text-xs text-center">
          垂直は「交わる角度」、平行は「交わらない関係」
        </p>
        <p className="text-xs text-center text-muted-foreground mt-1">
          Perpendicular = "meeting angle", Parallel = "non-meeting relation"
        </p>
      </div>
    </div>
  );
};

export default LinesVisualizer;
