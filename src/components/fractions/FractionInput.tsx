import React from 'react';
import { cn } from '@/lib/utils';

interface FractionInputProps {
  numerator: number | '';
  denominator: number | '';
  wholeNumber?: number | '';
  onNumeratorChange: (val: string) => void;
  onDenominatorChange: (val: string) => void;
  onWholeNumberChange?: (val: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: {
    input: 'w-12 h-8 text-base',
    wholeNumber: 'w-12 h-[72px]',
    container: 'gap-2',
  },
  md: {
    input: 'w-16 h-10 text-lg',
    wholeNumber: 'w-16 h-[88px]',
    container: 'gap-3',
  },
  lg: {
    input: 'w-20 h-12 text-xl',
    wholeNumber: 'w-20 h-[104px]',
    container: 'gap-4',
  },
};

export const FractionInput: React.FC<FractionInputProps> = ({
  numerator,
  denominator,
  wholeNumber,
  onNumeratorChange,
  onDenominatorChange,
  onWholeNumberChange,
  disabled = false,
  size = 'md',
}) => {
  const sizes = sizeClasses[size];
  const hasWholeNumber = wholeNumber !== undefined && onWholeNumberChange !== undefined;

  const handleInputChange = (callback: (val: string) => void) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // Allow empty string or valid numbers
    if (value === '' || /^\d*$/.test(value)) {
      callback(value);
    }
  };

  const inputBaseClasses = cn(
    'border-2 border-input rounded-lg text-center font-kid',
    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
    'transition-all duration-200',
    'placeholder:text-muted-foreground/50',
    disabled && 'opacity-60 cursor-not-allowed'
  );

  return (
    <div className={cn('flex items-center', sizes.container)}>
      {/* Whole Number Input (for mixed numbers) */}
      {hasWholeNumber && (
        <input
          type="text"
          inputMode="numeric"
          value={wholeNumber}
          onChange={handleInputChange(onWholeNumberChange!)}
          disabled={disabled}
          className={cn(inputBaseClasses, sizes.wholeNumber)}
          placeholder=""
          aria-label="Whole number"
        />
      )}

      {/* Fraction Stack */}
      <div className="flex flex-col items-center">
        {/* Numerator */}
        <input
          type="text"
          inputMode="numeric"
          value={numerator}
          onChange={handleInputChange(onNumeratorChange)}
          disabled={disabled}
          className={cn(inputBaseClasses, sizes.input)}
          placeholder=""
          aria-label="Numerator"
        />

        {/* Fraction Bar */}
        <div className="w-full border-b-2 border-foreground my-1" style={{ width: size === 'sm' ? '48px' : size === 'md' ? '64px' : '80px' }} />

        {/* Denominator */}
        <input
          type="text"
          inputMode="numeric"
          value={denominator}
          onChange={handleInputChange(onDenominatorChange)}
          disabled={disabled}
          className={cn(inputBaseClasses, sizes.input)}
          placeholder=""
          aria-label="Denominator"
        />
      </div>
    </div>
  );
};

export default FractionInput;
