import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { buildContentInventory, renderContentInventoryMarkdown } from "./content-inventory-lib";

const root = resolve(import.meta.dirname, "..");
const jsonPath = resolve(root, "artifacts/content-inventory.json");
const markdownPath = resolve(root, "docs/content/content-inventory.md");
const gitCommit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
const inventory = buildContentInventory(gitCommit);

mkdirSync(dirname(jsonPath), { recursive: true });
mkdirSync(dirname(markdownPath), { recursive: true });
writeFileSync(jsonPath, `${JSON.stringify(inventory, null, 2)}\n`, "utf8");
writeFileSync(markdownPath, renderContentInventoryMarkdown(inventory), "utf8");

console.log(`content inventory: ${inventory.totals.scorableQuestionCount} scorable questions`);
for (const subject of inventory.subjects) {
  console.log(`- ${subject.subjectName}: ${subject.scorableQuestionCount} questions, ${subject.courseCount} courses, ${subject.passageCount} passages`);
}
console.log(`- duplicates: ${inventory.totals.exactDuplicateCount} exact, ${inventory.totals.probableDuplicateCount} probable, ${inventory.totals.sharedReferenceCount} shared references`);
console.log(`- unresolved references: ${inventory.totals.unresolvedReferenceCount}`);
console.log(`- metadata gaps: ${inventory.totals.missingMetadataCount}`);
console.log(`wrote ${jsonPath}`);
console.log(`wrote ${markdownPath}`);
