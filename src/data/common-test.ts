// ── 共通テスト対策プラットフォーム 設定データ ─────────────────────────────
// COMMON TEST COMMAND CENTER — Phase 1
// 科目情報・大問別データ・今日のミッションをすべてここに集約する。

export type CommonTestSubjectId = "math-1a" | "math-2bc" | "english-reading";
export type MissionDifficulty = "STANDARD" | "HARD" | "SPRINT";

// ── Section（大問）────────────────────────────────────────────────────────
export interface CommonTestSection {
  /** 第n問 */
  number: number;
  /** 表示タイトル（例: 「数と式・集合と命題」）*/
  title: string;
  /** 対策テーマ一覧 */
  topics: string[];
  /** 推奨時間（分） */
  recommendedMinutes: number;
  /** 配点 */
  maxScore: number;
  /** 選択問題かどうか */
  isElective?: boolean;
}

// ── Subject（科目）───────────────────────────────────────────────────────
export interface CommonTestTheme {
  primary: string;    // メインカラー (hex or rgba)
  secondary: string;  // サブカラー
  glowRgb: string;    // glow用 "r,g,b"（rgba で使う）
}

export interface CommonTestSubject {
  id: CommonTestSubjectId;
  /** フル科目名 */
  title: string;
  /** 短縮表示名 */
  shortTitle: string;
  /** App Router パス */
  route: string;
  /** 試験時間（分） */
  examMinutes: number;
  /** カラーテーマ */
  theme: CommonTestTheme;
  /** デフォルト目標点 */
  targetScoreDefault: number;
  /** モック推定点（現状はダミー） */
  estimatedScoreMock: number;
  /** 科目説明文 */
  description: string;
  /** 大問一覧 */
  sections: CommonTestSection[];
  /** 得点別攻略ルート */
  scoreRoutes: ScoreRoute[];
}

export interface ScoreRoute {
  targetScore: number;
  label: string;
  strategy: string;
  accent: string;
}

// ── Daily Mission（今日の特命ミッション）────────────────────────────────
export interface DailyMission {
  id: string;
  subjectId: CommonTestSubjectId;
  subjectLabel: string;
  sectionTitle: string;
  purpose: string;
  recommendedMinutes: number;
  accent: string;
  difficulty: MissionDifficulty;
  /** 実在する大問別ドリルページへのリンク */
  href: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// 科目データ
// ═══════════════════════════════════════════════════════════════════════════

export const COMMON_TEST_SUBJECTS: CommonTestSubject[] = [
  // ── 数学IA ─────────────────────────────────────────────────────────────
  {
    id: "math-1a",
    title: "数学IA",
    shortTitle: "数IA",
    route: "/common-test/math-1a",
    examMinutes: 70,
    theme: {
      primary: "#00d2ff",
      secondary: "#ff00aa",
      glowRgb: "0,210,255",
    },
    targetScoreDefault: 80,
    estimatedScoreMock: 64,
    description:
      "数と式・命題・2次関数・図形・確率を、共通テストの誘導に乗って取り切る。読解、判断、計算精度を大問別に鍛える。",
    sections: [
      {
        number: 1,
        title: "数と式・集合と命題・図形と計量",
        topics: ["因数分解", "絶対値の処理", "命題の真偽", "正弦・余弦定理"],
        recommendedMinutes: 20,
        maxScore: 30,
      },
      {
        number: 2,
        title: "2次関数・データの分析",
        topics: ["最大最小の場合分け", "二次不等式", "相関係数", "四分位数"],
        recommendedMinutes: 20,
        maxScore: 30,
      },
      {
        number: 3,
        title: "図形の性質",
        topics: ["メネラウスの定理", "方べきの定理", "円の性質", "内心・外心"],
        recommendedMinutes: 15,
        maxScore: 20,
      },
      {
        number: 4,
        title: "場合の数と確率",
        topics: ["条件付き確率", "反復試行", "組合せの数え上げ", "期待値"],
        recommendedMinutes: 15,
        maxScore: 20,
      },
    ],
    scoreRoutes: [
      {
        targetScore: 60,
        label: "60点突破",
        accent: "#34d399",
        strategy: "第1問・第2問の必答問題を確実に完答。誘導に乗る練習を優先する。",
      },
      {
        targetScore: 70,
        label: "70点突破",
        accent: "#60a5fa",
        strategy: "選択問題で1問完答を目指す。得意な大問を速習し、時間配分を固める。",
      },
      {
        targetScore: 85,
        label: "85点突破",
        accent: "#f59e0b",
        strategy: "全大問で取りこぼしをなくす。データ分析の計算速度と選択問題両方を仕上げる。",
      },
    ],
  },

  // ── 数学II・B・C ────────────────────────────────────────────────────────
  {
    id: "math-2bc",
    title: "数学II・B・C",
    shortTitle: "数II・B・C",
    route: "/common-test/math-2bc",
    examMinutes: 70,
    theme: {
      primary: "#a855f7",
      secondary: "#06b6d4",
      glowRgb: "168,85,247",
    },
    targetScoreDefault: 75,
    estimatedScoreMock: 57,
    description:
      "第1問〜第3問（図形と方程式・三角関数、指数対数・微積分、数列）は必答。第4問〜第7問（統計・ベクトル・曲線・複素数平面）から3題を選択する。誘導の読解と処理速度が鍵。",
    sections: [
      {
        number: 1,
        title: "図形と方程式・三角関数",
        topics: ["円と直線", "軌跡", "加法定理", "合成"],
        recommendedMinutes: 11,
        maxScore: 15,
      },
      {
        number: 2,
        title: "指数・対数・微分・積分",
        topics: ["指数方程式", "対数の計算", "微分・接線", "面積計算"],
        recommendedMinutes: 12,
        maxScore: 15,
      },
      {
        number: 3,
        title: "数列",
        topics: ["等差・等比数列", "漸化式", "数列の和", "数学的帰納法"],
        recommendedMinutes: 15,
        maxScore: 22,
      },
      {
        number: 4,
        title: "統計的な推測",
        topics: ["正規分布", "母平均の推定", "仮説検定", "二項分布"],
        recommendedMinutes: 10,
        maxScore: 16,
        isElective: true,
      },
      {
        number: 5,
        title: "ベクトル",
        topics: ["内積", "位置ベクトル", "直線と平面の方程式", "空間ベクトル"],
        recommendedMinutes: 10,
        maxScore: 16,
        isElective: true,
      },
      {
        number: 6,
        title: "平面上の曲線",
        topics: ["楕円・双曲線", "放物線", "媒介変数表示", "極座標"],
        recommendedMinutes: 10,
        maxScore: 16,
        isElective: true,
      },
      {
        number: 7,
        title: "複素数平面",
        topics: ["複素数の乗除", "ド・モアブル", "回転", "絶対値と偏角"],
        recommendedMinutes: 10,
        maxScore: 16,
        isElective: true,
      },
    ],
    scoreRoutes: [
      {
        targetScore: 60,
        label: "60点突破",
        accent: "#34d399",
        strategy: "第1・2問を完答。選択問題は数列 or ベクトルの得意な方に集中する。",
      },
      {
        targetScore: 70,
        label: "70点突破",
        accent: "#60a5fa",
        strategy: "必答2問 + 選択1問を完答。微積の計算精度を上げるのが最短ルート。",
      },
      {
        targetScore: 85,
        label: "85点突破",
        accent: "#f59e0b",
        strategy: "必答2問 + 選択2問で漏れなく得点。統計も基礎から仕上げる。",
      },
    ],
  },

  // ── 英語リーディング ────────────────────────────────────────────────────
  {
    id: "english-reading",
    title: "英語リーディング",
    shortTitle: "英語R",
    route: "/common-test/english-reading",
    examMinutes: 80,
    theme: {
      primary: "#10b981",
      secondary: "#facc15",
      glowRgb: "16,185,129",
    },
    targetScoreDefault: 85,
    estimatedScoreMock: 70,
    description:
      "β版のサブ科目。数学対策を優先しつつ、余力がある日に読解速度と情報照合を補強する。",
    sections: [
      {
        number: 1,
        title: "短文・案内文読解",
        topics: ["掲示板・チラシ", "選択肢との一致判定", "語彙推測"],
        recommendedMinutes: 6,
        maxScore: 10,
      },
      {
        number: 2,
        title: "ウェブサイト・投稿読解",
        topics: ["SNS/ブログ形式", "複数投稿の比較", "意見の主旨"],
        recommendedMinutes: 8,
        maxScore: 12,
      },
      {
        number: 3,
        title: "記事・説明文読解",
        topics: ["事実と意見の区別", "段落構造の把握", "換言表現"],
        recommendedMinutes: 10,
        maxScore: 12,
      },
      {
        number: 4,
        title: "資料読み取り",
        topics: ["グラフ・表との照合", "数値の解釈", "複数資料統合"],
        recommendedMinutes: 10,
        maxScore: 16,
      },
      {
        number: 5,
        title: "情報照合",
        topics: ["複数テキスト照合", "条件フィルタリング", "スキミング"],
        recommendedMinutes: 12,
        maxScore: 16,
      },
      {
        number: 6,
        title: "物語・説明文",
        topics: ["登場人物の心情", "出来事の因果", "暗示・推論"],
        recommendedMinutes: 12,
        maxScore: 14,
      },
      {
        number: 7,
        title: "論説文",
        topics: ["主張と根拠", "論理展開の把握", "著者の立場"],
        recommendedMinutes: 10,
        maxScore: 10,
      },
      {
        number: 8,
        title: "レポート完成・複数資料統合",
        topics: ["空欄補充", "資料横断推論", "ノート完成形式"],
        recommendedMinutes: 12,
        maxScore: 10,
      },
    ],
    scoreRoutes: [
      {
        targetScore: 60,
        label: "60点突破",
        accent: "#34d399",
        strategy: "第1〜4問を確実に得点。情報照合で絞り込み方を身につける。",
      },
      {
        targetScore: 75,
        label: "75点突破",
        accent: "#60a5fa",
        strategy: "第5・6問まで攻略。スキミング速度を上げ、時間内に全問カバーする。",
      },
      {
        targetScore: 90,
        label: "90点突破",
        accent: "#f59e0b",
        strategy: "第7・8問の推論問題も正確に。複数資料の整合性を素早く判断する技術を磨く。",
      },
    ],
  },
];

// ── 科目IDでの高速アクセス用マップ ───────────────────────────────────────
export const COMMON_TEST_SUBJECTS_MAP: Record<CommonTestSubjectId, CommonTestSubject> =
  Object.fromEntries(COMMON_TEST_SUBJECTS.map((s) => [s.id, s])) as Record<
    CommonTestSubjectId,
    CommonTestSubject
  >;

// ═══════════════════════════════════════════════════════════════════════════
// 今日の特命ミッション（モックデータ）
// ═══════════════════════════════════════════════════════════════════════════

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: "mission-math1a-geometry",
    subjectId: "math-1a",
    subjectLabel: "数学IA",
    sectionTitle: "第1問 図形と計量 15分診断",
    purpose: "正弦定理・余弦定理と命題の誘導を確認。目標80点への伸びしろが大きい大問です。",
    recommendedMinutes: 15,
    accent: "#00d2ff",
    difficulty: "STANDARD",
    href: "/common-test/math-1a/section-1",
  },
  {
    id: "mission-math2bc-calculus",
    subjectId: "math-2bc",
    subjectLabel: "数学II・B・C",
    sectionTitle: "第2問 微分積分 20分演習",
    purpose: "接線・増減・面積計算を本番時間で処理。計算ミスを自信度つきで記録します。",
    recommendedMinutes: 20,
    accent: "#a855f7",
    difficulty: "STANDARD",
    href: "/common-test/math-2bc/section-2",
  },
  {
    id: "mission-math1a-probability",
    subjectId: "math-1a",
    subjectLabel: "数学IA",
    sectionTitle: "第4問 確率 15分演習",
    purpose: "条件付き確率と数え上げを短時間で確認。捨て問判断まで含めて練習します。",
    recommendedMinutes: 15,
    accent: "#00d2ff",
    difficulty: "SPRINT",
    href: "/common-test/math-1a/section-4",
  },
];

// ── ロック機能定義 ─────────────────────────────────────────────────────────
export interface LockedFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const LOCKED_FEATURES: LockedFeature[] = [
  {
    id: "exam-simulator",
    title: "本番演習",
    description: "本番と同一形式・時間配分で全大問を通しで解く。採点・タイム計測・弱点自動解析付き。",
    icon: "EX",
  },
];
