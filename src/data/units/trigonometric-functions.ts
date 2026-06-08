import type { Problem } from "@/lib/types";

// 数学II「三角関数」— 15 問 (A4/B4/C4/D2/D+1)。
// 既存ショーケース (tan1°, 合成) と同じ unit "三角関数" に統合される。
const r = String.raw;

export const trigonometricFunctions: Problem[] = [
  // ============================== A (4) ==============================
  {
    slug: "radian-arc-sector",
    title: "弧度法と扇形",
    unit: "三角関数",
    difficulty: "A",
    tagline: "弧長 = rθ、面積 = ½r²θ",
    hasGraph: false,
    tags: ["弧度法", "扇形"],
    statement: r`半径 $6$、中心角 $120^\circ$ の扇形の弧の長さ $\ell$ と面積 $S$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — まず弧度法へ",
        body: r`角を弧度法に直すと公式が簡潔になる。中心角 $\theta$（ラジアン）の扇形では $\ell=r\theta$、$S=\dfrac12 r^2\theta=\dfrac12 r\ell$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$120^\circ=\dfrac{2\pi}{3}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\theta=120^\circ=\dfrac{2\pi}{3}$。
$$\ell=r\theta=6\cdot\frac{2\pi}{3}=4\pi,\qquad S=\frac12 r^2\theta=\frac12\cdot36\cdot\frac{2\pi}{3}=12\pi.$$`,
      },
    ],
  },
  {
    slug: "trig-values-radian",
    title: "三角関数の値（弧度法）",
    unit: "三角関数",
    difficulty: "A",
    tagline: "単位円で符号を読む",
    hasGraph: false,
    tags: ["三角関数の値"],
    statement: r`$\sin\dfrac{5\pi}{6}$、$\cos\dfrac{4\pi}{3}$、$\tan\dfrac{7\pi}{6}$ の値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 基準角と象限",
        body: r`各角がどの象限にあるかで符号を、基準となる鋭角で絶対値を決める。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dfrac{5\pi}{6}=\pi-\dfrac{\pi}{6}$、$\dfrac{4\pi}{3}=\pi+\dfrac{\pi}{3}$、$\dfrac{7\pi}{6}=\pi+\dfrac{\pi}{6}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\sin\dfrac{5\pi}{6}=\sin\dfrac{\pi}{6}=\dfrac12$。
$\cos\dfrac{4\pi}{3}=-\cos\dfrac{\pi}{3}=-\dfrac12$。
$\tan\dfrac{7\pi}{6}=\tan\dfrac{\pi}{6}=\dfrac{1}{\sqrt3}=\dfrac{\sqrt3}{3}$。`,
      },
    ],
  },
  {
    slug: "addition-sin-75",
    title: "加法定理で sin 75°",
    unit: "三角関数",
    difficulty: "A",
    tagline: "75° = 45° + 30°",
    hasGraph: false,
    tags: ["加法定理"],
    statement: r`加法定理を用いて $\sin 75^\circ$ の値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 既知の角の和に分ける",
        body: r`$75^\circ=45^\circ+30^\circ$。$\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\sin45^\circ\cos30^\circ+\cos45^\circ\sin30^\circ$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$$\sin75^\circ=\sin45^\circ\cos30^\circ+\cos45^\circ\sin30^\circ=\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2}+\frac{\sqrt2}{2}\cdot\frac12=\frac{\sqrt6+\sqrt2}{4}.$$`,
      },
    ],
  },
  {
    slug: "double-angle-basic",
    title: "2 倍角の公式",
    unit: "三角関数",
    difficulty: "A",
    tagline: "sin2θ = 2 sinθ cosθ",
    hasGraph: false,
    tags: ["2倍角の公式", "三角比の相互関係"],
    statement: r`$\theta$ は鋭角で $\sin\theta=\dfrac35$ とする。$\sin2\theta$ と $\cos2\theta$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — まず cosθ",
        body: r`鋭角なので $\cos\theta>0$。$\cos\theta=\sqrt{1-\sin^2\theta}$。2倍角は $\sin2\theta=2\sin\theta\cos\theta$、$\cos2\theta=1-2\sin^2\theta$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\cos\theta=\dfrac45$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\cos\theta=\sqrt{1-\frac{9}{25}}=\dfrac45$。
$\sin2\theta=2\cdot\dfrac35\cdot\dfrac45=\dfrac{24}{25}$、$\cos2\theta=1-2\cdot\dfrac{9}{25}=\dfrac{7}{25}$。`,
      },
    ],
  },

  // ============================== B (4) ==============================
  {
    slug: "tan-angle-between-lines",
    title: "2 直線のなす角",
    unit: "三角関数",
    difficulty: "B",
    tagline: "傾きと tan の加法定理",
    hasGraph: false,
    tags: ["加法定理", "2直線のなす角"],
    statement: r`2 直線 $y=2x$ と $y=-3x$ のなす鋭角を $\theta$ とするとき、$\tan\theta$ と $\theta$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 傾きは tan",
        body: r`直線の傾きはその傾斜角の正接。なす角の正接は $\tan\theta=\left|\dfrac{m_1-m_2}{1+m_1m_2}\right|$（tan の加法定理から）。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$m_1=2,\ m_2=-3$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$$\tan\theta=\left|\frac{2-(-3)}{1+2\cdot(-3)}\right|=\left|\frac{5}{-5}\right|=1.$$
$\theta$ は鋭角なので $\theta=45^\circ\ \left(=\dfrac{\pi}{4}\right)$。`,
      },
    ],
  },
  {
    slug: "trig-synthesis-maxmin",
    title: "三角関数の合成と最大・最小",
    unit: "三角関数",
    difficulty: "B",
    tagline: "1 つの正弦に束ねる",
    hasGraph: false,
    tags: ["三角関数の合成", "最大最小"],
    statement: r`$0\le\theta<2\pi$ のとき、$y=\sin\theta-\sqrt3\cos\theta$ の最大値・最小値と、それを与える $\theta$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 合成",
        body: r`$a\sin\theta+b\cos\theta=R\sin(\theta+\alpha)$、$R=\sqrt{a^2+b^2}$。ここで $a=1,\ b=-\sqrt3$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$R=2$。$\cos\alpha=\dfrac12,\ \sin\alpha=-\dfrac{\sqrt3}{2}$ より $\alpha=-\dfrac{\pi}{3}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$R=\sqrt{1+3}=2$。$y=2\sin\!\left(\theta-\dfrac{\pi}{3}\right)$。
$0\le\theta<2\pi$ で $\theta-\dfrac{\pi}{3}$ は $\left[-\dfrac{\pi}{3},\,\dfrac{5\pi}{3}\right)$ を動く。
最大値 $2$（$\theta-\dfrac{\pi}{3}=\dfrac{\pi}{2}$、すなわち $\theta=\dfrac{5\pi}{6}$）。
最小値 $-2$（$\theta-\dfrac{\pi}{3}=\dfrac{3\pi}{2}$、すなわち $\theta=\dfrac{11\pi}{6}$）。`,
      },
    ],
  },
  {
    slug: "trig-equation-quadratic",
    title: "三角方程式（2 次に帰着）",
    unit: "三角関数",
    difficulty: "B",
    tagline: "sinθ をひとまとめの文字に",
    hasGraph: false,
    tags: ["三角方程式", "2次方程式"],
    statement: r`$0\le\theta<2\pi$ のとき、方程式 $2\cos^2\theta+\sin\theta-1=0$ を解け。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 1 種類の関数に統一",
        body: r`$\cos^2\theta=1-\sin^2\theta$ を代入して $\sin\theta$ だけの 2 次方程式にする。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$2(1-\sin^2\theta)+\sin\theta-1=0\Rightarrow 2\sin^2\theta-\sin\theta-1=0$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$2\sin^2\theta-\sin\theta-1=0\Rightarrow(2\sin\theta+1)(\sin\theta-1)=0$。
よって $\sin\theta=1$ または $\sin\theta=-\dfrac12$。
$0\le\theta<2\pi$ で $\sin\theta=1\Rightarrow\theta=\dfrac{\pi}{2}$、$\sin\theta=-\dfrac12\Rightarrow\theta=\dfrac{7\pi}{6},\ \dfrac{11\pi}{6}$。`,
      },
    ],
  },
  {
    slug: "trig-inequality-double",
    title: "三角不等式（2 倍角）",
    unit: "三角関数",
    difficulty: "B",
    tagline: "cos2θ を cosθ で表す",
    hasGraph: false,
    tags: ["三角不等式", "2倍角の公式"],
    statement: r`$0\le\theta<2\pi$ のとき、不等式 $\cos 2\theta>\cos\theta$ を解け。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 2 倍角で統一",
        body: r`$\cos2\theta=2\cos^2\theta-1$ を代入し、$\cos\theta$ の 2 次不等式に直して因数分解する。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$2\cos^2\theta-\cos\theta-1>0\Rightarrow(2\cos\theta+1)(\cos\theta-1)>0$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$(2\cos\theta+1)(\cos\theta-1)>0$。$\cos\theta-1\le0$ で、等号は $\theta=0$ のみ。よって $\theta\neq0$ では $\cos\theta-1<0$ だから、不等式は $2\cos\theta+1<0$、すなわち $\cos\theta<-\dfrac12$ と同値。
$0\le\theta<2\pi$ で $\cos\theta<-\dfrac12$ となるのは
$$\frac{2\pi}{3}<\theta<\frac{4\pi}{3}.$$`,
      },
    ],
  },

  // ============================== C (4) ==============================
  {
    slug: "trig-graph-transform-problem",
    title: "三角関数のグラフの変形",
    unit: "三角関数",
    difficulty: "C",
    tagline: "振幅・周期・位相を読む",
    hasGraph: false,
    tags: ["三角関数のグラフ", "周期と位相"],
    statement: r`関数 $y=2\sin\!\left(2\theta-\dfrac{\pi}{3}\right)$ について、振幅と周期を述べ、$y=2\sin2\theta$ のグラフをどれだけ平行移動したものか答えよ。さらに $0\le\theta\le\pi$ における最大値・最小値とそれを与える $\theta$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 中身を b(θ − p) の形に",
        body: r`$2\theta-\dfrac{\pi}{3}=2\!\left(\theta-\dfrac{\pi}{6}\right)$ と変形すると、周期 $\dfrac{2\pi}{2}=\pi$、$\theta$ 方向に $+\dfrac{\pi}{6}$ の平行移動が読み取れる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 4 つのパラメータを動かす",
        body: r`ラボで $a,b,c,d$ を動かし、$y=a\sin(b\theta+c)+d$ の振幅 $|a|$、周期 $\dfrac{2\pi}{b}$、位相 $-\dfrac{c}{b}$、上下移動 $d$ がそれぞれ何を変えるかを確かめよう。

@@lab:trig-graph-transform@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$0\le\theta\le\pi$ のとき $2\theta-\dfrac{\pi}{3}\in\left[-\dfrac{\pi}{3},\ \dfrac{5\pi}{3}\right]$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`振幅 $2$、周期 $\pi$。$y=2\sin2\!\left(\theta-\dfrac{\pi}{6}\right)$ なので、$y=2\sin2\theta$ を $\theta$ 軸方向に $+\dfrac{\pi}{6}$ 平行移動したもの。
$0\le\theta\le\pi$ で $\varphi=2\theta-\dfrac{\pi}{3}\in\left[-\dfrac{\pi}{3},\dfrac{5\pi}{3}\right]$。
最大値 $2$：$\varphi=\dfrac{\pi}{2}\Rightarrow\theta=\dfrac{5\pi}{12}$。
最小値 $-2$：$\varphi=\dfrac{3\pi}{2}\Rightarrow\theta=\dfrac{11\pi}{12}$。`,
      },
    ],
  },
  {
    slug: "trig-maxmin-substitution",
    title: "対称式への置き換えで最大最小",
    unit: "三角関数",
    difficulty: "C",
    tagline: "t = sinθ + cosθ",
    hasGraph: false,
    tags: ["三角関数の合成", "最大最小", "二次関数"],
    statement: r`$0\le\theta<2\pi$ のとき、$y=\sin\theta\cos\theta+\sin\theta+\cos\theta$ の最大値・最小値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 和を 1 文字に",
        body: r`$t=\sin\theta+\cos\theta$ とおくと $t^2=1+2\sin\theta\cos\theta$ より $\sin\theta\cos\theta=\dfrac{t^2-1}{2}$。$y$ は $t$ の 2 次関数になる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント — t の範囲",
        body: r`$t=\sqrt2\sin\!\left(\theta+\dfrac{\pi}{4}\right)$ より $-\sqrt2\le t\le\sqrt2$。$y=\dfrac{t^2-1}{2}+t$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$t=\sin\theta+\cos\theta=\sqrt2\sin\!\left(\theta+\dfrac{\pi}{4}\right)$ より $t\in[-\sqrt2,\sqrt2]$。
$$y=\frac{t^2-1}{2}+t=\frac12(t+1)^2-1.$$
軸 $t=-1\in[-\sqrt2,\sqrt2]$ なので最小値は $t=-1$ で $-1$。
最大値は端 $t=\sqrt2$ で $\dfrac12(\sqrt2+1)^2-1=\dfrac{1+2\sqrt2}{2}$。
よって最大値 $\dfrac{1+2\sqrt2}{2}$、最小値 $-1$。`,
      },
    ],
  },
  {
    slug: "sum-to-product-value",
    title: "和積の公式",
    unit: "三角関数",
    difficulty: "C",
    tagline: "和を積に直して計算",
    hasGraph: false,
    tags: ["和積の公式"],
    statement: r`$\sin75^\circ+\sin15^\circ$ の値を、和を積に直す公式を用いて求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 和積の公式",
        body: r`$\sin A+\sin B=2\sin\dfrac{A+B}{2}\cos\dfrac{A-B}{2}$。和の形のままより、積に直すと既知角になる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dfrac{75^\circ+15^\circ}{2}=45^\circ$、$\dfrac{75^\circ-15^\circ}{2}=30^\circ$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$$\sin75^\circ+\sin15^\circ=2\sin45^\circ\cos30^\circ=2\cdot\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2}=\frac{\sqrt6}{2}.$$`,
      },
    ],
  },
  {
    slug: "trig-equation-solution-count",
    title: "三角方程式の解の個数",
    unit: "三角関数",
    difficulty: "C",
    tagline: "y = sin2θ と y = a の交点",
    hasGraph: false,
    tags: ["三角方程式", "解の個数", "三角関数のグラフ"],
    statement: r`$0\le\theta<2\pi$ のとき、方程式 $\sin2\theta=a$ が異なる 4 個の解をもつような定数 $a$ の範囲を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 置換して周期を数える",
        body: r`$u=2\theta$ とおくと $u\in[0,4\pi)$、$\theta$ と $u$ は 1 対 1。$\sin u=a$ の $[0,4\pi)$ における解の個数を数えればよい。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — sin2θ のグラフ",
        body: r`ラボで $a=1,\ b=2,\ c=0,\ d=0$ とすると $y=\sin2\theta$ が現れる。これに横線 $y=a$ を重ねたときの交点数が解の個数。$0\le\theta<2\pi$ で山と谷が 2 つずつあることを確認しよう。

@@lab:trig-graph-transform@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\sin u=a$ は、$-1<a<1$ のとき 1 周期 $2\pi$ につき 2 解。区間 $[0,4\pi)$ は 2 周期。`,
      },
      {
        type: "SOLUTION",
        order: 2 + 1,
        title: "厳密な解答",
        body: r`$u=2\theta\in[0,4\pi)$ とする。$\sin u=a$ の $[0,4\pi)$ での解の個数は、
$|a|=1$ のとき 2 個、$|a|>1$ のとき 0 個、$-1<a<1$ のとき各周期に 2 個ずつで計 4 個。
$\theta=\dfrac u2$ は 1 対 1 なので、$\theta$ の解の個数も同じ。よって異なる 4 個の解をもつのは
$$-1<a<1.$$`,
      },
    ],
  },

  // ============================== D (2) ==============================
  {
    slug: "triple-angle-cos20",
    title: "3 倍角の公式と cos 20°",
    unit: "三角関数",
    difficulty: "D",
    tagline: "cos20° が満たす 3 次方程式",
    hasGraph: false,
    tags: ["3倍角の公式", "加法定理", "高次方程式"],
    statement: r`3 倍角の公式 $\cos3\theta=4\cos^3\theta-3\cos\theta$ を加法定理から導け。さらにこれを用いて、$\cos20^\circ$ が方程式 $8x^3-6x-1=0$ の解であることを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 3θ = 2θ + θ",
        body: r`$\cos3\theta=\cos(2\theta+\theta)$ を加法定理で開き、2 倍角を代入して $\cos\theta$ だけで表す。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\cos2\theta=2\cos^2\theta-1$、$\sin2\theta=2\sin\theta\cos\theta$、$\sin^2\theta=1-\cos^2\theta$。$\theta=20^\circ$ で $\cos60^\circ=\dfrac12$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`加法定理より
$$\cos3\theta=\cos2\theta\cos\theta-\sin2\theta\sin\theta=(2\cos^2\theta-1)\cos\theta-2\sin\theta\cos\theta\cdot\sin\theta.$$
$\sin^2\theta=1-\cos^2\theta$ を代入すると
$$=2\cos^3\theta-\cos\theta-2\cos\theta(1-\cos^2\theta)=4\cos^3\theta-3\cos\theta.$$
ここで $\theta=20^\circ$ とおくと $3\theta=60^\circ$ で $\cos60^\circ=\dfrac12$。$x=\cos20^\circ$ とすれば
$$4x^3-3x=\frac12\ \Longrightarrow\ 8x^3-6x-1=0.$$
よって $\cos20^\circ$ は $8x^3-6x-1=0$ の解である。$\blacksquare$`,
      },
    ],
  },
  {
    slug: "trig-constrained-range",
    title: "条件つきの値域",
    unit: "三角関数",
    difficulty: "D",
    tagline: "2 乗して和をとる",
    hasGraph: false,
    tags: ["和積の公式", "三角関数の合成", "最大最小"],
    statement: r`$\sin\alpha+\sin\beta=1$ をみたす実数 $\alpha,\beta$ に対し、$\cos\alpha+\cos\beta$ のとりうる値の範囲を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 和積で共通因数を作る",
        body: r`$\sin\alpha+\sin\beta$ と $\cos\alpha+\cos\beta$ を和積の公式で書くと、共通因数 $\cos\dfrac{\alpha-\beta}{2}$ が現れる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$m=\dfrac{\alpha+\beta}{2},\ p=\cos\dfrac{\alpha-\beta}{2}$ とおくと $2\sin m\,p=1$、$\cos\alpha+\cos\beta=2\cos m\,p$。2 式を 2 乗して足す。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`和積より、$m=\dfrac{\alpha+\beta}{2},\ p=\cos\dfrac{\alpha-\beta}{2}$ とおくと
$$\sin\alpha+\sin\beta=2\sin m\,p=1,\qquad c:=\cos\alpha+\cos\beta=2\cos m\,p.$$
2 式を 2 乗して加えると、$\sin^2 m+\cos^2 m=1$ より
$$1+c^2=(2p)^2\le 4\quad(\because |p|\le1),$$
よって $c^2\le 3$、すなわち $-\sqrt3\le c\le\sqrt3$。
逆に各 $c\in[-\sqrt3,\sqrt3]$ に対し $p^2=\dfrac{1+c^2}{4}\in\left[\dfrac14,1\right]$ となる $p\ (\neq0)$ がとれ、$\tan m=\dfrac1c$（$c=0$ なら $m=\dfrac\pi2$）から $\alpha,\beta$ が実際に定まる。ゆえに値域は
$$-\sqrt3\le \cos\alpha+\cos\beta\le\sqrt3.$$`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "cosine-series-sum",
    title: "cos の和 ― 積和による telescoping",
    unit: "三角関数",
    difficulty: "D_PLUS",
    tagline: "2 sin(θ/2) を掛けて雪崩を起こす",
    hasGraph: false,
    tags: ["積和の公式", "数列の和", "telescoping"],
    statement: r`$\sin\dfrac{\theta}{2}\neq0$ とする。和
$$S=\sum_{k=1}^{n}\cos k\theta$$
を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 隣り合う差に化けさせる",
        body: r`$2\sin\dfrac{\theta}{2}$ を掛けると、積和の公式で各項が「隣り合う sin の差」になり、和が telescoping で潰れる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 積和を 1 項で試す",
        body: r`積和の公式 $2\cos A\sin B=\sin(A+B)-\sin(A-B)$ で $A=k\theta,\ B=\dfrac{\theta}{2}$ とすると
$$2\cos k\theta\sin\frac{\theta}{2}=\sin\!\left(k+\tfrac12\right)\theta-\sin\!\left(k-\tfrac12\right)\theta.$$
右辺が「次の項マイナス前の項」の形であることに注目。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$2\sin\dfrac{\theta}{2}\,S=\displaystyle\sum_{k=1}^{n}\left[\sin\!\left(k+\tfrac12\right)\theta-\sin\!\left(k-\tfrac12\right)\theta\right]$ は途中が打ち消し合う。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`積和の公式より、各 $k$ について
$$2\cos k\theta\sin\frac{\theta}{2}=\sin\!\left(k+\tfrac12\right)\theta-\sin\!\left(k-\tfrac12\right)\theta.$$
$k=1,\dots,n$ で和をとると、右辺は telescoping して両端だけが残る：
$$2\sin\frac{\theta}{2}\,S=\sin\!\left(n+\tfrac12\right)\theta-\sin\frac{\theta}{2}.$$
$\sin\dfrac{\theta}{2}\neq0$ で割って
$$S=\frac{\sin\!\left(n+\frac12\right)\theta-\sin\frac{\theta}{2}}{2\sin\frac{\theta}{2}}=\frac{\sin\dfrac{n\theta}{2}\,\cos\dfrac{(n+1)\theta}{2}}{\sin\dfrac{\theta}{2}}.$$
（最後の変形は分子に和積の公式を用いた。）$\blacksquare$

**美しさ:** たった一つの因子 $2\sin\dfrac{\theta}{2}$ を掛けるだけで、$n$ 個の余弦の和が「両端の差」に崩れ落ちる。離散の和を生み出す積和の公式の威力がここに凝縮されている。`,
      },
    ],
  },
];
