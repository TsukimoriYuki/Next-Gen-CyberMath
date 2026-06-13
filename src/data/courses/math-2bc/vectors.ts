import type { CourseLesson, CourseUnit } from "@/types/course";

const VECTORS_BEGINNER: CourseLesson[] = [
{
lessonId: "vector-basics",
lessonTitle: "ベクトルとは何か",
lessonDescription: "ベクトルを大きさと向きをもつ量として理解し、矢印・始点・終点・等しいベクトルを整理する。",
level: "beginner",
estimatedMinutes: 55,
prerequisites: ["座標平面", "図形の基本", "一次関数の傾き"],
goals: [
"ベクトルが大きさと向きをもつ量であることを説明できる",
"有向線分としてベクトルを表せる",
"等しいベクトルの意味を理解できる",
"逆ベクトル・零ベクトルを説明できる",
"ベクトルの加法・減法に進む土台を作れる",
],
lessonBlocks: [
{
kind: "intro",
title: "ベクトルは向きつきの量",
body: "ベクトルとは、大きさと向きをもつ量です。\n\n普通の数は、大きさだけを表します。例えば、$5$ は大きさを表す数です。\n\n一方、ベクトルは「どれくらい進むか」だけでなく、「どちら向きに進むか」も表します。\n\n例えば、右に3、上に2進むという情報はベクトルで表せます。\n\n図形問題では、点の位置関係や平行・垂直・内分点などを、ベクトルで計算として扱えるようになります。",
},
{
kind: "concept",
title: "有向線分としてのベクトル",
body: "ベクトルは、矢印で表すことができます。\n\n点 $A$ から点 $B$ へ向かう矢印を、$\\overrightarrow{AB}$ と書きます。\n\nこのとき、$A$ を始点、$B$ を終点といいます。\n\n$\\overrightarrow{AB}$ は、AからBへ移動する量を表します。\n\n大切なのは、ベクトルでは位置そのものよりも、移動の向きと大きさを見ることです。",
},
{
kind: "comparisonTable",
title: "ベクトルの基本用語",
body: "ベクトルでは、矢印の向きと長さを意識します。",
columns: ["用語", "意味", "例"],
rows: [
{
cells: ["始点", "矢印の出発点", "$\\overrightarrow{AB}$ の $A$"],
highlight: true,
},
{
cells: ["終点", "矢印の到着点", "$\\overrightarrow{AB}$ の $B$"],
},
{
cells: ["大きさ", "矢印の長さ", "$|\\overrightarrow{AB}|$"],
},
{
cells: ["向き", "矢印が進む方向", "AからBへ向かう"],
},
],
},
{
kind: "concept",
title: "等しいベクトル",
body: "2つのベクトルが等しいとは、大きさと向きがどちらも等しいという意味です。\n\n始点や終点の位置が違っていても、大きさと向きが同じなら同じベクトルです。\n\n例えば、平行四辺形 $ABCD$ では、$\\overrightarrow{AB}$ と $\\overrightarrow{DC}$ は大きさも向きも同じなので、\n\n$\\overrightarrow{AB}=\\overrightarrow{DC}$\n\nです。\n\nベクトルは、矢印を平行移動しても同じものとして扱えます。",
},
{
kind: "workedExample",
title: "例1：逆ベクトル",
body: "$\\overrightarrow{AB}$ と $\\overrightarrow{BA}$ を比べます。\n\n$\\overrightarrow{AB}$ はAからBへ向かうベクトルです。\n\n$\\overrightarrow{BA}$ はBからAへ向かうベクトルです。\n\n大きさは同じですが、向きが反対です。\n\nしたがって、\n\n$\\overrightarrow{BA}=-\\overrightarrow{AB}$\n\nです。\n\n向きが反対で大きさが同じベクトルを、逆ベクトルといいます。",
},
{
kind: "concept",
title: "零ベクトル",
body: "始点と終点が同じベクトルを零ベクトルといいます。\n\n例えば、$\\overrightarrow{AA}$ は移動していないので、零ベクトルです。\n\n零ベクトルは $\\vec{0}$ と書きます。\n\n大きさは $0$ です。\n\n向きは特に定まりません。\n\nベクトル計算では、普通の数の $0$ と同じように、足しても変化しない役割を持ちます。",
},
{
kind: "commonMistake",
title: "よくあるミス：始点が違うと別のベクトルだと思う",
body: "ベクトルは、始点の位置が違っていても、大きさと向きが同じなら等しいと考えます。\n\n例えば、右に2、上に1進む矢印は、どこから出発していても同じベクトルです。\n\n図形問題では、ベクトルを平行移動して考えることがよくあります。\n\n矢印の位置ではなく、大きさと向きを見るようにしましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- ベクトルは大きさと向きをもつ量\n- $\\overrightarrow{AB}$ はAからBへ向かうベクトル\n- ベクトルの大きさは矢印の長さ\n- 大きさと向きが同じなら等しいベクトル\n- 逆向きのベクトルは符号がマイナスになる\n- 始点と終点が同じなら零ベクトル\n- ベクトルは平行移動しても同じものとして扱える",
},
{
kind: "nextStep",
title: "次はベクトルの計算へ",
body: "ベクトルの基本が分かったら、次はベクトルの足し算・引き算・実数倍を学びます。\n\n図形の移動を計算として扱えるようになります。",
},
],
checkQuestions: [
{
question: "$\\overrightarrow{AB}$ と $\\overrightarrow{BA}$ の関係を答えよ。",
answer: "大きさは同じで向きが反対なので、$\\overrightarrow{BA}=-\\overrightarrow{AB}$。",
hint: "AからBとBからAでは向きが逆。",
},
{
question: "2つのベクトルが等しいとは、何が等しいことか。",
answer: "大きさと向きがどちらも等しいこと。",
hint: "始点の位置は関係ない。",
},
{
question: "$\\overrightarrow{AA}$ は何ベクトルか。",
answer: "零ベクトル。始点と終点が同じで、移動量が0だから。",
hint: "どこにも移動していない。",
},
],
relatedPracticeLinks: [
{ label: "ベクトル 基礎演習", href: "/units/vectors", description: "ベクトルの基本" },
{ label: "図形と計量 講座", href: "/courses/math-1a/figures-and-measurement", description: "図形の復習" },
],
qualityTags: ["ベクトル", "有向線分", "等しいベクトル", "確認問題3問"],
},
{
lessonId: "vector-operations-basic",
lessonTitle: "ベクトルの加法・減法・実数倍",
lessonDescription: "ベクトルの足し算・引き算・実数倍を、移動の合成として理解する。",
level: "beginner",
estimatedMinutes: 70,
prerequisites: ["ベクトルとは何か", "平行四辺形", "座標平面"],
goals: [
"ベクトルの和を移動の合成として理解できる",
"ベクトルの差を逆ベクトルとの和として理解できる",
"実数倍による大きさと向きの変化を説明できる",
"平行四辺形の法則を使える",
"図形問題をベクトル計算に変換できる",
],
lessonBlocks: [
{
kind: "intro",
title: "ベクトルの計算は移動の計算",
body: "ベクトルの足し算は、移動を続けて行うことを表します。\n\n例えば、右に2進むベクトルのあと、上に3進むベクトルを足すと、結果として右に2、上に3進んだことになります。\n\nこのように、ベクトルの計算は、矢印の移動を組み合わせる操作です。\n\n数の計算と似ていますが、向きがあるため、図形的な意味を持ちます。",
},
{
kind: "concept",
title: "ベクトルの加法",
body: "ベクトル $\\vec{a}$ と $\\vec{b}$ の和 $\\vec{a}+\\vec{b}$ は、$\\vec{a}$ の終点から $\\vec{b}$ をつなげたときの、最初の始点から最後の終点へ向かうベクトルです。\n\nこれは、移動を続けて行った結果を表します。\n\nまた、同じ和は平行四辺形の対角線としても表せます。\n\nこれを平行四辺形の法則といいます。",
},
{
kind: "workedExample",
title: "例1：三角形でのベクトルの和",
body: "点 $A,B,C$ について、$\\overrightarrow{AB}+\\overrightarrow{BC}$ を考えます。\n\n$\\overrightarrow{AB}$ はAからBへの移動です。\n\nそのあと $\\overrightarrow{BC}$ はBからCへの移動です。\n\nつまり、AからBへ進み、さらにBからCへ進むので、全体としてAからCへ進みます。\n\nしたがって、\n\n$\\overrightarrow{AB}+\\overrightarrow{BC}=\\overrightarrow{AC}$\n\nです。\n\nこれはベクトル計算の最重要基本です。",
},
{
kind: "concept",
title: "ベクトルの減法",
body: "ベクトルの引き算は、逆ベクトルを足すこととして考えます。\n\n$\\vec{a}-\\vec{b}=\\vec{a}+(-\\vec{b})$\n\nです。\n\nつまり、$\\vec{b}$ を引くことは、$\\vec{b}$ と反対向きのベクトルを足すことです。\n\nまた、同じ始点から出る2つのベクトル $\\overrightarrow{OA}$、$\\overrightarrow{OB}$ について、\n\n$\\overrightarrow{OB}-\\overrightarrow{OA}=\\overrightarrow{AB}$\n\nとなります。",
},
{
kind: "formula",
title: "位置ベクトルの差",
body: "同じ始点 $O$ から見た2点 $A,B$ について、AからBへ向かうベクトルは次のように表せます。",
formula: "\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}",
},
{
kind: "workedExample",
title: "例2：差のベクトル",
body: "点 $O$ を基準にして、$\\overrightarrow{OA}=\\vec{a}$、$\\overrightarrow{OB}=\\vec{b}$ とします。\n\nこのとき、AからBへ向かうベクトルは、\n\n$\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}$\n\nです。\n\nしたがって、\n\n$\\overrightarrow{AB}=\\vec{b}-\\vec{a}$\n\nとなります。\n\nベクトルでは、終点の位置ベクトルから始点の位置ベクトルを引くと、始点から終点へのベクトルが出ます。",
},
{
kind: "concept",
title: "実数倍",
body: "ベクトルを実数倍すると、大きさが変わります。\n\n$2\\vec{a}$ は、$\\vec{a}$ と同じ向きで大きさが2倍のベクトルです。\n\n$\\frac{1}{2}\\vec{a}$ は、$\\vec{a}$ と同じ向きで大きさが半分のベクトルです。\n\n$-\\vec{a}$ は、$\\vec{a}$ と大きさが同じで向きが反対のベクトルです。\n\n実数倍は、平行条件を考えるときに非常に重要です。",
},
{
kind: "comparisonTable",
title: "実数倍の意味",
body: "係数の符号と大きさで、向きと長さが決まります。",
columns: ["形", "向き", "大きさ"],
rows: [
{
cells: ["$2\\vec{a}$", "$\\vec{a}$ と同じ", "2倍"],
highlight: true,
},
{
cells: ["$\\frac{1}{3}\\vec{a}$", "$\\vec{a}$ と同じ", "3分の1"],
},
{
cells: ["$-\\vec{a}$", "$\\vec{a}$ と反対", "同じ"],
},
{
cells: ["$-2\\vec{a}$", "$\\vec{a}$ と反対", "2倍"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：ベクトルの差の向きを逆にする",
body: "$\\overrightarrow{AB}$ は、AからBへ向かうベクトルです。\n\n位置ベクトルで表すと、\n\n$\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}$\n\nです。\n\n終点から始点を引く、と覚えると安定します。\n\n逆に $\\overrightarrow{OA}-\\overrightarrow{OB}$ とすると、$\\overrightarrow{BA}$ になってしまいます。\n\n差を取るときは、向きを必ず確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- ベクトルの和は移動の合成\n- $\\overrightarrow{AB}+\\overrightarrow{BC}=\\overrightarrow{AC}$\n- ベクトルの差は逆ベクトルを足すこと\n- $\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}$\n- 実数倍で大きさと向きが変わる\n- 負の実数倍では向きが反対になる\n- 実数倍は平行条件につながる",
},
],
checkQuestions: [
{
question: "$\\overrightarrow{AB}+\\overrightarrow{BC}$ を簡単にせよ。",
answer: "$\\overrightarrow{AC}$。",
hint: "AからB、BからCへ進む。",
},
{
question: "$\\overrightarrow{OA}=\\vec{a}$、$\\overrightarrow{OB}=\\vec{b}$ のとき、$\\overrightarrow{AB}$ を表せ。",
answer: "$\\overrightarrow{AB}=\\vec{b}-\\vec{a}$。",
hint: "終点から始点を引く。",
},
{
question: "$-3\\vec{a}$ は $\\vec{a}$ と比べて向きと大きさがどうなるか。",
answer: "向きは反対、大きさは3倍。",
hint: "負の実数倍は向きが反対。",
},
],
relatedPracticeLinks: [
{ label: "ベクトル計算 演習", href: "/units/vectors" },
{ label: "図形と計量 講座", href: "/courses/math-1a/figures-and-measurement" },
],
qualityTags: ["ベクトル計算", "加法", "減法", "実数倍", "確認問題3問"],
},
{
lessonId: "position-vector-basic",
lessonTitle: "位置ベクトルと内分点",
lessonDescription: "点の位置をベクトルで表し、内分点・中点・重心を計算で求める。",
level: "beginner",
estimatedMinutes: 75,
prerequisites: ["ベクトルの加法・減法・実数倍", "座標平面", "比の基本"],
goals: [
"位置ベクトルの意味を説明できる",
"2点を結ぶベクトルを位置ベクトルで表せる",
"内分点の位置ベクトルを求められる",
"中点と重心の公式を使える",
"図形問題をベクトルで処理する準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "点の位置をベクトルで表す",
body: "位置ベクトルとは、基準点からある点までのベクトルです。\n\n通常、基準点として原点 $O$ を使います。\n\n点 $A$ の位置を、$\\overrightarrow{OA}$ というベクトルで表します。\n\nこのように点の位置をベクトルで表すと、図形の問題を計算で扱えるようになります。\n\n特に、内分点・中点・重心はベクトルで非常にきれいに表せます。",
},
{
kind: "concept",
title: "位置ベクトル",
body: "基準点 $O$ に対して、点 $A$ の位置ベクトルを $\\overrightarrow{OA}$ とします。\n\nよく、$\\overrightarrow{OA}=\\vec{a}$ のように書きます。\n\n同じように、$\\overrightarrow{OB}=\\vec{b}$ とすれば、AからBへのベクトルは、\n\n$\\overrightarrow{AB}=\\vec{b}-\\vec{a}$\n\nです。\n\n位置ベクトルでは、点そのものをベクトルで表していると考えると分かりやすいです。",
},
{
kind: "formula",
title: "内分点の位置ベクトル",
body: "点 $P$ が線分 $AB$ を $m:n$ に内分するとき、$\\overrightarrow{OA}=\\vec{a}$、$\\overrightarrow{OB}=\\vec{b}$ とすると、$P$ の位置ベクトルは次のようになります。",
formula: "\\overrightarrow{OP}=\\frac{n\\vec{a}+m\\vec{b}}{m+n}",
},
{
kind: "concept",
title: "内分点公式の見方",
body: "点 $P$ が $AB$ を $m:n$ に内分するとは、$AP:PB=m:n$ という意味です。\n\nこのとき、PはAからBへ向かって、全体のうち $\\frac{m}{m+n}$ だけ進んだ点です。\n\n内分点公式では、A側の係数に反対側の比 $n$、B側の係数に反対側の比 $m$ がつきます。\n\n$\\frac{n\\vec{a}+m\\vec{b}}{m+n}$ のように、係数が逆に見えるので注意が必要です。",
},
{
kind: "workedExample",
title: "例1：内分点を求める",
body: "$\\overrightarrow{OA}=\\vec{a}$、$\\overrightarrow{OB}=\\vec{b}$ とします。\n\n点 $P$ が線分 $AB$ を $2:1$ に内分するとき、$\\overrightarrow{OP}$ を求めます。\n\n内分点公式より、\n\n$\\overrightarrow{OP}=\\frac{1\\vec{a}+2\\vec{b}}{2+1}$\n\nです。\n\nしたがって、\n\n$\\overrightarrow{OP}=\\frac{\\vec{a}+2\\vec{b}}{3}$\n\nです。\n\n比 $AP:PB=2:1$ のとき、PはBに近いので、$\\vec{b}$ の係数が大きくなります。",
},
{
kind: "formula",
title: "中点の位置ベクトル",
body: "中点は、$1:1$ に内分する点です。\n\nしたがって、点 $M$ が線分 $AB$ の中点なら、次の公式になります。",
formula: "\\overrightarrow{OM}=\\frac{\\vec{a}+\\vec{b}}{2}",
},
{
kind: "formula",
title: "三角形の重心",
body: "三角形 $ABC$ の重心 $G$ は、3つの頂点の位置ベクトルの平均で表されます。",
formula: "\\overrightarrow{OG}=\\frac{\\vec{a}+\\vec{b}+\\vec{c}}{3}",
},
{
kind: "workedExample",
title: "例2：重心を求める",
body: "$\\overrightarrow{OA}=\\vec{a}$、$\\overrightarrow{OB}=\\vec{b}$、$\\overrightarrow{OC}=\\vec{c}$ とします。\n\n三角形 $ABC$ の重心 $G$ の位置ベクトルは、\n\n$\\overrightarrow{OG}=\\frac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$\n\nです。\n\n重心は3つの頂点の平均の位置にあります。\n\n座標で考えても、重心の座標は3つの頂点の座標の平均になります。",
},
{
kind: "commonMistake",
title: "よくあるミス：内分比の係数を逆にし忘れる",
body: "$AP:PB=m:n$ のとき、内分点の公式は\n\n$\\overrightarrow{OP}=\\frac{n\\vec{a}+m\\vec{b}}{m+n}$\n\nです。\n\nA側の位置ベクトルには、反対側の比 $n$ がかかります。\n\nB側の位置ベクトルには、反対側の比 $m$ がかかります。\n\nこの係数を逆にしてしまうミスが多いです。\n\n点がどちらに近いかを考えると、ミスに気づきやすくなります。",
},
{
kind: "summary",
title: "まとめ",
body: "- 位置ベクトルは基準点から点までのベクトル\n- $\\overrightarrow{AB}=\\vec{b}-\\vec{a}$\n- 内分点公式は $\\overrightarrow{OP}=\\frac{n\\vec{a}+m\\vec{b}}{m+n}$\n- 中点は $\\frac{\\vec{a}+\\vec{b}}{2}$\n- 重心は $\\frac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$\n- 内分比の係数は反対側の比がかかる",
},
],
checkQuestions: [
{
question: "$\\overrightarrow{OA}=\\vec{a}$、$\\overrightarrow{OB}=\\vec{b}$ のとき、線分 $AB$ の中点 $M$ の位置ベクトルを答えよ。",
answer: "$\\overrightarrow{OM}=\\frac{\\vec{a}+\\vec{b}}{2}$。",
hint: "中点は1:1の内分点。",
},
{
question: "点 $P$ が $AB$ を $1:2$ に内分するとき、$\\overrightarrow{OP}$ を $\\vec{a},\\vec{b}$ で表せ。",
answer: "$\\overrightarrow{OP}=\\frac{2\\vec{a}+\\vec{b}}{3}$。",
hint: "A側には反対側の比2がかかる。",
},
{
question: "三角形 $ABC$ の重心の位置ベクトルを答えよ。",
answer: "$\\frac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$。",
hint: "3頂点の平均。",
},
],
relatedPracticeLinks: [
{ label: "位置ベクトル 演習", href: "/units/vectors" },
{ label: "図形と計量 重心復習", href: "/courses/math-1a/figures-and-measurement" },
],
qualityTags: ["位置ベクトル", "内分点", "中点", "重心", "確認問題3問"],
},
];

const VECTORS_STANDARD: CourseLesson[] = [
{
lessonId: "component-representation",
lessonTitle: "成分表示とベクトル計算",
lessonDescription: "ベクトルを成分で表し、加法・減法・実数倍・大きさを座標計算で処理する。",
level: "standard",
estimatedMinutes: 75,
prerequisites: ["ベクトルの加法・減法・実数倍", "座標平面", "平方根"],
goals: [
"ベクトルを成分で表せる",
"成分表示でベクトルの和・差・実数倍を計算できる",
"ベクトルの大きさを成分から求められる",
"2点間のベクトルを座標から求められる",
"内積に進む準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "ベクトルを座標で計算する",
body: "ベクトルは矢印として図形的に扱えますが、座標を使うと計算で処理できます。\n\n例えば、右に3、上に2進むベクトルを、成分で $(3,2)$ と表します。\n\n成分表示では、横方向の移動量と縦方向の移動量を並べます。\n\nこれにより、ベクトルの足し算や引き算を、座標の計算として扱えるようになります。",
},
{
kind: "concept",
title: "成分表示",
body: "ベクトル $\\vec{a}$ が横に $x$、縦に $y$ 進むとき、\n\n$\\vec{a}=(x,y)$\n\nと表します。\n\nここで、$x$ をx成分、$y$ をy成分といいます。\n\n2点 $A(x_1,y_1)$、$B(x_2,y_2)$ があるとき、AからBへのベクトルは、\n\n$\\overrightarrow{AB}=(x_2-x_1,y_2-y_1)$\n\nです。\n\n終点の座標から始点の座標を引きます。",
},
{
kind: "formula",
title: "2点からベクトルを求める",
body: "点 $A(x_1,y_1)$、$B(x_2,y_2)$ に対して、$\\overrightarrow{AB}$ は次のように表されます。",
formula: "\\overrightarrow{AB}=(x_2-x_1,y_2-y_1)",
},
{
kind: "workedExample",
title: "例1：2点からベクトルを求める",
body: "$A(1,2)$、$B(5,7)$ のとき、$\\overrightarrow{AB}$ を求めます。\n\n終点Bの座標から始点Aの座標を引きます。\n\n$\\overrightarrow{AB}=(5-1,7-2)$\n\n$=(4,5)$\n\nです。\n\nAからBへは、右に4、上に5進んでいることを表します。",
},
{
kind: "comparisonTable",
title: "成分でのベクトル計算",
body: "成分表示では、各成分ごとに計算します。",
columns: ["計算", "結果", "例"],
rows: [
{
cells: ["和", "$(a,b)+(c,d)=(a+c,b+d)$", "$(1,2)+(3,4)=(4,6)$"],
highlight: true,
},
{
cells: ["差", "$(a,b)-(c,d)=(a-c,b-d)$", "$(5,7)-(2,3)=(3,4)$"],
},
{
cells: ["実数倍", "$k(a,b)=(ka,kb)$", "$2(3,1)=(6,2)$"],
},
],
},
{
kind: "workedExample",
title: "例2：成分で計算する",
body: "$\\vec{a}=(2,-1)$、$\\vec{b}=(3,4)$ とします。\n\n$2\\vec{a}-\\vec{b}$ を求めます。\n\nまず、\n\n$2\\vec{a}=2(2,-1)=(4,-2)$\n\nです。\n\nしたがって、\n\n$2\\vec{a}-\\vec{b}=(4,-2)-(3,4)$\n\n$=(1,-6)$\n\nです。\n\n成分表示では、x成分どうし、y成分どうしを計算します。",
},
{
kind: "formula",
title: "ベクトルの大きさ",
body: "ベクトル $\\vec{a}=(x,y)$ の大きさは、三平方の定理で求められます。",
formula: "|\\vec{a}|=\\sqrt{x^2+y^2}",
},
{
kind: "workedExample",
title: "例3：ベクトルの大きさ",
body: "$\\vec{a}=(3,4)$ の大きさを求めます。\n\n公式より、\n\n$|\\vec{a}|=\\sqrt{3^2+4^2}$\n\n$=\\sqrt{9+16}$\n\n$=5$\n\nです。\n\n成分表示では、ベクトルの大きさは原点から点 $(x,y)$ までの距離と同じように求められます。",
},
{
kind: "commonMistake",
title: "よくあるミス：始点と終点を逆に引く",
body: "$\\overrightarrow{AB}$ を求めるときは、終点Bの座標から始点Aの座標を引きます。\n\n$A(x_1,y_1)$、$B(x_2,y_2)$ なら、\n\n$\\overrightarrow{AB}=(x_2-x_1,y_2-y_1)$\n\nです。\n\n逆にすると、$\\overrightarrow{BA}$ になります。\n\n座標でベクトルを求めるときは、どちら向きのベクトルかを必ず確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- ベクトルは成分 $(x,y)$ で表せる\n- 成分は横方向と縦方向の移動量\n- $\\overrightarrow{AB}=(x_2-x_1,y_2-y_1)$\n- ベクトル計算は成分ごとに行う\n- 実数倍では各成分に同じ数を掛ける\n- 大きさは $|\\vec{a}|=\\sqrt{x^2+y^2}$\n- 終点から始点を引くことを忘れない",
},
],
checkQuestions: [
{
question: "$A(2,-1)$、$B(6,3)$ のとき、$\\overrightarrow{AB}$ を求めよ。",
answer: "$\\overrightarrow{AB}=(6-2,3-(-1))=(4,4)$。",
hint: "終点から始点を引く。",
},
{
question: "$\\vec{a}=(1,3)$、$\\vec{b}=(4,-2)$ のとき、$\\vec{a}+\\vec{b}$ を求めよ。",
answer: "$(1+4,3+(-2))=(5,1)$。",
hint: "成分ごとに足す。",
},
{
question: "$\\vec{a}=(-5,12)$ の大きさを求めよ。",
answer: "$|\\vec{a}|=\\sqrt{25+144}=13$。",
hint: "三平方の定理。",
},
],
relatedPracticeLinks: [
{ label: "成分表示 演習", href: "/units/vectors" },
{ label: "座標平面 復習", href: "/courses/math-2bc/geometry-equations" },
],
qualityTags: ["成分表示", "座標", "大きさ", "確認問題3問"],
},
{
lessonId: "inner-product-basic",
lessonTitle: "内積と角度",
lessonDescription: "内積を使って、ベクトルのなす角・垂直条件・長さを計算で扱う。",
level: "standard",
estimatedMinutes: 85,
prerequisites: ["成分表示とベクトル計算", "余弦定理", "三角関数"],
goals: [
"内積の定義を理解できる",
"成分表示で内積を計算できる",
"内積からなす角を求められる",
"垂直条件を内積で判定できる",
"図形問題に内積を使える",
],
lessonBlocks: [
{
kind: "intro",
title: "内積は角度を計算する道具",
body: "ベクトルの内積は、2つのベクトルの向きの関係を調べるための道具です。\n\nベクトルの大きさだけでなく、2つのベクトルがどれくらい同じ方向を向いているかを数で表します。\n\n内積を使うと、角度や垂直条件を計算で扱えます。\n\n特に、図形問題で垂直を証明したいとき、内積が非常に強力です。",
},
{
kind: "formula",
title: "内積の定義",
body: "2つのベクトル $\\vec{a}$、$\\vec{b}$ のなす角を $\\theta$ とすると、内積は次のように定義されます。",
formula: "\\vec{a}\\cdot\\vec{b}=|\\vec{a}||\\vec{b}|\\cos\\theta",
},
{
kind: "concept",
title: "内積の意味",
body: "内積 $\\vec{a}\\cdot\\vec{b}$ は、2つのベクトルの向きがどれくらいそろっているかを表します。\n\n同じ方向に近いほど内積は正になります。\n\n直角なら $\\cos90^\\circ=0$ なので、内積は0になります。\n\n反対方向に近いほど内積は負になります。\n\nつまり、内積の符号を見ると、角度が鋭角か直角か鈍角かを判断できます。",
},
{
kind: "comparisonTable",
title: "内積と角度の関係",
body: "内積の符号は、なす角の種類と対応します。",
columns: ["内積", "なす角", "意味"],
rows: [
{
cells: ["$\\vec{a}\\cdot\\vec{b}>0$", "鋭角", "同じ方向に近い"],
highlight: true,
},
{
cells: ["$\\vec{a}\\cdot\\vec{b}=0$", "直角", "垂直"],
},
{
cells: ["$\\vec{a}\\cdot\\vec{b}<0$", "鈍角", "反対方向に近い"],
},
],
},
{
kind: "formula",
title: "成分での内積",
body: "$\\vec{a}=(a_1,a_2)$、$\\vec{b}=(b_1,b_2)$ のとき、内積は成分を使って次のように計算できます。",
formula: "\\vec{a}\\cdot\\vec{b}=a_1b_1+a_2b_2",
},
{
kind: "workedExample",
title: "例1：成分で内積を求める",
body: "$\\vec{a}=(2,3)$、$\\vec{b}=(4,-1)$ の内積を求めます。\n\n成分での内積は、\n\n$\\vec{a}\\cdot\\vec{b}=2\\cdot4+3\\cdot(-1)$\n\n$=8-3=5$\n\nです。\n\n対応する成分を掛けて足します。",
},
{
kind: "workedExample",
title: "例2：垂直を判定する",
body: "$\\vec{a}=(2,1)$、$\\vec{b}=(1,-2)$ が垂直か判定します。\n\n内積を計算します。\n\n$\\vec{a}\\cdot\\vec{b}=2\\cdot1+1\\cdot(-2)=2-2=0$\n\n内積が0なので、2つのベクトルは垂直です。\n\n垂直条件は、内積が0であることです。",
},
{
kind: "formula",
title: "なす角を求める",
body: "内積の定義から、なす角 $\\theta$ の余弦を求められます。",
formula: "\\cos\\theta=\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}",
},
{
kind: "workedExample",
title: "例3：なす角を求める",
body: "$\\vec{a}=(1,0)$、$\\vec{b}=(1,1)$ のなす角を求めます。\n\n内積は、\n\n$\\vec{a}\\cdot\\vec{b}=1\\cdot1+0\\cdot1=1$\n\nです。\n\n大きさは、$|\\vec{a}|=1$、$|\\vec{b}|=\\sqrt{2}$ です。\n\nしたがって、\n\n$\\cos\\theta=\\frac{1}{1\\cdot\\sqrt{2}}=\\frac{1}{\\sqrt{2}}$\n\nです。\n\nよって、$\\theta=45^\\circ$ です。",
},
{
kind: "concept",
title: "なす角の範囲は $0^\\circ\\leq\\theta\\leq180^\\circ$",
body: "内積の公式 $\\cos\\theta=\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}$ でなす角 $\\theta$ を求めるとき、$\\theta$ の範囲は必ず $0^\\circ\\leq\\theta\\leq180^\\circ$ です。\n\nこれはベクトルのなす角の定義によります。2つのベクトルを同じ始点から出るように移動したとき、2つの矢印が作る角のうち、$180^\\circ$ 以下の方を「なす角」と呼びます。$240^\\circ$ や $300^\\circ$ の側は考えません。\n\nこの範囲では $\\cos\\theta$ の値が一意に決まるため、$\\cos\\theta$ から $\\theta$ を逆算できます。\n\n例えば $\\cos\\theta=-\\frac{1}{2}$ と出たなら、$\\theta=120^\\circ$ であり、$240^\\circ$ ではありません。\n\n内積の符号とθの対応：\n\n- $\\vec{a}\\cdot\\vec{b}>0$ のとき $\\cos\\theta>0$ なので $0^\\circ<\\theta<90^\\circ$（鋭角）\n- $\\vec{a}\\cdot\\vec{b}=0$ のとき $\\theta=90^\\circ$（直角）\n- $\\vec{a}\\cdot\\vec{b}<0$ のとき $\\cos\\theta<0$ なので $90^\\circ<\\theta<180^\\circ$（鈍角）\n\nしたがって、内積の符号を見るだけで角の種類を判断できます。これは図形問題で三角形の角が鋭角か鈍角かを判定するときに使えます。",
},
{
kind: "commonMistake",
title: "よくあるミス：内積0を平行条件と間違える",
body: "内積が0という条件は、垂直を表します。\n\n平行を表す条件ではありません。\n\n2つのベクトルが平行なら、一方がもう一方の実数倍になります。\n\n一方、2つのベクトルが垂直なら、内積が0になります。\n\n平行は実数倍、垂直は内積0。この区別を必ず押さえましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 内積は角度を計算する道具\n- $\\vec{a}\\cdot\\vec{b}=|\\vec{a}||\\vec{b}|\\cos\\theta$\n- 成分では $a_1b_1+a_2b_2$\n- 内積が正なら鋭角、0なら直角、負なら鈍角\n- 垂直条件は内積が0\n- なす角は $\\cos\\theta=\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}$ で求める\n- 平行条件と垂直条件を混同しない",
},
],
checkQuestions: [
{
question: "$\\vec{a}=(3,2)$、$\\vec{b}=(-1,4)$ の内積を求めよ。",
answer: "$3\\cdot(-1)+2\\cdot4=-3+8=5$。",
hint: "対応する成分を掛けて足す。",
},
{
question: "$\\vec{a}=(1,2)$、$\\vec{b}=(4,-2)$ は垂直か。",
answer: "内積は $1\\cdot4+2\\cdot(-2)=0$。したがって垂直。",
hint: "内積が0なら垂直。",
},
{
question: "2つのベクトルが垂直である条件を内積で述べよ。",
answer: "$\\vec{a}\\cdot\\vec{b}=0$。",
hint: "$\\cos90^\\circ=0$。",
},
],
relatedPracticeLinks: [
{ label: "内積 演習", href: "/units/vectors" },
{ label: "三角関数 講座", href: "/courses/math-2bc/trigonometric-functions" },
],
qualityTags: ["内積", "垂直条件", "なす角", "確認問題3問"],
},
{
lessonId: "parallel-and-collinear-vectors",
lessonTitle: "平行条件と一直線上の条件",
lessonDescription: "実数倍と位置ベクトルを使って、平行・一直線上・共線条件を判定する。",
level: "standard",
estimatedMinutes: 85,
prerequisites: ["位置ベクトルと内分点", "成分表示とベクトル計算", "内積と角度"],
goals: [
"ベクトルの平行条件を説明できる",
"成分表示で平行を判定できる",
"3点が一直線上にある条件をベクトルで表せる",
"内分・外分と共線条件を結びつけられる",
"図形証明にベクトルを使える",
],
lessonBlocks: [
{
kind: "intro",
title: "平行は実数倍で表す",
body: "ベクトルで平行を表すとき、最も重要なのは実数倍です。\n\n2つのベクトルが平行であるとは、一方がもう一方の実数倍で表されることです。\n\n例えば、$\\vec{b}=3\\vec{a}$ なら、$\\vec{a}$ と $\\vec{b}$ は同じ向きで平行です。\n\n$\\vec{b}=-2\\vec{a}$ なら、向きは反対ですが平行です。\n\n図形の平行条件は、ベクトルでは実数倍として処理できます。",
},
{
kind: "formula",
title: "平行条件",
body: "零ベクトルでない2つのベクトル $\\vec{a},\\vec{b}$ が平行であることは、ある実数 $k$ を用いて次のように表されます。",
formula: "\\vec{b}=k\\vec{a}",
},
{
kind: "workedExample",
title: "例1：成分で平行を判定する",
body: "$\\vec{a}=(2,3)$、$\\vec{b}=(6,9)$ が平行か判定します。\n\n$\\vec{b}$ は、\n\n$(6,9)=3(2,3)$\n\nと表せます。\n\nしたがって、$\\vec{b}=3\\vec{a}$ です。\n\nよって、$\\vec{a}$ と $\\vec{b}$ は平行です。\n\n成分表示では、片方がもう片方の同じ倍率になっているかを確認します。",
},
{
kind: "workedExample",
title: "例2：平行でない例",
body: "$\\vec{a}=(2,3)$、$\\vec{b}=(4,7)$ が平行か考えます。\n\nもし平行なら、$\\vec{b}=k\\vec{a}$ と表せます。\n\nx成分を見ると、$4=2k$ なので $k=2$ です。\n\nしかし、y成分では $7=3k$ となり、$k=\\frac{7}{3}$ です。\n\n同じ $k$ になりません。\n\nしたがって、2つのベクトルは平行ではありません。",
},
{
kind: "concept",
title: "3点が一直線上にある条件",
body: "3点 $A,B,C$ が一直線上にあるとは、$\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ が平行であるということです。\n\nしたがって、ある実数 $k$ を用いて、\n\n$\\overrightarrow{AC}=k\\overrightarrow{AB}$\n\nと表せれば、3点 $A,B,C$ は一直線上にあります。\n\n一直線上の条件は、ベクトルの平行条件に帰着できます。",
},
{
kind: "workedExample",
title: "例3：3点が一直線上にあるか判定する",
body: "$A(1,2)$、$B(3,5)$、$C(7,11)$ が一直線上にあるか判定します。\n\nまず、\n\n$\\overrightarrow{AB}=(3-1,5-2)=(2,3)$\n\nです。\n\n次に、\n\n$\\overrightarrow{AC}=(7-1,11-2)=(6,9)$\n\nです。\n\n$\\overrightarrow{AC}=3\\overrightarrow{AB}$ なので、$\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ は平行です。\n\nしたがって、3点 $A,B,C$ は一直線上にあります。",
},
{
kind: "concept",
title: "内分点と一直線",
body: "点 $P$ が線分 $AB$ を内分するなら、$A,P,B$ は一直線上にあります。\n\n位置ベクトルで、\n\n$\\overrightarrow{OP}=\\frac{n\\vec{a}+m\\vec{b}}{m+n}$\n\nと表せる点は、AとBを結ぶ直線上にあります。\n\n逆に、ある点がAとBを結ぶ直線上にあるかを調べるとき、$\\overrightarrow{AP}$ が $\\overrightarrow{AB}$ の実数倍になっているかを確認します。",
},
{
kind: "commonMistake",
title: "よくあるミス：内積0を平行条件に使う",
body: "平行条件は実数倍です。\n\n垂直条件は内積0です。\n\nこの2つを混同しないようにしましょう。\n\n平行を示したいなら、$\\vec{b}=k\\vec{a}$ を示します。\n\n垂直を示したいなら、$\\vec{a}\\cdot\\vec{b}=0$ を示します。\n\n図形問題では、平行なのか垂直なのかを最初に確認してから道具を選びます。",
},
{
kind: "summary",
title: "まとめ",
body: "- 平行条件は一方が他方の実数倍になること\n- $\\vec{b}=k\\vec{a}$ なら平行\n- 成分表示では同じ倍率になっているか確認する\n- 3点が一直線上にある条件は、2つのベクトルが平行であること\n- $\\overrightarrow{AC}=k\\overrightarrow{AB}$ ならA,B,Cは一直線上\n- 平行は実数倍、垂直は内積0",
},
],
checkQuestions: [
{
question: "$\\vec{a}=(3,-2)$、$\\vec{b}=(-6,4)$ は平行か。",
answer: "$\\vec{b}=-2\\vec{a}$ なので平行。",
hint: "同じ倍率になっているかを見る。",
},
{
question: "3点 $A,B,C$ が一直線上にあることをベクトルで示すには、何を示せばよいか。",
answer: "$\\overrightarrow{AB}$ と $\\overrightarrow{AC}$ が平行であること、つまり $\\overrightarrow{AC}=k\\overrightarrow{AB}$ となること。",
hint: "一直線上は平行条件。",
},
{
question: "平行条件と垂直条件をそれぞれ答えよ。",
answer: "平行条件は一方が他方の実数倍。垂直条件は内積が0。",
hint: "実数倍と内積0。",
},
],
relatedPracticeLinks: [
{ label: "平行条件 演習", href: "/units/vectors" },
{ label: "内積 復習", href: "/courses/math-2bc/vectors/inner-product-basic" },
],
qualityTags: ["平行条件", "一直線", "共線", "実数倍", "確認問題3問"],
},
];

const VECTORS_ADVANCED: CourseLesson[] = [
{
lessonId: "vector-geometry-proofs",
lessonTitle: "ベクトルによる図形証明",
lessonDescription: "平行・垂直・中点・重心をベクトルで表し、図形の性質を証明する。",
level: "advanced",
estimatedMinutes: 90,
prerequisites: ["平行条件と一直線上の条件", "内積と角度", "位置ベクトルと内分点"],
goals: [
"図形の条件をベクトルの式に翻訳できる",
"平行を実数倍で証明できる",
"垂直を内積0で証明できる",
"中点・重心を位置ベクトルで扱える",
"入試標準レベルの図形証明に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "図形の言葉をベクトルに翻訳する",
body: "ベクトルの強さは、図形の性質を計算で証明できることです。\n\n平行なら実数倍。\n\n垂直なら内積0。\n\n中点なら位置ベクトルの平均。\n\n重心なら3頂点の平均。\n\nこのように、図形の言葉をベクトルの式に翻訳できれば、複雑な図形問題も計算で整理できます。",
},
{
kind: "comparisonTable",
title: "図形条件とベクトル表現",
body: "図形問題では、条件をベクトルの言葉へ変換します。",
columns: ["図形の条件", "ベクトルでの表現", "使う道具"],
rows: [
{
cells: ["平行", "$\\vec{b}=k\\vec{a}$", "実数倍"],
highlight: true,
},
{
cells: ["垂直", "$\\vec{a}\\cdot\\vec{b}=0$", "内積"],
},
{
cells: ["中点", "$\\frac{\\vec{a}+\\vec{b}}{2}$", "位置ベクトル"],
},
{
cells: ["重心", "$\\frac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$", "平均"],
},
{
cells: ["一直線上", "$\\overrightarrow{AC}=k\\overrightarrow{AB}$", "平行条件"],
},
],
},
{
kind: "workedExample",
title: "例1：中点連結定理をベクトルで示す",
body: "三角形 $ABC$ で、$M$ を $AB$ の中点、$N$ を $AC$ の中点とします。$MN$ が $BC$ に平行であることを示します。\n\n$\\overrightarrow{OA}=\\vec{a}$、$\\overrightarrow{OB}=\\vec{b}$、$\\overrightarrow{OC}=\\vec{c}$ とします。\n\n中点なので、\n\n$\\overrightarrow{OM}=\\frac{\\vec{a}+\\vec{b}}{2}$\n\n$\\overrightarrow{ON}=\\frac{\\vec{a}+\\vec{c}}{2}$\n\nです。\n\nしたがって、\n\n$\\overrightarrow{MN}=\\overrightarrow{ON}-\\overrightarrow{OM}$\n\n$=\\frac{\\vec{a}+\\vec{c}}{2}-\\frac{\\vec{a}+\\vec{b}}{2}$\n\n$=\\frac{\\vec{c}-\\vec{b}}{2}$\n\nです。\n\n一方、\n\n$\\overrightarrow{BC}=\\vec{c}-\\vec{b}$\n\nなので、\n\n$\\overrightarrow{MN}=\\frac{1}{2}\\overrightarrow{BC}$\n\nです。\n\nしたがって、$MN\\parallel BC$ です。",
},
{
kind: "workedExample",
title: "例2：垂直を内積で示す",
body: "点 $A(0,0)$、$B(2,1)$、$C(1,-2)$ について、$AB$ と $AC$ が垂直か調べます。\n\n$\\overrightarrow{AB}=(2,1)$\n\n$\\overrightarrow{AC}=(1,-2)$\n\nです。\n\n内積を計算すると、\n\n$\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=2\\cdot1+1\\cdot(-2)=0$\n\nです。\n\n内積が0なので、$AB\\perp AC$ です。\n\n垂直証明では、内積0を示します。",
},
{
kind: "workedExample",
title: "例3：重心を使う",
body: "三角形 $ABC$ の重心 $G$ について、$\\overrightarrow{GA}+\\overrightarrow{GB}+\\overrightarrow{GC}=\\vec{0}$ を示します。\n\n$\\overrightarrow{OA}=\\vec{a}$、$\\overrightarrow{OB}=\\vec{b}$、$\\overrightarrow{OC}=\\vec{c}$ とします。\n\n重心より、\n\n$\\overrightarrow{OG}=\\frac{\\vec{a}+\\vec{b}+\\vec{c}}{3}$\n\nです。\n\nすると、\n\n$\\overrightarrow{GA}=\\vec{a}-\\overrightarrow{OG}$\n\n$\\overrightarrow{GB}=\\vec{b}-\\overrightarrow{OG}$\n\n$\\overrightarrow{GC}=\\vec{c}-\\overrightarrow{OG}$\n\nです。\n\n3つを足すと、\n\n$\\vec{a}+\\vec{b}+\\vec{c}-3\\overrightarrow{OG}$\n\nになります。\n\n$3\\overrightarrow{OG}=\\vec{a}+\\vec{b}+\\vec{c}$ なので、結果は $\\vec{0}$ です。",
},
{
kind: "strategy",
title: "ベクトル図形証明の手順",
body: "ベクトルで図形証明をするときは、次の順番で考えます。\n\n1. 基準点を決め、各点の位置ベクトルを置く\n2. 証明したい図形条件をベクトル条件に変換する\n3. 必要なベクトルを差で表す\n4. 平行なら実数倍、垂直なら内積0を示す\n5. 中点・重心などの公式を使って整理する\n\n図形のまま悩まず、条件を式に翻訳することが重要です。",
},
{
kind: "commonMistake",
title: "よくあるミス：証明したい条件に合わない道具を使う",
body: "平行を証明したいのに内積を計算しても、直接は証明できません。\n\n垂直を証明したいのに実数倍を探しても、方針が違います。\n\n図形問題では、まず何を証明したいかを確認します。\n\n平行なら実数倍。\n\n垂直なら内積0。\n\n一直線上なら平行条件。\n\nこの対応を最初に決めましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- ベクトル図形証明では条件を式に翻訳する\n- 平行は実数倍で示す\n- 垂直は内積0で示す\n- 中点は2点の平均\n- 重心は3点の平均\n- 位置ベクトルの差で必要なベクトルを作る\n- 証明したい条件に合った道具を選ぶ",
},
],
checkQuestions: [
{
question: "平行を証明したいとき、ベクトルでは何を示せばよいか。",
answer: "一方のベクトルがもう一方の実数倍であること。",
hint: "$\\vec{b}=k\\vec{a}$。",
},
{
question: "垂直を証明したいとき、ベクトルでは何を示せばよいか。",
answer: "内積が0であること。",
hint: "$\\vec{a}\\cdot\\vec{b}=0$。",
},
{
question: "三角形の2辺の中点を結ぶ線分が残りの1辺に平行であることは、ベクトルでどのように示せるか。",
answer: "中点同士を結ぶベクトルが、残りの1辺のベクトルの $\\frac{1}{2}$ 倍になることを示す。",
hint: "中点の位置ベクトルを使う。",
},
],
relatedPracticeLinks: [
{ label: "ベクトル図形証明 演習", href: "/units/vectors" },
{ label: "内積 演習", href: "/courses/math-2bc/vectors/inner-product-basic" },
],
qualityTags: ["旧帝大準備", "図形証明", "平行", "垂直", "確認問題3問"],
},
{
lessonId: "space-vectors-basic",
lessonTitle: "空間ベクトル",
lessonDescription: "平面ベクトルを空間に拡張し、3次元での成分・内積・位置関係を扱う。",
level: "advanced",
estimatedMinutes: 90,
prerequisites: ["成分表示とベクトル計算", "内積と角度", "空間座標"],
goals: [
"空間ベクトルを3成分で表せる",
"空間でのベクトルの大きさを求められる",
"空間ベクトルの内積を計算できる",
"空間での垂直条件を内積で判定できる",
"空間図形をベクトルで処理する入口を理解できる",
],
lessonBlocks: [
{
kind: "intro",
title: "ベクトルを3次元へ広げる",
body: "平面ベクトルでは、横方向と縦方向の2成分でベクトルを表しました。\n\n空間ベクトルでは、さらに奥行き方向を加えて3成分で表します。\n\n例えば、$\\vec{a}=(2,-1,3)$ は、x方向に2、y方向に-1、z方向に3進むベクトルです。\n\n考え方は平面ベクトルとほとんど同じです。\n\n成分が2つから3つに増えるだけで、加法・減法・実数倍・内積は同じように計算できます。",
},
{
kind: "formula",
title: "空間での2点間ベクトル",
body: "点 $A(x_1,y_1,z_1)$、$B(x_2,y_2,z_2)$ に対して、AからBへのベクトルは次のようになります。",
formula: "\\overrightarrow{AB}=(x_2-x_1,y_2-y_1,z_2-z_1)",
},
{
kind: "workedExample",
title: "例1：空間の2点からベクトルを求める",
body: "$A(1,2,-1)$、$B(4,0,5)$ のとき、$\\overrightarrow{AB}$ を求めます。\n\n終点Bの座標から始点Aの座標を引きます。\n\n$\\overrightarrow{AB}=(4-1,0-2,5-(-1))$\n\n$=(3,-2,6)$\n\nです。\n\n空間でも、終点から始点を引くという考え方は同じです。",
},
{
kind: "formula",
title: "空間ベクトルの大きさ",
body: "$\\vec{a}=(x,y,z)$ の大きさは、3次元版の三平方の定理で求められます。",
formula: "|\\vec{a}|=\\sqrt{x^2+y^2+z^2}",
},
{
kind: "workedExample",
title: "例2：空間ベクトルの大きさ",
body: "$\\vec{a}=(2,-3,6)$ の大きさを求めます。\n\n公式より、\n\n$|\\vec{a}|=\\sqrt{2^2+(-3)^2+6^2}$\n\n$=\\sqrt{4+9+36}$\n\n$=\\sqrt{49}=7$\n\nです。",
},
{
kind: "formula",
title: "空間ベクトルの内積",
body: "$\\vec{a}=(a_1,a_2,a_3)$、$\\vec{b}=(b_1,b_2,b_3)$ の内積は次のように計算します。",
formula: "\\vec{a}\\cdot\\vec{b}=a_1b_1+a_2b_2+a_3b_3",
},
{
kind: "workedExample",
title: "例3：空間で垂直を判定する",
body: "$\\vec{a}=(1,2,-1)$、$\\vec{b}=(3,-1,1)$ が垂直か調べます。\n\n内積を計算します。\n\n$\\vec{a}\\cdot\\vec{b}=1\\cdot3+2\\cdot(-1)+(-1)\\cdot1$\n\n$=3-2-1=0$\n\nです。\n\n内積が0なので、2つのベクトルは垂直です。\n\n空間でも、垂直条件は内積0です。",
},
{
kind: "comparisonTable",
title: "平面と空間の違い",
body: "考え方は同じで、成分が1つ増えます。",
columns: ["項目", "平面ベクトル", "空間ベクトル"],
rows: [
{
cells: ["成分", "$(x,y)$", "$(x,y,z)$"],
highlight: true,
},
{
cells: ["大きさ", "$\\sqrt{x^2+y^2}$", "$\\sqrt{x^2+y^2+z^2}$"],
},
{
cells: ["内積", "$a_1b_1+a_2b_2$", "$a_1b_1+a_2b_2+a_3b_3$"],
},
{
cells: ["垂直条件", "内積0", "内積0"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：z成分を忘れる",
body: "空間ベクトルでは、x成分・y成分・z成分の3つをすべて扱います。\n\n大きさを求めるときも、内積を求めるときも、z成分を忘れてはいけません。\n\n例えば、$(1,2,2)$ の大きさは、$\\sqrt{1^2+2^2}$ ではなく、$\\sqrt{1^2+2^2+2^2}=3$ です。\n\n平面と同じ感覚で2成分だけ見ないようにしましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 空間ベクトルは3成分で表す\n- $\\overrightarrow{AB}=(x_2-x_1,y_2-y_1,z_2-z_1)$\n- 大きさは $\\sqrt{x^2+y^2+z^2}$\n- 内積は対応する3成分の積の和\n- 空間でも垂直条件は内積0\n- 平面ベクトルの考え方を3次元に広げたもの",
},
],
checkQuestions: [
{
question: "$A(0,1,2)$、$B(3,-1,5)$ のとき、$\\overrightarrow{AB}$ を求めよ。",
answer: "$\\overrightarrow{AB}=(3,-2,3)$。",
hint: "終点から始点を引く。",
},
{
question: "$\\vec{a}=(2,1,2)$ の大きさを求めよ。",
answer: "$|\\vec{a}|=\\sqrt{4+1+4}=3$。",
hint: "3成分すべてを2乗して足す。",
},
{
question: "$\\vec{a}=(1,0,2)$、$\\vec{b}=(2,3,-1)$ の内積を求めよ。",
answer: "$1\\cdot2+0\\cdot3+2\\cdot(-1)=0$。",
hint: "対応する成分を掛けて足す。",
},
],
relatedPracticeLinks: [
{ label: "空間ベクトル 演習", href: "/units/vectors" },
{ label: "空間座標 復習", href: "/courses/math-2bc/geometry-equations" },
],
qualityTags: ["空間ベクトル", "3次元", "内積", "垂直", "確認問題3問"],
},
{
lessonId: "vectors-exam-standard",
lessonTitle: "ベクトルの融合問題",
lessonDescription: "位置ベクトル・内積・平行条件・垂直条件・空間ベクトルを組み合わせた実戦問題を切り崩す。",
level: "advanced",
estimatedMinutes: 100,
prerequisites: ["ベクトルによる図形証明", "空間ベクトル", "平行条件と一直線上の条件"],
goals: [
"ベクトル問題で使う道具を選択できる",
"図形条件をベクトルの式に翻訳できる",
"平行・垂直・内分・重心を組み合わせられる",
"成分表示と位置ベクトルを使い分けられる",
"難関大入口レベルのベクトル問題で初手を決められる",
],
lessonBlocks: [
{
kind: "intro",
title: "ベクトル問題は条件の翻訳が勝負",
body: "ベクトルの融合問題では、平行・垂直・内分・重心・角度・長さが組み合わさります。\n\n大切なのは、問題文の図形条件をベクトルの式に翻訳することです。\n\n平行なら実数倍。\n\n垂直なら内積0。\n\n点の位置なら位置ベクトル。\n\n長さならベクトルの大きさ。\n\n角度なら内積。\n\nこの翻訳ができると、複雑な図形問題も計算で切り崩せます。",
},
{
kind: "strategy",
title: "ベクトル融合問題の確認リスト",
body: "実戦問題では、次の順番で考えます。\n\n1. 基準点を決め、位置ベクトルを置く\n2. 求めたいベクトルを差で表す\n3. 平行なら実数倍を使う\n4. 垂直なら内積0を使う\n5. 中点・内分点・重心なら公式を使う\n6. 長さや角度なら内積を使う\n7. 空間なら3成分で同じように処理する\n\n図を見て悩むだけでなく、条件を式に変換することが重要です。",
},
{
kind: "workedExample",
title: "例1：内分点と平行条件",
body: "三角形 $ABC$ で、点 $P$ が $AB$ を $1:2$ に内分し、点 $Q$ が $AC$ を $1:2$ に内分するとします。$PQ\\parallel BC$ を示します。\n\n$\\overrightarrow{OA}=\\vec{a}$、$\\overrightarrow{OB}=\\vec{b}$、$\\overrightarrow{OC}=\\vec{c}$ とします。\n\n内分点公式より、\n\n$\\overrightarrow{OP}=\\frac{2\\vec{a}+\\vec{b}}{3}$\n\n$\\overrightarrow{OQ}=\\frac{2\\vec{a}+\\vec{c}}{3}$\n\nです。\n\nしたがって、\n\n$\\overrightarrow{PQ}=\\overrightarrow{OQ}-\\overrightarrow{OP}$\n\n$=\\frac{2\\vec{a}+\\vec{c}}{3}-\\frac{2\\vec{a}+\\vec{b}}{3}$\n\n$=\\frac{\\vec{c}-\\vec{b}}{3}$\n\nです。\n\n一方、$\\overrightarrow{BC}=\\vec{c}-\\vec{b}$ なので、\n\n$\\overrightarrow{PQ}=\\frac{1}{3}\\overrightarrow{BC}$\n\nです。\n\nしたがって、$PQ\\parallel BC$ です。",
},
{
kind: "workedExample",
title: "例2：内積で角度を求める",
body: "$\\vec{a}=(2,1)$、$\\vec{b}=(1,2)$ のなす角を求めます。\n\n内積は、\n\n$\\vec{a}\\cdot\\vec{b}=2\\cdot1+1\\cdot2=4$\n\nです。\n\n大きさは、\n\n$|\\vec{a}|=\\sqrt{5}$、$|\\vec{b}|=\\sqrt{5}$\n\nです。\n\nしたがって、\n\n$\\cos\\theta=\\frac{4}{\\sqrt{5}\\sqrt{5}}=\\frac{4}{5}$\n\nです。\n\nよって、なす角は $\\cos\\theta=\\frac{4}{5}$ を満たす角です。\n\n角度を直接求めにくい場合でも、余弦の値まで求めれば十分なことがあります。",
},
{
kind: "workedExample",
title: "例3：空間での垂直条件",
body: "空間内の点 $A(1,0,2)$、$B(3,1,4)$、$C(0,2,1)$ について、$AB$ と $AC$ が垂直か調べます。\n\n$\\overrightarrow{AB}=(3-1,1-0,4-2)=(2,1,2)$\n\nです。\n\n$\\overrightarrow{AC}=(0-1,2-0,1-2)=(-1,2,-1)$\n\nです。\n\n内積を計算すると、\n\n$\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=2\\cdot(-1)+1\\cdot2+2\\cdot(-1)$\n\n$=-2+2-2=-2$\n\nです。\n\n内積が0ではないので、$AB$ と $AC$ は垂直ではありません。",
},
{
kind: "comparisonTable",
title: "実戦で使う判断",
body: "条件を見たら、使う道具をすぐに決めます。",
columns: ["問題文の言葉", "ベクトルの道具", "式"],
rows: [
{
cells: ["平行", "実数倍", "$\\vec{b}=k\\vec{a}$"],
highlight: true,
},
{
cells: ["垂直", "内積", "$\\vec{a}\\cdot\\vec{b}=0$"],
},
{
cells: ["角度", "内積", "$\\cos\\theta=\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}$"],
},
{
cells: ["長さ", "大きさ", "$|\\vec{a}|$"],
},
{
cells: ["内分・重心", "位置ベクトル", "平均や比で表す"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：図の印象だけで判断する",
body: "ベクトル問題では、図を見ることは大切ですが、図の印象だけで結論を出すのは危険です。\n\n平行に見える、垂直に見える、同じ長さに見えるというだけでは証明になりません。\n\n平行なら実数倍を示す。\n\n垂直なら内積0を示す。\n\n長さが等しいなら大きさを計算する。\n\n図形の性質を、必ずベクトルの式で確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- ベクトル融合問題は条件の翻訳が重要\n- 平行は実数倍で処理する\n- 垂直は内積0で処理する\n- 角度は内積の公式で処理する\n- 長さはベクトルの大きさで処理する\n- 内分点・重心は位置ベクトルで処理する\n- 空間でも成分が3つになるだけで考え方は同じ",
},
],
checkQuestions: [
{
question: "ベクトル問題で、角度を求めたいときに使う代表的な道具は何か。",
answer: "内積。$\\cos\\theta=\\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}$ を使う。",
hint: "角度と内積はつながる。",
},
{
question: "$\\vec{a}=(1,2,3)$、$\\vec{b}=(2,-1,0)$ の内積を求めよ。",
answer: "$1\\cdot2+2\\cdot(-1)+3\\cdot0=0$。",
hint: "3成分すべて使う。",
},
{
question: "点 $P,Q$ を結ぶベクトルが $\\overrightarrow{PQ}=\\frac{1}{3}\\overrightarrow{BC}$ と表せたとき、何が分かるか。",
answer: "$PQ\\parallel BC$ であることが分かる。",
hint: "実数倍なら平行。",
},
],
relatedPracticeLinks: [
{ label: "ベクトル 実戦演習", href: "/units/vectors" },
{ label: "過去問道場", href: "/dojo" },
{ label: "空間ベクトル", href: "/courses/math-2bc/vectors/space-vectors-basic" },
],
qualityTags: ["旧帝大準備", "ベクトル融合", "内積", "空間", "図形証明"],
},
];

export const VECTORS_UNIT: CourseUnit = {
unitId: "vectors",
subjectId: "math-2bc",
unitTitle: "ベクトル",
unitDescription:
"ベクトルの基本、加法・減法・実数倍、位置ベクトル、成分表示、内積、平行・垂直条件、空間ベクトルまで体系的に学ぶ単元です。",
lessons: [
...VECTORS_BEGINNER,
...VECTORS_STANDARD,
...VECTORS_ADVANCED,
],
};

