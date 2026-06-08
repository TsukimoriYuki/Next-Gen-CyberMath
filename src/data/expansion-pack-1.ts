// Expansion Pack 1 — 数学1A 良問集（難易度 A〜D）
// src/data/problems.ts の RAW_PROBLEMS に展開して使用する。
// prisma/seed.ts でも参照可能。

export const EXPANSION_PACK_1: any[] = [
  // ─────────────────────────────────────────────────────────────────
  // 1. 解と係数の関係による連鎖問題  [難易度 A / 偏差値 50]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp1-vieta-formulas-chain",
    title: "解と係数の関係による連鎖問題",
    unit: "二次方程式",
    difficulty: "A",
    statement:
      "二次方程式 $x^2 + ax + b = 0$ の2つの解が $3$ と $-1$ であるとき、定数 $a, b$ の値を求めよ。" +
      "さらに、これらの $a, b$ を係数に持つ方程式 $x^2 + bx + a = 0$ の解を求めよ。",
    tagline: "解と係数の関係を二段階で活用する",
    hasGraph: false,
    tags: ["解と係数の関係", "二次方程式", "解の公式"],
    university: "標準類題（オリジナル）",
    deviation: 50,
    year: 2024,
    backgroundTag: "解と係数の関係",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：代入よりも Viète が速い",
        body:
          "2解が与えられているとき、両解を代入して連立方程式を解く方法もあるが、" +
          "@@why:vieta|解と係数の関係@@ を用いると一撃で $a, b$ が決まる。\n\n" +
          "二次方程式 $x^2 + px + q = 0$ の2解を $\\alpha, \\beta$ とすると:\n" +
          "$$\\alpha + \\beta = -p, \\quad \\alpha\\beta = q$$",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "具体的に代入して検証",
        body:
          "$x = 3$ を代入: $9 + 3a + b = 0$ …①\n\n" +
          "$x = -1$ を代入: $1 - a + b = 0$ …②\n\n" +
          "①$-$②: $8 + 4a = 0 \\implies a = -2$, ②より $b = a - 1 = -3$。\n\n" +
          "次に @@why:vieta|解と係数の関係@@ で確認:\n" +
          "$$3 + (-1) = 2 = -a \\implies a = -2 \\quad \\checkmark$$\n" +
          "$$3 \\times (-1) = -3 = b \\implies b = -3 \\quad \\checkmark$$",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：新しい方程式を整理する",
        body:
          "$a = -2, b = -3$ を $x^2 + bx + a = 0$ に代入すると:\n" +
          "$$x^2 - 3x - 2 = 0$$\n\n" +
          "判別式 $D = 9 + 8 = 17 > 0$ なので2つの実数解を持つ。解の公式を適用せよ。",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密解",
        body:
          "**Step 1 ： $a, b$ を求める**\n\n" +
          "@@why:vieta|解と係数の関係@@ より、$\\alpha = 3$, $\\beta = -1$ に対して:\n" +
          "$$\\alpha + \\beta = 3 + (-1) = 2 = -a \\implies \\boxed{a = -2}$$\n" +
          "$$\\alpha\\beta = 3 \\times (-1) = -3 = b \\implies \\boxed{b = -3}$$\n\n" +
          "**Step 2 ： 新しい方程式 $x^2 + bx + a = 0$ を解く**\n\n" +
          "$a = -2, b = -3$ を代入:\n" +
          "$$x^2 - 3x - 2 = 0$$\n\n" +
          "解の公式より:\n" +
          "$$x = \\frac{3 \\pm \\sqrt{9 + 8}}{2} = \\frac{3 \\pm \\sqrt{17}}{2}$$\n\n" +
          "$$\\boxed{a = -2,\\ b = -3,\\qquad x = \\frac{3 \\pm \\sqrt{17}}{2}}$$",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. 軸が動く二次関数の最小値  [難易度 B / 偏差値 55]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp1-quadratic-min-moving-axis",
    title: "軸が動く二次関数の最小値",
    unit: "二次関数",
    difficulty: "B",
    statement:
      "$f(x) = x^2 - 2ax + a$ を定義域 $0 \\leq x \\leq 1$ で考える。" +
      "定数 $a$ の値に応じて場合分けし、最小値 $m(a)$ を求めよ。",
    tagline: "軸の位置で3通りに分けよ",
    hasGraph: false,
    tags: ["二次関数", "最大最小", "場合分け", "軸"],
    university: "標準類題（オリジナル）",
    deviation: 55,
    year: 2024,
    backgroundTag: "定義域固定・軸移動の最小値",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：軸 $x = a$ の位置を分類する",
        body:
          "放物線 $y = x^2 - 2ax + a$（下に凸）の軸は $x = a$。\n\n" +
          "@@why:minimax|最小値の原理@@ より、下に凸の放物線の最小値は" +
          "必ず**頂点か端点**で達成される。定義域 $[0,1]$ に対して:\n\n" +
          "- **左外** $a < 0$：区間上で単調増加 → 左端点 $x = 0$ で最小\n" +
          "- **内部** $0 \\leq a \\leq 1$：頂点 $x = a$ で最小\n" +
          "- **右外** $a > 1$：区間上で単調減少 → 右端点 $x = 1$ で最小",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "3ケースを具体値で確認",
        body:
          "**$a = -1$（左外）：**\n" +
          "$f(0) = 0 - 0 + (-1) = -1$、$f(1) = 1 + 2 - 1 = 2$ → 最小 $= -1$\n\n" +
          "**$a = \\dfrac{1}{2}$（内部）：**\n" +
          "$f\\!\\left(\\dfrac{1}{2}\\right) = \\dfrac{1}{4} - 2 \\cdot \\dfrac{1}{2} \\cdot \\dfrac{1}{2} + \\dfrac{1}{2}" +
          " = \\dfrac{1}{4} - \\dfrac{1}{2} + \\dfrac{1}{2} = \\dfrac{1}{4}$\n\n" +
          "あれ、頂点の $y$ 座標を直接計算: $f(a) = a^2 - 2a^2 + a = -a^2 + a$。\n" +
          "$a = \\tfrac{1}{2}$ なら $-\\tfrac{1}{4} + \\tfrac{1}{2} = \\tfrac{1}{4}$ ✓\n\n" +
          "**$a = 2$（右外）：**\n" +
          "$f(0) = 2$、$f(1) = 1 - 4 + 2 = -1$ → 最小 $= -1$",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：各点の値を先に整理",
        body:
          "必要な計算を一覧しておく:\n" +
          "$$f(0) = a, \\quad f(1) = 1 - 2a + a = 1 - a, \\quad f(a) = -a^2 + a$$\n\n" +
          "3ケースそれぞれで「最小を与える $x$」を確定し、対応する値を答えとする。",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密解",
        body:
          "軸 $x = a$ の位置で場合分けする。\n\n" +
          "**Case 1 ： $a < 0$（軸が定義域の左外）**\n\n" +
          "$f$ は $[0,1]$ 上で単調増加。最小値は $x = 0$:\n" +
          "$$m(a) = f(0) = a$$\n\n" +
          "**Case 2 ： $0 \\leq a \\leq 1$（軸が定義域の内部）**\n\n" +
          "頂点 $x = a$ で最小値を達成:\n" +
          "$$m(a) = f(a) = a^2 - 2a^2 + a = -a^2 + a$$\n\n" +
          "**Case 3 ： $a > 1$（軸が定義域の右外）**\n\n" +
          "$f$ は $[0,1]$ 上で単調減少。最小値は $x = 1$:\n" +
          "$$m(a) = f(1) = 1 - a$$\n\n" +
          "まとめると:\n" +
          "$$\\boxed{m(a) = \\begin{cases} a & (a < 0) \\\\ -a^2 + a & (0 \\leq a \\leq 1) \\\\ 1 - a & (a > 1) \\end{cases}}$$",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. 奇数の平方と 8 の倍数  [難易度 B / 偏差値 55]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp1-odd-square-div8",
    title: "奇数の平方と 8 の倍数",
    unit: "整数の性質",
    difficulty: "B",
    statement:
      "任意の奇数 $n$ に対して、$n^2 - 1$ は $8$ の倍数であることを証明せよ。",
    tagline: "連続する偶数の積に分解せよ",
    hasGraph: false,
    tags: ["整数の性質", "偶奇", "証明", "倍数"],
    university: "標準類題（オリジナル）",
    deviation: 55,
    year: 2024,
    backgroundTag: "整数の偶奇と倍数性",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：差の積への因数分解",
        body:
          "$$n^2 - 1 = (n-1)(n+1)$$\n\n" +
          "奇数 $n$ に対して $n - 1$ と $n + 1$ は**連続する偶数**である。\n" +
          "このことが 8 の倍数性の核心。\n\n" +
          "**整数問題の定石：** $n$ が奇数 $\\Leftrightarrow n = 2k + 1$（$k$ は整数）と表せる。" +
          "文字 $k$ を導入して代数的に処理する。",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "小さな奇数で実験",
        body:
          "$n = 1$： $1^2 - 1 = 0 = 8 \\times 0$ ✓\n\n" +
          "$n = 3$： $9 - 1 = 8 = 8 \\times 1$ ✓\n\n" +
          "$n = 5$： $25 - 1 = 24 = 8 \\times 3$ ✓\n\n" +
          "$n = 7$： $49 - 1 = 48 = 8 \\times 6$ ✓\n\n" +
          "$n = -3$： $9 - 1 = 8 = 8 \\times 1$ ✓（負の奇数でも成立）\n\n" +
          "商 $0, 1, 3, 6, \\ldots$ は三角数 $T_k = \\dfrac{k(k+1)}{2}$ の系列——" +
          "証明後にこの構造が明らかになる。",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：連続整数の積は必ず偶数",
        body:
          "$n = 2k + 1$（$k$ は整数）とおくと:\n" +
          "$$n - 1 = 2k, \\quad n + 1 = 2(k + 1)$$\n\n" +
          "よって $(n-1)(n+1) = 4k(k+1)$。\n\n" +
          "$k$ と $k + 1$ は**連続する整数**なので一方は必ず偶数。" +
          "これを $k(k+1) = 2m$（$m$ は整数）と表せることを使え。",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密証明",
        body:
          "$n$ を奇数とする。整数 $k$ を用いて $n = 2k + 1$ と表せる。\n\n" +
          "$$n^2 - 1 = (n-1)(n+1) = 2k \\cdot 2(k+1) = 4k(k+1)$$\n\n" +
          "$k$ と $k + 1$ は連続する整数だから、一方は偶数である。" +
          "すなわちある整数 $m$ が存在して $k(k+1) = 2m$ と書ける。\n\n" +
          "$$n^2 - 1 = 4 \\cdot 2m = 8m$$\n\n" +
          "よって $n^2 - 1$ は $8$ の倍数である。$\\blacksquare$\n\n" +
          "**補足（構造の美しさ）：** $m = \\dfrac{k(k+1)}{2}$ は第 $k$ 三角数 $T_k$ に等しい。" +
          "したがって $n^2 - 1 = 8T_k$ が成り立つ。" +
          "奇数の平方を正方形として図示すると、" +
          "それを1辺の差 1 の等差級数として分解したとき底辺が三角数になる——という幾何的解釈がある。",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. 円上の点と定点を結ぶ中点の軌跡  [難易度 C / 偏差値 60]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp1-locus-midpoint-circle",
    title: "円上の点と定点を結ぶ中点の軌跡",
    unit: "図形と方程式",
    difficulty: "C",
    statement:
      "円 $C: x^2 + y^2 = 9$ 上の点 $\\mathrm{P}$ と定点 $\\mathrm{A}(4,\\, 0)$ を結ぶ" +
      "線分 $\\mathrm{PA}$ の中点 $\\mathrm{M}$ の軌跡を求めよ。",
    tagline: "MからPを逆算して円の条件を代入する",
    hasGraph: false,
    tags: ["軌跡", "円", "パラメータ消去", "中点"],
    university: "標準類題（オリジナル）",
    deviation: 60,
    year: 2024,
    backgroundTag: "中点の軌跡と円のスケーリング",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：軌跡問題の定石",
        body:
          "@@why:param-existence|パラメータ消去@@ の王道手順:\n\n" +
          "1. **求める点 $\\mathrm{M} = (X, Y)$ とおく**\n" +
          "2. 条件から $\\mathrm{P}$ を $X, Y$ で表す（逆算）\n" +
          "3. $\\mathrm{P}$ が満たす制約（円の方程式）を $X, Y$ の式に変換する\n\n" +
          "これにより $\\mathrm{P}$ のパラメータが消去され、" +
          "$\\mathrm{M}$ の軌跡方程式が得られる。",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "特殊点で形を予測する",
        body:
          "$\\mathrm{P} = (3, 0)$（右端）: $\\mathrm{M} = \\left(\\dfrac{7}{2}, 0\\right)$\n\n" +
          "$\\mathrm{P} = (-3, 0)$（左端）: $\\mathrm{M} = \\left(\\dfrac{1}{2}, 0\\right)$\n\n" +
          "$\\mathrm{P} = (0, 3)$（頂点）: $\\mathrm{M} = \\left(2, \\dfrac{3}{2}\\right)$\n\n" +
          "$\\mathrm{P} = (0, -3)$（底点）: $\\mathrm{M} = \\left(2, -\\dfrac{3}{2}\\right)$\n\n" +
          "$x$ 方向: $\\left[\\dfrac{1}{2}, \\dfrac{7}{2}\\right]$、中央 $x = 2$、幅 $3$。半径 $\\dfrac{3}{2}$ の円が予測される。",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：P を M で表す",
        body:
          "中点の定義 $\\mathrm{M} = \\dfrac{\\mathrm{P} + \\mathrm{A}}{2}$ より:\n" +
          "$$\\mathrm{P} = 2\\mathrm{M} - \\mathrm{A} = (2X - 4,\\ 2Y)$$\n\n" +
          "$\\mathrm{P}$ が円 $x^2 + y^2 = 9$ 上にある条件:\n" +
          "$$(2X - 4)^2 + (2Y)^2 = 9$$\n\n" +
          "この式を整理して $(X-a)^2 + Y^2 = r^2$ の形に変形せよ。",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密解",
        body:
          "$\\mathrm{M} = (X, Y)$ とおくと、中点公式より:\n" +
          "$$\\mathrm{P} = 2\\mathrm{M} - \\mathrm{A} = (2X - 4,\\ 2Y)$$\n\n" +
          "$\\mathrm{P}$ は円 $C: x^2 + y^2 = 9$ 上にあるから:\n" +
          "$$(2X - 4)^2 + (2Y)^2 = 9$$\n\n" +
          "展開・整理:\n" +
          "$$4(X - 2)^2 + 4Y^2 = 9 \\implies (X - 2)^2 + Y^2 = \\frac{9}{4}$$\n\n" +
          "$$\\boxed{\\text{中心 }(2,\\ 0)\\text{, 半径 }\\frac{3}{2}\\text{ の円}}$$\n\n" +
          "**幾何的解釈：** 元の円（中心 $O = (0,0)$、半径 $3$）と定点 $\\mathrm{A}(4,0)$ の中点を" +
          "中心とし、半径を $\\dfrac{1}{2}$ 倍した円になっている。\n\n" +
          "一般に円 $x^2 + y^2 = r^2$ と定点 $\\mathrm{A}(a, 0)$ の" +
          "中点の軌跡は $\\left(x - \\dfrac{a}{2}\\right)^2 + y^2 = \\dfrac{r^2}{4}$。",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 5. 余弦定理・正弦定理の総合問題  [難易度 C / 偏差値 60]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp1-cosine-sine-area",
    title: "余弦定理・正弦定理の総合問題",
    unit: "三角比",
    difficulty: "C",
    statement:
      "三角形 $\\mathrm{ABC}$ において $\\cos A = \\dfrac{1}{3}$, $b = \\sqrt{3}$, $c = 3\\sqrt{3}$ のとき、" +
      "辺 $a$, $\\sin B$ および面積 $S$ を求めよ。",
    tagline: "余弦定理で辺を決め、正弦定理で角を追う",
    hasGraph: false,
    tags: ["三角比", "余弦定理", "正弦定理", "面積", "三角形"],
    university: "標準類題（オリジナル）",
    deviation: 60,
    year: 2024,
    backgroundTag: "余弦定理から正弦定理への連携",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：使う公式の順序を決める",
        body:
          "与えられた情報: 2辺 $b, c$ とそれらが挟む角 $A$ の $\\cos$ 値。\n\n" +
          "**手順:**\n" +
          "① @@why:law-of-cosines|余弦定理@@ $a^2 = b^2 + c^2 - 2bc\\cos A$ で $a$ を求める\n" +
          "② $\\sin A$ を $\\cos A = \\dfrac{1}{3}$ と $\\sin^2 A + \\cos^2 A = 1$ で求める\n" +
          "③ 正弦定理 $\\dfrac{b}{\\sin B} = \\dfrac{a}{\\sin A}$ で $\\sin B$ を求める\n" +
          "④ 面積公式 $S = \\dfrac{1}{2}bc\\sin A$ で $S$ を求める",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "数値計算の下準備",
        body:
          "$\\sin A = \\sqrt{1 - \\cos^2 A} = \\sqrt{1 - \\dfrac{1}{9}} = \\sqrt{\\dfrac{8}{9}} = \\dfrac{2\\sqrt{2}}{3}$\n\n" +
          "（$0 < A < \\pi$ より $\\sin A > 0$）\n\n" +
          "$bc = \\sqrt{3} \\times 3\\sqrt{3} = 9$\n\n" +
          "@@why:law-of-cosines|余弦定理@@ の計算:\n" +
          "$$a^2 = b^2 + c^2 - 2bc\\cos A = 3 + 27 - 2 \\times 9 \\times \\frac{1}{3} = 30 - 6 = 24$$\n" +
          "$$a = 2\\sqrt{6}$$",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：$\\sin B$ の鋭角・鈍角判定",
        body:
          "正弦定理より:\n" +
          "$$\\sin B = \\frac{b \\sin A}{a} = \\frac{\\sqrt{3} \\cdot \\dfrac{2\\sqrt{2}}{3}}{2\\sqrt{6}}" +
          " = \\frac{\\dfrac{2\\sqrt{6}}{3}}{2\\sqrt{6}} = \\frac{1}{3}$$\n\n" +
          "$\\sin B = \\dfrac{1}{3}$ だけでは $B$ が鋭角・鈍角か確定しない。\n\n" +
          "**判定：** $b < a$ ならば $B < A$。$\\cos A = \\dfrac{1}{3} > 0$ より $A$ は鋭角。" +
          "$B < A < \\dfrac{\\pi}{2}$ なので $B$ も鋭角。",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密解",
        body:
          "**Step 1 ： $\\sin A$ を求める**\n" +
          "$$\\sin A = \\sqrt{1 - \\left(\\frac{1}{3}\\right)^2} = \\sqrt{\\frac{8}{9}} = \\frac{2\\sqrt{2}}{3}$$\n\n" +
          "**Step 2 ： @@why:law-of-cosines|余弦定理@@ で $a$ を求める**\n" +
          "$$a^2 = b^2 + c^2 - 2bc\\cos A = 3 + 27 - 2 \\cdot \\sqrt{3} \\cdot 3\\sqrt{3} \\cdot \\frac{1}{3} = 30 - 6 = 24$$\n" +
          "$$\\therefore\\quad a = 2\\sqrt{6}$$\n\n" +
          "**Step 3 ： 正弦定理で $\\sin B$ を求める**\n" +
          "$$\\sin B = \\frac{b\\sin A}{a} = \\frac{\\sqrt{3} \\cdot \\dfrac{2\\sqrt{2}}{3}}{2\\sqrt{6}}" +
          " = \\frac{1}{3}$$\n\n" +
          "$b = \\sqrt{3} < 2\\sqrt{6} = a$ より $B < A < \\dfrac{\\pi}{2}$、" +
          "ゆえに $B$ は鋭角で確定。\n\n" +
          "**Step 4 ： 面積**\n" +
          "$$S = \\frac{1}{2}bc\\sin A = \\frac{1}{2} \\cdot \\sqrt{3} \\cdot 3\\sqrt{3} \\cdot \\frac{2\\sqrt{2}}{3}" +
          " = \\frac{1}{2} \\cdot 9 \\cdot \\frac{2\\sqrt{2}}{3} = 3\\sqrt{2}$$\n\n" +
          "$$\\boxed{a = 2\\sqrt{6},\\quad \\sin B = \\frac{1}{3},\\quad S = 3\\sqrt{2}}$$",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // 6. 単位分数の不定方程式  [難易度 D / 偏差値 65]
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "exp1-diophantine-unit-fractions",
    title: "単位分数の不定方程式",
    unit: "整数の性質",
    difficulty: "D",
    statement:
      "正の整数 $x, y$ の組 $(x, y)$ で $\\dfrac{1}{x} + \\dfrac{1}{y} = \\dfrac{1}{12}$ を" +
      "満たすものをすべて求めよ。",
    tagline: "積の形に変形して約数問題に帰着する",
    hasGraph: false,
    tags: ["整数の性質", "不定方程式", "約数", "因数分解"],
    university: "難関大系 類題",
    deviation: 65,
    year: 2024,
    backgroundTag: "単位分数の不定方程式と因数分解テクニック",
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点：Simon's Favorite Factoring Trick",
        body:
          "$\\dfrac{1}{x} + \\dfrac{1}{y} = \\dfrac{1}{12}$ を分母払いすると $12(x+y) = xy$、" +
          "整理して $xy - 12x - 12y = 0$。\n\n" +
          "このままでは因数分解できないが、**両辺に $12^2 = 144$ を加える**と:\n" +
          "$$(x - 12)(y - 12) = 144$$\n\n" +
          "これにより「$144$ の正の因数分解問題」に帰着する。\n\n" +
          "**制約の確認：** $x \\leq 12$ とすると $\\dfrac{1}{x} \\geq \\dfrac{1}{12}$、" +
          "よって $\\dfrac{1}{y} \\leq 0$ となり $y > 0$ に矛盾。ゆえに $x > 12$（$y$ も同様）。",
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "手で解を確認する",
        body:
          "$x = 13$: $\\dfrac{1}{y} = \\dfrac{1}{12} - \\dfrac{1}{13} = \\dfrac{1}{156}$ → $y = 156$ ✓\n\n" +
          "$x = 15$: $\\dfrac{1}{y} = \\dfrac{1}{12} - \\dfrac{1}{15} = \\dfrac{5-4}{60} = \\dfrac{1}{60}$ → $y = 60$ ✓\n\n" +
          "$x = 24$: $\\dfrac{1}{y} = \\dfrac{1}{12} - \\dfrac{1}{24} = \\dfrac{1}{24}$ → $y = 24$ ✓\n\n" +
          "$(x-12)(y-12)$ で検証: $(13-12)(156-12) = 1 \\times 144 = 144$ ✓\n" +
          "$(15-12)(60-12) = 3 \\times 48 = 144$ ✓",
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント：$144$ の約数を列挙する",
        body:
          "$s = x - 12 \\geq 1$, $t = y - 12 \\geq 1$ として $st = 144$ の正整数解を求める。\n\n" +
          "$144 = 2^4 \\times 3^2$\n\n" +
          "約数の個数: $(4+1)(2+1) = 15$ 個。\n\n" +
          "すなわち $st = 144$ を満たす正整数の順序対 $(s, t)$ は **15 組** 存在する。",
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密解",
        body:
          "**Step 1 ： 式変形**\n" +
          "$$\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{12} \\implies 12(x+y) = xy$$\n" +
          "$$\\implies xy - 12x - 12y + 144 = 144 \\implies (x-12)(y-12) = 144$$\n\n" +
          "**Step 2 ： $x, y > 12$ の確認**\n\n" +
          "$x \\leq 12$ とすると $\\dfrac{1}{x} \\geq \\dfrac{1}{12}$、$\\dfrac{1}{y} \\leq 0$ となり矛盾。" +
          "したがって $s = x - 12 \\geq 1$, $t = y - 12 \\geq 1$。\n\n" +
          "**Step 3 ： $st = 144$ の全解列挙**\n\n" +
          "$144 = 2^4 \\times 3^2$。正の約数は 15 個。" +
          "$(s, t)$ を $s \\leq t$ に限れば 8 組、$s > t$ の 7 組と合わせて全 15 組。\n\n" +
          "$s \\leq t$ の場合（各行の $(y,x)$ 逆順も解）:\n\n" +
          "$(s,t) = (1, 144)$ → $(x,y) = (13, 156)$\n" +
          "$(s,t) = (2, 72)$ → $(x,y) = (14, 84)$\n" +
          "$(s,t) = (3, 48)$ → $(x,y) = (15, 60)$\n" +
          "$(s,t) = (4, 36)$ → $(x,y) = (16, 48)$\n" +
          "$(s,t) = (6, 24)$ → $(x,y) = (18, 36)$\n" +
          "$(s,t) = (8, 18)$ → $(x,y) = (20, 30)$\n" +
          "$(s,t) = (9, 16)$ → $(x,y) = (21, 28)$\n" +
          "$(s,t) = (12, 12)$ → $(x,y) = (24, 24)$（$x = y$ の唯一の解）\n\n" +
          "**$(x, y)$ の全解（$x \\leq y$ のもの 8 組、全順序対 15 組）:**\n" +
          "$$(13, 156),\\ (14, 84),\\ (15, 60),\\ (16, 48),\\ (18, 36),\\ (20, 30),\\ (21, 28),\\ (24, 24)$$\n" +
          "及び $x > y$ の 7 組（各組の $x, y$ を入れ替えたもの）。\n\n" +
          "$$\\boxed{\\text{$x \\leq y$ に限れば 8 組、順序対として 15 組が解}}$$\n\n" +
          "**一般化：** $\\dfrac{1}{x} + \\dfrac{1}{y} = \\dfrac{1}{n}$ の正整数解の個数は " +
          "$n^2$ の約数の個数 $\\tau(n^2)$ に等しい。$n = 12 = 2^2 \\times 3$ のとき " +
          "$n^2 = 2^4 \\times 3^2$, $\\tau(n^2) = 15$。",
      },
    ],
  },
];
