export type ElementaryExpansionHumanReviewStatus =
  | "not-reviewed"
  | "changes-requested"
  | "approved";

export type ElementaryExpansionTechnicalAudit = Readonly<{
  status: "complete";
  auditedAt: string;
  auditedLessonCount: number;
  auditedProblemCount: number;
  auditedAssetCount: number;
  correctedIssueCount: number;
  correctedProblemCount: number;
  correctedLessonTextCount: number;
  correctedAssetCount: number;
  remainingTechnicalIssueCount: number;
  remainingBlockingIssueCount: number;
}>;

export type ElementaryExpansionWave = Readonly<{
  id: "grade-3-expansion-wave-1" | "grade-3-math-expansion-wave-2";
  publicationStatus: "hidden" | "beta";
  releaseStatus: "candidate" | "ready-for-review" | "active";
  implementationStatus: "complete";
  technicalQaStatus: "ready-for-review" | "complete";
  finalTechnicalAudit?: ElementaryExpansionTechnicalAudit;
  explicitReleaseApproval: "pending" | "approved";
  approvalSource: "none" | "user-explicit-approval";
  releaseApprovalSource: "none" | "user-explicit-approval";
  reviewerType: "human-owner" | "none";
  reviewSource: "user-explicit-review" | "none";
  createdAt: string;
  reviewedAt: string | null;
  approvedAt: string | null;
  reviewNote: string;
  automaticRelease: false;
  lessonIds: readonly string[];
  unitIds: readonly string[];
  problemIds?: readonly string[];
  assetIds?: readonly string[];
  humanReviews: Readonly<{
    math: ElementaryExpansionHumanReviewStatus;
    japanese: ElementaryExpansionHumanReviewStatus;
    socialStudies: ElementaryExpansionHumanReviewStatus;
    guardian: ElementaryExpansionHumanReviewStatus;
    release: ElementaryExpansionHumanReviewStatus;
  }>;
}>;
