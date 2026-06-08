import { prisma } from "@/lib/prisma";

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
      },
      select: { id: true },
    });

    return Response.json({ ok: true, id: attempt.id });
  } catch (e) {
    // DB 不通でもクライアントは localStorage で完結するので 200 系で握りつぶさず 500 を返す。
    console.error("exam attempt save failed:", e);
    return Response.json({ ok: false, error: "db error" }, { status: 500 });
  }
}
