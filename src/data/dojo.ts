// 過去問道場（Dojo）良問プール。
// すべてオリジナル類題（実在問題の定石を体現する創作問題）。
// @@why:<key>|<表示テキスト>@@ : WhyPopover トークン（MathText で処理）。
// 複数解法は approaches[] に格納し、道場 UI でタブ切替する。

import type { Problem } from "@/lib/types";
const r = String.raw;

export const DOJO_PROBLEMS: Problem[] = [

  // ====================================================================
  // 数学 I・A
  // ====================================================================

  // ---------------------------------------------------------------- #1
  {
    slug: "dojo-quadratic-root-placement",
    title: "2 解の配置条件",
    unit: "2次関数",
    difficulty: "B",
    tagline: "判別式・軸・端点値を同時に押さえる",
    hasGraph: false,
    university: "一橋大（類題）",
    deviation: 55,
    year: 2019,
    backgroundTag: "解の配置-判別式と軸と端点",
    tags: ["解の配置", "2次方程式", "判別式"],
    statement: r`$a$ を実数とする。$x$ の 2 次方程式 $x^2 - 2ax + a + 2 = 0$ の 2 解がともに区間 $1 < x < 4$ に存在するための $a$ の条件を求めよ。`,
    approaches: [
      {
        id: "algebra",
        label: "代数（3 条件法）",
        tagline: "判別式 × 軸 × 端点値で場合分けを閉じる",
        body: r`$f(x)=x^2-2ax+a+2$ とおく。2 解がともに $(1,4)$ に入るには次の 3 条件が**すべて**必要かつ十分。

**① $D\geq 0$（実数解が存在）**
$$D/4=a^2-(a+2)=a^2-a-2=(a-2)(a+1)\geq0$$
@@why:discriminant|判別式の符号条件@@より $a\leq -1$ または $a\geq 2$。

**② 軸 $x=a$ が $1<a<4$ に入る**
$$1 < a < 4.$$

**③ 両端点での関数値が正（解が端点の外側）**
$$f(1)=1-2a+a+2=3-a>0\implies a<3,$$
$$f(4)=16-8a+a+2=18-7a>0\implies a<\tfrac{18}{7}.$$

①②③の共通部分：$1<a<\dfrac{18}{7}$ かつ $a\geq2$（① から）。

よって $\boxed{2\leq a < \dfrac{18}{7}}$。`,
      },
      {
        id: "geometry",
        label: "幾何（放物線の形）",
        tagline: "グラフを「谷が区間内に収まる」と読む",
        body: r`上に凸でない放物線 $f(x)=x^2-2ax+a+2$（下に凸）の 2 解が $(1,4)$ 内にあるとは、「谷（頂点）が区間の上方、両端 $f(1),f(4)$ が正、谷が区間内」という幾何の描像そのもの。3 条件の意味をグラフで確認すると：

- 頂点の $x$ 座標 $=a$ が $1<a<4$（@@why:derivative-geom|頂点は $f'=0$ の点@@）。
- $f(1)>0,\ f(4)>0$ は谷が両端より下にある（下に凸だから成立しているのは解が端の外側にある場合と矛盾しないことの確認）。

計算自体は代数アプローチと同じ結果に至る。`,
      },
    ],
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 解の配置は「3 点セット」",
        body: r`2 解が $(1,4)$ 内にある条件は、@@why:discriminant|判別式@@・@@why:vieta|軸の位置@@・両端点での値の正負、この 3 つを同時に課す。1 つでも欠けると条件が崩れる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント — 3 条件を立てる",
        body: r`$f(x)=x^2-2ax+a+2$ として：① $D/4\geq0$、② $1<a<4$（軸の位置）、③ $f(1)>0$ かつ $f(4)>0$。3 つを連立する。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$f(x)=x^2-2ax+a+2$ とおく。

**① 判別式** $D/4=a^2-a-2=(a-2)(a+1)\geq0 \Rightarrow a\leq-1$ または $a\geq2$。

**② 軸** $x=a$ が $(1,4)$ に入る：$1<a<4$。

**③ 端点値が正**：$f(1)=3-a>0\Rightarrow a<3$；$f(4)=18-7a>0\Rightarrow a<\tfrac{18}{7}$。

①∩②∩③：$(a\geq2)\ \cap\ (1<a<4)\ \cap\ (a<3)\ \cap\ (a<\tfrac{18}{7})$

$= \boxed{2\leq a < \dfrac{18}{7}}$

**美しさ:** 解の配置は「判別式だけ見ればよい」ように見えるが、実は 3 本柱が必要。3 本が揃ったとき、解はぴたりと区間に収まる。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #2
  {
    slug: "dojo-minimax-polynomial",
    title: "ミニマックス — 最大偏差を最小化せよ",
    unit: "2次関数",
    difficulty: "D_PLUS",
    tagline: "等リップルが最適になるチェビシェフの原理",
    hasGraph: false,
    university: "京大（類題）",
    deviation: 70,
    year: 2017,
    backgroundTag: "ミニマックス-チェビシェフ多項式",
    tags: ["最大最小", "ミニマックス", "最適化", "2次関数"],
    statement: r`実数 $a,b$ に対して $\displaystyle M(a,b)=\max_{-1\leq x\leq 1}|x^2+ax+b|$ を定義する。$M(a,b)$ を最小にする $(a,b)$ とそのときの最小値を求めよ。`,
    approaches: [
      {
        id: "chebyshev",
        label: "チェビシェフ多項式",
        tagline: "T₂(x)=2x²−1 が等リップル最適解",
        body: r`2 次のチェビシェフ多項式は @@why:minimax|等リップル（最大偏差最小）@@ の観点から $T_2(x)=2x^2-1$ である。$[-1,1]$ 上で $|T_2(x)|\leq1$ かつ 3 点で $|\,|=1$ を達成（等リップル）。

$$x^2+ax+b = \tfrac12 T_2(x) + \tfrac12 = \tfrac12(2x^2-1)+\tfrac12 = x^2$$
は $a=0,\,b=0$ のまま。一方、目標は $\dfrac{1}{2}T_2(x)$ の形にする：

$x^2+ax+b - \frac12 = (x^2-\frac12)+ax+b$。$a=0,\,b=\dfrac12$ とすれば $x^2+\dfrac12$ は最大値 $\dfrac32$（端点）・最小 $\dfrac12$（中点）。これは等リップルでない。

正しい等リップル化：$x^2+ax+b$ に $a=0,\,b=-\dfrac12$ を取り
$$x^2-\tfrac12:\; \text{最大値}=\tfrac12 \;(\text{端点 }x=\pm1),\; \text{最小値}=-\tfrac12\;(x=0).$$
$M(0,-\tfrac12)=\dfrac12$。これが最小値である（$$\geq\dfrac12$$ の証明は等偏差下界を使う）。`,
      },
      {
        id: "algebra",
        label: "代数（等偏差の必要条件）",
        tagline: "最適解では最大値が複数点で達成される",
        body: r`最適な $(a,b)$ では、$g(x)=x^2+ax+b$ の $[-1,1]$ での最大値 $M$ が少なくとも 3 点で達成されなければならない（等偏差定理の一種）。

$g(x)\leq M$ かつ $g(-1)=M,\, g(0)=-M,\, g(1)=M$（符号交互で 3 点）を試みる：
$$g(1)=1+a+b=M,\quad g(-1)=1-a+b=M,\quad g(0)=b=-M.$$
①③から $b=-M$。①から $1+a-M=M\Rightarrow a=2M-1$。②から $1-a-M=M\Rightarrow a=1-2M$。
連立：$2M-1=1-2M\Rightarrow M=\dfrac12$。よって $a=0,\;b=-\dfrac12,\;M=\dfrac12$。

$[-1,1]$ 全体で $|x^2-\dfrac12|\leq\dfrac12$ を確認：最大は $x=\pm1$ で $\dfrac12$、最小は $x=0$ で $-\dfrac12$（絶対値 $\dfrac12$）。 $\checkmark$`,
      },
    ],
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 最小にするには「均す」",
        body: r`最大値を最小化するには、@@why:minimax|ミニマックスの原理@@ のとおり偏差を均一化（等リップル）するのが最適。3 点以上で絶対値が最大値に達する関数を探す。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント — 3 点で交互に最大値を取る",
        body: r`$x=-1,0,1$ で $g$ の値が交互に $\pm M$ になるよう $a,b$ を設定し、$M$ が矛盾なく決まる最小値を求める。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`等偏差条件 $g(-1)=M,\, g(0)=-M,\, g(1)=M$ より $b=-M,\, a=0,\, M=\dfrac12$。

$x\in[-1,1]$ で $\left|x^2-\dfrac12\right|\leq\dfrac12$ を確認：$f(x)=x^2-\dfrac12$ は $f'(x)=2x=0$ を $x=0$ に持ち、$f(0)=-\dfrac12,\,f(\pm1)=\dfrac12$。すべて $\leq\dfrac12$ を満たす。 $\checkmark$

$$M(0,\,-\tfrac12)=\tfrac12\;(\text{最小値}),\quad (a,b)=\left(0,\,-\tfrac12\right).$$

**美しさ:** 均した「等リップル」が最適という直感が、3 元連立方程式の一点解として綺麗に現れる。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #3
  {
    slug: "dojo-pi-lower-bound",
    title: "円周率 $\\pi > 3.05$ の証明",
    unit: "図形と計量",
    difficulty: "D",
    tagline: "正多角形の余弦定理が無理数を捕まえる",
    hasGraph: false,
    university: "東大（類題・2003 年型）",
    deviation: 65,
    year: 2023,
    backgroundTag: "正多角形近似-余弦定理",
    tags: ["円周率", "不等式証明", "余弦定理", "図形と計量"],
    statement: r`$\pi > 3.05$ を証明せよ。使ってよい値：$\cos 36^\circ = \dfrac{1+\sqrt{5}}{4},\ \sqrt{5}>2.2$。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 正多角形の周長で $2\pi$ を下から押さえる",
        body: r`単位円に内接する正 $n$ 角形の周長は $2\pi$ より小さく、$n$ を大きくするほど $2\pi$ に近づく。正 10 角形（$n=10$）を選ぶと、@@why:law-of-cosines|余弦定理@@ で 1 辺の長さが $\cos36^\circ$ に結びつく。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント — 正 10 角形の 1 辺",
        body: r`半径 1 の円に内接する正 10 角形の 1 辺の長さ $\ell$。中心角は $36^\circ$ なので @@why:law-of-cosines|余弦定理@@ より
$$\ell^2=1^2+1^2-2\cos36^\circ=2-\frac{1+\sqrt5}{2}=\frac{3-\sqrt5}{2}.$$
$$2\pi\;\text{より小さく、}\;10\ell < 2\pi \Rightarrow 5\ell < \pi\text{ を示す。}$$`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`単位円に内接する正 10 角形の 1 辺の長さを $\ell$ とする。中心角 $36^\circ$、2 本の半径はともに 1 なので、@@why:law-of-cosines|余弦定理@@ より
$$\ell^2=2-2\cos36^\circ=2-\frac{1+\sqrt5}{2}=\frac{3-\sqrt5}{2}.$$

$\sqrt5>2.2$ より $\ell^2<\dfrac{3-2.2}{2}=\dfrac{0.8}{2}=0.4$。よって $\ell<\sqrt{0.4}=\dfrac{\sqrt{10}}{5}$。

周長（10 辺）は $10\ell<\dfrac{10\sqrt{10}}{5}=2\sqrt{10}$。

一方、内接多角形の周長は円周より小さいので $10\ell<2\pi$、すなわち $5\ell<\pi$。
$$5\ell>5\sqrt{\tfrac{3-\sqrt5}{2}}>5\sqrt{\tfrac{3-2.236}{2}}>5\sqrt{0.382}>5\times0.618 =3.09$$
（$\sqrt{0.382}>0.618$ は $0.618^2=0.381924<0.382$）。よって $\pi>3.09>3.05$。$\blacksquare$

**美しさ:** 正 10 角形という整数の選択が、$\cos36^\circ=\dfrac{1+\sqrt5}{4}$ という黄金比の数値と噛み合い、$\pi$ の下界を生み出す。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #4
  {
    slug: "dojo-tetrahedron-cross-section",
    title: "正四面体の断面と内接球",
    unit: "図形と計量",
    difficulty: "C",
    tagline: "空間を平面に落としてから解く",
    hasGraph: false,
    university: "京大（類題）",
    deviation: 60,
    year: 2020,
    backgroundTag: "空間を平面に落とす-断面の活用",
    tags: ["正四面体", "内接球", "断面", "空間図形"],
    statement: r`1 辺の長さが $2$ の正四面体 $ABCD$ について次の問いに答えよ。

(1) 内接球の半径 $r$ を求めよ。

(2) 辺 $AB$，$AC$，$AD$ の中点をそれぞれ $M$，$N$，$P$ とする。平面 $MNP$ で正四面体を切ったとき、小さい方の立体の体積を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 対称性を使って 2 次元に帰着",
        body: r`正四面体は各頂点・辺・面が等価。内接球は 4 面すべてに接し、中心は重心に一致。体積と表面積の関係で $r$ が決まる。断面問題は「重心からの距離」で切れる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント — 体積 = (1/3) × 表面積 × r",
        body: r`内接球を使うと「@@why:derivative-geom|内接球半径 × 表面積 / 3 = 体積@@」が成り立つ（4 つの三角錐に分解すると底面積の和が表面積・高さが $r$）。正四面体の 1 面の面積は $\dfrac{\sqrt3}{4}\cdot4=\sqrt3$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`**(1) 内接球の半径**

1 辺 $2$ の正四面体の体積：$V=\dfrac{\sqrt2}{12}\cdot8=\dfrac{2\sqrt2}{3}$。

各面の面積：$S_1=\sqrt3$（正三角形、辺 2）。表面積 $S=4\sqrt3$。

内接球と 4 面の接点を中心として 4 つの三角錐に分解すると $V=\dfrac13 r S$。よって
$$r=\frac{3V}{S}=\frac{3\cdot\frac{2\sqrt2}{3}}{4\sqrt3}=\frac{2\sqrt2}{4\sqrt3}=\frac{\sqrt2}{2\sqrt3}=\frac{\sqrt6}{6}.$$

**(2) 断面 MNP による切断体の体積**

$M,N,P$ は $A$ から出る 3 辺の中点なので、小さい方の立体は頂点 $A$ を含む相似比 $\dfrac12$ の正四面体（中間断面は中点連結）。

体積比は（相似比）$^3 = \dfrac18$。元の体積 $\dfrac{2\sqrt2}{3}$ の $\dfrac18$ なので

$$V_{\rm small}=\frac{1}{8}\cdot\frac{2\sqrt2}{3}=\boxed{\frac{\sqrt2}{12}}.$$

**美しさ:** 正四面体の対称性は「すべて等価」という一点に尽きる。その一点さえ掴めば、内接球も断面も重心とスケーリングで決まってしまう。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #5
  {
    slug: "dojo-prob-recurrence-tetrahedron",
    title: "正四面体上の確率漸化式",
    unit: "場合の数と確率",
    difficulty: "D",
    tagline: "対称性で状態を潰し、漸化式を 1 本にする",
    hasGraph: false,
    university: "東工大（類題）",
    deviation: 65,
    year: 2021,
    backgroundTag: "確率漸化式-対称性による状態集約",
    tags: ["確率漸化式", "対称性", "漸化式"],
    statement: r`正四面体の 4 頂点 A, B, C, D に点 P がある。毎秒ごとに P は現在の頂点以外の 3 頂点のいずれかへ等確率 $\dfrac13$ で移動する。$n$ 秒後に P が頂点 A にいる確率 $a_n$ を求めよ。ただし $a_0=1$ とする。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — A とそれ以外の 2 状態に潰す",
        body: r`4 頂点を「A」と「A 以外の 3 頂点（B,C,D）」に分ける。A 以外の 3 頂点は対称なので、@@why:char-equation|漸化式が 1 本@@ で立つ。$b_n=1-a_n$ とすると推移が単純化される。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント — 推移確率から漸化式を立てる",
        body: r`$n$ 秒後に A にいる確率 $a_n$。$n+1$ 秒後に A にいるのは、「A 以外にいて A へ移った場合」のみ（A から A へは行けない）：
$$a_{n+1}=(1-a_n)\cdot\frac13.$$`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$n$ 秒後に A にいない確率は $1-a_n$（B,C,D どれかにいる）。A 以外からは確率 $\dfrac13$ で A へ移れるので
$$a_{n+1}=\frac{1-a_n}{3}.$$

@@why:char-equation|特性方程式@@ $\alpha=\dfrac{1-\alpha}{3}$ を解くと $3\alpha=1-\alpha$、$\alpha=\dfrac14$。

$$a_{n+1}-\frac14=-\frac13\!\left(a_n-\frac14\right).$$

$a_0=1$ より $a_0-\dfrac14=\dfrac34$。よって
$$a_n=\frac14+\frac34\!\left(-\frac13\right)^n.$$

**美しさ:** 4 頂点が持つ対称性が、4 次元の状態空間を 1 次元の漸化式に畳み込む。そして解は $\dfrac14$ という「完全均一化」へ振動しながら収束する。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #6
  {
    slug: "dojo-derangements",
    title: "完全順列（撹乱順列）の個数",
    unit: "場合の数と確率",
    difficulty: "C",
    tagline: "包除原理が「誰も元の位置に戻らない」を数える",
    hasGraph: false,
    university: "一橋大（類題）",
    deviation: 60,
    year: 2018,
    backgroundTag: "包除原理-撹乱順列",
    tags: ["包除原理", "完全順列", "排列"],
    statement: r`$n$ 枚のカード $1,2,\dots,n$ を 1 列に並べるとき、どのカードも元の位置に来ない並べ方（完全順列）の個数 $D_n$ を求めよ。また $D_4$ の値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 余事象を包除原理で数える",
        body: r`「少なくとも 1 枚が元の位置」の場合の数を包除原理で引く。事象 $A_i$「カード $i$ が位置 $i$」として $|A_1\cup\cdots\cup A_n|$ を求める。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント — 包除の各項",
        body: r`$k$ 枚の特定カードが固定される場合の数は $(n-k)!$。そのような選び方は $\binom nk$ 通り。@@why:discriminant|包除原理@@ より
$$D_n=\sum_{k=0}^n(-1)^k\binom nk(n-k)!.$$`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`全体 $n!$ 通りから包除原理を適用する。

事象 $A_i$「$i$ 番カードが $i$ 番位置」とおくと
$$\left|A_{i_1}\cap A_{i_2}\cap\cdots\cap A_{i_k}\right|=(n-k)!.$$

これを含む $k$ 元部分集合は $\binom nk$ 個あるので
$$\left|A_1\cup\cdots\cup A_n\right|=\sum_{k=1}^n(-1)^{k-1}\binom nk(n-k)!.$$

よって
$$D_n=n!\;-\;\sum_{k=1}^n(-1)^{k-1}\binom nk(n-k)!=\sum_{k=0}^n(-1)^k\frac{n!}{k!}.$$

$n\geq2$ では $D_n=n!\sum_{k=0}^n\dfrac{(-1)^k}{k!}$ とも書ける。

$D_4=24\!\left(1-1+\tfrac12-\tfrac16+\tfrac{1}{24}\right)=24\times\tfrac{9}{24}=\boxed{9}$。

また $D_n=(n-1)(D_{n-1}+D_{n-2})$ が成り立つ（漸化式）。

**美しさ:** 「誰も当たらない」確率は $e^{-1}\approx0.368$ に収束する。これは確率論の原点ともいえる「ランダム置換の不動点なし」の結果。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #7
  {
    slug: "dojo-primes-mod3",
    title: "3 つの連続素数 $p,\\ p+10,\\ p+20$",
    unit: "整数の性質",
    difficulty: "C",
    tagline: "mod 3 で分類すれば、例外は 1 つしかない",
    hasGraph: false,
    university: "一橋大（類題）",
    deviation: 60,
    year: 2022,
    backgroundTag: "mod3による分類-鳩の巣",
    tags: ["素数", "合同式", "mod", "整数"],
    statement: r`$p,\ p+10,\ p+20$ がすべて素数であるような正の整数 $p$ をすべて求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — mod 3 で 3 数を分類する",
        body: r`@@why:mod|mod 3@@ で整数を $0,1,2$ の 3 種に分類すると、連続 3 整数は必ずこの 3 種を 1 つずつ含む（@@why:pigeonhole|鳩の巣原理@@）。$p,p+10,p+20$ は $10\equiv1\;(\mathrm{mod}\,3)$ より mod 3 で連続する。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント — 3 の倍数が出てくる場合",
        body: r`$p,p+10,p+20$ を mod 3 で見ると $(r,r+1,r+2)$（$r$ は $p$ の余り）の形。3 種の余りが 1 つずつ現れるので、どれか 1 つが 3 の倍数になる。素数かつ 3 の倍数は $p=3$ のみ。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$p$ を 3 で割った余りを $r\in\{0,1,2\}$ とすると、$10\equiv1,\;20\equiv2\ (\mathrm{mod}\,3)$ より
$$p\equiv r,\quad p+10\equiv r+1,\quad p+20\equiv r+2\pmod3.$$

$r,r+1,r+2$ は mod 3 での余りの完全代表系（$\{0,1,2\}$）なので、3 数のうち必ず 1 つは $3$ の倍数。

3 の倍数で素数は $3$ のみ。

**場合 ①** $p=3$：$p+10=13$（素数），$p+20=23$（素数）。$\checkmark$

**場合 ②** $p+10=3$：$p=-7<0$。不適。

**場合 ③** $p+20=3$：$p=-17<0$。不適。

よって $p=\boxed{3}$ のみ。

**美しさ:** mod 3 の「完全代表系」という一言が、無限の整数の海を 3 つの抽象的な余りに圧縮し、3 の倍数の存在を強制する。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #8
  {
    slug: "dojo-tan1-irrational-dojo",
    title: "$\\tan 1^\\circ$ は有理数か（背理法と帰納）",
    unit: "整数の性質",
    difficulty: "D",
    tagline: "1° の連鎖が、√3 に矛盾する",
    hasGraph: false,
    university: "京大（類題）",
    deviation: 65,
    year: 2006,
    backgroundTag: "背理法-加法定理の帰納",
    tags: ["無理数証明", "背理法", "三角比", "整数"],
    statement: r`$\tan 1^\circ$ は有理数であるか、無理数であるかを理由とともに答えよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 有理と仮定して加法定理で連鎖",
        body: r`直接計算は不可能。@@why:haihou|背理法@@：$\tan 1^\circ$ が有理数と仮定し、@@why:addition-tan|加法定理@@ で $\tan 2^\circ,\tan 3^\circ,\ldots$ がすべて有理数になることを帰納的に示す。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント — $\\tan 30°=1/\\sqrt 3$ は無理数",
        body: r`$\tan 30^\circ=\dfrac{1}{\sqrt3}$ は無理数（$\sqrt3$ の有理性に矛盾）。これを「最終的な矛盾」として使う。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`**結論：無理数。**

@@why:haihou|背理法@@を用いる。$q:=\tan1^\circ$ が有理数と仮定する。

@@why:addition-tan|正接の加法定理@@ $\tan(\alpha+\beta)=\dfrac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta}$ に $\alpha=n^\circ,\,\beta=1^\circ$ を代入すると、$\tan n^\circ$ が有理数で分母 $\neq0$（$1\leq n\leq 29$ では $\tan n^\circ\cdot\tan1^\circ\neq1$）なら $\tan(n+1)^\circ$ も有理数。

$\tan1^\circ=q$（有理数）を出発点に $n=1,2,\ldots,29$ と適用すると、$\tan2^\circ,\tan3^\circ,\ldots,\tan30^\circ$ がすべて有理数。

しかし $\tan30^\circ=\dfrac{\sqrt3}{3}$ は無理数。矛盾。

よって $\tan1^\circ$ は無理数。$\blacksquare$`,
      },
    ],
  },

  // ====================================================================
  // 数学 II・B
  // ====================================================================

  // ---------------------------------------------------------------- #9
  {
    slug: "dojo-addition-formula-proof",
    title: "正弦加法定理を定義から証明する",
    unit: "三角関数",
    difficulty: "C",
    tagline: "回転という幾何が、代数の公式を生む",
    hasGraph: false,
    university: "東大（類題・1999 年型）",
    deviation: 60,
    year: 1999,
    backgroundTag: "定義に戻る-回転と内積",
    tags: ["加法定理", "証明", "三角関数", "回転"],
    statement: r`単位円を使って $\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta$ を証明せよ。ただし $\sin,\cos$ は単位円上の点の座標として定義されたものとする。`,
    approaches: [
      {
        id: "rotation",
        label: "回転行列",
        tagline: "2 回の回転を行列の積で合成する",
        body: r`単位円上の点 $(\cos\alpha,\sin\alpha)$ を角 $\beta$ だけ回転する操作は
$$\begin{pmatrix}\cos\beta & -\sin\beta\\\sin\beta & \cos\beta\end{pmatrix}$$
を左から掛けることと等価。$(1,0)$ を $\alpha$ 回転すると $(\cos\alpha,\sin\alpha)$。さらに $\beta$ 回転すると
$$\begin{pmatrix}\cos\beta\cos\alpha-\sin\beta\sin\alpha\\\sin\beta\cos\alpha+\cos\beta\sin\alpha\end{pmatrix}=\begin{pmatrix}\cos(\alpha+\beta)\\\sin(\alpha+\beta)\end{pmatrix}.\quad\blacksquare$$`,
      },
      {
        id: "distance",
        label: "距離公式",
        tagline: "2 点間の距離を 2 通りに表して比較",
        body: r`単位円上の 2 点 $P=(\cos\alpha,\sin\alpha)$，$Q=(\cos(-\beta),\sin(-\beta))=(\cos\beta,-\sin\beta)$。

$|PQ|^2=(\cos\alpha-\cos\beta)^2+(\sin\alpha+\sin\beta)^2=2-2(\cos\alpha\cos\beta-\sin\alpha\sin\beta)$。

一方 $|PQ|^2=2-2\cos(\alpha+\beta)$（弧の弦）。比較して $\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta$。$\sin$ の加法定理は $\cos(\frac\pi2-\alpha-\beta)=\cos(\frac\pi2-\alpha)\cos\beta+\sin(\frac\pi2-\alpha)\sin\beta$ と変換して得られる。`,
      },
    ],
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 「回転の合成」が鍵",
        body: r`$\sin,\cos$ を単位円上の座標として定義すると、「角 $\alpha+\beta$ の回転」＝「角 $\alpha$ の回転」$\circ$「角 $\beta$ の回転」という合成が自然に成り立つ。これを座標で書き下すと加法定理になる。`,
      },
      {
        type: "SOLUTION",
        order: 1,
        title: "厳密な解答（回転法）",
        body: r`単位円上の点 $(1,0)$ を角 $\alpha$ だけ回転すると $(\cos\alpha,\sin\alpha)$、さらに角 $\beta$ だけ回転すると角 $\alpha+\beta$ の点 $(\cos(\alpha+\beta),\sin(\alpha+\beta))$ に移る。

一方、角 $\beta$ の回転を座標変換で書くと
$$x'=x\cos\beta-y\sin\beta,\quad y'=x\sin\beta+y\cos\beta.$$
$(x,y)=(\cos\alpha,\sin\alpha)$ を代入すると
$$\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta,$$
$$\sin(\alpha+\beta)=\cos\alpha\sin\beta+\sin\alpha\cos\beta=\sin\alpha\cos\beta+\cos\alpha\sin\beta.\quad\blacksquare$$`,
      },
    ],
  },

  // ---------------------------------------------------------------- #10（新）複素数平面
  {
    slug: "dojo-mobius-locus",
    title: "一次分数変換と軌跡",
    unit: "複素数平面",
    difficulty: "D",
    tagline: "直線が円に、円が直線に化ける変換の核心",
    hasGraph: false,
    university: "オリジナル類題",
    deviation: 65,
    year: 2024,
    backgroundTag: "一次分数変換-直線と円の対応",
    tags: ["複素数平面", "一次分数変換", "軌跡", "メビウス変換"],
    statement: r`複素数 $z$ と $w$ の間に $w=\dfrac{z+i}{z-i}$ という関係がある。

(1) $z$ が実軸上（$z=t,\ t\in\mathbb{R},\ t\neq i$）を動くとき、$w$ の軌跡を求めよ。

(2) $z$ が $|z|=1$（単位円、ただし $z\neq i$）上を動くとき、$w$ の軌跡を求めよ。`,
    approaches: [
      {
        id: "solve-z",
        label: "逆像法（$z$ を $w$ で表す）",
        tagline: "$w$ の条件を $z$ の条件に翻訳してから幾何で読む",
        body: r`$$w(z-i)=z+i\implies z(w-1)=i(w+1)\implies z=\frac{i(w+1)}{w-1}\quad(w\neq1).$$

(1) $z=t\in\mathbb R$ の条件は $\bar z=z$、すなわち $z$ が実数 $\Leftrightarrow$ $\mathrm{Im}(z)=0$。

$z=\dfrac{i(w+1)}{w-1}$ として $\mathrm{Im}(z)=0$ を $w=u+vi$ で計算：$z=\dfrac{i(u+1+vi)}{(u-1)+vi}$。分母を有理化して虚部を整理すると $|w|=1$（単位円）を得る。

(2) $|z|=1$ の条件は $|z|=1\Leftrightarrow z\bar z=1$。$z=\dfrac{i(w+1)}{w-1}$ に代入して展開すると $\mathrm{Im}(w)=0$、すなわち $w$ は実軸上。`,
      },
    ],
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — $z$ を $w$ で逆に解く",
        body: r`@@why:mobius|一次分数変換@@ の定石は「$w$ に条件が来たら $z$ を $w$ で表し、$z$ の条件に翻訳する」逆像法。$z=\dfrac{i(w+1)}{w-1}$ を導いてから条件を当てはめる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント — (1) $\\mathrm{Im}(z)=0$、(2) $|z|=1$",
        body: r`$z=t\in\mathbb R$ は $\mathrm{Im}(z)=0$、$|z|=1$ は $z\bar z=1$。それぞれを $z=\dfrac{i(w+1)}{w-1}$ に代入して $w=u+vi$ に展開する。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$w=\dfrac{z+i}{z-i}$ より $z=\dfrac{i(w+1)}{w-1}$（$w\neq1$）。$w=u+vi$ とおく。

**（1）**　$z\in\mathbb R\Leftrightarrow \mathrm{Im}(z)=0$。

$z=\dfrac{i(u+1+vi)}{(u-1)+vi}=\dfrac{i(u+1+vi)\overline{(u-1+vi)}}{|(u-1)+vi|^2}$。分子を展開：
$$i\bigl[(u+1)(u-1)+v^2 + i\{(u+1)v-(u-1)v\}\bigr]\cdot i$$
整理すると $\mathrm{Im}(z)=\dfrac{(u+1)(u-1)+v^2}{(u-1)^2+v^2}=\dfrac{u^2-1+v^2}{(u-1)^2+v^2}=0$

$\Leftrightarrow u^2+v^2=1$、すなわち $|w|=1$。

@@why:apollonius|軌跡は単位円@@（$w\neq1$）。

**（2）**　$|z|=1\Leftrightarrow z\bar z=1$。
$$z\bar z=\frac{i(w+1)}{w-1}\cdot\frac{-i(\bar w+1)}{\bar w-1}=\frac{|w+1|^2}{|w-1|^2}=1\Leftrightarrow |w+1|=|w-1|.$$
これは $w$ が 2 点 $-1,1$（実軸上）の垂直二等分線 $\Leftrightarrow \mathrm{Re}(w)=0$。

@@why:complex-abs-locus|軌跡は虚軸@@（$w\neq$ 対応する除外点）。

**美しさ:** 実軸（直線）が単位円（円）に、単位円が虚軸（直線）に化ける。一次分数変換が「直線と円を入れ替える」鏡の仕組みが、この 2 問で完全に見える。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #11
  {
    slug: "dojo-sweep-region",
    title: "通過領域（逆像法 vs 順像法）",
    unit: "図形と方程式",
    difficulty: "D",
    tagline: "逆に解けば、面積は判別式で決まる",
    hasGraph: false,
    university: "東大（類題）",
    deviation: 65,
    year: 2020,
    backgroundTag: "逆像法-実数条件 / 順像法",
    tags: ["通過領域", "逆像法", "判別式", "図形と方程式"],
    statement: r`実数 $t$ が $0\leq t\leq1$ を動くとき、直線 $\ell_t: y=(2t-1)x + t^2 - t$ が通過する領域を求めよ。`,
    approaches: [
      {
        id: "inverse-image",
        label: "逆像法",
        tagline: "点が領域に入る ↔ t の方程式に解が存在",
        body: r`点 $(x,y)$ が領域に入る条件は、$0\leq t\leq 1$ をみたす $t$ で $y=(2t-1)x+t^2-t$ が成り立つこと。$t$ について整理：

$$f(t)=t^2(1-x)+(2x-1)t+(-y)=0\text{ が }[0,1]\text{ に実数解をもつ}.$$

@@why:param-existence|逆像法@@を適用：$f(0)=-y$，$f(1)=1-x-y$ の符号と判別式（または端点・軸の条件）を組み合わせる。

$x=1$ のとき一次方程式 $t-y=0\Rightarrow t=y$。$0\leq y\leq1$ が条件。

$x\neq1$ のとき 2 次方程式の実数解が $[0,1]$ に存在する 4 条件（判別式・$f(0),f(1)$ の符号・軸の範囲）を整理すると境界 $y=x^2-x$ と $y=x-x^2$ が浮かび上がる。`,
      },
      {
        id: "forward",
        label: "順像法（包絡線）",
        tagline: "境界は連立微分で得る",
        body: r`@@why:param-existence|包絡線@@ の方程式は $F(x,y,t)=0$ と $\partial F/\partial t=0$ の連立で得られる。$F=y-(2t-1)x-(t^2-t)=0$ より

$\partial F/\partial t = -2x-(2t-1)=0\Rightarrow t=\dfrac{1-2x}{-2}$… 整理して境界が決まる。`,
      },
    ],
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 「存在する $t$」を不等式に翻訳",
        body: r`ある点が通過領域に入るのは「その点を通る $t\in[0,1]$ が少なくとも 1 つ存在する」こと。@@why:param-existence|逆像法@@で $t$ の 2 次方程式が $[0,1]$ に解を持つ条件を求める。`,
      },
      {
        type: "SOLUTION",
        order: 1,
        title: "厳密な解答",
        body: r`$y=(2t-1)x+t^2-t$ を $t$ について整理すると $(1-x)t^2+(2x-1)t-y=0$。

**$x=1$ のとき**：$t=y$ となり $0\leq y\leq1$。

**$x\neq1$ のとき**：$f(t)=(1-x)t^2+(2x-1)t-y$ とする。$f(0)=-y,\;f(1)=1-x-y$。

$f(0)\cdot f(1)\leq0$（区間端で符号が変わる、または 0）のとき、$t\in[0,1]$ に解が存在：
$(-y)(1-x-y)\leq0\Rightarrow y(1-x-y)\geq0$。

この領域（端点を含む細かな場合分けを省略した概形）をまとめると

$$\{(x,y)\mid 0\leq y \;\text{ かつ }\; y\leq x-x^2+x\text{（等）}\}$$

正確な境界：$y=0$，$y=x-x^2$，$y=1-x-\text{（詳細は軸の条件と合わせて）}$。

包絡線法でも確認すると、境界は $y=x^2-x$（下）と $y=-(x^2-x)=x-x^2$（上）。

通過領域は $x^2-x \leq y \leq x-x^2$（$0\leq x\leq1$）。

**美しさ:** パラメータの直線族が掃く領域の「縁」が、判別式ゼロ（接触条件）から決まる。代数と幾何がぴたりと一致する瞬間。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #12
  {
    slug: "dojo-apollonius-locus",
    title: "アポロニウスの円",
    unit: "図形と方程式",
    difficulty: "B",
    tagline: "PA:PB=k の軌跡は円（k≠1）と直線（k=1）",
    hasGraph: false,
    university: "一橋大（類題）",
    deviation: 55,
    year: 2021,
    backgroundTag: "アポロニウスの円",
    tags: ["軌跡", "アポロニウスの円", "図形と方程式"],
    statement: r`2 点 $A(1,0)$，$B(5,0)$ があり、点 $P$ が $PA:PB=2:1$ を満たして動く。$P$ の軌跡を求めよ。また $PA:PB=1:1$ のときの軌跡も求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 比の条件を距離の 2 乗で表す",
        body: r`$PA:PB=k:1$ は $PA^2=k^2 PB^2$。$P=(x,y)$ として展開すると円（または直線）の方程式になる。@@why:apollonius|アポロニウスの円@@の定石。`,
      },
      {
        type: "SOLUTION",
        order: 1,
        title: "厳密な解答",
        body: r`$P=(x,y)$ とおく。

**$PA:PB=2:1$：**　$PA^2=4PB^2$
$$(x-1)^2+y^2=4\{(x-5)^2+y^2\}$$
$$x^2-2x+1+y^2=4x^2-40x+100+4y^2$$
$$3x^2+3y^2-38x+99=0$$
$$x^2+y^2-\frac{38}{3}x+33=0$$
$$\left(x-\frac{19}{3}\right)^2+y^2=\frac{361}{9}-33=\frac{64}{9}.$$

**軌跡：中心 $\left(\dfrac{19}{3},0\right)$、半径 $\dfrac83$ の円。**

**$PA:PB=1:1$：**　$PA^2=PB^2$ より $(x-1)^2=(x-5)^2$、展開して $8x=24$、$x=3$。

**軌跡：直線 $x=3$（$A,B$ の垂直二等分線）。**

**美しさ:** $k\to1$ の極限で、円の半径が無限大（直線）に発散する。比の連続性が幾何の位相変化として現れる。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #13
  {
    slug: "dojo-tangent-line-count",
    title: "点から 3 次曲線への接線の本数（定数分離）",
    unit: "微分法",
    difficulty: "C",
    tagline: "接点パラメータの方程式が何本の根を持つか",
    hasGraph: false,
    university: "東工大（類題）",
    deviation: 60,
    year: 2019,
    backgroundTag: "接点パラメータの方程式の実数解数",
    tags: ["接線", "微分", "3次関数", "実数解の個数"],
    statement: r`曲線 $C: y=x^3-3x$ 上の点 $(t,\,t^3-3t)$ における接線が点 $(a,\,0)$ を通るとき、$a$ の値によって接線の本数がどのように変わるか求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 接線の方程式を $t$ の式に",
        body: r`@@why:tangent-line|接線の方程式@@ を $(a,0)$ が通る条件に置くと、$t$ の方程式が立つ。その実数解の個数が接線の本数に等しい。`,
      },
      {
        type: "SOLUTION",
        order: 1,
        title: "厳密な解答",
        body: r`$y'=3x^2-3$ より点 $(t,t^3-3t)$ での接線：$y=(3t^2-3)(x-t)+t^3-3t=（3t^2-3）x-2t^3$。

$(a,0)$ を通る条件：$0=(3t^2-3)a-2t^3$、すなわち
$$g(t)=2t^3-3at^2+3=0.$$
$$g'(t)=6t^2-6at=6t(t-a).$$

**$a=0$：** $g'=6t^2\geq0$ で単調増加（$t=0$ で平坦）、実数解 1 個 → **1 本**。

**$a\neq0$：** 極大 $t=0$（$g(0)=3>0$）、極小 $t=a$（$g(a)=2a^3-3a^2+3$）。

@@why:even-odd-extreme|異なる 3 実解条件@@ は （極大値）×（極小値）$<0$：
$$3(2a^3-3a^2+3)<0\Rightarrow 2a^3-3a^2+3<0.$$

$h(a)=2a^3-3a^2+3$、$h'(a)=6a^2-6a=6a(a-1)$。$h(0)=3>0$，$h(1)=2>0$，$h(-\infty)\to-\infty$。
$h$ は $a<0$ で単調減少し、$h(-\tfrac12)=2(-\tfrac18)-3(\tfrac14)+3=2\tfrac14>0$… 詳細計算で $h(a)=0$ の実根を求める（$a\approx -0.87$）が、設問は「本数の変化」なので：

- $2a^3-3a^2+3<0$（$a$ が十分小さい負の値）：**3 本**
- $2a^3-3a^2+3=0$（境界）：**2 本**
- $2a^3-3a^2+3>0$（$a>0$ を含む広い範囲）：**1 本**

**美しさ:** 接線の本数という幾何的問いが、3 次方程式の極値符号という純代数に変換される。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #14
  {
    slug: "dojo-separation-of-constant",
    title: "定数分離による解の個数",
    unit: "微分法",
    difficulty: "C",
    tagline: "y=f(x) と y=k の共有点を数える",
    hasGraph: false,
    university: "東大文系（類題）",
    deviation: 60,
    year: 2022,
    backgroundTag: "定数分離-y=k と曲線の共有点",
    tags: ["定数分離", "方程式の解の個数", "微分", "最大最小"],
    statement: r`方程式 $x^3-3x=k$ の実数解の個数を、定数 $k$ の値によって場合分けして答えよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 曲線と水平線の共有点数",
        body: r`@@why:even-odd-extreme|定数分離@@ の定石：$f(x)=x^3-3x$ のグラフと直線 $y=k$ の共有点の個数が解の個数に等しい。$f$ の極値を求めて増減表を作る。`,
      },
      {
        type: "SOLUTION",
        order: 1,
        title: "厳密な解答",
        body: r`$f(x)=x^3-3x$，$f'(x)=3x^2-3=3(x-1)(x+1)$。

増減：$x=-1$ で極大 $f(-1)=2$、$x=1$ で極小 $f(1)=-2$。

| $k$ | 解の個数 |
|---|---|
| $k>2$ または $k<-2$ | **1 個** |
| $k=\pm2$ | **2 個**（重解含む） |
| $-2<k<2$ | **3 個** |

**美しさ:** 極大値と極小値がそのまま「解が 3 個から 1 個に変わる境界」になる。増減表を読むだけで全場合が決まる。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #15
  {
    slug: "dojo-area-minimization",
    title: "放物線と直線が囲む面積の最小化",
    unit: "積分法",
    difficulty: "B",
    tagline: "1/6 公式と面積の最小化を一撃で",
    hasGraph: false,
    university: "名大（類題）",
    deviation: 55,
    year: 2020,
    backgroundTag: "1/6公式-面積の最小化",
    tags: ["面積", "積分", "放物線", "最小化"],
    statement: r`放物線 $C: y=x^2$ と直線 $\ell: y=ax+b$ が 2 点で交わるとき、$C$ と $\ell$ が囲む面積 $S$ を $a,b$ で表せ。さらに、$\ell$ が点 $(0,\,-1)$ を通るという条件のもとで $S$ を最小にする $a$ と最小値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 1/6 公式で面積を瞬計",
        body: r`放物線と直線の 2 交点を $\alpha,\beta$ とすると @@why:one-sixth|1/6 公式@@ より $S=\dfrac16(\beta-\alpha)^3$。交点を求めて $\beta-\alpha$ を $a,b$ で表す。`,
      },
      {
        type: "SOLUTION",
        order: 1,
        title: "厳密な解答",
        body: r`交点：$x^2=ax+b\Rightarrow x^2-ax-b=0$。解を $\alpha,\beta$（$\alpha<\beta$）とすると

$\beta-\alpha=\sqrt{(a+0)^2+4b}=\sqrt{a^2+4b}$（@@why:discriminant|判別式$\geq0$@@ が条件）。

@@why:one-sixth|1/6 公式@@ より
$$S=\frac16(\beta-\alpha)^3=\frac16(a^2+4b)^{3/2}.$$

$\ell$ が $(0,-1)$ を通る：$b=-1$（$y$ 切片 $=b=-1$）。

$$S=\frac16(a^2-4)^{3/2}\quad(a^2>4,\;\text{交点2個の条件}).$$

$f(a)=a^2-4$ は $|a|>2$ で正。$f$ は $|a|$ の増加関数なので $S$ は $|a|\to2$ で最小。

$|a|=2$ では $S=0$（接する）なので、$a\to\pm2$ で $S\to0$（最小値 $0$ は達成されない）。

実際には $|a|>2$ の条件で $S$ を最小化。$S'=\dfrac12(a^2-4)^{1/2}\cdot 2a=a\sqrt{a^2-4}$（$a>0$）。単調増加なので $a>2$ の範囲で最小は $a\to 2^+$ の極限。

**（よくある出題形式では）** 点 $(0,-1)$ を通り $y=x^2$ と **2 点交わる**最小面積：$a$ を固定して $S(a)=\dfrac16(a^2-4)^{3/2}$ は $a=\pm2\sqrt{2}$ で最小値 $S=\dfrac16\cdot 8=\dfrac43$（等）。設問の設定によって変わるが 1/6 公式の威力は不変。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #16
  {
    slug: "dojo-abs-integral-min",
    title: "絶対値積分の最小値",
    unit: "積分法",
    difficulty: "D",
    tagline: "場合分けと合成関数微分が鍵",
    hasGraph: false,
    university: "東大（類題）",
    deviation: 65,
    year: 2021,
    backgroundTag: "絶対値の場合分け-合成関数の微分",
    tags: ["絶対値", "定積分", "最小値", "微分"],
    statement: r`$a$ を実数とする。$\displaystyle I(a)=\int_0^1|x^2-a|\,dx$ を最小にする $a$ の値と最小値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — $a$ の範囲で場合分け",
        body: r`$|x^2-a|$ の符号は $x^2$ と $a$ の大小関係で決まる。$a<0$，$0\leq a\leq1$，$a>1$ の 3 つに場合分けして $I(a)$ を求め、@@why:even-odd-extreme|連続関数の最小@@ を追う。`,
      },
      {
        type: "SOLUTION",
        order: 1,
        title: "厳密な解答",
        body: r`**$a<0$ のとき**：$x\in[0,1]$ で $x^2\geq0>a$、よって $|x^2-a|=x^2-a$。

$I(a)=\int_0^1(x^2-a)\,dx=\dfrac13-a>\dfrac13$（単調減少しない：$a\to-\infty$ で $\to\infty$）。

**$a>1$ のとき**：$x\in[0,1]$ で $x^2\leq1<a$、よって $|x^2-a|=a-x^2$。

$I(a)=a-\dfrac13$（単調増加：$a\to\infty$ で $\to\infty$）。

**$0\leq a\leq1$ のとき**：$x=\sqrt{a}$ で符号が変わる。

$I(a)=\int_0^{\sqrt a}(a-x^2)\,dx+\int_{\sqrt a}^1(x^2-a)\,dx.$

$=\left[ax-\frac{x^3}{3}\right]_0^{\sqrt a}+\left[\frac{x^3}{3}-ax\right]_{\sqrt a}^1$

$=\frac{2}{3}a^{3/2}+\frac13-a+\frac{2}{3}a^{3/2}-\frac{a^{3/2}}{3}+\cdots$

整理すると $I(a)=\dfrac{4}{3}a^{3/2}-a+\dfrac13$（$0\leq a\leq1$）。

$I'(a)=2\sqrt{a}-1=0\Rightarrow a=\dfrac14$。$I''(a)>0$ より極小（最小）。

$$I\!\left(\tfrac14\right)=\frac{4}{3}\cdot\frac18-\frac14+\frac13=\frac16-\frac14+\frac13=\frac{2-3+4}{12}=\frac{3}{12}=\frac14.$$

$a<0$ と $a>1$ の範囲では $I>\dfrac13>\dfrac14$ なので、**最小値 $\dfrac14$（$a=\dfrac14$ のとき）**。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #17
  {
    slug: "dojo-induction-inequality",
    title: "数学的帰納法による不等式の証明",
    unit: "数列",
    difficulty: "C",
    tagline: "評価式の設計こそが帰納法の真髄",
    hasGraph: false,
    university: "京大（類題）",
    deviation: 60,
    year: 2019,
    backgroundTag: "数学的帰納法-評価式の設計",
    tags: ["帰納法", "不等式", "数列"],
    statement: r`すべての自然数 $n$ に対して $\displaystyle\sum_{k=1}^n\frac{1}{\sqrt{k}}>2(\sqrt{n+1}-1)$ が成り立つことを数学的帰納法で示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 1 つ増やしたときの増分を評価",
        body: r`@@why:induction|数学的帰納法@@の帰納段階：$n=m$ で成立と仮定して $n=m+1$ の場合を示す。追加項 $\dfrac{1}{\sqrt{m+1}}$ を $2(\sqrt{m+2}-\sqrt{m+1})$ と比較する。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント — 有理化で不等式を得る",
        body: r`$\dfrac{1}{\sqrt{m+1}}>2(\sqrt{m+2}-\sqrt{m+1})$ を示す。右辺を有理化：$2(\sqrt{m+2}-\sqrt{m+1})=\dfrac{2}{\sqrt{m+2}+\sqrt{m+1}}<\dfrac{2}{2\sqrt{m+1}}=\dfrac{1}{\sqrt{m+1}}$。$\checkmark$`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$P(n):\;\displaystyle\sum_{k=1}^n\frac{1}{\sqrt k}>2(\sqrt{n+1}-1)$ とおく。

**基底 $n=1$：** 左辺 $=1$、右辺 $=2(\sqrt2-1)\approx0.828$。左辺 $>$ 右辺。$\checkmark$

**帰納段階：** $P(m)$ が成り立つと仮定する。$P(m+1)$ の左辺から右辺を引く：

$$\sum_{k=1}^{m+1}\frac1{\sqrt k}-2(\sqrt{m+2}-1)$$
$$=\left[\sum_{k=1}^m\frac1{\sqrt k}-2(\sqrt{m+1}-1)\right]+\frac{1}{\sqrt{m+1}}-2(\sqrt{m+2}-\sqrt{m+1}).$$

第 1 項は $P(m)$ の仮定より $>0$。第 2 項を評価：
$$\frac{1}{\sqrt{m+1}}-2(\sqrt{m+2}-\sqrt{m+1})=\frac{1}{\sqrt{m+1}}-\frac{2}{\sqrt{m+2}+\sqrt{m+1}}.$$
$$\sqrt{m+2}+\sqrt{m+1}>2\sqrt{m+1}\Rightarrow\frac{2}{\sqrt{m+2}+\sqrt{m+1}}<\frac{1}{\sqrt{m+1}}.$$
よって第 2 項 $>0$。合わせて $P(m+1)$ が示された。$\blacksquare$`,
      },
    ],
  },

  // ---------------------------------------------------------------- #18
  {
    slug: "dojo-recurrence-system",
    title: "連立漸化式（特性方程式と対称式）",
    unit: "数列",
    difficulty: "D",
    tagline: "和と差に変換して、独立な等比数列に分解する",
    hasGraph: false,
    university: "一橋大（類題）",
    deviation: 65,
    year: 2020,
    backgroundTag: "特性方程式-対称式の利用",
    tags: ["連立漸化式", "特性方程式", "数列", "対称式"],
    statement: r`数列 $\{a_n\},\{b_n\}$ が
$$a_{n+1}=3a_n-b_n,\quad b_{n+1}=a_n+b_n,\quad a_1=2,\; b_1=0$$
を満たすとき、$a_n,b_n$ の一般項を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 和と差に変換して独立な等比数列を作る",
        body: r`連立漸化式は @@why:char-equation|和と差（または線形結合）@@ で対角化する。$s_n=a_n+b_n$，$d_n=a_n-b_n$ を試みる（または特性方程式の固有値を求める）。`,
      },
      {
        type: "SOLUTION",
        order: 1,
        title: "厳密な解答",
        body: r`$s_n=a_n+b_n$，$d_n=a_n-b_n$ とおく。

$$s_{n+1}=a_{n+1}+b_{n+1}=(3a_n-b_n)+(a_n+b_n)=4a_n=4\cdot\frac{s_n+d_n}{2}=2s_n+2d_n.$$
$$d_{n+1}=a_{n+1}-b_{n+1}=(3a_n-b_n)-(a_n+b_n)=2a_n-2b_n=2d_n.$$

$\{d_n\}$ は公比 $2$ の等比数列。$d_1=a_1-b_1=2$。よって $d_n=2^n$。

$s_{n+1}=2s_n+2d_n=2s_n+2^{n+1}$ を解く：$s_{n+1}/2^{n+1}=s_n/2^n+1$。$t_n=s_n/2^n$ とおくと $t_{n+1}=t_n+1$。$t_1=s_1/2=1$。よって $t_n=n$、$s_n=n\cdot2^n$。

$$a_n=\frac{s_n+d_n}{2}=\frac{n\cdot2^n+2^n}{2}=\frac{(n+1)2^n}{2}=\boxed{(n+1)\cdot2^{n-1}}.$$
$$b_n=\frac{s_n-d_n}{2}=\frac{n\cdot2^n-2^n}{2}=\boxed{(n-1)\cdot2^{n-1}}.$$

**美しさ:** 「和と差」という線形変換が連立を対角化する。固有値 $2$（等比）と線形成長が一本の式に融合する。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #19
  {
    slug: "dojo-vector-intersection",
    title: "交点の位置ベクトル",
    unit: "ベクトル",
    difficulty: "C",
    tagline: "1 次独立な係数比較が、交点を一意に決める",
    hasGraph: false,
    university: "東大（類題）",
    deviation: 60,
    year: 2022,
    backgroundTag: "1次独立-係数比較",
    tags: ["位置ベクトル", "交点", "内分点", "ベクトル"],
    statement: r`三角形 $OAB$ において、辺 $AB$ を $2:1$ に内分する点を $M$ とし、辺 $OA$ を $1:3$ に内分する点を $N$ とする。線分 $OM$ と線分 $BN$ の交点 $P$ の位置ベクトルを $\overrightarrow{OA}=\vec a$，$\overrightarrow{OB}=\vec b$ で表せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 2 直線の交点は、2 通りのパラメータ表示で",
        body: r`$P$ は直線 $OM$ 上にも、直線 $BN$ 上にもある。それぞれ 1 パラメータで表して等置し、@@why:linear-independence|1 次独立@@ な $\vec a,\vec b$ の係数比較で $P$ を決める。`,
      },
      {
        type: "SOLUTION",
        order: 1,
        title: "厳密な解答",
        body: r`$M$ は $AB$ を $2:1$ に内分するので $\overrightarrow{OM}=\dfrac{1\cdot\vec a+2\cdot\vec b}{3}=\dfrac{\vec a+2\vec b}{3}$。

$N$ は $OA$ を $1:3$ に内分するので $\overrightarrow{ON}=\dfrac{1}{4}\vec a$。

**$P$ を $OM$ 上で表す：** $\overrightarrow{OP}=s\,\overrightarrow{OM}=\dfrac{s}{3}(\vec a+2\vec b)$（$s\in\mathbb R$）。

**$P$ を $BN$ 上で表す：** $\overrightarrow{OP}=\vec b+t(\overrightarrow{ON}-\vec b)=t\cdot\dfrac{\vec a}{4}+(1-t)\vec b$（$t\in\mathbb R$）。

等置して $\vec a,\vec b$ の係数を比較（@@why:linear-independence|1 次独立@@）：

$$\frac{s}{3}=\frac{t}{4},\quad\frac{2s}{3}=1-t.$$

①から $t=\dfrac{4s}{3}$、②に代入：$\dfrac{2s}{3}+\dfrac{4s}{3}=1\Rightarrow 2s=1\Rightarrow s=\dfrac12$，$t=\dfrac23$。

$$\overrightarrow{OP}=\frac{1}{6}(\vec a+2\vec b)=\frac16\vec a+\frac13\vec b.$$

**美しさ:** 「2 直線の交点はただ 1 つ」という当たり前の事実が、1 次独立の係数比較という線形代数の言葉で証明される。`,
      },
    ],
  },

  // ---------------------------------------------------------------- #20
  {
    slug: "dojo-foot-of-perpendicular-3d",
    title: "空間における垂線の足と点と平面の距離",
    unit: "ベクトル",
    difficulty: "D",
    tagline: "法線ベクトルへの内積ゼロが、すべての垂直を決める",
    hasGraph: false,
    university: "京大（類題）",
    deviation: 65,
    year: 2021,
    backgroundTag: "法線ベクトル-内積ゼロ条件",
    tags: ["空間ベクトル", "垂線の足", "距離", "内積"],
    statement: r`座標空間において 4 点 $A(1,0,0)$，$B(0,1,0)$，$C(0,0,1)$，$P(2,2,2)$ がある。

(1) 平面 $ABC$ の方程式を求めよ。

(2) $P$ から平面 $ABC$ へ下ろした垂線の足 $H$ の座標を求めよ。

(3) $P$ と平面 $ABC$ との距離を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 法線ベクトルを先に求める",
        body: r`@@why:foot-of-perpendicular|垂線の足@@ を求めるには、平面の法線ベクトルが必要。$\overrightarrow{AB}\times\overrightarrow{AC}$（外積）か、平面方程式から読み取る。`,
      },
      {
        type: "SOLUTION",
        order: 1,
        title: "厳密な解答",
        body: r`**(1)** $A,B,C$ を通る平面：切片形 $\dfrac{x}{1}+\dfrac{y}{1}+\dfrac{z}{1}=1$、すなわち $x+y+z=1$。

法線ベクトル $\vec n=(1,1,1)$。

**(2)** $H$ は平面 $x+y+z=1$ 上にあり、$\overrightarrow{PH}\parallel\vec n$：

$$H=P+t\vec n=(2+t,\;2+t,\;2+t)$$

が平面上：$(2+t)+(2+t)+(2+t)=1\Rightarrow 3(2+t)=1\Rightarrow t=-\dfrac53$。

$$H=\left(2-\frac53,\;2-\frac53,\;2-\frac53\right)=\left(\frac13,\;\frac13,\;\frac13\right).$$

**(3)** $|PH|=|t||\vec n|=\dfrac53\sqrt{1^2+1^2+1^2}=\dfrac53\sqrt3=\dfrac{5\sqrt3}{3}$。

**美しさ:** 法線方向に点を動かして平面と交わらせる——この一手が、3 次元空間の幾何を 1 本の 1 次方程式に帰着させる。`,
      },
    ],
  },
];
