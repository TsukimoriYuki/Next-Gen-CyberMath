import type { CourseLesson, CourseUnit } from "@/types/course";

const PLANE_CURVES_BEGINNER: CourseLesson[] = [
{
lessonId: "plane-curves-overview",
lessonTitle: "平面上の曲線とは何か",
lessonDescription: "直線・円・放物線・楕円・双曲線を、方程式で表される点の集合として理解する。",
level: "beginner",
estimatedMinutes: 60,
prerequisites: ["座標平面", "図形と方程式", "二次関数"],
goals: [
"平面上の曲線を点の集合として説明できる",
"方程式が図形を表すことを理解できる",
"放物線・楕円・双曲線の違いを大まかに説明できる",
"標準形から曲線の形を読み取る準備ができる",
"媒介変数表示や極座標に進む土台を作れる",
],
lessonBlocks: [
{
kind: "intro",
title: "曲線は条件を満たす点の集まり",
body: "平面上の曲線とは、ある条件を満たす点全体の集合です。\n\n例えば、円は「中心からの距離が一定である点の集まり」です。\n\nこれを方程式で表すと、中心が原点で半径が $r$ の円は\n\n$x^2+y^2=r^2$\n\nとなります。\n\nこのように、曲線は図形として見るだけでなく、方程式として扱えます。\n\n数学Cの平面上の曲線では、放物線・楕円・双曲線・媒介変数表示・極座標を体系的に学びます。",
},
{
kind: "comparisonTable",
title: "代表的な平面曲線",
body: "まずは、どの曲線がどのような形を表すかを整理します。",
columns: ["曲線", "標準形の例", "特徴"],
rows: [
{
cells: ["円", "$x^2+y^2=r^2$", "中心からの距離が一定"],
highlight: true,
},
{
cells: ["放物線", "$y^2=4px$", "焦点と準線から等距離"],
},
{
cells: ["楕円", "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$", "2つの焦点からの距離の和が一定"],
},
{
cells: ["双曲線", "$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$", "2つの焦点からの距離の差が一定"],
},
],
},
{
kind: "concept",
title: "方程式が図形を表す",
body: "方程式 $x^2+y^2=1$ は、ただの式ではなく、条件を満たす点 $(x,y)$ の集合を表しています。\n\nこの式を満たす点は、原点からの距離が $1$ の点です。\n\nつまり、単位円を表します。\n\n同じように、$y=x^2$ は放物線を表し、$x+y=1$ は直線を表します。\n\n曲線の学習では、方程式を見て図形を読む力と、図形から方程式を作る力が大切です。",
},
{
kind: "workedExample",
title: "例1：方程式から図形を読む",
body: "$x^2+y^2=9$ が表す図形を考えます。\n\nこれは、\n\n$x^2+y^2=3^2$\n\nと見られます。\n\n中心は原点、半径は $3$ です。\n\nしたがって、この方程式は中心が原点で半径が $3$ の円を表します。\n\n方程式の形から、図形の種類・中心・大きさを読み取ります。",
},
{
kind: "concept",
title: "二次曲線という見方",
body: "放物線・楕円・双曲線は、まとめて二次曲線と呼ばれます。\n\nなぜなら、これらは $x^2$ や $y^2$ を含む二次方程式で表されるからです。\n\n例えば、円も二次曲線の一種です。\n\n二次曲線では、方程式の形を標準形に整えることで、曲線の種類や向き、中心、軸などを読み取れます。",
},
{
kind: "commonMistake",
title: "よくあるミス：式だけ見て図形を想像しない",
body: "平面上の曲線では、式変形だけでなく、図形のイメージが重要です。\n\n例えば、$x^2+y^2=4$ を見たら、すぐに半径2の円をイメージします。\n\n$y^2=4x$ を見たら、右向きに開く放物線をイメージします。\n\n式と図形を行き来することが、この単元の核心です。",
},
{
kind: "summary",
title: "まとめ",
body: "- 曲線は条件を満たす点全体の集合\n- 方程式は図形を表す\n- 円・放物線・楕円・双曲線は代表的な平面曲線\n- 放物線・楕円・双曲線は二次曲線と呼ばれる\n- 標準形から図形の特徴を読む\n- 式と図形を行き来する力が重要",
},
],
checkQuestions: [
{
question: "$x^2+y^2=16$ が表す図形を答えよ。",
answer: "中心が原点、半径が $4$ の円。",
hint: "$16=4^2$。",
},
{
question: "放物線・楕円・双曲線をまとめて何というか。",
answer: "二次曲線。",
hint: "$x^2$ や $y^2$ を含む方程式で表される。",
},
{
question: "平面上の曲線を、点の集合として説明せよ。",
answer: "ある条件や方程式を満たす点全体の集合。",
hint: "円なら中心から一定距離の点の集合。",
},
],
relatedPracticeLinks: [
{ label: "平面上の曲線 基礎演習", href: "/units/plane-curves", description: "曲線の基本" },
{ label: "図形と方程式", href: "/courses/math-2bc/geometry-equations", description: "座標幾何の復習" },
],
qualityTags: ["平面上の曲線", "二次曲線", "標準形", "確認問題3問"],
},
{
lessonId: "parabola-standard-form",
lessonTitle: "放物線の標準形",
lessonDescription: "放物線を焦点と準線から定義し、標準形とグラフの向きを理解する。",
level: "beginner",
estimatedMinutes: 75,
prerequisites: ["二次関数", "距離の公式", "座標平面"],
goals: [
"放物線を焦点と準線から説明できる",
"$y^2=4px$ の形を理解できる",
"放物線の焦点と準線を求められる",
"開く向きを標準形から判断できる",
"二次関数の放物線との違いを理解できる",
],
lessonBlocks: [
{
kind: "intro",
title: "放物線は焦点と準線から等距離の点",
body: "放物線は、1つの点と1つの直線からの距離が等しい点の集合です。\n\nこの点を焦点、直線を準線といいます。\n\n数学IAの二次関数で見た $y=x^2$ も放物線ですが、数学Cでは、焦点と準線という幾何的な定義から放物線を見ます。\n\nこの見方をすると、横向きの放物線や、標準形 $y^2=4px$ が自然に出てきます。",
},
{
kind: "formula",
title: "放物線の標準形",
body: "焦点が $(p,0)$、準線が $x=-p$ の放物線は、次の方程式で表されます。",
formula: "y^2=4px",
},
{
kind: "concept",
title: "標準形の読み方",
body: "$y^2=4px$ は、x軸方向に開く放物線です。\n\n$p>0$ なら右向きに開き、$p<0$ なら左向きに開きます。\n\n焦点は $(p,0)$、準線は $x=-p$ です。\n\n頂点は原点 $(0,0)$ です。\n\n二次関数 $y=ax^2$ は上下に開くことが多いですが、$y^2=4px$ は左右に開く形です。",
},
{
kind: "comparisonTable",
title: "放物線の標準形",
body: "どちらの変数が2乗されているかで、開く向きが変わります。",
columns: ["標準形", "開く向き", "焦点"],
rows: [
{
cells: ["$y^2=4px$", "左右方向", "$(p,0)$"],
highlight: true,
},
{
cells: ["$x^2=4py$", "上下方向", "$(0,p)$"],
},
],
},
{
kind: "workedExample",
title: "例1：焦点と準線を求める",
body: "放物線 $y^2=8x$ の焦点と準線を求めます。\n\n標準形 $y^2=4px$ と比べます。\n\n$4p=8$ なので、$p=2$ です。\n\nしたがって、焦点は $(2,0)$ です。\n\n準線は $x=-2$ です。\n\nまた、$p>0$ なので、この放物線は右向きに開きます。",
},
{
kind: "workedExample",
title: "例2：方程式を作る",
body: "焦点が $(3,0)$、準線が $x=-3$ の放物線の方程式を求めます。\n\n標準形では、焦点が $(p,0)$、準線が $x=-p$ です。\n\nしたがって、$p=3$ です。\n\n方程式は、\n\n$y^2=4px$\n\nなので、\n\n$y^2=12x$\n\nです。",
},
{
kind: "commonMistake",
title: "よくあるミス：4pをpと読む",
body: "$y^2=12x$ を見て、すぐに $p=12$ としてはいけません。\n\n標準形は $y^2=4px$ です。\n\nつまり、$4p=12$ なので、$p=3$ です。\n\n焦点は $(12,0)$ ではなく、$(3,0)$ です。\n\n係数は $4p$ であることを忘れないようにしましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 放物線は焦点と準線から等距離の点の集合\n- $y^2=4px$ の焦点は $(p,0)$\n- 準線は $x=-p$\n- $p>0$ なら右向き、$p<0$ なら左向き\n- $x^2=4py$ は上下方向に開く\n- 係数は $p$ ではなく $4p$ と比べる",
},
],
checkQuestions: [
{
question: "$y^2=16x$ の焦点と準線を求めよ。",
answer: "$4p=16$ より $p=4$。焦点は $(4,0)$、準線は $x=-4$。",
hint: "$y^2=4px$ と比べる。",
},
{
question: "$x^2=12y$ の焦点を求めよ。",
answer: "$4p=12$ より $p=3$。焦点は $(0,3)$。",
hint: "$x^2=4py$ の形。",
},
{
question: "$y^2=-8x$ はどちら向きに開くか。",
answer: "$4p=-8$ より $p=-2$。左向きに開く。",
hint: "$p<0$。",
},
],
relatedPracticeLinks: [
{ label: "放物線 演習", href: "/units/plane-curves", description: "焦点・準線・標準形" },
{ label: "二次関数", href: "/courses/math-1a/quadratic", description: "放物線の復習" },
],
qualityTags: ["放物線", "焦点", "準線", "確認問題3問"],
},
{
lessonId: "ellipse-hyperbola-basic",
lessonTitle: "楕円と双曲線の基本",
lessonDescription: "楕円と双曲線の標準形を読み取り、焦点・軸・グラフの特徴を整理する。",
level: "beginner",
estimatedMinutes: 80,
prerequisites: ["平面上の曲線とは何か", "距離の公式", "円の方程式"],
goals: [
"楕円の標準形を理解できる",
"双曲線の標準形を理解できる",
"楕円と双曲線の違いを説明できる",
"軸方向と頂点を読み取れる",
"焦点の位置を求める準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "楕円と双曲線は焦点で定義される",
body: "楕円と双曲線は、2つの焦点を使って定義されます。\n\n楕円は、2つの焦点からの距離の和が一定である点の集合です。\n\n双曲線は、2つの焦点からの距離の差が一定である点の集合です。\n\nどちらも二次曲線ですが、方程式の符号や形が違います。\n\n標準形を読めるようになると、グラフの概形を素早く描けます。",
},
{
kind: "formula",
title: "楕円の標準形",
body: "中心が原点で、x軸方向に長い楕円は次の形で表されます。",
formula: "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1",
},
{
kind: "formula",
title: "双曲線の標準形",
body: "中心が原点で、x軸方向に開く双曲線は次の形で表されます。",
formula: "\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1",
},
{
kind: "comparisonTable",
title: "楕円と双曲線の違い",
body: "標準形では、符号の違いが最も重要です。",
columns: ["曲線", "標準形", "特徴"],
rows: [
{
cells: ["楕円", "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$", "足し算、閉じた曲線"],
highlight: true,
},
{
cells: ["双曲線", "$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$", "引き算、2つの枝"],
},
],
},
{
kind: "concept",
title: "楕円の読み方",
body: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$ では、分母が大きい方向に長くなります。\n\n例えば、$\\frac{x^2}{9}+\\frac{y^2}{4}=1$ では、x方向の半径が $3$、y方向の半径が $2$ です。\n\nしたがって、横長の楕円です。\n\n頂点は、$(\\pm3,0)$ と $(0,\\pm2)$ です。",
},
{
kind: "workedExample",
title: "例1：楕円を読む",
body: "$\\frac{x^2}{25}+\\frac{y^2}{9}=1$ の概形を考えます。\n\nx方向の分母は $25=5^2$ なので、x方向の半径は $5$ です。\n\ny方向の分母は $9=3^2$ なので、y方向の半径は $3$ です。\n\nしたがって、横長の楕円です。\n\n頂点は、$(\\pm5,0)$、$(0,\\pm3)$ です。",
},
{
kind: "concept",
title: "双曲線の読み方",
body: "$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ は、x軸方向に開く双曲線です。\n\n最初に正で出てくる変数の方向に開きます。\n\n一方、$\\frac{y^2}{b^2}-\\frac{x^2}{a^2}=1$ なら、y軸方向に開きます。\n\n双曲線には、グラフが近づいていく直線である漸近線があります。\n\n$x$ が正の項なら左右に開く、とまず判断しましょう。",
},
{
kind: "workedExample",
title: "例2：双曲線を読む",
body: "$\\frac{x^2}{9}-\\frac{y^2}{4}=1$ の概形を考えます。\n\n正の項が $x^2$ なので、x軸方向に開きます。\n\n$a^2=9$ より、$a=3$ です。\n\nしたがって、頂点は $(\\pm3,0)$ です。\n\n双曲線は左右に2つの枝をもつ曲線になります。",
},
{
kind: "commonMistake",
title: "よくあるミス：楕円と双曲線を符号で見分けない",
body: "楕円と双曲線は、標準形の符号で見分けます。\n\n$x^2$ の項と $y^2$ の項がどちらもプラスなら楕円です。\n\n片方がプラス、片方がマイナスなら双曲線です。\n\n分母の大きさだけを見て判断するのではなく、まず符号を確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 楕円は2焦点からの距離の和が一定\n- 双曲線は2焦点からの距離の差が一定\n- 楕円の標準形は足し算\n- 双曲線の標準形は引き算\n- 楕円は分母が大きい方向に長い\n- 双曲線は正の項の変数方向に開く\n- 標準形から頂点や概形を読む",
},
],
checkQuestions: [
{
question: "$\\frac{x^2}{16}+\\frac{y^2}{9}=1$ はどのような楕円か。",
answer: "x方向の半径が4、y方向の半径が3の横長の楕円。",
hint: "分母の平方根を見る。",
},
{
question: "$\\frac{y^2}{25}-\\frac{x^2}{4}=1$ はどちら向きに開く双曲線か。",
answer: "正の項が $y^2$ なので、上下方向に開く。",
hint: "正の項の変数を見る。",
},
{
question: "楕円と双曲線を標準形で見分ける最初のポイントは何か。",
answer: "$x^2$ と $y^2$ の項の符号。両方プラスなら楕円、片方マイナスなら双曲線。",
hint: "符号を見る。",
},
],
relatedPracticeLinks: [
{ label: "楕円・双曲線 演習", href: "/units/plane-curves", description: "標準形の読み取り" },
{ label: "円の方程式", href: "/courses/math-2bc/geometry-equations/circle-equations-basic", description: "円との接続" },
],
qualityTags: ["楕円", "双曲線", "標準形", "確認問題3問"],
},
];

const PLANE_CURVES_STANDARD: CourseLesson[] = [
{
lessonId: "conic-foci-and-asymptotes",
lessonTitle: "焦点・離心率・漸近線",
lessonDescription: "楕円・双曲線の焦点、離心率、双曲線の漸近線を標準形から読み取る。",
level: "standard",
estimatedMinutes: 85,
prerequisites: ["楕円と双曲線の基本", "平方根", "直線の方程式"],
goals: [
"楕円の焦点を求められる",
"双曲線の焦点を求められる",
"離心率の意味を理解できる",
"双曲線の漸近線を求められる",
"標準形から曲線の重要情報を整理できる",
],
lessonBlocks: [
{
kind: "intro",
title: "標準形から曲線の情報を読む",
body: "楕円や双曲線では、標準形から焦点・頂点・軸・漸近線などを読み取ります。\n\n特に焦点は、曲線の定義に関わる重要な点です。\n\n楕円では、長軸方向に焦点があります。\n\n双曲線では、開く方向に焦点があります。\n\n双曲線ではさらに、グラフが近づく直線である漸近線も重要です。",
},
{
kind: "formula",
title: "楕円の焦点",
body: "$a>b>0$ の楕円 $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$ の焦点は、$c^2=a^2-b^2$ を用いて表されます。",
formula: "c^2=a^2-b^2",
},
{
kind: "workedExample",
title: "例1：楕円の焦点",
body: "$\\frac{x^2}{25}+\\frac{y^2}{9}=1$ の焦点を求めます。\n\n$a^2=25$、$b^2=9$ です。\n\n$c^2=a^2-b^2=25-9=16$\n\nより、$c=4$ です。\n\n横長の楕円なので、焦点はx軸上にあります。\n\nしたがって、焦点は $(\\pm4,0)$ です。",
},
{
kind: "formula",
title: "双曲線の焦点",
body: "双曲線 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ の焦点は、$c^2=a^2+b^2$ を用いて表されます。",
formula: "c^2=a^2+b^2",
},
{
kind: "workedExample",
title: "例2：双曲線の焦点",
body: "$\\frac{x^2}{9}-\\frac{y^2}{16}=1$ の焦点を求めます。\n\n$a^2=9$、$b^2=16$ です。\n\n双曲線では、\n\n$c^2=a^2+b^2=9+16=25$\n\nより、$c=5$ です。\n\nx軸方向に開くので、焦点はx軸上にあります。\n\nしたがって、焦点は $(\\pm5,0)$ です。",
},
{
kind: "formula",
title: "双曲線の漸近線",
body: "双曲線 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ の漸近線は次の2本です。",
formula: "y=\\pm\\frac{b}{a}x",
},
{
kind: "workedExample",
title: "例3：漸近線を求める",
body: "$\\frac{x^2}{9}-\\frac{y^2}{4}=1$ の漸近線を求めます。\n\n$a=3$、$b=2$ です。\n\n漸近線は、\n\n$y=\\pm\\frac{b}{a}x$\n\nなので、\n\n$y=\\pm\\frac{2}{3}x$\n\nです。\n\n双曲線のグラフは、この2本の直線に近づいていきます。",
},
{
kind: "comparisonTable",
title: "焦点公式の違い",
body: "楕円と双曲線では、$c^2$ の式が違います。",
columns: ["曲線", "焦点の関係式", "理由のイメージ"],
rows: [
{
cells: ["楕円", "$c^2=a^2-b^2$", "焦点は長半径より内側"],
highlight: true,
},
{
cells: ["双曲線", "$c^2=a^2+b^2$", "焦点は頂点より外側"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：楕円と双曲線の焦点公式を混同する",
body: "楕円では $c^2=a^2-b^2$ です。\n\n双曲線では $c^2=a^2+b^2$ です。\n\n同じ二次曲線でも、焦点の位置関係が違います。\n\n楕円は焦点が内側にあり、双曲線は焦点が頂点より外側にある、とイメージすると区別しやすくなります。",
},
{
kind: "summary",
title: "まとめ",
body: "- 楕円の焦点は長軸方向にある\n- 楕円では $c^2=a^2-b^2$\n- 双曲線の焦点は開く方向にある\n- 双曲線では $c^2=a^2+b^2$\n- 双曲線の漸近線は $y=\\pm\\frac{b}{a}x$\n- 標準形から焦点・頂点・漸近線を読む",
},
],
checkQuestions: [
{
question: "$\\frac{x^2}{36}+\\frac{y^2}{20}=1$ の焦点を求めよ。",
answer: "$c^2=36-20=16$ より $c=4$。焦点は $(\\pm4,0)$。",
hint: "横長の楕円。",
},
{
question: "$\\frac{x^2}{4}-\\frac{y^2}{9}=1$ の焦点を求めよ。",
answer: "$c^2=4+9=13$ より、焦点は $(\\pm\\sqrt{13},0)$。",
hint: "双曲線では足す。",
},
{
question: "$\\frac{x^2}{16}-\\frac{y^2}{25}=1$ の漸近線を求めよ。",
answer: "$a=4$、$b=5$ より、$y=\\pm\\frac{5}{4}x$。",
hint: "$y=\\pm\\frac{b}{a}x$。",
},
],
relatedPracticeLinks: [
{ label: "焦点・漸近線 演習", href: "/units/plane-curves", description: "楕円・双曲線の標準形" },
{ label: "直線の方程式", href: "/courses/math-2bc/geometry-equations/line-equations-basic", description: "漸近線の確認" },
],
qualityTags: ["焦点", "離心率", "漸近線", "確認問題3問"],
},
{
lessonId: "parametric-representation-basic",
lessonTitle: "媒介変数表示",
lessonDescription: "xとyを別の変数で表す媒介変数表示を理解し、曲線の方程式へ変換する。",
level: "standard",
estimatedMinutes: 85,
prerequisites: ["関数のグラフ", "三角関数", "式変形"],
goals: [
"媒介変数表示の意味を説明できる",
"媒介変数を消去して方程式を求められる",
"円の媒介変数表示を理解できる",
"放物線の媒介変数表示を扱える",
"動点の軌跡として曲線を理解できる",
],
lessonBlocks: [
{
kind: "intro",
title: "曲線を動きで表す",
body: "媒介変数表示とは、点の座標 $x,y$ を別の変数で表す方法です。\n\n例えば、$x=t$、$y=t^2$ とすると、$t$ が変化するにつれて点 $(x,y)$ が動きます。\n\nこの点の動いた跡が曲線になります。\n\nこの場合、$t=x$ なので、$y=x^2$ という放物線を表します。\n\n媒介変数表示は、曲線を点の運動として見る方法です。",
},
{
kind: "concept",
title: "媒介変数とは",
body: "媒介変数とは、$x$ と $y$ を間接的につなぐための変数です。\n\nよく $t$ が使われます。\n\n$x=f(t)$、$y=g(t)$ のように表すと、$t$ の値に応じて点 $(x,y)$ が決まります。\n\nこのとき、$t$ を消去できれば、$x$ と $y$ だけの方程式が得られます。",
},
{
kind: "workedExample",
title: "例1：媒介変数を消去する",
body: "$x=t+1$、$y=2t-3$ で表される曲線を考えます。\n\nまず、$x=t+1$ より、$t=x-1$ です。\n\nこれを $y=2t-3$ に代入します。\n\n$y=2(x-1)-3$\n\n$=2x-5$\n\nです。\n\nしたがって、この媒介変数表示は直線 $y=2x-5$ を表します。",
},
{
kind: "workedExample",
title: "例2：放物線の媒介変数表示",
body: "$x=t$、$y=t^2+1$ で表される曲線を考えます。\n\n$x=t$ なので、$t=x$ です。\n\nこれを $y=t^2+1$ に代入すると、\n\n$y=x^2+1$\n\nです。\n\nしたがって、この媒介変数表示は、放物線 $y=x^2+1$ を表します。",
},
{
kind: "formula",
title: "円の媒介変数表示",
body: "中心が原点で半径 $r$ の円は、三角関数を使って次のように表せます。",
formula: "x=r\\cos t,\\quad y=r\\sin t",
},
{
kind: "workedExample",
title: "例3：円の媒介変数表示",
body: "$x=3\\cos t$、$y=3\\sin t$ が表す曲線を考えます。\n\n両辺を2乗して足します。\n\n$x^2+y^2=9\\cos^2t+9\\sin^2t$\n\n$=9(\\cos^2t+\\sin^2t)$\n\n$=9$\n\nです。\n\nしたがって、この曲線は中心が原点、半径が $3$ の円です。",
},
{
kind: "strategy",
title: "媒介変数表示の処理手順",
body: "媒介変数表示では、次の順番で考えます。\n\n1. $x$ と $y$ が何で表されているか確認する\n2. 片方の式から媒介変数を表す\n3. もう片方に代入して消去する\n4. 三角関数なら $\\sin^2t+\\cos^2t=1$ を使う\n5. 必要なら媒介変数の範囲から曲線の範囲を確認する\n\n媒介変数を消すことが基本方針です。",
},
{
kind: "commonMistake",
title: "よくあるミス：媒介変数の範囲を確認しない",
body: "媒介変数を消去して方程式が出ても、曲線全体を表すとは限りません。\n\n例えば、$t$ の範囲が $0\\leq t\\leq1$ なら、曲線の一部だけを表している場合があります。\n\n媒介変数表示では、$t$ の範囲が指定されているかを必ず確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 媒介変数表示は $x,y$ を別の変数で表す方法\n- 点の動きとして曲線を表せる\n- 媒介変数を消去すると通常の方程式になる\n- 円は $x=r\\cos t, y=r\\sin t$ と表せる\n- 三角関数では $\\sin^2t+\\cos^2t=1$ を使う\n- 媒介変数の範囲も確認する",
},
],
checkQuestions: [
{
question: "$x=t-2$、$y=3t+1$ の媒介変数 $t$ を消去せよ。",
answer: "$t=x+2$ より、$y=3(x+2)+1=3x+7$。",
hint: "xの式からtを表す。",
},
{
question: "$x=2\\cos t$、$y=2\\sin t$ が表す曲線を答えよ。",
answer: "$x^2+y^2=4$。中心が原点、半径2の円。",
hint: "2乗して足す。",
},
{
question: "媒介変数表示で最後に確認すべきことを1つ答えよ。",
answer: "媒介変数の範囲。",
hint: "曲線全体とは限らない。",
},
],
relatedPracticeLinks: [
{ label: "媒介変数表示 演習", href: "/units/plane-curves", description: "媒介変数の消去" },
{ label: "三角関数", href: "/courses/math-2bc/trigonometric-functions", description: "円の媒介変数表示" },
],
qualityTags: ["媒介変数表示", "動点", "円", "確認問題3問"],
},
{
lessonId: "polar-coordinates-basic",
lessonTitle: "極座標と極方程式",
lessonDescription: "点を距離と角度で表す極座標を理解し、直交座標との変換を学ぶ。",
level: "standard",
estimatedMinutes: 90,
prerequisites: ["三角関数", "座標平面", "円の方程式"],
goals: [
"極座標の意味を説明できる",
"直交座標と極座標を変換できる",
"極方程式の基本を理解できる",
"$x=r\\cos\\theta$、$y=r\\sin\\theta$ を使える",
"極座標で円や直線を扱う準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "点を距離と角度で表す",
body: "通常の座標平面では、点を $(x,y)$ で表します。\n\nこれは、横方向と縦方向の位置を表す方法です。\n\n一方、極座標では、原点からの距離 $r$ と、x軸の正の向きからの角度 $\\theta$ で点を表します。\n\nつまり、点を $(r,\\theta)$ の形で表します。\n\n円運動や回転を扱うとき、極座標は非常に便利です。",
},
{
kind: "formula",
title: "直交座標への変換",
body: "極座標 $(r,\\theta)$ と直交座標 $(x,y)$ の関係は、三角関数で表されます。",
formula: "x=r\\cos\\theta,\\quad y=r\\sin\\theta",
},
{
kind: "formula",
title: "極座標への変換",
body: "直交座標から極座標へ戻すときは、距離と角度を考えます。",
formula: "r^2=x^2+y^2,\\quad \\tan\\theta=\\frac{y}{x}",
},
{
kind: "workedExample",
title: "例1：極座標から直交座標へ",
body: "極座標 $(2,\\frac{\\pi}{3})$ を直交座標に直します。\n\n$x=r\\cos\\theta$、$y=r\\sin\\theta$ を使います。\n\n$x=2\\cos\\frac{\\pi}{3}=2\\cdot\\frac{1}{2}=1$\n\nです。\n\n$y=2\\sin\\frac{\\pi}{3}=2\\cdot\\frac{\\sqrt{3}}{2}=\\sqrt{3}$\n\nです。\n\nしたがって、直交座標は $(1,\\sqrt{3})$ です。",
},
{
kind: "workedExample",
title: "例2：直交座標から極座標へ",
body: "点 $(1,1)$ を極座標で表します。\n\nまず、原点からの距離は、\n\n$r=\\sqrt{1^2+1^2}=\\sqrt{2}$\n\nです。\n\nまた、点は第1象限にあり、$\\tan\\theta=1$ なので、\n\n$\\theta=\\frac{\\pi}{4}$\n\nです。\n\nしたがって、極座標の1つは $(\\sqrt{2},\\frac{\\pi}{4})$ です。",
},
{
kind: "concept",
title: "極方程式",
body: "極座標を使って曲線を表す方程式を、極方程式といいます。\n\n例えば、$r=2$ は、原点からの距離が常に2である点の集合です。\n\nこれは、中心が原点で半径が2の円を表します。\n\n極座標では、円や回転対称な曲線を簡潔に表せることがあります。",
},
{
kind: "workedExample",
title: "例3：極方程式を読む",
body: "$r=3$ が表す曲線を考えます。\n\n$r$ は原点からの距離です。\n\n$r=3$ は、原点からの距離が常に3である点の集合です。\n\nしたがって、中心が原点、半径が3の円です。\n\n直交座標では、$x^2+y^2=9$ と表されます。",
},
{
kind: "commonMistake",
title: "よくあるミス：θの象限を確認しない",
body: "$\\tan\\theta=\\frac{y}{x}$ だけでは、角度が一意に決まらないことがあります。\n\n例えば、$\\tan\\theta=1$ は第1象限でも第3象限でも成り立ちます。\n\n直交座標から極座標へ直すときは、点がどの象限にあるかを必ず確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 極座標は点を距離 $r$ と角度 $\\theta$ で表す\n- 直交座標への変換は $x=r\\cos\\theta, y=r\\sin\\theta$\n- $r^2=x^2+y^2$\n- $\\tan\\theta=\\frac{y}{x}$ だが象限確認が必要\n- 極方程式は極座標で曲線を表す方程式\n- $r=一定$ は原点中心の円を表す",
},
],
checkQuestions: [
{
question: "極座標 $(4,\\frac{\\pi}{2})$ を直交座標に直せ。",
answer: "$x=4\\cos\\frac{\\pi}{2}=0$、$y=4\\sin\\frac{\\pi}{2}=4$ より、$(0,4)$。",
hint: "$x=r\\cos\\theta$、$y=r\\sin\\theta$。",
},
{
question: "点 $(0,-2)$ の極座標の1つを答えよ。",
answer: "$(2,\\frac{3\\pi}{2})$。",
hint: "原点からの距離は2、第4象限方向。",
},
{
question: "極方程式 $r=5$ はどのような図形を表すか。",
answer: "中心が原点、半径5の円。",
hint: "原点からの距離が一定。",
},
],
relatedPracticeLinks: [
{ label: "極座標 演習", href: "/units/plane-curves", description: "直交座標との変換" },
{ label: "三角関数 単位円", href: "/courses/math-2bc/trigonometric-functions/radian-measure-and-unit-circle", description: "角度と座標の復習" },
],
qualityTags: ["極座標", "極方程式", "三角関数", "確認問題3問"],
},
];

const PLANE_CURVES_ADVANCED: CourseLesson[] = [
{
lessonId: "translated-rotated-conics",
lessonTitle: "平行移動された二次曲線",
lessonDescription: "中心や頂点が原点からずれた二次曲線を、平方完成や座標変換で標準形に直す。",
level: "advanced",
estimatedMinutes: 90,
prerequisites: ["楕円と双曲線の基本", "放物線の標準形", "平方完成"],
goals: [
"平行移動された曲線を標準形に直せる",
"平方完成で中心や頂点を求められる",
"楕円・双曲線・放物線の概形を判断できる",
"座標変換の意味を理解できる",
"入試標準レベルの二次曲線処理に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "標準形に直すと曲線が読める",
body: "二次曲線は、最初から標準形で与えられるとは限りません。\n\n例えば、$(x-2)^2+(y+1)^2=9$ のように、中心が原点からずれている場合があります。\n\nまた、$x^2-4x+y^2+2y=4$ のように展開された形で与えられることもあります。\n\nこのようなときは、平方完成して標準形に直します。\n\n標準形に直せば、中心・頂点・半径・軸方向が読み取れます。",
},
{
kind: "workedExample",
title: "例1：平行移動された円",
body: "$x^2+y^2-4x+6y-3=0$ を標準形に直します。\n\n$x$ と $y$ でそれぞれ平方完成します。\n\n$x^2-4x=(x-2)^2-4$\n\n$y^2+6y=(y+3)^2-9$\n\nなので、\n\n$(x-2)^2-4+(y+3)^2-9-3=0$\n\n$(x-2)^2+(y+3)^2=16$\n\nです。\n\nしたがって、中心は $(2,-3)$、半径は $4$ です。",
},
{
kind: "workedExample",
title: "例2：平行移動された楕円",
body: "$\\frac{(x-1)^2}{9}+\\frac{(y+2)^2}{4}=1$ の概形を考えます。\n\n中心は、$(1,-2)$ です。\n\nx方向の半径は $3$、y方向の半径は $2$ です。\n\nしたがって、中心が $(1,-2)$ の横長の楕円です。\n\n標準形の $(x-h)$、$(y-k)$ から中心を読み取ります。",
},
{
kind: "workedExample",
title: "例3：平行移動された放物線",
body: "$(y-1)^2=8(x+2)$ の頂点と焦点を求めます。\n\n標準形 $Y^2=4pX$ と比べます。\n\nここで、$Y=y-1$、$X=x+2$ と見ると、頂点は $(-2,1)$ です。\n\n$4p=8$ より、$p=2$ です。\n\n右向きに開く放物線なので、焦点は頂点から右に2進んだ点です。\n\nしたがって、焦点は $(0,1)$ です。",
},
{
kind: "strategy",
title: "平行移動された曲線の手順",
body: "平行移動された二次曲線では、次の順番で処理します。\n\n1. $x$ と $y$ の二次項を確認する\n2. 必要なら平方完成する\n3. 標準形に直す\n4. 中心や頂点を読む\n5. 分母や係数から半径・軸・焦点を読む\n6. 概形を描く\n\n標準形に直すことが最優先です。",
},
{
kind: "commonMistake",
title: "よくあるミス：中心の符号を読み間違える",
body: "$(x-2)^2+(y+3)^2=16$ の中心は $(2,-3)$ です。\n\n$(x-2)$ だからx座標は $2$、$(y+3)=(y-(-3))$ だからy座標は $-3$ です。\n\n括弧の中の符号をそのまま中心にしないようにしましょう。\n\n標準形は $(x-h)^2$、$(y-k)^2$ と読むのが基本です。",
},
{
kind: "summary",
title: "まとめ",
body: "- 平行移動された曲線は標準形に直す\n- 展開形は平方完成する\n- $(x-h)^2$、$(y-k)^2$ から中心や頂点を読む\n- 楕円では分母から半径を読む\n- 放物線では $4p$ を係数と比べる\n- 中心や頂点の符号ミスに注意する",
},
],
checkQuestions: [
{
question: "$(x+1)^2+(y-2)^2=9$ の中心と半径を答えよ。",
answer: "中心は $(-1,2)$、半径は $3$。",
hint: "$(x-h)^2+(y-k)^2=r^2$。",
},
{
question: "$\\frac{(x-3)^2}{16}+\\frac{(y+1)^2}{4}=1$ の中心を答えよ。",
answer: "$(3,-1)$。",
hint: "括弧の中の符号に注意。",
},
{
question: "$(y+2)^2=12(x-1)$ の頂点を答えよ。",
answer: "$(1,-2)$。",
hint: "$Y=y+2$、$X=x-1$ と見る。",
},
],
relatedPracticeLinks: [
{ label: "平行移動された二次曲線 演習", href: "/units/plane-curves", description: "標準形への変形" },
{ label: "平方完成", href: "/courses/math-1a/quadratic/quadratic-completing-square", description: "平方完成の復習" },
],
qualityTags: ["旧帝大準備", "二次曲線", "平方完成", "平行移動", "確認問題3問"],
},
{
lessonId: "parametric-polar-applications",
lessonTitle: "媒介変数・極座標の応用",
lessonDescription: "媒介変数表示と極方程式を使い、曲線の軌跡・交点・図形的意味を読み取る。",
level: "advanced",
estimatedMinutes: 95,
prerequisites: ["媒介変数表示", "極座標と極方程式", "三角関数"],
goals: [
"媒介変数表示から曲線の性質を読み取れる",
"媒介変数の範囲を考慮できる",
"極方程式を直交座標に変換できる",
"円や直線の極方程式を扱える",
"媒介変数・極座標を実戦問題で使える",
],
lessonBlocks: [
{
kind: "intro",
title: "表し方を変えると曲線が見やすくなる",
body: "曲線は、直交座標の方程式だけでなく、媒介変数表示や極方程式でも表せます。\n\n直交座標では複雑な式でも、媒介変数や極座標では簡単に表せることがあります。\n\n例えば、円は $x^2+y^2=r^2$ とも書けますが、$x=r\\cos t$、$y=r\\sin t$ と表すと、点が円周上を動く様子が見えます。\n\n曲線の性質に合わせて表し方を選ぶことが重要です。",
},
{
kind: "workedExample",
title: "例1：媒介変数の範囲を読む",
body: "$x=\\cos t$、$y=\\sin t$、$0\\leq t\\leq\\pi$ が表す曲線を考えます。\n\nまず、$x^2+y^2=\\cos^2t+\\sin^2t=1$ です。\n\nしたがって、単位円上の点を表します。\n\nただし、$0\\leq t\\leq\\pi$ なので、点は上半分の円周だけを動きます。\n\n媒介変数の範囲を確認しないと、円全体と誤ってしまいます。",
},
{
kind: "workedExample",
title: "例2：極方程式を直交座標に直す",
body: "極方程式 $r=2\\cos\\theta$ を直交座標の方程式に直します。\n\n両辺に $r$ を掛けます。\n\n$r^2=2r\\cos\\theta$\n\nここで、$r^2=x^2+y^2$、$r\\cos\\theta=x$ です。\n\nしたがって、\n\n$x^2+y^2=2x$\n\nです。\n\n平方完成すると、\n\n$(x-1)^2+y^2=1$\n\nです。\n\nこれは中心 $(1,0)$、半径1の円です。",
},
{
kind: "workedExample",
title: "例3：直線の極方程式",
body: "極方程式 $r\\cos\\theta=2$ が表す図形を考えます。\n\n$r\\cos\\theta=x$ なので、\n\n$r\\cos\\theta=2$\n\nは、\n\n$x=2$\n\nを表します。\n\nしたがって、これは直線 $x=2$ です。\n\n極座標では、$r\\cos\\theta$ や $r\\sin\\theta$ を見たら、直交座標の $x,y$ に変換できます。",
},
{
kind: "comparisonTable",
title: "極座標変換の基本",
body: "極方程式を直交座標に直すときの基本対応です。",
columns: ["極座標の式", "直交座標での意味", "使い方"],
rows: [
{
cells: ["$r\\cos\\theta$", "$x$", "x座標に変換"],
highlight: true,
},
{
cells: ["$r\\sin\\theta$", "$y$", "y座標に変換"],
},
{
cells: ["$r^2$", "$x^2+y^2$", "円の形に変換"],
},
],
},
{
kind: "strategy",
title: "応用問題の手順",
body: "媒介変数・極座標の応用問題では、次の流れで考えます。\n\n1. どの表し方で与えられているか確認する\n2. 必要なら媒介変数を消去する\n3. 極座標なら $x=r\\cos\\theta$、$y=r\\sin\\theta$ を使う\n4. $r^2=x^2+y^2$ に変換する\n5. 標準形に直して図形を読む\n6. 変数の範囲を確認する\n\n表し方を変えることで、曲線の正体が見えます。",
},
{
kind: "commonMistake",
title: "よくあるミス：r=2cosθをそのまま円と読めない",
body: "$r=2\\cos\\theta$ のような極方程式は、一見すると図形が分かりにくいです。\n\nこの場合は、両辺に $r$ を掛けて、$r^2=2r\\cos\\theta$ とします。\n\nそして、$r^2=x^2+y^2$、$r\\cos\\theta=x$ に変換します。\n\n極方程式では、直交座標に直す一手間が重要です。",
},
{
kind: "summary",
title: "まとめ",
body: "- 媒介変数表示は曲線を点の動きで表す\n- 媒介変数の範囲で曲線の一部になることがある\n- 極方程式は直交座標に変換できる\n- $r\\cos\\theta=x$、$r\\sin\\theta=y$\n- $r^2=x^2+y^2$\n- 標準形に直すと図形の正体が読める",
},
],
checkQuestions: [
{
question: "$x=2\\cos t$、$y=2\\sin t$、$0\\leq t<2\\pi$ が表す曲線を答えよ。",
answer: "中心が原点、半径2の円全体。",
hint: "2乗して足す。",
},
{
question: "$r\\sin\\theta=3$ が表す図形を答えよ。",
answer: "$y=3$。",
hint: "$r\\sin\\theta=y$。",
},
{
question: "$r=4\\cos\\theta$ を直交座標に直すとき、まず何をするとよいか。",
answer: "両辺に $r$ を掛けて、$r^2=4r\\cos\\theta$ とする。",
hint: "$r^2$ と $r\\cos\\theta$ に変換する。",
},
],
relatedPracticeLinks: [
{ label: "媒介変数・極座標 応用演習", href: "/units/plane-curves", description: "変換と曲線の読み取り" },
{ label: "三角関数", href: "/courses/math-2bc/trigonometric-functions", description: "三角関数の復習" },
],
qualityTags: ["旧帝大準備", "媒介変数", "極座標", "極方程式", "確認問題3問"],
},
{
lessonId: "plane-curves-exam-standard",
lessonTitle: "平面上の曲線の融合問題",
lessonDescription: "二次曲線・媒介変数表示・極座標を組み合わせ、曲線の正体や条件を読み解く実戦問題を扱う。",
level: "advanced",
estimatedMinutes: 100,
prerequisites: ["平行移動された二次曲線", "媒介変数・極座標の応用", "焦点・漸近線"],
goals: [
"曲線の方程式を標準形に直せる",
"二次曲線の種類を判定できる",
"媒介変数表示から軌跡を求められる",
"極方程式を直交座標に変換できる",
"入試標準から難関大入口の曲線問題で初手を決められる",
],
lessonBlocks: [
{
kind: "intro",
title: "曲線問題は標準形に戻す",
body: "平面上の曲線の実戦問題では、式がそのまま標準形で出るとは限りません。\n\n展開された二次式、媒介変数表示、極方程式など、さまざまな形で与えられます。\n\n重要なのは、見慣れた標準形に戻すことです。\n\n標準形に直せば、円・放物線・楕円・双曲線のどれなのか、中心や焦点はどこか、グラフはどちらに開くかが読み取れます。",
},
{
kind: "strategy",
title: "融合問題の確認リスト",
body: "平面上の曲線の実戦問題では、次の順番で確認します。\n\n1. 与えられ方を確認する\n2. 二次式なら平方完成して標準形に直す\n3. 媒介変数表示なら媒介変数を消去する\n4. 三角関数があれば $\\sin^2t+\\cos^2t=1$ を使う\n5. 極方程式なら $x=r\\cos\\theta$、$y=r\\sin\\theta$ に変換する\n6. 曲線の種類・中心・焦点・漸近線を読む\n7. 変数の範囲や除外点を確認する\n\nまず標準形へ、が基本方針です。",
},
{
kind: "workedExample",
title: "例1：二次式から楕円を読む",
body: "$4x^2+9y^2=36$ が表す曲線を考えます。\n\n両辺を36で割ります。\n\n$\\frac{x^2}{9}+\\frac{y^2}{4}=1$\n\nです。\n\nこれは楕円の標準形です。\n\nx方向の半径は $3$、y方向の半径は $2$ です。\n\nしたがって、中心が原点の横長の楕円です。",
},
{
kind: "workedExample",
title: "例2：媒介変数表示から軌跡を求める",
body: "$x=t^2+1$、$y=2t$ が表す曲線を求めます。\n\n$y=2t$ より、$t=\\frac{y}{2}$ です。\n\nこれを $x=t^2+1$ に代入します。\n\n$x=\\left(\\frac{y}{2}\\right)^2+1$\n\nです。\n\nしたがって、\n\n$y^2=4(x-1)$\n\nです。\n\nこれは頂点 $(1,0)$ から右向きに開く放物線です。",
},
{
kind: "workedExample",
title: "例3：極方程式から円を読む",
body: "$r=6\\sin\\theta$ が表す曲線を考えます。\n\n両辺に $r$ を掛けます。\n\n$r^2=6r\\sin\\theta$\n\nここで、$r^2=x^2+y^2$、$r\\sin\\theta=y$ です。\n\nしたがって、\n\n$x^2+y^2=6y$\n\nです。\n\n平方完成すると、\n\n$x^2+(y-3)^2=9$\n\nです。\n\nこれは中心 $(0,3)$、半径 $3$ の円です。",
},
{
kind: "workedExample",
title: "例4：双曲線の情報を読む",
body: "$9x^2-4y^2=36$ が表す曲線を考えます。\n\n両辺を36で割ります。\n\n$\\frac{x^2}{4}-\\frac{y^2}{9}=1$\n\nです。\n\nこれはx軸方向に開く双曲線です。\n\n$a=2$、$b=3$ なので、頂点は $(\\pm2,0)$ です。\n\n漸近線は、\n\n$y=\\pm\\frac{3}{2}x$\n\nです。\n\nまた、$c^2=a^2+b^2=4+9=13$ より、焦点は $(\\pm\\sqrt{13},0)$ です。",
},
{
kind: "comparisonTable",
title: "実戦で使う判断",
body: "与えられた式の形から、初手を決めます。",
columns: ["与えられ方", "初手", "目的"],
rows: [
{
cells: ["二次式", "平方完成・標準形化", "曲線の種類を読む"],
highlight: true,
},
{
cells: ["媒介変数表示", "媒介変数を消去", "x,yの関係を作る"],
},
{
cells: ["三角関数の媒介表示", "2乗して足す", "円や楕円を読む"],
},
{
cells: ["極方程式", "$r$ を掛けて変換", "直交座標へ直す"],
},
{
cells: ["双曲線", "漸近線を確認", "概形を描く"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：標準形に直す前に判断する",
body: "曲線の種類を判断するとき、式を標準形に直す前に決めつけると危険です。\n\n例えば、$4x^2+9y^2=36$ は、割り算して $\\frac{x^2}{9}+\\frac{y^2}{4}=1$ に直すと楕円だと分かります。\n\n$9x^2-4y^2=36$ は、$\\frac{x^2}{4}-\\frac{y^2}{9}=1$ に直すと双曲線だと分かります。\n\nまず標準形へ直してから読むことを徹底しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 平面上の曲線の融合問題は標準形に戻すことが重要\n- 二次式は平方完成や両辺を割る操作で標準形にする\n- 媒介変数表示は媒介変数を消去する\n- 三角関数では $\\sin^2t+\\cos^2t=1$ を使う\n- 極方程式は直交座標に変換する\n- 標準形から中心・頂点・焦点・漸近線を読む\n- 変数の範囲も最後に確認する",
},
],
checkQuestions: [
{
question: "$25x^2+9y^2=225$ を標準形に直し、曲線の種類を答えよ。",
answer: "$\\frac{x^2}{9}+\\frac{y^2}{25}=1$。楕円。",
hint: "両辺を225で割る。",
},
{
question: "$x=2\\cos t$、$y=3\\sin t$ が表す曲線を求めよ。",
answer: "$\\frac{x^2}{4}+\\frac{y^2}{9}=1$。楕円。",
hint: "$\\cos^2t+\\sin^2t=1$。",
},
{
question: "$r=2\\cos\\theta$ が表す曲線を直交座標で表せ。",
answer: "両辺に $r$ を掛けて、$r^2=2r\\cos\\theta$。よって $x^2+y^2=2x$、つまり $(x-1)^2+y^2=1$。",
hint: "$r^2=x^2+y^2$、$r\\cos\\theta=x$。",
},
],
relatedPracticeLinks: [
{ label: "平面上の曲線 実戦演習", href: "/units/plane-curves", description: "二次曲線・媒介変数・極座標" },
{ label: "過去問道場", href: "/dojo", description: "入試形式で確認" },
{ label: "三角関数", href: "/courses/math-2bc/trigonometric-functions", description: "媒介変数と極座標の準備" },
],
qualityTags: ["旧帝大準備", "平面上の曲線", "媒介変数", "極座標", "融合問題"],
},
];

export const PLANE_CURVES_UNIT: CourseUnit = {
unitId: "plane-curves",
subjectId: "math-2bc",
unitTitle: "平面上の曲線",
unitDescription:
"放物線、楕円、双曲線、焦点・漸近線、媒介変数表示、極座標、極方程式まで体系的に学ぶ単元です。",
lessons: [
...PLANE_CURVES_BEGINNER,
...PLANE_CURVES_STANDARD,
...PLANE_CURVES_ADVANCED,
],
};
