import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import { SUBJECTS } from "../src/data/subjects";
import { JAPANESE_PROBLEMS } from "../src/data/japanese";
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
for (const problem of JAPANESE_PROBLEMS) {
  assert(!ids.has(problem.id), `duplicate Japanese problem ID: ${problem.id}`);
  assert(!slugs.has(problem.slug), `duplicate Japanese problem slug: ${problem.slug}`);
  ids.add(problem.id);
  slugs.add(problem.slug);
}

console.log(`Japanese foundation QA passed: hidden publication guard, discovery exclusions, guarded pages, and ${JAPANESE_PROBLEMS.length} registered problem keys verified.`);
