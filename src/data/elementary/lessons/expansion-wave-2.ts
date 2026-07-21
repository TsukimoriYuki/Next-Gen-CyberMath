import { plain } from "@/data/elementary/inline";
import { ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS } from "@/data/elementary/problems/expansion-wave-2";
import type { ElementaryInlineContent, ElementaryLesson } from "@/types/elementary-content";

type ExampleSeed = Readonly<{
  prompt: string;
  steps: readonly [string, string];
  answer: string;
  check: string;
}>;

type MathLessonSeed = Readonly<{
  id: string;
  slug: string;
  unitId: string;
  order: number;
  title: string;
  description: string;
  goals: readonly [string, string, string];
  entryId: string;
  objectiveIds: readonly string[];
  assetId: string;
  opening: string;
  misconception: string;
  misconceptionReason: string;
  teacherQuestion: string;
  learnerNotice: string;
  explanation: readonly [string, string, string];
  keyPoints: readonly [string, string, string];
  exampleOne: ExampleSeed;
  exampleTwo: ExampleSeed;
  commonMistake: string;
  retryPrompt: string;
  retryResponse: string;
  selfExplanation: string;
  nextLessonId?: string;
}>;

const asPlain = (values: readonly string[]): readonly ElementaryInlineContent[] => values.map(plain);

function createMathLesson(seed: MathLessonSeed): ElementaryLesson {
  const misconceptionId = `${seed.slug}-misconception`;
  const misconceptionLineId = `${seed.slug}-misconception-line`;
  const problemIds = ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS
    .filter((problem) => problem.lessonIds.includes(seed.id))
    .map((problem) => problem.id);

  return {
    id: seed.id,
    slug: seed.slug,
    grade: "grade-3",
    subject: "math",
    courseType: "regular",
    unitId: seed.unitId,
    order: seed.order,
    title: plain(seed.title),
    description: plain(seed.description),
    goals: asPlain(seed.goals),
    estimatedMinutes: 40,
    prerequisiteLessonIds: [],
    ...(seed.nextLessonId ? { nextLessonId: seed.nextLessonId } : {}),
    curriculumReferenceIds: [seed.entryId],
    curriculumObjectiveIds: seed.objectiveIds,
    requirementCoverage: [{
      entryId: seed.entryId,
      objectiveIds: seed.objectiveIds,
      lessonCoverage: "partial",
      assessmentCoverage: "partial",
    }],
    enrichmentReferenceIds: [],
    visualAssetIds: [seed.assetId],
    problemIds,
    publicationStatus: "hidden",
    reviewStatus: "pilot",
    sourceType: "original",
    copyrightStatus: "original",
    blocks: [
      { id: `${seed.slug}-opening`, type: "opening-question", question: plain(seed.opening) },
      { id: `${seed.slug}-goals`, type: "learning-goals", items: asPlain(seed.goals) },
      {
        id: `${seed.slug}-prediction-dialogue`,
        type: "dialogue",
        title: plain("まず、予想しよう"),
        purpose: "はじめの予想と、よくあるまちがいを見直す",
        lines: [
          { id: misconceptionLineId, speakerId: "hinano", intent: "misconception", emotion: "thinking", misconceptionId, content: plain(seed.misconception), rationale: plain(seed.misconceptionReason) },
          { id: `${seed.slug}-teacher-question`, speakerId: "tomiyama", intent: "prompt", emotion: "encouraging", relatedLineId: misconceptionLineId, content: plain(seed.teacherQuestion) },
          { id: `${seed.slug}-learner-notice`, speakerId: "hinano", intent: "prediction", emotion: "curious", content: plain(seed.learnerNotice) },
          { id: `${seed.slug}-teacher-guide`, speakerId: "tomiyama", intent: "hint", emotion: "encouraging", content: plain("図のしるしと、もとになる数をじゅんにたしかめよう。") },
        ],
      },
      {
        id: `${seed.slug}-visual`,
        type: "visual",
        title: plain("図でたしかめよう"),
        assetId: seed.assetId,
        fallbackText: plain(seed.explanation[0]),
        creditDisplay: "credits-page",
        visualPurpose: "concept-explanation",
      },
      { id: `${seed.slug}-explanation`, type: "explanation", title: plain("じゅんに考えよう"), paragraphs: asPlain(seed.explanation) },
      {
        id: `${seed.slug}-example-one`, type: "guided-example", title: plain("いっしょに考える①"), prompt: plain(seed.exampleOne.prompt),
        steps: seed.exampleOne.steps.map((step, index) => ({ id: `${seed.slug}-example-one-${index + 1}`, content: plain(step) })),
        answer: plain(seed.exampleOne.answer), check: plain(seed.exampleOne.check),
      },
      {
        id: `${seed.slug}-example-two`, type: "guided-example", title: plain("いっしょに考える②"), prompt: plain(seed.exampleTwo.prompt),
        steps: seed.exampleTwo.steps.map((step, index) => ({ id: `${seed.slug}-example-two-${index + 1}`, content: plain(step) })),
        answer: plain(seed.exampleTwo.answer), check: plain(seed.exampleTwo.check),
      },
      { id: `${seed.slug}-key-points`, type: "key-point", title: plain("ここが大切"), points: asPlain(seed.keyPoints) },
      { id: `${seed.slug}-common-mistake`, type: "explanation", title: plain("よくあるまちがい"), paragraphs: [plain(seed.commonMistake)] },
      {
        id: `${seed.slug}-retry`, type: "retry", title: plain("もう一度、考えよう"), originalMisconceptionId: misconceptionId, prompt: plain(seed.retryPrompt),
        response: { id: `${seed.slug}-retry-line`, speakerId: "hinano", intent: "retry", emotion: "confident", relatedLineId: misconceptionLineId, content: plain(seed.retryResponse) },
      },
      {
        id: `${seed.slug}-self-explanation`, type: "dialogue", title: plain("自分のことばで言おう"), purpose: "考え方を自分のことばにする",
        lines: [
          { id: `${seed.slug}-self-prompt`, speakerId: "tomiyama", intent: "prompt", emotion: "encouraging", content: plain("どこに目をつけたかも入れて、考え方を話せるかな？") },
          { id: `${seed.slug}-self-answer`, speakerId: "hinano", intent: "self-explanation", emotion: "confident", content: plain(seed.selfExplanation) },
          { id: `${seed.slug}-self-check`, speakerId: "tomiyama", intent: "deepening", emotion: "encouraging", content: plain("いいね。図や式にもどしてたしかめると、もっとたしかになるね。") },
          { id: `${seed.slug}-self-close`, speakerId: "hinano", intent: "acknowledgement", emotion: "happy", content: plain("答えだけでなく、わけもたしかめるね。") },
        ],
      },
      { id: `${seed.slug}-summary`, type: "summary", items: asPlain(seed.keyPoints) },
      {
        id: `${seed.slug}-practice`, type: "practice-set", title: plain("れんしゅう問題"), introduction: plain("8問で、今日の考え方をたしかめます。"), problemIds,
        minimumScoreMessage: plain("あわてなくてだいじょうぶ。せつめいを見て、もう一度考えよう。"),
        completionMessage: plain("さいごまで考えられました。できたところをたしかめよう。"),
      },
    ],
  };
}

const LESSON_SEEDS: readonly MathLessonSeed[] = [
  {
    id: "elementary-grade-3-math-read-large-numbers", slug: "read-large-numbers", unitId: "g3-math-large-numbers-unit", order: 1,
    title: "10000より大きい数は、どう読むの？", description: "万のくらいまでの数を、くらいと0のやくわりに気をつけて読み書きします。",
    goals: ["万までの数を読んだり書いたりする", "数字のくらいとねうちを見つける", "数直線や10ばいで大きさを考える"],
    entryId: "g3-math-whole-numbers", objectiveIds: ["g3-math-whole-numbers-knowledge", "g3-math-whole-numbers-thinking"], assetId: "large-number-place-value-chart",
    opening: "30005の0には、どんなやくわりがあるのかな。", misconception: "0は読まないから、30005は305でいいのかな。", misconceptionReason: "声に出さない0は、書かなくてもよいと考えた。",
    teacherQuestion: "0をぬくと、5はどのくらいへうつるかな？", learnerNotice: "305だと5は一のくらいだけど、30005では万のくらいまであるね。",
    explanation: ["数は、一・十・百・千・万のくらいへ右からじゅんに数字をおきます。", "0は、そのくらいに数がないことをしめし、ほかの数字のばしょをたもちます。", "同じけた数なら、左のくらいからじゅんにくらべます。"],
    keyPoints: ["右から一・十・百・千・万", "0もくらいのばしょをたもつ", "大きさは左のくらいからくらべる"],
    exampleOne: { prompt: "四万三千二十を数字で書きます。", steps: ["四万は40000、三千は3000です。", "十は20、一は0なので43020です。"], answer: "43020", check: "くらいの表へ4・3・0・2・0とおきます。" },
    exampleTwo: { prompt: "38240と38199をくらべます。", steps: ["万のくらいはどちらも3、千のくらいはどちらも8です。", "百のくらいは2と1なので38240が大きいです。"], answer: "38240の方が大きい", check: "左からはじめて、はじめにちがうくらいを見ます。" },
    commonMistake: "0をとばして数字を書くと、後ろの数字のくらいがかわります。くらいの表に一つずつおきましょう。",
    retryPrompt: "30005を、万・千・百・十・一のくらいに分けて言い直しましょう。", retryResponse: "万が3、千・百・十が0、一が5だから、30005です。", selfExplanation: "0もくらいのばしょをたもつので、数字を右からじゅんにおきます。",
  },
  {
    id: "elementary-grade-3-math-large-number-addition-subtraction", slug: "large-number-addition-subtraction", unitId: "g3-math-addition-subtraction-unit", order: 1,
    title: "大きな数のたし算とひき算", description: "くらいをそろえ、くり上がりやくり下がりをたしかめて計算します。",
    goals: ["くらいをそろえてひっ算を書く", "くり上がりとくり下がりを正しく行う", "見つもりと反対の計算でたしかめる"],
    entryId: "g3-math-addition-subtraction", objectiveIds: ["g3-math-addition-subtraction-knowledge", "g3-math-addition-subtraction-thinking"], assetId: "addition-subtraction-columns",
    opening: "2345＋408で、408はどこから書けばよいのかな。", misconception: "左のはしをそろえれば、数字がきれいにならぶよ。", misconceptionReason: "数字の見た目をそろえることと、くらいをそろえることを同じと考えた。",
    teacherQuestion: "408の8は、2345のどの数字と同じくらいかな？", learnerNotice: "8も5も一のくらいだから、右のはしをそろえるんだ。",
    explanation: ["ひっ算は、一のくらいどうし、十のくらいどうしをたてにそろえます。", "10になったら一つ上のくらいへくり上げ、ひけないときは上のくらいからくり下げます。", "およその答えを見つもり、たし算とひき算の反対の計算でもたしかめます。"],
    keyPoints: ["同じくらいをたてにそろえる", "0の列もとばさない", "見つもりと反対の計算でたしかめる"],
    exampleOne: { prompt: "2347＋1526を計算します。", steps: ["一のくらいは7＋6＝13で、3を書き1をくり上げます。", "十・百・千もじゅんにたして3873です。"], answer: "3873", check: "およそ2300＋1500＝3800なので近い答えです。" },
    exampleTwo: { prompt: "4205−1832を計算します。", steps: ["一のくらいは5−2＝3、十のくらいは0から3をひけないのでくり下げます。", "0がある列もじゅんにくり下げて2373です。"], answer: "2373", check: "2373＋1832＝4205です。" },
    commonMistake: "0のある列をとばすと答えがずれます。くらいごとに、くり下げたあとの数字を書き直しましょう。",
    retryPrompt: "2345＋408で、8をどこへそろえるか言い直しましょう。", retryResponse: "8は一のくらいだから、2345の5の下にそろえます。", selfExplanation: "ひっ算では、数字の数ではなく、同じくらいをたてにそろえます。",
  },
  {
    id: "elementary-grade-3-math-two-digit-times-one-digit", slug: "two-digit-times-one-digit", unitId: "g3-math-written-multiplication-unit", order: 1,
    nextLessonId: "elementary-grade-3-math-three-digit-times-one-digit",
    title: "かけ算のひっ算は、どう考えるの？", description: "2けたの数を十と一に分け、図とひっ算をつなげます。",
    goals: ["2けたの数を十と一に分ける", "ぶぶんの答えを合わせる", "くり上がりのあるひっ算をたしかめる"],
    entryId: "g3-math-multiplication", objectiveIds: ["g3-math-multiplication-knowledge", "g3-math-multiplication-thinking"], assetId: "multiplication-decomposition-array",
    opening: "24×3は、24をどのように分けると考えやすいかな。", misconception: "2×3と4×3をたして、18かな。", misconceptionReason: "2が十のくらいにあることをわすれ、2として計算した。",
    teacherQuestion: "24の2は、2ではなく何を表しているかな？", learnerNotice: "十のくらいだから20だ。20×3と4×3に分けるんだね。",
    explanation: ["24は20と4に分けられます。", "20×3＝60、4×3＝12で、合わせると72です。", "ひっ算も一のくらいから計算し、十のくらいへくり上げます。"],
    keyPoints: ["十のくらいは十のまとまり", "ぶぶんの答えを合わせる", "答えを見つもってたしかめる"],
    exampleOne: { prompt: "32×3を考えます。", steps: ["30×3＝90です。", "2×3＝6を合わせて96です。"], answer: "96", check: "32をおよそ30と見ると90に近いです。" },
    exampleTwo: { prompt: "47×2をひっ算します。", steps: ["7×2＝14で4を書き、1をくり上げます。", "4十×2に1十をたして9十、答えは94です。"], answer: "94", check: "40×2＋7×2＝80＋14＝94です。" },
    commonMistake: "24の2をそのまま2として計算しません。2は十のくらいなので20を表します。",
    retryPrompt: "24×3を二つのかけ算に分けて言い直しましょう。", retryResponse: "20×3と4×3に分けて、60＋12＝72です。", selfExplanation: "2けたの数を十と一に分けて、それぞれをかけてから合わせます。",
  },
  {
    id: "elementary-grade-3-math-three-digit-times-one-digit", slug: "three-digit-times-one-digit", unitId: "g3-math-written-multiplication-unit", order: 2,
    title: "3けたの数をかけるとき", description: "百・十・一に分け、0をふくむ数もじゅんに計算します。",
    goals: ["3けたの数を百・十・一に分ける", "れんぞくするくり上がりを正しく書く", "0をふくむ数をとばさず計算する"],
    entryId: "g3-math-multiplication", objectiveIds: ["g3-math-multiplication-knowledge", "g3-math-multiplication-thinking"], assetId: "multiplication-decomposition-array",
    opening: "205×4では、まん中の0をどう考えるのかな。", misconception: "0は計算しなくてよいから、25×4で100かな。", misconceptionReason: "0のくらいをとばすと、百と一のくらいがつながると考えた。",
    teacherQuestion: "205の2は、2ではなく何を表しているかな？", learnerNotice: "200を表しているから、200×4と5×4で考えるんだ。",
    explanation: ["3けたの数は、百・十・一のまとまりに分けます。", "205なら200×4＝800、0×4＝0、5×4＝20で820です。", "ひっ算では一のくらいからじゅんに進み、くり上がりを一つ上のくらいへ書きます。"],
    keyPoints: ["百・十・一に分ける", "0のくらいもとばさない", "2けた×2けたには進まない"],
    exampleOne: { prompt: "123×4を計算します。", steps: ["3×4＝12、2十×4とくり上がりで9十です。", "1百×4で4百、答えは492です。"], answer: "492", check: "100×4＋20×4＋3×4＝492です。" },
    exampleTwo: { prompt: "304×2を計算します。", steps: ["4×2＝8、十のくらいは0です。", "3百×2＝6百で608です。"], answer: "608", check: "300×2＋4×2＝608です。" },
    commonMistake: "205を25として計算しません。0は十のくらいに数がないことをしめしています。",
    retryPrompt: "205×4を、百・十・一に分けて言い直しましょう。", retryResponse: "200×4と0×4と5×4を合わせて820です。", selfExplanation: "0のくらいもばしょをたもつので、百・十・一をじゅんに計算します。",
  },
  {
    id: "elementary-grade-3-math-measure-length", slug: "measure-length", unitId: "g3-math-measurement-unit", order: 1,
    nextLessonId: "elementary-grade-3-math-measure-weight",
    title: "長さをくらべて、はかろう", description: "ものに合うたんいをえらび、目もりと道のりを読み取ります。",
    goals: ["mm・cm・m・kmのかんけいを使う", "0から始まらない長さをはかる", "道のりをたしたりひいたりする"],
    entryId: "g3-math-length-weight", objectiveIds: ["g3-math-length-weight-knowledge", "g3-math-length-weight-thinking"], assetId: "length-ruler-and-route",
    opening: "ものさしの2cmから7cmまでにおいたひもは、何cmかな。", misconception: "おわりが7cmだから、長さも7cmだと思う。", misconceptionReason: "ものさしの数字を、そのまま長さだと考えた。",
    teacherQuestion: "ひものはじめは0cmではなく、どこにあるかな？", learnerNotice: "2cmから始まるから、7−2で5cmだ。",
    explanation: ["ものさしでは、はじめとおわりの目もりのちがいが長さです。", "1cm＝10mm、1m＝100cm、1km＝1000mです。", "道のりは、通った道をじゅんにたしてもとめます。"],
    keyPoints: ["おわり−はじめで長さをもとめる", "ものに合うたんいをえらぶ", "道のりは通った道を合わせる"],
    exampleOne: { prompt: "3cmから9cmまでの長さをはかります。", steps: ["はじめは3cm、おわりは9cmです。", "9−3＝6です。"], answer: "6cm", check: "3cmから1cmずつ6回進むと9cmです。" },
    exampleTwo: { prompt: "家から店まで400m、店から学校まで350mです。", steps: ["通る二つの道の長さをたします。", "400＋350＝750です。"], answer: "750m", check: "400mより長く、1kmより短いのでたんいも合います。" },
    commonMistake: "0ではない目もりからはかるとき、おわりの数字をそのまま答えにしません。",
    retryPrompt: "2cmから7cmまでの長さを、式で言い直しましょう。", retryResponse: "おわり7からはじめ2をひいて、7−2＝5cmです。", selfExplanation: "長さは目もりの数字ではなく、おわりとはじめのちがいです。",
  },
  {
    id: "elementary-grade-3-math-measure-weight", slug: "measure-weight", unitId: "g3-math-measurement-unit", order: 2,
    nextLessonId: "elementary-grade-3-math-time-and-duration",
    title: "重さをくらべて、はかろう", description: "g・kg・tを使い、はかりの目もりや中みの重さを考えます。",
    goals: ["g・kg・tから合うたんいをえらぶ", "はかりの目もりを読む", "入れものと中みの重さを分けて考える"],
    entryId: "g3-math-length-weight", objectiveIds: ["g3-math-length-weight-knowledge", "g3-math-length-weight-thinking"], assetId: "weight-scale-and-time-line",
    opening: "1kgは100gのいくつ分かな。", misconception: "kgのkは大きそうだから、1kg＝100gかな。", misconceptionReason: "100cm＝1mとまざり、重さも100でたんいがかわると考えた。",
    teacherQuestion: "100gを10こ合わせると、いくつになるかな？", learnerNotice: "1000gになるね。それが1kgなんだ。",
    explanation: ["1kg＝1000g、1t＝1000kgです。", "はかりは、数字の間がいくつの目もりに分かれているかを見ます。", "入れものをふくむ重さから入れものの重さをひくと、中みの重さになります。"],
    keyPoints: ["1kg＝1000g", "目もり1こ分を先にたしかめる", "全体−入れもの＝中み"],
    exampleOne: { prompt: "目もり1こが50gで、7目もりをさしています。", steps: ["目もり1こ分は50gです。", "50×7＝350です。"], answer: "350g", check: "500gより小さいので図のばしょと合います。" },
    exampleTwo: { prompt: "はこと中みで920g、はこだけで170gです。", steps: ["全体からはこの重さをひきます。", "920−170＝750です。"], answer: "750g", check: "750＋170＝920です。" },
    commonMistake: "数字の書いてある目もりだけを見ず、数字と数字の間がいくつに分かれているかを見ます。",
    retryPrompt: "1kgとgのかんけいを言い直しましょう。", retryResponse: "100gが10こ分で1000g、それが1kgです。", selfExplanation: "重さはものに合うたんいをえらび、目もり1こ分から読みます。",
  },
  {
    id: "elementary-grade-3-math-time-and-duration", slug: "time-and-duration", unitId: "g3-math-measurement-unit", order: 3,
    title: "時こくと時間をつなげて考えよう", description: "開始・けいか・おわりを線でつなぎ、60分や60秒のまとまりを使います。",
    goals: ["時こくと時間のちがいを言う", "1時間＝60分、1分＝60秒を使う", "開始・けいか・おわりを線で考える"],
    entryId: "g3-math-time", objectiveIds: ["g3-math-time-knowledge", "g3-math-time-thinking"], assetId: "weight-scale-and-time-line",
    opening: "午前10時50分の20分後は、10時70分でよいのかな。", misconception: "50＋20＝70だから、10時70分だと思う。", misconceptionReason: "1時間を100分のまとまりとして考えた。",
    teacherQuestion: "時計は、何分になると次の1時間へ進むかな？", learnerNotice: "60分だ。10分で11時になり、あと10分で11時10分だね。",
    explanation: ["時こくは時計の一点、時間は二つの時こくのあいだの長さです。", "1時間＝60分、1分＝60秒です。60分になったら次の時へ進みます。", "開始から60分の区切りまで進み、のこりをたすと考えやすくなります。"],
    keyPoints: ["時こくと時間を分ける", "時間は60ずつたんいがかわる", "開始・けいか・おわりを線でつなぐ"],
    exampleOne: { prompt: "午前9時20分から午前10時までの時間をもとめます。", steps: ["9時20分から9時30分まで10分です。", "9時30分から10時まで30分、合わせて40分です。"], answer: "40分", check: "9時20分に40分をたすと10時です。" },
    exampleTwo: { prompt: "午後1時35分から50分後をもとめます。", steps: ["2時まで25分です。", "のこり25分を進めて2時25分です。"], answer: "午後2時25分", check: "25分＋25分＝50分です。" },
    commonMistake: "分を100まで数えません。60分で次の時へ進みます。",
    retryPrompt: "午前10時50分の20分後を、二つに分けて言い直しましょう。", retryResponse: "10分で11時、のこり10分で午前11時10分です。", selfExplanation: "60分で次の時へ進むので、区切りまでとその後に分けて考えます。",
  },
  {
    id: "elementary-grade-3-math-classify-triangles", slug: "classify-triangles", unitId: "g3-math-triangles-unit", order: 1,
    title: "三角形のなかまを見つけよう", description: "向きや色ではなく、へんの数と長さに目をつけて分けます。",
    goals: ["へんとちょう点を見つける", "二等へん三角形と正三角形を分ける", "向きをかえても形のなかまは同じと考える"],
    entryId: "g3-math-triangles", objectiveIds: ["g3-math-triangles-knowledge", "g3-math-triangles-thinking"], assetId: "triangle-classification",
    opening: "三角形を横向きにすると、べつの形になるのかな。", misconception: "上を向いていないと、三角形ではないと思う。", misconceptionReason: "見なれた向きだけを三角形のきまりだと考えた。",
    teacherQuestion: "向きをかえると、へんの数や長さはかわるかな？", learnerNotice: "3本のへんも長さもかわらないから、同じなかまだね。",
    explanation: ["三角形は3本のまっすぐなへんでかこまれ、ちょう点が3こあります。", "同じ長さのへんが2本ある三角形を二等へん三角形、3本とも同じものを正三角形といいます。", "向きや色がかわっても、へんの数と長さが同じならなかまはかわりません。"],
    keyPoints: ["3本のまっすぐなへんでかこむ", "へんの長さをくらべて分ける", "向きや色では決めない"],
    exampleOne: { prompt: "へんが5cm、5cm、8cmの三角形を分けます。", steps: ["同じ長さの5cmのへんが2本あります。", "同じ長さのへんが2本なので二等へん三角形です。"], answer: "二等へん三角形", check: "向きをかえても5cmのへんは2本のままです。" },
    exampleTwo: { prompt: "へんが4cm、4cm、4cmの三角形を分けます。", steps: ["3本のへんをすべてくらべます。", "3本とも4cmなので正三角形です。"], answer: "正三角形", check: "同じ長さのへんが3本あります。" },
    commonMistake: "見た目が細い、横向き、色がちがうというだけでなかまを決めません。へんをたしかめます。",
    retryPrompt: "横向きの二等へん三角形が同じなかまのわけを言い直しましょう。", retryResponse: "向きがかわっても、同じ長さのへんが2本あるからです。", selfExplanation: "三角形は見た目ではなく、へんの数と長さでなかまを決めます。",
  },
  {
    id: "elementary-grade-3-math-circles-and-spheres", slug: "circles-and-spheres", unitId: "g3-math-circles-spheres-unit", order: 1,
    title: "円と球のひみつを見つけよう", description: "中心・半けい・直けいに目をつけ、平らな円と立体の球を分けます。",
    goals: ["中心・半けい・直けいを見つける", "直けいは半けい2本分と考える", "円と球のちがいを言う"],
    entryId: "g3-math-circles-spheres", objectiveIds: ["g3-math-circles-spheres-knowledge", "g3-math-circles-spheres-thinking"], assetId: "circle-sphere-structure",
    opening: "円の中を横切る線は、どれも直けいなのかな。", misconception: "円のはしからはしまでなら、中心を通らなくても直けいだと思う。", misconceptionReason: "線の長さだけを見て、中心を通るきまりを見ていなかった。",
    teacherQuestion: "直けいの線は、円のどの点をかならず通るかな？", learnerNotice: "中心を通る線だけが直けいなんだね。",
    explanation: ["中心から円のまわりまでの線を半けいといい、どこでも同じ長さです。", "中心を通って円のまわりから反対がわまでの線が直けいで、半けい2本分です。", "円は平らな形、球はボールのような立体です。球をまん中で切った面は円になります。"],
    keyPoints: ["半けいは中心から円のまわりまで", "直けいは中心を通る半けい2本分", "円は平ら、球は立体"],
    exampleOne: { prompt: "半けい4cmの円の直けいをもとめます。", steps: ["直けいは半けい2本分です。", "4×2＝8です。"], answer: "8cm", check: "8÷2＝4cmでもとにもどります。" },
    exampleTwo: { prompt: "直けい14cmの円の半けいをもとめます。", steps: ["直けいを同じ長さに二つへ分けます。", "14÷2＝7です。"], answer: "7cm", check: "7×2＝14cmです。" },
    commonMistake: "円の中を横切る線でも、中心を通らないものは直けいではありません。",
    retryPrompt: "直けいのきまりを、中心ということばを使って言い直しましょう。", retryResponse: "直けいは、円の中心を通ってはしからはしまでの線です。", selfExplanation: "半けいと直けいは中心をもとに見分け、円と球は平らか立体かで分けます。",
  },
  {
    id: "elementary-grade-3-math-tables-and-bar-graphs", slug: "tables-and-bar-graphs", unitId: "g3-math-tables-bar-graphs-unit", order: 1,
    title: "表とぼうグラフでくらべよう", description: "表とぼうグラフの題名・たんい・目もりを見て、数やちがいを読み取ります。",
    goals: ["表のこうもくと数を読み取る", "ぼうグラフの目もりとたんいをたしかめる", "数のちがいと合計をもとめる"],
    entryId: "g3-math-tables-bar-graphs", objectiveIds: ["g3-math-tables-bar-graphs-knowledge", "g3-math-tables-bar-graphs-thinking"], assetId: "table-and-bar-graph",
    opening: "ぼうが4目もりの高さなら、いつも4人なのかな。", misconception: "目もりの数と人数は同じだから、4人だと思う。", misconceptionReason: "目もり1こ分が何人かを見ず、目もりのこ数をそのまま読んだ。",
    teacherQuestion: "たてのじくに、目もり1こ分は何人と書いてあるかな？", learnerNotice: "1こ分が2人なら、4目もりで8人だね。",
    explanation: ["表は、こうもくと数を行やれつにそろえて表します。", "ぼうグラフは題名、たてと横のじく、たんい、目もりを先にたしかめます。", "ぼうの高さから数を読み、ひき算でちがい、たし算で合計をもとめます。"],
    keyPoints: ["題名・たんい・目もりを先に見る", "ぼうの高さを目もりの数へもどす", "グラフだけで分からないこともある"],
    exampleOne: { prompt: "目もり1こ分が2人で、ぼうが6目もりです。", steps: ["目もり1こ分は2人です。", "2×6＝12です。"], answer: "12人", check: "表の12人と同じになります。" },
    exampleTwo: { prompt: "12人と8人のちがいをもとめます。", steps: ["大きい数から小さい数をひきます。", "12−8＝4です。"], answer: "4人", check: "8＋4＝12です。" },
    commonMistake: "ぼうの高さだけを見ず、目もり1こ分とたんいをたしかめます。ぼうの太さは数を表しません。",
    retryPrompt: "目もり1こ分が2人で4目もりのとき、人数を言い直しましょう。", retryResponse: "2人が4こ分だから、2×4＝8人です。", selfExplanation: "ぼうグラフは目もり1こ分を先に見て、ぼうの高さを数に直します。",
  },
] as const;

export const ELEMENTARY_EXPANSION_WAVE_2_LESSONS = Object.freeze(
  LESSON_SEEDS.map(createMathLesson),
);
