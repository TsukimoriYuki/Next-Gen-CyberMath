import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const issues: string[] = [];

const files = {
  runner: join(root, "src/components/common-test/mock-exam/CommonTestMockExamRunner.tsx"),
  pdfViewer: join(root, "src/components/common-test/mock-exam/CommonTestPdfMockViewer.tsx"),
  manualRoute: join(root, "src/app/common-test/simulator/common-test-math-1a-manual-001/page.tsx"),
  manualRoute002: join(root, "src/app/common-test/simulator/common-test-math-1a-manual-002/page.tsx"),
  prototypeRoute: join(
    root,
    "src/app/common-test/simulator/common-test-math-1a-manual-001/structured-prototype/page.tsx",
  ),
  oldRoute: join(root, "src/app/common-test/simulator/common-test-math-1a-mock-001/page.tsx"),
  index: join(root, "src/app/common-test/simulator/page.tsx"),
  commonTestHome: join(root, "src/app/common-test/page.tsx"),
  math1aPage: join(root, "src/components/common-test/CommonTestSubjectPage.tsx"),
  data: join(root, "src/data/common-test/manual-mocks/math1a-001.ts"),
  data002: join(root, "src/data/common-test/manual-mocks/math1a-002.ts"),
};

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function read(path: string) {
  return readFileSync(path, "utf8");
}

function main() {
  for (const [name, path] of Object.entries(files)) {
    check(existsSync(path), `${name} file is missing: ${path}`);
  }
  if (issues.length > 0) return report();

  const runner = read(files.runner);
  const pdfViewer = read(files.pdfViewer);
  const manualRoute = read(files.manualRoute);
  const manualRoute002 = read(files.manualRoute002);
  const prototypeRoute = read(files.prototypeRoute);
  const oldRoute = read(files.oldRoute);
  const index = read(files.index);
  const commonTestHome = read(files.commonTestHome);
  const math1aPage = read(files.math1aPage);
  const data = read(files.data);
  const data002 = read(files.data002);

  // 構造化データ版（旧実装）— devOnlyの参照実装としてコード自体は残す。
  check(runner.includes('"use client"'), "mock runner should be a Client Component");
  check(runner.includes("見直しフラグ"), "runner should support review flags");
  check(runner.includes("大問ジャンプ"), "runner should show section navigation");
  check(runner.includes("TowerElevationDiagram"), "runner should render tower SVG");
  check(runner.includes("SpherePlaneDiagram"), "runner should render sphere-plane SVG");
  check(runner.includes("CircleTangentDiagram"), "runner should render tangent SVG");
  check(runner.includes("export function AnswerInput"), "runner should export AnswerInput for reuse by the PDF viewer");

  // devOnlyの参照実装ルート — noindexで、本番導線からは参照されない。
  check(prototypeRoute.includes("CommonTestMockExamRunner"), "structured-prototype route should render the old runner");
  check(prototypeRoute.includes("index: false"), "structured-prototype route should be noindex (devOnly)");
  check(
    !Object.entries(files).some(
      ([name, path]) => name !== "prototypeRoute" && name !== "runner" && read(path).includes("structured-prototype"),
    ),
    "no public route/component should link to the devOnly structured-prototype route",
  );

  // PDF冊子ビューア（本番の正本）— iframe表示・別タブ・ダウンロード・タイマー・解答欄。
  check(pdfViewer.includes('"use client"'), "PDF mock viewer should be a Client Component");
  check(pdfViewer.includes("<iframe"), "PDF mock viewer should embed the PDF via <iframe>");
  check(pdfViewer.includes("exam.pdfUrl"), "PDF mock viewer should render exam.pdfUrl, not reconstructed problem text");
  check(pdfViewer.includes("download"), "PDF mock viewer should offer a PDF download link");
  check(pdfViewer.includes("別タブ"), "PDF mock viewer should offer to open the PDF in a new tab");
  check(pdfViewer.includes("残り時間"), "PDF mock viewer should display remaining time");
  check(pdfViewer.includes("未解答"), "PDF mock viewer should display unanswered count");
  check(pdfViewer.includes("提出する"), "PDF mock viewer should include a submit flow");
  check(pdfViewer.includes("解説を見る"), "PDF mock viewer should include explanations");
  check(pdfViewer.includes("scoreCommonTestMockExam"), "PDF mock viewer should score from structured data, not the PDF");
  check(!pdfViewer.includes("score.sectionScores.slice(0, 1)"), "PDF mock viewer should show all section scores, not only section 1");
  check(
    !/question\.prompt|<TowerElevationDiagram|<SpherePlaneDiagram|<CircleTangentDiagram/.test(pdfViewer),
    "PDF mock viewer must not re-render problem prompts/diagrams — those come from the PDF",
  );

  check(manualRoute.includes("CommonTestPdfMockViewer"), "manual route should render the PDF booklet viewer, not the React-reconstructed runner");
  check(!manualRoute.includes("CommonTestMockExamRunner"), "manual route should not render the old React-reconstructed runner directly");
  check(manualRoute.includes("COMMON_TEST_MATH_1A_MANUAL_001"), "manual route should use manual PDF exam");
  check(manualRoute.includes("common-test-math-1a-manual-001"), "manual route should have canonical manual URL");
  check(manualRoute002.includes("CommonTestPdfMockViewer"), "manual 002 route should render the PDF booklet viewer");
  check(manualRoute002.includes("COMMON_TEST_MATH_1A_MANUAL_002"), "manual 002 route should use manual 002 PDF exam");
  check(manualRoute002.includes("common-test-math-1a-manual-002"), "manual 002 route should have canonical manual URL");
  check(oldRoute.includes("試作版・非公開"), "old AI route should be marked non-public/prototype");
  check(oldRoute.includes("common-test-math-1a-manual-001"), "old AI route should link to manual version");
  check(!oldRoute.includes("CommonTestMockExamRunner"), "old AI route should not launch the runner");

  check(index.includes("getPublicCommonTestMockExams"), "index should read public mock registry");
  check(index.includes("手動作成版 第1回"), "index should show manual mock");
  check(index.includes("手動作成版 第2回"), "index should show manual 002 mock");
  check(index.includes("第2回に進む"), "index should present manual 002 as an additional run");
  check(index.includes("common-test-math-1a-mock-001") === false, "index should not link to old AI mock");
  check(index.includes("配点 30,30,20,20"), "index should show section point structure");
  check(
    commonTestHome.includes("/common-test/simulator/common-test-math-1a-manual-001"),
    "common-test home should link the main exam CTA to the manual PDF mock",
  );
  check(
    commonTestHome.includes("/common-test/simulator/common-test-math-1a-manual-002"),
    "common-test home should include manual 002 as additional practice",
  );
  check(
    math1aPage.includes("getPublicCommonTestExperiences") &&
      math1aPage.includes("additionalMocks") &&
      math1aPage.includes("追加演習"),
    "math-1a page should include additional public PDF mocks as additional practice",
  );
  check(
    !commonTestHome.includes('/common-test/simulator/math-1a-paper-001"'),
    "common-test home should not send the main exam CTA to the legacy paper sample",
  );

  check(data.includes('id: "common-test-math-1a-manual-001"'), "data should expose manual exam id");
  check(data.includes("pdfUrl:"), "data should declare a pdfUrl pointing at the source-of-truth PDF");
  check(data.includes('source: "manual-pdf"'), "data should mark source as manual-pdf");
  check(data.includes('status: "published"'), "data should be published");
  check(data.includes("0≦x≦4"), "data should preserve 0≦x≦4 text");
  check(!data.includes("0 5 x 5 4"), "data should not contain broken inequality text");
  check(data.includes('variant: "tower-elevation"'), "data should contain tower diagram");
  check(data.includes('variant: "sphere-plane"'), "data should contain sphere-plane diagram");
  check(data.includes('variant: "circle-tangent"'), "data should contain tangent diagram");
  check(data.includes('answerFormat: "multi-choice"'), "data should contain [ヒ] as multi-choice");
  check(data.includes('answer: ["1", "2", "3", "4"]'), "[ヒ] answer should be 1,2,3,4");
  check(data002.includes('id: "common-test-math-1a-manual-002"'), "manual 002 data should expose manual 002 exam id");
  check(data002.includes("pdfUrl:"), "manual 002 data should declare a pdfUrl");
  check(data002.includes('source: "manual-pdf"'), "manual 002 data should mark source as manual-pdf");
  check(data002.includes('status: "published"'), "manual 002 data should be published");
  check(data002.includes("PDF冊子の第1問を正本"), "manual 002 data should not reconstruct the full problem body");
  check(data002.includes('"テト": "10"'), "manual 002 data should include the [テト] denominator answer 10");

  report();
}

function report() {
  if (issues.length > 0) {
    console.error(`manual common-test mock UI QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }
  console.log("manual common-test mock UI QA passed: manual route, public index/home CTAs, old draft route, diagrams, timer, flags, submit, review.");
}

main();
