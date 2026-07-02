import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";

const geometryProperties = "/common-test/lectures/geometry-properties-auxiliary-lines";
const measurement = "/common-test/lectures/geometry-measurement-intensive";

export const CT_Q3_SPACE_GEOMETRY: CommonTestProblemLecture = {
  id: "ct-ia-q3-space-geometry",
  title: "第3問B 図形の性質：空間図形",
  pdfUrl: "/problem1a/ct_geometry_q3_space_problem_v3.pdf",
  targetSection: "第3問B",
  subjectLabel: "数学I・数学A",
  concepts: ["空間図形", "五心", "切断面", "角の二等分線"],
  difficulty: "共通テストやや難",
  estimatedTime: "20〜25分",
  goals: [
    "頂点から底面へ垂線を下ろした四面体で、垂線の足が五心のどれかを見抜く",
    "座標を使って底面図形の五心を求め、それを3D距離の計算に使う",
    "側面積・表面積・体積を、垂線の性質を使って求める",
    "平面による四面体の切断面（三角形）の面積を求める",
    "初出は太字・再利用は通常字という空欄記号のルールを、値の意味の区別として読み取る",
  ],
  insights: [
    { expression: "$SI$ が底面に垂直（$I$ は内心）", reaction: "頂点 $S$ の真下は内心。$S$ から底面の各辺までの距離はすべて等しい" },
    { expression: "座標平面上に底面を置く", reaction: "内心・重心・外心を座標公式で求め、その後の3D距離計算に使う" },
    { expression: "点 $S$ から $AB,BC,CA$ への距離", reaction: "$SI\\perp$底面なので、三平方の定理（距離$^2=SI^2+r^2$）で一気に求まる" },
    { expression: "平面 $SAD$ による切断面", reaction: "角の二等分線の長さの公式で $AD$ を求め、三平方で $SD$ を求めて面積を計算する" },
    { expression: "$IG,\\ IO$ のような底面内の距離", reaction: "底面の座標だけで完結する平面内の計算。3D計算に進む前にここを片付ける" },
    { expression: "$T$（底面の面積）と体積が同じ数値になるが別の空欄記号", reaction: "たまたま数値が一致しただけの量には、同じ記号を使わない、という問題文の注記通りの区別" },
  ],
  thinkingFlow: [
    "底面の面積 $T$、内接円半径 $r$、外接円半径 $R$ を求め、座標で内心 $I$、重心 $G$、外心 $O$ を求める",
    "$SI\\perp$底面、$SI=3$ を使い、$S$ から各辺までの距離を三平方（距離$^2=SI^2+r^2$）で求める",
    "側面積の和・表面積・体積を求める",
    "角の二等分線 $AD$ の長さを公式で求め、$ID,\\ SD$ を三平方で求める。切断面 $SAD$ の面積を計算する",
    "底面内で $IG,\\ IO$ を座標から求め、$SG=\\sqrt{SI^2+IG^2}$ のように三平方で3D距離を求める",
    "選択肢の判定は、$S$ の真下が内心 $I$ であることを問題文の条件から確認する",
  ],
  explanations: [
    {
      heading: "垂線の足と側面までの距離",
      body: "$SI$ が底面に垂直で $I$ が内心なので、底面の三辺までの距離はすべて $r$。$S$ から各辺までの距離は、三平方の定理で $SI^2+r^2$ の平方根として一気に求まる。",
      mathCourseLink: { label: "図形の性質：三角形の五心", href: "/courses/math-1a/geometry-properties/geometry-properties-triangle-centers" },
    },
    {
      heading: "座標を使った五心の計算と切断面",
      body: "底面を座標平面に置き、内心・重心・外心を座標公式で求める。この平面内の計算を先に済ませてから3D距離の計算に進む。角の二等分線の長さの公式で $AD$ を求め、三平方で $ID,\\ SD$ を求めれば、切断面 $SAD$ の面積が計算できる。",
      mathCourseLink: { label: "図形と計量：測量・空間図形の標準戦略", href: "/courses/math-1a/figures-and-measurement/measurement-standard-strategy" },
    },
    {
      heading: "空欄記号のルールを読む",
      body: "問題文の注記の通り、同じ量を再利用するときは同じ記号、たまたま数値が一致しただけの量（底面の面積 $T$ と四面体の体積）には別の記号が使われている。この区別を意識すると、どの値がどこで再利用されているかが見える。",
    },
  ],
  mistakes: [
    { mistake: "$S$ から底面までの垂線の足を、重心や外心だと思い込む", cause: "問題文で明示された「$SI$ が底面に垂直」という条件を図で確認していない", returnTo: { label: "図形の性質：三角形の五心", href: "/courses/math-1a/geometry-properties/geometry-properties-triangle-centers" } },
    { mistake: "$S$ から各辺までの距離を求めるとき、$SI$ をそのまま使ってしまう", cause: "三平方の定理（$SI^2+r^2$）を使わず、垂線の長さを混同している", returnTo: { label: "図形と計量 中核講義：測量・空間図形を平面に落とす", href: `${measurement}#survey-space-heading` } },
    { mistake: "角の二等分線の長さの公式を使わず、座標だけで計算しようとして時間がかかる", cause: "平面図形の公式が空間図形でもそのまま使えることに気づいていない", returnTo: { label: "図形の性質 補助線発見講座", href: geometryProperties } },
    { mistake: "底面の面積 $T$ と四面体の体積が同じ数値なので、同じ量だと勘違いする", cause: "問題文の空欄記号の使い分け（偶然の一致には別記号）を読み落としている", returnTo: { label: "図形の性質：方べきの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-power-of-a-point" } },
  ],
  relatedMathCourses: [
    { label: "図形の性質：三角形の五心", href: "/courses/math-1a/geometry-properties/geometry-properties-triangle-centers" },
    { label: "図形と計量：測量・空間図形の標準戦略", href: "/courses/math-1a/figures-and-measurement/measurement-standard-strategy" },
    { label: "図形の性質：チェバ・メネラウスの定理", href: "/courses/math-1a/geometry-properties/geometry-properties-ceva-menelaus" },
  ],
  relatedCoreLectures: [
    { label: "図形の性質 補助線発見講座", href: geometryProperties },
    { label: "図形と計量 徹底講座", href: measurement },
  ],
  relatedMocks: [
    { label: "共通テスト型本番模試 第1回 第3問", href: "/common-test/simulator/common-test-math-1a-manual-001" },
    { label: "共通テスト型本番模試 第2回 第3問", href: "/common-test/simulator/common-test-math-1a-manual-002" },
  ],
  nextProblemLectures: [
    { label: "第4問 場合の数と確率", href: "/common-test/problem-lectures/ct-ia-q4-probability" },
  ],
};

