import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ACHIEVEMENTS, checkAchievements, getGameData, GameData } from '@/lib/gameState';

interface AchievementWallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function getRarity(coinReward: number): 'common' | 'rare' | 'ultra' {
  if (coinReward >= 100) return 'ultra';
  if (coinReward >= 50) return 'rare';
  return 'common';
}

function getProgress(id: string, gd: GameData): { current: number; max: number } | null {
  switch (id) {
    case 'streak_3':       return { current: gd.stats.streak.current, max: 3 };
    case 'streak_7':       return { current: gd.stats.streak.current, max: 7 };
    case 'explorer':       return { current: Object.keys(gd.progress).length, max: 10 };
    case 'coin_collector': return { current: Math.min(gd.player.coins, 100), max: 100 };
    default:               return null;
  }
}

const AchievementWallModal = ({ isOpen, onClose }: AchievementWallModalProps) => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkAchievements();
      setGameData(getGameData());
    }
  }, [isOpen]);

  if (!gameData) return null;

  const unlockedIds = new Set(gameData.achievements);
  const unlockedCount = unlockedIds.size;
  const totalCoinsEarned = ACHIEVEMENTS
    .filter(a => unlockedIds.has(a.id))
    .reduce((sum, a) => sum + a.coinReward, 0);

  const handleShare = async () => {
    const text = `けいくんのじっせき: ${unlockedCount}/8 コレクト！💰 ${totalCoinsEarned}コイン獲得！`;
    if (navigator.share) {
      await navigator.share({ title: 'けいくんの算数アプリ', text });
    } else {
      await navigator.clipboard.writeText(text);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            🏆 じっせきコレクション
            <span className="text-sm font-normal text-muted-foreground">Achievement Wall</span>
          </DialogTitle>
        </DialogHeader>

        {/* Stats strip */}
        <div className="flex items-center gap-4 px-3 py-2 bg-purple-50 rounded-lg text-sm font-bold text-purple-700 border border-purple-200">
          <span>🏆 {unlockedCount} / 8 コレクション済み</span>
          <span>💰 {totalCoinsEarned} コイン</span>
        </div>

        {/* Achievement grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = unlockedIds.has(achievement.id);
            const rarity = getRarity(achievement.coinReward);
            const progress = !unlocked ? getProgress(achievement.id, gameData) : null;

            const borderClass = unlocked
              ? rarity === 'ultra'
                ? 'border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-purple-50'
                : rarity === 'rare'
                ? 'border-2 border-purple-400 bg-purple-50'
                : 'border-2 border-yellow-400 bg-yellow-50'
              : 'border-2 border-gray-200 bg-gray-50 opacity-60';

            return (
              <div key={achievement.id} className={`relative rounded-xl p-3 flex flex-col items-center gap-1 text-center ${borderClass}`}>
                {/* Rarity badge */}
                {unlocked && rarity !== 'common' && (
                  <span className={`absolute top-1 right-1 text-[10px] px-1 rounded font-bold leading-tight ${
                    rarity === 'ultra'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {rarity === 'ultra' ? '★★ 超レア' : '★ レア'}
                  </span>
                )}

                {/* Icon */}
                <span className={`text-4xl leading-none ${!unlocked ? 'grayscale' : ''}`}>
                  {achievement.icon}
                </span>

                {/* Names */}
                <span className="text-xs font-bold leading-tight">{achievement.nameJa}</span>
                <span className="text-[10px] text-muted-foreground leading-tight">{achievement.nameEn}</span>

                {unlocked ? (
                  <>
                    <span className="text-[11px] font-bold text-yellow-600">+{achievement.coinReward}コイン</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">✅ コレクト！</span>
                  </>
                ) : (
                  <>
                    {progress && (
                      <div className="w-full mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-400 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(100, (progress.current / progress.max) * 100)}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-0.5 block">
                          {progress.current}/{progress.max}
                        </span>
                      </div>
                    )}
                    <span className="text-[10px] text-gray-400 font-medium">🔒 ロック中</span>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Share button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
          >
            {shareCopied ? '✅ コピーしました！' : '📸 保護者にシェア'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementWallModal;
