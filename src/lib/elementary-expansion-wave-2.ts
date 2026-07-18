export type ElementaryWaveTwoFixture = Readonly<{
  productionRouteStatus: number;
  hiddenProblemsInPublishedCount: number;
  hiddenAssetsInPublishedCredits: number;
  publishedCombinedCount: number;
  registeredCombinedCount: number;
  approvalSource: string;
  automaticRelease: boolean;
  containsTwoDigitTimesTwoDigit: boolean;
  placeValueValid: boolean;
  carryBorrowValid: boolean;
  unitConversionValid: boolean;
  timeUsesBaseSixty: boolean;
  triangleClassificationValid: boolean;
  radiusStartsAtCenter: boolean;
  graphMatchesData: boolean;
  evidenceReferenceResolved: boolean;
  currentBetaProblemCount: number;
}>;

export type ElementaryWaveTwoFixtureIssue = Readonly<{
  ruleId: string;
  expected: unknown;
  actual: unknown;
}>;

export function inspectElementaryWaveTwoFixture(
  fixture: ElementaryWaveTwoFixture,
): readonly ElementaryWaveTwoFixtureIssue[] {
  const issues: ElementaryWaveTwoFixtureIssue[] = [];
  const add = (ruleId: string, expected: unknown, actual: unknown) => issues.push({ ruleId, expected, actual });
  if (fixture.productionRouteStatus !== 404) add("hidden-route-production-404", 404, fixture.productionRouteStatus);
  if (fixture.hiddenProblemsInPublishedCount !== 0) add("hidden-problems-excluded", 0, fixture.hiddenProblemsInPublishedCount);
  if (fixture.hiddenAssetsInPublishedCredits !== 0) add("hidden-assets-excluded", 0, fixture.hiddenAssetsInPublishedCredits);
  if (fixture.publishedCombinedCount !== 1420) add("published-combined-stays-1420", 1420, fixture.publishedCombinedCount);
  if (fixture.registeredCombinedCount !== 1500) add("registered-combined-is-1500", 1500, fixture.registeredCombinedCount);
  if (fixture.approvalSource !== "none") add("no-ai-approval", "none", fixture.approvalSource);
  if (fixture.automaticRelease !== false) add("automatic-release-disabled", false, fixture.automaticRelease);
  if (fixture.containsTwoDigitTimesTwoDigit) add("no-two-digit-times-two-digit", false, fixture.containsTwoDigitTimesTwoDigit);
  if (!fixture.placeValueValid) add("valid-place-value", true, fixture.placeValueValid);
  if (!fixture.carryBorrowValid) add("valid-carry-borrow", true, fixture.carryBorrowValid);
  if (!fixture.unitConversionValid) add("valid-unit-conversion", true, fixture.unitConversionValid);
  if (!fixture.timeUsesBaseSixty) add("time-base-sixty", true, fixture.timeUsesBaseSixty);
  if (!fixture.triangleClassificationValid) add("valid-triangle-classification", true, fixture.triangleClassificationValid);
  if (!fixture.radiusStartsAtCenter) add("radius-from-center", true, fixture.radiusStartsAtCenter);
  if (!fixture.graphMatchesData) add("graph-matches-data", true, fixture.graphMatchesData);
  if (!fixture.evidenceReferenceResolved) add("evidence-reference-resolved", true, fixture.evidenceReferenceResolved);
  if (fixture.currentBetaProblemCount !== 72) add("current-beta-unaffected", 72, fixture.currentBetaProblemCount);
  return Object.freeze(issues);
}
