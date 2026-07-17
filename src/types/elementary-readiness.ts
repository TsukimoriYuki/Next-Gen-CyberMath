import type { ElementaryPublicationStatus } from "@/types/elementary";

export type ElementaryReadinessStatus =
  | "pass"
  | "warning"
  | "fail"
  | "not-applicable"
  | "not-reviewed";

export type ElementaryReadinessArea =
  | "curriculum"
  | "kanji"
  | "lesson-quality"
  | "problem-quality"
  | "visual-assets"
  | "accessibility"
  | "responsive"
  | "publication"
  | "privacy"
  | "child-safety"
  | "guardian-information"
  | "content-inventory"
  | "technical-stability";

export type ElementaryReadinessReviewKind = "automatic" | "manual";
export type ElementaryReleaseStage = "beta" | "formal";
export type ElementaryHumanReviewStatus =
  | "not-reviewed"
  | "reviewed"
  | "approved"
  | "changes-requested";

export type ElementaryHumanReviewRecord = Readonly<{
  status: ElementaryHumanReviewStatus;
  reviewedAt: string;
  reviewedBy: "user";
  note: string;
}>;

export type ElementaryReleaseGate = Readonly<{
  id: string;
  area: ElementaryReadinessArea;
  title: string;
  description: string;
  reviewKind: ElementaryReadinessReviewKind;
  defaultStatus: ElementaryReadinessStatus;
  requiredForBeta: boolean;
  requiredForFormal: boolean;
  sourceQa?: string;
  source: string;
  nextAction?: string;
  humanReview?: ElementaryHumanReviewRecord;
}>;

export type ElementaryReadinessCheck = ElementaryReleaseGate &
  Readonly<{
    status: ElementaryReadinessStatus;
    actual?: unknown;
    evidence: string;
  }>;

export type ElementaryReadinessAreaResult = Readonly<{
  area: ElementaryReadinessArea;
  status: ElementaryReadinessStatus;
  checks: readonly ElementaryReadinessCheck[];
}>;

export type ElementaryReleaseRecommendation = Readonly<{
  beta: "recommend" | "limited-beta-allowed" | "hold";
  formal: "recommend" | "hold";
  publicationStatus: ElementaryPublicationStatus;
  betaBlockingCheckIds: readonly string[];
  formalBlockingCheckIds: readonly string[];
  reasons: readonly string[];
}>;

export type ElementaryReadinessResult = Readonly<{
  overallStatus: ElementaryReadinessStatus;
  counts: Readonly<Record<ElementaryReadinessStatus, number>>;
  checks: readonly ElementaryReadinessCheck[];
  areas: readonly ElementaryReadinessAreaResult[];
  recommendation: ElementaryReleaseRecommendation;
  lessonCount: number;
  problemCount: number;
  publicationStatus: ElementaryPublicationStatus;
}>;

export type ElementaryReadinessEvidence = Readonly<
  Record<string, ElementaryReadinessStatus | undefined>
>;
