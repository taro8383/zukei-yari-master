// Story Mode (Math Adventure) System
// Narrative wrapper for the adventure map

export interface StoryChapter {
  id: string;
  regionId: string;
  chapterNumber: number;
  titleJa: string;
  titleEn: string;
  emoji: string;
  intro: {
    narrationJa: string[];
    narrationEn: string[];
    objectiveJa: string;
    objectiveEn: string;
    questionCount: number;
  };
  completion: {
    narrationJa: string[];
    narrationEn: string[];
    rewardCoins: number;
    unlocksNext: string[]; // Chapter IDs unlocked after completion
  };
  sideQuests?: SideQuest[];
}

export interface SideQuest {
  id: string;
  titleJa: string;
  titleEn: string;
  descriptionJa: string;
  descriptionEn: string;
  topicId: string;
  questionCount: number;
  rewardCoins: number;
  icon: string;
}

export interface DailyEpisode {
  id: string;
  date: string;
  titleJa: string;
  titleEn: string;
  emoji: string;
  narrationJa: string;
  narrationEn: string;
  topicIds: string[];
  questionCount: number;
  rewardCoins: number;
  completed: boolean;
}

export interface StoryProgress {
  currentChapterId: string | null;
  completedChapters: string[];
  chapterStars: { [chapterId: string]: number }; // 0-3 stars per chapter
  sideQuestsCompleted: string[];
  dailyEpisodesCompleted: string[];
  totalStoryCoins: number;
}

// Main story chapters
export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapter-1',
    regionId: 'number-castle',
    chapterNumber: 1,
    titleJa: 'かずのお城への招待',
    titleEn: 'Invitation to Number Castle',
    emoji: '🏰',
    intro: {
      narrationJa: [
        'ケイくんは不思議な世界に迷い込みました。',
        '目の前には、数字が輝くお城がそびえ立っています。',
        '「大きな数を読める者だけが、お城に入ることができる」',
        '門番の声が響きます。',
      ],
      narrationEn: [
        'Kei-kun wandered into a mysterious world.',
        'Before him stood a castle shining with numbers.',
        '"Only those who can read large numbers may enter the castle,"',
        'the gatekeeper\'s voice echoed.',
      ],
      objectiveJa: 'お城の入り口をくぐるため、大きな数の問題に挑戦しよう！',
      objectiveEn: 'Challenge the large number problems to enter the castle!',
      questionCount: 5,
    },
    completion: {
      narrationJa: [
        '「すごい！大きな数も読めるんだね！」',
        '門番がにっこり笑って門を開きました。',
        'お城の中には、もっとたくさんの数学の秘密が！',
      ],
      narrationEn: [
        '"Amazing! You can read large numbers too!"',
        'The gatekeeper smiled and opened the gates.',
        'Inside the castle, even more mathematical secrets await!',
      ],
      rewardCoins: 25,
      unlocksNext: ['chapter-2', 'chapter-4'],
    },
    sideQuests: [
      {
        id: 'sq-castle-1',
        titleJa: '計算のコツ',
        titleEn: 'Calculation Secrets',
        descriptionJa: '賢く計算する方法を学ぼう',
        descriptionEn: 'Learn smart calculation methods',
        topicId: 'calculation-rules',
        questionCount: 3,
        rewardCoins: 15,
        icon: '🧮',
      },
    ],
  },
  {
    id: 'chapter-2',
    regionId: 'geometry-mountains',
    chapterNumber: 2,
    titleJa: 'ずけい山脈の頂上へ',
    titleEn: 'To the Summit of Geometry Mountains',
    emoji: '🏔️',
    intro: {
      narrationJa: [
        'お城の窓から見えるずけい山脈。',
        '山頂には「形の賢者」が住んでいると言われています。',
        '「角度と形を理解する者だけが頂上に立てる」',
        '風がささやきます。',
      ],
      narrationEn: [
        'The Geometry Mountains were visible from the castle window.',
        '"The Sage of Shapes" is said to live at the summit.',
        '"Only those who understand angles and shapes can reach the top,"',
        'the wind whispered.',
      ],
      objectiveJa: '山を登り、ずけいの問題をクリアしよう！',
      objectiveEn: 'Climb the mountain and solve the geometry problems!',
      questionCount: 5,
    },
    completion: {
      narrationJa: [
        '「よくぞ登りきった！」',
        '形の賢者がケイくんを称えます。',
        '「さらなる冒険は海の向こうにあるぞ」',
      ],
      narrationEn: [
        '"Well done reaching the summit!"',
        'The Sage of Shapes praised Kei-kun.',
        '"Further adventures await across the ocean!"',
      ],
      rewardCoins: 30,
      unlocksNext: ['chapter-3'],
    },
  },
  {
    id: 'chapter-3',
    regionId: 'ratio-ocean',
    chapterNumber: 3,
    titleJa: 'わり算の海を渡れ',
    titleEn: 'Cross the Division Ocean',
    emoji: '🌊',
    intro: {
      narrationJa: [
        '山を降りると、広大な海が広がっています。',
        '船頭が言います。「わり算ができる者だけが渡れる」',
        '波が大きく揺れています。勇気を出して乗船しよう！',
      ],
      narrationEn: [
        'Descending the mountain, a vast ocean spread out.',
        '"Only those who can divide may cross," said the boatman.',
        'The waves rocked violently. Time to board with courage!',
      ],
      objectiveJa: 'わり算で答えを出し、無事に海を渡ろう！',
      objectiveEn: 'Use division to find answers and safely cross the ocean!',
      questionCount: 5,
    },
    completion: {
      narrationJa: [
        '「見事だ！わり算の達人だね！」',
        '船着き場でみんながケイくんを迎えます。',
        '次は、そびえ立つ火山が見えてきました...',
      ],
      narrationEn: [
        '"Excellent! You are a division master!"',
        'Everyone welcomed Kei-kun at the dock.',
        'Next, a towering volcano came into view...',
      ],
      rewardCoins: 30,
      unlocksNext: ['chapter-5'],
    },
  },
  {
    id: 'chapter-4',
    regionId: 'decimal-forest',
    chapterNumber: 4,
    titleJa: 'しょうすうの森を抜けて',
    titleEn: 'Through the Decimal Forest',
    emoji: '🌲',
    intro: {
      narrationJa: [
        'ケイくんはお城から別の道へ進みました。',
        'しょうすうの木々が並ぶ不思議な森に入ります。',
        '「小数点の位置を見失うと迷子になってしまうぞ」',
        '森の妖精が警告します。',
      ],
      narrationEn: [
        'Kei-kun took a different path from the castle.',
        'He entered a mysterious forest of decimal trees.',
        '"Lose track of the decimal point and you\'ll be lost!"',
        'a forest fairy warned.',
      ],
      objectiveJa: 'しょうすうの問題を解いて、森の出口を見つけよう！',
      objectiveEn: 'Solve decimal problems to find the forest exit!',
      questionCount: 5,
    },
    completion: {
      narrationJa: [
        '「小数点もバッチリだね！」',
        '妖精が道を照らしてくれました。',
        '森を抜けると、美しいグラフ島が見えます。',
      ],
      narrationEn: [
        '"Perfect with decimal points!"',
        'The fairy lit up the path.',
        'Beyond the forest, beautiful Graph Island was visible.',
      ],
      rewardCoins: 35,
      unlocksNext: ['chapter-6'],
    },
    sideQuests: [
      {
        id: 'sq-forest-1',
        titleJa: '小数の達人',
        titleEn: 'Decimal Master',
        descriptionJa: '小数の計算を極めよう',
        descriptionEn: 'Master decimal calculations',
        topicId: 'decimals',
        questionCount: 5,
        rewardCoins: 20,
        icon: '🔵',
      },
    ],
  },
  {
    id: 'chapter-5',
    regionId: 'fraction-volcano',
    chapterNumber: 5,
    titleJa: 'ぶんすう火山の試練',
    titleEn: 'Trial of Fraction Volcano',
    emoji: '🌋',
    intro: {
      narrationJa: [
        '海を渡ると、そびえ立つ火山が目の前に！',
        '火山の神様が試練を出します。',
        '「分数を理解する者だけが、頂上に立てる」',
        'マグマが激しく噴き出しています！',
      ],
      narrationEn: [
        'Across the ocean, a towering volcano loomed!',
        'The Volcano God issued a challenge.',
        '"Only those who understand fractions may stand at the summit,"',
        'Magma erupted violently!',
      ],
      objectiveJa: 'ぶんすうの問題を解いて、火山の頂上を目指そう！',
      objectiveEn: 'Solve fraction problems to reach the volcano summit!',
      questionCount: 5,
    },
    completion: {
      narrationJa: [
        '「素晴らしい！分数の勇者だ！」',
        '火山の神様がケイくんに力を分け与えます。',
        '「グラフ島で待っている者がいるぞ」',
      ],
      narrationEn: [
        '"Wonderful! You are a Fraction Hero!"',
        'The Volcano God shared power with Kei-kun.',
        '"Someone awaits you on Graph Island!"',
      ],
      rewardCoins: 35,
      unlocksNext: ['chapter-6'],
    },
    sideQuests: [
      {
        id: 'sq-volcano-1',
        titleJa: '分数マスター',
        titleEn: 'Fraction Master',
        descriptionJa: '分数の計算に挑戦',
        descriptionEn: 'Challenge fraction calculations',
        topicId: 'fractions',
        questionCount: 5,
        rewardCoins: 20,
        icon: '🍕',
      },
    ],
  },
  {
    id: 'chapter-6',
    regionId: 'graph-island',
    chapterNumber: 6,
    titleJa: 'グラフ島の秘密',
    titleEn: 'Secret of Graph Island',
    emoji: '🏝️',
    intro: {
      narrationJa: [
        '森を抜け、火山を越えて、ついにグラフ島に到着！',
        '島には変化を予言する賢者が住んでいます。',
        '「グラフを読める者だけが、未来を知ることができる」',
      ],
      narrationEn: [
        'Through the forest, past the volcano, finally reaching Graph Island!',
        'A sage who predicts changes lives on the island.',
        '"Only those who can read graphs can know the future,"',
      ],
      objectiveJa: 'グラフを読んで、変化の法則を見つけ出そう！',
      objectiveEn: 'Read the graphs and discover the patterns of change!',
      questionCount: 5,
    },
    completion: {
      narrationJa: [
        '「グラフの読み方をマスターしたね！」',
        '賢者がケイくんの未来を占います。',
        '「最後の試練は、せいかく度の峰にある」',
      ],
      narrationEn: [
        '"You\'ve mastered reading graphs!"',
        'The sage read Kei-kun\'s future.',
        '"The final trial awaits at Accuracy Peaks!"',
      ],
      rewardCoins: 40,
      unlocksNext: ['chapter-7'],
    },
    sideQuests: [
      {
        id: 'sq-island-1',
        titleJa: '変化を追え',
        titleEn: 'Track the Changes',
        descriptionJa: '変化を調べる問題に挑戦',
        descriptionEn: 'Challenge investigating changes',
        topicId: 'investigating-changes',
        questionCount: 4,
        rewardCoins: 20,
        icon: '📈',
      },
    ],
  },
  {
    id: 'chapter-7',
    regionId: 'accuracy-peaks',
    chapterNumber: 7,
    titleJa: 'せいかく度の峰の頂上へ',
    titleEn: 'To the Summit of Accuracy Peaks',
    emoji: '⛰️',
    intro: {
      narrationJa: [
        'すべての冒険を経て、最後の山がそびえ立ちます。',
        'せいかく度の峰 - 数学の精髄がここにあります。',
        '「正確さを極めた者だけが、頂上に立てる」',
        '最後の挑戦が始まります！',
      ],
      narrationEn: [
        'After all adventures, the final mountain looms.',
        'Accuracy Peaks - where the essence of math resides.',
        '"Only those who master accuracy can reach the summit,"',
        'The final challenge begins!',
      ],
      objectiveJa: '最後の試練に挑んで、数学マスターの称号を得よう！',
      objectiveEn: 'Challenge the final trial and earn the title of Math Master!',
      questionCount: 5,
    },
    completion: {
      narrationJa: [
        '「おめでとう！数学マスターだ！」',
        'ケイくんは頂上で輝くトロフィーを手に入れました。',
        'すべての冒険が、ここに完結します。',
        '新しい冒険が待っているかもしれません...',
      ],
      narrationEn: [
        '"Congratulations! You are a Math Master!"',
        'Kei-kun received a shining trophy at the summit.',
        'All adventures conclude here.',
        'But new adventures may await...',
      ],
      rewardCoins: 100,
      unlocksNext: [],
    },
  },
];

// Generate daily episode based on date
export const generateDailyEpisode = (date?: Date): DailyEpisode => {
  const targetDate = date || new Date();
  const dateStr = targetDate.toISOString().split('T')[0];

  // Use date to deterministically generate episode
  const dayOfYear = Math.floor((targetDate.getTime() - new Date(targetDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const episodeTypes = [
    {
      titleJa: '復習の一日',
      titleEn: 'Review Day',
      emoji: '📚',
      narrationJa: '今日は今まで学んだことを復習しよう！',
      narrationEn: 'Today, let\'s review what we\'ve learned so far!',
      topicPools: ['large-numbers', 'calculation-rules', 'geometry'],
    },
    {
      titleJa: '挑戦の一日',
      titleEn: 'Challenge Day',
      emoji: '⚔️',
      narrationJa: '新しい難問に挑戦する日だ！',
      narrationEn: 'A day to challenge new difficult problems!',
      topicPools: ['division', 'ratios', 'fractions'],
    },
    {
      titleJa: '発見の一日',
      titleEn: 'Discovery Day',
      emoji: '🔍',
      narrationJa: '新しい数学の発見をしよう！',
      narrationEn: 'Let\'s discover new mathematical concepts!',
      topicPools: ['decimals', 'line-graphs', 'investigating-changes'],
    },
    {
      titleJa: 'マスターの一日',
      titleEn: 'Master Day',
      emoji: '👑',
      narrationJa: 'マスターの腕前を見せよう！',
      narrationEn: 'Show your master skills!',
      topicPools: ['accuracy-rate', 'geometry', 'fractions'],
    },
  ];

  const episodeType = episodeTypes[dayOfYear % episodeTypes.length];
  const selectedTopics = episodeType.topicPools.slice(0, 2);

  return {
    id: `episode-${dateStr}`,
    date: dateStr,
    titleJa: episodeType.titleJa,
    titleEn: episodeType.titleEn,
    emoji: episodeType.emoji,
    narrationJa: episodeType.narrationJa,
    narrationEn: episodeType.narrationEn,
    topicIds: selectedTopics,
    questionCount: 3,
    rewardCoins: 20,
    completed: false,
  };
};

// Get default story progress
export const getDefaultStoryProgress = (): StoryProgress => ({
  currentChapterId: 'chapter-1',
  completedChapters: [],
  chapterStars: {},
  sideQuestsCompleted: [],
  dailyEpisodesCompleted: [],
  totalStoryCoins: 0,
});

// Get next available chapters based on completed chapters
export const getAvailableChapters = (completedChapters: string[]): string[] => {
  const available: string[] = [];

  STORY_CHAPTERS.forEach((chapter) => {
    if (completedChapters.includes(chapter.id)) {
      return; // Already completed
    }

    // Check if prerequisites are met (all chapters that unlock this one are completed)
    const unlockers = STORY_CHAPTERS.filter((c) =>
      c.completion.unlocksNext.includes(chapter.id)
    );

    if (unlockers.length === 0) {
      // First chapter or no prerequisites
      available.push(chapter.id);
    } else {
      // Check if any unlocking chapter is completed
      const hasCompletedUnlocker = unlockers.some((u) =>
        completedChapters.includes(u.id)
      );
      if (hasCompletedUnlocker) {
        available.push(chapter.id);
      }
    }
  });

  return available;
};

// Calculate stars based on accuracy
export const calculateChapterStars = (correct: number, total: number): number => {
  if (total === 0) return 0;
  const accuracy = (correct / total) * 100;
  if (accuracy >= 100) return 3;
  if (accuracy >= 80) return 2;
  if (accuracy >= 60) return 1;
  return 0;
};

// Get chapter by ID
export const getChapterById = (chapterId: string): StoryChapter | undefined => {
  return STORY_CHAPTERS.find((c) => c.id === chapterId);
};

// Get chapter by region ID
export const getChapterByRegionId = (regionId: string): StoryChapter | undefined => {
  return STORY_CHAPTERS.find((c) => c.regionId === regionId);
};

// Get side quest by ID
export const getSideQuestById = (sideQuestId: string): SideQuest | undefined => {
  for (const chapter of STORY_CHAPTERS) {
    const quest = chapter.sideQuests?.find((sq) => sq.id === sideQuestId);
    if (quest) return quest;
  }
  return undefined;
};
