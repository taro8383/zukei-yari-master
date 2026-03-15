import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy, Clock } from 'lucide-react';
import { TestQuestion } from '@/lib/testMode';
import { cn } from '@/lib/utils';

interface TestModeProps {
  questions: TestQuestion[];
  onExit: () => void;
  onComplete: (score: number, total: number) => void;
}

const TestMode = ({ questions, onExit, onComplete }: TestModeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isGraded, setIsGraded] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: value }));
  };

  const handleGrade = () => {
    setIsGraded(true);
    let correct = 0;
    questions.forEach((q, idx) => {
      const userAnswer = parseFloat(answers[idx] || '');
      if (!isNaN(userAnswer)) {
        const tolerance = 0.0001;
        if (Math.abs(userAnswer - q.answer) < tolerance) {
          correct++;
        }
      }
    });
    onComplete(correct, questions.length);
  };

  const getCurrentAnswer = () => answers[currentIndex] || '';

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isGraded) {
    // Calculate final score
    let correct = 0;
    questions.forEach((q, idx) => {
      const userAnswer = parseFloat(answers[idx] || '');
      if (!isNaN(userAnswer)) {
        const tolerance = 0.0001;
        if (Math.abs(userAnswer - q.answer) < tolerance) {
          correct++;
        }
      }
    });
    const percentage = Math.round((correct / questions.length) * 100);
    const timeElapsed = Date.now() - startTime;

    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-card rounded-2xl shadow-kid border-2 border-border p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-yellow-600" />
          </div>

          <h2 className="text-3xl font-black text-foreground mb-2">
            テスト完了！ / Test Complete!
          </h2>

          <div className="text-5xl font-black text-primary mb-2">
            {percentage}%
          </div>

          <p className="text-lg text-muted-foreground mb-6">
            {correct} / {questions.length} 問正解 / correct
          </p>

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Clock className="w-5 h-5" />
            <span>時間 / Time: {formatTime(timeElapsed)}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">{correct}</div>
              <div className="text-xs text-green-600">正解 / Correct</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-600">{questions.length - correct}</div>
              <div className="text-xs text-red-600">不正解 / Incorrect</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
              <div className="text-xs text-blue-600">合計 / Total</div>
            </div>
          </div>

          <button
            onClick={onExit}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
          >
            終了 / Exit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">終了 / Exit</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            問 {currentIndex + 1} / {questions.length}
          </span>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topic Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-kid-blue/10 text-kid-blue rounded-full text-sm font-medium">
          {currentQuestion?.tabName}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-2xl shadow-kid border-2 border-border p-6">
        {/* Question Text */}
        <div className="mb-6">
          <p className="text-xl font-medium leading-relaxed">{currentQuestion?.text}</p>
          <p className="text-sm text-muted-foreground mt-2">{currentQuestion?.textEn}</p>
        </div>

        {/* Answer Input */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-foreground font-medium">答え：</span>
            <span className="text-xs text-muted-foreground">Answer:</span>
          </div>
          <input
            type="number"
            step="0.001"
            value={getCurrentAnswer()}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="w-32 h-14 text-center text-2xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
            placeholder="?"
            autoFocus
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-xl border-2 border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          ← 前へ / Prev
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleGrade}
            className="px-8 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            採点 / Grade
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
          >
            次へ / Next →
          </button>
        )}
      </div>

      {/* Question Navigator Dots */}
      <div className="flex flex-wrap justify-center gap-1 mt-6">
        {questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              idx === currentIndex
                ? 'bg-primary w-6'
                : answers[idx]
                ? 'bg-green-400'
                : 'bg-muted'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default TestMode;
