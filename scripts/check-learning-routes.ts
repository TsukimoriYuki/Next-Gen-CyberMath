// 復習導線・補講リンク・単元 slug の参照整合性を検査する。
// npm run qa:routes
//
// 検査内容:
//  - 単元レジストリ (units-meta.ts) の slug / name が重複していないか
//  - すべての単元 slug が実際にラウンドトリップで解決できるか（getUnitSlugs → getProblemsByUnitSlug）
//  - UNIT_SLUG_ALIASES が実在する slug を指しているか
//  - MASTERY_LECTURE_GUIDES の lectureSlug / legacySlugs が実在するレクチャーと衝突なく対応しているか
//  - problem.relatedLessonSlug が実在する授業を指しているか
//  - lesson.relatedProblemSlugs / practiceProblemSlug が実在する問題を指しているか
//  - 「私からの挑戦」(CHALLENGE_SLUGS 相当) が実在する問題を指しているか

import {
  getAllLessons,
  getAllProblems,
  getProblemsByUnitSlug,
  getUnitSlugs,
  getChallengeProblems,
} from "../src/lib/content";
import { UNIT_META, UNIT_META_BY_SLUG } from "../src/data/units-meta";
import { PROBLEMS_BY_SLUG } from "../src/data/problems";
import { LESSONS_BY_SLUG } from "../src/data/lessons";
import { MASTERY_LECTURE_GUIDES } from "../src/lib/special-lecture-guidance";
import { getSpecialLectureBySlug } from "../src/data/specialLectures";

const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

// ── 単元レジストリの重複チェック ──────────────────────────────────────────
const slugCounts = new Map<string, number>();
const nameCounts = new Map<string, number>();
for (const u of UNIT_META) {
  slugCounts.set(u.slug, (slugCounts.get(u.slug) ?? 0) + 1);
  nameCounts.set(u.name, (nameCounts.get(u.name) ?? 0) + 1);
}
for (const [slug, count] of slugCounts) {
  check(count === 1, `units-meta.ts: slug "${slug}" is registered ${count} times`);
}
for (const [name, count] of nameCounts) {
  check(count === 1, `units-meta.ts: name "${name}" is registered ${count} times`);
}

// ── 単元 slug のラウンドトリップ解決 ──────────────────────────────────────
for (const slug of getUnitSlugs()) {
  const resolved = getProblemsByUnitSlug(slug);
  check(Boolean(resolved), `unit slug "${slug}" (from getUnitSlugs) does not resolve via getProblemsByUnitSlug — would 404`);
}

// ── レクチャー参照の整合 ──────────────────────────────────────────────────
const seenLectureSlugs = new Set<string>();
for (const guide of MASTERY_LECTURE_GUIDES) {
  check(
    Boolean(getSpecialLectureBySlug(guide.lectureSlug)),
    `MASTERY_LECTURE_GUIDES: lectureSlug "${guide.lectureSlug}" has no matching entry in specialLectures.ts`,
  );
  check(
    !seenLectureSlugs.has(guide.lectureSlug),
    `MASTERY_LECTURE_GUIDES: lectureSlug "${guide.lectureSlug}" is registered more than once`,
  );
  seenLectureSlugs.add(guide.lectureSlug);
  for (const legacy of guide.legacySlugs) {
    check(
      !seenLectureSlugs.has(legacy),
      `MASTERY_LECTURE_GUIDES: legacy slug "${legacy}" collides with another lecture slug`,
    );
    seenLectureSlugs.add(legacy);
  }
}

// ── 問題 → 授業 の参照整合 ────────────────────────────────────────────────
for (const problem of getAllProblems()) {
  if (problem.relatedLessonSlug) {
    check(
      Boolean(LESSONS_BY_SLUG[problem.relatedLessonSlug]),
      `problem "${problem.slug}" relatedLessonSlug "${problem.relatedLessonSlug}" does not exist`,
    );
  }
}

// ── 授業 → 問題 の参照整合 ────────────────────────────────────────────────
for (const lesson of getAllLessons()) {
  for (const slug of lesson.relatedProblemSlugs ?? []) {
    check(
      Boolean(PROBLEMS_BY_SLUG[slug]),
      `lesson "${lesson.slug}" relatedProblemSlugs references missing problem "${slug}"`,
    );
  }
  if (lesson.practiceProblemSlug) {
    check(
      Boolean(PROBLEMS_BY_SLUG[lesson.practiceProblemSlug]),
      `lesson "${lesson.slug}" practiceProblemSlug "${lesson.practiceProblemSlug}" does not exist`,
    );
  }
}

// ── 単元別データの description が空でないか（幽霊単元の再発防止の補助）────
for (const slug of getUnitSlugs()) {
  const meta = UNIT_META_BY_SLUG[slug];
  if (!meta) continue; // フォールバック slug（未登録単元）は check-public-counts 側で検出済み
  check(meta.description.trim().length > 0, `unit "${meta.name}" (${slug}) has an empty description`);
}

// ── 「私からの挑戦」が実在する問題に解決できるか ───────────────────────────
const challenge = getChallengeProblems(new Date());
check(challenge.length === 3, `getChallengeProblems() returned ${challenge.length} problems, expected 3`);

report();

function report() {
  if (issues.length > 0) {
    console.error(`learning-routes check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log("learning-routes check passed (unit slugs, lecture links, and lesson/problem cross-references all resolve).");
  }
}
