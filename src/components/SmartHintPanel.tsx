import { useState } from 'react';
import { Lightbulb, ChevronRight, Lock, Check, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getGameData, spendCoins, usePowerup, saveGameData } from '@/lib/gameState';

export interface HintLevel {
  level: number;
  textJa: string;
  textEn: string;
  cost: number; // 0 = free
}

interface SmartHintPanelProps {
  hints: HintLevel[];
  onHintUsed?: (level: number) => void;
  disabled?: boolean;
}

const SmartHintPanel = ({ hints, onHintUsed, disabled }: SmartHintPanelProps) => {
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([]);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [coins, setCoins] = useState(getGameData().player.coins);

  // Check if user has extra hint powerup
  const hasExtraHintPowerup = (getGameData().inventory.powerups['powerup-extra-hint'] || 0) > 0;

  const handleUnlockHint = (hint: HintLevel) => {
    if (disabled) return;

    // Already unlocked
    if (unlockedLevels.includes(hint.level)) return;

    // Free hint - unlock immediately
    if (hint.cost === 0) {
      setUnlockedLevels([...unlockedLevels, hint.level]);
      onHintUsed?.(hint.level);
      return;
    }

    // Check for extra hint powerup first
    if (hasExtraHintPowerup) {
      usePowerup('powerup-extra-hint');
      setUnlockedLevels([...unlockedLevels, hint.level]);
      onHintUsed?.(hint.level);
      setCoins(getGameData().player.coins);
      return;
    }

    // Try to spend coins
    const success = spendCoins(hint.cost);

    if (success) {
      setUnlockedLevels([...unlockedLevels, hint.level]);
      setCoins(getGameData().player.coins);
      onHintUsed?.(hint.level);
      setPurchaseError(null);

      // Dispatch event to update header
      window.dispatchEvent(new CustomEvent('coins-changed'));
    } else {
      setPurchaseError('コインが足りません / Not enough coins');
      setTimeout(() => setPurchaseError(null), 2000);
    }
  };

  // Get the next locked hint
  const nextLockedHint = hints.find(h => !unlockedLevels.includes(h.level));

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-blue-500" />
        <h4 className="font-bold text-blue-700">
          ヒント / Hints
        </h4>
        <span className="text-xs text-blue-500 ml-auto flex items-center gap-1">
          <Coins className="w-3 h-3" />
          {coins}
        </span>
      </div>

      {/* Extra hint powerup indicator */}
      {hasExtraHintPowerup && (
        <div className="mb-3 px-3 py-1.5 bg-purple-100 border border-purple-200 rounded-lg text-xs text-purple-700 flex items-center gap-2">
          <span>💡</span>
          <span>ヒント+1パワーアップ使用中！ / Extra hint power-up active!</span>
        </div>
      )}

      {/* Purchase error */}
      {purchaseError && (
        <div className="mb-3 px-3 py-1.5 bg-red-100 border border-red-200 rounded-lg text-xs text-red-700">
          {purchaseError}
        </div>
      )}

      {/* Unlocked hints */}
      <div className="space-y-2 mb-3">
        {hints
          .filter(h => unlockedLevels.includes(h.level))
          .map(hint => (
            <div
              key={hint.level}
              className="p-3 bg-white rounded-lg border border-blue-200"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  L{hint.level}
                </span>
                <Check className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-sm text-foreground">{hint.textJa}</p>
              <p className="text-xs text-muted-foreground">{hint.textEn}</p>
            </div>
          ))}
      </div>

      {/* Next hint button */}
      {nextLockedHint && !disabled && (
        <button
          onClick={() => handleUnlockHint(nextLockedHint)}
          className={cn(
            'w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all',
            nextLockedHint.cost === 0
              ? 'bg-green-50 border-green-200 hover:bg-green-100'
              : coins >= nextLockedHint.cost || hasExtraHintPowerup
              ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
              : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
          )}
        >
          <div className="flex items-center gap-2">
            {nextLockedHint.cost === 0 ? (
              <span className="text-sm font-bold text-green-700">無料 / Free</span>
            ) : (
              <div className="flex items-center gap-1 text-yellow-700">
                <Coins className="w-4 h-4" />
                <span className="font-bold">-{nextLockedHint.cost}</span>
              </div>
            )}
            <span className="text-xs text-muted-foreground">
              ヒント {nextLockedHint.level} を見る / View hint {nextLockedHint.level}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      )}

      {/* All hints unlocked */}
      {unlockedLevels.length === hints.length && (
        <div className="text-center py-2 text-sm text-blue-600">
          ✓ すべてのヒントを表示しました / All hints shown
        </div>
      )}

      {/* Disabled message (challenge mode) */}
      {disabled && (
        <div className="text-center py-2 text-sm text-muted-foreground">
          🚫 ヒントなしモード / No hints mode
        </div>
      )}
    </div>
  );
};

export default SmartHintPanel;
