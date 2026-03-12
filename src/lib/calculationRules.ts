// Calculation Rules (計算のきまり) - 4th Grade MEXT Curriculum
// Focus: Order of operations, properties of operations (commutative, associative, distributive)

export type CalculationRulesTopic = 'order-of-operations' | 'calculate-smartly' | 'distributive-property' | 'combining-into-one-equation';

export interface CalculationRulesTopicInfo {
  id: CalculationRulesTopic;
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

export interface CalculationRulesQuestion {
  id: number;
  topic: CalculationRulesTopic;
  text: string;
  textEn: string;
  answer: number; // Final answer
  explanation: string;
  explanationEn: string;
  formula: string;
  formulaEn: string;
  // For order of operations
  expression?: string;
  steps?: Array<{
    description: string;
    descriptionEn: string;
    operation: string;
    result: number;
  }>;
  // For distributive property - multi-step
  isMultiStep?: boolean;
  stepAnswers?: number[]; // Expected answers for intermediate steps
  stepPrompts?: Array<{
    ja: string;
    en: string;
  }>;
  // For combining into one equation
  correctEquation?: string; // The correct equation string
  equationParts?: string[]; // Available parts to build equation
  numbers?: number[]; // Numbers in the problem
  operators?: string[]; // Available operators
  // Visual aid data
  visualAid?: {
    type: 'order-tree' | 'area-model';
    data: Record<string, number>;
  };
}

export const CALCULATION_RULES_TOPICS: Record<CalculationRulesTopic, CalculationRulesTopicInfo> = {
  'order-of-operations': {
    id: 'order-of-operations',
    icon: '🎮',
    label: '計算のじゅんじょ',
    labelEn: 'Order of Operations',
    goal: '正しいじゅんじょで計算して、答えを導き出そう！',
    goalEn: 'Solve math problems in the correct boss-battle order!',
    method: '① ( ) かっこの中を一番はじめに計算する ② ×と÷ を次に計算する ③ ＋と－ は最後に計算する！ 例：20 + 5 × 4 → 20 + 20 = 40（かけ算を先に計算するよ）',
    methodEn: 'Step 1: Parentheses ( ) first. Step 2: Multiply × and Divide ÷ next. Step 3: Add + and Subtract - last! Example: 20 + 5 × 4 → 20 + 20 = 40 (multiply first)',
    realLife: 'RPGのゲームと同じ！最初に装備( )をつけて、敵を攻撃(×÷)して、最後にコイン(＋)を拾うんだ！',
    realLifeEn: 'Like in an RPG: You equip armor ( ) first, attack enemies × ÷ next, and collect gold + - at the end!',
    benefit: '長い計算式も、正しい順番で解けるようになる！',
    benefitEn: 'You can solve long equations in the correct order!',
  },
  'calculate-smartly': {
    id: 'calculate-smartly',
    icon: '⚡',
    label: 'くふうして計算しよう',
    labelEn: 'Calculate Smartly',
    goal: '数を入れ替えたりまとめたりして、計算をパッと終わらせよう！',
    goalEn: 'Swap or group numbers to make calculations incredibly fast.',
    method: '① ぴったり10、100、1000になるペアを見つける ② 数の順番を入れ替えて、先に計算しやすい組み合わせを作る ③ 楽に計算する！ 例：25 × 13 × 4 → 25 × 4 × 13 = 100 × 13 = 1300',
    methodEn: 'Step 1: Find pairs that make exactly 10, 100, or 1000. Step 2: Swap order to create easy combinations. Step 3: Calculate easily! Example: 25 × 13 × 4 → 25 × 4 × 13 = 100 × 13 = 1300',
    realLife: 'アイテムボックスの中で、同じ種類のアイテムをきれいにまとめるのと同じだよ！',
    realLifeEn: 'Like organizing your inventory so similar items stack perfectly!',
    benefit: '大きな数の計算も、パッと頭で計算できるようになる！',
    benefitEn: 'You can quickly calculate big numbers in your head!',
  },
  'distributive-property': {
    id: 'distributive-property',
    icon: '📐',
    label: '分配法則',
    labelEn: 'Distributive Property',
    goal: 'むずかしい数を、計算しやすい簡単な数に分けてからかけ算しよう！',
    goalEn: 'Break down hard numbers into easy numbers before multiplying.',
    method: '① むずかしい数を「100」や「10」に近いかんたんな数に分ける ② (A + B) × C = A × C + B × C または (A - B) × C = A × C - B × C ③ かんたんなかけ算をして、足すまたは引く！ 例：98 × 5 = (100 - 2) × 5 = 500 - 10 = 490',
    methodEn: 'Step 1: Split hard numbers into easy numbers near 100 or 10. Step 2: (A + B) × C = A×C + B×C or (A - B) × C = A×C - B×C. Step 3: Multiply the easy numbers, then add or subtract! Example: 98 × 5 = (100 - 2) × 5 = 500 - 10 = 490',
    realLife: '98コインの剣を5人分買うとき、「100コインを5人分」と考えてから、おつりを計算すると早いよ！',
    realLifeEn: 'Buying a 98-coin sword for 5 party members? Pretend it is 100 coins each, then subtract the difference!',
    benefit: '頭の中で大きなかけ算がパパッとできるようになる！',
    benefitEn: 'You can do big multiplication quickly in your head!',
  },
  'combining-into-one-equation': {
    id: 'combining-into-one-equation',
    icon: '📝',
    label: '1つの式に表す',
    labelEn: 'Combining into One Equation',
    goal: '順番に計算する文章題を、( )を使って「1つの式」にまとめよう。',
    goalEn: 'Write a multi-step word problem as one single math sentence using parentheses ( ).',
    method: '① 問題を読んで、計算の順番を確認する ② 先に計算する部分を( )で囲む ③ 1つの式にまとめる！ 例：「15個のりんごを3人で分けて、それぞれ2個ずつ食べた」→ (15 ÷ 3) - 2 = 3',
    methodEn: 'Step 1: Read the problem and identify the calculation order. Step 2: Use ( ) around the part to calculate first. Step 3: Combine into one equation! Example: "15 apples divided by 3 people, then each ate 2" → (15 ÷ 3) - 2 = 3',
    realLife: 'ゲームで「100HPの敵を3人で攻撃して、最後に必殺技で20ダメージ」→ 1つの式でダメージ計算！',
    realLifeEn: 'In games: "3 players attack a 100HP enemy, then a special move does 20 damage" → Write as one equation!',
    benefit: '文章題を見て、すぐに式が作れるようになる！',
    benefitEn: 'You can instantly write equations from word problems!',
  },
};

// Generate questions for "Order of Operations" (計算のじゅんじょ)
export function generateOrderOfOperationsQuestions(): CalculationRulesQuestion[] {
  const questions: CalculationRulesQuestion[] = [];

  // Type A: A + B × C (multiplication before addition)
  const typeAProblems: Array<[number, number, number, number]> = [
    [20, 5, 4, 40],      // 20 + 5 × 4 = 20 + 20 = 40
    [30, 6, 5, 60],      // 30 + 6 × 5 = 30 + 30 = 60
    [15, 4, 3, 27],      // 15 + 4 × 3 = 15 + 12 = 27
    [50, 8, 2, 66],      // 50 + 8 × 2 = 50 + 16 = 66
    [25, 7, 4, 53],      // 25 + 7 × 4 = 25 + 28 = 53
    [40, 3, 9, 67],      // 40 + 3 × 9 = 40 + 27 = 67
    [10, 9, 6, 64],      // 10 + 9 × 6 = 10 + 54 = 64
    [35, 2, 8, 51],      // 35 + 2 × 8 = 35 + 16 = 51
  ];

  // Type B: (A - B) ÷ C (parentheses first, then division)
  const typeBProblems: Array<[number, number, number, number]> = [
    [30, 10, 5, 4],      // (30 - 10) ÷ 5 = 20 ÷ 5 = 4
    [25, 5, 4, 5],       // (25 - 5) ÷ 4 = 20 ÷ 4 = 5
    [40, 8, 8, 4],       // (40 - 8) ÷ 8 = 32 ÷ 8 = 4
    [50, 15, 5, 7],      // (50 - 15) ÷ 5 = 35 ÷ 5 = 7
    [36, 6, 6, 5],       // (36 - 6) ÷ 6 = 30 ÷ 6 = 5
    [48, 12, 6, 6],      // (48 - 12) ÷ 6 = 36 ÷ 6 = 6
    [60, 20, 4, 10],     // (60 - 20) ÷ 4 = 40 ÷ 4 = 10
    [45, 9, 9, 4],       // (45 - 9) ÷ 9 = 36 ÷ 9 = 4
  ];

  // Mix Type A and Type B problems
  const mixedProblems: Array<{ type: 'A' | 'B'; values: [number, number, number, number] }> = [
    ...typeAProblems.slice(0, 3).map((values): { type: 'A'; values: [number, number, number, number] } => ({ type: 'A', values })),
    ...typeBProblems.slice(0, 2).map((values): { type: 'B'; values: [number, number, number, number] } => ({ type: 'B', values })),
  ];

  // Shuffle
  mixedProblems.sort(() => Math.random() - 0.5);

  mixedProblems.forEach((problem, index) => {
    const { type, values } = problem;
    const [a, b, c, answer] = values;

    if (type === 'A') {
      const expression = `${a} + ${b} × ${c}`;
      const multiplyResult = b * c;
      questions.push({
        id: index + 1,
        topic: 'order-of-operations',
        text: `次の計算をしましょう：${expression}`,
        textEn: `Calculate the following: ${expression}`,
        answer,
        expression,
        steps: [
          { description: `${b} × ${c} = ${multiplyResult}（かけ算を先に）`, descriptionEn: `${b} × ${c} = ${multiplyResult} (multiply first)`, operation: `${b} × ${c}`, result: multiplyResult },
          { description: `${a} + ${multiplyResult} = ${answer}`, descriptionEn: `${a} + ${multiplyResult} = ${answer}`, operation: `${a} + ${multiplyResult}`, result: answer },
        ],
        explanation: `${expression} = ${a} + ${multiplyResult} = ${answer}（かけ算を先に計算するよ）`,
        explanationEn: `${expression} = ${a} + ${multiplyResult} = ${answer} (multiply first)`,
        formula: `正解: ${expression} = ${a} + ${multiplyResult} = ${answer}（かけ算を先に計算するよ）`,
        formulaEn: `Correct: ${expression} = ${a} + ${multiplyResult} = ${answer} (multiply first)`,
        visualAid: { type: 'order-tree', data: { a, b, c, type: 1 } },
      });
    } else {
      const expression = `(${a} - ${b}) ÷ ${c}`;
      const subtractResult = a - b;
      questions.push({
        id: index + 1,
        topic: 'order-of-operations',
        text: `次の計算をしましょう：${expression}`,
        textEn: `Calculate the following: ${expression}`,
        answer,
        expression,
        steps: [
          { description: `${a} - ${b} = ${subtractResult}（かっこの中を先に）`, descriptionEn: `${a} - ${b} = ${subtractResult} (parentheses first)`, operation: `${a} - ${b}`, result: subtractResult },
          { description: `${subtractResult} ÷ ${c} = ${answer}`, descriptionEn: `${subtractResult} ÷ ${c} = ${answer}`, operation: `${subtractResult} ÷ ${c}`, result: answer },
        ],
        explanation: `${expression} = ${subtractResult} ÷ ${c} = ${answer}（かっこの中を先に計算するよ）`,
        explanationEn: `${expression} = ${subtractResult} ÷ ${c} = ${answer} (parentheses first)`,
        formula: `正解: ${expression} = ${subtractResult} ÷ ${c} = ${answer}（かっこの中を先に計算するよ）`,
        formulaEn: `Correct: ${expression} = ${subtractResult} ÷ ${c} = ${answer} (parentheses first)`,
        visualAid: { type: 'order-tree', data: { a, b, c, type: 2 } },
      });
    }
  });

  return questions;
}

// Generate questions for "Calculate Smartly" (くふうして計算しよう)
export function generateCalculateSmartlyQuestions(): CalculationRulesQuestion[] {
  const questions: CalculationRulesQuestion[] = [];

  // Addition problems where A + C = 100 or 1000
  const additionProblems: Array<[number, number, number, string]> = [
    [18, 55, 82, '18 + 82 = 100'],      // 18 + 55 + 82 = (18 + 82) + 55 = 155
    [25, 40, 75, '25 + 75 = 100'],      // 25 + 40 + 75 = 140
    [36, 25, 64, '36 + 64 = 100'],      // 36 + 25 + 64 = 125
    [45, 33, 55, '45 + 55 = 100'],      // 45 + 33 + 55 = 133
    [12, 88, 88, '12 + 88 = 100'],      // 12 + 88 + 88 = 188
  ];

  // Multiplication problems where A × C = 100 or 1000
  const multiplicationProblems: Array<[number, number, number, string]> = [
    [25, 13, 4, '25 × 4 = 100'],        // 25 × 13 × 4 = 1300
    [125, 7, 8, '125 × 8 = 1000'],      // 125 × 7 × 8 = 7000
    [5, 18, 20, '5 × 20 = 100'],        // 5 × 18 × 20 = 1800
    [4, 25, 25, '4 × 25 = 100'],        // 4 × 25 × 25 = 2500
    [50, 6, 2, '50 × 2 = 100'],         // 50 × 6 × 2 = 600
  ];

  // Mix problems
  const mixedProblems: Array<{ type: 'add' | 'multiply'; values: [number, number, number, string] }> = [
    ...additionProblems.slice(0, 3).map((values): { type: 'add'; values: [number, number, number, string] } => ({ type: 'add', values })),
    ...multiplicationProblems.slice(0, 2).map((values): { type: 'multiply'; values: [number, number, number, string] } => ({ type: 'multiply', values })),
  ];

  // Shuffle
  mixedProblems.sort(() => Math.random() - 0.5);

  mixedProblems.forEach((problem, index) => {
    const { type, values } = problem;
    const [a, b, c, shortcut] = values;

    if (type === 'add') {
      const expression = `${a} + ${b} + ${c}`;
      const answer = a + b + c;
      questions.push({
        id: index + 1,
        topic: 'calculate-smartly',
        text: `くふうして計算しましょう：${expression}`,
        textEn: `Calculate smartly: ${expression}`,
        answer,
        expression,
        explanation: `${expression} = (${a} + ${c}) + ${b} = ${a + c} + ${b} = ${answer}（${shortcut}になるから先に計算するよ）`,
        explanationEn: `${expression} = (${a} + ${c}) + ${b} = ${a + c} + ${b} = ${answer} (${shortcut}, so calculate these first)`,
        formula: `正解: ${expression} = (${a} + ${c}) + ${b} = ${answer}（${shortcut}になるから先に計算するよ）`,
        formulaEn: `Correct: ${expression} = (${a} + ${c}) + ${b} = ${answer} (${shortcut})`,
      });
    } else {
      const expression = `${a} × ${b} × ${c}`;
      const answer = a * b * c;
      questions.push({
        id: index + 1,
        topic: 'calculate-smartly',
        text: `くふうして計算しましょう：${expression}`,
        textEn: `Calculate smartly: ${expression}`,
        answer,
        expression,
        explanation: `${expression} = (${a} × ${c}) × ${b} = ${a * c} × ${b} = ${answer}（${shortcut}になるから先に計算するよ）`,
        explanationEn: `${expression} = (${a} × ${c}) × ${b} = ${a * c} × ${b} = ${answer} (${shortcut}, so calculate these first)`,
        formula: `正解: ${expression} = (${a} × ${c}) × ${b} = ${answer}（${shortcut}になるから先に計算するよ）`,
        formulaEn: `Correct: ${expression} = (${a} × ${c}) × ${b} = ${answer} (${shortcut})`,
      });
    }
  });

  return questions;
}

// Generate questions for "Distributive Property" (分配法則)
export function generateDistributivePropertyQuestions(): CalculationRulesQuestion[] {
  const questions: CalculationRulesQuestion[] = [];

  // Problems where one multiplier is close to 100
  // Format: [hardNumber, easyMultiplier, answer, baseNumber, adjustment]
  // Example: 98 × 4 = (100 - 2) × 4 = 400 - 8 = 392
  const problems: Array<[number, number, number, number, number]> = [
    [98, 4, 392, 100, -2],      // 98 × 4 = (100 - 2) × 4 = 400 - 8 = 392
    [97, 5, 485, 100, -3],      // 97 × 5 = (100 - 3) × 5 = 500 - 15 = 485
    [99, 6, 594, 100, -1],      // 99 × 6 = (100 - 1) × 6 = 600 - 6 = 594
    [101, 7, 707, 100, 1],      // 101 × 7 = (100 + 1) × 7 = 700 + 7 = 707
    [102, 8, 816, 100, 2],      // 102 × 8 = (100 + 2) × 8 = 800 + 16 = 816
    [96, 3, 288, 100, -4],      // 96 × 3 = (100 - 4) × 3 = 300 - 12 = 288
    [103, 4, 412, 100, 3],      // 103 × 4 = (100 + 3) × 4 = 400 + 12 = 412
    [95, 6, 570, 100, -5],      // 95 × 6 = (100 - 5) × 6 = 600 - 30 = 570
    [104, 5, 520, 100, 4],      // 104 × 5 = (100 + 4) × 5 = 500 + 20 = 520
    [98, 7, 686, 100, -2],      // 98 × 7 = (100 - 2) × 7 = 700 - 14 = 686
  ];

  // Shuffle and pick 5
  const shuffled = [...problems].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);

  selected.forEach(([hardNum, multiplier, answer, baseNum, adjustment], index) => {
    const isAddition = adjustment > 0;
    const absAdjustment = Math.abs(adjustment);
    const step1Result = baseNum * multiplier;
    const step2Adjustment = absAdjustment * multiplier;

    questions.push({
      id: index + 1,
      topic: 'distributive-property',
      text: `${hardNum} × ${multiplier} を分配法則を使って計算しましょう。`,
      textEn: `Calculate ${hardNum} × ${multiplier} using the distributive property.`,
      answer,
      isMultiStep: true,
      // Step answers for intermediate inputs
      stepAnswers: [baseNum, step1Result, answer],
      // Prompts for each step
      stepPrompts: [
        { ja: `① (${hardNum} = ___ ${isAddition ? '+' : '-'} ${absAdjustment}) × ${multiplier}`, en: `① (${hardNum} = ___ ${isAddition ? '+' : '-'} ${absAdjustment}) × ${multiplier}` },
        { ja: `② ${baseNum} × ${multiplier} = ___`, en: `② ${baseNum} × ${multiplier} = ___` },
        { ja: `③ ${step1Result} ${isAddition ? '+' : '-'} ${step2Adjustment} = ___`, en: `③ ${step1Result} ${isAddition ? '+' : '-'} ${step2Adjustment} = ___` },
      ],
      expression: `${hardNum} × ${multiplier}`,
      steps: [
        { description: `${hardNum} = ${baseNum} ${isAddition ? '+' : '-'} ${absAdjustment}`, descriptionEn: `${hardNum} = ${baseNum} ${isAddition ? '+' : '-'} ${absAdjustment}`, operation: 'split', result: baseNum },
        { description: `${baseNum} × ${multiplier} = ${step1Result}`, descriptionEn: `${baseNum} × ${multiplier} = ${step1Result}`, operation: `${baseNum} × ${multiplier}`, result: step1Result },
        { description: `${step1Result} ${isAddition ? '+' : '-'} ${step2Adjustment} = ${answer}`, descriptionEn: `${step1Result} ${isAddition ? '+' : '-'} ${step2Adjustment} = ${answer}`, operation: `${step1Result} ${isAddition ? '+' : '-'} ${step2Adjustment}`, result: answer },
      ],
      explanation: `${hardNum} × ${multiplier} = (${baseNum} ${isAddition ? '+' : '-'} ${absAdjustment}) × ${multiplier} = ${step1Result} ${isAddition ? '+' : '-'} ${step2Adjustment} = ${answer}`,
      explanationEn: `${hardNum} × ${multiplier} = (${baseNum} ${isAddition ? '+' : '-'} ${absAdjustment}) × ${multiplier} = ${step1Result} ${isAddition ? '+' : '-'} ${step2Adjustment} = ${answer}`,
      formula: `正解: ${hardNum} × ${multiplier} = (${baseNum} ${isAddition ? '+' : '-'} ${absAdjustment}) × ${multiplier} = ${step1Result} ${isAddition ? '+' : '-'} ${step2Adjustment} = ${answer}`,
      formulaEn: `Correct: ${hardNum} × ${multiplier} = (${baseNum} ${isAddition ? '+' : '-'} ${absAdjustment}) × ${multiplier} = ${step1Result} ${isAddition ? '+' : '-'} ${step2Adjustment} = ${answer}`,
      visualAid: { type: 'area-model', data: { baseNum, adjustment, multiplier, isAddition } },
    });
  });

  return questions;
}

// Generate questions for "Combining into One Equation" (1つの式に表す)
export function generateCombiningEquationQuestions(): CalculationRulesQuestion[] {
  const questions: CalculationRulesQuestion[] = [];

  // Problem scenarios: [description, descriptionEn, numbers, correctEquation, answer]
  const problems: Array<[string, string, number[], string, number]> = [
    [
      'お菓子が12個あります。4人で同じ数ずつ分けて、それぞれが2個食べました。残りは何個ですか？',
      'There are 12 snacks. Divided equally among 4 people, then each ate 2. How many remain?',
      [12, 4, 2],
      '(12 ÷ 4) - 2',
      1
    ],
    [
      'けいくんは50円持っています。お菓子を3つ買って、それぞれ10円でした。残りは何円ですか？',
      'Kei has 50 yen. He bought 3 snacks at 10 yen each. How much remains?',
      [50, 3, 10],
      '50 - (3 × 10)',
      20
    ],
    [
      'りんごが20個あります。5人に同じ数ずつ配って、それぞれが1個お母さんにあげました。残りは何個ですか？',
      'There are 20 apples. Divided equally among 5 people, each gave 1 to mom. How many remain?',
      [20, 5, 1],
      '(20 ÷ 5) - 1',
      3
    ],
    [
      'お金が80円あります。ペンを1本15円で2本買いました。残りは何円ですか？',
      'You have 80 yen. Bought 2 pens at 15 yen each. How much remains?',
      [80, 15, 2],
      '80 - (15 × 2)',
      50
    ],
    [
      'キャンディが30個あります。6人に同じ数ずつ分けて、それぞれが3個食べました。残りは何個ですか？',
      'There are 30 candies. Divided equally among 6 people, each ate 3. How many remain?',
      [30, 6, 3],
      '(30 ÷ 6) - 3',
      2
    ],
    [
      'お金が100円あります。消しゴムを8円のものを5つ買いました。残りは何円ですか？',
      'You have 100 yen. Bought 5 erasers at 8 yen each. How much remains?',
      [100, 8, 5],
      '100 - (8 × 5)',
      60
    ],
    [
      'チョコが24個あります。3人で同じ数ずつ分けて、それぞれが5個食べました。残りは何個ですか？',
      'There are 24 chocolates. Divided equally among 3 people, each ate 5. How many remain?',
      [24, 3, 5],
      '(24 ÷ 3) - 5',
      3
    ],
    [
      'お金が60円あります。シールを12円のものを4つ買いました。残りは何円ですか？',
      'You have 60 yen. Bought 4 stickers at 12 yen each. How much remains?',
      [60, 12, 4],
      '60 - (12 × 4)',
      12
    ],
  ];

  // Shuffle and pick 5
  const shuffled = [...problems].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);

  selected.forEach(([desc, descEn, numbers, correctEq, answer], index) => {
    // Extract unique numbers and operators for equation building
    const uniqueNumbers = [...new Set(numbers)];
    const operators = ['+', '-', '×', '÷', '(', ')'];

    questions.push({
      id: index + 1,
      topic: 'combining-into-one-equation',
      text: desc,
      textEn: descEn,
      answer,
      correctEquation: correctEq,
      numbers: uniqueNumbers,
      operators,
      equationParts: [...uniqueNumbers.map(String), ...operators],
      explanation: `正しい式：${correctEq} = ${answer}`,
      explanationEn: `Correct equation: ${correctEq} = ${answer}`,
      formula: `正解: ${correctEq} = ${answer}`,
      formulaEn: `Correct: ${correctEq} = ${answer}`,
    });
  });

  return questions;
}

// Main function to generate questions based on topic
export function generateCalculationRulesQuestions(topic: CalculationRulesTopic): CalculationRulesQuestion[] {
  if (topic === 'calculate-smartly') {
    return generateCalculateSmartlyQuestions();
  }
  if (topic === 'distributive-property') {
    return generateDistributivePropertyQuestions();
  }
  if (topic === 'combining-into-one-equation') {
    return generateCombiningEquationQuestions();
  }
  return generateOrderOfOperationsQuestions();
}
