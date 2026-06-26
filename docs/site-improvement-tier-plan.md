# サイト改善 Tier別計画レポート

## 1. 総評

Next-Gen-CyberMath の数学講座は、近い更新で図解SVG、読み替え表、よくあるミス、確認問題が増え、受験生向け教材としての骨格はかなり強くなっている。特に `geometry-properties`、`figures-and-measurement`、`data-analysis`、`trigonometric-functions` は、単なる文章教材から「図を見て理解する教材」へ進み始めている。

一方で、現時点の最大課題は **数式表示の信頼性** と **図解SVGの教材品質のばらつき** である。静的スキャンでは、`formula` フィールドに `$...$` で囲まれていない数式が 115 件あり、そのうち TeX コマンド露出リスクがあるものが 68 件あった。実画面の代表確認でも、正弦定理・三角関数グラフ・三角関数の基本公式ページで `\\frac` や `\\sin` がそのまま見える箇所を確認した。

図解は `DiagramType` が 29 件あり、型定義・実装・使用の対応は揃っている。ただし、`CourseDiagramBlock.tsx` に手描きSVGが集中しており、ラベルサイズ、余白、色、線幅、モバイル視認性のルールが十分に共通化されていない。数学的に明確な誤図と断定できるものは今回の代表確認では見つけていないが、教材として美しい図、学習者が迷わない図にするには Tier2 でまとまった改善が必要である。

## 2. 今回は修正していないこと

今回の依頼は調査と Markdown レポート作成のみのため、以下は一切変更していない。

- 講座データ
- `DiagramType`
- `CourseDiagramBlock.tsx`
- 講座UIコンポーネント
- ルーティング
- 数式レンダリング処理
- CSS / Tailwind クラス
- 既存URL、lessonId、unitId

作成したのは、このレポート `docs/site-improvement-tier-plan.md` のみである。

## 3. 調査対象

重点的に確認したファイルと範囲は以下。

| 種別 | 対象 |
|---|---|
| 型定義 | `src/types/course.ts` |
| 図解SVG | `src/components/courses/CourseDiagramBlock.tsx` |
| 講座ブロック描画 | `src/components/courses/CourseLessonBlockRenderer.tsx` |
| 数式本文描画 | `src/components/courses/CourseBodyRenderer.tsx` |
| 数学I・A 図形の性質 | `src/data/courses/math-1a/geometry-properties.ts` |
| 数学I・A 図形と計量 | `src/data/courses/math-1a/figures-and-measurement.ts` |
| 数学I・A データの分析 | `src/data/courses/math-1a/data-analysis.ts` |
| 数学II・B・C 三角関数 | `src/data/courses/math-2bc/trigonometric-functions.ts` |
| 全講座データ | `src/data/courses/**/*.ts` |
| 既存監査文書 | `docs/course-quality-audit-after-geometry.md` |
| 図解拡張計画 | `docs/course-diagram-expansion-plan.md` |

静的スキャン結果:

| 項目 | 結果 |
|---|---:|
| 講座データTSファイル | 30 |
| `DiagramType` 定義数 | 29 |
| `CourseDiagramBlock` 実装case数 | 29 |
| 使用されている diagramType 数 | 29 |
| 未実装 diagramType | 0 |
| 未使用 diagramType | 0 |
| `$...$` 未ラップの `formula` フィールド | 115 |
| TeXコマンド露出リスクのある `formula` フィールド | 68 |

代表ページのブラウザ確認:

| ページ | KaTeXエラー | 390px横スクロール | TeX露出 |
|---|---:|---:|---:|
| `/courses/math-1a/data-analysis/quartiles-boxplot-basic` | 0 | なし | なし |
| `/courses/math-1a/data-analysis/correlation-scatter-basic` | 0 | なし | なし |
| `/courses/math-1a/geometry-properties/geometry-properties-inscribed-angle-tangent-chord` | 0 | なし | なし |
| `/courses/math-1a/geometry-properties/geometry-properties-cyclic-quadrilateral` | 0 | なし | なし |
| `/courses/math-1a/figures-and-measurement/trigonometric-ratios-basic` | 0 | なし | なし |
| `/courses/math-1a/figures-and-measurement/sine-law-cosine-law` | 0 | なし | あり |
| `/courses/math-2bc/trigonometric-functions/trigonometric-functions-from-ratios` | 0 | なし | なし |
| `/courses/math-2bc/trigonometric-functions/trig-graphs-basic` | 0 | なし | あり |
| `/courses/math-2bc/trigonometric-functions/trig-identities-basic` | 0 | なし | あり |

## 4. Tier1: 最優先で直すべき問題

Tier1 件数: 6

| ID | 対象 | 問題点 | 根拠 | 改善案 | 期待効果 |
|---|---|---|---|---|---|
| T1-01 | 全講座データの `formula` フィールド | `$...$` で囲まれていない `formula` が 115 件ある | 静的スキャンで確認 | データ側で `$...$` に統一する、または renderer 側で `formula` フィールドを自動的に KaTeX 処理する | 公式がTeX文字列のまま見える問題を大きく減らせる |
| T1-02 | 実画面の公式ブロック | `\\frac`, `\\sin`, `\\cos` などがそのまま表示されるページがある | 代表ブラウザ確認で3ページ確認 | まず `figures-and-measurement.ts` と `trigonometric-functions.ts` の raw formula を修正 | 学習者が公式を読めない致命的な状態を解消 |
| T1-03 | `CourseLessonBlockRenderer.tsx` と `CourseBodyRenderer.tsx` | `block.formula` が `CourseBodyRenderer` に渡されるが、`CourseBodyRenderer` は `$...$` 内だけを KaTeX 化する設計 | `CourseLessonBlockRenderer.tsx` の formula 描画経路 | `formula` フィールド専用の `CourseFormulaRenderer` を作るか、`formula` だけ自動で `$...$` 相当として処理する | 執筆者が `$` を忘れても壊れにくくなる |
| T1-04 | 長い公式のモバイル表示 | 長い公式がブロック内で折り返し・横スクロール・表示サイズ制御される保証が弱い | 正弦定理、余弦定理、ベクトル、統計などに長い公式が多い | 公式ブロックに `overflow-x-auto`、表示数式用余白、最大幅制御を追加 | スマホで公式を最後まで読める |
| T1-05 | 図解SVGの代表ページ | 図解自体は表示されるが、手描き座標・小さい文字・密なラベルにより、教材として誤読されるリスクがある | `fontSize="7"` から `9` 程度のSVGテキストが多く、390pxでは密度が高い | 重要図から順にラベル余白、線幅、点名位置、凡例を再設計する | 数学的な誤読を防ぎ、図から理解しやすくなる |
| T1-06 | 回帰防止 | `.katex-error`、raw TeX、390px横スクロールを検出する自動テストがない | 現在は手動確認依存 | Playwrightまたは静的スキャンで講座ページの smoke test を追加 | 今後の図解追加・講座追加で同じ問題が再発しにくくなる |

実画面で確認したTeX露出例:

| ページ | 見えた文字列の例 |
|---|---|
| 正弦定理と余弦定理 | `\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R` |
| 三角関数のグラフ | `\\sin(x+2\\pi)=\\sin x,\\quad \\cos(x+2\\pi)=\\cos x` |
| 三角関数の基本公式 | `\\sin^2 x+\\cos^2 x=1`, `\\tan x=\\frac{\\sin x}{\\cos x}` |

## 5. Tier2: 品質を大きく上げる改善

Tier2 件数: 10

| ID | 対象 | 問題点 | 改善案 | 期待効果 |
|---|---|---|---|---|
| T2-01 | `CourseDiagramBlock.tsx` | 29種類のSVGが1ファイルに集中している | 数学分野別に `QuadraticDiagram`, `GeometryDiagram`, `StatsDiagram`, `TrigDiagram` へ分割 | 保守性と品質レビューのしやすさが上がる |
| T2-02 | 図解SVG全般 | 線幅、点サイズ、ラベルサイズ、余白が図ごとに揺れている | 図解デザインルールを定義し、共通プリミティブを作る | 図が教材らしく揃う |
| T2-03 | `unit-circle` | 単位円としては機能するが、象限・符号・座標の整理がやや弱い | 象限ごとの符号表、投影線、角の向きラベルを改善 | 数学IIの導入として理解しやすくなる |
| T2-04 | `trig-graph-sincos` | sin/cosの2曲線と目盛りが小さく、スマホで情報量が多い | desktop/mobileで図の密度を変える、凡例を外に出す | グラフ読み取りがしやすくなる |
| T2-05 | `boxplot` / `scatter-correlation` | 図としては使えるが、統計教材としてはラベルと補足の見せ方がまだ簡素 | 図内ラベルを減らし、下に読み取りステップを置く | 共通テスト型の読み取りに強くなる |
| T2-06 | 公式ブロックUI | 公式、説明、使う場面の視覚的な差が弱い | 公式本体を大きく、使う条件を別行、注意点をカード化する | 公式暗記ではなく使い分けがしやすくなる |
| T2-07 | `comparisonTable` | 表が情報を持つ一方、モバイルで読むには密度が高い | 重要度ラベル、2列カード化、横スクロール範囲の限定を検討 | 読み替え表が実戦で使いやすくなる |
| T2-08 | `commonMistake` | NG / OK / 見分け方の表現は増えたが、UI上は本文と同化しやすい | NGを赤、OKを緑、見分け方を青などで明確化 | 誤答防止の効果が上がる |
| T2-09 | caption | 図解captionに長文が入ると図の要点が埋もれる | captionは1文にし、詳しい説明は本文ブロックへ移す | 図と説明の関係が整理される |
| T2-10 | 既存監査docsとの連携 | 監査結果が複数docsに分散している | `course-diagram-expansion-plan.md` と本レポートの項目を統合管理する | 改善優先度が追いやすくなる |

## 6. Tier3: 中長期の改造案

Tier3 件数: 8

| ID | 対象 | 改造案 | 期待効果 |
|---|---|---|---|
| T3-01 | 図解 | インタラクティブ図解。点を動かすと比・角・グラフが変わる | 理解の深さが大きく上がる |
| T3-02 | 公式 | 公式コピー、公式のお気に入り登録、公式暗記カード化 | 復習効率が上がる |
| T3-03 | 学習履歴 | 講座閲覧、確認問題正答、苦手タグを保存 | 個別最適化につながる |
| T3-04 | 模試連携 | 模試結果から関連講座へ自動推薦 | 復習導線が強くなる |
| T3-05 | 図解制作基盤 | SVGをコード直書きではなく、図解DSLやテンプレートから生成 | 図解の品質と生産性が安定する |
| T3-06 | コンテンツCMS | 講座データ入力時にTeX、diagramType、リンクをバリデーション | 執筆ミスを減らせる |
| T3-07 | デザインシステム | カード、表、公式、例題、ミス解説を体系化 | サイト全体の信頼感が上がる |
| T3-08 | AI復習支援 | 間違えた問題の理由を選び、次に読む講座を提案 | 受験生が自走しやすくなる |

## 7. 図解SVG品質監査

図解の型・実装・使用の対応は揃っている。

| 項目 | 結果 |
|---|---:|
| `DiagramType` 定義数 | 29 |
| `CourseDiagramBlock.tsx` の `case` 数 | 29 |
| 講座データで使用中の diagramType | 29 |
| 未実装の diagramType | 0 |
| 未使用の diagramType | 0 |

重点的に品質改善したい diagramType 数: 12

| diagramType | 監査メモ | 優先 |
|---|---|---|
| `unit-circle` | 単位円、座標、角、符号の関係をより明確にしたい | Tier2 |
| `trig-graph-sincos` | 2曲線、目盛り、凡例が小さく、モバイルで密度が高い | Tier2 |
| `trig-angle-addition` | 回転を重ねるイメージはあるが、加法定理との対応がまだ抽象的 | Tier2 |
| `right-triangle-trig` | 対辺・隣辺・斜辺のラベルはあるが、注目角変更の補助図がほしい | Tier2 |
| `sine-rule-circumcircle` | 外接円と対応する辺・角の関係をより強く見せたい | Tier2 |
| `cosine-rule-triangle` | 余弦定理の「間の角」と「向かいの辺」をもっと強調したい | Tier2 |
| `boxplot` | Q1/Q2/Q3/IQRの見取り図はあるが、ラベル密度を整理したい | Tier2 |
| `scatter-correlation` | 3つの小散布図が横並びで、390pxでは細部が小さい | Tier2 |
| `geometry-ceva-menelaus-compare` | 比較図として便利だが、比の対応までは弱い | Tier2 |
| `geometry-centers-circum-incenter` | 外心・内心を同一図に載せるため情報量が多い | Tier2 |
| `geometry-centers-centroid-orthocenter` | 中線と高さの線種・色分けをもっとはっきりさせたい | Tier2 |
| `axis-position-cases` / `case-split-flow` | 場合分け図として有用だが、テキストが小さくカード密度が高い | Tier2 |

現時点の良い点:

- すべての `DiagramType` が型・実装・使用で破綻していない。
- `width="100%"` と `viewBox` が使われており、代表ページでは390px横スクロールが出ていない。
- 図形の性質の5講座は、最低限の点名・式・定理対応が揃っている。

主な改善ポイント:

- SVG内テキストが `fontSize="7"` から `9` 程度のものが多く、スマホでは読みづらい。
- 図内に説明文を入れすぎているものがある。図は図、説明は本文に分けた方がよい。
- 色で意味を分けているが、凡例や線種の統一が弱い。
- `CourseDiagramBlock.tsx` が巨大化しており、図ごとのレビューが難しい。

## 8. 数式表示・TeX表示問題の監査

最大の問題は、`formula` フィールドの扱いである。`CourseLessonBlockRenderer.tsx` では `block.formula` を `CourseBodyRenderer` に渡しているが、`CourseBodyRenderer` は本文中の `$...$` を見つけてKaTeX化する設計である。そのため、`formula: "\\frac{...}"` のような値は数式として処理されず、TeX文字列として表示されうる。

静的スキャンで見つかった未ラップ `formula` 数:

| ファイル | 件数 |
|---|---:|
| `src/data/courses/math-2bc/vectors.ts` | 13 |
| `src/data/courses/math-2bc/statistics.ts` | 12 |
| `src/data/courses/math-2bc/geometry-equations.ts` | 9 |
| `src/data/courses/math-2bc/plane-curves.ts` | 9 |
| `src/data/courses/math-2bc/trigonometric-functions.ts` | 9 |
| `src/data/courses/math-2bc/expression-proof.ts` | 8 |
| `src/data/courses/math-2bc/sequences.ts` | 8 |
| `src/data/courses/math-2bc/calculus-2.ts` | 7 |
| `src/data/courses/math-1a/counting-probability.ts` | 6 |
| `src/data/courses/math-1a/data-analysis.ts` | 5 |
| `src/data/courses/math-1a/figures-and-measurement.ts` | 5 |
| `src/data/courses/math-1a/integers.ts` | 5 |
| `src/data/courses/math-2bc/complex-equations.ts` | 5 |
| `src/data/courses/math-2bc/exponential-logarithmic-functions.ts` | 5 |
| `src/data/courses/math-1a/numbers-and-expressions.ts` | 4 |
| `src/data/courses/math-1a/sets-and-logic.ts` | 4 |
| `src/data/courses/math-1a/quadratic.ts` | 1 |

TeXコマンド露出リスクのある `formula` 数:

| ファイル | 件数 |
|---|---:|
| `src/data/courses/math-2bc/vectors.ts` | 13 |
| `src/data/courses/math-2bc/trigonometric-functions.ts` | 9 |
| `src/data/courses/math-2bc/statistics.ts` | 7 |
| `src/data/courses/math-2bc/plane-curves.ts` | 6 |
| `src/data/courses/math-1a/data-analysis.ts` | 5 |
| `src/data/courses/math-2bc/geometry-equations.ts` | 5 |
| `src/data/courses/math-2bc/sequences.ts` | 5 |
| `src/data/courses/math-1a/figures-and-measurement.ts` | 4 |
| `src/data/courses/math-1a/counting-probability.ts` | 3 |
| `src/data/courses/math-2bc/calculus-2.ts` | 3 |
| `src/data/courses/math-2bc/exponential-logarithmic-functions.ts` | 3 |
| `src/data/courses/math-1a/numbers-and-expressions.ts` | 2 |
| `src/data/courses/math-2bc/complex-equations.ts` | 2 |
| `src/data/courses/math-2bc/expression-proof.ts` | 1 |

代表的な修正候補:

| ファイル | 行 | 現状の例 |
|---|---:|---|
| `src/data/courses/math-1a/data-analysis.ts` | 46 | `\\bar{x}=\\frac{x_1+x_2+\\cdots+x_n}{n}` |
| `src/data/courses/math-1a/data-analysis.ts` | 126 | `s^2=\\frac{(x_1-\\bar{x})^2+\\cdots+(x_n-\\bar{x})^2}{n}` |
| `src/data/courses/math-1a/figures-and-measurement.ts` | 381 | `\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R` |
| `src/data/courses/math-1a/figures-and-measurement.ts` | 405 | `a^2=b^2+c^2-2bc\\cos A` |
| `src/data/courses/math-2bc/trigonometric-functions.ts` | 複数 | `\\sin`, `\\cos`, `\\tan`, `\\frac` を含む公式 |

## 9. 公式ブロック・数式UIの改善案

公式ブロックは、受験サイトでは学習者が最も信頼して読む部分である。現在はブロック種別の色分けはあるが、公式本体の見え方と説明の階層が弱い。

改善案:

1. `formula` フィールドは常にKaTeX表示にする。
2. 公式本体は本文より大きく、中央寄せまたは横スクロール可能な専用領域にする。
3. 「使う場面」「注意点」「よくあるミス」を公式ブロック内で分ける。
4. 長い公式はスマホで `overflow-x-auto` にする。
5. `\\text{日本語}` を使う式は、可能なら数式外の本文に分離する。
6. 公式ブロックに「この公式で何が分かるか」を1行で添える。
7. `formula` のlintルールを作り、`$...$` 未ラップやTeX露出を検出する。

優先して直す公式:

- 正弦定理
- 余弦定理
- 三角関数の周期性
- 三角関数の相互関係
- tanとの関係
- データ分析の平均、分散、標準偏差、標準化
- ベクトルの内積
- 統計的な推測の公式

## 10. CourseDiagramBlock の設計上の問題

`CourseDiagramBlock.tsx` は、現在の図解拡張の中心になっている。ただし、今後さらに講座を増やすなら、このまま1ファイルにSVGを積み上げる設計は限界が近い。

設計上の問題:

- 29種類の図が1ファイルに集中している。
- SVGの座標、色、線幅、ラベル配置が図ごとに手作業。
- `fontSize` や `viewBox` の統一ルールが暗黙的。
- 図ごとの数学レビューがしづらい。
- 図の再利用性が低い。
- captionは `CourseBodyRenderer` で数式対応されるが、SVG内テキストはplain textであり、数式表現に限界がある。
- 390px確認は手動依存で、スクリーンショット回帰テストがない。

改善方向:

- `CourseDiagramBlock` は dispatcher にして、実体は分野別ファイルへ分割する。
- 点、線分、角弧、ラベル、座標軸、グラフ、凡例を共通コンポーネント化する。
- SVG内の教材テキストは短くし、詳細説明はcaptionか本文へ逃がす。
- 図ごとに `desktop` と `mobile` の情報密度を変えられるようにする。
- `DiagramType` ごとにレビュー観点をdocs化する。

## 11. 講座ページUI/UXの改善案

現在の講座ページは情報量が増えたことで、学習効果は上がっている。一方で、受験生がスマホで短時間に確認する場面では、情報の濃淡をもっと強くしたい。

改善案:

- 「まずこれだけ覚える」はページ冒頭でより目立つ固定パターンにする。
- 公式、図解、読み替え表、例題、確認問題の視覚階層を統一する。
- 例題では「最初に見る場所」をアイコンまたはラベルで目立たせる。
- `commonMistake` は NG / OK / 見分け方 を見出し化する。
- `comparisonTable` はスマホでカード化を検討する。
- 図解captionは短くし、長い説明は直後の本文へ分ける。
- `qualityTags` は教材制作側の管理情報としてはよいが、ユーザー表示する場合は学習者向け表現に変換する。

## 12. スマホ表示の改善案

代表ページでは390px幅でページ全体の横スクロールは確認されなかった。ただし、図解と公式の密度はまだ改善余地が大きい。

改善案:

- SVG内ラベルの最小文字サイズを決める。
- 1つの図に入れるラベル数を制限する。
- 複数パネル図はスマホでは縦積みにする。
- 長い公式は横スクロール可能な公式ブロックに閉じ込める。
- 表はページ全体を押し広げず、表だけスクロールにする。
- 例題・確認問題のカード間隔をスマホで少し広げる。
- 図解の下に「この図で見る場所」を短く出す。

## 13. すぐに実装すべき修正 Top 10

1. `formula` フィールドの未ラップ115件を修正する、または renderer 側で自動KaTeX化する。
2. 実画面でTeX露出が確認された `sine-law-cosine-law`、`trig-graphs-basic`、`trig-identities-basic` を最優先で直す。
3. `CourseFormulaRenderer` を作り、公式ブロックを本文レンダリングと分離する。
4. 公式ブロックに `overflow-x-auto` と表示数式用の余白・文字サイズを追加する。
5. raw TeX を検出する静的チェックを `npm run lint` とは別に追加する。
6. 390px幅で `.katex-error` と横スクロールを確認するPlaywright smoke testを追加する。
7. `CourseDiagramBlock.tsx` を分野別ファイルへ分割する。
8. `unit-circle`、`trig-graph-sincos`、`sine-rule-circumcircle`、`scatter-correlation`、`boxplot` を先に図解リデザインする。
9. `commonMistake` の NG / OK / 見分け方 UI を統一する。
10. 図解SVGのデザインルールをdocs化し、今後のdiagramType追加時の基準にする。

## 14. 次に作るべき改善プロンプト案

### Prompt 1: 公式ブロックのTeX露出修正

```md
数学講座の `formula` フィールドでTeXがそのまま表示される問題を修正してください。
まず `CourseLessonBlockRenderer.tsx` と `CourseBodyRenderer.tsx` の描画経路を確認し、
`formula` フィールドが `$...$` 未ラップでもKaTeX表示されるようにするか、
全講座データの `formula` を `$...$` に統一してください。
修正後、raw TeX 静的スキャン、代表ページの `.katex-error`、390px横スクロールを確認してください。
```

### Prompt 2: 三角関数・図形と計量の公式表示を集中修正

```md
`figures-and-measurement.ts` と `trigonometric-functions.ts` の公式ブロックを集中修正してください。
正弦定理、余弦定理、三角関数の周期性、相互関係、tanとの関係が
TeX文字列ではなくKaTeXで表示されることを実画面で確認してください。
```

### Prompt 3: CourseDiagramBlockの分割と図解デザイン基準作成

```md
`CourseDiagramBlock.tsx` を分野別に分割し、点・線分・角弧・ラベル・座標軸の共通SVG部品を作ってください。
まず既存29 diagramTypeの動作を変えずに移動し、続いて図解デザイン基準を docs に作成してください。
```

### Prompt 4: 統計図解のリデザイン

```md
`boxplot` と `scatter-correlation` のSVGを、共通テストの読み取りに強い教材図へリデザインしてください。
390px幅ではラベルを減らし、読み取りステップを図の下に表示してください。
```

### Prompt 5: 図解・数式の自動監査スクリプト作成

```md
講座ページ全体を対象に、raw TeX、`.katex-error`、横スクロール、未実装 diagramType を検出する監査スクリプトを追加してください。
CIまたは `npm run audit:courses` で実行できるようにしてください。
```

## 15. 実装ロードマップ

### Phase 1: すぐ直す

- raw TeX露出を止める。
- `formula` フィールドの扱いを統一する。
- 代表ページの `.katex-error` と横スクロール確認を自動化する。
- 実画面で露出が確認された3ページを先に修正する。

### Phase 2: 主要機能を磨く

- 公式ブロックUIを刷新する。
- `comparisonTable` と `commonMistake` のUIを統一する。
- `CourseDiagramBlock.tsx` を分割する。
- 図解の共通プリミティブを作る。

### Phase 3: 図解品質を上げる

- `unit-circle`、`trig-graph-sincos`、`sine-rule-circumcircle`、`cosine-rule-triangle` を教材図として再設計する。
- `boxplot`、`scatter-correlation` を共通テスト型の読み取り図へ改善する。
- `geometry-centers-*` と `geometry-ceva-menelaus-compare` のラベル密度を調整する。

### Phase 4: 学習体験を強化する

- 公式コピーや公式カードを追加する。
- 模試結果から関連講座へ遷移する復習導線を作る。
- 講座の確認問題結果を保存する。
- 苦手タグから次に読む講座を推薦する。

## 16. まとめ

現状の最優先課題は、図解の追加そのものではなく、**公式が正しく数式として表示される信頼性を確保すること**である。静的スキャンで 115 件の未ラップ `formula`、68 件のTeXコマンド露出リスクがあり、実画面でも3つの代表ページでTeX露出を確認したため、これは最初に直すべきである。

図解SVGは29種類すべてが型・実装・使用で揃っており、追加作業の基盤はできている。ただし、教材としての美しさ、ラベル配置、スマホでの見やすさはまだTier2の改善余地が大きい。まず数式表示を安定させ、その後に図解デザイン基準と公式ブロックUIを整えるのが、学習サイトとして最も効果の大きい順序である。

検証結果:

- `npm run lint`: 成功。0 errors / 19 warnings。
- `npm run build`: 成功。Next.js 16.2.7、静的ページ 1144 / 1144 生成成功。
- 代表9ページのブラウザ確認: `.katex-error` はすべて 0。
- 代表9ページの390px確認: ページ全体の横スクロールはなし。
- 代表9ページのうち3ページでTeXコマンド露出を確認。
