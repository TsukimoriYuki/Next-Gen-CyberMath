# Next-Gen Cyber Math — プロジェクト現状サマリー（引き継ぎ）

> 次セッションの自分へ。まずこのファイルと `AGENTS.md` を読むこと。`node_modules` は走査しない（`.gitignore` 済み）。

最終更新: 2026-06 / ビルド: **green（548 静的ページ）** / lint: clean

---

## 1. 技術スタックとアーキテクチャ

- **Frontend**: Next.js **16**（App Router, Turbopack）/ React **19** / TypeScript
- **Style**: Tailwind CSS **v4**（CSS-first, `tailwind.config` なし）/ shadcn/ui / motion(Framer Motion)
- **数式**: KaTeX（`Math.tsx` でサーバーレンダリング）
- **Markdown授業**: react-markdown + remark-math + remark-gfm + rehype-katex
- **動的グラフ**: JSXGraph（クライアントで遅延ロード、`JsxBoard` でラップ）
- **DB/ORM**: Prisma **7** + `@prisma/adapter-pg` + `pg`（**Render Managed PostgreSQL**）
- **★アーキテクチャの肝**: **静的データ駆動**。画面は `src/data/*` → `src/lib/content.ts` 経由で **SSG** 描画。**DB は永続化用**で、アプリ実行時のレンダリングには使わない（`/api/exam/attempts` のみ実行時にDBへ書く）。

### ディレクトリ概要
```
src/
├─ app/
│  ├─ page.tsx                     トップ（ヒーロー＋難易度ピラミッド＋今日の3題）
│  ├─ units/page.tsx               単元カード一覧（IA / IIB / 発展 の3層）
│  ├─ units/[unitSlug]/page.tsx    単元別の問題＋授業
│  ├─ problems/[slug]/page.tsx     問題詳細（段階的論理開示 LogicSteps）
│  ├─ lessons/page.tsx             ★スキルツリーUI（eliteティア=難問対策）
│  ├─ lessons/[slug]/page.tsx      授業（LessonRenderer）
│  ├─ tags/page.tsx, tags/[tag]/   タグ雲・タグ別一覧（非ASCIIは decode 必須）
│  ├─ mock/page.tsx                ★模試（config→running→result の状態機械）
│  └─ api/exam/attempts/route.ts   模試結果を ExamAttempt に保存（POST）
├─ data/
│  ├─ problems.ts                  集約。RAW_PROBLEMS に PROBLEM_TAGS をマージして PROBLEMS を作る
│  ├─ units/*.ts                   単元ごとの問題（1A 8ファイル＋2B 9ファイル＋showcase）
│  ├─ lessons.ts                   授業10本（うちキラー7本=unit「難問対策・解法戦略」）
│  ├─ problem-tags.ts              1A問題への slug→tags マップ（問題を直接編集しない）
│  ├─ units-meta.ts                単元レジストリ（slug/name/description/order）
│  └─ tags.ts                      tagColor(ハッシュ)・tagSlug/tagFromSlug
├─ components/
│  ├─ graph/JsxBoard.tsx           JSXGraph ラッパ（interface JxgBoard に create/update）
│  ├─ graph/LabRenderer.tsx        graphKey → ラボ component の REGISTRY
│  ├─ graph/labs/*.tsx             ラボ実装（約36種）
│  ├─ math/Math.tsx                MathText（KaTeX＋`@@lab:<key>@@` を LabRenderer に置換, null安全）
│  ├─ scaffolding/LogicSteps.tsx   着眼点→実験→ヒント→解答 のゲート式開示＋LessonLink
│  ├─ lessons/LessonRenderer.tsx   Markdown描画（`@@lab` を split→LabRenderer）
│  ├─ lessons/LessonNode.tsx       スキルツリーのノード（elite=金/真紅）
│  ├─ mock/MockTimer.tsx           ネオンカウントダウン
│  └─ shell/*                      SiteHeader, ProblemCard, UnitCard, TagChip, DifficultyBadge
├─ lib/
│  ├─ content.ts                   getAllProblems/getProblem/getUnit*/getLesson*/getAllTags/getProblemsByTag …
│  ├─ types.ts                     Difficulty, StepType, GraphKey(union), Problem, Lesson, UnitMeta
│  ├─ exam.ts                      模試生成・採点・弱点・session・localStorage（nowMs/Math.random はここ）
│  ├─ prisma.ts                    ★Render接続（不可侵）
│  └─ progress.ts / hooks/useProgress.ts  進捗(localStorage, useSyncExternalStore)
prisma/
├─ schema.prisma                   下記モデル
└─ seed.ts                         ★上部の接続設定は不可侵。下半分で PROBLEMS/LESSONS を投入
prisma.config.ts                   ★不可侵（dotenv + datasource url + seed: npx tsx）
```

### コンテンツ規模（概算）
- 問題: **約290問**（数IA 約151 ＋ 数IIB 135 ＋ 旧帝大4）。各単元 A/B/C/D/D+ を網羅。
- 授業: **10本**（基礎3 ＋ キラー7）。
- タグ: **125+種**。ラボ: **約36種**。

---

## 2. Prisma スキーマの現状（`prisma/schema.prisma`）

- `datasource db { provider = "postgresql" }`（URLは `prisma.config.ts` 側、Prisma7仕様）
- **enum は使わない**（過去にSQLite検討した名残＋シンプル化）。`difficulty` / `type` は **String**。

```
Problem
  id, slug(@unique), title, unit, difficulty(String "A".."D_PLUS"),
  statement, tagline?, hasGraph(Bool), graphConfig(Json? {graphKey}),
  relatedLessonSlug(String?), tags(String[]),
  steps  ExplanationStep[]      ← 1対多
  dailyOn DailyChallenge[]
  @@index([unit]) @@index([difficulty])

ExplanationStep
  id, problemId → Problem(onDelete: Cascade),
  type(String "INSIGHT"|"EXPERIMENT"|"HINT"|"SOLUTION"), order(Int),
  title, body, relatedLessonSlug(String?)
  @@unique([problemId, order])

Lesson                          ← Problem とは slug で疎結合（FKなし）
  id, slug(@unique), title, unit, summary?, content(String: Markdown+KaTeX+@@lab),
  relatedProblemSlugs(String[]), tags(String[])
  @@index([unit])

ExamAttempt                     ← 模試結果（匿名）
  id, sessionId(String), createdAt,
  tags[], difficulties[], problemSlugs[], timeLimitSec,
  wrongSlugs[], score, totalCount, durationSec, weakTags[]
  @@index([sessionId]) @@index([createdAt])

DailyChallenge
  id, date, slot, problemId → Problem  @@unique([date, slot]) @@index([date])
```
- **Tag は独立モデルではなく `String[]`**（Problem/Lesson）。集計は `content.ts` の `getAllTags()`。
- **未反映**: `ExamAttempt` 追加・問題4問・授業7本・tags 列。ユーザーが手動で `npx prisma db push` → `npx prisma db seed` を実行する想定（静的データなので画面は反映済み）。

---

## 3. 絶対に守るべきルール（破壊厳禁）

1. **DB接続設定を上書き・初期化しない**:
   - `prisma.config.ts`（dotenv読込＋`datasource.url`＋`seed: npx tsx`）
   - `src/lib/prisma.ts`（`new Pool({ ssl:{ rejectUnauthorized:false } })` ＋ `PrismaPg` adapter）
   - `prisma/seed.ts` の **上部**（Pool/PrismaPg/dotenv）。**下半分**（PROBLEMS/LESSONS の投入ループ、クリーンアップ順 dailyChallenge→explanationStep→problem→lesson）は編集可。
2. **数学・KaTeX の厳密性**: 論理の飛躍・省略・Interactive Mode は禁止。完全な KaTeX 構文で厳密証明を書く。
3. **KaTeX 前置下付きの罠**: `String.raw` テンプレ内で `$` の直後に `{` が来ると JS の `${...}` 補間と誤認され**ビルドが落ちる**。`{}_n\mathrm{C}_r` は必ず **`$ {}_n...`（半角スペース）**。`\binom{}{}` は安全。
4. **PowerShell でソース/データを書き換えない**（PS5.1 が UTF-8 日本語を文字化けさせる）。編集は Edit/Write ツール。**ビルド/lint の実行**は PowerShell でOK（Bash は PATH が壊れがち）。
5. **`react-hooks/purity` lint**: コンポーネント内で `Date.now()`/`Math.random()` を直接呼ぶとエラー。`lib/exam.ts` の `nowMs()` 等の純粋でない処理は別モジュールに逃がす。
6. **Next 16 の破壊的変更**: `params`/`searchParams` は Promise（await）。`PageProps<'/route'>` グローバル型あり。コード前に `node_modules/next/dist/docs/` の該当ガイドを読む（AGENTS.md 指示）。
7. **DB列追加・問題追加後**は、ユーザーに `prisma db push` ＋ `db seed` の実行を案内する（自分では DB を触らない）。

---

## 4. 実装状況と今後

### ✅ 実装済み（このセッションまで）
- 数IA・IIB 全単元（A/B/C/D/D+）、タグ機能（`/tags`）、授業3本＋クロスリンク。
- **スキルツリーUI** `/lessons`（金/真紅の elite ティア「難問対策・解法戦略」）。
- **サイバー模試** `/mock`（生成→タイマー→自己採点→弱点タグ→授業誘導、localStorage＋DB保存、`@media print` の白黒答案）。
- **キラー授業7本＋動的ラボ7種**: domino-induction-visualizer / geometry-three-lenses / cauchy-schwarz-vectors / trig-unit-circle-transform / spider-web-plot(クモの巣, `updateDataArray`) / oblique-coordinates / log-scale-slider。
- **旧帝大4問**: 正四面体(D+) / 完全順列(D) / 共通接線(D) / 1/12公式(D+)。

### ⬜ 今後の候補
- **未実装の placeholder ラボ**: 2B の C以上で `@@lab:<key>@@` を置いたが component 未実装のキーがある（MathText が null安全で無表示）。順次 JSXGraph 実装すれば自動で出現。
- **模試の履歴ページ** `/mock/history`（`readAttemptsLocal()` / `ExamAttempt` 集計）。
- 数III・共通テスト対策など**コンテンツ拡張**。
- 認証＋進捗のDB永続化（現在 localStorage）。
- ラボの仕上げ（domino/oblique 等の見た目調整）、モバイル最適化。

### ラボ追加の手順（重要）
1. `src/components/graph/labs/XxxLab.tsx` を実装（`JsxBoard` 利用、`init(board)` で `board.create(...)`）。
2. `src/lib/types.ts` の `GraphKey` union に key 追加。
3. `LabRenderer.tsx` の REGISTRY に `{ Component, caption }` を追加（**union に足したら REGISTRY 必須**＝Record全キー）。
4. 問題/授業の本文に `@@lab:<key>@@`（独立行）で埋め込む。
