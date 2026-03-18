# Bug Fixes Comparison: Stable vs Gamified

## Complete File Comparison Results

### Files Checked: 36 total files differ between gamified and stable branches

```
Command used: git diff --name-only gamified stable
```

---

## CONFIRMED BUG FIXES / FEATURES MISSING IN STABLE

### 1. src/pages/Index.tsx (1,767 lines different)
**STATUS: CRITICAL FIXES MISSING**

**Missing Bug Fix #1: Equation Validation Functions**
- `evaluateExpression()` function - evaluates mathematical expressions safely
- `isEquationValid()` function - validates equations mathematically
- **Impact**: "Combining into One Equation" topic in Calculation Rules doesn't validate answers correctly
- **Lines removed from stable**: ~65 lines of validation logic

```typescript
// MISSING IN STABLE - Required for equation validation
function evaluateExpression(expr: string): number | null {
  try {
    let normalized = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/＋/g, '+')
      .replace(/ー/g, '-')
      .replace(/−/g, '-')
      .replace(/（/g, '(')
      .replace(/）/g, ')');
    normalized = normalized.replace(/\s/g, '');
    if (!/^[\d+\-*/().]+$/.test(normalized)) {
      return null;
    }
    const result = new Function('return ' + normalized)();
    if (typeof result !== 'number' || !isFinite(result)) {
      return null;
    }
    return result;
  } catch {
    return null;
  }
}

function isEquationValid(
  userEquation: string,
  correctEquation: string,
  expectedAnswer: number,
  problemNumbers: number[]
): boolean {
  const normalizedUser = userEquation.replace(/\s/g, '');
  const normalizedCorrect = correctEquation.replace(/\s/g, '');
  if (normalizedUser === normalizedCorrect) {
    return true;
  }
  const userResult = evaluateExpression(userEquation);
  if (userResult === null) {
    return false;
  }
  if (Math.abs(userResult - expectedAnswer) > 0.0001) {
    return false;
  }
  const userNumbers = normalizedUser.match(/\d+/g)?.map(Number) || [];
  const sortedUserNumbers = [...userNumbers].sort((a, b) => a - b);
  const sortedProblemNumbers = [...problemNumbers].sort((a, b) => a - b);
  if (sortedUserNumbers.length !== sortedProblemNumbers.length) {
    return false;
  }
  for (let i = 0; i < sortedUserNumbers.length; i++) {
    if (sortedUserNumbers[i] !== sortedProblemNumbers[i]) {
      return false;
    }
  }
  return true;
}
```

**Usage in gamified (missing in stable)**:
```typescript
// In handleGradeCalculationRules():
if (q.topic === 'combining-into-one-equation') {
  const userNum = parseInt(calculationRulesAnswers[i]);
  const equationCorrect = isEquationValid(
    calculationRulesEquationAnswers[i] || '',
    q.correctEquation || '',
    q.answer,
    q.numbers || []
  );
  // ...
}
```

**CRITICAL**: Stable uses inferior validation:
```typescript
// STABLE - Simple string comparison (BUG!):
const equationCorrect = calculationRulesEquationAnswers[i]?.replace(/\s/g, '') === q.correctEquation?.replace(/\s/g, '');

// GAMIFIED - Proper mathematical validation:
const equationCorrect = isEquationValid(...);
```

**Impact of this bug**:
- Student enters: `5 + 3 = 8` (correct math)
- Expected: `3 + 5 = 8` (same answer, different order)
- Stable marks: **WRONG** (string doesn't match)
- Gamified marks: **CORRECT** (evaluates to same answer)

**Also affects**: `isCorrect` prop passed to CalculationRulesQuestionItem - stable only does string comparison instead of proper validation.

**Missing Bug Fix #2: C-Shape Detection for Area of Composite Shapes**

**CRITICAL BUG FOUND**: Stable version cannot properly display C-shapes in the "Area of Composite Shapes" topic!

When passing dimensions to `AreaQuestionItem`, stable is missing:
```typescript
// MISSING IN STABLE - Required for C-shape support:
cutoutY: q.diagram.params.cutoutY,  // Position of cutout (vertical)
shapeType: q.diagram.params.cutoutY !== undefined ? 'c-shape' : 'l-shape',  // Detect shape type
```

**Missing Bug Fix #3: Line Graph Undo Handler**

**Handler function missing in stable**:
```typescript
// MISSING IN STABLE - Required for undo functionality:
const handleLineGraphUndoPoint = (index: number) => {
  const newPlottedPoints = [...lineGraphPlottedPoints];
  if (newPlottedPoints[index] && newPlottedPoints[index].length > 0) {
    // Remove the last plotted point
    newPlottedPoints[index].pop();
    setLineGraphPlottedPoints(newPlottedPoints);
  }
};
```

And the prop passing to LineGraphQuestionItem:
```typescript
onUndoPoint={() => handleLineGraphUndoPoint(i)}  // MISSING IN STABLE
```

**Impact**:
- The stable version generates C-shape questions (50% of composite shapes)
- But cannot properly display them because `cutoutY` is not passed
- The `shapeType` detection fails, so C-shapes may be mislabeled as L-shapes
- This breaks the Area of Composite Shapes topic for C-shape problems

**Location in gamified** (around line 2383):
```typescript
<AreaQuestionItem
  question={{
    // ...
    dimensions: q.diagram.params.outerWidth ? {
      outerWidth: q.diagram.params.outerWidth,
      outerHeight: q.diagram.params.outerHeight,
      cutoutWidth: q.diagram.params.cutoutWidth,
      cutoutHeight: q.diagram.params.cutoutHeight,
      cutoutY: q.diagram.params.cutoutY,  // <-- MISSING IN STABLE
      shapeType: q.diagram.params.cutoutY !== undefined ? 'c-shape' : 'l-shape',  // <-- MISSING IN STABLE
    } : undefined,
  }}
/>
```

---

### 2. src/lib/lineGraphs.ts (88 lines different)
**STATUS: FEATURE MISSING**

**Missing Feature: Word Problems for Drawing Graph Topic**

| Aspect | Gamified | Stable |
|--------|----------|--------|
| Interface | Has `problemDescription?: string` | Missing |
| Interface | Has `problemDescriptionEn?: string` | Missing |
| Questions | Word problems with data to extract | Direct table display |
| Educational value | Students read and extract data | Just read table |

**Examples missing in stable**:
```typescript
// Flower Growth problem
problemDescription: 'けいくんははなをそだていました。1日目は2cm、2日目は4cm、3日目は5cm、4日目は7cm、5日目には8cmにのびました。'
problemDescriptionEn: 'Kei grew a flower. Day 1: 2cm, Day 2: 4cm, Day 3: 5cm, Day 4: 7cm, Day 5: 8cm.'

// 50m Sprint problem
problemDescription: 'けいくんは50m走のれんしゅうをしました。4月は9びょう、5月は8びょう、6月も8びょう、7月は7びょう、8月も7びょうでした。'
problemDescriptionEn: 'Kei practiced 50m sprint. April: 9 sec, May: 8 sec, June: 8 sec, July: 7 sec, August: 7 sec.'

// Pages Read problem
problemDescription: 'けいくんは1しゅうかんでほんをよみました。げつようびは20ページ、かようびは35ページ、すいようびは45ページ、もくようびは60ページ、きんようびは70ページよみました。'
problemDescriptionEn: 'Kei read a book over a week. Monday: 20 pages, Tuesday: 35 pages, Wednesday: 45 pages, Thursday: 60 pages, Friday: 70 pages.'

// Dice Roll problem
problemDescription: 'けいくんはさいころをふりました。1回目は3、2回目は4（ごうけい7）、3回目は5（ごうけい12）、4回目は4（ごうけい16）、5回目は2（ごうけい18）でした。'
problemDescriptionEn: 'Kei rolled a dice. 1st roll: 3, 2nd roll: 4 (total 7), 3rd roll: 5 (total 12), 4th roll: 4 (total 16), 5th roll: 2 (total 18).'

// Pet Weight problem
problemDescription: 'けいくんのペットのたいじゅうをはかりました。1月は500g、2月は650g、3月は800g、4月は950g、5月は1100gでした。'
problemDescriptionEn: "Kei's pet weight was measured. January: 500g, February: 650g, March: 800g, April: 950g, May: 1100g."
```

**Question text differs**:
- Gamified: `"${scenario.problemDescription}\n\n上の文章から数字を見つけて..."` (Find numbers from text)
- Stable: `"表を見て、グラフの点をクリックして..."` (Look at the table)

---

### 3. src/components/lineGraphs/LineGraphQuestionItem.tsx (122 lines different)
**STATUS: FEATURES MISSING**

**Missing Feature #1: Undo Button for Drawing Graph**

Props missing in stable:
```typescript
onUndoPoint?: () => void;  // MISSING IN STABLE
```

UI missing in stable:
```typescript
// UNDO BUTTON - MISSING IN STABLE
<button
  onClick={onUndoPoint}
  disabled={!plottedPoints || plottedPoints.length === 0}
  className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed text-yellow-700 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
>
  <span>↩️</span>
  <span>1つ戻す / Undo</span>
</button>
```

**Missing Feature #2: Word Problem Display**

Gamified shows word problem:
```typescript
<div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30 mb-4">
  <p className="text-sm font-bold text-foreground mb-2 text-center">
    📖 問題を読んで数字を見つけよう！/ Read the problem and find the numbers!
  </p>
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <p className="text-foreground text-base leading-relaxed">
      {question.problemDescription}
    </p>
    <p className="text-gray-500 text-sm mt-2">
      {question.problemDescriptionEn}
    </p>
  </div>
</div>
```

Stable shows table:
```typescript
<div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30 mb-4">
  <p className="text-sm font-bold text-foreground mb-2 text-center">
    📊 表 / Table (参考)
  </p>
  <div className="flex justify-center gap-4 flex-wrap">
    {question.tableData.map((row, idx) => (...))}
  </div>
</div>
```

**Hint text differs**:
- Gamified: `"① 文章をよんで数字を見つける"` (Read text and find numbers)
- Stable: `"① 表を見て、何日目の値をグラフに書くか選ぶ"` (Look at table and choose)

---

### 4. src/components/ratios/RatioQuestionItem.tsx (139 lines different)
**STATUS: FEATURE MISSING**

**Missing Feature: Hint System for Ratio Questions**

Stable has simplified hint (just toggle):
```typescript
const [showHint, setShowHint] = useState(false);
// ...
<button onClick={() => setShowHint(!showHint)}>
  {showHint ? '💡 ヒントをかくす' : '💡 ヒントをみる'}
</button>
```

Gamified has contextual hints based on question type:
```typescript
// Contextual hints based on question.type
{question.type === 'finding-compared' ? (
  <>
    💡 もとにする数は <strong>{question.baseAmount}</strong>、倍は <strong>{question.ratio}</strong> だよ
    Remember: もとにする数 × 倍 = くらべる数
  </>
) : question.type === 'finding-base' ? (
  <>
    💡 くらべる数は <strong>{question.comparedAmount}</strong>、倍は <strong>{question.ratio}</strong> だよ
    Remember: くらべる数 ÷ 倍 = もとにする数
  </>
) : ...}
```

**Note**: Gamified also has SmartHintPanel (gamification), but the contextual hint logic is a legitimate educational feature.

---

## GAMIFICATION-ONLY FEATURES (Correctly removed from stable)

### Files that ONLY exist in gamified (new features, not bug fixes):
- `src/components/SolutionModal.tsx` - Step-by-step solution display
- `src/components/ClickableMathTerm.tsx` - Vocabulary click feature
- `src/components/SmartHintPanel.tsx` - Progressive hint system (uses gameState)
- `src/components/TeachMeModal.tsx` - Teaching mode (uses solutionGenerator)
- `src/lib/solutionGenerator.ts` - Solution generation logic
- `src/lib/gameState.ts` - Game state management
- `src/lib/miniGames.ts` - Mini game system
- `src/lib/storyMode.ts` - Story mode
- `src/lib/vocabulary.ts` - Vocabulary system
- `src/components/story/*` - Story mode components

### Components with only "Teach Me" button differences (gamification):
- `src/components/division/DivisionQuestionItem.tsx` (44 lines) - Only Teach Me button
- `src/components/fractions/FractionsQuestionItem.tsx` (45 lines) - Only Teach Me button
- `src/components/largeNumbers/LargeNumbersQuestionItem.tsx` (43 lines) - Only Teach Me button
- `src/components/ratios/AccuracyRateQuestionItem.tsx` (44 lines) - Only Teach Me button

### ScoreResultModal differences (421 lines):
- Mostly gamification: coins, achievements, solution modal integration
- Some display improvements but tied to gamification system

---

## FILES THAT ARE IDENTICAL (No differences)

### Lib files (already synced):
- `src/lib/geometry.ts` - C-shape generation confirmed in both (CRLF vs LF only)
- `src/lib/area.ts` - L-shape generation confirmed in both (CRLF vs LF only)
- `src/lib/calculationRules.ts` - Same in both (CRLF vs LF only)
- `src/lib/investigatingChanges.ts` - Same in both
- `src/lib/ratios.ts` - Same in both
- `src/lib/testMode.ts` - Same in both
- `src/lib/utils.ts` - Same in both

### Component files (already synced):
- `src/components/QuestionItem.tsx` - Same in both
- `src/components/area/AreaExplanationCard.tsx` - Same in both (CRLF vs LF only)
- `src/components/area/AreaQuestionItem.tsx` - Same in both (CRLF vs LF only)
- `src/components/GeometryDiagram.tsx` - Same in both (CRLF vs LF only)
- `src/components/exercises/DiagonalsDrawing.tsx` - Same in both
- `src/components/calculationRules/CalculationRulesQuestionItem.tsx` - Same in both

### Important Note on Line Endings:
Many files show different SHA256 hashes between branches, but this is due to **line ending differences** (CRLF in stable vs LF in gamified), not functional differences. The actual code content is identical in these files.

---

## SUMMARY: WHAT NEEDS TO BE MERGED TO STABLE

| Priority | File | Changes Needed |
|----------|------|----------------|
| **CRITICAL** | `src/pages/Index.tsx` | 1. Add `evaluateExpression()` and `isEquationValid()` functions for equation validation<br>2. Add `cutoutY` and `shapeType` detection for C-shape composite shapes<br>3. Add `handleLineGraphUndoPoint()` handler function and pass to LineGraphQuestionItem |
| **HIGH** | `src/lib/lineGraphs.ts` | Add `problemDescription` fields to interface and question data |
| **HIGH** | `src/components/lineGraphs/LineGraphQuestionItem.tsx` | Add undo button UI, update hint text, conditional display for word problems |
| **MEDIUM** | `src/components/ratios/RatioQuestionItem.tsx` | Add contextual hints based on question type |

---

## FINAL FINDINGS

**Total confirmed bug fixes missing in stable: 7**

### Critical (Break functionality):
1. **Equation validation functions** (`evaluateExpression`, `isEquationValid`) (Index.tsx) - affects "Combining into One Equation" topic
2. **Inferior equation validation logic** (Index.tsx) - uses string comparison instead of mathematical validation
3. **C-shape detection** (Index.tsx) - affects "Area of Composite Shapes" topic (**THE BUG YOU NOTICED**)
4. **Line graph undo handler** (`handleLineGraphUndoPoint`) (Index.tsx) - affects "Drawing a Graph from a Table" topic

### High (Missing features):
5. **Word problems for drawing graphs** (lineGraphs.ts) - affects "Drawing a Graph from a Table" topic
6. **Undo button UI** (LineGraphQuestionItem.tsx) - affects "Drawing a Graph from a Table" topic
7. **Contextual hints for ratios** (RatioQuestionItem.tsx) - affects ratio questions

### Files confirmed identical (no changes needed):
- `src/lib/geometry.ts` - C-shape generation present in both
- `src/lib/area.ts` - L-shape generation present in both
- `src/components/area/AreaQuestionItem.tsx` - Component logic identical
- `src/components/area/AreaExplanationCard.tsx` - Component logic identical
- `src/components/GeometryDiagram.tsx` - C-shape rendering present in both

All other differences are either:
- Line ending differences (CRLF vs LF) - not functional
- Gamification-only features (Teach Me buttons, coins, achievements, etc.) - correctly removed from stable

## LESSONS LEARNED

1. **Don't dismiss large diffs as "just gamification"** - Always check the actual code changes
2. **Trace data flow** - Check how props flow from generators → Index.tsx → components
3. **Search for unique identifiers** - Look for specific props like `cutoutY` that indicate features
4. **Check both directions** - Files can be identical in content but differ in how they're used
5. **Handler functions matter** - Missing handler functions in Index.tsx break component functionality

---

## VERIFICATION LOG

**Pass 1 (Initial)**: Found equation validation, lineGraphs word problems, LineGraphQuestionItem UI changes, ratio hints
**Pass 2 (User request)**: Found C-shape detection bug (Index.tsx prop passing)
**Pass 3 (User request)**: Found line graph undo handler function (Index.tsx)
**Pass 4 (Final comprehensive)**: Confirmed all findings, verified no additional bugs

**Files checked in all passes:**
- All 36 files that differ between branches
- All src/lib/ files (area.ts, geometry.ts, calculationRules.ts, lineGraphs.ts, ratios.ts, testMode.ts, investigatingChanges.ts, utils.ts)
- All src/components/ files that differ
- src/pages/Index.tsx (1,767 line diff analyzed completely)

**No additional bugs found in final pass.**

---

## NOTES

All critical bugs have been identified through 4 comprehensive file comparison passes.

**If you find another bug after this, it represents a failure of my checking process.**
