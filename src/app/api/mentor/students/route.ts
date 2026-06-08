import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/mentor/students
// 門下生名簿: ユーザー一覧 + 模試回数
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      createdAt: true,
      lastLoginAt: true,
      _count: { select: { attempts: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // 各ユーザーの最高スコアと直近 weakTags を集計
  const enriched = await Promise.all(
    users.map(async (u) => {
      const lastAttempt = await prisma.examAttempt.findFirst({
        where: { userId: u.id },
        orderBy: { createdAt: "desc" },
        select: { score: true, totalCount: true, weakTags: true, createdAt: true },
      });
      return {
        id: u.id,
        name: u.name,
        role: u.role,
        createdAt: u.createdAt,
        lastLoginAt: u.lastLoginAt,
        attemptCount: u._count.attempts,
        lastScore: lastAttempt
          ? lastAttempt.totalCount > 0
            ? Math.round((lastAttempt.score / lastAttempt.totalCount) * 100)
            : 0
          : null,
        lastWeakTags: lastAttempt?.weakTags.slice(0, 3) ?? [],
        lastAttemptAt: lastAttempt?.createdAt ?? null,
      };
    }),
  );

  return Response.json({ ok: true, students: enriched });
}
