import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getNextReviewDate, getNextLevelAfterReview } from "@/lib/review-schedule";
import { canAccessReviewItem } from "@/lib/review-publication";

// POST /api/review/complete
// Body: { reviewItemId: string, isCorrect: boolean }
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { reviewItemId, isCorrect } = body ?? {};

    if (!reviewItemId || typeof isCorrect !== "boolean") {
      return Response.json({ ok: false, error: "invalid payload" }, { status: 400 });
    }

    const existing = await prisma.reviewItem.findUnique({
      where: { id: reviewItemId },
    });

    if (!existing) {
      return Response.json({ ok: false, error: "not found" }, { status: 404 });
    }
    if (!canAccessReviewItem(existing)) {
      return Response.json({ ok: false, error: "not found" }, { status: 404 });
    }

    // 他人のアイテムは更新不可
    if (existing.userId !== session.sub) {
      return Response.json({ ok: false, error: "forbidden" }, { status: 403 });
    }

    const { nextLevel, status } = getNextLevelAfterReview(existing.level, isCorrect);
    const now = new Date();

    const updated = await prisma.reviewItem.update({
      where: { id: existing.id },
      data: {
        level: nextLevel,
        status,
        correctStreak: isCorrect ? existing.correctStreak + 1 : 0,
        wrongCount: isCorrect ? existing.wrongCount : existing.wrongCount + 1,
        nextReviewAt: status === "MASTERED" ? now : getNextReviewDate(nextLevel, now),
        lastReviewedAt: now,
      },
      select: {
        id: true,
        level: true,
        status: true,
        correctStreak: true,
        wrongCount: true,
        nextReviewAt: true,
        lastReviewedAt: true,
      },
    });

    const message =
      status === "MASTERED"
        ? "MASTERED — 完全習得！この問題は復習キューから卒業します。"
        : isCorrect
        ? `正解！次回は ${updated.nextReviewAt.toLocaleDateString("ja-JP")} に復習します。`
        : `不正解。明日また復習します。`;

    return Response.json({
      ok: true,
      item: {
        ...updated,
        nextReviewAt: updated.nextReviewAt.toISOString(),
        lastReviewedAt: updated.lastReviewedAt?.toISOString() ?? null,
      },
      message,
    });
  } catch (e) {
    console.error("review/complete failed:", e);
    return Response.json({ ok: false, error: "db error" }, { status: 500 });
  }
}
