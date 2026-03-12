# けいくんの算数アプリ - Design Format Guidelines

This document establishes design standards for creating new tabs and topics to ensure visual consistency across the application.

## Table of Contents

1. [Tab Structure](#tab-structure)
2. [Topic Data Structure](#topic-data-structure)
3. [Explanation Card Format](#explanation-card-format)
4. [Question Item Structure](#question-item-structure)
5. [Grading & Feedback](#grading--feedback)
6. [Bilingual Text Conventions](#bilingual-text-conventions)
7. [Visual Design Standards](#visual-design-standards)

---

## Tab Structure

### Tab Definition

Each tab must include:

| Element | Requirement | Example |
|---------|-------------|---------|
| **Icon** | Lucide icon or emoji | `Shapes`, `Percent`, `🔋` |
| **Label (JP)** | Short Japanese name | `図形`, `割合`, `正答率` |
| **Label (EN)** | Short English name | `Geometry`, `Ratios`, `Accuracy` |
| **State Management** | Independent state that resets on tab switch | See example below |

### Tab State Pattern

```typescript
// Each tab has independent state
const [tabQuestions, setTabQuestions] = useState<QuestionType[]>([]);
const [tabAnswers, setTabAnswers] = useState<string[]>([]);
const [tabGraded, setTabGraded] = useState(false);
const [tabScore, setTabScore] = useState(0);

// Reset on tab change
const handleTabChange = (value: string) => {
  setActiveTab(value as AppTab);
  // Reset ALL tab states
  setTabQuestions([]);
  setTabAnswers([]);
  setTabGraded(false);
  setTabScore(0);
};
```

---

## Topic Data Structure

### Required Fields

Every topic must implement this interface:

```typescript
interface TopicInfo {
  id: string;           // Unique identifier
  icon: string;         // Emoji or icon reference
  label: string;        // Japanese name
  labelEn: string;      // English name
  goal: string;         // めあて - Learning objective
  goalEn: string;       // Goal (English)
  method: string;       // やりかた - How to solve
  methodEn: string;     // Method (English)
  realLife: string;     // 生活の中でのつかいみち - Real-life example
  realLifeEn: string;   // Real-life (English)
  benefit: string;      // できるようになると... - Benefit for kids
  benefitEn: string;    // Benefit (English)
}
```

### Writing Guidelines

**Goal (めあて):**
- Start with action verb: "求めよう", "計算しよう", "理解しよう"
- Focus on what the child will learn
- Keep it simple and concrete

**Method (やりかた):**
- Show the formula/equation format
- Use "=" to show the result
- Example: `正解の数 ÷ 全部の数 = 割合（小数）`

**Real-Life (生活の中でのつかいみち):**
- Use scenarios kids can relate to
- Include games, food, sports, school
- Make it fun and practical

**Benefits (できるようになると...):**
- Explain what skill they'll gain
- Use positive, encouraging language
- Connect to real-world capabilities

### Critical: Make "How it Works" Actually Helpful

**❌ BAD - Generic formula only:**
```
method: 'くらべる数 ÷ もとにする数 = 倍'
```
This tells kids WHAT to calculate but not HOW to do it.

**✅ GOOD - Step-by-step with example:**
```
method: '① もとにする数（ベース）を探す ② くらべる数を探す ③ くらべる数 ÷ もとにする数 で計算！ 例：12L ÷ 8L = 1.5倍'
```

**Requirements for "How it Works" (やりかた):**
- Numbered steps (①, ②, ③) showing the exact process
- Concrete example with actual numbers
- Tell kids WHERE to find each number in the problem
- Explain the logic (e.g., "足りなくなると困るから切り上げ")

**Requirements for Question Hints:**
- Show the specific numbers for THIS problem
- Explain which digit to look at (e.g., "千の位の右隣の数字")
- Show intermediate calculation steps
- Never give generic advice like "Try dividing"

**Example - Large Numbers Reading:**
```typescript
// Show the actual number with slashes
hint: `💡 右から4けたごとに区切ってみよう：
${numericValue.toLocaleString()} → 4 / 5000 / 0000
右から順に：一の位 → 万の位 → 億の位`
```

**Example - Rounding:**
```typescript
// Tell exactly which digit to check
hint: `💡 ${targetPlace}を探す：
${originalNumber} の「${targetPlace}」の右隣の数字をチェック！
0-4なら切り捨て、5-9なら切り上げ`
```

---

## Explanation Card Format

### Layout Structure

All explanation cards MUST use this 2x2 grid layout:

```
┌─────────────────────────────────────┐
│  [Icon]  Title                       │
│          Title (English)             │
├──────────────────┬──────────────────┤
│ ⭐ めあて        │ 📖 やりかた       │
│    Goal          │    How it Works  │
│                  │                  │
│ [Japanese text]  │ [Formula/text]   │
│ [English text]   │ [English text]   │
├──────────────────┼──────────────────┤
│ 🚀 生活の中で    │ 💡 できるように   │
│    Real-Life Use │    Benefits      │
│                  │                  │
│ [Japanese text]  │ [Japanese text]  │
│ [English text]   │ [English text]   │
└──────────────────┴──────────────────┘
```

### Section Styling

| Section | Icon | Background Color | Border Color |
|---------|------|------------------|--------------|
| めあて / Goal | `Star` | `bg-kid-yellow/20` | `border-kid-yellow/40` |
| やりかた / How it Works | `BookOpen` | `bg-primary/10` | `border-primary/30` |
| 生活の中で / Real-Life | `Rocket` | `bg-kid-green/20` | `border-kid-green/40` |
| できるように / Benefits | `Lightbulb` | `bg-kid-purple/20` | `border-kid-purple/40` |

### Card Component Template

```typescript
const sections = [
  {
    icon: <Star className="w-5 h-5" />,
    title: 'めあて',
    titleEn: 'Goal',
    content: info.goal,
    contentEn: info.goalEn,
    color: 'bg-kid-yellow/20 border-kid-yellow/40'
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'やりかた',
    titleEn: 'How it Works',
    content: info.method,
    contentEn: info.methodEn,
    color: 'bg-primary/10 border-primary/30'
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: '生活の中でのつかいみち',
    titleEn: 'Real-Life Use',
    content: info.realLife,
    contentEn: info.realLifeEn,
    color: 'bg-kid-green/20 border-kid-green/40'
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: 'できるようになると...',
    titleEn: 'Benefits',
    content: info.benefit,
    contentEn: info.benefitEn,
    color: 'bg-kid-purple/20 border-kid-purple/40'
  },
];
```

---

## Question Item Structure

### Question Card Layout

```
┌─────────────────────────────────────┐
│ [1]  Question text (Japanese)        │
│     Question text (English)          │
│                                      │
│     [Visual Aid - if applicable]     │
│                                      │
│     💡 Hint toggle (optional)        │
│     Hint content                     │
│                                      │
│     答え： [______] unit / unit      │
│     Answer:                          │
│            [〇 or ×  + formula]      │
└─────────────────────────────────────┘
```

### Required Elements

1. **Question Number**: Circular badge with number
2. **Bilingual Text**: Japanese primary, English secondary (gray-500)
3. **Visual Aid**: SVG diagram, battery bar, etc. (if applicable)
4. **Hint System**: Toggle to show hints without giving away answer
5. **Answer Input**: Number input with appropriate step value
6. **Unit Label**: Show what unit to enter (%, times, cm, etc.)

### Input Types by Topic

| Topic Type | Input Type | Step | Suffix |
|------------|-----------|------|--------|
| Decimal ratio | number | 0.01 | `倍 / times` |
| Percentage | number | 1 | `% / percent` |
| Whole number | number | 1 | context-based |

---

## Grading & Feedback

### Visual Feedback

| Result | Symbol | Color | Size |
|--------|--------|-------|------|
| Correct | 〇 | `text-green-500` | `text-4xl` |
| Incorrect | × | `text-red-500` | `text-3xl` |

### Formula Display

For incorrect answers, show the formula in **red text**:

```typescript
<span className="text-sm text-red-500 font-bold">
  {question.formula}
</span>
```

Formula format:
- Show the calculation steps
- Include the final answer
- Example: `正解: 7 ÷ 10 = 0.7`

### Border Colors on Grade

```typescript
className={`
  border-2 transition-all
  ${graded
    ? isCorrect
      ? 'border-correct'    // Green border
      : 'border-incorrect'  // Red border
    : 'border-border hover:border-primary/30'
  }
`}
```

---

## Bilingual Text Conventions

### Text Hierarchy

```
Primary (Japanese)    → font-medium, text-foreground
Secondary (English)   → text-sm, text-gray-500 or text-muted-foreground
```

### Pattern Examples

**Labels:**
```typescript
<div className="flex flex-col">
  <span className="text-foreground font-medium">答え：</span>
  <span className="text-xs text-gray-500">Answer:</span>
</div>
```

**Hints:**
```typescript
<p className="font-medium text-foreground">
  💡 正解の数は {value} だよ
</p>
<p className="text-gray-500">
  The correct count is {value}.
</p>
```

### Color Usage

| Element | Color Class |
|---------|-------------|
| Japanese text | `text-foreground` |
| English text | `text-gray-500` or `text-muted-foreground` |
| Important values | `text-primary` or `font-bold` |
| Success/Correct | `text-green-500` |
| Error/Incorrect | `text-red-500` |

---

## Visual Design Standards

### Color Palette

| Purpose | Variable | Hex (approx) |
|---------|----------|--------------|
| Primary | `hsl(var(--primary))` | Blue |
| Accent | `hsl(var(--accent))` | Purple |
| Correct | `text-green-500` | #22c55e |
| Incorrect | `text-red-500` | #ef4444 |
| Kid Yellow | `bg-kid-yellow` | Yellow accents |
| Kid Green | `bg-kid-green` | Green accents |
| Kid Purple | `bg-kid-purple` | Purple accents |

### Spacing Standards

| Element | Padding/Margin |
|---------|---------------|
| Card padding | `p-5` or `p-6` |
| Card margin-bottom | `mb-6` or `mb-8` |
| Section gap | `gap-4` |
| Inner spacing | `space-y-4` |

### Border Radius

| Element | Radius |
|---------|--------|
| Cards | `rounded-2xl` |
| Buttons | `rounded-xl` |
| Inputs | `rounded-xl` |
| Badges/Numbers | `rounded-full` |
| Inner sections | `rounded-lg` or `rounded-xl` |

### Shadows

| Element | Shadow Class |
|---------|-------------|
| Cards | `shadow-kid` |
| Buttons | `shadow-kid` or `shadow-kid-lg` |
| Elevated items | `shadow-kid-lg` |

---

## File Organization

### Component Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── ratios/                # Ratios tab components
│   │   ├── RatioExplanationCard.tsx
│   │   ├── RatioQuestionItem.tsx
│   │   ├── AccuracyRateExplanationCard.tsx
│   │   ├── AccuracyRateQuestionItem.tsx
│   │   ├── BatteryBar.tsx
│   │   └── index.ts
│   ├── ExplanationCard.tsx    # Geometry explanation
│   ├── QuestionItem.tsx       # Geometry questions
│   └── ...
├── lib/
│   ├── geometry.ts            # Geometry topics & questions
│   ├── ratios.ts              # Ratios topics & questions
│   └── ...
└── pages/
    └── Index.tsx              # Main page with all tabs
```

### Export Pattern

All components must be exported from `index.ts`:

```typescript
// src/components/ratios/index.ts
export { default as RatioExplanationCard } from './RatioExplanationCard';
export { default as RatioQuestionItem } from './RatioQuestionItem';
export { default as AccuracyRateExplanationCard } from './AccuracyRateExplanationCard';
export { default as AccuracyRateQuestionItem } from './AccuracyRateQuestionItem';
export { default as BatteryBar } from './BatteryBar';
```

---

## Adding a New Tab - Checklist

- [ ] Define `TopicInfo` interface with all required fields
- [ ] Create topic data object with bilingual text
- [ ] Create `XExplanationCard.tsx` with 2x2 grid layout
- [ ] Create `XQuestionItem.tsx` with grading logic
- [ ] Add exports to `index.ts`
- [ ] Add tab state to `Index.tsx`
- [ ] Add tab button to `TabsList`
- [ ] Add `TabsContent` with topic selection
- [ ] Implement question generation function
- [ ] **Verify "How it Works" explains step-by-step HOW to solve**
- [ ] **Verify hints are specific to each problem (not generic)**
- [ ] Test bilingual text displays correctly
- [ ] Verify grading shows green 〇 / red ×
- [ ] Verify formula shows for incorrect answers

---

## Visual Example Component Requirement

**ALL topics MUST include a visual example component** that demonstrates the concept with concrete examples.

### Visual Example Requirements

1. **Component Location**: Create `{Topic}Visualizer.tsx` in `src/components/{category}/`
2. **Component Name**: Use PascalCase, e.g., `FindingRatioVisualizer.tsx`, `AnglesVisualizer.tsx`
3. **Integration**: Import and conditionally render in the explanation card based on topic ID

### Visual Component Structure

```typescript
// Example: FindingRatioVisualizer.tsx
const FindingRatioVisualizer = () => {
  return (
    <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
      {/* Bilingual title */}
      <p className="text-sm font-bold text-foreground mb-3 text-center">
        📏 トピック名 / Topic Name
      </p>

      {/* Visual demonstration with SVG/CSS */}
      <div className="bg-background rounded-lg p-3 mb-4 border border-border">
        <p className="text-xs text-muted-foreground mb-2 text-center">
          説明テキスト / Explanation Text
        </p>
        {/* Visual content (SVG, bars, shapes, etc.) */}
      </div>

      {/* Formula section */}
      <div className="bg-kid-yellow/20 rounded-lg p-3 border border-kid-yellow">
        <p className="text-xs font-bold text-kid-yellow mb-2 text-center">
          📐 公式 / Formula
        </p>
        {/* Formula content */}
      </div>
    </div>
  );
};
```

## Bilingual Text Requirement

**ALL text in visual components MUST be fully bilingual** (Japanese and English).

### Required Bilingual Elements

1. **Section Headers** - Format: `日本語 / English`
   - Example: `📐 公式 / Formula`
   - Example: `📖 例 / Example`

2. **Labels and Descriptions** - Format: `日本語 / English`
   - Example: `一直線の角 / Straight Line Angle`
   - Example: `1組の辺が平行 / 1 pair of parallel sides`

3. **Formulas with translation** - Show both languages
   - Example: `たて × よこ = 面積 / length × width = area`
   - Example: `四角形 / Quadrilateral: 4 × (4 - 3) ÷ 2 = 2本 / 2`

4. **Key points and rules** - Include English translation
   - Example: `対頂角は等しい / Vertical angles are equal`
   - Example: `2つの線が90°で交わる / Two lines meet at 90°`

### Bilingual Text Patterns

**Pattern 1 - Inline (same line):**
```tsx
<p>日本語テキスト / English Text</p>
```

**Pattern 2 - Stacked (separate lines):**
```tsx
<p className="font-bold">日本語</p>
<p className="text-muted-foreground">English</p>
```

**Pattern 3 - Labels with context:**
```tsx
<p>8 cm (よこ / width)</p>
<p>5 cm (たて / height)</p>
```

**Pattern 4 - Formulas with units:**
```tsx
<p>• 長方形 / Rectangle: たて × よこ / length × width</p>
<p>• 単位 / Unit: cm² (平方センチメートル / sq cm)</p>
```

### Explanation Card Integration

Add visual component to explanation card with conditional rendering:

```typescript
// In ExplanationCard.tsx
{info.id === 'topic-id' && (
  <div className="mt-6 pt-6 border-t border-border">
    <p className="text-center font-bold text-foreground mb-4">
      📖 トピックの例 / Topic examples
    </p>
    <TopicVisualizer />
  </div>
)}
```

## Adding a New Topic - Checklist

- [ ] Add topic to topic keys array
- [ ] Add topic data to `TOPICS` record
- [ ] Write めあて (goal) with action verb
- [ ] Write やりかた (method) with **numbered steps** and **concrete example**
- [ ] Write 生活の中でのつかいみち (real-life) with kid-friendly example
- [ ] Write できるようになると... (benefit) explaining skill gained
- [ ] **Create visual example component (`{Topic}Visualizer.tsx`)**
- [ ] **Ensure ALL text in visual component is bilingual (Japanese/English)**
- [ ] **Add visual component to explanation card with conditional rendering**
- [ ] **Export visual component from `index.ts`**
- [ ] Create question generation function with 5+ problem sets
- [ ] **Verify hints show specific steps for each problem (not generic advice)**
- [ ] Ensure clean numbers (no repeating decimals for percentages)
- [ ] Test question generation produces variety
- [ ] Verify explanation card displays correctly

---

## Example: Minimal New Tab Implementation

See existing implementations in:
- `src/lib/ratios.ts` - Topic data structures
- `src/components/ratios/AccuracyRateExplanationCard.tsx` - Card template
- `src/components/ratios/AccuracyRateQuestionItem.tsx` - Question template
- `src/pages/Index.tsx` - Tab integration
