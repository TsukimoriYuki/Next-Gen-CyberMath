import assert from "node:assert/strict";

import sitemap from "../src/app/sitemap";
import { COURSE_SUBJECTS } from "../src/data/courses";
import { JAPANESE_PROBLEMS } from "../src/data/japanese";
import {
  JAPANESE_READING_CORE_PASSAGES,
  JAPANESE_READING_EXAM_SETS,
  JAPANESE_READING_PASSAGES,
  getJapaneseReadingCharacterCount,
} from "../src/data/japanese/reading";

const sets = JAPANESE_READING_EXAM_SETS;
const questions = sets.flatMap((set) => set.questions);
const courseIds = new Set(COURSE_SUBJECTS.flatMap((subject) => subject.units.flatMap((unit) => unit.lessons.map((lesson) => lesson.lessonId))));
const countBy = <T>(values: readonly T[], key: (value: T) => string) => Object.fromEntries([...new Set(values.map(key))].map((value) => [value, values.filter((item) => key(item) === value).length]));

assert.equal(sets.length, 6);
assert(sets.every((set) => set.questions.length === 5));
assert.equal(questions.length, 30);
assert.equal(JAPANESE_READING_CORE_PASSAGES.length, 20);
assert.equal(JAPANESE_READING_PASSAGES.length, 26);
assert.equal(JAPANESE_PROBLEMS.length, 190);
assert.deepEqual(countBy(sets, (set) => set.genre), { criticism: 3, fiction: 2, practical: 1 });
assert.deepEqual(countBy(questions, (question) => question.difficulty), { basic: 6, standard: 16, "common-test-ready": 8 });
assert.deepEqual(countBy(questions, (question) => question.examFormat ?? "missing"), {
  "single-choice": 20,
  "fill-matching": 3,
  "multiple-select": 4,
  ordering: 1,
  "material-condition": 2,
});

const limits = [[2000, 2700], [1800, 2400], [2400, 3200], [2200, 3000], [1800, 2500], [1600, 2400]] as const;
const allIds = JAPANESE_PROBLEMS.map((problem) => problem.id);
assert.equal(new Set(allIds).size, allIds.length, "global Japanese problem IDs must be unique");
assert.equal(new Set(JAPANESE_PROBLEMS.map((problem) => problem.slug)).size, JAPANESE_PROBLEMS.length, "global Japanese slugs must be unique");

const explanationBodies = new Set<string>();
for (const [setIndex, set] of sets.entries()) {
  const length = getJapaneseReadingCharacterCount(set);
  assert(length >= limits[setIndex][0] && length <= limits[setIndex][1], `${set.id}: character count ${length}`);
  assert.equal(set.practiceKind, "exam-set");
  assert.equal(set.sourceType, "original");
  assert.equal(set.copyrightStatus, "original");
  assert(set.estimatedReadingTime >= 12 && set.estimatedReadingTime <= 18);
  const evidenceIds = new Set([...set.paragraphs.map((paragraph) => paragraph.id), ...(set.materials?.map((material) => material.id) ?? [])]);
  const corpus = [
    ...set.paragraphs.map((paragraph) => paragraph.text),
    ...(set.materials?.flatMap((material) => [material.body ?? "", ...(material.items ?? []), ...(material.headers ?? []), ...(material.rows?.flat() ?? [])]) ?? []),
  ].join("\n");
  for (const question of set.questions) {
    assert.equal(question.id, question.slug);
    assert.equal(question.passageSetId, set.id);
    assert(question.questionNumber >= 1 && question.questionNumber <= 5);
    assert(question.correctAnswers.length > 0);
    assert(question.correctAnswer !== undefined);
    assert.equal(new Set(question.correctAnswers).size, question.correctAnswers.length);
    assert(question.correctAnswers.every((answer) => question.choices.some((choice) => choice.id === answer)));
    assert.equal(new Set(question.choices.map((choice) => choice.id)).size, question.choices.length);
    assert.equal(new Set(question.choices.map((choice) => choice.text)).size, question.choices.length);
    for (const choice of question.choices.filter((choice) => !question.correctAnswers.includes(choice.id))) {
      assert((question.distractorReasons[choice.id]?.length ?? 0) >= 15, `${question.id}: weak reason ${choice.id}`);
    }
    assert(question.evidenceParagraphIds.every((id) => evidenceIds.has(id)), `${question.id}: missing evidence ID`);
    assert(corpus.includes(question.evidenceText), `${question.id}: evidence text is not in passage/materials`);
    assert(question.relatedCourseIds.length > 0 && question.relatedCourseIds.every((id) => courseIds.has(id)));
    assert(question.estimatedTime > 0);
    assert.equal(question.copyrightStatus, "original");
    assert.equal(question.sourceType, "original");
    assert.equal(question.publicationStatus, "beta");
    for (const marker of ["1. 最初に見る箇所", "2. 問われている範囲", "3. 根拠となる段落・資料", "4. 根拠の言い換え", "5. 正答を選ぶ理由", "6. 各誤答を消す理由", "7. 最後の検算", "8. 関連講座への復習導線"]) assert(question.detailedExplanation.includes(marker), `${question.id}: missing ${marker}`);
    if (question.difficulty === "common-test-ready") for (const marker of ["共通テスト実戦の処理順", "時間を使いすぎた場合", "選択肢から本文へ戻る"]) assert(question.detailedExplanation.includes(marker), `${question.id}: missing CT guide`);
    assert(!explanationBodies.has(question.detailedExplanation), `${question.id}: duplicate explanation`);
    explanationBodies.add(question.detailedExplanation);
    assert(!/TODO|TBD|placeholder|ダミー/i.test(JSON.stringify(question)));
  }
}

function normalize(value: string) { return value.normalize("NFKC").replace(/[\s、。！？「」『』（）・]/g, ""); }
const allPassages = [...JAPANESE_READING_CORE_PASSAGES, ...sets];
const normalized = allPassages.map((set) => normalize(set.paragraphs.map((paragraph) => paragraph.text).join("")));
for (let left = 0; left < normalized.length; left += 1) for (let right = left + 1; right < normalized.length; right += 1) {
  for (let index = 0; index <= normalized[left].length - 100; index += 25) assert(!normalized[right].includes(normalized[left].slice(index, index + 100)), `long text overlap: ${allPassages[left].id}/${allPassages[right].id}`);
}

const set2 = sets[1];
const waitRows = set2.materials?.find((material) => material.id === "資料1")?.rows ?? [];
assert.deepEqual(waitRows.map((row) => Number(row[2].replace("分", ""))), [6, 9, 7]);
assert.deepEqual(set2.questions[2].correctAnswers, ["A", "C"]);
const set6 = sets[5];
assert.equal(20 + 35 + 15, 70);
assert.equal(15 + 40 + 20, 75);
assert.deepEqual([48_000 + 12_000 + 6_000, 52_000 + 18_000 + 8_000, 64_000 + 10_000 + 9_000], [66_000, 78_000, 83_000]);
assert(set6.questions.slice(2).every((question) => question.correctAnswers[0] === "A"));

const paths = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
assert(paths.has("/japanese/reading/exams"));
for (const set of sets) assert(paths.has(`/japanese/reading/${set.slug}`));

console.log(`Japanese reading exam QA passed: ${sets.length} original sets, ${questions.length} questions, ${questions.filter((q) => q.difficulty === "basic").length}/${questions.filter((q) => q.difficulty === "standard").length}/${questions.filter((q) => q.difficulty === "common-test-ready").length} difficulty, evidence, lengths, tables, duplication, and routes verified.`);
