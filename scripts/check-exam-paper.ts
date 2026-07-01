// 冊子型模試（math-1a-paper-001）の整合性を機械的に検証する。
// npm run qa:math1a-paper
//
// 検証内容:
//  - 仕様: 70分 / 100点 / 4大問 / 22小問 / 56マーク / 全問必答
//  - answerSlots 数・配点合計・大問配点合計・小問数
//  - スロットID重複なし / 大問の answerSlotIds が実在スロットを指す / 全スロットが1大問に属する
//  - 全スロットの correctAnswer が choices に含まれる
//  - 採点シミュレーション: 全問正答=100 / 未入力=0 / 全問誤答=0 / 部分正答は 0<score<100、いずれもクラッシュしない

import { getExamPaper, type ExamPaper } from "../src/data/exam-papers";
import { scoreExamPaper, type ExamPaperAnswers } from "../src/lib/exam-paper-scoring";

const EXPECTED = {
  id: "math-1a-paper-001",
  durationMin: 70,
  totalScore: 100,
  questionCount: 22,
  sectionCount: 4,
  answerSlotCount: 56,
};

const issues: string[] = [];
function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function allCorrectAnswers(paper: ExamPaper): ExamPaperAnswers {
  const answers: ExamPaperAnswers = {};
  for (const slot of paper.answerSlots) answers[slot.id] = slot.correctAnswer;
  return answers;
}

function allWrongAnswers(paper: ExamPaper): ExamPaperAnswers {
  const answers: ExamPaperAnswers = {};
  for (const slot of paper.answerSlots) {
    const wrong = slot.choices.find((c) => c !== slot.correctAnswer);
    // 選択肢が1つしかない（=必ず正答）スロットは誤答を作れないので空欄扱い。
    answers[slot.id] = wrong ?? "";
  }
  return answers;
}

function halfCorrectAnswers(paper: ExamPaper): ExamPaperAnswers {
  const answers: ExamPaperAnswers = {};
  const half = Math.floor(paper.answerSlots.length / 2);
  paper.answerSlots.forEach((slot, i) => {
    if (i < half) answers[slot.id] = slot.correctAnswer;
  });
  return answers;
}

function main() {
  const paper = getExamPaper(EXPECTED.id);
  if (!paper) {
    issues.push(`exam paper "${EXPECTED.id}" not found`);
    report();
    return;
  }

  // ── 仕様フィールド ──────────────────────────────────────────────
  check(paper.durationMin === EXPECTED.durationMin, `durationMin should be ${EXPECTED.durationMin}, got ${paper.durationMin}`);
  check(paper.totalScore === EXPECTED.totalScore, `totalScore should be ${EXPECTED.totalScore}, got ${paper.totalScore}`);
  check(paper.questionCount === EXPECTED.questionCount, `questionCount should be ${EXPECTED.questionCount}, got ${paper.questionCount}`);
  check(paper.sections.length === EXPECTED.sectionCount, `sections should be ${EXPECTED.sectionCount}, got ${paper.sections.length}`);
  check(paper.answerSlots.length === EXPECTED.answerSlotCount, `answerSlots should be ${EXPECTED.answerSlotCount} marks, got ${paper.answerSlots.length}`);

  // ── 配点・小問数の整合 ──────────────────────────────────────────
  const slotScoreSum = paper.answerSlots.reduce((s, x) => s + x.score, 0);
  const sectionScoreSum = paper.sections.reduce((s, x) => s + x.score, 0);
  const sectionQuestionSum = paper.sections.reduce((s, x) => s + x.questionCount, 0);
  check(slotScoreSum === EXPECTED.totalScore, `sum of answerSlot scores should be ${EXPECTED.totalScore}, got ${slotScoreSum}`);
  check(sectionScoreSum === EXPECTED.totalScore, `sum of section scores should be ${EXPECTED.totalScore}, got ${sectionScoreSum}`);
  check(sectionQuestionSum === EXPECTED.questionCount, `sum of section questionCount should be ${EXPECTED.questionCount}, got ${sectionQuestionSum}`);

  // ── スロットID・大問参照の整合 ──────────────────────────────────
  const slotIds = paper.answerSlots.map((s) => s.id);
  const dupIds = slotIds.filter((id, i) => slotIds.indexOf(id) !== i);
  check(dupIds.length === 0, `duplicate answerSlot ids: ${[...new Set(dupIds)].join(", ")}`);

  const slotIdSet = new Set(slotIds);
  const slotToSections = new Map<string, string[]>();
  for (const section of paper.sections) {
    for (const id of section.answerSlotIds) {
      check(slotIdSet.has(id), `section "${section.id}" references missing slot "${id}"`);
      slotToSections.set(id, [...(slotToSections.get(id) ?? []), section.id]);
    }
  }
  for (const slot of paper.answerSlots) {
    const owners = slotToSections.get(slot.id) ?? [];
    check(owners.length === 1, `slot "${slot.label}" (${slot.id}) should belong to exactly 1 section, belongs to ${owners.length}`);
    check(slot.sectionId === owners[0], `slot "${slot.label}" sectionId "${slot.sectionId}" disagrees with section membership "${owners[0]}"`);
  }

  // ── 正答が選択肢に含まれる ──────────────────────────────────────
  for (const slot of paper.answerSlots) {
    check(slot.choices.length > 0, `slot "${slot.label}" has no choices`);
    check(slot.choices.includes(slot.correctAnswer), `slot "${slot.label}" correctAnswer "${slot.correctAnswer}" not in choices [${slot.choices.join(",")}]`);
    check(slot.score > 0, `slot "${slot.label}" score should be > 0, got ${slot.score}`);
  }

  // ── 採点シミュレーション ────────────────────────────────────────
  const perfect = scoreExamPaper(paper, allCorrectAnswers(paper));
  check(perfect.totalScore === 100, `all-correct should score 100, got ${perfect.totalScore}`);
  check(perfect.maxScore === 100, `maxScore should be 100, got ${perfect.maxScore}`);
  check(perfect.correctSlots === EXPECTED.answerSlotCount, `all-correct correctSlots should be ${EXPECTED.answerSlotCount}, got ${perfect.correctSlots}`);
  check(perfect.unansweredCount === 0, `all-correct unansweredCount should be 0, got ${perfect.unansweredCount}`);

  const empty = scoreExamPaper(paper, {});
  check(empty.totalScore === 0, `empty should score 0, got ${empty.totalScore}`);
  check(empty.unansweredCount === EXPECTED.answerSlotCount, `empty unansweredCount should be ${EXPECTED.answerSlotCount}, got ${empty.unansweredCount}`);
  check(empty.correctSlots === 0, `empty correctSlots should be 0, got ${empty.correctSlots}`);

  const wrong = scoreExamPaper(paper, allWrongAnswers(paper));
  check(wrong.totalScore === 0, `all-wrong should score 0, got ${wrong.totalScore}`);

  const half = scoreExamPaper(paper, halfCorrectAnswers(paper));
  check(half.totalScore > 0 && half.totalScore < 100, `half-correct should be 0<score<100, got ${half.totalScore}`);

  report();
}

function report() {
  if (issues.length > 0) {
    console.error(`math-1a-paper integrity check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log("math-1a-paper integrity check passed (70min / 100pt / 4大問 / 22小問 / 56マーク / 全問必答, all-correct = 100).");
  }
}

main();
