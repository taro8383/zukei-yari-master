import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy, Clock, Lightbulb, AlertCircle } from 'lucide-react';
import { TestQuestion } from '@/lib/testMode';
import { cn } from '@/lib/utils';
import { FractionInput } from './fractions/FractionInput';
import GeometryDiagram from './GeometryDiagram';
import LineGraphVisualizer from './lineGraphs/LineGraphVisualizer';
import DrawingGraphInteractive from './lineGraphs/DrawingGraphInteractive';
import {
  IntersectingLinesExercise,
  DottedPaperQuadrilateral,
  DiagonalsDrawing,
  validateQuadrilateral,
} from './exercises';
import {
  DiagonalsExplanation,
  IntersectingLinesExplanation,
  QuadrilateralExplanation,
  DiagonalsDrawingExplanation,
} from './explanations';
import VerticalDecimalGrid from './decimals/VerticalDecimalGrid';
import DecimalShiftArrow from './decimals/DecimalShiftArrow';
import PlaceValueChart from './largeNumbers/PlaceValueChart';
import DivisionBracket from './division/DivisionBracket';

interface TestModeProps {
  questions: TestQuestion[];
  onExit: () => void;
  onComplete: (score: number, total: number) => void;
}

// Answer formats for different question types
interface FractionAnswer {
  whole?: number;
  numerator: number;
  denominator: number;
}

interface LineGraphSlopeAnswer {
  startTime: string;
  endTime: string;
}

const TestMode = ({ questions, onExit, onComplete }: TestModeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [fractionAnswers, setFractionAnswers] = useState<Record<number, FractionAnswer>>({});
  const [lineGraphSlopeAnswers, setLineGraphSlopeAnswers] = useState<Record<number, LineGraphSlopeAnswer>>({});
  // For division with remainder - separate quotient and remainder inputs
  const [divisionAnswers, setDivisionAnswers] = useState<Record<number, { quotient: string; remainder: string }>>({});
  // For drawing graph - track plotted points
  const [plottedPoints, setPlottedPoints] = useState<Record<number, Array<{ x: number; y: number }>>>({});
  // For interactive exercises - track partial answers (e.g., angleB and comparison for intersecting lines)
  const [interactiveAnswers, setInteractiveAnswers] = useState<Record<number, { angleB?: string; comparison?: 'gt' | 'lt' | 'eq' | null }>>({});
  // For quadrilateral drawing exercise - track vertices and points
  const [quadrilateralAnswers, setQuadrilateralAnswers] = useState<Record<number, { vertices: Array<{ x: number; y: number }>; allPoints: Array<{ x: number; y: number }>; isClosed: boolean; isComplete: boolean }>>({});
  // For diagonals drawing exercise - track diagonals
  const [diagonalsAnswers, setDiagonalsAnswers] = useState<Record<number, { diagonals: Array<{ from: number; to: number }>; isComplete: boolean }>>({});
  const [isGraded, setIsGraded] = useState(false);
  const [startTime] = useState(Date.now());
  const [showUnansweredModal, setShowUnansweredModal] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]);
  // For graded feedback
  const [questionResults, setQuestionResults] = useState<Record<number, boolean>>({});
  const [showTeachMeModal, setShowTeachMeModal] = useState(false);
  const [teachMeQuestion, setTeachMeQuestion] = useState<TestQuestion | null>(null);
  const [showResultsScreen, setShowResultsScreen] = useState(false);
  const [showGradeConfirmModal, setShowGradeConfirmModal] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  // Determine question type from topicId
  const getQuestionType = (q: TestQuestion): string => {
    return q.topicId || '';
  };

  const isFractionQuestion = (topicId: string): boolean => {
    return topicId === 'fraction-types' || topicId === 'converting-fractions' ||
           topicId === 'adding-fractions' || topicId === 'subtracting-fractions';
  };

  const isFractionTypesQuestion = (topicId: string): boolean => {
    return topicId === 'fraction-types';
  };

  const isLineGraphSlopeQuestion = (topicId: string, q: TestQuestion): boolean => {
    return topicId === 'change-slope' && (q as any).options;
  };

  const isGeometryQuestion = (topicId: string, q: TestQuestion): boolean => {
    return topicId === 'angles' || topicId === 'lines' || topicId === 'intersecting' ||
           topicId === 'quadrilaterals' || topicId === 'diagonals' ||
           (q as any).diagram !== undefined;
  };

  const isAreaQuestion = (topicId: string): boolean => {
    return topicId === 'calculating-area' || topicId === 'composite-shapes';
  };

  const isLineGraphQuestion = (topicId: string): boolean => {
    return topicId === 'reading-graph' || topicId === 'change-slope' ||
           topicId === 'wavy-line' || topicId === 'comparing-two-graphs' ||
           topicId === 'drawing-graph';
  };

  const isDrawingGraphQuestion = (topicId: string): boolean => {
    return topicId === 'drawing-graph';
  };

  const isInvestigatingChangesQuestion = (topicId: string): boolean => {
    return topicId === 'completing-table' || topicId === 'finding-rule' || topicId === 'writing-equation';
  };

  // Large numbers reading-oku-cho needs text input (Japanese with Kanji)
  const isTextAnswerQuestion = (topicId: string): boolean => {
    return topicId === 'reading-oku-cho';
  };

  // Handle kanji button clicks for reading-oku-cho
  const handleKanjiClick = (kanji: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: (prev[currentIndex] || '') + kanji }));
  };

  // Handle backspace for kanji input
  const handleKanjiBackspace = () => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: (prev[currentIndex] || '').slice(0, -1) }));
  };

  // Handle clear for kanji input
  const handleKanjiClear = () => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: '' }));
  };

  // Handle point plot for drawing graph
  const handlePointPlot = (x: number, y: number) => {
    setPlottedPoints((prev) => {
      const currentPoints = prev[currentIndex] || [];
      // Remove any existing point at this x position
      const filteredPoints = currentPoints.filter((p) => p.x !== x);
      const newPoints = [...filteredPoints, { x, y }];
      return { ...prev, [currentIndex]: newPoints };
    });
    // Update answer to indicate at least one point is plotted
    setAnswers((prev) => ({ ...prev, [currentIndex]: 'plotted' }));
  };

  // Handle clear points for drawing graph
  const handleClearPoints = () => {
    setPlottedPoints((prev) => ({ ...prev, [currentIndex]: [] }));
    setAnswers((prev) => ({ ...prev, [currentIndex]: '' }));
  };

  // Handle undo last point for drawing graph
  const handleUndoPoint = () => {
    setPlottedPoints((prev) => {
      const currentPoints = prev[currentIndex] || [];
      const newPoints = currentPoints.slice(0, -1);
      if (newPoints.length === 0) {
        setAnswers((prevAns) => ({ ...prevAns, [currentIndex]: '' }));
      }
      return { ...prev, [currentIndex]: newPoints };
    });
  };

  // Handle division quotient change
  const handleQuotientChange = (value: string) => {
    setDivisionAnswers((prev) => ({
      ...prev,
      [currentIndex]: { ...prev[currentIndex], quotient: value },
    }));
    // Update combined answer for grading
    const remainder = prev[currentIndex]?.remainder || '';
    setAnswers((prevAns) => ({ ...prevAns, [currentIndex]: `${value},${remainder}` }));
  };

  // Handle division remainder change
  const handleRemainderChange = (value: string) => {
    setDivisionAnswers((prev) => ({
      ...prev,
      [currentIndex]: { ...prev[currentIndex], remainder: value },
    }));
    // Update combined answer for grading
    const quotient = prev[currentIndex]?.quotient || '';
    setAnswers((prevAns) => ({ ...prevAns, [currentIndex]: `${quotient},${value}` }));
  };

  // Check if this is an interactive exercise (drawing on dotted paper, diagonals, etc.)
  const isInteractiveExercise = (q: TestQuestion): boolean => {
    return (q as any).isInteractive === true;
  };

  // Check if this is a division question
  const isDivisionQuestion = (topicId: string): boolean => {
    return topicId === 'grouping-division' || topicId === 'long-division' ||
           topicId === 'division-properties' || topicId === 'long-division-2digit' ||
           topicId === 'division-with-remainder' || topicId === 'mental-division';
  };

  // Check if this is division with remainder (needs two inputs)
  const isDivisionWithRemainder = (topicId: string): boolean => {
    return topicId === 'grouping-division' || topicId === 'division-with-remainder';
  };

  // Get diagram type for interactive exercises
  const getDiagramType = (q: TestQuestion): string => {
    return (q as any).diagram?.type || '';
  };

  // Check if this is an area question that needs unit selector
  const isAreaChoosingUnits = (topicId: string): boolean => {
    return topicId === 'choosing-units';
  };

  // Get the correct numeric answer for a question (handles non-standard answer fields)
  const getCorrectAnswerValue = (q: TestQuestion): number | string => {
    const qType = getQuestionType(q);
    if (isAreaQuestion(qType)) return (q as any).answerArea ?? '';
    if (qType === 'large-area-units') return (q as any).answerConversion ?? '';
    return (q as any).answer ?? '';
  };

  // Check if this is a decimal question that needs visual components
  const isDecimalAddSubtract = (topicId: string): boolean => {
    return topicId === 'decimal-add-subtract';
  };

  const isDecimalShift = (topicId: string): boolean => {
    return topicId === 'decimal-shift';
  };

  const isDecimalMultiplyDivide = (topicId: string): boolean => {
    return topicId === 'decimal-multiply-divide';
  };

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: value }));
  };

  const handleFractionNumeratorChange = (value: string) => {
    const num = value === '' ? 0 : parseInt(value);
    setFractionAnswers((prev) => ({
      ...prev,
      [currentIndex]: { ...prev[currentIndex], numerator: num },
    }));
    // Also update the string answer for grading
    const den = prev[currentIndex]?.denominator || 1;
    const whole = prev[currentIndex]?.whole;
    if (whole && whole > 0) {
      setAnswers((prevAns) => ({ ...prevAns, [currentIndex]: `${whole}と${num}/${den}` }));
    } else {
      setAnswers((prevAns) => ({ ...prevAns, [currentIndex]: `${num}/${den}` }));
    }
  };

  const handleFractionDenominatorChange = (value: string) => {
    const den = value === '' ? 1 : parseInt(value);
    setFractionAnswers((prev) => ({
      ...prev,
      [currentIndex]: { ...prev[currentIndex], denominator: den },
    }));
    const num = prev[currentIndex]?.numerator || 0;
    const whole = prev[currentIndex]?.whole;
    if (whole && whole > 0) {
      setAnswers((prevAns) => ({ ...prevAns, [currentIndex]: `${whole}と${num}/${den}` }));
    } else {
      setAnswers((prevAns) => ({ ...prevAns, [currentIndex]: `${num}/${den}` }));
    }
  };

  const handleFractionWholeChange = (value: string) => {
    const whole = value === '' ? 0 : parseInt(value);
    setFractionAnswers((prev) => ({
      ...prev,
      [currentIndex]: { ...prev[currentIndex], whole },
    }));
    const num = prev[currentIndex]?.numerator || 0;
    const den = prev[currentIndex]?.denominator || 1;
    if (whole > 0) {
      setAnswers((prevAns) => ({ ...prevAns, [currentIndex]: `${whole}と${num}/${den}` }));
    } else {
      setAnswers((prevAns) => ({ ...prevAns, [currentIndex]: `${num}/${den}` }));
    }
  };

  const handleStartTimeChange = (value: string) => {
    setLineGraphSlopeAnswers((prev) => ({
      ...prev,
      [currentIndex]: { ...prev[currentIndex], startTime: value },
    }));
    const end = prev[currentIndex]?.endTime || '';
    setAnswers((prevAns) => ({ ...prevAns, [currentIndex]: `${value}から${end}の間` }));
  };

  const handleEndTimeChange = (value: string) => {
    setLineGraphSlopeAnswers((prev) => ({
      ...prev,
      [currentIndex]: { ...prev[currentIndex], endTime: value },
    }));
    const start = prev[currentIndex]?.startTime || '';
    setAnswers((prevAns) => ({ ...prevAns, [currentIndex]: `${start}から${value}の間` }));
  };

  // Check if a question is answered (handles different question types)
  const isQuestionAnswered = (idx: number): boolean => {
    const q = questions[idx];
    const qType = getQuestionType(q);

    // For line graph slope questions
    if (isLineGraphSlopeQuestion(qType, q)) {
      const slopeAns = lineGraphSlopeAnswers[idx];
      return !!(slopeAns?.startTime && slopeAns?.endTime);
    }

    // For fraction questions (except fraction-types which uses string answers)
    if (isFractionQuestion(qType) && !isFractionTypesQuestion(qType)) {
      const fractionAns = fractionAnswers[idx];
      return !!(fractionAns?.numerator && fractionAns?.denominator);
    }

    // For drawing graph questions
    if (isDrawingGraphQuestion(qType)) {
      const points = plottedPoints[idx] || [];
      const correctPoints = (q as any).correctPoints || [];
      return points.length >= correctPoints.length;
    }

    // For division with remainder
    if (isDivisionWithRemainder(qType)) {
      const divAns = divisionAnswers[idx];
      return !!(divAns?.quotient !== '' && divAns?.remainder !== '');
    }

    // For division questions
    if (isDivisionQuestion(qType)) {
      return !!(divisionAnswers[idx]?.quotient || answers[idx]);
    }

    // For interactive exercises (quadrilateral drawing, diagonals drawing)
    if (isInteractiveExercise(q)) {
      const diagramType = getDiagramType(q);
      if (diagramType === 'dotted-paper-quadrilateral') {
        const quad = quadrilateralAnswers[idx];
        return quad?.isComplete || false;
      }
      if (diagramType === 'diagonals-drawing') {
        const diag = diagonalsAnswers[idx];
        return diag?.isComplete || false;
      }
      if (diagramType === 'intersecting-lines-interactive') {
        const inter = interactiveAnswers[idx];
        return !!(inter?.angleB && inter?.comparison);
      }
      // For other interactive exercises, check if answer exists
      return !!(answers[idx] && answers[idx].trim() !== '');
    }

    // For intersecting lines slope question (non-interactive)
    if (qType === 'intersecting' && (q as any).isInteractive) {
      return !!(answers[idx] && answers[idx].trim() !== '');
    }

    // Default: check if answer string exists and is not empty
    return !!(answers[idx] && answers[idx].trim() !== '');
  };

  // Get list of unanswered question indices
  const getUnansweredQuestions = (): number[] => {
    const unanswered: number[] = [];
    for (let i = 0; i < questions.length; i++) {
      if (!isQuestionAnswered(i)) {
        unanswered.push(i);
      }
    }
    return unanswered;
  };

  const handleGradeClick = () => {
    const unanswered = getUnansweredQuestions();
    if (unanswered.length > 0) {
      setUnansweredQuestions(unanswered);
      setShowUnansweredModal(true);
    } else {
      // Always show confirmation before grading
      setShowGradeConfirmModal(true);
    }
  };

  // Check if a specific question is correct
  const checkQuestionCorrect = (q: TestQuestion, idx: number): boolean => {
    const userAnswer = answers[idx] || '';
    const qType = getQuestionType(q);

    // Handle different answer types
    if (isLineGraphSlopeQuestion(qType, q)) {
      const slopeAns = lineGraphSlopeAnswers[idx];
      const correctStart = (q as any).slopeStart;
      const correctEnd = (q as any).slopeEnd;
      return slopeAns?.startTime === correctStart && slopeAns?.endTime === correctEnd;
    } else if (isFractionTypesQuestion(qType)) {
      const userAns = userAnswer.toLowerCase().trim();
      const correctType = (q as any).fractionType;
      return userAns === correctType;
    } else if (isTextAnswerQuestion(qType)) {
      return userAnswer.trim() === String(q.answer).trim();
    } else if (isFractionQuestion(qType)) {
      const fractionAns = fractionAnswers[idx];
      if (fractionAns) {
        let answerStr = '';
        if (fractionAns.whole && fractionAns.whole > 0) {
          answerStr = `${fractionAns.whole}と${fractionAns.numerator}/${fractionAns.denominator}`;
        } else {
          answerStr = `${fractionAns.numerator}/${fractionAns.denominator}`;
        }
        const expectedAnswer = String(q.answer);
        return answerStr === expectedAnswer;
      }
      return false;
    } else if (isAreaChoosingUnits(qType)) {
      return userAnswer.trim() === (q as any).appropriateUnit;
    } else if (isDrawingGraphQuestion(qType)) {
      const points = plottedPoints[idx] || [];
      const correctPoints = (q as any).correctPoints || [];
      const allCorrectPlotted = correctPoints.every((cp: { x: number; y: number }) =>
        points.some((p: { x: number; y: number }) =>
          Math.abs(p.x - cp.x) < 0.1 && Math.abs(p.y - cp.y) < 0.1
        )
      );
      return allCorrectPlotted && points.length >= correctPoints.length;
    } else if (isDivisionWithRemainder(qType)) {
      const divAns = divisionAnswers[idx];
      if (divAns) {
        const userQuotient = parseInt(divAns.quotient);
        const userRemainder = parseInt(divAns.remainder);
        return userQuotient === q.quotient && userRemainder === q.remainder;
      }
      return false;
    } else if (isDivisionQuestion(qType)) {
      const numericAnswer = parseFloat(userAnswer);
      return !isNaN(numericAnswer) && numericAnswer === q.quotient;
    } else if (qType === 'finding-rule') {
      // Correct option has value 'correct'; wrong options have other values
      return userAnswer === String((q as any).answer);
    } else if (qType === 'writing-equation') {
      // Answer stored as 'operator|constant' string, e.g. '×|3'
      return userAnswer === String((q as any).answer);
    } else if (qType === 'combining-into-one-equation') {
      // Answer stored as 'equationPart|numericAnswer'
      const numericPart = userAnswer.split('|')[1] || '';
      const numericVal = parseFloat(numericPart);
      return !isNaN(numericVal) && Math.abs(numericVal - Number((q as any).answer)) < 0.0001;
    } else if (getDiagramType(q) === 'intersecting-lines-interactive') {
      const inter = interactiveAnswers[idx];
      if (!inter?.angleB || !inter?.comparison) return false;
      const givenAngle = (q as any).diagram?.params?.givenAngle;
      const correctAngleB = 180 - givenAngle;
      return parseInt(inter.angleB) === correctAngleB && inter.comparison === 'eq';
    } else if (getDiagramType(q) === 'diagonals-drawing') {
      // Correct when the student completed drawing the required diagonals
      return diagonalsAnswers[idx]?.isComplete || false;
    } else if (getDiagramType(q) === 'dotted-paper-quadrilateral') {
      const quad = quadrilateralAnswers[idx];
      if (!quad?.isComplete || quad.vertices.length !== 4) return false;
      const typeMap: Record<number, 'rectangle' | 'square' | 'trapezoid' | 'parallelogram' | 'rhombus' | 'kite' | 'any'> = {
        0: 'rectangle', 1: 'square', 2: 'trapezoid', 3: 'parallelogram', 4: 'rhombus', 5: 'kite',
      };
      const requiredType = typeMap[q.diagram?.params?.requiredType] || 'any';
      return validateQuadrilateral(quad.vertices, requiredType).isValid;
    } else {
      const correctValue = getCorrectAnswerValue(q);
      const numericAnswer = parseFloat(userAnswer);
      if (!isNaN(numericAnswer) && correctValue !== '') {
        const tolerance = 0.0001;
        return Math.abs(numericAnswer - Number(correctValue)) < tolerance;
      }
      return false;
    }
  };

  const handleGrade = () => {
    setShowUnansweredModal(false);
    setIsGraded(true);

    // Calculate results for each question
    const results: Record<number, boolean> = {};
    let correct = 0;

    questions.forEach((q, idx) => {
      const isCorrect = checkQuestionCorrect(q, idx);
      results[idx] = isCorrect;
      if (isCorrect) correct++;
    });

    setQuestionResults(results);

    // Call onComplete to save results
    onComplete(correct, questions.length);
  };

  const handleTeachMeClick = () => {
    setTeachMeQuestion(currentQuestion);
    setShowTeachMeModal(true);
  };

  const getCurrentAnswer = () => answers[currentIndex] || '';

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Render interactive exercises (dotted paper, diagonals, etc.)
  const renderInteractiveExercise = () => {
    const q = currentQuestion as any;
    const diagramType = getDiagramType(currentQuestion);

    switch (diagramType) {
      case 'intersecting-lines-interactive':
        const savedIntersecting = interactiveAnswers[currentIndex] || {};
        return (
          <IntersectingLinesExercise
            key={`test-intersecting-${q.id}-${currentIndex}`}
            givenAngle={q.diagram?.params?.givenAngle}
            rotation={q.diagram?.params?.rotation}
            onAnswerSubmit={(answers) => {
              const isCorrect = answers.angleB === 180 - q.diagram?.params?.givenAngle && answers.comparison === 'eq';
              handleAnswerChange(isCorrect ? '1' : '0');
            }}
            graded={false}
            correctAnswer={180 - q.diagram?.params?.givenAngle}
            savedAngleB={savedIntersecting.angleB}
            savedComparison={savedIntersecting.comparison}
            onAnswerChange={(values) => {
              setInteractiveAnswers((prev) => ({
                ...prev,
                [currentIndex]: values,
              }));
              // Mark as answered if both fields are filled (for green indicator)
              if (values.angleB && values.comparison) {
                setAnswers((prev) => ({ ...prev, [currentIndex]: 'answered' }));
              }
            }}
          />
        );

      case 'dotted-paper-quadrilateral': {
        const savedQuadrilateral = quadrilateralAnswers[currentIndex];
        return (
          <DottedPaperQuadrilateral
            key={`test-quadrilateral-${q.id}-${currentIndex}`}
            onComplete={() => handleAnswerChange('1')}
            graded={false}
            requiredType="any"
            savedVertices={savedQuadrilateral?.vertices}
            savedAllPoints={savedQuadrilateral?.allPoints}
            savedIsClosed={savedQuadrilateral?.isClosed}
            savedIsComplete={savedQuadrilateral?.isComplete}
            onStateChange={(state) => {
              setQuadrilateralAnswers((prev) => ({
                ...prev,
                [currentIndex]: state,
              }));
              // Mark as answered if shape is complete (for green indicator)
              if (state.isComplete) {
                setAnswers((prev) => ({ ...prev, [currentIndex]: 'answered' }));
              }
            }}
          />
        );
      }

      case 'diagonals-drawing':
        const savedDiagonals = diagonalsAnswers[currentIndex];
        return (
          <DiagonalsDrawing
            key={`test-diagonals-${q.id}-${currentIndex}`}
            shapeType={q.diagram?.params?.shapeType}
            onComplete={() => {
              handleAnswerChange('1');
              // Mark as answered for green indicator
              setAnswers((prev) => ({ ...prev, [currentIndex]: 'answered' }));
            }}
            graded={false}
            savedDiagonals={savedDiagonals?.diagonals}
            savedIsComplete={savedDiagonals?.isComplete}
            onStateChange={(state) => {
              setDiagonalsAnswers((prev) => ({
                ...prev,
                [currentIndex]: state,
              }));
              // Mark as answered if complete (for green indicator)
              if (state.isComplete) {
                setAnswers((prev) => ({ ...prev, [currentIndex]: 'answered' }));
              }
            }}
          />
        );

      default:
        return null;
    }
  };

  // Render area shapes for area questions
  const renderAreaShape = () => {
    const q = currentQuestion as any;
    const topicId = getQuestionType(currentQuestion);

    if (topicId === 'calculating-area') {
      const width = q.width || q.side || 5;
      const height = q.height || q.side || 5;
      const isSquare = q.shape === 'square';

      const maxSize = 150;
      const scale = Math.min(maxSize / Math.max(width, height), 25);
      const svgWidth = width * scale + 60;
      const svgHeight = height * scale + 60;

      return (
        <div className="flex flex-col items-center gap-2 mb-4">
          <p className="text-sm text-muted-foreground">図形 / Shape</p>
          <svg width={svgWidth} height={svgHeight} className="border rounded-lg bg-white">
            <rect
              x="40"
              y="20"
              width={width * scale}
              height={height * scale}
              fill="#60a5fa"
              stroke="#3b82f6"
              strokeWidth={2}
            />
            {/* Grid lines */}
            {Array.from({ length: width + 1 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={40 + i * scale}
                y1="20"
                x2={40 + i * scale}
                y2={20 + height * scale}
                stroke="#93c5fd"
                strokeWidth={1}
                strokeDasharray="4"
              />
            ))}
            {Array.from({ length: height + 1 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="40"
                y1={20 + i * scale}
                x2={40 + width * scale}
                y2={20 + i * scale}
                stroke="#93c5fd"
                strokeWidth={1}
                strokeDasharray="4"
              />
            ))}
            {/* Labels */}
            <text x={40 + (width * scale) / 2} y={20 + height * scale + 20} textAnchor="middle" fontSize={14} fill="#374151">
              {width} cm
            </text>
            <text x="20" y={20 + (height * scale) / 2 + 5} textAnchor="middle" fontSize={14} fill="#374151">
              {height} cm
            </text>
          </svg>
        </div>
      );
    }

    if (topicId === 'composite-shapes' && q.dimensions) {
      const { outerWidth, outerHeight, cutoutWidth, cutoutHeight, cutoutY, shapeType } = q.dimensions;
      const isCShape = shapeType === 'c-shape' || cutoutY !== undefined;

      const maxSize = 150;
      const scale = Math.min(maxSize / Math.max(outerWidth, outerHeight), 20);
      const svgWidth = outerWidth * scale + 80;
      const svgHeight = outerHeight * scale + 80;

      if (isCShape) {
        const cy = (cutoutY || 3) * scale;
        const ch = cutoutHeight * scale;
        const cw = cutoutWidth * scale;
        const ow = outerWidth * scale;
        const oh = outerHeight * scale;
        const leftPartWidth = outerWidth - cutoutWidth;

        return (
          <div className="flex flex-col items-center gap-2 mb-4">
            <p className="text-sm text-muted-foreground">C字の形 / C-Shape</p>
            <svg width={svgWidth} height={svgHeight} className="border rounded-lg bg-white">
              {/* 1cm grid background */}
              {Array.from({ length: outerWidth + 1 }).map((_, i) => (
                <line
                  key={`grid-v-${i}`}
                  x1={50 + i * scale}
                  y1="30"
                  x2={50 + i * scale}
                  y2={30 + oh}
                  stroke={i % 5 === 0 ? "#9ca3af" : "#d1d5db"}
                  strokeWidth={i % 5 === 0 ? 1.5 : 0.5}
                  strokeDasharray={i % 5 === 0 ? undefined : "2 2"}
                />
              ))}
              {Array.from({ length: outerHeight + 1 }).map((_, i) => (
                <line
                  key={`grid-h-${i}`}
                  x1="50"
                  y1={30 + i * scale}
                  x2={50 + ow}
                  y2={30 + i * scale}
                  stroke={i % 5 === 0 ? "#9ca3af" : "#d1d5db"}
                  strokeWidth={i % 5 === 0 ? 1.5 : 0.5}
                  strokeDasharray={i % 5 === 0 ? undefined : "2 2"}
                />
              ))}
              {/* Left part */}
              <rect x="50" y="30" width={leftPartWidth * scale} height={oh} fill="#60a5fa" stroke="#3b82f6" strokeWidth={2} />
              <text x={50 + (leftPartWidth * scale) / 2} y={30 + oh / 2 + 5} textAnchor="middle" fontSize={14} fill="white" fontWeight="bold">A</text>
              {/* Top right */}
              <rect x={50 + leftPartWidth * scale} y="30" width={cw} height={cy} fill="#a78bfa" stroke="#8b5cf6" strokeWidth={2} />
              {/* Bottom right */}
              <rect x={50 + leftPartWidth * scale} y={30 + cy + ch} width={cw} height={oh - cy - ch} fill="#a78bfa" stroke="#8b5cf6" strokeWidth={2} />
              {/* Cutout - transparent with red border */}
              <rect x={50 + leftPartWidth * scale} y={30 + cy} width={cw} height={ch} fill="none" stroke="#ef4444" strokeWidth={2} strokeDasharray="4" />
              <text x={50 + leftPartWidth * scale + cw / 2} y={30 + cy + ch / 2 + 5} textAnchor="middle" fontSize={10} fill="#ef4444">切り取り</text>
              {/* Labels */}
              <text x={50 + ow / 2} y="20" textAnchor="middle" fontSize={12} fill="#374151" fontWeight="bold">{outerWidth} cm</text>
              <text x="30" y={30 + oh / 2 + 5} textAnchor="middle" fontSize={12} fill="#374151" fontWeight="bold">{outerHeight} cm</text>
            </svg>
          </div>
        );
      } else {
        // L-shape
        const ow = outerWidth * scale;
        const oh = outerHeight * scale;
        const cw = cutoutWidth * scale;
        const ch = cutoutHeight * scale;
        const rect1W = (outerWidth - cutoutWidth) * scale;
        const rect2H = (outerHeight - cutoutHeight) * scale;

        return (
          <div className="flex flex-col items-center gap-2 mb-4">
            <p className="text-sm text-muted-foreground">L字の形 / L-Shape</p>
            <svg width={svgWidth + 20} height={svgHeight} className="border rounded-lg bg-white">
              {/* Rectangle A (left) */}
              <rect x="50" y="30" width={rect1W} height={oh} fill="#60a5fa" stroke="#3b82f6" strokeWidth={2} />
              <text x={50 + rect1W / 2} y={30 + oh / 2 + 5} textAnchor="middle" fontSize={14} fill="white" fontWeight="bold">A</text>
              {/* Rectangle B (bottom right) */}
              <rect x={50 + rect1W} y={30 + oh - rect2H} width={cw} height={rect2H} fill="#a78bfa" stroke="#8b5cf6" strokeWidth={2} />
              <text x={50 + rect1W + cw / 2} y={30 + oh - rect2H / 2 + 5} textAnchor="middle" fontSize={14} fill="white" fontWeight="bold">B</text>
              {/* Label: total width at top */}
              <text x={50 + ow / 2} y="20" textAnchor="middle" fontSize={12} fill="#374151" fontWeight="bold">{outerWidth} cm</text>
              {/* Label: height of A on left */}
              <text x="30" y={30 + oh / 2 + 5} textAnchor="middle" fontSize={12} fill="#374151" fontWeight="bold">{outerHeight} cm</text>
              {/* Label: width of B below B */}
              <text x={50 + rect1W + cw / 2} y={30 + oh + 15} textAnchor="middle" fontSize={12} fill="#7c3aed" fontWeight="bold">{cutoutWidth} cm</text>
              {/* Label: height of B to the right of B */}
              <text x={50 + ow + 5} y={30 + oh - rect2H / 2 + 5} textAnchor="start" fontSize={12} fill="#7c3aed" fontWeight="bold">{outerHeight - cutoutHeight} cm</text>
            </svg>
          </div>
        );
      }
    }

    return null;
  };

  // Render division visual aids (division bracket, problem display)
  const renderDivisionVisual = () => {
    const q = currentQuestion as any;
    const topicId = getQuestionType(currentQuestion);

    if (!isDivisionQuestion(topicId)) return null;

    const dividend = q.dividend;
    const divisor = q.divisor;

    if (dividend === undefined || divisor === undefined) return null;

    // For long division topics, show the division bracket
    if (topicId === 'long-division' || topicId === 'long-division-2digit') {
      return (
        <div className="mb-4 flex justify-center">
          <DivisionBracket
            dividend={dividend}
            divisor={divisor}
            showSteps={true}
          />
        </div>
      );
    }

    // For division with remainder and other division topics
    return (
      <div className="bg-kid-yellow/10 rounded-xl p-4 border border-kid-yellow/30 mb-4">
        <p className="text-sm font-bold text-foreground mb-2 text-center">
          📦 わり算 / Division
        </p>
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold">
            <span className="text-primary">{dividend}</span>
            <span className="text-muted-foreground mx-2">÷</span>
            <span className="text-kid-purple">{divisor}</span>
            <span className="text-muted-foreground mx-2">=</span>
            <span className="text-foreground">?</span>
            {isDivisionWithRemainder(topicId) && (
              <>
                <span className="text-muted-foreground mx-2">...</span>
                <span className="text-foreground">?</span>
              </>
            )}
          </p>
          {isDivisionWithRemainder(topicId) && (
            <p className="text-xs text-muted-foreground">
              商とあまりを求めよう / Find the quotient and remainder
            </p>
          )}
        </div>
      </div>
    );
  };

  // Render decimal visual aids (vertical grid, shift arrows, etc.)
  const renderDecimalVisual = () => {
    const q = currentQuestion as any;
    const topicId = getQuestionType(currentQuestion);

    if (isDecimalAddSubtract(topicId) && q.num1 !== undefined && q.num2 !== undefined) {
      return (
        <div className="mb-4">
          <VerticalDecimalGrid
            num1={q.num1}
            num2={q.num2}
            operation={q.operation || 'add'}
            decimalPlaces1={q.decimalPlaces1 || 1}
            decimalPlaces2={q.decimalPlaces2 || 2}
            gridAnswers={[]}
            onGridAnswerChange={() => {}}
            graded={false}
          />
        </div>
      );
    }

    if (isDecimalShift(topicId) && q.originalNumber !== undefined) {
      return (
        <div className="mb-4">
          <DecimalShiftArrow
            originalNumber={q.originalNumber}
            shiftType={q.shiftType || 'x10'}
          />
        </div>
      );
    }

    if (isDecimalMultiplyDivide(topicId) && q.decimalNumber !== undefined && q.wholeNumber !== undefined) {
      const isMultiply = q.operation === 'multiply';
      return (
        <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30 mb-4">
          <p className="text-sm font-bold text-foreground mb-3 text-center">
            {isMultiply ? '✖️ 小数のかけ算 / Decimal Multiplication' : '➗ 小数のわり算 / Decimal Division'}
          </p>
          <div className="flex items-center justify-center gap-3 text-xl font-bold">
            <span className="text-primary">{q.decimalNumber}</span>
            <span className="text-muted-foreground">{isMultiply ? '×' : '÷'}</span>
            <span className="text-kid-purple">{q.wholeNumber}</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-foreground">?</span>
          </div>
        </div>
      );
    }

    return null;
  };

  // Render investigating changes table (showing ○ and △ values)
  const renderInvestigatingChangesTable = () => {
    const q = currentQuestion as any;
    const topicId = getQuestionType(currentQuestion);

    if (!isInvestigatingChangesQuestion(topicId) || !q.tableData) return null;

    return (
      <div className="flex flex-col items-center gap-2 mb-4">
        <p className="text-sm text-muted-foreground">表 / Table</p>
        <div className="overflow-x-auto">
          <table className="border rounded-lg bg-white">
            <thead>
              <tr className="bg-primary/10">
                <th className="p-3 border-b-2 border-r-2 border-primary font-bold text-foreground">〇</th>
                {q.tableData.map((row: { x: number }, i: number) => (
                  <th key={`x-${i}`} className="p-3 border-b border-primary/30 font-bold text-foreground min-w-[60px]">
                    {row.x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="p-3 border-r-2 border-primary font-bold text-foreground bg-primary/10">△</th>
                {q.tableData.map((row: { y: number; isInput?: boolean }, i: number) => (
                  <td key={`y-${i}`} className="p-3 border-b border-primary/20 text-center">
                    <span className="text-lg font-bold">{row.y}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Render the appropriate answer input based on question type
  const renderAnswerInput = () => {
    const topicId = getQuestionType(currentQuestion);

    // Line Graph Slope questions (dropdown)
    if (isLineGraphSlopeQuestion(topicId, currentQuestion)) {
      const options = (currentQuestion as any).options || [];
      const slopeAns = lineGraphSlopeAnswers[currentIndex] || { startTime: '', endTime: '' };

      return (
        <div className="flex items-center gap-2 flex-wrap" key={`slope-${currentIndex}`}>
          <select
            key={`slope-start-${currentIndex}`}
            value={slopeAns.startTime}
            onChange={(e) => handleStartTimeChange(e.target.value)}
            className="h-14 px-4 text-lg font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
          >
            <option value="">--</option>
            {options.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span className="text-foreground">から</span>
          <select
            key={`slope-end-${currentIndex}`}
            value={slopeAns.endTime}
            onChange={(e) => handleEndTimeChange(e.target.value)}
            className="h-14 px-4 text-lg font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
          >
            <option value="">--</option>
            {options.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span className="text-foreground">の間</span>
        </div>
      );
    }

    // Fraction types questions (dropdown)
    if (isFractionTypesQuestion(topicId)) {
      return (
        <select
          key={`frac-type-${currentIndex}`}
          value={getCurrentAnswer()}
          onChange={(e) => handleAnswerChange(e.target.value)}
          className="h-14 px-4 text-lg font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
        >
          <option value="">-- 選択してください --</option>
          <option value="proper">真分数 / Proper</option>
          <option value="improper">仮分数 / Improper</option>
          <option value="mixed">帯分数 / Mixed</option>
        </select>
      );
    }

    // Fraction questions (converting, adding, subtracting)
    if (isFractionQuestion(topicId)) {
      const fracAns = fractionAnswers[currentIndex] || { numerator: '', denominator: '', whole: '' };

      // Check if this question needs whole number (convert to mixed, or add/subtract resulting in mixed)
      const needsWhole = (currentQuestion as any).answerMixedWhole !== undefined ||
                        ((currentQuestion as any).convertTo === 'mixed');

      return (
        <div className="flex items-center gap-3" key={`frac-${currentIndex}`}>
          {needsWhole && (
            <>
              <input
                key={`frac-whole-${currentIndex}`}
                type="number"
                value={fracAns.whole}
                onChange={(e) => handleFractionWholeChange(e.target.value)}
                className="w-20 h-14 text-center text-2xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
                placeholder="?"
              />
              <span className="text-2xl font-bold">と</span>
            </>
          )}
          <FractionInput
            numerator={fracAns.numerator || ''}
            denominator={fracAns.denominator || ''}
            onNumeratorChange={handleFractionNumeratorChange}
            onDenominatorChange={handleFractionDenominatorChange}
          />
        </div>
      );
    }

    // Division with remainder - needs two inputs (quotient and remainder)
    if (isDivisionWithRemainder(topicId)) {
      const divAns = divisionAnswers[currentIndex] || { quotient: '', remainder: '' };
      return (
        <div className="flex items-center gap-4 flex-wrap" key={`div-${currentIndex}`}>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-1">商 / Quotient</span>
              <input
                key={`div-q-${currentIndex}`}
                type="number"
                value={divAns.quotient}
                onChange={(e) => handleQuotientChange(e.target.value)}
                className="w-20 h-14 text-center text-2xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
                placeholder="?"
              />
            </div>
          </div>
          <span className="text-2xl font-bold text-muted-foreground">...</span>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-1">あまり / Remainder</span>
              <input
                key={`div-r-${currentIndex}`}
                type="number"
                value={divAns.remainder}
                onChange={(e) => handleRemainderChange(e.target.value)}
                className="w-20 h-14 text-center text-2xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
                placeholder="?"
              />
            </div>
          </div>
        </div>
      );
    }

    // Area choosing units - dropdown for unit selection
    if (isAreaChoosingUnits(topicId)) {
      const unitOptions = [
        { value: 'cm2', label: 'cm² (平方センチメートル / sq cm)' },
        { value: 'm2', label: 'm² (平方メートル / sq m)' },
        { value: 'a', label: 'a (アール / are)' },
        { value: 'ha', label: 'ha (ヘクタール / hectare)' },
        { value: 'km2', label: 'km² (平方キロメートル / sq km)' },
      ];
      return (
        <select
          key={`area-unit-${currentIndex}`}
          value={getCurrentAnswer()}
          onChange={(e) => handleAnswerChange(e.target.value)}
          className="h-14 px-4 text-base font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
        >
          <option value="">-- 選択してください / Select --</option>
          {unitOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    // Text input with Kanji buttons for reading-oku-cho
    if (topicId === 'reading-oku-cho') {
      return (
        <div className="flex flex-col gap-2">
          <input
            key={`kanji-${currentIndex}`}
            type="text"
            value={getCurrentAnswer()}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="w-48 h-14 text-center text-2xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
            placeholder="例: 45億"
            autoFocus
          />
          {/* Kanji Unit Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleKanjiClick('万')}
              className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg font-bold text-primary transition-colors"
            >
              万
            </button>
            <button
              onClick={() => handleKanjiClick('億')}
              className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg font-bold text-primary transition-colors"
            >
              億
            </button>
            <button
              onClick={() => handleKanjiClick('兆')}
              className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg font-bold text-primary transition-colors"
            >
              兆
            </button>
            <button
              onClick={() => handleKanjiClick('0')}
              className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg font-bold transition-colors"
            >
              0
            </button>
            <button
              onClick={handleKanjiBackspace}
              className="px-3 py-1.5 bg-kid-yellow/20 hover:bg-kid-yellow/30 rounded-lg font-bold text-foreground transition-colors"
            >
              ← けす
            </button>
            <button
              onClick={handleKanjiClear}
              className="px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg font-bold text-red-600 transition-colors"
            >
              クリア
            </button>
          </div>
        </div>
      );
    }

    // Text input for other text-based questions
    if (isTextAnswerQuestion(topicId)) {
      return (
        <input
          key={`text-${currentIndex}`}
          type="text"
          value={getCurrentAnswer()}
          onChange={(e) => handleAnswerChange(e.target.value)}
          className="w-48 h-14 text-center text-2xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
          placeholder="?"
          autoFocus
        />
      );
    }

    // Investigating Changes - Finding Rule (multiple choice)
    if (topicId === 'finding-rule') {
      const q = currentQuestion as any;
      const ruleOptions = q.ruleOptions || [];
      return (
        <div className="flex flex-wrap gap-2">
          {ruleOptions.map((option: { value: string; ja: string; en: string }) => (
            <button
              key={option.value}
              onClick={() => handleAnswerChange(option.value)}
              className={cn(
                'px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all active:scale-95',
                getCurrentAnswer() === option.value
                  ? 'bg-primary/20 border-primary text-foreground'
                  : 'bg-muted text-muted-foreground border-input hover:border-primary/50'
              )}
            >
              <span className="block">{option.ja}</span>
              <span className="block text-xs opacity-70">{option.en}</span>
            </button>
          ))}
        </div>
      );
    }

    // Investigating Changes - Writing Equation (equation builder)
    if (topicId === 'writing-equation') {
      const q = currentQuestion as any;
      const operators = ['×', '+', '-'];
      const constants = [2, 3, 4, 5, 6, 7, 8, 9, 10];
      const [selectedOp, selectedConst] = getCurrentAnswer() ? getCurrentAnswer().split('|') : ['', ''];

      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-2xl font-bold">
            <span className="px-4 py-2 bg-kid-blue/20 rounded-lg">〇</span>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground text-center">演算子 / Operator</span>
              <div className="flex gap-1">
                {operators.map((op) => (
                  <button
                    key={op}
                    onClick={() => handleAnswerChange(`${op}|${selectedConst || ''}`)}
                    className={cn(
                      'w-10 h-10 rounded-lg border-2 font-bold text-lg transition-all',
                      selectedOp === op
                        ? 'bg-primary/20 border-primary text-foreground'
                        : 'bg-muted border-input hover:border-primary/50'
                    )}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground text-center">数 / Number</span>
              <div className="flex flex-wrap gap-1 max-w-[200px] justify-center">
                {constants.map((num) => (
                  <button
                    key={num}
                    onClick={() => handleAnswerChange(`${selectedOp || q.correctOperator}|${num}`)}
                    className={cn(
                      'w-10 h-10 rounded-lg border-2 font-bold text-sm transition-all',
                      selectedConst === String(num)
                        ? 'bg-primary/20 border-primary text-foreground'
                        : 'bg-muted border-input hover:border-primary/50'
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <span className="px-4 py-2 bg-kid-purple/20 rounded-lg">△</span>
          </div>
          {selectedOp && selectedConst && (
            <p className="text-lg font-bold text-primary">
              〇 {selectedOp} {selectedConst} = △
            </p>
          )}
        </div>
      );
    }

    // Calculation Rules - Combining into One Equation (equation builder)
    if (topicId === 'combining-into-one-equation') {
      const q = currentQuestion as any;
      const numbers = q.numbers || [];
      const equationAnswer = (answers[currentIndex] || '').split('|')[0] || '';
      const numericAnswer = (answers[currentIndex] || '').split('|')[1] || '';

      const handleEquationButton = (part: string) => {
        const newEquation = equationAnswer + part;
        setAnswers((prev) => ({ ...prev, [currentIndex]: `${newEquation}|${numericAnswer}` }));
      };

      const handleEquationBackspace = () => {
        const newEquation = equationAnswer.slice(0, -1);
        setAnswers((prev) => ({ ...prev, [currentIndex]: `${newEquation}|${numericAnswer}` }));
      };

      const handleEquationClear = () => {
        setAnswers((prev) => ({ ...prev, [currentIndex]: `|${numericAnswer}` }));
      };

      const handleNumericAnswer = (value: string) => {
        setAnswers((prev) => ({ ...prev, [currentIndex]: `${equationAnswer}|${value}` }));
      };

      return (
        <div className="flex flex-col items-center gap-4">
          {/* Equation Builder */}
          <div className="w-full bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
            <p className="font-bold text-foreground mb-3 text-center">
              1つの式を作りましょう / Build one equation:
            </p>

            {/* Equation Display */}
            <div className="bg-background rounded-lg p-3 mb-3 min-h-[48px] flex items-center justify-center font-mono text-lg font-bold border-2 border-input">
              {equationAnswer || <span className="text-muted-foreground text-sm">式をここに作く / Build equation here...</span>}
            </div>

            {/* Equation Builder Buttons */}
            <div className="space-y-2">
              {/* Numbers */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-muted-foreground self-center mr-1">数字:</span>
                {numbers.map((num: number) => (
                  <button
                    key={num}
                    onClick={() => handleEquationButton(num.toString())}
                    className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-lg font-bold text-primary transition-colors"
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Operators */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-muted-foreground self-center mr-1">記号:</span>
                {['+', '-', '×', '÷', '(', ')'].map((op) => (
                  <button
                    key={op}
                    onClick={() => handleEquationButton(` ${op} `)}
                    className="px-3 py-1.5 bg-kid-purple/10 hover:bg-kid-purple/20 rounded-lg font-bold text-kid-purple transition-colors"
                  >
                    {op}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex gap-2 justify-center pt-2">
                <button
                  onClick={handleEquationBackspace}
                  className="px-4 py-2 bg-kid-yellow/20 hover:bg-kid-yellow/30 rounded-lg font-bold text-foreground transition-colors"
                >
                  ← けす / Back
                </button>
                <button
                  onClick={handleEquationClear}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg font-bold text-red-600 transition-colors"
                >
                  クリア / Clear
                </button>
              </div>
            </div>
          </div>

          {/* Numeric Answer Input */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-foreground">答え / Answer:</span>
            <input
              type="number"
              value={numericAnswer}
              onChange={(e) => handleNumericAnswer(e.target.value)}
              className="w-32 h-14 text-center text-2xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
              placeholder="?"
            />
          </div>
        </div>
      );
    }

    // Default number input for all other questions
    return (
      <input
        key={`num-${currentIndex}`}
        type="number"
        step="0.001"
        value={getCurrentAnswer()}
        onChange={(e) => handleAnswerChange(e.target.value)}
        className="w-32 h-14 text-center text-2xl font-bold rounded-xl border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
        placeholder="?"
        autoFocus
      />
    );
  };

  // Show results screen when user clicks "See Results"
  if (showResultsScreen && isGraded) {
    const correct = Object.values(questionResults).filter(r => r).length;
    const percentage = Math.round((correct / questions.length) * 100);
    const timeElapsed = Date.now() - startTime;
    const incorrectCount = questions.length - correct;

    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-card rounded-2xl shadow-kid border-2 border-border p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-yellow-600" />
          </div>

          <h2 className="text-3xl font-black text-foreground mb-2">
            テスト完了！ / Test Complete!
          </h2>

          <div className="text-5xl font-black text-primary mb-2">
            {percentage}%
          </div>

          <p className="text-lg text-muted-foreground mb-6">
            {correct} / {questions.length} 問正解 / correct
          </p>

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Clock className="w-5 h-5" />
            <span>時間 / Time: {formatTime(timeElapsed)}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">{correct}</div>
              <div className="text-xs text-green-600">正解 / Correct</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
              <div className="text-xs text-red-600">不正解 / Incorrect</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
              <div className="text-xs text-blue-600">合計 / Total</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onExit}
              className="w-full px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
            >
              終了 / Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">終了 / Exit</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            問 {currentIndex + 1} / {questions.length}
          </span>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topic Badge */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-block px-3 py-1 bg-kid-blue/10 text-kid-blue rounded-full text-sm font-medium">
          {currentQuestion?.tabName}
        </span>
        {(currentQuestion as any)?.topicName && (
          <span className="inline-block px-3 py-1 bg-kid-purple/10 text-kid-purple rounded-full text-sm font-medium">
            {(currentQuestion as any).topicName}
          </span>
        )}
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-2xl shadow-kid border-2 border-border p-6">
        {/* Question Text */}
        <div className="mb-4">
          <p className="text-xl font-medium leading-relaxed">{currentQuestion?.text}</p>
          <p className="text-sm text-muted-foreground mt-1">{currentQuestion?.textEn}</p>

          {/* Hint for expected answer format (for ratio/accuracy rate questions) */}
          {(currentQuestion as any).hint && (
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium flex items-center gap-2">
                <span>💡</span>
                {(currentQuestion as any).hint}
              </p>
              {(currentQuestion as any).hintEn && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {(currentQuestion as any).hintEn}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Geometry Diagram (if applicable) */}
        {/* Don't render GeometryDiagram for interactive exercises - they render their own visuals */}
        {isGeometryQuestion(getQuestionType(currentQuestion), currentQuestion) &&
         (currentQuestion as any).diagram &&
         !isInteractiveExercise(currentQuestion) && (
          <div className="mb-4">
            <GeometryDiagram diagram={(currentQuestion as any).diagram} />
          </div>
        )}

        {/* Area Shape Diagram (if applicable) */}
        {isAreaQuestion(getQuestionType(currentQuestion)) && renderAreaShape()}

        {/* Line Graph Visualizer (if applicable) */}
        {isLineGraphQuestion(getQuestionType(currentQuestion)) && (currentQuestion as any).dataPoints && !isDrawingGraphQuestion(getQuestionType(currentQuestion)) && (
          <div className="mb-6">
            <LineGraphVisualizer
              dataPoints={(currentQuestion as any).dataPoints}
              xAxisLabel={(currentQuestion as any).xAxisLabel}
              xAxisLabelEn={(currentQuestion as any).xAxisLabelEn}
              yAxisLabel={(currentQuestion as any).yAxisLabel}
              yAxisLabelEn={(currentQuestion as any).yAxisLabelEn}
              yAxisMin={(currentQuestion as any).yAxisMin}
              yAxisMax={(currentQuestion as any).yAxisMax}
              tickInterval={(currentQuestion as any).tickInterval}
              hasWavyLine={(currentQuestion as any).hasWavyLine}
              wavyLineBase={(currentQuestion as any).wavyLineBase}
              secondDataPoints={(currentQuestion as any).secondDataPoints}
              line1Label={(currentQuestion as any).line1Label}
              line1LabelEn={(currentQuestion as any).line1LabelEn}
              line2Label={(currentQuestion as any).line2Label}
              line2LabelEn={(currentQuestion as any).line2LabelEn}
              isComparing={getQuestionType(currentQuestion) === 'comparing-two-graphs'}
            />
          </div>
        )}

        {/* Drawing Graph Interactive (for drawing-graph topic) */}
        {isDrawingGraphQuestion(getQuestionType(currentQuestion)) && (currentQuestion as any).tableData && (
          <div className="mb-6">
            <DrawingGraphInteractive
              key={`test-drawing-${(currentQuestion as any).id}-${currentIndex}`}
              tableData={(currentQuestion as any).tableData}
              plottedPoints={plottedPoints[currentIndex] || []}
              onPointPlot={handlePointPlot}
              yAxisMin={(currentQuestion as any).yAxisMin}
              yAxisMax={(currentQuestion as any).yAxisMax}
              yAxisLabel={(currentQuestion as any).yAxisLabel}
              graded={false}
            />
            <div className="flex justify-center gap-3 mt-3">
              <button
                onClick={handleUndoPoint}
                disabled={!plottedPoints[currentIndex] || plottedPoints[currentIndex].length === 0}
                className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed text-yellow-700 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <span>↩️</span>
                <span>1つ戻す / Undo</span>
              </button>
              <button
                onClick={handleClearPoints}
                disabled={!plottedPoints[currentIndex] || plottedPoints[currentIndex].length === 0}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed text-red-700 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <span>🗑️</span>
                <span>全部消す / Clear All</span>
              </button>
            </div>
          </div>
        )}

        {/* Interactive Exercise (dotted paper, diagonals, etc.) */}
        {isInteractiveExercise(currentQuestion) && (
          <div className="mb-4">
            {renderInteractiveExercise()}
          </div>
        )}

        {/* Decimal Visual Aids (vertical grid, shift arrows, etc.) */}
        {(isDecimalAddSubtract(getQuestionType(currentQuestion)) ||
          isDecimalShift(getQuestionType(currentQuestion)) ||
          isDecimalMultiplyDivide(getQuestionType(currentQuestion))) &&
          renderDecimalVisual()}

        {/* Division Visual Aids (division bracket, problem display) */}
        {isDivisionQuestion(getQuestionType(currentQuestion)) && renderDivisionVisual()}

        {/* Large Numbers Visual Aids (PlaceValueChart for reading-oku-cho) */}
        {getQuestionType(currentQuestion) === 'reading-oku-cho' && (currentQuestion as any).numericValue && (
          <div className="mb-6">
            <PlaceValueChart number={(currentQuestion as any).numericValue} />
          </div>
        )}

        {/* Investigating Changes Table (showing ○ and △ values) */}
        {isInvestigatingChangesQuestion(getQuestionType(currentQuestion)) && renderInvestigatingChangesTable()}

        {/* Answer Input - only show for non-interactive and non-drawing-graph exercises */}
        {!isInteractiveExercise(currentQuestion) && !isDrawingGraphQuestion(getQuestionType(currentQuestion)) && (
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex flex-col">
              <span className="text-foreground font-medium">答え：</span>
              <span className="text-xs text-muted-foreground">Answer:</span>
            </div>
            {renderAnswerInput()}
            {(currentQuestion as any).unit && (
              <span className="text-lg font-medium text-muted-foreground">{(currentQuestion as any).unit}</span>
            )}
          </div>
        )}

        {/* Graded Feedback - Show Results and Explanations */}
        {isGraded && (
          <div className="mt-6 space-y-4">
            {/* Correct/Incorrect Indicator */}
            <div className="flex items-center gap-3 flex-wrap">
              {questionResults[currentIndex] ? (
                <>
                  <span className="text-3xl font-black text-green-500">〇</span>
                  <span className="text-green-600 font-medium">正解！ / Correct!</span>
                </>
              ) : (
                <>
                  <span className="text-3xl font-black text-red-500">×</span>
                  {!isInteractiveExercise(currentQuestion) && (
                    <span className="text-sm text-muted-foreground">
                      正しいこたえ / Correct answer：
                      <strong className="text-foreground ml-1">
                        {String(getCorrectAnswerValue(currentQuestion))}
                        {(currentQuestion as any).unit || ''}
                      </strong>
                    </span>
                  )}
                  <button
                    onClick={handleTeachMeClick}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-sm font-medium transition-colors ml-auto"
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>おしえて / Teach Me</span>
                  </button>
                </>
              )}
            </div>

            {/* Visual Explanations for Interactive Exercises */}
            {!questionResults[currentIndex] && isInteractiveExercise(currentQuestion) && (() => {
              const diagram = (currentQuestion as any).diagram;
              if (!diagram) return null;

              return (
                <div className="mt-4">
                  {diagram.type === 'intersecting-lines-interactive' && (
                    <IntersectingLinesExplanation
                      givenAngle={diagram.params.givenAngle}
                      rotation={diagram.params.rotation}
                    />
                  )}
                  {diagram.type === 'dotted-paper-quadrilateral' && (() => {
                    const typeMap: Record<number, 'rectangle' | 'square' | 'trapezoid' | 'parallelogram' | 'rhombus' | 'kite' | 'any'> = {
                      0: 'rectangle', 1: 'square', 2: 'trapezoid', 3: 'parallelogram', 4: 'rhombus', 5: 'kite',
                    };
                    const requiredType = typeMap[diagram.params.requiredType] || 'any';
                    const quad = quadrilateralAnswers[currentIndex];
                    const validationMsg = quad?.vertices?.length === 4
                      ? validateQuadrilateral(quad.vertices, requiredType).message
                      : null;
                    return (
                      <>
                        {validationMsg && validationMsg !== 'OK' && (
                          <div className="mb-3 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm font-medium text-red-700">
                            ❌ {validationMsg}
                          </div>
                        )}
                        <QuadrilateralExplanation />
                      </>
                    );
                  })()}
                  {diagram.type === 'diagonals-drawing' && (
                    <DiagonalsDrawingExplanation
                      shapeType={diagram.params.shapeType}
                    />
                  )}
                </div>
              );
            })()}

            {/* Visual Explanation for Polygon Diagonals */}
            {!questionResults[currentIndex] && (currentQuestion as any).diagram?.type === 'polygon-diagonals' && (
              <div className="mt-4">
                <DiagonalsExplanation
                  sides={(currentQuestion as any).diagram.params.sides}
                  correctAnswer={String((currentQuestion as any).answer || '')}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-xl border-2 border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          ← 前へ / Prev
        </button>

        {isGraded ? (
          // Graded Mode - Show See Results button on last question
          currentIndex === questions.length - 1 ? (
            <button
              onClick={() => setShowResultsScreen(true)}
              className="px-8 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              結果を見る / See Results
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
            >
              次へ / Next →
            </button>
          )
        ) : (
          // Test Mode Navigation
          currentIndex === questions.length - 1 ? (
            <button
              onClick={handleGradeClick}
              className="px-8 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              採点 / Grade
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
            >
              次へ / Next →
            </button>
          )
        )}
      </div>

      {/* Question Navigator Dots */}
      <div className="flex flex-wrap justify-center gap-1 mt-6">
        {questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              idx === currentIndex
                ? 'bg-primary w-6'
                : isGraded
                ? questionResults[idx]
                  ? 'bg-green-400'
                  : 'bg-red-400'
                : answers[idx]
                ? 'bg-green-400'
                : 'bg-muted'
            )}
          />
        ))}
      </div>

      {/* Unanswered Questions Modal */}
      {showUnansweredModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-kid border-2 border-border p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-2 text-foreground">
              未回答の問題があります / Unanswered Questions
            </h3>
            <p className="text-muted-foreground mb-4">
              以下の問題にまだ答えていません。確認してください。/
              You haven't answered these questions yet. Please check them.
            </p>

            <div className="space-y-2 mb-6">
              {unansweredQuestions.map((idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowUnansweredModal(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-kid-yellow/10 hover:bg-kid-yellow/20 border border-kid-yellow/30 transition-colors text-left"
                >
                  <span className="font-medium">
                    問 {idx + 1} / Question {idx + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {questions[idx]?.topicName || questions[idx]?.tabName || ''}
                  </span>
                  <span className="text-kid-blue font-bold">→</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowUnansweredModal(false)}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
              >
                戻る / Go Back
              </button>
              <button
                onClick={handleGrade}
                className="w-full px-6 py-3 bg-muted text-muted-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors"
              >
                このまま採点する / Grade Anyway ({unansweredQuestions.length} unanswered)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grade Confirmation Modal */}
      {showGradeConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-kid border-2 border-border p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-2 text-foreground flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-kid-blue" />
              採点しますか？ / Ready to Grade?
            </h3>
            <p className="text-muted-foreground mb-6">
              すべての問題に答えました。採点してもよろしいですか？まだ答えを確認したい場合は「戻る」を押してください。/
              You have answered all questions. Are you ready to submit for grading? Press "Go Back" if you still want to review your answers.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowGradeConfirmModal(false);
                  handleGrade();
                }}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
              >
                はい、採点する / Yes, Grade My Test
              </button>
              <button
                onClick={() => setShowGradeConfirmModal(false)}
                className="w-full px-6 py-3 bg-muted text-muted-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors"
              >
                戻る / Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teach Me Modal - Shows explanation for wrong answers */}
      {showTeachMeModal && teachMeQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-kid border-2 border-border p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              おしえて / Teach Me
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-xl">
                <p className="font-medium text-foreground">{teachMeQuestion.question || teachMeQuestion.text}</p>
                {(teachMeQuestion as any).textEn && (
                  <p className="text-sm text-muted-foreground mt-1">{(teachMeQuestion as any).textEn}</p>
                )}
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">正しいこたえ / Correct Answer:</p>
                <p className="text-lg font-bold text-green-700 dark:text-green-400">
                  {String(teachMeQuestion.answer || '')}
                  {(teachMeQuestion as any).unit || ''}
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">解説 / Explanation:</p>
                {(() => {
                  const q = teachMeQuestion;
                  const qType = getQuestionType(q);

                  // Generate explanation based on question type
                  if ((q as any).diagram?.type === 'intersecting-lines-interactive' ||
                      (q as any).diagram?.type === 'intersecting') {
                    const givenAngle = (q as any).diagram?.params?.givenAngle || (q as any).givenAngle || 45;
                    return (
                      <div className="space-y-2 text-foreground">
                        <p>交差する線の角度について考えてみよう。</p>
                        <p>1. 直線の上にある角の和は 180° です。</p>
                        <p>2. 与えられた角が {givenAngle}° のとき、隣り合う角は {180 - givenAngle}° になります。</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Let's think about the angles of intersecting lines.<br/>
                          1. Angles on a straight line add up to 180°.<br/>
                          2. When the given angle is {givenAngle}°, the adjacent angle is {180 - givenAngle}°.
                        </p>
                      </div>
                    );
                  } else if ((q as any).diagram?.type === 'dotted-paper-quadrilateral') {
                    const requiredType = (q as any).diagram?.params?.requiredType;
                    const shapeNames: Record<number, string> = {
                      0: '長方形 (rectangle)', 1: '正方形 (square)', 2: '台形 (trapezoid)',
                      3: '平行四辺形 (parallelogram)', 4: 'ひし形 (rhombus)', 5: '凧 (kite)'
                    };
                    const shapeName = shapeNames[requiredType] || '指定された図形';
                    return (
                      <div className="space-y-2 text-foreground">
                        <p>この図形は{shapeName}です。</p>
                        <p>・対辺が平行である必要があります</p>
                        <p>・角の大きさや辺の長さに特徴があります</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          This shape is a {shapeName}.<br/>
                          Opposite sides must be parallel.<br/>
                          The angles and side lengths have specific characteristics.
                        </p>
                      </div>
                    );
                  } else if ((q as any).diagram?.type === 'diagonals-drawing') {
                    const shapeType = (q as any).diagram?.params?.shapeType;
                    const shapeNames: Record<string, string> = {
                      rectangle: '長方形', square: '正方形', parallelogram: '平行四辺形',
                      rhombus: 'ひし形', trapezoid: '台形', kite: '凧'
                    };
                    return (
                      <div className="space-y-2 text-foreground">
                        <p>{shapeNames[shapeType] || shapeType}の対角線を引きます。</p>
                        <p>・対角線は頂点と頂点を結ぶ線です</p>
                        <p>・{shapeNames[shapeType] || shapeType}では {(q as any).answer || 2} 本の対角線が引けます</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Draw the diagonals of the {shapeType}.<br/>
                          Diagonals connect opposite vertices.<br/>
                          A {shapeType} has {(q as any).answer || 2} diagonals.
                        </p>
                      </div>
                    );
                  } else if ((q as any).diagram?.type === 'polygon-diagonals') {
                    const sides = (q as any).diagram?.params?.sides || (q as any).sides || 5;
                    const diagonals = (sides * (sides - 3)) / 2;
                    return (
                      <div className="space-y-2 text-foreground">
                        <p>{sides}角形の対角線の数を求めます。</p>
                        <p>公式：n角形の対角線の数 = n × (n - 3) ÷ 2</p>
                        <p>計算：{sides} × ({sides} - 3) ÷ 2 = {sides} × {sides - 3} ÷ 2 = {diagonals}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Find the number of diagonals in a {sides}-sided polygon.<br/>
                          Formula: Number of diagonals = n × (n - 3) ÷ 2<br/>
                          Calculation: {sides} × {sides - 3} ÷ 2 = {diagonals}
                        </p>
                      </div>
                    );
                  } else if (isAreaQuestion(qType) || qType === 'calculating-area') {
                    const width = (q as any).width || (q as any).side || 5;
                    const height = (q as any).height || (q as any).side || 5;
                    const area = (q as any).area || width * height;
                    return (
                      <div className="space-y-2 text-foreground">
                        <p>面積を求めます。</p>
                        <p>公式：面積 = 幅 × 高さ</p>
                        <p>計算：{width} × {height} = {area}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Calculate the area.<br/>
                          Formula: Area = width × height<br/>
                          Calculation: {width} × {height} = {area}
                        </p>
                      </div>
                    );
                  } else {
                    // Generic explanation - use question's explanation fields if available
                    const explanation = (q as any).explanation;
                    const explanationEn = (q as any).explanationEn;
                    const formula = (q as any).formula;
                    const formulaEn = (q as any).formulaEn;
                    const steps = (q as any).steps;

                    return (
                      <div className="space-y-3 text-foreground">
                        {/* Step-by-step explanation */}
                        {explanation && (
                          <div className="space-y-2">
                            <p className="font-medium">{explanation}</p>
                            {explanationEn && (
                              <p className="text-sm text-muted-foreground">{explanationEn}</p>
                            )}
                          </div>
                        )}

                        {/* Formula showing the calculation */}
                        {formula && (
                          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                            <p className="text-sm text-green-700 dark:text-green-300 font-bold">
                              式：{formula}
                            </p>
                            {formulaEn && (
                              <p className="text-xs text-green-600 dark:text-green-400">
                                Formula: {formulaEn}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Steps for order of operations */}
                        {steps && steps.length > 0 && (
                          <div className="space-y-2 mt-3">
                            <p className="font-medium text-foreground">計算の順序 / Order of operations:</p>
                            <ol className="list-decimal list-inside space-y-1 text-sm">
                              {steps.map((step: any, idx: number) => (
                                <li key={idx} className="text-foreground">
                                  <span className="font-bold">{step.operation}</span> = {step.result}
                                  <span className="text-muted-foreground text-xs ml-2">({step.description})</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {/* Fallback if no explanation available */}
                        {!explanation && !formula && (
                          <div className="space-y-2">
                            <p>この問題の正しい答えは <strong>{String(q.answer || '')}</strong> です。</p>
                            <p className="text-sm text-muted-foreground">
                              The correct answer is <strong>{String(q.answer || '')}</strong>.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  }
                })()}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowTeachMeModal(false)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
              >
                閉じる / Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestMode;
