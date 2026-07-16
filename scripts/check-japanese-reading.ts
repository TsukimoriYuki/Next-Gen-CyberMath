import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import { COURSE_SUBJECTS } from "../src/data/courses";
import { JAPANESE_PROBLEMS } from "../src/data/japanese";
import { JAPANESE_READING_PASSAGES } from "../src/data/japanese/reading";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
const passages = JAPANESE_READING_PASSAGES;
const questions = passages.flatMap((passage) => passage.questions);
const lengths = (genre: string) => passages.filter((passage) => passage.genre === genre);
const courseIds = new Set(COURSE_SUBJECTS.flatMap((subject) => subject.units.flatMap((unit) => unit.lessons.map((lesson) => lesson.lessonId))));

assert.equal(passages.length, 20, "expected 20 reading passages");
assert.equal(questions.length, 100, "expected 100 reading questions");
assert.equal(JAPANESE_PROBLEMS.length, 160, "expected 160 Japanese problems total");
assert.equal(COURSE_SUBJECTS.find((subject) => subject.subjectId === "japanese")?.units.reduce((sum, unit) => sum + unit.lessons.length, 0), 16, "expected 16 Japanese lessons");
assert.equal(lengths("criticism").length, 8);
assert.equal(lengths("fiction").length, 4);
assert.equal(lengths("essay").length, 2);
assert.equal(lengths("practical").length, 6);
assert.equal(questions.filter((question) => question.difficulty === "basic").length, 40);
assert.equal(questions.filter((question) => question.difficulty === "standard").length, 40);
assert.equal(questions.filter((question) => question.difficulty === "common-test-ready").length, 20);
assert(questions.some((question) => question.answerMode === "multiple"), "multiple-answer question is missing");
assert(questions.some((question) => question.questionType === "sequence"), "sequence question is missing");

const passageIds = new Set<string>();
const slugs = new Set<string>();
const questionIds = new Set<string>();
const prompts = new Set<string>();
const explanations = new Set<string>();
const choiceUse = new Map<string, number>();
for (const passage of passages) {
  assert(!passageIds.has(passage.id), `duplicate passage ID: ${passage.id}`);
  assert(!slugs.has(passage.slug), `duplicate passage slug: ${passage.slug}`);
  passageIds.add(passage.id); slugs.add(passage.slug);
  assert.equal(passage.sourceType, "original");
  assert.equal(passage.copyrightStatus, "original");
  assert.equal(passage.questions.length, 5, `${passage.id}: expected five questions`);
  assert(passage.estimatedReadingTime > 0, `${passage.id}: invalid reading time`);
  const count = passage.paragraphs.reduce((sum, paragraph) => sum + paragraph.text.length, 0);
  if (passage.genre === "criticism" && passage.length === "short") assert(count >= 700 && count <= 1000, `${passage.id}: short length ${count}`);
  if (passage.genre === "criticism" && passage.length === "medium") assert(count >= 1100 && count <= 1600, `${passage.id}: medium length ${count}`);
  if (passage.genre === "criticism" && passage.length === "long") assert(count >= 1700 && count <= 2300, `${passage.id}: long length ${count}`);
  if (passage.genre === "fiction") assert(count >= 1200 && count <= 2000, `${passage.id}: fiction length ${count}`);
  if (passage.genre === "essay") assert(count >= 900 && count <= 1500, `${passage.id}: essay length ${count}`);
  const paragraphIds = new Set(passage.paragraphs.map((paragraph) => paragraph.id));
  for (const question of passage.questions) {
    assert(!questionIds.has(question.id), `duplicate question ID: ${question.id}`); questionIds.add(question.id);
    assert(!prompts.has(question.prompt), `duplicate prompt: ${question.prompt}`); prompts.add(question.prompt);
    assert(!explanations.has(question.explanation), `duplicate explanation: ${question.id}`); explanations.add(question.explanation);
    assert(question.correctAnswers.length > 0 && question.correctAnswers.every((answer) => question.choices.some((choice) => choice.id === answer)), `${question.id}: missing correct answer`);
    assert.equal(new Set(question.choices.map((choice) => choice.id)).size, question.choices.length, `${question.id}: duplicate choice IDs`);
    assert(question.evidenceText.length >= 15, `${question.id}: evidence too short`);
    assert(question.evidenceParagraphIds.every((id) => paragraphIds.has(id)), `${question.id}: missing evidence paragraph`);
    assert(question.relatedCourseIds.every((id) => courseIds.has(id)), `${question.id}: missing related course`);
    assert(question.estimatedTime > 0, `${question.id}: invalid time`);
    for (const choice of question.choices) {
      choiceUse.set(choice.text, (choiceUse.get(choice.text) ?? 0) + 1);
      if (!question.correctAnswers.includes(choice.id)) assert(question.distractorReasons[choice.id]?.length >= 40, `${question.id}: weak distractor reason`);
    }
  }
}
assert([...choiceUse.values()].every((count) => count <= 4), "a choice is reused excessively");

const normalized = passages.map((passage) => passage.paragraphs.map((paragraph) => paragraph.text).join("").replace(/[\s、。！？「」『』]/g, ""));
for (let left = 0; left < normalized.length; left += 1) for (let right = left + 1; right < normalized.length; right += 1) {
  for (let index = 0; index <= normalized[left].length - 80; index += 20) assert(!normalized[right].includes(normalized[left].slice(index, index + 80)), `long passage overlap: ${passages[left].id}/${passages[right].id}`);
}
const banned = ["朝日新聞", "読売新聞", "毎日新聞", "日本経済新聞", "共通テスト本試験", "大学入試センター"];
const corpus = passages.map((passage) => passage.paragraphs.map((paragraph) => paragraph.text).join("\n")).join("\n");
for (const term of banned) assert(!corpus.includes(term), `copyright/source term found: ${term}`);
assert.equal(read("src/data/subjects.ts").includes('id: "japanese"') && read("src/data/subjects.ts").includes('status: "hidden"'), true, "Japanese must remain hidden");
assert(!new Set(sitemap().map((entry) => new URL(entry.url).pathname)).has("/japanese"), "Japanese leaked into sitemap");
assert(!read("src/data/navigation.ts").includes('href: "/japanese"'), "Japanese leaked into global navigation");
console.log("Japanese reading QA passed: 4 courses, 20 original passages, 100 questions, 40/40/20 difficulty, evidence, duplication, and publication guards verified.");
