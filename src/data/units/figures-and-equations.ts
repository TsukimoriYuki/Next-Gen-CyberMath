import type { Problem } from "@/lib/types";

// 数学II「図形と方程式」— 15 問 (A4/B4/C4/D2/D+1)。
// 既存ショーケース (通過領域・頂点の軌跡) と同じ unit "図形と方程式" に統合される。
const r = String.raw;

export const figuresAndEquations: Problem[] = [
  // ============================== A (4) ==============================
  {
    slug: "distance-two-points",
    title: "2 点間の距離",
    unit: "図形と方程式",
    difficulty: "A",
    tagline: "三平方の定理そのもの",
    hasGraph: false,
    tags: ["2点間の距離"],
    statement: r`2 点 $\mathrm A(1,2),\ \mathrm B(4,6)$ の間の距離を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 距離公式", body: r`$\mathrm{AB}=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\sqrt{3^2+4^2}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\mathrm{AB}=\sqrt{(4-1)^2+(6-2)^2}=\sqrt{9+16}=5$。` },
    ],
  },
  {
    slug: "internal-external-division-2d",
    title: "内分点と外分点",
    unit: "図形と方程式",
    difficulty: "A",
    tagline: "符号で内外を切り替える",
    hasGraph: false,
    tags: ["内分点", "外分点"],
    statement: r`2 点 $\mathrm A(-1,2),\ \mathrm B(5,-4)$ を $1:2$ に内分する点 $\mathrm P$、外分する点 $\mathrm Q$ の座標を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 公式", body: r`内分 $\dfrac{n\mathrm A+m\mathrm B}{m+n}$、外分 $\dfrac{-n\mathrm A+m\mathrm B}{m-n}$（$m:n=1:2$）。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`内分 $\dfrac{2\mathrm A+\mathrm B}{3}$、外分 $\dfrac{-2\mathrm A+\mathrm B}{-1}=2\mathrm A-\mathrm B$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`内分 $\mathrm P=\dfrac{2(-1,2)+(5,-4)}{3}=\dfrac{(3,0)}{3}=(1,0)$。
外分 $\mathrm Q=2(-1,2)-(5,-4)=(-2-5,\ 4+4)=(-7,8)$。` },
    ],
  },
  {
    slug: "line-through-two-points",
    title: "2 点を通る直線",
    unit: "図形と方程式",
    difficulty: "A",
    tagline: "傾きを出して点を通す",
    hasGraph: false,
    tags: ["直線の方程式"],
    statement: r`2 点 $(1,2),\ (3,6)$ を通る直線の方程式を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 傾き", body: r`傾き $=\dfrac{6-2}{3-1}=2$。点 $(1,2)$ を通る。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$y-2=2(x-1)$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$y-2=2(x-1)\Rightarrow y=2x$。` },
    ],
  },
  {
    slug: "circle-equation-center-radius",
    title: "円の方程式",
    unit: "図形と方程式",
    difficulty: "A",
    tagline: "(x−a)²+(y−b)²=r²",
    hasGraph: false,
    tags: ["円の方程式"],
    statement: r`中心 $(1,-2)$、半径 $3$ の円の方程式を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 標準形", body: r`中心 $(a,b)$、半径 $r$ の円は $(x-a)^2+(y-b)^2=r^2$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$(x-1)^2+(y+2)^2=3^2$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$(x-1)^2+(y+2)^2=9$。` },
    ],
  },

  // ============================== B (4) ==============================
  {
    slug: "perpendicular-line",
    title: "垂直な直線",
    unit: "図形と方程式",
    difficulty: "B",
    tagline: "傾きの積が −1",
    hasGraph: false,
    tags: ["直線の方程式", "垂直条件"],
    statement: r`点 $(2,3)$ を通り、直線 $y=2x-1$ に垂直な直線の方程式を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 垂直の傾き", body: r`垂直な 2 直線の傾きの積は $-1$。$y=2x-1$ に垂直なら傾き $-\dfrac12$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$y-3=-\dfrac12(x-2)$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`傾き $-\dfrac12$ で $(2,3)$ を通る：$y=-\dfrac12(x-2)+3=-\dfrac12x+4$。` },
    ],
  },
  {
    slug: "distance-point-line",
    title: "点と直線の距離",
    unit: "図形と方程式",
    difficulty: "B",
    tagline: "|ax₀+by₀+c| / √(a²+b²)",
    hasGraph: false,
    tags: ["点と直線の距離"],
    statement: r`点 $(2,1)$ と直線 $3x+4y-1=0$ の距離を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 距離公式", body: r`距離 $=\dfrac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\dfrac{|3\cdot2+4\cdot1-1|}{\sqrt{9+16}}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\dfrac{|6+4-1|}{\sqrt{25}}=\dfrac{9}{5}$。` },
    ],
  },
  {
    slug: "circle-general-form",
    title: "一般形から中心と半径",
    unit: "図形と方程式",
    difficulty: "B",
    tagline: "平方完成で標準形へ",
    hasGraph: false,
    tags: ["円の方程式", "平方完成"],
    statement: r`円 $x^2+y^2-4x+6y-3=0$ の中心と半径を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 平方完成", body: r`$x,y$ それぞれ平方完成して $(x-a)^2+(y-b)^2=r^2$ の形にする。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$(x^2-4x)+(y^2+6y)=(x-2)^2-4+(y+3)^2-9$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$(x-2)^2+(y+3)^2=3+4+9=16$。中心 $(2,-3)$、半径 $4$。` },
    ],
  },
  {
    slug: "line-circle-intersection-count",
    title: "直線と円の共有点の個数",
    unit: "図形と方程式",
    difficulty: "B",
    tagline: "中心と直線の距離 vs 半径",
    hasGraph: false,
    tags: ["円の方程式", "点と直線の距離"],
    statement: r`直線 $y=x+1$ と円 $x^2+y^2=1$ の共有点の個数を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 距離で判定", body: r`中心 $\mathrm O(0,0)$ と直線の距離 $d$ と半径 $r$ を比べる。$d<r$ で 2 個、$d=r$ で 1 個、$d>r$ で 0 個。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`直線 $x-y+1=0$、$d=\dfrac{|0-0+1|}{\sqrt2}=\dfrac1{\sqrt2}$、$r=1$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$d=\dfrac{1}{\sqrt2}<1=r$ なので、共有点は $2$ 個。` },
    ],
  },

  // ============================== C (4) ==============================
  {
    slug: "locus-midpoint-circle",
    title: "中点の軌跡",
    unit: "図形と方程式",
    difficulty: "C",
    tagline: "動点を媒介変数で消す",
    hasGraph: false,
    tags: ["軌跡", "円の方程式"],
    statement: r`点 $\mathrm P$ が円 $x^2+y^2=4$ 上を動くとき、定点 $\mathrm A(4,0)$ と $\mathrm P$ の中点 $\mathrm M$ が描く軌跡を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 軌跡の基本手順",
        body: r`求める点を $\mathrm M=(x,y)$ とおき、動く原因（点 $\mathrm P$）を $\mathrm M$ で表して、$\mathrm P$ がみたす条件式に**代入して消去**する。残った $x,y$ の関係式が軌跡。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 動点を主役の座標で表す",
        body: r`$\mathrm M$ は $\mathrm A(4,0)$ と $\mathrm P$ の中点だから $\mathrm M=\dfrac{\mathrm A+\mathrm P}{2}$、逆に解くと $\mathrm P=2\mathrm M-\mathrm A=(2x-4,\ 2y)$。$\mathrm P$ が円 $X^2+Y^2=4$ 上を動くという条件に、この $\mathrm P$ を入れれば $\mathrm M=(x,y)$ の式になる。「逆に解いて代入」が消去の心臓。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\mathrm P=(2x-4,\,2y)$ が $X^2+Y^2=4$ をみたす。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\mathrm M=(x,y)$ とおくと、中点の関係から $\mathrm P=2\mathrm M-\mathrm A=(2x-4,\ 2y)$。$\mathrm P$ は円 $X^2+Y^2=4$ 上にあるので
$$(2x-4)^2+(2y)^2=4.$$
左辺を $4$ でくくると $4\bigl[(x-2)^2+y^2\bigr]=4$、すなわち
$$(x-2)^2+y^2=1.$$
軌跡は**中心 $(2,0)$、半径 $1$ の円**。

**メタ（なぜ半径も中心も半分か）。** 中点 $\mathrm M$ は、固定点 $\mathrm A$ を中心に $\mathrm P$ を $\dfrac12$ 倍へ縮小した点。$\mathrm P$ の軌跡（中心 $\mathrm O$・半径 $2$ の円）を $\mathrm A$ 中心で $\dfrac12$ 倍に相似縮小すると、中心は $\mathrm O$ と $\mathrm A$ の中点 $(2,0)$、半径は $\dfrac12\cdot2=1$。代数の計算結果が、相似変換という幾何で完全に説明できる。`,
      },
    ],
  },
  {
    slug: "apollonius-circle",
    title: "距離の比が一定の点（アポロニウスの円）",
    unit: "図形と方程式",
    difficulty: "C",
    tagline: "PA:PB 一定は円",
    hasGraph: false,
    tags: ["軌跡", "円の方程式"],
    statement: r`2 定点 $\mathrm A(-2,0),\ \mathrm B(4,0)$ からの距離の比が $\mathrm{PA}:\mathrm{PB}=1:2$ である点 $\mathrm P$ の軌跡を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 比の条件は 2 乗して座標へ",
        body: r`$\mathrm{PA}:\mathrm{PB}=1:2$ は $2\,\mathrm{PA}=\mathrm{PB}$、両辺正だから 2 乗して $4\,\mathrm{PA}^2=\mathrm{PB}^2$。根号を避けて座標で展開するのが定石。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 比を変えて軌跡を見る",
        body: r`下のラボで点 $\mathrm P$ を軌跡上で動かすと、つねに $\mathrm{PA}/\mathrm{PB}$ が一定（$=k$）に保たれる。さらに比 $k$ を変えると円の位置と大きさが変わり、$k\to1$ で円が膨らんで直線（$\mathrm{AB}$ の垂直二等分線）に近づくのが見える。距離比一定の点が「円」になる——これがアポロニウスの円。

@@lab:apollonius-circle@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$4\bigl[(x+2)^2+y^2\bigr]=(x-4)^2+y^2$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\mathrm P(x,y)$ とおく。$\mathrm{PA}:\mathrm{PB}=1:2$ より $4\,\mathrm{PA}^2=\mathrm{PB}^2$、すなわち
$$4\bigl[(x+2)^2+y^2\bigr]=(x-4)^2+y^2.$$
左辺 $=4x^2+16x+16+4y^2$、右辺 $=x^2-8x+16+y^2$。移項して整理すると
$$3x^2+3y^2+24x=0\ \Longrightarrow\ x^2+y^2+8x=0\ \Longrightarrow\ (x+4)^2+y^2=16.$$
軌跡は**中心 $(-4,0)$、半径 $4$ の円**（アポロニウスの円）。

**メタ。** 比が $1:1$ なら 2 乗の項が打ち消し合って直線（垂直二等分線）になり、$1:1$ から離れるほど円は近い方の点に寄って小さくなる。「距離の**比**一定＝円、距離の**差**一定＝双曲線、距離の**和**一定＝楕円」と、課す条件の種類がそのまま曲線の種類を決めている。`,
      },
    ],
  },
  {
    slug: "region-disk-and-halfplane",
    title: "不等式の表す領域",
    unit: "図形と方程式",
    difficulty: "C",
    tagline: "境界と内外を読む",
    hasGraph: false,
    tags: ["領域", "円の方程式"],
    statement: r`連立不等式 $x^2+y^2\le4$ かつ $y\ge x$ の表す領域を述べ、その面積を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 境界で領域を分解",
        body: r`$x^2+y^2\le4$ は半径 $2$ の円の**内部（境界込み）**。$y\ge x$ は直線 $y=x$ の**上側**。2 つの共通部分が求める領域で、面積は「円のどれだけを切り取るか」を考える。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 直線が中心を通るかを確かめる",
        body: r`直線 $y=x$ は原点 $\mathrm O(0,0)$ を通る。円の中心も $\mathrm O$。中心を通る弦（直径）は円を**合同な 2 つの半円**に分ける。だから $y\ge x$ 側の面積はちょうど円の半分——積分を使わずに対称性で決まる。代表点でも確認：中心 $\mathrm O$ は $y\ge x$（$0\ge0$）の境界上、$(0,2)$ は $2\ge0$ で領域内、$(2,0)$ は $0\ge2$ が偽で領域外。上半分が残ると分かる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`円の面積 $\pi\cdot2^2=4\pi$。直線が中心を通るので半分。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`領域は、半径 $2$ の円板 $x^2+y^2\le4$ のうち直線 $y=x$ の上側（$y\ge x$）の部分。直線 $y=x$ は円の中心 $\mathrm O$ を通る直径なので、円板を面積の等しい 2 つの半円板に分ける。よって求める面積は円の半分：
$$\frac12\cdot\pi\cdot2^2=2\pi.$$

**メタ。** 「中心を通る直線は円を二等分」という対称性を見抜けば積分は不要。もし直線が中心を通らなければ、中心から直線までの距離 $d$ を使って弓形の面積（扇形 − 三角形）を計算することになる。どこで対称性が使えるかの見極めが、計算量を劇的に左右する。`,
      },
    ],
  },
  {
    slug: "tangent-to-circle-at-point",
    title: "円の接線（接点が与えられた）",
    unit: "図形と方程式",
    difficulty: "C",
    tagline: "x₁x + y₁y = r²",
    hasGraph: false,
    tags: ["円の方程式", "接線"],
    statement: r`円 $x^2+y^2=5$ 上の点 $(1,2)$ における接線の方程式を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 接線 ⊥ 半径",
        body: r`円の接線は、接点へ引いた半径と直交する。この一点から、公式 $x_1x+y_1y=r^2$ を覚えていなくても接線が作れる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 半径の傾きから接線の傾きへ",
        body: r`接点 $(1,2)$ への半径 $\mathrm O(0,0)\to(1,2)$ の傾きは $\dfrac{2}{1}=2$。接線はこれに垂直なので傾き $-\dfrac12$。あるいは公式 $x_1x+y_1y=r^2$ に $(x_1,y_1)=(1,2),\ r^2=5$ を入れる。2 つの道が同じ式に着くことを確かめる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$1\cdot x+2\cdot y=5$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**公式による。** 円 $x^2+y^2=r^2$ 上の点 $(x_1,y_1)$ での接線は $x_1x+y_1y=r^2$。$(x_1,y_1)=(1,2),\ r^2=5$ を入れて
$$x+2y=5.$$
**垂直性による導出（公式の根拠）。** 接点 $(1,2)$ への半径の傾きは $2$。接線はそれに垂直で傾き $-\dfrac12$ だから
$$y-2=-\frac12(x-1)\ \Longrightarrow\ x+2y=5.$$
両者は一致する。

**メタ。** 公式 $x_1x+y_1y=r^2$ は「$x^2\to x_1x,\ y^2\to y_1y$ と一方を接点へ置き換える」形（極線の特別な場合）で、楕円・双曲線でも同型に通用する。丸暗記でなく「接線 ⊥ 半径」という幾何が背骨だと押さえれば、中心が原点でない円にも自力で拡張できる。`,
      },
    ],
  },

  // ============================== D (2) ==============================
  {
    slug: "locus-perpendicular-lines",
    title: "動く 2 直線の交点の軌跡",
    unit: "図形と方程式",
    difficulty: "D",
    tagline: "媒介変数 m を消去",
    hasGraph: false,
    tags: ["軌跡", "円の方程式", "媒介変数"],
    statement: r`$m$ を実数とする。2 直線 $mx-y=0$ と $x+my-2=0$ の交点を $\mathrm P$ とする。$m$ が動くとき $\mathrm P$ の軌跡を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 媒介変数 m を消す",
        body: r`交点は両式をみたす。$m$ を含む 2 式から $m$ を消去すれば $x,y$ だけの関係式＝軌跡が出る。さらに、2 直線が**つねに直交**し、それぞれ定点 $\mathrm O(0,0),\ (2,0)$ を通ることに気づくと、幾何（タレスの定理）でも答えが見える。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — m を動かして交点をなぞる",
        body: r`下のラボでスライダー $m$ を動かすと、原点を通る $\ell_1$ と $(2,0)$ を通る $\ell_2$ が直交を保ったまま回り、交点 $\mathrm P$ が円 $(x-1)^2+y^2=1$ をなぞる。$\mathrm{OP}\perp\mathrm{QP}$（$\mathrm Q=(2,0)$）だから、$\mathrm P$ は線分 $\mathrm{OQ}$ を直径とする円周上——タレスの定理そのもの。

@@lab:perpendicular-lines-locus@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`第 1 式より $m=\dfrac yx$（$x\neq0$）。第 2 式に代入して整理。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`交点では $y=mx$ かつ $x+my=2$。第 2 式に $y=mx$ を代入すると
$$x+m\cdot mx=2\ \Longrightarrow\ x(1+m^2)=2.$$
$x\neq0$ のとき $m=\dfrac yx$ を代入して
$$x\left(1+\frac{y^2}{x^2}\right)=2\ \Longrightarrow\ x^2+y^2=2x\ \Longrightarrow\ (x-1)^2+y^2=1.$$
**幾何による裏取り。** $\ell_1:mx-y=0$ と $\ell_2:x+my-2=0$ の方向ベクトルは $(1,m)$ と $(m,-1)$ で内積 $0$、つねに直交。$\ell_1$ は $\mathrm O(0,0)$、$\ell_2$ は $\mathrm Q(2,0)$ を通るので $\angle\mathrm{OPQ}=90^\circ$。タレスの定理より $\mathrm P$ は $\mathrm{OQ}$ を直径とする円上。
**除外点。** $x=\dfrac{2}{1+m^2}>0$ なので $\mathrm P$ は原点に一致しない。原点は $m\to\infty$ の極限に対応し実現しないから、軌跡は円 $(x-1)^2+y^2=1$ から**点 $(0,0)$ を除いたもの**。

**メタ。** 軌跡は「代数（媒介変数消去）」と「幾何（直交＋タレス）」の二刀流で攻めると、除外点の見落としを防げる。代数だけだと $x\neq0$ の条件を忘れがち、幾何だけだと極限の点を拾い損ねる——両輪で完璧になる。`,
      },
    ],
  },
  {
    slug: "tangent-family-passing-region",
    title: "接線族の通過領域",
    unit: "図形と方程式",
    difficulty: "D",
    tagline: "実数解条件は判別式",
    hasGraph: false,
    tags: ["通過領域", "判別式", "接線"],
    statement: r`$t$ が全実数を動くとき、直線 $y=2tx-t^2$（放物線 $y=x^2$ の接線）が通過する領域を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 「通過する」を実数解の存在に翻訳",
        body: r`点 $(x,y)$ がいずれかの直線上にある $\iff$ $y=2tx-t^2$ をみたす実数 $t$ が**存在する**。これを $t$ の 2 次方程式とみて、実数解をもつ条件（判別式 $\ge0$）を求めれば領域が出る。「存在する $\iff$ 判別式」が核心。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 接線を流して掃かれる範囲を見る",
        body: r`下のラボでスライダー $t$ を動かすと、接線 $y=2tx-t^2$ が放物線 $y=x^2$ に接しながら傾きを変える。無数の接線が掃く影が、ちょうど放物線の下側 $y\le x^2$（包絡線が放物線そのもの）になることが見える。

@@lab:parabola-tangent-envelope@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$t^2-2xt+y=0$ が実数解 $\iff$ 判別式 $\ge0$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`点 $(x,y)$ が接線族のいずれかに乗る条件は、$t$ の方程式
$$y=2tx-t^2\ \Longleftrightarrow\ t^2-2xt+y=0$$
が実数解 $t$ をもつこと。判別式（$\frac D4$）で
$$\frac D4=x^2-y\ge0\ \Longrightarrow\ y\le x^2.$$
よって通過領域は $\{(x,y)\mid y\le x^2\}$、すなわち**放物線 $y=x^2$ とその下側**。境界 $y=x^2$ は判別式 $=0$（重解＝接する瞬間）に対応し、これが接線族の**包絡線**。

**メタ。** 「パラメータ付き図形の通過領域」は、定点 $(x,y)$ を固定してパラメータの方程式とみる**逆転の発想**が要。判別式 $=0$ がちょうど包絡線を与えるのは、重解＝図形がその点で接する瞬間だから。微分法の「接する＝重解」と同じ構造が、ここでも領域の境界を支配している。`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "distance-formula-proof",
    title: "点と直線の距離公式の証明",
    unit: "図形と方程式",
    difficulty: "D_PLUS",
    tagline: "法線ベクトルに沿って下ろす",
    hasGraph: false,
    tags: ["点と直線の距離", "ベクトル", "証明"],
    statement: r`点 $\mathrm P(x_0,y_0)$ と直線 $\ell:ax+by+c=0$（$a,b$ は同時には $0$ でない）の距離が
$$\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$$
で与えられることを示せ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 法線方向に動かす", body: r`$\ell$ の法線ベクトルは $\vec n=(a,b)$。$\mathrm P$ から $\vec n$ の向きに進んで $\ell$ 上の足 $\mathrm H$ に達するとし、$\mathrm{PH}$ の長さを求める。` },
      { type: "EXPERIMENT", order: 1, title: "実験 — 足を媒介変数で", body: r`$\mathrm H=\mathrm P+s\,\vec n=(x_0+sa,\ y_0+sb)$ とおき、$\mathrm H$ が $\ell$ 上にある条件から $s$ を求める。距離は $|\,s\,|\cdot|\vec n|$。` },
      { type: "HINT", order: 2, title: "ヒント", body: r`$a(x_0+sa)+b(y_0+sb)+c=0$ を $s$ について解く。` },
      { type: "SOLUTION", order: 3, title: "厳密な解答", body: r`$\ell$ の法線ベクトルを $\vec n=(a,b)$ とする（$|\vec n|=\sqrt{a^2+b^2}\neq0$）。$\mathrm P$ から $\ell$ への垂線の足を $\mathrm H=\mathrm P+s\,\vec n=(x_0+sa,\ y_0+sb)$ とおく。$\mathrm H\in\ell$ より
$$a(x_0+sa)+b(y_0+sb)+c=0\Rightarrow (ax_0+by_0+c)+s(a^2+b^2)=0,$$
よって $s=-\dfrac{ax_0+by_0+c}{a^2+b^2}$。求める距離は $\mathrm{PH}=|s|\,|\vec n|$ だから
$$\mathrm{PH}=\frac{|ax_0+by_0+c|}{a^2+b^2}\cdot\sqrt{a^2+b^2}=\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}.$$
$\blacksquare$

**別解（正射影で一発）。** $\ell$ 上の任意の点 $\mathrm Q(x_1,y_1)$（$ax_1+by_1+c=0$）をとり、$\overrightarrow{\mathrm{QP}}=(x_0-x_1,\ y_0-y_1)$ を単位法線 $\dfrac{\vec n}{|\vec n|}$ に正射影すると距離になる：
$$\mathrm{PH}=\left|\overrightarrow{\mathrm{QP}}\cdot\frac{\vec n}{|\vec n|}\right|=\frac{|a(x_0-x_1)+b(y_0-y_1)|}{\sqrt{a^2+b^2}}=\frac{|ax_0+by_0-(ax_1+by_1)|}{\sqrt{a^2+b^2}}=\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}.$$
最後は $ax_1+by_1=-c$ を用いた。垂線の足の座標を求めずに、内積（正射影）だけで同じ式に着く。

**美しさ:** 「最短距離は垂線」という事実を、法線ベクトル $\vec n=(a,b)$ に沿ってまっすぐ下ろすことで式に翻訳する。直線の式の左辺 $ax_0+by_0+c$ が、そのまま符号つきの距離（×$|\vec n|$）を表しているという構造が見える。` },
    ],
  },
];
