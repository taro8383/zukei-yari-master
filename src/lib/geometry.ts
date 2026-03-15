export type Topic =
  | 'angles'
  | 'calculating-area'
  | 'large-area-units'
  | 'choosing-units'
  | 'composite-shapes'
  | 'lines'
  | 'intersecting'
  | 'quadrilaterals'
  | 'diagonals';

export type DiagramType =
  | 'straight-line-angle'
  | 'triangle-angle'
  | 'circle-angle'
  | 'rectangle-area'
  | 'square-area'
  | 'perpendicular'
  | 'parallel-corresponding'
  | 'parallel-supplementary'
  | 'intersecting-lines'
  | 'parallelogram-angle'
  | 'trapezoid-angle'
  | 'rhombus-perimeter'
  | 'polygon-diagonals'
  | 'count-right-angles'
  // Interactive SVG exercise types
  | 'intersecting-lines-interactive'
  | 'dotted-paper-quadrilateral'
  | 'diagonals-drawing'
  // Area module types
  | 'area-calculating'
  | 'area-large-units'
  | 'area-choosing-units'
  | 'area-composite-lshape'
  | 'area-composite-cshape';

export interface DiagramData {
  type: DiagramType;
  params: Record<string, number>;
}

export interface Question {
  id: number;
  text: string;
  textEn: string;
  answer: number | string;
  unit: string;
  diagram: DiagramData;
  isInteractive?: boolean; // Flag for SVG drawing exercises
  // For area topics
  explanation?: string;
  explanationEn?: string;
  // For large-area-units topic
  fromUnit?: 'm2' | 'a' | 'ha' | 'km2';
  toUnit?: 'm2' | 'a' | 'ha' | 'km2';
  // For choosing-units topic
  appropriateUnit?: 'cm2' | 'm2' | 'a' | 'ha' | 'km2';
}

export interface TopicInfo {
  label: string;
  labelEn: string;
  icon: string;
  goal: string;
  goalEn: string;
  method: string;
  methodEn: string;
  realLife: string;
  realLifeEn: string;
  benefit: string;
  benefitEn: string;
}

export const TOPICS: Record<Topic, TopicInfo> = {
  angles: {
    label: '角度のけいさん',
    labelEn: 'Calculating Angles',
    icon: '📐',
    goal: '角度をもとめる力をつけよう！',
    goalEn: 'Build your ability to find angles!',
    method: '三角じょうぎや分度器をつかって角度をはかるよ。一直線は180°、一回転は360°だよ。たし算やひき算で角度をもとめよう！',
    methodEn: 'Use a set square or protractor to measure. A straight line = 180°, a full turn = 360°. Use addition and subtraction to find angles!',
    realLife: 'ゲームをつくる人は、キャラクターがジャンプする角度を計算しているよ。スケートボードのランプも角度がだいじ！',
    realLifeEn: 'Game developers calculate jump angles for characters. Skateboard ramps also depend on angles!',
    benefit: '角度がわかると、ものの形やうごきを正しくりかいできるようになるよ。ロボットのうでを動かす計算にもつかうんだ！',
    benefitEn: 'Understanding angles helps you understand shapes and movement. It\'s also used to program robot arms!',
  },
  'calculating-area': {
    label: '面積の計算',
    labelEn: 'Calculating Area',
    icon: '📏',
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
    label: '大きな面積の単位',
    labelEn: 'Large Area Units',
    icon: '🏞️',
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
    label: 'ぴったりな単位をえらぶ',
    labelEn: 'Choosing the Right Unit',
    icon: '🎯',
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
    label: 'いろいろな形の面積',
    labelEn: 'Area of Composite Shapes',
    icon: '🧩',
    goal: 'L字のような変わった形は、分けたり引いたりして面積を出そう！',
    goalEn: 'Find the area of weird shapes by splitting them or subtracting!',
    method: '① L字を2つの長方形に分ける ② それぞれの面積を計算 ③ たし算して合計を出す！ 例：大きい長方形 - 小さい長方形 = 答え',
    methodEn: 'Step 1: Split the L-shape into 2 rectangles. Step 2: Calculate each area. Step 3: Add them together! Example: Large rectangle - Small rectangle = Answer',
    realLife: '部屋に家具を置くとき、使えるスペースを計算するのに役立つよ！',
    realLifeEn: 'Useful for calculating available space when placing furniture in a room!',
    benefit: '複雑な形の面積も計算できるようになる！',
    benefitEn: 'You will be able to calculate the area of complex shapes!',
  },
  lines: {
    label: '垂直と平行',
    labelEn: 'Perpendicular & Parallel',
    icon: '📝',
    goal: '垂直（すいちょく）と平行（へいこう）を見分けよう！',
    goalEn: 'Tell perpendicular and parallel lines apart!',
    method: '垂直 ＝ 2つの線が90°でまじわること。平行 ＝ 2つの線がどこまでいっても交わらないこと。角度をヒントにかんがえよう！',
    methodEn: 'Perpendicular = two lines meet at 90°. Parallel = two lines never meet. Use angles as clues!',
    realLife: 'ビルのかべと地面は垂直だよ。電車のレールは平行！道路のしましま（横断歩道）も平行線なんだ。',
    realLifeEn: 'Building walls and the ground are perpendicular. Train rails are parallel! Crosswalk stripes are parallel lines too.',
    benefit: '垂直と平行がわかると、図形のとくちょうがすぐ見ぬけるようになるよ。設計図をよむ力もつくんだ！',
    benefitEn: 'Understanding these helps you quickly identify shape properties and read blueprints!',
  },
  intersecting: {
    label: '交わる直線と角',
    labelEn: 'Intersecting Lines & Angles',
    icon: '✂️',
    goal: '交わる直線の角度のきまりを見つけよう！',
    goalEn: 'Discover the rules of angles at intersecting lines!',
    method: '2つの直線が交わると4つの角ができるよ。向かい合う角（対頂角）は同じ大きさ！となり合う角をたすと180°になるよ。',
    methodEn: 'When two lines cross, they make 4 angles. Opposite angles (vertical angles) are equal! Adjacent angles add up to 180°.',
    realLife: '道路の交差点を上から見ると、交わる直線と同じだよ。信号のタイミングも角度の計算がつかわれているんだ！',
    realLifeEn: 'A road intersection seen from above looks just like intersecting lines. Traffic signal timing also uses angle calculations!',
    benefit: '対頂角やとなり合う角がわかると、複雑な図形の角度もすばやくもとめられるようになるよ！',
    benefitEn: 'Knowing vertical and adjacent angles helps you quickly solve complex shape problems!',
  },
  quadrilaterals: {
    label: '四角形のなかま分け',
    labelEn: 'Classifying Quadrilaterals',
    icon: '🔷',
    goal: '台形・平行四辺形・ひし形・たこ形を見分けよう！',
    goalEn: 'Identify trapezoids, parallelograms, rhombuses, and kites!',
    method: '台形＝1組の辺が平行。平行四辺形＝2組の辺が平行で、向かい合う角が同じ。ひし形＝4つの辺が全部同じ長さ。たこ形＝隣り合う2組の辺が同じ長さ。',
    methodEn: 'Trapezoid = 1 pair of parallel sides. Parallelogram = 2 pairs of parallel sides, opposite angles equal. Rhombus = all 4 sides equal. Kite = 2 pairs of adjacent equal sides.',
    realLife: '野球のダイヤモンドはひし形だよ！テーブルや窓は平行四辺形や長方形。身の回りの四角形を探してみよう！',
    realLifeEn: 'A baseball diamond is a rhombus! Tables and windows are parallelograms or rectangles. Look for quadrilaterals around you!',
    benefit: '四角形のとくちょうがわかると、面積をもとめたり、ものづくりに役立つよ！',
    benefitEn: 'Knowing quadrilateral properties helps you calculate areas and is useful for building things!',
  },
  diagonals: {
    label: '対角線',
    labelEn: 'Diagonals',
    icon: '⬡',
    goal: '多角形の対角線の数をもとめよう！',
    goalEn: 'Find the number of diagonals in polygons!',
    method: '向かい合う頂点をむすぶ線を対角線というよ。四角形は2本、五角形は5本。公式：n角形の対角線 ＝ n×(n−3)÷2',
    methodEn: 'A line connecting opposite vertices is a diagonal. Quadrilateral: 2, Pentagon: 5. Formula: n × (n−3) ÷ 2',
    realLife: 'サッカーボールの模様や、クモの巣のデザインにも対角線がかくれているよ！建物のすじかいも対角線なんだ。',
    realLifeEn: 'Diagonals hide in soccer ball patterns and spider web designs! Building cross-braces are diagonals too.',
    benefit: '対角線がわかると、図形を三角形に分けて面積をもとめたり、強い構造をつくることができるよ！',
    benefitEn: 'Understanding diagonals lets you split shapes into triangles for area calculation, and build strong structures!',
  },
};

function generateSingleQuestion(topic: Topic, id: number): Question {
  switch (topic) {
    case 'angles': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const angle = Math.floor(Math.random() * 130) + 20;
        const rotation = Math.floor(Math.random() * 360);
        return {
          id, answer: 180 - angle, unit: '°',
          text: '下の図で、アの角度をもとめましょう。（一直線＝180°）',
          textEn: 'Find angle ア in the figure below. (Straight line = 180°)',
          diagram: { type: 'straight-line-angle', params: { givenAngle: angle, rotation } },
        };
      } else if (type === 1) {
        const a1 = Math.floor(Math.random() * 60) + 30;
        const a2 = Math.floor(Math.random() * (140 - a1 - 20)) + 20;
        const rotation = Math.floor(Math.random() * 360);
        return {
          id, answer: 180 - a1 - a2, unit: '°',
          text: '下の三角形で、アの角度をもとめましょう。（三角形の内角の和＝180°）',
          textEn: 'Find angle ア in the triangle. (Sum of interior angles = 180°)',
          diagram: { type: 'triangle-angle', params: { angle1: a1, angle2: a2, rotation } },
        };
      } else {
        const angle = Math.floor(Math.random() * 300) + 30;
        return {
          id, answer: 360 - angle, unit: '°',
          text: '下の図で、アの角度をもとめましょう。（一回転＝360°）',
          textEn: 'Find angle ア in the figure. (Full rotation = 360°)',
          diagram: { type: 'circle-angle', params: { givenAngle: angle } },
        };
      }
    }
    case 'calculating-area': {
      const isSquare = Math.random() > 0.6;
      if (isSquare) {
        const side = Math.floor(Math.random() * 10) + 2;
        const area = side * side;
        return {
          id, answer: area, unit: 'cm²',
          text: `一辺 ${side} cm の正方形の面積は？`,
          textEn: `What is the area of a square with side ${side} cm?`,
          explanation: `一辺 ${side} cm × ${side} cm = ${area} cm²`,
          explanationEn: `${side} cm × ${side} cm = ${area} cm²`,
          diagram: { type: 'area-calculating', params: { shape: 'square', side, area } },
        };
      } else {
        const w = Math.floor(Math.random() * 10) + 3;
        const h = Math.floor(Math.random() * 8) + 2;
        const area = w * h;
        return {
          id, answer: area, unit: 'cm²',
          text: `たて ${h} cm、よこ ${w} cm の長方形の面積は？`,
          textEn: `What is the area of a rectangle with height ${h} cm and width ${w} cm?`,
          explanation: `たて ${h} cm × よこ ${w} cm = ${area} cm²`,
          explanationEn: `${h} cm × ${w} cm = ${area} cm²`,
          diagram: { type: 'area-calculating', params: { shape: 'rectangle', width: w, height: h, area } },
        };
      }
    }
    case 'large-area-units': {
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
      const unitNames: Record<string, { ja: string; en: string }> = {
        m2: { ja: 'm²', en: 'm²' },
        a: { ja: 'a', en: 'ares' },
        ha: { ja: 'ha', en: 'hectares' },
        km2: { ja: 'km²', en: 'km²' },
      };
      const conversion = conversions[Math.floor(Math.random() * conversions.length)];
      let value: number;
      if (conversion.multiplier >= 1) {
        value = Math.floor(Math.random() * 50) + 1;
      } else {
        value = Math.floor(Math.random() * 100) * (1 / conversion.multiplier);
      }
      const answer = Math.round(value * conversion.multiplier * 1000000) / 1000000;
      return {
        id, answer, unit: unitNames[conversion.to].ja,
        text: `${value}${unitNames[conversion.from].ja} = [ ] ${unitNames[conversion.to].ja}`,
        textEn: `${value} ${unitNames[conversion.from].en} = [ ] ${unitNames[conversion.to].en}`,
        explanation: `${value} ${unitNames[conversion.from].ja} × ${conversion.multiplier} = ${answer} ${unitNames[conversion.to].ja}`,
        explanationEn: `${value} ${unitNames[conversion.from].en} × ${conversion.multiplier} = ${answer} ${unitNames[conversion.to].en}`,
        fromUnit: conversion.from,
        toUnit: conversion.to,
        diagram: { type: 'area-large-units', params: { value, from: conversion.from, to: conversion.to, multiplier: conversion.multiplier, answer } },
      };
    }
    case 'choosing-units': {
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
      const location = locations[Math.floor(Math.random() * locations.length)];
      return {
        id, answer: location.unit, unit: '',
        text: `「${location.name}」の広さを表すのに最もふさわしい単位は？`,
        textEn: `What is the most appropriate unit for measuring the "${location.nameEn}"?`,
        explanation: `${location.name}は${location.unit}で表します。${location.hint}`,
        explanationEn: `${location.nameEn} is measured in ${location.unit}. ${location.hintEn}`,
        appropriateUnit: location.unit,
        diagram: { type: 'area-choosing-units', params: { location: location.name, locationEn: location.nameEn, unit: location.unit } },
      };
    }
    case 'composite-shapes': {
      // 50% chance for L-shape, 50% for C-shape
      const isCShape = Math.random() > 0.5;

      if (isCShape) {
        // C-shape: like a capital C, with top and bottom wider than middle
        // Outer rectangle with a vertical cutout on one side
        const outerWidth = Math.floor(Math.random() * 6) + 10; // 10-15
        const outerHeight = Math.floor(Math.random() * 6) + 10; // 10-15
        const cutoutWidth = Math.floor(Math.random() * (outerWidth - 5)) + 3; // Cutout width
        const cutoutY = Math.floor(Math.random() * (outerHeight - 6)) + 3; // Where cutout starts vertically
        const cutoutHeight = Math.floor(Math.random() * (outerHeight - cutoutY - 2)) + 2; // Cutout height

        // Calculate areas - C-shape is outer minus cutout
        const outerArea = outerWidth * outerHeight;
        const cutoutArea = cutoutWidth * cutoutHeight;
        const totalArea = outerArea - cutoutArea;

        return {
          id, answer: totalArea, unit: 'cm²',
          text: `下の形の面積は？（単位：cm²）`,
          textEn: `What is the area of the shape below? (Unit: cm²)`,
          explanation: `大きい長方形から切り取った部分を引きます：${outerWidth}×${outerHeight}=${outerArea} から ${cutoutWidth}×${cutoutHeight}=${cutoutArea} を引く → ${totalArea}cm²`,
          explanationEn: `Subtract the cutout from the large rectangle: ${outerWidth}×${outerHeight}=${outerArea} minus ${cutoutWidth}×${cutoutHeight}=${cutoutArea} → ${totalArea}cm²`,
          diagram: { type: 'area-composite-cshape', params: { outerWidth, outerHeight, cutoutWidth, cutoutHeight, cutoutY, outerArea, cutoutArea, totalArea } },
        };
      } else {
        // L-shape: existing implementation
        const outerWidth = Math.floor(Math.random() * 8) + 8; // 8-15
        const outerHeight = Math.floor(Math.random() * 8) + 8; // 8-15
        const cutoutWidth = Math.floor(Math.random() * (outerWidth - 6)) + 3; // 3 to outerWidth-3
        const cutoutHeight = Math.floor(Math.random() * (outerHeight - 6)) + 3; // 3 to outerHeight-3
        const rect1Width = outerWidth - cutoutWidth;
        const rect1Height = outerHeight;
        const rect1Area = rect1Width * rect1Height;
        const rect2Width = cutoutWidth;
        const rect2Height = outerHeight - cutoutHeight;
        const rect2Area = rect2Width * rect2Height;
        const totalArea = rect1Area + rect2Area;
        return {
          id, answer: totalArea, unit: 'cm²',
          text: `下のL字の形の面積は？（単位：cm²）`,
          textEn: `What is the area of the L-shape below? (Unit: cm²)`,
          explanation: `方法1：${rect1Width}×${rect1Height}=${rect1Area} と ${rect2Width}×${rect2Height}=${rect2Area} → 合計 ${totalArea}cm²`,
          explanationEn: `Method 1: ${rect1Width}×${rect1Height}=${rect1Area} and ${rect2Width}×${rect2Height}=${rect2Area} → Total ${totalArea}cm²`,
          diagram: { type: 'area-composite-lshape', params: { outerWidth, outerHeight, cutoutWidth, cutoutHeight, rect1Area, rect2Area, totalArea } },
        };
      }
    }
    case 'lines': {
      const type = Math.floor(Math.random() * 4);
      if (type === 0) {
        // Simple right angle counting exercise
        const rightAngleCount = Math.floor(Math.random() * 3) + 2; // 2 to 4 right angles
        return {
          id, answer: rightAngleCount, unit: '個',
          text: '下の図の直角（90°の角）は全部でいくつありますか？',
          textEn: 'How many right angles (90° angles) are in the figure below?',
          diagram: { type: 'count-right-angles', params: { count: rightAngleCount } },
        };
      } else if (type === 1) {
        return {
          id, answer: 90, unit: '°',
          text: '下の図で、2つの直線が垂直にまじわっています。アの角度は何度ですか？',
          textEn: 'Two lines meet perpendicularly. What is angle ア?',
          diagram: { type: 'perpendicular', params: {} },
        };
      } else if (type === 2) {
        const givenAngle = Math.floor(Math.random() * 60) + 30;
        return {
          id, answer: givenAngle, unit: '°',
          text: '下の図で、直線あと直線いは平行です。アの角度（同位角）は何度ですか？',
          textEn: 'Lines あ and い are parallel. What is angle ア (corresponding angle)?',
          diagram: { type: 'parallel-corresponding', params: { givenAngle } },
        };
      } else {
        const givenAngle = Math.floor(Math.random() * 60) + 30;
        return {
          id, answer: 180 - givenAngle, unit: '°',
          text: '下の図で、直線あと直線いは平行です。アの角度は何度ですか？',
          textEn: 'Lines あ and い are parallel. What is angle ア?',
          diagram: { type: 'parallel-supplementary', params: { givenAngle } },
        };
      }
    }
    case 'intersecting': {
      const givenAngle = Math.floor(Math.random() * 120) + 20;
      const rotation = Math.floor(Math.random() * 90);
      const useInteractive = Math.random() > 0.3; // 70% chance for interactive exercise

      if (useInteractive) {
        return {
          id, answer: 1, unit: '',
          text: '交わる直線の角度を調べよう！',
          textEn: 'Explore the angles of intersecting lines!',
          diagram: { type: 'intersecting-lines-interactive', params: { givenAngle, rotation } },
          isInteractive: true,
        };
      }

      const askVertical = Math.random() > 0.5;
      if (askVertical) {
        return {
          id, answer: givenAngle, unit: '°',
          text: `下の図で、角Aは${givenAngle}°です。対頂角（角C）は何度ですか？`,
          textEn: `Angle A is ${givenAngle}°. What is the vertical angle (Angle C)?`,
          diagram: { type: 'intersecting-lines', params: { givenAngle, rotation, askType: 0 } },
        };
      } else {
        return {
          id, answer: 180 - givenAngle, unit: '°',
          text: `下の図で、角Aは${givenAngle}°です。となり合う角（角B）は何度ですか？`,
          textEn: `Angle A is ${givenAngle}°. What is the adjacent angle (Angle B)?`,
          diagram: { type: 'intersecting-lines', params: { givenAngle, rotation, askType: 1 } },
        };
      }
    }
    case 'quadrilaterals': {
      const type = Math.floor(Math.random() * 8);
      if (type === 0) {
        // Interactive dotted paper quadrilateral drawing - Rectangle
        return {
          id, answer: 1, unit: '',
          text: '点字ペーパーで長方形をかこう！',
          textEn: 'Draw a rectangle on dotted paper!',
          diagram: { type: 'dotted-paper-quadrilateral', params: { requiredType: 0 } }, // 0 = rectangle
          isInteractive: true,
        };
      } else if (type === 1) {
        // Interactive dotted paper quadrilateral drawing - Square
        return {
          id, answer: 1, unit: '',
          text: '点字ペーパーで正方形をかこう！',
          textEn: 'Draw a square on dotted paper!',
          diagram: { type: 'dotted-paper-quadrilateral', params: { requiredType: 1 } }, // 1 = square
          isInteractive: true,
        };
      } else if (type === 2) {
        // Interactive dotted paper quadrilateral drawing - Trapezoid
        return {
          id, answer: 1, unit: '',
          text: '点字ペーパーで台形をかこう！',
          textEn: 'Draw a trapezoid on dotted paper!',
          diagram: { type: 'dotted-paper-quadrilateral', params: { requiredType: 2 } }, // 2 = trapezoid
          isInteractive: true,
        };
      } else if (type === 3) {
        // Interactive dotted paper quadrilateral drawing - Parallelogram
        return {
          id, answer: 1, unit: '',
          text: '点字ペーパーで平行四辺形をかこう！',
          textEn: 'Draw a parallelogram on dotted paper!',
          diagram: { type: 'dotted-paper-quadrilateral', params: { requiredType: 3 } }, // 3 = parallelogram
          isInteractive: true,
        };
      } else if (type === 4) {
        // Interactive dotted paper quadrilateral drawing - Rhombus
        return {
          id, answer: 1, unit: '',
          text: '点字ペーパーでひし形をかこう！',
          textEn: 'Draw a rhombus on dotted paper!',
          diagram: { type: 'dotted-paper-quadrilateral', params: { requiredType: 4 } }, // 4 = rhombus
          isInteractive: true,
        };
      } else if (type === 5) {
        // Interactive dotted paper quadrilateral drawing - Kite
        return {
          id, answer: 1, unit: '',
          text: '点字ペーパーでたこ形をかこう！',
          textEn: 'Draw a kite on dotted paper!',
          diagram: { type: 'dotted-paper-quadrilateral', params: { requiredType: 5 } }, // 5 = kite
          isInteractive: true,
        };
      } else if (type === 6) {
        // Parallelogram: given one angle, find adjacent
        const angle = Math.floor(Math.random() * 80) + 50;
        return {
          id, answer: 180 - angle, unit: '°',
          text: `下の平行四辺形で、1つの角が${angle}°です。となりの角は何度ですか？`,
          textEn: `One angle of this parallelogram is ${angle}°. What is the adjacent angle?`,
          diagram: { type: 'parallelogram-angle', params: { givenAngle: angle } },
        };
      } else {
        // Rhombus: given one side, find perimeter
        const side = Math.floor(Math.random() * 8) + 3;
        return {
          id, answer: side * 4, unit: 'cm',
          text: `下のひし形の1辺は${side}cmです。まわりの長さ（周の長さ）は何cmですか？`,
          textEn: `One side of this rhombus is ${side}cm. What is the perimeter?`,
          diagram: { type: 'rhombus-perimeter', params: { side } },
        };
      }
    }
    case 'diagonals': {
      const useInteractive = Math.random() > 0.3; // 70% chance for interactive

      if (useInteractive) {
        // Interactive diagonals drawing
        const shapes: ('parallelogram' | 'trapezoid' | 'kite')[] = ['parallelogram', 'trapezoid', 'kite'];
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const shapeNames: Record<string, [string, string]> = {
          parallelogram: ['平行四辺形', 'parallelogram'],
          trapezoid: ['台形', 'trapezoid'],
          kite: ['ひし形', 'rhombus'],
        };
        const [nameJa, nameEn] = shapeNames[shapeType];
        return {
          id, answer: 1, unit: '',
          text: `${nameJa}の対角線をひこう！`,
          textEn: `Draw the diagonals of the ${nameEn}!`,
          diagram: { type: 'diagonals-drawing', params: { shapeType } },
          isInteractive: true,
        };
      }

      // Polygon diagonals: n(n-3)/2
      const sides = Math.floor(Math.random() * 5) + 4; // 4 to 8 sides
      const names: Record<number, [string, string]> = {
        4: ['四角形', 'quadrilateral'],
        5: ['五角形', 'pentagon'],
        6: ['六角形', 'hexagon'],
        7: ['七角形', 'heptagon'],
        8: ['八角形', 'octagon'],
      };
      const answer = (sides * (sides - 3)) / 2;
      const [nameJa, nameEn] = names[sides] || ['多角形', 'polygon'];
      return {
        id, answer, unit: '本',
        text: `下の${nameJa}には対角線が何本ひけますか？`,
        textEn: `How many diagonals can you draw in this ${nameEn}?`,
        diagram: { type: 'polygon-diagonals', params: { sides } },
      };
    }
  }
}

export function generateQuestions(topic: Topic): Question[] {
  const questions: Question[] = [];
  const usedKeys = new Set<string>();

  let attempts = 0;
  while (questions.length < 5 && attempts < 50) {
    attempts++;
    const q = generateSingleQuestion(topic, questions.length);
    const key = JSON.stringify(q.diagram.params) + q.answer;
    if (!usedKeys.has(key)) {
      usedKeys.add(key);
      questions.push(q);
    }
  }

  while (questions.length < 5) {
    const q = generateSingleQuestion(topic, questions.length);
    q.id = questions.length;
    questions.push(q);
  }

  return questions;
}
