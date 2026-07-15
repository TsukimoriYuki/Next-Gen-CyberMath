// 手順分解カード — Phase 20.0
// stepByStep ブロック用。ステップ番号・ラベル・本文をカード形式で表示する。

import type { StepItem } from "@/types/course";
import { CourseBodyRenderer } from "./CourseBodyRenderer";

export function CourseStepBlock({ steps }: { steps: StepItem[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-2">
      {steps.map((s) => (
        <div
          key={s.step}
          className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3"
        >
          {/* ステップ番号バッジ */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-extrabold text-white">
            {s.step}
          </div>
          <div className="min-w-0 flex-1">
            {/* ラベル */}
            <div className="mb-1 text-xs font-bold text-emerald-900">{s.label}</div>
            {/* 本文 */}
            {s.body.trim() && (
              <CourseBodyRenderer
                body={s.body}
                className="text-sm leading-relaxed text-slate-700"
              />
            )}
            {/* 注記 */}
            {s.annotation && (
              <div className="mt-1 rounded border border-emerald-100 bg-white px-2 py-1">
                <CourseBodyRenderer
                  body={s.annotation}
                  className="text-xs italic leading-5 text-slate-600"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
