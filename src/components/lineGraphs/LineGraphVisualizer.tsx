import { useState } from 'react';
import { LineGraphDataPoint } from '@/lib/lineGraphs';

interface LineGraphVisualizerProps {
  dataPoints: LineGraphDataPoint[];
  xAxisLabel: string;
  xAxisLabelEn: string;
  yAxisLabel: string;
  yAxisLabelEn: string;
  yAxisMin: number;
  yAxisMax: number;
  tickInterval: number;
  hasWavyLine?: boolean;
  wavyLineBase?: number;
  // For comparing two graphs
  secondDataPoints?: LineGraphDataPoint[];
  line1Label?: string;
  line1LabelEn?: string;
  line2Label?: string;
  line2LabelEn?: string;
  isComparing?: boolean;
  // For drawing graph
  tableData?: Array<{ x: string; y: number }>;
  isDrawing?: boolean;
  onPointPlot?: (x: number, y: number) => void;
  graded?: boolean;
}

const LineGraphVisualizer = ({
  dataPoints,
  xAxisLabel,
  xAxisLabelEn,
  yAxisLabel,
  yAxisLabelEn,
  yAxisMin,
  yAxisMax,
  tickInterval,
  hasWavyLine = false,
  wavyLineBase,
  secondDataPoints,
  line1Label,
  line1LabelEn,
  line2Label,
  line2LabelEn,
  isComparing = false,
  tableData,
  isDrawing = false,
  onPointPlot,
  graded = false,
}: LineGraphVisualizerProps) => {
  // Track hover position for drawing mode
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number; value: number } | null>(null);

  // SVG dimensions and margins
  const width = 400;
  const height = 280;
  const margin = { top: 40, right: 40, bottom: 60, left: 60 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  // Number of data points (for drawing mode, use tableData length)
  const numPoints = isDrawing && tableData ? tableData.length : Math.max(dataPoints.length, secondDataPoints?.length || 0);

  // Calculate scales
  const xScale = (index: number) => (index / (numPoints - 1 || 1)) * graphWidth;
  const yScale = (value: number) => {
    const effectiveMin = hasWavyLine && wavyLineBase !== undefined ? wavyLineBase : yAxisMin;
    return graphHeight - ((value - effectiveMin) / (yAxisMax - effectiveMin)) * graphHeight;
  };

  // Generate Y-axis tick marks
  const effectiveMin = hasWavyLine && wavyLineBase !== undefined ? wavyLineBase : yAxisMin;
  const yTicks: number[] = [];
  for (let v = effectiveMin; v <= yAxisMax; v += tickInterval) {
    yTicks.push(Math.round(v * 100) / 100);
  }

  // Generate grid lines
  const gridLines = yTicks.map((tick) => ({
    y: yScale(tick),
    value: tick,
  }));

  // Handle grid click for drawing mode with proper SVG coordinate transformation
  const handleGridClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || !onPointPlot || graded) return;

    const svg = e.currentTarget;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;

    // Transform screen coordinates to SVG coordinates
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());

    // Convert to graph coordinates
    const graphX = svgPoint.x - margin.left;
    const graphY = svgPoint.y - margin.top;

    // Find nearest grid intersection with tolerance
    const xIndex = Math.round((graphX / graphWidth) * (numPoints - 1));
    const yValue = effectiveMin + ((graphHeight - graphY) / graphHeight) * (yAxisMax - effectiveMin);

    // For drawing mode, snap to nearest integer (1), not tick interval
    // This allows users to plot any integer value, not just values on labeled ticks
    const snappedY = Math.round(yValue);

    if (xIndex >= 0 && xIndex < numPoints && snappedY >= effectiveMin && snappedY <= yAxisMax) {
      onPointPlot(xIndex, snappedY);
    }
  };

  // Handle mouse move for hover effect in drawing mode
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || graded) return;

    const svg = e.currentTarget;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;

    // Transform screen coordinates to SVG coordinates
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());

    // Convert to graph coordinates
    const graphX = svgPoint.x - margin.left;
    const graphY = svgPoint.y - margin.top;

    // Calculate Y value at this position
    const yValue = effectiveMin + ((graphHeight - graphY) / graphHeight) * (yAxisMax - effectiveMin);
    const snappedY = Math.round(yValue);

    if (snappedY >= effectiveMin && snappedY <= yAxisMax) {
      setHoverPos({ x: svgPoint.x, y: svgPoint.y, value: snappedY });
    }
  };

  const handleMouseLeave = () => {
    setHoverPos(null);
  };

  // Handle touch events for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!isDrawing || graded) return;
    handleTouchMove(e);
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!isDrawing || graded) return;
    e.preventDefault(); // Prevent scrolling while drawing

    const svg = e.currentTarget;
    const touch = e.touches[0];
    const point = svg.createSVGPoint();
    point.x = touch.clientX;
    point.y = touch.clientY;

    // Transform screen coordinates to SVG coordinates
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());

    // Convert to graph coordinates
    const graphX = svgPoint.x - margin.left;
    const graphY = svgPoint.y - margin.top;

    // Calculate Y value at this position
    const yValue = effectiveMin + ((graphHeight - graphY) / graphHeight) * (yAxisMax - effectiveMin);
    const snappedY = Math.round(yValue);

    if (snappedY >= effectiveMin && snappedY <= yAxisMax) {
      setHoverPos({ x: svgPoint.x, y: svgPoint.y, value: snappedY });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!isDrawing || !onPointPlot || graded || !hoverPos) return;

    const svg = e.currentTarget;
    // Get the last touch position
    const touch = e.changedTouches[0];
    const point = svg.createSVGPoint();
    point.x = touch.clientX;
    point.y = touch.clientY;

    // Transform screen coordinates to SVG coordinates
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());

    // Convert to graph coordinates
    const graphX = svgPoint.x - margin.left;

    // Find nearest X index
    const xIndex = Math.round((graphX / graphWidth) * (numPoints - 1));

    if (xIndex >= 0 && xIndex < numPoints) {
      onPointPlot(xIndex, hoverPos.value);
    }
  };

  // Get X labels for drawing mode
  const xLabels = isDrawing && tableData ? tableData.map(d => d.x) : dataPoints.map(d => d.x);

  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        {isDrawing ? '✏️ グラフを書こう / Draw the Graph' : isComparing ? '📊 2つのグラフ / Two Graphs' : '📊 折れ線グラフ / Line Graph'}
      </p>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-md mx-auto cursor-crosshair touch-none"
        onClick={handleGridClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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

        {/* Grid lines for drawing mode */}
        {isDrawing && (
          <>
            {/* Vertical grid lines */}
            {Array.from({ length: numPoints }).map((_, i) => (
              <line
                key={`v-grid-${i}`}
                x1={margin.left + xScale(i)}
                y1={margin.top}
                x2={margin.left + xScale(i)}
                y2={margin.top + graphHeight}
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            ))}
            {/* Horizontal grid lines at each tick */}
            {gridLines.map((line, i) => (
              <line
                key={`h-grid-draw-${i}`}
                x1={margin.left}
                y1={margin.top + line.y}
                x2={margin.left + graphWidth}
                y2={margin.top + line.y}
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            ))}
          </>
        )}

        {/* Horizontal grid lines */}
        {!isDrawing && gridLines.map((line, i) => (
          <line
            key={`grid-h-${i}`}
            x1={margin.left}
            y1={margin.top + line.y}
            x2={margin.left + graphWidth}
            y2={margin.top + line.y}
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="4,2"
          />
        ))}

        {/* Wavy line at bottom (if applicable) */}
        {hasWavyLine && wavyLineBase !== undefined && (
          <g>
            {/* Wavy line pattern */}
            <path
              d={`M ${margin.left - 5} ${margin.top + graphHeight - 10}
                  Q ${margin.left + 3} ${margin.top + graphHeight - 15} ${margin.left + 6} ${margin.top + graphHeight - 10}
                  Q ${margin.left + 9} ${margin.top + graphHeight - 5} ${margin.left + 12} ${margin.top + graphHeight - 10}
                  Q ${margin.left + 15} ${margin.top + graphHeight - 15} ${margin.left + 18} ${margin.top + graphHeight - 10}`}
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
            />
            <text
              x={margin.left + 25}
              y={margin.top + graphHeight - 6}
              className="fill-muted-foreground text-xs"
            >
              省略
            </text>
          </g>
        )}

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
        <text
          x={35}
          y={margin.top + graphHeight / 2 + 15}
          textAnchor="middle"
          transform={`rotate(-90, 35, ${margin.top + graphHeight / 2 + 15})`}
          className="fill-muted-foreground text-xs"
        >
          {yAxisLabelEn}
        </text>

        {/* Y-axis ticks and labels */}
        {gridLines.map((line, i) => (
          <g key={`y-tick-${i}`}>
            <line
              x1={margin.left - 5}
              y1={margin.top + line.y}
              x2={margin.left}
              y2={margin.top + line.y}
              stroke="#334155"
              strokeWidth="2"
            />
            <text
              x={margin.left - 10}
              y={margin.top + line.y + 4}
              textAnchor="end"
              className="fill-foreground text-xs"
            >
              {line.value.toFixed(tickInterval < 1 ? 1 : 0)}
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

        {/* X-axis label */}
        <text
          x={margin.left + graphWidth / 2}
          y={height - 15}
          textAnchor="middle"
          className="fill-foreground text-sm font-bold"
        >
          {xAxisLabel}
        </text>
        <text
          x={margin.left + graphWidth / 2}
          y={height - 2}
          textAnchor="middle"
          className="fill-muted-foreground text-xs"
        >
          {xAxisLabelEn}
        </text>

        {/* X-axis ticks and labels */}
        {xLabels.map((label, i) => (
          <g key={`x-tick-${i}`}>
            <line
              x1={margin.left + xScale(i)}
              y1={margin.top + graphHeight}
              x2={margin.left + xScale(i)}
              y2={margin.top + graphHeight + 5}
              stroke="#334155"
              strokeWidth="2"
            />
            <text
              x={margin.left + xScale(i)}
              y={margin.top + graphHeight + 18}
              textAnchor="middle"
              className="fill-foreground text-xs"
            >
              {label}
            </text>
          </g>
        ))}

        {/* First line graph (blue) */}
        {!isDrawing && dataPoints.length > 0 && (
          <>
            <polyline
              points={dataPoints
                .map((point, i) => `${margin.left + xScale(i)},${margin.top + yScale(point.y)}`)
                .join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {dataPoints.map((point, i) => (
              <g key={`point-${i}`}>
                <circle
                  cx={margin.left + xScale(i)}
                  cy={margin.top + yScale(point.y)}
                  r="6"
                  fill="#3b82f6"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                {/* Value label above point */}
                <text
                  x={margin.left + xScale(i)}
                  y={margin.top + yScale(point.y) - 10}
                  textAnchor="middle"
                  className="fill-foreground text-xs font-bold"
                >
                  {point.y.toFixed(tickInterval < 1 ? 1 : 0)}
                </text>
              </g>
            ))}
          </>
        )}

        {/* Second line graph (red/orange) for comparing */}
        {isComparing && secondDataPoints && secondDataPoints.length > 0 && (
          <>
            <polyline
              points={secondDataPoints
                .map((point, i) => `${margin.left + xScale(i)},${margin.top + yScale(point.y)}`)
                .join(' ')}
              fill="none"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Second line data points */}
            {secondDataPoints.map((point, i) => (
              <g key={`point2-${i}`}>
                <circle
                  cx={margin.left + xScale(i)}
                  cy={margin.top + yScale(point.y)}
                  r="6"
                  fill="#f97316"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                {/* Value label above point */}
                <text
                  x={margin.left + xScale(i)}
                  y={margin.top + yScale(point.y) - 10}
                  textAnchor="middle"
                  className="fill-foreground text-xs font-bold"
                >
                  {point.y.toFixed(tickInterval < 1 ? 1 : 0)}
                </text>
              </g>
            ))}
          </>
        )}

        {/* User plotted points for drawing mode */}
        {isDrawing && dataPoints.length > 0 && (
          <>
            <polyline
              points={dataPoints
                .map((point, i) => `${margin.left + xScale(point.x)},${margin.top + yScale(point.y)}`)
                .join(' ')}
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* User's plotted points */}
            {dataPoints.map((point, i) => (
              <g key={`user-point-${i}`}>
                <circle
                  cx={margin.left + xScale(point.x)}
                  cy={margin.top + yScale(point.y)}
                  r="6"
                  fill="#22c55e"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </g>
            ))}
          </>
        )}

        {/* Hover indicator for drawing mode */}
        {isDrawing && hoverPos && !graded && (
          <g>
            {/* Horizontal guide line */}
            <line
              x1={margin.left}
              y1={hoverPos.y}
              x2={margin.left + graphWidth}
              y2={hoverPos.y}
              stroke="#ef4444"
              strokeWidth="1"
              strokeDasharray="4,2"
              opacity="0.5"
            />
            {/* Y-value label */}
            <rect
              x={margin.left - 50}
              y={hoverPos.y - 10}
              width="45"
              height="20"
              fill="#ef4444"
              rx="4"
            />
            <text
              x={margin.left - 28}
              y={hoverPos.y + 4}
              textAnchor="middle"
              className="fill-white text-xs font-bold"
            >
              {hoverPos.value}
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-3 text-xs flex-wrap">
        {isComparing ? (
          <>
            <div className="flex items-center gap-1">
              <div className="w-4 h-1 bg-blue-500" />
              <span className="text-muted-foreground">{line1Label || 'データ1'} / {line1LabelEn || 'Data 1'}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-1 bg-orange-500" />
              <span className="text-muted-foreground">{line2Label || 'データ2'} / {line2LabelEn || 'Data 2'}</span>
            </div>
          </>
        ) : isDrawing ? (
          <div className="flex items-center gap-1">
            <div className="w-4 h-1 bg-green-500" />
            <span className="text-muted-foreground">あなたのグラフ / Your Graph</span>
            <span className="text-xs text-muted-foreground ml-2">(交差点をクリックして点を打つ / Click intersections to plot)</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <div className="w-4 h-0.5 bg-blue-500" />
            <span className="text-muted-foreground">データ / Data</span>
          </div>
        )}
        {hasWavyLine && (
          <div className="flex items-center gap-1">
            <span className="text-slate-500">〰️</span>
            <span className="text-muted-foreground">波線（省略）/ Wavy line (skip)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineGraphVisualizer;
