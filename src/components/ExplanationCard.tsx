import { TopicInfo } from '@/lib/geometry';
import { Lightbulb, BookOpen, Rocket, Star } from 'lucide-react';
import AnglesVisualizer from './geometry/AnglesVisualizer';
import AreaVisualizer from './geometry/AreaVisualizer';
import LinesVisualizer from './geometry/LinesVisualizer';
import IntersectingVisualizer from './geometry/IntersectingVisualizer';
import QuadrilateralsVisualizer from './geometry/QuadrilateralsVisualizer';
import DiagonalsVisualizer from './geometry/DiagonalsVisualizer';

interface ExplanationCardProps {
  info: TopicInfo;
}

const ExplanationCard = ({ info }: ExplanationCardProps) => {
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

      {/* Visual Examples based on topic */}
      {info.label === '角度のけいさん' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 角度の例 / Angle examples
          </p>
          <AnglesVisualizer />
        </div>
      )}
      {info.label === '面積のけいさん' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 面積の例 / Area examples
          </p>
          <AreaVisualizer />
        </div>
      )}
      {info.label === '垂直と平行' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 垂直と平行の例 / Perpendicular and parallel examples
          </p>
          <LinesVisualizer />
        </div>
      )}
      {info.label === '交わる直線と角' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 交わる直線と角の例 / Intersecting lines examples
          </p>
          <IntersectingVisualizer />
        </div>
      )}
      {info.label === '四角形のなかま分け' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 四角形の分類の例 / Quadrilateral classification examples
          </p>
          <QuadrilateralsVisualizer />
        </div>
      )}
      {info.label === '対角線' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 対角線の例 / Diagonal examples
          </p>
          <DiagonalsVisualizer />
        </div>
      )}
    </div>
  );
};

export default ExplanationCard;
