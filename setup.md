# Branch Setup Guide

## Rationale

To support parallel development tracks:
1. **Stable Branch**: Maintains the current production version (v3) that end users actively use for studying
2. **Gamified Branch**: Active development of new gamification features without disrupting users
3. **Future Merging**: Bug fixes on stable can be merged into gamified, ensuring fixes propagate

This separation ensures:
- Users get a stable, tested experience
- Developers can experiment and build new features
- Critical bug fixes can be deployed immediately to users
- Gamification features only release when fully polished

---

## Branch Structure

| Branch | Purpose | Current State |
|--------|---------|---------------|
| `main` | Production deployment branch | Pre-gamification v3 |
| `stable` | Bug fixes for production | Same as main |
| `gamified` | Active feature development | Full gamification system |

---

## Quick Reference

### Switch to Gamified Development
```bash
git checkout gamified
npm run dev
```

### Fix Bug on Stable Version
```bash
git checkout stable
# Edit files...
git add .
git commit -m "Fix: description"
git push origin stable
# Then deploy to GitHub Pages
```

### Merge Stable Fixes into Gamified
```bash
git checkout gamified
git merge stable
# Resolve any conflicts
git push origin gamified
```

---

## Detailed Workflows

### 1. Fix Bugs on Stable (For End Users)

When a user reports a bug on the live version:

```bash
# Switch to stable branch
git checkout stable

# Pull latest
git pull origin stable

# Make your fixes
# Edit files...

# Commit and push
git add .
git commit -m "Fix: [description of bug fix]"
git push origin stable

# Build and deploy
npm run build
# Deploy dist/ folder to gh-pages-v2 branch
```

### 2. Continue Gamification Development

When working on new features:

```bash
# Switch to gamified branch
git checkout gamified

# Pull latest
git pull origin gamified

# Make changes
# Edit files...

# Commit and push
git add .
git commit -m "Feature: [description of feature]"
git push origin gamified
```

### 3. Merge Stable Bug Fixes into Gamified

After fixing a bug on stable, merge it to gamified:

```bash
# Switch to gamified
git checkout gamified

# Pull latest gamified
git pull origin gamified

# Merge stable branch
git merge stable

# If conflicts occur, resolve them:
# - Edit conflicted files
# - git add .
# - git commit

# Push updated gamified
git push origin gamified
```

### 4. Deploy Stable to GitHub Pages

To update the live site from stable branch:

```bash
# Ensure you're on stable
git checkout stable

# Pull latest
git pull origin stable

# Build
npm run build

# Deploy dist folder to gh-pages-v2 branch
# (Use your deployment method: gh-pages package, manual copy, etc.)
```

### 5. Release Gamified to Production

When gamification is complete and tested:

```bash
# Switch to main
git checkout main

# Pull latest
git pull origin main

# Merge gamified
git merge gamified

# Push to GitHub
git push origin main

# Build and deploy
npm run build
# Deploy dist/ to gh-pages-v2
```

---

## Important Notes

### Never Commit Directly to Main
Always use either:
- `stable` for bug fixes
- `gamified` for features
Then merge via pull requests or merge commands.

### Keeping Branches Updated

Before starting work, always pull latest:
```bash
git checkout [branch]
git pull origin [branch]
```

### Check Current Branch
```bash
git branch
# * indicates current branch
```

### View Branch History
```bash
git log --oneline --graph --all
```

---

## Files Added to Gamified Branch

The following files were added for gamification:

```
src/lib/gameState.ts                    # Core gamification logic
src/components/HeaderBar.tsx            # Top bar with stats
src/components/ChallengeModeSelector.tsx # Speed/No Hints toggles
src/components/ShopModal.tsx            # Shop UI
src/components/SmartHintPanel.tsx       # Progressive hints
src/components/AdventureMap.tsx         # Visual learning map
src/components/ParticleEffects.tsx      # Confetti, coins, stars
src/components/DailyQuests.tsx          # Daily missions
src/components/LearningInsights.tsx     # Error pattern recognition
src/components/EndOfSessionSummary.tsx  # Session celebration
src/components/TeachMeModal.tsx         # Micro-lessons for mistakes
improvements.md                         # Improvement recommendations
gamify.md                               # Full gamification plan
```

Modified files in gamified:
```
src/pages/Index.tsx                     # Integrated all components
src/components/QuestionItem.tsx         # Added Teach Me button
src/components/ScoreResultModal.tsx     # Enhanced with coins/achievements
src/components/area/AreaQuestionItem.tsx # Added Teach Me button
```

---

## Version History

| Version | Branch | Description |
|---------|--------|-------------|
| v3 | main/stable | Tab reorganization, 10 topics |
| v4 (future) | gamified → main | Full gamification release |

---

**Created**: 2026-03-13
**Branches**: main, stable, gamified
