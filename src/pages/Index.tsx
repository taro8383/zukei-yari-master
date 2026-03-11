import { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, Trophy, Compass, Circle, Shapes, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExplanationCard from '@/components/ExplanationCard';
import QuestionItem from '@/components/QuestionItem';
import Protractor from '@/components/Protractor';
import { Topic, TOPICS, Question, generateQuestions } from '@/lib/geometry';
import { RatioQuestion, RATIO_TOPICS, generateRatioQuestions } from '@/lib/ratios';
import { RatioExplanationCard, RatioQuestionItem } from '@/components/ratios';

const topicKeys: Topic[] = ['angles', 'area', 'lines', 'intersecting', 'quadrilaterals', 'diagonals'];

type ProtractorType = '180' | '360' | null;
type AppTab = 'geometry' | 'ratios';

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
  const [ratioQuestions, setRatioQuestions] = useState<RatioQuestion[]>([]);
  const [ratioAnswers, setRatioAnswers] = useState<string[]>([]);
  const [ratioGraded, setRatioGraded] = useState(false);
  const [ratioScore, setRatioScore] = useState(0);

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
    const newQuestions = generateRatioQuestions();
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

  const geometryScorePercent = geometryScore * 20;
  const ratioScorePercent = ratioScore * 20;

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
          <TabsList className="w-full grid grid-cols-2 mb-8 h-auto p-1.5 bg-muted rounded-2xl">
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

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateGeometry} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Content */}
            {geometryQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Explanation */}
                <ExplanationCard info={TOPICS[selectedTopic]} />

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
            {/* Topic Info */}
            <div className="mb-6">
              <p className="font-bold mb-1 text-lg">ばあいのもんだいをえらぼう：</p>
              <p className="text-sm text-muted-foreground mb-3">Choose a topic:</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-3 rounded-xl font-bold text-sm transition-all bg-primary text-primary-foreground shadow-kid-lg scale-105 flex flex-col items-center">
                  <span>📏 何倍ですか</span>
                  <span className="text-xs mt-0.5 text-primary-foreground/80">Finding the Multiple</span>
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <Button variant="generate" size="lg" onClick={handleGenerateRatios} className="mb-8 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              <div className="flex flex-col items-start leading-tight">
                <span>もんだいをつくる！</span>
                <span className="text-xs opacity-80">Generate Exercises</span>
              </div>
            </Button>

            {/* Content */}
            {ratioQuestions.length > 0 && (
              <div className="animate-bounce-in">
                {/* Explanation */}
                <RatioExplanationCard info={RATIO_TOPICS['finding-ratio']} />

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
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
