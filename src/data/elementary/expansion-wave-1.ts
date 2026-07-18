import type { ElementaryExpansionWave } from "@/types/elementary-expansion";

export const ELEMENTARY_EXPANSION_WAVE_1 = Object.freeze({
  id: "grade-3-expansion-wave-1",
  publicationStatus: "hidden",
  releaseStatus: "candidate",
  implementationStatus: "complete",
  technicalQaStatus: "ready-for-review",
  explicitReleaseApproval: "pending",
  automaticRelease: false,
  unitIds: [
    "g3-math-decimals-unit",
    "g3-math-fractions-unit",
    "g3-japanese-explanatory-text-unit",
    "g3-social-work-and-sales-unit",
  ],
  lessonIds: [
    "elementary-grade-3-math-division-with-remainders",
    "elementary-grade-3-math-tenths-and-decimals",
    "elementary-grade-3-math-parts-of-a-whole",
    "elementary-grade-3-japanese-find-key-sentences",
    "elementary-grade-3-japanese-connect-paragraphs",
    "elementary-grade-3-social-goods-to-store",
  ],
  humanReviews: {
    math: "not-reviewed",
    japanese: "not-reviewed",
    socialStudies: "not-reviewed",
    guardian: "not-reviewed",
    release: "not-reviewed",
  },
} as const satisfies ElementaryExpansionWave);
