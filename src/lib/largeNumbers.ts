// Large Numbers & Rounding (大きな数とがい数) - 4th Grade MEXT Curriculum
// Focus: Reading numbers up to trillions (兆) and rounding (がい数)

export type LargeNumberTopic = 'reading-oku-cho' | 'rounding-off' | 'rounding-up-down';

export interface LargeNumberTopicInfo {
  id: LargeNumberTopic;
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
}

export interface LargeNumberQuestion {
  id: number;
  topic: LargeNumberTopic;
  questionText: string;
  questionTextEn: string;
  answer: string | number;
  formula: string;
  formulaEn: string;
  // For reading-oku-cho: the numeric value
  numericValue?: number;
  // For rounding: the original number and target place
  originalNumber?: number;
  targetPlace?: string;
  targetPlaceEn?: string;
  // For word problems
  isWordProblem?: boolean;
  roundUp?: boolean; // true for round up, false for round down
}

export const LARGE_NUMBER_TOPICS: Record<LargeNumberTopic, LargeNumberTopicInfo> = {
  'reading-oku-cho': {
    id: 'reading-oku-cho',
    icon: '🔢',
    label: '億と兆の読み方',
    labelEn: 'Reading Oku and Cho',
    goal: '億や兆を使った、すごく大きな数の読み方と書き方をマスターしよう。',
    goalEn: 'Read and write super large numbers using Oku and Cho.',
    method: '日本の数は4けたごとに「万」「億」「兆」と名前が変わるよ。',
    methodEn: 'Japanese numbers are grouped by fours: 万 (10,000), 億 (100,000,000), 兆 (1,000,000,000,000).',
    realLife: '世界中で人気のYouTubeの再生回数や、宇宙の星と星のきょりを計算するときに使うよ！',
    realLifeEn: 'Counting views on a world-famous YouTube video or the distance between planets in space!',
    benefit: '最強のボスのHPや、世界中の人口がどれくらいすごいかすぐにわかる！',
    benefitEn: 'You will easily understand the stats of ultimate boss monsters or the population of the whole world.',
  },
  'rounding-off': {
    id: 'rounding-off',
    icon: '🎯',
    label: '四捨五入（ししゃごにゅう）',
    labelEn: 'Rounding Off',
    goal: '四捨五入をして、わかりやすい「がい数（およその数）」を作ろう。',
    goalEn: 'Find the approximate number by rounding off.',
    method: '0, 1, 2, 3, 4 は切り捨て。5, 6, 7, 8, 9 は切り上げるよ。',
    methodEn: '0, 1, 2, 3, 4 mean round down. 5, 6, 7, 8, 9 mean round up.',
    realLife: 'ゲームをいくつか買うとき、お金が足りるかパッと計算するとき！',
    realLifeEn: 'Quickly estimating if you have enough money to buy multiple games.',
    benefit: '大きな数を簡単に比べたり、計算したりできるようになる！',
    benefitEn: 'You can easily compare and calculate large numbers!',
  },
  'rounding-up-down': {
    id: 'rounding-up-down',
    icon: '⬆️',
    label: '切り捨てと切り上げ',
    labelEn: 'Rounding Down and Up',
    goal: 'どんな時に「切り捨て」や「切り上げ」を使うか考えよう。',
    goalEn: 'Know when to strictly round down or round up in real situations.',
    method: 'お金を準備するときは、足りなくならないように「切り上げ」を使うことが多いよ。',
    methodEn: 'For shopping budgets, you usually round up to be safe.',
    realLife: 'お金を準備するときや、何個買えるか計算するときに使うよ！',
    realLifeEn: 'When preparing money or calculating how many items you can buy!',
    benefit: '現実の問題を解くとき、正しい計算方法が選べるようになる！',
    benefitEn: 'You can choose the correct calculation method for real-world problems!',
  },
};

// Generate questions for "Reading Oku and Cho" (億と兆の読み方)
export function generateReadingOkuChoQuestions(): LargeNumberQuestion[] {
  const questions: LargeNumberQuestion[] = [];

  // Generate 5 questions with large numbers
  const problemSets: Array<[number, string]> = [
    [4500000000, '45億'],
    [12300000000, '123億'],
    [500000000000, '5000億'],
    [1000000000000, '1兆'],
    [3400000000000, '3兆4000億'],
    [800000000, '8億'],
    [25000000000, '250億'],
    [6700000000000, '6兆7000億'],
    [12000000000000, '12兆'],
    [999000000000, '9990億'],
  ];

  // Shuffle and pick 5 unique questions
  const shuffled = [...problemSets].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);

  selected.forEach(([numericValue, answer], index) => {
    questions.push({
      id: index + 1,
      topic: 'reading-oku-cho',
      questionText: `この数を漢字を使って書きましょう：${numericValue.toLocaleString()}`,
      questionTextEn: `Write this number using Kanji: ${numericValue.toLocaleString()}`,
      answer: answer,
      numericValue: numericValue,
      formula: `正解: ${answer}`,
      formulaEn: `Correct: ${answer}`,
    });
  });

  return questions;
}

// Generate questions for "Rounding Off" (四捨五入)
export function generateRoundingOffQuestions(): LargeNumberQuestion[] {
  const questions: LargeNumberQuestion[] = [];

  // [originalNumber, targetPlace, targetPlaceEn, answer, explanation]
  const problemSets: Array<[number, string, string, number, string]> = [
    [34560, '千の位', 'thousands place', 35000, '百の位の「5」を切り上げる'],
    [28430, '千の位', 'thousands place', 28000, '百の位の「4」を切り捨てる'],
    [156789, '万の位', 'ten-thousands place', 160000, '千の位の「6」を切り上げる'],
    [423400, '万の位', 'ten-thousands place', 420000, '千の位の「3」を切り捨てる'],
    [8765432, '百万の位', 'millions place', 9000000, '十万の位の「7」を切り上げる'],
    [1234567, '百万の位', 'millions place', 1000000, '十万の位の「2」を切り捨てる'],
    [56789, '千の位', 'thousands place', 57000, '百の位の「7」を切り上げる'],
    [43210, '千の位', 'thousands place', 43000, '百の位の「2」を切り捨てる'],
    [9876543, '万の位', 'ten-thousands place', 9880000, '千の位の「6」を切り上げる'],
    [12345678, '千万の位', 'ten-millions place', 12000000, '百万の位の「3」を切り捨てる'],
  ];

  // Shuffle and pick 5 unique questions
  const shuffled = [...problemSets].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);

  selected.forEach(([originalNumber, targetPlace, targetPlaceEn, answer, explanation], index) => {
    questions.push({
      id: index + 1,
      topic: 'rounding-off',
      questionText: `${originalNumber.toLocaleString()}を四捨五入して、${targetPlace}までのがい数にしましょう。`,
      questionTextEn: `Round ${originalNumber.toLocaleString()} to the nearest ${targetPlaceEn}.`,
      answer: answer,
      originalNumber: originalNumber,
      targetPlace: targetPlace,
      targetPlaceEn: targetPlaceEn,
      formula: `正解: ${answer.toLocaleString()} (${explanation}よ)`,
      formulaEn: `Correct: ${answer.toLocaleString()} (${explanation})`,
    });
  });

  return questions;
}

// Generate questions for "Rounding Up and Down" (切り捨てと切り上げ)
export function generateRoundingUpDownQuestions(): LargeNumberQuestion[] {
  const questions: LargeNumberQuestion[] = [];

  // Round up problems (shopping with 1000-yen bills)
  const roundUpProblems: Array<[number, number, number, string, string]> = [
    [420, 3, 2, 'けいくんは420円のアイテムを3つ買います。1000円札だけで払うとき、1000円札は何枚いりますか？',
      'Kei wants to buy 3 items that cost 420 yen each. He only has 1000-yen bills. How many 1000-yen bills does he need?'],
    [350, 4, 2, '1個350円のお菓子を4つ買います。1000円札は何枚必要ですか？',
      'You want to buy 4 snacks at 350 yen each. How many 1000-yen bills do you need?'],
    [680, 2, 2, '680円の本を2冊買います。1000円札は何枚いりますか？',
      'You want to buy 2 books at 680 yen each. How many 1000-yen bills do you need?'],
    [299, 5, 2, '1個299円のジュースを5本買います。1000円札は何枚必要ですか？',
      'You want to buy 5 juices at 299 yen each. How many 1000-yen bills do you need?'],
    [850, 3, 3, '850円のゲームカードを3枚買います。1000円札は何枚いりますか？',
      'You want to buy 3 game cards at 850 yen each. How many 1000-yen bills do you need?'],
  ];

  // Round down problems (how many can you buy)
  const roundDownProblems: Array<[number, number, number, string, string]> = [
    [2500, 300, 8, 'けいくんは2500円持っています。300円のガチャガチャは何回まわせますか？',
      'Kei has 2500 yen. A capsule toy costs 300 yen. How many can he buy?'],
    [5000, 800, 6, '5000円持っています。800円のおもちゃは何個買えますか？',
      'You have 5000 yen. A toy costs 800 yen. How many can you buy?'],
    [10000, 1200, 8, '10000円持っています。1200円の本は何冊買えますか？',
      'You have 10000 yen. A book costs 1200 yen. How many can you buy?'],
    [3000, 450, 6, '3000円持っています。450円のお菓子セットは何個買えますか？',
      'You have 3000 yen. A snack set costs 450 yen. How many can you buy?'],
    [8000, 1500, 5, '8000円持っています。1500円のゲームソフトは何本買えますか？',
      'You have 8000 yen. A game costs 1500 yen. How many can you buy?'],
  ];

  // Mix 3 round up and 2 round down problems
  const mixedProblems = [
    ...roundUpProblems.slice(0, 3).map(p => ({ ...p, roundUp: true })),
    ...roundDownProblems.slice(0, 2).map(p => ({ ...p, roundUp: false })),
  ];

  // Shuffle
  mixedProblems.sort(() => Math.random() - 0.5);

  mixedProblems.forEach((problem, index) => {
    const [unitPrice, quantity, answer, textJa, textEn] = problem;
    const total = unitPrice * quantity;

    questions.push({
      id: index + 1,
      topic: 'rounding-up-down',
      questionText: textJa,
      questionTextEn: textEn,
      answer: answer,
      isWordProblem: true,
      roundUp: problem.roundUp,
      formula: problem.roundUp
        ? `計算: ${unitPrice} × ${quantity} = ${total}円 → 1000円札は${answer}枚必要`
        : `計算: ${total} ÷ ${unitPrice} = ${quantity}回 → ${answer}回まわせます`,
      formulaEn: problem.roundUp
        ? `Calculation: ${unitPrice} × ${quantity} = ${total} yen → Need ${answer} bills`
        : `Calculation: ${total} ÷ ${unitPrice} = ${quantity} → Can buy ${answer}`,
    });
  });

  return questions;
}

// Main function to generate questions based on topic
export function generateLargeNumberQuestions(topic: LargeNumberTopic): LargeNumberQuestion[] {
  if (topic === 'rounding-off') {
    return generateRoundingOffQuestions();
  }
  if (topic === 'rounding-up-down') {
    return generateRoundingUpDownQuestions();
  }
  return generateReadingOkuChoQuestions();
}

// Format large numbers with Japanese units
export function formatJapaneseNumber(num: number): string {
  if (num >= 1000000000000) {
    const cho = Math.floor(num / 1000000000000);
    const remainder = num % 1000000000000;
    if (remainder === 0) return `${cho}兆`;
    const oku = Math.floor(remainder / 100000000);
    if (oku === 0) return `${cho}兆`;
    return `${cho}兆${oku}億`;
  }
  if (num >= 100000000) {
    const oku = Math.floor(num / 100000000);
    const remainder = num % 100000000;
    if (remainder === 0) return `${oku}億`;
    const man = Math.floor(remainder / 10000);
    if (man === 0) return `${oku}億`;
    return `${oku}億${man}万`;
  }
  if (num >= 10000) {
    const man = Math.floor(num / 10000);
    return `${man}万`;
  }
  return num.toString();
}
