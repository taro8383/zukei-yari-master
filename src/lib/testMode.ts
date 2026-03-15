import { LineGraphQuestion, generateLineGraphQuestions } from './lineGraphs';
import { DecimalQuestion, generateDecimalQuestions } from './decimals';
import { CalculationRulesQuestion, generateCalculationRulesQuestions } from './calculationRules';
import { AreaQuestion, generateAreaQuestions } from './area';
import { LargeNumberQuestion, generateLargeNumberQuestions } from './largeNumbers';
import { DivisionQuestion, generateDivisionQuestions } from './division';
import { FractionQuestion, generateFractionQuestions } from './fractions';
import { RatioQuestion, generateRatioQuestions } from './ratios';
import { Question as GeometryQuestion, generateQuestions as generateGeometryQuestions } from './geometry';

export type TestQuestion =
  | (LineGraphQuestion & { topicId: string; tabName: string })
  | (DecimalQuestion & { topicId: string; tabName: string })
  | (CalculationRulesQuestion & { topicId: string; tabName: string })
  | (AreaQuestion & { topicId: string; tabName: string })
  | (LargeNumberQuestion & { topicId: string; tabName: string })
  | (DivisionQuestion & { topicId: string; tabName: string })
  | (FractionQuestion & { topicId: string; tabName: string })
  | (RatioQuestion & { topicId: string; tabName: string })
  | (GeometryQuestion & { topicId: string; tabName: string });

export interface TestConfig {
  type: 'general' | 'tab-specific';
  tabId?: string;
  questionCount: number;
}

// Define all topics across all tabs
const ALL_TOPICS = [
  // Large Numbers tab
  { id: 'reading-oku-cho', tab: 'large-numbers', tabName: '大きな数 / Large Numbers', generator: () => generateLargeNumberQuestions('reading-oku-cho', 1) },
  { id: 'number-puzzle', tab: 'large-numbers', tabName: '大きな数 / Large Numbers', generator: () => generateLargeNumberQuestions('number-puzzle', 1) },
  { id: 'rounding', tab: 'large-numbers', tabName: '大きな数 / Large Numbers', generator: () => generateLargeNumberQuestions('rounding', 1) },

  // Line Graphs tab
  { id: 'reading-graph', tab: 'line-graphs', tabName: '折れ線グラフ / Line Graphs', generator: () => generateLineGraphQuestions('reading-graph', 1) },
  { id: 'change-slope', tab: 'line-graphs', tabName: '折れ線グラフ / Line Graphs', generator: () => generateLineGraphQuestions('change-slope', 1) },
  { id: 'wavy-line', tab: 'line-graphs', tabName: '折れ線グラフ / Line Graphs', generator: () => generateLineGraphQuestions('wavy-line', 1) },
  { id: 'comparing-two-graphs', tab: 'line-graphs', tabName: '折れ線グラフ / Line Graphs', generator: () => generateLineGraphQuestions('comparing-two-graphs', 1) },
  { id: 'drawing-graph', tab: 'line-graphs', tabName: '折れ線グラフ / Line Graphs', generator: () => generateLineGraphQuestions('drawing-graph', 1) },

  // Division tab
  { id: 'grouping-division', tab: 'division', tabName: 'わり算の考え方 / Division', generator: () => generateDivisionQuestions('grouping-division', 1) },
  { id: 'long-division', tab: 'division', tabName: 'わり算の考え方 / Division', generator: () => generateDivisionQuestions('long-division', 1) },
  { id: 'division-properties', tab: 'division', tabName: 'わり算の考え方 / Division', generator: () => generateDivisionQuestions('division-properties', 1) },
  { id: 'long-division-2digit', tab: 'division', tabName: 'わり算の考え方 / Division', generator: () => generateDivisionQuestions('long-division-2digit', 1) },

  // Decimals tab
  { id: 'decimal-structure', tab: 'decimals', tabName: '小数 / Decimals', generator: () => generateDecimalQuestions('decimal-structure', 1) },
  { id: 'decimal-add-subtract', tab: 'decimals', tabName: '小数 / Decimals', generator: () => generateDecimalQuestions('decimal-add-subtract', 1) },
  { id: 'decimal-shift', tab: 'decimals', tabName: '小数 / Decimals', generator: () => generateDecimalQuestions('decimal-shift', 1) },
  { id: 'decimal-multiply-divide', tab: 'decimals', tabName: '小数 / Decimals', generator: () => generateDecimalQuestions('decimal-multiply-divide', 1) },

  // Calculation Rules tab
  { id: 'order-of-operations', tab: 'calculation-rules', tabName: '計算のきまり / Calculation Rules', generator: () => generateCalculationRulesQuestions('order-of-operations', 1) },
  { id: 'calculate-smartly', tab: 'calculation-rules', tabName: '計算のきまり / Calculation Rules', generator: () => generateCalculationRulesQuestions('calculate-smartly', 1) },
  { id: 'distributive-property', tab: 'calculation-rules', tabName: '計算のきまり / Calculation Rules', generator: () => generateCalculationRulesQuestions('distributive-property', 1) },
  { id: 'combining-into-one-equation', tab: 'calculation-rules', tabName: '計算のきまり / Calculation Rules', generator: () => generateCalculationRulesQuestions('combining-into-one-equation', 1) },

  // Area tab
  { id: 'calculating-area', tab: 'area', tabName: '面積 / Area', generator: () => generateAreaQuestions('calculating-area', 1) },
  { id: 'choosing-units', tab: 'area', tabName: '面積 / Area', generator: () => generateAreaQuestions('choosing-units', 1) },
  { id: 'large-area-units', tab: 'area', tabName: '面積 / Area', generator: () => generateAreaQuestions('large-area-units', 1) },
  { id: 'composite-shapes', tab: 'area', tabName: '面積 / Area', generator: () => generateAreaQuestions('composite-shapes', 1) },

  // Fractions tab
  { id: 'fraction-basics', tab: 'fractions', tabName: '分数 / Fractions', generator: () => generateFractionQuestions('fraction-basics', 1) },
  { id: 'equivalent-fractions', tab: 'fractions', tabName: '分数 / Fractions', generator: () => generateFractionQuestions('equivalent-fractions', 1) },
  { id: 'fraction-comparison', tab: 'fractions', tabName: '分数 / Fractions', generator: () => generateFractionQuestions('fraction-comparison', 1) },
  { id: 'fraction-add-subtract', tab: 'fractions', tabName: '分数 / Fractions', generator: () => generateFractionQuestions('fraction-add-subtract', 1) },

  // Ratios tab
  { id: 'ratio-basics', tab: 'ratios', tabName: '比と比例 / Ratios', generator: () => generateRatioQuestions('ratio-basics', 1) },
  { id: 'finding-the-multiple', tab: 'ratios', tabName: '比と比例 / Ratios', generator: () => generateRatioQuestions('finding-the-multiple', 1) },
  { id: 'difference-vs-multiple', tab: 'ratios', tabName: '比と比例 / Ratios', generator: () => generateRatioQuestions('difference-vs-multiple', 1) },

  // Geometry tab
  { id: 'angles-basic', tab: 'geometry', tabName: '角と図形 / Geometry', generator: () => generateGeometryQuestions('angles-basic', 1) },
  { id: 'angles-triangle', tab: 'geometry', tabName: '角と図形 / Geometry', generator: () => generateGeometryQuestions('angles-triangle', 1) },
  { id: 'angles-quadrilateral', tab: 'geometry', tabName: '角と図形 / Geometry', generator: () => generateGeometryQuestions('angles-quadrilateral', 1) },
  { id: 'intersecting-lines', tab: 'geometry', tabName: '角と図形 / Geometry', generator: () => generateGeometryQuestions('intersecting-lines', 1) },
];

export function generateTest(config: TestConfig): TestQuestion[] {
  const questions: TestQuestion[] = [];

  if (config.type === 'general') {
    // General test: 100 questions, at least 2 per topic
    const targetCount = 100;
    const minPerTopic = 2;

    // First pass: add minimum 2 per topic
    for (const topic of ALL_TOPICS) {
      for (let i = 0; i < minPerTopic; i++) {
        const generated = topic.generator();
        if (generated && generated.length > 0) {
          const q = generated[0];
          // Normalize question properties - some question types use different property names
          const normalizedQuestion = {
            ...q,
            // LargeNumberQuestion uses questionText/questionTextEn, others use text/textEn
            text: (q as any).text || (q as any).questionText || '',
            textEn: (q as any).textEn || (q as any).questionTextEn || '',
            topicId: topic.id,
            tabName: topic.tabName,
          };
          questions.push(normalizedQuestion as TestQuestion);
        }
      }
    }

    // Second pass: fill remaining with random topics
    while (questions.length < targetCount) {
      const randomTopic = ALL_TOPICS[Math.floor(Math.random() * ALL_TOPICS.length)];
      const generated = randomTopic.generator();
      if (generated && generated.length > 0) {
        questions.push({
          ...generated[0],
          topicId: randomTopic.id,
          tabName: randomTopic.tabName,
        } as TestQuestion);
      }
    }
  } else if (config.type === 'tab-specific' && config.tabId) {
    // Tab specific test: 20 questions, at least 2 per topic in tab
    const targetCount = 20;
    const minPerTopic = 2;

    const tabTopics = ALL_TOPICS.filter(t => t.tab === config.tabId);

    // First pass: add minimum 2 per topic
    for (const topic of tabTopics) {
      for (let i = 0; i < minPerTopic; i++) {
        const generated = topic.generator();
        if (generated && generated.length > 0) {
          const q = generated[0];
          // Normalize question properties - some question types use different property names
          const normalizedQuestion = {
            ...q,
            // LargeNumberQuestion uses questionText/questionTextEn, others use text/textEn
            text: (q as any).text || (q as any).questionText || '',
            textEn: (q as any).textEn || (q as any).questionTextEn || '',
            topicId: topic.id,
            tabName: topic.tabName,
          };
          questions.push(normalizedQuestion as TestQuestion);
        }
      }
    }

    // Second pass: fill remaining with random topics from this tab
    while (questions.length < targetCount && tabTopics.length > 0) {
      const randomTopic = tabTopics[Math.floor(Math.random() * tabTopics.length)];
      const generated = randomTopic.generator();
      if (generated && generated.length > 0) {
        questions.push({
          ...generated[0],
          topicId: randomTopic.id,
          tabName: randomTopic.tabName,
        } as TestQuestion);
      }
    }
  }

  return questions;
}

export function getTabName(tabId: string): string {
  const tabNames: Record<string, string> = {
    'large-numbers': '大きな数 / Large Numbers',
    'line-graphs': '折れ線グラフ / Line Graphs',
    'division': 'わり算 / Division',
    'decimals': '小数 / Decimals',
    'calculation-rules': '計算のきまり / Calculation Rules',
    'area': '面積 / Area',
    'fractions': '分数 / Fractions',
    'ratios': '比と比例 / Ratios',
    'geometry': '角と図形 / Geometry',
  };
  return tabNames[tabId] || tabId;
}
