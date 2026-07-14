import fs from "node:fs";
import path from "node:path";
import { SITE_NAME } from "../src/lib/site";

const ROOT = process.cwd();
const issues: string[] = [];

const RETIRED_PUBLIC_TERMS = [
  "MVP build",
  "CYBER OS",
  "Cyber OS",
  "COMMAND CENTER",
  "サイバー模試",
  "サイバー計算",
  "CYBER English",
  "Singularity",
  "特異点",
  "深淵",
  "ガチャ",
  "手動作成版",
  "AI生成版",
  "攻略OS",
  "HACK MODE",
  "MISSION CLEARED",
  "Cyber Oracle",
  "AI教官",
  "Next-Gen",
  "共通テスト対策室",
  "学習処方箋",
  "弱点攻略",
] as const;

// These routes are intentionally non-public and are covered by publication/route QA.
const NON_PUBLIC_SOURCE_FILES = new Set([
  "src/app/common-test/simulator/paper-sample/page.tsx",
  "src/app/common-test/simulator/common-test-math-1a-mock-001/page.tsx",
  "src/app/common-test/simulator/common-test-math-1a-manual-001/structured-prototype/page.tsx",
]);

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function listFilesRecursive(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? listFilesRecursive(full) : [full];
  });
}

function normalizeRelativePath(file: string): string {
  return path.relative(ROOT, file).replaceAll("\\", "/");
}

function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

check(SITE_NAME === "Cyber Math", `SITE_NAME should be "Cyber Math", got "${SITE_NAME}"`);

const publicUiFiles = [
  ...listFilesRecursive(path.join(ROOT, "src/app")),
  ...listFilesRecursive(path.join(ROOT, "src/components")),
  path.join(ROOT, "src/lib/site.ts"),
  path.join(ROOT, "src/data/subjects.ts"),
  path.join(ROOT, "src/data/common-test/manual-mocks/math1a-001.ts"),
  path.join(ROOT, "src/data/common-test/manual-mocks/math1a-002.ts"),
].filter((file) => {
  const relative = normalizeRelativePath(file);
  return (
    (file.endsWith(".ts") || file.endsWith(".tsx")) &&
    !NON_PUBLIC_SOURCE_FILES.has(relative)
  );
});

for (const file of publicUiFiles) {
  const relative = normalizeRelativePath(file);
  const source = stripComments(fs.readFileSync(file, "utf8"));
  for (const term of RETIRED_PUBLIC_TERMS) {
    if (source.includes(term)) {
      issues.push(`${relative} contains retired public term "${term}"`);
    }
  }
}

if (issues.length > 0) {
  console.error(`public-branding check FAILED: ${issues.length} issue(s).`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log(
    `public-branding check passed: SITE_NAME="${SITE_NAME}" and ${RETIRED_PUBLIC_TERMS.length} retired terms are absent from public UI sources.`,
  );
}
