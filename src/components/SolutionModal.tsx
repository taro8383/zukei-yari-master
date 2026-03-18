import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Lightbulb, Calculator, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface SolutionStep {
  stepNumber: number;
  titleJa: string;
  titleEn: string;
  explanationJa: string;
  explanationEn: string;
  calculation?: string;
  highlight?: string;
  visual?: 'breakdown' | 'addition' | 'multiplication' | 'division' | 'geometry' | 'formula';
}

export interface SolutionData {
  questionTextJa: string;
  questionTextEn: string;
  answer: number | string;
  unit?: string;
  steps: SolutionStep[];
  tipJa?: string;
  tipEn?: string;
}

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: SolutionData | null;
  userAnswer?: string | number;
}

const SolutionModal = ({ isOpen, onClose, solution, userAnswer }: SolutionModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setShowAllSteps(false);
    }
  }, [isOpen]);

  if (!isOpen || !solution) return null;

  const { steps, questionTextJa, questionTextEn, answer, unit, tipJa, tipEn } = solution;
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
      setIsAnimating(false);
    }, 200);
  };

  const handlePrev = () => {
    if (isAnimating || isFirstStep) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsAnimating(false);
    }, 200);
  };

  const handleShowAll = () => {
    setShowAllSteps(true);
  };

  const renderStepVisual = (step: SolutionStep, isSmall: boolean = false) => {
    const sizeClass = isSmall ? 'text-sm' : 'text-lg';
    const paddingClass = isSmall ? 'p-3' : 'p-4';

    switch (step.visual) {
      case 'breakdown':
        return (
          <div className={cn('bg-blue-50 rounded-lg border-2 border-blue-200', paddingClass)}>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {step.highlight?.split(' + ').map((part, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={cn('font-mono font-bold text-blue-700', sizeClass)}>{part}</span>
                  {i < (step.highlight?.split(' + ').length || 0) - 1 && (
                    <span className="text-blue-400 font-bold">+</span>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-2 text-sm text-blue-600">
              くばり算 / Breaking apart
            </div>
          </div>
        );

      case 'multiplication':
        return (
          <div className={cn('bg-green-50 rounded-lg border-2 border-green-200', paddingClass)}>
            <div className="flex items-center justify-center gap-3">
              <div className="text-center">
                <div className={cn('font-mono font-bold text-green-700', sizeClass)}>{step.calculation?.split(' = ')[0]}</div>
              </div>
              <span className="text-green-400 font-bold">=</span>
              <div className={cn('font-mono font-bold text-green-800 bg-white px-3 py-1 rounded', sizeClass)}>
                {step.calculation?.split(' = ')[1]}
              </div>
            </div>
          </div>
        );

      case 'addition':
        return (
          <div className={cn('bg-amber-50 rounded-lg border-2 border-amber-200', paddingClass)}>
            <div className="flex items-center justify-center gap-3">
              <span className={cn('font-mono text-amber-700', sizeClass)}>{step.calculation?.split(' = ')[0]}</span>
              <span className="text-amber-400 font-bold">=</span>
              <span className={cn('font-mono font-bold text-amber-800 bg-white px-3 py-1 rounded', sizeClass)}>
                {step.calculation?.split(' = ')[1]}
              </span>
            </div>
          </div>
        );

      case 'division':
        return (
          <div className={cn('bg-purple-50 rounded-lg border-2 border-purple-200', paddingClass)}>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className={cn('font-mono font-bold text-purple-700', sizeClass)}>{step.calculation}</div>
                <div className="text-xs text-purple-500 mt-1">わり算 / Division</div>
              </div>
            </div>
          </div>
        );

      case 'formula':
        return (
          <div className={cn('bg-indigo-50 rounded-lg border-2 border-indigo-200', paddingClass)}>
            <div className="text-center">
              <div className={cn('font-mono font-bold text-indigo-700', sizeClass)}>{step.calculation}</div>
              <div className="text-xs text-indigo-500 mt-1">けいさんしき / Formula</div>
            </div>
          </div>
        );

      case 'geometry':
        return (
          <div className={cn('bg-rose-50 rounded-lg border-2 border-rose-200', paddingClass)}>
            <div className="text-center">
              <div className={cn('font-mono font-bold text-rose-700', sizeClass)}>{step.calculation}</div>
              <div className="text-xs text-rose-500 mt-1">ずけい / Geometry</div>
            </div>
          </div>
        );

      default:
        return step.calculation ? (
          <div className={cn('bg-gray-50 rounded-lg border-2 border-gray-200', paddingClass)}>
            <div className={cn('font-mono font-bold text-gray-700 text-center', sizeClass)}>
              {step.calculation}
            </div>
          </div>
        ) : null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">とけかた / Solution</h2>
              <p className="text-white/80 text-sm">Step-by-step explanation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Question Display */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 border-l-4 border-blue-500">
            <div className="text-sm text-gray-500 mb-1">もんだい / Question:</div>
            <div className="text-lg font-bold text-gray-800">{questionTextJa}</div>
            <div className="text-sm text-gray-600">{questionTextEn}</div>
            {userAnswer !== undefined && (
              <div className="mt-2 text-sm">
                <span className="text-red-500">あなたのこたえ / Your answer: {userAnswer}</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'flex-1 h-2 rounded-full transition-all duration-300',
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-200',
                  showAllSteps && 'bg-green-500'
                )}
              />
            ))}
          </div>

          {/* Step Display or All Steps */}
          {!showAllSteps ? (
            <div className={cn('transition-all duration-200', isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0')}>
              {/* Step Number Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">{currentStepData.stepNumber}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{currentStepData.titleJa}</h3>
                  <p className="text-sm text-gray-600">{currentStepData.titleEn}</p>
                </div>
              </div>

              {/* Visual Representation */}
              {renderStepVisual(currentStepData)}

              {/* Explanation */}
              <div className="mt-4 bg-blue-50/50 rounded-lg p-4">
                <p className="text-gray-800">{currentStepData.explanationJa}</p>
                <p className="text-sm text-gray-600 mt-1">{currentStepData.explanationEn}</p>
              </div>

              {/* Final Answer Display */}
              {isLastStep && (
                <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-800">こたえ / Answer</span>
                  </div>
                  <div className="text-2xl font-bold text-green-700 text-center">
                    {answer} {unit}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Show All Steps View */
            <div className="space-y-4 animate-in fade-in">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                      {step.stepNumber}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-800">{step.titleJa}</div>
                      <div className="text-xs text-gray-500">{step.titleEn}</div>
                    </div>
                  </div>
                  {renderStepVisual(step, true)}
                  <p className="text-sm text-gray-600 mt-2">{step.explanationJa}</p>
                </div>
              ))}

              {/* Final Answer */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-800">こたえ / Answer</span>
                </div>
                <div className="text-2xl font-bold text-green-700 text-center">
                  {answer} {unit}
                </div>
              </div>
            </div>
          )}

          {/* Learning Tip */}
          {tipJa && (isLastStep || showAllSteps) && (
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-amber-800">ポイント / Tip</span>
              </div>
              <p className="text-amber-900">{tipJa}</p>
              <p className="text-sm text-amber-700 mt-1">{tipEn}</p>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="bg-gray-50 p-4 border-t flex items-center justify-between">
          <div className="flex gap-2">
            {!showAllSteps && (
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={isFirstStep}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                まえへ / Prev
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {!showAllSteps && (
              <Button
                variant="ghost"
                onClick={handleShowAll}
                className="text-gray-600"
              >
                ぜんぶ見る / Show All
              </Button>
            )}

            {!showAllSteps && (
              <Button
                onClick={handleNext}
                disabled={isLastStep}
                className={cn(
                  'flex items-center gap-1 bg-blue-500 hover:bg-blue-600',
                  isLastStep && 'opacity-50 cursor-not-allowed'
                )}
              >
                つぎへ / Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}

            {(isLastStep || showAllSteps) && (
              <Button
                onClick={onClose}
                className="bg-green-500 hover:bg-green-600"
              >
                わかった！ / Got it!
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionModal;
