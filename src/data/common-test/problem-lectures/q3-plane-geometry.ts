import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";

const geometryProperties = "/common-test/lectures/geometry-properties-auxiliary-lines";

export const CT_Q3_PLANE_GEOMETRY: CommonTestProblemLecture = {
  id: "ct-ia-q3-plane-geometry",
  title: "第3問A 図形の性質：平面図形",
  pdfUrl: "/problem1a/ct_geometry_q3_plane_problem.pdf",
  targetSection: "第3問A",
  subjectLabel: "数学I・数学A",
  concepts: ["図形の性質", "角の二等分線", "チェバ", "メネラウス", "方べき", "接弦定理"],
  difficulty: "共通テスト標準〜やや難",
  estimatedTime: "18〜22分",
  goals: [
    "角の二等分線定理・チェバの定理・メネラウスの定理を、図の形で使い分ける",
    "座標を使って内心・重心・外心の位置を求める",
    "方べきの定理と角の二等分線の長さの公式を組み合わせて長さを求める",
    "接弦定理で角を円周角に移し、メネラウスの定理で外分点の位置を判定する",
  ],
  insights: [
    { expression: "3つの角の二等分線が1点 $I$（内心）で交わる", reaction: "角の二等分線定理で比を求め、3線が1点に集まることを使ってチェバの定理を適用する" },
    { expression: "内接円の半径 $r$、外接円の半径 $R$", reaction: "$S=rs$、$R=\\dfrac{abc}{4S}$ の公式を使う" },
    { expression: "座標を $B=(0,0),\\ C=(14,0),\\ A=(5,12)$ とおく", reaction: "内心・重心・外心の座標公式（$I=\\dfrac{aA+bB+cC}{a+b+c}$ など）にそのまま代入する" },
    { expression: "直線 $AD$ と円 $\\Gamma$ の交点 $K$、点 $D$ に関する方べき", reaction: "$BD\\cdot DC=AD\\cdot DK$（円の内部で交わる弦の方べき）を使う" },
    { expression: "点 $A$ における接線と直線 $AB$ のなす角", reaction: "接弦定理より、その角は $\\angle ACB$ に等しい" },
    { expression: "$BP:PC,\\ CQ:QA$ が与えられ、直線 $PQ$ と $AB$ の交点 $H$", reaction: "メネラウスの定理で $AH:HB$ を求め、比の符号から $H$ が辺の内側か延長上かを判定する" },
  ],
  thinkingFlow: [
    "角の二等分線定理で $BD:DC,\\ AE:EC$ の比を求める",
    "3線が1点（内心）で交わることを使い、チェバの定理で $AF:FB$ を求める",
    "面積 $S$、内接円半径 $r$、外接円半径 $R$ を求め、座標から内心・重心・外心の座標を公式で求める",
    "方べきの定理（$BD\\cdot DC=AD\\cdot DK$）で $DK$ を求め、$AK$ を求める",
    "接弦定理で、接線と弦のなす角を円周角に移して $\\tan\\theta$ を求める",
    "メネラウスの定理で $AH:HB$ を求め、$H$ の位置（内側か延長か）を判定する",
  ],
  explanations: [
    {
      heading: "角の二等分線定理とチェバの定理",
      body: "角の二等分線定理で比を求め、3本の二等分線が1点（内心）で交わることを使ってチェバの定理を適用する。内心はどの三角形でも角の二等分線の交点として定まる。",
      mathCourseLink: { label: "図形の性質：チェバ・メネラウスの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-ceva-menelaus" },
    },
    {
      heading: "内心・重心・外心の座標と方べき・接弦定理",
      body: "座標を設定し、内心・重心・外心をそれぞれの座標公式に代入する。点 $D$ は円の内部にあるので、交わる2本の弦の方べき（$BD\\cdot DC=AD\\cdot DK$）を使う。接弦定理は接線と弦の角を円周角に移す道具として使う。",
      mathCourseLink: { label: "図形の性質：方べきの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-power-of-a-point" },
    },
    {
      heading: "メネラウスの定理と外分点",
      body: "1本の直線が三角形の3辺（またはその延長）を横切るときはメネラウスの定理を使う。得られた比の符号から、交点が辺の内側か延長上かを判定する。",
      mathCourseLink: { label: "図形の性質：三角形の五心", href: "/courses/math-1a/geometry-properties/geometry-properties-triangle-centers" },
    },
  ],
  mistakes: [
    { mistake: "角の二等分線定理の比を、辺の対応を逆にして立てる", cause: "$BD:DC$ と $AB:AC$ の対応を確認していない", returnTo: { label: "図形の性質 中核講義：比が出たらの章", href: `${geometryProperties}#gp-ratio-heading` } },
    { mistake: "チェバとメネラウスを図の雰囲気で選んでしまう", cause: "1点に集まるか（チェバ）、1直線上か（メネラウス）を確認していない", returnTo: { label: "図形の性質：チェバ・メネラウスの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-ceva-menelaus" } },
    { mistake: "方べきの定理で、どの2本の線分の積を取るか間違える", cause: "円の内部の交点か外部の点かを区別せず公式を適用している", returnTo: { label: "図形の性質：方べきの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-power-of-a-point" } },
    { mistake: "接弦定理の「反対側」を取り違え、関係ない角と一致させる", cause: "接線と弦の角がどちらの円周角に移るか確認していない", returnTo: { label: "図形の性質 中核講義：円が出たらの章", href: `${geometryProperties}#gp-circle-heading` } },
    { mistake: "メネラウスの定理の結果から、交点が辺の内側か延長上かを判定し忘れる", cause: "比の符号（内分・外分）を確認せずに数値だけで満足している", returnTo: { label: "図形の性質：チェバ・メネラウスの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-ceva-menelaus" } },
  ],
  relatedMathCourses: [
    { label: "図形の性質：チェバ・メネラウスの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-ceva-menelaus" },
    { label: "図形の性質：方べきの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-power-of-a-point" },
    { label: "図形の性質：三角形の五心", href: "/courses/math-1a/geometry-properties/geometry-properties-triangle-centers" },
  ],
  relatedCoreLectures: [{ label: "図形の性質 補助線発見講座", href: geometryProperties }],
  relatedMocks: [
    { label: "共通テスト型本番模試 第1回 第3問", href: "/common-test/simulator/common-test-math-1a-manual-001" },
    { label: "共通テスト型本番模試 第2回 第3問", href: "/common-test/simulator/common-test-math-1a-manual-002" },
  ],
  nextProblemLectures: [
    { label: "第3問B 図形の性質：空間図形（同じ13-14-15の三角形を底面に使用）", href: "/common-test/problem-lectures/ct-ia-q3-space-geometry" },
    { label: "第1問後半 図形と計量（同じ三角形）", href: "/common-test/problem-lectures/ct-ia-q1-back-geometry-measurement" },
  ],
};

