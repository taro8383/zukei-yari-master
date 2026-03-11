// Ratios and Proportions (割合と倍) - 4th Grade MEXT Curriculum
// Focus: Finding the Ratio (何倍ですか / Finding the Multiple)

export type RatioTopic = 'finding-ratio';

export interface RatioTopicInfo {
  id: RatioTopic;
  icon: string;
  label: string;
  labelEn: string;
  goal: string;
  goalEn: string;
  method: string;
  methodEn: string;
  realLife: string;
  realLifeEn: string;
}

export interface RatioQuestion {
  id: number;
  baseAmount: number; // もとにする数
  comparedAmount: number; // くらべる数
  answer: number; // The ratio/multiple (rounded to 1 decimal place for simplicity)
  text: string;
  textEn: string;
  explanation: string;
  explanationEn: string;
}

export const RATIO_TOPICS: Record<RatioTopic, RatioTopicInfo> = {
  'finding-ratio': {
    id: 'finding-ratio',
    icon: '📏',
    label: '何倍ですか',
    labelEn: 'Finding the Multiple',
    goal: '一つの数がもう一つの数の何倍かを求めよう。',
    goalEn: 'Find out how many times bigger one thing is compared to another.',
    method: 'くらべる数 ÷ もとにする数 = 倍（割合）',
    methodEn: 'Compared Amount ÷ Base Amount = Ratio',
    realLife: 'ゲームで「ぼくのHPは君の1.5倍だ！」',
    realLifeEn: 'When comparing player stats in a video game, like "My character has 1.5 times more HP than yours!"',
  },
};

// Generate random ratio questions
// Using numbers that produce clean decimal ratios (0.5, 0.25, 0.75, 1.5, 2, 2.5, 3, etc.)
export function generateRatioQuestions(): RatioQuestion[] {
  const questions: RatioQuestion[] = [];

  // Predefined pairs that give nice decimal results
  const ratioPairs: Array<[number, number, number]> = [
    // [baseAmount, comparedAmount, expectedRatio]
    [10, 5, 0.5],
    [10, 15, 1.5],
    [10, 20, 2],
    [10, 25, 2.5],
    [10, 30, 3],
    [8, 4, 0.5],
    [8, 12, 1.5],
    [8, 16, 2],
    [8, 20, 2.5],
    [8, 24, 3],
    [4, 6, 1.5],
    [4, 8, 2],
    [4, 10, 2.5],
    [4, 12, 3],
    [4, 2, 0.5],
    [20, 10, 0.5],
    [20, 30, 1.5],
    [20, 40, 2],
    [20, 50, 2.5],
    [20, 60, 3],
    [12, 6, 0.5],
    [12, 18, 1.5],
    [12, 24, 2],
    [12, 30, 2.5],
    [12, 36, 3],
    [16, 8, 0.5],
    [16, 24, 1.5],
    [16, 32, 2],
    [16, 40, 2.5],
    [16, 48, 3],
  ];

  // Shuffle and pick 5 unique questions
  const shuffled = [...ratioPairs].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);

  selected.forEach(([baseAmount, comparedAmount, ratio], index) => {
    // Randomly decide whether to ask for "A is how many times B" or "B is how many times A"
    const askForComparedOverBase = Math.random() > 0.5;

    if (askForComparedOverBase) {
      // Standard: Compared ÷ Base
      questions.push({
        id: index + 1,
        baseAmount,
        comparedAmount,
        answer: ratio,
        text: `もとにする数が ${baseAmount}、くらべる数が ${comparedAmount} のとき、くらべる数はもとにする数の何倍ですか？`,
        textEn: `When the base amount is ${baseAmount} and the compared amount is ${comparedAmount}, how many times bigger is the compared amount?`,
        explanation: `${comparedAmount} ÷ ${baseAmount} = ${ratio}`,
        explanationEn: `${comparedAmount} ÷ ${baseAmount} = ${ratio}`,
      });
    } else {
      // Reverse: Base ÷ Compared
      const reverseRatio = Math.round((baseAmount / comparedAmount) * 100) / 100;
      questions.push({
        id: index + 1,
        baseAmount: comparedAmount,
        comparedAmount: baseAmount,
        answer: reverseRatio,
        text: `もとにする数が ${comparedAmount}、くらべる数が ${baseAmount} のとき、くらべる数はもとにする数の何倍ですか？`,
        textEn: `When the base amount is ${comparedAmount} and the compared amount is ${baseAmount}, how many times bigger is the compared amount?`,
        explanation: `${baseAmount} ÷ ${comparedAmount} = ${reverseRatio}`,
        explanationEn: `${baseAmount} ÷ ${comparedAmount} = ${reverseRatio}`,
      });
    }
  });

  return questions;
}

// Format ratio for display (handle whole numbers and decimals nicely)
export function formatRatio(ratio: number): string {
  if (ratio === Math.floor(ratio)) {
    return ratio.toString();
  }
  return ratio.toFixed(1);
}
