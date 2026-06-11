import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

function tomorrowAt(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d;
}

// POST /api/exam/attempts — 模試結果を永続化する（匿名セッション）。
// クライアントは localStorage にも保存するため、DB 失敗時も結果画面は動く。
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sessionId,
      tags = [],
      difficulties = [],
      problemSlugs = [],
      timeLimitSec = 0,
      wrongSlugs = [],
      score = 0,
      totalCount = 0,
      durationSec = 0,
      weakTags = [],
    } = body ?? {};

    if (!sessionId || !Array.isArray(problemSlugs)) {
      return Response.json({ ok: false, error: "invalid payload" }, { status: 400 });
    }

    const session = await getSession();

    const attempt = await prisma.examAttempt.create({
      data: {
        sessionId: String(sessionId),
        tags,
        difficulties,
        problemSlugs,
        timeLimitSec,
        wrongSlugs,
        score,
        totalCount,
        durationSec,
        weakTags,
        userId: session?.sub ?? null,
      },
      select: { id: true },
    });

    // ログイン中ユーザーの間違い問題を復習キューに登録する。
    if (session?.sub && Array.isArray(wrongSlugs) && wrongSlugs.length > 0) {
      const tomorrow = tomorrowAt();
      await Promise.all(
        (wrongSlugs as string[]).map((slug) =>
          prisma.reviewItem.upsert({
            where: {
              userId_problemSlug: { userId: session.sub, problemSlug: slug },
            },
            create: {
              userId: session.sub,
              problemSlug: slug,
              subject: "math",
              source: "mock",
              nextReviewAt: tomorrow,
            },
            update: {
              wrongCount: { increment: 1 },
              level: 0,
              correctStreak: 0,
              nextReviewAt: tomorrow,
              status: "ACTIVE",
            },
          })
        )
      );
    }

    return Response.json({ ok: true, id: attempt.id });
  } catch (e) {
    console.error("exam attempt save failed:", e);
    return Response.json({ ok: false, error: "db error" }, { status: 500 });
  }
}
