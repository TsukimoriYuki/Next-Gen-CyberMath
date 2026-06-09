import type { Problem } from "@/lib/types";

// 数学A「場合の数と確率」— 20 問。
// 計算主体の単元。図形が本質に効く「最短経路」「パスカルの三角形」だけにラボを付ける。
// 注: KaTeX の前置下付き {}_n は、テンプレート内で "$" の直後に "{" が来ると
// JS の ${...} 補間と誤認されるため、必ず "$ {}" のように空白を 1 つ挟む。
const r = String.raw;

export const countingProbability: Problem[] = [
  // ============================== A (5) ==============================
  {
    slug: "counting-product-rule",
    title: "積の法則",
    unit: "場合の数と確率",
    difficulty: "A",
    tagline: "それぞれの選び方を掛ける",
    hasGraph: false,
    statement: r`シャツが 3 種類、ズボンが 4 種類ある。シャツとズボンを 1 つずつ選ぶ組合せは何通りか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 積の法則",
        body: r`シャツの選び方それぞれに対して、ズボンの選び方が独立にある。「A の方法が $m$ 通り、続く B が $n$ 通り」なら全体は $m\times n$ 通り。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$3\times4$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`積の法則より $3\times4=12$ 通り。`,
      },
    ],
  },
  {
    slug: "permutation-basic",
    title: "順列 ₙPᵣ",
    unit: "場合の数と確率",
    difficulty: "A",
    tagline: "並べる＝順番が大事",
    hasGraph: false,
    statement: r`異なる 5 冊の本から 3 冊を選んで 1 列に並べる方法は何通りか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 順列",
        body: r`「選んで並べる」は順列 $ {}_n\mathrm{P}_r=n(n-1)\cdots(n-r+1)$。左から順に置ける本の数を掛ける。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$ {}_5\mathrm{P}_3=5\cdot4\cdot3$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$ {}_5\mathrm{P}_3=5\cdot4\cdot3=60$ 通り。`,
      },
    ],
  },
  {
    slug: "combination-basic",
    title: "組合せ ₙCᵣ",
    unit: "場合の数と確率",
    difficulty: "A",
    tagline: "選ぶだけ＝順番は無視",
    hasGraph: false,
    statement: r`8 人の中から 3 人の委員を選ぶ方法は何通りか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 組合せ",
        body: r`順番を区別しない選び方は組合せ $ {}_n\mathrm{C}_r=\dfrac{ {}_n\mathrm{P}_r}{r!}$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$ {}_8\mathrm{C}_3=\dfrac{8\cdot7\cdot6}{3\cdot2\cdot1}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$ {}_8\mathrm{C}_3=\dfrac{8\cdot7\cdot6}{3!}=\dfrac{336}{6}=56$ 通り。`,
      },
    ],
  },
  {
    slug: "prob-dice-sum",
    title: "さいころの目の和の確率",
    unit: "場合の数と確率",
    difficulty: "A",
    tagline: "(該当の場合) ÷ (全体)",
    hasGraph: false,
    statement: r`大小 2 個のさいころを同時に投げるとき、出た目の和が 7 になる確率を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 同様に確からしい",
        body: r`2 個のさいころの目は $6\times6=36$ 通りが同様に確からしい。和が 7 になる組を数える。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`和が 7：$(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$ の 6 通り。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`全 36 通り中、和が 7 は 6 通り。確率 $=\dfrac{6}{36}=\dfrac16$。`,
      },
    ],
  },
  {
    slug: "prob-complement-coin",
    title: "余事象：少なくとも 1 回",
    unit: "場合の数と確率",
    difficulty: "A",
    tagline: "「少なくとも」は裏返す",
    hasGraph: false,
    statement: r`硬貨を 3 回投げるとき、少なくとも 1 回は表が出る確率を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 余事象",
        body: r`「少なくとも 1 回表」の余事象は「1 回も表が出ない（全部裏）」。$1-(\text{全部裏の確率})$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`全部裏は $\left(\dfrac12\right)^3$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$1-\left(\dfrac12\right)^3=1-\dfrac18=\dfrac78$。`,
      },
    ],
  },
  {
    slug: "combinations-with-repetition",
    title: "方程式の非負整数解（重複組合せ）",
    unit: "場合の数と確率",
    difficulty: "C",
    tagline: "○ と ｜ の一対一対応",
    hasGraph: false,
    relatedLessonSlug: "stars-and-bars",
    statement: r`方程式 $x + y + z = 10$ を満たす負でない整数 $(x, y, z)$ の組は何通りあるか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — モノと仕切りに翻訳する",
        body: r`$10$ 個の「$1$」を $x,y,z$ の 3 つの箱に分けると考える。これは、$10$ 個の○と、箱を区切る $2$ つの仕切り（｜）を一列に並べる順列と一対一に対応する。たとえば ○○｜○○○○○○○｜○ は $(x,y,z)=(2,7,1)$ に対応。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 小さく数えて対応を確かめる",
        body: r`$x+y+z=2$ で試す。○ 2 個と｜2 個の並べ方は $\dfrac{4!}{2!2!}=6$ 通り。実際 $(2,0,0),(0,2,0),(0,0,2),(1,1,0),(1,0,1),(0,1,1)$ の 6 組と一致する。「○ と｜の並べ替え」が解になる仕組みを、手で確かめてから一般化する。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`合計 $12$ 個の場所から、仕切りを入れる $2$ 箇所を選ぶ組合せ：$ {}_{12}\mathrm{C}_2$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`負でない整数解の組の数は、$10$ 個の○と $2$ 個の｜（計 $12$ 個）の並べ方の総数に等しい。$12$ 箇所から｜を置く $2$ 箇所を選べばよいから
$$ {}_{10+3-1}\mathrm{C}_{3-1}= {}_{12}\mathrm{C}_2=\frac{12\cdot11}{2\cdot1}=66.$$
よって **66 通り**。

**メタ。** 「重複組合せ $ {}_n\mathrm{H}_r= {}_{n+r-1}\mathrm{C}_{r-1}$」の正体は、この○と｜（stars and bars）の対応。$x\ge1$ などの下限付き条件は、先に各変数へ $1$ ずつ配ってから残りを分配すれば、同じ枠組みに帰着できる——条件を“前払い”するのがコツ。`,
      },
    ],
  },
  // ============================== B (6) ==============================
  {
    slug: "permutation-adjacent",
    title: "隣り合う順列（ひとまとめ法）",
    unit: "場合の数と確率",
    difficulty: "B",
    tagline: "隣り合う 2 人を 1 つに束ねる",
    hasGraph: false,
    statement: r`6 人を 1 列に並べるとき、特定の 2 人 A, B が隣り合う並べ方は何通りか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — ひとまとめにする",
        body: r`A, B を 1 つの塊とみなすと、並べる対象は 5 個。塊の中で A, B の左右 2 通りを最後に掛ける。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$5!\times2$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`A, B を 1 組とみた 5 個の順列 $5!=120$。塊内で A, B の並びが 2 通り。
$120\times2=240$ 通り。`,
      },
    ],
  },
  {
    slug: "bayes-disease-test",
    title: "条件付き確率の直感のズレ（病気検査）",
    unit: "場合の数と確率",
    difficulty: "D",
    tagline: "99% 正確な検査が外れる理由",
    hasGraph: false,
    relatedLessonSlug: "false-positive-paradox",
    statement: r`1万人に1人が罹る病気がある。この病気を判定する検査は、病気の人を99%正しく「陽性」とし、健康な人を99%正しく「陰性」とする（1%で誤判定する）。ある人がこの検査で「陽性」となったとき、本当に病気である確率を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 偽陽性の圧倒的多数",
        body: r`直感では「$99\%$」と思いがちだが、健康な人が圧倒的に多いため、健康なのに陽性と出る「偽陽性」の人数が、本当の病気の「真陽性」の人数を上回る。確率を“割合”でこねるより、**実人数（自然頻度）**に直すと一気に見通せる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 有病率を動かして割合を見る",
        body: r`下のラボでスライダー「有病率 $p$」を動かすと、陽性者に占める真陽性（緑）と偽陽性（マゼンタ）の割合が変わる。検査精度を $99\%$ に固定しても、$p$ が小さいうちは偽陽性が大半を占め、$P(\text{病気}\mid\text{陽性})$ は低いまま。$p$ を上げると緑が増えていく——稀な病気ほど“陽性でも安心しにくい”構造が見える。

@@lab:bayes-frequency-bars@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$100$ 万人で考える。病気の人は $100$ 人、健康な人は $99$ 万 $9900$ 人。それぞれから陽性になる人数を出す。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**自然頻度（$100$ 万人）。** 病気 $100$ 人のうち陽性は $100\times0.99=99$ 人（真陽性）。健康 $999900$ 人のうち陽性は $999900\times0.01=9999$ 人（偽陽性）。陽性者は計 $99+9999=10098$ 人。本当に病気なのはそのうち $99$ 人だから
$$P(\text{病気}\mid\text{陽性})=\frac{99}{10098}\approx0.0098.$$

**確率（ベイズの定理）。** 病気を $D$、陽性を $P$ とする。
$$P(D)=0.0001,\quad P(\overline D)=0.9999,\quad P(P\mid D)=0.99,\quad P(P\mid\overline D)=0.01.$$
全陽性の確率は
$$P(P)=P(D)P(P\mid D)+P(\overline D)P(P\mid\overline D)=0.000099+0.009999=0.010098.$$
よって
$$P(D\mid P)=\frac{P(D)P(P\mid D)}{P(P)}=\frac{0.000099}{0.010098}\approx0.0098.$$
**約 $0.98\%$**。

**メタ。** $99\%$ 正確な検査でも陽性的中率が $1\%$ 弱になるのは、**事前確率（有病率）が極端に低い**から。これが「基準率の無視（base rate fallacy）」。$P(\text{陽性}\mid\text{病気})$ と $P(\text{病気}\mid\text{陽性})$ を混同しないこと——条件の向きを逆にしただけで答えは桁違いに変わる。実人数に直す（自然頻度）と誤解が消える。`,
      },
    ],
  },
  {
    slug: "permutation-same-objects",
    title: "同じものを含む順列",
    unit: "場合の数と確率",
    difficulty: "B",
    tagline: "重複を階乗で割る",
    hasGraph: false,
    statement: r`赤玉 3 個、白玉 2 個を 1 列に並べる方法は何通りか。（同じ色は区別しない）`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 区別をなくす",
        body: r`全部区別すれば $5!$ 通りだが、赤 3 個の入れ替え $3!$、白 2 個の入れ替え $2!$ は同じ並びを生む。これらで割る。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dfrac{5!}{3!\,2!}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\dfrac{5!}{3!\,2!}=\dfrac{120}{6\cdot2}=10$ 通り。`,
      },
    ],
  },
  {
    slug: "repeated-permutation",
    title: "重複順列",
    unit: "場合の数と確率",
    difficulty: "B",
    tagline: "毎回すべての選択肢が使える",
    hasGraph: false,
    statement: r`1, 2, 3 の数字を重複を許して使い、3 桁の整数を作る。何通りできるか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 各桁が独立",
        body: r`百・十・一の位それぞれに 1,2,3 の 3 通り。同じ数字を何度使ってもよいので積の法則で $3\times3\times3$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$3^3$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$3^3=27$ 通り。`,
      },
    ],
  },
  {
    slug: "combination-committee",
    title: "組合せの応用（男女から選ぶ）",
    unit: "場合の数と確率",
    difficulty: "B",
    tagline: "独立な選択を掛ける",
    hasGraph: false,
    statement: r`男子 5 人、女子 4 人から、男子 2 人と女子 2 人を選ぶ方法は何通りか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 別々に選んで掛ける",
        body: r`男子の選び方と女子の選び方は独立。それぞれの組合せを求めて積の法則。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$ {}_5\mathrm{C}_2\times {}_4\mathrm{C}_2$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$ {}_5\mathrm{C}_2\times {}_4\mathrm{C}_2=10\times6=60$ 通り。`,
      },
    ],
  },
  {
    slug: "prob-two-red-balls",
    title: "玉を取り出す確率（組合せ）",
    unit: "場合の数と確率",
    difficulty: "B",
    tagline: "場合の数の比で確率",
    hasGraph: false,
    statement: r`赤玉 4 個、白玉 3 個が入った袋から同時に 2 個取り出すとき、2 個とも赤玉である確率を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 取り出し方の総数",
        body: r`7 個から 2 個取る方法 $ {}_7\mathrm{C}_2$ が同様に確からしい。赤 4 個から 2 個取る $ {}_4\mathrm{C}_2$ を分子に。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\dfrac{ {}_4\mathrm{C}_2}{ {}_7\mathrm{C}_2}=\dfrac{6}{21}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`確率 $=\dfrac{ {}_4\mathrm{C}_2}{ {}_7\mathrm{C}_2}=\dfrac{6}{21}=\dfrac{2}{7}$。`,
      },
    ],
  },
  {
    slug: "prob-repeated-dice",
    title: "反復試行の確率",
    unit: "場合の数と確率",
    difficulty: "B",
    tagline: "どの回で起こるかを ₙCᵣ で",
    hasGraph: false,
    statement: r`1 個のさいころを 3 回投げるとき、1 の目がちょうど 1 回出る確率を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 反復試行",
        body: r`各回独立で「1 が出る」確率 $\dfrac16$、出ない確率 $\dfrac56$。3 回中どの 1 回で出るかを $ {}_3\mathrm{C}_1$ で数える。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$ {}_3\mathrm{C}_1\left(\dfrac16\right)^1\left(\dfrac56\right)^2$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$ {}_3\mathrm{C}_1\left(\dfrac16\right)\left(\dfrac56\right)^2=3\cdot\dfrac16\cdot\dfrac{25}{36}=\dfrac{75}{216}=\dfrac{25}{72}$。`,
      },
    ],
  },

  // ============================== C (5) ==============================
  {
    slug: "lattice-shortest-paths",
    title: "格子の最短経路の数",
    unit: "場合の数と確率",
    difficulty: "C",
    tagline: "右と上の並べ方に翻訳する",
    hasGraph: true,
    graphKey: "lattice-paths",
    statement: r`碁盤の目状の道がある。横に 4 区画、縦に 3 区画の格子で、左下の地点 S から右上の地点 G まで遠回りせずに（最短で）行く道順は何通りか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 移動の並べ方",
        body: r`最短経路は「右に 1 区画（R）」を 4 回、「上に 1 区画（U）」を 3 回、合計 7 回の移動からなる。経路を決めることは、$RRRRUUU$ の並べ方を決めることと同じ。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 格子の大きさと経路数",
        body: r`ラボで格子の横 $W$・縦 $H$ を変えると、最短経路数 $ {}_{W+H}\mathrm{C}_{H}$ が更新される。7 回の移動のうちどの回を「上」にするかを選ぶ、と捉えよう。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`7 回のうち上 U を入れる 3 回を選ぶ：$ {}_7\mathrm{C}_3$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`R を 4 個、U を 3 個並べる順列の総数に等しい：
$$\frac{7!}{4!\,3!}= {}_7\mathrm{C}_3=35.$$
よって最短経路は **35 通り**。

**メタ。** 最短経路は「右 R を $W$ 個・上 U を $H$ 個並べる、同じものを含む順列」$=\dfrac{(W+H)!}{W!\,H!}= {}_{W+H}\mathrm{C}_H$。途中の各交点の経路数を「左＋下」で足し上げると、碁盤の目の上にパスカルの三角形が浮かび上がる。通行止めがある問題は「全経路 − 禁止点を通る経路」で引き算するのが定石。`,
      },
    ],
  },
  {
    slug: "circular-permutation",
    title: "円順列",
    unit: "場合の数と確率",
    difficulty: "C",
    tagline: "回転の重複を除く＝(n−1)!",
    hasGraph: false,
    statement: r`6 人が円形のテーブルに座る。(1) 座り方は何通りか。(2) 特定の 2 人 A, B が隣り合う座り方は何通りか。（回転して同じになるものは同じとみなす）`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 回転の重複を 1 人固定で消す",
        body: r`円卓では回転して一致する並びを同じと数える。$n$ 人の通常の並べ方 $n!$ は、各並びを $n$ 通りの回転で重複して数えているので $n$ で割り、$\dfrac{n!}{n}=(n-1)!$。実務上は「1 人を基準席に固定して残り $n-1$ 人を並べる」と同じ。隣り合う条件は 2 人を 1 組に束ねる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — なぜ n で割るのか",
        body: r`$3$ 人 A,B,C で確かめる。直線なら $3!=6$ 通りだが、円では ABC・BCA・CAB は回転で同じ、ACB・CBA・BAC も同じ。$6\div3=2$ 通り $=(3-1)!$。回転 $n$ 通りごとに 1 つにまとまる、という重複の構造が見える。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`(1) $(6-1)!$。(2) A, B を 1 組にした 5 つの円順列 $(5-1)!$ に、組内 2 通りを掛ける。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**(1)** $(6-1)!=5!=120$ 通り。

**(2)** A, B を 1 組（隣り合う）とみると、並べる対象は「ABの組」と残り 4 人の計 5 個。これらの円順列は $(5-1)!=4!=24$。さらに組の中で A, B の左右が $2$ 通り。よって
$$24\times2=48\ \text{通り}.$$

**メタ。** 円順列 $(n-1)!$ は「対称性（回転 $n$ 通り）で割る」典型。じゅず順列（裏返しも同一視）ならさらに $2$ で割る。隣接条件は“ひとまとめ法”、離れる条件は“すきまに入れる法（先に他を並べ、間に挿す）”——回す・束ねる・挿す、の 3 手で円の問題はほぼ攻略できる。`,
      },
    ],
  },
  {
    slug: "combination-pascal-rule",
    title: "組合せの加法定理（パスカルの公式）",
    unit: "場合の数と確率",
    difficulty: "C",
    tagline: "特定の 1 人を含むか含まないか",
    hasGraph: true,
    graphKey: "pascal-triangle",
    statement: r`組合せについて、等式
$$ {}_n\mathrm{C}_r= {}_{n-1}\mathrm{C}_{r-1}+ {}_{n-1}\mathrm{C}_r$$
（パスカルの公式）が成り立つことを、数え上げの場合分けで説明せよ。さらにこの公式で $ {}_5\mathrm{C}_2$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 1 人に注目して二分する",
        body: r`$n$ 人から $r$ 人を選ぶとき、特定の 1 人 X に注目する。選ばれる組は「X を含む」か「X を含まない」かで排反に分かれる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — パスカルの三角形で確かめる",
        body: r`ラボで内部のマスを選ぶと、そのマス（緑）が真上の 2 つ（マゼンタ）の和になっている。これがまさに $ {}_n\mathrm{C}_r= {}_{n-1}\mathrm{C}_{r-1}+ {}_{n-1}\mathrm{C}_r$。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`X を含む選び方は残り $r-1$ 人を他 $n-1$ 人から：$ {}_{n-1}\mathrm{C}_{r-1}$。X を含まない選び方は $ {}_{n-1}\mathrm{C}_r$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$n$ 人から $r$ 人選ぶ方法 $ {}_n\mathrm{C}_r$ を、特定の 1 人 X で分類する。
- X を**含む**：残り $r-1$ 人を他の $n-1$ 人から選ぶ → $ {}_{n-1}\mathrm{C}_{r-1}$ 通り。
- X を**含まない**：$r$ 人を他の $n-1$ 人から選ぶ → $ {}_{n-1}\mathrm{C}_r$ 通り。

両者は排反で全体を尽くすから $ {}_n\mathrm{C}_r= {}_{n-1}\mathrm{C}_{r-1}+ {}_{n-1}\mathrm{C}_r$。
具体例：$ {}_5\mathrm{C}_2= {}_4\mathrm{C}_1+ {}_4\mathrm{C}_2=4+6=10$。

**メタ。** 「特定の 1 人を含むか/含まないか」で排反に二分するのは、数え上げの最強テク（場合分けの原型）。この漸化式がパスカルの三角形を生み、二項定理 $(1+x)^n$ の係数や格子の最短経路数の背骨になる。階乗の式 $\dfrac{n!}{r!(n-r)!}$ を通分しても示せるが、数え上げの説明のほうが“なぜ”を語る。`,
      },
    ],
  },
  {
    slug: "grouping-division",
    title: "組分けの数",
    unit: "場合の数と確率",
    difficulty: "C",
    tagline: "組に区別があるか、ないか",
    hasGraph: false,
    statement: r`9 人を 3 人ずつの 3 組に分ける。(1) A, B, C と名前のついた組に分ける方法、(2) 区別のない 3 組に分ける方法は、それぞれ何通りか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 区別のある組で数え、最後に割る",
        body: r`まず「A,B,C と名のついた（区別のある）組」へ順に選んで分ける。区別のない 3 組にするときは、同一の分け方が組の並べ替え $3!$ 通り分だけ重複して数えられているので、$3!$ で割る。ここで効くのは「3 組の大きさがすべて等しい（各 3 人）」という条件。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 重複の倍率を見極める",
        body: r`区別のある分け方 1 つ（例：組A={1,2,3}, 組B={4,5,6}, 組C={7,8,9}）は、ラベルを付け替えると $3!=6$ 通りの“名前違い”が同じ「区別なしの分け方」に対応する。だから $\div 3!$。もし組の大きさが違えば（例 4 人・3 人・2 人）入れ替えても別物になり、割らない——“等しい組だけ割る”が要。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`(1) $ {}_9\mathrm{C}_3\times {}_6\mathrm{C}_3\times {}_3\mathrm{C}_3$。(2) それを $3!$ で割る。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**(1) 区別のある 3 組。** 9 人から 3 人、残り 6 人から 3 人、最後の 3 人で
$$ {}_9\mathrm{C}_3\times {}_6\mathrm{C}_3\times {}_3\mathrm{C}_3=84\times20\times1=1680\ \text{通り}.$$
**(2) 区別のない 3 組。** 3 つの組がすべて同じ大きさなので、組の並べ替え $3!=6$ 通りが重複。
$$\frac{1680}{6}=280\ \text{通り}.$$

**メタ。** 組分けの肝は「組に区別があるか」と「同じ大きさの組がいくつあるか」。同サイズの組が $k$ 個あれば $k!$ で割る（一部だけ同サイズなら、その分だけ割る）。“区別のある状態で数えて、対称性で割る”という円順列と同じ発想がここでも働いている。`,
      },
    ],
  },
  {
    slug: "conditional-probability",
    title: "条件付き確率",
    unit: "場合の数と確率",
    difficulty: "C",
    tagline: "条件で世界を狭める",
    hasGraph: false,
    statement: r`当たり 3 本、はずれ 7 本のくじがある。A, B がこの順に 1 本ずつ引く（引いたくじは戻さない）。A が当たったとき、B も当たる条件付き確率を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 条件は「世界を狭める」",
        body: r`条件付き確率 $P(B\mid A)$ は「$A$ が起きた世界に限定したときの $B$ の割合」。本問では「A が当たった」で標本空間が縮み、残りは 9 本・当たり 2 本。この縮んだ世界で B の当たりを数えるだけ。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 定義式と直感が一致するか",
        body: r`定義 $P(B\mid A)=\dfrac{P(A\cap B)}{P(A)}$ で確かめる。$P(A\text{当})=\dfrac3{10}$、$P(A\text{当}\cap B\text{当})=\dfrac3{10}\cdot\dfrac29=\dfrac6{90}$。割ると $\dfrac{6/90}{3/10}=\dfrac6{90}\cdot\dfrac{10}{3}=\dfrac29$。「残り 9 本中 2 本」という直感と一致する。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`残り 9 本中当たり 2 本。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`A が当たった後、くじは $9$ 本・当たり $2$ 本。B も当たる条件付き確率は
$$P(B\mid A)=\frac{2}{9}.$$
定義式でも $P(B\mid A)=\dfrac{P(A\cap B)}{P(A)}=\dfrac{\frac3{10}\cdot\frac29}{\frac3{10}}=\dfrac29$ と一致する。

**メタ。** 「条件＝世界を狭める」と捉えれば、樹形図や定義式 $\dfrac{P(A\cap B)}{P(A)}$ が自然に腑に落ちる。乗法定理 $P(A\cap B)=P(A)P(B\mid A)$ はこれを変形しただけ。次のベイズ（原因の確率）は、この条件付き確率を“逆向き”に使う応用である。`,
      },
    ],
  },

  // ============================== D (3) ==============================
  {
    slug: "prob-repeated-binomial",
    title: "反復試行（復元抽出）",
    unit: "場合の数と確率",
    difficulty: "D",
    tagline: "戻すから毎回同じ確率",
    hasGraph: false,
    statement: r`赤玉 3 個、白玉 2 個が入った袋から玉を 1 個取り出して色を見て袋に戻す。この操作を 4 回繰り返すとき、赤玉がちょうど 2 回出る確率を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 復元だから毎回独立・同確率",
        body: r`玉を毎回戻すので各回は独立で、赤の確率は $\dfrac35$ に固定（非復元なら確率が変わる）。4 回中ちょうど 2 回が赤になる「どの 2 回か」の選び方を $ {}_4\mathrm{C}_2$ で数え、各並びの確率 $\left(\dfrac35\right)^2\left(\dfrac25\right)^2$ を掛ける——これが反復試行（二項分布）の型。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 1 つの並びの確率を確かめる",
        body: r`「赤赤白白」という特定の順の確率は、独立性から $\dfrac35\cdot\dfrac35\cdot\dfrac25\cdot\dfrac25=\left(\dfrac35\right)^2\left(\dfrac25\right)^2$。赤が 2 回・白が 2 回ならどの順でも同じ確率になる。違うのは“順番のパターン数”だけで、それが $ {}_4\mathrm{C}_2=6$ 通り。だから掛ける。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$ {}_4\mathrm{C}_2\left(\dfrac35\right)^2\left(\dfrac25\right)^2$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`赤がちょうど $2$ 回出る確率は、反復試行の公式より
$$ {}_4\mathrm{C}_2\left(\frac35\right)^2\left(\frac25\right)^2=6\cdot\frac{9}{25}\cdot\frac{4}{25}=\frac{216}{625}.$$

**メタ。** 反復試行 $ {}_n\mathrm{C}_k\,p^k(1-p)^{n-k}$ は「独立・同確率の $n$ 回中 $k$ 回成功」の二項分布そのもの。$ {}_n\mathrm{C}_k$（順番のパターン）と $p^k(1-p)^{n-k}$（1 パターンの確率）の積、という分解を押さえれば、非復元（超幾何）との違い——確率が一定か変動か——も自然に区別できる。`,
      },
    ],
  },
  {
    slug: "inclusion-exclusion",
    title: "包除原理",
    unit: "場合の数と確率",
    difficulty: "D",
    tagline: "足しすぎを引き戻す",
    hasGraph: false,
    statement: r`1 から 100 までの整数のうち、2 でも 3 でも 5 でも割り切れない数は何個あるか。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 余事象 ＋ 包除原理",
        body: r`「$2,3,5$ のどれでも割り切れない」個数は、$100$ から「$2$ か $3$ か $5$ で割り切れる個数」を引けば求まる。和集合の個数を素朴に $|A|+|B|+|C|$ とすると、$6$ の倍数などを二重・三重に数えてしまう。重なりを引き、引きすぎを足し戻すのが包除原理。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — なぜ足して引いて足すのか",
        body: r`$6$ の倍数は「$2$ の倍数」と「$3$ の倍数」の両方に数えられ $2$ 回カウントされるから $1$ 回分引く。$30$ の倍数は $|A|,|B|,|C|$ で $3$ 回足し、$|A\cap B|,|B\cap C|,|C\cap A|$ で $3$ 回引かれて $0$ 回になるので、最後に $1$ 回足し戻す。各要素がちょうど $1$ 回数えられるよう符号が決まる、と確かめる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|$。各 $|\cdot|$ は $\lfloor 100/d\rfloor$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$A,B,C$ をそれぞれ $2,3,5$ の倍数の集合とする。単独の倍数：
$$\lfloor100/2\rfloor=50,\quad \lfloor100/3\rfloor=33,\quad \lfloor100/5\rfloor=20.$$
共通部分（最小公倍数の倍数）：
$$\lfloor100/6\rfloor=16,\quad \lfloor100/10\rfloor=10,\quad \lfloor100/15\rfloor=6,\quad \lfloor100/30\rfloor=3.$$
包除原理より
$$|A\cup B\cup C|=50+33+20-16-10-6+3=74.$$
よって、どれでも割り切れない数は
$$100-74=26\ \text{個}.$$

**メタ。** 包除原理は「足しすぎ → 引き戻し → さらに補正」を交互符号で繰り返す万能の数え上げ。次の完全順列（モンモール数）も、この交互符号の和として現れる。「割り切れない＝余事象」と「重なりの補正」の二段構えが定石。`,
      },
    ],
  },
  {
    slug: "bayes-box",
    title: "原因の確率（ベイズの考え方）",
    unit: "場合の数と確率",
    difficulty: "D",
    tagline: "結果から原因を逆算する",
    hasGraph: false,
    statement: r`箱 A には赤玉 2 個・白玉 3 個、箱 B には赤玉 4 個・白玉 1 個が入っている。どちらかの箱を等確率で選び、その箱から玉を 1 個取り出したところ赤玉だった。選んだ箱が A であった確率を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 結果から原因を逆算する",
        body: r`観測「赤が出た」という**結果**から、「どちらの箱だったか」という**原因**の確率を求める＝ベイズ。$P(A\mid\text{赤})=\dfrac{P(A\cap\text{赤})}{P(\text{赤})}$ で、分母の $P(\text{赤})$ は A 経由・B 経由をすべて足した全確率（全確率の定理）。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 樹形図を実人数で描く",
        body: r`$10$ 回に分けて考える。箱を等確率で選ぶので A・B 各 $5$ 回。A から赤は $5\times\dfrac25=2$ 回、B から赤は $5\times\dfrac45=4$ 回。赤は計 $6$ 回で、そのうち A 由来は $2$ 回。だから「赤だったとき A」は $\dfrac26=\dfrac13$。割合で割る前に、実人数の樹形図で当たりをつける。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$P(\text{赤}\mid A)=\dfrac25,\ P(\text{赤}\mid B)=\dfrac45$。$P(\text{赤})=\dfrac12\cdot\dfrac25+\dfrac12\cdot\dfrac45$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`箱の選択は等確率 $P(A)=P(B)=\dfrac12$。各箱から赤の確率は $P(\text{赤}\mid A)=\dfrac25,\ P(\text{赤}\mid B)=\dfrac45$。

**乗法定理。** $P(A\cap\text{赤})=\dfrac12\cdot\dfrac25=\dfrac15$。

**全確率の定理。** $P(\text{赤})=\dfrac12\cdot\dfrac25+\dfrac12\cdot\dfrac45=\dfrac15+\dfrac25=\dfrac35$。

**ベイズ。**
$$P(A\mid\text{赤})=\frac{P(A\cap\text{赤})}{P(\text{赤})}=\frac{1/5}{3/5}=\frac13.$$

**メタ。** ベイズは「事前確率 $P(A)=\dfrac12$」を「赤が出た」という証拠で「事後確率 $\dfrac13$」へ更新する操作。赤を引きやすい B のほうが原因として疑わしくなり、A の確率は $\dfrac12\to\dfrac13$ に下がる。病気検査の問題と同じ枠組み——観測が原因の見込みを書き換える、というのがベイズの心。`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "vandermonde-square-identity",
    title: "二項係数の平方和 Σ(ₙCₖ)² = ₂ₙCₙ",
    unit: "場合の数と確率",
    difficulty: "D_PLUS",
    tagline: "同じ数え上げを、2 つの視点で",
    hasGraph: false,
    statement: r`自然数 $n$ に対して
$$\sum_{k=0}^{n}\left( {}_n\mathrm{C}_k\right)^2= {}_{2n}\mathrm{C}_n$$
が成り立つことを、数え上げ（組合せの意味）から示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 1 つの量を 2 通りに数える",
        body: r`右辺 $ {}_{2n}\mathrm{C}_n$ は「$2n$ 個から $n$ 個選ぶ総数」。同じ選び方を、$2n$ 個を 2 つの $n$ 個に分けて数え直すと左辺が現れる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 小さな n で確かめる",
        body: r`$n=2$：左辺 $= {}_2\mathrm{C}_0^2+ {}_2\mathrm{C}_1^2+ {}_2\mathrm{C}_2^2=1+4+1=6$、右辺 $= {}_4\mathrm{C}_2=6$。一致する。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 左 n 個・右 n 個に分ける",
        body: r`$2n$ 個を「左 $n$ 個」「右 $n$ 個」に分け、左から $k$ 個・右から $n-k$ 個選ぶ。対称性 $ {}_n\mathrm{C}_{n-k}= {}_n\mathrm{C}_k$ を使う。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$2n$ 個の異なるものから $n$ 個選ぶ方法は $ {}_{2n}\mathrm{C}_n$ 通り（右辺）。

これを別の視点で数える。$2n$ 個を「左の $n$ 個」と「右の $n$ 個」に分けておく。選んだ $n$ 個のうち左から $k$ 個取るとき、右からは残り $n-k$ 個取る。その方法は
$$ {}_n\mathrm{C}_k\cdot {}_n\mathrm{C}_{n-k}= {}_n\mathrm{C}_k\cdot {}_n\mathrm{C}_k=\left( {}_n\mathrm{C}_k\right)^2$$
（対称性 $ {}_n\mathrm{C}_{n-k}= {}_n\mathrm{C}_k$ を用いた）。$k=0,1,\dots,n$ は排反で、すべての選び方を尽くすから
$$\sum_{k=0}^{n}\left( {}_n\mathrm{C}_k\right)^2= {}_{2n}\mathrm{C}_n.\qquad\blacksquare$$

**別解（多項式の係数比較）。** $(1+x)^n(1+x)^n=(1+x)^{2n}$ の両辺で $x^n$ の係数を比べる。左辺の $x^n$ は $\sum_{k}( {}_n\mathrm{C}_k)( {}_n\mathrm{C}_{n-k})=\sum_k( {}_n\mathrm{C}_k)^2$、右辺の $x^n$ は $ {}_{2n}\mathrm{C}_n$。数え上げと同じ等式が、母関数（係数比較）からも出る。これはヴァンデルモンドの恒等式 $\sum_k {}_m\mathrm{C}_k\, {}_n\mathrm{C}_{p-k}= {}_{m+n}\mathrm{C}_p$ の特別な場合。

**美しさ:** 「$2n$ 個から $n$ 個選ぶ」というたった一つの数え上げを、左右の分担という視点で見直すだけで、二項係数の平方和が一気に畳まれる。$ {}_n\mathrm{C}_{n-k}= {}_n\mathrm{C}_k$ の対称性が、和を完全な平方の和に変える。`,
      },
    ],
  },

  // ---- 旧帝大レベル追加（完全順列・モンモール数） ----
  {
    slug: "derangement-montmort",
    title: "完全順列（モンモール数）",
    unit: "場合の数と確率",
    difficulty: "D",
    tagline: "「全員ハズレ」を包除原理で数える",
    hasGraph: false,
    tags: ["完全順列", "包除原理", "順列"],
    statement: r`4 人が自分の名札を 1 つずつ持ち寄り、よくシャッフルして 1 人 1 枚ずつ受け取る。全員が自分以外の名札を受け取る場合の数（完全順列の数）を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 余事象を包除原理で",
        body: r`「全員ハズレ（誰も自分の名札を受け取らない）」を直接数えるのは難しいので、余事象「少なくとも 1 人が自分のを受け取る」を包除原理で数え、全 $4!$ 通りから引く。「$i$ さんが自分のを受け取る」事象を $A_i$ とし、和集合 $|\bigcup A_i|$ を求める。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 小さく数えて感触を得る",
        body: r`$n=2$：完全順列は「入れ替える」$1$ 通り（$D_2=1$）。$n=3$：$3!=6$ 通り中、全員ハズレは $\{231,312\}$ の $2$ 通り（$D_3=2$）。少しずつ増えるが $n!$ のほぼ $\dfrac1e\approx0.368$ 倍に落ち着く、と当たりをつける。共通部分 $|A_{i_1}\cap\cdots\cap A_{i_k}|=(4-k)!$（$k$ 人を固定、残り自由）も小さい例で確認する。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$|A_{i_1}\cap\cdots\cap A_{i_k}|=(4-k)!$（$k$ 人を固定、残りは自由）。$\dbinom4k$ 通りの選び方。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`全体は $4!=24$ 通り。「少なくとも 1 人が自分のを受け取る」個数は、包除原理より
$$\left|\bigcup_{i=1}^{4}A_i\right|=\sum_{k=1}^{4}(-1)^{k-1}\binom4k(4-k)!.$$
求める完全順列の数 $D_4$ は、全体からこれを引いたもの。まとめると
$$D_4=\sum_{k=0}^{4}(-1)^{k}\binom4k(4-k)!=4!\left(1-\frac1{1!}+\frac1{2!}-\frac1{3!}+\frac1{4!}\right).$$
各項を計算すると
$$D_4=24-24+12-4+1=9.$$
よって **9 通り**。

**メタ。** 一般に完全順列の数は $D_n=n!\displaystyle\sum_{k=0}^{n}\dfrac{(-1)^k}{k!}$ で、$n\to\infty$ のとき「全員ハズレ」の確率 $\dfrac{D_n}{n!}\to\dfrac1e\approx0.368$ に近づく（$e^{-1}$ のテイラー級数そのもの）。包除原理の交互符号が、指数関数の級数として現れるのが美しい。漸化式 $D_n=(n-1)(D_{n-1}+D_{n-2})$ でも計算できる。`,
      },
    ],
  },

  // ============================== 二項分布の発展（拡張）==============================
  {
    slug: "binomial-most-likely",
    title: "二項分布で最も起こりやすい回数",
    unit: "場合の数と確率",
    difficulty: "C",
    tagline: "隣どうしの比で、増減の境目を探す",
    hasGraph: false,
    tags: ["反復試行", "二項定理", "最大最小"],
    statement: r`1 個のさいころを $10$ 回投げる。$1$ の目が出る回数 $X$ について、$P(X=k)$ が最大となる $k$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 隣の確率との比を見る",
        body: r`$P(X=k)= {}_{10}\mathrm{C}_k\left(\dfrac16\right)^k\left(\dfrac56\right)^{10-k}$。最大値そのものを計算するより、**隣どうしの比** $\dfrac{P(X=k)}{P(X=k-1)}$ が $1$ より大きいか小さいかで増減を判定するのが速い。比が $1$ を上から下へまたぐ $k$ が最頻値。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 棒グラフで山の位置を見る",
        body: r`下のラボで $n,p$ を動かすと二項分布の棒グラフが変わり、最頻値 $k=\lfloor(n+1)p\rfloor$（マゼンタ）が動く。本問は $n=10,\ p=\dfrac16$ なので $(n+1)p=\dfrac{11}{6}\approx1.83$、その整数部 $1$ が怪しい、と当たりをつける。

@@lab:binomial-mode@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 比を整理する",
        body: r`$\dfrac{P(X=k)}{P(X=k-1)}=\dfrac{ {}_{10}\mathrm{C}_k}{ {}_{10}\mathrm{C}_{k-1}}\cdot\dfrac{1/6}{5/6}=\dfrac{10-k+1}{k}\cdot\dfrac15=\dfrac{11-k}{5k}$。これと $1$ の大小を比べる。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$P(X=k)= {}_{10}\mathrm{C}_k\left(\dfrac16\right)^k\left(\dfrac56\right)^{10-k}$（$k=0,1,\dots,10$）。隣どうしの比を作ると
$$\frac{P(X=k)}{P(X=k-1)}=\frac{ {}_{10}\mathrm{C}_k}{ {}_{10}\mathrm{C}_{k-1}}\cdot\frac{1/6}{5/6}=\frac{11-k}{k}\cdot\frac15=\frac{11-k}{5k}.$$
この比が $1$ より大きい（増加）条件は
$$\frac{11-k}{5k}>1\ \Longleftrightarrow\ 11-k>5k\ \Longleftrightarrow\ k<\frac{11}{6}\approx1.83.$$
よって $k=1$ までは $P(X=k)>P(X=k-1)$（増加）、$k=2$ 以降は $P(X=k)<P(X=k-1)$（減少）。したがって $P(X=k)$ は **$k=1$ で最大**。

**検算。** $P(X=1)= {}_{10}\mathrm{C}_1\left(\dfrac16\right)\left(\dfrac56\right)^9$、$P(X=0)=\left(\dfrac56\right)^{10}$、$P(X=2)= {}_{10}\mathrm{C}_2\left(\dfrac16\right)^2\left(\dfrac56\right)^8$。比はそれぞれ $\dfrac{P_1}{P_0}=\dfrac{10}{5}=2>1$、$\dfrac{P_2}{P_1}=\dfrac{9}{10}<1$ で、$k=1$ が山頂だと確認できる。

**メタ。** 二項分布の最頻値は「隣の比 $\dfrac{P_k}{P_{k-1}}=\dfrac{(n-k+1)p}{k(1-p)}$ が $1$ をまたぐ $k$」。一般に最頻値は $\lfloor(n+1)p\rfloor$（$(n+1)p$ が整数なら 2 つ並ぶ）。「最大値を直接出さず、隣との比で増減を捉える」発想は、階乗や組合せを含む数列の最大問題すべてに通用する。`,
      },
    ],
  },
];
