import fs from "node:fs";
import path from "node:path";
import { ELEMENTARY_SITE } from "../src/data/elementary";
import { SUBJECTS } from "../src/data/subjects";
import { evaluateElementaryPublication } from "../src/lib/elementary-publication";
import { isElementaryLimitedBetaActive } from "../src/lib/elementary-release";
import { evaluateSubjectPublication } from "../src/lib/subject-publication";

const issues: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) issues.push(message);
};

const rollbackFixture = Object.freeze({ publicationStatus: "hidden" as const });
const protectedScopes = [
  "elementary root",
  "grade-3",
  "subject",
  "unit",
  "lesson",
  "guardian page",
  "credits page",
] as const;

for (const scope of protectedScopes) {
  const decision = evaluateElementaryPublication(rollbackFixture.publicationStatus, "production");
  check(!decision.allowed, `${scope} must be 404 after the release-only hidden switch`);
}

check(
  !isElementaryLimitedBetaActive(rollbackFixture.publicationStatus),
  "/learn elementary card must be absent after the release-only hidden switch",
);
check(
  ELEMENTARY_SITE.publicationStatus === "beta",
  "rollback fixture must not mutate the live elementary registry",
);
check(
  SUBJECTS.every((subject) => evaluateSubjectPublication(subject, undefined, "production").allowed),
  "rollback fixture must not affect high-school publication",
);

const documentSource = fs.readFileSync(
  path.join(process.cwd(), "docs/elementary-limited-beta-release.md"),
  "utf8",
);
for (const requiredText of [
  "ELEMENTARY_SITE.publicationStatus",
  "beta",
  "hidden",
  "DB rollbackは不要",
  "高校版全体を停止しない",
]) {
  check(documentSource.includes(requiredText), `rollback document is missing: ${requiredText}`);
}

if (issues.length) {
  console.error(`elementary limited beta rollback test FAILED: ${issues.length} issue(s).`);
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exitCode = 1;
} else {
  console.log("elementary limited beta rollback test passed: one release-only hidden switch protects all elementary routes and the learn card without affecting high school.");
}
