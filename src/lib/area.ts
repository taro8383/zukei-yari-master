// Area & Large Units (面積と単位) - 4th Grade MEXT Curriculum
// Focus: Area calculations, large area units, choosing appropriate units, composite shapes

export type AreaTopic = 'calculating-area' | 'large-area-units' | 'choosing-units' | 'composite-shapes';

export interface AreaTopicInfo {
  id: AreaTopic;
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

export interface AreaQuestion {
  id: number;
  topic: AreaTopic;
  text: string;
  textEn: string;
  explanation: string;
  explanationEn: string;
  // For calculating-area topic
  shape?: 'rectangle' | 'square';
  width?: number;
  height?: number;
  side?: number;
  answerArea?: number;
  // For large-area-units topic
  fromUnit?: 'm2' | 'a' | 'ha' | 'km2';
  toUnit?: 'm2' | 'a' | 'ha' | 'km2';
  conversionValue?: number;
  answerConversion?: number;
  // For choosing-units topic
  locationName?: string;
  locationNameEn?: string;
  appropriateUnit?: 'cm2' | 'm2' | 'a' | 'ha' | 'km2';
  // For composite-shapes topic
  shapeType?: 'l-shape';
  dimensions?: {
    outerWidth: number;
    outerHeight: number;
    cutoutWidth: number;
    cutoutHeight: number;
  };
  area1?: number;
  area2?: number;
}

export const AREA_TOPICS: Record<AreaTopic, AreaTopicInfo> = {
  'calculating-area': {
    id: 'calculating-area',
    icon: '📐',
    label: '面積の計算',
    labelEn: 'Calculating Area',
    goal: '四角形の広さ（面積）を正確に計算しよう！',
    goalEn: 'Find the exact size of a flat space!',
    method: '① 長方形：たて × よこ ② 正方形：一辺 × 一辺 ③ 単位は cm²（平方センチメートル） 例：たて5cm × よこ3cm = 15cm²',
    methodEn: 'Step 1: Rectangle = Length × Width. Step 2: Square = Side × Side. Step 3: Unit is cm² (square centimeters). Example: 5cm × 3cm = 15cm²',
    realLife: 'マインクラフトで、家の床を作るのにブロックがいくつ必要か計算するとき！',
    realLifeEn: 'Calculating how many blocks you need to build a floor in Minecraft!',
    benefit: '部屋の広さや物の大きさが計算できるようになる！',
    benefitEn: 'You will be able to calculate room sizes and object dimensions!',
  },
  'large-area-units': {
    id: 'large-area-units',
    icon: '🏞️',
    label: '大きな面積の単位',
    labelEn: 'Large Area Units',
    goal: '畑や町、国の広さを表す巨大な単位をマスターしよう！',
    goalEn: 'Master the giant units used for farms, cities, and countries!',
    method: '① 1a(アール) = 100m² ② 1ha(ヘクタール) = 100a = 10,000m² ③ 1km² = 100ha = 1,000,000m²。100倍ずつ大きくなる！',
    methodEn: 'Step 1: 1 are (a) = 100 m². Step 2: 1 hectare (ha) = 100 ares = 10,000 m². Step 3: 1 km² = 100 ha = 1,000,000 m². Each step is ×100!',
    realLife: '学校のグラウンドやサッカー場、東京ドームの広さを比べるとき！',
    realLifeEn: 'When comparing the size of school grounds, soccer fields, or Tokyo Dome!',
    benefit: '大きな土地の広さがわかるようになる！',
    benefitEn: 'You will understand the size of large areas of land!',
  },
  'choosing-units': {
    id: 'choosing-units',
    icon: '🎯',
    label: 'ぴったりな単位をえらぶ',
    labelEn: 'Choosing the Right Unit',
    goal: '場所の広さに合わせて、一番ぴったりな単位をえらぼう。',
    goalEn: 'Pick the perfect unit for the job.',
    method: '① 小さいもの（消しゴムなど）→ cm² ② 部屋の広さ → m² ③ 学校のグラウンド → a ④ 大きな農場 → ha ⑤ 町や国 → km²',
    methodEn: 'Step 1: Small objects (eraser) → cm². Step 2: Room size → m². Step 3: School ground → a. Step 4: Large farm → ha. Step 5: City/country → km²',
    realLife: 'ママにお手伝いして、新しい机が部屋に入るか調べるとき！',
    realLifeEn: 'Helping mom check if a new desk will fit in your room!',
    benefit: '適切な単位を選べるようになる！',
    benefitEn: 'You will be able to choose the appropriate unit for any situation!',
  },
  'composite-shapes': {
    id: 'composite-shapes',
    icon: '🧩',
    label: 'いろいろな形の面積',
    labelEn: 'Area of Composite Shapes',
    goal: 'L字のような変わった形は、分けたり引いたりして面積を出そう！',
    goalEn: 'Find the area of weird shapes by splitting them or subtracting!',
    method: '① L字を2つの長方形に分ける ② それぞれの面積を計算 ③ たし算して合計を出す！ 例：大きい長方形 - 小さい長方形 = 答え',
    methodEn: 'Step 1: Split the L-shape into 2 rectangles. Step 2: Calculate each area. Step 3: Add them together! Example: Large rectangle - Small rectangle = Answer',
    realLife: '部屋に家具を置くとき、使えるスペースを計算するのに役立つよ！',
    realLifeEn: 'Useful for calculating available space when placing furniture in a room!',
    benefit: '複雑な形の面積も計算できるようになる！',
    benefitEn: 'You will be able to calculate the area of complex shapes!',
  },
};

// Helper function to generate a random integer between min and max (inclusive)
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate questions for calculating area - DYNAMICALLY
export function generateCalculatingAreaQuestions(): AreaQuestion[] {
  const questions: AreaQuestion[] = [];

  // Generate 3 rectangle questions
  for (let i = 0; i < 3; i++) {
    const width = randomInt(3, 12);
    const height = randomInt(3, 12);
    const area = width * height;

    questions.push({
      id: i + 1,
      topic: 'calculating-area',
      shape: 'rectangle',
      width,
      height,
      answerArea: area,
      text: `たて ${height} cm、よこ ${width} cm の長方形の面積は？`,
      textEn: `What is the area of a rectangle with height ${height} cm and width ${width} cm?`,
      explanation: `たて ${height} cm × よこ ${width} cm = ${area} cm²`,
      explanationEn: `${height} cm × ${width} cm = ${area} cm²`,
    });
  }

  // Generate 2 square questions
  for (let i = 0; i < 2; i++) {
    const side = randomInt(4, 10);
    const area = side * side;

    questions.push({
      id: i + 4,
      topic: 'calculating-area',
      shape: 'square',
      side,
      answerArea: area,
      text: `一辺 ${side} cm の正方形の面積は？`,
      textEn: `What is the area of a square with side ${side} cm?`,
      explanation: `一辺 ${side} cm × ${side} cm = ${area} cm²`,
      explanationEn: `${side} cm × ${side} cm = ${area} cm²`,
    });
  }

  return questions.sort(() => Math.random() - 0.5);
}

// Generate questions for large area units - DYNAMICALLY
export function generateLargeAreaUnitsQuestions(): AreaQuestion[] {
  const questions: AreaQuestion[] = [];
  const conversions: { from: 'm2' | 'a' | 'ha' | 'km2'; to: 'm2' | 'a' | 'ha' | 'km2'; multiplier: number }[] = [
    { from: 'a', to: 'm2', multiplier: 100 },
    { from: 'ha', to: 'a', multiplier: 100 },
    { from: 'ha', to: 'm2', multiplier: 10000 },
    { from: 'km2', to: 'ha', multiplier: 100 },
    { from: 'km2', to: 'm2', multiplier: 1000000 },
    { from: 'm2', to: 'a', multiplier: 0.01 },
    { from: 'a', to: 'ha', multiplier: 0.01 },
    { from: 'm2', to: 'ha', multiplier: 0.0001 },
    { from: 'ha', to: 'km2', multiplier: 0.01 },
    { from: 'm2', to: 'km2', multiplier: 0.000001 },
  ];

  // Unit names in Japanese and English
  const unitNames: Record<string, { ja: string; en: string }> = {
    m2: { ja: 'm²', en: 'm²' },
    a: { ja: 'a', en: 'ares' },
    ha: { ja: 'ha', en: 'hectares' },
    km2: { ja: 'km²', en: 'km²' },
  };

  for (let i = 0; i < 5; i++) {
    const conversion = conversions[randomInt(0, conversions.length - 1)];
    let value: number;

    // Generate clean numbers based on conversion type
    if (conversion.multiplier >= 1) {
      value = randomInt(1, 50);
    } else {
      value = randomInt(1, 100) * (1 / conversion.multiplier);
    }

    const answer = Math.round(value * conversion.multiplier * 1000000) / 1000000;

    questions.push({
      id: i + 1,
      topic: 'large-area-units',
      fromUnit: conversion.from,
      toUnit: conversion.to,
      conversionValue: value,
      answerConversion: answer,
      text: `${value}${unitNames[conversion.from].ja} = [ ] ${unitNames[conversion.to].ja}`,
      textEn: `${value} ${unitNames[conversion.from].en} = [ ] ${unitNames[conversion.to].en}`,
      explanation: `${value} ${unitNames[conversion.from].ja} × ${conversion.multiplier} = ${answer} ${unitNames[conversion.to].ja}`,
      explanationEn: `${value} ${unitNames[conversion.from].en} × ${conversion.multiplier} = ${answer} ${unitNames[conversion.to].en}`,
    });
  }

  return questions;
}

// Generate questions for choosing appropriate units - DYNAMICALLY
export function generateChoosingUnitsQuestions(): AreaQuestion[] {
  const questions: AreaQuestion[] = [];

  const locations: { name: string; nameEn: string; unit: 'cm2' | 'm2' | 'a' | 'ha' | 'km2'; hint: string; hintEn: string }[] = [
    { name: '消しゴムの表面', nameEn: 'Surface of an eraser', unit: 'cm2', hint: '小さいものは cm²', hintEn: 'Small objects use cm²' },
    { name: 'ポストカード', nameEn: 'Postcard', unit: 'cm2', hint: '小さいものは cm²', hintEn: 'Small objects use cm²' },
    { name: '教室の床', nameEn: 'Classroom floor', unit: 'm2', hint: '部屋の広さは m²', hintEn: 'Room sizes use m²' },
    { name: 'リビングの床', nameEn: 'Living room floor', unit: 'm2', hint: '部屋の広さは m²', hintEn: 'Room sizes use m²' },
    { name: '学校のグラウンド', nameEn: 'School ground', unit: 'a', hint: 'グラウンドは a（アール）', hintEn: 'School grounds use ares (a)' },
    { name: 'サッカー場', nameEn: 'Soccer field', unit: 'a', hint: 'グラウンドは a（アール）', hintEn: 'Sports fields use ares (a)' },
    { name: '大きな農場', nameEn: 'Large farm', unit: 'ha', hint: '大きな農場は ha（ヘクタール）', hintEn: 'Large farms use hectares (ha)' },
    { name: '都道府県', nameEn: 'Prefecture', unit: 'km2', hint: '町や県は km²', hintEn: 'Cities and prefectures use km²' },
    { name: '日本の面積', nameEn: 'Area of Japan', unit: 'km2', hint: '国は km²', hintEn: 'Countries use km²' },
    { name: '東京ドーム', nameEn: 'Tokyo Dome', unit: 'ha', hint: '大きな建物の敷地は ha', hintEn: 'Large building sites use ha' },
  ];

  // Shuffle and pick 5 unique locations
  const shuffled = [...locations].sort(() => Math.random() - 0.5).slice(0, 5);

  for (let i = 0; i < 5; i++) {
    const location = shuffled[i];

    questions.push({
      id: i + 1,
      topic: 'choosing-units',
      locationName: location.name,
      locationNameEn: location.nameEn,
      appropriateUnit: location.unit,
      text: `「${location.name}」の広さを表すのに最もふさわしい単位は？`,
      textEn: `What is the most appropriate unit for measuring the "${location.nameEn}"?`,
      explanation: `${location.name}は${location.unit}で表します。${location.hint}`,
      explanationEn: `${location.nameEn} is measured in ${location.unit}. ${location.hintEn}`,
    });
  }

  return questions;
}

// Generate questions for composite shapes (L-shapes) - DYNAMICALLY
export function generateCompositeShapesQuestions(): AreaQuestion[] {
  const questions: AreaQuestion[] = [];

  for (let i = 0; i < 5; i++) {
    // Create an L-shape by defining outer dimensions and cutout
    const outerWidth = randomInt(8, 15);
    const outerHeight = randomInt(8, 15);
    const cutoutWidth = randomInt(3, outerWidth - 3);
    const cutoutHeight = randomInt(3, outerHeight - 3);

    // Method 1: Split into two rectangles
    // Rectangle 1: (outerWidth - cutoutWidth) × outerHeight
    // Rectangle 2: cutoutWidth × (outerHeight - cutoutHeight)
    const rect1Width = outerWidth - cutoutWidth;
    const rect1Height = outerHeight;
    const rect1Area = rect1Width * rect1Height;

    const rect2Width = cutoutWidth;
    const rect2Height = outerHeight - cutoutHeight;
    const rect2Area = rect2Width * rect2Height;

    const totalArea = rect1Area + rect2Area;

    questions.push({
      id: i + 1,
      topic: 'composite-shapes',
      shapeType: 'l-shape',
      dimensions: {
        outerWidth,
        outerHeight,
        cutoutWidth,
        cutoutHeight,
      },
      area1: rect1Area,
      area2: rect2Area,
      answerArea: totalArea,
      text: `下のL字の形の面積は？（単位：cm²）`,
      textEn: `What is the area of the L-shape below? (Unit: cm²)`,
      explanation: `方法1：${rect1Width}×${rect1Height}=${rect1Area} と ${rect2Width}×${rect2Height}=${rect2Area} → 合計 ${totalArea}cm²\n方法2：${outerWidth}×${outerHeight}=${outerWidth * outerHeight} から ${cutoutWidth}×${cutoutHeight}=${cutoutWidth * cutoutHeight} を引く → ${totalArea}cm²`,
      explanationEn: `Method 1: ${rect1Width}×${rect1Height}=${rect1Area} and ${rect2Width}×${rect2Height}=${rect2Area} → Total ${totalArea}cm²\nMethod 2: ${outerWidth}×${outerHeight}=${outerWidth * outerHeight} minus ${cutoutWidth}×${cutoutHeight}=${cutoutWidth * cutoutHeight} → ${totalArea}cm²`,
    });
  }

  return questions;
}

// Main function to generate area questions based on topic
export function generateAreaQuestions(topic: AreaTopic): AreaQuestion[] {
  switch (topic) {
    case 'calculating-area':
      return generateCalculatingAreaQuestions();
    case 'large-area-units':
      return generateLargeAreaUnitsQuestions();
    case 'choosing-units':
      return generateChoosingUnitsQuestions();
    case 'composite-shapes':
      return generateCompositeShapesQuestions();
    default:
      return generateCalculatingAreaQuestions();
  }
}
