import type { Problem } from "@/lib/types";

// 数学I「データの分析」— 20 問。
// 図・グラフが本質に効く C 以上の問題（相関・箱ひげ・変量変換）にラボを付ける。
const r = String.raw;

export const dataAnalysis: Problem[] = [
  // ============================== A (5) ==============================
  {
    slug: "data-mean-median-mode",
    title: "平均値・中央値・最頻値",
    unit: "データの分析",
    difficulty: "A",
    tagline: "3 つの代表値を読み分ける",
    hasGraph: false,
    statement: r`次のデータの平均値・中央値・最頻値を求めよ。
$$2,\ 3,\ 3,\ 5,\ 7,\ 8,\ 8,\ 8,\ 10$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 3 つの定義",
        body: r`平均値は総和 ÷ 個数。中央値はデータを小さい順に並べた真ん中。最頻値は最も多く現れる値。データは既に昇順で 9 個ある。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`合計は $54$、個数は $9$。中央値は 5 番目の値、最頻値は最も回数の多い値。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`平均値 $=\dfrac{2+3+3+5+7+8+8+8+10}{9}=\dfrac{54}{9}=6$。
中央値は 5 番目の値で $7$。最頻値は 3 回現れる $8$。`,
      },
    ],
  },
  {
    slug: "data-range-quartiles",
    title: "範囲と四分位数",
    unit: "データの分析",
    difficulty: "A",
    tagline: "データを四等分する",
    hasGraph: false,
    statement: r`次のデータの範囲・第1四分位数 $Q_1$・第2四分位数 $Q_2$・第3四分位数 $Q_3$・四分位範囲を求めよ。
$$1,\ 3,\ 5,\ 7,\ 9,\ 11,\ 13$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 中央値で半分に",
        body: r`$Q_2$ は全体の中央値。$Q_1,Q_3$ は中央値を境にした下半分・上半分の中央値。範囲は最大 − 最小、四分位範囲は $Q_3-Q_1$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$n=7$ なので $Q_2$ は 4 番目 $=7$。下半分は $\{1,3,5\}$、上半分は $\{9,11,13\}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`範囲 $=13-1=12$。$Q_2=7$。下半分 $\{1,3,5\}$ より $Q_1=3$、上半分 $\{9,11,13\}$ より $Q_3=11$。
四分位範囲 $=Q_3-Q_1=11-3=8$。`,
      },
    ],
  },
  {
    slug: "data-frequency-mean",
    title: "度数分布表から平均を出す",
    unit: "データの分析",
    difficulty: "A",
    tagline: "(値 × 度数) の総和 ÷ 総度数",
    hasGraph: false,
    statement: r`次の度数分布表で表されるデータの平均値を求めよ。
$$\begin{array}{c|cccc}\text{値}&0&1&2&3\\\hline \text{度数}&2&3&4&1\end{array}$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 重みつき平均",
        body: r`度数分布表の平均は $\dfrac{\sum(\text{値}\times\text{度数})}{\text{総度数}}$。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`総度数 $=2+3+4+1=10$。分子 $=0\cdot2+1\cdot3+2\cdot4+3\cdot1$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`平均値 $=\dfrac{0\cdot2+1\cdot3+2\cdot4+3\cdot1}{10}=\dfrac{0+3+8+3}{10}=\dfrac{14}{10}=1.4$。`,
      },
    ],
  },
  {
    slug: "data-variance-small",
    title: "分散と標準偏差（定義通り）",
    unit: "データの分析",
    difficulty: "A",
    tagline: "偏差の 2 乗の平均",
    hasGraph: false,
    statement: r`データ $2,\ 4,\ 6,\ 8,\ 10$ の分散と標準偏差を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 偏差から",
        body: r`まず平均を求め、各値の偏差（値 − 平均）を出す。分散は偏差の 2 乗の平均、標準偏差はその正の平方根。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`平均 $=6$。偏差は $-4,-2,0,2,4$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`平均 $=\dfrac{2+4+6+8+10}{5}=6$。偏差の 2 乗の和は $16+4+0+4+16=40$。
分散 $s^2=\dfrac{40}{5}=8$、標準偏差 $s=\sqrt8=2\sqrt2$。`,
      },
    ],
  },
  {
    slug: "data-median-class",
    title: "中央値が含まれる階級",
    unit: "データの分析",
    difficulty: "A",
    tagline: "累積度数で真ん中を探す",
    hasGraph: false,
    statement: r`$20$ 人のテストの結果が次の度数分布表で与えられている。中央値が含まれる階級を答えよ。
$$\begin{array}{c|cccc}\text{階級(点)}&[0,10)&[10,20)&[20,30)&[30,40)\\\hline \text{度数}&3&5&8&4\end{array}$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 累積度数",
        body: r`$n=20$ なので中央値は 10 番目と 11 番目の平均がある位置。累積度数を順に足し、その順位がどの階級に入るかを見る。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`累積度数は $3,\ 8,\ 16,\ 20$。10・11 番目はどこに入るか。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`累積度数は $3,\ 8,\ 16,\ 20$。第 9〜16 番目が階級 $[20,30)$ に入るので、10・11 番目もここ。
よって中央値が含まれる階級は $[20,30)$。`,
      },
    ],
  },

  // ============================== B (6) ==============================
  {
    slug: "data-frequency-variance",
    title: "度数分布表から分散を出す",
    unit: "データの分析",
    difficulty: "B",
    tagline: "二乗の平均 − 平均の二乗",
    hasGraph: false,
    statement: r`次の度数分布表のデータについて、平均値と分散を求めよ。
$$\begin{array}{c|ccccc}\text{値}&0&1&2&3&4\\\hline \text{度数}&1&2&4&2&1\end{array}$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 公式 s² = x²平均 − (平均)²",
        body: r`平均 $\bar x$ を出したあと、分散は $s^2=\overline{x^2}-(\bar x)^2$ で計算すると速い。$\overline{x^2}$ は値の 2 乗の重みつき平均。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`総度数 $=10$。$\bar x=\dfrac{0+2+8+6+4}{10}$、$\overline{x^2}=\dfrac{0+2+16+18+16}{10}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\bar x=\dfrac{0\cdot1+1\cdot2+2\cdot4+3\cdot2+4\cdot1}{10}=\dfrac{20}{10}=2$。
$\overline{x^2}=\dfrac{0+1\cdot2+4\cdot4+9\cdot2+16\cdot1}{10}=\dfrac{52}{10}=5.2$。
分散 $s^2=\overline{x^2}-(\bar x)^2=5.2-4=1.2$。`,
      },
    ],
  },
  {
    slug: "data-combined-mean",
    title: "2 グループを合併した平均",
    unit: "データの分析",
    difficulty: "B",
    tagline: "人数で重みづけ",
    hasGraph: false,
    statement: r`A 班 $30$ 人の平均点は $60$ 点、B 班 $20$ 人の平均点は $70$ 点である。両班を合わせた $50$ 人の平均点を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 合計点で考える",
        body: r`平均同士をそのまま平均してはいけない。各班の合計点を出し、全体の合計 ÷ 全体の人数で計算する。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`A 班の合計 $=30\times60$、B 班の合計 $=20\times70$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`合併平均 $=\dfrac{30\times60+20\times70}{50}=\dfrac{1800+1400}{50}=\dfrac{3200}{50}=64$ 点。`,
      },
    ],
  },
  {
    slug: "data-transform-basic",
    title: "変量の変換（平均と標準偏差）",
    unit: "データの分析",
    difficulty: "B",
    tagline: "平均は a倍+b、標準偏差は |a|倍",
    hasGraph: false,
    statement: r`変量 $x$ の平均は $10$、標準偏差は $4$ である。$y=2x+3$ で定めた変量 $y$ の平均と標準偏差を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 変換の規則",
        body: r`$y=ax+b$ のとき、平均は $a\bar x+b$、標準偏差は $|a|$ 倍、分散は $a^2$ 倍。平行移動 $b$ は散らばりに影響しない。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$a=2,\ b=3$。平均は $2\cdot10+3$、標準偏差は $2\cdot4$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`平均 $=2\cdot10+3=23$。標準偏差 $=|2|\cdot4=8$。`,
      },
    ],
  },
  {
    slug: "data-boxplot-read",
    title: "箱ひげ図を読み取る",
    unit: "データの分析",
    difficulty: "B",
    tagline: "5 数要約から散らばりを見る",
    hasGraph: false,
    statement: r`あるデータの 5 数要約が 最小値 $20$、$Q_1=35$、$Q_2=50$、$Q_3=60$、最大値 $80$ であった。四分位範囲を求めよ。また「$Q_3+1.5\times(\text{四分位範囲})$ を超える値を外れ値とみなす」基準のもとで、$80$ は外れ値か。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — IQR と外れ値の基準",
        body: r`四分位範囲 $\mathrm{IQR}=Q_3-Q_1$。外れ値の上側の基準は $Q_3+1.5\,\mathrm{IQR}$。最大値がこれを超えるかを見る。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\mathrm{IQR}=60-35=25$。$Q_3+1.5\times25=?$`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\mathrm{IQR}=60-35=25$。上側の基準は $Q_3+1.5\times25=60+37.5=97.5$。
最大値 $80<97.5$ なので、$80$ は外れ値ではない。`,
      },
    ],
  },
  {
    slug: "data-covariance",
    title: "共分散を求める",
    unit: "データの分析",
    difficulty: "B",
    tagline: "偏差の積の平均",
    hasGraph: false,
    statement: r`次の 4 組のデータについて、$x$ と $y$ の共分散 $s_{xy}$ を求めよ。
$$\begin{array}{c|cccc}x&2&4&6&8\\\hline y&1&3&2&6\end{array}$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 偏差の積",
        body: r`共分散は $s_{xy}=\dfrac1n\sum(x_i-\bar x)(y_i-\bar y)$。まず両方の平均を出す。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$\bar x=5,\ \bar y=3$。偏差 $x$: $-3,-1,1,3$、偏差 $y$: $-2,0,-1,3$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$\bar x=5,\ \bar y=3$。偏差の積の和は
$$(-3)(-2)+(-1)(0)+(1)(-1)+(3)(3)=6+0-1+9=14.$$
共分散 $s_{xy}=\dfrac{14}{4}=3.5$。`,
      },
    ],
  },
  {
    slug: "data-standardize",
    title: "標準化（z 得点）",
    unit: "データの分析",
    difficulty: "B",
    tagline: "平均 0・標準偏差 1 にそろえる",
    hasGraph: false,
    statement: r`変量 $x$ の平均は $50$、標準偏差は $10$ である。$x=65$ の標準化得点 $z=\dfrac{x-\bar x}{s}$ と、偏差値 $T=50+10z$ を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 平均からの距離を s で測る",
        body: r`標準化は「平均からの偏差を標準偏差何個分か」に直す操作 $z=\dfrac{x-\bar x}{s}$。偏差値は $z$ を平均 50・標準偏差 10 に乗せ替えたもの。`,
      },
      {
        type: "HINT",
        order: 1,
        title: "ヒント",
        body: r`$z=\dfrac{65-50}{10}$。`,
      },
      {
        type: "SOLUTION",
        order: 2,
        title: "厳密な解答",
        body: r`$z=\dfrac{65-50}{10}=1.5$。偏差値 $T=50+10\cdot1.5=65$。`,
      },
    ],
  },

  // ============================== C (5) ==============================
  {
    slug: "data-correlation-coefficient",
    title: "相関係数を計算する",
    unit: "データの分析",
    difficulty: "C",
    tagline: "共分散 ÷ 標準偏差の積",
    hasGraph: true,
    graphKey: "scatter-correlation",
    statement: r`次の 5 組のデータについて、$x$ と $y$ の相関係数 $r$ を求めよ。
$$\begin{array}{c|ccccc}x&1&2&3&4&5\\\hline y&2&3&5&4&6\end{array}$$`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — r の定義",
        body: r`相関係数は $r=\dfrac{s_{xy}}{s_x\,s_y}=\dfrac{\sum(x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum(x_i-\bar x)^2}\,\sqrt{\sum(y_i-\bar y)^2}}$。偏差の表を作るのが近道。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 点群の揃い方と r",
        body: r`ラボで「傾き a」を動かすと、点群が直線に揃うほど $r$ が $\pm1$ に近づき、ばらばらだと $0$ に近づく。$r$ は「どれだけ直線的か」を測る量だと体感しよう。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\bar x=3,\ \bar y=4$。$\sum(x_i-\bar x)(y_i-\bar y),\ \sum(x_i-\bar x)^2,\ \sum(y_i-\bar y)^2$ を求める。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\bar x=3,\ \bar y=4$。偏差 $x$: $-2,-1,0,1,2$、偏差 $y$: $-2,-1,1,0,2$。
$$\sum(x_i-\bar x)(y_i-\bar y)=4+1+0+0+4=9,$$
$$\sum(x_i-\bar x)^2=10,\qquad \sum(y_i-\bar y)^2=10.$$
$$r=\frac{9}{\sqrt{10}\cdot\sqrt{10}}=\frac{9}{10}=0.9.$$
強い正の相関がある。

**メタ。** $r$ は共分散を両者の標準偏差で割って“単位をそろえた”無次元量で、つねに $-1\le r\le1$（D+ で証明）。$r=0.9$ は強い正の相関を示すが、測っているのは**因果ではなく直線的な連動の強さ**にすぎない点に注意。`,
      },
    ],
  },
  {
    slug: "data-outlier-robustness",
    title: "外れ値は平均と中央値のどちらを動かすか",
    unit: "データの分析",
    difficulty: "C",
    tagline: "中央値は外れ値に強い",
    hasGraph: true,
    graphKey: "boxplot-quartiles",
    statement: r`データ $3,4,5,6,7,8,9,10,11,50$ の平均値と中央値を求めよ。さらに、外れ値 $50$ が平均値と中央値のどちらに大きく影響するかを述べよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 値そのものか、順位か",
        body: r`平均は全データの「値」を足すので大きな外れ値に引きずられる。中央値は「順位」で決まるので、外れ値が 1 つ増えても真ん中の位置はほとんど動かない。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 外れ値を動かす",
        body: r`ラボで外れ値を大きくすると、平均（▲）はぐいぐい引きずられるのに、中央値（緑の線）はほとんど動かないことを確かめよう。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$n=10$ なので中央値は 5 番目と 6 番目の平均。$3\sim11$ の和は $63$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`平均 $=\dfrac{(3+4+\cdots+11)+50}{10}=\dfrac{63+50}{10}=11.3$。
中央値は 5 番目 $7$ と 6 番目 $8$ の平均で $\dfrac{7+8}{2}=7.5$。
外れ値 $50$ がなければ他の値は $3\sim11$ なので、平均は中央値付近のはず。実際この $50$ が平均を $7.5$ 付近から $11.3$ まで押し上げている一方、中央値は $7.5$ のまま。**外れ値は平均に大きく影響し、中央値にはほとんど影響しない**。

**メタ。** 平均は「値」、中央値は「順位」で決まる。だから外れ値や歪んだ分布では、中央値（頑健な代表値）のほうが実感に近い。所得や住宅価格の代表値に“中央値”が好まれるのはこのためで、代表値は目的に応じて選ぶもの。`,
      },
    ],
  },
  {
    slug: "data-transform-variance",
    title: "変量の変換と分散",
    unit: "データの分析",
    difficulty: "C",
    tagline: "分散は a² 倍、平行移動には不変",
    hasGraph: true,
    graphKey: "deviation-variance",
    statement: r`変量 $x$ の平均は $5$、分散は $2$ である。$y=3x-4$ で定めた変量 $y$ の平均・分散・標準偏差を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 平行移動と拡大を分けて考える",
        body: r`$y=ax+b$ で、平行移動 $b$ は散らばりを変えない。拡大 $a$ は偏差を $a$ 倍にするので、分散は $a^2$ 倍、標準偏差は $|a|$ 倍。平均だけが $a\bar x+b$ と動く。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — a と b の役割を分離する",
        body: r`ラボで $b$ を変えると点群は平行移動するだけで分散は不変。$a$ を変えると平均のまわりに拡大・縮小し、分散が $a^2$ に比例して変わるのが見える。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$a=3,\ b=-4$。平均 $=3\cdot5-4$、分散 $=3^2\cdot2$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`平均 $=3\cdot5-4=11$。分散 $=3^2\cdot2=18$。標準偏差 $=\sqrt{18}=3\sqrt2$。

**メタ。** $y=ax+b$ で平均は $a\bar x+b$（平行移動 $b$ も効く）、分散は $a^2$ 倍・標準偏差は $|a|$ 倍（平行移動 $b$ は無関係）。「散らばりは位置に依らず、拡大率の 2 乗で効く」——標準化 $z=\dfrac{x-\bar x}{s}$ が平均 0・分散 1 にそろうのも、この変換規則のちょうど逆算である。`,
      },
    ],
  },
  {
    slug: "data-variance-identity",
    title: "分散の公式 s² = x²平均 − (平均)²",
    unit: "データの分析",
    difficulty: "C",
    tagline: "定義を展開すれば計算式が出る",
    hasGraph: false,
    statement: r`分散 $s^2=\dfrac1n\displaystyle\sum_{i=1}^{n}(x_i-\bar x)^2$ について、
$$s^2=\overline{x^2}-(\bar x)^2$$
が成り立つことを示せ。ただし $\overline{x^2}=\dfrac1n\sum x_i^2$。さらにこれを用いてデータ $4,6,8,8,9$ の分散を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 2 乗を展開して和をとる",
        body: r`$(x_i-\bar x)^2=x_i^2-2\bar x\,x_i+\bar x^2$ を $i$ について和を取る。鍵は $\sum x_i=n\bar x$（平均の定義そのもの）。これを使うと中央の項がきれいにまとまり、$\overline{x^2}-(\bar x)^2$ が現れる。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 定義式と公式が一致するか",
        body: r`データ $4,6,8,8,9$（平均 $7$）で両方を計算して照合する。定義どおり偏差の 2 乗の平均は $\dfrac15(9+1+1+1+4)=\dfrac{16}{5}=3.2$。公式では $\overline{x^2}-\bar x^2=52.2-49=3.2$。確かに一致——偏差を毎回引くより、$\sum x^2$ と $\sum x$ だけ集計する公式のほうが計算量で勝る。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$\sum x_i=n\bar x$。$\dfrac1n\sum(\cdots)$ を順に計算する。具体例では $\bar x=7$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**恒等式の証明。** 偏差平方の和を展開すると
$$\sum(x_i-\bar x)^2=\sum x_i^2-2\bar x\sum x_i+\sum\bar x^2=\sum x_i^2-2\bar x(n\bar x)+n\bar x^2=\sum x_i^2-n\bar x^2.$$
（途中で $\sum x_i=n\bar x$、$\sum\bar x^2=n\bar x^2$ を用いた。）両辺を $n$ で割って
$$s^2=\frac1n\sum(x_i-\bar x)^2=\overline{x^2}-(\bar x)^2.$$

**具体例。** $\bar x=\dfrac{4+6+8+8+9}{5}=7$、$\overline{x^2}=\dfrac{16+36+64+64+81}{5}=\dfrac{261}{5}=52.2$。よって $s^2=52.2-49=3.2$。

**メタ。** $s^2=\overline{x^2}-(\bar x)^2\ge0$ は「2 乗の平均 $\ge$ 平均の 2 乗」、すなわち凸関数 $x^2$ のイェンゼンの不等式そのもの。等号は全データが等しいとき（散らばり $0$）。この計算式は次の合併分散・最小二乗でも主役になる。`,
      },
    ],
  },
  {
    slug: "data-hypothesis-test",
    title: "仮説検定の考え方",
    unit: "データの分析",
    difficulty: "C",
    tagline: "極端さを確率で測る",
    hasGraph: false,
    statement: r`あるコインを $10$ 回投げたところ表が $9$ 回出た。「表と裏は等しく出る（コインは公正）」という仮説を、有意水準 $5\%$ で検定せよ。ただし、公正なコインで表が $9$ 回以上出る確率は約 $1.1\%$ である。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 仮説のもとでの確率で測る",
        body: r`「公正」という仮説（帰無仮説）が正しいと**仮定**したとき、観測された結果以上に極端なことが起こる確率を求め、有意水準（ここでは $5\%$）と比べる。仮定すると稀すぎることが現実に起きたなら、その仮定を疑う——という背理法に似た推論。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 検定の枠組みを言葉で組む",
        body: r`手順を 3 段で言語化する。①帰無仮説「コインは公正（表の確率 $\tfrac12$）」を立てる。②その仮定下で“観測以上に極端”な確率を計算（表 $9$ 回以上 $=1.1\%$）。③有意水準 $5\%$ と比較。$1.1\%<5\%$ なら「公正なら起こりにくすぎる」と判断する。何を仮定し、何の確率を、どの基準と比べるかを明確に分けるのが要。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`「表 9 回以上」の確率 $1.1\%$ と有意水準 $5\%$ を比較する。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`コインが公正だと仮定すると、表が $9$ 回以上出る確率は約 $1.1\%$。これは有意水準 $5\%$ より小さい。
すなわち、公正だとすれば「めったに起きないこと（$5\%$ 未満）」が現に起きたことになる。したがって仮説「公正である」は**棄却**され、**このコインは公正でないと判断できる**。

**メタ。** 仮説検定は「仮定 → 仮定下の確率 → 基準と比較 → 棄却 or 保留」という型。ここで $1.1\%$ は“偶然でこうなる確率”であって“コインが公正である確率”ではない点に注意（よくある誤解）。また棄却できなくても「公正と証明された」わけではない——「公正でないとは言えない」にとどまる、という非対称性が検定の本質。`,
      },
    ],
  },

  // ============================== D (3) ==============================
  {
    slug: "data-combined-variance",
    title: "2 グループを合併した分散",
    unit: "データの分析",
    difficulty: "D",
    tagline: "二乗和をプールする",
    hasGraph: false,
    statement: r`グループ 1 は $3$ 個で平均 $4$・分散 $2$、グループ 2 は $2$ 個で平均 $9$・分散 $3$ である。両者を合わせた $5$ 個のデータの平均と分散を求めよ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 分散は平均できない、二乗和に直す",
        body: r`平均同士は人数で重みづけて平均できるが、**分散は単純に平均できない**（各群の平均が違うと、群間のずれも散らばりに加わるため）。各群の $\sum x^2$ を $s^2=\overline{x^2}-\bar x^2$ から復元し、全体で $\sum x,\ \sum x^2$ を足してから合併分散 $\overline{x^2}-(\bar x)^2$ を計算する。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 二乗和を復元する",
        body: r`公式 $\sum x^2=n\,\overline{x^2}=n(s^2+\bar x^2)$ で各群を復元する。群1：$3(2+16)=54$、群2：$2(3+81)=168$。合計 $\sum x^2=222$。これと合計 $\sum x=3\cdot4+2\cdot9=30$ があれば、全体の分散が一発で出る。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`各群で $\overline{x^2}=s^2+\bar x^2$。群1：$\overline{x^2}=2+16=18$、群2：$\overline{x^2}=3+81=84$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`**合併平均。** $\bar x=\dfrac{3\cdot4+2\cdot9}{5}=\dfrac{12+18}{5}=6$。

**二乗和の復元。** 群1：$\overline{x^2}=s^2+\bar x^2=2+16=18$ より $\sum x^2=3\cdot18=54$。群2：$\overline{x^2}=3+81=84$ より $\sum x^2=2\cdot84=168$。全体 $\sum x^2=54+168=222$、$\overline{x^2}=\dfrac{222}{5}=44.4$。

**合併分散。**
$$s^2=\overline{x^2}-(\bar x)^2=44.4-36=8.4.$$

**メタ。** 合併分散は「群内のばらつき」と「群間（平均の差）のばらつき」の和に分解できる（分散分析の発想）。各群の平均が離れているほど合併分散は大きくなる——平均をそのまま平均してはいけない理由がここにある。中継点はつねに $\sum x$ と $\sum x^2$。`,
      },
    ],
  },
  {
    slug: "data-correlation-invariance",
    title: "相関係数は 1 次変換で変わらない",
    unit: "データの分析",
    difficulty: "D",
    tagline: "比を取ると係数が約分される",
    hasGraph: false,
    statement: r`$a>0,\ c>0$ とする。変量 $x,y$ を $u=ax+b,\ v=cy+d$ と 1 次変換したとき、$u,v$ の相関係数は $x,y$ の相関係数に等しいことを示せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — 各量の変換倍率を追う",
        body: r`共分散・標準偏差が変換でどう変わるかを調べる。偏差が $a,c$ 倍になるので共分散は $ac$ 倍、標準偏差は $|a|,|c|$ 倍。相関係数はそれらの**比**なので、倍率が分母分子で約分されて消えるはず——これが不変性の正体。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 単位換算で確かめる",
        body: r`身長を cm から m へ、体重を kg から g へ単位変換しても「相関の強さ」は変わらないはず。実際 $u=ax+b$ で偏差は $u_i-\bar u=a(x_i-\bar x)$ と $a$ 倍になるだけ。共分散は $ac$ 倍、標準偏差は $|a|,|c|$ 倍。比 $r$ で係数がきれいに約分されると予想できる。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$u_i-\bar u=a(x_i-\bar x)$、$v_i-\bar v=c(y_i-\bar y)$。これを共分散・標準偏差に代入。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$\bar u=a\bar x+b$ より $u_i-\bar u=a(x_i-\bar x)$、同様に $v_i-\bar v=c(y_i-\bar y)$。よって（$a,c>0$）
$$s_{uv}=\frac1n\sum (u_i-\bar u)(v_i-\bar v)=ac\,s_{xy},\quad s_u=|a|s_x=a\,s_x,\quad s_v=c\,s_y.$$
ゆえに
$$r_{uv}=\frac{s_{uv}}{s_u s_v}=\frac{ac\,s_{xy}}{(a s_x)(c s_y)}=\frac{s_{xy}}{s_x s_y}=r_{xy}.\qquad\blacksquare$$

**符号の注意。** $a,c>0$ なら符号も保たれ $r$ は完全に不変。もし一方の係数が負（例：向きを反転）なら、$ac<0$ で相関係数の**符号だけ反転**し、強さ $|r|$ は不変。

**メタ。** 相関係数が単位や原点に依らない（無次元・平行移動と正の拡大に不変）からこそ、cm と kg のような異なる単位の量どうしを比較できる。標準化 $z$ 得点で考えても同じ——$r$ は「標準化された変量の共分散」と言い換えられる。`,
      },
    ],
  },
  {
    slug: "data-least-squares-mean",
    title: "Σ(xᵢ − t)² を最小にする t",
    unit: "データの分析",
    difficulty: "D",
    tagline: "ばらつきの中心は平均",
    hasGraph: false,
    statement: r`データ $x_1,x_2,\dots,x_n$ に対し $f(t)=\displaystyle\sum_{i=1}^{n}(x_i-t)^2$ とする。$f(t)$ を最小にする $t$ は平均 $\bar x$ であることを示し、そのときの最小値を分散で表せ。`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — t の 2 次関数とみる",
        body: r`$f(t)=\sum(x_i-t)^2$ を $t$ について展開すると、$t$ の下に凸の 2 次関数になる。下に凸なら軸（頂点の $t$）で最小。データ $x_i$ は定数、変数は中心 $t$ だけ、と見方を切り替えるのが第一歩。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — 中心 t を動かして谷を探す",
        body: r`下のラボでスライダー $t$ を動かすと、二乗偏差の和 $f(t)=\sum(x_i-t)^2$ が放物線を描き、$t=$平均でちょうど谷底（最小）に来る。平均から左右にずらすほど総和が増える——平均は「ばらつきの総量を最小にする中心」だと体感できる。

@@lab:sum-squared-deviation@@`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント",
        body: r`$f(t)=n t^2-2\left(\sum x_i\right)t+\sum x_i^2$。軸は $t=\dfrac{\sum x_i}{n}$。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`$$f(t)=\sum(x_i-t)^2=\sum x_i^2-2t\sum x_i+n t^2=n\,t^2-2(n\bar x)t+\sum x_i^2.$$
$t^2$ の係数 $n>0$ より下に凸で、軸は
$$t=\frac{2(n\bar x)}{2n}=\bar x.$$
よって $f$ は $t=\bar x$ で最小。最小値は
$$f(\bar x)=\sum(x_i-\bar x)^2=n s^2\qquad(s^2\ \text{は分散}).$$
すなわち最小値はデータの**分散の $n$ 倍**。

**メタ。** 「平均は二乗偏差の和を最小にする点」——これは最小二乗法の最小単位であり、回帰直線が「残差平方和を最小にする直線」として定まるのと同じ原理。ちなみに**絶対偏差の和** $\sum|x_i-t|$ を最小にするのは中央値であり、距離の測り方（2 乗か絶対値か）で最適な中心が平均/中央値に変わる、という美しい対比がある。`,
      },
    ],
  },

  // ============================== D+ (1) =============================
  {
    slug: "data-correlation-bounds",
    title: "相関係数はなぜ −1 と 1 の間か",
    unit: "データの分析",
    difficulty: "D_PLUS",
    tagline: "非負な 2 次式の判別式が限界を生む",
    hasGraph: true,
    graphKey: "scatter-correlation",
    statement: r`相関係数 $r=\dfrac{s_{xy}}{s_x s_y}$ について、$-1\le r\le 1$ が成り立つことを示せ。また、等号が成り立つのはどんなときか。（$x$ には散らばりがあるとする。）`,
    steps: [
      {
        type: "INSIGHT",
        order: 0,
        title: "着眼点 — つねに非負な 2 次式を作る",
        body: r`偏差を組み合わせた「2 乗の和」は、どんな実数 $t$ に対しても $0$ 以上。これを $t$ の 2 次関数とみると、つねに非負 $\iff$ 判別式 $\le0$。ここから $r$ の限界が出る。`,
      },
      {
        type: "EXPERIMENT",
        order: 1,
        title: "実験 — |r| が 1 に届くとき",
        body: r`ラボで点群を直線に近づけると $r$ が $\pm1$ に迫る。完全に 1 本の直線に乗った瞬間が $|r|=1$。逆に $|r|$ が $1$ を超えることは決してないと感じ取ろう。`,
      },
      {
        type: "HINT",
        order: 2,
        title: "ヒント — 判別式 ≤ 0",
        body: r`$g(t)=\displaystyle\sum_i\bigl((x_i-\bar x)t+(y_i-\bar y)\bigr)^2\ge0$ を展開し、$t$ の 2 次式とみて判別式を考える。`,
      },
      {
        type: "SOLUTION",
        order: 3,
        title: "厳密な解答",
        body: r`任意の実数 $t$ について
$$g(t)=\sum_{i=1}^{n}\bigl((x_i-\bar x)t+(y_i-\bar y)\bigr)^2\ge0.$$
展開すると
$$g(t)=\Bigl(\sum(x_i-\bar x)^2\Bigr)t^2+2\Bigl(\sum(x_i-\bar x)(y_i-\bar y)\Bigr)t+\sum(y_i-\bar y)^2.$$
$\sum(x_i-\bar x)^2>0$（$x$ に散らばりあり）なので $g$ は下に凸の 2 次式で、すべての $t$ で $g(t)\ge0$。ゆえに判別式 $\le0$：
$$\Bigl(\sum(x_i-\bar x)(y_i-\bar y)\Bigr)^2\le \sum(x_i-\bar x)^2\cdot\sum(y_i-\bar y)^2.$$
両辺を $n^2$ で割れば $s_{xy}^2\le s_x^2 s_y^2$、よって
$$r^2=\frac{s_{xy}^2}{s_x^2 s_y^2}\le1\ \Longrightarrow\ -1\le r\le1.$$
等号は判別式 $=0$、すなわち $g(t_0)=0$ となる $t_0$ が存在するとき。このとき各 $i$ で $(x_i-\bar x)t_0+(y_i-\bar y)=0$、つまり全データが 1 本の直線上に並ぶ（完全な直線関係）。正の傾きなら $r=1$、負の傾きなら $r=-1$。$\blacksquare$

**別解（コーシー・シュワルツ）。** 偏差ベクトル $X=(x_1-\bar x,\dots,x_n-\bar x)$、$Y=(y_1-\bar y,\dots,y_n-\bar y)$ に対し、コーシー・シュワルツの不等式 $|X\cdot Y|\le|X|\,|Y|$ は
$$\Bigl|\sum(x_i-\bar x)(y_i-\bar y)\Bigr|\le\sqrt{\sum(x_i-\bar x)^2}\sqrt{\sum(y_i-\bar y)^2}$$
そのもの。両辺を $n$ で割れば $|s_{xy}|\le s_x s_y$、すなわち $|r|\le1$。等号は $X,Y$ が平行＝全点が直線上。上の「判別式 $\le0$」の議論は、このコーシー・シュワルツを 2 次関数の言葉で証明したものにほかならない。

**美しさ:** 「非負な 2 次式の判別式は $0$ 以下」という 2 次関数のただ一つの事実が、そのまま相関係数の限界 $-1\le r\le1$ と「等号 ⇔ 直線上」を生む。データのばらつきの幾何が、判別式という代数に映る。`,
      },
    ],
  },
];
