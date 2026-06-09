import type { Problem } from "@/lib/types";

// Expansion Pack 3 — 手薄領域の補強（複素数平面・数列・空間ベクトル・微積分・確率・三角関数）
// 難易度帯：C〜D+（偏差値60〜70）を中心に据える。
const r = String.raw;

export const EXPANSION_PACK_3: Problem[] = [
  // ══════════════════════════════════════════════════════════
  // 【複素数平面】5問（C×2 / D×2 / D+×1）
  // ══════════════════════════════════════════════════════════

  // ── C-1 ──────────────────────────────────────────────────
  {
    slug: "ep3-complex-polar-moivre",
    title: "極形式とド・モアブルで累乗を征服する",
    unit: "複素数平面",
    difficulty: "C",
    tagline: "偏角を掛け算すれば、大きさはべき乗になる",
    hasGraph: false,
    tags: ["極形式", "ド・モアブル", "複素数の累乗"],
    university: "標準類題（オリジナル）",
    deviation: 60,
    year: 2024,
    backgroundTag: "ド・モアブルの定理",
    statement: r`$z = -1 + \sqrt{3}\,i$ について、$z^6$ を求めよ。また $z^{10}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 直交形式のまま累乗しない",
        body: r`$(-1+\sqrt3 i)^6$ を展開しようとすると6項以上の計算になり、ミスが多発する。**極形式**（絶対値と偏角）に直してド・モアブルの定理を使えば、累乗は「絶対値のべき乗」と「偏角のスカラー倍」だけになる。これが複素数の累乗問題の**鉄則**。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 「変換してから計算」の訓練",
        body: r`この問題が問うのは、複雑な形式のまま計算しようとする誘惑に負けず、**変換コスト**を払ってでも楽な形に直す判断力。受験数学では、表現形式の選択が計算量を10倍変えることがある。極形式への変換は「投資」であり、べき乗が大きくなるほど回収が大きい。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 絶対値と偏角",
        body: r`$|z| = \sqrt{(-1)^2+(\sqrt3)^2} = \sqrt{1+3} = 2$。偏角は第2象限で $\tan\theta = -\sqrt3$ より $\theta = \dfrac{2\pi}{3}$。したがって $z = 2\!\left(\cos\dfrac{2\pi}{3}+i\sin\dfrac{2\pi}{3}\right)$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$z = 2\!\left(\cos\dfrac{2\pi}{3}+i\sin\dfrac{2\pi}{3}\right)$ と表せる。ド・モアブルの定理より
$$z^6 = 2^6\!\left(\cos\frac{6\cdot2\pi}{3}+i\sin\frac{6\cdot2\pi}{3}\right) = 64(\cos 4\pi+i\sin 4\pi) = 64.$$
$$z^{10} = 2^{10}\!\left(\cos\frac{10\cdot2\pi}{3}+i\sin\frac{10\cdot2\pi}{3}\right) = 1024\!\left(\cos\frac{20\pi}{3}+i\sin\frac{20\pi}{3}\right).$$
$\dfrac{20\pi}{3} = 6\pi + \dfrac{2\pi}{3}$ より偏角を $\dfrac{2\pi}{3}$ に揃えると
$$z^{10} = 1024\!\left(-\frac12+\frac{\sqrt3}{2}i\right) = -512+512\sqrt3\,i.$$

**美しさ:** $z^6=64$（実数！）は $z$ が「$60°$ ずつ回す変換を3回した」結果、偏角が $360°$ の倍数になり虚部が消えたため。大きさと角度が独立に動くのが極形式の強み。`,
      },
    ],
  },

  // ── C-2 ──────────────────────────────────────────────────
  {
    slug: "ep3-complex-locus-bisector",
    title: "等距離条件が描く複素数の軌跡",
    unit: "複素数平面",
    difficulty: "C",
    tagline: "|z-α|=|z-β| は、α と β の垂直二等分線",
    hasGraph: false,
    tags: ["複素数の軌跡", "垂直二等分線", "絶対値"],
    university: "標準類題（オリジナル）",
    deviation: 60,
    year: 2024,
    backgroundTag: "複素数平面の軌跡",
    statement: r`複素数 $z$ が $|z-2| = |z-2i|$ を満たすとき、$z$ の軌跡を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — |z-α|=|z-β| は垂直二等分線",
        body: r`$|z-2|$ は複素数平面上の点 $z$ と点 $2$（実軸上）との距離、$|z-2i|$ は点 $z$ と点 $2i$（虚軸上）との距離を表す。「2点から等距離」は**垂直二等分線**の定義そのもの。$z=x+yi$ と置いて展開すれば直線の方程式が出る。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 幾何と代数を繋ぐ翻訳力",
        body: r`「複素数の絶対値 ＝ 2点間の距離」という**翻訳**ができるかを問う。公式を暗記するのではなく、$|z-\alpha|$ の幾何的意味を体得しているかが問われる。軌跡問題は「条件を点の動き方に翻訳する」ことが本質。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — z = x + yi と置いて展開",
        body: r`$z=x+yi$（$x,y$は実数）とすると、$|z-2|^2=(x-2)^2+y^2$、$|z-2i|^2=x^2+(y-2)^2$。等しいと置いて整理せよ。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$z=x+yi$ とおくと
$$(x-2)^2+y^2 = x^2+(y-2)^2.$$
展開して整理すると
$$x^2-4x+4+y^2 = x^2+y^2-4y+4,$$
$$-4x = -4y,\quad \therefore\; y = x.$$
よって軌跡は直線 $y=x$（すなわち実部と虚部が等しい複素数の集合）。

幾何的には $2\,(=2+0i)$ と $2i\,(=0+2i)$ を結ぶ線分の**垂直二等分線**であり、$y=x$ はまさにその二等分線になる（中点 $1+i$ を通り、傾き $45°$）。`,
      },
    ],
  },

  // ── D-1 ──────────────────────────────────────────────────
  {
    slug: "ep3-de-moivre-triple-angle",
    title: "ド・モアブルで3倍角公式を導く",
    unit: "複素数平面",
    difficulty: "D",
    tagline: "実部・虚部を分離すれば、三角恒等式が生まれる",
    hasGraph: false,
    tags: ["ド・モアブル", "3倍角公式", "二項展開"],
    university: "標準類題（オリジナル）",
    deviation: 65,
    year: 2024,
    backgroundTag: "ド・モアブルによる多倍角",
    statement: r`ド・モアブルの定理 $(\cos\theta+i\sin\theta)^n=\cos n\theta+i\sin n\theta$ を用いて、$\cos 3\theta$ および $\sin 3\theta$ を $\sin\theta,\cos\theta$ の多項式として表せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 左辺を二項展開、実部＝cos、虚部＝sin",
        body: r`$n=3$ のとき左辺 $(\cos\theta+i\sin\theta)^3$ を二項定理で展開する。$i^2=-1, i^3=-i$ を使えば実部と虚部に分離でき、それぞれがド・モアブルの右辺 $\cos3\theta,\sin3\theta$ と一致する。**「複素数の等号は実部と虚部の等号」**がこの問題の核。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 公式の「導き方」を知る",
        body: r`3倍角公式自体は暗記できる。しかしこの問題が問うのは「なぜその公式が成り立つか」の**証明構造**。ド・モアブルと二項展開の組合せは、任意の $n$ 倍角公式を機械的に生み出す。これを知れば公式の暗記から解放され、必要なとき自力で再導出できる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — $i$ のべきを整理",
        body: r`$(\cos\theta+i\sin\theta)^3 = \cos^3\theta + 3\cos^2\theta(i\sin\theta)+3\cos\theta(i\sin\theta)^2+(i\sin\theta)^3$。$i^2=-1,\,i^3=-i$ を代入して実部・虚部に分ける。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`二項定理で展開すると
$$(\cos\theta+i\sin\theta)^3 = \cos^3\!\theta+3i\cos^2\!\theta\sin\theta-3\cos\theta\sin^2\!\theta-i\sin^3\!\theta.$$
実部と虚部をまとめると
$$= (\cos^3\!\theta - 3\cos\theta\sin^2\!\theta)+i(3\cos^2\!\theta\sin\theta-\sin^3\!\theta).$$
ド・モアブルより実部 $=\cos3\theta$、虚部 $=\sin3\theta$ なので
$$\boxed{\cos3\theta = \cos^3\!\theta - 3\cos\theta\sin^2\!\theta = 4\cos^3\!\theta-3\cos\theta,}$$
$$\boxed{\sin3\theta = 3\cos^2\!\theta\sin\theta-\sin^3\!\theta = 3\sin\theta-4\sin^3\!\theta.}$$
（最終形への変形は $\sin^2\!\theta=1-\cos^2\!\theta$ を利用した。）

**美しさ:** この手順は $n$ 倍角でも全く同じ。$n=10$ でも二項展開+偶奇で実部・虚部が出る。`,
      },
    ],
  },

  // ── D-2 ──────────────────────────────────────────────────
  {
    slug: "ep3-complex-moebius-imaginary-axis",
    title: "メビウス変換が単位円を虚軸に移す",
    unit: "複素数平面",
    difficulty: "D",
    tagline: "w = (z−1)/(z+1)、円が直線に化ける瞬間",
    hasGraph: false,
    tags: ["複素数の変換", "メビウス変換", "軌跡"],
    university: "標準類題（オリジナル）",
    deviation: 65,
    year: 2024,
    backgroundTag: "複素数による一次変換",
    statement: r`$z \neq -1$ の複素数 $z$ に対し $w = \dfrac{z-1}{z+1}$ と定める。$|z|=1$ のとき、$w$ が描く図形を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — Re(w)=0 を示す",
        body: r`$w$ が純虚数（または $0$）であること、すなわち $\mathrm{Re}(w)=0$ を示したい。複素数の実部は $w+\bar{w}=2\,\mathrm{Re}(w)$ で計算できる。$|z|=1$ の条件 $z\bar{z}=1$ をうまく使う。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 変換による図形の対応",
        body: r`複素数の一次変換（メビウス変換）は「円（直線含む）を円（直線含む）に移す」という美しい性質を持つ。$|z|=1$ という円が $\mathrm{Re}(w)=0$ という直線に移ることを発見する体験が目的。$z=-1$ の除外（分母が $0$）と対応する $w\to\infty$（「無限遠点」）まで意識できると完璧。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — w + w̄ を計算",
        body: r`$\bar{w} = \dfrac{\bar{z}-1}{\bar{z}+1}$ であることを利用し、$w+\bar{w} = \dfrac{(z-1)(\bar{z}+1)+(\bar{z}-1)(z+1)}{(z+1)(\bar{z}+1)}$ の分子を展開する。$|z|=1$ すなわち $z\bar{z}=1$ を代入するとどうなるか。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$w + \bar{w}$ の分子を展開すると
$$(z-1)(\bar{z}+1)+(\bar{z}-1)(z+1) = (z\bar{z}+z-\bar{z}-1)+(\bar{z}z+\bar{z}-z-1) = 2z\bar{z}-2.$$
$|z|=1$ より $z\bar{z}=|z|^2=1$ なので分子 $=2\cdot1-2=0$。分母 $(z+1)(\bar{z}+1)=|z+1|^2\neq 0$（$z\neq-1$ の仮定より）。

したがって $w+\bar{w}=0$、すなわち $\mathrm{Re}(w)=0$。$w$ は純虚数または $0$ であり、$z=1$ のとき $w=0$、それ以外は $w\neq0$ の純虚数。

よって $w$ の軌跡は**虚軸全体**（$\mathrm{Re}(w)=0$ の直線）。

**美しさ:** 「単位円」という有限の閉曲線が「虚軸」という無限の直線に展開される。$z=-1$ が虚軸の無限遠点に対応し、変換の特異点が「軌跡の消えた点」として現れる。`,
      },
    ],
  },

  // ── D+ ──────────────────────────────────────────────────
  {
    slug: "ep3-fifth-root-sum-reciprocal",
    title: "1の5乗根の逆数の和",
    unit: "複素数平面",
    difficulty: "D_PLUS",
    tagline: "対数微分が、和を一瞬で計算する",
    hasGraph: false,
    tags: ["1のn乗根", "対数微分", "有理式の和"],
    university: "標準類題（オリジナル）",
    deviation: 70,
    year: 2024,
    backgroundTag: "1のn乗根の応用",
    statement: r`$z^5=1,\; z\neq1$ の4つの解を $\zeta_1,\zeta_2,\zeta_3,\zeta_4$ とするとき、$\displaystyle\sum_{k=1}^{4}\frac{1}{1-\zeta_k}$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 多項式の対数微分",
        body: r`直接計算では $\zeta_k = e^{2\pi ik/5}$ という無理数が絡んで困難。$\zeta_1,\dots,\zeta_4$ は多項式
$$f(z)=z^4+z^3+z^2+z+1$$
の 4 根であることを思い出す。$\sum\dfrac{1}{z-\zeta_k}=\dfrac{f'(z)}{f(z)}$ という**対数微分の関係**を $z=1$ で評価するのが急所。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — ツールとして多項式を使う",
        body: r`複素数の根を具体的に計算せず、その「根であるという事実」だけを使って和を求める。これは整数問題での「$p+q$ や $pq$ は分かるが $p,q$ は無理数」という構造と同じ。Vieta の公式の連続版が「$f'/f = \sum1/(z-\zeta_k)$」であり、特定の $z$ に代入することで根に関する複雑な和が瞬時に計算できる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — f(1) と f′(1) を計算する",
        body: r`$f(z)=z^4+z^3+z^2+z+1$ の根が $\zeta_1,\dots,\zeta_4$ であるとき
$$\frac{f'(z)}{f(z)} = \sum_{k=1}^{4}\frac{1}{z-\zeta_k}.$$
$z=1$ を代入すると $\sum_{k=1}^{4}\dfrac{1}{1-\zeta_k} = \dfrac{f'(1)}{f(1)}$。$f(1)$ と $f'(1)$ を求めよ。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$z^5-1 = (z-1)(z^4+z^3+z^2+z+1)$ より、$z^5=1,z\neq1$ の解は $f(z)=z^4+z^3+z^2+z+1$ の根 $\zeta_1,\dots,\zeta_4$。

$f$ の根を用いた部分分数の表示：
$$f'(z) = \frac{d}{dz}\prod_{k=1}^4(z-\zeta_k) = f(z)\sum_{k=1}^{4}\frac{1}{z-\zeta_k},$$
すなわち $\dfrac{f'(z)}{f(z)}=\displaystyle\sum_{k=1}^{4}\dfrac{1}{z-\zeta_k}$。

$z=1$ を代入（$f(1)=1+1+1+1+1=5\neq0$ より問題なし）：
$$f'(z)=4z^3+3z^2+2z+1 \implies f'(1)=4+3+2+1=10.$$
よって
$$\sum_{k=1}^{4}\frac{1}{1-\zeta_k} = \frac{f'(1)}{f(1)} = \frac{10}{5} = \boxed{2}.$$

**美しさ:** 超越数 $e^{2\pi i/5}$ を一切計算せずに、多項式の値だけで答えが出る。「根を使わず根についての和を求める」逆説が対数微分の本質。`,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 【数列】3問（D×2 / D+×1）
  // ══════════════════════════════════════════════════════════

  // ── D-1 ──────────────────────────────────────────────────
  {
    slug: "ep3-telescoping-partial-fraction",
    title: "部分分数分解とテレスコーピング",
    unit: "数列",
    difficulty: "D",
    tagline: "分母の積は差に分解すれば消える",
    hasGraph: false,
    tags: ["部分分数分解", "テレスコーピング", "数列の和"],
    university: "標準類題（オリジナル）",
    deviation: 65,
    year: 2024,
    backgroundTag: "テレスコーピング和",
    statement: r`$\displaystyle\sum_{k=1}^{n}\frac{1}{k(k+2)}$ を $n$ の式で表せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 差の形に分解して隣を消す",
        body: r`$\dfrac{1}{k(k+2)}$ はそのままでは和が取れない。**部分分数分解**（partial fractions）で $\dfrac{A}{k}+\dfrac{B}{k+2}$ の形にする。差の形にすると隣接する項が消え合う**テレスコーピング**（望遠鏡のように縮む）が起き、残る項は端のわずか数項だけ。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 分母の積→差への変換",
        body: r`$\dfrac{1}{k(k+1)},\,\dfrac{1}{k(k+2)},\,\dfrac{1}{k(k+3)},\dots$ はすべて「分母が2つの1次因数の積」という形。**差を $\dfrac{1}{\text{差}}$倍した差分**に分解できる。これを知っているだけで、分母が積の形の数列の和は機械的に解ける。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 係数を決める",
        body: r`$\dfrac{1}{k(k+2)}=\dfrac{1}{2}\!\left(\dfrac{1}{k}-\dfrac{1}{k+2}\right)$ を確認せよ（両辺に $k(k+2)$ を掛けて確かめる）。Σ に代入して項を書き並べると、多くの項が消える。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`部分分数分解：$\dfrac{1}{k(k+2)}=\dfrac{1}{2}\!\left(\dfrac{1}{k}-\dfrac{1}{k+2}\right)$。

$$\sum_{k=1}^{n}\frac{1}{k(k+2)} = \frac{1}{2}\sum_{k=1}^{n}\!\left(\frac{1}{k}-\frac{1}{k+2}\right).$$

右辺を書き並べると（テレスコーピング）：

$$\frac{1}{2}\!\left[\left(\frac{1}{1}-\frac{1}{3}\right)+\left(\frac{1}{2}-\frac{1}{4}\right)+\left(\frac{1}{3}-\frac{1}{5}\right)+\cdots+\left(\frac{1}{n}-\frac{1}{n+2}\right)\right].$$

各列で打ち消しが起きて残るのは先頭の $\dfrac{1}{1}$ と $\dfrac{1}{2}$、末尾の $-\dfrac{1}{n+1}$ と $-\dfrac{1}{n+2}$ のみ：

$$= \frac{1}{2}\!\left(1+\frac{1}{2}-\frac{1}{n+1}-\frac{1}{n+2}\right) = \frac{3}{4}-\frac{1}{2(n+1)}-\frac{1}{2(n+2)}.$$

（検算：$n=1$ で $\dfrac{1}{1\cdot3}=\dfrac13$、公式値 $\dfrac34-\dfrac14-\dfrac16=\dfrac{9-3-2}{12}=\dfrac13$ ✓）

**美しさ:** 無数に見える項が端の4つだけに収まる。望遠鏡が折りたたまれるように中間が消える構造が「テレスコーピング」の名の由来。`,
      },
    ],
  },

  // ── D-2 ──────────────────────────────────────────────────
  {
    slug: "ep3-probability-state-recurrence",
    title: "状態遷移の漸化式",
    unit: "数列",
    difficulty: "D",
    tagline: "マルコフ連鎖を漸化式に落とし込む",
    hasGraph: false,
    tags: ["確率漸化式", "マルコフ連鎖", "等比数列"],
    university: "標準類題（オリジナル）",
    deviation: 65,
    year: 2024,
    backgroundTag: "確率漸化式",
    statement: r`2つの状態 $\mathrm{A}$, $\mathrm{B}$ があり、1ステップごとに次の確率で遷移する。
$$\mathrm{A}\to\mathrm{A}:\tfrac{2}{3},\quad \mathrm{A}\to\mathrm{B}:\tfrac{1}{3},\quad \mathrm{B}\to\mathrm{A}:\tfrac{1}{2},\quad \mathrm{B}\to\mathrm{B}:\tfrac{1}{2}.$$
最初に状態 $\mathrm{A}$ にいるとき、$n$ ステップ後に $\mathrm{A}$ にいる確率 $p_n$ を求めよ（$p_1=\tfrac{2}{3}$）。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 「直前の状態」で場合分け",
        body: r`$n$ ステップ後に A にいる経路は「$n-1$ ステップ後に A→A 遷移」または「$n-1$ ステップ後に B→A 遷移」の 2 通り。前者の確率は $\dfrac{2}{3}p_{n-1}$、後者は $\dfrac{1}{2}(1-p_{n-1})$。これを足すと $p_n$ の漸化式が得られる。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 「不動点」への収束を発見する",
        body: r`漸化式 $p_n = \alpha p_{n-1}+\beta$ の形は、不動点 $p^*=\alpha p^*+\beta$ を求めることで等比数列に帰着する。不動点は「十分な時間が経ったとき確率が落ち着く値」（定常分布）に等しく、マルコフ連鎖の長時間挙動を表す。計算技術だけでなく、確率の収束という現象を体感する問題。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 漸化式を整理して不動点へ",
        body: r`$p_n=\dfrac{2}{3}p_{n-1}+\dfrac{1}{2}(1-p_{n-1})=\dfrac{1}{6}p_{n-1}+\dfrac{1}{2}$。不動点 $p^*=\dfrac{1}{6}p^*+\dfrac{1}{2}$ を解いて、$p_n-p^*=\dfrac{1}{6}(p_{n-1}-p^*)$ の等比数列の形にする。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$n$ ステップ後に B にいる確率は $1-p_n$ なので
$$p_n = \frac{2}{3}p_{n-1}+\frac{1}{2}(1-p_{n-1}) = \frac{1}{6}p_{n-1}+\frac{1}{2}.\tag{$\star$}$$
不動点 $p^*$ は $p^*=\dfrac{1}{6}p^*+\dfrac{1}{2}$ を解いて $p^*=\dfrac{3}{5}$。

$(\star)$ から $p^*=\dfrac35$ を引くと
$$p_n-\frac{3}{5}=\frac{1}{6}\!\left(p_{n-1}-\frac{3}{5}\right).$$
初期値 $p_1=\dfrac{2}{3}$ より $p_1-\dfrac{3}{5}=\dfrac{1}{15}$。等比数列なので
$$p_n-\frac{3}{5}=\frac{1}{15}\cdot\left(\frac{1}{6}\right)^{n-1},$$
$$\therefore\; p_n = \frac{3}{5}+\frac{1}{15}\cdot\left(\frac{1}{6}\right)^{n-1}.$$

**美しさ:** $n\to\infty$ で $p_n\to\dfrac35$。どんな初期状態からスタートしても同じ値に収束する——これが定常分布の普遍性。遷移確率が $3:2$ の比で定まることとも綺麗に対応している。`,
      },
    ],
  },

  // ── D+ ──────────────────────────────────────────────────
  {
    slug: "ep3-induction-2n-geq-n2",
    title: "数学的帰納法による指数と多項式の不等式",
    unit: "数列",
    difficulty: "D_PLUS",
    tagline: "n≥4 では指数関数が二乗を追い越し、二度と逆転しない",
    hasGraph: false,
    tags: ["数学的帰納法", "指数と多項式", "不等式の証明"],
    university: "標準類題（オリジナル）",
    deviation: 70,
    year: 2024,
    backgroundTag: "数学的帰納法",
    statement: r`$n\ge4$ のとき $2^n\ge n^2$ が成り立つことを数学的帰納法で証明せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 帰納の仮定から (k+1)² を評価する",
        body: r`帰納法の流れ：「$k\ge4$ で $2^k\ge k^2$ と仮定し、$2^{k+1}\ge(k+1)^2$ を示す」。$2^{k+1}=2\cdot2^k\ge2k^2$（帰納仮定を利用）なので、あとは $2k^2\ge(k+1)^2=k^2+2k+1$ を示せばよい。これは $k^2-2k-1\ge0$、すなわち $(k-1)^2\ge2$ に相当し、$k\ge4$ で成立する。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 「なぜ n≥4 か」を見抜く",
        body: r`$n=1,2,3$ では $2^n < n^2$（例：$2^3=8 < 9=3^2$）が成り立たない。$n=4$ が等号（$16=16$）になる「臨界点」。帰納法では「基底（$n=4$）での等号」と「推移（$k\ge4$ で $k^2-2k-1\ge0$）の根拠」を両方明示する必要がある。条件 $n\ge4$ の**理由**まで理解させることがこの問題の目的。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — $2k^2 \geq (k+1)^2$ をどう示すか",
        body: r`$2k^2-(k+1)^2=k^2-2k-1=(k-1)^2-2$ と変形すると、$k\ge4$ のとき $(k-1)^2\ge9>2$ が確認できる。よって $2k^2\ge(k+1)^2$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**[I] 基底** $n=4$：$2^4=16=4^2$。$\ge$ が成立。✓

**[II] 帰納段階** $k\ge4$ で $2^k\ge k^2$ と仮定する。

$$2^{k+1}=2\cdot2^k\ge 2k^2\qquad(\text{帰納仮定}).$$

$2k^2-(k+1)^2=k^2-2k-1=(k-1)^2-2$ であり、$k\ge4$ より $(k-1)^2\ge9>2$。よって

$$2k^2\ge(k+1)^2.$$

以上より

$$2^{k+1}\ge2k^2\ge(k+1)^2.$$

$n=k+1$ でも $2^n\ge n^2$ が成り立つ。$\blacksquare$

**美しさ:** $n=3$ では $8<9$ で不等号が逆。$n=4$ が「等号の臨界点」で、以降は指数が二乗を永遠に追い越す。$(k-1)^2\ge2$ という一見無関係な不等式が、連鎖の安全確認として機能している。`,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 【空間ベクトル】3問（C×1 / D×2）
  // ══════════════════════════════════════════════════════════

  // ── C ─────────────────────────────────────────────────────
  {
    slug: "ep3-space-vector-projection",
    title: "空間ベクトルの内積と射影分解",
    unit: "ベクトル",
    difficulty: "C",
    tagline: "射影 = (内積÷大きさ²)×ベクトル",
    hasGraph: false,
    tags: ["空間ベクトル", "内積", "射影", "ベクトルの分解"],
    university: "標準類題（オリジナル）",
    deviation: 60,
    year: 2024,
    backgroundTag: "ベクトルの射影",
    statement: r`空間ベクトル $\vec{a}=(1,1,1),\; \vec{b}=(2,-1,1)$ について、次を求めよ。
(1) $\vec{a}$ と $\vec{b}$ のなす角 $\theta$（$0\le\theta\le\pi$）
(2) $\vec{b}$ を $\vec{a}$ 方向の成分 $\vec{b}_{\parallel}$ と $\vec{a}$ に直交する成分 $\vec{b}_{\perp}$ に分解せよ（$\vec{b}=\vec{b}_\parallel+\vec{b}_\perp$, $\vec{b}_\perp\perp\vec{a}$）。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 内積＝|a||b|cosθ が全ての根拠",
        body: r`内積 $\vec{a}\cdot\vec{b}=|\vec{a}||\vec{b}|\cos\theta$ から $\theta$ が決まる（成分で計算して絶対値で割る）。射影 $\vec{b}_\parallel$ は「$\vec{a}$ 方向の単位ベクトルへの $\vec{b}$ の射影」なので $\vec{b}_\parallel=\dfrac{\vec{a}\cdot\vec{b}}{|\vec{a}|^2}\vec{a}$。残りが $\vec{b}_\perp$。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 射影公式の定着",
        body: r`射影分解は力の分解・グラム・シュミット直交化・最小二乗法・フーリエ係数……すべての基礎になる。$\vec{b}_\parallel=\dfrac{\vec{a}\cdot\vec{b}}{|\vec{a}|^2}\vec{a}$ という公式の**意味**（内積を大きさの二乗で割る理由は、単位ベクトル $\hat{a}$ を $\vec{a}$ で書き直したため）を理解させる問題。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 内積と絶対値を計算",
        body: r`$\vec{a}\cdot\vec{b}=2+(-1)+1=2$。$|\vec{a}|=\sqrt{1+1+1}=\sqrt3$、$|\vec{b}|=\sqrt{4+1+1}=\sqrt6$。$\cos\theta=\dfrac{2}{\sqrt3\cdot\sqrt6}=\dfrac{2}{3\sqrt2}=\dfrac{\sqrt2}{3}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**(1)** $\vec{a}\cdot\vec{b}=2-1+1=2$、$|\vec{a}|=\sqrt3$、$|\vec{b}|=\sqrt6$。
$$\cos\theta=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}=\frac{2}{\sqrt{3}\cdot\sqrt{6}}=\frac{2}{3\sqrt{2}}=\frac{\sqrt{2}}{3}.$$
$0\le\theta\le\pi$ より $\theta=\arccos\dfrac{\sqrt2}{3}$.

**(2)** $\vec{b}_\parallel=\dfrac{\vec{a}\cdot\vec{b}}{|\vec{a}|^2}\vec{a}=\dfrac{2}{3}(1,1,1)=\!\left(\dfrac{2}{3},\dfrac{2}{3},\dfrac{2}{3}\right)$。
$$\vec{b}_\perp=\vec{b}-\vec{b}_\parallel=\left(2-\frac{2}{3},\,-1-\frac{2}{3},\,1-\frac{2}{3}\right)=\left(\frac{4}{3},-\frac{5}{3},\frac{1}{3}\right).$$
確認：$\vec{b}_\perp\cdot\vec{a}=\dfrac{4}{3}-\dfrac{5}{3}+\dfrac{1}{3}=0$（直交 ✓）、$\vec{b}_\parallel+\vec{b}_\perp=\vec{b}$（✓）。

**美しさ:** 任意のベクトルが「ある方向の成分」と「それと直交する成分」に一意に分解できる。これが内積の最も根本的な使い途。`,
      },
    ],
  },

  // ── D-1 ──────────────────────────────────────────────────
  {
    slug: "ep3-tetrahedron-volume-triple",
    title: "四面体の体積とスカラー三重積",
    unit: "ベクトル",
    difficulty: "D",
    tagline: "3辺のベクトルが張る平行六面体の1/6",
    hasGraph: false,
    tags: ["空間ベクトル", "四面体の体積", "スカラー三重積", "行列式"],
    university: "標準類題（オリジナル）",
    deviation: 65,
    year: 2024,
    backgroundTag: "四面体の体積",
    statement: r`座標空間に 4 点 $\mathrm{O}(0,0,0)$, $\mathrm{A}(2,1,0)$, $\mathrm{B}(0,2,1)$, $\mathrm{C}(1,0,2)$ をとる。四面体 $\mathrm{O}$-$\mathrm{ABC}$ の体積 $V$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 平行六面体の1/6",
        body: r`$\vec{a}=\overrightarrow{\mathrm{OA}},\vec{b}=\overrightarrow{\mathrm{OB}},\vec{c}=\overrightarrow{\mathrm{OC}}$ が張る**平行六面体**の体積は $|\vec{a}\cdot(\vec{b}\times\vec{c})|$（スカラー三重積の絶対値）に等しく、四面体はその $\dfrac{1}{6}$。スカラー三重積は $3\times3$ 行列式で計算できる。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 体積を行列式に帰着させる",
        body: r`3次元の体積計算を「3つのベクトルが作る平行六面体→その1/6が四面体」という図形的な理解と、「行列式でスカラー三重積を計算する」という代数的な計算手順の両方を結びつける問題。行列式の「符号付き体積」としての意味を体感できる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 3×3 行列式を展開",
        body: r`$V=\dfrac{1}{6}\!\left|\,\det\begin{pmatrix}2&1&0\\0&2&1\\1&0&2\end{pmatrix}\right|$。第1行で展開：$2(2\cdot2-1\cdot0)-1(0\cdot2-1\cdot1)+0(\cdots)$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\vec{a}=(2,1,0),\;\vec{b}=(0,2,1),\;\vec{c}=(1,0,2)$。

スカラー三重積（行列式）を第1行で展開：
$$\det\begin{pmatrix}2&1&0\\0&2&1\\1&0&2\end{pmatrix} = 2\det\begin{pmatrix}2&1\\0&2\end{pmatrix} - 1\det\begin{pmatrix}0&1\\1&2\end{pmatrix}+0$$
$$= 2(4-0)-1(0-1) = 8+1 = 9.$$

よって平行六面体の体積は $|9|=9$、四面体の体積は
$$V = \frac{1}{6}\times9=\frac{3}{2}.$$

**美しさ:** 3辺のベクトルを並べた行列式が、立体の体積を代数的に捉える。正負の行列式は「向き付き体積」（右手系か左手系か）を表す。`,
      },
    ],
  },

  // ── D-2 ──────────────────────────────────────────────────
  {
    slug: "ep3-point-plane-distance",
    title: "法線ベクトルで点と平面の距離を求める",
    unit: "ベクトル",
    difficulty: "D",
    tagline: "平面の法線 n を知れば、距離は内積で出る",
    hasGraph: false,
    tags: ["空間ベクトル", "平面の方程式", "点と平面の距離", "法線ベクトル"],
    university: "標準類題（オリジナル）",
    deviation: 65,
    year: 2024,
    backgroundTag: "平面の方程式と距離",
    statement: r`3点 $\mathrm{A}(1,0,0)$, $\mathrm{B}(0,1,0)$, $\mathrm{C}(0,0,1)$ を含む平面の方程式を求め、点 $\mathrm{P}(2,3,4)$ からこの平面までの距離を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 切片形から法線ベクトルを読む",
        body: r`3点が座標軸上（切片が明確）なので平面は $\dfrac{x}{1}+\dfrac{y}{1}+\dfrac{z}{1}=1$、すなわち $x+y+z=1$。この形からすぐに法線ベクトル $\vec{n}=(1,1,1)$ が読める。点 P から平面への距離は P の座標を $x+y+z-1$ に代入した絶対値を $|\vec{n}|$ で割ったもの。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 平面と距離の公式を導出で理解する",
        body: r`距離公式 $d=\dfrac{|ax_0+by_0+cz_0+d|}{\sqrt{a^2+b^2+c^2}}$ を暗記するのではなく、「法線方向への射影」として導出できるかを問う。$\vec{AP}$ を法線方向に射影した長さが距離になる構造を理解することで、2次元の点と直線の距離公式も同じ原理であることが分かる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 距離の公式",
        body: r`平面 $ax+by+cz+d=0$ と点 $(x_0,y_0,z_0)$ の距離は $\dfrac{|ax_0+by_0+cz_0+d|}{\sqrt{a^2+b^2+c^2}}$。ここでは $a=b=c=1$, $d=-1$, $(x_0,y_0,z_0)=(2,3,4)$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`3点 A$(1,0,0)$, B$(0,1,0)$, C$(0,0,1)$ はそれぞれ $x$, $y$, $z$ 軸の切片 $1$ の点なので、平面の方程式は
$$x+y+z=1\quad\text{（すなわち }x+y+z-1=0\text{）}.$$
点 P$(2,3,4)$ とこの平面との距離：
$$d=\frac{|2+3+4-1|}{\sqrt{1^2+1^2+1^2}}=\frac{|8|}{\sqrt3}=\frac{8}{\sqrt3}=\frac{8\sqrt3}{3}.$$

**美しさ:** 法線ベクトルが $(1,1,1)$ という対称な形を持つため、計算が非常に整然としている。$x=y=z=t$ の直線（体対角線）が法線であることも幾何的に美しい。`,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 【微分法】2問（D×1 / D+×1）
  // ══════════════════════════════════════════════════════════

  // ── D ─────────────────────────────────────────────────────
  {
    slug: "ep3-cubic-horizontal-line-count",
    title: "y = x³ − 3x と水平線の交点の個数",
    unit: "微分法",
    difficulty: "D",
    tagline: "極値の間に水平線が入ると、解が3つに増える",
    hasGraph: false,
    tags: ["3次関数", "方程式の実数解の個数", "極値"],
    university: "標準類題（オリジナル）",
    deviation: 65,
    year: 2024,
    backgroundTag: "解の個数と極値",
    statement: r`$f(x)=x^3-3x$ のグラフを考える。方程式 $f(x)=k$ が持つ異なる実数解の個数を、$k$ の値によって場合分けして求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — グラフと水平線 y = k の交点を数える",
        body: r`$f(x)=k$ の実数解の個数は、$y=f(x)$ のグラフと直線 $y=k$ の交点の個数に等しい。まず $f$ の極大・極小を求めてグラフの山と谷の高さを確認し、水平線が山の上・山と谷の間・谷の下のどこを通るかで交点の個数が変わる。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 「方程式の解の個数」を幾何化する",
        body: r`代数的な方程式を「グラフと直線の交点」として幾何化することで、抽象的な「解の個数」が具体的な「交点の個数」に変換される。$q(q-p^3)<0$ のような記号的な条件（3次曲線の一般形）よりも、まず $y=x^3-3x$ という具体的な場合で感覚を掴む。この問題は極値の**符号の組合せ**が全てを決めるという法則を学ぶための典型題。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — f'(x) を求めて極値を特定",
        body: r`$f'(x)=3x^2-3=3(x-1)(x+1)$。$x=-1$ で極大、$x=1$ で極小。$f(-1)=$ ?、$f(1)=$ ? を計算して、グラフの概形を描く。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$f'(x)=3x^2-3=3(x+1)(x-1)$より増減表：

| $x$ | $\cdots$ | $-1$ | $\cdots$ | $1$ | $\cdots$ |
|---|---|---|---|---|---|
| $f'$ | $+$ | $0$ | $-$ | $0$ | $+$ |
| $f$ | $\nearrow$ | 極大 $2$ | $\searrow$ | 極小 $-2$ | $\nearrow$ |

$f(-1)=-1+3=2$（極大）、$f(1)=1-3=-2$（極小）。

$y=k$ との交点の個数：
- $k>2$ または $k<-2$ のとき … **1個**
- $k=2$ または $k=-2$ のとき … **2個**（重解を含む）
- $-2<k<2$ のとき … **3個**

**美しさ:** 極大値と極小値の「間」に水平線が入るとき、だけ3個になる。极値の間に挟まれた $k$ の範囲の幅（$=4$）が解の個数の切り替えを完全に決定する。`,
      },
    ],
  },

  // ── D+ ──────────────────────────────────────────────────
  {
    slug: "ep3-sinx-inequality-iterated",
    title: "反復微分で不等式 x − x³/6 < sin x < x を証明する",
    unit: "微分法",
    difficulty: "D_PLUS",
    tagline: "微分を3回積み上げると、見えなかった不等式が見える",
    hasGraph: false,
    tags: ["不等式の証明", "微分法", "関数の単調性", "sinの近似"],
    university: "標準類題（オリジナル）",
    deviation: 70,
    year: 2024,
    backgroundTag: "微分による不等式証明",
    statement: r`$x>0$ のとき、次の不等式を順に証明せよ。
(1) $\sin x < x$
(2) $x-\dfrac{x^3}{6} < \sin x$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 差の関数の単調性を積み重ねる",
        body: r`直接比較できない関数の大小は、「差をとって単調性（正負）を調べる」手法が有効。(1) は $g(x)=x-\sin x$ が $x>0$ で正、(2) は $h(x)=\sin x - x + x^3/6$ が $x>0$ で正を示す。(2) の証明では (1) の結果が中間ステップとして使われるため、**反復微分**（$h$ の導関数の導関数の……）が必要になる。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 証明の積み上げ構造を体感する",
        body: r`(1) の結果を使って (2) を証明する「積み上げ型の論証」は、数学全体で最も重要な思考パターンの一つ。また、この2つの不等式は $\sin x$ の**テイラー展開**による近似精度の保証（$x-x^3/6$ は $\sin x$ の3次近似）の証明そのものであり、数学III・工学系・数値解析への橋渡しになる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — h の3階微分から逆に下ろす",
        body: r`$h(x)=\sin x-x+\dfrac{x^3}{6}$ について $h'(x)=\cos x-1+\dfrac{x^2}{2}$、$h''(x)=-\sin x+x$。(1) の結果から $h''(x)>0\,(x>0)$、$h'(0)=0$ → $h'(x)>0\,(x>0)$、$h(0)=0$ → $h(x)>0\,(x>0)$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**(1)** $g(x)=x-\sin x$ とおく。$g'(x)=1-\cos x\ge0$ で、$g'(x)=0$ となる $x$ は孤立点（$x=2k\pi$）のみ。$g(0)=0$ かつ $g$ は非減少で $x>0$ では真に増加するため $g(x)>0$。よって $\sin x < x$。

**(2)** $h(x)=\sin x-x+\dfrac{x^3}{6}$ とおく。
- $h''(x)=-\sin x+x=x-\sin x\overset{(1)}{>}0\quad(x>0)$.
- $h'(0)=\cos0-1+0=0$ かつ $h'$ は $x>0$ で増加（$h''>0$）なので $h'(x)>0\,(x>0)$.
- $h(0)=0$ かつ $h$ は $x>0$ で増加（$h'>0$）なので $h(x)>0\,(x>0)$.

よって $\sin x > x-\dfrac{x^3}{6}$。$\blacksquare$

**美しさ:** (1) が (2) の証明の中で「$h''>0$」の根拠として活躍する。このように前の結果が次の証明の歯車になる「積み上げ構造」が、高校数学の不等式証明の最も洗練された形。`,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 【積分法】2問（C×1 / D×1）
  // ══════════════════════════════════════════════════════════

  // ── C ─────────────────────────────────────────────────────
  {
    slug: "ep3-area-two-parabolas-formula",
    title: "2放物線が囲む面積と1/6公式",
    unit: "積分法",
    difficulty: "C",
    tagline: "|a|/6×(β−α)³ が面積を一撃で出す",
    hasGraph: false,
    tags: ["放物線の面積", "1/6公式", "2曲線間の面積"],
    university: "標準類題（オリジナル）",
    deviation: 60,
    year: 2024,
    backgroundTag: "1/6公式の応用",
    statement: r`放物線 $y=x^2-2x$ と $y=-x^2+4$ で囲まれた図形の面積 $S$ を求めよ。また，その計算で使った $\dfrac{1}{6}$ 公式（$S=\dfrac{|a|}{6}(\beta-\alpha)^3$）が成り立つ理由を簡潔に説明せよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 差の2次式を1/6公式に帰着",
        body: r`2曲線の差 $(-x^2+4)-(x^2-2x)=-2x^2+2x+4$ は $x$ についての2次式。交点（$\alpha,\beta$）を求め、差の2次式が $a(x-\alpha)(x-\beta)$ の形になることを確認すると、$\displaystyle\int_\alpha^\beta a(x-\alpha)(x-\beta)\,dx = \dfrac{a(\beta-\alpha)^3}{6}$ が面積を直接与える。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 公式を導出まで含めて理解する",
        body: r`$1/6$ 公式は丸暗記が横行しやすいが、「なぜ $1/6$ なのか」は次数積分の計算から直接出てくる。$\displaystyle\int_\alpha^\beta (x-\alpha)(x-\beta)\,dx = \int_0^{\beta-\alpha} t(t-(\beta-\alpha))\,dt$ と置換すれば、$-\dfrac{(\beta-\alpha)^3}{6}$ が出る仕組みを理解することで、この公式を忘れても自力で再導出できる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 交点を求めてから差を因数分解",
        body: r`$x^2-2x=-x^2+4 \Rightarrow 2x^2-2x-4=0 \Rightarrow x^2-x-2=0 \Rightarrow (x+1)(x-2)=0$。差は $-2(x+1)(x-2)$。$1/6$ 公式：$S=\dfrac{|-2|}{6}\{2-(-1)\}^3=\dfrac{2}{6}\cdot27$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**交点：** $x^2-2x=-x^2+4 \Rightarrow 2x^2-2x-4=0 \Rightarrow (x+1)(x-2)=0$。
交点 $x=-1,\;x=2$。

**差の関数：**
$$(-x^2+4)-(x^2-2x) = -2x^2+2x+4 = -2(x^2-x-2) = -2(x+1)(x-2).$$

**1/6 公式の適用：**
$$S=\int_{-1}^{2}-2(x+1)(x-2)\,dx = \frac{|-2|}{6}(2-(-1))^3=\frac{2}{6}\cdot27=\boxed{9}.$$

**1/6 公式の根拠：** $t=x-\alpha$（$\alpha=-1$）と置換すると
$$\int_\alpha^\beta a(x-\alpha)(x-\beta)\,dx = a\int_0^{\beta-\alpha}t(t-(\beta-\alpha))\,dt.$$
$L=\beta-\alpha$ とおき計算すると $=a\!\left[\dfrac{t^3}{3}-\dfrac{Lt^2}{2}\right]_0^L = a\!\left(\dfrac{L^3}{3}-\dfrac{L^3}{2}\right)=-\dfrac{aL^3}{6}$。
面積は $|{-aL^3/6}|=\dfrac{|a|}{6}(\beta-\alpha)^3$。✓`,
      },
    ],
  },

  // ── D ─────────────────────────────────────────────────────
  {
    slug: "ep3-integral-bound-squeeze",
    title: "はさみうちで定積分の極限を求める",
    unit: "積分法",
    difficulty: "D",
    tagline: "積分の上下評価から、極限が0と確定する",
    hasGraph: false,
    tags: ["定積分の評価", "はさみうち", "積分の不等式"],
    university: "標準類題（オリジナル）",
    deviation: 65,
    year: 2024,
    backgroundTag: "積分の不等式評価",
    statement: r`$n$ を正の整数とし、$\displaystyle I_n=\int_0^1\frac{x^n}{1+x}\,dx$ とおく。
(1) $\dfrac{1}{2(n+1)}\le I_n\le\dfrac{1}{n+1}$ を証明せよ。
(2) $\displaystyle\lim_{n\to\infty}I_n$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 分母の範囲を評価して積分に持ち込む",
        body: r`$0\le x\le1$ では $1\le 1+x\le2$ だから、逆数を取ると $\dfrac{1}{2}\le\dfrac{1}{1+x}\le1$。両辺に $x^n\ge0$ を掛けて積分すれば $I_n$ の上下界が $\displaystyle\int_0^1 x^n\,dx=\dfrac{1}{n+1}$ で決まる。上下から押さえられた不等式とはさみうちの原理が組み合わさる。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 「積分の不等式」の汎用技術",
        body: r`$f(x)\le g(x)$ なら $\int f\le\int g$ という「積分の単調性」は、理論的な上下評価（bound）の基礎。この技術は数値解析での誤差評価、確率論での期待値の評価など至るところで使われる。また $I_n\to0$ という結論は「$0^n/2\to0$ の速さ」を定量化しており、積分の漸近挙動への入門にもなる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — x∈[0,1] での 1/(1+x) の範囲",
        body: r`$0\le x\le1$ で $1+x\in[1,2]$。よって $\dfrac12\le\dfrac1{1+x}\le1$。各辺に $x^n$ を掛けて $[0,1]$ で積分すると $\dfrac12\cdot\dfrac{1}{n+1}\le I_n\le\dfrac{1}{n+1}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**(1)** $0\le x\le1$ では $1\le1+x\le2$、逆数を取ると $\dfrac{1}{2}\le\dfrac{1}{1+x}\le1$。各辺に $x^n\ge0$ を掛けると $\dfrac{x^n}{2}\le\dfrac{x^n}{1+x}\le x^n$。$[0,1]$ で積分して
$$\int_0^1\frac{x^n}{2}\,dx\le I_n\le\int_0^1 x^n\,dx,\quad\text{すなわち}\quad\frac{1}{2(n+1)}\le I_n\le\frac{1}{n+1}.\quad\blacksquare$$

**(2)** $n\to\infty$ のとき $\dfrac{1}{2(n+1)}\to0$ かつ $\dfrac{1}{n+1}\to0$。はさみうちの原理より
$$\lim_{n\to\infty}I_n=0.$$

**美しさ:** 分母の $1+x$ というわずかな複雑さが、直接積分を阻む。しかし分母の「どの範囲にあるか」を評価するだけで、極限が決まる。不等式による「挟み込み」が精密な計算の代わりになる例。`,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 【確率】3問（C×2 / D×1）
  // ══════════════════════════════════════════════════════════

  // ── C-1 ──────────────────────────────────────────────────
  {
    slug: "ep3-binomial-repeated-trials",
    title: "反復試行と二項確率",
    unit: "場合の数と確率",
    difficulty: "C",
    tagline: "ₙCₖ × p^k × (1-p)^(n-k) の構造を読む",
    hasGraph: false,
    tags: ["反復試行", "二項分布", "組み合わせ"],
    university: "標準類題（オリジナル）",
    deviation: 60,
    year: 2024,
    backgroundTag: "二項確率",
    statement: r`表が出る確率が $\dfrac{1}{2}$ のコインを10回投げる。
(1) ちょうど3回表が出る確率を求めよ。
(2) 少なくとも8回表が出る確率を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 二項確率の公式構造",
        body: r`$n$ 回の反復試行で事象が $k$ 回起きる確率は $P(X=k)=\dbinom{n}{k}p^k(1-p)^{n-k}$。この式の意味：$\dbinom{n}{k}$ 通りの「$k$ 回成功の順序の組み合わせ」それぞれが確率 $p^k(1-p)^{n-k}$ なので全部足す。(2) は余事象ではなく3項の直接和の方が速い。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 二項確率の「読む」訓練",
        body: r`二項確率で重要なのは公式の「暗記」ではなく、$\dbinom{n}{k}$ が「$k$ 回成功する位置の選び方」を、$p^k(1-p)^{n-k}$ が「その特定の並びの確率」を表すという**構造的理解**。(2) は「余事象」と「直接和」のどちらが楽かを自ら判断する練習でもある。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — n=10, p=1/2 を公式に代入",
        body: r`各確率は $\dfrac{1}{2^{10}}=\dfrac{1}{1024}$ を基準に考える。$\dbinom{10}{3}=120$、$\dbinom{10}{8}=\dbinom{10}{2}=45$、$\dbinom{10}{9}=10$、$\dbinom{10}{10}=1$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$n=10$, $p=\dfrac{1}{2}$。

**(1)** $P(X=3)=\dbinom{10}{3}\!\left(\dfrac{1}{2}\right)^{10}=\dfrac{120}{1024}=\dfrac{15}{128}$.

**(2)** $P(X\ge8)=P(X=8)+P(X=9)+P(X=10)$：
$$=\frac{\dbinom{10}{8}+\dbinom{10}{9}+\dbinom{10}{10}}{1024}=\frac{45+10+1}{1024}=\frac{56}{1024}=\frac{7}{128}.$$

（$\dbinom{10}{8}=\dbinom{10}{2}=45$ と対称性を利用するとミスが減る。）

**美しさ:** $\dbinom{10}{k}$ の対称性 $\dbinom{10}{k}=\dbinom{10}{10-k}$ が計算を省略してくれる。この対称性は「表10枚と裏10枚の入れ替え」という組み合わせの対称性に対応。`,
      },
    ],
  },

  // ── C-2 ──────────────────────────────────────────────────
  {
    slug: "ep3-bayes-disease-screening",
    title: "ベイズの定理と検査の落とし穴",
    unit: "場合の数と確率",
    difficulty: "C",
    tagline: "陽性でも患者でない確率が90%以上あり得る",
    hasGraph: false,
    tags: ["条件付き確率", "ベイズの定理", "全確率の公式"],
    university: "標準類題（オリジナル）",
    deviation: 60,
    year: 2024,
    backgroundTag: "ベイズの定理",
    statement: r`ある疾患の罹患率を全人口の $1\%$ とする。この疾患の検査は、患者に「陽性(+)」と出る確率が $95\%$、非患者に「陰性(−)」と出る確率が $90\%$ である。
(1) ランダムに選んだ1人が陽性と判定される確率を求めよ。
(2) 陽性と判定された人が**実際に患者**である確率を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 全確率の公式で P(+) を分解",
        body: r`陽性になる経路は「患者で陽性（真陽性）」か「非患者で陽性（偽陽性）」の2通り。全確率の公式 $P(+)=P(+|D)P(D)+P(+|\bar{D})P(\bar{D})$ で(1)が解け、ベイズの定理 $P(D|+)=\dfrac{P(+|D)P(D)}{P(+)}$ で(2)が解ける。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 直感に反する結果を数学で見抜く",
        body: r`「感度95%の検査で陽性→ほぼ患者？」と直感的に思いがちだが、罹患率が1%と低い場合、偽陽性の人数が真陽性を大きく上回る。この「基準率の誤謬（base rate fallacy）」は医療・司法・AIの誤判断の原因になる。数学的にベイズの定理を適用することで、直感との乖離を定量化できる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 分数を整理",
        body: r`$P(D)=0.01$、$P(+|D)=0.95$、$P(+|\bar{D})=1-0.90=0.10$（偽陽性率）、$P(\bar{D})=0.99$。$P(+)=0.95\times0.01+0.10\times0.99$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$D$: 患者、$+$: 陽性。$P(D)=0.01$、$P(+|D)=0.95$、$P(+|\bar{D})=0.10$。

**(1)** 全確率の公式：
$$P(+)=P(+|D)P(D)+P(+|\bar{D})P(\bar{D})=0.95\times0.01+0.10\times0.99=0.0095+0.099=0.1085.$$

**(2)** ベイズの定理：
$$P(D|+)=\frac{P(+|D)P(D)}{P(+)}=\frac{0.0095}{0.1085}=\frac{95}{1085}=\frac{19}{217}\approx8.76\%.$$

**美しさ（衝撃）:** 精度95%の検査で「陽性」と出ても、実際に患者である確率はわずか9%弱。これは「疾患が稀（1%）」という事前情報が、検査の感度に圧倒的に打ち勝つから。ベイズが教えるのは、結果の解釈に**事前確率**が不可欠であるという真実。`,
      },
    ],
  },

  // ── D ─────────────────────────────────────────────────────
  {
    slug: "ep3-geometric-dist-expectation",
    title: "幾何分布の期待値 — 漸化式と無限級数",
    unit: "場合の数と確率",
    difficulty: "D",
    tagline: "E = 1/p — 成功確率が小さいほど、長く待つ",
    hasGraph: false,
    tags: ["幾何分布", "期待値", "無限級数", "漸化式"],
    university: "標準類題（オリジナル）",
    deviation: 65,
    year: 2024,
    backgroundTag: "期待値と無限級数",
    statement: r`さいころを繰り返し投げ、初めて6の目が出るまでの投げ回数を $X$ とする。
(1) $P(X=n)$ を求めよ。
(2) 期待値 $E[X]=\displaystyle\sum_{n=1}^\infty nP(X=n)$ を、漸化式（再帰的期待値）の方法と無限級数の微分の方法の**2通り**で求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 「先払い1回」+「初期化」の再帰",
        body: r`$X$ は「$n-1$ 回外れ（確率 $5/6$ の失敗が $n-1$ 回）、$n$ 回目に成功（確率 $1/6$）」という構造を持つ。漸化式法では「1回投げた後」で場合分け：1回目で成功（$X=1$）か失敗（$X=1+X'$, $X'$ は同じ分布）。この**再帰**から $E[X]=6$ が出る。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 2つの計算法の「等価性」を体感する",
        body: r`漸化式法は「問題を再帰的に解く」アルゴリズム的な思考、無限級数の微分法は「$\sum r^n$ を微分すると $\sum nr^{n-1}$」という解析的な技巧。同じ答えが2つの異なる方法から出ることで、確率論と解析学の深い繋がりを体感できる。どちらの方法も、競技数学・統計学・コンピュータサイエンスで頻出。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 漸化式法の立式",
        body: r`$E=E[X]$ とおく。1回目の結果で場合分け：$E=\dfrac{1}{6}\cdot1+\dfrac{5}{6}\cdot(1+E)$。これを $E$ について解く。無限級数法：$\displaystyle\sum_{n=1}^\infty n\cdot\left(\frac56\right)^{n-1}\cdot\frac16 = \frac16\cdot\frac{1}{(1-5/6)^2}$（等比級数を微分して得られる公式を利用）。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**(1)** $n$ 回目で初めて6が出るには、最初の $n-1$ 回が6以外（確率 $5/6$）で $n$ 回目が6（確率 $1/6$）：
$$P(X=n)=\left(\frac{5}{6}\right)^{n-1}\!\cdot\frac{1}{6}\quad(n=1,2,3,\dots).$$

**(2a) 漸化式法：**
$E=E[X]$ とおく。1回目の結果で条件付き：
$$E=\frac{1}{6}\cdot1+\frac{5}{6}\cdot(1+E)=\frac{1}{6}+\frac{5}{6}+\frac{5}{6}E=1+\frac{5}{6}E.$$
$\dfrac{1}{6}E=1$ より $E=6$.

**(2b) 無限級数微分法：**
$q=5/6$ とおくと $E=\dfrac{1}{6}\displaystyle\sum_{n=1}^\infty nq^{n-1}$。$\displaystyle\sum_{n=0}^\infty q^n=\dfrac{1}{1-q}$ を $q$ で微分：$\displaystyle\sum_{n=1}^\infty nq^{n-1}=\dfrac{1}{(1-q)^2}$。よって
$$E=\frac{1}{6}\cdot\frac{1}{(1/6)^2}=\frac{1}{6}\cdot36=6.$$

**美しさ:** $E=1/p$ という完璧に対称な公式。「成功確率が $1/6$ なら平均6回待つ」という直感通りの答えが、2つの全く異なる計算経路からどちらも正確に出てくる。`,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // 【三角関数】2問（C×1 / D×1）
  // ══════════════════════════════════════════════════════════

  // ── C ─────────────────────────────────────────────────────
  {
    slug: "ep3-cos2theta-max-min-substitute",
    title: "cos 2θ + 2cos θ の最大・最小",
    unit: "三角関数",
    difficulty: "C",
    tagline: "t = cos θ と置けば、2次関数の山谷問題になる",
    hasGraph: false,
    tags: ["三角関数の最大最小", "置換", "2倍角公式"],
    university: "標準類題（オリジナル）",
    deviation: 60,
    year: 2024,
    backgroundTag: "三角関数の置換",
    statement: r`$0\le\theta\le\pi$ のとき、$f(\theta)=\cos2\theta+2\cos\theta$ の最大値・最小値を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 2倍角公式でt = cosθに統一",
        body: r`$\cos2\theta$ は $2\cos^2\theta-1$ と書き換えられる。$t=\cos\theta$ とおくと $f$ は $t$ の2次関数になる。$0\le\theta\le\pi$ では $\cos\theta\in[-1,1]$ なので、$t\in[-1,1]$ での2次関数の最大・最小問題に帰着する。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 多角度を単一変数に統合する訓練",
        body: r`三角関数の最大・最小の本質は「角度という無限次元の空間を、$\cos\theta$ や $\sin\theta$ という1変数に圧縮できるか」の判断力。$2\theta$ が出てくると直接扱えないが、2倍角公式で統一した瞬間に微積分不要の代数問題になる。この置換が「見える」かどうかが習熟度の分岐点。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — g(t) = 2t² + 2t − 1 の頂点",
        body: r`$g(t)=2t^2+2t-1$ の頂点は $t=-\dfrac{1}{2}$（$\in[-1,1]$ 内）。$g(-1),\,g(-1/2),\,g(1)$ を計算して大小を比べよ。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`2倍角公式 $\cos2\theta=2\cos^2\theta-1$ を使うと
$$f(\theta)=2\cos^2\!\theta-1+2\cos\theta.$$
$t=\cos\theta$ とおく。$0\le\theta\le\pi$ では $t\in[-1,1]$。
$$g(t)=2t^2+2t-1.$$
$g'(t)=4t+2=0 \Rightarrow t=-\dfrac{1}{2}$（区間内）。

| $t$ | $-1$ | $-\dfrac{1}{2}$ | $1$ |
|---|---|---|---|
| $g(t)$ | $-1$ | $-\dfrac{3}{2}$ | $3$ |

- **最大値** $3$：$g(1)=3$、$t=1$ すなわち $\cos\theta=1$、$\theta=0$ のとき。
- **最小値** $-\dfrac{3}{2}$：$g\!\left(-\dfrac12\right)=-\dfrac32$、$\cos\theta=-\dfrac12$、$\theta=\dfrac{2\pi}{3}$ のとき。

**美しさ:** $\cos2\theta$ という「2倍の角」が、置換一手で消える。三角関数の問題は「変数を減らす戦略」が核。`,
      },
    ],
  },

  // ── D ─────────────────────────────────────────────────────
  {
    slug: "ep3-sin-cos-sum-cube",
    title: "t = sinθ + cosθ の置換と3乗和",
    unit: "三角関数",
    difficulty: "D",
    tagline: "sin³θ + cos³θ を t で書き直せば、3次方程式が解ける",
    hasGraph: false,
    tags: ["三角関数", "対称式", "置換", "因数分解"],
    university: "標準類題（オリジナル）",
    deviation: 65,
    year: 2024,
    backgroundTag: "三角関数の対称式",
    statement: r`$0\le\theta<2\pi$ とし、$t=\sin\theta+\cos\theta$ とおく。
(1) $t$ の取り得る値の範囲を求めよ。
(2) $\sin\theta\cos\theta$ を $t$ で表せ。
(3) $f(\theta)=\sin^3\theta+\cos^3\theta$ を $t$ で表せ。さらに $f(\theta)=1$ を満たす $\theta$ をすべて求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — (sin+cos)² から積が出る",
        body: r`$t=\sin\theta+\cos\theta$ を二乗すると $t^2=\sin^2\theta+2\sin\theta\cos\theta+\cos^2\theta=1+2\sin\theta\cos\theta$。すなわち積 $\sin\theta\cos\theta=\dfrac{t^2-1}{2}$。3乗和の因数分解 $a^3+b^3=(a+b)(a^2-ab+b^2)$ に $a+b=t$, $ab=(t^2-1)/2$ を代入する。`,
      },
      {
        type: "GUIDANCE_ANALYSIS",
        order: 1,
        title: "出題者の意図 — 対称式の「基本変数」を作る",
        body: r`$\sin\theta$ と $\cos\theta$ を「$\sin+\cos$」と「$\sin\cdot\cos$」という2つの基本量で完全に記述できる。これは「2変数の対称多項式は基本対称式で表せる」という代数の定理の三角関数版。$t$ の1変数に落として3次方程式を因数分解するパターンは、難関大の三角関数融合問題の定石。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — a³ + b³ の因数分解",
        body: r`$\sin^3\theta+\cos^3\theta=(\sin\theta+\cos\theta)(\sin^2\theta-\sin\theta\cos\theta+\cos^2\theta)=t\!\left(1-\dfrac{t^2-1}{2}\right)=t\cdot\dfrac{3-t^2}{2}$。$f(\theta)=1$ は $t(3-t^2)=2$、$t^3-3t+2=0$ に帰着する。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**(1)** $t=\sqrt2\sin\!\left(\theta+\dfrac\pi4\right)$ より $t\in[-\sqrt2,\sqrt2]$.

**(2)** $t^2=1+2\sin\theta\cos\theta$ より $\sin\theta\cos\theta=\dfrac{t^2-1}{2}$.

**(3)** $\sin^3\theta+\cos^3\theta=(\sin\theta+\cos\theta)\bigl((\sin\theta+\cos\theta)^2-3\sin\theta\cos\theta\bigr)$
$=t\!\left(t^2-\dfrac{3(t^2-1)}{2}\right)$… とも取れるが、$a^3+b^3=(a+b)(a^2-ab+b^2)$ を直接使うと

$$f(\theta)=t\cdot\left(1-\frac{t^2-1}{2}\right)=\frac{t(3-t^2)}{2}.$$

$f(\theta)=1$ とおくと $t(3-t^2)=2$、$t^3-3t+2=0$。因数分解：
$$(t-1)^2(t+2)=0\implies t=1\;\text{または}\;t=-2.$$
$t\in[-\sqrt2,\sqrt2]$ より $t=-2$ は不適。

$t=1$：$\sqrt2\sin(\theta+\pi/4)=1$、$\sin(\theta+\pi/4)=\dfrac{1}{\sqrt2}$。
$\theta+\dfrac\pi4=\dfrac\pi4$ または $\dfrac{3\pi}{4}$ より $\theta=0$ または $\theta=\dfrac{\pi}{2}$.

（検算：$\sin^30+\cos^30=0+1=1$ ✓、$\sin^3\dfrac\pi2+\cos^3\dfrac\pi2=1+0=1$ ✓）

**美しさ:** 超越方程式 $\sin^3\theta+\cos^3\theta=1$ が $(t-1)^2(t+2)=0$ という3次方程式の因数分解に化ける。$t=1$ の重解が「$\theta=0$ と $\theta=\pi/2$ の2解（それぞれ一方が $0$）」という幾何的対称性に対応する。`,
      },
    ],
  },
];
