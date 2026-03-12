import { Star, BookOpen, Rocket, Lightbulb } from 'lucide-react';
import { LineGraphTopicInfo } from '@/lib/lineGraphs';
import LineGraphVisualizer from './LineGraphVisualizer';

interface LineGraphExplanationCardProps {
  info: LineGraphTopicInfo;
}

const LineGraphExplanationCard = ({ info }: LineGraphExplanationCardProps) => {
  // Example data for visualizers
  const readingExample = {
    dataPoints: [
      { x: '9:00', y: 22 },
      { x: '10:00', y: 24 },
      { x: '11:00', y: 26 },
      { x: '12:00', y: 27 },
      { x: '13:00', y: 28 },
      { x: '14:00', y: 27 },
      { x: '15:00', y: 25 },
    ],
    xAxisLabel: '時間',
    xAxisLabelEn: 'Time',
    yAxisLabel: '気温 (℃)',
    yAxisLabelEn: 'Temperature (°C)',
    yAxisMin: 20,
    yAxisMax: 30,
    tickInterval: 1,
  };

  const slopeExample = {
    dataPoints: [
      { x: '9:00', y: 20 },
      { x: '10:00', y: 21 },
      { x: '11:00', y: 25 },
      { x: '12:00', y: 25 },
      { x: '13:00', y: 23 },
    ],
    xAxisLabel: '時間',
    xAxisLabelEn: 'Time',
    yAxisLabel: '気温 (℃)',
    yAxisLabelEn: 'Temperature (°C)',
    yAxisMin: 18,
    yAxisMax: 28,
    tickInterval: 1,
  };

  const wavyExample = {
    dataPoints: [
      { x: '6:00', y: 36.4 },
      { x: '9:00', y: 36.5 },
      { x: '12:00', y: 36.9 },
      { x: '15:00', y: 37.1 },
      { x: '18:00', y: 36.8 },
      { x: '21:00', y: 36.6 },
    ],
    xAxisLabel: '時間',
    xAxisLabelEn: 'Time',
    yAxisLabel: '体温 (℃)',
    yAxisLabelEn: 'Body Temp (°C)',
    yAxisMin: 36.0,
    yAxisMax: 37.5,
    tickInterval: 0.1,
    hasWavyLine: true,
    wavyLineBase: 36.0,
  };

  const comparingExample = {
    dataPoints: [
      { x: '1月', y: 6 },
      { x: '2月', y: 7 },
      { x: '3月', y: 10 },
      { x: '4月', y: 15 },
      { x: '5月', y: 20 },
      { x: '6月', y: 23 },
    ],
    secondDataPoints: [
      { x: '1月', y: -4 },
      { x: '2月', y: -3 },
      { x: '3月', y: 1 },
      { x: '4月', y: 7 },
      { x: '5月', y: 13 },
      { x: '6月', y: 17 },
    ],
    xAxisLabel: '月',
    xAxisLabelEn: 'Month',
    yAxisLabel: '気温 (℃)',
    yAxisLabelEn: 'Temperature (°C)',
    yAxisMin: -6,
    yAxisMax: 26,
    tickInterval: 2,
    line1Label: '東京',
    line1LabelEn: 'Tokyo',
    line2Label: '札幌',
    line2LabelEn: 'Sapporo',
  };

  const drawingExample = {
    dataPoints: [
      { x: '1日目', y: 2 },
      { x: '2日目', y: 4 },
      { x: '3日目', y: 5 },
      { x: '4日目', y: 7 },
      { x: '5日目', y: 8 },
    ],
    tableData: [
      { x: '1日目', y: 2 },
      { x: '2日目', y: 4 },
      { x: '3日目', y: 5 },
      { x: '4日目', y: 7 },
      { x: '5日目', y: 8 },
    ],
    xAxisLabel: '時間',
    xAxisLabelEn: 'Time',
    yAxisLabel: '数',
    yAxisLabelEn: 'Amount',
    yAxisMin: 0,
    yAxisMax: 10,
    tickInterval: 2,
  };

  const sections = [
    {
      icon: <Star className="w-5 h-5" />,
      title: 'めあて',
      titleEn: 'Goal',
      content: info.goal,
      contentEn: info.goalEn,
      color: 'bg-kid-yellow/20 border-kid-yellow/40',
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'やりかた',
      titleEn: 'How it Works',
      content: info.method,
      contentEn: info.methodEn,
      color: 'bg-primary/10 border-primary/30',
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: '生活の中でのつかいみち',
      titleEn: 'Real-Life Use',
      content: info.realLife,
      contentEn: info.realLifeEn,
      color: 'bg-kid-green/20 border-kid-green/40',
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: 'できるようになると...',
      titleEn: 'Benefits',
      content: info.benefit,
      contentEn: info.benefitEn,
      color: 'bg-kid-purple/20 border-kid-purple/40',
    },
  ];

  return (
    <div className="bg-card rounded-2xl shadow-kid p-6 border-2 border-border mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{info.icon}</span>
        <div>
          <h2 className="text-xl font-bold text-foreground">{info.label}</h2>
          <p className="text-sm text-gray-500">{info.labelEn}</p>
        </div>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border-2 ${section.color}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary">{section.icon}</span>
              <div>
                <h3 className="font-bold text-foreground">{section.title}</h3>
                <p className="text-xs text-gray-500">{section.titleEn}</p>
              </div>
            </div>
            <p className="text-foreground text-sm leading-relaxed">{section.content}</p>
            <p className="text-gray-500 text-xs mt-1">{section.contentEn}</p>
          </div>
        ))}
      </div>

      {/* Line Graph Visualizer */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-center font-bold text-foreground mb-4">
          📖 折れ線グラフの例を見てみよう / Let&apos;s look at a line graph example
        </p>
        {info.id === 'reading-graph' && (
          <LineGraphVisualizer {...readingExample} />
        )}
        {info.id === 'change-slope' && (
          <LineGraphVisualizer {...slopeExample} />
        )}
        {info.id === 'wavy-line' && (
          <LineGraphVisualizer {...wavyExample} />
        )}
        {info.id === 'comparing-two-graphs' && (
          <LineGraphVisualizer {...comparingExample} isComparing={true} />
        )}
        {info.id === 'drawing-graph' && (
          <>
            <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30 mb-4">
              <p className="text-sm font-bold text-foreground mb-2 text-center">
                📊 表 / Table
              </p>
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary">
                    {drawingExample.tableData.map((row, idx) => (
                      <th key={idx} className="p-2 text-sm font-bold">{row.x}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {drawingExample.tableData.map((row, idx) => (
                      <td key={idx} className="p-2 text-lg font-bold text-primary">{row.y}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <LineGraphVisualizer {...drawingExample} />
          </>
        )}
      </div>
    </div>
  );
};

export default LineGraphExplanationCard;
