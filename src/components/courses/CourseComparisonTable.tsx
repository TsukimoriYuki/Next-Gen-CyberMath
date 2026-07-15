// 比較表コンポーネント — Phase 20.0
// comparisonTable ブロック用。列ヘッダーと行データを Academic Cyber UI で表示する。
// セルに $...$ を含む場合は CourseBodyRenderer でレンダリングする。

import type { TableRow } from "@/types/course";
import { CourseBodyRenderer } from "./CourseBodyRenderer";

export function CourseComparisonTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: TableRow[];
}) {
  if (!columns || !rows || rows.length === 0) return null;

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="比較表（横にスクロールできます）"
      className="overflow-x-auto rounded-xl border border-violet-200 bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <table className="w-full min-w-max text-sm">
        <thead>
          <tr className="bg-violet-50">
            {columns.map((col, ci) => (
              <th
                key={ci}
                className="border-b border-violet-200 px-3 py-2 text-left text-xs font-bold text-violet-800"
              >
                <CourseBodyRenderer body={col} className="text-xs text-violet-800" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={
                row.highlight
                  ? "bg-violet-50/60"
                  : ri % 2 === 0
                  ? "bg-white"
                  : "bg-slate-50/50"
              }
            >
              {row.cells.map((cell, ci) => (
                <td
                  key={ci}
                  className={`border-b border-slate-100 px-3 py-2 ${
                    ci === 0 ? "font-semibold text-slate-700" : "text-slate-600"
                  } ${row.highlight ? "text-violet-700" : ""}`}
                >
                  <CourseBodyRenderer body={cell} className="text-sm leading-relaxed" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
