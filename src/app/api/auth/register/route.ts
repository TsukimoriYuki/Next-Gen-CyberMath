import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signJWT, setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, passcode, mentorCode } = (await req.json()) ?? {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return Response.json({ ok: false, error: "名前は 2 文字以上で入力してください" }, { status: 400 });
    }
    if (!passcode || typeof passcode !== "string" || passcode.length < 4) {
      return Response.json({ ok: false, error: "パスコードは 4 文字以上で入力してください" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { name: name.trim() } });
    if (existing) {
      return Response.json({ ok: false, error: "その名前はすでに使われています" }, { status: 409 });
    }

    // 師範コードが一致すれば MENTOR ロール
    const mentorSecret = process.env.MENTOR_PASSCODE;
    const role =
      mentorSecret && typeof mentorCode === "string" && mentorCode === mentorSecret
        ? "MENTOR"
        : "STUDENT";

    const hashed = await hash(passcode, 12);
    const user = await prisma.user.create({
      data: { name: name.trim(), passcode: hashed, role },
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
