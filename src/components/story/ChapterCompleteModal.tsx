import { useEffect } from 'react';
import { Trophy, Star, ChevronRight, RotateCcw, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import confetti from 'canvas-confetti';
import { StoryChapter } from '@/lib/storyMode';

interface ChapterCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  onRetry: () => void;
  chapter: StoryChapter | null;
  stars: number;
  correctCount: number;
  totalQuestions: number;
}

const ChapterCompleteModal = ({
  isOpen,
  onClose,
  onContinue,
  onRetry,
  chapter,
  stars,
  correctCount,
  totalQuestions,
}: ChapterCompleteModalProps) => {
  // Trigger confetti on open
  useEffect(() => {
    if (isOpen && stars > 0) {
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#fbbf24', '#f59e0b', '#d97706'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#fbbf24', '#f59e0b', '#d97706'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isOpen, stars]);

  if (!chapter) return null;

  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const narrationIndex = stars >= 2 ? 0 : stars === 1 ? 1 : 2;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-b from-yellow-50 to-amber-50 border-4 border-yellow-300">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="text-5xl mb-2">🎉</div>
            <div className="text-2xl font-black text-amber-800">
              チャプター完了！
            </div>
            <div className="text-sm text-amber-600">
              Chapter Complete!
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Chapter info */}
        <div className="text-center py-2">
          <div className="text-4xl mb-1">{chapter.emoji}</div>
          <div className="font-bold text-amber-900">{chapter.titleJa}</div>
          <div className="text-xs text-amber-600">{chapter.titleEn}</div>
        </div>

        {/* Stars display */}
        <div className="flex justify-center gap-2 py-4">
          {[1, 2, 3].map((star) => (
            <div
              key={star}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                star <= stars
                  ? 'bg-yellow-300 scale-100 animate-pulse'
                  : 'bg-gray-200 scale-90'
              }`}
              style={{
                animationDelay: star <= stars ? `${star * 200}ms` : '0ms',
              }}
            >
              <Star
                className={`w-8 h-8 ${
                  star <= stars
                    ? 'fill-yellow-600 text-yellow-600'
                    : 'fill-gray-300 text-gray-300'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Performance message */}
        <div className="text-center mb-4">
          <div className="text-lg font-bold text-amber-800">
            {stars === 3
              ? 'かんぺき！マスターだ！'
              : stars === 2
              ? 'よくできた！もう少し！'
              : stars === 1
              ? 'がんばったね！'
              : 'もう一度挑戦しよう！'}
          </div>
          <div className="text-sm text-amber-600">
            {stars === 3
              ? 'Perfect! You are a master!'
              : stars === 2
              ? 'Great job! Almost there!'
              : stars === 1
              ? 'Good effort!'
              : 'Try again!'}
          </div>
          <div className="text-sm font-medium text-amber-700 mt-1">
            {correctCount}/{totalQuestions} せいかい ({accuracy}%)
          </div>
        </div>

        {/* Narration */}
        {stars > 0 && (
          <div className="bg-white/80 rounded-xl p-4 border-2 border-amber-200 mb-4">
            <p className="text-amber-900 text-center font-medium leading-relaxed">
              "{chapter.completion.narrationJa[narrationIndex] || chapter.completion.narrationJa[0]}"
            </p>
            <p className="text-amber-600 text-center text-sm mt-2 italic">
              "{chapter.completion.narrationEn[narrationIndex] || chapter.completion.narrationEn[0]}"
            </p>
          </div>
        )}

        {/* Rewards */}
        {stars > 0 && (
          <div className="flex justify-center gap-4 mb-4">
            <div className="bg-yellow-100 rounded-xl px-4 py-2 border-2 border-yellow-300">
              <span className="text-2xl mr-1">🪙</span>
              <span className="font-bold text-yellow-700">
                +{chapter.completion.rewardCoins} コイン
              </span>
            </div>
          </div>
        )}

        {/* Unlocks info */}
        {stars > 0 && chapter.completion.unlocksNext.length > 0 && (
          <div className="bg-blue-50 rounded-xl p-3 border-2 border-blue-200 mb-4">
            <div className="text-center text-sm text-blue-700">
              <span className="font-bold">新しいエリアが解放されました！</span>
              <br />
              <span className="text-xs">New area unlocked!</span>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {stars < 3 && (
            <Button
              variant="outline"
              size="lg"
              onClick={onRetry}
              className="flex-1 border-amber-300 text-amber-700"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              <div className="flex flex-col items-start leading-tight">
                <span>もう一度</span>
                <span className="text-xs opacity-80">Try Again</span>
              </div>
            </Button>
          )}

          <Button
            variant="default"
            size="lg"
            onClick={onContinue}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
          >
            <div className="flex flex-col items-start leading-tight">
              <span>つぎへ</span>
              <span className="text-xs opacity-80">Continue</span>
            </div>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChapterCompleteModal;
