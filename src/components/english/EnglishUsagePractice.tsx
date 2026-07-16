"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { BookMarked, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { EnglishUsageProblem } from "@/data/english-usage";

export function EnglishUsagePractice({ problem }: { problem: EnglishUsageProblem }) {
  const groupId = useId();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [reviewState, setReviewState] = useState<"idle" | "saving" | "saved" | "login">("idle");
  const isMulti = problem.questionType === "multiple-select";
  const correctSet = new Set(problem.correctChoiceIds);
  const isCorrect = submitted && selected.length === correctSet.size && selected.every((id) => correctSet.has(id));

  function select(choiceId: string) {
    if (submitted) return;
    setSelected((current) => isMulti
      ? current.includes(choiceId) ? current.filter((id) => id !== choiceId) : [...current, choiceId]
      : [choiceId]);
  }

  function reset() {
    setSelected([]);
    setSubmitted(false);
    setReviewState("idle");
  }

  async function addToReview() {
    setReviewState("saving");
    const response = await fetch("/api/review/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemType: "english-problem",
        itemId: problem.id,
        subjectId: "english",
        sectionId: problem.area,
        title: problem.title,
        source: "english-usage-practice",
        reasonFlags: [isCorrect ? "guessed-correct" : "wrong"],
        skillTags: problem.reviewTags,
      }),
    });
    setReviewState(response.status === 401 ? "login" : response.ok ? "saved" : "idle");
  }

  return (
    <div>
      <fieldset disabled={submitted}>
        <legend className="text-sm font-bold text-slate-700">
          {isMulti ? "正しいものを2つ選択してください（部分点なし）。" : "最も適切なものを1つ選んでください。"}
        </legend>
        <div className="mt-4 space-y-3">
          {problem.choices.map((choice) => {
            const checked = selected.includes(choice.id);
            const correct = submitted && correctSet.has(choice.id);
            const wrongPick = submitted && checked && !correctSet.has(choice.id);
            return (
              <label key={choice.id} className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-6 transition-colors ${correct ? "border-emerald-300 bg-emerald-50" : wrongPick ? "border-rose-300 bg-rose-50" : checked ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-300"}`}>
                <input type={isMulti ? "checkbox" : "radio"} name={groupId} checked={checked} onChange={() => select(choice.id)} className="mt-1 h-4 w-4 shrink-0 accent-blue-700" />
                <span className="min-w-0 break-words">
                  <span className="font-semibold text-slate-950">{choice.id}. {choice.text}</span>
                  {submitted && <span className="mt-2 block text-slate-700"><strong className={correctSet.has(choice.id) ? "text-emerald-800" : "text-rose-800"}>{correctSet.has(choice.id) ? "正答" : "誤答"}：</strong>{choice.reason.replace(/^(正答|誤答)：/, "")}</span>}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5 flex flex-wrap gap-3">
        {!submitted ? (
          <button type="button" onClick={() => setSubmitted(true)} disabled={selected.length === 0} className="button-primary">答え合わせ</button>
        ) : (
          <button type="button" onClick={reset} className="button-secondary"><RotateCcw className="mr-2 inline h-4 w-4" aria-hidden="true" />もう一度解く</button>
        )}
      </div>

      <div aria-live="polite">
        {submitted && <div className={`mt-5 flex gap-3 rounded-xl border p-4 ${isCorrect ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-rose-200 bg-rose-50 text-rose-950"}`}>
          {isCorrect ? <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" /> : <XCircle className="h-5 w-5 shrink-0" aria-hidden="true" />}
          <div><p className="font-bold">{isCorrect ? "正解です" : "不正解です"}</p>{isMulti && <p className="mt-1 text-sm">正答：{problem.correctChoiceIds.join("・")}</p>}</div>
        </div>}
      </div>

      {submitted && (
        <section aria-label="解説" className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">正答英文</h2>
          <p className="mt-2 break-words text-base leading-8 text-slate-900">{problem.completedSentence}</p>
          <h3 className="mt-5 font-bold text-slate-900">自然な日本語訳</h3>
          <p className="mt-2 leading-7 text-slate-700">{problem.translationJa}</p>
          <h3 className="mt-5 font-bold text-slate-900">詳しい解説</h3>
          <p className="mt-2 whitespace-pre-line leading-7 text-slate-700">{problem.detailedExplanation}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-blue-50 p-4"><h3 className="font-bold text-blue-950">解く戦略</h3><p className="mt-1 text-sm leading-6 text-slate-700">{problem.strategy}</p></div>
            <div className="rounded-xl bg-emerald-50 p-4"><h3 className="font-bold text-emerald-950">検算</h3><p className="mt-1 text-sm leading-6 text-slate-700">{problem.verification}</p></div>
            <div className="rounded-xl bg-rose-50 p-4 sm:col-span-2"><h3 className="font-bold text-rose-950">よくある誤り</h3><p className="mt-1 text-sm leading-6 text-slate-700">{problem.commonMistake}</p></div>
          </div>
          <div className="mt-5 border-t border-slate-200 pt-4">
            <button type="button" onClick={addToReview} disabled={reviewState === "saving" || reviewState === "saved"} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-violet-300 bg-violet-50 px-4 py-2 font-bold text-violet-900 disabled:opacity-60">
              <BookMarked className="h-4 w-4" aria-hidden="true" />
              {reviewState === "saved" ? "復習に登録済み" : reviewState === "saving" ? "登録中" : "復習に登録"}
            </button>
            {reviewState === "login" && <p className="mt-3 text-sm text-slate-700">復習登録には<Link href="/auth/login" className="font-bold text-blue-700 underline">ログイン</Link>が必要です。</p>}
          </div>
        </section>
      )}
    </div>
  );
}
