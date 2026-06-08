# Next-Gen Cyber Math — プロジェクト現状サマリー（引き継ぎ）

> 次セッションの自分へ。まずこのファイルと `AGENTS.md` を読むこと。`node_modules` は走査しない（`.gitignore` 済み）。

最終更新: 2026-06 / ビルド: **green（568 静的ページ）** / lint: clean
デザイン: **白背景 Light Cyber（Glassmorphism）** へ移行済み（旧ダークテーマは廃止）。

---

## 1. 技術スタックとアーキテクチャ

- **Frontend**: Next.js **16**（App Router, Turbopack）/ React **19** / TypeScript
- **Style**: Tailwind CSS **v4**（CSS-first, `tailwind.config` なし）/ shadcn/ui / motion(Framer Motion)。テーマは `globals.css` の **Light Cyber**（白〜極薄グレー背景＋極細ブルーグリッド、`.glass`＝白半透明＋`backdrop-blur`、ネオンは AA コントラスト確保のため濃色化、Glow 抑制、`color-scheme: light`）。
- **数式**: KaTeX（`Math.tsx` でサーバーレンダリング）
- **Markdown授業**: react-markdown + remark-math + remark-gfm + rehype-katex
- **動的グラフ**: JSXGraph（クライアントで遅延ロード、`JsxBoard` でラップ。白ボード＋スレート軸＋黒文字 `#111827`／`#475569` の Light Cyber 仕様）
- **DB/ORM**: Prisma **7** + `@prisma/adapter-pg` + `pg`（**Render Managed PostgreSQL**）
- **★アーキテクチャの肝**: **静的データ駆動**。画面は `src/data/*` → `src/lib/content.ts` 経由で **SSG** 描画。**DB は永続化用**で、アプリ実行時のレンダリングには使わない（`/api/exam/attempts` のみ実行時にDBへ書く）。模試履歴・進捗・挑戦ストリークは **localStorage**（`useSyncExternalStore`）。

### ディレクトリ概要
```
src/
├─ app/
│  ├─ page.tsx                     トップ（ヒーロー＋難易度ピラミッド＋「私からの挑戦」＋導線: 特訓/マイページ）
│  ├─ units/page.tsx               単元カード一覧（IA / IIB / 発展 の3層）
│  ├─ units/[unitSlug]/page.tsx    単元別の問題＋授業
│  ├─ problems/[slug]/page.tsx     問題詳細（段階的論理開示 LogicSteps）
│  ├─ lessons/page.tsx             スキルツリーUI（eliteティア=難問対策, Light Cyber化済み）
│  ├─ lessons/[slug]/page.tsx      授業（LessonRenderer）
│  ├─ tags/page.tsx, tags/[tag]/   タグ雲・タグ別一覧（非ASCIIは decode 必須）
│  ├─ mock/page.tsx                ★模試（config→running→result の状態機械。スマートUI＋時間逆算）
│  ├─ mock/history/page.tsx        ★マイページ/分析ダッシュボード（localStorage購読, カスタムSVGグラフ）
│  ├─ drill/page.tsx               ★サイバー計算特訓・シャトルラン（useReducer 状態機械）
│  └─ api/exam/attempts/route.ts   模試結果を ExamAttempt に保存（POST）
├─ data/
│  ├─ problems.ts                  集約。RAW_PROBLEMS に PROBLEM_TAGS をマージして PROBLEMS を作る（mock-only / complex-plane もマージ）
│  ├─ units/*.ts                   単元ごとの問題（IA 8 ＋ IIB 9 ＋ complex-plane.ts ＋ mock-only.ts ＋ showcase）
│  ├─ units/mock-only.ts           ★初見殺しプール（isMockOnly:true）
│  ├─ units/complex-plane.ts       ★複素数平面（正三角形条件など）
│  ├─ lessons.ts                   授業10本（うちキラー7本=unit「難問対策・解法戦略」）
│  ├─ problem-tags.ts              1A問題への slug→tags マップ（問題を直接編集しない）
│  ├─ units-meta.ts                単元レジストリ（slug/name/description/order）
│  └─ tags.ts                      tagColor(ハッシュ)・tagSlug/tagFromSlug
├─ components/
│  ├─ graph/JsxBoard.tsx           JSXGraph ラッパ（白ボード＋スレート軸。interface JxgBoard に create/update）
│  ├─ graph/LabRenderer.tsx        graphKey → ラボ component の REGISTRY（**全61キー必須**）
│  ├─ graph/labs/*.tsx             ラボ実装（**約61種**）
│  ├─ math/Math.tsx                MathText/InlineMath（KaTeX＋`@@lab:<key>@@` を LabRenderer に置換, null安全）
│  ├─ scaffolding/LogicSteps.tsx   着眼点→実験→ヒント→解答 のゲート式開示＋LessonLink
│  ├─ lessons/LessonRenderer.tsx   Markdown描画（`@@lab` を split→LabRenderer）
│  ├─ lessons/LessonNode.tsx       スキルツリーのノード（elite=金枠/シャドウ/slate-800高コントラスト）
│  ├─ daily/DailyTriple.tsx        ★「私からの挑戦」＋MISSION CLEARED＋🔥ストリーク
│  ├─ mock/PresetBar / TagSelector / UnitTagGroup   模試スマートUI（プリセット・階層タグ）
│  ├─ mock/history/*               ★SummaryCards / ScoreTrendChart / UnitRadarChart / WeakTagPanel / AttemptList
│  ├─ mock/MockTimer.tsx           カウントダウン
│  └─ shell/*                      SiteHeader(nav: 単元/授業/タグ/模試/特訓/挑戦), ProblemCard, UnitCard, TagChip, DifficultyBadge
├─ lib/
│  ├─ content.ts                   getAllProblems(PUBLIC)/getProblem(フル)/getAllSlugs(フル)/getUnit*/getLesson*/getAllTags/getProblemsByTag/getChallengeProblems …
│  ├─ types.ts                     Difficulty, StepType, GraphKey(union 61), Problem(+isMockOnly), Lesson, UnitMeta
│  ├─ exam.ts                      模試生成・時間逆算(buildExamPlan/generateExamByPlan/forceBlendMockOnly)・採点・弱点・session・履歴localStorage＋購読(subscribeAttempts/getAttemptsSnapshot/clearAttemptsLocal)
│  ├─ exam-taxonomy.ts             模試スマートUIの分類（単元→タグ, プリセット）
│  ├─ history.ts                   ダッシュボード集計（summarize/scoreTrend/unitStats/weakTagRanking/recommendedLessons/mockOnlyProblemsOf/wrongProblemsOf）
│  ├─ drill.ts                     計算特訓の無限生成（nextChallenge/timeForStage/CORRECT_PER_STAGE, Math.random隔離）
│  ├─ prisma.ts                    ★Render接続（不可侵）
│  └─ progress.ts / hooks/useProgress.ts  進捗・連続日数(localStorage, useSyncExternalStore)
prisma/
├─ schema.prisma                   下記モデル
└─ seed.ts                         ★上部の接続設定は不可侵。下半分で PROBLEMS/LESSONS を投入
prisma.config.ts                   ★不可侵（dotenv + datasource url + seed: npx tsx）
```

### コンテンツ規模（概算・最新）
- 問題: **約308問**（数IA・IIB 全単元 A〜D+。各単元の **C/D/D+ は超厳密化済み**＝複数解法・別解・メタ思考・全 C 以上に EXPERIMENT）。
- **初見殺しプール（isMockOnly:true）: 6問**（重みつき最小・Sophie Germain・直交接線の準線・確率漸化式・正三角形条件・ルジャンドル）。通常導線から隠蔽。
- 授業: **10本**（基礎3 ＋ キラー7）。
- タグ: **約200種**。**ラボ: 61種**（JSXGraph）。

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
- **`isMockOnly` は静的データのみのフラグ**（schema には未追加。模試の隠蔽・ブレンドは `content.ts`/`exam.ts` で完結）。スキーマに保存したい場合は `Problem` に `isMockOnly Boolean @default(false)` を足す。
- **DB 未反映の蓄積**: 問題・授業・ラボ・`isMockOnly` 等は静的データ側で完結し画面は反映済み。DB へ載せるには **ユーザーが手動で** `npx prisma db push` → `npx prisma db seed`。

---

## 3. 絶対に守るべきルール（破壊厳禁）

1. **DB接続設定を上書き・初期化しない**:
   - `prisma.config.ts`（dotenv読込＋`datasource.url`＋`seed: npx tsx`）
   - `src/lib/prisma.ts`（`new Pool({ ssl:{ rejectUnauthorized:false } })` ＋ `PrismaPg` adapter）
   - `prisma/seed.ts` の **上部**（Pool/PrismaPg/dotenv）。**下半分**（PROBLEMS/LESSONS の投入ループ、クリーンアップ順 dailyChallenge→explanationStep→problem→lesson）は編集可。
2. **デザインは Light Cyber（白背景 Glassmorphism）を厳守**: 新規UIも白半透明＋`backdrop-blur`、ボーダーにシアン/ブルー、テキストは高コントラスト（`text-slate-800`/`--foreground`）。JSXGraph ラボは白ボード・黒文字（`theme.ts` の `INK=#111827`・NEON 濃色版）。
3. **数学・KaTeX の厳密性**: 論理の飛躍・省略は禁止。完全な KaTeX 構文で厳密証明。C 以上は必ず `EXPERIMENT` ステップを入れる。
4. **KaTeX 前置下付きの罠**: `String.raw` テンプレ内で `$` の直後に `{` が来ると JS の `${...}` 補間と誤認され**ビルドが落ちる**。`{}_n\mathrm{C}_r` は必ず **`$ {}_n...`（半角スペース）**。`\binom{}{}` は安全。
5. **PowerShell でソース/データを書き換えない**（PS5.1 が UTF-8 日本語を文字化けさせる）。編集は Edit/Write ツール。**ビルド/lint の実行**は PowerShell でOK（Bash は PATH が壊れがち）。
6. **lint（React Compiler 系）**:
   - `react-hooks/purity`: コンポーネントの render で `Date.now()`/`Math.random()`/`performance.now()` を直接呼ばない。`lib/exam.ts`(`nowMs`)・`lib/drill.ts` 等に隔離し、ハンドラ/エフェクトから呼ぶ。
   - `react-hooks/set-state-in-effect`: エフェクト本体で同期 `setState` 禁止。localStorage は `useSyncExternalStore`（subscribe＋snapshotキャッシュ＋serverSnapshot=[]）で読む。タイマーは `setTimeout`/`requestAnimationFrame` の callback 内で setState。
   - `react-hooks/refs`: render 中に `ref.current = …` を書かない（エフェクトで同期）。
7. **Next 16 の破壊的変更**: `params`/`searchParams` は Promise（await）。`PageProps<'/route'>` グローバル型あり。コード前に `node_modules/next/dist/docs/` の該当ガイドを読む（AGENTS.md 指示）。
8. **DB列追加・問題追加後**は、ユーザーに `prisma db push` ＋ `db seed` の実行を案内する（自分では DB を触らない）。

---

## 4. 実装の土台（恒久機能・〜前フェーズ）

- 数IA・IIB **全単元**（A/B/C/D/D+）。前フェーズで **全単元の C/D/D+ を「予備校トップ講師レベル」へ超厳密化**（途中式・同値変形・場合分け根拠・複数解法・メタ思考、C 以上に EXPERIMENT、`@@lab` 埋め込み）。
- タグ機能（`/tags`）、スキルツリー授業 `/lessons`、段階的論理開示 `LogicSteps`。
- **サイバー模試** `/mock`：スマートUI（クイックプリセット／単元-タグの階層トグル／**時間逆算アルゴリズム** `buildExamPlan`）→ タイマー → 自己採点 → 弱点タグ → 授業誘導。localStorage＋DB保存、`@media print` の白黒答案。
- **動的ラボ 61種**（JSXGraph, Light Cyber 白対応）。`@@lab:<key>@@` を MathText/LessonRenderer が LabRenderer に差し替え。

---

## 5. 実装済み（このセッションで追加された機能）

### 【タスク1】ELITE授業ノードの視認性修正（`components/lessons/LessonNode.tsx`）
- タイトル文字色を **`text-slate-800`（高コントラスト）** へ。白背景との同化を解消。
- ELITE感は **金枠（`#b45309`）＋微シャドウ＋「ELITE · 難問対策」バッジ（Crown）＋金のノードドット**で表現。カード背景も白ガラス＋淡い金グラデへ統一。

### 【タスク2】「私からの挑戦」＋ストリーク演出（`components/daily/DailyTriple.tsx` / `lib/content.ts`）
- トップの「今日の3題」→ **「私からの挑戦」**へ改称（ラベル MY CHALLENGE）。
- 出題はランダム廃止。`content.ts` の **`getChallengeProblems()`（`CHALLENGE_SLUGS` キュレーション配列）** から取得（存在しない slug は無視し今日の3題で補完）。
- 3問すべて完了で **「MISSION CLEARED」ガラスバナー＋🔥連続日数**（`useProgress` のストリークに連動）。

### 【タスク3】模試専用プール（初見殺し）
- `types.ts` の `Problem` に **`isMockOnly?: boolean`** を追加。
- `content.ts` に **`PUBLIC_PROBLEMS = PROBLEMS.filter(p => !p.isMockOnly)`**。公開系（`getAllProblems`/`getUnits`/`getProblemsByUnit(Slug)`/`getUnitSummaries`/`getAllTags`/`getProblemsByTag`/`getDailyTriple`）は PUBLIC を参照し**初見問題を完全隠蔽**。`getProblem`/`getAllSlugs` はフル（`/problems/[slug]` は SSG 生成され、模試・履歴復習の直リンクで到達可）。
- `data/units/mock-only.ts`（初見 C/D を厳密解説つきで作成）＋他単元の初見問題（複素数平面 D+、整数 D 等）に `isMockOnly:true`。
- `exam.ts` の **`generateExamByPlan`**：通常抽出から初見を除外し、**`forceBlendMockOnly`** で「C 以上が出題されるなら必ず 1 問だけ初見を強制注入」（同難度の通常枠を置換、総数・配分不変）。`buildExamPlan` の在庫見積りも初見を除外。

### 【タスク4】マイページ／分析ダッシュボード（`/mock/history`）
- `lib/history.ts`（純関数）：`summarize`（受験回数/総解答/平均スコア/累計時間）・`scoreTrend`・`unitStats`・`weakTagRanking`（誤答タグの生集計）・`recommendedLessons`（弱点タグ→`getLessonsByTag` でカバー重み順）・`mockOnlyProblemsOf`/`wrongProblemsOf`。
- コンポーネント（**グラフは依存追加なしのカスタムSVG**）：`SummaryCards` / `ScoreTrendChart`（折れ線・ホバーで値）/ `UnitRadarChart`（単元別正答率レーダー、軸<3 は棒）/ `WeakTagPanel`（弱点タグを頻度で強調＋おすすめ授業カード `/lessons/[slug]`）/ `AttemptList`（**行クリックで展開し、その回の初見問題＋誤答を `/problems/[slug]` で復習**）。
- `exam.ts` に `useSyncExternalStore` 用 **`subscribeAttempts`/`getAttemptsSnapshot`/`getAttemptsServerSnapshot`/`clearAttemptsLocal`** ＋保存・削除時のカスタムイベント通知。トップ・`/mock` から導線。

### 【タスク5】サイバー計算特訓・シャトルラン（`/drill`）
- `lib/drill.ts`：**無限生成**（`nextChallenge(stage)`）＝平方完成・因数分解・展開・微分係数・約数の個数の **5 種**を 4 択化（正解1＋ダミー3、係数表記は `xterm`/`cterm` で整形）。`timeForStage`/`CORRECT_PER_STAGE`、Math.random は本モジュールに隔離。
- `app/drill/page.tsx`：**`useReducer` の状態機械**（`idle`→`countdown`→`playing`→`over`）。待機画面「最初に、紙とペンを用意してください。」＋`SYSTEM START`。**ライフ3／5問正解でステージ↑・制限時間短縮**。上部の**プログレスバーは残り割合で色変化（シアン→アンバー→真紅＋pulse）**、STAGE↑フラッシュ、GAME OVER で到達ステージ表示。`SiteHeader` に「特訓」ナビ追加。

### 【コンテンツ拡張】難関頻出ギャップの解消（直近フェーズ）
- 新規 9 問：空間ベクトル3（四面体の体積/平面の方程式・距離/対称点）・数列3（群数列/確率漸化式と極限/3項間漸化式）・確率1（二項分布の最頻値）・複素数平面1（正三角形条件）・整数1（ルジャンドル）。
- 新規ラボ4種：`plane-normal-distance` / `grouped-sequence` / `prob-state-transition` / `binomial-mode`。

---

## 6. 今後の候補

- **★「過去問道場」の構築（制限解除後の本命）**:
  - `Problem` に `university?`（大学名）・`year?`（年度）・`source?` メタを追加（静的データ→任意で schema 拡張）。
  - `/dojo`（または `/past`）を新設：大学別／年度別／難易度別フィルタUI、年度横断の出題、`useProgress` と連携した攻略トラッキング、模試（`/mock`）への束ね出題。
  - 過去問データの投入は単元ファイルと同様 `src/data/past/*.ts` に分割し `problems.ts` へマージ。`isMockOnly` と併用して「初見の過去問」も設計可能。
- **DB 反映**: 蓄積した問題・ラボ・`isMockOnly` を `prisma db push` ＋ `db seed`（ユーザー実行）。schema に `isMockOnly`/過去問メタ列を足すか検討。
- **認証＋進捗のDB永続化**（現在は localStorage の `useProgress`／模試履歴）。
- 数III・共通テスト対策など**さらなるコンテンツ拡張**、モバイル最適化、ラボの見た目仕上げ。

### ラボ追加の手順（重要）
1. `src/components/graph/labs/XxxLab.tsx` を実装（`JsxBoard` 利用、`init(board)` で `board.create(...)`。色は `theme.ts` の `NEON`/`INK`/`curveStyle` 等＝白背景・黒文字）。
2. `src/lib/types.ts` の `GraphKey` union に key 追加。
3. `LabRenderer.tsx` の REGISTRY に `{ Component, caption }` を追加（**union に足したら REGISTRY 必須**＝Record全61キー）。
4. 問題/授業の本文に `@@lab:<key>@@`（独立行）で埋め込む。
5. 検証は一時ページ `src/app/labtest/page.tsx` を作って `LabRenderer` で描画→確認後に削除（または問題ページの EXPERIMENT 経由で確認）。
