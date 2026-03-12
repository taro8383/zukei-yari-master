interface FindingBaseVisualizerProps {
  comparedAmount: number;
  ratio: number;
  baseAmount: number;
}

const FindingBaseVisualizer = ({
  comparedAmount,
  ratio,
  baseAmount,
}: FindingBaseVisualizerProps) => {
  return (
    <div className="bg-kid-green/10 rounded-xl p-4 border border-kid-green/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        🚗 もとにする数を求める / Finding the Base Amount
      </p>

      {/* Toy car distance visual */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          ミニカーの距離 / Toy car distances
        </p>

        {/* Distance track */}
        <div className="relative py-6 px-4">
          {/* Track line */}
          <div className="h-1 bg-gray-300 rounded absolute left-4 right-4 top-1/2 -translate-y-1/2" />

          {/* Markers */}
          <div className="flex justify-between relative">
            {/* Base (sister's car) */}
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center border-2 border-pink-500 mb-2 mx-auto relative z-10">
                <span className="text-xl">🚗</span>
              </div>
              <div className="bg-pink-100 rounded px-2 py-1 border border-pink-300">
                <p className="text-xs font-bold text-pink-600">妹のミニカー</p>
                <p className="text-xs text-muted-foreground">Sister's car</p>
                <p className="text-lg font-bold text-pink-600">? cm</p>
                <p className="text-xs text-muted-foreground">(もとにする数)</p>
              </div>
            </div>

            {/* Multiplier indicator */}
            <div className="flex flex-col items-center justify-center pt-4">
              <div className="bg-kid-yellow/30 rounded-full px-3 py-1 border border-kid-yellow">
                <span className="text-sm font-bold text-kid-yellow">{ratio}倍</span>
              </div>
            </div>

            {/* Compared (Kei's car) */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center border-2 border-blue-500 mb-2 mx-auto relative z-10">
                <span className="text-xl">🏎️</span>
              </div>
              <div className="bg-blue-100 rounded px-2 py-1 border border-blue-300">
                <p className="text-xs font-bold text-blue-600">けいくんのミニカー</p>
                <p className="text-xs text-muted-foreground">Kei's car</p>
                <p className="text-lg font-bold text-blue-600">{comparedAmount} cm</p>
                <p className="text-xs text-muted-foreground">(くらべる数)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem statement */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          ❓ 問題 / Question
        </p>
        <p className="text-sm text-center">
          けいくんのミニカーは {comparedAmount}cm 進みました。これは妹のミニカーの {ratio} 倍のきょりです。妹のミニカーは何cm進みましたか？
        </p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          Kei's car traveled {comparedAmount}cm. This is {ratio} times his sister's car. How far did his sister's car travel?
        </p>
      </div>

      {/* Formula */}
      <div className="bg-kid-blue/20 rounded-lg p-3 mb-4 border border-kid-blue">
        <p className="text-xs font-bold text-kid-blue mb-2 text-center">
          📐 公式 / Formula
        </p>
        <div className="text-center text-sm">
          <p className="font-bold mb-1">
            くらべる数 ÷ 倍 = もとにする数
          </p>
          <p className="text-xs text-muted-foreground">
            Compared ÷ Multiple = Base
          </p>
        </div>
      </div>

      {/* Calculation */}
      <div className="bg-kid-green/20 rounded-lg p-3 mb-4 border border-kid-green">
        <p className="text-xs font-bold text-kid-green mb-2 text-center">
          📝 計算 / Calculation
        </p>
        <div className="flex justify-center items-center gap-2 text-lg font-bold">
          <span className="text-blue-600">{comparedAmount}</span>
          <span className="text-primary">÷</span>
          <span className="text-kid-yellow">{ratio}</span>
          <span className="text-muted-foreground">=</span>
          <span className="text-2xl text-kid-green">{baseAmount}</span>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-1">
          cm (センチメートル / centimeters)
        </p>
      </div>

      {/* Result */}
      <div className="bg-kid-green/20 rounded-lg p-4 border-2 border-kid-green text-center">
        <p className="text-xs text-muted-foreground mb-1">
          答え / Answer
        </p>
        <p className="text-3xl font-bold text-kid-green">
          {baseAmount}cm
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {baseAmount} centimeters
        </p>
      </div>

      {/* Key point */}
      <div className="mt-3 bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 「もとにする数」を求めるときは「くらべる数 ÷ 倍」/ To find the base, divide compared by multiple
        </p>
      </div>
    </div>
  );
};

export default FindingBaseVisualizer;
