interface ReadingOkuChoVisualizerProps {
  number: number;
  japaneseReading: string;
}

const ReadingOkuChoVisualizer = ({ number, japaneseReading }: ReadingOkuChoVisualizerProps) => {
  // Format number with slashes every 4 digits
  const formatWithSlashes = (num: number): string => {
    const str = num.toString();
    const parts: string[] = [];
    for (let i = str.length; i > 0; i -= 4) {
      parts.unshift(str.slice(Math.max(0, i - 4), i));
    }
    return parts.join('/');
  };

  const formattedNumber = formatWithSlashes(number);
  const parts = formattedNumber.split('/');
  const units = ['', '万', '億', '兆'];
  const unitsEn = ['', 'man', 'oku', 'cho'];

  // Build the breakdown from right to left
  const breakdown = parts.map((part, index) => {
    const unitIndex = parts.length - 1 - index;
    const unit = units[unitIndex];
    const unitEn = unitsEn[unitIndex];
    const value = parseInt(part);
    return { value, unit, unitEn, position: index };
  }).filter(item => item.value > 0);

  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🔢 大きな数の読み方 / How to Read Large Numbers
      </p>

      {/* Main number display */}
      <div className="bg-background rounded-lg p-4 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          数字 / Number
        </p>
        <p className="text-2xl font-bold text-center text-foreground font-mono tracking-wider">
          {formattedNumber}
        </p>
        <p className="text-xs text-center text-muted-foreground mt-1">
          右から4けたごとに区切る / Group by 4 digits from the right
        </p>
      </div>

      {/* Unit breakdown */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-center text-muted-foreground">
          位の分解 / Place Value Breakdown
        </p>

        <div className="grid grid-cols-1 gap-2">
          {breakdown.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-3 border-2 ${
                item.unit === '兆'
                  ? 'bg-kid-purple/20 border-kid-purple'
                  : item.unit === '億'
                  ? 'bg-kid-blue/20 border-kid-blue'
                  : item.unit === '万'
                  ? 'bg-kid-green/20 border-kid-green'
                  : 'bg-kid-yellow/20 border-kid-yellow'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">
                    {item.value}
                  </span>
                  <span className={`text-lg font-bold ${
                    item.unit === '兆'
                      ? 'text-kid-purple'
                      : item.unit === '億'
                      ? 'text-kid-blue'
                      : item.unit === '万'
                      ? 'text-kid-green'
                      : 'text-kid-yellow'
                  }`}>
                    {item.unit}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.unitEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final reading */}
      <div className="mt-4 bg-kid-green/20 rounded-lg p-4 border-2 border-kid-green text-center">
        <p className="text-xs text-muted-foreground mb-1">
          読み方 / Reading
        </p>
        <p className="text-2xl font-bold text-kid-green">
          {japaneseReading}
        </p>
      </div>

      {/* Helper diagram */}
      <div className="mt-4 bg-background/70 rounded-lg p-3 border border-border">
        <p className="text-xs font-bold text-center text-muted-foreground mb-2">
          📊 位の順番 / Order of Places
        </p>
        <div className="flex justify-center items-center gap-1 flex-wrap text-xs">
          <div className="text-center px-2 py-1 bg-kid-yellow/20 rounded">
            <span className="block font-bold">一</span>
            <span className="text-muted-foreground">ones</span>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="text-center px-2 py-1 bg-kid-green/20 rounded">
            <span className="block font-bold">万</span>
            <span className="text-muted-foreground">10k</span>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="text-center px-2 py-1 bg-kid-blue/20 rounded">
            <span className="block font-bold">億</span>
            <span className="text-muted-foreground">100M</span>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="text-center px-2 py-1 bg-kid-purple/20 rounded">
            <span className="block font-bold">兆</span>
            <span className="text-muted-foreground">1T</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingOkuChoVisualizer;
