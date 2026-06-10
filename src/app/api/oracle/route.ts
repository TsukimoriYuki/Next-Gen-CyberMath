import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// ── Types ─────────────────────────────────────────────────────────────────

interface OraclePayload {
  message: string;
  taskName: string;
  taskUrl: string;
}

// ── Allowed URLs (A-3: whitelist) ─────────────────────────────────────────

const ALLOWED_TASK_URLS = new Set([
  "/mock",
  "/dojo",
  "/english/speed-reading",
  "/english/comprehension",
  "/english/multi-source",
  "/english/vocab",
  "/english/grammar",
  "/math",
  "/english",
]);

function isAllowedUrl(url: string): boolean {
  if (ALLOWED_TASK_URLS.has(url)) return true;
  // /tags/[tagname] — タグ別演習ページ
  if (/^\/tags\/[^/\s]{1,50}$/.test(url)) return true;
  return false;
}

// ── Rate limiter (E-1: in-memory, per IP, 5 req / hour) ──────────────────

interface RateEntry { count: number; resetAt: number }
const rateMap = new Map<string, RateEntry>();
const RATE_LIMIT  = 5;
const RATE_WINDOW = 3_600_000; // 1 hour

// 期限切れエントリを削除してメモリリークを防ぐ
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

// ── System prompt ─────────────────────────────────────────────────────────

function buildSystemInstruction(name: string) {
  return `あなたはCYBER OSの冷徹だが優秀なAI教官です。生徒である${name}の成績データを分析し、次に挑戦すべき科目や難易度を判断して、サイバーパンクな口調で${name}に向けて50文字以内の端的な指令を与えてください。出力は必ず以下のJSONのみとすること（マークダウン・コードフェンス一切不可）：{"message":"指令テキスト（${name}への呼びかけを含む）","taskName":"推奨ミッション名","taskUrl":"遷移先URL"}`;
}

// ── Fallback ──────────────────────────────────────────────────────────────

function buildFallback(name: string): OraclePayload {
  return {
    message: `${name}、まず基礎から叩き直せ。弱点を潰すことが最速の近道だ。`,
    taskName: "数学模試チャレンジ",
    taskUrl: "/mock",
  };
}

// ── JSON parser (strips markdown fences if Gemini wraps the output) ───────

function parseResponse(text: string): OraclePayload {
  const stripped = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const data = JSON.parse(stripped);
  if (
    typeof data.message === "string" &&
    typeof data.taskName === "string" &&
    typeof data.taskUrl === "string" &&
    isAllowedUrl(data.taskUrl)   // A-3: ホワイトリスト検証
  ) {
    return data as OraclePayload;
  }
  throw new Error("schema mismatch");
}

// ── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // E-1: レート制限チェック（IP ベース、1時間に5回まで）
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before refreshing." },
      { status: 429 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;

  const body = await req.json().catch(() => ({}));
  const stats: unknown = body?.stats ?? {};
  const userName: string =
    typeof body?.userName === "string" && body.userName.trim()
      ? body.userName.trim()
      : "生徒";

  if (!apiKey) {
    return NextResponse.json(buildFallback(userName));
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: buildSystemInstruction(userName),
    });

    const weakTags: string[] =
      Array.isArray((stats as { math?: { weakTags?: unknown } })?.math?.weakTags)
        ? ((stats as { math: { weakTags: unknown[] } }).math.weakTags.filter(
            (t) => typeof t === "string",
          ) as string[])
        : [];

    const tagUrlHint =
      weakTags.length > 0
        ? `\n数学の弱点タグが検出されています（${weakTags.slice(0, 3).join("・")}）。該当タグへの直接リンク /tags/[タグ名] を優先的に選んでください。例: /tags/${encodeURIComponent(weakTags[0])}`
        : "";

    const prompt =
      `生徒データ：\n${JSON.stringify(stats, null, 2)}\n\n` +
      `利用可能なURL（必ずこの中から選ぶこと）:\n` +
      `/mock 数学サイバー模試（総合演習）\n` +
      `/dojo 数学過去問道場（難問演習）\n` +
      `/tags/[タグ名] 弱点タグ別演習（weakTagsが存在する場合に推奨）\n` +
      `/english/speed-reading 英語速読トレーニング\n` +
      `/english/comprehension 英語精読・文法\n` +
      `/english/multi-source 英語マルチソース照合\n` +
      `/english/vocab 英単語フラッシュカード（語彙力強化）\n` +
      `/english/grammar 英文法ドリル（仮定法・倒置・強調構文）\n` +
      `/math 数学単元別演習\n` +
      `/english 英語トップ` +
      tagUrlHint;

    const result = await model.generateContent(prompt);
    const payload = parseResponse(result.response.text());
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(buildFallback(userName));
  }
}
