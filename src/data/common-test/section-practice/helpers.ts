import type { CommonTestQuestion, ExamBlank, ExamChoice } from "@/data/common-test-mock-exams";

// 大問型演習（section-practice）用の共通ヘルパー。
// 冊子型模試（src/data/common-test/manual-mocks/）と同じ形の関数を、
// PDFを持たない単独演習向けに揃えている。

export function blank(label: string, correctAnswer: string, width = Math.max(3, label.length + 2)): ExamBlank {
  const isInteger = /^-?\d+$/.test(correctAnswer);
  return {
    id: label,
    label,
    type: isInteger ? "integer" : "expression",
    correctAnswer,
    width,
  };
}

export function choices(items: { text: string; correct?: boolean; trap?: string }[]): ExamChoice[] {
  return items.map((item, index) => ({
    id: String(index),
    label: String(index),
    text: item.text,
    isCorrect: item.correct,
    trap: item.trap,
  }));
}

export function explanation({
  plan,
  work,
  answer,
  mistake,
  shortcut,
  link,
}: {
  plan: string;
  work: string;
  answer: string;
  mistake: string;
  shortcut: string;
  link: string;
}) {
  return `方針: ${plan}\n\n計算過程: ${work}\n\n答え: ${answer}\n\nよくあるミス: ${mistake}\n\n時短ポイント: ${shortcut}\n\n復習リンク: ${link}`;
}

export function q(
  base: Omit<CommonTestQuestion, "measuredAbility" | "timeSavingTip" | "commonMistakes"> & {
    measuredAbility?: string;
    timeSavingTip?: string;
    commonMistakes?: string[];
  },
): CommonTestQuestion {
  const blanks = base.blanks?.map((item) => ({
    ...item,
    id: `${base.id}-${item.id}`,
  }));
  const answer =
    blanks && typeof base.answer === "object" && !Array.isArray(base.answer)
      ? Object.fromEntries(
          blanks.map((item, index) => [item.id, (base.answer as Record<string, string>)[base.blanks![index].id]]),
        )
      : base.answer;

  return {
    measuredAbility: base.measuredAbility ?? base.skillTags.join("、"),
    timeSavingTip: base.timeSavingTip ?? "先に条件を式へ移し、必要な値だけを計算する。",
    commonMistakes: base.commonMistakes ?? ["空欄を1桁ずつではなく、指定されたまとまりで扱うことを忘れる"],
    ...base,
    blanks,
    answer,
  };
}
