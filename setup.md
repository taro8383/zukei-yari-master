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

## CRITICAL: Merging Stable into Gamified Without Breaking Gamification

**⚠️ DANGER:** Blindly merging stable into gamified can destroy the gamification system!

### The Problem

`src/pages/Index.tsx` is **intentionally different** between branches:
- **stable**: Basic imports, no gamification
- **gamified**: Imports and integrates HeaderBar, ShopModal, AdventureMap, gameState, particles, etc.

When you merge stable → gamified, git sees Index.tsx conflicts and may overwrite gamified's version.

### Safe Merge Procedure

```bash
# 1. Switch to gamified and pull latest
git checkout gamified
git pull origin gamified

# 2. Start the merge
git merge stable

# 3. If Index.tsx has conflicts, DO NOT use --theirs or accept stable's version
#    Instead, manually edit Index.tsx to preserve gamification code:
#
#    KEEP (from gamified):
#    - All gamification imports (HeaderBar, ShopModal, AdventureMap, etc.)
#    - All gameState imports and hooks
#    - All particle effect imports
#    - ChallengeModeSelector, DailyQuests, etc.
#
#    ADD (from stable):
#    - Bug fixes in logic that don't conflict with gamification
#    - New components that aren't gamification-related
#
# 4. For other conflicted files, use judgment:
#    - Component bug fixes: accept stable's fixes
#    - TestMode.tsx: merge carefully to keep test features
#    - CSS/styling: usually safe to accept stable's fixes

# 5. After resolving conflicts:
git add .
git commit -m "Merge stable bug fixes into gamified"

# 6. CRITICAL: Verify gamification still works
grep -E "HeaderBar|ShopModal|AdventureMap|gameState" src/pages/Index.tsx
# If no results, the merge broke gamification - REVERT AND TRY AGAIN

# 7. Test locally before pushing
npm run dev
# Verify: Header bar with coins/XL, adventure map, shop button all appear

# 8. Only then push
git push origin gamified
```

### What NOT to Do

❌ **NEVER do this during stable → gamified merge:**
```bash
git checkout --theirs src/pages/Index.tsx  # DESTROYS gamification!
git checkout stable -- src/pages/Index.tsx # DESTROYS gamification!
```

❌ **NEVER blindly accept all "incoming" changes** in Index.tsx during merge

### If You Accidentally Broke Gamification

```bash
# Abort the merge if still in progress
git merge --abort

# Or if already committed, restore gamified's Index.tsx
git checkout HEAD~1 -- src/pages/Index.tsx
git commit -m "Restore gamified Index.tsx after bad merge"

# Then manually apply stable's bug fixes to the file
```

### Files to Handle With Care During Merge

| File | Stable | Gamified | Merge Strategy |
|------|--------|----------|----------------|
| `src/pages/Index.tsx` | Basic | +Gamification | **Manual merge** - keep gamification imports/state |
| `src/components/TestMode.tsx` | Test mode | Same | Usually safe to accept stable's fixes |
| `src/lib/testMode.ts` | Test logic | Same | Usually safe to accept stable's fixes |
| `src/components/QuestionItem.tsx` | Basic | +Teach Me | Keep gamified's version |
| `src/components/ScoreResultModal.tsx` | Basic | +Coins | Keep gamified's version |

---

## Version History

| Version | Branch | Description |
|---------|--------|-------------|
| v3 | main/stable | Tab reorganization, 10 topics |
| v4 (future) | gamified → main | Full gamification release |

---

**Created**: 2026-03-13
**Branches**: main, stable, gamified
