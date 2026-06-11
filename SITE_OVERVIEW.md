# CYBER OS — サイト全体概要ドキュメント

> **このドキュメントの用途:** プロジェクト全体の構造・技術・コンテンツを他のAI（Gemini, ChatGPT 等）に伝えるための包括的なリファレンスです。

---

## 1. プロジェクト概要

**CYBER OS** は日本の高校生向け次世代学習プラットフォームです。数学（IA / IIB）と英語を対象に、段階的論理開示・インタラクティブグラフ・模試生成・AI師範・メンター管理など多彩な機能を持ちます。

**テーマ:**「数学の美しさと真の理解を、極限まで」

- 単なる解説ではなく「なぜそうなるか」を自分で発見させる設計
- サイバーパンク系ネオンデザイン（grid背景、glow accent、neon色変数）
- 静的データ（`src/data/`）がコンテンツのシングルソース — DBなしでも動作

---

## 2. 技術スタック

| 要素 | 技術 |
|------|------|
| フレームワーク | Next.js 16 (App Router) + React 19 + TypeScript 5 |
| スタイリング | Tailwind CSS v4 (CSS-first) + shadcn/ui |
| アニメーション | Framer Motion (motion v12) |
| 数式レンダリング | KaTeX 0.17（rehype-katex / remark-math でサーバーサイドレンダリング）|
| インタラクティブグラフ | JSXGraph 1.12.2（クライアント動的インポート）|
| データベース | PostgreSQL（Render本番）/ SQLite（ローカル開発） |
| ORM | Prisma 7（driver-adapter-pg + adapter-libsql）|
| 認証 | JWT（jose、7日間有効）+ bcryptjs パスコードハッシュ |
| AI機能 | Google Generative AI（@google/generative-ai 0.24）— AI Oracle |
| ホスティング | Render.com（Web Service + Managed PostgreSQL）|

### 主要依存ライブラリ

```json
{
  "next": "^16",
  "react": "^19",
  "typescript": "^5",
  "prisma": "^7.8",
  "katex": "^0.17",
  "jsxgraph": "^1.12.2",
  "motion": "^12.40",
  "jose": "^5.10",
  "bcryptjs": "^3",
  "@google/generative-ai": "^0.24.1",
  "react-markdown": "^10.1",
  "lucide-react": "latest",
  "class-variance-authority": "latest"
}
```

### npm スクリプト

```bash
npm run dev          # 開発サーバー (http://localhost:3000)
npm run build        # prisma generate && next build
npm run db:push      # スキーマをDBに同期
npm run db:seed      # src/data/ → DB 投入
```

---

## 3. ディレクトリ構造

```
cyber-math/
├── src/
│   ├── app/                    # Next.js App Router ルート
│   │   ├── page.tsx            # ポータル（Math/English 選択）
│   │   ├── layout.tsx          # ルートレイアウト + KaTeX CSS
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── math/page.tsx       # 数学ホーム
│   │   ├── english/page.tsx    # 英語ホーム
│   │   ├── drill/page.tsx      # 連打ドリル（3残機、時間制限）
│   │   ├── calc-drill/page.tsx # 計算ドリル（30秒 4択）
│   │   ├── dojo/page.tsx       # 過去問道場（偏差値×単元フィルタ）
│   │   ├── mock/page.tsx       # 模試生成
│   │   ├── mock/history/page.tsx
│   │   ├── lessons/page.tsx    # スキルツリー
│   │   ├── lessons/[slug]/page.tsx
│   │   ├── problems/[slug]/page.tsx
│   │   ├── units/page.tsx
│   │   ├── units/[unitSlug]/page.tsx
│   │   ├── tags/page.tsx
│   │   ├── tags/[tag]/page.tsx
│   │   ├── mypage/page.tsx
│   │   ├── mission/[id]/page.tsx
│   │   ├── mentor/page.tsx     # 師範ダッシュボード（MENTOR専用）
│   │   ├── abyss/page.tsx      # ガチャ式レア問題プール
│   │   ├── english/
│   │   │   ├── speed-reading/page.tsx
│   │   │   ├── speed-reading/[id]/page.tsx
│   │   │   ├── comprehension/page.tsx
│   │   │   ├── comprehension/[id]/page.tsx
│   │   │   ├── multi-source/page.tsx
│   │   │   ├── multi-source/[id]/page.tsx
│   │   │   ├── vocab/page.tsx
│   │   │   └── grammar/page.tsx
│   │   └── api/                # REST API（Route Handlers）
│   │       ├── auth/{register,login,logout,me}/route.ts
│   │       ├── exam/attempts/route.ts
│   │       ├── english-attempts/route.ts
│   │       ├── mission/route.ts
│   │       ├── mission/[id]/route.ts
│   │       ├── mentor/{students,stats,daily,mission,message}/route.ts
│   │       ├── oracle/route.ts      # AI ヒント生成
│   │       └── abyss/gacha/route.ts
│   │
│   ├── components/             # Reactコンポーネント
│   │   ├── auth/AuthForm.tsx
│   │   ├── calc/CalcDrillGame.tsx
│   │   ├── daily/DailyTriple.tsx
│   │   ├── dashboard/
│   │   │   ├── AIOracle.tsx
│   │   │   └── LearningCalendar.tsx
│   │   ├── dojo/DojoExplorer.tsx
│   │   ├── english/
│   │   │   ├── SpeedReadingGame.tsx
│   │   │   ├── ComprehensionViewer.tsx
│   │   │   ├── MultiSourceViewer.tsx
│   │   │   ├── GrammarDrillGame.tsx
│   │   │   ├── VocabFlashcardGame.tsx
│   │   │   └── EnglishMissionViewer.tsx
│   │   ├── graph/
│   │   │   ├── JsxBoard.tsx
│   │   │   ├── LabRenderer.tsx   # graphKey → 各Lab への dispatch
│   │   │   └── labs/             # 50+ インタラクティブラボ
│   │   ├── lessons/
│   │   │   ├── LessonRenderer.tsx
│   │   │   └── LessonNode.tsx
│   │   ├── math/Math.tsx         # KaTeX ラッパー（Inline/Block/MathText）
│   │   ├── mentor/
│   │   │   ├── StudentRoster.tsx
│   │   │   ├── DailyChallengeEditor.tsx
│   │   │   ├── EmergencyMissionEditor.tsx
│   │   │   ├── MessageEditor.tsx
│   │   │   ├── WeakTagStats.tsx
│   │   │   └── MentorTabBar.tsx
│   │   ├── messages/MessageBar.tsx
│   │   ├── mission/
│   │   │   ├── EmergencyMissionPanel.tsx
│   │   │   └── MissionViewer.tsx
│   │   ├── mock/
│   │   │   ├── PresetBar.tsx
│   │   │   ├── TagSelector.tsx
│   │   │   ├── UnitTagGroup.tsx
│   │   │   ├── MockTimer.tsx
│   │   │   └── history/
│   │   │       ├── AttemptList.tsx
│   │   │       ├── ScoreTrendChart.tsx
│   │   │       ├── UnitRadarChart.tsx
│   │   │       └── WeakTagPanel.tsx
│   │   ├── scaffolding/
│   │   │   ├── LogicSteps.tsx    # 段階的論理開示（ゲートアコーディオン）
│   │   │   ├── ApproachTabs.tsx  # 複数解法タブ
│   │   │   ├── WhyPopover.tsx    # @@why トークン
│   │   │   └── LessonLink.tsx
│   │   ├── shell/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── DifficultyBadge.tsx
│   │   │   ├── ProblemCard.tsx
│   │   │   ├── TagChip.tsx
│   │   │   └── UnitCard.tsx
│   │   └── ui/                   # shadcn/ui プリミティブ
│   │
│   ├── data/                   # ★コンテンツのシングルソース
│   │   ├── problems.ts
│   │   ├── dojo.ts
│   │   ├── expansion-pack-{1,2,3}.ts
│   │   ├── abyss-pack-{1,2}.ts
│   │   ├── units/              # 単元別問題（19ファイル）
│   │   ├── lessons.ts + lessons/
│   │   ├── units-meta.ts
│   │   ├── problem-tags.ts
│   │   ├── calc-drill.ts
│   │   ├── grammar-drill.ts
│   │   ├── vocab-flashcards.ts
│   │   ├── english-speed-reading.ts + english-speed-reading-pack-{1..7}.ts
│   │   ├── english-comprehension.ts + english-comprehension-pack-{1..7}.ts
│   │   ├── english-multisource.ts + english-multisource-pack-{1..3}.ts
│   │   └── why.ts
│   │
│   ├── hooks/
│   │   └── useProgress.ts      # useSyncExternalStore → localStorage
│   │
│   └── lib/
│       ├── types.ts            # Problem, Lesson, Difficulty, GraphKey 等
│       ├── english-types.ts    # 英語問題の型定義
│       ├── auth.ts             # JWT / Cookie ユーティリティ
│       ├── content.ts          # getProblem / getAllProblems 等
│       ├── exam.ts             # 模試生成アルゴリズム
│       ├── exam-taxonomy.ts    # プリセット設定
│       ├── drill.ts            # ドリルゲームロジック
│       ├── history.ts          # localStorage 受験履歴
│       ├── english-history.ts  # 英語学習記録
│       ├── progress.ts         # デイリーストリーク
│       ├── prisma.ts           # Prisma クライアント（driver-adapter）
│       └── utils.ts            # cn(), difficultyColor() 等
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── render.yaml                 # Render.com デプロイ設定
├── next.config.ts
├── tailwind.config.*           # Tailwind CSS v4 では最小構成
└── tsconfig.json
```

---

## 4. ルーティング一覧

### 数学

| パス | 機能 |
|------|------|
| `/` | ポータル（数学/英語 選択） |
| `/math` | 数学ホーム（デイリー3題、クイックリンク） |
| `/drill` | 連打ドリル（3残機 + 難易度自動昇格） |
| `/calc-drill` | 計算ドリル（30秒 4択 × 101問） |
| `/dojo` | 過去問道場（偏差値50〜70 × 単元フィルタ） |
| `/mock` | 模試生成（時間逆算アルゴリズム） |
| `/mock/history` | 受験履歴・分析（スコアトレンド/レーダー/弱点タグ） |
| `/lessons` | スキルツリー（単元別 + 難問対策エリート） |
| `/lessons/[slug]` | 個別レッスン（証明/応用/演習 3層構成） |
| `/problems/[slug]` | 問題詳細（段階的論理開示 + 複数解法 + グラフ） |
| `/units` | 単元一覧 |
| `/units/[unitSlug]` | 単元内問題（難易度フィルタ付き） |
| `/tags` | タグ一覧 |
| `/tags/[tag]` | タグ別問題一覧 |
| `/mypage` | マイページ（進捗・アカウント） |
| `/mission/[id]` | 緊急ミッション詳細 |
| `/mentor` | 師範ダッシュボード（MENTOR権限専用） |
| `/abyss` | 特異点ガチャ（隠しレア問題） |

### 英語

| パス | 機能 |
|------|------|
| `/english` | 英語ホーム |
| `/english/speed-reading` | 速読問題一覧 |
| `/english/speed-reading/[id]` | 速読（文章 + タイマー + 4択） |
| `/english/comprehension` | 精読問題一覧 |
| `/english/comprehension/[id]` | 精読（SVOCM構文解析 + 解説） |
| `/english/multi-source` | マルチソース照合一覧 |
| `/english/multi-source/[id]` | 3ソース問題（TEXT/TABLE/BULLETS） |
| `/english/vocab` | 語彙フラッシュカード |
| `/english/grammar` | 文法ドリル |

### 認証・管理

| パス | 機能 |
|------|------|
| `/auth/login` | ログイン |
| `/auth/register` | 新規登録（メンターコードで役割分岐） |

---

## 5. 主要コンポーネント詳解

### 段階的論理開示（Scaffolding）

`LogicSteps.tsx` — 問題の解法を以下の順で段階的にアンロック：

1. **INSIGHT（着眼点）** — 初期ロック
2. **EXPERIMENT（実験）** — INSIGHT 開放後に解錠
3. **HINT（ヒント）** — EXPERIMENT 開放後に解錠
4. **SOLUTION（厳密な解答）** — HINT 開放後に解錠
5. **GUIDANCE_ANALYSIS（誘導の意図）** — 任意（試験作問者の意図解説）

目的：答えをただ見るのではなく、思考プロセスを自ら踏ませる。

### インタラクティブグラフ（JSXGraph Labs）

- `LabRenderer.tsx` が `graphKey` 文字列を 50+ の具体的な Lab コンポーネントにディスパッチ
- レッスン/問題の Markdown 内に `@@lab:<graphKey>@@ <キャプション>` で埋め込み
- クライアントサイドで遅延ロード（SSR なし）

Lab の例：
- `am-gm-min` — AM-GM 不等式スライダー
- `parabola-family` — 2次関数族
- `riemann-sum` — リーマン和の可視化
- `complex-rotation-multiply` — 複素数平面の回転
- `segment-envelope` — 包絡線
- `convexity-jensen` — イェンセンの不等式
- （他 40+ 種類）

### KaTeX レンダリング

`Math.tsx` の 3 コンポーネント：
- `<InlineMath tex="..." />` — インライン数式
- `<BlockMath tex="..." />` — ディスプレイ数式
- `<MathText text="..." />` — スマートパーサー（`$...$` を検出し `@@why`/`@@lab` トークンも処理）

**重要:** テンプレートリテラル内では `$ {}` (スペースあり) と書く（`${}` はテンプレートリテラルと衝突するため）

### 模試生成アルゴリズム（exam.ts）

1. 入力：制限時間（分）、難易度選択、タグフィルタ
2. 時間アンカー（15/50/120分）から難易度ウェイト算出
3. 難易度別問題数を割り当て
4. Fisher–Yates シャッフル → スライス
5. クライアントサイドで採点（サーバー不要）

### 師範ダッシュボード（Mentor）

`role === "MENTOR"` ユーザーのみアクセス可。4タブ構成：

1. **Students** — 生徒一覧、受験数、最終ログイン
2. **Daily** — 今日の3問設定（スロット1〜3 + 日付ピッカー）
3. **Mission** — 緊急ミッション発令（生徒 + 問題 + メッセージ）
4. **Stats** — 全生徒の弱点タグ頻度、英語モード内訳

---

## 6. データ構造（型定義）

### Problem（数学問題）

```typescript
interface Problem {
  slug: string;                    // URL識別子（一意）
  title: string;                   // タイトル
  unit: string;                    // 単元名
  difficulty: "A" | "B" | "C" | "D" | "D_PLUS" | "EX" | "OLYMPIAD";
  statement: string;               // 問題文（Markdown + KaTeX）
  tagline?: string;                // カード用キャッチコピー
  hasGraph: boolean;
  graphKey?: GraphKey;             // Lab識別子
  steps: ExplanationStep[];        // 段階的開示ステップ
  relatedLessonSlug?: string;
  tags?: string[];                 // 概念タグ
  isMockOnly?: boolean;            // 模試専用（検索に出ない）
  tier?: "STANDARD" | "ABYSS";    // ガチャプールマーカー

  // 道場メタデータ
  university?: string;
  deviation?: 50 | 55 | 60 | 65 | 70;
  year?: number;
  backgroundTag?: string;
  approaches?: Approach[];         // 複数解法
}

interface Approach {
  id: string;
  label: string;        // "代数" | "幾何" | "ベクトル" | "複素数"
  tagline?: string;
  body: string;         // 解答本文（Markdown + KaTeX）
}

interface ExplanationStep {
  type: "INSIGHT" | "EXPERIMENT" | "HINT" | "SOLUTION" | "GUIDANCE_ANALYSIS";
  order: number;
  title: string;
  body: string;         // Markdown + KaTeX, @@why & @@lab トークン含む
  relatedLessonSlug?: string;
}
```

### 英語問題

```typescript
// 速読
interface SpeedReadingProblem {
  id: string;
  title: string;
  level: "TEXTBOOK" | "COMMON_TEST" | "PRIVATE_UNI" | "NATIONAL_UNI";
  timeLimit: number;    // 秒
  tags: string[];
  passage: string;
  questions: {
    questionText: string;
    options: [string, string, string, string];
    correctAnswerIndex: 0 | 1 | 2 | 3;
    explanation: string;  // 日本語で構文・語彙解説
  }[];
}

// 精読（読解）
interface ComprehensionProblem {
  id: string;
  title: string;
  level: "TEXTBOOK" | "COMMON_TEST" | "PRIVATE_UNI" | "NATIONAL_UNI";
  tags: string[];
  passage: string;
  questions: {
    questionText: string;
    options: [string, string, string, string];
    correctAnswerIndex: 0 | 1 | 2 | 3;
    explanation: string;
  }[];
}

// 語彙フラッシュカード
interface VocabCard {
  id: string;
  word: string;
  pos: string;            // 品詞
  pronunciation: string;
  meaning: string;        // 日本語訳
  example: string;        // 英文例
  exampleJa: string;
  category: "academic" | "social" | "science" | "business";
  level: "B1" | "B2" | "C1";
}

// 文法ドリル
interface GrammarQuestion {
  id: string;
  topic: string;          // 文法項目名
  sentence: string;       // 空欄付き英文
  blank: string;          // 空欄の表示
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}
```

---

## 7. Prisma スキーマ（全モデル）

```prisma
model Problem {
  id           String   @id @default(cuid())
  slug         String   @unique
  title        String
  unit         String
  difficulty   String   // "A" | "B" | "C" | "D" | "D_PLUS"
  statement    String
  tagline      String?
  hasGraph     Boolean  @default(false)
  graphConfig  Json?
  tags         String[]
  relatedLessonSlug  String?
  university   String?
  deviation    Int?
  year         Int?
  backgroundTag String?
  steps        ExplanationStep[]
  dailyOn      DailyChallenge[]
}

model ExplanationStep {
  id        String  @id @default(cuid())
  problemId String
  problem   Problem @relation(fields: [problemId], references: [id])
  type      String  // "INSIGHT" | "EXPERIMENT" | "HINT" | "SOLUTION" | "GUIDANCE_ANALYSIS"
  order     Int
  title     String
  body      String
  relatedLessonSlug String?
  @@unique([problemId, order])
}

model Lesson {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  unit        String
  summary     String?
  content     String   // Markdown + KaTeX + @@lab トークン
  relatedProblemSlugs String[]
  tags        String[]
}

model User {
  id          String   @id @default(cuid())
  name        String   @unique
  passcode    String   // bcryptjs ハッシュ
  role        String   @default("STUDENT")  // "STUDENT" | "MENTOR"
  lastLoginAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  attempts         ExamAttempt[]
  englishAttempts  EnglishAttempt[]
  missions         EmergencyMission[]
  sentMessages     Message[] @relation("SentMessages")
  receivedMessages Message[] @relation("ReceivedMessages")
}

model ExamAttempt {
  id           String   @id @default(cuid())
  sessionId    String
  createdAt    DateTime @default(now())
  tags         String[]
  difficulties String[]
  problemSlugs String[]
  timeLimitSec Int
  wrongSlugs   String[]
  score        Int
  totalCount   Int
  durationSec  Int?
  weakTags     String[]
  userId       String?
  user         User?    @relation(fields: [userId], references: [id])
}

model EmergencyMission {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  problemSlug String
  comment     String
  isCompleted Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Message {
  id         String   @id @default(cuid())
  senderId   String?
  sender     User?    @relation("SentMessages", fields: [senderId], references: [id])
  receiverId String?
  receiver   User?    @relation("ReceivedMessages", fields: [receiverId], references: [id])
  content    String
  createdAt  DateTime @default(now())
}

model EnglishAttempt {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  problemId String
  mode      String   // "speed-reading" | "comprehension" | "multi-source"
  level     String   // "TEXTBOOK" | "COMMON_TEST" | "PRIVATE_UNI" | "NATIONAL_UNI"
  score     Int
  total     Int
  createdAt DateTime @default(now())
}

model DailyChallenge {
  id        String   @id @default(cuid())
  date      DateTime // 00:00 UTC
  slot      Int      // 1, 2, 3
  problemId String
  problem   Problem  @relation(fields: [problemId], references: [id])
  @@unique([date, slot])
}
```

---

## 8. APIエンドポイント一覧

### 認証

| メソッド | パス | 内容 |
|---------|------|------|
| POST | `/api/auth/register` | ユーザー登録 + JWT発行 |
| POST | `/api/auth/login` | ログイン + JWT発行 |
| POST | `/api/auth/logout` | セッションCookie削除 |
| GET  | `/api/auth/me` | 現在のユーザー情報 |

### 模試

| メソッド | パス | 内容 |
|---------|------|------|
| POST | `/api/exam/attempts` | 受験結果保存（sessionId + スコア） |

### 英語

| メソッド | パス | 内容 |
|---------|------|------|
| POST | `/api/english-attempts` | 英語モード結果保存 |

### ミッション

| メソッド | パス | 内容 |
|---------|------|------|
| GET  | `/api/mission` | 自分のミッション一覧 |
| POST | `/api/mission/[id]` | ミッション完了報告 |

### 師範専用（MENTOR権限必須）

| メソッド | パス | 内容 |
|---------|------|------|
| GET  | `/api/mentor/students` | 生徒一覧 + 統計 |
| GET  | `/api/mentor/stats` | 弱点タグ統計 |
| POST | `/api/mentor/daily` | 今日の3問設定 |
| POST | `/api/mentor/mission` | 緊急ミッション発令 |
| POST | `/api/mentor/message` | メッセージ送信（一斉/個別） |

### 特殊機能

| メソッド | パス | 内容 |
|---------|------|------|
| POST | `/api/abyss/gacha` | ガチャ（ランダムレア問題）|
| POST | `/api/oracle` | AI師範（Google Gemini でヒント生成） |

---

## 9. コンテンツ量一覧

### 数学

| カテゴリ | 問題数 | ファイル |
|---------|--------|------|
| ショーケース問題 | 10 | `problems.ts` |
| 過去問道場 | 20 | `dojo.ts` |
| アビス（隠しガチャ） | 6 | `abyss-pack-{1,2}.ts` |
| 拡張パック | 32 | `expansion-pack-{1,2,3}.ts` |
| 数と式（IA） | 20 | `units/numbers-and-expressions.ts` |
| 集合と命題（IA） | 1 | `units/sets-and-logic.ts` |
| 2次関数（IA） | 20 | `units/quadratic-functions.ts` |
| 図形と計量（IA） | 21 | `units/measurement-trigonometry.ts` |
| データの分析（IA） | 20 | `units/data-analysis.ts` |
| 場合の数と確率（IA） | 24 | `units/counting-probability.ts` |
| 図形の性質（IA） | 20 | `units/geometry-properties.ts` |
| 整数の性質（IA） | 21 | `units/integer-properties.ts` |
| 式と証明（IIB） | 15 | `units/expressions-and-proofs.ts` |
| 複素数と方程式（IIB） | 15 | `units/complex-numbers-equations.ts` |
| 図形と方程式（IIB） | 15 | `units/figures-and-equations.ts` |
| 三角関数（IIB） | 15 | `units/trigonometric-functions.ts` |
| 指数・対数関数（IIB） | 15 | `units/exponential-and-logarithmic.ts` |
| 微分法（IIB） | 16 | `units/differentiation-2b.ts` |
| 積分法（IIB） | 16 | `units/integration-2b.ts` |
| 数列（IIB） | 19 | `units/sequences.ts` |
| ベクトル（IIB） | 18 | `units/vectors.ts` |
| 複素数平面（III相当） | 1 | `units/complex-plane.ts` |
| 模試専用（非公開） | 3 | `units/mock-only.ts` |
| **合計** | **約330問** | |

### 英語

| カテゴリ | 問題数 | 詳細 |
|---------|--------|------|
| 速読 | 51問 | Pack 1〜7 × 各 7〜8問（4レベル混合） |
| 精読（読解） | 51問 | Pack 1〜7 × 各 7〜8問（SVOCM構文解析付き） |
| マルチソース | 28問 | Pack 1〜3（TEXT/TABLE/BULLETS の 3ソース構成） |
| 計算ドリル | 101問 | 10カテゴリ（展開・因数分解・対数・三角・微分 等） |
| 文法ドリル | 36問 | 仮定法/分詞構文/関係詞/倒置/強調構文 等 |
| 語彙フラッシュカード | 71枚 | 4カテゴリ × 3レベル（B1/B2/C1）|
| **合計** | **約338アイテム** | |

### その他

| カテゴリ | 数 |
|---------|---|
| インタラクティブグラフ Lab | 50+ 種 |
| レッスン | 10+ |
| 単元（メタデータ登録済み） | 20 |
| React コンポーネント | 80+ |
| APIルート | 15 |

---

## 10. 認証フロー

### セッション管理
- **方式:** JWT（jose、HS256）
- **保存場所:** httpOnly Cookie (`cy_session`)
- **有効期限:** 7日間
- **ペイロード:** `{ sub: userId, name, role: "STUDENT" | "MENTOR" }`

### 登録フロー
1. 名前 + パスコード（+ 任意でメンターコード）を送信
2. bcryptjs でパスコードをハッシュ化（cost: 12）
3. User レコード作成
4. メンターコードが環境変数 `MENTOR_PASSCODE` と一致 → role = MENTOR
5. JWT 署名 → httpOnly Cookie にセット

### 保護されたルート
- `/mentor` — サーバーサイドで `role !== "MENTOR"` をチェックしリダイレクト
- `/mission/[id]` — サーバーサイドで所有者確認
- API (`/api/mentor/*` 等) — Cookie から JWT を検証

---

## 11. 重要な実装上の制約

以下はコードを変更する際に必ず守るべき制約事項：

1. **`prisma.config.ts` / `src/lib/prisma.ts` のDB接続設定は絶対に上書き・初期化しない**
2. **KaTeX テンプレートリテラル:** `$ {}` （スペースあり）と書く。`${}` はテンプレートリテラルの変数展開になるため。
3. **Server Component の `<Link>` 等にイベントハンドラ（`onMouseEnter` 等）を付与しない** — 必ず `"use client"` コンポーネントでラップ
4. **`GEMINI_API_KEY` はサーバーサイドAPIルートのみ。クライアントに露出させない**
5. **複数のJSX要素を条件式の中に返す場合は必ず `<>...</>` フラグメントでラップ**
6. **英語問題の `correctAnswerIndex` は 0-based（0〜3）**

---

## 12. 環境変数

```bash
# 必須
JWT_SECRET=<32バイト以上のランダム文字列>
MENTOR_PASSCODE=<師範登録コード>

# DB（本番）
DATABASE_URL=postgresql://user:pass@host:5432/cyber_math

# AI機能（Oracle）
GOOGLE_GENERATIVE_AI_API_KEY=<Google AI Studio のAPIキー>
```

---

## 13. デプロイ設定（Render.com）

`render.yaml` で定義：
- **Web Service:** Node.js / `npm ci && prisma generate && next build` でビルド
- **Managed PostgreSQL:** `DATABASE_URL` は自動インジェクション
- **起動コマンド:** `next start`

---

## 14. UX・デザイン哲学

1. **インタラクティブ優先** — スライダーを動かす、ステップをアンロックする、グラフを触る
2. **概念的深度** — タグラインは「なぜ」を説明する、「どうやって」だけでなく
3. **複数の学習経路** — 複数解法タブ、関連レッスン、弱点タグドリル
4. **ライトゲーミフィケーション** — デイリーストリーク、難易度ティア、ガチャ（課金なし）
5. **サイバーパンク美学** — ネオン色、grid背景、ハッキング風アニメーション
6. **二教科対応** — 数学IA/IIB + 英語（速読/精読/語彙/文法）

---

## 15. 今後の拡張ポイント（現状の余白）

- **数学III対応:** 複素数平面ファイルは 1問のみ（拡張余地大）
- **集合と命題:** 1問のみ（拡張余地大）
- **レッスンコンテンツ:** 10件（各単元のRich Lessonは 2件のみ）
- **英語マルチソース:** 28問（速読・精読に比べ少ない）
- **模試プリセット:** Common Test / Private Uni / National Uni（追加可能）

---

*このドキュメントは 2026年6月11日時点のコードベースに基づきます。*
