// 問題解体型講座（共通テスト対策タブ、PDFを正本とする講座）のデータ整合性を検査する。
// npm run qa:problem-lectures

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { COMMON_TEST_PROBLEM_LECTURES } from "../src/data/common-test/problem-lectures";
import { PUBLIC_SPECIAL_LECTURES } from "../src/data/specialLectures";

const issues: string[] = [];
const warnings: string[] = [];
const root = process.cwd();

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

// 見出し・ラベル系のフィールドは MathText を通さず plain text で描画されるため、
// ここに $...$ が紛れ込むと生TeXがそのまま表示されてしまう（過去に実際に起きた不具合）。
const PLAIN_TEXT_FIELD_PATTERN = /\$/;

const coreLectureSlugs = new Set(PUBLIC_SPECIAL_LECTURES.map((lecture) => lecture.slug));

function routeExists(href: string): boolean {
  const [path] = href.split("#");
  if (path.startsWith("/common-test/lectures/")) {
    const slug = path.replace("/common-test/lectures/", "");
    return coreLectureSlugs.has(slug);
  }
  if (path.startsWith("/common-test/simulator/")) {
    const slug = path.split("/").pop();
    return !!slug && existsSync(join(root, `src/app/common-test/simulator/${slug}/page.tsx`));
  }
  if (path === "/common-test/practice") {
    return existsSync(join(root, "src/app/common-test/practice/page.tsx"));
  }
  if (path.startsWith("/common-test/problem-lectures/")) {
    const id = path.replace("/common-test/problem-lectures/", "");
    return COMMON_TEST_PROBLEM_LECTURES.some((lecture) => lecture.id === id);
  }
  if (path.startsWith("/courses/")) {
    return existsSync(join(root, "src/app/courses/[subjectId]/[unitId]/[lessonId]/page.tsx"))
      || existsSync(join(root, "src/app/courses/math-1a/quadratic/[lessonId]/page.tsx"));
  }
  return existsSync(join(root, `src/app${path}/page.tsx`));
}

const ids = new Set<string>();

for (const lecture of COMMON_TEST_PROBLEM_LECTURES) {
  check(!ids.has(lecture.id), `duplicate problem-lecture id: ${lecture.id}`);
  ids.add(lecture.id);

  check(
    !PLAIN_TEXT_FIELD_PATTERN.test(lecture.title),
    `${lecture.id}: title should not contain raw TeX ($...$) — title renders as plain text`,
  );
  check(
    !PLAIN_TEXT_FIELD_PATTERN.test(lecture.targetSection),
    `${lecture.id}: targetSection should not contain raw TeX`,
  );
  for (const concept of lecture.concepts) {
    check(!PLAIN_TEXT_FIELD_PATTERN.test(concept), `${lecture.id}: concept "${concept}" should not contain raw TeX`);
  }
  for (const section of lecture.explanations) {
    check(
      !PLAIN_TEXT_FIELD_PATTERN.test(section.heading),
      `${lecture.id}: explanation heading "${section.heading}" should not contain raw TeX (renders as plain text)`,
    );
  }
  for (const link of [
    ...lecture.relatedMathCourses,
    ...lecture.relatedCoreLectures,
    ...lecture.relatedMocks,
    ...(lecture.nextProblemLectures ?? []),
    ...lecture.mistakes.map((m) => m.returnTo),
    ...lecture.explanations.flatMap((e) => (e.mathCourseLink ? [e.mathCourseLink] : [])),
  ]) {
    check(!PLAIN_TEXT_FIELD_PATTERN.test(link.label), `${lecture.id}: link label "${link.label}" should not contain raw TeX`);
    check(routeExists(link.href), `${lecture.id}: link "${link.label}" does not resolve to a known route: ${link.href}`);
  }

  // PDFは公開用の正本。public/problem1a/ 配下に実ファイルが存在することを確認する。
  check(lecture.pdfUrl.startsWith("/problem1a/"), `${lecture.id}: pdfUrl should live under /problem1a/`);
  check(
    existsSync(join(root, "public", lecture.pdfUrl.replace(/^\//, ""))),
    `${lecture.id}: pdfUrl points to a missing file: ${lecture.pdfUrl}`,
  );

  check(lecture.goals.length >= 3, `${lecture.id}: should have at least 3 goals`);
  check(lecture.insights.length >= 4, `${lecture.id}: should have at least 4 insights`);
  check(lecture.thinkingFlow.length >= 4, `${lecture.id}: should have at least 4 thinking-flow steps`);
  check(lecture.explanations.length >= 2, `${lecture.id}: should have at least 2 explanation sections`);
  check(lecture.mistakes.length >= 3, `${lecture.id}: should have at least 3 mistakes`);
  check(lecture.relatedMathCourses.length > 0, `${lecture.id}: should have at least 1 related MATH course link`);
  check(lecture.relatedCoreLectures.length > 0, `${lecture.id}: should have at least 1 related core lecture link`);
  check(lecture.relatedMocks.length > 0, `${lecture.id}: should have at least 1 related mock link`);
}

check(COMMON_TEST_PROBLEM_LECTURES.length === 8, `expected 8 problem lectures, got ${COMMON_TEST_PROBLEM_LECTURES.length}`);

// problem1a/ はローカル投入用フォルダなので、クリーンcloneやCIには存在しない前提。
// 存在するローカル環境でだけ、public/problem1a/ の公開用正本と任意でbyte-identical比較する。
// この比較は qa:all を環境依存にしないため warning に留める。
const SOURCE_DIR = join(root, "problem1a");
if (existsSync(SOURCE_DIR)) {
  for (const lecture of COMMON_TEST_PROBLEM_LECTURES) {
    const publicPath = join(root, "public", lecture.pdfUrl.replace(/^\//, ""));
    const sourceName = lecture.pdfUrl.split("/").pop()!;
    const sourcePath = join(SOURCE_DIR, sourceName);
    if (existsSync(sourcePath) && existsSync(publicPath)) {
      const sourcePdf = readFileSync(sourcePath);
      const publicPdf = readFileSync(publicPath);
      if (!sourcePdf.equals(publicPdf)) {
        warnings.push(
          `${lecture.id}: public PDF differs from local problem1a/${sourceName}; public/problem1a/ remains the committed source of truth`,
        );
      }
    }
  }
} else {
  warnings.push("local problem1a/ intake folder not found; skipped optional byte-identical comparison");
}

report();

function report() {
  if (issues.length > 0) {
    console.error(`problem-lectures QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }
  console.log(`problem-lectures QA passed (${COMMON_TEST_PROBLEM_LECTURES.length} problem lectures, all links resolve, public PDFs present).`);
  for (const warning of warnings) console.warn(`problem-lectures QA warning: ${warning}`);
}

