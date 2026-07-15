import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest } from "next/server";
import { collectVisibleRows } from "@/lib/collect-visible-rows";
import { canAccessMissionProblem } from "@/lib/mission-publication";

// GET /api/mission
// 生徒: 自分のミッション一覧
// MENTOR: 全生徒のミッション一覧（?userId=xxx でフィルタ可）
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const statusParam = searchParams.get("status"); // "completed" | "pending" | null (= all)
  const userIdParam = searchParams.get("userId");

  const isCompleted =
    statusParam === "completed" ? true :
    statusParam === "pending"   ? false :
    undefined;

  if (session.role === "MENTOR") {
    const missions = await collectVisibleRows({
      limit: 100,
      batchSize: 100,
      fetchBatch: ({ afterId, take }) =>
        prisma.emergencyMission.findMany({
          where: {
            ...(isCompleted !== undefined && { isCompleted }),
            ...(userIdParam && { userId: userIdParam }),
          },
          include: { user: { select: { id: true, name: true } } },
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          take,
          cursor: afterId ? { id: afterId } : undefined,
          skip: afterId ? 1 : undefined,
        }),
      isVisible: (mission) => canAccessMissionProblem(mission.problemSlug),
    });
    return Response.json({
      ok: true,
      missions,
    });
  }

  // 生徒自身のミッションのみ
  const missions = await collectVisibleRows({
    limit: 50,
    batchSize: 50,
    fetchBatch: ({ afterId, take }) =>
      prisma.emergencyMission.findMany({
        where: {
          userId: session.sub,
          ...(isCompleted !== undefined && { isCompleted }),
        },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        take,
        cursor: afterId ? { id: afterId } : undefined,
        skip: afterId ? 1 : undefined,
      }),
    isVisible: (mission) => canAccessMissionProblem(mission.problemSlug),
  });

  return Response.json({
    ok: true,
    missions,
  });
}
