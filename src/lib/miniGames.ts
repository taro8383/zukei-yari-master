// Mini-Game Breaks - Game logic and state management

export type MiniGameType = 'number-snake' | 'quick-flash' | 'pattern-match' | 'balance-scale' | 'bubble-pop';

export interface MiniGame {
  id: MiniGameType;
  nameJa: string;
  nameEn: string;
  emoji: string;
  descriptionJa: string;
  descriptionEn: string;
  skillJa: string;
  skillEn: string;
  color: string;
  unlocked: boolean;
}

export const MINI_GAMES: MiniGame[] = [
  {
    id: 'number-snake',
    nameJa: 'ナンバースネーク',
    nameEn: 'Number Snake',
    emoji: '🐍',
    descriptionJa: 'へびをうごかして、ばんごうをじゅんばんにたべよう',
    descriptionEn: 'Guide the snake to eat numbers in order',
    skillJa: 'すうじのならび',
    skillEn: 'Number sequences',
    color: 'from-green-400 to-emerald-500',
    unlocked: true,
  },
  {
    id: 'quick-flash',
    nameJa: 'クイックフラッシュ',
    nameEn: 'Quick Flash',
    emoji: '⚡',
    descriptionJa: '30秒でできるだけたくさんのもんだいにこたえよう',
    descriptionEn: 'Answer as many questions as you can in 30 seconds',
    skillJa: 'けいさんのはやさ',
    skillEn: 'Calculation speed',
    color: 'from-yellow-400 to-orange-500',
    unlocked: true,
  },
  {
    id: 'pattern-match',
    nameJa: 'パターンマッチ',
    nameEn: 'Pattern Match',
    emoji: '🧩',
    descriptionJa: 'つぎのすうじやかたちをよみとろう',
    descriptionEn: 'Find the next number or shape in the pattern',
    skillJa: 'パターンみつけ',
    skillEn: 'Pattern recognition',
    color: 'from-purple-400 to-pink-500',
    unlocked: true,
  },
  {
    id: 'balance-scale',
    nameJa: 'てんびんバランス',
    nameEn: 'Balance Scale',
    emoji: '⚖️',
    descriptionJa: 'てんびんをたいとうにたもとう',
    descriptionEn: 'Keep the scale balanced by making both sides equal',
    skillJa: 'しきのたんい',
    skillEn: 'Equation balance',
    color: 'from-blue-400 to-indigo-500',
    unlocked: true,
  },
  {
    id: 'bubble-pop',
    nameJa: 'バブルポップ',
    nameEn: 'Bubble Pop',
    emoji: '🫧',
    descriptionJa: 'Xのばいすうのバブルだけをわってね',
    descriptionEn: 'Pop only the bubbles that are multiples of X',
    skillJa: 'かけざん',
    skillEn: 'Multiplication facts',
    color: 'from-cyan-400 to-blue-500',
    unlocked: true,
  },
];

// Game progress tracking
export interface MiniGameProgress {
  gamesPlayed: number;
  lastPlayedAt: string | null;
  highScores: Record<MiniGameType, number>;
  totalCoinsEarned: number;
}

export const DEFAULT_MINI_GAME_PROGRESS: MiniGameProgress = {
  gamesPlayed: 0,
  lastPlayedAt: null,
  highScores: {
    'number-snake': 0,
    'quick-flash': 0,
    'pattern-match': 0,
    'balance-scale': 0,
    'bubble-pop': 0,
  },
  totalCoinsEarned: 0,
};

// Local storage key
const MINI_GAME_STORAGE_KEY = 'kei-geometry-mini-games';

export const getMiniGameProgress = (): MiniGameProgress => {
  const stored = localStorage.getItem(MINI_GAME_STORAGE_KEY);
  if (stored) {
    return { ...DEFAULT_MINI_GAME_PROGRESS, ...JSON.parse(stored) };
  }
  return DEFAULT_MINI_GAME_PROGRESS;
};

export const saveMiniGameProgress = (progress: MiniGameProgress): void => {
  localStorage.setItem(MINI_GAME_STORAGE_KEY, JSON.stringify(progress));
};

export const updateHighScore = (gameType: MiniGameType, score: number): boolean => {
  const progress = getMiniGameProgress();
  const currentHigh = progress.highScores[gameType] || 0;

  if (score > currentHigh) {
    progress.highScores[gameType] = score;
    progress.gamesPlayed += 1;
    progress.lastPlayedAt = new Date().toISOString();
    saveMiniGameProgress(progress);
    return true; // New high score
  }

  progress.gamesPlayed += 1;
  progress.lastPlayedAt = new Date().toISOString();
  saveMiniGameProgress(progress);
  return false;
};

export const addMiniGameCoins = (coins: number): void => {
  const progress = getMiniGameProgress();
  progress.totalCoinsEarned += coins;
  saveMiniGameProgress(progress);
};

// Check if mini-game should be unlocked (every 20 questions)
export const shouldUnlockMiniGame = (questionsAnswered: number): boolean => {
  return questionsAnswered > 0 && questionsAnswered % 20 === 0;
};

// Generate game questions/data
export interface NumberSnakeLevel {
  numbers: number[];
  targetSequence: number[];
  gridSize: number;
}

export const generateNumberSnakeLevel = (difficulty: number): NumberSnakeLevel => {
  const gridSize = Math.min(6 + Math.floor(difficulty / 2), 10);
  const startNum = Math.floor(Math.random() * 20) + 1;
  const sequenceLength = Math.min(5 + difficulty, 10);

  const targetSequence: number[] = [];
  for (let i = 0; i < sequenceLength; i++) {
    targetSequence.push(startNum + i);
  }

  // Generate grid numbers including target sequence
  const numbers: number[] = [...targetSequence];
  const totalCells = gridSize * gridSize;

  while (numbers.length < totalCells) {
    const randomNum = Math.floor(Math.random() * 50) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }

  // Shuffle
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return { numbers, targetSequence, gridSize };
};

export interface QuickFlashQuestion {
  question: string;
  answer: number;
  type: 'add' | 'subtract' | 'multiply' | 'divide';
}

export const generateQuickFlashQuestion = (difficulty: number): QuickFlashQuestion => {
  const types: QuickFlashQuestion['type'][] = ['add', 'subtract', 'multiply', 'divide'];
  const type = types[Math.floor(Math.random() * types.length)];

  let a: number, b: number, answer: number;

  switch (type) {
    case 'add':
      a = Math.floor(Math.random() * (10 + difficulty * 5)) + 1;
      b = Math.floor(Math.random() * (10 + difficulty * 5)) + 1;
      answer = a + b;
      break;
    case 'subtract':
      a = Math.floor(Math.random() * (20 + difficulty * 5)) + 5;
      b = Math.floor(Math.random() * a) + 1;
      answer = a - b;
      break;
    case 'multiply':
      a = Math.floor(Math.random() * Math.min(9 + difficulty, 12)) + 2;
      b = Math.floor(Math.random() * Math.min(9, 5 + difficulty)) + 2;
      answer = a * b;
      break;
    case 'divide':
      b = Math.floor(Math.random() * Math.min(9, 3 + difficulty)) + 2;
      answer = Math.floor(Math.random() * Math.min(9, 5 + difficulty)) + 2;
      a = b * answer;
      break;
  }

  const symbols = { add: '+', subtract: '-', multiply: '×', divide: '÷' };

  return {
    question: `${a} ${symbols[type]} ${b} = ?`,
    answer,
    type,
  };
};

export interface PatternMatchLevel {
  sequence: (number | string)[];
  options: (number | string)[];
  correctAnswer: number | string;
  patternType: 'number' | 'shape';
}

export const generatePatternMatchLevel = (difficulty: number): PatternMatchLevel => {
  const patternTypes = ['add', 'multiply', 'shape'] as const;
  const patternType = patternTypes[Math.floor(Math.random() * patternTypes.length)];

  const shapes = ['🔵', '🔴', '🟢', '🟡', '🟣', '🟠', '⭐', '❤️', '🔺', '🔷'];

  if (patternType === 'shape') {
    const sequenceLength = 4;
    const repeatIndex = Math.floor(Math.random() * 3) + 2;
    const sequence: string[] = [];

    for (let i = 0; i < sequenceLength; i++) {
      sequence.push(shapes[i % repeatIndex]);
    }

    const correctAnswer = shapes[sequenceLength % repeatIndex];
    const options = [correctAnswer];

    while (options.length < 4) {
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      if (!options.includes(randomShape)) {
        options.push(randomShape);
      }
    }

    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return {
      sequence,
      options,
      correctAnswer,
      patternType: 'shape',
    };
  } else {
    // Number pattern
    const start = Math.floor(Math.random() * 10) + 1;
    const step = patternType === 'add'
      ? Math.floor(Math.random() * Math.min(5 + difficulty, 10)) + 1
      : Math.floor(Math.random() * Math.min(3 + difficulty, 5)) + 2;

    const sequence: number[] = [];
    let current = start;

    for (let i = 0; i < 4; i++) {
      sequence.push(current);
      current = patternType === 'add' ? current + step : current * step;
    }

    const correctAnswer = current;
    const options = [correctAnswer];

    while (options.length < 4) {
      const offset = Math.floor(Math.random() * 10) - 5;
      const wrongAnswer = correctAnswer + offset;
      if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }

    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return {
      sequence,
      options,
      correctAnswer,
      patternType: 'number',
    };
  }
};

export interface BalanceScaleLevel {
  leftSide: string;
  rightSide: string;
  answer: number;
  missingSide: 'left' | 'right';
}

export const generateBalanceScaleLevel = (difficulty: number): BalanceScaleLevel => {
  const target = Math.floor(Math.random() * (20 + difficulty * 5)) + 5;
  const operations = ['+', '-'] as const;
  const op = operations[Math.floor(Math.random() * operations.length)];

  const a = Math.floor(Math.random() * target) + 1;
  const b = op === '+' ? target - a : a - target;

  const missingSide = Math.random() < 0.5 ? 'left' : 'right';

  if (missingSide === 'left') {
    return {
      leftSide: '?',
      rightSide: `${a} ${op} ${b}`,
      answer: target,
      missingSide,
    };
  } else {
    return {
      leftSide: `${a} ${op} ${b}`,
      rightSide: '?',
      answer: target,
      missingSide,
    };
  }
};

export interface BubblePopLevel {
  targetMultiple: number;
  bubbles: { id: number; value: number; isMultiple: boolean }[];
  timeLimit: number;
}

export const generateBubblePopLevel = (difficulty: number): BubblePopLevel => {
  const targetMultiple = Math.floor(Math.random() * Math.min(8, 3 + difficulty)) + 2;
  const bubbleCount = 15 + difficulty * 2;
  const bubbles: { id: number; value: number; isMultiple: boolean }[] = [];

  // Ensure at least 5 correct bubbles
  const correctCount = Math.max(5, Math.floor(bubbleCount / 3));
  let addedCorrect = 0;

  for (let i = 0; i < bubbleCount; i++) {
    if (addedCorrect < correctCount) {
      const multiplier = Math.floor(Math.random() * 10) + 1;
      bubbles.push({
        id: i,
        value: targetMultiple * multiplier,
        isMultiple: true,
      });
      addedCorrect++;
    } else {
      let value: number;
      do {
        value = Math.floor(Math.random() * (targetMultiple * 12)) + 1;
      } while (value % targetMultiple === 0);

      bubbles.push({
        id: i,
        value,
        isMultiple: false,
      });
    }
  }

  // Shuffle bubbles
  for (let i = bubbles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bubbles[i], bubbles[j]] = [bubbles[j], bubbles[i]];
  }

  return {
    targetMultiple,
    bubbles,
    timeLimit: 30,
  };
};

// Rewards
export const calculateMiniGameRewards = (gameType: MiniGameType, score: number): { coins: number; xp: number } => {
  const baseCoins = Math.floor(score / 10);
  const bonusCoins = score >= 50 ? 10 : score >= 30 ? 5 : 0;

  return {
    coins: baseCoins + bonusCoins,
    xp: Math.floor(score / 5),
  };
};

// ============================================================================
// QUESTION COUNTER & UNLOCK SYSTEM
// ============================================================================

const QUESTION_COUNT_KEY = 'kei-geometry-question-count';
const LAST_UNLOCK_MILESTONE_KEY = 'kei-geometry-last-unlock-milestone';
const MINI_GAME_PLAYED_KEY = 'kei-geometry-minigame-played';

export interface QuestionCounter {
  totalAnswered: number;
  lastUpdated: string;
}

// Get the current question count from localStorage
export const getQuestionCounter = (): QuestionCounter => {
  const stored = localStorage.getItem(QUESTION_COUNT_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { totalAnswered: 0, lastUpdated: new Date().toISOString() };
};

// Save question count to localStorage
export const saveQuestionCounter = (counter: QuestionCounter): void => {
  localStorage.setItem(QUESTION_COUNT_KEY, JSON.stringify(counter));
};

// Add answered questions and check if mini-game should unlock
export const addAnsweredQuestions = (count: number): {
  newTotal: number;
  shouldUnlock: boolean;
  milestone: number;
  alreadyPlayed: boolean;
} => {
  const counter = getQuestionCounter();
  const newTotal = counter.totalAnswered + count;

  saveQuestionCounter({
    totalAnswered: newTotal,
    lastUpdated: new Date().toISOString(),
  });

  // Check if we hit a 20-question milestone
  const currentMilestone = Math.floor(newTotal / 20) * 20;
  const lastMilestone = parseInt(localStorage.getItem(LAST_UNLOCK_MILESTONE_KEY) || '0');
  const hasPlayed = localStorage.getItem(MINI_GAME_PLAYED_KEY) === 'true';

  // Should unlock if:
  // 1. We hit a new milestone (every 20 questions)
  // 2. We haven't already played for this milestone
  const shouldUnlock = currentMilestone > 0 && currentMilestone > lastMilestone;

  return {
    newTotal,
    shouldUnlock,
    milestone: currentMilestone,
    alreadyPlayed: hasPlayed && currentMilestone === lastMilestone,
  };
};

// Mark mini-game as played for current milestone
export const markMiniGameAsPlayed = (): void => {
  const counter = getQuestionCounter();
  const currentMilestone = Math.floor(counter.totalAnswered / 20) * 20;
  localStorage.setItem(LAST_UNLOCK_MILESTONE_KEY, currentMilestone.toString());
  localStorage.setItem(MINI_GAME_PLAYED_KEY, 'true');
};

// Skip mini-game (locks it until next 20 questions)
export const skipMiniGame = (): void => {
  const counter = getQuestionCounter();
  const currentMilestone = Math.floor(counter.totalAnswered / 20) * 20;
  localStorage.setItem(LAST_UNLOCK_MILESTONE_KEY, currentMilestone.toString());
  localStorage.setItem(MINI_GAME_PLAYED_KEY, 'true');
};

// Check if mini-game is currently available
export const isMiniGameAvailable = (): {
  available: boolean;
  questionsUntilUnlock: number;
  currentMilestone: number;
  totalAnswered: number;
} => {
  const counter = getQuestionCounter();
  const currentMilestone = Math.floor(counter.totalAnswered / 20) * 20;
  const lastMilestone = parseInt(localStorage.getItem(LAST_UNLOCK_MILESTONE_KEY) || '0');
  const hasPlayed = localStorage.getItem(MINI_GAME_PLAYED_KEY) === 'true';

  // Available if we're at a milestone and haven't played yet
  const available = currentMilestone > 0 &&
    currentMilestone > lastMilestone &&
    !hasPlayed;

  const questionsUntilUnlock = 20 - (counter.totalAnswered % 20);

  return {
    available,
    questionsUntilUnlock,
    currentMilestone,
    totalAnswered: counter.totalAnswered,
  };
};

// Reset mini-game lock (call when starting a new game session)
export const resetMiniGameLock = (): void => {
  localStorage.removeItem(LAST_UNLOCK_MILESTONE_KEY);
  localStorage.removeItem(MINI_GAME_PLAYED_KEY);
};

// Reset question counter (for testing)
export const resetQuestionCounter = (): void => {
  localStorage.removeItem(QUESTION_COUNT_KEY);
  localStorage.removeItem(LAST_UNLOCK_MILESTONE_KEY);
  localStorage.removeItem(MINI_GAME_PLAYED_KEY);
};
