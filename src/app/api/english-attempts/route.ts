import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest } from "next/server";

// ── POST /api/english-attempts — 生徒が問題を解いたときに呼ばれる ────────

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const { problemId, mode, level, score, total } = body ?? {};

  if (
    typeof problemId !== "string" ||
    typeof mode !== "string" ||
    typeof level !== "string" ||
    typeof score !== "number" ||
    typeof total !== "number"
  ) {
    return Response.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  const VALID_MODES  = ["speed-reading", "comprehension", "multi-source"] as const;
  const VALID_LEVELS = ["TEXTBOOK", "COMMON_TEST", "PRIVATE_UNI", "NATIONAL_UNI"] as const;
  if (
    !VALID_MODES.includes(mode as (typeof VALID_MODES)[number]) ||
    !VALID_LEVELS.includes(level as (typeof VALID_LEVELS)[number])
  ) {
    return Response.json({ ok: false, error: "invalid mode or level" }, { status: 400 });
  }

  await prisma.englishAttempt.create({
    data: {
      userId: session.sub,
      problemId,
      mode,
      level,
      score,
      total,
    },
  });

  return Response.json({ ok: true });
}

// ── GET /api/english-attempts — 生徒: 自分の履歴 / MENTOR: 全生徒の集計 ──

export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  if (session.role === "MENTOR") {
    // 全生徒の英語挑戦データを集計して返す
    const attempts = await prisma.englishAttempt.findMany({
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    // 生徒ごとに集計
    const byUser = new Map<string, {
      name: string;
      speedReading: { count: number; totalScore: number; totalQ: number };
      comprehension: { count: number; totalScore: number; totalQ: number };
      multiSource: { count: number; totalScore: number; totalQ: number };
    }>();

    for (const a of attempts) {
      const uid = a.user.id;
      if (!byUser.has(uid)) {
        byUser.set(uid, {
          name: a.user.name,
          speedReading:  { count: 0, totalScore: 0, totalQ: 0 },
          comprehension: { count: 0, totalScore: 0, totalQ: 0 },
          multiSource:   { count: 0, totalScore: 0, totalQ: 0 },
        });
      }
      const u = byUser.get(uid)!;
      if (a.mode === "speed-reading")  { u.speedReading.count++;  u.speedReading.totalScore  += a.score; u.speedReading.totalQ  += a.total; }
      if (a.mode === "comprehension")  { u.comprehension.count++; u.comprehension.totalScore += a.score; u.comprehension.totalQ += a.total; }
      if (a.mode === "multi-source")   { u.multiSource.count++;   u.multiSource.totalScore   += a.score; u.multiSource.totalQ   += a.total; }
    }

    const students = Array.from(byUser.entries()).map(([id, d]) => ({
      id,
      name: d.name,
      speedReading: {
        count: d.speedReading.count,
        avgAccuracy: d.speedReading.totalQ > 0
          ? Math.round((d.speedReading.totalScore / d.speedReading.totalQ) * 100)
          : null,
      },
      comprehension: {
        count: d.comprehension.count,
        avgAccuracy: d.comprehension.totalQ > 0
          ? Math.round((d.comprehension.totalScore / d.comprehension.totalQ) * 100)
          : null,
      },
      multiSource: { count: d.multiSource.count },
    }));

    return Response.json({ ok: true, students });
  }

  // 生徒自身の履歴（最新 50 件）
  const attempts = await prisma.englishAttempt.findMany({
    where: { userId: session.sub },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return Response.json({ ok: true, attempts });
}
