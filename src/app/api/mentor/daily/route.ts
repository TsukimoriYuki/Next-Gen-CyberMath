import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/mentor/daily?date=YYYY-MM-DD
// 指定日の DailyChallenge を取得
export async function GET(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date") ?? new Date().toISOString().slice(0, 10);
  const date = new Date(`${dateStr}T00:00:00.000Z`);

  const challenges = await prisma.dailyChallenge.findMany({
    where: { date },
    include: { problem: { select: { slug: true, title: true, unit: true, difficulty: true } } },
    orderBy: { slot: "asc" },
  });

  return Response.json({ ok: true, date: dateStr, challenges });
}

// POST /api/mentor/daily
// body: { date: "YYYY-MM-DD", slugs: [slug1, slug2, slug3] }
// 指定日の DailyChallenge を upsert（既存は削除して入れ直す）
export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 403 });
  }

  try {
    const { date: dateStr, slugs } = (await req.json()) ?? {};

    if (!dateStr || !Array.isArray(slugs) || slugs.length !== 3) {
      return Response.json({ ok: false, error: "date と slugs (3件) が必要です" }, { status: 400 });
    }

    const date = new Date(`${dateStr}T00:00:00.000Z`);

    // slug → id を解決
    const problems = await prisma.problem.findMany({
      where: { slug: { in: slugs } },
      select: { id: true, slug: true },
    });
    const slugMap = Object.fromEntries(problems.map((p) => [p.slug, p.id]));

    for (const slug of slugs) {
      if (!slugMap[slug]) {
        return Response.json({ ok: false, error: `問題が見つかりません: ${slug}` }, { status: 400 });
      }
    }

    // 既存エントリを削除してから挿入（upsert より deleteMany + createMany が確実）
    await prisma.dailyChallenge.deleteMany({ where: { date } });
    await prisma.dailyChallenge.createMany({
      data: slugs.map((slug, i) => ({
        date,
        slot: i + 1,
        problemId: slugMap[slug],
      })),
    });

    return Response.json({ ok: true, date: dateStr });
  } catch (e) {
    console.error("daily set error:", e);
    return Response.json({ ok: false, error: "保存に失敗しました" }, { status: 500 });
  }
}
