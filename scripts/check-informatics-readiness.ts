import fs from "node:fs";
import sitemap from "../src/app/sitemap";
import { INFORMATICS_1_COURSE_SUBJECT } from "../src/data/courses/informatics-1";
import { INFORMATICS_PROBLEMS } from "../src/data/informatics/problems";
import { INFORMATICS_SECTION_PRACTICES } from "../src/data/informatics/exam-practice";
import { INFORMATICS_MOCK_EXAM_001 } from "../src/data/informatics/mock-exam";
import { requireSubject } from "../src/data/subjects";

const failures: string[] = [];
const check = (condition: boolean, label: string) => {
  if (!condition) failures.push(label);
};
const lessons = INFORMATICS_1_COURSE_SUBJECT.units.flatMap((unit) => unit.lessons);
const allExamQuestions = [
  ...INFORMATICS_SECTION_PRACTICES.flatMap((exam) => exam.sections.flatMap((section) => section.questions)),
  ...INFORMATICS_MOCK_EXAM_001.sections.flatMap((section) => section.questions),
];
const urls = new Set(sitemap().map((entry) => new URL(entry.url).pathname));

check(lessons.length === 16, "基礎講座16本");
check(INFORMATICS_PROBLEMS.length === 120, "単元問題120問");
check(INFORMATICS_SECTION_PRACTICES.length === 6, "大問別演習6セット");
check(INFORMATICS_MOCK_EXAM_001.totalPoints === 100, "模試1回・100点");
check(allExamQuestions.every((question) => Boolean(question.answer) && Boolean(question.explanation)), "全設問の正答・解説");
check(allExamQuestions.every((question) => (question.choices ?? []).filter((choice) => !choice.isCorrect).every((choice) => Boolean(choice.trap))), "全誤答選択肢の理由");
check(allExamQuestions.every((question) => (question.reviewLinks?.length ?? 0) > 0 && (question.mistakeCauseIds?.length ?? 0) > 0), "復習導線・誤答原因");
check(requireSubject("informatics").status === "beta", "公開状態betaを維持");
check(fs.readFileSync("src/app/learn/page.tsx", "utf8").includes("/courses/informatics-1"), "/learn統合");
check(fs.readFileSync("src/app/practice/page.tsx", "utf8").includes("/informatics/practice"), "/practice統合");
for (const route of ["/informatics/practice", "/informatics/mock-exam", "/informatics/mock-exam/information-1-original-001", "/informatics/history"]) {
  check(urls.has(route), `sitemap ${route}`);
}
check(!JSON.stringify(INFORMATICS_MOCK_EXAM_001).includes("人間監修"), "根拠のない人間監修表示なし");

if (failures.length) {
  console.error(`正式公開候補: FAIL\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}
console.log("正式公開候補: DATA/ROUTE READY（対象E2E・a11y・production buildは別ゲート、statusはbeta維持）");
