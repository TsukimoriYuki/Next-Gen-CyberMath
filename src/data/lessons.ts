import type { Lesson } from "@/lib/types";
import { AM_GM_INEQUALITY_LESSON } from "./lessons/am-gm-inequality";
import { RECURRENCE_LESSON } from "./lessons/recurrence-characteristic-equation";
import { indexByUniqueRegistryKey } from "@/lib/registry";

// Concept Lessons —「めっちゃわかりやすい授業」。
// content は KaTeX 対応 Markdown。JSXGraph ラボは、行トークン
//   @@lab:<graphKey>@@        または  @@lab:<graphKey>|キャプション@@
// で埋め込む（LessonRenderer がこのトークンを <LabRenderer> に置換する）。
// 注: String.raw を使うので KaTeX の "$" 直後に "{" を置かない（"$ {" と空ける）。
const r = String.raw;

export const LESSONS: Lesson[] = [
  AM_GM_INEQUALITY_LESSON,
  RECURRENCE_LESSON,
  {
    slug: "geometry-altitude-height-routes",
    title: "垂線と高さの求め方",
    unit: "図形と計量",
    summary:
      "面積、三角比、相似、空間断面のどこから高さを作るかを判断する講義。図形と計量の失点を減らすための補助線訓練です。",
    relatedProblemSlugs: [
      "altitude-from-area-basic",
      "altitude-from-trig-sine",
      "inradius-from-area-semiperimeter",
      "space-altitude-section",
    ],
    tags: ["図形と計量", "垂線", "高さ", "内接円", "空間図形"],
    content: r`## 高さは「線」ではなく「距離」として読む

図形と計量で高さが見えないときは、いきなり公式を探すより先に、**どの直線への距離を求めているか**を決めます。

- 面積が先にあるなら、底辺を $a$、高さを $h$ として $S=\dfrac12 ah$ から逆算する
- 辺と角があるなら、直角三角形を作って $h=a\sin\theta$ と読む
- 直角三角形の斜辺への高さなら、面積の二通りまたは相似を使う
- 空間図形なら、必要な断面を切って平面の直角三角形に戻す

@@geometry-diagram:altitude-basic|この図で見るポイント: 高さは「頂点から底辺の直線までの最短距離」。垂足が辺の外に出ても、直線への距離として読む。@@

## 面積から逆算する

底辺と面積が分かるなら、三角比より面積公式が速いです。

@@geometry-diagram:area-height-reverse|この図で見るポイント: 面積 S と底辺 a が先に見えたら、三角比より先に h=2S/a を候補にする。@@

$$
S=\frac12 ah \quad\Longrightarrow\quad h=\frac{2S}{a}
$$

ここで大事なのは、鈍角三角形でも高さは「辺上」ではなく「直線への距離」として扱うことです。垂足が辺の外側に落ちても、面積公式は同じです。

## 三角比で高さを作る

辺と角が与えられているときは、垂線を下ろして直角三角形を作ります。

@@geometry-diagram:trig-height|この図で見るポイント: 高さは角の向かい側なので sin、底辺方向の射影は cos。どちらの長さを聞かれているかを先に分ける。@@

$$
h=a\sin\theta
$$

また、同じ図で底辺方向の長さは

$$
x=a\cos\theta
$$

です。共通テストでは、まず射影を出してから残りの辺を作る誘導もよく出ます。

## 三辺だけなら余弦定理から sin へ

三辺が分かっていて高さや面積が必要なときは、余弦定理で角の cos を出し、そこから sin に戻します。

$$
\cos A=\frac{b^2+c^2-a^2}{2bc}
$$

$$
\sin A=\sqrt{1-\cos^2 A}
$$

三角形の内角では sin は正なので、符号で迷わないことが重要です。

## 内接円半径は面積と半周長

内接円の半径 $r$ は、面積と半周長 $s$ がそろった瞬間に使います。

@@geometry-diagram:incenter-incircle|この図で見るポイント: 内心から三辺へ下ろした垂線はすべて半径 r。だから三角形の面積を三つに分けると S=rs になる。@@

$$
S=rs,\qquad s=\frac{a+b+c}{2}
$$

「内心」「三辺から等距離」「内接円」が出たら、各辺への垂線が全部同じ長さになる、と読むのが入口です。

## 空間図形は断面に戻す

正四角すい、正四面体、立体の高さは、真正面から 3D のまま考えると迷います。

@@geometry-diagram:spatial-section|この図で見るポイント: 求めたい高さを含む平面で切る。断面に出た直角三角形へ戻してから三平方や三角比を使う。@@

1. 求めたい高さを含む断面を選ぶ
2. 底面中心や中点までの距離を平面図形で求める
3. 直角三角形にして三平方または三角比で処理する

## 判別チェック

- 面積と底辺がある → 面積公式から高さ
- 辺と角がある → 垂線を下ろして sin
- 三辺だけある → 余弦定理から sin
- 内接円がある → $S=rs$
- 空間図形 → 断面を切る
- 点と直線の距離 → 三角形の高さとして読む
`,
  },
  {
    slug: "triangle-centers-bisectors",
    title: "三角形の中心と二等分線",
    unit: "図形の性質",
    summary:
      "内心・外心・重心・垂心、角の二等分線、中線の長さを条件から判別する講義。補助線選択の土台を作ります。",
    relatedProblemSlugs: [
      "incenter-equal-distance",
      "circumcenter-right-triangle",
      "angle-bisector-length-basic",
      "median-length-apollonius",
    ],
    tags: ["図形の性質", "内心", "外心", "重心", "垂心", "角の二等分線"],
    content: r`## 中心は名前より条件で判別する

三角形の中心は、名前を暗記するよりも「どの線が交わる点か」「何から等距離か」で判断します。

| 中心 | 交わる線 | 重要な性質 |
|---|---|---|
| 内心 | 角の二等分線 | 三辺から等距離 |
| 外心 | 垂直二等分線 | 三頂点から等距離 |
| 重心 | 中線 | 中線を頂点側から二対一に分ける |
| 垂心 | 高さ | 三本の垂線の交点 |

## 内心は角の二等分線

「三辺から等距離」「内接円」「角の二等分線」が見えたら内心です。

@@geometry-diagram:incenter-incircle|この図で見るポイント: 内心は「三辺から等距離」の点。各辺へ垂線を下ろすと、同じ半径 r が三本見える。@@

角の二等分線上の点は、その角を作る二辺から等距離です。三つの角の二等分線が交わる点が、三辺から等距離になるので内心になります。

## 外心は垂直二等分線

「三頂点から等距離」「外接円」「直角三角形の斜辺の中点」が見えたら外心です。

@@geometry-diagram:circumcenter-circumcircle|この図で見るポイント: 外心は「三頂点から等距離」の点。三本の半径は頂点へ向かう。内心の半径と向きが違う。@@

二点 A、B から等距離の点は、AB の垂直二等分線上にあります。これを二辺で行えば外心が決まります。

直角三角形では、外心は斜辺の中点です。

## 重心は中線

重心は三本の中線の交点で、中線を頂点側から

@@geometry-diagram:centroid-median|この図で見るポイント: 重心の 2:1 は頂点側が長い。中点 M と重心 G の向きを取り違えない。@@

$$
2:1
$$

に分けます。座標では三頂点の平均です。

## 垂心は高さ

垂心は三本の高さの交点です。

@@geometry-diagram:orthocenter-altitudes|この図で見るポイント: 垂心で見る線は高さ。辺の中点を通る垂直二等分線ではない。@@

- 鋭角三角形では内部
- 直角三角形では直角の頂点
- 鈍角三角形では外部

高さと垂直二等分線は混同しやすいので注意します。高さは「頂点から対辺へ」、垂直二等分線は「辺の中点を通り、その辺に垂直」です。

## 角の二等分線定理

角 A の二等分線が BC と D で交わるとき、

@@geometry-diagram:angle-bisector-ratio|この図で見るポイント: BD:DC は AB:AC に対応する。D の左右の比と、角 A をはさむ二辺の比を結ぶ。@@

$$
BD:DC=AB:AC
$$

です。逆に、対辺の分割比が隣の二辺の比と一致していれば、角の二等分線を疑います。

## 角の二等分線の長さ

角の二等分線の長さは、隣の二辺と対辺の分割が分かっているときに使います。

@@geometry-diagram:angle-bisector-length|この図で見るポイント: まず二等分線定理で BD, DC をそろえ、その後に AD の長さ公式へ進む。@@

$$
AD^2=AB\cdot AC-BD\cdot DC
$$

共通テストでは、先に二等分線定理で $BD,DC$ を出してから、この式へ進む誘導が自然です。

## 中線の長さ

中点が与えられ、中線の長さが必要ならアポロニウスの定理を候補にします。

@@geometry-diagram:median-length|この図で見るポイント: M が中点なら AM は中線。角を二等分しているとは限らないので、使う公式を分ける。@@

$$
AB^2+AC^2=2(AM^2+BM^2)
$$

ここで M は BC の中点です。

## 補助線選択のまとめ

@@geometry-diagram:auxiliary-line-choice|この図で見るポイント: 面積なら高さ、三辺や三頂点から等距離なら半径、中点や比なら中線・二等分線を優先して疑う。@@

- 三辺から等距離 → 角の二等分線 → 内心
- 三頂点から等距離 → 垂直二等分線 → 外心
- 中点や面積二等分 → 中線 → 重心
- 高さや直角 → 垂線 → 垂心
- 対辺の分割比 → 角の二等分線定理
`,
  },
  {
    slug: "stars-and-bars",
    title: "重複組合せの魔法 ― ○と仕切り",
    unit: "場合の数と確率",
    summary:
      "x+y+z=10 の整数解を一瞬で。○と｜の対応で「分ける」を「並べる」に翻訳する。",
    relatedProblemSlugs: ["combinations-with-repetition"],
    tags: ["重複組合せ", "数え上げ", "組合せ"],
    content: r`## 「区別できないモノ」をどう数える？

$x+y+z=10$ をみたす **負でない整数**の組 $(x,y,z)$ を数える――一見、難しそうです。$x,y,z$ は $0$ でもよく、組合せは膨大にありそう。

でも、見方をひとつ変えるだけで一瞬で解けます。

## ○（マル）と ｜（仕切り）の対応

$10$ 個の同じ「○」を一列に並べ、その間に **2 本の仕切り ｜** を入れて 3 つのグループに分けます。

$$\bigcirc\bigcirc\bigcirc\ \big|\ \bigcirc\bigcirc\ \big|\ \bigcirc\bigcirc\bigcirc\bigcirc\bigcirc$$

左から順に、仕切りで区切られた○の個数が $x,\ y,\ z$。上の図は $(x,y,z)=(3,2,5)$ を表します。仕切りを動かせば、別の解が現れます。

> **ポイント:** 仕切りの入れ方ひとつひとつが、方程式の解ひとつひとつに **過不足なく 1 対 1 で** 対応する。だから「解の個数」＝「仕切りの入れ方の個数」。

## 数えるのは「並べ方」だけ

こうなれば、数えるのは **○ 10 個と ｜ 2 個、合計 12 個の並べ方**。12 個の場所から、どの 2 か所を仕切りにするかを選ぶだけなので

$$\binom{12}{2}=\frac{12\cdot 11}{2\cdot 1}=66.$$

一般に、$n$ 種類のものから重複を許して $r$ 個選ぶ **重複組合せ** の総数は

$$\binom{n+r-1}{r}.$$

ここでは $n=3$（箱の種類）、$r=10$（○の個数）で $\binom{3+10-1}{10}=\binom{12}{10}=\binom{12}{2}=66$ と一致します。

## 二項係数を体で覚える

組合せ $\binom{n}{k}$ は、パスカルの三角形のマスそのもの。下のラボで「あるマス＝左上＋右上」という構造を確かめましょう。重複組合せの計算も、結局この二項係数に落ちます。

@@lab:pascal-triangle|各マスが組合せ C(n,k)。スライダーで加法定理を確認しよう。@@

## まとめ

- 「分ける」問題は、「○と｜を**並べる**」問題に翻訳できる。
- 重複組合せ $=\dbinom{n+r-1}{r}$。
- 翻訳の鍵は **1 対 1 対応**。数えにくいものを、数えやすいものに写すのが組合せ論の心臓部。`,
  },

  {
    slug: "false-positive-paradox",
    title: "条件付き確率の直感のズレ ― 偽陽性の罠",
    unit: "場合の数と確率",
    summary:
      "99% 正確な検査で陽性でも、本当に病気とは限らない。基準率を忘れると直感は壊れる。",
    relatedProblemSlugs: ["bayes-disease-test"],
    tags: ["条件付き確率", "ベイズの定理"],
    content: r`## 「99% 正確」のはずなのに

ある病気は **1 万人に 1 人**。検査は、病気の人を $99\%$ 正しく陽性に、健康な人を $99\%$ 正しく陰性にします（誤りは $1\%$）。

あなたは陽性でした。本当に病気である確率は？――多くの人が「$99\%$」と答えます。でも実際は **約 $1\%$**。なぜでしょう。

## 人数で考えるとカラクリが見える

$100$ 万人で考えます。

- **病気の人**：$100$ 人。そのうち陽性は $99\%$ で **約 $99$ 人**（真陽性）。
- **健康な人**：$999900$ 人。そのうち $1\%$ が誤って陽性 → **約 $9999$ 人**（偽陽性）。

陽性になった人は合計 $99+9999=10098$ 人。そのうち本当に病気なのは $99$ 人だけ。

$$\frac{99}{10098}\approx 0.0098 = 0.98\%.$$

健康な人が圧倒的に多いので、$1\%$ の誤判定でも **偽陽性の数が真陽性を大きく上回る**のです。

> **基準率の誤謬 (base rate fallacy):** 「検査の精度」だけを見て、「もともと病気の人がどれだけ少ないか（基準率）」を忘れると、確率を大きく見誤る。

## ベイズの定理で式にする

病気を $D$、陽性を $P$ とすると、

$$P(D\mid P)=\frac{P(P\mid D)\,P(D)}{P(P\mid D)\,P(D)+P(P\mid \overline{D})\,P(\overline{D})}.$$

数値を入れると

$$P(D\mid P)=\frac{0.99\times 0.0001}{0.99\times 0.0001+0.01\times 0.9999}\approx 0.0098.$$

分母の第 2 項（偽陽性）が支配的なのが一目で分かります。

## まとめ

- 「検査が当たる確率」と「陽性なら病気の確率」は**別物**。
- まれな事象では、わずかな誤判定が大量の偽陽性を生む。
- 迷ったら **人数（自然頻度）** に直すと直感が戻る。`,
  },

  {
    slug: "de-morgan-and-negation",
    title: "命題の否定とド・モルガンの法則",
    unit: "集合と命題",
    summary:
      "「かつ」の否定は「または」。「すべて」の否定は「ある」。否定はひっくり返す操作。",
    relatedProblemSlugs: ["logic-negation-de-morgan"],
    tags: ["命題の否定", "ド・モルガンの法則", "集合"],
    content: r`## 否定とは「ひっくり返す」操作

命題 $p$ の否定 $\overline{p}$ は「$p$ でない」。一見シンプルですが、$p$ が「かつ」「または」「すべて」「ある」を含むと、機械的なルールが必要になります。

## ド・モルガンの法則

「かつ」と「または」は、否定でちょうど **入れ替わります**。

$$\overline{p \land q}=\overline{p}\ \lor\ \overline{q},\qquad \overline{p \lor q}=\overline{p}\ \land\ \overline{q}.$$

集合で書くと、補集合をとると $\cap$ と $\cup$ が入れ替わるのと同じこと：

$$\overline{A\cap B}=\overline{A}\cup\overline{B},\qquad \overline{A\cup B}=\overline{A}\cap\overline{B}.$$

> **直感:** 「A かつ B」が成り立たない $\iff$ 「A が欠けている」または「B が欠けている」。どちらか一方でも崩れれば、「かつ」は崩れる。

## 全称と存在もひっくり返る

「すべて」と「ある」も、否定で入れ替わります。

$$\overline{(\forall x\ P(x))}=\exists x\ \overline{P(x)},\qquad \overline{(\exists x\ P(x))}=\forall x\ \overline{P(x)}.$$

たとえば「**すべての**生徒が合格した」の否定は「**ある**生徒は合格しなかった」。全員ではなく、**反例が 1 つあれば**否定は成り立ちます。

## 例で練習

命題：「$x>0$ **かつ** $y>0$」。この否定は？

機械的に当てはめると

$$\overline{(x>0)\ \land\ (y>0)}=(x\le 0)\ \lor\ (y\le 0).$$

「両方が正」の否定は「少なくとも一方が $0$ 以下」。$x>0$ の否定が $x\le 0$（$<$ ではなく $\le$）である点に注意。

## まとめ

- 否定は **$\land \leftrightarrow \lor$**、**$\forall \leftrightarrow \exists$** を入れ替える。
- 不等号の否定は境界を含む側へ：$>$ の否定は $\le$。
- 「すべて」を崩すには **反例 1 つ**で十分。`,
  },

  // ===================== キラー授業（難問対策・解法戦略） =====================
  {
    slug: "mathematical-induction-patterns",
    title: "数学的帰納法の 3 つの型",
    unit: "難問対策・解法戦略",
    summary:
      "基本型・2 項間型・累積型（強い帰納法）。倒すべきドミノに必要な「仮定」が型で変わる。",
    relatedProblemSlugs: ["induction-sum-cubes"],
    tags: ["数学的帰納法", "漸化式", "解法戦略"],
    content: r`## ドミノ倒しとしての帰納法

数学的帰納法は「ドミノ倒し」です。$P(n)$ を「$n$ 番目のドミノが倒れる」とみなすと、

- **(i) 出発点**：1 番目が倒れる（$P(1)$ が真）。
- **(ii) 連鎖**：あるドミノが倒れれば次も倒れる。

この (ii) の「どのドミノが倒れていれば次が倒せるか」によって、帰納法には 3 つの型があります。

@@lab:domino-induction-visualizer@@

## ① 基本型：$P(k)\Rightarrow P(k+1)$

最も普通の形。$P(k)$ ただ 1 つを仮定して $P(k+1)$ を導く。和の公式 $\displaystyle\sum_{i=1}^{n}i^3=\left(\frac{n(n+1)}{2}\right)^2$ などはこれ。

## ② 2 項間型：$P(k),P(k+1)\Rightarrow P(k+2)$

3 項間漸化式 $a_{n+2}=p\,a_{n+1}+q\,a_n$ のように、**直前の 2 つ**を仮定しないと次が出ない場合。出発点も $P(1),P(2)$ の **2 つ**を確かめる必要があります。

> **注意:** 仮定が 2 つ必要なら、土台も 2 つ。倒す前のドミノが 2 枚そろって初めて次が倒れる、とイメージする。

## ③ 累積型（強い帰納法）：$P(1),\dots,P(k)\Rightarrow P(k+1)$

$1$ から $k$ までの**すべて**を仮定してよい型。「$2$ 以上の整数は素数の積で表せる」の証明では、$n$ を $n=ab$ と分けたとき $a,b<n$ の両方に仮定を使うので、この型が必要です。

## まとめ

| 型 | 仮定 | 出発点 |
| --- | --- | --- |
| 基本型 | $P(k)$ | $P(1)$ |
| 2 項間型 | $P(k),P(k+1)$ | $P(1),P(2)$ |
| 累積型 | $P(1)\dots P(k)$ | $P(1)$ |

**必要な仮定の数だけ、出発点も確かめる**——これが帰納法を破綻させないための鉄則です。`,
  },

  {
    slug: "geometry-strategy-three-weapons",
    title: "図形問題への 3 つのアプローチ",
    unit: "難問対策・解法戦略",
    summary:
      "初等幾何・座標・ベクトル。同じ図形を 3 つのレンズで見て、最短の武器を選ぶ。",
    relatedProblemSlugs: ["ceva-theorem", "routh-one-seventh"],
    tags: ["初等幾何", "座標", "ベクトル", "解法戦略"],
    content: r`## 同じ図形を 3 つのレンズで

難関大の図形問題は、解法の選択がすべてです。武器は大きく 3 つ。

@@lab:geometry-three-lenses@@

## ① 初等幾何のレンズ

円周角・相似・チェバ／メネラウス・三平方など、**図形そのものの性質**で押す。計算が最も軽く、本質を突くと一瞬で終わる。ただし「補助線がひらめくか」に依存する。

- 向いている：角度・比・共円・接線がからむ問題。

## ② 座標のレンズ

適切に**座標軸を設定**し、点を $(x,y)$ で表して計算に持ち込む。ひらめき不要で、軌跡・通過領域・最大最小に強い。

- コツ：対称性を活かして原点・軸を置く。$\mathrm A(0,0),\ \mathrm B(b,0)$ のように 0 を増やす。
- 向いている：軌跡、長さ・面積の最大最小、3 点が一直線などの条件。

## ③ ベクトルのレンズ

点を**位置ベクトル**で表し、内分・重心・内積（垂直・長さ）で処理する。座標を置かずに一般性を保てるのが強み。

$$\vec{\mathrm{OG}}=\frac{\vec{\mathrm{OA}}+\vec{\mathrm{OB}}+\vec{\mathrm{OC}}}{3}\quad(\text{重心}),\qquad \vec a\cdot\vec b=0\iff \vec a\perp\vec b.$$

- 向いている：内分点・重心・「一直線」「平行」、空間図形。

## 選び方の指針

> 角度・比 → **初等幾何**、軌跡・最大最小 → **座標**、内分・重心・空間 → **ベクトル**。
> 詰まったら**レンズを替える**。1 つの武器に固執しないことが、難問を解く最大のコツ。`,
  },

  {
    slug: "cauchy-schwarz-inequality",
    title: "コーシー・シュワルツの不等式の真の姿",
    unit: "難問対策・解法戦略",
    summary:
      "(Σaₖbₖ)² ≤ (Σaₖ²)(Σbₖ²)。判別式で証明し、内積として読む万能不等式。",
    relatedProblemSlugs: ["cauchy-schwarz-two", "sum-squares-lower-bound"],
    tags: ["コーシー・シュワルツの不等式", "不等式の証明", "内積", "解法戦略"],
    content: r`## 万能の不等式

実数 $a_1,\dots,a_n,\ b_1,\dots,b_n$ に対し、

$$\left(\sum_{k=1}^{n}a_k b_k\right)^2\le\left(\sum_{k=1}^{n}a_k^2\right)\left(\sum_{k=1}^{n}b_k^2\right).$$

等号は $(a_k)$ と $(b_k)$ が**比例**するとき。これがコーシー・シュワルツの不等式です。

## 判別式による証明

任意の実数 $t$ について
$$g(t)=\sum_{k=1}^{n}(a_k t+b_k)^2\ge0$$
は、$2$ 乗の和なので非負。これを展開すると $t$ の 2 次式
$$g(t)=\left(\sum a_k^2\right)t^2+2\left(\sum a_k b_k\right)t+\sum b_k^2.$$
$\sum a_k^2>0$（自明な場合を除く）で、すべての $t$ で $g(t)\ge0$ だから判別式 $\le0$：
$$\left(\sum a_k b_k\right)^2-\left(\sum a_k^2\right)\left(\sum b_k^2\right)\le0.$$
これが主張そのもの。等号は $g(t_0)=0$ となる $t_0$、すなわち全 $k$ で $a_k t_0+b_k=0$、つまり比例関係のとき。$\blacksquare$

## ベクトルとして読む

$n=2,3$ では $\vec a\cdot\vec b=|\vec a||\vec b|\cos\theta$ より $|\vec a\cdot\vec b|\le|\vec a||\vec b|$。これがコーシー・シュワルツの幾何的な顔です。下のラボで、内積と平行四辺形の面積（差の部分）を動かして確かめましょう。

@@lab:cauchy-schwarz-vectors@@

## 使いどころ

- $a^2+b^2+c^2\ge\dfrac{(a+b+c)^2}{3}$（$b_k=1$ とする）。
- $\left(\dfrac1x+\dfrac1y+\dfrac1z\right)(x+y+z)\ge9$。
- 「2 乗の和」と「積の和」が同時に現れたら、まずこの不等式を疑う。`,
  },

  {
    slug: "trig-reduction-formulas",
    title: "三角関数の還元公式と単位円の対称性",
    unit: "難問対策・解法戦略",
    summary:
      "π/2±θ, π±θ, −θ。暗記でなく、単位円の回転と折り返しで一瞬で復元する。",
    relatedProblemSlugs: ["trig-obtuse-values", "trig-equation-quadratic"],
    tags: ["還元公式", "単位円", "三角関数", "解法戦略"],
    content: r`## 還元公式は暗記しない

$\sin(\pi-\theta),\ \cos\!\left(\dfrac{\pi}{2}+\theta\right)$ … 種類が多くて覚えきれない、という人へ。単位円の**対称性**で一瞬で復元できます。

@@lab:trig-unit-circle-transform@@

## 2 つのルールに圧縮する

角 $\theta$ の点を $\mathrm P(\cos\theta,\sin\theta)$ とする。

- **$\pi\pm\theta,\ -\theta$（$\pi$ の整数倍だけずらす）**：関数名は**そのまま**、符号だけ単位円の象限で決める。
  $$\sin(\pi-\theta)=\sin\theta,\quad\cos(\pi-\theta)=-\cos\theta,\quad\cos(\pi+\theta)=-\cos\theta.$$
- **$\dfrac{\pi}{2}\pm\theta$（直角だけずらす）**：$\sin\leftrightarrow\cos$ が**入れ替わる**、符号は象限で決める。
  $$\sin\!\left(\frac{\pi}{2}-\theta\right)=\cos\theta,\quad\cos\!\left(\frac{\pi}{2}+\theta\right)=-\sin\theta.$$

> **合言葉:** 「$\pi$ 系はそのまま、$\dfrac{\pi}{2}$ 系は入れ替え。符号は単位円の絵で。」

## なぜ入れ替わるのか

$\dfrac{\pi}{2}-\theta$ は直角三角形の「もう一方の鋭角」。だから対辺と隣辺が入れ替わり、$\sin$ と $\cos$ が交換します。$\pi-\theta$ は $y$ 軸対称なので $x=\cos$ だけ符号が変わる——ラボで点 $\mathrm P$ がどこへ移るかを見れば、公式は「思い出す」ものではなく「読み取る」ものになります。`,
  },

  {
    slug: "vector-linear-independence",
    title: "ベクトルの 1 次独立と斜交座標",
    unit: "難問対策・解法戦略",
    summary:
      "1 次独立な 2 つのベクトルは平面の「斜めの座標軸」。係数の一意性が証明の武器に。",
    relatedProblemSlugs: ["vector-region-area", "foot-of-perpendicular-vector"],
    tags: ["1次独立", "斜交座標", "位置ベクトル", "解法戦略"],
    content: r`## 基底は「斜めの座標軸」

平面の 2 つのベクトル $\vec{e_1},\vec{e_2}$ が **1 次独立**（平行でない、$\vec{e_1}\neq\vec0,\ \vec{e_2}\neq\vec0$ かつ $\vec{e_2}\neq k\vec{e_1}$）であるとは、平面上のどんなベクトルも
$$\vec p=s\,\vec{e_1}+t\,\vec{e_2}$$
の形に**ただ一通り**で表せること。$\vec{e_1},\vec{e_2}$ は、直交とは限らない「斜めの座標軸」になります。

@@lab:oblique-coordinates@@

## 一意性こそが武器

1 次独立の最強の使い方は、**係数比較**です。

> $\vec{e_1},\vec{e_2}$ が 1 次独立なら、
> $$s\,\vec{e_1}+t\,\vec{e_2}=s'\,\vec{e_1}+t'\,\vec{e_2}\ \Longrightarrow\ s=s',\ t=t'.$$

なぜなら $(s-s')\vec{e_1}+(t-t')\vec{e_2}=\vec0$ で、もし $s\neq s'$ なら $\vec{e_1}=-\dfrac{t-t'}{s-s'}\vec{e_2}$ となって平行＝1 次従属に反するから。

この一意性で、「点 P が直線 AB 上 ⇔ 係数の和が 1」などの条件を**連立方程式**に翻訳できます。

## 1 次従属になると

ラボで $\vec{e_1}\parallel\vec{e_2}$ にすると（$\det(\vec{e_1},\vec{e_2})=0$）、グリッドが 1 本の直線に潰れます。平面全体を張れなくなり、表現の一意性も崩れる——これが「1 次従属」の正体です。`,
  },

  {
    slug: "logarithm-base-change",
    title: "対数の底の変換の本質",
    unit: "難問対策・解法戦略",
    summary:
      "底を変えても比は一定。log は『何倍に伸びたか』を測る共通のものさし。",
    relatedProblemSlugs: ["change-of-base", "log2-3-irrational"],
    tags: ["対数", "底の変換", "解法戦略"],
    content: r`## 底の変換公式

$$\log_a b=\frac{\log_c b}{\log_c a}\qquad(a,b,c>0,\ a\neq1,\ c\neq1).$$

これは「どの底 $c$ で測っても、比 $\dfrac{\log b}{\log a}$ は同じ値 $\log_a b$ になる」という主張です。

@@lab:log-scale-slider@@

## なぜ成り立つか

$x=\log_a b$ とおくと、定義より $a^x=b$。両辺の底 $c$ の対数をとると
$$\log_c(a^x)=\log_c b\ \Longrightarrow\ x\log_c a=\log_c b\ \Longrightarrow\ x=\frac{\log_c b}{\log_c a}.$$
$\blacksquare$

## 「ものさしの取り替え」として読む

$\log_c x$ は、$x$ が「$c$ を基準に何乗ぶんか」を測るものさし。底を $c$ から $c'$ に替えても、すべての目盛りが一律に $\dfrac{1}{\log_{c'}c}$ 倍されるだけ——だから**比は不変**で、それが $\log_a b$ です。ラボで底 $2,e,10$ の目盛りを見ると、同じ $x$ が常に一定の比で並ぶのが分かります。

## 実戦での使い方

- 底をそろえて計算：$\log_4 8=\dfrac{\log_2 8}{\log_2 4}=\dfrac32$。
- $\log_a b\cdot\log_b a=1$（互いに逆数）。
- $a^{\log_a x}=x$、$a^{\log_b x}=x^{\log_b a}$ などの変形の土台。

> **核心:** 対数の底は「ものさしの単位」にすぎない。変換公式は単位換算であり、$\log$ が測っている「伸びの度合い」そのものは底によらない。`,
  },
];

export const LESSONS_BY_SLUG: Record<string, Lesson> = indexByUniqueRegistryKey(
  LESSONS,
  (lesson) => lesson.slug,
  "LESSONS slug registry",
);
