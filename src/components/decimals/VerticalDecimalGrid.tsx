interface VerticalDecimalGridProps {
  num1: number;
  num2: number;
  operation: 'add' | 'subtract';
  decimalPlaces1: number;
  decimalPlaces2: number;
  gridAnswers: string[];
  onGridAnswerChange: (cellIndex: number, value: string) => void;
  graded: boolean;
}

const VerticalDecimalGrid = ({
  num1,
  num2,
  operation,
  decimalPlaces1,
  decimalPlaces2,
  gridAnswers,
  onGridAnswerChange,
  graded,
}: VerticalDecimalGridProps) => {
  // Determine the maximum decimal places needed
  const maxDecimalPlaces = Math.max(decimalPlaces1, decimalPlaces2);

  // Format numbers to have the same number of decimal places
  const formatNumber = (num: number, places: number) => {
    return num.toFixed(places);
  };

  const formattedNum1 = formatNumber(num1, maxDecimalPlaces);
  const formattedNum2 = formatNumber(num2, maxDecimalPlaces);

  // Parse digits for display (keeping the decimal point in the array)
  const getDigitsWithDecimal = (formatted: string) => {
    return formatted.split('');
  };

  const digitsWithDecimal1 = getDigitsWithDecimal(formattedNum1);
  const digitsWithDecimal2 = getDigitsWithDecimal(formattedNum2);

  // Calculate positions
  const integerDigits1 = formattedNum1.split('.')[0].length;
  const integerDigits2 = formattedNum2.split('.')[0].length;
  const maxIntegerDigits = Math.max(integerDigits1, integerDigits2);

  // Total columns needed (integer + decimal point + decimal)
  const totalColumns = maxIntegerDigits + 1 + maxDecimalPlaces;

  // Find decimal point column index (from left)
  const decimalPointColIndex = maxIntegerDigits;

  // Helper to get digit at column index
  const getDigitAtColumn = (digitsWithDec: string[], colIndex: number): string => {
    // Map grid column index to digit array index
    // The decimal point in digitsWithDec is at position (digitsWithDec.length - maxDecimalPlaces - 1)
    const digitDecimalPointIndex = digitsWithDec.indexOf('.');
    const integerStartIndexInDigits = 0;
    const integerEndIndexInDigits = digitDecimalPointIndex;
    const decimalStartIndexInDigits = digitDecimalPointIndex + 1;

    if (colIndex < decimalPointColIndex) {
      // Integer part - align to the right
      // Calculate which integer digit this column corresponds to
      const integerDigitsCount = integerEndIndexInDigits - integerStartIndexInDigits;
      const colFromRight = decimalPointColIndex - colIndex - 1; // 0 = ones, 1 = tens, etc.

      if (colFromRight < integerDigitsCount) {
        const digitIndex = integerEndIndexInDigits - 1 - colFromRight;
        return digitsWithDec[digitIndex] || '';
      }
      return '';
    } else if (colIndex === decimalPointColIndex) {
      // Decimal point
      return '.';
    } else {
      // Decimal part
      const decimalColIndex = colIndex - decimalPointColIndex - 1; // 0 = tenths, 1 = hundredths, etc.
      const digitIndex = decimalStartIndexInDigits + decimalColIndex;
      return digitsWithDec[digitIndex] || '';
    }
  };

  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📝 筆算のかたち / Vertical Format
      </p>

      <div className="flex justify-center">
        <div className="inline-block">
          {/* Operation symbol */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary w-8 text-center">
              {operation === 'add' ? '+' : '-'}
            </span>

            {/* Grid */}
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${totalColumns}, minmax(2rem, 1fr))` }}>
              {/* First number row */}
              {Array.from({ length: totalColumns }).map((_, colIndex) => {
                const digit = getDigitAtColumn(digitsWithDecimal1, colIndex);
                const isDecimalPoint = digit === '.';

                if (isDecimalPoint) {
                  return (
                    <div
                      key={`num1-dec-${colIndex}`}
                      className="w-8 h-10 flex items-center justify-center text-xl font-bold"
                    >
                      .
                    </div>
                  );
                }

                return (
                  <div
                    key={`num1-${colIndex}`}
                    className="w-8 h-10 flex items-center justify-center bg-background rounded border border-border text-lg font-bold"
                  >
                    {digit}
                  </div>
                );
              })}

              {/* Second number row */}
              {Array.from({ length: totalColumns }).map((_, colIndex) => {
                const digit = getDigitAtColumn(digitsWithDecimal2, colIndex);
                const isDecimalPoint = digit === '.';

                if (isDecimalPoint) {
                  return (
                    <div
                      key={`num2-dec-${colIndex}`}
                      className="w-8 h-10 flex items-center justify-center text-xl font-bold"
                    >
                      .
                    </div>
                  );
                }

                return (
                  <div
                    key={`num2-${colIndex}`}
                    className="w-8 h-10 flex items-center justify-center bg-background rounded border border-border text-lg font-bold"
                  >
                    {digit}
                  </div>
                );
              })}

              {/* Separator line */}
              <div className="col-span-full h-0.5 bg-foreground my-1" />

              {/* Answer input row */}
              {Array.from({ length: totalColumns }).map((_, colIndex) => {
                const isDecimalPoint = colIndex === decimalPointColIndex;

                if (isDecimalPoint) {
                  return (
                    <div
                      key={`answer-dec-${colIndex}`}
                      className="w-8 h-10 flex items-center justify-center text-xl font-bold text-primary"
                    >
                      .
                    </div>
                  );
                }

                return (
                  <input
                    key={`answer-${colIndex}`}
                    type="text"
                    maxLength={1}
                    value={gridAnswers[colIndex] || ''}
                    onChange={(e) => onGridAnswerChange(colIndex, e.target.value.replace(/[^0-9]/g, ''))}
                    disabled={graded}
                    className="w-8 h-10 text-center text-lg font-bold rounded border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Helper text */}
      <p className="text-xs text-center text-muted-foreground mt-3">
        小数点の位置をそろえて計算しよう / Align decimal points to calculate
      </p>
    </div>
  );
};

export default VerticalDecimalGrid;
