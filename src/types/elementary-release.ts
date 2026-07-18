import type { ElementaryInlineContent } from "@/types/elementary-content";
import type { ElementaryPublicationStatus } from "@/types/elementary";

export type ElementaryReleaseChannel = "hidden" | "limited-beta" | "public";
export type ElementaryLimitedBetaReadiness = "ready" | "blocked";
export type ElementaryReleaseOwnerApproval = "pending" | "approved" | "rejected";
export type ElementaryReleaseState = "ready" | "active" | "blocked";

export type ElementaryReleaseScopeItem = Readonly<{
  id: string;
  label: string;
}>;

export type ElementaryReleasePrerequisite = ElementaryReleaseScopeItem &
  Readonly<{ source: string }>;

export type ElementaryReleaseDisplayCopy = Readonly<{
  guardianBadge: "限定β版";
  badge: ElementaryInlineContent;
  messages: readonly ElementaryInlineContent[];
}>;

export type ElementaryReleaseLearnCard = Readonly<{
  title: "小学生版";
  description: string;
  href: "/elementary";
  label: string;
  meta: string;
}>;

export type ElementaryLimitedBetaReleaseConfig = Readonly<{
  currentChannel: ElementaryReleaseChannel;
  targetChannel: ElementaryReleaseChannel;
  currentPublicationStatus: ElementaryPublicationStatus;
  declaredReadiness: "ready";
  recommendation: "limited-beta-ready";
  approvedScope: readonly ElementaryReleaseScopeItem[];
  excludedScope: readonly ElementaryReleaseScopeItem[];
  prerequisites: readonly ElementaryReleasePrerequisite[];
  rollbackConditions: readonly ElementaryReleaseScopeItem[];
  explicitReleaseApproval: ElementaryReleaseOwnerApproval;
  approvalSource: "user-explicit-approval";
  approvedAt: string;
  automaticRelease: false;
  preparedAt: string;
  lastReviewedAt: string;
  learnerDisplay: ElementaryReleaseDisplayCopy;
  learnCard: ElementaryReleaseLearnCard;
}>;

export type ElementaryLimitedBetaReleaseResult = ElementaryLimitedBetaReleaseConfig &
  Readonly<{
    readiness: ElementaryLimitedBetaReadiness;
    releaseState: ElementaryReleaseState;
    blockingReasons: readonly string[];
    humanReviewComplete: boolean;
    formalReleaseRecommendation: "hold";
    lessonCount: number;
    problemCount: number;
  }>;
