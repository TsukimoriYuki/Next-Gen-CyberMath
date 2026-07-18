export type ElementaryExpansionHumanReviewStatus =
  | "not-reviewed"
  | "changes-requested"
  | "approved";

export type ElementaryExpansionWave = Readonly<{
  id: "grade-3-expansion-wave-1";
  publicationStatus: "hidden" | "beta";
  releaseStatus: "candidate" | "active";
  implementationStatus: "complete";
  technicalQaStatus: "ready-for-review" | "complete";
  explicitReleaseApproval: "pending" | "approved";
  approvalSource: "none" | "user-explicit-approval";
  releaseApprovalSource: "none" | "user-explicit-approval";
  reviewerType: "human-owner";
  reviewSource: "user-explicit-review";
  reviewedAt: string;
  approvedAt: string;
  reviewNote: string;
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
