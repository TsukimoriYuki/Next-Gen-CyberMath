import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getProblem } from "@/lib/content";

// GET /api/review/today
// ログイン中ユーザーの本日期限の復習アイテムを最大10件返す。
export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const items = await prisma.reviewItem.findMany({
      where: {
        userId: session.sub,
        status: "ACTIVE",
        nextReviewAt: { lte: new Date() },
      },
      orderBy: { nextReviewAt: "asc" },
      take: 10,
    });

    const enriched = items.map((item) => {
      const problem = getProblem(item.problemSlug);
      return {
        id: item.id,
        problemSlug: item.problemSlug,
        subject: item.subject,
        source: item.source,
        level: item.level,
        wrongCount: item.wrongCount,
        correctStreak: item.correctStreak,
        nextReviewAt: item.nextReviewAt.toISOString(),
        title: problem?.title ?? item.problemSlug,
        unit: problem?.unit ?? "—",
        difficulty: problem?.difficulty ?? "—",
        tagline: problem?.tagline ?? null,
      };
    });

    return Response.json({ ok: true, items: enriched });
  } catch (e) {
    console.error("review/today failed:", e);
    return Response.json({ ok: false, error: "db error" }, { status: 500 });
  }
}
