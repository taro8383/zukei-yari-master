import { TopicInfo } from '@/lib/geometry';
import { Lightbulb, BookOpen, Rocket, Star } from 'lucide-react';

interface ExplanationCardProps {
  info: TopicInfo;
}

const ExplanationCard = ({ info }: ExplanationCardProps) => {
  const sections = [
    { icon: <Star className="w-5 h-5" />, title: 'めあて', content: info.goal, color: 'bg-kid-yellow/20 border-kid-yellow/40' },
    { icon: <BookOpen className="w-5 h-5" />, title: 'やりかた', content: info.method, color: 'bg-primary/10 border-primary/30' },
    { icon: <Rocket className="w-5 h-5" />, title: '生活の中でのつかいみち', content: info.realLife, color: 'bg-kid-green/20 border-kid-green/40' },
    { icon: <Lightbulb className="w-5 h-5" />, title: 'できるようになると...', content: info.benefit, color: 'bg-kid-purple/20 border-kid-purple/40' },
  ];

  return (
    <div className="bg-card rounded-2xl shadow-kid p-6 mb-8 border border-border">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span className="text-3xl">{info.icon}</span>
        {info.label}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => (
          <div key={s.title} className={`rounded-xl border p-4 ${s.color}`}>
            <div className="flex items-center gap-2 font-bold mb-2 text-foreground">
              {s.icon}
              {s.title}
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplanationCard;
