import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const issues: string[] = [];

const files = {
  runner: join(root, "src/components/common-test/mock-exam/CommonTestMockExamRunner.tsx"),
  manualRoute: join(root, "src/app/common-test/simulator/common-test-math-1a-manual-001/page.tsx"),
  oldRoute: join(root, "src/app/common-test/simulator/common-test-math-1a-mock-001/page.tsx"),
  index: join(root, "src/app/common-test/simulator/page.tsx"),
  data: join(root, "src/data/common-test/manual-mocks/math1a-001.ts"),
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
  const manualRoute = read(files.manualRoute);
  const oldRoute = read(files.oldRoute);
  const index = read(files.index);
  const data = read(files.data);

  check(runner.includes('"use client"'), "mock runner should be a Client Component");
  check(runner.includes("残り時間"), "runner should display remaining time");
  check(runner.includes("未解答"), "runner should display unanswered count");
  check(runner.includes("見直しフラグ"), "runner should support review flags");
  check(runner.includes("大問ジャンプ"), "runner should show section navigation");
  check(runner.includes("提出する"), "runner should include submit flow");
  check(runner.includes("解説を見る") || runner.includes("解説表示"), "runner should include explanations");
  check(runner.includes("TowerElevationDiagram"), "runner should render tower SVG");
  check(runner.includes("SpherePlaneDiagram"), "runner should render sphere-plane SVG");
  check(runner.includes("CircleTangentDiagram"), "runner should render tangent SVG");
  check(runner.includes('answerFormat === "multi-choice"'), "runner should support multi-choice toggling");
  check(runner.includes("aria-label={alt}"), "SVG diagrams should use alt text as aria-label");
  check(runner.includes("md:grid-cols-4"), "result score grid should support 4 sections");
  check(!runner.includes("md:grid-cols-5"), "runner should not assume 5 sections in result grid");

  check(manualRoute.includes("COMMON_TEST_MATH_1A_MANUAL_001"), "manual route should use manual PDF exam");
  check(manualRoute.includes("common-test-math-1a-manual-001"), "manual route should have canonical manual URL");
  check(oldRoute.includes("試作版・非公開"), "old AI route should be marked non-public/prototype");
  check(oldRoute.includes("common-test-math-1a-manual-001"), "old AI route should link to manual version");
  check(!oldRoute.includes("CommonTestMockExamRunner"), "old AI route should not launch the runner");

  check(index.includes("getPublicCommonTestMockExams"), "index should read public mock registry");
  check(index.includes("手動作成版 第1回"), "index should show manual mock");
  check(index.includes("common-test-math-1a-mock-001") === false, "index should not link to old AI mock");
  check(index.includes("配点 30,30,20,20"), "index should show section point structure");

  check(data.includes('id: "common-test-math-1a-manual-001"'), "data should expose manual exam id");
  check(data.includes('source: "manual-pdf"'), "data should mark source as manual-pdf");
  check(data.includes('status: "published"'), "data should be published");
  check(data.includes("0≦x≦4"), "data should preserve 0≦x≦4 text");
  check(!data.includes("0 5 x 5 4"), "data should not contain broken inequality text");
  check(data.includes('variant: "tower-elevation"'), "data should contain tower diagram");
  check(data.includes('variant: "sphere-plane"'), "data should contain sphere-plane diagram");
  check(data.includes('variant: "circle-tangent"'), "data should contain tangent diagram");
  check(data.includes('answerFormat: "multi-choice"'), "data should contain [ヒ] as multi-choice");
  check(data.includes('answer: ["1", "2", "3", "4"]'), "[ヒ] answer should be 1,2,3,4");

  report();
}

function report() {
  if (issues.length > 0) {
    console.error(`manual common-test mock UI QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }
  console.log("manual common-test mock UI QA passed: manual route, public index, old draft route, diagrams, timer, flags, submit, review.");
}

main();
