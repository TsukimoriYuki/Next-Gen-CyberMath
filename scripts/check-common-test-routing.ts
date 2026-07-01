// 共通テスト関連導線の整合性を検査する。
// npm run qa:common-test-routing
//
// 検査内容:
//  - /common-test の数学IA本番導線が手動PDF版へ向く
//  - /common-test/simulator の公開一覧に、旧AI試作版・旧プリセットが出ない
//  - 旧プリセット（EXAM SIMULATOR 9本）が本番模試として公開されていない
//  - /common-test/simulator/[examId] が旧プリセットを本番模試として描画しない
//    （手動作成版へのリダイレクト、または非公開notice）
//  - 未診断時に仮スコアが出ない（診断ゲートの実装が残っているか）
//  - 64/80, 57/75, 70/85, MVP build が公開ソースに出ない

import fs from "node:fs";
import path from "node:path";
import { getPublicCommonTestMockExams } from "../src/data/common-test-mock-exams";
import { getAllCommonTestExamPresets, resolveExamPresetMeta } from "../src/data/common-test-exams";
import { findPublicExperience, getCommonTestExperiences } from "../src/data/common-test-experiences";

const ROOT = process.cwd();
const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function read(relPath: string): string {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

function listFilesRecursive(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFilesRecursive(full);
    return [full];
  });
}

// ── /common-test の本番導線が手動PDF版へ向くか ────────────────────────────
// CommonTestSubjectCard / CommonTestSubjectPage はレジストリ (findPublicExperience)
// からリンク先を得るため、ここではレジストリそのものが正しい値を返すかを検証する
// （個別コンポーネントのソース文字列に依存すると、リファクタで簡単に壊れる）。
const math1aFullMock = findPublicExperience("math-1a", "full-mock-pdf");
check(
  math1aFullMock?.id === "common-test-math-1a-manual-001",
  `math-1a's public full-mock-pdf experience should be common-test-math-1a-manual-001, got ${math1aFullMock?.id}`,
);
check(
  getCommonTestExperiences().some(
    (e) =>
      e.id === "common-test-math-1a-manual-002" &&
      e.subject === "math-1a" &&
      e.mode === "full-mock-pdf" &&
      e.status === "public" &&
      e.source === "manual-pdf" &&
      e.targetUrl === "/common-test/simulator/common-test-math-1a-manual-002",
  ),
  "manual 002 should exist in the experience registry as a public math-1a full-mock-pdf entry",
);
check(
  findPublicExperience("math-2bc", "full-mock-pdf") === undefined,
  "math-2bc should not have a public full-mock-pdf experience yet (no manual PDF exists)",
);
check(
  findPublicExperience("english-reading", "full-mock-pdf") === undefined,
  "english-reading should not have a public full-mock-pdf experience yet (no manual PDF exists)",
);

const commonTestHome = read("src/app/common-test/page.tsx");
check(
  !commonTestHome.includes('/common-test/simulator/math-1a-70"'),
  "src/app/common-test/page.tsx should not send the main exam CTA to the legacy math-1a-70 preset",
);

// ── /common-test/simulator の公開一覧が旧AI/旧プリセットを含まないか ────────
const publicMocks = getPublicCommonTestMockExams();
check(publicMocks.every((m) => m.source === "manual-pdf"), "public mock list should only contain manual-pdf mocks");
check(
  publicMocks.map((m) => m.id).join(",") === "common-test-math-1a-manual-001,common-test-math-1a-manual-002",
  `public mock list should contain manual 001 then 002, got ${publicMocks.map((m) => m.id).join(",")}`,
);
check(
  !publicMocks.some((m) => m.id.includes("mock-001") || m.id.includes("ai")),
  "public mock list should not contain the AI prototype",
);

// ── 旧プリセット9本が本番模試として公開されていないか ──────────────────────
const presets = getAllCommonTestExamPresets();
check(presets.length === 9, `expected 9 legacy EXAM SIMULATOR presets, found ${presets.length}`);
for (const preset of presets) {
  const meta = resolveExamPresetMeta(preset);
  check(
    meta.status !== "public",
    `legacy preset "${preset.id}" is marked public — it should stay draft/archived and out of public listings`,
  );
}

// ── /common-test/simulator/[examId] が旧プリセットを描画しないか ───────────
const examIdPage = read("src/app/common-test/simulator/[examId]/page.tsx");
check(
  examIdPage.includes("resolveExamPresetMeta") && examIdPage.includes("redirect("),
  "[examId]/page.tsx should gate legacy presets via resolveExamPresetMeta and redirect math-1a to the manual PDF version",
);
check(
  examIdPage.includes("LegacyPresetNotice") || examIdPage.includes("非公開"),
  "[examId]/page.tsx should show a clear non-public notice for legacy presets without a manual PDF version",
);

// ── math-2bc-70 / english-reading-80 が legacy/practice と明記されているか ──
const legacyEntries = getCommonTestExperiences().filter((e) => e.mode === "full-mock-legacy");
for (const entry of legacyEntries) {
  check(
    entry.status !== "public",
    `${entry.id} is a legacy preset but marked public — must stay non-public until a manual review exists`,
  );
}

// ── 診断ゲート：未診断時に仮スコアを出していないか ─────────────────────────
const targetScorePanel = read("src/components/common-test/CommonTestTargetScorePanel.tsx");
check(
  targetScorePanel.includes("latest === undefined"),
  "CommonTestTargetScorePanel should explicitly branch on latest === undefined before showing a score",
);

// ── 仮スコア・開発者向け文言が公開ソースに出ていないか ──────────────────────
const BANNED = ["64/80", "57/75", "70/85", "MVP build"];
const srcDir = path.join(ROOT, "src");
for (const file of listFilesRecursive(srcDir).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"))) {
  const content = fs.readFileSync(file, "utf8");
  for (const banned of BANNED) {
    if (content.includes(banned)) {
      issues.push(`${path.relative(ROOT, file)} contains banned text "${banned}"`);
    }
  }
}

report();

function report() {
  if (issues.length > 0) {
    console.error(`common-test-routing check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log(
      `common-test-routing check passed (9 legacy presets non-public, ${publicMocks.length} public mock(s), no fake scores/MVP text).`,
    );
  }
}
