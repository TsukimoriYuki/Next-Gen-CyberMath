import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import {
  COURSE_SUBJECTS,
  PUBLIC_COURSE_SUBJECTS,
} from "../src/data/courses";
import {
  EXAM_SET_CATEGORIES,
  PUBLIC_EXAM_SET_CATEGORIES,
  isPublicExamSet,
} from "../src/data/exam-sets";
import {
  getCommonTestExperiences,
  getPublicCommonTestExperiences,
} from "../src/data/common-test-experiences";
import {
  PUBLIC_SPECIAL_LECTURES,
  SPECIAL_LECTURES,
  getSpecialLectureBySlug,
} from "../src/data/specialLectures";

const ROOT = process.cwd();
const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function read(relativePath: string) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

async function main() {
  const hiddenLectures = SPECIAL_LECTURES.filter(
    (lecture) => lecture.publicationStatus !== "public",
  );
  const hiddenSlugs = hiddenLectures.map((lecture) => lecture.slug).sort();
  check(
    hiddenSlugs.join(",") ===
      "geometry-properties-auxiliary-lines,math-1a-shortcut-formulas",
    `unexpected temporarily hidden lecture set: ${hiddenSlugs.join(", ")}`,
  );
  check(
    hiddenLectures.every(
      (lecture) => lecture.isPublished === false && lecture.noindex === true,
    ),
    "every non-public special lecture must be unpublished and noindex",
  );
  check(
    hiddenLectures.every(
      (lecture) => getSpecialLectureBySlug(lecture.slug) === undefined,
    ),
    "a hidden special lecture is still resolvable through the public lookup",
  );

  const forbiddenAdvancedTerms = [
    "ブラーマグプタ",
    "トレミー",
    "スチュワート",
    "靴紐",
    "外積",
  ];
  const publicLectureText = JSON.stringify(PUBLIC_SPECIAL_LECTURES);
  for (const term of forbiddenAdvancedTerms) {
    check(
      !publicLectureText.includes(term),
      `public special-lecture registry still exposes out-of-scope term: ${term}`,
    );
  }

  check(
    PUBLIC_COURSE_SUBJECTS.every(
      (subject) =>
        (subject.status ?? "available") === "available" &&
        subject.units.length > 0 &&
        subject.units.every((unit) => unit.lessons.length > 0),
    ),
    "public course registry contains a preparing subject or empty unit",
  );
  const hiddenCourseIds = COURSE_SUBJECTS.filter(
    (subject) => !PUBLIC_COURSE_SUBJECTS.includes(subject),
  ).map((subject) => subject.subjectId);
  for (const expected of ["math-3c", "math-1a-premium", "math-2bc-premium"]) {
    check(hiddenCourseIds.includes(expected), `${expected} must remain outside public courses`);
  }

  check(
    PUBLIC_EXAM_SET_CATEGORIES.every(
      (category) =>
        category.examSets.length > 0 && category.examSets.every(isPublicExamSet),
    ),
    "public exam-set registry contains an empty or unreviewed category",
  );
  const rawExamCount = EXAM_SET_CATEGORIES.reduce(
    (sum, category) => sum + category.examSets.length,
    0,
  );
  check(rawExamCount > 0, "exam-set QA fixture unexpectedly has no raw exams");
  check(
    PUBLIC_EXAM_SET_CATEGORIES.reduce(
      (sum, category) => sum + category.examSets.length,
      0,
    ) === 0,
    "the currently unreviewed fixed exam must not be public",
  );

  const publicExperiences = getPublicCommonTestExperiences();
  const leakedPrototype = publicExperiences.find(
    (experience) =>
      experience.source === "ai-prototype" ||
      !experience.manualReviewed ||
      experience.status !== "public",
  );
  check(!leakedPrototype, `prototype/unreviewed experience leaked: ${leakedPrototype?.id}`);
  check(
    getCommonTestExperiences().some(
      (experience) => experience.source === "ai-prototype" && experience.status !== "public",
    ),
    "AI prototype should remain represented as non-public data",
  );

  const sitemapUrls = (await sitemap()).map((entry) => entry.url);
  for (const fragment of [
    "/common-test/lectures/math-1a-shortcut-formulas",
    "/common-test/lectures/geometry-properties-auxiliary-lines",
    "/courses/math-3c",
    "/exam-sets",
    "/paper-sample",
    "/structured-prototype",
  ]) {
    check(
      !sitemapUrls.some((url) => url.includes(fragment)),
      `sitemap contains non-public route: ${fragment}`,
    );
  }

  const productionGuardFiles = [
    "src/app/common-test/simulator/paper-sample/page.tsx",
    "src/app/common-test/simulator/common-test-math-1a-manual-001/structured-prototype/page.tsx",
  ];
  for (const file of productionGuardFiles) {
    const source = read(file);
    check(
      source.includes("const resourcePublished = false") &&
        source.includes("resolveTopLevelSubjectId(") &&
        source.includes("requireSubjectPageAccess(") &&
        source.includes("index: false"),
      `${file} must be centrally guarded as a dev-only, noindex resource`,
    );
  }

  if (issues.length > 0) {
    console.error(`publication guards QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }
  console.log(
    `publication guards QA passed: ${PUBLIC_SPECIAL_LECTURES.length} lectures, ${PUBLIC_COURSE_SUBJECTS.length} course subjects, and no unreviewed fixed exams are public.`,
  );
}

void main();
