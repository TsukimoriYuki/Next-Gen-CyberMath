import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { buildContentInventory, renderContentInventoryMarkdown, SUBJECT_IDS } from "./content-inventory-lib";

const root = resolve(import.meta.dirname, "..");
const jsonPath = resolve(root, "artifacts/content-inventory.json");
const markdownPath = resolve(root, "docs/content/content-inventory.md");
const issues: string[] = [];
const check = (condition: boolean, message: string) => { if (!condition) issues.push(message); };

const generated = buildContentInventory("test-commit", "2026-01-01T00:00:00.000Z");
const parsed = JSON.parse(readFileSync(jsonPath, "utf8")) as ReturnType<typeof buildContentInventory>;
const markdown = readFileSync(markdownPath, "utf8");
const rendered = renderContentInventoryMarkdown(generated);

check(generated.subjects.length === 4, "all four subjects must exist");
check(SUBJECT_IDS.every((id) => generated.subjects.some((subject) => subject.subjectId === id)), "subject IDs are incomplete");
check(generated.totals.scorableQuestionCount === generated.subjects.reduce((sum, subject) => sum + subject.scorableQuestionCount, 0), "subject totals do not add up");
check(generated.subjects.find((subject) => subject.subjectId === "japanese")?.scorableQuestionCount === 160, "Japanese scorable count must remain 160");
check(generated.totals.unresolvedReferenceCount === generated.unresolvedReferences.length, "unresolved reference count is inconsistent");
check(generated.totals.unresolvedReferenceCount === 0, "registry references must resolve");
check(generated.items.every((item) => !item.isCounted || item.isScorable), "a non-scorable item was counted");
for (const group of new Set(generated.items.filter((item) => item.duplicateStatus === "exact duplicate").map((item) => item.duplicateGroup))) {
  check(generated.items.filter((item) => item.duplicateGroup === group && item.isCounted).length <= 1, `duplicate group ${group} is counted more than once`);
}
check(parsed.gitCommit !== "test-commit", "persisted JSON must contain a real git commit");
check(parsed.totals.scorableQuestionCount === generated.totals.scorableQuestionCount, "persisted JSON is stale");
for (let section = 1; section <= 18; section += 1) {
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
  console.log(`content inventory QA passed: ${generated.totals.scorableQuestionCount} unique scorable questions, 18 report sections, JSON parsed`);
}
