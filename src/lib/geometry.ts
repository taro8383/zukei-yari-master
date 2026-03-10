export type Topic = 'angles' | 'area' | 'lines';

export interface Question {
  id: number;
  text: string;
  answer: number;
  unit: string;
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
          const angle = Math.floor(Math.random() * 150) + 10;
          const answer = 180 - angle;
          questions.push({
            id: i,
            text: `一直線の上に角度があります。一つの角が ${angle}° のとき、もう一つの角は何度ですか？`,
            answer,
            unit: '°',
          });
        } else if (type === 1) {
          const a1 = Math.floor(Math.random() * 80) + 20;
          const a2 = Math.floor(Math.random() * (170 - a1 - 10)) + 10;
          const answer = 180 - a1 - a2;
          questions.push({
            id: i,
            text: `三角形の2つの角が ${a1}° と ${a2}° です。のこりの角は何度ですか？`,
            answer,
            unit: '°',
          });
        } else {
          const angle = Math.floor(Math.random() * 340) + 10;
          const answer = 360 - angle;
          questions.push({
            id: i,
            text: `円の中心の角度が ${angle}° のとき、のこりの角度は何度ですか？`,
            answer,
            unit: '°',
          });
        }
        break;
      }
      case 'area': {
        const isSquare = Math.random() > 0.5;
        if (isSquare) {
          const side = Math.floor(Math.random() * 12) + 2;
          questions.push({
            id: i,
            text: `一辺が ${side}cm の正方形の面積をもとめましょう。`,
            answer: side * side,
            unit: 'cm²',
          });
        } else {
          const w = Math.floor(Math.random() * 12) + 2;
          const h = Math.floor(Math.random() * 12) + 2;
          questions.push({
            id: i,
            text: `たてが ${h}cm、よこが ${w}cm の長方形の面積をもとめましょう。`,
            answer: w * h,
            unit: 'cm²',
          });
        }
        break;
      }
      case 'lines': {
        const type = Math.floor(Math.random() * 3);
        if (type === 0) {
          const angle = 90;
          questions.push({
            id: i,
            text: `2つの直線が垂直にまじわっています。その角度は何度ですか？`,
            answer: angle,
            unit: '°',
          });
        } else if (type === 1) {
          const givenAngle = Math.floor(Math.random() * 80) + 10;
          questions.push({
            id: i,
            text: `平行な2本の直線に別の線がまじわっています。一つの角が ${givenAngle}° のとき、同位角は何度ですか？`,
            answer: givenAngle,
            unit: '°',
          });
        } else {
          const givenAngle = Math.floor(Math.random() * 80) + 10;
          const answer = 180 - givenAngle;
          questions.push({
            id: i,
            text: `平行な2本の直線に別の線がまじわっています。一つの角が ${givenAngle}° のとき、となりの角は何度ですか？`,
            answer,
            unit: '°',
          });
        }
        break;
      }
    }
  }
  
  return questions;
}
