# 🎮 Gamification & UX Improvement Plan

## Overview

This document outlines gamification and user experience improvements for "けいくんの算数アプリ" (Kei-kun's Math App) to increase engagement, motivation, and learning outcomes for children.

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

### Missing Gamification
- No progress persistence
- No streaks or achievements
- No difficulty levels
- No time challenges
- No collectibles or unlocks
- No avatar/character customization
- No high score tracking
- No level progression system

---

## 🗺️ 1. Progression System: "Math Adventure Map"

Replace the tab grid with a visual learning island where each topic is a region.

### Visual Concept
```
┌─────────────────────────────────────┐
│  🏔️ Geometry Mountains              │
│     ⭐⭐⭐ (Mastered)               │
│                                     │
│  🌊 Ratio Ocean ───→ 🏝️ Accuracy   │
│     ⭐⭐☆ (Progress)    Island      │
│                                     │
│  🔢 Number Castle                   │
│     🔒 (Unlock at 60% on Ratios)    │
└─────────────────────────────────────┘
```

### Implementation
- Visual map with locked/unlocked regions
- Stars per topic (0-3 based on average score)
- Progress bars showing mastery percentage
- Animated paths connecting related topics

---

## 🔥 2. Daily Streaks & Rewards

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

## 💰 3. Virtual Currency: "Math Coins"

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

### Spending Coins
- **Avatar Customization**: Hats (50), glasses (75), colors (25), outfits (150)
- **Themes**: Dark mode (200), pastel theme (150), neon glow (300)
- **Power-ups**:
  - Extra hint (+1 free hint): 25 coins
  - Double coins (next exercise): 50 coins
  - Streak freeze: 100 coins
  - Skip question: 75 coins

### Shop UI
```
┌───────────────────────────────────┐
│  💰 You have: 450 coins           │
├───────────────────────────────────┤
│  🎩 Items          🎨 Themes      │
│  ┌─────┐          ┌─────┐         │
│  │ 🎩  │ 50¢      │ 🌙  │ 200¢    │
│  │Hat  │          │Dark │         │
│  └─────┘          └─────┘         │
│  ┌─────┐          ┌─────┐         │
│  │ 👓  │ 75¢      │ 🌸  │ 150¢    │
│  │Glasses        │Pastel          │
│  └─────┘          └─────┘         │
└───────────────────────────────────┘
```

---

## 👤 4. Avatar System: "Kei-kun Character"

Create a customizable character that reacts to performance.

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

## 🏆 5. Achievement Badges

### Topic Mastery Badges
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

## ⚔️ 6. Challenge Modes

Add toggle switches before generating exercises.

### Challenge Types
| Mode | Description | Reward Multiplier |
|------|-------------|-------------------|
| ⏱️ Speed Mode | 30 second timer per question | ×2 coins |
| 🚫 No Hints | Disable hint button | ×1.5 coins |
| 🎯 Hard Mode | Larger numbers, word problems | ×3 coins |
| 🔥 Marathon | 20 questions instead of 5 | ×2 coins |
| 🎲 Random Mix | Questions from all topics | ×2.5 coins |
| ⚡ Lightning | 10 second timer, instant feedback | ×4 coins |

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

## ⭐ 8. Level System per Topic

Replace simple percentages with RPG-style leveling.

### XP System
```typescript
interface TopicProgress {
  topicId: string;
  level: number;        // Current level (1-50)
  currentXP: number;    // XP in current level
  xpToNextLevel: number; // Required XP
  totalXP: number;      // All-time XP
  rank: string;         // Title based on level
}

const ranks = [
  { level: 1, title: "Beginner" },
  { level: 5, title: "Apprentice" },
  { level: 10, title: "Student" },
  { level: 20, title: "Scholar" },
  { level: 30, title: "Expert" },
  { level: 40, title: "Master" },
  { level: 50, title: "Grandmaster" }
];
```

### XP Sources
| Action | XP Earned |
|--------|-----------|
| Correct answer | +10 XP |
| Perfect set (5/5) | +50 XP bonus |
| First time trying topic | +100 XP |
| Daily challenge complete | +200 XP |
| Achievement unlocked | +Variable |

### Level Display
```
Geometry: Level 7 ⭐ Scholar
[████████░░░░░░░░░░] 700/1000 XP

Next rank: Expert (Level 10)
Keep practicing to level up!
```

---

## 🆘 9. Smart Hints System

Replace static hints with progressive hint system.

### Hint Levels
```
💡 Hint Options:
├─ Level 1 (Free): "Look at the angle carefully"
├─ Level 2 (-2 coins): "It's more than 90°"
├─ Level 3 (-5 coins): "It's an obtuse angle"
└─ Solution (-10 coins): "Answer is 135°"
```

### Visual Hint Button
- Shows available hint levels
- Coins required displayed
- Disabled if insufficient coins
- Glows when free hint available

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

## 🎨 12. Visual Polish & Animations

### Animations to Add
| Trigger | Animation | Duration |
|---------|-----------|----------|
| Page load | Fade in + slide up | 300ms |
| Answer correct | Bounce + sparkle burst | 500ms |
| Answer wrong | Shake + red flash | 300ms |
| Score reveal | Count up + confetti | 1000ms |
| Coin earned | Float up + ching | 800ms |
| Level up | Glow pulse + star burst | 1500ms |
| Achievement | Badge flip + shine | 1200ms |
| Topic unlock | Lock break + key turn | 1000ms |

### Sound Effects (Optional Toggle)
| Event | Sound |
|-------|-------|
| Correct | "Ding!" (pleasant bell) |
| Wrong | Soft "boing" (not scary) |
| Achievement | Fanfare/trumpet |
| Coin | Coin ching |
| Level up | Success chord |
| Button click | Soft pop |

### Particles & Effects
- Confetti on perfect score
- Floating +coin numbers
- Streak fire particles
- Snow/rain theme effects
- Avatar trail on movement

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

## 💾 14. Data Persistence

### Local Storage Schema
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

## 🛠️ Implementation Priority

### Phase 1: Foundation (Week 1-2)
- [ ] Set up localStorage persistence
- [ ] Create coin system
- [ ] Build basic avatar component
- [ ] Implement streak counter
- [ ] Add simple animations (fade, bounce)

### Phase 2: Core Features (Week 3-4)
- [ ] Achievement system
- [ ] Challenge mode toggles
- [ ] XP and leveling per topic
- [ ] Enhanced feedback screens
- [ ] Basic stats tracking

### Phase 3: Polish (Week 5-6)
- [ ] Adventure map UI
- [ ] Shop system
- [ ] Smart hints with costs
- [ ] Sound effects
- [ ] Particle effects

### Phase 4: Advanced (Week 7-8)
- [ ] Parent dashboard
- [ ] Social features
- [ ] Weekly leaderboards
- [ ] Share functionality
- [ ] Advanced analytics

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

**Document Version**: 1.0
**Created**: 2026-03-12
**Status**: Ready for Implementation
