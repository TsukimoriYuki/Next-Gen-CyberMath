import { Eye } from "lucide-react";
import { MathText } from "@/components/math/Math";
import type { ProblemInsight } from "@/types/common-test-problem-lecture";

/** 「見るべきポイント」：問題文の表現 → 反応すべきこと、を一覧化する。 */
export function ProblemInsightList({ items }: { items: ProblemInsight[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <Eye className="h-4 w-4 text-blue-600" />
        <h2 className="text-sm font-extrabold text-slate-950">見るべきポイント</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-bold text-slate-500">
              <th className="w-2/5 py-2 pr-3">問題文の表現</th>
              <th className="py-2">反応すべきこと</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.expression} className="border-b border-slate-100 last:border-0">
                <td className="py-2.5 pr-3 align-top font-bold text-slate-900">
                  <MathText>{item.expression}</MathText>
                </td>
                <td className="py-2.5 align-top text-slate-700">
                  <MathText>{item.reaction}</MathText>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
