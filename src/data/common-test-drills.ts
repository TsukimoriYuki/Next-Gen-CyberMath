// ── 共通テスト型ドリル問題データ ──────────────────────────────────────────
// COMMON TEST COMMAND CENTER — Phase 2
// オリジナル問題のみ。公式過去問の転載なし。

import type { CommonTestSubjectId } from "@/data/common-test";
export type { CommonTestSubjectId };

export type CommonTestQuestionType =
  | "single-choice"
  | "multiple-choice"
  | "blank-number"
  | "mark-combination"
  | "information-match";

export type CommonTestSkillTag =
  | "誘導読解"
  | "条件整理"
  | "計算処理"
  | "データ読み取り"
  | "図表読解"
  | "情報照合"
  | "時間配分"
  | "選択肢消去"
  | "会話文"
  | "数式変形"
  | "英語スキャニング"
  | "要旨把握"
  | "時系列整理"
  | "レポート完成";

export interface CommonTestDrillQuestion {
  id: string;
  subjectId: CommonTestSubjectId;
  sectionId: string;
  title: string;
  passage?: string;
  context?: string;
  statement: string;
  type: CommonTestQuestionType;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  strategy: string;
  trapExplanation?: string;
  estimatedMinutes: number;
  difficulty: "BASIC" | "STANDARD" | "HARD";
  skillTags: CommonTestSkillTag[];
}

// ═══════════════════════════════════════════════════════════════════════════
// 問題データ
// ═══════════════════════════════════════════════════════════════════════════

export const COMMON_TEST_DRILL_QUESTIONS: CommonTestDrillQuestion[] = [

  // ─────────────────────────────────────────────────────────────────────────
  // 数学IA
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ct-m1a-s1-q1",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "集合と命題 — 補集合の要素の個数",
    statement:
      "全体集合 $U = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}$ において、$A = \\{n \\in U \\mid n \\text{ は 2 の倍数}\\}$、$B = \\{n \\in U \\mid n \\text{ は 3 の倍数}\\}$ とする。$\\overline{A \\cap B}$ の要素の個数を求めよ。",
    type: "single-choice",
    options: ["7", "8", "9", "10"],
    correctAnswer: "9",
    explanation:
      "$A = \\{2, 4, 6, 8, 10\\}$（2の倍数）、$B = \\{3, 6, 9\\}$（3の倍数）。よって $A \\cap B = \\{6\\}$（2かつ3の倍数、すなわち6の倍数）。$\\overline{A \\cap B}$ は全体集合から $A \\cap B$ を除いた集合なので、$n(\\overline{A \\cap B}) = 10 - 1 = 9$。",
    strategy:
      "まず $A \\cap B$ を具体的に列挙する（30秒以内）。ド・モルガンの法則を使っても解けるが、この問題は直接列挙が最速。補集合の個数 = 全体 − 元の集合の個数 を確認。目安は2分以内。",
    trapExplanation:
      "$A \\cup B$ と $A \\cap B$ を混同しやすい。$\\cap$（共通部分）を $\\cup$（和集合）と読み間違えると全く別の答えになる。問題文の記号を必ず確認すること。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "選択肢消去"],
  },

  {
    id: "ct-m1a-s1-q2",
    subjectId: "math-1a",
    sectionId: "section-1",
    title: "図形と計量 — 弦の長さ",
    statement:
      "半径 5 の円において、円の中心 $O$ から弦 $PQ$ への距離が 3 であるとき、弦 $PQ$ の長さを求めよ。",
    type: "single-choice",
    options: ["6", "7", "8", "10"],
    correctAnswer: "8",
    explanation:
      "円の中心 $O$ から弦 $PQ$ への垂線の足を $M$ とすると、$OM = 3$、$OP = 5$（半径）。直角三角形 $OMP$ において、$PM = \\sqrt{OP^2 - OM^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4$。よって $PQ = 2PM = 8$。",
    strategy:
      "「中心から弦への距離 → 弦の半分の長さ → ピタゴラスの定理」という流れを自動化する。図を描かずに公式 $PM = \\sqrt{r^2 - d^2}$ で処理できると速い。1分30秒以内が目標。",
    trapExplanation:
      "$PM$ を求めて答えとしてしまう誤答（$PM = 4$）が最も多い。$PQ = 2PM$ という最後の2倍を忘れないこと。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },

  {
    id: "ct-m1a-s2-q1",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "データの分析 — 分散の計算",
    statement:
      "5 人の小テストの点数が 4, 8, 10, 6, 12 であるとき、この得点の分散を求めよ。",
    type: "single-choice",
    options: ["6.4", "7.0", "8.0", "9.6"],
    correctAnswer: "8.0",
    explanation:
      "平均 $\\bar{x} = (4+8+10+6+12)/5 = 40/5 = 8$。偏差の2乗の合計：$(4-8)^2 + (8-8)^2 + (10-8)^2 + (6-8)^2 + (12-8)^2 = 16+0+4+4+16 = 40$。分散 $= 40/5 = 8$。",
    strategy:
      "手順を固定する：①平均を計算 ②各データから平均を引く ③2乗して合計 ④データ数で割る。計算は整数が多いので丁寧に。2分以内が目標。暗算で偏差の2乗を処理できれば時間短縮できる。",
    trapExplanation:
      "標準偏差（$\\sqrt{分散}$）と分散を混同しないこと。また「偏差」（平均との差）を2乗せずに合計する誤り（$= 0$になる）にも注意。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["計算処理", "データ読み取り"],
  },

  {
    id: "ct-m1a-s2-q2",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "2次関数 — 最小値の場合分け",
    statement:
      "$f(x) = x^2 - 4x + 5$ の $0 \\leq x \\leq a$（$a > 0$）における最小値を求めよ。ただし $a = 3$ の場合を答えよ。",
    type: "single-choice",
    options: ["1", "2", "4", "5"],
    correctAnswer: "1",
    explanation:
      "$f(x) = (x-2)^2 + 1$。頂点は $(2, 1)$。$a = 3$ のとき定義域 $0 \\leq x \\leq 3$ に頂点 $x = 2$ が含まれるので、最小値は頂点の値 $f(2) = 1$。",
    strategy:
      "まず平方完成して頂点を確認（必須）。次に頂点が定義域に含まれるかを即座に判断。共通テストでは $a$ が変わるたびに場合分けが問われるが、今は $a=3$ の具体値なので判断は1ステップ。頂点確認 → 含まれる/含まれない → 最小値の場所を決定、で2分。",
    trapExplanation:
      "区間の右端 $f(3) = 9 - 12 + 5 = 2$ を最小値と間違える。定義域に頂点が入っているかを必ず確認すること。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "条件整理"],
  },

  {
    id: "ct-m1a-s3-q1",
    subjectId: "math-1a",
    sectionId: "section-3",
    title: "図形の性質 — メネラウスの定理",
    statement:
      "三角形 $ABC$ において、辺 $BC$ 上に点 $D$、辺 $CA$ の延長上に点 $E$ があり、$BD:DC = 1:2$、$CE:EA = 1:3$ とする。直線 $DE$ と辺 $AB$ の延長との交点を $F$ とするとき、$BF:FA$ を求めよ。",
    type: "single-choice",
    options: ["1:2", "2:3", "3:4", "1:6"],
    correctAnswer: "1:6",
    explanation:
      "メネラウスの定理を三角形 $ABC$ と直線 $DEF$ に適用する。$\\dfrac{BD}{DC} \\cdot \\dfrac{CE}{EA} \\cdot \\dfrac{AF}{FB} = 1$（各比は「通過する辺の比」）。$\\dfrac{1}{2} \\cdot \\dfrac{1}{3} \\cdot \\dfrac{AF}{FB} = 1$ より $\\dfrac{AF}{FB} = 6$、すなわち $BF:FA = 1:6$。",
    strategy:
      "メネラウスは「3辺の比の積 = 1」。まず図を描いて直線が三角形の3辺（または延長）をどの順で横切るかを確認。記号の向き（内分・外分）に気をつけて定理を適用。3分以内に完答できるよう練習する。",
    trapExplanation:
      "チェバの定理（三角形の3頂点から対辺への線が1点で交わる）と混同する。メネラウスは「横切る直線」に適用し、チェバは「内部の点」に適用する。問題文で確認すること。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["誘導読解", "数式変形"],
  },

  {
    id: "ct-m1a-s4-q1",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "条件付き確率",
    statement:
      "袋の中に赤玉 3 個、白玉 2 個が入っている。1 個取り出して色を確認してから戻さずにもう 1 個取り出す。1 回目が赤玉であったとき、2 回目も赤玉である確率を求めよ。",
    type: "single-choice",
    options: [
      "$\\frac{1}{2}$",
      "$\\frac{2}{5}$",
      "$\\frac{3}{5}$",
      "$\\frac{3}{10}$",
    ],
    correctAnswer: "$\\frac{1}{2}$",
    explanation:
      "1回目が赤玉の場合、残りは「赤2個・白2個」の合計4個。その中から赤玉を引く確率は $\\dfrac{2}{4} = \\dfrac{1}{2}$。条件付き確率の公式 $P(B|A) = \\dfrac{P(A \\cap B)}{P(A)}$ でも確認できる：$P(A) = \\dfrac{3}{5}$、$P(A \\cap B) = \\dfrac{3}{5} \\cdot \\dfrac{2}{4} = \\dfrac{3}{10}$、$P(B|A) = \\dfrac{3/10}{3/5} = \\dfrac{1}{2}$。",
    strategy:
      "1回目が起きた「後の状態」を正確に把握する。「1回目が赤 → 残り赤2個・白2個・計4個」を図示すると判断が速い。2分以内が目安。条件付き確率の公式より、状態を直接数える方が速い。",
    trapExplanation:
      "「戻さない」抽出なのに「戻す」前提で計算する（$\\frac{3}{5}$ を答えとする）誤りが最多。問題文の「戻さず」を見落とさないこと。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["条件整理", "計算処理"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 数学II・B・C
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ct-m2bc-s1-q1",
    subjectId: "math-2bc",
    sectionId: "section-1",
    title: "三角関数 — sin+cos から sincos を求める",
    statement:
      "$\\sin\\theta + \\cos\\theta = \\dfrac{\\sqrt{6}}{2}$ であるとき、$\\sin\\theta\\cos\\theta$ の値を求めよ。",
    type: "single-choice",
    options: [
      "$\\frac{1}{8}$",
      "$\\frac{1}{4}$",
      "$\\frac{\\sqrt{6}}{4}$",
      "$\\frac{1}{2}$",
    ],
    correctAnswer: "$\\frac{1}{4}$",
    explanation:
      "$(\\sin\\theta + \\cos\\theta)^2 = \\sin^2\\theta + 2\\sin\\theta\\cos\\theta + \\cos^2\\theta = 1 + 2\\sin\\theta\\cos\\theta$。左辺 $= \\left(\\dfrac{\\sqrt{6}}{2}\\right)^2 = \\dfrac{6}{4} = \\dfrac{3}{2}$。よって $1 + 2\\sin\\theta\\cos\\theta = \\dfrac{3}{2}$、$\\sin\\theta\\cos\\theta = \\dfrac{1}{4}$。",
    strategy:
      "「和 → 2乗 → $\\sin^2+\\cos^2=1$ 利用 → 積を求める」は三角関数の典型変形。両辺を2乗することを反射的に判断できるよう訓練する。計算は2分以内。$\\sqrt{6}$ の2乗 $= 6$ を素早く処理すること。",
    trapExplanation:
      "$(\\sqrt{6}/2)^2 = 6/4 = 3/2$ の計算を $6/2 = 3$ と誤る（分母を2乗し忘れる）ケースが頻出。分数の2乗は分子・分母それぞれ2乗すること。",
    estimatedMinutes: 3,
    difficulty: "STANDARD",
    skillTags: ["数式変形", "計算処理"],
  },

  {
    id: "ct-m2bc-s2-q1",
    subjectId: "math-2bc",
    sectionId: "section-2",
    title: "積分 — 定積分の計算",
    statement:
      "$\\displaystyle\\int_0^2 (3x^2 - 2x + 1)\\,dx$ の値を求めよ。",
    type: "single-choice",
    options: ["4", "5", "6", "8"],
    correctAnswer: "6",
    explanation:
      "$\\displaystyle\\int_0^2 (3x^2 - 2x + 1)\\,dx = \\Big[x^3 - x^2 + x\\Big]_0^2 = (8 - 4 + 2) - (0 - 0 + 0) = 6$。",
    strategy:
      "不定積分 → 上端代入 → 下端代入 → 引き算、の3ステップを素早く処理。計算は1分30秒以内が目安。$x=2$ の代入で $8, 4, 2$ を混乱しないよう、各項を別々に計算して合計する。",
    trapExplanation:
      "係数 3 を $x^3$ に残したまま（$3x^3/3$ を $x^3$ にしない）計算する誤り。不定積分で各項の係数を忘れずに割ること。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "数式変形"],
  },

  {
    id: "ct-m2bc-s3-q1",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "数列 — 漸化式の計算",
    statement:
      "数列 $\\{a_n\\}$ が $a_1 = 2$、$a_{n+1} = 3a_n - 2$ で定義されるとき、$a_3$ の値を求めよ。",
    type: "single-choice",
    options: ["10", "16", "22", "28"],
    correctAnswer: "10",
    explanation:
      "$a_2 = 3 \\cdot 2 - 2 = 4$。$a_3 = 3 \\cdot 4 - 2 = 10$。一般項を求めるなら：$a_{n+1} - 1 = 3(a_n - 1)$ と変形して公比 3 の等比数列に帰着。$b_n = a_n - 1$ とおくと $b_1 = 1$、$b_n = 3^{n-1}$、$a_n = 3^{n-1} + 1$。$a_3 = 9 + 1 = 10$。",
    strategy:
      "具体的な値を問われているときは一般項を出さず「1個ずつ代入」が最速。$a_1 \\to a_2 \\to a_3$ と2回計算するだけ。共通テストでは一般項の問いと具体値の問いが混在するので、求めるものを見極めてから手を動かす。",
    trapExplanation:
      "$a_3 = 3a_1 - 2 = 4$ と $n=1$ をそのまま $a_3$ の式に代入する誤り。$a_{n+1}$ は「直前の $a_n$」を使うので、$a_2$ を経由してから $a_3$ を求めること。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["誘導読解", "計算処理"],
  },

  {
    id: "ct-m2bc-s4-q1",
    subjectId: "math-2bc",
    sectionId: "section-4",
    title: "統計的推測 — 二項分布の標準偏差",
    statement:
      "コインを 100 回投げるとき、表が出る回数 $X$ は二項分布 $B(100,\\ 0.5)$ に従う。$X$ の標準偏差 $\\sigma(X)$ を求めよ。",
    type: "single-choice",
    options: ["2.5", "5", "10", "25"],
    correctAnswer: "5",
    explanation:
      "二項分布 $B(n, p)$ の分散は $np(1-p)$。$n=100, p=0.5$ のとき、分散 $= 100 \\times 0.5 \\times 0.5 = 25$。標準偏差 $= \\sqrt{25} = 5$。",
    strategy:
      "公式 $\\sigma = \\sqrt{np(1-p)}$ を暗記して即座に代入。$\\sqrt{25} = 5$ の計算は瞬時に。1分30秒以内が目標。統計の問題は公式を当てはめるだけのことが多いので、公式の正確な記憶が高得点の鍵。",
    trapExplanation:
      "分散 $(=25)$ を標準偏差と答えてしまう誤りが多い。「標準偏差 = $\\sqrt{分散}$」を確認すること。また $np$ のみ（期待値）を答えにしないよう注意。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["計算処理", "データ読み取り"],
  },

  {
    id: "ct-m2bc-s5-q1",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "ベクトル — 空間ベクトルの内積",
    statement:
      "$\\vec{a} = (2, -1, 2)$、$\\vec{b} = (1, 3, -1)$ のとき、内積 $\\vec{a} \\cdot \\vec{b}$ を求めよ。",
    type: "single-choice",
    options: ["-3", "-1", "1", "3"],
    correctAnswer: "-3",
    explanation:
      "$\\vec{a} \\cdot \\vec{b} = 2 \\cdot 1 + (-1) \\cdot 3 + 2 \\cdot (-1) = 2 - 3 - 2 = -3$。",
    strategy:
      "内積は「対応する成分を掛けて足す」のみ。符号ミスが命取りなので、各積を個別に書き出してから合計する。1分以内が目標。マイナスが多い問題は特に慎重に。",
    trapExplanation:
      "$2 \\times 1 = 2$、$(-1) \\times 3 = -3$、$2 \\times (-1) = -2$ の計算で、負号を付け忘れて $2 + 3 + 2 = 7$ などとする誤りが典型。符号付きの掛け算を丁寧に。",
    estimatedMinutes: 1,
    difficulty: "BASIC",
    skillTags: ["計算処理"],
  },

  {
    id: "ct-m2bc-s6-q1",
    subjectId: "math-2bc",
    sectionId: "section-6",
    title: "複素数平面 — 複素数のべき乗",
    statement:
      "$z = 1 + i$ のとき、$z^4$ を求めよ。（$i$ は虚数単位）",
    type: "single-choice",
    options: ["-4", "-4i", "4", "4i"],
    correctAnswer: "-4",
    explanation:
      "$z^2 = (1+i)^2 = 1 + 2i + i^2 = 1 + 2i - 1 = 2i$。$z^4 = (z^2)^2 = (2i)^2 = 4i^2 = 4 \\cdot (-1) = -4$。極形式では $|z| = \\sqrt{2}$、$\\arg z = \\pi/4$ なので $z^4 = (\\sqrt{2})^4 \\left(\\cos\\pi + i\\sin\\pi\\right) = 4(-1) = -4$。",
    strategy:
      "まず $z^2$ を計算してから $z^4 = (z^2)^2$ と進む。$i^2 = -1$ の使いどころを逃さない。極形式（ド・モアブル）を使うとより汎用的だが、小さい $n$ では直接計算が速い。2分以内。",
    trapExplanation:
      "$(1+i)^4$ を展開するとき、$(1+i)^2 = 2 + 2i$ と計算する誤り（$i^2 = -1$ を忘れて $i^2 = 1$ と扱う）が頻出。$i^2 = -1$ を必ず意識すること。",
    estimatedMinutes: 2,
    difficulty: "BASIC",
    skillTags: ["数式変形", "計算処理"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 英語リーディング
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ct-eng-s1-q1",
    subjectId: "english-reading",
    sectionId: "section-1",
    title: "案内文読解 — 参加条件の特定",
    passage: `Community Library — Winter Reading Event

Date: December 14–28
Location: Main Hall, Floor 2
Open to: All library card holders (ages 10 and above)

Participants who read three or more books during the event period will receive a certificate of achievement. Registration forms are available at the front desk from December 1. Please bring your library card and a completed form when you arrive.

Note: Participants under age 16 must be accompanied by an adult guardian during the event.`,
    statement:
      "According to the notice, which of the following people can attend the event WITHOUT a guardian?",
    type: "single-choice",
    options: [
      "A 12-year-old who has a library card",
      "A 15-year-old with a completed registration form",
      "A 17-year-old who has a library card",
      "A 9-year-old who comes with a parent",
    ],
    correctAnswer: "A 17-year-old who has a library card",
    explanation:
      "The notice states that participants under age 16 must be accompanied by a guardian. A 17-year-old is 16 or above, so they do not need a guardian. A 12-year-old (option 1) and a 15-year-old (option 2) are under 16 and need guardians. A 9-year-old (option 4) is under the minimum age of 10 and cannot participate at all.",
    strategy:
      "案内文問題は「誰が / 何ができる / 何が必要か」の条件を素早く拾う。まず選択肢を読んで「何を探すか」を確認し（約10秒）、それから本文をスキャン。全文精読は不要。16歳未満→保護者必要、という1行を見つければ即答できる。目安は2分以内。",
    trapExplanation:
      "「ages 10 and above」という最低年齢制限を見落として、9歳の選択肢4を「保護者がいれば大丈夫」と判断してしまう誤りが多い。制限条件（年齢・カード保有）は複数あることに注意。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["英語スキャニング", "条件整理", "情報照合"],
  },

  {
    id: "ct-eng-s2-q1",
    subjectId: "english-reading",
    sectionId: "section-2",
    title: "投稿比較 — 両面を論じている投稿者を特定",
    passage: `[Post by YumiK — March 5]
I have been studying online for six months now. I love the flexibility — I can study at any time. But I really miss asking questions face-to-face. Sometimes I feel quite isolated.

[Post by TakeshiR — March 7]
Online learning is incredible! No commute, no wasted travel time. My grades have actually improved since I switched. I honestly think it is better than sitting in a classroom.

[Post by MaiN — March 9]
I tried online learning last semester. Honestly, it did not suit me. I found it difficult to focus at home, and I fell behind on deadlines. I am returning to in-person classes next term.`,
    statement:
      "Which poster mentions BOTH an advantage AND a disadvantage of online learning?",
    type: "single-choice",
    options: ["YumiK only", "TakeshiR only", "MaiN only", "All three posters"],
    correctAnswer: "YumiK only",
    explanation:
      "YumiK mentions a clear advantage (flexibility) AND disadvantages (missing face-to-face, feeling isolated). TakeshiR mentions only advantages (no commute, better grades). MaiN mentions only disadvantages (hard to focus, fell behind). Therefore, only YumiK presents both sides.",
    strategy:
      "選択肢を先に確認して「誰が両面を述べているか」を探すと決める（5秒）。各投稿を読みながらポジティブ・ネガティブをマーク。YumiKの第1文（優点）と第2文（欠点）を見つけたら即解答できる。全文精読不要。目安3分。",
    trapExplanation:
      "\"I really miss asking questions face-to-face\" が欠点の表現だと見落として、YumiKが優点のみを述べていると誤解するケースがある。\"miss\" + \"isolated\" はネガティブ表現。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "英語スキャニング", "選択肢消去"],
  },

  {
    id: "ct-eng-s3-q1",
    subjectId: "english-reading",
    sectionId: "section-3",
    title: "説明文読解 — 筆者の目的",
    passage: `Urban Farming: Growing Food in the City

Urban farming — growing food within city environments — is gaining popularity worldwide. Rooftop gardens, vertical farms, and community plots are now found in cities from Tokyo to Toronto. Supporters argue that urban farming reduces transportation costs, improves local air quality, and reconnects residents with their food sources. Critics, however, point out that urban land is expensive and that food production volumes remain too small to meet city needs. Despite these concerns, many city governments are funding urban farming programs as part of broader environmental sustainability initiatives.`,
    statement:
      "What is the main purpose of this article?",
    type: "single-choice",
    options: [
      "To argue that urban farming can solve global food shortages",
      "To present both the benefits and the limitations of urban farming",
      "To explain why urban farming is replacing traditional agriculture",
      "To criticize city governments for investing in urban farming",
    ],
    correctAnswer:
      "To present both the benefits and the limitations of urban farming",
    explanation:
      "The article does not take a one-sided position. It presents supporters' views (cost reduction, air quality, reconnection with food) and critics' views (expensive land, small volume). The phrase 'Despite these concerns' shows balance. Option 2 correctly reflects this balanced, informative purpose.",
    strategy:
      "「目的」問題は本文全体の構造を把握する。最初の文と最後の文（トピックセンテンスとまとめ）を読めば方向性がわかる。本文に \"Supporters argue...Critics, however...\" という対比構造があれば「両面提示型」の記事と判断できる。3分以内が目安。",
    trapExplanation:
      "「都市農業を支持している」ように読んでしまい、選択肢1（食料危機の解決）を選ぶ誤りが多い。最後の文は「都市政府が投資している」事実を述べているが、それは「解決策である」とは言っていない。誇張した選択肢に注意。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去", "英語スキャニング"],
  },

  {
    id: "ct-eng-s4-q1",
    subjectId: "english-reading",
    sectionId: "section-4",
    title: "表読み取り — 最大の伸びを示した生徒",
    context: `Test Score Summary

| Name   | Test 1 | Test 2 | Test 3 |
|--------|--------|--------|--------|
| Alex   |   62   |   70   |   75   |
| Bianca |   80   |   83   |   82   |
| Carlos |   55   |   64   |   71   |
| Diana  |   90   |   89   |   91   |`,
    statement:
      "Which student showed the greatest improvement from Test 1 to Test 3?",
    type: "single-choice",
    options: ["Alex", "Bianca", "Carlos", "Diana"],
    correctAnswer: "Carlos",
    explanation:
      "The improvements from Test 1 to Test 3 are: Alex: 75 − 62 = 13, Bianca: 82 − 80 = 2, Carlos: 71 − 55 = 16, Diana: 91 − 90 = 1. Carlos has the largest improvement of 16 points.",
    strategy:
      "「最大の伸び = Test3 − Test1」を4人分計算するだけ。引き算なので暗算で十分。選択肢の順に計算して最大値を探す（約1分）。「Test2」はこの問いに関係ないので読み飛ばす。表問題は「何を計算すれば答えが出るか」を先に決めてから表を見ること。",
    trapExplanation:
      "「最大スコア」（Diana, 91点）と「最大の伸び」を混同して Diana を選ぶ誤りが最多。問いは「伸び」（差分）であることを必ず確認。また Test 2 から Test 3 だけを見て Alex (75 − 70 = 5) と Carlos (71 − 64 = 7) を比較する部分最適の誤りにも注意。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["図表読解", "データ読み取り", "時間配分"],
  },

  {
    id: "ct-eng-s5-q1",
    subjectId: "english-reading",
    sectionId: "section-5",
    title: "情報照合 — 複数条件を満たすイベント",
    passage: `Event Listings — November

Event A — Photography Workshop
Date: Saturday, November 15 / Fee: ¥2,000
Age restriction: 18 and above / Duration: 3 hours
Location: Community Center

Event B — Drawing for Beginners
Date: Sunday, November 16 / Fee: Free
Age restriction: None / Duration: 2 hours
Location: Art Gallery

Event C — Digital Art Introduction
Date: Saturday, November 15 / Fee: ¥1,500
Age restriction: 16 and above / Duration: 4 hours
Location: Tech Hub

Event D — Watercolor Basics
Date: Sunday, November 16 / Fee: ¥1,200
Age restriction: 14 and above / Duration: 3 hours
Location: Community Center`,
    statement:
      "Hiro is 17 years old and has ¥1,500 to spend. He is available only on Saturdays. Which event can Hiro attend?",
    type: "single-choice",
    options: ["Event A only", "Event C only", "Events A and C", "Events B and D"],
    correctAnswer: "Event C only",
    explanation:
      "Conditions: Saturday only, age 17, budget ¥1,500. Event A: Saturday ✓, but ¥2,000 (over budget) ✗, and age 18+ (Hiro is 17) ✗ → NO. Event B: Sunday ✗ → NO. Event C: Saturday ✓, ¥1,500 (within budget) ✓, age 16+ (17 ≥ 16) ✓ → YES. Event D: Sunday ✗ → NO. Only Event C satisfies all three conditions.",
    strategy:
      "条件を先にリストする（曜日・年齢・予算の3つ）。各イベントを表のように照合する。1条件でも×なら即除外。「Event Aは土曜だが予算超過 → 除外」のように、最も絞れる条件（土曜限定）から先に処理すると速い。3分以内が目安。",
    trapExplanation:
      "Event Aに絞って「年齢制限は18+だが...」と迷う間に Event C を見落とす。また ¥1,500 のイベントを「¥1,500 以内」と解釈して Event A（¥2,000）を除外できない誤りも。予算は「以内」か「ぴったり」かを確認すること。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["情報照合", "条件整理", "英語スキャニング"],
  },

  {
    id: "ct-eng-s6-q1",
    subjectId: "english-reading",
    sectionId: "section-6",
    title: "物語読解 — 登場人物の心情",
    passage: `Mia had spent weeks preparing for the school science fair. The night before, she rehearsed her presentation forty times and double-checked every diagram. But when she walked into the gymnasium the next morning and saw the long rows of polished displays from older students, her confidence wavered. She kept telling herself she had done her best. When the judges finally reached her table, her heart raced so fast she could barely speak.`,
    statement:
      "Why did Mia feel nervous when the judges approached her table?",
    type: "single-choice",
    options: [
      "She had not prepared enough for the presentation",
      "Her diagrams contained several errors",
      "Despite thorough preparation, facing the actual judges felt overwhelming",
      "She had forgotten to bring her materials to the gymnasium",
    ],
    correctAnswer:
      "Despite thorough preparation, facing the actual judges felt overwhelming",
    explanation:
      "The passage clearly states Mia prepared intensively ('rehearsed forty times', 'double-checked every diagram'). Her nervousness came not from lack of preparation, but from seeing the polished displays of older students ('her confidence wavered') and the pressure of the actual moment. Option 3 correctly captures this contrast between preparation and real-world anxiety.",
    strategy:
      "「なぜ緊張したか」の問いは、本文で緊張の直接の原因として述べられている箇所を探す。「準備不足で緊張した」という選択肢1は本文と矛盾（本文は十分な準備を述べている）。本文の対比構造（準備充分 → でも実際は緊張）を把握できれば即答。3分以内。",
    trapExplanation:
      "\"forty times\" \"double-checked\" といった準備の徹底ぶりの記述を「逆に自信があった」と誤読するケース。これらは準備は充分だったが「それでも緊張した」という対比を強調している。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "英語スキャニング"],
  },

  {
    id: "ct-eng-s7-q1",
    subjectId: "english-reading",
    sectionId: "section-7",
    title: "論説文 — 筆者の主張",
    passage: `Social media platforms often claim to connect people, but recent studies suggest they may increase loneliness among young users. When teenagers spend hours scrolling through curated images of seemingly perfect lives, they tend to compare themselves unfavorably, which can lead to feelings of inadequacy and isolation. Rather than fostering genuine relationships, excessive social media use may replace meaningful conversation with shallow, passive observation. For this reason, limiting screen time for minors is not merely reasonable — it is essential for their emotional well-being.`,
    statement:
      "What is the author's main argument?",
    type: "single-choice",
    options: [
      "Social media companies should face legal consequences for teen mental health issues",
      "Excessive social media use harms the emotional well-being of young people",
      "Teenagers should be completely banned from all social media platforms",
      "The research on social media effects is still inconclusive",
    ],
    correctAnswer:
      "Excessive social media use harms the emotional well-being of young people",
    explanation:
      "The author argues that excessive social media use leads to loneliness, inadequacy, and isolation, and concludes that limiting screen time is 'essential for emotional well-being'. This matches option 2. Option 1 (legal consequences) is not mentioned. Option 3 (complete ban) is too extreme — the author says 'limiting', not 'banning'. Option 4 is the opposite of the author's stance.",
    strategy:
      "論説文の「主張」は最終文付近またはトピックセンテンスに集中している。最後の文 \"limiting screen time... is essential\" が筆者の結論。選択肢はこの結論と比較する。極端な表現（ban, illegal）は「誇張選択肢」として消去候補。3分以内が目安。",
    trapExplanation:
      "\"limiting screen time\" を \"banning social media\" と読み替えて選択肢3を選ぶ誤りが多い。「制限（limit）」と「禁止（ban）」は別物。選択肢の過剰な言い換えに注意。",
    estimatedMinutes: 4,
    difficulty: "STANDARD",
    skillTags: ["要旨把握", "選択肢消去", "英語スキャニング"],
  },

  {
    id: "ct-eng-s8-q1",
    subjectId: "english-reading",
    sectionId: "section-8",
    title: "レポート完成 — 複数資料からの情報統合",
    passage: `[Source 1 — Travel Guide Excerpt]
The Greenfield Nature Reserve covers 3,500 hectares and is home to over 200 species of birds. The reserve offers guided hiking tours on weekends and self-guided trails that are open daily from sunrise to sunset.

[Source 2 — Community Blog Post]
I visited Greenfield last weekend with my family. The guided tour was very informative and the guide was extremely knowledgeable. However, the trail near the wetlands was quite muddy after the recent rain. We still managed to spot about 15 different bird species during our two-hour walk.`,
    context: `Field Study Notes — Greenfield Nature Reserve

Total area: [A]
Total bird species: over 200
Guided tours available: weekends only
Self-guided trails: open daily (sunrise to sunset)

Recent visitor observations:
- Guided tour quality: informative, knowledgeable guide
- Trail condition near wetlands: [B]
- Bird species spotted: approximately 15`,
    statement:
      "According to the sources, what should fill blank [A] in the field study notes?",
    type: "single-choice",
    options: ["200 hectares", "2,500 hectares", "3,500 hectares", "35,000 hectares"],
    correctAnswer: "3,500 hectares",
    explanation:
      "Source 1 directly states 'The Greenfield Nature Reserve covers 3,500 hectares'. Blank [A] asks for the total area. The answer is 3,500 hectares (option 3). The number 200 refers to bird species, not area.",
    strategy:
      "ノート完成形式は「空欄に対応する情報を資料のどこから取るか」を確認してから本文を読む。[A]は「Total area」なので Source 1 の面積情報を探す（10秒でスキャン）。数値が複数登場するので混同しないよう、「面積 = hectares」「種数 = species」と単位を確認する。2分以内が目安。",
    trapExplanation:
      "200（鳥の種数）をそのまま「200 hectares」と面積として読む誤りが典型。同じ文章に複数の数値が出てくるとき、それぞれの単位・意味を照合してから選ぶこと。",
    estimatedMinutes: 3,
    difficulty: "BASIC",
    skillTags: ["レポート完成", "情報照合", "英語スキャニング"],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// セクションIDと大問番号のマッピング（"section-3" → 3）
// ─────────────────────────────────────────────────────────────────────────
export function sectionIdToNumber(sectionId: string): number {
  return parseInt(sectionId.replace("section-", ""), 10);
}
