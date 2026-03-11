export type Topic = 'angles' | 'area' | 'lines' | 'intersecting' | 'quadrilaterals' | 'diagonals';

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
  | 'polygon-diagonals';

export interface DiagramData {
  type: DiagramType;
  params: Record<string, number>;
}

export interface Question {
  id: number;
  text: string;
  textEn: string;
  answer: number;
  unit: string;
  diagram: DiagramData;
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
  area: {
    label: '面積のけいさん',
    labelEn: 'Calculating Area',
    icon: '📏',
    goal: '長方形と正方形の面積をもとめよう！',
    goalEn: 'Find the area of rectangles and squares!',
    method: '長方形の面積 ＝ たて × よこ。正方形の面積 ＝ 一辺 × 一辺。単位は cm²（平方センチメートル）だよ！',
    methodEn: 'Rectangle area = length × width. Square area = side × side. The unit is cm² (square centimeters)!',
    realLife: 'マインクラフトで家をたてるとき、ゆかの広さを計算するのと同じだよ！建築家やインテリアデザイナーもつかっているよ。',
    realLifeEn: 'It\'s like calculating floor space when building a house in Minecraft! Architects and interior designers use this too.',
    benefit: '面積がわかると、部屋にどのくらいものがおけるかわかるし、大きな地図をよむのもとくいになるよ！',
    benefitEn: 'Knowing area helps you figure out how much fits in a room, and makes you better at reading maps!',
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
    goal: '台形・平行四辺形・ひし形を見分けよう！',
    goalEn: 'Identify trapezoids, parallelograms, and rhombuses!',
    method: '台形＝1組の辺が平行。平行四辺形＝2組の辺が平行で、向かい合う角が同じ。ひし形＝4つの辺が全部同じ長さ。',
    methodEn: 'Trapezoid = 1 pair of parallel sides. Parallelogram = 2 pairs of parallel sides, opposite angles equal. Rhombus = all 4 sides equal.',
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
    case 'area': {
      const isSquare = Math.random() > 0.5;
      if (isSquare) {
        const side = Math.floor(Math.random() * 10) + 2;
        return {
          id, answer: side * side, unit: 'cm²',
          text: '下の正方形の面積をもとめましょう。',
          textEn: 'Find the area of the square below.',
          diagram: { type: 'square-area', params: { side } },
        };
      } else {
        const w = Math.floor(Math.random() * 10) + 3;
        const h = Math.floor(Math.random() * 8) + 2;
        return {
          id, answer: w * h, unit: 'cm²',
          text: '下の長方形の面積をもとめましょう。',
          textEn: 'Find the area of the rectangle below.',
          diagram: { type: 'rectangle-area', params: { width: w, height: h } },
        };
      }
    }
    case 'lines': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        return {
          id, answer: 90, unit: '°',
          text: '下の図で、2つの直線が垂直にまじわっています。アの角度は何度ですか？',
          textEn: 'Two lines meet perpendicularly. What is angle ア?',
          diagram: { type: 'perpendicular', params: {} },
        };
      } else if (type === 1) {
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
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        // Parallelogram: given one angle, find adjacent
        const angle = Math.floor(Math.random() * 80) + 50;
        return {
          id, answer: 180 - angle, unit: '°',
          text: `下の平行四辺形で、1つの角が${angle}°です。となりの角は何度ですか？`,
          textEn: `One angle of this parallelogram is ${angle}°. What is the adjacent angle?`,
          diagram: { type: 'parallelogram-angle', params: { givenAngle: angle } },
        };
      } else if (type === 1) {
        // Trapezoid: given 2 angles on one parallel side, find a third
        const a1 = Math.floor(Math.random() * 60) + 50;
        const a2 = 180 - a1;
        return {
          id, answer: a2, unit: '°',
          text: `下の台形で、角Aは${a1}°です。角Bは何度ですか？（直線あと直線いは平行）`,
          textEn: `In this trapezoid, angle A is ${a1}°. What is angle B? (Lines あ and い are parallel)`,
          diagram: { type: 'trapezoid-angle', params: { angle1: a1 } },
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
