import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { signJWT, setSessionCookie } from "@/lib/auth";
import { getClientIp, rateLimit, rateLimitJson } from "@/lib/rate-limit";
import {
  resolveRegistrationRole,
  validateRegistrationInput,
} from "@/lib/auth-input";

export async function POST(req: Request) {
  try {
    const limited = rateLimit(`auth:register:${getClientIp(req)}`, {
      limit: 8,
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
    const input = validateRegistrationInput(body);
    if (!input.ok) return Response.json(input, { status: input.status });
    const { name: normalizedName, passcode, mentorCode } = input.value;

    const roleResult = resolveRegistrationRole(mentorCode, process.env.MENTOR_PASSCODE);
    if (!roleResult.ok) return Response.json(roleResult, { status: roleResult.status });
    const role = roleResult.value;

    const existing = await prisma.user.findUnique({ where: { name: normalizedName } });
    if (existing) {
      return Response.json(
        { ok: false, code: "NAME_TAKEN", error: "その名前はすでに使われています" },
        { status: 409 },
      );
    }

    const hashed = await hash(passcode, 12);
    const user = await prisma.user.create({
      data: { name: normalizedName, passcode: hashed, role },
      select: { id: true, name: true, role: true },
    });

    const token = await signJWT({ sub: user.id, name: user.name, role: user.role as "MENTOR" | "STUDENT" });
    await setSessionCookie(token);

    return Response.json({ ok: true, name: user.name, role: user.role });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return Response.json(
        { ok: false, code: "NAME_TAKEN", error: "その名前はすでに使われています" },
        { status: 409 },
      );
    }
    console.error("Authentication registration failed");
    return Response.json(
      { ok: false, code: "SERVICE_UNAVAILABLE", error: "現在、登録処理を利用できません。時間をおいて再試行してください" },
      { status: 503 },
    );
  }
}
