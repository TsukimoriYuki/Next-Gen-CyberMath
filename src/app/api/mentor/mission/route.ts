import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { collectVisibleRows } from "@/lib/collect-visible-rows";
import { canAccessMissionProblem } from "@/lib/mission-publication";

// GET /api/mentor/mission — 発令済みミッション一覧（最新30件）
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  const missions = await collectVisibleRows({
    limit: 30,
    batchSize: 100,
    fetchBatch: ({ afterId, take }) =>
      prisma.emergencyMission.findMany({
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        take,
        cursor: afterId ? { id: afterId } : undefined,
        skip: afterId ? 1 : undefined,
        include: {
          user: { select: { id: true, name: true, role: true } },
        },
      }),
    isVisible: (mission) => canAccessMissionProblem(mission.problemSlug),
  });

  return Response.json({
    ok: true,
    missions,
  });
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
    const normalizedUserId = typeof userId === "string" ? userId.trim() : "";
    const normalizedProblemSlug =
      typeof problemSlug === "string" ? problemSlug.trim() : "";
    const normalizedComment = typeof comment === "string" ? comment.trim() : "";
    if (!normalizedUserId || !normalizedProblemSlug || !normalizedComment) {
      return Response.json(
        { ok: false, error: "userId, problemSlug, comment は必須です" },
        { status: 400 },
      );
    }
    if (!canAccessMissionProblem(normalizedProblemSlug)) {
      return Response.json({ ok: false, error: "問題が見つかりません" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { id: normalizedUserId },
      select: { id: true },
    });
    if (!user) {
      return Response.json({ ok: false, error: "ユーザーが見つかりません" }, { status: 404 });
    }

    const mission = await prisma.emergencyMission.create({
      data: {
        userId: normalizedUserId,
        problemSlug: normalizedProblemSlug,
        comment: normalizedComment,
      },
      select: { id: true },
    });

    return Response.json({ ok: true, id: mission.id });
  } catch (e) {
    console.error("mission create error:", e);
    return Response.json({ ok: false, error: "課題の割り当てに失敗しました" }, { status: 500 });
  }
}
