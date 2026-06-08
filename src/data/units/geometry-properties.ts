import type { Problem } from "@/lib/types";

// 数学A「図形の性質」— 20 問。
// 幾何単元。図形が本質に効く C 以上の3問（円周角・方べき・チェバ）にラボを付ける。
const r = String.raw;

export const geometryProperties: Problem[] = [
  // ============================== A (5) ==============================
  {
    slug: "angle-bisector-internal",
    title: "内角の二等分線と比",
    unit: "図形の性質",
    difficulty: "A",
    tagline: "二等分線は対辺を隣の辺の比に分ける",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ で $\mathrm{AB}=6,\ \mathrm{AC}=4$ とする。$\angle\mathrm A$ の二等分線と辺 $\mathrm{BC}$ の交点を $\mathrm D$ とするとき、$\mathrm{BD}:\mathrm{DC}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 角の二等分線の定理",
        body: r`内角の二等分線は、対辺をはさむ 2 辺の長さの比に内分する：$\mathrm{BD}:\mathrm{DC}=\mathrm{AB}:\mathrm{AC}$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\mathrm{AB}:\mathrm{AC}=6:4$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\mathrm{BD}:\mathrm{DC}=\mathrm{AB}:\mathrm{AC}=6:4=3:2$。`,
      },
    ],
  },
  {
    slug: "midpoint-connector",
    title: "中点連結定理",
    unit: "図形の性質",
    difficulty: "A",
    tagline: "2 辺の中点を結ぶと底辺の半分",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ で辺 $\mathrm{AB},\mathrm{AC}$ の中点をそれぞれ $\mathrm M,\mathrm N$ とする。$\mathrm{BC}=10$ のとき、$\mathrm{MN}$ の長さと、$\mathrm{MN}$ と $\mathrm{BC}$ の位置関係を述べよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 中点連結定理",
        body: r`2 辺の中点を結ぶ線分は、第 3 辺に平行で長さはその半分：$\mathrm{MN}\parallel\mathrm{BC},\ \mathrm{MN}=\dfrac12\mathrm{BC}$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\mathrm{MN}=\dfrac{10}{2}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\mathrm{MN}=\dfrac12\cdot10=5$、かつ $\mathrm{MN}\parallel\mathrm{BC}$。`,
      },
    ],
  },
  {
    slug: "inscribed-angle-from-central",
    title: "円周角と中心角",
    unit: "図形の性質",
    difficulty: "A",
    tagline: "円周角は中心角の半分",
    hasGraph: false,
    statement: r`円 $\mathrm O$ の周上に 3 点 $\mathrm A,\mathrm B,\mathrm C$ があり、中心角 $\angle\mathrm{BOC}=130^\circ$ である。弧 $\mathrm{BC}$ の優弧上の点 $\mathrm A$ に対する円周角 $\angle\mathrm{BAC}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 円周角の定理",
        body: r`同じ弧に対する円周角は中心角の半分：$\angle\mathrm{BAC}=\dfrac12\angle\mathrm{BOC}$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dfrac{130^\circ}{2}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\angle\mathrm{BAC}=\dfrac12\cdot130^\circ=65^\circ$。`,
      },
    ],
  },
  {
    slug: "cyclic-quad-opposite-angle",
    title: "円に内接する四角形の対角",
    unit: "図形の性質",
    difficulty: "A",
    tagline: "向かい合う角の和は 180°",
    hasGraph: false,
    statement: r`円に内接する四角形 $\mathrm{ABCD}$ で $\angle\mathrm A=85^\circ$ のとき、$\angle\mathrm C$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 対角の和",
        body: r`円に内接する四角形は、向かい合う角の和が $180^\circ$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\angle\mathrm A+\angle\mathrm C=180^\circ$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\angle\mathrm C=180^\circ-85^\circ=95^\circ$。`,
      },
    ],
  },
  {
    slug: "tangent-length-equal",
    title: "外部点からの接線の長さ",
    unit: "図形の性質",
    difficulty: "A",
    tagline: "2 本の接線は等しい",
    hasGraph: false,
    statement: r`円 $\mathrm O$ の外部の点 $\mathrm P$ から引いた 2 本の接線の接点を $\mathrm A,\mathrm B$ とする。$\mathrm{PA}=7$ のとき $\mathrm{PB}$ を求め、その理由を述べよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 接線の長さ",
        body: r`外部の 1 点から円に引いた 2 本の接線の長さは等しい（$\triangle\mathrm{OPA}\equiv\triangle\mathrm{OPB}$：$\mathrm{OA}=\mathrm{OB}$ 半径、$\mathrm{OP}$ 共通、$\angle\mathrm{OAP}=\angle\mathrm{OBP}=90^\circ$）。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\mathrm{PB}=\mathrm{PA}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`接線の長さは等しいので $\mathrm{PB}=\mathrm{PA}=7$。`,
      },
    ],
  },

  // ============================== B (6) ==============================
  {
    slug: "angle-bisector-external",
    title: "外角の二等分線と比",
    unit: "図形の性質",
    difficulty: "B",
    tagline: "外角は対辺を外分する",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ で $\mathrm{AB}=6,\ \mathrm{AC}=4$ とする。$\angle\mathrm A$ の外角の二等分線と直線 $\mathrm{BC}$ の交点を $\mathrm E$ とするとき、$\mathrm{BE}:\mathrm{EC}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 外角の二等分線",
        body: r`外角の二等分線は対辺を $\mathrm{AB}:\mathrm{AC}$ に**外分**する（交点は辺 $\mathrm{BC}$ の外側）。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\mathrm{BE}:\mathrm{EC}=\mathrm{AB}:\mathrm{AC}=6:4$（外分）。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\mathrm{BE}:\mathrm{EC}=\mathrm{AB}:\mathrm{AC}=6:4=3:2$（$\mathrm E$ は辺 $\mathrm{BC}$ を外分）。`,
      },
    ],
  },
  {
    slug: "centroid-median-ratio",
    title: "重心と中線",
    unit: "図形の性質",
    difficulty: "B",
    tagline: "重心は中線を 2 : 1 に分ける",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ の重心を $\mathrm G$、辺 $\mathrm{BC}$ の中点を $\mathrm M$ とする。中線 $\mathrm{AM}=9$ のとき、$\mathrm{AG}$ と $\mathrm{GM}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 重心の分割比",
        body: r`重心は各中線を頂点側から $2:1$ に内分する：$\mathrm{AG}:\mathrm{GM}=2:1$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\mathrm{AG}=\dfrac23\mathrm{AM},\ \mathrm{GM}=\dfrac13\mathrm{AM}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\mathrm{AG}=\dfrac23\cdot9=6$、$\mathrm{GM}=\dfrac13\cdot9=3$。`,
      },
    ],
  },
  {
    slug: "tangent-chord-angle",
    title: "接弦定理",
    unit: "図形の性質",
    difficulty: "B",
    tagline: "接線と弦の角＝その弧の円周角",
    hasGraph: false,
    statement: r`円の弦 $\mathrm{AB}$ と、点 $\mathrm A$ における接線 $\mathrm{AT}$ がなす角 $\angle\mathrm{TAB}=55^\circ$ である。弦 $\mathrm{AB}$ に対し接線と反対側の弧上の点を $\mathrm C$ とするとき、円周角 $\angle\mathrm{ACB}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 接弦定理",
        body: r`接線と弦のなす角は、その弦が切り取る弧に対する円周角に等しい：$\angle\mathrm{TAB}=\angle\mathrm{ACB}$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\angle\mathrm{ACB}=\angle\mathrm{TAB}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`接弦定理より $\angle\mathrm{ACB}=\angle\mathrm{TAB}=55^\circ$。`,
      },
    ],
  },
  {
    slug: "power-intersecting-chords",
    title: "方べきの定理（交わる 2 弦）",
    unit: "図形の性質",
    difficulty: "B",
    tagline: "PA·PB = PC·PD",
    hasGraph: false,
    statement: r`円の 2 つの弦 $\mathrm{AB},\mathrm{CD}$ が円内の点 $\mathrm P$ で交わる。$\mathrm{PA}=3,\ \mathrm{PB}=4,\ \mathrm{PC}=2$ のとき $\mathrm{PD}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 方べきの定理",
        body: r`点 $\mathrm P$ を通る 2 弦について $\mathrm{PA}\cdot\mathrm{PB}=\mathrm{PC}\cdot\mathrm{PD}$（$\triangle\mathrm{PAC}\sim\triangle\mathrm{PDB}$ から）。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$3\cdot4=2\cdot\mathrm{PD}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\mathrm{PA}\cdot\mathrm{PB}=\mathrm{PC}\cdot\mathrm{PD}\Rightarrow 12=2\,\mathrm{PD}\Rightarrow \mathrm{PD}=6$。`,
      },
    ],
  },
  {
    slug: "menelaus-basic",
    title: "メネラウスの定理",
    unit: "図形の性質",
    difficulty: "B",
    tagline: "三角形を横切る直線の比の積は 1",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ で、辺 $\mathrm{CA}$ の中点を $\mathrm M$、辺 $\mathrm{BC}$ を $2:1$ に内分する点を $\mathrm N$ とする（$\mathrm{BN}:\mathrm{NC}=2:1$）。直線 $\mathrm{MN}$ と直線 $\mathrm{AB}$ の交点を $\mathrm P$ とするとき、$\mathrm{AP}:\mathrm{PB}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — メネラウスの定理",
        body: r`三角形 $\mathrm{ABC}$ を直線 $\mathrm{N\text{-}M\text{-}P}$ が横切るとみて
$$\frac{\mathrm{BN}}{\mathrm{NC}}\cdot\frac{\mathrm{CM}}{\mathrm{MA}}\cdot\frac{\mathrm{AP}}{\mathrm{PB}}=1.$$`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dfrac{\mathrm{BN}}{\mathrm{NC}}=\dfrac21$、$\dfrac{\mathrm{CM}}{\mathrm{MA}}=1$（$\mathrm M$ は中点）。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`メネラウスの定理より
$$\frac21\cdot\frac11\cdot\frac{\mathrm{AP}}{\mathrm{PB}}=1\Rightarrow\frac{\mathrm{AP}}{\mathrm{PB}}=\frac12.$$
よって $\mathrm{AP}:\mathrm{PB}=1:2$。`,
      },
    ],
  },
  {
    slug: "incenter-angle",
    title: "内心と角",
    unit: "図形の性質",
    difficulty: "B",
    tagline: "∠BIC = 90° + A/2",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ の内心を $\mathrm I$ とする。$\angle\mathrm A=80^\circ$ のとき $\angle\mathrm{BIC}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 内心は角の二等分線の交点",
        body: r`$\mathrm I$ は内角の二等分線の交点。$\triangle\mathrm{IBC}$ で $\angle\mathrm{IBC}=\dfrac{\mathrm B}{2},\ \angle\mathrm{ICB}=\dfrac{\mathrm C}{2}$ より $\angle\mathrm{BIC}=180^\circ-\dfrac{\mathrm B+\mathrm C}{2}=90^\circ+\dfrac{\mathrm A}{2}$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\angle\mathrm{BIC}=90^\circ+\dfrac{\angle\mathrm A}{2}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\angle\mathrm{BIC}=90^\circ+\dfrac{80^\circ}{2}=90^\circ+40^\circ=130^\circ$。`,
      },
    ],
  },

  // ============================== C (5) ==============================
  {
    slug: "inscribed-angle-constant",
    title: "円周角は動かしても一定",
    unit: "図形の性質",
    difficulty: "C",
    tagline: "同じ弧の上なら角は変わらない",
    hasGraph: true,
    graphKey: "inscribed-angle",
    statement: r`円 $\mathrm O$ の周上に 2 点 $\mathrm B,\mathrm C$ を固定し、同じ弧の上に点 $\mathrm A$ をとる。中心角 $\angle\mathrm{BOC}=100^\circ$ のとき $\angle\mathrm{BAC}$ を求めよ。また、$\mathrm A$ を同じ弧の上で動かしても $\angle\mathrm{BAC}$ が一定である理由を、円周角の定理で説明せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 中心角は固定",
        body: r`$\mathrm B,\mathrm C$ が固定なら中心角 $\angle\mathrm{BOC}$ は一定。円周角はその半分なので、$\mathrm A$ の位置によらず一定になる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — A を弧の上で動かす",
        body: r`ラボで $\mathrm A$ を弧の上で滑らせると、円周角 $\angle\mathrm{BAC}$ は変わらず、つねに中心角 $\angle\mathrm{BOC}$ の半分であることが見える。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\angle\mathrm{BAC}=\dfrac12\angle\mathrm{BOC}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`円周角の定理より $\angle\mathrm{BAC}=\dfrac12\angle\mathrm{BOC}=\dfrac12\cdot100^\circ=50^\circ$。
$\mathrm A$ を同じ弧の上で動かしても、対する中心角 $\angle\mathrm{BOC}$ は同じ弧 $\mathrm{BC}$ に対するもので変わらないから、円周角 $\angle\mathrm{BAC}=50^\circ$ も一定。

**メタ。** 円周角の定理は「同じ弧 → 円周角一定 → 中心角の半分」。逆に『一定の角で線分を見込む点の軌跡は円弧』（軌跡の定理）も成り立ち、これが“直角 → 直径”（垂線の足が同一円周上に乗る問題）やタレスの定理の土台になる。`,
      },
    ],
  },
  {
    slug: "power-secant-tangent",
    title: "方べきの定理（割線と接線）",
    unit: "図形の性質",
    difficulty: "C",
    tagline: "接線の 2 乗 = 割線の積",
    hasGraph: true,
    graphKey: "power-of-a-point",
    statement: r`円の外部の点 $\mathrm P$ から 2 本の割線を引く。1 本目は円と $\mathrm A,\mathrm B$ で交わり $\mathrm{PA}=4,\ \mathrm{PB}=9$、2 本目は $\mathrm C,\mathrm D$ で交わり $\mathrm{PC}=3$ である。$\mathrm{PD}$ と、$\mathrm P$ から円に引いた接線の長さ $\mathrm{PT}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — どの直線でも積は一定",
        body: r`点 $\mathrm P$ の「方べき」は通す直線によらず一定で、$\mathrm{PA}\cdot\mathrm{PB}=\mathrm{PC}\cdot\mathrm{PD}=\mathrm{PT}^2$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 直線を回しても積は不変",
        body: r`ラボで点 $\mathrm P$ をドラッグしたり直線を回転させても、$\mathrm{PA}\cdot\mathrm{PB}=\mathrm{PC}\cdot\mathrm{PD}$ が一定（$=|R^2-\mathrm{OP}^2|$）であることを確かめよう。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\mathrm{PA}\cdot\mathrm{PB}=4\cdot9=36$。これが $\mathrm{PC}\cdot\mathrm{PD}$ と $\mathrm{PT}^2$ に等しい。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`方べき $=\mathrm{PA}\cdot\mathrm{PB}=4\cdot9=36$。
$\mathrm{PC}\cdot\mathrm{PD}=36\Rightarrow 3\,\mathrm{PD}=36\Rightarrow \mathrm{PD}=12$。
接線は $\mathrm{PT}^2=36\Rightarrow \mathrm{PT}=6$。

**メタ。** 方べき（点のべき）は $|\mathrm{OP}^2-R^2|$ で、点 $\mathrm P$ だけで決まり通す直線に依らない。割線で $\mathrm{PA}\cdot\mathrm{PB}$、接線で $\mathrm{PT}^2$ となるのは、接線が「2 交点が一致した割線」だから。2 円に対する方べきが等しい点の集合が**根軸**で、それが次の「共通弦」を含む直線になる。`,
      },
    ],
  },
  {
    slug: "ceva-theorem",
    title: "チェバの定理",
    unit: "図形の性質",
    difficulty: "C",
    tagline: "3 本のチェバ線、比の積は 1",
    hasGraph: true,
    graphKey: "ceva-theorem",
    statement: r`三角形 $\mathrm{ABC}$ の内部の点 $\mathrm O$ で 3 本のチェバ線 $\mathrm{AD},\mathrm{BE},\mathrm{CF}$ が交わっている（$\mathrm D,\mathrm E,\mathrm F$ はそれぞれ辺 $\mathrm{BC},\mathrm{CA},\mathrm{AB}$ 上）。$\mathrm{BD}:\mathrm{DC}=2:1,\ \mathrm{CE}:\mathrm{EA}=3:2$ のとき、$\mathrm{AF}:\mathrm{FB}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — チェバの定理",
        body: r`3 本のチェバ線が 1 点で交わるとき
$$\frac{\mathrm{BD}}{\mathrm{DC}}\cdot\frac{\mathrm{CE}}{\mathrm{EA}}\cdot\frac{\mathrm{AF}}{\mathrm{FB}}=1.$$`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 点を動かしても積は 1",
        body: r`ラボで内部の点 $\mathrm P$ をドラッグすると、3 本のチェバ線が対辺を分ける比の積 $(\mathrm{BD}/\mathrm{DC})(\mathrm{CE}/\mathrm{EA})(\mathrm{AF}/\mathrm{FB})$ がつねに $1$ であることが見える。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\dfrac21\cdot\dfrac32\cdot\dfrac{\mathrm{AF}}{\mathrm{FB}}=1$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`チェバの定理より
$$\frac21\cdot\frac32\cdot\frac{\mathrm{AF}}{\mathrm{FB}}=1\Rightarrow 3\cdot\frac{\mathrm{AF}}{\mathrm{FB}}=1\Rightarrow\frac{\mathrm{AF}}{\mathrm{FB}}=\frac13.$$
よって $\mathrm{AF}:\mathrm{FB}=1:3$。

**メタ。** チェバ（3 本のチェバ線が 1 点で交わる＝共点条件）とメネラウス（1 直線が 3 辺を横切る＝共線条件）は、ともに比の積 $=1$ という双対をなす。どちらも「三角形を一周すると比が打ち消し合う」構造で、面積比やベクトル・座標でも証明できる。次の routh の問題は、このチェバ的な分割が作る内部三角形の面積を問う発展形。`,
      },
    ],
  },
  {
    slug: "menelaus-intersection-ratio",
    title: "2 本の線分の交点の比",
    unit: "図形の性質",
    difficulty: "C",
    tagline: "メネラウスで交点比を出す",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ で、辺 $\mathrm{AB}$ を $2:1$ に内分する点を $\mathrm D$、辺 $\mathrm{AC}$ を $1:2$ に内分する点を $\mathrm E$ とする。線分 $\mathrm{BE}$ と $\mathrm{CD}$ の交点を $\mathrm P$ とするとき、$\mathrm{BP}:\mathrm{PE}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — どの三角形を、どの直線が横切るか",
        body: r`交点比を出すには「適切な三角形」と「それを横切る直線」を選ぶのが勝負。$\triangle\mathrm{ABE}$ を直線 $\mathrm{D\text{-}P\text{-}C}$ が横切るとみると、$\mathrm D$ は辺 $\mathrm{AB}$ 上、$\mathrm P$ は辺 $\mathrm{BE}$ 上、$\mathrm C$ は辺 $\mathrm{AE}$ の延長上——メネラウスの形が整う。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 既知の比を書き込む",
        body: r`横切る直線が触れる 3 点で比を集める。$\mathrm{AD}:\mathrm{DB}=2:1$（$\mathrm D$ は $\mathrm{AB}$ を $2:1$ 内分）、$\mathrm E$ は $\mathrm{AC}$ を $1:2$ 内分だから $\mathrm{AE}:\mathrm{EC}=1:2$、よって延長上の比は $\mathrm{EC}:\mathrm{CA}=2:3$。未知は $\mathrm{BP}:\mathrm{PE}$ だけ——3 つの比の積が $1$ になる関係に放り込めば解ける。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\dfrac{\mathrm{AD}}{\mathrm{DB}}\cdot\dfrac{\mathrm{BP}}{\mathrm{PE}}\cdot\dfrac{\mathrm{EC}}{\mathrm{CA}}=1$。$\dfrac{\mathrm{AD}}{\mathrm{DB}}=\dfrac21$、$\dfrac{\mathrm{EC}}{\mathrm{CA}}=\dfrac23$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\mathrm E$ は $\mathrm{AC}$ を $1:2$ に内分するので $\mathrm{AE}:\mathrm{EC}=1:2$、よって $\mathrm{EC}:\mathrm{CA}=2:3$。$\triangle\mathrm{ABE}$ を直線 $\mathrm{DPC}$ が横切るとして、メネラウスの定理より
$$\frac{\mathrm{AD}}{\mathrm{DB}}\cdot\frac{\mathrm{BP}}{\mathrm{PE}}\cdot\frac{\mathrm{EC}}{\mathrm{CA}}=\frac21\cdot\frac{\mathrm{BP}}{\mathrm{PE}}\cdot\frac23=1\ \Longrightarrow\ \frac43\cdot\frac{\mathrm{BP}}{\mathrm{PE}}=1\ \Longrightarrow\ \frac{\mathrm{BP}}{\mathrm{PE}}=\frac34.$$
よって $\mathrm{BP}:\mathrm{PE}=3:4$。

**メタ。** 交点の比は「メネラウスを当てる三角形・直線の選び方」で決まる。同じ図でも $\triangle\mathrm{ACD}$ を直線 $\mathrm{BPE}$ が横切るとみれば $\mathrm{CP}:\mathrm{PD}$ が出る。ベクトル（$\mathrm{AP}$ を 2 通りに表して係数比較）でも解けるが、比だけ欲しいときはメネラウスが最速。`,
      },
    ],
  },
  {
    slug: "concyclic-feet",
    title: "垂線の足は同一円周上",
    unit: "図形の性質",
    difficulty: "C",
    tagline: "直角は直径を見込む",
    hasGraph: false,
    statement: r`鋭角三角形 $\mathrm{ABC}$ の頂点 $\mathrm B,\mathrm C$ から対辺に下ろした垂線の足をそれぞれ $\mathrm E,\mathrm F$ とする（$\mathrm E$ は $\mathrm{CA}$ 上、$\mathrm F$ は $\mathrm{AB}$ 上）。4 点 $\mathrm B,\mathrm C,\mathrm E,\mathrm F$ が同一円周上にあることを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 直角は直径を見込む",
        body: r`「同一円周上（共円）」を示す決め手は、共通の線分を**同じ角で見込む**こと。ここでは $\mathrm{BC}$ を直径とする円に注目する。直径に対する円周角は $90^\circ$（タレス）なので、逆に $\mathrm{BC}$ を $90^\circ$ で見込む点は、その円周上に乗る。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 直角を作る 2 点を探す",
        body: r`垂線の足の定義を符号化する。$\mathrm{BE}\perp\mathrm{CA}$ だから $\angle\mathrm{BEC}=90^\circ$、$\mathrm{CF}\perp\mathrm{AB}$ だから $\angle\mathrm{BFC}=90^\circ$。$\mathrm E$ も $\mathrm F$ も「$\mathrm{BC}$ を直角に見込む点」——だから両方とも $\mathrm{BC}$ を直径とする同じ円の上にいるはず、と見抜く。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\angle\mathrm{BEC}$ と $\angle\mathrm{BFC}$ はともに $90^\circ$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\mathrm{BE}\perp\mathrm{CA}$ より $\angle\mathrm{BEC}=90^\circ$、$\mathrm{CF}\perp\mathrm{AB}$ より $\angle\mathrm{BFC}=90^\circ$。
$\mathrm E,\mathrm F$ はともに線分 $\mathrm{BC}$ を直角に見込むから、円周角の定理の逆により、$\mathrm{BC}$ を直径とする円の周上にある。直径の両端 $\mathrm B,\mathrm C$ もその円上にあるので、$\mathrm B,\mathrm C,\mathrm E,\mathrm F$ は同一円周上にある。$\blacksquare$

**メタ。** 共円の証明法は主に 3 つ：①同じ線分を等しい角で見込む（円周角の逆）②対角の和 $180^\circ$（内接四角形）③方べき $\mathrm{PA}\cdot\mathrm{PB}=\mathrm{PC}\cdot\mathrm{PD}$ の逆。本問は①の特別形（直角＝直径）。この $\mathrm E,\mathrm F$ を含む構図は、三角形の 6 つの特異点が 1 つの円に乗る「九点円」の入り口でもある。`,
      },
    ],
  },

  // ============================== D (3) ==============================
  {
    slug: "routh-one-seventh",
    title: "チェバ線が作る内部三角形の面積",
    unit: "図形の性質",
    difficulty: "D",
    tagline: "1 : 2 の分割が生む 1/7",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ で、辺 $\mathrm{BC},\mathrm{CA},\mathrm{AB}$ をそれぞれ $1:2$ に内分する点を $\mathrm D,\mathrm E,\mathrm F$ とする（$\mathrm{BD}:\mathrm{DC}=\mathrm{CE}:\mathrm{EA}=\mathrm{AF}:\mathrm{FB}=1:2$）。3 本のチェバ線 $\mathrm{AD},\mathrm{BE},\mathrm{CF}$ で囲まれる内部の三角形の面積は、$\triangle\mathrm{ABC}$ の何倍か。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 面積比は座標で不変",
        body: r`面積の**比**はアフィン変換（平行移動・拡大・剪断）で不変だから、$\mathrm A,\mathrm B,\mathrm C$ を計算しやすい座標に置いてよい。3 本のチェバ線の交点 3 つを内部三角形の頂点として、座標から面積を出す。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 対称性で手間を半分に",
        body: r`3 辺すべてが同じ $1:2$ 分割なので、図形は重心まわりの $120^\circ$ 回転で不変。だから内部三角形の頂点 1 つ（例：$\mathrm{AD}\cap\mathrm{BE}$）を連立で求めれば、残り 2 頂点は回転で得られる、と当たりをつける。まず $\mathrm D,\mathrm E,\mathrm F$ の座標を内分点公式で出すのが第一歩。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\mathrm A(0,0),\mathrm B(1,0),\mathrm C(0,1)$ とおく。$\mathrm D,\mathrm E,\mathrm F$ を求め、$\mathrm{AD}\cap\mathrm{BE}$ などを連立で出す。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\mathrm A(0,0),\mathrm B(1,0),\mathrm C(0,1)$ とおく。各辺を $1:2$ に内分して
$$\mathrm D\Bigl(\tfrac23,\tfrac13\Bigr),\quad \mathrm E\Bigl(0,\tfrac23\Bigr),\quad \mathrm F\Bigl(\tfrac13,0\Bigr).$$
3 直線 $\mathrm{AD},\mathrm{BE},\mathrm{CF}$ の交点を連立で求めると、内部三角形の頂点は
$$\Bigl(\tfrac47,\tfrac27\Bigr),\ \Bigl(\tfrac17,\tfrac47\Bigr),\ \Bigl(\tfrac27,\tfrac17\Bigr).$$
この三角形の面積は（三角形の面積公式により）$\dfrac{1}{14}$。一方 $\triangle\mathrm{ABC}=\dfrac12$ なので
$$\frac{1/14}{1/2}=\frac17.$$
よって内部三角形の面積は $\triangle\mathrm{ABC}$ の $\dfrac17$ 倍。

**メタ。** これは **Routh の定理**の有名な特別な場合。一般に各辺を比 $x,y,z$ で分けると、内部三角形の面積比は $\dfrac{(xyz-1)^2}{(xy+y+1)(yz+z+1)(zx+x+1)}$ で、$x=y=z=\tfrac12$ を入れると $\dfrac17$。座標・ベクトル・面積比（チェバ的分割）のいずれでも到達でき、対称性を使えば計算は劇的に減る。`,
      },
    ],
  },
  {
    slug: "two-circles-common-chord",
    title: "2 円の共通弦の長さ",
    unit: "図形の性質",
    difficulty: "D",
    tagline: "中心線に下ろして三平方",
    hasGraph: false,
    statement: r`半径 $4$ の円と半径 $3$ の円があり、中心間の距離は $5$ である。2 円は 2 点で交わる。共通弦の長さを求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 中心線に対して対称",
        body: r`共通弦は 2 円の中心を結ぶ直線 $\mathrm{OO'}$ に垂直で、$\mathrm{OO'}$ によって 2 等分される。中心を座標軸に乗せて 2 円の方程式を連立し、交点の $y$ 座標を出せば、弦の長さは $2|y|$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 中心間距離を動かす",
        body: r`下のラボでスライダー「中心間 $d$」を動かすと、共通弦（緑）の長さが変わる。弦は中心線に垂直で、$d$ が $|R_1-R_2|$ から $R_1+R_2$ の間にあるときだけ現れ、外では 2 円は交わらない。$d=5$ のとき弦は $\dfrac{24}{5}=4.8$。

@@lab:two-circles-common-chord@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`中心を $\mathrm O(0,0),\ \mathrm O'(5,0)$ とし、$x^2+y^2=16$ と $(x-5)^2+y^2=9$ を連立。引き算で $x$ が出る。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`中心を $\mathrm O(0,0),\ \mathrm O'(5,0)$ と置く。2 円は
$$x^2+y^2=16,\qquad (x-5)^2+y^2=9.$$
**辺々引く**と $x^2+y^2$ が消えて
$$x^2-(x-5)^2=16-9\ \Longrightarrow\ 10x-25=7\ \Longrightarrow\ x=\frac{16}{5}.$$
これを 1 つ目に代入して
$$y^2=16-\left(\frac{16}{5}\right)^2=16-\frac{256}{25}=\frac{144}{25},\qquad y=\pm\frac{12}{5}.$$
交点は $\left(\dfrac{16}{5},\pm\dfrac{12}{5}\right)$ で、共通弦の長さは $2|y|=\dfrac{24}{5}$。

**メタ。** 2 円の式を引き算すると 2 次の項 $x^2+y^2$ が消えて**1 次式（直線）**が残る——これが共通弦を含む直線（根軸）の方程式。「連立は引き算で次数を落とす」という発想は、円と円・円と放物線でも有効。中心線に下ろして直角三角形 $\left(d,\ \text{半弦}\right)$ を作る幾何的解法でも同じ $\dfrac{24}{5}$ に至る。`,
      },
    ],
  },
  {
    slug: "euler-polyhedron",
    title: "オイラーの多面体定理",
    unit: "図形の性質",
    difficulty: "D",
    tagline: "V − E + F = 2",
    hasGraph: false,
    statement: r`正五角形 $12$ 面と正六角形 $20$ 面からなる多面体（サッカーボール型）がある。各頂点では 3 つの面が集まっている。頂点の数 $V$ と辺の数 $E$ を求め、オイラーの多面体定理 $V-E+F=2$ を確かめよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 面の情報から辺・頂点を割り出す",
        body: r`与えられているのは面（種類と枚数）。ここから辺と頂点を“数えて割る”。各辺は **2 面で共有**されるので、面ごとの辺数の総和を $2$ で割ると $E$。各頂点には **3 面（＝3 本の辺）**が集まるので、面の角の総数を $3$ で割ると $V$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 二重カウントの倍率を確かめる",
        body: r`「面ごとの辺数」を全部足すと、各辺をちょうど 2 回数える（その辺を囲む 2 面で 1 回ずつ）。だから $\div2$。同じく「面ごとの角数」を全部足すと各頂点を 3 回数える（集まる 3 面で 1 回ずつ）から $\div3$。サッカーボールで $5\cdot12+6\cdot20=180$ を起点に、$E,V$ を割り出せる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$F=12+20=32$。辺：$\dfrac{5\cdot12+6\cdot20}{2}$、頂点：$\dfrac{5\cdot12+6\cdot20}{3}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`面数 $F=12+20=32$。
面の辺の総数は $5\cdot12+6\cdot20=180$。1 辺は 2 面で共有されるので
$$E=\frac{180}{2}=90.$$
各頂点に 3 面（3 つの角）が集まるので
$$V=\frac{180}{3}=60.$$
よって
$$V-E+F=60-90+32=2.$$
オイラーの多面体定理が成り立つ。

**メタ。** $V-E+F$ は**オイラー標数**で、（穴のない）凸多面体ではつねに $2$。これは多面体を球面に貼ったときの位相不変量で、形の細部に依らない。「面から辺・頂点を二重カウントで割り出す」手筋は、正多面体の分類（$\{V,E,F\}$ を未知数とする連立）でも主役になる。`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "ptolemy-theorem",
    title: "トレミーの定理",
    unit: "図形の性質",
    difficulty: "D_PLUS",
    tagline: "対角線の積＝向かい合う辺の積の和",
    hasGraph: false,
    statement: r`円に内接する四角形 $\mathrm{ABCD}$ について、トレミーの定理
$$\mathrm{AC}\cdot\mathrm{BD}=\mathrm{AB}\cdot\mathrm{CD}+\mathrm{AD}\cdot\mathrm{BC}$$
が成り立つことを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 対角線上に補助点を作る",
        body: r`対角線 $\mathrm{BD}$ 上に、$\angle\mathrm{BAE}=\angle\mathrm{CAD}$ となる点 $\mathrm E$ をとる。すると相似な三角形が 2 組現れ、辺の積が結びつく。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 円周角で等しい角を探す",
        body: r`同じ弧に対する円周角は等しい：$\angle\mathrm{ABD}=\angle\mathrm{ACD}$（弧 $\mathrm{AD}$）、$\angle\mathrm{ADB}=\angle\mathrm{ACB}$（弧 $\mathrm{AB}$）。これが 2 組の相似を生む種になる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 2 組の相似",
        body: r`$\triangle\mathrm{ABE}\sim\triangle\mathrm{ACD}$ と $\triangle\mathrm{AED}\sim\triangle\mathrm{ABC}$ を作り、それぞれから辺の積の式を出して足す。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`対角線 $\mathrm{BD}$ 上に $\angle\mathrm{BAE}=\angle\mathrm{CAD}$ となる点 $\mathrm E$ をとる。

(1) $\triangle\mathrm{ABE}$ と $\triangle\mathrm{ACD}$：$\angle\mathrm{BAE}=\angle\mathrm{CAD}$、弧 $\mathrm{AD}$ の円周角より $\angle\mathrm{ABE}=\angle\mathrm{ABD}=\angle\mathrm{ACD}$。2 角が等しく相似なので
$$\frac{\mathrm{AB}}{\mathrm{AC}}=\frac{\mathrm{BE}}{\mathrm{CD}}\ \Rightarrow\ \mathrm{AB}\cdot\mathrm{CD}=\mathrm{AC}\cdot\mathrm{BE}.$$

(2) $\triangle\mathrm{AED}$ と $\triangle\mathrm{ABC}$：$\angle\mathrm{EAD}=\angle\mathrm{BAC}$（ともに $\angle\mathrm{BAD}$ から $\angle\mathrm{BAE}=\angle\mathrm{CAD}$ を取り除いた角）、弧 $\mathrm{AB}$ の円周角より $\angle\mathrm{ADE}=\angle\mathrm{ADB}=\angle\mathrm{ACB}$。よって相似で
$$\frac{\mathrm{AD}}{\mathrm{AC}}=\frac{\mathrm{ED}}{\mathrm{BC}}\ \Rightarrow\ \mathrm{AD}\cdot\mathrm{BC}=\mathrm{AC}\cdot\mathrm{ED}.$$

(1)＋(2) より
$$\mathrm{AB}\cdot\mathrm{CD}+\mathrm{AD}\cdot\mathrm{BC}=\mathrm{AC}(\mathrm{BE}+\mathrm{ED})=\mathrm{AC}\cdot\mathrm{BD}.\qquad\blacksquare$$

**美しさ:** 対角線上にたった 1 点 $\mathrm E$ を「角を移す」ように取るだけで、四角形が 2 組の相似に割れ、$\mathrm{BE}+\mathrm{ED}=\mathrm{BD}$ という当たり前の足し算が、4 つの辺と 2 つの対角線をひとつの等式に結ぶ。

**メタ。** トレミーは「内接四角形 $\Rightarrow$ 等式」。一般の四角形では $\mathrm{AC}\cdot\mathrm{BD}\le\mathrm{AB}\cdot\mathrm{CD}+\mathrm{AD}\cdot\mathrm{BC}$（トレミーの不等式）が成り立ち、**等号がちょうど共円のとき**——だから共円判定にも使える。複素数（回転）や余弦定理でも証明でき、図形と計量で扱う「内接四角形の対角線」（$\mathrm{AB}=\mathrm{BC},\ \mathrm{CD}=\mathrm{DA}$ の四角形）にも直接効く強力な定理である。`,

      },
    ],
  },
];
