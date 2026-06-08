# Next-Gen Cyber Math

「数学の美しさと真の理解」を追求する、高校数学の次世代学習プラットフォーム MVP。
動くグラフで実験し、論理を一段ずつ自分の手で開く、サイバーパンクな学習体験。

## 技術スタック

| レイヤー   | 採用技術                                              |
| ---------- | ----------------------------------------------------- |
| Framework  | Next.js 16 (App Router) / React 19 / TypeScript       |
| Styling    | Tailwind CSS v4 (CSS-first) / shadcn/ui               |
| Animation  | Framer Motion (`motion`)                              |
| 数式       | KaTeX（サーバーレンダリング）                         |
| グラフ     | JSXGraph（クライアントで遅延ロード）                  |
| DB / ORM   | PostgreSQL (Render) / Prisma 7                        |
| Hosting    | Render（Web Service + Managed PostgreSQL, `render.yaml`） |

## コア機能

- **難易度ピラミッド** `A → B → C → D → D+`。D+ は「発想が美しく解法に感動がある」難問。
- **段階的論理開示 (Logic Scaffolding)** … `着眼点 → 実験 → ヒント → 厳密な解答` を、
  前のステップを開くまで次がロックされるゲート式アコーディオン（Framer Motion）で能動的に開示。
- **インタラクティブ・ラボ** … JSXGraph のスライダーでグラフ／図形がリアルタイムに変化。
- **今日の3題 (Daily Triple)** … 日付から決定論的に選ばれる 3 問。完了率・継続日数を
  localStorage でトラッキング（MVP は認証なし）。

## 収録問題（MVP）

| 難易度 | タイトル                     | 単元         | Lab |
| ------ | ---------------------------- | ------------ | --- |
| A      | 相加・相乗平均と最小値の正体 | 式と証明     | ✅  |
| B      | 線分が描く通過領域           | 図形と方程式 | ✅  |
| C      | 動く放物線、頂点の軌跡       | 図形と方程式 | ✅  |
| D      | 対称性が x を消す定積分      | 積分法       | —   |
| D+     | tan 1° は有理数か？          | 三角関数     | ✅  |

## ディレクトリ構成

```
src/
├─ app/                     ルーティング (/, /units, /problems/[slug])
├─ components/
│  ├─ math/Math.tsx         KaTeX レンダラ (Inline/Block/MathText)
│  ├─ graph/                JsxBoard + labs/ (graphKey レジストリ)
│  ├─ scaffolding/          LogicSteps（段階的論理開示）
│  ├─ daily/                DailyTriple
│  └─ shell/                ヘッダ・カード・難易度バッジ
├─ data/problems.ts         ★ コンテンツの単一データソース
├─ lib/                     content / types / progress
└─ hooks/useProgress.ts     localStorage 進捗 (useSyncExternalStore)
prisma/
├─ schema.prisma            Problem / ExplanationStep / DailyChallenge
└─ seed.ts                  src/data から DB へ投入
prisma.config.ts            Prisma 7 の接続設定（DATABASE_URL）
render.yaml                 Render Blueprint
```

> **データの単一ソース** … 問題コンテンツは `src/data/problems.ts` に集約。アプリはこれを
> 直接読むため **DB なしでも動作**。`prisma/seed.ts` が同じデータを Postgres に投入するので、
> DB 接続後はシードするだけで一致する。

## ローカル開発

```bash
npm install
npm run dev          # http://localhost:3000
```

DB は MVP の動作に不要。利用する場合のみ:

```bash
cp .env.example .env # DATABASE_URL を設定
npm run db:push      # スキーマを反映
npm run db:seed      # src/data からシード
```

## デプロイ (Render)

`render.yaml` を Blueprint として読み込むと、Web Service と Managed PostgreSQL が作成され、
`DATABASE_URL` が自動注入される。ビルドは `npm ci && prisma generate && next build`。
