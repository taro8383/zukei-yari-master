import { useEffect } from 'react';
import { Calendar, ChevronRight, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DailyEpisode } from '@/lib/storyMode';

interface DailyEpisodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  episode: DailyEpisode | null;
  isCompleted?: boolean;
}

const DailyEpisodeModal = ({
  isOpen,
  onClose,
  onStart,
  episode,
  isCompleted = false,
}: DailyEpisodeModalProps) => {
  if (!episode) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-b from-purple-50 to-pink-50 border-4 border-purple-200">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center gap-2 text-purple-800">
              <Calendar className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wide">Daily Episode</span>
            </div>
            <div className="mt-2">
              <span className="text-4xl mr-2">{episode.emoji}</span>
              <span className="text-2xl font-bold text-purple-900 block mt-1">
                {episode.titleJa}
              </span>
              <span className="text-sm text-purple-600">
                {episode.titleEn}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Date badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm border border-gray-200">
            <Clock className="w-3 h-3" />
            <span>{new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Narration */}
        <div className="bg-white/80 rounded-2xl p-5 shadow-inner border-2 border-purple-100">
          <p className="text-lg font-medium text-purple-900 text-center leading-relaxed">
            {episode.narrationJa}
          </p>
          <p className="text-sm text-purple-600 mt-2 text-center italic">
            {episode.narrationEn}
          </p>
        </div>

        {/* Challenge details */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
            <div className="text-2xl mb-1">📝</div>
            <div className="text-xs text-gray-500">問題数</div>
            <div className="font-bold text-gray-700">{episode.questionCount}問</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-3 text-center shadow-sm border border-yellow-200">
            <div className="text-2xl mb-1">🪙</div>
            <div className="text-xs text-yellow-600">報酬</div>
            <div className="font-bold text-yellow-700">+{episode.rewardCoins}</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center shadow-sm border border-purple-200">
            <div className="text-2xl mb-1">✨</div>
            <div className="text-xs text-purple-600">ボーナス</div>
            <div className="font-bold text-purple-700">経験値</div>
          </div>
        </div>

        {/* Topics covered */}
        <div className="flex flex-wrap justify-center gap-2">
          {episode.topicIds.map((topicId) => (
            <span
              key={topicId}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
            >
              {topicId === 'large-numbers' && '大きな数'}
              {topicId === 'calculation-rules' && '計算のルール'}
              {topicId === 'geometry' && '図形'}
              {topicId === 'division' && 'わり算'}
              {topicId === 'ratios' && '比率'}
              {topicId === 'fractions' && '分数'}
              {topicId === 'decimals' && '小数'}
              {topicId === 'line-graphs' && 'グラフ'}
              {topicId === 'investigating-changes' && '変化の調べ方'}
              {topicId === 'accuracy-rate' && '正確度'}
            </span>
          ))}
        </div>

        {/* Completion status */}
        {isCompleted && (
          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200 text-center">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-1" />
            <p className="font-bold text-green-700">本日はクリア済み！</p>
            <p className="text-sm text-green-600">Already completed today!</p>
            <p className="text-xs text-gray-500 mt-2">
              明日のエピソードをお楽しみに！ / Come back tomorrow!
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            className="flex-1 border-gray-300"
          >
            閉じる / Close
          </Button>

          {!isCompleted && (
            <Button
              variant="default"
              size="lg"
              onClick={onStart}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              <span>チャレンジ / Start</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyEpisodeModal;
