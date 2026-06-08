import type { Problem } from "@/lib/types";

// 数学II「積分法」— 15 問 (A4/B4/C4/D2/D+1)。多項式・面積・1/6 公式。
// 既存ショーケース (対称性の定積分) と同じ unit "積分法" に統合される。
const r = String.raw;

export const integration2b: Problem[] = [
  // ============================== A (4) ==============================
  {
    slug: "indefinite-integral-poly",
    title: "不定積分",
    unit: "積分法",
    difficulty: "A",
    tagline: "微分の逆、+C を忘れず",
    hasGraph: false,
    tags: ["不定積分"],
    statement: r`不定積分 $\displaystyle\int(3x^2-2x+1)\,dx$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 各項を積分", body: r`$\displaystyle\int x^n\,dx=\dfrac{x^{n+1}}{n+1}+C$。項ごとに積分して積分定数 $C$ を付ける。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$3\cdot\dfrac{x^3}{3}-2\cdot\dfrac{x^2}{2}+x$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\displaystyle\int(3x^2-2x+1)\,dx=x^3-x^2+x+C$。` },
    ],
  },
  {
    slug: "definite-integral-basic",
    title: "定積分の計算",
    unit: "積分法",
    difficulty: "A",
    tagline: "原始関数の差",
    hasGraph: false,
    tags: ["定積分"],
    statement: r`定積分 $\displaystyle\int_0^2(x^2+1)\,dx$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 原始関数を作る", body: r`$\displaystyle\int_a^b f(x)\,dx=[F(x)]_a^b=F(b)-F(a)$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$F(x)=\dfrac{x^3}{3}+x$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\displaystyle\int_0^2(x^2+1)\,dx=\left[\frac{x^3}{3}+x\right]_0^2=\frac83+2=\frac{14}{3}$。` },
    ],
  },
  {
    slug: "area-under-parabola",
    title: "放物線と x 軸が囲む面積",
    unit: "積分法",
    difficulty: "A",
    tagline: "面積は定積分",
    hasGraph: false,
    tags: ["面積", "定積分"],
    statement: r`曲線 $y=x^2$、$x$ 軸、直線 $x=3$ で囲まれた図形の面積を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — y≥0 の面積", body: r`$0\le x\le3$ で $y=x^2\ge0$ なので、面積は $\displaystyle\int_0^3 x^2\,dx$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\left[\dfrac{x^3}{3}\right]_0^3$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\displaystyle\int_0^3 x^2\,dx=\left[\frac{x^3}{3}\right]_0^3=9$。面積は $9$。` },
    ],
  },
  {
    slug: "fundamental-theorem-derivative",
    title: "積分で表された関数の微分",
    unit: "積分法",
    difficulty: "A",
    tagline: "微分積分学の基本定理",
    hasGraph: false,
    tags: ["定積分", "微分積分学の基本定理"],
    statement: r`$\dfrac{d}{dx}\displaystyle\int_{1}^{x}(t^2-t)\,dt$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 基本定理", body: r`$\dfrac{d}{dx}\displaystyle\int_a^x f(t)\,dt=f(x)$（上端の $x$ をそのまま代入）。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$f(t)=t^2-t$ に $t=x$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`微分積分学の基本定理より $\dfrac{d}{dx}\displaystyle\int_{1}^{x}(t^2-t)\,dt=x^2-x$。` },
    ],
  },

  // ============================== B (4) ==============================
  {
    slug: "area-parabola-line",
    title: "放物線と直線が囲む面積",
    unit: "積分法",
    difficulty: "B",
    tagline: "(上 − 下) を積分",
    hasGraph: false,
    tags: ["面積", "定積分"],
    statement: r`2 曲線 $y=x^2$ と $y=x$ で囲まれた図形の面積を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 交点と上下", body: r`交点を求め、区間内で上にある関数から下にある関数を引いて積分する。$0\le x\le1$ で $x\ge x^2$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`交点 $x=0,1$。$\displaystyle\int_0^1(x-x^2)\,dx$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$x^2=x\Rightarrow x=0,1$。$0\le x\le1$ で $x\ge x^2$ だから
$$\int_0^1(x-x^2)\,dx=\left[\frac{x^2}{2}-\frac{x^3}{3}\right]_0^1=\frac12-\frac13=\frac16.$$` },
    ],
  },
  {
    slug: "area-two-parabolas",
    title: "2 つの放物線が囲む面積",
    unit: "積分法",
    difficulty: "B",
    tagline: "差をとって積分",
    hasGraph: false,
    tags: ["面積", "定積分"],
    statement: r`2 曲線 $y=x^2$ と $y=2x-x^2$ で囲まれた図形の面積を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 交点で挟まれた区間", body: r`交点を求め、上 − 下を積分する。$0\le x\le1$ で $2x-x^2\ge x^2$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$x^2=2x-x^2\Rightarrow x=0,1$。被積分は $(2x-x^2)-x^2=2x-2x^2$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`交点 $x=0,1$。
$$\int_0^1\bigl[(2x-x^2)-x^2\bigr]dx=\int_0^1(2x-2x^2)\,dx=\left[x^2-\frac{2x^3}{3}\right]_0^1=1-\frac23=\frac13.$$` },
    ],
  },
  {
    slug: "sixth-area-formula",
    title: "1/6 公式の利用",
    unit: "積分法",
    difficulty: "B",
    tagline: "面積 = (1/6)|a|(β−α)³",
    hasGraph: false,
    tags: ["面積", "1/6公式"],
    statement: r`放物線 $y=x^2$ と直線 $y=x+2$ で囲まれた図形の面積を、1/6 公式を用いて求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 交点と 1/6 公式", body: r`放物線と直線（または放物線同士）で囲む面積は、交点 $\alpha,\beta$ を用いて $\dfrac{|a|}{6}(\beta-\alpha)^3$。ここで $a$ は $x^2$ の係数の差。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$x^2=x+2\Rightarrow x^2-x-2=0\Rightarrow x=-1,2$。$a=1$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`交点：$x^2-x-2=0\Rightarrow x=-1,2$。1/6 公式より
$$S=\frac{1}{6}\,|1|\,(2-(-1))^3=\frac{1}{6}\cdot27=\frac{9}{2}.$$` },
    ],
  },
  {
    slug: "definite-integral-absolute",
    title: "絶対値を含む定積分",
    unit: "積分法",
    difficulty: "B",
    tagline: "符号で区間を分ける",
    hasGraph: false,
    tags: ["定積分", "絶対値", "場合分け"],
    statement: r`定積分 $\displaystyle\int_0^2|x-1|\,dx$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 絶対値の中身の符号", body: r`$x-1$ は $x=1$ で符号が変わる。$[0,1]$ と $[1,2]$ に分け、絶対値を外す。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$[0,1]$ で $|x-1|=1-x$、$[1,2]$ で $|x-1|=x-1$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$$\int_0^2|x-1|\,dx=\int_0^1(1-x)\,dx+\int_1^2(x-1)\,dx=\frac12+\frac12=1.$$` },
    ],
  },

  // ============================== C (4) ==============================
  {
    slug: "area-cubic-line-symmetric",
    title: "3 次曲線と直線が囲む面積",
    unit: "積分法",
    difficulty: "C",
    tagline: "奇関数の対称性を使う",
    hasGraph: false,
    tags: ["面積", "定積分", "対称性"],
    statement: r`曲線 $y=x^3$ と直線 $y=x$ で囲まれた図形全体の面積を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 奇関数の原点対称",
        body: r`まず交点を出して「囲まれた図形」を正確に把握する。$y=x^3$ と $y=x$ はともに奇関数なので、グラフは原点対称。交点も原点対称に並び、囲まれる領域は原点を挟んで**合同な 2 つの葉（ローブ）**になる。

**戦略。** 原点対称性から、第 1 象限側の葉の面積を求めて 2 倍すればよい。ただし「どちらが上か」は区間ごとに変わるので、符号を必ず確認する。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 代表値で上下を決める",
        body: r`交点は $x^3=x\Leftrightarrow x(x^2-1)=0\Leftrightarrow x=0,\pm1$。区間 $0<x<1$ で代表値 $x=\dfrac12$ を入れると $x=\dfrac12,\ x^3=\dfrac18$ で $x>x^3$、つまり**直線が上**。区間 $-1<x<0$ では $x=-\dfrac12$ で $x=-\dfrac12,\ x^3=-\dfrac18$ となり $x^3>x$、つまり**曲線が上**。上下が入れ替わるが、原点対称なので 2 つの葉の面積は等しい。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$x^3=x\Rightarrow x=0,\pm1$。対称性から $S=2\displaystyle\int_0^1(x-x^3)\,dx$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**交点。** $x^3=x\Leftrightarrow x(x-1)(x+1)=0\Leftrightarrow x=0,\pm1$。

**第 1 象限側の葉。** $0\le x\le1$ で $x\ge x^3$ だから、その面積は
$$S_1=\int_0^1(x-x^3)\,dx=\left[\frac{x^2}{2}-\frac{x^4}{4}\right]_0^1=\frac12-\frac14=\frac14.$$

**対称性で総面積。** 領域は原点対称なので、第 3 象限側の葉の面積も $S_1=\dfrac14$。よって
$$S=2S_1=2\cdot\frac14=\frac12.$$

**対称性を使わない検算。** 左側の葉を直接計算：$-1\le x\le0$ で $x^3\ge x$ だから
$$\int_{-1}^{0}(x^3-x)\,dx=\left[\frac{x^4}{4}-\frac{x^2}{2}\right]_{-1}^{0}=0-\left(\frac14-\frac12\right)=\frac14.$$
合計 $\dfrac14+\dfrac14=\dfrac12$ で一致する。

**美しさ（メタ）:** 奇関数どうしが囲む図形は必ず原点対称。「片側 × 2」で計算量が半分になる。一方、被積分関数 $x-x^3$ 自体も奇関数なので $\displaystyle\int_{-1}^{1}(x-x^3)\,dx$ を素朴に取ると $0$（符号付き面積の相殺）になる——だから**面積では絶対値＝対称性で 2 倍**という処理が本質的に必要。ここを取り違えないのが急所。`,
      },
    ],
  },
  {
    slug: "integral-equation-constant",
    title: "定数となる定積分を含む方程式",
    unit: "積分法",
    difficulty: "C",
    tagline: "∫₀¹f は定数とおく",
    hasGraph: false,
    tags: ["定積分", "恒等式"],
    statement: r`関数 $f(x)$ が $f(x)=3x^2+2\displaystyle\int_0^1 f(t)\,dt$ をみたすとき、$f(x)$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 定積分はただの定数",
        body: r`$\displaystyle\int_0^1 f(t)\,dt$ は、積分してしまえば **$x$ を含まないただの定数**。この一点に気づけば、未知関数 $f$ の問題が、未知定数 1 つの方程式に化ける。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 定数に名前をつけて回す",
        body: r`$A=\displaystyle\int_0^1 f(t)\,dt$ とおくと、与式は $f(x)=3x^2+2A$。この $f$ を定義 $A=\int_0^1 f$ に戻して $A$ 自身を計算すると、$A$ についての 1 次方程式が立つ：
$$A=\int_0^1\bigl(3t^2+2A\bigr)\,dt.$$
未知が $A$ だけになったので解ける。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$A=\displaystyle\int_0^1(3t^2+2A)\,dt=\bigl[t^3+2At\bigr]_0^1=1+2A$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$A=\displaystyle\int_0^1 f(t)\,dt$ とおく。与式より $f(x)=3x^2+2A$ だから、これを代入して
$$A=\int_0^1\bigl(3t^2+2A\bigr)\,dt=\bigl[t^3+2At\bigr]_0^1=(1+2A)-0=1+2A.$$
よって $A=1+2A\Rightarrow A=-1$。ゆえに
$$f(x)=3x^2+2(-1)=3x^2-2.$$
**検算。** $\displaystyle\int_0^1(3t^2-2)\,dt=\bigl[t^3-2t\bigr]_0^1=1-2=-1=A$ で整合。確かに $f(x)=3x^2-2$ は与えられた関係式をみたす。

**メタ。** 「積分の中身に未知が紛れていても、定積分は定数」という視点が勝負どころ。同型の問題（$f(x)=\cdots+\displaystyle\int_a^b f$）はすべて——定数化 → 自己代入 → 1 次方程式——の手順で機械的に解ける。係数に $x$ が掛かる場合（$f(x)=\cdots+x\int_a^b f$）でも、定積分部分は定数のままなので同じ発想が効く。`,
      },
    ],
  },
  {
    slug: "area-bisect-vertical",
    title: "面積を 2 等分する直線",
    unit: "積分法",
    difficulty: "C",
    tagline: "半分の面積を方程式に",
    hasGraph: false,
    tags: ["面積", "定積分", "方程式"],
    statement: r`曲線 $y=x^2$、$x$ 軸、直線 $x=2$ で囲まれた図形を、$y$ 軸に平行な直線 $x=a\ (0<a<2)$ が 2 等分するとき、$a$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 「2 等分」を式に翻訳",
        body: r`「直線 $x=a$ が図形を 2 等分」＝「$0$ から $a$ までの面積が、全体のちょうど半分」。まず全体 $\displaystyle\int_0^2 x^2\,dx$ を出し、その $\dfrac12$ を $\displaystyle\int_0^a x^2\,dx$ に等しいとおく。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 累積面積の単調性で一意性を見る",
        body: r`累積面積 $A(a)=\displaystyle\int_0^a x^2\,dx=\dfrac{a^3}{3}$ は $a$ について狭義単調増加。$a$ を $0\to2$ と動かすと $A(a)$ は $0\to\dfrac83$ まで連続的に増える。したがって「半分の $\dfrac43$」を与える $a$ は $0<a<2$ にただ 1 つ存在する（中間値の定理＋単調性で解の一意性が保証される）。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`全体 $=\dfrac83$。$\displaystyle\int_0^a x^2\,dx=\dfrac{a^3}{3}=\dfrac12\cdot\dfrac83=\dfrac43$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`全体の面積は
$$\int_0^2 x^2\,dx=\left[\frac{x^3}{3}\right]_0^2=\frac83.$$
その半分は $\dfrac43$。左側の面積が半分になる条件は
$$\int_0^a x^2\,dx=\frac{a^3}{3}=\frac43\ \Longrightarrow\ a^3=4\ \Longrightarrow\ a=\sqrt[3]{4}.$$
$\sqrt[3]{4}\approx1.587$ で確かに $0<a<2$ をみたす（範囲内に一意に存在）。

**メタ。** 「面積の半分」は素直に $\dfrac12\times(\text{全体})$ を相手取るのが最短。$x=a$ ではなく $y=k$（横線）で 2 等分する別問題も、可変な境界で累積面積を一致させるという**同じ型**で立式できる。`,
      },
    ],
  },
  {
    slug: "position-from-velocity",
    title: "速度から位置を求める",
    unit: "積分法",
    difficulty: "C",
    tagline: "位置は速度の積分",
    hasGraph: false,
    tags: ["定積分", "速度と位置"],
    statement: r`数直線上を動く点 P の時刻 $t$ における速度が $v(t)=3t^2-6t$ である。時刻 $t=0$ で原点を出発するとき、$t=3$ における P の位置を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 位置は速度の符号付き面積",
        body: r`速度 $v(t)$ の**符号付き面積**が変位。出発点 $x(0)=0$ に、$0$ から $t$ までの $v$ の定積分を足すと位置が出る：
$$x(t)=x(0)+\int_0^t v(s)\,ds.$$
「符号付き」が肝。$v<0$ の区間は位置を**戻す**ので、面積はマイナスに効く。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 符号の効き方を見る",
        body: r`$v(t)=3t^2-6t=3t(t-2)$ は $t=0,2$ で $0$、$0<t<2$ で負、$t>2$ で正。下のラボでスライダー $T$ を動かすと、累積 $x(T)=T^3-3T^2$ が一度マイナス側へ沈み、$t=2$ 以降で戻ってくる。$x(3)=0$、すなわち**いったん負へ動いてから原点へ帰る**のが見える。

@@lab:signed-area-accumulation@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$x(3)=\displaystyle\int_0^3(3t^2-6t)\,dt=\bigl[t^3-3t^2\bigr]_0^3$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$x(0)=0$ なので
$$x(3)=\int_0^3 v(t)\,dt=\int_0^3(3t^2-6t)\,dt=\bigl[t^3-3t^2\bigr]_0^3=(27-27)-0=0.$$
よって $t=3$ で P は**原点（位置 $0$）**にある。

**変位と道のりの違い（メタ）。** いま求めたのは符号付きの**変位**で $0$。一方、実際に動いた**道のり**は $\displaystyle\int_0^3|v(t)|\,dt$。$0<t<2$ で $v<0$、$2<t<3$ で $v>0$ なので
$$\int_0^3|v|\,dt=-\int_0^2 v\,dt+\int_2^3 v\,dt=-(-4)+4=8.$$
「位置が原点に戻る」と「動いていない」はまったく別物——変位 $0$、道のり $8$。この区別が物理量としての定積分の急所であり、絶対値積分（前後の問題）と地続きの考え方になっている。`,
      },
    ],
  },

  // ============================== D (2) ==============================
  {
    slug: "area-parabola-line-param",
    title: "面積が与えられたときの傾き",
    unit: "積分法",
    difficulty: "D",
    tagline: "1/6 公式を逆に使う",
    hasGraph: false,
    tags: ["面積", "1/6公式", "方程式"],
    statement: r`$m>0$ とする。放物線 $y=x^2$ と直線 $y=mx$ で囲まれた図形の面積が $\dfrac92$ となるように $m$ を定めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 1/6 公式を逆向きに使う",
        body: r`通常は $m$ が与えられて面積を出すが、本問は面積 $\dfrac92$ から $m$ を逆算する。まず面積を $m$ の式で表すのが筋。交点は $x^2=mx\Leftrightarrow x(x-m)=0\Leftrightarrow x=0,m$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 1/6 公式の意味を確かめる",
        body: r`放物線と直線が交点 $\alpha,\beta$ で囲む面積は、$x^2$ の係数差 $|a|$ を用いて $\dfrac{|a|}{6}(\beta-\alpha)^3$。下のラボは $y=x^2$ と直線 $y=x+c$ の例で、直線を上下に動かしても面積が常に $\dfrac16(\beta-\alpha)^3$ に一致することを示す。本問では $\alpha=0,\ \beta=m,\ a=1$ にあたり、面積は $\dfrac{m^3}{6}$。

@@lab:area-between-curves@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`面積 $=\dfrac16(m-0)^3=\dfrac{m^3}{6}$。これを $\dfrac92$ と等置。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**面積を $m$ で表す。** 交点は $x=0,m$。$0\le x\le m$ で $mx\ge x^2$（直線が上）だから
$$S=\int_0^m(mx-x^2)\,dx=\left[\frac{m}{2}x^2-\frac{x^3}{3}\right]_0^m=\frac{m^3}{2}-\frac{m^3}{3}=\frac{m^3}{6}.$$
これは 1/6 公式 $\dfrac{|1|}{6}(m-0)^3=\dfrac{m^3}{6}$ と一致する。

**方程式を解く。**
$$\frac{m^3}{6}=\frac92\ \Longrightarrow\ m^3=27\ \Longrightarrow\ m=3\quad(m>0).$$
$m^3=27$ の実数解は $m=3$ のみで、$m>0$ の条件にも合致する。

**メタ。** 面積公式を「値を出す道具」だけでなく「未知を逆算する方程式」として使えるかが分かれ目。直接積分でも 1/6 公式でも同じ $\dfrac{m^3}{6}$ に到達することを確かめておくと、公式の暗記が「意味の理解」に変わる。`,
      },
    ],
  },
  {
    slug: "definite-integral-abs-shift",
    title: "符号が 2 回変わる絶対値積分",
    unit: "積分法",
    difficulty: "D",
    tagline: "零点で 3 区間に分ける",
    hasGraph: false,
    tags: ["定積分", "絶対値", "場合分け"],
    statement: r`定積分 $\displaystyle\int_{-1}^{2}\bigl|x^2-x\bigr|\,dx$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 絶対値積分の唯一の定石",
        body: r`$|x^2-x|$ の中身 $x^2-x=x(x-1)$ は $x=0,1$ で符号が変わる。積分区間 $[-1,2]$ をこの 2 点で**3 つ**に割り、各区間で絶対値を外してから積分する。零点が区間の内部にあることの確認が第一歩。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 符号領域を見て外し方を決める",
        body: r`$g(x)=x^2-x$ は下に凸の放物線で、$0<x<1$ でのみ負、それ以外で正。だから
$$[-1,0]:\ |g|=g,\qquad[0,1]:\ |g|=-g,\qquad[1,2]:\ |g|=g.$$
下のラボは $|g|$（実線）が $g$（破線）の負の部分を $x$ 軸で**折り返した**姿であることを示す。スライダー上端 $b$ を動かすと累積面積が増え、$b=2$ で総和 $\dfrac{11}{6}$ に達する。

@@lab:abs-value-integral@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$[-1,0]$ と $[1,2]$ で $x^2-x\ge0$、$[0,1]$ で $\le0$。$\displaystyle\int(x^2-x)\,dx=\dfrac{x^3}{3}-\dfrac{x^2}{2}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$F(x)=\dfrac{x^3}{3}-\dfrac{x^2}{2}$ を $x^2-x$ の原始関数とおき、3 区間それぞれで絶対値を外す。

**$[-1,0]$（$g\ge0$）:**
$$\int_{-1}^{0}(x^2-x)\,dx=F(0)-F(-1)=0-\left(-\frac13-\frac12\right)=\frac56.$$
**$[0,1]$（$g\le0$、符号反転）:**
$$\int_{0}^{1}\bigl(-(x^2-x)\bigr)\,dx=-\bigl[F(1)-F(0)\bigr]=-\left(\frac13-\frac12\right)=\frac16.$$
**$[1,2]$（$g\ge0$）:**
$$\int_{1}^{2}(x^2-x)\,dx=F(2)-F(1)=\left(\frac83-2\right)-\left(\frac13-\frac12\right)=\frac23+\frac16=\frac56.$$
**合計:**
$$\int_{-1}^{2}|x^2-x|\,dx=\frac56+\frac16+\frac56=\frac{11}{6}.$$

**メタ。** 絶対値積分は「符号で区間を割る」が唯一にして絶対の定石。零点が積分区間の**内部**にあるかを最初に判定するのが事故防止の要——零点が区間外なら符号一定で、割る必要すらない。なお符号付き積分は
$$\int_{-1}^{2}(x^2-x)\,dx=F(2)-F(-1)=\frac23-\left(-\frac56\right)=\frac32$$
で、絶対値版 $\dfrac{11}{6}$ より小さい（負の寄与を正に直すぶん大きくなる）。両者の差がちょうど $[0,1]$ の負部分の 2 倍であることも確認できる。`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "archimedes-parabola-segment",
    title: "アルキメデスの放物線の求積",
    unit: "積分法",
    difficulty: "D_PLUS",
    tagline: "弓形は内接三角形の 4/3 倍",
    hasGraph: false,
    tags: ["面積", "1/6公式", "対称性"],
    statement: r`放物線 $y=x^2$ 上の 2 点 $\mathrm A(a,a^2)$、$\mathrm B(b,b^2)$（$a<b$）を結ぶ弦と放物線で囲まれた弓形の面積を $S$ とする。弦 $\mathrm{AB}$ に平行な接線の接点を $\mathrm C$ とするとき、$S$ と三角形 $\mathrm{ABC}$ の面積 $T$ の比 $S:T$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — それぞれを (b−a) で表す", body: r`$S$ は 1/6 公式で、$T$ は接点 $\mathrm C$ の位置（$\mathrm{AB}$ の中点の真下／真上）から、ともに $(b-a)$ のべきで表せる。比を取ると数値定数になる。` },
      { type: "EXPERIMENT", order: 1, title: "実験 — 接点 C の x 座標", body: r`弦 $\mathrm{AB}$ の傾きは $\dfrac{b^2-a^2}{b-a}=a+b$。接線の傾き $2x$ がこれに等しいのは $x=\dfrac{a+b}{2}$。よって $\mathrm C$ の $x$ 座標は弦の中点と同じ。` },
      { type: "HINT", order: 2, title: "ヒント", body: r`$S=\dfrac{1}{6}(b-a)^3$。$\mathrm C$ と弦の鉛直距離は $\dfrac{(b-a)^2}{4}$ なので $T=\dfrac12(b-a)\cdot\dfrac{(b-a)^2}{4}$。` },
      { type: "SOLUTION", order: 3, title: "厳密な解答", body: r`**弓形の面積 $S$:** 弦 $\mathrm{AB}$ の方程式は $y=(a+b)x-ab$。1/6 公式（放物線と直線、交点 $a,b$）より
$$S=\frac16(b-a)^3.$$

**三角形 $T$:** 接線の傾き $2x=a+b$ より接点 $\mathrm C$ の $x$ 座標は $\dfrac{a+b}{2}$。同じ $x$ での弦の $y$ 座標と $\mathrm C$ の $y$ 座標の差（鉛直距離）は
$$\left[(a+b)\cdot\frac{a+b}{2}-ab\right]-\left(\frac{a+b}{2}\right)^2=\frac{(a+b)^2}{2}-ab-\frac{(a+b)^2}{4}=\frac{(a+b)^2}{4}-ab=\frac{(b-a)^2}{4}.$$
三角形 $\mathrm{ABC}$ を、$x$ 方向の幅 $b-a$ と上の鉛直距離で測ると
$$T=\frac12\,(b-a)\cdot\frac{(b-a)^2}{4}=\frac{(b-a)^3}{8}.$$

**比:**
$$\frac{S}{T}=\frac{(b-a)^3/6}{(b-a)^3/8}=\frac{8}{6}=\frac43.$$
よって $S:T=4:3$。$\blacksquare$

**別解の視点（剪断不変性）。** $x$ 座標を保ったまま $y$ を 1 次式でずらす剪断変換 $(x,y)\mapsto(x,\ y-\ell(x))$（$\ell$ は 1 次式）は、**面積を変えず**放物線を放物線に移す。弦 $\mathrm{AB}$ を表す 1 次式 $\ell(x)=(a+b)x-ab$ で $y$ をずらせば弦は $x$ 軸に重なり、放物線は $y=(x-a)(x-b)$ に標準化される。この標準形なら $S=\dfrac16(b-a)^3,\ T=\dfrac{(b-a)^3}{8}$ がただ一度の計算で出て、比 $4:3$ が $a,b$ に依らない理由が一目で分かる。

**美しさ:** 積分を知らなかったアルキメデスが見抜いた「放物線の弓形は内接三角形の $\dfrac43$ 倍」が、1/6 公式と接点の対称性からまっすぐに再現される。曲線の面積が、たった一つの三角形の比に宿っている。` },
    ],
  },

  // ---- 旧帝大レベル追加（1/12 公式） ----
  {
    slug: "twelfth-area-formula",
    title: "3 次曲線と接線が囲む面積（1/12 公式）",
    unit: "積分法",
    difficulty: "D_PLUS",
    tagline: "接点は重解 → (x−α)²(x−β)",
    hasGraph: false,
    tags: ["1/12公式", "面積", "定積分", "接線"],
    statement: r`曲線 $y=x^3$ 上の点 $(1,1)$ における接線と、この曲線で囲まれた図形の面積を求めよ。さらに一般に、3 次曲線とその接線が囲む面積が「$\dfrac{|a|}{12}(\beta-\alpha)^4$」（$a$ は 3 次の係数、$\alpha$ は接点、$\beta$ はもう一つの交点）と表せることを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 接点は 2 重の交点",
        body: r`曲線と接線の差を作ると、接点 $x=\alpha$ は重解（$(x-\alpha)^2$ を因数にもつ）になる。3 次なので残りの 1 次因数が、もう一つの交点 $\beta$ を与える。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 差の符号を見る",
        body: r`$y=x^3$ の $(1,1)$ での接線は $y=3x-2$。差 $x^3-(3x-2)=x^3-3x+2=(x-1)^2(x+2)$。接点 $x=1$ は重解、もう一つの交点は $x=-2$。区間 $[-2,1]$ では $(x-1)^2\ge0,\ (x+2)\ge0$ なので曲線が接線の上。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 公式の核",
        body: r`$\displaystyle\int_\alpha^\beta a(x-\alpha)^2(x-\beta)\,dx=-\dfrac{a}{12}(\beta-\alpha)^4$（置換 $x=\alpha+u$ で確かめられる）。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**具体例:** $y=x^3$ の $(1,1)$ での接線は $y'=3x^2$ より傾き $3$、$y=3x-2$。差は
$$x^3-(3x-2)=x^3-3x+2=(x-1)^2(x+2).$$
$[-2,1]$ で曲線が接線の上にあるから面積は
$$S=\int_{-2}^{1}(x-1)^2(x+2)\,dx.$$

**一般公式の導出:** 3 次曲線 $y=ax^3+\cdots$ と接線の差は、接点 $\alpha$ を重解にもつので $a(x-\alpha)^2(x-\beta)$ と書ける。$x=\alpha+u$ と置換すると $x-\alpha=u,\ x-\beta=u-(\beta-\alpha)$ で、$u$ は $0$ から $\beta-\alpha$ まで動く。$h=\beta-\alpha$ とおくと
$$\int_{\alpha}^{\beta}a(x-\alpha)^2(x-\beta)\,dx=a\int_{0}^{h}u^2(u-h)\,du=a\left[\frac{u^4}{4}-\frac{h u^3}{3}\right]_0^{h}=a\left(\frac{h^4}{4}-\frac{h^4}{3}\right)=-\frac{a}{12}h^4.$$
よって面積（絶対値）は
$$S=\frac{|a|}{12}(\beta-\alpha)^4.$$

**具体例に適用:** $a=1,\ \alpha=1,\ \beta=-2$ なので $\beta-\alpha=-3$、
$$S=\frac{1}{12}\cdot|-3|^4=\frac{81}{12}=\frac{27}{4}.$$

**検算（直接積分）。** $(x-1)^2(x+2)=x^3-3x+2$ なので
$$S=\int_{-2}^{1}(x^3-3x+2)\,dx=\left[\frac{x^4}{4}-\frac{3x^2}{2}+2x\right]_{-2}^{1}=\left(\frac14-\frac32+2\right)-\bigl(4-6-4\bigr)=\frac34+6=\frac{27}{4}.$$
公式値 $\dfrac{27}{4}$ と一致する。

**美しさ:** 「接する」という条件が代数では「重解 $(x-\alpha)^2$」に翻訳され、3 次曲線の求積が $\dfrac{(\beta-\alpha)^4}{12}$ というたった一つの形に凝縮される。放物線の $\dfrac16$ 公式の 3 次版である。`,
      },
    ],
  },
];
