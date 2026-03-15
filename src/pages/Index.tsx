import { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, Compass, Circle, Shapes, Percent, Hash, Calculator, Divide, Dot, TrendingUp, History, Pizza } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExplanationCard from '@/components/ExplanationCard';
import QuestionItem from '@/components/QuestionItem';
import Protractor from '@/components/Protractor';
import ScoreResultModal from '@/components/ScoreResultModal';
import HistoryModal, { HistoryEntry } from '@/components/HistoryModal';
import HeaderBar from '@/components/HeaderBar';
import ChallengeModeSelector, { ChallengeModes } from '@/components/ChallengeModeSelector';
import ShopModal from '@/components/ShopModal';
import VocabularyModal from '@/components/VocabularyModal';
import MiniGameModal from '@/components/MiniGameModal';
import AdventureMap from '@/components/AdventureMap';
import DailyQuests from '@/components/DailyQuests';
import LearningInsights from '@/components/LearningInsights';
import EndOfSessionSummary from '@/components/EndOfSessionSummary';
import TeachMeModal from '@/components/TeachMeModal';
import ParticleManager, { celebrateCorrect, celebratePerfect, celebrateCoin, celebrateAchievement, celebrateLevelUp } from '@/components/ParticleEffects';
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
import { getGameData, saveGameData, getThemeColors, updateQuestProgress, recordMistake, getLearningInsights, completeChapter } from '@/lib/gameState';
import { StoryChapter, STORY_CHAPTERS, getChapterByRegionId, calculateChapterStars } from '@/lib/storyMode';
import { addAnsweredQuestions, isMiniGameAvailable, MiniGameProgress, getMiniGameProgress, skipMiniGame } from '@/lib/miniGames';
import { ChapterIntroModal, ChapterCompleteModal, DailyEpisodeModal, StoryProgressPanel } from '@/components/story';

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

  // Gamification state
  const [challengeModes, setChallengeModes] = useState<ChallengeModes>({
    speedMode: false,
    noHints: false,
  });
  const [hintsUsed, setHintsUsed] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  // Protractor state (shared across tabs)
  const [activeProtractor, setActiveProtractor] = useState<ProtractorType>(null);

  // Score modal state
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentResults, setCurrentResults] = useState<Array<{ index: number; isCorrect: boolean; userAnswer: string; correctAnswer: string | number }>>([]);
  const [currentTabName, setCurrentTabName] = useState('');
  const [currentTopicName, setCurrentTopicName] = useState('');

  // Helper to get current questions based on active tab (for solution modal)
  const getCurrentQuestions = () => {
    switch (activeTab) {
      case 'geometry':
        return geometryQuestions.map(q => ({
          text: q.text,
          textEn: q.textEn,
          answer: q.answer,
          unit: q.unit,
          explanation: q.explanation,
          explanationEn: q.explanationEn,
        }));
      case 'ratios':
        return ratioQuestions.map(q => ({
          text: q.text,
          textEn: q.textEn,
          answer: q.answer,
          unit: q.unit,
          explanation: q.explanation,
          explanationEn: q.explanationEn,
        }));
      case 'accuracy-rate':
        return accuracyRateQuestions.map(q => ({
          text: q.text,
          textEn: q.textEn,
          answer: q.answer,
          unit: q.unit,
          explanation: q.explanation,
          explanationEn: q.explanationEn,
        }));
      case 'large-numbers':
        return largeNumberQuestions.map(q => ({
          text: q.text,
          textEn: q.textEn,
          answer: q.answer,
          unit: q.unit,
          explanation: q.explanation,
          explanationEn: q.explanationEn,
        }));
      case 'calculation-rules':
        return calculationRulesQuestions.map(q => ({
          text: q.text,
          textEn: q.textEn,
          answer: q.answer,
          unit: q.unit,
          explanation: q.explanation,
          explanationEn: q.explanationEn,
        }));
      case 'division':
        return divisionQuestions.map(q => ({
          text: q.text,
          textEn: q.textEn,
          answer: q.answer,
          unit: q.unit,
          explanation: q.explanation,
          explanationEn: q.explanationEn,
        }));
      case 'decimals':
        return decimalQuestions.map(q => ({
          text: q.text,
          textEn: q.textEn,
          answer: q.answer,
          unit: q.unit,
          explanation: q.explanation,
          explanationEn: q.explanationEn,
        }));
      case 'line-graphs':
        return lineGraphQuestions.map(q => ({
          text: q.text,
          textEn: q.textEn,
          answer: q.answer,
          unit: q.unit,
          explanation: q.explanation,
          explanationEn: q.explanationEn,
        }));
      case 'fractions':
        return fractionQuestions.map(q => ({
          text: q.text,
          textEn: q.textEn,
          answer: q.answer,
          unit: q.unit,
          explanation: q.explanation,
          explanationEn: q.explanationEn,
        }));
      case 'investigating-changes':
        return investigatingChangesQuestions.map(q => ({
          text: q.text,
          textEn: q.textEn,
          answer: q.answer,
          unit: q.unit,
          explanation: q.explanation,
          explanationEn: q.explanationEn,
        }));
      default:
        return [];
    }
  };

  // History modal state
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [shopModalOpen, setShopModalOpen] = useState(false);
  const [questsModalOpen, setQuestsModalOpen] = useState(false);
  const [insightsModalOpen, setInsightsModalOpen] = useState(false);
  const [vocabularyModalOpen, setVocabularyModalOpen] = useState(false);
  const [miniGameModalOpen, setMiniGameModalOpen] = useState(false);
  const [unacknowledgedInsights, setUnacknowledgedInsights] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showMiniGameUnlock, setShowMiniGameUnlock] = useState(false);
  const [miniGameProgress, setMiniGameProgress] = useState<MiniGameProgress>(getMiniGameProgress());

  // End-of-session summary state
  const [sessionSummaryOpen, setSessionSummaryOpen] = useState(false);
  const [sessionCoinsEarned, setSessionCoinsEarned] = useState(0);
  const [sessionTopicKey, setSessionTopicKey] = useState('');
  const [sessionTopicName, setSessionTopicName] = useState('');

  // Teach Me modal state
  const [teachMeOpen, setTeachMeOpen] = useState(false);
  const [teachMeQuestion, setTeachMeQuestion] = useState<any>(null);
  const [teachMeUserAnswer, setTeachMeUserAnswer] = useState('');
  const [teachMeQuestionIndex, setTeachMeQuestionIndex] = useState(0);

  // Theme state
  const [currentTheme, setCurrentTheme] = useState('default');

  // Adventure map state
  const [showAdventureMap, setShowAdventureMap] = useState(true);

  // Story mode state
  const [chapterIntroOpen, setChapterIntroOpen] = useState(false);
  const [chapterCompleteOpen, setChapterCompleteOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<StoryChapter | null>(null);
  const [chapterStars, setChapterStars] = useState(0);
  const [chapterCorrectCount, setChapterCorrectCount] = useState(0);
  const [chapterTotalQuestions, setChapterTotalQuestions] = useState(0);
  const [showStoryPanel, setShowStoryPanel] = useState(false);
  const [dailyEpisodeModalOpen, setDailyEpisodeModalOpen] = useState(false);
  const [isDailyEpisodeActive, setIsDailyEpisodeActive] = useState(false);
  const [dailyEpisodeTopics, setDailyEpisodeTopics] = useState<string[]>([]);

  // Game data for particle settings
  const [gameData, setGameData] = useState(getGameData());

  // Load unacknowledged insights count
  useEffect(() => {
    const insights = getLearningInsights();
    setUnacknowledgedInsights(insights.length);
  }, [insightsModalOpen]);

  // Refs for scrolling to questions
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Load history and theme on mount
  useEffect(() => {
    setHistory(getHistory());
    const data = getGameData();
    setGameData(data);
    setCurrentTheme(data.settings.theme);
  }, []);

  // Auto-save state to localStorage every 3 seconds
  const saveCurrentState = useCallback(() => {
    const stateToSave = {
      timestamp: Date.now(),
      activeTab,
      // Geometry
      selectedTopic,
      geometryQuestions,
      geometryAnswers,
      geometryGraded,
      // Ratios
      selectedRatioTopic,
      ratioQuestions,
      ratioAnswers,
      ratioGraded,
      // Accuracy Rate
      selectedAccuracyRateTopic,
      accuracyRateQuestions,
      accuracyRateAnswers,
      accuracyRateGraded,
      // Large Numbers
      selectedLargeNumberTopic,
      largeNumberQuestions,
      largeNumberAnswers,
      largeNumberGraded,
      // Calculation Rules
      selectedCalculationRulesTopic,
      calculationRulesQuestions,
      calculationRulesAnswers,
      calculationRulesGraded,
      calculationRulesStepAnswers,
      // Division
      selectedDivisionTopic,
      divisionQuestions,
      divisionAnswers,
      divisionGraded,
      divisionStepAnswers,
      // Decimals
      selectedDecimalTopic,
      decimalQuestions,
      decimalAnswers,
      decimalGraded,
      // Line Graphs
      selectedLineGraphTopic,
      lineGraphQuestions,
      lineGraphAnswers,
      lineGraphGraded,
      // Fractions
      selectedFractionTopic,
      fractionQuestions,
      fractionAnswers,
      fractionGraded,
      fractionNumeratorAnswers,
      fractionDenominatorAnswers,
      fractionWholeNumberAnswers,
      // Investigating Changes
      selectedInvestigatingChangesTopic,
      investigatingChangesQuestions,
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
    selectedTopic, geometryQuestions, geometryAnswers, geometryGraded,
    selectedRatioTopic, ratioQuestions, ratioAnswers, ratioGraded,
    selectedAccuracyRateTopic, accuracyRateQuestions, accuracyRateAnswers, accuracyRateGraded,
    selectedLargeNumberTopic, largeNumberQuestions, largeNumberAnswers, largeNumberGraded,
    selectedCalculationRulesTopic, calculationRulesQuestions, calculationRulesAnswers, calculationRulesGraded, calculationRulesStepAnswers,
    selectedDivisionTopic, divisionQuestions, divisionAnswers, divisionGraded, divisionStepAnswers,
    selectedDecimalTopic, decimalQuestions, decimalAnswers, decimalGraded,
    selectedLineGraphTopic, lineGraphQuestions, lineGraphAnswers, lineGraphGraded,
    selectedFractionTopic, fractionQuestions, fractionAnswers, fractionGraded, fractionNumeratorAnswers, fractionDenominatorAnswers, fractionWholeNumberAnswers,
    selectedInvestigatingChangesTopic, investigatingChangesQuestions, investigatingChangesAnswers, investigatingChangesGraded,
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
    const restoreState = () => {
    try {
      const saved = localStorage.getItem('zukei-yari-session-state');
        if (!saved) {
          console.log('No saved state found');
          return;
        }

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

      // Restore questions (so exercises are preserved)
      if (state.geometryQuestions) setGeometryQuestions(state.geometryQuestions);
      if (state.ratioQuestions) setRatioQuestions(state.ratioQuestions);
      if (state.accuracyRateQuestions) setAccuracyRateQuestions(state.accuracyRateQuestions);
      if (state.largeNumberQuestions) setLargeNumberQuestions(state.largeNumberQuestions);
      if (state.calculationRulesQuestions) setCalculationRulesQuestions(state.calculationRulesQuestions);
      if (state.divisionQuestions) setDivisionQuestions(state.divisionQuestions);
      if (state.decimalQuestions) setDecimalQuestions(state.decimalQuestions);
      if (state.lineGraphQuestions) setLineGraphQuestions(state.lineGraphQuestions);
      if (state.fractionQuestions) setFractionQuestions(state.fractionQuestions);
      if (state.investigatingChangesQuestions) setInvestigatingChangesQuestions(state.investigatingChangesQuestions);

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
    };

    // Restore on mount
    restoreState();

    // Also restore when window gains focus (user returns to page)
    const handleFocus = () => {
      restoreState();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
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
    // Check if there's a story chapter for this region
    const chapter = getChapterByRegionId(regionId);
    if (chapter) {
      setCurrentChapter(chapter);
      setChapterIntroOpen(true);
    }
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
    setShowAdventureMap(false);
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
    setHintsUsed(0);
    setSessionStartTime(Date.now());
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

    // Update current score for summary
    setCurrentScore(correct);

    // Calculate coins earned
    const baseCoins = correct * 5;
    const perfectBonus = correct === 5 ? 25 : 0;
    const noHintBonus = hintsUsed === 0 ? 10 : 0;
    const speedBonus =
      sessionStartTime && Date.now() - sessionStartTime < 120000 ? 10 : 0;
    const totalCoins = baseCoins + perfectBonus + noHintBonus + speedBonus;

    // Update coins in game data
    const data = getGameData();
    data.player.coins += totalCoins;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));

    // Show end-of-session summary
    setSessionCoinsEarned(totalCoins);
    setSessionTopicKey(selectedTopic);
    setSessionTopicName(TOPICS[selectedTopic].label);
    setScoreModalOpen(true);

    // Trigger particle effects for perfect score
    if (correct === 5) {
      celebratePerfect();
      updateQuestProgress('perfect-score');
    }

    // Update quest progress
    updateQuestProgress('answer-questions', 5);
    updateQuestProgress('answer-correct', correct);

    // Check for mini-game unlock (every 20 questions)
    const { shouldUnlock, newTotal } = addAnsweredQuestions(5);
    if (shouldUnlock) {
      setShowMiniGameUnlock(true);
      // Update mini-game progress state
      setMiniGameProgress(getMiniGameProgress());
    }

    // Record mistakes for incorrect answers
    results.forEach((result) => {
      if (!result.isCorrect) {
        recordMistake(
          selectedTopic,
          'geometry',
          result.userAnswer.toString(),
          result.correctAnswer.toString()
        );
      }
    });

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
    setHintsUsed(0);
    setSessionStartTime(Date.now());
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

    // Update current score for summary
    setCurrentScore(correct);

    // Calculate coins earned
    const baseCoins = correct * 5;
    const perfectBonus = correct === 5 ? 25 : 0;
    const noHintBonus = hintsUsed === 0 ? 10 : 0;
    const speedBonus =
      sessionStartTime && Date.now() - sessionStartTime < 120000 ? 10 : 0;
    const totalCoins = baseCoins + perfectBonus + noHintBonus + speedBonus;

    // Update coins in game data
    const data = getGameData();
    data.player.coins += totalCoins;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));

    // Show end-of-session summary
    setSessionCoinsEarned(totalCoins);
    setSessionTopicKey(selectedRatioTopic);
    setSessionTopicName(RATIO_TOPICS[selectedRatioTopic].label);
    setScoreModalOpen(true);

    // Trigger particle effects for perfect score
    if (correct === 5) {
      celebratePerfect();
      updateQuestProgress('perfect-score');
    }

    // Update quest progress
    updateQuestProgress('answer-questions', 5);
    updateQuestProgress('answer-correct', correct);

    // Record mistakes for incorrect answers
    results.forEach((result) => {
      if (!result.isCorrect) {
        recordMistake(
          selectedRatioTopic,
          'ratios',
          result.userAnswer.toString(),
          result.correctAnswer.toString()
        );
      }
    });

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
    setHintsUsed(0);
    setSessionStartTime(Date.now());
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

    // Update current score for summary
    setCurrentScore(correct);

    // Calculate coins earned
    const baseCoins = correct * 5;
    const perfectBonus = correct === 5 ? 25 : 0;
    const noHintBonus = hintsUsed === 0 ? 10 : 0;
    const speedBonus =
      sessionStartTime && Date.now() - sessionStartTime < 120000 ? 10 : 0;
    const totalCoins = baseCoins + perfectBonus + noHintBonus + speedBonus;

    // Update coins in game data
    const data = getGameData();
    data.player.coins += totalCoins;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));

    // Show end-of-session summary
    setSessionCoinsEarned(totalCoins);
    setSessionTopicKey(selectedAccuracyRateTopic);
    setSessionTopicName(ACCURACY_RATE_TOPICS[selectedAccuracyRateTopic].label);
    setScoreModalOpen(true);

    // Trigger particle effects for perfect score
    if (correct === 5) {
      celebratePerfect();
      updateQuestProgress('perfect-score');
    }

    // Update quest progress
    updateQuestProgress('answer-questions', 5);
    updateQuestProgress('answer-correct', correct);

    // Record mistakes for incorrect answers
    results.forEach((result) => {
      if (!result.isCorrect) {
        recordMistake(
          selectedAccuracyRateTopic,
          'accuracy-rate',
          result.userAnswer.toString(),
          result.correctAnswer.toString()
        );
      }
    });

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
    setHintsUsed(0);
    setSessionStartTime(Date.now());
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

    // Update current score for summary
    setCurrentScore(correct);

    // Calculate coins earned
    const baseCoins = correct * 5;
    const perfectBonus = correct === 5 ? 25 : 0;
    const noHintBonus = hintsUsed === 0 ? 10 : 0;
    const speedBonus =
      sessionStartTime && Date.now() - sessionStartTime < 120000 ? 10 : 0;
    const totalCoins = baseCoins + perfectBonus + noHintBonus + speedBonus;

    // Update coins in game data
    const data = getGameData();
    data.player.coins += totalCoins;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));

    // Show end-of-session summary
    setSessionCoinsEarned(totalCoins);
    setSessionTopicKey(selectedLargeNumberTopic);
    setSessionTopicName(LARGE_NUMBER_TOPICS[selectedLargeNumberTopic].label);
    setScoreModalOpen(true);

    // Trigger particle effects for perfect score
    if (correct === 5) {
      celebratePerfect();
      updateQuestProgress('perfect-score');
    }

    // Update quest progress
    updateQuestProgress('answer-questions', 5);
    updateQuestProgress('answer-correct', correct);

    // Record mistakes for incorrect answers
    results.forEach((result) => {
      if (!result.isCorrect) {
        recordMistake(
          selectedLargeNumberTopic,
          'large-numbers',
          result.userAnswer.toString(),
          result.correctAnswer.toString()
        );
      }
    });

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
    setHintsUsed(0);
    setSessionStartTime(Date.now());
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

    // Update current score for summary
    setCurrentScore(correct);

    // Calculate coins earned
    const baseCoins = correct * 5;
    const perfectBonus = correct === 5 ? 25 : 0;
    const noHintBonus = hintsUsed === 0 ? 10 : 0;
    const speedBonus =
      sessionStartTime && Date.now() - sessionStartTime < 120000 ? 10 : 0;
    const totalCoins = baseCoins + perfectBonus + noHintBonus + speedBonus;

    // Update coins in game data
    const data = getGameData();
    data.player.coins += totalCoins;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));

    // Show end-of-session summary
    setSessionCoinsEarned(totalCoins);
    setSessionTopicKey(selectedCalculationRulesTopic);
    setSessionTopicName(CALCULATION_RULES_TOPICS[selectedCalculationRulesTopic].label);
    setScoreModalOpen(true);

    // Record mistakes for incorrect answers
    results.forEach((result) => {
      if (!result.isCorrect) {
        recordMistake(
          selectedCalculationRulesTopic,
          'calculation-rules',
          result.userAnswer.toString(),
          result.correctAnswer.toString()
        );
      }
    });

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
    setHintsUsed(0);
    setSessionStartTime(Date.now());
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

    // Update current score for summary
    setCurrentScore(correct);

    // Calculate coins earned
    const baseCoins = correct * 5;
    const perfectBonus = correct === 5 ? 25 : 0;
    const noHintBonus = hintsUsed === 0 ? 10 : 0;
    const speedBonus =
      sessionStartTime && Date.now() - sessionStartTime < 120000 ? 10 : 0;
    const totalCoins = baseCoins + perfectBonus + noHintBonus + speedBonus;

    // Update coins in game data
    const data = getGameData();
    data.player.coins += totalCoins;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));

    // Show end-of-session summary
    setSessionCoinsEarned(totalCoins);
    setSessionTopicKey(selectedDivisionTopic);
    setSessionTopicName(DIVISION_TOPICS[selectedDivisionTopic].label);
    setScoreModalOpen(true);

    // Record mistakes for incorrect answers
    results.forEach((result) => {
      if (!result.isCorrect) {
        recordMistake(
          selectedDivisionTopic,
          'division',
          result.userAnswer.toString(),
          result.correctAnswer.toString()
        );
      }
    });

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
    setHintsUsed(0);
    setSessionStartTime(Date.now());
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

    // Update current score for summary
    setCurrentScore(correct);

    // Calculate coins earned
    const baseCoins = correct * 5;
    const perfectBonus = correct === 5 ? 25 : 0;
    const noHintBonus = hintsUsed === 0 ? 10 : 0;
    const speedBonus =
      sessionStartTime && Date.now() - sessionStartTime < 120000 ? 10 : 0;
    const totalCoins = baseCoins + perfectBonus + noHintBonus + speedBonus;

    // Update coins in game data
    const data = getGameData();
    data.player.coins += totalCoins;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));

    // Show end-of-session summary
    setSessionCoinsEarned(totalCoins);
    setSessionTopicKey(selectedDecimalTopic);
    setSessionTopicName(DECIMAL_TOPICS[selectedDecimalTopic].label);
    setScoreModalOpen(true);

    // Record mistakes for incorrect answers
    results.forEach((result) => {
      if (!result.isCorrect) {
        recordMistake(
          selectedDecimalTopic,
          'decimals',
          result.userAnswer.toString(),
          result.correctAnswer.toString()
        );
      }
    });

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
    setHintsUsed(0);
    setSessionStartTime(Date.now());
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

    // Update current score for summary
    setCurrentScore(correct);

    // Calculate coins earned
    const baseCoins = correct * 5;
    const perfectBonus = correct === 5 ? 25 : 0;
    const noHintBonus = hintsUsed === 0 ? 10 : 0;
    const speedBonus =
      sessionStartTime && Date.now() - sessionStartTime < 120000 ? 10 : 0;
    const totalCoins = baseCoins + perfectBonus + noHintBonus + speedBonus;

    // Update coins in game data
    const data = getGameData();
    data.player.coins += totalCoins;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));

    // Show end-of-session summary
    setSessionCoinsEarned(totalCoins);
    setSessionTopicKey(selectedLineGraphTopic);
    setSessionTopicName(LINE_GRAPH_TOPICS[selectedLineGraphTopic].label);
    setScoreModalOpen(true);

    // Record mistakes for incorrect answers
    results.forEach((result) => {
      if (!result.isCorrect) {
        recordMistake(
          selectedLineGraphTopic,
          'line-graphs',
          result.userAnswer.toString(),
          result.correctAnswer.toString()
        );
      }
    });

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
    setHintsUsed(0);
    setSessionStartTime(Date.now());
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

    // Update current score for summary
    setCurrentScore(correct);

    // Calculate coins earned
    const baseCoins = correct * 5;
    const perfectBonus = correct === 5 ? 25 : 0;
    const noHintBonus = hintsUsed === 0 ? 10 : 0;
    const speedBonus =
      sessionStartTime && Date.now() - sessionStartTime < 120000 ? 10 : 0;
    const totalCoins = baseCoins + perfectBonus + noHintBonus + speedBonus;

    // Update coins in game data
    const data = getGameData();
    data.player.coins += totalCoins;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));

    // Show end-of-session summary
    setSessionCoinsEarned(totalCoins);
    setSessionTopicKey(selectedFractionTopic);
    setSessionTopicName(FRACTION_TOPICS[selectedFractionTopic].label);
    setScoreModalOpen(true);

    // Record mistakes for incorrect answers
    results.forEach((result) => {
      if (!result.isCorrect) {
        recordMistake(
          selectedFractionTopic,
          'fractions',
          result.userAnswer.toString(),
          result.correctAnswer.toString()
        );
      }
    });

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
    setHintsUsed(0);
    setSessionStartTime(Date.now());
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

    // Update current score for summary
    setCurrentScore(correct);

    // Calculate coins earned
    const baseCoins = correct * 5;
    const perfectBonus = correct === 5 ? 25 : 0;
    const noHintBonus = hintsUsed === 0 ? 10 : 0;
    const speedBonus =
      sessionStartTime && Date.now() - sessionStartTime < 120000 ? 10 : 0;
    const totalCoins = baseCoins + perfectBonus + noHintBonus + speedBonus;

    // Update coins in game data
    const data = getGameData();
    data.player.coins += totalCoins;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));

    // Show end-of-session summary
    setSessionCoinsEarned(totalCoins);
    setSessionTopicKey(selectedInvestigatingChangesTopic);
    setSessionTopicName(INVESTIGATING_CHANGES_TOPICS[selectedInvestigatingChangesTopic].label);
    setScoreModalOpen(true);

    // Record mistakes for incorrect answers
    results.forEach((result) => {
      if (!result.isCorrect) {
        recordMistake(
          selectedInvestigatingChangesTopic,
          'investigating-changes',
          result.userAnswer.toString(),
          result.correctAnswer.toString()
        );
      }
    });

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

  const themeColors = getThemeColors(currentTheme);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.text,
      }}
      data-theme={currentTheme}
    >
      {/* Header */}
      <header
        className="border-b shadow-kid transition-colors duration-300"
        style={{
          backgroundColor: themeColors.card,
          borderColor: currentTheme === 'default' ? '' : themeColors.primary + '30',
        }}
      >
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

      {/* Header Bar with Gamification Stats */}
      <div className="container max-w-3xl mx-auto px-4 pt-4">
        <HeaderBar
          onOpenShop={() => setShopModalOpen(true)}
          onOpenQuests={() => setQuestsModalOpen(true)}
          onOpenInsights={() => setInsightsModalOpen(true)}
          onOpenStoryMode={() => setShowStoryPanel(true)}
          onOpenVocabulary={() => setVocabularyModalOpen(true)}
          onOpenMiniGames={() => setMiniGameModalOpen(true)}
          unacknowledgedInsights={unacknowledgedInsights}
        />
      </div>

      {/* Mini Game Unlock Notification */}
      {showMiniGameUnlock && (
        <div className="container max-w-3xl mx-auto px-4 mt-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 animate-in slide-in-from-top-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🎮</span>
              <div className="flex-1">
                <h3 className="font-bold text-purple-800">
                  ミニゲームがひらけた！
                </h3>
                <p className="text-sm text-purple-600">
                  Mini-games unlocked! Take a break and play!
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    skipMiniGame();
                    setShowMiniGameUnlock(false);
                  }}
                >
                  スキップ / Skip
                </Button>
                <Button
                  onClick={() => setMiniGameModalOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  あそぶ / Play
                </Button>
                <button
                  onClick={() => setShowMiniGameUnlock(false)}
                  className="p-1 hover:bg-purple-100 rounded-full"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Adventure Map */}
      {showAdventureMap && (
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-black text-foreground mb-1">
              🗺️ 冒険の地図 / Adventure Map
            </h2>
            <p className="text-muted-foreground text-sm">
              エリアを選んで冒険を始めよう！/ Choose an area to start your adventure!
            </p>
          </div>
          <AdventureMap
            onSelectRegion={handleRegionSelect}
            activeTab={activeTab}
            onOpenStoryMode={() => setShowStoryPanel(true)}
          />
        </div>
      )}

      {/* Main Content with Tabs */}
      <main className="container max-w-3xl mx-auto px-4 py-8">
        {!showAdventureMap && (
          <button
            onClick={() => setShowAdventureMap(true)}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl font-medium transition-colors"
          >
            <span>🗺️</span>
            <span>冒険の地図に戻る / Back to Map</span>
          </button>
        )}

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {!showAdventureMap && (
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
          )}

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
                      // Update quest progress
                      updateQuestProgress('try-topic');
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

            {/* Challenge Modes */}
            <ChallengeModeSelector
              modes={challengeModes}
              onChange={setChallengeModes}
              disabled={geometryQuestions.length > 0}
            />

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
                          onTeachMe={() => handleTeachMe(q, geometryAnswers[i], i)}
                        />
                      ) : (
                        <QuestionItem
                          question={q}
                          index={i}
                          userAnswer={geometryAnswers[i]}
                          onAnswerChange={(v) => handleGeometryAnswerChange(i, v)}
                          graded={geometryGraded}
                          isCorrect={geometryGraded ? parseInt(geometryAnswers[i]) === q.answer : undefined}
                          onTeachMe={() => handleTeachMe(q, geometryAnswers[i], i)}
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
                        noHintsMode={challengeModes.noHints}
                        onHintUsed={() => setHintsUsed(prev => prev + 1)}
                        onTeachMe={() => handleTeachMe(q, ratioAnswers[i], i)}
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
                        onTeachMe={() => handleTeachMe(q, accuracyRateAnswers[i], i)}
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
                        onTeachMe={() => handleTeachMe(q, calculationRulesAnswers[i], i)}
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
                        onTeachMe={() => handleTeachMe(q, divisionAnswers[i], i)}
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
                        onTeachMe={() => handleTeachMe(q, decimalAnswers[i], i)}
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
                        onTeachMe={() => handleTeachMe(q, largeNumberAnswers[i], i)}
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
                        onTeachMe={() => handleTeachMe(q, lineGraphAnswers[i], i)}
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
                        onTeachMe={() => handleTeachMe(q, fractionAnswers[i], i)}
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
                        onTeachMe={() => handleTeachMe(q, investigatingChangesAnswers[i], i)}
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
        questions={getCurrentQuestions()}
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
        onContinue={() => {
          setScoreModalOpen(false);
          // Check if we're completing a chapter
          if (currentChapter && !chapterCompleteOpen) {
            const correctCount = currentResults.filter(r => r.isCorrect).length;
            const total = currentResults.length;
            const stars = calculateChapterStars(correctCount, total);
            setChapterStars(stars);
            setChapterCorrectCount(correctCount);
            setChapterTotalQuestions(total);
            setChapterCompleteOpen(true);
          } else if (isDailyEpisodeActive) {
            // Complete daily episode
            // (logic handled separately)
            setSessionSummaryOpen(true);
          } else {
            setSessionSummaryOpen(true);
          }
        }}
        tabName={currentTabName}
        topicName={currentTopicName}
        topicId={`${activeTab}-${activeTab === 'geometry' ? selectedTopic : activeTab === 'ratios' ? selectedRatioTopic : activeTab === 'accuracy-rate' ? selectedAccuracyRateTopic : activeTab === 'large-numbers' ? selectedLargeNumberTopic : activeTab === 'calculation-rules' ? selectedCalculationRulesTopic : activeTab === 'division' ? selectedDivisionTopic : activeTab === 'decimals' ? selectedDecimalTopic : activeTab === 'line-graphs' ? selectedLineGraphTopic : activeTab === 'fractions' ? selectedFractionTopic : selectedInvestigatingChangesTopic}`}
        hintsUsed={hintsUsed}
        challengeModes={challengeModes}
        timeSpentSeconds={sessionStartTime ? Math.floor((Date.now() - sessionStartTime) / 1000) : 0}
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

      {/* Shop Modal */}
      <ShopModal
        isOpen={shopModalOpen}
        onClose={() => setShopModalOpen(false)}
      />

      {/* Vocabulary Modal */}
      <VocabularyModal
        isOpen={vocabularyModalOpen}
        onClose={() => setVocabularyModalOpen(false)}
      />

      {/* Mini Game Modal */}
      <MiniGameModal
        isOpen={miniGameModalOpen}
        onClose={() => {
          setMiniGameModalOpen(false);
          setShowMiniGameUnlock(false);
        }}
        onCoinsEarned={(coins) => {
          const data = getGameData();
          data.player.coins += coins;
          saveGameData(data);
          window.dispatchEvent(new CustomEvent('coins-changed'));
        }}
      />

      {/* Daily Quests Modal */}
      <DailyQuests
        isOpen={questsModalOpen}
        onClose={() => setQuestsModalOpen(false)}
      />

      {/* Learning Insights Modal */}
      <LearningInsights
        isOpen={insightsModalOpen}
        onClose={() => setInsightsModalOpen(false)}
        currentTopic={selectedTopic}
      />

      {/* End of Session Summary */}
      <EndOfSessionSummary
        isOpen={sessionSummaryOpen}
        onClose={() => setSessionSummaryOpen(false)}
        onPracticeMore={() => {
          setSessionSummaryOpen(false);
          // Regenerate questions for the same topic
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
        onBackToMap={() => {
          setSessionSummaryOpen(false);
          setShowAdventureMap(true);
        }}
        score={currentScore}
        totalQuestions={5}
        timeSpent={
          sessionStartTime ? Math.floor((Date.now() - sessionStartTime) / 1000) : 0
        }
        coinsEarned={sessionCoinsEarned}
        topic={sessionTopicKey}
        topicName={sessionTopicName}
      />

      {/* Teach Me Modal */}
      <TeachMeModal
        isOpen={teachMeOpen}
        onClose={() => setTeachMeOpen(false)}
        onTrySimilar={() => {
          setTeachMeOpen(false);
          // Could regenerate similar question here in future
        }}
        onContinue={() => setTeachMeOpen(false)}
        question={
          teachMeQuestion
            ? {
                text: teachMeQuestion.text || '',
                textEn: teachMeQuestion.textEn || '',
                answer: teachMeQuestion.answer || '',
              }
            : { text: '', textEn: '', answer: '' }
        }
        userAnswer={teachMeUserAnswer}
        topic={selectedTopic}
        questionType={activeTab}
      />

      {/* Chapter Intro Modal */}
      <ChapterIntroModal
        isOpen={chapterIntroOpen}
        onClose={() => setChapterIntroOpen(false)}
        onStart={() => {
          setChapterIntroOpen(false);
          // Questions will be generated automatically by the tab's useEffect
        }}
        chapter={currentChapter}
      />

      {/* Chapter Complete Modal */}
      <ChapterCompleteModal
        isOpen={chapterCompleteOpen}
        onClose={() => {
          setChapterCompleteOpen(false);
          setCurrentChapter(null);
        }}
        onContinue={() => {
          setChapterCompleteOpen(false);
          // Complete the chapter and award coins
          if (currentChapter) {
            completeChapter(currentChapter.id, chapterStars, currentChapter.completion.rewardCoins);
          }
          setCurrentChapter(null);
          setShowAdventureMap(true);
        }}
        onRetry={() => {
          setChapterCompleteOpen(false);
          // Retry the same chapter
          // Questions will be regenerated
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
        chapter={currentChapter}
        stars={chapterStars}
        correctCount={chapterCorrectCount}
        totalQuestions={chapterTotalQuestions}
      />

      {/* Daily Episode Modal */}
      <DailyEpisodeModal
        isOpen={dailyEpisodeModalOpen}
        onClose={() => setDailyEpisodeModalOpen(false)}
        onStart={() => {
          setDailyEpisodeModalOpen(false);
          setIsDailyEpisodeActive(true);
          // Start the daily episode with selected topics
          if (dailyEpisodeTopics.length > 0) {
            handleTabChange(dailyEpisodeTopics[0]);
          }
        }}
        episode={null} // Will be populated from gameState
        isCompleted={false}
      />

      {/* Story Progress Panel */}
      {showStoryPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full max-h-[90vh] overflow-auto">
            <StoryProgressPanel
              chapters={STORY_CHAPTERS}
              progress={gameData?.storyProgress || { completedChapters: [], chapterStars: {}, currentChapterId: null, sideQuestsCompleted: [], dailyEpisodesCompleted: [], totalStoryCoins: 0 }}
              onSelectChapter={(chapter) => {
                setCurrentChapter(chapter);
                setChapterIntroOpen(true);
                setShowStoryPanel(false);
                // Navigate to the region
                const regionToTabs: { [key: string]: string } = {
                  'number-castle': 'large-numbers',
                  'geometry-mountains': 'geometry',
                  'ratio-ocean': 'division',
                  'decimal-forest': 'decimals',
                  'fraction-volcano': 'fractions',
                  'graph-island': 'line-graphs',
                  'accuracy-peaks': 'accuracy-rate',
                };
                const tabId = regionToTabs[chapter.regionId];
                if (tabId) {
                  handleTabChange(tabId);
                }
              }}
            />
            <button
              onClick={() => setShowStoryPanel(false)}
              className="w-full mt-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-bold text-gray-700"
            >
              閉じる / Close
            </button>
          </div>
        </div>
      )}

      {/* Particle Effects Manager */}
      <ParticleManager enabled={gameData?.settings?.animationsEnabled ?? true} />
    </div>
  );
};

export default Index;
