import { BookOpen, Star, Lock, ChevronRight, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  StoryChapter,
  StoryProgress,
  getAvailableChapters,
} from '@/lib/storyMode';

interface StoryProgressPanelProps {
  chapters: StoryChapter[];
  progress: StoryProgress;
  onSelectChapter: (chapter: StoryChapter) => void;
  compact?: boolean;
}

const StoryProgressPanel = ({
  chapters,
  progress,
  onSelectChapter,
  compact = false,
}: StoryProgressPanelProps) => {
  const availableChapterIds = getAvailableChapters(progress.completedChapters);

  const getChapterStatus = (chapter: StoryChapter) => {
    if (progress.completedChapters.includes(chapter.id)) {
      return 'completed';
    }
    if (availableChapterIds.includes(chapter.id)) {
      return 'available';
    }
    return 'locked';
  };

  const getTotalStars = () => {
    return Object.values(progress.chapterStars).reduce((sum, stars) => sum + stars, 0);
  };

  const getMaxStars = () => chapters.length * 3;

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border-2 border-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl border-2 border-amber-300">
              📖
            </div>
            <div>
              <div className="font-bold text-amber-900">
                ストーリーモード / Story Mode
              </div>
              <div className="text-sm text-amber-600">
                Chapter {progress.completedChapters.length + 1} of {chapters.length}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-300">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="font-bold text-yellow-700">
                {getTotalStars()}/{getMaxStars()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-kid border-2 border-amber-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <div>
              <h3 className="font-bold text-lg">ストーリーモード</h3>
              <p className="text-xs opacity-90">Story Mode Adventure</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            <span className="font-bold">{getTotalStars()}/{getMaxStars()}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-3 bg-amber-50 border-b border-amber-100">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-amber-700 font-medium">
            進捗 / Progress
          </span>
          <span className="text-amber-600">
            {progress.completedChapters.length}/{chapters.length} チャプター
          </span>
        </div>
        <div className="h-3 bg-amber-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-500"
            style={{
              width: `${(progress.completedChapters.length / chapters.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Chapter list */}
      <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
        {chapters.map((chapter, index) => {
          const status = getChapterStatus(chapter);
          const stars = progress.chapterStars[chapter.id] || 0;

          return (
            <button
              key={chapter.id}
              onClick={() => status !== 'locked' && onSelectChapter(chapter)}
              disabled={status === 'locked'}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left',
                status === 'completed' && 'bg-green-50 border-green-200 hover:bg-green-100',
                status === 'available' && 'bg-white border-amber-200 hover:border-amber-400 hover:shadow-md',
                status === 'locked' && 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
              )}
            >
              {/* Chapter number/emoji */}
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0',
                  status === 'completed' && 'bg-green-200 text-green-700',
                  status === 'available' && 'bg-amber-200 text-amber-700',
                  status === 'locked' && 'bg-gray-200 text-gray-500'
                )}
              >
                {status === 'locked' ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  chapter.emoji
                )}
              </div>

              {/* Chapter info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">
                    Ch.{chapter.chapterNumber}
                  </span>
                  {status === 'completed' && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                      完了 / Done
                    </span>
                  )}
                  {status === 'available' && progress.currentChapterId === chapter.id && (
                    <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full animate-pulse">
                      現在 / Now
                    </span>
                  )}
                </div>
                <div className="font-bold text-gray-800 truncate">
                  {chapter.titleJa}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {chapter.titleEn}
                </div>
              </div>

              {/* Stars or arrow */}
              {status === 'completed' ? (
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'w-4 h-4',
                        star <= stars
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200'
                      )}
                    />
                  ))}
                </div>
              ) : status === 'available' ? (
                <ChevronRight className="w-5 h-5 text-amber-400" />
              ) : (
                <Lock className="w-4 h-4 text-gray-300" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      {progress.completedChapters.length === chapters.length && (
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-t border-amber-100 text-center">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
          <p className="font-bold text-amber-800">
            おめでとう！すべてのチャプターをクリア！
          </p>
          <p className="text-sm text-amber-600">
            Congratulations! All chapters completed!
          </p>
        </div>
      )}
    </div>
  );
};

export default StoryProgressPanel;
