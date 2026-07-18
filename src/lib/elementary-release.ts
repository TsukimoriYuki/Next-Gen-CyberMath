import { ELEMENTARY_SITE } from "@/data/elementary";
import { ELEMENTARY_LIMITED_BETA_RELEASE } from "@/data/elementary/release";
import { buildElementaryContentInventory } from "@/lib/elementary-inventory";
import { buildElementaryPublicationReadiness } from "@/lib/elementary-readiness";
import type { ElementaryLimitedBetaReleaseResult } from "@/types/elementary-release";

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  }
  return value;
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
  if (ELEMENTARY_SITE.publicationStatus !== "hidden") blockingReasons.push("current publicationStatus is not hidden");
  if (config.currentPublicationStatus !== ELEMENTARY_SITE.publicationStatus) blockingReasons.push("release config does not match publicationStatus");
  if (config.currentChannel !== "hidden" || config.targetChannel !== "limited-beta") blockingReasons.push("release channel transition is invalid");
  if (config.explicitReleaseApproval !== "pending") blockingReasons.push("explicit release approval must remain pending in this phase");
  if (config.automaticRelease !== false) blockingReasons.push("automatic release must be disabled");
  if (inventory.totals.lessonCount !== 3 || inventory.totals.problemCount !== 24) blockingReasons.push("approved content inventory changed");

  return deepFreeze({
    ...config,
    readiness: blockingReasons.length === 0 ? "ready" : "blocked",
    blockingReasons,
    humanReviewComplete: readiness.counts["not-reviewed"] === 0,
    formalReleaseRecommendation: "hold",
    lessonCount: inventory.totals.lessonCount,
    problemCount: inventory.totals.problemCount,
  });
}
