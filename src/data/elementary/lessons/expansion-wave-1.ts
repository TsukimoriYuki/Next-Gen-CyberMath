import { plain } from "@/data/elementary/inline";
import {
  ELEMENTARY_DECIMAL_PROBLEMS,
  ELEMENTARY_FRACTION_PROBLEMS,
  ELEMENTARY_GOODS_TO_STORE_PROBLEMS,
  ELEMENTARY_KEY_SENTENCE_PROBLEMS,
  ELEMENTARY_PARAGRAPH_PROBLEMS,
  ELEMENTARY_REMAINDER_PROBLEMS,
} from "@/data/elementary/problems/expansion-wave-1";
import type { ElementaryInlineContent, ElementaryLesson } from "@/types/elementary-content";

type LessonSeed = Readonly<{
  id: string;
  slug: string;
  subject: "math" | "japanese" | "social-studies";
  unitId: string;
  order: number;
  title: string;
  description: string;
  goals: readonly [string, string, string];
  entryId: string;
  objectiveIds: readonly string[];
  problemIds: readonly string[];
  assetId?: string;
  visualTitle?: string;
  visualFallback?: string;
  opening: string;
  misconception: string;
  misconceptionReason: string;
  teacherQuestion: string;
  learnerNotice: string;
  teacherPrompt: string;
  explanationTitle: string;
  explanation: readonly string[];
  keyPoints: readonly string[];
  exampleOne: Readonly<{ prompt: string; steps: readonly string[]; answer: string; check: string }>;
  exampleTwo: Readonly<{ prompt: string; steps: readonly string[]; answer: string; check: string }>;
  commonMistake: string;
  retryPrompt: string;
  retryResponse: string;
  selfExplanation: string;
  sourceTitle?: string;
  sourceParagraphs?: readonly string[];
}>;

const asPlain = (values: readonly string[]): readonly ElementaryInlineContent[] => values.map(plain);

function createLesson(seed: LessonSeed): ElementaryLesson {
  const misconceptionLineId = `${seed.slug}-misconception-line`;
  const misconceptionId = `${seed.slug}-misconception`;
  const visualBlock = seed.assetId
    ? [{
        id: `${seed.slug}-visual`,
        type: "visual" as const,
        title: plain(seed.visualTitle ?? "図で考えよう"),
        assetId: seed.assetId,
        fallbackText: plain(seed.visualFallback ?? seed.explanation[0]),
        creditDisplay: "credits-page" as const,
        visualPurpose: "concept-explanation" as const,
      }]
    : [];
  const sourceBlock = seed.sourceParagraphs
    ? [{
        id: `${seed.slug}-source-text`,
        type: "explanation" as const,
        title: plain(seed.sourceTitle ?? "本文を読もう"),
        paragraphs: asPlain(seed.sourceParagraphs),
      }]
    : [];

  return {
    id: seed.id,
    slug: seed.slug,
    grade: "grade-3",
    subject: seed.subject,
    courseType: "regular",
    unitId: seed.unitId,
    order: seed.order,
    title: plain(seed.title),
    description: plain(seed.description),
    goals: asPlain(seed.goals),
    estimatedMinutes: 38,
    prerequisiteLessonIds: [],
    curriculumReferenceIds: [seed.entryId],
    curriculumObjectiveIds: seed.objectiveIds,
    requirementCoverage: [{
      entryId: seed.entryId,
      objectiveIds: seed.objectiveIds,
      lessonCoverage: "partial",
      assessmentCoverage: "partial",
    }],
    enrichmentReferenceIds: [],
    visualAssetIds: seed.assetId ? [seed.assetId] : [],
    problemIds: seed.problemIds,
    publicationStatus: "hidden",
    reviewStatus: "pilot",
    sourceType: "original",
    copyrightStatus: "original",
    blocks: [
      { id: `${seed.slug}-opening`, type: "opening-question", question: plain(seed.opening) },
      { id: `${seed.slug}-goals`, type: "learning-goals", items: asPlain(seed.goals) },
      {
        id: `${seed.slug}-first-dialogue`, type: "dialogue", title: plain("まず、考えてみよう"),
        purpose: "はじめの考えを問い直す",
        lines: [
          { id: misconceptionLineId, speakerId: "hinano", intent: "misconception", emotion: "thinking", misconceptionId, content: plain(seed.misconception), rationale: plain(seed.misconceptionReason) },
          { id: `${seed.slug}-acknowledge`, speakerId: "tomiyama", intent: "acknowledgement", emotion: "encouraging", relatedLineId: misconceptionLineId, content: plain(seed.teacherQuestion) },
          { id: `${seed.slug}-notice`, speakerId: "hinano", intent: "prediction", emotion: "surprised", content: plain(seed.learnerNotice) },
          { id: `${seed.slug}-prompt`, speakerId: "tomiyama", intent: "prompt", emotion: "encouraging", content: plain(seed.teacherPrompt) },
        ],
      },
      ...visualBlock,
      ...sourceBlock,
      { id: `${seed.slug}-explanation`, type: "explanation", title: plain(seed.explanationTitle), paragraphs: asPlain(seed.explanation) },
      { id: `${seed.slug}-key-point`, type: "key-point", title: plain("ここが大切"), points: asPlain(seed.keyPoints) },
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
      { id: `${seed.slug}-common-mistake`, type: "explanation", title: plain("よくあるまちがい"), paragraphs: [plain(seed.commonMistake)] },
      {
        id: `${seed.slug}-retry`, type: "retry", title: plain("もう一度、考えよう"), originalMisconceptionId: misconceptionId, prompt: plain(seed.retryPrompt),
        response: { id: `${seed.slug}-retry-line`, speakerId: "hinano", intent: "retry", emotion: "confident", relatedLineId: misconceptionLineId, content: plain(seed.retryResponse) },
      },
      {
        id: `${seed.slug}-explain-dialogue`, type: "dialogue", title: plain("自分のことばで言おう"), purpose: "考え方を自分のことばにする",
        lines: [
          { id: `${seed.slug}-explain-prompt`, speakerId: "tomiyama", intent: "prompt", emotion: "encouraging", content: plain("今日の考え方を、どこに目をつけたかも入れて話せるかな？") },
          { id: `${seed.slug}-self-explanation`, speakerId: "hinano", intent: "self-explanation", emotion: "confident", content: plain(seed.selfExplanation) },
          { id: `${seed.slug}-deepen`, speakerId: "tomiyama", intent: "deepening", emotion: "encouraging", content: plain("いいね。もとの図や文にもどしてたしかめると、もっとたしかになるね。") },
          { id: `${seed.slug}-acknowledge-end`, speakerId: "hinano", intent: "acknowledgement", emotion: "happy", content: plain("うん。答えだけでなく、わけもたしかめるね。") },
        ],
      },
      { id: `${seed.slug}-summary`, type: "summary", items: asPlain(seed.keyPoints) },
      {
        id: `${seed.slug}-practice`, type: "practice-set", title: plain("れんしゅう問題"), introduction: plain("8問で、今日の考え方をたしかめます。"), problemIds: seed.problemIds,
        minimumScoreMessage: plain("あわてなくてだいじょうぶ。せつめいを見て、もう一度考えよう。"),
        completionMessage: plain("さいごまで考えられました。できたところをたしかめよう。"),
      },
    ],
  };
}

const ids = (problems: readonly Readonly<{ id: string }>[]) => problems.map((problem) => problem.id);

export const ELEMENTARY_MATH_REMAINDER_LESSON = createLesson({
  id: "elementary-grade-3-math-division-with-remainders", slug: "division-with-remainders", subject: "math", unitId: "g3-math-division-unit", order: 2,
  title: "あまりのあるわり算", description: "分けきれない数を、答えとあまりで表し、もとの数へもどしてたしかめます。",
  goals: ["あまりのいみが分かる", "あまりが、わる数より小さいと分かる", "わる数×答え＋あまりでたしかめる"],
  entryId: "g3-math-division", objectiveIds: ["g3-math-division-one-digit", "g3-math-division-checking", "g3-math-division-situation-choice"], problemIds: ids(ELEMENTARY_REMAINDER_PROBLEMS),
  assetId: "division-remainders-14-into-4", visualTitle: "14こを4こずつ分けよう", visualFallback: "4このまとまりが3つでき、2こあまります。",
  opening: "14このおはじきを、4こずつのまとまりにすると、どうなるかな。", misconception: "14÷4は、4ぴったりでいいのかな。", misconceptionReason: "14に近い4のだんの答えを、そのまま書こうとした。",
  teacherQuestion: "4×4は、もとの14より大きくならないかな？", learnerNotice: "4×4は16だ。3つのまとまりなら12で、2このこるよ。", teacherPrompt: "その2こを、式の答えといっしょにどう表せるかな。",
  explanationTitle: "分けきれない数が、あまり", explanation: ["14こを4こずつにすると、4このまとまりが3つでき、2このこります。14÷4＝3あまり2と表します。", "あまりは、もう一つのまとまりを作れない数です。だから、あまりはいつも、わる数より小さくなります。", "わる数×答え＋あまり＝もとの数でたしかめます。4×3＋2＝14です。"],
  keyPoints: ["あまりは、わる数より小さい", "わる数×答え＋あまりでもとの数になる", "答えを、もとの場面にもどす"],
  exampleOne: { prompt: "19÷6を考えます。", steps: ["6のだんで19をこえない答えは3です。", "6×3＝18、19−18＝1です。"], answer: "19÷6＝3あまり1", check: "6×3＋1＝19です。" },
  exampleTwo: { prompt: "22本を5本ずつたばにします。", steps: ["22÷5＝4あまり2です。", "いっぱいのたばは4つ、のこりは2本です。"], answer: "4たばできて、2本のこる", check: "5×4＋2＝22です。" },
  commonMistake: "あまりを、わる数と同じか大きいままにしません。たとえば、あまり5なら、もう一つ5このまとまりが作れます。",
  retryPrompt: "14÷4の答えとあまりを、図を見て言い直しましょう。", retryResponse: "4このまとまりは3つで、2このこるから、3あまり2です。", selfExplanation: "あまりは、まとまりに入らずのこる数で、わる数より小さくします。",
});

export const ELEMENTARY_MATH_DECIMAL_LESSON = createLesson({
  id: "elementary-grade-3-math-tenths-and-decimals", slug: "tenths-and-decimals", subject: "math", unitId: "g3-math-decimals-unit", order: 1,
  title: "0.1をもとに小数を考えよう", description: "1を10等分した一つ分を0.1と表し、数直線で大きさをたしかめます。",
  goals: ["0.1のいみが分かる", "0.1のいくつ分かで小数を表す", "数直線で小数の大きさをくらべる"],
  entryId: "g3-math-decimals", objectiveIds: ["g3-math-decimals-knowledge", "g3-math-decimals-thinking"], problemIds: ids(ELEMENTARY_DECIMAL_PROBLEMS),
  assetId: "decimal-tenths-number-line", visualTitle: "0と1の間を10等分", visualFallback: "0から1までを10こに同じ大きさで分け、一つ分を0.1とします。",
  opening: "1mよりみじかい長さを、mを使ってどう表せるかな。", misconception: "1を10こに分けた一つ分は、10と書くのかな。", misconceptionReason: "分けた数の10を、そのまま答えにしようとした。",
  teacherQuestion: "一つ分は、もとの1より大きくなるかな？", learnerNotice: "小さくなるね。0と1の間にある数だ。", teacherPrompt: "0と1の間を10こに分けた数直線を見てみよう。",
  explanationTitle: "0.1をもとにする", explanation: ["1を10こに同じ大きさで分けた一つ分を、0.1と書きます。", "0.1が3こ分なら0.3、7こ分なら0.7です。小数点の右の数字が、0.1のいくつ分かを表します。", "数直線では、右へ進むほど数が大きくなります。"],
  keyPoints: ["1を10等分した一つ分が0.1", "0.1のいくつ分かで小数を考える", "数直線の右ほど大きい"],
  exampleOne: { prompt: "0.1が6こ分の数を考えます。", steps: ["一つ分は0.1です。", "0.1を6こ合わせます。"], answer: "0.6", check: "数直線で0から6つ進んだいちです。" },
  exampleTwo: { prompt: "0.8と0.5をくらべます。", steps: ["0.8は0.1が8こ分です。", "0.5は0.1が5こ分です。"], answer: "0.8の方が大きい", check: "数直線で0.8が右にあります。" },
  commonMistake: "0.7を7より大きい数だと考えません。0.7は0と1の間の数です。",
  retryPrompt: "1を10こに分けた一つ分を、どう書くか言い直しましょう。", retryResponse: "もとの1より小さくて、0と1の間にある0.1です。", selfExplanation: "小数は、0.1がいくつ分かを考えると、大きさが分かります。",
});

export const ELEMENTARY_MATH_FRACTION_LESSON = createLesson({
  id: "elementary-grade-3-math-parts-of-a-whole", slug: "parts-of-a-whole", subject: "math", unitId: "g3-math-fractions-unit", order: 1,
  title: "もとの大きさと分数", description: "もとの1を同じ大きさに分け、一つ分といくつ分かを分数で表します。",
  goals: ["同じ大きさに分けるわけが分かる", "一つ分を分数で表す", "一つ分のいくつ分かを考える"],
  entryId: "g3-math-fractions", objectiveIds: ["g3-math-fractions-knowledge", "g3-math-fractions-thinking"], problemIds: ids(ELEMENTARY_FRACTION_PROBLEMS),
  assetId: "fraction-equal-parts-tape", visualTitle: "1本を4つに同じ長さで分ける", visualFallback: "1本のテープを同じ長さに4つへ分けた一つ分が4分の1です。",
  opening: "1本のテープを4人で同じ長さずつ分けると、一人分はどう表せるかな。", misconception: "4つに分けたから、一つ分は4と書くのかな。", misconceptionReason: "分けた数だけを見て、もとの1とのつながりを見ていなかった。",
  teacherQuestion: "一つ分は、もとの1本より長くなるかな？", learnerNotice: "みじかくなるね。もとの1本の中の一つ分だ。", teacherPrompt: "同じ長さの4つに分けた図で、一つ分を見よう。",
  explanationTitle: "もとの1を同じ大きさに分ける", explanation: ["もとの1を同じ大きさに4つへ分けた一つ分を、4分の1といいます。1/4と書きます。", "4分の1が3つ分なら4分の3で、3/4と書きます。下の4は分けた数、上の3はいくつ分かを表します。", "同じ大きさに分けていないと、一つ分の大きさがそろわないので分数で正しく表せません。"],
  keyPoints: ["もとの1を同じ大きさに分ける", "下の数は分けた数、上の数はいくつ分か", "もとの1をいつもたしかめる"],
  exampleOne: { prompt: "1本を5つに同じ長さで分けます。", steps: ["分けた数は5です。", "その一つ分を考えます。"], answer: "5分の1、1/5", check: "1/5を5つ合わせるともとの1本です。" },
  exampleTwo: { prompt: "1/6が4つ分の大きさを表します。", steps: ["一つ分は6分の1です。", "その4つ分です。"], answer: "6分の4、4/6", check: "下の数6はそのままです。" },
  commonMistake: "分けた数と、いくつ分かを反対にしません。また、同じ大きさに分けたかをたしかめます。",
  retryPrompt: "1本を4つに同じ長さで分けた一つ分を、言い直しましょう。", retryResponse: "もとの1本の中の一つ分だから、4分の1、1/4です。", selfExplanation: "分数は、もとの1を同じ大きさに分けた一つ分をもとに考えます。",
});

const LIBRARY_TEXT = [
  "学校の図書室には、たくさんの本があります。読みたい本を早く見つけるために、図書室ではいくつかのくふうをしています。どのくふうも、本をさがしやすくし、読み終わった本を正しい場所へもどしやすくするためのものです。",
  "一つ目は、本をなかまごとに分けてならべることです。物語の本、生き物の本、工作の本というように、にたなかみの本を近くに集めます。読みたいことが決まっている人は、そのなかまの本だなへ行けばよいので、一さつずつすべてを見るより早くさがせます。どのなかまか分からないときは、題名や目次を見て、近いなかまを考えることもできます。",
  "二つ目は、本のせなかにしるしをつけることです。同じなかまの本には、同じ色や同じきまりのしるしがあります。かりた本をもどすとき、しるしと本だなのひょうじをくらべれば、もとの場所を見つけられます。しるしは、さがすときにも、もどすときにも役立ちます。ちがう場所へ入った本も、しるしを見れば、正しい本だなへもどせます。",
  "また、本だなの上には、その場所にどんな本があるかをしめす言葉があります。『こん虫』『草花』のように、なかまをさらに分けた言葉もあります。大きななかまから小さななかまへ目をうつすと、ほしい本をしぼっていくことができます。",
  "このように、図書室では、なかま分け、しるし、本だなのひょうじを使っています。これらはべつべつのくふうに見えますが、どれも本をさがしやすくし、正しい場所へもどしやすくするためのくふうなのです。",
] as const;

export const ELEMENTARY_JAPANESE_KEY_SENTENCE_LESSON = createLesson({
  id: "elementary-grade-3-japanese-find-key-sentences", slug: "find-key-sentences", subject: "japanese", unitId: "g3-japanese-explanatory-text-unit", order: 1,
  title: "大切な文を見つけよう", description: "せつめい文の話題、くり返し、れいに目をつけ、だんらくの大切な文を見つけます。",
  goals: ["文章の話題を見つける", "れいをまとめる大切な文を見つける", "本文のことばをこんきょにする"],
  entryId: "g3-japanese-reading-expository", objectiveIds: ["g3-japanese-reading-expository-structure", "g3-japanese-reading-expository-summary"], problemIds: ids(ELEMENTARY_KEY_SENTENCE_PROBLEMS),
  opening: "長いせつめい文の中で、いちばん大切な文はどう見つけるのかな。", misconception: "いちばん長い文が、いつも大切な文かな。", misconceptionReason: "文の長さだけで、大切さを決めようとした。",
  teacherQuestion: "みじかい文でも、後のれいをまとめることはないかな？", learnerNotice: "長さより、ほかの文とのつながりを見るんだね。", teacherPrompt: "話題、くり返し、れいをまとめる文に目をつけよう。",
  sourceTitle: "図書室の本をさがしやすくするくふう", sourceParagraphs: LIBRARY_TEXT,
  explanationTitle: "文のはたらきを見る", explanation: ["大切な文は、そのだんらくで何をせつめいするかをしめします。後の文がれいになっているとき、そのれいをまとめる文が手がかりです。", "題名や文章全体でくり返される話題とつながるかもたしかめます。"],
  keyPoints: ["題名とくり返される話題を見る", "後のれいをまとめる文をさがす", "本文のことばをこんきょにする"],
  exampleOne: { prompt: "第2だんらくの大切な文を見つけます。", steps: ["物語、生き物、工作はれいです。", "れいをまとめる前の文を見ます。"], answer: "本をなかまごとに分けてならべる文", check: "後の三つのれいをまとめています。" },
  exampleTwo: { prompt: "第3だんらくで、しるしのよさを見つけます。", steps: ["さがすときともどすときの文を読みます。", "二つをまとめる文を見ます。"], answer: "しるしは、さがすときにも、もどすときにも役立つ", check: "前のせつめいをまとめています。" },
  commonMistake: "文の長さや、さいしょにあることだけで決めません。前後の文とどうつながるかを見ます。",
  retryPrompt: "大切な文を見つけるとき、何を見るか言い直しましょう。", retryResponse: "文の長さではなく、話題やれいをまとめるはたらきを見ます。", selfExplanation: "大切な文は、題名やくり返し、れいとのつながりをこんきょに見つけます。",
});

const HALLWAY_TEXT = [
  "休み時間のろうかでは、教室へ向かう人、図書室へ行く人、先生へしつ問しに行く人が行き来します。みんなが安全に通るためには、どのような歩き方をするとよいのでしょう。ろうかの歩き方を、理由といっしょに考えてみます。",
  "まず、ろうかでは、走らずにゆっくり歩きます。走っていると、教室から出てくる人や、曲がり角の向こうにいる人に気づくのがおそくなります。ゆっくり歩けば、まわりを見て、ひつようなときに止まりやすくなります。手に本や道具をもつ人がいても、早めに気づけば、少しよけて通ることができます。",
  "また、何人かで歩くときは、よこに大きく広がらないようにします。よこに広がると、反対から来た人が通る場所がせまくなるからです。友だちと話すときも、前から来る人や、うしろから来る人がいることを考えます。",
  "走るときと歩くときをくらべてみましょう。走ると早く進めますが、急には止まりにくく、まわりを見る時間もみじかくなります。歩くと少し時間はかかりますが、人や物に気づいてから止まることができます。このちがいが、安全につながります。",
  "ただし、ゆっくり歩くだけで、いつでも安全になるとはかぎりません。ろうかに物が出ていたり、見えにくい曲がり角があったりするかもしれません。学校の中を見て、気づいたことを先生や友だちへつたえることも大切です。場所ごとのようすをたしかめれば、自分たちの学校に合うくふうを考えられます。",
  "このように、ろうかでは、走らずに歩くこと、よこに広がらないこと、まわりを見ることが大切です。それぞれのくふうには、ほかの人と安全に通るための理由があります。きまりをおぼえるだけでなく、なぜ大切なのかを考えて行動しましょう。",
] as const;

export const ELEMENTARY_JAPANESE_PARAGRAPH_LESSON = createLesson({
  id: "elementary-grade-3-japanese-connect-paragraphs", slug: "connect-paragraphs", subject: "japanese", unitId: "g3-japanese-explanatory-text-unit", order: 2,
  title: "だんらくのつながりを読もう", description: "つなぐ言葉と、理由・れい・くらべ・まとめのつながりを読みます。",
  goals: ["つなぐ言葉のはたらきが分かる", "くふうと理由のつながりを読む", "だんらくの組み立てをせつめいする"],
  entryId: "g3-japanese-reading-expository", objectiveIds: ["g3-japanese-reading-expository-structure", "g3-japanese-reading-expository-summary"], problemIds: ids(ELEMENTARY_PARAGRAPH_PROBLEMS),
  opening: "だんらくがいくつもあるとき、どんなつながりを見ればよいのかな。", misconception: "『まず』『また』を見つければ、なかみを読まなくても分かるかな。", misconceptionReason: "つなぐ言葉だけで、だんらくのはたらきを決めようとした。",
  teacherQuestion: "その後の文が、れいか理由かも見なくてよいかな？", learnerNotice: "つなぐ言葉と、書いてあるなかみをいっしょに見るんだ。", teacherPrompt: "問い、くふう、理由、くらべ、まとめのならびをたしかめよう。",
  sourceTitle: "ろうかを安全に歩くために", sourceParagraphs: HALLWAY_TEXT,
  explanationTitle: "だんらくの役わりをつなぐ", explanation: ["『まず』は一つ目、『また』はつけ足し、『このように』はまとめの手がかりです。", "つなぐ言葉だけでなく、そのだんらくが理由、れい、くらべのどれをしめすかを読みます。"],
  keyPoints: ["つなぐ言葉となかみをいっしょに見る", "くふうと理由をむすびつける", "問いからまとめまでのならびをとらえる"],
  exampleOne: { prompt: "第2と第3だんらくのつながりを見ます。", steps: ["『まず』は一つ目のくふうです。", "『また』はもう一つのくふうです。"], answer: "二つのくふうをならべている", check: "どちらにも理由が書かれています。" },
  exampleTwo: { prompt: "第4だんらくのはたらきを考えます。", steps: ["走るときと歩くときをくらべています。", "くらべて、安全につながるちがいをしめします。"], answer: "くらべて歩くよさをはっきりさせる", check: "前のくふうの理由をくわしくしています。" },
  commonMistake: "つなぐ言葉だけを見て決めません。だんらくに書かれた、くふう・理由・れいもたしかめます。",
  retryPrompt: "だんらくのつながりを読むとき、何をいっしょに見るか言い直しましょう。", retryResponse: "つなぐ言葉だけでなく、理由やれいなどのなかみもいっしょに見ます。", selfExplanation: "問い、くふうと理由、くらべ、まとめがどうつながるかを読みます。",
});

export const ELEMENTARY_SOCIAL_GOODS_LESSON = createLesson({
  id: "elementary-grade-3-social-goods-to-store", slug: "goods-to-store", subject: "social-studies", unitId: "g3-social-work-and-sales-unit", order: 1,
  title: "品物はどうやって店にとどくの？", description: "学習用のひかり市とあおば店をもとに、品物の道すじと調べ方を考えます。",
  goals: ["品物の道すじを図から読む", "図から分かることと分からないことを分ける", "見学やしつ問で調べることを考える"],
  entryId: "g3-social-production-sales", objectiveIds: ["g3-social-production-sales-knowledge", "g3-social-production-sales-research", "g3-social-production-sales-thinking"], problemIds: ids(ELEMENTARY_GOODS_TO_STORE_PROBLEMS),
  assetId: "goods-to-store-flow", visualTitle: "あおば店へ品物がとどくまで", visualFallback: "作る場所、そうこ、はいたつトラック、あおば店、家を矢じるしでつないだ学習用の図です。",
  opening: "お店にならぶ品物は、どこから、どのようにとどくのかな。", misconception: "どの品物も、全国で同じ道すじを通るのかな。", misconceptionReason: "一つの学習用の図を、すべての店に当てはめようとした。",
  teacherQuestion: "品物のしゅるいや地いきがちがっても、同じと言い切れるかな？", learnerNotice: "この図で分かることと、ほかでも同じかは分けないといけないね。", teacherPrompt: "まず、矢じるしから分かる道すじだけを読もう。",
  explanationTitle: "図で分かること、調べること", explanation: ["この図では、品物が作る場所からそうこへ集まり、はいたつトラックであおば店へ運ばれ、家へわたる道すじが分かります。", "これは学習用のひかり市とあおば店のれいです。品物や地いきによって、そうこを通るか、どこから運ぶかはちがいます。", "店の人のくふうや思いは、図だけでは分かりません。見学したり、しつ問したりしてたしかめます。"],
  keyPoints: ["矢じるしから、品物の道すじを読む", "一つの図を全国すべてに当てはめない", "図で分からないことは、見学やしつ問で調べる"],
  exampleOne: { prompt: "そうこのつぎに、品物はどこへ進みますか。", steps: ["そうこから出る矢じるしを見ます。", "矢じるしの先をたどります。"], answer: "はいたつトラック", check: "そのつぎに、あおば店へ進みます。" },
  exampleTwo: { prompt: "店の人の思いは、図だけで分かりますか。", steps: ["図に書かれた場所と矢じるしを見ます。", "人の話や言葉は書かれていません。"], answer: "図だけでは分からない", check: "見学やしつ問でたしかめます。" },
  commonMistake: "一つの学習用の図を見て、全国の店がかならず同じだとは言えません。分かったことと、これから調べることを分けます。",
  retryPrompt: "この図から言えることを、言いすぎないように言い直しましょう。", retryResponse: "この学習用の図では、品物がそうこや店を通ることが分かります。", selfExplanation: "図の矢じるしで分かることと、見学やしつ問で調べることを分けます。",
});

export const ELEMENTARY_EXPANSION_WAVE_1_LESSONS = Object.freeze([
  ELEMENTARY_MATH_REMAINDER_LESSON,
  ELEMENTARY_MATH_DECIMAL_LESSON,
  ELEMENTARY_MATH_FRACTION_LESSON,
  ELEMENTARY_JAPANESE_KEY_SENTENCE_LESSON,
  ELEMENTARY_JAPANESE_PARAGRAPH_LESSON,
  ELEMENTARY_SOCIAL_GOODS_LESSON,
]);
