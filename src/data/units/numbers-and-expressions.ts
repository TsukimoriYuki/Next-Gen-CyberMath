import type { Problem } from "@/lib/types";

// 数学I「数と式」(集合と命題を含む) — 20 問。
// この単元は代数中心のため、原則ラボ(グラフ/図形)は付けない。
const r = String.raw;

export const numbersAndExpressions: Problem[] = [
  // ============================== A (5) ==============================
  {
    slug: "expand-by-difference",
    title: "展開で暗算する",
    unit: "数と式",
    difficulty: "A",
    tagline: "掛け算を、引き算に化けさせる",
    hasGraph: false,
    statement: r`次の式を、展開の公式を利用して計算せよ。

$$103\times 97,\qquad (x+2)(x-2)(x^2+4)$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 差の積を見抜く",
        body: r`$(a+b)(a-b)=a^2-b^2$ の形に見立てる。$103\times97=(100+3)(100-3)$。式の方も「差の積」を繰り返せる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$103\times97=100^2-3^2$。$(x+2)(x-2)=x^2-4$ を先に作ると、残りと再び差の積になる。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$103\times97=(100+3)(100-3)=100^2-3^2=10000-9=9991.$

$(x+2)(x-2)(x^2+4)=(x^2-4)(x^2+4)=(x^2)^2-4^2=x^4-16.$

**ポイント:** 「差の積」を見抜くと、掛け算が引き算に化けて暗算できる。`,
      },
    ],
  },
  {
    slug: "factor-trinomial",
    title: "因数分解の型を見抜く",
    unit: "数と式",
    difficulty: "A",
    tagline: "積と和、あるいはたすき掛け",
    hasGraph: false,
    statement: r`次の式を因数分解せよ。

$$x^2+5x+6,\qquad 6x^2+7x-3$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 2 数を探す",
        body: r`$x^2+(a+b)x+ab=(x+a)(x+b)$。定数項の積と 1 次の係数の和で 2 数を探す。係数つきはたすき掛け。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`前者は積 $6$・和 $5$ → $2,3$。後者は $(2x+3)(3x-1)$ を係数比較で確かめる。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$x^2+5x+6=(x+2)(x+3).$

$6x^2+7x-3$ はたすき掛けで $2x,\ 3x$ と $+3,\ -1$ を組み、
$$6x^2+7x-3=(2x+3)(3x-1).$$
（展開すると $6x^2-2x+9x-3=6x^2+7x-3$ で一致。）`,
      },
    ],
  },
  {
    slug: "rationalize-denominator",
    title: "分母の√を払う",
    unit: "数と式",
    difficulty: "A",
    tagline: "共役を掛けると根号が消える",
    hasGraph: false,
    statement: r`次の式の分母を有理化せよ。

$$\frac{1}{\sqrt3-1},\qquad \frac{\sqrt5}{\sqrt5+\sqrt2}$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 共役を掛ける",
        body: r`分母 $\sqrt a-\sqrt b$ には共役 $\sqrt a+\sqrt b$ を分母分子に掛ける。$(\sqrt a-\sqrt b)(\sqrt a+\sqrt b)=a-b$ で根号が消える。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`前者は $\dfrac{1}{\sqrt3-1}\cdot\dfrac{\sqrt3+1}{\sqrt3+1}$。分母は $3-1=2$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\dfrac{1}{\sqrt3-1}=\dfrac{\sqrt3+1}{(\sqrt3-1)(\sqrt3+1)}=\dfrac{\sqrt3+1}{2}.$

$\dfrac{\sqrt5}{\sqrt5+\sqrt2}=\dfrac{\sqrt5(\sqrt5-\sqrt2)}{(\sqrt5+\sqrt2)(\sqrt5-\sqrt2)}=\dfrac{5-\sqrt{10}}{5-2}=\dfrac{5-\sqrt{10}}{3}.$`,
      },
    ],
  },
  {
    slug: "solve-linear-inequality",
    title: "1 次不等式を解く",
    unit: "数と式",
    difficulty: "A",
    tagline: "負で割ると、向きが反転する",
    hasGraph: false,
    statement: r`不等式 $3x-2<x+4$ を解け。また $\dfrac{2x-1}{3}\ge\dfrac{x+1}{2}$ を解け。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 不等号の向き",
        body: r`不等式も等式と同様に移項できるが、**負の数を掛ける・割るときは不等号の向きが反転**する点に注意。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`後者は両辺に正の数 $6$ を掛けて分母を払う：$2(2x-1)\ge3(x+1)$（向きは不変）。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$3x-2<x+4\Rightarrow 2x<6\Rightarrow x<3.$

$\dfrac{2x-1}{3}\ge\dfrac{x+1}{2}$ の両辺に $6\ (>0)$ を掛けて
$$2(2x-1)\ge3(x+1)\Rightarrow 4x-2\ge3x+3\Rightarrow x\ge5.$$`,
      },
    ],
  },
  {
    slug: "absolute-value-basics",
    title: "絶対値のはずし方",
    unit: "数と式",
    difficulty: "A",
    tagline: "= は ±、< は挟む",
    hasGraph: false,
    statement: r`方程式 $|2x-1|=5$、不等式 $|x|<3$、$|x-2|\ge1$ をそれぞれ解け。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 3 つの型",
        body: r`$|A|=c\ (c>0)$ は $A=\pm c$。$|x|<c$ は $-c<x<c$。$|x|\ge c$ は $x\le-c$ または $x\ge c$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$|2x-1|=5\Rightarrow 2x-1=\pm5$。$|x-2|\ge1\Rightarrow x-2\le-1$ または $x-2\ge1$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$|2x-1|=5\Rightarrow 2x-1=5$ または $2x-1=-5\Rightarrow x=3,\ -2.$

$|x|<3\Rightarrow -3<x<3.$

$|x-2|\ge1\Rightarrow x-2\le-1$ または $x-2\ge1\Rightarrow x\le1$ または $x\ge3.$`,
      },
    ],
  },

  // ============================== B (6) ==============================
  {
    slug: "factor-by-grouping",
    title: "工夫して因数分解する",
    unit: "数と式",
    difficulty: "B",
    tagline: "組んでくくる、差を作る",
    hasGraph: false,
    statement: r`次の式を因数分解せよ。

$$x^3-x^2-x+1,\qquad x^2-y^2+x+y$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — グループ化",
        body: r`項を 2 つずつ組み、共通因数でくくる。または $a^2-b^2$ の差を先に作る。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`前者：$x^2(x-1)-(x-1)$。後者：$x^2-y^2=(x+y)(x-y)$ を作ると $x+y$ が共通。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$x^3-x^2-x+1=x^2(x-1)-(x-1)=(x-1)(x^2-1)=(x-1)^2(x+1).$

$x^2-y^2+x+y=(x+y)(x-y)+(x+y)=(x+y)(x-y+1).$`,
      },
    ],
  },
  {
    slug: "remove-double-radical",
    title: "二重根号を外す",
    unit: "数と式",
    difficulty: "B",
    tagline: "和と積から 2 数を逆算する",
    hasGraph: false,
    statement: r`二重根号を外して簡単にせよ。

$$\sqrt{5+2\sqrt6},\qquad \sqrt{7-\sqrt{48}}$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — (√a±√b)² の形",
        body: r`$\sqrt{(a+b)+2\sqrt{ab}}=\sqrt a+\sqrt b$。内側の有理部が和 $a+b$、根号内が積 $ab$ となる 2 数を探す。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 和と積で当てる",
        body: r`$5+2\sqrt6$ は「和 $5$・積 $6$」→ $2,3$。$7-\sqrt{48}$ は $\sqrt{48}=2\sqrt{12}$ にして「和 $7$・積 $12$」→ $3,4$。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$5+2\sqrt6=(\sqrt3+\sqrt2)^2$。$7-2\sqrt{12}=(2-\sqrt3)^2$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\sqrt{5+2\sqrt6}=\sqrt{(\sqrt3+\sqrt2)^2}=\sqrt3+\sqrt2.$

$\sqrt{7-\sqrt{48}}=\sqrt{7-2\sqrt{12}}=\sqrt{(2-\sqrt3)^2}=2-\sqrt3\quad(2>\sqrt3\ \text{より}).$`,
      },
    ],
  },
  
  
  {
    slug: "symmetric-x-plus-inverse",
    title: "対称式は基本対称式で",
    unit: "数と式",
    difficulty: "B",
    tagline: "和と積さえ分かればいい",
    hasGraph: false,
    statement: r`$x+\dfrac1x=3$ のとき、$x^2+\dfrac1{x^2}$ と $x^3+\dfrac1{x^3}$ の値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 基本対称式に帰着",
        body: r`$x\cdot\dfrac1x=1$ が積。$x^2+\dfrac1{x^2}=\left(x+\dfrac1x\right)^2-2$、$x^3+\dfrac1{x^3}=\left(x+\dfrac1x\right)^3-3\left(x+\dfrac1x\right)$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\left(x+\dfrac1x\right)^2=x^2+2+\dfrac1{x^2}$、$\left(x+\dfrac1x\right)^3=x^3+3x+\dfrac3x+\dfrac1{x^3}$ を移項する。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$x^2+\dfrac1{x^2}=\left(x+\dfrac1x\right)^2-2=3^2-2=7.$

$x^3+\dfrac1{x^3}=\left(x+\dfrac1x\right)^3-3\left(x+\dfrac1x\right)=27-9=18.$`,
      },
    ],
  },
  {
    slug: "simultaneous-inequality-integers",
    title: "連立不等式と整数解",
    unit: "数と式",
    difficulty: "B",
    tagline: "重なりを取り、数える",
    hasGraph: false,
    statement: r`連立不等式 $\begin{cases}2x-1>x-3\\[2pt] 3x+1\le x+9\end{cases}$ を解き、これを満たす整数 $x$ の個数を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 共通範囲",
        body: r`各不等式を解いて、数直線上の重なり（共通範囲）を取る。最後に範囲内の整数を数える。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`上：$x>-2$。下：$2x\le8\Rightarrow x\le4$。共通範囲は $-2<x\le4$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$2x-1>x-3\Rightarrow x>-2.$ $\quad 3x+1\le x+9\Rightarrow x\le4.$

共通範囲は $-2<x\le4$。これを満たす整数は $-1,0,1,2,3,4$ の **6 個**。`,
      },
    ],
  },
  {
    slug: "abs-inequality-variable-rhs",
    title: "右辺に文字がある絶対値不等式",
    unit: "数と式",
    difficulty: "B",
    tagline: "まず右辺の符号を押さえる",
    hasGraph: false,
    statement: r`不等式 $|x-3|<2x$ を解け。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — |A|<B の前提",
        body: r`$|A|<B$ が成り立つには右辺 $B>0$ が必要。そのうえで $-B<A<B$ と同値。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$2x>0$ すなわち $x>0$ を前提に、$-2x<x-3<2x$ を解く。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`右辺 $>0$ より $x>0$。このとき
$$-2x<x-3<2x.$$
左：$-2x<x-3\Rightarrow 3<3x\Rightarrow x>1$。右：$x-3<2x\Rightarrow -3<x$（$x>0$ で自動成立）。
よって求める解は $x>1$。`,
      },
    ],
  },
  {
    slug: "integer-and-fractional-part",
    title: "整数部分と小数部分",
    unit: "数と式",
    difficulty: "B",
    tagline: "√7 を整数で挟む",
    hasGraph: false,
    statement: r`$\sqrt7$ の整数部分を $a$、小数部分を $b$ とする。$a$、$b$、および $b^2+\dfrac1b$ の値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 隣り合う平方数で挟む",
        body: r`$\sqrt7$ を整数で挟む：$2<\sqrt7<3$。整数部分 $a$ が定まり、小数部分は $b=\sqrt7-a$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$a=2,\ b=\sqrt7-2$。$\dfrac1b$ は有理化する。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$2^2=4<7<9=3^2$ より $2<\sqrt7<3$。ゆえに $a=2,\ b=\sqrt7-2$。
$\dfrac1b=\dfrac1{\sqrt7-2}=\dfrac{\sqrt7+2}{7-4}=\dfrac{\sqrt7+2}{3}.$
$b^2=(\sqrt7-2)^2=11-4\sqrt7$ なので
$$b^2+\frac1b=11-4\sqrt7+\frac{\sqrt7+2}{3}=\frac{35-11\sqrt7}{3}.$$`,
      },
    ],
  },

  // ============================== C (5) ==============================
  {
    slug: "abs-sum-minimum",
    title: "絶対値の和の最小値",
    unit: "数と式",
    difficulty: "C",
    tagline: "2 点の間で、距離の和は一定",
    hasGraph: false,
    statement: r`関数 $f(x)=|x-1|+|x+2|$ の最小値を求め、最小となる $x$ の範囲を述べよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 式を距離の和に読み替える",
        body: r`$f(x)=|x-1|+|x+2|$ は、数直線上の点 $x$ から **2 つの定点 $1,\ -2$ までの距離の和**。距離の和は、点が 2 定点の「間」にあるとき無駄がなく、最小で一定になる。この幾何的解釈が、場合分け計算の前に答えを見抜かせる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 谷が平らなことを見る",
        body: r`いくつか代入すると、$x=0$ で $1+2=3$、$x=-2$ で $3+0=3$、$x=1$ で $0+3=3$。一方 $x=3$ で $2+5=7$。下のラボでスライダー $x$ を動かすと、$x$ が $-2$ と $1$ の間にある限り 2 本の距離の和が $3$ で一定（平らな谷）、外に出ると増えるのが見える。

@@lab:abs-sum-number-line@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 場合分け",
        body: r`$x<-2,\ -2\le x\le1,\ x>1$ で絶対値を外す。中央の区間で $f(x)=(1-x)+(x+2)=3$ と一定になる。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**代数（場合分け）。** 符号の変わり目 $x=-2,\ 1$ で区間を 3 つに割る。

$x<-2$ のとき $|x-1|=1-x,\ |x+2|=-(x+2)$ より $f=(1-x)-(x+2)=-2x-1$。$x<-2$ では $-2x-1>3$。

$-2\le x\le1$ のとき $|x-1|=1-x,\ |x+2|=x+2$ より $f=(1-x)+(x+2)=3$（**一定**）。

$x>1$ のとき $f=(x-1)+(x+2)=2x+1$。$x>1$ では $2x+1>3$。

ゆえに**最小値は $3$**、達成は $-2\le x\le1$。

**幾何（距離の和）。** $f(x)$ は $x$ から $1$ と $-2$ への距離の和。三角不等式より和は 2 点間の距離 $|1-(-2)|=3$ 以上で、等号は $x$ が線分 $[-2,1]$ 上にあるとき。代数の結論と完全に一致する。

**メタ。** 絶対値の和の最小は「区間を割って一次関数を貼り合わせる」が万能だが、**距離の和**と読めれば最小値＝端点間距離・最小範囲＝端点間と即答できる。$|x-a_1|+\cdots+|x-a_n|$ の最小が「中央値の位置」で起こるという一般則も、この見方から自然に出る。`,
      },
    ],
  },
  {
    slug: "sets-de-morgan",
    title: "集合とド・モルガンの法則",
    unit: "数と式",
    difficulty: "C",
    tagline: "補集合は、和を積に変える",
    hasGraph: false,
    statement: r`全体集合を $U=\{1,2,3,\dots,10\}$、$A=\{2\text{ の倍数}\}$、$B=\{3\text{ の倍数}\}$ とする。$\overline{A\cup B}$ と $\overline A\cap\overline B$ を要素を書き並べて求め、一致を確かめよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 法則を具体物で確かめ、理由を言葉に",
        body: r`ド・モルガンの法則 $\overline{A\cup B}=\overline A\cap\overline B$ は「和の補は、補の積」。抽象的に覚えるより、有限集合で両辺を書き出して一致を体感し、さらに「なぜ成り立つか」を要素の言葉で言える状態にするのが近道。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — まず A, B を書き出す",
        body: r`$U=\{1,\dots,10\}$ で $A=\{2,4,6,8,10\}$（2 の倍数）、$B=\{3,6,9\}$（3 の倍数）。「$A\cup B$ に入らない」＝「2 の倍数でも 3 の倍数でもない」数を探すと $\{1,5,7\}$。これが両辺の正体だと当たりをつけてから、計算で確かめる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$A=\{2,4,6,8,10\},\ B=\{3,6,9\}$。$A\cup B$ を作り、$U$ から除く。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$A=\{2,4,6,8,10\},\ B=\{3,6,9\}$。

**左辺。** $A\cup B=\{2,3,4,6,8,9,10\}$ なので $\overline{A\cup B}=U\setminus(A\cup B)=\{1,5,7\}$。

**右辺。** $\overline A=\{1,3,5,7,9\},\ \overline B=\{1,2,4,5,7,8,10\}$ より $\overline A\cap\overline B=\{1,5,7\}$。

両者は一致し、$\overline{A\cup B}=\overline A\cap\overline B$ が確かめられた。

**なぜ成り立つか（要素による証明）。** 「$x\in\overline{A\cup B}$」$\iff$「$x\notin A\cup B$」$\iff$「$x\notin A$ かつ $x\notin B$」$\iff$「$x\in\overline A$ かつ $x\in\overline B$」$\iff$「$x\in\overline A\cap\overline B$」。日本語の「または」の否定が「両方とも〜でない」になることが、法則の核心。

**メタ。** ド・モルガンは集合・命題・論理回路で同じ顔をする普遍法則。$\overline{A\cap B}=\overline A\cup\overline B$（積の補は補の和）と対で覚え、「補を取ると $\cup$ と $\cap$ が入れ替わる」と一語で掴むのが実戦的。`,
      },
    ],
  },
  {
    slug: "necessary-sufficient-condition",
    title: "必要条件・十分条件を見分ける",
    unit: "数と式",
    difficulty: "C",
    tagline: "矢印の向きと、集合の包含",
    hasGraph: false,
    statement: r`実数 $x$ について条件 $p:\ x=2$、$q:\ x^2=4$ を考える。$p$ は $q$ であるための何条件か。また $r:\ |x|<1$ は $s:\ x<1$ の何条件か。理由とともに答えよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 矢印の向き＝包含の向き",
        body: r`$p\Rightarrow q$ が真なら $p$ は $q$ の**十分**条件、$q\Rightarrow p$ が真なら $p$ は $q$ の**必要**条件。条件を満たす数の集合（真理集合）で見ると、「**狭い方が十分条件**」（内側→外側の矢印は必ず真）。両方真なら必要十分。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 真理集合の大小を絵にする",
        body: r`$p:x=2$ の真理集合は $\{2\}$、$q:x^2=4$ は $\{2,-2\}$。$\{2\}\subsetneq\{2,-2\}$ だから「$x=2$ なら $x^2=4$」は必ず真（狭い→広い）、逆は“広い方にしかいない” $x=-2$ が反例で偽。$r:|x|<1$ は $(-1,1)$、$s:x<1$ は $(-\infty,1)$ で $(-1,1)\subsetneq(-\infty,1)$。同じ構図。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 反例を探す",
        body: r`$x=2\Rightarrow x^2=4$ は真。逆 $x^2=4\Rightarrow x=2$ は $x=-2$ が反例で偽。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**$p$ と $q$。** $p\Rightarrow q$：$x=2\Rightarrow x^2=4$。真。$q\Rightarrow p$：$x^2=4$ でも $x=-2$ があり得るので偽（反例 $x=-2$）。よって $p$ は $q$ の **十分条件であるが必要条件でない**。

**$r$ と $s$。** $r\Rightarrow s$：$|x|<1\Rightarrow-1<x<1\Rightarrow x<1$。真。$s\Rightarrow r$：$x=-5$ は $x<1$ だが $|x|<1$ を満たさず反例で偽。よって $r$ は $s$ の **十分条件であるが必要条件でない**。

**集合による裏取り。** $\{2\}\subset\{2,-2\}$、$(-1,1)\subset(-\infty,1)$。いずれも左（真理集合が狭い方）が十分条件。

**メタ。** 「十分＝言い過ぎ（強い条件・狭い集合）」「必要＝言い足りない（弱い条件・広い集合）」と日本語で握る。反例は必ず“広い集合にしかいない要素”から探す——闇雲でなく構造から反例を作るのが速い。`,
      },
    ],
  },
  {
    slug: "three-variable-symmetric",
    title: "3 変数の対称式",
    unit: "数と式",
    difficulty: "C",
    tagline: "基本対称式に全部のせる",
    hasGraph: false,
    statement: r`実数 $a,b,c$ が $a+b+c=2,\ ab+bc+ca=-1,\ abc=-2$ を満たす。$a^2+b^2+c^2$ と $a^3+b^3+c^3$ の値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 基本対称式の言葉に翻訳",
        body: r`どんな対称式も $s_1=a+b+c,\ s_2=ab+bc+ca,\ s_3=abc$ で書ける。必要な恒等式は 2 つ：
$$a^2+b^2+c^2=s_1^2-2s_2,$$
$$a^3+b^3+c^3-3abc=(a+b+c)\bigl(a^2+b^2+c^2-ab-bc-ca\bigr).$$
個々の $a,b,c$ を求めずに、$s_1,s_2,s_3$ を代入するだけで値が出る。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 2 乗和の恒等式を展開で確かめる",
        body: r`$(a+b+c)^2=a^2+b^2+c^2+2(ab+bc+ca)$ を移項すれば $a^2+b^2+c^2=s_1^2-2s_2$。本問では $s_1=2,\ s_2=-1,\ s_3=-2$ なので、まず $a^2+b^2+c^2=2^2-2(-1)=6$ と即計算できる。恒等式の形を手で確かめてから 3 乗和へ進む。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$s_1=a+b+c,\ s_2=ab+bc+ca,\ s_3=abc$ とおいて代入するだけ。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$s_1=2,\ s_2=-1,\ s_3=-2$ とおく。

**2 乗和。**
$$a^2+b^2+c^2=s_1^2-2s_2=2^2-2(-1)=6.$$

**3 乗和。** 恒等式 $a^3+b^3+c^3-3abc=(a+b+c)\bigl(a^2+b^2+c^2-(ab+bc+ca)\bigr)$ に代入して
$$a^3+b^3+c^3=3s_3+s_1\bigl((a^2+b^2+c^2)-s_2\bigr)=3(-2)+2\bigl(6-(-1)\bigr)=-6+2\cdot7=8.$$

**メタ。** 「対称式 → 基本対称式」は、解と係数の関係（$a,b,c$ は $t^3-s_1t^2+s_2t-s_3=0$ の 3 解）と地続き。値を出すだけなら根を求める必要は一切なく、$s_1,s_2,s_3$ さえあれば任意の対称式（Newton の漸化式で次々）に手が届く。`,
      },
    ],
  },
  {
    slug: "radical-equation-extraneous",
    title: "根号を含む方程式の落とし穴",
    unit: "数と式",
    difficulty: "C",
    tagline: "2 乗は同値変形ではない",
    hasGraph: false,
    statement: r`方程式 $\sqrt{x+2}=x$ を解け。2 乗して得た解が本当に解か、必ず確かめよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 2 乗は同値変形ではない",
        body: r`$\sqrt{x+2}=x$ の両辺を 2 乗すると情報が増え、**無縁解**（もとの式を満たさない解）が紛れ込む。先に符号条件を押さえる：左辺 $\sqrt{\ }\ge0$ なので右辺 $x\ge0$、さらに根号の中身 $x+2\ge0$。この“枠”の中だけが解の候補。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — グラフで交点を見る",
        body: r`$y=\sqrt{x+2}$（$x=-2$ から立ち上がる増加曲線）と $y=x$（45°直線）の交点が解。直線は第 1 象限で曲線と 1 回だけ交わる。2 乗は $\sqrt{x+2}=x$ と $\sqrt{x+2}=-x$ を同時に表す（$(\pm x)^2=x^2$）ので、後者の解 $x=-1$ が無縁解として紛れ込む、と先に見抜ける。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$x\ge0$ の下で 2 乗：$x+2=x^2\Rightarrow x^2-x-2=0\Rightarrow(x-2)(x+1)=0$。条件で絞る。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**符号条件。** 左辺 $\sqrt{x+2}\ge0$ より右辺も $x\ge0$。このとき自動的に $x+2\ge0$ も成り立つ。

**2 乗して解く。** $x\ge0$ のもとで両辺を 2 乗：
$$x+2=x^2\ \Longrightarrow\ x^2-x-2=0\ \Longrightarrow\ (x-2)(x+1)=0\ \Longrightarrow\ x=2,\ -1.$$
条件 $x\ge0$ より $x=-1$ は不適。$x=2$ は $\sqrt{2+2}=\sqrt4=2$ で成立。よって**解は $x=2$**。

**なぜ $x=-1$ が無縁解か。** $x=-1$ は $\sqrt{x+2}=-x$ の解であって、もとの式 $\sqrt{x+2}=x$ の解ではない（$\sqrt1=1\neq-1$）。グラフでも $y=\sqrt{x+2}$ と $y=x$ の交点は 1 つだけ。

**メタ。** 無理方程式は「①定義域と符号で枠を決める ②2 乗 ③枠で吟味（または代入確認）」が鉄則。2 乗のたびに同値性が崩れうると疑い、最後に必ず元の式へ戻すのが事故防止。`,
      },
    ],
  },

  // ============================== D (3) ==============================
  {
    slug: "contrapositive-mult-of-three",
    title: "対偶で証明する",
    unit: "数と式",
    difficulty: "D",
    tagline: "示しにくい向きは、裏返す",
    hasGraph: false,
    statement: r`整数 $n$ について、「$n^2$ が 3 の倍数ならば $n$ は 3 の倍数である」ことを証明せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 示しにくい向きは裏返す",
        body: r`「$n^2$ が 3 の倍数 $\Rightarrow$ $n$ が 3 の倍数」は、直接だと「$n^2$ が 3 の倍数」という情報から $n$ の形を絞りにくい。**対偶**「$n$ が 3 の倍数でない $\Rightarrow$ $n^2$ も 3 の倍数でない」なら、$n$ の形（$3k+1,3k+2$）から出発でき、計算で押し切れる。対偶と元命題は真偽が一致する。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 余りで実験する",
        body: r`3 で割った余りが $1$ の数（$1,4,7,\dots$）の 2 乗は $1,16,49,\dots$ で、3 で割るとどれも余り $1$。余り $2$ の数（$2,5,8,\dots$）の 2 乗 $4,25,64,\dots$ も余り $1$。「3 の倍数でない数の 2 乗は、必ず 3 で割ると余り $1$」と見当がつく。これを一般の $n=3k+1,\ 3k+2$ で証明すればよい。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 余りで場合分け",
        body: r`3 の倍数でない $n$ は $n=3k+1$ または $n=3k+2$。それぞれ $n^2$ を 3 で割った余りを計算する。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`対偶「$n$ が 3 の倍数でないならば $n^2$ も 3 の倍数でない」を示す。$n$ が 3 の倍数でないとき、$n$ を 3 で割った余りは $1$ か $2$、すなわち $n=3k+1$ または $n=3k+2$（$k\in\mathbb Z$）。

$n=3k+1$ のとき
$$n^2=9k^2+6k+1=3(3k^2+2k)+1,$$
3 で割った余りは $1$。

$n=3k+2$ のとき
$$n^2=9k^2+12k+4=3(3k^2+4k+1)+1,$$
やはり余りは $1$。

いずれも $n^2$ は 3 の倍数でない。対偶が真なので、元の命題「$n^2$ が 3 の倍数 $\Rightarrow$ $n$ が 3 の倍数」も真。$\blacksquare$

**メタ。** 「$\Rightarrow$ の出発点の情報が弱い／結論が言いにくい」ときは対偶。とくに整数の倍数・約数の命題は「余りで分類（$3k,3k+1,3k+2$）」と相性が抜群。この命題は $\sqrt3$ が無理数であることの証明にも直結する基本部品である。`,
      },
    ],
  },
  {
    slug: "sqrt2-plus-sqrt3-irrational",
    title: "√2 + √3 は無理数か",
    unit: "数と式",
    difficulty: "D",
    tagline: "2 乗して、√6 に矛盾を押し付ける",
    hasGraph: false,
    statement: r`$\sqrt2+\sqrt3$ が無理数であることを示せ。（$\sqrt2,\sqrt3,\sqrt6$ が無理数であることは用いてよい。）`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 背理法で √6 に矛盾を押し付ける",
        body: r`無理数であることの直接証明は難しいので、「有理数だ」と仮定して矛盾を導く（背理法）。$\sqrt2+\sqrt3$ を 2 乗すると交差項に $\sqrt6$ が現れ、それが有理数になってしまう——既知の「$\sqrt6$ は無理数」と衝突させるのが筋。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 2 乗で何が出るか試す",
        body: r`$(\sqrt2+\sqrt3)^2=2+2\sqrt2\sqrt3+3=5+2\sqrt6$。有理部 $5$ と無理部 $2\sqrt6$ にきれいに割れる。もし全体が有理数なら、移項して $\sqrt6$ が有理数で表せてしまう——矛盾の種がここに見える。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$(\sqrt2+\sqrt3)^2=5+2\sqrt6$。これが有理数 $r^2$ なら $\sqrt6=\dfrac{r^2-5}{2}$ も有理数。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\sqrt2+\sqrt3=r$ が有理数だと仮定する。両辺を 2 乗して
$$(\sqrt2+\sqrt3)^2=5+2\sqrt6=r^2.$$
よって
$$\sqrt6=\frac{r^2-5}{2}.$$
右辺は有理数 $r$ の四則演算だから有理数。しかし $\sqrt6$ は無理数（既知）であり、矛盾。ゆえに $\sqrt2+\sqrt3$ は有理数ではない、すなわち**無理数**である。$\blacksquare$

**別解（$\sqrt2$ の無理性へ帰着）。** $\sqrt2+\sqrt3=r$ なら $\sqrt3=r-\sqrt2$、2 乗して $3=r^2-2\sqrt2\,r+2$、整理して $\sqrt2=\dfrac{r^2-1}{2r}$（$r\neq0$）。右辺は有理数で、$\sqrt2$ が無理数であることに矛盾。どちらの道でも「2 乗して根号を 1 つ孤立させ、有理数に化けさせて矛盾」が骨格。

**メタ。** 背理法の勘所は「何と衝突させるか（$\sqrt6$ あるいは $\sqrt2$ の無理性）」を最初に決めること。2 乗は根号を減らす操作なので、無理数の和の問題で頻出の常套手段。`,
      },
    ],
  },
  {
    slug: "am-hm-product-inequality",
    title: "(a+b)(1/a+1/b) ≥ 4 を示す",
    unit: "数と式",
    difficulty: "D",
    tagline: "展開して、相加・相乗へ",
    hasGraph: false,
    statement: r`$a>0,\ b>0$ のとき、$\left(a+b\right)\left(\dfrac1a+\dfrac1b\right)\ge4$ を示し、等号成立条件を述べよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 展開して相互項を作る",
        body: r`$(a+b)\left(\dfrac1a+\dfrac1b\right)$ をいきなり評価せず、まず展開して構造を見ると $2+\dfrac ab+\dfrac ba$。正数とその逆数の和 $\dfrac ab+\dfrac ba$ に相加・相乗平均が刺さる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — t + 1/t の谷を見る",
        body: r`$t=\dfrac ab>0$ とおくと $\dfrac ab+\dfrac ba=t+\dfrac1t$。$t=1$ で $2$、$t=2$ で $2.5$、$t=\tfrac12$ で $2.5$。$t=1$（＝$a=b$）で最小 $2$ をとると見える。これは $t+\dfrac1t-2=\dfrac{(t-1)^2}{t}\ge0$ から厳密化できる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\dfrac ab+\dfrac ba\ge2\sqrt{\dfrac ab\cdot\dfrac ba}=2$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**展開。**
$$(a+b)\left(\frac1a+\frac1b\right)=1+\frac ab+\frac ba+1=2+\left(\frac ab+\frac ba\right).$$
**相加・相乗平均。** $a,b>0$ より $\dfrac ab,\dfrac ba>0$。相加・相乗平均の不等式から
$$\frac ab+\frac ba\ge2\sqrt{\frac ab\cdot\frac ba}=2.$$
（あるいは $\dfrac ab+\dfrac ba-2=\dfrac{a^2+b^2-2ab}{ab}=\dfrac{(a-b)^2}{ab}\ge0$。）よって
$$(a+b)\left(\frac1a+\frac1b\right)\ge2+2=4.$$
**等号成立。** $\dfrac ab=\dfrac ba$ すなわち $a=b$ のとき。$\blacksquare$

**別解（コーシー・シュワルツ）。** $(a+b)\left(\dfrac1a+\dfrac1b\right)\ge\left(\sqrt a\cdot\dfrac1{\sqrt a}+\sqrt b\cdot\dfrac1{\sqrt b}\right)^2=(1+1)^2=4$。等号は $\dfrac{a}{1/a}=\dfrac{b}{1/b}$、すなわち $a=b$。

**メタ。** 「積の形の不等式は展開して相互項（逆数和）を作る」が定石。これは 3 文字版 $(a+b+c)\left(\dfrac1a+\dfrac1b+\dfrac1c\right)\ge9$、一般の $n$ 文字版（$\ge n^2$）へそのまま拡張でき、背骨はコーシー・シュワルツである。`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "four-consecutive-product-plus-one",
    title: "4 連続整数の積に 1 を足すと平方数",
    unit: "数と式",
    difficulty: "D_PLUS",
    tagline: "+1 が、平方数の穴をぴたりと埋める",
    hasGraph: false,
    statement: r`任意の整数 $n$ に対し、連続する 4 つの整数の積に 1 を足した数

$$n(n+1)(n+2)(n+3)+1$$

は、ある整数の 2 乗になることを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 両端と内側で組む",
        body: r`4 つを「両端どうし」「内側どうし」で組むと、同じ塊 $n^2+3n$ が現れる。その塊を 1 文字に置き換えると、式がきれいな 2 次式に化ける。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 小さく試す",
        body: r`$n=1$：$1\cdot2\cdot3\cdot4+1=25=5^2$。$n=2$：$2\cdot3\cdot4\cdot5+1=121=11^2$。$n=3$：$3\cdot4\cdot5\cdot6+1=361=19^2$。毎回平方数。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 置き換え",
        body: r`$n(n+3)=n^2+3n$、$(n+1)(n+2)=n^2+3n+2$。$m=n^2+3n+1$ とおくと積は $(m-1)(m+1)$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`両端と内側を組む：
$$n(n+3)=n^2+3n,\qquad(n+1)(n+2)=n^2+3n+2.$$
$m=n^2+3n+1$ とおくと、これらは $m-1,\ m+1$。よって
$$n(n+1)(n+2)(n+3)+1=(m-1)(m+1)+1=m^2-1+1=m^2.$$
すなわち
$$n(n+1)(n+2)(n+3)+1=\bigl(n^2+3n+1\bigr)^2.$$
これは整数の 2 乗だから、つねに平方数である。$\blacksquare$

**別解（中心で対称化）。** 4 数の中心 $t=n+\dfrac32$ のまわりで見ると、4 数は $t\pm\dfrac12,\ t\pm\dfrac32$。積は
$$\left(t-\tfrac12\right)\left(t+\tfrac12\right)\left(t-\tfrac32\right)\left(t+\tfrac32\right)=\left(t^2-\tfrac14\right)\left(t^2-\tfrac94\right).$$
$u=t^2-\dfrac54$ とおくと、これは $\left(u+1\right)\left(u-1\right)=u^2-1$。よって積 $+1=u^2$。ここで $u=\left(n+\tfrac32\right)^2-\tfrac54=n^2+3n+1$ となり、同じ結論に至る。中心対称に置くと「平方数の隣 $u^2-1$」という構造がさらに鮮明になる。

**美しさ:** バラバラな 4 連続の積が、組み方ひとつで「平方数のすぐ隣」$m^2-1$ に化け、$+1$ がその穴をぴたりと埋める。`,
      },
    ],
  },
];
