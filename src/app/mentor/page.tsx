import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck, Users, BarChart3, BookOpen, Swords, Flame, MessageSquare } from "lucide-react";
import { getSession } from "@/lib/auth";
import { getAllProblems } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { WeakTagStats } from "@/components/mentor/WeakTagStats";
import { StudentRoster } from "@/components/mentor/StudentRoster";
import { DailyChallengeEditor } from "@/components/mentor/DailyChallengeEditor";
import { EmergencyMissionEditor } from "@/components/mentor/EmergencyMissionEditor";
import { MessageEditor } from "@/components/mentor/MessageEditor";

export const metadata: Metadata = { title: "師範ダッシュボード" };
export const dynamic = "force-dynamic";

export default async function MentorPage() {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") redirect("/dojo");

  // ─── 統計データをDBから直接取得 ───
  const [studentCount, mentorCount, totalAttempts, allAttempts] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "MENTOR" } }),
    prisma.examAttempt.count(),
    prisma.examAttempt.findMany({ select: { weakTags: true } }),
  ]);

  const tagCounts = new Map<string, number>();
  for (const a of allAttempts) {
    for (const tag of a.weakTags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const topTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag, count]) => ({ tag, count }));

  // ─── 門下生一覧 ───
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      attempts: {
        select: { score: true, totalCount: true, createdAt: true, weakTags: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  const students = users.map((u) => {
    const latest = u.attempts[0] ?? null;
    return {
      id: u.id,
      name: u.name,
      role: u.role,
      createdAt: u.createdAt.toISOString(),
      lastLoginAt: u.lastLoginAt?.toISOString() ?? null,
      attemptCount: u.attempts.length,
      lastScore: latest ? Math.round((latest.score / Math.max(latest.totalCount, 1)) * 100) : null,
      lastWeakTags: latest?.weakTags ?? [],
      lastAttemptAt: latest?.createdAt?.toISOString() ?? null,
    };
  });

  const allProblems = getAllProblems().map((p) => ({
    slug: p.slug,
    title: p.title,
    unit: p.unit,
    difficulty: p.difficulty,
    tags: p.tags,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      {/* ヘッダー */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-amber/30 bg-neon-amber/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-amber">
          <ShieldCheck className="h-3.5 w-3.5" />
          Mentor Dashboard
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight">
          師範の間
        </h1>
        <p className="mt-2 text-muted-foreground">
          ようこそ、{session.name} 師範。門下生の状況と本日の挑戦状を管理します。
        </p>
      </header>

      <div className="space-y-10">
        {/* ─── A. 全体分析 ─── */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-neon-magenta" />
            <h2 className="font-display text-xl font-bold">A. 全体分析</h2>
          </div>
          <div className="glass rounded-2xl p-6">
            <WeakTagStats
              topTags={topTags}
              totalAttempts={totalAttempts}
              studentCount={studentCount}
              mentorCount={mentorCount}
            />
          </div>
        </section>

        {/* ─── B. 門下生名簿 ─── */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-neon-cyan" />
            <h2 className="font-display text-xl font-bold">B. 門下生名簿</h2>
          </div>
          <div className="glass rounded-2xl p-6">
            <StudentRoster students={students} />
          </div>
        </section>

        {/* ─── C. 挑戦状セットアップ ─── */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Swords className="h-5 w-5 text-neon-amber" />
            <h2 className="font-display text-xl font-bold">C. 挑戦状セットアップ</h2>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="mb-6 text-sm text-muted-foreground">
              日付を選んで、その日の「挑戦状」3問を設定します。ホーム画面の「今日の挑戦」に反映されます。
            </p>
            <DailyChallengeEditor allProblems={allProblems} />
          </div>
        </section>

        {/* ─── D. 緊急ミッション発令 ─── */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-neon-magenta" />
            <h2 className="font-display text-xl font-bold">D. 緊急ミッション発令</h2>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="mb-6 text-sm text-muted-foreground">
              特定の門下生に「緊急ミッション」を発令します。
              ホーム画面に警戒色のパネルが出現し、生徒はそのまま専用道場へ突入します。
              師範からのコメントは、最後の解答ステップを開いた瞬間にフェードインで登場します。
            </p>
            <EmergencyMissionEditor students={students} allProblems={allProblems} />
          </div>
        </section>
        {/* ─── E. 通信司令室 ─── */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-neon-violet" />
            <h2 className="font-display text-xl font-bold">E. 通信司令室</h2>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="mb-6 text-sm text-muted-foreground">
              特定の門下生への DM、または全員への一斉通知を送信します。
              メッセージはホーム画面のインボックスバナーに表示されます。
            </p>
            <MessageEditor students={students.filter((s) => s.role === "STUDENT")} />
          </div>
        </section>
      </div>

      {/* フッターメモ */}
      <div className="mt-12 flex items-start gap-2 rounded-xl border border-neon-amber/20 bg-neon-amber/5 p-4 text-xs text-muted-foreground">
        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-neon-amber/70" />
        <span>
          師範ダッシュボードはセッション中のみ表示されます。
          <code className="mx-1 rounded bg-muted/70 px-1 py-0.5 font-mono text-[10px]">MENTOR_PASSCODE</code>
          を知る者のみが師範として登録できます。
        </span>
      </div>
    </div>
  );
}
