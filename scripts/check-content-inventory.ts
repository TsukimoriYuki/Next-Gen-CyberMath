import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  buildCombinedContentInventory,
  buildPersistedContentInventory,
  renderCombinedContentInventoryMarkdown,
  SUBJECT_IDS,
} from "./content-inventory-lib";

const root = resolve(import.meta.dirname, "..");
const jsonPath = resolve(root, "artifacts/content-inventory.json");
const markdownPath = resolve(root, "docs/content/content-inventory.md");
const issues: string[] = [];
const check = (condition: boolean, message: string) => { if (!condition) issues.push(message); };

const generated = buildCombinedContentInventory("test-commit", "2026-01-01T00:00:00.000Z");
const parsed = JSON.parse(readFileSync(jsonPath, "utf8")) as ReturnType<typeof buildPersistedContentInventory>;
const markdown = readFileSync(markdownPath, "utf8");
const rendered = renderCombinedContentInventoryMarkdown(generated);
const highSchool = generated.highSchool;

check(highSchool.subjects.length === 4, "all four high-school subjects must exist");
check(SUBJECT_IDS.every((id) => highSchool.subjects.some((subject) => subject.subjectId === id)), "subject IDs are incomplete");
check(highSchool.totals.scorableQuestionCount === highSchool.subjects.reduce((sum, subject) => sum + subject.scorableQuestionCount, 0), "high-school subject totals do not add up");
check(highSchool.totals.scorableQuestionCount === 1348, "high-school scorable count must stay 1348");
check(highSchool.subjects.find((subject) => subject.subjectId === "japanese")?.scorableQuestionCount === 190, "Japanese scorable count must be 190");
check(highSchool.totals.unresolvedReferenceCount === highSchool.unresolvedReferences.length, "unresolved reference count is inconsistent");
check(highSchool.totals.unresolvedReferenceCount === 0, "registry references must resolve");
check(highSchool.items.every((item) => !item.isCounted || item.isScorable), "a non-scorable item was counted");
for (const group of new Set(highSchool.items.filter((item) => item.duplicateStatus === "exact duplicate").map((item) => item.duplicateGroup))) {
  check(highSchool.items.filter((item) => item.duplicateGroup === group && item.isCounted).length <= 1, `duplicate group ${group} is counted more than once`);
}
check(parsed.gitCommit !== "test-commit", "persisted JSON must contain a real git commit");
check(parsed.totals.scorableQuestionCount === highSchool.totals.scorableQuestionCount, "persisted legacy high-school JSON is stale");
check(parsed.highSchool.problemCount === highSchool.totals.scorableQuestionCount, "persisted high-school summary is stale");
check(generated.elementary.totals.problemCount === 72, "elementary problem count must be 72");
check(generated.combined.problemCount === 1420, "combined problem count must be 1420");
check(parsed.elementary.totals.problemCount === 72 && parsed.combined.problemCount === 1420, "persisted elementary/combined JSON is stale");
for (let section = 1; section <= 19; section += 1) {
  check(markdown.includes(`## ${section}.`), `Markdown section ${section} is missing`);
  check(rendered.includes(`## ${section}.`), `renderer section ${section} is missing`);
}
check(!markdown.includes("correctAnswer"), "Markdown must not dump answer fields");
check(!JSON.stringify(parsed.items).includes("questionText"), "JSON items must not dump question text");

if (issues.length) {
  console.error(`content inventory QA failed: ${issues.length} issue(s)`);
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exitCode = 1;
} else {
  console.log(`content inventory QA passed: high school ${highSchool.totals.scorableQuestionCount}, elementary ${generated.elementary.totals.problemCount}, combined ${generated.combined.problemCount}, 19 report sections, JSON parsed`);
}
