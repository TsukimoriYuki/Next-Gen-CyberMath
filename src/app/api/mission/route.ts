import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest } from "next/server";

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
    const missions = await prisma.emergencyMission.findMany({
      where: {
        ...(isCompleted !== undefined && { isCompleted }),
        ...(userIdParam && { userId: userIdParam }),
      },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return Response.json({ ok: true, missions });
  }

  // 生徒自身のミッションのみ
  const missions = await prisma.emergencyMission.findMany({
    where: {
      userId: session.sub,
      ...(isCompleted !== undefined && { isCompleted }),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return Response.json({ ok: true, missions });
}
