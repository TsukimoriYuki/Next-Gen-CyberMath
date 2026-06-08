import type { Problem } from "@/lib/types";

// 数学II「複素数と方程式」— 15 問 (A4/B4/C4/D2/D+1)。
const r = String.raw;

export const complexNumbersEquations: Problem[] = [
  // ============================== A (4) ==============================
  {
    slug: "complex-multiply",
    title: "複素数の積",
    unit: "複素数と方程式",
    difficulty: "A",
    tagline: "i² = −1 に直す",
    hasGraph: false,
    tags: ["複素数"],
    statement: r`$(2+3i)(1-i)$ を $a+bi$ の形で表せ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 展開して i²", body: r`通常の分配法則で展開し、$i^2=-1$ を代入する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$2-2i+3i-3i^2$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$(2+3i)(1-i)=2-2i+3i-3i^2=2+i+3=5+i$。` },
    ],
  },
  {
    slug: "complex-divide",
    title: "複素数の商",
    unit: "複素数と方程式",
    difficulty: "A",
    tagline: "分母の共役を掛ける",
    hasGraph: false,
    tags: ["複素数", "共役複素数"],
    statement: r`$\dfrac{3+i}{2-i}$ を $a+bi$ の形で表せ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 分母を実数化", body: r`分母の共役 $2+i$ を分母分子に掛けると、分母が $2^2+1^2$ の実数になる。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\dfrac{(3+i)(2+i)}{(2-i)(2+i)}=\dfrac{(3+i)(2+i)}{5}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\dfrac{(3+i)(2+i)}{5}=\dfrac{6+3i+2i+i^2}{5}=\dfrac{5+5i}{5}=1+i$。` },
    ],
  },
  {
    slug: "quadratic-complex-roots",
    title: "2 次方程式の虚数解",
    unit: "複素数と方程式",
    difficulty: "A",
    tagline: "判別式が負なら虚数解",
    hasGraph: false,
    tags: ["二次方程式", "判別式", "複素数"],
    statement: r`2 次方程式 $x^2-2x+5=0$ を解け。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 解の公式", body: r`判別式 $D=(-2)^2-4\cdot5=-16<0$ なので虚数解。解の公式で $\sqrt{-16}=4i$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$x=\dfrac{2\pm\sqrt{-16}}{2}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$x=\dfrac{2\pm\sqrt{-16}}{2}=\dfrac{2\pm4i}{2}=1\pm2i$。` },
    ],
  },
  {
    slug: "sum-product-of-roots",
    title: "解と係数の関係",
    unit: "複素数と方程式",
    difficulty: "A",
    tagline: "α+β と αβ から対称式へ",
    hasGraph: false,
    tags: ["解と係数の関係", "対称式"],
    statement: r`2 次方程式 $x^2-3x+5=0$ の 2 解を $\alpha,\beta$ とするとき、$\alpha+\beta$、$\alpha\beta$、$\alpha^2+\beta^2$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 解と係数の関係", body: r`$\alpha+\beta=3,\ \alpha\beta=5$。$\alpha^2+\beta^2=(\alpha+\beta)^2-2\alpha\beta$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$3^2-2\cdot5$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\alpha+\beta=3,\ \alpha\beta=5$。$\alpha^2+\beta^2=(\alpha+\beta)^2-2\alpha\beta=9-10=-1$。` },
    ],
  },

  // ============================== B (4) ==============================
  {
    slug: "remainder-theorem-basic",
    title: "剰余の定理",
    unit: "複素数と方程式",
    difficulty: "B",
    tagline: "余りは P(a)",
    hasGraph: false,
    tags: ["剰余の定理"],
    statement: r`整式 $P(x)=x^3-2x^2+3$ を $x-2$ で割った余りを求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 剰余の定理", body: r`$P(x)$ を $x-a$ で割った余りは $P(a)$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$P(2)$ を計算。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$P(2)=8-8+3=3$。余りは $3$。` },
    ],
  },
  {
    slug: "factor-theorem-cubic",
    title: "因数定理で 3 次式を因数分解",
    unit: "複素数と方程式",
    difficulty: "B",
    tagline: "P(a)=0 となる a を探す",
    hasGraph: false,
    tags: ["因数定理", "因数分解"],
    statement: r`$x^3-7x+6$ を因数分解せよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 定数項の約数を試す", body: r`整数解の候補は定数項 $6$ の約数 $\pm1,\pm2,\pm3,\pm6$。$x=1$ で $0$ になる。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$x-1$ で割ると $x^2+x-6$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$x=1$ が解なので $x-1$ を因数にもつ。割ると $x^3-7x+6=(x-1)(x^2+x-6)=(x-1)(x+3)(x-2)$。` },
    ],
  },
  {
    slug: "construct-quadratic-irrational-root",
    title: "無理数解から 2 次方程式を作る",
    unit: "複素数と方程式",
    difficulty: "B",
    tagline: "共役根で和と積を",
    hasGraph: false,
    tags: ["解と係数の関係", "共役"],
    statement: r`$2+\sqrt3$ を解にもつ、有理数を係数とする 2 次方程式を 1 つ作れ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 共役も解", body: r`有理数係数なら共役 $2-\sqrt3$ も解。和と積を計算して解と係数の関係から方程式を作る。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`和 $=4$、積 $=(2+\sqrt3)(2-\sqrt3)=1$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`2 解の和 $4$、積 $4-3=1$。よって $x^2-4x+1=0$。` },
    ],
  },
  {
    slug: "real-cubic-complex-root",
    title: "実係数 3 次方程式と虚数解",
    unit: "複素数と方程式",
    difficulty: "B",
    tagline: "虚数解は共役とペア",
    hasGraph: false,
    tags: ["複素数", "解と係数の関係", "高次方程式"],
    statement: r`実数係数の 3 次方程式 $x^3+ax+b=0$ が $x=1+i$ を解にもつとき、定数 $a,b$ と残りの解を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 共役解と解と係数", body: r`実係数なので $1-i$ も解。3 つの解の和は $x^2$ の係数 $0$ に等しいので、残りの解が決まる。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$(1+i)+(1-i)+\gamma=0$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`実係数より $1-i$ も解。3 解の和は $0$（$x^2$ の係数が $0$）だから $\gamma=-2$。
解と係数の関係より、$a=$（2 つずつの積の和）$=(1+i)(1-i)+(1+i)(-2)+(1-i)(-2)=2-4=-2$。
$b=-$（3 解の積）$=-\,(1+i)(1-i)(-2)=-\,(2)(-2)=4$。
よって $a=-2,\ b=4$、残りの解は $1-i$ と $-2$。` },
    ],
  },

  // ============================== C (4) ==============================
  {
    slug: "de-moivre-power",
    title: "ド・モアブルの定理でべき乗",
    unit: "複素数と方程式",
    difficulty: "C",
    tagline: "極形式にして角を n 倍",
    hasGraph: false,
    tags: ["ド・モアブルの定理", "極形式", "複素数"],
    statement: r`$(1+i)^{10}$ を計算せよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 極形式", body: r`$1+i=\sqrt2\left(\cos\dfrac{\pi}{4}+i\sin\dfrac{\pi}{4}\right)$。ド・モアブルの定理で 10 乗する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$(\sqrt2)^{10}=32$、偏角は $\dfrac{10\pi}{4}=\dfrac{5\pi}{2}\equiv\dfrac{\pi}{2}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$(1+i)^{10}=(\sqrt2)^{10}\left(\cos\dfrac{10\pi}{4}+i\sin\dfrac{10\pi}{4}\right)=32\left(\cos\dfrac{\pi}{2}+i\sin\dfrac{\pi}{2}\right)=32i$。` },
    ],
  },
  {
    slug: "cubic-one-real-two-complex",
    title: "3 次方程式の解（虚数解を含む）",
    unit: "複素数と方程式",
    difficulty: "C",
    tagline: "実数解で割って 2 次へ",
    hasGraph: false,
    tags: ["高次方程式", "因数定理", "複素数"],
    statement: r`方程式 $x^3-3x^2+4x-2=0$ を解け。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 有理解を探す", body: r`定数項 $-2$ の約数で試すと $x=1$ が解。$x-1$ で割って 2 次方程式に帰着する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$(x-1)(x^2-2x+2)=0$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$x=1$ が解。割って $(x-1)(x^2-2x+2)=0$。$x^2-2x+2=0$ より $x=1\pm i$。
よって $x=1,\ 1+i,\ 1-i$。` },
    ],
  },
  {
    slug: "sum-of-squares-of-roots-cubic",
    title: "3 次方程式の解の対称式",
    unit: "複素数と方程式",
    difficulty: "C",
    tagline: "基本対称式に直す",
    hasGraph: false,
    tags: ["解と係数の関係", "対称式", "高次方程式"],
    statement: r`方程式 $x^3-2x^2+3x-4=0$ の 3 解を $\alpha,\beta,\gamma$ とするとき、$\alpha^2+\beta^2+\gamma^2$ の値を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 3 次の解と係数", body: r`$\alpha+\beta+\gamma=2$、$\alpha\beta+\beta\gamma+\gamma\alpha=3$。$\alpha^2+\beta^2+\gamma^2=(\sum\alpha)^2-2\sum\alpha\beta$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$2^2-2\cdot3$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`解と係数の関係より $\alpha+\beta+\gamma=2,\ \alpha\beta+\beta\gamma+\gamma\alpha=3$。
$$\alpha^2+\beta^2+\gamma^2=(\alpha+\beta+\gamma)^2-2(\alpha\beta+\beta\gamma+\gamma\alpha)=4-6=-2.$$` },
    ],
  },
  {
    slug: "cube-root-of-unity-omega",
    title: "1 の 3 乗根 ω の計算",
    unit: "複素数と方程式",
    difficulty: "C",
    tagline: "ω²+ω+1=0 と ω³=1",
    hasGraph: false,
    tags: ["1の3乗根", "複素数", "対称性"],
    statement: r`$\omega$ を $1$ の虚数立方根（$\omega^3=1,\ \omega\neq1$）とするとき、$\omega^{10}+\omega^{5}+1$ の値を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 2 つの基本関係", body: r`$\omega^3=1$ で指数を簡約し、$\omega^2+\omega+1=0$ を使う。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\omega^{10}=\omega^{9}\cdot\omega=\omega$、$\omega^{5}=\omega^{3}\cdot\omega^{2}=\omega^{2}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\omega^{10}=\omega,\ \omega^{5}=\omega^{2}$ なので
$$\omega^{10}+\omega^{5}+1=\omega+\omega^{2}+1=0.$$
（$\omega^2+\omega+1=0$ より。）` },
    ],
  },

  // ============================== D (2) ==============================
  {
    slug: "reciprocal-quartic-equation",
    title: "相反方程式",
    unit: "複素数と方程式",
    difficulty: "D",
    tagline: "t = x + 1/x で次数を半分に",
    hasGraph: false,
    tags: ["高次方程式", "対称式", "置き換え"],
    statement: r`方程式 $x^4-5x^3+8x^2-5x+1=0$ を解け。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 係数が左右対称", body: r`係数が左右対称（相反方程式）。$x\neq0$ なので両辺を $x^2$ で割り、$t=x+\dfrac1x$ とおくと次数が下がる。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$x^2+\dfrac1{x^2}=t^2-2$。$\left(x^2+\dfrac1{x^2}\right)-5\left(x+\dfrac1x\right)+8=0$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$x=0$ は解でないので両辺を $x^2$ で割ると
$$x^2+\frac1{x^2}-5\left(x+\frac1x\right)+8=0.$$
$t=x+\dfrac1x$ とおくと $x^2+\dfrac1{x^2}=t^2-2$ で、$t^2-2-5t+8=0\Rightarrow t^2-5t+6=0\Rightarrow t=2,\ 3$。
$t=2$：$x+\dfrac1x=2\Rightarrow x^2-2x+1=0\Rightarrow x=1$（重解）。
$t=3$：$x^2-3x+1=0\Rightarrow x=\dfrac{3\pm\sqrt5}{2}$。
よって $x=1,\ \dfrac{3\pm\sqrt5}{2}$。` },
    ],
  },
  {
    slug: "cubic-three-real-roots-range",
    title: "3 実解をもつ条件",
    unit: "複素数と方程式",
    difficulty: "D",
    tagline: "極大・極小の符号",
    hasGraph: false,
    tags: ["高次方程式", "微分", "場合分け"],
    statement: r`方程式 $x^3-3x+k=0$ が異なる 3 つの実数解をもつような定数 $k$ の範囲を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 極値の符号", body: r`$f(x)=x^3-3x+k$ が異なる 3 実解をもつ条件は（極大値）$>0>$（極小値）、すなわち（極大値）×（極小値）$<0$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$f'(x)=3x^2-3=0\Rightarrow x=\pm1$。$f(-1)=k+2$（極大）、$f(1)=k-2$（極小）。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$f'(x)=3(x-1)(x+1)$ より、$x=-1$ で極大 $f(-1)=k+2$、$x=1$ で極小 $f(1)=k-2$。
異なる 3 実解の条件は $f(-1)\,f(1)<0$：
$$(k+2)(k-2)<0\Rightarrow -2<k<2.$$` },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "newton-power-sum-cubic",
    title: "方程式自身を使う累乗和",
    unit: "複素数と方程式",
    difficulty: "D_PLUS",
    tagline: "α は α³ = α + 1 を満たす",
    hasGraph: false,
    tags: ["解と係数の関係", "対称式", "高次方程式"],
    statement: r`方程式 $x^3-x-1=0$ の 3 解を $\alpha,\beta,\gamma$ とする。$\dfrac1\alpha+\dfrac1\beta+\dfrac1\gamma$ および $\alpha^3+\beta^3+\gamma^3$ の値を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 解は方程式を満たす", body: r`各解は $\alpha^3=\alpha+1$ をみたす。高次のべきは、この関係で低次に落とせる。逆数和は基本対称式の比。` },
      { type: "EXPERIMENT", order: 1, title: "実験 — 基本対称式を読む", body: r`$x^3+0\cdot x^2-x-1=0$ より、解と係数の関係は $\alpha+\beta+\gamma=0$、$\alpha\beta+\beta\gamma+\gamma\alpha=-1$、$\alpha\beta\gamma=1$。` },
      { type: "HINT", order: 2, title: "ヒント", body: r`$\dfrac1\alpha+\dfrac1\beta+\dfrac1\gamma=\dfrac{\alpha\beta+\beta\gamma+\gamma\alpha}{\alpha\beta\gamma}$。$\alpha^3=\alpha+1$ を 3 解で足す。` },
      { type: "SOLUTION", order: 3, title: "厳密な解答", body: r`解と係数の関係より $e_1=\alpha+\beta+\gamma=0,\ e_2=\alpha\beta+\beta\gamma+\gamma\alpha=-1,\ e_3=\alpha\beta\gamma=1$。

逆数和：
$$\frac1\alpha+\frac1\beta+\frac1\gamma=\frac{\alpha\beta+\beta\gamma+\gamma\alpha}{\alpha\beta\gamma}=\frac{e_2}{e_3}=\frac{-1}{1}=-1.$$

3 乗和：各解は $x^3-x-1=0$ をみたすので $\alpha^3=\alpha+1$（$\beta,\gamma$ も同様）。辺々足すと
$$\alpha^3+\beta^3+\gamma^3=(\alpha+\beta+\gamma)+3=e_1+3=0+3=3.$$
$\blacksquare$

**美しさ:** 解が満たす方程式そのものを「次数を下げる規則」として使うと、3 乗和が一瞬で求まる。対称式と漸化的な簡約が手を取り合う、累乗和（ニュートンの公式）の心臓部である。` },
    ],
  },
];
