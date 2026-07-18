import assert from "node:assert/strict";
import {
  inspectElementaryWaveTwoFixture,
  type ElementaryWaveTwoFixture,
} from "../src/lib/elementary-expansion-wave-2";

const valid: ElementaryWaveTwoFixture = {
  productionRouteStatus: 404,
  hiddenProblemsInPublishedCount: 0,
  hiddenAssetsInPublishedCredits: 0,
  publishedCombinedCount: 1420,
  registeredCombinedCount: 1500,
  approvalSource: "none",
  automaticRelease: false,
  containsTwoDigitTimesTwoDigit: false,
  placeValueValid: true,
  carryBorrowValid: true,
  unitConversionValid: true,
  timeUsesBaseSixty: true,
  triangleClassificationValid: true,
  radiusStartsAtCenter: true,
  graphMatchesData: true,
  evidenceReferenceResolved: true,
  currentBetaProblemCount: 72,
};

assert.deepEqual(inspectElementaryWaveTwoFixture(valid), []);

const cases: readonly [keyof ElementaryWaveTwoFixture, unknown, string][] = [
  ["productionRouteStatus", 200, "hidden-route-production-404"],
  ["hiddenProblemsInPublishedCount", 80, "hidden-problems-excluded"],
  ["hiddenAssetsInPublishedCredits", 8, "hidden-assets-excluded"],
  ["publishedCombinedCount", 1500, "published-combined-stays-1420"],
  ["registeredCombinedCount", 1420, "registered-combined-is-1500"],
  ["approvalSource", "ai-review", "no-ai-approval"],
  ["automaticRelease", true, "automatic-release-disabled"],
  ["containsTwoDigitTimesTwoDigit", true, "no-two-digit-times-two-digit"],
  ["placeValueValid", false, "valid-place-value"],
  ["carryBorrowValid", false, "valid-carry-borrow"],
  ["unitConversionValid", false, "valid-unit-conversion"],
  ["timeUsesBaseSixty", false, "time-base-sixty"],
  ["triangleClassificationValid", false, "valid-triangle-classification"],
  ["radiusStartsAtCenter", false, "radius-from-center"],
  ["graphMatchesData", false, "graph-matches-data"],
  ["evidenceReferenceResolved", false, "evidence-reference-resolved"],
  ["currentBetaProblemCount", 152, "current-beta-unaffected"],
];

for (const [key, value, ruleId] of cases) {
  const issues = inspectElementaryWaveTwoFixture({ ...valid, [key]: value });
  assert(issues.some((issue) => issue.ruleId === ruleId), `${String(key)} must trigger ${ruleId}`);
}

console.log("elementary expansion wave 2 fixture tests passed: hidden/public split and math safety failures are fail closed.");
