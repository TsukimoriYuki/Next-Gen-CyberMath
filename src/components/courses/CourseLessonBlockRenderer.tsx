// 講座ブロックレンダラー — Phase 20.0
// LessonBlock の kind に応じて適切なUIを描画する。
// diagram / stepByStep / comparisonTable は専用コンポーネント、それ以外はデフォルトカード。

import type { LessonBlock } from "@/types/course";
import { LESSON_BLOCK_META } from "@/types/course";
import { CourseBodyRenderer } from "./CourseBodyRenderer";
import { CourseDiagramBlock } from "./CourseDiagramBlock";
import { CourseStepBlock } from "./CourseStepBlock";
import { CourseComparisonTable } from "./CourseComparisonTable";

export function CourseLessonBlockRenderer({ block }: { block: LessonBlock }) {
  const meta = LESSON_BLOCK_META[block.kind];

  // ── 図解ブロック ──────────────────────────────────────────────────────────
  if (block.kind === "diagram") {
    if (!block.diagramType) return null;
    return (
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">
            {meta.label}
          </span>
          <span className="text-xs font-bold text-slate-800">{block.title}</span>
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
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            {meta.label}
          </span>
          <span className="text-xs font-bold text-slate-800">{block.title}</span>
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
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">
            {meta.label}
          </span>
          <span className="text-xs font-bold text-slate-800">{block.title}</span>
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
      <div className="mb-1.5 flex items-center gap-2">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{ background: `${meta.color}1a`, color: meta.color }}
        >
          {meta.label}
        </span>
        <span className="text-xs font-bold text-slate-800">{block.title}</span>
      </div>

      {/* 強調公式（formula ブロックの formula フィールド） */}
      {block.formula && (
        <div className="mb-2 rounded-lg border border-cyan-200 bg-white px-3 py-2">
          <CourseBodyRenderer
            body={block.formula}
            className="text-center text-sm font-semibold text-slate-900"
          />
        </div>
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
