import type { Problem } from "@/lib/types";

// 数学II「微分法」— 15 問 (A4/B4/C4/D2/D+1)。多項式（整関数）の範囲。
// 既存ショーケース (cubic-tangent-count) と同じ unit "微分法" に統合される。
const r = String.raw;

export const differentiation2b: Problem[] = [
  // ============================== A (4) ==============================
  {
    slug: "limit-factor-cancel",
    title: "極限値（因数で約分）",
    unit: "微分法",
    difficulty: "A",
    tagline: "0/0 は約分で解消",
    hasGraph: false,
    tags: ["極限"],
    statement: r`極限値 $\displaystyle\lim_{x\to2}\frac{x^2-4}{x-2}$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 分子を因数分解", body: r`そのまま代入すると $\dfrac00$。分子 $x^2-4=(x-2)(x+2)$ を約分する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\dfrac{(x-2)(x+2)}{x-2}=x+2$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\displaystyle\lim_{x\to2}\frac{(x-2)(x+2)}{x-2}=\lim_{x\to2}(x+2)=4$。` },
    ],
  },
  {
    slug: "derivative-from-definition",
    title: "定義に基づく微分係数",
    unit: "微分法",
    difficulty: "A",
    tagline: "極限としての f′(a)",
    hasGraph: false,
    tags: ["微分係数", "極限"],
    statement: r`$f(x)=x^2$ について、定義 $f'(a)=\displaystyle\lim_{h\to0}\frac{f(a+h)-f(a)}{h}$ に従って $f'(a)$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 差を h でくくる", body: r`$f(a+h)-f(a)=(a+h)^2-a^2=2ah+h^2$。$h$ でくくって約分する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\dfrac{2ah+h^2}{h}=2a+h$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\dfrac{f(a+h)-f(a)}{h}=\dfrac{2ah+h^2}{h}=2a+h$。$h\to0$ で $f'(a)=2a$。` },
    ],
  },
  {
    slug: "derivative-polynomial",
    title: "多項式の導関数",
    unit: "微分法",
    difficulty: "A",
    tagline: "(xⁿ)′ = n xⁿ⁻¹",
    hasGraph: false,
    tags: ["導関数"],
    statement: r`$f(x)=2x^3-3x^2+x-5$ の導関数 $f'(x)$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 各項を微分", body: r`$(x^n)'=nx^{n-1}$、定数の微分は $0$。項ごとに微分する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$2\cdot3x^2-3\cdot2x+1$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$f'(x)=6x^2-6x+1$。` },
    ],
  },
  {
    slug: "tangent-at-point",
    title: "曲線上の点での接線",
    unit: "微分法",
    difficulty: "A",
    tagline: "傾きは f′(a)",
    hasGraph: false,
    tags: ["接線", "導関数"],
    statement: r`曲線 $y=x^2-2x$ 上の点 $(2,0)$ における接線の方程式を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 接線の傾き", body: r`点 $(a,f(a))$ での接線は $y=f'(a)(x-a)+f(a)$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$y'=2x-2$、$x=2$ で傾き $2$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$y'=2x-2$ より $x=2$ で傾き $2$。接線は $y=2(x-2)+0=2x-4$。` },
    ],
  },

  // ============================== B (4) ==============================
  {
    slug: "tangent-from-external-point",
    title: "外部の点から引く接線",
    unit: "微分法",
    difficulty: "B",
    tagline: "接点を t とおいて通過条件",
    hasGraph: false,
    tags: ["接線", "場合分け"],
    statement: r`点 $(0,-1)$ から放物線 $y=x^2$ に引いた接線の方程式をすべて求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 接点を文字で", body: r`接点を $(t,t^2)$ とおく。そこでの接線が $(0,-1)$ を通る条件から $t$ を決める。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`接線 $y=2t(x-t)+t^2=2tx-t^2$。$(0,-1)$ を通す：$-1=-t^2$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`接点 $(t,t^2)$ での接線は $y=2tx-t^2$。$(0,-1)$ を通るので $-1=-t^2\Rightarrow t=\pm1$。
$t=1$：$y=2x-1$。$t=-1$：$y=-2x-1$。` },
    ],
  },
  {
    slug: "increasing-decreasing",
    title: "関数の増減",
    unit: "微分法",
    difficulty: "B",
    tagline: "f′ の符号で増減を読む",
    hasGraph: false,
    tags: ["増減", "導関数"],
    statement: r`関数 $f(x)=x^3-3x$ の増減を調べよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — f′ の符号", body: r`$f'(x)>0$ で増加、$<0$ で減少。$f'(x)=0$ の前後で符号を調べる。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$f'(x)=3x^2-3=3(x-1)(x+1)$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$f'(x)=3(x-1)(x+1)$。
$x<-1$ で $f'>0$（増加）、$-1<x<1$ で $f'<0$（減少）、$x>1$ で $f'>0$（増加）。
よって $x=-1$ で極大、$x=1$ で極小。` },
    ],
  },
  {
    slug: "local-extrema-values",
    title: "極値を求める",
    unit: "微分法",
    difficulty: "B",
    tagline: "f′=0 の点で極大・極小",
    hasGraph: false,
    tags: ["極値", "導関数"],
    statement: r`$f(x)=x^3-3x^2+2$ の極値を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 候補は f′=0", body: r`$f'(x)=0$ の解の前後で $f'$ の符号が変わる点が極値。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$f'(x)=3x^2-6x=3x(x-2)$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$f'(x)=3x(x-2)$。$x=0$ の前後で $+\to-$（極大）、$x=2$ で $-\to+$（極小）。
極大値 $f(0)=2$、極小値 $f(2)=8-12+2=-2$。` },
    ],
  },
  {
    slug: "max-min-closed-interval",
    title: "閉区間での最大・最小",
    unit: "微分法",
    difficulty: "B",
    tagline: "極値と端点を比べる",
    hasGraph: false,
    tags: ["最大最小", "極値"],
    statement: r`$-2\le x\le2$ における $f(x)=x^3-3x$ の最大値・最小値を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 候補を全部出す", body: r`閉区間の最大最小は、区間内の極値と端点の値の中にある。すべて計算して比較する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`極値 $x=\pm1$。端点 $x=\pm2$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$f'(x)=3(x-1)(x+1)$。候補の値：
$f(-2)=-2,\ f(-1)=2,\ f(1)=-2,\ f(2)=2$。
最大値 $2$（$x=-1,2$）、最小値 $-2$（$x=-2,1$）。` },
    ],
  },

  // ============================== C (4) ==============================
  {
    slug: "tangent-slope-derivative",
    title: "接線の傾きと微分係数",
    unit: "微分法",
    difficulty: "C",
    tagline: "傾きが 0 になる点が極値",
    hasGraph: false,
    tags: ["接線", "微分係数", "極値"],
    statement: r`$f(x)=\dfrac{x^3}{3}-x$ について $f'(x)$ を求め、接線が水平になる（傾き $0$）点の $x$ 座標を答えよ。さらにそれが極大・極小のどちらかを判定せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 接線の傾きは微分係数",
        body: r`点 $(x,f(x))$ での接線の傾きは $f'(x)$。「接線が水平」は傾き $0$、すなわち $f'(x)=0$ と同値。ただしこれは極値の**候補**にすぎず、極大か極小かは $f'$ の符号変化で確定する（$f'=0$ でも極値でない例：$y=x^3$ の $x=0$）。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 接点を動かす",
        body: r`ラボで接点を動かすと、接線の傾き $f'(x)=x^2-1$ が変化する。$x=\pm1$ でちょうど傾きが $0$（水平）になり、その前後で傾きの符号が入れ替わることを確かめよう。

@@lab:tangent-slope@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$f'(x)=x^2-1=(x-1)(x+1)$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$f(x)=\dfrac{x^3}{3}-x$ より
$$f'(x)=x^2-1=(x-1)(x+1).$$
接線が水平になるのは $f'(x)=0$、すなわち $x=\pm1$。符号を調べると
$$f'(x)=(x-1)(x+1)\begin{cases}>0&(x<-1)\\<0&(-1<x<1)\\>0&(x>1)\end{cases}$$
だから $x=-1$ で $+\to-$（**極大**）、$x=1$ で $-\to+$（**極小**）。極大値 $f(-1)=-\dfrac13+1=\dfrac23$、極小値 $f(1)=\dfrac13-1=-\dfrac23$。

**メタ。** $f'(x)=0$ は極値の必要条件であって十分条件ではない。必ず符号変化（増減表）で裏を取る——これが「水平接線＝極値」と早合点しないための鉄則。`,
      },
    ],
  },
  {
    slug: "cubic-volume-maximize",
    title: "箱の体積の最大",
    unit: "微分法",
    difficulty: "C",
    tagline: "変数を 1 つにして微分",
    hasGraph: false,
    tags: ["最大最小", "応用"],
    statement: r`1 辺 $6$ の正方形の厚紙の四隅から 1 辺 $x$ の正方形を切り取り、折り曲げてふた無しの箱を作る。体積 $V$ を最大にする $x$ と、そのときの体積を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 文章題を 1 変数の関数に",
        body: r`切り取る正方形の 1 辺を $x$ とすると、底面は 1 辺 $6-2x$ の正方形、高さ $x$。体積は
$$V=x(6-2x)^2.$$
**定義域が命。** 箱が作れるのは $6-2x>0$ かつ $x>0$、すなわち $0<x<3$。この範囲で $V$ を最大化する。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 端での挙動を見てから微分",
        body: r`$x\to0^{+}$ では高さ $0$、$x\to3^{-}$ では底面 $0$ で、どちらも $V\to0$。両端で潰れるので最大は内部の臨界点にある。代表値で $V(1)=1\cdot4^2=16$、$V(2)=2\cdot2^2=8$。$x=1$ 付近が怪しい、と当たりをつけてから $V'=0$ を解く。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$V=4x(3-x)^2$、$V'=12(3-x)(1-x)$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$V=x(6-2x)^2=4x(3-x)^2\quad(0<x<3)$。積の微分で
$$V'=4\bigl[(3-x)^2+x\cdot2(3-x)(-1)\bigr]=4(3-x)\bigl[(3-x)-2x\bigr]=4(3-x)(3-3x)=12(3-x)(1-x).$$
$0<x<3$ では $3-x>0$ なので、$V'$ の符号は $(1-x)$ で決まる：$0<x<1$ で $V'>0$（増加）、$1<x<3$ で $V'<0$（減少）。よって $x=1$ で**極大かつ最大**。
$$V(1)=4\cdot1\cdot(3-1)^2=4\cdot4=16.$$
ゆえに $x=1$ のとき最大体積 $16$。

**メタ。** 応用最大最小の要は「①変数を 1 つに ②定義域を厳密に ③端点と臨界点を比較」の 3 手。とくに②を曖昧にすると、数式上は解けても物理的にありえない $x$ を拾ってしまう。端で $0$ に潰れる構造を先に見抜けば、内部に最大があることが微分前に分かる。`,
      },
    ],
  },
  {
    slug: "tangent-reintersection",
    title: "接線と曲線の再交点",
    unit: "微分法",
    difficulty: "C",
    tagline: "接点は重解",
    hasGraph: false,
    tags: ["接線", "高次方程式"],
    statement: r`曲線 $y=x^3$ 上の点 $(1,1)$ における接線が、再びこの曲線と交わる点の座標を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 「接する」は重解",
        body: r`接線と曲線の交点を与える方程式は、接点の $x$ を**重解**としてもつ。3 次曲線と直線なら方程式は 3 次で、$(x-\alpha)^2(x-\beta)$ の形に分解する。重解 $\alpha$ が接点、残りの $\beta$ が再交点。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 因数分解で重解を見る",
        body: r`$(1,1)$ での接線は $y=3x-2$。差をとると
$$x^3-(3x-2)=x^3-3x+2.$$
$x=1$ が接点だから $(x-1)^2$ で割り切れるはず。実際 $x^3-3x+2=(x-1)^2(x+2)$。$(x-1)^2$ が「接する」を、$(x+2)$ が「もう一度交わる」を担っているのが見える。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`接線 $y=3x-2$。$x^3=3x-2\Rightarrow x^3-3x+2=(x-1)^2(x+2)=0$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$y'=3x^2$ より $(1,1)$ での接線は $y=3(x-1)+1=3x-2$。曲線との交点は
$$x^3=3x-2\ \Longrightarrow\ x^3-3x+2=0\ \Longrightarrow\ (x-1)^2(x+2)=0.$$
$x=1$ は接点（重解）。残る解は $x=-2$ で、$y=(-2)^3=-8$。よって再交点は $(-2,-8)$。

**メタ。** 「接する条件＝重解条件」は、微分（傾き一致）を経由せず代数だけで接線問題を解く強力な視点。3 次曲線と接線が囲む面積（1/12 公式）も、この重解構造 $(x-\alpha)^2(x-\beta)$ がそのまま効いている——積分法の難問と地続きである。`,
      },
    ],
  },
  {
    slug: "cubic-solution-count",
    title: "3 次方程式の解の個数",
    unit: "微分法",
    difficulty: "C",
    tagline: "y=f(x) と y=k の交点",
    hasGraph: false,
    tags: ["解の個数", "極値", "場合分け"],
    statement: r`$k$ を実数の定数とする。方程式 $x^3-3x^2+2=k$ の異なる実数解の個数を $k$ の値で分類せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — グラフ ∩ 水平線に翻訳",
        body: r`$x^3-3x^2+2=k$ の実数解は、固定された曲線 $y=f(x)=x^3-3x^2+2$ と、動く水平線 $y=k$ の交点。交点数＝解の個数。境界になるのは曲線の**極大値・極小値**の高さ。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 水平線を上下させて数える",
        body: r`下のラボでスライダー $k$ を動かすと、$y=k$ が極大 $2$・極小 $-2$ をまたぐ瞬間に交点数が $1\leftrightarrow2\leftrightarrow3$ と跳ぶ。極値の高さが解の個数の境界だと体感できる。

@@lab:cubic-horizontal-line-count@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$f'(x)=3x(x-2)$。極大 $f(0)=2$、極小 $f(2)=-2$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$f(x)=x^3-3x^2+2$ とおくと $f'(x)=3x^2-6x=3x(x-2)$。増減は
$$f'(x)\begin{cases}>0&(x<0)\\<0&(0<x<2)\\>0&(x>2)\end{cases}$$
より $x=0$ で極大 $f(0)=2$、$x=2$ で極小 $f(2)=8-12+2=-2$。曲線 $y=f(x)$ と水平線 $y=k$ の交点数で場合分けすると：
- $k>2$ または $k<-2$：**1 個**
- $k=2$ または $k=-2$：**2 個**（一方が接点＝重解）
- $-2<k<2$：**3 個**

**メタ。** 「定数 $k$ を分離して水平線にする」のは解の個数問題の万能テク。$k$ が両辺に散らばっていても、$k=(x\ \text{の式})$ に整理できれば同じ図式に持ち込める（次の D の接線本数問題がまさにこの応用）。`,
      },
    ],
  },

  // ============================== D (2) ==============================
  {
    slug: "extrema-determine-coefficients",
    title: "極値から係数を決める",
    unit: "微分法",
    difficulty: "D",
    tagline: "f′ の解が極値の x",
    hasGraph: false,
    tags: ["極値", "解と係数の関係"],
    statement: r`$f(x)=x^3+ax^2+bx$ が $x=1$ で極大、$x=3$ で極小となるように定数 $a,b$ を定め、極大値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 極値の x は f′=0 の解",
        body: r`$f'(x)=3x^2+2ax+b$ は 2 次式。「$x=1$ で極大、$x=3$ で極小」ということは、$f'(x)=0$ の 2 解がちょうど $1,3$。ここから解と係数の関係で $a,b$ が一気に決まる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 符号の向きを先に描く",
        body: r`$f'(x)=3(x-1)(x-3)$ は下に凸の放物線で、$x<1$ で正、$1<x<3$ で負、$x>3$ で正。だから $x=1$ で $+\to-$（極大）、$x=3$ で $-\to+$（極小）と、条件通りに自動でなる。先に符号の絵を描いておくと、求めた $a,b$ の妥当性をその場で照合できる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`和 $1+3=-\dfrac{2a}{3}$、積 $1\cdot3=\dfrac b3$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$f'(x)=3x^2+2ax+b$。$f'(x)=0$ の 2 解が $1,3$ なので、解と係数の関係より
$$1+3=-\frac{2a}{3}\ \Longrightarrow\ a=-6,\qquad 1\cdot3=\frac b3\ \Longrightarrow\ b=9.$$
よって $f(x)=x^3-6x^2+9x$。このとき $f'(x)=3x^2-12x+9=3(x-1)(x-3)$ で、$x=1$ の前後は $+\to-$ ＝確かに極大。極大値は
$$f(1)=1-6+9=4.$$
**検算（極小も確認）。** $f(3)=27-54+27=0$ で $x=3$ は極小、$f(1)=4>f(3)=0$ と高低も整合する。

**メタ。** 「極値をとる $x$」を $f'=0$ の解とみて**解と係数の関係**に乗せるのが最短ルート。求めた後に増減表（$f'$ の符号）で“極大/極小の向き”まで照合するのが、減点されない答案の作法。`,
      },
    ],
  },
  {
    slug: "tangent-lines-count-from-point",
    title: "点から引ける接線の本数",
    unit: "微分法",
    difficulty: "D",
    tagline: "接点の方程式の解の個数",
    hasGraph: false,
    tags: ["接線", "解の個数", "場合分け"],
    statement: r`点 $(0,a)$ から曲線 $y=x^3-3x$ に引ける接線の本数を、$a$ の値で分類せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 接点を文字でおく",
        body: r`接点を $(t,\ t^3-3t)$ とし、そこでの接線が $(0,a)$ を通る条件を $t$ の方程式にする。**接線の本数＝その方程式の異なる実数解の個数**（接点が違えば接線も違う）。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 外部の点を動かして本数を見る",
        body: r`下のラボ（代表として $y=x^3$）で点 $P$ をドラッグすると、引ける接線が領域によって 1〜3 本に変わる。一般の 3 次曲線では本数は「接点の方程式の実数解の個数」で決まる——本問は $P$ が $y$ 軸上にある特殊な配置で、常に 1 本になることを次で示す。

@@lab:cubic-tangents@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`接線 $y=(3t^2-3)(x-t)+t^3-3t$。$x=0,\ y=a$ を代入して整理すると $a=-2t^3$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$y'=3x^2-3$ より、接点 $(t,t^3-3t)$ での接線は
$$y=(3t^2-3)(x-t)+t^3-3t.$$
これが $(0,a)$ を通る条件は、$x=0,\ y=a$ を代入して
$$a=(3t^2-3)(-t)+t^3-3t=-3t^3+3t+t^3-3t=-2t^3.$$
すなわち $t^3=-\dfrac a2$。3 乗 $t\mapsto t^3$ は実数全体で**狭義単調増加かつ全射**なので、右辺がどんな実数でも実数解 $t$ はちょうど 1 つ。したがって接線は、$a$ の値によらず**つねに 1 本**。

**メタ。** 接線本数問題は「接点 $t$ の方程式の実数解の個数」に帰着するのが定石。今回は $t^3=$ 定数という単調関数型なので一意。一方、点が $y$ 軸上でなければ $t$ の方程式は 3 次になり、極大・極小と定数の大小で 1〜3 本に分岐する（C の解の個数問題と完全に同じ図式）。`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "cubic-point-symmetry",
    title: "3 次関数は変曲点に関して点対称",
    unit: "微分法",
    difficulty: "D_PLUS",
    tagline: "f(p+t)+f(p−t)=2f(p)",
    hasGraph: false,
    tags: ["対称性", "変曲点", "証明"],
    statement: r`3 次関数 $f(x)=ax^3+bx^2+cx+d\ (a\neq0)$ のグラフは、変曲点 $\left(p,\,f(p)\right)\ \left(p=-\dfrac{b}{3a}\right)$ に関して点対称であることを示せ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 点対称の条件式", body: r`点 $(p,f(p))$ に関する点対称とは、任意の $t$ について $\dfrac{f(p+t)+f(p-t)}{2}=f(p)$、すなわち $f(p+t)+f(p-t)=2f(p)$ が成り立つこと。` },
      { type: "EXPERIMENT", order: 1, title: "実験 — 2 次の項を消す中心", body: r`$f''(x)=6ax+2b=0$ となる $x=-\dfrac{b}{3a}=p$ が変曲点。ここを中心に平行移動すると 2 次の項が消え、奇関数 $aX^3+(\text{1 次})$ になる、という見通しを持っておく。` },
      { type: "HINT", order: 2, title: "ヒント", body: r`$g(t)=f(p+t)+f(p-t)-2f(p)$ を展開すると、$t$ の奇数次が消え、偶数次の係数も $p=-\dfrac{b}{3a}$ で $0$ になることを示せばよい。` },
      { type: "SOLUTION", order: 3, title: "厳密な解答", body: r`任意の $t$ について
$$g(t):=f(p+t)+f(p-t)-2f(p)$$
を計算する。一般に多項式 $f$ に対し、$f(p+t)+f(p-t)$ の $t$ についての**奇数次**の項は打ち消し合う。よって $g(t)$ は $t$ の偶数次のみで、テイラー展開（または直接展開）から
$$g(t)=f''(p)\,t^2+\frac{f^{(4)}(p)}{12}t^4+\cdots$$
の形。$f$ は 3 次式だから $4$ 次以上の導関数は $0$ で、残るのは $f''(p)\,t^2$ のみ。
ここで $f''(x)=6ax+2b$ なので、$p=-\dfrac{b}{3a}$ のとき
$$f''(p)=6a\!\left(-\frac{b}{3a}\right)+2b=-2b+2b=0.$$
ゆえに $g(t)=0$、すなわち $f(p+t)+f(p-t)=2f(p)$ がすべての $t$ で成立する。よってグラフは変曲点 $(p,f(p))$ に関して点対称。$\blacksquare$

**別解（中心へ平行移動して奇関数に）。** $X=x-p$ と平行移動し $F(X)=f(X+p)-f(p)$ とおく。$F$ は 3 次の多項式で定数項は $F(0)=0$。さらに $X^2$ の係数は $\dfrac{f''(p)}{2}=0$ なので消え、$F(X)=aX^3+(\text{1 次の項})$ という**奇関数**になる（$F(-X)=-F(X)$）。奇関数は原点対称だから、もとの $f$ は中心 $(p,f(p))$ に関して点対称。$g(t)$ を展開する方法と本質は同じだが、「中心へ移すと奇関数」という見え方のほうが直感的。

**美しさ:** どんな 3 次関数も、変曲点という「重心」のまわりでは完全な奇関数 $aX^3+(\text{1 次})$ に化ける。$f''(p)=0$ という一点が、グラフ全体の点対称性を保証している。` },
    ],
  },

  // ---- 旧帝大レベル追加（2 曲線の共通接線） ----
  {
    slug: "common-tangent-two-parabolas",
    title: "2 曲線に共通な接線",
    unit: "微分法",
    difficulty: "D",
    tagline: "片方の接線を、もう片方に接させる",
    hasGraph: false,
    tags: ["共通接線", "判別式", "接線", "場合分け"],
    statement: r`$a$ を実数の定数とする。2 曲線 $C_1:y=x^2$ と $C_2:y=-(x-2)^2+a$ の両方に接する直線（共通接線）の本数を、$a$ の値で分類せよ。また共通接線がちょうど 1 本となる $a$ について、その接線を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 片方の接線で表してから接させる",
        body: r`$C_1$ 上の接点を $(t,t^2)$ とおくと、そこでの接線は $y=2tx-t^2$。これが $C_2$ にも接する条件（連立して判別式 $0$）を $t$ の方程式にし、その実数解の個数が共通接線の本数。「2 曲線に接する」を「1 つの接線族の中で、もう片方にも接するものを数える」に読み替えるのが核心。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — C₂ を上下させて本数を見る",
        body: r`下のラボでスライダー $a$ を動かすと、$C_2:y=-(x-2)^2+a$ が上下する。共通接線（緑）の本数が、$a<2$ で 2 本、$a=2$ で 1 本、$a>2$ で 0 本と切り替わる。境界 $a=2$ では 2 本が 1 本に重なる瞬間（接線どうしの合体）が見える。

@@lab:common-tangent-parabolas@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$2tx-t^2=-(x-2)^2+a$ を整理すると $x^2+(2t-4)x+(4-a-t^2)=0$。これが重解 $\iff$ 判別式 $0$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$C_1$ 上の点 $(t,t^2)$ での接線は $y=2tx-t^2$。これが $C_2$ に接する条件を求める。連立すると
$$2tx-t^2=-(x-2)^2+a\ \Longrightarrow\ x^2+(2t-4)x+(4-a-t^2)=0.$$
接する $\iff$ この 2 次方程式が重解 $\iff$ 判別式 $=0$：
$$(2t-4)^2-4(4-a-t^2)=0\ \Longrightarrow\ 8t^2-16t+4a=0\ \Longrightarrow\ 2t^2-4t+a=0.$$
共通接線の本数は、この $t$ の 2 次方程式の実数解の個数。判別式は $(-4)^2-4\cdot2\cdot a=16-8a$ なので
- $a<2$：**2 本**
- $a=2$：**1 本**
- $a>2$：**0 本**

$a=2$ のとき $2t^2-4t+2=0\Rightarrow(t-1)^2=0\Rightarrow t=1$。接線は $y=2\cdot1\cdot x-1^2=2x-1$。

**メタ。** 共通接線は「接点パラメータ $t$ の方程式の解の数」で数えるのが定石。$C_1$ 側で接線族を作り $C_2$ に接する条件を課す——非対称に見える 2 曲線を、1 つのパラメータ $t$ で串刺しにするのが美しさ。$C_2$ が上にあるほど（$a$ 大）2 つの放物線は離れ、やがて共通接線が消えるという幾何が、判別式 $16-8a$ の符号にそのまま表れている。`,
      },
    ],
  },
];
