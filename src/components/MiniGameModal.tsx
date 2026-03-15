import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Trophy, Coins, Timer, Play, ArrowLeft, Star, Sparkles, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  MINI_GAMES,
  MiniGameType,
  MiniGameProgress,
  getMiniGameProgress,
  updateHighScore,
  calculateMiniGameRewards,
  generateNumberSnakeLevel,
  generateQuickFlashQuestion,
  generatePatternMatchLevel,
  generateBalanceScaleLevel,
  generateBubblePopLevel,
  markMiniGameAsPlayed,
  skipMiniGame,
  isMiniGameAvailable,
  QuickFlashQuestion,
  PatternMatchLevel,
  BalanceScaleLevel,
  BubblePopLevel,
} from '@/lib/miniGames';
import { celebrateCoin, celebrateAchievement } from './ParticleEffects';

interface MiniGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCoinsEarned?: (coins: number) => void;
}

// Number Snake Game
const NumberSnakeGame = ({ onGameEnd }: { onGameEnd: (score: number) => void }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [collectedNumbers, setCollectedNumbers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameData] = useState(() => generateNumberSnakeLevel(1));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          onGameEnd(score);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [score, onGameEnd]);

  const handleNumberClick = (num: number) => {
    const targetIndex = collectedNumbers.length;
    if (num === gameData.targetSequence[targetIndex]) {
      const newCollected = [...collectedNumbers, num];
      setCollectedNumbers(newCollected);
      setScore((s) => s + 10);

      if (newCollected.length === gameData.targetSequence.length) {
        // Level complete
        setLevel((l) => l + 1);
        setCollectedNumbers([]);
        setScore((s) => s + 50);
        celebrateCoin();
      }
    } else {
      // Wrong number - penalty
      setScore((s) => Math.max(0, s - 5));
    }
  };

  return (
    <div className="space-y-4">
      {/* HUD */}
      <div className="flex items-center justify-between bg-green-50 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐍</span>
          <div>
            <p className="text-sm font-bold">Level {level}</p>
            <p className="text-xs text-muted-foreground">Score: {score}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-orange-600">
          <Timer className="w-4 h-4" />
          <span className="font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Target Sequence */}
      <div className="bg-white rounded-xl p-3 border-2 border-green-200">
        <p className="text-xs text-muted-foreground mb-2">じゅんばんにたべよう / Eat in order:</p>
        <div className="flex gap-2 flex-wrap">
          {gameData.targetSequence.map((num, i) => (
            <div
              key={i}
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm',
                i < collectedNumbers.length
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-400'
              )}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        className="grid gap-2 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${gameData.gridSize}, 1fr)`,
          maxWidth: `${gameData.gridSize * 50}px`,
        }}
      >
        {gameData.numbers.map((num, i) => (
          <button
            key={i}
            onClick={() => handleNumberClick(num)}
            className={cn(
              'aspect-square rounded-lg font-bold text-lg transition-all',
              'hover:scale-105 active:scale-95',
              collectedNumbers.includes(num)
                ? 'bg-green-200 text-green-700 cursor-default'
                : 'bg-white border-2 border-green-300 hover:border-green-400 hover:bg-green-50'
            )}
            disabled={collectedNumbers.includes(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground">
        すうじをじゅんばんにタップ！/ Tap numbers in order!
      </p>
    </div>
  );
};

// Quick Flash Game
const QuickFlashGame = ({ onGameEnd }: { onGameEnd: (score: number) => void }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuickFlashQuestion>(() =>
    generateQuickFlashQuestion(1)
  );
  const [answer, setAnswer] = useState('');
  const [streak, setStreak] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          onGameEnd(score);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [score, onGameEnd]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAnswer = parseInt(answer);

    if (numAnswer === currentQuestion.answer) {
      const streakBonus = Math.floor(streak / 3) * 5;
      setScore((s) => s + 10 + streakBonus);
      setStreak((s) => s + 1);
      celebrateCoin();
    } else {
      setStreak(0);
    }

    setCurrentQuestion(generateQuickFlashQuestion(Math.floor(score / 50) + 1));
    setAnswer('');
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-4">
      {/* HUD */}
      <div className="flex items-center justify-between bg-yellow-50 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <div>
            <p className="text-sm font-bold">Score: {score}</p>
            {streak > 2 && (
              <p className="text-xs text-orange-600">🔥 {streak} streak! +{Math.floor(streak / 3) * 5}</p>
            )}
          </div>
        </div>
        <div className={cn(
          'flex items-center gap-1',
          timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-orange-600'
        )}>
          <Timer className="w-4 h-4" />
          <span className="font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-8 text-center border-2 border-yellow-200">
        <p className="text-4xl font-black text-foreground mb-6">
          {currentQuestion.question}
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
          <input
            ref={inputRef}
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-32 h-14 text-2xl text-center font-bold rounded-xl border-2 border-yellow-300 focus:border-yellow-500 outline-none"
            placeholder="?"
            autoFocus
          />
          <Button
            type="submit"
            className="h-14 px-6 bg-gradient-to-r from-yellow-400 to-orange-500"
          >
            GO!
          </Button>
        </form>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        できるだけはやく！/ As fast as you can!
      </p>
    </div>
  );
};

// Pattern Match Game
const PatternMatchGame = ({ onGameEnd }: { onGameEnd: (score: number) => void }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameData, setGameData] = useState<PatternMatchLevel>(() => generatePatternMatchLevel(1));
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleOptionClick = (option: number | string) => {
    if (feedback) return;

    setSelectedOption(option);

    if (option === gameData.correctAnswer) {
      setFeedback('correct');
      setScore((s) => s + 20);
      celebrateCoin();

      setTimeout(() => {
        setLevel((l) => l + 1);
        setGameData(generatePatternMatchLevel(level + 1));
        setSelectedOption(null);
        setFeedback(null);
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        onGameEnd(score);
      }, 500);
    }
  };

  return (
    <div className="space-y-4">
      {/* HUD */}
      <div className="flex items-center justify-between bg-purple-50 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧩</span>
          <div>
            <p className="text-sm font-bold">Level {level}</p>
            <p className="text-xs text-muted-foreground">Score: {score}</p>
          </div>
        </div>
      </div>

      {/* Pattern Display */}
      <div className="bg-white rounded-2xl p-6 border-2 border-purple-200">
        <p className="text-xs text-muted-foreground mb-4 text-center">
          つぎはなに？ / What comes next?
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {gameData.sequence.map((item, i) => (
            <div
              key={i}
              className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-2xl"
            >
              {item}
            </div>
          ))}
          <div className="w-14 h-14 bg-purple-200 rounded-xl flex items-center justify-center text-2xl border-2 border-dashed border-purple-400">
            ?
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {gameData.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(option)}
            className={cn(
              'h-16 rounded-xl text-2xl font-bold transition-all',
              'hover:scale-105 active:scale-95 border-2',
              selectedOption === option && feedback === 'correct'
                ? 'bg-green-500 text-white border-green-600'
                : selectedOption === option && feedback === 'wrong'
                ? 'bg-red-500 text-white border-red-600'
                : 'bg-white border-purple-200 hover:border-purple-400'
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

// Balance Scale Game
const BalanceScaleGame = ({ onGameEnd }: { onGameEnd: (score: number) => void }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameData, setGameData] = useState<BalanceScaleLevel>(() => generateBalanceScaleLevel(1));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const possibleAnswers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 24, 25, 30];

  const handleAnswerClick = (answer: number) => {
    setSelectedAnswer(answer);

    if (answer === gameData.answer) {
      setScore((s) => s + 25);
      celebrateCoin();

      setTimeout(() => {
        setLevel((l) => l + 1);
        setGameData(generateBalanceScaleLevel(level + 1));
        setSelectedAnswer(null);
      }, 800);
    } else {
      setTimeout(() => {
        onGameEnd(score);
      }, 500);
    }
  };

  return (
    <div className="space-y-4">
      {/* HUD */}
      <div className="flex items-center justify-between bg-blue-50 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          <div>
            <p className="text-sm font-bold">Level {level}</p>
            <p className="text-xs text-muted-foreground">Score: {score}</p>
          </div>
        </div>
      </div>

      {/* Balance Scale */}
      <div className="bg-white rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-center justify-center gap-4">
          {/* Left Side */}
          <div
            className={cn(
              'flex-1 h-24 rounded-xl flex items-center justify-center text-xl font-bold',
              gameData.missingSide === 'left'
                ? 'bg-blue-100 border-2 border-dashed border-blue-400 text-blue-400'
                : 'bg-blue-50'
            )}
          >
            {gameData.leftSide}
          </div>

          {/* Balance */}
          <div className="text-3xl">=</div>

          {/* Right Side */}
          <div
            className={cn(
              'flex-1 h-24 rounded-xl flex items-center justify-center text-xl font-bold',
              gameData.missingSide === 'right'
                ? 'bg-blue-100 border-2 border-dashed border-blue-400 text-blue-400'
                : 'bg-blue-50'
            )}
          >
            {gameData.rightSide}
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-4">
          たいとうにするすうじをえらぼう / Choose the number to balance
        </p>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-5 gap-2">
        {possibleAnswers.slice(0, 10).map((num) => (
          <button
            key={num}
            onClick={() => handleAnswerClick(num)}
            className={cn(
              'h-12 rounded-lg text-lg font-bold transition-all',
              'hover:scale-105 active:scale-95',
              selectedAnswer === num
                ? num === gameData.answer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-white border-2 border-blue-200 hover:border-blue-400'
            )}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

// Bubble Pop Game
const BubblePopGame = ({ onGameEnd }: { onGameEnd: (score: number) => void }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [gameData] = useState<BubblePopLevel>(() => generateBubblePopLevel(1));
  const [poppedBubbles, setPoppedBubbles] = useState<Set<number>>(new Set());
  const [wrongClicks, setWrongClicks] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          onGameEnd(score);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [score, onGameEnd]);

  const handleBubbleClick = (id: number, isMultiple: boolean) => {
    if (poppedBubbles.has(id)) return;

    if (isMultiple) {
      setPoppedBubbles((prev) => new Set([...prev, id]));
      setScore((s) => s + 10);
      celebrateCoin();
    } else {
      setWrongClicks((w) => w + 1);
      setScore((s) => Math.max(0, s - 5));
    }
  };

  const correctCount = gameData.bubbles.filter((b) => b.isMultiple).length;
  const poppedCorrectCount = gameData.bubbles.filter(
    (b) => b.isMultiple && poppedBubbles.has(b.id)
  ).length;

  return (
    <div className="space-y-4">
      {/* HUD */}
      <div className="flex items-center justify-between bg-cyan-50 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🫧</span>
          <div>
            <p className="text-sm font-bold">
              {gameData.targetMultiple}の倍数 / Multiples of {gameData.targetMultiple}
            </p>
            <p className="text-xs text-muted-foreground">
              {poppedCorrectCount}/{correctCount} みつけた / found
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-orange-600">
          <Timer className="w-4 h-4" />
          <span className="font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-500 transition-all"
          style={{ width: `${(poppedCorrectCount / correctCount) * 100}%` }}
        />
      </div>

      {/* Bubbles */}
      <div className="flex flex-wrap gap-3 justify-center">
        {gameData.bubbles.map((bubble) => (
          <button
            key={bubble.id}
            onClick={() => handleBubbleClick(bubble.id, bubble.isMultiple)}
            className={cn(
              'w-14 h-14 rounded-full text-lg font-bold transition-all',
              'flex items-center justify-center',
              poppedBubbles.has(bubble.id)
                ? 'bg-green-500 text-white scale-90 opacity-50'
                : 'bg-gradient-to-br from-cyan-300 to-blue-400 text-white hover:scale-110 shadow-lg'
            )}
            disabled={poppedBubbles.has(bubble.id)}
          >
            {bubble.value}
          </button>
        ))}
      </div>

      {wrongClicks > 0 && (
        <p className="text-xs text-center text-red-500">
          ⚠️ {wrongClicks}回まちがえた / {wrongClicks} wrong clicks (-5 each)
        </p>
      )}
    </div>
  );
};

// Game Results Screen
const GameResults = ({
  score,
  highScore,
  isNewHighScore,
  gameType,
  onClose,
  coinsEarned,
}: {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  gameType: MiniGameType;
  onClose: () => void;
  coinsEarned: number;
}) => {
  const game = MINI_GAMES.find((g) => g.id === gameType)!;

  return (
    <div className="text-center space-y-6 py-4">
      <div className="text-6xl">{isNewHighScore ? '🏆' : game.emoji}</div>

      <div>
        <h3 className="text-2xl font-black">
          {isNewHighScore ? 'ニューハイスコア!' : 'おつかれさま!'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isNewHighScore ? 'New High Score!' : 'Great Job!'}
        </p>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
        <p className="text-sm text-muted-foreground mb-1">今回のスコア / Your Score</p>
        <p className="text-5xl font-black text-orange-600">{score}</p>

        {isNewHighScore && (
          <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
            <Star className="w-3 h-3" />
            NEW RECORD!
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted rounded-xl p-3">
          <p className="text-xs text-muted-foreground">ハイスコア / Best</p>
          <p className="text-xl font-bold">{highScore}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
          <p className="text-xs text-yellow-600">ゲットしたコイン / Coins</p>
          <p className="text-xl font-bold text-yellow-600 flex items-center justify-center gap-1">
            <Coins className="w-4 h-4" />
            +{coinsEarned}
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        つぎのミニゲームは、あと20問こたえるとあきます<br/>
        Next mini-game unlocks after 20 more questions
      </p>

      <Button onClick={onClose} className="w-full bg-gradient-to-r from-primary to-purple-500">
        けいざんにもどる / Back to Practice
      </Button>
    </div>
  );
};

// Main Mini Game Modal
export const MiniGameModal = ({
  isOpen,
  onClose,
  onCoinsEarned,
}: MiniGameModalProps) => {
  const [selectedGame, setSelectedGame] = useState<MiniGameType | null>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'results'>('menu');
  const [finalScore, setFinalScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [progress, setProgress] = useState<MiniGameProgress>(getMiniGameProgress());
  const [unlockStatus, setUnlockStatus] = useState(isMiniGameAvailable());

  // Refresh unlock status when modal opens
  useEffect(() => {
    if (isOpen) {
      setUnlockStatus(isMiniGameAvailable());
      setProgress(getMiniGameProgress());
    }
  }, [isOpen]);

  const handleGameEnd = useCallback(
    (score: number) => {
      setFinalScore(score);

      const newHighScore = updateHighScore(selectedGame!, score);
      setIsNewHighScore(newHighScore);

      const rewards = calculateMiniGameRewards(selectedGame!, score);
      setCoinsEarned(rewards.coins);

      if (onCoinsEarned) {
        onCoinsEarned(rewards.coins);
      }

      // Mark mini-game as played for this milestone
      markMiniGameAsPlayed();
      setUnlockStatus(isMiniGameAvailable());
      setProgress(getMiniGameProgress());
      setGameState('results');

      if (newHighScore) {
        celebrateAchievement();
      }
    },
    [selectedGame, onCoinsEarned]
  );

  const handleSkip = () => {
    skipMiniGame();
    setUnlockStatus(isMiniGameAvailable());
    onClose();
  };

  const handleBackToMenu = () => {
    setSelectedGame(null);
    setGameState('menu');
    setFinalScore(0);
    setIsNewHighScore(false);
    setCoinsEarned(0);
  };

  const handleClose = () => {
    handleBackToMenu();
    onClose();
  };

  const renderGame = () => {
    switch (selectedGame) {
      case 'number-snake':
        return <NumberSnakeGame onGameEnd={handleGameEnd} />;
      case 'quick-flash':
        return <QuickFlashGame onGameEnd={handleGameEnd} />;
      case 'pattern-match':
        return <PatternMatchGame onGameEnd={handleGameEnd} />;
      case 'balance-scale':
        return <BalanceScaleGame onGameEnd={handleGameEnd} />;
      case 'bubble-pop':
        return <BubblePopGame onGameEnd={handleGameEnd} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl shadow-kid max-w-lg w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-indigo-50 to-purple-100 p-6 border-b border-border">
          <button
            onClick={gameState === 'menu' ? handleClose : handleBackToMenu}
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-black/10 transition-colors"
          >
            {gameState === 'menu' ? (
              <X className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-2xl shadow-sm mb-2">
              {gameState === 'menu' ? '🎮' : MINI_GAMES.find((g) => g.id === selectedGame)?.emoji}
            </div>
            <h2 className="text-xl font-black text-foreground">
              {gameState === 'menu'
                ? 'ミニゲーム'
                : MINI_GAMES.find((g) => g.id === selectedGame)?.nameJa}
            </h2>
            <p className="text-sm text-muted-foreground">
              {gameState === 'menu'
                ? 'Mini Games'
                : MINI_GAMES.find((g) => g.id === selectedGame)?.nameEn}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {gameState === 'menu' && (
            <div className="space-y-4">
              {/* Unlock Status */}
              {!unlockStatus.available ? (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-700">
                    <span className="text-2xl mr-2">🔒</span>
                    あと{unlockStatus.questionsUntilUnlock}問でミニゲームがあきます
                  </p>
                  <p className="text-xs text-blue-600">
                    {unlockStatus.questionsUntilUnlock} more questions to unlock mini-games
                  </p>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 text-center">
                  <p className="text-lg font-bold text-purple-800">
                    <span className="text-2xl mr-2">🎉</span>
                    ミニゲームがひらけた！
                  </p>
                  <p className="text-sm text-purple-600">
                    Mini-game unlocked! Choose one to play.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    ※ 1回だけあそべます / Can play once only
                  </p>
                </div>
              )}

              {/* Skip Button (only when available) */}
              {unlockStatus.available && (
                <button
                  onClick={handleSkip}
                  className="w-full py-2 px-4 bg-muted hover:bg-muted/80 rounded-xl text-sm text-muted-foreground transition-colors flex items-center justify-center gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  スキップしてけいざんをつづける / Skip and continue practice
                </button>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted rounded-xl p-3 text-center">
                  <p className="text-2xl">🎮</p>
                  <p className="text-lg font-bold">{progress.gamesPlayed}</p>
                  <p className="text-[10px] text-muted-foreground">プレイ回数</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
                  <p className="text-2xl">🪙</p>
                  <p className="text-lg font-bold text-yellow-600">
                    {progress.totalCoinsEarned}
                  </p>
                  <p className="text-[10px] text-yellow-600">トータルコイン</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
                  <p className="text-2xl">🏆</p>
                  <p className="text-lg font-bold text-purple-600">
                    {Object.values(progress.highScores).filter((s) => s > 0).length}
                  </p>
                  <p className="text-[10px] text-purple-600">ハイスコア</p>
                </div>
              </div>

              {/* Game List */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-muted-foreground">
                  {unlockStatus.available ? 'ゲームを選ぶ / Choose a game' : 'ゲーム一覧 / Game List'}
                </p>
                {MINI_GAMES.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => {
                      if (unlockStatus.available) {
                        setSelectedGame(game.id);
                        setGameState('playing');
                      }
                    }}
                    className={cn(
                      'w-full p-4 rounded-xl text-left transition-all',
                      unlockStatus.available
                        ? 'bg-white border-2 border-border hover:border-primary hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                        : 'bg-muted opacity-50 cursor-not-allowed'
                    )}
                    disabled={!unlockStatus.available}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
                          'bg-gradient-to-br',
                          game.color
                        )}
                      >
                        {game.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold">{game.nameJa}</p>
                          {progress.highScores[game.id] > 0 && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                              🏆 {progress.highScores[game.id]}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{game.nameEn}</p>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {game.descriptionJa}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{game.skillJa}</p>
                      </div>
                      {unlockStatus.available && <Play className="w-5 h-5 text-muted-foreground" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameState === 'playing' && renderGame()}

          {gameState === 'results' && selectedGame && (
            <GameResults
              score={finalScore}
              highScore={progress.highScores[selectedGame]}
              isNewHighScore={isNewHighScore}
              gameType={selectedGame}
              onClose={handleClose}
              coinsEarned={coinsEarned}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniGameModal;
