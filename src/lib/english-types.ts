// ── CYBER English — domain types ─────────────────────────────────────────
import type { UniversityGroup } from "@/lib/types";

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

export const SPEED_READING_DEFAULT_TIME_LIMIT_SECONDS: Record<EnglishLevel, number> = {
  TEXTBOOK: 240,
  COMMON_TEST: 360,
  PRIVATE_UNI: 480,
  NATIONAL_UNI: 600,
};

export const SPEED_READING_DEFAULT_TARGET_WPM: Record<EnglishLevel, number> = {
  TEXTBOOK: 100,
  COMMON_TEST: 150,
  PRIVATE_UNI: 150,
  NATIONAL_UNI: 120,
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
  /** 制限時間（秒）。未指定ならレベル別デフォルトを使う。 */
  timeLimit?: number;
  /** 将来のデータ拡張用: 長文ごとの制限時間（秒） */
  timeLimitSeconds?: number;
  /** 将来のデータ拡張用: スピードサポートの初期有効状態 */
  speedSupportEnabled?: boolean;
  /** スピードサポート用の目標 WPM。未指定ならレベル別デフォルトを使う。 */
  targetWpm?: number;
  /** 設問リスト */
  questions: SpeedReadingQuestion[];
  /** 問題の概要タグ（語数・テーマ等） */
  tags?: string[];
  /** 私立文系大学群タグ */
  universityGroup?: UniversityGroup;
}

export function getSpeedReadingTimeLimitSeconds(problem: SpeedReadingProblem): number {
  return (
    problem.timeLimitSeconds ??
    problem.timeLimit ??
    SPEED_READING_DEFAULT_TIME_LIMIT_SECONDS[problem.level]
  );
}

export function getSpeedReadingTargetWpm(problem: SpeedReadingProblem): number {
  return problem.targetWpm ?? SPEED_READING_DEFAULT_TARGET_WPM[problem.level];
}

/** レベルとURLスラッグの対応（長文一覧ルート用） */
export const ENGLISH_LEVEL_SLUG: Record<EnglishLevel, string> = {
  TEXTBOOK: "textbook",
  COMMON_TEST: "common-test",
  PRIVATE_UNI: "private-uni",
  NATIONAL_UNI: "national-uni",
};

const SLUG_TO_ENGLISH_LEVEL: Record<string, EnglishLevel> = Object.fromEntries(
  (Object.entries(ENGLISH_LEVEL_SLUG) as [EnglishLevel, string][]).map(
    ([level, slug]) => [slug, level],
  ),
) as Record<string, EnglishLevel>;

/** URLスラッグからレベルを引く。未知のスラッグなら null。 */
export function getEnglishLevelBySlug(slug: string): EnglishLevel | null {
  return SLUG_TO_ENGLISH_LEVEL[slug] ?? null;
}

/**
 * 英文の語数を数える。本文（passage）専用。設問・選択肢・解説は対象外。
 * スピードサポート（SpeedSupportReader）と同一ロジックを共有する。
 */
export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => /[A-Za-z0-9]/.test(word)).length;
}

/** 速読長文の本文語数 */
export function getSpeedReadingWordCount(problem: SpeedReadingProblem): number {
  return countWords(problem.passage);
}

/**
 * 目標読了時間（秒）。estimatedSeconds = wordCount / targetWpm * 60。
 * SpeedSupportReader の estimatedSeconds と一致するよう切り上げる。
 */
export function getSpeedReadingEstimatedSeconds(
  problem: SpeedReadingProblem,
): number {
  const wpm = Math.max(1, getSpeedReadingTargetWpm(problem));
  const words = getSpeedReadingWordCount(problem);
  return Math.max(1, Math.ceil((words / wpm) * 60));
}

/** 秒数を m:ss 形式に整形する */
export function formatSpeedReadingTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.ceil(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
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
  /** 私立文系大学群タグ */
  universityGroup?: UniversityGroup;
}

// ── Multi-Source (マルチソース情報照合) types ──────────────────────────────

export type SourceType = "TEXT" | "TABLE" | "BULLETS";

/** 資料ブロック（discriminated union で content の型を確定） */
export type SourceBlock =
  | { id: string; type: "TEXT";    title: string; content: string     }
  | { id: string; type: "TABLE";   title: string; content: string[][] }
  | { id: string; type: "BULLETS"; title: string; content: string[]   };

export interface MultiSourceQuestion {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  /** 解説用クロスリファレンス（例: ["Source A", "Source C"]） */
  crossReferences?: string[];
}

export interface MultiSourceProblem {
  id: string;
  title: string;
  level: EnglishLevel;
  sources: SourceBlock[];
  questions: MultiSourceQuestion[];
  tags: string[];
}
