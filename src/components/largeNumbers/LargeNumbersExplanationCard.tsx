import { LargeNumberTopicInfo } from '@/lib/largeNumbers';
import { Lightbulb, BookOpen, Rocket, Star } from 'lucide-react';
import ReadingOkuChoVisualizer from './ReadingOkuChoVisualizer';
import RoundingOffVisualizer from './RoundingOffVisualizer';
import RoundingUpDownVisualizer from './RoundingUpDownVisualizer';
import CalculatingOkuChoVisualizer from './CalculatingOkuChoVisualizer';
import EstimatingCalculationsVisualizer from './EstimatingCalculationsVisualizer';

interface LargeNumbersExplanationCardProps {
  info: LargeNumberTopicInfo;
}

const LargeNumbersExplanationCard = ({ info }: LargeNumbersExplanationCardProps) => {
  // Example data for visualizers
  const readingOkuChoExample = {
    number: 3450000000000,
    japaneseReading: '3兆4500億',
  };

  const roundingOffExample = {
    originalNumber: 34560,
    targetPlace: '千の位',
    targetPlaceEn: 'thousands place',
    roundedNumber: 35000,
  };

  const roundingUpExample = {
    unitPrice: 420,
    quantity: 3,
    totalAmount: 1260,
    scenario: 'up' as const,
    answer: 2,
  };

  const roundingDownExample = {
    unitPrice: 300,
    quantity: 8,
    totalAmount: 2400,
    scenario: 'down' as const,
    answer: 8,
  };

  const calculatingOkuChoExample = {
    num1: 350000000,
    num2: 420000000,
    operation: 'add' as const,
    unit: '億',
    result: 770000000,
  };

  const estimatingCalculationsExample = {
    num1: 489,
    num2: 312,
    roundedNum1: 500,
    roundedNum2: 300,
    roundPlace: '百',
    roundPlaceEn: 'hundred',
    estimatedResult: 800,
    exactResult: 801,
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

      {/* Reading Oku and Cho Visualizer */}
      {info.id === 'reading-oku-cho' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 億と兆の読み方の例 / Reading large numbers example
          </p>
          <ReadingOkuChoVisualizer {...readingOkuChoExample} />
        </div>
      )}

      {/* Rounding Off Visualizer */}
      {info.id === 'rounding-off' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 四捨五入の例 / Rounding off example
          </p>
          <RoundingOffVisualizer {...roundingOffExample} />
        </div>
      )}

      {/* Rounding Up and Down Visualizers */}
      {info.id === 'rounding-up-down' && (
        <div className="mt-6 pt-6 border-t border-border space-y-4">
          <p className="text-center font-bold text-foreground mb-4">
            📖 切り捨てと切り上げの例 / Rounding up and down examples
          </p>
          <RoundingUpDownVisualizer {...roundingUpExample} />
          <RoundingUpDownVisualizer {...roundingDownExample} />
        </div>
      )}

      {/* Calculating with Oku and Cho Visualizer */}
      {info.id === 'calculating-oku-cho' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 大きな数の計算の例 / Calculating with large numbers example
          </p>
          <CalculatingOkuChoVisualizer {...calculatingOkuChoExample} />
        </div>
      )}

      {/* Estimating Calculations Visualizer */}
      {info.id === 'estimating-calculations' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 がい算（見積もり）の例 / Estimating calculations example
          </p>
          <EstimatingCalculationsVisualizer {...estimatingCalculationsExample} />
        </div>
      )}
    </div>
  );
};

export default LargeNumbersExplanationCard;
