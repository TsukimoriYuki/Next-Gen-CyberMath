import { ELEMENTARY_SITE } from "@/data/elementary";
import { ELEMENTARY_LIMITED_BETA_RELEASE } from "@/data/elementary/release";
import { buildElementaryContentInventory } from "@/lib/elementary-inventory";
import { buildElementaryPublicationReadiness } from "@/lib/elementary-readiness";
import type { ElementaryLimitedBetaReleaseResult } from "@/types/elementary-release";
import type { ElementaryPublicationStatus } from "@/types/elementary";

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  }
  return value;
}

export function isElementaryLimitedBetaActive(
  publicationStatus: ElementaryPublicationStatus | string = ELEMENTARY_SITE.publicationStatus,
): boolean {
  const config = ELEMENTARY_LIMITED_BETA_RELEASE;
  return publicationStatus === "beta" &&
    config.currentPublicationStatus === "beta" &&
    config.currentChannel === "limited-beta" &&
    config.targetChannel === "limited-beta" &&
    config.explicitReleaseApproval === "approved" &&
    config.approvalSource === "user-explicit-approval" &&
    config.automaticRelease === false;
}

export function buildElementaryLimitedBetaRelease(): ElementaryLimitedBetaReleaseResult {
  const config = ELEMENTARY_LIMITED_BETA_RELEASE;
  const readiness = buildElementaryPublicationReadiness();
  const inventory = buildElementaryContentInventory();
  const blockingReasons: string[] = [];

  if (readiness.recommendation.beta !== "limited-beta-ready") blockingReasons.push("limited beta readiness is not ready");
  if (readiness.counts.fail !== 0) blockingReasons.push("readiness contains fail checks");
  if (readiness.counts["not-reviewed"] !== 0) blockingReasons.push("human review is incomplete");
  if (readiness.recommendation.formal !== "hold") blockingReasons.push("formal release must remain on hold");
  if (config.currentPublicationStatus !== ELEMENTARY_SITE.publicationStatus) blockingReasons.push("release config does not match publicationStatus");
  if (config.currentChannel !== "limited-beta" || config.targetChannel !== "limited-beta") blockingReasons.push("release channel is not limited-beta");
  if (config.explicitReleaseApproval !== "approved") blockingReasons.push("explicit release approval is missing");
  if (config.approvalSource !== "user-explicit-approval") blockingReasons.push("release approval source is invalid");
  if (config.automaticRelease !== false) blockingReasons.push("automatic release must be disabled");
  if (inventory.totals.lessonCount !== 9 || inventory.totals.problemCount !== 72) blockingReasons.push("approved content inventory changed");

  const active = blockingReasons.length === 0 && isElementaryLimitedBetaActive();
  return deepFreeze({
    ...config,
    readiness: blockingReasons.length === 0 ? "ready" : "blocked",
    releaseState: blockingReasons.length > 0 ? "blocked" : active ? "active" : "ready",
    blockingReasons,
    humanReviewComplete: readiness.counts["not-reviewed"] === 0,
    formalReleaseRecommendation: "hold",
    lessonCount: inventory.totals.lessonCount,
    problemCount: inventory.totals.problemCount,
  });
}
