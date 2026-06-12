"use client";

import { useId, useMemo, type FormEvent } from "react";
import type {
  CommonTestAnswerFormat,
  CommonTestDigitSlot,
  CommonTestDrillQuestion,
} from "@/data/common-test-drills";
import { normalizeCommonTestAnswer } from "@/lib/common-test-answer-normalize";

interface Props {
  question: Pick<
    CommonTestDrillQuestion,
    "answerFormat" | "digitSlots" | "markLabels" | "marksheetLabel"
  >;
  value: string;
  onChange: (answer: string) => void;
  onSubmit?: (answer: string) => void;
  disabled?: boolean;
  submitLabel?: string;
  helperText?: string;
}

const FALLBACK_MARK_LABELS = ["ア", "イ", "ウ", "エ", "オ", "カ"];

function getAnswerFormat(question: Props["question"]): CommonTestAnswerFormat {
  return question.answerFormat ?? "number";
}

function getDigitSlots(question: Props["question"]): CommonTestDigitSlot[] {
  if (question.digitSlots?.length) return question.digitSlots;
  if (question.markLabels?.length) {
    return question.markLabels.map((label) => ({ label, length: 1 }));
  }
  if (question.marksheetLabel) {
    return [{ label: question.marksheetLabel, length: 1 }];
  }
  return [{ label: FALLBACK_MARK_LABELS[0], length: 1 }];
}

function sanitizeSlotValue(raw: string, slot: CommonTestDigitSlot): string {
  const normalized = normalizeCommonTestAnswer(raw);
  let allowed = normalized.replace(
    slot.allowNegative ? /[^0-9.-]/g : /[^0-9.]/g,
    "",
  );

  if (!slot.allowDecimal) {
    allowed = allowed.replace(/\./g, "");
  }

  if (!slot.allowNegative) {
    return allowed.replace(/-/g, "").slice(0, slot.length);
  }

  const withoutExtraMinus = allowed.replace(/(?!^)-/g, "");
  return withoutExtraMinus.slice(0, Math.max(slot.length, 1) + 1);
}

function splitDigits(value: string, slots: CommonTestDigitSlot[]): string[] {
  let cursor = 0;
  const normalized = normalizeCommonTestAnswer(value);
  return slots.map((slot) => {
    const part = normalized.slice(cursor, cursor + slot.length);
    cursor += slot.length;
    return part;
  });
}

function mergeDigits(parts: string[]): string {
  return parts.join("");
}

export function MarkSheetAnswerInput({
  question,
  value,
  onChange,
  onSubmit,
  disabled = false,
  submitLabel = "解答する",
  helperText,
}: Props) {
  const id = useId();
  const answerFormat = getAnswerFormat(question);
  const slots = useMemo(() => getDigitSlots(question), [question]);
  const digitValues = useMemo(() => splitDigits(value, slots), [value, slots]);
  const isDigits = answerFormat === "digits";
  const inputMode = answerFormat === "number" ? "decimal" : "text";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!onSubmit) return;
    const normalized = normalizeCommonTestAnswer(value);
    if (!normalized) return;
    onSubmit(normalized);
  }

  function updateDigit(index: number, nextValue: string) {
    const slot = slots[index];
    if (!slot) return;
    const next = [...digitValues];
    next[index] = sanitizeSlotValue(nextValue, slot);
    onChange(mergeDigits(next));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-300 bg-white p-4 text-slate-950 shadow-sm sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs font-extrabold text-slate-900">マークシート式解答</div>
          <div className="mt-1 text-xs text-slate-500">
            解答欄に合わせて入力してください。
          </div>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
          {answerFormat === "digits"
            ? "桁別入力"
            : answerFormat === "text"
              ? "短答入力"
              : "数値入力"}
        </div>
      </div>

      {helperText && (
        <p className="mb-4 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs leading-6 text-blue-900">
          {helperText}
        </p>
      )}

      {isDigits ? (
        <div className="flex flex-wrap gap-3">
          {slots.map((slot, index) => (
            <label key={`${slot.label}-${index}`} className="block">
              <span className="mb-1.5 block text-center text-xs font-bold text-slate-700">
                [{slot.label}]
              </span>
              <input
                type="text"
                inputMode={slot.allowDecimal ? "decimal" : "numeric"}
                value={digitValues[index] ?? ""}
                maxLength={slot.allowNegative ? slot.length + 1 : slot.length}
                disabled={disabled}
                onChange={(e) => updateDigit(index, e.target.value)}
                className="h-12 w-20 rounded-xl border-2 border-slate-300 bg-white px-2 text-center font-mono text-xl font-bold text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-500"
                aria-label={`${slot.label}の解答欄`}
              />
            </label>
          ))}
        </div>
      ) : (
        <label htmlFor={id} className="block">
          <span className="mb-1.5 block text-xs font-bold text-slate-700">
            解答
          </span>
          <input
            id={id}
            type="text"
            inputMode={inputMode}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            placeholder={answerFormat === "text" ? "短い答え" : "数値"}
            autoComplete="off"
            className="h-12 w-full max-w-sm rounded-xl border-2 border-slate-300 bg-white px-4 font-mono text-xl font-bold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-500"
          />
        </label>
      )}

      {onSubmit && (
        <button
          type="submit"
          disabled={disabled || !normalizeCommonTestAnswer(value)}
          className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 sm:w-auto"
        >
          {submitLabel}
        </button>
      )}
    </form>
  );
}
