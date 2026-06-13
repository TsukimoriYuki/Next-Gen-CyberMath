import type { CourseLesson, CourseUnit } from "@/types/course";

const EXPRESSION_PROOF_BEGINNER: CourseLesson[] = [
{
lessonId: "advanced-expansion-formulas",
lessonTitle: "三次式の展開と因数分解",
lessonDescription: "三次式の展開公式・因数分解公式を整理し、式変形の基礎体力を作る。",
level: "beginner",
estimatedMinutes: 65,
prerequisites: ["数と式", "展開", "因数分解"],
goals: [
"三次式の展開公式を使える",
"三次式の因数分解公式を使える",
"式の形から使う公式を判断できる",
"展開と因数分解を逆向きの操作として理解できる",
"証明問題に必要な式変形の基礎を作れる",
],
lessonBlocks: [
{
kind: "intro",
title: "式と証明は式変形の単元",
body: "数学IIの式と証明では、ただ計算するだけでなく、式を目的に合わせて変形する力が求められます。\n\nその入口になるのが、三次式の展開と因数分解です。\n\n数学IAでは二次式の展開・因数分解を学びました。\n\n数学IIでは、$(a+b)^3$ や $a^3-b^3$ のような三次式も扱います。\n\nこれらの公式は、恒等式・二項定理・不等式の証明につながる重要な道具です。",
},
{
kind: "formula",
title: "三次式の展開公式",
body: "まずは、三次式の基本展開公式を押さえます。",
formula: "(a+b)^3=a^3+3a^2b+3ab^2+b^3",
},
{
kind: "formula",
title: "差の三乗",
body: "$(a-b)^3$ は、符号に注意して展開します。",
formula: "(a-b)^3=a^3-3a^2b+3ab^2-b^3",
},
{
kind: "workedExample",
title: "例1：三次式を展開する",
body: "$(x+2)^3$ を展開します。\n\n公式 $(a+b)^3=a^3+3a^2b+3ab^2+b^3$ を使います。\n\nここで、$a=x$、$b=2$ です。\n\n$(x+2)^3=x^3+3x^2\cdot2+3x\cdot2^2+2^3$\n\n$=x^3+6x^2+12x+8$\n\nです。\n\n係数 $1,3,3,1$ の並びを意識すると安定します。",
},
{
kind: "formula",
title: "三乗の和と差",
body: "三次式の因数分解では、三乗の和と差の公式が重要です。",
formula: "a^3+b^3=(a+b)(a^2-ab+b^2)",
},
{
kind: "formula",
title: "三乗の差",
body: "$a^3-b^3$ は、次のように因数分解できます。",
formula: "a^3-b^3=(a-b)(a^2+ab+b^2)",
},
{
kind: "workedExample",
title: "例2：三乗の差を因数分解する",
body: "$x^3-8$ を因数分解します。\n\n$8=2^3$ なので、\n\n$x^3-8=x^3-2^3$\n\nです。\n\n三乗の差の公式より、\n\n$x^3-2^3=(x-2)(x^2+2x+4)$\n\nです。\n\nしたがって、$x^3-8=(x-2)(x^2+2x+4)$ です。",
},
{
kind: "comparisonTable",
title: "三次式公式の見分け",
body: "式の形から、展開か因数分解かを判断します。",
columns: ["形", "使う公式", "注意点"],
rows: [
{
cells: ["$(a+b)^3$", "三乗の展開", "係数は $1,3,3,1$"],
highlight: true,
},
{
cells: ["$(a-b)^3$", "差の三乗", "符号が交互になる"],
},
{
cells: ["$a^3+b^3$", "三乗の和", "$(a+b)$ が因数"],
},
{
cells: ["$a^3-b^3$", "三乗の差", "$(a-b)$ が因数"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：a³+b³を(a+b)(a²+b²)にする",
body: "$a^3+b^3$ を $(a+b)(a^2+b^2)$ としてはいけません。\n\n正しくは、\n\n$a^3+b^3=(a+b)(a^2-ab+b^2)$\n\nです。\n\n中央の項 $-ab$ が必要です。\n\n実際に展開して元に戻るか確認すると、公式ミスに気づきやすくなります。",
},
{
kind: "summary",
title: "まとめ",
body: "- 三次式の展開では係数 $1,3,3,1$ を意識する\n- $(a+b)^3=a^3+3a^2b+3ab^2+b^3$\n- $(a-b)^3=a^3-3a^2b+3ab^2-b^3$\n- $a^3+b^3=(a+b)(a^2-ab+b^2)$\n- $a^3-b^3=(a-b)(a^2+ab+b^2)$\n- 因数分解公式は展開して確認できる",
},
],
checkQuestions: [
{
question: "$(x-3)^3$ を展開せよ。",
answer: "$x^3-9x^2+27x-27$。",
hint: "$(a-b)^3$ の公式を使う。",
},
{
question: "$x^3+27$ を因数分解せよ。",
answer: "$x^3+3^3=(x+3)(x^2-3x+9)$。",
hint: "三乗の和の公式。",
},
{
question: "$a^3-b^3$ の因数分解公式を答えよ。",
answer: "$a^3-b^3=(a-b)(a^2+ab+b^2)$。",
hint: "差なら最初の因数は $a-b$。",
},
],
relatedPracticeLinks: [
{ label: "式と証明 基礎演習", href: "/units/expression-proof", description: "三次式の展開・因数分解" },
{ label: "数と式 講座", href: "/courses/math-1a/numbers-and-expressions", description: "式変形の復習" },
],
qualityTags: ["三次式", "展開", "因数分解", "確認問題3問"],
},
{
lessonId: "identity-basic",
lessonTitle: "恒等式とは何か",
lessonDescription: "すべての値で成り立つ等式として恒等式を理解し、係数比較の考え方を学ぶ。",
level: "beginner",
estimatedMinutes: 65,
prerequisites: ["整式の計算", "展開", "方程式"],
goals: [
"恒等式と方程式の違いを説明できる",
"恒等式の係数比較ができる",
"恒等式に特別な値を代入して係数を求められる",
"未定係数法の入口を理解できる",
"証明問題で恒等式を使う準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "恒等式はいつでも成り立つ等式",
body: "恒等式とは、文字にどんな値を代入しても成り立つ等式です。\n\n例えば、$(x+1)^2=x^2+2x+1$ は、どんな $x$ でも成り立ちます。\n\n一方、$x+1=3$ は、$x=2$ のときだけ成り立つ方程式です。\n\n恒等式と方程式は、見た目は似ていますが意味が違います。\n\n恒等式では、両辺の係数が完全に一致する必要があります。",
},
{
kind: "comparisonTable",
title: "恒等式と方程式の違い",
body: "等式がいつ成り立つかで区別します。",
columns: ["種類", "意味", "例"],
rows: [
{
cells: ["恒等式", "すべての値で成り立つ", "$(x+1)^2=x^2+2x+1$"],
highlight: true,
},
{
cells: ["方程式", "特定の値で成り立つ", "$x+1=3$"],
},
],
},
{
kind: "concept",
title: "係数比較",
body: "整式の恒等式では、同じ次数の係数が等しくなります。\n\n例えば、\n\n$ax+b=3x+5$\n\nが $x$ についての恒等式なら、$x$ の係数と定数項を比べて、\n\n$a=3$、$b=5$\n\nです。\n\n恒等式では、すべての $x$ で同じ値になるため、対応する係数が一致します。",
},
{
kind: "workedExample",
title: "例1：係数比較で求める",
body: "$(a+2)x+b-1=5x+3$ が $x$ についての恒等式であるとします。\n\n両辺の $x$ の係数を比べると、\n\n$a+2=5$\n\nなので、$a=3$ です。\n\n定数項を比べると、\n\n$b-1=3$\n\nなので、$b=4$ です。\n\nしたがって、$a=3$、$b=4$ です。",
},
{
kind: "concept",
title: "特別な値を代入する方法",
body: "恒等式では、すべての値で成り立つため、好きな値を代入できます。\n\n係数比較で解くこともできますが、式の形によっては特別な値を代入した方が速いことがあります。\n\n例えば、$(x-1)$ や $(x+2)$ を含む式なら、$x=1$ や $x=-2$ を代入すると、その因数を含む項が消えます。\n\nこれを利用すると、未定係数を効率よく求められます。",
},
{
kind: "workedExample",
title: "例2：代入で係数を求める",
body: "$2x+5=A(x-1)+B$ が $x$ についての恒等式であるとします。\n\n$x=1$ を代入すると、右辺の $A(x-1)$ が消えます。\n\n左辺は $2\cdot1+5=7$、右辺は $B$ なので、\n\n$B=7$\n\nです。\n\n次に、係数比較してもよいです。\n\n右辺は $Ax-A+B$ なので、$x$ の係数より $A=2$ です。\n\nしたがって、$A=2$、$B=7$ です。",
},
{
kind: "commonMistake",
title: "よくあるミス：恒等式を方程式のように1つのxだけで判断する",
body: "恒等式は、すべての $x$ で成り立つ必要があります。\n\nたまたま1つの値で成り立っても、恒等式とは限りません。\n\n例えば、$x+1=3$ は $x=2$ では成り立ちますが、すべての $x$ で成り立つわけではありません。\n\n恒等式では、係数比較や複数の値の代入によって、全体として成り立つことを確認します。",
},
{
kind: "summary",
title: "まとめ",
body: "- 恒等式はすべての値で成り立つ等式\n- 方程式は特定の値で成り立つ等式\n- 整式の恒等式では同じ次数の係数が一致する\n- 係数比較で未定係数を求められる\n- 恒等式には好きな値を代入できる\n- 特別な値を代入すると計算が短くなることがある",
},
],
checkQuestions: [
{
question: "$ax+b=4x-7$ が恒等式のとき、$a,b$ を求めよ。",
answer: "係数比較より、$a=4$、$b=-7$。",
hint: "$x$ の係数と定数項を比べる。",
},
{
question: "$(x+2)^2=x^2+4x+4$ は恒等式か方程式か。",
answer: "恒等式。すべての $x$ で成り立つ。",
hint: "展開公式として常に成り立つ。",
},
{
question: "恒等式で係数比較ができる理由を簡単に説明せよ。",
answer: "すべての $x$ で両辺が同じ値になるため、同じ次数の係数が一致するから。",
hint: "すべての値で成り立つ。",
},
],
relatedPracticeLinks: [
{ label: "恒等式 演習", href: "/units/expression-proof" },
{ label: "整式の計算", href: "/courses/math-1a/numbers-and-expressions/polynomial-basics" },
],
qualityTags: ["恒等式", "係数比較", "未定係数", "確認問題3問"],
},
{
lessonId: "fractional-expressions-basic",
lessonTitle: "分数式と整式の割り算",
lessonDescription: "分数式の約分・通分と整式の割り算を整理し、式の証明で使える形に変形する。",
level: "beginner",
estimatedMinutes: 70,
prerequisites: ["分数計算", "因数分解", "整式の計算"],
goals: [
"分数式を約分できる",
"分数式を通分できる",
"整式の割り算の形を理解できる",
"割る式と余りの関係を説明できる",
"式変形で分母条件を意識できる",
],
lessonBlocks: [
{
kind: "intro",
title: "分数式も普通の分数と同じ発想",
body: "分数式とは、分母や分子に文字式を含む分数です。\n\n例えば、$\frac{x^2-1}{x-1}$ のような式です。\n\n普通の分数と同じように、分母と分子に共通因数があれば約分できます。\n\nただし、文字式では分母が0にならない条件に注意する必要があります。\n\n分数式の計算は、証明問題や方程式の変形でよく使います。",
},
{
kind: "workedExample",
title: "例1：分数式を約分する",
body: "$\frac{x^2-1}{x-1}$ を簡単にします。\n\n分子を因数分解すると、\n\n$x^2-1=(x-1)(x+1)$\n\nです。\n\nしたがって、\n\n$\frac{x^2-1}{x-1}=\frac{(x-1)(x+1)}{x-1}$\n\nです。\n\n$x\neq1$ のとき、$x-1$ を約分して、\n\n$x+1$\n\nになります。\n\n分母が0になる $x=1$ はもとの式では定義されないことに注意します。",
},
{
kind: "concept",
title: "分母条件",
body: "分数式では、分母が0になってはいけません。\n\n例えば、$\frac{x^2-1}{x-1}$ では、$x=1$ のとき分母が0になります。\n\n約分後の式が $x+1$ になっても、もとの式では $x=1$ は使えません。\n\n式を変形するときは、もとの式の分母条件を忘れないようにします。",
},
{
kind: "workedExample",
title: "例2：分数式の通分",
body: "$\frac{1}{x}+\frac{1}{x+1}$ を通分します。\n\n共通分母は $x(x+1)$ です。\n\n$\frac{1}{x}=\frac{x+1}{x(x+1)}$\n\n$\frac{1}{x+1}=\frac{x}{x(x+1)}$\n\nなので、\n\n$\frac{1}{x}+\frac{1}{x+1}=\frac{x+1+x}{x(x+1)}$\n\n$=\frac{2x+1}{x(x+1)}$\n\nです。",
},
{
kind: "concept",
title: "整式の割り算",
body: "整式でも、整数と同じように割り算ができます。\n\n整式 $P(x)$ を整式 $A(x)$ で割ると、\n\n$P(x)=A(x)Q(x)+R(x)$\n\nの形に表せます。\n\nここで、$Q(x)$ は商、$R(x)$ は余りです。\n\n余りの次数は、割る式 $A(x)$ の次数より小さくなります。",
},
{
kind: "formula",
title: "整式の割り算の形",
body: "割られる式、割る式、商、余りの関係を式で表すと次のようになります。",
formula: "P(x)=A(x)Q(x)+R(x)",
},
{
kind: "commonMistake",
title: "よくあるミス：約分後の分母条件を忘れる",
body: "$\frac{x^2-1}{x-1}$ は約分すると $x+1$ になりますが、もとの式では $x=1$ は定義されません。\n\n約分後だけを見ると $x=1$ でも値がありそうに見えますが、もとの式では分母が0です。\n\n分数式では、変形前の分母条件を必ず確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 分数式は文字式を含む分数\n- 共通因数があれば約分できる\n- 約分前の分母条件を忘れない\n- 通分では共通分母を作る\n- 整式の割り算は $P(x)=A(x)Q(x)+R(x)$ と表せる\n- 余りの次数は割る式より小さい",
},
],
checkQuestions: [
{
question: "$\frac{x^2-4}{x-2}$ を簡単にせよ。ただし分母条件も答えよ。",
answer: "$x^2-4=(x-2)(x+2)$ より、$x\neq2$ のもとで $x+2$。",
hint: "分子を因数分解する。",
},
{
question: "$\frac{1}{x}+\frac{1}{x-1}$ を通分せよ。",
answer: "$\frac{x-1+x}{x(x-1)}=\frac{2x-1}{x(x-1)}$。",
hint: "共通分母は $x(x-1)$。",
},
{
question: "整式の割り算で、$P(x)=A(x)Q(x)+R(x)$ の $R(x)$ は何を表すか。",
answer: "余り。",
hint: "整数の割り算と同じ。",
},
],
relatedPracticeLinks: [
{ label: "分数式 演習", href: "/units/expression-proof" },
{ label: "因数分解 復習", href: "/courses/math-1a/numbers-and-expressions/factorization-basic" },
],
qualityTags: ["分数式", "整式の割り算", "分母条件", "確認問題3問"],
},
];

const EXPRESSION_PROOF_STANDARD: CourseLesson[] = [
{
lessonId: "binomial-theorem-basic",
lessonTitle: "二項定理",
lessonDescription: "二項定理を使って、二項式の累乗の展開と特定の項の係数を求める。",
level: "standard",
estimatedMinutes: 80,
prerequisites: ["三次式の展開", "組合せ", "階乗"],
goals: [
"二項定理の形を理解できる",
"二項係数の意味を説明できる",
"$(a+b)^n$ の展開に二項定理を使える",
"特定の項の係数を求められる",
"組合せと展開公式のつながりを理解できる",
],
lessonBlocks: [
{
kind: "intro",
title: "二項定理は展開を一気に表す公式",
body: "$(a+b)^2$ や $(a+b)^3$ は展開公式で扱えました。\n\nでは、$(a+b)^8$ や $(a+b)^{10}$ のような高い次数はどうすればよいでしょうか。\n\nこのような二項式の累乗を一般的に展開する公式が二項定理です。\n\n二項定理を使うと、すべての項を書き出さなくても、特定の項や係数を求められます。",
},
{
kind: "formula",
title: "二項定理",
body: "$(a+b)^n$ は、組合せの記号を使って次のように展開できます。",
formula: "(a+b)^n=\sum_{k=0}^{n} {}_nC_k a^{n-k}b^k",
},
{
kind: "concept",
title: "二項係数の意味",
body: "二項定理に出てくる ${}_nC_k$ は、組合せの数です。\n\n$(a+b)^n$ は、$(a+b)$ を $n$ 個掛けたものです。\n\n各項を作るとき、$n$ 個の括弧のうち、どの $k$ 個から $b$ を選ぶかを考えます。\n\nその選び方の数が ${}_nC_k$ です。\n\nだから、係数に組合せが現れます。",
},
{
kind: "workedExample",
title: "例1：二項定理で展開する",
body: "$(x+2)^4$ を展開します。\n\n二項定理より、\n\n$(x+2)^4={}_4C_0x^4+{}_4C_1x^3\cdot2+{}_4C_2x^2\cdot2^2+{}_4C_3x\cdot2^3+{}_4C_4\cdot2^4$\n\nです。\n\n係数を計算すると、\n\n$x^4+8x^3+24x^2+32x+16$\n\nです。",
},
{
kind: "workedExample",
title: "例2：特定の項の係数",
body: "$(x+3)^5$ における $x^2$ の係数を求めます。\n\n一般項は、\n\n${}_5C_k x^{5-k}3^k$\n\nです。\n\n$x^2$ の項が欲しいので、$5-k=2$ です。\n\nしたがって、$k=3$ です。\n\n係数は、\n\n${}_5C_3\cdot3^3=10\cdot27=270$\n\nです。\n\nよって、$x^2$ の係数は $270$ です。",
},
{
kind: "comparisonTable",
title: "二項定理の読み方",
body: "特定の項を求めるときは、指数に注目します。",
columns: ["部分", "意味", "見るポイント"],
rows: [
{
cells: ["${}_nC_k$", "選び方の数", "係数に関わる"],
highlight: true,
},
{
cells: ["$a^{n-k}$", "aの指数", "kが増えると減る"],
},
{
cells: ["$b^k$", "bの指数", "kが増えると増える"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：kの範囲を1から始める",
body: "二項定理では、$k$ は $0$ から $n$ まで動きます。\n\n$k=0$ の項は $a^n$、$k=n$ の項は $b^n$ です。\n\n最初を $k=1$ からにしてしまうと、最初の項を落としてしまいます。\n\n二項定理では、端の項も忘れないようにしましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 二項定理は $(a+b)^n$ を展開する公式\n- 係数には組合せ ${}_nC_k$ が現れる\n- 一般項は ${}_nC_k a^{n-k}b^k$\n- $k$ は $0$ から $n$ まで動く\n- 特定の項を求めるときは指数を見て $k$ を決める\n- 二項定理は高次の展開で強力",
},
],
checkQuestions: [
{
question: "$(x+1)^5$ の $x^3$ の係数を求めよ。",
answer: "一般項は ${}_5C_k x^{5-k}$。$5-k=3$ より $k=2$。係数は ${}_5C_2=10$。",
hint: "$x$ の指数から $k$ を決める。",
},
{
question: "$(x+2)^3$ を二項定理で展開せよ。",
answer: "$x^3+6x^2+12x+8$。",
hint: "係数は $1,3,3,1$。",
},
{
question: "二項定理で $k$ はどこからどこまで動くか。",
answer: "$0$ から $n$ まで。",
hint: "端の項も含む。",
},
],
relatedPracticeLinks: [
{ label: "二項定理 演習", href: "/units/expression-proof" },
{ label: "場合の数と確率", href: "/courses/math-1a/counting-probability/permutation-combination-basic" },
],
qualityTags: ["二項定理", "組合せ", "係数", "確認問題3問"],
},
{
lessonId: "equality-proof-strategy",
lessonTitle: "等式の証明",
lessonDescription: "等式証明の基本方針を整理し、左辺変形・右辺変形・差を取る方法を使い分ける。",
level: "standard",
estimatedMinutes: 75,
prerequisites: ["恒等式とは何か", "式変形", "因数分解"],
goals: [
"等式証明の基本方針を説明できる",
"左辺を変形して右辺に合わせられる",
"両辺の差を取って0を示せる",
"複雑な式を共通の形に整理できる",
"証明答案の書き方を理解できる",
],
lessonBlocks: [
{
kind: "intro",
title: "等式証明は同じ形にする作業",
body: "等式の証明では、左辺と右辺が同じ値であることを示します。\n\n基本方針は、左辺を変形して右辺にする、右辺を変形して左辺にする、または左辺と右辺の差が0であることを示す、の3つです。\n\nどの方法を使うかは、式の形を見て判断します。\n\n証明では、計算過程を読み手に分かるように書くことも重要です。",
},
{
kind: "comparisonTable",
title: "等式証明の方針",
body: "式の形に応じて、使う方針を選びます。",
columns: ["方針", "やること", "向いている場面"],
rows: [
{
cells: ["左辺変形", "左辺を右辺の形に近づける", "左辺が複雑"],
highlight: true,
},
{
cells: ["右辺変形", "右辺を左辺の形に近づける", "右辺が複雑"],
},
{
cells: ["差を取る", "左辺−右辺が0を示す", "両辺が似ている"],
},
{
cells: ["両辺変形", "両辺を同じ式にする", "どちらも複雑"],
},
],
},
{
kind: "workedExample",
title: "例1：左辺を変形する",
body: "$(a+b)^2-(a-b)^2=4ab$ を証明します。\n\n左辺を展開します。\n\n$(a+b)^2-(a-b)^2$\n\n$=(a^2+2ab+b^2)-(a^2-2ab+b^2)$\n\n$=a^2+2ab+b^2-a^2+2ab-b^2$\n\n$=4ab$\n\nこれは右辺と一致します。\n\nしたがって、等式は成り立ちます。",
},
{
kind: "workedExample",
title: "例2：差を取って証明する",
body: "$a^2+b^2\geq2ab$ の等号部分に関係する式として、$a^2-2ab+b^2=(a-b)^2$ を確認します。\n\n左辺を因数分解すると、\n\n$a^2-2ab+b^2=(a-b)^2$\n\nです。\n\nこれは恒等式です。\n\nこのように、差を取ると平方の形が出ることが多く、等式や不等式の証明でよく使います。",
},
{
kind: "strategy",
title: "等式証明の答案の書き方",
body: "等式証明では、いきなり結論を書くのではなく、どちらの辺を変形しているかを明確にします。\n\n例えば、\n\n左辺 $= ... = ... = 右辺$\n\nのように書くと、流れが分かりやすくなります。\n\n差を取る場合は、\n\n左辺 $-$ 右辺 $= ... =0$\n\nしたがって左辺 $=$ 右辺、という形にします。\n\n証明は、計算結果だけでなく、論理の流れが大切です。",
},
{
kind: "commonMistake",
title: "よくあるミス：証明したい式を途中で仮定する",
body: "等式を証明するとき、証明したい等式そのものを前提にして変形してはいけません。\n\n例えば、左辺 $=$ 右辺であることをまだ示していないのに、両辺を勝手に同じものとして扱うのは危険です。\n\n安全なのは、左辺だけを変形して右辺に到達する方法、または左辺−右辺を計算して0を示す方法です。",
},
{
kind: "summary",
title: "まとめ",
body: "- 等式証明は両辺が同じであることを示す\n- 左辺変形・右辺変形・差を取る方法がある\n- 左辺だけを変形して右辺に到達すると安全\n- 差を取る場合は左辺−右辺が0を示す\n- 証明したい式を途中で仮定しない\n- 答案では変形の流れを明確に書く",
},
],
checkQuestions: [
{
question: "$(x+1)^2-(x-1)^2=4x$ を証明せよ。",
answer: "左辺を展開すると、$x^2+2x+1-(x^2-2x+1)=4x$。よって成り立つ。",
hint: "左辺を展開する。",
},
{
question: "等式証明で左辺−右辺を計算する場合、最後に何を示せばよいか。",
answer: "左辺−右辺が $0$ になること。",
hint: "差が0なら両辺は等しい。",
},
{
question: "等式証明で避けるべきことを1つ答えよ。",
answer: "証明したい等式を途中で仮定してしまうこと。",
hint: "まだ示していないことを使わない。",
},
],
relatedPracticeLinks: [
{ label: "等式証明 演習", href: "/units/expression-proof" },
{ label: "恒等式", href: "/courses/math-2bc/expression-proof/identity-basic" },
],
qualityTags: ["等式証明", "式変形", "答案作成", "確認問題3問"],
},
{
lessonId: "inequality-proof-basic",
lessonTitle: "不等式の証明",
lessonDescription: "差を取る・平方の形にする・相加相乗平均を使うなど、不等式証明の基本方針を学ぶ。",
level: "standard",
estimatedMinutes: 85,
prerequisites: ["等式の証明", "因数分解", "平方完成"],
goals: [
"不等式証明の基本方針を説明できる",
"左辺−右辺を平方の形にできる",
"平方が0以上であることを使える",
"相加相乗平均の不等式を使える",
"等号成立条件を確認できる",
],
lessonBlocks: [
{
kind: "intro",
title: "不等式証明は差を0以上にする",
body: "不等式を証明するときの基本は、左辺と右辺の差を調べることです。\n\n例えば、左辺 $\geq$ 右辺を示したいなら、\n\n左辺 $-$ 右辺 $\geq0$\n\nを示せばよいです。\n\nそのために、差を平方の形や積の形に変形します。\n\n平方は常に0以上なので、不等式の証明で非常によく使います。",
},
{
kind: "formula",
title: "平方は0以上",
body: "任意の実数 $x$ について、平方は必ず0以上です。",
formula: "x^2\geq0",
},
{
kind: "workedExample",
title: "例1：基本不等式を証明する",
body: "任意の実数 $a,b$ について、$a^2+b^2\geq2ab$ を証明します。\n\n左辺から右辺を引きます。\n\n$a^2+b^2-2ab=(a-b)^2$\n\nです。\n\n平方は常に0以上なので、\n\n$(a-b)^2\geq0$\n\nです。\n\nしたがって、$a^2+b^2\geq2ab$ が成り立ちます。\n\n等号は、$a=b$ のときに成り立ちます。",
},
{
kind: "concept",
title: "等号成立条件",
body: "不等式の証明では、等号がいつ成り立つかも重要です。\n\n平方を使った証明では、平方が0になるときに等号が成り立ちます。\n\n例えば、$(a-b)^2\geq0$ では、等号が成り立つのは $a-b=0$、つまり $a=b$ のときです。\n\n入試問題では、証明だけでなく等号成立条件まで求めることがよくあります。",
},
{
kind: "formula",
title: "相加相乗平均の不等式",
body: "$a\geq0$、$b\geq0$ のとき、次の不等式が成り立ちます。",
formula: "\frac{a+b}{2}\geq\sqrt{ab}",
},
{
kind: "workedExample",
title: "例2：相加相乗平均を使う",
body: "$x>0$ のとき、$x+\frac{1}{x}\geq2$ を証明します。\n\n$x>0$ なので、$x$ と $\frac{1}{x}$ はどちらも正です。\n\n相加相乗平均より、\n\n$\frac{x+\frac{1}{x}}{2}\geq\sqrt{x\cdot\frac{1}{x}}$\n\nです。\n\n右辺は $\sqrt{1}=1$ なので、\n\n$\frac{x+\frac{1}{x}}{2}\geq1$\n\nしたがって、\n\n$x+\frac{1}{x}\geq2$\n\nです。\n\n等号は、$x=\frac{1}{x}$、つまり $x=1$ のときです。",
},
{
kind: "comparisonTable",
title: "不等式証明の方針",
body: "式の形を見て、使う方法を選びます。",
columns: ["方針", "使う場面", "狙い"],
rows: [
{
cells: ["差を取る", "両辺を比較したい", "0以上を示す"],
highlight: true,
},
{
cells: ["平方にする", "2乗の形が見える", "平方は0以上"],
},
{
cells: ["相加相乗平均", "正の数の和と積", "最小値も分かる"],
},
{
cells: ["因数分解", "積の符号を見たい", "符号判定"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：相加相乗平均を負の数に使う",
body: "相加相乗平均の不等式は、基本的に非負の数に対して使います。\n\n$a\geq0$、$b\geq0$ であることを確認せずに使うと誤りになります。\n\n例えば、$x$ が正であることが分かっているから、$x$ と $\frac{1}{x}$ に使えます。\n\n不等式の道具を使う前に、条件を必ず確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 不等式証明では左辺−右辺を調べる\n- 左辺−右辺が0以上なら左辺は右辺以上\n- 平方は常に0以上\n- 等号成立条件も確認する\n- 相加相乗平均は非負の数に使う\n- 方針は式の形と条件で選ぶ",
},
],
checkQuestions: [
{
question: "$a^2+4\geq4a$ を証明せよ。",
answer: "左辺−右辺は $a^2-4a+4=(a-2)^2\geq0$。よって成り立つ。",
hint: "平方完成する。",
},
{
question: "$x>0$ のとき、$x+\frac{4}{x}\geq4$ を相加相乗平均で示せ。",
answer: "$\frac{x+\frac{4}{x}}{2}\geq\sqrt{x\cdot\frac{4}{x}}=2$ より、$x+\frac{4}{x}\geq4$。",
hint: "2つの正の数に相加相乗平均を使う。",
},
{
question: "$a^2+b^2\geq2ab$ の等号成立条件を答えよ。",
answer: "$a=b$。",
hint: "$(a-b)^2=0$。",
},
],
relatedPracticeLinks: [
{ label: "不等式証明 演習", href: "/units/expression-proof" },
{ label: "数と式 不等式", href: "/courses/math-1a/numbers-and-expressions/inequality-strategy-basic" },
],
qualityTags: ["不等式証明", "平方", "相加相乗平均", "確認問題3問"],
},
];

const EXPRESSION_PROOF_ADVANCED: CourseLesson[] = [
{
lessonId: "identity-undetermined-coefficients",
lessonTitle: "未定係数法と恒等式",
lessonDescription: "恒等式の係数比較・代入法を使い分け、複雑な未定係数を決定する。",
level: "advanced",
estimatedMinutes: 90,
prerequisites: ["恒等式とは何か", "分数式", "整式の割り算"],
goals: [
"未定係数法の考え方を説明できる",
"係数比較で複数の未知数を求められる",
"代入法で計算を短縮できる",
"部分分数分解の係数を求められる",
"入試標準レベルの恒等式問題に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "未定係数法は形を決めて係数を求める方法",
body: "未定係数法とは、式の形をあらかじめ決めておき、その中の未知の係数を求める方法です。\n\n恒等式を使うことで、係数比較や特別な値の代入ができます。\n\n例えば、ある整式を $A(x-1)+B$ の形で表したいとき、$A,B$ を未定係数として置きます。\n\nそして、恒等式として成り立つように $A,B$ を決めます。",
},
{
kind: "strategy",
title: "未定係数法の手順",
body: "未定係数法は、次の順番で進めます。\n\n1. 表したい形を決める\n2. 未知の係数を文字で置く\n3. 恒等式として展開する\n4. 係数比較または代入で係数を求める\n5. 元の式に戻して確認する\n\n複雑な式ほど、特別な値を代入する方法が有効です。",
},
{
kind: "workedExample",
title: "例1：係数比較で求める",
body: "$x^2+3x+2=A(x+1)+B(x+2)$ が恒等式となるような $A,B$ を求めます。\n\n右辺を展開します。\n\n$A(x+1)+B(x+2)=(A+B)x+(A+2B)$\n\nです。\n\nしかし左辺は二次式なので、この形では表せません。\n\nこのように、未定係数法では、まず置いた形が適切か確認する必要があります。\n\n二次式を表すには、例えば $Ax^2+Bx+C$ のような形が必要です。",
},
{
kind: "workedExample",
title: "例2：部分分数分解",
body: "$\frac{1}{x(x+1)}$ を $\frac{A}{x}+\frac{B}{x+1}$ の形に分解します。\n\n$\frac{1}{x(x+1)}=\frac{A}{x}+\frac{B}{x+1}$\n\nと置きます。\n\n両辺に $x(x+1)$ を掛けると、\n\n$1=A(x+1)+Bx$\n\nです。\n\n$x=0$ を代入すると、$1=A$ です。\n\n$x=-1$ を代入すると、$1=-B$ なので、$B=-1$ です。\n\nしたがって、\n\n$\frac{1}{x(x+1)}=\frac{1}{x}-\frac{1}{x+1}$\n\nです。",
},
{
kind: "workedExample",
title: "例3：係数比較と代入を組み合わせる",
body: "$2x+3=A(x-1)+B(x+2)$ が恒等式となるように $A,B$ を求めます。\n\n$x=1$ を代入すると、\n\n$2\cdot1+3=3B$\n\nなので、$B=\frac{5}{3}$ です。\n\n$x=-2$ を代入すると、\n\n$2(-2)+3=-3A$\n\nなので、$-1=-3A$、$A=\frac{1}{3}$ です。\n\nしたがって、$A=\frac{1}{3}$、$B=\frac{5}{3}$ です。",
},
{
kind: "commonMistake",
title: "よくあるミス：恒等式の形を確認しない",
body: "未定係数法では、最初に置く形が大切です。\n\n二次式を一次式の組み合わせだけで表そうとしても、一般には不可能です。\n\nまた、部分分数分解では、分母の因数に合わせて適切な形を置く必要があります。\n\n係数を求める前に、置いた形で本当に表せるかを確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 未定係数法は形を決めて係数を求める方法\n- 恒等式として係数比較や代入を使う\n- 特別な値を代入すると項が消えて計算が短い\n- 部分分数分解でも未定係数法を使う\n- 最初に置く形が適切か確認する\n- 分母条件や除外値にも注意する",
},
],
checkQuestions: [
{
question: "$\frac{1}{x(x-1)}=\frac{A}{x}+\frac{B}{x-1}$ とするとき、$A,B$ を求めよ。",
answer: "両辺に $x(x-1)$ を掛けて、$1=A(x-1)+Bx$。$x=0$ で $A=-1$、$x=1$ で $B=1$。",
hint: "分母を消して特別な値を代入する。",
},
{
question: "未定係数法で係数を求める代表的な方法を2つ答えよ。",
answer: "係数比較と特別な値の代入。",
hint: "恒等式として考える。",
},
{
question: "部分分数分解で最初に大切なことは何か。",
answer: "分母の因数に合わせて適切な形を置くこと。",
hint: "置く形がずれると係数が求まらない。",
},
],
relatedPracticeLinks: [
{ label: "未定係数法 演習", href: "/units/expression-proof" },
{ label: "数列の部分分数", href: "/courses/math-2bc/sequences/sequence-sum-advanced" },
],
qualityTags: ["旧帝大準備", "未定係数法", "恒等式", "部分分数", "確認問題3問"],
},
{
lessonId: "advanced-inequality-proof",
lessonTitle: "不等式証明の発展",
lessonDescription: "平方和・相加相乗平均・置き換えを使い、発展的な不等式を証明する。",
level: "advanced",
estimatedMinutes: 95,
prerequisites: ["不等式の証明", "平方完成", "相加相乗平均"],
goals: [
"発展的な不等式証明の方針を選べる",
"平方和の形を作れる",
"条件付き不等式を処理できる",
"相加相乗平均の等号成立条件を扱える",
"難関大入口レベルの証明問題に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "発展不等式は形を作る",
body: "発展的な不等式証明では、ただ展開するだけではなく、0以上と分かる形を作ることが重要です。\n\n代表的なのは、平方和の形です。\n\n例えば、$(a-b)^2+(b-c)^2+(c-a)^2\geq0$ のような形が作れれば、不等式を証明できます。\n\nまた、正の数に対しては相加相乗平均が強力です。\n\n条件を見て、平方にするのか、相加相乗平均を使うのか、置き換えるのかを判断します。",
},
{
kind: "workedExample",
title: "例1：平方和で証明する",
body: "任意の実数 $a,b,c$ について、$a^2+b^2+c^2\geq ab+bc+ca$ を証明します。\n\n左辺から右辺を引きます。\n\n$a^2+b^2+c^2-ab-bc-ca$\n\nこれを2倍して考えると、\n\n$2(a^2+b^2+c^2-ab-bc-ca)$\n\n$=(a-b)^2+(b-c)^2+(c-a)^2$\n\nです。\n\n平方の和は0以上なので、\n\n$(a-b)^2+(b-c)^2+(c-a)^2\geq0$\n\nです。\n\nしたがって、$a^2+b^2+c^2\geq ab+bc+ca$ が成り立ちます。\n\n等号は $a=b=c$ のときです。",
},
{
kind: "workedExample",
title: "例2：条件付き不等式",
body: "$a+b=1$ のとき、$a^2+b^2\geq\frac{1}{2}$ を証明します。\n\n条件 $a+b=1$ を使います。\n\n$a^2+b^2$ は、\n\n$(a+b)^2-2ab=1-2ab$\n\nです。\n\nまた、$0\leq(a-b)^2$ より、\n\n$a^2+b^2\geq2ab$\n\nです。\n\nここで、$(a+b)^2=a^2+2ab+b^2\geq4ab$ なので、$1\geq4ab$、つまり $ab\leq\frac{1}{4}$ です。\n\nしたがって、\n\n$a^2+b^2=1-2ab\geq1-\frac{1}{2}=\frac{1}{2}$\n\nです。\n\n等号は $a=b=\frac{1}{2}$ のときです。",
},
{
kind: "workedExample",
title: "例3：相加相乗平均の発展",
body: "$x>0$、$y>0$ のとき、$\frac{x}{y}+\frac{y}{x}\geq2$ を証明します。\n\n$\frac{x}{y}>0$、$\frac{y}{x}>0$ なので、相加相乗平均を使えます。\n\n$\frac{\frac{x}{y}+\frac{y}{x}}{2}\geq\sqrt{\frac{x}{y}\cdot\frac{y}{x}}$\n\n右辺は $\sqrt{1}=1$ です。\n\nしたがって、\n\n$\frac{x}{y}+\frac{y}{x}\geq2$\n\nです。\n\n等号は $\frac{x}{y}=\frac{y}{x}$、つまり $x=y$ のときです。",
},
{
kind: "strategy",
title: "発展不等式の確認リスト",
body: "不等式証明では、次の順番で方針を探します。\n\n1. 左辺−右辺を取れるか\n2. 平方完成できるか\n3. 平方和の形にできるか\n4. 正の数があるなら相加相乗平均を使えるか\n5. 条件式を代入できるか\n6. 等号成立条件を確認できるか\n\n証明では、最後に等号成立条件まで確認すると答案の完成度が上がります。",
},
{
kind: "commonMistake",
title: "よくあるミス：等号成立条件を確認しない",
body: "不等式証明では、不等式が成り立つことだけでなく、等号がいつ成り立つかを聞かれることが多いです。\n\n平方を使ったなら、その平方が0になる条件を確認します。\n\n相加相乗平均を使ったなら、比較した2つの数が等しい条件を確認します。\n\n等号成立条件は、証明の最後に必ずチェックしましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 発展不等式では0以上と分かる形を作る\n- 平方和の形は強力\n- 条件式は積極的に使う\n- 正の数には相加相乗平均が使える\n- 証明の最後に等号成立条件を確認する\n- 方針は式の形と条件から選ぶ",
},
],
checkQuestions: [
{
question: "$a^2+b^2\geq2ab$ の等号成立条件を答えよ。",
answer: "$a=b$。",
hint: "$(a-b)^2=0$。",
},
{
question: "$x>0$ のとき、$x+\frac{9}{x}\geq6$ を示せ。",
answer: "相加相乗平均より、$\frac{x+\frac{9}{x}}{2}\geq\sqrt{9}=3$。よって $x+\frac{9}{x}\geq6$。",
hint: "$x$ と $9/x$ は正。",
},
{
question: "$a^2+b^2+c^2\geq ab+bc+ca$ の等号成立条件を答えよ。",
answer: "$a=b=c$。",
hint: "$(a-b)^2+(b-c)^2+(c-a)^2=0$ になる条件。",
},
],
relatedPracticeLinks: [
{ label: "不等式証明 発展演習", href: "/units/expression-proof" },
{ label: "数と式 不等式", href: "/courses/math-1a/numbers-and-expressions/inequality-strategy-basic" },
],
qualityTags: ["旧帝大準備", "不等式証明", "平方和", "相加相乗平均", "確認問題3問"],
},
{
lessonId: "expression-proof-exam-standard",
lessonTitle: "式と証明の融合問題",
lessonDescription: "恒等式・二項定理・分数式・等式証明・不等式証明を組み合わせた実戦問題を切り崩す。",
level: "advanced",
estimatedMinutes: 100,
prerequisites: ["二項定理", "未定係数法と恒等式", "不等式証明の発展"],
goals: [
"式と証明の問題で使う道具を選択できる",
"恒等式と方程式を区別できる",
"二項定理で係数を求められる",
"等式・不等式証明の方針を立てられる",
"難関大入口レベルの証明問題で初手を決められる",
],
lessonBlocks: [
{
kind: "intro",
title: "式と証明は道具選びの単元",
body: "式と証明の融合問題では、展開・因数分解・恒等式・二項定理・分数式・不等式証明が組み合わさります。\n\n問題文を見たら、まず何を求める問題なのかを判断します。\n\n係数を求めるなら係数比較や二項定理。\n\n等式を証明するなら左辺変形や差を取る方法。\n\n不等式を証明するなら平方の形や相加相乗平均。\n\nこのように、目的に合わせて道具を選ぶことが重要です。",
},
{
kind: "strategy",
title: "融合問題の確認リスト",
body: "式と証明の実戦問題では、次の順番で確認します。\n\n1. 恒等式か方程式かを区別する\n2. 係数を求めるなら係数比較か代入を使う\n3. 高い累乗の展開なら二項定理を使う\n4. 分数式なら因数分解・通分・分母条件を見る\n5. 等式証明なら左辺変形または差を取る\n6. 不等式証明なら0以上の形を作る\n7. 等号成立条件を確認する\n\n計算を始める前に、証明のゴールを明確にします。",
},
{
kind: "workedExample",
title: "例1：二項定理で係数を求める",
body: "$(2x-1)^5$ における $x^3$ の係数を求めます。\n\n一般項は、\n\n${}_5C_k(2x)^{5-k}(-1)^k$\n\nです。\n\n$x^3$ の項が欲しいので、$5-k=3$ です。\n\nしたがって、$k=2$ です。\n\n係数は、\n\n${}_5C_2\cdot2^3\cdot(-1)^2=10\cdot8\cdot1=80$\n\nです。\n\nよって、$x^3$ の係数は $80$ です。",
},
{
kind: "workedExample",
title: "例2：恒等式と代入",
body: "$\frac{2x+1}{x(x+1)}=\frac{A}{x}+\frac{B}{x+1}$ とします。\n\n両辺に $x(x+1)$ を掛けます。\n\n$2x+1=A(x+1)+Bx$\n\nです。\n\n$x=0$ を代入すると、$1=A$ です。\n\n$x=-1$ を代入すると、$-1=-B$ なので、$B=1$ です。\n\nしたがって、\n\n$\frac{2x+1}{x(x+1)}=\frac{1}{x}+\frac{1}{x+1}$\n\nです。",
},
{
kind: "workedExample",
title: "例3：不等式証明",
body: "任意の実数 $a,b$ について、$a^2+b^2+1\geq2a$ を証明します。\n\n左辺から右辺を引きます。\n\n$a^2+b^2+1-2a$\n\n$=(a^2-2a+1)+b^2$\n\n$=(a-1)^2+b^2$\n\nです。\n\n平方の和は0以上なので、\n\n$(a-1)^2+b^2\geq0$\n\nです。\n\nしたがって、$a^2+b^2+1\geq2a$ が成り立ちます。\n\n等号は $a=1$、$b=0$ のときです。",
},
{
kind: "comparisonTable",
title: "実戦で使う判断",
body: "問題の形から、使う道具を選びます。",
columns: ["問題の特徴", "使う道具", "目的"],
rows: [
{
cells: ["すべてのxで成り立つ", "恒等式・係数比較", "未定係数を求める"],
highlight: true,
},
{
cells: ["高い累乗の係数", "二項定理", "特定の項を求める"],
},
{
cells: ["分数式", "因数分解・通分", "簡単な形にする"],
},
{
cells: ["等式証明", "左辺変形・差を取る", "両辺一致を示す"],
},
{
cells: ["不等式証明", "平方・相加相乗平均", "0以上を示す"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：目的を決めずに展開する",
body: "式と証明では、何でも展開すればよいわけではありません。\n\n係数を求めたいなら二項定理の一般項を見る方が速いことがあります。\n\n不等式を証明したいなら、展開より平方の形を作る方がよいことがあります。\n\n分数式なら、展開より因数分解して約分する方が自然です。\n\n計算の前に、何を示したいのかを決めましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 式と証明の融合問題は道具選びが重要\n- 恒等式では係数比較や代入を使う\n- 二項定理では特定の項の係数を求められる\n- 分数式では分母条件を忘れない\n- 等式証明では左辺変形や差を取る\n- 不等式証明では0以上の形を作る\n- 等号成立条件まで確認すると答案が強くなる",
},
],
checkQuestions: [
{
question: "$(x+2)^6$ における $x^4$ の係数を求めよ。",
answer: "一般項は ${}_6C_k x^{6-k}2^k$。$6-k=4$ より $k=2$。係数は ${}_6C_2\cdot2^2=15\cdot4=60$。",
hint: "$x$ の指数から $k$ を決める。",
},
{
question: "$a^2+b^2\geq2ab$ を証明するとき、左辺−右辺は何になるか。",
answer: "$(a-b)^2$。",
hint: "平方の形にする。",
},
{
question: "恒等式で未定係数を求める代表的な方法を2つ答えよ。",
answer: "係数比較と特別な値の代入。",
hint: "すべての値で成り立つことを使う。",
},
],
relatedPracticeLinks: [
{ label: "式と証明 実戦演習", href: "/units/expression-proof" },
{ label: "過去問道場", href: "/dojo" },
{ label: "数と式 式変形", href: "/courses/math-1a/numbers-and-expressions/expression-transformation-strategy" },
],
qualityTags: ["旧帝大準備", "式と証明", "二項定理", "不等式証明", "融合問題"],
},
];

export const EXPRESSION_PROOF_UNIT: CourseUnit = {
unitId: "expression-proof",
subjectId: "math-2bc",
unitTitle: "式と証明",
unitDescription:
"三次式の展開・因数分解、恒等式、分数式、二項定理、等式証明、不等式証明、未定係数法まで体系的に学ぶ単元です。",
lessons: [
...EXPRESSION_PROOF_BEGINNER,
...EXPRESSION_PROOF_STANDARD,
...EXPRESSION_PROOF_ADVANCED,
],
};

