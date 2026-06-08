import type { Metadata } from "next";
import { BookOpen, Crown } from "lucide-react";
import { getLessonsForIndex } from "@/lib/content";
import { LessonNode } from "@/components/lessons/LessonNode";

export const metadata: Metadata = {
  title: "授業スキルツリー",
  description: "授業同士の繋がりをたどるスキルツリー。難問対策の戦略講義も。",
};

const ELITE_UNIT = "難問対策・解法戦略";
// 単元ごとのノード色（無指定はシアン）。
const UNIT_ACCENT: Record<string, string> = {
  集合と命題: "var(--neon-violet)",
  場合の数と確率: "var(--neon-cyan)",
};

export default function LessonsSkillTreePage() {
  const groups = getLessonsForIndex();
  const elite = groups.find((g) => g.unit === ELITE_UNIT);
  const rest = groups.filter((g) => g.unit !== ELITE_UNIT);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-magenta/30 bg-neon-magenta/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-neon-magenta">
          <BookOpen className="h-3.5 w-3.5" />
          Skill Tree
        </div>
        <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
          授業スキルツリー
        </h1>
        <p className="mt-2 text-muted-foreground">
          概念のつながりをたどって理解を伸ばす。頂点には難関大を攻略する戦略講義。
        </p>
      </header>

      {/* ELITE TIER — 難問対策・解法戦略 */}
      {elite && (
        <section className="relative mt-10">
          <div
            className="rounded-3xl border p-6 sm:p-8"
            style={{
              borderColor: "color-mix(in oklch, #f5b301 45%, transparent)",
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in oklch, #e11d48 14%, transparent), transparent), linear-gradient(135deg, color-mix(in oklch, #f5b301 8%, transparent), transparent)",
              boxShadow:
                "0 0 0 1px color-mix(in oklch, #f5b301 30%, transparent), 0 0 40px color-mix(in oklch, #e11d48 22%, transparent)",
            }}
          >
            <div className="mb-5 flex items-center gap-2">
              <Crown className="h-5 w-5" style={{ color: "#fcd34d" }} />
              <h2 className="font-display text-xl font-bold tracking-wide" style={{ color: "#fcd34d" }}>
                難問対策・解法戦略
              </h2>
              <span className="ml-1 rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest"
                style={{ color: "#e11d48", borderColor: "color-mix(in oklch, #e11d48 50%, transparent)" }}>
                Elite
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {elite.lessons.map((l) => (
                <LessonNode key={l.slug} lesson={l} elite />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* UNIT TIERS — connected by a left neon spine */}
      <div className="relative mt-12 space-y-12 pl-6">
        {/* spine */}
        <span className="pointer-events-none absolute bottom-2 left-1 top-2 w-px bg-gradient-to-b from-neon-cyan/60 via-neon-violet/40 to-transparent" />
        {rest.map(({ unit, lessons }) => {
          const accent = UNIT_ACCENT[unit] ?? "var(--neon-cyan)";
          return (
            <section key={unit} className="relative">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="absolute -left-[1.4rem] h-3 w-3 rounded-full"
                  style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
                />
                <h2 className="font-display text-lg font-bold tracking-wide">{unit}</h2>
                <span className="h-px flex-1 bg-border/50" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {lessons.map((l) => (
                  <LessonNode key={l.slug} lesson={l} accent={accent} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
