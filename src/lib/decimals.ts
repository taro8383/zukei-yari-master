export type DecimalTopic = 'decimal-structure' | 'decimal-add-subtract' | 'decimal-shift' | 'decimal-multiply-divide';

export interface DecimalTopicInfo {
  id: DecimalTopic;
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

export interface DecimalQuestion {
  id: string;
  topic: DecimalTopic;
  text: string;
  textEn: string;
  answer: number | string;
  // For decimal structure topic
  decimalNumber?: number;
  targetUnit?: '0.1' | '0.01' | '0.001';
  // For add/subtract topic - vertical grid setup
  num1?: number;
  num2?: number;
  operation?: 'add' | 'subtract' | 'multiply' | 'divide';
  decimalPlaces1?: number;
  decimalPlaces2?: number;
  // For shift topic
  shiftType?: 'x10' | 'x100' | 'divide10' | 'divide100';
  // For multiply/divide topic
  wholeNumber?: number;
  decimalNumber?: number;
  originalNumber?: number;
  formula: string;
  formulaEn: string;
  explanation: string;
  explanationEn: string;
}

export const DECIMAL_TOPICS: Record<DecimalTopic, DecimalTopicInfo> = {
  'decimal-structure': {
    id: 'decimal-structure',
    icon: '🔢',
    label: '小数のしくみ',
    labelEn: 'Structure of Decimals',
    goal: '1より小さい数の位（くらい）がどうやってできているかマスターしよう！',
    goalEn: 'Understand places smaller than 1 and how they are built!',
    method: '① 1を10こに分けた1つ分が0.1（1/10）② 0.1を10こに分けた1つ分が0.01（1/100）③ 0.01を10こに分けた1つ分が0.001（1/1000）。例：2.35 = 0.01を235こ集めた数',
    methodEn: '① 1 divided by 10 is 0.1 ② 0.1 divided by 10 is 0.01 ③ 0.01 divided by 10 is 0.001. Example: 2.35 = 235 hundredths',
    realLife: '100m走のタイムで「10.58秒」のように、すごく細かい時間をはかるとき！',
    realLifeEn: 'Measuring exact times in a 100m sprint race, like "10.58 seconds"!',
    benefit: 'ミリ単位まで、ものすごく正確に測れるようになる！',
    benefitEn: 'You can measure things with ultimate precision, down to the millimeter!',
  },
  'decimal-add-subtract': {
    id: 'decimal-add-subtract',
    icon: '➕',
    label: '小数のたし算とひき算',
    labelEn: 'Adding & Subtracting Decimals',
    goal: '小数点の位置をピシッとそろえて、正確にたし算とひき算をしよう！',
    goalEn: 'Add and subtract decimals accurately by lining up the dot!',
    method: '① 小数点の縦のラインをそろえる ② 桁がないところは0を入れる ③ 普通にたし算・ひき算する ④ 答えの小数点も同じ位置に置く。例：3.4 + 1.85 → 3.40 + 1.85 = 5.25',
    methodEn: '① Align decimal points vertically ② Fill empty places with zeros ③ Add/subtract normally ④ Place decimal in same position. Example: 3.4 + 1.85 = 5.25',
    realLife: '1.5Lと0.75Lのポーションを混ぜて、合計の量を計算するとき！',
    realLifeEn: 'Combining two magic potions that have 1.5L and 0.75L of liquid!',
    benefit: 'お金の計算や、料理の分量を正確に計算できるようになる！',
    benefitEn: 'You can accurately calculate money and cooking measurements!',
  },
  'decimal-shift': {
    id: 'decimal-shift',
    icon: '⏩',
    label: '10倍、100倍、1/10の数',
    labelEn: 'Shifting the Decimal Point',
    goal: '小数点をワープさせて、一瞬で10倍や1/10の計算をしよう！',
    goalEn: 'Multiply or divide instantly by warping the decimal point!',
    method: '×10は小数点を右へ1つ、×100は右へ2つ、÷10（1/10）は左へ1つ、÷100（1/100）は左へ2つ移動する！例：2.05 × 10 = 20.5、34.2 ÷ 10 = 3.42',
    methodEn: '×10 moves dot right 1 space, ×100 moves right 2, ÷10 moves left 1, ÷100 moves left 2! Example: 2.05 × 10 = 20.5, 34.2 ÷ 10 = 3.42',
    realLife: 'デジタルマップで、一気に10倍ズームしたり縮小したりするのと同じ！',
    realLifeEn: 'Zooming in or out on a digital map by 10x!',
    benefit: '大きな数の掛け算・割り算を頭の中でパッと計算できる！',
    benefitEn: 'You can mentally calculate large multiplications and divisions instantly!',
  },
  'decimal-multiply-divide': {
    id: 'decimal-multiply-divide',
    icon: '✖️',
    label: '小数×整数・小数÷整数',
    labelEn: 'Multiply & Divide Decimals by Whole Numbers',
    goal: '小数に整数をかけたり、整数でわったりする筆算をマスターしよう。',
    goalEn: 'Master vertical math for multiplying and dividing decimals by whole numbers.',
    method: '【かけ算】① 小数点を無視して普通にかける ② 答えに小数点を戻す（小数の桁数分左へ）【わり算】① 普通にわり算する ② 小数点はそのまま下ろす。例：2.4 × 3 = 7.2、5.6 ÷ 4 = 1.4',
    methodEn: '[Multiply] ① Multiply ignoring decimal ② Place decimal in answer (same places as original). [Divide] ① Divide normally ② Bring decimal point straight down. Example: 2.4 × 3 = 7.2, 5.6 ÷ 4 = 1.4',
    realLife: 'お菓子1つが28.5円で、3つ買うといくら？や、6.4mのリボンを4人で分けると1人何m？',
    realLifeEn: 'If one candy costs 28.5 yen, how much for 3? Or splitting 6.4m ribbon among 4 people?',
    benefit: 'お金の計算や、ものを分ける計算が正確にできるようになる！',
    benefitEn: 'You can accurately calculate money and splitting things!',
  },
};

// Generate decimal structure questions
function generateDecimalStructureQuestions(): DecimalQuestion[] {
  const questions: DecimalQuestion[] = [];

  for (let i = 0; i < 5; i++) {
    // Randomly choose between two question types
    const type = Math.random() < 0.5 ? 'countUnits' : 'buildNumber';

    if (type === 'countUnits') {
      // Type 1: How many 0.01s are in X.XX?
      const ones = Math.floor(Math.random() * 9) + 1; // 1-9
      const tenths = Math.floor(Math.random() * 10); // 0-9
      const hundredths = Math.floor(Math.random() * 10); // 0-9
      const decimalNumber = parseFloat(`${ones}.${tenths}${hundredths}`);
      const targetUnit = Math.random() < 0.5 ? '0.1' : '0.01';
      const answer = targetUnit === '0.1'
        ? ones * 10 + tenths
        : ones * 100 + tenths * 10 + hundredths;

      questions.push({
        id: `structure-${i}`,
        topic: 'decimal-structure',
        text: `${decimalNumber} は ${targetUnit} を何こ集めた数ですか？`,
        textEn: `How many ${targetUnit}s are in ${decimalNumber}?`,
        answer,
        decimalNumber,
        targetUnit: targetUnit as '0.1' | '0.01',
        formula: `正解: ${decimalNumber} = ${targetUnit} × ${answer}（${targetUnit}を${answer}こ集めた数）`,
        formulaEn: `Answer: ${decimalNumber} = ${targetUnit} × ${answer}`,
        explanation: `${ones}が${ones}こ、0.1が${tenths}こ、0.01が${hundredths}こ → 全部で${answer}こ`,
        explanationEn: `${ones} ones, ${tenths} tenths, ${hundredths} hundredths = ${answer} total`,
      });
    } else {
      // Type 2: What number is made of X ones, Y tenths, Z hundredths?
      const ones = Math.floor(Math.random() * 9) + 1;
      const tenths = Math.floor(Math.random() * 10);
      const hundredths = Math.floor(Math.random() * 10);
      const answer = parseFloat(`${ones}.${tenths}${hundredths}`);

      questions.push({
        id: `structure-${i}`,
        topic: 'decimal-structure',
        text: `1を${ones}こ、0.1を${tenths}こ、0.01を${hundredths}こ集めた数はいくつですか？`,
        textEn: `What number is made of ${ones} ones, ${tenths} tenths, and ${hundredths} hundredths?`,
        answer,
        formula: `正解: ${ones} + ${tenths / 10} + ${hundredths / 100} = ${answer}`,
        formulaEn: `Answer: ${ones} + 0.${tenths} + 0.0${hundredths} = ${answer}`,
        explanation: `${ones}.${tenths}${hundredths}`,
        explanationEn: `${ones}.${tenths}${hundredths}`,
      });
    }
  }

  return questions;
}

// Generate decimal add/subtract questions
function generateDecimalAddSubtractQuestions(): DecimalQuestion[] {
  const questions: DecimalQuestion[] = [];

  for (let i = 0; i < 5; i++) {
    const operation = Math.random() < 0.5 ? 'add' : 'subtract';

    // Generate numbers with different decimal places
    const num1Int = Math.floor(Math.random() * 50) + 1;
    const num1Decimal = Math.floor(Math.random() * 10); // 1 decimal place
    const num1 = parseFloat(`${num1Int}.${num1Decimal}`);
    const decimalPlaces1 = 1;

    const num2Int = Math.floor(Math.random() * 30) + 1;
    const num2Decimal1 = Math.floor(Math.random() * 10);
    const num2Decimal2 = Math.floor(Math.random() * 10); // 2 decimal places
    const num2 = parseFloat(`${num2Int}.${num2Decimal1}${num2Decimal2}`);
    const decimalPlaces2 = 2;

    let answer: number;
    if (operation === 'add') {
      answer = parseFloat((num1 + num2).toFixed(2));
    } else {
      // Ensure positive result for subtraction
      const largerNum = num1 > num2 ? num1 : num2;
      const smallerNum = num1 > num2 ? num2 : num1;
      answer = parseFloat((largerNum - smallerNum).toFixed(2));

      questions.push({
        id: `addsub-${i}`,
        topic: 'decimal-add-subtract',
        text: `筆算で計算しましょう。`,
        textEn: `Calculate using vertical method.`,
        answer,
        num1: largerNum,
        num2: smallerNum,
        operation,
        decimalPlaces1: largerNum === num1 ? decimalPlaces1 : decimalPlaces2,
        decimalPlaces2: largerNum === num1 ? decimalPlaces2 : decimalPlaces1,
        formula: `正解: ${largerNum.toFixed(decimalPlaces1 === 1 && largerNum === num1 ? 1 : 2)} - ${smallerNum.toFixed(decimalPlaces1 === 1 && smallerNum === num1 ? 1 : 2)} = ${answer}（小数点の位置をそろえて計算するよ）`,
        formulaEn: `Answer: ${largerNum} - ${smallerNum} = ${answer} (Align decimal points)`,
        explanation: `${largerNum} - ${smallerNum} = ${answer}`,
        explanationEn: `${largerNum} - ${smallerNum} = ${answer}`,
      });
      continue;
    }

    questions.push({
      id: `addsub-${i}`,
      topic: 'decimal-add-subtract',
      text: `筆算で計算しましょう。`,
      textEn: `Calculate using vertical method.`,
      answer,
      num1,
      num2,
      operation,
      decimalPlaces1,
      decimalPlaces2,
      formula: `正解: ${num1.toFixed(1)} + ${num2.toFixed(2)} = ${answer.toFixed(2)}（小数点の位置をそろえて計算するよ）`,
      formulaEn: `Answer: ${num1} + ${num2} = ${answer} (Align decimal points)`,
      explanation: `${num1} + ${num2} = ${answer}`,
      explanationEn: `${num1} + ${num2} = ${answer}`,
    });
  }

  return questions;
}

// Generate decimal shift questions
function generateDecimalShiftQuestions(): DecimalQuestion[] {
  const questions: DecimalQuestion[] = [];
  const shiftTypes: Array<'x10' | 'x100' | 'divide10' | 'divide100'> = ['x10', 'x100', 'divide10', 'divide100'];

  for (let i = 0; i < 5; i++) {
    const shiftType = shiftTypes[Math.floor(Math.random() * shiftTypes.length)];

    // Generate original number with 1-2 decimal places
    const intPart = Math.floor(Math.random() * 90) + 10; // 10-99
    const decimalPart = Math.floor(Math.random() * 100); // 00-99
    const originalNumber = parseFloat(`${intPart}.${decimalPart.toString().padStart(2, '0')}`);

    let answer: number;
    let text: string;
    let textEn: string;
    let formula: string;
    let formulaEn: string;

    switch (shiftType) {
      case 'x10':
        answer = parseFloat((originalNumber * 10).toFixed(1));
        text = `${originalNumber} を10倍した数はいくつですか？`;
        textEn = `What is 10 times ${originalNumber}?`;
        formula = `正解: ${originalNumber} × 10 = ${answer}（小数点を右へ1つ移動）`;
        formulaEn = `Answer: ${originalNumber} × 10 = ${answer} (Move decimal right 1)`;
        break;
      case 'x100':
        answer = parseFloat((originalNumber * 100).toFixed(0));
        text = `${originalNumber} を100倍した数はいくつですか？`;
        textEn = `What is 100 times ${originalNumber}?`;
        formula = `正解: ${originalNumber} × 100 = ${answer}（小数点を右へ2つ移動）`;
        formulaEn = `Answer: ${originalNumber} × 100 = ${answer} (Move decimal right 2)`;
        break;
      case 'divide10':
        answer = parseFloat((originalNumber / 10).toFixed(3));
        text = `${originalNumber} の1/10の数はいくつですか？`;
        textEn = `What is 1/10 of ${originalNumber}?`;
        formula = `正解: ${originalNumber} ÷ 10 = ${answer}（小数点を左へ1つ移動）`;
        formulaEn = `Answer: ${originalNumber} ÷ 10 = ${answer} (Move decimal left 1)`;
        break;
      case 'divide100':
        answer = parseFloat((originalNumber / 100).toFixed(4));
        text = `${originalNumber} の1/100の数はいくつですか？`;
        textEn = `What is 1/100 of ${originalNumber}?`;
        formula = `正解: ${originalNumber} ÷ 100 = ${answer}（小数点を左へ2つ移動）`;
        formulaEn = `Answer: ${originalNumber} ÷ 100 = ${answer} (Move decimal left 2)`;
        break;
    }

    questions.push({
      id: `shift-${i}`,
      topic: 'decimal-shift',
      text,
      textEn,
      answer,
      shiftType,
      originalNumber,
      formula,
      formulaEn,
      explanation: text,
      explanationEn: textEn,
    });
  }

  return questions;
}

// Generate decimal multiply/divide questions
function generateDecimalMultiplyDivideQuestions(): DecimalQuestion[] {
  const questions: DecimalQuestion[] = [];

  for (let i = 0; i < 5; i++) {
    const operation = Math.random() < 0.5 ? 'multiply' : 'divide';

    if (operation === 'multiply') {
      // Decimal × Whole Number
      // Generate decimal with 1-2 decimal places
      const intPart = Math.floor(Math.random() * 20) + 1; // 1-20
      const decimalPart = Math.floor(Math.random() * 90) + 10; // 10-99 (2 decimal places)
      const decimalNumber = parseFloat(`${intPart}.${decimalPart}`);
      const wholeNumber = Math.floor(Math.random() * 8) + 2; // 2-9
      const answer = parseFloat((decimalNumber * wholeNumber).toFixed(2));

      questions.push({
        id: `multdiv-${i}`,
        topic: 'decimal-multiply-divide',
        text: `筆算で計算しましょう。`,
        textEn: 'Calculate using vertical method.',
        answer,
        decimalNumber,
        wholeNumber,
        operation: 'multiply',
        decimalPlaces1: 2,
        formula: `正解: ${decimalNumber} × ${wholeNumber} = ${answer}（小数第2位まで）`,
        formulaEn: `Answer: ${decimalNumber} × ${wholeNumber} = ${answer}`,
        explanation: `${decimalNumber} × ${wholeNumber} = ${answer}`,
        explanationEn: `${decimalNumber} × ${wholeNumber} = ${answer}`,
      });
    } else {
      // Decimal ÷ Whole Number (clean division)
      // Generate problems that result in clean answers
      const problems = [
        { decimal: 5.6, whole: 4, answer: 1.4 },
        { decimal: 7.2, whole: 3, answer: 2.4 },
        { decimal: 9.6, whole: 4, answer: 2.4 },
        { decimal: 8.4, whole: 7, answer: 1.2 },
        { decimal: 6.3, whole: 3, answer: 2.1 },
        { decimal: 4.8, whole: 4, answer: 1.2 },
        { decimal: 12.6, whole: 6, answer: 2.1 },
        { decimal: 15.2, whole: 4, answer: 3.8 },
        { decimal: 10.5, whole: 5, answer: 2.1 },
        { decimal: 18.9, whole: 9, answer: 2.1 },
        { decimal: 14.4, whole: 6, answer: 2.4 },
        { decimal: 21.6, whole: 8, answer: 2.7 },
      ];

      const problem = problems[Math.floor(Math.random() * problems.length)];

      questions.push({
        id: `multdiv-${i}`,
        topic: 'decimal-multiply-divide',
        text: `筆算で計算しましょう。`,
        textEn: 'Calculate using vertical method.',
        answer: problem.answer,
        decimalNumber: problem.decimal,
        wholeNumber: problem.whole,
        operation: 'divide',
        decimalPlaces1: 1,
        formula: `正解: ${problem.decimal} ÷ ${problem.whole} = ${problem.answer}（小数点はそのまま下ろす）`,
        formulaEn: `Answer: ${problem.decimal} ÷ ${problem.whole} = ${problem.answer}`,
        explanation: `${problem.decimal} ÷ ${problem.whole} = ${problem.answer}`,
        explanationEn: `${problem.decimal} ÷ ${problem.whole} = ${problem.answer}`,
      });
    }
  }

  return questions;
}

export function generateDecimalQuestions(topic: DecimalTopic): DecimalQuestion[] {
  switch (topic) {
    case 'decimal-structure':
      return generateDecimalStructureQuestions();
    case 'decimal-add-subtract':
      return generateDecimalAddSubtractQuestions();
    case 'decimal-shift':
      return generateDecimalShiftQuestions();
    case 'decimal-multiply-divide':
      return generateDecimalMultiplyDivideQuestions();
    default:
      return generateDecimalStructureQuestions();
  }
}
