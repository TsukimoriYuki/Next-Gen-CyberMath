import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";

const measurement = "/common-test/lectures/geometry-measurement-intensive";

export const CT_Q1_BACK_GEOMETRY_MEASUREMENT: CommonTestProblemLecture = {
  id: "ct-ia-q1-back-geometry-measurement",
  title: "第1問後半 図形と計量",
  pdfUrl: "/problem1a/ct_geometry_q1_latter_problem.pdf",
  targetSection: "第1問〔2〕",
  subjectLabel: "数学I・数学A",
  concepts: ["図形と計量", "正弦定理", "余弦定理", "外接円"],
  difficulty: "共通テスト標準",
  estimatedTime: "12〜15分",
  goals: [
    "三平方の定理を連立して使い、垂線の足の位置を決める",
    "余弦定理・面積公式・外接円の公式を、条件に応じて選び切る",
    "cosの符号から、角が鋭角か鈍角かを判定する",
    "同じ頂点・同一直線上の底辺を持つ三角形の面積比を、計算せずに読み取る",
  ],
  insights: [
    { expression: "$AB=13,\\ AC=15,\\ BC=14$（角度が与えられていない）", reaction: "垂線の足の位置を三平方の連立で決める下準備をする" },
    { expression: "$AP=AB$ のような二等辺条件", reaction: "二等辺三角形の性質、または座標・三平方で点の位置を決める" },
    { expression: "余弦定理で $\\cos$ が負になる", reaction: "その角は鈍角。$\\sin$ は相互関係で正の値を取ればよい", },
    { expression: "面積比 $S_1:S_2$ を聞かれた", reaction: "同じ頂点を共有し、底辺が同一直線上にある三角形は、底辺の比がそのまま面積比になる" },
    { expression: "外接円の半径 $R$", reaction: "$R=\\dfrac{abc}{4S}$ を使うと、角度を経由せず面積から直接求まる" },
  ],
  thinkingFlow: [
    "与えられた3辺から、垂線の足Dの位置を三平方の連立（$x+y=14$、$13^2-x^2=15^2-y^2$）で決める",
    "$AD$、面積 $S$、$\\cos\\angle ABC$、$\\sin\\angle ABC$ を求める",
    "$AP=AB$ の条件から、$BP=t$ とおくなどして点 $P$ の位置を決める",
    "余弦定理で $\\angle APC$ の $\\cos$ を求め、符号から鋭角・鈍角を判定する",
    "同じ頂点を共有し底辺が同一直線上にある三角形の面積比は、底辺の比で即答する",
    "外接円の半径は、面積 $S$ が分かっていれば $R=\\dfrac{abc}{4S}$ で一気に求める",
  ],
  explanations: [
    {
      heading: "垂線の足Dの位置と面積",
      body: "$BD=x,\\ DC=y$ として三平方の定理を2本立て、$x+y=14$ と組み合わせて連立する。ここで得た $AD$ を使って $\\cos\\angle ABC,\\ \\sin\\angle ABC$、面積 $S$ まで一気に求める。",
      mathCourseLink: { label: "図形と計量：正弦定理・余弦定理の使い分け", href: "/courses/math-1a/figures-and-measurement/sine-law-cosine-law" },
    },
    {
      heading: "点Pの位置と∠APCの符号判定",
      body: "$AP=AB$ という二等辺条件から、$BP=t$ とおいて三平方で位置を決める。三角形 $APC$ に余弦定理を使うと、角の鋭角・鈍角の判定まで一度にできる。",
      mathCourseLink: { label: "図形と計量：三角形の面積と三角比", href: "/courses/math-1a/figures-and-measurement/triangle-area-with-trigonometry" },
    },
    {
      heading: "面積比と外接円の半径",
      body: "同じ頂点を共有し底辺が同一直線上にある三角形の面積比は、底辺の比と一致するため計算し直す必要がない。外接円の半径は $R=\\dfrac{abc}{4S}$ で直接求まる。",
      mathCourseLink: { label: "図形と計量：面積・内接円・外接円の関係", href: "/courses/math-1a/figures-and-measurement/area-radius-relations" },
    },
  ],
  mistakes: [
    { mistake: "三平方の連立を整理できず、計算が長くなって時間を失う", cause: "$x+y=14$ と2本の三平方の式をどう組み合わせるか整理していない", returnTo: { label: "図形と計量 中核講義：解法判別フロー", href: `${measurement}#tool-flow` } },
    { mistake: "余弦定理で $\\cos$ の符号を見落とし、鈍角を鋭角と判定してしまう", cause: "$\\cos$ が負のときの意味を確認していない", returnTo: { label: "図形と計量 中核講義：鋭角・鈍角の符号確認", href: `${measurement}#angle-sign-heading` } },
    { mistake: "面積比を求めるのに、両方の面積を最初から計算し直す", cause: "同じ頂点・同一直線上の底辺という条件を使えていない", returnTo: { label: "図形と計量 基礎講座", href: "/courses/math-1a/figures-and-measurement/triangle-area-with-trigonometry" } },
    { mistake: "外接円の半径を正弦定理 $R=\\dfrac{a}{2\\sin A}$ から出そうとして、角度を求め直す", cause: "$R=\\dfrac{abc}{4S}$ の公式を使えていない", returnTo: { label: "図形と計量 中核講義：外接円の半径", href: `${measurement}#circumradius-heading` } },
  ],
  relatedMathCourses: [
    { label: "図形と計量：正弦定理・余弦定理の使い分け", href: "/courses/math-1a/figures-and-measurement/sine-law-cosine-law" },
    { label: "図形と計量：三角形の面積と三角比", href: "/courses/math-1a/figures-and-measurement/triangle-area-with-trigonometry" },
    { label: "図形と計量：面積・内接円・外接円の関係", href: "/courses/math-1a/figures-and-measurement/area-radius-relations" },
  ],
  relatedCoreLectures: [{ label: "図形と計量 徹底講座", href: measurement }],
  relatedMocks: [
    { label: "共通テスト型本番模試 第1回 第1問", href: "/common-test/simulator/common-test-math-1a-manual-001" },
    { label: "共通テスト型本番模試 第2回 第1問", href: "/common-test/simulator/common-test-math-1a-manual-002" },
  ],
  nextProblemLectures: [
    { label: "第3問A 図形の性質：平面図形（同じ13-14-15の三角形を使用）", href: "/common-test/problem-lectures/ct-ia-q3-plane-geometry" },
    { label: "第2問前半 二次関数：最大最小と場合分け", href: "/common-test/problem-lectures/ct-ia-q2-front-quadratic-1" },
  ],
};

