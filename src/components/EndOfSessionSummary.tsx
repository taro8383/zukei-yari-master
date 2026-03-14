import { useEffect, useState } from 'react';
import { X, Trophy, Clock, Coins, Flame, TrendingUp, Target, RotateCcw, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getGameData, saveGameData } from '@/lib/gameState';
import { getHistory } from '@/lib/historyStorage';

interface EndOfSessionSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  onPracticeMore: () => void;
  onBackToMap: () => void;
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  coinsEarned: number;
  topic: string;
  topicName: string;
}

interface SessionComparison {
  accuracyImprovement: number;
  timeImprovement: number; // negative is better (faster)
  previousAccuracy: number | null;
  previousTime: number | null;
}

export const EndOfSessionSummary = ({
  isOpen,
  onClose,
  onPracticeMore,
  onBackToMap,
  score,
  totalQuestions,
  timeSpent,
  coinsEarned,
  topic,
  topicName,
}: EndOfSessionSummaryProps) => {
  const [comparison, setComparison] = useState<SessionComparison>({
    accuracyImprovement: 0,
    timeImprovement: 0,
    previousAccuracy: null,
    previousTime: null,
  });
  const [suggestedTopic, setSuggestedTopic] = useState<string>('');
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (isOpen) {
      loadComparisonData();
      generateSuggestion();
      loadStreak();
      saveSessionData();
    }
  }, [isOpen, score, totalQuestions, timeSpent, topic]);

  const loadComparisonData = () => {
    const history = getHistory();
    const today = new Date().toISOString().split('T')[0];

    // Find previous sessions for the same topic (excluding today)
    const previousSessions = history.filter(
      (h) => h.topicKey === topic && !h.date.startsWith(today)
    );

    if (previousSessions.length > 0) {
      // Get the most recent previous session
      const lastSession = previousSessions[previousSessions.length - 1];
      const previousAccuracy = (lastSession.score / lastSession.totalQuestions) * 100;
      const currentAccuracy = (score / totalQuestions) * 100;

      setComparison({
        accuracyImprovement: currentAccuracy - previousAccuracy,
        timeImprovement: 0, // We don't track time per session yet, so show 0
        previousAccuracy,
        previousTime: null,
      });
    } else {
      setComparison({
        accuracyImprovement: 0,
        timeImprovement: 0,
        previousAccuracy: null,
        previousTime: null,
      });
    }
  };

  const loadStreak = () => {
    const data = getGameData();
    setCurrentStreak(data.stats.streak.current);
  };

  const generateSuggestion = () => {
    const suggestions = [
      { topic: 'decimals', name: '小数 / Decimals' },
      { topic: 'fractions', name: '分数 / Fractions' },
      { topic: 'ratios', name: '倍 / Ratios' },
      { topic: 'geometry', name: '図形 / Geometry' },
      { topic: 'division', name: 'わり算 / Division' },
    ];

    // Pick a different topic than current
    const differentSuggestions = suggestions.filter((s) => s.topic !== topic);
    const randomSuggestion =
      differentSuggestions[Math.floor(Math.random() * differentSuggestions.length)];
    setSuggestedTopic(randomSuggestion?.name || '次のエリア / Next Area');
  };

  const saveSessionData = () => {
    const data = getGameData();

    // Update daily progress
    const today = new Date().toISOString().split('T')[0];
    if (data.stats.dailyProgress.date !== today) {
      data.stats.dailyProgress = {
        date: today,
        questionsAnswered: 0,
        correctAnswers: 0,
      };
    }

    data.stats.dailyProgress.questionsAnswered += totalQuestions;
    data.stats.dailyProgress.correctAnswers += score;

    // Save last session info for tomorrow's challenge
    const lastSession = {
      topic,
      topicName,
      score,
      totalQuestions,
      accuracy: (score / totalQuestions) * 100,
      date: new Date().toISOString(),
    };

    // Store in localStorage for persistence
    localStorage.setItem('kei-kun-last-session', JSON.stringify(lastSession));

    saveGameData(data);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}分 ${secs}秒 / ${mins}m ${secs}s`;
    }
    return `${secs}秒 / ${secs}s`;
  };

  const accuracy = Math.round((score / totalQuestions) * 100);

  // Determine performance message
  const getPerformanceMessage = () => {
    if (accuracy === 100) return { ja: 'かんぺき！', en: 'Perfect!', emoji: '🌟' };
    if (accuracy >= 80) return { ja: 'すばらしい！', en: 'Great work!', emoji: '🎉' };
    if (accuracy >= 60) return { ja: 'がんばったね！', en: 'Good job!', emoji: '👍' };
    return { ja: 'つぎはもっとがんばろう！', en: 'Keep practicing!', emoji: '💪' };
  };

  const message = getPerformanceMessage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl shadow-kid max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary/20 to-purple-100 p-6 rounded-t-2xl text-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="text-6xl mb-2 animate-bounce">{message.emoji}</div>
          <h2 className="text-2xl font-black text-foreground">{message.ja}</h2>
          <p className="text-sm text-muted-foreground">{message.en}</p>
        </div>

        <div className="p-6 space-y-5">
          {/* Today's Stats */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h3 className="font-bold flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-yellow-500" />
              きょうのせいせき / Today's Stats
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Accuracy */}
              <div className="bg-card rounded-lg p-3 text-center border border-border">
                <div className="text-2xl font-black text-primary">
                  {score}/{totalQuestions}
                </div>
                <div className="text-xs text-muted-foreground">
                  ({accuracy}%) 正答 / Correct
                </div>
              </div>

              {/* Time */}
              <div className="bg-card rounded-lg p-3 text-center border border-border">
                <div className="flex items-center justify-center gap-1 text-foreground">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-lg font-bold">
                    {timeSpent < 60 ? `${timeSpent}s` : `${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s`}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  じかん / Time
                </div>
              </div>

              {/* Coins */}
              <div className="bg-card rounded-lg p-3 text-center border border-border">
                <div className="flex items-center justify-center gap-1 text-yellow-600">
                  <Coins className="w-4 h-4" />
                  <span className="text-lg font-bold">+{coinsEarned}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  コイン / Coins
                </div>
              </div>

              {/* Streak */}
              <div className="bg-card rounded-lg p-3 text-center border border-border">
                <div className="flex items-center justify-center gap-1 text-orange-600">
                  <Flame className="w-4 h-4" />
                  <span className="text-lg font-bold">{currentStreak}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  日れんぞく / Day Streak
                </div>
              </div>
            </div>
          </div>

          {/* Comparison to Last Time */}
          {comparison.previousAccuracy !== null && (
            <div
              className={cn(
                'rounded-xl p-4 border',
                comparison.accuracyImprovement >= 0
                  ? 'bg-green-50 border-green-200'
                  : 'bg-orange-50 border-orange-200'
              )}
            >
              <h3 className="font-bold flex items-center gap-2 mb-3 text-sm">
                <TrendingUp className="w-4 h-4 text-primary" />
                ぜんかいとのくらべ / Compared to Last Time
              </h3>

              <div className="space-y-2">
                {/* Accuracy Comparison */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">正答率 / Accuracy</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {Math.round(comparison.previousAccuracy)}% →
                    </span>
                    <span
                      className={cn(
                        'text-sm font-bold',
                        comparison.accuracyImprovement >= 0
                          ? 'text-green-600'
                          : 'text-orange-600'
                      )}
                    >
                      {comparison.accuracyImprovement >= 0 ? '+' : ''}
                      {Math.round(comparison.accuracyImprovement)}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      comparison.accuracyImprovement >= 0
                        ? 'bg-green-500'
                        : 'bg-orange-500'
                    )}
                    style={{
                      width: `${Math.min(
                        Math.abs(comparison.accuracyImprovement) + 50,
                        100
                      )}%`,
                    }}
                  />
                </div>

                {/* Improvement Message */}
                {comparison.accuracyImprovement > 0 && (
                  <p className="text-xs text-green-600 text-center">
                    上達しています！/ You're improving!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* First Time Message */}
          {comparison.previousAccuracy === null && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-sm text-blue-700">
                はじめてのチャレンジ！おつかれさま！
              </p>
              <p className="text-xs text-blue-600">
                First time trying this! Great job!
              </p>
            </div>
          )}

          {/* Tomorrow's Challenge */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
            <h3 className="font-bold flex items-center gap-2 mb-2 text-sm">
              <Target className="w-4 h-4 text-purple-600" />
              つぎのちょうせん / Tomorrow's Challenge
            </h3>
            <p className="text-sm text-foreground">
              <span className="font-bold">{suggestedTopic}</span> で
              {totalQuestions}/{totalQuestions} をめざそう！
            </p>
            <p className="text-xs text-muted-foreground">
              Can you get {totalQuestions}/{totalQuestions} on {suggestedTopic}?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onBackToMap}
              className="flex-1 h-12 text-sm"
            >
              <Map className="w-4 h-4 mr-2" />
              マップへ / Map
            </Button>
            <Button
              onClick={onPracticeMore}
              className="flex-1 h-12 text-sm bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              もっと練習 / Practice More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndOfSessionSummary;
