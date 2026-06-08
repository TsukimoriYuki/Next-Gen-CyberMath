import type { Problem } from "@/lib/types";

// 数学II「指数関数と対数関数」— 15 問 (A4/B4/C4/D2/D+1)。
const r = String.raw;

export const exponentialAndLogarithmic: Problem[] = [
  // ============================== A (4) ==============================
  {
    slug: "exponent-laws-eval",
    title: "指数法則の計算",
    unit: "指数関数と対数関数",
    difficulty: "A",
    tagline: "有理数乗を根号で読む",
    hasGraph: false,
    tags: ["指数法則"],
    statement: r`次の値を求めよ。 $8^{\frac23}$、$\ 9^{-\frac12}$、$\ \dfrac{(2^3)^2}{2^4}$。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 底をそろえる", body: r`$8=2^3,\ 9=3^2$ と素因数の累乗で表し、$a^{m/n}=\sqrt[n]{a^m}$、$a^{-p}=\dfrac1{a^p}$ を使う。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$8^{2/3}=(2^3)^{2/3}=2^2$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$8^{\frac23}=(2^3)^{\frac23}=2^2=4$。$9^{-\frac12}=(3^2)^{-\frac12}=3^{-1}=\dfrac13$。$\dfrac{(2^3)^2}{2^4}=\dfrac{2^6}{2^4}=2^2=4$。` },
    ],
  },
  {
    slug: "log-basic-values",
    title: "対数の値",
    unit: "指数関数と対数関数",
    difficulty: "A",
    tagline: "logₐM = (a を何乗すると M か)",
    hasGraph: false,
    tags: ["対数"],
    statement: r`次の値を求めよ。 $\log_2 8$、$\ \log_3\dfrac19$、$\ \log_{10}1000$。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 定義に戻る", body: r`$\log_a M=p\iff a^p=M$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$2^3=8$、$3^{-2}=\dfrac19$、$10^3=1000$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\log_2 8=3$、$\log_3\dfrac19=-2$、$\log_{10}1000=3$。` },
    ],
  },
  {
    slug: "log-laws-combine",
    title: "対数の性質",
    unit: "指数関数と対数関数",
    difficulty: "A",
    tagline: "和は積、差は商",
    hasGraph: false,
    tags: ["対数", "対数法則"],
    statement: r`$\log_2 6+\log_2\dfrac23$ を計算せよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 和を積に", body: r`$\log_a M+\log_a N=\log_a(MN)$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$6\cdot\dfrac23=4$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\log_2 6+\log_2\dfrac23=\log_2\!\left(6\cdot\dfrac23\right)=\log_2 4=2$。` },
    ],
  },
  {
    slug: "change-of-base",
    title: "底の変換公式",
    unit: "指数関数と対数関数",
    difficulty: "A",
    tagline: "底をそろえて計算",
    hasGraph: false,
    tags: ["対数", "底の変換"],
    statement: r`$\log_4 8$ の値を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 底の変換", body: r`$\log_a b=\dfrac{\log_c b}{\log_c a}$。底を $2$ にそろえる。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\dfrac{\log_2 8}{\log_2 4}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\log_4 8=\dfrac{\log_2 8}{\log_2 4}=\dfrac{3}{2}$。` },
    ],
  },

  // ============================== B (4) ==============================
  {
    slug: "exp-equation-quadratic",
    title: "指数方程式（2 次に帰着）",
    unit: "指数関数と対数関数",
    difficulty: "B",
    tagline: "t = 2ˣ と置く",
    hasGraph: false,
    tags: ["指数方程式", "置き換え"],
    statement: r`方程式 $2^{2x}-3\cdot2^{x}+2=0$ を解け。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 置き換え", body: r`$t=2^x\ (t>0)$ とおくと $2^{2x}=t^2$ で 2 次方程式になる。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$t^2-3t+2=0$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$t=2^x>0$ とおくと $t^2-3t+2=0\Rightarrow(t-1)(t-2)=0\Rightarrow t=1,2$。
$2^x=1\Rightarrow x=0$、$2^x=2\Rightarrow x=1$。` },
    ],
  },
  {
    slug: "log-equation-product",
    title: "対数方程式",
    unit: "指数関数と対数関数",
    difficulty: "B",
    tagline: "真数条件を忘れない",
    hasGraph: false,
    tags: ["対数方程式", "真数条件"],
    statement: r`方程式 $\log_2(x-1)+\log_2(x+1)=3$ を解け。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 真数条件 + 和を積に", body: r`真数 $>0$ より $x>1$。左辺を $\log_2\{(x-1)(x+1)\}$ にまとめる。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$(x-1)(x+1)=2^3=8$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`真数条件は $x>1$。$\log_2\{(x-1)(x+1)\}=3\Rightarrow x^2-1=8\Rightarrow x^2=9\Rightarrow x=\pm3$。
$x>1$ より $x=3$。` },
    ],
  },
  {
    slug: "exp-inequality-base-lt-one",
    title: "指数不等式（底が 1 未満）",
    unit: "指数関数と対数関数",
    difficulty: "B",
    tagline: "底が 1 未満なら不等号が反転",
    hasGraph: false,
    tags: ["指数不等式"],
    statement: r`不等式 $\left(\dfrac13\right)^{x}>9$ を解け。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 底をそろえる", body: r`$9=\left(\dfrac13\right)^{-2}$。底 $\dfrac13$ は $1$ 未満なので、指数を比べるとき不等号の向きが反転する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\left(\dfrac13\right)^x>\left(\dfrac13\right)^{-2}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\left(\dfrac13\right)^x>\left(\dfrac13\right)^{-2}$。底 $0<\dfrac13<1$ より減少関数なので、指数の不等号は反転して $x<-2$。` },
    ],
  },
  {
    slug: "log-inequality-base-lt-one",
    title: "対数不等式（底が 1 未満）",
    unit: "指数関数と対数関数",
    difficulty: "B",
    tagline: "真数条件 + 不等号の反転",
    hasGraph: false,
    tags: ["対数不等式", "真数条件"],
    statement: r`不等式 $\log_{\frac12}x\ge -3$ を解け。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 真数条件と底", body: r`真数条件 $x>0$。底 $\dfrac12<1$ なので減少関数、不等号は反転する。$-3=\log_{\frac12}\left(\dfrac12\right)^{-3}$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\left(\dfrac12\right)^{-3}=8$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`真数条件 $x>0$。$\log_{\frac12}x\ge\log_{\frac12}8$。底が $1$ 未満なので反転して $x\le8$。
よって $0<x\le8$。` },
    ],
  },

  // ============================== C (4) ==============================
  {
    slug: "exp-log-inverse-graph",
    title: "指数関数と対数関数のグラフ",
    unit: "指数関数と対数関数",
    difficulty: "C",
    tagline: "互いに逆関数 — y=x で対称",
    hasGraph: false,
    tags: ["指数関数", "対数関数", "逆関数"],
    statement: r`$y=2^x$ と $y=\log_2 x$ のグラフは直線 $y=x$ に関して対称であることを、逆関数の考え方から説明せよ。また、$y=2^x$ のグラフ上の点 $(3,8)$ に対応する $y=\log_2 x$ 上の点を答えよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 逆関数の対称性", body: r`$y=2^x$ と $y=\log_2 x$ は互いに逆関数。逆関数のグラフは元のグラフを直線 $y=x$ に関して折り返したもの。点 $(a,b)$ が一方にあれば $(b,a)$ が他方にある。` },
      { type: "EXPERIMENT", order: 1, title: "実験 — 底を変えて対称を見る", body: r`ラボで底 $a$ を変えると、$y=a^x$ と $y=\log_a x$ がつねに $y=x$ で鏡像になることが確認できる。

@@lab:exp-log-inverse@@` },
      { type: "HINT", order: 2, title: "ヒント", body: r`$2^3=8\iff\log_2 8=3$。点 $(3,8)$ と $(8,3)$。` },
      { type: "SOLUTION", order: 3, title: "厳密な解答", body: r`$y=2^x$ で $x$ と $y$ を入れ替えると $x=2^y$、すなわち $y=\log_2 x$。$x\leftrightarrow y$ の入れ替えは直線 $y=x$ に関する対称移動だから、2 つのグラフは $y=x$ に関して対称。
$2^3=8$ より $\log_2 8=3$。よって $(3,8)$ に対応する点は $(8,3)$。` },
    ],
  },
  {
    slug: "log-max-min-substitution",
    title: "対数の最大・最小",
    unit: "指数関数と対数関数",
    difficulty: "C",
    tagline: "t = log₂x に置換",
    hasGraph: false,
    tags: ["対数", "最大最小", "二次関数"],
    statement: r`$1\le x\le 8$ のとき、$y=(\log_2 x)^2-\log_2 x^2+3$ の最大値・最小値を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — log を 1 文字に", body: r`$\log_2 x^2=2\log_2 x$。$t=\log_2 x$ とおくと $y$ は $t$ の 2 次関数。$x$ の範囲から $t$ の範囲が出る。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$1\le x\le8\Rightarrow 0\le t\le3$。$y=t^2-2t+3$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$t=\log_2 x$ とおくと $1\le x\le8$ より $0\le t\le3$。
$$y=t^2-2t+3=(t-1)^2+2.$$
軸 $t=1\in[0,3]$。最小値は $t=1$（$x=2$）で $2$。端の値は $t=0$ で $3$、$t=3$ で $6$。最大値は $t=3$（$x=8$）で $6$。` },
    ],
  },
  {
    slug: "exp-max-min-substitution",
    title: "指数関数の最小値",
    unit: "指数関数と対数関数",
    difficulty: "C",
    tagline: "t = 2ˣ > 0 の範囲に注意",
    hasGraph: false,
    tags: ["指数関数", "最大最小", "二次関数"],
    statement: r`$y=4^{x}-2^{x+1}+3$ の最小値とそのときの $x$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — t = 2ˣ", body: r`$4^x=(2^x)^2$、$2^{x+1}=2\cdot2^x$。$t=2^x>0$ とおくと 2 次関数。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$y=t^2-2t+3=(t-1)^2+2$、$t>0$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$t=2^x>0$ とおくと $y=t^2-2t+3=(t-1)^2+2$。軸 $t=1>0$ は定義域内なので、最小値は $t=1$ で $2$。
$2^x=1\Rightarrow x=0$。最小値 $2$（$x=0$）。` },
    ],
  },
  {
    slug: "common-log-digits",
    title: "常用対数と桁数",
    unit: "指数関数と対数関数",
    difficulty: "C",
    tagline: "桁数 = ⌊log₁₀N⌋ + 1",
    hasGraph: false,
    tags: ["常用対数", "桁数"],
    statement: r`$2^{100}$ は何桁の整数か。ただし $\log_{10}2=0.3010$ とする。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 常用対数で桁を測る", body: r`正の整数 $N$ の桁数は $\lfloor\log_{10}N\rfloor+1$。$\log_{10}2^{100}=100\log_{10}2$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$100\times0.3010=30.10$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\log_{10}2^{100}=100\cdot0.3010=30.10$。$30\le30.10<31$ なので $10^{30}\le2^{100}<10^{31}$。
よって桁数は $30+1=31$ 桁。` },
    ],
  },

  // ============================== D (2) ==============================
  {
    slug: "log-self-exponent-equation",
    title: "対数が指数に乗る方程式",
    unit: "指数関数と対数関数",
    difficulty: "D",
    tagline: "両辺の常用対数をとる",
    hasGraph: false,
    tags: ["対数方程式", "常用対数", "置き換え"],
    statement: r`方程式 $x^{\log_{10}x}=100x$ を解け（$x>0$）。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — log をとる", body: r`両辺の常用対数をとると、左辺は $(\log_{10}x)^2$ になる。$t=\log_{10}x$ で 2 次方程式。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$(\log_{10}x)^2=2+\log_{10}x$。$t^2-t-2=0$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$x>0$ で両辺の常用対数をとると
$$(\log_{10}x)(\log_{10}x)=\log_{10}100+\log_{10}x,$$
すなわち $t=\log_{10}x$ として $t^2=2+t\Rightarrow t^2-t-2=0\Rightarrow(t-2)(t+1)=0\Rightarrow t=2,-1$。
$\log_{10}x=2\Rightarrow x=100$、$\log_{10}x=-1\Rightarrow x=\dfrac1{10}$。` },
    ],
  },
  {
    slug: "exp-symmetric-min",
    title: "2ˣ + 2⁻ˣ の置換と最小",
    unit: "指数関数と対数関数",
    difficulty: "D",
    tagline: "t = 2ˣ + 2⁻ˣ ≥ 2",
    hasGraph: false,
    tags: ["指数関数", "相加相乗平均", "最大最小"],
    statement: r`$f(x)=4^{x}+4^{-x}-2\left(2^{x}+2^{-x}\right)$ の最小値とそのときの $x$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 対称式の置換", body: r`$t=2^x+2^{-x}$ とおくと、相加・相乗平均より $t\ge2$。$4^x+4^{-x}=(2^x+2^{-x})^2-2=t^2-2$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$f=t^2-2-2t=(t-1)^2-3$、ただし $t\ge2$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$t=2^x+2^{-x}$ は相加・相乗平均より $t\ge2\sqrt{2^x\cdot2^{-x}}=2$（等号 $x=0$）。
$f=(t^2-2)-2t=(t-1)^2-3$。これは $t\ge2$ で増加だから、最小は $t=2$ のとき $(2-1)^2-3=-2$。
$t=2\iff x=0$。最小値 $-2$（$x=0$）。` },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "log2-3-irrational",
    title: "log₂3 は無理数",
    unit: "指数関数と対数関数",
    difficulty: "D_PLUS",
    tagline: "偶数 = 奇数 の矛盾",
    hasGraph: false,
    tags: ["背理法", "無理数", "対数", "素因数分解"],
    statement: r`$\log_2 3$ が無理数であることを示せ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 有理数と仮定して指数へ", body: r`有理数だと仮定して $\log_2 3=\dfrac pq$ とおき、対数の定義で指数の等式 $3^q=2^p$ に直すと、偶奇（素因数 2）で矛盾が出る。` },
      { type: "EXPERIMENT", order: 1, title: "実験 — 正であることの確認", body: r`$2^1=2<3<4=2^2$ より $1<\log_2 3<2$ で、$\log_2 3>0$。よって有理数なら正の整数 $p,q$ で $\log_2 3=\dfrac pq$ と書ける。` },
      { type: "HINT", order: 2, title: "ヒント", body: r`$2^{p/q}=3\Rightarrow 2^p=3^q$。左辺は偶数、右辺は奇数。` },
      { type: "SOLUTION", order: 3, title: "厳密な解答", body: r`$\log_2 3>0$。これが有理数だと仮定すると、互いに素な正の整数 $p,q$ で $\log_2 3=\dfrac pq$ と書ける。対数の定義より
$$2^{\frac pq}=3\ \Longrightarrow\ 2^{p}=3^{q}.$$
左辺 $2^p$ は（$p\ge1$ より）偶数だが、右辺 $3^q$ は奇数の累乗で奇数。偶数と奇数が等しいことはありえず、矛盾。
よって $\log_2 3$ は無理数である。$\blacksquare$

**美しさ:** 対数という連続的な量の無理性が、「$2^p$ は偶数、$3^q$ は奇数」というたった一つの素因数 $2$ の有無で断ち切られる。解析の問いが整数論の一撃で決着する。` },
    ],
  },
];
