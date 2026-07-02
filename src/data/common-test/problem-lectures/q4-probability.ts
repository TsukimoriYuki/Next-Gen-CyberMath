import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";

const probability = "/common-test/lectures/probability-guided-reading";

export const CT_Q4_PROBABILITY: CommonTestProblemLecture = {
  id: "ct-ia-q4-probability",
  title: "第4問 場合の数と確率",
  pdfUrl: "/problem1a/ct_probability_q4_problem.pdf",
  targetSection: "第4問",
  subjectLabel: "数学I・数学A",
  concepts: ["確率", "条件付き確率", "独立", "反復試行"],
  difficulty: "共通テスト標準〜やや難",
  estimatedTime: "18〜22分",
  goals: [
    "袋の選択（事前確率）と条件付き確率を、全確率の公式で組み合わせる",
    "独立性の判定を、感覚ではなく実際の計算で確認する",
    "条件付き確率 $P(D\\mid C)=\\dfrac{P(D\\cap C)}{P(C)}$ を正確に立てる",
    "ゲームを繰り返したときの合計得点の確率を、場合分けして求める",
    "2つの袋の色の個数が入れ替わっている対称性に気づき、計算を使い回す",
  ],
  insights: [
    { expression: "さいころの出目で袋Iまたは袋IIを選ぶ", reaction: "全確率の公式（袋ごとの確率×選ばれる確率の和）を使う" },
    { expression: "取り出した玉を戻さず、順序を区別する", reaction: "総数は順列（$_nP_r$）で数える" },
    { expression: "事象 $A,B,C$ が複数定義されている", reaction: "それぞれの事象を袋ごとに個別に計算してから、全体を合成する" },
    { expression: "条件付き確率 $P(D\\mid C)$", reaction: "$\\dfrac{P(D\\cap C)}{P(C)}$ の式に、全確率の公式で求めた $P(C)$ を正確に代入する" },
    { expression: "「独立であるか」を問う選択肢", reaction: "感覚で判断せず、$P(D\\cap X)=P(D)P(X)$ が成り立つか実際に計算する" },
    { expression: "ゲームを2回繰り返す", reaction: "1回分の得点の確率分布を先に求め、2回分の合計を場合分けして数える" },
    { expression: "赤・白・青の個数が袋ごとに入れ替わっている", reaction: "対称性に気づけば、一部の確率は計算し直さずに済む" },
  ],
  thinkingFlow: [
    "各袋の中身から、事象 $A,B,C$ の確率を個別に計算する（総数は順列で数える）",
    "全確率の公式で、袋の選択を組み込んだ $P(A),P(B),P(C)$ を求める",
    "条件付き確率 $P(D\\mid C)$ は $\\dfrac{P(D\\cap C)}{P(C)}$ の式に正確に代入する",
    "独立性の判定は、$P(D\\cap X)=P(D)P(X)$ が成り立つか実際に計算して確認する",
    "1回のゲームの得点の確率分布（0点・1点・2点）を求める",
    "2回のゲームの合計得点の確率は、得点の組み合わせを場合分けして数える",
    "対称性（2つの袋の色数の入れ替え）に気づいたら、計算を使い回して時間を節約する",
  ],
  explanations: [
    {
      heading: "事象の確率と全確率の公式",
      body: "各袋での事象の確率を個別に求め、袋が選ばれる確率と組み合わせて全体の確率を作る。取り出しは順序を区別するので、総数は順列で数える。",
      mathCourseLink: { label: "確率：順列・組合せの基礎", href: "/courses/math-1a/counting-probability/permutation-combination-basic" },
    },
    {
      heading: "条件付き確率と独立性の判定",
      body: "$P(D\\mid C)$ は $\\dfrac{P(D\\cap C)}{P(C)}$ の式に正確に代入する。独立かどうかは、感覚で決めず実際に $P(D\\cap X)=P(D)P(X)$ を計算して確認する。",
      mathCourseLink: { label: "確率：条件付き確率の基礎", href: "/courses/math-1a/counting-probability/conditional-probability-basic" },
    },
    {
      heading: "ゲームの得点と反復",
      body: "1回分の得点の確率分布を求めてから、2回分の合計得点は得点の組み合わせを場合分けして数える。条件付き確率も同様に、全体の確率から絞り込む。",
      mathCourseLink: { label: "確率：確率の意味の基礎", href: "/courses/math-1a/counting-probability/probability-meaning-basic" },
    },
  ],
  mistakes: [
    { mistake: "「取り出した順序を区別する」という条件を見落とし、組合せで数えてしまう", cause: "問題文の条件を確認せずに数え方を決めている", returnTo: { label: "確率 中核講義：解法判別フロー", href: `${probability}#probability-flow` } },
    { mistake: "条件付き確率 $P(D\\mid C)$ を $P(C\\mid D)$ と取り違える", cause: "分母をどちらの事象にするかを確認していない", returnTo: { label: "確率 中核講義：条件付きの判別フロー", href: `${probability}#probability-conditional-flow` } },
    { mistake: "独立性を「たぶん独立」と感覚で判断し、計算で確認しない", cause: "$P(D\\cap X)=P(D)P(X)$ の定義に戻っていない", returnTo: { label: "確率：条件付き確率の基礎", href: "/courses/math-1a/counting-probability/conditional-probability-basic" } },
    { mistake: "2回のゲームの合計得点を求めるとき、得点の組み合わせを一部見落とす", cause: "0点・1点・2点の組み合わせをすべて書き出さずに計算している", returnTo: { label: "確率 中核講義", href: probability } },
    { mistake: "2つの袋の対称性（色数の入れ替え）に気づかず、同じ計算を繰り返す", cause: "袋Iと袋IIの構造の関係を確認していない", returnTo: { label: "確率：確率の意味の基礎", href: "/courses/math-1a/counting-probability/probability-meaning-basic" } },
  ],
  relatedMathCourses: [
    { label: "確率：順列・組合せの基礎", href: "/courses/math-1a/counting-probability/permutation-combination-basic" },
    { label: "確率：確率の意味の基礎", href: "/courses/math-1a/counting-probability/probability-meaning-basic" },
    { label: "確率：条件付き確率の基礎", href: "/courses/math-1a/counting-probability/conditional-probability-basic" },
  ],
  relatedCoreLectures: [{ label: "確率 誘導読解満点講義", href: probability }],
  relatedMocks: [
    { label: "共通テスト型本番模試 第1回 第4問", href: "/common-test/simulator/common-test-math-1a-manual-001" },
    { label: "共通テスト型本番模試 第2回 第4問", href: "/common-test/simulator/common-test-math-1a-manual-002" },
  ],
  nextProblemLectures: [
    { label: "第1問前半 数と式・絶対値・命題融合", href: "/common-test/problem-lectures/ct-ia-q1-front-algebra-logic-abs" },
  ],
};

