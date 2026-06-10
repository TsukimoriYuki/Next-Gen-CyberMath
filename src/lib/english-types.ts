// ── CYBER English — domain types ─────────────────────────────────────────

/** 速読長文の難易度レベル */
export type EnglishLevel =
  | "TEXTBOOK"      // 教科書レベル
  | "COMMON_TEST"   // 共通テストレベル
  | "PRIVATE_UNI"   // 私立大学レベル
  | "NATIONAL_UNI"; // 国公立大学レベル

export const ENGLISH_LEVEL_META: Record<
  EnglishLevel,
  { label: string; name: string; accent: string; wordRange: string }
> = {
  TEXTBOOK:    { label: "教科書",   name: "Textbook",    accent: "#10b981", wordRange: "80–110 語" },
  COMMON_TEST: { label: "共通テスト", name: "Common Test", accent: "#22d3ee", wordRange: "120–150 語" },
  PRIVATE_UNI: { label: "私立大",   name: "Private Uni", accent: "#f59e0b", wordRange: "150–200 語" },
  NATIONAL_UNI:{ label: "国公立大", name: "National Uni", accent: "#f43f5e", wordRange: "160–220 語" },
};

/** 速読長文の1設問 */
export interface SpeedReadingQuestion {
  /** 設問文 */
  questionText: string;
  /** 選択肢（4択） */
  options: string[];
  /** 正解インデックス (0-based) */
  correctAnswerIndex: number;
  /** 解説（日本語。構文・語彙・落とし穴を詳説） */
  explanation: string;
}

/** 速読長文問題1件 */
export interface SpeedReadingProblem {
  id: string;
  title: string;
  level: EnglishLevel;
  /** 英語長文（プレーンテキスト）*/
  passage: string;
  /** 制限時間（秒） */
  timeLimit: number;
  /** 設問リスト */
  questions: SpeedReadingQuestion[];
  /** 問題の概要タグ（語数・テーマ等） */
  tags?: string[];
}

// ── Comprehension (精読) types ────────────────────────────────────────────

/** 構文役割ラベル */
export type SyntaxRole = "S" | "V" | "O" | "C" | "M" | "NONE";

/** 1文をSVOCMに分解した1ブロック */
export interface SyntaxBlock {
  text: string;
  role: SyntaxRole;
  translation?: string;
}

/** 精読設問1件 */
export interface ComprehensionQuestion {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  /** 本文中の複文をSVOCMに分解した構文解析（任意） */
  syntaxAnalysis?: SyntaxBlock[];
}

/** 精読問題1件 */
export interface ComprehensionProblem {
  id: string;
  title: string;
  level: EnglishLevel;
  passage: string;
  questions: ComprehensionQuestion[];
  tags: string[];
}
