import { useState, useEffect } from 'react';
import { Target, Check, RefreshCw, Gift, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getDailyQuests, resetDailyQuests, DailyQuest, getCompletedQuestCount } from '@/lib/gameState';

interface DailyQuestsProps {
  isOpen: boolean;
  onClose: () => void;
}

const DailyQuests = ({ isOpen, onClose }: DailyQuestsProps) => {
  const [quests, setQuests] = useState<DailyQuest[]>([]);
  const [allCompleted, setAllCompleted] = useState(false);
  const [timeUntilReset, setTimeUntilReset] = useState('');

  const loadQuests = () => {
    const currentQuests = getDailyQuests();
    setQuests(currentQuests);
    setAllCompleted(currentQuests.every(q => q.completed));
  };

  useEffect(() => {
    if (isOpen) {
      loadQuests();
    }
  }, [isOpen]);

  // Listen for quest completion updates
  useEffect(() => {
    const handleQuestUpdate = () => {
      loadQuests();
    };

    window.addEventListener('quest-completed', handleQuestUpdate);
    return () => window.removeEventListener('quest-completed', handleQuestUpdate);
  }, []);

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeUntilReset(`${hours}時間 ${minutes}分`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    resetDailyQuests();
    loadQuests();
  };

  const completedCount = getCompletedQuestCount();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            <span className="text-2xl">きょうのみっしょん / Daily Quests</span>
          </DialogTitle>
        </DialogHeader>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-primary/10 to-purple-100 border border-primary/20 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-foreground">進捗 / Progress</span>
            <span className="text-2xl font-black text-primary">
              {completedCount}/3
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-500"
              style={{ width: `${(completedCount / 3) * 100}%` }}
            />
          </div>
          {allCompleted && (
            <p className="text-center text-sm font-bold text-green-600 mt-2">
              🎉 おめでとう！すべてクリア！/ All quests completed!
            </p>
          )}
        </div>

        {/* Quests List */}
        <div className="space-y-3 mb-4">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className={cn(
                'p-4 rounded-xl border-2 transition-all',
                quest.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-card border-border hover:border-primary/30'
              )}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={cn(
                  'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
                  quest.completed ? 'bg-green-100' : 'bg-primary/10'
                )}>
                  {quest.completed ? '✅' : quest.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    'font-bold',
                    quest.completed && 'text-green-700 line-through'
                  )}>
                    {quest.nameJa}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {quest.nameEn}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {quest.descriptionJa}
                  </p>
                </div>

                {/* Status */}
                <div className="flex flex-col items-end gap-1">
                  {quest.completed ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      クリア！
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-primary">
                      {quest.progress}/{quest.target}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-yellow-600 font-medium">
                    <Gift className="w-3 h-3" />
                    +{quest.reward}
                  </span>
                </div>
              </div>

              {/* Progress bar for incomplete quests */}
              {!quest.completed && (
                <div className="mt-3">
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reset Timer */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock className="w-4 h-4" />
          <span>リセットまで / Resets in: {timeUntilReset}</span>
        </div>

        {/* Debug Reset Button (hidden in production) */}
        {process.env.NODE_ENV === 'development' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="w-full text-muted-foreground"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            クエストリセット (Debug)
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Quest notification component for when quests are completed
interface QuestNotificationProps {
  questName: string;
  reward: number;
  onClose: () => void;
}

export const QuestNotification = ({ questName, reward, onClose }: QuestNotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top fade-in">
      <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-kid flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
          🎯
        </div>
        <div>
          <p className="font-bold">ミッションクリア！/ Quest Complete!</p>
          <p className="text-sm opacity-90">{questName} (+{reward}コイン)</p>
        </div>
      </div>
    </div>
  );
};

export default DailyQuests;
