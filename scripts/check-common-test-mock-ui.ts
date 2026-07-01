import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const issues: string[] = [];

const files = {
  runner: join(root, "src/components/common-test/mock-exam/CommonTestMockExamRunner.tsx"),
  route: join(root, "src/app/common-test/simulator/common-test-math-1a-mock-001/page.tsx"),
  index: join(root, "src/app/common-test/simulator/page.tsx"),
  data: join(root, "src/data/common-test-mock-exams.ts"),
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
  const route = read(files.route);
  const index = read(files.index);
  const data = read(files.data);

  check(runner.includes('"use client"'), "mock runner should be a Client Component");
  check(runner.includes("残り時間"), "runner should display remaining time");
  check(runner.includes("時間外演習"), "runner should distinguish overtime practice");
  check(runner.includes("見直しフラグ") || runner.includes("見直し"), "runner should support review flags");
  check(runner.includes("解答状況"), "runner should show answer status");
  check(runner.includes("大問一覧"), "runner should show section navigation");
  check(runner.includes("提出する"), "runner should include submit flow");
  check(runner.includes("復習モード"), "runner should include review mode");
  check(runner.includes("QuadraticGraph"), "runner should render a graph component");
  check(runner.includes("TriangleDiagram"), "runner should render a diagram component");
  check(runner.includes("<table"), "runner should render table assets");
  check(runner.includes("conversation") || runner.includes("speaker"), "runner should render conversation assets");

  check(route.includes("COMMON_TEST_MATH_1A_MOCK_001"), "route should use the new structured mock exam");
  check(index.includes("/common-test/simulator/common-test-math-1a-mock-001"), "simulator index should link to new mock first");
  check(index.indexOf("新形式：共通テスト数学IA 本番模試 第1回") < index.indexOf("旧版：冊子画像型"), "new mock card should appear before legacy paper card");

  check(data.includes("targetAverage: { min: 38, max: 45 }"), "data should expose target average");
  check(data.includes('type: "graph"'), "data should contain graph asset");
  check(data.includes('type: "diagram"'), "data should contain diagram asset");
  check(data.includes('type: "table"'), "data should contain table asset");
  check(data.includes('type: "conversation"'), "data should contain conversation asset");

  check(!/gradient|from-|to-|via-/.test(runner), "mock UI should avoid decorative gradient styling");
  check(!/rounded-3xl|rounded-full/.test(runner), "mock UI should avoid overly rounded decorative controls");

  report();
}

function report() {
  if (issues.length > 0) {
    console.error(`common-test mock UI QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }
  console.log("common-test mock UI QA passed: route, first-card link, paper-like runner, assets, timer, flags, submit, review.");
}

main();
