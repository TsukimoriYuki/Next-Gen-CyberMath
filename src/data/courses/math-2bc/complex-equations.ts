import type { CourseLesson, CourseUnit } from "@/types/course";

const COMPLEX_EQUATIONS_BEGINNER: CourseLesson[] = [
{
lessonId: "complex-numbers-basic",
lessonTitle: "複素数とは何か",
lessonDescription: "実数では解けない方程式を扱うために、虚数単位と複素数の基本を理解する。",
level: "beginner",
estimatedMinutes: 60,
prerequisites: ["平方根", "二次方程式", "文字式の計算"],
goals: [
"虚数単位 $i$ の意味を説明できる",
"複素数の形 $a+bi$ を理解できる",
"実部と虚部を区別できる",
"複素数の加法・減法・乗法を計算できる",
"$i^2=-1$ を使って式を整理できる",
],
lessonBlocks: [
{
kind: "intro",
title: "実数だけでは解けない方程式がある",
body: "実数の範囲では、$x^2+1=0$ は解をもちません。\n\nなぜなら、実数の2乗は必ず $0$ 以上になり、$x^2=-1$ となる実数は存在しないからです。\n\nそこで、$i^2=-1$ を満たす新しい数 $i$ を考えます。\n\nこの $i$ を虚数単位といいます。\n\n虚数単位を導入すると、これまで解けなかった方程式も解けるようになります。",
},
{
kind: "formula",
title: "虚数単位",
body: "虚数単位 $i$ は、2乗すると $-1$ になる数として定義されます。",
formula: "i^2=-1",
},
{
kind: "concept",
title: "複素数の形",
body: "複素数は、$a+bi$ の形で表される数です。\n\nここで、$a$ と $b$ は実数です。\n\n$a$ を実部、$b$ を虚部といいます。\n\n例えば、$3+2i$ の実部は $3$、虚部は $2$ です。\n\n$-1+5i$ の実部は $-1$、虚部は $5$ です。\n\n虚部は $bi$ 全体ではなく、$i$ の係数 $b$ であることに注意しましょう。",
},
{
kind: "comparisonTable",
title: "複素数の用語",
body: "複素数では、実部と虚部を分けて見ます。",
columns: ["複素数", "実部", "虚部"],
rows: [
{
cells: ["$3+2i$", "$3$", "$2$"],
highlight: true,
},
{
cells: ["$-4+i$", "$-4$", "$1$"],
},
{
cells: ["$7$", "$7$", "$0$"],
},
{
cells: ["$-5i$", "$0$", "$-5$"],
},
],
},
{
kind: "workedExample",
title: "例1：複素数の加法・減法",
body: "$(3+2i)+(1-5i)$ を計算します。\n\n実部どうし、虚部どうしを足します。\n\n$(3+2i)+(1-5i)=(3+1)+(2-5)i$\n\n$=4-3i$\n\nです。\n\n次に、$(3+2i)-(1-5i)$ は、\n\n$(3-1)+(2-(-5))i=2+7i$\n\nです。\n\n複素数の加法・減法は、実部と虚部を分けて計算します。",
},
{
kind: "workedExample",
title: "例2：複素数の乗法",
body: "$(2+3i)(1-i)$ を計算します。\n\n普通の式の展開と同じように計算します。\n\n$(2+3i)(1-i)=2-2i+3i-3i^2$\n\n$=2+i-3i^2$\n\nここで、$i^2=-1$ なので、\n\n$-3i^2=-3(-1)=3$\n\nです。\n\nしたがって、\n\n$(2+3i)(1-i)=5+i$\n\nです。",
},
{
kind: "concept",
title: "iの累乗",
body: "$i$ の累乗は、4つごとに同じ形を繰り返します。\n\n$i^1=i$\n\n$i^2=-1$\n\n$i^3=i^2\\cdot i=-i$\n\n$i^4=(i^2)^2=1$\n\nです。\n\nその後は、$i^5=i$、$i^6=-1$ のように繰り返します。\n\n大きな累乗は、指数を4で割った余りで考えると整理できます。",
},
{
kind: "commonMistake",
title: "よくあるミス：虚部をbi全体だと思う",
body: "複素数 $a+bi$ の虚部は $b$ です。\n\n$bi$ 全体ではありません。\n\n例えば、$4-7i$ の虚部は $-7$ です。\n\nまた、実数 $5$ は $5+0i$ と見られるので、虚部は $0$ です。\n\n実部と虚部を聞かれたときは、$a+bi$ の形にそろえて判断しましょう。",
},
{
kind: "concept",
title: "複素数の絶対値",
body: "複素数 $z=a+bi$ の絶対値（複素数としての大きさ）は次のように定義されます。\n\n$|a+bi|=\\sqrt{a^2+b^2}$\n\nこれは、複素数を複素平面上の点と見たとき、原点からの距離に対応します。\n\n実数 $a$ のとき（$b=0$）、$|a|=\\sqrt{a^2}$ となり、通常の絶対値と一致します。\n\n重要な性質：積の絶対値は絶対値の積になります。\n\n$|z_1 z_2|=|z_1||z_2|$\n\n確認：$z_1=1+i$、$z_2=1+i$ とすると、$z_1 z_2=(1+i)^2=2i$。\n\n$|z_1|=\\sqrt{2}$、$|z_2|=\\sqrt{2}$ なので $|z_1||z_2|=2$。\n\n$|z_1 z_2|=|2i|=\\sqrt{0^2+2^2}=2$ となり一致します。\n\nこの性質は、方程式の解の大きさを求める問題や、複素数の積を計算するときに使います。",
},
{
kind: "summary",
title: "まとめ",
body: "- 虚数単位 $i$ は $i^2=-1$ を満たす\n- 複素数は $a+bi$ の形で表す\n- $a$ が実部、$b$ が虚部\n- 加法・減法は実部どうし、虚部どうしを計算する\n- 乗法は展開して $i^2=-1$ を使う\n- $i$ の累乗は4周期で繰り返す\n- 絶対値は $|a+bi|=\\sqrt{a^2+b^2}$",
},
],
checkQuestions: [
{
question: "$(2+5i)+(3-2i)$ を計算せよ。",
answer: "$(2+3)+(5-2)i=5+3i$。",
hint: "実部どうし、虚部どうしを足す。",
},
{
question: "$(1+2i)(3-i)$ を計算せよ。",
answer: "$3-i+6i-2i^2=3+5i+2=5+5i$。",
hint: "$i^2=-1$ を使う。",
},
{
question: "$i^6$ を求めよ。",
answer: "$i^6=i^4\\cdot i^2=1\\cdot(-1)=-1$。",
hint: "$i^4=1$。",
},
],
relatedPracticeLinks: [
{ label: "複素数 基礎演習", href: "/units/complex-equations", description: "複素数の計算" },
{ label: "数と式 講座", href: "/courses/math-1a/numbers-and-expressions", description: "式計算の復習" },
],
qualityTags: ["複素数", "虚数単位", "実部", "虚部", "確認問題3問"],
},
{
lessonId: "quadratic-equations-complex",
lessonTitle: "二次方程式と複素数解",
lessonDescription: "判別式が負の場合も、複素数の範囲で二次方程式を解けるようにする。",
level: "beginner",
estimatedMinutes: 70,
prerequisites: ["複素数とは何か", "二次方程式", "平方根"],
goals: [
"複素数の範囲では二次方程式が常に解をもつことを理解できる",
"判別式が負の場合の解を求められる",
"解の公式を複素数まで拡張して使える",
"共役な複素数解の形を理解できる",
"判別式と解の種類を対応づけられる",
],
lessonBlocks: [
{
kind: "intro",
title: "判別式が負でも解ける",
body: "実数の範囲では、判別式が負の二次方程式は解なしでした。\n\nしかし、複素数を使えば、判別式が負でも解を求められます。\n\n例えば、$x^2+1=0$ は実数解をもちませんが、複素数の範囲では $x=\\pm i$ が解です。\n\n数学IIでは、二次方程式を複素数の範囲まで広げて考えます。",
},
{
kind: "formula",
title: "二次方程式の解の公式",
body: "$ax^2+bx+c=0$ の解は、複素数の範囲でも次の公式で表されます。",
formula: "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
},
{
kind: "concept",
title: "判別式と解の種類",
body: "判別式 $D=b^2-4ac$ によって、二次方程式の解の種類が分かります。\n\n$D>0$ なら、異なる2つの実数解をもちます。\n\n$D=0$ なら、重解をもちます。\n\n$D<0$ なら、実数解はありませんが、異なる2つの複素数解をもちます。\n\n複素数の範囲では、二次方程式は常に2つの解をもつと考えられます。重解の場合は同じ解を2回数えます。",
},
{
kind: "comparisonTable",
title: "判別式と解の種類",
body: "実数解だけでなく、複素数解まで含めて整理します。",
columns: ["判別式", "実数範囲", "複素数範囲"],
rows: [
{
cells: ["$D>0$", "異なる2実数解", "異なる2実数解"],
highlight: true,
},
{
cells: ["$D=0$", "重解", "重解"],
},
{
cells: ["$D<0$", "実数解なし", "異なる2複素数解"],
},
],
},
{
kind: "workedExample",
title: "例1：複素数解を求める",
body: "$x^2+4x+5=0$ を解きます。\n\n解の公式を使います。\n\n$a=1$、$b=4$、$c=5$ なので、\n\n$D=4^2-4\\cdot1\\cdot5=16-20=-4$\n\nです。\n\nしたがって、\n\n$x=\\frac{-4\\pm\\sqrt{-4}}{2}$\n\n$=\\frac{-4\\pm2i}{2}$\n\n$=-2\\pm i$\n\nです。",
},
{
kind: "workedExample",
title: "例2：平方完成で解く",
body: "$x^2-2x+5=0$ を平方完成で解きます。\n\n左辺を平方完成します。\n\n$x^2-2x+5=(x-1)^2+4$\n\nなので、\n\n$(x-1)^2+4=0$\n\n$(x-1)^2=-4$\n\nです。\n\nしたがって、\n\n$x-1=\\pm2i$\n\nより、\n\n$x=1\\pm2i$\n\nです。\n\n判別式だけでなく、平方完成でも複素数解を求められます。",
},
{
kind: "concept",
title: "共役な複素数解",
body: "実数係数の二次方程式で、複素数解が出る場合、その2つの解は共役な形になります。\n\n例えば、$-2+i$ と $-2-i$ のような組です。\n\n$a+bi$ に対して、$a-bi$ を共役な複素数といいます。\n\n実数係数の二次方程式で虚数解が出るときは、必ず $a+bi$ と $a-bi$ のペアになります。",
},
{
kind: "commonMistake",
title: "よくあるミス：√-4を-2としてしまう",
body: "$\\sqrt{-4}$ を $-2$ としてはいけません。\n\n負の数の平方根は、虚数単位 $i$ を使って表します。\n\n$\\sqrt{-4}=2i$\n\nです。\n\n一般に、$\\sqrt{-a}=\\sqrt{a}i$ と考えます。ただし $a>0$ です。\n\n判別式が負のときは、必ず $i$ を使って整理しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 複素数の範囲では二次方程式は解をもつ\n- 解の公式は複素数でも使える\n- 判別式 $D<0$ なら異なる2つの複素数解\n- 負の平方根は $i$ を使って表す\n- 実数係数の方程式の虚数解は共役なペアになる\n- 平方完成でも複素数解を求められる",
},
],
checkQuestions: [
{
question: "$x^2+2x+5=0$ を解け。",
answer: "$D=4-20=-16$ より、$x=\\frac{-2\\pm4i}{2}=-1\\pm2i$。",
hint: "解の公式を使う。",
},
{
question: "$x^2+9=0$ を解け。",
answer: "$x^2=-9$ より、$x=\\pm3i$。",
hint: "$\\sqrt{-9}=3i$。",
},
{
question: "実数係数の二次方程式で $2+3i$ が解なら、もう一つの解は何か。",
answer: "$2-3i$。",
hint: "共役な複素数解がペアで出る。",
},
],
relatedPracticeLinks: [
{ label: "二次方程式 複素数解演習", href: "/units/complex-equations" },
{ label: "二次関数 判別式", href: "/courses/math-1a/quadratic" },
],
qualityTags: ["二次方程式", "複素数解", "判別式", "確認問題3問"],
},
{
lessonId: "roots-and-coefficients-basic",
lessonTitle: "解と係数の関係",
lessonDescription: "二次方程式の2つの解の和と積を、係数から読み取れるようにする。",
level: "beginner",
estimatedMinutes: 65,
prerequisites: ["二次方程式と複素数解", "因数分解", "式の展開"],
goals: [
"二次方程式の解と係数の関係を使える",
"2つの解の和と積を係数から求められる",
"解から二次方程式を作れる",
"対称式を解と係数の関係で処理できる",
"高次方程式への接続を理解できる",
],
lessonBlocks: [
{
kind: "intro",
title: "解を直接求めなくても和と積は分かる",
body: "二次方程式では、解を直接求めなくても、2つの解の和と積を係数から読み取れます。\n\nこれを解と係数の関係といいます。\n\n例えば、$x^2-5x+6=0$ の解は $2$ と $3$ です。\n\n解の和は $5$、積は $6$ です。\n\nこの値は、方程式の係数から直接分かります。\n\n解と係数の関係は、方程式の問題で非常によく使います。",
},
{
kind: "formula",
title: "解と係数の関係",
body: "二次方程式 $ax^2+bx+c=0$ の2つの解を $\\alpha,\\beta$ とすると、次の関係が成り立ちます。",
formula: "\\alpha+\\beta=-\\frac{b}{a},\\quad \\alpha\\beta=\\frac{c}{a}",
},
{
kind: "workedExample",
title: "例1：解の和と積を求める",
body: "$2x^2-3x+5=0$ の2つの解を $\\alpha,\\beta$ とします。\n\n解と係数の関係より、\n\n$\\alpha+\\beta=-\\frac{-3}{2}=\\frac{3}{2}$\n\nです。\n\nまた、\n\n$\\alpha\\beta=\\frac{5}{2}$\n\nです。\n\n解そのものを求めなくても、和と積は分かります。",
},
{
kind: "concept",
title: "なぜ成り立つのか",
body: "二次方程式の解が $\\alpha,\\beta$ であるとき、方程式は\n\n$a(x-\\alpha)(x-\\beta)=0$\n\nの形にできます。\n\n展開すると、\n\n$a\{x^2-(\\alpha+\\beta)x+\\alpha\\beta\}=0$\n\nつまり、\n\n$ax^2-a(\\alpha+\\beta)x+a\\alpha\\beta=0$\n\nです。\n\nこれを $ax^2+bx+c=0$ と比べると、\n\n$-a(\\alpha+\\beta)=b$、$a\\alpha\\beta=c$\n\nとなり、解と係数の関係が得られます。",
},
{
kind: "workedExample",
title: "例2：解から方程式を作る",
body: "2つの解が $3$ と $-2$ である二次方程式を1つ作ります。\n\n解が $3$ と $-2$ なので、\n\n$(x-3)(x+2)=0$\n\nとできます。\n\n展開すると、\n\n$x^2-x-6=0$\n\nです。\n\nまた、解の和は $1$、積は $-6$ なので、\n\n$x^2-(\\text{和})x+(\\text{積})=0$\n\nより、$x^2-x-6=0$ と作ることもできます。",
},
{
kind: "workedExample",
title: "例3：対称式を求める",
body: "$x^2-4x+1=0$ の2つの解を $\\alpha,\\beta$ とします。$\\alpha^2+\\beta^2$ を求めます。\n\n解と係数の関係より、\n\n$\\alpha+\\beta=4$、$\\alpha\\beta=1$\n\nです。\n\n$\\alpha^2+\\beta^2$ は、\n\n$(\\alpha+\\beta)^2-2\\alpha\\beta$\n\nで求められます。\n\nしたがって、\n\n$\\alpha^2+\\beta^2=4^2-2\\cdot1=14$\n\nです。",
},
{
kind: "commonMistake",
title: "よくあるミス：和の符号を間違える",
body: "$ax^2+bx+c=0$ の解の和は $-\\frac{b}{a}$ です。\n\n$\\frac{b}{a}$ ではありません。\n\n例えば、$x^2-5x+6=0$ の場合、$b=-5$ なので、解の和は $-(-5)=5$ です。\n\n和にはマイナスがつく、積にはマイナスがつかない。この違いを押さえましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 二次方程式の解の和と積は係数から分かる\n- 解の和は $-\\frac{b}{a}$\n- 解の積は $\\frac{c}{a}$\n- 解が分かれば $(x-\\alpha)(x-\\beta)=0$ から方程式を作れる\n- 対称式は和と積に変形して処理する\n- 和の符号ミスに注意する",
},
],
checkQuestions: [
{
question: "$3x^2+2x-7=0$ の2つの解を $\\alpha,\\beta$ とするとき、$\\alpha+\\beta$ と $\\alpha\\beta$ を求めよ。",
answer: "$\\alpha+\\beta=-\\frac{2}{3}$、$\\alpha\\beta=-\\frac{7}{3}$。",
hint: "和は $-b/a$、積は $c/a$。",
},
{
question: "2つの解が $1$ と $4$ である二次方程式を1つ作れ。",
answer: "$(x-1)(x-4)=0$ より、$x^2-5x+4=0$。",
hint: "解から因数を作る。",
},
{
question: "$x^2-3x+2=0$ の解を $\\alpha,\\beta$ とするとき、$\\alpha^2+\\beta^2$ を求めよ。",
answer: "$\\alpha+\\beta=3$、$\\alpha\\beta=2$ より、$\\alpha^2+\\beta^2=3^2-2\\cdot2=5$。",
hint: "$(\\alpha+\\beta)^2-2\\alpha\\beta$。",
},
],
relatedPracticeLinks: [
{ label: "解と係数 演習", href: "/units/complex-equations" },
{ label: "因数分解 復習", href: "/courses/math-1a/numbers-and-expressions" },
],
qualityTags: ["解と係数", "二次方程式", "対称式", "確認問題3問"],
},
];

const COMPLEX_EQUATIONS_STANDARD: CourseLesson[] = [
{
lessonId: "polynomial-division-factor-theorem",
lessonTitle: "整式の割り算と因数定理",
lessonDescription: "高次方程式を解く準備として、整式の割り算・剰余の定理・因数定理を理解する。",
level: "standard",
estimatedMinutes: 80,
prerequisites: ["整式の計算", "因数分解", "二次方程式"],
goals: [
"整式の割り算の意味を理解できる",
"剰余の定理を使える",
"因数定理を使って因数を見つけられる",
"高次式を因数分解できる",
"高次方程式に進む準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "高次方程式は因数分解して解く",
body: "三次方程式や四次方程式を解くとき、基本方針は因数分解です。\n\nそのために重要なのが、剰余の定理と因数定理です。\n\n因数定理を使うと、ある一次式が整式の因数であるかどうかを判定できます。\n\n高次方程式では、まず簡単な整数解を探し、それを使って因数分解することが多いです。",
},
{
kind: "concept",
title: "整式の割り算",
body: "整数の割り算で、割られる数、割る数、商、余りを考えたように、整式でも割り算ができます。\n\n整式 $P(x)$ を $x-a$ で割ると、\n\n$P(x)=(x-a)Q(x)+r$\n\nと表せます。\n\nここで、$Q(x)$ が商、$r$ が余りです。\n\n$x-a$ で割る場合、余りは定数になります。",
},
{
kind: "formula",
title: "剰余の定理",
body: "整式 $P(x)$ を $x-a$ で割った余りは、$P(a)$ です。",
formula: "P(x)\\text{ を }x-a\\text{ で割った余り}=P(a)",
},
{
kind: "workedExample",
title: "例1：剰余の定理",
body: "$P(x)=x^3-2x+5$ を $x-2$ で割った余りを求めます。\n\n剰余の定理より、余りは $P(2)$ です。\n\n$P(2)=2^3-2\\cdot2+5=8-4+5=9$\n\nです。\n\nしたがって、余りは $9$ です。\n\n実際に割り算をしなくても、代入だけで余りが求められます。",
},
{
kind: "formula",
title: "因数定理",
body: "整式 $P(x)$ について、$P(a)=0$ なら、$P(x)$ は $x-a$ を因数にもちます。",
formula: "P(a)=0 \Longleftrightarrow x-a\\text{ が }P(x)\\text{ の因数}",
},
{
kind: "workedExample",
title: "例2：因数定理で因数を見つける",
body: "$P(x)=x^3-6x^2+11x-6$ について、$x-1$ が因数か調べます。\n\n$P(1)=1-6+11-6=0$\n\nです。\n\nしたがって、因数定理より、$x-1$ は $P(x)$ の因数です。\n\n実際、\n\n$x^3-6x^2+11x-6=(x-1)(x^2-5x+6)$\n\nです。",
},
{
kind: "workedExample",
title: "例3：高次式を因数分解する",
body: "$x^3-6x^2+11x-6$ を因数分解します。\n\nまず、$x=1$ を代入すると0なので、$x-1$ が因数です。\n\n割り算すると、\n\n$x^3-6x^2+11x-6=(x-1)(x^2-5x+6)$\n\nです。\n\nさらに、\n\n$x^2-5x+6=(x-2)(x-3)$\n\nなので、\n\n$x^3-6x^2+11x-6=(x-1)(x-2)(x-3)$\n\nです。",
},
{
kind: "commonMistake",
title: "よくあるミス：x+aで割るときに代入する値を間違える",
body: "$x-a$ で割るときの余りは $P(a)$ です。\n\nでは、$x+2$ で割るときはどうでしょうか。\n\n$x+2=x-(-2)$ なので、代入するのは $-2$ です。\n\nつまり、余りは $P(-2)$ です。\n\n符号をそのまま読むとミスしやすいので、$x-a$ の形に直して考えましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 高次方程式では因数分解が重要\n- $P(x)$ を $x-a$ で割った余りは $P(a)$\n- $P(a)=0$ なら $x-a$ は因数\n- 因数定理で一次因数を見つける\n- 高次式は一次因数を見つけて次数を下げる\n- $x+a$ で割るときは $a$ ではなく $-a$ を代入する",
},
],
checkQuestions: [
{
question: "$P(x)=x^3+x+1$ を $x-1$ で割った余りを求めよ。",
answer: "$P(1)=1+1+1=3$。",
hint: "剰余の定理。",
},
{
question: "$P(x)=x^3-4x^2+x+6$ について、$x-2$ が因数か判定せよ。",
answer: "$P(2)=8-16+2+6=0$ なので、$x-2$ は因数。",
hint: "$P(2)$ を計算する。",
},
{
question: "$x+3$ で割った余りを求めるとき、何を代入すればよいか。",
answer: "$x+3=x-(-3)$ なので、$-3$ を代入する。",
hint: "$x-a$ の形で考える。",
},
],
relatedPracticeLinks: [
{ label: "因数定理 演習", href: "/units/complex-equations" },
{ label: "因数分解 復習", href: "/courses/math-1a/numbers-and-expressions" },
],
qualityTags: ["剰余の定理", "因数定理", "高次式", "確認問題3問"],
},
{
lessonId: "higher-degree-equations",
lessonTitle: "高次方程式",
lessonDescription: "因数定理と因数分解を使って、三次方程式・四次方程式を解く。",
level: "standard",
estimatedMinutes: 85,
prerequisites: ["整式の割り算と因数定理", "二次方程式と複素数解"],
goals: [
"高次方程式の基本方針を理解できる",
"整数解を探して因数定理を使える",
"三次方程式を因数分解して解ける",
"四次方程式を置き換えや因数分解で解ける",
"複素数解を含む高次方程式に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "高次方程式は次数を下げて解く",
body: "三次以上の方程式を高次方程式といいます。\n\n高次方程式を解く基本方針は、因数分解して次数を下げることです。\n\n例えば、三次方程式で一次因数を1つ見つけられれば、残りは二次方程式になります。\n\n二次方程式なら、解の公式や因数分解で解けます。\n\nつまり、高次方程式では、まず因数を見つけることが重要です。",
},
{
kind: "strategy",
title: "高次方程式の手順",
body: "高次方程式では、次の順番で考えます。\n\n1. 整数解の候補を試す\n2. 因数定理で一次因数を見つける\n3. 整式の割り算で次数を下げる\n4. 残った二次方程式を解く\n5. 必要なら複素数解まで求める\n\n整数解の候補は、定数項の約数から試すことが多いです。",
},
{
kind: "workedExample",
title: "例1：三次方程式を解く",
body: "$x^3-6x^2+11x-6=0$ を解きます。\n\nまず、$x=1$ を代入します。\n\n$1-6+11-6=0$\n\nなので、$x=1$ は解です。\n\nしたがって、$x-1$ が因数です。\n\n因数分解すると、\n\n$x^3-6x^2+11x-6=(x-1)(x^2-5x+6)$\n\nです。\n\nさらに、\n\n$x^2-5x+6=(x-2)(x-3)$\n\nなので、\n\n$(x-1)(x-2)(x-3)=0$\n\nです。\n\nしたがって、解は $x=1,2,3$ です。",
},
{
kind: "workedExample",
title: "例2：複素数解を含む三次方程式",
body: "$x^3-x^2+x-1=0$ を解きます。\n\nまず、$x=1$ を代入すると、\n\n$1-1+1-1=0$\n\nなので、$x-1$ が因数です。\n\n因数分解すると、\n\n$x^3-x^2+x-1=(x-1)(x^2+1)$\n\nです。\n\nしたがって、\n\n$(x-1)(x^2+1)=0$\n\nです。\n\n$x-1=0$ より $x=1$。\n\n$x^2+1=0$ より $x=\\pm i$。\n\nしたがって、解は $x=1, i, -i$ です。",
},
{
kind: "concept",
title: "置き換えで解く四次方程式",
body: "四次方程式の中には、置き換えで二次方程式にできるものがあります。\n\n例えば、$x^4-5x^2+4=0$ では、$x^2$ の式として見られます。\n\n$t=x^2$ と置けば、\n\n$t^2-5t+4=0$\n\nになります。\n\nこのように、偶数乗だけが出ている方程式では、$x^2$ で置き換える方針が有効です。",
},
{
kind: "workedExample",
title: "例3：四次方程式を置き換える",
body: "$x^4-5x^2+4=0$ を解きます。\n\n$t=x^2$ と置きます。\n\nすると、\n\n$t^2-5t+4=0$\n\nです。\n\n因数分解して、\n\n$(t-1)(t-4)=0$\n\nしたがって、$t=1,4$ です。\n\n$t=x^2$ に戻すと、\n\n$x^2=1$ または $x^2=4$\n\nです。\n\nよって、$x=\\pm1,\\pm2$ です。",
},
{
kind: "commonMistake",
title: "よくあるミス：置き換えた文字を戻し忘れる",
body: "$t=x^2$ と置いた場合、方程式を解いて $t=1,4$ が出ても、それが最終答案ではありません。\n\n元の変数は $x$ なので、必ず $x^2=1$、$x^2=4$ に戻して $x$ を求めます。\n\n置き換えを使った問題では、最後に元の文字に戻すことを忘れないようにしましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 高次方程式は因数分解して次数を下げる\n- 整数解の候補は定数項の約数から試す\n- 因数定理で一次因数を見つける\n- 三次方程式は一次因数を見つけると二次方程式に下がる\n- 偶数乗だけの四次方程式は $t=x^2$ と置ける\n- 置き換えたら最後に元の文字へ戻す",
},
],
checkQuestions: [
{
question: "$x^3-4x^2+x+6=0$ で、$x=2$ が解であることを確認せよ。",
answer: "$2^3-4\\cdot2^2+2+6=8-16+2+6=0$ なので、$x=2$ は解。",
hint: "代入して0になるか確認する。",
},
{
question: "$x^4-10x^2+9=0$ を解くとき、どのように置き換えるとよいか。",
answer: "$t=x^2$ と置くと、$t^2-10t+9=0$ になる。",
hint: "偶数乗だけが出ている。",
},
{
question: "$x^2+4=0$ の解を求めよ。",
answer: "$x^2=-4$ より、$x=\\pm2i$。",
hint: "複素数解を使う。",
},
],
relatedPracticeLinks: [
{ label: "高次方程式 演習", href: "/units/complex-equations" },
{ label: "因数定理", href: "/courses/math-2bc/complex-equations/polynomial-division-factor-theorem" },
],
qualityTags: ["高次方程式", "因数定理", "置き換え", "確認問題3問"],
},
{
lessonId: "equations-with-parameters",
lessonTitle: "方程式とパラメータ",
lessonDescription: "文字を含む二次方程式について、解の個数・実数解条件・重解条件を判別式で処理する。",
level: "standard",
estimatedMinutes: 85,
prerequisites: ["二次方程式と複素数解", "判別式", "二次関数"],
goals: [
"パラメータを含む方程式を判別式で処理できる",
"実数解をもつ条件を求められる",
"重解をもつ条件を求められる",
"解の個数をパラメータで分類できる",
"二次関数のグラフと判別式を結びつけられる",
],
lessonBlocks: [
{
kind: "intro",
title: "解の条件は判別式で見る",
body: "文字を含む二次方程式では、解の個数や実数解をもつ条件を求める問題がよく出ます。\n\nこのとき中心になるのが判別式です。\n\n二次方程式 $ax^2+bx+c=0$ の判別式は $D=b^2-4ac$ です。\n\n実数解をもつ条件、重解をもつ条件、異なる2実数解をもつ条件は、判別式の符号で判断できます。",
},
{
kind: "comparisonTable",
title: "判別式による条件",
body: "パラメータ問題では、判別式の符号を不等式として解きます。",
columns: ["条件", "判別式", "解の様子"],
rows: [
{
cells: ["異なる2実数解", "$D>0$", "グラフがx軸と2点で交わる"],
highlight: true,
},
{
cells: ["重解", "$D=0$", "グラフがx軸に接する"],
},
{
cells: ["実数解をもつ", "$D\\geq0$", "2実数解または重解"],
},
{
cells: ["実数解をもたない", "$D<0$", "複素数解のみ"],
},
],
},
{
kind: "workedExample",
title: "例1：実数解をもつ条件",
body: "$x^2-2x+k=0$ が実数解をもつような $k$ の範囲を求めます。\n\n判別式を計算します。\n\n$D=(-2)^2-4\\cdot1\\cdot k=4-4k$\n\nです。\n\n実数解をもつ条件は $D\\geq0$ です。\n\nしたがって、\n\n$4-4k\\geq0$\n\n$k\\leq1$\n\nです。\n\nよって、$k\\leq1$ のとき実数解をもちます。",
},
{
kind: "workedExample",
title: "例2：重解をもつ条件",
body: "$x^2+kx+4=0$ が重解をもつような $k$ を求めます。\n\n重解をもつ条件は $D=0$ です。\n\n判別式は、\n\n$D=k^2-4\\cdot1\\cdot4=k^2-16$\n\nです。\n\n$D=0$ より、\n\n$k^2-16=0$\n\n$k=\\pm4$\n\nです。\n\nしたがって、$k=4,-4$ のとき重解をもちます。",
},
{
kind: "workedExample",
title: "例3：解の個数を分類する",
body: "$x^2-2kx+1=0$ の実数解の個数を $k$ の値で分類します。\n\n判別式は、\n\n$D=(-2k)^2-4\\cdot1\\cdot1=4k^2-4=4(k^2-1)$\n\nです。\n\n$D>0$ なら異なる2実数解なので、$k^2-1>0$、つまり $k<-1$ または $k>1$ です。\n\n$D=0$ なら重解なので、$k=\\pm1$ です。\n\n$D<0$ なら実数解なしなので、$-1<k<1$ です。",
},
{
kind: "concept",
title: "二次関数のグラフとの対応",
body: "二次方程式の実数解は、二次関数のグラフとx軸の共有点です。\n\n$D>0$ は、グラフがx軸と2点で交わる状態です。\n\n$D=0$ は、グラフがx軸に接する状態です。\n\n$D<0$ は、グラフがx軸と交わらない状態です。\n\n判別式は、グラフの位置関係を代数的に判断する道具です。",
},
{
kind: "commonMistake",
title: "よくあるミス：実数解をもつ条件をD>0にしてしまう",
body: "実数解をもつ条件は $D\\geq0$ です。\n\n$D=0$ のときも、重解という実数解をもちます。\n\n異なる2つの実数解をもつ条件は $D>0$ です。\n\n問題文が「実数解をもつ」なのか、「異なる2つの実数解をもつ」なのかを必ず確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- パラメータを含む二次方程式は判別式で処理する\n- 異なる2実数解は $D>0$\n- 重解は $D=0$\n- 実数解をもつ条件は $D\\geq0$\n- 実数解なしは $D<0$\n- 判別式は二次関数のグラフとx軸の共有点を表す\n- 問題文の条件の違いに注意する",
},
],
checkQuestions: [
{
question: "$x^2+2x+k=0$ が実数解をもつ条件を求めよ。",
answer: "$D=4-4k\\geq0$ より、$k\\leq1$。",
hint: "実数解をもつ条件は $D\\geq0$。",
},
{
question: "$x^2+kx+9=0$ が重解をもつような $k$ を求めよ。",
answer: "$D=k^2-36=0$ より、$k=\\pm6$。",
hint: "重解は $D=0$。",
},
{
question: "異なる2つの実数解をもつ条件を判別式で答えよ。",
answer: "$D>0$。",
hint: "2点で交わる。",
},
],
relatedPracticeLinks: [
{ label: "方程式とパラメータ 演習", href: "/units/complex-equations" },
{ label: "二次関数 判別式", href: "/courses/math-1a/quadratic/quadratic-discriminant" },
],
qualityTags: ["パラメータ", "判別式", "実数解条件", "確認問題3問"],
},
];

const COMPLEX_EQUATIONS_ADVANCED: CourseLesson[] = [
{
lessonId: "root-location-strategy",
lessonTitle: "二次方程式の解の配置",
lessonDescription: "判別式・軸・端点の符号を使って、二次方程式の解の位置条件を処理する。",
level: "advanced",
estimatedMinutes: 95,
prerequisites: ["方程式とパラメータ", "二次関数の最大最小", "二次不等式"],
goals: [
"解の配置問題の意味を理解できる",
"判別式・軸・端点の符号を使い分けられる",
"2つの解が指定範囲にある条件を立てられる",
"一方の解だけが範囲に入る条件を考えられる",
"難関大入口レベルの方程式問題に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "解の配置はグラフで考える",
body: "二次方程式の解の配置とは、解がどの範囲にあるかを調べる問題です。\n\n例えば、2つの実数解がどちらも正である条件や、2つの解がともに $0$ と $2$ の間にある条件などです。\n\nこのような問題では、二次方程式を二次関数 $f(x)$ と見て、グラフとx軸の交点を考えます。\n\n判別式だけでなく、軸の位置や端点での符号も重要になります。",
},
{
kind: "comparisonTable",
title: "解の配置で見るもの",
body: "二次関数のグラフとx軸の関係を整理します。",
columns: ["見るもの", "意味", "使う場面"],
rows: [
{
cells: ["判別式", "実数解の有無", "交点があるか"],
highlight: true,
},
{
cells: ["軸の位置", "2つの解の中央", "解が区間内に入るか"],
},
{
cells: ["端点の符号", "区間の端で上下どちらにあるか", "指定区間内の解"],
},
{
cells: ["頂点の値", "最小値または最大値", "接する条件や存在条件"],
},
],
},
{
kind: "strategy",
title: "2解がともに区間内にある条件",
body: "上に開く二次関数 $f(x)$ の2つの解が、ともに区間 $p<x<q$ にあるときを考えます。\n\n基本的には、次の条件を確認します。\n\n1. $D>0$ で異なる2実数解をもつ\n2. 軸が区間内にある\n3. 端点で $f(p)>0$、$f(q)>0$\n4. 頂点がx軸より下にある\n\n問題によって必要な条件の形は変わりますが、グラフで考えることが最重要です。",
},
{
kind: "workedExample",
title: "例1：2つの解がともに正",
body: "$x^2-2kx+1=0$ の2つの解がともに正となる条件を考えます。\n\n2つの解を $\\alpha,\\beta$ とします。\n\n解と係数の関係より、\n\n$\\alpha+\\beta=2k$、$\\alpha\\beta=1$\n\nです。\n\n2つの解がともに正であるためには、まず実数解をもつ必要があります。\n\n判別式は、\n\n$D=4k^2-4=4(k^2-1)$\n\nです。\n\n異なる2実数解なら $D>0$ より、$k<-1$ または $k>1$ です。\n\nまた、積 $\\alpha\\beta=1>0$ なので、2解は同符号です。\n\n和 $\\alpha+\\beta=2k$ が正なら、2解はともに正です。\n\nしたがって、$k>1$ です。\n\n重解も含めてともに正と見る場合は、$k\\geq1$ になります。問題文の条件に注意します。",
},
{
kind: "workedExample",
title: "例2：区間内に解をもつ",
body: "$f(x)=x^2-2x+k$ が、区間 $0<x<2$ に少なくとも1つの解をもつ条件を考えます。\n\nこの関数は上に開く放物線で、軸は $x=1$ です。\n\n$f(0)=k$、$f(2)=k$ です。\n\n頂点の値は、\n\n$f(1)=1-2+k=k-1$\n\nです。\n\n区間内でx軸と交わるには、頂点が0以下になる必要があります。\n\nしたがって、$k-1\\leq0$、つまり $k\\leq1$ です。\n\nただし、$k=0$ のときは解が $0$ と $2$ になり、開区間 $0<x<2$ の中にはありません。\n\nよって、開区間に解をもつ条件としては $0<k\\leq1$ となります。\n\nこのように、端点を含むかどうかが重要です。",
},
{
kind: "commonMistake",
title: "よくあるミス：判別式だけで解の位置を決める",
body: "判別式で分かるのは、実数解があるかどうかです。\n\nしかし、解が正か負か、区間内にあるかまでは判別式だけでは分かりません。\n\n解の位置を調べるには、軸、端点での符号、解と係数の関係などを組み合わせる必要があります。\n\n解の配置問題では、必ずグラフをイメージしましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 解の配置は二次関数のグラフで考える\n- 判別式は実数解の有無を見る\n- 軸は2つの解の中央を表す\n- 端点の符号で区間内の交点を判断する\n- 解と係数の関係で正負条件を処理できる\n- 判別式だけでは解の位置までは決まらない",
},
],
checkQuestions: [
{
question: "$x^2-2kx+1=0$ が異なる2実数解をもつ条件を求めよ。",
answer: "$D=4k^2-4>0$ より、$k<-1$ または $k>1$。",
hint: "異なる2実数解は $D>0$。",
},
{
question: "二次方程式の2つの解の中央は、二次関数の何に対応するか。",
answer: "軸。",
hint: "軸は2解の平均の位置。",
},
{
question: "解の配置問題で判別式以外に確認するものを2つ答えよ。",
answer: "軸の位置、端点での符号。ほかに頂点の値や解と係数の関係も使う。",
hint: "グラフで考える。",
},
],
relatedPracticeLinks: [
{ label: "解の配置 演習", href: "/units/complex-equations" },
{ label: "二次関数 パラメータ", href: "/courses/math-1a/quadratic/quadratic-param-function" },
],
qualityTags: ["旧帝大準備", "解の配置", "判別式", "パラメータ", "確認問題3問"],
},
{
lessonId: "symmetric-expressions-roots",
lessonTitle: "解の対称式と方程式",
lessonDescription: "解と係数の関係を使い、解の対称式や新しい方程式を処理する。",
level: "advanced",
estimatedMinutes: 90,
prerequisites: ["解と係数の関係", "式変形", "高次方程式"],
goals: [
"解の対称式を和と積で表せる",
"逆数の和などを解と係数の関係で処理できる",
"解から新しい方程式を作れる",
"複素数解を含む場合も対称式を扱える",
"入試標準レベルの方程式融合問題に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "解そのものより和と積を見る",
body: "二次方程式の問題では、解そのものを求めずに、解の式の値を求めることがあります。\n\n例えば、解を $\\alpha,\\beta$ として、$\\alpha^2+\\beta^2$ や $\\frac{1}{\\alpha}+\\frac{1}{\\beta}$ を求める問題です。\n\nこのような式は、解の和 $\\alpha+\\beta$ と積 $\\alpha\\beta$ に変形できることが多いです。\n\n解と係数の関係を使うことで、計算を大幅に短くできます。",
},
{
kind: "comparisonTable",
title: "よく使う対称式",
body: "解の式は、和と積で表すのが基本です。",
columns: ["式", "変形", "使うもの"],
rows: [
{
cells: ["$\\alpha^2+\\beta^2$", "$(\\alpha+\\beta)^2-2\\alpha\\beta$", "和と積"],
highlight: true,
},
{
cells: ["$\\frac{1}{\\alpha}+\\frac{1}{\\beta}$", "$\\frac{\\alpha+\\beta}{\\alpha\\beta}$", "和と積"],
},
{
cells: ["$(\\alpha-\\beta)^2$", "$(\\alpha+\\beta)^2-4\\alpha\\beta$", "和と積"],
},
{
cells: ["$\\alpha^3+\\beta^3$", "$(\\alpha+\\beta)^3-3\\alpha\\beta(\\alpha+\\beta)$", "和と積"],
},
],
},
{
kind: "workedExample",
title: "例1：逆数の和",
body: "$2x^2-5x+3=0$ の2つの解を $\\alpha,\\beta$ とします。\n\n$\\frac{1}{\\alpha}+\\frac{1}{\\beta}$ を求めます。\n\n解と係数の関係より、\n\n$\\alpha+\\beta=\\frac{5}{2}$、$\\alpha\\beta=\\frac{3}{2}$\n\nです。\n\nしたがって、\n\n$\\frac{1}{\\alpha}+\\frac{1}{\\beta}=\\frac{\\alpha+\\beta}{\\alpha\\beta}$\n\n$=\\frac{\\frac{5}{2}}{\\frac{3}{2}}=\\frac{5}{3}$\n\nです。",
},
{
kind: "workedExample",
title: "例2：二乗の和",
body: "$x^2-6x+2=0$ の2つの解を $\\alpha,\\beta$ とします。\n\n$\\alpha^2+\\beta^2$ を求めます。\n\n解と係数の関係より、\n\n$\\alpha+\\beta=6$、$\\alpha\\beta=2$\n\nです。\n\n$\\alpha^2+\\beta^2=(\\alpha+\\beta)^2-2\\alpha\\beta$\n\nなので、\n\n$\\alpha^2+\\beta^2=6^2-2\\cdot2=32$\n\nです。",
},
{
kind: "workedExample",
title: "例3：新しい方程式を作る",
body: "二次方程式の2つの解を $\\alpha,\\beta$ とします。\n\n新しい解が $\\alpha+1$、$\\beta+1$ である二次方程式を作りたいとします。\n\n新しい2解の和は、\n\n$(\\alpha+1)+(\\beta+1)=\\alpha+\\beta+2$\n\nです。\n\n新しい2解の積は、\n\n$(\\alpha+1)(\\beta+1)=\\alpha\\beta+\\alpha+\\beta+1$\n\nです。\n\nこの和と積を使って、\n\n$x^2-(\\text{和})x+(\\text{積})=0$\n\nの形で方程式を作れます。\n\n解を直接求めなくても、新しい方程式を作れるのが強みです。",
},
{
kind: "concept",
title: "複素数解でも使える",
body: "解と係数の関係は、解が実数でなくても成り立ちます。\n\n例えば、複素数解 $2+i$ と $2-i$ をもつ方程式では、和は $4$、積は $5$ です。\n\nしたがって、その二次方程式は、\n\n$x^2-4x+5=0$\n\nです。\n\n複素数解でも、和と積が分かれば方程式を作れます。",
},
{
kind: "commonMistake",
title: "よくあるミス：対称式に変形せずに解を求めにいく",
body: "解と係数の関係の問題では、解そのものを求める必要がないことが多いです。\n\n$\\alpha^2+\\beta^2$ や $\\frac{1}{\\alpha}+\\frac{1}{\\beta}$ は、和と積に変形できます。\n\nいきなり解の公式を使うと計算が重くなります。\n\nまず、求めたい式が $\\alpha+\\beta$ と $\\alpha\\beta$ で表せないか考えましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 解の対称式は和と積で処理する\n- $\\alpha^2+\\beta^2=(\\alpha+\\beta)^2-2\\alpha\\beta$\n- 逆数の和は $\\frac{\\alpha+\\beta}{\\alpha\\beta}$\n- 新しい解の和と積を作れば方程式を作れる\n- 複素数解でも解と係数の関係は成り立つ\n- 解そのものを求める前に、和と積で処理できるか考える",
},
],
checkQuestions: [
{
question: "$x^2-4x+3=0$ の解を $\\alpha,\\beta$ とするとき、$\\alpha^2+\\beta^2$ を求めよ。",
answer: "$\\alpha+\\beta=4$、$\\alpha\\beta=3$ より、$16-6=10$。",
hint: "$(\\alpha+\\beta)^2-2\\alpha\\beta$。",
},
{
question: "$x^2-5x+2=0$ の解を $\\alpha,\\beta$ とするとき、$\\frac{1}{\\alpha}+\\frac{1}{\\beta}$ を求めよ。",
answer: "$\\frac{\\alpha+\\beta}{\\alpha\\beta}=\\frac{5}{2}$。",
hint: "逆数の和を通分する。",
},
{
question: "解が $3+i$、$3-i$ である二次方程式を作れ。",
answer: "和は $6$、積は $10$ なので、$x^2-6x+10=0$。",
hint: "共役複素数の積を考える。",
},
],
relatedPracticeLinks: [
{ label: "解の対称式 演習", href: "/units/complex-equations" },
{ label: "解と係数の関係", href: "/courses/math-2bc/complex-equations/roots-and-coefficients-basic" },
],
qualityTags: ["旧帝大準備", "解と係数", "対称式", "複素数解", "確認問題3問"],
},
{
lessonId: "complex-equations-exam-standard",
lessonTitle: "複素数と方程式の融合問題",
lessonDescription: "複素数・二次方程式・因数定理・高次方程式・判別式・解と係数を組み合わせた実戦問題を切り崩す。",
level: "advanced",
estimatedMinutes: 100,
prerequisites: ["解の配置", "解の対称式と方程式", "高次方程式"],
goals: [
"方程式問題で使う道具を選択できる",
"複素数解を含む方程式を処理できる",
"因数定理で高次方程式を解ける",
"判別式で実数解条件を整理できる",
"解と係数の関係で解の式を処理できる",
],
lessonBlocks: [
{
kind: "intro",
title: "方程式の融合問題は道具選びが重要",
body: "複素数と方程式の実戦問題では、複数の道具を組み合わせます。\n\n判別式で解の種類を調べる。\n\n因数定理で高次方程式を因数分解する。\n\n解と係数の関係で和や積を求める。\n\n複素数解が出たら共役な解を考える。\n\n問題文を見て、どの道具を使うべきか判断することが重要です。",
},
{
kind: "strategy",
title: "融合問題の確認リスト",
body: "方程式の実戦問題では、次の順番で確認します。\n\n1. 二次方程式なら判別式を見る\n2. 解の和や積が関係するなら解と係数を使う\n3. 高次方程式なら整数解を試して因数定理を使う\n4. 偶数乗だけなら置き換えを考える\n5. 複素数解が1つ与えられたら共役な解も考える\n6. パラメータがあれば判別式の符号で分類する\n7. 解の位置条件ならグラフで考える\n\n計算に入る前に、方針を選ぶことが大切です。",
},
{
kind: "workedExample",
title: "例1：複素数解から方程式を作る",
body: "実数係数の二次方程式が $1+2i$ を解にもつとします。\n\n実数係数なので、共役な複素数 $1-2i$ も解です。\n\n2つの解の和は、\n\n$(1+2i)+(1-2i)=2$\n\nです。\n\n積は、\n\n$(1+2i)(1-2i)=1^2+2^2=5$\n\nです。\n\nしたがって、方程式は、\n\n$x^2-2x+5=0$\n\nです。",
},
{
kind: "workedExample",
title: "例2：高次方程式と複素数解",
body: "$x^3-2x^2+2x-4=0$ を解きます。\n\nまず、整数解を探します。\n\n$x=2$ を代入すると、\n\n$8-8+4-4=0$\n\nなので、$x=2$ は解です。\n\nしたがって、$x-2$ が因数です。\n\n因数分解すると、\n\n$x^3-2x^2+2x-4=(x-2)(x^2+2)$\n\nです。\n\n$x^2+2=0$ より、\n\n$x=\\pm\\sqrt{2}i$\n\nです。\n\nしたがって、解は $x=2,\\sqrt{2}i,-\\sqrt{2}i$ です。",
},
{
kind: "workedExample",
title: "例3：判別式とパラメータ",
body: "$x^2-2kx+k+2=0$ が実数解をもつ条件を求めます。\n\n判別式は、\n\n$D=(-2k)^2-4(k+2)$\n\n$=4k^2-4k-8$\n\n$=4(k^2-k-2)$\n\n$=4(k-2)(k+1)$\n\nです。\n\n実数解をもつ条件は $D\\geq0$ なので、\n\n$(k-2)(k+1)\\geq0$\n\nです。\n\nよって、\n\n$k\\leq-1$ または $k\\geq2$\n\nです。",
},
{
kind: "workedExample",
title: "例4：解と係数で処理する",
body: "$x^2-3x+1=0$ の2つの解を $\\alpha,\\beta$ とします。\n\n$\\alpha^3+\\beta^3$ を求めます。\n\n解と係数の関係より、\n\n$\\alpha+\\beta=3$、$\\alpha\\beta=1$\n\nです。\n\n公式\n\n$\\alpha^3+\\beta^3=(\\alpha+\\beta)^3-3\\alpha\\beta(\\alpha+\\beta)$\n\nを使います。\n\nしたがって、\n\n$\\alpha^3+\\beta^3=3^3-3\\cdot1\\cdot3=27-9=18$\n\nです。\n\n解そのものを求めずに計算できます。",
},
{
kind: "comparisonTable",
title: "実戦で使う判断",
body: "問題文の形から、使う道具を選びます。",
columns: ["問題の特徴", "使う道具", "目的"],
rows: [
{
cells: ["二次方程式の解の個数", "判別式", "実数解条件を判断"],
highlight: true,
},
{
cells: ["解の和・積", "解と係数", "解を求めず処理"],
},
{
cells: ["高次方程式", "因数定理", "次数を下げる"],
},
{
cells: ["偶数乗だけ", "置き換え", "二次方程式化"],
},
{
cells: ["複素数解が与えられる", "共役な解", "実数係数方程式を作る"],
},
{
cells: ["解の位置", "グラフ・判別式・軸", "配置条件を考える"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：道具を固定してしまう",
body: "方程式の融合問題では、毎回同じ解き方で進めると遠回りになることがあります。\n\n高次方程式なら因数定理。\n\n実数解の条件なら判別式。\n\n解の式なら解と係数の関係。\n\n偶数乗だけなら置き換え。\n\nこのように、問題の形に合わせて道具を選ぶことが重要です。",
},
{
kind: "summary",
title: "まとめ",
body: "- 複素数と方程式の融合問題は道具選びが重要\n- 二次方程式の解の種類は判別式で判断する\n- 解の和や積は解と係数の関係を使う\n- 高次方程式は因数定理で次数を下げる\n- 複素数解が与えられたら共役な解を考える\n- 置き換えで二次方程式にできる形を探す\n- 解の配置はグラフで考える",
},
],
checkQuestions: [
{
question: "実数係数の二次方程式が $2+i$ を解にもつとき、もう一つの解を答えよ。",
answer: "$2-i$。",
hint: "共役な複素数解。",
},
{
question: "$x^4-5x^2+4=0$ を解くときの置き換えを答えよ。",
answer: "$t=x^2$ と置く。",
hint: "偶数乗だけが出ている。",
},
{
question: "$x^2+kx+1=0$ が実数解をもつ条件を判別式で表せ。",
answer: "$D=k^2-4\\geq0$。",
hint: "実数解をもつ条件は $D\\geq0$。",
},
],
relatedPracticeLinks: [
{ label: "複素数と方程式 実戦演習", href: "/units/complex-equations" },
{ label: "過去問道場", href: "/dojo" },
{ label: "二次関数 判別式", href: "/courses/math-1a/quadratic/quadratic-discriminant" },
],
qualityTags: ["旧帝大準備", "複素数", "高次方程式", "判別式", "融合問題"],
},
];

export const COMPLEX_EQUATIONS_UNIT: CourseUnit = {
unitId: "complex-equations",
subjectId: "math-2bc",
unitTitle: "複素数と方程式",
unitDescription:
"複素数、二次方程式の複素数解、解と係数の関係、因数定理、高次方程式、判別式、解の配置まで体系的に学ぶ単元です。",
lessons: [
...COMPLEX_EQUATIONS_BEGINNER,
...COMPLEX_EQUATIONS_STANDARD,
...COMPLEX_EQUATIONS_ADVANCED,
],
};
