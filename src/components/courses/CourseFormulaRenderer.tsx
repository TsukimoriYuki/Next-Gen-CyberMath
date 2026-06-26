import katex from "katex";

function normalizeFormula(formula: string): string {
  const trimmed = formula.trim().replace(/\f/g, "\\f");

  if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
    return trimmed.slice(2, -2).trim();
  }

  if (trimmed.startsWith("$") && trimmed.endsWith("$")) {
    return trimmed.slice(1, -1).trim();
  }

  if (trimmed.startsWith("\\[") && trimmed.endsWith("\\]")) {
    return trimmed.slice(2, -2).trim();
  }

  if (trimmed.startsWith("\\(") && trimmed.endsWith("\\)")) {
    return trimmed.slice(2, -2).trim();
  }

  return trimmed;
}

function renderFormula(formula: string): string {
  return katex.renderToString(normalizeFormula(formula), {
    displayMode: true,
    throwOnError: false,
    strict: false,
    output: "html",
  });
}

export function CourseFormulaRenderer({ formula }: { formula: string }) {
  const normalizedFormula = normalizeFormula(formula);

  if (!normalizedFormula) return null;

  return (
    <div className="mb-2 overflow-x-auto overscroll-x-contain rounded-lg border border-cyan-200 bg-white px-3 py-2 shadow-sm">
      <div
        className="w-max min-w-full text-center text-base font-semibold text-slate-950 [&_.katex-display]:my-0 [&_.katex]:text-[1.05em]"
        dangerouslySetInnerHTML={{ __html: renderFormula(normalizedFormula) }}
      />
    </div>
  );
}
