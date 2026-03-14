export type DivisionTopic = 'division-with-remainder' | 'long-division' | 'division-properties' | 'long-division-2digit' | 'mental-division';

export interface DivisionTopicInfo {
  id: DivisionTopic;
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

export interface DivisionQuestion {
  id: string;
  topic: DivisionTopic;
  text: string;
  textEn: string;
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  // For long division step-by-step
  steps?: Array<{
    description: string;
    descriptionEn: string;
    answer: number;
  }>;
  // For properties - the simplified division
  simplifiedDividend?: number;
  simplifiedDivisor?: number;
  formula: string;
  formulaEn: string;
  explanation: string;
  explanationEn: string;
}

export const DIVISION_TOPICS: Record<DivisionTopic, DivisionTopicInfo> = {
  'division-with-remainder': {
    id: 'division-with-remainder',
    icon: '📦',
    label: 'あまりのあるわり算',
    labelEn: 'Division with Remainders',
    goal: '平等に分けて、残った数（あまり）を正確に計算しよう！',
    goalEn: 'Divide equally and accurately calculate what is left over!',
    method: '① 全部の数 ÷ 分ける数 = 1つ分の数 … あまり 例：15 ÷ 4 = 3 … 3',
    methodEn: '① Total ÷ Number of Groups = Amount per Group ... Remainder. Example: 15 ÷ 4 = 3 ... 3',
    realLife: '15個の回復アイテムを4人の仲間で分けるとき。1人3個ずつで、アイテムボックスに3個あまるね！',
    realLifeEn: 'When you have 15 health potions and 4 party members. Everyone gets 3, and 3 are left in the item box!',
    benefit: '宝箱のアイテムを完璧に分けられるから、友達とケンカにならない！',
    benefitEn: 'You will never fight over loot drops with your friends because you can divide loot perfectly!',
  },
  'long-division': {
    id: 'long-division',
    icon: '📝',
    label: 'わり算の筆算',
    labelEn: 'Long Division (Hissan)',
    goal: '大きな数も、「筆算」のコンボを使って順番にたおそう！',
    goalEn: 'Defeat giant numbers step-by-step using the long division combo!',
    method: '例：126 ÷ 3 のやり方 ①【たてる】3×?=12またはそれ以下 → 4をたてる ②【かける】3×4=12を書く ③【ひく】12-12=0 ④【おろす】次の6をおろす → 3×2=6で6-6=0 → 答え42',
    methodEn: 'Example: 126 ÷ 3. Step 1【Estimate】3×?=12 or less → write 4 on top. Step 2【Multiply】Write 3×4=12 below. Step 3【Subtract】12-12=0. Step 4【Bring down】Bring down the 6 → 3×2=6, 6-6=0 → Answer: 42',
    realLife: 'ゲームでゲットした850の経験値(EXP)を、3人のキャラクターに平等に振り分けるとき！',
    realLifeEn: 'Distributing 850 EXP points evenly among 3 characters in a game!',
    benefit: '大きな数でも自信を持って計算できるようになる！',
    benefitEn: 'You will be able to calculate large numbers with confidence!',
  },
  'division-properties': {
    id: 'division-properties',
    icon: '⚡',
    label: 'わり算の性質',
    labelEn: 'Properties of Division',
    goal: '両方の数を小さくして、むずかしいわり算を一瞬で解く裏ワザを使おう！',
    goalEn: 'Shrink both numbers to make hard division problems incredibly easy!',
    method: '割られる数と割る数の両方を同じ数で割っても、答えは変わらない！ 例：800 ÷ 200 → 8 ÷ 2 = 4',
    methodEn: 'If you divide both numbers by the same amount, the answer stays the same! Example: 800 ÷ 200 → 8 ÷ 2 = 4',
    realLife: 'お店で100枚の銅貨を1枚の金貨に両替して、パッと計算しやすくするのと同じ！',
    realLifeEn: 'Trading 100 small copper coins for 1 big gold coin to make counting faster at the shop!',
    benefit: '大きな数の計算が一瞬でできるようになる！',
    benefitEn: 'You will be able to calculate large numbers in an instant!',
  },
  'long-division-2digit': {
    id: 'long-division-2digit',
    icon: '✏️',
    label: '2けたの数でわる筆算',
    labelEn: 'Long Division by 2-Digit Numbers',
    goal: 'わる数が2けたのときは、見当をつけて（仮商）筆算しよう。',
    goalEn: 'Divide big numbers by estimating the "trial quotient".',
    method: '例：256 ÷ 32 のやり方 ①【見当】32×?=256 またはそれ以下 → 8をたてる（32×8=256） ②【かける】32×8=256を書く ③【ひく】256-256=0 → 答え8',
    methodEn: 'Example: 256 ÷ 32. Step 1【Estimate】32×?=256 or less → write 8 on top. Step 2【Multiply】Write 32×8=256 below. Step 3【Subtract】256-256=0 → Answer: 8',
    realLife: 'ゲームで480のゴールドを15人のパーティーで分けるとき。32Gずつ配れる！',
    realLifeEn: 'Dividing 480 gold among 15 party members in a game. Each gets 32G!',
    benefit: '2けたのわり算も自信を持って計算できるようになる！',
    benefitEn: 'You will be able to calculate 2-digit divisor problems with confidence!',
  },
  'mental-division': {
    id: 'mental-division',
    icon: '🧠',
    label: 'わり算の暗算',
    labelEn: 'Mental Math for Division',
    goal: '0を消す裏ワザを使って、頭の中だけでわり算をしよう。',
    goalEn: 'Solve large divisions in your head by canceling zeros.',
    method: '① 割られる数と割る数の末尾の0を同じ数だけ消す ② 消した後の数でわり算する 例：600 ÷ 20 → 60 ÷ 2 = 30',
    methodEn: 'Step 1: Remove the same number of trailing zeros from both numbers. Step 2: Divide the simplified numbers. Example: 600 ÷ 20 → 60 ÷ 2 = 30',
    realLife: '「600円のゲームを20人で出し合うと、1人いくら？」をパッと計算！',
    realLifeEn: 'Quickly calculating "How much per person for a 600 yen game split by 20 people?"',
    benefit: '大きな数でも頭の中でパッと計算できるようになる！',
    benefitEn: 'You can quickly calculate large numbers in your head!',
  },
};

// Generate division with remainder questions
function generateDivisionWithRemainderQuestions(): DivisionQuestion[] {
  const questions: DivisionQuestion[] = [];

  for (let i = 0; i < 5; i++) {
    // Generate 2-digit dividend (10-99) and 1-digit divisor (2-9) with remainder
    let dividend: number, divisor: number, quotient: number, remainder: number;

    do {
      divisor = Math.floor(Math.random() * 8) + 2; // 2-9
      quotient = Math.floor(Math.random() * 9) + 1; // 1-9
      remainder = Math.floor(Math.random() * (divisor - 1)) + 1; // 1 to divisor-1
      dividend = divisor * quotient + remainder;
    } while (dividend < 10 || dividend > 99); // Ensure 2-digit dividend

    questions.push({
      id: `remainder-${i}`,
      topic: 'division-with-remainder',
      text: `計算をして、あまりも求めましょう。`,
      textEn: 'Calculate and find the remainder.',
      dividend,
      divisor,
      quotient,
      remainder,
      formula: `正解: ${dividend} ÷ ${divisor} = ${quotient} ... ${remainder}（確かめ算: ${divisor} × ${quotient} + ${remainder} = ${dividend}）`,
      formulaEn: `Answer: ${dividend} ÷ ${divisor} = ${quotient} ... ${remainder} (Check: ${divisor} × ${quotient} + ${remainder} = ${dividend})`,
      explanation: `${dividend} ÷ ${divisor} = ${quotient} ... ${remainder}（あまり ${remainder}）`,
      explanationEn: `${dividend} ÷ ${divisor} = ${quotient} ... ${remainder} (remainder ${remainder})`,
    });
  }

  return questions;
}

// Generate long division questions
function generateLongDivisionQuestions(): DivisionQuestion[] {
  const questions: DivisionQuestion[] = [];

  for (let i = 0; i < 5; i++) {
    // Generate 3-digit dividend and 1-2 digit divisor
    const divisor = Math.random() < 0.5
      ? Math.floor(Math.random() * 8) + 2 // 1-digit: 2-9
      : Math.floor(Math.random() * 90) + 10; // 2-digit: 10-99

    const quotient = Math.floor(Math.random() * 90) + 10; // 2-digit quotient
    const dividend = divisor * quotient;

    // Calculate steps for long division
    const steps = [];
    let currentDividend = dividend;
    let currentDivisor = divisor;

    // Step 1: First digit/2-digit estimation
    const firstEstimate = Math.floor(currentDividend / currentDivisor);
    const firstProduct = firstEstimate * currentDivisor;
    const firstRemainder = currentDividend - firstProduct;

    questions.push({
      id: `long-${i}`,
      topic: 'long-division',
      text: `筆算で計算しましょう。`,
      textEn: 'Calculate using long division.',
      dividend,
      divisor,
      quotient,
      remainder: 0,
      formula: `正解: ${dividend} ÷ ${divisor} = ${quotient}`,
      formulaEn: `Answer: ${dividend} ÷ ${divisor} = ${quotient}`,
      explanation: `${dividend} ÷ ${divisor} = ${quotient}`,
      explanationEn: `${dividend} ÷ ${divisor} = ${quotient}`,
    });
  }

  return questions;
}

// Generate division properties questions
function generateDivisionPropertiesQuestions(): DivisionQuestion[] {
  const questions: DivisionQuestion[] = [];

  // Division properties: divide both numbers by the same factor (2, 3, 4, 5, etc.)
  // NOT just canceling zeros - that's for Mental Division
  const pairs = [
    // Divide by 2
    { dividend: 84, divisor: 12, simplifiedDividend: 42, simplifiedDivisor: 6, factor: 2 },
    { dividend: 96, divisor: 16, simplifiedDividend: 48, simplifiedDivisor: 8, factor: 2 },
    { dividend: 128, divisor: 32, simplifiedDividend: 64, simplifiedDivisor: 16, factor: 2 },
    // Divide by 3
    { dividend: 72, divisor: 18, simplifiedDividend: 24, simplifiedDivisor: 6, factor: 3 },
    { dividend: 90, divisor: 15, simplifiedDividend: 30, simplifiedDivisor: 5, factor: 3 },
    { dividend: 135, divisor: 27, simplifiedDividend: 45, simplifiedDivisor: 9, factor: 3 },
    // Divide by 4
    { dividend: 80, divisor: 16, simplifiedDividend: 20, simplifiedDivisor: 4, factor: 4 },
    { dividend: 112, divisor: 28, simplifiedDividend: 28, simplifiedDivisor: 7, factor: 4 },
    // Divide by 5
    { dividend: 85, divisor: 15, simplifiedDividend: 17, simplifiedDivisor: 3, factor: 5 },
    { dividend: 125, divisor: 25, simplifiedDividend: 25, simplifiedDivisor: 5, factor: 5 },
    // Divide by 6
    { dividend: 96, divisor: 24, simplifiedDividend: 16, simplifiedDivisor: 4, factor: 6 },
    // Divide by 8
    { dividend: 144, divisor: 16, simplifiedDividend: 18, simplifiedDivisor: 2, factor: 8 },
  ];

  const usedIndices = new Set<number>();

  for (let i = 0; i < 5; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * pairs.length);
    } while (usedIndices.has(index));
    usedIndices.add(index);

    const pair = pairs[index];
    const quotient = pair.dividend / pair.divisor;

    questions.push({
      id: `prop-${i}`,
      topic: 'division-properties',
      text: `わり算の性質を使って計算しましょう。`,
      textEn: `Calculate using the properties of division.`,
      dividend: pair.dividend,
      divisor: pair.divisor,
      quotient,
      remainder: 0,
      simplifiedDividend: pair.simplifiedDividend,
      simplifiedDivisor: pair.simplifiedDivisor,
      formula: `正解: ${pair.dividend} ÷ ${pair.divisor} = ${pair.simplifiedDividend} ÷ ${pair.simplifiedDivisor} = ${quotient}`,
      formulaEn: `Answer: ${pair.dividend} ÷ ${pair.divisor} = ${pair.simplifiedDividend} ÷ ${pair.simplifiedDivisor} = ${quotient}`,
      explanation: `${pair.dividend} ÷ ${pair.divisor}：両方を${pair.factor}で割ると ${pair.simplifiedDividend} ÷ ${pair.simplifiedDivisor} = ${quotient}`,
      explanationEn: `${pair.dividend} ÷ ${pair.divisor}: Divide both by ${pair.factor} = ${pair.simplifiedDividend} ÷ ${pair.simplifiedDivisor} = ${quotient}`,
    });
  }

  return questions;
}

// Generate long division with 2-digit divisor questions
function generateLongDivision2DigitQuestions(): DivisionQuestion[] {
  const questions: DivisionQuestion[] = [];

  // 3-digit divided by 2-digit problems with clean answers
  const problems = [
    { dividend: 256, divisor: 32, quotient: 8 },
    { dividend: 195, divisor: 15, quotient: 13 },
    { dividend: 384, divisor: 24, quotient: 16 },
    { dividend: 425, divisor: 25, quotient: 17 },
    { dividend: 306, divisor: 18, quotient: 17 },
    { dividend: 462, divisor: 21, quotient: 22 },
    { dividend: 529, divisor: 23, quotient: 23 },
    { dividend: 360, divisor: 15, quotient: 24 },
    { dividend: 288, divisor: 16, quotient: 18 },
    { dividend: 476, divisor: 28, quotient: 17 },
  ];

  // Shuffle and pick 5
  const shuffled = [...problems].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);

  selected.forEach(({ dividend, divisor, quotient }, index) => {
    questions.push({
      id: `long2-${index}`,
      topic: 'long-division-2digit',
      text: `筆算で計算しましょう（わる数が2けた）。`,
      textEn: 'Calculate using long division (2-digit divisor).',
      dividend,
      divisor,
      quotient,
      remainder: 0,
      formula: `正解: ${dividend} ÷ ${divisor} = ${quotient}`,
      formulaEn: `Answer: ${dividend} ÷ ${divisor} = ${quotient}`,
      explanation: `${dividend} ÷ ${divisor} = ${quotient}。${divisor} × ${quotient} = ${dividend}`,
      explanationEn: `${dividend} ÷ ${divisor} = ${quotient}. ${divisor} × ${quotient} = ${dividend}`,
    });
  });

  return questions;
}

// Generate mental division questions (canceling zeros)
function generateMentalDivisionQuestions(): DivisionQuestion[] {
  const questions: DivisionQuestion[] = [];

  // Problems that simplify by canceling zeros
  const problems = [
    { dividend: 600, divisor: 20, quotient: 30, simplifiedDividend: 60, simplifiedDivisor: 2 },
    { dividend: 800, divisor: 40, quotient: 20, simplifiedDividend: 80, simplifiedDivisor: 4 },
    { dividend: 120, divisor: 30, quotient: 4, simplifiedDividend: 12, simplifiedDivisor: 3 },
    { dividend: 900, divisor: 30, quotient: 30, simplifiedDividend: 90, simplifiedDivisor: 3 },
    { dividend: 500, divisor: 50, quotient: 10, simplifiedDividend: 50, simplifiedDivisor: 5 },
    { dividend: 240, divisor: 60, quotient: 4, simplifiedDividend: 24, simplifiedDivisor: 6 },
    { dividend: 720, divisor: 80, quotient: 9, simplifiedDividend: 72, simplifiedDivisor: 8 },
    { dividend: 400, divisor: 20, quotient: 20, simplifiedDividend: 40, simplifiedDivisor: 2 },
    { dividend: 350, divisor: 70, quotient: 5, simplifiedDividend: 35, simplifiedDivisor: 7 },
    { dividend: 630, divisor: 90, quotient: 7, simplifiedDividend: 63, simplifiedDivisor: 9 },
  ];

  // Shuffle and pick 5
  const shuffled = [...problems].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);

  selected.forEach(({ dividend, divisor, quotient, simplifiedDividend, simplifiedDivisor }, index) => {
    questions.push({
      id: `mental-${index}`,
      topic: 'mental-division',
      text: `0を消す裏ワザを使って暗算しましょう。`,
      textEn: 'Calculate mentally by canceling zeros.',
      dividend,
      divisor,
      quotient,
      remainder: 0,
      simplifiedDividend,
      simplifiedDivisor,
      formula: `正解: ${dividend} ÷ ${divisor} = ${simplifiedDividend} ÷ ${simplifiedDivisor} = ${quotient}`,
      formulaEn: `Answer: ${dividend} ÷ ${divisor} = ${simplifiedDividend} ÷ ${simplifiedDivisor} = ${quotient}`,
      explanation: `${dividend} ÷ ${divisor}：0を1つずつ消すと ${simplifiedDividend} ÷ ${simplifiedDivisor} = ${quotient}`,
      explanationEn: `${dividend} ÷ ${divisor}: Cancel one zero from each = ${simplifiedDividend} ÷ ${simplifiedDivisor} = ${quotient}`,
    });
  });

  return questions;
}

export function generateDivisionQuestions(topic: DivisionTopic): DivisionQuestion[] {
  switch (topic) {
    case 'division-with-remainder':
      return generateDivisionWithRemainderQuestions();
    case 'long-division':
      return generateLongDivisionQuestions();
    case 'division-properties':
      return generateDivisionPropertiesQuestions();
    case 'long-division-2digit':
      return generateLongDivision2DigitQuestions();
    case 'mental-division':
      return generateMentalDivisionQuestions();
    default:
      return generateDivisionWithRemainderQuestions();
  }
}
