// 共通テスト関連の「体験」の表示文言とリアルなデータが一致しているかを検査する。
// npm run qa:experience-consistency
//
// 検査内容:
//  - 表示文言（label / publicCta）に含まれる「N分」が durationMinutes と一致する
//  - 「本番模試」と名乗るものは mode: full-mock-pdf かつ公開・監修済み
//  - 「冊子」と名乗るものは full-mock-pdf（PDF冊子ビューアへ向かうべきもの）
//  - 「診断」と名乗るものは diagnosis モード
//  - draft/devOnly/archived が公開一覧 (getPublicCommonTestExperiences) に出ない
//  - かつて実在した表記ゆれ（「10分診断」「所要時間: 約10分」「3問診断」「Web本番演習」）が
//    共通テスト関連ファイルに再度出現していないか

import fs from "node:fs";
import path from "node:path";
import {
  getCommonTestExperiences,
  getPublicCommonTestExperiences,
} from "../src/data/common-test-experiences";

const ROOT = process.cwd();
const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

const experiences = getCommonTestExperiences();

// ── 表示文言の分数と durationMinutes の一致 ───────────────────────────────
const MINUTE_PATTERN = /(\d+)\s*分/;
for (const e of experiences) {
  for (const text of [e.label, e.publicCta]) {
    const match = text.match(MINUTE_PATTERN);
    if (match) {
      const stated = Number(match[1]);
      check(
        stated === e.durationMinutes,
        `"${e.id}": text "${text}" states ${stated}分 but durationMinutes is ${e.durationMinutes}`,
      );
    }
  }
}

// ── 「本番模試」「冊子」「診断」の名乗りとmodeの整合 ────────────────────────
for (const e of experiences) {
  const text = `${e.title} ${e.label}`;
  if (text.includes("本番模試")) {
    check(e.mode === "full-mock-pdf", `"${e.id}" is called 本番模試 but mode is "${e.mode}", expected full-mock-pdf`);
    if (e.mode === "full-mock-pdf") {
      check(e.status === "public" ? e.manualReviewed : true, `"${e.id}" is called 本番模試 and public but manualReviewed is false`);
    }
  }
  if (text.includes("冊子")) {
    check(e.mode === "full-mock-pdf", `"${e.id}" is called 冊子(型) but mode is "${e.mode}", expected full-mock-pdf`);
  }
  if (text.includes("診断")) {
    check(e.mode === "diagnosis", `"${e.id}" is called 診断 but mode is "${e.mode}", expected diagnosis`);
  }
}

// ── 公開一覧に draft/devOnly/archived が出ていないか ───────────────────────
const publicList = getPublicCommonTestExperiences();
check(
  publicList.every((e) => e.status === "public"),
  "getPublicCommonTestExperiences() returned a non-public entry",
);
check(
  publicList.some((e) => e.id === "common-test-math-1a-manual-001" && e.mode === "full-mock-pdf"),
  "manual 001 should be present in the public experience list",
);
check(
  publicList.some((e) => e.id === "common-test-math-1a-manual-002" && e.mode === "full-mock-pdf"),
  "manual 002 should be present in the public experience list",
);
check(
  publicList
    .filter((e) => e.subject === "math-1a" && e.mode === "full-mock-pdf")
    .map((e) => e.id)
    .join(",") === "common-test-math-1a-manual-001,common-test-math-1a-manual-002",
  "math-1a public PDF mock experiences should be ordered as manual 001 then 002",
);
check(
  experiences.some((e) => e.status !== "public"),
  "expected at least one non-public experience (legacy presets) — registry may be missing them",
);

// ── 過去の表記ゆれの再発防止（既知の誤り文言の再出現チェック） ─────────────
const KNOWN_BAD_PHRASES = ["10分診断", "所要時間: 約10分", "3問診断から始める", "Web本番演習"];
function listFilesRecursive(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFilesRecursive(full);
    return [full];
  });
}

const targetDirs = [
  path.join(ROOT, "src/app/common-test"),
  path.join(ROOT, "src/components/common-test"),
];
for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of listFilesRecursive(dir).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"))) {
    const content = fs.readFileSync(file, "utf8");
    for (const phrase of KNOWN_BAD_PHRASES) {
      if (content.includes(phrase)) {
        issues.push(`${path.relative(ROOT, file)} still contains known-inaccurate phrase "${phrase}"`);
      }
    }
  }
}

report();

function report() {
  if (issues.length > 0) {
    console.error(`experience-consistency check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log(
      `experience-consistency check passed (${experiences.length} experiences, ${publicList.length} public).`,
    );
  }
}
