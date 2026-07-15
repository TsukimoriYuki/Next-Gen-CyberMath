import fs from "node:fs";
import path from "node:path";
import { PRIMARY_NAVIGATION } from "../src/data/navigation";
import {
  INFORMATICS_1_COURSE_SUBJECT,
} from "../src/data/courses/informatics-1";
import {
  COURSE_SUBJECTS,
  PUBLIC_COURSE_SUBJECTS,
} from "../src/data/courses";
import {
  INFORMATICS_PROBLEMS,
  type InformaticsDifficulty,
} from "../src/data/informatics/problems";
import { PUBLIC_SUBJECTS, SUBJECTS } from "../src/data/subjects";
import { evaluateSubjectPublication } from "../src/lib/subject-publication";

// 情報Ⅰ 第1スプリントの整合性QA。
// 実行例: npx tsx scripts/check-informatics.ts / npm run qa:informatics

const ROOT = process.cwd();
const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

// ── 講座 registry ───────────────────────────────────────────────────────────

const units = INFORMATICS_1_COURSE_SUBJECT.units;
const lessons = units.flatMap((unit) => unit.lessons);
const lessonIds = new Set(lessons.map((lesson) => lesson.lessonId));

check(
  new Set(units.map((unit) => unit.unitId)).size === units.length,
  "informatics unit IDs must be unique",
);
check(lessonIds.size === lessons.length, "informatics lesson IDs must be unique");
check(lessons.length === 4, `informatics must have 4 lessons (found ${lessons.length})`);
check(
  COURSE_SUBJECTS.some((subject) => subject.subjectId === "informatics-1"),
  "informatics-1 must be registered in COURSE_SUBJECTS",
);

for (const lesson of lessons) {
  const label = `lesson "${lesson.lessonId}"`;
  check(lesson.goals.length > 0, `${label} must declare goals`);
  check(lesson.prerequisites.length > 0, `${label} must declare prerequisites`);
  check(lesson.estimatedMinutes > 0, `${label} must declare estimatedMinutes`);
  check(lesson.lessonBlocks.length >= 5, `${label} must have substantive blocks`);
  check(
    lesson.checkQuestions.length >= 3,
    `${label} must have at least 3 check questions`,
  );
  check(
    lesson.checkQuestions.every((q) => q.question.trim() && q.answer.trim()),
    `${label} check questions must all have answers`,
  );
  check(
    lesson.lessonBlocks.some((block) => block.kind === "commonMistake"),
    `${label} must cover common mistakes`,
  );
  check(
    lesson.lessonBlocks.some((block) => block.kind === "nextStep"),
    `${label} must point to the next lesson`,
  );
}

// ── 演習問題 registry ───────────────────────────────────────────────────────

check(
  INFORMATICS_PROBLEMS.length === 20,
  `informatics must ship exactly 20 problems (found ${INFORMATICS_PROBLEMS.length})`,
);
check(
  new Set(INFORMATICS_PROBLEMS.map((problem) => problem.id)).size ===
    INFORMATICS_PROBLEMS.length,
  "informatics problem IDs must be unique",
);

const byLesson = new Map<string, number>();
const byDifficulty = new Map<InformaticsDifficulty, number>();

for (const problem of INFORMATICS_PROBLEMS) {
  const label = `problem "${problem.id}"`;
  byLesson.set(problem.lessonId, (byLesson.get(problem.lessonId) ?? 0) + 1);
  byDifficulty.set(
    problem.difficulty,
    (byDifficulty.get(problem.difficulty) ?? 0) + 1,
  );

  check(lessonIds.has(problem.lessonId), `${label} must reference a real lesson`);
  check(Boolean(problem.prompt.trim()), `${label} must have a prompt`);
  check(Boolean(problem.explanation.trim()), `${label} must have an explanation`);
  check(problem.estimatedMinutes > 0, `${label} must declare estimatedMinutes`);
  check(problem.reviewTags.length > 0, `${label} must declare review tags`);
  check(problem.choices.length >= 2, `${label} must have at least 2 choices`);
  check(
    new Set(problem.choices.map((choice) => choice.id)).size ===
      problem.choices.length,
    `${label} choice IDs must be unique`,
  );
  check(
    problem.choices.every((choice) => choice.text.trim() && choice.reason.trim()),
    `${label} every choice (correct and incorrect) must carry a reason`,
  );

  const choiceIds = new Set(problem.choices.map((choice) => choice.id));
  check(
    problem.correctChoiceIds.length > 0,
    `${label} must declare a correct answer set`,
  );
  check(
    problem.correctChoiceIds.every((id) => choiceIds.has(id)),
    `${label} correct answers must exist among its choices`,
  );
  check(
    new Set(problem.correctChoiceIds).size === problem.correctChoiceIds.length,
    `${label} correct answer set must not repeat IDs`,
  );

  if (problem.kind === "multi-select") {
    check(
      problem.correctChoiceIds.length >= 1,
      `${label} multi-select must have a non-empty correct set`,
    );
  } else {
    check(
      problem.correctChoiceIds.length === 1,
      `${label} ${problem.kind} must have exactly one correct answer`,
    );
  }
  if (problem.kind === "true-false") {
    check(
      problem.choices.length === 2,
      `${label} true-false must have exactly 2 choices`,
    );
  }
}

for (const lesson of lessons) {
  const count = byLesson.get(lesson.lessonId) ?? 0;
  check(
    count === 5,
    `lesson "${lesson.lessonId}" must have exactly 5 problems (found ${count})`,
  );
}

const expectedDifficulty: Record<InformaticsDifficulty, number> = {
  basic: 8,
  standard: 8,
  "ct-prep": 4,
};
for (const [difficulty, expected] of Object.entries(expectedDifficulty)) {
  const actual = byDifficulty.get(difficulty as InformaticsDifficulty) ?? 0;
  check(
    actual === expected,
    `difficulty "${difficulty}" must have ${expected} problems (found ${actual})`,
  );
}

// ── 公開制御 ─────────────────────────────────────────────────────────────────

const informaticsSubject = SUBJECTS.find((subject) => subject.id === "informatics");
check(Boolean(informaticsSubject), "informatics subject must exist in subjects.ts");
check(
  informaticsSubject?.status === "hidden",
  "informatics must stay hidden until the publication decision",
);
check(
  !PUBLIC_SUBJECTS.some((subject) => subject.id === "informatics"),
  "informatics must not appear in PUBLIC_SUBJECTS (navigation/subject listing)",
);
check(
  !PUBLIC_COURSE_SUBJECTS.some((subject) => subject.subjectId === "informatics-1"),
  "informatics-1 must not appear in PUBLIC_COURSE_SUBJECTS (course listing/sitemap)",
);
check(
  !PRIMARY_NAVIGATION.some((item) => item.href.startsWith("/informatics")),
  "informatics must not appear in PRIMARY_NAVIGATION",
);

const sitemapSource = fs.readFileSync(
  path.join(ROOT, "src/app/sitemap.ts"),
  "utf8",
);
check(
  !sitemapSource.includes("informatics"),
  "sitemap.ts must not hardcode informatics routes",
);

if (informaticsSubject) {
  for (const runtime of ["production", "preview", "test"] as const) {
    check(
      !evaluateSubjectPublication(informaticsSubject, "courses", runtime).allowed,
      `informatics must be rejected (404) in ${runtime}`,
    );
  }
  check(
    evaluateSubjectPublication(informaticsSubject, "courses", "development").allowed,
    "informatics must stay inspectable in local development",
  );
}

// ── 結果 ─────────────────────────────────────────────────────────────────────

if (issues.length > 0) {
  console.error(`informatics QA failed: ${issues.length} issue(s).`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(
  `informatics QA passed: ${lessons.length} lessons, ${INFORMATICS_PROBLEMS.length} problems (basic 8 / standard 8 / ct-prep 4), subject hidden with dev-only preview.`,
);
