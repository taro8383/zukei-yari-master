import { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, Compass, Circle, Shapes, Percent, Hash, Calculator, Divide, Dot, TrendingUp, History, Pizza, FileCheck } from 'lucide-react';
import TestModeModal from '@/components/TestModeModal';
import TestMode from '@/components/TestMode';
import { generateTest, TestQuestion } from '@/lib/testMode';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExplanationCard from '@/components/ExplanationCard';
import QuestionItem from '@/components/QuestionItem';
import Protractor from '@/components/Protractor';
import ScoreResultModal from '@/components/ScoreResultModal';
import HistoryModal, { HistoryEntry } from '@/components/HistoryModal';
import { Topic, TOPICS, Question, generateQuestions } from '@/lib/geometry';
import { RatioQuestion, RatioTopic, RATIO_TOPICS, generateRatioQuestions, AccuracyRateQuestion, AccuracyRateTopic, ACCURACY_RATE_TOPICS, generateAccuracyRateQuestions } from '@/lib/ratios';
import { LargeNumberQuestion, LargeNumberTopic, LARGE_NUMBER_TOPICS, generateLargeNumberQuestions } from '@/lib/largeNumbers';
import { CalculationRulesQuestion, CalculationRulesTopic, CALCULATION_RULES_TOPICS, generateCalculationRulesQuestions } from '@/lib/calculationRules';
import { DivisionQuestion, DivisionTopic, DIVISION_TOPICS, generateDivisionQuestions } from '@/lib/division';
import { DecimalQuestion, DecimalTopic, DECIMAL_TOPICS, generateDecimalQuestions } from '@/lib/decimals';
import { LineGraphQuestion, LineGraphTopic, LINE_GRAPH_TOPICS, generateLineGraphQuestions } from '@/lib/lineGraphs';
import { FractionQuestion, FractionTopic, FRACTION_TOPICS, generateFractionQuestions } from '@/lib/fractions';
import { InvestigatingChangesQuestion, InvestigatingChangesTopic, INVESTIGATING_CHANGES_TOPICS, generateInvestigatingChangesQuestions } from '@/lib/investigatingChanges';
import { RatioExplanationCard, RatioQuestionItem, AccuracyRateQuestionItem, AccuracyRateExplanationCard } from '@/components/ratios';
import { LargeNumbersExplanationCard, LargeNumbersQuestionItem } from '@/components/largeNumbers';
import { CalculationRulesExplanationCard, CalculationRulesQuestionItem } from '@/components/calculationRules';
import { DivisionExplanationCard, DivisionQuestionItem } from '@/components/division';
import { DecimalExplanationCard, DecimalQuestionItem } from '@/components/decimals';
import { LineGraphExplanationCard, LineGraphQuestionItem } from '@/components/lineGraphs';
import { FractionsExplanationCard, FractionsQuestionItem } from '@/components/fractions';
import { AreaExplanationCard, AreaQuestionItem } from '@/components/area';
import { InvestigatingChangesExplanationCard, InvestigatingChangesQuestionItem } from '@/components/investigatingChanges';
import { saveHistoryEntry, getHistory, clearHistory, TAB_NAMES } from '@/lib/historyStorage';

const topicKeys: Topic[] = ['lines', 'angles', 'intersecting', 'quadrilaterals', 'diagonals', 'calculating-area', 'choosing-units', 'large-area-units', 'composite-shapes'];
const ratioTopicKeys: RatioTopic[] = ['finding-ratio', 'finding-compared', 'finding-base', 'difference-vs-multiple'];
const accuracyRateTopicKeys: AccuracyRateTopic[] = ['decimal-ratio', 'convert-percent', 'calculate-accuracy'];
const largeNumberTopicKeys: LargeNumberTopic[] = ['reading-oku-cho', 'calculating-oku-cho', 'rounding-off', 'rounding-up-down', 'estimating-calculations'];
const calculationRulesTopicKeys: CalculationRulesTopic[] = ['order-of-operations', 'calculate-smartly', 'distributive-property', 'combining-into-one-equation'];
const divisionTopicKeys: DivisionTopic[] = ['division-with-remainder', 'long-division', 'long-division-2digit', 'division-properties', 'mental-division'];
const decimalTopicKeys: DecimalTopic[] = ['decimal-structure', 'decimal-shift', 'decimal-add-subtract', 'decimal-multiply-divide'];
const lineGraphTopicKeys: LineGraphTopic[] = ['reading-graph', 'change-slope', 'wavy-line', 'comparing-two-graphs', 'drawing-graph'];
const fractionTopicKeys: FractionTopic[] = ['fraction-types', 'converting-fractions', 'adding-fractions', 'subtracting-fractions'];
const investigatingChangesTopicKeys: InvestigatingChangesTopic[] = ['completing-table', 'finding-rule', 'writing-equation'];

type ProtractorType = '180' | '360' | null;
type AppTab = 'geometry' | 'ratios' | 'accuracy-rate' | 'large-numbers' | 'calculation-rules' | 'division' | 'decimals' | 'line-graphs' | 'fractions' | 'investigating-changes';

const Index = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<AppTab>('geometry');

  // Geometry state
  const [selectedTopic, setSelectedTopic] = useState<Topic>('lines');
  const [geometryQuestions, setGeometryQuestions] = useState<Question[]>([]);
  const [geometryAnswers, setGeometryAnswers] = useState<string[]>([]);
  const [geometryGraded, setGeometryGraded] = useState(false);
  const [geometryScore, setGeometryScore] = useState(0);

  // Ratios state
  const [selectedRatioTopic, setSelectedRatioTopic] = useState<RatioTopic>('finding-ratio');
  const [ratioQuestions, setRatioQuestions] = useState<RatioQuestion[]>([]);
  const [ratioAnswers, setRatioAnswers] = useState<string[]>([]);
  const [ratioGraded, setRatioGraded] = useState(false);
  const [ratioScore, setRatioScore] = useState(0);
  // For difference-vs-multiple topic (operation selection)
  const [ratioOperationAnswers, setRatioOperationAnswers] = useState<Array<'difference' | 'multiple' | ''>>([]);

  // Accuracy Rate state
  const [selectedAccuracyRateTopic, setSelectedAccuracyRateTopic] = useState<AccuracyRateTopic>('decimal-ratio');
  const [accuracyRateQuestions, setAccuracyRateQuestions] = useState<AccuracyRateQuestion[]>([]);
  const [accuracyRateAnswers, setAccuracyRateAnswers] = useState<string[]>([]);
  const [accuracyRateGraded, setAccuracyRateGraded] = useState(false);
  const [accuracyRateScore, setAccuracyRateScore] = useState(0);

  // Large Numbers state
  const [selectedLargeNumberTopic, setSelectedLargeNumberTopic] = useState<LargeNumberTopic>('reading-oku-cho');
  const [largeNumberQuestions, setLargeNumberQuestions] = useState<LargeNumberQuestion[]>([]);
  const [largeNumberAnswers, setLargeNumberAnswers] = useState<string[]>([]);
  const [largeNumberGraded, setLargeNumberGraded] = useState(false);
  const [largeNumberScore, setLargeNumberScore] = useState(0);

  // Calculation Rules state
  const [selectedCalculationRulesTopic, setSelectedCalculationRulesTopic] = useState<CalculationRulesTopic>('order-of-operations');
  const [calculationRulesQuestions, setCalculationRulesQuestions] = useState<CalculationRulesQuestion[]>([]);
  const [calculationRulesAnswers, setCalculationRulesAnswers] = useState<string[]>([]);
  const [calculationRulesGraded, setCalculationRulesGraded] = useState(false);
  const [calculationRulesScore, setCalculationRulesScore] = useState(0);
  // For multi-step questions (distributive property)
  const [calculationRulesStepAnswers, setCalculationRulesStepAnswers] = useState<string[][]>([]);
  // For combining into one equation (equation builder)
  const [calculationRulesEquationAnswers, setCalculationRulesEquationAnswers] = useState<string[]>([]);

  // Division state
  const [selectedDivisionTopic, setSelectedDivisionTopic] = useState<DivisionTopic>('division-with-remainder');
  const [divisionQuestions, setDivisionQuestions] = useState<DivisionQuestion[]>([]);
  const [divisionAnswers, setDivisionAnswers] = useState<string[]>([]);
  const [divisionGraded, setDivisionGraded] = useState(false);
  const [divisionScore, setDivisionScore] = useState(0);
  // For division with remainder (separate quotient and remainder)
  const [divisionQuotientAnswers, setDivisionQuotientAnswers] = useState<string[]>([]);
  const [divisionRemainderAnswers, setDivisionRemainderAnswers] = useState<string[]>([]);
  // For division properties (step answers)
  const [divisionStepAnswers, setDivisionStepAnswers] = useState<string[][]>([]);

  // Decimals state
  const [selectedDecimalTopic, setSelectedDecimalTopic] = useState<DecimalTopic>('decimal-structure');
  const [decimalQuestions, setDecimalQuestions] = useState<DecimalQuestion[]>([]);
  const [decimalAnswers, setDecimalAnswers] = useState<string[]>([]);
  const [decimalGraded, setDecimalGraded] = useState(false);
  const [decimalScore, setDecimalScore] = useState(0);
  // For add/subtract vertical grid answers
  const [decimalGridAnswers, setDecimalGridAnswers] = useState<string[][]>([]);

  // Line Graphs state
  const [selectedLineGraphTopic, setSelectedLineGraphTopic] = useState<LineGraphTopic>('reading-graph');
  const [lineGraphQuestions, setLineGraphQuestions] = useState<LineGraphQuestion[]>([]);
  const [lineGraphAnswers, setLineGraphAnswers] = useState<string[]>([]);
  const [lineGraphGraded, setLineGraphGraded] = useState(false);
  const [lineGraphScore, setLineGraphScore] = useState(0);
  // For slope questions with dropdowns
  const [lineGraphStartTimeAnswers, setLineGraphStartTimeAnswers] = useState<string[]>([]);
  const [lineGraphEndTimeAnswers, setLineGraphEndTimeAnswers] = useState<string[]>([]);
  // For drawing graph topic (plotted points)
  const [lineGraphPlottedPoints, setLineGraphPlottedPoints] = useState<Array<Array<{ x: number; y: number }>>>([]);

  // Fractions state
  const [selectedFractionTopic, setSelectedFractionTopic] = useState<FractionTopic>('fraction-types');
  const [fractionQuestions, setFractionQuestions] = useState<FractionQuestion[]>([]);
  const [fractionAnswers, setFractionAnswers] = useState<string[]>([]);
  const [fractionGraded, setFractionGraded] = useState(false);
  const [fractionScore, setFractionScore] = useState(0);
  // For fraction input (numerator/denominator)
  const [fractionNumeratorAnswers, setFractionNumeratorAnswers] = useState<(number | '')[]>([]);
  const [fractionDenominatorAnswers, setFractionDenominatorAnswers] = useState<(number | '')[]>([]);
  const [fractionWholeNumberAnswers, setFractionWholeNumberAnswers] = useState<(number | '')[]>([]);

  // Investigating Changes state
  const [selectedInvestigatingChangesTopic, setSelectedInvestigatingChangesTopic] = useState<InvestigatingChangesTopic>('completing-table');
  const [investigatingChangesQuestions, setInvestigatingChangesQuestions] = useState<InvestigatingChangesQuestion[]>([]);
  const [investigatingChangesAnswers, setInvestigatingChangesAnswers] = useState<string[]>([]);
  const [investigatingChangesGraded, setInvestigatingChangesGraded] = useState(false);
  const [investigatingChangesScore, setInvestigatingChangesScore] = useState(0);

  // Protractor state (shared across tabs)
  const [activeProtractor, setActiveProtractor] = useState<ProtractorType>(null);

  // Score modal state
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentResults, setCurrentResults] = useState<Array<{ index: number; isCorrect: boolean; userAnswer: string; correctAnswer: string | number }>>([]);
  const [currentTabName, setCurrentTabName] = useState('');
  const [currentTopicName, setCurrentTopicName] = useState('');

  // History modal state
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Test Mode state
  const [testModeOpen, setTestModeOpen] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [testModeType, setTestModeType] = useState<'general' | 'tab-specific'>('general');

  // Refs for scrolling to questions
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Auto-save state to localStorage every 3 seconds
  const saveCurrentState = useCallback(() => {
    const stateToSave = {
      timestamp: Date.now(),
      activeTab,
      // Geometry
      selectedTopic,
      geometryAnswers,
      geometryGraded,
      // Ratios
      selectedRatioTopic,
      ratioAnswers,
      ratioGraded,
      // Accuracy Rate
      selectedAccuracyRateTopic,
      accuracyRateAnswers,
      accuracyRateGraded,
      // Large Numbers
      selectedLargeNumberTopic,
      largeNumberAnswers,
      largeNumberGraded,
      // Calculation Rules
      selectedCalculationRulesTopic,
      calculationRulesAnswers,
      calculationRulesGraded,
      calculationRulesStepAnswers,
      // Division
      selectedDivisionTopic,
      divisionAnswers,
      divisionGraded,
      divisionStepAnswers,
      // Decimals
      selectedDecimalTopic,
      decimalAnswers,
      decimalGraded,
      // Line Graphs
      selectedLineGraphTopic,
      lineGraphAnswers,
      lineGraphGraded,
      // Fractions
      selectedFractionTopic,
      fractionAnswers,
      fractionGraded,
      fractionNumeratorAnswers,
      fractionDenominatorAnswers,
      fractionWholeNumberAnswers,
      // Investigating Changes
      selectedInvestigatingChangesTopic,
      investigatingChangesAnswers,
      investigatingChangesGraded,
    };

    try {
      localStorage.setItem('zukei-yari-session-state', JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save session state:', e);
    }
  }, [
    activeTab,
    selectedTopic, geometryAnswers, geometryGraded,
    selectedRatioTopic, ratioAnswers, ratioGraded,
    selectedAccuracyRateTopic, accuracyRateAnswers, accuracyRateGraded,
    selectedLargeNumberTopic, largeNumberAnswers, largeNumberGraded,
    selectedCalculationRulesTopic, calculationRulesAnswers, calculationRulesGraded, calculationRulesStepAnswers,
    selectedDivisionTopic, divisionAnswers, divisionGraded, divisionStepAnswers,
    selectedDecimalTopic, decimalAnswers, decimalGraded,
    selectedLineGraphTopic, lineGraphAnswers, lineGraphGraded,
    selectedFractionTopic, fractionAnswers, fractionGraded, fractionNumeratorAnswers, fractionDenominatorAnswers, fractionWholeNumberAnswers,
    selectedInvestigatingChangesTopic, investigatingChangesAnswers, investigatingChangesGraded,
  ]);

  // Auto-save every 3 seconds
  useEffect(() => {
    const interval = setInterval(saveCurrentState, 3000);
    return () => clearInterval(interval);
  }, [saveCurrentState]);

  // Save on page visibility change (tab switch, minimize)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        saveCurrentState();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [saveCurrentState]);

  // Restore state on mount (if saved within last 24 hours)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zukei-yari-session-state');
      if (!saved) return;

      const state = JSON.parse(saved);
      const age = Date.now() - state.timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (age > maxAge) {
        localStorage.removeItem('zukei-yari-session-state');
        return;
      }

      // Restore tab and topics
      if (state.activeTab) setActiveTab(state.activeTab);
      if (state.selectedTopic) setSelectedTopic(state.selectedTopic);
      if (state.selectedRatioTopic) setSelectedRatioTopic(state.selectedRatioTopic);
      if (state.selectedAccuracyRateTopic) setSelectedAccuracyRateTopic(state.selectedAccuracyRateTopic);
      if (state.selectedLargeNumberTopic) setSelectedLargeNumberTopic(state.selectedLargeNumberTopic);
      if (state.selectedCalculationRulesTopic) setSelectedCalculationRulesTopic(state.selectedCalculationRulesTopic);
      if (state.selectedDivisionTopic) setSelectedDivisionTopic(state.selectedDivisionTopic);
      if (state.selectedDecimalTopic) setSelectedDecimalTopic(state.selectedDecimalTopic);
      if (state.selectedLineGraphTopic) setSelectedLineGraphTopic(state.selectedLineGraphTopic);
      if (state.selectedFractionTopic) setSelectedFractionTopic(state.selectedFractionTopic);
      if (state.selectedInvestigatingChangesTopic) setSelectedInvestigatingChangesTopic(state.selectedInvestigatingChangesTopic);

      // Restore answers and graded status
      if (state.geometryAnswers) setGeometryAnswers(state.geometryAnswers);
      if (state.geometryGraded !== undefined) setGeometryGraded(state.geometryGraded);
      if (state.ratioAnswers) setRatioAnswers(state.ratioAnswers);
      if (state.ratioGraded !== undefined) setRatioGraded(state.ratioGraded);
      if (state.accuracyRateAnswers) setAccuracyRateAnswers(state.accuracyRateAnswers);
      if (state.accuracyRateGraded !== undefined) setAccuracyRateGraded(state.accuracyRateGraded);
      if (state.largeNumberAnswers) setLargeNumberAnswers(state.largeNumberAnswers);
      if (state.largeNumberGraded !== undefined) setLargeNumberGraded(state.largeNumberGraded);
      if (state.calculationRulesAnswers) setCalculationRulesAnswers(state.calculationRulesAnswers);
      if (state.calculationRulesGraded !== undefined) setCalculationRulesGraded(state.calculationRulesGraded);
      if (state.calculationRulesStepAnswers) setCalculationRulesStepAnswers(state.calculationRulesStepAnswers);
      if (state.divisionAnswers) setDivisionAnswers(state.divisionAnswers);
      if (state.divisionGraded !== undefined) setDivisionGraded(state.divisionGraded);
      if (state.divisionStepAnswers) setDivisionStepAnswers(state.divisionStepAnswers);
      if (state.decimalAnswers) setDecimalAnswers(state.decimalAnswers);
      if (state.decimalGraded !== undefined) setDecimalGraded(state.decimalGraded);
      if (state.lineGraphAnswers) setLineGraphAnswers(state.lineGraphAnswers);
      if (state.lineGraphGraded !== undefined) setLineGraphGraded(state.lineGraphGraded);
      if (state.fractionAnswers) setFractionAnswers(state.fractionAnswers);
      if (state.fractionGraded !== undefined) setFractionGraded(state.fractionGraded);
      if (state.fractionNumeratorAnswers) setFractionNumeratorAnswers(state.fractionNumeratorAnswers);
      if (state.fractionDenominatorAnswers) setFractionDenominatorAnswers(state.fractionDenominatorAnswers);
      if (state.fractionWholeNumberAnswers) setFractionWholeNumberAnswers(state.fractionWholeNumberAnswers);
      if (state.investigatingChangesAnswers) setInvestigatingChangesAnswers(state.investigatingChangesAnswers);
      if (state.investigatingChangesGraded !== undefined) setInvestigatingChangesGraded(state.investigatingChangesGraded);
    } catch (e) {
      console.warn('Failed to restore session state:', e);
    }
  }, []);

  // Clear saved state when graded (submitted) to avoid restoring old completed work
  useEffect(() => {
    const allGraded = [
      geometryGraded, ratioGraded, accuracyRateGraded, largeNumberGraded,
      calculationRulesGraded, divisionGraded, decimalGraded, lineGraphGraded,
      fractionGraded, investigatingChangesGraded
    ];
    if (allGraded.some(g => g)) {
      // Keep state for potential restore, but mark as completed
      try {
        const saved = localStorage.getItem('zukei-yari-session-state');
        if (saved) {
          const state = JSON.parse(saved);
          state.completed = true;
          state.completedAt = Date.now();
          localStorage.setItem('zukei-yari-session-state', JSON.stringify(state));
        }
      } catch (e) {
        console.warn('Failed to mark state as completed:', e);
      }
    }
  }, [
    geometryGraded, ratioGraded, accuracyRateGraded, largeNumberGraded,
    calculationRulesGraded, divisionGraded, decimalGraded, lineGraphGraded,
    fractionGraded, investigatingChangesGraded
  ]);

  // Listen for theme and settings changes
  useEffect(() => {
    const handleThemeChange = () => {
      const data = getGameData();
      setCurrentTheme(data.settings.theme);
      setGameData(data);
    };

    window.addEventListener('theme-changed', handleThemeChange);
    window.addEventListener('inventory-changed', handleThemeChange);
    window.addEventListener('coins-changed', handleThemeChange);
    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
      window.removeEventListener('inventory-changed', handleThemeChange);
      window.removeEventListener('coins-changed', handleThemeChange);
    };
  }, []);

  // Handle region selection from adventure map
  const handleRegionSelect = (regionId: string, tabId: string) => {
    setShowAdventureMap(false);
    handleTabChange(tabId);
  };

  // Handle opening Teach Me modal for a question
  const handleTeachMe = (question: any, userAnswer: string, index: number) => {
    setTeachMeQuestion(question);
    setTeachMeUserAnswer(userAnswer);
    setTeachMeQuestionIndex(index);
    setTeachMeOpen(true);
  };

  // Handle tab switch - reset exercise states
  const handleTabChange = (value: string) => {
    setActiveTab(value as AppTab);
    // Reset all exercise states when switching tabs
    setGeometryQuestions([]);
    setGeometryAnswers([]);
    setGeometryGraded(false);
    setGeometryScore(0);
    setRatioQuestions([]);
    setRatioAnswers([]);
    setRatioOperationAnswers([]);
    setRatioGraded(false);
    setRatioScore(0);
    setAccuracyRateQuestions([]);
    setAccuracyRateAnswers([]);
    setAccuracyRateGraded(false);
    setAccuracyRateScore(0);
    setLargeNumberQuestions([]);
    setLargeNumberAnswers([]);
    setLargeNumberGraded(false);
    setLargeNumberScore(0);
    // Reset Calculation Rules state
    setCalculationRulesQuestions([]);
    setCalculationRulesAnswers([]);
    setCalculationRulesGraded(false);
    setCalculationRulesScore(0);
    setCalculationRulesStepAnswers([]);
    setCalculationRulesEquationAnswers([]);
    // Reset Division state
    setDivisionQuestions([]);
    setDivisionAnswers([]);
    setDivisionGraded(false);
    setDivisionScore(0);
    setDivisionQuotientAnswers([]);
    setDivisionRemainderAnswers([]);
    setDivisionStepAnswers([]);
    // Reset Decimals state
    setDecimalQuestions([]);
    setDecimalAnswers([]);
    setDecimalGraded(false);
    setDecimalScore(0);
    setDecimalGridAnswers([]);
    // Reset Line Graphs state
    setLineGraphQuestions([]);
    setLineGraphAnswers([]);
    setLineGraphGraded(false);
    setLineGraphScore(0);
    setLineGraphStartTimeAnswers([]);
    setLineGraphEndTimeAnswers([]);
    setLineGraphPlottedPoints([]);
    setLineGraphStartTimeAnswers([]);
    setLineGraphEndTimeAnswers([]);
    // Reset Fractions state
    setFractionQuestions([]);
    setFractionAnswers([]);
    setFractionGraded(false);
    setFractionScore(0);
    setFractionNumeratorAnswers([]);
    setFractionDenominatorAnswers([]);
    setFractionWholeNumberAnswers([]);
    // Reset Investigating Changes state
    setInvestigatingChangesQuestions([]);
    setInvestigatingChangesAnswers([]);
    setInvestigatingChangesGraded(false);
    setInvestigatingChangesScore(0);
    // Hide protractor when leaving geometry tab
    if (value !== 'geometry') {
      setActiveProtractor(null);
    }
  };

  // Geometry handlers
  const handleGenerateGeometry = () => {
    const newQuestions = generateQuestions(selectedTopic);
    setGeometryQuestions(newQuestions);
    setGeometryAnswers(new Array(5).fill(''));
    setGeometryGraded(false);
    setGeometryScore(0);
  };

  const handleGeometryAnswerChange = (index: number, value: string) => {
    const newAnswers = [...geometryAnswers];
    newAnswers[index] = value;
    setGeometryAnswers(newAnswers);
  };

  const allGeometryAnswered = geometryAnswers.length === 5 && geometryAnswers.every((a) => a.trim() !== '');

  const handleGeometryCheck = () => {
    let correct = 0;
    const results = geometryQuestions.map((q, i) => {
      let isCorrect = false;
      // Handle area topics specially
      if (selectedTopic === 'choosing-units') {
        isCorrect = geometryAnswers[i] === q.appropriateUnit;
      } else if (selectedTopic === 'large-area-units') {
        // Allow some tolerance for decimal conversions
        const userAnswer = parseFloat(geometryAnswers[i]);
        const correctAnswer = typeof q.answer === 'number' ? q.answer : parseFloat(q.answer as string);
        isCorrect = Math.abs(userAnswer - correctAnswer) < 0.0001;
      } else {
        isCorrect = parseInt(geometryAnswers[i]) === q.answer;
      }
      if (isCorrect) correct++;
      return {
        index: i,
        isCorrect,
        userAnswer: geometryAnswers[i],
        correctAnswer: selectedTopic === 'choosing-units' ? q.appropriateUnit : q.answer,
      };
    });
    setGeometryScore(correct);
    setGeometryGraded(true);

    // Show score modal
    setCurrentScore(correct);
    setCurrentResults(results);
    setCurrentTabName(TAB_NAMES.geometry.ja);
    setCurrentTopicName(TOPICS[selectedTopic].label);
    setScoreModalOpen(true);

    // Save to history
    saveHistoryEntry({
      date: new Date().toISOString(),
      timestamp: Date.now(),
      tabKey: 'geometry',
      tabName: TAB_NAMES.geometry.ja,
      tabNameEn: TAB_NAMES.geometry.en,
      topicKey: selectedTopic,
      topicName: TOPICS[selectedTopic].label,
      topicNameEn: TOPICS[selectedTopic].labelEn,
      score: correct,
      totalQuestions: geometryQuestions.length,
    });
    setHistory(getHistory());
  };

  // Ratios handlers
  const handleGenerateRatios = () => {
    const newQuestions = generateRatioQuestions(selectedRatioTopic);
    setRatioQuestions(newQuestions);
    setRatioAnswers(new Array(5).fill(''));
    // Initialize operation answers for difference-vs-multiple topic
    setRatioOperationAnswers(new Array(5).fill(''));
    setRatioGraded(false);
    setRatioScore(0);
  };

  const handleRatioAnswerChange = (index: number, value: string) => {
    const newAnswers = [...ratioAnswers];
    newAnswers[index] = value;
    setRatioAnswers(newAnswers);
  };

  const handleRatioOperationChange = (index: number, operation: 'difference' | 'multiple') => {
    const newOperations = [...ratioOperationAnswers];
    newOperations[index] = operation;
    setRatioOperationAnswers(newOperations);
  };

  // Check if all ratio inputs are answered (including operation selection for difference-vs-multiple)
  const allRatiosAnswered = ratioAnswers.length === 5 && ratioAnswers.every((a, i) => {
    const isDiffVsMult = ratioQuestions[i]?.type === 'difference-vs-multiple';
    if (isDiffVsMult) {
      return a.trim() !== '' && ratioOperationAnswers[i] !== '';
    }
    return a.trim() !== '';
  });

  const handleRatioCheck = () => {
    let correct = 0;
    const results = ratioQuestions.map((q, i) => {
      let isCorrect = false;
      // For difference-vs-multiple, check both operation and answer
      if (q.type === 'difference-vs-multiple') {
        const userNum = parseFloat(ratioAnswers[i]);
        const operationCorrect = ratioOperationAnswers[i] === q.correctOperation;
        const answerCorrect = userNum === q.answer;
        isCorrect = operationCorrect && answerCorrect;
      } else {
        // Compare the numeric answer directly
        const userNum = parseFloat(ratioAnswers[i]);
        isCorrect = userNum === q.answer;
      }
      if (isCorrect) correct++;
      return {
        index: i,
        isCorrect,
        userAnswer: ratioAnswers[i],
        correctAnswer: q.answer,
      };
    });
    setRatioScore(correct);
    setRatioGraded(true);

    // Show score modal
    setCurrentScore(correct);
    setCurrentResults(results);
    setCurrentTabName(TAB_NAMES.ratios.ja);
    setCurrentTopicName(RATIO_TOPICS[selectedRatioTopic].label);
    setScoreModalOpen(true);

    // Save to history
    saveHistoryEntry({
      date: new Date().toISOString(),
      timestamp: Date.now(),
      tabKey: 'ratios',
      tabName: TAB_NAMES.ratios.ja,
      tabNameEn: TAB_NAMES.ratios.en,
      topicKey: selectedRatioTopic,
      topicName: RATIO_TOPICS[selectedRatioTopic].label,
      topicNameEn: RATIO_TOPICS[selectedRatioTopic].labelEn,
      score: correct,
      totalQuestions: ratioQuestions.length,
    });
    setHistory(getHistory());
  };

  // Accuracy Rate handlers
  const handleGenerateAccuracyRate = () => {
    const newQuestions = generateAccuracyRateQuestions(selectedAccuracyRateTopic);
    setAccuracyRateQuestions(newQuestions);
    setAccuracyRateAnswers(new Array(5).fill(''));
    setAccuracyRateGraded(false);
    setAccuracyRateScore(0);
  };

  const handleAccuracyRateAnswerChange = (index: number, value: string) => {
    const newAnswers = [...accuracyRateAnswers];
    newAnswers[index] = value;
    setAccuracyRateAnswers(newAnswers);
  };

  const allAccuracyRateAnswered = accuracyRateAnswers.length === 5 && accuracyRateAnswers.every((a) => a.trim() !== '');

  const handleAccuracyRateCheck = () => {
    let correct = 0;
    const results = accuracyRateQuestions.map((q, i) => {
      let isCorrect = false;
      const userNum = parseFloat(accuracyRateAnswers[i]);
      if (q.topic === 'decimal-ratio') {
        // For decimal ratio, compare with tolerance for floating point
        isCorrect = Math.abs(userNum - q.answer) < 0.01;
      } else {
        // For percentage topics, exact match
        isCorrect = userNum === q.answer;
      }
      if (isCorrect) correct++;
      return {
        index: i,
        isCorrect,
        userAnswer: accuracyRateAnswers[i],
        correctAnswer: q.answer,
      };
    });
    setAccuracyRateScore(correct);
    setAccuracyRateGraded(true);

    // Show score modal
    setCurrentScore(correct);
    setCurrentResults(results);
    setCurrentTabName(TAB_NAMES['accuracy-rate'].ja);
    setCurrentTopicName(ACCURACY_RATE_TOPICS[selectedAccuracyRateTopic].label);
    setScoreModalOpen(true);

    // Save to history
    saveHistoryEntry({
      date: new Date().toISOString(),
      timestamp: Date.now(),
      tabKey: 'accuracy-rate',
      tabName: TAB_NAMES['accuracy-rate'].ja,
      tabNameEn: TAB_NAMES['accuracy-rate'].en,
      topicKey: selectedAccuracyRateTopic,
      topicName: ACCURACY_RATE_TOPICS[selectedAccuracyRateTopic].label,
      topicNameEn: ACCURACY_RATE_TOPICS[selectedAccuracyRateTopic].labelEn,
      score: correct,
      totalQuestions: accuracyRateQuestions.length,
    });
    setHistory(getHistory());
  };

  // Large Numbers handlers
  const handleGenerateLargeNumbers = () => {
    const newQuestions = generateLargeNumberQuestions(selectedLargeNumberTopic);
    setLargeNumberQuestions(newQuestions);
    setLargeNumberAnswers(new Array(5).fill(''));
    setLargeNumberGraded(false);
    setLargeNumberScore(0);
  };

  const handleLargeNumberAnswerChange = (index: number, value: string) => {
    const newAnswers = [...largeNumberAnswers];
    newAnswers[index] = value;
    setLargeNumberAnswers(newAnswers);
  };

  const allLargeNumbersAnswered = largeNumberAnswers.length === 5 && largeNumberAnswers.every((a) => a.trim() !== '');

  const handleLargeNumberCheck = () => {
    let correct = 0;
    const results = largeNumberQuestions.map((q, i) => {
      let isCorrect = false;
      if (q.topic === 'reading-oku-cho' || q.topic === 'calculating-oku-cho') {
        // For kanji input (reading and calculating), compare strings directly
        isCorrect = largeNumberAnswers[i].trim() === (q.answer as string);
      } else if (q.topic === 'rounding-up-down') {
        // For word problems with numeric answers
        const userNum = parseInt(largeNumberAnswers[i]);
        isCorrect = userNum === q.answer;
      } else {
        // For number answers (rounding, estimating), parse and compare
        const userNum = parseInt(largeNumberAnswers[i]);
        isCorrect = userNum === q.answer;
      }
      if (isCorrect) correct++;
      return {
        index: i,
        isCorrect,
        userAnswer: largeNumberAnswers[i],
        correctAnswer: q.answer,
      };
    });
    setLargeNumberScore(correct);
    setLargeNumberGraded(true);

    // Show score modal
    setCurrentScore(correct);
    setCurrentResults(results);
    setCurrentTabName(TAB_NAMES['large-numbers'].ja);
    setCurrentTopicName(LARGE_NUMBER_TOPICS[selectedLargeNumberTopic].label);
    setScoreModalOpen(true);

    // Save to history
    saveHistoryEntry({
      date: new Date().toISOString(),
      timestamp: Date.now(),
      tabKey: 'large-numbers',
      tabName: TAB_NAMES['large-numbers'].ja,
      tabNameEn: TAB_NAMES['large-numbers'].en,
      topicKey: selectedLargeNumberTopic,
      topicName: LARGE_NUMBER_TOPICS[selectedLargeNumberTopic].label,
      topicNameEn: LARGE_NUMBER_TOPICS[selectedLargeNumberTopic].labelEn,
      score: correct,
      totalQuestions: largeNumberQuestions.length,
    });
    setHistory(getHistory());
  };

  // Calculation Rules handlers
  const handleGenerateCalculationRules = () => {
    const newQuestions = generateCalculationRulesQuestions(selectedCalculationRulesTopic);
    setCalculationRulesQuestions(newQuestions);
    setCalculationRulesAnswers(new Array(5).fill(''));
    // Initialize step answers for multi-step questions
    setCalculationRulesStepAnswers(newQuestions.map(q => new Array(q.stepPrompts?.length || 0).fill('')));
    // Initialize equation answers for combining-into-one-equation topic
    setCalculationRulesEquationAnswers(new Array(5).fill(''));
    setCalculationRulesGraded(false);
    setCalculationRulesScore(0);
  };

  const handleCalculationRulesAnswerChange = (index: number, value: string) => {
    const newAnswers = [...calculationRulesAnswers];
    newAnswers[index] = value;
    setCalculationRulesAnswers(newAnswers);
  };

  const handleCalculationRulesStepAnswerChange = (questionIndex: number, stepIndex: number, value: string) => {
    const newStepAnswers = [...calculationRulesStepAnswers];
    if (!newStepAnswers[questionIndex]) {
      newStepAnswers[questionIndex] = [];
    }
    newStepAnswers[questionIndex][stepIndex] = value;
    setCalculationRulesStepAnswers(newStepAnswers);
  };

  const handleCalculationRulesEquationChange = (index: number, equation: string) => {
    const newEquationAnswers = [...calculationRulesEquationAnswers];
    newEquationAnswers[index] = equation;
    setCalculationRulesEquationAnswers(newEquationAnswers);
  };

  const allCalculationRulesAnswered = calculationRulesAnswers.length === 5 && calculationRulesAnswers.every((a, i) => {
    const q = calculationRulesQuestions[i];
    // For combining-into-one-equation, check equation is built
    if (q?.topic === 'combining-into-one-equation') {
      return calculationRulesEquationAnswers[i]?.trim() !== '' && a.trim() !== '';
    }
    return a.trim() !== '';
  });

  const handleCalculationRulesCheck = () => {
    let correct = 0;
    const results = calculationRulesQuestions.map((q, i) => {
      let isCorrect = false;
      // For combining-into-one-equation, check both equation and answer
      if (q.topic === 'combining-into-one-equation') {
        const userNum = parseInt(calculationRulesAnswers[i]);
        const equationCorrect = calculationRulesEquationAnswers[i]?.replace(/\s/g, '') === q.correctEquation?.replace(/\s/g, '');
        const answerCorrect = userNum === q.answer;
        isCorrect = equationCorrect && answerCorrect;
      } else {
        const userNum = parseInt(calculationRulesAnswers[i]);
        isCorrect = userNum === q.answer;
      }
      if (isCorrect) correct++;
      return {
        index: i,
        isCorrect,
        userAnswer: calculationRulesAnswers[i],
        correctAnswer: q.answer,
      };
    });
    setCalculationRulesScore(correct);
    setCalculationRulesGraded(true);

    // Show score modal
    setCurrentScore(correct);
    setCurrentResults(results);
    setCurrentTabName(TAB_NAMES['calculation-rules'].ja);
    setCurrentTopicName(CALCULATION_RULES_TOPICS[selectedCalculationRulesTopic].label);
    setScoreModalOpen(true);

    // Save to history
    saveHistoryEntry({
      date: new Date().toISOString(),
      timestamp: Date.now(),
      tabKey: 'calculation-rules',
      tabName: TAB_NAMES['calculation-rules'].ja,
      tabNameEn: TAB_NAMES['calculation-rules'].en,
      topicKey: selectedCalculationRulesTopic,
      topicName: CALCULATION_RULES_TOPICS[selectedCalculationRulesTopic].label,
      topicNameEn: CALCULATION_RULES_TOPICS[selectedCalculationRulesTopic].labelEn,
      score: correct,
      totalQuestions: calculationRulesQuestions.length,
    });
    setHistory(getHistory());
  };

  const geometryScorePercent = geometryScore * 20;
  const ratioScorePercent = ratioScore * 20;
  const accuracyRateScorePercent = accuracyRateScore * 20;
  const largeNumberScorePercent = largeNumberScore * 20;
  const calculationRulesScorePercent = calculationRulesScore * 20;

  // Division handlers
  const handleGenerateDivision = () => {
    const newQuestions = generateDivisionQuestions(selectedDivisionTopic);
    setDivisionQuestions(newQuestions);
    setDivisionAnswers(new Array(5).fill(''));
    setDivisionQuotientAnswers(new Array(5).fill(''));
    setDivisionRemainderAnswers(new Array(5).fill(''));
    // Initialize step answers for properties questions
    setDivisionStepAnswers(newQuestions.map(() => new Array(2).fill('')));
    setDivisionGraded(false);
    setDivisionScore(0);
  };

  const handleDivisionAnswerChange = (index: number, value: string) => {
    const newAnswers = [...divisionAnswers];
    newAnswers[index] = value;
    setDivisionAnswers(newAnswers);
  };

  const handleDivisionQuotientChange = (index: number, value: string) => {
    const newAnswers = [...divisionQuotientAnswers];
    newAnswers[index] = value;
    setDivisionQuotientAnswers(newAnswers);
  };

  const handleDivisionRemainderChange = (index: number, value: string) => {
    const newAnswers = [...divisionRemainderAnswers];
    newAnswers[index] = value;
    setDivisionRemainderAnswers(newAnswers);
  };

  const handleDivisionStepAnswerChange = (questionIndex: number, stepIndex: number, value: string) => {
    const newStepAnswers = [...divisionStepAnswers];
    if (!newStepAnswers[questionIndex]) {
      newStepAnswers[questionIndex] = [];
    }
    newStepAnswers[questionIndex][stepIndex] = value;
    setDivisionStepAnswers(newStepAnswers);
  };

  const allDivisionAnswered = divisionAnswers.length === 5 && divisionAnswers.every((a) => a.trim() !== '');
  const allDivisionWithRemainderAnswered = divisionQuotientAnswers.length === 5 &&
    divisionQuotientAnswers.every((a) => a.trim() !== '') &&
    divisionRemainderAnswers.every((a) => a.trim() !== '');

  // Check if all required inputs are filled based on topic
  const allDivisionInputsAnswered = selectedDivisionTopic === 'division-with-remainder'
    ? allDivisionWithRemainderAnswered
    : selectedDivisionTopic === 'division-properties'
      ? allDivisionAnswered && divisionStepAnswers.every((steps) => steps.every((s) => s.trim() !== ''))
      : allDivisionAnswered;

  const handleDivisionCheck = () => {
    let correct = 0;
    const results = divisionQuestions.map((q, i) => {
      let isCorrect = false;
      if (q.topic === 'division-with-remainder') {
        // Check both quotient and remainder
        const userQuotient = parseInt(divisionQuotientAnswers[i] || '0');
        const userRemainder = parseInt(divisionRemainderAnswers[i] || '0');
        isCorrect = userQuotient === q.quotient && userRemainder === q.remainder;
      } else {
        // For other topics, just check the answer
        const userNum = parseInt(divisionAnswers[i]);
        isCorrect = userNum === q.quotient;
      }
      if (isCorrect) correct++;
      return {
        index: i,
        isCorrect,
        userAnswer: q.topic === 'division-with-remainder'
          ? `${divisionQuotientAnswers[i]}...${divisionRemainderAnswers[i]}`
          : divisionAnswers[i],
        correctAnswer: q.topic === 'division-with-remainder'
          ? `${q.quotient}...${q.remainder}`
          : q.quotient,
      };
    });
    setDivisionScore(correct);
    setDivisionGraded(true);

    // Show score modal
    setCurrentScore(correct);
    setCurrentResults(results);
    setCurrentTabName(TAB_NAMES.division.ja);
    setCurrentTopicName(DIVISION_TOPICS[selectedDivisionTopic].label);
    setScoreModalOpen(true);

    // Save to history
    saveHistoryEntry({
      date: new Date().toISOString(),
      timestamp: Date.now(),
      tabKey: 'division',
      tabName: TAB_NAMES.division.ja,
      tabNameEn: TAB_NAMES.division.en,
      topicKey: selectedDivisionTopic,
      topicName: DIVISION_TOPICS[selectedDivisionTopic].label,
      topicNameEn: DIVISION_TOPICS[selectedDivisionTopic].labelEn,
      score: correct,
      totalQuestions: divisionQuestions.length,
    });
    setHistory(getHistory());
  };

  const divisionScorePercent = divisionScore * 20;

  // Decimals handlers
  const handleGenerateDecimals = () => {
    const newQuestions = generateDecimalQuestions(selectedDecimalTopic);
    setDecimalQuestions(newQuestions);
    setDecimalAnswers(new Array(5).fill(''));
    // Initialize grid answers for add/subtract (max 8 digits per number)
    setDecimalGridAnswers(newQuestions.map(() => new Array(10).fill('')));
    setDecimalGraded(false);
    setDecimalScore(0);
  };

  const handleDecimalAnswerChange = (index: number, value: string) => {
    const newAnswers = [...decimalAnswers];
    newAnswers[index] = value;
    setDecimalAnswers(newAnswers);
  };

  const handleDecimalGridAnswerChange = (questionIndex: number, cellIndex: number, value: string) => {
    const newGridAnswers = [...decimalGridAnswers];
    if (!newGridAnswers[questionIndex]) {
      newGridAnswers[questionIndex] = [];
    }
    newGridAnswers[questionIndex][cellIndex] = value;
    setDecimalGridAnswers(newGridAnswers);
  };

  const allDecimalsAnswered = decimalAnswers.length === 5 && decimalAnswers.every((a) => a.trim() !== '');

  const handleDecimalCheck = () => {
    let correct = 0;
    const results = decimalQuestions.map((q, i) => {
      const userAnswer = parseFloat(decimalAnswers[i]);
      const correctAnswer = typeof q.answer === 'number' ? q.answer : parseFloat(q.answer as string);
      // Allow small floating point tolerance
      const isCorrect = Math.abs(userAnswer - correctAnswer) < 0.001;
      if (isCorrect) correct++;
      return {
        index: i,
        isCorrect,
        userAnswer: decimalAnswers[i],
        correctAnswer: q.answer,
      };
    });
    setDecimalScore(correct);
    setDecimalGraded(true);

    // Show score modal
    setCurrentScore(correct);
    setCurrentResults(results);
    setCurrentTabName(TAB_NAMES.decimals.ja);
    setCurrentTopicName(DECIMAL_TOPICS[selectedDecimalTopic].label);
    setScoreModalOpen(true);

    // Save to history
    saveHistoryEntry({
      date: new Date().toISOString(),
      timestamp: Date.now(),
      tabKey: 'decimals',
      tabName: TAB_NAMES.decimals.ja,
      tabNameEn: TAB_NAMES.decimals.en,
      topicKey: selectedDecimalTopic,
      topicName: DECIMAL_TOPICS[selectedDecimalTopic].label,
      topicNameEn: DECIMAL_TOPICS[selectedDecimalTopic].labelEn,
      score: correct,
      totalQuestions: decimalQuestions.length,
    });
    setHistory(getHistory());
  };

  const decimalScorePercent = decimalScore * 20;

  // Line Graphs handlers
  const handleGenerateLineGraphs = () => {
    const newQuestions = generateLineGraphQuestions(selectedLineGraphTopic);
    setLineGraphQuestions(newQuestions);
    setLineGraphAnswers(new Array(5).fill(''));
    setLineGraphStartTimeAnswers(new Array(5).fill(''));
    setLineGraphEndTimeAnswers(new Array(5).fill(''));
    setLineGraphPlottedPoints(Array.from({ length: 5 }, () => []));
    setLineGraphGraded(false);
    setLineGraphScore(0);
  };

  const handleLineGraphAnswerChange = (index: number, value: string) => {
    const newAnswers = [...lineGraphAnswers];
    newAnswers[index] = value;
    setLineGraphAnswers(newAnswers);
  };

  const handleLineGraphStartTimeChange = (index: number, value: string) => {
    const newAnswers = [...lineGraphStartTimeAnswers];
    newAnswers[index] = value;
    setLineGraphStartTimeAnswers(newAnswers);
  };

  const handleLineGraphEndTimeChange = (index: number, value: string) => {
    const newAnswers = [...lineGraphEndTimeAnswers];
    newAnswers[index] = value;
    setLineGraphEndTimeAnswers(newAnswers);
  };

  const handleLineGraphPointPlot = (index: number, x: number, y: number) => {
    const newPlottedPoints = [...lineGraphPlottedPoints];
    if (!newPlottedPoints[index]) {
      newPlottedPoints[index] = [];
    }

    // If y is -1, remove the point at this x
    if (y === -1) {
      newPlottedPoints[index] = newPlottedPoints[index].filter(p => p.x !== x);
      setLineGraphPlottedPoints(newPlottedPoints);
      return;
    }

    // Check if point already exists at this x, update if so
    const existingPointIndex = newPlottedPoints[index].findIndex(p => p.x === x);
    if (existingPointIndex >= 0) {
      newPlottedPoints[index][existingPointIndex] = { x, y };
    } else {
      newPlottedPoints[index].push({ x, y });
    }
    // Sort by x coordinate
    newPlottedPoints[index].sort((a, b) => a.x - b.x);
    setLineGraphPlottedPoints(newPlottedPoints);
  };

  const handleLineGraphClearPoints = (index: number) => {
    const newPlottedPoints = [...lineGraphPlottedPoints];
    newPlottedPoints[index] = [];
    setLineGraphPlottedPoints(newPlottedPoints);
  };

  const allLineGraphsAnswered = lineGraphAnswers.length === 5 && lineGraphAnswers.every((a, i) => {
    const q = lineGraphQuestions[i];
    if (q?.topic === 'change-slope') {
      return lineGraphStartTimeAnswers[i]?.trim() !== '' && lineGraphEndTimeAnswers[i]?.trim() !== '';
    }
    if (q?.topic === 'drawing-graph') {
      // For drawing graph, check if all points are plotted
      return lineGraphPlottedPoints[i]?.length === (q.tableData?.length || 0);
    }
    return a.trim() !== '';
  });

  const handleLineGraphCheck = () => {
    let correct = 0;
    const results = lineGraphQuestions.map((q, i) => {
      let isCorrect = false;
      if (q.topic === 'change-slope') {
        // For dropdown questions, check the combined answer
        const userAnswer = `${lineGraphStartTimeAnswers[i]}から${lineGraphEndTimeAnswers[i]}`;
        isCorrect = userAnswer === q.answer;
      } else {
        // For number questions
        const userNum = parseFloat(lineGraphAnswers[i]);
        const correctAnswer = typeof q.answer === 'number' ? q.answer : parseFloat(q.answer);
        // Allow small floating point tolerance
        isCorrect = Math.abs(userNum - correctAnswer) < 0.01;
      }
      if (isCorrect) correct++;
      return {
        index: i,
        isCorrect,
        userAnswer: q.topic === 'change-slope'
          ? `${lineGraphStartTimeAnswers[i]}から${lineGraphEndTimeAnswers[i]}`
          : lineGraphAnswers[i],
        correctAnswer: q.answer,
      };
    });
    setLineGraphScore(correct);
    setLineGraphGraded(true);

    // Show score modal
    setCurrentScore(correct);
    setCurrentResults(results);
    setCurrentTabName(TAB_NAMES['line-graphs'].ja);
    setCurrentTopicName(LINE_GRAPH_TOPICS[selectedLineGraphTopic].label);
    setScoreModalOpen(true);

    // Save to history
    saveHistoryEntry({
      date: new Date().toISOString(),
      timestamp: Date.now(),
      tabKey: 'line-graphs',
      tabName: TAB_NAMES['line-graphs'].ja,
      tabNameEn: TAB_NAMES['line-graphs'].en,
      topicKey: selectedLineGraphTopic,
      topicName: LINE_GRAPH_TOPICS[selectedLineGraphTopic].label,
      topicNameEn: LINE_GRAPH_TOPICS[selectedLineGraphTopic].labelEn,
      score: correct,
      totalQuestions: lineGraphQuestions.length,
    });
    setHistory(getHistory());
  };

  const lineGraphScorePercent = lineGraphScore * 20;

  // Fractions handlers
  const handleGenerateFractions = () => {
    const newQuestions = generateFractionQuestions(selectedFractionTopic);
    setFractionQuestions(newQuestions);
    setFractionAnswers(new Array(5).fill(''));
    setFractionNumeratorAnswers(new Array(5).fill(''));
    setFractionDenominatorAnswers(new Array(5).fill(''));
    setFractionWholeNumberAnswers(new Array(5).fill(''));
    setFractionGraded(false);
    setFractionScore(0);
  };

  const handleFractionAnswerChange = (index: number, value: string) => {
    const newAnswers = [...fractionAnswers];
    newAnswers[index] = value;
    setFractionAnswers(newAnswers);
  };

  const handleFractionNumeratorChange = (index: number, value: string) => {
    const newAnswers = [...fractionNumeratorAnswers];
    newAnswers[index] = value === '' ? '' : parseInt(value);
    setFractionNumeratorAnswers(newAnswers);
  };

  const handleFractionDenominatorChange = (index: number, value: string) => {
    const newAnswers = [...fractionDenominatorAnswers];
    newAnswers[index] = value === '' ? '' : parseInt(value);
    setFractionDenominatorAnswers(newAnswers);
  };

  const handleFractionWholeNumberChange = (index: number, value: string) => {
    const newAnswers = [...fractionWholeNumberAnswers];
    newAnswers[index] = value === '' ? '' : parseInt(value);
    setFractionWholeNumberAnswers(newAnswers);
  };

  const allFractionsAnswered = fractionAnswers.length === 5 && fractionAnswers.every((a, i) => {
    const q = fractionQuestions[i];
    if (!q) return false;
    if (q.topic === 'fraction-types') {
      return a.trim() !== '';
    }
    // For other topics, check numerator and denominator are filled
    return fractionNumeratorAnswers[i] !== '' && fractionDenominatorAnswers[i] !== '';
  });

  const handleFractionCheck = () => {
    let correct = 0;
    const results = fractionQuestions.map((q, i) => {
      let isCorrect = false;
      if (q.topic === 'fraction-types') {
        isCorrect = fractionAnswers[i] === q.fractionType;
      } else if (q.topic === 'converting-fractions') {
        const userNum = fractionNumeratorAnswers[i];
        const userDen = fractionDenominatorAnswers[i];
        const userWhole = fractionWholeNumberAnswers[i];
        if (q.convertTo === 'mixed') {
          isCorrect = userWhole === q.answerMixedWhole && userNum === q.answerNum && userDen === q.answerDen;
        } else {
          isCorrect = userNum === q.answerNum && userDen === q.answerDen;
        }
      } else {
        // Adding and subtracting fractions - answer is always simplified fraction only
        const userNum = fractionNumeratorAnswers[i];
        const userDen = fractionDenominatorAnswers[i];
        isCorrect = userNum === q.answerNum && userDen === q.answerDen;
      }
      if (isCorrect) correct++;
      return {
        index: i,
        isCorrect,
        userAnswer: q.topic === 'fraction-types'
          ? fractionAnswers[i]
          : `${fractionWholeNumberAnswers[i] || ''} ${fractionNumeratorAnswers[i]}/${fractionDenominatorAnswers[i]}`,
        correctAnswer: q.topic === 'fraction-types'
          ? q.fractionType
          : q.topic === 'converting-fractions' && q.convertTo === 'mixed'
            ? `${q.answerMixedWhole} ${q.answerNum}/${q.answerDen}`
            : `${q.answerNum}/${q.answerDen}`,
      };
    });
    setFractionScore(correct);
    setFractionGraded(true);

    // Show score modal
    setCurrentScore(correct);
    setCurrentResults(results);
    setCurrentTabName(TAB_NAMES.fractions.ja);
    setCurrentTopicName(FRACTION_TOPICS[selectedFractionTopic].label);
    setScoreModalOpen(true);

    // Save to history
    saveHistoryEntry({
      date: new Date().toISOString(),
      timestamp: Date.now(),
      tabKey: 'fractions',
      tabName: TAB_NAMES.fractions.ja,
      tabNameEn: TAB_NAMES.fractions.en,
      topicKey: selectedFractionTopic,
      topicName: FRACTION_TOPICS[selectedFractionTopic].label,
      topicNameEn: FRACTION_TOPICS[selectedFractionTopic].labelEn,
      score: correct,
      totalQuestions: fractionQuestions.length,
    });
    setHistory(getHistory());
  };

  const fractionScorePercent = fractionScore * 20;

  // Investigating Changes handlers
  const handleGenerateInvestigatingChanges = () => {
    const newQuestions = generateInvestigatingChangesQuestions(selectedInvestigatingChangesTopic);
    setInvestigatingChangesQuestions(newQuestions);
    setInvestigatingChangesAnswers(new Array(5).fill(''));
    setInvestigatingChangesGraded(false);
    setInvestigatingChangesScore(0);
  };

  const handleInvestigatingChangesAnswerChange = (index: number, value: string) => {
    const newAnswers = [...investigatingChangesAnswers];
    newAnswers[index] = value;
    setInvestigatingChangesAnswers(newAnswers);
  };

  const allInvestigatingChangesAnswered = investigatingChangesAnswers.length === 5 && investigatingChangesAnswers.every((a) => a.trim() !== '');

  const handleInvestigatingChangesCheck = () => {
    let correct = 0;
    const results = investigatingChangesQuestions.map((q, i) => {
      let isCorrect = false;
      if (q.topic === 'completing-table') {
        isCorrect = parseInt(investigatingChangesAnswers[i]) === q.answer;
      } else if (q.topic === 'finding-rule') {
        isCorrect = investigatingChangesAnswers[i] === q.answer;
      } else if (q.topic === 'writing-equation') {
        isCorrect = investigatingChangesAnswers[i] === q.answer;
      }
      if (isCorrect) correct++;
      return {
        index: i,
        isCorrect,
        userAnswer: investigatingChangesAnswers[i],
        correctAnswer: q.answer,
      };
    });
    setInvestigatingChangesScore(correct);
    setInvestigatingChangesGraded(true);

    // Show score modal
    setCurrentScore(correct);
    setCurrentResults(results);
    setCurrentTabName(TAB_NAMES['investigating-changes'].ja);
    setCurrentTopicName(INVESTIGATING_CHANGES_TOPICS[selectedInvestigatingChangesTopic].label);
    setScoreModalOpen(true);

    // Save to history
    saveHistoryEntry({
      date: new Date().toISOString(),
      timestamp: Date.now(),
      tabKey: 'investigating-changes',
      tabName: TAB_NAMES['investigating-changes'].ja,
      tabNameEn: TAB_NAMES['investigating-changes'].en,
      topicKey: selectedInvestigatingChangesTopic,
      topicName: INVESTIGATING_CHANGES_TOPICS[selectedInvestigatingChangesTopic].label,
      topicNameEn: INVESTIGATING_CHANGES_TOPICS[selectedInvestigatingChangesTopic].labelEn,
      score: correct,
      totalQuestions: investigatingChangesQuestions.length,
    });
    setHistory(getHistory());
  };

  const investigatingChangesScorePercent = investigatingChangesScore * 20;

  // Test Mode handlers
  const handleStartGeneralTest = () => {
    const questions = generateTest({ type: 'general', questionCount: 100 });
    setTestQuestions(questions);
    setTestModeType('general');
    setIsTestMode(true);
    setTestModeOpen(false);
  };

  const handleStartTabTest = () => {
    const tabMap: Record<AppTab, string> = {
      'geometry': 'geometry',
      'ratios': 'ratios',
      'accuracy-rate': 'accuracy-rate',
      'large-numbers': 'large-numbers',
      'calculation-rules': 'calculation-rules',
      'division': 'division',
      'decimals': 'decimals',
      'line-graphs': 'line-graphs',
      'fractions': 'fractions',
      'investigating-changes': 'investigating-changes',
    };
    const questions = generateTest({ type: 'tab-specific', tabId: tabMap[activeTab], questionCount: 20 });
    setTestQuestions(questions);
    setTestModeType('tab-specific');
    setIsTestMode(true);
    setTestModeOpen(false);
  };

  const handleTestComplete = (score: number, total: number) => {
    saveHistoryEntry({
      date: new Date().toISOString(),
      timestamp: Date.now(),
      tabKey: 'test-mode',
      tabName: 'テストモード',
      tabNameEn: 'Test Mode',
      topicKey: testModeType,
      topicName: testModeType === 'general' ? '総合テスト' : '単元テスト',
      topicNameEn: testModeType === 'general' ? 'General Test' : 'Tab Test',
      score,
      totalQuestions: total,
    });
    setHistory(getHistory());
  };

  const handleExitTestMode = () => {
    setIsTestMode(false);
    setTestQuestions([]);
  };

  // If in test mode, show test interface
  if (isTestMode) {
    return (
      <div className="min-h-screen bg-background">
        <TestMode
          questions={testQuestions}
          onExit={handleExitTestMode}
          onComplete={handleTestComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-kid">
        <div className="container max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">✏️</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-foreground">
                  けいくんの算数アプリ
                </h1>
                <p className="text-muted-foreground text-sm">Kei-kun's Math App</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTestModeOpen(true)}
              title="テストモード / Test Mode"
            >
              <FileCheck className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setHistoryModalOpen(true)}
              title="れきし / History"
            >
              <History className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Protractor overlays */}
      <Protractor
        type="180"
        visible={activeProtractor === '180'}
        onClose={() => setActiveProtractor(null)}
      />
      <Protractor
        type="360"
        visible={activeProtractor === '360'}
        onClose={() => setActiveProtractor(null)}
      />

      {/* Floating Protractor Toolbar - Only show in Geometry tab */}
      {activeTab === 'geometry' && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 bg-card/95 backdrop-blur-sm border border-border rounded-2xl px-2 py-3 shadow-kid-lg">
          <Button
            variant={activeProtractor === '180' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveProtractor(activeProtractor === '180' ? null : '180')}
            className="rounded-full w-10 h-10"
            title="分度器 (180°)"
          >
            <Compass className="w-5 h-5" />
          </Button>
          <Button
            variant={activeProtractor === '360' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveProtractor(activeProtractor === '360' ? null : '360')}
            className="rounded-full w-10 h-10"
            title="分度器 (360°)"
          >
            <Circle className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Main Content with Tabs */}
      <main className="container max-w-3xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
           <TabsList className="w-full grid grid-cols-5 mb-8 h-auto p-2 bg-muted rounded-2xl gap-2">
            {/* Row 1: Numbers & Operations */}
            <TabsTrigger
              value="large-numbers"
              className="flex items-center justify-center gap-2 py-3 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <Hash className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col items-center">
                <span>大きな数</span>
                <span className="text-xs font-normal opacity-60">Big Numbers</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="calculation-rules"
              className="flex items-center justify-center gap-2 py-3 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <Calculator className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col items-center">
                <span>計算のきまり</span>
                <span className="text-xs font-normal opacity-60">Rules</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="division"
              className="flex items-center justify-center gap-2 py-3 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <Divide className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col items-center">
                <span>わり算</span>
                <span className="text-xs font-normal opacity-60">Division</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="decimals"
              className="flex items-center justify-center gap-2 py-3 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <Dot className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col items-center">
                <span>小数</span>
                <span className="text-xs font-normal opacity-60">Decimals</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="fractions"
              className="flex items-center justify-center gap-2 py-3 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <Pizza className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col items-center">
                <span>分数</span>
                <span className="text-xs font-normal opacity-60">Fractions</span>
              </div>
            </TabsTrigger>
            {/* Row 2: Relationships, Space & Data */}
            <TabsTrigger
              value="geometry"
              className="flex items-center justify-center gap-2 py-3 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <Shapes className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col items-center">
                <span>図形</span>
                <span className="text-xs font-normal opacity-60">Geometry</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="ratios"
              className="flex items-center justify-center gap-2 py-3 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <Percent className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col items-center">
                <span>割合</span>
                <span className="text-xs font-normal opacity-60">Ratios</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="line-graphs"
              className="flex items-center justify-center gap-2 py-3 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <TrendingUp className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col items-center">
                <span>折れ線</span>
                <span className="text-xs font-normal opacity-60">Line Graphs</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="investigating-changes"
              className="flex items-center justify-center gap-2 py-3 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <TrendingUp className="w-5 h-5 flex-shrink-0" />
              <div className="flex flex-col items-center">
                <span>変わり方</span>
                <span className="text-xs font-normal opacity-60">Changes</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="accuracy-rate"
              className="flex items-center justify-center gap-2 py-3 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <span className="text-xl flex-shrink-0">🔋</span>
              <div className="flex flex-col items-center">
                <span>正答率</span>
                <span className="text-xs font-normal opacity-60">Accuracy</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Geometry Tab */}
          <TabsContent value="geometry" className="mt-0">
            {/* Topic Selection */}
            <div className="mb-6">
              <p className="font-bold mb-1 text-lg">もんだいのしゅるいをえらぼう：</p>
              <p className="text-sm text-muted-foreground mb-3">Choose a topic:</p>
              <div className="flex flex-wrap gap-3">
                {topicKeys.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTopic(t);
                      // Flush exercises when topic changes
                      setGeometryQuestions([]);
                      setGeometryAnswers([]);
                      setGeometryGraded(false);
                      setGeometryScore(0);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex flex-col items-center ${
                      selectedTopic === t
                        ? 'bg-primary text-primary-foreground shadow-kid-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{TOPICS[t].icon} {TOPICS[t].label}</span>
                    <span className={`text-xs mt-0.5 ${selectedTopic === t ? 'text-primary-foreground/80' : 'text-muted-foreground/60'}`}>{TOPICS[t].labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Info - Always visible like Accuracy Rate tab */}
            <div className="mb-6">
              {['calculating-area', 'choosing-units', 'large-area-units', 'composite-shapes'].includes(selectedTopic) ? (
                <AreaExplanationCard info={{ ...TOPICS[selectedTopic], id: selectedTopic }} />
              ) : (
                <ExplanationCard info={TOPICS[selectedTopic]} />
              )}
            </div>

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateGeometry} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Questions */}
            {geometryQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Questions */}
                <div className="space-y-4 mb-8">
                  {geometryQuestions.map((q, i) => (
                    <div key={q.id} id={`question-${i}`}>
                      {/* Use AreaQuestionItem for area topics, QuestionItem for others */}
                      {['calculating-area', 'large-area-units', 'choosing-units', 'composite-shapes'].includes(selectedTopic) ? (
                        <AreaQuestionItem
                          question={{
                            id: q.id,
                            topic: selectedTopic as AreaTopic,
                            text: q.text,
                            textEn: q.textEn,
                            explanation: q.explanation || '',
                            explanationEn: q.explanationEn || '',
                            shape: q.diagram.params.shape,
                            width: q.diagram.params.width,
                            height: q.diagram.params.height,
                            side: q.diagram.params.side,
                            answerArea: typeof q.answer === 'number' ? q.answer : undefined,
                            fromUnit: q.fromUnit,
                            toUnit: q.toUnit,
                            answerConversion: typeof q.answer === 'number' ? q.answer : undefined,
                            appropriateUnit: q.appropriateUnit,
                            dimensions: q.diagram.params.outerWidth ? {
                              outerWidth: q.diagram.params.outerWidth,
                              outerHeight: q.diagram.params.outerHeight,
                              cutoutWidth: q.diagram.params.cutoutWidth,
                              cutoutHeight: q.diagram.params.cutoutHeight,
                            } : undefined,
                          }}
                          index={i}
                          userAnswer={geometryAnswers[i]}
                          onAnswerChange={(v) => handleGeometryAnswerChange(i, v)}
                          graded={geometryGraded}
                          isCorrect={geometryGraded ? (() => {
                            if (selectedTopic === 'choosing-units') {
                              return geometryAnswers[i] === q.appropriateUnit;
                            }
                            return parseFloat(geometryAnswers[i]) === q.answer;
                          })() : undefined}
                        />
                      ) : (
                        <QuestionItem
                          question={q}
                          index={i}
                          userAnswer={geometryAnswers[i]}
                          onAnswerChange={(v) => handleGeometryAnswerChange(i, v)}
                          graded={geometryGraded}
                          isCorrect={geometryGraded ? parseInt(geometryAnswers[i]) === q.answer : undefined}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Check Button */}
                <div className="text-center">
                  <Button
                    variant="check"
                    size="lg"
                    onClick={handleGeometryCheck}
                    disabled={!allGeometryAnswered || geometryGraded}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span>こたえあわせ</span>
                      <span className="text-xs opacity-80">Check Answers</span>
                    </div>
                  </Button>
                  {!allGeometryAnswered && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ぜんぶのこたえを入れてね！ / Fill in all answers!
                    </p>
                  )}
                  {geometryGraded && (
                    <Button variant="generate" size="lg" onClick={handleGenerateGeometry} className="ml-4">
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Ratios Tab */}
          <TabsContent value="ratios" className="mt-0">
            {/* Topic Selection */}
            <div className="mb-6">
              <p className="font-bold mb-1 text-lg">ばあいのもんだいをえらぼう：</p>
              <p className="text-sm text-muted-foreground mb-3">Choose a topic:</p>
              <div className="flex flex-wrap gap-3">
                {ratioTopicKeys.filter(t => t !== 'accuracy-rate').map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedRatioTopic(t);
                      // Flush exercises when topic changes
                      setRatioQuestions([]);
                      setRatioAnswers([]);
                      setRatioOperationAnswers([]);
                      setRatioGraded(false);
                      setRatioScore(0);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex flex-col items-center ${
                      selectedRatioTopic === t
                        ? 'bg-primary text-primary-foreground shadow-kid-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{RATIO_TOPICS[t].icon} {RATIO_TOPICS[t].label}</span>
                    <span className={`text-xs mt-0.5 ${selectedRatioTopic === t ? 'text-primary-foreground/80' : 'text-muted-foreground/60'}`}>{RATIO_TOPICS[t].labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Info - Always visible like Accuracy Rate tab */}
            <div className="mb-6">
              <RatioExplanationCard info={RATIO_TOPICS[selectedRatioTopic]} />
            </div>

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateRatios} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Questions */}
            {ratioQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Questions */}
                <div className="space-y-4 mb-8">
                  {ratioQuestions.map((q, i) => (
                    <div key={q.id} id={`question-${i}`}>
                      <RatioQuestionItem
                        question={q}
                        index={i}
                        userAnswer={ratioAnswers[i]}
                        onAnswerChange={(v) => handleRatioAnswerChange(i, v)}
                        selectedOperation={ratioOperationAnswers[i]}
                        onOperationChange={(op) => handleRatioOperationChange(i, op)}
                        graded={ratioGraded}
                        isCorrect={ratioGraded ? (
                          q.type === 'difference-vs-multiple'
                            ? parseFloat(ratioAnswers[i]) === q.answer && ratioOperationAnswers[i] === q.correctOperation
                            : parseFloat(ratioAnswers[i]) === q.answer
                        ) : undefined}
                      />
                    </div>
                  ))}
                </div>

                {/* Check Button */}
                <div className="text-center">
                  <Button
                    variant="check"
                    size="lg"
                    onClick={handleRatioCheck}
                    disabled={!allRatiosAnswered || ratioGraded}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span>こたえあわせ</span>
                      <span className="text-xs opacity-80">Check Answers</span>
                    </div>
                  </Button>
                  {!allRatiosAnswered && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ぜんぶのこたえを入れてね！ / Fill in all answers!
                    </p>
                  )}
                  {ratioGraded && (
                    <Button variant="generate" size="lg" onClick={handleGenerateRatios} className="ml-4">
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Accuracy Rate Tab */}
          <TabsContent value="accuracy-rate" className="mt-0">
            {/* Topic Selection */}
            <div className="mb-6">
              <p className="font-bold mb-1 text-lg">正答率のもんだいをえらぼう：</p>
              <p className="text-sm text-muted-foreground mb-3">Choose an accuracy rate topic:</p>
              <div className="flex flex-wrap gap-3">
                {accuracyRateTopicKeys.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedAccuracyRateTopic(t);
                      // Flush exercises when topic changes
                      setAccuracyRateQuestions([]);
                      setAccuracyRateAnswers([]);
                      setAccuracyRateGraded(false);
                      setAccuracyRateScore(0);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex flex-col items-center ${
                      selectedAccuracyRateTopic === t
                        ? 'bg-primary text-primary-foreground shadow-kid-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{ACCURACY_RATE_TOPICS[t].icon} {ACCURACY_RATE_TOPICS[t].label}</span>
                    <span className={`text-xs mt-0.5 ${selectedAccuracyRateTopic === t ? 'text-primary-foreground/80' : 'text-muted-foreground/60'}`}>{ACCURACY_RATE_TOPICS[t].labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Info - Using same format as Geometry */}
            <div className="mb-6">
              <AccuracyRateExplanationCard info={ACCURACY_RATE_TOPICS[selectedAccuracyRateTopic]} />
            </div>

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateAccuracyRate} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Content */}
            {accuracyRateQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Questions */}
                <div className="space-y-4 mb-8">
                  {accuracyRateQuestions.map((q, i) => (
                    <div key={q.id} id={`question-${i}`}>
                      <AccuracyRateQuestionItem
                        question={q}
                        index={i}
                        userAnswer={accuracyRateAnswers[i]}
                        onAnswerChange={(v) => handleAccuracyRateAnswerChange(i, v)}
                        graded={accuracyRateGraded}
                        isCorrect={accuracyRateGraded ? parseFloat(accuracyRateAnswers[i]) === q.answer : undefined}
                      />
                    </div>
                  ))}
                </div>

                {/* Check Button */}
                <div className="text-center">
                  <Button
                    variant="check"
                    size="lg"
                    onClick={handleAccuracyRateCheck}
                    disabled={!allAccuracyRateAnswered || accuracyRateGraded}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span>こたえあわせ</span>
                      <span className="text-xs opacity-80">Check Answers</span>
                    </div>
                  </Button>
                  {!allAccuracyRateAnswered && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ぜんぶのこたえを入れてね！ / Fill in all answers!
                    </p>
                  )}
                  {accuracyRateGraded && (
                    <Button variant="generate" size="lg" onClick={handleGenerateAccuracyRate} className="ml-4">
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Calculation Rules Tab */}
          <TabsContent value="calculation-rules" className="mt-0">
            {/* Topic Selection */}
            <div className="mb-6">
              <p className="font-bold mb-1 text-lg">計算のきまりのもんだいをえらぼう：</p>
              <p className="text-sm text-muted-foreground mb-3">Choose a calculation rules topic:</p>
              <div className="flex flex-wrap gap-3">
                {calculationRulesTopicKeys.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedCalculationRulesTopic(t);
                      // Flush exercises when topic changes
                      setCalculationRulesQuestions([]);
                      setCalculationRulesAnswers([]);
                      setCalculationRulesGraded(false);
                      setCalculationRulesScore(0);
                      setCalculationRulesStepAnswers([]);
                      setCalculationRulesEquationAnswers([]);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex flex-col items-center ${
                      selectedCalculationRulesTopic === t
                        ? 'bg-primary text-primary-foreground shadow-kid-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{CALCULATION_RULES_TOPICS[t].icon} {CALCULATION_RULES_TOPICS[t].label}</span>
                    <span className={`text-xs mt-0.5 ${selectedCalculationRulesTopic === t ? 'text-primary-foreground/80' : 'text-muted-foreground/60'}`}>{CALCULATION_RULES_TOPICS[t].labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Info */}
            <div className="mb-6">
              <CalculationRulesExplanationCard info={CALCULATION_RULES_TOPICS[selectedCalculationRulesTopic]} />
            </div>

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateCalculationRules} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Questions */}
            {calculationRulesQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Questions */}
                <div className="space-y-4 mb-8">
                  {calculationRulesQuestions.map((q, i) => (
                    <div key={q.id} id={`question-${i}`}>
                      <CalculationRulesQuestionItem
                        question={q}
                        index={i}
                        userAnswer={calculationRulesAnswers[i]}
                        onAnswerChange={(v) => handleCalculationRulesAnswerChange(i, v)}
                        graded={calculationRulesGraded}
                        isCorrect={calculationRulesGraded ? (
                          q.topic === 'combining-into-one-equation'
                            ? parseInt(calculationRulesAnswers[i]) === q.answer &&
                              calculationRulesEquationAnswers[i]?.replace(/\s/g, '') === q.correctEquation?.replace(/\s/g, '')
                            : parseInt(calculationRulesAnswers[i]) === q.answer
                        ) : undefined}
                        stepAnswers={calculationRulesStepAnswers[i] || []}
                        onStepAnswerChange={(stepIdx, v) => handleCalculationRulesStepAnswerChange(i, stepIdx, v)}
                      equationAnswer={calculationRulesEquationAnswers[i] || ''}
                      onEquationChange={(eq) => handleCalculationRulesEquationChange(i, eq)}
                      />
                    </div>
                  ))}
                </div>

                {/* Check Button */}
                <div className="text-center">
                  <Button
                    variant="check"
                    size="lg"
                    onClick={handleCalculationRulesCheck}
                    disabled={!allCalculationRulesAnswered || calculationRulesGraded}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span>こたえあわせ</span>
                      <span className="text-xs opacity-80">Check Answers</span>
                    </div>
                  </Button>
                  {!allCalculationRulesAnswered && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ぜんぶのこたえを入れてね！ / Fill in all answers!
                    </p>
                  )}
                  {calculationRulesGraded && (
                    <Button variant="generate" size="lg" onClick={handleGenerateCalculationRules} className="ml-4">
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Division Tab */}
          <TabsContent value="division" className="mt-0">
            {/* Topic Selection */}
            <div className="mb-6">
              <p className="font-bold mb-1 text-lg">わり算のもんだいをえらぼう：</p>
              <p className="text-sm text-muted-foreground mb-3">Choose a division topic:</p>
              <div className="flex flex-wrap gap-3">
                {divisionTopicKeys.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedDivisionTopic(t);
                      // Flush exercises when topic changes
                      setDivisionQuestions([]);
                      setDivisionAnswers([]);
                      setDivisionGraded(false);
                      setDivisionScore(0);
                      setDivisionQuotientAnswers([]);
                      setDivisionRemainderAnswers([]);
                      setDivisionStepAnswers([]);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex flex-col items-center ${
                      selectedDivisionTopic === t
                        ? 'bg-primary text-primary-foreground shadow-kid-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{DIVISION_TOPICS[t].icon} {DIVISION_TOPICS[t].label}</span>
                    <span className={`text-xs mt-0.5 ${selectedDivisionTopic === t ? 'text-primary-foreground/80' : 'text-muted-foreground/60'}`}>{DIVISION_TOPICS[t].labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Info */}
            <div className="mb-6">
              <DivisionExplanationCard info={DIVISION_TOPICS[selectedDivisionTopic]} />
            </div>

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateDivision} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Questions */}
            {divisionQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Questions */}
                <div className="space-y-4 mb-8">
                  {divisionQuestions.map((q, i) => (
                    <div key={q.id} id={`question-${i}`}>
                      <DivisionQuestionItem
                        question={q}
                        index={i}
                        userAnswer={divisionAnswers[i]}
                        onAnswerChange={(v) => handleDivisionAnswerChange(i, v)}
                        quotientAnswer={divisionQuotientAnswers[i]}
                        remainderAnswer={divisionRemainderAnswers[i]}
                        onQuotientChange={(v) => handleDivisionQuotientChange(i, v)}
                        onRemainderChange={(v) => handleDivisionRemainderChange(i, v)}
                        stepAnswers={divisionStepAnswers[i] || []}
                        onStepAnswerChange={(stepIdx, v) => handleDivisionStepAnswerChange(i, stepIdx, v)}
                        graded={divisionGraded}
                        isCorrect={divisionGraded ? (
                          q.topic === 'division-with-remainder'
                            ? parseInt(divisionQuotientAnswers[i] || '0') === q.quotient &&
                              parseInt(divisionRemainderAnswers[i] || '0') === q.remainder
                            : parseInt(divisionAnswers[i]) === q.quotient
                        ) : undefined}
                      />
                    </div>
                  ))}
                </div>

                {/* Check Button */}
                <div className="text-center">
                  <Button
                    variant="check"
                    size="lg"
                    onClick={handleDivisionCheck}
                    disabled={!allDivisionInputsAnswered || divisionGraded}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span>こたえあわせ</span>
                      <span className="text-xs opacity-80">Check Answers</span>
                    </div>
                  </Button>
                  {!allDivisionInputsAnswered && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ぜんぶのこたえを入れてね！ / Fill in all answers!
                    </p>
                  )}
                  {divisionGraded && (
                    <Button variant="generate" size="lg" onClick={handleGenerateDivision} className="ml-4">
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Decimals Tab */}
          <TabsContent value="decimals" className="mt-0">
            {/* Topic Selection */}
            <div className="mb-6">
              <p className="font-bold mb-1 text-lg">小数のもんだいをえらぼう：</p>
              <p className="text-sm text-muted-foreground mb-3">Choose a decimals topic:</p>
              <div className="flex flex-wrap gap-3">
                {decimalTopicKeys.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedDecimalTopic(t);
                      // Flush exercises when topic changes
                      setDecimalQuestions([]);
                      setDecimalAnswers([]);
                      setDecimalGraded(false);
                      setDecimalScore(0);
                      setDecimalGridAnswers([]);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex flex-col items-center ${
                      selectedDecimalTopic === t
                        ? 'bg-primary text-primary-foreground shadow-kid-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{DECIMAL_TOPICS[t].icon} {DECIMAL_TOPICS[t].label}</span>
                    <span className={`text-xs mt-0.5 ${selectedDecimalTopic === t ? 'text-primary-foreground/80' : 'text-muted-foreground/60'}`}>{DECIMAL_TOPICS[t].labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Info */}
            <div className="mb-6">
              <DecimalExplanationCard info={DECIMAL_TOPICS[selectedDecimalTopic]} />
            </div>

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateDecimals} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Questions */}
            {decimalQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Questions */}
                <div className="space-y-4 mb-8">
                  {decimalQuestions.map((q, i) => (
                    <div key={q.id} id={`question-${i}`}>
                      <DecimalQuestionItem
                        question={q}
                        index={i}
                        userAnswer={decimalAnswers[i]}
                        onAnswerChange={(v) => handleDecimalAnswerChange(i, v)}
                        graded={decimalGraded}
                        isCorrect={decimalGraded ? (
                          Math.abs(parseFloat(decimalAnswers[i] || '0') - (typeof q.answer === 'number' ? q.answer : parseFloat(q.answer))) < 0.001
                        ) : undefined}
                        gridAnswers={decimalGridAnswers[i] || []}
                        onGridAnswerChange={(cellIdx, v) => handleDecimalGridAnswerChange(i, cellIdx, v)}
                      />
                    </div>
                  ))}
                </div>

                {/* Check Button */}
                <div className="text-center">
                  <Button
                    variant="check"
                    size="lg"
                    onClick={handleDecimalCheck}
                    disabled={!allDecimalsAnswered || decimalGraded}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span>こたえあわせ</span>
                      <span className="text-xs opacity-80">Check Answers</span>
                    </div>
                  </Button>
                  {!allDecimalsAnswered && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ぜんぶのこたえを入れてね！ / Fill in all answers!
                    </p>
                  )}
                  {decimalGraded && (
                    <Button variant="generate" size="lg" onClick={handleGenerateDecimals} className="ml-4">
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Large Numbers Tab */}
          <TabsContent value="large-numbers" className="mt-0">
            {/* Topic Selection */}
            <div className="mb-6">
              <p className="font-bold mb-1 text-lg">大きな数とがい数のもんだいをえらぼう：</p>
              <p className="text-sm text-muted-foreground mb-3">Choose a large numbers topic:</p>
              <div className="flex flex-wrap gap-3">
                {largeNumberTopicKeys.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedLargeNumberTopic(t);
                      // Flush exercises when topic changes
                      setLargeNumberQuestions([]);
                      setLargeNumberAnswers([]);
                      setLargeNumberGraded(false);
                      setLargeNumberScore(0);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex flex-col items-center ${
                      selectedLargeNumberTopic === t
                        ? 'bg-primary text-primary-foreground shadow-kid-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{LARGE_NUMBER_TOPICS[t].icon} {LARGE_NUMBER_TOPICS[t].label}</span>
                    <span className={`text-xs mt-0.5 ${selectedLargeNumberTopic === t ? 'text-primary-foreground/80' : 'text-muted-foreground/60'}`}>{LARGE_NUMBER_TOPICS[t].labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Info */}
            <div className="mb-6">
              <LargeNumbersExplanationCard info={LARGE_NUMBER_TOPICS[selectedLargeNumberTopic]} />
            </div>

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateLargeNumbers} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Questions */}
            {largeNumberQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Questions */}
                <div className="space-y-4 mb-8">
                  {largeNumberQuestions.map((q, i) => (
                    <div key={q.id} id={`question-${i}`}>
                      <LargeNumbersQuestionItem
                        question={q}
                        index={i}
                        userAnswer={largeNumberAnswers[i]}
                        onAnswerChange={(v) => handleLargeNumberAnswerChange(i, v)}
                        graded={largeNumberGraded}
                        isCorrect={largeNumberGraded ?
                          (q.topic === 'reading-oku-cho' || q.topic === 'calculating-oku-cho'
                            ? largeNumberAnswers[i].trim() === (q.answer as string)
                            : parseInt(largeNumberAnswers[i]) === q.answer)
                          : undefined}
                      />
                    </div>
                  ))}
                </div>

                {/* Check Button */}
                <div className="text-center">
                  <Button
                    variant="check"
                    size="lg"
                    onClick={handleLargeNumberCheck}
                    disabled={!allLargeNumbersAnswered || largeNumberGraded}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span>こたえあわせ</span>
                      <span className="text-xs opacity-80">Check Answers</span>
                    </div>
                  </Button>
                  {!allLargeNumbersAnswered && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ぜんぶのこたえを入れてね！ / Fill in all answers!
                    </p>
                  )}
                  {largeNumberGraded && (
                    <Button variant="generate" size="lg" onClick={handleGenerateLargeNumbers} className="ml-4">
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Line Graphs Tab */}
          <TabsContent value="line-graphs" className="mt-0">
            {/* Topic Selection */}
            <div className="mb-6">
              <p className="font-bold mb-1 text-lg">折れ線グラフのもんだいをえらぼう：</p>
              <p className="text-sm text-muted-foreground mb-3">Choose a line graph topic:</p>
              <div className="flex flex-wrap gap-3">
                {lineGraphTopicKeys.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedLineGraphTopic(t);
                      // Flush exercises when topic changes
                      setLineGraphQuestions([]);
                      setLineGraphAnswers([]);
                      setLineGraphGraded(false);
                      setLineGraphScore(0);
                      setLineGraphStartTimeAnswers([]);
                      setLineGraphEndTimeAnswers([]);
                      setLineGraphPlottedPoints([]);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex flex-col items-center ${
                      selectedLineGraphTopic === t
                        ? 'bg-primary text-primary-foreground shadow-kid-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{LINE_GRAPH_TOPICS[t].icon} {LINE_GRAPH_TOPICS[t].label}</span>
                    <span className={`text-xs mt-0.5 ${selectedLineGraphTopic === t ? 'text-primary-foreground/80' : 'text-muted-foreground/60'}`}>{LINE_GRAPH_TOPICS[t].labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Info */}
            <div className="mb-6">
              <LineGraphExplanationCard info={LINE_GRAPH_TOPICS[selectedLineGraphTopic]} />
            </div>

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateLineGraphs} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Questions */}
            {lineGraphQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Questions */}
                <div className="space-y-4 mb-8">
                  {lineGraphQuestions.map((q, i) => (
                    <div key={q.id} id={`question-${i}`}>
                      <LineGraphQuestionItem
                        question={q}
                        index={i}
                        userAnswer={lineGraphAnswers[i]}
                        onAnswerChange={(v) => handleLineGraphAnswerChange(i, v)}
                        startTimeAnswer={lineGraphStartTimeAnswers[i]}
                        endTimeAnswer={lineGraphEndTimeAnswers[i]}
                        onStartTimeChange={(v) => handleLineGraphStartTimeChange(i, v)}
                        onEndTimeChange={(v) => handleLineGraphEndTimeChange(i, v)}
                        plottedPoints={lineGraphPlottedPoints[i]}
                        onPointPlot={(x, y) => handleLineGraphPointPlot(i, x, y)}
                        onClearPoints={() => handleLineGraphClearPoints(i)}
                        graded={lineGraphGraded}
                        isCorrect={lineGraphGraded ? (
                          q.topic === 'change-slope'
                            ? `${lineGraphStartTimeAnswers[i]}から${lineGraphEndTimeAnswers[i]}` === q.answer
                            : Math.abs(parseFloat(lineGraphAnswers[i] || '0') - (typeof q.answer === 'number' ? q.answer : parseFloat(q.answer))) < 0.01
                        ) : undefined}
                      />
                    </div>
                  ))}
                </div>

                {/* Check Button */}
                <div className="text-center">
                  <Button
                    variant="check"
                    size="lg"
                    onClick={handleLineGraphCheck}
                    disabled={!allLineGraphsAnswered || lineGraphGraded}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span>こたえあわせ</span>
                      <span className="text-xs opacity-80">Check Answers</span>
                    </div>
                  </Button>
                  {!allLineGraphsAnswered && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ぜんぶのこたえを入れてね！ / Fill in all answers!
                    </p>
                  )}
                  {lineGraphGraded && (
                    <Button variant="generate" size="lg" onClick={handleGenerateLineGraphs} className="ml-4">
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Fractions Tab */}
          <TabsContent value="fractions" className="mt-0">
            {/* Topic Selection */}
            <div className="mb-6">
              <p className="font-bold mb-1 text-lg">分数のもんだいをえらぼう：</p>
              <p className="text-sm text-muted-foreground mb-3">Choose a fractions topic:</p>
              <div className="flex flex-wrap gap-3">
                {fractionTopicKeys.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedFractionTopic(t);
                      // Flush exercises when topic changes
                      setFractionQuestions([]);
                      setFractionAnswers([]);
                      setFractionGraded(false);
                      setFractionScore(0);
                      setFractionNumeratorAnswers([]);
                      setFractionDenominatorAnswers([]);
                      setFractionWholeNumberAnswers([]);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex flex-col items-center ${
                      selectedFractionTopic === t
                        ? 'bg-primary text-primary-foreground shadow-kid-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{FRACTION_TOPICS[t].icon} {FRACTION_TOPICS[t].label}</span>
                    <span className={`text-xs mt-0.5 ${selectedFractionTopic === t ? 'text-primary-foreground/80' : 'text-muted-foreground/60'}`}>{FRACTION_TOPICS[t].labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Info */}
            <div className="mb-6">
              <FractionsExplanationCard info={FRACTION_TOPICS[selectedFractionTopic]} />
            </div>

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateFractions} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Questions */}
            {fractionQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Questions */}
                <div className="space-y-4 mb-8">
                  {fractionQuestions.map((q, i) => (
                    <div key={q.id} id={`question-${i}`}>
                      <FractionsQuestionItem
                        question={q}
                        index={i}
                        userAnswer={fractionAnswers[i]}
                        onAnswerChange={(v) => handleFractionAnswerChange(i, v)}
                        userNumerator={fractionNumeratorAnswers[i]}
                        userDenominator={fractionDenominatorAnswers[i]}
                        userWholeNumber={fractionWholeNumberAnswers[i]}
                        onNumeratorChange={(v) => handleFractionNumeratorChange(i, v)}
                        onDenominatorChange={(v) => handleFractionDenominatorChange(i, v)}
                        onWholeNumberChange={(v) => handleFractionWholeNumberChange(i, v)}
                        graded={fractionGraded}
                        isCorrect={fractionGraded ? (
                          (() => {
                            if (q.topic === 'fraction-types') {
                              return fractionAnswers[i] === q.fractionType;
                            } else if (q.topic === 'converting-fractions') {
                              const userNum = fractionNumeratorAnswers[i];
                              const userDen = fractionDenominatorAnswers[i];
                              const userWhole = fractionWholeNumberAnswers[i];
                              if (q.convertTo === 'mixed') {
                                return userWhole === q.answerMixedWhole && userNum === q.answerNum && userDen === q.answerDen;
                              } else {
                                return userNum === q.answerNum && userDen === q.answerDen;
                              }
                            } else {
                              // Adding and subtracting fractions - simplified fraction only
                              const userNum = fractionNumeratorAnswers[i];
                              const userDen = fractionDenominatorAnswers[i];
                              return userNum === q.answerNum && userDen === q.answerDen;
                            }
                          })()
                        ) : undefined}
                      />
                    </div>
                  ))}
                </div>

                {/* Check Button */}
                <div className="text-center">
                  <Button
                    variant="check"
                    size="lg"
                    onClick={handleFractionCheck}
                    disabled={!allFractionsAnswered || fractionGraded}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span>こたえあわせ</span>
                      <span className="text-xs opacity-80">Check Answers</span>
                    </div>
                  </Button>
                  {!allFractionsAnswered && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ぜんぶのこたえを入れてね！ / Fill in all answers!
                    </p>
                  )}
                  {fractionGraded && (
                    <Button variant="generate" size="lg" onClick={handleGenerateFractions} className="ml-4">
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Investigating Changes Tab */}
          <TabsContent value="investigating-changes" className="mt-0">
            {/* Topic Selection */}
            <div className="mb-6">
              <p className="font-bold mb-1 text-lg">もんだいのしゅるいをえらぼう：</p>
              <p className="text-sm text-muted-foreground mb-3">Choose a topic:</p>
              <div className="flex flex-wrap gap-3">
                {investigatingChangesTopicKeys.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedInvestigatingChangesTopic(t);
                      // Flush exercises when topic changes
                      setInvestigatingChangesQuestions([]);
                      setInvestigatingChangesAnswers([]);
                      setInvestigatingChangesGraded(false);
                      setInvestigatingChangesScore(0);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex flex-col items-center ${
                      selectedInvestigatingChangesTopic === t
                        ? 'bg-primary text-primary-foreground shadow-kid-lg scale-105'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{INVESTIGATING_CHANGES_TOPICS[t].icon} {INVESTIGATING_CHANGES_TOPICS[t].label}</span>
                    <span className={`text-xs mt-0.5 ${selectedInvestigatingChangesTopic === t ? 'text-primary-foreground/80' : 'text-muted-foreground/60'}`}>{INVESTIGATING_CHANGES_TOPICS[t].labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Info */}
            <div className="mb-6">
              <InvestigatingChangesExplanationCard info={INVESTIGATING_CHANGES_TOPICS[selectedInvestigatingChangesTopic]} />
            </div>

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateInvestigatingChanges} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Questions */}
            {investigatingChangesQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Questions */}
                <div className="space-y-4 mb-8">
                  {investigatingChangesQuestions.map((q, i) => (
                    <div key={q.id} id={`question-${i}`}>
                      <InvestigatingChangesQuestionItem
                        question={q}
                        index={i}
                        userAnswer={investigatingChangesAnswers[i]}
                        onAnswerChange={(v) => handleInvestigatingChangesAnswerChange(i, v)}
                        graded={investigatingChangesGraded}
                        isCorrect={investigatingChangesGraded ? (
                          selectedInvestigatingChangesTopic === 'completing-table'
                            ? parseInt(investigatingChangesAnswers[i]) === q.answer
                            : investigatingChangesAnswers[i] === q.answer
                        ) : undefined}
                      />
                    </div>
                  ))}
                </div>

                {/* Check Button */}
                <div className="text-center">
                  <Button
                    variant="check"
                    size="lg"
                    onClick={handleInvestigatingChangesCheck}
                    disabled={!allInvestigatingChangesAnswered || investigatingChangesGraded}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <div className="flex flex-col items-start leading-tight">
                      <span>こたえあわせ</span>
                      <span className="text-xs opacity-80">Check Answers</span>
                    </div>
                  </Button>
                  {!allInvestigatingChangesAnswered && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ぜんぶのこたえを入れてね！ / Fill in all answers!
                    </p>
                  )}
                  {investigatingChangesGraded && (
                    <Button variant="generate" size="lg" onClick={handleGenerateInvestigatingChanges} className="ml-4">
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

        </Tabs>
      </main>

      {/* Score Result Modal */}
      <ScoreResultModal
        isOpen={scoreModalOpen}
        onClose={() => setScoreModalOpen(false)}
        score={currentScore}
        totalQuestions={5}
        results={currentResults}
        onTryAgain={() => {
          setScoreModalOpen(false);
          // Call the appropriate try again function based on active tab
          switch (activeTab) {
            case 'geometry':
              handleGenerateGeometry();
              break;
            case 'ratios':
              handleGenerateRatios();
              break;
            case 'accuracy-rate':
              handleGenerateAccuracyRate();
              break;
            case 'large-numbers':
              handleGenerateLargeNumbers();
              break;
            case 'calculation-rules':
              handleGenerateCalculationRules();
              break;
            case 'division':
              handleGenerateDivision();
              break;
            case 'decimals':
              handleGenerateDecimals();
              break;
            case 'line-graphs':
              handleGenerateLineGraphs();
              break;
            case 'fractions':
              handleGenerateFractions();
              break;
            case 'investigating-changes':
              handleGenerateInvestigatingChanges();
              break;
          }
        }}
        onScrollToQuestion={(index) => {
          const element = document.getElementById(`question-${index}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
        tabName={currentTabName}
        topicName={currentTopicName}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        history={history}
        onClearHistory={() => {
          clearHistory();
          setHistory([]);
        }}
      />

      {/* Test Mode Modal */}
      <TestModeModal
        isOpen={testModeOpen}
        onClose={() => setTestModeOpen(false)}
        onStartGeneralTest={handleStartGeneralTest}
        onStartTabTest={handleStartTabTest}
        currentTabName={TAB_NAMES[activeTab]?.ja + ' / ' + TAB_NAMES[activeTab]?.en}
      />
    </div>
  );
};

export default Index;
