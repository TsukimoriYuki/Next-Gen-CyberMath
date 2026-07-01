import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  ShieldCheck,
  Users,
  BarChart3,
  BookOpen,
  Swords,
  Flame,
  MessageSquare,
  Activity,
  BookMarked,
  Network,
  Zap,
} from "lucide-react";
import { getSession } from "@/lib/auth";
import { SITE_NAME } from "@/lib/site";
import { getAllProblems } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { WeakTagStats } from "@/components/mentor/WeakTagStats";
import { StudentRoster } from "@/components/mentor/StudentRoster";
import { DailyChallengeEditor } from "@/components/mentor/DailyChallengeEditor";
import { EmergencyMissionEditor } from "@/components/mentor/EmergencyMissionEditor";
import type { EnglishProblemItem } from "@/components/mentor/EmergencyMissionEditor";
import { MessageEditor } from "@/components/mentor/MessageEditor";
import { MentorTabBar } from "@/components/mentor/MentorTabBar";
import { SPEED_READING_PROBLEMS } from "@/data/english-speed-reading";
import { COMPREHENSION_PROBLEMS } from "@/data/english-comprehension";
import { MULTI_SOURCE_PROBLEMS } from "@/data/english-multisource";

export const metadata: Metadata = { title: "師範ダッシュボード" };
export const dynamic = "force-dynamic";

export default async function MentorPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") redirect("/dojo");

  const { tab } = await searchParams;
  const subject = tab === "english" ? "english" : "math";

  // ─── DB 統計 ───────────────────────────────────────────────────
  const [r0, r1, r2, r3, r4, r5] = await Promise.allSettled([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "MENTOR" } }),
    prisma.examAttempt.count(),
    prisma.examAttempt.findMany({ select: { weakTags: true } }),
    // groupBy で全レコードを DB 側で集計（take 上限なし）
    prisma.englishAttempt.groupBy({
      by: ["userId", "mode"],
      _sum: { score: true, total: true },
      _count: { id: true },
    }),
    prisma.user.findMany({
      where: { englishAttempts: { some: {} } },
      select: { id: true, name: true },
    }),
  ]);
  const studentCount    = r0.status === "fulfilled" ? r0.value : 0;
  const mentorCount     = r1.status === "fulfilled" ? r1.value : 0;
  const totalAttempts   = r2.status === "fulfilled" ? r2.value : 0;
  const allAttempts     = r3.status === "fulfilled" ? r3.value : [];
  const englishGrouped  = r4.status === "fulfilled" ? r4.value : [];
  const englishUserList = r5.status === "fulfilled" ? r5.value : [];

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

  // ─── 門下生一覧 ────────────────────────────────────────────────
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
      lastScore: latest
        ? Math.round((latest.score / Math.max(latest.totalCount, 1)) * 100)
        : null,
      lastWeakTags: latest?.weakTags ?? [],
      lastAttemptAt: latest?.createdAt?.toISOString() ?? null,
    };
  });

  // ─── 英語学習 集計（groupBy ベース、件数上限なし）────────────
  const userNameMap = new Map(englishUserList.map((u) => [u.id, u.name]));

  type EnglishStudentStat = {
    id: string; name: string;
    speedReading:  { count: number; avgAccuracy: number | null };
    comprehension: { count: number; avgAccuracy: number | null };
    multiSource:   { count: number };
  };
  const englishByUser = new Map<string, {
    sr: { count: number; totalScore: number; totalQ: number };
    cp: { count: number; totalScore: number; totalQ: number };
    ms: { count: number };
  }>();
  for (const row of englishGrouped) {
    if (!englishByUser.has(row.userId)) {
      englishByUser.set(row.userId, {
        sr: { count: 0, totalScore: 0, totalQ: 0 },
        cp: { count: 0, totalScore: 0, totalQ: 0 },
        ms: { count: 0 },
      });
    }
    const d = englishByUser.get(row.userId)!;
    const cnt = row._count.id;
    const scoreSum = row._sum.score ?? 0;
    const totalSum = row._sum.total ?? 0;
    if (row.mode === "speed-reading") { d.sr.count += cnt; d.sr.totalScore += scoreSum; d.sr.totalQ += totalSum; }
    if (row.mode === "comprehension") { d.cp.count += cnt; d.cp.totalScore += scoreSum; d.cp.totalQ += totalSum; }
    if (row.mode === "multi-source")  { d.ms.count += cnt; }
  }
  const englishStudentStats: EnglishStudentStat[] = Array.from(englishByUser.entries()).map(([id, d]) => ({
    id,
    name: userNameMap.get(id) ?? id,
    speedReading:  { count: d.sr.count, avgAccuracy: d.sr.totalQ > 0 ? Math.round((d.sr.totalScore / d.sr.totalQ) * 100) : null },
    comprehension: { count: d.cp.count, avgAccuracy: d.cp.totalQ > 0 ? Math.round((d.cp.totalScore / d.cp.totalQ) * 100) : null },
    multiSource:   { count: d.ms.count },
  }));

  // 全体集計
  let srTotalScore = 0, srTotalQ = 0, cpTotalScore = 0, cpTotalQ = 0, msCount = 0;
  let totalEnglishAttempts = 0;
  for (const row of englishGrouped) {
    const cnt = row._count.id;
    totalEnglishAttempts += cnt;
    if (row.mode === "speed-reading") { srTotalScore += row._sum.score ?? 0; srTotalQ += row._sum.total ?? 0; }
    if (row.mode === "comprehension") { cpTotalScore += row._sum.score ?? 0; cpTotalQ += row._sum.total ?? 0; }
    if (row.mode === "multi-source")  { msCount += cnt; }
  }
  const englishGlobal = {
    srAvgAccuracy: srTotalQ > 0 ? Math.round((srTotalScore / srTotalQ) * 100) : null,
    cpAvgAccuracy: cpTotalQ > 0 ? Math.round((cpTotalScore / cpTotalQ) * 100) : null,
    msCount,
    totalAttempts: totalEnglishAttempts,
  };

  // ─── Math 問題一覧（tier付き） ─────────────────────────────────
  const allProblems = getAllProblems().map((p) => ({
    slug: p.slug,
    title: p.title,
    unit: p.unit,
    difficulty: p.difficulty,
    tags: p.tags,
    tier: p.tier,
  }));

  // ─── English 問題一覧 ──────────────────────────────────────────
  const LEVEL_LABEL: Record<string, string> = {
    TEXTBOOK:     "教科書",
    COMMON_TEST:  "共通テスト",
    PRIVATE_UNI:  "私立大",
    NATIONAL_UNI: "国公立大",
  };

  const allEnglishProblems: EnglishProblemItem[] = [
    ...SPEED_READING_PROBLEMS.map((p) => ({
      id: p.id,
      title: p.title,
      category: "SPEED_READING" as const,
      categoryLabel: "速読長文",
      level: LEVEL_LABEL[p.level] ?? p.level,
      tags: p.tags ?? [],
      path: `english/speed-reading/${p.id}`,
    })),
    ...COMPREHENSION_PROBLEMS.map((p) => ({
      id: p.id,
      title: p.title,
      category: "COMPREHENSION" as const,
      categoryLabel: "精読長文",
      level: LEVEL_LABEL[p.level] ?? p.level,
      tags: p.tags,
      path: `english/comprehension/${p.id}`,
    })),
    ...MULTI_SOURCE_PROBLEMS.map((p) => ({
      id: p.id,
      title: p.title,
      category: "MULTI_SOURCE" as const,
      categoryLabel: "マルチソース",
      level: LEVEL_LABEL[p.level] ?? p.level,
      tags: p.tags,
      path: `english/multi-source/${p.id}`,
    })),
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      {/* ヘッダー */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-amber/30 bg-neon-amber/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-amber">
          <ShieldCheck className="h-3.5 w-3.5" />
          Mentor Dashboard · {SITE_NAME}
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight">
          師範の間
        </h1>
        <p className="mt-2 text-muted-foreground">
          ようこそ、{session.name} 師範。門下生の状況と本日の挑戦状を管理します。
        </p>
      </header>

      {/* Subject tabs */}
      <div className="mb-10">
        <MentorTabBar current={subject} />
      </div>

      {/* ══════════════════════════════════════════════════════
          MATH tab
         ══════════════════════════════════════════════════════ */}
      {subject === "math" && (
        <div className="space-y-10">
          {/* A. 全体分析 */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-neon-magenta" />
              <h2 className="font-display text-xl font-bold">A. 全体分析（MATH）</h2>
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

          {/* B. 門下生名簿 */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-neon-cyan" />
              <h2 className="font-display text-xl font-bold">B. 門下生名簿</h2>
            </div>
            <div className="glass rounded-2xl p-6">
              <StudentRoster students={students} />
            </div>
          </section>

          {/* C. 挑戦状セットアップ */}
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

          {/* D. 緊急ミッション発令 */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Flame className="h-5 w-5 text-neon-magenta" />
              <h2 className="font-display text-xl font-bold">D. 緊急ミッション発令</h2>
            </div>
            <div className="glass rounded-2xl p-6">
              <p className="mb-6 text-sm text-muted-foreground">
                特定の門下生に「緊急ミッション」を発令します。科目・カテゴリ・問題を段階的に選択してください。
              </p>
              <EmergencyMissionEditor
                students={students}
                allProblems={allProblems}
                allEnglishProblems={allEnglishProblems}
                defaultSubject="MATH"
              />
            </div>
          </section>

          {/* E. 通信司令室 */}
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
      )}

      {/* ══════════════════════════════════════════════════════
          ENGLISH tab
         ══════════════════════════════════════════════════════ */}
      {subject === "english" && (
        <div className="space-y-10">
          {/* English analytics — 実データ表示 */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5" style={{ color: "#10b981" }} />
              <h2 className="font-display text-xl font-bold">A. 英語学習分析（門下生）</h2>
            </div>
            <div className="glass rounded-2xl p-6 space-y-5">

              {/* 全体サマリーカード */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "総挑戦数",        value: String(englishGlobal.totalAttempts),                          accent: "#10b981", icon: Activity   },
                  { label: "速読 平均正答率",  value: englishGlobal.srAvgAccuracy != null ? `${englishGlobal.srAvgAccuracy}%` : "--", accent: "#10b981", icon: Zap        },
                  { label: "精読 平均正答率",  value: englishGlobal.cpAvgAccuracy != null ? `${englishGlobal.cpAvgAccuracy}%` : "--", accent: "#22d3ee", icon: BookMarked  },
                  { label: "マルチソース 完了", value: String(englishGlobal.msCount),                               accent: "#a78bfa", icon: Network     },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.label}
                      className="rounded-xl p-4"
                      style={{
                        background: `color-mix(in srgb, ${c.accent} 8%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${c.accent} 25%, transparent)`,
                      }}
                    >
                      <div className="mb-2 flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5" style={{ color: c.accent }} />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{c.label}</span>
                      </div>
                      <p className="font-display text-2xl font-extrabold" style={{ color: c.accent }}>
                        {c.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* 生徒別内訳テーブル */}
              {englishStudentStats.length === 0 ? (
                <p className="text-center font-mono text-xs text-muted-foreground py-4">
                  まだ英語学習データがありません（生徒がログイン状態で問題を解くと集計されます）
                </p>
              ) : (
                <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                        {["生徒名", "速読 回数", "速読 正答率", "精読 回数", "精読 正答率", "マルチ 完了"].map((h) => (
                          <th key={h} className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {englishStudentStats.map((s) => (
                        <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <td className="px-4 py-2.5 font-mono text-xs font-semibold text-white">{s.name}</td>
                          <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{s.speedReading.count}</td>
                          <td className="px-4 py-2.5 font-mono text-xs" style={{ color: "#10b981" }}>
                            {s.speedReading.avgAccuracy != null ? `${s.speedReading.avgAccuracy}%` : "--"}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{s.comprehension.count}</td>
                          <td className="px-4 py-2.5 font-mono text-xs" style={{ color: "#22d3ee" }}>
                            {s.comprehension.avgAccuracy != null ? `${s.comprehension.avgAccuracy}%` : "--"}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-xs" style={{ color: "#a78bfa" }}>{s.multiSource.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 収録問題数 */}
              <div
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">収録問題数</p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { label: "速読長文",      count: SPEED_READING_PROBLEMS.length,  accent: "#10b981", icon: Zap      },
                    { label: "精読長文",      count: COMPREHENSION_PROBLEMS.length,  accent: "#22d3ee", icon: BookOpen  },
                    { label: "マルチソース",  count: MULTI_SOURCE_PROBLEMS.length,   accent: "#a78bfa", icon: Network   },
                  ].map((c) => {
                    const Icon = c.icon;
                    return (
                      <span key={c.label} className="flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5" style={{ color: c.accent }} />
                        <span className="font-mono text-xs text-muted-foreground">{c.label}</span>
                        <span className="font-display font-bold" style={{ color: c.accent }}>{c.count}問</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* English emergency mission */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Flame className="h-5 w-5 text-neon-magenta" />
              <h2 className="font-display text-xl font-bold">B. 英語緊急ミッション発令</h2>
            </div>
            <div className="glass rounded-2xl p-6">
              <p className="mb-6 text-sm text-muted-foreground">
                英語の問題を門下生にアサインします。速読長文・精読長文・マルチソースから選択してください。
              </p>
              <EmergencyMissionEditor
                students={students}
                allProblems={allProblems}
                allEnglishProblems={allEnglishProblems}
                defaultSubject="ENGLISH"
              />
            </div>
          </section>

          {/* E. 通信司令室 */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-neon-violet" />
              <h2 className="font-display text-xl font-bold">C. 通信司令室</h2>
            </div>
            <div className="glass rounded-2xl p-6">
              <p className="mb-6 text-sm text-muted-foreground">
                英語学習に関するDMや一斉通知を送信します。
              </p>
              <MessageEditor students={students.filter((s) => s.role === "STUDENT")} />
            </div>
          </section>
        </div>
      )}

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
