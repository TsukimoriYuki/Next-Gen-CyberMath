export type ElementaryExpansionFixture = Readonly<{
  publicationStatus: string;
  appearsInPublishedBeta: boolean;
  explicitApproval: string;
  approvalSource: string;
  humanReviewStatus?: string;
  formalReleaseStatus?: string;
  releaseStatus?: string;
  publishedProblemCount?: number;
  registeredProblemCount?: number;
  publishedCombinedProblemCount?: number;
  publishedAssetCount?: number;
  externalAssetCount?: number;
  publishedShowcaseCount?: number;
  automaticRelease: boolean;
  remainder?: Readonly<{ divisor: number; remainder: number }>;
  japaneseEvidence?: string;
  socialClaim?: string;
}>;

export type ElementaryExpansionFixtureIssue = Readonly<{
  ruleId: string;
  expected: unknown;
  actual: unknown;
}>;

export function inspectElementaryExpansionFixture(
  fixture: ElementaryExpansionFixture,
): readonly ElementaryExpansionFixtureIssue[] {
  const issues: ElementaryExpansionFixtureIssue[] = [];
  const add = (ruleId: string, expected: unknown, actual: unknown) => issues.push({ ruleId, expected, actual });

  if (fixture.publicationStatus === "hidden" && fixture.appearsInPublishedBeta) {
    add("hidden-not-published", false, fixture.appearsInPublishedBeta);
  }
  if (fixture.automaticRelease !== false) add("automatic-release-disabled", false, fixture.automaticRelease);
  if (fixture.explicitApproval === "approved" && fixture.approvalSource !== "user-explicit-approval") {
    add("no-ai-approval", "user-explicit-approval", fixture.approvalSource);
  }
  if (fixture.publicationStatus === "beta" && fixture.explicitApproval !== "approved") {
    add("public-requires-approval", "approved", fixture.explicitApproval);
  }
  if (fixture.publicationStatus === "beta" && fixture.humanReviewStatus !== "approved") {
    add("public-requires-human-review", "approved", fixture.humanReviewStatus);
  }
  if (
    fixture.publicationStatus === "hidden" &&
    fixture.releaseStatus === "active" &&
    fixture.explicitApproval === "approved" &&
    fixture.humanReviewStatus === "approved"
  ) add("approved-active-wave-must-be-public", "beta", fixture.publicationStatus);
  if (fixture.formalReleaseStatus === "ready") {
    add("formal-release-hold", "hold", fixture.formalReleaseStatus);
  }
  if (fixture.publicationStatus === "beta") {
    if (fixture.publishedProblemCount !== 72) add("published-problem-count", 72, fixture.publishedProblemCount);
    if (fixture.registeredProblemCount !== 72) add("registered-problem-count", 72, fixture.registeredProblemCount);
    if (fixture.publishedCombinedProblemCount !== 1420) add("published-combined-count", 1420, fixture.publishedCombinedProblemCount);
    if (fixture.publishedAssetCount !== 6) add("published-asset-count", 6, fixture.publishedAssetCount);
    if (fixture.externalAssetCount !== 0) add("external-asset-count", 0, fixture.externalAssetCount);
    if (fixture.publishedShowcaseCount !== 0) add("showcase-excluded", 0, fixture.publishedShowcaseCount);
  }
  if (fixture.remainder && (
    fixture.remainder.divisor <= 0 ||
    fixture.remainder.remainder < 0 ||
    fixture.remainder.remainder >= fixture.remainder.divisor
  )) add("remainder-smaller-than-divisor", `0 <= remainder < ${fixture.remainder.divisor}`, fixture.remainder.remainder);
  if (fixture.japaneseEvidence !== undefined && fixture.japaneseEvidence.trim().length === 0) {
    add("japanese-evidence-required", "non-empty evidence", fixture.japaneseEvidence);
  }
  if (fixture.socialClaim && /全国(?:で|の).*?(?:必ず|すべて).*?同じ/u.test(fixture.socialClaim)) {
    add("no-social-overgeneralization", "qualified local example", fixture.socialClaim);
  }
  return Object.freeze(issues);
}
