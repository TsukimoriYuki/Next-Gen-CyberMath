# リリース前チェックリスト

本番へ出す前に、上から順に実行する。途中で失敗したら、直してからやり直す
（`--force`や`--no-verify`的な回避はしない）。

## 1. 静的チェック

```
npm run lint
npm run typecheck   # 存在しない場合は `npx tsc --noEmit`
npm run build
```

## 2. データ・ロジック系QA（速い）

```
npm run qa:metadata
npm run qa:counts
npm run qa:routes
npm run qa:admin
npm run qa:public
npm run qa:math1a-paper
```

まとめて実行する場合:

```
npm run qa:all
```

## 3. 実ブラウザ系QA（遅いが、リリース前は必ず実行する）

```
npm run qa:routes:e2e
npm run qa:a11y
```

## 4. パフォーマンス（ベストエフォート）

```
npm run qa:lighthouse
```

Chrome/Lighthouseが使えない環境では自動でスキップされる。その場合は
[performance-checklist.md](./performance-checklist.md)の手動計測手順を実行する。

## 5. 手動確認（自動化していない項目）

- [ ] [accessibility-checklist.md](./accessibility-checklist.md)の手動チェック項目
- [ ] 新規追加・変更した問題の数学的正確性（式変形・条件不足・単元分類）
- [ ] `/quality/checklist`の内容が実際のQAコマンド・現在の公開問題数と一致しているか
- [ ] `/quality/changelog`に今回の変更を追記したか
- [ ] 本番デプロイ後、`npm run qa:public:live`を実際の本番URLに対して実行する

## 6. デプロイ後

```
npm run qa:public:live
```

本番URLに対して主要ルートの応答・表記・サイトマップを再確認する。
