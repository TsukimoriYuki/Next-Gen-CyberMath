import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestTheme } from "@/data/common-test";

interface Props {
  question: CommonTestDrillQuestion;
  theme: CommonTestTheme;
  children: React.ReactNode;
}

export function EnglishReadingSplitView({ question, theme, children }: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
      {/* ── Left: passage / context ──────────────────────────────────────── */}
      <div className="w-full lg:w-[55%] lg:sticky lg:top-6">
        <div
          className="rounded-2xl p-5 sm:p-6"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: `1px solid rgba(${theme.glowRgb},0.13)`,
          }}
        >
          {question.context && (
            <>
              <div
                className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                style={{ color: `rgba(${theme.glowRgb},0.7)` }}
              >
                ◈ RESOURCE / TABLE
              </div>
              <div
                className="mb-5 overflow-x-auto rounded-lg p-3 font-mono text-xs leading-relaxed whitespace-pre"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {question.context}
              </div>
            </>
          )}

          {question.passage && (
            <>
              <div
                className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                style={{ color: `rgba(${theme.glowRgb},0.7)` }}
              >
                ◈ PASSAGE
              </div>
              <PassageText text={question.passage} />
            </>
          )}
        </div>
      </div>

      {/* ── Right: statement + answer panel ──────────────────────────────── */}
      <div className="w-full lg:flex-1 space-y-4">
        <div
          className="rounded-2xl p-5 sm:p-6"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid rgba(${theme.glowRgb},0.15)`,
          }}
        >
          <div
            className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
            style={{ color: `rgba(${theme.glowRgb},0.7)` }}
          >
            ◈ QUESTION
          </div>
          <p className="text-[15px] leading-relaxed text-white/90">
            {question.statement}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Passage with paragraph rendering ─────────────────────────────────────
function PassageText({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);
  return (
    <div className="space-y-3">
      {paragraphs.map((para, i) => {
        const lines = para.split("\n");
        if (lines.length === 1) {
          return (
            <p key={i} className="text-sm leading-relaxed text-white/75">
              {para}
            </p>
          );
        }
        return (
          <div key={i} className="space-y-1">
            {lines.map((line, j) => {
              const isHeading = /^[A-Z].*:$/.test(line.trim()) || line.trim().startsWith("[");
              return (
                <p
                  key={j}
                  className={
                    isHeading
                      ? "font-mono text-[11px] font-bold text-white/60"
                      : "text-sm leading-relaxed text-white/75"
                  }
                >
                  {line}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
