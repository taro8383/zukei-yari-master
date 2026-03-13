// Fractions (分数) - 4th Grade MEXT Curriculum
// Focus: Understanding fractions, converting between types, and operations

export type FractionTopic = 'fraction-types' | 'converting-fractions' | 'adding-fractions' | 'subtracting-fractions';
export type FractionType = 'proper' | 'improper' | 'mixed';

export interface FractionTopicInfo {
  id: FractionTopic;
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

export interface VisualAidData {
  type: 'pie' | 'bar' | 'number-line';
  segments: number;
  filledSegments: number;
  wholeParts?: number;
}

export interface FractionQuestion {
  id: number;
  topic: FractionTopic;
  text: string;
  textEn: string;
  explanation: string;
  explanationEn: string;
  // For fraction-types topic
  fraction?: string; // e.g., "3/5"
  fractionType?: FractionType;
  // For converting-fractions topic
  originalFraction?: string;
  answerFraction?: string;
  convertTo?: 'mixed' | 'improper';
  // For adding/subtracting fractions topic
  numerator1?: number;
  denominator1?: number;
  numerator2?: number;
  denominator2?: number;
  answerNum?: number;
  answerDen?: number;
  answerMixedNum?: number;
  answerMixedWhole?: number;
  // For borrowing in subtraction
  isBorrowing?: boolean;
  visualAid?: VisualAidData;
}

export const FRACTION_TOPICS: Record<FractionTopic, FractionTopicInfo> = {
  'fraction-types': {
    id: 'fraction-types',
    icon: '📦',
    label: '分数の種類',
    labelEn: 'Types of Fractions',
    goal: '真分数、仮分数、帯分数の3つの種類を見分けよう！',
    goalEn: 'Learn to identify the three types of fractions: proper, improper, and mixed!',
    method: '① 分子と分母を比べる ② 分子＜分母なら「真分数」、分子≧分母なら「仮分数」 ③ 整数があるなら「帯分数」',
    methodEn: 'Step 1: Compare numerator and denominator. Step 2: If numerator < denominator, it is a "proper fraction". If numerator ≥ denominator, it is an "improper fraction". Step 3: If there is a whole number, it is a "mixed number".',
    realLife: 'アイテムボックスの整理！普通のアイテム、持ちすぎたアイテム、満タンの箱とあまり！',
    realLifeEn: 'Organizing your item box! Regular items, too many items, and full boxes with leftovers!',
    benefit: '分数の種類がパッと見でわかるようになる！',
    benefitEn: 'You will instantly recognize different types of fractions!',
  },
  'converting-fractions': {
    id: 'converting-fractions',
    icon: '🔄',
    label: '分数の変換',
    labelEn: 'Converting Fractions',
    goal: '仮分数を帯分数に、帯分数を仮分数にレベルチェンジさせよう！',
    goalEn: 'Level up by converting improper fractions to mixed numbers and vice versa!',
    method: '① 分子÷分母をして商（整数）と余りを出す ② 余りを新しい分子にする ③ 分母はそのまま！ 例：7÷5=1あまり2 → 1と2/5',
    methodEn: 'Step 1: Divide numerator by denominator to get quotient (whole number) and remainder. Step 2: The remainder becomes the new numerator. Step 3: Denominator stays the same! Example: 7÷5=1 remainder 2 → 1 2/5',
    realLife: 'ピザを分けるとき、何枚と何切れかを言い換えるのと同じだよ！',
    realLifeEn: 'Just like saying how many whole pizzas and slices when sharing pizza!',
    benefit: '分数の形を自由に変えられるようになる！',
    benefitEn: 'You will be able to change fractions into any form you need!',
  },
  'adding-fractions': {
    id: 'adding-fractions',
    icon: '➕',
    label: '分数のたし算',
    labelEn: 'Adding Fractions',
    goal: '分母が同じ分数のたし算をしよう！',
    goalEn: 'Add fractions with the same denominator!',
    method: '① 分母はそのまま ② 分子だけをたし算する ③ 仮分数なら帯分数に変える！ 例：2/7 + 3/7 = 5/7',
    methodEn: 'Step 1: Keep the denominator the same. Step 2: Add only the numerators. Step 3: Convert improper fractions to mixed numbers! Example: 2/7 + 3/7 = 5/7',
    realLife: 'ピザを分けて食べた分を全部足すときに使うよ！',
    realLifeEn: 'Use this when adding up all the pizza slices everyone ate!',
    benefit: '分数のたし算がサクサクできるようになる！',
    benefitEn: 'You will be able to add fractions quickly and easily!',
  },
  'subtracting-fractions': {
    id: 'subtracting-fractions',
    icon: '➖',
    label: '分数のひき算',
    labelEn: 'Subtracting Fractions',
    goal: '整数をくずして（くり下げて）分数のひき算をしよう！',
    goalEn: 'Break down whole numbers (borrowing) to subtract fractions!',
    method: '① 整数を分数にくずす（1 = 分母/分母） ② 分母はそのまま ③ 分子をひき算して約分する！ 例：1と1/4 - 3/4 = 5/4 - 3/4 = 2/4 = 1/2',
    methodEn: 'Step 1: Break down the whole number into a fraction (1 = denominator/denominator). Step 2: Keep the denominator the same. Step 3: Subtract the numerators and simplify! Example: 1 1/4 - 3/4 = 5/4 - 3/4 = 2/4 = 1/2',
    realLife: 'ケーキが1個と少しあるとき、友達に大きめのピースをあげる分を計算するよ！',
    realLifeEn: 'When you have 1 cake and a little more, calculate how much to give your friend a bigger piece!',
    benefit: '引き算の苦手パターンもクリアできる！',
    benefitEn: 'You will master even the tricky subtraction patterns!',
  },
};

// Helper function to create a fraction string
function formatFraction(numerator: number, denominator: number): string {
  return `${numerator}/${denominator}`;
}

// Helper function to create a mixed number string
function formatMixedNumber(whole: number, numerator: number, denominator: number): string {
  return `${whole}と${numerator}/${denominator}`;
}

// Helper function to calculate GCD
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// Helper function to simplify fractions
function simplifyFraction(numerator: number, denominator: number): { num: number; den: number; divisor: number } {
  const divisor = gcd(numerator, denominator);
  return { num: numerator / divisor, den: denominator / divisor, divisor };
}

// Generate a random integer between min and max (inclusive)
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate questions for fraction types (真分数、仮分数、帯分数) - DYNAMICALLY
export function generateFractionTypeQuestions(): FractionQuestion[] {
  const questions: FractionQuestion[] = [];

  // Generate 2 proper fractions dynamically (numerator < denominator)
  for (let i = 0; i < 2; i++) {
    const den = randomInt(2, 10);
    const num = randomInt(1, den - 1);
    questions.push({
      id: i + 1,
      topic: 'fraction-types',
      fraction: formatFraction(num, den),
      fractionType: 'proper',
      text: `「${formatFraction(num, den)}」はどの分数の種類ですか？`,
      textEn: `What type of fraction is "${formatFraction(num, den)}"?`,
      explanation: `分子(${num}) < 分母(${den}) なので、「真分数」です。1より小さい分数です。`,
      explanationEn: `Since numerator (${num}) < denominator (${den}), this is a "proper fraction". It is less than 1.`,
    });
  }

  // Generate 2 improper fractions dynamically (numerator >= denominator)
  for (let i = 0; i < 2; i++) {
    const den = randomInt(2, 10);
    const num = randomInt(den, den * 2 - 1); // Make it reasonably sized
    questions.push({
      id: i + 3,
      topic: 'fraction-types',
      fraction: formatFraction(num, den),
      fractionType: 'improper',
      text: `「${formatFraction(num, den)}」はどの分数の種類ですか？`,
      textEn: `What type of fraction is "${formatFraction(num, den)}"?`,
      explanation: `分子(${num}) ≧ 分母(${den}) なので、「仮分数」です。1以上の分数です。`,
      explanationEn: `Since numerator (${num}) ≥ denominator (${den}), this is an "improper fraction". It is 1 or greater.`,
    });
  }

  // Generate 1 mixed number dynamically
  const whole = randomInt(1, 5);
  const den = randomInt(2, 10);
  const num = randomInt(1, den - 1);
  questions.push({
    id: 5,
    topic: 'fraction-types',
    fraction: formatMixedNumber(whole, num, den),
    fractionType: 'mixed',
    text: `「${formatMixedNumber(whole, num, den)}」はどの分数の種類ですか？`,
    textEn: `What type of fraction is "${whole} ${num}/${den}"?`,
    explanation: `整数(${whole})と分数(${formatFraction(num, den)})が一緒になっているので、「帯分数」です。`,
    explanationEn: `Since it has a whole number (${whole}) and a fraction (${formatFraction(num, den)}), this is a "mixed number".`,
  });

  return questions.sort(() => Math.random() - 0.5);
}

// Generate questions for converting fractions - DYNAMICALLY
export function generateConvertingQuestions(): FractionQuestion[] {
  const questions: FractionQuestion[] = [];

  // Generate 3 improper to mixed conversions
  for (let i = 0; i < 3; i++) {
    const den = randomInt(2, 12);
    const whole = randomInt(1, 4);
    const remainder = randomInt(1, den - 1);
    const num = whole * den + remainder; // This creates a proper improper fraction

    questions.push({
      id: i + 1,
      topic: 'converting-fractions',
      originalFraction: formatFraction(num, den),
      answerFraction: formatMixedNumber(whole, remainder, den),
      convertTo: 'mixed',
      answerNum: remainder,
      answerDen: den,
      answerMixedWhole: whole,
      text: `仮分数「${formatFraction(num, den)}」を帯分数に変えましょう。`,
      textEn: `Convert the improper fraction "${formatFraction(num, den)}" to a mixed number.`,
      explanation: `${num} ÷ ${den} = ${whole} あまり ${remainder} → ${formatMixedNumber(whole, remainder, den)}`,
      explanationEn: `${num} ÷ ${den} = ${whole} remainder ${remainder} → ${whole} ${remainder}/${den}`,
    });
  }

  // Generate 2 mixed to improper conversions
  for (let i = 0; i < 2; i++) {
    const den = randomInt(2, 12);
    const whole = randomInt(1, 5);
    const num = randomInt(1, den - 1);
    const newNum = whole * den + num;

    questions.push({
      id: i + 4,
      topic: 'converting-fractions',
      originalFraction: formatMixedNumber(whole, num, den),
      answerFraction: formatFraction(newNum, den),
      convertTo: 'improper',
      answerNum: newNum,
      answerDen: den,
      text: `帯分数「${formatMixedNumber(whole, num, den)}」を仮分数に変えましょう。`,
      textEn: `Convert the mixed number "${whole} ${num}/${den}" to an improper fraction.`,
      explanation: `(${whole} × ${den} + ${num}) / ${den} = ${newNum}/${den}`,
      explanationEn: `(${whole} × ${den} + ${num}) / ${den} = ${newNum}/${den}`,
    });
  }

  return questions.sort(() => Math.random() - 0.5);
}

// Generate questions for adding fractions - DYNAMICALLY
export function generateAddingFractionsQuestions(): FractionQuestion[] {
  const questions: FractionQuestion[] = [];

  for (let i = 0; i < 5; i++) {
    const den = randomInt(3, 12);

    // Decide if this should result in a simple answer or one needing conversion
    const needsConversion = Math.random() > 0.5;

    let num1: number;
    let num2: number;

    if (needsConversion) {
      // Create addition that results in improper fraction
      // Make sure sum > denominator but not too big
      num1 = randomInt(2, Math.floor(den * 0.6));
      num2 = randomInt(Math.ceil(den * 0.4), den - 1);
      // Ensure sum > den
      if (num1 + num2 <= den) {
        num2 = den - num1 + 1;
      }
    } else {
      // Simple addition (sum < denominator)
      num1 = randomInt(1, Math.floor(den * 0.4));
      num2 = randomInt(1, Math.floor(den * 0.4));
    }

    const sum = num1 + num2;
    const simplified = simplifyFraction(sum, den);

    // If result is improper, convert to mixed
    let mixedWhole: number | undefined;
    let mixedNum: number | undefined;
    let finalNum = simplified.num;
    let finalDen = simplified.den;

    if (simplified.num > simplified.den) {
      mixedWhole = Math.floor(simplified.num / simplified.den);
      mixedNum = simplified.num % simplified.den;
    }

    let explanation: string;
    let explanationEn: string;

    if (mixedWhole !== undefined && mixedNum !== undefined) {
      explanation = `${formatFraction(num1, den)} + ${formatFraction(num2, den)} = ${formatFraction(sum, den)} = ${formatMixedNumber(mixedWhole, mixedNum, finalDen)}`;
      explanationEn = `${formatFraction(num1, den)} + ${formatFraction(num2, den)} = ${formatFraction(sum, den)} = ${mixedWhole} ${mixedNum}/${finalDen}`;
    } else {
      explanation = `${formatFraction(num1, den)} + ${formatFraction(num2, den)} = ${formatFraction(finalNum, finalDen)}`;
      explanationEn = `${formatFraction(num1, den)} + ${formatFraction(num2, den)} = ${formatFraction(finalNum, finalDen)}`;
    }

    questions.push({
      id: i + 1,
      topic: 'adding-fractions',
      numerator1: num1,
      denominator1: den,
      numerator2: num2,
      denominator2: den,
      answerNum: mixedNum !== undefined ? mixedNum : finalNum,
      answerDen: finalDen,
      answerMixedWhole: mixedWhole,
      answerMixedNum: mixedNum,
      text: `${formatFraction(num1, den)} + ${formatFraction(num2, den)} = ?`,
      textEn: `${formatFraction(num1, den)} + ${formatFraction(num2, den)} = ?`,
      explanation,
      explanationEn,
    });
  }

  return questions;
}

// Generate questions for subtracting fractions (with borrowing) - DYNAMICALLY
export function generateSubtractingFractionsQuestions(): FractionQuestion[] {
  const questions: FractionQuestion[] = [];

  for (let i = 0; i < 5; i++) {
    // Pick a denominator
    const den = randomInt(3, 12);

    // Pick starting whole number (1-3)
    const whole1 = randomInt(1, 3);

    // Pick starting numerator (must be less than denominator)
    const num1 = randomInt(1, den - 1);

    // Pick what to subtract - must be larger than num1 to require borrowing
    const num2 = randomInt(num1 + 1, den - 1);

    // Calculate: whole1とnum1/den - num2/den
    // Convert to improper: (whole1 * den + num1)/den - num2/den
    const improperNum = whole1 * den + num1;
    const resultNum = improperNum - num2;

    // Simplify the result
    const simplified = simplifyFraction(resultNum, den);

    // Build explanation
    let explanation = `${formatMixedNumber(whole1, num1, den)} = ${formatFraction(improperNum, den)} → ${formatFraction(improperNum, den)} - ${formatFraction(num2, den)} = ${formatFraction(resultNum, den)}`;
    let explanationEn = `${whole1} ${num1}/${den} = ${formatFraction(improperNum, den)} → ${formatFraction(improperNum, den)} - ${formatFraction(num2, den)} = ${formatFraction(resultNum, den)}`;

    // If simplified, mention it
    if (simplified.divisor > 1) {
      explanation += ` = ${formatFraction(simplified.num, simplified.den)}（${resultNum}と${den}は${simplified.divisor}で割れる）`;
      explanationEn += ` = ${formatFraction(simplified.num, simplified.den)} (${resultNum} and ${den} can both be divided by ${simplified.divisor})`;
    }

    questions.push({
      id: i + 1,
      topic: 'subtracting-fractions',
      numerator1: num1,
      denominator1: den,
      numerator2: num2,
      denominator2: den,
      answerNum: simplified.num,
      answerDen: simplified.den,
      isBorrowing: true,
      visualAid: {
        type: 'pie',
        segments: den,
        filledSegments: num1,
        wholeParts: whole1,
      },
      text: `${formatMixedNumber(whole1, num1, den)} - ${formatFraction(num2, den)} = ?`,
      textEn: `${whole1} ${num1}/${den} - ${formatFraction(num2, den)} = ?`,
      explanation,
      explanationEn,
    });
  }

  return questions;
}

// Main function to generate fraction questions based on topic
export function generateFractionQuestions(topic: FractionTopic): FractionQuestion[] {
  switch (topic) {
    case 'fraction-types':
      return generateFractionTypeQuestions();
    case 'converting-fractions':
      return generateConvertingQuestions();
    case 'adding-fractions':
      return generateAddingFractionsQuestions();
    case 'subtracting-fractions':
      return generateSubtractingFractionsQuestions();
    default:
      return generateFractionTypeQuestions();
  }
}
