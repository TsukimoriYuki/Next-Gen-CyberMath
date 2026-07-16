import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signJWT, setSessionCookie } from "@/lib/auth";
import { getClientIp, rateLimit, rateLimitJson } from "@/lib/rate-limit";
import { validateLoginInput } from "@/lib/auth-input";

export async function POST(req: Request) {
  try {
    const limited = rateLimit(`auth:login:${getClientIp(req)}`, {
      limit: 12,
      windowMs: 60_000,
    });
    if (!limited.ok) return rateLimitJson(limited.retryAfter);

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return Response.json(
        { ok: false, code: "MISSING_INPUT", error: "名前とパスコードを入力してください" },
        { status: 400 },
      );
    }
    const input = validateLoginInput(body);
    if (!input.ok) return Response.json(input, { status: input.status });
    const { name: normalizedName, passcode } = input.value;
    const invalidCredentials = () =>
      Response.json(
        { ok: false, code: "INVALID_CREDENTIALS", error: "名前またはパスコードが正しくありません" },
        { status: 401 },
      );

    if (normalizedName.length > 40 || passcode.length > 128) return invalidCredentials();

    const user = await prisma.user.findUnique({ where: { name: normalizedName } });
    if (!user) {
      return invalidCredentials();
    }

    const ok = await compare(String(passcode), user.passcode);
    if (!ok) {
      return invalidCredentials();
    }

    // 最終ログイン時刻を更新
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

    const token = await signJWT({ sub: user.id, name: user.name, role: user.role as "MENTOR" | "STUDENT" });
    await setSessionCookie(token);

    return Response.json({ ok: true, name: user.name, role: user.role });
  } catch {
    console.error("Authentication login failed");
    return Response.json(
      { ok: false, code: "SERVICE_UNAVAILABLE", error: "現在、ログイン処理を利用できません。時間をおいて再試行してください" },
      { status: 503 },
    );
  }
}
