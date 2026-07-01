# パフォーマンス・チェックリスト

Cyber Mathでは、本格的なパフォーマンスチューニングよりも「明らかな劣化がないか」を
継続的に確認できる最低限の導線を用意する方針です。

## 自動計測（ベストエフォート）

```
npm run qa:lighthouse
```

`scripts/check-performance.mjs`が本番ビルド（`npm run build && npm run start`）を起動し、
主要4ページ（`/`, `/math`, `/units`, 代表問題1件）に対してLighthouse
（performance / accessibility / best-practices / seo）を実行します。

Chrome/Lighthouseが使えないサンドボックス環境では、計測をスキップして
警告を出すだけでQA全体は失敗させません（Chromeが使えない開発機や一部のCI環境を想定）。
その場合は下記の手動計測を使ってください。

## 手動計測手順

1. `npm run build && npm run start` で本番相当のサーバーを起動する。
2. Chrome DevTools を開き、Lighthouseパネルで対象ページ（`/`, `/math`, `/units`,
   代表問題ページ、`/common-test`）を計測する。モバイル・デスクトップ両方を確認する。
3. または https://pagespeed.web.dev/ に本番URLを入力して計測する。
4. スコアが大きく劣化していないか（前回計測との比較）、LCP・CLS・INPが極端に悪化していないかを確認する。

## コードレベルの確認済み事項（このリリースで確認した内容）

- **画像**: サイト内の`<img>`はすべて図形・数式まわりのSVG/データURI（`GeometryDiagram.tsx`ほか）で、
  next/imageで最適化すべき写真的な画像は存在しない。raw `<img>`の使用は妥当。
- **フォント**: `next/font`は使わず、`<link rel="preconnect">` + Google Fonts CSS
  （`display=swap`指定あり）＋フォールバックのフォントスタックという構成（`src/app/layout.tsx`）。
  レンダリングブロックを避ける`display=swap`と`preconnect`は既に入っている。
  自前ホスティング（`next/font`）へ切り替えると外部リクエストを1つ減らせるが、優先度は低い。
- **JSXGraph（対話ラボ）**: `src/components/graph/JsxBoard.tsx`で`await import("jsxgraph")`による
  動的importを使っており、初期バンドルには含まれない（ラボを開いたページでのみ読み込まれる）。
- **バンドルサイズ**: `.next/static/chunks`に約1MBの単一チャンクが存在する（jsxgraph/katex等の
  重量ライブラリ由来と推測）。動的importで初期表示はブロックしていないが、今後ラボや講座を
  大幅に追加する場合は`next build`後のチャンク内訳を再確認すること。

## 既知の限界

- 本番相当のLighthouse定点観測をCIに組み込むには、Chromeが確実に動く実行環境（例: GitHub Actions
  の`ubuntu-latest`）が必要。現在のローカル/サンドボックス環境では自動計測が失敗することがある。
