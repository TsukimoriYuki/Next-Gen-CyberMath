// 問題ページの「この問題を解いた後の復習導線」ブロック（aftercare）に表示される
// メタ情報が、問題タイトル・unit・難度と矛盾していないかを検査する。
// npm run qa:problem-aftercare
//
// 検査内容:
//  - すべての公開問題で coreIdea (masteryFocus) / acquiredSkills (weapons) が
//    汎用フォールバックに落ちていない（＝単元テンプレートが正しく引けている）
//  - D+ / EX / ∞ で「共通テストでの出方」ラベルが出ない（難度別ラベルの整合）
//  - A〜C では逆に「共通テストでの出方」以外のラベルが出ない
//  - weapons が3つ以内、空文字を含まない
//  - masteryFocus が空でない

import { getAllProblems } from "../src/lib/content";
import {
  getExamContextLabel,
  getProblemContextGuide,
  isCommonTestDifficulty,
} from "../src/lib/special-lecture-guidance";

const issues: string[] = [];
const warnings: string[] = [];
function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}
function warn(condition: boolean, message: string) {
  if (!condition) warnings.push(message);
}

const problems = getAllProblems();
const GENERIC_FALLBACK_WEAPONS = ["条件整理", "解法選択"];

for (const problem of problems) {
  const guide = getProblemContextGuide(problem);

  check(
    Boolean(guide && guide.masteryFocus.trim().length > 0),
    `"${problem.slug}" (unit: ${problem.unit}) has no coreIdea/masteryFocus text`,
  );

  if (guide) {
    check(guide.weapons.length > 0 && guide.weapons.length <= 3, `"${problem.slug}" should show 1-3 weapons`);
    check(
      guide.weapons.every((w) => w.trim().length > 0),
      `"${problem.slug}" has an empty weapon entry`,
    );
    warn(
      !guide.weapons.every((w) => GENERIC_FALLBACK_WEAPONS.includes(w)),
      `"${problem.slug}" (unit: ${problem.unit}) falls back to the fully generic weapon list — consider adding a unit template`,
    );
  }

  // 難度別ラベルの整合（A〜C: 共通テスト / D以上: 発展文脈）。
  const label = getExamContextLabel(problem.difficulty);
  if (isCommonTestDifficulty(problem.difficulty)) {
    check(
      label === "共通テストでの出方",
      `"${problem.slug}" (difficulty ${problem.difficulty}) should show label "共通テストでの出方", got "${label}"`,
    );
  } else {
    check(
      label !== "共通テストでの出方",
      `"${problem.slug}" (difficulty ${problem.difficulty}) must NOT show the common-test label "${label}"`,
    );
    const body = guide?.advancedContext ?? "";
    check(
      !body.includes("小問の誘導に沿って"),
      `"${problem.slug}" (difficulty ${problem.difficulty}) shows common-test-flavored boilerplate in its advanced context`,
    );
  }
}

report();

function report() {
  if (warnings.length > 0) {
    console.warn(`problem-aftercare check: ${warnings.length} warning(s).`);
    for (const w of warnings) console.warn(`- ${w}`);
  }
  if (issues.length > 0) {
    console.error(`problem-aftercare check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log(`problem-aftercare check passed (${problems.length} public problems).`);
  }
}
