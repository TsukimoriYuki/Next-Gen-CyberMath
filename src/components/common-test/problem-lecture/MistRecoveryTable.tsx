import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { MathText } from "@/components/math/Math";
import type { ProblemMistake } from "@/types/common-test-problem-lecture";

/** 「よくあるミス」回収表：ミス→原因→戻るべき講座。 */
export function MistRecoveryTable({ items }: { items: ProblemMistake[] }) {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-700" />
        <h2 className="text-sm font-extrabold text-slate-950">よくあるミス</h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.mistake}
            className="rounded-xl border border-amber-200 bg-white p-3.5 sm:p-4"
          >
            <div className="text-sm font-bold text-slate-900">
              <MathText>{item.mistake}</MathText>
            </div>
            <div className="mt-1 text-xs leading-6 text-slate-600">
              原因: <MathText>{item.cause}</MathText>
            </div>
            <Link
              href={item.returnTo.href}
              className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
            >
              戻る: {item.returnTo.label}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
