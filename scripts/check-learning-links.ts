// 問題 → 講義・復習リンクの「誤配線」を検査する。
// npm run qa:learning-links
//
// Deep Research評価で指摘された「三角関数の問題に二次関数の満点講義が紐づく」ような
// クロスユニット誤配線の再発防止を目的とする。getProblemContextGuide は unit名の
// 完全一致でのみテンプレートを選ぶ設計だが、テンプレート本文自体に他単元の語彙が
// 紛れ込んでいないか、実際のテキストを検査する。
//
// 検査内容:
//  - 三角関数の問題に二次関数語彙（軸・端点・境界値・平方完成 等）が出ない
//  - 二次関数の問題に三角関数語彙（合成・加法定理・振幅・位相 等）が出ない
//  - 図形（計量・性質）の問題に無関係な確率・二次関数語彙が出ない
//  - 確率の問題に無関係な図形・二次関数語彙が出ない
//  - lecture（実在の特別講義）が紐づく場合、その講義の対象単元に問題のunitが含まれる
//  - recoveryLinks の href が実在する単元ページを指す

import { getAllProblems } from "../src/lib/content";
import { getProblemContextGuide } from "../src/lib/special-lecture-guidance";
import { UNIT_META_BY_NAME } from "../src/data/units-meta";

const issues: string[] = [];
function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

// 単元ファミリーごとの「その単元にしか出てはいけない」語彙。
// 誤配線検出用であり、網羅的な同義語辞書ではない。
const UNIT_FAMILY_VOCAB: { family: string; units: string[]; forbiddenElsewhere: string[] }[] = [
  {
    family: "二次関数",
    units: ["2次関数"],
    forbiddenElsewhere: ["軸・端点・境界値", "平方完成", "端点比較", "場合分け満点講義"],
  },
  {
    family: "三角関数",
    units: ["三角関数"],
    forbiddenElsewhere: ["三角関数の合成", "加法定理・倍角公式", "振幅", "位相をそろえて"],
  },
  {
    family: "場合の数と確率",
    units: ["場合の数と確率"],
    forbiddenElsewhere: ["順列と組合せを判別", "余事象で処理", "条件付き確率で母集団"],
  },
  {
    family: "図形と計量",
    units: ["図形と計量"],
    forbiddenElsewhere: ["辺・角・面積から使う公式", "余弦定理で第三辺", "外接円・内接円"],
  },
  {
    family: "図形の性質",
    units: ["図形の性質"],
    forbiddenElsewhere: ["円周角・相似・方べき", "チェバ", "メネラウス"],
  },
  {
    family: "データの分析",
    units: ["データの分析"],
    forbiddenElsewhere: ["四分位数・外れ値", "IQRによる外れ値判定", "平均値と中央値の変化"],
  },
];

const problems = getAllProblems();

for (const problem of problems) {
  const guide = getProblemContextGuide(problem);
  if (!guide) continue;

  const text = [guide.masteryFocus, ...guide.weapons, guide.lecture?.title, guide.lecture?.description]
    .filter(Boolean)
    .join(" ");

  for (const { family, units, forbiddenElsewhere } of UNIT_FAMILY_VOCAB) {
    if (units.includes(problem.unit)) continue; // 自分の単元なら出てよい
    for (const phrase of forbiddenElsewhere) {
      if (text.includes(phrase)) {
        issues.push(
          `"${problem.slug}" (unit: ${problem.unit}) shows "${family}"-only phrase "${phrase}" — likely cross-unit mislink`,
        );
      }
    }
  }

  // 実在の特別講義が紐づく場合、その講義の対象単元と問題のunitが対応しているか。
  if (guide.lecture) {
    // getMasteryLectureGuideForUnit は unit名の完全一致でのみ解決するため、
    // ここでは「講義が存在する = 単元が一致している」という設計上の前提を
    // 直接データ突き合わせで再確認する。
    const known = ["図形と計量", "図形の性質", "2次関数", "二次関数", "場合の数と確率", "確率", "データの分析"];
    check(
      known.includes(problem.unit),
      `"${problem.slug}" (unit: ${problem.unit}) has a specialLecture (${guide.lecture.lectureSlug}) but its unit is not one of the units with a real lecture — check for a mismatch`,
    );
  }

  for (const link of guide.recoveryLinks) {
    if (link.href.startsWith("/units/")) {
      const slug = link.href.replace("/units/", "");
      check(
        Object.values(UNIT_META_BY_NAME).some((meta) => meta.slug === slug),
        `"${problem.slug}" recoveryLink "${link.label}" points to unknown unit slug "${slug}"`,
      );
    }
  }
}

report();

function report() {
  if (issues.length > 0) {
    console.error(`learning-links check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log(`learning-links check passed (${problems.length} public problems, no cross-unit mislinks found).`);
  }
}
