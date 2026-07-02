import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";

const numbers = "/common-test/lectures/numbers-expressions-core-skills";
const logic = "/common-test/lectures/sets-logic-necessary-sufficient";

export const CT_Q1_FRONT_ALGEBRA_LOGIC_ABS: CommonTestProblemLecture = {
  id: "ct-ia-q1-front-algebra-logic-abs",
  title: "第1問前半 数と式・絶対値・命題融合",
  pdfUrl: "/problem1a/ct_algebra_logic_abs_problem.pdf",
  targetSection: "第1問〔1〕",
  subjectLabel: "数学I・数学A",
  concepts: ["数と式", "絶対値", "集合と命題", "必要条件・十分条件"],
  difficulty: "共通テスト標準〜やや難",
  estimatedTime: "18〜22分",
  goals: [
    "有理化→対称式→整数部分・小数部分の一連の流れを、途中で止まらず最後まで運ぶ",
    "絶対値不等式を、係数の符号に注意しながら区間に直す",
    "全体集合と3条件から作った部分集合の包含関係を、対偶の考え方で判定する",
    "「PはQの条件」を複数パターン聞かれても、矢印の向きだけで機械的に答える",
    "反例を1つ挙げて、命題の偽を示す",
  ],
  insights: [
    { expression: "$b=\\dfrac1a$ のように分母に無理数を含む式がある", reaction: "有理化してから、$a,b$ 単体ではなく和と積 ($a+b,\\ ab$) にまとめる" },
    { expression: "$m<a<m+1$", reaction: "整数部分の定義。根号の評価で範囲をはさみ撃ちして整数 $m$ を決める" },
    { expression: "$d>0$ と明記されている", reaction: "不等式を $d$ で割るとき、不等号の向きが変わらないことの根拠として使う" },
    { expression: "$U=\\{n\\mid n\\text{は40以下の自然数}\\}$", reaction: "全体集合の範囲を最初に確認してから、各条件を満たす要素を書き出す" },
    { expression: "$P\\cap Q,\\ P\\cap R$ のような要素数", reaction: "先に $P,Q,R$ を具体的な要素の集合として書き出し、共通部分を数える" },
    { expression: "$R\\subset Q$ のような包含関係の選択肢", reaction: "対偶の関係（$A\\subset B\\Leftrightarrow \\overline B\\subset\\overline A$）に当てはまらないか疑う" },
    { expression: "「〜であるための○条件」を複数回聞かれる", reaction: "毎回一から確認せず、1つの矢印の真偽から言い換えで答える" },
    { expression: "「反例となるものは」", reaction: "反例は1つ見つければ十分。前提が真で結論が偽になる値を探す" },
  ],
  thinkingFlow: [
    "まず $a,b$ を有理化し、和と積の形にまとめる（$a,b$ 単体を経由しない）",
    "対称式の公式で $a^2+b^2,\\ a^3+b^3$ を作る",
    "整数部分・小数部分は定義（$m\\leqq a<m+1$）に戻って範囲を決める",
    "絶対値不等式は係数の符号（$d>0$）を確認してから両辺を割り、区間にする",
    "集合の問題は全体集合の範囲を書き出し、条件ごとに部分集合を具体化する",
    "包含関係の選択肢は、対偶の言い換え（$A\\subset B\\Leftrightarrow\\overline B\\subset\\overline A$）に当てはまらないか確認する",
    "必要十分条件は「PならばQ」の真偽だけを判定し、逆向きの設問はその言い換えとして即答する",
    "反例は「条件は満たすが結論が崩れる」具体例を1つ探すだけでよい",
  ],
  explanations: [
    {
      heading: "有理化と対称式",
      body: "$b=\\dfrac1a$ を有理化し、$a+b,\\ ab$ の値をまず確定させる。$a^2+b^2,\\ a^3+b^3$ は対称式の公式で求め、$a,b$ 単体を経由しない方が速く、符号ミスも減る。",
      mathCourseLink: { label: "数と式：根号を含む式（有理化）", href: "/courses/math-1a/numbers-and-expressions/real-numbers-and-radicals" },
    },
    {
      heading: "整数部分・小数部分と絶対値不等式",
      body: "$a$ の評価から整数部分 $m$ を決め、小数部分 $d=a-m$ を作る。$1/d$ は分母の有理化をもう一度行う。$d>0$ を使った不等式 $|6-dx|\\leqq2$ は、両辺を $d$ で割る際に不等号の向きが変わらないことを確認してから区間を作る。",
      mathCourseLink: { label: "数と式：絶対値を含む式", href: "/courses/math-1a/numbers-and-expressions/absolute-value-basic" },
    },
    {
      heading: "集合 P, Q, R と包含関係",
      body: "3条件をすべて具体的な要素の集合として書き出してから、共通部分・補集合を数える。選択肢の包含関係は、対偶の関係（$A\\subset B\\Leftrightarrow\\overline B\\subset\\overline A$）になっているものを探す。",
      mathCourseLink: { label: "集合と命題：ベン図と集合の演算", href: "/courses/math-1a/sets-and-logic/set-operations-venn" },
    },
    {
      heading: "必要条件・十分条件の連続判定と反例",
      body: "「$r$ は $q$ の条件」「$q$ は $r$ の条件」のように向きを変えて何度も聞かれるが、1つの矢印の真偽が分かれば、残りはその言い換えで答えられる。最後の反例判定は、命題の前提が真・結論が偽になる値を1つ選ぶだけでよい。",
      mathCourseLink: { label: "集合と命題：必要条件・十分条件の基礎", href: "/courses/math-1a/sets-and-logic/necessary-sufficient-basic" },
    },
  ],
  mistakes: [
    { mistake: "有理化の符号を間違え、以後の対称式の値がすべて崩れる", cause: "共役を掛ける際の符号を確認していない", returnTo: { label: "数と式 中核講義：平方根と有理化", href: `${numbers}#na-radical-heading` } },
    { mistake: "絶対値不等式を割るときに不等号の向きを誤る", cause: "割る数（$d$）の符号を確認せずに機械的に割っている", returnTo: { label: "数と式 基礎講座：絶対値を含む式", href: "/courses/math-1a/numbers-and-expressions/absolute-value-basic" } },
    { mistake: "包含関係の選択肢で $A\\subset B$ と $\\overline B\\subset\\overline A$ が同じ内容だと気づけない", cause: "対偶の考え方を集合の包含関係に応用できていない", returnTo: { label: "集合と命題 中核講義：逆・裏・対偶", href: `${logic}#sl-inverse-contrapositive-heading` } },
    { mistake: "「PはQの条件」と「QはPの条件」を独立に一から確認し直す", cause: "必要条件・十分条件が1組の言い換えであることを意識していない", returnTo: { label: "集合と命題 中核講義：必要条件・十分条件", href: `${logic}#sl-necessary-sufficient-heading` } },
    { mistake: "反例を探す際、命題の前提を満たさない値を選んでしまう", cause: "反例の定義（前提が真で結論が偽になる例）を誤解している", returnTo: { label: "集合と命題 中核講義：反例の作り方", href: `${logic}#sl-counterexample-heading` } },
  ],
  relatedMathCourses: [
    { label: "数と式：根号を含む式（有理化）", href: "/courses/math-1a/numbers-and-expressions/real-numbers-and-radicals" },
    { label: "数と式：絶対値を含む式", href: "/courses/math-1a/numbers-and-expressions/absolute-value-basic" },
    { label: "集合と命題：必要条件・十分条件の基礎", href: "/courses/math-1a/sets-and-logic/necessary-sufficient-basic" },
    { label: "集合と命題：ベン図と集合の演算", href: "/courses/math-1a/sets-and-logic/set-operations-venn" },
  ],
  relatedCoreLectures: [
    { label: "数と式 徹底講座", href: numbers },
    { label: "集合と命題 判定講座", href: logic },
  ],
  relatedMocks: [
    { label: "共通テスト型本番模試 第1回 第1問", href: "/common-test/simulator/common-test-math-1a-manual-001" },
    { label: "共通テスト型本番模試 第2回 第1問", href: "/common-test/simulator/common-test-math-1a-manual-002" },
    { label: "大問型演習：数と式（3本）", href: "/common-test/practice" },
    { label: "大問型演習：集合と命題（3本）", href: "/common-test/practice" },
  ],
  nextProblemLectures: [
    { label: "第1問後半 図形と計量", href: "/common-test/problem-lectures/ct-ia-q1-back-geometry-measurement" },
  ],
};

