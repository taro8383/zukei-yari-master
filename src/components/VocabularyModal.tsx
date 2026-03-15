import { useState, useMemo } from 'react';
import { X, Search, BookOpen, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  VOCABULARY_TERMS,
  CATEGORY_LABELS,
  getTermsByCategory,
  searchTerms,
  VocabularyTerm,
} from '@/lib/vocabulary';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTermId?: string;
}

export const VocabularyModal = ({ isOpen, onClose, initialTermId }: VocabularyModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VocabularyTerm['category'] | 'all'>('all');
  const [selectedTerm, setSelectedTerm] = useState<VocabularyTerm | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // Reset state when modal opens
  useMemo(() => {
    if (isOpen && initialTermId) {
      const term = VOCABULARY_TERMS.find(t => t.id === initialTermId);
      if (term) {
        setSelectedTerm(term);
        setShowDetail(true);
      }
    }
  }, [isOpen, initialTermId]);

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    let terms = VOCABULARY_TERMS;

    if (selectedCategory !== 'all') {
      terms = getTermsByCategory(selectedCategory);
    }

    if (searchQuery.trim()) {
      terms = searchTerms(searchQuery).filter(term =>
        selectedCategory === 'all' || term.category === selectedCategory
      );
    }

    return terms;
  }, [searchQuery, selectedCategory]);

  // Group terms by category for display
  const groupedTerms = useMemo(() => {
    const groups: Record<string, VocabularyTerm[]> = {};
    filteredTerms.forEach(term => {
      if (!groups[term.category]) {
        groups[term.category] = [];
      }
      groups[term.category].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const handleTermClick = (term: VocabularyTerm) => {
    setSelectedTerm(term);
    setShowDetail(true);
  };

  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedTerm(null);
  };

  const navigateTerm = (direction: 'prev' | 'next') => {
    if (!selectedTerm) return;

    const currentIndex = filteredTerms.findIndex(t => t.id === selectedTerm.id);
    let newIndex: number;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredTerms.length - 1;
    } else {
      newIndex = currentIndex < filteredTerms.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedTerm(filteredTerms[newIndex]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl shadow-kid max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-indigo-50 to-purple-100 p-6 border-b border-border">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
              <BookOpen className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-xl font-black text-foreground">
                📖 算数のことば
              </h2>
              <p className="text-sm text-muted-foreground">
                Math Vocabulary Cards
              </p>
            </div>
          </div>

          {!showDetail && (
            <>
              {/* Search */}
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="ことばをさがす / Search terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white/80 border-0"
                />
              </div>

              {/* Category Filter */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                    selectedCategory === 'all'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white/60 hover:bg-white text-muted-foreground'
                  )}
                >
                  すべて / All
                </button>
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key as VocabularyTerm['category'])}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                      selectedCategory === key
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/60 hover:bg-white text-muted-foreground'
                    )}
                  >
                    {label.emoji} {label.ja}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {!showDetail ? (
            /* Term List */
            <div className="p-4 space-y-4">
              {Object.entries(groupedTerms).map(([category, terms]) => (
                <div key={category}>
                  <h3 className="text-sm font-bold text-muted-foreground mb-2 flex items-center gap-2">
                    <span className="text-lg">{CATEGORY_LABELS[category as VocabularyTerm['category']].emoji}</span>
                    {CATEGORY_LABELS[category as VocabularyTerm['category']].ja}
                    <span className="text-xs font-normal text-muted-foreground">
                      ({terms.length})
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {terms.map((term) => (
                      <button
                        key={term.id}
                        onClick={() => handleTermClick(term)}
                        className="text-left p-3 bg-muted/50 hover:bg-indigo-50 rounded-xl transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{term.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm group-hover:text-indigo-600 transition-colors">
                              {term.termJa}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {term.termEn}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {term.simpleDefinitionJa}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {filteredTerms.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-lg mb-2">🔍</p>
                  <p className="text-sm">みつかりませんでした</p>
                  <p className="text-xs">No terms found</p>
                </div>
              )}
            </div>
          ) : (
            /* Term Detail Card */
            selectedTerm && (
              <div className="p-6 space-y-5 animate-in slide-in-from-right-4">
                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToList}
                    className="text-muted-foreground"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    一覧に戻る / Back
                  </Button>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => navigateTerm('prev')}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => navigateTerm('next')}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Main Card */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6">
                  {/* Term Header */}
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">{selectedTerm.emoji}</div>
                    <h3 className="text-2xl font-black text-foreground">
                      {selectedTerm.termJa}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {selectedTerm.termEn}
                    </p>
                  </div>

                  {/* Simple Definition */}
                  <div className="bg-white/70 rounded-xl p-4 mb-4">
                    <p className="text-sm font-bold text-indigo-600 mb-1">
                      ✨ かんたんにいうと
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {selectedTerm.simpleDefinitionJa}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedTerm.simpleDefinitionEn}
                    </p>
                  </div>

                  {/* Detailed Definition */}
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-indigo-600">
                      📚 もっと詳しく
                    </p>
                    <p className="text-sm text-foreground">
                      {selectedTerm.detailedDefinitionJa}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedTerm.detailedDefinitionEn}
                    </p>
                  </div>
                </div>

                {/* Example Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                  <p className="text-sm font-bold text-blue-600 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    例えば / For example
                  </p>

                  <div className="bg-white rounded-xl p-4">
                    <p className="text-base font-medium text-foreground mb-1">
                      {selectedTerm.exampleJa}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedTerm.exampleEn}
                    </p>

                    {selectedTerm.exampleVisual && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-lg text-center">
                        <p className="text-sm font-mono whitespace-pre-line">
                          {selectedTerm.exampleVisual}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Related Terms */}
                {selectedTerm.relatedTerms.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-muted-foreground mb-2">
                      🔗 関連することば / Related Terms
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTerm.relatedTerms.map((relatedId) => {
                        const related = VOCABULARY_TERMS.find(t => t.id === relatedId);
                        if (!related) return null;
                        return (
                          <button
                            key={relatedId}
                            onClick={() => setSelectedTerm(related)}
                            className="px-3 py-1.5 bg-muted hover:bg-indigo-100 rounded-full text-xs font-medium transition-colors"
                          >
                            {related.emoji} {related.termJa}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className="flex justify-center">
                  <span className="px-4 py-1.5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium">
                    {CATEGORY_LABELS[selectedTerm.category].emoji} {CATEGORY_LABELS[selectedTerm.category].ja} / {CATEGORY_LABELS[selectedTerm.category].en}
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        {!showDetail && (
          <div className="p-4 border-t border-border bg-muted/30">
            <p className="text-xs text-center text-muted-foreground">
              💡 わからないことばがでてきたら、ここで調べてみよう！
              <br />
              Tap any math term in questions to see its definition!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyModal;
