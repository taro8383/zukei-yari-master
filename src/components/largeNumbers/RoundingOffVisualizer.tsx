interface RoundingOffVisualizerProps {
  originalNumber: number;
  targetPlace: string;
  targetPlaceEn: string;
  roundedNumber: number;
}

const RoundingOffVisualizer = ({
  originalNumber,
  targetPlace,
  targetPlaceEn,
  roundedNumber,
}: RoundingOffVisualizerProps) => {
  // Format number and identify the digit to check
  const numStr = originalNumber.toString();
  const digits = numStr.split('');

  // Determine which digit position to round to and which to check
  const getTargetInfo = (place: string): { targetIndex: number; checkIndex: number; targetDigit: number; checkDigit: number } => {
    const places: Record<string, number> = {
      '一の位': 0,
      '十の位': 1,
      '百の位': 2,
      '千の位': 3,
      '万の位': 4,
      '十万の位': 5,
      '百万の位': 6,
      '千万の位': 7,
      '億の位': 8,
    };

    const position = places[place] ?? 3; // default to thousands
    const targetIndex = numStr.length - 1 - position;
    const checkIndex = targetIndex + 1;

    return {
      targetIndex,
      checkIndex,
      targetDigit: parseInt(digits[targetIndex] || '0'),
      checkDigit: parseInt(digits[checkIndex] || '0'),
    };
  };

  const { targetIndex, checkIndex, checkDigit } = getTargetInfo(targetPlace);
  const shouldRoundUp = checkDigit >= 5;

  return (
    <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🎯 四捨五入 / Rounding Off
      </p>

      {/* Original number */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          元の数 / Original Number
        </p>
        <div className="flex justify-center gap-1 flex-wrap">
          {digits.map((digit, idx) => {
            const isTarget = idx === targetIndex;
            const isCheck = idx === checkIndex;
            return (
              <div
                key={`digit-${idx}`}
                className={`min-w-[2rem] h-10 flex items-center justify-center rounded text-lg font-bold border-2 ${
                  isTarget
                    ? 'bg-blue-500 text-white border-blue-600'
                    : isCheck
                    ? shouldRoundUp
                      ? 'bg-red-500 text-white border-red-600'
                      : 'bg-green-500 text-white border-green-600'
                    : 'bg-gray-200 text-gray-900 border-gray-300'
                }`}
              >
                {digit}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-4 mt-2 text-xs">
          <span className="text-kid-blue font-bold">● {targetPlace}</span>
          <span className={shouldRoundUp ? 'text-kid-red' : 'text-kid-green'}>
            ● 右隣: {checkDigit} ({shouldRoundUp ? '5以上→切り上げ' : '4以下→切り捨て'})
          </span>
        </div>
      </div>

      {/* Rule explanation */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-xs font-bold text-center text-kid-yellow mb-2">
          💡 四捨五入のルール / Rounding Rule
        </p>
        <div className="grid grid-cols-2 gap-2 text-center text-sm">
          <div className={`p-2 rounded ${!shouldRoundUp ? 'bg-kid-green/30' : 'bg-muted'}`}>
            <p className="font-bold">0-4</p>
            <p className="text-xs">切り捨て / Round down</p>
          </div>
          <div className={`p-2 rounded ${shouldRoundUp ? 'bg-kid-red/30' : 'bg-muted'}`}>
            <p className="font-bold">5-9</p>
            <p className="text-xs">切り上げ / Round up</p>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="bg-kid-green/20 rounded-lg p-4 border-2 border-kid-green text-center">
        <p className="text-xs text-muted-foreground mb-1">
          がい数（およその数）/ Approximate Number
        </p>
        <p className="text-2xl font-bold text-kid-green">
          {roundedNumber.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {targetPlace}まで / To the {targetPlaceEn}
        </p>
      </div>
    </div>
  );
};

export default RoundingOffVisualizer;
