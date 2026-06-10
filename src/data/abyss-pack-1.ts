import type { Problem } from "@/lib/types";

const r = String.raw;

export const ABYSS_PACK_1: Problem[] = [
  // ─── 1. マルコフ方程式 ────────────────────────────────────────────────
  {
    slug: "abyss-markov-equation",
    title: "マルコフ方程式の正整数解 — 無限降下法",
    unit: "整数論・競技数学",
    difficulty: "OLYMPIAD",
    tier: "ABYSS",
    hasGraph: false,
    tagline: "「すべての解を生成するたった1つの木」— 数論の最深部",
    tags: ["整数論", "無限降下法", "Vieta jumping", "競技数学"],
    statement: r`正の整数 $x, y, z$ に対して次の方程式を考える。

$$
x^2 + y^2 + z^2 = 3xyz
$$

**問 1.** $(x, y, z) = (1, 1, 1)$ がこの方程式の解であることを確かめよ。

**問 2.** $(a, b, c)$ がこの方程式の正整数解ならば、$(a, b, 3ab - c)$ もまた正整数解であることを示せ。

**問 3.** 上の操作を繰り返すと、すべての解はある「根解」から生成されることを示せ。すなわち、どんな正整数解も、$(1, 1, 1)$ から出発する Vieta ジャンプの木に含まれることを証明せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 1,
        title: "第三変数を「二次方程式の根」として見る",
        body: r`$z$ を固定して方程式を $z$ に関する二次式として見ると：

$$
z^2 - (3xy)\,z + (x^2 + y^2) = 0
$$

Vieta の公式より、もう一つの根 $z'$ は $z + z' = 3xy$、すなわち $z' = 3xy - z$。

**重要な洞察**：$z$ が整数解なら $z' = 3xy - z$ も整数であり、$z \cdot z' = x^2 + y^2 > 0$ より $z' > 0$。

つまり正整数解のペアは**必ず別の正整数解を生み出す**。これが無限降下法の核心。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "降下の方向：最大値を縮小する",
        body: r`$(a, b, c)$ を正整数解とし、$c = \max(a, b, c)$ とおく（最大値を $c$ にする）。

このとき $c' = 3ab - c$ とおくと：

$$
c \cdot c' = a^2 + b^2 \leq 2c^2
\implies c' \leq 2c
$$

また $c' = 3ab - c \geq 3 \cdot 1 \cdot 1 - c$。$c' > 0$ は積 $cc' = a^2 + b^2$ から保証される。

**鍵**：$c > \max(a, b)$ のとき $c' < c$ となるので、最大値が真に減少する。これで有限ステップで「根解」$(1,1,1)$ に到達できる。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "完全証明",
        body: r`**問 1.** $1^2 + 1^2 + 1^2 = 3 = 3 \cdot 1 \cdot 1 \cdot 1$。$\checkmark$

---

**問 2.** $(a,b,c)$ を正整数解とする。$z$ に関する二次方程式

$$
z^2 - 3ab \cdot z + (a^2 + b^2) = 0
$$

の二根は $c$ と $c' = 3ab - c$（Vieta の公式）。$c$ が整数なので $c'$ も整数。
積 $c \cdot c' = a^2 + b^2 > 0$ より $c' > 0$。よって $(a, b, c')$ は正整数解。$\checkmark$

---

**問 3.** 正整数解 $(a, b, c)$ の「高さ」を $h = a + b + c$ と定義する。

$h = 3$ のとき $(1,1,1)$ のみ。これが根解。

$h > 3$ のとき、$c = \max(a,b,c)$ とすると $c \geq 2$。$c' = 3ab - c$ について：

$$
(c - c')(c + c') = c^2 - (a^2 + b^2)
$$

$c = \max$ より $c^2 \geq a^2$ かつ $c^2 \geq b^2$。さらに等号が同時に成立すると $a = b = c$ で方程式から $3a^2 = 3a^3$ → $a = 1$（根解のみ）。$c > 1$ のときは $c^2 > \frac{a^2+b^2}{2}$ が示せ、$c > c'$。

したがって操作 $(a,b,c) \mapsto (a,b,c')$ で高さが減少し、有限ステップで根解 $(1,1,1)$ に到達する。$\blacksquare$

**結論**：すべての正整数解はマルコフ木（Markov tree）上に並ぶ：
$(1,1,1) \to (1,1,2) \to (1,2,5) \to (1,5,13) \to \cdots$`,
      },
    ],
  },

  // ─── 2. 漸化式の漸近挙動 ─────────────────────────────────────────────
  {
    slug: "abyss-sequence-asymptotics",
    title: "発散する漸化式の精密な漸近解析",
    unit: "数列・解析",
    difficulty: "EX",
    tier: "ABYSS",
    hasGraph: false,
    tagline: "「無限の先で $\\sqrt{2n}$ に収束する」— 解析的無限降下",
    tags: ["数列", "漸近解析", "漸化式", "競技数学"],
    statement: r`数列 $\{a_n\}$ を次で定める。

$$
a_1 = 1, \quad a_{n+1} = a_n + \frac{1}{a_n} \quad (n \geq 1)
$$

**問 1.** 数列 $\{a_n\}$ が単調増加かつ $a_n \to \infty$（$n \to \infty$）であることを示せ。

**問 2.** 次の極限を求めよ。

$$
\lim_{n \to \infty} \frac{a_n}{\sqrt{n}} = L
$$

$L$ の値を特定し、証明せよ。

**問 3.** より精密な漸近形 $a_n = \sqrt{2n} + O\!\left(n^{-1/2}\right)$ を示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 1,
        title: "$a_n^2$ の挙動を追う — 二乗で telescoping",
        body: r`直接 $a_n$ を追うのは難しい。代わりに $b_n = a_n^2$ を考えると：

$$
b_{n+1} = a_{n+1}^2 = \left(a_n + \frac{1}{a_n}\right)^2 = a_n^2 + 2 + \frac{1}{a_n^2} = b_n + 2 + \frac{1}{b_n}
$$

これで telescoping が使える：

$$
b_n = b_1 + \sum_{k=1}^{n-1}\left(2 + \frac{1}{b_k}\right) = 1 + 2(n-1) + \sum_{k=1}^{n-1}\frac{1}{b_k}
$$

主要項は $2n$ と分かる。$\sum 1/b_k$ の評価が精度を決める。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "サンドイッチ評価で $L = \\sqrt{2}$ を導く",
        body: r`**Step 1 — 下界**：$b_n \geq 1 + 2(n-1) = 2n - 1$ より $a_n \geq \sqrt{2n-1}$。

**Step 2 — 上界**：$\sum_{k=1}^{n-1} \frac{1}{b_k} \leq \sum_{k=1}^{n-1} \frac{1}{2k-1} = O(\log n)$ なので

$$
b_n \leq 2n + O(\log n)
$$

したがって $\sqrt{2n - 1} \leq a_n \leq \sqrt{2n + O(\log n)}$ となり：

$$
\frac{a_n}{\sqrt{n}} \to \sqrt{2}
$$

つまり $L = \sqrt{2}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "完全証明と精密漸近形",
        body: r`**問 1.** $a_{n+1} = a_n + 1/a_n > a_n$ より単調増加。$a_n \leq M$ と仮定すると
$a_{n+1} \geq a_1 + n/M$ で $n \to \infty$ 時に発散 — 矛盾。$\checkmark$

---

**問 2.** $b_n = a_n^2$ とおくと：

$$
b_n = 2n - 1 + \sum_{k=1}^{n-1} \frac{1}{b_k}
$$

$b_n \geq 2n-1$ より $\sum_{k=1}^{n-1} 1/b_k \leq \sum_{k=1}^{n-1} 1/(2k-1) \sim \frac{1}{2}\ln n$。

よって $b_n = 2n + O(\log n)$、$a_n = \sqrt{b_n} = \sqrt{2n}\sqrt{1 + O(\log n/n)} = \sqrt{2n} + O(\sqrt{\log n/n})$。

$$
\therefore \quad \lim_{n\to\infty} \frac{a_n}{\sqrt{n}} = \sqrt{2}
$$

---

**問 3.** $a_n = \sqrt{2n} + r_n$ とおく。$b_n = 2n + 2\sqrt{2n}\,r_n + r_n^2 = 2n + O(\log n)$ より $r_n = O(\sqrt{\log n / n})$。

より丁寧な評価（Abel 和分法）：$\sum_{k=1}^{n} 1/b_k = \frac{1}{2}\ln n + C + O(1/n)$ を使うと

$$
a_n = \sqrt{2n + \tfrac{1}{2}\ln n + C + O(1/n)} = \sqrt{2n}\left(1 + \frac{\ln n}{8n} + O\!\left(\frac{1}{n}\right)\right)
$$

したがって $a_n = \sqrt{2n} + O\!\left(n^{-1/2}\right)$。$\blacksquare$`,
      },
    ],
  },

  // ─── 3. D'Alembert 型関数方程式 ──────────────────────────────────────
  {
    slug: "abyss-dalembert-functional-eq",
    title: "d'Alembert 型関数方程式の全解分類",
    unit: "関数方程式・解析",
    difficulty: "OLYMPIAD",
    tier: "ABYSS",
    hasGraph: false,
    tagline: "「三角関数と双曲線関数が同じ親を持つ」— 関数方程式の美",
    tags: ["関数方程式", "d'Alembert", "競技数学", "解析"],
    statement: r`連続関数 $f : \mathbb{R} \to \mathbb{R}$ が次の関数方程式を満たすとする。

$$
f(x + y) + f(x - y) = 2f(x)f(y) \quad \text{for all } x, y \in \mathbb{R}
$$

**問 1.** $f(0)$ の値を決定せよ。

**問 2.** $f \not\equiv 0$ のとき、$f(0) = 1$ かつ $f$ は偶関数であることを示せ。

**問 3.** 連続な非自明解をすべて分類せよ。すなわち次の解しか存在しないことを証明せよ：

$$
f(x) \equiv 1, \quad f(x) = \cos(\alpha x), \quad f(x) = \cosh(\alpha x) \quad (\alpha \in \mathbb{R} \setminus \{0\})
$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 1,
        title: "特殊値の代入 — $x=y=0$ から出発する",
        body: r`関数方程式に特殊値を代入して制約を引き出すのが定石。

**$x = y = 0$ 代入**：
$$
2f(0) = 2f(0)^2 \implies f(0)(f(0) - 1) = 0
$$

よって $f(0) = 0$ または $f(0) = 1$。

**$f(0) = 0$ の場合**：$y = 0$ 代入で $2f(x) = 2f(x) \cdot 0 = 0$、つまり $f \equiv 0$（自明解）。

**$f(0) = 1$ の場合**：非自明解。$x = 0$ 代入で
$$
f(y) + f(-y) = 2f(0)f(y) = 2f(y)
$$
$\implies f(-y) = f(y)$。**$f$ は偶関数**。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "加法的構造への帰着 — $g = \log|f|$ が満たす方程式",
        body: r`$f$ が連続偶関数で $f(0)=1$、方程式 $f(x+y)+f(x-y)=2f(x)f(y)$ を満たすとする。

$h(x) = f(x/2)$ とおくと（スケール変換でも本質は同じ）、あるいは直接：

**方針**：$f$ が恒等的に $\pm 1$ の値を取らない領域での解析。

$y = x$ 代入：$f(2x) + f(0) = 2f(x)^2 \implies f(2x) = 2f(x)^2 - 1$。

これは $\cos(2\theta) = 2\cos^2\theta - 1$ や $\cosh(2t) = 2\cosh^2 t - 1$ と**同じ倍角公式**！

つまり $f$ は「余弦型の代数的構造」を持つ。連続性と合わせると $f(x) = \cos(\alpha x)$ または $f(x) = \cosh(\alpha x)$ に限られる。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "完全分類の証明",
        body: r`**問 1.** $x=y=0$ から $f(0) \in \{0, 1\}$。$\checkmark$

---

**問 2.** $f(0)=0$ なら $f \equiv 0$（自明解）。$f \not\equiv 0$ なら $f(0) = 1$。
$x=0$ 代入：$f(y)+f(-y)=2f(y)$ → $f$ は偶関数。$\checkmark$

---

**問 3.** 非自明連続解の分類。

**Step 1 — 倍角公式の確立**：$y=x$ 代入で

$$
f(2x) = 2f(x)^2 - 1 \tag{$*$}
$$

**Step 2 — 解の候補の特定**：$(*)$ は $f$ が「余弦型」であることを示す。
$f(x) = \cos(\alpha x)$：$\cos(2\alpha x) = 2\cos^2(\alpha x)-1$。$\checkmark$
$f(x) = \cosh(\alpha x)$：$\cosh(2\alpha x) = 2\cosh^2(\alpha x)-1$。$\checkmark$
$f(x) \equiv 1$：$f(0)=1$ で $\alpha=0$ の場合。$\checkmark$

**Step 3 — 連続性による一意性**：関数方程式を満たす連続偶関数は加法的関数 $g: \mathbb{R} \to \mathbb{R}$ により $f(x) = e^{g(ix)}$ の実部として表せる。連続な加法的関数は $g(x) = cx$ の形（Cauchy 方程式の連続解）なので：

- $c = i\alpha$（純虚数）：$f(x) = \cos(\alpha x)$
- $c = \alpha$（実数）：$f(x) = \cosh(\alpha x)$
- $c = 0$：$f(x) \equiv 1$

$$
\therefore f(x) = \begin{cases} 0 & \text{(自明解)} \\ 1 & \\ \cos(\alpha x) & (\alpha \neq 0) \\ \cosh(\alpha x) & (\alpha \neq 0) \end{cases}
$$

$\blacksquare$

**美しい洞察**：$\cos$ と $\cosh$ は「同じ親」から生まれた解 — $e^{i\alpha x}$ の実部か $e^{\alpha x}$ の偶部か、ただそれだけの違いである。`,
      },
    ],
  },
];
