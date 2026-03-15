export type LineGraphTopic = 'reading-graph' | 'change-slope' | 'wavy-line' | 'comparing-two-graphs' | 'drawing-graph';

export interface LineGraphTopicInfo {
  id: LineGraphTopic;
  icon: string;
  label: string;
  labelEn: string;
  goal: string;
  goalEn: string;
  method: string;
  methodEn: string;
  realLife: string;
  realLifeEn: string;
  benefit: string;
  benefitEn: string;
}

export interface LineGraphDataPoint {
  x: string; // Time/Month label
  y: number; // Value
}

export interface LineGraphQuestion {
  id: string;
  topic: LineGraphTopic;
  text: string;
  textEn: string;
  answer: number | string;
  // Graph data
  dataPoints: LineGraphDataPoint[];
  xAxisLabel: string;
  xAxisLabelEn: string;
  yAxisLabel: string;
  yAxisLabelEn: string;
  yAxisMin: number;
  yAxisMax: number;
  tickInterval: number;
  hasWavyLine: boolean;
  wavyLineBase?: number; // The value where wavy line starts
  // For slope questions
  slopeStart?: string;
  slopeEnd?: string;
  // For dropdown questions
  options?: string[];
  // For comparing two graphs
  secondDataPoints?: LineGraphDataPoint[];
  line1Label?: string;
  line1LabelEn?: string;
  line2Label?: string;
  line2LabelEn?: string;
  compareQuestion?: 'higher' | 'lower' | 'difference';
  // For drawing graph
  tableData?: Array<{ x: string; y: number }>;
  correctPoints?: Array<{ x: number; y: number }>;
  // Word problem description for students to extract data
  problemDescription?: string;
  problemDescriptionEn?: string;
  formula: string;
  formulaEn: string;
  explanation: string;
  explanationEn: string;
}

export const LINE_GRAPH_TOPICS: Record<LineGraphTopic, LineGraphTopicInfo> = {
  'reading-graph': {
    id: 'reading-graph',
    icon: '📊',
    label: 'グラフの読み取り',
    labelEn: 'Reading Line Graphs',
    goal: '時間がたつとどう変わるか、グラフから正確に読みとろう！',
    goalEn: 'Read how things change over time from the graph!',
    method: '① 横じく（時間）と縦じく（数）を確認する ② 1めもりがいくつ分か調べる ③ 線の上の点を見て値を読む。例：12時の点に対応する縦じくの値を読む',
    methodEn: '① Check horizontal (time) and vertical (amount) axes ② Find what one tick mark represents ③ Read values from points. Example: Read the vertical value at 12:00',
    realLife: '好きなゲームのプレイヤーの数が、毎月どうやって増えているか調べるとき！',
    realLifeEn: 'Checking if your favorite game\'s player count is going up every month!',
    benefit: 'たくさんの数字の表を読まなくても、一目でパッと変化がわかるようになる！',
    benefitEn: 'You can instantly understand large amounts of data without reading boring tables!',
  },
  'change-slope': {
    id: 'change-slope',
    icon: '📈',
    label: '変化のようす',
    labelEn: 'How Things Change (Slope)',
    goal: '折れ線の傾き（かたむき）を見て、変化のスピードをつかもう！',
    goalEn: 'Look at the slope of the line to see how fast things are changing!',
    method: '急な右上がり ＝ 大きく増えた。平ら ＝ 変わらない。右下がり ＝ 減った。傾きが急なほど、変化が大きい！',
    methodEn: 'Steep up = increased a lot. Flat = no change. Going down = decreased. Steeper slope = bigger change!',
    realLife: 'レースゲームで、マシンのスピードが急に上がった「ブーストの瞬間」を探すとき！',
    realLifeEn: 'Looking at a character\'s speed boost graph in a racing game!',
    benefit: 'グラフの形を見るだけで、「いつが一番変化したか」がすぐわかる！',
    benefitEn: 'Just by looking at the graph shape, you can instantly tell when the biggest changes happened!',
  },
  'wavy-line': {
    id: 'wavy-line',
    icon: '〰️',
    label: '波線（省略）のあるグラフ',
    labelEn: 'Graphs with Wavy Lines',
    goal: '波線（〜）を使って、いらない部分をはぶいたグラフを読もう！',
    goalEn: 'Read graphs that skip the empty zero-space using a wavy line!',
    method: '① 波線（〰️）がでてきたら「ここの数はとびばしょ」とおぼえよう。② 波線の下の数からグラフがはじまるよ。③ 例：体温グラフで36℃から37℃の小さな変化を、波線なしだと36〜40℃まで書くと変化が見えにくい。波線を使うと37〜38℃だけを大きく見せられる！',
    methodEn: '① When you see a wavy line (〰️), remember it means "we skipped numbers here." ② The graph starts from the number below the wavy line. ③ Example: For body temperature, a small change from 36°C to 37°C would be hard to see if we drew 36-40°C. With a wavy line, we can show just 37-38°C much bigger!',
    realLife: '自分の身長の記録！毎年0cmから書かずに、伸びた分だけを大きく書くよね！',
    realLifeEn: 'Tracking your own height! You don\'t start from 0 cm every year, you only track the part where you grew!',
    benefit: '小さな変化を大きく見せたいときに、グラフを読むのが上手になる！',
    benefitEn: 'You become skilled at reading graphs when you want to show small changes more clearly!',
  },
  'comparing-two-graphs': {
    id: 'comparing-two-graphs',
    icon: '📊',
    label: '2つの折れ線グラフ',
    labelEn: 'Comparing Two Line Graphs',
    goal: '1つのグラフにある2つの折れ線を比べて、ちがいを見つけよう！',
    goalEn: 'Look at two lines on the same graph to compare data!',
    method: '① 2本の線を見比べる（例：東京と札幌の気温）② どちらが高い・低いか確認 ③ 差を計算する。例：東京25℃、札幌18℃ → 差は7℃',
    methodEn: '① Compare the two lines (e.g., Tokyo vs Sapporo temp) ② Check which is higher/lower ③ Calculate the difference. Example: Tokyo 25°C, Sapporo 18°C → difference is 7°C',
    realLife: 'お友達との身長の伸びを比べたり、ゲームのスコアを比べたりするとき！',
    realLifeEn: 'Comparing height growth with friends or comparing game scores!',
    benefit: '2つのものを比べて、どちらがどれだけちがうかがわかるようになる！',
    benefitEn: 'You can compare two things and understand how much they differ!',
  },
  'drawing-graph': {
    id: 'drawing-graph',
    icon: '✏️',
    label: '表からグラフをかく',
    labelEn: 'Drawing a Graph from a Table',
    goal: '数字の表を見て、自分で折れ線グラフを完成させよう！',
    goalEn: 'Turn a data table into a real graph!',
    method: '① 表の数字を確認する ② 縦と横の目盛りを見る ③ 表の値に合う交点をクリックしてプロット ④ 線が自動でつながる！',
    methodEn: '① Check the table numbers ② Look at vertical and horizontal scales ③ Click the intersection that matches the table values ④ Line connects automatically!',
    realLife: '体育のテスト結果や、花の成長記録を自分でグラフにするとき！',
    realLifeEn: 'Making your own graph of sports test results or flower growth records!',
    benefit: '表の数字を自分でグラフにできるようになる！',
    benefitEn: 'You can turn table data into graphs by yourself!',
  },
};

// Generate reading graph questions
function generateReadingGraphQuestions(): LineGraphQuestion[] {
  const questions: LineGraphQuestion[] = [];

  for (let i = 0; i < 5; i++) {
    // Generate temperature data from 9:00 to 15:00
    const baseTemp = 20 + Math.floor(Math.random() * 5); // 20-24
    const dataPoints: LineGraphDataPoint[] = [];

    for (let hour = 9; hour <= 15; hour++) {
      const variation = Math.floor(Math.random() * 5) - 2; // -2 to +2
      dataPoints.push({
        x: `${hour}:00`,
        y: baseTemp + (hour - 9) * 2 + variation,
      });
    }

    const values = dataPoints.map(d => d.y);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    // Use appropriate margins based on data range
    const yAxisMin = Math.min(0, minValue - 2);
    const yAxisMax = maxValue + 2;
    // Calculate tick interval based on range
    const range = yAxisMax - yAxisMin;
    const tickInterval = range <= 10 ? 1 : range <= 20 ? 2 : Math.ceil(range / 10);

    // Alternate between tick mark question and value question
    if (i % 2 === 0) {
      // Question: What does one tick mark represent?
      questions.push({
        id: `reading-${i}`,
        topic: 'reading-graph',
        text: '縦じくの1めもりは何度を表していますか？',
        textEn: 'What does one small tick mark on the vertical axis represent?',
        answer: tickInterval,
        dataPoints,
        xAxisLabel: '時間',
        xAxisLabelEn: 'Time',
        yAxisLabel: '気温 (℃)',
        yAxisLabelEn: 'Temperature (°C)',
        yAxisMin,
        yAxisMax,
        tickInterval,
        hasWavyLine: false,
        formula: `正解: ${tickInterval}度（縦じくの目盛りを見ると、1つずつ${tickInterval}℃ずつ増えている）`,
        formulaEn: `Answer: ${tickInterval} degree (Each tick mark increases by ${tickInterval}°C)`,
        explanation: `縦じくの1めもりは${tickInterval}度を表しています`,
        explanationEn: `One tick mark represents ${tickInterval} degree`,
      });
    } else {
      // Question: What was the temperature at a specific time?
      const targetHour = 10 + Math.floor(Math.random() * 4); // 10:00 to 13:00
      const targetData = dataPoints.find(d => d.x === `${targetHour}:00`)!;

      questions.push({
        id: `reading-${i}`,
        topic: 'reading-graph',
        text: `午後${targetHour - 12}時の気温は何度ですか？`,
        textEn: `What was the temperature at ${targetHour}:00?`,
        answer: targetData.y,
        dataPoints,
        xAxisLabel: '時間',
        xAxisLabelEn: 'Time',
        yAxisLabel: '気温 (℃)',
        yAxisLabelEn: 'Temperature (°C)',
        yAxisMin,
        yAxisMax,
        tickInterval,
        hasWavyLine: false,
        formula: `正解: ${targetData.y}℃（${targetHour}:00の点に対応する縦じくの値を読む）`,
        formulaEn: `Answer: ${targetData.y}°C (Read the vertical value at ${targetHour}:00)`,
        explanation: `${targetHour}:00の気温は${targetData.y}度です`,
        explanationEn: `The temperature at ${targetHour}:00 was ${targetData.y}°C`,
      });
    }
  }

  return questions;
}

// Generate random slope/change questions with dynamically calculated answers from actual data
// Each call generates different random data
function generateChangeSlopeQuestions(): LineGraphQuestion[] {
  const questions: LineGraphQuestion[] = [];

  // Generate 5 random scenarios with different patterns
  for (let i = 0; i < 5; i++) {
    // Random base temperature (15-30)
    const baseTemp = 15 + Math.floor(Math.random() * 16);
    // Random pattern type
    const patternType = i % 5; // Cycle through different patterns

    let dataPoints: LineGraphDataPoint[] = [];

    switch (patternType) {
      case 0: // Steep increase, flat, then decrease
        dataPoints = [
          { x: '9:00', y: baseTemp },
          { x: '10:00', y: baseTemp + 2 + Math.floor(Math.random() * 2) },
          { x: '11:00', y: baseTemp + 6 + Math.floor(Math.random() * 3) }, // Steep
          { x: '12:00', y: baseTemp + 6 + Math.floor(Math.random() * 3) }, // Flat
          { x: '13:00', y: baseTemp + 6 + Math.floor(Math.random() * 3) }, // Flat
          { x: '14:00', y: baseTemp + 4 + Math.floor(Math.random() * 2) }, // Decrease
          { x: '15:00', y: baseTemp + 2 + Math.floor(Math.random() * 2) },
        ];
        break;
      case 1: // Gradual then steep
        dataPoints = [
          { x: '9:00', y: baseTemp },
          { x: '10:00', y: baseTemp + 1 },
          { x: '11:00', y: baseTemp + 2 },
          { x: '12:00', y: baseTemp + 4 + Math.floor(Math.random() * 3) }, // Steep
          { x: '13:00', y: baseTemp + 8 + Math.floor(Math.random() * 3) }, // Steepest
          { x: '14:00', y: baseTemp + 8 + Math.floor(Math.random() * 3) }, // Flat
          { x: '15:00', y: baseTemp + 7 + Math.floor(Math.random() * 2) },
        ];
        break;
      case 2: // Flat then steep decrease
        dataPoints = [
          { x: '9:00', y: baseTemp + 10 },
          { x: '10:00', y: baseTemp + 10 }, // Flat
          { x: '11:00', y: baseTemp + 10 }, // Flat
          { x: '12:00', y: baseTemp + 8 + Math.floor(Math.random() * 2) },
          { x: '13:00', y: baseTemp + 5 + Math.floor(Math.random() * 2) }, // Steep decrease
          { x: '14:00', y: baseTemp + 3 + Math.floor(Math.random() * 2) },
          { x: '15:00', y: baseTemp + 2 + Math.floor(Math.random() * 2) },
        ];
        break;
      case 3: // Steep increase throughout
        dataPoints = [
          { x: '9:00', y: baseTemp },
          { x: '10:00', y: baseTemp + 3 + Math.floor(Math.random() * 2) },
          { x: '11:00', y: baseTemp + 7 + Math.floor(Math.random() * 3) }, // Steepest
          { x: '12:00', y: baseTemp + 10 + Math.floor(Math.random() * 3) },
          { x: '13:00', y: baseTemp + 12 + Math.floor(Math.random() * 2) },
          { x: '14:00', y: baseTemp + 13 + Math.floor(Math.random() * 2) },
          { x: '15:00', y: baseTemp + 13 + Math.floor(Math.random() * 2) }, // Flat
        ];
        break;
      case 4: // Decrease then flat
        dataPoints = [
          { x: '9:00', y: baseTemp + 15 },
          { x: '10:00', y: baseTemp + 13 + Math.floor(Math.random() * 2) },
          { x: '11:00', y: baseTemp + 11 + Math.floor(Math.random() * 2) }, // Steep decrease
          { x: '12:00', y: baseTemp + 9 + Math.floor(Math.random() * 2) },
          { x: '13:00', y: baseTemp + 9 + Math.floor(Math.random() * 2) }, // Flat
          { x: '14:00', y: baseTemp + 9 + Math.floor(Math.random() * 2) }, // Flat
          { x: '15:00', y: baseTemp + 8 + Math.floor(Math.random() * 2) },
        ];
        break;
    }

    const values = dataPoints.map(d => d.y);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    // Use appropriate margins based on data range
    const yAxisMin = Math.min(0, minValue - 2);
    const yAxisMax = maxValue + 2;
    // Calculate tick interval based on range
    const range = yAxisMax - yAxisMin;
    const tickInterval = range <= 10 ? 1 : range <= 20 ? 2 : Math.ceil(range / 10);

    // Calculate slopes from actual data
    interface Segment {
      start: string;
      end: string;
      change: number;
      isRise: boolean;
      isFall: boolean;
      isFlat: boolean;
    }

    const segments: Segment[] = [];
    for (let j = 0; j < dataPoints.length - 1; j++) {
      const current = dataPoints[j];
      const next = dataPoints[j + 1];
      const change = next.y - current.y;
      segments.push({
        start: current.x,
        end: next.x,
        change,
        isRise: change > 0,
        isFall: change < 0,
        isFlat: change === 0,
      });
    }

    // Find consecutive flat segments for "no change" question
    let longestFlatStart = '';
    let longestFlatEnd = '';
    let currentFlatStart = '';
    let currentFlatLength = 0;
    let maxFlatLength = 0;

    for (const segment of segments) {
      if (segment.isFlat) {
        if (currentFlatLength === 0) {
          currentFlatStart = segment.start;
        }
        currentFlatLength++;
        if (currentFlatLength > maxFlatLength) {
          maxFlatLength = currentFlatLength;
          longestFlatStart = currentFlatStart;
          longestFlatEnd = segment.end;
        }
      } else {
        currentFlatLength = 0;
      }
    }

    // Find steepest rise and fall from actual data
    const rises = segments.filter(s => s.isRise);
    const falls = segments.filter(s => s.isFall);

    const steepestRise = rises.length > 0
      ? rises.reduce((max, s) => s.change > max.change ? s : max, rises[0])
      : null;

    const steepestFall = falls.length > 0
      ? falls.reduce((max, s) => Math.abs(s.change) > Math.abs(max.change) ? s : max, falls[0])
      : null;

    // Generate question based on what's actually in the data
    // Alternate question types but only ask valid questions
    const questionType = i % 3; // 0 = steepest rise, 1 = no change, 2 = steepest fall (if exists) or rise

    if (questionType === 0 && steepestRise) {
      // Question about steepest rise
      questions.push({
        id: `slope-${i}`,
        topic: 'change-slope',
        text: '気温が一番大きく上がったのは、何時から何時の間ですか？',
        textEn: 'Between which times did the temperature rise the most?',
        answer: `${steepestRise.start}から${steepestRise.end}`,
        dataPoints: dataPoints,
        xAxisLabel: '時間',
        xAxisLabelEn: 'Time',
        yAxisLabel: '気温 (℃)',
        yAxisLabelEn: 'Temperature (°C)',
        yAxisMin,
        yAxisMax,
        tickInterval: 1,
        hasWavyLine: false,
        slopeStart: steepestRise.start,
        slopeEnd: steepestRise.end,
        options: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        formula: `正解: ${steepestRise.start}から${steepestRise.end}（線が一番急な右上がりになっているところを探すよ。${steepestRise.change}℃上がった！）`,
        formulaEn: `Answer: ${steepestRise.start} to ${steepestRise.end} (Look for the steepest upward line. Rose by ${steepestRise.change}°C!)`,
        explanation: `気温が一番大きく上がったのは${steepestRise.start}から${steepestRise.end}の間です（${steepestRise.change}℃上がりました）`,
        explanationEn: `The temperature rose the most between ${steepestRise.start} and ${steepestRise.end} (rose by ${steepestRise.change}°C)`,
      });
    } else if (questionType === 1 && longestFlatStart) {
      // Question about no change
      questions.push({
        id: `slope-${i}`,
        topic: 'change-slope',
        text: '気温が変わらなかったのは、何時から何時の間ですか？',
        textEn: 'Between which times did the temperature not change?',
        answer: `${longestFlatStart}から${longestFlatEnd}`,
        dataPoints: dataPoints,
        xAxisLabel: '時間',
        xAxisLabelEn: 'Time',
        yAxisLabel: '気温 (℃)',
        yAxisLabelEn: 'Temperature (°C)',
        yAxisMin,
        yAxisMax,
        tickInterval: 1,
        hasWavyLine: false,
        slopeStart: longestFlatStart,
        slopeEnd: longestFlatEnd,
        options: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        formula: `正解: ${longestFlatStart}から${longestFlatEnd}（線が平らになっているところを探すよ）`,
        formulaEn: `Answer: ${longestFlatStart} to ${longestFlatEnd} (Look for the flat horizontal line)`,
        explanation: `気温が変わらなかったのは${longestFlatStart}から${longestFlatEnd}の間です`,
        explanationEn: `The temperature did not change between ${longestFlatStart} and ${longestFlatEnd}`,
      });
    } else if (steepestFall) {
      // Question about steepest fall
      const fallAmount = Math.abs(steepestFall.change);
      questions.push({
        id: `slope-${i}`,
        topic: 'change-slope',
        text: '気温が一番大きく下がったのは、何時から何時の間ですか？',
        textEn: 'Between which times did the temperature fall the most?',
        answer: `${steepestFall.start}から${steepestFall.end}`,
        dataPoints: dataPoints,
        xAxisLabel: '時間',
        xAxisLabelEn: 'Time',
        yAxisLabel: '気温 (℃)',
        yAxisLabelEn: 'Temperature (°C)',
        yAxisMin,
        yAxisMax,
        tickInterval: 1,
        hasWavyLine: false,
        slopeStart: steepestFall.start,
        slopeEnd: steepestFall.end,
        options: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        formula: `正解: ${steepestFall.start}から${steepestFall.end}（線が一番急な右下がりになっているところを探すよ。${fallAmount}℃下がった！）`,
        formulaEn: `Answer: ${steepestFall.start} to ${steepestFall.end} (Look for the steepest downward line. Fell by ${fallAmount}°C!)`,
        explanation: `気温が一番大きく下がったのは${steepestFall.start}から${steepestFall.end}の間です（${fallAmount}℃下がりました）`,
        explanationEn: `The temperature fell the most between ${steepestFall.start} and ${steepestFall.end} (fell by ${fallAmount}°C)`,
      });
    } else if (steepestRise) {
      // Fallback to steepest rise if no fall available
      questions.push({
        id: `slope-${i}`,
        topic: 'change-slope',
        text: '気温が一番大きく上がったのは、何時から何時の間ですか？',
        textEn: 'Between which times did the temperature rise the most?',
        answer: `${steepestRise.start}から${steepestRise.end}`,
        dataPoints: dataPoints,
        xAxisLabel: '時間',
        xAxisLabelEn: 'Time',
        yAxisLabel: '気温 (℃)',
        yAxisLabelEn: 'Temperature (°C)',
        yAxisMin,
        yAxisMax,
        tickInterval: 1,
        hasWavyLine: false,
        slopeStart: steepestRise.start,
        slopeEnd: steepestRise.end,
        options: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        formula: `正解: ${steepestRise.start}から${steepestRise.end}（線が一番急な右上がりになっているところを探すよ。${steepestRise.change}℃上がった！）`,
        formulaEn: `Answer: ${steepestRise.start} to ${steepestRise.end} (Look for the steepest upward line. Rose by ${steepestRise.change}°C!)`,
        explanation: `気温が一番大きく上がったのは${steepestRise.start}から${steepestRise.end}の間です（${steepestRise.change}℃上がりました）`,
        explanationEn: `The temperature rose the most between ${steepestRise.start} and ${steepestRise.end} (rose by ${steepestRise.change}°C)`,
      });
    } else {
      // Fallback to flat if nothing else available
      questions.push({
        id: `slope-${i}`,
        topic: 'change-slope',
        text: '気温が変わらなかったのは、何時から何時の間ですか？',
        textEn: 'Between which times did the temperature not change?',
        answer: `${longestFlatStart}から${longestFlatEnd}`,
        dataPoints: dataPoints,
        xAxisLabel: '時間',
        xAxisLabelEn: 'Time',
        yAxisLabel: '気温 (℃)',
        yAxisLabelEn: 'Temperature (°C)',
        yAxisMin,
        yAxisMax,
        tickInterval: 1,
        hasWavyLine: false,
        slopeStart: longestFlatStart,
        slopeEnd: longestFlatEnd,
        options: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        formula: `正解: ${longestFlatStart}から${longestFlatEnd}（線が平らになっているところを探すよ）`,
        formulaEn: `Answer: ${longestFlatStart} to ${longestFlatEnd} (Look for the flat horizontal line)`,
        explanation: `気温が変わらなかったのは${longestFlatStart}から${longestFlatEnd}の間です`,
        explanationEn: `The temperature did not change between ${longestFlatStart} and ${longestFlatEnd}`,
      });
    }
  }

  return questions;
}

// Generate wavy line graph questions
function generateWavyLineQuestions(): LineGraphQuestion[] {
  const questions: LineGraphQuestion[] = [];

  for (let i = 0; i < 5; i++) {
    // Generate body temperature data (36.0 - 37.5 range)
    const wavyLineBase = 36.0;
    const dataPoints: LineGraphDataPoint[] = [
      { x: '6:00', y: 36.2 + Math.random() * 0.3 },
      { x: '9:00', y: 36.4 + Math.random() * 0.3 },
      { x: '12:00', y: 36.8 + Math.random() * 0.4 },
      { x: '15:00', y: 37.0 + Math.random() * 0.3 },
      { x: '18:00', y: 36.9 + Math.random() * 0.3 },
      { x: '21:00', y: 36.6 + Math.random() * 0.3 },
    ];

    // Round to 1 decimal place
    dataPoints.forEach(d => {
      d.y = Math.round(d.y * 10) / 10;
    });

    const yAxisMin = 36.0;
    const yAxisMax = 37.5;
    const tickInterval = 0.1;

    // Find highest temperature
    const maxTemp = Math.max(...dataPoints.map(d => d.y));
    const maxTempTime = dataPoints.find(d => d.y === maxTemp)!.x;

    questions.push({
      id: `wavy-${i}`,
      topic: 'wavy-line',
      text: '波線のあるグラフを見て答えましょう。一番高い気温は何度ですか？',
      textEn: 'Look at the graph with the wavy line. What is the highest temperature recorded?',
      answer: maxTemp,
      dataPoints,
      xAxisLabel: '時間',
      xAxisLabelEn: 'Time',
      yAxisLabel: '体温 (℃)',
      yAxisLabelEn: 'Body Temperature (°C)',
      yAxisMin,
      yAxisMax,
      tickInterval,
      hasWavyLine: true,
      wavyLineBase,
      formula: `正解: ${maxTemp}℃（${maxTempTime}に記録された最高体温）`,
      formulaEn: `Answer: ${maxTemp}°C (Highest temperature recorded at ${maxTempTime})`,
      explanation: `一番高い気温は${maxTemp}度です（${maxTempTime}）`,
      explanationEn: `The highest temperature was ${maxTemp}°C at ${maxTempTime}`,
    });
  }

  return questions;
}

// Generate comparing two graphs questions
function generateComparingTwoGraphsQuestions(): LineGraphQuestion[] {
  const questions: LineGraphQuestion[] = [];

  // Predefined scenarios for temperature comparison
  const scenarios = [
    {
      city1: '東京',
      city1En: 'Tokyo',
      city2: '札幌',
      city2En: 'Sapporo',
      data1: [
        { x: '1月', y: 6 },
        { x: '2月', y: 7 },
        { x: '3月', y: 10 },
        { x: '4月', y: 15 },
        { x: '5月', y: 20 },
        { x: '6月', y: 23 },
      ],
      data2: [
        { x: '1月', y: -4 },
        { x: '2月', y: -3 },
        { x: '3月', y: 1 },
        { x: '4月', y: 7 },
        { x: '5月', y: 13 },
        { x: '6月', y: 17 },
      ],
    },
    {
      city1: '大阪',
      city1En: 'Osaka',
      city2: '仙台',
      city2En: 'Sendai',
      data1: [
        { x: '1月', y: 8 },
        { x: '2月', y: 9 },
        { x: '3月', y: 12 },
        { x: '4月', y: 17 },
        { x: '5月', y: 21 },
        { x: '6月', y: 25 },
      ],
      data2: [
        { x: '1月', y: 2 },
        { x: '2月', y: 3 },
        { x: '3月', y: 6 },
        { x: '4月', y: 11 },
        { x: '5月', y: 16 },
        { x: '6月', y: 19 },
      ],
    },
    {
      city1: '福岡',
      city1En: 'Fukuoka',
      city2: '長野',
      city2En: 'Nagano',
      data1: [
        { x: '1月', y: 7 },
        { x: '2月', y: 8 },
        { x: '3月', y: 11 },
        { x: '4月', y: 16 },
        { x: '5月', y: 20 },
        { x: '6月', y: 24 },
      ],
      data2: [
        { x: '1月', y: 1 },
        { x: '2月', y: 2 },
        { x: '3月', y: 5 },
        { x: '4月', y: 10 },
        { x: '5月', y: 15 },
        { x: '6月', y: 19 },
      ],
    },
    {
      city1: '名古屋',
      city1En: 'Nagoya',
      city2: '新潟',
      city2En: 'Niigata',
      data1: [
        { x: '1月', y: 5 },
        { x: '2月', y: 6 },
        { x: '3月', y: 9 },
        { x: '4月', y: 14 },
        { x: '5月', y: 19 },
        { x: '6月', y: 22 },
      ],
      data2: [
        { x: '1月', y: 3 },
        { x: '2月', y: 3 },
        { x: '3月', y: 6 },
        { x: '4月', y: 11 },
        { x: '5月', y: 16 },
        { x: '6月', y: 20 },
      ],
    },
    {
      city1: '広島',
      city1En: 'Hiroshima',
      city2: '金沢',
      city2En: 'Kanazawa',
      data1: [
        { x: '1月', y: 6 },
        { x: '2月', y: 7 },
        { x: '3月', y: 10 },
        { x: '4月', y: 15 },
        { x: '5月', y: 19 },
        { x: '6月', y: 23 },
      ],
      data2: [
        { x: '1月', y: 4 },
        { x: '2月', y: 4 },
        { x: '3月', y: 7 },
        { x: '4月', y: 12 },
        { x: '5月', y: 17 },
        { x: '6月', y: 21 },
      ],
    },
  ];

  for (let i = 0; i < 5; i++) {
    const scenario = scenarios[i];
    const allValues = [...scenario.data1, ...scenario.data2].map(d => d.y);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    // Use appropriate margins based on data range
    const yAxisMin = Math.min(0, minValue - 2);
    const yAxisMax = maxValue + 2;
    // Calculate tick interval based on range
    const range = yAxisMax - yAxisMin;
    const tickInterval = range <= 10 ? 1 : range <= 20 ? 2 : Math.ceil(range / 10);

    // Calculate temperature difference in a specific month
    const monthIndex = Math.floor(Math.random() * 6);
    const month = scenario.data1[monthIndex].x;
    const temp1 = scenario.data1[monthIndex].y;
    const temp2 = scenario.data2[monthIndex].y;
    const difference = temp1 - temp2;

    questions.push({
      id: `compare-${i}`,
      topic: 'comparing-two-graphs',
      text: `${scenario.city1}と${scenario.city2}の気温を比べましょう。${month}の気温の差は何度ですか？`,
      textEn: `Compare temperatures of ${scenario.city1En} and ${scenario.city2En}. What is the temperature difference in ${month}?`,
      answer: difference,
      dataPoints: scenario.data1,
      secondDataPoints: scenario.data2,
      xAxisLabel: '月',
      xAxisLabelEn: 'Month',
      yAxisLabel: '気温 (℃)',
      yAxisLabelEn: 'Temperature (°C)',
      yAxisMin,
      yAxisMax,
      tickInterval: 1,
      hasWavyLine: false,
      line1Label: scenario.city1,
      line1LabelEn: scenario.city1En,
      line2Label: scenario.city2,
      line2LabelEn: scenario.city2En,
      formula: `正解: ${difference}度（${scenario.city1}${temp1}℃ - ${scenario.city2}${temp2}℃ = ${difference}℃）`,
      formulaEn: `Answer: ${difference}°C (${scenario.city1En} ${temp1}°C - ${scenario.city2En} ${temp2}°C = ${difference}°C)`,
      explanation: `${month}の気温の差は${difference}度です`,
      explanationEn: `The temperature difference in ${month} is ${difference}°C`,
    });
  }

  return questions;
}

// Generate drawing graph questions
// Now with word problems where students extract data themselves
function generateDrawingGraphQuestions(): LineGraphQuestion[] {
  const questions: LineGraphQuestion[] = [];

  const scenarios = [
    {
      title: 'はなのたかさの成長',
      titleEn: 'Flower Growth',
      // Word problem description - students extract data from text
      problemDescription: 'けいくんははなをそだていました。1日目は2cm、2日目は4cm、3日目は5cm、4日目は7cm、5日目には8cmにのびました。',
      problemDescriptionEn: 'Kei grew a flower. Day 1: 2cm, Day 2: 4cm, Day 3: 5cm, Day 4: 7cm, Day 5: 8cm.',
      tableData: [
        { x: '1日目', y: 2 },
        { x: '2日目', y: 4 },
        { x: '3日目', y: 5 },
        { x: '4日目', y: 7 },
        { x: '5日目', y: 8 },
      ],
      questionDay: '4日目',
      questionDayEn: 'Day 4',
      correctY: 7,
    },
    {
      title: '50m走のタイム',
      titleEn: '50m Sprint Time',
      problemDescription: 'けいくんは50m走のれんしゅうをしました。4月は9びょう、5月は8びょう、6月も8びょう、7月は7びょう、8月も7びょうでした。',
      problemDescriptionEn: 'Kei practiced 50m sprint. April: 9 sec, May: 8 sec, June: 8 sec, July: 7 sec, August: 7 sec.',
      tableData: [
        { x: '4月', y: 9 },
        { x: '5月', y: 8 },
        { x: '6月', y: 8 },
        { x: '7月', y: 7 },
        { x: '8月', y: 7 },
      ],
      questionDay: '7月',
      questionDayEn: 'July',
      correctY: 7,
    },
    {
      title: '本のよんだページ数',
      titleEn: 'Pages Read',
      problemDescription: 'けいくんは1しゅうかんでほんをよみました。げつようびは20ページ、かようびは35ページ、すいようびは45ページ、もくようびは60ページ、きんようびは70ページよみました。',
      problemDescriptionEn: 'Kei read a book over a week. Monday: 20 pages, Tuesday: 35 pages, Wednesday: 45 pages, Thursday: 60 pages, Friday: 70 pages.',
      tableData: [
        { x: '月', y: 20 },
        { x: '火', y: 35 },
        { x: '水', y: 45 },
        { x: '木', y: 60 },
        { x: '金', y: 70 },
      ],
      questionDay: '木曜日',
      questionDayEn: 'Thursday',
      correctY: 60,
    },
    {
      title: 'さいころの出た目の合計',
      titleEn: 'Dice Roll Total',
      problemDescription: 'けいくんはさいころをふりました。1回目は3、2回目は4（ごうけい7）、3回目は5（ごうけい12）、4回目は4（ごうけい16）、5回目は2（ごうけい18）でした。',
      problemDescriptionEn: 'Kei rolled a dice. 1st roll: 3, 2nd roll: 4 (total 7), 3rd roll: 5 (total 12), 4th roll: 4 (total 16), 5th roll: 2 (total 18).',
      tableData: [
        { x: '1回目', y: 3 },
        { x: '2回目', y: 7 },
        { x: '3回目', y: 12 },
        { x: '4回目', y: 16 },
        { x: '5回目', y: 18 },
      ],
      questionDay: '3回目',
      questionDayEn: '3rd roll',
      correctY: 12,
    },
    {
      title: 'ペットの体重',
      titleEn: 'Pet Weight',
      problemDescription: 'けいくんのペットのたいじゅうをはかりました。1月は500g、2月は650g、3月は800g、4月は950g、5月は1100gでした。',
      problemDescriptionEn: "Kei's pet weight was measured. January: 500g, February: 650g, March: 800g, April: 950g, May: 1100g.",
      tableData: [
        { x: '1月', y: 500 },
        { x: '2月', y: 650 },
        { x: '3月', y: 800 },
        { x: '4月', y: 950 },
        { x: '5月', y: 1100 },
      ],
      questionDay: '3月',
      questionDayEn: 'March',
      correctY: 800,
    },
  ];

  for (let i = 0; i < 5; i++) {
    const scenario = scenarios[i];
    const values = scenario.tableData.map(d => d.y);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Calculate appropriate scale based on this specific problem's data
    const range = maxValue - minValue;
    // Start Y-axis at 0 or just below min value
    const yAxisMin = Math.max(0, Math.floor(minValue / 10) * 10 - 10);
    // End Y-axis at nice round number above max
    const yAxisMax = Math.ceil((maxValue + 20) / 50) * 50;

    // Determine tick interval based on the max value of this specific problem
    // This controls label density, NOT where users can click
    let tickInterval: number;
    if (yAxisMax <= 20) {
      tickInterval = 2;
    } else if (yAxisMax <= 50) {
      tickInterval = 5;
    } else if (yAxisMax <= 100) {
      tickInterval = 10;
    } else if (yAxisMax <= 500) {
      tickInterval = 50; // Cleaner for medium-large values
    } else {
      tickInterval = 100; // Use 100 for large values like pet weight
    }

    // Generate correct points for SVG coordinate checking
    const correctPoints = scenario.tableData.map((d, idx) => ({
      x: idx,
      y: d.y,
    }));

    questions.push({
      id: `draw-${i}`,
      topic: 'drawing-graph',
      text: `${scenario.problemDescription}\n\n上の文章から数字を見つけて、グラフに点を打ちましょう。${scenario.questionDay}の値はいくつですか？`,
      textEn: `${scenario.problemDescriptionEn}\n\nFind the numbers from the text above and plot points on the graph. What is the value for ${scenario.questionDayEn}?`,
      answer: scenario.correctY,
      dataPoints: [], // Will be filled by user
      tableData: scenario.tableData,
      xAxisLabel: '時間',
      xAxisLabelEn: 'Time',
      yAxisLabel: '数',
      yAxisLabelEn: 'Amount',
      yAxisMin,
      yAxisMax,
      tickInterval,
      hasWavyLine: false,
      correctPoints,
      problemDescription: scenario.problemDescription,
      problemDescriptionEn: scenario.problemDescriptionEn,
      formula: `正解: ${scenario.correctY}（${scenario.questionDay}の値は${scenario.correctY}）`,
      formulaEn: `Answer: ${scenario.correctY} (The value for ${scenario.questionDayEn} is ${scenario.correctY})`,
      explanation: `${scenario.questionDay}の値は${scenario.correctY}です`,
      explanationEn: `The value for ${scenario.questionDayEn} is ${scenario.correctY}`,
    });
  }

  return questions;
}

export function generateLineGraphQuestions(topic: LineGraphTopic): LineGraphQuestion[] {
  switch (topic) {
    case 'reading-graph':
      return generateReadingGraphQuestions();
    case 'change-slope':
      return generateChangeSlopeQuestions();
    case 'wavy-line':
      return generateWavyLineQuestions();
    case 'comparing-two-graphs':
      return generateComparingTwoGraphsQuestions();
    case 'drawing-graph':
      return generateDrawingGraphQuestions();
    default:
      return generateReadingGraphQuestions();
  }
}
