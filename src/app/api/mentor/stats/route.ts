import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/mentor/stats
// 全体分析: weakTags 集計 + 直近の模試スコア
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  // 全 ExamAttempt から weakTags を集計
  const attempts = await prisma.examAttempt.findMany({
    select: {
      weakTags: true,
      score: true,
      totalCount: true,
      createdAt: true,
      userId: true,
    },
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  // weakTags の出現頻度カウント
  const tagCounts: Record<string, number> = {};
  for (const a of attempts) {
    for (const t of a.weakTags) {
      tagCounts[t] = (tagCounts[t] ?? 0) + 1;
    }
  }
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([tag, count]) => ({ tag, count }));

  // 直近 30 件のスコア推移
  const recentScores = attempts.slice(0, 30).map((a) => ({
    score: a.totalCount > 0 ? Math.round((a.score / a.totalCount) * 100) : 0,
    date: a.createdAt.toISOString().slice(0, 10),
    userId: a.userId,
  }));

  const totalAttempts = await prisma.examAttempt.count();
  const totalUsers = await prisma.user.count();
  const studentCount = await prisma.user.count({ where: { role: "STUDENT" } });
  const mentorCount = await prisma.user.count({ where: { role: "MENTOR" } });

  return Response.json({
    ok: true,
    topTags,
    recentScores,
    totalAttempts,
    totalUsers,
    studentCount,
    mentorCount,
  });
}
