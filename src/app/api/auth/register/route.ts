import { timingSafeEqual } from "node:crypto";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signJWT, setSessionCookie } from "@/lib/auth";
import { getClientIp, rateLimit, rateLimitJson } from "@/lib/rate-limit";

function constantTimeEquals(left: string, right: string): boolean {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  if (leftBytes.byteLength !== rightBytes.byteLength) return false;
  return timingSafeEqual(leftBytes, rightBytes);
}

export async function POST(req: Request) {
  try {
    const limited = rateLimit(`auth:register:${getClientIp(req)}`, {
      limit: 8,
      windowMs: 60_000,
    });
    if (!limited.ok) return rateLimitJson(limited.retryAfter);

    const { name, passcode, mentorCode } = (await req.json()) ?? {};

    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 40) {
      return Response.json({ ok: false, error: "名前は 2 文字以上で入力してください" }, { status: 400 });
    }
    if (typeof passcode !== "string" || passcode.length < 4 || passcode.length > 128) {
      return Response.json({ ok: false, error: "パスコードは 4 文字以上で入力してください" }, { status: 400 });
    }

    const normalizedName = name.trim();
    const existing = await prisma.user.findUnique({ where: { name: normalizedName } });
    if (existing) {
      return Response.json({ ok: false, error: "その名前はすでに使われています" }, { status: 409 });
    }

    // 師範コードは許可された指導者向け。値はログに出さず、定数時間比較に寄せる。
    const mentorSecret = process.env.MENTOR_PASSCODE;
    const normalizedMentorCode =
      typeof mentorCode === "string" ? mentorCode.trim() : "";
    const role =
      mentorSecret && normalizedMentorCode && constantTimeEquals(normalizedMentorCode, mentorSecret)
        ? "MENTOR"
        : "STUDENT";

    const hashed = await hash(passcode, 12);
    const user = await prisma.user.create({
      data: { name: normalizedName, passcode: hashed, role },
      select: { id: true, name: true, role: true },
    });

    const token = await signJWT({ sub: user.id, name: user.name, role: user.role as "MENTOR" | "STUDENT" });
    await setSessionCookie(token);

    return Response.json({ ok: true, name: user.name, role: user.role });
  } catch (e) {
    console.error("register error:", e);
    return Response.json({ ok: false, error: "登録に失敗しました" }, { status: 500 });
  }
}
