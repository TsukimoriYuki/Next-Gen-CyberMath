import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// ── Types ─────────────────────────────────────────────────────────────────

interface OraclePayload {
  message: string;
  taskName: string;
  taskUrl: string;
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
    typeof data.taskUrl === "string"
  ) {
    return data as OraclePayload;
  }
  throw new Error("schema mismatch");
}

// ── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
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
      model: "gemini-1.5-flash",
      systemInstruction: buildSystemInstruction(userName),
    });

    const prompt =
      `生徒データ：\n${JSON.stringify(stats, null, 2)}\n\n` +
      `利用可能なURL（必ずこの中から選ぶこと）:\n` +
      `/mock 数学サイバー模試（総合演習）\n` +
      `/dojo 数学過去問道場（難問演習）\n` +
      `/english/speed-reading 英語速読トレーニング\n` +
      `/english/comprehension 英語精読・文法\n` +
      `/english/multi-source 英語マルチソース照合\n` +
      `/math 数学単元別演習\n` +
      `/english 英語トップ`;

    const result = await model.generateContent(prompt);
    const payload = parseResponse(result.response.text());
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(buildFallback(userName));
  }
}
