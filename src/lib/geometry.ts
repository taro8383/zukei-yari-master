export type Topic = 'angles' | 'area' | 'lines';

export type DiagramType =
  | 'straight-line-angle'
  | 'triangle-angle'
  | 'circle-angle'
  | 'rectangle-area'
  | 'square-area'
  | 'perpendicular'
  | 'parallel-corresponding'
  | 'parallel-supplementary';

export interface DiagramData {
  type: DiagramType;
  params: Record<string, number>;
}

export interface Question {
  id: number;
  text: string;
  answer: number;
  unit: string;
  diagram: DiagramData;
}

export interface TopicInfo {
  label: string;
  icon: string;
  goal: string;
  method: string;
  realLife: string;
  benefit: string;
}

export const TOPICS: Record<Topic, TopicInfo> = {
  angles: {
    label: '角度のけいさん',
    icon: '📐',
    goal: '角度をもとめる力をつけよう！',
    method: '三角じょうぎや分度器をつかって角度をはかるよ。一直線は180°、一回転は360°だよ。たし算やひき算で角度をもとめよう！',
    realLife: 'ゲームをつくる人は、キャラクターがジャンプする角度を計算しているよ。スケートボードのランプも角度がだいじ！',
    benefit: '角度がわかると、ものの形やうごきを正しくりかいできるようになるよ。ロボットのうでを動かす計算にもつかうんだ！',
  },
  area: {
    label: '面積のけいさん',
    icon: '📏',
    goal: '長方形と正方形の面積をもとめよう！',
    method: '長方形の面積 ＝ たて × よこ。正方形の面積 ＝ 一辺 × 一辺。単位は cm²（平方センチメートル）だよ！',
    realLife: 'マインクラフトで家をたてるとき、ゆかの広さを計算するのと同じだよ！建築家やインテリアデザイナーもつかっているよ。',
    benefit: '面積がわかると、部屋にどのくらいものがおけるかわかるし、大きな地図をよむのもとくいになるよ！',
  },
  lines: {
    label: '垂直と平行',
    icon: '📝',
    goal: '垂直（すいちょく）と平行（へいこう）を見分けよう！',
    method: '垂直 ＝ 2つの線が90°でまじわること。平行 ＝ 2つの線がどこまでいっても交わらないこと。角度をヒントにかんがえよう！',
    realLife: 'ビルのかべと地面は垂直だよ。電車のレールは平行！道路のしましま（横断歩道）も平行線なんだ。',
    benefit: '垂直と平行がわかると、図形のとくちょうがすぐ見ぬけるようになるよ。設計図をよむ力もつくんだ！',
  },
};

export function generateQuestions(topic: Topic): Question[] {
  const questions: Question[] = [];

  for (let i = 0; i < 5; i++) {
    switch (topic) {
      case 'angles': {
        const type = Math.floor(Math.random() * 3);
        if (type === 0) {
          const angle = Math.floor(Math.random() * 130) + 20;
          const answer = 180 - angle;
          questions.push({
            id: i,
            text: `下の図で、アの角度をもとめましょう。（一直線＝180°）`,
            answer,
            unit: '°',
            diagram: { type: 'straight-line-angle', params: { givenAngle: angle } },
          });
        } else if (type === 1) {
          const a1 = Math.floor(Math.random() * 60) + 30;
          const a2 = Math.floor(Math.random() * (140 - a1 - 20)) + 20;
          const answer = 180 - a1 - a2;
          questions.push({
            id: i,
            text: `下の三角形で、アの角度をもとめましょう。（三角形の内角の和＝180°）`,
            answer,
            unit: '°',
            diagram: { type: 'triangle-angle', params: { angle1: a1, angle2: a2 } },
          });
        } else {
          const angle = Math.floor(Math.random() * 300) + 30;
          const answer = 360 - angle;
          questions.push({
            id: i,
            text: `下の図で、アの角度をもとめましょう。（一回転＝360°）`,
            answer,
            unit: '°',
            diagram: { type: 'circle-angle', params: { givenAngle: angle } },
          });
        }
        break;
      }
      case 'area': {
        const isSquare = Math.random() > 0.5;
        if (isSquare) {
          const side = Math.floor(Math.random() * 10) + 2;
          questions.push({
            id: i,
            text: `下の正方形の面積をもとめましょう。`,
            answer: side * side,
            unit: 'cm²',
            diagram: { type: 'square-area', params: { side } },
          });
        } else {
          const w = Math.floor(Math.random() * 10) + 3;
          const h = Math.floor(Math.random() * 8) + 2;
          questions.push({
            id: i,
            text: `下の長方形の面積をもとめましょう。`,
            answer: w * h,
            unit: 'cm²',
            diagram: { type: 'rectangle-area', params: { width: w, height: h } },
          });
        }
        break;
      }
      case 'lines': {
        const type = Math.floor(Math.random() * 3);
        if (type === 0) {
          questions.push({
            id: i,
            text: `下の図で、2つの直線が垂直にまじわっています。アの角度は何度ですか？`,
            answer: 90,
            unit: '°',
            diagram: { type: 'perpendicular', params: {} },
          });
        } else if (type === 1) {
          const givenAngle = Math.floor(Math.random() * 60) + 30;
          questions.push({
            id: i,
            text: `下の図で、直線あと直線いは平行です。アの角度（同位角）は何度ですか？`,
            answer: givenAngle,
            unit: '°',
            diagram: { type: 'parallel-corresponding', params: { givenAngle } },
          });
        } else {
          const givenAngle = Math.floor(Math.random() * 60) + 30;
          const answer = 180 - givenAngle;
          questions.push({
            id: i,
            text: `下の図で、直線あと直線いは平行です。アの角度は何度ですか？`,
            answer,
            unit: '°',
            diagram: { type: 'parallel-supplementary', params: { givenAngle } },
          });
        }
        break;
      }
    }
  }

  return questions;
}
