import { Star, BookOpen, Rocket, Lightbulb } from 'lucide-react';
import { DecimalTopicInfo } from '@/lib/decimals';
import DecimalStructureVisualizer from './DecimalStructureVisualizer';
import DecimalShiftVisualizer from './DecimalShiftVisualizer';
import DecimalAddSubtractVisualizer from './DecimalAddSubtractVisualizer';
import DecimalMultiplyDivideVisualizer from './DecimalMultiplyDivideVisualizer';

interface DecimalExplanationCardProps {
  info: DecimalTopicInfo;
}

const DecimalExplanationCard = ({ info }: DecimalExplanationCardProps) => {
  // Example problems for visualizers
  const structureExample = { number: 2.35, ones: 2, tenths: 3, hundredths: 5 };
  const shiftExample = { original: 3.45, x10: 34.5, x100: 345, divide10: 0.345 };

  // Addition example
  const addExample = {
    num1: 3.4,
    num2: 1.85,
    operation: 'add' as const,
    decimalPlaces1: 1,
    decimalPlaces2: 2,
    result: 5.25,
  };

  // Subtraction example
  const subtractExample = {
    num1: 5.6,
    num2: 2.35,
    operation: 'subtract' as const,
    decimalPlaces1: 1,
    decimalPlaces2: 2,
    result: 3.25,
  };

  // Multiplication example
  const multiplyExample = {
    decimalNumber: 2.4,
    wholeNumber: 3,
    operation: 'multiply' as const,
    result: 7.2,
    decimalPlaces: 1,
  };

  // Division example
  const divideExample = {
    decimalNumber: 5.6,
    wholeNumber: 4,
    operation: 'divide' as const,
    result: 1.4,
    decimalPlaces: 1,
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

      {/* Decimal Structure Visualizer */}
      {info.id === 'decimal-structure' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 小数のしくみを見てみよう / Let&apos;s see how decimals work
          </p>
          <DecimalStructureVisualizer
            number={structureExample.number}
            ones={structureExample.ones}
            tenths={structureExample.tenths}
            hundredths={structureExample.hundredths}
          />
        </div>
      )}

      {/* Decimal Shift Visualizer */}
      {info.id === 'decimal-shift' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 小数点の動きを見てみよう / Let&apos;s see how the decimal point moves
          </p>
          <DecimalShiftVisualizer
            original={shiftExample.original}
            x10={shiftExample.x10}
            x100={shiftExample.x100}
            divide10={shiftExample.divide10}
          />
        </div>
      )}

      {/* Decimal Add/Subtract Visualizer */}
      {info.id === 'decimal-add-subtract' && (
        <div className="mt-6 pt-6 border-t border-border space-y-4">
          <p className="text-center font-bold text-foreground mb-4">
            📖 小数のたし算・ひき算の例を見てみよう / Let&apos;s see examples of adding and subtracting decimals
          </p>
          <DecimalAddSubtractVisualizer {...addExample} />
          <DecimalAddSubtractVisualizer {...subtractExample} />
        </div>
      )}

      {/* Decimal Multiply/Divide Visualizer */}
      {info.id === 'decimal-multiply-divide' && (
        <div className="mt-6 pt-6 border-t border-border space-y-4">
          <p className="text-center font-bold text-foreground mb-4">
            📖 小数のかけ算・わり算の例を見てみよう / Let&apos;s see examples of multiplying and dividing decimals
          </p>
          <DecimalMultiplyDivideVisualizer {...multiplyExample} />
          <DecimalMultiplyDivideVisualizer {...divideExample} />
        </div>
      )}
    </div>
  );
};

export default DecimalExplanationCard;
