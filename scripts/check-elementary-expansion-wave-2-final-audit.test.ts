import assert from "node:assert/strict";
import {
  inspectElementaryWaveTwoFinalAuditFixture,
  type ElementaryWaveTwoFinalAuditFixture,
} from "../src/lib/elementary-expansion-wave-2";

const valid: ElementaryWaveTwoFinalAuditFixture = {
  technicalAuditStatus: "complete",
  humanReviewStatus: "not-reviewed",
  publicationStatus: "hidden",
  releaseApproval: "pending",
  automaticRelease: false,
  correctedAnswerMatchesExplanation: true,
  svgScaleMatchesAnswer: true,
  placeValueReadingValid: true,
  carryBorrowValid: true,
  multiplicationPartialProductValid: true,
  unitConversionValid: true,
  timeUsesBaseSixty: true,
  triangleValid: true,
  diameterValid: true,
  graphMatchesData: true,
  currentBetaProblemCount: 72,
};

assert.deepEqual(inspectElementaryWaveTwoFinalAuditFixture(valid), []);

const cases: readonly [keyof ElementaryWaveTwoFinalAuditFixture, unknown, string][] = [
  ["technicalAuditStatus", "in-progress", "technical-audit-complete"],
  ["humanReviewStatus", "approved", "technical-audit-not-human-review"],
  ["publicationStatus", "beta", "technical-audit-does-not-publish"],
  ["releaseApproval", "approved", "release-approval-remains-pending"],
  ["automaticRelease", true, "automatic-release-disabled"],
  ["correctedAnswerMatchesExplanation", false, "corrected-answer-explanation-match"],
  ["svgScaleMatchesAnswer", false, "svg-scale-answer-match"],
  ["placeValueReadingValid", false, "place-value-reading-valid"],
  ["carryBorrowValid", false, "carry-borrow-valid"],
  ["multiplicationPartialProductValid", false, "multiplication-partial-product-valid"],
  ["unitConversionValid", false, "unit-conversion-valid"],
  ["timeUsesBaseSixty", false, "time-base-sixty"],
  ["triangleValid", false, "triangle-valid"],
  ["diameterValid", false, "diameter-valid"],
  ["graphMatchesData", false, "graph-data-match"],
  ["currentBetaProblemCount", 152, "current-beta-unaffected"],
];

for (const [key, value, ruleId] of cases) {
  const issues = inspectElementaryWaveTwoFinalAuditFixture({ ...valid, [key]: value });
  assert(issues.some((issue) => issue.ruleId === ruleId), `${String(key)} must trigger ${ruleId}`);
}

console.log("elementary expansion wave 2 final audit fixture tests passed: technical QA cannot approve or publish content, and math/asset mismatches fail closed.");
