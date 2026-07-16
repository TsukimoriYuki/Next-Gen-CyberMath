"use client";

import Link from "next/link";
import { useState } from "react";
import { BookMarked, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import {
  READING_GENRE_LABEL,
  type JapaneseReadingMaterial,
  type JapaneseReadingPassage,
} from "@/data/japanese/reading";

const DIFFICULTY = {
  basic: "基礎",
  standard: "標準",
  "common-test-ready": "共通テスト準備",
} as const;

function Material({ material }: { material: JapaneseReadingMaterial }) {
  return (
    <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4" aria-labelledby={`${material.id}-title`}>
      <h3 id={`${material.id}-title`} className="font-bold text-cyan-950">資料 {material.id}　{material.title}</h3>
      {material.body ? <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-800">{material.body}</p> : null}
      {material.items ? <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-800">{material.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
      {material.headers && material.rows ? (
        <div className="mt-3 max-w-full overflow-x-auto">
          <table className="min-w-full border-collapse bg-white text-left text-sm">
            <thead><tr>{material.headers.map((header) => <th key={header} className="border border-slate-300 px-3 py-2 font-bold">{header}</th>)}</tr></thead>
            <tbody>{material.rows.map((row, rowIndex) => <tr key={`${material.id}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${material.id}-${rowIndex}-${cellIndex}`} className="border border-slate-300 px-3 py-2">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      ) : null}
      {material.bars ? <div className="mt-4 space-y-3">{material.bars.map((bar) => <div key={bar.label}><div className="flex justify-between gap-3 text-sm"><span>{bar.label}</span><strong>{bar.value}{bar.unit}</strong></div><div className="mt-1 h-3 overflow-hidden rounded-full bg-white" aria-hidden="true"><div className="h-full rounded-full bg-cyan-700" style={{ width: `${Math.min(100, bar.value)}%` }} /></div></div>)}</div> : null}
    </section>
  );
}

export function JapaneseReadingRunner({ passage, nextPassage }: { passage: JapaneseReadingPassage; nextPassage?: Pick<JapaneseReadingPassage, "slug" | "title"> }) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [answered, setAnswered] = useState<Record<string, boolean>>({});
  const [reviewState, setReviewState] = useState<Record<string, "idle" | "saving" | "saved" | "login">>({});
  const characterCount = passage.paragraphs.reduce((sum, paragraph) => sum + paragraph.text.length, 0);

  function toggle(questionId: string, choiceId: string, multiple: boolean) {
    if (answered[questionId]) return;
    setSelected((current) => ({
      ...current,
      [questionId]: multiple
        ? current[questionId]?.includes(choiceId)
          ? current[questionId].filter((id) => id !== choiceId)
          : [...(current[questionId] ?? []), choiceId]
        : [choiceId],
    }));
  }

  async function addToReview(questionId: string, title: string, tags: readonly string[], correct: boolean) {
    setReviewState((state) => ({ ...state, [questionId]: "saving" }));
    const response = await fetch("/api/review/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemType: "japanese-problem", itemId: questionId, subjectId: "japanese", title, source: "japanese-reading", reasonFlags: [correct ? "guessed-correct" : "wrong"], skillTags: tags }),
    });
    setReviewState((state) => ({ ...state, [questionId]: response.status === 401 ? "login" : response.ok ? "saved" : "idle" }));
  }

  return (
    <LearningPageShell width="split">
      <LearningBreadcrumbs items={[{ label: "国語", href: "/japanese" }, { label: "現代文読解", href: "/japanese/reading" }, { label: passage.title }]} />
      <LearningPageHeader eyebrow={READING_GENRE_LABEL[passage.genre]} title={passage.title} description={passage.theme} meta={[{ label: "想定時間", value: `約${passage.estimatedReadingTime}分` }, { label: "文字数", value: `${characterCount}字` }, { label: "出典", value: "Cyber Math 完全オリジナル" }]} />

      <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
        <article className="min-w-0 space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="passage-heading">
          <h2 id="passage-heading" className="text-xl font-bold text-slate-950">本文</h2>
          {passage.paragraphs.map((paragraph) => <p key={paragraph.id} id={`paragraph-${paragraph.id}`} className="text-base leading-8 text-slate-900"><span className="mr-2 inline-flex min-w-8 justify-center rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-600" aria-label={`段落 ${paragraph.id}`}>[{paragraph.id}]</span>{paragraph.text}</p>)}
          {passage.materials?.map((material) => <Material key={material.id} material={material} />)}
        </article>

        <div className="min-w-0 space-y-6 lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto lg:pr-1">
          {passage.questions.map((question, index) => {
            const answers = selected[question.id] ?? [];
            const isAnswered = Boolean(answered[question.id]);
            const correct = isAnswered && answers.length === question.correctAnswers.length && answers.every((answer) => question.correctAnswers.includes(answer));
            const multiple = question.answerMode === "multiple";
            return (
              <section key={question.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby={`${question.id}-heading`}>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600"><span>問{index + 1}</span><span>・</span><span>{DIFFICULTY[question.difficulty]}</span><span>・</span><span>約{question.estimatedTime}秒</span></div>
                <h2 id={`${question.id}-heading`} className="mt-2 font-bold leading-7 text-slate-950">{question.prompt}</h2>
                {multiple ? <p className="mt-2 text-xs text-slate-600">当てはまるものをすべて選んでください。</p> : null}
                <fieldset className="mt-4 space-y-3"><legend className="sr-only">問{index + 1}の選択肢</legend>{question.choices.map((choice) => <label key={choice.id} className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50"><input type={multiple ? "checkbox" : "radio"} name={question.id} value={choice.id} checked={answers.includes(choice.id)} onChange={() => toggle(question.id, choice.id, multiple)} disabled={isAnswered} className="mt-1" /><span className="leading-6"><strong>{choice.id}.</strong> {choice.text}</span></label>)}</fieldset>
                {!isAnswered ? <button type="button" disabled={answers.length === 0} onClick={() => setAnswered((state) => ({ ...state, [question.id]: true }))} className="mt-5 min-h-11 rounded-xl bg-blue-700 px-5 py-2.5 font-bold text-white disabled:opacity-50">答えを確認する</button> : (
                  <div className="mt-5 border-t border-slate-200 pt-5" aria-live="polite">
                    <div className="flex items-center gap-2">{correct ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <XCircle className="h-5 w-5 text-rose-700" />}<h3 className="font-bold text-slate-950">{correct ? "正解" : `正解は ${question.correctAnswers.join("・")}`}</h3></div>
                    <h4 className="mt-4 font-bold text-slate-900">本文根拠（段落 {question.evidenceParagraphIds.join("・")}）</h4><p className="mt-1 leading-7 text-slate-700">{question.evidenceText}</p>
                    <h4 className="mt-4 font-bold text-slate-900">解き方</h4><p className="mt-1 leading-7 text-slate-700">最初に見る場所：{question.firstLook}</p><p className="mt-1 leading-7 text-slate-700">比較方法：{question.comparisonMethod}</p><p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">{question.explanation}</p>
                    <h4 className="mt-4 font-bold text-slate-900">全選択肢の確認</h4><ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">{question.choices.map((choice) => <li key={choice.id}><strong>{choice.id}.</strong> {question.correctAnswers.includes(choice.id) ? "本文根拠と一致する。" : question.distractorReasons[choice.id]}</li>)}</ul>
                    <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => addToReview(question.id, `${passage.title} 問${index + 1}`, question.reviewTags, correct)} disabled={reviewState[question.id] === "saving" || reviewState[question.id] === "saved"} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-violet-300 bg-violet-50 px-4 py-2 font-bold text-violet-900 disabled:opacity-60"><BookMarked className="h-4 w-4" aria-hidden="true" />{reviewState[question.id] === "saved" ? "復習に登録済み" : reviewState[question.id] === "saving" ? "登録中" : "復習に登録"}</button><button type="button" onClick={() => { setSelected((state) => ({ ...state, [question.id]: [] })); setAnswered((state) => ({ ...state, [question.id]: false })); }} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-bold text-slate-800"><RotateCcw className="h-4 w-4" aria-hidden="true" />もう一度解く</button></div>
                    {reviewState[question.id] === "login" ? <p className="mt-3 text-sm text-slate-700">復習登録には<Link href="/auth/login" className="font-bold text-blue-700 underline">ログイン</Link>が必要です。</p> : null}
                  </div>
                )}
              </section>
            );
          })}
          {nextPassage ? <Link href={`/japanese/reading/${nextPassage.slug}`} className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 font-bold text-white">次の文章：{nextPassage.title}</Link> : null}
        </div>
      </div>
    </LearningPageShell>
  );
}
