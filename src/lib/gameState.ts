// Game State Management - Gamification System
// Coins, Streaks, Achievements, XP, Daily Quests, Story Mode

import { StoryProgress, DailyEpisode, getDefaultStoryProgress, generateDailyEpisode } from './storyMode';

// Shop item types
export type ShopItemType = 'theme' | 'avatarColor' | 'powerup';

// Quest types
export type QuestType = 'answer-correct' | 'answer-questions' | 'perfect-score' | 'try-topic' | 'use-hints' | 'streak-days';

// Error pattern tracking types
export interface MistakeEntry {
  timestamp: number;
  topic: string;
  questionType: string;
  userAnswer: string;
  correctAnswer: string;
  errorCategory: ErrorCategory;
}

export type ErrorCategory =
  | 'multiply-divide-confusion'
  | 'add-subtract-confusion'
  | 'decimal-point-error'
  | 'place-value-error'
  | 'unit-conversion-error'
  | 'formula-misapplication'
  | 'calculation-error'
  | 'wrong-operation'
  | 'other';

export interface ErrorPattern {
  category: ErrorCategory;
  count: number;
  lastOccurred: number;
  topics: string[];
}

export interface LearningInsight {
  id: string;
  type: 'pattern-detected' | 'improvement' | 'milestone';
  category?: ErrorCategory;
  messageJa: string;
  messageEn: string;
  recommendationJa: string;
  recommendationEn: string;
  suggestedPractice?: string;
  timestamp: number;
  acknowledged: boolean;
}

export interface DailyQuest {
  id: string;
  type: QuestType;
  icon: string;
  nameJa: string;
  nameEn: string;
  descriptionJa: string;
  descriptionEn: string;
  target: number;
  progress: number;
  completed: boolean;
  reward: number;
  date: string;
}

export interface ShopItem {
  id: string;
  type: ShopItemType;
  icon: string;
  nameJa: string;
  nameEn: string;
  descriptionJa: string;
  descriptionEn: string;
  price: number;
  effect?: string;
}

export interface GameData {
  version: number;
  player: {
    name: string;
    coins: number;
    totalXP: number;
    avatarColor: string;
  };
  progress: {
    [topicId: string]: TopicProgress;
  };
  achievements: string[]; // Unlocked achievement IDs
  inventory: {
    themes: string[]; // Purchased theme IDs
    powerups: { [powerupId: string]: number }; // Count of each powerup
  };
  dailyQuests: DailyQuest[];
  settings: {
    soundEnabled: boolean;
    animationsEnabled: boolean;
    theme: string; // Current theme ID
  };
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    totalTimeMinutes: number;
    streak: {
      current: number;
      longest: number;
      lastActiveDate: string;
      dailyGoalMet: boolean;
    };
    dailyProgress: {
      date: string;
      questionsAnswered: number;
      correctAnswers: number;
    };
  };
  // Error pattern recognition
  mistakes: MistakeEntry[];
  errorPatterns: ErrorPattern[];
  learningInsights: LearningInsight[];
  // Story mode progress
  storyProgress: StoryProgress;
  // Daily episode
  currentDailyEpisode: DailyEpisode | null;
}

export interface TopicProgress {
  topicId: string;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  questionsAttempted: number;
  questionsCorrect: number;
  averageAccuracy: number;
}

export interface Achievement {
  id: string;
  icon: string;
  nameJa: string;
  nameEn: string;
  descriptionJa: string;
  descriptionEn: string;
  coinReward: number;
  condition: (stats: GameData['stats'], gameData: GameData) => boolean;
}

const STORAGE_KEY = 'kei-kun-game-data';
const CURRENT_VERSION = 2;

// Shop items definition
export const SHOP_ITEMS: ShopItem[] = [
  // Themes
  {
    id: 'theme-dark',
    type: 'theme',
    icon: '🌙',
    nameJa: 'ダークモード',
    nameEn: 'Dark Mode',
    descriptionJa: '目にやさしい暗いテーマ',
    descriptionEn: 'Easy on the eyes dark theme',
    price: 200,
  },
  {
    id: 'theme-pastel',
    type: 'theme',
    icon: '🌸',
    nameJa: 'パステル',
    nameEn: 'Pastel Theme',
    descriptionJa: 'やさしい色のパステルテーマ',
    descriptionEn: 'Soft pastel colors theme',
    price: 150,
  },
  {
    id: 'theme-neon',
    type: 'theme',
    icon: '✨',
    nameJa: 'ネオン',
    nameEn: 'Neon Glow',
    descriptionJa: '光るネオンテーマ',
    descriptionEn: 'Glowing neon theme',
    price: 300,
  },
  // Avatar Colors
  {
    id: 'color-red',
    type: 'avatarColor',
    icon: '🔴',
    nameJa: 'レッド',
    nameEn: 'Red',
    descriptionJa: '元気な赤色',
    descriptionEn: 'Energetic red',
    price: 25,
    effect: '#ef4444',
  },
  {
    id: 'color-green',
    type: 'avatarColor',
    icon: '🟢',
    nameJa: 'グリーン',
    nameEn: 'Green',
    descriptionJa: '自然な緑色',
    descriptionEn: 'Natural green',
    price: 25,
    effect: '#22c55e',
  },
  {
    id: 'color-purple',
    type: 'avatarColor',
    icon: '🟣',
    nameJa: 'パープル',
    nameEn: 'Purple',
    descriptionJa: '神秘的な紫色',
    descriptionEn: 'Mysterious purple',
    price: 25,
    effect: '#a855f7',
  },
  {
    id: 'color-orange',
    type: 'avatarColor',
    icon: '🟠',
    nameJa: 'オレンジ',
    nameEn: 'Orange',
    descriptionJa: '明るいオレンジ',
    descriptionEn: 'Bright orange',
    price: 25,
    effect: '#f97316',
  },
  {
    id: 'color-pink',
    type: 'avatarColor',
    icon: '💖',
    nameJa: 'ピンク',
    nameEn: 'Pink',
    descriptionJa: 'かわいいピンク',
    descriptionEn: 'Cute pink',
    price: 50,
    effect: '#ec4899',
  },
  {
    id: 'color-gold',
    type: 'avatarColor',
    icon: '👑',
    nameJa: 'ゴールド',
    nameEn: 'Gold',
    descriptionJa: 'きらきらゴールド',
    descriptionEn: 'Shiny gold',
    price: 100,
    effect: '#fbbf24',
  },
  // Power-ups
  {
    id: 'powerup-extra-hint',
    type: 'powerup',
    icon: '💡',
    nameJa: 'ヒント+1',
    nameEn: 'Extra Hint',
    descriptionJa: '次の問題でヒントが1つ増える',
    descriptionEn: 'Get +1 free hint next exercise',
    price: 25,
  },
  {
    id: 'powerup-double-coins',
    type: 'powerup',
    icon: '💰',
    nameJa: 'コイン2倍',
    nameEn: 'Double Coins',
    descriptionJa: '次の問題でコイン2倍',
    descriptionEn: 'Double coins for next exercise',
    price: 50,
  },
  {
    id: 'powerup-streak-freeze',
    type: 'powerup',
    icon: '❄️',
    nameJa: 'れんぞくフリーズ',
    nameEn: 'Streak Freeze',
    descriptionJa: '1日休んでもれんぞくが切れない',
    descriptionEn: 'Keep streak even if you miss a day',
    price: 100,
  },
];

// Default game data
const defaultGameData: GameData = {
  version: CURRENT_VERSION,
  player: {
    name: 'Kei-kun',
    coins: 0,
    totalXP: 0,
    avatarColor: '#3b82f6',
  },
  progress: {},
  achievements: [],
  inventory: {
    themes: [],
    powerups: {},
  },
  dailyQuests: [],
  settings: {
    soundEnabled: true,
    animationsEnabled: true,
    theme: 'default',
  },
  stats: {
    totalQuestions: 0,
    correctAnswers: 0,
    totalTimeMinutes: 0,
    streak: {
      current: 0,
      longest: 0,
      lastActiveDate: '',
      dailyGoalMet: false,
    },
    dailyProgress: {
      date: new Date().toISOString().split('T')[0],
      questionsAnswered: 0,
      correctAnswers: 0,
    },
  },
  mistakes: [],
  errorPatterns: [],
  learningInsights: [],
  storyProgress: getDefaultStoryProgress(),
  currentDailyEpisode: null,
};

// Achievement definitions
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'perfect_score',
    icon: '🎯',
    nameJa: 'かんぺき！',
    nameEn: 'Perfectionist',
    descriptionJa: '100点をとった！',
    descriptionEn: 'Get a perfect score (100%)',
    coinReward: 50,
    condition: (stats, gameData) => {
      // Check if any recent session had 100%
      return false; // Will be checked during session end
    },
  },
  {
    id: 'explorer',
    icon: '🌈',
    nameJa: 'たんけんか',
    nameEn: 'Explorer',
    descriptionJa: 'すべてのタブを試した',
    descriptionEn: 'Try all 10 topics',
    coinReward: 75,
    condition: (stats, gameData) => {
      const topicsTried = Object.keys(gameData.progress).length;
      return topicsTried >= 10;
    },
  },
  {
    id: 'first_try',
    icon: '⭐',
    nameJa: 'ファーストトライ',
    nameEn: 'First Try',
    descriptionJa: 'はじめての問題にこたえた',
    descriptionEn: 'Answer your first question',
    coinReward: 10,
    condition: (stats) => stats.totalQuestions >= 1,
  },
  {
    id: 'speed_demon',
    icon: '⚡',
    nameJa: 'スピードスター',
    nameEn: 'Speed Demon',
    descriptionJa: 'スピードモードで5問こたえた',
    descriptionEn: 'Complete 5 questions in speed mode',
    coinReward: 100,
    condition: () => false, // Checked during speed mode completion
  },
  {
    id: 'hint_hater',
    icon: '🚫',
    nameJa: 'ヒントなし',
    nameEn: 'Hint Hater',
    descriptionJa: 'ヒントなしで5問せいかい',
    descriptionEn: 'Get 5 correct without hints',
    coinReward: 50,
    condition: () => false, // Checked during no-hint completion
  },
  {
    id: 'streak_3',
    icon: '🔥',
    nameJa: '3日れんぞく',
    nameEn: '3-Day Streak',
    descriptionJa: '3日れんぞくでべんきょうした',
    descriptionEn: 'Practice 3 days in a row',
    coinReward: 30,
    condition: (stats) => stats.streak.current >= 3,
  },
  {
    id: 'streak_7',
    icon: '🏆',
    nameJa: '1週間れんぞく',
    nameEn: 'Week Warrior',
    descriptionJa: '7日れんぞくでべんきょうした',
    descriptionEn: 'Practice 7 days in a row',
    coinReward: 100,
    condition: (stats) => stats.streak.current >= 7,
  },
  {
    id: 'coin_collector',
    icon: '💰',
    nameJa: 'コインコレクター',
    nameEn: 'Coin Collector',
    descriptionJa: 'コインを100まいあつめた',
    descriptionEn: 'Collect 100 coins',
    coinReward: 25,
    condition: (_, gameData) => gameData.player.coins >= 100,
  },
];

// Get game data from localStorage
export const getGameData = (): GameData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultGameData;

    const parsed = JSON.parse(stored);
    // Merge with defaults to handle schema updates
    const merged = { ...defaultGameData, ...parsed };

    // Handle version upgrades
    if (!parsed.inventory) {
      merged.inventory = defaultGameData.inventory;
    }
    if (!parsed.settings?.theme) {
      merged.settings.theme = 'default';
    }
    // Error pattern recognition (v2+ fields)
    if (!parsed.mistakes) {
      merged.mistakes = [];
    }
    if (!parsed.errorPatterns) {
      merged.errorPatterns = [];
    }
    if (!parsed.learningInsights) {
      merged.learningInsights = [];
    }
    // Story mode (v3+ fields)
    if (!parsed.storyProgress) {
      merged.storyProgress = getDefaultStoryProgress();
    }
    if (!parsed.currentDailyEpisode) {
      merged.currentDailyEpisode = null;
    }

    return merged;
  } catch (error) {
    console.error('Failed to get game data:', error);
    return defaultGameData;
  }
};

// Save game data to localStorage
export const saveGameData = (data: GameData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save game data:', error);
  }
};

// Check and update streak
export const updateStreak = (): GameData => {
  const data = getGameData();
  const today = new Date().toISOString().split('T')[0];
  const lastActive = data.stats.streak.lastActiveDate;

  if (lastActive === today) {
    // Already active today, no change
    return data;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastActive === yesterdayStr) {
    // Consecutive day, increase streak
    data.stats.streak.current += 1;
    if (data.stats.streak.current > data.stats.streak.longest) {
      data.stats.streak.longest = data.stats.streak.current;
    }
  } else if (lastActive && lastActive !== today) {
    // Streak broken
    data.stats.streak.current = 1;
  } else {
    // First time using app
    data.stats.streak.current = 1;
  }

  data.stats.streak.lastActiveDate = today;
  data.stats.streak.dailyGoalMet = false;

  // Reset daily progress for new day
  if (data.stats.dailyProgress.date !== today) {
    data.stats.dailyProgress = {
      date: today,
      questionsAnswered: 0,
      correctAnswers: 0,
    };
  }

  saveGameData(data);
  return data;
};

// Earn coins
export const earnCoins = (amount: number): number => {
  const data = getGameData();
  data.player.coins += amount;
  saveGameData(data);
  return data.player.coins;
};

// Spend coins (returns true if successful)
export const spendCoins = (amount: number): boolean => {
  const data = getGameData();
  if (data.player.coins < amount) return false;
  data.player.coins -= amount;
  saveGameData(data);
  return true;
};

// Record question answered
export const recordQuestionAnswered = (isCorrect: boolean, topicId: string): void => {
  const data = getGameData();

  // Update global stats
  data.stats.totalQuestions += 1;
  if (isCorrect) data.stats.correctAnswers += 1;

  // Update daily progress
  const today = new Date().toISOString().split('T')[0];
  if (data.stats.dailyProgress.date !== today) {
    data.stats.dailyProgress = { date: today, questionsAnswered: 0, correctAnswers: 0 };
  }
  data.stats.dailyProgress.questionsAnswered += 1;
  if (isCorrect) data.stats.dailyProgress.correctAnswers += 1;

  // Update topic progress
  if (!data.progress[topicId]) {
    data.progress[topicId] = {
      topicId,
      level: 1,
      currentXP: 0,
      xpToNextLevel: 100,
      totalXP: 0,
      questionsAttempted: 0,
      questionsCorrect: 0,
      averageAccuracy: 0,
    };
  }

  const topicProgress = data.progress[topicId];
  topicProgress.questionsAttempted += 1;
  if (isCorrect) {
    topicProgress.questionsCorrect += 1;
    topicProgress.currentXP += 10;
    topicProgress.totalXP += 10;
    data.player.totalXP += 10;

    // Level up check
    if (topicProgress.currentXP >= topicProgress.xpToNextLevel) {
      topicProgress.level += 1;
      topicProgress.currentXP = topicProgress.currentXP - topicProgress.xpToNextLevel;
      topicProgress.xpToNextLevel = Math.round(topicProgress.xpToNextLevel * 1.2);
    }
  }
  topicProgress.averageAccuracy = Math.round(
    (topicProgress.questionsCorrect / topicProgress.questionsAttempted) * 100
  );

  saveGameData(data);
};

// Check for new achievements
export const checkAchievements = (): { newAchievements: Achievement[]; totalCoinsEarned: number } => {
  const data = getGameData();
  const newAchievements: Achievement[] = [];
  let totalCoinsEarned = 0;

  ACHIEVEMENTS.forEach((achievement) => {
    if (!data.achievements.includes(achievement.id)) {
      // Check if condition is met
      let unlocked = false;

      // Special conditions that need external context
      switch (achievement.id) {
        case 'perfect_score':
          // This is checked separately during score modal
          break;
        case 'speed_demon':
          // This is checked separately during speed mode
          break;
        case 'hint_hater':
          // This is checked separately during no-hint mode
          break;
        default:
          unlocked = achievement.condition(data.stats, data);
      }

      if (unlocked) {
        data.achievements.push(achievement.id);
        newAchievements.push(achievement);
        totalCoinsEarned += achievement.coinReward;
        data.player.coins += achievement.coinReward;
      }
    }
  });

  if (newAchievements.length > 0) {
    saveGameData(data);
  }

  return { newAchievements, totalCoinsEarned };
};

// Unlock specific achievement (for external checks)
export const unlockAchievement = (achievementId: string): Achievement | null => {
  const data = getGameData();
  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);

  if (!achievement || data.achievements.includes(achievementId)) {
    return null;
  }

  data.achievements.push(achievementId);
  data.player.coins += achievement.coinReward;
  saveGameData(data);

  return achievement;
};

// Calculate coins earned for a session
export const calculateSessionCoins = (
  score: number,
  totalQuestions: number,
  hintsUsed: number,
  isSpeedMode: boolean,
  timeSpentSeconds: number
): { baseCoins: number; bonuses: { name: string; amount: number }[]; total: number } => {
  const bonuses: { name: string; amount: number }[] = [];

  // Base coins for correct answers (5 per correct answer)
  const correctAnswers = score;
  const baseCoins = correctAnswers * 5;

  // Perfect score bonus
  if (score === totalQuestions) {
    bonuses.push({ name: 'かんぺき！ / Perfect!', amount: 25 });
  }

  // Speed bonus
  if (isSpeedMode && score === totalQuestions) {
    bonuses.push({ name: 'スピードスター / Speed Master', amount: 15 });
  }

  // No-hint bonus
  if (hintsUsed === 0 && score === totalQuestions) {
    bonuses.push({ name: 'ヒントなし / No Hints', amount: 10 });
  }

  const bonusTotal = bonuses.reduce((sum, b) => sum + b.amount, 0);
  const total = baseCoins + bonusTotal;

  return { baseCoins, bonuses, total };
};

// Get streak status text
export const getStreakStatus = (streak: number): { text: string; color: string } => {
  if (streak >= 30) return { text: '🔥 レジェンド！ / Legendary!', color: '#ef4444' };
  if (streak >= 14) return { text: '🔥 やめられない！ / Unstoppable!', color: '#f97316' };
  if (streak >= 7) return { text: '🔥 ファイヤー！ / On Fire!', color: '#eab308' };
  if (streak >= 3) return { text: '🔥 いい調子！ / Heating Up!', color: '#22c55e' };
  return { text: '🔥 れんぞくしよう！ / Start Streak!', color: '#6b7280' };
};

// Format date for display
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
};

// Buy a shop item
export const buyItem = (itemId: string): { success: boolean; message: string; item?: ShopItem } => {
  const data = getGameData();
  const item = SHOP_ITEMS.find(i => i.id === itemId);

  if (!item) {
    return { success: false, message: 'アイテムが見つかりません / Item not found' };
  }

  // Check if already owned (themes and colors are one-time purchases)
  if (item.type === 'theme' && data.inventory.themes.includes(itemId)) {
    return { success: false, message: 'すでに持っています / Already owned' };
  }

  // Check coins
  if (data.player.coins < item.price) {
    return { success: false, message: 'コインが足りません / Not enough coins' };
  }

  // Spend coins
  data.player.coins -= item.price;

  // Add to inventory based on type
  switch (item.type) {
    case 'theme':
      data.inventory.themes.push(itemId);
      data.settings.theme = itemId;
      break;
    case 'avatarColor':
      if (item.effect) {
        data.player.avatarColor = item.effect;
      }
      break;
    case 'powerup':
      data.inventory.powerups[itemId] = (data.inventory.powerups[itemId] || 0) + 1;
      break;
  }

  saveGameData(data);

  // Dispatch event to update UI
  window.dispatchEvent(new CustomEvent('coins-changed'));
  window.dispatchEvent(new CustomEvent('inventory-changed'));

  return { success: true, message: 'かいものありがとう！ / Purchase successful!', item };
};

// Set active theme
export const setTheme = (themeId: string): boolean => {
  const data = getGameData();

  // Can always set to default
  if (themeId === 'default') {
    data.settings.theme = themeId;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('theme-changed'));
    return true;
  }

  // Check if owned
  if (!data.inventory.themes.includes(themeId)) {
    return false;
  }

  data.settings.theme = themeId;
  saveGameData(data);
  window.dispatchEvent(new CustomEvent('theme-changed'));
  return true;
};

// Use a power-up
export const usePowerup = (powerupId: string): boolean => {
  const data = getGameData();

  if (!data.inventory.powerups[powerupId] || data.inventory.powerups[powerupId] <= 0) {
    return false;
  }

  data.inventory.powerups[powerupId] -= 1;
  saveGameData(data);
  window.dispatchEvent(new CustomEvent('inventory-changed'));
  return true;
};

// Get theme colors
export const getThemeColors = (themeId: string) => {
  const themes: { [key: string]: { primary: string; background: string; card: string; text: string } } = {
    default: {
      primary: '#3b82f6',
      background: '#ffffff',
      card: '#f8fafc',
      text: '#1e293b',
    },
    'theme-dark': {
      primary: '#60a5fa',
      background: '#0f172a',
      card: '#1e293b',
      text: '#f1f5f9',
    },
    'theme-pastel': {
      primary: '#f472b6',
      background: '#fff1f2',
      card: '#fce7f3',
      text: '#831843',
    },
    'theme-neon': {
      primary: '#a855f7',
      background: '#0a0a0a',
      card: '#1a1a2e',
      text: '#e0e7ff',
    },
  };

  return themes[themeId] || themes.default;
};

// Hint types
export interface ProgressiveHint {
  level: number;
  textJa: string;
  textEn: string;
  cost: number;
}

// Generate progressive hints for geometry questions
export const generateGeometryHints = (questionType: string, params: Record<string, any>): ProgressiveHint[] => {
  const hints: ProgressiveHint[] = [
    {
      level: 1,
      textJa: '図をよく見て、与えられた情報を確認しよう',
      textEn: 'Look carefully at the diagram and check the given information',
      cost: 0,
    },
  ];

  switch (questionType) {
    case 'angle':
      hints.push(
        {
          level: 2,
          textJa: `直線の上にある角は、合計で180°になります`,
          textEn: `Angles on a straight line add up to 180°`,
          cost: 2,
        },
        {
          level: 3,
          textJa: `求めたい角 = 180° - ${params.givenAngle}°`,
          textEn: `Target angle = 180° - ${params.givenAngle}°`,
          cost: 5,
        }
      );
      break;
    case 'triangle-angle':
      hints.push(
        {
          level: 2,
          textJa: '三角形の内角の和は180°です',
          textEn: 'The sum of angles in a triangle is 180°',
          cost: 2,
        },
        {
          level: 3,
          textJa: `180° - ${params.angleA}° - ${params.angleB}° = ?`,
          textEn: `180° - ${params.angleA}° - ${params.angleB}° = ?`,
          cost: 5,
        }
      );
      break;
    case 'quadrilateral-angle':
      hints.push(
        {
          level: 2,
          textJa: '四角形の内角の和は360°です',
          textEn: 'The sum of angles in a quadrilateral is 360°',
          cost: 2,
        },
        {
          level: 3,
          textJa: '3つの角を引いて残りを求めよう',
          textEn: 'Subtract the 3 known angles to find the remaining one',
          cost: 5,
        }
      );
      break;
    default:
      hints.push(
        {
          level: 2,
          textJa: '今まで習った公式を思い出してみよう',
          textEn: 'Recall the formulas you have learned',
          cost: 2,
        },
        {
          level: 3,
          textJa: '計算式を立ててみましょう',
          textEn: 'Let\'s set up the calculation formula',
          cost: 5,
        }
      );
  }

  return hints;
};

// Generate progressive hints for ratio questions
export const generateRatioHints = (questionType: string, ratio: number): ProgressiveHint[] => {
  const hints: ProgressiveHint[] = [
    {
      level: 1,
      textJa: '与えられた数値と倍率を確認しよう',
      textEn: 'Check the given values and ratio',
      cost: 0,
    },
  ];

  if (questionType === 'finding-compared') {
    hints.push(
      {
        level: 2,
        textJa: `もとにする数 × ${ratio} = くらべる数`,
        textEn: `Base amount × ${ratio} = Compared amount`,
        cost: 2,
      },
      {
        level: 3,
        textJa: 'かけ算をして答えを出そう',
        textEn: 'Multiply to find the answer',
        cost: 5,
      }
    );
  } else if (questionType === 'finding-base') {
    hints.push(
      {
        level: 2,
        textJa: `くらべる数 ÷ ${ratio} = もとにする数`,
        textEn: `Compared amount ÷ ${ratio} = Base amount`,
        cost: 2,
      },
      {
        level: 3,
        textJa: 'わり算をして答えを出そう',
        textEn: 'Divide to find the answer',
        cost: 5,
      }
    );
  } else {
    hints.push(
      {
        level: 2,
        textJa: 'くらべる数 ÷ もとにする数 = 倍率',
        textEn: 'Compared ÷ Base = Ratio',
        cost: 2,
      },
      {
        level: 3,
        textJa: 'わり算をして答えを出そう',
        textEn: 'Divide to find the answer',
        cost: 5,
      }
    );
  }

  return hints;
};

// Generate progressive hints for division
export const generateDivisionHints = (dividend: number, divisor: number): ProgressiveHint[] => {
  return [
    {
      level: 1,
      textJa: `${dividend} を ${divisor} で分けると？`,
      textEn: `How many ${divisor}s are in ${dividend}?`,
      cost: 0,
    },
    {
      level: 2,
      textJa: `${divisor} × □ = ${dividend} となる □ を求めよう`,
      textEn: `Find □ where ${divisor} × □ = ${dividend}`,
      cost: 2,
    },
    {
      level: 3,
      textJa: `あまりは ${dividend % divisor} です`,
      textEn: `The remainder is ${dividend % divisor}`,
      cost: 5,
    },
  ];
};

// Generate progressive hints for decimals
export const generateDecimalHints = (operation: 'add' | 'subtract' | 'multiply' | 'divide'): ProgressiveHint[] => {
  const operationText: Record<string, { ja: string; en: string }> = {
    add: { ja: 'たし算', en: 'addition' },
    subtract: { ja: 'ひき算', en: 'subtraction' },
    multiply: { ja: 'かけ算', en: 'multiplication' },
    divide: { ja: 'わり算', en: 'division' },
  };

  return [
    {
      level: 1,
      textJa: '小数点の位置に注意しよう',
      textEn: 'Pay attention to decimal point placement',
      cost: 0,
    },
    {
      level: 2,
      textJa: `${operationText[operation].ja}の方法を思い出してみよう`,
      textEn: `Recall how to do ${operationText[operation].en}`,
      cost: 2,
    },
    {
      level: 3,
      textJa: '計算後、小数点の位置を確認しよう',
      textEn: 'Check decimal placement after calculating',
      cost: 5,
    },
  ];
};

// Generate progressive hints for fractions
export const generateFractionHints = (needsCommonDenominator: boolean): ProgressiveHint[] => {
  const hints: ProgressiveHint[] = [
    {
      level: 1,
      textJa: '分母と分子を確認しよう',
      textEn: 'Check the numerators and denominators',
      cost: 0,
    },
  ];

  if (needsCommonDenominator) {
    hints.push(
      {
        level: 2,
        textJa: '通分が必要です。分母を同じにしよう',
        textEn: 'Find a common denominator first',
        cost: 2,
      },
      {
        level: 3,
        textJa: '分母を同じにしてから、分子を計算しよう',
        textEn: 'After common denominator, calculate numerators',
        cost: 5,
      }
    );
  } else {
    hints.push(
      {
        level: 2,
        textJa: '分母は同じなので、分子だけを計算しよう',
        textEn: 'Denominators are the same, just calculate numerators',
        cost: 2,
      },
      {
        level: 3,
        textJa: '答えは約分できますか？',
        textEn: 'Can the answer be simplified?',
        cost: 5,
      }
    );
  }

  return hints;
};

// ============================================
// DAILY QUESTS SYSTEM
// ============================================

interface QuestPoolItem {
  type: QuestType;
  icon: string;
  nameJa: string;
  nameEn: string;
  descriptionJa: string;
  descriptionEn: string;
  targetMin: number;
  targetMax: number;
  rewardMin: number;
  rewardMax: number;
}

const QUEST_POOL: QuestPoolItem[] = [
  {
    type: 'answer-correct',
    icon: '✅',
    nameJa: 'せいかいマスター',
    nameEn: 'Correct Answer Master',
    descriptionJa: 'もんだいをせいかいする',
    descriptionEn: 'Answer questions correctly',
    targetMin: 3,
    targetMax: 10,
    rewardMin: 10,
    rewardMax: 30,
  },
  {
    type: 'answer-questions',
    icon: '📝',
    nameJa: 'がんばりや',
    nameEn: 'Hard Worker',
    descriptionJa: 'もんだいにこたえる',
    descriptionEn: 'Answer any questions',
    targetMin: 5,
    targetMax: 15,
    rewardMin: 10,
    rewardMax: 25,
  },
  {
    type: 'perfect-score',
    icon: '🎯',
    nameJa: 'かんぺき！',
    nameEn: 'Perfect Score!',
    descriptionJa: '100てんをとる',
    descriptionEn: 'Get a perfect score (5/5)',
    targetMin: 1,
    targetMax: 2,
    rewardMin: 30,
    rewardMax: 50,
  },
  {
    type: 'try-topic',
    icon: '🌟',
    nameJa: 'たんけんか',
    nameEn: 'Explorer',
    descriptionJa: 'あたらしいエリアをためす',
    descriptionEn: 'Try a new topic/area',
    targetMin: 1,
    targetMax: 1,
    rewardMin: 20,
    rewardMax: 30,
  },
  {
    type: 'use-hints',
    icon: '💡',
    nameJa: 'ヒントつかい',
    nameEn: 'Smart Hint User',
    descriptionJa: 'ヒントをつかってこたえる',
    descriptionEn: 'Use hints to learn',
    targetMin: 2,
    targetMax: 5,
    rewardMin: 10,
    rewardMax: 20,
  },
  {
    type: 'streak-days',
    icon: '🔥',
    nameJa: 'れんぞくチャレンジ',
    nameEn: 'Streak Challenge',
    descriptionJa: 'れんぞくでべんきょうする',
    descriptionEn: 'Practice multiple days',
    targetMin: 2,
    targetMax: 3,
    rewardMin: 25,
    rewardMax: 50,
  },
];

export const generateDailyQuests = (): DailyQuest[] => {
  const today = new Date().toISOString().split('T')[0];
  const quests: DailyQuest[] = [];

  const shuffled = [...QUEST_POOL].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);

  selected.forEach((poolItem, index) => {
    const target = Math.floor(Math.random() * (poolItem.targetMax - poolItem.targetMin + 1)) + poolItem.targetMin;
    const reward = Math.floor(Math.random() * (poolItem.rewardMax - poolItem.rewardMin + 1)) + poolItem.rewardMin;

    quests.push({
      id: `quest-${today}-${index}`,
      type: poolItem.type,
      icon: poolItem.icon,
      nameJa: poolItem.nameJa,
      nameEn: poolItem.nameEn,
      descriptionJa: `${poolItem.descriptionJa} (${target}もん)`,
      descriptionEn: `${poolItem.descriptionEn} (${target})`,
      target,
      progress: 0,
      completed: false,
      reward,
      date: today,
    });
  });

  return quests;
};

export const getDailyQuests = (): DailyQuest[] => {
  const data = getGameData();
  const today = new Date().toISOString().split('T')[0];

  if (data.dailyQuests.length === 0 || data.dailyQuests[0]?.date !== today) {
    data.dailyQuests = generateDailyQuests();
    saveGameData(data);
  }

  return data.dailyQuests;
};

export const updateQuestProgress = (type: QuestType, amount: number = 1): DailyQuest[] => {
  const data = getGameData();
  const today = new Date().toISOString().split('T')[0];

  if (data.dailyQuests.length === 0 || data.dailyQuests[0]?.date !== today) {
    data.dailyQuests = generateDailyQuests();
  }

  let newCompletions = 0;

  data.dailyQuests = data.dailyQuests.map((quest) => {
    if (quest.type === type && !quest.completed && quest.date === today) {
      const newProgress = Math.min(quest.progress + amount, quest.target);
      const completed = newProgress >= quest.target;

      if (completed && !quest.completed) {
        newCompletions++;
        data.player.coins += quest.reward;
      }

      return {
        ...quest,
        progress: newProgress,
        completed,
      };
    }
    return quest;
  });

  saveGameData(data);

  if (newCompletions > 0) {
    window.dispatchEvent(new CustomEvent('coins-changed'));
    window.dispatchEvent(new CustomEvent('quest-completed'));
  }

  return data.dailyQuests;
};

export const resetDailyQuests = (): DailyQuest[] => {
  const data = getGameData();
  data.dailyQuests = generateDailyQuests();
  saveGameData(data);
  return data.dailyQuests;
};

export const areAllQuestsCompleted = (): boolean => {
  const quests = getDailyQuests();
  return quests.length > 0 && quests.every((q) => q.completed);
};

export const getCompletedQuestCount = (): number => {
  const quests = getDailyQuests();
  return quests.filter((q) => q.completed).length;
};

// ============================================
// ERROR PATTERN RECOGNITION SYSTEM
// ============================================

// Categorize error based on question type and answers
export const categorizeError = (
  topic: string,
  questionType: string,
  userAnswer: string,
  correctAnswer: string
): ErrorCategory => {
  const user = userAnswer.toString().trim();
  const correct = correctAnswer.toString().trim();
  const userNum = parseFloat(user);
  const correctNum = parseFloat(correct);

  // Check for operation confusion based on answer ratios
  if (!isNaN(userNum) && !isNaN(correctNum) && correctNum !== 0) {
    const ratio = userNum / correctNum;

    // If answer is exactly reciprocal, likely ×/÷ confusion
    if (Math.abs(ratio - 1 / correctNum * userNum) < 0.01 && Math.abs(userNum * correctNum - correctNum * correctNum) > 1) {
      return 'multiply-divide-confusion';
    }

    // If answer is off by a factor of 10, 100, etc. - decimal/place value error
    const logRatio = Math.abs(Math.log10(Math.abs(ratio)));
    if (logRatio >= 0.9 && logRatio <= 2.1 && Math.abs(Math.round(logRatio) - logRatio) < 0.1) {
      if (topic.includes('decimal')) return 'decimal-point-error';
      return 'place-value-error';
    }
  }

  // Topic-specific categorization
  if (topic.includes('ratio') || topic.includes('times')) {
    if (userAnswer.includes('+') || userAnswer.includes('-')) return 'wrong-operation';
    if (user.includes('/') && !correct.includes('/')) return 'multiply-divide-confusion';
  }

  if (topic.includes('decimal')) {
    if (user.split('.').length !== correct.split('.').length) return 'decimal-point-error';
  }

  if (topic.includes('unit') || topic.includes('area') || topic.includes('length')) {
    return 'unit-conversion-error';
  }

  if (topic.includes('formula') || topic.includes('area') || topic.includes('angle')) {
    return 'formula-misapplication';
  }

  if (topic.includes('calculation') || topic.includes('arithmetic')) {
    // Check if operation was wrong
    if ((userNum > correctNum * 2) || (userNum < correctNum / 2 && userNum !== 0)) {
      return 'wrong-operation';
    }
    return 'calculation-error';
  }

  return 'other';
};

// Record a mistake
export const recordMistake = (
  topic: string,
  questionType: string,
  userAnswer: string,
  correctAnswer: string
): void => {
  const data = getGameData();
  const errorCategory = categorizeError(topic, questionType, userAnswer, correctAnswer);

  // Add to mistakes log
  const mistake: MistakeEntry = {
    timestamp: Date.now(),
    topic,
    questionType,
    userAnswer,
    correctAnswer,
    errorCategory,
  };

  data.mistakes.push(mistake);

  // Keep only last 50 mistakes to prevent storage bloat
  if (data.mistakes.length > 50) {
    data.mistakes = data.mistakes.slice(-50);
  }

  // Update error patterns
  updateErrorPatterns(data, errorCategory, topic);

  // Generate learning insights
  generateLearningInsights(data);

  saveGameData(data);
};

// Update error patterns based on mistakes
const updateErrorPatterns = (data: GameData, category: ErrorCategory, topic: string): void => {
  const existingPattern = data.errorPatterns.find((p) => p.category === category);

  if (existingPattern) {
    existingPattern.count++;
    existingPattern.lastOccurred = Date.now();
    if (!existingPattern.topics.includes(topic)) {
      existingPattern.topics.push(topic);
    }
  } else {
    data.errorPatterns.push({
      category,
      count: 1,
      lastOccurred: Date.now(),
      topics: [topic],
    });
  }
};

// Generate learning insights based on patterns
const generateLearningInsights = (data: GameData): void => {
  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const recentMistakes = data.mistakes.filter((m) => m.timestamp > oneWeekAgo);

  // Check for recurring error patterns
  const recurringPatterns = data.errorPatterns.filter(
    (p) => p.count >= 3 && p.lastOccurred > oneWeekAgo
  );

  for (const pattern of recurringPatterns) {
    const existingInsight = data.learningInsights.find(
      (i) => i.category === pattern.category && !i.acknowledged && i.timestamp > oneWeekAgo
    );

    if (!existingInsight) {
      const insight = createInsightForPattern(pattern);
      if (insight) {
        data.learningInsights.push(insight);
      }
    }
  }

  // Check for improvements (pattern not seen recently)
  const improvedPatterns = data.errorPatterns.filter(
    (p) => p.count >= 3 && p.lastOccurred < oneWeekAgo && p.lastOccurred > oneWeekAgo * 2
  );

  for (const pattern of improvedPatterns) {
    const existingImprovement = data.learningInsights.find(
      (i) => i.type === 'improvement' && i.category === pattern.category
    );

    if (!existingImprovement) {
      data.learningInsights.push({
        id: `improvement-${pattern.category}-${now}`,
        type: 'improvement',
        category: pattern.category,
        messageJa: getImprovementMessageJa(pattern.category),
        messageEn: getImprovementMessageEn(pattern.category),
        recommendationJa: 'この調子でがんばりましょう！',
        recommendationEn: 'Keep up the great work!',
        timestamp: now,
        acknowledged: false,
      });
    }
  }

  // Keep only unacknowledged insights and last 20 acknowledged
  const unacknowledged = data.learningInsights.filter((i) => !i.acknowledged);
  const acknowledged = data.learningInsights
    .filter((i) => i.acknowledged)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 20);

  data.learningInsights = [...unacknowledged, ...acknowledged];
};

// Create insight for a detected pattern
const createInsightForPattern = (pattern: ErrorPattern): LearningInsight | null => {
  const now = Date.now();

  const messages: Record<ErrorCategory, { ja: string; en: string; practice: string }> = {
    'multiply-divide-confusion': {
      ja: '× と ÷ をよくまちがえているようです',
      en: 'You often mix up × and ÷ symbols',
      practice: 'multiplication-vs-division',
    },
    'add-subtract-confusion': {
      ja: '+ と - をよくまちがえているようです',
      en: 'You often mix up + and - symbols',
      practice: 'addition-vs-subtraction',
    },
    'decimal-point-error': {
      ja: '小数点の位置をよくまちがえています',
      en: 'You often make decimal point placement errors',
      practice: 'decimal-practice',
    },
    'place-value-error': {
      ja: '位取りに注意が必要です',
      en: 'Watch out for place value errors',
      practice: 'place-value',
    },
    'unit-conversion-error': {
      ja: '単位の換算をよくまちがえています',
      en: 'You often make unit conversion errors',
      practice: 'unit-conversion',
    },
    'formula-misapplication': {
      ja: '公式の使い方を確認しましょう',
      en: 'Review how to apply formulas correctly',
      practice: 'formula-practice',
    },
    'calculation-error': {
      ja: '計算ミスが多いようです。ゆっくり計算してみよう',
      en: 'You make frequent calculation errors. Try calculating slowly',
      practice: 'calculation-basics',
    },
    'wrong-operation': {
      ja: 'どの計算を使うか確認が必要です',
      en: 'You need to check which operation to use',
      practice: 'operation-selection',
    },
    'other': {
      ja: '特定のパターンが見つかりました',
      en: 'A specific pattern has been detected',
      practice: 'general-practice',
    },
  };

  const msg = messages[pattern.category];
  if (!msg) return null;

  return {
    id: `pattern-${pattern.category}-${now}`,
    type: 'pattern-detected',
    category: pattern.category,
    messageJa: msg.ja,
    messageEn: msg.en,
    recommendationJa: getRecommendationJa(pattern.category),
    recommendationEn: getRecommendationEn(pattern.category),
    suggestedPractice: msg.practice,
    timestamp: now,
    acknowledged: false,
  };
};

const getRecommendationJa = (category: ErrorCategory): string => {
  const recommendations: Record<ErrorCategory, string> = {
    'multiply-divide-confusion': '「かける」と「わる」の確認をしよう',
    'add-subtract-confusion': '「たす」と「ひく」の確認をしよう',
    'decimal-point-error': '小数点の位置を特に注意して計算しよう',
    'place-value-error': '位取りを意識して計算してみよう',
    'unit-conversion-error': '単位の換算表を見ながら練習しよう',
    'formula-misapplication': '公式の意味を理解しながら使おう',
    'calculation-error': '計算を確認する時間をとろう',
    'wrong-operation': '問題文をよく読んでから計算しよう',
    'other': 'もう一度基礎から復習しよう',
  };
  return recommendations[category];
};

const getRecommendationEn = (category: ErrorCategory): string => {
  const recommendations: Record<ErrorCategory, string> = {
    'multiply-divide-confusion': 'Practice distinguishing "multiply" from "divide"',
    'add-subtract-confusion': 'Practice distinguishing "add" from "subtract"',
    'decimal-point-error': 'Pay special attention to decimal placement',
    'place-value-error': 'Be conscious of place values when calculating',
    'unit-conversion-error': 'Practice with a unit conversion chart',
    'formula-misapplication': 'Understand the meaning behind formulas',
    'calculation-error': 'Take time to verify your calculations',
    'wrong-operation': 'Read the problem carefully before calculating',
    'other': 'Review the basics again',
  };
  return recommendations[category];
};

const getImprovementMessageJa = (category: ErrorCategory): string => {
  const messages: Record<ErrorCategory, string> = {
    'multiply-divide-confusion': '× と ÷ の間違いが減りました！',
    'add-subtract-confusion': '+ と - の間違いが減りました！',
    'decimal-point-error': '小数点のミスが減りました！',
    'place-value-error': '位取りが上手くなりました！',
    'unit-conversion-error': '単位換算が上手くなりました！',
    'formula-misapplication': '公式の使い方が上手くなりました！',
    'calculation-error': '計算ミスが減りました！',
    'wrong-operation': '計算の選び方が上手くなりました！',
    'other': '上達しています！',
  };
  return messages[category];
};

const getImprovementMessageEn = (category: ErrorCategory): string => {
  const messages: Record<ErrorCategory, string> = {
    'multiply-divide-confusion': 'Your × and ÷ confusion is improving!',
    'add-subtract-confusion': 'Your + and - confusion is improving!',
    'decimal-point-error': 'Your decimal point errors are decreasing!',
    'place-value-error': 'Your place value skills are improving!',
    'unit-conversion-error': 'Your unit conversions are getting better!',
    'formula-misapplication': 'You are applying formulas better!',
    'calculation-error': 'Your calculation errors are decreasing!',
    'wrong-operation': 'You are choosing operations better!',
    'other': 'You are improving!',
  };
  return messages[category];
};

// Get active learning insights
export const getLearningInsights = (): LearningInsight[] => {
  const data = getGameData();
  return data.learningInsights.filter((i) => !i.acknowledged);
};

// Acknowledge an insight
export const acknowledgeInsight = (insightId: string): void => {
  const data = getGameData();
  const insight = data.learningInsights.find((i) => i.id === insightId);
  if (insight) {
    insight.acknowledged = true;
    saveGameData(data);
  }
};

// Get error patterns summary
export const getErrorPatternsSummary = (): {
  totalMistakes: number;
  patterns: ErrorPattern[];
  topWeakness: ErrorCategory | null;
} => {
  const data = getGameData();
  const sortedPatterns = [...data.errorPatterns].sort((a, b) => b.count - a.count);

  return {
    totalMistakes: data.mistakes.length,
    patterns: sortedPatterns,
    topWeakness: sortedPatterns.length > 0 && sortedPatterns[0].count >= 3
      ? sortedPatterns[0].category
      : null,
  };
};

// Get topic-specific accuracy trend
export const getTopicAccuracyTrend = (topic: string): { improving: boolean; accuracy: number } => {
  const data = getGameData();
  const topicMistakes = data.mistakes.filter((m) => m.topic === topic);

  if (topicMistakes.length < 3) {
    return { improving: false, accuracy: 100 };
  }

  // Compare recent vs older mistakes
  const midpoint = topicMistakes.length / 2;
  const recent = topicMistakes.slice(-Math.floor(midpoint));
  const older = topicMistakes.slice(0, Math.ceil(midpoint));

  const recentErrors = recent.length;
  const olderErrors = older.length;

  return {
    improving: recentErrors < olderErrors,
    accuracy: Math.max(0, 100 - (recentErrors * 20)),
  };
};

// ============================================
// STORY MODE FUNCTIONS
// ============================================

// Get or generate daily episode
export const getDailyEpisode = (): DailyEpisode => {
  const data = getGameData();
  const today = new Date().toISOString().split('T')[0];

  // Check if we have an episode for today
  if (data.currentDailyEpisode?.date === today) {
    return data.currentDailyEpisode;
  }

  // Generate new episode for today
  const newEpisode = generateDailyEpisode();
  data.currentDailyEpisode = newEpisode;
  saveGameData(data);

  return newEpisode;
};

// Complete a chapter
export const completeChapter = (
  chapterId: string,
  stars: number,
  earnedCoins: number
): void => {
  const data = getGameData();

  // Mark chapter as completed
  if (!data.storyProgress.completedChapters.includes(chapterId)) {
    data.storyProgress.completedChapters.push(chapterId);
  }

  // Update stars (keep the best score)
  const currentStars = data.storyProgress.chapterStars[chapterId] || 0;
  if (stars > currentStars) {
    data.storyProgress.chapterStars[chapterId] = stars;
  }

  // Add story coins
  data.storyProgress.totalStoryCoins += earnedCoins;

  // Update current chapter to next available
  const availableChapters = require('./storyMode').getAvailableChapters(data.storyProgress.completedChapters);
  if (availableChapters.length > 0) {
    data.storyProgress.currentChapterId = availableChapters[0];
  } else {
    data.storyProgress.currentChapterId = null; // All chapters completed
  }

  // Also add to regular coins
  data.player.coins += earnedCoins;

  saveGameData(data);
  window.dispatchEvent(new CustomEvent('coins-changed'));
};

// Complete a side quest
export const completeSideQuest = (sideQuestId: string, rewardCoins: number): void => {
  const data = getGameData();

  if (!data.storyProgress.sideQuestsCompleted.includes(sideQuestId)) {
    data.storyProgress.sideQuestsCompleted.push(sideQuestId);
    data.storyProgress.totalStoryCoins += rewardCoins;
    data.player.coins += rewardCoins;
    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));
  }
};

// Complete daily episode
export const completeDailyEpisode = (episodeId: string, rewardCoins: number): void => {
  const data = getGameData();

  if (!data.storyProgress.dailyEpisodesCompleted.includes(episodeId)) {
    data.storyProgress.dailyEpisodesCompleted.push(episodeId);
    data.storyProgress.totalStoryCoins += rewardCoins;
    data.player.coins += rewardCoins;

    // Mark episode as completed
    if (data.currentDailyEpisode?.id === episodeId) {
      data.currentDailyEpisode.completed = true;
    }

    saveGameData(data);
    window.dispatchEvent(new CustomEvent('coins-changed'));
  }
};

// Set current chapter
export const setCurrentChapter = (chapterId: string): void => {
  const data = getGameData();
  data.storyProgress.currentChapterId = chapterId;
  saveGameData(data);
};

// Get story progress summary
export const getStoryProgressSummary = () => {
  const data = getGameData();
  const { storyProgress } = data;

  const totalStars = Object.values(storyProgress.chapterStars).reduce(
    (sum, stars) => sum + stars,
    0
  );

  return {
    completedChapters: storyProgress.completedChapters.length,
    totalChapters: 7, // Total chapters in story
    totalStars,
    maxStars: 21, // 7 chapters * 3 stars
    totalStoryCoins: storyProgress.totalStoryCoins,
    currentChapterId: storyProgress.currentChapterId,
  };
};
