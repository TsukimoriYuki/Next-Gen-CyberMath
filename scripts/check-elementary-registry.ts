import fs from "node:fs";
import path from "node:path";
import {
  ELEMENTARY_COURSE_TYPES,
  ELEMENTARY_GRADE_SUBJECTS,
  ELEMENTARY_GRADES,
  ELEMENTARY_GRADES_BY_ID,
  ELEMENTARY_SITE,
  ELEMENTARY_SUBJECTS,
  ELEMENTARY_SUBJECTS_BY_ID,
  getElementaryGradeSubjects,
} from "../src/data/elementary";
import { SUBJECTS } from "../src/data/subjects";
import { assertUniqueRegistryKeys } from "../src/lib/registry";

const issues: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) issues.push(message);
};

function checkRegistryOrdering<T extends Readonly<{ id: string; slug: string; order: number }>>(
  label: string,
  entries: readonly T[],
) {
  assertUniqueRegistryKeys(entries, (entry) => entry.id, `elementary ${label} ID registry`);
  assertUniqueRegistryKeys(entries, (entry) => entry.slug, `elementary ${label} slug registry`);
  check(
    entries.every((entry, index) => index === 0 || entry.order > entries[index - 1]!.order),
    `elementary ${label} order must be strictly increasing`,
  );
}

function main() {
  checkRegistryOrdering("grade", ELEMENTARY_GRADES);
  checkRegistryOrdering("subject", ELEMENTARY_SUBJECTS);
  checkRegistryOrdering("course", ELEMENTARY_COURSE_TYPES);
  assertUniqueRegistryKeys(
    ELEMENTARY_GRADE_SUBJECTS,
    (entry) => entry.id,
    "elementary grade-subject registry",
  );
  assertUniqueRegistryKeys(
    ELEMENTARY_GRADES.flatMap((grade) => (grade.href ? [grade.href] : [])),
    (href) => href,
    "elementary grade route registry",
  );

  check(
    ELEMENTARY_GRADES.map((grade) => grade.id).join(",") === "grade-3,grade-4,grade-5,grade-6",
    "grade registry must contain grade-3 through grade-6 in order",
  );
  check(
    ELEMENTARY_SUBJECTS.map((subject) => subject.id).join(",") === "math,japanese,social-studies,science",
    "subject registry must contain math, Japanese, social studies, and future science",
  );
  check(ELEMENTARY_SITE.publicationStatus === "hidden", "elementary site must start hidden");
  check(ELEMENTARY_GRADES_BY_ID["grade-3"]?.href === "/elementary/grade-3", "grade-3 route is missing");
  check(
    ELEMENTARY_GRADES.filter((grade) => grade.href).map((grade) => grade.id).join(",") === "grade-3",
    "only grade-3 may have an implemented grade route",
  );
  check(
    ELEMENTARY_COURSE_TYPES.find((course) => course.id === "regular")?.availability === "planned",
    "regular course must be planned",
  );
  check(
    ELEMENTARY_COURSE_TYPES.find((course) => course.id === "exam-prep")?.availability === "unavailable",
    "exam-prep must remain unavailable",
  );

  const grade3Regular = getElementaryGradeSubjects("grade-3", "regular");
  check(grade3Regular.length === 4, "grade-3 regular registry must explicitly cover all subjects");
  check(
    grade3Regular
      .filter((entry) => entry.availability === "planned")
      .map((entry) => entry.subjectId)
      .join(",") === "math,japanese,social-studies",
    "only math, Japanese, and social studies may be planned for grade-3",
  );
  check(
    grade3Regular.find((entry) => entry.subjectId === "science")?.availability === "unavailable",
    "grade-3 science must remain unavailable",
  );
  check(
    ELEMENTARY_GRADE_SUBJECTS.every(
      (entry) => Boolean(ELEMENTARY_GRADES_BY_ID[entry.gradeId]) && Boolean(ELEMENTARY_SUBJECTS_BY_ID[entry.subjectId]),
    ),
    "grade-subject registry contains an unknown grade or subject",
  );
  check(getElementaryGradeSubjects("unknown-grade", "regular").length === 0, "unknown grade must fail closed");
  check(getElementaryGradeSubjects("grade-3", "unknown-course").length === 0, "unknown course must fail closed");
  check(
    SUBJECTS.map((subject) => subject.id).join(",") === "math,english,informatics,japanese",
    "existing high-school subject registry changed unexpectedly",
  );

  const root = process.cwd();
  for (const routeFile of ["src/app/elementary/page.tsx", "src/app/elementary/grade-3/page.tsx"]) {
    check(fs.existsSync(path.join(root, routeFile)), `implemented elementary route is missing: ${routeFile}`);
  }
  for (const entry of ELEMENTARY_GRADE_SUBJECTS) {
    const subject = ELEMENTARY_SUBJECTS_BY_ID[entry.subjectId];
    const routeFile = `src/app/elementary/${entry.gradeId}/${subject.slug}/page.tsx`;
    check(!fs.existsSync(path.join(root, routeFile)), `out-of-scope subject route exists: ${routeFile}`);
  }
  for (const grade of ELEMENTARY_GRADES.filter((entry) => entry.availability === "unavailable")) {
    check(!fs.existsSync(path.join(root, `src/app/elementary/${grade.slug}/page.tsx`)), `unavailable grade route exists: ${grade.slug}`);
  }

  if (issues.length) {
    console.error(`elementary registry QA FAILED: ${issues.length} issue(s).`);
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exitCode = 1;
    return;
  }
  console.log("elementary registry QA passed: IDs, slugs, ordering, availability, routes, and boundaries are valid.");
}

main();
