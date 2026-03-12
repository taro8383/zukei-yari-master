interface DecimalRatioVisualizerProps {
  correctAnswers: number;
  totalQuestions: number;
  decimalResult: number;
}

const DecimalRatioVisualizer = ({
  correctAnswers,
  totalQuestions,
  decimalResult,
}: DecimalRatioVisualizerProps) => {
  // Generate circles for visual representation
  const circles = Array.from({ length: totalQuestions }, (_, i) => i < correctAnswers);

  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🎯 割合を小数で求める / Finding the Ratio as a Decimal
      </p>

      {/* Visual representation with circles */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          テストの結果 / Test Results
        </p>
        <div className="flex justify-center gap-2 flex-wrap mb-3">
          {circles.map((isCorrect, idx) => (
            <div
              key={idx}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2 ${
                isCorrect
                  ? 'bg-green-500 text-white border-green-600'
                  : 'bg-gray-300 text-gray-500 border-gray-400'
              }`}
            >
              {isCorrect ? '〇' : '×'}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 text-xs">
          <span className="text-green-600 font-bold">〇 正解: {correctAnswers}</span>
          <span className="text-gray-500 font-bold">× 不正解: {totalQuestions - correctAnswers}</span>
        </div>
      </div>

      {/* Formula explanation */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          💡 公式 / Formula
        </p>
        <div className="text-center text-sm">
          <p className="mb-1">
            <span className="font-bold">正解の数</span> ÷ <span className="font-bold">全部の数</span> = <span className="font-bold">割合（小数）</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Correct Answers ÷ Total Questions = Ratio (decimal)
          </p>
        </div>
      </div>

      {/* Calculation step */}
      <div className="bg-kid-purple/20 rounded-lg p-3 mb-4 border border-kid-purple">
        <p className="text-xs font-bold text-kid-purple mb-2 text-center">
          📝 計算 / Calculation
        </p>
        <div className="flex justify-center items-center gap-2 text-lg font-bold">
          <span className="text-green-600">{correctAnswers}</span>
          <span className="text-primary">÷</span>
          <span className="text-gray-500">{totalQuestions}</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-2xl text-kid-blue">{decimalResult}</span>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-1">
          倍 / times
        </p>
      </div>

      {/* Result */}
      <div className="bg-kid-green/20 rounded-lg p-4 border-2 border-kid-green text-center">
        <p className="text-xs text-muted-foreground mb-1">
          答え / Answer
        </p>
        <p className="text-3xl font-bold text-kid-green">
          {decimalResult}倍
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {decimalResult} times
        </p>
      </div>

      {/* Key point */}
      <div className="mt-3 bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 「何倍か」を求めるときは、小さい数を大きい数で割る / To find "how many times", divide the smaller by the larger
        </p>
      </div>
    </div>
  );
};

export default DecimalRatioVisualizer;
