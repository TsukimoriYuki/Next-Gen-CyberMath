import type { ElementaryExpansionWave } from "@/types/elementary-expansion";

export const ELEMENTARY_EXPANSION_WAVE_2_UNIT_IDS = Object.freeze([
  "g3-math-large-numbers-unit",
  "g3-math-addition-subtraction-unit",
  "g3-math-written-multiplication-unit",
  "g3-math-measurement-unit",
  "g3-math-triangles-unit",
  "g3-math-circles-spheres-unit",
  "g3-math-tables-bar-graphs-unit",
] as const);

export const ELEMENTARY_EXPANSION_WAVE_2_LESSON_IDS = Object.freeze([
  "elementary-grade-3-math-read-large-numbers",
  "elementary-grade-3-math-large-number-addition-subtraction",
  "elementary-grade-3-math-two-digit-times-one-digit",
  "elementary-grade-3-math-three-digit-times-one-digit",
  "elementary-grade-3-math-measure-length",
  "elementary-grade-3-math-measure-weight",
  "elementary-grade-3-math-time-and-duration",
  "elementary-grade-3-math-classify-triangles",
  "elementary-grade-3-math-circles-and-spheres",
  "elementary-grade-3-math-tables-and-bar-graphs",
] as const);

export const ELEMENTARY_EXPANSION_WAVE_2_PROBLEM_IDS = Object.freeze(
  ELEMENTARY_EXPANSION_WAVE_2_LESSON_IDS.flatMap((lessonId) =>
    Array.from({ length: 8 }, (_, index) =>
      `${lessonId.replace("elementary-grade-3-math-", "eg3-math-")}-${String(index + 1).padStart(2, "0")}`,
    ),
  ),
);

export const ELEMENTARY_EXPANSION_WAVE_2_ASSET_IDS = Object.freeze([
  "large-number-place-value-chart",
  "addition-subtraction-columns",
  "multiplication-decomposition-array",
  "length-ruler-and-route",
  "weight-scale-and-time-line",
  "triangle-classification",
  "circle-sphere-structure",
  "table-and-bar-graph",
] as const);

export const ELEMENTARY_EXPANSION_WAVE_2 = Object.freeze({
  id: "grade-3-math-expansion-wave-2",
  publicationStatus: "hidden",
  releaseStatus: "ready-for-review",
  implementationStatus: "complete",
  technicalQaStatus: "complete",
  explicitReleaseApproval: "pending",
  approvalSource: "none",
  releaseApprovalSource: "none",
  reviewerType: "none",
  reviewSource: "none",
  reviewedAt: null,
  approvedAt: null,
  reviewNote: "教材内容はユーザー本人の実画面確認前です。人間レビューと明示承認を待っています。",
  automaticRelease: false,
  unitIds: ELEMENTARY_EXPANSION_WAVE_2_UNIT_IDS,
  lessonIds: ELEMENTARY_EXPANSION_WAVE_2_LESSON_IDS,
  problemIds: ELEMENTARY_EXPANSION_WAVE_2_PROBLEM_IDS,
  assetIds: ELEMENTARY_EXPANSION_WAVE_2_ASSET_IDS,
  humanReviews: {
    math: "not-reviewed",
    japanese: "not-reviewed",
    socialStudies: "not-reviewed",
    guardian: "not-reviewed",
    release: "not-reviewed",
  },
} as const satisfies ElementaryExpansionWave);
