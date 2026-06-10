// 計算ドリル問題集
// カテゴリ: 展開・因数分解・有理化・指数対数・三角関数・絶対値

export type DrillCategory =
  | "expansion"
  | "factoring"
  | "rationalize"
  | "log"
  | "trig"
  | "abs"
  | "quadratic";

export type DrillDifficulty = "basic" | "standard" | "advanced";

export interface CalcDrillProblem {
  id: string;
  category: DrillCategory;
  difficulty: DrillDifficulty;
  question: string;       // LaTeX
  options: string[];      // 4択, LaTeX
  correctIndex: number;
  hint: string;
  solution: string;       // 簡潔な解法メモ
}

const r = String.raw;

export const CALC_DRILL_PROBLEMS: CalcDrillProblem[] = [

  // ══════════════════════════════════════════════════
  // 展開 (expansion)
  // ══════════════════════════════════════════════════
  {
    id: "exp-01",
    category: "expansion",
    difficulty: "basic",
    question: r`$(x+3)^2$ を展開せよ`,
    options: [r`$x^2+6x+9$`, r`$x^2+3x+9$`, r`$x^2+9x+6$`, r`$x^2+6x+6$`],
    correctIndex: 0,
    hint: r`$(a+b)^2 = a^2+2ab+b^2$`,
    solution: r`$x^2 + 2\cdot x\cdot 3 + 3^2 = x^2+6x+9$`,
  },
  {
    id: "exp-02",
    category: "expansion",
    difficulty: "basic",
    question: r`$(2x-1)(2x+1)$ を展開せよ`,
    options: [r`$4x^2-1$`, r`$4x^2+1$`, r`$4x^2-4x+1$`, r`$2x^2-1$`],
    correctIndex: 0,
    hint: r`$(a-b)(a+b) = a^2-b^2$`,
    solution: r`$(2x)^2 - 1^2 = 4x^2-1$`,
  },
  {
    id: "exp-03",
    category: "expansion",
    difficulty: "standard",
    question: r`$(x+2)(x^2-2x+4)$ を展開せよ`,
    options: [r`$x^3+8$`, r`$x^3-8$`, r`$x^3+4x+8$`, r`$x^3+2x^2+8$`],
    correctIndex: 0,
    hint: r`$(a+b)(a^2-ab+b^2) = a^3+b^3$`,
    solution: r`$a=x,\,b=2$ の和の立方根公式 $\Rightarrow x^3+8$`,
  },
  {
    id: "exp-04",
    category: "expansion",
    difficulty: "standard",
    question: r`$(a+b+c)^2$ を展開したとき、$ab$ の係数は？`,
    options: [r`$2$`, r`$1$`, r`$3$`, r`$4$`],
    correctIndex: 0,
    hint: r`$(a+b+c)^2 = a^2+b^2+c^2+2ab+2bc+2ca$`,
    solution: r`クロス項 $2ab$ から係数は $2$`,
  },
  {
    id: "exp-05",
    category: "expansion",
    difficulty: "advanced",
    question: r`$(x-1)^4$ の $x^2$ の係数は？`,
    options: [r`$6$`, r`$4$`, r`$-6$`, r`$-4$`],
    correctIndex: 0,
    hint: r`二項定理 $\binom{4}{2}(-1)^2 x^2$`,
    solution: r`$\binom{4}{2}\cdot 1 = 6$`,
  },

  // ══════════════════════════════════════════════════
  // 因数分解 (factoring)
  // ══════════════════════════════════════════════════
  {
    id: "fac-01",
    category: "factoring",
    difficulty: "basic",
    question: r`$x^2 - 5x + 6$ を因数分解せよ`,
    options: [r`$(x-2)(x-3)$`, r`$(x+2)(x+3)$`, r`$(x-1)(x-6)$`, r`$(x+1)(x-6)$`],
    correctIndex: 0,
    hint: r`積が $6$、和が $-5$ になる 2 数を探す`,
    solution: r`$-2 \times -3 = 6,\quad -2+(-3)=-5$`,
  },
  {
    id: "fac-02",
    category: "factoring",
    difficulty: "basic",
    question: r`$x^2 - 9$ を因数分解せよ`,
    options: [r`$(x+3)(x-3)$`, r`$(x-3)^2$`, r`$(x+3)^2$`, r`$(x-9)(x+1)$`],
    correctIndex: 0,
    hint: r`$a^2 - b^2 = (a+b)(a-b)$`,
    solution: r`$x^2 - 3^2 = (x+3)(x-3)$`,
  },
  {
    id: "fac-03",
    category: "factoring",
    difficulty: "standard",
    question: r`$2x^2 + 5x - 3$ を因数分解せよ`,
    options: [r`$(2x-1)(x+3)$`, r`$(2x+3)(x-1)$`, r`$(x+3)(2x-1)$`, r`$(2x+1)(x-3)$`],
    correctIndex: 0,
    hint: r`$ac = -6$、$b = 5$ となる組み合わせを探す（たすき掛け）`,
    solution: r`$2\cdot(-1) + 1\cdot 3 = 1$… たすき掛けで $(2x-1)(x+3)$`,
  },
  {
    id: "fac-04",
    category: "factoring",
    difficulty: "standard",
    question: r`$x^3 - 8$ を因数分解せよ`,
    options: [
      r`$(x-2)(x^2+2x+4)$`,
      r`$(x+2)(x^2-2x+4)$`,
      r`$(x-2)^3$`,
      r`$(x-2)(x^2-4)$`,
    ],
    correctIndex: 0,
    hint: r`$a^3-b^3 = (a-b)(a^2+ab+b^2)$`,
    solution: r`$a=x,\,b=2$ を代入`,
  },
  {
    id: "fac-05",
    category: "factoring",
    difficulty: "advanced",
    question: r`$x^4 - 5x^2 + 4$ を因数分解せよ`,
    options: [
      r`$(x+1)(x-1)(x+2)(x-2)$`,
      r`$(x^2-1)(x^2-4)$`,
      r`$(x-1)^2(x-2)^2$`,
      r`$(x+1)^2(x-2)^2$`,
    ],
    correctIndex: 0,
    hint: r`$t = x^2$ と置くと $t^2-5t+4 = (t-1)(t-4)$`,
    solution: r`$(x^2-1)(x^2-4) = (x+1)(x-1)(x+2)(x-2)$`,
  },

  // ══════════════════════════════════════════════════
  // 有理化 (rationalize)
  // ══════════════════════════════════════════════════
  {
    id: "rat-01",
    category: "rationalize",
    difficulty: "basic",
    question: r`$\dfrac{1}{\sqrt{3}}$ を有理化せよ`,
    options: [r`$\dfrac{\sqrt{3}}{3}$`, r`$\dfrac{1}{\sqrt{3}}$`, r`$\dfrac{\sqrt{3}}{2}$`, r`$\dfrac{3}{\sqrt{3}}$`],
    correctIndex: 0,
    hint: r`分母分子に $\sqrt{3}$ を掛ける`,
    solution: r`$\dfrac{\sqrt{3}}{\sqrt{3}\cdot\sqrt{3}} = \dfrac{\sqrt{3}}{3}$`,
  },
  {
    id: "rat-02",
    category: "rationalize",
    difficulty: "standard",
    question: r`$\dfrac{1}{\sqrt{5}-\sqrt{3}}$ を有理化せよ`,
    options: [
      r`$\dfrac{\sqrt{5}+\sqrt{3}}{2}$`,
      r`$\dfrac{\sqrt{5}-\sqrt{3}}{2}$`,
      r`$\dfrac{\sqrt{5}+\sqrt{3}}{8}$`,
      r`$\sqrt{5}+\sqrt{3}$`,
    ],
    correctIndex: 0,
    hint: r`共役 $(\sqrt{5}+\sqrt{3})$ を掛ける`,
    solution: r`$\dfrac{\sqrt{5}+\sqrt{3}}{(\sqrt{5})^2-(\sqrt{3})^2} = \dfrac{\sqrt{5}+\sqrt{3}}{2}$`,
  },
  {
    id: "rat-03",
    category: "rationalize",
    difficulty: "advanced",
    question: r`$\dfrac{\sqrt{6}+\sqrt{2}}{\sqrt{6}-\sqrt{2}}$ を計算せよ`,
    options: [r`$2+\sqrt{3}$`, r`$2-\sqrt{3}$`, r`$\sqrt{3}+1$`, r`$4$`],
    correctIndex: 0,
    hint: r`分母分子に $(\sqrt{6}+\sqrt{2})$ を掛ける`,
    solution: r`$\dfrac{(\sqrt{6}+\sqrt{2})^2}{4} = \dfrac{8+4\sqrt{3}}{4} = 2+\sqrt{3}$`,
  },

  // ══════════════════════════════════════════════════
  // 指数・対数 (log)
  // ══════════════════════════════════════════════════
  {
    id: "log-01",
    category: "log",
    difficulty: "basic",
    question: r`$\log_2 8$ の値は？`,
    options: [r`$3$`, r`$2$`, r`$4$`, r`$\dfrac{1}{3}$`],
    correctIndex: 0,
    hint: r`$2^? = 8$`,
    solution: r`$2^3 = 8 \Rightarrow \log_2 8 = 3$`,
  },
  {
    id: "log-02",
    category: "log",
    difficulty: "basic",
    question: r`$\log_{10} 0.01$ の値は？`,
    options: [r`$-2$`, r`$2$`, r`$-\dfrac{1}{2}$`, r`$0.01$`],
    correctIndex: 0,
    hint: r`$10^? = 0.01 = 10^{-2}$`,
    solution: r`$\log_{10} 10^{-2} = -2$`,
  },
  {
    id: "log-03",
    category: "log",
    difficulty: "standard",
    question: r`$\log_2 6 - \log_2 3$ の値は？`,
    options: [r`$1$`, r`$2$`, r`$3$`, r`$\log_2 3$`],
    correctIndex: 0,
    hint: r`対数の差は商の対数`,
    solution: r`$\log_2 \dfrac{6}{3} = \log_2 2 = 1$`,
  },
  {
    id: "log-04",
    category: "log",
    difficulty: "standard",
    question: r`$2\log_{10} 3 + \log_{10} \dfrac{100}{9}$ を簡単にせよ`,
    options: [r`$2$`, r`$1$`, r`$3$`, r`$\log_{10} 4$`],
    correctIndex: 0,
    hint: r`$2\log a = \log a^2$、最後に対数の和 $\log 9 + \log \frac{100}{9}$`,
    solution: r`$\log_{10} 9 + \log_{10} \frac{100}{9} = \log_{10} 100 = 2$`,
  },
  {
    id: "log-05",
    category: "log",
    difficulty: "advanced",
    question: r`$\log_3 5 = a$ のとき、$\log_9 45$ を $a$ で表せ`,
    options: [
      r`$\dfrac{a+2}{2}$`,
      r`$\dfrac{a+1}{2}$`,
      r`$2a+1$`,
      r`$\dfrac{2a+1}{2}$`,
    ],
    correctIndex: 0,
    hint: r`$\log_9 45 = \dfrac{\log_3 45}{\log_3 9}$、$\log_3 45 = \log_3 9 + \log_3 5$`,
    solution: r`$\dfrac{2+a}{2}$`,
  },

  // ══════════════════════════════════════════════════
  // 三角関数 (trig)
  // ══════════════════════════════════════════════════
  {
    id: "tri-01",
    category: "trig",
    difficulty: "basic",
    question: r`$\sin 30°$ の値は？`,
    options: [r`$\dfrac{1}{2}$`, r`$\dfrac{\sqrt{3}}{2}$`, r`$\dfrac{\sqrt{2}}{2}$`, r`$1$`],
    correctIndex: 0,
    hint: r`30-60-90の三角形を思い出す`,
    solution: r`$\sin 30° = \dfrac{1}{2}$（辺の比 $1:2:\sqrt{3}$）`,
  },
  {
    id: "tri-02",
    category: "trig",
    difficulty: "basic",
    question: r`$\cos 60°$ の値は？`,
    options: [r`$\dfrac{1}{2}$`, r`$\dfrac{\sqrt{3}}{2}$`, r`$\dfrac{\sqrt{2}}{2}$`, r`$0$`],
    correctIndex: 0,
    hint: r`$\cos 60° = \sin 30°$`,
    solution: r`$\cos 60° = \dfrac{1}{2}$`,
  },
  {
    id: "tri-03",
    category: "trig",
    difficulty: "standard",
    question: r`$\sin^2\theta + \cos^2\theta = 1$ より、$\sin\theta = \dfrac{3}{5}$ のとき $\cos\theta$ は？（$0 < \theta < \dfrac{\pi}{2}$）`,
    options: [r`$\dfrac{4}{5}$`, r`$\dfrac{3}{5}$`, r`$\dfrac{\sqrt{7}}{5}$`, r`$\dfrac{5}{4}$`],
    correctIndex: 0,
    hint: r`$\cos^2\theta = 1 - \sin^2\theta = 1 - \dfrac{9}{25}$`,
    solution: r`$\cos\theta = \sqrt{\dfrac{16}{25}} = \dfrac{4}{5}$（第1象限より正）`,
  },
  {
    id: "tri-04",
    category: "trig",
    difficulty: "standard",
    question: r`$\sin 150°$ の値は？`,
    options: [r`$\dfrac{1}{2}$`, r`$-\dfrac{1}{2}$`, r`$\dfrac{\sqrt{3}}{2}$`, r`$-\dfrac{\sqrt{3}}{2}$`],
    correctIndex: 0,
    hint: r`$\sin(180°-\theta) = \sin\theta$`,
    solution: r`$\sin 150° = \sin(180°-30°) = \sin 30° = \dfrac{1}{2}$`,
  },
  {
    id: "tri-05",
    category: "trig",
    difficulty: "advanced",
    question: r`$\sin\theta + \cos\theta = \sqrt{2}$ のとき、$\sin\theta\cos\theta$ の値は？`,
    options: [r`$\dfrac{1}{2}$`, r`$1$`, r`$\dfrac{\sqrt{2}}{2}$`, r`$0$`],
    correctIndex: 0,
    hint: r`両辺を 2 乗して $1 + 2\sin\theta\cos\theta$ を求める`,
    solution: r`$(\sin\theta+\cos\theta)^2 = 2 \Rightarrow 1 + 2\sin\theta\cos\theta = 2 \Rightarrow \sin\theta\cos\theta = \dfrac{1}{2}$`,
  },

  // ══════════════════════════════════════════════════
  // 絶対値 (abs)
  // ══════════════════════════════════════════════════
  {
    id: "abs-01",
    category: "abs",
    difficulty: "basic",
    question: r`$|{-5}| + |3|$ の値は？`,
    options: [r`$8$`, r`$-2$`, r`$2$`, r`$-8$`],
    correctIndex: 0,
    hint: r`絶対値は距離（常に 0 以上）`,
    solution: r`$5 + 3 = 8$`,
  },
  {
    id: "abs-02",
    category: "abs",
    difficulty: "standard",
    question: r`$|x-2| = 3$ の解は？`,
    options: [r`$x = -1, 5$`, r`$x = 1, 5$`, r`$x = -1, -5$`, r`$x = 2, 3$`],
    correctIndex: 0,
    hint: r`$x-2 = 3$ または $x-2 = -3$`,
    solution: r`$x-2=3 \Rightarrow x=5;\quad x-2=-3 \Rightarrow x=-1$`,
  },
  {
    id: "abs-03",
    category: "abs",
    difficulty: "standard",
    question: r`$|2x-4| < 6$ の解は？`,
    options: [r`$-1 < x < 5$`, r`$x < -1$ または $x > 5$`, r`$-5 < x < 1$`, r`$1 < x < 5$`],
    correctIndex: 0,
    hint: r`$-6 < 2x-4 < 6$ を解く`,
    solution: r`$-2 < 2x < 10 \Rightarrow -1 < x < 5$`,
  },

  // ══════════════════════════════════════════════════
  // 二次方程式 (quadratic)
  // ══════════════════════════════════════════════════
  {
    id: "qua-01",
    category: "quadratic",
    difficulty: "basic",
    question: r`$x^2 - 4 = 0$ の解は？`,
    options: [r`$x = \pm 2$`, r`$x = 2$`, r`$x = \pm 4$`, r`$x = -2$`],
    correctIndex: 0,
    hint: r`$x^2 = 4$`,
    solution: r`$x^2=4 \Rightarrow x=\pm 2$`,
  },
  {
    id: "qua-02",
    category: "quadratic",
    difficulty: "basic",
    question: r`$x^2 - 3x - 10 = 0$ の解は？`,
    options: [r`$x = -2, 5$`, r`$x = 2, -5$`, r`$x = 2, 5$`, r`$x = -2, -5$`],
    correctIndex: 0,
    hint: r`積 $-10$、和 $3$ の 2 数 → 符号に注意`,
    solution: r`$(x+2)(x-5)=0 \Rightarrow x=-2$ または $x=5$`,
  },
  {
    id: "qua-03",
    category: "quadratic",
    difficulty: "standard",
    question: r`$2x^2 - 3x - 2 = 0$ の解は？`,
    options: [r`$x = -\dfrac{1}{2}, 2$`, r`$x = \dfrac{1}{2}, -2$`, r`$x = -1, 2$`, r`$x = 1, -2$`],
    correctIndex: 0,
    hint: r`$(2x+1)(x-2)=0$`,
    solution: r`$2x+1=0 \Rightarrow x=-\dfrac{1}{2};\quad x-2=0 \Rightarrow x=2$`,
  },
  {
    id: "qua-04",
    category: "quadratic",
    difficulty: "standard",
    question: r`$x^2 + 2x + 3 = 0$ の判別式 $D$ は？`,
    options: [r`$D = -8$`, r`$D = 8$`, r`$D = 4$`, r`$D = -4$`],
    correctIndex: 0,
    hint: r`$D = b^2 - 4ac$`,
    solution: r`$D = 4 - 12 = -8$（実数解なし）`,
  },
  {
    id: "qua-05",
    category: "quadratic",
    difficulty: "advanced",
    question: r`$x^2 - kx + k = 0$ が重解を持つ $k$ の値は？`,
    options: [r`$k = 0, 4$`, r`$k = \pm 4$`, r`$k = 0$`, r`$k = 4$`],
    correctIndex: 0,
    hint: r`重解 $\Leftrightarrow D = k^2 - 4k = 0$`,
    solution: r`$k(k-4)=0 \Rightarrow k=0$ または $k=4$`,
  },
];

export const DRILL_CATEGORIES: Record<DrillCategory, { label: string; accent: string }> = {
  expansion:  { label: "展開",     accent: "#10b981" },
  factoring:  { label: "因数分解", accent: "#22d3ee" },
  rationalize:{ label: "有理化",   accent: "#f59e0b" },
  log:        { label: "指数・対数", accent: "#a78bfa" },
  trig:       { label: "三角関数", accent: "#f43f5e" },
  abs:        { label: "絶対値",   accent: "#fb923c" },
  quadratic:  { label: "二次方程式", accent: "#34d399" },
};
