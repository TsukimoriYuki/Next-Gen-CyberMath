import type { Problem } from "@/lib/types";
import { measurementGeometryAddons } from "./geometry-height-centers";

// 数学I「図形と計量」(三角比) — 20 問。
// グラフ/図形が本質に効く難易度 C 以上の3問にのみラボを付ける。
const r = String.raw;

export const measurementTrigonometry: Problem[] = [
  // ============================== A (5) ==============================
  {
    slug: "trig-right-triangle-def",
    title: "直角三角形の三角比",
    unit: "図形と計量",
    difficulty: "A",
    tagline: "対辺・隣辺・斜辺の比",
    hasGraph: false,
    statement: r`直角三角形 $\mathrm{ABC}$（$\angle\mathrm C=90^\circ$）で $\mathrm{AB}=5,\ \mathrm{BC}=3$ のとき、$\sin A,\ \cos A,\ \tan A$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 斜辺と対辺",
        body: r`$\angle\mathrm C=90^\circ$ なので $\mathrm{AB}$ が斜辺。$A$ から見て対辺は $\mathrm{BC}$、隣辺は $\mathrm{CA}$。三平方の定理で残りの辺を出す。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\mathrm{CA}=\sqrt{5^2-3^2}=4$。$\sin A=\dfrac{\text{対辺}}{\text{斜辺}}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`三平方の定理より $\mathrm{CA}=\sqrt{25-9}=4$。
$$\sin A=\frac35,\quad \cos A=\frac45,\quad \tan A=\frac34.$$`,
      },
    ],
  },
  {
    slug: "trig-special-angle-height",
    title: "特別な角で高さを測る",
    unit: "図形と計量",
    difficulty: "A",
    tagline: "tan(仰角) = 高さ ÷ 距離",
    hasGraph: false,
    statement: r`水平な地面の点 $\mathrm P$ から高さ $h$ の塔の先端を見上げた仰角が $30^\circ$ で、$\mathrm P$ は塔の真下から $60\,\mathrm m$ 離れている。塔の高さ $h$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 直角三角形を作る",
        body: r`塔と地面で直角三角形ができる。$\tan(\text{仰角})=\dfrac{\text{高さ}}{\text{水平距離}}$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\tan30^\circ=\dfrac{h}{60}$、$\tan30^\circ=\dfrac1{\sqrt3}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\tan30^\circ=\dfrac{h}{60}$ より $h=60\tan30^\circ=\dfrac{60}{\sqrt3}=20\sqrt3\ (\mathrm m).$`,
      },
    ],
  },
  {
    slug: "trig-mutual-acute",
    title: "三角比の相互関係（鋭角）",
    unit: "図形と計量",
    difficulty: "A",
    tagline: "sin²+cos²=1 から芋づる式に",
    hasGraph: false,
    statement: r`$\theta$ は鋭角で $\sin\theta=\dfrac35$ とする。$\cos\theta$ と $\tan\theta$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 基本関係",
        body: r`$\sin^2\theta+\cos^2\theta=1$ から $\cos\theta$ を求める。鋭角なので $\cos\theta>0$。$\tan\theta=\dfrac{\sin\theta}{\cos\theta}$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\cos^2\theta=1-\dfrac{9}{25}=\dfrac{16}{25}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\cos^2\theta=1-\left(\dfrac35\right)^2=\dfrac{16}{25}$。鋭角より $\cos\theta=\dfrac45$。
$\tan\theta=\dfrac{\sin\theta}{\cos\theta}=\dfrac{3/5}{4/5}=\dfrac34.$`,
      },
    ],
  },
  {
    slug: "trig-obtuse-values",
    title: "鈍角の三角比",
    unit: "図形と計量",
    difficulty: "A",
    tagline: "180°−θ の公式で鋭角に戻す",
    hasGraph: false,
    statement: r`$\sin120^\circ,\ \cos135^\circ,\ \tan150^\circ$ の値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 補角の公式",
        body: r`$\sin(180^\circ-\theta)=\sin\theta$、$\cos(180^\circ-\theta)=-\cos\theta$、$\tan(180^\circ-\theta)=-\tan\theta$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$120^\circ=180^\circ-60^\circ$、$135^\circ=180^\circ-45^\circ$、$150^\circ=180^\circ-30^\circ$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\sin120^\circ=\sin60^\circ=\dfrac{\sqrt3}{2}.$

$\cos135^\circ=-\cos45^\circ=-\dfrac{\sqrt2}{2}.$

$\tan150^\circ=-\tan30^\circ=-\dfrac{\sqrt3}{3}.$`,
      },
    ],
  },
  {
    slug: "trig-equation-range",
    title: "三角比を含む方程式",
    unit: "図形と計量",
    difficulty: "A",
    tagline: "半円の上で角を探す",
    hasGraph: false,
    statement: r`$0^\circ\le\theta\le180^\circ$ のとき、$\sin\theta=\dfrac12$ と $\cos\theta=-\dfrac{\sqrt3}{2}$ を満たす $\theta$ をそれぞれ求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 単位円の上半分",
        body: r`$0^\circ\le\theta\le180^\circ$ では、$\sin$ の値は2つの角を、$\cos$ の値は1つの角を与えることが多い。単位円の上半分で考える。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\sin\theta=\dfrac12$ は鋭角と鈍角の2つ。$\cos\theta<0$ は鈍角側。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\sin\theta=\dfrac12\Rightarrow\theta=30^\circ,\ 150^\circ.$

$\cos\theta=-\dfrac{\sqrt3}{2}\Rightarrow\theta=150^\circ.$`,
      },
    ],
  },

  // ============================== B (6) ==============================
  {
    slug: "trig-one-plus-tan-squared",
    title: "1 + tan²θ = 1/cos²θ を使う",
    unit: "図形と計量",
    difficulty: "B",
    tagline: "鈍角なら cos は負",
    hasGraph: false,
    statement: r`$\theta$ は鈍角で $\tan\theta=-2$ とする。$\cos\theta$ と $\sin\theta$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — tan から cos へ",
        body: r`$1+\tan^2\theta=\dfrac{1}{\cos^2\theta}$ で $\cos\theta$ を求める。鈍角なので $\cos\theta<0,\ \sin\theta>0$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dfrac{1}{\cos^2\theta}=1+(-2)^2=5$。$\sin\theta=\tan\theta\cdot\cos\theta$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\dfrac{1}{\cos^2\theta}=1+\tan^2\theta=5$ より $\cos^2\theta=\dfrac15$。鈍角なので $\cos\theta=-\dfrac{1}{\sqrt5}=-\dfrac{\sqrt5}{5}$。
$\sin\theta=\tan\theta\cos\theta=(-2)\left(-\dfrac{1}{\sqrt5}\right)=\dfrac{2}{\sqrt5}=\dfrac{2\sqrt5}{5}\ (>0\ で整合).$`,
      },
    ],
  },
  {
    slug: "sine-rule-find-side",
    title: "正弦定理で辺を求める",
    unit: "図形と計量",
    difficulty: "B",
    tagline: "向かい合う辺と角を対応",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ で $A=45^\circ,\ B=60^\circ,\ a=\sqrt2$ のとき、辺 $b$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 正弦定理",
        body: r`$\dfrac{a}{\sin A}=\dfrac{b}{\sin B}$。向かい合う辺と角を対応させる。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$b=\dfrac{a\sin B}{\sin A}=\dfrac{\sqrt2\sin60^\circ}{\sin45^\circ}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$b=\dfrac{a\sin B}{\sin A}=\dfrac{\sqrt2\cdot\frac{\sqrt3}{2}}{\frac{1}{\sqrt2}}=\sqrt2\cdot\dfrac{\sqrt3}{2}\cdot\sqrt2=\sqrt3.$`,
      },
    ],
  },
  {
    slug: "cosine-rule-find-side",
    title: "余弦定理で辺を求める",
    unit: "図形と計量",
    difficulty: "B",
    tagline: "2 辺と挟角がそろえば余弦定理",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ で $b=3,\ c=5,\ A=120^\circ$ のとき、辺 $a$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 余弦定理",
        body: r`2辺と挟角がわかっているので $a^2=b^2+c^2-2bc\cos A$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\cos120^\circ=-\dfrac12$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$a^2=b^2+c^2-2bc\cos A=9+25-2\cdot3\cdot5\left(-\dfrac12\right)=34+15=49.$
よって $a=7$。`,
      },
    ],
  },
  {
    slug: "triangle-area-two-sides",
    title: "2 辺と挟角の面積",
    unit: "図形と計量",
    difficulty: "B",
    tagline: "S = ½ bc sin A",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ で $b=4,\ c=6,\ A=30^\circ$ のとき、面積 $S$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 面積公式",
        body: r`2辺と挟角がわかれば $S=\dfrac12 bc\sin A$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\sin30^\circ=\dfrac12$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$S=\dfrac12 bc\sin A=\dfrac12\cdot4\cdot6\cdot\dfrac12=6.$`,
      },
    ],
  },
  {
    slug: "trig-sin-plus-cos",
    title: "sinθ + cosθ から積を出す",
    unit: "図形と計量",
    difficulty: "B",
    tagline: "2 乗すれば積が出る",
    hasGraph: false,
    statement: r`$\sin\theta+\cos\theta=\dfrac12$ のとき、$\sin\theta\cos\theta$ と $\sin^3\theta+\cos^3\theta$ の値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 2 乗して基本関係",
        body: r`$(\sin\theta+\cos\theta)^2=\sin^2\theta+\cos^2\theta+2\sin\theta\cos\theta=1+2\sin\theta\cos\theta$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\left(\dfrac12\right)^2=1+2\sin\theta\cos\theta$。3 乗和は $a^3+b^3=(a+b)^3-3ab(a+b)$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$(\sin\theta+\cos\theta)^2=1+2\sin\theta\cos\theta=\dfrac14$ より $\sin\theta\cos\theta=-\dfrac38$。
$$\sin^3\theta+\cos^3\theta=\left(\tfrac12\right)^3-3\left(-\tfrac38\right)\cdot\tfrac12=\dfrac18+\dfrac{9}{16}=\dfrac{11}{16}.$$`,
      },
    ],
  },
  {
    slug: "cosine-rule-find-angle",
    title: "3 辺から角を求める",
    unit: "図形と計量",
    difficulty: "B",
    tagline: "最大角は最大辺の向かい",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ で $a=7,\ b=5,\ c=3$ のとき、最も大きい角 $A$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 余弦定理の変形",
        body: r`最大角は最大辺 $a$ の対角 $A$。$\cos A=\dfrac{b^2+c^2-a^2}{2bc}$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\cos A=\dfrac{25+9-49}{2\cdot5\cdot3}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\cos A=\dfrac{b^2+c^2-a^2}{2bc}=\dfrac{25+9-49}{30}=-\dfrac12.$
$0^\circ<A<180^\circ$ より $A=120^\circ$。`,
      },
    ],
  },

  // ============================== C (5) ==============================
  {
    slug: "sine-rule-circumradius",
    title: "正弦定理と外接円の半径",
    unit: "図形と計量",
    difficulty: "C",
    tagline: "同じ弧の円周角は変わらない",
    hasGraph: true,
    graphKey: "circumcircle-sine-rule",
    statement: r`三角形 $\mathrm{ABC}$ で $a=6,\ A=60^\circ$ とする。外接円の半径 $R$ を求めよ。また、同じ外接円上で頂点 $A$ を弧 $\mathrm{BC}$ 上（$\mathrm{BC}$ を含まない側）で動かすと $\angle A$ はどうなるか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 正弦定理の 2R",
        body: r`正弦定理 $\dfrac{a}{\sin A}=2R$ から $R$ が出る。さらに「同じ弧に対する円周角は等しい」ので、$A$ を同じ側の弧上で動かしても $\angle A$ は不変。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — A を弧の上で滑らせる",
        body: r`スライダーで頂点 $A$ を弧の上で動かそう。$\angle A$ の値も $a/\sin A$ の値も変化せず一定（$=2R$）であることを確かめよ。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$2R=\dfrac{a}{\sin A}=\dfrac{6}{\sin60^\circ}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`正弦定理より $2R=\dfrac{a}{\sin A}=\dfrac{6}{\sin60^\circ}=\dfrac{6}{\frac{\sqrt3}{2}}=\dfrac{12}{\sqrt3}=4\sqrt3$。よって $R=2\sqrt3$。

$\angle A$ は弧 $\mathrm{BC}$ に対する円周角なので、$A$ を同じ側の弧上で動かしても $\angle A=60^\circ$ のまま一定。したがって $\dfrac{a}{\sin A}=2R=4\sqrt3$ も一定に保たれる。

**メタ。** 正弦定理 $\dfrac{a}{\sin A}=2R$ の真価は「辺と対角の比が外接円で決まる不変量」であること。円周角の定理（同じ弧の円周角は一定）がその背骨で、$A$ をどこに置いても $\sin A$ が変わらないから $R$ も不変。辺・角・外接円を一本の等式で結ぶ、図形と計量の要の道具である。`,
      },
    ],
  },
  {
    slug: "cosine-rule-triangle-shape",
    title: "三角形の形を判定する",
    unit: "図形と計量",
    difficulty: "C",
    tagline: "a² と b²+c² の大小がすべて",
    hasGraph: true,
    graphKey: "law-of-cosines",
    statement: r`3辺の長さが $a=6,\ b=5,\ c=4$ である三角形は、鋭角・直角・鈍角三角形のいずれか。最大角の余弦の符号から判定せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 最大角の符号",
        body: r`最大角は最大辺 $a$ の対角 $A$。$\cos A$ が正なら鋭角、$0$ なら直角、負なら鈍角。これは $a^2$ と $b^2+c^2$ の大小に一致する。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 挟角と対辺の関係",
        body: r`ラボで挟角 $C$ を動かすと、対辺 $c$ と $c^2=a^2+b^2-2ab\cos C$ の関係が見える。$C=90^\circ$（$\cos C=0$）が鋭角・鈍角の境目で、$c^2=a^2+b^2$（3-4-5）になる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\cos A=\dfrac{b^2+c^2-a^2}{2bc}=\dfrac{25+16-36}{40}$ の符号を見る。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`最大辺は $a=6$、その対角 $A$ が最大角。
$$\cos A=\frac{b^2+c^2-a^2}{2bc}=\frac{25+16-36}{2\cdot5\cdot4}=\frac{5}{40}=\frac18>0.$$
$\cos A>0$ より最大角 $A$ は鋭角。よって三角形は **鋭角三角形**（$a^2=36<41=b^2+c^2$）。

**メタ。** 三角形の形は「最大角ひとつ」で決まる：$\cos(\text{最大角})$ の符号、すなわち $a^2$ と $b^2+c^2$ の大小だけを見ればよい（$a^2<b^2+c^2$ 鋭角／$=$ 直角／$>$ 鈍角）。残り 2 角は最大辺より短い辺の対角だから必ず鋭角で、判定には不要。$\cos$ を計算する手間すら、辺の 2 乗の比較で省ける。`,
      },
    ],
  },
  {
    slug: "triangle-area-maximize",
    title: "挟角を変えたときの面積の最大",
    unit: "図形と計量",
    difficulty: "C",
    tagline: "面積は sin に比例する",
    hasGraph: true,
    graphKey: "triangle-area",
    statement: r`2辺の長さが $4$ と $3$ で固定され、その挟角 $C$ を $0^\circ<C<180^\circ$ で変える三角形がある。面積 $S$ の最大値と、そのときの $C$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — S は sinC に比例",
        body: r`$S=\dfrac12\cdot4\cdot3\cdot\sin C=6\sin C$。$S$ は $\sin C$ に比例し、$\sin C$ は $C=90^\circ$ で最大 $1$。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 挟角を動かす",
        body: r`ラボで挟角 $C$ を動かすと、三角形の面積 $S=6\sin C$ が変化する。$C=90^\circ$（2辺が直交）のとき最大 $6$ になることを確かめよ。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$0^\circ<C<180^\circ$ で $\sin C$ が最大になる $C$ は？`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$S=\dfrac12\cdot4\cdot3\cdot\sin C=6\sin C$。$0^\circ<C<180^\circ$ で $\sin C$ は $C=90^\circ$ のとき最大値 $1$。
よって面積の最大値は $6$（$C=90^\circ$、2辺が直交するとき）。

**メタ。** $S=\dfrac12 bc\sin A$ で 2 辺を固定すると、面積は $\sin A$ だけの関数。$0^\circ<A<180^\circ$ で $\sin$ は $90^\circ$ で最大——「2 辺が直交で面積最大」は、底辺を固定したとき高さが最大になるのが直角のとき、という素朴な事実の言い換えである。`,
      },
    ],
  },
  {
    slug: "heron-formula-area",
    title: "ヘロンの公式で面積を出す",
    unit: "図形と計量",
    difficulty: "C",
    tagline: "3 辺だけから面積へ",
    hasGraph: false,
    statement: r`3辺の長さが $a=13,\ b=14,\ c=15$ の三角形の面積を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 3 辺だけで面積へ",
        body: r`角度が一切与えられず 3 辺だけのときは、ヘロンの公式 $S=\sqrt{s(s-a)(s-b)(s-c)}$、$s=\dfrac{a+b+c}{2}$。これは余弦定理で $\cos$ を出し、$\sin=\sqrt{1-\cos^2}$、$S=\dfrac12 ab\sin C$ と進む計算を一気に圧縮した公式である。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 13-14-15 の作りを見る",
        body: r`$s=\dfrac{13+14+15}{2}=21$ とすると $s-a=8,\ s-b=7,\ s-c=6$ といずれも小さな整数。積 $21\cdot8\cdot7\cdot6=7056=84^2$ がきれいな平方になる——「整数面積」の有名な三角形で、$\sqrt{\ }$ が外れる確信を先に得られる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$s=\dfrac{13+14+15}{2}=21$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$s=\dfrac{13+14+15}{2}=21$ より
$$S=\sqrt{s(s-a)(s-b)(s-c)}=\sqrt{21\cdot(21-13)(21-14)(21-15)}=\sqrt{21\cdot8\cdot7\cdot6}=\sqrt{7056}=84.$$

**別解（余弦定理 → 面積）。** $\cos A=\dfrac{b^2+c^2-a^2}{2bc}=\dfrac{196+225-169}{2\cdot14\cdot15}=\dfrac{252}{420}=\dfrac35$。よって $\sin A=\dfrac45$、$S=\dfrac12 bc\sin A=\dfrac12\cdot14\cdot15\cdot\dfrac45=84$。ヘロンと一致する。

**メタ。** ヘロンは「角を経由せず辺だけで面積」を出す圧縮形。次問の内接円半径 $r=\dfrac Ss$ や外接円半径 $R=\dfrac{abc}{4S}$ と組めば、3 辺だけからその三角形のあらゆる量（面積・内接円・外接円）に手が届く。`,
      },
    ],
  },
  {
    slug: "incircle-radius",
    title: "内接円の半径",
    unit: "図形と計量",
    difficulty: "C",
    tagline: "S = r s が橋渡し",
    hasGraph: false,
    statement: r`3辺が $a=13,\ b=14,\ c=15$ の三角形の内接円の半径 $r$ を求めよ。（面積は $84$ である。）`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 面積を内心で 3 分割する",
        body: r`内心 $\mathrm I$ から各辺に下ろした垂線の長さが、すべて内接円の半径 $r$。三角形を $\mathrm I$ と各辺で 3 つの三角形に分けると、面積は $S=\dfrac12 r\cdot a+\dfrac12 r\cdot b+\dfrac12 r\cdot c=rs$ となり、$r$ が橋渡しになる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 分割の絵を思い浮かべる",
        body: r`内心 $\mathrm I$ から 3 頂点へ線を引くと、底辺がそれぞれ $a,b,c$・高さがすべて $r$ の 3 つの三角形に分かれる。3 つの面積の和 $\dfrac12 r(a+b+c)$ が全体 $S$。周 $a+b+c=2s$ だから $S=rs$。図の分割が公式そのもの。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$S=rs$、$s=21$、$S=84$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`内接円の半径を $r$ とすると、三角形を内心で 3 分割して
$$S=\frac12 r(a+b+c)=rs.$$
$s=21,\ S=84$ より
$$r=\frac{S}{s}=\frac{84}{21}=4.$$

**メタ。** $S=rs$ は「面積 = 内接円半径 × 半周」というきわめて汎用的な等式。同様に外接円半径は $S=\dfrac{abc}{4R}$ で結ばれる。面積 $S$ を中継点にすれば、内接円・外接円・辺・角が芋づる式につながる——三角形の“ハブ”が面積だと分かる。`,
      },
    ],
  },

  // ============================== D (3) ==============================
  {
    slug: "cyclic-quadrilateral-diagonal",
    title: "円に内接する四角形の対角線",
    unit: "図形と計量",
    difficulty: "D",
    tagline: "対角の和は 180°、cos が反転",
    hasGraph: false,
    statement: r`円に内接する四角形 $\mathrm{ABCD}$ で $\mathrm{AB}=\mathrm{BC}=4,\ \mathrm{CD}=\mathrm{DA}=3$ である。対角線 $\mathrm{AC}$ の長さを求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 対角は補角、cos が反転する",
        body: r`円に内接する四角形は対角の和が $180^\circ$。よって $\cos D=\cos(180^\circ-B)=-\cos B$。同じ対角線 $\mathrm{AC}$ を、$\triangle\mathrm{ABC}$ と $\triangle\mathrm{ACD}$ で余弦定理を使って 2 通りに表し、$\cos D=-\cos B$ で結んで連立する。未知の $\cos B$ が一気に決まる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 頂点を動かして対角の和を見る",
        body: r`下のラボで四角形の 4 頂点を円周上で動かすと、対角の和 $\angle A+\angle C$、$\angle B+\angle D$ がつねに $180^\circ$ に保たれる。だから $\cos D=-\cos B$ が成り立ち、この符号反転が「2 通りに表した $\mathrm{AC}^2$」を結びつける鍵になる。

@@lab:cyclic-quadrilateral@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\mathrm{AC}^2=AB^2+BC^2-2\,AB\cdot BC\cos B$、$\mathrm{AC}^2=CD^2+DA^2-2\,CD\cdot DA\cos D$。$\cos D=-\cos B$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`対角線 $\mathrm{AC}$ を 2 通りに表す。

$\triangle\mathrm{ABC}$（$\mathrm{AB}=\mathrm{BC}=4$、挟角 $B$）：
$$\mathrm{AC}^2=4^2+4^2-2\cdot4\cdot4\cos B=32-32\cos B.$$
$\triangle\mathrm{ACD}$（$\mathrm{CD}=\mathrm{DA}=3$、挟角 $D$）：
$$\mathrm{AC}^2=3^2+3^2-2\cdot3\cdot3\cos D=18-18\cos D.$$
内接四角形より $\cos D=-\cos B$ なので第 2 式は $18+18\cos B$。両者を等しいとおくと
$$32-32\cos B=18+18\cos B\ \Longrightarrow\ 14=50\cos B\ \Longrightarrow\ \cos B=\frac{7}{25}.$$
よって
$$\mathrm{AC}^2=32-32\cdot\frac{7}{25}=\frac{800-224}{25}=\frac{576}{25},\qquad \mathrm{AC}=\frac{24}{5}.$$

**メタ。** 内接四角形は「対角の和 $180^\circ$ → $\cos$ 反転」が最強の武器。同じ線分を 2 つの三角形で表して連立する手筋は、対角線・辺の長さを問う問題で汎用。発展として、内接四角形の対角線には**トレミーの定理** $\mathrm{AC}\cdot\mathrm{BD}=\mathrm{AB}\cdot\mathrm{CD}+\mathrm{BC}\cdot\mathrm{DA}$ もあり、本問の対称性（$\mathrm{AB}=\mathrm{BC},\ \mathrm{CD}=\mathrm{DA}$）はそこにも効く。`,
      },
    ],
  },
  {
    slug: "surveying-tower-height",
    title: "測量：塔の高さ",
    unit: "図形と計量",
    difficulty: "D",
    tagline: "水平面で AP、鉛直で高さ",
    hasGraph: false,
    statement: r`水平な地面上の2地点 $\mathrm A,\mathrm B$ は $100\,\mathrm m$ 離れている。塔の真下の点を $\mathrm P$ とすると $\angle\mathrm{PAB}=75^\circ,\ \angle\mathrm{PBA}=60^\circ$ であった。さらに $\mathrm A$ から塔の頂点を見上げた仰角は $30^\circ$ であった。塔の高さを求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 平面図と立面図に分ける",
        body: r`空間の測量は「水平面の問題」と「鉛直の問題」に分解するのが鉄則。まず水平面の $\triangle\mathrm{PAB}$ で正弦定理から $\mathrm{AP}$ を求め（平面図）、次に塔・$\mathrm{AP}$・視線で作る鉛直な直角三角形で 高さ $=\mathrm{AP}\tan30^\circ$ を出す（立面図）。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 角の内訳を先に押さえる",
        body: r`水平面の $\triangle\mathrm{PAB}$ で、2 角 $\angle\mathrm{PAB}=75^\circ,\ \angle\mathrm{PBA}=60^\circ$ が分かるから残りの $\angle\mathrm{APB}=180^\circ-75^\circ-60^\circ=45^\circ$。3 角がそろえば正弦定理で $\mathrm{AP}$ が出る、と段取りを立ててから計算に入る。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\angle\mathrm{APB}=45^\circ$。$\dfrac{\mathrm{AP}}{\sin\angle\mathrm{PBA}}=\dfrac{\mathrm{AB}}{\sin\angle\mathrm{APB}}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**水平面（平面図）。** $\triangle\mathrm{PAB}$ で $\angle\mathrm{APB}=180^\circ-75^\circ-60^\circ=45^\circ$。正弦定理より
$$\mathrm{AP}=\frac{\mathrm{AB}\sin\angle\mathrm{PBA}}{\sin\angle\mathrm{APB}}=\frac{100\sin60^\circ}{\sin45^\circ}=\frac{100\cdot\frac{\sqrt3}{2}}{\frac{1}{\sqrt2}}=100\cdot\frac{\sqrt3}{2}\cdot\sqrt2=50\sqrt6.$$
**鉛直（立面図）。** 塔は $\mathrm P$ で鉛直に立つので、$\mathrm A$ からの仰角 $30^\circ$ を使い
$$\text{高さ}=\mathrm{AP}\tan30^\circ=50\sqrt6\cdot\frac{1}{\sqrt3}=50\sqrt2\ (\mathrm m).$$

**メタ。** 立体の測量は「水平の三角形で距離を確定 → 鉛直の直角三角形で高さ」の 2 段構えが定石。3 次元を 2 つの 2 次元（平面図・立面図）に射影して扱うことで、正弦定理と直角三角形という既知の道具だけで解ける。`,
      },
    ],
  },
  {
    slug: "median-theorem-proof",
    title: "中線定理を余弦定理で証明する",
    unit: "図形と計量",
    difficulty: "D",
    tagline: "補角の余弦が打ち消し合う",
    hasGraph: false,
    statement: r`三角形 $\mathrm{ABC}$ で辺 $\mathrm{BC}$ の中点を $\mathrm M$ とする。中線定理

$$\mathrm{AB}^2+\mathrm{AC}^2=2(\mathrm{AM}^2+\mathrm{BM}^2)$$

を余弦定理を用いて証明せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 補角ペアで cos を消す",
        body: r`中線 $\mathrm{AM}$ で $\triangle\mathrm{ABM}$ と $\triangle\mathrm{ACM}$ に分け、両方に余弦定理を使う。$\angle\mathrm{AMB}$ と $\angle\mathrm{AMC}$ は一直線上で和が $180^\circ$（補角）だから、余弦が符号違いで打ち消し合う——ここが証明の心臓。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 消える項を見抜く",
        body: r`$\angle\mathrm{AMB}=\theta$ とすると $\angle\mathrm{AMC}=180^\circ-\theta$ で $\cos(180^\circ-\theta)=-\cos\theta$。さらに $\mathrm M$ は中点だから $\mathrm{BM}=\mathrm{CM}$。2 つの余弦定理を「足す」と、$-2\,\mathrm{AM}\cdot\mathrm{BM}\cos\theta$ と $+2\,\mathrm{AM}\cdot\mathrm{CM}\cos\theta$ がちょうど相殺する、と足す前に見抜けるのが要。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\cos\angle\mathrm{AMC}=-\cos\angle\mathrm{AMB}$、$\mathrm{BM}=\mathrm{CM}$。2 式を足す。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\angle\mathrm{AMB}=\theta$ とおくと $\angle\mathrm{AMC}=180^\circ-\theta$、また $\mathrm{BM}=\mathrm{CM}$。余弦定理より
$$\mathrm{AB}^2=\mathrm{AM}^2+\mathrm{BM}^2-2\,\mathrm{AM}\cdot\mathrm{BM}\cos\theta,$$
$$\mathrm{AC}^2=\mathrm{AM}^2+\mathrm{CM}^2-2\,\mathrm{AM}\cdot\mathrm{CM}\cos(180^\circ-\theta).$$
$\cos(180^\circ-\theta)=-\cos\theta$、$\mathrm{BM}=\mathrm{CM}$ なので、第 2 式の最後の項は $+2\,\mathrm{AM}\cdot\mathrm{BM}\cos\theta$。辺々加えると $\cos\theta$ の項が相殺して
$$\mathrm{AB}^2+\mathrm{AC}^2=2\mathrm{AM}^2+2\mathrm{BM}^2=2(\mathrm{AM}^2+\mathrm{BM}^2).\qquad\blacksquare$$

**別解（ベクトル）。** $\mathrm M$ を基準に $\vec{\mathrm{MB}}=-\vec{\mathrm{MC}}$ とおくと、$\mathrm{AB}^2+\mathrm{AC}^2=|\vec{\mathrm{MB}}-\vec{\mathrm{MA}}|^2+|\vec{\mathrm{MC}}-\vec{\mathrm{MA}}|^2=2|\vec{\mathrm{MA}}|^2+2|\vec{\mathrm{MB}}|^2$（交差項 $-2\vec{\mathrm{MA}}\cdot(\vec{\mathrm{MB}}+\vec{\mathrm{MC}})$ が $\vec{\mathrm{MB}}+\vec{\mathrm{MC}}=\vec0$ で消える）。補角の余弦が消えるのと同じ相殺がベクトルでは内積で起こる。

**メタ。** 「補角 → $\cos$ 反転 → 足して相殺」は中線・角の二等分・内接四角形で繰り返し現れる定型。中線定理（パップスの定理）はベクトル・座標でも示せ、$\cos$ の相殺と内積の相殺が同じ現象であることを味わうと、道具の選択が自由になる。`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "weitzenbock-inequality",
    title: "a² + b² + c² ≥ 4√3 S（ヴァイツェンベックの不等式）",
    unit: "図形と計量",
    difficulty: "D_PLUS",
    tagline: "余弦と正弦が、合成で 1 つに束ねられる",
    hasGraph: false,
    statement: r`三角形の3辺を $a,b,c$、面積を $S$ とする。

$$a^2+b^2+c^2\ \ge\ 4\sqrt3\,S$$

を示し、等号が成り立つのはどんな三角形かを述べよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 角 C を主役に",
        body: r`余弦定理 $c^2=a^2+b^2-2ab\cos C$ と面積 $S=\dfrac12 ab\sin C$ を代入し、$\cos C$ と $\sin C$ を合成で 1 つの正弦にまとめる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 正三角形で等号を疑う",
        body: r`正三角形（$a=b=c$）では $a^2+b^2+c^2=3a^2$、$S=\dfrac{\sqrt3}{4}a^2$ なので $4\sqrt3\,S=3a^2$。ちょうど等号。形を崩すと左辺が増えそう、と当たりをつける。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 合成にもち込む",
        body: r`$c^2,\ S$ を代入すると $2a^2+2b^2-2ab\cos C-2\sqrt3\,ab\sin C$。合成 $\cos C+\sqrt3\sin C=2\sin(C+30^\circ)\le2$ を使う。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`角 $C$ について $c^2=a^2+b^2-2ab\cos C$、$S=\dfrac12 ab\sin C$ を代入すると
$$a^2+b^2+c^2-4\sqrt3\,S=2a^2+2b^2-2ab\cos C-2\sqrt3\,ab\sin C.$$
ここで $\cos C+\sqrt3\sin C=2\sin(C+30^\circ)\le2$ なので $2ab\cos C+2\sqrt3\,ab\sin C\le4ab$。したがって
$$a^2+b^2+c^2-4\sqrt3\,S\ \ge\ 2a^2+2b^2-4ab=2(a-b)^2\ \ge\ 0.$$
ゆえに $a^2+b^2+c^2\ge4\sqrt3\,S$。

等号は $2(a-b)^2=0$ かつ $\sin(C+30^\circ)=1$、すなわち $a=b$ かつ $C=60^\circ$。このとき三角形は **正三角形**。$\blacksquare$

**補足（対称な見方）。** 角 $C$ を選んで証明したが、$A,B$ どの角を主役にしても同じ不等式が出る。完全平方が「選んだ角を挟む 2 辺の差」$2(a-b)^2$ として現れる点に注目すると、等号成立が $a=b$ かつ $C=60^\circ$、すなわち 3 通りの評価が同時に等号になる唯一の形＝正三角形だと腑に落ちる。

**美しさ:** 余弦と正弦が合成でただ 1 つの $\sin(C+30^\circ)$ に束ねられ、残りが完全平方 $2(a-b)^2$ に落ちる。3 辺の自乗和と面積という異質な量の間に、正三角形を等号とする最短の橋が架かる。`,
      },
    ],
  },

  // ---- 旧帝大レベル追加（空間図形） ----
  {
    slug: "regular-tetrahedron-volume-insphere",
    title: "正四面体の体積と内接球の半径",
    unit: "図形と計量",
    difficulty: "D_PLUS",
    tagline: "V = ⅓ r·S が内接球を引き出す",
    hasGraph: false,
    tags: ["正四面体", "空間図形", "体積", "内接球"],
    statement: r`1 辺の長さが $a$ の正四面体について、体積 $V$ と内接球の半径 $r$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 高さは重心の真上",
        body: r`正四面体の頂点から底面に下ろした垂線の足は、底面（正三角形）の重心。重心と底面の頂点の距離（外接円半径）を使い、三平方の定理で高さ $H$ を出す。内接球は「中心から 4 面への距離」で、体積を 4 つの三角錐に分けると $V=\dfrac13 r\,S$（$S$ は全表面積）。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 正四面体を回して構造を見る",
        body: r`下のラボで正四面体を回転させると、全 6 辺が等しいこと、頂点が底面（正三角形）の重心の真上に来ることが見える。高さ $H$ は「頂点・重心・底面の頂点」が作る直角三角形——斜辺が辺 $a$、底辺が底面の外接円半径 $\dfrac{a}{\sqrt3}$——から三平方で求まる。

@@lab:tetrahedron-3d@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`底面正三角形の外接円半径は $\dfrac{a}{\sqrt3}$。高さ $H=\sqrt{a^2-\dfrac{a^2}{3}}$。全表面積 $S=4\cdot\dfrac{\sqrt3}{4}a^2$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**高さ:** 底面の正三角形の重心と頂点の距離（外接円半径）は $\dfrac{a}{\sqrt3}$。頂点までの高さは
$$H=\sqrt{a^2-\left(\frac{a}{\sqrt3}\right)^2}=\sqrt{a^2-\frac{a^2}{3}}=\sqrt{\frac{2}{3}}\,a=\frac{\sqrt6}{3}a.$$

**体積:** 底面積は $\dfrac{\sqrt3}{4}a^2$ なので
$$V=\frac13\cdot\frac{\sqrt3}{4}a^2\cdot\frac{\sqrt6}{3}a=\frac{\sqrt{18}}{36}a^3=\frac{\sqrt2}{12}a^3.$$

**内接球の半径:** 内接球の中心 $\mathrm I$ と 4 つの面を結ぶと、正四面体は高さ $r$・底面が各面の三角錐 4 つに分かれる。全表面積を $S=4\cdot\dfrac{\sqrt3}{4}a^2=\sqrt3\,a^2$ として
$$V=\frac13 r\,S\ \Longrightarrow\ r=\frac{3V}{S}=\frac{3\cdot\frac{\sqrt2}{12}a^3}{\sqrt3\,a^2}=\frac{\sqrt2}{4\sqrt3}a=\frac{\sqrt6}{12}a.$$

よって $V=\dfrac{\sqrt2}{12}a^3,\quad r=\dfrac{\sqrt6}{12}a$。

**美しさ:** 「体積 $=\dfrac13\times$ 底面 $\times$ 高さ」を内心から 4 方向に適用するだけで、$V=\dfrac13 r\,S$ という橋が架かり、内接球の半径が体積と表面積の比として一瞬で求まる。`,
      },
    ],
  },
  ...measurementGeometryAddons,
];
