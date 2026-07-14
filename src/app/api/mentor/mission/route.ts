import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/mentor/mission — 発令済みミッション一覧（最新30件）
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  const missions = await prisma.emergencyMission.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      user: { select: { id: true, name: true, role: true } },
    },
  });

  return Response.json({ ok: true, missions });
}

// POST /api/mentor/mission — 新規ミッション発令
// body: { userId, problemSlug, comment }
export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  try {
    const { userId, problemSlug, comment } = (await req.json()) ?? {};
    if (!userId || !problemSlug || !comment?.trim()) {
      return Response.json(
        { ok: false, error: "userId, problemSlug, comment は必須です" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { id: String(userId) }, select: { id: true } });
    if (!user) {
      return Response.json({ ok: false, error: "ユーザーが見つかりません" }, { status: 404 });
    }

    const mission = await prisma.emergencyMission.create({
      data: {
        userId: String(userId),
        problemSlug: String(problemSlug),
        comment: String(comment).trim(),
      },
      select: { id: true },
    });

    return Response.json({ ok: true, id: mission.id });
  } catch (e) {
    console.error("mission create error:", e);
    return Response.json({ ok: false, error: "課題の割り当てに失敗しました" }, { status: 500 });
  }
}
