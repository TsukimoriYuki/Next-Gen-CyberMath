import type { Problem } from "@/lib/types";

const r = String.raw;

// ── 私立文系数学パック1：5問 B〜C難度 ───────────────────────────────────────
// 対象：日東駒専・産近甲龍・MARCH・関関同立
// 単元：確率・図形と方程式・積分・数列・2次関数

export const PRIVATE_MATH_PACK_1: Problem[] = [
  // ── 問題1: 確率 B — 余事象（日東駒専）────────────────────────────────────
  {
    slug: "private-prob-card-product-even",
    title: "カードの積が偶数になる確率",
    unit: "場合の数と確率",
    difficulty: "B",
    universityGroup: "NITTOMASEN",
    university: "日東駒専（類題）",
    deviation: 50,
    tags: ["確率", "余事象", "組合せ", "私立文系"],
    backgroundTag: "余事象",
    hasGraph: false,
    tagline: "「偶数になる」より「奇数になる」を数える方が速い",
    statement: r`1 から 5 の数字が書かれた 5 枚のカードから 3 枚を無作為に選ぶとき，
選んだ 3 枚のカードの数字の積が**偶数**になる確率を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 1,
        title: "「積が偶数」を直接数えない",
        body: r`積が偶数になる場合は「少なくとも 1 枚が偶数のとき」で，場合の数が多い。

**余事象**（積が奇数になる場合）を利用する。

$$\text{積が奇数} \;\Longleftrightarrow\; \text{3枚すべてが奇数}$$`,
      },
      {
        type: "EXPERIMENT",
        order: 2,
        title: "全体と余事象を数える",
        body: r`**全体の場合の数**：5 枚から 3 枚を選ぶ

$$\binom{5}{3} = 10 \text{ 通り}$$

**余事象（積が奇数）の場合の数**：奇数カード $\{1,3,5\}$ の 3 枚すべてを選ぶ

$$\binom{3}{3} = 1 \text{ 通り}$$`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "余事象の原理で確率を求める",
        body: r`$$P(\text{積が奇数}) = \frac{1}{10}$$

$$P(\text{積が偶数}) = 1 - \frac{1}{10} = \boxed{\dfrac{9}{10}}$$`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 4,
        title: "なぜ余事象が有効なのか",
        body: r`「積が偶数」を直接数えると，偶数カードが 1 枚・2 枚・3 枚含まれる 3 パターンに分類が必要でミスが生じやすい。余事象「すべて奇数」は 1 通りしかなく，圧倒的にシンプル。

**鉄則**：「少なくとも 1 つ〜」「〜以外のすべて」型の確率問題は余事象を疑え。`,
      },
    ],
  },

  // ── 問題2: 図形と方程式 C — 円と直線の弦（MARCH）────────────────────────
  {
    slug: "private-circle-chord-length",
    title: "円と直線の共有点と弦の長さ",
    unit: "図形と方程式",
    difficulty: "C",
    universityGroup: "MARCH",
    university: "MARCH（類題）",
    deviation: 60,
    tags: ["図形と方程式", "円", "直線", "弦の長さ", "私立文系"],
    backgroundTag: "中心距離と弦の長さ",
    hasGraph: false,
    tagline: "距離が短いほど弦が長い — 最大弦は直径",
    statement: r`円 $C: x^2 + y^2 = 5$ と直線 $\ell: y = x + a$ について，次の問いに答えよ。

(1) $C$ と $\ell$ が異なる 2 点で交わるような定数 $a$ の値の範囲を求めよ。

(2) 2 交点を結ぶ弦の長さが最大になるときの $a$ の値と，そのときの弦の長さを求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 1,
        title: "「中心距離 < 半径」が 2 点交差の条件",
        body: r`円 $C$ の中心 $(0,0)$，半径 $r = \sqrt{5}$。

直線を $x - y + a = 0$ と整形する。中心から直線への距離は

$$d = \frac{|0 - 0 + a|}{\sqrt{1^2 + (-1)^2}} = \frac{|a|}{\sqrt{2}}$$

**2 点交差** $\Longleftrightarrow$ $d < r$`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "(1) a の範囲",
        body: r`$$\frac{|a|}{\sqrt{2}} < \sqrt{5} \implies |a| < \sqrt{10}$$

$$\boxed{-\sqrt{10} < a < \sqrt{10}}$$`,
      },
      {
        type: "HINT",
        order: 3,
        title: "(2) 弦の長さを d で表す",
        body: r`弦の長さ $L$ は，円の中心と直線の距離 $d$，半径 $r$ を使って

$$L = 2\sqrt{r^2 - d^2} = 2\sqrt{5 - \frac{a^2}{2}}$$

$L$ が最大 $\Longleftrightarrow$ $d^2$ が最小 $\Longleftrightarrow$ $a = 0$`,
      },
      {
        type: "SOLUTION",
        order: 4,
        title: "(2) 最大弦と a の値",
        body: r`$a = 0$ のとき直線は $y = x$（原点を通る）。

$$L_{\max} = 2\sqrt{5 - 0} = 2\sqrt{5}$$

これは円の直径に等しい。$a = 0$ のとき弦は直径。

$$\boxed{a = 0, \quad L = 2\sqrt{5}}$$`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 5,
        title: "MARCH 頻出の 2 段誘導パターン",
        body: r`(1) で条件を求め，(2) でその条件内での最大・最小を問う構成は MARCH・関関同立で頻出。(1) で得た範囲 $-\sqrt{10} < a < \sqrt{10}$ の中で $a=0$ を選ぶことを (2) の根拠として明示すること。`,
      },
    ],
  },

  // ── 問題3: 積分 B — 放物線と直線で囲まれた面積（MARCH）────────────────
  {
    slug: "private-integral-parabola-area",
    title: "放物線と直線で囲まれた面積",
    unit: "積分法",
    difficulty: "B",
    universityGroup: "MARCH",
    university: "MARCH（類題）",
    deviation: 55,
    tags: ["積分", "面積", "放物線", "6分の1公式", "私立文系"],
    backgroundTag: "定積分と面積の公式",
    hasGraph: false,
    tagline: "交点を求め，上下を確認，積分する — の3ステップ",
    statement: r`放物線 $C_1: y = x^2 - 2x$ と直線 $C_2: y = x$ で囲まれた図形の面積を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 1,
        title: "交点を求める",
        body: r`$x^2 - 2x = x$ を解く：

$$x^2 - 3x = 0 \implies x(x - 3) = 0$$

$$\therefore x = 0, \quad x = 3$$

区間 $[0,3]$ での上下関係：$x = 1$ を代入すると，直線 $y = 1$，放物線 $y = -1$。

$$\text{区間 } [0,3] \text{ では } y=x \text{ が上}$$`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "定積分で面積を計算",
        body: r`$$S = \int_0^3 \bigl[x - (x^2 - 2x)\bigr]\,dx = \int_0^3 (3x - x^2)\,dx$$

$$= \left[\frac{3x^2}{2} - \frac{x^3}{3}\right]_0^3 = \frac{27}{2} - 9 = \boxed{\frac{9}{2}}$$`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 3,
        title: "6 分の 1 公式で検算",
        body: r`2 次曲線と直線で囲まれる面積は**6 分の 1 公式**が使える：

$$S = \frac{|a|}{6}(\beta - \alpha)^3$$

（$a$：2 次の係数，$\alpha, \beta$：交点の $x$ 座標）

今回 $a = 1,\; \alpha = 0,\; \beta = 3$：

$$S = \frac{1}{6} \cdot 3^3 = \frac{27}{6} = \frac{9}{2} \checkmark$$

公式を覚えておくと計算時間を大幅に短縮できる。`,
      },
    ],
  },

  // ── 問題4: 数列 C — Sn から一般項・部分和（関関同立）───────────────────
  {
    slug: "private-sequence-from-sum",
    title: "和 Sₙ から一般項と部分和",
    unit: "数列",
    difficulty: "C",
    universityGroup: "KANKANDORITSU",
    university: "関関同立（類題）",
    deviation: 60,
    tags: ["数列", "一般項", "部分和", "Sn", "私立文系"],
    backgroundTag: "Sn と aₙ の関係",
    hasGraph: false,
    tagline: "Sₙ を差し引いて aₙ を出し，Tₖ を差で求める",
    statement: r`数列 $\{a_n\}$ の初項から第 $n$ 項までの和 $S_n$ が

$$S_n = 2n^2 - n$$

で表されるとき，次の問いに答えよ。

(1) 一般項 $a_n$ を求めよ。

(2) 第 $k$ 項から第 $2k$ 項までの和 $T_k$ を求め，$T_k > 1000$ を満たす最小の正の整数 $k$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 1,
        title: "n ≥ 2 と n = 1 の場合分けが必須",
        body: r`$n \ge 2$ のとき $a_n = S_n - S_{n-1}$ を使う。

ただし $n = 1$ は別途 $a_1 = S_1$ で確認する（公式が成立しない場合がある）。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "(1) 一般項 aₙ",
        body: r`$n \ge 2$ のとき：

$$a_n = S_n - S_{n-1} = (2n^2 - n) - \bigl[2(n-1)^2 - (n-1)\bigr]$$

$$= (2n^2 - n) - (2n^2 - 5n + 3) = 4n - 3$$

$n = 1$ のとき：$a_1 = S_1 = 2 - 1 = 1 = 4(1) - 3$ ✓

$$\therefore \boxed{a_n = 4n - 3}$$`,
      },
      {
        type: "HINT",
        order: 3,
        title: "(2) Tₖ を Sₙ の差で表す",
        body: r`$$T_k = \sum_{n=k}^{2k} a_n = S_{2k} - S_{k-1}$$

$$S_{2k} = 2(2k)^2 - 2k = 8k^2 - 2k$$

$$S_{k-1} = 2(k-1)^2 - (k-1) = 2k^2 - 5k + 3$$`,
      },
      {
        type: "SOLUTION",
        order: 4,
        title: "(2) Tₖ の計算と最小 k",
        body: r`$$T_k = (8k^2 - 2k) - (2k^2 - 5k + 3) = 6k^2 + 3k - 3 = 3(2k - 1)(k + 1)$$

$T_k > 1000$：

| $k$ | $3(2k-1)(k+1)$ |
|:---:|:--------------:|
| 12  | $3 \times 23 \times 13 = 897$ |
| 13  | $3 \times 25 \times 14 = 1050$ |

$k=12$ は $897 \le 1000$，$k=13$ は $1050 > 1000$

$$\therefore \text{最小の正の整数 } k = \boxed{13}$$`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 5,
        title: "関関同立の誘導スタイル",
        body: r`(1) で基礎的な $a_n$ の導出，(2) で部分和と不等式の組み合わせという 2 段構成は関関同立の定番誘導。

$T_k = S_{2k} - S_{k-1}$ という「**差の形**」に気づくことが核心。また $3(2k-1)(k+1)$ への因数分解で，不等式の検証が整数値代入 1 回で完結する。`,
      },
    ],
  },

  // ── 問題5: 2次関数 B — 最小値の場合分け（産近甲龍）─────────────────────
  {
    slug: "private-quadratic-min-casework",
    title: "区間における2次関数の最小値",
    unit: "2次関数",
    difficulty: "B",
    universityGroup: "SANKINKORYU",
    university: "産近甲龍（類題）",
    deviation: 50,
    tags: ["2次関数", "最小値", "場合分け", "軸の位置", "私立文系"],
    backgroundTag: "軸の位置による最小値の場合分け",
    hasGraph: false,
    tagline: "軸 x = a が区間の内か外かで場合分け",
    statement: r`$a > 0$ とする。関数 $f(x) = x^2 - 2ax + 3a$ の $0 \le x \le 2$ における最小値 $m(a)$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 1,
        title: "軸の位置で場合分けする",
        body: r`$f(x) = (x - a)^2 - a^2 + 3a$ より，頂点は $(a,\; -a^2 + 3a)$，上に開く放物線。

$a > 0$ のもとで，**軸 $x = a$ が区間 $[0,2]$ の内か外か**で最小値の場所が変わる。

- $0 < a \le 2$：軸が区間内 → 頂点で最小
- $a > 2$：軸が区間の右外 → 区間全体で $f$ が単調減少 → $x = 2$ で最小`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "場合 1：0 < a ≤ 2",
        body: r`頂点 $x = a$ が $[0,2]$ に属するので，頂点で最小値をとる：

$$m(a) = f(a) = -a^2 + 3a$$`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "場合 2：a > 2",
        body: r`軸 $x = a > 2$ は区間の右外。区間 $[0,2]$ は軸の左側全体なので $f$ は単調減少。

$$m(a) = f(2) = 4 - 4a + 3a = 4 - a$$`,
      },
      {
        type: "EXPERIMENT",
        order: 4,
        title: "境界 a = 2 で連続性を確認",
        body: r`- 場合 1 で $a = 2$：$m(2) = -4 + 6 = 2$
- 場合 2 で $a = 2$：$m(2) = 4 - 2 = 2$ ✓

$$\boxed{m(a) = \begin{cases} -a^2 + 3a & (0 < a \le 2) \\ 4 - a & (a > 2) \end{cases}}$$`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 5,
        title: "私立文系で最頻出の場合分けの型",
        body: r`「軸の位置による場合分け」は私立大学の 2 次関数問題で最も頻出のパターン。境界値（ここでは $a = 2$）で両式の値が一致するか確認することで，場合分けのミスを検知できる。不一致の場合は分岐条件を見直すこと。`,
      },
    ],
  },
];
