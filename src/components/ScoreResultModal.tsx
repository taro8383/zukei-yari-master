import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, XCircle, ChevronRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SolutionModal, { SolutionData } from './SolutionModal';

interface QuestionResult {
  index: number;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string | number;
  solution?: SolutionData;
}

interface ScoreResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  results: QuestionResult[];
  onTryAgain: () => void;
  onScrollToQuestion: (index: number) => void;
  tabName: string;
  topicName: string;
}

const ScoreResultModal = ({
  isOpen,
  onClose,
  score,
  totalQuestions,
  results,
  onTryAgain,
  onScrollToQuestion,
  tabName,
  topicName,
}: ScoreResultModalProps) => {
  const scorePercent = Math.round((score / totalQuestions) * 100);
  const wrongAnswers = results.filter(r => !r.isCorrect);

  // Solution modal state
  const [solutionModalOpen, setSolutionModalOpen] = useState(false);
  const [currentSolution, setCurrentSolution] = useState<SolutionData | null>(null);
  const [currentUserAnswer, setCurrentUserAnswer] = useState<string | number>('');

  const handleShowSolution = (result: QuestionResult) => {
    if (result.solution) {
      setCurrentSolution(result.solution);
      setCurrentUserAnswer(result.userAnswer);
      setSolutionModalOpen(true);
    }
  };

  const getFeedbackMessage = () => {
    if (scorePercent === 100) {
      return { ja: 'かんぺき！すごいね！', en: 'Perfect! Amazing!', emoji: '🎉' };
    }
    if (scorePercent >= 60) {
      return { ja: 'がんばったね！もう少し！', en: 'Great effort! Almost there!', emoji: '💪' };
    }
    return { ja: 'もういちどチャレンジしてみよう！', en: 'Try again!', emoji: '🔥' };
  };

  const feedback = getFeedbackMessage();

  // Trigger confetti on 100% score when modal opens
  useEffect(() => {
    if (isOpen && scorePercent === 100) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen, scorePercent]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="text-2xl">{tabName}</span>
            <span className="text-sm text-muted-foreground block mt-1">{topicName}</span>
          </DialogTitle>
        </DialogHeader>

        {/* Score Display */}
        <div className="text-center py-6">
          <Trophy className={`w-16 h-16 mx-auto mb-4 ${scorePercent === 100 ? 'text-kid-yellow' : scorePercent >= 60 ? 'text-kid-orange' : 'text-muted-foreground'}`} />
          <p className="text-5xl font-black mb-2">
            {scorePercent}点！
          </p>
          <p className="text-sm text-muted-foreground mb-1">{scorePercent} points!</p>
          <p className="text-lg font-medium">
            {score} / {totalQuestions} せいかい / correct
          </p>
        </div>

        {/* Feedback Message */}
        <div className="text-center mb-6">
          <p className="text-lg font-medium text-foreground">
            {feedback.emoji} {feedback.ja}
          </p>
          <p className="text-sm text-muted-foreground">
            {feedback.en}
          </p>
        </div>

        {/* Wrong Answers List */}
        {wrongAnswers.length > 0 && (
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <p className="font-bold text-center mb-3 flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              まちがえたもんだい / Wrong Answers
            </p>
            <div className="space-y-2">
              {wrongAnswers.map((result) => (
                <div
                  key={result.index}
                  className="w-full p-3 bg-background rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        onScrollToQuestion(result.index);
                        onClose();
                      }}
                      className="flex items-center gap-3 flex-1 text-left group"
                    >
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
                        {result.index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium">
                          こたえ: {result.userAnswer || '(なし / none)'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          せいかい: {result.correctAnswer}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-2" />
                    </button>

                    {/* Solution Button */}
                    {result.solution && (
                      <button
                        onClick={() => handleShowSolution(result)}
                        className="ml-2 flex items-center gap-1 px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Lightbulb className="w-4 h-4" />
                        <span>とけかた</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground mt-3">
              クリックするとそのもんだいへジャンプ！<br />
              Click to jump to that question!
            </p>
          </div>
        )}

        {/* Try Again Button */}
        <Button variant="generate" size="lg" onClick={onTryAgain} className="w-full">
          <RotateCcw className="w-5 h-5" />
          <div className="flex flex-col items-start leading-tight">
            <span>もういちど！</span>
            <span className="text-xs opacity-80">Try Again</span>
          </div>
        </Button>
      </DialogContent>

      {/* Solution Modal */}
      <SolutionModal
        isOpen={solutionModalOpen}
        onClose={() => setSolutionModalOpen(false)}
        solution={currentSolution}
        userAnswer={currentUserAnswer}
      />
    </Dialog>
  );
};

export default ScoreResultModal;
