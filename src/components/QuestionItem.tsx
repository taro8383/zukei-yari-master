import { Question } from '@/lib/geometry';
import GeometryDiagram from '@/components/GeometryDiagram';

interface QuestionItemProps {
  question: Question;
  index: number;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  graded: boolean;
  isCorrect?: boolean;
}

const QuestionItem = ({ question, index, userAnswer, onAnswerChange, graded, isCorrect }: QuestionItemProps) => {
  return (
    <div className={`bg-card rounded-2xl shadow-kid p-5 border-2 transition-all ${
      graded
        ? isCorrect
          ? 'border-correct'
          : 'border-incorrect'
        : 'border-border hover:border-primary/30'
    }`}>
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="text-lg font-medium leading-relaxed">{question.text}</p>
          <p className="text-sm text-muted-foreground mb-1">{question.textEn}</p>
          
          {/* Diagram */}
          <GeometryDiagram diagram={question.diagram} />
          
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
                      正しいこたえ / Correct answer：<strong className="text-foreground">{question.answer}{question.unit}</strong>
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
