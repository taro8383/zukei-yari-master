import { Star, BookOpen, Rocket, Lightbulb } from 'lucide-react';
import { DivisionTopicInfo } from '@/lib/division';
import LongDivisionVisualizer from './LongDivisionVisualizer';
import DivisionWithRemainderVisualizer from './DivisionWithRemainderVisualizer';
import DivisionPropertiesVisualizer from './DivisionPropertiesVisualizer';
import LongDivision2DigitVisualizer from './LongDivision2DigitVisualizer';
import MentalDivisionVisualizer from './MentalDivisionVisualizer';

interface DivisionExplanationCardProps {
  info: DivisionTopicInfo;
}

const DivisionExplanationCard = ({ info }: DivisionExplanationCardProps) => {
  // Example problem for long division visualizer
  const exampleProblem = { dividend: 126, divisor: 3, quotient: 42 };

  // Division with remainder example
  const remainderExample = { dividend: 17, divisor: 5, quotient: 3, remainder: 2 };

  // Division properties example (using non-zero numbers to distinguish from Mental Division)
  const propertiesExample = {
    dividend: 84,
    divisor: 12,
    simplifiedDividend: 42,
    simplifiedDivisor: 6,
    quotient: 7,
  };

  // Long division 2-digit example
  const longDivision2DigitExample = { dividend: 256, divisor: 32, quotient: 8 };

  // Mental division example
  const mentalDivisionExample = {
    dividend: 600,
    divisor: 20,
    simplifiedDividend: 60,
    simplifiedDivisor: 2,
    quotient: 30,
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

      {/* Long Division Visualizer for long-division topic */}
      {info.id === 'long-division' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 やり方を見てみよう / Let's see how it works
          </p>
          <LongDivisionVisualizer
            dividend={exampleProblem.dividend}
            divisor={exampleProblem.divisor}
            quotient={exampleProblem.quotient}
          />
        </div>
      )}

      {/* Division with Remainder Visualizer */}
      {info.id === 'division-with-remainder' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 あまりのあるわり算の例 / Division with remainder example
          </p>
          <DivisionWithRemainderVisualizer {...remainderExample} />
        </div>
      )}

      {/* Division Properties Visualizer */}
      {info.id === 'division-properties' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 わり算の性質の例 / Division properties example
          </p>
          <DivisionPropertiesVisualizer {...propertiesExample} />
        </div>
      )}

      {/* Long Division 2-Digit Visualizer */}
      {info.id === 'long-division-2digit' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 2けたのわり算の例 / 2-digit division example
          </p>
          <LongDivision2DigitVisualizer {...longDivision2DigitExample} />
        </div>
      )}

      {/* Mental Division Visualizer */}
      {info.id === 'mental-division' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 暗算の裏ワザの例 / Mental math trick example
          </p>
          <MentalDivisionVisualizer {...mentalDivisionExample} />
        </div>
      )}
    </div>
  );
};

export default DivisionExplanationCard;
