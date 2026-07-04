import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";

const numbers = "/common-test/lectures/numbers-expressions-core-skills";
const logic = "/common-test/lectures/sets-logic-necessary-sufficient";

export const CT_Q1_FRONT_ALGEBRA_LOGIC_ABS: CommonTestProblemLecture = {
  id: "ct-ia-q1-front-algebra-logic-abs",
  title: "第1問前半 数と式・絶対値・命題融合",
  pdfUrl: "/problem1a/ct_algebra_logic_abs_problem.pdf",
  targetSection: "第1問〔1〕",
  subjectLabel: "数学I・数学A",
  concepts: ["数と式", "有理化", "対称式", "絶対値", "集合と命題", "必要条件・十分条件", "反例"],
  difficulty: "共通テスト標準〜やや難",
  estimatedTime: "30〜35分",
  goals: [
    "根号を含む式を見たら、有理化・共役・対称式を疑える",
    "$a+b,\\ ab$ が出たら、対称式で高次式を処理できる",
    "整数部分・小数部分を、近似ではなく不等式で判断できる",
    "絶対値不等式を区間に直せる",
    "係数の正負を確認して不等号の向きを管理できる",
    "無理数を含む区間から自然数範囲を決められる",
    "集合 $P,Q,R$ を具体的に書き出せる",
    "必要条件・十分条件を矢印で判定できる",
    "反例を使って命題の真偽を判断できる",
  ],
  insights: [
    { expression: "$b=\\dfrac1a$ のように分母に無理数を含む式がある", reaction: "有理化してから、$a,b$ 単体ではなく和と積 ($a+b,\\ ab$) にまとめる" },
    { expression: "$a^2+b^2,\\ a^3+b^3$ を求めよと言われる", reaction: "$a,b$ を直接代入せず、$(a+b)^2-2ab$、$(a+b)^3-3ab(a+b)$ の対称式の公式に進む" },
    { expression: "$m<a<m+1$", reaction: "整数部分の定義。根号の評価で範囲をはさみ撃ちして整数 $m$ を決める" },
    { expression: "$d>0$ と明記されている", reaction: "不等式を $d$ で割るとき、不等号の向きが変わらないことの根拠として使う" },
    { expression: "無理数を含む区間の端点（例：$4(1+\\sqrt2)$）", reaction: "近似値でおおよその範囲をつかんでから、境界の自然数を1つずつ確認する" },
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
    "無理数を含む区間の端点を近似し、自然数 $n$ の範囲を確定する",
    "集合の問題は全体集合の範囲を書き出し、条件ごとに部分集合を具体化する",
    "包含関係の選択肢は、対偶の言い換え（$A\\subset B\\Leftrightarrow\\overline B\\subset\\overline A$）に当てはまらないか確認する",
    "必要十分条件は「PならばQ」の真偽だけを判定し、逆向きの設問はその言い換えとして即答する",
    "複合条件（$p\\land q$ など）の必要十分条件は、対応する集合どうしの包含関係を確認する",
    "反例は「条件は満たすが結論が崩れる」具体例を1つ探すだけでよい",
    "最後に、有理化・対称式・集合の要素数・矢印の向きをそれぞれ検算する",
  ],
  explanations: [
    {
      heading: "この講座のゴール",
      body:
        "この講座の目的は、この問題の空欄をすべて埋められるようにすることではない。ゴールは、根号を含む式・絶対値不等式・整数部分と小数部分・集合と命題・必要十分条件という、第1問前半で繰り返し問われる題材それぞれについて、感覚ではなく手順で確定できるようになること。\n\n根号式は近似値で誤魔化さず有理化と対称式で処理する。絶対値不等式は区間として扱う。集合は具体的に書き出す。必要条件・十分条件は矢印の向きで機械的に判定する。反例は定義（仮定が真・結論が偽）に忠実に探す。この判断体系ができれば、数値や条件が変わった別の第1問前半の問題にも同じ手順で対応できる。",
      mathCourseLink: { label: "数と式 中核講義：道具選びのフロー", href: `${numbers}#na-flow-heading` },
    },
    {
      heading: "問題文の解剖",
      body:
        "計算を始める前に、問題文から次の情報を拾っておく。\n\n- 根号を含む数 $a,b,d$。$a=1+\\sqrt2$ は与えられ、$b=1/a$ は有理化して求める、$d=a-m$ は整数部分を引いた小数部分。\n- $ab,a+b,a^2+b^2,a^3+b^3$ の流れ。$ab,a+b$ を先に確定し、そこから対称式で高次の式を作る。\n- 整数部分と小数部分。$m<a<m+1$ という定義、$d=a-m$ という定義に戻る。\n- 絶対値不等式 $|6-dx|\\leqq2$。$d$ の符号（$d>0$）を確認してから式変形する。\n- $d>0$ の確認。両辺を $d$ で割るときに不等号の向きが変わらない根拠になる。\n- 自然数 $n$ の範囲。無理数を含む区間の端点から、整数として何個入るかを数える。\n- 全体集合 $U$。「40以下の自然数」という範囲を最初に固定する。\n- 条件 $p,q,r$。それぞれ「絶対値不等式を満たす」「偶数である」「4の倍数である」という異なる性質。\n- 補集合。$\\overline P,\\overline Q,\\overline R$ の扱いと、包含関係の対偶による言い換え。\n- 必要条件・十分条件。矢印の向き（$p\\Rightarrow q$ かどうか、その逆かどうか）を4回にわたって問われる。\n- 反例として指定された自然数。$n=10$ がどの命題を崩すかを確認する。",
      mathCourseLink: { label: "数と式 中核講義：最初に見る場所", href: `${numbers}#na-first-look-heading` },
    },
    {
      heading: "第1問前半でまず何を見るべきか",
      body:
        "第1問前半の問題では、公式を思い出す前に、次の順番で状況を確認する。\n\n- ① 根号・分母の根号があるか。今回は $a=1+\\sqrt2$、$b=1/a$。\n- ② 共役な形があるか。$1/(1+\\sqrt2)$ の分母を有理化するとき、$\\sqrt2-1$ を掛ける。\n- ③ $a+b,ab$ が使えるか。$b=1/a$ なら $ab=1$ は代入なしで分かる。\n- ④ 高次式を直接展開せず、対称式で処理できるか。$a^2+b^2,a^3+b^3$ は $(a+b)^2-2ab$、$(a+b)^3-3ab(a+b)$ で求める。\n- ⑤ 整数部分・小数部分は不等式で挟めるか。$m<a<m+1$ の形に戻す。\n- ⑥ 絶対値は区間化できるか。$|6-dx|\\leqq2$ は $-2\\leqq6-dx\\leqq2$ に直す。\n- ⑦ 不等式を割るとき、係数の正負を確認したか。$d>0$ なので割っても不等号の向きは変わらない。\n- ⑧ 自然数条件では端点を含むか確認したか。無理数の端点を近似し、境界の整数を丁寧に確認する。\n- ⑨ 命題は日本語ではなく矢印に直せるか。「$r$ は $q$ の条件」は $r\\Rightarrow q$ の真偽の話に翻訳する。\n- ⑩ 反例は「仮定を満たして結論を満たさない」ものになっているか。仮定も確認せずに選ばない。",
      mathCourseLink: { label: "数と式 中核講義：道具選びのフロー", href: `${numbers}#na-flow-heading` },
    },
    {
      heading: "数と式の判断表",
      body:
        "式・条件の特徴ごとに、最初に疑う道具と目的を対応づけておく。\n\n- 分母に根号があるとき。有理化をまず疑う。計算しやすい形にするのが目的。\n- 共役な形があるとき。積を作ることをまず疑う。根号を消すのが目的。\n- $a+b,ab$ があるとき。対称式をまず疑う。高次式を簡単にするのが目的。\n- $a^2+b^2$ を求めたいとき。$(a+b)^2-2ab$ をまず疑う。展開を避けるのが目的。\n- $a^3+b^3$ を求めたいとき。$(a+b)^3-3ab(a+b)$ をまず疑う。直接展開を避けるのが目的。\n- 整数部分を求めたいとき。不等式評価をまず疑う。近似ミスを防ぐのが目的。\n- 小数部分を求めたいとき。「元の数−整数部分」をまず疑う。定義に戻るのが目的。\n- 逆数を求めたいとき。有理化・共役をまず疑う。形を整えるのが目的。\n- 絶対値不等式があるとき。区間化・場合分けをまず疑う。範囲を決めるのが目的。",
      mathCourseLink: { label: "数と式：絶対値と場合分け", href: "/courses/math-1a/numbers-and-expressions/absolute-value-basic" },
    },
    {
      heading: "命題・集合の判断表",
      body:
        "条件・集合の特徴ごとに、最初に疑う道具と目的を対応づけておく。\n\n- $p,q,r$ のような条件があるとき。条件を集合化することをまず疑う。包含関係を見るのが目的。\n- $P,Q,R$ のような集合があるとき。具体的に書き出すことをまず疑う。ミスを減らすのが目的。\n- 補集合があるとき。ド・モルガンをまず疑う。否定を整理するのが目的。\n- 「必要条件」と言われたとき。矢印の後ろ側（$q\\Rightarrow p$ の形）をまず疑う。向きを確認するのが目的。\n- 「十分条件」と言われたとき。矢印の前側（$p\\Rightarrow q$ の形）をまず疑う。向きを確認するのが目的。\n- 「必要十分条件」と言われたとき。両向きの矢印をまず疑う。同値を確認するのが目的。\n- 反例を選ぶとき。「仮定○・結論×」をまず疑う。命題を否定するのが目的。\n- 倍数条件があるとき。最小公倍数・包含関係をまず疑う。集合関係を判断するのが目的。",
      mathCourseLink: { label: "集合と命題：必要条件・十分条件", href: "/courses/math-1a/sets-and-logic/necessary-sufficient-basic" },
    },
    {
      heading: "標準解答(1) 有理化とab・a+b",
      body:
        "$a=1+\\sqrt2$、$b=\\dfrac1a$。$b$ の分母を有理化するために、共役な $\\sqrt2-1$ を分母・分子に掛ける。\n\n$$b=\\frac{1}{1+\\sqrt2}=\\frac{\\sqrt2-1}{(1+\\sqrt2)(\\sqrt2-1)}=\\frac{\\sqrt2-1}{2-1}=\\sqrt2-1$$\n\n$b=\\dfrac1a$ と定義されているので、$ab=1$ は計算するまでもなく成り立つ（検算にも使える）。実際\n\n$$ab=(1+\\sqrt2)(\\sqrt2-1)=(\\sqrt2-1)+(2-\\sqrt2)=1$$\n\nと確認できる。\n\n$$a+b=(1+\\sqrt2)+(\\sqrt2-1)=2\\sqrt2$$",
      mathCourseLink: { label: "数と式：実数と平方根（有理化）", href: "/courses/math-1a/numbers-and-expressions/real-numbers-and-radicals" },
    },
    {
      heading: "標準解答(1) a²+b²・a³+b³を対称式で求める",
      body:
        "$a,b$ を個別に2乗・3乗して展開するのではなく、$a+b=2\\sqrt2$、$ab=1$ という和と積の値から、対称式の公式で一気に求める。\n\n$$a^2+b^2=(a+b)^2-2ab=(2\\sqrt2)^2-2\\cdot1=8-2=6$$\n\n$$a^3+b^3=(a+b)^3-3ab(a+b)=(2\\sqrt2)^3-3\\cdot1\\cdot2\\sqrt2=16\\sqrt2-6\\sqrt2=10\\sqrt2$$\n\n$(2\\sqrt2)^3=8\\times(\\sqrt2)^3=8\\times2\\sqrt2=16\\sqrt2$ の計算を忘れないこと。別解として\n\n$$a^3+b^3=(a+b)(a^2-ab+b^2)=2\\sqrt2\\times(6-1)=10\\sqrt2$$\n\nでも同じ値になり、検算になる。",
      mathCourseLink: { label: "数と式：式変形の戦略（対称式）", href: "/courses/math-1a/numbers-and-expressions/expression-transformation-strategy" },
    },
    {
      heading: "なぜその方針を選ぶのか",
      body:
        "有理化するのは、分母に根号が残ったままでは、大小比較も後の対称式の計算もしづらいから。有理化して分母を有理数にすることで、以降の計算がすべて扱いやすくなる。\n\n$a,b$ を直接代入して展開しないのは、$a=1+\\sqrt2,b=\\sqrt2-1$ をそのまま2乗・3乗して展開すると、根号どうしの掛け算が増えて符号ミスが起きやすいから。$a+b,ab$ という対称な組み合わせだけを経由すれば、根号の掛け算を最小限に抑えられる。\n\n対称式にするのは、$a^2+b^2$ や $a^3+b^3$ が、$a,b$ を入れ替えても値が変わらない対称式だから。対称式は必ず $a+b,ab$ だけの式で表せるという性質があるので、公式に当てはめるだけで済む。\n\n整数部分を近似だけで決めてはいけないのは、$\\sqrt2\\approx1.41421\\ldots$ という近似値はあくまで近似だから。本当に $m<a<m+1$ を満たす整数かどうかは、不等式（$\\sqrt2$ の評価、例えば $1<\\sqrt2<2$）で証明してから確定させる必要がある。\n\n絶対値不等式を区間で見るのは、$|A|\\leqq c$ という条件が「$A$ と $0$ の距離が $c$ 以下」という意味であり、$-c\\leqq A\\leqq c$ という区間に直すことで、初めて不等式として扱えるから。\n\n自然数範囲では端点の確認が重要なのは、無理数を含む区間の端点（例えば $4(1+\\sqrt2)\\approx9.657$）は整数ではないため、その端点をまたぐ最初と最後の自然数がどれかを、近似値で慎重に確認する必要があるから。\n\n命題は日本語のままではなく矢印で見るのは、「PはQであるための○条件」という日本語は、慣れないうちは向きを取り違えやすいから。$P\\Rightarrow Q$ という矢印の式に直せば、真偽の判定は機械的にできる。\n\n集合を書き出すと必要十分条件が判断しやすいのは、$P,Q,R$ を具体的な要素の集合として書き出せば、包含関係や共通部分は数えるだけで確定するから。感覚で「たぶん成り立つ」と判断するより、確実で速い。",
      mathCourseLink: { label: "数と式 中核講義：道具選びのフロー", href: `${numbers}#na-flow-heading` },
    },
    {
      heading: "標準解答(1) 整数部分m・小数部分d・1/dの有理化",
      body:
        "$a=1+\\sqrt2$ の整数部分 $m$ を決める。$1<\\sqrt2<2$（$1^2=1<2<4=2^2$ より）なので、$2<1+\\sqrt2<3$。したがって $m<a<m+1$ を満たす整数は $m=2$。\n\n小数部分は定義通り「元の数から整数部分を引く」。\n\n$$d=a-m=(1+\\sqrt2)-2=\\sqrt2-1$$\n\n（これは $b$ と同じ値になっている。$b=1/a$ かつ $d=a-m$ という別々の定義から出発したが、$a=1+\\sqrt2$ という具体的な数のもとでは、たまたま同じ値 $\\sqrt2-1$ になる。）\n\n$1/d$ は、$d=\\sqrt2-1$ の分母を有理化する（$b$ の有理化と同じ手順）。\n\n$$\\frac1d=\\frac{1}{\\sqrt2-1}=\\frac{\\sqrt2+1}{(\\sqrt2-1)(\\sqrt2+1)}=\\frac{\\sqrt2+1}{2-1}=\\sqrt2+1$$",
      mathCourseLink: { label: "数と式 中核講義：整数部分の判断", href: `${numbers}#na-integer-part-heading` },
    },
    {
      heading: "標準解答(1) 絶対値不等式を区間に直し、自然数nの範囲を決める",
      body:
        "不等式 $|6-dx|\\leqq2$ を考える。絶対値の定義より\n\n$$-2\\leqq6-dx\\leqq2$$\n\n各辺から $6$ を引くと\n\n$$-8\\leqq-dx\\leqq-4$$\n\n$-1$ を掛けると不等号の向きが反転して\n\n$$4\\leqq dx\\leqq8$$\n\n$d>0$ なので、各辺を $d$ で割っても不等号の向きは変わらない。\n\n$$\\frac4d\\leqq x\\leqq\\frac8d$$\n\n$\\dfrac1d=\\sqrt2+1=1+\\sqrt2$（標準解答で求めた通り）を代入すると\n\n$$4(1+\\sqrt2)\\leqq x\\leqq8(1+\\sqrt2)$$\n\nここで、自然数 $n$ がこの範囲に入る個数を求める。$\\sqrt2\\approx1.41421$ として近似すると\n\n$$4(1+\\sqrt2)\\approx4\\times2.41421\\approx9.657,\\qquad8(1+\\sqrt2)\\approx8\\times2.41421\\approx19.31$$\n\nただし、この近似はあくまで「境界がどのあたりか」を掴むためのものであり、実際に境界の整数が範囲に入るかどうかは不等式で確認する必要がある。$9.657\\ldots$ は $9$ と $10$ の間なので、範囲に入る最小の自然数は $10$。$19.31\\ldots$ は $19$ と $20$ の間なので、範囲に入る最大の自然数は $19$。\n\n$$10\\leqq n\\leqq19$$\n\nこの範囲に含まれる自然数の個数は $19-10+1=10$ 個。",
      mathCourseLink: { label: "数と式：絶対値と場合分け", href: "/courses/math-1a/numbers-and-expressions/absolute-value-basic" },
    },
    {
      heading: "標準解答(2) 集合P,Q,Rの具体化と要素数",
      body:
        "全体集合 $U=\\{n\\mid n\\text{は40以下の自然数}\\}$。条件 $p,q,r$ から作られる部分集合を、それぞれ具体的な要素の集合として書き出す。\n\n- $P$（$p$：$|6-dn|\\leqq2$ を満たす）。先ほど求めた範囲から $P=\\{10,11,\\ldots,19\\}$（10個）。\n- $Q$（$q$：偶数）。$Q=\\{2,4,6,\\ldots,40\\}$（20個）。\n- $R$（$r$：4の倍数）。$R=\\{4,8,12,\\ldots,40\\}$（10個）。\n\nこれらを具体的に書き出したうえで、共通部分を数える。\n\n$P\\cap Q$ は、$P=\\{10,\\ldots,19\\}$ のうち偶数のものなので\n\n$$P\\cap Q=\\{10,12,14,16,18\\}\\quad(5\\text{個})$$\n\n$P\\cap R$ は、$P$ のうち4の倍数のものなので\n\n$$P\\cap R=\\{12,16\\}\\quad(2\\text{個})$$\n\n$P\\cap Q\\cap\\overline R$ は、$P\\cap Q=\\{10,12,14,16,18\\}$ のうち4の倍数（$R$の要素）を除いたものなので\n\n$$P\\cap Q\\cap\\overline R=\\{10,14,18\\}\\quad(3\\text{個})$$\n\n（$12,16$ は $P\\cap R$ の要素でもあり、4の倍数なので $\\overline R$ からは除かれる。）",
      mathCourseLink: { label: "集合と命題：集合の演算とベン図", href: "/courses/math-1a/sets-and-logic/set-operations-venn" },
    },
    {
      heading: "標準解答(2) 集合の包含関係の選択肢判定",
      body:
        "選択肢を1つずつ確認する。\n\n⓪「$R\\subset Q$」。4の倍数は必ず偶数なので、$R$ の要素はすべて $Q$ の要素。正しい。\n\n①「$Q\\subset R$」。偶数がすべて4の倍数とは限らない（例えば $2$ は偶数だが4の倍数ではない）。誤り。\n\n②「$P\\cap Q\\subset R$」。$P\\cap Q=\\{10,12,14,16,18\\}$ のうち、$10,14,18$ は4の倍数ではないので $R$ に含まれない。誤り。\n\n③「$\\overline R\\subset\\overline Q$」。$R\\subset Q$（⓪より正しい）なので、対偶の関係から成り立つのは $\\overline Q\\subset\\overline R$ の向きであり、$\\overline R\\subset\\overline Q$ は逆向き。実際、$2$ は $\\overline R$（4の倍数でない）の要素だが、$2$ は偶数なので $\\overline Q$（奇数）の要素ではない。誤り。\n\n④「$\\overline Q\\subset\\overline R$」。$R\\subset Q$ の対偶の関係そのもの。奇数（$\\overline Q$ の要素）は必ず偶数でないので4の倍数でもなく、$\\overline R$ の要素になる。正しい。\n\nしたがって正しいのは⓪と④。この2つは「$R\\subset Q$」とその対偶「$\\overline Q\\subset\\overline R$」という、論理的に同じ内容を表す1組のペアになっている。",
      mathCourseLink: { label: "集合と命題：対偶と証明", href: "/courses/math-1a/sets-and-logic/contrapositive-and-proof" },
    },
    {
      heading: "標準解答(3) 必要条件・十分条件の連続判定と反例",
      body:
        "4つの条件文を、矢印の向きに直して1つずつ判定する。$R\\subset Q$（$r\\Rightarrow q$ が真）であることを土台に使う。\n\n「$r$ であることは $q$ であるための___」　$r\\Rightarrow q$（$R\\subset Q$）は真、$q\\Rightarrow r$ は偽（$Q\\subset R$ は誤りだったので）。よって $r$ は $q$ であるための十分条件であるが必要条件ではない。\n\n「$q$ であることは $r$ であるための___」　向きを入れ替えただけで、中身は同じ1本の矢印（$r\\Rightarrow q$）についての言い換え。$q\\Rightarrow r$ は偽、$r\\Rightarrow q$ は真なので、$q$ は $r$ であるための必要条件であるが十分条件ではない。\n\n「$p$ かつ $q$ であることは $r$ であるための___」　$(p\\land q)\\Rightarrow r$ か確認する。$P\\cap Q=\\{10,12,14,16,18\\}$ は $R$ の部分集合ではない（$10,14,18$ が反例）ので偽。逆に $r\\Rightarrow(p\\land q)$ も、$R$ には $P$ の範囲外の要素（$4,8,20,\\ldots$）が含まれるので偽。どちらの向きも成り立たないので必要条件でも十分条件でもない。\n\n「$p$ かつ $r$ であることは $p$ かつ $q$ であるための___」　$P\\cap R=\\{12,16\\}$、$P\\cap Q=\\{10,12,14,16,18\\}$。$P\\cap R\\subset P\\cap Q$（$12,16$ はどちらも $P\\cap Q$ の要素）なので $(p\\land r)\\Rightarrow(p\\land q)$ は真。逆の $(p\\land q)\\Rightarrow(p\\land r)$ は、$10,14,18$ が反例になるので偽。よって $p$ かつ $r$ は、$p$ かつ $q$ であるための十分条件であるが必要条件ではない。\n\n最後に、$n=10$ が反例となる命題を選ぶ。$n=10$ では $p=$真（$P$の要素）、$q=$真（偶数）、$r=$偽（4の倍数ではない）。\n\n- ⓪$p\\Rightarrow q$：真$\\Rightarrow$真で成立。反例にならない。\n- ①$q\\Rightarrow p$：真$\\Rightarrow$真で成立（この命題自体は $n=2$ などで偽になるが、$n=10$ では成立するので反例にはならない）。\n- ②$(p\\land q)\\Rightarrow r$：真$\\Rightarrow$偽で不成立。これが反例。\n- ③$r\\Rightarrow q$：仮定が偽なので命題全体は真（空虚な真）。反例にならない。\n- ④$(p\\land r)\\Rightarrow q$：仮定（$p\\land r$）が偽なので真。反例にならない。\n\nしたがって、$n=10$ が反例となるのは②$(p\\land q)\\Rightarrow r$。これは直前の「$p$ かつ $q$ であることは $r$ であるための条件」の判定で、$(p\\land q)\\Rightarrow r$ が偽であることの根拠とした反例（$n=10,14,18$）の1つと完全に対応している。",
      mathCourseLink: { label: "集合と命題 中核講義：反例の作り方", href: `${logic}#sl-counterexample-heading` },
    },
    {
      heading: "捨てるべき方針",
      body:
        "本番では、正しい方針を選ぶだけでなく、遠回りや事故のもとになる方針を捨てる判断も点数になる。\n\n- 根号式を小数近似だけで処理する。$\\sqrt2\\approx1.41421$ という近似値は目安であり、整数部分や自然数範囲の境界判定は不等式で証明する。\n- $a^3+b^3$ を直接展開する。$a,b$ を個別に3乗して展開すると、根号どうしの積が増えて計算量とミスが増える。\n- 絶対値を符号確認なしに外す。$|6-dx|\\leqq2$ を $6-dx\\leqq2$ のように一方の不等式だけで済ませない。\n- $d>0$ を確認しない。不等式を $d$ で割る際、符号を確認しないと不等号の向きを誤る。\n- 無理数端点を雑に丸める。$4(1+\\sqrt2)$ を「だいたい$10$」のように丸めると、境界の自然数を1つずらしてしまう。\n- 自然数範囲で端点を落とす。範囲に入るかどうかギリギリの整数を、確認せずに除外・追加してしまう。\n- 集合を書き出さずに必要十分条件を感覚で判断する。$P,Q,R$ を具体的に書き出せば一瞬で確認できることを、印象だけで済ませようとする。\n- 反例で「仮定を満たすか」を確認しない。結論が偽であることだけを見て、仮定も真であるかを確認し忘れる。\n- 補集合の向きを取り違える。$A\\subset B$ の対偶は $\\overline B\\subset\\overline A$ であり、$\\overline A\\subset\\overline B$ ではない。",
      mathCourseLink: { label: "数と式 中核講義：ミス回収", href: `${numbers}#na-mistake-recovery` },
    },
    {
      heading: "別解・見方の比較",
      body:
        "同じ問題でも、着目する視点を変えると計算量やミスの起きやすさが変わる。\n\n- 別視点A：対称式中心（標準解答で採用）。$a+b,ab$ から高次式を処理する。使える場面は「$a,b$ が対称な役割を持つ式（$a^2+b^2,a^3+b^3$ など）を求めたい」とき。今回のように $a,b$ が根号を含む場合、この方法が最も速く、符号ミスも少ない。\n- 別視点B：漸化式的に見る。$a,b$ が同じ二次方程式の解であることを使い、累乗和を再帰的に求める。$a,b$ は $t^2-(a+b)t+ab=0$、つまり $t^2-2\\sqrt2t+1=0$ の解なので、$a^{n+1}+b^{n+1}=(a+b)(a^n+b^n)-ab(a^{n-1}+b^{n-1})$ という漸化式を使えば、$a^2+b^2,a^3+b^3,a^4+b^4,\\ldots$ と芋づる式に求められる。使える場面は「4乗以上の高次の累乗和まで求めたい」とき。今回は3乗までなので対称式公式で十分だが、次数が上がるほどこちらが有利になる。\n- 別視点C：不等式評価中心。整数部分・自然数範囲を、近似ではなく不等式で決める。使える場面は「整数部分・小数部分、または無理数を含む区間から整数の個数を数えたい」とき。今回の $m$ の決定や自然数 $n$ の範囲の確定はこの型そのもの。近似値は「あたりをつける」ためだけに使い、最終判断は不等式で行う。\n- 別視点D：集合を書き出す方法。$P,Q,R$ を具体的に列挙して、必要十分条件を判断する。使える場面は「全体集合が小さく、要素を書き出しても手間が大きくない」とき。今回は $U$ が40個の自然数なので、$P,Q,R$ を書き出すのは十分現実的で、感覚的な判断より確実。全体集合が大きくなる場合は、書き出さずに倍数条件や剰余の性質から議論する必要がある。\n\n今回の問題全体では、(1)は別視点A（対称式）と別視点C（不等式評価）の組み合わせ、(2)(3)は別視点D（集合を書き出す）が最も速く、確実になる。",
      mathCourseLink: { label: "数と式 中核講義", href: numbers },
    },
    {
      heading: "場合が変わったときの対処法",
      body:
        "今回の問題は「有理化→対称式→整数部分→絶対値不等式→集合→必要十分条件」という融合型だが、出題形式が変わっても考え方の骨格は同じである。\n\n- 場合A：共役な根号式がある（今回の $b=1/a$ の有理化がこの型）。積を作って根号を消す。$a+b,ab$ を優先し、$a,b$ 単体は経由しない。\n- 場合B：高次式が出る（今回の $a^2+b^2,a^3+b^3$ がこの型）。直接展開しない。対称式や漸化式を使う。偶数乗・奇数乗で形が変わることに注意する（例えば $a^4+b^4$ は $(a^2+b^2)^2-2(ab)^2$ のように、1段階多く計算する）。\n- 場合C：整数部分・小数部分（今回の $m,d$ がこの型）。まず不等式で挟む。小数部分は元の数から整数部分を引く。逆数や二乗で値の範囲が変わるときに注意する（$d$ は $0<d<1$ だが、$1/d$ は $1$ より大きくなる、など）。\n- 場合D：絶対値不等式（今回の $|6-dx|\\leqq2$ がこの型）。$|A|\\leqq c$ は $-c\\leqq A\\leqq c$。$|A|\\geqq c$ は外側の範囲（$A\\leqq-c$ または $A\\geqq c$）。係数で割るときは正負を確認する。\n- 場合E：自然数範囲を決める（今回の $n$ の範囲がこの型）。端点を含むか確認する。厳密な不等号か等号付きか確認する。無理数端点では整数の始まりと終わりを慎重に見る。\n- 場合F：集合・倍数条件（今回の $P,Q,R$ がこの型）。最小公倍数で共通部分を見る。包含関係で必要十分条件を判断する。補集合はド・モルガンを使う。\n- 場合G：命題・必要十分条件（今回の4つの条件判定がこの型）。「$P$ は $Q$ であるための十分条件」なら $P\\Rightarrow Q$。「$P$ は $Q$ であるための必要条件」なら $Q\\Rightarrow P$。必要十分条件は両向き。反例は仮定を満たし結論を満たさないもの。",
      mathCourseLink: { label: "集合と命題 中核講義：道具選びのフロー", href: `${logic}#sl-flow-heading` },
    },
    {
      heading: "検算方法",
      body:
        "答えを出したら、次の観点で検算する。\n\n- 有理化したものを元の式に戻せるか。$b=\\sqrt2-1$ に $a=1+\\sqrt2$ を掛けて $ab=1$ になるか確認する。\n- $ab=1$ などの関係と一致するか。$b=1/a$ という定義から $ab=1$ は自明なので、計算結果と一致するか照合する。\n- $a+b,ab$ から出した高次式が符号感と合うか。$a^3+b^3=10\\sqrt2>0$ であり、$a,b$ がともに正なので符号は妥当。\n- 整数部分が近似値と矛盾しないか。$a=1+\\sqrt2\\approx2.414$ なので $m=2$ は妥当。\n- 絶対値不等式の範囲を端点で代入して確認する。$x=4/d$ のとき $6-dx=6-4=2$ となり $|2|=2\\leqq2$ を満たすか確認する。\n- 自然数範囲の最初と最後を代入する。$n=10,19$ がそれぞれ $|6-dn|\\leqq2$ を満たし、$n=9,20$ は満たさないことを確認する。\n- 集合 $P,Q,R$ を実際に書き出して個数を確認する。$P$ は10個、$Q$ は20個、$R$ は10個になっているか数える。\n- 必要十分条件は矢印の向きで再確認する。「十分条件」と答えたら$\\Rightarrow$の向き、「必要条件」と答えたら逆向きの真偽を再度確認する。\n- 反例の自然数が本当に仮定を満たしているか確認する。$n=10$ が $(p\\land q)$ を満たし、$r$ を満たさないことを再確認する。",
      mathCourseLink: { label: "数と式 中核講義：チェックリスト", href: `${numbers}#na-cautions-heading` },
    },
    {
      heading: "変形問題への橋渡し",
      body:
        "この講座を読んだ後に対応できるようになってほしい変形パターンは次の通り。\n\n- 有理化と共役式。\n- 対称式で累乗和を求める問題。\n- 整数部分・小数部分。\n- 絶対値不等式。\n- 無理数を含む整数範囲。\n- 倍数条件と集合。\n- 補集合・ド・モルガン。\n- 必要十分条件。\n- 反例を選ぶ問題。\n- 数と式から命題へ接続する融合問題。\n\nつまり、今回の問題は1つの数値専用の解き方ではなく、「根号式・整数部分・絶対値不等式・集合・命題を、感覚ではなく手順で確定する」という体系の入口である。",
      mathCourseLink: { label: "数と式 中核講義", href: numbers },
    },
    {
      heading: "MATH講座への戻り先",
      body:
        "基礎が不安なところがあれば、MATHタブの対応講座に戻って確認する。\n\n- 根号を含む式・有理化が不安なら「実数と平方根」で、分母の有理化から確認する。\n- 対称式が不安なら「式変形の戦略」で、和と積から高次式を整理する考え方を復習する。\n- 絶対値が不安なら「絶対値と場合分け」で、中身の符号による式の切り替えを復習する。\n- 不等式の基本が不安なら「一次方程式と一次不等式」から確認する。\n- 集合の基本が不安なら「集合とは何か」から確認する。\n- 集合の演算（共通部分・補集合）が不安なら「集合の演算とベン図」で復習する。\n- 命題・反例が不安なら「命題と真偽」で、反例の作り方を含めて復習する。\n- 必要条件・十分条件が不安なら「必要条件・十分条件」に戻る。\n- 対偶の考え方が不安なら「対偶と証明」で、$A\\subset B\\Leftrightarrow\\overline B\\subset\\overline A$ の関係を復習する。\n- 整数部分・小数部分については、MATHタブに単元別の専用講座がまだない。「実数と平方根」で学ぶ無理数の評価（$1<\\sqrt2<2$ のような不等式評価）がそのまま整数部分の決定につながるので、専用講座が追加されるまでは、この解説内の計算過程を参考にしてほしい。",
      mathCourseLink: { label: "数と式：実数と平方根", href: "/courses/math-1a/numbers-and-expressions/real-numbers-and-radicals" },
    },
  ],
  mistakes: [
    {
      mistake: "有理化で符号を間違える",
      cause: "共役を掛ける際、$(\\sqrt2-1)$ を掛けるべきところを $(\\sqrt2+1)$ にするなど、符号を確認せずに計算している。",
      returnTo: { label: "数と式：実数と平方根", href: "/courses/math-1a/numbers-and-expressions/real-numbers-and-radicals" },
    },
    {
      mistake: "$a^3+b^3$ の公式を間違える",
      cause: "$(a+b)^3-3ab(a+b)$ を $(a+b)^3-3ab$ のように、$(a+b)$ を掛け忘れている。",
      returnTo: { label: "数と式：式変形の戦略（対称式）", href: "/courses/math-1a/numbers-and-expressions/expression-transformation-strategy" },
    },
    {
      mistake: "整数部分を近似だけで決める",
      cause: "$\\sqrt2\\approx1.41421$ という近似値だけを根拠にし、$1<\\sqrt2<2$ のような不等式による証明を省いている。",
      returnTo: { label: "数と式 中核講義：整数部分の判断", href: `${numbers}#na-integer-part-heading` },
    },
    {
      mistake: "小数部分を整数部分と取り違える",
      cause: "$d=a-m$ という定義を忘れ、$d$ に $m$ の値やその他の値を代入してしまっている。",
      returnTo: { label: "数と式 中核講義：整数部分の判断", href: `${numbers}#na-integer-part-heading` },
    },
    {
      mistake: "絶対値不等式で範囲を逆にする",
      cause: "$|A|\\leqq c$ を $-c\\leqq A\\leqq c$ に直す際、不等号の向きや端点を取り違えている。",
      returnTo: { label: "数と式：絶対値と場合分け", href: "/courses/math-1a/numbers-and-expressions/absolute-value-basic" },
    },
    {
      mistake: "正負確認なしに不等式を割る",
      cause: "$d$ で両辺を割る際、$d>0$ であることを確認せずに、不等号の向きをそのままにしている（または逆にしてしまう）。",
      returnTo: { label: "数と式 中核講義：道具選びのフロー", href: `${numbers}#na-flow-heading` },
    },
    {
      mistake: "無理数端点の自然数範囲を1つずらす",
      cause: "$4(1+\\sqrt2)\\approx9.657$ のような端点を「$10$」のように丸めてしまい、境界の自然数を1つ多く・少なく数えている。",
      returnTo: { label: "数と式 中核講義：整数部分の判断", href: `${numbers}#na-integer-part-heading` },
    },
    {
      mistake: "補集合の関係を逆にする",
      cause: "$R\\subset Q$ の対偶が $\\overline Q\\subset\\overline R$ であることを確認せず、$\\overline R\\subset\\overline Q$ のように向きを逆にしている。",
      returnTo: { label: "集合と命題：対偶と証明", href: "/courses/math-1a/sets-and-logic/contrapositive-and-proof" },
    },
    {
      mistake: "必要条件・十分条件を逆に読む",
      cause: "「$P$ は $Q$ であるための十分条件」を $Q\\Rightarrow P$ と読むなど、矢印の向きを逆にしている。",
      returnTo: { label: "集合と命題：必要条件・十分条件", href: "/courses/math-1a/sets-and-logic/necessary-sufficient-basic" },
    },
    {
      mistake: "反例で仮定と結論の確認をしない",
      cause: "結論が偽であることだけを見て、その値が本当に仮定（前提条件）を満たしているかを確認していない。",
      returnTo: { label: "集合と命題：命題と真偽", href: "/courses/math-1a/sets-and-logic/proposition-basic" },
    },
  ],
  relatedMathCourses: [
    { label: "数と式：実数と平方根（有理化）", href: "/courses/math-1a/numbers-and-expressions/real-numbers-and-radicals" },
    { label: "数と式：式変形の戦略（対称式の考え方を含む）", href: "/courses/math-1a/numbers-and-expressions/expression-transformation-strategy" },
    { label: "数と式：絶対値と場合分け", href: "/courses/math-1a/numbers-and-expressions/absolute-value-basic" },
    { label: "数と式：一次方程式と一次不等式", href: "/courses/math-1a/numbers-and-expressions/linear-equations-inequalities" },
    { label: "集合と命題：集合とは何か", href: "/courses/math-1a/sets-and-logic/set-basics" },
    { label: "集合と命題：命題と真偽（反例の使い方を含む）", href: "/courses/math-1a/sets-and-logic/proposition-basic" },
    { label: "集合と命題：必要条件・十分条件", href: "/courses/math-1a/sets-and-logic/necessary-sufficient-basic" },
    { label: "集合と命題：集合の演算とベン図", href: "/courses/math-1a/sets-and-logic/set-operations-venn" },
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
