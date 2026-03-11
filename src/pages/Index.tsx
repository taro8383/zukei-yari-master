import { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, Trophy, Compass, Circle, Shapes, Percent, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExplanationCard from '@/components/ExplanationCard';
import QuestionItem from '@/components/QuestionItem';
import Protractor from '@/components/Protractor';
import { Topic, TOPICS, Question, generateQuestions } from '@/lib/geometry';
import { RatioQuestion, RatioTopic, RATIO_TOPICS, generateRatioQuestions, AccuracyRateQuestion, AccuracyRateTopic, ACCURACY_RATE_TOPICS, generateAccuracyRateQuestions } from '@/lib/ratios';
import { LargeNumberQuestion, LargeNumberTopic, LARGE_NUMBER_TOPICS, generateLargeNumberQuestions } from '@/lib/largeNumbers';
import { RatioExplanationCard, RatioQuestionItem, AccuracyRateQuestionItem, AccuracyRateExplanationCard } from '@/components/ratios';
import { LargeNumbersExplanationCard, LargeNumbersQuestionItem } from '@/components/largeNumbers';

const topicKeys: Topic[] = ['angles', 'area', 'lines', 'intersecting', 'quadrilaterals', 'diagonals'];
const ratioTopicKeys: RatioTopic[] = ['finding-ratio', 'finding-compared', 'finding-base'];
const accuracyRateTopicKeys: AccuracyRateTopic[] = ['decimal-ratio', 'convert-percent', 'calculate-accuracy'];
const largeNumberTopicKeys: LargeNumberTopic[] = ['reading-oku-cho', 'rounding-off', 'rounding-up-down'];

type ProtractorType = '180' | '360' | null;
type AppTab = 'geometry' | 'ratios' | 'accuracy-rate' | 'large-numbers';

const Index = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<AppTab>('geometry');

  // Geometry state
  const [selectedTopic, setSelectedTopic] = useState<Topic>('angles');
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

  // Protractor state (shared across tabs)
  const [activeProtractor, setActiveProtractor] = useState<ProtractorType>(null);

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
    geometryQuestions.forEach((q, i) => {
      if (parseInt(geometryAnswers[i]) === q.answer) correct++;
    });
    setGeometryScore(correct);
    setGeometryGraded(true);
  };

  // Ratios handlers
  const handleGenerateRatios = () => {
    const newQuestions = generateRatioQuestions(selectedRatioTopic);
    setRatioQuestions(newQuestions);
    setRatioAnswers(new Array(5).fill(''));
    setRatioGraded(false);
    setRatioScore(0);
  };

  const handleRatioAnswerChange = (index: number, value: string) => {
    const newAnswers = [...ratioAnswers];
    newAnswers[index] = value;
    setRatioAnswers(newAnswers);
  };

  const allRatiosAnswered = ratioAnswers.length === 5 && ratioAnswers.every((a) => a.trim() !== '');

  const handleRatioCheck = () => {
    let correct = 0;
    ratioQuestions.forEach((q, i) => {
      // Compare the numeric answer directly
      const userNum = parseFloat(ratioAnswers[i]);
      if (userNum === q.answer) correct++;
    });
    setRatioScore(correct);
    setRatioGraded(true);
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
    accuracyRateQuestions.forEach((q, i) => {
      // Compare based on topic type
      const userNum = parseFloat(accuracyRateAnswers[i]);
      if (q.topic === 'decimal-ratio') {
        // For decimal ratio, compare with tolerance for floating point
        if (Math.abs(userNum - q.answer) < 0.01) correct++;
      } else {
        // For percentage topics, exact match
        if (userNum === q.answer) correct++;
      }
    });
    setAccuracyRateScore(correct);
    setAccuracyRateGraded(true);
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
    largeNumberQuestions.forEach((q, i) => {
      if (q.topic === 'reading-oku-cho') {
        // For kanji input, compare strings directly (case insensitive)
        if (largeNumberAnswers[i].trim() === (q.answer as string)) correct++;
      } else {
        // For number answers, parse and compare
        const userNum = parseInt(largeNumberAnswers[i]);
        if (userNum === q.answer) correct++;
      }
    });
    setLargeNumberScore(correct);
    setLargeNumberGraded(true);
  };

  const geometryScorePercent = geometryScore * 20;
  const ratioScorePercent = ratioScore * 20;
  const accuracyRateScorePercent = accuracyRateScore * 20;
  const largeNumberScorePercent = largeNumberScore * 20;

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
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setActiveProtractor(activeProtractor === '180' ? null : '180')}
                title="分度器 (180°) / Protractor"
                className={activeProtractor === '180' ? 'border-primary text-primary' : ''}
              >
                <Compass className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setActiveProtractor(activeProtractor === '360' ? null : '360')}
                title="分度器 (360°) / Full Protractor"
                className={activeProtractor === '360' ? 'border-primary text-primary' : ''}
              >
                <Circle className="w-5 h-5" />
              </Button>
            </div>
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

      {/* Floating Protractor Toolbar */}
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

      {/* Main Content with Tabs */}
      <main className="container max-w-3xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-8 h-auto p-1.5 bg-muted rounded-2xl">
            <TabsTrigger
              value="geometry"
              className="flex items-center gap-2 py-4 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <Shapes className="w-5 h-5" />
              <div className="flex flex-col items-center">
                <span>図形</span>
                <span className="text-xs font-normal opacity-60">Geometry</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="ratios"
              className="flex items-center gap-2 py-4 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <Percent className="w-5 h-5" />
              <div className="flex flex-col items-center">
                <span>割合</span>
                <span className="text-xs font-normal opacity-60">Ratios</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="accuracy-rate"
              className="flex items-center gap-2 py-4 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <span className="text-xl">🔋</span>
              <div className="flex flex-col items-center">
                <span>正答率</span>
                <span className="text-xs font-normal opacity-60">Accuracy</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="large-numbers"
              className="flex items-center gap-2 py-4 text-base font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-kid"
            >
              <Hash className="w-5 h-5" />
              <div className="flex flex-col items-center">
                <span>大きな数</span>
                <span className="text-xs font-normal opacity-60">Big Numbers</span>
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
                    onClick={() => setSelectedTopic(t)}
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
              <ExplanationCard info={TOPICS[selectedTopic]} />
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
                    <QuestionItem
                      key={q.id}
                      question={q}
                      index={i}
                      userAnswer={geometryAnswers[i]}
                      onAnswerChange={(v) => handleGeometryAnswerChange(i, v)}
                      graded={geometryGraded}
                      isCorrect={geometryGraded ? parseInt(geometryAnswers[i]) === q.answer : undefined}
                    />
                  ))}
                </div>

                {/* Check / Results */}
                {!geometryGraded ? (
                  <div className="text-center">
                    <Button
                      variant="check"
                      size="lg"
                      onClick={handleGeometryCheck}
                      disabled={!allGeometryAnswered}
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
                  </div>
                ) : (
                  <div className="text-center bg-card rounded-2xl shadow-kid-lg p-8 border border-border animate-bounce-in">
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-kid-yellow" />
                    <p className="text-4xl font-black mb-1">
                      {geometryScorePercent}点！
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">{geometryScorePercent} points!</p>
                    <p className="text-muted-foreground mb-4">
                      {geometryScorePercent === 100
                        ? 'かんぺき！すごいね！🎉 / Perfect! Amazing!'
                        : geometryScorePercent >= 60
                        ? 'がんばったね！もう少し！💪 / Great effort! Almost there!'
                        : 'もういちどチャレンジしてみよう！🔥 / Try again!'}
                    </p>
                    <Button variant="generate" size="lg" onClick={handleGenerateGeometry}>
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  </div>
                )}
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
                    onClick={() => setSelectedRatioTopic(t)}
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
                    <RatioQuestionItem
                      key={q.id}
                      question={q}
                      index={i}
                      userAnswer={ratioAnswers[i]}
                      onAnswerChange={(v) => handleRatioAnswerChange(i, v)}
                      graded={ratioGraded}
                      isCorrect={ratioGraded ? parseFloat(ratioAnswers[i]) === q.answer : undefined}
                    />
                  ))}
                </div>

                {/* Check / Results */}
                {!ratioGraded ? (
                  <div className="text-center">
                    <Button
                      variant="check"
                      size="lg"
                      onClick={handleRatioCheck}
                      disabled={!allRatiosAnswered}
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
                  </div>
                ) : (
                  <div className="text-center bg-card rounded-2xl shadow-kid-lg p-8 border border-border animate-bounce-in">
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-kid-yellow" />
                    <p className="text-4xl font-black mb-1">
                      {ratioScorePercent}点！
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">{ratioScorePercent} points!</p>
                    <p className="text-muted-foreground mb-4">
                      {ratioScorePercent === 100
                        ? 'かんぺき！すごいね！🎉 / Perfect! Amazing!'
                        : ratioScorePercent >= 60
                        ? 'がんばったね！もう少し！💪 / Great effort! Almost there!'
                        : 'もういちどチャレンジしてみよう！🔥 / Try again!'}
                    </p>
                    <Button variant="generate" size="lg" onClick={handleGenerateRatios}>
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  </div>
                )}
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
                    onClick={() => setSelectedAccuracyRateTopic(t)}
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
                    <AccuracyRateQuestionItem
                      key={q.id}
                      question={q}
                      index={i}
                      userAnswer={accuracyRateAnswers[i]}
                      onAnswerChange={(v) => handleAccuracyRateAnswerChange(i, v)}
                      graded={accuracyRateGraded}
                      isCorrect={accuracyRateGraded ? parseFloat(accuracyRateAnswers[i]) === q.answer : undefined}
                    />
                  ))}
                </div>

                {/* Check / Results */}
                {!accuracyRateGraded ? (
                  <div className="text-center">
                    <Button
                      variant="check"
                      size="lg"
                      onClick={handleAccuracyRateCheck}
                      disabled={!allAccuracyRateAnswered}
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
                  </div>
                ) : (
                  <div className="text-center bg-card rounded-2xl shadow-kid-lg p-8 border border-border animate-bounce-in">
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-kid-yellow" />
                    <p className="text-4xl font-black mb-1">
                      {accuracyRateScorePercent}点！
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">{accuracyRateScorePercent} points!</p>
                    <p className="text-muted-foreground mb-4">
                      {accuracyRateScorePercent === 100
                        ? 'かんぺき！すごいね！🎉 / Perfect! Amazing!'
                        : accuracyRateScorePercent >= 60
                        ? 'がんばったね！もう少し！💪 / Great effort! Almost there!'
                        : 'もういちどチャレンジしてみよう！🔥 / Try again!'}
                    </p>
                    <Button variant="generate" size="lg" onClick={handleGenerateAccuracyRate}>
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  </div>
                )}
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
                    onClick={() => setSelectedLargeNumberTopic(t)}
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
                    <LargeNumbersQuestionItem
                      key={q.id}
                      question={q}
                      index={i}
                      userAnswer={largeNumberAnswers[i]}
                      onAnswerChange={(v) => handleLargeNumberAnswerChange(i, v)}
                      graded={largeNumberGraded}
                      isCorrect={largeNumberGraded ?
                        (q.topic === 'reading-oku-cho'
                          ? largeNumberAnswers[i].trim() === (q.answer as string)
                          : parseInt(largeNumberAnswers[i]) === q.answer)
                        : undefined}
                    />
                  ))}
                </div>

                {/* Check / Results */}
                {!largeNumberGraded ? (
                  <div className="text-center">
                    <Button
                      variant="check"
                      size="lg"
                      onClick={handleLargeNumberCheck}
                      disabled={!allLargeNumbersAnswered}
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
                  </div>
                ) : (
                  <div className="text-center bg-card rounded-2xl shadow-kid-lg p-8 border border-border animate-bounce-in">
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-kid-yellow" />
                    <p className="text-4xl font-black mb-1">
                      {largeNumberScorePercent}点！
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">{largeNumberScorePercent} points!</p>
                    <p className="text-muted-foreground mb-4">
                      {largeNumberScorePercent === 100
                        ? 'かんぺき！すごいね！🎉 / Perfect! Amazing!'
                        : largeNumberScorePercent >= 60
                        ? 'がんばったね！もう少し！💪 / Great effort! Almost there!'
                        : 'もういちどチャレンジしてみよう！🔥 / Try again!'}
                    </p>
                    <Button variant="generate" size="lg" onClick={handleGenerateLargeNumbers}>
                      <RotateCcw className="w-5 h-5" />
                      <div className="flex flex-col items-start leading-tight">
                        <span>もういちど！</span>
                        <span className="text-xs opacity-80">Try Again</span>
                      </div>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
