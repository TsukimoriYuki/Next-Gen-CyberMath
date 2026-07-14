import { COURSE_SUBJECTS } from "../src/data/courses";
import { EXAM_SET_CATEGORIES } from "../src/data/exam-sets";
import { LESSONS, LESSONS_BY_SLUG } from "../src/data/lessons";
import { PROBLEMS } from "../src/data/problems";
import { SPECIAL_LECTURES } from "../src/data/specialLectures";
import { SUBJECTS } from "../src/data/subjects";
import {
  assertUniqueRegistryKeys,
  indexByUniqueRegistryKey,
} from "../src/lib/registry";

const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function expectDuplicateThrow(label: string, operation: () => void) {
  try {
    operation();
    issues.push(`${label} did not throw for duplicate keys`);
  } catch (error) {
    check(
      error instanceof Error && error.message.includes("duplicate key"),
      `${label} threw an unexpected error`,
    );
  }
}

function main() {
  assertUniqueRegistryKeys(SUBJECTS, (subject) => subject.id, "subject ID registry");
  assertUniqueRegistryKeys(SUBJECTS, (subject) => subject.href, "subject route registry");
  assertUniqueRegistryKeys(LESSONS, (lesson) => lesson.slug, "concept lesson slug registry");
  assertUniqueRegistryKeys(PROBLEMS, (problem) => problem.slug, "problem slug registry");
  assertUniqueRegistryKeys(SPECIAL_LECTURES, (lecture) => lecture.id, "special lecture ID registry");
  assertUniqueRegistryKeys(SPECIAL_LECTURES, (lecture) => lecture.slug, "special lecture slug registry");
  assertUniqueRegistryKeys(COURSE_SUBJECTS, (subject) => subject.subjectId, "course subject ID registry");
  assertUniqueRegistryKeys(
    COURSE_SUBJECTS.flatMap((subject) => subject.units),
    (unit) => unit.unitId,
    "course unit ID registry",
  );
  assertUniqueRegistryKeys(
    COURSE_SUBJECTS.flatMap((subject) => subject.units.flatMap((unit) => unit.lessons)),
    (lesson) => lesson.lessonId,
    "course lesson ID registry",
  );
  assertUniqueRegistryKeys(EXAM_SET_CATEGORIES, (category) => category.id, "exam category ID registry");
  assertUniqueRegistryKeys(
    EXAM_SET_CATEGORIES.flatMap((category) => category.examSets),
    (exam) => exam.id,
    "exam ID registry",
  );

  const recurrence = LESSONS.filter(
    (lesson) => lesson.slug === "recurrence-characteristic-equation",
  );
  check(recurrence.length === 1, `recurrence lesson count must be 1, got ${recurrence.length}`);
  check(
    recurrence[0]?.content.includes("@@lab:spider-web-plot"),
    "merged recurrence lesson lost the interactive spider-web lab",
  );
  check(
    Boolean(recurrence[0]?.proof && recurrence[0]?.application),
    "merged recurrence lesson lost its proof or application material",
  );
  check(
    Object.keys(LESSONS_BY_SLUG).length === LESSONS.length,
    "lesson slug index size does not match the lesson registry",
  );

  const duplicateFixture = [{ id: "same" }, { id: "same" }];
  expectDuplicateThrow("assertUniqueRegistryKeys", () =>
    assertUniqueRegistryKeys(duplicateFixture, (item) => item.id, "synthetic registry"),
  );
  expectDuplicateThrow("indexByUniqueRegistryKey", () =>
    indexByUniqueRegistryKey(duplicateFixture, (item) => item.id, "synthetic registry"),
  );

  if (issues.length > 0) {
    console.error(`registry QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }
  console.log(
    `registry QA passed: ${LESSONS.length} lesson slugs and all other runtime registries are unique.`,
  );
}

main();
