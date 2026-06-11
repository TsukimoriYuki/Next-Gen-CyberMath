"use client";

// 解答状況ナビゲーター — 紙面風（マークシートの確認欄に近いトーン）
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
      className="rounded-lg p-4 space-y-4"
      style={{ background: "#ffffff", border: "1px solid #d1d5db" }}
    >
      <div className="text-xs font-bold" style={{ color: "#374151" }}>
        解答状況
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { bg: "#ffffff", border: "#9ca3af", label: "未解答" },
          { bg: "#374151", border: "#374151", label: "解答済" },
          { bg: "#fef3c7", border: "#f59e0b", label: "見直し" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div
              className="h-3 w-3 rounded-sm shrink-0"
              style={{ background: l.bg, border: `1px solid ${l.border}` }}
            />
            <span className="text-[10px]" style={{ color: "#6b7280" }}>{l.label}</span>
          </div>
        ))}
      </div>

      <div className="h-px" style={{ background: "#e5e7eb" }} />

      {/* Section groups */}
      <div className="space-y-3.5">
        {sectionGroups.map((group) => (
          <div key={group.sectionId}>
            <div className="text-[11px] font-bold mb-1.5" style={{ color: "#374151" }}>
              第{group.sectionNum}問
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.indices.map((qi) => {
                const isCurrent = qi === currentIdx;
                const ns = navStates[qi];
                const answered = ns?.answered ?? false;
                const flagged = ns?.flagged ?? false;

                let bg = "#ffffff";
                let border = "#9ca3af";
                let color = "#374151";
                if (answered) {
                  bg = "#374151";
                  border = "#374151";
                  color = "#ffffff";
                }
                if (flagged && !answered) {
                  bg = "#fef3c7";
                  border = "#f59e0b";
                  color = "#92400e";
                }
                if (flagged && answered) {
                  border = "#f59e0b";
                }
                if (isCurrent) {
                  border = "#2563eb";
                }

                return (
                  <button
                    key={qi}
                    type="button"
                    onClick={() => onNavigate(qi)}
                    className="flex h-8 w-8 items-center justify-center rounded text-xs font-bold transition-all hover:opacity-75 active:scale-95 relative"
                    style={{
                      background: bg,
                      border: `${isCurrent ? 2 : 1}px solid ${border}`,
                      color,
                    }}
                  >
                    {qi + 1}
                    {flagged && (
                      <span
                        className="absolute -top-1 -right-1 h-2 w-2 rounded-full"
                        style={{ background: "#f59e0b" }}
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
      <div className="h-px" style={{ background: "#e5e7eb" }} />
      <div className="grid grid-cols-3 gap-1 text-center">
        {[
          { value: navStates.filter((s) => s.answered).length, label: "解答" },
          { value: navStates.filter((s) => !s.answered).length, label: "未解答" },
          { value: navStates.filter((s) => s.flagged).length, label: "見直し" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="font-mono text-sm font-bold" style={{ color: "#111827" }}>
              {stat.value}
            </div>
            <div className="text-[10px]" style={{ color: "#9ca3af" }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
