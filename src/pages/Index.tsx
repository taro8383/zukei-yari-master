import { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExplanationCard from '@/components/ExplanationCard';
import QuestionItem from '@/components/QuestionItem';
import { Topic, TOPICS, Question, generateQuestions } from '@/lib/geometry';

const topicKeys: Topic[] = ['angles', 'area', 'lines'];

const Index = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic>('angles');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [graded, setGraded] = useState(false);
  const [score, setScore] = useState(0);

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
          <div className="flex items-center gap-3">
            <span className="text-4xl">✏️</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-foreground">
                ずけいワークシート
              </h1>
              <p className="text-muted-foreground text-sm">小学4年生のさんすう</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-8">
        {/* Topic Selection */}
        <div className="mb-6">
          <p className="font-bold mb-3 text-lg">もんだいのしゅるいをえらぼう：</p>
          <div className="flex flex-wrap gap-3">
            {topicKeys.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-5 py-3 rounded-xl font-bold text-base transition-all active:scale-95 ${
                  selectedTopic === t
                    ? 'bg-primary text-primary-foreground shadow-kid-lg scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {TOPICS[t].icon} {TOPICS[t].label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button variant="generate" size="lg" onClick={handleGenerate} className="mb-8 w-full sm:w-auto">
          <Sparkles className="w-5 h-5" />
          もんだいをつくる！
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
                  こたえあわせ
                </Button>
                {!allAnswered && (
                  <p className="text-sm text-muted-foreground mt-2">
                    ぜんぶのこたえを入れてね！
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center bg-card rounded-2xl shadow-kid-lg p-8 border border-border animate-bounce-in">
                <Trophy className="w-12 h-12 mx-auto mb-3 text-kid-yellow" />
                <p className="text-4xl font-black mb-2">
                  {scorePercent}点！
                </p>
                <p className="text-muted-foreground mb-4">
                  {scorePercent === 100
                    ? 'かんぺき！すごいね！🎉'
                    : scorePercent >= 60
                    ? 'がんばったね！もう少し！💪'
                    : 'もういちどチャレンジしてみよう！🔥'}
                </p>
                <Button variant="generate" size="lg" onClick={handleGenerate}>
                  <RotateCcw className="w-5 h-5" />
                  もういちど！
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
