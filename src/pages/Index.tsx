import { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, Trophy, Compass, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExplanationCard from '@/components/ExplanationCard';
import QuestionItem from '@/components/QuestionItem';
import Protractor from '@/components/Protractor';
import { Topic, TOPICS, Question, generateQuestions } from '@/lib/geometry';

const topicKeys: Topic[] = ['angles', 'area', 'lines', 'intersecting', 'quadrilaterals', 'diagonals'];

type ProtractorType = '180' | '360' | null;

const Index = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic>('angles');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [graded, setGraded] = useState(false);
  const [score, setScore] = useState(0);
  const [activeProtractor, setActiveProtractor] = useState<ProtractorType>(null);

  const handleGenerate = () => {
    const newQuestions = generateQuestions(selectedTopic);
    setQuestions(newQuestions);
    setAnswers(new Array(5).fill(''));
    setGraded(false);
    setScore(0);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const allAnswered = answers.length === 5 && answers.every((a) => a.trim() !== '');

  const handleCheck = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (parseInt(answers[i]) === q.answer) correct++;
    });
    setScore(correct);
    setGraded(true);
  };

  const scorePercent = score * 20;

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
                  けいくんの図形アプリ
                </h1>
                <p className="text-muted-foreground text-sm">Kei-kun's Geometry App</p>
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

      <main className="container max-w-3xl mx-auto px-4 py-8">
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
        <Button variant="generate" size="lg" onClick={handleGenerate} className="mb-8 w-full sm:w-auto">
          <Sparkles className="w-5 h-5" />
          <div className="flex flex-col items-start leading-tight">
            <span>もんだいをつくる！</span>
            <span className="text-xs opacity-80">Generate Exercises</span>
          </div>
        </Button>

        {/* Content */}
        {questions.length > 0 && (
          <div className="animate-bounce-in">
            {/* Explanation */}
            <ExplanationCard info={TOPICS[selectedTopic]} />

            {/* Questions */}
            <div className="space-y-4 mb-8">
              {questions.map((q, i) => (
                <QuestionItem
                  key={q.id}
                  question={q}
                  index={i}
                  userAnswer={answers[i]}
                  onAnswerChange={(v) => handleAnswerChange(i, v)}
                  graded={graded}
                  isCorrect={graded ? parseInt(answers[i]) === q.answer : undefined}
                />
              ))}
            </div>

            {/* Check / Results */}
            {!graded ? (
              <div className="text-center">
                <Button
                  variant="check"
                  size="lg"
                  onClick={handleCheck}
                  disabled={!allAnswered}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <div className="flex flex-col items-start leading-tight">
                    <span>こたえあわせ</span>
                    <span className="text-xs opacity-80">Check Answers</span>
                  </div>
                </Button>
                {!allAnswered && (
                  <p className="text-sm text-muted-foreground mt-2">
                    ぜんぶのこたえを入れてね！ / Fill in all answers!
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center bg-card rounded-2xl shadow-kid-lg p-8 border border-border animate-bounce-in">
                <Trophy className="w-12 h-12 mx-auto mb-3 text-kid-yellow" />
                <p className="text-4xl font-black mb-1">
                  {scorePercent}点！
                </p>
                <p className="text-sm text-muted-foreground mb-2">{scorePercent} points!</p>
                <p className="text-muted-foreground mb-4">
                  {scorePercent === 100
                    ? 'かんぺき！すごいね！🎉 / Perfect! Amazing!'
                    : scorePercent >= 60
                    ? 'がんばったね！もう少し！💪 / Great effort! Almost there!'
                    : 'もういちどチャレンジしてみよう！🔥 / Try again!'}
                </p>
                <Button variant="generate" size="lg" onClick={handleGenerate}>
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
      </main>
    </div>
  );
};

export default Index;
