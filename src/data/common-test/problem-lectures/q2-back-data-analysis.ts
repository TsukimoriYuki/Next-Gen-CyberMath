import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";

const dataAnalysis = "/common-test/lectures/data-analysis-quartiles-outliers";

export const CT_Q2_BACK_DATA_ANALYSIS: CommonTestProblemLecture = {
  id: "ct-ia-q2-back-data-analysis",
  title: "第2問後半 データの分析：相関と外れ値",
  pdfUrl: "/problem1a/ct_data_analysis_q2_latter_problem.pdf",
  targetSection: "第2問〔2〕",
  subjectLabel: "数学I・数学A",
  concepts: ["データの分析", "四分位数", "相関係数", "共分散"],
  difficulty: "共通テスト標準〜やや難",
  estimatedTime: "15〜18分",
  goals: [
    "実データから四分位数・四分位範囲・外れ値を、定義通りに求める",
    "平均・分散・共分散・相関係数の関係を、公式に頼らず計算する",
    "データを一次変換（定数倍・平行移動）したときの各統計量の変化を予測する",
    "外れ値を除いたときに、相関係数が必ず強くなるとは限らないことを理解する",
  ],
  insights: [
    { expression: "がく片の長さ $x$、花弁の長さ $y$ の表と散布図・箱ひげ図", reaction: "グラフから傾向を読み、外れ値の候補を先に見つけておく" },
    { expression: "外れ値の定義（$Q_1-1.5\\times\\text{IQR}$ より小さい、または $Q_3+1.5\\times\\text{IQR}$ より大きい）", reaction: "式に忠実に計算する。境界ちょうどの値は外れ値に含めない" },
    { expression: "$\\Sigma(x_i-\\bar x)^2=84$ のように計算済みの値が与えられている", reaction: "自分で計算し直さず、与えられた値をそのまま公式に代入する" },
    { expression: "$z_i=2y_i$ のようなデータの変換", reaction: "分散は $k^2$ 倍、共分散は $k$ 倍、相関係数は変わらない、という性質を使い分ける" },
    { expression: "「外れ値を除けば相関は強くなる？」という会話文", reaction: "思い込みで判断せず、実際に計算して確認する" },
  ],
  thinkingFlow: [
    "データを小さい順に並べ、四分位数・四分位範囲を定義通りに求める",
    "外れ値の判定基準を式に忠実に当てはめ、境界ちょうどの値は含めないことに注意する",
    "平均・分散・共分散は、与えられた計算済みの値（偏差平方和など）をそのまま公式に代入する",
    "データの一次変換（定数倍・平行移動）は、平均・分散・共分散・相関係数がそれぞれ異なる規則で変わることを使う",
    "外れ値を除いた場合の相関係数は、思い込みで判断せず実際に計算し直して確認する",
  ],
  explanations: [
    {
      heading: "四分位数と外れ値",
      body: "データを並べ、四分位数・IQRを定義通りに求める。外れ値の境界は「以下」「未満」など問題文の不等号を正確に使う。",
      mathCourseLink: { label: "データの分析：四分位数と箱ひげ図の基礎", href: "/courses/math-1a/data-analysis/quartiles-boxplot-basic" },
    },
    {
      heading: "平均・分散・共分散・相関係数",
      body: "与えられた計算済みの値（偏差平方和など）をそのまま公式（共分散＝偏差積和÷個数、相関係数＝共分散÷（標準偏差の積））に代入する。ゼロから計算し直す必要はない。",
      mathCourseLink: { label: "データの分析：相関係数と散布図の基礎", href: "/courses/math-1a/data-analysis/correlation-scatter-basic" },
    },
    {
      heading: "データの変換と外れ値除去の影響",
      body: "$y$ を定数倍・平行移動したとき、分散・共分散・相関係数はそれぞれ異なる規則で変わる。共分散は倍率がそのまま掛かるが、相関係数は倍率が約分されて変わらない。外れ値を除けば相関が必ず強くなるとは限らず、この問題では逆に弱くなる。",
      mathCourseLink: { label: "データの分析：データの変換と統計量の変化", href: "/courses/math-1a/data-analysis/data-transformation-effects" },
    },
  ],
  mistakes: [
    { mistake: "四分位数を求めるとき、データの個数（偶数・奇数）による分け方を間違える", cause: "四分位数の定義（中央値を含めるかどうか）を毎回確認していない", returnTo: { label: "データの分析 中核講義：四分位数の流儀", href: `${dataAnalysis}#data-analysis-quartile-method` } },
    { mistake: "外れ値の境界を「未満」なのに「以下」で判定してしまう", cause: "問題文の不等号を正確に読んでいない", returnTo: { label: "データの分析 中核講義：共通テスト型の注意点", href: `${dataAnalysis}#data-analysis-common-test-cautions` } },
    { mistake: "共分散・相関係数を求める際、与えられた偏差平方和を使わず最初から計算し直す", cause: "問題文中の途中計算の値を見落としている", returnTo: { label: "データの分析：相関係数と散布図の基礎", href: "/courses/math-1a/data-analysis/correlation-scatter-basic" } },
    { mistake: "データを2倍すると、共分散も相関係数も2倍になると思い込む", cause: "分散・共分散・相関係数それぞれの変換規則を区別していない", returnTo: { label: "データの分析：データの変換と統計量の変化", href: "/courses/math-1a/data-analysis/data-transformation-effects" } },
    { mistake: "外れ値を除けば相関は必ず強くなると思い込み、計算せず結論を決める", cause: "外れ値の影響を過信し、実際のデータで確認していない", returnTo: { label: "データの分析 中核講義：散布図と相関係数の基本", href: `${dataAnalysis}#data-analysis-scatter-heading` } },
  ],
  relatedMathCourses: [
    { label: "データの分析：四分位数と箱ひげ図の基礎", href: "/courses/math-1a/data-analysis/quartiles-boxplot-basic" },
    { label: "データの分析：相関係数と散布図の基礎", href: "/courses/math-1a/data-analysis/correlation-scatter-basic" },
    { label: "データの分析：データの変換と統計量の変化", href: "/courses/math-1a/data-analysis/data-transformation-effects" },
  ],
  relatedCoreLectures: [{ label: "データの分析 四分位数・外れ値講座", href: dataAnalysis }],
  relatedMocks: [
    { label: "共通テスト型本番模試 第1回 第2問", href: "/common-test/simulator/common-test-math-1a-manual-001" },
    { label: "共通テスト型本番模試 第2回 第2問", href: "/common-test/simulator/common-test-math-1a-manual-002" },
  ],
  nextProblemLectures: [
    { label: "第3問A 図形の性質：平面図形", href: "/common-test/problem-lectures/ct-ia-q3-plane-geometry" },
  ],
};

