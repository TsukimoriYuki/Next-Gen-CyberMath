import type { CourseLesson, CourseUnit } from "@/types/course";

const NUMBERS_EXPRESSIONS_BEGINNER: CourseLesson[] = [
{
lessonId: "polynomial-basics",
lessonTitle: "式の見方と整式の基本",
lessonDescription: "文字式・項・係数・次数を理解し、整式を構造として見られるようにする。",
level: "beginner",
estimatedMinutes: 55,
prerequisites: ["正負の数", "文字式の基本", "四則計算"],
goals: [
"項・係数・次数の意味を説明できる",
"同類項をまとめる計算ができる",
"整式を単なる文字の並びではなく、構造として見られる",
"展開・因数分解に進むための基礎を作れる",
"計算ミスを減らすための式の整理ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "数と式は数学IA全体の土台",
body: "数学IAの最初に学ぶ数と式は、すべての単元の土台になります。\n\n二次関数では式を変形します。場合の数では文字を使って条件を表します。図形と計量でも、長さや面積を式で表します。\n\nつまり、数と式が弱いと、後の単元で必ずつまずきます。\n\nここで大切なのは、式をただ計算するだけではなく、式の形を読むことです。\n\nどこが項なのか、どの文字について何次式なのか、どの部分をまとめられるのかを見抜けるようになると、式変形が一気に安定します。",
},
{
kind: "concept",
title: "項・係数・次数",
body: "整式は、いくつかの項を足し合わせた式です。\n\n例えば、$3x^2-5x+7$ という式は、$3x^2$、$-5x$、$7$ という3つの項からできています。\n\n$3x^2$ の係数は $3$ です。$-5x$ の係数は $-5$ です。\n\n次数とは、文字が何回かけられているかを表す数です。$3x^2$ は2次の項、$-5x$ は1次の項、$7$ は定数項です。\n\n整式の次数は、最も高い次数の項で決まります。したがって、$3x^2-5x+7$ は2次式です。",
},
{
kind: "comparisonTable",
title: "式の用語整理",
body: "用語をあいまいにしたまま進むと、因数分解や二次関数で混乱します。",
columns: ["用語", "意味", "例"],
rows: [
{
cells: ["項", "足し算で分かれた1つ1つの部分", "$3x^2,-5x,7$"],
highlight: true,
},
{
cells: ["係数", "文字にかかっている数", "$3x^2$ の係数は $3$"],
},
{
cells: ["次数", "文字がかけられている回数", "$x^2$ は2次"],
},
{
cells: ["定数項", "文字を含まない項", "$7$"],
},
],
},
{
kind: "workedExample",
title: "例1：項と係数を読む",
body: "整式 $-2x^3+5x^2-x+8$ について考えます。\n\n項は、$-2x^3$、$5x^2$、$-x$、$8$ です。\n\n$-2x^3$ の係数は $-2$ です。\n\n$5x^2$ の係数は $5$ です。\n\n$-x$ は、$-1x$ と同じなので、係数は $-1$ です。\n\n$8$ は文字を含まないので定数項です。\n\n最も高い次数は $x^3$ の3次なので、この整式は3次式です。",
},
{
kind: "concept",
title: "同類項をまとめる",
body: "同類項とは、文字の部分が同じ項のことです。\n\n例えば、$3x$ と $5x$ は同類項です。どちらも文字部分が $x$ だからです。\n\n一方、$3x$ と $5x^2$ は同類項ではありません。次数が違うからです。\n\n同類項は係数だけを計算してまとめられます。\n\n$3x+5x=8x$\n\n$4x^2-7x^2=-3x^2$\n\nのようになります。",
},
{
kind: "workedExample",
title: "例2：同類項をまとめる",
body: "$3x^2-2x+5+4x^2+7x-1$ を整理します。\n\nまず同類項を集めます。\n\n$x^2$ の項は、$3x^2$ と $4x^2$ です。\n\n$x$ の項は、$-2x$ と $7x$ です。\n\n定数項は、$5$ と $-1$ です。\n\nしたがって、\n\n$3x^2+4x^2=7x^2$\n\n$-2x+7x=5x$\n\n$5-1=4$\n\nよって、\n\n$3x^2-2x+5+4x^2+7x-1=7x^2+5x+4$\n\nです。",
},
{
kind: "commonMistake",
title: "よくあるミス：違う次数をまとめる",
body: "$3x^2+5x$ を $8x^2$ や $8x$ とまとめることはできません。\n\n$3x^2$ と $5x$ は同類項ではありません。\n\n文字が同じ $x$ でも、$x^2$ と $x$ は別のものです。\n\n同類項としてまとめられるのは、文字の部分が完全に同じときだけです。\n\n式を整理するときは、次数ごとに分けて見る習慣をつけましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 整式は項の集まり\n- 係数は文字にかかっている数\n- 次数は文字が何回かけられているか\n- 定数項は文字を含まない項\n- 同類項は文字部分が同じ項\n- 同類項は係数だけを計算してまとめる\n- 式を見る力は、展開・因数分解・二次関数の土台になる",
},
{
kind: "nextStep",
title: "次は展開へ",
body: "整式の構造が分かると、次は括弧を外す展開に進めます。\n\n展開は、分配法則を正しく使う計算です。特に乗法公式は、二次関数や因数分解でも何度も使います。",
},
],
checkQuestions: [
{
question: "$4x^3-2x^2+7x-9$ の次数を答えよ。",
answer: "最も高い次数は $x^3$ の3次なので、3次式。",
hint: "一番次数が高い項を見る。",
},
{
question: "$2x^2+3x-5x^2+4x+1$ を整理せよ。",
answer: "$2x^2-5x^2=-3x^2$、$3x+4x=7x$ より、$-3x^2+7x+1$。",
hint: "同類項ごとにまとめる。",
},
{
question: "$-x$ の係数を答えよ。",
answer: "$-x=-1x$ なので、係数は $-1$。",
hint: "数字が見えないときは1が隠れている。",
},
],
relatedPracticeLinks: [
{ label: "数と式 中核講義", href: "/common-test/lectures/numbers-expressions-core-skills", description: "有理化・対称式・整数部分の判別フローを確認する" },
{ label: "数と式 基礎演習", href: "/units/numbers-and-expressions", description: "整式の基礎" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a", description: "共通テスト対策" },
],
qualityTags: ["整式", "同類項", "係数", "次数", "確認問題3問"],
},
{
lessonId: "expansion-formulas-basic",
lessonTitle: "展開と乗法公式",
lessonDescription: "分配法則と乗法公式を、丸暗記ではなく面積・構造から理解する。",
level: "beginner",
estimatedMinutes: 65,
prerequisites: ["式の見方と整式の基本", "分配法則"],
goals: [
"分配法則を使って展開できる",
"基本的な乗法公式を使える",
"乗法公式を丸暗記ではなく構造で理解できる",
"符号ミスを防ぐために途中式を書ける",
"因数分解に進むための展開感覚を身につける",
],
lessonBlocks: [
{
kind: "intro",
title: "展開は括弧を外す計算",
body: "展開とは、括弧を外して整式の形にすることです。\n\n例えば、$2(x+3)$ を展開すると、$2x+6$ になります。\n\nこれは分配法則を使っています。\n\n展開は、数学IAのほぼすべての単元で使います。二次関数の平方完成、因数分解、方程式、不等式、図形の式変形など、あらゆる場面に出てきます。\n\n展開で大切なのは、すべての項にきちんとかけることです。かけ忘れや符号ミスが最も多い単元です。",
},
{
kind: "concept",
title: "分配法則",
body: "分配法則は、括弧の外にある数や式を、括弧の中のすべての項にかける法則です。\n\n$a(b+c)=ab+ac$\n\nです。\n\n例えば、$3(x+2)$ なら、$3$ を $x$ にも $2$ にもかけます。\n\n$3(x+2)=3x+6$\n\nとなります。\n\n片方にしかかけないミスを防ぐため、括弧の中のすべての項に矢印を飛ばすイメージを持ちましょう。",
},
{
kind: "formula",
title: "基本の乗法公式",
body: "展開で特によく使う形は、公式として覚えておくと便利です。ただし、丸暗記ではなく分配法則から出ることを理解しておきましょう。",
formula: "(a+b)^2=a^2+2ab+b^2",
},
{
kind: "comparisonTable",
title: "よく使う乗法公式",
body: "この3つは、展開と因数分解の両方で必須です。",
columns: ["形", "展開結果", "見るポイント"],
rows: [
{
cells: ["$(a+b)^2$", "$a^2+2ab+b^2$", "真ん中は $2ab$"],
highlight: true,
},
{
cells: ["$(a-b)^2$", "$a^2-2ab+b^2$", "真ん中の符号がマイナス"],
},
{
cells: ["$(a+b)(a-b)$", "$a^2-b^2$", "真ん中の項が消える"],
},
],
},
{
kind: "workedExample",
title: "例1：二乗の展開",
body: "$(x+5)^2$ を展開します。\n\n公式 $(a+b)^2=a^2+2ab+b^2$ を使います。\n\nここでは $a=x$、$b=5$ です。\n\n$(x+5)^2=x^2+2\\cdot x\\cdot5+5^2$\n\n$=x^2+10x+25$\n\nです。\n\nよくあるミスは、$(x+5)^2=x^2+25$ としてしまうことです。真ん中の $10x$ を忘れないようにしましょう。",
},
{
kind: "workedExample",
title: "例2：マイナスを含む二乗",
body: "$(x-3)^2$ を展開します。\n\n公式 $(a-b)^2=a^2-2ab+b^2$ を使います。\n\n$a=x$、$b=3$ と見ると、\n\n$(x-3)^2=x^2-2\\cdot x\\cdot3+3^2$\n\n$=x^2-6x+9$\n\nです。\n\n最後の $9$ は正です。なぜなら、$(-3)^2=9$ だからです。\n\n真ん中の項はマイナス、最後の項はプラス。この区別が大切です。",
},
{
kind: "workedExample",
title: "例3：和と差の積",
body: "$(x+4)(x-4)$ を展開します。\n\n公式 $(a+b)(a-b)=a^2-b^2$ を使います。\n\nここでは $a=x$、$b=4$ なので、\n\n$(x+4)(x-4)=x^2-4^2=x^2-16$\n\nです。\n\n実際に分配法則で確認すると、\n\n$(x+4)(x-4)=x^2-4x+4x-16$\n\n真ん中の $-4x$ と $+4x$ が消えて、$x^2-16$ になります。",
},
{
kind: "commonMistake",
title: "よくあるミス：二乗で真ん中の項を忘れる",
body: "$(x+3)^2$ を $x^2+9$ としてしまうミスは非常に多いです。\n\nしかし、$(x+3)^2$ は $(x+3)(x+3)$ です。\n\n分配法則で展開すると、\n\n$x^2+3x+3x+9=x^2+6x+9$\n\nとなります。\n\n真ん中の $6x$ は、2つの $3x$ が合わさったものです。\n\n二乗の展開では、必ず真ん中の項が出ることを意識しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 展開は括弧を外す計算\n- 分配法則では、外の数を括弧内のすべての項にかける\n- $(a+b)^2=a^2+2ab+b^2$\n- $(a-b)^2=a^2-2ab+b^2$\n- $(a+b)(a-b)=a^2-b^2$\n- 二乗の展開では真ん中の項を忘れない\n- 展開は因数分解の逆操作でもある",
},
{
kind: "nextStep",
title: "次は因数分解へ",
body: "展開が括弧を外す計算なら、因数分解はその逆です。\n\n展開公式を逆向きに見られるようになると、因数分解ができるようになります。",
},
],
checkQuestions: [
{
question: "$(x+7)^2$ を展開せよ。",
answer: "$(x+7)^2=x^2+14x+49$。",
hint: "真ん中は $2\\cdot x\\cdot7$。",
},
{
question: "$(2x-3)^2$ を展開せよ。",
answer: "$(2x-3)^2=4x^2-12x+9$。",
hint: "$a=2x$、$b=3$ と見る。",
},
{
question: "$(x+6)(x-6)$ を展開せよ。",
answer: "$x^2-36$。",
hint: "和と差の積は2乗の差。",
},
],
relatedPracticeLinks: [
{ label: "数と式 中核講義", href: "/common-test/lectures/numbers-expressions-core-skills", description: "展開公式を対称式・因数分解へつなげる" },
{ label: "展開 演習", href: "/units/numbers-and-expressions" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a" },
],
qualityTags: ["展開", "乗法公式", "分配法則", "確認問題3問"],
},
{
lessonId: "factorization-basic",
lessonTitle: "因数分解の基本",
lessonDescription: "因数分解を、展開の逆操作として理解し、共通因数・公式型を使えるようにする。",
level: "beginner",
estimatedMinutes: 70,
prerequisites: ["展開と乗法公式", "同類項の整理"],
goals: [
"因数分解が展開の逆操作であることを理解できる",
"共通因数でくくることができる",
"乗法公式を逆向きに使って因数分解できる",
"二次式の基本的な因数分解ができる",
"二次方程式・二次関数への接続を理解できる",
],
lessonBlocks: [
{
kind: "intro",
title: "因数分解は展開の逆",
body: "展開は、括弧を外す計算でした。\n\n例えば、$(x+2)(x+3)$ を展開すると、\n\n$x^2+5x+6$\n\nになります。\n\n因数分解はこの逆です。\n\n$x^2+5x+6$ を見て、\n\n$(x+2)(x+3)$\n\nの形に戻すことです。\n\n因数分解は、二次方程式を解くときや、二次関数のグラフと $x$ 軸の交点を考えるときに重要になります。",
},
{
kind: "concept",
title: "まず共通因数を探す",
body: "因数分解で最初に見るべきなのは、すべての項に共通している因数です。\n\n例えば、$6x^2+9x$ では、どちらの項にも $3x$ が含まれています。\n\nしたがって、\n\n$6x^2+9x=3x(2x+3)$\n\nと因数分解できます。\n\n共通因数をくくることは、因数分解の最初の基本です。\n\n複雑な因数分解でも、まず共通因数がないかを確認しましょう。",
},
{
kind: "comparisonTable",
title: "因数分解の基本パターン",
body: "因数分解は、展開公式を逆向きに見ます。",
columns: ["展開公式", "因数分解の形", "例"],
rows: [
{
cells: ["$a^2+2ab+b^2$", "$(a+b)^2$", "$x^2+6x+9=(x+3)^2$"],
highlight: true,
},
{
cells: ["$a^2-2ab+b^2$", "$(a-b)^2$", "$x^2-10x+25=(x-5)^2$"],
},
{
cells: ["$a^2-b^2$", "$(a+b)(a-b)$", "$x^2-16=(x+4)(x-4)$"],
},
{
cells: ["$x^2+(p+q)x+pq$", "$(x+p)(x+q)$", "$x^2+5x+6=(x+2)(x+3)$"],
},
],
},
{
kind: "workedExample",
title: "例1：共通因数でくくる",
body: "$4x^2-8x$ を因数分解します。\n\n$4x^2$ と $-8x$ には、どちらにも $4x$ が含まれています。\n\nしたがって、$4x$ でくくります。\n\n$4x^2-8x=4x(x-2)$\n\nです。\n\n確認として展開すると、\n\n$4x(x-2)=4x^2-8x$\n\nとなり、元の式に戻ります。",
},
{
kind: "workedExample",
title: "例2：二次式の因数分解",
body: "$x^2+7x+12$ を因数分解します。\n\n$(x+p)(x+q)$ の形を考えます。\n\n展開すると、\n\n$(x+p)(x+q)=x^2+(p+q)x+pq$\n\nです。\n\nしたがって、足して $7$、掛けて $12$ になる2数を探します。\n\n$3$ と $4$ は、\n\n$3+4=7$\n\n$3\\times4=12$\n\nを満たします。\n\nよって、\n\n$x^2+7x+12=(x+3)(x+4)$\n\nです。",
},
{
kind: "workedExample",
title: "例3：符号に注意する因数分解",
body: "$x^2-x-12$ を因数分解します。\n\n足して $-1$、掛けて $-12$ になる2数を探します。\n\n掛けて負になるので、2数の符号は異なります。\n\n$3$ と $-4$ は、\n\n$3+(-4)=-1$\n\n$3\\times(-4)=-12$\n\nを満たします。\n\nしたがって、\n\n$x^2-x-12=(x+3)(x-4)$\n\nです。\n\n符号が混ざる因数分解では、足し算と掛け算の両方を確認することが大切です。",
},
{
kind: "commonMistake",
title: "よくあるミス：共通因数を先にくくらない",
body: "$2x^2+10x+12$ をいきなり $x^2+5x+6$ のように見てしまうと、先頭の $2$ を無視してしまいます。\n\nまず共通因数 $2$ をくくります。\n\n$2x^2+10x+12=2(x^2+5x+6)$\n\nそして、括弧の中を因数分解します。\n\n$2(x^2+5x+6)=2(x+2)(x+3)$\n\n因数分解では、最初に共通因数を探す習慣をつけましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 因数分解は展開の逆操作\n- まず共通因数を探す\n- 乗法公式を逆向きに使う\n- $x^2+(p+q)x+pq=(x+p)(x+q)$\n- 符号があるときは、足して何になるか、掛けて何になるかを両方確認する\n- 因数分解は二次方程式・二次関数につながる重要技術",
},
],
checkQuestions: [
{
question: "$6x^2+9x$ を因数分解せよ。",
answer: "共通因数 $3x$ でくくって、$3x(2x+3)$。",
hint: "両方の項に共通するものを見る。",
},
{
question: "$x^2+8x+15$ を因数分解せよ。",
answer: "足して $8$、掛けて $15$ になる2数は $3$ と $5$。よって $(x+3)(x+5)$。",
hint: "足して真ん中、掛けて定数項。",
},
{
question: "$x^2-9$ を因数分解せよ。",
answer: "$x^2-3^2$ なので、$(x+3)(x-3)$。",
hint: "2乗の差。",
},
],
relatedPracticeLinks: [
{ label: "数と式 中核講義", href: "/common-test/lectures/numbers-expressions-core-skills", description: "平方の差を作る因数分解の技巧を確認する" },
{ label: "因数分解 演習", href: "/units/numbers-and-expressions" },
{ label: "二次関数 講座", href: "/courses/math-1a/quadratic" },
],
qualityTags: ["因数分解", "共通因数", "公式の逆", "確認問題3問"],
},
];

const NUMBERS_EXPRESSIONS_STANDARD: CourseLesson[] = [
{
lessonId: "real-numbers-and-radicals",
lessonTitle: "実数と平方根",
lessonDescription: "有理数・無理数・実数の関係と、平方根の計算を整理する。",
level: "standard",
estimatedMinutes: 70,
prerequisites: ["因数分解の基本", "平方根の基本計算"],
goals: [
"有理数・無理数・実数の違いを説明できる",
"平方根の基本計算ができる",
"根号を含む式の変形ができる",
"分母の有理化ができる",
"二次方程式や図形で平方根を扱う準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "数の範囲を広げる",
body: "中学校までに、整数・分数・小数・平方根を学びました。\n\n高校数学では、それらをまとめて実数として扱います。\n\n数の範囲を理解することは、方程式や不等式、二次関数、図形の長さを扱う上で重要です。\n\n特に平方根は、図形と計量や二次方程式で頻繁に出てきます。\n\n平方根の計算が不安定だと、後の単元で計算が止まりやすくなります。",
},
{
kind: "comparisonTable",
title: "数の分類",
body: "数の種類を整理しておきましょう。",
columns: ["種類", "意味", "例"],
rows: [
{
cells: ["有理数", "分数で表せる数", "$2,-3,\\frac{1}{2},0.75$"],
highlight: true,
},
{
cells: ["無理数", "分数で表せない数", "$\\sqrt{2},\\sqrt{3},\\pi$"],
},
{
cells: ["実数", "数直線上に表せる数", "有理数と無理数を合わせたもの"],
},
],
},
{
kind: "concept",
title: "平方根とは何か",
body: "$a$ の平方根とは、2乗すると $a$ になる数のことです。\n\n例えば、$3^2=9$、$(-3)^2=9$ なので、$9$ の平方根は $3$ と $-3$ です。\n\nただし、$\\sqrt{9}$ は正の平方根を表すので、$\\sqrt{9}=3$ です。\n\n$\\sqrt{9}=\\pm3$ ではありません。\n\nこの区別は非常に重要です。",
},
{
kind: "workedExample",
title: "例1：平方根の基本",
body: "$\\sqrt{50}$ を簡単にします。\n\n$50=25\\times2$ なので、\n\n$\\sqrt{50}=\\sqrt{25\\times2}$\n\n$=\\sqrt{25}\\sqrt{2}$\n\n$=5\\sqrt{2}$\n\nです。\n\n根号の中に平方数が含まれているときは、外に出せます。",
},
{
kind: "workedExample",
title: "例2：根号の計算",
body: "$2\\sqrt{3}+5\\sqrt{3}$ を計算します。\n\nどちらも $\\sqrt{3}$ を含む同類項なので、係数を足せます。\n\n$2\\sqrt{3}+5\\sqrt{3}=7\\sqrt{3}$\n\nです。\n\n一方、$2\\sqrt{3}+5\\sqrt{2}$ は、根号の中が違うのでまとめられません。\n\n根号を含む式でも、同類項かどうかを見て計算します。",
},
{
kind: "formula",
title: "分母の有理化",
body: "分母に根号があるとき、分母から根号をなくす変形を有理化といいます。\n\n基本は、分母と同じ根号を分子・分母にかけることです。",
formula: "\\frac{1}{\\sqrt{a}}=\\frac{\\sqrt{a}}{a}",
},
{
kind: "workedExample",
title: "例3：分母を有理化する",
body: "$\\frac{3}{\\sqrt{5}}$ を有理化します。\n\n分母の $\\sqrt{5}$ をなくすため、分子と分母に $\\sqrt{5}$ をかけます。\n\n$\\frac{3}{\\sqrt{5}}=\\frac{3\\sqrt{5}}{\\sqrt{5}\\sqrt{5}}$\n\n$=\\frac{3\\sqrt{5}}{5}$\n\nです。\n\n分子と分母に同じ数をかけているので、値は変わりません。",
},
{
kind: "commonMistake",
title: "よくあるミス：平方根の符号",
body: "$x^2=9$ の解は、$x=\\pm3$ です。\n\nしかし、$\\sqrt{9}$ は $3$ です。\n\nこの2つを混同しないようにしましょう。\n\n方程式 $x^2=9$ では、2乗して9になる数をすべて探すので、$3$ と $-3$ の両方が出ます。\n\n一方、記号 $\\sqrt{9}$ は、正の平方根を表す約束です。",
},
{
kind: "summary",
title: "まとめ",
body: "- 有理数は分数で表せる数\n- 無理数は分数で表せない数\n- 実数は有理数と無理数を合わせた数\n- $\\sqrt{a}$ は正の平方根を表す\n- 根号の中に平方数があれば外に出せる\n- 分母に根号があるときは有理化する\n- $x^2=a$ の解と $\\sqrt{a}$ の意味を混同しない",
},
],
checkQuestions: [
{
question: "$\\sqrt{72}$ を簡単にせよ。",
answer: "$72=36\\times2$ より、$\\sqrt{72}=6\\sqrt{2}$。",
hint: "平方数を探す。",
},
{
question: "$3\\sqrt{2}+4\\sqrt{2}$ を計算せよ。",
answer: "$7\\sqrt{2}$。",
hint: "同じ根号なら係数を足す。",
},
{
question: "$\\frac{2}{\\sqrt{3}}$ を有理化せよ。",
answer: "$\\frac{2}{\\sqrt{3}}=\\frac{2\\sqrt{3}}{3}$。",
hint: "分子と分母に $\\sqrt{3}$ をかける。",
},
],
relatedPracticeLinks: [
{ label: "数と式 中核講義", href: "/common-test/lectures/numbers-expressions-core-skills", description: "有理化から対称式・整数部分への流れを復習する" },
{ label: "平方根 演習", href: "/units/numbers-and-expressions" },
{ label: "図形と計量 講座", href: "/courses/math-1a/figures-and-measurement" },
],
qualityTags: ["実数", "平方根", "有理化", "確認問題3問"],
},
{
lessonId: "linear-equations-inequalities",
lessonTitle: "一次方程式と一次不等式",
lessonDescription: "方程式・不等式を、移項と同値変形の視点から整理する。",
level: "standard",
estimatedMinutes: 70,
prerequisites: ["式の見方と整式の基本", "正負の数"],
goals: [
"一次方程式を同値変形で解ける",
"一次不等式を正しく解ける",
"負の数で割ると不等号の向きが変わる理由を理解できる",
"文章題を一次方程式・不等式に翻訳できる",
"二次不等式や条件整理へ進む準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "方程式と不等式は条件を表す",
body: "方程式は、ある式とある式が等しいという条件を表します。\n\n不等式は、ある式が別の式より大きい・小さいという条件を表します。\n\nどちらも、文字がどのような値なら条件を満たすかを調べるものです。\n\n数と式の単元では、計算だけでなく、条件を式に翻訳する力が重要になります。",
},
{
kind: "concept",
title: "同値変形",
body: "方程式や不等式を解くときは、解の集合が変わらないように式を変形します。\n\nこのような変形を同値変形といいます。\n\n方程式では、両辺に同じ数を足す、両辺から同じ数を引く、両辺に同じ0でない数をかける、両辺を同じ0でない数で割る、といった操作ができます。\n\n不等式でも同じように操作できますが、負の数をかけたり割ったりするときは、不等号の向きが変わります。",
},
{
kind: "workedExample",
title: "例1：一次方程式",
body: "$3x-5=10$ を解きます。\n\nまず両辺に $5$ を足します。\n\n$3x=15$\n\n次に両辺を $3$ で割ります。\n\n$x=5$\n\nしたがって、解は $x=5$ です。\n\n方程式では、両辺に同じ操作をして、文字だけを残すように変形します。",
},
{
kind: "workedExample",
title: "例2：一次不等式",
body: "$2x+3<11$ を解きます。\n\nまず両辺から $3$ を引きます。\n\n$2x<8$\n\n次に両辺を $2$ で割ります。\n\n$x<4$\n\nしたがって、解は $x<4$ です。",
},
{
kind: "workedExample",
title: "例3：負の数で割る不等式",
body: "$-3x+2\\leq11$ を解きます。\n\nまず両辺から $2$ を引きます。\n\n$-3x\\leq9$\n\n次に両辺を $-3$ で割ります。\n\nここで、負の数で割るので不等号の向きが変わります。\n\n$x\\geq-3$\n\nしたがって、解は $x\\geq-3$ です。\n\n不等式では、負の数でかける・割ると不等号の向きが変わることを必ず確認してください。",
},
{
kind: "concept",
title: "なぜ不等号の向きが変わるのか",
body: "例えば、$2<5$ は正しい不等式です。\n\nこの両辺に $-1$ をかけると、$-2$ と $-5$ になります。\n\n数直線上では、$-5$ より $-2$ の方が大きいので、\n\n$-2>-5$\n\nです。\n\nつまり、負の数をかけると大小関係が逆になります。\n\nだから、不等式で負の数をかけたり割ったりすると、不等号の向きが変わります。",
},
{
kind: "commonMistake",
title: "よくあるミス：不等号の向きを変え忘れる",
body: "$-2x<6$ を解くとき、両辺を $-2$ で割ります。\n\nこのとき、不等号の向きを変えなければなりません。\n\n正しくは、\n\n$x>-3$\n\nです。\n\n$x<-3$ としてしまうのは誤りです。\n\n不等式で負の数が出てきたら、最後に不等号の向きを確認する習慣をつけましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 方程式は等しい条件を表す\n- 不等式は大小関係の条件を表す\n- 解の集合を変えない変形を同値変形という\n- 不等式で負の数をかける・割ると不等号の向きが変わる\n- 文章題では、条件を式に翻訳することが重要\n- 一次不等式は、二次不等式や範囲の問題の土台になる",
},
],
checkQuestions: [
{
question: "$4x-7=9$ を解け。",
answer: "$4x=16$ より、$x=4$。",
hint: "まず7を移項する。",
},
{
question: "$3x+2\\geq11$ を解け。",
answer: "$3x\\geq9$ より、$x\\geq3$。",
hint: "正の数で割るので向きは変わらない。",
},
{
question: "$-2x+5<13$ を解け。",
answer: "$-2x<8$。両辺を $-2$ で割って、$x>-4$。",
hint: "負の数で割ると不等号の向きが変わる。",
},
],
relatedPracticeLinks: [
{ label: "数と式 中核講義", href: "/common-test/lectures/numbers-expressions-core-skills", description: "不等式の範囲から必要条件・十分条件の判定へつなげる" },
{ label: "一次不等式 演習", href: "/units/numbers-and-expressions" },
{ label: "二次関数 講座", href: "/courses/math-1a/quadratic" },
],
qualityTags: ["一次方程式", "一次不等式", "同値変形", "確認問題3問"],
},
{
lessonId: "absolute-value-basic",
lessonTitle: "絶対値と場合分け",
lessonDescription: "絶対値を距離として理解し、場合分けで式を外す。",
level: "standard",
estimatedMinutes: 75,
prerequisites: ["一次方程式と一次不等式", "数直線"],
goals: [
"絶対値を数直線上の距離として理解できる",
"$|x|$ の意味を説明できる",
"絶対値を含む方程式を解ける",
"絶対値を含む不等式を数直線で考えられる",
"場合分けの入口として絶対値を扱える",
],
lessonBlocks: [
{
kind: "intro",
title: "絶対値は距離",
body: "絶対値は、数直線上での距離を表します。\n\n例えば、$|3|=3$ です。これは、$3$ が $0$ から3だけ離れているという意味です。\n\nまた、$|-3|=3$ です。$-3$ も $0$ から3だけ離れているからです。\n\n距離は負にならないので、絶対値は必ず0以上になります。\n\n絶対値を記号の操作としてだけ覚えるのではなく、距離として理解することが重要です。",
},
{
kind: "formula",
title: "絶対値の定義",
body: "$|x|$ は、$x$ が0以上か負かで外し方が変わります。\n\n$x$ が0以上なら、そのまま $x$ です。\n\n$x$ が負なら、符号を変えて $-x$ になります。",
formula: "|x|=\\begin{cases}x&(x\\geq0)\\\\ -x&(x<0)\\end{cases}",
},
{
kind: "concept",
title: "絶対値の中身で場合分けする",
body: "絶対値を含む式では、絶対値の中身が0以上か負かで場合分けします。\n\n例えば、$|x-2|$ を考えます。\n\n中身は $x-2$ です。\n\n$x-2\\geq0$、つまり $x\\geq2$ のとき、$|x-2|=x-2$ です。\n\n$x-2<0$、つまり $x<2$ のとき、$|x-2|=-(x-2)=-x+2$ です。\n\n絶対値は、中身の符号で外し方が変わります。",
},
{
kind: "workedExample",
title: "例1：絶対値方程式",
body: "$|x-3|=5$ を解きます。\n\nこれは、$x$ と $3$ の距離が $5$ であるという意味です。\n\n数直線で考えると、$3$ から5だけ離れた点は、右に5進んだ $8$ と、左に5進んだ $-2$ です。\n\nしたがって、\n\n$x=8,-2$\n\nです。\n\n方程式として考えるなら、\n\n$x-3=5$ または $x-3=-5$\n\nを解いても同じ結果になります。",
},
{
kind: "workedExample",
title: "例2：絶対値不等式",
body: "$|x-2|<4$ を解きます。\n\nこれは、$x$ と $2$ の距離が $4$ より小さいという意味です。\n\n数直線上で、$2$ からの距離が4未満の範囲は、\n\n$-2<x<6$\n\nです。\n\nなぜなら、$2$ から左に4進むと $-2$、右に4進むと $6$ だからです。\n\n絶対値不等式は、距離として考えると理解しやすくなります。",
},
{
kind: "commonMistake",
title: "よくあるミス：絶対値をただ外す",
body: "$|x-2|$ をいつでも $x-2$ としてはいけません。\n\n$x\\geq2$ なら $x-2$ は0以上なので、そのままでよいです。\n\nしかし、$x<2$ なら $x-2$ は負なので、$|x-2|=-(x-2)$ とする必要があります。\n\n絶対値の中身が正か負かを見ずに外すと、答えが大きくずれます。",
},
{
kind: "summary",
title: "まとめ",
body: "- 絶対値は数直線上の距離\n- 絶対値は必ず0以上\n- $|x|$ は $x\\geq0$ なら $x$、$x<0$ なら $-x$\n- 絶対値の中身で場合分けする\n- $|x-a|=r$ は、aから距離rの点を表す\n- $|x-a|<r$ は、aから距離r未満の範囲を表す\n- 絶対値は場合分けの重要な入口",
},
],
checkQuestions: [
{
question: "$|x-4|=3$ を解け。",
answer: "$x-4=3$ または $x-4=-3$ より、$x=7,1$。",
hint: "4から距離3の点。",
},
{
question: "$|x+1|<5$ を解け。",
answer: "$-5<x+1<5$ より、$-6<x<4$。",
hint: "$x$ と $-1$ の距離が5未満。",
},
{
question: "$x<2$ のとき、$|x-2|$ を絶対値なしで表せ。",
answer: "$x-2<0$ なので、$|x-2|=-(x-2)=-x+2$。",
hint: "中身が負なら符号を変える。",
},
],
relatedPracticeLinks: [
{ label: "数と式 中核講義", href: "/common-test/lectures/numbers-expressions-core-skills", description: "絶対値の場合分けを代表例題で確認する" },
{ label: "絶対値 演習", href: "/units/numbers-and-expressions" },
{ label: "集合と命題 講座", href: "/courses/math-1a/sets-and-logic" },
],
qualityTags: ["絶対値", "場合分け", "数直線", "確認問題3問"],
},
];

const NUMBERS_EXPRESSIONS_ADVANCED: CourseLesson[] = [
{
lessonId: "expression-transformation-strategy",
lessonTitle: "式変形の戦略",
lessonDescription: "展開・因数分解・置き換えを使い、複雑な式を見通しよく変形する。",
level: "advanced",
estimatedMinutes: 85,
prerequisites: ["因数分解の基本", "実数と平方根", "絶対値と場合分け"],
goals: [
"複雑な式をどの方針で変形するか判断できる",
"共通因数・公式型・置き換えを使い分けられる",
"対称性のある式を見抜ける",
"二次関数・方程式・不等式への接続を意識できる",
"難関大レベルの式変形問題の入口に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "難しい式変形は方針が大切",
body: "上級の数と式では、ただ展開するだけ、ただ因数分解するだけでは足りない問題が増えます。\n\n複雑な式を見たとき、まず考えるべきなのは、どの形にしたいかです。\n\n展開すべきなのか、因数分解すべきなのか、置き換えるべきなのか。\n\n式変形の目的は、式をきれいにすることではなく、問題を解きやすい形にすることです。\n\n例えば、方程式を解きたいなら因数分解が有効なことが多いです。最大最小を考えたいなら平方完成が有効です。対称な式なら、置き換えが有効なことがあります。",
},
{
kind: "comparisonTable",
title: "式変形の方針",
body: "式の形を見て、どの変形が有効かを判断します。",
columns: ["見える形", "有効な方針", "目的"],
rows: [
{
cells: ["共通因数がある", "くくる", "式を簡単にする"],
highlight: true,
},
{
cells: ["2乗の形がある", "乗法公式・平方完成", "構造を見る"],
},
{
cells: ["同じかたまりが何度も出る", "置き換え", "次数を下げる"],
},
{
cells: ["対称性がある", "和と積で整理", "見通しをよくする"],
},
{
cells: ["方程式になっている", "因数分解", "解を求める"],
},
],
},
{
kind: "workedExample",
title: "例1：置き換えで見通しをよくする",
body: "$(x^2+3x)^2-5(x^2+3x)+6$ を因数分解します。\n\nこの式では、$x^2+3x$ というかたまりが2回出ています。\n\nそこで、$X=x^2+3x$ と置きます。\n\nすると式は、\n\n$X^2-5X+6$\n\nになります。\n\nこれは因数分解できて、\n\n$X^2-5X+6=(X-2)(X-3)$\n\nです。\n\n元に戻すと、\n\n$(x^2+3x-2)(x^2+3x-3)$\n\nです。\n\nこのように、同じかたまりが何度も出るときは置き換えが有効です。",
},
{
kind: "workedExample",
title: "例2：平方完成で見方を変える",
body: "$x^2-6x+13$ の最小値を考えます。\n\nそのままでは最小値が見えにくいので、平方完成します。\n\n$x^2-6x+13=(x-3)^2+4$\n\n$(x-3)^2$ は必ず0以上なので、\n\n$(x-3)^2+4\\geq4$\n\nです。\n\nしたがって、この式の最小値は $4$ です。\n\n式変形は計算だけでなく、式の性質を読むためにも使います。",
},
{
kind: "workedExample",
title: "例3：対称性を利用する",
body: "$x+y=5$、$xy=6$ のとき、$x^2+y^2$ を求めます。\n\n直接 $x$ と $y$ を求める必要はありません。\n\n公式\n\n$x^2+y^2=(x+y)^2-2xy$\n\nを使います。\n\n$x+y=5$、$xy=6$ を代入すると、\n\n$x^2+y^2=5^2-2\\cdot6=25-12=13$\n\nです。\n\n対称な式では、和と積で整理できないかを考えると計算が短くなります。",
},
{
kind: "commonMistake",
title: "よくあるミス：何でも展開してしまう",
body: "複雑な式を見ると、とりあえず展開したくなるかもしれません。\n\nしかし、展開するとかえって構造が見えなくなることがあります。\n\n例えば、$(x^2+3x)^2-5(x^2+3x)+6$ は、展開するより $x^2+3x$ を置き換える方が簡単です。\n\n式変形では、展開する前に、かたまりや共通因数がないかを確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 式変形では、目的に応じて形を選ぶ\n- 共通因数があればくくる\n- 同じかたまりがあれば置き換える\n- 最大最小なら平方完成が有効\n- 対称式は和と積で整理できることがある\n- 何でも展開するのではなく、構造を見る",
},
],
checkQuestions: [
{
question: "$(x^2+x)^2-3(x^2+x)+2$ を因数分解する方針を述べよ。",
answer: "$X=x^2+x$ と置く。すると $X^2-3X+2=(X-1)(X-2)$ と因数分解できる。",
hint: "同じかたまりを置き換える。",
},
{
question: "$x^2-4x+9$ の最小値を求めよ。",
answer: "$x^2-4x+9=(x-2)^2+5$ なので、最小値は $5$。",
hint: "平方完成する。",
},
{
question: "$x+y=7$、$xy=10$ のとき、$x^2+y^2$ を求めよ。",
answer: "$x^2+y^2=(x+y)^2-2xy=49-20=29$。",
hint: "和と積で表す。",
},
],
relatedPracticeLinks: [
{ label: "数と式 中核講義", href: "/common-test/lectures/numbers-expressions-core-skills", description: "対称式・整数部分への変形判断を総復習する" },
{ label: "式変形 発展演習", href: "/units/numbers-and-expressions" },
{ label: "二次関数 講座", href: "/courses/math-1a/quadratic" },
],
qualityTags: ["式変形", "置き換え", "対称式", "平方完成", "確認問題3問"],
},
{
lessonId: "inequality-strategy-basic",
lessonTitle: "不等式の考え方と証明",
lessonDescription: "大小比較・平方の非負性・因数分解を使って、不等式を証明する。",
level: "advanced",
estimatedMinutes: 85,
prerequisites: ["一次不等式", "因数分解", "平方完成"],
goals: [
"不等式の証明で差を取る方針を理解できる",
"平方の非負性を使える",
"因数分解によって符号を判断できる",
"相加平均・相乗平均の入口を理解できる",
"難関大レベルの不等式問題の土台を作れる",
],
lessonBlocks: [
{
kind: "intro",
title: "不等式は差を見ればよい",
body: "$A\\geq B$ を証明したいとき、直接AとBを比べるのが難しいことがあります。\n\nそのようなときは、差 $A-B$ を考えます。\n\nもし $A-B\\geq0$ が示せれば、$A\\geq B$ が分かります。\n\nつまり、不等式の証明では、左辺から右辺を引いて、その式が0以上であることを示すのが基本です。\n\nこの考え方は、数学IAだけでなく、数学II・B・C、数学IIIでもずっと使います。",
},
{
kind: "strategy",
title: "不等式証明の基本方針",
body: "不等式を証明するときは、次の方針を考えます。\n\n1. 左辺と右辺の差を取る\n2. 因数分解できないか見る\n3. 平方の形にできないか見る\n4. 各因数の符号を確認する\n5. 0以上または0以下であることを示す\n\n特に、平方は必ず0以上であるという性質が重要です。",
},
{
kind: "concept",
title: "平方の非負性",
body: "どんな実数 $x$ に対しても、$x^2\\geq0$ です。\n\nこれは、不等式証明で最も基本的な事実です。\n\n例えば、$(x-3)^2\\geq0$ なので、\n\n$x^2-6x+9\\geq0$\n\nが成り立ちます。\n\nまた、$x^2-6x+13=(x-3)^2+4$ なので、常に $4$ 以上であることが分かります。\n\n平方完成は、不等式の証明にも使えます。",
},
{
kind: "workedExample",
title: "例1：差を取って証明する",
body: "すべての実数 $x$ に対して、$x^2+1\\geq2x$ を証明します。\n\n左辺から右辺を引きます。\n\n$x^2+1-2x=x^2-2x+1$\n\nこれは、\n\n$(x-1)^2$\n\nです。\n\n平方は常に0以上なので、\n\n$(x-1)^2\\geq0$\n\nしたがって、\n\n$x^2+1-2x\\geq0$\n\nよって、\n\n$x^2+1\\geq2x$\n\nが成り立ちます。\n\n等号は $x=1$ のときに成り立ちます。",
},
{
kind: "workedExample",
title: "例2：因数分解で符号を見る",
body: "$x\\geq2$ のとき、$x^2-4\\geq0$ を示します。\n\n左辺を因数分解すると、\n\n$x^2-4=(x-2)(x+2)$\n\nです。\n\n$x\\geq2$ なので、$x-2\\geq0$ です。\n\nまた、$x+2\\geq4>0$ です。\n\nしたがって、$(x-2)(x+2)\\geq0$ となり、$x^2-4\\geq0$ が示されます。\n\n因数分解したら、それぞれの因数の符号を確認することが重要です。",
},
{
kind: "formula",
title: "相加平均・相乗平均の入口",
body: "$a>0$、$b>0$ のとき、次の不等式が成り立ちます。\n\nこれは、正の数の和と積の関係を表す重要な不等式です。",
formula: "\\frac{a+b}{2}\\geq\\sqrt{ab}",
},
{
kind: "workedExample",
title: "例3：相加平均・相乗平均の使い方",
body: "$x>0$ のとき、$x+\\frac{1}{x}\\geq2$ を示します。\n\n相加平均・相乗平均を使います。\n\n$a=x$、$b=\\frac{1}{x}$ とすると、どちらも正です。\n\nしたがって、\n\n$\\frac{x+\\frac{1}{x}}{2}\\geq\\sqrt{x\\cdot\\frac{1}{x}}$\n\n右辺は $\\sqrt{1}=1$ です。\n\nよって、\n\n$\\frac{x+\\frac{1}{x}}{2}\\geq1$\n\n両辺を2倍して、\n\n$x+\\frac{1}{x}\\geq2$\n\nです。\n\n等号は $x=1$ のときに成り立ちます。",
},
{
kind: "commonMistake",
title: "よくあるミス：差を取る向きを決めない",
body: "不等式を証明するときは、どちらからどちらを引くかをはっきりさせます。\n\n$A\\geq B$ を示したいなら、$A-B\\geq0$ を示します。\n\n逆に $B-A$ を取るなら、$B-A\\leq0$ を示す必要があります。\n\n差を取ったあと、その式が0以上なのか0以下なのかを意識しないと、結論が逆になることがあります。",
},
{
kind: "summary",
title: "まとめ",
body: "- $A\\geq B$ を示すには $A-B\\geq0$ を示す\n- 平方は常に0以上\n- 平方完成は不等式証明にも使える\n- 因数分解したら各因数の符号を見る\n- 相加平均・相乗平均は正の数に対して使う\n- 等号成立条件も確認する",
},
],
checkQuestions: [
{
question: "すべての実数 $x$ に対して、$x^2+4\\geq4x$ を証明せよ。",
answer: "左辺から右辺を引くと、$x^2-4x+4=(x-2)^2\\geq0$。よって $x^2+4\\geq4x$。",
hint: "差を取って平方の形にする。",
},
{
question: "$x\\geq3$ のとき、$x^2-9\\geq0$ を因数分解で示せ。",
answer: "$x^2-9=(x-3)(x+3)$。$x\\geq3$ より $x-3\\geq0$、$x+3>0$。よって積は0以上。",
hint: "各因数の符号を見る。",
},
{
question: "$x>0$ のとき、$x+\\frac{4}{x}\\geq4$ を相加平均・相乗平均で示せ。",
answer: "$x$ と $\\frac{4}{x}$ は正。相加平均・相乗平均より、$\\frac{x+\\frac{4}{x}}{2}\\geq\\sqrt{4}=2$。よって $x+\\frac{4}{x}\\geq4$。",
hint: "積が4になる2つの正の数を見る。",
},
],
relatedPracticeLinks: [
{ label: "数と式 中核講義", href: "/common-test/lectures/numbers-expressions-core-skills", description: "不等式の範囲と条件判定のつながりを確認する" },
{ label: "不等式 証明演習", href: "/units/numbers-and-expressions" },
{ label: "二次関数 最大最小", href: "/courses/math-1a/quadratic/quadratic-max-min-domain" },
],
qualityTags: ["不等式", "平方の非負性", "相加相乗", "旧帝大準備", "確認問題3問"],
},
{
lessonId: "numbers-expressions-exam-standard",
lessonTitle: "数と式の融合問題",
lessonDescription: "式変形・因数分解・平方根・不等式を組み合わせた入試標準から難関大入口の問題を切り崩す。",
level: "advanced",
estimatedMinutes: 90,
prerequisites: ["式変形の戦略", "不等式の考え方と証明", "実数と平方根"],
goals: [
"複数の式変形を組み合わせられる",
"因数分解・置き換え・平方完成を使い分けられる",
"不等式や最大最小に式変形を接続できる",
"条件式から求めたい式を作れる",
"難関大レベルの代数問題の入口に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "数と式の上級問題は道具の組み合わせ",
body: "数と式の融合問題では、展開だけ、因数分解だけ、平方根だけで終わることは多くありません。\n\n条件式を変形し、求めたい式に合わせて形を作り、不等式や最大最小へつなげる必要があります。\n\nこの単元は地味に見えますが、難関大の数学では非常に重要です。\n\nなぜなら、ほぼすべての問題で式変形が必要になるからです。\n\n数と式が強い人は、どの単元でも計算の見通しがよくなります。",
},
{
kind: "strategy",
title: "融合問題の確認リスト",
body: "数と式の融合問題では、次の順番で考えます。\n\n1. 条件式と求めたい式を見比べる\n2. 展開するか因数分解するかを決める\n3. 同じかたまりがあれば置き換える\n4. 平方の形があれば平方完成する\n5. 不等式なら差を取る\n6. 根号があれば有理化や平方を考える\n7. 最後に条件を使い切ったか確認する\n\n大切なのは、式変形の目的を持つことです。",
},
{
kind: "workedExample",
title: "例1：条件式から値を求める",
body: "$x+\\frac{1}{x}=3$ のとき、$x^2+\\frac{1}{x^2}$ の値を求めます。ただし $x\\neq0$ とします。\n\n求めたい式には2乗があるので、条件式を2乗します。\n\n$\\left(x+\\frac{1}{x}\\right)^2=3^2$\n\n左辺を展開すると、\n\n$x^2+2+\\frac{1}{x^2}=9$\n\nしたがって、\n\n$x^2+\\frac{1}{x^2}=7$\n\nです。\n\nこの問題では、条件式を求めたい形に近づけるために2乗しました。",
},
{
kind: "workedExample",
title: "例2：置き換えと因数分解",
body: "$(x^2-2x)^2-4(x^2-2x)-5=0$ を解く方針を考えます。\n\n同じかたまり $x^2-2x$ が繰り返し出ています。\n\nそこで、$X=x^2-2x$ と置きます。\n\nすると、\n\n$X^2-4X-5=0$\n\nです。\n\n因数分解すると、\n\n$(X-5)(X+1)=0$\n\nしたがって、\n\n$X=5$ または $X=-1$\n\nです。\n\n元に戻して、\n\n$x^2-2x=5$ または $x^2-2x=-1$\n\nを解きます。\n\nこのように、置き換えは複雑な式を二段階に分けるための道具です。",
},
{
kind: "workedExample",
title: "例3：不等式への接続",
body: "すべての実数 $x$ に対して、$x^2-4x+7\\geq3$ を示します。\n\n左辺から右辺を引きます。\n\n$x^2-4x+7-3=x^2-4x+4$\n\nこれは、\n\n$(x-2)^2$\n\nです。\n\n平方は常に0以上なので、\n\n$(x-2)^2\\geq0$\n\nしたがって、\n\n$x^2-4x+7\\geq3$\n\nが成り立ちます。\n\nこの問題は、平方完成と不等式証明がつながっています。",
},
{
kind: "commonMistake",
title: "よくあるミス：条件を使い切らない",
body: "融合問題では、条件式が与えられているのに、それをうまく使えないことがあります。\n\n例えば、$x+\\frac{1}{x}=3$ が与えられているなら、求めたい式をこの形に近づけるのが基本です。\n\n条件式をただ眺めるのではなく、2乗する、移項する、因数分解するなどして、求めたい式との関係を作ります。\n\n条件式と求めたい式を見比べる習慣を持ちましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 数と式の融合問題では、複数の道具を組み合わせる\n- 条件式と求めたい式を見比べる\n- 同じかたまりは置き換える\n- 平方の形は平方完成する\n- 不等式では差を取る\n- 根号があるときは有理化や平方を考える\n- 式変形は、数学全体の基礎体力",
},
],
checkQuestions: [
{
question: "$x+\\frac{1}{x}=4$ のとき、$x^2+\\frac{1}{x^2}$ の値を求めよ。ただし $x\\neq0$。",
answer: "両辺を2乗して、$x^2+2+\\frac{1}{x^2}=16$。よって $x^2+\\frac{1}{x^2}=14$。",
hint: "条件式を2乗する。",
},
{
question: "$(x^2+x)^2-5(x^2+x)+6=0$ を解くとき、まず何と置くとよいか。",
answer: "$X=x^2+x$ と置くと、$X^2-5X+6=0$ になる。",
hint: "同じかたまりを置き換える。",
},
{
question: "すべての実数 $x$ に対して、$x^2+2x+5\\geq4$ を示せ。",
answer: "左辺から右辺を引くと、$x^2+2x+1=(x+1)^2\\geq0$。よって $x^2+2x+5\\geq4$。",
hint: "差を取って平方にする。",
},
],
relatedPracticeLinks: [
{ label: "数と式 中核講義", href: "/common-test/lectures/numbers-expressions-core-skills", description: "本番形式演習で有理化・対称式・整数部分を総仕上げする" },
{ label: "数と式 発展演習", href: "/units/numbers-and-expressions" },
{ label: "二次関数 講座", href: "/courses/math-1a/quadratic" },
{ label: "過去問道場", href: "/dojo" },
],
qualityTags: ["旧帝大準備", "式変形", "不等式", "置き換え", "確認問題3問"],
},
];

type NumbersExpressionsEnhancement = {
leadBlocks?: CourseLesson["lessonBlocks"];
tailBlocks?: CourseLesson["lessonBlocks"];
links: CourseLesson["relatedPracticeLinks"];
};

const NUMBERS_EXPRESSIONS_COMMON_LINKS: CourseLesson["relatedPracticeLinks"] = [
{ label: "問題解体型講座：第1問前半 数と式・命題融合", href: "/common-test/problem-lectures/ct-ia-q1-front-algebra-logic-abs", description: "有理化・対称式・整数部分・絶対値・命題をPDF問題で確認する" },
{ label: "共通テスト数学IA対策トップ", href: "/common-test/math-1a", description: "冊子型模試・問題解体型講座・大問別演習へ戻る" },
{ label: "数と式 演習", href: "/units/numbers-and-expressions", description: "公開問題で展開・因数分解・根号・絶対値を確認する" },
{ label: "共通テスト型本番模試 第1回 第1問", href: "/common-test/simulator/common-test-math-1a-manual-001", description: "有理化・対称式・整数部分を本番形式で復習する" },
{ label: "共通テスト型本番模試 第2回 第1問", href: "/common-test/simulator/common-test-math-1a-manual-002", description: "数と式から命題・図形へ接続する流れを確認する" },
];

const NUMBERS_EXPRESSIONS_LEARNING_MAP_LINK: CourseLesson["relatedPracticeLinks"] = [
{ label: "数と式：問題タイプ別ロードマップ", href: "/courses/math-1a/numbers-and-expressions/numbers-expressions-learning-map", description: "初学者・共通テスト・上位対策・苦手別の戻り方を確認する" },
];

const NUMBERS_EXPRESSIONS_EQUIVALENCE_EXCLUSION_LINK: CourseLesson["relatedPracticeLinks"] = [
{ label: "同値変形・除外値完全攻略", href: "/courses/math-1a/numbers-and-expressions/numbers-expressions-equivalence-exclusion", description: "分母0、両辺二乗、根号条件、絶対値の事故をまとめて回収する" },
];

const NUMBERS_EXPRESSIONS_EQUIVALENCE_BRIDGE_LESSON_IDS = new Set([
"real-numbers-and-radicals",
"linear-equations-inequalities",
"absolute-value-basic",
"expression-transformation-strategy",
"numbers-expressions-exam-standard",
]);

const NUMBERS_EXPRESSIONS_LEARNING_MAP: CourseLesson = {
lessonId: "numbers-expressions-learning-map",
lessonTitle: "数と式：問題タイプ別ロードマップ",
lessonDescription: "数と式を、公式暗記ではなく問題タイプごとの判断順として整理する導入講座。",
level: "beginner",
estimatedMinutes: 35,
prerequisites: ["正負の数", "文字式の基本"],
goals: [
"数と式で学ぶ道具の全体像を説明できる",
"初学者・共通テスト・上位対策の学習順を選べる",
"苦手な問題タイプから戻るべき講座を判断できる",
"式変形で保存する条件と確認する条件を意識できる",
],
lessonBlocks: [
{
kind: "intro",
title: "数と式は計算公式の単元ではない",
body: "数と式は、公式を覚えて計算量を増やす単元ではありません。\n\n本質は、式変形で何が保存され、どこで条件が増減し、どこで余分な解や除外値が発生するかを管理することです。\n\nこの単元では、展開・因数分解・有理化・絶対値・平方根・不等式・命題を、問題文を見た瞬間にどの道具で処理するか判断できる状態を目指します。",
emphasis: "式を変える前に、何を保存し、何を確認するかを決める。",
},
{
kind: "comparisonTable",
title: "4フェーズで見る数と式",
body: "単元全体を、基礎計算から本番判断まで段階化します。",
columns: ["フェーズ", "扱う内容", "到達目標"],
rows: [
{ cells: ["Phase 1 Core", "式の計算、展開、因数分解、平方根、絶対値", "式の部品を読み、基本処理を安全に実行する"], highlight: true },
{ cells: ["Phase 2 Main Problem Types", "式の値、置き換え、不等式、集合と命題、必要十分条件", "条件を見て使う道具を選ぶ"] },
{ cells: ["Phase 3 Advanced Traps", "同値変形、分母0、両辺二乗、根号条件、絶対値の場合分け", "答え候補から余分な解と除外値を落とす"] },
{ cells: ["Phase 4 Synthesis", "共通テスト接続、入試標準の融合問題、ミス防止チェック", "複数の道具を順番に選び、最後まで検算する"] },
],
},
{
kind: "comparisonTable",
title: "目的別の学習ルート",
body: "同じ単元でも、目的によって優先順位が変わります。",
columns: ["目的", "進む順番", "戻る基準"],
rows: [
{ cells: ["初学者ルート", "式の計算 → 展開・因数分解 → 平方根 → 絶対値", "計算の意味や符号で止まるならCoreに戻る"], highlight: true },
{ cells: ["共通テスト対策ルート", "式の値 → 不等式 → 集合と命題 → 条件判断 → 共通テスト接続", "選択肢を消せないなら判断表に戻る"] },
{ cells: ["私大・上位対策ルート", "対称式 → 置き換え → 根号・絶対値融合 → 整数部分・小数部分 → 総合問題", "式の形を選べないなら式変形の戦略に戻る"] },
{ cells: ["苦手別ルート", "因数分解、根号、絶対値、不等式、命題、除外値を症状別に戻る", "ミスの種類を1つに分けてから復習する"] },
],
},
{
kind: "stepByStep",
title: "初学者ルート",
body: "まずは計算が止まらない状態を作ります。",
steps: [
{ step: 1, label: "式の見方", body: "項・係数・次数を読み、何について整理する式かを確認する。" },
{ step: 2, label: "展開", body: "分配法則と乗法公式で、括弧を安全に外す。" },
{ step: 3, label: "因数分解", body: "共通因数、平方の差、完全平方、二次式の順に試す。" },
{ step: 4, label: "平方根", body: "平方数を外す、有理化する、根号の中身の条件を見る。" },
{ step: 5, label: "絶対値", body: "中身が0になる点を境界にして、符号で場合分けする。" },
],
},
{
kind: "stepByStep",
title: "共通テスト対策ルート",
body: "第1問前半では、計算そのものより、次に使う条件を読む力が問われます。",
steps: [
{ step: 1, label: "式の値", body: "条件式と求めたい式の共通部分を見つける。" },
{ step: 2, label: "不等式", body: "端点・符号・等号の有無を数直線に落とす。" },
{ step: 3, label: "集合と命題", body: "条件を集合として見て、矢印と包含関係を比べる。" },
{ step: 4, label: "条件判断", body: "必要条件・十分条件・反例を、境界値で確認する。" },
{ step: 5, label: "本番接続", body: "中核講義や模試第1問で、有理化・対称式・整数部分・命題をまとめて確認する。" },
],
},
{
kind: "strategy",
title: "苦手別の戻り先",
body: "- 因数分解で止まる人：因数分解の基本、式変形の戦略\n- 平方根でミスる人：実数と平方根、同値変形・除外値完全攻略\n- 絶対値が苦手な人：絶対値と場合分け、同値変形・除外値完全攻略\n- 不等式で符号を間違える人：一次方程式と一次不等式、不等式の考え方と証明\n- 命題が苦手な人：集合と命題講座、必要条件・十分条件の判断表\n- 余分な解を出す人：同値変形・除外値完全攻略",
},
{
kind: "checkpoint",
title: "本番での5秒確認",
body: "問題文を読んだら、1. 求めたいもの、2. 与えられた条件、3. 使えそうな形、4. 変形で条件が増減する場所、5. 最後に代入検算できる場所、の順に見ます。\n\n共通テストでは、正攻法で全部計算する前に、どの条件を使えば選択肢が消えるかを考えます。",
},
{
kind: "summary",
title: "まとめ",
body: "- 数と式は、式変形と条件管理の単元\n- 初学者はCoreを順番に固める\n- 共通テスト対策では、式の値・不等式・命題を条件判断としてつなぐ\n- 上位対策では、対称式・置き換え・根号・絶対値を融合して扱う\n- 分母0、両辺二乗、根号条件、絶対値の境界は必ず確認する",
},
{
kind: "nextStep",
title: "次はCoreへ",
body: "最初に読むなら「式の見方と整式の基本」へ進みます。すでに基礎計算ができる人は「式変形の戦略」から入り、余分な解や除外値が多い人は「同値変形・除外値完全攻略」に戻ってください。",
},
],
checkQuestions: [
{
question: "数と式で、計算前にまず確認したいことを1つ答えよ。",
answer: "求めたいもの、与えられた条件、使えそうな式の形、条件が増減する変形の有無などを確認する。",
hint: "手を動かす前の判断を答える。",
},
{
question: "両辺二乗を使った後に必ず行う確認は何か。",
answer: "二乗前の元の式に代入して、余分な解が混ざっていないか確認する。",
hint: "二乗は解候補を増やすことがある。",
},
{
question: "必要条件・十分条件を判断するとき、式だけで迷ったら何として見るとよいか。",
answer: "条件を満たす集合として見て、包含関係と矢印を確認する。",
hint: "集合と命題への接続。",
},
],
relatedPracticeLinks: [
{ label: "式の見方と整式の基本", href: "/courses/math-1a/numbers-and-expressions/polynomial-basics", description: "初学者ルートの入口" },
{ label: "式変形の戦略", href: "/courses/math-1a/numbers-and-expressions/expression-transformation-strategy", description: "対称式・置き換え・式の値を整理する" },
...NUMBERS_EXPRESSIONS_EQUIVALENCE_EXCLUSION_LINK,
{ label: "集合と命題 講座", href: "/courses/math-1a/sets-and-logic", description: "必要条件・十分条件を単元として復習する" },
{ label: "数と式 演習", href: "/units/numbers-and-expressions", description: "公開問題で学習ルートを確認する" },
],
qualityTags: ["学習ルート", "問題タイプ別", "共通テスト接続", "苦手別ルート", "確認問題3問"],
};

const NUMBERS_EXPRESSIONS_EQUIVALENCE_EXCLUSION: CourseLesson = {
lessonId: "numbers-expressions-equivalence-exclusion",
lessonTitle: "数と式：同値変形・除外値完全攻略",
lessonDescription: "分母0、両辺二乗、根号条件、絶対値の場合分けで余分な解や除外値を出さないための上級整理。",
level: "advanced",
estimatedMinutes: 70,
prerequisites: ["一次方程式と一次不等式", "実数と平方根", "絶対値と場合分け", "式変形の戦略"],
goals: [
"同値変形と非同値変形の違いを説明できる",
"分母0や根号の中身など、式変形前の条件を置ける",
"両辺二乗で出る余分な解を元の式で落とせる",
"絶対値の場合分けで境界値の抜け漏れを防げる",
"共通テスト・私大標準で最後に検算すべき場所を判断できる",
],
lessonBlocks: [
{
kind: "intro",
title: "式変形は解集合を管理する作業",
body: "方程式や不等式の式変形では、見た目をきれいにするだけでは不十分です。\n\n両辺に同じ数を足すような操作は、解集合をそのまま保存します。一方、分母を払う、両辺を二乗する、根号や絶対値を外す操作では、条件が増えたり、余分な解が混ざったりします。\n\n本番で大切なのは、変形のたびに「これは同値か」「除外値はあるか」「最後に元の式へ戻す必要があるか」を確認することです。",
emphasis: "式変形の安全性は、解集合が変わっていないかで判断する。",
},
{
kind: "comparisonTable",
title: "変形ごとの保存・増減チェック",
body: "同じ式変形でも、条件の扱いが違います。",
columns: ["操作", "保存されるもの", "事故る条件", "最後の確認"],
rows: [
{ cells: ["両辺に同じ式を足す・引く", "解集合は保存される", "移項時の符号ミス", "代入して符号を確認"], highlight: true },
{ cells: ["0でない数で掛ける・割る", "解集合は保存される", "割るものが0かもしれない", "0の場合を先に分ける"], highlight: true },
{ cells: ["分母を払う", "分母0を除けば同値", "除外値を答えに戻す", "分母が0にならないか確認"] },
{ cells: ["両辺二乗", "解候補が増えることがある", "符号が違う解も残る", "必ず元の式に代入する"] },
{ cells: ["根号を外す", "中身の非負条件が必要", "右辺が負のまま二乗する", "中身と右辺の範囲を確認"] },
{ cells: ["絶対値を外す", "区間ごとなら同値", "境界値の抜け・重複", "中身が0の点を数直線で確認"] },
],
},
{
kind: "stepByStep",
title: "安全な式変形の手順",
body: "事故が起こる問題では、次の順番で処理します。",
steps: [
{ step: 1, label: "定義域を置く", body: "分母が0でない、根号の中身が0以上、絶対値の境界などを先に書く。" },
{ step: 2, label: "変形の種類を判定する", body: "同値変形か、解候補を増やす変形か、条件を追加する変形かを分ける。" },
{ step: 3, label: "計算する", body: "展開・因数分解・置き換え・二乗など、目的に合う形へ変形する。" },
{ step: 4, label: "条件に戻す", body: "置換した文字の範囲、分母0、根号条件、場合分けの範囲へ候補を戻す。" },
{ step: 5, label: "元の式で検算する", body: "特に両辺二乗、分母払い、絶対値外しの後は、元の式や元の不等式に代入する。" },
],
},
{
kind: "workedExample",
title: "例1：両辺二乗で余分な解を落とす",
body: "問題：$\\sqrt{x+1}=x-1$ を解け。\n\nまず、根号の中身より $x+1\\geq0$、右辺が根号の値なので $x-1\\geq0$。したがって $x\\geq1$ が必要です。\n\n両辺を二乗すると、$x+1=(x-1)^2=x^2-2x+1$。整理して $x^2-3x=0$、つまり $x=0,3$。\n\nただし $x\\geq1$ を満たすのは $x=3$ だけです。さらに元の式に代入すると、左辺 $\\sqrt4=2$、右辺 $3-1=2$ なので成立します。\n\n答えは $x=3$ です。$x=0$ は二乗後の候補ですが、元の条件に合いません。",
},
{
kind: "workedExample",
title: "例2：分母を払う前に除外値を置く",
body: "問題：$\\frac{1}{x-2}=\\frac{3}{x^2-4}$ を解け。\n\n分母より、$x\\neq2$、$x\\neq-2$ を先に置きます。$x^2-4=(x-2)(x+2)$ なので、両辺に $(x-2)(x+2)$ を掛けると、$x+2=3$。\n\nよって $x=1$。これは除外値 $2,-2$ ではないので採用できます。\n\n分母を払うときは、先に除外値を書いておけば、最後に答えへ混ぜずに済みます。",
},
{
kind: "commonMistake",
title: "よくあるミス：変形後の式だけで答えを確定する",
body: "両辺二乗や分母払いの後に出た値は、まだ答え候補です。元の式で成り立つか、定義域から外れていないかを確認して初めて答えになります。\n\n特に、根号方程式では右辺が負の候補、分数方程式では分母を0にする候補、絶対値方程式では区間外の候補が混ざりやすいです。",
},
{
kind: "comparisonTable",
title: "事故パターン別の戻り先",
body: "ミスの種類ごとに戻る講座を分けます。",
columns: ["症状", "戻る講座", "見るポイント"],
rows: [
{ cells: ["因数分解で止まる", "因数分解の基本", "共通因数、平方の差、完全平方の順に試す"], highlight: true },
{ cells: ["根号で余分な解が出る", "実数と平方根", "中身と右辺の非負条件を書く"] },
{ cells: ["絶対値の範囲がずれる", "絶対値と場合分け", "中身が0になる点を境界にする"] },
{ cells: ["不等式で向きを間違える", "一次方程式と一次不等式", "負の数で掛ける・割る場面を見る"] },
{ cells: ["必要十分条件が逆になる", "集合と命題講座", "集合の包含と矢印を対応させる"] },
],
},
{
kind: "checkpoint",
title: "本番のミス防止チェックリスト",
body: "- 分母があるなら、分母0を先に除外したか\n- 根号があるなら、中身が0以上か\n- 根号方程式で二乗したなら、元の式へ代入したか\n- 絶対値があるなら、中身が0になる点で区間分けしたか\n- 文字で割ったなら、その文字が0の場合を分けたか\n- 置き換えたなら、置いた文字の範囲を最後に戻したか\n- 不等式で負の式を掛ける・割る可能性を確認したか",
},
{
kind: "summary",
title: "まとめ",
body: "- 同値変形は解集合を保存する\n- 分母払いでは除外値を先に置く\n- 両辺二乗では余分な解が混ざることがある\n- 根号方程式では中身と右辺の非負条件を見る\n- 絶対値は中身が0になる点で場合分けする\n- 最後は元の式・元の条件・置換前の範囲へ戻す",
},
{
kind: "nextStep",
title: "融合問題へ進む",
body: "除外値と余分な解の確認ができると、数と式の融合問題で崩れにくくなります。次は「数と式の融合問題」で、式の値・整数部分・不等式・命題をまとめて処理します。",
},
],
checkQuestions: [
{
question: "$\\sqrt{x}=a$ の形で両辺を二乗する前に確認したい条件を答えよ。",
answer: "$x\\geq0$ と $a\\geq0$ を確認する。二乗後に出た候補は元の式へ代入する。",
hint: "根号の値は負にならない。",
},
{
question: "$\\frac{x}{x-1}=2$ を解くとき、最初に書くべき除外値は何か。",
answer: "分母が0にならないように、$x\\neq1$ を先に書く。",
hint: "分母を見る。",
},
{
question: "$|x-3|=x-3$ が成り立つための条件を答えよ。",
answer: "$x-3\\geq0$、つまり $x\\geq3$。",
hint: "絶対値の中身が非負ならそのまま外せる。",
},
],
relatedPracticeLinks: [
...NUMBERS_EXPRESSIONS_LEARNING_MAP_LINK,
{ label: "式変形の戦略", href: "/courses/math-1a/numbers-and-expressions/expression-transformation-strategy", description: "対称式・置き換え・式の値の判断に戻る" },
{ label: "実数と平方根", href: "/courses/math-1a/numbers-and-expressions/real-numbers-and-radicals", description: "根号条件と有理化を復習する" },
{ label: "絶対値と場合分け", href: "/courses/math-1a/numbers-and-expressions/absolute-value-basic", description: "絶対値の境界と区間処理を復習する" },
{ label: "数と式の融合問題", href: "/courses/math-1a/numbers-and-expressions/numbers-expressions-exam-standard", description: "共通テスト・入試標準の総合問題へ進む" },
{ label: "数と式 演習", href: "/units/numbers-and-expressions", description: "公開問題で除外値チェックを確認する" },
{ label: "共通テスト数学IA対策トップ", href: "/common-test/math-1a", description: "第1問前半の演習へ戻る" },
],
qualityTags: ["同値変形", "除外値", "余分な解", "平方根条件", "確認問題3問"],
};

const NUMBERS_EXPRESSIONS_ENHANCEMENTS: Record<string, NumbersExpressionsEnhancement> = {
"polynomial-basics": {
leadBlocks: [
{
kind: "strategy",
title: "この講座の勝ち筋：式を計算対象ではなく構造として読む",
body: "5秒で見るポイントは、項・次数・係数・定数項です。計算を始める前に、何次式か、どの文字について整理するのか、同類項があるかを確認します。\n\n絶対に避けるミスは、文字が同じというだけで $x^2$ と $x$ をまとめることです。数と式の本番力は、いきなり計算する力ではなく、まず式の部品を正しく分ける力から始まります。",
},
{
kind: "checkpoint",
title: "本番での判断順",
body: "共通テスト第1問前半では、長い式でもまず 1. 文字の種類、2. 次数、3. 同類項、4. 使えそうなかたまり、5. 条件式との対応を見ます。ここを飛ばして展開すると、後半の対称式・整数部分・命題判定で方針が見えなくなります。",
},
],
tailBlocks: [
{
kind: "commonMistake",
title: "捨てるべき方針：見えた順に項を動かす",
body: "項を見えた順に移動すると、符号を落としやすくなります。次数ごとに縦に並べる、または同じ文字部分に印を付ける方が安全です。検算は、簡単な値（例：$x=1$）を代入して、整理前後で値が一致するかを見ると速いです。",
},
],
links: NUMBERS_EXPRESSIONS_COMMON_LINKS,
},
"expansion-formulas-basic": {
leadBlocks: [
{
kind: "comparisonTable",
title: "展開・因数分解・置換・対称式の使い分け",
body: "式変形は、手を動かす前に目的を決めます。",
columns: ["道具", "使う場面", "避けたい使い方"],
rows: [
{ cells: ["展開", "括弧を外して係数比較・同類項整理をしたい", "かたまりが見えているのに全部ばらす"], highlight: true },
{ cells: ["因数分解", "方程式を解く、符号を見る、共通因数を外す", "展開形のまま無理に解こうとする"] },
{ cells: ["置換", "同じかたまりが2回以上出る", "置いた文字の範囲を忘れる"] },
{ cells: ["対称式", "$a+b$ と $ab$ が与えられている", "先に $a,b$ 個別を解こうとする"] },
],
},
],
tailBlocks: [
{
kind: "workedExample",
title: "代表例題：展開する前に目的を確認する",
body: "問題：$(x+2)^2-(x-2)^2$ を簡単にせよ。\n\n標準解答：それぞれ展開すると、$(x^2+4x+4)-(x^2-4x+4)=8x$。\n\n別解：$A^2-B^2=(A+B)(A-B)$ と見て、$A=x+2$、$B=x-2$ と置く。すると $A+B=2x$、$A-B=4$ なので $8x$。\n\n捨てる方針：二乗を暗算で $x^2+4$ のように処理すること。真ん中の項が消えるかどうかを検算するため、$x=1$ を代入して左右が一致するか確認します。",
},
{
kind: "checkpoint",
title: "本番ならどこまで計算するか",
body: "選択肢問題では、完全展開より先に形を見ます。和と差の積、二乗の差、共通因数が見えたら、展開量を減らす方が速いです。展開した場合も、最後に $x=0$ や $x=1$ で検算します。",
},
],
links: NUMBERS_EXPRESSIONS_COMMON_LINKS,
},
"factorization-basic": {
leadBlocks: [
{
kind: "strategy",
title: "この講座の勝ち筋：まず共通因数、次に公式型",
body: "5秒で見るポイントは、全項に共通する数・文字、定数項の符号、平方の形です。因数分解では、とりあえず足して掛ける2数を探す前に、共通因数を外せないかを確認します。\n\n絶対に避けるミスは、先頭係数や共通因数を無視して $(x+p)(x+q)$ 型に押し込むことです。",
},
{
kind: "comparisonTable",
title: "因数分解の判断表",
body: "因数分解は上から順に試すと漏れが減ります。",
columns: ["最初に見るもの", "使う道具", "検算"],
rows: [
{ cells: ["全項に共通する因数", "共通因数でくくる", "展開して全項に戻るか"], highlight: true },
{ cells: ["平方の差", "$a^2-b^2=(a+b)(a-b)$", "真ん中の項が本当にないか"] },
{ cells: ["完全平方", "$a^2\\pm2ab+b^2$", "真ん中が $2ab$ か"] },
{ cells: ["二次式", "足して一次係数、掛けて定数項", "符号を掛け算と足し算の両方で確認"] },
],
},
],
tailBlocks: [
{
kind: "checkpoint",
title: "誤答分析：因数分解後は必ず展開して戻す",
body: "因数分解の検算は展開です。特に符号が混ざる式では、候補を作ったら必ず展開して、一次係数と定数項が元の式に戻るか確認します。本番では全展開しなくても、真ん中の項と定数項だけ確認すれば多くのミスを回収できます。",
},
],
links: NUMBERS_EXPRESSIONS_COMMON_LINKS,
},
"real-numbers-and-radicals": {
leadBlocks: [
{
kind: "comparisonTable",
title: "根号計算・有理化・二乗の使い分け",
body: "根号は、何を消したいかで道具を選びます。",
columns: ["状況", "優先する道具", "注意点"],
rows: [
{ cells: ["根号の中に平方数がある", "平方数を外へ出す", "$\\sqrt{a+b}$ を分解しない"], highlight: true },
{ cells: ["分母に $\\sqrt{a}$ がある", "同じ $\\sqrt{a}$ をかけて有理化", "分子にも必ず同じものをかける"] },
{ cells: ["分母が $a+\\sqrt{b}$ 型", "共役 $a-\\sqrt{b}$ をかける", "符号を逆にする場所を間違えない"] },
{ cells: ["両辺に根号がある方程式", "必要なら二乗", "二乗後は必ず元の式に代入して検算"] },
],
},
{
kind: "strategy",
title: "有理化の勝ち筋：分母を消したあと符号と分母を検算する",
body: "共通テスト第1問では、有理化した後の式を対称式や整数部分へつなげることがあります。分母が消えたか、共役の符号が合っているか、分母が正しく $a^2-b$ になっているかを確認します。\n\nとりあえず両辺二乗は捨てるべき方針です。二乗は同値性を壊すことがあるので、根号の符号条件と代入検算をセットにします。",
},
],
tailBlocks: [
{
kind: "workedExample",
title: "代表例題：共役で有理化する",
body: "問題：$\\frac{1}{2-\\sqrt{3}}$ を有理化せよ。\n\n標準解答：分母の共役 $2+\\sqrt{3}$ を分子分母にかける。$\\frac{1}{2-\\sqrt{3}}=\\frac{2+\\sqrt{3}}{(2-\\sqrt{3})(2+\\sqrt{3})}=2+\\sqrt{3}$。\n\n別解：$a=\\frac{1}{2-\\sqrt{3}}$ と置き、分母を払って $a(2-\\sqrt{3})=1$ と見るより、共役を使う方が短い。\n\n検算：$(2+\\sqrt{3})(2-\\sqrt{3})=1$ なので、逆数として正しい。",
},
{
kind: "commonMistake",
title: "よくある誤答：共役の符号を片方だけ変える",
body: "$2-\\sqrt{3}$ の共役は $2+\\sqrt{3}$ です。$-2+\\sqrt{3}$ ではありません。共役は根号部分の符号だけを変えます。分母が1になるタイプでは、最後に元の分母と掛けて1に戻るか検算します。",
},
],
links: NUMBERS_EXPRESSIONS_COMMON_LINKS,
},
"linear-equations-inequalities": {
leadBlocks: [
{
kind: "strategy",
title: "この講座の勝ち筋：同値変形を壊さない",
body: "方程式・不等式では、解集合を変えない操作だけを使います。計算する前に、両辺に何をしているか、負の数で割る場面があるか、分母が0にならないかを確認します。\n\n共通テストでは、式変形そのものよりも「この条件からどの範囲が残るか」が問われます。範囲は数直線に置くとミスが減ります。",
},
{
kind: "comparisonTable",
title: "求めたい量別の判断表",
body: "数と式の第1問では、問いの種類で見る場所が変わります。",
columns: ["求めたいもの", "最初に見る条件", "使う道具"],
rows: [
{ cells: ["式の値", "条件式と求めたい式の共通部分", "展開・因数分解・置換"], highlight: true },
{ cells: ["範囲", "不等式の向きと端点", "同値変形・数直線"] },
{ cells: ["整数部分", "上下から挟む整数", "評価・平方・有理化"] },
{ cells: ["小数部分", "値−整数部分", "整数部分の検算"] },
],
},
],
tailBlocks: [
{
kind: "checkpoint",
title: "検算方法：境界値を代入する",
body: "不等式の答えを出したら、境界値とその少し内側・外側を代入します。負の数で割ったときの向き、等号を含むかどうか、分母が0になっていないかを確認すると、選択肢番号ミスも減ります。",
},
],
links: NUMBERS_EXPRESSIONS_COMMON_LINKS,
},
"absolute-value-basic": {
leadBlocks: [
{
kind: "comparisonTable",
title: "絶対値を外す・場合分けする・グラフで見る判断表",
body: "絶対値は中身の符号で処理します。距離として見た方が速い場面もあります。",
columns: ["状況", "優先方針", "注意点"],
rows: [
{ cells: ["$|x-a|=r$", "数直線で距離 $r$ の2点", "$r<0$ なら解なし"], highlight: true },
{ cells: ["$|x-a|<r$", "$a-r<x<a+r$", "不等号の向きと等号を確認"] },
{ cells: ["複数の絶対値", "中身が0になる点で区間分け", "区間ごとの符号表を作る"] },
{ cells: ["関数や面積と融合", "グラフで折れ点を見る", "折れ点を定義域外に置かない"] },
],
},
{
kind: "strategy",
title: "絶対値の勝ち筋：中身が0になる点を先に出す",
body: "絶対値は、外側の記号ではなく中身の符号で決まります。$|x-2|$ なら最初に $x=2$ を境界にします。複数あれば境界を小さい順に並べ、区間ごとに中身の符号を決めます。\n\n捨てるべき方針は、とりあえず絶対値を外してしまうことです。符号確認なしに外すと、方程式も不等式も別物になります。",
},
],
tailBlocks: [
{
kind: "workedExample",
title: "代表例題：絶対値不等式を区間で処理する",
body: "問題：$|x-1|+|x-4|\\leq5$ を解け。\n\n標準解答：境界は $x=1,4$。$x<1$、$1\\leq x<4$、$4\\leq x$ に分ける。真ん中では $(x-1)+(4-x)=3$ なので常に成り立つ。左では $-(x-1)+(4-x)=5-2x\\leq5$ より $x\\geq0$、合わせて $0\\leq x<1$。右では $(x-1)+(x-4)=2x-5\\leq5$ より $x\\leq5$、合わせて $4\\leq x\\leq5$。答えは $0\\leq x\\leq5$。\n\n別解：数直線上で1と4からの距離の和を見る。区間 $[1,4]$ では距離の和は3で最小、外側へ出ると1ずつ増えるので、端は0と5。",
},
{
kind: "checkpoint",
title: "本番ならどこまで手計算するか",
body: "選択肢がある場合は、境界点 $1,4$ と端の候補だけ代入して、範囲の形を先に予想します。ただし等号を含むかは必ず元の式に代入して確認します。",
},
],
links: NUMBERS_EXPRESSIONS_COMMON_LINKS,
},
"expression-transformation-strategy": {
leadBlocks: [
{
kind: "strategy",
title: "この講座の勝ち筋：条件式と求めたい式を見比べる",
body: "5秒で見るポイントは、同じかたまり、対称性、次数、平方の形です。計算する前に、展開・因数分解・置換・対称式のどれが目的に近いかを決めます。\n\n対称式では、まず $a+b$ と $ab$ を見ます。$a^2+b^2$、$a^3+b^3$、$\\frac{1}{a}+\\frac{1}{b}$ は、和と積で表せることが多いです。",
},
{
kind: "comparisonTable",
title: "対称式・置換の判断表",
body: "個別に値を求めるより、和と積で進む方が短い場面があります。",
columns: ["見える条件", "方針", "検算"],
rows: [
{ cells: ["$a+b$ と $ab$", "対称式に変形", "式が $a,b$ を入れ替えても同じか"], highlight: true },
{ cells: ["同じかたまりが反復", "$X=$ かたまり と置く", "戻した後の解を確認"] },
{ cells: ["平方の形", "平方完成", "最小値・非負性につながるか"] },
{ cells: ["根号と共役", "有理化・和積の利用", "符号と分母を確認"] },
],
},
],
tailBlocks: [
{
kind: "commonMistake",
title: "捨てるべき方針：とりあえず代入して個別に解く",
body: "$a+b$ と $ab$ だけで足りる問題で、先に $a,b$ を個別に求めると遠回りです。対称式かどうかを確認し、必要な情報が和と積で足りるなら、そのまま式変形します。",
},
{
kind: "checkpoint",
title: "共通テスト第1問前半との接続",
body: "第1問前半では、有理化で作った2つの数の和と積から、累乗和や整数部分へ誘導されることがあります。式変形の目的を「きれいにする」ではなく「次の空欄に必要な形へ近づける」と決めるのが本番の時短ポイントです。",
},
],
links: NUMBERS_EXPRESSIONS_COMMON_LINKS,
},
"inequality-strategy-basic": {
leadBlocks: [
{
kind: "comparisonTable",
title: "命題・集合・必要十分条件の対応表",
body: "不等式で出した範囲は、命題判定では集合として読み替えます。",
columns: ["表現", "集合で見ると", "判断"],
rows: [
{ cells: ["$P\\Rightarrow Q$", "$P$ の集合が $Q$ の集合に含まれる", "$P$ は $Q$ の十分条件"], highlight: true },
{ cells: ["$Q\\Rightarrow P$", "$Q$ の集合が $P$ の集合に含まれる", "$P$ は $Q$ の必要条件"] },
{ cells: ["反例", "$P$ に入るが $Q$ に入らない要素", "矢印を壊す1点を探す"] },
{ cells: ["条件の否定", "補集合を取る", "かつ・またはの入れ替えに注意"] },
],
},
{
kind: "strategy",
title: "必要条件・十分条件の判断順",
body: "まず命題を $P\\Rightarrow Q$ の形に直します。次に、$P$ を満たす集合と $Q$ を満たす集合を数直線やベン図で比べます。文字だけで考えるより、包含関係で見る方が向きを間違えにくくなります。",
},
],
tailBlocks: [
{
kind: "workedExample",
title: "代表例題：不等式の範囲から必要十分条件を判定する",
body: "問題：条件 $p: x>3$、条件 $q: x>1$ について、$p$ は $q$ であるための何条件か。\n\n標準解答：$x>3$ なら必ず $x>1$ なので $p\\Rightarrow q$ は真。一方、$x=2$ は $q$ を満たすが $p$ を満たさないので $q\\Rightarrow p$ は偽。したがって $p$ は $q$ であるための十分条件だが必要条件ではない。\n\n別解：集合で見ると、$p$ の集合は $q$ の集合に含まれる。小さい集合は大きい集合の十分条件になります。",
},
{
kind: "commonMistake",
title: "よくある誤答：強い条件を必要条件と呼ぶ",
body: "$x>3$ は $x>1$ より強い条件です。強い条件は、そこから弱い条件を導けるので十分条件です。名前の印象で判断せず、必ず矢印を書いて確認します。",
},
],
links: [
...NUMBERS_EXPRESSIONS_COMMON_LINKS,
{ label: "集合と命題 講座", href: "/courses/math-1a/sets-and-logic", description: "必要条件・十分条件を単元として復習する" },
],
},
"numbers-expressions-exam-standard": {
leadBlocks: [
{
kind: "strategy",
title: "共通テスト第1問前半の判断順",
body: "本番では、1. 根号・有理化、2. 対称式、3. 整数部分・小数部分、4. 絶対値、5. 集合・命題の順に、前問の結果を使い回せないかを見ます。式変形そのものより「次に何を見れば選択肢が消えるか」を重視します。",
},
{
kind: "comparisonTable",
title: "求めたい量別の判断表",
body: "第1問前半でよく問われる量を、最初に見る条件と対応させます。",
columns: ["求めたい量", "最初に見るもの", "時短ポイント"],
rows: [
{ cells: ["式の値", "条件式と同じかたまり", "展開前に置換できるか見る"], highlight: true },
{ cells: ["整数部分", "上下から挟める平方数・整数", "近い整数を先に予想する"] },
{ cells: ["小数部分", "値−整数部分", "必ず $0\\leq$ 小数部分 $<1$ を確認"] },
{ cells: ["条件の否定", "かつ・または、等号の有無", "ド・モルガンを先に書く"] },
{ cells: ["必要条件", "逆向きの矢印", "大きい集合か確認"] },
{ cells: ["十分条件", "その条件から相手が言えるか", "反例がないか確認"] },
{ cells: ["反例", "片方だけ満たす値", "境界値を優先して試す"] },
{ cells: ["範囲", "不等式の端点と符号", "数直線に落とす"] },
],
},
],
tailBlocks: [
{
kind: "workedExample",
title: "代表例題：有理化から整数部分へつなぐ",
body: "問題：$a=\\frac{1}{2-\\sqrt{3}}$ とする。$a$ の整数部分と小数部分を求めよ。\n\n標準解答：有理化して $a=2+\\sqrt{3}$。$1<\\sqrt{3}<2$ より $3<a<4$。したがって整数部分は $3$、小数部分は $a-3=\\sqrt{3}-1$。\n\n別解：$\\sqrt{3}\\approx1.7$ と見積もって $a\\approx3.7$ と予想し、最後に $1<\\sqrt{3}<2$ で厳密化する。\n\n捨てる方針：小数近似だけで答えを決めること。マーク式では近似で候補を絞っても、整数で挟む不等式で確定します。",
},
{
kind: "commonMistake",
title: "ミス回収：小数部分が1以上になっていないか",
body: "小数部分は必ず $0$ 以上 $1$ 未満です。答えが $\\sqrt{3}$ や $2-\\sqrt{3}$ のように出たら、範囲を確認します。今回の $\\sqrt{3}-1$ は $0<\\sqrt{3}-1<1$ なので妥当です。",
},
{
kind: "checkpoint",
title: "問題解体型講座への戻り方",
body: "第1問前半で、有理化、対称式、整数部分、絶対値、必要十分条件のどこで止まったかを分けます。まとめて確認するときは、問題解体型講座「第1問前半 数と式・絶対値・命題融合」に戻ると、PDF問題を見ながら判断順を復習できます。",
},
],
links: [
...NUMBERS_EXPRESSIONS_COMMON_LINKS,
{ label: "集合と命題 講座", href: "/courses/math-1a/sets-and-logic", description: "命題・条件・反例を追加で確認する" },
],
},
};

function mergeNumbersExpressionLinks(
baseLinks: CourseLesson["relatedPracticeLinks"],
extraLinks: CourseLesson["relatedPracticeLinks"],
): CourseLesson["relatedPracticeLinks"] {
const linksByHref = new Map<string, CourseLesson["relatedPracticeLinks"][number]>();
for (const link of [...baseLinks, ...extraLinks]) {
linksByHref.set(link.href, link);
}
return [...linksByHref.values()];
}

function insertNumbersExpressionBlocks(
blocks: CourseLesson["lessonBlocks"],
leadBlocks: CourseLesson["lessonBlocks"] = [],
tailBlocks: CourseLesson["lessonBlocks"] = [],
): CourseLesson["lessonBlocks"] {
const introIndex = blocks.findIndex((block) => block.kind === "intro");
const withLead =
introIndex >= 0
? [
...blocks.slice(0, introIndex + 1),
...leadBlocks,
...blocks.slice(introIndex + 1),
]
: [...leadBlocks, ...blocks];
const nextSummaryIndex = withLead.findIndex((block) => block.kind === "summary");
if (nextSummaryIndex >= 0) {
return [
...withLead.slice(0, nextSummaryIndex),
...tailBlocks,
...withLead.slice(nextSummaryIndex),
];
}
return [...withLead, ...tailBlocks];
}

function enhanceNumbersExpressionLesson(lesson: CourseLesson): CourseLesson {
const enhancement = NUMBERS_EXPRESSIONS_ENHANCEMENTS[lesson.lessonId];
const equivalenceLinks = NUMBERS_EXPRESSIONS_EQUIVALENCE_BRIDGE_LESSON_IDS.has(lesson.lessonId)
? NUMBERS_EXPRESSIONS_EQUIVALENCE_EXCLUSION_LINK
: [];
if (!enhancement) {
if (equivalenceLinks.length === 0) return lesson;
return {
...lesson,
relatedPracticeLinks: mergeNumbersExpressionLinks(lesson.relatedPracticeLinks, equivalenceLinks),
qualityTags: Array.from(new Set([...lesson.qualityTags, "除外値チェック"])),
};
}
return {
...lesson,
estimatedMinutes: lesson.estimatedMinutes + 8,
lessonBlocks: insertNumbersExpressionBlocks(
lesson.lessonBlocks,
enhancement.leadBlocks,
enhancement.tailBlocks,
),
relatedPracticeLinks: mergeNumbersExpressionLinks(lesson.relatedPracticeLinks, [
...enhancement.links,
...equivalenceLinks,
]),
qualityTags: Array.from(new Set([
...lesson.qualityTags,
...(equivalenceLinks.length > 0 ? ["除外値チェック"] : []),
])),
};
}

const NUMBERS_EXPRESSIONS_LESSON_PHASE_ORDER = [
// Phase 1: Core
"numbers-expressions-learning-map",
"polynomial-basics",
"expansion-formulas-basic",
"factorization-basic",
"real-numbers-and-radicals",
"absolute-value-basic",
// Phase 2: Main Problem Types
"expression-transformation-strategy",
"linear-equations-inequalities",
"inequality-strategy-basic",
// Phase 3: Advanced Traps
"numbers-expressions-equivalence-exclusion",
// Phase 4: Synthesis
"numbers-expressions-exam-standard",
];

const NUMBERS_EXPRESSIONS_LESSON_PHASE_ORDER_INDEX = new Map(
NUMBERS_EXPRESSIONS_LESSON_PHASE_ORDER.map((lessonId, index) => [lessonId, index]),
);

const NUMBERS_EXPRESSIONS_ALL_LESSONS: CourseLesson[] = [
NUMBERS_EXPRESSIONS_LEARNING_MAP,
...NUMBERS_EXPRESSIONS_BEGINNER,
...NUMBERS_EXPRESSIONS_STANDARD,
...NUMBERS_EXPRESSIONS_ADVANCED,
NUMBERS_EXPRESSIONS_EQUIVALENCE_EXCLUSION,
]
.map(enhanceNumbersExpressionLesson)
.sort((a, b) => {
const aIndex = NUMBERS_EXPRESSIONS_LESSON_PHASE_ORDER_INDEX.get(a.lessonId) ?? Number.MAX_SAFE_INTEGER;
const bIndex = NUMBERS_EXPRESSIONS_LESSON_PHASE_ORDER_INDEX.get(b.lessonId) ?? Number.MAX_SAFE_INTEGER;
return aIndex - bIndex;
});

export const NUMBERS_AND_EXPRESSIONS_UNIT: CourseUnit = {
unitId: "numbers-and-expressions",
subjectId: "math-1a",
unitTitle: "数と式",
unitDescription:
"数と式は、計算公式を覚えるだけの単元ではありません。式変形で何が保存され、どこで条件が増減し、どこで余分な解や除外値が発生するかを管理する単元です。展開・因数分解・有理化・絶対値・平方根・不等式・命題を、問題文に応じて選び分ける状態を目指します。",
lessons: NUMBERS_EXPRESSIONS_ALL_LESSONS,
};
