import type { Problem } from "@/lib/types";

// 数学II「式と証明」— 15 問 (A4/B4/C4/D2/D+1)。
// 既存ショーケース (相加相乗 am-gm) と同じ unit "式と証明" に統合される。
const r = String.raw;

export const expressionsAndProofs: Problem[] = [
  // ============================== A (4) ==============================
  {
    slug: "binomial-coefficient-term",
    title: "二項定理と特定の係数",
    unit: "式と証明",
    difficulty: "A",
    tagline: "一般項 ₙCₖ aⁿ⁻ᵏbᵏ",
    hasGraph: false,
    tags: ["二項定理"],
    statement: r`$(x+2)^5$ の展開における $x^3$ の係数を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 一般項",
        body: r`$(x+2)^5$ の一般項は $\dbinom{5}{k}x^{5-k}2^{k}$。$x^3$ となるのは $5-k=3$、すなわち $k=2$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dbinom{5}{2}\cdot 2^{2}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$x^3$ の項は $\dbinom{5}{2}x^{3}2^{2}=10\cdot4\,x^3=40x^3$。係数は $40$。`,
      },
    ],
  },
  {
    slug: "binomial-with-coefficients",
    title: "係数つきの二項展開",
    unit: "式と証明",
    difficulty: "A",
    tagline: "(2x)ⁿ⁻ᵏ(−3)ᵏ を忘れず",
    hasGraph: false,
    tags: ["二項定理"],
    statement: r`$(2x-3)^6$ の展開における $x^4$ の係数を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 一般項",
        body: r`一般項は $\dbinom{6}{k}(2x)^{6-k}(-3)^{k}$。$x^4$ は $6-k=4$、$k=2$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dbinom{6}{2}\cdot 2^{4}\cdot(-3)^{2}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\dbinom{6}{2}(2x)^{4}(-3)^{2}=15\cdot16x^4\cdot9=2160x^4$。係数は $2160$。`,
      },
    ],
  },
  {
    slug: "partial-fraction-identity",
    title: "恒等式（部分分数）",
    unit: "式と証明",
    difficulty: "A",
    tagline: "分母を払って係数比較",
    hasGraph: false,
    tags: ["恒等式", "部分分数分解"],
    statement: r`等式 $\dfrac{1}{x(x+1)}=\dfrac{a}{x}+\dfrac{b}{x+1}$ が $x$ についての恒等式となるように、定数 $a,b$ を定めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 分母を払う",
        body: r`両辺に $x(x+1)$ を掛けると $1=a(x+1)+bx$。これが恒等式になる条件を係数比較または数値代入で求める。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$x=0$ で $a$、$x=-1$ で $b$ がすぐ出る。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$1=a(x+1)+bx$。$x=0$ より $a=1$、$x=-1$ より $-b=1\Rightarrow b=-1$。
$$\frac{1}{x(x+1)}=\frac{1}{x}-\frac{1}{x+1}.$$`,
      },
    ],
  },
  {
    slug: "am-gm-min-four-over-x",
    title: "相加相乗で最小値",
    unit: "式と証明",
    difficulty: "A",
    tagline: "積が一定なら和は最小をもつ",
    hasGraph: false,
    tags: ["相加相乗平均", "最大最小"],
    statement: r`$x>0$ のとき、$x+\dfrac{4}{x}$ の最小値とそのときの $x$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 積が定数",
        body: r`$x>0,\ \dfrac4x>0$ で積 $x\cdot\dfrac4x=4$ は定数。相加・相乗平均の不等式が使える。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$x+\dfrac4x\ge2\sqrt{x\cdot\dfrac4x}$。等号は $x=\dfrac4x$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`相加・相乗平均の不等式より $x+\dfrac4x\ge2\sqrt{4}=4$。等号は $x=\dfrac4x$ かつ $x>0$、すなわち $x=2$。
よって最小値 $4$（$x=2$）。`,
      },
    ],
  },

  // ============================== B (4) ==============================
  {
    slug: "double-root-divisibility",
    title: "重解で割り切れる条件",
    unit: "式と証明",
    difficulty: "B",
    tagline: "P(1)=0 かつ P′(1)=0",
    hasGraph: false,
    tags: ["恒等式", "因数定理"],
    statement: r`整式 $P(x)=x^3+ax+b$ が $(x-1)^2$ で割り切れるように、定数 $a,b$ を定めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 商をおく",
        body: r`$(x-1)^2$ で割り切れるなら $P(x)=(x-1)^2(x-c)$ と書ける。展開して係数比較する（または $x=1$ が重解である条件を使う）。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$P(x)=(x-1)^2(x-c)=x^3-(c+2)x^2+(2c+1)x-c$。$x^2$ の係数が $0$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$P(x)=(x-1)^2(x-c)=x^3-(c+2)x^2+(2c+1)x-c$。
与式 $x^3+ax+b$ と係数比較すると、$x^2$：$-(c+2)=0\Rightarrow c=-2$。
$x$：$a=2c+1=-3$。定数：$b=-c=2$。よって $a=-3,\ b=2$。`,
      },
    ],
  },
  {
    slug: "prove-am-gm-two",
    title: "相加・相乗平均の不等式の証明",
    unit: "式と証明",
    difficulty: "B",
    tagline: "差を平方で表す",
    hasGraph: false,
    tags: ["相加相乗平均", "不等式の証明"],
    statement: r`$a>0,\ b>0$ のとき $\dfrac{a+b}{2}\ge\sqrt{ab}$ が成り立つことを示し、等号成立条件を述べよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 差を作り平方に",
        body: r`左辺 − 右辺を計算すると、$\sqrt a,\sqrt b$ の差の平方になる。平方は非負だから不等式が出る。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dfrac{a+b}{2}-\sqrt{ab}=\dfrac12(\sqrt a-\sqrt b)^2$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$a,b>0$ より $\sqrt a,\sqrt b$ が定義され、
$$\frac{a+b}{2}-\sqrt{ab}=\frac{a-2\sqrt{ab}+b}{2}=\frac{(\sqrt a-\sqrt b)^2}{2}\ge0.$$
よって $\dfrac{a+b}{2}\ge\sqrt{ab}$。等号は $(\sqrt a-\sqrt b)^2=0$、すなわち $a=b$ のとき。$\blacksquare$`,
      },
    ],
  },
  {
    slug: "product-sum-reciprocal",
    title: "(a+b)(1/a+1/b) ≥ 4",
    unit: "式と証明",
    difficulty: "B",
    tagline: "展開して相加相乗",
    hasGraph: false,
    tags: ["相加相乗平均", "不等式の証明"],
    statement: r`$a>0,\ b>0$ のとき $(a+b)\!\left(\dfrac1a+\dfrac1b\right)\ge4$ を示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 展開すると相互項",
        body: r`展開すると $2+\dfrac ab+\dfrac ba$。$\dfrac ab,\dfrac ba$ は正で積が $1$ なので相加・相乗平均が効く。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dfrac ab+\dfrac ba\ge2\sqrt{\dfrac ab\cdot\dfrac ba}=2$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$(a+b)\!\left(\dfrac1a+\dfrac1b\right)=1+\dfrac ab+\dfrac ba+1=2+\left(\dfrac ab+\dfrac ba\right)$。
$a,b>0$ より $\dfrac ab,\dfrac ba>0$ で、相加・相乗平均より $\dfrac ab+\dfrac ba\ge2$。
よって与式 $\ge2+2=4$。等号は $\dfrac ab=\dfrac ba$、すなわち $a=b$。$\blacksquare$`,
      },
    ],
  },
  {
    slug: "cauchy-schwarz-two",
    title: "コーシー・シュワルツ（2 変数）",
    unit: "式と証明",
    difficulty: "B",
    tagline: "差の平方が橋を架ける",
    hasGraph: false,
    tags: ["不等式の証明", "コーシー・シュワルツの不等式"],
    statement: r`実数 $a,b,x,y$ について $(a^2+b^2)(x^2+y^2)\ge(ax+by)^2$ を示し、等号成立条件を述べよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 左辺 − 右辺を展開",
        body: r`左辺 − 右辺を展開すると、きれいな平方 $(ay-bx)^2$ になる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$(a^2+b^2)(x^2+y^2)-(ax+by)^2=(ay-bx)^2$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$$(a^2+b^2)(x^2+y^2)-(ax+by)^2=a^2y^2-2abxy+b^2x^2=(ay-bx)^2\ge0.$$
よって $(a^2+b^2)(x^2+y^2)\ge(ax+by)^2$。等号は $ay-bx=0$、すなわち $(a,b)$ と $(x,y)$ が平行（$ay=bx$）のとき。$\blacksquare$`,
      },
    ],
  },

  // ============================== C (4) ==============================
  {
    slug: "min-reciprocal-sum-constraint",
    title: "条件つき最小値（1/x + 1/y）",
    unit: "式と証明",
    difficulty: "C",
    tagline: "和が一定なら積に上限",
    hasGraph: false,
    tags: ["相加相乗平均", "最大最小", "場合分け"],
    statement: r`$x>0,\ y>0,\ x+y=1$ のとき、$\dfrac1x+\dfrac1y$ の最小値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 対称式に翻訳する",
        body: r`**戦略の全体像。** 変数は $x,y$ の 2 つだが、束縛条件 $x+y=1$ が 1 本あるので自由度は実質 1。最小化したい量を、対称式（$x+y$ と $xy$）だけで表せないか狙う。

実際、通分すると
$$\frac1x+\frac1y=\frac{y+x}{xy}=\frac{x+y}{xy}=\frac{1}{xy}\qquad(\because\ x+y=1).$$
分子が条件でちょうど $1$ に固定されるので、**目的は $\dfrac1{xy}$ の最小化、すなわち $xy$ の最大化**に化ける。

**メタ思考。** 「和 $x+y$ が一定のとき、積 $xy$ は 2 数が等しい中心 $x=y$ で最大」という対称性が背骨。次のステップ以降で相加・相乗平均（または平方完成）で厳密化する。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 1 変数に落として形を見る",
        body: r`条件から $y=1-x$、定義域は $x>0$ かつ $1-x>0$、すなわち $0<x<1$。すると
$$g(x)=\frac1x+\frac1{1-x}=\frac{(1-x)+x}{x(1-x)}=\frac{1}{x(1-x)}.$$
分母 $x(1-x)$ は $x=\dfrac12$ を軸とする上に凸な放物線で、両端 $x\to0^{+},\ x\to1^{-}$ で $0^{+}$ に近づく。したがって $g(x)\to+\infty$ となり、最小値は内部の $x=\dfrac12$ で実現する**候補**だと目星がつく。次で等号を厳密に詰める。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`和が一定の積には相加・相乗平均：$\sqrt{xy}\le\dfrac{x+y}{2}=\dfrac12$。両辺は非負なので 2 乗して $xy\le\dfrac14$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**方法 1（相加・相乗平均）。** $x,y>0$ より $\sqrt{xy}$ が定義でき、相加・相乗平均の不等式から
$$\sqrt{xy}\le\frac{x+y}{2}=\frac12.$$
両辺は非負なので 2 乗してよく、$xy\le\dfrac14$。さらに $xy>0$ より両辺の逆数をとると不等号の向きが反転して
$$\frac1x+\frac1y=\frac{1}{xy}\ge\frac{1}{1/4}=4.$$
**等号成立の検討。** 相加・相乗平均の等号は $x=y$。条件 $x+y=1$ と合わせて $x=y=\dfrac12$。このとき確かに $\dfrac1x+\dfrac1y=2+2=4$ で、下限 $4$ が実際に達成される。ゆえに**最小値は $4$**（$x=y=\dfrac12$）。

**方法 2（1 変数の平方完成）。** $y=1-x\ (0<x<1)$ として $g(x)=\dfrac{1}{x(1-x)}$。分母を平方完成すると
$$x(1-x)=-\Bigl(x-\tfrac12\Bigr)^2+\frac14\le\frac14,$$
等号は $x=\dfrac12$。$0<x<1$ で分母は正だから $g(x)=\dfrac{1}{x(1-x)}\ge\dfrac{1}{1/4}=4$、等号 $x=\dfrac12$。2 通りのどちらでも同じ結論に至り、**最小値 $4$** が確定する。$\blacksquare$`,
      },
    ],
  },
  {
    slug: "cyclic-fraction-inequality",
    title: "巡回分数の不等式",
    unit: "式と証明",
    difficulty: "C",
    tagline: "3 項の相加相乗",
    hasGraph: false,
    tags: ["相加相乗平均", "不等式の証明"],
    statement: r`$a>0,\ b>0,\ c>0$ のとき $\dfrac ab+\dfrac bc+\dfrac ca\ge3$ を示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — どの道具が刺さるか",
        body: r`左辺の 3 項 $\dfrac ab,\dfrac bc,\dfrac ca$ はすべて正で、**積が**
$$\frac ab\cdot\frac bc\cdot\frac ca=\frac{abc}{abc}=1$$
とちょうど $1$ になる。和の下限を積だけで押さえる道具＝**3 数の相加・相乗平均**
$$\frac{p+q+r}{3}\ge\sqrt[3]{pqr}\qquad(p,q,r>0)$$
の出番。$p=\dfrac ab,\ q=\dfrac bc,\ r=\dfrac ca$ と置く。

**よくある罠。** 2 数版「$\dfrac ab+\dfrac ba\ge2$」を使いたくなるが、ここに現れるのは $\dfrac ab,\dfrac bc,\dfrac ca$ で互いに逆数の対になっていない。だから 2 数版の単純なペアリングは効かず、3 数版が本筋。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 等号の位置を当てる",
        body: r`対称性から等号は「3 項がすべて等しい」とき、すなわち $\dfrac ab=\dfrac bc=\dfrac ca$。この連比を $t$ とおくと $a=tb,\ b=tc,\ c=ta$ より $a=t^3a$。$a>0$ だから $t^3=1$、実数で $t=1$。ゆえに等号は $a=b=c$ のときに限ると読める。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\dfrac ab\cdot\dfrac bc\cdot\dfrac ca=1$ を 3 数の相加・相乗平均に入れる。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\dfrac ab,\dfrac bc,\dfrac ca$ はいずれも正で、その積は
$$\frac ab\cdot\frac bc\cdot\frac ca=1.$$
3 数の相加・相乗平均の不等式より
$$\frac13\!\left(\frac ab+\frac bc+\frac ca\right)\ge\sqrt[3]{\frac ab\cdot\frac bc\cdot\frac ca}=\sqrt[3]{1}=1.$$
両辺を 3 倍して
$$\frac ab+\frac bc+\frac ca\ge3.$$
**等号成立。** 3 数の相加・相乗平均の等号条件は 3 数がすべて等しいこと、すなわち $\dfrac ab=\dfrac bc=\dfrac ca$。前ステップの通りこれは $a=b=c$ と同値。実際 $a=b=c$ のとき左辺は $1+1+1=3$ で等号が成り立つ。よって不等式と等号条件がともに示された。$\blacksquare$

**補足（3 数 AM-GM の根拠）。** $p+q+r-3\sqrt[3]{pqr}\ge0$ は、$x^3+y^3+z^3-3xyz=(x+y+z)\cdot\dfrac12\bigl[(x-y)^2+(y-z)^2+(z-x)^2\bigr]\ge0$（$x=\sqrt[3]{p}$ 等）から従う。D+ の問題で扱うこの恒等式が、ここでも背後で効いている。`,
      },
    ],
  },
  {
    slug: "sum-zero-cubes",
    title: "a+b+c=0 のときの 3 乗和",
    unit: "式と証明",
    difficulty: "C",
    tagline: "対称式の因数分解",
    hasGraph: false,
    tags: ["対称式", "因数分解", "恒等式"],
    statement: r`$a+b+c=0$ のとき、$a^3+b^3+c^3=3abc$ が成り立つことを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 二つの道を用意する",
        body: r`(1) 有名な因数分解恒等式
$$a^3+b^3+c^3-3abc=(a+b+c)(a^2+b^2+c^2-ab-bc-ca)$$
を使えば、$a+b+c=0$ を代入して一瞬で終わる。(2) 条件を $c=-(a+b)$ と解いて直接代入し、力ずくで展開しても確かめられる。両方を押さえれば、恒等式を忘れても再現できる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 恒等式を自分で作る",
        body: r`$a+b+c=0$ なら $c=-(a+b)$。すると
$$c^3=-(a+b)^3=-\bigl(a^3+3a^2b+3ab^2+b^3\bigr)$$
なので
$$a^3+b^3+c^3=a^3+b^3-\bigl(a^3+3a^2b+3ab^2+b^3\bigr)=-3a^2b-3ab^2=-3ab(a+b).$$
一方 $3abc=3ab\cdot\bigl(-(a+b)\bigr)=-3ab(a+b)$。両者は一致する。恒等式に頼らずとも結論が出た。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`恒等式を使う道なら、右辺の第 1 因数が $a+b+c=0$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**方法 1（恒等式）。** 一般に
$$a^3+b^3+c^3-3abc=(a+b+c)(a^2+b^2+c^2-ab-bc-ca)$$
が成り立つ（右辺を展開すれば左辺に戻る）。ここに条件 $a+b+c=0$ を代入すると右辺の第 1 因数が $0$ になり、
$$a^3+b^3+c^3-3abc=0,\qquad\therefore\ a^3+b^3+c^3=3abc.$$

**方法 2（直接代入）。** $c=-(a+b)$ を代入して
$$a^3+b^3+c^3=a^3+b^3-(a+b)^3=a^3+b^3-\bigl(a^3+3a^2b+3ab^2+b^3\bigr)=-3ab(a+b),$$
$$3abc=3ab\bigl(-(a+b)\bigr)=-3ab(a+b).$$
ゆえに $a^3+b^3+c^3=3abc$。いずれの道でも同じ等式に到達する。$\blacksquare$

**注意。** 本問は不等式ではなく恒等式なので、$a,b,c$ の符号の仮定は不要（実数であれば何でもよい）。`,
      },
    ],
  },
  {
    slug: "binomial-sum-identities",
    title: "二項係数の和の公式",
    unit: "式と証明",
    difficulty: "C",
    tagline: "x に値を代入する",
    hasGraph: false,
    tags: ["二項定理", "二項係数"],
    statement: r`二項定理 $(1+x)^n=\displaystyle\sum_{k=0}^{n}\dbinom{n}{k}x^k$ を用いて、$\displaystyle\sum_{k=0}^{n}\dbinom{n}{k}=2^n$ および $\displaystyle\sum_{k=0}^{n}(-1)^k\dbinom{n}{k}=0$（$n\ge1$）を示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 恒等式には値を代入してよい",
        body: r`$(1+x)^n=\displaystyle\sum_{k=0}^{n}\dbinom nk x^k$ は変数 $x$ について**恒等的に**成り立つ。恒等式なら任意の値を代入してよく、左辺は数になり、右辺は欲しい和の形になる。和の形をちょうど作り出す $x$ を選ぶのがコツ：係数和なら $x=1$、符号交代和なら $x=-1$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 小さな n で確かめる",
        body: r`$n=3$ のとき係数は $1,3,3,1$。和は $1+3+3+1=8=2^3$、交代和は $1-3+3-1=0$。これはパスカルの三角形の「各行の総和が $2^n$、交互符号和が $0$」という事実と一致する。具体例で公式の姿を先に掴んでおく。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$(1+1)^n$ と $(1-1)^n$ を作る。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**係数和。** 恒等式 $(1+x)^n=\displaystyle\sum_{k=0}^{n}\dbinom nk x^k$ に $x=1$ を代入する。左辺は $(1+1)^n=2^n$、右辺は $\displaystyle\sum_{k=0}^{n}\dbinom nk\cdot1^k=\sum_{k=0}^{n}\dbinom nk$。ゆえに
$$\sum_{k=0}^{n}\dbinom nk=2^n.$$
**交代和。** 同じ恒等式に $x=-1$ を代入する。左辺は $(1-1)^n=0^n$、右辺は $\displaystyle\sum_{k=0}^{n}\dbinom nk(-1)^k$。$n\ge1$ では $0^n=0$ なので
$$\sum_{k=0}^{n}(-1)^k\dbinom nk=0\qquad(n\ge1).$$
**$n\ge1$ という条件の根拠。** $n=0$ のときは項が $\dbinom00=1$ の 1 つだけで、左辺 $0^0=1$ と整合して和は $1$。交代和が $0$ になるのは $n\ge1$ に限る——ここを曖昧にしないのが厳密さ。

**意味づけ。** 係数和 $2^n$ は「$n$ 元集合の部分集合の総数」、交代和 $0$ は「偶数個の要素をもつ部分集合と奇数個のそれがちょうど同数」を表す（$n\ge1$）。代数の恒等式が組合せの事実をそのまま語っている。$\blacksquare$`,
      },
    ],
  },

  // ============================== D (2) ==============================
  {
    slug: "three-var-product-sum-nine",
    title: "(a+b+c)(1/a+1/b+1/c) ≥ 9",
    unit: "式と証明",
    difficulty: "D",
    tagline: "展開して 6 項を相加相乗",
    hasGraph: false,
    tags: ["相加相乗平均", "不等式の証明"],
    statement: r`$a>0,\ b>0,\ c>0$ のとき $(a+b+c)\!\left(\dfrac1a+\dfrac1b+\dfrac1c\right)\ge9$ を示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 展開して 9 の源を探す",
        body: r`まず素直に展開し、$9$ という数がどこから生まれるかを見る。
$$(a+b+c)\!\left(\frac1a+\frac1b+\frac1c\right)=3+\left(\frac ab+\frac ba\right)+\left(\frac bc+\frac cb\right)+\left(\frac ca+\frac ac\right).$$
定数 $3$ と、**互いに逆数の和**が 3 組。各組に 2 数の相加・相乗平均 $t+\dfrac1t\ge2$（$t>0$）が刺さる。$3+2+2+2=9$ という内訳が見えてくる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 別ルート（コーシー・シュワルツ）",
        body: r`ベクトル $(\sqrt a,\sqrt b,\sqrt c)$ と $\left(\dfrac1{\sqrt a},\dfrac1{\sqrt b},\dfrac1{\sqrt c}\right)$ にコーシー・シュワルツを使うと
$$\left(\sum a\right)\!\left(\sum\frac1a\right)\ge\left(\sum\sqrt a\cdot\frac1{\sqrt a}\right)^2=(1+1+1)^2=9.$$
同じ $9$ が、別の不等式からも自然に出る。等号条件が方法 1 と一致することは解答で確認する。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$t+\dfrac1t-2=\dfrac{(t-1)^2}{t}\ge0$（$t>0$）。3 組すべてに適用する。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**方法 1（逆数ペアに相加・相乗平均）。** $a,b,c>0$ より各分数は正。展開すると
$$(a+b+c)\!\left(\frac1a+\frac1b+\frac1c\right)=3+\left(\frac ab+\frac ba\right)+\left(\frac bc+\frac cb\right)+\left(\frac ca+\frac ac\right).$$
正数 $t$ に対し $t+\dfrac1t\ge2$（$\because\ t+\dfrac1t-2=\dfrac{(t-1)^2}{t}\ge0$）だから、3 組それぞれ $\ge2$。ゆえに
$$(a+b+c)\!\left(\frac1a+\frac1b+\frac1c\right)\ge3+2+2+2=9.$$
**等号成立。** 各組の等号は $\dfrac ab=\dfrac ba,\ \dfrac bc=\dfrac cb,\ \dfrac ca=\dfrac ac$、すなわち $a=b,\ b=c,\ c=a$、まとめて $a=b=c$。このとき左辺は $(3a)\cdot\dfrac3a=9$ で確かに等号。

**方法 2（コーシー・シュワルツ）。** 前ステップの通り $\left(\sum a\right)\!\left(\sum\dfrac1a\right)\ge\left(\sum\sqrt a\cdot\dfrac1{\sqrt a}\right)^2=9$。等号は 2 つのベクトルが平行、すなわち $\dfrac{\sqrt a}{1/\sqrt a}=\dfrac{\sqrt b}{1/\sqrt b}=\dfrac{\sqrt c}{1/\sqrt c}$、つまり $a=b=c$。両者の等号条件が一致するのも美しい。以上より下限は $9$。$\blacksquare$`,
      },
    ],
  },
  {
    slug: "sum-squares-lower-bound",
    title: "a+b+c=1 のときの 2 乗和の最小",
    unit: "式と証明",
    difficulty: "D",
    tagline: "コーシーか分散で",
    hasGraph: false,
    tags: ["不等式の証明", "コーシー・シュワルツの不等式", "最大最小"],
    statement: r`実数 $a,b,c$ が $a+b+c=1$ をみたすとき、$a^2+b^2+c^2$ の最小値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 下限を作る不等式を選ぶ",
        body: r`線形条件 $a+b+c=1$ のもとで 2 乗和 $a^2+b^2+c^2$ の最小を探す。3 つの常套手段がある：(i) コーシー・シュワルツ、(ii) 凸関数のイェンゼン、(iii) 分散の非負性。どれも「平均からのばらつきが $0$ のとき最小」という同じ真実を別の言葉で語っている。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 凸性で「なぜ最小か」を見る",
        body: r`$f(x)=x^2$ は下に凸。下のラボで、弦（2 点を結ぶ線分）が常にグラフの上にあり、$f$ の値が弦の値を超えないこと＝イェンゼンの不等式
$$f\!\left(\frac{a+b+c}{3}\right)\le\frac{f(a)+f(b)+f(c)}{3}$$
を確かめよう。左辺は $f\!\left(\dfrac13\right)=\dfrac19$、右辺は $\dfrac{a^2+b^2+c^2}{3}$。ここから $a^2+b^2+c^2\ge\dfrac13$ が読み取れる。

@@lab:convexity-jensen@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$3(a^2+b^2+c^2)\ge(a+b+c)^2=1$、あるいは「2 乗和の平均 $\ge$ 平均の 2 乗」。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**方法 1（コーシー・シュワルツ）。** ベクトル $(1,1,1)$ と $(a,b,c)$ に対し
$$(1^2+1^2+1^2)(a^2+b^2+c^2)\ge(1\cdot a+1\cdot b+1\cdot c)^2=(a+b+c)^2=1.$$
よって $a^2+b^2+c^2\ge\dfrac13$。等号は 2 つのベクトルが平行、すなわち $\dfrac a1=\dfrac b1=\dfrac c1$、つまり $a=b=c$。条件と合わせ $a=b=c=\dfrac13$。

**方法 2（分散 ≥ 0 ＝ イェンゼンの等価形）。** 平均 $m=\dfrac{a+b+c}{3}=\dfrac13$ とおく。恒等式
$$\frac{a^2+b^2+c^2}{3}-m^2=\frac{(a-m)^2+(b-m)^2+(c-m)^2}{3}\ge0$$
（左辺は分散、右辺は偏差平方の平均）から $\dfrac{a^2+b^2+c^2}{3}\ge m^2=\dfrac19$、すなわち $a^2+b^2+c^2\ge\dfrac13$。等号は全偏差が $0$、つまり $a=b=c=\dfrac13$。

**結論。** いずれの方法でも下限 $\dfrac13$ は $a=b=c=\dfrac13$ で達成され、これは条件 $a+b+c=1$ を満たす実在の点。よって**最小値は $\dfrac13$**。$\blacksquare$

**メタ。** 「2 乗和の最小＝平均まわりのばらつき最小」。コーシー・シュワルツ、凸性（イェンゼン）、分散の非負性は、同じ現象の三つの顔である。`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "sos-cube-sum-inequality",
    title: "a³+b³+c³ ≥ 3abc の証明",
    unit: "式と証明",
    difficulty: "D_PLUS",
    tagline: "平方和に分解する",
    hasGraph: false,
    tags: ["不等式の証明", "因数分解", "対称式", "相加相乗平均"],
    statement: r`$a>0,\ b>0,\ c>0$ のとき $a^3+b^3+c^3\ge3abc$ が成り立つことを示し、等号成立条件を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 差を「明らかに非負」へ割る",
        body: r`目標は $a^3+b^3+c^3-3abc\ge0$ を、誰が見ても非負と分かる形へ変形すること。鍵は因数分解の恒等式
$$a^3+b^3+c^3-3abc=(a+b+c)(a^2+b^2+c^2-ab-bc-ca).$$
第 1 因数は $a,b,c>0$ より正。残る急所は**第 2 因数が非負**であること——これを平方の和に書き換えて示す。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 第 2 因数を平方和に直す",
        body: r`次の等式を展開で確かめる：
$$a^2+b^2+c^2-ab-bc-ca=\frac12\bigl[(a-b)^2+(b-c)^2+(c-a)^2\bigr].$$
右辺を開くと $\dfrac12\bigl[2a^2+2b^2+2c^2-2ab-2bc-2ca\bigr]=a^2+b^2+c^2-ab-bc-ca$ となり左辺に一致。平方の和だから常に $0$ 以上で、等号は $a=b=c$。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$a^3+b^3+c^3-3abc=(a+b+c)(a^2+b^2+c^2-ab-bc-ca)$ を出発点に。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`恒等式
$$a^3+b^3+c^3-3abc=(a+b+c)\bigl(a^2+b^2+c^2-ab-bc-ca\bigr)$$
を出発点にする。第 2 因数は前ステップより
$$a^2+b^2+c^2-ab-bc-ca=\frac12\bigl[(a-b)^2+(b-c)^2+(c-a)^2\bigr]\ge0.$$
$a,b,c>0$ より $a+b+c>0$。したがって
$$a^3+b^3+c^3-3abc=(\text{正})\times(\text{非負})\ge0,\qquad\therefore\ a^3+b^3+c^3\ge3abc.$$
**等号成立。** 積が $0$ になるのは第 2 因数が $0$ のとき（第 1 因数は正だから）。それは 3 つの平方がすべて $0$、すなわち $a=b=c$。

**相加・相乗平均との同値。** $x=a^3,\ y=b^3,\ z=c^3$ と置けば、いま示したのは $\dfrac{x+y+z}{3}\ge\sqrt[3]{xyz}$（3 数の相加・相乗平均）そのもの。つまり本問は AM-GM の代数的な心臓部を、平方和への分解で**証明している**ことになる。$\blacksquare$

**美しさ:** 立方の和と積という非対称に見える量の差が、$(a+b+c)$ と「差の平方和」という二つの非負パーツの積へきれいに割れる。この一行の因数分解に、3 文字 AM-GM の全重量が乗っている。`,
      },
    ],
  },
];
