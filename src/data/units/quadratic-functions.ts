import type { Problem } from "@/lib/types";

// 数学I「2次関数」— 20 問。
// グラフが本質的に効く難易度 C 以上の問題にのみインタラクティブ・ラボを付ける。
const r = String.raw;

export const quadraticFunctions: Problem[] = [
  // ============================== A (5) ==============================
  {
    slug: "quad-complete-square",
    title: "平方完成で頂点を出す",
    unit: "2次関数",
    difficulty: "A",
    tagline: "係数の半分の 2 乗を足して引く",
    hasGraph: false,
    statement: r`2次関数 $y=x^2-4x+1$ を $y=(x-p)^2+q$ の形に変形し、頂点と軸を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 平方完成",
        body: r`$x^2-4x$ を $(x-2)^2-4$ と平方完成する。$x$ の係数 $-4$ の半分 $-2$ の 2 乗 $4$ を足して引く。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$x^2-4x+1=(x^2-4x+4)-4+1$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$y=x^2-4x+1=(x-2)^2-4+1=(x-2)^2-3.$

頂点 $(2,-3)$、軸 $x=2$。`,
      },
    ],
  },
  {
    slug: "quad-translation",
    title: "グラフを平行移動する",
    unit: "2次関数",
    difficulty: "A",
    tagline: "x→x−p、y→y−q",
    hasGraph: false,
    statement: r`放物線 $y=x^2$ を $x$ 軸方向に $3$、$y$ 軸方向に $-2$ だけ平行移動した放物線の方程式を求めよ。また $y=2x^2$ をどのように平行移動すると $y=2(x+1)^2-5$ になるか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 頂点の移動",
        body: r`$x$ 方向に $p$、$y$ 方向に $q$ の移動は $x\to x-p,\ y\to y-q$。放物線では頂点の移動を見ればよい。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`前者は $y=(x-3)^2-2$。後者は頂点 $(0,0)\to(-1,-5)$ の移動。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$y=x^2$ を移動して $y=(x-3)^2-2$。

$y=2x^2$ の頂点 $(0,0)$ を $(-1,-5)$ に移すには $x$ 方向 $-1$、$y$ 方向 $-5$。結果は $y=2(x+1)^2-5$。`,
      },
    ],
  },
  {
    slug: "quad-max-min-axis-inside",
    title: "定義域つきの最大・最小",
    unit: "2次関数",
    difficulty: "A",
    tagline: "軸が定義域に入るか確認する",
    hasGraph: false,
    statement: r`$1\le x\le4$ における $y=x^2-2x+3$ の最大値・最小値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 軸の位置",
        body: r`平方完成して軸を求める。下に凸なので最小は軸、最大は軸から最も遠い端でとる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$y=(x-1)^2+2$、軸 $x=1$ は定義域の左端。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$y=(x-1)^2+2$、軸 $x=1$。定義域 $1\le x\le4$ で軸は左端。
最小値：$x=1$ で $2$。最大値：軸から最も遠い $x=4$ で $(4-1)^2+2=11$。`,
      },
    ],
  },
  {
    slug: "quad-x-axis-intersection",
    title: "x 軸との共有点を求める",
    unit: "2次関数",
    difficulty: "A",
    tagline: "y=0 とおいて解く",
    hasGraph: false,
    statement: r`放物線 $y=x^2-x-6$ と $x$ 軸の共有点の座標を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 交点は y=0",
        body: r`$x$ 軸との共有点は $y=0$、すなわち2次方程式 $x^2-x-6=0$ の解。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$x^2-x-6=(x-3)(x+2)$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$x^2-x-6=0\Rightarrow(x-3)(x+2)=0\Rightarrow x=3,\ -2.$

共有点は $(3,0),\ (-2,0)$。`,
      },
    ],
  },
  {
    slug: "quad-inequality-basic",
    title: "2次不等式を解く",
    unit: "2次関数",
    difficulty: "A",
    tagline: "外側か、内側か",
    hasGraph: false,
    statement: r`不等式 $x^2-x-6>0$ と $x^2-4\le0$ を解け。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 放物線の符号",
        body: r`因数分解して2解を求める。下に凸の放物線は、2解の外側で正、内側で負。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$x^2-x-6=(x-3)(x+2)$、$x^2-4=(x-2)(x+2)$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$(x-3)(x+2)>0\Rightarrow x<-2$ または $x>3$。

$(x-2)(x+2)\le0\Rightarrow -2\le x\le2$。`,
      },
    ],
  },

  // ============================== B (6) ==============================
  {
    slug: "quad-determine-from-vertex",
    title: "頂点と 1 点から2次関数を決める",
    unit: "2次関数",
    difficulty: "B",
    tagline: "頂点形でおいて、a を決める",
    hasGraph: false,
    statement: r`頂点が $(1,-2)$ で、点 $(3,6)$ を通る2次関数を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 頂点形",
        body: r`頂点が $(p,q)$ の2次関数は $y=a(x-p)^2+q$。通る点を代入して $a$ を決める。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$y=a(x-1)^2-2$ に $(3,6)$ を代入。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$y=a(x-1)^2-2$ に $(3,6)$ を代入：$6=4a-2\Rightarrow a=2$。

よって $y=2(x-1)^2-2\ (=2x^2-4x)$。`,
      },
    ],
  },
  {
    slug: "quad-discriminant-cases",
    title: "判別式で共有点の個数を調べる",
    unit: "2次関数",
    difficulty: "B",
    tagline: "個数は D の符号で決まる",
    hasGraph: false,
    statement: r`放物線 $y=x^2+2x+k$ と $x$ 軸の共有点の個数を、定数 $k$ の値で分類せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 判別式",
        body: r`共有点の個数は $x^2+2x+k=0$ の実数解の個数。判別式 $D$ の符号で決まる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$D=2^2-4k=4-4k$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$D=4-4k$。

$D>0\ (k<1)$：2 個。$D=0\ (k=1)$：1 個（接する）。$D<0\ (k>1)$：0 個。`,
      },
    ],
  },
  {
    slug: "quad-max-min-domain",
    title: "定義域内の最大・最小（軸が内側）",
    unit: "2次関数",
    difficulty: "B",
    tagline: "最小は軸、最大は遠い端",
    hasGraph: false,
    statement: r`$0\le x\le3$ における $y=x^2-2x-3$ の最大値・最小値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 軸が定義域内か",
        body: r`平方完成し、軸が定義域に含まれるか調べる。含まれれば最小は軸、最大は軸から遠い端。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$y=(x-1)^2-4$、軸 $x=1\in[0,3]$。端 $x=0,3$ の値を比較。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$y=(x-1)^2-4$、軸 $x=1$ は定義域内。
最小値：$x=1$ で $-4$。端の値は $x=0$ で $-3$、$x=3$ で $0$。
最大値：$x=3$ で $0$。`,
      },
    ],
  },
  {
    slug: "quad-always-positive",
    title: "つねに正となる条件",
    unit: "2次関数",
    difficulty: "B",
    tagline: "x 軸と交わらせない",
    hasGraph: false,
    statement: r`2次不等式 $x^2-2x+k>0$ がすべての実数 $x$ で成り立つ定数 $k$ の範囲を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 共有点を持たない",
        body: r`下に凸の放物線が $x$ 軸より上にあり続ける条件は「$x$ 軸と共有点を持たない」、すなわち判別式 $D<0$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dfrac{D}{4}=1-k<0$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`下に凸なので、つねに $>0\iff D<0$。
$$D=(-2)^2-4k=4-4k<0\Rightarrow k>1.$$`,
      },
    ],
  },
  {
    slug: "quad-chord-length",
    title: "x 軸が切り取る線分の長さ",
    unit: "2次関数",
    difficulty: "B",
    tagline: "2 解の差は √D / |a|",
    hasGraph: false,
    statement: r`放物線 $y=x^2-5x+3$ が $x$ 軸から切り取る線分の長さを求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 2 解の差",
        body: r`切り取る線分の長さは2解 $\alpha,\beta$ の差 $|\alpha-\beta|$。解の公式から差は $\dfrac{\sqrt D}{|a|}$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$D=(-5)^2-4\cdot3=13$、$a=1$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$x^2-5x+3=0$ の判別式は $D=25-12=13$、解は $x=\dfrac{5\pm\sqrt{13}}{2}$。
線分の長さは $\dfrac{5+\sqrt{13}}{2}-\dfrac{5-\sqrt{13}}{2}=\sqrt{13}$。`,
      },
    ],
  },
  {
    slug: "quad-three-points",
    title: "3 点を通る2次関数",
    unit: "2次関数",
    difficulty: "B",
    tagline: "一般形に代入して連立",
    hasGraph: false,
    statement: r`3点 $(0,1),\ (1,0),\ (2,3)$ を通る2次関数 $y=ax^2+bx+c$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 3 元連立",
        body: r`一般形 $y=ax^2+bx+c$ に3点を代入し、$a,b,c$ の連立方程式を解く。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$(0,1)$ から $c=1$ が即決まり、残り2点で $a,b$ の2元連立になる。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$(0,1)$ より $c=1$。
$(1,0)$：$a+b+1=0$。$(2,3)$：$4a+2b+1=3\Rightarrow 2a+b=1$。
辺々引いて $a=2,\ b=-3$。よって $y=2x^2-3x+1$。`,
      },
    ],
  },

  // ============================== C (5) ==============================
  {
    slug: "quad-min-moving-axis",
    title: "軸が動く2次関数の最小値",
    unit: "2次関数",
    difficulty: "C",
    tagline: "軸が定義域の内か外か",
    hasGraph: true,
    graphKey: "quad-min-on-interval",
    statement: r`$a$ を定数とする。$0\le x\le2$ における $f(x)=x^2-2ax+2$ の最小値 $m(a)$ を、$a$ の値で場合分けして求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 軸 x=a の位置で決まる",
        body: r`$f(x)=(x-a)^2+(2-a^2)$、軸 $x=a$。下に凸なので、最小は軸が定義域 $[0,2]$ の内か外かで場所が変わる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 軸を動かす",
        body: r`スライダー $a$ で軸 $x=a$ を動かそう。最小点（緑）は、$a<0$ で左端 $x=0$、$0\le a\le2$ で頂点 $x=a$、$a>2$ で右端 $x=2$ へと飛び移る。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 3 つの場合",
        body: r`$a<0$：左端で最小。$0\le a\le2$：頂点で最小。$a>2$：右端で最小。それぞれ $f(0),\ f(a),\ f(2)$ を計算。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$f(x)=(x-a)^2+(2-a^2)$、軸 $x=a$。

$a<0$：定義域で増加。最小は $x=0$ で $f(0)=2$。

$0\le a\le2$：頂点が定義域内。最小は $x=a$ で $2-a^2$。

$a>2$：定義域で減少。最小は $x=2$ で $f(2)=6-4a$。

$$m(a)=\begin{cases}2&(a<0)\\ 2-a^2&(0\le a\le2)\\ 6-4a&(a>2).\end{cases}$$

**メタ。** 「軸が動く・定義域固定」型は、軸が定義域の〔左外・内・右外〕の 3 通りで、最小の場所が〔左端・頂点・右端〕へ移る。境界 $a=0,2$ で式が連続につながること（$2-0^2=2$、$2-2^2=-2=6-4\cdot2$）を確かめると、場合分けの検算になる。`,
      },
    ],
  },
  {
    slug: "quad-min-moving-interval",
    title: "区間が動く2次関数の最小値",
    unit: "2次関数",
    difficulty: "C",
    tagline: "放物線は固定、区間が滑る",
    hasGraph: true,
    graphKey: "quad-min-moving-interval",
    statement: r`$t$ を実数とする。区間 $t\le x\le t+1$ における $f(x)=x^2-2x$ の最小値 $m(t)$ を、$t$ で場合分けして求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 頂点と区間の位置関係",
        body: r`放物線は固定（頂点 $x=1$、最小 $-1$）。動くのは幅 1 の区間。最小は、頂点が区間の右・中・左どこにあるかで決まる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 区間を滑らせる",
        body: r`スライダー $t$ で区間 $[t,t+1]$ を動かそう。最小点（緑）は、区間が頂点の左にあるとき右端、頂点をまたぐとき頂点、右にあるとき左端へ移る。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 頂点 x=1 を基準に",
        body: r`区間の右端 $t+1<1$（$t<0$）なら右端、$t\le1\le t+1$（$0\le t\le1$）なら頂点、$t>1$ なら左端で最小。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$f(x)=(x-1)^2-1$、頂点 $x=1$。

$t<0$：区間は頂点の左で $f$ は減少。最小は右端 $x=t+1$ で $f(t+1)=(t+1)^2-2(t+1)=t^2-1$。

$0\le t\le1$：頂点が区間内。最小は $x=1$ で $-1$。

$t>1$：区間は頂点の右で $f$ は増加。最小は左端 $x=t$ で $t^2-2t$。

$$m(t)=\begin{cases}t^2-1&(t<0)\\ -1&(0\le t\le1)\\ t^2-2t&(t>1).\end{cases}$$

**メタ。** 「放物線固定・区間が動く」型は、頂点が区間の〔右外・内・左外〕の 3 通り。前問（軸が動く）と“動くものが逆”なだけで発想は同じ。連続性の検算：$t=0$ で $t^2-1=-1$、$t=1$ で $t^2-2t=-1$、どちらも中央の $-1$ に滑らかにつながる。`,
      },
    ],
  },
  {
    slug: "quad-two-positive-roots",
    title: "2 つの正の解を持つ条件",
    unit: "2次関数",
    difficulty: "C",
    tagline: "D・軸・f(0) の 3 点セット",
    hasGraph: true,
    graphKey: "quad-root-placement",
    statement: r`2次方程式 $x^2-2ax+(a+2)=0$ が異なる2つの正の解をもつ定数 $a$ の範囲を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — グラフで条件に翻訳",
        body: r`$f(x)=x^2-2ax+(a+2)$（下に凸）とおく。「異なる2つの正の解」は、グラフが正の領域で $x$ 軸を2回横切ること。これは ①$D>0$ ②軸 $>0$ ③$f(0)>0$ の同時成立に等しい。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 3 条件の点灯を見る",
        body: r`スライダー $a$ を動かすと、D>0・軸>0・f(0)>0 の3条件の成否が表示される。3つ揃った瞬間に2つの交点（解）がともに正（緑）になる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 3 条件を式に",
        body: r`$\dfrac{D}{4}=a^2-(a+2)>0$、軸 $=a>0$、$f(0)=a+2>0$。3つの共通範囲を取る。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$f(x)=x^2-2ax+(a+2)$（下に凸）。異なる2正解の条件は次の3つ：

①$\dfrac{D}{4}=a^2-a-2=(a-2)(a+1)>0\Rightarrow a<-1$ または $a>2$。

②軸 $x=a>0\Rightarrow a>0$。

③$f(0)=a+2>0\Rightarrow a>-2$。

①②③の共通範囲は $a>2$。

**別解（解と係数の関係）。** 2 解を $\alpha,\beta$ とすると、ともに正 $\iff$ $\alpha+\beta>0$ かつ $\alpha\beta>0$ かつ $D>0$。$\alpha+\beta=2a>0$、$\alpha\beta=a+2>0$、$\dfrac D4=a^2-a-2>0$ から同じ $a>2$ を得る。

**メタ。** 解の配置は ①判別式（実数性）②軸（左右の偏り）③端点の符号 $f(0)$ の 3 点セットが万能。$f(0)>0$ が「$x=0$ の外側に 2 解」を保証する仕組みを押さえれば、次問の「ともに $-1$ より大」も $f(-1)$ に替えるだけで同型に解ける。`,
      },
    ],
  },
  {
    slug: "quad-param-inequality-cases",
    title: "因数分解できる2次不等式の場合分け",
    unit: "2次関数",
    difficulty: "C",
    tagline: "2 解の大小で答えが変わる",
    hasGraph: false,
    statement: r`$a$ を定数とする。不等式 $x^2-(a+1)x+a\le0$ を解け。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — まず因数分解、次に 2 解の大小",
        body: r`左辺は $x^2-(a+1)x+a=(x-1)(x-a)$。下に凸の放物線が $\le0$ になるのは 2 解の**間**。ただし 2 解 $1$ と $a$ のどちらが大きいかで、書く向き（$a\le x\le1$ か $1\le x\le a$）が変わる。$a=1$ の重解も別扱い。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — a を動かして解区間を見る",
        body: r`数直線で 2 解 $1,a$ の位置を試す。$a=3$ なら $(x-1)(x-3)\le0$ は $1\le x\le3$。$a=-1$ なら $(x-1)(x+1)\le0$ は $-1\le x\le1$。$a=1$ では $(x-1)^2\le0$ で一点 $x=1$ だけ。$a$ が $1$ を境に左右へ動くと、解区間の下端・上端が入れ替わるのが分かる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 1 と a の大小",
        body: r`$(x-1)(x-a)\le0$。$a<1,\ a=1,\ a>1$ で場合分けする。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$(x-1)(x-a)\le0$。放物線が $x$ 軸以下になるのは 2 解の間（境界含む）だから、2 解の大小で次のように分かれる。

**$a<1$ のとき**（小さい方が $a$）：$a\le x\le1$。

**$a=1$ のとき**（重解）：$(x-1)^2\le0$ をみたすのは等号成立の $x=1$ のみ。

**$a>1$ のとき**（小さい方が $1$）：$1\le x\le a$。

**メタ。** 文字係数つき不等式は「①因数分解 ②解の大小で場合分け ③重解・等号の端点を吟味」が定石。$\le$（等号つき）なので重解 $a=1$ でも解が空集合にならず 1 点残る——不等号が $<$ なら $a=1$ で解なし、という違いまで意識できると完璧。`,
      },
    ],
  },
  {
    slug: "quad-tangent-to-line",
    title: "放物線と直線が接する条件",
    unit: "2次関数",
    difficulty: "C",
    tagline: "接する ⇔ 判別式 = 0",
    hasGraph: false,
    statement: r`放物線 $y=x^2+ax+1$ が直線 $y=2x-3$ と接するような定数 $a$ の値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 接する＝連立が重解",
        body: r`「曲線と直線が接する」を代数に翻訳すると、**連立して得る 2 次方程式が重解をもつ**、すなわち判別式 $D=0$。重解の $x$ が接点の $x$ 座標になる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — a を動かして接する瞬間を見る",
        body: r`下のラボでスライダー $a$ を動かすと、放物線 $y=x^2+ax+1$ が上下に形を変える。直線 $y=2x-3$ との位置関係は、判別式 $D=(a-2)^2-16$ の符号で「2 交点 → 接する → 共有点なし」と移り変わり、$a=6$ と $a=-2$ でちょうど接する（緑の 2 交点が 1 点に重なる）。

@@lab:parabola-line-tangency@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$x^2+ax+1=2x-3\Rightarrow x^2+(a-2)x+4=0$。$D=0$ を解く。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`放物線と直線を連立して $y$ を消去すると
$$x^2+ax+1=2x-3\ \Longrightarrow\ x^2+(a-2)x+4=0.$$
接する条件はこの 2 次方程式が重解をもつこと、すなわち
$$D=(a-2)^2-4\cdot1\cdot4=(a-2)^2-16=0\ \Longrightarrow\ a-2=\pm4\ \Longrightarrow\ a=6,\ -2.$$

**メタ。** 「接する＝重解＝$D=0$」は 2 次関数の最重要翻訳のひとつ。接点の $x$ は重解 $x=-\dfrac{a-2}{2}$ で求まる（$a=6$ なら $x=-2$、$a=-2$ なら $x=2$）。$D>0$／$D=0$／$D<0$ が「2 交点／接する／共有点なし」に一対一対応する、という全体像を握ることが応用への鍵。`,
      },
    ],
  },

  // ============================== D (3) ==============================
  {
    slug: "quad-min-of-min",
    title: "最小値の最大値（2 段階の最適化）",
    unit: "2次関数",
    difficulty: "D",
    tagline: "内で最小、外で最大",
    hasGraph: false,
    statement: r`$a$ を実数とする。$0\le x\le1$ における $f(x)=x^2-2ax+1$ の最小値を $m(a)$ とする。$a$ を動かすとき、$m(a)$ の最大値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 二重の最適化（min の max）",
        body: r`2 段構え。**内側**：$x$ について最小化して $m(a)$ を求める（軸 $x=a$ の位置で 3 通りに場合分け）。**外側**：今度は $a$ の関数 $m(a)$ の最大を考える。「変数ごとに最適化の向きが逆（$x$ は min、$a$ は max）」を取り違えないのが急所。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — m(a) を表にする",
        body: r`$m(a)$ をいくつか計算する：$a=-1$ で $1$、$a=0$ で $1$、$a=0.5$ で $1-0.25=0.75$、$a=1$ で $0$、$a=2$ で $-2$。$a$ を増やすほど $m(a)$ は下がり、$a\le0$ では値 $1$ に張り付く。最大は $1$ あたりだと当たりがつく。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$a<0$：$m=f(0)=1$。$0\le a\le1$：$m=f(a)=1-a^2$。$a>1$：$m=f(1)=2-2a$。各区間で $m(a)$ の上限を比べる。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$f(x)=(x-a)^2+1-a^2$、軸 $x=a$。定義域 $[0,1]$ での最小 $m(a)$ を軸の位置で求める。

**$a<0$**（軸が左外、$f$ は増加）：最小は $x=0$ で $m(a)=f(0)=1$。

**$0\le a\le1$**（軸が内側）：最小は $x=a$ で $m(a)=1-a^2$。これは $a=0$ で最大値 $1$、$a=1$ で $0$。

**$a>1$**（軸が右外、$f$ は減少）：最小は $x=1$ で $m(a)=f(1)=2-2a<0$。

まとめると、$m(a)$ は $a\le0$ で一定値 $1$、$0\le a\le1$ で $1-a^2\le1$、$a>1$ で負。ゆえに **$m(a)$ の最大値は $1$**（$a\le0$ で達成）。

**メタ。** 「最小値の最大」は典型的な入れ子最適化。内側で得た $m(a)$ を**新しい関数とみて**グラフを描けば外側は一目。境界 $a=0$ で $1$、$a=1$ で $0$ と連続することが場合分けの検算になる。`,
      },
    ],
  },
  {
    slug: "quad-roots-both-greater",
    title: "2 解がともに −1 より大きい条件",
    unit: "2次関数",
    difficulty: "D",
    tagline: "D・軸・g(−1) で挟む",
    hasGraph: false,
    statement: r`2次方程式 $x^2-2(a-1)x+a^2-3=0$ が異なる2つの実数解をもち、ともに $-1$ より大きい定数 $a$ の範囲を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 解の配置 3 条件（基準を −1 に）",
        body: r`$g(x)=x^2-2(a-1)x+a^2-3$ とおく。下に凸の放物線が「$x=-1$ より右で 2 回 $x$ 軸を横切る」ための条件は ①$D>0$（異なる 2 実解）②軸 $>-1$（2 解の中点が $-1$ の右）③$g(-1)>0$（$x=-1$ では軸の上）。前問の「ともに正（基準 $0$）」を、基準だけ $-1$ にずらした同型。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 3 条件の点灯を見る",
        body: r`下のラボ（代表として「ともに正」版＝基準 $0$）でスライダーを動かすと、D>0・軸>0・f(0)>0 の 3 条件の成否が点灯し、3 つ揃った瞬間に 2 解がともに基準の外（正）に出る。本問は基準を $0$ から $-1$ へ、$f(0)$ を $g(-1)$ へ読み替えるだけで同じ構図。

@@lab:quad-root-placement@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\dfrac{D}{4}=(a-1)^2-(a^2-3)=-2a+4$、軸 $=a-1$、$g(-1)=a^2+2a-4$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$g(x)=x^2-2(a-1)x+a^2-3$（下に凸）。3 条件を順に立てる。

**①判別式。** $\dfrac{D}{4}=(a-1)^2-(a^2-3)=a^2-2a+1-a^2+3=-2a+4>0\Rightarrow a<2$。

**②軸。** 軸は $x=a-1$。$a-1>-1\Rightarrow a>0$。

**③端点の符号。** $g(-1)=(-1)^2-2(a-1)(-1)+a^2-3=1+2(a-1)+a^2-3=a^2+2a-4>0$。これを解くと $a<-1-\sqrt5$ または $a>-1+\sqrt5$。

$-1+\sqrt5\approx1.24$ に注意して①②③の共通範囲を取ると、
$$-1+\sqrt5<a<2.$$

**メタ。** 解の配置は「基準点 $k$ に対し ①$D$ ②軸と $k$ ③$f(k)$ の符号」の 3 点セット。基準が $0$（正）でも $-1$ でも、構造は不変。$f(k)>0$ が「$k$ の同じ側に 2 解」を、軸の条件が「どちら側か」を決める分業を理解すれば、あらゆる配置問題に同じ型で立ち向かえる。`,
      },
    ],
  },
  {
    slug: "quad-constrained-min",
    title: "制約つきの最大・最小（2 次関数に帰着）",
    unit: "2次関数",
    difficulty: "D",
    tagline: "代入して 1 変数の放物線へ",
    hasGraph: false,
    statement: r`実数 $x,y$ が $x+2y=4,\ x\ge0,\ y\ge0$ を満たすとき、$x^2+y^2$ の最大値と最小値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 1 文字消去して放物線へ",
        body: r`制約 $x+2y=4$ を $x=4-2y$ と解いて代入すれば、$x^2+y^2$ は $y$ だけの 2 次関数になる。$x\ge0,\ y\ge0$ から $y$ の定義域を厳密に絞るのが要。さらに $x^2+y^2$ は「原点からの距離の 2 乗」という幾何的な意味をもつ。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 距離² として見る",
        body: r`$x^2+y^2$ は原点 $\mathrm O$ から点 $(x,y)$ までの距離の 2 乗。下のラボで線分 $x+2y=4$（$x,y\ge0$）上を点 $\mathrm P$ が動くと、最小は $\mathrm O$ から線分へ下ろした**垂線の足** $\left(\dfrac45,\dfrac85\right)$、最大は遠い端 $(4,0)$ で起こることが、同心円（等高線）の広がりで見える。

@@lab:circle-level-segment@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$x=4-2y\ge0\Rightarrow 0\le y\le2$。$x^2+y^2=(4-2y)^2+y^2=5y^2-16y+16$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**代数。** $x=4-2y$。$x\ge0,\ y\ge0$ より $0\le y\le2$。
$$x^2+y^2=(4-2y)^2+y^2=4y^2-16y+16+y^2=5y^2-16y+16=5\Bigl(y-\tfrac85\Bigr)^2+\tfrac{16}{5}.$$
軸 $y=\dfrac85\in[0,2]$（定義域内）。最小値は $y=\dfrac85$ で $\dfrac{16}{5}$（このとき $x=4-\dfrac{16}{5}=\dfrac45$）。端の値は $y=0$ で $16$、$y=2$ で $4$。よって**最大値は $16$**（$x=4,\ y=0$）、**最小値は $\dfrac{16}{5}$**（$x=\dfrac45,\ y=\dfrac85$）。

**幾何（別解）。** $\sqrt{x^2+y^2}$ は原点から線分上の点までの距離。最小は垂線の足、最大は遠い端点。直線 $x+2y=4$ と原点の距離は $\dfrac{|0+0-4|}{\sqrt{1^2+2^2}}=\dfrac{4}{\sqrt5}$ で、2 乗して $\dfrac{16}{5}$（最小値に一致）。垂線の足が線分内にあるので、これが本当に最小。

**メタ。** 制約つき最大最小の王道は「①制約で 1 文字消去 ②定義域を厳密化 ③放物線として端点と頂点を比較」。同時に $x^2+y^2=k$ を“原点中心の円（等高線）”と見る幾何的視点を持てば、答えの妥当性を一目で検算でき、線形計画法（領域上の最適化）へも自然につながる。`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "quad-fixed-point-composition",
    title: "f(f(x)) = x に隠れた因数",
    unit: "2次関数",
    difficulty: "D_PLUS",
    tagline: "不動点は、合成の不動点でもある",
    hasGraph: false,
    statement: r`$f(x)=x^2+bx+c$ とする。方程式 $f(x)=x$ が異なる2つの実数解 $\alpha,\beta$ をもつとき、方程式 $f(f(x))=x$ の解をすべて求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 不動点を引き継ぐ",
        body: r`$f(\alpha)=\alpha$ ならば $f(f(\alpha))=f(\alpha)=\alpha$。つまり $f(x)=x$ の解は $f(f(x))=x$ の解でもある。ならば $f(f(x))-x$ は $f(x)-x$ で割り切れるはず。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 4 次式を割ってみる",
        body: r`$f(f(x))-x$ は 4 次式。因数 $f(x)-x=x^2+(b-1)x+c$ を持つなら、商も 2 次式になる。割り算（または恒等式の確認）で残りの因数を探そう。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 恒等式",
        body: r`$f(f(x))-x=\bigl(f(x)-x\bigr)\bigl(f(x)+x+b+1\bigr)$ が成り立つ。後半は $f(x)+x+b+1=x^2+(b+1)x+(b+c+1)$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$f(\alpha)=\alpha$ ならば $f(f(\alpha))=f(\alpha)=\alpha$ だから、$\alpha,\beta$ は $f(f(x))=x$ の解。さらに次の恒等式が成り立つ：
$$f(f(x))-x=\bigl(f(x)-x\bigr)\bigl(f(x)+x+b+1\bigr).$$
（右辺を展開すると $f(x)^2+b\,f(x)+c-x=f(f(x))-x$ に一致する。）

よって $f(f(x))=x$ は、$f(x)-x=0$（解 $\alpha,\beta$）と
$$f(x)+x+b+1=x^2+(b+1)x+(b+c+1)=0$$
に分かれる。後者の解を $\gamma,\delta$ とすれば、求める解は $\alpha,\ \beta,\ \gamma,\ \delta$（最大 4 個）。

**補足（$\gamma,\delta$ の正体）。** 後半の方程式の判別式は $(b+1)^2-4(b+c+1)=(b-1)^2-4c$ で、これは前半 $f(x)-x=x^2+(b-1)x+c$ の判別式と同じ。前半が異なる 2 解 $\alpha,\beta$ をもつ（判別式正）とき後半も異なる 2 実解をもち、$\gamma,\delta$ は **$f$ による 2 周期点**（$f(\gamma)=\delta,\ f(\delta)=\gamma$ で $f\circ f$ では戻る点）になる。不動点 $\alpha,\beta$ とは別物。

**美しさ:** 「$f$ の不動点は $f\circ f$ の不動点でもある」という当たり前の事実が、$f(f(x))-x$ の中に $f(x)-x$ という因数となって必ず潜む。4 次方程式が、見えない対称性で「不動点の 2 次」と「2 周期点の 2 次」に割れる。`,
      },
    ],
  },
];
