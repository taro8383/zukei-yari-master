import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GhostBannerProps {
  ghostBest: { score: number; totalQuestions: number; timeSeconds: number } | null;
  sessionStartTime: number | null;
}

const GhostBanner = ({ ghostBest, sessionStartTime }: GhostBannerProps) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!sessionStartTime) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  if (!ghostBest || !sessionStartTime) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const progress = Math.min(elapsed / ghostBest.timeSeconds, 1);
  const isAhead = elapsed < ghostBest.timeSeconds;

  return (
    <div className="mb-4 p-3 rounded-xl border-2 border-teal-300 bg-teal-50 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-teal-700 text-sm">
          👻 ベスト: {ghostBest.score}/{ghostBest.totalQuestions} in {formatTime(ghostBest.timeSeconds)}
        </span>
        <span className={cn('text-sm font-bold', isAhead ? 'text-green-600' : 'text-red-500')}>
          {formatTime(elapsed)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            isAhead ? 'bg-green-500' : 'bg-red-500',
          )}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <p className="text-xs mt-1 text-center font-medium">
        {isAhead ? (
          <span className="text-green-600">がんばれ！ / Go for it!</span>
        ) : (
          <span className="text-red-500">おくれてる！でもあきらめないで！ / Behind — keep going!</span>
        )}
      </p>
    </div>
  );
};

export default GhostBanner;
