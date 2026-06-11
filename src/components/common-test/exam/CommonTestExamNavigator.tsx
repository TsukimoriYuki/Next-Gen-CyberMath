"use client";

import type { CommonTestExamPreset } from "@/data/common-test-exams";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";

export interface QuestionNavState {
  answered: boolean;
  flagged: boolean;
}

interface Props {
  preset: CommonTestExamPreset;
  questions: CommonTestDrillQuestion[];
  currentIdx: number;
  navStates: QuestionNavState[];
  onNavigate: (idx: number) => void;
}

export function CommonTestExamNavigator({
  preset,
  questions,
  currentIdx,
  navStates,
  onNavigate,
}: Props) {
  // Group by section
  const sectionGroups: { sectionId: string; sectionNum: number; indices: number[] }[] = [];
  questions.forEach((q, idx) => {
    const num = parseInt(q.sectionId.replace("section-", ""), 10);
    const existing = sectionGroups.find((g) => g.sectionId === q.sectionId);
    if (existing) {
      existing.indices.push(idx);
    } else {
      sectionGroups.push({ sectionId: q.sectionId, sectionNum: num, indices: [idx] });
    }
  });

  return (
    <div
      className="rounded-2xl p-4 space-y-4"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
        NAVIGATOR
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { color: "rgba(255,255,255,0.15)", border: "rgba(255,255,255,0.18)", label: "未回答" },
          { color: "rgba(34,197,94,0.25)", border: "rgba(34,197,94,0.45)", label: "回答済" },
          { color: "rgba(251,191,36,0.25)", border: "rgba(251,191,36,0.45)", label: "要見直し" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div
              className="h-3 w-3 rounded-sm shrink-0"
              style={{ background: l.color, border: `1px solid ${l.border}` }}
            />
            <span className="font-mono text-[8px] text-white/30">{l.label}</span>
          </div>
        ))}
      </div>

      <div className="h-px bg-white/[0.06]" />

      {/* Section groups */}
      <div className="space-y-4">
        {sectionGroups.map((group) => (
          <div key={group.sectionId}>
            <div className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: `rgba(${preset.theme.glowRgb},0.7)` }}>
              第{group.sectionNum}問
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.indices.map((qi) => {
                const isCurrent = qi === currentIdx;
                const ns = navStates[qi];
                const answered = ns?.answered ?? false;
                const flagged = ns?.flagged ?? false;

                let bg: string;
                let border: string;
                let color: string;
                if (isCurrent) {
                  bg = `rgba(${preset.theme.glowRgb},0.25)`;
                  border = `rgba(${preset.theme.glowRgb},0.7)`;
                  color = preset.theme.primary;
                } else if (answered && flagged) {
                  bg = "rgba(34,197,94,0.15)";
                  border = "rgba(251,191,36,0.55)";
                  color = "#fbbf24";
                } else if (answered) {
                  bg = "rgba(34,197,94,0.20)";
                  border = "rgba(34,197,94,0.50)";
                  color = "#22c55e";
                } else if (flagged) {
                  bg = "rgba(251,191,36,0.12)";
                  border = "rgba(251,191,36,0.40)";
                  color = "#fbbf24";
                } else {
                  bg = "rgba(255,255,255,0.04)";
                  border = "rgba(255,255,255,0.14)";
                  color = "rgba(255,255,255,0.45)";
                }

                return (
                  <button
                    key={qi}
                    type="button"
                    onClick={() => onNavigate(qi)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[10px] font-bold transition-all hover:opacity-80 active:scale-95 relative"
                    style={{ background: bg, border: `1px solid ${border}`, color }}
                  >
                    {qi + 1}
                    {flagged && (
                      <span
                        className="absolute -top-1 -right-1 h-2 w-2 rounded-full"
                        style={{ background: "#fbbf24" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="h-px bg-white/[0.06]" />
      <div className="grid grid-cols-3 gap-1 text-center">
        {[
          {
            value: navStates.filter((s) => s.answered).length,
            label: "回答",
            color: "#22c55e",
          },
          {
            value: navStates.filter((s) => !s.answered).length,
            label: "未回答",
            color: "rgba(255,255,255,0.35)",
          },
          {
            value: navStates.filter((s) => s.flagged).length,
            label: "見直し",
            color: "#fbbf24",
          },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="font-mono text-sm font-extrabold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="font-mono text-[8px] text-white/25">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
