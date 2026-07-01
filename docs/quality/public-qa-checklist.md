# 公開QAチェックリスト（開発者向け）

このドキュメントは開発者向けの内部メモです。利用者向けの説明は
[/quality/checklist](../../src/app/quality/checklist/page.tsx)（本番では `/quality/checklist`）を参照してください。
2つの内容は一致させること — 片方だけ更新して食い違わせない。

## QAコマンド一覧

| コマンド | 検査スクリプト | 主な検査内容 |
|---|---|---|
| `npm run qa:metadata` | `scripts/check-problem-metadata.ts` | 問題メタ情報の単元別テンプレート誤爆、D+/EX/∞の共通テスト文言、講義リンク実在性、$の対応崩れ |
| `npm run qa:counts` | `scripts/check-public-counts.ts` | 難度別・単元別・総数の整合、ABYSS/mockOnlyの非公開集計への非混入、模試件数の整合 |
| `npm run qa:routes` | `scripts/check-learning-routes.ts` | 単元slugの重複・解決可否、講義/授業/問題の相互参照の実在性 |
| `npm run qa:admin` | `scripts/check-admin-access.ts` | `/admin`配下の認証ガード、公開UIからのリンク不在、robots/sitemap除外 |
| `npm run qa:public` | `scripts/check-public-quality.ts` | 主要ルートの応答、サイトマップ整合、禁止文言、共通テスト表記整合 |
| `npm run qa:public:live` | `scripts/check-live-public-quality.ts` | 本番URLに対する同様のチェック |
| `npm run qa:math1a-paper` | `scripts/check-exam-paper.ts` | 冊子型模試の配点・スロット整合・採点シミュレーション |
| `npm run qa:routes:e2e` | `e2e/routes.spec.ts` (Playwright) | 実ブラウザでの巡回：404なし、title/h1存在、異常表示なし、生TeX露出なし、準備中ページの代替導線、admin非公開 |
| `npm run qa:a11y` | `e2e/accessibility.spec.ts` (Playwright + axe-core) | 主要ページの重大アクセシビリティ違反、キーボード到達性、モバイル横はみ出し |
| `npm run qa:lighthouse` | `scripts/check-performance.mjs` | 主要ページのLighthouseスコア（ベストエフォート、失敗しても止めない） |
| `npm run qa:all` | 上記の静的チェック（metadata/counts/routes/admin/public/math1a-paper）をまとめて実行 | リリース前の基本ゲート |

`qa:routes:e2e` / `qa:a11y` / `qa:lighthouse` は実ブラウザ・実サーバーを起動するため`qa:all`には含めない
（重い・遅いので別ゲートとして独立させている）。リリース前は`qa:all`に加えてこの3つも手動で実行すること。

## 新しいチェックを追加するときの指針

- 「教材データ」に関するチェック（単元・難度・リンク）→ `scripts/check-*.ts`（tsx実行、Node環境で完結）
- 「実際のレンダリング結果」に関するチェック（DOM・スタイル・実ブラウザ挙動）→ `e2e/*.spec.ts`（Playwright）
- 新しいチェックを追加したら、`src/data/quality-status.ts`の`QA_CHECK_DESCRIPTIONS`と、
  このファイルの表を両方更新すること。
