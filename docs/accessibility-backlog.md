# Accessibility Backlog

公開前QAで小さく直せるものは実装し、大きな構造変更が必要なものはここへ残します。

## 確認済み

- MathText / KaTeX は `htmlAndMathml` 出力にしている。
- 代表式には `aria-label` の読み下しを付けられる。
- header / footer のリンク文言は行動が分かる表現に寄せている。
- 共通テスト大問ドリルの数値入力には `解答` label がある。
- モバイル表示でテキストが隠れる header アイコンリンクには `aria-label` を付けている。
- 特別講義の読了ボタンには章名を含む `aria-label` と `aria-pressed` がある。
- 共通テスト大問ドリルの正誤表示は `role="status"` / `aria-live="polite"` で通知する。
- 判別ドリルの KaTeX のみの選択肢には読み上げ用の `aria-label` がある。

## 次回以降の改善候補

- 判別ドリルで選択肢が多いブロックは、グループ単位の説明を `fieldset` / `legend` 相当に寄せる。
- マイページのグラフ領域に、視覚以外で読める要約テキストを追加する。
- Common Test ダッシュボードの一部で heading-order 指摘が残る。実測 Accessibility は 90 以上だが、次の情報設計整理で h2/h3 の階層を見直す。
- 自動ブラウザの Tab 送信が不安定なため、公開直前に人間が Chrome で Tab順・focus ring・Enter/Space 操作を実機確認する。
- Lighthouse Accessibility の新規指摘が出た場合、該当ページとDOM断面をここへ追記する。
