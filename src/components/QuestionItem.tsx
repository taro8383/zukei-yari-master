import { Question } from '@/lib/geometry';
import GeometryDiagram from '@/components/GeometryDiagram';
import {
  IntersectingLinesExercise,
  DottedPaperQuadrilateral,
  DiagonalsDrawing,
} from '@/components/exercises';
import {
  DiagonalsExplanation,
  IntersectingLinesExplanation,
  QuadrilateralExplanation,
  DiagonalsDrawingExplanation,
} from '@/components/explanations';
import ConceptExplanation from '@/components/ConceptExplanation';

interface QuestionItemProps {
  question: Question;
  index: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  graded: boolean;
  isCorrect?: boolean;
}

const QuestionItem = ({
  question,
  index,
  userAnswer,
  onAnswerChange,
  graded,
  isCorrect,
}: QuestionItemProps) => {
  const { diagram } = question;

  // Render interactive exercises based on diagram type
  const renderInteractiveExercise = () => {
    switch (diagram.type) {
      case 'intersecting-lines-interactive':
        return (
          <IntersectingLinesExercise
            givenAngle={diagram.params.givenAngle}
            rotation={diagram.params.rotation}
            onAnswerSubmit={(answers) => {
              // Mark as answered when both answers are submitted
              const isCorrectAnswer =
                answers.angleB === 180 - diagram.params.givenAngle &&
                answers.comparison === 'eq';
              onAnswerChange(isCorrectAnswer ? '1' : '0');
            }}
            graded={graded}
            isCorrect={isCorrect}
            correctAnswer={180 - diagram.params.givenAngle}
          />
        );

      case 'dotted-paper-quadrilateral': {
        // Map numeric requiredType to string (0=rectangle, 1=square, 2=trapezoid, 3=parallelogram, 4=rhombus, 5=kite)
        const typeMap: Record<number, string> = {
          0: 'rectangle',
          1: 'square',
          2: 'trapezoid',
          3: 'parallelogram',
          4: 'rhombus',
          5: 'kite',
        };
        const requiredType = (typeMap[diagram.params.requiredType] || 'any') as 'rectangle' | 'square' | 'trapezoid' | 'parallelogram' | 'rhombus' | 'kite' | 'any';
        return (
          <DottedPaperQuadrilateral
            onComplete={() => onAnswerChange('1')}
            graded={graded}
            requiredType={requiredType}
          />
        );
      }

      case 'diagonals-drawing':
        return (
          <DiagonalsDrawing
            shapeType={diagram.params.shapeType}
            onComplete={() => onAnswerChange('1')}
            graded={graded}
          />
        );

      default:
        return null;
    }
  };

  // Check if this is an interactive exercise
  const isInteractive = question.isInteractive ?? false;

  return (
    <div
      className={`bg-card rounded-2xl shadow-kid p-5 border-2 transition-all ${
        graded
          ? isCorrect
            ? 'border-correct'
            : 'border-incorrect'
          : 'border-border hover:border-primary/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="text-lg font-medium leading-relaxed">{question.text}</p>
          <p className="text-sm text-muted-foreground mb-1">{question.textEn}</p>

          {/* Concept Explanation */}
          {diagram.type === 'rhombus-perimeter' && (
            <div className="mt-3">
              <ConceptExplanation concept="perimeter" />
            </div>
          )}
          {(diagram.type === 'intersecting-lines' || diagram.type === 'parallelogram-angle') && (
            <div className="mt-3">
              <ConceptExplanation concept="adjacent-angle" />
            </div>
          )}
          {diagram.type === 'intersecting-lines-interactive' && (
            <div className="mt-3">
              <ConceptExplanation concept="vertical-angle" />
            </div>
          )}
          {(diagram.type === 'parallel-corresponding' || diagram.type === 'parallel-supplementary') && (
            <div className="mt-3">
              <ConceptExplanation concept="parallel-lines" />
            </div>
          )}
          {(diagram.type === 'polygon-diagonals' || diagram.type === 'diagonals-drawing') && (
            <div className="mt-3">
              <ConceptExplanation concept="diagonal" />
            </div>
          )}
          {(diagram.type === 'rectangle-area' || diagram.type === 'square-area') && (
            <div className="mt-3">
              <ConceptExplanation concept="area" />
            </div>
          )}

          {/* Interactive Exercise or Regular Diagram */}
          {isInteractive ? (
            <div className="mt-3">{renderInteractiveExercise()}</div>
          ) : (
            <>
              <GeometryDiagram diagram={diagram} />

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-medium">こたえ：</span>
                  <span className="text-xs text-muted-foreground">Answer:</span>
                </div>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  disabled={graded}
                  className="w-28 h-12 text-center text-xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all disabled:opacity-60"
                  placeholder="？"
                />
                <span className="font-medium text-muted-foreground">{question.unit}</span>

                {graded && (
                  <div className="flex items-center gap-2 animate-bounce-in">
                    {isCorrect ? (
                      <span className="text-3xl font-black text-correct">〇</span>
                    ) : (
                      <>
                        <span className="text-3xl font-black text-incorrect">×</span>
                        <span className="text-sm text-muted-foreground">
                          正しいこたえ / Correct answer：
                          <strong className="text-foreground">
                            {question.answer}
                            {question.unit}
                          </strong>
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Visual explanation for incorrect diagonals answer */}
              {graded && !isCorrect && diagram.type === 'polygon-diagonals' && (
                <div className="mt-4">
                  <DiagonalsExplanation
                    sides={diagram.params.sides}
                    correctAnswer={question.answer}
                  />
                </div>
              )}
            </>
          )}

          {/* Feedback for interactive exercises */}
          {isInteractive && graded && (
            <div className="mt-4 flex items-center gap-2 animate-bounce-in">
              {isCorrect ? (
                <span className="text-3xl font-black text-correct">〇</span>
              ) : (
                <>
                  <span className="text-3xl font-black text-incorrect">×</span>
                  <span className="text-sm text-muted-foreground">
                    もういちどチャレンジしてみよう！ / Try again!
                  </span>
                </>
              )}
            </div>
          )}

          {/* Visual explanations for incorrect interactive exercises */}
          {isInteractive && graded && !isCorrect && (
            <div className="mt-4">
              {diagram.type === 'intersecting-lines-interactive' && (
                <IntersectingLinesExplanation
                  givenAngle={diagram.params.givenAngle}
                  rotation={diagram.params.rotation}
                />
              )}
              {diagram.type === 'dotted-paper-quadrilateral' && (
                <QuadrilateralExplanation />
              )}
              {diagram.type === 'diagonals-drawing' && (
                <DiagonalsDrawingExplanation
                  shapeType={diagram.params.shapeType}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
