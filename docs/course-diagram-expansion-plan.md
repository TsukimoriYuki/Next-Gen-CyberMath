# 数学講座 図解基盤拡張計画

作成日: 2026-06-18
対象: `docs/course-quality-audit-after-geometry.md` / `src/types/course.ts` / `src/components/courses/CourseDiagramBlock.tsx` / `src/data/courses/**`
目的: C ランク講座（図解が必要なのに図解がない単元）を S ランクへ近づけるため、追加すべき `diagramType` と図解テンプレートを設計する。**本レポートは設計のみ。新講座追加・既存講座の大規模修正・URL/slug 変更は行わない。**

---

## 1. 総評

`geometry-properties`（図形の性質）の S ランク化は、**「図解 SVG を `diagramType` 単位で追加していけば S に届く」という実装パターンが既に確立済み**であることを証明した。型（`DiagramType`）に文字列を1つ足し、`CourseDiagramBlock.tsx` のスイッチに React 関数を1つ足し、講座データで `kind: "diagram"` ブロックから参照するだけで、新しい図解が増える。**新しい仕組みは不要で、既存の器を素直に拡張すればよい。**

一方、監査レポートが示した通り、**図解は現在 `quadratic`（放物線系6種）と `geometry-properties`（幾何系15種）の2単元にしか存在しない**。三角関数・図形と方程式・微分積分・ベクトル・データの分析・平面上の曲線など、**図がなければ説明が成立しない単元がすべて C ランク**で止まっている。これらを S へ引き上げる最短ルートは、講座テキストの書き直しではなく、**汎用性の高い図解タイプを優先的に追加し、複数講座から使い回すこと**である。

設計上の重要な発見と方針:

- **現状の図解は「1 diagramType = 1 専用 React 関数」**（`CourseDiagramBlock.tsx` のスイッチ）。パラメータ化された汎用コンポーネントではない。今回の方針（大規模リファクタ禁止）に沿い、**この1対1パターンを維持して discrete に追加**する。ただし座標軸・グリッド・矢印マーカー・`AxisLabel`・配色定数（`BLUE`/`VIOLET`/`ROSE`/`EMERALD`/`AMBER`）は既に共通化されており、新規図解もこれを再利用すればコストは小さい。
- **SVG 内ラベルは plain text（KaTeX 非対応）**、`caption` のみ `CourseBodyRenderer` 経由で `$...$` 対応。よって図中の数式は `∠`・`²`・`√` 等の Unicode で書き、厳密な数式は caption に逃がす、という既存ルールを踏襲する。
- **最優先は「複数単元で使い回せる図解」**。`unit-circle`（三角関数＋図形と計量＋複素数平面の素地）、`tangent-line`（数学II微分＋数学III微分）、`integral-area`（数学II積分＋数学III積分）、二次曲線系（平面上の曲線＋数学III二次曲線）は、1つ作れば2科目以上を底上げできるため費用対効果が最大。
- **データの分析（共通テスト最頻出）と三角関数・図形と方程式（II・B・C の視覚3単元）**を最初の改善ターゲットにすると、影響範囲が広い。

---

## 2. 現在の DiagramType 一覧

`src/types/course.ts` の `DiagramType` union は **計21種**。すべて `CourseDiagramBlock.tsx` に専用 React 関数として実装済み。

### 二次関数系（6種）

| diagramType | 内容 | 使用単元 |
|---|---|---|
| `parabola-basic` | $y=x^2$ の基本形・開き方 | 二次関数 |
| `vertex-axis` | 頂点と軸の概念図 | 二次関数 |
| `completing-square-shift` | 平方完成による平行移動 | 二次関数 |
| `domain-max-min` | 定義域つき最大・最小 | 二次関数 |
| `axis-position-cases` | 軸が定義域の左・中・右の3ケース | 二次関数 |
| `case-split-flow` | 場合分けフローチャート | 二次関数 |

### 図形の性質系（15種）

| diagramType | 内容 | 使用単元 |
|---|---|---|
| `circle-inscribed-central-angle` | 円周角と中心角 | 図形の性質 |
| `circle-same-arc-angles` | 同じ弧を見る円周角 | 図形の性質 |
| `circle-tangent-chord-angle` | 接弦定理 | 図形の性質 |
| `geometry-ceva-theorem` | チェバの定理 | 図形の性質 |
| `geometry-menelaus-theorem` | メネラウスの定理 | 図形の性質 |
| `geometry-ceva-menelaus-compare` | チェバとメネラウスの比較 | 図形の性質 |
| `geometry-power-intersecting-chords` | 方べき（交わる2弦） | 図形の性質 |
| `geometry-power-two-secants` | 方べき（2本の割線） | 図形の性質 |
| `geometry-power-tangent-secant` | 方べき（接線と割線） | 図形の性質 |
| `geometry-centers-circum-incenter` | 外心と内心 | 図形の性質 |
| `geometry-centers-centroid-orthocenter` | 重心と垂心 | 図形の性質 |
| `geometry-centers-five-compare` | 五心の比較 | 図形の性質 |
| `geometry-cyclic-opposite-angles` | 内接四角形の対角 | 図形の性質 |
| `geometry-cyclic-exterior-angle` | 内接四角形の外角 | 図形の性質 |
| `geometry-cyclic-same-arc` | 内接四角形で同じ弧を見る角 | 図形の性質 |

**偏り**: 21種すべてが「二次関数」か「図形の性質」専用。**関数グラフ系（三角・指数対数・微積）・座標系（直線・円・領域・ベクトル）・統計系・二次曲線系は1種も無い。** これが C ランク単元を生んでいる根本原因。

---

## 3. 図解が不足している単元一覧

| 科目 | 単元 | 現状 | 必要な図解 | 優先度 |
|---|---|---|---|---|
| II・B・C | 三角関数 | C・図解0 | 単位円、sin/cos/tan グラフ、合成 | 最高 |
| II・B・C | 図形と方程式 | C・図解0 | 点と直線の距離、円と直線、軌跡、領域 | 最高 |
| I・A | 図形と計量 | C・図解0 | 直角三角形と三角比、正弦定理、余弦定理 | 最高 |
| I・A | データの分析 | C・図解0 | ヒストグラム、箱ひげ図、散布図・相関 | 最高 |
| II・B・C | 微分積分 | C・図解0 | 接線、増減表とグラフ、定積分の面積、2曲線間の面積 | 高 |
| II・B・C | ベクトル | B+・図解0 | 和差、内積と射影、位置ベクトル、空間ベクトル | 高 |
| II・B・C | 平面上の曲線 | C・図解0 | 放物線・楕円・双曲線、媒介変数、極座標 | 高 |
| II・B・C | 指数・対数関数 | B+・図解0 | 指数関数・対数関数のグラフ（指数⇔対数の対称） | 中 |
| II・B・C | 統計的な推測 | B・図解0 | 正規分布、標準化、信頼区間、棄却域 | 中 |
| I・A | 二次関数 | A・図解6 | 放物線と直線の共有点（追加余地） | 低 |
| III・C | 極限 | D（空） | 関数の極限・漸近線（立ち上げ時） | 高 |
| III・C | 微分法 | D（空） | 接線・増減凹凸・変曲点（立ち上げ時） | 高 |
| III・C | 積分法 | D（空） | 面積・回転体の体積（立ち上げ時） | 高 |
| III・C | 複素数平面 | D（空） | 極形式・回転（立ち上げ時） | 高 |
| III・C | 二次曲線 | D（空） | 楕円・双曲線・放物線（立ち上げ時） | 高 |
| III・C | 媒介変数・極座標 | D（空） | 媒介変数曲線・極座標（立ち上げ時） | 高 |

---

## 4. 追加すべき diagramType 一覧

> 命名は既存規約に合わせ kebab-case。関数系・座標系・統計系・二次曲線系・数学III系でプレフィックスを揃える。**★は複数単元で再利用できる高優先タイプ。**

| 優先度 | diagramType候補 | 対象単元 | 図解内容 | 理由 |
|---|---|---|---|---|
| ★最高 | `unit-circle` | 三角関数 / 図形と計量 / 複素数平面 | 単位円と sin・cos の座標、符号の象限 | 三角関数の中核。複数単元で再利用 |
| 最高 | `trig-graph-sincos` | 三角関数 | $y=\sin x$, $y=\cos x$ の周期グラフ | 周期・位相は図なしで理解不可 |
| 高 | `trig-graph-tan` | 三角関数 | $y=\tan x$ と漸近線 | 漸近線の視覚化 |
| 高 | `trig-synthesis` | 三角関数 | 合成 $a\sin\theta+b\cos\theta$ のベクトル的意味 | 合成の直感 |
| ★最高 | `right-triangle-trig` | 図形と計量 | 直角三角形と sin/cos/tan の辺の対応 | 三角比の定義そのもの |
| 最高 | `triangle-sine-rule` | 図形と計量 | 正弦定理（外接円と辺・角） | 定理の図解 |
| 最高 | `triangle-cosine-rule` | 図形と計量 | 余弦定理（3辺と挟角） | 定理の図解 |
| ★最高 | `point-line-distance` | 図形と方程式 | 点から直線への垂線距離 | 距離公式の意味 |
| ★最高 | `circle-line-position` | 図形と方程式 / 二次関数 | 円と直線の位置（交わる/接する/離れる） | 判別式・距離との対応 |
| 最高 | `locus-diagram` | 図形と方程式 | 軌跡（条件を満たす点の集合） | 軌跡は視覚が本質 |
| ★最高 | `region-inequality` | 図形と方程式 | 不等式の表す領域（網掛け） | 領域は図なしでは伝わらない |
| ★最高 | `tangent-line` | 微分法(II) / 微分法(III) | 接線の傾き＝微分係数 | 微分の幾何的意味。2科目で再利用 |
| 高 | `increasing-decreasing` | 微分法 | 増減表とグラフの対応・極値 | 増減表の意味づけ |
| ★最高 | `integral-area` | 積分法(II) / 積分法(III) | 定積分＝x軸との面積 | 積分の幾何的意味。2科目で再利用 |
| 高 | `area-between-curves` | 積分法 | 2曲線で囲まれた面積（上−下） | 面積計算の典型 |
| ★最高 | `vector-add-sub` | ベクトル | 和・差・実数倍の平行四辺形 | ベクトル演算の基礎 |
| 高 | `vector-dot-projection` | ベクトル | 内積と正射影 | 内積の幾何的意味 |
| 高 | `position-vector` | ベクトル | 位置ベクトルと内分・外分点 | 内分点公式の視覚化 |
| 中 | `space-vector` | ベクトル | 空間座標とベクトル | 空間把握 |
| 最高 | `histogram` | データの分析 | ヒストグラムと度数 | 共通テスト頻出 |
| 最高 | `boxplot` | データの分析 | 箱ひげ図と四分位数 | 共通テスト頻出 |
| 高 | `scatter-correlation` | データの分析 | 散布図と相関（正/負/無相関） | 相関の読み取り |
| 中 | `exp-log-graph` | 指数・対数関数 | 指数関数と対数関数の対称グラフ | $y=x$ 対称の理解 |
| 中 | `normal-distribution` | 統計的な推測 | 正規分布曲線と面積 | 確率を面積で捉える |
| 中 | `standardization` | 統計的な推測 | 標準化（分布の重ね合わせ） | 標準化の意味 |
| 中 | `confidence-interval` | 統計的な推測 | 信頼区間の帯 | 区間推定の視覚化 |
| 中 | `rejection-region` | 統計的な推測 | 仮説検定の棄却域 | 検定の判断基準 |
| ★高 | `conic-ellipse` | 平面上の曲線 / 二次曲線(III) | 楕円と2焦点 | 2科目で再利用 |
| ★高 | `conic-hyperbola` | 平面上の曲線 / 二次曲線(III) | 双曲線と漸近線 | 2科目で再利用 |
| ★高 | `conic-parabola-focus` | 平面上の曲線 / 二次曲線(III) | 放物線と焦点・準線 | 2科目で再利用 |
| 高 | `parametric-curve` | 平面上の曲線 / 媒介変数(III) | 媒介変数表示の軌跡 | 媒介変数の理解 |
| 高 | `polar-coordinates` | 平面上の曲線 / 極座標(III) | 極座標 $(r,\theta)$ と極方程式 | 極座標の基礎 |
| 高 | `complex-plane-rotation` | 複素数平面(III) | 複素数の極形式と回転 | 数学C主要 |
| 中 | `limit-asymptote` | 極限(III) | 関数の極限と漸近線 | 極限の視覚化 |
| 中 | `solid-of-revolution` | 積分法の応用(III) | 回転体の体積 | 体積積分の理解 |

---

## 5. 最初に追加すべき diagramType Top 10

評価基準（① 複数講座で使い回せるか ② 受験生の理解に直結するか ③ C ランクの原因を解消するか ④ 図なしでは説明が弱いか ⑤ 実装コスト対効果）で順位付け。

| 順位 | diagramType | 主効果 | 再利用 |
|---|---|---|---|
| 1 | `unit-circle` | 三角関数 C→改善の起点。図形と計量・複素数平面にも波及 | ◎ 3単元 |
| 2 | `right-triangle-trig` | 図形と計量 C→改善。三角比の定義図 | ○ |
| 3 | `tangent-line` | 微分積分 C→改善。微分の幾何的意味 | ◎ II/III 2科目 |
| 4 | `integral-area` | 微分積分 C→改善。積分の幾何的意味 | ◎ II/III 2科目 |
| 5 | `trig-graph-sincos` | 三角関数の周期・位相理解 | ○ |
| 6 | `circle-line-position` | 図形と方程式 C→改善。判別式・距離の対応 | ○ 二次関数にも |
| 7 | `region-inequality` | 図形と方程式 C→改善。領域は図が本質 | ○ |
| 8 | `boxplot` | データの分析 C→改善。共通テスト最頻出 | ○ |
| 9 | `histogram` | データの分析 C→改善。共通テスト頻出 | ○ |
| 10 | `vector-add-sub` | ベクトル B+→A。演算の基礎図 | ○ |

この10種で、**C ランク6単元（三角関数・図形と方程式・図形と計量・データの分析・微分積分・平面上の曲線の一部）のうち5単元に最初の図解が入る**。

---

## 6. 最初にSランク化すべき講座 Top 10

> 各単元の代表講座（実在の `lessonTitle`）を、図解1〜3枚の追加で S 基準（図解・読み替え表・段階別例題・NG/OK誤答・確認3問は既存）へ引き上げる。

| 順位 | 科目 | 単元 | 講座名 | 必要な図解 | 改善理由 |
|---|---|---|---|---|---|
| 1 | II・B・C | 三角関数 | 三角比から三角関数へ | `unit-circle` | 単位円なしでは三角関数の定義が成立しない |
| 2 | II・B・C | 三角関数 | 三角関数のグラフ | `trig-graph-sincos`, `trig-graph-tan` | グラフ単元なのにグラフ図が無い |
| 3 | I・A | 図形と計量 | 三角比とは何か | `right-triangle-trig` | 三角比は図とセットで定義される |
| 4 | I・A | 図形と計量 | 正弦定理と余弦定理 | `triangle-sine-rule`, `triangle-cosine-rule` | 定理の図解が必須 |
| 5 | I・A | データの分析 | 四分位数と箱ひげ図 | `boxplot` | 箱ひげ図の講座に箱ひげ図が無い |
| 6 | I・A | データの分析 | 散布図と相関 | `scatter-correlation` | 散布図の講座に散布図が無い |
| 7 | II・B・C | 図形と方程式 | 円と直線の位置関係 | `circle-line-position` | 位置関係は図で判定する |
| 8 | II・B・C | 図形と方程式 | 軌跡と領域 | `locus-diagram`, `region-inequality` | 軌跡・領域は視覚が本質 |
| 9 | II・B・C | 微分積分 | 接線の方程式 | `tangent-line` | 接線の傾き＝微分係数を図で |
| 10 | II・B・C | 微分積分 | 面積計算とグラフの上下 | `integral-area`, `area-between-curves` | 「グラフの上下」を図で示す必要 |

---

## 7. 単元別の図解テンプレート案

> 共通仕様: `viewBox` は横240〜345程度、背景 `#f8fafc` の角丸 rect、軸は `#94a3b8`、グリッド `#e2e8f0`。配色は既存定数（強調=`BLUE`、補助=`VIOLET`、注意/誤答=`ROSE`、正/領域=`EMERALD`、移動/補足=`AMBER`）。図中ラベルは Unicode、厳密な数式は caption（`$...$`）へ。

### 7.1 二次関数（既存A・追加余地）
- `parabola-line-intersection`: 放物線と直線の共有点（判別式 D>0/=0/<0 の3状態）。`circle-line-position` と設計を揃え、図形と方程式へも転用。

### 7.2 図形と計量
- `right-triangle-trig`: 直角三角形に斜辺・対辺・隣辺を色分けし、sin=対/斜・cos=隣/斜・tan=対/隣を矢印で対応。
- `triangle-sine-rule`: 三角形＋外接円。$\dfrac{a}{\sin A}=2R$ を辺 $a$・角 $A$・半径 $R$ で図示。
- `triangle-cosine-rule`: 3辺 $a,b,c$ と挟角 $C$ を強調。$c^2=a^2+b^2-2ab\cos C$。

### 7.3 三角関数
- `unit-circle`: 半径1の円、角 $\theta$、点 $(\cos\theta,\sin\theta)$、4象限の符号。三角比→三角関数の橋渡し。
- `trig-graph-sincos`: $y=\sin x$（青）と $y=\cos x$（紫）を $0$〜$2\pi$ で重ね、周期 $2\pi$・位相差を明示。
- `trig-graph-tan`: $y=\tan x$ と $x=\pi/2$ の漸近線（破線）。
- `trig-synthesis`: $a\sin\theta+b\cos\theta$ をベクトル合成（直角三角形で振幅 $\sqrt{a^2+b^2}$・位相 $\alpha$）。

### 7.4 図形と方程式
- `point-line-distance`: 点 $P$ から直線への垂線、距離 $d=\dfrac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$。
- `circle-line-position`: 円と直線を3状態（2交点・接する・共有点なし）並置。中心からの距離 $d$ と半径 $r$ の大小。
- `locus-diagram`: 条件（例: 2定点から等距離）を満たす点の軌跡を強調線で。
- `region-inequality`: $y>$（直線）や円の内外を `EMERALD` 半透明で網掛け、境界の実線/破線を区別。

### 7.5 微分法
- `tangent-line`: 曲線上の点での接線、傾き＝$f'(a)$。割線→接線の極限イメージを併記可。
- `increasing-decreasing`: グラフと増減表（+/−と矢印）を上下に対応させ、極大・極小を点で。

### 7.6 積分法
- `integral-area`: 曲線と x 軸で囲む領域を網掛け、$\int_a^b f(x)\,dx$ ＝面積。
- `area-between-curves`: 上の曲線 $f$ と下の曲線 $g$、差 $f-g$ の領域を網掛け。交点を強調。

### 7.7 ベクトル
- `vector-add-sub`: $\vec{a}+\vec{b}$ の平行四辺形と $\vec{a}-\vec{b}$ の差。始点を揃えた矢印。
- `vector-dot-projection`: $\vec{a}$ への $\vec{b}$ の正射影、$\vec{a}\cdot\vec{b}=|\vec{a}||\vec{b}|\cos\theta$。
- `position-vector`: 内分点 $\dfrac{m\vec{b}+n\vec{a}}{m+n}$ を線分上の点で。
- `space-vector`: 3D 座標軸（斜め投影）と空間ベクトル。

### 7.8 統計
- `histogram`: 階級と度数の棒、最頻値・中央値の位置。
- `boxplot`: 最小・第1四分位・中央・第3四分位・最大の箱とひげ。
- `scatter-correlation`: 正の相関・負の相関・無相関の3パネル。
- `normal-distribution` / `standardization` / `confidence-interval` / `rejection-region`: 正規分布曲線をベースに、面積・標準化・区間帯・棄却域（両側/片側）を網掛けで表現（統計的な推測）。

### 7.9 数学III・C（立ち上げ時に図解込みで設計）
- `conic-ellipse` / `conic-hyperbola` / `conic-parabola-focus`: 二次曲線＋焦点・準線・漸近線。**平面上の曲線（II・B・C）と共用**。
- `parametric-curve`: 媒介変数 $t$ の進行に沿った軌跡（矢印で向き）。
- `polar-coordinates`: 極 $(r,\theta)$ と代表的な極方程式（円・カージオイド等）。
- `complex-plane-rotation`: 複素数平面で $z$ の極形式、$\times(\cos\theta+i\sin\theta)$ による回転。
- `limit-asymptote`: 漸近線への近づき方（極限）。
- `solid-of-revolution`: x 軸まわりの回転体と断面の円。

---

## 8. 図解SVG実装の共通ルール

既存 `CourseDiagramBlock.tsx` の慣習をルール化する。新規図解はこれに従うことで品質と保守性を保つ。

1. **追加手順は3点セット**: ① `course.ts` の `DiagramType` union に文字列追加 → ② `CourseDiagramBlock.tsx` に専用関数を追加しスイッチに `case` 追加 → ③ 講座データで `kind: "diagram"`／`diagramType`／`caption` を持つブロックから参照。**新しい型・新しい仕組みは作らない。**
2. **配色は既存定数を再利用**: `BLUE`(#2563eb 主役)、`VIOLET`(#7c3aed 補助・軸)、`ROSE`(#e11d48 注意・誤答・端点)、`EMERALD`(#059669 正・領域・定義域)、`AMBER`(#d97706 移動・強調弧)、`AXIS_COLOR`/`GRAY`(#94a3b8)、`TEXT_COLOR`(#475569)。新色は原則追加しない。
3. **レイアウト**: 背景は `<rect rx="12" fill="#f8fafc">`。`viewBox` は幅240〜345・高さ135〜210目安。`width="100%"` でレスポンシブ。グリッド `#e2e8f0`、軸 `#94a3b8` ＋矢じり `<polygon>`。
4. **SVG 内ラベルは plain text**（KaTeX 非対応）。`∠`・`²`・`√`・`π`・`≤` 等の Unicode を使う。`AxisLabel` ヘルパ（fontSize 9、`anchor` 指定可）または `<text>` を使用。
5. **厳密な数式は caption へ**。`caption` は `CourseBodyRenderer` 経由で `$...$` が描画される。図は直感、caption は正確な式、という役割分担。
6. **`aria-label` を必ず付与**（アクセシビリティ。既存全図解が遵守）。
7. **スマホ最優先**: 文字は小さめ（7〜10px）、要素を詰め込みすぎない。1図1メッセージ。複数概念は「比較図」（例 `geometry-centers-five-compare`）のようにパネル分割。
8. **再利用設計**: 2科目以上で使う図（`tangent-line`・`integral-area`・`conic-*`）は、特定の数値に依存しない汎用的な構図にして両単元の caption から使い回す。
9. **`marker`（矢印）の id は衝突回避**のためプレフィックス付き（既存例: `course-shift-arrow`・`course-flow-arrow`）。
10. **検証**: 追加後は `npm run lint` / `npm run build` が通ることを確認（静的生成でレンダリングされるため型・JSX エラーは即検出される）。

---

## 9. 実装ロードマップ

### Phase 1: 汎用図解タイプを追加（再利用性最優先）
`unit-circle` / `tangent-line` / `integral-area` / `right-triangle-trig` / `circle-line-position` を実装。1つで2科目以上に効く順。`course.ts` ＋ `CourseDiagramBlock.tsx` への追加のみで、講座データ参照は Phase 2 以降。

### Phase 2: 数学I・AのCランク講座を改善
- 図形と計量: `right-triangle-trig`・`triangle-sine-rule`・`triangle-cosine-rule` を該当講座へ。
- データの分析: `histogram`・`boxplot`・`scatter-correlation` を該当講座へ。
- → 図形と計量・データの分析を C→A/S へ。

### Phase 3: 数学II・B・Cの視覚単元を改善
- 三角関数: `unit-circle`・`trig-graph-sincos`・`trig-graph-tan`・`trig-synthesis`。
- 図形と方程式: `point-line-distance`・`circle-line-position`・`locus-diagram`・`region-inequality`。
- 微分積分: `tangent-line`・`increasing-decreasing`・`integral-area`・`area-between-curves`。
- ベクトル: `vector-add-sub`・`vector-dot-projection`・`position-vector`・`space-vector`。
- 指数対数: `exp-log-graph`。統計的な推測: `normal-distribution` ほか。

### Phase 4: 数学III・C立ち上げ時に図解込みで作成
- 平面上の曲線（II・B・C）と共用する `conic-ellipse`・`conic-hyperbola`・`conic-parabola-focus`・`parametric-curve`・`polar-coordinates` を先に整備。
- 数学III立ち上げ時は `complex-plane-rotation`・`limit-asymptote`・`solid-of-revolution` を追加し、**最初から図解込みで S 基準の講座として作る**（後付けの図解化を避ける）。

---

## 10. まとめ

- **作成レポート**: `docs/course-diagram-expansion-plan.md`
- **現在の diagramType 数**: **21種**（二次関数系6・図形の性質系15）。すべて `CourseDiagramBlock.tsx` に専用 React 関数として実装済み。関数グラフ・座標・統計・二次曲線系はゼロ。
- **追加すべき diagramType Top 10**: `unit-circle` / `right-triangle-trig` / `tangent-line` / `integral-area` / `trig-graph-sincos` / `circle-line-position` / `region-inequality` / `boxplot` / `histogram` / `vector-add-sub`。
- **最初にSランク化すべき講座 Top 10**: 三角関数「三角比から三角関数へ」「三角関数のグラフ」／図形と計量「三角比とは何か」「正弦定理と余弦定理」／データの分析「四分位数と箱ひげ図」「散布図と相関」／図形と方程式「円と直線の位置関係」「軌跡と領域」／微分積分「接線の方程式」「面積計算とグラフの上下」。
- **最優先で改善すべき単元**: 三角関数・図形と方程式（II・B・C）／図形と計量・データの分析（I・A）。いずれも図解ゼロが C ランクの直接原因で、Top10 の diagramType でほぼ解消できる。
- **設計上の結論**: 仕組みは既に完成している（型1行＋React関数1つ＋データ参照）。あとは **再利用性の高い図解タイプから順に discrete に追加する**だけで、C ランク単元を S へ引き上げられる。大規模リファクタは不要。

### 検証結果
- `npm run lint` → **0 errors**（19 warnings、すべて講座データ・図解コンポーネント外の未使用変数）。
- `npm run build` → **✓ Compiled successfully**、静的生成 1144/1144 成功。本レポートは docs 追加のみで、型・コンポーネント・データは未変更のためビルドへの影響なし。
