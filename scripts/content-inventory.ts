import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import {
  buildCombinedContentInventory,
  buildPersistedContentInventory,
  renderCombinedContentInventoryMarkdown,
} from "./content-inventory-lib";

const root = resolve(import.meta.dirname, "..");
const jsonPath = resolve(root, "artifacts/content-inventory.json");
const markdownPath = resolve(root, "docs/content/content-inventory.md");
const gitCommit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
const inventory = buildCombinedContentInventory(gitCommit);
const persistedInventory = buildPersistedContentInventory(inventory);

mkdirSync(dirname(jsonPath), { recursive: true });
mkdirSync(dirname(markdownPath), { recursive: true });
writeFileSync(jsonPath, `${JSON.stringify(persistedInventory, null, 2)}\n`, "utf8");
writeFileSync(markdownPath, renderCombinedContentInventoryMarkdown(inventory), "utf8");

console.log(`content inventory high school: ${inventory.highSchool.totals.scorableQuestionCount} scorable questions`);
for (const subject of inventory.highSchool.subjects) {
  console.log(`- ${subject.subjectName}: ${subject.scorableQuestionCount} questions, ${subject.courseCount} courses, ${subject.passageCount} passages`);
}
console.log(`- duplicates: ${inventory.highSchool.totals.exactDuplicateCount} exact, ${inventory.highSchool.totals.probableDuplicateCount} probable, ${inventory.highSchool.totals.sharedReferenceCount} shared references`);
console.log(`- unresolved references: ${inventory.highSchool.totals.unresolvedReferenceCount}`);
console.log(`- metadata gaps: ${inventory.highSchool.totals.missingMetadataCount}`);
console.log(`content inventory elementary: ${inventory.elementary.totals.problemCount} problems`);
console.log(`content inventory combined: ${inventory.combined.problemCount} problems`);
console.log(`wrote ${jsonPath}`);
console.log(`wrote ${markdownPath}`);
