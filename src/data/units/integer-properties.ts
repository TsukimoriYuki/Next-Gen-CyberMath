import type { Problem } from "@/lib/types";

// 数学A「整数の性質」— 20 問。
// 図で本質が見える C 以上の3問（互除法・一次不定方程式・合同式）にラボを付ける。
// 組合せは \binom を用いる（前置下付き {} は "$" 直後の "{" 問題を避けるため）。
const r = String.raw;

export const integerProperties: Problem[] = [
  // ============================== A (5) ==============================
  {
    slug: "prime-factorization",
    title: "素因数分解",
    unit: "整数の性質",
    difficulty: "A",
    tagline: "数を素数の積に分解する",
    hasGraph: false,
    statement: r`$360$ を素因数分解せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 小さい素数で割る",
        body: r`$2,3,5,\dots$ と小さい素数から順に割っていく。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$360=2\cdot180=2^2\cdot90=\cdots$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$360=2^3\cdot3^2\cdot5$。`,
      },
    ],
  },
  {
    slug: "gcd-lcm-from-factorization",
    title: "素因数分解で GCD と LCM",
    unit: "整数の性質",
    difficulty: "A",
    tagline: "共通部分が GCD、全部入りが LCM",
    hasGraph: false,
    statement: r`$24$ と $36$ の最大公約数と最小公倍数を、素因数分解を用いて求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 指数の min と max",
        body: r`各素数について、最大公約数は指数の小さい方、最小公倍数は大きい方をとる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$24=2^3\cdot3,\ 36=2^2\cdot3^2$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\gcd=2^2\cdot3=12$、$\mathrm{lcm}=2^3\cdot3^2=72$。`,
      },
    ],
  },
  {
    slug: "divisor-count",
    title: "約数の個数",
    unit: "整数の性質",
    difficulty: "A",
    tagline: "指数に 1 を足して掛ける",
    hasGraph: false,
    statement: r`$72$ の正の約数の個数を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 各素数の指数の選び方",
        body: r`$n=p^a q^b$ の約数は、$p$ を $0\sim a$ 個、$q$ を $0\sim b$ 個選んで作るので、個数は $(a+1)(b+1)$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$72=2^3\cdot3^2$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$72=2^3\cdot3^2$ より、約数の個数は $(3+1)(2+1)=12$ 個。`,
      },
    ],
  },
  {
    slug: "binary-to-decimal",
    title: "2 進法を 10 進法に",
    unit: "整数の性質",
    difficulty: "A",
    tagline: "位ごとに 2 のべきを掛ける",
    hasGraph: false,
    statement: r`2 進法で表された数 $1011_{(2)}$ を 10 進法で表せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 位取り",
        body: r`各桁に $2^3,2^2,2^1,2^0$ の重みを掛けて足す。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$1\cdot2^3+0\cdot2^2+1\cdot2^1+1\cdot2^0$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$1011_{(2)}=8+0+2+1=11$。`,
      },
    ],
  },
  {
    slug: "divisibility-rule-three",
    title: "3 の倍数の判定",
    unit: "整数の性質",
    difficulty: "A",
    tagline: "各位の和が 3 の倍数",
    hasGraph: false,
    statement: r`4 桁の整数 $201X$（一の位が $X$）が 3 の倍数になるような 1 桁の数 $X\ (0\le X\le9)$ をすべて求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 各位の和",
        body: r`整数が 3 の倍数 $\iff$ 各位の数の和が 3 の倍数。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`各位の和は $2+0+1+X=3+X$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`各位の和 $3+X$ が 3 の倍数になるのは $X$ が 3 の倍数のとき。よって $X=0,3,6,9$。`,
      },
    ],
  },

  // ============================== B (6) ==============================
  {
    slug: "divisor-sum",
    title: "約数の総和",
    unit: "整数の性質",
    difficulty: "B",
    tagline: "等比和の積で一気に",
    hasGraph: false,
    statement: r`$12$ の正の約数の総和を求めよ。また、$n=p^a q^b$（$p,q$ は異なる素数）の約数の総和を表す式を述べよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 展開すると全約数",
        body: r`$(1+p+\cdots+p^a)(1+q+\cdots+q^b)$ を展開すると、各約数がちょうど 1 回ずつ現れる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$12=2^2\cdot3$。$(1+2+4)(1+3)$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$12=2^2\cdot3$ より総和 $=(1+2+4)(1+3)=7\cdot4=28$。
一般に $n=p^a q^b$ の約数の総和は $(1+p+\cdots+p^a)(1+q+\cdots+q^b)$。`,
      },
    ],
  },
  {
    slug: "euclidean-gcd-number",
    title: "互除法で最大公約数",
    unit: "整数の性質",
    difficulty: "B",
    tagline: "割って余り、を繰り返す",
    hasGraph: false,
    statement: r`ユークリッドの互除法を用いて、$1071$ と $1029$ の最大公約数を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 余りに置き換える",
        body: r`$\gcd(a,b)=\gcd(b,\ a\bmod b)$。大きい方を割った余りに置き換え、余りが $0$ になる直前の数が最大公約数。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$1071=1029\cdot1+42$、$1029=42\cdot24+21$、$42=21\cdot2$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$1071=1029\cdot1+42$、$1029=42\cdot24+21$、$42=21\cdot2+0$。
余りが $0$ になる直前の除数は $21$。よって $\gcd(1071,1029)=21$。`,
      },
    ],
  },
  {
    slug: "units-digit-power",
    title: "べき乗の一の位",
    unit: "整数の性質",
    difficulty: "B",
    tagline: "一の位は周期で回る",
    hasGraph: false,
    statement: r`$7^{100}$ の一の位の数字を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 一の位の周期",
        body: r`$7^n$ の一の位は $7,9,3,1,7,9,3,1,\dots$ と周期 $4$ で繰り返す。指数を $4$ で割った余りで決まる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$100=4\cdot25$ なので $100\equiv0\pmod4$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`一の位は周期 $4$：$7^1\to7,\ 7^2\to9,\ 7^3\to3,\ 7^4\to1$。$100\equiv0\pmod4$ なので $7^4$ と同じ、一の位は $1$。`,
      },
    ],
  },
  {
    slug: "decimal-to-binary",
    title: "10 進法を 2 進法に",
    unit: "整数の性質",
    difficulty: "B",
    tagline: "2 で割った余りを並べる",
    hasGraph: false,
    statement: r`10 進法の $45$ を 2 進法で表せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 2 のべきの和に分ける",
        body: r`$2$ で割った余りを下の位から並べる、または $2$ のべきの和に分解する。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$45=32+8+4+1=2^5+2^3+2^2+2^0$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$45=2^5+2^3+2^2+2^0$ なので $45=101101_{(2)}$。`,
      },
    ],
  },
  {
    slug: "consecutive-two-even",
    title: "連続 2 整数の積は偶数",
    unit: "整数の性質",
    difficulty: "B",
    tagline: "偶奇のどちらかは必ず偶数",
    hasGraph: false,
    statement: r`連続する 2 つの整数の積 $n(n+1)$ は必ず 2 の倍数であることを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 偶奇で場合分け",
        body: r`連続する 2 整数のうち一方は必ず偶数。その偶数を含む積は 2 の倍数。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$n$ が偶数か奇数かで分ける。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$n$ が偶数なら $n$ が $2$ の倍数で、積 $n(n+1)$ も $2$ の倍数。
$n$ が奇数なら $n+1$ が偶数で、やはり積は $2$ の倍数。
いずれの場合も $n(n+1)$ は $2$ の倍数。$\blacksquare$`,
      },
    ],
  },
  {
    slug: "lcm-period",
    title: "最小公倍数の応用（周期）",
    unit: "整数の性質",
    difficulty: "B",
    tagline: "次に揃うのは LCM 後",
    hasGraph: false,
    statement: r`ある駅では電車 A が $12$ 分ごと、電車 B が $18$ 分ごとに発車する。両方が同時に発車したあと、次に同時に発車するのは何分後か。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 両方の倍数",
        body: r`同時発車する時刻は $12$ の倍数かつ $18$ の倍数。次に揃うのは最小公倍数の時刻。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$12=2^2\cdot3,\ 18=2\cdot3^2$。$\mathrm{lcm}=2^2\cdot3^2$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\mathrm{lcm}(12,18)=2^2\cdot3^2=36$。よって $36$ 分後。`,
      },
    ],
  },

  // ============================== C (5) ==============================
  {
    slug: "euclidean-gcd-visual",
    title: "互除法と長方形の正方形分割",
    unit: "整数の性質",
    difficulty: "C",
    tagline: "互除法は正方形タイル貼り",
    hasGraph: true,
    graphKey: "euclidean-algorithm",
    statement: r`ユークリッドの互除法を用いて $12$ と $8$ の最大公約数を求めよ。また、互除法が「長方形を正方形で敷き詰める」操作に対応することを説明せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 余り＝残りの長方形",
        body: r`$a\times b$ の長方形から一辺 $b$ の正方形を切り取ると、残りは $(a\bmod b)\times b$ の長方形。これを繰り返すのが互除法。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 正方形で敷き詰める",
        body: r`ラボで $a,b$ を変えると、$a\times b$ の長方形が最大の正方形で次々に埋まる。最後に残る最小の正方形の一辺が $\gcd(a,b)$ になることを確かめよう。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$12=8\cdot1+4$、$8=4\cdot2$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$12=8\cdot1+4$、$8=4\cdot2+0$ より $\gcd(12,8)=4$。
これは $12\times8$ の長方形から $8\times8$ の正方形を 1 個切り取り、残った $4\times8$ から $4\times4$ の正方形を 2 個切り取って埋め尽くす操作に対応する。最後の正方形の一辺 $4$ が最大公約数。

**メタ。** 互除法は「$\gcd(a,b)=\gcd(b,\ a\bmod b)$」を余りが $0$ になるまで繰り返すだけの、ユークリッド以来 2000 年以上使われる最古級のアルゴリズム。正方形タイル貼り（連分数展開と同じ）という幾何像を持てば、“なぜ必ず終わるか（余りは厳密に減る非負整数列）”も腑に落ちる。次の一次不定方程式は、この互除法を逆にたどって特殊解を作る。`,
      },
    ],
  },
  {
    slug: "linear-diophantine-solve",
    title: "一次不定方程式を解く",
    unit: "整数の性質",
    difficulty: "C",
    tagline: "1 組見つけて、引き算で一般解",
    hasGraph: true,
    graphKey: "linear-diophantine",
    statement: r`不定方程式 $3x+5y=1$ の整数解をすべて求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 特殊解からの差",
        body: r`まず 1 組の整数解を見つける。一般の解との差をとると右辺が $0$ になり、係数の関係から解の周期が決まる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 直線上の格子点",
        body: r`ラボでは直線 $ax+by=c$ 上の格子点が整数解。$\gcd(a,b)$ が $c$ を割り切るときだけ格子点が現れ、解は一定間隔で並ぶ。$3$ と $5$ は互いに素なので $3x+5y=1$ は必ず解をもつ。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$3\cdot2+5\cdot(-1)=1$。辺々引くと $3(x-2)+5(y+1)=0$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$x=2,\ y=-1$ は 1 つの解（$3\cdot2+5\cdot(-1)=1$）。一般の解との差をとると
$$3(x-2)+5(y+1)=0\ \Rightarrow\ 3(x-2)=-5(y+1).$$
$3$ と $5$ は互いに素なので $x-2$ は $5$ の倍数。$x-2=5t$ とおくと $y+1=-3t$。よって
$$x=2+5t,\quad y=-1-3t\quad(t\ \text{は整数}).$$

**メタ。** 一次不定方程式 $ax+by=c$ が整数解をもつ $\iff \gcd(a,b)\mid c$。手順は「①互除法で 1 組の特殊解を作る ②一般解は特殊解 $+\,t\!\left(\dfrac{b}{g},\,-\dfrac{a}{g}\right)$」（$g=\gcd(a,b)$）。係数が大きいときは互除法を逆代入して特殊解を得る。解が一定間隔で直線上に並ぶ幾何像（ラボの格子点）と完全に一致する。`,
      },
    ],
  },
  {
    slug: "congruence-day-of-week",
    title: "合同式で曜日を求める",
    unit: "整数の性質",
    difficulty: "C",
    tagline: "曜日は法 7 の世界",
    hasGraph: true,
    graphKey: "modular-clock",
    statement: r`ある日が土曜日であるとき、その日から $100$ 日後は何曜日か。合同式（法 $7$）を用いて求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 7 日で 1 周",
        body: r`曜日は $7$ 日周期。$100$ 日後は「$100$ を $7$ で割った余り」だけ進んだ曜日に等しい。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 時計であまりを見る",
        body: r`ラボで法 $m=7$、$k=100$ にすると、$100$ 歩進んだ先が $100\bmod 7$ の位置に着く。合同式 $100\equiv2\ (\mathrm{mod}\ 7)$ を目で確かめよう。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$100=7\cdot14+2$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$100=7\cdot14+2$ なので $100\equiv2\pmod7$。土曜日の $2$ 日後だから、求める曜日は **月曜日**。

**メタ。** 合同式は「余りだけの世界（法 $m$）」で足し算・掛け算が自由にできる強力な道具。周期的なもの（曜日・時計・べき乗の一の位）はすべて法 $m$ の合同式に乗る。$a\equiv b\pmod m$ なら $a^k\equiv b^k$ も成り立つので、$7^{100}$ の一の位のような巨大数の余りも一気に計算できる。`,
      },
    ],
  },
  {
    slug: "smallest-with-divisor-count",
    title: "約数を 15 個もつ最小の数",
    unit: "整数の性質",
    difficulty: "C",
    tagline: "大きい指数は小さい素数へ",
    hasGraph: false,
    statement: r`正の約数をちょうど $15$ 個もつ最小の正の整数を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 約数の個数を逆に使う",
        body: r`$n=p^a q^b\cdots$ の約数の個数は $(a+1)(b+1)\cdots$。これを $15$ にする「指数の組」を全部出し、その中で値が最小になる素因数の割り当てを探す。$15$ の分解は $15$ または $3\times5$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 大きい指数は小さい素数へ",
        body: r`指数の組 $\{2,4\}$ を $2,3$ に割り当てる 2 通りを比べる：$2^4\cdot3^2=144$ と $2^2\cdot3^4=4\cdot81=324$。大きい指数 $4$ を小さい素数 $2$ に乗せたほうが小さい。指数の組 $\{14\}$ なら $2^{14}=16384$ で論外。「大きい指数を小さい素数へ」という最小化の感覚を手で確かめる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$15=3\times5$ なら指数は $2,4$。$2^4\cdot3^2$ と $2^2\cdot3^4$ を比べる。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`約数の個数を $15$ にする指数の組は、$15=3\times5$ より $(a+1,b+1)=(3,5)$、すなわち指数 $\{2,4\}$（または $15=15$ で指数 $\{14\}$）。値を最小化するには、**小さい素数に大きい指数**を割り当てる：
$$2^4\cdot3^2=16\cdot9=144.$$
$2^2\cdot3^4=324$、$2^{14}=16384$ はいずれも大きい。よって最小の数は $\boxed{144}$。

**メタ。** 「約数の個数 $\to$ 指数の組 $\to$ 素因数への最適割り当て」は、約数まわりの最小・最大問題の定石。大きい指数を小さい素数に乗せるのは、$2<3<5<\cdots$ という素数の大小が値に効くから——“貪欲法”が最適になる典型例である。`,
      },
    ],
  },
  {
    slug: "square-mod-three",
    title: "平方数を 3 で割った余り",
    unit: "整数の性質",
    difficulty: "C",
    tagline: "余りで分類して調べる",
    hasGraph: false,
    statement: r`すべての整数 $n$ について、$n^2$ を $3$ で割った余りは $0$ または $1$ であることを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — n を余りで分類すれば有限個",
        body: r`整数は無限にあるが、「$3$ で割った余り」で見れば $0,1,2$ の **3 種類だけ**。$n^2$ の余りは $n$ の余りだけで決まるので、3 通りを調べれば全整数を尽くせる。これが合同式による“余りでの場合分け”の威力。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 平方は 2 に来ないことを見る",
        body: r`下のラボでスライダー $n$ を動かすと、$n^2\bmod 3$ のマーカーが $0$ と $1$（緑）だけを行き来し、$2$（マゼンタ）には決して来ない。$0,1,4,9,16,25,\dots$ の余りが $0,1,1,0,1,1,\dots$ と $\{0,1\}$ だけに現れることを目で確かめる。

@@lab:quadratic-residue-mod3@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$n=3k,\ 3k+1,\ 3k+2$ と表して $n^2$ を計算。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$n$ を $3$ で割った余りで分類する。

$n=3k$ のとき $n^2=9k^2=3(3k^2)\equiv0\pmod3$。

$n=3k\pm1$ のとき $n^2=9k^2\pm6k+1=3(3k^2\pm2k)+1\equiv1\pmod3$。

以上で全整数を尽くし、$n^2$ を $3$ で割った余りは $0$ または $1$ のみ。**$2$ は決して現れない**。$\blacksquare$

**メタ。** 「平方剰余」——平方数が法 $m$ で取りうる余りは限られる——は整数論の超頻出テーマ。$n^2\bmod 3\in\{0,1\}$ という一事実が、次のピタゴラス数の問題（$a^2+b^2=c^2$ で $a$ か $b$ が $3$ の倍数）を即座に解く鍵になる。法 $4$ なら平方は $\{0,1\}$、法 $8$ なら奇数の平方は $1$、と覚えておくと応用が利く。`,
      },
    ],
  },

  // ============================== D (3) ==============================
  {
    slug: "diophantine-word-problem",
    title: "不定方程式の応用（買い物）",
    unit: "整数の性質",
    difficulty: "D",
    tagline: "非負整数解をすべて拾う",
    hasGraph: false,
    statement: r`$1$ 個 $30$ 円のチョコと $1$ 個 $50$ 円のグミを合わせて買い、ちょうど $580$ 円にしたい。チョコ $x$ 個、グミ $y$ 個（$x,y\ge0$ の整数）の買い方をすべて求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 約分して、合同式と範囲で絞る",
        body: r`$30x+50y=580$ は $10$ で割って $3x+5y=58$。文章題なので $x,y\ge0$ の整数解だけが欲しい。「$58-5y$ が $3$ の倍数」という合同条件と、「$x,y\ge0$」という範囲条件の 2 つで候補を有限個に絞る。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 範囲と周期で候補を狭める",
        body: r`まず範囲：$3x=58-5y\ge0$ より $y\le11$、かつ $y\ge0$。次に合同：$3x+5y=58$ を法 $3$ で見ると $5y\equiv58$、$2y\equiv1\equiv4\pmod3$ より $y\equiv2\pmod3$。$0\le y\le11$ で $y\equiv2$ なのは $y=2,5,8,11$ の 4 つだけ、と先に当たりをつける。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$3x=58-5y\ge0$ より $y\le11$。$58\equiv1,\ 5y\equiv2y\pmod3$ なので $2y\equiv1\pmod3$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$30x+50y=580\ \Rightarrow\ 3x+5y=58$。

**合同条件。** 法 $3$ で見ると $5y\equiv58$、すなわち $2y\equiv1\equiv4\pmod3$ より $y\equiv2\pmod3$。

**範囲条件。** $3x=58-5y\ge0$ かつ $y\ge0$ より $0\le y\le11$。

両方をみたす $y$ は $y=2,5,8,11$。それぞれ $x=\dfrac{58-5y}{3}=16,\ 11,\ 6,\ 1$。よって
$$(x,y)=(16,2),\ (11,5),\ (6,8),\ (1,11)\quad\text{の 4 通り}.$$

**メタ。** 文章題の不定方程式は「①約分 ②合同式で周期（$y$ の余り）を出す ③範囲で有限化」の 3 手。一般解 $y=2+3t$ を作って $0\le y\le11$ で $t$ を走らせても同じ 4 組が出る。非負整数解という“現実の制約”が、無限の解を有限に切り取る。`,
      },
    ],
  },
  {
    slug: "n-fifth-minus-n",
    title: "n⁵ − n は 30 の倍数",
    unit: "整数の性質",
    difficulty: "D",
    tagline: "2・3・5 で別々に割り切る",
    hasGraph: false,
    statement: r`すべての整数 $n$ について、$n^5-n$ は $30$ の倍数であることを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 30 を素因数に分けて各個撃破",
        body: r`$30=2\cdot3\cdot5$ で、$2,3,5$ は互いに素。「$30$ で割れる」を直接示すより、$n^5-n$ が $2,3,5$ それぞれの倍数であることを**別々に**示すほうが易しい。互いに素な数で割り切れれば、その積でも割り切れる（中国剰余の発想）。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 因数分解で連続整数を取り出す",
        body: r`$n^5-n=n(n^4-1)=n(n^2-1)(n^2+1)=(n-1)n(n+1)(n^2+1)$。$(n-1)n(n+1)$ は**連続 3 整数の積**なので、$2$ の倍数（連続 2 つに偶数あり）かつ $3$ の倍数（連続 3 つに 3 の倍数あり）。残る $5$ は余りで分類すればよい、と方針が立つ。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$n^5-n=(n-1)n(n+1)(n^2+1)$。連続 3 整数の積に注目すると $2,3$ で割れる。$5$ は余りで分類。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$n^5-n=n(n^4-1)=(n-1)n(n+1)(n^2+1)$。

**$2,3$ で割れること。** $(n-1)n(n+1)$ は連続 3 整数の積なので、その中に偶数があり $2$ で割れ、$3$ の倍数があり $3$ で割れる。

**$5$ で割れること。** $n\equiv0\pmod5$ なら $n$ が因数で明らか。$n\equiv\pm1,\pm2\pmod5$ では $n^2\equiv1,4$、よって $n^4=(n^2)^2\equiv1\pmod5$（フェルマーの小定理 $n^4\equiv1$）だから $n^4-1\equiv0$、すなわち $5\mid n(n^4-1)$。

よって $n^5-n$ は $2,3,5$ すべての倍数。これらは互いに素だから、$n^5-n$ は $2\cdot3\cdot5=30$ の倍数。$\blacksquare$

**メタ。** 「合成数で割り切れるか」は**互いに素な素因数に分けて各個撃破**が定石。$5$ の部分はフェルマーの小定理 $n^p\equiv n\pmod p$ の特別な場合で、一般に $n^p-n$ は $p$ で割り切れる。$30=2\cdot3\cdot5$ が“すべての $n^5-n$ を割る最大の数”であることも、各素数での成立から従う。`,
      },
    ],
  },
  {
    slug: "pythagorean-multiple-three",
    title: "ピタゴラス数と 3 の倍数",
    unit: "整数の性質",
    difficulty: "D",
    tagline: "平方は 3 で割ると 2 余らない",
    hasGraph: false,
    statement: r`$a^2+b^2=c^2$ を満たす自然数 $a,b,c$（ピタゴラス数）について、$a,b$ の少なくとも一方は $3$ の倍数であることを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 平方数の mod 3 ＋ 背理法",
        body: r`平方数を $3$ で割った余りは $0$ か $1$ のみ（$2$ は出ない）。「$a,b$ がともに $3$ の倍数でない」と仮定して、$c^2$ の余りが $2$ になってしまう矛盾を導く（背理法）。前問の平方剰余 $n^2\bmod3\in\{0,1\}$ がそのまま武器になる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 余り 1 + 余り 1 = 余り 2 の壁",
        body: r`下のラボで、平方数の余りが $\{0,1\}$ しか取らないことを確かめる。もし $a,b$ がともに $3$ の倍数でなければ $a^2\equiv1,\ b^2\equiv1$、足すと $c^2\equiv2\pmod3$。だが平方数は余り $2$ に来られない（マゼンタの $2$ には決して乗らない）——ここに矛盾が生まれる。

@@lab:quadratic-residue-mod3@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`もし $a,b$ がともに $3$ の倍数でないなら、$a^2\equiv b^2\equiv1\pmod3$。すると $c^2\equiv?$`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$a,b$ がともに $3$ の倍数でないと仮定する。平方数を $3$ で割った余りは $0$ か $1$ で、$3$ の倍数でない数の平方は $1$ だから $a^2\equiv1,\ b^2\equiv1\pmod3$。すると
$$c^2=a^2+b^2\equiv1+1=2\pmod3.$$
しかし平方数 $c^2$ を $3$ で割った余りは $0$ か $1$ で、$2$ にはなりえない。これは矛盾。
よって $a,b$ の少なくとも一方は $3$ の倍数である。$\blacksquare$

**メタ。** 「余りの世界で起こりえない等式」を突いて矛盾を導く——これが mod を使った背理法の典型。同じ論法で「ピタゴラス数では $a,b$ の一方は $4$ の倍数、いずれかは $5$ の倍数」も示せる（平方剰余を法 $4,5$ で調べる）。平方剰余の表が、整数の存在問題を一刀両断する。`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "consecutive-product-factorial",
    title: "連続 k 整数の積は k! の倍数",
    unit: "整数の性質",
    difficulty: "D_PLUS",
    tagline: "組合せは分数になれない",
    hasGraph: false,
    statement: r`連続する $k$ 個の整数の積は、$k!$ で割り切れることを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 二項係数に化ける",
        body: r`連続 $k$ 整数の積を $k!$ で割った値が、実は二項係数（組合せの個数）になっていることに気づくのがカギ。組合せの個数は分数にはなりえない。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 小さく試す",
        body: r`$k=3$、連続 3 整数 $5\cdot6\cdot7=210$。$3!=6$ で割ると $35=\binom{7}{3}$。ちゃんと整数（組合せの個数）になっている。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 階乗で書き直す",
        body: r`正の整数 $m$ について $\dfrac{(m+1)(m+2)\cdots(m+k)}{k!}=\dfrac{(m+k)!}{m!\,k!}=\binom{m+k}{k}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`連続する $k$ 整数のうち $0$ を含むなら積は $0$ で、$k!$ で割り切れる。
すべて正の場合、最小を $m+1$ とすると積は $(m+1)(m+2)\cdots(m+k)$（$m\ge0$）。これを $k!$ で割ると
$$\frac{(m+1)(m+2)\cdots(m+k)}{k!}=\frac{(m+k)!}{m!\,k!}=\binom{m+k}{k}.$$
右辺は「$m+k$ 個から $k$ 個を選ぶ場合の数」だから**整数**。よって $k!$ は積を割り切る。
すべて負の場合は積の符号が $(-1)^k$ 倍になるだけで、絶対値は正の場合に帰着するので同じく $k!$ で割り切れる。$\blacksquare$

**美しさ:** 「割り切れるか」という整数の問いが、「組合せの個数は分数になりえない」というたった一つの数え上げの事実で一刀両断される。整数論と場合の数が、二項係数という一点で握手する。

**メタ。** 「整数であることを示したい量が、実は“数えられるもの（組合せの個数）”だった」と気づくのが核心。これは存在論的・組合せ論的証明の典型で、$\dbinom{m+k}{k}$ という具体的な“もの”に対応づけた瞬間に分母 $k!$ が消える。素因数ごとに $\dfrac{(m+k)!}{m!\,k!}$ の指数を比べる（ルジャンドルの定理）数論的別証もあるが、数え上げの一行が最も鮮やか。`,
      },
    ],
  },
];
