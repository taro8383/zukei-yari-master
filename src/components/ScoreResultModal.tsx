import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, XCircle, ChevronRight, Coins, Sparkles, Target, Lock, Zap, EyeOff, ArrowRight } from 'lucide-react';
import { celebrateAchievement, celebrateCoin } from '@/components/ParticleEffects';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Achievement, calculateSessionCoins, unlockAchievement, recordQuestionAnswered, getGameData } from '@/lib/gameState';

interface QuestionResult {
  index: number;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string | number;
}

interface ScoreResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  results: QuestionResult[];
  onTryAgain: () => void;
  onScrollToQuestion: (index: number) => void;
  onContinue?: () => void; // New prop to proceed to session summary
  tabName: string;
  topicName: string;
  topicId: string;
  hintsUsed?: number;
  challengeModes?: {
    speedMode: boolean;
    noHints: boolean;
  };
  timeSpentSeconds?: number;
}

const ScoreResultModal = ({
  isOpen,
  onClose,
  score,
  totalQuestions,
  results,
  onTryAgain,
  onScrollToQuestion,
  onContinue,
  tabName,
  topicName,
  topicId,
  hintsUsed = 0,
  challengeModes = { speedMode: false, noHints: false },
  timeSpentSeconds = 0,
}: ScoreResultModalProps) => {
  const scorePercent = Math.round((score / totalQuestions) * 100);
  const wrongAnswers = results.filter(r => !r.isCorrect);

  const [coinBreakdown, setCoinBreakdown] = useState<{ baseCoins: number; bonuses: { name: string; amount: number }[]; total: number } | null>(null);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [previousCoins, setPreviousCoins] = useState(0);

  // Record session and calculate rewards when modal opens
  useEffect(() => {
    if (isOpen) {
      // Record each question
      results.forEach(r => {
        recordQuestionAnswered(r.isCorrect, topicId);
      });

      // Calculate coins
      const breakdown = calculateSessionCoins(
        score,
        totalQuestions,
        hintsUsed,
        challengeModes.speedMode,
        timeSpentSeconds
      );
      setCoinBreakdown(breakdown);

      // Get current coins before adding
      const gameData = getGameData();
      setPreviousCoins(gameData.player.coins);

      // Add coins to game data
      gameData.player.coins += breakdown.total;

      // Check for perfect score achievement
      const newAchs: Achievement[] = [];
      if (scorePercent === 100) {
        const perfectAch = unlockAchievement('perfect_score');
        if (perfectAch) newAchs.push(perfectAch);
      }

      // Check for first try achievement
      if (gameData.stats.totalQuestions >= 1) {
        const firstTryAch = unlockAchievement('first_try');
        if (firstTryAch) newAchs.push(firstTryAch);
      }

      // Check for explorer achievement
      const topicsTried = Object.keys(gameData.progress).length;
      if (topicsTried >= 10) {
        const explorerAch = unlockAchievement('explorer');
        if (explorerAch) newAchs.push(explorerAch);
      }

      // Check for speed demon achievement
      if (challengeModes.speedMode && score === totalQuestions) {
        const speedAch = unlockAchievement('speed_demon');
        if (speedAch) newAchs.push(speedAch);
      }

      // Check for hint hater achievement
      if (challengeModes.noHints && score === totalQuestions) {
        const hintAch = unlockAchievement('hint_hater');
        if (hintAch) newAchs.push(hintAch);
      }

      // Check for coin collector
      if (gameData.player.coins >= 100) {
        const coinAch = unlockAchievement('coin_collector');
        if (coinAch) newAchs.push(coinAch);
      }

      setNewAchievements(newAchs);

      // Trigger particle effects
      if (newAchs.length > 0) {
        celebrateAchievement();
      }
      if (breakdown.total > 0) {
        setTimeout(() => celebrateCoin(), 500);
      }

      // Dispatch event to update header
      window.dispatchEvent(new CustomEvent('coins-changed'));
    }
  }, [isOpen, score, totalQuestions, hintsUsed, challengeModes, timeSpentSeconds, topicId, scorePercent, results]);

  const getFeedbackMessage = () => {
    if (scorePercent === 100) {
      return { ja: 'かんぺき！すごいね！', en: 'Perfect! Amazing!', emoji: '🎉' };
    }
    if (scorePercent >= 80) {
      return { ja: 'とてもよくできた！', en: 'Excellent work!', emoji: '⭐' };
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
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

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
        <div className="text-center py-4">
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
        <div className="text-center mb-4">
          <p className="text-lg font-medium text-foreground">
            {feedback.emoji} {feedback.ja}
          </p>
          <p className="text-sm text-muted-foreground">
            {feedback.en}
          </p>
        </div>

        {/* Challenge Mode Badges */}
        {(challengeModes.speedMode || challengeModes.noHints) && (
          <div className="flex justify-center gap-2 mb-4">
            {challengeModes.speedMode && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                <Zap className="w-3 h-3" />
                スピードモード
              </span>
            )}
            {challengeModes.noHints && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                <EyeOff className="w-3 h-3" />
                ヒントなし
              </span>
            )}
          </div>
        )}

        {/* Coins Earned Section */}
        {coinBreakdown && coinBreakdown.total > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Coins className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-black text-yellow-700">+{coinBreakdown.total} コイン！</span>
            </div>

            {/* Coin breakdown */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-yellow-700">
                <span>せいかいごと / Per correct</span>
                <span className="font-bold">+{coinBreakdown.baseCoins}</span>
              </div>
              {coinBreakdown.bonuses.map((bonus, idx) => (
                <div key={idx} className="flex justify-between text-yellow-600">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {bonus.name}
                  </span>
                  <span className="font-bold">+{bonus.amount}</span>
                </div>
              ))}
            </div>

            {/* Total coins display */}
            <div className="mt-3 pt-3 border-t border-yellow-200 text-center">
              <p className="text-sm text-yellow-600">
                ぜんぶで / Total: <span className="font-bold text-yellow-700 text-lg">{previousCoins + coinBreakdown.total}</span> コイン
              </p>
            </div>
          </div>
        )}

        {/* New Achievements */}
        {newAchievements.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
            <p className="text-center font-bold text-purple-700 mb-3 flex items-center justify-center gap-2">
              <Target className="w-5 h-5" />
              新しい実績！ / New Achievement!
            </p>
            <div className="space-y-2">
              {newAchievements.map((ach) => (
                <div key={ach.id} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-purple-100">
                  <span className="text-3xl">{ach.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">{ach.nameJa}</p>
                    <p className="text-xs text-muted-foreground">{ach.nameEn}</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                    +{ach.coinReward}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wrong Answers List */}
        {wrongAnswers.length > 0 && (
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <p className="font-bold text-center mb-3 flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              まちがえたもんだい / Wrong Answers
            </p>
            <div className="space-y-2">
              {wrongAnswers.map((result) => (
                <button
                  key={result.index}
                  onClick={() => {
                    onScrollToQuestion(result.index);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
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
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </button>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground mt-3">
              クリックするとそのもんだいへジャンプ！<br />
              Click to jump to that question!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" size="lg" onClick={onTryAgain} className="flex-1">
            <RotateCcw className="w-5 h-5 mr-2" />
            <div className="flex flex-col items-start leading-tight">
              <span>もういちど</span>
              <span className="text-xs opacity-80">Try Again</span>
            </div>
          </Button>
          {onContinue && (
            <Button variant="generate" size="lg" onClick={onContinue} className="flex-1">
              <div className="flex flex-col items-start leading-tight">
                <span>つぎへ</span>
                <span className="text-xs opacity-80">Continue</span>
              </div>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreResultModal;
