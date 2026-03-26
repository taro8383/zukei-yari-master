// Reading Comprehension Section - MEXT 4th Grade
import { ReadingTopic, ReadingTopicInfo, ReadingQuestion } from './japanese/types';

export const READING_TOPICS: Record<ReadingTopic, ReadingTopicInfo> = {
  'subject-predicate': {
    id: 'subject-predicate',
    icon: '📍',
    label: '主語と述語',
    labelEn: 'Subject & Predicate',
    description: '文の主語と述語を見分けよう',
    descriptionEn: 'Identify subject and predicate',
    goal: '文の主語（だれが・なにが）と述語（どうした）を見分けられるようになる',
    goalEn: 'Distinguish subject (who/what) and predicate (what happened) in sentences',
    method: '「～は」「～が」で主語を、「～です」「～ます」で述語を見つける',
    methodEn: 'Find subject with "~wa/~ga" and predicate with "~desu/~masu"',
    realLife: '友だちの話を聞くとき、誰が何をしたか整理する',
    realLifeEn: 'Organizing who did what when listening to friends',
    benefit: '文章の構造がわかり、読解力が上がる',
    benefitEn: 'Understand sentence structure and improve reading comprehension',
  },
  'paragraph-main': {
    id: 'paragraph-main',
    icon: '📋',
    label: '段落と要点',
    labelEn: 'Paragraphs & Main Points',
    description: '段落の重要な部分を見つけよう',
    descriptionEn: 'Find the important parts of paragraphs',
    goal: '段落の重要な内容（要点）を見つけられるようになる',
    goalEn: 'Find the main points of paragraphs',
    method: '段落のはじめやおわりに重要なことが書いてあることが多い',
    methodEn: 'Important information is often at the beginning or end of paragraphs',
    realLife: '本のあらすじを読むとき、物語の流れをつかむ',
    realLifeEn: 'Grasp the flow of a story when reading summaries',
    benefit: '長い文章でも要点を素早くつかめるようになる',
    benefitEn: 'Quickly grasp main points even in long texts',
  },
  'character-feelings': {
    id: 'character-feelings',
    icon: '💭',
    label: '登場人物の気持ち',
    labelEn: 'Character Feelings',
    description: '話の中の人の気持ちを読み取ろう',
    descriptionEn: 'Read characters\' feelings from stories',
    goal: '物語の登場人物の気持ちを文章から読み取れるようになる',
    goalEn: 'Read characters\' feelings from story text',
    method: '「うれしそうに」「しかつめらしく」などの様子や行動から推測する',
    methodEn: 'Infer from descriptions like "happily", "seriously" and actions',
    realLife: '絵本や小説を読むとき、キャラクターの心情を理解する',
    realLifeEn: 'Understand character emotions when reading books',
    benefit: '物語をより深く理解し、感情の豊かさが増す',
    benefitEn: 'Understand stories more deeply and develop emotional richness',
  },
  'scene-setting': {
    id: 'scene-setting',
    icon: '🌅',
    label: '情景の読み取り',
    labelEn: 'Scene Setting',
    description: '文章から場面や季節を想像しよう',
    descriptionEn: 'Imagine scenes and seasons from text',
    goal: '文章から季節や場所、時間を想像できるようになる',
    goalEn: 'Imagine seasons, places, and time from text',
    method: '「紅葉」「蝉の声」「雪」などの言葉から季節を判断する',
    methodEn: 'Judge seasons from words like "autumn leaves", "cicadas", "snow"',
    realLife: '小説を読むとき、頭の中で場面をイメージする',
    realLifeEn: 'Visualize scenes in your mind when reading novels',
    benefit: '読書がより楽しくなり、想像力が育つ',
    benefitEn: 'Reading becomes more enjoyable and imagination develops',
  },
  'explanatory-structure': {
    id: 'explanatory-structure',
    icon: '🏗️',
    label: '説明文の組み立て',
    labelEn: 'Explanatory Structure',
    description: '説明文の構成を理解しよう',
    descriptionEn: 'Understand explanatory text structure',
    goal: '説明文の「はじめ・本論・まとめ」の構成を理解する',
    goalEn: 'Understand the introduction-body-conclusion structure of explanatory text',
    method: 'はじめにテーマ、本論に具体例と説明、まとめに結論を書く',
    methodEn: 'Theme in intro, examples and explanations in body, conclusion at end',
    realLife: '科学の実験結果や調べ学習の発表をまとめるときに使う',
    realLifeEn: 'Used when summarizing science experiments and research presentations',
    benefit: '論理的に物事を説明できるようになる',
    benefitEn: 'Be able to explain things logically',
  },
};

const SAMPLE_PASSAGES = [
  {
    text: '昨日、けいくんは公園に行きました。そこで新しい友だちと会いました。二人でサッカーをしました。とても楽しかったです。',
    textEn: 'Yesterday, Kei went to the park. There, he met a new friend. They played soccer together. It was very fun.',
    sentences: ['昨日、けいくんは公園に行きました。', 'そこで新しい友だちと会いました。', '二人でサッカーをしました。', 'とても楽しかったです。'],
    subject: 'けいくん',
    predicate: '公園に行きました',
    mainIdea: 'けいくんは公園で友だちとサッカーを楽しんだ。',
    mainIdeaEn: 'Kei enjoyed playing soccer with a friend at the park.'
  },
  {
    text: '春になると、桜の花が咲きます。ピンク色の花がとてもきれいです。多くの人が花見に来ます。',
    textEn: 'In spring, cherry blossoms bloom. The pink flowers are very beautiful. Many people come to see them.',
    sentences: ['春になると、桜の花が咲きます。', 'ピンク色の花がとてもきれいです。', '多くの人が花見に来ます。'],
    subject: '桜の花',
    predicate: '咲きます',
    mainIdea: '春に桜が咲いて、人々が花見を楽しむ。',
    mainIdeaEn: 'Cherry blossoms bloom in spring and people enjoy viewing them.'
  },
  {
    text: 'みつきさんは動物が大好きです。家には犬と猫がいます。毎日、動物たちの世話をしています。',
    textEn: 'Mitsuki loves animals. She has a dog and a cat at home. She takes care of them every day.',
    sentences: ['みつきさんは動物が大好きです。', '家には犬と猫がいます。', '毎日、動物たちの世話をしています。'],
    subject: 'みつきさん',
    predicate: '動物が大好きです',
    mainIdea: 'みつきさんは動物が好きで、犬と猫の世話をしている。',
    mainIdeaEn: 'Mitsuki loves animals and takes care of her dog and cat.'
  },
  {
    text: 'けんたくんは野球部のキャプテンです。毎朝、早く起きて練習しています。大会で優勝したいです。',
    textEn: 'Kenta is the captain of the baseball team. He wakes up early every morning to practice. He wants to win the tournament.',
    sentences: ['けんたくんは野球部のキャプテンです。', '毎朝、早く起きて練習しています。', '大会で優勝したいです。'],
    subject: 'けんたくん',
    predicate: '野球部のキャプテンです',
    mainIdea: 'けんたくんは野球部のキャプテンとして優勝を目指して練習している。',
    mainIdeaEn: 'Kenta practices hard as baseball captain to win the tournament.'
  },
  {
    text: 'ゆいさんは絵を描くのが得意です。美術の時間に、いつも素晴らしい絵を描きます。将来は画家になりたいです。',
    textEn: 'Yui is good at drawing. She always draws wonderful pictures in art class. She wants to become a painter in the future.',
    sentences: ['ゆいさんは絵を描くのが得意です。', '美術の時間に、いつも素晴らしい絵を描きます。', '将来は画家になりたいです。'],
    subject: 'ゆいさん',
    predicate: '絵を描くのが得意です',
    mainIdea: 'ゆいさんは絵が上手で、将来画家になりたいと思っている。',
    mainIdeaEn: 'Yui is good at drawing and wants to become a painter.'
  },
  {
    text: 'わたしたちの学校では、毎年運動会を行います。生徒みんなで競技に参加します。とても盛り上がります。',
    textEn: 'Our school holds a sports festival every year. All students participate in events. It is very exciting.',
    sentences: ['わたしたちの学校では、毎年運動会を行います。', '生徒みんなで競技に参加します。', 'とても盛り上がります。'],
    subject: 'わたしたちの学校',
    predicate: '運動会を行います',
    mainIdea: '学校の運動会は生徒全員が参加して盛り上がる。',
    mainIdeaEn: 'The school sports festival is exciting with all students participating.'
  },
  {
    text: 'たくみくんはパズルが大好きです。難しいパズルでも、諦めずに取り組みます。完成したときの喜びはひとしおです。',
    textEn: 'Takumi loves puzzles. Even difficult ones, he works on without giving up. The joy of completion is especially great.',
    sentences: ['たくみくんはパズルが大好きです。', '難しいパズルでも、諦めずに取り組みます。', '完成したときの喜びはひとしおです。'],
    subject: 'たくみくん',
    predicate: 'パズルが大好きです',
    mainIdea: 'たくみくんはパズルが好きで、難しくても諦めずに完成させる。',
    mainIdeaEn: 'Takumi loves puzzles and completes them without giving up.'
  },
  {
    text: 'わたしの町には大きな図書館があります。静かで本がたくさんあります。週末によく勉強しに行きます。',
    textEn: 'There is a large library in my town. It is quiet and has many books. I often go there to study on weekends.',
    sentences: ['わたしの町には大きな図書館があります。', '静かで本がたくさんあります。', '週末によく勉強しに行きます。'],
    subject: 'わたしの町',
    predicate: '大きな図書館があります',
    mainIdea: '町の図書館は静かで本が多く、週末に勉強しに行く。',
    mainIdeaEn: 'The town library is quiet with many books, and I study there on weekends.'
  },
];

const EMOTION_SCENARIOS = [
  { text: 'けいくんは試験で100点を取りました。', textEn: 'Kei got 100 points on the test.', emotion: 'うれしい', emotionEn: 'happy' },
  { text: 'けいくんの犬がいなくなりました。', textEn: 'Kei\'s dog went missing.', emotion: 'さびしい', emotionEn: 'sad' },
  { text: '暗い夜道を一人で歩いています。', textEn: 'Walking alone on a dark road at night.', emotion: 'こわい', emotionEn: 'scared' },
  { text: '友だちにひみつをばらされました。', textEn: 'A friend revealed Kei\'s secret.', emotion: 'おこる', emotionEn: 'angry' },
  { text: '大切な時計をなくしてしまいました。', textEn: 'Lost a precious watch.', emotion: 'こまる', emotionEn: 'troubled' },
  { text: '初めての舞台で成功しました。', textEn: 'Succeeded in the first stage performance.', emotion: 'ほっとする', emotionEn: 'relieved' },
  { text: '知らない人に話しかけられました。', textEn: 'A stranger talked to me.', emotion: 'びっくり', emotionEn: 'surprised' },
  { text: '大きい犬に追いかけられました。', textEn: 'Chased by a big dog.', emotion: 'こわい', emotionEn: 'scared' },
  { text: '期待していたプレゼントをもらいました。', textEn: 'Received the present I was hoping for.', emotion: 'うれしい', emotionEn: 'happy' },
  { text: '大切な試合で負けてしまいました。', textEn: 'Lost an important match.', emotion: 'くやしい', emotionEn: 'frustrated' },
  { text: '友だちが転んでけがをしました。', textEn: 'A friend fell and got hurt.', emotion: 'しんぱい', emotionEn: 'worried' },
  { text: '先生にほめられました。', textEn: 'Praised by the teacher.', emotion: 'うれしい', emotionEn: 'happy' },
];

const SCENE_DESCRIPTIONS = [
  { text: '木々の葉が赤や黄色に染まっていました。', textEn: 'The tree leaves were dyed red and yellow.', season: '秋', seasonEn: 'autumn', time: '夕方' },
  { text: '蝉が鳴き声を響かせていました。', textEn: 'Cicadas were making their sounds.', season: '夏', seasonEn: 'summer', time: '昼' },
  { text: '雪がしんしんと降っていました。', textEn: 'Snow was falling heavily.', season: '冬', seasonEn: 'winter', time: '朝' },
  { text: '梅の花がほのかに香っていました。', textEn: 'Plum blossoms were faintly fragrant.', season: '春', seasonEn: 'spring', time: '朝' },
  { text: 'ホタルが闇の中で光っていました。', textEn: 'Fireflies were glowing in the darkness.', season: '夏', seasonEn: 'summer', time: '夜' },
  { text: '山の頂上に白い雪が積もっていました。', textEn: 'White snow covered the mountain peak.', season: '冬', seasonEn: 'winter', time: '朝' },
  { text: '桜の花びらが風に舞っていました。', textEn: 'Cherry blossom petals danced in the wind.', season: '春', seasonEn: 'spring', time: '昼' },
  { text: 'コオロギの声が聞こえてきました。', textEn: 'The sound of crickets could be heard.', season: '秋', seasonEn: 'autumn', time: '夜' },
  { text: 'ひまわりが太陽の方を向いていました。', textEn: 'Sunflowers faced the sun.', season: '夏', seasonEn: 'summer', time: '昼' },
  { text: '紅葉した山を眺めていました。', textEn: 'Gazing at the autumn-colored mountain.', season: '秋', seasonEn: 'autumn', time: '夕方' },
  { text: '菜の花が一面に咲いていました。', textEn: 'Rapeseed flowers bloomed everywhere.', season: '春', seasonEn: 'spring', time: '昼' },
  { text: '霜が道一面に降りていました。', textEn: 'Frost covered the entire path.', season: '冬', seasonEn: 'winter', time: '朝' },
];

export function generateSubjectPredicateQuestions(count: number = 5): ReadingQuestion[] {
  const questions: ReadingQuestion[] = [];
  const usedSentences = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 10;

  while (questions.length < count && attempts < maxAttempts) {
    attempts++;
    const passage = SAMPLE_PASSAGES[Math.floor(Math.random() * SAMPLE_PASSAGES.length)];
    const targetSentence = passage.sentences[Math.floor(Math.random() * passage.sentences.length)];

    if (usedSentences.has(targetSentence)) continue;
    usedSentences.add(targetSentence);

    questions.push({
      id: questions.length + 1,
      topic: 'subject-predicate',
      text: `次の文の主語と述語を選びましょう。「${targetSentence}」`,
      textEn: `Select the subject and predicate: "${targetSentence}"`,
      explanation: `「${passage.subject}」が主語で、「${passage.predicate}」が述語です。`,
      explanationEn: `"${passage.subject}" is the subject and "${passage.predicate}" is the predicate.`,
      answer: passage.subject,
      options: [passage.subject, passage.predicate, '公園', '友だち'].sort(() => Math.random() - 0.5),
      difficulty: 'easy'
    });
  }
  return questions;
}

export function generateParagraphMainQuestions(count: number = 5): ReadingQuestion[] {
  const questions: ReadingQuestion[] = [];
  const usedPassages = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 10;

  while (questions.length < count && attempts < maxAttempts) {
    attempts++;
    const passage = SAMPLE_PASSAGES[Math.floor(Math.random() * SAMPLE_PASSAGES.length)];

    if (usedPassages.has(passage.text)) continue;
    usedPassages.add(passage.text);

    questions.push({
      id: questions.length + 1,
      topic: 'paragraph-main',
      passage: passage.text,
      passageEn: passage.textEn,
      text: 'この文章の最も重要な内容を選びましょう。',
      textEn: 'Select the most important content of this passage.',
      explanation: `この文章の要点は「${passage.mainIdea}」です。`,
      explanationEn: `The main point is "${passage.mainIdeaEn}".`,
      answer: passage.mainIdea,
      options: [passage.mainIdea, passage.sentences[0], passage.sentences[1], '桜が咲きました'].sort(() => Math.random() - 0.5),
      difficulty: 'medium'
    });
  }
  return questions;
}

export function generateCharacterFeelingQuestions(count: number = 5): ReadingQuestion[] {
  const questions: ReadingQuestion[] = [];
  const usedScenarios = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 10;

  while (questions.length < count && attempts < maxAttempts) {
    attempts++;
    const scenario = EMOTION_SCENARIOS[Math.floor(Math.random() * EMOTION_SCENARIOS.length)];

    if (usedScenarios.has(scenario.text)) continue;
    usedScenarios.add(scenario.text);

    const allEmotions = EMOTION_SCENARIOS.map(s => s.emotion);

    questions.push({
      id: questions.length + 1,
      topic: 'character-feelings',
      text: scenario.text,
      textEn: scenario.textEn,
      explanation: `「${scenario.text}」という状況から、「${scenario.emotion}」と感じていることがわかります。`,
      explanationEn: `From "${scenario.textEn}", we can tell the feeling is "${scenario.emotionEn}".`,
      answer: scenario.emotion,
      emotionOptions: allEmotions.sort(() => Math.random() - 0.5).slice(0, 4),
      difficulty: 'medium'
    });
  }
  return questions;
}

export function generateSceneSettingQuestions(count: number = 5): ReadingQuestion[] {
  const questions: ReadingQuestion[] = [];
  const usedScenes = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 10;

  while (questions.length < count && attempts < maxAttempts) {
    attempts++;
    const scene = SCENE_DESCRIPTIONS[Math.floor(Math.random() * SCENE_DESCRIPTIONS.length)];

    if (usedScenes.has(scene.text)) continue;
    usedScenes.add(scene.text);

    const allSeasons = [...new Set(SCENE_DESCRIPTIONS.map(s => s.season))];

    questions.push({
      id: questions.length + 1,
      topic: 'scene-setting',
      text: `「${scene.text}」この文章から読み取れる季節は何ですか？`,
      textEn: `What season can you tell from "${scene.textEn}"?`,
      explanation: `「${scene.text}」という描写から「${scene.season}」であることがわかります。`,
      explanationEn: `From "${scene.textEn}", we can tell it's "${scene.seasonEn}".`,
      answer: scene.season,
      options: allSeasons.sort(() => Math.random() - 0.5),
      difficulty: 'easy'
    });
  }
  return questions;
}

export function generateExplanatoryStructureQuestions(count: number = 5): ReadingQuestion[] {
  const structures = [
    { part: '昆虫には、トンボやバッタなどがいます。', type: '具体例', typeEn: 'example' },
    { part: '昆虫は6本の足を持っています。', type: '本論', typeEn: 'main point' },
    { part: '昆虫について説明しましょう。', type: 'はじめ', typeEn: 'introduction' },
    { part: '昆虫は体を3つの部分に分けられます。', type: '本論', typeEn: 'main point' },
    { part: 'このように昆虫は特徴的な体の構造を持っています。', type: 'まとめ', typeEn: 'conclusion' },
    { part: '水は加熱すると蒸気になります。', type: '本論', typeEn: 'main point' },
    { part: '今回の実験では、水の状態変化を調べます。', type: 'はじめ', typeEn: 'introduction' },
    { part: '氷、水、蒸気の三態を観察しました。', type: '具体例', typeEn: 'example' },
    { part: '以上のように、温度によって水の形が変わります。', type: 'まとめ', typeEn: 'conclusion' },
    { part: '植物は光合成を行います。', type: '本論', typeEn: 'main point' },
    { part: '葉緑素を持つ植物の例を挙げます。', type: '具体例', typeEn: 'example' },
    { part: '光合成について学びましょう。', type: 'はじめ', typeEn: 'introduction' },
  ];

  const questions: ReadingQuestion[] = [];
  const usedStructures = new Set<number>();
  let attempts = 0;
  const maxAttempts = count * 10;

  while (questions.length < count && attempts < maxAttempts) {
    attempts++;
    const structureIndex = Math.floor(Math.random() * structures.length);

    if (usedStructures.has(structureIndex)) continue;
    usedStructures.add(structureIndex);

    const structure = structures[structureIndex];
    questions.push({
      id: questions.length + 1,
      topic: 'explanatory-structure',
      text: `「${structure.part}」この文は説明文のどの部分ですか？`,
      textEn: `Which part of explanatory text is "${structure.part}"?`,
      explanation: `これは「${structure.type}」です。`,
      explanationEn: `This is the "${structure.typeEn}".`,
      answer: structure.type,
      options: ['はじめ', '本論', '具体例', 'まとめ'].sort(() => Math.random() - 0.5),
      difficulty: 'hard'
    });
  }
  return questions;
}

export function generateReadingQuestions(topic: ReadingTopic, count: number = 5): ReadingQuestion[] {
  switch (topic) {
    case 'subject-predicate':
      return generateSubjectPredicateQuestions(count);
    case 'paragraph-main':
      return generateParagraphMainQuestions(count);
    case 'character-feelings':
      return generateCharacterFeelingQuestions(count);
    case 'scene-setting':
      return generateSceneSettingQuestions(count);
    case 'explanatory-structure':
      return generateExplanatoryStructureQuestions(count);
    default:
      return [];
  }
}
