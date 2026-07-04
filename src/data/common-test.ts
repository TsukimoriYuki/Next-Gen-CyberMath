export type CommonTestSubjectId = "math-1a" | "math-2bc" | "english-reading";
export type MissionDifficulty = "STANDARD" | "HARD" | "SPRINT";

export interface CommonTestSection {
  number: number;
  title: string;
  topics: string[];
  recommendedMinutes: number;
  maxScore: number;
  isElective?: boolean;
}

export interface CommonTestTheme {
  primary: string;
  secondary: string;
  glowRgb: string;
}

export interface CommonTestSubject {
  id: CommonTestSubjectId;
  title: string;
  shortTitle: string;
  route: string;
  examMinutes: number;
  theme: CommonTestTheme;
  targetScoreDefault: number;
  description: string;
  sections: CommonTestSection[];
  scoreRoutes: ScoreRoute[];
}

export interface ScoreRoute {
  targetScore: number;
  label: string;
  strategy: string;
  accent: string;
}

export interface DailyMission {
  id: string;
  subjectId: CommonTestSubjectId;
  subjectLabel: string;
  sectionTitle: string;
  purpose: string;
  recommendedMinutes: number;
  accent: string;
  difficulty: MissionDifficulty;
  href: string;
}

export const COMMON_TEST_SUBJECTS: CommonTestSubject[] = [
  {
    id: "math-1a",
    title: "数学IA",
    shortTitle: "数学IA",
    route: "/common-test/math-1a",
    examMinutes: 70,
    theme: {
      primary: "#00d2ff",
      secondary: "#ff00aa",
      glowRgb: "0,210,255",
    },
    targetScoreDefault: 80,
    description:
      "数と式、二次関数、図形、データの分析、場合の数と確率を大問別に練習します。大問ごとの読み方と時間配分を固め、冊子型模試で本番の70分運用まで確認します。",
    sections: [
      {
        number: 1,
        title: "数と式・集合と命題・図形と計量",
        topics: ["因数分解", "絶対値", "命題の真偽", "正弦定理・余弦定理"],
        recommendedMinutes: 20,
        maxScore: 30,
      },
      {
        number: 2,
        title: "二次関数・データの分析",
        topics: ["最大最小", "二次不等式", "相関係数", "箱ひげ図"],
        recommendedMinutes: 20,
        maxScore: 30,
      },
      {
        number: 3,
        title: "図形の性質",
        topics: ["メネラウスの定理", "方べきの定理", "内心・外心", "補助線判断"],
        recommendedMinutes: 15,
        maxScore: 20,
      },
      {
        number: 4,
        title: "場合の数と確率",
        topics: ["条件付き確率", "反復試行", "組合せ", "期待値"],
        recommendedMinutes: 15,
        maxScore: 20,
      },
    ],
    scoreRoutes: [
      {
        targetScore: 60,
        label: "60点突破",
        accent: "#34d399",
        strategy:
          "第1問と第2問の基本設問を確実に取る。誘導の読み落としを減らし、計算ミスを復習キューで回収する。",
      },
      {
        targetScore: 70,
        label: "70点突破",
        accent: "#60a5fa",
        strategy:
          "第1問から第4問までを時間内に解き切る。第3問・第4問の後半まで粘り、冊子型模試で時間配分を確認する。",
      },
      {
        targetScore: 85,
        label: "85点突破",
        accent: "#f59e0b",
        strategy:
          "全大問で取りこぼしをなくす。データ分析の計算速度と第3問・第4問の後半処理まで仕上げる。",
      },
    ],
  },
  {
    id: "math-2bc",
    title: "数学II・B・C",
    shortTitle: "数学IIBC",
    route: "/common-test/math-2bc",
    examMinutes: 70,
    theme: {
      primary: "#a855f7",
      secondary: "#06b6d4",
      glowRgb: "168,85,247",
    },
    targetScoreDefault: 75,
    description:
      "図形と方程式、三角関数、指数・対数、微分積分、数列、統計、ベクトル、平面上の曲線、複素数平面を大問別に練習します。必答問題と選択問題の判断を分けて鍛えます。",
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
        title: "指数・対数・微分積分",
        topics: ["指数方程式", "対数の計算", "接線", "面積"],
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
        topics: ["内積", "位置ベクトル", "直線と平面", "空間ベクトル"],
        recommendedMinutes: 10,
        maxScore: 16,
        isElective: true,
      },
      {
        number: 6,
        title: "平面上の曲線",
        topics: ["楕円", "双曲線", "媒介変数表示", "極座標"],
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
        strategy:
          "必答の第1問・第2問を安定させ、選択問題は数列またはベクトルの得意な方へ集中する。",
      },
      {
        targetScore: 70,
        label: "70点突破",
        accent: "#60a5fa",
        strategy:
          "必答2問と選択2問を完答圏に入れる。微積分の計算精度を上げるのが最短ルート。",
      },
      {
        targetScore: 85,
        label: "85点突破",
        accent: "#f59e0b",
        strategy:
          "必答問題で落とさず、選択問題でも後半設問まで粘る。統計は基礎確認から仕上げる。",
      },
    ],
  },
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
    description:
      "公開範囲を整理しながら拡充中のサブ科目です。数学対策を優先しつつ、余力がある日に読解速度と情報照合を補強します。",
    sections: [
      {
        number: 1,
        title: "短文・案内文読解",
        topics: ["掲示板", "チラシ", "語句推測"],
        recommendedMinutes: 6,
        maxScore: 10,
      },
      {
        number: 2,
        title: "投稿・ウェブサイト読解",
        topics: ["複数投稿", "主旨把握", "情報一致"],
        recommendedMinutes: 8,
        maxScore: 12,
      },
      {
        number: 3,
        title: "説明文読解",
        topics: ["事実と意見", "段落構成", "指示語"],
        recommendedMinutes: 10,
        maxScore: 12,
      },
      {
        number: 4,
        title: "資料読み取り",
        topics: ["グラフ", "数値条件", "複数資料"],
        recommendedMinutes: 10,
        maxScore: 16,
      },
      {
        number: 5,
        title: "情報照合",
        topics: ["条件フィルタ", "複数テキスト", "スキミング"],
        recommendedMinutes: 12,
        maxScore: 16,
      },
      {
        number: 6,
        title: "物語・説明文",
        topics: ["人物関係", "因果関係", "推論"],
        recommendedMinutes: 12,
        maxScore: 14,
      },
      {
        number: 7,
        title: "論説文",
        topics: ["主張と根拠", "論理展開", "筆者の立場"],
        recommendedMinutes: 10,
        maxScore: 10,
      },
      {
        number: 8,
        title: "レポート完成・複数資料統合",
        topics: ["空所補充", "資料横断", "要約"],
        recommendedMinutes: 12,
        maxScore: 10,
      },
    ],
    scoreRoutes: [
      {
        targetScore: 60,
        label: "60点突破",
        accent: "#34d399",
        strategy:
          "第1問から第4問を確実に取る。表や資料との照合で選択肢を絞る練習を優先する。",
      },
      {
        targetScore: 75,
        label: "75点突破",
        accent: "#60a5fa",
        strategy:
          "第5問・第6問まで時間内に進む。スキミングと根拠箇所の確認をセットで練習する。",
      },
      {
        targetScore: 90,
        label: "90点突破",
        accent: "#f59e0b",
        strategy:
          "第7問・第8問の推論問題まで正確に処理する。複数資料の整合性を素早く判断する。",
      },
    ],
  },
];

export const COMMON_TEST_SUBJECTS_MAP: Record<CommonTestSubjectId, CommonTestSubject> =
  Object.fromEntries(COMMON_TEST_SUBJECTS.map((subject) => [subject.id, subject])) as Record<
    CommonTestSubjectId,
    CommonTestSubject
  >;

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: "mission-math1a-geometry",
    subjectId: "math-1a",
    subjectLabel: "数学IA",
    sectionTitle: "第1問 図形と計量 15分診断",
    purpose:
      "正弦定理・余弦定理と命題の誘導を確認します。目標80点への伸びしろが大きい大問です。",
    recommendedMinutes: 15,
    accent: "#00d2ff",
    difficulty: "STANDARD",
    href: "/common-test/math-1a/section-1",
  },
  {
    id: "mission-math2bc-calculus",
    subjectId: "math-2bc",
    subjectLabel: "数学IIBC",
    sectionTitle: "第2問 微分積分 20分練習",
    purpose:
      "接線、増減、面積計算を本番時間で処理します。計算ミスを自信度つきで記録します。",
    recommendedMinutes: 20,
    accent: "#a855f7",
    difficulty: "STANDARD",
    href: "/common-test/math-2bc/section-2",
  },
  {
    id: "mission-math1a-probability",
    subjectId: "math-1a",
    subjectLabel: "数学IA",
    sectionTitle: "第4問 確率 15分練習",
    purpose:
      "条件付き確率と数え上げを短時間で確認します。捨て問判断まで含めて練習します。",
    recommendedMinutes: 15,
    accent: "#00d2ff",
    difficulty: "SPRINT",
    href: "/common-test/math-1a/section-4",
  },
];

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
    description:
      "本番と同じ時間配分で全大問を通して解きます。採点・時間計測・弱点確認までまとめて扱います。",
    icon: "EX",
  },
];
