import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/review/list
// ログイン中ユーザーのReviewItem一覧を返す。
// Query params: status, subjectId, sectionId, itemType, limit
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status") ?? undefined;
    const subjectId = url.searchParams.get("subjectId") ?? undefined;
    const sectionId = url.searchParams.get("sectionId") ?? undefined;
    const itemType = url.searchParams.get("itemType") ?? undefined;
    const limitParam = parseInt(url.searchParams.get("limit") ?? "50", 10);
    const limit = Math.min(Math.max(1, isNaN(limitParam) ? 50 : limitParam), 100);

    const items = await prisma.reviewItem.findMany({
      where: {
        userId: session.sub,
        ...(status ? { status } : {}),
        ...(subjectId ? { subjectId } : {}),
        ...(sectionId ? { sectionId } : {}),
        ...(itemType ? { itemType } : {}),
      },
      orderBy: [{ status: "asc" }, { nextReviewAt: "asc" }],
      take: limit,
      select: {
        id: true,
        itemType: true,
        itemId: true,
        subjectId: true,
        sectionId: true,
        title: true,
        source: true,
        status: true,
        level: true,
        wrongCount: true,
        correctStreak: true,
        reasonFlags: true,
        skillTags: true,
        nextReviewAt: true,
        lastReviewedAt: true,
        createdAt: true,
      },
    });

    const now = new Date();
    const todayCount = items.filter(
      (i) => i.status === "ACTIVE" && i.nextReviewAt <= now
    ).length;
    const masteredCount = items.filter((i) => i.status === "MASTERED").length;
    const overdueCount = items.filter(
      (i) =>
        i.status === "ACTIVE" &&
        i.nextReviewAt < now &&
        // 期限超過 = 今日より前（今日のものは todayCount に含める）
        i.nextReviewAt.toDateString() !== now.toDateString()
    ).length;

    return Response.json({
      ok: true,
      items: items.map((item) => ({
        ...item,
        nextReviewAt: item.nextReviewAt.toISOString(),
        lastReviewedAt: item.lastReviewedAt?.toISOString() ?? null,
        createdAt: item.createdAt.toISOString(),
      })),
      meta: {
        total: items.length,
        todayCount,
        masteredCount,
        overdueCount,
      },
    });
  } catch (e) {
    console.error("review/list failed:", e);
    return Response.json({ ok: false, error: "db error" }, { status: 500 });
  }
}
