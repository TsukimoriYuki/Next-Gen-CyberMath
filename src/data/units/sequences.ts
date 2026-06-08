import type { Problem } from "@/lib/types";

// 数学B「数列」— 15 問 (A4/B4/C4/D2/D+1)。
const r = String.raw;

export const sequences: Problem[] = [
  // ============================== A (4) ==============================
  {
    slug: "arithmetic-sequence-basic",
    title: "等差数列の項と和",
    unit: "数列",
    difficulty: "A",
    tagline: "aₙ = a + (n−1)d",
    hasGraph: false,
    tags: ["等差数列"],
    statement: r`初項 $3$、公差 $4$ の等差数列について、第 $10$ 項 $a_{10}$ と初項から第 $10$ 項までの和 $S_{10}$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 2 つの公式", body: r`一般項 $a_n=a+(n-1)d$、和 $S_n=\dfrac n2(a_1+a_n)$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$a_{10}=3+9\cdot4$。$S_{10}=\dfrac{10}{2}(3+a_{10})$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$a_{10}=3+9\cdot4=39$。$S_{10}=\dfrac{10}{2}(3+39)=5\cdot42=210$。` },
    ],
  },
  {
    slug: "geometric-sequence-basic",
    title: "等比数列の項と和",
    unit: "数列",
    difficulty: "A",
    tagline: "aₙ = a rⁿ⁻¹",
    hasGraph: false,
    tags: ["等比数列"],
    statement: r`初項 $2$、公比 $3$ の等比数列について、第 $5$ 項 $a_5$ と和 $S_5$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 等比の公式", body: r`$a_n=ar^{n-1}$、$S_n=\dfrac{a(r^n-1)}{r-1}\ (r\neq1)$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$a_5=2\cdot3^4$。$S_5=\dfrac{2(3^5-1)}{3-1}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$a_5=2\cdot81=162$。$S_5=\dfrac{2(243-1)}{2}=242$。` },
    ],
  },
  {
    slug: "sigma-basic-formulas",
    title: "Σ の基本公式",
    unit: "数列",
    difficulty: "A",
    tagline: "Σk と Σk²",
    hasGraph: false,
    tags: ["シグマ"],
    statement: r`$\displaystyle\sum_{k=1}^{10}k$ と $\displaystyle\sum_{k=1}^{10}k^2$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 公式", body: r`$\displaystyle\sum_{k=1}^{n}k=\dfrac{n(n+1)}{2}$、$\displaystyle\sum_{k=1}^{n}k^2=\dfrac{n(n+1)(2n+1)}{6}$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$n=10$ を代入。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\displaystyle\sum_{k=1}^{10}k=\dfrac{10\cdot11}{2}=55$。$\displaystyle\sum_{k=1}^{10}k^2=\dfrac{10\cdot11\cdot21}{6}=385$。` },
    ],
  },
  {
    slug: "sum-odd-numbers",
    title: "奇数の和は平方数",
    unit: "数列",
    difficulty: "A",
    tagline: "Σ(2k−1) = n²",
    hasGraph: false,
    tags: ["シグマ", "等差数列"],
    statement: r`$\displaystyle\sum_{k=1}^{n}(2k-1)=n^2$ であることを、Σ の公式を用いて示せ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 線形性で分ける", body: r`$\displaystyle\sum(2k-1)=2\sum k-\sum 1$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$2\cdot\dfrac{n(n+1)}{2}-n$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\displaystyle\sum_{k=1}^{n}(2k-1)=2\sum_{k=1}^{n}k-\sum_{k=1}^{n}1=2\cdot\frac{n(n+1)}{2}-n=n^2+n-n=n^2.$ $\blacksquare$` },
    ],
  },

  // ============================== B (4) ==============================
  {
    slug: "arithmetic-from-two-terms",
    title: "2 項から等差数列を決める",
    unit: "数列",
    difficulty: "B",
    tagline: "連立で a と d",
    hasGraph: false,
    tags: ["等差数列", "連立方程式"],
    statement: r`等差数列 $\{a_n\}$ が $a_3=7,\ a_7=19$ をみたすとき、一般項 $a_n$ と和 $S_n$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 公差は項差から", body: r`$a_7-a_3=4d$ で公差が出る。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$4d=19-7=12\Rightarrow d=3$。$a_1=a_3-2d$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$4d=12\Rightarrow d=3$、$a_1=7-2\cdot3=1$。
$a_n=1+(n-1)\cdot3=3n-2$。$S_n=\dfrac n2(a_1+a_n)=\dfrac n2(1+3n-2)=\dfrac{n(3n-1)}{2}$。` },
    ],
  },
  {
    slug: "sigma-k-times-k-plus-one",
    title: "Σ k(k+1) の計算",
    unit: "数列",
    difficulty: "B",
    tagline: "展開して公式を足す",
    hasGraph: false,
    tags: ["シグマ"],
    statement: r`$\displaystyle\sum_{k=1}^{n}k(k+1)$ を $n$ の式で表せ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 展開して分解", body: r`$k(k+1)=k^2+k$。$\sum k^2$ と $\sum k$ の公式を足す。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\dfrac{n(n+1)(2n+1)}{6}+\dfrac{n(n+1)}{2}$ を $\dfrac{n(n+1)}{6}$ でくくる。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\displaystyle\sum_{k=1}^{n}k(k+1)=\frac{n(n+1)(2n+1)}{6}+\frac{n(n+1)}{2}=\frac{n(n+1)}{6}\bigl[(2n+1)+3\bigr]=\frac{n(n+1)(n+2)}{3}.$` },
    ],
  },
  {
    slug: "telescoping-partial-fractions",
    title: "部分分数で telescoping",
    unit: "数列",
    difficulty: "B",
    tagline: "差に分けて雪崩",
    hasGraph: false,
    tags: ["シグマ", "部分分数分解", "telescoping"],
    statement: r`$\displaystyle\sum_{k=1}^{n}\frac{1}{k(k+1)}$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 部分分数", body: r`$\dfrac{1}{k(k+1)}=\dfrac1k-\dfrac1{k+1}$ と分けると、隣り合う項が打ち消し合う。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\left(1-\dfrac12\right)+\left(\dfrac12-\dfrac13\right)+\cdots$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\displaystyle\sum_{k=1}^{n}\left(\frac1k-\frac1{k+1}\right)=1-\frac1{n+1}=\frac{n}{n+1}.$` },
    ],
  },
  {
    slug: "recurrence-linear-fixed-point",
    title: "漸化式 aₙ₊₁ = 2aₙ + 3",
    unit: "数列",
    difficulty: "B",
    tagline: "特性方程式で等比に",
    hasGraph: false,
    tags: ["漸化式", "等比数列"],
    statement: r`$a_1=1,\ a_{n+1}=2a_n+3$ で定まる数列の一般項 $a_n$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 不動点でずらす", body: r`$x=2x+3$ の解 $x=-3$ を使い、$a_n+3$ が等比数列になるように変形する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$a_{n+1}+3=2(a_n+3)$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$a_{n+1}+3=2(a_n+3)$ より $\{a_n+3\}$ は公比 $2$ の等比数列。初項 $a_1+3=4$ だから
$$a_n+3=4\cdot2^{n-1}=2^{n+1}\Rightarrow a_n=2^{n+1}-3.$$` },
    ],
  },

  // ============================== C (4) ==============================
  {
    slug: "sum-arithmetic-geometric",
    title: "(等差)×(等比) の和",
    unit: "数列",
    difficulty: "C",
    tagline: "S − rS でずらす",
    hasGraph: false,
    tags: ["シグマ", "等比数列"],
    statement: r`$\displaystyle S=\sum_{k=1}^{n}k\cdot2^{k-1}$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 公比倍してずらす", body: r`$(\text{等差})\times(\text{等比})$ の和は、$S$ と $2S$ をずらして引くと等比数列の和に化ける。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$S-2S$ を計算し、$\displaystyle\sum 2^{k}$ の形を作る。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$S=\displaystyle\sum_{k=1}^{n}k\,2^{k-1}$、$2S=\displaystyle\sum_{k=1}^{n}k\,2^{k}$。辺々引くと
$$S-2S=\sum_{k=1}^{n}k\,2^{k-1}-\sum_{k=1}^{n}k\,2^{k}=\sum_{k=1}^{n}2^{k-1}-n\,2^{n}=(2^{n}-1)-n\,2^{n}.$$
よって $-S=(2^n-1)-n2^n$、すなわち $S=(n-1)2^{n}+1$。` },
    ],
  },
  {
    slug: "recurrence-to-geometric",
    title: "漸化式 aₙ₊₁ = 3aₙ − 2",
    unit: "数列",
    difficulty: "C",
    tagline: "不動点 1 でずらす",
    hasGraph: false,
    tags: ["漸化式", "等比数列"],
    statement: r`$a_1=2,\ a_{n+1}=3a_n-2$ で定まる数列の一般項 $a_n$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 不動点", body: r`$x=3x-2$ の解 $x=1$ で $a_n-1$ が等比数列になる。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$a_{n+1}-1=3(a_n-1)$、初項 $a_1-1=1$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$a_{n+1}-1=3(a_n-1)$ より $\{a_n-1\}$ は公比 $3$、初項 $1$ の等比数列。
$a_n-1=3^{n-1}\Rightarrow a_n=3^{n-1}+1$。` },
    ],
  },
  {
    slug: "difference-sequence",
    title: "階差数列から一般項",
    unit: "数列",
    difficulty: "C",
    tagline: "aₙ = a₁ + Σ階差",
    hasGraph: false,
    tags: ["階差数列", "シグマ"],
    statement: r`$a_1=1$ で、階差が $a_{n+1}-a_n=2n$（$n\ge1$）である数列の一般項 $a_n$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 階差の和", body: r`$n\ge2$ で $a_n=a_1+\displaystyle\sum_{k=1}^{n-1}(a_{k+1}-a_k)=a_1+\sum_{k=1}^{n-1}2k$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\displaystyle\sum_{k=1}^{n-1}2k=2\cdot\dfrac{(n-1)n}{2}=n(n-1)$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$n\ge2$ のとき $a_n=1+\displaystyle\sum_{k=1}^{n-1}2k=1+n(n-1)=n^2-n+1$。
$n=1$ でも $1^2-1+1=1=a_1$ なので、$a_n=n^2-n+1$（すべての $n\ge1$）。` },
    ],
  },
  {
    slug: "general-term-from-sum",
    title: "和 Sₙ から一般項",
    unit: "数列",
    difficulty: "C",
    tagline: "aₙ = Sₙ − Sₙ₋₁",
    hasGraph: false,
    tags: ["数列の和", "一般項"],
    statement: r`数列 $\{a_n\}$ の初項から第 $n$ 項までの和が $S_n=n^2+2n$ であるとき、一般項 $a_n$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 和の差", body: r`$n\ge2$ で $a_n=S_n-S_{n-1}$。$n=1$ は $a_1=S_1$ で別に確認する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$S_n-S_{n-1}=(n^2+2n)-\bigl((n-1)^2+2(n-1)\bigr)$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$n\ge2$：$a_n=S_n-S_{n-1}=(n^2+2n)-(n^2-2n+1+2n-2)=2n+1$。
$n=1$：$a_1=S_1=3=2\cdot1+1$ で一致。よって $a_n=2n+1$（すべての $n\ge1$）。` },
    ],
  },

  // ============================== D (2) ==============================
  {
    slug: "recurrence-reciprocal",
    title: "逆数をとる漸化式",
    unit: "数列",
    difficulty: "D",
    tagline: "1/aₙ が等差数列",
    hasGraph: false,
    tags: ["漸化式", "等差数列", "置き換え"],
    statement: r`$a_1=1,\ a_{n+1}=\dfrac{a_n}{2a_n+1}$ で定まる数列の一般項 $a_n$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 逆数をとる", body: r`$a_n>0$ を確かめ、両辺の逆数をとると $\dfrac1{a_{n+1}}=2+\dfrac1{a_n}$。$b_n=\dfrac1{a_n}$ は等差数列。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$b_1=\dfrac1{a_1}=1$、公差 $2$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`帰納的に $a_n>0$。逆数をとると
$$\frac1{a_{n+1}}=\frac{2a_n+1}{a_n}=2+\frac1{a_n}.$$
$b_n=\dfrac1{a_n}$ とおくと $b_{n+1}=b_n+2$、$b_1=1$ より $b_n=1+2(n-1)=2n-1$。
よって $a_n=\dfrac1{2n-1}$。` },
    ],
  },
  {
    slug: "induction-sum-cubes",
    title: "数学的帰納法で Σk³",
    unit: "数列",
    difficulty: "D",
    tagline: "n のドミノを倒す",
    hasGraph: false,
    tags: ["数学的帰納法", "シグマ"],
    statement: r`すべての自然数 $n$ について $\displaystyle\sum_{k=1}^{n}k^3=\left(\frac{n(n+1)}{2}\right)^2$ が成り立つことを、数学的帰納法で示せ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 2 段構え", body: r`(i) $n=1$ で成立を確認。(ii) $n=m$ で成立を仮定し、$n=m+1$ で成立を導く。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`仮定の両辺に $(m+1)^3$ を足し、$\left(\dfrac{(m+1)(m+2)}{2}\right)^2$ になることを示す。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`**(i)** $n=1$：左辺 $=1$、右辺 $=\left(\dfrac{1\cdot2}{2}\right)^2=1$。成立。

**(ii)** $n=m$ で $\displaystyle\sum_{k=1}^{m}k^3=\left(\dfrac{m(m+1)}{2}\right)^2$ と仮定する。両辺に $(m+1)^3$ を加えると
$$\sum_{k=1}^{m+1}k^3=\frac{m^2(m+1)^2}{4}+(m+1)^3=\frac{(m+1)^2\bigl[m^2+4(m+1)\bigr]}{4}=\frac{(m+1)^2(m+2)^2}{4}=\left(\frac{(m+1)(m+2)}{2}\right)^2.$$
これは $n=m+1$ の場合の式。よって (i)(ii) からすべての自然数 $n$ で成立する。$\blacksquare$` },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "factorial-telescoping-sum",
    title: "階乗の telescoping 和",
    unit: "数列",
    difficulty: "D_PLUS",
    tagline: "k/(k+1)! = 1/k! − 1/(k+1)!",
    hasGraph: false,
    tags: ["シグマ", "telescoping", "階乗"],
    statement: r`$\displaystyle\sum_{k=1}^{n}\frac{k}{(k+1)!}$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 分子を分母に合わせる", body: r`分子 $k=(k+1)-1$ と書くと、各項が「前の階乗の逆数 − 次の階乗の逆数」の差に分かれる。` },
      { type: "EXPERIMENT", order: 1, title: "実験 — 1 項を分解", body: r`$\dfrac{k}{(k+1)!}=\dfrac{(k+1)-1}{(k+1)!}=\dfrac{k+1}{(k+1)!}-\dfrac1{(k+1)!}=\dfrac1{k!}-\dfrac1{(k+1)!}$。` },
      { type: "HINT", order: 2, title: "ヒント", body: r`$\displaystyle\sum_{k=1}^{n}\left(\frac1{k!}-\frac1{(k+1)!}\right)$ は両端だけが残る。` },
      { type: "SOLUTION", order: 3, title: "厳密な解答", body: r`各項を
$$\frac{k}{(k+1)!}=\frac{(k+1)-1}{(k+1)!}=\frac1{k!}-\frac1{(k+1)!}$$
と変形する。これを $k=1$ から $n$ まで加えると、隣り合う項が打ち消し合って
$$\sum_{k=1}^{n}\frac{k}{(k+1)!}=\frac1{1!}-\frac1{(n+1)!}=1-\frac{1}{(n+1)!}.$$
$\blacksquare$

**美しさ:** 分子をほんの少し書き換える「$k=(k+1)-1$」だけで、複雑に見える階乗の和が一気に両端へ崩れ落ちる。$n\to\infty$ では和が $1$ に収束することも、この形から一目で分かる。` },
    ],
  },

  // ============================== 数列の発展（拡張）==============================
  {
    slug: "grouped-sequence-term",
    title: "群数列：第 N 項の特定",
    unit: "数列",
    difficulty: "D",
    tagline: "三角数で群を区切り、位置を逆算する",
    hasGraph: false,
    tags: ["群数列", "シグマ", "場合分け"],
    statement: r`正の整数を $\ \mid 1\mid 2,3\mid 4,5,6\mid 7,8,9,10\mid\cdots\ $ のように、第 $g$ 群が $g$ 個の数を含むように区切る。第 $100$ 項は第何群の第何項か。また第 $10$ 群に含まれる数の総和を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 群の終わりは三角数",
        body: r`第 $g$ 群までに並ぶ項の総数は $1+2+\cdots+g=\dfrac{g(g+1)}{2}$（三角数 $T_g$）。第 $N$ 項が属する群 $g$ は「$T_{g-1}<N\le T_g$」をみたす $g$。位置は $j=N-T_{g-1}$。各項の値はもとの整数列なので、第 $N$ 項の値はそのまま $N$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 群の境界を数える",
        body: r`下のラボでスライダー $N$ を動かすと、第 $N$ 項がどの群の何番目かが浮かび上がる。$T_g=\dfrac{g(g+1)}{2}$ を順に作ると $T_{13}=91,\ T_{14}=105$。$91<100\le105$ だから第 $100$ 項は第 $14$ 群、位置 $100-91=9$ 番目、と当たりがつく。

@@lab:grouped-sequence@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$T_{13}=\dfrac{13\cdot14}{2}=91$、$T_{14}=105$。第 $10$ 群は第 $T_9+1=46$ 項から第 $T_{10}=55$ 項まで（値も $46\sim55$）。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**第 100 項の位置。** $T_g=\dfrac{g(g+1)}{2}$ とおく。$T_{13}=\dfrac{13\cdot14}{2}=91$、$T_{14}=\dfrac{14\cdot15}{2}=105$。$91<100\le105$ より第 $100$ 項は**第 $14$ 群**に属し、群内の位置は
$$j=100-T_{13}=100-91=9\ \text{番目}.$$
（値そのものは第 $100$ 項なので $100$。）

**第 10 群の総和。** 第 $10$ 群は第 $T_9+1$ 項から第 $T_{10}$ 項まで。$T_9=\dfrac{9\cdot10}{2}=45$、$T_{10}=55$ なので、含まれる値は $46,47,\dots,55$ の $10$ 個（連続整数）。総和は
$$\sum_{k=46}^{55}k=\frac{(46+55)\cdot10}{2}=\frac{101\cdot10}{2}=505.$$

**メタ。** 群数列は「累積項数＝三角数 $T_g$ で群の境界を押さえる」が全て。第 $N$ 項の群は $T_{g-1}<N\le T_g$ の不等式で挟み、群内位置は引き算 $N-T_{g-1}$。値の数列が等差・等比でも、この“境界の三角数”さえ作れば位置と値が機械的に出る。`,
      },
    ],
  },
  {
    slug: "probability-recurrence-triangle",
    title: "【初見】確率漸化式と極限（三角形の頂点）",
    unit: "数列",
    difficulty: "D",
    tagline: "n 回後の確率は、−1/2 で振動して 1/3 へ",
    hasGraph: false,
    isMockOnly: true,
    tags: ["確率漸化式", "極限", "等比数列"],
    statement: r`正三角形 $\mathrm{ABC}$ の頂点上を動く点 $\mathrm P$ がある。$\mathrm P$ は毎回、現在いる頂点以外の 2 頂点のいずれかへ等確率 $\dfrac12$ ずつ移動する。最初 $\mathrm P$ は $\mathrm A$ にいる。$n$ 回移動した後に $\mathrm P$ が $\mathrm A$ にいる確率 $a_n$ を求め、$\displaystyle\lim_{n\to\infty}a_n$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 1 回の遷移を漸化式に",
        body: r`$n$ 回後に $\mathrm A$ にいる確率を $a_n$ とする。$n+1$ 回後に $\mathrm A$ にいるのは、$n$ 回後に $\mathrm A$ **以外**（確率 $1-a_n$）にいて、そこから $\mathrm A$ へ来る（確率 $\dfrac12$）場合だけ。よって $a_{n+1}=\dfrac12(1-a_n)$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 分布が 1/3 へ振動収束",
        body: r`下のラボでステップ $n$ を進めると、3 頂点の確率（ディスクの大きさ）が振動しながら一様 $\dfrac13$ に近づく。$a_0=1,\ a_1=0,\ a_2=\dfrac12,\ a_3=\dfrac14,\ a_4=\dfrac38,\dots$ と、$\dfrac13$ を挟んで上下に揺れることを観察できる。

@@lab:prob-state-transition@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 不動点でずらす",
        body: r`$a_{n+1}=-\dfrac12 a_n+\dfrac12$。不動点 $x=-\dfrac12 x+\dfrac12\Rightarrow x=\dfrac13$。$a_n-\dfrac13$ が公比 $-\dfrac12$ の等比数列。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**漸化式。** $n+1$ 回後に $\mathrm A$ にいるのは、$n$ 回後に $\mathrm A$ 以外（確率 $1-a_n$）にいて $\mathrm A$ へ移る（確率 $\dfrac12$）場合に限るから
$$a_{n+1}=\frac12(1-a_n)=-\frac12 a_n+\frac12.$$
**不動点でずらす。** $x=-\dfrac12 x+\dfrac12$ より $x=\dfrac13$。両辺から引くと
$$a_{n+1}-\frac13=-\frac12\Bigl(a_n-\frac13\Bigr).$$
よって $\Bigl\{a_n-\dfrac13\Bigr\}$ は公比 $-\dfrac12$ の等比数列。初項は $a_0-\dfrac13=1-\dfrac13=\dfrac23$ なので
$$a_n-\frac13=\frac23\Bigl(-\frac12\Bigr)^n,\qquad a_n=\frac13+\frac23\Bigl(-\frac12\Bigr)^n.$$
**極限。** $\left|-\dfrac12\right|<1$ より $\Bigl(-\dfrac12\Bigr)^n\to0$、ゆえに
$$\lim_{n\to\infty}a_n=\frac13.$$

**メタ。** 確率漸化式は「1 回の遷移で場合分け → $a_{n+1}=pa_n+q$ 型 → 不動点でずらして等比」が定石。極限が一様分布 $\dfrac13$ なのは対称性の必然で、振動（公比が負）して収束するのも符号 $-\dfrac12$ が語る。$b_n=c_n=\dfrac{1-a_n}{2}$ も同時に求まる。`,
      },
    ],
  },
  {
    slug: "three-term-recurrence",
    title: "隣接3項間漸化式（特性方程式）",
    unit: "数列",
    difficulty: "C",
    tagline: "2 つの特性解で、2 本の等比に分ける",
    hasGraph: false,
    tags: ["漸化式", "特性方程式", "等比数列"],
    statement: r`$a_1=1,\ a_2=3$、$a_{n+2}=5a_{n+1}-6a_n$ で定まる数列の一般項 $a_n$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 特性方程式の 2 解",
        body: r`$a_{n+2}=5a_{n+1}-6a_n$ に対し、$a_n=x^n$ を代入する形の**特性方程式** $x^2=5x-6$ を解く。2 解 $\alpha,\beta$ を使うと、漸化式は $a_{n+2}-\alpha a_{n+1}=\beta(a_{n+1}-\alpha a_n)$ のように 2 本の等比に分解できる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 2 通りの等比を作る",
        body: r`$x^2-5x+6=(x-2)(x-3)=0$ より $\alpha=2,\beta=3$。すると
$$a_{n+2}-2a_{n+1}=3(a_{n+1}-2a_n),\qquad a_{n+2}-3a_{n+1}=2(a_{n+1}-3a_n).$$
それぞれ $\{a_{n+1}-2a_n\}$、$\{a_{n+1}-3a_n\}$ が等比数列。初項を入れて 2 式を連立すれば $a_n$ が出る、と見通す。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$a_{n+1}-2a_n=(a_2-2a_1)3^{n-1}=1\cdot3^{n-1}$、$a_{n+1}-3a_n=(a_2-3a_1)2^{n-1}=0\cdot2^{n-1}=0$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`特性方程式 $x^2-5x+6=(x-2)(x-3)=0$ の解は $\alpha=2,\ \beta=3$。漸化式を 2 通りに変形する。

**(i)** $a_{n+2}-3a_{n+1}=2(a_{n+1}-3a_n)$。$\{a_{n+1}-3a_n\}$ は公比 $2$ の等比数列で、初項 $a_2-3a_1=3-3=0$。よって $a_{n+1}-3a_n=0$。

すでに **(i)** から $a_{n+1}=3a_n$、初項 $a_1=1$ なので
$$a_n=3^{n-1}.$$

**検算。** $a_1=1,\ a_2=3,\ a_3=9$。漸化式 $a_3=5a_2-6a_1=15-6=9$ で一致。一般に $a_{n+2}=5\cdot3^{n}-6\cdot3^{n-1}=3^{n-1}(15-6)=9\cdot3^{n-1}=3^{n+1}$ で $a_{n+2}=3^{(n+2)-1}$ も成立。

**メタ。** 隣接 3 項間漸化式は「特性方程式 $x^2=px+q$ の 2 解で 2 本の等比に分ける」が王道。今回は片方の初項がたまたま $0$ になり一発で決まったが、一般には 2 本の等比 $a_{n+1}-\alpha a_n,\ a_{n+1}-\beta a_n$ を連立して $a_n$ を解く。重解のときは $a_n=(\text{1 次})\cdot\alpha^{n}$ の形になる、という分岐まで押さえると完璧。`,
      },
    ],
  },
];
