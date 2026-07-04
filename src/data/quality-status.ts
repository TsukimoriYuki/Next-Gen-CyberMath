// 公開QAページ（/quality/checklist, /quality/changelog）用の手入力ステータス。
// CIによる自動記録ではなく、フルQA（npm run qa:all 相当）を実行した都度、
// 人手でこの値を更新する運用とする。実行していない日付を書かない。

export interface QaCheckDescription {
  command: string;
  title: string;
  description: string;
}

export const LAST_FULL_QA_RUN = "2026-07-05";

export const QA_CHECK_DESCRIPTIONS: QaCheckDescription[] = [
  {
    command: "npm run qa:metadata",
    title: "問題メタ情報チェック",
    description:
      "「この問題の核」「身につく武器」が単元と無関係なテンプレートを誤って表示していないか、既知の回帰ケースを含めて検査します。D+/EX/∞で共通テスト文言が出ていないか、講義リンクが実在するか、数式の$記号の対応が崩れていないかも確認します。",
  },
  {
    command: "npm run qa:counts",
    title: "問題数整合チェック",
    description:
      "難度別の合計・単元別の合計・公開問題総数が一致するかを検査します。模試ガチャ専用プールなど、意図的に非公開にしている問題が公開集計に混入していないかも確認します。",
  },
  {
    command: "npm run qa:routes",
    title: "復習導線・単元slugチェック",
    description:
      "単元一覧の slug が重複なく実在の単元ページに解決できるか、講義・授業・問題の相互リンクが切れていないかを検査します。",
  },
  {
    command: "npm run qa:admin",
    title: "管理画面の非公開チェック",
    description:
      "/admin 配下の全ページが認証・権限ガードを持つか、公開UI（ナビゲーション・フッター等）から管理画面へのリンクが出ていないか、robots.txt / サイトマップから除外されているかを検査します。",
  },
  {
    command: "npm run qa:public",
    title: "公開ページ品質チェック",
    description:
      "主要ページの応答、サイトマップ整合、文字化けや開発者向けの一時的な表記の不在、共通テスト表記の整合を検査します。",
  },
  {
    command: "npm run qa:math1a-paper",
    title: "冊子型模試の整合チェック",
    description:
      "共通テスト対策室の冊子型模試（70分・100点・56マーク）について、配点合計・スロット参照・採点シミュレーションが仕様通りかを検査します。",
  },
  {
    command: "npm run qa:routes:e2e",
    title: "主要ページの巡回チェック（Playwright）",
    description:
      "実際にブラウザでページを開き、404にならないか、タイトル・h1が存在するか、存在しない単元と誤認識されるような表示が正常なページに出ていないか、管理画面が未認証で開けないかを確認します。",
  },
  {
    command: "npm run qa:a11y",
    title: "アクセシビリティチェック（Playwright + axe-core）",
    description:
      "主要ページに対してaxe-coreの自動診断を実行し、重大度の高い違反（色コントラスト・aria属性の欠落・フォーム要素のラベル不足など）がないかを確認します。",
  },
  {
    command: "npm run qa:lighthouse",
    title: "パフォーマンス計測（ベストエフォート）",
    description:
      "主要ページに対してLighthouseを実行します。Chrome/Lighthouseが使えない環境では自動でスキップし、docs/quality/performance-checklist.mdの手動計測手順に委ねます。",
  },
];

export const QUALITY_CHANGELOG: { date: string; items: string[] }[] = [
  {
    date: "2026-07-05",
    items: [
      "MATH中核講義の主要4単元（図形と計量、図形の性質、場合の数と確率、二次関数）を、問題解体型講座と接続する形で強化しました。",
      "共通テスト対策室から、模試後に戻るべきMATH中核講義へ進める復習導線を追加しました。",
      "公開UIのブランド表記と未完成感の強い文言を見直し、正式ブランドをCyber Math Next-Genに統一しました。",
    ],
  },
  {
    date: "2026-07-02",
    items: [
      "共通テスト型本番模試 数学I・数学A 手動作成版 第2回を追加しました。PDF冊子を正本として表示し、採点・解説データだけを構造化しています。",
      "第2回は追加演習として /common-test、/common-test/math-1a、/common-test/simulator、sitemap、experience registry に追加しました。数学IAのメインCTAは第1回のまま維持しています。",
      "qa:pdf-mock、qa:manual-mock、qa:manual-common-test、qa:common-test-routing、qa:experience-consistency を第2回対応に更新しました。",
    ],
  },
  {
    date: "2026-07-01",
    items: [
      "管理画面（/admin/lectures）に認証・権限ガードを追加し、一般公開されない状態にしました。",
      "公開QA・更新履歴ページ（本ページ）と、難度別の代表問題サンプルを追加しました。",
      "「準備中」表示に代替導線（他レベル・他カテゴリへのリンク）を追加しました。",
      "Playwrightによる主要ページの自動巡回QAと、axe-coreによるアクセシビリティ自動チェックを追加しました。",
    ],
  },
  {
    date: "2026-06-30 〜 2026-07-01",
    items: [
      "問題ページのメタ情報（この問題の核・身につく武器・出方）が、単元と無関係なテンプレートを表示していた問題を修正しました。",
      "難度 D+ / EX / ∞ の問題に、共通テスト向けの定型文が機械的に表示されないようにしました。",
      "特異点ガチャ専用の問題が、単元一覧・問題数の公開集計に混入していた問題を修正しました。",
      "単元名の表記ゆれ（例:「二次関数」表記の不統一）を解消し、単元一覧の重複表示を解消しました。",
      "共通テスト対策室で、診断前に仮スコアが表示されていた古いコンポーネントを削除しました。",
      "フッターの開発者向けビルド表記など、一般公開ページの表現を見直しました。",
      "問題メタ情報・問題数整合・復習導線をそれぞれ検査するQAスクリプトを追加しました。",
    ],
  },
];
