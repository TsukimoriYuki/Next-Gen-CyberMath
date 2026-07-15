// 講座ブロックレンダラー — Phase 20.1.5
// LessonBlock の kind に応じて適切なUIを描画する。
// title も CourseBodyRenderer に通し、$...$ がそのまま表示される問題を避ける。

import type { LessonBlock } from "@/types/course";
import { LESSON_BLOCK_META } from "@/types/course";
import { CourseBodyRenderer } from "./CourseBodyRenderer";
import { CourseDiagramBlock } from "./CourseDiagramBlock";
import { CourseFormulaRenderer } from "./CourseFormulaRenderer";
import { CourseStepBlock } from "./CourseStepBlock";
import { CourseComparisonTable } from "./CourseComparisonTable";

function BlockTitle({ title, className }: { title: string; className?: string }) {
  return (
    <CourseBodyRenderer
      body={title}
      className={className ?? "text-xs font-bold text-slate-800"}
    />
  );
}

export function CourseLessonBlockRenderer({ block }: { block: LessonBlock }) {
  const meta = LESSON_BLOCK_META[block.kind];

  // ── 図解ブロック ──────────────────────────────────────────────────────────
  if (block.kind === "diagram") {
    if (!block.diagramType) return null;
    return (
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-800">
            {meta.label}
          </span>
          <BlockTitle title={block.title} />
        </div>
        {block.body.trim() && (
          <CourseBodyRenderer body={block.body} className="mb-2 text-xs leading-relaxed text-slate-600" />
        )}
        <CourseDiagramBlock diagramType={block.diagramType} caption={block.caption} />
      </div>
    );
  }

  // ── 手順ブロック ──────────────────────────────────────────────────────────
  if (block.kind === "stepByStep") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
            {meta.label}
          </span>
          <BlockTitle title={block.title} />
        </div>
        {block.body.trim() && (
          <CourseBodyRenderer body={block.body} className="mb-3 text-xs leading-relaxed text-slate-600" />
        )}
        {block.steps && <CourseStepBlock steps={block.steps} />}
      </div>
    );
  }

  // ── 比較表ブロック ────────────────────────────────────────────────────────
  if (block.kind === "comparisonTable") {
    return (
      <div className="rounded-xl border border-violet-200 bg-violet-50/40 p-3">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-800">
            {meta.label}
          </span>
          <BlockTitle title={block.title} />
        </div>
        {block.body.trim() && (
          <CourseBodyRenderer body={block.body} className="mb-2 text-xs leading-relaxed text-slate-600" />
        )}
        {block.columns && block.rows && (
          <CourseComparisonTable columns={block.columns} rows={block.rows} />
        )}
      </div>
    );
  }

  // ── デフォルト（intro / concept / formula / workedExample / commonMistake /
  //                checkpoint / practice / summary / nextStep） ────────────
  return (
    <div
      className="rounded-xl border p-3"
      style={{ borderColor: `${meta.color}33`, background: meta.bg }}
    >
      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
          {meta.label}
        </span>
        <BlockTitle title={block.title} />
      </div>

      {/* 強調公式（formula ブロックの formula フィールド） */}
      {block.formula && (
        <CourseFormulaRenderer formula={block.formula} />
      )}

      {/* コールアウト（emphasis フィールド） */}
      {block.emphasis && (
        <div className="mb-2 rounded-lg border-l-2 border-blue-400 bg-blue-50 px-3 py-1.5">
          <CourseBodyRenderer
            body={block.emphasis}
            className="text-xs font-semibold text-blue-800"
          />
        </div>
      )}

      {/* 本文 */}
      {block.body.trim() && (
        <CourseBodyRenderer body={block.body} />
      )}
    </div>
  );
}
