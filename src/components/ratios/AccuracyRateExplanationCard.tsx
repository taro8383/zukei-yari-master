import { AccuracyRateTopicInfo } from '@/lib/ratios';
import { Lightbulb, BookOpen, Rocket, Star } from 'lucide-react';
import DecimalRatioVisualizer from './DecimalRatioVisualizer';
import ConvertPercentVisualizer from './ConvertPercentVisualizer';
import CalculateAccuracyVisualizer from './CalculateAccuracyVisualizer';

interface AccuracyRateExplanationCardProps {
  info: AccuracyRateTopicInfo;
}

const AccuracyRateExplanationCard = ({ info }: AccuracyRateExplanationCardProps) => {
  // Example data for visualizers
  const decimalRatioExample = {
    correctAnswers: 4,
    totalQuestions: 5,
    decimalResult: 0.8,
  };

  const convertPercentExample = {
    decimalValue: 0.75,
    percentValue: 75,
  };

  const calculateAccuracyExample = {
    correctAnswers: 8,
    totalQuestions: 10,
    accuracyPercent: 80,
  };

  const sections = [
    { icon: <Star className="w-5 h-5" />, title: 'めあて', titleEn: 'Goal', content: info.goal, contentEn: info.goalEn, color: 'bg-kid-yellow/20 border-kid-yellow/40' },
    { icon: <BookOpen className="w-5 h-5" />, title: 'やりかた', titleEn: 'How it Works', content: info.method, contentEn: info.methodEn, color: 'bg-primary/10 border-primary/30' },
    { icon: <Rocket className="w-5 h-5" />, title: '生活の中でのつかいみち', titleEn: 'Real-Life Use', content: info.realLife, contentEn: info.realLifeEn, color: 'bg-kid-green/20 border-kid-green/40' },
    { icon: <Lightbulb className="w-5 h-5" />, title: 'できるようになると...', titleEn: 'Benefits', content: info.benefit, contentEn: info.benefitEn, color: 'bg-kid-purple/20 border-kid-purple/40' },
  ];

  return (
    <div className="bg-card rounded-2xl shadow-kid p-6 mb-8 border border-border">
      <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <span className="text-3xl">{info.icon}</span>
        {info.label}
      </h2>
      <p className="text-sm text-muted-foreground mb-4 ml-11">{info.labelEn}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => (
          <div key={s.title} className={`rounded-xl border p-4 ${s.color}`}>
            <div className="flex items-center gap-2 font-bold mb-1 text-foreground">
              {s.icon}
              {s.title}
            </div>
            <p className="text-xs text-muted-foreground mb-2">{s.titleEn}</p>
            <p className="text-sm leading-relaxed text-foreground/80">{s.content}</p>
            <p className="text-xs leading-relaxed text-muted-foreground mt-1">{s.contentEn}</p>
          </div>
        ))}
      </div>

      {/* Decimal Ratio Visualizer */}
      {info.id === 'decimal-ratio' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 割合を小数で求める例 / Finding ratio as decimal example
          </p>
          <DecimalRatioVisualizer {...decimalRatioExample} />
        </div>
      )}

      {/* Convert Percent Visualizer */}
      {info.id === 'convert-percent' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 パーセントになおす例 / Converting to percentage example
          </p>
          <ConvertPercentVisualizer {...convertPercentExample} />
        </div>
      )}

      {/* Calculate Accuracy Visualizer */}
      {info.id === 'calculate-accuracy' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 正答率を計算する例 / Calculating accuracy rate example
          </p>
          <CalculateAccuracyVisualizer {...calculateAccuracyExample} />
        </div>
      )}
    </div>
  );
};

export default AccuracyRateExplanationCard;
