// Investigating Changes (変わり方調べ) - 4th Grade MEXT Curriculum
// Focus: Understanding relationships between two changing variables (〇 and △)

export type InvestigatingChangesTopic = 'completing-table' | 'finding-rule' | 'writing-equation';

export interface InvestigatingChangesTopicInfo {
  id: InvestigatingChangesTopic;
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

export interface TableRow {
  x: number; // 〇
  y: number; // △
  isInput?: boolean; // If true, user needs to fill this in
}

export interface InvestigatingChangesQuestion {
  id: number;
  topic: InvestigatingChangesTopic;
  text: string;
  textEn: string;
  explanation: string;
  explanationEn: string;
  // Table data for completing-table topic
  tableData?: TableRow[];
  // Rule information
  ruleType?: 'multiply' | 'add' | 'subtract';
  ruleValue?: number;
  // For finding-rule topic
  correctRuleDescription?: string;
  correctRuleDescriptionEn?: string;
  // Multiple choice options for finding-rule
  ruleOptions?: {
    ja: string;
    en: string;
    value: string;
    isCorrect: boolean;
  }[];
  // For writing-equation topic
  correctOperator?: '×' | '+' | '-';
  correctConstant?: number;
  // Answer
  answer: number | string;
}

export const INVESTIGATING_CHANGES_TOPICS: Record<InvestigatingChangesTopic, InvestigatingChangesTopicInfo> = {
  'completing-table': {
    id: 'completing-table',
    icon: '📊',
    label: '表を完成させる',
    labelEn: 'Completing the Table',
    goal: '表の数字のきまりを見つけて、空いているマスをうめよう！',
    goalEn: 'Find the pattern in the table and fill in the missing numbers!',
    method: '① 上の数（〇）が1増えると、下の数（△）がどう変わるか注目しよう ② 例：〇が1増えると△が3増えるなら、「〇×3＝△」のきまり！',
    methodEn: 'Step 1: Watch how the bottom number changes when the top increases by 1. Step 2: Example: If △ increases by 3 when 〇 increases by 1, the rule is "〇 × 3 = △"!',
    realLife: '剣を5回強化したら、ダメージがどれくらい増えるか予測するとき！',
    realLifeEn: 'Figuring out how much damage you deal if you upgrade your sword 5 times!',
    benefit: '数字の規則性を見つけて予測できるようになる！',
    benefitEn: 'You will be able to find number patterns and make predictions!',
  },
  'finding-rule': {
    id: 'finding-rule',
    icon: '🔍',
    label: 'きまりを見つける',
    labelEn: 'Finding the Rule',
    goal: '表にかくされた「きまり」を言葉で説明しよう！',
    goalEn: 'Explain the secret rule of the table in words!',
    method: '① 表の数字をよく見て、〇と△の関係を調べよう ② 「〇が1増えると、△は○○増える」という言葉で表現しよう',
    methodEn: 'Step 1: Look closely at the table numbers and examine the relationship between 〇 and △. Step 2: Express it in words like "When 〇 increases by 1, △ increases by ○○"!',
    realLife: 'ゲームでキャラクターのレベルが上がると、HPがどれくらい増えるか考えるとき！',
    realLifeEn: 'Thinking about how much HP increases when a character levels up in a game!',
    benefit: '数字の規則を言葉で説明できるようになる！',
    benefitEn: 'You will be able to explain number rules in words!',
  },
  'writing-equation': {
    id: 'writing-equation',
    icon: '✏️',
    label: '〇と△を使った式',
    labelEn: 'Writing the Equation',
    goal: '表のきまりを「〇」と「△」を使った計算の式に変えよう！',
    goalEn: 'Turn the table\'s rule into a powerful math equation!',
    method: '① △がいつも〇の何倍かを調べよう ② 例：△がいつも〇の4倍なら、「〇 × 4 = △」という式になるよ',
    methodEn: 'Step 1: Check how many times bigger △ is than 〇. Step 2: Example: If △ is always 4 times 〇, the equation is "〇 × 4 = △"!',
    realLife: 'お小遣いを貯めると、何週間で目標金額に達するか計算するとき！',
    realLifeEn: 'Calculating how many weeks to reach your savings goal!',
    benefit: '規則を式にして、どんな数字にも使えるようにできる！',
    benefitEn: 'You can turn rules into equations that work with any number!',
  },
};

// Helper function to generate a random integer between min and max (inclusive)
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate questions for completing the table - DYNAMICALLY
export function generateCompletingTableQuestions(): InvestigatingChangesQuestion[] {
  const questions: InvestigatingChangesQuestion[] = [];
  const usedKeys = new Set<string>();

  for (let i = 0; i < 5; i++) {
    // Generate a linear relationship: y = multiplier * x + addend
    // Ensure variety by tracking used combinations
    let multiplier: number;
    let addend: number;
    let key: string;
    let attempts = 0;

    do {
      multiplier = randomInt(2, 5);
      addend = Math.random() > 0.5 ? randomInt(1, 5) : 0;
      key = `${multiplier}-${addend}`;
      attempts++;
    } while (usedKeys.has(key) && attempts < 10);

    usedKeys.add(key);
    const ruleType = addend === 0 ? 'multiply' : 'add';

    // Generate RANDOM x values (not always 1-5)
    const startX = randomInt(1, 10);
    const xValues = [startX, startX + 1, startX + 2, startX + 3, startX + 4];

    // Decide which y value to hide (vary by question index)
    const hiddenIndex = i % 5; // Vary position 0-4 based on question index

    // Create table data
    const tableData: TableRow[] = xValues.map((x, idx) => ({
      x,
      y: multiplier * x + addend,
      isInput: idx === hiddenIndex,
    }));

    // Calculate answer for hidden field
    const hiddenAnswer = multiplier * xValues[hiddenIndex] + addend;

    // Create question text
    const hiddenPosition = hiddenIndex + 1;

    questions.push({
      id: i + 1,
      topic: 'completing-table',
      text: `下の表のきまりを見つけて、空いているマス（第${hiddenPosition}列）をうめよう。`,
      textEn: `Find the rule and fill in the empty cells (column ${hiddenPosition}).`,
      explanation: `きまり：〇 × ${multiplier}${addend > 0 ? ` + ${addend}` : ''} = △\n第${hiddenPosition}列の答え：${hiddenAnswer}`,
      explanationEn: `Rule: 〇 × ${multiplier}${addend > 0 ? ` + ${addend}` : ''} = △\nAnswer for column ${hiddenPosition}: ${hiddenAnswer}`,
      tableData,
      ruleType,
      ruleValue: multiplier,
      answer: hiddenAnswer,
    });
  }

  return questions;
}

// Generate questions for finding the rule - DYNAMICALLY
export function generateFindingRuleQuestions(): InvestigatingChangesQuestion[] {
  const questions: InvestigatingChangesQuestion[] = [];
  const usedKeys = new Set<string>();

  for (let i = 0; i < 5; i++) {
    // Generate a simple multiplication relationship with variety
    let multiplier: number;
    let addend: number;
    let key: string;
    let attempts = 0;

    do {
      multiplier = randomInt(2, 6);
      addend = Math.random() > 0.6 ? randomInt(1, 3) : 0;
      key = `${multiplier}-${addend}`;
      attempts++;
    } while (usedKeys.has(key) && attempts < 10);

    usedKeys.add(key);

    // Generate RANDOM x values (not always 1-5)
    const startX = randomInt(1, 10);
    const xValues = [startX, startX + 1, startX + 2, startX + 3, startX + 4];

    // Generate table
    const tableData: TableRow[] = xValues.map(x => ({
      x,
      y: multiplier * x + addend,
      isInput: false,
    }));

    // Create correct rule description
    let correctRuleJa: string;
    let correctRuleEn: string;

    if (addend === 0) {
      correctRuleJa = `〇の${multiplier}倍になる`;
      correctRuleEn = `△ becomes ${multiplier} times 〇`;
    } else {
      correctRuleJa = `〇の${multiplier}倍に${addend}を足すと△になる`;
      correctRuleEn = `△ equals ${multiplier} times 〇 plus ${addend}`;
    }

    // Generate wrong options
    const wrongMultipliers = [multiplier - 1, multiplier + 1].filter(m => m > 1 && m <= 6 && m !== multiplier);
    const wrongOptions = wrongMultipliers.map(m => ({
      ja: `〇の${m}倍になる`,
      en: `△ becomes ${m} times 〇`,
      value: `multiply-${m}`,
      isCorrect: false,
    }));

    // Combine and shuffle options
    const allOptions = [
      { ja: correctRuleJa, en: correctRuleEn, value: 'correct', isCorrect: true },
      ...wrongOptions,
      { ja: `〇に${multiplier}を足すと△になる`, en: `△ equals 〇 plus ${multiplier}`, value: 'add', isCorrect: false },
    ].slice(0, 3).sort(() => Math.random() - 0.5);

    questions.push({
      id: i + 1,
      topic: 'finding-rule',
      text: '〇が1増えると、△はどう変わりますか？ 正しいきまりをえらぼう。',
      textEn: 'When 〇 increases by 1, how does △ change? Choose the correct rule.',
      explanation: `正解：${correctRuleJa}\n式：〇 × ${multiplier}${addend > 0 ? ` + ${addend}` : ''} = △`,
      explanationEn: `Correct: ${correctRuleEn}\nEquation: 〇 × ${multiplier}${addend > 0 ? ` + ${addend}` : ''} = △`,
      tableData,
      ruleType: addend === 0 ? 'multiply' : 'add',
      ruleValue: multiplier,
      correctRuleDescription: correctRuleJa,
      correctRuleDescriptionEn: correctRuleEn,
      ruleOptions: allOptions,
      answer: 'correct',
    });
  }

  return questions;
}

// Generate questions for writing equation - DYNAMICALLY
export function generateWritingEquationQuestions(): InvestigatingChangesQuestion[] {
  const questions: InvestigatingChangesQuestion[] = [];
  const usedKeys = new Set<string>();

  for (let i = 0; i < 5; i++) {
    // Randomly select operator: multiply (50%), add (30%), subtract (20%)
    const rand = Math.random();
    const operator: '×' | '+' | '-' = rand < 0.5 ? '×' : rand < 0.8 ? '+' : '-';

    // Vary the constant based on operator and ensure uniqueness
    let constant: number;
    let key: string;
    let attempts = 0;
    do {
      constant = operator === '×' ? randomInt(2, 6) : randomInt(2, 10);
      key = `${operator}-${constant}`;
      attempts++;
    } while (usedKeys.has(key) && attempts < 10);

    usedKeys.add(key);

    // Generate RANDOM x values (not always 1-5)
    const startX = randomInt(1, 10);
    const xValues = [startX, startX + 1, startX + 2, startX + 3, startX + 4];

    // Generate table with calculated y values
    const tableData: TableRow[] = xValues.map(x => {
      let y: number;
      if (operator === '×') {
        y = x * constant;
      } else if (operator === '+') {
        y = x + constant;
      } else {
        y = x - constant;
      }
      return {
        x,
        y,
        isInput: false,
      };
    });

    questions.push({
      id: i + 1,
      topic: 'writing-equation',
      text: '表のきまりを「〇」と「△」を使った式に表そう。',
      textEn: 'Express the rule using an equation with 〇 and △.',
      explanation: `式：〇 ${operator} ${constant} = △`,
      explanationEn: `Equation: 〇 ${operator} ${constant} = △`,
      tableData,
      ruleType: operator === '×' ? 'multiply' : operator === '+' ? 'add' : 'subtract',
      ruleValue: constant,
      correctOperator: operator,
      correctConstant: constant,
      answer: key,
    });
  }

  return questions;
}

// Main function to generate investigating changes questions based on topic
export function generateInvestigatingChangesQuestions(topic: InvestigatingChangesTopic): InvestigatingChangesQuestion[] {
  switch (topic) {
    case 'completing-table':
      return generateCompletingTableQuestions();
    case 'finding-rule':
      return generateFindingRuleQuestions();
    case 'writing-equation':
      return generateWritingEquationQuestions();
    default:
      return generateCompletingTableQuestions();
  }
}
