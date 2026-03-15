import { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StoryChapter } from '@/lib/storyMode';

interface ChapterIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  chapter: StoryChapter | null;
}

const ChapterIntroModal = ({
  isOpen,
  onClose,
  onStart,
  chapter,
}: ChapterIntroModalProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Reset page when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
    }
  }, [isOpen]);

  if (!chapter) return null;

  const totalPages = chapter.intro.narrationJa.length + 1; // +1 for objective page
  const isLastPage = currentPage === totalPages - 1;
  const isObjectivePage = currentPage === chapter.intro.narrationJa.length;

  const handleNext = () => {
    if (isLastPage) {
      onStart();
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    onStart();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-200">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center gap-2 text-amber-800">
              <BookOpen className="w-6 h-6" />
              <span className="text-lg">Chapter {chapter.chapterNumber}</span>
            </div>
            <div className="mt-2">
              <span className="text-3xl mr-2">{chapter.emoji}</span>
              <span className="text-xl font-bold text-amber-900">
                {chapter.titleJa}
              </span>
              <span className="text-sm text-amber-600 block mt-1">
                {chapter.titleEn}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Story Content */}
        <div className="py-6">
          {!isObjectivePage ? (
            // Narration pages
            <div className="space-y-4">
              <div className="bg-white/80 rounded-2xl p-6 shadow-inner border-2 border-amber-100">
                <p className="text-lg font-medium text-amber-900 leading-relaxed text-center">
                  "{chapter.intro.narrationJa[currentPage]}"
                </p>
                <p className="text-sm text-amber-600 mt-3 text-center italic">
                  "{chapter.intro.narrationEn[currentPage]}"
                </p>
              </div>

              {/* Character illustration placeholder */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center text-4xl shadow-inner">
                  {currentPage === 0 ? '🧒' : currentPage === 1 ? '🏰' : currentPage === 2 ? '🦊' : '✨'}
                </div>
              </div>
            </div>
          ) : (
            // Objective page
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-inner border-2 border-blue-200">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">
                    ミッション / Mission
                  </span>
                </div>
                <p className="text-lg font-bold text-blue-900 text-center">
                  {chapter.intro.objectiveJa}
                </p>
                <p className="text-sm text-blue-600 mt-2 text-center">
                  {chapter.intro.objectiveEn}
                </p>
              </div>

              {/* Challenge stats */}
              <div className="flex justify-center gap-4">
                <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                  <span className="text-2xl mr-1">📝</span>
                  <span className="font-bold text-gray-700">
                    {chapter.intro.questionCount} 問 / questions
                  </span>
                </div>
                <div className="bg-yellow-100 rounded-xl px-4 py-2 shadow-sm border border-yellow-300">
                  <span className="text-2xl mr-1">🪙</span>
                  <span className="font-bold text-yellow-700">
                    +{chapter.completion.rewardCoins} コイン
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentPage
                  ? 'bg-amber-500 w-6'
                  : 'bg-amber-200 hover:bg-amber-300'
              }`}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            className="flex-1 border-gray-300"
          >
            <X className="w-4 h-4 mr-1" />
            <span>やめる / Cancel</span>
          </Button>

          {!isLastPage && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleSkip}
              className="flex-1 border-amber-300 text-amber-700"
            >
              <span>スキップ / Skip</span>
            </Button>
          )}

          <Button
            variant="default"
            size="lg"
            onClick={handleNext}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
          >
            <span>{isLastPage ? 'はじめる / Start' : 'つぎへ / Next'}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChapterIntroModal;
