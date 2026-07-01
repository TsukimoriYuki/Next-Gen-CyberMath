# アクセシビリティ・チェックリスト

Cyber Mathは、WCAG完全準拠を主張するものではありません。
「最低限、致命的なアクセシビリティ阻害要因がない」ことを、自動チェックと手動確認の両輪で確認する運用です。

## 自動チェック（`npm run qa:a11y`）

`e2e/accessibility.spec.ts` で以下を検査します。

- 主要ページ（`/`, `/math`, `/units`, 問題詳細, `/common-test`, `/mock`, `/dojo`, `/courses`, `/quality`, `/quality/checklist`）に
  [axe-core](https://github.com/dequelabs/axe-core) (`wcag2a`, `wcag2aa`) を実行し、重大度 `serious` / `critical` の違反がないこと。
- トップページでTabキーを押したときに、最初のフォーカス対象がリンク要素であり、メインナビゲーションへ到達できること。
- モバイル幅（375px）で問題詳細ページを開いたとき、横スクロールが発生しないこと（数式・カードのはみ出し確認）。
- 難度バッジ（A/B/C/D/D+/EX/∞）が、色だけでなく文字ラベルでも判別できること。

このスキャンで検出し、実際に修正した既知の問題（再発防止のためここに記録する）:

- JSXGraphの`slider`ウィジェットが生成する`<input type="range">`に`aria-label`が付いていなかった
  （`critical`）→ `src/components/graph/JsxBoard.tsx`で、ボード初期化後にスライダー要素へ横断的に
  `aria-label`を付与するよう修正。全ての対話ラボ（約60種類）に一括で効く。
- インライン数式・ブロック数式のオーバーフロー用ラッパー（`overflow-x-auto`）がキーボードで
  スクロールできなかった（`serious`, `scrollable-region-focusable`）→
  `src/components/math/Math.tsx`の`InlineMath` / `BlockMath` / `renderInline`内の数式spanに
  `tabIndex={0}`を追加。
- 「先行公開 / サブ科目」バッジと説明文の文字色コントラストがWCAG AA基準（4.5:1）未満だった
  （`serious`, `color-contrast`）→ `src/components/common-test/CommonTestSubjectCard.tsx`で
  `text-emerald-700→800`, `text-slate-500→600`に変更。

## 手動確認チェックリスト（リリース前に人手で確認する項目）

自動チェックでは検出しづらい、または頻繁には変わらない項目です。

- [ ] 主要ページ（トップ、数学トップ、単元一覧、問題詳細、共通テスト対策室、サイバー模試、過去問道場、講座ページ、品質方針）を
      マウスを使わずTabキーとEnter/Spaceだけで一通り操作できるか
- [ ] JSXGraphの対話ラボ（スライダー）が、キーボード操作（矢印キー）でも値を変更できるか
- [ ] スマートフォン幅（375px程度）で、数式・表・カードが横にはみ出していないか
- [ ] 画像・SVG図形に、内容を説明する`alt`または`aria-label`が付いているか
- [ ] 色のみに依存した情報伝達（正誤を色だけで示す、等）がないか
- [ ] フォーム入力（ログイン・登録・お問い合わせ等）に、関連付けられたラベルがあるか
- [ ] スクリーンリーダー（VoiceOver / NVDA等）で問題ページを読み上げたとき、数式の読み下しラベルが不自然でないか

## 既知の残課題（優先度：低）

- `src/components/courses/CourseFormulaRenderer.tsx` / `CourseBodyRenderer.tsx` / `WhyPopover.tsx` /
  `CalcDrillGame.tsx`内の独自KaTeXレンダラーは、`Math.tsx`の`InlineMath`/`BlockMath`と違い
  `role="math"` / `aria-label`を持たない。将来的に共通コンポーネントへ統合するのが望ましい。
- `ApproachTabs.tsx`は機能的にはキーボード到達可能だが、ARIAタブパターン（`role="tablist"`/
  `aria-selected`/矢印キーでのロービングtabindex）までは実装していない。
