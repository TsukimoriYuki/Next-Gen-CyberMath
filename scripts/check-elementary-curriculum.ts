import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import {
  ELEMENTARY_CURRICULUM_DOMAINS,
  ELEMENTARY_CURRICULUM_ENTRIES,
  ELEMENTARY_CURRICULUM_SOURCES,
} from "../src/data/elementary/curriculum";
import { ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE } from "../src/data/elementary/showcases/division-dialogue";
import { PRIMARY_NAVIGATION } from "../src/data/navigation";
import type { CurriculumLessonValidationShape } from "./elementary-curriculum-validation";
import { inspectElementaryCurriculum } from "./elementary-curriculum-validation";

async function main() {
  const lesson = ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE as unknown as CurriculumLessonValidationShape;
  const result = inspectElementaryCurriculum({
    sources: ELEMENTARY_CURRICULUM_SOURCES,
    domains: ELEMENTARY_CURRICULUM_DOMAINS,
    entries: ELEMENTARY_CURRICULUM_ENTRIES,
    lessons: [lesson],
    requireCompleteGrade3Scope: true,
  });
  const issues = [...result.violations];
  const route = "/elementary/showcase/curriculum";
  const sitemapUrls = (await sitemap()).map((entry) => entry.url);
  if (sitemapUrls.some((url) => url.includes(route))) {
    issues.push({ entityId: route, fieldPath: "sitemap", ruleId: "CURRICULUM_SHOWCASE_NOT_IN_SITEMAP", expected: false, actual: true });
  }
  if (PRIMARY_NAVIGATION.some((item) => item.href === route)) {
    issues.push({ entityId: route, fieldPath: "navigation", ruleId: "CURRICULUM_SHOWCASE_NOT_IN_NAVIGATION", expected: false, actual: true });
  }
  for (const sourcePath of ["src/app/elementary/page.tsx", "src/app/elementary/grade-3/page.tsx", "src/data/elementary/index.ts"]) {
    const source = fs.readFileSync(path.join(process.cwd(), sourcePath), "utf8");
    if (source.includes(route) || source.includes("showcase/curriculum")) {
      issues.push({ entityId: sourcePath, fieldPath: "source", ruleId: "CURRICULUM_SHOWCASE_DIRECT_URL_ONLY", expected: "no public link", actual: route });
    }
  }
  if (issues.length > 0) {
    console.error(`elementary curriculum QA FAILED: ${issues.length} issue(s).`);
    issues.forEach((issue) => console.error(JSON.stringify(issue)));
    process.exitCode = 1;
    return;
  }
  const objectiveCount = ELEMENTARY_CURRICULUM_ENTRIES.reduce((count, entry) => count + entry.objectives.length, 0);
  console.log(`elementary curriculum QA passed: ${ELEMENTARY_CURRICULUM_SOURCES.length} sources, ${ELEMENTARY_CURRICULUM_DOMAINS.length} domains, ${ELEMENTARY_CURRICULUM_ENTRIES.length} entries, ${objectiveCount} objectives, and 0 unresolved or cyclic references.`);
}

void main();
