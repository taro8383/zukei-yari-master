import { useMemo } from 'react';

interface BatteryBarProps {
  correctAnswers: number;
  totalQuestions: number;
  showAnswer?: boolean;
}

const BatteryBar = ({
  correctAnswers,
  totalQuestions,
  showAnswer = false,
}: BatteryBarProps) => {
  const svgConfig = useMemo(() => {
    const width = 400;
    const height = 120;
    const padding = 20;
    const barHeight = 50;
    const barY = 40;

    // Battery body dimensions
    const batteryX = padding + 40;
    const batteryWidth = width - padding * 2 - 60;
    const batteryCornerRadius = 8;

    // Battery terminal (positive end)
    const terminalWidth = 12;
    const terminalHeight = 20;
    const terminalX = batteryX + batteryWidth;
    const terminalY = barY + (barHeight - terminalHeight) / 2;

    return {
      width,
      height,
      padding,
      barHeight,
      barY,
      batteryX,
      batteryWidth,
      batteryCornerRadius,
      terminalWidth,
      terminalHeight,
      terminalX,
      terminalY,
    };
  }, []);

  const {
    width,
    height,
    barHeight,
    barY,
    batteryX,
    batteryWidth,
    batteryCornerRadius,
    terminalWidth,
    terminalHeight,
    terminalX,
    terminalY,
  } = svgConfig;

  // Calculate fill width based on correct answers
  const fillWidth = useMemo(() => {
    const ratio = correctAnswers / totalQuestions;
    return batteryWidth * ratio;
  }, [correctAnswers, totalQuestions, batteryWidth]);

  // Calculate percentage for display
  const percentage = useMemo(() => {
    return Math.round((correctAnswers / totalQuestions) * 100);
  }, [correctAnswers, totalQuestions]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto bg-muted/20 rounded-xl"
    >
      {/* Grid background */}
      <defs>
        <pattern id="grid-battery" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" className="fill-muted-foreground" opacity="0.15" />
        </pattern>

        {/* Gradient for battery fill - like an EXP bar */}
        <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="stop-color-accent" stopColor="hsl(var(--accent))" />
          <stop offset="100%" className="stop-color-primary" stopColor="hsl(var(--primary))" />
        </linearGradient>

        {/* Glow effect */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width={width} height={height} fill="url(#grid-battery)" />

      {/* Label: 問題総数 / Total Questions */}
      <text
        x={batteryX}
        y={25}
        className="fill-muted-foreground text-xs font-medium"
      >
        問題総数 / Total: {totalQuestions}
      </text>

      {/* Battery outline */}
      <rect
        x={batteryX}
        y={barY}
        width={batteryWidth}
        height={barHeight}
        rx={batteryCornerRadius}
        className="fill-background stroke-muted-foreground"
        strokeWidth={3}
      />

      {/* Battery terminal (positive end) */}
      <rect
        x={terminalX}
        y={terminalY}
        width={terminalWidth}
        height={terminalHeight}
        rx={3}
        className="fill-muted-foreground"
      />

      {/* Battery fill - the EXP/HP bar */}
      <rect
        x={batteryX + 4}
        y={barY + 4}
        width={showAnswer ? fillWidth - 8 : 0}
        height={barHeight - 8}
        rx={batteryCornerRadius - 2}
        fill="url(#batteryGradient)"
        className="transition-all duration-500"
        filter={showAnswer ? "url(#glow)" : undefined}
      />

      {/* Fill pattern overlay (stripes for game-like effect) */}
      {showAnswer && (
        <defs>
          <pattern id="expStripes" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="4" height="12" className="fill-white" opacity="0.15" />
          </pattern>
        </defs>
      )}
      {showAnswer && (
        <rect
          x={batteryX + 4}
          y={barY + 4}
          width={fillWidth - 8}
          height={barHeight - 8}
          rx={batteryCornerRadius - 2}
          fill="url(#expStripes)"
          className="transition-all duration-500"
        />
      )}

      {/* Current value indicator (like a level indicator) */}
      <g>
        {/* Correct answers badge */}
        <rect
          x={batteryX + 8}
          y={barY + 8}
          width={70}
          height={barHeight - 16}
          rx={4}
          className="fill-background/90"
        />
        <text
          x={batteryX + 43}
          y={barY + barHeight / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground font-bold text-sm"
        >
          正解: {correctAnswers}
        </text>
      </g>

      {/* Axis labels at the bottom: 0, 0.5 (50%), 1 (100%) */}
      <g className="text-xs">
        {/* 0 mark */}
        <text
          x={batteryX}
          y={height - 8}
          textAnchor="middle"
          className="fill-muted-foreground font-bold"
        >
          0
        </text>
        {/* 0.5 (50%) mark */}
        <text
          x={batteryX + batteryWidth * 0.5}
          y={height - 8}
          textAnchor="middle"
          className="fill-muted-foreground font-bold"
        >
          0.5 (50%)
        </text>
        {/* 1 (100%) mark */}
        <text
          x={batteryX + batteryWidth}
          y={height - 8}
          textAnchor="middle"
          className="fill-muted-foreground font-bold"
        >
          1 (100%)
        </text>
      </g>

      {/* Percentage display when graded */}
      {showAnswer && (
        <g>
          <text
            x={batteryX + batteryWidth / 2}
            y={barY + barHeight / 2 + 2}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white font-black text-2xl"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
          >
            {percentage}%
          </text>
        </g>
      )}

      {/* Formula hint at bottom */}
      {showAnswer && (
        <text
          x={width / 2}
          y={height - 2}
          textAnchor="middle"
          className="fill-muted-foreground text-xs"
        >
          正解数 ÷ 問題総数 × 100 = {correctAnswers} ÷ {totalQuestions} × 100 = {percentage}%
        </text>
      )}
    </svg>
  );
};

export default BatteryBar;
