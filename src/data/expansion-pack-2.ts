// Expansion Pack 2 — 数学1A 良問集（難易度 A〜D）
// Pack 1 とは単元・テーマが重複しないよう設計。
// src/data/problems.ts の RAW_PROBLEMS に展開して使用する。

export const EXPANSION_PACK_2: any[] = [
  // ─────────────────────────────────────────────────────────────────
  // 1. 集合の要素の個数と包除原理  [難易度 A / 偏差値 50]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp2-set-inclusion-exclusion",
    title: "集合の要素の個数と包除原理",
    unit: "集合と論理",
    difficulty: "A",
    statement:
      "全体集合を $U = \\{1, 2, 3, \\ldots, 30\\}$ とし、" +
      "$A = \\{3 \\text{ の倍数}\\}$, $B = \\{5 \\text{ の倍数}\\}$ とする。" +
      "次の値を求めよ。\n\n" +
      "(1) $n(A \\cup B)$　　(2) $n(\\overline{A} \\cap \\overline{B})$",
    tagline: "LCMと包除、ド・モルガンを一本の流れで",
    hasGraph: false,
    tags: ["集合", "包除原理", "ド・モルガン", "倍数"],
    university: "標準類題（オリジナル）",
    deviation: 50,
    year: 2024,
    backgroundTag: "包除原理と補集合",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：包除原理とド・モルガンの法則",
        body:
          "**包除原理：** $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$\n\n" +
          "**ド・モルガン：** $\\overline{A} \\cap \\overline{B} = \\overline{A \\cup B}$\n\n" +
          "したがって $n(\\overline{A} \\cap \\overline{B}) = n(U) - n(A \\cup B)$。\n\n" +
          "**鍵となる観察：** $A \\cap B$ は「3の倍数かつ5の倍数」$=$ 「$\\mathrm{lcm}(3,5) = 15$ の倍数」。",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "各集合の要素を列挙して個数を確認",
        body:
          "$A = \\{3, 6, 9, 12, 15, 18, 21, 24, 27, 30\\}$ → $n(A) = 10$\n\n" +
          "$B = \\{5, 10, 15, 20, 25, 30\\}$ → $n(B) = 6$\n\n" +
          "$A \\cap B = \\{15, 30\\}$ → $n(A \\cap B) = 2$\n\n" +
          "（$30 \\div 3 = 10$, $30 \\div 5 = 6$, $30 \\div 15 = 2$ と割り算で素早く計算できる。）",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：一般化のための公式",
        body:
          "$1$ から $N$ までの整数のうち $k$ の倍数の個数は $\\left\\lfloor \\dfrac{N}{k} \\right\\rfloor$ 個。\n\n" +
          "本問では $N = 30$, $k = 3, 5, 15$ がすべて $30$ の約数なので端数なし:\n" +
          "$$n(A) = \\frac{30}{3} = 10, \\quad n(B) = \\frac{30}{5} = 6, \\quad n(A \\cap B) = \\frac{30}{15} = 2$$",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密解",
        body:
          "**Step 1 ： $n(A \\cup B)$ を求める**\n\n" +
          "包除原理より:\n" +
          "$$n(A \\cup B) = n(A) + n(B) - n(A \\cap B) = 10 + 6 - 2 = \\boxed{14}$$\n\n" +
          "**Step 2 ： $n(\\overline{A} \\cap \\overline{B})$ を求める**\n\n" +
          "ド・モルガンの法則 $\\overline{A} \\cap \\overline{B} = \\overline{A \\cup B}$ より:\n" +
          "$$n(\\overline{A} \\cap \\overline{B}) = n(U) - n(A \\cup B) = 30 - 14 = \\boxed{16}$$\n\n" +
          "**確認：** 3の倍数でも5の倍数でもない数は $16$ 個。\n" +
          "例えば $1, 2, 4, 7, 8, 11, 13, \\ldots$ がこれに該当する。\n\n" +
          "**一般公式（発展）：** $n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A\\cap B) - n(B\\cap C) - n(A\\cap C) + n(A\\cap B\\cap C)$",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. 反復試行の確率と最大化  [難易度 B / 偏差値 55]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp2-binomial-prob-maximize",
    title: "反復試行の確率と最大化",
    unit: "確率",
    difficulty: "B",
    statement:
      "表が出る確率が $p$（$0 < p < 1$）のコインを $4$ 回投げるとき、" +
      "表がちょうど $2$ 回出る確率 $P(p)$ を求めよ。" +
      "また、$P(p)$ を最大にする $p$ の値と、そのときの $P(p)$ の最大値を求めよ。",
    tagline: "微分で最大化——対称性の美を見よ",
    hasGraph: false,
    tags: ["確率", "反復試行", "最大化", "微分"],
    university: "標準類題（オリジナル）",
    deviation: 55,
    year: 2024,
    backgroundTag: "反復試行の確率と最適化",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：二項確率の構造",
        body:
          "$n$ 回の反復試行で事象が $k$ 回起こる確率:\n" +
          "$$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$$\n\n" +
          "本問は $n = 4$, $k = 2$ の場合。最大化は微分または置換（$u = p(1-p)$）で処理する。\n\n" +
          "**対称性の予感：** $p$ と $1-p$ を入れ替えても $P(p)$ は変わらない（表裏の対称性）。" +
          "これより $p = \\dfrac{1}{2}$ が最大点の候補であることが直感的にわかる。",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "具体的な値で確認",
        body:
          "$p = \\dfrac{1}{4}$: $P = \\binom{4}{2}\\left(\\dfrac{1}{4}\\right)^2\\left(\\dfrac{3}{4}\\right)^2" +
          " = 6 \\cdot \\dfrac{9}{256} = \\dfrac{54}{256} \\approx 0.211$\n\n" +
          "$p = \\dfrac{1}{2}$: $P = 6 \\cdot \\dfrac{1}{4} \\cdot \\dfrac{1}{4} = \\dfrac{6}{16} = \\dfrac{3}{8} = 0.375$\n\n" +
          "$p = \\dfrac{3}{4}$: $P = \\binom{4}{2}\\left(\\dfrac{3}{4}\\right)^2\\left(\\dfrac{1}{4}\\right)^2" +
          " = \\dfrac{54}{256} \\approx 0.211$\n\n" +
          "$p = \\dfrac{1}{2}$ のとき値が最大になっていることが確認できる。",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：$P(p)$ の微分",
        body:
          "$$P(p) = 6p^2(1-p)^2$$\n\n" +
          "$$P'(p) = 6 \\left[2p(1-p)^2 + p^2 \\cdot 2(1-p)(-1)\\right]" +
          " = 12p(1-p)\\left[(1-p) - p\\right] = 12p(1-p)(1-2p)$$\n\n" +
          "$0 < p < 1$ では $12p > 0$, $(1-p) > 0$ だから、$P'(p)$ の符号は $(1-2p)$ で決まる。",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密解",
        body:
          "**Step 1 ： $P(p)$ を求める**\n\n" +
          "$$P(p) = \\binom{4}{2} p^2 (1-p)^2 = 6p^2(1-p)^2$$\n\n" +
          "**Step 2 ： $P(p)$ の増減を調べる**\n\n" +
          "$$P'(p) = 12p(1-p)(1-2p)$$\n\n" +
          "$0 < p < 1$ における符号:\n\n" +
          "- $0 < p < \\dfrac{1}{2}$：$P'(p) > 0$（単調増加）\n" +
          "- $p = \\dfrac{1}{2}$：$P'(p) = 0$\n" +
          "- $\\dfrac{1}{2} < p < 1$：$P'(p) < 0$（単調減少）\n\n" +
          "よって $p = \\dfrac{1}{2}$ で極大かつ最大。\n\n" +
          "**Step 3 ： 最大値を求める**\n\n" +
          "$$P\\!\\left(\\frac{1}{2}\\right) = 6 \\left(\\frac{1}{2}\\right)^2 \\left(\\frac{1}{2}\\right)^2" +
          " = 6 \\cdot \\frac{1}{16} = \\frac{3}{8}$$\n\n" +
          "$$\\boxed{P(p) = 6p^2(1-p)^2 \\text{ が最大になるのは } p = \\frac{1}{2}\\text{ のとき、最大値 }\\frac{3}{8}}$$",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. 二次不等式の整数解の個数  [難易度 C / 偏差値 60]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp2-quadratic-ineq-integer-count",
    title: "二次不等式の整数解の個数",
    unit: "二次不等式",
    difficulty: "C",
    statement:
      "$a$ を実数の定数とする。二次不等式 $x^2 - 5x + a < 0$ を満たす整数 $x$ が" +
      "ちょうど $2$ 個となるような $a$ の値の範囲を求めよ。",
    tagline: "軸の対称性を活かし、境界の整数を排除せよ",
    hasGraph: false,
    tags: ["二次不等式", "整数解", "場合分け", "判別式"],
    university: "難関大系 類題",
    deviation: 60,
    year: 2024,
    backgroundTag: "二次不等式の解の構造と整数解の個数",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：解の区間の対称性",
        body:
          "@@why:discriminant|判別式@@ $D = 25 - 4a > 0$、すなわち $a < \\dfrac{25}{4}$ のとき、" +
          "不等式の解は:\n" +
          "$$\\alpha < x < \\beta, \\quad \\alpha = \\frac{5 - \\sqrt{25-4a}}{2}, \\quad \\beta = \\frac{5 + \\sqrt{25-4a}}{2}$$\n\n" +
          "解区間 $(\\alpha, \\beta)$ の**中心は常に $\\dfrac{5}{2} = 2.5$** で固定。\n\n" +
          "したがって整数 $2$ と $3$（2.5 に最も近い整数）を含むかどうかが、整数解の個数を左右する。",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "境界値を手で確認する",
        body:
          "$a = 3$: $\\alpha \\approx 0.70$, $\\beta \\approx 4.30$ → 整数 $\\{1,2,3,4\\}$ → **4個**\n\n" +
          "$a = 4$: $D = 25-16 = 9$, $\\alpha = \\dfrac{5-3}{2} = 1$, $\\beta = \\dfrac{5+3}{2} = 4$\n" +
          "→ 開区間 $(1, 4)$ の整数: $\\{2, 3\\}$ → **2個** ✓\n\n" +
          "$a = 5$: $\\alpha = \\dfrac{5-\\sqrt{5}}{2} \\approx 1.38$, $\\beta \\approx 3.62$ → 整数 $\\{2, 3\\}$ → **2個** ✓\n\n" +
          "$a = 6$: $D = 1$, $\\alpha = 2$, $\\beta = 3$ → 開区間 $(2,3)$: 整数なし → **0個**\n\n" +
          "整数2個は $a = 4$ から $a < 6$ の範囲。",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：「1を含まない」「2を含む」条件を不等式化",
        body:
          "整数 $1$ を**排除**する（$\\alpha \\geq 1$）:\n" +
          "$$\\frac{5 - \\sqrt{25-4a}}{2} \\geq 1 \\iff 3 \\geq \\sqrt{25-4a} \\iff a \\geq 4$$\n\n" +
          "整数 $2$ を**含む**（$\\alpha < 2$）:\n" +
          "$$\\frac{5 - \\sqrt{25-4a}}{2} < 2 \\iff 1 < \\sqrt{25-4a} \\iff a < 6$$\n\n" +
          "（対称性より $\\beta \\leq 4$ は $a \\geq 4$ と同値、$\\beta > 3$ は $a < 6$ と同値。）",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密解",
        body:
          "**Step 1 ： 解区間の構造を確認**\n\n" +
          "@@why:discriminant|判別式@@ $D = 25 - 4a$。$D \\leq 0$（$a \\geq \\dfrac{25}{4}$）なら解なし（整数0個）。\n\n" +
          "$D > 0$ のとき解区間は $\\left(\\dfrac{5-\\sqrt{D}}{2},\\ \\dfrac{5+\\sqrt{D}}{2}\\right)$、中心 $x = 2.5$。\n\n" +
          "**Step 2 ： 整数 $\\{2,3\\}$ のみを含む条件**\n\n" +
          "「整数 $1$ を含まない（$\\alpha \\geq 1$）」かつ「整数 $2$ を含む（$\\alpha < 2$）」:\n" +
          "$$\\alpha \\geq 1 \\iff \\frac{5 - \\sqrt{25-4a}}{2} \\geq 1 \\iff \\sqrt{25-4a} \\leq 3 \\iff a \\geq 4$$\n" +
          "$$\\alpha < 2 \\iff \\frac{5 - \\sqrt{25-4a}}{2} < 2 \\iff \\sqrt{25-4a} > 1 \\iff a < 6$$\n\n" +
          "（区間の対称性より、$\\alpha \\geq 1 \\Leftrightarrow \\beta \\leq 4$, $\\alpha < 2 \\Leftrightarrow \\beta > 3$。）\n\n" +
          "**Step 3 ： 境界の確認**\n\n" +
          "- $a = 4$: $\\alpha = 1$（境界）、不等式は**狭義**なので $x = 1$ は解外。整数解 $\\{2,3\\}$ ✓\n" +
          "- $a = 6$: $\\alpha = 2$（境界）、$x = 2$ は解外。整数解なし ✗\n\n" +
          "$$\\boxed{4 \\leq a < 6}$$",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. 確率と二次方程式の判別式  [難易度 C / 偏差値 60]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp2-dice-discriminant-prob",
    title: "サイコロと二次方程式の判別式",
    unit: "確率",
    difficulty: "C",
    statement:
      "1 個のサイコロを 2 回投げ、1 回目に出た目を $a$、2 回目に出た目を $b$ とする。" +
      "二次方程式 $x^2 - ax + b = 0$ が実数解をもつ確率を求めよ。",
    tagline: "表で地道に数え上げ、確率の本質を見る",
    hasGraph: false,
    tags: ["確率", "判別式", "二次方程式", "場合の数"],
    university: "標準類題（オリジナル）",
    deviation: 60,
    year: 2024,
    backgroundTag: "確率と代数条件の組み合わせ",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：実数解の条件を判別式で表す",
        body:
          "二次方程式 $x^2 - ax + b = 0$ が実数解をもつ ⟺ @@why:discriminant|判別式@@ $D \\geq 0$\n\n" +
          "$$D = a^2 - 4b \\geq 0 \\iff b \\leq \\frac{a^2}{4}$$\n\n" +
          "サイコロの目は $a, b \\in \\{1,2,3,4,5,6\\}$ で全 $36$ 通り。" +
          "条件 $b \\leq \\dfrac{a^2}{4}$ を満たす $(a, b)$ の組を $a$ ごとに列挙する。",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "$a$ の値ごとに有利な $b$ を数え上げる",
        body:
          "$a = 1$: $b \\leq \\dfrac{1}{4} = 0.25$ → $b \\in \\{\\}$ → **0通り**\n\n" +
          "$a = 2$: $b \\leq 1$ → $b \\in \\{1\\}$ → **1通り**\n\n" +
          "$a = 3$: $b \\leq \\dfrac{9}{4} = 2.25$ → $b \\in \\{1, 2\\}$ → **2通り**\n\n" +
          "$a = 4$: $b \\leq 4$ → $b \\in \\{1, 2, 3, 4\\}$ → **4通り**\n\n" +
          "$a = 5$: $b \\leq 6.25$ → $b \\in \\{1,2,3,4,5,6\\}$ → **6通り**\n\n" +
          "$a = 6$: $b \\leq 9$ → $b \\in \\{1,2,3,4,5,6\\}$ → **6通り**\n\n" +
          "合計: $0 + 1 + 2 + 4 + 6 + 6 = 19$ 通り",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：数え漏れに注意する境界値",
        body:
          "$a = 4$ のとき $\\dfrac{a^2}{4} = 4$（整数）なので $b = 4$ が含まれる（$D = 0$ は実数解あり）。\n\n" +
          "$a = 5$ のとき $\\dfrac{25}{4} = 6.25 > 6$、したがって $b = 1,2,\\ldots,6$ **すべて**有効。\n\n" +
          "同様に $a = 6$ でも $\\dfrac{36}{4} = 9 > 6$ より全 $b$ が有効。",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密解",
        body:
          "**条件：** @@why:discriminant|判別式@@ $D = a^2 - 4b \\geq 0$, すなわち $b \\leq \\dfrac{a^2}{4}$\n\n" +
          "**場合の数の集計：**\n\n" +
          "| $a$ | $\\dfrac{a^2}{4}$ | 有効な $b$ の個数 |\n" +
          "|:---:|:---:|:---:|\n" +
          "| $1$ | $0.25$ | $0$ |\n" +
          "| $2$ | $1$ | $1$ |\n" +
          "| $3$ | $2.25$ | $2$ |\n" +
          "| $4$ | $4$ | $4$ |\n" +
          "| $5$ | $6.25$ | $6$ |\n" +
          "| $6$ | $9$ | $6$ |\n\n" +
          "実数解をもつ $(a, b)$ の組の総数: $0 + 1 + 2 + 4 + 6 + 6 = 19$\n\n" +
          "全事象は $6 \\times 6 = 36$ 通りだから:\n\n" +
          "$$P = \\frac{19}{36}$$\n\n" +
          "$$\\boxed{\\frac{19}{36}}$$\n\n" +
          "**補足：** 虚数解をもつ確率は $1 - \\dfrac{19}{36} = \\dfrac{17}{36}$。" +
          "わずかに実数解の方が多い——$a$ が大きいほど $b$ の許容範囲が広がるため。",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 5. 三角比の方程式（2倍角の分解）  [難易度 C / 偏差値 60]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp2-trig-double-angle-equation",
    title: "2倍角公式を使った三角方程式",
    unit: "三角比",
    difficulty: "C",
    statement:
      "$0 \\leq \\theta \\leq 2\\pi$ において、方程式 $\\sin 2\\theta + \\sin \\theta = 0$ を解け。",
    tagline: "2倍角を展開し、共通因数で因数分解",
    hasGraph: false,
    tags: ["三角比", "三角方程式", "2倍角公式", "因数分解"],
    university: "標準類題（オリジナル）",
    deviation: 60,
    year: 2024,
    backgroundTag: "2倍角公式と因数分解による三角方程式",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：2倍角公式で次数を統一する",
        body:
          "@@why:addition-sin|正弦の加法定理@@ より $\\sin 2\\theta = \\sin(\\theta + \\theta) = 2\\sin\\theta\\cos\\theta$。\n\n" +
          "代入すると $\\sin\\theta$ を共通因数として因数分解できる:\n" +
          "$$2\\sin\\theta\\cos\\theta + \\sin\\theta = \\sin\\theta(2\\cos\\theta + 1) = 0$$\n\n" +
          "「$AB = 0 \\Leftrightarrow A = 0$ または $B = 0$」の原理を適用する。",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "各解を単位円で確認",
        body:
          "**$\\sin\\theta = 0$ の解：** $\\theta = 0, \\pi, 2\\pi$\n\n" +
          "代入検証: $\\theta = \\pi$: $\\sin 2\\pi + \\sin\\pi = 0 + 0 = 0$ ✓\n\n" +
          "**$\\cos\\theta = -\\dfrac{1}{2}$ の解：** $\\theta = \\dfrac{2\\pi}{3}, \\dfrac{4\\pi}{3}$\n\n" +
          "検証: $\\theta = \\dfrac{2\\pi}{3}$: $\\sin\\dfrac{4\\pi}{3} + \\sin\\dfrac{2\\pi}{3}" +
          " = -\\dfrac{\\sqrt{3}}{2} + \\dfrac{\\sqrt{3}}{2} = 0$ ✓\n\n" +
          "検証: $\\theta = \\dfrac{4\\pi}{3}$: $\\sin\\dfrac{8\\pi}{3} + \\sin\\dfrac{4\\pi}{3}" +
          " = \\sin\\dfrac{2\\pi}{3} + \\left(-\\dfrac{\\sqrt{3}}{2}\\right) = \\dfrac{\\sqrt{3}}{2} - \\dfrac{\\sqrt{3}}{2} = 0$ ✓",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：$\\cos\\theta = -\\dfrac{1}{2}$ の解を単位円で読む",
        body:
          "$\\cos\\theta = -\\dfrac{1}{2}$ となる $\\theta \\in [0, 2\\pi]$ は、" +
          "単位円の左半分（第2・第3象限）に位置する。\n\n" +
          "基準角: $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$ を利用する。\n\n" +
          "- 第2象限: $\\theta = \\pi - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}$\n" +
          "- 第3象限: $\\theta = \\pi + \\dfrac{\\pi}{3} = \\dfrac{4\\pi}{3}$",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密解",
        body:
          "@@why:addition-sin|正弦の加法定理@@ より $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$ を代入:\n" +
          "$$2\\sin\\theta\\cos\\theta + \\sin\\theta = 0$$\n\n" +
          "$$\\sin\\theta(2\\cos\\theta + 1) = 0$$\n\n" +
          "**Case 1 ： $\\sin\\theta = 0$**\n\n" +
          "$0 \\leq \\theta \\leq 2\\pi$ において $\\theta = 0,\\ \\pi,\\ 2\\pi$\n\n" +
          "**Case 2 ： $2\\cos\\theta + 1 = 0$、すなわち $\\cos\\theta = -\\dfrac{1}{2}$**\n\n" +
          "基準角 $\\dfrac{\\pi}{3}$ を用いて:\n" +
          "- 第2象限: $\\theta = \\pi - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}$\n" +
          "- 第3象限: $\\theta = \\pi + \\dfrac{\\pi}{3} = \\dfrac{4\\pi}{3}$\n\n" +
          "以上をまとめると:\n\n" +
          "$$\\boxed{\\theta = 0,\\ \\frac{2\\pi}{3},\\ \\pi,\\ \\frac{4\\pi}{3},\\ 2\\pi}$$\n\n" +
          "**注：** $0$ と $2\\pi$ は閉区間 $[0, 2\\pi]$ の両端で、いずれも $\\sin\\theta = 0$ を満たす独立な解として計上する。",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 6. 素数の平方と 24 の倍数  [難易度 D / 偏差値 65]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp2-prime-square-div24",
    title: "素数の平方と 24 の倍数",
    unit: "整数の性質",
    difficulty: "D",
    statement:
      "$p \\geq 5$ を素数とするとき、$p^2 - 1$ は $24$ の倍数であることを証明せよ。",
    tagline: "8の倍数性と3の倍数性を独立に示せ",
    hasGraph: false,
    tags: ["整数の性質", "素数", "証明", "倍数"],
    university: "難関大系 類題",
    deviation: 65,
    year: 2024,
    backgroundTag: "素数の剰余による倍数性の証明",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：$8$ と $3$ の倍数性を別々に示す",
        body:
          "$24 = 8 \\times 3$ かつ $\\gcd(8, 3) = 1$ なので、\n\n" +
          "$$24 \\mid p^2 - 1 \\iff 8 \\mid p^2 - 1 \\text{ かつ } 3 \\mid p^2 - 1$$\n\n" +
          "を示せばよい。\n\n" +
          "$p \\geq 5$ が素数 → $p$ は奇数（$p \\neq 2$）かつ 3 の倍数でない（$p \\neq 3$）。\n" +
          "これら 2 つの性質をそれぞれ活用する。",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "小さな素数で確かめる",
        body:
          "$p = 5$: $p^2 - 1 = 24 = 24 \\times 1$ ✓\n\n" +
          "$p = 7$: $p^2 - 1 = 48 = 24 \\times 2$ ✓\n\n" +
          "$p = 11$: $p^2 - 1 = 120 = 24 \\times 5$ ✓\n\n" +
          "$p = 13$: $p^2 - 1 = 168 = 24 \\times 7$ ✓\n\n" +
          "$p = 17$: $p^2 - 1 = 288 = 24 \\times 12$ ✓\n\n" +
          "すべて 24 の倍数。$p = 4$（合成数）では $16 - 1 = 15 = 24 \\times 0.625$——倍数でない。" +
          "「$p \\geq 5$ が素数」という条件が本質的。",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：連続偶数の積と剰余による分類",
        body:
          "**8の倍数性：** $p^2 - 1 = (p-1)(p+1)$。$p$ は奇数なので $p-1$ と $p+1$ は連続する偶数。\n" +
          "連続する 2 つの偶数のうち一方は必ず $4$ の倍数 → 積は $4 \\times 2 = 8$ の倍数。\n\n" +
          "**3の倍数性：** $p$ は 3 の倍数でないから $p \\equiv 1$ または $p \\equiv 2 \\pmod{3}$。\n" +
          "いずれの場合も $p - 1$ または $p + 1$ が $3$ の倍数となることを確認せよ。",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密証明",
        body:
          "$p \\geq 5$ を素数とする。因数分解: $p^2 - 1 = (p-1)(p+1)$。\n\n" +
          "**証明 A ： $8 \\mid (p-1)(p+1)$**\n\n" +
          "$p$ は奇数（$p \\geq 5$ は素数なので $p \\neq 2$）だから、$p - 1$ と $p + 1$ は連続する偶数。\n" +
          "連続する 2 つの偶数はそれぞれ $2k$ と $2(k+1)$ と書けるが、$k$ と $k+1$ は連続整数なので一方は偶数。" +
          "よって $p - 1$ か $p + 1$ の一方は $4$ の倍数であり:\n" +
          "$$(p-1)(p+1) = 2 \\times 2 \\times (\\text{整数}) \\times 2 \\ni 8k \\quad \\text{（つまり } 8 \\mid (p-1)(p+1)\\text{）}$$\n\n" +
          "より正確には：整数 $m$ を用いて $p = 2m + 1$ とおくと\n" +
          "$$(p-1)(p+1) = 2m \\cdot 2(m+1) = 4m(m+1)$$\n" +
          "$m(m+1)$ は連続整数の積なので偶数。よって $4m(m+1)$ は $8$ の倍数。$\\checkmark$\n\n" +
          "**証明 B ： $3 \\mid (p-1)(p+1)$**\n\n" +
          "$p$ は 3 の倍数でない（$p \\geq 5$ は素数かつ $p \\neq 3$）。よって:\n" +
          "- $p \\equiv 1 \\pmod{3}$ のとき: $p - 1 \\equiv 0 \\pmod{3}$ → $3 \\mid (p-1)$\n" +
          "- $p \\equiv 2 \\pmod{3}$ のとき: $p + 1 \\equiv 0 \\pmod{3}$ → $3 \\mid (p+1)$\n\n" +
          "いずれにせよ $3 \\mid (p-1)(p+1)$。$\\checkmark$\n\n" +
          "**結論：**\n\n" +
          "$\\gcd(8, 3) = 1$、$8 \\mid p^2 - 1$、$3 \\mid p^2 - 1$ より:\n" +
          "$$24 = 8 \\times 3 \\mid p^2 - 1 \\qquad \\blacksquare$$\n\n" +
          "**一般化：** $p \\geq 5$ が素数ならば $p \\equiv \\pm 1 \\pmod{6}$（$6 = 2 \\times 3$）。" +
          "これより $p^2 \\equiv 1 \\pmod{24}$——より強い命題が成り立つ。",
      },
    ],
  },
];
