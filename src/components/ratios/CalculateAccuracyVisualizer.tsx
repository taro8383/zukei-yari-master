interface CalculateAccuracyVisualizerProps {
  correctAnswers: number;
  totalQuestions: number;
  accuracyPercent: number;
}

const CalculateAccuracyVisualizer = ({
  correctAnswers,
  totalQuestions,
  accuracyPercent,
}: CalculateAccuracyVisualizerProps) => {
  // Generate circles for visual representation
  const circles = Array.from({ length: totalQuestions }, (_, i) => i < correctAnswers);

  return (
    <div className="bg-kid-green/10 rounded-xl p-4 border border-kid-green/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🏆 正答率を計算しよう！/ Let's Calculate the Accuracy Rate!
      </p>

      {/* Visual representation */}
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

      {/* Step by step calculation */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-center text-muted-foreground">
          計算のステップ / Calculation Steps
        </p>

        {/* Step 1: Division */}
        <div className="bg-kid-yellow/20 rounded-lg p-2 border border-kid-yellow">
          <p className="text-xs font-bold text-kid-yellow mb-1">
            ステップ1: 割合を小数で求める / Step 1: Find Ratio as Decimal
          </p>
          <div className="flex justify-center items-center gap-2 text-lg font-bold">
            <span className="text-green-600">{correctAnswers}</span>
            <span className="text-primary">÷</span>
            <span className="text-gray-500">{totalQuestions}</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-kid-blue">{(correctAnswers / totalQuestions).toFixed(2)}</span>
          </div>
        </div>

        {/* Step 2: Convert to percent */}
        <div className="bg-kid-purple/20 rounded-lg p-2 border border-kid-purple">
          <p className="text-xs font-bold text-kid-purple mb-1">
            ステップ2: パーセントに変換 / Step 2: Convert to Percent
          </p>
          <div className="flex justify-center items-center gap-2 text-lg font-bold">
            <span className="text-kid-blue">{(correctAnswers / totalQuestions).toFixed(2)}</span>
            <span className="text-primary">×</span>
            <span className="text-kid-purple">100</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-kid-green">{accuracyPercent}%</span>
          </div>
        </div>
      </div>

      {/* Combined formula */}
      <div className="mt-3 bg-kid-blue/20 rounded-lg p-3 border border-kid-blue">
        <p className="text-xs font-bold text-kid-blue mb-2 text-center">
          📐 まとめた公式 / Combined Formula
        </p>
        <div className="text-center text-sm">
          <p className="font-bold mb-1">
            正解数 ÷ 問題総数 × 100 = 正答率
          </p>
          <p className="text-xs text-muted-foreground">
            Correct ÷ Total × 100 = Accuracy %
          </p>
          <div className="mt-2 flex justify-center items-center gap-2 font-bold">
            <span>{correctAnswers}</span>
            <span className="text-primary">÷</span>
            <span>{totalQuestions}</span>
            <span className="text-primary">×</span>
            <span>100</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-xl text-kid-green">{accuracyPercent}%</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="mt-3 bg-kid-green/20 rounded-lg p-4 border-2 border-kid-green text-center">
        <p className="text-xs text-muted-foreground mb-1">
          正答率 / Accuracy Rate
        </p>
        <p className="text-3xl font-bold text-kid-green">
          {accuracyPercent}%
        </p>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-kid-green h-4 rounded-full transition-all duration-1000"
            style={{ width: `${accuracyPercent}%` }}
          />
        </div>
      </div>

      {/* Key point */}
      <div className="mt-3 bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 正答率は「正解数÷総数×100」で求められる / Accuracy rate = Correct ÷ Total × 100
        </p>
      </div>
    </div>
  );
};

export default CalculateAccuracyVisualizer;
