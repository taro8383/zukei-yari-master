import { LineGraphQuestion, generateLineGraphQuestions } from './lineGraphs';
import { DecimalQuestion, generateDecimalQuestions } from './decimals';
import { CalculationRulesQuestion, generateCalculationRulesQuestions } from './calculationRules';
import { AreaQuestion, generateAreaQuestions } from './area';
import { LargeNumberQuestion, generateLargeNumberQuestions } from './largeNumbers';
import { DivisionQuestion, generateDivisionQuestions } from './division';
import { FractionQuestion, generateFractionQuestions } from './fractions';
import { RatioQuestion, AccuracyRateQuestion, generateRatioQuestions, generateAccuracyRateQuestions } from './ratios';
import { Question as GeometryQuestion, generateQuestions as generateGeometryQuestions } from './geometry';
import { InvestigatingChangesQuestion, generateInvestigatingChangesQuestions } from './investigatingChanges';

export type TestQuestion =
  | (LineGraphQuestion & { topicId: string; tabName: string; topicName: string })
  | (DecimalQuestion & { topicId: string; tabName: string; topicName: string })
  | (CalculationRulesQuestion & { topicId: string; tabName: string; topicName: string })
  | (AreaQuestion & { topicId: string; tabName: string; topicName: string })
  | (LargeNumberQuestion & { topicId: string; tabName: string; topicName: string })
  | (DivisionQuestion & { topicId: string; tabName: string; topicName: string })
  | (FractionQuestion & { topicId: string; tabName: string; topicName: string })
  | (RatioQuestion & { topicId: string; tabName: string; topicName: string })
  | (AccuracyRateQuestion & { topicId: string; tabName: string; topicName: string })
  | (GeometryQuestion & { topicId: string; tabName: string; topicName: string })
  | (InvestigatingChangesQuestion & { topicId: string; tabName: string; topicName: string });

export interface TestConfig {
  type: 'general' | 'tab-specific';
  tabId?: string;
  tabIds?: string[];
  questionCount: number;
}

// Topic definitions - generator returns array of questions
// Total: 46 topics across all tabs
const TOPIC_DEFINITIONS = [
  // Large Numbers tab (5 topics) - topicName matches LARGE_NUMBER_TOPICS labels
  { id: 'reading-oku-cho', tab: 'large-numbers', tabName: '大きな数 / Big Numbers', topicName: '億と兆の読み方 / Reading Oku and Cho', generate: () => generateLargeNumberQuestions('reading-oku-cho') },
  { id: 'rounding-off', tab: 'large-numbers', tabName: '大きな数 / Big Numbers', topicName: '四捨五入（ししゃごにゅう） / Rounding Off', generate: () => generateLargeNumberQuestions('rounding-off') },
  { id: 'rounding-up-down', tab: 'large-numbers', tabName: '大きな数 / Big Numbers', topicName: '切り捨てと切り上げ / Rounding Down and Up', generate: () => generateLargeNumberQuestions('rounding-up-down') },
  { id: 'calculating-oku-cho', tab: 'large-numbers', tabName: '大きな数 / Big Numbers', topicName: '大きな数の計算 / Calculating with Large Numbers', generate: () => generateLargeNumberQuestions('calculating-oku-cho') },
  { id: 'estimating-calculations', tab: 'large-numbers', tabName: '大きな数 / Big Numbers', topicName: 'がい算（見積もり） / Estimating Calculations', generate: () => generateLargeNumberQuestions('estimating-calculations') },

  // Line Graphs tab (5 topics) - topicName matches LINE_GRAPH_TOPICS labels
  { id: 'reading-graph', tab: 'line-graphs', tabName: '折れ線 / Line Graphs', topicName: 'グラフの読み取り / Reading Line Graphs', generate: () => generateLineGraphQuestions('reading-graph') },
  { id: 'change-slope', tab: 'line-graphs', tabName: '折れ線 / Line Graphs', topicName: '変化のようす / How Things Change (Slope)', generate: () => generateLineGraphQuestions('change-slope') },
  { id: 'wavy-line', tab: 'line-graphs', tabName: '折れ線 / Line Graphs', topicName: '波線（省略）のあるグラフ / Graphs with Wavy Lines', generate: () => generateLineGraphQuestions('wavy-line') },
  { id: 'comparing-two-graphs', tab: 'line-graphs', tabName: '折れ線 / Line Graphs', topicName: '2つの折れ線グラフ / Comparing Two Line Graphs', generate: () => generateLineGraphQuestions('comparing-two-graphs') },
  { id: 'drawing-graph', tab: 'line-graphs', tabName: '折れ線 / Line Graphs', topicName: '表からグラフをかく / Drawing a Graph from a Table', generate: () => generateLineGraphQuestions('drawing-graph') },

  // Division tab (5 topics)
  { id: 'division-with-remainder', tab: 'division', tabName: 'わり算 / Division', topicName: 'わり算の考え方 / Division Concepts', generate: () => generateDivisionQuestions('division-with-remainder', 5) },
  { id: 'long-division', tab: 'division', tabName: 'わり算 / Division', topicName: '筆算（１桁）/ Long Division (1-digit)', generate: () => generateDivisionQuestions('long-division', 5) },
  { id: 'division-properties', tab: 'division', tabName: 'わり算 / Division', topicName: 'わり算のきまり / Division Properties', generate: () => generateDivisionQuestions('division-properties', 5) },
  { id: 'long-division-2digit', tab: 'division', tabName: 'わり算 / Division', topicName: '筆算（２桁）/ Long Division (2-digit)', generate: () => generateDivisionQuestions('long-division-2digit', 5) },
  { id: 'mental-division', tab: 'division', tabName: 'わり算 / Division', topicName: '暗算 / Mental Division', generate: () => generateDivisionQuestions('mental-division', 5) },

  // Decimals tab (4 topics) - topicName matches DECIMAL_TOPICS labels
  { id: 'decimal-structure', tab: 'decimals', tabName: '小数 / Decimals', topicName: '小数のしくみ / Structure of Decimals', generate: () => generateDecimalQuestions('decimal-structure', 5) },
  { id: 'decimal-add-subtract', tab: 'decimals', tabName: '小数 / Decimals', topicName: '小数のたし算とひき算 / Adding & Subtracting Decimals', generate: () => generateDecimalQuestions('decimal-add-subtract', 5) },
  { id: 'decimal-shift', tab: 'decimals', tabName: '小数 / Decimals', topicName: '10倍、100倍、1/10の数 / Shifting the Decimal Point', generate: () => generateDecimalQuestions('decimal-shift', 5) },
  { id: 'decimal-multiply-divide', tab: 'decimals', tabName: '小数 / Decimals', topicName: '小数×整数・小数÷整数 / Multiply & Divide Decimals by Whole Numbers', generate: () => generateDecimalQuestions('decimal-multiply-divide', 5) },

  // Calculation Rules tab (4 topics)
  { id: 'order-of-operations', tab: 'calculation-rules', tabName: '計算のきまり / Rules', topicName: '計算の順序 / Order of Operations', generate: () => generateCalculationRulesQuestions('order-of-operations', 5) },
  { id: 'calculate-smartly', tab: 'calculation-rules', tabName: '計算のきまり / Rules', topicName: 'かしこく計算しよう / Calculate Smartly', generate: () => generateCalculationRulesQuestions('calculate-smartly', 5) },
  { id: 'distributive-property', tab: 'calculation-rules', tabName: '計算のきまり / Rules', topicName: '分配のきまり / Distributive Property', generate: () => generateCalculationRulesQuestions('distributive-property', 5) },
  { id: 'combining-into-one-equation', tab: 'calculation-rules', tabName: '計算のきまり / Rules', topicName: '１つの式にまとめよう / Combining into One Equation', generate: () => generateCalculationRulesQuestions('combining-into-one-equation', 5) },

  // Area tab (4 topics)
  { id: 'calculating-area', tab: 'area', tabName: '面積 / Area', topicName: '面積の計算 / Calculating Area', generate: () => generateAreaQuestions('calculating-area', 5) },
  { id: 'choosing-units', tab: 'area', tabName: '面積 / Area', topicName: '単位を選ぼう / Choosing Units', generate: () => generateAreaQuestions('choosing-units', 5) },
  { id: 'large-area-units', tab: 'area', tabName: '面積 / Area', topicName: '大きな面積の単位 / Large Area Units', generate: () => generateAreaQuestions('large-area-units', 5) },
  { id: 'composite-shapes', tab: 'area', tabName: '面積 / Area', topicName: '組み合わせ図形 / Composite Shapes', generate: () => generateAreaQuestions('composite-shapes', 5) },

  // Fractions tab (4 topics)
  { id: 'fraction-types', tab: 'fractions', tabName: '分数 / Fractions', topicName: '分数の種類 / Types of Fractions', generate: () => generateFractionQuestions('fraction-types') },
  { id: 'converting-fractions', tab: 'fractions', tabName: '分数 / Fractions', topicName: '分数の変換 / Converting Fractions', generate: () => generateFractionQuestions('converting-fractions') },
  { id: 'adding-fractions', tab: 'fractions', tabName: '分数 / Fractions', topicName: '分数のたし算 / Adding Fractions', generate: () => generateFractionQuestions('adding-fractions') },
  { id: 'subtracting-fractions', tab: 'fractions', tabName: '分数 / Fractions', topicName: '分数のひき算 / Subtracting Fractions', generate: () => generateFractionQuestions('subtracting-fractions') },

  // Ratios tab (4 topics)
  { id: 'finding-ratio', tab: 'ratios', tabName: '割合 / Ratios', topicName: '比を求めよう / Finding Ratios', generate: () => generateRatioQuestions('finding-ratio', 5) },
  { id: 'finding-compared', tab: 'ratios', tabName: '割合 / Ratios', topicName: '比を使って数を求めよう / Finding Compared Amounts', generate: () => generateRatioQuestions('finding-compared', 5) },
  { id: 'finding-base', tab: 'ratios', tabName: '割合 / Ratios', topicName: 'もとになる数を求めよう / Finding Base Amounts', generate: () => generateRatioQuestions('finding-base', 5) },
  { id: 'difference-vs-multiple', tab: 'ratios', tabName: '割合 / Ratios', topicName: '差と倍 / Difference vs Multiple', generate: () => generateRatioQuestions('difference-vs-multiple', 5) },

  // Accuracy Rate tab (3 topics) - topicName matches ACCURACY_RATE_TOPICS labels
  { id: 'decimal-ratio', tab: 'accuracy-rate', tabName: '正答率 / Accuracy', topicName: '割合を小数で求める / Finding the Ratio as a Decimal', generate: () => generateAccuracyRateQuestions('decimal-ratio', 5) },
  { id: 'convert-percent', tab: 'accuracy-rate', tabName: '正答率 / Accuracy', topicName: 'パーセント(%)になおす / Converting to Percentage', generate: () => generateAccuracyRateQuestions('convert-percent', 5) },
  { id: 'calculate-accuracy', tab: 'accuracy-rate', tabName: '正答率 / Accuracy', topicName: '正答率を計算しよう！ / Let\'s Calculate the Accuracy Rate!', generate: () => generateAccuracyRateQuestions('calculate-accuracy', 5) },

  // Geometry tab (5 topics)
  { id: 'angles', tab: 'geometry', tabName: '図形 / Geometry', topicName: '角 / Angles', generate: () => generateGeometryQuestions('angles') },
  { id: 'lines', tab: 'geometry', tabName: '図形 / Geometry', topicName: '平行線と角 / Parallel Lines and Angles', generate: () => generateGeometryQuestions('lines') },
  { id: 'intersecting', tab: 'geometry', tabName: '図形 / Geometry', topicName: '交わる直線の角度 / Intersecting Lines', generate: () => generateGeometryQuestions('intersecting') },
  { id: 'quadrilaterals', tab: 'geometry', tabName: '図形 / Geometry', topicName: '四角形 / Quadrilaterals', generate: () => generateGeometryQuestions('quadrilaterals') },
  { id: 'diagonals', tab: 'geometry', tabName: '図形 / Geometry', topicName: '対角線 / Diagonals', generate: () => generateGeometryQuestions('diagonals') },
  // Area topics also included in Geometry tab (4 topics)
  { id: 'calculating-area', tab: 'geometry', tabName: '図形 / Geometry', topicName: '面積の計算 / Calculating Area', generate: () => generateAreaQuestions('calculating-area', 5) },
  { id: 'choosing-units', tab: 'geometry', tabName: '図形 / Geometry', topicName: '単位を選ぼう / Choosing Units', generate: () => generateAreaQuestions('choosing-units', 5) },
  { id: 'large-area-units', tab: 'geometry', tabName: '図形 / Geometry', topicName: '大きな面積の単位 / Large Area Units', generate: () => generateAreaQuestions('large-area-units', 5) },
  { id: 'composite-shapes', tab: 'geometry', tabName: '図形 / Geometry', topicName: '組み合わせ図形 / Composite Shapes', generate: () => generateAreaQuestions('composite-shapes', 5) },

  // Investigating Changes tab (3 topics)
  { id: 'completing-table', tab: 'investigating-changes', tabName: '変わり方 / Changes', topicName: '表を完成させる / Completing the Table', generate: () => generateInvestigatingChangesQuestions('completing-table') },
  { id: 'finding-rule', tab: 'investigating-changes', tabName: '変わり方 / Changes', topicName: 'きまりを見つける / Finding the Rule', generate: () => generateInvestigatingChangesQuestions('finding-rule') },
  { id: 'writing-equation', tab: 'investigating-changes', tabName: '変わり方 / Changes', topicName: '〇と△を使った式 / Writing the Equation', generate: () => generateInvestigatingChangesQuestions('writing-equation') },
];

// Total: 46 topics (5+5+5+4+4+4+4+4+3+5+3)

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Normalize question to have consistent text/textEn properties
function normalizeQuestion(q: any, topicId: string, tabName: string, topicName: string): TestQuestion {
  return {
    ...q,
    text: (q as any).text || (q as any).questionText || '',
    textEn: (q as any).textEn || (q as any).questionTextEn || '',
    topicId,
    tabName,
    topicName,
  } as TestQuestion;
}

export function generateTest(config: TestConfig): TestQuestion[] {
  const questions: TestQuestion[] = [];

  if (config.type === 'general') {
    // General test: exactly 100 questions, 2-3 per topic (46 topics)
    // 46 × 2 = 92 minimum, 46 × 3 = 138 maximum
    // For 100 questions: 8 topics get 3 questions, 38 topics get 2 questions
    const targetCount = 100;
    const minPerTopic = 2;
    const maxPerTopic = 3;

    // Generate questions for each topic
    const topicQuestionPools: Record<string, TestQuestion[]> = {};

    for (const topic of TOPIC_DEFINITIONS) {
      try {
        const generated = topic.generate();
        if (generated && generated.length > 0) {
          // Normalize and shuffle questions from this topic
          const topicQuestions = shuffleArray(
            generated.map(q => normalizeQuestion(q, topic.id, topic.tabName, topic.topicName))
          );
          topicQuestionPools[topic.id] = topicQuestions;
        } else {
          topicQuestionPools[topic.id] = [];
        }
      } catch (e) {
        console.error(`Error generating questions for topic ${topic.id}:`, e);
        topicQuestionPools[topic.id] = [];
      }
    }

    // First pass: give every topic exactly minPerTopic questions
    for (const topic of TOPIC_DEFINITIONS) {
      const pool = topicQuestionPools[topic.id];
      const toTake = Math.min(minPerTopic, pool.length);
      for (let i = 0; i < toTake; i++) {
        questions.push(pool[i]);
      }
      // Remove taken questions from pool
      topicQuestionPools[topic.id] = pool.slice(toTake);
    }

    // Calculate how many extra questions we need
    const extraNeeded = targetCount - questions.length;

    // Second pass: distribute extra questions (up to maxPerTopic per topic)
    if (extraNeeded > 0) {
      // Get topics that have remaining questions
      const topicsWithExtras = TOPIC_DEFINITIONS.filter(
        topic => topicQuestionPools[topic.id].length > 0
      );

      // Shuffle topics to randomize which ones get extra questions
      const shuffledTopics = shuffleArray(topicsWithExtras);

      let distributed = 0;
      for (const topic of shuffledTopics) {
        if (distributed >= extraNeeded) break;

        const pool = topicQuestionPools[topic.id];
        // How many more can we take from this topic? (max - already taken)
        const currentCount = questions.filter(q => q.topicId === topic.id).length;
        const canTake = Math.min(maxPerTopic - currentCount, pool.length);

        if (canTake > 0) {
          // Take at most 1 extra per topic in this pass for even distribution
          const toTake = Math.min(1, canTake, extraNeeded - distributed);
          for (let i = 0; i < toTake; i++) {
            questions.push(pool[i]);
          }
          topicQuestionPools[topic.id] = pool.slice(toTake);
          distributed += toTake;
        }
      }
    }

    // Shuffle final question list
    return shuffleArray(questions);

  } else if (config.type === 'tab-specific') {
    // Support both single tabId and multiple tabIds
    const tabsToInclude = config.tabIds || (config.tabId ? [config.tabId] : []);

    if (tabsToInclude.length === 0) {
      return questions;
    }

    // Tab specific test: exactly 20 questions total, at least 2 per topic
    const targetCount = 20;
    const minPerTopic = 2;

    const tabTopics = TOPIC_DEFINITIONS.filter(t => tabsToInclude.includes(t.tab));
    const numTabTopics = tabTopics.length;

    if (numTabTopics === 0) {
      return questions;
    }

    // Generate questions for each topic in the selected tabs
    const topicQuestionPools: Record<string, TestQuestion[]> = {};

    for (const topic of tabTopics) {
      try {
        const generated = topic.generate();
        if (generated && generated.length > 0) {
          const topicQuestions = shuffleArray(
            generated.map(q => normalizeQuestion(q, topic.id, topic.tabName, topic.topicName))
          );
          topicQuestionPools[topic.id] = topicQuestions;
        } else {
          topicQuestionPools[topic.id] = [];
        }
      } catch (e) {
        console.error(`Error generating questions for topic ${topic.id}:`, e);
        topicQuestionPools[topic.id] = [];
      }
    }

    // First pass: give every topic exactly minPerTopic questions (2 each)
    for (const topic of tabTopics) {
      const pool = topicQuestionPools[topic.id];
      const toTake = Math.min(minPerTopic, pool.length);
      for (let i = 0; i < toTake; i++) {
        questions.push(pool[i]);
      }
      topicQuestionPools[topic.id] = pool.slice(toTake);
    }

    // Second pass: cycle through topics taking 1 at a time until we reach targetCount
    // This ensures even distribution without a hard max per topic
    let shuffledTopics = shuffleArray([...tabTopics]);
    let topicIndex = 0;
    let cycles = 0;
    const maxCycles = 50; // Safety limit

    while (questions.length < targetCount && cycles < maxCycles) {
      let addedInCycle = false;

      // Try each topic once in this cycle
      for (let i = 0; i < shuffledTopics.length && questions.length < targetCount; i++) {
        const topic = shuffledTopics[(topicIndex + i) % shuffledTopics.length];
        const pool = topicQuestionPools[topic.id];

        if (pool.length > 0) {
          questions.push(pool[0]);
          topicQuestionPools[topic.id] = pool.slice(1);
          addedInCycle = true;
        }
      }

      if (!addedInCycle) break; // No more questions available from any topic
      cycles++;
    }

    // Shuffle final question list
    return shuffleArray(questions);
  }

  return questions;
}

export function getTabName(tabId: string): string {
  const tabNames: Record<string, string> = {
    'large-numbers': '大きな数 / Big Numbers',
    'line-graphs': '折れ線 / Line Graphs',
    'division': 'わり算 / Division',
    'decimals': '小数 / Decimals',
    'calculation-rules': '計算のきまり / Rules',
    'area': '面積 / Area',
    'fractions': '分数 / Fractions',
    'ratios': '割合 / Ratios',
    'accuracy-rate': '正答率 / Accuracy',
    'geometry': '図形 / Geometry',
    'investigating-changes': '変わり方 / Changes',
  };
  return tabNames[tabId] || tabId;
}
