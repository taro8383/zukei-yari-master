import { useEffect, useState } from 'react';
import { Coins, Flame, Trophy, User, ShoppingBag, Target, Brain } from 'lucide-react';
import { getGameData, getStreakStatus, updateStreak, GameData } from '@/lib/gameState';
import { cn } from '@/lib/utils';

interface HeaderBarProps {
  className?: string;
  onOpenShop?: () => void;
  onOpenQuests?: () => void;
  onOpenInsights?: () => void;
  unacknowledgedInsights?: number;
}

const HeaderBar = ({ className, onOpenShop, onOpenQuests, onOpenInsights, unacknowledgedInsights = 0 }: HeaderBarProps) => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [showCoinsAnimation, setShowCoinsAnimation] = useState(false);

  useEffect(() => {
    // Initialize streak and get data
    const data = updateStreak();
    setGameData(data);

    // Refresh data every 5 seconds to catch updates
    const interval = setInterval(() => {
      setGameData(getGameData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Listen for coin changes
  useEffect(() => {
    const handleCoinChange = () => {
      setShowCoinsAnimation(true);
      setTimeout(() => setShowCoinsAnimation(false), 800);
      setGameData(getGameData());
    };

    window.addEventListener('coins-changed', handleCoinChange);
    return () => window.removeEventListener('coins-changed', handleCoinChange);
  }, []);

  if (!gameData) return null;

  const { player, stats, achievements } = gameData;
  const streakStatus = getStreakStatus(stats.streak.current);

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 px-3 py-2 bg-card border border-border rounded-xl shadow-kid',
        className
      )}
    >
      {/* Left - Avatar/Name */}
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner"
          style={{ backgroundColor: player.avatarColor }}
        >
          <User className="w-5 h-5" />
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-bold leading-tight">{player.name}</p>
          <p className="text-xs text-muted-foreground">Lv.{Math.floor(player.totalXP / 100) + 1}</p>
        </div>
      </div>

      {/* Center - Stats */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Streak */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 border border-orange-200"
          title={`${stats.streak.current}日れんぞく！がんばってるね！ / ${stats.streak.current} day streak!`}
        >
          <Flame
            className="w-5 h-5"
            style={{ color: streakStatus.color }}
          />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black text-orange-600">{stats.streak.current}</span>
            <span className="text-[10px] text-orange-400 font-medium">日 / days</span>
          </div>
        </div>

        {/* Coins */}
        <div
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-yellow-50 border border-yellow-200 transition-transform',
            showCoinsAnimation && 'scale-110'
          )}
          title="コイン / Coins"
        >
          <Coins className="w-5 h-5 text-yellow-500" />
          <div className="flex flex-col leading-none">
            <span className={cn('text-sm font-black text-yellow-600', showCoinsAnimation && 'animate-bounce')}>
              {player.coins}
            </span>
            <span className="text-[10px] text-yellow-500 font-medium">コイン</span>
          </div>
        </div>

        {/* Achievements */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-50 border border-purple-200"
          title="実績 / Achievements"
        >
          <Trophy className="w-5 h-5 text-purple-500" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black text-purple-600">{achievements.length}</span>
            <span className="text-[10px] text-purple-400 font-medium">バッジ</span>
          </div>
        </div>
      </div>

      {/* Right - Quests + Insights + Shop + XP Bar */}
      <div className="flex items-center gap-2">
        {/* Learning Insights Button */}
        {onOpenInsights && (
          <button
            onClick={onOpenInsights}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 hover:scale-105 transition-transform relative"
            title="がくしゅうインサイト / Learning Insights"
          >
            <Brain className="w-5 h-5 text-indigo-600" />
            {unacknowledgedInsights > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white text-white text-[10px] font-bold flex items-center justify-center">
                {unacknowledgedInsights}
              </span>
            )}
          </button>
        )}

        {/* Daily Quests Button */}
        {onOpenQuests && (
          <button
            onClick={onOpenQuests}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-red-100 border border-orange-200 hover:scale-105 transition-transform relative"
            title="きょうのみっしょん / Daily Quests"
          >
            <Target className="w-5 h-5 text-orange-600" />
            {/* Notification dot - could show incomplete quests */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          </button>
        )}

        {/* Shop Button */}
        {onOpenShop && (
          <button
            onClick={onOpenShop}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 border border-pink-200 hover:scale-105 transition-transform"
            title="ショップ / Shop"
          >
            <ShoppingBag className="w-5 h-5 text-purple-600" />
          </button>
        )}

        {/* XP Bar (mobile: hidden) */}
        <div className="hidden sm:flex flex-col w-24">
          <div className="flex justify-between text-[10px] mb-0.5">
            <span className="font-medium text-muted-foreground">けいけん / XP</span>
            <span className="font-bold">{player.totalXP % 100}/100</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${(player.totalXP % 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
