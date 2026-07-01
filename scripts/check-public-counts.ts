// 問題数・単元数の集計が、表示箇所ごとにズレていないかを検査する。
// npm run qa:counts
//
// 検査内容:
//  - 難度別集計の合計 と 単元別集計の合計 と getAllProblems().length が一致するか
//    （数学トップの難度ピラミッドと、単元一覧の合算がズレる事故の再発防止）
//  - isMockOnly / tier:"ABYSS" の問題が公開集計から漏れていないか
//  - 単元一覧の3グループ（数学IA/IIB/発展）から漏れている単元がないか
//  - 模試（exam-sets）の科目別件数が、実データの件数と一致するか
//  - ハードコードされていそうな問題数リテラルが復活していないか

import {
  getAllProblems,
  getProblemsByDifficulty,
  getUnitSummaries,
} from "../src/lib/content";
import { PROBLEMS } from "../src/data/problems";
import { EXAM_SET_CATEGORIES, getExamSetSubjects } from "../src/data/exam-sets";

const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

const publicProblems = getAllProblems();
const totalPublic = publicProblems.length;

// ── 難度別合計 と 単元別合計 と 総数の三者一致 ────────────────────────────
const byDifficultyTotal = getProblemsByDifficulty().reduce(
  (sum, g) => sum + g.problems.length,
  0,
);
const units = getUnitSummaries();
const byUnitTotal = units.reduce((sum, u) => sum + u.problemCount, 0);

check(
  byDifficultyTotal === totalPublic,
  `difficulty-pyramid total (${byDifficultyTotal}) !== getAllProblems() (${totalPublic})`,
);
check(
  byUnitTotal === totalPublic,
  `unit-list total (${byUnitTotal}) !== getAllProblems() (${totalPublic})`,
);

// ── 単元一覧の3グループ（order<20 / 30<=order<50 / order>=50）から漏れがないか ──
const grouped = units.filter(
  (u) => u.order < 20 || (u.order >= 30 && u.order < 50) || u.order >= 50,
);
check(
  grouped.length === units.length,
  `${units.length - grouped.length} unit(s) fall outside all /units page groups and would be invisible there: ` +
    units
      .filter((u) => !grouped.includes(u))
      .map((u) => u.name)
      .join(", "),
);

// ── 隠蔽対象（isMockOnly / ABYSS）が公開集計に漏れていないか ────────────────
const hiddenInRaw = PROBLEMS.filter((p) => p.isMockOnly || p.tier === "ABYSS");
const leaked = hiddenInRaw.filter((p) => publicProblems.some((pub) => pub.slug === p.slug));
check(
  leaked.length === 0,
  `${leaked.length} hidden problem(s) leaked into the public list: ${leaked.map((p) => p.slug).join(", ")}`,
);

// ── 模試（exam-sets）の科目別件数の整合 ───────────────────────────────────
for (const category of EXAM_SET_CATEGORIES) {
  const subjects = getExamSetSubjects(category.id);
  for (const subject of subjects) {
    const actual = category.examSets.filter((e) => e.subjectId === subject.subjectId).length;
    check(
      actual === subject.count,
      `exam-set category "${category.id}" subject "${subject.subjectId}": displayed count ${subject.count} !== actual ${actual}`,
    );
  }
}

report();

function report() {
  if (issues.length > 0) {
    console.error(`public-counts check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log(
      `public-counts check passed (${totalPublic} public problems across ${units.length} units, all aggregations agree).`,
    );
  }
}
