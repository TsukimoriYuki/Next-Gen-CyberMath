import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signJWT, setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, passcode } = (await req.json()) ?? {};

    if (!name || !passcode) {
      return Response.json({ ok: false, error: "名前とパスコードを入力してください" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { name: String(name).trim() } });
    if (!user) {
      return Response.json({ ok: false, error: "名前またはパスコードが正しくありません" }, { status: 401 });
    }

    const ok = await compare(String(passcode), user.passcode);
    if (!ok) {
      return Response.json({ ok: false, error: "名前またはパスコードが正しくありません" }, { status: 401 });
    }

    // 最終ログイン時刻を更新
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

    const token = await signJWT({ sub: user.id, name: user.name, role: user.role as "MENTOR" | "STUDENT" });
    await setSessionCookie(token);

    return Response.json({ ok: true, name: user.name, role: user.role });
  } catch (e) {
    console.error("login error:", e);
    return Response.json({ ok: false, error: "ログインに失敗しました" }, { status: 500 });
  }
}
