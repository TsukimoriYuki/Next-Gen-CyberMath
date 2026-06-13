import type { CourseLesson, CourseUnit } from "@/types/course";

const STATISTICS_BEGINNER: CourseLesson[] = [
{
lessonId: "statistical-inference-overview",
lessonTitle: "統計的な推測とは何か",
lessonDescription: "標本から母集団を推測する考え方を理解し、母平均・標本平均・無作為抽出の意味を整理する。",
level: "beginner",
estimatedMinutes: 60,
prerequisites: ["データの分析", "平均", "分散・標準偏差"],
goals: [
"母集団と標本の違いを説明できる",
"標本から母集団を推測する考え方を理解できる",
"無作為抽出の意味を説明できる",
"母平均と標本平均を区別できる",
"推定・検定に進む土台を作れる",
],
lessonBlocks: [
{
kind: "intro",
title: "全部を調べられないときに標本で考える",
body: "統計的な推測とは、全体をすべて調べる代わりに、一部のデータから全体の性質を推測する方法です。\n\n例えば、全国の高校生全員の平均睡眠時間を知りたいとします。\n\n全員を調べるのは大変なので、一部の高校生を選んで調査し、その結果から全体を推測します。\n\nこのとき、調べたい全体を母集団、実際に取り出した一部を標本といいます。\n\n統計的な推測では、標本が母集団をどれくらい代表しているかが重要です。",
},
{
kind: "comparisonTable",
title: "母集団と標本",
body: "統計的推測では、全体と一部を区別します。",
columns: ["用語", "意味", "例"],
rows: [
{
cells: ["母集団", "調べたい全体", "全国の高校生全員"],
highlight: true,
},
{
cells: ["標本", "実際に調べた一部", "抽出した1000人の高校生"],
},
{
cells: ["母平均", "母集団全体の平均", "全国全体の平均睡眠時間"],
},
{
cells: ["標本平均", "標本から計算した平均", "1000人の平均睡眠時間"],
},
],
},
{
kind: "concept",
title: "無作為抽出",
body: "標本を選ぶときは、偏りがないように選ぶことが大切です。\n\nこのために、母集団からランダムに標本を選ぶ方法を無作為抽出といいます。\n\n例えば、成績のよい人だけを選んだり、特定の地域だけを選んだりすると、標本に偏りが出ます。\n\n標本に偏りがあると、標本平均から母平均を正しく推測しにくくなります。",
},
{
kind: "concept",
title: "標本平均は母平均の近似",
body: "標本平均は、母平均そのものではありません。\n\nしかし、標本が十分に大きく、無作為に選ばれていれば、標本平均は母平均に近い値になると期待できます。\n\nこの考え方が、推定の基本です。\n\nただし、標本を取り直すと標本平均は少し変わります。\n\nこのばらつきを考えることが、統計的な推測の核心です。",
},
{
kind: "workedExample",
title: "例1：母集団と標本を区別する",
body: "ある学校の全校生徒800人の平均身長を知りたいとします。\n\nしかし、全員を測るのは大変なので、80人を無作為に選んで身長を測りました。\n\nこのとき、母集団は全校生徒800人です。\n\n標本は実際に測った80人です。\n\n全校生徒800人の平均身長が母平均、80人の平均身長が標本平均です。",
},
{
kind: "commonMistake",
title: "よくあるミス：標本平均を母平均そのものと思う",
body: "標本平均は、あくまで標本から計算した値です。\n\n母平均と完全に同じとは限りません。\n\n標本を取り直すと、標本平均は変わる可能性があります。\n\n統計的な推測では、このずれやばらつきを前提にして、どれくらい信頼できるかを考えます。",
},
{
kind: "summary",
title: "まとめ",
body: "- 統計的な推測は標本から母集団を推測する方法\n- 母集団は調べたい全体\n- 標本は実際に調べた一部\n- 無作為抽出で偏りを減らす\n- 標本平均は母平均の近似\n- 標本平均にはばらつきがある\n- 推定や検定では、このばらつきを考える",
},
],
checkQuestions: [
{
question: "調べたい全体を何というか。",
answer: "母集団。",
hint: "標本を取り出すもとの全体。",
},
{
question: "母集団から偏りなく標本を選ぶ方法を何というか。",
answer: "無作為抽出。",
hint: "ランダムに選ぶ方法。",
},
{
question: "標本平均と母平均は必ず一致するか。",
answer: "必ず一致するとは限らない。標本平均は標本から計算した近似値だから。",
hint: "標本を取り直すと平均は変わる。",
},
],
relatedPracticeLinks: [
{ label: "統計的推測 基礎演習", href: "/units/statistics", description: "母集団と標本の基本" },
{ label: "データの分析", href: "/courses/math-1a/data-analysis", description: "平均・分散の復習" },
],
qualityTags: ["統計的推測", "母集団", "標本", "確認問題3問"],
},
{
lessonId: "random-variables-basic",
lessonTitle: "確率変数と確率分布",
lessonDescription: "確率変数・確率分布・期待値・分散の基本を整理し、推測統計の土台を作る。",
level: "beginner",
estimatedMinutes: 70,
prerequisites: ["確率", "平均", "分散"],
goals: [
"確率変数の意味を説明できる",
"確率分布を表で整理できる",
"期待値を計算できる",
"分散と標準偏差の意味を理解できる",
"二項分布や正規分布に進む準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "確率変数は結果を数値で表すもの",
body: "確率変数とは、偶然によって決まる値を表す変数です。\n\n例えば、さいころを1回投げて出た目を $X$ とすれば、$X$ は $1,2,3,4,5,6$ のいずれかを取る確率変数です。\n\nどの値をどの確率で取るかを整理したものを確率分布といいます。\n\n統計的な推測では、標本平均なども確率変数として考えます。",
},
{
kind: "concept",
title: "確率分布",
body: "確率変数 $X$ がどの値をどの確率で取るかを表したものを確率分布といいます。\n\n例えば、さいころの出た目 $X$ では、$1$ から $6$ までの値をそれぞれ確率 $\\frac{1}{6}$ で取ります。\n\n確率分布を表で整理すると、期待値や分散を計算しやすくなります。",
},
{
kind: "comparisonTable",
title: "さいころ1回の確率分布",
body: "出た目を確率変数 $X$ とします。",
columns: ["$X$", "$1$", "$2$", "$3$", "$4$", "$5$", "$6$"],
rows: [
{
cells: ["確率", "$\\frac{1}{6}$", "$\\frac{1}{6}$", "$\\frac{1}{6}$", "$\\frac{1}{6}$", "$\\frac{1}{6}$", "$\\frac{1}{6}$"],
highlight: true,
},
],
},
{
kind: "formula",
title: "期待値",
body: "確率変数 $X$ が値 $x_i$ を確率 $p_i$ で取るとき、期待値は次のように求めます。",
formula: "E(X)=\\sum x_i p_i",
},
{
kind: "workedExample",
title: "例1：さいころの期待値",
body: "さいころを1回投げたときの出た目 $X$ の期待値を求めます。\n\n$X$ は $1,2,3,4,5,6$ をそれぞれ確率 $\\frac{1}{6}$ で取ります。\n\nしたがって、\n\n$E(X)=1\\cdot\\frac{1}{6}+2\\cdot\\frac{1}{6}+3\\cdot\\frac{1}{6}+4\\cdot\\frac{1}{6}+5\\cdot\\frac{1}{6}+6\\cdot\\frac{1}{6}$\n\n$=\\frac{21}{6}=3.5$\n\nです。\n\n期待値は、長い目で見た平均のような値です。",
},
{
kind: "formula",
title: "分散",
body: "分散は、確率変数の値が期待値からどれくらいばらつくかを表します。",
formula: "V(X)=E\{(X-E(X))^2\}",
},
{
kind: "concept",
title: "標準偏差",
body: "分散はばらつきの大きさを表しますが、単位が2乗になります。\n\nそこで、分散の平方根を取ったものを標準偏差といいます。\n\n標準偏差は、元のデータと同じ単位でばらつきを表せます。\n\n統計的推測では、標準偏差が大きいほど標本平均もばらつきやすくなります。",
},
{
kind: "commonMistake",
title: "よくあるミス：期待値を最も起こりやすい値と思う",
body: "期待値は、必ずしも最も起こりやすい値ではありません。\n\nさいころの期待値は $3.5$ ですが、実際に $3.5$ の目は出ません。\n\n期待値は、確率を重みとして平均した値です。\n\n「長い回数で見た平均」と考えると理解しやすくなります。",
},
{
kind: "summary",
title: "まとめ",
body: "- 確率変数は偶然によって決まる値\n- 確率分布は値と確率の対応\n- 期待値は確率で重みづけした平均\n- 分散は期待値からのばらつき\n- 標準偏差は分散の平方根\n- 期待値は最頻値とは限らない",
},
],
checkQuestions: [
{
question: "確率変数とは何か。",
answer: "偶然によって値が決まる変数。",
hint: "さいころの出た目など。",
},
{
question: "期待値 $E(X)$ の計算式を答えよ。",
answer: "$E(X)=\\sum x_i p_i$。",
hint: "値×確率を足す。",
},
{
question: "分散の平方根を何というか。",
answer: "標準偏差。",
hint: "ばらつきを元の単位で表す。",
},
],
relatedPracticeLinks: [
{ label: "確率変数 演習", href: "/units/statistics", description: "期待値・分散の基本" },
{ label: "場合の数と確率", href: "/courses/math-1a/counting-probability", description: "確率の復習" },
],
qualityTags: ["確率変数", "確率分布", "期待値", "確認問題3問"],
},
{
lessonId: "binomial-distribution-basic",
lessonTitle: "二項分布",
lessonDescription: "独立な試行の成功回数として二項分布を理解し、確率・期待値・分散を求める。",
level: "beginner",
estimatedMinutes: 75,
prerequisites: ["確率変数と確率分布", "反復試行の確率", "組合せ"],
goals: [
"二項分布の意味を説明できる",
"成功回数の確率を計算できる",
"二項分布の期待値を求められる",
"二項分布の分散を求められる",
"正規分布による近似に進む準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "成功回数を表す分布",
body: "二項分布は、同じ試行を何回も繰り返したときの成功回数を表す確率分布です。\n\n例えば、成功確率が $p$ の試行を $n$ 回行い、成功した回数を $X$ とします。\n\nこのとき、$X$ は二項分布に従うといいます。\n\nコイン投げで表が出る回数、問題に正解する回数、不良品が出る個数などが例です。",
},
{
kind: "formula",
title: "二項分布の確率",
body: "成功確率 $p$ の試行を $n$ 回行い、成功回数を $X$ とすると、$X=k$ となる確率は次のようになります。",
formula: "P(X=k)={}_nC_k p^k(1-p)^{n-k}",
},
{
kind: "workedExample",
title: "例1：二項分布の確率",
body: "コインを4回投げ、表が出る回数を $X$ とします。表がちょうど2回出る確率を求めます。\n\n成功確率は $p=\\frac{1}{2}$、試行回数は $n=4$ です。\n\n二項分布の公式より、\n\n$P(X=2)={}_4C_2\\left(\\frac{1}{2}\\right)^2\\left(\\frac{1}{2}\\right)^2$\n\n$=6\\cdot\\frac{1}{16}=\\frac{3}{8}$\n\nです。",
},
{
kind: "formula",
title: "二項分布の期待値と分散",
body: "$X$ が二項分布 $B(n,p)$ に従うとき、期待値と分散は次のようになります。",
formula: "E(X)=np,\\quad V(X)=np(1-p)",
},
{
kind: "workedExample",
title: "例2：期待値と分散",
body: "成功確率が $0.3$ の試行を10回行い、成功回数を $X$ とします。\n\nこのとき、$X$ は二項分布 $B(10,0.3)$ に従います。\n\n期待値は、\n\n$E(X)=np=10\\cdot0.3=3$\n\nです。\n\n分散は、\n\n$V(X)=np(1-p)=10\\cdot0.3\\cdot0.7=2.1$\n\nです。\n\n成功回数の平均は3回程度と考えられます。",
},
{
kind: "comparisonTable",
title: "二項分布で見るもの",
body: "二項分布では、成功回数に注目します。",
columns: ["記号", "意味", "例"],
rows: [
{
cells: ["$n$", "試行回数", "コインを4回投げる"],
highlight: true,
},
{
cells: ["$p$", "成功確率", "表が出る確率 $\\frac{1}{2}$"],
},
{
cells: ["$X$", "成功回数", "表が出た回数"],
},
{
cells: ["$B(n,p)$", "二項分布", "$B(4,\\frac{1}{2})$"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：組合せを忘れる",
body: "二項分布の確率では、成功する位置の選び方を考える必要があります。\n\n例えば、4回中2回成功する場合、成功する2回の位置は ${}_4C_2$ 通りあります。\n\n単に $p^2(1-p)^2$ とするだけでは、順番の違いを数えていません。\n\n必ず組合せ ${}_nC_k$ を掛けることを忘れないようにしましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 二項分布は成功回数の分布\n- $X\\sim B(n,p)$ と表す\n- $P(X=k)={}_nC_kp^k(1-p)^{n-k}$\n- 期待値は $np$\n- 分散は $np(1-p)$\n- 成功する位置の組合せを忘れない",
},
],
checkQuestions: [
{
question: "成功確率 $p$ の試行を $n$ 回行うとき、成功回数 $X$ が $k$ になる確率を答えよ。",
answer: "$P(X=k)={}_nC_kp^k(1-p)^{n-k}$。",
hint: "二項分布の公式。",
},
{
question: "$X\\sim B(20,0.4)$ の期待値を求めよ。",
answer: "$E(X)=20\\cdot0.4=8$。",
hint: "$np$。",
},
{
question: "$X\\sim B(10,0.2)$ の分散を求めよ。",
answer: "$V(X)=10\\cdot0.2\\cdot0.8=1.6$。",
hint: "$np(1-p)$。",
},
],
relatedPracticeLinks: [
{ label: "二項分布 演習", href: "/units/statistics", description: "成功回数の確率" },
{ label: "反復試行の確率", href: "/courses/math-1a/counting-probability/complement-and-repeated-trials", description: "反復試行の復習" },
],
qualityTags: ["二項分布", "期待値", "分散", "確認問題3問"],
},
];

const STATISTICS_STANDARD: CourseLesson[] = [
{
lessonId: "normal-distribution-basic",
lessonTitle: "正規分布",
lessonDescription: "正規分布の形・平均・標準偏差・標準化を理解し、確率を読み取る準備をする。",
level: "standard",
estimatedMinutes: 80,
prerequisites: ["確率変数と確率分布", "標準偏差", "関数のグラフ"],
goals: [
"正規分布の形を説明できる",
"平均と標準偏差がグラフに与える影響を理解できる",
"標準正規分布の意味を説明できる",
"標準化の式を使える",
"正規分布表を使う準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "正規分布は山型の分布",
body: "正規分布は、平均の周りにデータが多く集まり、平均から離れるほど少なくなる山型の分布です。\n\n身長、測定誤差、試験の点数など、さまざまなデータで近似的に現れます。\n\n正規分布は、平均と標準偏差によって形が決まります。\n\n統計的な推測では、標本平均の分布が正規分布で近似できることが多く、非常に重要です。",
},
{
kind: "concept",
title: "平均と標準偏差",
body: "正規分布では、平均 $m$ が山の中心を表します。\n\n標準偏差 $\\sigma$ は、山の広がりを表します。\n\n標準偏差が小さいほど、データは平均の周りに集中します。\n\n標準偏差が大きいほど、データは広くばらつきます。\n\n正規分布は、よく $N(m,\\sigma^2)$ と表されます。",
},
{
kind: "formula",
title: "正規分布の表記",
body: "平均が $m$、分散が $\\sigma^2$ の正規分布を次のように表します。",
formula: "X\\sim N(m,\\sigma^2)",
},
{
kind: "concept",
title: "標準正規分布",
body: "平均が $0$、分散が $1$ の正規分布を標準正規分布といいます。\n\n標準正規分布は $N(0,1)$ と表します。\n\nどんな正規分布でも、標準化によって標準正規分布に変換できます。\n\n標準正規分布に直すことで、正規分布表を使って確率を求められます。",
},
{
kind: "formula",
title: "標準化",
body: "確率変数 $X$ が平均 $m$、標準偏差 $\\sigma$ の正規分布に従うとき、次の変換で標準化します。",
formula: "Z=\\frac{X-m}{\\sigma}",
},
{
kind: "workedExample",
title: "例1：標準化する",
body: "あるデータが平均 $60$、標準偏差 $10$ の正規分布に従うとします。\n\n値 $X=75$ を標準化します。\n\n$Z=\\frac{X-m}{\\sigma}$ より、\n\n$Z=\\frac{75-60}{10}=1.5$\n\nです。\n\nこれは、75が平均より標準偏差1.5個分だけ上にあることを意味します。",
},
{
kind: "comparisonTable",
title: "正規分布の重要用語",
body: "正規分布では、平均・分散・標準偏差を区別します。",
columns: ["用語", "意味", "記号"],
rows: [
{
cells: ["平均", "山の中心", "$m$"],
highlight: true,
},
{
cells: ["分散", "ばらつきの2乗尺度", "$\\sigma^2$"],
},
{
cells: ["標準偏差", "ばらつきの尺度", "$\\sigma$"],
},
{
cells: ["標準化", "標準正規分布へ変換", "$Z=\\frac{X-m}{\\sigma}$"],
},
],
},
{
kind: "workedExample",
title: "例2：正規分布表の読み方",
body: "正規分布表は、標準正規分布 $Z\\sim N(0,1)$ について $P(0\\leq Z\\leq z)$ の値を与える表です。\n\n問題：$X\\sim N(60,100)$（平均60、標準偏差10）のとき、$P(70\\leq X\\leq85)$ を求めよ。\n\nStep 1：両端を標準化する。\n\n$X=70$ → $Z=\\frac{70-60}{10}=1.0$\n\n$X=85$ → $Z=\\frac{85-60}{10}=2.5$\n\nStep 2：$P(70\\leq X\\leq85)=P(1.0\\leq Z\\leq2.5)$ に変換。\n\nStep 3：表を使って引き算する。\n\n$P(1.0\\leq Z\\leq2.5)=P(0\\leq Z\\leq2.5)-P(0\\leq Z\\leq1.0)$\n\n正規分布表の代表値（問題文に与えられる）：\n\n$P(0\\leq Z\\leq1.0)\\approx0.3413$\n\n$P(0\\leq Z\\leq2.5)\\approx0.4938$\n\nしたがって、\n\n$P(70\\leq X\\leq85)\\approx0.4938-0.3413=0.1525$\n\nポイント：標準化して Z に直す → 表から2つの値を引き算する、という流れです。入試では問題文中に正規分布表が与えられます。",
},
{
kind: "commonMistake",
title: "よくあるミス：N(m,σ²)の第2成分を標準偏差だと思う",
body: "$N(m,\\sigma^2)$ の第2成分は分散です。\n\n標準偏差は $\\sigma$ です。\n\n例えば、$N(50,16)$ なら、平均は $50$、分散は $16$、標準偏差は $4$ です。\n\n標準化するときは、分散ではなく標準偏差で割ることに注意しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 正規分布は平均を中心とする山型の分布\n- $N(m,\\sigma^2)$ は平均 $m$、分散 $\\sigma^2$\n- 標準偏差は $\\sigma$\n- 標準正規分布は $N(0,1)$\n- 標準化は $Z=\\frac{X-m}{\\sigma}$\n- 標準化により正規分布表を使える",
},
],
checkQuestions: [
{
question: "$N(40,9)$ の平均と標準偏差を答えよ。",
answer: "平均は $40$、分散は $9$ なので標準偏差は $3$。",
hint: "第2成分は分散。",
},
{
question: "平均 $70$、標準偏差 $5$ の分布で、$X=80$ を標準化せよ。",
answer: "$Z=\\frac{80-70}{5}=2$。",
hint: "平均との差を標準偏差で割る。",
},
{
question: "標準正規分布を記号で表せ。",
answer: "$N(0,1)$。",
hint: "平均0、分散1。",
},
],
relatedPracticeLinks: [
{ label: "正規分布 演習", href: "/units/statistics", description: "標準化と正規分布表" },
{ label: "データの分析 標準化", href: "/courses/math-1a/data-analysis/standardization-deviation-score", description: "標準化の復習" },
],
qualityTags: ["正規分布", "標準化", "標準正規分布", "確認問題3問"],
},
{
lessonId: "normal-approximation-binomial",
lessonTitle: "二項分布の正規近似",
lessonDescription: "試行回数が大きい二項分布を正規分布で近似し、成功回数の確率を求める。",
level: "standard",
estimatedMinutes: 85,
prerequisites: ["二項分布", "正規分布", "標準化"],
goals: [
"二項分布を正規分布で近似する考え方を理解できる",
"近似に使う平均と分散を求められる",
"成功回数を標準化できる",
"連続補正の考え方を理解できる",
"大きな試行回数の確率を近似できる",
],
lessonBlocks: [
{
kind: "intro",
title: "二項分布は正規分布で近似できる",
body: "二項分布 $B(n,p)$ は、試行回数 $n$ が大きいと、正規分布で近似できることがあります。\n\n成功回数を1つずつ計算するのは大変なので、正規分布を使って近似します。\n\n二項分布の期待値は $np$、分散は $np(1-p)$ でした。\n\nしたがって、二項分布 $B(n,p)$ は、平均 $np$、分散 $np(1-p)$ の正規分布で近似します。",
},
{
kind: "formula",
title: "二項分布の正規近似",
body: "$X\\sim B(n,p)$ で $n$ が大きいとき、次の正規分布で近似します。",
formula: "X\\approx N(np,np(1-p))",
},
{
kind: "workedExample",
title: "例1：近似する正規分布を求める",
body: "$X\\sim B(100,0.3)$ とします。\n\n二項分布の期待値は、\n\n$np=100\\cdot0.3=30$\n\nです。\n\n分散は、\n\n$np(1-p)=100\\cdot0.3\\cdot0.7=21$\n\nです。\n\nしたがって、$X$ は近似的に $N(30,21)$ に従うと考えます。",
},
{
kind: "concept",
title: "連続補正",
body: "二項分布は成功回数を数えるので、値は整数です。\n\n一方、正規分布は連続的な値を取ります。\n\nそのため、二項分布を正規分布で近似するときには、整数の範囲を連続区間に直すことがあります。\n\n例えば、$X\\leq40$ は、正規分布ではおよそ $X<40.5$ と考えます。\n\nこれを連続補正といいます。",
},
{
kind: "comparisonTable",
title: "連続補正の例",
body: "整数値の条件を連続区間に広げます。",
columns: ["二項分布の条件", "正規近似での考え方", "理由"],
rows: [
{
cells: ["$X\\leq k$", "$X<k+0.5$", "kまで含む"],
highlight: true,
},
{
cells: ["$X\\geq k$", "$X>k-0.5$", "kから含む"],
},
{
cells: ["$a\\leq X\\leq b$", "$a-0.5<X<b+0.5$", "端を半分広げる"],
},
],
},
{
kind: "workedExample",
title: "例2：標準化して考える",
body: "$X\\sim B(100,0.5)$ のとき、$X\\leq60$ の確率を正規近似で考えます。\n\n平均は $np=50$、分散は $np(1-p)=25$、標準偏差は $5$ です。\n\n正規近似では、$X\\leq60$ を $X<60.5$ と考えます。\n\n標準化すると、\n\n$Z=\\frac{60.5-50}{5}=2.1$\n\nです。\n\nしたがって、求めたい確率は標準正規分布で $P(Z<2.1)$ に対応します。",
},
{
kind: "commonMistake",
title: "よくあるミス：分散と標準偏差を混同する",
body: "二項分布 $B(n,p)$ の分散は $np(1-p)$ です。\n\n正規近似で標準化するときに使うのは標準偏差なので、$\\sqrt{np(1-p)}$ で割ります。\n\n分散そのもので割らないように注意しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 二項分布は試行回数が大きいと正規分布で近似できる\n- $B(n,p)$ は $N(np,np(1-p))$ で近似する\n- 標準偏差は $\\sqrt{np(1-p)}$\n- 整数値を連続値に直すため連続補正を使う\n- $X\\leq k$ はおよそ $X<k+0.5$\n- 標準化して標準正規分布表を使う",
},
],
checkQuestions: [
{
question: "$X\\sim B(200,0.4)$ を正規近似すると、平均と分散はいくつか。",
answer: "平均は $200\\cdot0.4=80$、分散は $200\\cdot0.4\\cdot0.6=48$。",
hint: "$np$ と $np(1-p)$。",
},
{
question: "$X\\leq30$ を正規近似で連続補正すると、どのように考えるか。",
answer: "$X<30.5$ と考える。",
hint: "上端を0.5広げる。",
},
{
question: "正規近似で標準化するとき、分母に使うのは分散か標準偏差か。",
answer: "標準偏差。",
hint: "$\\sqrt{np(1-p)}$。",
},
],
relatedPracticeLinks: [
{ label: "二項分布の正規近似 演習", href: "/units/statistics", description: "連続補正と標準化" },
{ label: "二項分布", href: "/courses/math-2bc/statistics/binomial-distribution-basic", description: "期待値と分散の復習" },
],
qualityTags: ["正規近似", "二項分布", "連続補正", "確認問題3問"],
},
{
lessonId: "sampling-distribution-basic",
lessonTitle: "標本平均の分布",
lessonDescription: "標本平均の期待値・分散・標準偏差を理解し、母平均の推定につなげる。",
level: "standard",
estimatedMinutes: 85,
prerequisites: ["統計的な推測とは何か", "正規分布", "期待値・分散"],
goals: [
"標本平均を確率変数として理解できる",
"標本平均の期待値を求められる",
"標本平均の分散を求められる",
"標本サイズが大きいほど標本平均が安定する理由を説明できる",
"信頼区間に進む準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "標本平均もばらつく",
body: "標本平均は、標本を取るたびに変わる可能性があります。\n\nつまり、標本平均そのものも確率変数として考えられます。\n\n母集団から同じ大きさの標本を何度も取り、それぞれの標本平均を計算すると、標本平均にも分布ができます。\n\nこの標本平均の分布を理解することが、母平均の推定につながります。",
},
{
kind: "formula",
title: "標本平均",
body: "大きさ $n$ の標本 $X_1,X_2,\\ldots,X_n$ の標本平均は次のように表されます。",
formula: "\\overline{X}=\\frac{X_1+X_2+\\cdots+X_n}{n}",
},
{
kind: "formula",
title: "標本平均の期待値と分散",
body: "母平均が $m$、母分散が $\\sigma^2$ の母集団から大きさ $n$ の標本を取るとき、標本平均の期待値と分散は次のようになります。",
formula: "E(\\overline{X})=m,\\quad V(\\overline{X})=\\frac{\\sigma^2}{n}",
},
{
kind: "concept",
title: "標本サイズが大きいほど安定する",
body: "標本平均の分散は $\\frac{\\sigma^2}{n}$ です。\n\n標本サイズ $n$ が大きくなるほど、分散は小さくなります。\n\nつまり、たくさんのデータから平均を取るほど、標本平均は母平均の近くに集まりやすくなります。\n\nこれが、標本サイズを大きくすると推定が安定する理由です。",
},
{
kind: "workedExample",
title: "例1：標本平均の分散",
body: "母平均が $50$、母分散が $100$ の母集団から、大きさ $25$ の標本を取ります。\n\n標本平均 $\\overline{X}$ の期待値は、\n\n$E(\\overline{X})=50$\n\nです。\n\n分散は、\n\n$V(\\overline{X})=\\frac{100}{25}=4$\n\nです。\n\n標準偏差は $\\sqrt{4}=2$ です。\n\n標本平均は、母平均50の周りに標準偏差2程度でばらつくと考えられます。",
},
{
kind: "concept",
title: "標準誤差",
body: "標本平均の標準偏差を標準誤差といいます。\n\n母標準偏差が $\\sigma$、標本サイズが $n$ のとき、標準誤差は $\\frac{\\sigma}{\\sqrt{n}}$ です。\n\n標準誤差は、標本平均がどれくらいばらつくかを表します。\n\n信頼区間では、この標準誤差を使って推定の幅を決めます。",
},
{
kind: "formula",
title: "標準誤差",
body: "標本平均の標準偏差は、標準誤差と呼ばれます。",
formula: "\\frac{\\sigma}{\\sqrt{n}}",
},
{
kind: "commonMistake",
title: "よくあるミス：標本平均の分散をσ²のままにする",
body: "標本平均の分散は、母分散 $\\sigma^2$ そのものではありません。\n\n大きさ $n$ の標本平均では、分散は $\\frac{\\sigma^2}{n}$ になります。\n\n平均を取ることでばらつきが小さくなるためです。\n\n標本平均の標準偏差は $\\frac{\\sigma}{\\sqrt{n}}$ です。",
},
{
kind: "summary",
title: "まとめ",
body: "- 標本平均も確率変数としてばらつく\n- 標本平均は $\\overline{X}=\\frac{X_1+\\cdots+X_n}{n}$\n- $E(\\overline{X})=m$\n- $V(\\overline{X})=\\frac{\\sigma^2}{n}$\n- 標準誤差は $\\frac{\\sigma}{\\sqrt{n}}$\n- 標本サイズが大きいほど標本平均は安定する",
},
],
checkQuestions: [
{
question: "母分散が $64$、標本サイズが $16$ のとき、標本平均の分散を求めよ。",
answer: "$\\frac{64}{16}=4$。",
hint: "$\\sigma^2/n$。",
},
{
question: "母標準偏差が $12$、標本サイズが $36$ のとき、標準誤差を求めよ。",
answer: "$\\frac{12}{\\sqrt{36}}=2$。",
hint: "$\\sigma/\\sqrt{n}$。",
},
{
question: "標本サイズを大きくすると、標本平均のばらつきはどうなるか。",
answer: "小さくなる。",
hint: "分散は $\\sigma^2/n$。",
},
],
relatedPracticeLinks: [
{ label: "標本平均 演習", href: "/units/statistics", description: "期待値・分散・標準誤差" },
{ label: "正規分布", href: "/courses/math-2bc/statistics/normal-distribution-basic", description: "標準化の復習" },
],
qualityTags: ["標本平均", "標準誤差", "標本分布", "確認問題3問"],
},
];

const STATISTICS_ADVANCED: CourseLesson[] = [
{
lessonId: "confidence-interval-mean",
lessonTitle: "母平均の推定と信頼区間",
lessonDescription: "標本平均と標準誤差を使い、母平均の信頼区間を求める。",
level: "advanced",
estimatedMinutes: 95,
prerequisites: ["標本平均の分布", "正規分布", "標準化"],
goals: [
"信頼区間の意味を説明できる",
"母平均の信頼区間を求められる",
"標準誤差を使って推定の幅を計算できる",
"信頼係数と区間の幅の関係を理解できる",
"推定問題の答案を作れる",
],
lessonBlocks: [
{
kind: "intro",
title: "母平均を幅で推定する",
body: "標本平均は母平均の近くにあると期待できますが、完全に一致するとは限りません。\n\nそこで、母平均がこの範囲にありそうだ、という区間で推定します。\n\nこの区間を信頼区間といいます。\n\n例えば、母平均は $48$ から $52$ の間にあると推定する、という形です。\n\n信頼区間では、標本平均を中心に、標準誤差を使って幅を作ります。",
},
{
kind: "concept",
title: "信頼係数",
body: "信頼区間には、どれくらいの確からしさで区間を作るかを表す信頼係数があります。\n\nよく使われるのは、信頼係数 $95\%$ です。\n\n正規分布では、平均からおよそ $1.96$ 標準偏差以内に約 $95\%$ が入ります。\n\n高校数学では、問題文で使用する値が与えられることが多いです。",
},
{
kind: "formula",
title: "母平均の信頼区間",
body: "母標準偏差 $\\sigma$ が分かっているとき、母平均 $m$ の信頼区間は次の形になります。",
formula: "\\overline{x}-z\\frac{\\sigma}{\\sqrt{n}}\\leq m\\leq \\overline{x}+z\\frac{\\sigma}{\\sqrt{n}}",
},
{
kind: "workedExample",
title: "例1：信頼区間を求める",
body: "ある母集団の母標準偏差が $10$ と分かっています。\n\n大きさ $100$ の標本を取り、標本平均が $52$ でした。\n\n信頼係数 $95\%$ に対応する値を $z=1.96$ として、母平均の信頼区間を求めます。\n\n標準誤差は、\n\n$\\frac{\\sigma}{\\sqrt{n}}=\\frac{10}{\\sqrt{100}}=1$\n\nです。\n\nしたがって、推定の幅は、\n\n$1.96\\cdot1=1.96$\n\nです。\n\nよって、信頼区間は、\n\n$52-1.96\\leq m\\leq52+1.96$\n\nつまり、\n\n$50.04\\leq m\\leq53.96$\n\nです。",
},
{
kind: "comparisonTable",
title: "信頼区間の幅に影響するもの",
body: "区間の幅は、標準偏差・標本サイズ・信頼係数で変わります。",
columns: ["要素", "大きくなると", "理由"],
rows: [
{
cells: ["母標準偏差 $\\sigma$", "区間は広くなる", "ばらつきが大きい"],
highlight: true,
},
{
cells: ["標本サイズ $n$", "区間は狭くなる", "標準誤差が小さくなる"],
},
{
cells: ["信頼係数", "区間は広くなる", "より高い確からしさを求める"],
},
],
},
{
kind: "concept",
title: "信頼区間の意味",
body: "信頼係数95%の信頼区間とは、作った1つの区間に母平均が95%の確率で入る、という意味ではありません。\n\n同じ方法で何度も標本を取り、信頼区間を作ったとき、そのうち約95%の区間が母平均を含む、という意味です。\n\n高校数学では厳密な解釈よりも、標本平均を中心に推定幅を作る計算が重要です。",
},
{
kind: "commonMistake",
title: "よくあるミス：標準誤差でなく標準偏差をそのまま使う",
body: "母平均の信頼区間では、標本平均のばらつきを使います。\n\nそのため、使うのは母標準偏差 $\\sigma$ そのものではなく、標準誤差 $\\frac{\\sigma}{\\sqrt{n}}$ です。\n\n標本サイズが大きいほど、標準誤差は小さくなり、信頼区間は狭くなります。",
},
{
kind: "summary",
title: "まとめ",
body: "- 信頼区間は母平均を幅で推定する方法\n- 標本平均を中心に区間を作る\n- 標準誤差は $\\frac{\\sigma}{\\sqrt{n}}$\n- 信頼区間は $\\overline{x}\\pm z\\frac{\\sigma}{\\sqrt{n}}$\n- 標本サイズが大きいほど区間は狭くなる\n- 信頼係数が高いほど区間は広くなる",
},
],
checkQuestions: [
{
question: "標本平均 $80$、母標準偏差 $12$、標本サイズ $36$、$z=2$ のとき、信頼区間を求めよ。",
answer: "標準誤差は $12/6=2$。幅は $2\\cdot2=4$。よって $76\\leq m\\leq84$。",
hint: "$\\overline{x}\\pm z\\sigma/\\sqrt{n}$。",
},
{
question: "標本サイズを大きくすると、信頼区間の幅はどうなるか。",
answer: "狭くなる。",
hint: "標準誤差が小さくなる。",
},
{
question: "母平均の信頼区間で使うばらつきの尺度は何か。",
answer: "標準誤差 $\\frac{\\sigma}{\\sqrt{n}}$。",
hint: "標本平均の標準偏差。",
},
],
relatedPracticeLinks: [
{ label: "母平均の推定 演習", href: "/units/statistics", description: "信頼区間の計算" },
{ label: "標本平均の分布", href: "/courses/math-2bc/statistics/sampling-distribution-basic", description: "標準誤差の復習" },
],
qualityTags: ["旧帝大準備", "信頼区間", "母平均の推定", "確認問題3問"],
},
{
lessonId: "hypothesis-testing-basic",
lessonTitle: "仮説検定の考え方",
lessonDescription: "帰無仮説・対立仮説・有意水準・棄却域を理解し、検定の基本手順を学ぶ。",
level: "advanced",
estimatedMinutes: 95,
prerequisites: ["正規分布", "標本平均の分布", "標準化"],
goals: [
"仮説検定の目的を説明できる",
"帰無仮説と対立仮説を区別できる",
"有意水準の意味を理解できる",
"検定統計量を標準化して判断できる",
"棄却・採択という判断の流れを説明できる",
],
lessonBlocks: [
{
kind: "intro",
title: "仮説をデータで判断する",
body: "仮説検定とは、ある主張がデータから見て妥当かどうかを判断する方法です。\n\n例えば、「ある製品の平均寿命は100時間である」という主張があるとします。\n\n標本を調べた結果、その平均が大きくずれていたら、この主張は疑わしいと考えます。\n\n仮説検定では、まず基準となる仮説を立て、データがその仮説のもとでどれくらい起こりにくいかを判断します。",
},
{
kind: "comparisonTable",
title: "検定の基本用語",
body: "仮説検定では、用語の意味を正確に押さえます。",
columns: ["用語", "意味", "例"],
rows: [
{
cells: ["帰無仮説", "まず正しいと仮定する主張", "母平均は100である"],
highlight: true,
},
{
cells: ["対立仮説", "疑いたい主張", "母平均は100ではない"],
},
{
cells: ["有意水準", "偶然では起こりにくいと判断する基準", "$5\%$"],
},
{
cells: ["棄却", "帰無仮説を退けること", "主張は疑わしいと判断"],
},
],
},
{
kind: "concept",
title: "検定の流れ",
body: "仮説検定では、次のように考えます。\n\nまず、帰無仮説を立てます。\n\n次に、標本から検定統計量を計算します。\n\nその値が、帰無仮説のもとでは非常に起こりにくい範囲に入っていれば、帰無仮説を棄却します。\n\n逆に、そこまで珍しくない値なら、帰無仮説を棄却しません。\n\n検定は、仮説を絶対に証明する方法ではなく、データから見て疑わしいかを判断する方法です。",
},
{
kind: "formula",
title: "母平均の検定統計量",
body: "母標準偏差 $\\sigma$ が分かっているとき、母平均 $m_0$ についての検定では、次の値を使います。",
formula: "Z=\\frac{\\overline{X}-m_0}{\\sigma/\\sqrt{n}}",
},
{
kind: "workedExample",
title: "例1：検定統計量を求める",
body: "母平均が $50$ であるという仮説を考えます。\n\n母標準偏差は $10$、標本サイズは $100$、標本平均は $52$ でした。\n\n検定統計量は、\n\n$Z=\\frac{52-50}{10/\\sqrt{100}}$\n\n$=\\frac{2}{1}=2$\n\nです。\n\nこの値が棄却域に入るかどうかで判断します。",
},
{
kind: "concept",
title: "両側検定と片側検定",
body: "対立仮説の立て方によって、検定の種類が変わります。\n\n母平均が等しくないことを調べるなら両側検定です。\n\n母平均が大きい、または小さいことを調べるなら片側検定です。\n\n両側検定では、分布の両端を棄却域として考えます。\n\n片側検定では、片方の端だけを棄却域として考えます。",
},
{
kind: "commonMistake",
title: "よくあるミス：棄却しないことを正しい証明と思う",
body: "帰無仮説を棄却しないことは、帰無仮説が正しいと証明することではありません。\n\nあくまで、今回のデータでは帰無仮説を否定するほどの根拠がない、という意味です。\n\n仮説検定では、言い方に注意しましょう。\n\n「棄却する」「棄却できない」という表現を使うのが基本です。",
},
{
kind: "summary",
title: "まとめ",
body: "- 仮説検定はデータで仮説を判断する方法\n- 帰無仮説はまず正しいと仮定する主張\n- 対立仮説は疑いたい主張\n- 有意水準は判断の基準\n- 検定統計量を標準化して判断する\n- 棄却しないことは正しさの証明ではない",
},
],
checkQuestions: [
{
question: "仮説検定で、まず正しいと仮定する仮説を何というか。",
answer: "帰無仮説。",
hint: "棄却するかどうかを判断する仮説。",
},
{
question: "母平均 $100$、母標準偏差 $15$、標本サイズ $25$、標本平均 $106$ のとき、検定統計量 $Z$ を求めよ。",
answer: "$Z=\\frac{106-100}{15/5}=\\frac{6}{3}=2$。",
hint: "$\\sigma/\\sqrt{n}$ で割る。",
},
{
question: "帰無仮説を棄却しないことは、帰無仮説が正しい証明になるか。",
answer: "ならない。否定する十分な根拠がないという意味。",
hint: "検定の結論の言い方に注意。",
},
],
relatedPracticeLinks: [
{ label: "仮説検定 演習", href: "/units/statistics", description: "検定統計量と棄却判断" },
{ label: "正規分布", href: "/courses/math-2bc/statistics/normal-distribution-basic", description: "標準化の復習" },
],
qualityTags: ["旧帝大準備", "仮説検定", "有意水準", "確認問題3問"],
},
{
lessonId: "statistics-exam-standard",
lessonTitle: "統計的な推測の融合問題",
lessonDescription: "二項分布・正規分布・標本平均・信頼区間・仮説検定を組み合わせた実戦問題を切り崩す。",
level: "advanced",
estimatedMinutes: 100,
prerequisites: ["母平均の推定と信頼区間", "仮説検定の考え方", "二項分布の正規近似"],
goals: [
"統計問題で使う分布を判断できる",
"二項分布と正規分布を使い分けられる",
"標本平均の標準誤差を計算できる",
"信頼区間を求められる",
"検定統計量を求めて判断できる",
],
lessonBlocks: [
{
kind: "intro",
title: "統計の融合問題は何の分布かを見抜く",
body: "統計的な推測の実戦問題では、まず何を確率変数として見ているかを判断します。\n\n成功回数なら二項分布です。\n\n連続的な測定値なら正規分布を考えることが多いです。\n\n標本平均なら、標本平均の分布を考えます。\n\n母平均を推定するなら信頼区間、仮説を判断するなら検定です。\n\n問題の目的から道具を選ぶことが重要です。",
},
{
kind: "strategy",
title: "融合問題の確認リスト",
body: "統計的推測の問題では、次の順番で確認します。\n\n1. 確率変数が何かを決める\n2. 二項分布・正規分布・標本平均のどれか判断する\n3. 平均・分散・標準偏差を求める\n4. 必要なら標準化する\n5. 推定なら信頼区間を作る\n6. 検定なら帰無仮説と対立仮説を立てる\n7. 最後に結論を日本語で書く\n\n計算だけでなく、結論の書き方も大切です。",
},
{
kind: "workedExample",
title: "例1：信頼区間の実戦",
body: "母標準偏差が $8$ と分かっている母集団から、大きさ $64$ の標本を取り、標本平均が $102$ でした。\n\n$z=2$ として母平均の信頼区間を求めます。\n\n標準誤差は、\n\n$\\frac{8}{\\sqrt{64}}=1$\n\nです。\n\n推定の幅は、\n\n$2\\cdot1=2$\n\nです。\n\nしたがって、信頼区間は、\n\n$102-2\\leq m\\leq102+2$\n\nつまり、\n\n$100\\leq m\\leq104$\n\nです。",
},
{
kind: "workedExample",
title: "例2：検定統計量の実戦",
body: "母平均が $50$ であるという仮説を考えます。\n\n母標準偏差が $12$、標本サイズが $36$、標本平均が $54$ でした。\n\n検定統計量を求めます。\n\n標準誤差は、\n\n$\\frac{12}{\\sqrt{36}}=2$\n\nです。\n\nしたがって、\n\n$Z=\\frac{54-50}{2}=2$\n\nです。\n\nこの値を棄却域と比較して、帰無仮説を棄却するか判断します。",
},
{
kind: "workedExample",
title: "例3：二項分布を正規近似する",
body: "$X\\sim B(400,0.5)$ とします。\n\nこのとき、平均は、\n\n$np=400\\cdot0.5=200$\n\nです。\n\n分散は、\n\n$np(1-p)=400\\cdot0.5\\cdot0.5=100$\n\nです。\n\n標準偏差は $10$ です。\n\nしたがって、$X$ は近似的に $N(200,100)$ に従うと考えられます。\n\n確率を求めるときは、必要に応じて連続補正をしてから標準化します。",
},
{
kind: "comparisonTable",
title: "実戦で使う判断",
body: "問題文の言葉から、使う分布や方法を選びます。",
columns: ["問題の特徴", "使う道具", "注意点"],
rows: [
{
cells: ["成功回数", "二項分布", "$B(n,p)$"],
highlight: true,
},
{
cells: ["大きな二項分布", "正規近似", "連続補正"],
},
{
cells: ["標本平均", "標本平均の分布", "標準誤差"],
},
{
cells: ["母平均を推定", "信頼区間", "$\\overline{x}\\pm z\\frac{\\sigma}{\\sqrt{n}}$"],
},
{
cells: ["仮説を判断", "仮説検定", "棄却域と比較"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：結論を計算だけで終える",
body: "統計の問題では、計算結果だけでなく、文脈に合った結論を書くことが重要です。\n\n信頼区間なら、母平均はこの範囲にあると推定される、と書きます。\n\n検定なら、帰無仮説を棄却する、または棄却できない、と書きます。\n\n確率や統計の問題では、最後の日本語の結論まで答案の一部です。",
},
{
kind: "summary",
title: "まとめ",
body: "- 統計の融合問題では、何の分布かを最初に判断する\n- 成功回数なら二項分布\n- 大きな二項分布は正規近似できる\n- 標本平均では標準誤差を使う\n- 推定では信頼区間を作る\n- 検定では仮説と棄却判断を行う\n- 最後に文脈に合った結論を書く",
},
],
checkQuestions: [
{
question: "成功回数を表す確率変数が従う代表的な分布を答えよ。",
answer: "二項分布。",
hint: "成功確率 $p$ の試行を $n$ 回行う。",
},
{
question: "母標準偏差 $10$、標本サイズ $25$ のとき、標準誤差を求めよ。",
answer: "$10/\\sqrt{25}=2$。",
hint: "$\\sigma/\\sqrt{n}$。",
},
{
question: "仮説検定で最後に書くべきことは何か。",
answer: "帰無仮説を棄却するか、棄却できないかという結論。",
hint: "計算だけで終わらない。",
},
],
relatedPracticeLinks: [
{ label: "統計的推測 実戦演習", href: "/units/statistics", description: "推定・検定・正規近似" },
{ label: "過去問道場", href: "/dojo", description: "入試形式で確認" },
{ label: "データの分析", href: "/courses/math-1a/data-analysis", description: "平均・分散・標準偏差の復習" },
],
qualityTags: ["旧帝大準備", "統計的推測", "信頼区間", "仮説検定", "融合問題"],
},
];

export const STATISTICS_UNIT: CourseUnit = {
unitId: "statistics",
subjectId: "math-2bc",
unitTitle: "統計的な推測",
unitDescription:
"母集団と標本、確率変数、二項分布、正規分布、標本平均、信頼区間、仮説検定まで体系的に学ぶ単元です。",
lessons: [
...STATISTICS_BEGINNER,
...STATISTICS_STANDARD,
...STATISTICS_ADVANCED,
],
};
