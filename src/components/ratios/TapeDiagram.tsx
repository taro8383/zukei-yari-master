import { useMemo } from 'react';

interface TapeDiagramProps {
  baseAmount: number;
  comparedAmount: number;
  ratio: number;
  showLabels?: boolean;
  showAnswer?: boolean;
  hideComparedValue?: boolean; // For "finding-compared" type - hide the compared amount
}

const TapeDiagram = ({
  baseAmount,
  comparedAmount,
  ratio,
  showLabels = true,
  showAnswer = false,
  hideComparedValue = false,
}: TapeDiagramProps) => {
  const svgConfig = useMemo(() => {
    const width = 400;
    const height = 180;
    const padding = 20;
    const barHeight = 40;
    const barGap = 30;

    // Determine max value for scaling
    const maxValue = Math.max(baseAmount, comparedAmount);
    const maxBarWidth = width - padding * 2 - 80; // Leave space for labels

    // Scale factor
    const scale = maxBarWidth / maxValue;

    const baseWidth = baseAmount * scale;
    const comparedWidth = comparedAmount * scale;

    // Y positions
    const baseY = padding + barHeight / 2;
    const comparedY = baseY + barHeight + barGap;

    // Center the bars
    const startX = padding + 60;

    return {
      width,
      height,
      barHeight,
      baseY,
      comparedY,
      startX,
      baseWidth,
      comparedWidth,
    };
  }, [baseAmount, comparedAmount]);

  const {
    width,
    height,
    barHeight,
    baseY,
    comparedY,
    startX,
    baseWidth,
    comparedWidth,
  } = svgConfig;

  // Calculate arc path for the ratio indicator
  const arcPath = useMemo(() => {
    const arcY = baseY - 35;
    const startX2 = startX + baseWidth / 2;
    const endX = startX + comparedWidth / 2;

    // Control point for quadratic bezier curve (curved upward)
    const midX = (startX2 + endX) / 2;
    const controlY = arcY - 25;

    return `M ${startX2} ${arcY} Q ${midX} ${controlY} ${endX} ${arcY}`;
  }, [startX, baseWidth, comparedWidth, baseY]);

  const ratioTextX = useMemo(() => {
    const startX2 = startX + baseWidth / 2;
    const endX = startX + comparedWidth / 2;
    return (startX2 + endX) / 2;
  }, [startX, baseWidth, comparedWidth]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto bg-muted/20 rounded-xl"
    >
      {/* Grid background */}
      <defs>
        <pattern id="grid-tape" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" className="fill-muted-foreground" opacity="0.15" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill="url(#grid-tape)" />

      {/* Base Amount Bar (もとにする数) */}
      <g>
        {/* Bar background */}
        <rect
          x={startX}
          y={baseY - barHeight / 2}
          width={baseWidth}
          height={barHeight}
          rx={6}
          className="fill-primary/20 stroke-primary"
          strokeWidth={2}
        />
        {/* Bar fill */}
        <rect
          x={startX}
          y={baseY - barHeight / 2}
          width={baseWidth}
          height={barHeight}
          rx={6}
          className="fill-primary/40"
        />
        {/* Stripes pattern for visual texture */}
        <defs>
          <pattern id="stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="4" height="8" className="fill-primary/20" />
          </pattern>
        </defs>
        <rect
          x={startX}
          y={baseY - barHeight / 2}
          width={baseWidth}
          height={barHeight}
          rx={6}
          fill="url(#stripes)"
        />

        {/* Base Amount Label */}
        {showLabels && (
          <>
            <text
              x={startX - 10}
              y={baseY}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-foreground font-bold text-sm"
            >
              もとにする数
            </text>
            <text
              x={startX - 10}
              y={baseY + 14}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-muted-foreground text-xs"
            >
              Base Amount
            </text>
          </>
        )}

        {/* Value label on bar */}
        <text
          x={startX + baseWidth / 2}
          y={baseY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground font-bold text-base"
        >
          {baseAmount}
        </text>

        {/* Unit indicator (1x marker) */}
        <text
          x={startX + baseWidth + 8}
          y={baseY}
          dominantBaseline="middle"
          className="fill-muted-foreground text-xs"
        >
          (1倍 / 1×)
        </text>
      </g>

      {/* Compared Amount Bar (くらべる数) */}
      <g>
        {/* Bar background */}
        <rect
          x={startX}
          y={comparedY - barHeight / 2}
          width={comparedWidth}
          height={barHeight}
          rx={6}
          className="fill-accent/20 stroke-accent"
          strokeWidth={2}
        />
        {/* Bar fill */}
        <rect
          x={startX}
          y={comparedY - barHeight / 2}
          width={comparedWidth}
          height={barHeight}
          rx={6}
          className="fill-accent/40"
        />
        {/* Diagonal pattern */}
        <defs>
          <pattern id="diagonal" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <rect width="4" height="8" className="fill-accent/20" />
          </pattern>
        </defs>
        <rect
          x={startX}
          y={comparedY - barHeight / 2}
          width={comparedWidth}
          height={barHeight}
          rx={6}
          fill="url(#diagonal)"
        />

        {/* Compared Amount Label */}
        {showLabels && (
          <>
            <text
              x={startX - 10}
              y={comparedY}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-foreground font-bold text-sm"
            >
              くらべる数
            </text>
            <text
              x={startX - 10}
              y={comparedY + 14}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-muted-foreground text-xs"
            >
              Compared Amount
            </text>
          </>
        )}

        {/* Value label on bar - show ? when finding-compared and not graded */}
        <text
          x={startX + comparedWidth / 2}
          y={comparedY}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`font-bold text-base ${hideComparedValue && !showAnswer ? 'fill-accent' : 'fill-foreground'}`}
        >
          {hideComparedValue && !showAnswer ? '?' : comparedAmount}
        </text>

        {/* Ratio indicator - only shown when graded */}
        {showAnswer && (
          <text
            x={startX + comparedWidth + 8}
            y={comparedY}
            dominantBaseline="middle"
            className="fill-accent font-bold text-xs"
          >
            ({ratio}倍 / {ratio}×)
          </text>
        )}
      </g>

      {/* Arc showing the ratio relationship - only shown when graded */}
      {showAnswer && (
        <>
          <path
            d={arcPath}
            fill="none"
            className="stroke-kid-yellow"
            strokeWidth={3}
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
          />

          {/* Arrow marker definition */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" className="fill-kid-yellow" />
            </marker>
          </defs>

          {/* Ratio label above arc */}
          <text
            x={ratioTextX}
            y={baseY - 45}
            textAnchor="middle"
            className="fill-kid-yellow font-black text-lg"
          >
            {ratio}倍
          </text>
        </>
      )}

      {/* Formula at bottom - only shown when graded */}
      {showAnswer && (
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          className="fill-muted-foreground text-xs"
        >
          くらべる数 ÷ もとにする数 = {comparedAmount} ÷ {baseAmount} = {ratio}
        </text>
      )}
    </svg>
  );
};

export default TapeDiagram;
