import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/mission/[id] — ミッション詳細（本人 or MENTOR のみ）
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const mission = await prisma.emergencyMission.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true } } },
  });

  if (!mission) {
    return Response.json({ ok: false, error: "not found" }, { status: 404 });
  }
  if (session.role !== "MENTOR" && mission.userId !== session.sub) {
    return Response.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  return Response.json({ ok: true, mission });
}

// PATCH /api/mission/[id] — isCompleted を true に更新（本人のみ）
export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const mission = await prisma.emergencyMission.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!mission) {
    return Response.json({ ok: false, error: "not found" }, { status: 404 });
  }
  if (session.role !== "MENTOR" && mission.userId !== session.sub) {
    return Response.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  await prisma.emergencyMission.update({
    where: { id },
    data: { isCompleted: true },
  });

  return Response.json({ ok: true });
}
