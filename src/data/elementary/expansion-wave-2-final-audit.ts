export type ElementaryExpansionWaveTwoLessonAudit = Readonly<{
  lessonId: string;
  technicalAuditStatus: "complete";
  correctedProblemCount: number;
  correctedLessonTextCount: number;
  correctedAssetCount: number;
  remainingAttention: readonly string[];
}>;

export const ELEMENTARY_EXPANSION_WAVE_2_HUMAN_REVIEW_ITEMS = Object.freeze([
  "数学内容",
  "説明の分かりやすさ",
  "図",
  "例題",
  "問題8問",
  "解説",
  "難易度",
  "公開可否",
] as const);

export const ELEMENTARY_EXPANSION_WAVE_2_LESSON_AUDITS: readonly ElementaryExpansionWaveTwoLessonAudit[] =
  Object.freeze([
    {
      lessonId: "elementary-grade-3-math-read-large-numbers",
      technicalAuditStatus: "complete",
      correctedProblemCount: 0,
      correctedLessonTextCount: 1,
      correctedAssetCount: 0,
      remainingAttention: Object.freeze([
        "1億までの全範囲を扱う講座ではないため、coverageはpartialのままです。",
      ]),
    },
    {
      lessonId: "elementary-grade-3-math-large-number-addition-subtraction",
      technicalAuditStatus: "complete",
      correctedProblemCount: 1,
      correctedLessonTextCount: 0,
      correctedAssetCount: 0,
      remainingAttention: Object.freeze(["blockingとなる技術課題はありません。"]),
    },
    {
      lessonId: "elementary-grade-3-math-two-digit-times-one-digit",
      technicalAuditStatus: "complete",
      correctedProblemCount: 0,
      correctedLessonTextCount: 0,
      correctedAssetCount: 0,
      remainingAttention: Object.freeze(["2けた×2けたは今回の講座範囲外です。"]),
    },
    {
      lessonId: "elementary-grade-3-math-three-digit-times-one-digit",
      technicalAuditStatus: "complete",
      correctedProblemCount: 0,
      correctedLessonTextCount: 0,
      correctedAssetCount: 0,
      remainingAttention: Object.freeze(["2けた×2けたは今回の講座範囲外です。"]),
    },
    {
      lessonId: "elementary-grade-3-math-measure-length",
      technicalAuditStatus: "complete",
      correctedProblemCount: 1,
      correctedLessonTextCount: 0,
      correctedAssetCount: 0,
      remainingAttention: Object.freeze(["実物を使う測定活動は今回の画面教材の範囲外です。"]),
    },
    {
      lessonId: "elementary-grade-3-math-measure-weight",
      technicalAuditStatus: "complete",
      correctedProblemCount: 0,
      correctedLessonTextCount: 0,
      correctedAssetCount: 1,
      remainingAttention: Object.freeze(["実物を使う測定活動は今回の画面教材の範囲外です。"]),
    },
    {
      lessonId: "elementary-grade-3-math-time-and-duration",
      technicalAuditStatus: "complete",
      correctedProblemCount: 0,
      correctedLessonTextCount: 0,
      correctedAssetCount: 0,
      remainingAttention: Object.freeze(["日をまたぐ時刻計算は今回の講座範囲外です。"]),
    },
    {
      lessonId: "elementary-grade-3-math-classify-triangles",
      technicalAuditStatus: "complete",
      correctedProblemCount: 1,
      correctedLessonTextCount: 0,
      correctedAssetCount: 1,
      remainingAttention: Object.freeze(["定規・コンパスを使う作図活動は今回の講座範囲外です。"]),
    },
    {
      lessonId: "elementary-grade-3-math-circles-and-spheres",
      technicalAuditStatus: "complete",
      correctedProblemCount: 1,
      correctedLessonTextCount: 0,
      correctedAssetCount: 1,
      remainingAttention: Object.freeze(["コンパスを使う作図活動は今回の講座範囲外です。"]),
    },
    {
      lessonId: "elementary-grade-3-math-tables-and-bar-graphs",
      technicalAuditStatus: "complete",
      correctedProblemCount: 1,
      correctedLessonTextCount: 0,
      correctedAssetCount: 0,
      remainingAttention: Object.freeze(["自分でデータを集めて表す活動は今回の講座範囲外です。"]),
    },
  ]);

export const ELEMENTARY_EXPANSION_WAVE_2_REVIEW_RESPONSE_TEMPLATE = Object.freeze([
  "大きな数：問題なし／修正点",
  "加法・減法：問題なし／修正点",
  "2けた×1けた：問題なし／修正点",
  "3けた×1けた：問題なし／修正点",
  "長さ：問題なし／修正点",
  "重さ：問題なし／修正点",
  "時こくと時間：問題なし／修正点",
  "三角形：問題なし／修正点",
  "円と球：問題なし／修正点",
  "表とぼうグラフ：問題なし／修正点",
  "公開判断：すべて限定beta可／一部のみ可",
] as const);
