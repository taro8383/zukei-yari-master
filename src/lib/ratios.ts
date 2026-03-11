// Ratios and Proportions (割合と倍) - 4th Grade MEXT Curriculum
// Focus: Finding the Ratio (何倍ですか / Finding the Multiple)

export type RatioTopic = 'finding-ratio' | 'finding-compared' | 'finding-base';

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
  type: RatioTopic;
  baseAmount: number; // もとにする数
  comparedAmount: number; // くらべる数
  ratio: number; // The multiplier (倍)
  answer: number; // The answer (ratio for finding-ratio, comparedAmount for finding-compared)
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
  'finding-compared': {
    id: 'finding-compared',
    icon: '🪣',
    label: 'くらべる数を求める',
    labelEn: 'Finding the Compared Amount',
    goal: 'もとにする数と倍がわかっているとき、くらべる数を求めよう。',
    goalEn: 'Calculate the total amount when you know the base and the multiplier.',
    method: 'もとにする数 × 倍 = くらべる数',
    methodEn: 'Base Amount × Ratio = Compared Amount',
    realLife: '料理で「お米の2倍の水を入れる」と計算しておいしく作るとき。',
    realLifeEn: 'When a recipe says "use 2 times the amount of water as rice" to make a bigger meal.',
  },
  'finding-base': {
    id: 'finding-base',
    icon: '🚗',
    label: 'もとにする数を求める',
    labelEn: 'Finding the Base Amount',
    goal: 'くらべる数と倍がわかっているとき、もとの数を求めよう。',
    goalEn: 'Find the original amount when you know the final amount and the multiplier.',
    method: 'くらべる数 ÷ 倍 = もとにする数',
    methodEn: 'Compared Amount ÷ Ratio = Base Amount',
    realLife: 'けいくんのミニカーは15cm進みました。これは妹のミニカーの3倍のきょりです。',
    realLifeEn: 'Kei\'s toy car traveled 15cm. This is 3 times further than his sister\'s car. How far did his sister\'s car travel?',
  },
};

// Generate questions for "Finding the Ratio" (何倍ですか)
// Using numbers that produce clean decimal ratios (0.5, 0.25, 0.75, 1.5, 2, 2.5, 3, etc.)
export function generateFindingRatioQuestions(): RatioQuestion[] {
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
        type: 'finding-ratio',
        baseAmount,
        comparedAmount,
        ratio,
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
        type: 'finding-ratio',
        baseAmount: comparedAmount,
        comparedAmount: baseAmount,
        ratio: reverseRatio,
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

// Generate questions for "Finding the Compared Amount" (くらべる数を求める)
export function generateFindingComparedQuestions(): RatioQuestion[] {
  const questions: RatioQuestion[] = [];

  // [baseAmount, ratio, comparedAmount]
  const problemSets: Array<[number, number, number]> = [
    // Whole number results
    [8, 2, 16],
    [8, 2.5, 20],
    [8, 3, 24],
    [8, 1.5, 12],
    [10, 2, 20],
    [10, 2.5, 25],
    [10, 3, 30],
    [10, 1.5, 15],
    [12, 2, 24],
    [12, 2.5, 30],
    [12, 3, 36],
    [12, 1.5, 18],
    [5, 2, 10],
    [5, 3, 15],
    [5, 4, 20],
    [6, 2, 12],
    [6, 2.5, 15],
    [6, 3, 18],
    [4, 2, 8],
    [4, 3, 12],
    [4, 4, 16],
    [15, 2, 30],
    [15, 1.5, 22.5],
    [20, 1.5, 30],
    [20, 2, 40],
    // Decimal results
    [5, 1.2, 6],
    [10, 1.2, 12],
    [15, 1.2, 18],
    [25, 1.2, 30],
    [5, 2.4, 12],
    [10, 2.4, 24],
    [5, 1.4, 7],
    [10, 1.4, 14],
    [5, 1.6, 8],
    [10, 1.6, 16],
    [5, 1.8, 9],
    [10, 1.8, 18],
    [4, 1.5, 6],
    [8, 1.25, 10],
    [12, 1.25, 15],
    [16, 1.25, 20],
    [8, 1.5, 12],
    [14, 1.5, 21],
    [18, 1.5, 27],
    [6, 1.2, 7.2],
    [8, 1.4, 11.2],
    [6, 2.2, 13.2],
    [10, 2.2, 22],
    [5, 3.2, 16],
    [10, 3.2, 32],
    [8, 2.4, 19.2],
    [4, 2.2, 8.8],
    [5, 2.6, 13],
    [10, 2.6, 26],
    [4, 3.5, 14],
    [6, 3.5, 21],
    [8, 3.5, 28],
    [2, 3.5, 7],
    [20, 1.25, 25],
    [20, 2.2, 44],
    [15, 1.4, 21],
    [15, 1.6, 24],
    [12, 1.4, 16.8],
    [12, 1.6, 19.2],
    [8, 2.2, 17.6],
    [8, 2.6, 20.8],
    [6, 1.4, 8.4],
    [6, 1.6, 9.6],
    [6, 1.8, 10.8],
    [4, 1.8, 7.2],
    [4, 2.4, 9.6],
    [4, 2.6, 10.4],
    [10, 1.3, 13],
    [10, 1.7, 17],
    [10, 1.9, 19],
  ];

  // Shuffle and pick 5 unique questions
  const shuffled = [...problemSets].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);

  selected.forEach(([baseAmount, ratio, comparedAmount], index) => {
    questions.push({
      id: index + 1,
      type: 'finding-compared',
      baseAmount,
      comparedAmount,
      ratio,
      answer: comparedAmount,
      text: `赤いバケツには ${baseAmount}L 入ります。青いバケツは赤いバケツの ${ratio} 倍の水が入ります。青いバケツには何L入りますか？`,
      textEn: `The red bucket holds ${baseAmount}L. The blue bucket holds ${ratio} times that amount. How many liters does the blue bucket hold?`,
      explanation: `${baseAmount} × ${ratio} = ${comparedAmount}`,
      explanationEn: `${baseAmount} × ${ratio} = ${comparedAmount}`,
    });
  });

  return questions;
}

// Generate questions for "Finding the Base Amount" (もとにする数を求める)
export function generateFindingBaseQuestions(): RatioQuestion[] {
  const questions: RatioQuestion[] = [];

  // [comparedAmount, ratio, baseAmount]
  const problemSets: Array<[number, number, number]> = [
    // Whole number results
    [15, 3, 5],
    [12, 2, 6],
    [18, 3, 6],
    [20, 2, 10],
    [30, 3, 10],
    [24, 2, 12],
    [36, 3, 12],
    [40, 2, 20],
    [60, 3, 20],
    [16, 2, 8],
    [24, 3, 8],
    [32, 2, 16],
    [48, 3, 16],
    [14, 2, 7],
    [21, 3, 7],
    [28, 2, 14],
    [42, 3, 14],
    [10, 2, 5],
    [15, 3, 5],
    [20, 4, 5],
    [25, 5, 5],
    // Decimal ratios with whole number results
    [12, 1.5, 8],
    [18, 1.5, 12],
    [24, 1.5, 16],
    [30, 1.5, 20],
    [9, 1.5, 6],
    [15, 2.5, 6],
    [25, 2.5, 10],
    [20, 2.5, 8],
    [30, 2.5, 12],
    [35, 2.5, 14],
    [40, 2.5, 16],
    [16, 1.6, 10],
    [24, 1.6, 15],
    [32, 1.6, 20],
    [14, 1.4, 10],
    [21, 1.4, 15],
    [28, 1.4, 20],
    [18, 1.2, 15],
    [24, 1.2, 20],
    [30, 1.2, 25],
    [36, 1.2, 30],
    [12, 1.2, 10],
    // Decimal results
    [7, 2, 3.5],
    [11, 2, 5.5],
    [13, 2, 6.5],
    [17, 2, 8.5],
    [9, 2, 4.5],
    [6, 1.5, 4],
    [10, 2.5, 4],
    [8, 2.5, 3.2],
    [13, 2.5, 5.2],
    [17, 2.5, 6.8],
    [19, 2.5, 7.6],
    [11, 2.5, 4.4],
    [7, 1.4, 5],
    [14, 1.4, 10],
    [21, 1.4, 15],
    [28, 1.4, 20],
    [11, 1.1, 10],
    [22, 1.1, 20],
    [33, 1.1, 30],
    [12, 1.2, 10],
    [18, 1.2, 15],
    [24, 1.2, 20],
    [15, 1.5, 10],
    [22.5, 1.5, 15],
    [30, 1.5, 20],
    [9, 1.5, 6],
    [13.5, 1.5, 9],
    [18, 1.5, 12],
  ];

  // Shuffle and pick 5 unique questions
  const shuffled = [...problemSets].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);

  selected.forEach(([comparedAmount, ratio, baseAmount], index) => {
    questions.push({
      id: index + 1,
      type: 'finding-base',
      baseAmount,
      comparedAmount,
      ratio,
      answer: baseAmount,
      text: `けいくんのミニカーは ${comparedAmount}cm 進みました。これは妹のミニカーの ${ratio} 倍のきょりです。妹のミニカーは何cm進みましたか？`,
      textEn: `Kei's toy car traveled ${comparedAmount}cm. This is ${ratio} times further than his sister's car. How many centimeters did his sister's car travel?`,
      explanation: `${comparedAmount} ÷ ${ratio} = ${baseAmount}`,
      explanationEn: `${comparedAmount} ÷ ${ratio} = ${baseAmount}`,
    });
  });

  return questions;
}

// Main function to generate ratio questions based on topic
export function generateRatioQuestions(topic: RatioTopic): RatioQuestion[] {
  if (topic === 'finding-compared') {
    return generateFindingComparedQuestions();
  }
  if (topic === 'finding-base') {
    return generateFindingBaseQuestions();
  }
  return generateFindingRatioQuestions();
}

// Format ratio for display (handle whole numbers and decimals nicely)
export function formatRatio(ratio: number): string {
  if (ratio === Math.floor(ratio)) {
    return ratio.toString();
  }
  return ratio.toFixed(1);
}
