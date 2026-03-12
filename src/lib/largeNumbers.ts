// Large Numbers & Rounding (大きな数とがい数) - 4th Grade MEXT Curriculum
// Focus: Reading numbers up to trillions (兆) and rounding (がい数)

export type LargeNumberTopic = 'reading-oku-cho' | 'rounding-off' | 'rounding-up-down' | 'calculating-oku-cho' | 'estimating-calculations';

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
  // For calculating with large numbers
  num1?: number;
  num2?: number;
  operation?: 'add' | 'subtract';
  unit?: string;
  unitEn?: string;
  // For estimating calculations
  roundedNum1?: number;
  roundedNum2?: number;
  roundPlace?: string;
  roundPlaceEn?: string;
}

export const LARGE_NUMBER_TOPICS: Record<LargeNumberTopic, LargeNumberTopicInfo> = {
  'reading-oku-cho': {
    id: 'reading-oku-cho',
    icon: '🔢',
    label: '億と兆の読み方',
    labelEn: 'Reading Oku and Cho',
    goal: '億や兆を使った、すごく大きな数の読み方と書き方をマスターしよう。',
    goalEn: 'Read and write super large numbers using Oku and Cho.',
    method: '① 右から4けたごとに「/」で区切ってみよう ② 右から順に「一」「万」「億」「兆」 ③ 例：45/0000/0000 → 45億、3/4500/0000/0000 → 3兆4500億',
    methodEn: 'Step 1: Add slashes every 4 digits from right. Step 2: From right: ones, 万, 億, 兆. Step 3: Example: 45/0000/0000 = 45億',
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
    method: '① 目標の位（千の位・万の位など）を見つける ② その右隣の数字をチェック ③ 0-4なら切り捨て、5-9なら切り上げ！ 例：34560の千の位→4の右は5だから切り上げて35000',
    methodEn: 'Step 1: Find target place (thousands, ten-thousands). Step 2: Check digit to its right. Step 3: 0-4=round down, 5-9=round up! Example: 34560 to thousands: 5 is next to 4, so round up to 35000',
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
    method: '① 問題を読んで「何を求めるか」確認 ② お金準備→切り上げ（足りなくなったら困る） ③ 何個買える→切り捨て（お金が足りないと買えない） 例：420円×3個=1260円→1000円札は2枚必要（切り上げ）',
    methodEn: 'Step 1: Read problem carefully. Step 2: Preparing money→round up (can\'t be short). Step 3: How many can buy→round down (can\'t buy without enough money). Example: 420×3=1260, need 2 bills (round up)',
    realLife: 'お金を準備するときや、何個買えるか計算するときに使うよ！',
    realLifeEn: 'When preparing money or calculating how many items you can buy!',
    benefit: '現実の問題を解くとき、正しい計算方法が選べるようになる！',
    benefitEn: 'You can choose the correct calculation method for real-world problems!',
  },
  'calculating-oku-cho': {
    id: 'calculating-oku-cho',
    icon: '🧮',
    label: '大きな数の計算',
    labelEn: 'Calculating with Large Numbers',
    goal: '「億」や「兆」の単位をつけたまま、たし算やひき算をしよう。',
    goalEn: 'Add and subtract massive numbers while keeping Oku and Cho units.',
    method: '① 単位（億、兆）をそろえる ② 数字部分をたし算・ひき算する ③ 単位をつけて答えを書く！ 例：3億5000万 + 4億2000万 = 7億7000万',
    methodEn: 'Step 1: Align units (Oku, Cho). Step 2: Add/subtract the numbers. Step 3: Add units to the answer! Example: 3億5000万 + 4億2000万 = 7億7000万',
    realLife: '国の人口を比べたり、世界中のお金の流れを計算するとき！',
    realLifeEn: 'When comparing country populations or calculating global money flows!',
    benefit: 'すごく大きな数でも、単位を使えばカンタンに計算できるようになる！',
    benefitEn: 'You can easily calculate huge numbers by using units!',
  },
  'estimating-calculations': {
    id: 'estimating-calculations',
    icon: '📊',
    label: 'がい算（見積もり）',
    labelEn: 'Estimating Calculations',
    goal: '計算する前に四捨五入して、およその答え（がい算）をパッと出そう。',
    goalEn: 'Round numbers before calculating to get a quick estimate.',
    method: '① 各数を四捨五入して、かんたんな数にする ② かんたんな数でたし算・ひき算する ③ およその答えがわかる！ 例：489 + 312 → 500 + 300 = 800（およそ）',
    methodEn: 'Step 1: Round each number to make them simple. Step 2: Add/subtract the simple numbers. Step 3: Get the approximate answer! Example: 489 + 312 → 500 + 300 = 800 (approximate)',
    realLife: 'お店で「このお菓子とこのジュース、1000円で買えるかな？」とパッと計算するとき！',
    realLifeEn: 'At a store quickly estimating "Can I buy this snack and juice with 1000 yen?"',
    benefit: '大きな数でも頭の中でパッと計算できるようになる！',
    benefitEn: 'You can quickly calculate large numbers in your head!',
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

  // Mix 3 round up and 2 round down problems with proper typing
  type RoundUpProblem = [number, number, number, string, string];
  type RoundDownProblem = [number, number, number, string, string];
  type MixedProblem = {
    unitPrice: number;
    quantity: number;
    answer: number;
    textJa: string;
    textEn: string;
    roundUp: boolean;
  };

  const mixedProblems: MixedProblem[] = [
    ...roundUpProblems.slice(0, 3).map((p: RoundUpProblem) => ({
      unitPrice: p[0],
      quantity: p[1],
      answer: p[2],
      textJa: p[3],
      textEn: p[4],
      roundUp: true,
    })),
    ...roundDownProblems.slice(0, 2).map((p: RoundDownProblem) => ({
      unitPrice: p[0],
      quantity: p[1],
      answer: p[2],
      textJa: p[3],
      textEn: p[4],
      roundUp: false,
    })),
  ];

  // Shuffle
  mixedProblems.sort(() => Math.random() - 0.5);

  mixedProblems.forEach((problem, index) => {
    const { unitPrice, quantity, answer, textJa, textEn, roundUp } = problem;
    const total = unitPrice * quantity;

    questions.push({
      id: index + 1,
      topic: 'rounding-up-down',
      questionText: textJa,
      questionTextEn: textEn,
      answer: answer,
      isWordProblem: true,
      roundUp: roundUp,
      formula: roundUp
        ? `計算: ${unitPrice} × ${quantity} = ${total}円 → 1000円札は${answer}枚必要`
        : `計算: ${total} ÷ ${unitPrice} = ${quantity}回 → ${answer}回まわせます`,
      formulaEn: roundUp
        ? `Calculation: ${unitPrice} × ${quantity} = ${total} yen → Need ${answer} bills`
        : `Calculation: ${total} ÷ ${unitPrice} = ${quantity} → Can buy ${answer}`,
    });
  });

  return questions;
}

// Generate questions for "Calculating with Oku and Cho" (大きな数の計算)
export function generateCalculatingOkuChoQuestions(): LargeNumberQuestion[] {
  const questions: LargeNumberQuestion[] = [];

  // Problem sets: [num1, num2, operation, answer, unit]
  // Simplified addition problems - same unit for clarity
  const addProblems: Array<[number, number, string, number, string]> = [
    [300000000, 400000000, 'add', 700000000, '億'],
    [500000000, 200000000, 'add', 700000000, '億'],
    [350000000, 420000000, 'add', 770000000, '億'],
    [5000000000, 3000000000, 'add', 8000000000, '億'],
    [12000000000, 8000000000, 'add', 20000000000, '億'],
    [2000000000, 1500000000, 'add', 3500000000, '億'],
    [6000000000, 2500000000, 'add', 8500000000, '億'],
    [45000000000, 38000000000, 'add', 83000000000, '億'],
    [2000000000000, 1500000000000, 'add', 3500000000000, '兆'],
    [6000000000000, 2500000000000, 'add', 8500000000000, '兆'],
  ];

  // Simplified subtraction problems - same unit for clarity
  const subProblems: Array<[number, number, string, number, string]> = [
    [800000000, 350000000, 'subtract', 450000000, '億'],
    [5000000000, 2000000000, 'subtract', 3000000000, '億'],
    [75000000000, 42000000000, 'subtract', 33000000000, '億'],
    [95000000000, 28000000000, 'subtract', 67000000000, '億'],
    [1000000000000, 600000000000, 'subtract', 400000000000, '兆'],
    [9000000000000, 4500000000000, 'subtract', 4500000000000, '兆'],
    [6200000000000, 1800000000000, 'subtract', 4400000000000, '兆'],
    [3400000000000, 1200000000000, 'subtract', 2200000000000, '兆'],
  ];

  // Mix 3 addition and 2 subtraction
  const selectedAdd = [...addProblems].sort(() => Math.random() - 0.5).slice(0, 3);
  const selectedSub = [...subProblems].sort(() => Math.random() - 0.5).slice(0, 2);
  const mixedProblems = [...selectedAdd, ...selectedSub];
  mixedProblems.sort(() => Math.random() - 0.5);

  mixedProblems.forEach(([num1, num2, op, answer, unit], index) => {
    const opSymbol = op === 'add' ? '+' : '-';
    const opText = op === 'add' ? 'たし算' : 'ひき算';
    const opTextEn = op === 'add' ? 'Add' : 'Subtract';
    const num1Formatted = formatJapaneseNumber(num1);
    const num2Formatted = formatJapaneseNumber(num2);
    const answerFormatted = formatJapaneseNumber(answer);

    questions.push({
      id: index + 1,
      topic: 'calculating-oku-cho',
      questionText: `${num1Formatted} ${opSymbol} ${num2Formatted} = ?`,
      questionTextEn: `${num1Formatted} ${opSymbol} ${num2Formatted} = ?`,
      answer: answerFormatted,
      formula: `計算: ${num1Formatted} ${opSymbol} ${num2Formatted} = ${answerFormatted}`,
      formulaEn: `Calculation: ${num1Formatted} ${opSymbol} ${num2Formatted} = ${answerFormatted}`,
      num1,
      num2,
      operation: op as 'add' | 'subtract',
      unit,
    });
  });

  return questions;
}

// Generate questions for "Estimating Calculations" (がい算・見積もり)
export function generateEstimatingQuestions(): LargeNumberQuestion[] {
  const questions: LargeNumberQuestion[] = [];

  // Problem sets: [num1, num2, roundPlace, rounded1, rounded2, estimatedAnswer]
  // Round to nearest hundred
  const toHundred: Array<[number, number, string, string, number, number, number, number]> = [
    [489, 312, '百', 'hundred', 500, 300, 800, 801],
    [456, 247, '百', 'hundred', 500, 200, 700, 703],
    [823, 175, '百', 'hundred', 800, 200, 1000, 998],
    [637, 289, '百', 'hundred', 600, 300, 900, 926],
    [154, 438, '百', 'hundred', 200, 400, 600, 592],
  ];

  // Round to nearest thousand
  const toThousand: Array<[number, number, string, string, number, number, number, number]> = [
    [3456, 2789, '千', 'thousand', 3000, 3000, 6000, 6245],
    [4823, 1500, '千', 'thousand', 5000, 2000, 7000, 6323],
    [5678, 2345, '千', 'thousand', 6000, 2000, 8000, 8023],
    [1234, 4890, '千', 'thousand', 1000, 5000, 6000, 6124],
    [7890, 1050, '千', 'thousand', 8000, 1000, 9000, 8940],
  ];

  // Mix problems from both sets
  const selectedHundred = [...toHundred].sort(() => Math.random() - 0.5).slice(0, 3);
  const selectedThousand = [...toThousand].sort(() => Math.random() - 0.5).slice(0, 2);
  const mixedProblems = [...selectedHundred, ...selectedThousand];
  mixedProblems.sort(() => Math.random() - 0.5);

  mixedProblems.forEach(([num1, num2, place, placeEn, rounded1, rounded2, estimated, exact], index) => {
    questions.push({
      id: index + 1,
      topic: 'estimating-calculations',
      questionText: `${num1} + ${num2} を、${place}の位で四捨五入してがい算しましょう。`,
      questionTextEn: `Estimate ${num1} + ${num2} by rounding to the nearest ${placeEn}.`,
      answer: estimated,
      formula: `がい算: ${num1} → ${rounded1}、${num2} → ${rounded2}、${rounded1} + ${rounded2} = ${estimated}（正確な答えは${exact}）`,
      formulaEn: `Estimate: ${num1} → ${rounded1}, ${num2} → ${rounded2}, ${rounded1} + ${rounded2} = ${estimated} (Exact answer: ${exact})`,
      num1,
      num2,
      roundedNum1: rounded1,
      roundedNum2: rounded2,
      roundPlace: place,
      roundPlaceEn: placeEn,
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
  if (topic === 'calculating-oku-cho') {
    return generateCalculatingOkuChoQuestions();
  }
  if (topic === 'estimating-calculations') {
    return generateEstimatingQuestions();
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
