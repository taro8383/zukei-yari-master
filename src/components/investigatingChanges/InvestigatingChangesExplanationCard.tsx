import { Lightbulb, BookOpen, Rocket, Star } from 'lucide-react';
import { InvestigatingChangesTopic } from '@/lib/investigatingChanges';

interface InvestigatingChangesExplanationCardProps {
  info: {
    id?: InvestigatingChangesTopic;
    icon: string;
    label: string;
    labelEn: string;
    goal: string;
    goalEn: string;
    method: string;
    methodEn: string;
    realLife: string;
    realLifeEn: string;
    benefit: string;
    benefitEn: string;
  };
}

const InvestigatingChangesExplanationCard = ({ info }: InvestigatingChangesExplanationCardProps) => {
  const sections = [
    { icon: <Star className="w-5 h-5" />, title: 'めあて', titleEn: 'Goal', content: info.goal, contentEn: info.goalEn, color: 'bg-kid-yellow/20 border-kid-yellow/40' },
    { icon: <BookOpen className="w-5 h-5" />, title: 'やりかた', titleEn: 'How it Works', content: info.method, contentEn: info.methodEn, color: 'bg-primary/10 border-primary/30' },
    { icon: <Rocket className="w-5 h-5" />, title: '生活の中でのつかいみち', titleEn: 'Real-Life Use', content: info.realLife, contentEn: info.realLifeEn, color: 'bg-kid-green/20 border-kid-green/40' },
    { icon: <Lightbulb className="w-5 h-5" />, title: 'できるようになると...', titleEn: 'Benefits', content: info.benefit, contentEn: info.benefitEn, color: 'bg-kid-purple/20 border-kid-purple/40' },
  ];

  // Render topic-specific example
  const renderExample = () => {
    switch (info.id) {
      case 'completing-table':
        return (
          <>
            <p className="text-sm font-bold text-foreground mb-3 text-center">
              📊 空いているマスを埋めよう / Fill in the Empty Cell
            </p>
            <div className="bg-background rounded-lg p-4 mb-4 border border-border overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="p-3 text-foreground font-bold">〇</th>
                    <th className="p-3 text-foreground font-bold">1</th>
                    <th className="p-3 text-foreground font-bold">2</th>
                    <th className="p-3 text-foreground font-bold">3</th>
                    <th className="p-3 text-foreground font-bold">4</th>
                    <th className="p-3 text-foreground font-bold">5</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="p-3 text-foreground font-bold border-r-2 border-primary">△</th>
                    <td className="p-3 text-foreground">2</td>
                    <td className="p-3 text-foreground">4</td>
                    <td className="p-3 text-foreground bg-kid-yellow/30 border-2 border-kid-yellow rounded">?</td>
                    <td className="p-3 text-foreground">8</td>
                    <td className="p-3 text-foreground">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-kid-yellow/20 rounded-lg p-3 border border-kid-yellow">
              <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
                💡 ヒント / Hint
              </p>
              <p className="text-sm text-center text-foreground">
                〇が1増えると、△は2増える → 〇 × 2 = △<br />
                <span className="text-muted-foreground text-xs">When 〇 increases by 1, △ increases by 2 → 〇 × 2 = △</span>
              </p>
            </div>
          </>
        );

      case 'finding-rule':
        return (
          <>
            <p className="text-sm font-bold text-foreground mb-3 text-center">
              🔍 きまりを見つけよう！ / Find the Rule!
            </p>
            <div className="bg-background rounded-lg p-4 mb-4 border border-border overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="p-3 text-foreground font-bold">〇</th>
                    <th className="p-3 text-foreground font-bold">1</th>
                    <th className="p-3 text-foreground font-bold">2</th>
                    <th className="p-3 text-foreground font-bold">3</th>
                    <th className="p-3 text-foreground font-bold">4</th>
                    <th className="p-3 text-foreground font-bold">5</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="p-3 text-foreground font-bold border-r-2 border-primary">△</th>
                    <td className="p-3 text-foreground">4</td>
                    <td className="p-3 text-foreground">8</td>
                    <td className="p-3 text-foreground">12</td>
                    <td className="p-3 text-foreground">16</td>
                    <td className="p-3 text-foreground">20</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-kid-green/20 rounded-lg p-3 border border-kid-green">
              <p className="text-xs font-bold text-kid-green mb-2 text-center">
                ✅ 正解 / Correct Answer
              </p>
              <p className="text-sm text-center text-foreground">
                〇が1増えると、△は4増える → 〇 × 4 = △<br />
                <span className="text-muted-foreground text-xs">When 〇 increases by 1, △ increases by 4 → 〇 × 4 = △</span>
              </p>
            </div>
          </>
        );

      case 'writing-equation':
        return (
          <>
            <p className="text-sm font-bold text-foreground mb-3 text-center">
              ✏️ 式を作ろう！ / Write the Equation!
            </p>
            <div className="bg-background rounded-lg p-4 mb-4 border border-border overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="p-3 text-foreground font-bold">〇</th>
                    <th className="p-3 text-foreground font-bold">1</th>
                    <th className="p-3 text-foreground font-bold">2</th>
                    <th className="p-3 text-foreground font-bold">3</th>
                    <th className="p-3 text-foreground font-bold">4</th>
                    <th className="p-3 text-foreground font-bold">5</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="p-3 text-foreground font-bold border-r-2 border-primary">△</th>
                    <td className="p-3 text-foreground">3</td>
                    <td className="p-3 text-foreground">6</td>
                    <td className="p-3 text-foreground">9</td>
                    <td className="p-3 text-foreground">12</td>
                    <td className="p-3 text-foreground">15</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-kid-purple/20 rounded-lg p-3 border border-kid-purple">
              <p className="text-xs font-bold text-kid-purple mb-2 text-center">
                🔢 式 / Equation
              </p>
              <p className="text-lg text-center text-foreground font-bold">
                〇 × 3 = △
              </p>
              <p className="text-sm text-center text-muted-foreground mt-1">
                △はいつも〇の3倍！ / △ is always 3 times 〇!
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

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

      {/* Visual Example - Topic Specific */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-center font-bold text-foreground mb-4">
          📖 例を見てみよう / Let's Look at an Example
        </p>
        <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
          {renderExample()}
        </div>
      </div>
    </div>
  );
};

export default InvestigatingChangesExplanationCard;
