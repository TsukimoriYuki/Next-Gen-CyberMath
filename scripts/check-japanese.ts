import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import { SUBJECTS } from "../src/data/subjects";
import { JAPANESE_PROBLEMS } from "../src/data/japanese";
import { COURSE_SUBJECTS } from "../src/data/courses";
import {
  canAccessSubject,
  isSubjectResourceDiscoverable,
} from "../src/lib/subject-publication";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
const japanese = SUBJECTS.find((subject) => subject.id === "japanese");

assert(japanese, "Japanese subject is missing");
assert.equal(japanese.status, "hidden");
assert.equal(canAccessSubject("japanese", undefined, "production"), false);
assert.equal(canAccessSubject("japanese", undefined, "preview"), false);
assert.equal(canAccessSubject("japanese", undefined, "development"), true);
assert.equal(isSubjectResourceDiscoverable("japanese", "courses"), false);
assert.equal(isSubjectResourceDiscoverable("japanese", "problems"), false);

const sitemapPaths = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
assert(!sitemapPaths.has("/japanese"), "hidden Japanese subject leaked into sitemap");
assert(!read("src/data/navigation.ts").includes('href: "/japanese"'), "Japanese leaked into navigation");

for (const file of [
  "src/app/japanese/layout.tsx",
  "src/app/japanese/page.tsx",
  "src/app/japanese/problems/page.tsx",
  "src/app/japanese/problems/[problemId]/page.tsx",
]) {
  assert(read(file).includes("requireSubjectPageAccess"), `${file} lacks the publication guard`);
}

const ids = new Set<string>();
const slugs = new Set<string>();
const courseIds = new Set(
  COURSE_SUBJECTS.flatMap((subject) =>
    subject.units.flatMap((unit) => unit.lessons.map((lesson) => lesson.lessonId)),
  ),
);
for (const problem of JAPANESE_PROBLEMS) {
  assert(!ids.has(problem.id), `duplicate Japanese problem ID: ${problem.id}`);
  assert(!slugs.has(problem.slug), `duplicate Japanese problem slug: ${problem.slug}`);
  ids.add(problem.id);
  slugs.add(problem.slug);
  assert(problem.choices.some((choice) => choice.id === problem.correctAnswer), `${problem.id}: correct answer is absent`);
  assert(problem.explanation.length >= 30, `${problem.id}: explanation is too short`);
  assert(problem.evidence.length >= 15, `${problem.id}: evidence is too short`);
  for (const choice of problem.choices) {
    if (choice.id !== problem.correctAnswer) {
      assert(problem.distractorReasons[choice.id]?.length >= 6, `${problem.id}: ${choice.id} has no detailed distractor reason`);
    }
  }
  assert(problem.grammarPoint || problem.vocabularyTags.length > 0, `${problem.id}: grammar/vocabulary point is missing`);
  assert(problem.relatedCourseIds.every((id) => courseIds.has(id)), `${problem.id}: related course is missing`);
  assert(["original", "public-domain-original"].includes(problem.copyrightStatus), `${problem.id}: unsupported copyright status`);
}

for (const area of ["kanbun", "classical-japanese"] as const) {
  const problems = JAPANESE_PROBLEMS.filter((problem) => problem.area === area);
  if (problems.length === 0) continue;
  assert.equal(problems.length, 20, `${area}: expected 20 problems`);
  assert.equal(problems.filter((problem) => problem.difficulty === "basic").length, 8, `${area}: basic count`);
  assert.equal(problems.filter((problem) => problem.difficulty === "standard").length, 8, `${area}: standard count`);
  assert.equal(problems.filter((problem) => problem.difficulty === "common-test-ready").length, 4, `${area}: common-test-ready count`);
  const courseCounts = new Map<string, number>();
  for (const problem of problems) {
    for (const courseId of problem.relatedCourseIds) courseCounts.set(courseId, (courseCounts.get(courseId) ?? 0) + 1);
  }
  assert.equal(courseCounts.size, 4, `${area}: expected four courses`);
  for (const [courseId, count] of courseCounts) assert.equal(count, 5, `${courseId}: expected five problems`);
}

for (const problem of JAPANESE_PROBLEMS.filter((entry) => entry.area === "kanbun")) {
  assert(problem.writtenReading, `${problem.id}: written reading is missing`);
}
for (const problem of JAPANESE_PROBLEMS.filter((entry) => entry.area === "classical-japanese")) {
  assert(problem.modernTranslation, `${problem.id}: original modern translation is missing`);
}

console.log(`Japanese foundation QA passed: hidden publication guard, discovery exclusions, guarded pages, and ${JAPANESE_PROBLEMS.length} registered problem keys verified.`);
