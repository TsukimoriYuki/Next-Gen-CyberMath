import type { CourseLesson, CourseUnit } from "@/types/course";

const TRIGONOMETRIC_FUNCTIONS_BEGINNER: CourseLesson[] = [
{
lessonId: "trigonometric-functions-from-ratios",
lessonTitle: "三角比から三角関数へ",
lessonDescription: "数学IAの三角比を、単位円を使って数学IIの三角関数へ拡張する。",
level: "beginner",
estimatedMinutes: 60,
prerequisites: ["数学IAの三角比", "座標平面", "円の基本"],
goals: [
"三角比と三角関数の違いを説明できる",
"単位円上でsin・cosを読み取れる",
"角を0度から360度以上へ拡張する意味を理解できる",
"象限による符号を判断できる",
"三角関数のグラフに進む土台を作れる",
],
lessonBlocks: [
{
kind: "intro",
title: "三角比を角度全体に広げる",
body: "数学IAでは、主に直角三角形の中で $\\sin$、$\\cos$、$\\tan$ を考えました。\n\nしかし、数学IIでは三角比をさらに広げて、三角関数として扱います。\n\n三角関数では、$30^\\circ$ や $60^\\circ$ だけでなく、$120^\\circ$、$210^\\circ$、$390^\\circ$ のような角も扱います。\n\nそのために使うのが単位円です。\n\n単位円を使うと、直角三角形の範囲を超えて、あらゆる角に対して $\\sin$ と $\\cos$ を定義できます。",
},
{
kind: "concept",
title: "単位円とは何か",
body: "単位円とは、原点を中心とし、半径が $1$ の円です。\n\n座標平面上で、原点から角 $\\theta$ の方向に半径を引きます。その半径と単位円の交点を $P$ とします。\n\nこの点 $P$ の座標を $(x,y)$ とすると、\n\n$x=\\cos\\theta$\n\n$y=\\sin\\theta$\n\nと定義します。\n\nつまり、単位円では、$\\cos\\theta$ は点の横座標、$\\sin\\theta$ は点の縦座標です。\n\nこの見方が、三角関数のすべての土台になります。",
},
{
kind: "comparisonTable",
title: "単位円でのsinとcos",
body: "三角関数では、直角三角形ではなく単位円上の点の座標で考えます。",
columns: ["記号", "単位円での意味", "見る座標"],
rows: [
{
cells: ["$\\cos\\theta$", "単位円上の点の横座標", "$x$ 座標"],
highlight: true,
},
{
cells: ["$\\sin\\theta$", "単位円上の点の縦座標", "$y$ 座標"],
},
{
cells: ["$\\tan\\theta$", "$\\frac{\\sin\\theta}{\\cos\\theta}$", "縦座標÷横座標"],
},
],
},
{
kind: "concept",
title: "象限と符号",
body: "単位円で考えると、$\\sin\\theta$ と $\\cos\\theta$ の符号は、点がどの象限にあるかで決まります。\n\n第1象限では、$x$ 座標も $y$ 座標も正なので、$\\cos\\theta>0$、$\\sin\\theta>0$ です。\n\n第2象限では、$x$ 座標は負、$y$ 座標は正です。したがって、$\\cos\\theta<0$、$\\sin\\theta>0$ です。\n\n第3象限では、どちらも負です。\n\n第4象限では、$x$ 座標は正、$y$ 座標は負です。\n\n符号は暗記ではなく、座標平面で考えると自然に分かります。",
},
{
kind: "comparisonTable",
title: "象限ごとの符号",
body: "単位円上の点の座標から、sinとcosの符号を判断します。",
columns: ["象限", "$\\cos\\theta$", "$\\sin\\theta$", "$\\tan\\theta$"],
rows: [
{
cells: ["第1象限", "正", "正", "正"],
highlight: true,
},
{
cells: ["第2象限", "負", "正", "負"],
},
{
cells: ["第3象限", "負", "負", "正"],
},
{
cells: ["第4象限", "正", "負", "負"],
},
],
},
{
kind: "workedExample",
title: "例1：120度のsinとcos",
body: "$120^\\circ$ は第2象限の角です。\n\n基準角は $180^\\circ-120^\\circ=60^\\circ$ です。\n\n第2象限では、$\\sin$ は正、$\\cos$ は負です。\n\nしたがって、\n\n$\\sin120^\\circ=\\sin60^\\circ=\\frac{\\sqrt{3}}{2}$\n\n$\\cos120^\\circ=-\\cos60^\\circ=-\\frac{1}{2}$\n\nです。\n\n値の大きさは基準角で決まり、符号は象限で決まります。",
},
{
kind: "workedExample",
title: "例2：210度のsinとcos",
body: "$210^\\circ$ は第3象限の角です。\n\n基準角は $210^\\circ-180^\\circ=30^\\circ$ です。\n\n第3象限では、$\\sin$ も $\\cos$ も負です。\n\nしたがって、\n\n$\\sin210^\\circ=-\\sin30^\\circ=-\\frac{1}{2}$\n\n$\\cos210^\\circ=-\\cos30^\\circ=-\\frac{\\sqrt{3}}{2}$\n\nです。",
},
{
kind: "commonMistake",
title: "よくあるミス：値の大きさと符号を同時に考えて混乱する",
body: "三角関数の値を求めるときは、最初から一気に答えを出そうとすると符号ミスが起こりやすいです。\n\nまず基準角で値の大きさを決めます。\n\n次に象限で符号を決めます。\n\n例えば、$240^\\circ$ なら基準角は $60^\\circ$ です。第3象限なので、$\\sin$ も $\\cos$ も負です。\n\nこのように、値の大きさと符号を分けて考えると安定します。",
},
{
kind: "summary",
title: "まとめ",
body: "- 数学IIでは、三角比を三角関数へ拡張する\n- 単位円では、$\\cos\\theta$ は横座標、$\\sin\\theta$ は縦座標\n- $\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$\n- 符号は象限で決まる\n- 値の大きさは基準角で考える\n- 単位円を使えば、90度を超える角も自然に扱える",
},
{
kind: "nextStep",
title: "次は弧度法へ",
body: "三角関数では、角度を度数法だけでなく弧度法で表します。\n\n弧度法を理解すると、三角関数のグラフや微分積分への接続が自然になります。",
},
],
checkQuestions: [
{
question: "$150^\\circ$ の基準角と、$\\sin150^\\circ$、$\\cos150^\\circ$ を求めよ。",
answer: "基準角は $30^\\circ$。第2象限なので、$\\sin150^\\circ=\\frac{1}{2}$、$\\cos150^\\circ=-\\frac{\\sqrt{3}}{2}$。",
hint: "第2象限ではsinは正、cosは負。",
},
{
question: "$225^\\circ$ は第何象限か。また、$\\sin$ と $\\cos$ の符号を答えよ。",
answer: "第3象限。$\\sin$ も $\\cos$ も負。",
hint: "180度から270度の間。",
},
{
question: "単位円で $\\cos\\theta$ は何を表すか。",
answer: "単位円上の点の横座標。",
hint: "cosはx座標。",
},
],
relatedPracticeLinks: [
{ label: "三角関数 基礎演習", href: "/units/trigonometric-functions", description: "単位円の確認" },
{ label: "図形と計量 講座", href: "/courses/math-1a/figures-and-measurement", description: "数学IAの復習" },
],
qualityTags: ["単位円", "三角関数", "象限", "基準角", "確認問題3問"],
},
{
lessonId: "radian-measure-basic",
lessonTitle: "弧度法",
lessonDescription: "角度を弧の長さで表す弧度法を理解し、度数法と変換できるようにする。",
level: "beginner",
estimatedMinutes: 55,
prerequisites: ["三角比から三角関数へ", "円周の長さ", "比例"],
goals: [
"弧度法の意味を説明できる",
"180度がπラジアンに対応することを理解できる",
"度数法と弧度法を相互に変換できる",
"扇形の弧の長さと面積を弧度法で求められる",
"三角関数のグラフに進む準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "角度を弧の長さで測る",
body: "中学校や数学IAでは、角度を $30^\\circ$、$60^\\circ$ のように度数法で表してきました。\n\n数学II以降では、角度を弧度法で表すことが増えます。\n\n弧度法では、角度を円の弧の長さに基づいて表します。\n\n半径 $1$ の円で、弧の長さが $1$ になる中心角を $1$ ラジアンといいます。\n\nこの定義により、角度と円の長さが自然につながります。\n\n三角関数のグラフや微分積分では、弧度法が標準になります。",
},
{
kind: "concept",
title: "180度はπラジアン",
body: "半径 $1$ の円を考えます。\n\n円周の長さは $2\\pi$ です。\n\n円1周の中心角は $360^\\circ$ です。\n\nしたがって、$360^\\circ$ は $2\\pi$ ラジアンに対応します。\n\nその半分である $180^\\circ$ は、$\\pi$ ラジアンです。\n\nつまり、\n\n$180^\\circ=\\pi$\n\nと考えます。\n\nここでの $\\pi$ は、角度を表す単位として使われています。",
},
{
kind: "comparisonTable",
title: "よく使う角度の変換",
body: "度数法と弧度法の対応は、三角関数で何度も使います。",
columns: ["度数法", "弧度法", "考え方"],
rows: [
{
cells: ["$30^\\circ$", "$\\frac{\\pi}{6}$", "180度の6分の1"],
},
{
cells: ["$45^\\circ$", "$\\frac{\\pi}{4}$", "180度の4分の1"],
},
{
cells: ["$60^\\circ$", "$\\frac{\\pi}{3}$", "180度の3分の1"],
highlight: true,
},
{
cells: ["$90^\\circ$", "$\\frac{\\pi}{2}$", "180度の2分の1"],
},
{
cells: ["$180^\\circ$", "$\\pi$", "基準"],
},
{
cells: ["$360^\\circ$", "$2\\pi$", "1周"],
},
],
},
{
kind: "formula",
title: "度数法から弧度法へ",
body: "$180^\\circ=\\pi$ を基準に変換します。\n\n度数を弧度法に直すには、$\\frac{\\pi}{180}$ をかけます。",
formula: "\\theta^\\circ=\\theta\\cdot\\frac{\\pi}{180}",
},
{
kind: "workedExample",
title: "例1：度数法から弧度法へ",
body: "$120^\\circ$ を弧度法で表します。\n\n$180^\\circ=\\pi$ なので、\n\n$120^\\circ=120\\cdot\\frac{\\pi}{180}$\n\n$=\\frac{2\\pi}{3}$\n\nです。\n\nしたがって、$120^\\circ$ は $\\frac{2\\pi}{3}$ ラジアンです。",
},
{
kind: "workedExample",
title: "例2：弧度法から度数法へ",
body: "$\\frac{5\\pi}{6}$ を度数法で表します。\n\n$\\pi$ ラジアンが $180^\\circ$ なので、\n\n$\\frac{5\\pi}{6}=\\frac{5}{6}\\times180^\\circ$\n\n$=150^\\circ$\n\nです。\n\n弧度法から度数法へ直すときは、$\\pi$ を $180^\\circ$ に置き換えると考えると分かりやすいです。",
},
{
kind: "formula",
title: "扇形の弧の長さと面積",
body: "半径 $r$、中心角 $\\theta$ ラジアンの扇形について、弧の長さ $l$ と面積 $S$ は次のようになります。\n\nここで、$\\theta$ は必ず弧度法である必要があります。",
formula: "l=r\\theta,\\quad S=\\frac{1}{2}r^2\\theta",
},
{
kind: "workedExample",
title: "例3：扇形の弧の長さ",
body: "半径 $6$、中心角 $\\frac{\\pi}{3}$ の扇形の弧の長さを求めます。\n\n公式 $l=r\\theta$ を使います。\n\n$l=6\\cdot\\frac{\\pi}{3}=2\\pi$\n\nです。\n\n中心角が弧度法で表されていると、弧の長さの公式が非常に簡単になります。",
},
{
kind: "commonMistake",
title: "よくあるミス：度数のまま扇形公式に入れる",
body: "扇形の公式 $l=r\\theta$ や $S=\\frac{1}{2}r^2\\theta$ を使うとき、$\\theta$ は弧度法でなければなりません。\n\n例えば、中心角 $60^\\circ$ をそのまま $\\theta=60$ としてはいけません。\n\n$60^\\circ=\\frac{\\pi}{3}$ に直してから代入します。\n\n弧度法の公式では、角度の単位を必ず確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 弧度法は角度を弧の長さで測る方法\n- $180^\\circ=\\pi$ ラジアン\n- 度数法から弧度法へは $\\frac{\\pi}{180}$ をかける\n- 弧度法から度数法へは $\\pi=180^\\circ$ と考える\n- 扇形の弧の長さは $l=r\\theta$\n- 扇形の面積は $S=\\frac{1}{2}r^2\\theta$\n- 扇形公式では角度を弧度法で使う",
},
],
checkQuestions: [
{
question: "$135^\\circ$ を弧度法で表せ。",
answer: "$135\\cdot\\frac{\\pi}{180}=\\frac{3\\pi}{4}$。",
hint: "180度がπ。",
},
{
question: "$\\frac{7\\pi}{6}$ を度数法で表せ。",
answer: "$\\frac{7}{6}\\times180^\\circ=210^\\circ$。",
hint: "πを180度に置き換える。",
},
{
question: "半径 $4$、中心角 $\\frac{\\pi}{2}$ の扇形の弧の長さを求めよ。",
answer: "$l=r\\theta=4\\cdot\\frac{\\pi}{2}=2\\pi$。",
hint: "角度は弧度法なのでそのまま使える。",
},
],
relatedPracticeLinks: [
{ label: "弧度法 演習", href: "/units/trigonometric-functions" },
{ label: "三角関数 基礎演習", href: "/units/trigonometric-functions" },
],
qualityTags: ["弧度法", "ラジアン", "扇形", "確認問題3問"],
},
{
lessonId: "trig-graphs-basic",
lessonTitle: "三角関数のグラフ",
lessonDescription: "sin・cos・tanのグラフを、周期・最大最小・対称性から理解する。",
level: "beginner",
estimatedMinutes: 70,
prerequisites: ["三角比から三角関数へ", "弧度法", "関数のグラフ"],
goals: [
"sinとcosのグラフの形を理解できる",
"周期の意味を説明できる",
"最大値・最小値を読み取れる",
"tanのグラフの特徴を理解できる",
"三角方程式・三角不等式に進む準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "三角関数は波のグラフになる",
body: "三角関数の大きな特徴は、値が周期的に繰り返されることです。\n\n単位円を1周すると、同じ点に戻ります。\n\nそのため、$\\sin\\theta$ や $\\cos\\theta$ の値も、角を $2\\pi$ だけ増やすと同じ値になります。\n\nこの周期性をグラフにすると、波のような形になります。\n\n三角関数のグラフでは、形を丸暗記するだけでなく、単位円との対応を理解することが大切です。",
},
{
kind: "concept",
title: "sinのグラフ",
body: "$y=\\sin x$ のグラフは、$x=0$ で $0$ から始まります。\n\n$x=\\frac{\\pi}{2}$ で最大値 $1$ をとります。\n\n$x=\\pi$ で再び $0$ になります。\n\n$x=\\frac{3\\pi}{2}$ で最小値 $-1$ をとります。\n\n$x=2\\pi$ でまた $0$ に戻ります。\n\nこの形が周期 $2\\pi$ で繰り返されます。",
},
{
kind: "concept",
title: "cosのグラフ",
body: "$y=\\cos x$ のグラフは、$x=0$ で $1$ から始まります。\n\n$x=\\frac{\\pi}{2}$ で $0$ になります。\n\n$x=\\pi$ で最小値 $-1$ をとります。\n\n$x=\\frac{3\\pi}{2}$ で再び $0$ になります。\n\n$x=2\\pi$ で $1$ に戻ります。\n\n$\\sin$ と $\\cos$ は形が似ていますが、スタート位置が違います。",
},
{
kind: "comparisonTable",
title: "sin・cos・tanのグラフの特徴",
body: "三角関数のグラフでは、周期・値の範囲・特徴を整理します。",
columns: ["関数", "周期", "値の範囲", "特徴"],
rows: [
{
cells: ["$y=\\sin x$", "$2\\pi$", "$-1\\leq y\\leq1$", "0から始まる波"],
highlight: true,
},
{
cells: ["$y=\\cos x$", "$2\\pi$", "$-1\\leq y\\leq1$", "1から始まる波"],
},
{
cells: ["$y=\\tan x$", "$\\pi$", "すべての実数", "漸近線をもつ"],
},
],
},
{
kind: "formula",
title: "周期性",
body: "$\\sin$ と $\\cos$ は $2\\pi$ ごとに同じ値をとります。\n\n$\\tan$ は $\\pi$ ごとに同じ値をとります。",
formula: "\\sin(x+2\\pi)=\\sin x,\\quad \\cos(x+2\\pi)=\\cos x",
},
{
kind: "workedExample",
title: "例1：sinの値をグラフで読む",
body: "$y=\\sin x$ について、$0\\leq x\\leq2\\pi$ の範囲で最大値と最小値を考えます。\n\n$\\sin x$ は、$x=\\frac{\\pi}{2}$ で最大値 $1$ をとります。\n\nまた、$x=\\frac{3\\pi}{2}$ で最小値 $-1$ をとります。\n\nしたがって、最大値は $1$、最小値は $-1$ です。\n\n三角関数では、グラフから最大値・最小値を読み取る問題がよく出ます。",
},
{
kind: "workedExample",
title: "例2：周期を使う",
body: "$\\sin\\left(x+2\\pi\\right)=\\sin x$ です。\n\nしたがって、$\\sin\\frac{13\\pi}{6}$ を考えるとき、\n\n$\\frac{13\\pi}{6}=2\\pi+\\frac{\\pi}{6}$\n\nなので、\n\n$\\sin\\frac{13\\pi}{6}=\\sin\\frac{\\pi}{6}=\\frac{1}{2}$\n\nです。\n\n大きな角は、周期を使って基本範囲に戻すと考えやすくなります。",
},
{
kind: "commonMistake",
title: "よくあるミス：sinとcosのスタート位置を混同する",
body: "$y=\\sin x$ は $x=0$ で $0$ から始まります。\n\n$y=\\cos x$ は $x=0$ で $1$ から始まります。\n\nこの違いを混同すると、グラフの読み取りや方程式で間違えやすくなります。\n\n単位円で見ると、$x=0$ の点は $(1,0)$ です。\n\n横座標が $\\cos0=1$、縦座標が $\\sin0=0$ なので、このスタート位置になります。",
},
{
kind: "summary",
title: "まとめ",
body: "- 三角関数のグラフは周期的に繰り返される\n- $y=\\sin x$ は0から始まる\n- $y=\\cos x$ は1から始まる\n- sinとcosの周期は $2\\pi$\n- tanの周期は $\\pi$\n- sinとcosの値の範囲は $-1\\leq y\\leq1$\n- グラフは三角方程式・不等式の基礎になる",
},
],
checkQuestions: [
{
question: "$y=\\sin x$ の周期を答えよ。",
answer: "$2\\pi$。",
hint: "単位円1周で同じ値に戻る。",
},
{
question: "$y=\\cos x$ は $x=0$ でいくつから始まるか。",
answer: "$1$。",
hint: "$\\cos0=1$。",
},
{
question: "$0\\leq x\\leq2\\pi$ で、$\\sin x$ が最小値をとるのはどこか。",
answer: "$x=\\frac{3\\pi}{2}$ で最小値 $-1$ をとる。",
hint: "単位円の一番下の点。",
},
],
relatedPracticeLinks: [
{ label: "三角関数グラフ 演習", href: "/units/trigonometric-functions" },
{ label: "二次関数 グラフ", href: "/courses/math-1a/quadratic" },
],
qualityTags: ["グラフ", "周期", "sin", "cos", "確認問題3問"],
},
];

const TRIGONOMETRIC_FUNCTIONS_STANDARD: CourseLesson[] = [
{
lessonId: "trig-identities-basic",
lessonTitle: "三角関数の基本公式",
lessonDescription: "相互関係・加法定理の入口を理解し、三角関数の式変形に慣れる。",
level: "standard",
estimatedMinutes: 75,
prerequisites: ["三角比から三角関数へ", "三角関数のグラフ", "式変形の基本"],
goals: [
"三角関数の相互関係を使える",
"$\\sin^2 x+\\cos^2 x=1$ の意味を理解できる",
"$\\tan x=\\frac{\\sin x}{\\cos x}$ を使える",
"加法定理の形を理解できる",
"三角関数の式変形の基本を身につける",
],
lessonBlocks: [
{
kind: "intro",
title: "三角関数は式変形が重要",
body: "三角関数では、値を求めるだけでなく、式を変形する力が重要になります。\n\n特に、$\\sin$、$\\cos$、$\\tan$ の関係を使って式を整理する問題が多く出ます。\n\n三角関数の公式は多く見えますが、最初に押さえるべきものは限られています。\n\nまずは、単位円から出る基本関係を理解しましょう。\n\nその上で、加法定理や2倍角の公式へ進みます。",
},
{
kind: "formula",
title: "三角関数の相互関係",
body: "単位円上の点を $(\\cos x,\\sin x)$ と考えると、その点は半径1の円上にあります。\n\nしたがって、横座標と縦座標は次の関係を満たします。",
formula: "\\sin^2 x+\\cos^2 x=1",
},
{
kind: "concept",
title: "相互関係の意味",
body: "$\\sin^2 x+\\cos^2 x=1$ は、単位円の方程式 $X^2+Y^2=1$ から来ています。\n\n単位円上の点の座標は $(\\cos x,\\sin x)$ です。\n\nしたがって、\n\n$(\\cos x)^2+(\\sin x)^2=1$\n\nとなります。\n\nこの公式は、三角関数の中で最も基本的な公式です。\n\n$\\sin x$ が分かれば $\\cos x$ の大きさが分かり、符号は象限で判断します。",
},
{
kind: "formula",
title: "tanとの関係",
body: "$\\tan x$ は、$\\sin x$ と $\\cos x$ の比として表されます。\n\nただし、$\\cos x=0$ のときは定義されません。",
formula: "\\tan x=\\frac{\\sin x}{\\cos x}",
},
{
kind: "workedExample",
title: "例1：sinからcosを求める",
body: "$\\sin x=\\frac{3}{5}$ で、$x$ が第2象限の角であるとします。$\\cos x$ を求めます。\n\n相互関係より、\n\n$\\sin^2 x+\\cos^2 x=1$\n\nです。\n\n$\\left(\\frac{3}{5}\\right)^2+\\cos^2 x=1$\n\n$\\frac{9}{25}+\\cos^2 x=1$\n\n$\\cos^2 x=\\frac{16}{25}$\n\nしたがって、$\\cos x=\\pm\\frac{4}{5}$ です。\n\n第2象限では $\\cos x<0$ なので、\n\n$\\cos x=-\\frac{4}{5}$\n\nです。\n\n三角関数では、2乗から戻すときに符号を象限で決めます。",
},
{
kind: "formula",
title: "加法定理",
body: "三角関数の最重要公式の1つが加法定理です。\n\n三角関数の多くの公式は、加法定理から導けます。",
formula: "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta",
},
{
kind: "comparisonTable",
title: "加法定理の基本形",
body: "まずはsinとcosの加法定理を確実に覚えます。",
columns: ["式", "公式"],
rows: [
{
cells: ["$\\sin(\\alpha+\\beta)$", "$\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta$"],
highlight: true,
},
{
cells: ["$\\sin(\\alpha-\\beta)$", "$\\sin\\alpha\\cos\\beta-\\cos\\alpha\\sin\\beta$"],
},
{
cells: ["$\\cos(\\alpha+\\beta)$", "$\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$"],
},
{
cells: ["$\\cos(\\alpha-\\beta)$", "$\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$"],
},
],
},
{
kind: "workedExample",
title: "例2：加法定理で値を求める",
body: "$\\sin75^\\circ$ を求めます。\n\n$75^\\circ=45^\\circ+30^\\circ$ と見ます。\n\n加法定理より、\n\n$\\sin75^\\circ=\\sin(45^\\circ+30^\\circ)$\n\n$=\\sin45^\\circ\\cos30^\\circ+\\cos45^\\circ\\sin30^\\circ$\n\n$=\\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2}+\\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2}$\n\n$=\\frac{\\sqrt{6}+\\sqrt{2}}{4}$\n\nです。\n\n特別な角の和として見ることで、新しい角の三角関数の値を求められます。",
},
{
kind: "commonMistake",
title: "よくあるミス：cosの加法定理の符号",
body: "$\\cos(\\alpha+\\beta)$ の公式は、\n\n$\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$\n\nです。\n\n真ん中がマイナスになることに注意してください。\n\n一方、$\\cos(\\alpha-\\beta)$ ではプラスになります。\n\nsinの加法定理とcosの加法定理では符号の出方が違うため、混同しやすいです。\n\n最初は公式表を見ながら、丁寧に代入してください。",
},
{
kind: "commonMistake",
title: "よくあるミス：$\\sin(\\alpha+\\beta)=\\sin\\alpha+\\sin\\beta$ としてしまう",
body: "加法定理を習い始めの頃、最もよくあるミスが\n\n$\\sin(\\alpha+\\beta)=\\sin\\alpha+\\sin\\beta$\n\nとしてしまうことです。これは正しくありません。\n\n具体的に $\\alpha=\\beta=30^\\circ$ で確認します。\n\n左辺：$\\sin(30^\\circ+30^\\circ)=\\sin60^\\circ=\\frac{\\sqrt{3}}{2}\\approx0.87$\n\n右辺：$\\sin30^\\circ+\\sin30^\\circ=\\frac{1}{2}+\\frac{1}{2}=1$\n\n左辺 $\\neq$ 右辺 なので、この等式は成立しません。\n\n三角関数は「角度 $\\to$ 座標」という対応であり、角度の足し算が座標の足し算にはなりません。単位円上では、$\\alpha+\\beta$ の方向の点と、$\\alpha$ の点・$\\beta$ の点は全く別の場所にあります。\n\n入試頻出パターンとして「$75^\\circ$ のsinを求めよ」という問題があります。このとき $75^\\circ=45^\\circ+30^\\circ$ と分解し、公式を使います。\n\n$\\sin75^\\circ=\\sin45^\\circ\\cos30^\\circ+\\cos45^\\circ\\sin30^\\circ=\\frac{\\sqrt{6}+\\sqrt{2}}{4}$\n\n加法定理を使う場面では、必ず右辺の展開形（sin cos＋cos sin）を丁寧に書き下してください。",
},
{
kind: "summary",
title: "まとめ",
body: "- 基本公式は $\\sin^2 x+\\cos^2 x=1$\n- $\\tan x=\\frac{\\sin x}{\\cos x}$\n- 2乗から戻すときは象限で符号を決める\n- 加法定理は三角関数の中心公式\n- $\\sin(\\alpha+\\beta)$ はsin cos + cos sin\n- $\\cos(\\alpha+\\beta)$ はcos cos - sin sin\n- 加法定理から多くの公式が導かれる\n- $\\sin(\\alpha+\\beta)\\neq\\sin\\alpha+\\sin\\beta$（線形ではない）",
},
],
checkQuestions: [
{
question: "$\\sin x=\\frac{5}{13}$、$x$ が第1象限の角であるとき、$\\cos x$ を求めよ。",
answer: "$\\cos^2 x=1-\\frac{25}{169}=\\frac{144}{169}$。第1象限なので、$\\cos x=\\frac{12}{13}$。",
hint: "$\\sin^2 x+\\cos^2 x=1$。",
},
{
question: "$\\tan x$ を $\\sin x$ と $\\cos x$ で表せ。",
answer: "$\\tan x=\\frac{\\sin x}{\\cos x}$。",
hint: "tanは縦座標÷横座標。",
},
{
question: "$\\cos(\\alpha+\\beta)$ の加法定理を答えよ。",
answer: "$\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$。",
hint: "cosの和は真ん中がマイナス。",
},
],
relatedPracticeLinks: [
{ label: "三角関数公式 演習", href: "/units/trigonometric-functions" },
{ label: "数と式 式変形", href: "/courses/math-1a/numbers-and-expressions/expression-transformation-strategy" },
],
qualityTags: ["相互関係", "加法定理", "式変形", "確認問題3問"],
},
{
lessonId: "double-angle-and-transformations",
lessonTitle: "2倍角・半角・合成",
lessonDescription: "加法定理から2倍角・半角・三角関数の合成を理解し、式変形に使う。",
level: "standard",
estimatedMinutes: 85,
prerequisites: ["三角関数の基本公式", "三角関数のグラフ", "二次関数の最大最小"],
goals: [
"2倍角の公式を使える",
"半角の公式の意味を理解できる",
"三角関数の合成を使って最大最小を求められる",
"三角方程式や最大最小問題で公式を選べる",
"入試標準レベルの三角関数問題に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "加法定理から公式を増やす",
body: "三角関数には多くの公式があります。\n\nその中でも重要なのが、2倍角、半角、合成です。\n\nこれらは別々の暗記項目に見えますが、もとは加法定理から出てきます。\n\n2倍角は、$\\alpha+\\alpha$ と考えることで導けます。\n\n半角は、2倍角の公式を変形して得られます。\n\n合成は、$a\\sin x+b\\cos x$ の形を、1つの三角関数にまとめる技術です。",
},
{
kind: "formula",
title: "2倍角の公式",
body: "加法定理で $\\alpha=\\beta=x$ とすると、2倍角の公式が得られます。",
formula: "\\sin2x=2\\sin x\\cos x",
},
{
kind: "comparisonTable",
title: "2倍角の基本公式",
body: "特にcosの2倍角は、状況に応じて3つの形を使い分けます。",
columns: ["公式", "使う場面"],
rows: [
{
cells: ["$\\sin2x=2\\sin x\\cos x$", "sinとcosの積があるとき"],
highlight: true,
},
{
cells: ["$\\cos2x=\\cos^2 x-\\sin^2 x$", "sinとcosが両方あるとき"],
},
{
cells: ["$\\cos2x=1-2\\sin^2 x$", "sinだけにしたいとき"],
},
{
cells: ["$\\cos2x=2\\cos^2 x-1$", "cosだけにしたいとき"],
},
],
},
{
kind: "workedExample",
title: "例1：2倍角を使う",
body: "$\\sin x=\\frac{3}{5}$、$\\cos x=\\frac{4}{5}$ のとき、$\\sin2x$ を求めます。\n\n2倍角の公式より、\n\n$\\sin2x=2\\sin x\\cos x$\n\nです。\n\n代入すると、\n\n$\\sin2x=2\\cdot\\frac{3}{5}\\cdot\\frac{4}{5}$\n\n$=\\frac{24}{25}$\n\nです。\n\n$\\sin2x$ は、$\\sin x$ と $\\cos x$ の積で表せます。",
},
{
kind: "formula",
title: "半角の公式",
body: "2倍角の公式を変形すると、半角の公式が得られます。\n\n符号は角がどの範囲にあるかで決まります。",
formula: "\\sin^2\\frac{x}{2}=\\frac{1-\\cos x}{2},\\quad \\cos^2\\frac{x}{2}=\\frac{1+\\cos x}{2}",
},
{
kind: "concept",
title: "三角関数の合成",
body: "$a\\sin x+b\\cos x$ の形は、1つの三角関数にまとめられます。\n\n例えば、$\\sin x+\\cos x$ は、\n\n$\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)$\n\nと表せます。\n\nこのように1つの三角関数にまとめると、最大値や最小値がすぐに分かります。\n\nなぜなら、$\\sin$ の値の範囲は $-1$ 以上 $1$ 以下だからです。",
},
{
kind: "formula",
title: "三角関数の合成",
body: "$a\\sin x+b\\cos x$ は、$R\\sin(x+\\alpha)$ の形にまとめられます。\n\nここで、$R=\\sqrt{a^2+b^2}$ です。",
formula: "a\\sin x+b\\cos x=R\\sin(x+\\alpha)",
},
{
kind: "workedExample",
title: "例2：合成で最大値を求める",
body: "$\\sin x+\\cos x$ の最大値を求めます。\n\n三角関数の合成を使うと、\n\n$\\sin x+\\cos x=\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)$\n\nです。\n\n$\\sin$ の最大値は $1$ なので、\n\n$\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)$ の最大値は $\\sqrt{2}$ です。\n\nしたがって、$\\sin x+\\cos x$ の最大値は $\\sqrt{2}$ です。\n\n合成は、三角関数の最大最小で非常に重要です。",
},
{
kind: "commonMistake",
title: "よくあるミス：合成後の係数を忘れる",
body: "$\\sin x+\\cos x$ を合成すると、単に $\\sin\\left(x+\\frac{\\pi}{4}\\right)$ ではありません。\n\n正しくは、$\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)$ です。\n\n前につく $\\sqrt{2}$ が最大値を決めます。\n\n一般に、$a\\sin x+b\\cos x$ の最大値は $\\sqrt{a^2+b^2}$ です。\n\n合成では、前の係数 $R$ を忘れないようにしましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 2倍角は加法定理から導ける\n- $\\sin2x=2\\sin x\\cos x$\n- $\\cos2x$ は複数の形を使い分ける\n- 半角公式は2倍角の変形から得られる\n- $a\\sin x+b\\cos x$ は合成できる\n- 合成すると最大最小が分かりやすくなる\n- 合成の係数は $\\sqrt{a^2+b^2}$",
},
],
checkQuestions: [
{
question: "$\\sin x=\\frac{5}{13}$、$\\cos x=\\frac{12}{13}$ のとき、$\\sin2x$ を求めよ。",
answer: "$\\sin2x=2\\sin x\\cos x=2\\cdot\\frac{5}{13}\\cdot\\frac{12}{13}=\\frac{120}{169}$。",
hint: "2倍角の公式。",
},
{
question: "$\\cos2x$ を $\\sin x$ だけで表す公式を答えよ。",
answer: "$\\cos2x=1-2\\sin^2 x$。",
hint: "$\\cos^2 x=1-\\sin^2 x$ を使う。",
},
{
question: "$3\\sin x+4\\cos x$ の最大値を求めよ。",
answer: "$\\sqrt{3^2+4^2}=5$。",
hint: "合成後の係数が最大値。",
},
],
relatedPracticeLinks: [
{ label: "2倍角・合成 演習", href: "/units/trigonometric-functions" },
{ label: "二次関数 最大最小", href: "/courses/math-1a/quadratic/quadratic-max-min-domain" },
],
qualityTags: ["2倍角", "半角", "合成", "最大最小", "確認問題3問"],
},
{
lessonId: "trig-equations-inequalities",
lessonTitle: "三角方程式・三角不等式",
lessonDescription: "単位円とグラフを使って、三角関数を含む方程式・不等式を解く。",
level: "standard",
estimatedMinutes: 85,
prerequisites: ["三角関数のグラフ", "三角関数の基本公式", "不等式の基本"],
goals: [
"三角方程式を単位円で解ける",
"三角方程式をグラフで解釈できる",
"三角不等式を範囲として読み取れる",
"周期を考慮して解を列挙できる",
"入試標準レベルの三角関数問題に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "三角方程式は角を探す問題",
body: "三角方程式とは、$\\sin x=\\frac{1}{2}$ や $\\cos x=-\\frac{1}{2}$ のように、三角関数を含む方程式です。\n\nこれは、指定された三角関数の値をとる角 $x$ を探す問題です。\n\n三角関数は周期的なので、同じ値をとる角が複数あります。\n\nしたがって、三角方程式では、単位円やグラフを使って、解をもれなく見つけることが重要です。",
},
{
kind: "strategy",
title: "三角方程式の手順",
body: "三角方程式は、次の手順で解くと安定します。\n\n1. 基本角を見つける\n2. 象限を確認する\n3. 指定された範囲内の解を列挙する\n4. 周期を考慮する\n5. 端点を含むか確認する\n\n特に、不等式では端点を含むかどうかが重要です。",
},
{
kind: "workedExample",
title: "例1：sinの方程式",
body: "$0\\leq x<2\\pi$ で、$\\sin x=\\frac{1}{2}$ を解きます。\n\n$\\sin x=\\frac{1}{2}$ となる基本角は $\\frac{\\pi}{6}$ です。\n\n$\\sin$ が正になるのは第1象限と第2象限です。\n\n第1象限の解は、\n\n$x=\\frac{\\pi}{6}$\n\nです。\n\n第2象限の解は、\n\n$x=\\pi-\\frac{\\pi}{6}=\\frac{5\\pi}{6}$\n\nです。\n\nしたがって、解は\n\n$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$\n\nです。",
},
{
kind: "workedExample",
title: "例2：cosの方程式",
body: "$0\\leq x<2\\pi$ で、$\\cos x=-\\frac{1}{2}$ を解きます。\n\n$\\cos$ の値の大きさが $\\frac{1}{2}$ になる基本角は $\\frac{\\pi}{3}$ です。\n\n$\\cos$ が負になるのは第2象限と第3象限です。\n\n第2象限では、\n\n$x=\\pi-\\frac{\\pi}{3}=\\frac{2\\pi}{3}$\n\n第3象限では、\n\n$x=\\pi+\\frac{\\pi}{3}=\\frac{4\\pi}{3}$\n\nです。\n\nしたがって、解は\n\n$x=\\frac{2\\pi}{3},\\frac{4\\pi}{3}$\n\nです。",
},
{
kind: "workedExample",
title: "例3：三角不等式",
body: "$0\\leq x<2\\pi$ で、$\\sin x\\geq\\frac{1}{2}$ を解きます。\n\nまず、$\\sin x=\\frac{1}{2}$ となる角は、\n\n$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$\n\nです。\n\n$\\sin x$ は単位円の縦座標です。\n\n縦座標が $\\frac{1}{2}$ 以上になるのは、第1象限から第2象限にかけての上側の部分です。\n\nしたがって、解は\n\n$\\frac{\\pi}{6}\\leq x\\leq\\frac{5\\pi}{6}$\n\nです。\n\n不等号に等号があるので、端点を含みます。",
},
{
kind: "commonMistake",
title: "よくあるミス：周期による解を落とす",
body: "三角関数は周期的なので、同じ値をとる角が複数あります。\n\n例えば、$0\\leq x<2\\pi$ で $\\sin x=\\frac{1}{2}$ の解は、$\\frac{\\pi}{6}$ だけではありません。\n\n第2象限にも $\\frac{5\\pi}{6}$ があります。\n\n三角方程式では、指定された範囲内のすべての解を見つける必要があります。\n\n単位円やグラフで、解を落としていないか確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 三角方程式は、指定された値をとる角を探す問題\n- 単位円で象限を確認する\n- $\\sin$ が正なのは第1・第2象限\n- $\\cos$ が正なのは第1・第4象限\n- 三角不等式は、単位円やグラフで範囲として読む\n- 周期による解の抜けに注意する\n- 端点を含むかは不等号で判断する",
},
],
checkQuestions: [
{
question: "$0\\leq x<2\\pi$ で、$\\sin x=\\frac{\\sqrt{3}}{2}$ を解け。",
answer: "基本角は $\\frac{\\pi}{3}$。sinが正なので第1・第2象限。解は $x=\\frac{\\pi}{3},\\frac{2\\pi}{3}$。",
hint: "sinが正の象限を考える。",
},
{
question: "$0\\leq x<2\\pi$ で、$\\cos x=\\frac{1}{2}$ を解け。",
answer: "基本角は $\\frac{\\pi}{3}$。cosが正なので第1・第4象限。解は $x=\\frac{\\pi}{3},\\frac{5\\pi}{3}$。",
hint: "第4象限の角を忘れない。",
},
{
question: "$0\\leq x<2\\pi$ で、$\\sin x<0$ となる範囲を答えよ。",
answer: "$\\pi<x<2\\pi$。",
hint: "sinは縦座標。下半分で負。",
},
],
relatedPracticeLinks: [
{ label: "三角方程式 演習", href: "/units/trigonometric-functions" },
{ label: "三角関数グラフ", href: "/courses/math-2bc/trigonometric-functions/trig-graphs-basic" },
],
qualityTags: ["三角方程式", "三角不等式", "単位円", "周期", "確認問題3問"],
},
];

const TRIGONOMETRIC_FUNCTIONS_ADVANCED: CourseLesson[] = [
{
lessonId: "trig-max-min-advanced",
lessonTitle: "三角関数の最大最小",
lessonDescription: "合成・置き換え・二次関数化を使って、三角関数の最大最小を処理する。",
level: "advanced",
estimatedMinutes: 90,
prerequisites: ["2倍角・半角・合成", "三角方程式・三角不等式", "二次関数の最大最小"],
goals: [
"三角関数の最大最小で使う方針を判断できる",
"合成で最大最小を求められる",
"$\\sin x$ や $\\cos x$ を置き換えて二次関数として処理できる",
"置き換え後の定義域を正しく設定できる",
"難関大レベルの三角関数最大最小に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "三角関数の最大最小は形で方針を決める",
body: "三角関数の最大最小では、式の形によって使う道具が変わります。\n\n$a\\sin x+b\\cos x$ の形なら、合成が有効です。\n\n$\\sin^2 x$ や $\\cos^2 x$ が含まれるなら、置き換えや2倍角が有効です。\n\n$\\sin x$ だけの二次式になっているなら、$t=\\sin x$ と置いて二次関数として考えます。\n\nこのとき大切なのは、置き換えた文字の範囲です。\n\n例えば、$t=\\sin x$ と置いたなら、必ず $-1\\leq t\\leq1$ です。",
},
{
kind: "comparisonTable",
title: "最大最小の方針",
body: "式の形を見て、どの方法が自然か判断します。",
columns: ["式の形", "方針", "注意点"],
rows: [
{
cells: ["$a\\sin x+b\\cos x$", "合成", "最大値は $\\sqrt{a^2+b^2}$"],
highlight: true,
},
{
cells: ["$\\sin^2 x$ と $\\cos^2 x$", "相互関係・2倍角", "1つの関数にそろえる"],
},
{
cells: ["$\\sin x$ の二次式", "$t=\\sin x$ と置く", "$-1\\leq t\\leq1$"],
},
{
cells: ["$\\cos x$ の二次式", "$t=\\cos x$ と置く", "$-1\\leq t\\leq1$"],
},
],
},
{
kind: "workedExample",
title: "例1：合成で最大最小",
body: "$2\\sin x+2\\cos x$ の最大値・最小値を求めます。\n\n三角関数の合成を使います。\n\n係数の大きさは、\n\n$R=\\sqrt{2^2+2^2}=2\\sqrt{2}$\n\nです。\n\nしたがって、\n\n$2\\sin x+2\\cos x=2\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)$\n\nと表せます。\n\n$\\sin$ の値は $-1$ 以上 $1$ 以下なので、\n\n最大値は $2\\sqrt{2}$、最小値は $-2\\sqrt{2}$ です。",
},
{
kind: "workedExample",
title: "例2：sinを置き換える",
body: "$2\\sin^2 x-4\\sin x+1$ の最大値・最小値を求めます。\n\n$t=\\sin x$ と置きます。\n\nこのとき、$-1\\leq t\\leq1$ です。\n\n式は、\n\n$2t^2-4t+1$\n\nになります。\n\n平方完成すると、\n\n$2t^2-4t+1=2(t-1)^2-1$\n\nです。\n\n$-1\\leq t\\leq1$ の範囲で考えます。\n\n最小値は、$t=1$ のとき $-1$ です。\n\n最大値は端点で比較します。\n\n$t=-1$ のとき、$2+4+1=7$。\n\n$t=1$ のとき、$2-4+1=-1$。\n\nしたがって、最大値は $7$、最小値は $-1$ です。\n\n置き換えたら、必ず定義域を確認します。",
},
{
kind: "workedExample",
title: "例3：2倍角で整理する",
body: "$\\sin^2 x-\\cos^2 x$ を考えます。\n\nこれは、2倍角の公式を使うと、\n\n$\\sin^2 x-\\cos^2 x=-\\cos2x$\n\nです。\n\n$\\cos2x$ の値は $-1$ 以上 $1$ 以下なので、$-\\cos2x$ も $-1$ 以上 $1$ 以下です。\n\nしたがって、$\\sin^2 x-\\cos^2 x$ の最大値は $1$、最小値は $-1$ です。\n\n2乗が混ざる式では、2倍角で整理できることがあります。",
},
{
kind: "commonMistake",
title: "よくあるミス：置き換え後の範囲を忘れる",
body: "$t=\\sin x$ と置いたなら、$t$ は任意の実数ではありません。\n\n必ず $-1\\leq t\\leq1$ です。\n\n二次関数として最大最小を考えるとき、この範囲を忘れると答えが変わります。\n\n例えば、頂点が範囲の外にある場合は、端点で最大最小が決まることがあります。\n\n三角関数の置き換えでは、定義域が最重要です。",
},
{
kind: "summary",
title: "まとめ",
body: "- 三角関数の最大最小は式の形で方針を選ぶ\n- $a\\sin x+b\\cos x$ は合成する\n- $t=\\sin x$ や $t=\\cos x$ と置くと二次関数になることがある\n- 置き換え後の範囲は $-1\\leq t\\leq1$\n- 2乗が混ざる式は2倍角で整理できることがある\n- 最大最小では端点確認を忘れない",
},
],
checkQuestions: [
{
question: "$3\\sin x+4\\cos x$ の最大値と最小値を求めよ。",
answer: "$R=\\sqrt{3^2+4^2}=5$ より、最大値は $5$、最小値は $-5$。",
hint: "合成の係数を見る。",
},
{
question: "$t=\\cos x$ と置いたとき、$t$ の範囲を答えよ。",
answer: "$-1\\leq t\\leq1$。",
hint: "cosの値の範囲。",
},
{
question: "$\\cos^2 x-\\sin^2 x$ を2倍角で表せ。",
answer: "$\\cos2x$。",
hint: "cosの2倍角の公式。",
},
],
relatedPracticeLinks: [
{ label: "三角関数 最大最小 演習", href: "/units/trigonometric-functions" },
{ label: "二次関数 最大最小", href: "/courses/math-1a/quadratic/quadratic-max-min-domain" },
],
qualityTags: ["旧帝大準備", "最大最小", "合成", "置き換え", "確認問題3問"],
},
{
lessonId: "trig-parameter-equations",
lessonTitle: "媒介変数と三角方程式",
lessonDescription: "パラメータを含む三角方程式を、値域・グラフ・置き換えで整理する。",
level: "advanced",
estimatedMinutes: 90,
prerequisites: ["三角方程式・三角不等式", "三角関数の最大最小", "二次関数のパラメータ"],
goals: [
"パラメータを含む三角方程式を値域で判断できる",
"解の個数をグラフで考えられる",
"置き換えによって代数方程式へ変換できる",
"範囲条件を落とさず処理できる",
"難関大レベルの三角関数問題の入口に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "パラメータ問題は値域を見る",
body: "三角関数に文字パラメータが入ると、単に方程式を解くだけではなく、解が存在する条件や解の個数を考えることがあります。\n\n例えば、$\\sin x=a$ が解をもつためには、$a$ が $-1$ 以上 $1$ 以下でなければなりません。\n\nなぜなら、$\\sin x$ の値域は $-1\\leq\\sin x\\leq1$ だからです。\n\nパラメータ問題では、まず三角関数の値域を見ることが重要です。",
},
{
kind: "concept",
title: "値域から存在条件を考える",
body: "$\\sin x=a$ が実数解をもつ条件を考えます。\n\n$\\sin x$ の値は、どんな $x$ に対しても $-1$ 以上 $1$ 以下です。\n\nしたがって、$a$ がこの範囲から外れていると、解は存在しません。\n\nつまり、解をもつ条件は、\n\n$-1\\leq a\\leq1$\n\nです。\n\n同じように、$\\cos x=a$ も解をもつ条件は $-1\\leq a\\leq1$ です。\n\n一方、$\\tan x=a$ は、任意の実数 $a$ に対して解をもちます。",
},
{
kind: "workedExample",
title: "例1：存在条件",
body: "方程式 $2\\sin x=a$ が実数解をもつための $a$ の条件を求めます。\n\n$\\sin x$ の範囲は、\n\n$-1\\leq\\sin x\\leq1$\n\nです。\n\n両辺を2倍すると、\n\n$-2\\leq2\\sin x\\leq2$\n\nです。\n\nしたがって、$2\\sin x=a$ が解をもつためには、\n\n$-2\\leq a\\leq2$\n\nである必要があります。",
},
{
kind: "workedExample",
title: "例2：置き換えで処理する",
body: "$2\\sin^2 x-3\\sin x+a=0$ が解をもつ条件を考えます。\n\n$t=\\sin x$ と置きます。\n\nこのとき、$-1\\leq t\\leq1$ です。\n\n方程式は、\n\n$2t^2-3t+a=0$\n\nになります。\n\n問題は、この二次方程式が区間 $-1\\leq t\\leq1$ に解をもつ条件を考える問題に変わります。\n\nここから先は、二次関数 $f(t)=2t^2-3t+a$ と区間 $[-1,1]$ の問題です。\n\n三角関数の問題が、二次関数の解の存在問題に変換されました。",
},
{
kind: "strategy",
title: "パラメータ三角方程式の手順",
body: "パラメータを含む三角方程式では、次の順番で考えます。\n\n1. 三角関数の値域を見る\n2. 必要なら $t=\\sin x$ や $t=\\cos x$ と置く\n3. 置き換え後の範囲を確認する\n4. 方程式を代数方程式として見る\n5. 解が範囲内にある条件を考える\n6. 必要ならグラフで解の個数を判断する\n\n最も危険なのは、置き換えた後の範囲を忘れることです。",
},
{
kind: "commonMistake",
title: "よくあるミス：tを任意の実数として扱う",
body: "$t=\\sin x$ と置いたら、$t$ は任意の実数ではありません。\n\n必ず $-1\\leq t\\leq1$ です。\n\n例えば、置き換え後の二次方程式が $t=2$ を解にもっても、それは $\\sin x=2$ を意味するため、実際の $x$ は存在しません。\n\n三角関数の置き換えでは、解が値域の中にあるかを必ず確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- パラメータ問題では値域を見る\n- $\\sin x$ と $\\cos x$ の値域は $-1$ 以上 $1$ 以下\n- $\\tan x$ はすべての実数値をとる\n- $t=\\sin x$ と置くと二次方程式にできることがある\n- 置き換え後の範囲を必ず確認する\n- 三角関数問題は、二次関数の解の配置問題につながる",
},
],
checkQuestions: [
{
question: "$3\\cos x=a$ が実数解をもつための $a$ の条件を求めよ。",
answer: "$-1\\leq\\cos x\\leq1$ より、$-3\\leq3\\cos x\\leq3$。したがって、$-3\\leq a\\leq3$。",
hint: "cosの値域を3倍する。",
},
{
question: "$t=\\sin x$ と置いたとき、置き換え後に必ず確認すべきことは何か。",
answer: "$t$ の範囲。必ず $-1\\leq t\\leq1$ を確認する。",
hint: "sinの値域。",
},
{
question: "$\\sin x=2$ は実数解をもつか。",
answer: "もたない。$\\sin x$ の値域は $-1\\leq\\sin x\\leq1$ だから。",
hint: "sinは2になれない。",
},
],
relatedPracticeLinks: [
{ label: "パラメータ三角方程式 演習", href: "/units/trigonometric-functions" },
{ label: "二次関数 パラメータ", href: "/courses/math-1a/quadratic/quadratic-param-function" },
],
qualityTags: ["旧帝大準備", "パラメータ", "値域", "置き換え", "確認問題3問"],
},
{
lessonId: "trigonometric-functions-exam-standard",
lessonTitle: "三角関数の融合問題",
lessonDescription: "単位円・グラフ・公式・最大最小・方程式を組み合わせた入試標準から難関大入口の問題を切り崩す。",
level: "advanced",
estimatedMinutes: 95,
prerequisites: ["三角関数の最大最小", "媒介変数と三角方程式", "2倍角・半角・合成"],
goals: [
"三角関数の複数の道具を組み合わせられる",
"式の形から公式を選べる",
"グラフと代数処理を行き来できる",
"最大最小・解の存在・解の個数を整理できる",
"難関大風の三角関数問題で初手を決められる",
],
lessonBlocks: [
{
kind: "intro",
title: "三角関数の融合問題は道具選びが勝負",
body: "三角関数の融合問題では、単位円・グラフ・公式・方程式・最大最小が組み合わさります。\n\n問題文を見て、すぐに公式を当てはめるのではなく、まず式の形を観察します。\n\n合成できるのか。2倍角が使えるのか。置き換えて二次関数にできるのか。グラフで解の個数を見るべきなのか。\n\n難しい問題ほど、最初の方針選択が重要です。\n\n三角関数は公式が多い単元ですが、使う公式を選ぶ基準を持てば、かなり整理できます。",
},
{
kind: "strategy",
title: "融合問題の確認リスト",
body: "三角関数の実戦問題では、次の順番で考えます。\n\n1. 角の範囲を確認する\n2. 式に $\\sin$ と $\\cos$ が混ざっているか見る\n3. $a\\sin x+b\\cos x$ なら合成を考える\n4. 2乗があるなら相互関係や2倍角を考える\n5. $\\sin x$ だけ、$\\cos x$ だけなら置き換えを考える\n6. 方程式なら単位円やグラフで解を確認する\n7. パラメータがあれば値域を見る\n\nこのリストで方針を決めると、公式の選択ミスが減ります。",
},
{
kind: "workedExample",
title: "例1：合成と方程式",
body: "$0\\leq x<2\\pi$ で、$\\sin x+\\cos x=1$ を解きます。\n\nまず左辺を合成します。\n\n$\\sin x+\\cos x=\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)$\n\nしたがって、\n\n$\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)=1$\n\n$\\sin\\left(x+\\frac{\\pi}{4}\\right)=\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$\n\nです。\n\n$0\\leq x<2\\pi$ なので、$\\frac{\\pi}{4}\\leq x+\\frac{\\pi}{4}<\\frac{9\\pi}{4}$ です。\n\nこの範囲で $\\sin$ が $\\frac{\\sqrt{2}}{2}$ になる角を探し、最後に $\\frac{\\pi}{4}$ を引きます。\n\nこのように、合成した後は角の範囲がずれることに注意します。",
},
{
kind: "workedExample",
title: "例2：置き換えと最大最小",
body: "$\\sin^2 x-2\\sin x+3$ の最大値・最小値を求めます。\n\n$t=\\sin x$ と置くと、$-1\\leq t\\leq1$ です。\n\n式は、\n\n$t^2-2t+3$\n\nになります。\n\n平方完成すると、\n\n$t^2-2t+3=(t-1)^2+2$\n\nです。\n\n$-1\\leq t\\leq1$ で考えると、最小値は $t=1$ のとき $2$ です。\n\n最大値は端点で比較します。\n\n$t=-1$ のとき、$1+2+3=6$。\n\n$t=1$ のとき、$2$。\n\nしたがって、最大値は $6$、最小値は $2$ です。\n\n三角関数の最大最小が、二次関数の最大最小に変わっています。",
},
{
kind: "workedExample",
title: "例3：2倍角で方程式を整理する",
body: "$\\cos2x=\\cos x$ を考えます。\n\n$\\cos2x=2\\cos^2 x-1$ を使うと、\n\n$2\\cos^2 x-1=\\cos x$\n\nです。\n\n$t=\\cos x$ と置くと、\n\n$2t^2-t-1=0$\n\nとなります。\n\n因数分解して、\n\n$(2t+1)(t-1)=0$\n\nしたがって、\n\n$t=1$ または $t=-\\frac{1}{2}$\n\nです。\n\nつまり、$\\cos x=1$ または $\\cos x=-\\frac{1}{2}$ を解けばよいです。\n\nこのように、2倍角と置き換えを組み合わせることで方程式を代数的に処理できます。",
},
{
kind: "comparisonTable",
title: "実戦で使う判断",
body: "三角関数の問題では、形を見て使う道具を選びます。",
columns: ["式の形", "使う道具", "目的"],
rows: [
{
cells: ["$a\\sin x+b\\cos x$", "合成", "最大最小・方程式"],
highlight: true,
},
{
cells: ["$\\sin^2 x,\\cos^2 x$", "相互関係・2倍角", "1つの関数にそろえる"],
},
{
cells: ["$\\sin x$ だけ", "置き換え", "二次関数化"],
},
{
cells: ["解の個数", "グラフ・値域", "交点を見る"],
},
{
cells: ["パラメータ", "値域", "存在条件を考える"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：角の範囲を変換後に忘れる",
body: "合成や置き換えをした後、角の範囲が変わることがあります。\n\n例えば、$\\sin\\left(x+\\frac{\\pi}{4}\\right)$ の形にしたら、もとの $x$ の範囲から、$x+\\frac{\\pi}{4}$ の範囲を考える必要があります。\n\nまた、$t=\\sin x$ と置いたら、$t$ の範囲は $-1\\leq t\\leq1$ です。\n\n変換後の範囲を忘れると、余分な解を入れたり、必要な解を落としたりします。",
},
{
kind: "summary",
title: "まとめ",
body: "- 三角関数の融合問題は方針選択が重要\n- 合成は $a\\sin x+b\\cos x$ に有効\n- 2乗があるときは相互関係や2倍角を考える\n- 置き換えたら範囲を確認する\n- 方程式は単位円・グラフ・代数処理を使い分ける\n- パラメータ問題では値域を見る\n- 変換後の角や文字の範囲を忘れない",
},
],
checkQuestions: [
{
question: "$\\sin x+\\cos x$ の最大値を求めよ。",
answer: "$\\sin x+\\cos x=\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)$ より、最大値は $\\sqrt{2}$。",
hint: "合成する。",
},
{
question: "$t=\\sin x$ と置いて $t^2-4t+1$ を考えるとき、$t$ の範囲を答えよ。",
answer: "$-1\\leq t\\leq1$。",
hint: "sinの値域。",
},
{
question: "$\\cos2x$ を $\\cos x$ だけで表せ。",
answer: "$\\cos2x=2\\cos^2 x-1$。",
hint: "2倍角の公式。",
},
],
relatedPracticeLinks: [
{ label: "三角関数 実戦演習", href: "/units/trigonometric-functions" },
{ label: "二次関数 最大最小", href: "/courses/math-1a/quadratic/quadratic-max-min-domain" },
{ label: "過去問道場", href: "/dojo" },
],
qualityTags: ["旧帝大準備", "融合問題", "合成", "最大最小", "方程式"],
},
];

export const TRIGONOMETRIC_FUNCTIONS_UNIT: CourseUnit = {
unitId: "trigonometric-functions",
subjectId: "math-2bc",
unitTitle: "三角関数",
unitDescription:
"単位円、弧度法、三角関数のグラフ、加法定理、2倍角・半角・合成、三角方程式、最大最小まで体系的に学ぶ単元です。",
lessons: [
...TRIGONOMETRIC_FUNCTIONS_BEGINNER,
...TRIGONOMETRIC_FUNCTIONS_STANDARD,
...TRIGONOMETRIC_FUNCTIONS_ADVANCED,
],
};
