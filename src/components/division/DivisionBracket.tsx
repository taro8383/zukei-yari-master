interface DivisionBracketProps {
  dividend: number;
  divisor: number;
  quotient?: number;
  showQuotient?: boolean;
  showSteps?: boolean;
}

const DivisionBracket = ({
  dividend,
  divisor,
  quotient,
  showQuotient = false,
  showSteps = false,
}: DivisionBracketProps) => {
  // Convert numbers to strings for digit positioning
  const dividendStr = dividend.toString();
  const divisorStr = divisor.toString();
  const quotientStr = quotient?.toString() || '';

  // Calculate dimensions based on number of digits
  const digitWidth = 40;
  const bracketWidth = dividendStr.length * digitWidth;
  const totalWidth = Math.max(150, bracketWidth + 80);
  const height = showSteps ? 200 : 120;

  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-2 text-center">
        📝 筆算のかたち / Long Division Format
      </p>

      <svg viewBox={`0 0 ${totalWidth} ${height}`} className="w-full max-w-md mx-auto">
        {/* Background */}
        <rect x="0" y="0" width={totalWidth} height={height} fill="transparent" />

        {/* Divisor (left side) */}
        <text
          x="30"
          y="70"
          textAnchor="middle"
          className="fill-foreground text-3xl font-bold"
        >
          {divisorStr}
        </text>

        {/* Japanese long division bracket: )￣ */}
        <path
          d={`M 55 30 L 55 90 Q 55 100 65 100 L ${65 + bracketWidth} 100`}
          fill="none"
          stroke="#374151"
          strokeWidth="3"
        />

        {/* Dividend digits inside bracket */}
        {dividendStr.split('').map((digit, index) => (
          <text
            key={index}
            x={75 + index * digitWidth}
            y="70"
            textAnchor="middle"
            className="fill-foreground text-3xl font-bold"
          >
            {digit}
          </text>
        ))}

        {/* Quotient on top (if showing) */}
        {showQuotient && quotientStr && (
          <>
            {quotientStr.split('').map((digit, index) => (
              <text
                key={`q-${index}`}
                x={75 + index * digitWidth}
                y="25"
                textAnchor="middle"
                className="fill-primary text-3xl font-bold"
              >
                {digit}
              </text>
            ))}
            <text
              x={55 + bracketWidth / 2}
              y="20"
              textAnchor="middle"
              className="fill-muted-foreground text-xs"
            >
              答え / Answer
            </text>
          </>
        )}

        {/* Step-by-step labels */}
        {showSteps && (
          <g transform="translate(10, 130)">
            <text x="0" y="0" className="fill-muted-foreground text-xs font-bold">
              4ステップ / 4 Steps:
            </text>
            <text x="10" y="20" className="fill-foreground text-xs">
              ① たてる (Estimate)
            </text>
            <text x="10" y="40" className="fill-foreground text-xs">
              ② かける (Multiply)
            </text>
            <text x="120" y="20" className="fill-foreground text-xs">
              ③ ひく (Subtract)
            </text>
            <text x="120" y="40" className="fill-foreground text-xs">
              ④ おろす (Bring down)
            </text>
          </g>
        )}
      </svg>

      {/* Step explanation */}
      <div className="mt-3 bg-background/70 rounded-lg p-3 text-sm">
        <p className="font-bold text-foreground mb-2">
          💡 筆算のステップ（{dividend} ÷ {divisor} の例）：
        </p>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="font-bold text-primary">①</span>
            <div>
              <p className="text-foreground font-medium">たてる（Estimate）：</p>
              <p className="text-muted-foreground text-xs">{divisor} × ? = {dividend.toString().substring(0, Math.min(2, dividend.toString().length))}またはそれ以下になる数をたてる</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-primary">②</span>
            <div>
              <p className="text-foreground font-medium">かける（Multiply）：</p>
              <p className="text-muted-foreground text-xs">①でたてた数 × {divisor} = ? を計算して書く</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-primary">③</span>
            <div>
              <p className="text-foreground font-medium">ひく（Subtract）：</p>
              <p className="text-muted-foreground text-xs">割られる数の上の桁 - ②でかけた数 = ? を引く</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-primary">④</span>
            <div>
              <p className="text-foreground font-medium">おろす（Bring down）：</p>
              <p className="text-muted-foreground text-xs">次の桁（{dividend.toString().length > 1 ? dividend.toString().substring(1, 2) : '?'}）を③の答えの横に書く</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionBracket;
