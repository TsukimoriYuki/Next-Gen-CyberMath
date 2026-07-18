import assert from "node:assert/strict";
import { inspectElementaryExpansionFixture } from "../src/lib/elementary-expansion";

const validCandidate = {
  publicationStatus: "hidden", appearsInPublishedBeta: false, explicitApproval: "approved", approvalSource: "user-explicit-approval", humanReviewStatus: "approved", formalReleaseStatus: "hold", automaticRelease: false,
  remainder: { divisor: 4, remainder: 2 }, japaneseEvidence: "本文の文", socialClaim: "この学習用の図では、そうこを通ります。",
} as const;
assert.equal(inspectElementaryExpansionFixture(validCandidate).length, 0, "valid hidden candidate must pass fixture inspection");

const invalids = [
  [{ ...validCandidate, appearsInPublishedBeta: true }, "hidden-not-published"],
  [{ ...validCandidate, remainder: { divisor: 4, remainder: 4 } }, "remainder-smaller-than-divisor"],
  [{ ...validCandidate, japaneseEvidence: "" }, "japanese-evidence-required"],
  [{ ...validCandidate, socialClaim: "全国の店は必ずすべて同じです。" }, "no-social-overgeneralization"],
  [{ ...validCandidate, explicitApproval: "approved", approvalSource: "ai-generated" }, "no-ai-approval"],
  [{ ...validCandidate, publicationStatus: "beta", appearsInPublishedBeta: true, explicitApproval: "pending" }, "public-requires-approval"],
  [{ ...validCandidate, publicationStatus: "beta", appearsInPublishedBeta: true, humanReviewStatus: "not-reviewed" }, "public-requires-human-review"],
  [{ ...validCandidate, formalReleaseStatus: "ready" }, "formal-release-hold"],
  [{ ...validCandidate, automaticRelease: true }, "automatic-release-disabled"],
] as const;

for (const [fixture, ruleId] of invalids) {
  assert.ok(inspectElementaryExpansionFixture(fixture).some((issue) => issue.ruleId === ruleId), `fixture must reject ${ruleId}`);
}

console.log("elementary expansion wave 1 fixture tests passed: hidden/public split, math remainder, Japanese evidence, social scope, human approval, and automatic release are fail closed.");
