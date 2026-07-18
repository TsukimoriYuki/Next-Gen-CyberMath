export type ElementaryExpansionHumanReviewStatus =
  | "not-reviewed"
  | "changes-requested"
  | "approved";

export type ElementaryExpansionWave = Readonly<{
  id: "grade-3-expansion-wave-1";
  publicationStatus: "hidden";
  releaseStatus: "candidate";
  implementationStatus: "complete";
  technicalQaStatus: "ready-for-review";
  explicitReleaseApproval: "pending";
  automaticRelease: false;
  lessonIds: readonly string[];
  unitIds: readonly string[];
  humanReviews: Readonly<{
    math: ElementaryExpansionHumanReviewStatus;
    japanese: ElementaryExpansionHumanReviewStatus;
    socialStudies: ElementaryExpansionHumanReviewStatus;
    guardian: ElementaryExpansionHumanReviewStatus;
    release: ElementaryExpansionHumanReviewStatus;
  }>;
}>;
