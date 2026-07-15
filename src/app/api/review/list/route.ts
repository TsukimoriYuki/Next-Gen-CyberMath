import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { collectVisibleRows } from "@/lib/collect-visible-rows";
import { canAccessReviewItem } from "@/lib/review-publication";
import { canAccessSubjectResource } from "@/lib/subject-publication";

// GET /api/review/list
// ログイン中ユーザーのReviewItem一覧を返す。
// Query params: status, subjectId, sectionId, itemType, limit
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({
      ok: false,
      authenticated: false,
      items: [],
      meta: {
        total: 0,
        todayCount: 0,
        masteredCount: 0,
        overdueCount: 0,
      },
    });
  }

  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status") ?? undefined;
    const subjectId = url.searchParams.get("subjectId") ?? undefined;
    const sectionId = url.searchParams.get("sectionId") ?? undefined;
    const itemType = url.searchParams.get("itemType") ?? undefined;
    const limitParam = parseInt(url.searchParams.get("limit") ?? "50", 10);
    const limit = Math.min(Math.max(1, isNaN(limitParam) ? 50 : limitParam), 100);
    if (subjectId && !canAccessSubjectResource(subjectId, "review")) {
      return Response.json({ ok: false, error: "not found" }, { status: 404 });
    }

    const visibleItems = await collectVisibleRows({
      limit,
      batchSize: 100,
      fetchBatch: ({ afterId, take }) =>
        prisma.reviewItem.findMany({
          where: {
            userId: session.sub,
            ...(status ? { status } : {}),
            ...(subjectId ? { subjectId } : {}),
            ...(sectionId ? { sectionId } : {}),
            ...(itemType ? { itemType } : {}),
          },
          orderBy: [
            { status: "asc" },
            { nextReviewAt: "asc" },
            { id: "asc" },
          ],
          take,
          cursor: afterId ? { id: afterId } : undefined,
          skip: afterId ? 1 : undefined,
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
        }),
      isVisible: (item) => canAccessReviewItem(item),
    });

    const now = new Date();
    const todayCount = visibleItems.filter(
      (i) => i.status === "ACTIVE" && i.nextReviewAt <= now
    ).length;
    const masteredCount = visibleItems.filter((i) => i.status === "MASTERED").length;
    const overdueCount = visibleItems.filter(
      (i) =>
        i.status === "ACTIVE" &&
        i.nextReviewAt < now &&
        // 期限超過 = 今日より前（今日のものは todayCount に含める）
        i.nextReviewAt.toDateString() !== now.toDateString()
    ).length;

    return Response.json({
      ok: true,
      items: visibleItems.map((item) => ({
        ...item,
        nextReviewAt: item.nextReviewAt.toISOString(),
        lastReviewedAt: item.lastReviewedAt?.toISOString() ?? null,
        createdAt: item.createdAt.toISOString(),
      })),
      meta: {
        total: visibleItems.length,
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
