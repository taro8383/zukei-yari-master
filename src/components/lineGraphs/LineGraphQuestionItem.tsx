import { useState } from 'react';
import { LineGraphQuestion } from '@/lib/lineGraphs';
import LineGraphVisualizer from './LineGraphVisualizer';

interface LineGraphQuestionItemProps {
  question: LineGraphQuestion;
  index: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  // For dropdown questions (slope topic)
  startTimeAnswer?: string;
  endTimeAnswer?: string;
  onStartTimeChange?: (value: string) => void;
  onEndTimeChange?: (value: string) => void;
  // For drawing graph topic
  plottedPoints?: Array<{ x: number; y: number }>;
  onPointPlot?: (x: number, y: number) => void;
  onClearPoints?: () => void;
  graded: boolean;
  isCorrect?: boolean;
}

const LineGraphQuestionItem = ({
  question,
  index,
  userAnswer,
  onAnswerChange,
  startTimeAnswer,
  endTimeAnswer,
  onStartTimeChange,
  onEndTimeChange,
  plottedPoints,
  onPointPlot,
  onClearPoints,
  graded,
  isCorrect,
}: LineGraphQuestionItemProps) => {
  const [showHint, setShowHint] = useState(false);

  // Get hint text based on topic
  const getHintText = () => {
    switch (question.topic) {
      case 'reading-graph':
        return {
          ja: (
            <>
              💡 <strong>グラフの読み方:</strong><br />
              ① 横じく（時間）を見る<br />
              ② 縦じく（数）の目盛りを確認<br />
              ③ 点の位置から値を読む
            </>
          ),
          en: (
            <>
              <strong>How to read the graph:</strong><br />
              1. Look at the horizontal axis (time)<br />
              2. Check the vertical axis scale<br />
              3. Read the value from the point
            </>
          ),
        };
      case 'change-slope':
        return {
          ja: (
            <>
              💡 <strong>傾きの見方:</strong><br />
              急な右上がり ＝ 大きく増えた<br />
              平ら ＝ 変わらない<br />
              右下がり ＝ 減った
            </>
          ),
          en: (
            <>
              <strong>Reading the slope:</strong><br />
              Steep up = increased a lot<br />
              Flat = no change<br />
              Going down = decreased
            </>
          ),
        };
      case 'wavy-line':
        return {
          ja: (
            <>
              💡 <strong>波線の意味:</strong><br />
              波線（〜）は「ここの数は飛ばしたよ」というマーク。<br />
              変化を大きく見せたいときに使うよ。
            </>
          ),
          en: (
            <>
              <strong>What the wavy line means:</strong><br />
              The wavy line means "we skipped these numbers."<br />
              Used to make changes look bigger.
            </>
          ),
        };
      case 'comparing-two-graphs':
        return {
          ja: (
            <>
              💡 <strong>2つの線の比べ方:</strong><br />
              ① 同じ月（横じく）の値を2本の線で読む<br />
              ② 高い方から低い方をひき算する<br />
              例：東京25℃、札幌18℃ → 25 - 18 = 7℃
            </>
          ),
          en: (
            <>
              <strong>How to compare two lines:</strong><br />
              1. Read both lines at the same month (horizontal)<br />
              2. Subtract the lower from the higher<br />
              Example: Tokyo 25°C, Sapporo 18°C → 25 - 18 = 7°C
            </>
          ),
        };
      case 'drawing-graph':
        return {
          ja: (
            <>
              💡 <strong>グラフの書き方:</strong><br />
              ① 表を見て、何日目の値をグラフに書くか選ぶ<br />
              ② グラフの下の「？」をクリックする<br />
              ③ 表の数字を思い出して入力する
            </>
          ),
          en: (
            <>
              <strong>How to draw the graph:</strong><br />
              1. Look at the table and decide which day to plot<br />
              2. Click the "?" below the graph<br />
              3. Remember and enter the value from the table
            </>
          ),
        };
      default:
        return { ja: '', en: '' };
    }
  };

  const hintText = getHintText();

  // Check if this is a dropdown question (slope topic)
  const isDropdownQuestion = question.topic === 'change-slope' && question.options;

  // Check if this is comparing two graphs
  const isComparingTwoGraphs = question.topic === 'comparing-two-graphs';

  // Check if this is drawing graph topic
  const isDrawingGraph = question.topic === 'drawing-graph';

  // Check if dropdowns are answered
  const dropdownsAnswered = isDropdownQuestion
    ? startTimeAnswer && endTimeAnswer
    : true;

  return (
    <div
      className={`bg-card rounded-2xl shadow-kid p-5 border-2 transition-all ${
        graded
          ? isCorrect
            ? 'border-correct'
            : 'border-incorrect'
          : 'border-border hover:border-primary/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="text-lg font-medium leading-relaxed">{question.text}</p>
          <p className="text-sm text-gray-500 mb-4">{question.textEn}</p>

          {/* Line Graph Visualizer */}
          <div className="mb-4">
            {isComparingTwoGraphs && question.secondDataPoints ? (
              <LineGraphVisualizer
                dataPoints={question.dataPoints}
                secondDataPoints={question.secondDataPoints}
                line1Label={question.line1Label}
                line1LabelEn={question.line1LabelEn}
                line2Label={question.line2Label}
                line2LabelEn={question.line2LabelEn}
                xAxisLabel={question.xAxisLabel}
                xAxisLabelEn={question.xAxisLabelEn}
                yAxisLabel={question.yAxisLabel}
                yAxisLabelEn={question.yAxisLabelEn}
                yAxisMin={question.yAxisMin}
                yAxisMax={question.yAxisMax}
                tickInterval={question.tickInterval}
                hasWavyLine={false}
                isComparing={true}
              />
            ) : isDrawingGraph && question.tableData ? (
              <>
                {/* Table Display - Reference only */}
                <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30 mb-4">
                  <p className="text-sm font-bold text-foreground mb-2 text-center">
                    📊 表 / Table (参考)
                  </p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {question.tableData.map((row, idx) => (
                      <div key={idx} className="text-center bg-white rounded-lg px-3 py-2 shadow-sm">
                        <div className="text-xs text-muted-foreground">{row.x}</div>
                        <div className="text-lg font-bold text-primary">{row.y}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Graph with Click-to-Select */}
                <div className="bg-white rounded-xl p-4 border-2 border-kid-blue/30 mb-4">
                  <p className="text-sm font-bold text-foreground mb-3 text-center">
                    ✏️ グラフに点を打とう！/ Click a day below, then enter the value
                  </p>
                  <DrawingGraphInteractive
                    tableData={question.tableData}
                    plottedPoints={plottedPoints || []}
                    onPointPlot={onPointPlot}
                    yAxisMin={question.yAxisMin}
                    yAxisMax={question.yAxisMax}
                    yAxisLabel={question.yAxisLabel}
                    graded={graded}
                  />
                </div>

                {/* Clear button */}
                {!graded && (
                  <div className="flex justify-center mt-3">
                    <button
                      onClick={onClearPoints}
                      disabled={!plottedPoints || plottedPoints.length === 0}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed text-red-700 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
                    >
                      <span>🗑️</span>
                      <span>全部消す / Clear All</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <LineGraphVisualizer
                dataPoints={question.dataPoints}
                xAxisLabel={question.xAxisLabel}
                xAxisLabelEn={question.xAxisLabelEn}
                yAxisLabel={question.yAxisLabel}
                yAxisLabelEn={question.yAxisLabelEn}
                yAxisMin={question.yAxisMin}
                yAxisMax={question.yAxisMax}
                tickInterval={question.tickInterval}
                hasWavyLine={question.hasWavyLine}
                wavyLineBase={question.wavyLineBase}
              />
            )}
          </div>

          {/* Hint Toggle */}
          {!graded && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-gray-500 hover:text-primary transition-colors mb-3 flex items-center gap-1"
            >
              <span>{showHint ? '💡 ヒントをかくす' : '💡 ヒントをみる'}</span>
              <span className="text-xs">({showHint ? 'Hide hint' : 'Show hint'})</span>
            </button>
          )}

          {/* Hint */}
          {(showHint || graded) && !isCorrect && (
            <div className="bg-kid-yellow/10 rounded-lg p-3 mb-4 text-sm">
              {graded ? (
                <>
                  <p className="font-medium text-foreground">{question.explanation}</p>
                  <p className="text-gray-500">{question.explanationEn}</p>
                </>
              ) : (
                <>
                  <div className="font-medium text-foreground">{hintText.ja}</div>
                  <div className="text-gray-500">{hintText.en}</div>
                </>
              )}
            </div>
          )}

          {/* Answer Input Section */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex flex-col">
              <span className="text-foreground font-medium">答え：</span>
              <span className="text-xs text-gray-500">Answer:</span>
            </div>

            {isDropdownQuestion && question.options ? (
              // Dropdown inputs for slope questions
              <div className="flex items-center gap-2 flex-wrap">
                {!graded ? (
                  <>
                    <select
                      value={startTimeAnswer || ''}
                      onChange={(e) => onStartTimeChange?.(e.target.value)}
                      disabled={graded}
                      className="h-12 px-3 text-lg font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                    >
                      <option value="">--</option>
                      {question.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span className="text-foreground">から</span>
                    <select
                      value={endTimeAnswer || ''}
                      onChange={(e) => onEndTimeChange?.(e.target.value)}
                      disabled={graded}
                      className="h-12 px-3 text-lg font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                    >
                      <option value="">--</option>
                      {question.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span className="text-foreground">の間</span>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={`${startTimeAnswer} から ${endTimeAnswer} の間`}
                      disabled
                      className="w-64 h-12 text-center text-lg font-bold rounded-xl border-2 border-input bg-background opacity-60"
                    />
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="text-4xl font-black text-green-500">〇</span>
                      ) : (
                        <span className="text-3xl font-black text-red-500">×</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Regular number input for other questions
              <>
                {!graded ? (
                  <input
                    type="number"
                    step={question.tickInterval < 1 ? '0.1' : '1'}
                    value={userAnswer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    disabled={graded}
                    className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                    placeholder="?"
                  />
                ) : (
                  <>
                    <input
                      type="number"
                      value={userAnswer}
                      disabled
                      className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background opacity-60"
                    />
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="text-4xl font-black text-green-500">〇</span>
                      ) : (
                        <span className="text-3xl font-black text-red-500">×</span>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Formula for incorrect answers */}
          {graded && !isCorrect && (
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-sm text-red-500 font-bold">
                {question.formula}
              </span>
              <span className="text-xs text-red-400 block">
                {question.formulaEn}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LineGraphQuestionItem;
