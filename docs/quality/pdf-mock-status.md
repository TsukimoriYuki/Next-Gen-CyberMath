# 手動作成PDF模試 — 正本化の状況

## 現状（完了）

2026-07-02、ユーザーから `common_test_mock_math_1a.pdf`（`~/Downloads`、7/1 22:23作成）が
「共通テスト型本番模試 数学I・数学A 手動作成版 第1回」の正本PDFであると確認を得た。
内容（有理化・漸化式 → タワーの仰角+余弦定理 → 二次関数合成+データの外れ値 → 球の切断+順列）が
既存の構造化データ（`math1a-001.ts`）のテーマ・配点（30,30,20,20=100点）と一致することを
ページ単位で確認済み。

対応した内容:

1. PDFを `public/mock-exams/math1a/common-test-math-1a-manual-001.pdf` に配置。
2. `CommonTestMockExam` 型（`src/data/common-test-mock-exams.ts`）に `pdfUrl?: string` を追加し、
   `COMMON_TEST_MATH_1A_MANUAL_001` に設定。
3. `src/components/common-test/mock-exam/CommonTestPdfMockViewer.tsx` を新設。
   - PDFを `<iframe>` でそのまま表示（問題本文を再構成しない）
   - 別タブで開く／ダウンロード／印刷（別タブ経由）
   - 70分タイマー（残り時間・時間超過表示）
   - 解答欄は既存の `CommonTestMockExamRunner` から `export` した `AnswerInput` を再利用
     （入力欄の実装を重複させない）
   - 採点・解説は `scoreCommonTestMockExam`（構造化データ）から生成。PDFとは独立。
4. `/common-test/simulator/common-test-math-1a-manual-001` を `CommonTestPdfMockViewer` に切替。
5. 旧実装（`CommonTestMockExamRunner`、React再構成版）は削除せず、
   `/common-test/simulator/common-test-math-1a-manual-001/structured-prototype`
   （`robots: noindex`、公開UIからリンクなし）で devOnly の参照実装として維持。
6. `scripts/check-common-test-mock-ui.ts` を新しい構成（PDFビューアが正本、旧実装はdevOnly）に
   合わせて更新。`scripts/check-pdf-mock.ts`（`npm run qa:pdf-mock`）は全項目パスし、
   `npm run qa:all` に組み込み済み。

## 未検証・残課題

- このスクリプトはPDFの見た目（実際にiframeで正しく表示されるか）までは確認できない。
  デプロイ後、実ブラウザで `/common-test/simulator/common-test-math-1a-manual-001` を開いて
  PDFが表示されること、別タブ・ダウンロード・印刷が機能することを目視確認すること。
- PDF内の全22問・56マークの値が構造化データと1文字単位で完全一致しているかは、
  ページ単位のテーマ確認のみで、逐一の突き合わせはしていない。既存の
  `npm run qa:manual-mock` は構造化データの内部整合性（配点・スロット・採点シミュレーション）は
  保証するが、PDFの記載とデータの記載が完全一致することまでは保証しない。
