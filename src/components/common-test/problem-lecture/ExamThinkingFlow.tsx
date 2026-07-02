import { ListOrdered } from "lucide-react";
import { MathText } from "@/components/math/Math";

/** 「本番での思考順」：時系列の番号付きステップ。 */
export function ExamThinkingFlow({ steps }: { steps: string[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <ListOrdered className="h-4 w-4 text-violet-600" />
        <h2 className="text-sm font-extrabold text-slate-950">本番での思考順</h2>
      </div>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-extrabold text-violet-700">
              {index + 1}
            </span>
            <MathText>{step}</MathText>
          </li>
        ))}
      </ol>
    </section>
  );
}
