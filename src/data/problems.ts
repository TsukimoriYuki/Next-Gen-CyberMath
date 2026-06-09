import type { Problem } from "@/lib/types";
import { PROBLEM_TAGS } from "./problem-tags";
import { DOJO_PROBLEMS } from "./dojo";
import { EXPANSION_PACK_3 } from "./expansion-pack-3";
import { numbersAndExpressions } from "./units/numbers-and-expressions";
import { setsAndLogic } from "./units/sets-and-logic";
import { quadraticFunctions } from "./units/quadratic-functions";
import { measurementTrigonometry } from "./units/measurement-trigonometry";
import { dataAnalysis } from "./units/data-analysis";
import { countingProbability } from "./units/counting-probability";
import { geometryProperties } from "./units/geometry-properties";
import { integerProperties } from "./units/integer-properties";
// ---- 数学 II・B ----
import { expressionsAndProofs } from "./units/expressions-and-proofs";
import { complexNumbersEquations } from "./units/complex-numbers-equations";
import { figuresAndEquations } from "./units/figures-and-equations";
import { trigonometricFunctions } from "./units/trigonometric-functions";
import { exponentialAndLogarithmic } from "./units/exponential-and-logarithmic";
import { differentiation2b } from "./units/differentiation-2b";
import { integration2b } from "./units/integration-2b";
import { sequences } from "./units/sequences";
import { vectors } from "./units/vectors";
import { complexPlane } from "./units/complex-plane";
// ---- 模試専用プール（初見殺し・通常導線からは隠蔽）----
import { mockOnlyProblems } from "./units/mock-only";

// Content aggregator. The app reads PROBLEMS directly (so the MVP runs with
// no DB), and prisma/seed.ts imports it to populate Postgres.
//
// Curriculum units live in src/data/units/*. The originals below are kept as
// an "advanced showcase" (beyond 数学IA) until they are reorganised.
//
// `r` = String.raw keeps LaTeX backslashes (\frac, \sqrt, ...) intact inside
// template literals.
const r = String.raw;

const showcaseProblems: Problem[] = [
  // ---------------------------------------------------------------- A
  {
    slug: "am-gm-min-value",
    title: "相加・相乗平均と最小値の正体",
    unit: "式と証明",
    difficulty: "A",
    tagline: "等号成立条件にこそ意味がある",
    hasGraph: true,
    graphKey: "am-gm-min",
    statement: r`$x>0$ のとき、$\displaystyle x+\frac{1}{x}$ の最小値を求めよ。さらに、その最小値が「なぜ」その値になるのかを、相加・相乗平均の不等式の**等号成立条件**から説明せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 積が定数になる組を作る",
        body: r`2 つの正の数 $a,b$ に対する相加・相乗平均の不等式 $\dfrac{a+b}{2}\ge\sqrt{ab}$ を、$a=x,\ b=\dfrac{1}{x}$ に当てはめられないか考える。積が $x\cdot\dfrac{1}{x}=1$ と **定数** になることがカギ。和の下限が積だけで決まる状況を作り出している。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 値が底を打つ瞬間を見る",
        body: r`右のラボでスライダー $x$ を動かそう。$x+\dfrac{1}{x}$ の値は $x=1$ から離れるほど増える。点線 $y=2$ に触れるのは $x=1$ ただ一点だけだと確認できる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 等号はいつか",
        body: r`相加・相乗平均の不等式の等号は $a=b$ のとき。いま $a=x,\ b=\dfrac{1}{x}$ なので、等号成立は $x=\dfrac{1}{x}$、すなわち $x>0$ より $x=1$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$x>0$ より $x$ と $\dfrac{1}{x}$ はともに正。相加・相乗平均の不等式より
$$x+\frac{1}{x}\ \ge\ 2\sqrt{x\cdot\frac{1}{x}}\ =\ 2.$$
等号は $x=\dfrac{1}{x}$ かつ $x>0$、すなわち $x=1$ のときに限り成立する。よって最小値は $2$（$x=1$ で達成）。

**美しさ:** 「積が一定なら、和は 2 数が等しいときに最小」という対称性が、そのまま $x=1$ という対称点を選び出している。`,
      },
    ],
  },

  // ---------------------------------------------------------------- B
  {
    slug: "segment-passing-region",
    title: "線分が描く通過領域",
    unit: "図形と方程式",
    difficulty: "B",
    tagline: "1 つのパラメータが境界の曲線を生む",
    hasGraph: true,
    graphKey: "segment-envelope",
    statement: r`実数 $a$ が $0\le a\le 1$ を動くとき、点 $(a,0)$ と点 $(0,1-a)$ を結ぶ線分 $\ell_a$ 全体が通過する領域を求め、その境界を表す方程式を述べよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 「通過する」を方程式の存在に翻訳する",
        body: r`点 $(x,y)$ が領域に入る条件は「ある $a\ (0\le a\le 1)$ について $(x,y)$ が線分 $\ell_a$ 上にある」こと。これは $a$ についての方程式が区間内に解を持つ条件に翻訳できる。$0<a<1$ では $\ell_a:\ \dfrac{x}{a}+\dfrac{y}{1-a}=1$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 境界の曲線を浮かび上がらせる",
        body: r`右のラボでは細い線分が線分族 $\ell_a$。重なりが領域を塗りつぶし、決して越えない**境界の曲線**（包絡線）が現れる。スライダー $a$ を動かすと、強調された線分と境界の接点（緑）が境界上を滑る。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 判別式 = 0 が境界",
        body: r`第 1 象限の $(x,y)$ を固定し、$\dfrac{x}{a}+\dfrac{y}{1-a}=1$ の分母を払うと $a$ の 2 次方程式になる。「線分が通過する」は「この方程式が解を持つ」。領域の**境界**は重解、つまり判別式 $=0$ に対応する。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$0<a<1$ のとき $(x,y)\in\ell_a\iff \dfrac{x}{a}+\dfrac{y}{1-a}=1$。両辺に $a(1-a)$ を掛けて整理すると
$$a^{2}-(1+x-y)\,a+x=0.\tag{$\star$}$$
固定した $(x,y)$ に対し、$(\star)$ が実数解 $a$ を持つ条件は判別式 $\ge 0$：
$$(1+x-y)^{2}-4x\ \ge\ 0.$$
境界（重解）は $(1+x-y)^{2}=4x$。これは $x\ge0,\ y\ge0$ のもとで
$$\sqrt{x}+\sqrt{y}=1$$
と同値（両辺正で平方すると一致）。したがって線分族の通過領域は
$$\{(x,y)\mid x\ge0,\ y\ge0,\ \sqrt{x}+\sqrt{y}\le 1\}.$$

**美しさ:** 直線族の「判別式」という代数の操作が、$\sqrt{x}+\sqrt{y}=1$ という放物線の弧（包絡線）の幾何に化ける。`,
      },
    ],
  },

  // ---------------------------------------------------------------- C
  {
    slug: "parabola-vertex-locus",
    title: "動く放物線、頂点の軌跡",
    unit: "図形と方程式",
    difficulty: "C",
    tagline: "上に開く放物線たちが、下に開く1本を描く",
    hasGraph: true,
    graphKey: "parabola-family",
    statement: r`$t$ が全実数を動くとき、放物線 $C_t:\ y=x^{2}-2tx$ の頂点はどのような曲線を描くか。軌跡の方程式とその範囲を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 頂点を t の式で表す",
        body: r`頂点の座標を $t$ で表し、座標を $(X,Y)$ とおいて $t$ を消去すれば軌跡が得られる。平方完成が出発点。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 頂点がどこを通るか追う",
        body: r`右のラボでスライダー $t$ を動かすと、放物線 $C_t$ が左右に滑る。頂点（緑）は常にシアンの曲線 $y=-x^{2}$ の上に乗っていることを確かめよ。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — X と Y の関係",
        body: r`$y=x^{2}-2tx=(x-t)^{2}-t^{2}$ より頂点は $(t,\,-t^{2})$。$X=t,\ Y=-t^{2}$ から $t$ を消すと $Y=-X^{2}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$y=x^{2}-2tx=(x-t)^{2}-t^{2}$ なので、$C_t$ の頂点は $(t,\,-t^{2})$。
頂点の座標を $(X,Y)$ とおくと
$$X=t,\qquad Y=-t^{2}.$$
$t=X$ を代入して $Y=-X^{2}$。$t$ は全実数を動くので $X=t$ も全実数を取る。よって頂点の軌跡は放物線
$$y=-x^{2}\quad(\text{全体})$$
である。

**美しさ:** どれも上に開く放物線 $C_t$ の頂点が、下に開くただ 1 本の放物線 $y=-x^{2}$ にぴたりと並ぶ。`,
      },
    ],
  },

  // ---------------------------------------------------------------- D
  {
    slug: "symmetric-integral-king",
    title: "対称性が x を消す定積分",
    unit: "積分法",
    difficulty: "D",
    tagline: "x→π−x、平均化という発想",
    hasGraph: false,
    statement: r`定積分 $\displaystyle I=\int_{0}^{\pi}\frac{x\sin x}{1+\cos^{2}x}\,dx$ の値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 区間を保つ置換を探す",
        body: r`被積分関数に掛かる $x$ が厄介。置換 $x\mapsto \pi-x$ は区間 $[0,\pi]$ をそれ自身に移す。これを使って $I$ をもう一度 $I$ で表せないか試す。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 何が変わり、何が不変か",
        body: r`$\sin(\pi-x)=\sin x$、$\cos(\pi-x)=-\cos x$。よって分母 $1+\cos^{2}x$ も $\sin x$ も**不変**で、変わるのは $x\to\pi-x$ の部分だけ。これは $x$ を「平均化」する典型的な仕掛け。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 2 つの I を足す",
        body: r`$x=\pi-u$ と置くと
$$I=\int_{0}^{\pi}\frac{(\pi-u)\sin u}{1+\cos^{2}u}\,du.$$
元の $I$ と辺々加えると $x$ の項が打ち消し合い、$\pi\displaystyle\int_{0}^{\pi}\frac{\sin x}{1+\cos^{2}x}\,dx$ が残る。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$x=\pi-u\ (dx=-du)$ と置換すると、$\sin x=\sin u,\ \cos^{2}x=\cos^{2}u$ より
$$I=\int_{0}^{\pi}\frac{(\pi-u)\sin u}{1+\cos^{2}u}\,du.$$
元の式と辺々加えて
$$2I=\pi\int_{0}^{\pi}\frac{\sin x}{1+\cos^{2}x}\,dx.$$
ここで $c=\cos x$ と置くと $dc=-\sin x\,dx$、$x:0\to\pi$ で $c:1\to-1$。
$$\int_{0}^{\pi}\frac{\sin x}{1+\cos^{2}x}\,dx=\int_{-1}^{1}\frac{dc}{1+c^{2}}=\bigl[\arctan c\bigr]_{-1}^{1}=\frac{\pi}{2}.$$
よって $2I=\pi\cdot\dfrac{\pi}{2}$、すなわち
$$I=\frac{\pi^{2}}{4}.$$

**美しさ:** 解けそうにない因子 $x$ が、区間の対称性によって定数 $\pi$ にすり替わり、残りはきれいな $\arctan$ に落ちる。`,
      },
    ],
  },

  // --------------------------------------------------------------- D+
  {
    slug: "tan-one-degree-irrational",
    title: "tan 1° は有理数か？",
    unit: "三角関数",
    difficulty: "D_PLUS",
    tagline: "最小の角 1° が、すべてを無理にする",
    hasGraph: true,
    graphKey: "tan-degree-unit-circle",
    statement: r`$\tan 1^\circ$ は有理数か、無理数か。理由とともに答えよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 1° はすべての整数度を生む",
        body: r`直接 $\tan 1^\circ$ を計算するのは絶望的。そこで**背理法**を取り、「$\tan 1^\circ$ が有理数なら何が言えるか」を加法定理で連鎖させる。$1^\circ$ を足し続ければ $2^\circ,3^\circ,\dots$ と任意の整数度に到達できる点が急所。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 整数度の tan を観察する",
        body: r`右のラボで角 $\theta$ を整数度で動かし、$\tan\theta$ の値を眺めよ。$\tan 45^\circ=1$ のように有理になる角もあれば、$\tan 30^\circ=0.5773\ldots$ のように無理に見える角もある。鍵は、加法定理が $\tan(n+1)^\circ$ を $\tan n^\circ$ と $\tan 1^\circ$ だけで表すこと。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 既知の無理数で矛盾を突く",
        body: r`もし $\tan 1^\circ$ が有理数なら、加法定理
$$\tan(n^\circ+1^\circ)=\frac{\tan n^\circ+\tan 1^\circ}{1-\tan n^\circ\tan 1^\circ}$$
より $\tan 2^\circ,\tan 3^\circ,\dots$ が順に有理数になる。ならば $\tan 30^\circ$ も有理数のはず。しかし $\tan 30^\circ=\dfrac{1}{\sqrt3}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**結論：$\tan 1^\circ$ は無理数。**

背理法で示す。$\tan 1^\circ$ が有理数であると仮定する。正接の加法定理
$$\tan(n^\circ+1^\circ)=\frac{\tan n^\circ+\tan 1^\circ}{1-\tan n^\circ\tan 1^\circ}$$
の右辺は、$\tan n^\circ$ と $\tan 1^\circ$ の四則だけで作られる有理式である。したがって $\tan 1^\circ$ が有理数で、かつ $\tan n^\circ$ が有理数ならば、$\tan(n+1)^\circ$ もまた有理数になる（$1\le n\le 29$ では分母 $1-\tan n^\circ\tan 1^\circ\neq 0$）。

$\tan 1^\circ$ が有理数という仮定を出発点に、$n=1,2,\dots,29$ と帰納的に進めると、$\tan 2^\circ,\tan 3^\circ,\dots,\tan 30^\circ$ がすべて有理数だと結論される。ところが
$$\tan 30^\circ=\frac{1}{\sqrt3}=\frac{\sqrt3}{3}$$
は無理数である。これは矛盾。よって仮定は誤りであり、$\tan 1^\circ$ は無理数である。$\blacksquare$

**美しさ:** 「$1^\circ$ さえ有理なら、整数度の tan はすべて有理」という加法定理の連鎖を、たった 1 つの既知の無理数 $\tan 30^\circ$ が打ち砕く。最小の角が全体を支配するという構図に、解法の感動がある。`,
      },
    ],
  },

  // ---------------------------------------------------------------- B
  {
    slug: "sine-synthesis-amplitude",
    title: "サインカーブの合成と最大値",
    unit: "三角関数",
    difficulty: "B",
    tagline: "2 つの波は、1 つの波に化ける",
    hasGraph: true,
    graphKey: "sine-synthesis",
    statement: r`$y=\sqrt{3}\sin x+\cos x$ の最大値と、$0\le x<2\pi$ でそれを取る $x$ を求めよ。さらに、一般に $a\sin x+b\cos x$ がなぜ振幅 $\sqrt{a^2+b^2}$ の 1 つの正弦波になるのかを説明せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 1 つの正弦波に書き直す",
        body: r`$a\sin x+b\cos x$ を「1 つの正弦波 $R\sin(x+\varphi)$」に変形することを狙う。加法定理 $R\sin(x+\varphi)=R\cos\varphi\,\sin x+R\sin\varphi\,\cos x$ と係数を比較するのが要。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 合成波の振幅を見る",
        body: r`右のラボでスライダー $a,b$ を動かすと、2 つの破線の波 $a\sin x$ と $b\cos x$ が合成され、マゼンタの波になる。どんな $a,b$ でも形は 1 つの正弦波のままで、振幅は破線 $\pm R$ にぴたり一致する。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — R は斜辺",
        body: r`$R\sin(x+\varphi)=R\cos\varphi\,\sin x+R\sin\varphi\,\cos x$ を $a\sin x+b\cos x$ と比べると $a=R\cos\varphi,\ b=R\sin\varphi$。両辺を平方して足すと $a^2+b^2=R^2$、すなわち $R=\sqrt{a^2+b^2}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$a=\sqrt3,\ b=1$ なので $R=\sqrt{a^2+b^2}=\sqrt{3+1}=2$。
$a=R\cos\varphi,\ b=R\sin\varphi$ より $\cos\varphi=\dfrac{\sqrt3}{2},\ \sin\varphi=\dfrac12$、すなわち $\varphi=\dfrac{\pi}{6}$。よって
$$\sqrt3\sin x+\cos x=2\sin\!\left(x+\frac{\pi}{6}\right).$$
最大値は $2$。等号は $x+\dfrac{\pi}{6}=\dfrac{\pi}{2}$、すなわち $x=\dfrac{\pi}{3}$（$0\le x<2\pi$）のとき。

**美しさ:** 振幅と位相 $(R,\varphi)$ が係数 $(a,b)$ と 1 対 1 に対応するので、2 つの波の和は必ず 1 つの波に畳み込まれる。`,
      },
    ],
  },

  // ---------------------------------------------------------------- C
  {
    slug: "cubic-tangent-count",
    title: "点から 3 次曲線へ、何本の接線が引けるか",
    unit: "微分法",
    difficulty: "C",
    tagline: "領域が変わると、接線の本数が変わる",
    hasGraph: true,
    graphKey: "cubic-tangents",
    statement: r`曲線 $C:y=x^3$ に対し、点 $\mathrm{P}(p,q)$ から引ける接線の本数を、$p,q$ の条件で場合分けして求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 接点をパラメータにする",
        body: r`接点を $(t,t^3)$ とおき、そこでの接線が $\mathrm P$ を通る条件を $t$ の方程式にする。接線の本数は、その方程式の異なる実数解の個数に等しい。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — P を動かして本数を数える",
        body: r`右のラボで点 $\mathrm P$ をドラッグしよう。$y=x^3$ へ引ける接線（緑）の本数が、$\mathrm P$ の位置によって 1 本・2 本・3 本と切り替わる。境界は曲線そのものと、変曲点まわり。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 3 次方程式の実数解の個数",
        body: r`$(t,t^3)$ での接線は $y=3t^2(x-t)+t^3=3t^2x-2t^3$。$\mathrm P(p,q)$ を通る条件は
$$g(t)=2t^3-3p\,t^2+q=0.$$
この 3 次方程式の実数解の個数を、$g$ の極大・極小の符号から判定する。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`接点を $(t,t^3)$ とすると接線は $y=3t^2x-2t^3$。これが $\mathrm P(p,q)$ を通る条件は
$$g(t):=2t^3-3p\,t^2+q=0.$$
接線の本数は、この方程式の異なる実数解の個数。$g'(t)=6t(t-p)$ より、$p\neq0$ のとき $g$ は $t=0,\ t=p$ で極値をとり、
$$g(0)=q,\qquad g(p)=q-p^3.$$
3 次関数が異なる 3 実解をもつ条件は（極大値）$\times$（極小値）$<0$、すなわち $q\,(q-p^3)<0$。したがって
- $q\,(q-p^3)<0$（$q$ が $0$ と $p^3$ の間）… **3 本**
- $q\,(q-p^3)=0$ かつ $p\neq0$（$q=0$ または $q=p^3$）… **2 本**
- $q\,(q-p^3)>0$ … **1 本**
- $p=0$ のとき $g(t)=2t^3+q$ は単調増加で、$q$ によらず **1 本**

**美しさ:** 「接線の本数」という幾何の問いが、$g$ の極値の符号という微分の言葉に翻訳され、$q(q-p^3)$ ただ 1 つの式で全場合が決まる。`,
      },
    ],
  },

  // ---------------------------------------------------------------- C
  {
    slug: "roots-of-unity-sum",
    title: "1 の n 乗根と、その総和",
    unit: "複素数平面",
    difficulty: "C",
    tagline: "正 n 角形の頂点は、足すと消える",
    hasGraph: true,
    graphKey: "roots-of-unity",
    statement: r`$n\ge2$ とする。方程式 $z^n=1$ の解（1 の $n$ 乗根）をすべて求め、それらが複素数平面上で正 $n$ 角形の頂点をなすことを示せ。また、$n$ 乗根の総和を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 極形式とド・モアブル",
        body: r`$z=r(\cos\theta+i\sin\theta)$ と極形式にして $z^n=1$ をド・モアブルの定理で解く。絶対値 $r$ と偏角 $\theta$ に分けるのが要。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 正 n 角形が現れる",
        body: r`右のラボでスライダー $n$ を動かすと、1 の $n$ 乗根が単位円に内接する正 $n$ 角形の頂点に並ぶ。頂点は中心角 $\dfrac{2\pi}{n}$ ずつ等間隔で、$\zeta_0=1$（緑）から反時計回りに進む。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 総和は等比数列の和",
        body: r`$|z|^n=1,\ |z|>0$ より $|z|=1$。偏角は $n\theta=2\pi k$、つまり $\theta=\dfrac{2\pi k}{n}$。総和は $\zeta=e^{2\pi i/n}$ とおくと $\sum_{k=0}^{n-1}\zeta^k$、すなわち等比数列の和。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$z=r(\cos\theta+i\sin\theta)\ (r>0)$ とおくと、ド・モアブルの定理より $z^n=r^n(\cos n\theta+i\sin n\theta)$。これが $1$ に等しいので $r^n=1\Rightarrow r=1$、$n\theta=2\pi k\ (k\in\mathbb Z)$。ゆえに
$$\zeta_k=\cos\frac{2\pi k}{n}+i\sin\frac{2\pi k}{n}\quad(k=0,1,\dots,n-1).$$
これらは単位円周上で偏角が $\dfrac{2\pi}{n}$ ずつ等間隔だから、正 $n$ 角形の頂点をなす。
$\zeta=\zeta_1=e^{2\pi i/n}\neq1$ とおくと $\zeta_k=\zeta^k$ で、
$$\sum_{k=0}^{n-1}\zeta^k=\frac{\zeta^n-1}{\zeta-1}=\frac{1-1}{\zeta-1}=0.$$
よって 1 の $n$ 乗根の総和は $0$。

**美しさ:** 正 $n$ 角形の頂点ベクトルは互いに打ち消し合い、重心（総和）はぴたりと原点に戻る。等比和（代数）と対称性（幾何）が同じ $0$ を指す。`,
      },
    ],
  },

  // ---------------------------------------------------------------- D
  {
    slug: "riemann-sum-limit",
    title: "和の極限を、面積に化けさせる",
    unit: "数列と極限",
    difficulty: "D",
    tagline: "Σ を ∫ に翻訳する一手",
    hasGraph: true,
    graphKey: "riemann-sum",
    statement: r`極限 $\displaystyle\lim_{n\to\infty}\frac{1}{n}\sum_{k=1}^{n}\left(\frac{k}{n}\right)^2$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 和を長方形の面積とみる",
        body: r`$\dfrac1n\sum_{k=1}^n f\!\left(\dfrac{k}{n}\right)$ の形は、区間 $[0,1]$ を $n$ 等分した**幅 $\frac1n$ の長方形の面積の和**。$n\to\infty$ で定積分に収束する（区分求積法）。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 階段が曲線に吸い寄せられる",
        body: r`右のラボでスライダー $n$ を増やすと、長方形が細かくなり、リーマン和 $\Sigma$ が曲線 $y=x^2$ の下の面積 $\displaystyle\int_0^1x^2dx$ に収束していく。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — どの関数の積分か",
        body: r`$f(x)=x^2$ とおけば、求める極限はそのまま $\displaystyle\int_0^1 x^2\,dx$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$f(x)=x^2$ とすると、$\dfrac1n\displaystyle\sum_{k=1}^n\left(\dfrac kn\right)^2=\dfrac1n\sum_{k=1}^n f\!\left(\dfrac kn\right)$ は、区間 $[0,1]$ の $n$ 等分による右端リーマン和。区分求積法により
$$\lim_{n\to\infty}\frac1n\sum_{k=1}^{n}\left(\frac kn\right)^2=\int_0^1 x^2\,dx=\left[\frac{x^3}{3}\right]_0^1=\frac13.$$
（検算：$\displaystyle\sum_{k=1}^n k^2=\frac{n(n+1)(2n+1)}{6}$ より、$\dfrac{1}{n^3}\cdot\dfrac{n(n+1)(2n+1)}{6}\to\dfrac{2}{6}=\dfrac13$。）

**美しさ:** 離散的な和 $\Sigma$ が、幅を無限に細くする一手で連続な面積 $\int$ に化ける。`,
      },
    ],
  },

  // --------------------------------------------------------------- D+
  {
    slug: "harmonic-not-integer",
    title: "1 + 1/2 + … + 1/n は決して整数にならない",
    unit: "整数の性質",
    difficulty: "D_PLUS",
    tagline: "ただ 1 つの 2 のべきが、整数化を拒む",
    hasGraph: false,
    statement: r`$n\ge2$ のとき、$\displaystyle H_n=1+\frac12+\frac13+\cdots+\frac1n$ は整数にならないことを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 2 のべきの効き方を追う",
        body: r`「整数でない」を示すには、分母に残る素因数、とくに $2$ の効き方を追うのが定石。$1$ から $n$ の中で「$2$ で最も深く割れる項」がただ 1 つしかないことに注目する。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 小さく試す",
        body: r`$H_2=\dfrac32,\ H_3=\dfrac{11}{6},\ H_4=\dfrac{25}{12}$。どれも分母に $2$ が残る。$2^m\le n<2^{m+1}$ となる $m$ を取ると、$1\le k\le n$ で $k=2^m$ の項だけが $2^m$ で割れて飛び抜けている。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 共通分母で偶奇を見る",
        body: r`$2^m\le n<2^{m+1}$ となる $m$ をとる。$1\le k\le n$ で $2^m$ の倍数は $k=2^m$ ただ 1 つ（次の倍数 $2^{m+1}$ は $n$ を超える）。$L=\mathrm{lcm}(1,\dots,n)$ で通分し、各 $\dfrac{L}{k}$ の偶奇を比べる。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$2^m\le n<2^{m+1}$ をみたす整数 $m\ (\ge1)$ をとる。$1\le k\le n$ の中で $2^m$ の倍数は $2^m$ ただ 1 つである。
$L=\mathrm{lcm}(1,2,\dots,n)$ とおくと、$L$ に含まれる $2$ の冪はちょうど $2^m$（すなわち $L=2^m\times(\text{奇数})$）。各 $k$ について $\dfrac{L}{k}$ を見ると：
- $k=2^m$ のとき $\dfrac{L}{k}=\dfrac{L}{2^m}$ は **奇数**。
- $k\neq2^m$ のとき、$k$ に含まれる $2$ の冪は高々 $2^{m-1}$ だから $\dfrac{L}{k}$ は **偶数**。

したがって
$$L\,H_n=\sum_{k=1}^{n}\frac{L}{k}=\underbrace{\frac{L}{2^m}}_{\text{奇数}}+\underbrace{(\text{偶数の和})}_{\text{偶数}}=(\text{奇数}).$$
もし $H_n$ が整数なら、$L$ は偶数（$m\ge1$）だから $L H_n$ も偶数のはず。しかし右辺は奇数で矛盾。ゆえに $H_n$ は整数ではない。$\blacksquare$

**美しさ:** $1$ から $n$ の中で $2$ に最も深く割れる項がただ 1 つ——この一点の非対称性だけで、無数の分数の和が整数になる可能性が完全に封じられる。`,
      },
    ],
  },
];

// 数学IA 単元を先頭に、その後ろに発展ショーケースを並べる。
const RAW_PROBLEMS: Problem[] = [
  ...numbersAndExpressions,
  ...setsAndLogic,
  ...quadraticFunctions,
  ...measurementTrigonometry,
  ...dataAnalysis,
  ...countingProbability,
  ...geometryProperties,
  ...integerProperties,
  // ---- 数学 II・B ----
  ...expressionsAndProofs,
  ...complexNumbersEquations,
  ...figuresAndEquations,
  ...trigonometricFunctions,
  ...exponentialAndLogarithmic,
  ...differentiation2b,
  ...integration2b,
  ...sequences,
  ...vectors,
  ...complexPlane,
  ...showcaseProblems,
  // 初見殺し（isMockOnly:true）。集約には含めるが content.ts の公開系から除外する。
  ...mockOnlyProblems,
  // 過去問道場。通常導線にも表示可（isMockOnly なし）。
  ...DOJO_PROBLEMS,
  // 拡張パック3：手薄領域の補強（複素数平面・数列・空間ベクトル・微積分・確率・三角関数）
  ...EXPANSION_PACK_3,
];

// 概念タグをマージ（インライン tags ∪ problem-tags.ts のマップ、重複除去）。
export const PROBLEMS: Problem[] = RAW_PROBLEMS.map((p) => {
  const merged = Array.from(
    new Set([...(p.tags ?? []), ...(PROBLEM_TAGS[p.slug] ?? [])]),
  );
  return merged.length ? { ...p, tags: merged } : p;
});

export const PROBLEMS_BY_SLUG: Record<string, Problem> = Object.fromEntries(
  PROBLEMS.map((p) => [p.slug, p]),
);
