import { useState } from 'react';
import { getTermById, VOCABULARY_TERMS } from '@/lib/vocabulary';
import VocabularyModal from './VocabularyModal';
import { cn } from '@/lib/utils';

interface ClickableMathTermProps {
  termId: string;
  children: React.ReactNode;
  className?: string;
  showUnderline?: boolean;
}

/**
 * ClickableMathTerm - Makes math terms clickable to show vocabulary definitions
 *
 * Usage:
 * <ClickableMathTerm termId="divisor">わる数</ClickableMathTerm>
 * <ClickableMathTerm termId="perimeter" showUnderline>周りの長さ</ClickableMathTerm>
 */
export const ClickableMathTerm = ({
  termId,
  children,
  className,
  showUnderline = true,
}: ClickableMathTermProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const term = getTermById(termId);

  // If term doesn't exist in vocabulary, render as plain text
  if (!term) {
    return <span className={className}>{children}</span>;
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md',
          'bg-indigo-50 hover:bg-indigo-100 text-indigo-700',
          'transition-colors font-medium',
          showUnderline && 'border-b-2 border-indigo-300 hover:border-indigo-400',
          className
        )}
        title={`${term.termJa} - タップして意味を見る / Tap to see definition`}
      >
        <span className="text-sm">{term.emoji}</span>
        <span>{children}</span>
      </button>

      <VocabularyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTermId={termId}
      />
    </>
  );
};

interface InlineVocabularyHintProps {
  termIds?: string[];
  className?: string;
}

/**
 * InlineVocabularyHint - Shows small vocabulary hints inline
 * Can be used in explanation panels to show relevant terms
 */
export const InlineVocabularyHint = ({
  termIds = [],
  className,
}: InlineVocabularyHintProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTermId, setSelectedTermId] = useState<string | undefined>();

  // Get valid terms
  const terms = termIds
    .map(id => getTermById(id))
    .filter(Boolean);

  if (terms.length === 0) return null;

  const handleTermClick = (termId: string) => {
    setSelectedTermId(termId);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={cn('flex flex-wrap items-center gap-2 mt-3', className)}>
        <span className="text-xs text-muted-foreground">
          📖 わからないことば:
        </span>
        {terms.map((term) => (
          <button
            key={term!.id}
            onClick={() => handleTermClick(term!.id)}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-full text-xs transition-colors"
          >
            <span>{term!.emoji}</span>
            <span>{term!.termJa}</span>
          </button>
        ))}
      </div>

      <VocabularyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTermId={selectedTermId}
      />
    </>
  );
};

interface VocabularyButtonProps {
  className?: string;
  variant?: 'icon' | 'button';
}

/**
 * VocabularyButton - A button to open the vocabulary library
 * Can be used in headers or toolbars
 */
export const VocabularyButton = ({
  className,
  variant = 'icon',
}: VocabularyButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-lg',
            'bg-gradient-to-br from-indigo-100 to-purple-100',
            'border border-indigo-200 hover:scale-105 transition-transform',
            className
          )}
          title="算数のことば / Math Vocabulary"
        >
          <span className="text-xl">📖</span>
        </button>
        <VocabularyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg',
          'bg-gradient-to-r from-indigo-500 to-purple-500',
          'text-white font-medium hover:opacity-90 transition-opacity',
          className
        )}
      >
        <span className="text-xl">📖</span>
        <span className="text-sm">算数のことば</span>
      </button>
      <VocabularyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ClickableMathTerm;
