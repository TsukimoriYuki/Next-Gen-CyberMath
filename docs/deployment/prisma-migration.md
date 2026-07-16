# Prisma migration運用

## 現状

Railway PostgreSQLは、migration registryを導入する前に `prisma db push` で現行schemaを作成済みです。初期migration `20260716000000_initial_schema` は空のPostgreSQLから現行 `prisma/schema.prisma` を作るCREATE文だけを記録しています。既存Railway DBへこのSQLを直接適用してはいけません。

Railway CLIを利用できずproduction schemaとの一致確認およびbaseline登録が未実施のため、`railway.json` のpre-deployは暫定的に `npx prisma db push` を維持しています。

## Railway DBをbaselineする1回限りの手順

1. Railway PostgreSQLのバックアップを取得し、復元可能であることを確認する。
2. Railwayアプリサービスの `DATABASE_URL` が対象PostgreSQLのReference Variableであることを確認する。
3. Railway環境内で `npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code` を実行し、差分なし（終了コード0）を確認する。差分がある場合は中止する。
4. 差分なしの場合だけ、同じRailway環境内で `npx prisma migrate resolve --applied 20260716000000_initial_schema` を1回実行する。
5. `npx prisma migrate deploy` がno-opで正常終了することを確認する。
6. `railway.json` の `deploy.preDeployCommand` を `npx prisma migrate deploy` へ変更し、通常deployを行う。

`migrate reset`、DB削除、schema drop、`--accept-data-loss` は使用しません。失敗時は逆向きmigrationで無理に戻さず、事前バックアップから復旧します。

## 今後のschema変更

1. 開発用PostgreSQLで `prisma migrate dev --name <変更名>` を実行する。
2. 生成SQLにDROP・データ変換・長時間lockの危険がないかレビューする。
3. `prisma validate`、`prisma generate`、対象テスト、本番buildを実行する。
4. migrationをcommitし、Railway pre-deployの `prisma migrate deploy` で適用する。
5. 破壊的変更は段階的migrationとバックアップを用意してから実施する。
