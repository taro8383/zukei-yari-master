import { useState } from 'react';
import { Zap, EyeOff, Clock, Timer, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChallengeModes {
  speedMode: boolean;
  noHints: boolean;
}

interface ChallengeModeSelectorProps {
  modes: ChallengeModes;
  onChange: (modes: ChallengeModes) => void;
  disabled?: boolean;
}

interface ModeOption {
  id: keyof ChallengeModes;
  icon: React.ReactNode;
  nameJa: string;
  nameEn: string;
  descriptionJa: string;
  descriptionEn: string;
  color: string;
  reward: string;
}

const modeOptions: ModeOption[] = [
  {
    id: 'speedMode',
    icon: <Zap className="w-5 h-5" />,
    nameJa: 'スピードモード',
    nameEn: 'Speed Mode',
    descriptionJa: '1問30秒でこたえよう！',
    descriptionEn: '30 seconds per question',
    color: 'from-orange-400 to-red-500',
    reward: '×2 コイン',
  },
  {
    id: 'noHints',
    icon: <EyeOff className="w-5 h-5" />,
    nameJa: 'ヒントなし',
    nameEn: 'No Hints',
    descriptionJa: 'ヒントをつかわずにこたえよう！',
    descriptionEn: 'Complete without hints',
    color: 'from-purple-400 to-indigo-500',
    reward: '+10 コイン',
  },
];

const ChallengeModeSelector = ({ modes, onChange, disabled }: ChallengeModeSelectorProps) => {
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const toggleMode = (modeId: keyof ChallengeModes) => {
    if (disabled) return;
    onChange({
      ...modes,
      [modeId]: !modes[modeId],
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Timer className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-lg">チャレンジモード / Challenge Modes</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        もうしょをえらんでコインをゲットしよう！ / Choose challenges to earn bonus coins!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {modeOptions.map((mode) => (
          <button
            key={mode.id}
            onClick={() => toggleMode(mode.id)}
            disabled={disabled}
            className={cn(
              'relative flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left',
              modes[mode.id]
                ? `bg-gradient-to-r ${mode.color} text-white border-transparent shadow-kid`
                : 'bg-muted/50 border-border hover:border-primary/50'
            )}
          >
            <div
              className={cn(
                'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
                modes[mode.id] ? 'bg-white/20' : 'bg-background'
              )}
            >
              {mode.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold">{mode.nameJa}</span>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-bold',
                    modes[mode.id] ? 'bg-white/30' : 'bg-yellow-100 text-yellow-700'
                  )}
                >
                  {mode.reward}
                </span>
              </div>
              <p className={cn('text-sm', modes[mode.id] ? 'text-white/80' : 'text-muted-foreground')}>
                {mode.nameEn}
              </p>
              <p className={cn('text-xs mt-1', modes[mode.id] ? 'text-white/70' : 'text-muted-foreground/70')}>
                {mode.descriptionJa}
              </p>
            </div>

            {/* Check indicator */}
            <div
              className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                modes[mode.id]
                  ? 'bg-white border-white'
                  : 'border-muted-foreground/30'
              )}
            >
              {modes[mode.id] && (
                <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Speed mode timer preview */}
      {modes.speedMode && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-3">
          <Clock className="w-5 h-5 text-orange-500" />
          <div>
            <p className="text-sm font-bold text-orange-700">
              ⏱️ 1問30秒 / 30 seconds per question
            </p>
            <p className="text-xs text-orange-600">
              時間内にこたえないと自動的に次の問題へ / Questions auto-advance after 30 seconds
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeModeSelector;
