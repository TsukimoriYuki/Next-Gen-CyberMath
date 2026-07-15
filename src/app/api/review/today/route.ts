import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getProblem } from "@/lib/content";
import { collectVisibleRows } from "@/lib/collect-visible-rows";
import { canAccessReviewItem } from "@/lib/review-publication";

// GET /api/review/today
// ログイン中ユーザーの今日期限の復習アイテムを最大20件返す。
export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, authenticated: false, items: [] });
  }

  try {
    const dueAt = new Date();
    const items = await collectVisibleRows({
      limit: 20,
      batchSize: 100,
      fetchBatch: ({ afterId, take }) =>
        prisma.reviewItem.findMany({
          where: {
            userId: session.sub,
            status: "ACTIVE",
            nextReviewAt: { lte: dueAt },
          },
          orderBy: [{ nextReviewAt: "asc" }, { id: "asc" }],
          take,
          cursor: afterId ? { id: afterId } : undefined,
          skip: afterId ? 1 : undefined,
        }),
      isVisible: (item) => canAccessReviewItem(item),
    });

    const enriched = items.map((item) => {
      // math-problem は静的データからタイトルを補完
      let displayTitle = item.title ?? item.itemId;
      let unit: string | null = null;
      let difficulty: string | null = null;
      let tagline: string | null = null;

      if (item.itemType === "math-problem") {
        const problem = getProblem(item.itemId);
        displayTitle = problem?.title ?? item.title ?? item.itemId;
        unit = problem?.unit ?? null;
        difficulty = problem?.difficulty ?? null;
        tagline = problem?.tagline ?? null;
      }

      return {
        id: item.id,
        itemType: item.itemType,
        itemId: item.itemId,
        subjectId: item.subjectId,
        sectionId: item.sectionId,
        title: displayTitle,
        source: item.source,
        level: item.level,
        wrongCount: item.wrongCount,
        correctStreak: item.correctStreak,
        reasonFlags: item.reasonFlags,
        skillTags: item.skillTags,
        nextReviewAt: item.nextReviewAt.toISOString(),
        lastReviewedAt: item.lastReviewedAt?.toISOString() ?? null,
        // math-problem 専用フィールド
        unit,
        difficulty,
        tagline,
      };
    });

    return Response.json({ ok: true, items: enriched });
  } catch (e) {
    console.error("review/today failed:", e);
    return Response.json({ ok: false, error: "db error" }, { status: 500 });
  }
}
