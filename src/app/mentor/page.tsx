import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck, Users, BarChart3, BookOpen, Swords } from "lucide-react";
import { getSession } from "@/lib/auth";
import { getAllProblems } from "@/lib/content";
import { WeakTagStats } from "@/components/mentor/WeakTagStats";
import { StudentRoster } from "@/components/mentor/StudentRoster";
import { DailyChallengeEditor } from "@/components/mentor/DailyChallengeEditor";

export const metadata: Metadata = { title: "師範ダッシュボード" };

async function fetchStats() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/mentor/stats`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function fetchStudents() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/mentor/students`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function MentorPage() {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") redirect("/dojo");

  const [statsData, studentsData] = await Promise.all([fetchStats(), fetchStudents()]);

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
            {statsData?.ok ? (
              <WeakTagStats
                topTags={statsData.topTags}
                totalAttempts={statsData.totalAttempts}
                studentCount={statsData.studentCount}
                mentorCount={statsData.mentorCount}
              />
            ) : (
              <p className="text-sm text-muted-foreground">データの取得に失敗しました。</p>
            )}
          </div>
        </section>

        {/* ─── B. 門下生名簿 ─── */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-neon-cyan" />
            <h2 className="font-display text-xl font-bold">B. 門下生名簿</h2>
          </div>
          <div className="glass rounded-2xl p-6">
            {studentsData?.ok ? (
              <StudentRoster students={studentsData.students} />
            ) : (
              <p className="text-sm text-muted-foreground">データの取得に失敗しました。</p>
            )}
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
