import type { Problem } from "@/lib/types";

// 数学B（旧課程 II・B）「ベクトル」— 15 問 (A4/B4/C4/D2/D+1)。
const r = String.raw;

export const vectors: Problem[] = [
  // ============================== A (4) ==============================
  {
    slug: "vector-component-combination",
    title: "成分による計算",
    unit: "ベクトル",
    difficulty: "A",
    tagline: "成分ごとに足し引き",
    hasGraph: false,
    tags: ["ベクトルの成分"],
    statement: r`$\vec a=(2,3),\ \vec b=(1,-1)$ のとき、$2\vec a-\vec b$ を成分で表せ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 成分ごと", body: r`実数倍と和・差は成分ごとに計算する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$2\vec a=(4,6)$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$2\vec a-\vec b=(4,6)-(1,-1)=(3,7)$。` },
    ],
  },
  {
    slug: "vector-magnitude",
    title: "ベクトルの大きさ",
    unit: "ベクトル",
    difficulty: "A",
    tagline: "|a| = √(x²+y²)",
    hasGraph: false,
    tags: ["ベクトルの大きさ"],
    statement: r`$\vec a=(3,-4)$ の大きさ $|\vec a|$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 三平方", body: r`$|\vec a|=\sqrt{x^2+y^2}$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\sqrt{3^2+(-4)^2}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$|\vec a|=\sqrt{9+16}=\sqrt{25}=5$。` },
    ],
  },
  {
    slug: "dot-product-component",
    title: "内積（成分）",
    unit: "ベクトル",
    difficulty: "A",
    tagline: "a·b = x₁x₂ + y₁y₂",
    hasGraph: false,
    tags: ["内積"],
    statement: r`$\vec a=(2,3),\ \vec b=(1,4)$ の内積 $\vec a\cdot\vec b$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 成分の積の和", body: r`$\vec a\cdot\vec b=x_1x_2+y_1y_2$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$2\cdot1+3\cdot4$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\vec a\cdot\vec b=2+12=14$。` },
    ],
  },
  {
    slug: "angle-from-dot",
    title: "内積となす角",
    unit: "ベクトル",
    difficulty: "A",
    tagline: "cosθ = a·b / (|a||b|)",
    hasGraph: false,
    tags: ["内積", "なす角"],
    statement: r`$\vec a=(1,1),\ \vec b=(1,0)$ のなす角 $\theta$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 内積の定義", body: r`$\cos\theta=\dfrac{\vec a\cdot\vec b}{|\vec a||\vec b|}$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\vec a\cdot\vec b=1$、$|\vec a|=\sqrt2,\ |\vec b|=1$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\cos\theta=\dfrac{1}{\sqrt2\cdot1}=\dfrac1{\sqrt2}$。$0^\circ\le\theta\le180^\circ$ より $\theta=45^\circ$。` },
    ],
  },

  // ============================== B (4) ==============================
  {
    slug: "perpendicular-condition",
    title: "垂直条件",
    unit: "ベクトル",
    difficulty: "B",
    tagline: "垂直 ⇔ 内積 0",
    hasGraph: false,
    tags: ["内積", "垂直条件"],
    statement: r`$\vec a=(2,t),\ \vec b=(3,-1)$ が垂直になるように $t$ を定めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 内積 = 0", body: r`$\vec a\perp\vec b\iff\vec a\cdot\vec b=0$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$2\cdot3+t\cdot(-1)=0$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\vec a\cdot\vec b=6-t=0\Rightarrow t=6$。` },
    ],
  },
  {
    slug: "parallel-condition",
    title: "平行条件",
    unit: "ベクトル",
    difficulty: "B",
    tagline: "平行 ⇔ x₁y₂ − x₂y₁ = 0",
    hasGraph: false,
    tags: ["ベクトルの成分", "平行条件"],
    statement: r`$\vec a=(t,4),\ \vec b=(3,6)$ が平行になるように $t$ を定めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 平行条件", body: r`$\vec a\parallel\vec b\iff\vec a=k\vec b$、成分では $x_1y_2-x_2y_1=0$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$t\cdot6-3\cdot4=0$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$6t-12=0\Rightarrow t=2$。` },
    ],
  },
  {
    slug: "internal-division-point",
    title: "内分点の位置ベクトル",
    unit: "ベクトル",
    difficulty: "B",
    tagline: "(nA + mB)/(m+n)",
    hasGraph: false,
    tags: ["位置ベクトル", "内分点"],
    statement: r`2 点 $\mathrm A(1,2),\ \mathrm B(7,5)$ を $2:1$ に内分する点 $\mathrm P$ の座標を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 内分点の公式", body: r`$\mathrm{AB}$ を $m:n$ に内分する点は $\dfrac{n\,\mathrm A+m\,\mathrm B}{m+n}$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\dfrac{1\cdot\mathrm A+2\cdot\mathrm B}{3}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\mathrm P=\dfrac{1\cdot(1,2)+2\cdot(7,5)}{3}=\dfrac{(15,12)}{3}=(5,4)$。` },
    ],
  },
  {
    slug: "unit-vector",
    title: "単位ベクトル",
    unit: "ベクトル",
    difficulty: "B",
    tagline: "a / |a|",
    hasGraph: false,
    tags: ["ベクトルの大きさ", "単位ベクトル"],
    statement: r`$\vec a=(3,4)$ と同じ向きの単位ベクトルを求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 大きさで割る", body: r`同じ向きの単位ベクトルは $\dfrac{\vec a}{|\vec a|}$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$|\vec a|=5$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\dfrac{1}{5}(3,4)=\left(\dfrac35,\dfrac45\right)$。` },
    ],
  },

  // ============================== C (4) ==============================
  {
    slug: "vector-addition-parallelogram",
    title: "ベクトルの和と大きさ",
    unit: "ベクトル",
    difficulty: "C",
    tagline: "平行四辺形の対角線",
    hasGraph: false,
    tags: ["ベクトルの成分", "ベクトルの大きさ"],
    statement: r`$\vec a=(3,1),\ \vec b=(1,3)$ のとき、$\vec a+\vec b$ とその大きさ $|\vec a+\vec b|$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 和は対角線", body: r`$\vec a+\vec b$ は $\vec a,\vec b$ を 2 辺とする平行四辺形の対角線。成分は成分ごとの和。` },
      { type: "EXPERIMENT", order: 1, title: "実験 — 対角線を見る", body: r`ラボで $\mathrm A,\mathrm B$ をドラッグすると、和 $\vec a+\vec b$ が平行四辺形の対角線になる様子が見える。

@@lab:vector-add@@` },
      { type: "HINT", order: 2, title: "ヒント", body: r`$\vec a+\vec b=(4,4)$。` },
      { type: "SOLUTION", order: 3, title: "厳密な解答", body: r`$\vec a+\vec b=(4,4)$、$|\vec a+\vec b|=\sqrt{16+16}=\sqrt{32}=4\sqrt2$。` },
    ],
  },
  {
    slug: "centroid-position-vector",
    title: "重心の位置ベクトル",
    unit: "ベクトル",
    difficulty: "C",
    tagline: "G = (A+B+C)/3",
    hasGraph: false,
    tags: ["位置ベクトル", "重心"],
    statement: r`3 点 $\mathrm A(1,1),\ \mathrm B(5,2),\ \mathrm C(3,6)$ を頂点とする三角形の重心 $\mathrm G$ の座標を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 重心の公式", body: r`三角形の重心は $\mathrm G=\dfrac{\mathrm A+\mathrm B+\mathrm C}{3}$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\dfrac{(1+5+3,\ 1+2+6)}{3}$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\mathrm G=\dfrac{(9,9)}{3}=(3,3)$。` },
    ],
  },
  {
    slug: "magnitude-of-sum-from-dot",
    title: "内積から |a+b| を求める",
    unit: "ベクトル",
    difficulty: "C",
    tagline: "|a+b|² = |a|² + 2a·b + |b|²",
    hasGraph: false,
    tags: ["内積", "ベクトルの大きさ"],
    statement: r`$|\vec a|=2,\ |\vec b|=3,\ \vec a\cdot\vec b=3$ のとき、$|\vec a+\vec b|$ を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 大きさは内積で展開", body: r`$|\vec a+\vec b|^2=(\vec a+\vec b)\cdot(\vec a+\vec b)=|\vec a|^2+2\vec a\cdot\vec b+|\vec b|^2$。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$4+2\cdot3+9$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$|\vec a+\vec b|^2=4+6+9=19$。よって $|\vec a+\vec b|=\sqrt{19}$。` },
    ],
  },
  {
    slug: "midpoint-connector-vector",
    title: "中点連結定理をベクトルで",
    unit: "ベクトル",
    difficulty: "C",
    tagline: "MN = ½ AB",
    hasGraph: false,
    tags: ["位置ベクトル", "中点連結定理", "証明"],
    statement: r`三角形 $\mathrm{OAB}$ で、辺 $\mathrm{OA},\mathrm{OB}$ の中点をそれぞれ $\mathrm M,\mathrm N$ とする。$\vec{\mathrm{MN}}=\dfrac12\vec{\mathrm{AB}}$ が成り立つことを、位置ベクトルで示せ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — O を始点に", body: r`$\vec{\mathrm{OA}}=\vec a,\ \vec{\mathrm{OB}}=\vec b$ とおく。$\mathrm M,\mathrm N$ の位置ベクトルを書き、$\vec{\mathrm{MN}}$ を計算する。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\vec{\mathrm{OM}}=\dfrac12\vec a,\ \vec{\mathrm{ON}}=\dfrac12\vec b$、$\vec{\mathrm{AB}}=\vec b-\vec a$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\vec{\mathrm{OA}}=\vec a,\ \vec{\mathrm{OB}}=\vec b$ とおくと $\vec{\mathrm{OM}}=\dfrac12\vec a,\ \vec{\mathrm{ON}}=\dfrac12\vec b$。
$$\vec{\mathrm{MN}}=\vec{\mathrm{ON}}-\vec{\mathrm{OM}}=\frac12\vec b-\frac12\vec a=\frac12(\vec b-\vec a)=\frac12\vec{\mathrm{AB}}.$$
これは $\mathrm{MN}\parallel\mathrm{AB}$ かつ $\mathrm{MN}=\dfrac12\mathrm{AB}$ を意味する。$\blacksquare$` },
    ],
  },

  // ============================== D (2) ==============================
  {
    slug: "foot-of-perpendicular-vector",
    title: "垂線の足の位置ベクトル",
    unit: "ベクトル",
    difficulty: "D",
    tagline: "OH·AB = 0 で t を決める",
    hasGraph: false,
    tags: ["内積", "位置ベクトル", "垂直条件"],
    statement: r`$\mathrm A(1,0),\ \mathrm B(4,3)$ とする。原点 $\mathrm O$ から直線 $\mathrm{AB}$ に下ろした垂線の足 $\mathrm H$ の座標を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — H を媒介変数で", body: r`$\mathrm H=\mathrm A+t\,\vec{\mathrm{AB}}$ とおき、$\vec{\mathrm{OH}}\perp\vec{\mathrm{AB}}$（内積 $0$）から $t$ を決める。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$\vec{\mathrm{AB}}=(3,3)$、$\mathrm H=(1+3t,3t)$。$\vec{\mathrm{OH}}\cdot\vec{\mathrm{AB}}=0$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$\mathrm H=(1+3t,\,3t)$。$\vec{\mathrm{OH}}\cdot\vec{\mathrm{AB}}=3(1+3t)+3(3t)=3+18t=0\Rightarrow t=-\dfrac16$。
$\mathrm H=\left(1-\dfrac12,\ -\dfrac12\right)=\left(\dfrac12,\,-\dfrac12\right)$。` },
    ],
  },
  {
    slug: "vector-region-area",
    title: "係数の条件が表す領域",
    unit: "ベクトル",
    difficulty: "D",
    tagline: "s,t≥0, s+t≤1 は三角形",
    hasGraph: false,
    tags: ["位置ベクトル", "領域", "面積"],
    statement: r`$\mathrm A(2,0),\ \mathrm B(0,3)$ とし、$\vec{\mathrm{OP}}=s\,\vec{\mathrm{OA}}+t\,\vec{\mathrm{OB}}$ とする。$s\ge0,\ t\ge0,\ s+t\le1$ をみたしながら $s,t$ が動くとき、点 $\mathrm P$ が動く領域を述べ、その面積を求めよ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 端点で領域を読む", body: r`$s+t=1$ は直線 $\mathrm{AB}$。$s,t\ge0,\ s+t\le1$ は三角形 $\mathrm{OAB}$ の周および内部を表す。` },
      { type: "HINT", order: 1, title: "ヒント", body: r`$(s,t)=(0,0),(1,0),(0,1)$ がそれぞれ $\mathrm O,\mathrm A,\mathrm B$。面積は $\dfrac12|\,x_A y_B-x_B y_A\,|$。` },
      { type: "SOLUTION", order: 2, title: "厳密な解答", body: r`$s+t\le1,\ s,t\ge0$ の表す点 $\mathrm P$ の領域は三角形 $\mathrm{OAB}$（周と内部）。
面積は $\dfrac12\bigl|\,x_A y_B-x_B y_A\,\bigr|=\dfrac12|2\cdot3-0\cdot0|=3$。` },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "medians-concurrent-vector",
    title: "3 中線は重心で 2:1 に交わる",
    unit: "ベクトル",
    difficulty: "D_PLUS",
    tagline: "1 点 G がすべての中線を 2:1 に分ける",
    hasGraph: false,
    tags: ["位置ベクトル", "重心", "証明"],
    statement: r`三角形 $\mathrm{ABC}$ の 3 本の中線は 1 点で交わり、その点は各中線を頂点側から $2:1$ に内分することを、位置ベクトルを用いて示せ。`,
    steps: [
      { type: "INSIGHT", order: 0, title: "着眼点 — 重心 G を先に置く", body: r`$\mathrm G=\dfrac{\mathrm A+\mathrm B+\mathrm C}{3}$ とおき、これが各中線上にあり、しかも $2:1$ の点であることを 1 本について示せば、対称性で 3 本すべてに言える。` },
      { type: "EXPERIMENT", order: 1, title: "実験 — A 側の中線で確かめる", body: r`辺 $\mathrm{BC}$ の中点を $\mathrm{M}=\dfrac{\mathrm B+\mathrm C}{2}$ とする。中線 $\mathrm{AM}$ を $2:1$ に内分する点は $\dfrac{1\cdot\mathrm A+2\cdot\mathrm M}{3}$。これが $\mathrm G$ に一致するかを見る。` },
      { type: "HINT", order: 2, title: "ヒント", body: r`$\dfrac{\mathrm A+2\mathrm M}{3}=\dfrac{\mathrm A+(\mathrm B+\mathrm C)}{3}$。` },
      { type: "SOLUTION", order: 3, title: "厳密な解答", body: r`位置ベクトルを $\mathrm A,\mathrm B,\mathrm C$ で表す。$\mathrm G=\dfrac{\mathrm A+\mathrm B+\mathrm C}{3}$ とおく。

辺 $\mathrm{BC}$ の中点は $\mathrm M_A=\dfrac{\mathrm B+\mathrm C}{2}$。中線 $\mathrm{AM_A}$ を頂点 $\mathrm A$ 側から $2:1$ に内分する点は
$$\frac{1\cdot\mathrm A+2\cdot\mathrm M_A}{3}=\frac{\mathrm A+(\mathrm B+\mathrm C)}{3}=\frac{\mathrm A+\mathrm B+\mathrm C}{3}=\mathrm G.$$
すなわち $\mathrm G$ は中線 $\mathrm{AM_A}$ 上にあり、これを $2:1$ に内分する。
$\mathrm A,\mathrm B,\mathrm C$ について式は対称だから、同じ $\mathrm G$ が中線 $\mathrm{BM_B},\ \mathrm{CM_C}$ をも $2:1$ に内分する。よって 3 中線は 1 点 $\mathrm G$ で交わり、各中線を頂点側から $2:1$ に分ける。$\blacksquare$

**美しさ:** 「3 本が 1 点で交わる」という事実を、交点を探さずに **先に重心 $\dfrac{A+B+C}{3}$ を書いてしまう**だけで証明できる。式の完全な対称性が、3 本すべてを同時に貫く。` },
    ],
  },

  // ============================== 空間ベクトル（拡張）==============================
  {
    slug: "space-tetrahedron-volume",
    title: "四面体の体積（スカラー三重積）",
    unit: "ベクトル",
    difficulty: "D",
    tagline: "3 辺ベクトルの行列式が、体積の 6 倍",
    hasGraph: false,
    tags: ["空間ベクトル", "体積", "スカラー三重積"],
    statement: r`空間の 4 点 $\mathrm O(0,0,0),\ \mathrm A(1,1,0),\ \mathrm B(1,0,1),\ \mathrm C(0,1,1)$ を頂点とする四面体 $\mathrm{OABC}$ の体積 $V$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 体積はスカラー三重積",
        body: r`$\mathrm O$ から出る 3 辺ベクトル $\vec a=\vec{\mathrm{OA}},\ \vec b=\vec{\mathrm{OB}},\ \vec c=\vec{\mathrm{OC}}$ が作る平行六面体の体積は $|\vec a\cdot(\vec b\times\vec c)|$（スカラー三重積の絶対値＝成分の行列式）。四面体はその $\dfrac16$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 形を回して 3 辺を見る",
        body: r`下のラボで四面体を回転させると、$\mathrm O$ から伸びる 3 辺が平行六面体の 1 つの隅をなすことが見える。その平行六面体の体積が行列式 $\det[\vec a\ \vec b\ \vec c]$、四面体はその $\dfrac16$ という関係を掴む。

@@lab:tetrahedron-3d@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 行列式を展開",
        body: r`$\det\begin{pmatrix}1&1&0\\1&0&1\\0&1&1\end{pmatrix}$ を第 1 行で余因子展開。$V=\dfrac16|\det|$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\vec a=(1,1,0),\ \vec b=(1,0,1),\ \vec c=(0,1,1)$。スカラー三重積は成分の行列式で
$$\vec a\cdot(\vec b\times\vec c)=\begin{vmatrix}1&1&0\\1&0&1\\0&1&1\end{vmatrix}
=1\,(0\cdot1-1\cdot1)-1\,(1\cdot1-1\cdot0)+0=1\cdot(-1)-1\cdot(1)=-2.$$
平行六面体の体積は $|-2|=2$ だから、四面体は
$$V=\frac16\,|\vec a\cdot(\vec b\times\vec c)|=\frac16\cdot2=\frac13.$$

**別解（$\frac13\times$ 底面 $\times$ 高さ）。** 底面 $\triangle\mathrm{OAB}$ の面積は $\dfrac12|\vec a\times\vec b|$。$\vec a\times\vec b=(1,1,0)\times(1,0,1)=(1,-1,-1)$ で $|\vec a\times\vec b|=\sqrt3$、底面積 $\dfrac{\sqrt3}{2}$。平面 $\mathrm{OAB}$ の法線 $(1,-1,-1)$ への $\vec c=(0,1,1)$ の射影が高さ $h=\dfrac{|\vec c\cdot(1,-1,-1)|}{\sqrt3}=\dfrac{|0-1-1|}{\sqrt3}=\dfrac{2}{\sqrt3}$。よって $V=\dfrac13\cdot\dfrac{\sqrt3}{2}\cdot\dfrac{2}{\sqrt3}=\dfrac13$。一致する。

**メタ。** スカラー三重積 $|\det[\vec a\ \vec b\ \vec c]|$ は「3 辺が張る平行六面体の体積」。四面体はその $\dfrac16$（三角柱の $\frac12$ のさらに $\frac13$）。座標が与えられたら行列式が最短、ベクトルの大きさ・角度が主役なら外積＋内積の別解が映える。`,
      },
    ],
  },
  {
    slug: "space-plane-distance",
    title: "平面の方程式と点と平面の距離",
    unit: "ベクトル",
    difficulty: "D",
    tagline: "法線ベクトルが平面の向きを決める",
    hasGraph: false,
    tags: ["空間ベクトル", "平面の方程式", "点と平面の距離"],
    statement: r`3 点 $\mathrm A(1,0,0),\ \mathrm B(0,2,0),\ \mathrm C(0,0,3)$ を通る平面 $\alpha$ の方程式を求めよ。また、点 $\mathrm P(2,2,2)$ と平面 $\alpha$ の距離を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 法線ベクトルを作る",
        body: r`平面は「法線ベクトル $\vec n=(a,b,c)$ と 1 点」で決まり、方程式は $a(x-x_0)+b(y-y_0)+c(z-z_0)=0$。$\vec n$ は平面上の 2 辺ベクトルの**外積** $\vec{\mathrm{AB}}\times\vec{\mathrm{AC}}$ で得られる。切片形 $\dfrac xp+\dfrac yq+\dfrac zr=1$ を使う手もある。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 距離は法線方向の射影",
        body: r`点と平面の距離は「法線方向に下ろした垂線の長さ」＝ $\dfrac{|ax_0+by_0+cz_0+d|}{\sqrt{a^2+b^2+c^2}}$。下のラボ（平面を真横から見た断面）で、点 $\mathrm P$ から平面への距離が法線方向への射影として測られる様子を確かめよう。

@@lab:plane-normal-distance@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 切片形",
        body: r`切片 $1,2,3$ より $\dfrac x1+\dfrac y2+\dfrac z3=1$。分母を払うと $6x+3y+2z=6$、法線 $(6,3,2)$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**平面の方程式。** $x,y,z$ 切片が $1,2,3$ だから切片形で
$$\frac x1+\frac y2+\frac z3=1\ \Longrightarrow\ 6x+3y+2z=6.$$
（検算：$\mathrm A(1,0,0)\Rightarrow6$、$\mathrm B(0,2,0)\Rightarrow6$、$\mathrm C(0,0,3)\Rightarrow6$。すべて満たす。）法線ベクトルは $\vec n=(6,3,2)$、$|\vec n|=\sqrt{36+9+4}=7$。

**点と平面の距離。** $\mathrm P(2,2,2)$ を $6x+3y+2z-6$ に入れて
$$\text{距離}=\frac{|6\cdot2+3\cdot2+2\cdot2-6|}{7}=\frac{|12+6+4-6|}{7}=\frac{16}{7}.$$

**メタ。** 平面は「法線＋1 点」。法線は ①2 辺の外積 ②切片形の係数、どちらでも作れる。点と平面の距離は、点と直線の距離公式の 3 次元版（分母が $\sqrt{a^2+b^2+c^2}$ に増えるだけ）——次元が上がっても「法線方向への射影」という本質は不変。`,
      },
    ],
  },
  {
    slug: "space-reflection-point",
    title: "平面に関する対称点",
    unit: "ベクトル",
    difficulty: "C",
    tagline: "法線方向に、2 倍だけ折り返す",
    hasGraph: false,
    tags: ["空間ベクトル", "点と平面の距離", "対称点"],
    statement: r`点 $\mathrm P(3,1,2)$ の、平面 $\beta:\ x+2y+2z=3$ に関する対称点 $\mathrm P'$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 垂線の足を経由する",
        body: r`対称点は「$\mathrm P$ から平面へ下ろした垂線の足 $\mathrm H$ を中点として $\mathrm P$ を折り返した点」。$\mathrm H=\mathrm P+t\,\vec n$（$\vec n$ は法線）が平面上にある条件で $t$ を決め、$\mathrm P'=2\mathrm H-\mathrm P$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — t を具体的に求める",
        body: r`$\vec n=(1,2,2)$、$|\vec n|^2=9$。$\mathrm H=\mathrm P+t\vec n=(3+t,\,1+2t,\,2+2t)$ を平面 $x+2y+2z=3$ に代入すると $t$ が出る。$\mathrm P'=\mathrm P+2t\vec n$（足を経由して 2 倍進む）と覚えると速い。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$(3+t)+2(1+2t)+2(2+2t)=3$ を $t$ について解く。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`平面 $\beta$ の法線は $\vec n=(1,2,2)$。垂線の足を $\mathrm H=\mathrm P+t\vec n=(3+t,\,1+2t,\,2+2t)$ とおき、$\beta$ 上にある条件 $x+2y+2z=3$ に代入：
$$(3+t)+2(1+2t)+2(2+2t)=3\ \Longrightarrow\ 9+9t=3\ \Longrightarrow\ t=-\frac{2}{3}.$$
よって
$$\mathrm H=\Bigl(3-\tfrac23,\ 1-\tfrac43,\ 2-\tfrac43\Bigr)=\Bigl(\tfrac73,\ -\tfrac13,\ \tfrac23\Bigr).$$
対称点は $\mathrm H$ を中点とするので $\mathrm P'=2\mathrm H-\mathrm P$：
$$\mathrm P'=\Bigl(\tfrac{14}{3}-3,\ -\tfrac23-1,\ \tfrac43-2\Bigr)=\Bigl(\tfrac53,\ -\tfrac53,\ -\tfrac23\Bigr).$$

**メタ。** 「平面に関する対称点」は、点と平面の距離の延長。$\mathrm P\to\mathrm H$ が法線方向に $t\vec n$ 進む量、$\mathrm P\to\mathrm P'$ はその**ちょうど 2 倍** $2t\vec n$。足 $\mathrm H$ は $\mathrm P,\mathrm P'$ の中点という対称性が骨格で、直線に関する対称点（2 次元）とまったく同じ構図である。`,
      },
    ],
  },
];
