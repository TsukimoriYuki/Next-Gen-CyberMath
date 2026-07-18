# 小学生版・限定beta公開手順

## 現在の公開範囲

小学3年生の通常コースにある算数・国語・社会のpilot各1講座（合計3講座・24問）、保護者向け説明、creditsだけを対象とする。小学3年生の全範囲、小学4〜6年生、理科、中学受験、進捗保存、保護者アカウント、AI自由記述採点、正式公開は対象外とする。

ユーザー本人の明示承認に基づき、現在は`beta` / `limited-beta`として公開中です。対象は小学3年生の算数・国語・社会のpilot各1講座（合計3講座・24問）、保護者向け説明、creditsだけです。小学3年生全範囲、小学4〜6年、理科、中学受験、showcaseは対象外です。

## 公開確認

`npm run qa:elementary:readiness`、`npm run qa:elementary:limited-beta-release`、`npm run qa:elementary:rollback:test`、対象Playwright、TypeScript、ESLint、production buildを実行する。公開対象とshowcaseなどの非公開対象をproductionで分けて確認する。

## 公開後確認

小学3年生トップ、3教科トップ、3講座、保護者向け説明、creditsを確認する。sitemapとglobal navigationへは掲載せず、高校版の公開ルートも確認する。

## 緊急非公開条件

教材の重大な誤り、正答の誤り、個人情報入力の発生、画像・図の権利問題、serious / critical a11y問題、production 500、小学生routeを原因とする高校版障害、publication guardの誤動作を検知した場合は緊急非公開とする。

## Rollback

緊急非公開は`ELEMENTARY_SITE.publicationStatus`を`beta`から`hidden`へ戻す1つのrelease-only変更で行う。対象QAとproduction buildを実行してcommit・pushし、その後、小学生版routeと保護者・creditsがproductionで404、`/learn`の小学生カードが非表示、高校版routeが正常であることを確認する。現在は学習履歴や個人情報を保存しないためDB rollbackは不要であり、高校版全体を停止しない。実行にgit reset、force push、DB操作は使わない。
