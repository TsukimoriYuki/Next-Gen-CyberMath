import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// SRS スケジュール: level → 次回復習までの日数
const REVIEW_DAYS: Record<number, number> = { 0: 1, 1: 3, 2: 7, 3: 14 };
const MASTERED_THRESHOLD = 4;

function calcNextReviewAt(level: number): Date {
  const days = REVIEW_DAYS[level] ?? 14;
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next;
}

// POST /api/review/complete
// Body: { problemSlug: string, isCorrect: boolean }
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { problemSlug, isCorrect } = body ?? {};

    if (!problemSlug || typeof isCorrect !== "boolean") {
      return Response.json({ ok: false, error: "invalid payload" }, { status: 400 });
    }

    const existing = await prisma.reviewItem.findUnique({
      where: { userId_problemSlug: { userId: session.sub, problemSlug } },
    });

    if (!existing) {
      return Response.json({ ok: false, error: "not found" }, { status: 404 });
    }

    let newLevel: number;
    let newStatus: string;
    let newCorrectStreak: number;
    let newWrongCount: number;

    if (isCorrect) {
      newLevel = existing.level + 1;
      newCorrectStreak = existing.correctStreak + 1;
      newWrongCount = existing.wrongCount;
      newStatus = newLevel >= MASTERED_THRESHOLD ? "MASTERED" : "ACTIVE";
    } else {
      newLevel = 0;
      newCorrectStreak = 0;
      newWrongCount = existing.wrongCount + 1;
      newStatus = "ACTIVE";
    }

    const updated = await prisma.reviewItem.update({
      where: { id: existing.id },
      data: {
        level: newLevel,
        status: newStatus,
        correctStreak: newCorrectStreak,
        wrongCount: newWrongCount,
        nextReviewAt: newStatus === "MASTERED" ? new Date() : calcNextReviewAt(newLevel),
        lastReviewedAt: new Date(),
      },
      select: {
        id: true,
        level: true,
        status: true,
        correctStreak: true,
        wrongCount: true,
        nextReviewAt: true,
      },
    });

    return Response.json({ ok: true, item: updated });
  } catch (e) {
    console.error("review/complete failed:", e);
    return Response.json({ ok: false, error: "db error" }, { status: 500 });
  }
}
