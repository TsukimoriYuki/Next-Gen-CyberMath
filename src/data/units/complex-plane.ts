import type { Problem } from "@/lib/types";

// 数学C/III「複素数平面」の発展。ショーケースの roots-of-unity を補完する
// 「正三角形条件」を扱う（初見殺しプール）。
const r = String.raw;

export const complexPlane: Problem[] = [
  {
    slug: "complex-equilateral-condition",
    title: "【初見】3点が正三角形をなす条件",
    unit: "複素数平面",
    difficulty: "D_PLUS",
    tagline: "回転 ω が、対称な等式に化ける",
    hasGraph: false,
    isMockOnly: true,
    tags: ["複素数平面", "正三角形", "1の3乗根"],
    statement: r`複素数平面上の異なる 3 点 $\alpha,\beta,\gamma$ が正三角形の頂点となるための必要十分条件が
$$\alpha^2+\beta^2+\gamma^2=\alpha\beta+\beta\gamma+\gamma\alpha$$
であることを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 回転を ω で書く",
        body: r`正三角形は「1 辺を頂点まわりに $\pm60^\circ$ 回転すると次の辺に重なる」図形。複素数では回転は掛け算なので、$1$ の原始 3 乗根 $\omega=e^{2\pi i/3}$（$\omega^2+\omega+1=0,\ \omega^3=1$）で条件が表せる。鍵は恒等式
$$\alpha^2+\beta^2+\gamma^2-\alpha\beta-\beta\gamma-\gamma\alpha=(\alpha+\omega\beta+\omega^2\gamma)(\alpha+\omega^2\beta+\omega\gamma).$$`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 掛け算＝回転を確かめ、具体例で検算",
        body: r`下のラボで「複素数の積は回転×拡大」であることを確認しよう（$\omega$ を掛けると $120^\circ$ 回転）。具体例として $\alpha=1,\ \beta=\omega,\ \gamma=\omega^2$（$1$ の 3 乗根）は正三角形をなす。実際 $\alpha^2+\beta^2+\gamma^2=1+\omega^2+\omega^4=1+\omega^2+\omega=0$、$\alpha\beta+\beta\gamma+\gamma\alpha=\omega+\omega^3+\omega^2=\omega+1+\omega^2=0$ で、条件 $0=0$ が成り立つ。

@@lab:complex-rotation-multiply@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 恒等式を展開で確かめる",
        body: r`$\omega^2+\omega+1=0,\ \omega^3=1$ を使って右辺 $(\alpha+\omega\beta+\omega^2\gamma)(\alpha+\omega^2\beta+\omega\gamma)$ を展開すると、交差項の係数 $\omega+\omega^2=-1$ により $\alpha^2+\beta^2+\gamma^2-\alpha\beta-\beta\gamma-\gamma\alpha$ になる。各因子 $=0$ が、2 つの向きの正三角形に対応する。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\omega=e^{2\pi i/3}$ を $1$ の原始 3 乗根とする（$\omega^3=1,\ \omega^2+\omega+1=0$）。

**因数分解の恒等式。** 右辺を展開する。
$$(\alpha+\omega\beta+\omega^2\gamma)(\alpha+\omega^2\beta+\omega\gamma).$$
平方項は $\alpha^2$、$\omega\cdot\omega^2\,\beta^2=\omega^3\beta^2=\beta^2$、$\omega^2\cdot\omega\,\gamma^2=\gamma^2$。交差項は
$$\alpha\beta(\omega^2+\omega)+\beta\gamma(\omega^2+\omega^4)+\gamma\alpha(\omega+\omega^2).$$
$\omega+\omega^2=-1$、$\omega^4=\omega$ より $\omega^2+\omega^4=\omega^2+\omega=-1$。よって交差項は $-(\alpha\beta+\beta\gamma+\gamma\alpha)$。したがって
$$(\alpha+\omega\beta+\omega^2\gamma)(\alpha+\omega^2\beta+\omega\gamma)=\alpha^2+\beta^2+\gamma^2-\alpha\beta-\beta\gamma-\gamma\alpha.\tag{$\star$}$$

**幾何的意味。** 正三角形（頂点を一方向にたどる）であることは、辺 $\beta-\alpha$ を $\alpha$ のまわりに $60^\circ$ 回転すると $\gamma-\alpha$ に重なること、すなわち $\gamma-\alpha=(\beta-\alpha)e^{i\pi/3}$。$e^{i\pi/3}=-\omega^2$ を代入して整理すると
$$\gamma-\alpha=-\omega^2(\beta-\alpha)\ \Longrightarrow\ \alpha+\omega\beta+\omega^2\gamma=0$$
（両辺に適当に $\omega$ を掛けて $1+\omega+\omega^2=0$ を使うと得られる）。逆向きの正三角形は同様に $\alpha+\omega^2\beta+\omega\gamma=0$。

**同値性。** ゆえに「$\alpha,\beta,\gamma$ が正三角形」$\iff$「$\alpha+\omega\beta+\omega^2\gamma=0$ または $\alpha+\omega^2\beta+\omega\gamma=0$」$\iff$（$\star$ より）「$(\alpha+\omega\beta+\omega^2\gamma)(\alpha+\omega^2\beta+\omega\gamma)=0$」$\iff$
$$\alpha^2+\beta^2+\gamma^2-\alpha\beta-\beta\gamma-\gamma\alpha=0,$$
すなわち $\alpha^2+\beta^2+\gamma^2=\alpha\beta+\beta\gamma+\gamma\alpha$。$\blacksquare$

**メタ。** 対称な等式 $\alpha^2+\beta^2+\gamma^2=\alpha\beta+\beta\gamma+\gamma\alpha$ は、向き（時計回り／反時計回り）を区別しない。それが「2 つの因子の積 $=0$」という形に正確に反映されている。回転を $\omega$ という代数に翻訳した瞬間、幾何の条件が完全平方和 $\frac12\sum(\alpha-\beta)^2=0$ とも書ける対称式に化ける——これが複素数平面の威力。`,
      },
    ],
  },
];
