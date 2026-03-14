import { useState } from 'react';
import { X, Lightbulb, BookOpen, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TeachMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrySimilar: () => void;
  onContinue: () => void;
  question: {
    text: string;
    textEn: string;
    answer: number | string;
    visual?: React.ReactNode;
  };
  userAnswer: string;
  topic: string;
  questionType?: string;
}

interface LessonContent {
  titleJa: string;
  titleEn: string;
  explanationJa: string;
  explanationEn: string;
  tipJa: string;
  tipEn: string;
  visualType: 'number-line' | 'groups' | 'formula' | 'diagram' | 'none';
}

const getLessonContent = (topic: string, questionType?: string): LessonContent => {
  const lessons: Record<string, LessonContent> = {
    'addition': {
      titleJa: 'たし算のコツ',
      titleEn: 'Addition Tips',
      explanationJa: 'たし算は、ものをあわせる計算です',
      explanationEn: 'Addition means combining things together',
      tipJa: 'おおきい数からかぞえるとかんたん！',
      tipEn: 'Start counting from the larger number!',
      visualType: 'groups',
    },
    'subtraction': {
      titleJa: 'ひき算のコツ',
      titleEn: 'Subtraction Tips',
      explanationJa: 'ひき算は、のこりをもとめる計算です',
      explanationEn: 'Subtraction means finding what\'s left',
      tipJa: 'ちいさい数をおおきい数からひきます',
      tipEn: 'Take the smaller number from the larger one',
      visualType: 'number-line',
    },
    'multiplication': {
      titleJa: 'かけ算のコツ',
      titleEn: 'Multiplication Tips',
      explanationJa: 'かけ算は、おなじ数をなんどもたす計算です',
      explanationEn: 'Multiplication means adding the same number multiple times',
      tipJa: '「～この」っておもうとわかりやすい！',
      tipEn: 'Think "groups of" to make it easier!',
      visualType: 'groups',
    },
    'division': {
      titleJa: 'わり算のコツ',
      titleEn: 'Division Tips',
      explanationJa: 'わり算は、おなじ数でわける計算です',
      explanationEn: 'Division means splitting into equal groups',
      tipJa: 'かけ算のひょうをつかうとべんり！',
      tipEn: 'Use the multiplication table to help!',
      visualType: 'groups',
    },
    'decimals': {
      titleJa: '小数のコツ',
      titleEn: 'Decimal Tips',
      explanationJa: '小数は、１よりちいさい数をあらわします',
      explanationEn: 'Decimals represent numbers smaller than 1',
      tipJa: '小数点の位置にちゅうい！',
      tipEn: 'Watch the decimal point position!',
      visualType: 'number-line',
    },
    'fractions': {
      titleJa: '分数のコツ',
      titleEn: 'Fraction Tips',
      explanationJa: '分数は、ものをわける時につかいます',
      explanationEn: 'Fractions are used when sharing things',
      tipJa: 'ぶんし（上）はとった数、ぶんぼ（下）はわけた数',
      tipEn: 'Numerator (top) = parts taken, Denominator (bottom) = total parts',
      visualType: 'diagram',
    },
    'ratios': {
      titleJa: '倍の数のコツ',
      titleEn: 'Ratio Tips',
      explanationJa: '「倍」は、おなじ数をいくつも集めた数です',
      explanationEn: '"Times" means how many groups of the same number',
      tipJa: 'もとになる数 × 倍 = 答え',
      tipEn: 'Base number × times = answer',
      visualType: 'groups',
    },
    'geometry': {
      titleJa: 'かくのコツ',
      titleEn: 'Angle Tips',
      explanationJa: 'かくは、2本の線が出会う角度です',
      explanationEn: 'Angles measure where two lines meet',
      tipJa: '三角形の内角の和は180°！',
      tipEn: 'The sum of angles in a triangle is 180°!',
      visualType: 'diagram',
    },
    'default': {
      titleJa: 'おぼえておこう',
      titleEn: 'Remember This',
      explanationJa: 'まちがいはせいちょうのきかいです',
      explanationEn: 'Mistakes are opportunities to grow',
      tipJa: 'もういちどゆっくりかんがえてみよう',
      tipEn: 'Think slowly and try again',
      visualType: 'none',
    },
  };

  // Try to find a specific lesson for the topic/type combo
  const key = questionType || topic;
  return lessons[key] || lessons['default'];
};

const generateVisual = (
  visualType: string,
  userAnswer: string,
  correctAnswer: string | number
): React.ReactNode => {
  const user = parseFloat(userAnswer) || 0;
  const correct = typeof correctAnswer === 'number' ? correctAnswer : parseFloat(correctAnswer);
  const diff = Math.abs(correct - user);

  switch (visualType) {
    case 'groups':
      return (
        <div className="flex flex-col items-center gap-2 p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">あなたの答え / Your answer</p>
              <div className="flex flex-wrap gap-1 justify-center max-w-[120px]">
                {Array.from({ length: Math.min(user, 12) }).map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded bg-red-300" />
                ))}
              </div>
              <p className="text-sm font-bold text-red-500 mt-1">{user}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">せいかい / Correct</p>
              <div className="flex flex-wrap gap-1 justify-center max-w-[120px]">
                {Array.from({ length: Math.min(correct, 12) }).map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded bg-green-400" />
                ))}
              </div>
              <p className="text-sm font-bold text-green-500 mt-1">{correct}</p>
            </div>
          </div>
          {diff > 0 && diff <= 5 && (
            <p className="text-xs text-muted-foreground">
              {diff}こ たりない / {diff} short
            </p>
          )}
        </div>
      );

    case 'number-line':
      const max = Math.max(user, correct, 10);
      const scale = 200 / max;
      return (
        <div className="p-3 bg-muted rounded-lg">
          <div className="relative h-12 w-full">
            {/* Number line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
            {/* Ticks */}
            {Array.from({ length: Math.min(max + 1, 11) }).map((_, i) => (
              <div
                key={i}
                className="absolute top-7 w-0.5 h-2 bg-border"
                style={{ left: `${(i / max) * 100}%` }}
              />
            ))}
            {/* User answer marker */}
            <div
              className="absolute top-4 transform -translate-x-1/2"
              style={{ left: `${(user / max) * 100}%` }}
            >
              <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-white" />
              <p className="text-xs text-red-500 font-bold text-center -mt-6">{user}</p>
            </div>
            {/* Correct answer marker */}
            <div
              className="absolute top-4 transform -translate-x-1/2"
              style={{ left: `${(correct / max) * 100}%` }}
            >
              <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
              <p className="text-xs text-green-600 font-bold text-center -mt-6">{correct}</p>
            </div>
            {/* Difference arrow */}
            {user !== correct && (
              <div
                className="absolute top-10 h-0.5 bg-yellow-400"
                style={{
                  left: `${(Math.min(user, correct) / max) * 100}%`,
                  width: `${(Math.abs(correct - user) / max) * 100}%`,
                }}
              />
            )}
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            数直線 / Number line
          </p>
        </div>
      );

    case 'formula':
      return (
        <div className="p-4 bg-muted rounded-lg text-center">
          <p className="text-lg font-mono bg-white/50 inline-block px-3 py-1 rounded">
            ? × ? = {correct}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            かけ算の式 / Multiplication formula
          </p>
        </div>
      );

    case 'diagram':
      return (
        <div className="p-3 bg-muted rounded-lg flex justify-center">
          <div className="relative w-24 h-24">
            {/* Simple pie/bar representation */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="#e5e7eb" />
              {/* Filled portion based on correct answer */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="#4ade80"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray={`${(correct / Math.max(correct, 10)) * 251} 251`}
                transform="rotate(-90 50 50)"
              />
              {/* Center text */}
              <text x="50" y="55" textAnchor="middle" className="text-sm font-bold fill-white">
                {correct}
              </text>
            </svg>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const TeachMeModal = ({
  isOpen,
  onClose,
  onTrySimilar,
  onContinue,
  question,
  userAnswer,
  topic,
  questionType,
}: TeachMeModalProps) => {
  const [showExplanation, setShowExplanation] = useState(false);

  if (!isOpen) return null;

  const lesson = getLessonContent(topic, questionType);
  const visual = generateVisual(lesson.visualType, userAnswer, question.answer);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl shadow-kid max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-black text-foreground">{lesson.titleJa}</h2>
              <p className="text-sm text-muted-foreground">{lesson.titleEn}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Answer Comparison */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
              <p className="text-xs text-red-600 mb-1">あなたの答え</p>
              <p className="text-xs text-red-500 mb-2">Your answer</p>
              <p className="text-2xl font-black text-red-500">{userAnswer}</p>
              <div className="text-xl mt-1">❌</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <p className="text-xs text-green-600 mb-1">せいかい</p>
              <p className="text-xs text-green-500 mb-2">Correct</p>
              <p className="text-2xl font-black text-green-600">{question.answer}</p>
              <div className="text-xl mt-1">✓</div>
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm font-medium">{question.text}</p>
            <p className="text-xs text-muted-foreground">{question.textEn}</p>
          </div>

          {/* Visual Explanation */}
          {visual && (
            <div>
              <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                <span className="text-lg">👀</span>
                見てみよう / Let's look
              </h3>
              {visual}
            </div>
          )}

          {/* Explanation Toggle */}
          {!showExplanation ? (
            <button
              onClick={() => setShowExplanation(true)}
              className="w-full py-3 px-4 bg-primary/10 hover:bg-primary/20 rounded-xl text-primary font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Lightbulb className="w-5 h-5" />
              せつめいを見る / Show Explanation
            </button>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
              <h3 className="font-bold text-sm mb-2 flex items-center gap-2 text-yellow-800">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                💡 おぼえてね / Remember
              </h3>
              <p className="text-sm text-yellow-900 mb-1">{lesson.explanationJa}</p>
              <p className="text-xs text-yellow-700">{lesson.explanationEn}</p>

              <div className="mt-3 pt-3 border-t border-yellow-200">
                <p className="text-sm font-medium text-yellow-800">{lesson.tipJa}</p>
                <p className="text-xs text-yellow-700">{lesson.tipEn}</p>
              </div>
            </div>
          )}

          {/* Growth Mindset Message */}
          <div className="text-center py-2">
            <p className="text-sm text-muted-foreground">
              まちがいはせいちょうのきかい！/ Mistakes help us grow!
            </p>
            <p className="text-xs text-muted-foreground">
              つぎはもっとがんばろう / Let's try even harder next time
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onTrySimilar}
              className="flex-1 h-12 text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              にたもんだい / Try Similar
            </Button>
            <Button
              onClick={onContinue}
              className="flex-1 h-12 text-sm bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              つづける / Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachMeModal;
