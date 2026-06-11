import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestTheme } from "@/data/common-test";

interface Props {
  question: CommonTestDrillQuestion;
  theme: CommonTestTheme;
  children: React.ReactNode;
}

// 問題本文は紙面風（白背景・黒文字）。ページ全体のCYBERトーンとは分離する。
export function EnglishReadingSplitView({ question, children }: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
      {/* ── Left: passage / context ──────────────────────────────────────── */}
      <div className="w-full lg:w-[55%] lg:sticky lg:top-6">
        <div
          className="rounded-lg p-5 sm:p-6"
          style={{
            background: "#ffffff",
            border: "1px solid #d1d5db",
            color: "#1f2937",
          }}
        >
          {question.context && (
            <>
              <div className="mb-3 text-xs font-bold" style={{ color: "#6b7280" }}>
                資料
              </div>
              <div
                className="mb-5 overflow-x-auto rounded p-3.5 font-mono text-xs leading-relaxed whitespace-pre"
                style={{
                  background: "#fafafa",
                  border: "1px solid #e5e7eb",
                  color: "#374151",
                }}
              >
                {question.context}
              </div>
            </>
          )}

          {question.passage && (
            <>
              <div className="mb-3 text-xs font-bold" style={{ color: "#6b7280" }}>
                本文
              </div>
              <PassageText text={question.passage} />
            </>
          )}
        </div>
      </div>

      {/* ── Right: statement + answer panel ──────────────────────────────── */}
      <div className="w-full lg:flex-1 space-y-4">
        <div
          className="rounded-lg p-5 sm:p-6"
          style={{
            background: "#ffffff",
            border: "1px solid #d1d5db",
            color: "#1f2937",
          }}
        >
          <div className="mb-2 text-xs font-bold" style={{ color: "#6b7280" }}>
            設問
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: "#111827" }}>
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
            <p key={i} className="text-[15px] leading-[1.9]" style={{ color: "#1f2937" }}>
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
                      ? "text-[13px] font-bold"
                      : "text-[15px] leading-[1.9]"
                  }
                  style={{ color: isHeading ? "#4b5563" : "#1f2937" }}
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
