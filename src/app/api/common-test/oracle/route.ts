// ── 共通テスト AI作戦会議 API ─────────────────────────────────────────────
// POST のみ。入力は CommonTestAiAnalysisInput の要約データ（問題本文や個人情報は含まない）。
// Gemini をサーバーサイドで呼び出し、CommonTestAiAnalysisResult を返す。
// キー未設定・呼び出し失敗・JSON破損のいずれでも、ルールベース分析にフォールバックする。

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import type {
  CommonTestAiAnalysisInput,
  CommonTestAiAnalysisResult,
} from "@/lib/common-test-ai-analysis";
import { resolveCommonTestHref } from "@/lib/common-test-ai-analysis";
import {
  COMMON_TEST_ORACLE_SYSTEM_INSTRUCTION,
  buildCommonTestOracleUserPrompt,
} from "@/lib/common-test-ai-prompt";
import { buildRuleBasedAnalysis } from "@/lib/common-test-rule-analysis";

// ── レート制限（IPごと・1時間20回。超過時はフォールバックを返す） ──────────
interface RateEntry {
  count: number;
  resetAt: number;
}
const rateMap = new Map<string, RateEntry>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 3_600_000;

const FORBIDDEN_REPLACEMENTS: Array<[RegExp, string]> = [
  [/特異点/g, "重要課題"],
  [/撃破/g, "克服"],
  [/討伐/g, "克服"],
  [/汚染/g, "課題"],
  [/ハッキング/g, "工夫"],
  [/侵入/g, "関与"],
  [/ボス/g, "重点問題"],
];

function cleanupRateMap() {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip);
  }
}

function isRateLimited(ip: string): boolean {
  cleanupRateMap();
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ── 入力の最小バリデーション ────────────────────────────────────────────
function isValidInput(body: unknown): body is CommonTestAiAnalysisInput {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.examId === "string" &&
    typeof b.subjectId === "string" &&
    typeof b.timeLimitScore === "number" &&
    typeof b.unlimitedScore === "number" &&
    Array.isArray(b.sectionResults)
  );
}

function sanitizeText(text: string): string {
  return FORBIDDEN_REPLACEMENTS.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    text
  );
}

function sanitizeAnalysis(
  analysis: CommonTestAiAnalysisResult
): CommonTestAiAnalysisResult {
  return {
    summary: sanitizeText(analysis.summary),
    scoreDiagnosis: sanitizeText(analysis.scoreDiagnosis),
    timeDiagnosis: sanitizeText(analysis.timeDiagnosis),
    sectionAdvice: analysis.sectionAdvice.map((s) => ({
      sectionId: s.sectionId,
      title: sanitizeText(s.title),
      diagnosis: sanitizeText(s.diagnosis),
      nextAction: sanitizeText(s.nextAction),
    })),
    weakPointSummary: sanitizeText(analysis.weakPointSummary),
    nextThreeActions: analysis.nextThreeActions.map((a) => ({
      title: sanitizeText(a.title),
      reason: sanitizeText(a.reason),
      href: a.href,
    })),
    reviewQueueAdvice: sanitizeText(analysis.reviewQueueAdvice),
    targetScoreAdvice: sanitizeText(analysis.targetScoreAdvice),
    encouragement: sanitizeText(analysis.encouragement),
  };
}

// ── Geminiの出力（JSON文字列）を結果型に整形する ─────────────────────────
function parseAndNormalize(
  text: string,
  input: CommonTestAiAnalysisInput
): CommonTestAiAnalysisResult {
  const fallback = buildRuleBasedAnalysis(input);
  const stripped = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const data = JSON.parse(stripped) as Record<string, unknown>;

  const str = (v: unknown, fb = ""): string =>
    typeof v === "string" ? v : fb;

  const sectionAdvice = Array.isArray(data.sectionAdvice)
    ? (data.sectionAdvice as Record<string, unknown>[]).map((s) => ({
        sectionId: str(s.sectionId),
        title: str(s.title),
        diagnosis: str(s.diagnosis),
        nextAction: str(s.nextAction),
      }))
    : [];

  // href はホワイトリストに無ければ最弱大問のルートに補完する
  const nextThreeActions: CommonTestAiAnalysisResult["nextThreeActions"] = Array.isArray(data.nextThreeActions)
    ? (data.nextThreeActions as Record<string, unknown>[]).slice(0, 3).map((a) => ({
        title: str(a.title),
        reason: str(a.reason),
        href: resolveCommonTestHref(
          typeof a.href === "string" ? a.href : undefined,
          input
        ),
      }))
    : [];

  for (const action of fallback.nextThreeActions) {
    if (nextThreeActions.length >= 3) break;
    const duplicate = nextThreeActions.some(
      (a) => a.title === action.title || a.href === action.href
    );
    if (!duplicate) nextThreeActions.push(action);
  }

  // 必須フィールドが欠けていたらスキーマ不一致として扱う
  if (
    !str(data.summary) ||
    sectionAdvice.length === 0 ||
    nextThreeActions.length === 0
  ) {
    throw new Error("schema mismatch");
  }

  return {
    summary: str(data.summary, fallback.summary),
    scoreDiagnosis: str(data.scoreDiagnosis, fallback.scoreDiagnosis),
    timeDiagnosis: str(data.timeDiagnosis, fallback.timeDiagnosis),
    sectionAdvice,
    weakPointSummary: str(data.weakPointSummary, fallback.weakPointSummary),
    nextThreeActions,
    reviewQueueAdvice: str(data.reviewQueueAdvice, fallback.reviewQueueAdvice),
    targetScoreAdvice: str(data.targetScoreAdvice, fallback.targetScoreAdvice),
    encouragement: str(data.encouragement, fallback.encouragement),
  };
}

// ── ルート ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!isValidInput(body)) {
    return NextResponse.json(
      { ok: false, error: "分析に必要な演習データが不足しています。" },
      { status: 400 }
    );
  }
  const input = body;

  // 認証は不要（localStorage履歴だけで分析できるため）。
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const apiKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
    process.env.GEMINI_API_KEY?.trim();

  // キー未設定・レート超過時はルールベース分析を返す（UXを止めない）
  if (!apiKey || isRateLimited(ip)) {
    return NextResponse.json({
      ok: true,
      source: "rule" as const,
      analysis: sanitizeAnalysis(buildRuleBasedAnalysis(input)),
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: COMMON_TEST_ORACLE_SYSTEM_INSTRUCTION,
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent(
      buildCommonTestOracleUserPrompt(input)
    );
    const analysis = sanitizeAnalysis(parseAndNormalize(result.response.text(), input));
    return NextResponse.json({ ok: true, source: "gemini" as const, analysis });
  } catch {
    // Gemini失敗・JSON破損時もアプリを止めずフォールバックを返す
    return NextResponse.json({
      ok: true,
      source: "rule" as const,
      analysis: sanitizeAnalysis(buildRuleBasedAnalysis(input)),
    });
  }
}
