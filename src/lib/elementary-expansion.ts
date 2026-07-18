export type ElementaryExpansionFixture = Readonly<{
  publicationStatus: string;
  appearsInPublishedBeta: boolean;
  explicitApproval: string;
  approvalSource: string;
  humanReviewStatus?: string;
  formalReleaseStatus?: string;
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
  if (fixture.formalReleaseStatus === "ready") {
    add("formal-release-hold", "hold", fixture.formalReleaseStatus);
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
