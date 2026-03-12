interface CombiningEquationVisualizerProps {
  scenario: string;
  scenarioEn: string;
  numbers: number[];
  operations: string[];
  correctEquation: string;
  answer: number;
}

const CombiningEquationVisualizer = ({
  scenario,
  scenarioEn,
  numbers,
  operations,
  correctEquation,
  answer,
}: CombiningEquationVisualizerProps) => {
  // Parse the equation to show steps
  const isParenthesesFirst = correctEquation.includes('(');

  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📝 文章題から式を作る / Making Equations from Word Problems
      </p>

      {/* Scenario */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 mb-4 border border-kid-yellow">
        <p className="text-xs text-muted-foreground mb-1 text-center">
          問題 / Problem
        </p>
        <p className="text-sm text-foreground text-center font-medium">
          {scenario}
        </p>
        <p className="text-xs text-gray-500 text-center mt-1">
          {scenarioEn}
        </p>
      </div>

      {/* Numbers and operations available */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          使える数字と記号 / Available numbers and symbols
        </p>
        <div className="flex justify-center gap-2 flex-wrap mb-2">
          {numbers.map((num, idx) => (
            <div
              key={idx}
              className="bg-kid-green/20 rounded-lg px-3 py-1 border-2 border-kid-green"
            >
              <span className="font-bold text-kid-green">{num}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 flex-wrap">
          {operations.map((op, idx) => (
            <div
              key={idx}
              className="bg-kid-purple/20 rounded-lg px-3 py-1 border-2 border-kid-purple"
            >
              <span className="font-bold text-kid-purple">{op}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-step building */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-center text-muted-foreground">
          式を作るステップ / Steps to build the equation
        </p>

        {/* Step 1: Identify what to do first */}
        <div className="bg-kid-green/10 rounded-lg p-3 border border-kid-green">
          <p className="text-xs font-bold text-kid-green mb-2">
            ステップ1: 先に計算する部分を見つける / Step 1: Find what to calculate first
          </p>
          <div className="text-sm text-foreground text-center">
            {isParenthesesFirst ? (
              <p>
                かっこ ( ) で囲む部分 / Part in parentheses ( )
              </p>
            ) : (
              <p>
                先に計算する部分 / Part to calculate first
              </p>
            )}
          </div>
        </div>

        {/* Step 2: Build the equation */}
        <div className="bg-kid-purple/10 rounded-lg p-3 border border-kid-purple">
          <p className="text-xs font-bold text-kid-purple mb-2">
            ステップ2: 式を作る / Step 2: Build the equation
          </p>
          <div className="flex justify-center items-center gap-2">
            <div className="bg-background rounded-lg px-4 py-2 border-2 border-kid-purple">
              <span className="text-xl font-bold text-kid-purple">{correctEquation}</span>
            </div>
          </div>
        </div>

        {/* Step 3: Calculate */}
        <div className="bg-kid-green/10 rounded-lg p-3 border border-kid-green">
          <p className="text-xs font-bold text-kid-green mb-2">
            ステップ3: 計算する / Step 3: Calculate
          </p>
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg">{correctEquation}</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-2xl font-bold text-kid-green">{answer}</span>
          </div>
        </div>
      </div>

      {/* Visual flow */}
      <div className="mt-4 bg-background/70 rounded-lg p-3 border border-border">
        <p className="text-xs font-bold text-center text-muted-foreground mb-3">
          🔄 計算の流れ / Calculation Flow
        </p>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <div className="text-center">
            <div className="bg-kid-yellow/20 rounded-lg p-2 border-2 border-kid-yellow mb-1">
              <span className="text-xs">問題を読む</span>
            </div>
            <span className="text-xs text-muted-foreground">Read</span>
          </div>
          <span className="text-xl text-primary">→</span>
          <div className="text-center">
            <div className="bg-kid-blue/20 rounded-lg p-2 border-2 border-kid-blue mb-1">
              <span className="text-xs">順番を確認</span>
            </div>
            <span className="text-xs text-muted-foreground">Order</span>
          </div>
          <span className="text-xl text-primary">→</span>
          <div className="text-center">
            <div className="bg-kid-purple/20 rounded-lg p-2 border-2 border-kid-purple mb-1">
              <span className="text-xs">( ) をつける</span>
            </div>
            <span className="text-xs text-muted-foreground">( )</span>
          </div>
          <span className="text-xl text-primary">→</span>
          <div className="text-center">
            <div className="bg-kid-green/20 rounded-lg p-2 border-2 border-kid-green mb-1">
              <span className="text-xs">計算！</span>
            </div>
            <span className="text-xs text-muted-foreground">Calc</span>
          </div>
        </div>
      </div>

      {/* Key point */}
      <div className="mt-3 bg-kid-yellow/30 rounded-lg p-2 border border-kid-yellow text-center">
        <p className="text-xs font-bold text-kid-yellow">
          💡 先に計算する部分は ( ) で囲む！ / Use ( ) for the part to calculate first!
        </p>
      </div>
    </div>
  );
};

export default CombiningEquationVisualizer;
