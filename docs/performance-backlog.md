# Performance Backlog — 長い特別講義ページ

Deep Research の Lighthouse 計測で、長い特別講義ページの Performance が低いと指摘された。

- 裏技講義 (`/common-test/lectures/math-1a-shortcut-formulas`): 37
- 二次関数講義 (`/common-test/lectures/quadratic-case-split-intensive`): 40

これらは「満点仕上げ」enhancement により1ページのブロック数・数式数・SVG数が非常に多い長尺ページ。
P0/P1 不整合の修正を優先したため、本ドキュメントで改善計画を管理する。大規模な章分割は今回は行わない。

## 原因の切り分け（仮説）

1. **KaTeX の初期描画量**
   `MathText` が全ブロックの `$...$` / `$$...$$` を `output: "htmlAndMathml"` で一括レンダリングする。
   1ページに数百個の数式があると、HTML+MathML 二重出力で DOM ノードが膨らむ。
2. **SVG 図解の初期読み込み**
   `geometryLayers`・`image`（data URI SVG）が全レイヤー分、初期 HTML に直接埋め込まれる。
   ページ下部の図まで初期ロードで展開される。
3. **全ブロック一括レンダリング**
   `LectureExperience` が `lecture.blocks.map(...)` で全ブロックを一度に描画。
   下部の本番形式演習・判別ドリルまで初期マウントされる。
4. **client component の粒度**
   講義ページ全体が client experience（進捗追跡・IntersectionObserver）に包まれている。
5. **進捗トラッキング**
   全 trackable ブロックを `IntersectionObserver` で監視し、`localStorage` を読み書きする。

## 改善候補（優先度順）

| # | 施策 | 効果 | リスク | 状態 |
|---|------|------|--------|------|
| 1 | 下部の演習・判別ドリルブロックを `content-visibility: auto` で遅延描画 | 高（初期描画コスト減） | 低（CSSのみ） | backlog |
| 2 | data URI SVG の `<img>` に `loading="lazy"` / `decoding="async"` を付与 | 中 | 低 | 一部着手可 |
| 3 | KaTeX 出力を `html` のみに戻すか、長尺ページのみ MathML を抑制 | 中 | 中（アクセシビリティと両立要） | backlog |
| 4 | 講義を「目次＋冒頭チャプター」を先に描画し、以降を章単位で遅延マウント | 高 | 高（進捗・アンカー導線の再設計が必要） | backlog（大規模・今回対象外） |
| 5 | `geometryLayers` の非アクティブレイヤー画像を遅延化（表示中レイヤーのみ読み込む） | 中 | 低〜中 | backlog |
| 6 | 進捗の `IntersectionObserver` を rootMargin で間引き、`localStorage` 書き込みを debounce | 低〜中 | 低 | backlog |

## 今回の軽微改善（着手済み）

- `LectureRenderer` の `image` ブロックの `<img>` に `loading="lazy"` / `decoding="async"` を付与（初期ロードの SVG 展開を削減）。

## 計測の進め方（再評価前）

1. `next build` 後に `next start` で本番モードを起動。
2. Chrome DevTools Lighthouse（モバイル）で対象2ページを計測。
3. `content-visibility: auto`（施策1）を当てて再計測し、効果が確認できれば本採用。
4. 効果が小さい場合は施策4（章単位の遅延マウント）を別タスクとして設計する。
