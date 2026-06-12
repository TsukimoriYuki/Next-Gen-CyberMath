import type { CommonTestTheme } from "@/data/common-test";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";

interface Props {
  question: CommonTestDrillQuestion;
  theme: CommonTestTheme;
  children: React.ReactNode;
}

export function EnglishReadingSplitView({ question, children }: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
      <div className="w-full lg:sticky lg:top-6 lg:w-[55%]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          {question.context && (
            <>
              <div className="mb-2 text-xs font-extrabold text-slate-500">資料</div>
              <div className="mb-5 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-6 whitespace-pre text-slate-700">
                {question.context}
              </div>
            </>
          )}

          {question.passage && (
            <>
              <div className="mb-2 text-xs font-extrabold text-slate-500">本文</div>
              <PassageText text={question.passage} />
            </>
          )}
        </article>
      </div>

      <div className="w-full space-y-4 lg:flex-1">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-2 text-xs font-extrabold text-slate-500">設問</div>
          <p className="text-[15px] leading-8 text-slate-950">{question.statement}</p>
        </article>
        {children}
      </div>
    </div>
  );
}

function PassageText({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => {
        const lines = paragraph.split("\n");
        if (lines.length === 1) {
          return (
            <p key={i} className="text-[15px] leading-8 text-slate-800">
              {paragraph}
            </p>
          );
        }

        return (
          <div key={i} className="space-y-1.5">
            {lines.map((line, j) => {
              const trimmed = line.trim();
              const isHeading = /^[A-Z].*:$/.test(trimmed) || trimmed.startsWith("[");
              return (
                <p
                  key={j}
                  className={
                    isHeading
                      ? "text-sm font-extrabold text-slate-700"
                      : "text-[15px] leading-8 text-slate-800"
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
