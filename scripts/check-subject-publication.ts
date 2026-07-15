import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import {
  COMMON_TEST_MOCK_EXAMS,
  getPublicCommonTestMockExams,
} from "../src/data/common-test-mock-exams";
import {
  PUBLIC_SUBJECTS,
  SUBJECTS,
  type SubjectConfig,
} from "../src/data/subjects";
import {
  PUBLIC_SPECIAL_LECTURES,
  SPECIAL_LECTURES,
} from "../src/data/specialLectures";
import { SPEED_READING_PROBLEMS } from "../src/data/english-speed-reading";
import { getAllProblems } from "../src/lib/content";
import {
  canAccessSubjectResource,
  evaluateSubjectPublication,
  isSubjectResourceDiscoverable,
  resolveTopLevelSubjectId,
  resolveSubjectPublicationRuntime,
} from "../src/lib/subject-publication";
import {
  canAccessReviewItem,
  resolveLectureTopLevelSubjectId,
} from "../src/lib/review-publication";
import {
  canAccessMissionProblem,
  resolveMissionTopLevelSubjectId,
} from "../src/lib/mission-publication";

const ROOT = process.cwd();
const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function read(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function fixture(
  status: SubjectConfig["status"],
  courses = true,
): SubjectConfig {
  return {
    id: `${status}-fixture`,
    name: status,
    shortName: status,
    href: `/${status}-fixture`,
    description: "publication QA fixture",
    status,
    capabilities: { courses, problems: true, exams: true, review: true },
  };
}

const publicFixture = fixture("public");
const betaFixture = fixture("beta");
const hiddenFixture = fixture("hidden");
const disabledFixture = fixture("public", false);

for (const runtime of ["development", "preview", "production", "test"] as const) {
  check(
    evaluateSubjectPublication(publicFixture, "courses", runtime).allowed,
    `public subject must be accessible in ${runtime}`,
  );
  const beta = evaluateSubjectPublication(betaFixture, "courses", runtime);
  check(beta.allowed, `beta subject must be accessible in ${runtime}`);
  check(beta.allowed && beta.isBeta, `beta state must be returned in ${runtime}`);
}

check(
  evaluateSubjectPublication(hiddenFixture, "courses", "development").allowed,
  "hidden subject must be inspectable in local development",
);
for (const runtime of ["preview", "production", "test"] as const) {
  check(
    !evaluateSubjectPublication(hiddenFixture, "courses", runtime).allowed,
    `hidden subject must be rejected in ${runtime}`,
  );
}
check(
  !evaluateSubjectPublication(undefined, "courses", "production").allowed,
  "unknown subject must be rejected",
);
check(
  !evaluateSubjectPublication(disabledFixture, "courses", "production").allowed,
  "disabled capability must be rejected",
);
check(
  resolveSubjectPublicationRuntime({ NODE_ENV: "production", VERCEL_ENV: "preview" }) ===
    "preview",
  "Vercel Preview must resolve to the preview runtime",
);
check(
  resolveSubjectPublicationRuntime({ NODE_ENV: "development", VERCEL_ENV: "preview" }) ===
    "development",
  "local development must remain explicitly inspectable",
);
check(
  canAccessSubjectResource("math-1a", "exams", "production"),
  "registered legacy math subject ID must resolve to its public parent",
);
check(
  canAccessSubjectResource("math-1a", "review", "test"),
  "public mathematics review filters must remain accessible",
);
check(
  canAccessSubjectResource("english-reading", "review", "test"),
  "public English review filters must remain accessible",
);
check(
  resolveTopLevelSubjectId("math1a") === "math" &&
    resolveTopLevelSubjectId("math2bc") === "math",
  "exam-paper subject IDs must resolve to their mathematics parent",
);
check(
  !canAccessSubjectResource("unknown-subject", "exams", "production"),
  "unknown resource subject ID must be rejected",
);
check(
  canAccessReviewItem(
    {
      itemType: "math-problem",
      itemId: getAllProblems()[0]?.slug ?? "missing",
      subjectId: null,
    },
    "test",
  ),
  "legacy null math review subject must remain compatible",
);
check(
  !canAccessReviewItem(
    { itemType: "math-problem", itemId: "bad-row", subjectId: "unknown-subject" },
    "test",
  ),
  "unknown review subject must be rejected",
);
check(
  !canAccessReviewItem(
    { itemType: "math-problem", itemId: "missing-math-problem", subjectId: null },
    "test",
  ),
  "missing mathematics review item must be rejected",
);
const publicEnglishReviewId = SPEED_READING_PROBLEMS[0]?.id;
check(
  Boolean(
    publicEnglishReviewId &&
      canAccessReviewItem(
        {
          itemType: "english-problem",
          itemId: publicEnglishReviewId,
          subjectId: "english-reading",
        },
        "test",
      ),
  ),
  "registered English review item must remain accessible",
);
check(
  !canAccessReviewItem(
    { itemType: "english-problem", itemId: "missing-english-problem", subjectId: null },
    "test",
  ),
  "missing English review item must be rejected",
);
check(
  resolveLectureTopLevelSubjectId("共通テスト 英語リーディング") ===
    "english",
  "English lecture metadata must resolve to English instead of mathematics",
);
check(
  resolveLectureTopLevelSubjectId("共通テスト 数学IA") === "math",
  "mathematics lecture metadata must resolve to mathematics",
);
check(
  resolveLectureTopLevelSubjectId("情報I") === undefined,
  "unknown lecture subjects must not inherit mathematics",
);

const publicLectureWithProblem = PUBLIC_SPECIAL_LECTURES.find((lecture) =>
  lecture.blocks.some((block) => block.type === "problem"),
);
const publicLectureProblem = publicLectureWithProblem?.blocks.find(
  (block) => block.type === "problem",
);
check(
  Boolean(publicLectureWithProblem && publicLectureProblem),
  "subject publication QA requires a public lecture problem fixture",
);
if (publicLectureWithProblem && publicLectureProblem) {
  check(
    canAccessReviewItem(
      {
        itemType: "common-test-lecture",
        itemId: `lecture:${publicLectureWithProblem.slug}:${publicLectureProblem.id}`,
        subjectId: "math-1a",
      },
      "test",
    ),
    "registered public lecture problem must remain reviewable",
  );
  check(
    !canAccessReviewItem(
      {
        itemType: "common-test-lecture",
        itemId: `lecture:${publicLectureWithProblem.slug}:missing-block`,
        subjectId: "math-1a",
      },
      "test",
    ),
    "unknown lecture block must be rejected",
  );
}

const hiddenLectureWithProblem = SPECIAL_LECTURES.find(
  (lecture) =>
    lecture.isPublished === false &&
    lecture.blocks.some((block) => block.type === "problem"),
);
const hiddenLectureProblem = hiddenLectureWithProblem?.blocks.find(
  (block) => block.type === "problem",
);
check(
  Boolean(hiddenLectureWithProblem && hiddenLectureProblem),
  "subject publication QA requires a hidden lecture problem fixture",
);
if (hiddenLectureWithProblem && hiddenLectureProblem) {
  check(
    !canAccessReviewItem(
      {
        itemType: "common-test-lecture",
        itemId: `lecture:${hiddenLectureWithProblem.slug}:${hiddenLectureProblem.id}`,
        subjectId: "math-1a",
      },
      "test",
    ),
    "non-public lecture problem must not enter or remain in review queues",
  );
}
check(
  !canAccessReviewItem(
    {
      itemType: "common-test-lecture",
      itemId: "lecture:missing-lecture:missing-block",
      subjectId: "math-1a",
    },
    "test",
  ),
  "unknown lecture must be rejected even with a public subjectId",
);
check(
  resolveMissionTopLevelSubjectId("quadratic-sample") === "math",
  "legacy mathematics mission slug must resolve to mathematics",
);
check(
  resolveMissionTopLevelSubjectId("english/speed-reading/sample") === "english",
  "English mission path must resolve to English",
);
check(
  canAccessMissionProblem(
    `english/speed-reading/${SPEED_READING_PROBLEMS[0]?.id ?? "missing"}`,
    "test",
  ),
  "published English mission must remain accessible",
);
check(
  canAccessMissionProblem(getAllProblems()[0]?.slug ?? "missing", "test"),
  "published mathematics mission must remain accessible",
);
check(
  !canAccessMissionProblem("missing-mathematics-problem", "test"),
  "unregistered mathematics mission must be rejected",
);
check(
  !canAccessMissionProblem("english/speed-reading/missing-problem", "test"),
  "unregistered English mission must be rejected",
);
check(
  !canAccessMissionProblem("unknown-subject/sample", "test"),
  "unknown mission prefix must be rejected",
);

check(
  (PUBLIC_SUBJECTS as readonly SubjectConfig[]).every(
    (subject) => subject.status !== "hidden",
  ),
  "public subject selector contains a hidden subject",
);
const sitemapPaths = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
const sitemapSource = read("src/app/sitemap.ts");
const mathProblemRouteBlock =
  sitemapSource.match(/const MATH_PROBLEM_ROUTES = \[[\s\S]*?\] as const;/)?.[0] ??
  "";
const mathExamRouteBlock =
  sitemapSource.match(/const MATH_EXAM_ROUTES = \[[\s\S]*?\] as const;/)?.[0] ??
  "";
check(
  mathProblemRouteBlock.includes('"/dojo"') &&
    !mathExamRouteBlock.includes('"/dojo"'),
  "sitemap must classify the dojo route under mathematics problems",
);
for (const subject of (SUBJECTS as readonly SubjectConfig[]).filter(
  (entry) => entry.status === "hidden",
)) {
  check(!sitemapPaths.has(subject.href), `sitemap contains hidden subject ${subject.href}`);
}

const publicMockIds = new Set(getPublicCommonTestMockExams().map((exam) => exam.id));
for (const exam of COMMON_TEST_MOCK_EXAMS) {
  const expected =
    exam.status === "published" &&
    !exam.devOnly &&
    isSubjectResourceDiscoverable(exam.subject, "exams");
  check(
    publicMockIds.has(exam.id) === expected,
    `mock list publication mismatch for ${exam.id}`,
  );
}

for (const file of [
  "src/app/math/layout.tsx",
  "src/app/english/layout.tsx",
  "src/app/lessons/layout.tsx",
  "src/app/problems/layout.tsx",
  "src/app/units/layout.tsx",
  "src/app/courses/math-1a/layout.tsx",
  "src/app/courses/[subjectId]/layout.tsx",
  "src/app/common-test/math-1a/layout.tsx",
  "src/app/common-test/math-2bc/layout.tsx",
  "src/app/common-test/english-reading/layout.tsx",
  "src/app/common-test/practice/layout.tsx",
  "src/app/common-test/problem-lectures/layout.tsx",
  "src/app/calc-drill/layout.tsx",
  "src/app/drill/layout.tsx",
  "src/app/challenge-problems/layout.tsx",
  "src/app/dojo/layout.tsx",
  "src/app/mock/layout.tsx",
  "src/app/tags/layout.tsx",
  "src/app/exam-sets/layout.tsx",
  "src/app/common-test/lectures/layout.tsx",
  "src/app/courses/[subjectId]/page.tsx",
  "src/app/courses/[subjectId]/[unitId]/page.tsx",
  "src/app/courses/[subjectId]/[unitId]/[lessonId]/page.tsx",
]) {
  check(
    read(file).includes("requireSubjectPageAccess"),
    `${file} must use the central subject page guard`,
  );
}

const noticeSource = read(
  "src/components/learning/SubjectPublicationNotice.tsx",
);
check(
  noticeSource.includes("ベータ公開"),
  "subject publication notice must label beta routes in text",
);
check(
  noticeSource.includes("未公開・開発確認用"),
  "subject publication notice must label local hidden routes in text",
);
check(
  noticeSource.includes("未公開教材・開発確認用"),
  "subject publication notice must label local unpublished resources in text",
);
check(
  noticeSource.includes("access.isResourcePreview &&") &&
    noticeSource.includes("access.isBeta &&") &&
    noticeSource.includes("isHiddenSubjectPreview &&"),
  "subject publication notice must preserve simultaneous publication states",
);
check(
  read("src/lib/subject-route-guard.ts").includes(
    "isResourcePreview: options.resourcePublished === false",
  ),
  "subject route guard must return local unpublished-resource preview state",
);
check(
  read("src/app/courses/[subjectId]/layout.tsx").includes(
    "resourcePublished: isPublicCourseSubject(subject)",
  ),
  "dynamic course layout must pass child publication state to the guard",
);
const math1aCourseLayoutSource = read("src/app/courses/math-1a/layout.tsx");
check(
  math1aCourseLayoutSource.includes('getCourseSubject("math-1a")') &&
    math1aCourseLayoutSource.includes("isPublicCourseSubject(subject)") &&
    math1aCourseLayoutSource.includes(
      "resourcePublished: isPublicCourseSubject(subject)",
    ),
  "fixed mathematics IA course layout must guard the registered course resource state",
);
for (const file of [
  "src/app/math/layout.tsx",
  "src/app/english/layout.tsx",
  "src/app/lessons/layout.tsx",
  "src/app/problems/layout.tsx",
  "src/app/units/layout.tsx",
  "src/app/courses/math-1a/layout.tsx",
  "src/app/courses/[subjectId]/layout.tsx",
  "src/app/common-test/math-1a/layout.tsx",
  "src/app/common-test/math-2bc/layout.tsx",
  "src/app/common-test/english-reading/layout.tsx",
  "src/app/common-test/practice/layout.tsx",
  "src/app/common-test/problem-lectures/layout.tsx",
  "src/app/calc-drill/layout.tsx",
  "src/app/drill/layout.tsx",
  "src/app/challenge-problems/layout.tsx",
  "src/app/dojo/layout.tsx",
  "src/app/mock/layout.tsx",
  "src/app/tags/layout.tsx",
  "src/app/exam-sets/layout.tsx",
  "src/app/common-test/lectures/layout.tsx",
]) {
  check(
    read(file).includes("SubjectPublicationNotice"),
    `${file} must render the subject publication notice`,
  );
}

for (const [file, capability] of [
  ["src/app/calc-drill/layout.tsx", "problems"],
  ["src/app/drill/layout.tsx", "problems"],
  ["src/app/challenge-problems/layout.tsx", "problems"],
  ["src/app/dojo/layout.tsx", "problems"],
  ["src/app/mock/layout.tsx", "exams"],
  ["src/app/tags/layout.tsx", "problems"],
  ["src/app/exam-sets/layout.tsx", "exams"],
  ["src/app/common-test/lectures/layout.tsx", "exams"],
] as const) {
  check(
    read(file).includes(`requireSubjectPageAccess("math", "${capability}")`),
    `${file} must require the mathematics ${capability} capability`,
  );
}

const simulatorLayoutPath = path.join(
  ROOT,
  "src/app/common-test/simulator/layout.tsx",
);
const simulatorLayoutSource = fs.existsSync(simulatorLayoutPath)
  ? fs.readFileSync(simulatorLayoutPath, "utf8")
  : "";
check(
  !simulatorLayoutSource.includes('requireSubjectPageAccess("math", "exams")'),
  "simulator layout must not force every current and future exam through mathematics",
);

for (const [file, resourceSubjectExpression] of [
  ["src/app/common-test/simulator/page.tsx", "mock.subject"],
  ["src/app/common-test/simulator/[examId]/page.tsx", "preset.subjectId"],
  [
    "src/app/common-test/simulator/common-test-math-1a-manual-001/page.tsx",
    "COMMON_TEST_MATH_1A_MANUAL_001.subject",
  ],
  [
    "src/app/common-test/simulator/common-test-math-1a-manual-002/page.tsx",
    "COMMON_TEST_MATH_1A_MANUAL_002.subject",
  ],
  [
    "src/app/common-test/simulator/paper-sample/page.tsx",
    "MATH_1A_SECTION_2_PAPER_SAMPLE.subject",
  ],
  [
    "src/app/common-test/simulator/common-test-math-1a-manual-001/structured-prototype/page.tsx",
    "COMMON_TEST_MATH_1A_MANUAL_001.subject",
  ],
  [
    "src/app/common-test/simulator/common-test-math-1a-mock-001/page.tsx",
    "COMMON_TEST_MATH_1A_AI_PROTOTYPE_001.subject",
  ],
  [
    "src/app/common-test/simulator/math-1a-paper-001/page.tsx",
    "MATH_1A_PAPER_001.subject",
  ],
] as const) {
  const source = read(file);
  check(
    source.includes("resolveTopLevelSubjectId(") &&
      source.includes(resourceSubjectExpression) &&
      source.includes("requireSubjectPageAccess(") &&
      source.includes("resourcePublished"),
    `${file} must derive its subject and publication state from its registered simulator resource`,
  );
}

for (const file of [
  "src/app/common-test/simulator/page.tsx",
  "src/app/common-test/simulator/[examId]/page.tsx",
  "src/app/common-test/simulator/common-test-math-1a-manual-001/page.tsx",
  "src/app/common-test/simulator/common-test-math-1a-manual-002/page.tsx",
  "src/app/common-test/simulator/paper-sample/page.tsx",
  "src/app/common-test/simulator/common-test-math-1a-manual-001/structured-prototype/page.tsx",
  "src/app/common-test/simulator/common-test-math-1a-mock-001/page.tsx",
]) {
  check(
    read(file).includes("SubjectPublicationNotice"),
    `${file} must preserve beta or local unpublished-resource notices when it renders`,
  );
}

for (const file of [
  "src/app/api/review/create/route.ts",
  "src/app/api/review/list/route.ts",
  "src/app/api/review/today/route.ts",
  "src/app/api/review/complete/route.ts",
]) {
  check(
    read(file).includes("canAccessReviewItem"),
    `${file} must apply the review publication guard`,
  );
}
check(
  read("src/app/api/review/list/route.ts").includes(
    'canAccessSubjectResource(subjectId, "review")',
  ),
  "review list subject filters must validate the subject without requiring an item ID",
);
check(
  read("src/app/api/english-attempts/route.ts").includes("canAccessSubject"),
  "English attempts API must apply the subject publication guard",
);
check(
  read("src/lib/exam-attempt-api.ts").includes("canAccessSubjectResource"),
  "exam attempts handler must apply the subject publication guard",
);
for (const [file, guardCall] of [
  [
    "src/app/api/abyss/gacha/route.ts",
    'canAccessSubject("math", "problems")',
  ],
  [
    "src/app/api/common-test/oracle/route.ts",
    'canAccessSubjectResource(input.subjectId, "exams")',
  ],
  [
    "src/app/api/oracle/route.ts",
    'url === "/mock") return canAccessSubject("math", "exams")',
  ],
  [
    "src/app/api/mission/route.ts",
    "canAccessMissionProblem(mission.problemSlug)",
  ],
  [
    "src/app/api/mission/[id]/route.ts",
    "canAccessMissionProblem(mission.problemSlug)",
  ],
  [
    "src/app/api/mentor/mission/route.ts",
    "canAccessMissionProblem",
  ],
  [
    "src/app/mission/[id]/page.tsx",
    "canAccessMissionProblem(mission.problemSlug)",
  ],
  [
    "src/components/mission/EmergencyMissionPanel.tsx",
    "canAccessMissionProblem",
  ],
] as const) {
  check(
    read(file).includes(guardCall),
    `${file} must apply its subject publication guard`,
  );
}
const missionPageSource = read("src/app/mission/[id]/page.tsx");
check(
  (missionPageSource.match(/canAccessMissionProblem\(/g)?.length ?? 0) >= 2 &&
    missionPageSource.includes(
      'session.role !== "MENTOR" && mission.userId !== session.sub',
    ),
  "mission metadata and page body must both enforce publication and ownership",
);
const mentorMissionApiSource = read("src/app/api/mentor/mission/route.ts");
check(
  (mentorMissionApiSource.match(/canAccessMissionProblem\(/g)?.length ?? 0) >=
    2,
  "mentor mission API must guard both listing and creation",
);
check(
  read("src/app/api/oracle/route.ts").includes(
    'ENGLISH_COURSE_TASK_URLS.has(url) ? "courses" : "problems"',
  ),
  "oracle must distinguish English course and problem recommendations",
);

if (issues.length > 0) {
  console.error(`subject publication QA FAILED: ${issues.length} issue(s).`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log(
    `subject publication QA passed: ${PUBLIC_SUBJECTS.length} visible subjects, ${publicMockIds.size} public mocks, runtime/API/route guards verified.`,
  );
}
