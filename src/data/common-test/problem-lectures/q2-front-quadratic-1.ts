import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";

const quadratic = "/common-test/lectures/quadratic-case-split-intensive";
const logic = "/common-test/lectures/sets-logic-necessary-sufficient";

export const CT_Q2_FRONT_QUADRATIC_1: CommonTestProblemLecture = {
  id: "ct-ia-q2-front-quadratic-1",
  title: "第2問前半 二次関数：最大最小と場合分け",
  pdfUrl: "/problem1a/ct_quadratic_q2_front_problem.pdf",
  targetSection: "第2問〔1〕",
  subjectLabel: "数学I・数学A",
  concepts: ["二次関数", "最大最小", "場合分け", "必要条件・十分条件"],
  difficulty: "共通テスト標準〜やや難",
  estimatedTime: "15〜18分",
  goals: [
    "文字定数 $a$ を含む2次関数を平方完成し、軸と頂点を $a$ の式として読む",
    "定義域 $0\\leqq x\\leqq4$ における最小値・最大値を、軸の位置で場合分けする",
    "「常に $f_a(x)\\geqq1$」のような全称条件を、最小値の不等式に翻訳する",
    "必要条件・十分条件の判定と反例発見を、範囲の比較で組み合わせる",
    "会話文のヒントを使って、最大最小の差を最小化する",
  ],
  insights: [
    { expression: "$f_a(x)=x^2-2(a+2)x+\\cdots$", reaction: "平方完成して軸・頂点を $a$ の式として読む" },
    { expression: "$0\\leqq x\\leqq4$", reaction: "軸の位置を $0,4$ と比較して3パターンに場合分けする" },
    { expression: "最小値 $m(a)$ ・最大値 $M(a)$", reaction: "軸が区間内か外かで最小値の形が変わり、最大値は端点の比較で決まる" },
    { expression: "「常に $f_a(x)\\geqq1$」", reaction: "区間内の最小値 $m(a)$ が1以上、という不等式に翻訳する" },
    { expression: "「$q$ であることは $p$ であるための」", reaction: "$p,q$ それぞれの条件を範囲として比較してから向きを判定する" },
    { expression: "花子・太郎の会話文", reaction: "「軸を区間の中央にそろえる」という誘導のヒントをそのまま計算に使う" },
  ],
  thinkingFlow: [
    "$f_a(x)$ を平方完成し、軸 $x=a+2$、頂点を求める",
    "軸（$a+2$）と定義域 $[0,4]$ の位置関係で3パターンに場合分けし、最小値 $m(a)$ を求める",
    "最大値 $M(a)$ は $f_a(0)$ と $f_a(4)$ を比較して大きい方を選ぶ（境界は $a=0$）",
    "「常に $f_a(x)\\geqq1$」は $m(a)\\geqq1$ の不等式に翻訳し、各場合分けで解く",
    "$p,q$ の条件をそれぞれ集合として比較し、必要条件・十分条件を判定する",
    "反例は選択肢を総当たりせず、$p$ と $q$ の境界からズレる値を予想して確認する",
    "$H(a)=M(a)-m(a)$ の最小化は、会話文のヒント（軸を区間中央にそろえる）をそのまま使う",
  ],
  explanations: [
    {
      heading: "平方完成と場合分け",
      body: "$f_a(x)=(x-a-2)^2-3$ の形にし、軸 $a+2$ と区間 $[0,4]$ の位置関係で最小値の式を3パターンに分ける。最大値は $f_a(0),\\ f_a(4)$ の大小比較で決まり、境界は $a=0$。",
      mathCourseLink: { label: "二次関数：定義域付き最大最小", href: "/courses/math-1a/quadratic/quadratic-max-min-domain" },
    },
    {
      heading: "全称条件と必要十分条件",
      body: "「常に $f_a(x)\\geqq1$」は $m(a)\\geqq1$ と同じ意味。$p,q$ それぞれの条件を求めた範囲として比較し、矢印の向きを判定する。反例は境界付近の値から探すと早い。",
      mathCourseLink: { label: "集合と命題：必要条件・十分条件の基礎", href: "/courses/math-1a/sets-and-logic/necessary-sufficient-basic" },
    },
    {
      heading: "会話文を使った最小化",
      body: "$H(a)=M(a)-m(a)$ の最小値は、会話文にある「軸を区間の中央にそろえる」という着眼点をそのまま使えば、$a+2=2$ から $a$ が即決まる。",
      mathCourseLink: { label: "二次関数：場合分けの総合演習", href: "/courses/math-1a/quadratic/quadratic-case-analysis" },
    },
  ],
  mistakes: [
    { mistake: "軸が区間の外に出るケースを考えず、頂点の値をそのまま最小値にする", cause: "軸と定義域の位置関係を場合分けする前に計算を始めている", returnTo: { label: "二次関数 中核講義：解法判別フロー", href: `${quadratic}#quadratic-flow` } },
    { mistake: "最大値の場合分けの境界（$a=0$）を見落とす", cause: "$f_a(0)$ と $f_a(4)$ の大小比較をせずに決め打ちしている", returnTo: { label: "二次関数：定義域付き最大最小", href: "/courses/math-1a/quadratic/quadratic-max-min-domain" } },
    { mistake: "「常に」という条件を、区間の端だけ確認して済ませる", cause: "全称条件が最小値の条件に翻訳できることに気づいていない", returnTo: { label: "二次関数 中核講義：境界値の章", href: `${quadratic}#quadratic-boundary-heading` } },
    { mistake: "必要条件・十分条件の反例を選択肢から総当たりする", cause: "$p$ と $q$ の範囲を先に比較していない", returnTo: { label: "集合と命題 中核講義：必要条件・十分条件", href: `${logic}#sl-necessary-sufficient-heading` } },
  ],
  relatedMathCourses: [
    { label: "二次関数：平方完成", href: "/courses/math-1a/quadratic/quadratic-completing-square" },
    { label: "二次関数：定義域付き最大最小", href: "/courses/math-1a/quadratic/quadratic-max-min-domain" },
    { label: "二次関数：場合分けの総合演習", href: "/courses/math-1a/quadratic/quadratic-case-analysis" },
    { label: "集合と命題：必要条件・十分条件の基礎", href: "/courses/math-1a/sets-and-logic/necessary-sufficient-basic" },
  ],
  relatedCoreLectures: [
    { label: "二次関数 場合分け満点講義", href: quadratic },
    { label: "集合と命題 判定講座", href: logic },
  ],
  relatedMocks: [
    { label: "共通テスト型本番模試 第1回 第2問", href: "/common-test/simulator/common-test-math-1a-manual-001" },
    { label: "共通テスト型本番模試 第2回 第2問", href: "/common-test/simulator/common-test-math-1a-manual-002" },
  ],
  nextProblemLectures: [
    { label: "第2問前半 二次関数：台形面積の融合", href: "/common-test/problem-lectures/ct-ia-q2-front-quadratic-trapezoid" },
  ],
};

