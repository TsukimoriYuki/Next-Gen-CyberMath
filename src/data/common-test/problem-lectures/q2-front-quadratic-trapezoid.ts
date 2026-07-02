import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";

const quadratic = "/common-test/lectures/quadratic-case-split-intensive";
const numbers = "/common-test/lectures/numbers-expressions-core-skills";

export const CT_Q2_FRONT_QUADRATIC_TRAPEZOID: CommonTestProblemLecture = {
  id: "ct-ia-q2-front-quadratic-trapezoid",
  title: "第2問前半 二次関数：台形面積の融合",
  pdfUrl: "/problem1a/ct_quadratic_trapezoid_problem.pdf",
  targetSection: "第2問〔1〕",
  subjectLabel: "数学I・数学A",
  concepts: ["二次関数", "絶対値", "図形融合"],
  difficulty: "共通テスト標準〜やや難",
  estimatedTime: "15〜18分",
  goals: [
    "台形を切る直線の位置 $x$ から、相似の比で面積を2次関数として作る",
    "2次不等式 $S(x)\\geqq T(x)$ を、無理数を含む解まで求める",
    "絶対値を含む関数 $H(x)=|S(x)-T(x)|$ の最小値・最大値を、符号が変わる点に注目して求める",
    "グラフの対称性を、計算し直さずに関係式から見抜く",
  ],
  insights: [
    { expression: "$AB\\parallel CD$ の台形を、平行な直線で切る", reaction: "相似の比から、切り口の長さ $EF$ を $x$ の1次式で表す" },
    { expression: "$S(x)+T(x)=$ 台形全体の面積（一定）", reaction: "片方を2次関数として作れば、もう片方は全体から引くだけで済む" },
    { expression: "$S(x)\\geqq T(x)$", reaction: "$S(x)-T(x)$ の2次不等式を解く。根に無理数が出ることがある" },
    { expression: "$H(x)=|S(x)-T(x)|$", reaction: "絶対値の中身の符号が変わる点（2次式の根）で場合分けする" },
    { expression: "「直線に関して対称」「頂点で最大」などの選択肢", reaction: "$S+T=$一定という関係やグラフの軸を使い、計算せずに真偽を判定できないか確認する" },
  ],
  thinkingFlow: [
    "相似の比から、切り口 $EF$ を $x$ の1次式で表す",
    "$S(x)$ を台形の面積公式で2次関数として作る。全体の面積から $T(x)=$全体$-S(x)$ で求める",
    "$S(x)$ の軸を調べ、定義域内にあるかどうかで最大値の位置を判断する",
    "$S(x)\\geqq T(x)$ は2次不等式に直し、無理数を含む解を求める（定義域と見比べて範囲を絞る）",
    "$H(x)=|S(x)-T(x)|$ は、中身が0になる点（先の根）で最小値0を取ることを利用する",
    "選択肢の真偽判定は、$S+T=$一定という関係やグラフの軸を使い、座標を1つずつ試す前に絞り込む",
  ],
  explanations: [
    {
      heading: "面積の2次関数化",
      body: "台形の相似比から $EF$ を $x$ の1次式にし、$S(x)$ を2次関数として作る。台形全体の面積は一定なので、$T(x)=$全体$-S(x)$ とすれば計算量が半分で済む。",
      mathCourseLink: { label: "二次関数：条件から式を組み立てる", href: "/courses/math-1a/quadratic/quadratic-construct-from-conditions" },
    },
    {
      heading: "S(x)≧T(x) の2次不等式と絶対値関数",
      body: "$S(x)-T(x)$ を計算して2次不等式にする。根に無理数が出ても、定義域 $[0,4]$ と見比べて解の範囲を絞る。$H(x)=|S(x)-T(x)|$ は、中身が0になる点で最小値0を取り、そこから離れるほど値が大きくなる。",
      mathCourseLink: { label: "数と式：絶対値を含む式", href: "/courses/math-1a/numbers-and-expressions/absolute-value-basic" },
    },
    {
      heading: "選択肢の真偽判定",
      body: "$S(x)+T(x)$ が一定という関係から、$S,T$ のグラフはある水平な直線に関して対称になる。この関係を使えば、座標を1つずつ代入せずに正しい選択肢を絞り込める。",
      mathCourseLink: { label: "二次関数：誘導なしの最大最小", href: "/courses/math-1a/quadratic/quadratic-max-min-no-guidance" },
    },
  ],
  mistakes: [
    { mistake: "台形の相似比を使わず、$EF$ の長さを図から読もうとする", cause: "$AB,CD$ の長さと $x$ の関係を式にしていない", returnTo: { label: "二次関数：条件から式を組み立てる", href: "/courses/math-1a/quadratic/quadratic-construct-from-conditions" } },
    { mistake: "2次不等式の根の順序（小さい方が下限）を逆にする", cause: "無理数を含む根の大小を確認していない", returnTo: { label: "二次関数 中核講義：場合分け境界ドリル", href: `${quadratic}#quadratic-boundary-drill` } },
    { mistake: "絶対値関数の最小値を、定義域の端でばかり探す", cause: "絶対値の中身が0になる内部の点を最小値の候補にしていない", returnTo: { label: "数と式 中核講義：絶対値を含む式", href: `${numbers}#na-absolute-value-heading` } },
    { mistake: "グラフの対称性の選択肢を、座標を代入せず感覚で判断する", cause: "$S+T=$一定のような関係式を作らずに判断している", returnTo: { label: "二次関数 中核講義：解法判別フロー", href: `${quadratic}#quadratic-flow` } },
  ],
  relatedMathCourses: [
    { label: "二次関数：条件から式を組み立てる", href: "/courses/math-1a/quadratic/quadratic-construct-from-conditions" },
    { label: "二次関数：誘導なしの最大最小", href: "/courses/math-1a/quadratic/quadratic-max-min-no-guidance" },
    { label: "数と式：絶対値を含む式", href: "/courses/math-1a/numbers-and-expressions/absolute-value-basic" },
  ],
  relatedCoreLectures: [
    { label: "二次関数 場合分け満点講義", href: quadratic },
    { label: "数と式 徹底講座", href: numbers },
  ],
  relatedMocks: [
    { label: "共通テスト型本番模試 第1回 第2問", href: "/common-test/simulator/common-test-math-1a-manual-001" },
    { label: "共通テスト型本番模試 第2回 第2問", href: "/common-test/simulator/common-test-math-1a-manual-002" },
  ],
  nextProblemLectures: [
    { label: "第2問後半 データの分析：相関と外れ値", href: "/common-test/problem-lectures/ct-ia-q2-back-data-analysis" },
  ],
};

