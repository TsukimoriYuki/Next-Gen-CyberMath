import type {
  ElementaryInlineContent,
  ElementaryInlineSegment,
  ElementaryLesson,
} from "@/types/elementary-content";

const content = (...segments: ElementaryInlineSegment[]): ElementaryInlineContent => segments;
const text = (value: string): ElementaryInlineSegment => ({ type: "text", text: value });
const ruby = (base: string, reading: string): ElementaryInlineSegment => ({ type: "ruby", base, reading });
const emphasis = (value: string): ElementaryInlineSegment => ({ type: "emphasis", text: value });
const term = (value: string, definition: string): ElementaryInlineSegment => ({
  type: "term",
  text: value,
  definition,
});
const plain = (value: string): ElementaryInlineContent => content(text(value));

export const ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE = {
  id: "elementary-grade-3-math-division-dialogue-showcase",
  slug: "division-dialogue-showcase",
  grade: "grade-3",
  subject: "math",
  courseType: "regular",
  unitId: "division-prototype",
  order: 1,
  title: content(text("わり"), ruby("算", "ざん"), text("は、どんなときにつかうの？")),
  description: plain("わり算を、会話で学ぶ短い見本です。"),
  goals: [
    plain("同じ数ずつ分ける場面を見つける"),
    content(text("わり"), ruby("算", "ざん"), text("の式が表すことを言葉でせつめいする")),
  ],
  estimatedMinutes: 8,
  prerequisiteLessonIds: [],
  curriculumReferenceIds: [],
  visualAssetIds: ["division-cookies-12-into-3"],
  problemIds: [],
  publicationStatus: "hidden",
  reviewStatus: "prototype",
  sourceType: "original",
  copyrightStatus: "original",
  blocks: [
    {
      id: "division-opening-question",
      type: "opening-question",
      question: plain("12このクッキーを3人へ同じ数ずつ分けるには、どんな計算を使う？"),
    },
    {
      id: "division-learning-goals",
      type: "learning-goals",
      items: [
        plain("同じ数ずつ分ける場面に気づく"),
        content(text("わり"), ruby("算", "ざん"), text("の答えが一人分の数だとせつめいする")),
      ],
    },
    {
      id: "division-first-dialogue",
      type: "dialogue",
      title: plain("クッキーの分け方を考えよう"),
      purpose: "典型的な引き算との取り違えを、分ける操作から見直す",
      lines: [
        {
          id: "division-subtract-once-line",
          speakerId: "hinano",
          intent: "misconception",
          emotion: "thinking",
          misconceptionId: "subtract-once",
          content: plain("12このクッキーを3人で分けるなら、12−3でいいのかな？"),
          rationale: plain("3人に分けるから、3を一度引く計算だと考えた。"),
        },
        {
          id: "division-acknowledge-line",
          speakerId: "tomiyama",
          intent: "acknowledgement",
          emotion: "encouraging",
          relatedLineId: "division-subtract-once-line",
          content: plain("3人という数に注目したのはいいね。12−3だと、何が分かるかな？"),
        },
        {
          id: "division-notice-remainder-line",
          speakerId: "hinano",
          intent: "prediction",
          emotion: "surprised",
          content: plain("クッキーを3こだけへらして、9このこり。1人分はまだ分からないね。"),
        },
        {
          id: "division-sharing-prompt-line",
          speakerId: "tomiyama",
          intent: "prompt",
          emotion: "encouraging",
          content: plain("そうだね。3人のお皿へ1こずつ配りつづけたら、どうなる？"),
        },
      ],
    },
    {
      id: "division-sharing-visual",
      type: "visual",
      title: plain("図でたしかめよう"),
      assetId: "division-cookies-12-into-3",
      fallbackText: plain("3人へ、クッキーを4こずつ分けた図です。"),
      creditDisplay: "inline",
      visualPurpose: "concept-explanation",
    },
    {
      id: "division-explanation",
      type: "explanation",
      title: plain("同じ数ずつ分ける計算"),
      paragraphs: [
        plain("12このクッキーを3人へ1こずつ配ると、4回でぜんぶ配り終わります。"),
        content(
          text("一人分の数をもとめる計算を"),
          term("わり算", "ぜんぶの数を同じ数ずつ分け、一つ分の数などをもとめる計算"),
          text("といいます。式は"),
          emphasis("12÷3＝4"),
          text("です。"),
        ),
      ],
    },
    {
      id: "division-key-point",
      type: "key-point",
      title: plain("ここは大切"),
      points: [
        plain("ぜんぶの数を同じ数ずつ分けて、一人分をもとめるときにわり算を使う。"),
        plain("12÷3＝4の4は、一人分のクッキーの数を表す。"),
      ],
    },
    {
      id: "division-guided-example",
      type: "guided-example",
      title: plain("いっしょに考えるもんだい"),
      prompt: plain("15このあめを5つのふくろへ同じ数ずつ入れます。一ふくろ分は何こ？"),
      steps: [
        { id: "division-example-step-total", content: plain("ぜんぶの数は15こ。") },
        { id: "division-example-step-groups", content: plain("同じ数ずつ入れるふくろは5つ。") },
        { id: "division-example-step-expression", content: plain("一ふくろ分なので、15÷5と表す。") },
      ],
      answer: content(emphasis("15÷5＝3　一ふくろ分は3こ")),
      check: plain("3こずつ5ふくろで、3×5＝15になるからたしかめられる。"),
    },
    {
      id: "division-retry",
      type: "retry",
      title: plain("もう一度考えよう"),
      originalMisconceptionId: "subtract-once",
      prompt: plain("20まいのシールを4人へ同じ数ずつ分けます。一人分は何まい？"),
      response: {
        id: "division-retry-line",
        speakerId: "hinano",
        intent: "retry",
        emotion: "confident",
        relatedLineId: "division-subtract-once-line",
        content: plain("4人へ同じ数ずつ分けるから、20÷4＝5。一人分は5まいだね。"),
      },
    },
    {
      id: "division-final-dialogue",
      type: "dialogue",
      title: plain("自分の言葉でまとめよう"),
      purpose: "最初の誤解と比べながら理解を説明する",
      lines: [
        {
          id: "division-explain-prompt-line",
          speakerId: "tomiyama",
          intent: "prompt",
          emotion: "encouraging",
          content: plain("はじめの考えとくらべて、わり算を使うときをせつめいできる？"),
        },
        {
          id: "division-self-explanation-line",
          speakerId: "hinano",
          intent: "self-explanation",
          emotion: "confident",
          relatedLineId: "division-subtract-once-line",
          content: plain("ぜんぶの数を同じ数ずつ分けて、一人分を知りたいときに使うよ。"),
        },
        {
          id: "division-closing-line",
          speakerId: "tomiyama",
          intent: "summary",
          emotion: "happy",
          content: plain("うん。何人へ同じ数ずつ分けるのかを見ると、式をえらべるね。"),
        },
      ],
    },
    {
      id: "division-summary",
      type: "summary",
      items: [
        plain("同じ数ずつ分けて、一人分をもとめるときはわり算を使う。"),
        plain("わり算の答えが何を表すか、場面にもどってたしかめる。"),
      ],
    },
    {
      id: "division-enrichment",
      type: "enrichment",
      title: plain("もう少し先へ"),
      content: [plain("12から3を何回も引く考えでも、4回で0になります。この見方は今はできなくてもだいじょうぶです。")],
      requiredForCompletion: false,
    },
  ],
} as const satisfies ElementaryLesson;
