import { useState } from 'react';

interface DrawingGraphInteractiveProps {
  tableData: Array<{ x: string; y: number }>;
  plottedPoints: Array<{ x: number; y: number }>;
  onPointPlot?: (x: number, y: number) => void;
  yAxisMin: number;
  yAxisMax: number;
  yAxisLabel: string;
  graded: boolean;
}

const DrawingGraphInteractive = ({
  tableData,
  plottedPoints,
  onPointPlot,
  yAxisMin,
  yAxisMax,
  yAxisLabel,
  graded,
}: DrawingGraphInteractiveProps) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');

  // SVG dimensions
  const width = 400;
  const height = 280;
  const margin = { top: 40, right: 40, bottom: 60, left: 60 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const numPoints = tableData.length;

  // Calculate scales
  const xScale = (index: number) => (index / (numPoints - 1 || 1)) * graphWidth;
  const yScale = (value: number) => {
    return graphHeight - ((value - yAxisMin) / (yAxisMax - yAxisMin)) * graphHeight;
  };

  // Generate Y-axis tick marks
  const tickInterval = Math.ceil((yAxisMax - yAxisMin) / 5);
  const yTicks: number[] = [];
  for (let v = yAxisMin; v <= yAxisMax; v += tickInterval) {
    yTicks.push(v);
  }

  // Handle day selection
  const handleDayClick = (dayIndex: number) => {
    if (graded) return;
    setSelectedDay(dayIndex);
    const existingPoint = plottedPoints.find(p => p.x === dayIndex);
    setInputValue(existingPoint ? String(existingPoint.y) : '');
  };

  // Handle value submission
  const handleSubmit = () => {
    if (selectedDay === null || inputValue === '') return;
    const value = parseInt(inputValue);
    if (value >= yAxisMin && value <= yAxisMax) {
      onPointPlot?.(selectedDay, value);
      setInputValue('');
      setSelectedDay(null);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      {/* Input section */}
      {selectedDay !== null && !graded && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 animate-bounce-in">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="font-bold text-lg">
              {tableData[selectedDay].x} の値は？
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-24 h-12 text-center text-xl font-bold rounded-lg border-2 border-primary bg-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="?"
                autoFocus
              />
              <button
                onClick={handleSubmit}
                disabled={inputValue === ''}
                className="px-4 h-12 bg-primary text-primary-foreground font-bold rounded-lg disabled:opacity-50 hover:bg-primary/90 transition-colors"
              >
                決定
              </button>
              <button
                onClick={() => {
                  setSelectedDay(null);
                  setInputValue('');
                }}
                className="px-3 h-12 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            表を見て、{tableData[selectedDay].x} の数字を入力してね
          </p>
        </div>
      )}

      {/* Graph */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-md mx-auto"
      >
        {/* Background */}
        <rect x="0" y="0" width={width} height={height} fill="transparent" />

        {/* Grid background */}
        <rect
          x={margin.left}
          y={margin.top}
          width={graphWidth}
          height={graphHeight}
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1"
        />

        {/* Horizontal grid lines */}
        {yTicks.map((tick, i) => {
          const y = yScale(tick);
          return (
            <line
              key={`grid-${i}`}
              x1={margin.left}
              y1={margin.top + y}
              x2={margin.left + graphWidth}
              y2={margin.top + y}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="4,2"
            />
          );
        })}

        {/* Y-axis */}
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={margin.top + graphHeight}
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Y-axis label */}
        <text
          x={20}
          y={margin.top + graphHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90, 20, ${margin.top + graphHeight / 2})`}
          className="fill-foreground text-sm font-bold"
        >
          {yAxisLabel}
        </text>

        {/* Y-axis ticks and labels */}
        {yTicks.map((tick, i) => (
          <g key={`y-tick-${i}`}>
            <line
              x1={margin.left - 5}
              y1={margin.top + yScale(tick)}
              x2={margin.left}
              y2={margin.top + yScale(tick)}
              stroke="#334155"
              strokeWidth="2"
            />
            <text
              x={margin.left - 10}
              y={margin.top + yScale(tick) + 4}
              textAnchor="end"
              className="fill-foreground text-xs"
            >
              {tick}
            </text>
          </g>
        ))}

        {/* X-axis */}
        <line
          x1={margin.left}
          y1={margin.top + graphHeight}
          x2={margin.left + graphWidth}
          y2={margin.top + graphHeight}
          stroke="#334155"
          strokeWidth="2"
        />

        {/* X-axis ticks, labels, and clickable areas */}
        {tableData.map((row, i) => {
          const x = margin.left + xScale(i);
          const isSelected = selectedDay === i;
          const hasPoint = plottedPoints.find(p => p.x === i);
          const isCorrect = graded && hasPoint && hasPoint.y === row.y;
          const isWrong = graded && hasPoint && hasPoint.y !== row.y;

          return (
            <g key={`x-${i}`}>
              {/* Vertical guide line */}
              <line
                x1={x}
                y1={margin.top}
                x2={x}
                y2={margin.top + graphHeight}
                stroke={isSelected ? '#3b82f6' : '#e2e8f0'}
                strokeWidth={isSelected ? 2 : 1}
                strokeDasharray={isSelected ? '' : '4,2'}
              />

              {/* X-axis tick */}
              <line
                x1={x}
                y1={margin.top + graphHeight}
                x2={x}
                y2={margin.top + graphHeight + 5}
                stroke="#334155"
                strokeWidth="2"
              />

              {/* X-axis label */}
              <text
                x={x}
                y={margin.top + graphHeight + 18}
                textAnchor="middle"
                className="fill-foreground text-xs font-bold"
              >
                {row.x}
              </text>

              {/* Clickable target area (invisible but larger for easier clicking) */}
              {!graded && !hasPoint && (
                <circle
                  cx={x}
                  cy={margin.top + graphHeight - 20}
                  r="25"
                  fill="transparent"
                  className="cursor-pointer"
                  onClick={() => handleDayClick(i)}
                />
              )}

              {/* Target indicator - pulsing circle when not clicked */}
              {!graded && !hasPoint && (
                <g>
                  <circle
                    cx={x}
                    cy={margin.top + graphHeight - 20}
                    r="8"
                    fill="#cbd5e1"
                    className="cursor-pointer hover:fill-primary transition-colors"
                    onClick={() => handleDayClick(i)}
                  />
                  <text
                    x={x}
                    y={margin.top + graphHeight - 8}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[10px] pointer-events-none"
                  >
                    ?
                  </text>
                </g>
              )}

              {/* Plotted point */}
              {hasPoint && (
                <g>
                  <circle
                    cx={x}
                    cy={margin.top + yScale(hasPoint.y)}
                    r="8"
                    fill={isCorrect ? '#22c55e' : isWrong ? '#ef4444' : '#3b82f6'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={margin.top + yScale(hasPoint.y) - 12}
                    textAnchor="middle"
                    className={`text-xs font-bold ${isCorrect ? 'fill-green-600' : isWrong ? 'fill-red-600' : 'fill-blue-600'}`}
                  >
                    {hasPoint.y}
                  </text>
                  {isCorrect && (
                    <text
                      x={x + 15}
                      y={margin.top + yScale(hasPoint.y)}
                      className="fill-green-600 text-lg"
                    >
                      ✅
                    </text>
                  )}
                  {isWrong && (
                    <text
                      x={x + 15}
                      y={margin.top + yScale(hasPoint.y)}
                      className="fill-red-600 text-lg"
                    >
                      ❌
                    </text>
                  )}
                </g>
              )}
            </g>
          );
        })}

        {/* Connected line between plotted points */}
        {plottedPoints.length > 1 && (
          <polyline
            points={plottedPoints
              .sort((a, b) => a.x - b.x)
              .map(p => `${margin.left + xScale(p.x)},${margin.top + yScale(p.y)}`)
              .join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        )}
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-[10px]">?</div>
          <span className="text-muted-foreground">クリックして入力 / Click to enter</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-blue-500" />
          <span className="text-muted-foreground">入力済み / Entered</span>
        </div>
        {graded && (
          <>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-green-500" />
              <span className="text-muted-foreground">正解 / Correct</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <span className="text-muted-foreground">不正解 / Wrong</span>
            </div>
          </>
        )}
      </div>

      {/* Progress */}
      <div className="text-center text-sm">
        <span className="font-bold">{plottedPoints.length}</span>
        <span className="text-muted-foreground"> / {tableData.length} 点完了</span>
      </div>
    </div>
  );
};

export default DrawingGraphInteractive;
