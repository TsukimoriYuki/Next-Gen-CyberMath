"use client";

import { useState } from "react";
import Link from "next/link";
import { BookMarked, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import type { JapaneseProblem } from "@/data/japanese";

const DIFFICULTY = {
  basic: "基礎",
  standard: "標準",
  "common-test-ready": "共通テスト準備",
} as const;

export function JapaneseProblemRunner({
  problem,
  areaLabel,
  relatedCourses,
}: {
  problem: JapaneseProblem;
  areaLabel: string;
  relatedCourses: readonly Readonly<{ id: string; title: string; href: string }>[];
}) {
  const [selected, setSelected] = useState("");
  const [answered, setAnswered] = useState(false);
  const [reviewState, setReviewState] = useState<"idle" | "saving" | "saved" | "login">("idle");
  const correct = answered && selected === problem.correctAnswer;

  async function addToReview() {
    setReviewState("saving");
    const response = await fetch("/api/review/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemType: "japanese-problem",
        itemId: problem.id,
        subjectId: "japanese",
        title: problem.title,
        source: "japanese-practice",
        reasonFlags: [correct ? "guessed-correct" : "wrong"],
        skillTags: problem.reviewTags,
      }),
    });
    setReviewState(response.status === 401 ? "login" : response.ok ? "saved" : "idle");
  }

  return (
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "国語", href: "/japanese" },
          { label: "問題一覧", href: "/japanese/problems" },
          { label: problem.title },
        ]}
      />
      <LearningPageHeader
        eyebrow={areaLabel}
        title={problem.title}
        description={problem.prompt}
        meta={[
          { label: "難易度", value: DIFFICULTY[problem.difficulty] },
          { label: "想定時間", value: `約${problem.estimatedTime}秒` },
          { label: "出典区分", value: problem.copyrightStatus },
        ]}
      />

      <article className="mt-8 space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="original-text">
          <h2 id="original-text" className="text-sm font-bold text-slate-700">
            {problem.passageType === "kanbun" ? "原文" : problem.passageType === "classical" ? "古文原文" : "本文"}
          </h2>
          <p className="mt-3 whitespace-pre-wrap text-base leading-8 text-slate-950">{problem.passage}</p>
          {problem.annotations?.length ? (
            <ul className="mt-4 space-y-1 border-t border-slate-100 pt-3 text-sm text-slate-600">
              {problem.annotations.map((annotation) => <li key={annotation}>注：{annotation}</li>)}
            </ul>
          ) : null}
        </section>

        {problem.writtenReading ? (
          <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5" aria-labelledby="written-reading">
            <h2 id="written-reading" className="text-sm font-bold text-cyan-950">書き下し文</h2>
            <p className="mt-2 whitespace-pre-wrap leading-8 text-slate-900">{problem.writtenReading}</p>
          </section>
        ) : null}

        {problem.people?.length ? (
          <section className="rounded-2xl border border-violet-200 bg-violet-50 p-5" aria-labelledby="people-list">
            <h2 id="people-list" className="text-sm font-bold text-violet-950">人物一覧</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {problem.people.map((person) => <li key={person}>{person}</li>)}
            </ul>
          </section>
        ) : null}

        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <legend className="px-1 text-lg font-bold text-slate-950">選択肢</legend>
          <div className="mt-3 space-y-3">
            {problem.choices.map((choice) => (
              <label key={choice.id} className="flex min-h-12 cursor-pointer gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
                <input
                  type="radio"
                  name="answer"
                  value={choice.id}
                  checked={selected === choice.id}
                  onChange={() => setSelected(choice.id)}
                  disabled={answered}
                  className="mt-1"
                />
                <span className="leading-6"><strong>{choice.id}.</strong> {choice.text}</span>
              </label>
            ))}
          </div>
          {!answered ? (
            <button
              type="button"
              disabled={!selected}
              onClick={() => setAnswered(true)}
              className="mt-5 min-h-11 rounded-xl bg-blue-700 px-5 py-2.5 font-bold text-white disabled:opacity-50"
            >
              解答を確認する
            </button>
          ) : null}
        </fieldset>

        <div aria-live="polite">
          {answered ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="answer-explanation">
              <div className="flex items-center gap-2">
                {correct ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <XCircle className="h-5 w-5 text-rose-700" />}
                <h2 id="answer-explanation" className="text-xl font-bold text-slate-950">
                  {correct ? "正解" : `正解は ${problem.correctAnswer}`}
                </h2>
              </div>
              <h3 className="mt-5 font-bold text-slate-900">本文根拠</h3>
              <p className="mt-2 leading-7 text-slate-700">{problem.evidence}</p>
              <h3 className="mt-5 font-bold text-slate-900">詳しい解説</h3>
              <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{problem.explanation}</p>
              {problem.modernTranslation ? (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <h3 className="font-bold text-amber-950">独自現代語訳</h3>
                  <p className="mt-2 leading-7 text-slate-800">{problem.modernTranslation}</p>
                </div>
              ) : null}
              <h3 className="mt-5 font-bold text-slate-900">選択肢の確認</h3>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
                {problem.choices.map((choice) => (
                  <li key={choice.id}>
                    <strong>{choice.id}.</strong>{" "}
                    {choice.id === problem.correctAnswer ? "本文根拠と一致する。" : problem.distractorReasons[choice.id]}
                  </li>
                ))}
              </ul>
              {relatedCourses.length > 0 ? (
                <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <h3 className="font-bold text-blue-950">対応講座へ戻る</h3>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {relatedCourses.map((course) => <Link key={course.id} href={course.href} className="inline-flex min-h-11 items-center font-bold text-blue-700 underline">{course.title}</Link>)}
                  </div>
                </div>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={addToReview}
                  disabled={reviewState === "saving" || reviewState === "saved"}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-violet-300 bg-violet-50 px-4 py-2 font-bold text-violet-900 disabled:opacity-60"
                >
                  <BookMarked className="h-4 w-4" aria-hidden="true" />
                  {reviewState === "saved" ? "復習に登録済み" : reviewState === "saving" ? "登録中" : "復習に登録"}
                </button>
                <button
                  type="button"
                  onClick={() => { setSelected(""); setAnswered(false); }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-bold text-slate-800"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" /> もう一度解く
                </button>
              </div>
              {reviewState === "login" ? (
                <p className="mt-3 text-sm text-slate-700">
                  復習登録には<Link href="/auth/login" className="font-bold text-blue-700 underline">ログイン</Link>が必要です。
                </p>
              ) : null}
            </section>
          ) : null}
        </div>
      </article>
    </LearningPageShell>
  );
}
