import { RatioTopicInfo } from '@/lib/ratios';
import { Lightbulb, BookOpen, Rocket, Star } from 'lucide-react';
import FindingRatioVisualizer from './FindingRatioVisualizer';
import FindingComparedVisualizer from './FindingComparedVisualizer';
import FindingBaseVisualizer from './FindingBaseVisualizer';
import DifferenceVsMultipleVisualizer from './DifferenceVsMultipleVisualizer';

interface RatioExplanationCardProps {
  info: RatioTopicInfo;
}

const RatioExplanationCard = ({ info }: RatioExplanationCardProps) => {
  // Example data for visualizers
  const findingRatioExample = {
    baseAmount: 8,
    comparedAmount: 12,
    ratio: 1.5,
  };

  const findingComparedExample = {
    baseAmount: 8,
    ratio: 2.5,
    comparedAmount: 20,
  };

  const findingBaseExample = {
    comparedAmount: 15,
    ratio: 3,
    baseAmount: 5,
  };

  const differenceVsMultipleExample = {
    smallerNumber: 5,
    largerNumber: 8,
    difference: 3,
    multiple: 1.6,
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

      {/* Finding Ratio Visualizer */}
      {info.id === 'finding-ratio' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 何倍ですかの例 / Finding the multiple example
          </p>
          <FindingRatioVisualizer {...findingRatioExample} />
        </div>
      )}

      {/* Finding Compared Visualizer */}
      {info.id === 'finding-compared' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 くらべる数を求める例 / Finding the compared amount example
          </p>
          <FindingComparedVisualizer {...findingComparedExample} />
        </div>
      )}

      {/* Finding Base Visualizer */}
      {info.id === 'finding-base' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 もとにする数を求める例 / Finding the base amount example
          </p>
          <FindingBaseVisualizer {...findingBaseExample} />
        </div>
      )}

      {/* Difference vs Multiple Visualizer */}
      {info.id === 'difference-vs-multiple' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 差と倍のちがいの例 / Difference vs multiple example
          </p>
          <DifferenceVsMultipleVisualizer {...differenceVsMultipleExample} />
        </div>
      )}
    </div>
  );
};

export default RatioExplanationCard;
