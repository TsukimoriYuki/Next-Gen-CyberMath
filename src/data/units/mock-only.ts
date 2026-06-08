import type { Problem } from "@/lib/types";

// 模試専用プール（初見殺し）。isMockOnly:true により単元一覧・タグ検索・トップから
// 隠蔽され、模試の C 以上の出題に強制ブレンドされる／履歴の復習からのみ到達する。
// 通常問題と同じく、論理を飛躍させない厳密な段階的解説を備える。
const r = String.raw;

export const mockOnlyProblems: Problem[] = [
  // ============================== C ==============================
  {
    slug: "mock-weighted-am-gm-min",
    title: "【初見】重みつき最小値（2x+y=1）",
    unit: "式と証明",
    difficulty: "C",
    tagline: "係数の重みを、コーシーで吸収する",
    hasGraph: false,
    isMockOnly: true,
    tags: ["相加相乗平均", "コーシー・シュワルツの不等式", "最大最小"],
    statement: r`$x>0,\ y>0$ が $2x+y=1$ をみたすとき、$\dfrac1x+\dfrac2y$ の最小値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 束縛 1 を掛けて積を作る",
        body: r`束縛 $2x+y=1$ を「$1$ を掛ける」道具とみる。$\dfrac1x+\dfrac2y=\left(\dfrac1x+\dfrac2y\right)(2x+y)$ と書き直すと、$x,y$ が分母分子で打ち消し合い、定数と逆数ペアが現れる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 展開して相互項を見る",
        body: r`$\left(\dfrac1x+\dfrac2y\right)(2x+y)=2+\dfrac yx+\dfrac{4x}{y}+2=4+\left(\dfrac yx+\dfrac{4x}{y}\right)$。正数とその逆数型の和 $\dfrac yx+\dfrac{4x}{y}$ は相加・相乗平均で下から押さえられる、と方針が立つ。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\dfrac yx+\dfrac{4x}{y}\ge2\sqrt{\dfrac yx\cdot\dfrac{4x}{y}}=2\sqrt4=4$。または直接コーシー・シュワルツ。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**相加・相乗平均による。** $2x+y=1$ を掛けて
$$\frac1x+\frac2y=\left(\frac1x+\frac2y\right)(2x+y)=2+\frac yx+\frac{4x}{y}+2=4+\left(\frac yx+\frac{4x}{y}\right).$$
$x,y>0$ より $\dfrac yx,\dfrac{4x}{y}>0$ で、相加・相乗平均の不等式から
$$\frac yx+\frac{4x}{y}\ge2\sqrt{\frac yx\cdot\frac{4x}{y}}=2\sqrt{4}=4.$$
ゆえに $\dfrac1x+\dfrac2y\ge4+4=8$。

**等号成立。** $\dfrac yx=\dfrac{4x}{y}$ すなわち $y^2=4x^2$、$x,y>0$ より $y=2x$。束縛 $2x+y=1$ と合わせて $2x+2x=1$、$x=\dfrac14,\ y=\dfrac12$。このとき $\dfrac1x+\dfrac2y=4+4=8$。よって**最小値は $8$**。

**別解（コーシー・シュワルツ）。** $\left(\dfrac1x+\dfrac2y\right)(2x+y)\ge\left(\sqrt{\dfrac1x\cdot2x}+\sqrt{\dfrac2y\cdot y}\right)^2=(\sqrt2+\sqrt2)^2=8$。等号は $\dfrac{1/x}{2x}=\dfrac{2/y}{y}$、すなわち $y=2x$ で一致。

**メタ。** 「束縛 $=1$ を掛けて、消える変数比 $\dfrac yx,\dfrac xy$ を作る」のが重みつき最小の常套手段。重み（係数 $2$）はコーシーの内積に吸収される。`,
      },
    ],
  },

  // ============================== D ==============================
  {
    slug: "mock-sophie-germain-prime",
    title: "【初見】n⁴+4 が素数となる n",
    unit: "整数の性質",
    difficulty: "D",
    tagline: "+4 は、隠れた因数分解の合図",
    hasGraph: false,
    isMockOnly: true,
    tags: ["因数分解", "素数", "背理法"],
    statement: r`自然数 $n$ に対し、$n^4+4$ が素数となる $n$ をすべて求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 4 乗 + 定数は因数分解を疑う",
        body: r`$n^4+4$ は一見素数判定が難しいが、「平方の和は完全平方を足して引くと差の積になる」という Sophie Germain の恒等式 $a^4+4b^2=(a^2-2ab+2b^2)(a^2+2ab+2b^2)$ が使える。$b=1$ がまさに本問。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 小さく試して因数を見る",
        body: r`$n=1$：$1+4=5$（素数）。$n=2$：$16+4=20=4\cdot5$。$n=3$：$81+4=85=5\cdot17$。$n=4$：$256+4=260$。$n\ge2$ で必ず合成数になりそう——因数分解 $n^4+4=(n^2-2n+2)(n^2+2n+2)$ を疑う。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 完全平方を作って差の積に",
        body: r`$n^4+4=(n^4+4n^2+4)-4n^2=(n^2+2)^2-(2n)^2=(n^2-2n+2)(n^2+2n+2)$。素数は「$1\times$ 自分」しか積に書けない。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$4n^2$ を足して引くと完全平方差になる：
$$n^4+4=(n^4+4n^2+4)-4n^2=(n^2+2)^2-(2n)^2=(n^2-2n+2)(n^2+2n+2).$$
ここで $n^2+2n+2=(n+1)^2+1\ge2>1$ は常に $1$ より大きい。一方
$$n^2-2n+2=(n-1)^2+1\ge1,$$
で、$=1$ となるのは $n=1$ のときに限る。

**$n\ge2$ のとき**：$n^2-2n+2\ge2$ かつ $n^2+2n+2\ge2$ で、$n^4+4$ は $1$ より大きい 2 数の積だから**合成数**（素数でない）。

**$n=1$ のとき**：$n^2-2n+2=1$ なので $n^4+4=1\cdot5=5$ で**素数**。

よって $n^4+4$ が素数となるのは $n=1$ のときのみ（そのとき値は $5$）。$\blacksquare$

**メタ。** 「$a^4+4b^4$ 型は Sophie Germain 恒等式で割れる」は整数論の有名な飛び道具。素数性の問題は、まず因数分解で“$1$ になり得るのはどの因数か”を詰めるのが定石。`,
      },
    ],
  },
  {
    slug: "mock-perp-tangents-directrix",
    title: "【初見】直交する2接線の交点の軌跡",
    unit: "微分法",
    difficulty: "D",
    tagline: "直角に交わる接線は、準線の上で出会う",
    hasGraph: false,
    isMockOnly: true,
    tags: ["接線", "軌跡", "2次関数"],
    statement: r`放物線 $y=x^2$ 上の異なる 2 点で引いた接線が互いに直交するとき、その 2 接線の交点 $\mathrm P$ が描く軌跡を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 接点をパラメータに",
        body: r`接点を $(a,a^2),(b,b^2)$ とおき、各接線の式と「直交（傾きの積 $-1$）」を $a,b$ の条件に翻訳する。交点 $\mathrm P$ の座標を $a,b$ で表し、直交条件を代入して軌跡を出す。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 接線の傾きと直交条件",
        body: r`$y=x^2$ の $(t,t^2)$ での接線は $y=2tx-t^2$（傾き $2t$）。2 接線の傾きは $2a,2b$。直交は $2a\cdot2b=-1$、すなわち $ab=-\dfrac14$。この一定値が軌跡の鍵になりそう、と当たりをつける。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 交点を a,b で表す",
        body: r`2 接線 $y=2ax-a^2,\ y=2bx-b^2$ を連立。$2ax-a^2=2bx-b^2$ より $x=\dfrac{a+b}{2}$、$y=ab$。直交条件 $ab=-\dfrac14$ を使う。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`接点を $(a,a^2),(b,b^2)\ (a\neq b)$ とする。$(t,t^2)$ での接線は $y'=2x$ より $y=2tx-t^2$。よって 2 接線は
$$y=2ax-a^2,\qquad y=2bx-b^2.$$
**直交条件**：傾きの積 $2a\cdot2b=-1$、すなわち
$$ab=-\frac14.$$
**交点 $\mathrm P$**：2 式を等置して $2ax-a^2=2bx-b^2\Rightarrow 2(a-b)x=a^2-b^2=(a-b)(a+b)$。$a\neq b$ より
$$x=\frac{a+b}{2}.$$
これを一方に代入すると
$$y=2a\cdot\frac{a+b}{2}-a^2=a(a+b)-a^2=ab.$$
直交条件 $ab=-\dfrac14$ を入れて $y=-\dfrac14$（$x$ は $\dfrac{a+b}{2}$ で任意の実数を取りうる）。よって軌跡は**直線 $y=-\dfrac14$**（放物線 $y=x^2$ の準線）。

**メタ。** 放物線の「直交する 2 接線の交点は準線上」という美しい事実。$y=x^2$ の準線は $y=-\dfrac14$ で、結論と一致する。接点パラメータ $a,b$ を立て、交点を基本対称式 $a+b,\ ab$ で表すと、直交条件 $ab=$ 一定がそのまま $y$ 座標一定に化ける。`,
      },
    ],
  },
];
