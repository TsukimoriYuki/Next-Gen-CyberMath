import type { Problem } from "@/lib/types";

const r = String.raw;

export const ABYSS_PACK_2: Problem[] = [
  // ─── 1. IMO 1995 不等式 ───────────────────────────────────────────────
  {
    slug: "abyss-imo1995-inequality",
    title: "特異点：絶対不等式の深淵",
    unit: "式と証明",
    difficulty: "EX",
    tier: "ABYSS",
    hasGraph: false,
    tagline: "「逆数置換が、混沌を美しく浄化する」— IMO 1995",
    tags: ["不等式", "相加相乗平均", "コーシー・シュワルツ", "競技数学", "IMO"],
    statement: r`$a, b, c$ が $abc = 1$ を満たす正の実数であるとき、次の不等式が成り立つことを証明せよ。

$$
\frac{1}{a^3(b+c)} + \frac{1}{b^3(c+a)} + \frac{1}{c^3(a+b)} \ge \frac{3}{2}
$$`,
    steps: [
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図：対称性の回復と置換",
        body: r`1995年 国際数学オリンピック（IMO）の伝説的な不等式問題です。

分母に $a^3$ などの高次式があり、直接の相加相乗平均やコーシー・シュワルツでは うまくいきません。ここでは**「逆数への置換」によって式の形を劇的に美しく整える**という、代数計算の極意を問うています。

戦略の核心は「汚い式を、扱いやすい式に変換してから戦う」こと。`,
      },
      {
        type: "INSIGHT",
        order: 2,
        title: "逆数への置換による浄化",
        body: r`$x = \dfrac{1}{a},\ y = \dfrac{1}{b},\ z = \dfrac{1}{c}$ と置換する。

条件 $abc = 1$ より $xyz = 1$、かつ $x, y, z > 0$。

第1項を変換すると：

$$
\frac{1}{a^3(b+c)}
= \frac{x^3}{\dfrac{1}{y} + \dfrac{1}{z}}
= \frac{x^3}{\dfrac{y+z}{yz}}
= \frac{x^3 yz}{y+z}
$$

$xyz = 1$ より $yz = \dfrac{1}{x}$ なので、これは $\dfrac{x^2}{y+z}$ に**劇的に簡略化**される。

求める不等式は次と同値になる：

$$
\frac{x^2}{y+z} + \frac{y^2}{z+x} + \frac{z^2}{x+y} \ge \frac{3}{2}
$$`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "ティトゥの補題と相加相乗平均",
        body: r`コーシー・シュワルツの不等式の分数系（**ティトゥの補題**）を適用する。

$$
\frac{x^2}{y+z} + \frac{y^2}{z+x} + \frac{z^2}{x+y}
\ge \frac{(x+y+z)^2}{(y+z)+(z+x)+(x+y)}
= \frac{(x+y+z)^2}{2(x+y+z)}
= \frac{x+y+z}{2}
$$

さらに $x, y, z > 0$ に対して相加相乗平均を適用：

$$
x + y + z \ge 3\sqrt[3]{xyz} = 3\sqrt[3]{1} = 3
$$

これを代入すると：

$$
\frac{x+y+z}{2} \ge \frac{3}{2}
$$

したがって元の不等式が証明された。$\blacksquare$

等号成立は $x = y = z = 1$、すなわち $a = b = c = 1$ のときである。`,
      },
    ],
  },

  // ─── 2. アイゼンシュタインの既約判定法 ───────────────────────────────
  {
    slug: "abyss-eisenstein-shift",
    title: "特異点：素数と多項式の絶対非分解",
    unit: "高次方程式",
    difficulty: "EX",
    tier: "ABYSS",
    hasGraph: false,
    tagline: "「x を y+1 にずらすだけで、素数の力が顕現する」",
    tags: ["多項式", "既約性", "アイゼンシュタイン", "整数論", "競技数学"],
    statement: r`$p$ を素数とする。円分多項式

$$
\Phi_p(x) = x^{p-1} + x^{p-2} + \cdots + x + 1
$$

が有理数係数の多項式として因数分解できない（**既約である**）ことを証明せよ。`,
    steps: [
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図：視点の平行移動",
        body: r`大学数学の代数学でも登場する有名定理の証明です。

アイゼンシュタインの既約判定法をそのまま適用しようにも、係数がすべて $1$ であるため弾かれます。

**「変数 $x$ を平行移動させて、二項係数の素数分配性を浮かび上がらせる」**という天才的な発想の転換を要求します。既約性は平行移動で不変であることも重要なポイント。`,
      },
      {
        type: "INSIGHT",
        order: 2,
        title: "式の圧縮と平行移動",
        body: r`等比数列の和の公式より $\Phi_p(x) = \dfrac{x^p - 1}{x - 1}$ と表せる。

ここで $x = y + 1$ という置換を行う。既約性は変数の平行移動で不変なので、

$$
\Phi_p(y+1) = \frac{(y+1)^p - 1}{(y+1) - 1} = \frac{(y+1)^p - 1}{y}
$$

この形に対してアイゼンシュタインの判定法が使えるかを調べる。二項定理で展開すると構造が明確になる。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "アイゼンシュタインの既約判定法",
        body: r`二項定理より $(y+1)^p = \displaystyle\sum_{k=0}^{p} \binom{p}{k} y^k$ なので：

$$
\Phi_p(y+1)
= \frac{(y+1)^p - 1}{y}
= y^{p-1} + \binom{p}{1}y^{p-2} + \binom{p}{2}y^{p-3} + \cdots + \binom{p}{p-1}
$$

**係数の整数論的性質を確認する：**

- 最高次係数 $[y^{p-1}]$：$1$ — $p$ で割り切れない。$\checkmark$
- 中間項の係数 $\dbinom{p}{k}$（$1 \le k \le p-1$）：分子に $p$ を含むが分母には $p$ より小さい数しかないため、$p \mid \dbinom{p}{k}$。$\checkmark$
- 定数項 $\dbinom{p}{p-1} = p$：$p$ で割り切れるが $p^2$ では割り切れない。$\checkmark$

これらはまさに**アイゼンシュタインの既約判定法**の3条件を満たす。

よって $\Phi_p(y+1)$ は $\mathbb{Q}[y]$ 上で既約。平行移動は既約性を保つから、$\Phi_p(x)$ も $\mathbb{Q}[x]$ 上で既約である。$\blacksquare$`,
      },
    ],
  },

  // ─── 3. オイラーの対数正弦積分 ────────────────────────────────────────
  {
    slug: "abyss-euler-log-sine",
    title: "特異点：オイラーの対数正弦積分",
    unit: "積分法",
    difficulty: "EX",
    tier: "ABYSS",
    hasGraph: false,
    tagline: "「原始関数が存在しないのに、定積分の値は求まる」— 解析の逆説",
    tags: ["積分", "対数積分", "オイラー", "King Property", "競技数学"],
    statement: r`次の定積分の値を求めよ。

$$
I = \int_0^{\frac{\pi}{2}} \log(\sin x) \, dx
$$`,
    steps: [
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図：自己言及的積分の極致",
        body: r`東大・京大などの超難関大の背景知識として知られる「オイラーの積分」です。

$\log(\sin x)$ の原始関数は初等関数で表せないため、**部分積分や置換積分で直接求めることは不可能**です。

ここでは「King Property（区間の反転置換）」を用いて $I$ 自身を別ルートから再構築し、**$I$ についての方程式を立てて解く**という高度なテクニックを要求しています。積分が「自分自身の方程式の解になる」という構造の美しさ。`,
      },
      {
        type: "INSIGHT",
        order: 2,
        title: "King Property と倍角の公式",
        body: r`積分の性質 $\displaystyle\int_0^a f(x)\,dx = \int_0^a f(a-x)\,dx$ を用いる。

$x \mapsto \dfrac{\pi}{2} - x$ の置換で $\sin\!\left(\dfrac{\pi}{2}-x\right) = \cos x$ となるため：

$$
I = \int_0^{\frac{\pi}{2}} \log(\cos x) \, dx
$$

という **$I$ のもう一つの顔** が現れる。この2式を足し合わせると：

$$
2I = \int_0^{\frac{\pi}{2}} \bigl(\log(\sin x) + \log(\cos x)\bigr) dx
= \int_0^{\frac{\pi}{2}} \log(\sin x \cos x) \, dx
$$

倍角公式 $\sin x \cos x = \dfrac{\sin 2x}{2}$ を使えば、再び $\sin$ の形に帰着できる。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "積分方程式の解決",
        body: r`対数の性質で分解する：

$$
2I = \int_0^{\frac{\pi}{2}} \log(\sin 2x) \, dx - \int_0^{\frac{\pi}{2}} \log 2 \, dx
$$

**右辺第2項**：$\displaystyle\int_0^{\frac{\pi}{2}} \log 2 \, dx = \frac{\pi}{2} \log 2$

**右辺第1項**：$t = 2x$ と置換（$dx = \dfrac{1}{2}dt$、区間 $[0, \pi]$）：

$$
\int_0^{\frac{\pi}{2}} \log(\sin 2x) \, dx
= \frac{1}{2}\int_0^{\pi} \log(\sin t) \, dt
$$

$\sin t$ は $t = \dfrac{\pi}{2}$ に対して対称なので：

$$
= \frac{1}{2} \cdot 2\int_0^{\frac{\pi}{2}} \log(\sin t) \, dt = I
$$

代入してまとめると：

$$
2I = I - \frac{\pi}{2}\log 2
$$

$$
\boxed{I = -\frac{\pi}{2}\log 2}
$$

$\blacksquare$`,
      },
    ],
  },
];
