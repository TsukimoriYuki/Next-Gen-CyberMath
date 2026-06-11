// ── 共通テスト AI作戦会議 API ─────────────────────────────────────────────
// POST のみ。入力は CommonTestAiAnalysisInput の要約データ（問題本文や個人情報は含まない）。
// Gemini をサーバーサイドで呼び出し、CommonTestAiAnalysisResult を返す。
// キー未設定・呼び出し失敗・JSON破損のいずれでも、ルールベース分析にフォールバックする。

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import type {
  CommonTestAiAnalysisInput,
} from "@/lib/common-test-ai-analysis";
import {
  normalizeCommonTestAiAnalysisFromText,
  sanitizeCommonTestAiAnalysis,
} from "@/lib/common-test-ai-analysis";
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

// Gemini呼び出しのタイムアウト（ミリ秒）。超過したらrule-based fallbackへ。
const GEMINI_TIMEOUT_MS = 12_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("gemini timeout")), ms)
    ),
  ]);
}

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
      analysis: sanitizeCommonTestAiAnalysis(buildRuleBasedAnalysis(input)),
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: COMMON_TEST_ORACLE_SYSTEM_INSTRUCTION,
      generationConfig: { responseMimeType: "application/json" },
    });

    // 本番でGeminiの応答が遅延・ハングしてもリクエストを止めないようタイムアウトを設ける。
    // 超過時は throw → catch でrule-based fallbackに切り替わる。
    const result = await withTimeout(
      model.generateContent(buildCommonTestOracleUserPrompt(input)),
      GEMINI_TIMEOUT_MS
    );
    const fallback = buildRuleBasedAnalysis(input);
    const analysis = normalizeCommonTestAiAnalysisFromText({
      text: result.response.text(),
      input,
      fallback,
    });
    return NextResponse.json({ ok: true, source: "gemini" as const, analysis });
  } catch {
    // Gemini失敗・JSON破損時もアプリを止めずフォールバックを返す
    return NextResponse.json({
      ok: true,
      source: "rule" as const,
      analysis: sanitizeCommonTestAiAnalysis(buildRuleBasedAnalysis(input)),
    });
  }
}
