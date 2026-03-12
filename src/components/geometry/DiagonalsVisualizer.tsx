const DiagonalsVisualizer = () => {
  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        ⬡ 対角線 / Diagonals
      </p>

      {/* Diagonal definition */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          対角線とは / What is a Diagonal?
        </p>
        <svg viewBox="0 0 200 120" className="w-full h-28">
          {/* Quadrilateral */}
          <polygon points="50,30 150,20 170,90 30,80" fill="hsl(var(--primary) / 0.1)" stroke="currentColor" strokeWidth="2" className="stroke-foreground" />

          {/* Diagonal 1 */}
          <line x1="50" y1="30" x2="170" y2="90" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4" />

          {/* Diagonal 2 */}
          <line x1="150" y1="20" x2="30" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4" />

          {/* Vertices */}
          <circle cx="50" cy="30" r="4" className="fill-accent" />
          <circle cx="150" cy="20" r="4" className="fill-accent" />
          <circle cx="170" cy="90" r="4" className="fill-accent" />
          <circle cx="30" cy="80" r="4" className="fill-accent" />

          {/* Labels */}
          <text x="40" y="25" className="fill-foreground text-xs font-bold">A</text>
          <text x="160" y="20" className="fill-foreground text-xs font-bold">B</text>
          <text x="180" y="95" className="fill-foreground text-xs font-bold">C</text>
          <text x="20" y="85" className="fill-foreground text-xs font-bold">D</text>
        </svg>
        <p className="text-xs text-center text-muted-foreground mt-1">
          向かい合う頂点を結ぶ線 / Line connecting opposite vertices
        </p>
      </div>

      {/* Diagonals in different polygons */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          多角形と対角線の数 / Polygons and Number of Diagonals
        </p>

        <div className="grid grid-cols-3 gap-2">
          {/* Triangle */}
          <div className="text-center">
            <svg viewBox="0 0 60 60" className="w-full h-14">
              <polygon points="30,10 50,50 10,50" fill="hsl(var(--primary) / 0.1)" stroke="currentColor" strokeWidth="1.5" className="stroke-foreground" />
            </svg>
            <p className="text-xs font-bold">三角形 / Triangle</p>
            <p className="text-xs text-muted-foreground">0本 / 0</p>
          </div>

          {/* Quadrilateral */}
          <div className="text-center">
            <svg viewBox="0 0 60 60" className="w-full h-14">
              <polygon points="15,15 45,10 50,45 10,50" fill="hsl(var(--primary) / 0.1)" stroke="currentColor" strokeWidth="1.5" className="stroke-foreground" />
              <line x1="15" y1="15" x2="50" y2="45" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="2" />
              <line x1="45" y1="10" x2="10" y2="50" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="2" />
            </svg>
            <p className="text-xs font-bold">四角形 / Quadrilateral</p>
            <p className="text-xs text-primary font-bold">2本 / 2</p>
          </div>

          {/* Pentagon */}
          <div className="text-center">
            <svg viewBox="0 0 60 60" className="w-full h-14">
              <polygon points="30,8 54,25 45,52 15,52 6,25" fill="hsl(var(--primary) / 0.1)" stroke="currentColor" strokeWidth="1.5" className="stroke-foreground" />
              <line x1="30" y1="8" x2="45" y2="52" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2" />
              <line x1="54" y1="25" x2="15" y2="52" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2" />
              <line x1="45" y1="52" x2="6" y2="25" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2" />
              <line x1="15" y1="52" x2="30" y2="8" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2" />
              <line x1="6" y1="25" x2="54" y2="25" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2" />
            </svg>
            <p className="text-xs font-bold">五角形 / Pentagon</p>
            <p className="text-xs text-primary font-bold">5本 / 5</p>
          </div>
        </div>
      </div>

      {/* Formula */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          📐 公式 / Formula
        </p>
        <div className="text-center">
          <p className="text-sm font-bold mb-1">n角形の対角線の数 / Number of diagonals in n-gon</p>
          <p className="text-lg font-bold text-primary">n × (n - 3) ÷ 2</p>
        </div>
        <div className="mt-2 text-xs space-y-1">
          <p>• 四角形 / Quadrilateral: 4 × (4 - 3) ÷ 2 = 2本 / 2</p>
          <p>• 五角形 / Pentagon: 5 × (5 - 3) ÷ 2 = 5本 / 5</p>
          <p>• 六角形 / Hexagon: 6 × (6 - 3) ÷ 2 = 9本 / 9</p>
        </div>
      </div>

      {/* Applications */}
      <div className="bg-kid-green/20 rounded-lg p-3 border border-kid-green">
        <p className="text-xs font-bold text-kid-green mb-2 text-center">
          🏗️ 使い道 / Applications
        </p>
        <div className="text-xs space-y-1">
          <p>• 三角形に分けて面積を計算 / Split into triangles for area</p>
          <p>• 建物の強い構造（すじかい）/ Building cross-braces</p>
          <p>• サッカーボールの模様 / Soccer ball patterns</p>
        </div>
      </div>
    </div>
  );
};

export default DiagonalsVisualizer;
