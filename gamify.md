# 🎮 Gamification & UX Improvement Plan

## Overview

This document outlines gamification and user experience improvements for "けいくんの算数アプリ" (Kei-kun's Math App) to increase engagement, motivation, and learning outcomes for children.

---

## ✅ Implementation Status

**Last Updated**: 2026-03-13

### Phase 1: Foundation ✅ COMPLETED
- [x] Set up localStorage persistence (`src/lib/gameState.ts`)
- [x] Create coin system (+5 per correct, +25 perfect, bonuses)
- [x] Build basic avatar component (HeaderBar with name/color/level)
- [x] Implement streak counter (daily tracking with flame UI)
- [x] Add confetti animation on perfect score (fixed z-index)

### Phase 2: Core Features ✅ COMPLETED
- [x] Achievement system (8 achievements implemented)
- [x] Challenge mode toggles (Speed Mode + No Hints)
- [x] XP and leveling per topic (+10 XP per correct answer)
- [x] Enhanced feedback screens (coins breakdown + achievements)
- [x] Basic stats tracking (total questions, accuracy, streak)

### Phase 3: Polish ✅ COMPLETE
- [x] Shop system (spend coins on themes/items)
- [x] Theme unlocks (dark mode, pastel, neon)
- [x] Avatar color unlocks
- [x] Power-ups (extra hints, double coins, streak freeze)
- [x] Smart hints with costs (progressive hint system)
- [x] Adventure map UI (7 regions with stars, locks, paths)
- [x] Particle effects (confetti, coins, stars, fireworks)
- [x] Daily quests (3 daily missions with rewards)
- [x] Error Pattern Recognition (learning insights, mistake tracking)
- [x] End-of-Session Summary (celebration screen with stats)
- [x] Teach Me Mode (micro-lessons for wrong answers)
- [ ] Sound effects

### Phase 4: Advanced 🚧 NOT STARTED
- [ ] Parent dashboard
- [ ] Social features
- [ ] Weekly leaderboards
- [ ] Share functionality
- [ ] Advanced analytics

---

---

## Current State Analysis

### Existing Features
- 8 math topics with sub-topics
- 5-question exercise batches
- Basic scoring (percentage-based)
- Visual feedback (〇/× with colors)
- Hint system
- Bilingual support (Japanese/English)
- Interactive SVG diagrams

### Implemented Gamification ✅
- ✅ Progress persistence (localStorage)
- ✅ Streaks & achievements (8 achievements)
- ✅ Challenge modes (Speed + No Hints)
- ✅ Virtual currency (Math Coins)
- ✅ Basic avatar (name, color, level in header)
- ✅ Stats tracking (questions, accuracy, time)
- ✅ XP/Level progression system
- ✅ Shop system (themes, colors, power-ups)
- ✅ Smart hints with costs (progressive hint system)
- ✅ Adventure map UI (7 regions with stars, locks, paths)
- ✅ Particle effects (confetti, coins, stars)
- ✅ Daily quests (3 daily missions)
- ✅ Error Pattern Recognition (learning insights, mistake tracking)
- ✅ End-of-Session Summary (celebration screen with stats)
- ✅ Teach Me Mode (micro-lessons for wrong answers)

### Still Missing (Future Phases)
- 🚧 Sound effects
- 🚧 Parent dashboard
- 🚧 Social features/leaderboards

---

## 🗺️ 1. Progression System: "Math Adventure Map" ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/components/AdventureMap.tsx`

Replaced the tab grid with a visual learning island where each topic is a region.

### Visual Concept ✅
```
┌─────────────────────────────────────┐
│  🏔️ Geometry Mountains              │
│     ⭐⭐⭐ (Mastered)               │
│                                     │
│  🌊 Division Ocean ───→ 🏝️ Accuracy│
│     ⭐⭐☆ (Progress)    Peaks       │
│                                     │
│  🔢 Number Castle                   │
│     🔒 (Unlock at 60% on previous)  │
└─────────────────────────────────────┘
```

### Features ✅
- **Visual map with 7 regions**: Number Castle, Geometry Mountains, Division Ocean, Decimal Forest, Fraction Volcano, Graph Island, Accuracy Peaks
- **Stars per region** (0-3 based on average score):
  - ⭐ 60-79%: Bronze
  - ⭐⭐ 80-94%: Silver
  - ⭐⭐⭐ 95%+: Gold / Mastered
- **Locked/unlocked regions**: Prerequisites require 60% accuracy on previous areas
- **Animated paths**: SVG paths connect related topics
- **Player avatar**: Shows current position on map
- **Hover tooltips**: Show accuracy % and question count
- **Bilingual labels**: Japanese primary, English secondary
- **Back to Map button**: Easy navigation from any tab

### Map Regions
| Region | Icon | Topics | Prerequisites |
|--------|------|--------|---------------|
| 🔢 Number Castle | 🏰 | Large Numbers, Calculation Rules | None |
| 📐 Geometry Mountains | 🏔️ | Geometry | None |
| ➗ Division Ocean | 🌊 | Division, Ratios | None |
| 🔵 Decimal Forest | 🌲 | Decimals | Number Castle |
| 🍕 Fraction Volcano | 🌋 | Fractions | Division Ocean |
| 📊 Graph Island | 🏝️ | Line Graphs, Investigating Changes | Decimal Forest + Fraction Volcano |
| 🎯 Accuracy Peaks | ⛰️ | Accuracy Rate | Graph Island |

---

## 🔥 2. Daily Streaks & Rewards ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/lib/gameState.ts`, `src/components/HeaderBar.tsx`

### Data Structure
```typescript
interface StreakSystem {
  currentStreak: number;      // Consecutive days
  longestStreak: number;
  dailyGoal: number;          // e.g., 3 exercises
  dailyProgress: number;
  lastActiveDate: string;     // ISO date
  rewards: {
    3: 'bronze_badge',
    7: 'silver_badge',
    14: 'gold_badge',
    30: 'math_wizard_title',
    100: 'legendary_master'
  };
}
```

### UI Elements
- 🔥 Flame counter with streak number in header
- Daily login bonus popup (coin rewards)
- "Come back tomorrow!" reminder when daily goal met
- Streak freeze power-up (save streak if miss a day)

### Reward Milestones
| Days | Reward | Effect |
|------|--------|--------|
| 3 | Bronze Badge | +50 coins |
| 7 | Silver Badge | 2× coin multiplier for 24h |
| 14 | Gold Badge | Unlock exclusive avatar item |
| 30 | Math Wizard Title | Special profile border |
| 100 | Legendary Master | Ultimate achievement badge |

---

## 🎯 2b. Daily Quests ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/lib/gameState.ts`, `src/components/DailyQuests.tsx`

3 fresh missions every day with coin rewards!

### Quest Types
| Icon | Type | Description | Reward |
|------|------|-------------|--------|
| ✅ | Answer Correct | Answer X questions correctly | 10-30¢ |
| 📝 | Hard Worker | Answer X questions (any) | 10-25¢ |
| 🎯 | Perfect Score | Get 100% on an exercise | 30-50¢ |
| 🌟 | Explorer | Try a new topic/area | 20-30¢ |
| 💡 | Smart Hint User | Use hints to learn | 10-20¢ |
| 🔥 | Streak Challenge | Practice multiple days | 25-50¢ |

### UI Features
- **Quest Progress Bar**: Shows 0/3, 1/3, 2/3, 3/3 completion
- **Individual Progress Bars**: Each quest shows progress toward target
- **Countdown Timer**: Shows time until daily reset
- **Reward Preview**: Each quest shows coin reward
- **Bilingual**: Japanese primary, English secondary

### Automatic Tracking
Quests update automatically:
- Correct answers tracked during exercise grading
- New topics tracked when selected
- Hints tracked when used
- Perfect scores detected at end of exercise

### Reset
- Quests reset at midnight (00:00) local time
- New 3 quests randomly selected from quest pool
- Previous day's progress not carried over

---

## 🧠 2c. Error Pattern Recognition ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/lib/gameState.ts`, `src/components/LearningInsights.tsx`

AI-powered mistake analysis that detects patterns in errors and provides personalized recommendations!

### How It Works
1. **Automatic Tracking**: Every incorrect answer is recorded with context
2. **Pattern Detection**: After 3 similar errors, a pattern is identified
3. **Smart Categorization**: Errors are classified into 9 categories
4. **Personalized Insights**: Recommendations based on detected patterns
5. **Progress Tracking**: Shows improvement when patterns decrease

### Error Categories
| Category | Description | Example |
|----------|-------------|---------|
| ×÷ Confusion | Mixing multiply/divide | 6×2=3 instead of 12 |
| +- Confusion | Mixing add/subtract | 5+3=2 instead of 8 |
| Decimal Error | Wrong decimal placement | 0.5+0.5=0.10 |
| Place Value | Position errors | 23+45=685 |
| Unit Conversion | Wrong unit math | 1m=100cm → answer 10cm |
| Formula Misuse | Wrong formula | Using perimeter for area |
| Calculation | Arithmetic errors | 8+5=12 |
| Wrong Operation | Choosing wrong operation | Adding instead of multiplying |

### UI Features
```
┌───────────────────────────────────┐
│  🧠 がくしゅうインサイト             │
│     Learning Insights             │
├───────────────────────────────────┤
│  💡 Pattern Detected:              │
│  You often mix up × and ÷ symbols  │
│                                   │
│  💪 Recommended Practice:          │
│  Try "Multiplication vs Division"  │
│  mini-game (5 questions)           │
│                                   │
│  🎯 Focus Area: Place Value        │
│  Your last 3 attempts show         │
│  this is improving! Keep going!    │
│                                   │
│  [✓ Acknowledge] [Dismiss All]     │
└───────────────────────────────────┘
```

### Insights Tab
- Shows detected patterns with specific recommendations
- Topic-specific progress indicators (improving/steady)
- Suggested practice areas
- Dismissible with "Got it" button

### Patterns Tab
- Total mistakes tracked counter
- Top weakness identification
- Most frequent error categories
- Learning tips and encouragement

### Automatic Features
- **Detection Threshold**: 3 similar errors trigger insight
- **Improvement Detection**: Shows when patterns decrease
- **Persistence**: All data stored in localStorage
- **Real-time Updates**: Insights refresh when modal opens

### Header Integration
- Brain icon (🧠) in header bar next to quests
- Notification badge shows unacknowledged insights count
- Opens modal with all learning data

---

## 🎉 2d. End-of-Session Summary ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/components/EndOfSessionSummary.tsx`

Celebration screen shown after completing an exercise set (5 questions) with comprehensive stats and encouragement!

### Features

**Performance Message**
- Perfect (100%): "かんぺき！/ Perfect!" 🌟
- Great (80%+): "すばらしい！/ Great work!" 🎉
- Good (60%+): "がんばったね！/ Good job!" 👍
- Keep Trying (<60%): "つぎはもっとがんばろう！/ Keep practicing!" 💪

**Today's Stats Grid**
| Stat | Icon | Description |
|------|------|-------------|
| Accuracy | 🎯 | Score (e.g., 4/5 = 80%) |
| Time | ⏱️ | Session duration in minutes |
| Coins | 💰 | Total coins earned this session |
| Streak | 🔥 | Current daily streak count |

**Coin Calculation**
```
Base: +5 coins per correct answer
Perfect Bonus: +25 coins (if 5/5)
No-Hint Bonus: +10 coins (if no hints used)
Speed Bonus: +10 coins (if under 2 minutes)
```

**Comparison to Last Time**
- Shows accuracy improvement/decrease from previous attempt
- Visual progress bar
- Encouraging message when improving
- "First time!" message for new topics

**Tomorrow's Challenge**
- Suggests a different topic to try next
- Encourages getting a perfect score
- Randomly selected from other available topics

### UI Layout
```
┌───────────────────────────────────┐
│  🎉 すばらしい！/ Great work!     │
├───────────────────────────────────┤
│  📊 Today's Stats                 │
│  ┌─────────┬─────────┐           │
│  │ 4/5     │ 8m      │           │
│  │ (80%)   │ Time    │           │
│  ├─────────┼─────────┤           │
│  │ +20¢    │ 🔥 3    │           │
│  │ Coins   │ Streak  │           │
│  └─────────┴─────────┘           │
│                                   │
│  📈 Compared to Last Time         │
│  Accuracy: 65% → 80%  [+15%] ✅  │
│  [████████████░░░░░░░░]           │
│  上達しています！/ Improving!      │
│                                   │
│  🎯 Tomorrow's Challenge          │
│  Can you get 5/5 on Decimals?     │
│                                   │
│  [Map] [Practice More]            │
└───────────────────────────────────┘
```

### Action Buttons
- **マップへ / Map**: Returns to Adventure Map
- **もっと練習 / Practice More**: Generates new questions for same topic

### Automatic Features
- Appears immediately after clicking "Check Answers"
- Calculates and awards coins automatically
- Updates game data and triggers coin animation
- Saves session data for future comparisons
- Tracks daily progress

---

## 📚 2e. "Teach Me" Mode ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/components/TeachMeModal.tsx`, `src/components/QuestionItem.tsx`

When a student gets a problem wrong, offer a micro-lesson that turns mistakes into learning opportunities!

### How It Works
1. **Automatic Detection**: After grading, incorrect answers show a "Teach Me" button
2. **One-Click Access**: Student clicks to open personalized micro-lesson
3. **Visual Explanations**: See the difference between their answer and the correct answer
4. **Learning Tips**: Topic-specific explanations and memory aids
5. **No Penalty**: Pure growth mindset - mistakes are learning opportunities

### Features

**Answer Comparison**
```
┌──────────────┬──────────────┐
│   あなたの答え  │    せいかい    │
│ Your answer  │   Correct    │
│              │              │
│      15      │      18      │
│      ❌      │      ✓       │
└──────────────┴──────────────┘
```

**Visual Explanations**
- **Number Line**: Shows user answer vs correct answer position
- **Groups**: Visual dots representing each answer
- **Diagrams**: Pie/bar charts for fractions/ratios
- **Formula**: Shows the correct calculation method

**Topic-Specific Lessons**
| Topic | Japanese | English |
|-------|----------|---------|
| Addition | たし算はものをあわせる計算 | Combining things together |
| Subtraction | のこりをもとめる計算 | Finding what's left |
| Multiplication | おなじ数をなんどもたす | Adding same number multiple times |
| Division | おなじ数でわける | Splitting into equal groups |
| Decimals | １よりちいさい数 | Numbers smaller than 1 |
| Fractions | ものをわける時に使う | Used when sharing things |
| Ratios | 「倍」は集めた数 | "Times" means groups collected |
| Geometry | ２本の線が出会う角度 | Where two lines meet |

**Growth Mindset Messages**
- "まちがいはせいちょうのきかい！/ Mistakes help us grow!"
- "つぎはもっとがんばろう / Let's try even harder next time"

### UI Layout
```
┌───────────────────────────────────┐
│  📚 たし算のコツ / Addition Tips  │
├───────────────────────────────────┤
│                                   │
│  ┌──────────┬──────────┐         │
│  │   15     │    18    │         │
│  │   ❌     │    ✓     │         │
│  └──────────┴──────────┘         │
│                                   │
│  👀 見てみよう / Let's look       │
│  [Visual number line]             │
│                                   │
│  [💡 せつめいを見る]              │
│                                   │
│  💡 おぼえてね / Remember         │
│  おおきい数からかぞえるとかんたん！│
│  Start counting from the larger!  │
│                                   │
│  まちがいはせいちょうのきかい！     │
│  Mistakes help us grow!           │
│                                   │
│  [にたもんだい]  [つづける]        │
│  [Try Similar]  [Continue]        │
└───────────────────────────────────┘
```

### Integration
- **Trigger**: "Teach Me" button appears on incorrect answers after grading
- **Button Location**: Next to the ✗ mark and correct answer display
- **Button Style**: Yellow background with lightbulb icon (💡)
- **Bilingual**: Japanese primary, English secondary

### Action Buttons
- **にたもんだい / Try Similar**: Generates similar question (future enhancement)
- **つづける / Continue**: Closes modal, back to exercise

### Benefits
- ✅ Turns mistakes into learning opportunities
- ✅ No penalty - just growth
- ✅ Builds growth mindset
- ✅ Topic-specific explanations
- ✅ Visual learning aids
- ✅ Encourages retrying

---

## 💰 3. Virtual Currency: "Math Coins" ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/lib/gameState.ts`, `src/components/ScoreResultModal.tsx`, `src/components/ShopModal.tsx`

### Earning Coins
| Action | Coins Earned |
|--------|--------------|
| Correct answer | +5 coins |
| Perfect score (5/5) | +25 bonus |
| Daily streak bonus | ×2 multiplier |
| Try new topic first time | +10 coins |
| Complete daily goal | +50 coins |
| Unlock achievement | Variable (10-100) |
| Speed bonus (under 30s/question) | +3 coins |
| No-hint bonus | +10 coins |

### Spending Coins ✅ IMPLEMENTED
- **Avatar Colors**: Red, Green, Purple, Orange (25¢ each), Pink (50¢), Gold (100¢)
- **Themes**: Dark mode (200¢), pastel theme (150¢), neon glow (300¢)
- **Power-ups**:
  - Extra hint (+1 free hint): 25¢ ✅
  - Double coins (next exercise): 50¢ ✅
  - Streak freeze: 100¢ ✅

### Shop UI ✅
```
┌───────────────────────────────────┐
│  🛍️ ショップ / Shop               │
│  💰 You have: 450 coins           │
├───────────────────────────────────┤
│  [All] [Themes] [Colors] [Items]  │
│                                   │
│  ┌───────────────────────────┐   │
│  │  🌙 ダークモード          │   │
│  │    Dark Mode              │   │
│  │    200 🪙     [かう/Buy]  │   │
│  └───────────────────────────┘   │
│                                   │
│  ┌───────────────────────────┐   │
│  │  💡 ヒント+1              │   │
│  │    Extra Hint             │   │
│  │    25 🪙      [かう/Buy]  │   │
│  └───────────────────────────┘   │
└───────────────────────────────────┘
```

---

## 👤 4. Avatar System: "Kei-kun Character" ✅ MOSTLY COMPLETE

**Status**: ✅ Complete | **File**: `src/components/HeaderBar.tsx`, `src/components/ShopModal.tsx`

**Implemented**:
- ✅ Basic avatar display with name, color, and level in header bar
- ✅ Avatar color shop with 6 unlockable colors (25-100 coins)
- ✅ Theme preview in shop

**Not Implemented**: Avatar hats, outfits, reactions, animations

### Planned Reactions

### Reactions
| Action | Reaction | Animation |
|--------|----------|-----------|
| Correct answer | 😊 Happy | Bounce up/down |
| Wrong answer | 😢 Sad → 😊 Encouraging | Shake, then nod |
| Perfect score | 🎉 Celebration | Spin + confetti |
| Streak milestone | 🌟 Level up | Glow + scale up |
| New topic unlock | 🗝️ Discovery | Key turn animation |

### Avatar Stats Screen
```
┌────────────────────────────┐
│        👦 [Avatar]         │
│     Wearing: 🎩 ⭐ 👓      │
│                            │
│  Strength: 45 (Geometry)   │
│  Speed: 30 (Calculations)  │
│  Wisdom: 55 (Ratios)       │
│                            │
│  Tap to customize →        │
└────────────────────────────┘
```

### Stats Calculation
- **Strength**: Average accuracy on Geometry topics
- **Speed**: Average time per question
- **Wisdom**: Average accuracy on Ratios/Percentages
- **Technique**: Division/Decimals accuracy
- **Knowledge**: Large Numbers accuracy

---

## 🏆 5. Achievement Badges ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/lib/gameState.ts`

**Implemented**: 8 Special Achievements

| Badge | Name | Requirement | Reward | Status |
|-------|------|-------------|--------|--------|
| 🎯 | かんぺき！ / Perfectionist | Get 100% | 50 coins | ✅ |
| ⭐ | ファーストトライ / First Try | Answer first question | 10 coins | ✅ |
| 🌈 | たんけんか / Explorer | Try all 10 topics | 75 coins | ✅ |
| ⚡ | スピードスター / Speed Demon | Complete speed mode perfectly | 100 coins | ✅ |
| 🚫 | ヒントなし / Hint Hater | Complete no-hints perfectly | 50 coins | ✅ |
| 🔥 | 3日れんぞく / 3-Day Streak | Practice 3 days in a row | 30 coins | ✅ |
| 🏆 | 1週間れんぞく / Week Warrior | Practice 7 days in a row | 100 coins | ✅ |
| 💰 | コインコレクター / Coin Collector | Collect 100 coins | 25 coins | ✅ |

### Topic Mastery Badges (Planned)
| Badge | Requirement | Visual |
|-------|-------------|--------|
| 🥉 Bronze | 60% average on topic | Bronze star border |
| 🥈 Silver | 80% average | Silver star border |
| 🥇 Gold | 95% average | Gold star border |
| 💎 Diamond | 100% on 10 consecutive sets | Diamond sparkle |

### Special Achievements
| Badge | Name | Requirement | Reward |
|-------|------|-------------|--------|
| ⚡ | Speed Demon | Complete 5 questions under 2 min | 100 coins |
| 🎯 | Perfectionist | 10 perfect scores in a row | 150 coins |
| 🔍 | Hint Hater | Complete set without hints | 50 coins |
| 🌈 | Explorer | Try all 8 topics | 75 coins |
| 📚 | Master Student | 1000 total correct answers | 200 coins |
| 🌙 | Night Owl | Practice after 8 PM | 25 coins |
| 🌅 | Early Bird | Practice before 9 AM | 25 coins |
| 🔄 | Persistent | Retry same topic 5 times | 40 coins |
| 🎓 | Graduate | Master all topics (Gold) | 500 coins + special title |
| 👑 | Math King/Queen | Diamond on all topics | Ultimate badge |

### Collection Display
```
┌──────────────────────────────────┐
│  🏆 Achievements: 12/25          │
│                                  │
│  Recent:                         │
│  ┌────┐ ┌────┐ ┌────┐           │
│  │ ⚡ │ │ 🎯 │ │ 🌈 │           │
│  └────┘ └────┘ └────┘           │
│                                  │
│  [View All →]                    │
└──────────────────────────────────┘
```

---

## ⚔️ 6. Challenge Modes ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/components/ChallengeModeSelector.tsx`

**Implemented**: Toggle switches before generating exercises with reward multipliers.

### Challenge Types

### Challenge Types
| Mode | Description | Reward Multiplier | Status |
|------|-------------|-------------------|--------|
| ⏱️ Speed Mode | 30 second timer per question | ×2 coins | ✅ |
| 🚫 No Hints | Disable hint button | +10 coins | ✅ |
| 🎯 Hard Mode | Larger numbers, word problems | ×3 coins | 🚧 |
| 🔥 Marathon | 20 questions instead of 5 | ×2 coins | 🚧 |
| 🎲 Random Mix | Questions from all topics | ×2.5 coins | 🚧 |
| ⚡ Lightning | 10 second timer, instant feedback | ×4 coins | 🚧 |

### Difficulty Levels
| Level | Description | Unlock Requirement |
|-------|-------------|-------------------|
| 🌱 Easy | Simple numbers, extra hints | Default |
| 🌿 Normal | Standard difficulty | Default |
| 🌳 Hard | Complex problems, time pressure | 70% on Normal |
| 🏔️ Expert | Marathon + Hard + No Hints | 80% on Hard |

---

## 🎉 7. Interactive Feedback Improvements

### Current State
Simple 〇/× with color change.

### Improved Feedback - Correct Answer
```
┌────────────────────────────┐
│                            │
│      ✨ CORRECT! ✨        │
│                            │
│         😊👍               │
│                            │
│   🎉 +5 coins              │
│   🔥 Streak: 4             │
│   ⚡ Speed bonus: +3       │
│                            │
│   [Continue →]             │
│                            │
└────────────────────────────┘
```

### Improved Feedback - Wrong Answer
```
┌────────────────────────────┐
│                            │
│     💡 Let's Learn!        │
│                            │
│   You answered: 45°        │
│   Correct: 135°            │
│                            │
│   [Visual diagram showing  │
│    the angle difference]   │
│                            │
│   💡 Remember:             │
│   Angles > 90° are obtuse  │
│                            │
│   [Try Again] [Next →]     │
│                            │
└────────────────────────────┘
```

### Score Screen Enhancements
```
┌────────────────────────────┐
│                            │
│    🏆 80点！GREAT JOB!     │
│                            │
│    ⭐⭐⭐⭐☆               │
│                            │
│   Rewards earned:          │
│   💰 +40 coins             │
│   🎯 New high score!       │
│   📈 Geometry +15 XP       │
│                            │
│   [Share 📤] [Again ↻]     │
│                            │
└────────────────────────────┘
```

---

## ⭐ 8. Level System per Topic ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/lib/gameState.ts`, `src/components/HeaderBar.tsx`

Replace simple percentages with RPG-style leveling.

### XP System ✅
```typescript
interface TopicProgress {
  topicId: string;
  level: number;        // Current level (1-50)
  currentXP: number;    // XP in current level
  xpToNextLevel: number; // Required XP
  totalXP: number;      // All-time XP
}
```

### XP Sources ✅
| Action | XP Earned | Status |
|--------|-----------|--------|
| Correct answer | +10 XP | ✅ |
| Perfect set (5/5) | +50 XP bonus | 🚧 |
| First time trying topic | +100 XP | 🚧 |
| Daily challenge complete | +200 XP | 🚧 |
| Achievement unlocked | +Variable | 🚧 |

### Level Display
```
Geometry: Level 7 ⭐ Scholar
[████████░░░░░░░░░░] 700/1000 XP

Next rank: Expert (Level 10)
Keep practicing to level up!
```

---

## 🆘 9. Smart Hints System ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/components/SmartHintPanel.tsx`, `src/lib/gameState.ts`

Replace static hints with progressive hint system.

### Hint Levels ✅
```
💡 Hint Options:
├─ Level 1 (Free): "Look at the angle carefully"
├─ Level 2 (-2 coins): "It's more than 90°"
├─ Level 3 (-5 coins): "It's an obtuse angle"
└─ Solution (-10 coins): "Answer is 135°"
```

### Visual Hint Button ✅
- Shows available hint levels
- Coins required displayed
- Disabled if insufficient coins
- Extra hint powerup integration
- Shows current coin balance

---

## 📊 10. Statistics Dashboard

### Personal Stats Screen
```
┌───────────────────────────────────┐
│  📊 Your Math Journey             │
├───────────────────────────────────┤
│                                   │
│  Total Practice Time: 12h 30m     │
│  Questions Answered: 1,234        │
│  Accuracy Rate: 78%               │
│  Current Streak: 5 days 🔥        │
│                                   │
│  Strongest Topic: Geometry 85%    │
│  Needs Practice: Ratios 62%       │
│                                   │
│  [View Detailed Stats →]          │
│  [Weekly Report 📈]               │
│                                   │
└───────────────────────────────────┘
```

### Graphs to Include
- Accuracy trend over time
- Time spent per topic (pie chart)
- Weekly activity heatmap
- Skill radar chart (all topics)
- Improvement curve

---

## 👨‍👩‍👧 11. Parent/Teacher Dashboard

### Access
Hidden section via:
- Swipe up on home screen
- Secret code (tap logo 5 times)
- Long-press on achievements

### Dashboard Features
```
┌───────────────────────────────────┐
│  📊 Progress Report               │
├───────────────────────────────────┤
│                                   │
│  Last 7 Days Activity:            │
│  [Heatmap visualization]          │
│                                   │
│  Accuracy by Topic:               │
│  Geometry: ████████░░ 80%         │
│  Ratios:   █████░░░░░ 50% ⚠️      │
│  Decimals: ███████░░░ 70%         │
│                                   │
│  Suggested Focus: Ratios          │
│  Recommended exercises: 5         │
│                                   │
│  [Print Report] [Share 📤]        │
│                                   │
└───────────────────────────────────┘
```

### Insights
- Weak areas identification
- Time spent vs. improvement correlation
- Recommended practice topics
- Comparison to grade-level expectations

---

## 🎨 12. Visual Polish & Animations ✅ MOSTLY COMPLETE

### Animations ✅
| Trigger | Animation | Status |
|---------|-----------|--------|
| Page load | Fade in + slide up | ✅ |
| Answer correct | Bounce + sparkle burst | ✅ |
| Score reveal | Count up + confetti | ✅ |
| Coin earned | Float up + coin particles | ✅ |
| Achievement | Firework burst | ✅ |

### Particle Effects ✅ IMPLEMENTED

**File**: `src/components/ParticleEffects.tsx`

| Effect Type | Description | Trigger |
|-------------|-------------|---------|
| 🎉 Confetti | Colorful celebration burst | Perfect score (5/5) |
| ✨ Sparkle | Golden star sparkles | Achievement unlock |
| 🪙 Coin | Gold coin explosion | Coins earned |
| ⭐ Star | Rotating stars | Level up (future) |
| 🎆 Firework | Multi-color burst | Achievement unlock |
| 🫧 Bubble | Floating bubbles | Theme unlock (future) |

### How to Trigger Particles
```typescript
import { celebratePerfect, celebrateCoin, celebrateAchievement } from '@/components/ParticleEffects';

// Perfect score (5/5)
celebratePerfect();

// Coins earned
celebrateCoin();

// Achievement unlocked
celebrateAchievement();

// Custom burst
triggerParticles('star', x, y, count);
```

### Sound Effects (Optional - Not Implemented)
| Event | Sound | Status |
|-------|-------|--------|
| Correct | "Ding!" (pleasant bell) | 🚧 |
| Wrong | Soft "boing" (not scary) | 🚧 |
| Achievement | Fanfare/trumpet | 🚧 |
| Coin | Coin ching | 🚧 |
| Level up | Success chord | 🚧 |
| Button click | Soft pop | 🚧 |

---

## 🏅 13. Social Features (Phase 2)

### Weekly Leaderboard
```
🏆 This Week's Champions

1. 🥇 Kei-kun      2,450 pts ⭐
2. 🥈 Yuki-chan    2,120 pts
3. 🥉 Taro-kun     1,980 pts
...
15. 🎖️ You        1,250 pts

[Friends] [Class] [Global]
```

### Share Cards
Generate shareable image:
```
┌────────────────────────┐
│  🎉 I got 100%! 🎉     │
│                        │
│  けいくんの算数アプリ    │
│  Decimals - Level 12   │
│                        │
│  Perfect Score! 5/5    │
│  🔥 7 day streak       │
│                        │
│  [QR Code to app]      │
└────────────────────────┘
```

---

## 💾 14. Data Persistence ✅ IMPLEMENTED

**Status**: ✅ Complete | **File**: `src/lib/gameState.ts`

### Local Storage Schema ✅
```typescript
interface GameData {
  version: number;
  player: {
    name: string;
    avatar: AvatarConfig;
    coins: number;
    totalXP: number;
  };
  progress: {
    [topicId: string]: TopicProgress;
  };
  achievements: string[]; // Unlocked achievement IDs
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    totalTimeMinutes: number;
    streak: {
      current: number;
      longest: number;
      lastActiveDate: string;
    };
  };
  settings: {
    soundEnabled: boolean;
    animationsEnabled: boolean;
    darkMode: boolean;
    language: 'ja' | 'en' | 'both';
  };
}
```

### Backup & Sync
- Export data as JSON file
- Import on new device
- Optional cloud sync (future)

---

## 📋 Files Created/Modified

### New Files
| File | Purpose |
|------|---------|
| `src/lib/gameState.ts` | Core gamification logic (coins, XP, achievements, streaks, shop, hints, quests) |
| `src/components/HeaderBar.tsx` | Top bar with coins, streak, achievements, XP, shop, quests buttons |
| `src/components/ChallengeModeSelector.tsx` | Pre-exercise challenge toggles |
| `src/components/ShopModal.tsx` | Shop UI for buying themes, colors, power-ups |
| `src/components/SmartHintPanel.tsx` | Progressive hint system with coin costs |
| `src/components/AdventureMap.tsx` | Visual learning map with 7 regions, stars, locks |
| `src/components/ParticleEffects.tsx` | Particle system (confetti, coins, stars, fireworks) |
| `src/components/DailyQuests.tsx` | Daily quest system with 3 missions |
| `src/components/LearningInsights.tsx` | Error pattern recognition, learning insights modal |
| `src/components/EndOfSessionSummary.tsx` | End-of-session celebration screen with stats |
| `src/components/TeachMeModal.tsx` | Micro-lesson modal for wrong answers |

### Modified Files
| File | Changes |
|------|---------|
| `src/components/ScoreResultModal.tsx` | Added coins breakdown, achievements display |
| `src/pages/Index.tsx` | Integrated HeaderBar, ChallengeModeSelector, gamification state, AdventureMap |

---

## 📱 UI/UX Guidelines

### Child-Friendly Design Principles
1. **Large touch targets**: Minimum 44px
2. **Clear feedback**: Every action has visual response
3. **No punishment**: Wrong answers are learning opportunities
4. **Celebrate progress**: Every milestone matters
5. **Choice**: Multiple paths to success
6. **Surprise**: Random rewards keep engagement

### Color Coding
| Type | Color | Usage |
|------|-------|-------|
| Success | Green #22c55e | Correct, unlocked, positive |
| Error | Red #ef4444 | Wrong, locked (softened) |
| Warning | Yellow #f59e0b | Streak ending, almost there |
| Info | Blue #3b82f6 | Hints, tips, neutral |
| Special | Purple #a855f7 | Achievements, rare items |
| Gold | Yellow #fbbf24 | Coins, premium rewards |

### Typography Scale
| Element | Size | Weight |
|---------|------|--------|
| Title | 24px | Bold |
| Topic Label | 18px | Bold |
| Question Text | 16px | Medium |
| Button Text | 14px | Bold |
| Hint Text | 12px | Regular |
| English Subtitle | 10px | Regular |

---

## 🧪 Testing Checklist

### Usability
- [ ] Child can navigate without help
- [ ] Touch targets are easy to hit
- [ ] Text is readable without zooming
- [ ] Feedback is clear and immediate
- [ ] No scary or negative messaging

### Technical
- [ ] Data persists across sessions
- [ ] Works offline
- [ ] Loads quickly (< 3 seconds)
- [ ] No memory leaks
- [ ] Responsive on all screen sizes

### Educational
- [ ] Hints actually help learning
- [ ] Wrong answers teach something
- [ ] Difficulty progression is smooth
- [ ] Achievements encourage practice
- [ ] Stats show real progress

---

## 📝 Notes

### Design Philosophy
> "Every child is a math hero in training. The app should make them feel powerful, capable, and excited to learn more."

### Key Metrics to Track
- Daily Active Users (DAU)
- Average session duration
- Questions answered per session
- Return rate (next day)
- Topic completion rates
- Achievement unlock rates

### Future Ideas
- Multiplayer math battles
- AI tutor for explanations
- AR geometry visualization
- Voice input for answers
- Integration with school systems

---

**Document Version**: 1.9
**Created**: 2026-03-12
**Updated**: 2026-03-13
**Status**: Phases 1-3 Complete + Teach Me Mode | Phase 4 Optional (Sound/Parent/Social)
