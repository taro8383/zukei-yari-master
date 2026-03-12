import { Star, BookOpen, Rocket, Lightbulb } from 'lucide-react';
import { CalculationRulesTopicInfo } from '@/lib/calculationRules';
import OrderOfOperationsTree from './OrderOfOperationsTree';
import AreaModel from './AreaModel';
import CalculateSmartlyVisualizer from './CalculateSmartlyVisualizer';
import CombiningEquationVisualizer from './CombiningEquationVisualizer';

interface CalculationRulesExplanationCardProps {
  info: CalculationRulesTopicInfo;
}

const CalculationRulesExplanationCard = ({ info }: CalculationRulesExplanationCardProps) => {
  // Example data for visualizers
  const orderOfOperationsExample = {
    expression: '20 + 5 × 4',
    steps: [
      { description: '5 × 4 = 20（かけ算を先に）', descriptionEn: '5 × 4 = 20 (multiply first)', operation: '5 × 4', result: 20 },
      { description: '20 + 20 = 40', descriptionEn: '20 + 20 = 40', operation: '20 + 20', result: 40 },
    ],
  };

  const calculateSmartlyExample = {
    type: 'multiplication' as const,
    numbers: [25, 13, 4],
    easyPair: [25, 4] as [number, number],
    result: 1300,
  };

  const distributivePropertyExample = {
    baseNum: 100,
    adjustment: 2,
    multiplier: 5,
    isAddition: false,
  };

  const combiningEquationExample = {
    scenario: 'お菓子が12個あります。4人で同じ数ずつ分けて、それぞれが2個食べました。残りは何個ですか？',
    scenarioEn: 'There are 12 snacks. Divided equally among 4 people, then each ate 2. How many remain?',
    numbers: [12, 4, 2],
    operations: ['+', '-', '×', '÷', '(', ')'],
    correctEquation: '(12 ÷ 4) - 2',
    answer: 1,
  };

  const sections = [
    {
      icon: <Star className="w-5 h-5" />,
      title: 'めあて',
      titleEn: 'Goal',
      content: info.goal,
      contentEn: info.goalEn,
      color: 'bg-kid-yellow/20 border-kid-yellow/40'
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'やりかた',
      titleEn: 'How it Works',
      content: info.method,
      contentEn: info.methodEn,
      color: 'bg-primary/10 border-primary/30'
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: '生活の中でのつかいみち',
      titleEn: 'Real-Life Use',
      content: info.realLife,
      contentEn: info.realLifeEn,
      color: 'bg-kid-green/20 border-kid-green/40'
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: 'できるようになると...',
      titleEn: 'Benefits',
      content: info.benefit,
      contentEn: info.benefitEn,
      color: 'bg-kid-purple/20 border-kid-purple/40'
    },
  ];

  return (
    <div className="bg-card rounded-2xl shadow-kid p-6 border-2 border-border mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{info.icon}</span>
        <div>
          <h3 className="text-xl font-black text-foreground">{info.label}</h3>
          <p className="text-sm text-gray-500">{info.labelEn}</p>
        </div>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`${section.color} rounded-xl p-4 border-2`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="text-foreground">{section.icon}</div>
              <div>
                <h4 className="font-bold text-foreground text-sm">{section.title}</h4>
                <p className="text-xs text-gray-500">{section.titleEn}</p>
              </div>
            </div>
            <p className="text-foreground text-sm leading-relaxed">{section.content}</p>
            <p className="text-gray-500 text-xs mt-1">{section.contentEn}</p>
          </div>
        ))}
      </div>

      {/* Order of Operations Visualizer */}
      {info.id === 'order-of-operations' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 計算のじゅんじょの例 / Order of operations example
          </p>
          <OrderOfOperationsTree {...orderOfOperationsExample} />
        </div>
      )}

      {/* Calculate Smartly Visualizer */}
      {info.id === 'calculate-smartly' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 くふうして計算の例 / Calculate smartly example
          </p>
          <CalculateSmartlyVisualizer {...calculateSmartlyExample} />
        </div>
      )}

      {/* Distributive Property Visualizer */}
      {info.id === 'distributive-property' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 分配法則の例 / Distributive property example
          </p>
          <AreaModel {...distributivePropertyExample} />
        </div>
      )}

      {/* Combining into One Equation Visualizer */}
      {info.id === 'combining-into-one-equation' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 1つの式に表す例 / Combining into one equation example
          </p>
          <CombiningEquationVisualizer {...combiningEquationExample} />
        </div>
      )}
    </div>
  );
};

export default CalculationRulesExplanationCard;
