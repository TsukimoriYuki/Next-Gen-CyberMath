import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import { JAPANESE_COURSE_SUBJECT, getJapaneseRelatedCourseLinks } from "../src/data/courses/japanese";
import { JAPANESE_PROBLEMS } from "../src/data/japanese";
import { JAPANESE_READING_PASSAGES } from "../src/data/japanese/reading";
import { getActiveNavigationId } from "../src/data/navigation";
import { PUBLIC_SUBJECTS, SUBJECTS } from "../src/data/subjects";
import { getSiteUrl, PRODUCTION_SITE_URL } from "../src/lib/site";
import { canAccessSubject, isSubjectResourceDiscoverable } from "../src/lib/subject-publication";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
const japanese = SUBJECTS.find((subject) => subject.id === "japanese");
assert(japanese);
assert.equal(japanese.status, "beta");
assert.equal(PUBLIC_SUBJECTS.filter((subject) => subject.id === "japanese").length, 1);
assert(canAccessSubject("japanese", undefined, "production"));
assert(isSubjectResourceDiscoverable("japanese", "courses"));
assert(isSubjectResourceDiscoverable("japanese", "problems"));
assert.equal(japanese.capabilities.exams, false);

const lessons = JAPANESE_COURSE_SUBJECT.units.flatMap((unit) => unit.lessons);
assert.equal(JAPANESE_COURSE_SUBJECT.units.length, 4);
assert.equal(lessons.length, 16);
assert.equal(JAPANESE_PROBLEMS.length, 160);
assert.equal(JAPANESE_READING_PASSAGES.length, 20);
assert.equal(JAPANESE_PROBLEMS.filter((problem) => problem.area === "modern-reading").length, 100);

const lessonIds = new Set(lessons.map((lesson) => lesson.lessonId));
for (const problem of JAPANESE_PROBLEMS) {
  assert(problem.relatedCourseIds.every((id) => lessonIds.has(id)), `${problem.id}: unresolved course`);
  assert(problem.choices.some((choice) => choice.id === problem.correctAnswer), `${problem.id}: invalid answer`);
  assert.equal(getJapaneseRelatedCourseLinks(problem.relatedCourseIds).length, new Set(problem.relatedCourseIds).size, `${problem.id}: related link mismatch`);
}

const sitemapEntries = sitemap();
const urls = sitemapEntries.map((entry) => entry.url);
const paths = new Set(urls.map((url) => new URL(url).pathname));
assert.equal(new Set(urls).size, urls.length, "duplicate sitemap URL");
for (const route of ["/japanese", "/courses/japanese", "/japanese/problems", "/japanese/reading"]) assert(paths.has(route), `sitemap missing ${route}`);
for (const unit of JAPANESE_COURSE_SUBJECT.units) {
  assert(paths.has(`/courses/japanese/${unit.unitId}`));
  for (const lesson of unit.lessons) assert(paths.has(`/courses/japanese/${unit.unitId}/${lesson.lessonId}`));
}
for (const problem of JAPANESE_PROBLEMS.filter((entry) => entry.area !== "modern-reading")) assert(paths.has(`/japanese/problems/${problem.slug}`));
for (const passage of JAPANESE_READING_PASSAGES) assert(paths.has(`/japanese/reading/${passage.slug}`));
assert.equal(getSiteUrl(), PRODUCTION_SITE_URL);
assert.equal(PRODUCTION_SITE_URL, "https://cyber-math-production.up.railway.app");

const home = read("src/app/page.tsx");
const subjects = read("src/app/subjects/page.tsx");
const learn = read("src/app/learn/page.tsx");
const practice = read("src/app/practice/page.tsx");
const japanesePage = read("src/app/japanese/page.tsx");
assert(home.includes("PUBLIC_SUBJECTS.map"));
assert(subjects.includes("PUBLIC_SUBJECTS.map"));
assert(learn.includes('href: "/courses/japanese"'));
assert(practice.includes('href: "/japanese/problems"') && practice.includes('href: "/japanese/reading"'));
for (const label of ["現代文語彙", "現代文読解", "古文", "漢文", "16", "160"]) assert(japanesePage.includes(label), `Japanese top missing ${label}`);
for (const forbidden of ["国語模試", "大問別演習", "過去問", "漢字大量演習", "記述式採点", "ランキング", "ガチャ", "近日公開", "準備中", "開発確認用"]) assert(!japanesePage.includes(forbidden), `forbidden public copy: ${forbidden}`);
for (const file of ["src/app/japanese/page.tsx", "src/app/japanese/problems/page.tsx", "src/app/japanese/reading/page.tsx"]) {
  const source = read(file);
  assert(source.includes("createPublicMetadata"), `${file}: public metadata missing`);
  assert(!source.includes("index: false"), `${file}: public page remains noindex`);
}
assert.equal(getActiveNavigationId("/japanese"), "subjects");
assert.equal(getActiveNavigationId("/japanese/problems"), "problems");
assert.equal(getActiveNavigationId("/japanese/reading/jp-reading-01"), "problems");
assert(!fs.existsSync(path.join(root, "src/app/search/page.tsx")), "unexpected site search route; add Japanese to its registry");
assert(!read("src/data/navigation.ts").includes('{ id: "japanese"'), "Japanese must not become global navigation");

console.log(`Japanese publication QA passed: beta, 4 areas, 16 lessons, 160 problems, ${paths.size} sitemap paths, Railway canonical, discovery and related links verified.`);
