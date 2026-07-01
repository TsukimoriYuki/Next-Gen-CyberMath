// 問題メタ情報の整合性を検査する。
// npm run qa:metadata
//
// 検査内容:
//  - 公開問題の unit が単元レジストリ (units-meta.ts) に登録されているか（幽霊単元の再発防止）
//  - getProblemContextGuide が「他単元のテンプレート」を誤って返していないか
//    （代表的な回帰ケース：三角関数の問題が二次関数/図形と計量のテンプレートを借りる事故）
//  - D+ / EX / ∞ で「共通テストでの出方」ラベルがそのまま出ていないか
//  - lecture が指すレクチャー slug が実在するか
//  - recoveryLinks の href が実在する単元ページを指しているか
//  - 問題文に生TeX（$の奇数個など）が露出していないか

import { getAllProblems, getUnits } from "../src/lib/content";
import { UNIT_META_BY_NAME } from "../src/data/units-meta";
import { getSpecialLectureBySlug } from "../src/data/specialLectures";
import {
  getExamContextLabel,
  getProblemContextGuide,
  isCommonTestDifficulty,
} from "../src/lib/special-lecture-guidance";
import type { Problem } from "../src/lib/types";

const issues: string[] = [];
const warnings: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function warn(condition: boolean, message: string) {
  if (!condition) warnings.push(message);
}

const problems = getAllProblems();

// ── 単元レジストリとの整合（幽霊単元の再発防止）───────────────────────────
for (const unitName of getUnits()) {
  check(
    Boolean(UNIT_META_BY_NAME[unitName]),
    `unit "${unitName}" is not registered in units-meta.ts (ghost unit — will not appear correctly on /units)`,
  );
}

// ── 既知の回帰ケース：単元名を誤って他単元のテンプレートに寄せない ─────────
const REGRESSION_CASES: { slug: string; forbiddenSubstrings: string[]; note: string }[] = [
  {
    slug: "sine-synthesis-amplitude",
    forbiddenSubstrings: ["軸・端点・境界値", "平方完成", "二次関数"],
    note: "サインカーブの合成 — 二次関数テンプレートへの誤爆",
  },
  {
    slug: "dojo-addition-formula-proof",
    forbiddenSubstrings: ["辺・角・面積から使う公式を選び切る", "余弦定理"],
    note: "正弦加法定理の証明 — 図形と計量テンプレートへの誤爆",
  },
];

const problemsBySlug = new Map(problems.map((p) => [p.slug, p]));
for (const { slug, forbiddenSubstrings, note } of REGRESSION_CASES) {
  const problem = problemsBySlug.get(slug);
  if (!problem) continue; // 問題自体が削除/リネームされていれば別の検査で拾う
  const guide = getProblemContextGuide(problem);
  const haystack = [guide?.masteryFocus, ...(guide?.weapons ?? []), guide?.lecture?.title].join(" ");
  for (const bad of forbiddenSubstrings) {
    check(!haystack.includes(bad), `${note}: "${slug}" still shows unrelated text "${bad}"`);
  }
}

// ── D+ / EX / ∞ で共通テストラベルが出ていないか ──────────────────────────
for (const problem of problems) {
  const label = getExamContextLabel(problem.difficulty);
  if (!isCommonTestDifficulty(problem.difficulty)) {
    check(
      label !== "共通テストでの出方",
      `"${problem.slug}" (difficulty ${problem.difficulty}) still uses the common-test label "${label}"`,
    );
  } else {
    check(
      label === "共通テストでの出方",
      `"${problem.slug}" (difficulty ${problem.difficulty}) should use the common-test label, got "${label}"`,
    );
  }
}

// ── lecture リンク・復習導線が実在するか ──────────────────────────────────
for (const problem of problems) {
  const guide = getProblemContextGuide(problem);
  if (!guide) continue;
  if (guide.lecture) {
    check(
      Boolean(getSpecialLectureBySlug(guide.lecture.lectureSlug)),
      `"${problem.slug}" links to lecture "${guide.lecture.lectureSlug}" which does not exist`,
    );
  }
  warn(
    guide.recoveryLinks.length > 0,
    `"${problem.slug}" has an empty recoveryLinks list (falls back to a generic message)`,
  );
  for (const link of guide.recoveryLinks) {
    check(
      /^\/(units|common-test|abyss|dojo|courses)(\/|$)/.test(link.href),
      `"${problem.slug}" recoveryLink "${link.label}" points to an unexpected path "${link.href}"`,
    );
  }
}

// ── 生TeX露出（$の対応が取れていない）チェック ────────────────────────────
function hasUnbalancedDollar(text: string): boolean {
  // \$ でエスケープされたものは対象外。裸の $ の個数が奇数なら壊れている可能性が高い。
  const bare = text.replace(/\\\$/g, "").match(/\$/g) ?? [];
  return bare.length % 2 !== 0;
}

function collectProblemText(problem: Problem): string {
  return [problem.statement, ...problem.steps.map((s) => s.body)].join("\n");
}

for (const problem of problems) {
  check(
    !hasUnbalancedDollar(collectProblemText(problem)),
    `"${problem.slug}" has an odd number of unescaped "$" — a $...$ math delimiter is likely unbalanced`,
  );
}

report();

function report() {
  if (warnings.length > 0) {
    console.warn(`problem-metadata check: ${warnings.length} warning(s).`);
    for (const w of warnings) console.warn(`- ${w}`);
  }
  if (issues.length > 0) {
    console.error(`problem-metadata check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log(
      `problem-metadata check passed (${problems.length} public problems, ${getUnits().length} units).`,
    );
  }
}
