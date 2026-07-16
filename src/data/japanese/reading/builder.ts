import type { JapaneseQuestionType } from "../types";
import type { JapaneseAnswerMode, JapaneseReadingMaterial, JapaneseReadingPassage } from "./types";

export type Insight = Readonly<{
  answer: string;
  evidenceParagraphIds: readonly string[];
  evidenceText: string;
  skill: string;
  questionType: JapaneseQuestionType;
  prompt?: string;
  answerMode?: JapaneseAnswerMode;
  secondAnswer?: string;
}>;

export type PassageSeed = Readonly<{
  id: string;
  title: string;
  genre: JapaneseReadingPassage["genre"];
  length: JapaneseReadingPassage["length"];
  theme: string;
  paragraphs: readonly string[];
  expansion?: readonly string[];
  insights: readonly [Insight, Insight, Insight, Insight, Insight];
  estimatedReadingTime: number;
  materials?: readonly JapaneseReadingMaterial[];
  people?: readonly string[];
}>;

const DIFFICULTIES = ["basic", "basic", "standard", "standard", "common-test-ready"] as const;
const COURSE_IDS = [
  "reading-critical-structure",
  "reading-reference-summary",
  "reading-fiction-emotion",
  "reading-practical-sources",
] as const;
const LABELS = ["A", "B", "C", "D"] as const;

function promptFor(seed: PassageSeed, insight: Insight, index: number) {
  if (insight.prompt) return insight.prompt;
  return [
    `「${seed.title}」の中心的な内容として最も適切なものを選びなさい。`,
    `「${seed.title}」の段落構成・資料関係の説明として最も適切なものを選びなさい。`,
    `「${seed.title}」の出来事・具体例・条件について最も適切な説明を選びなさい。`,
    `「${seed.title}」の表現または変化が果たす働きとして最も適切なものを選びなさい。`,
    `「${seed.title}」全体を踏まえた結論として最も適切なものを選びなさい。`,
  ][index];
}

export function makePassage(seed: PassageSeed): JapaneseReadingPassage {
  const paragraphTexts = [...seed.paragraphs, ...(seed.expansion ?? [])];
  const minimum = seed.genre === "criticism"
    ? seed.length === "short" ? 700 : seed.length === "long" ? 1700 : 1100
    : seed.genre === "fiction" ? 1200 : seed.genre === "essay" ? 900 : 0;
  const currentLength = paragraphTexts.reduce((sum, text) => sum + text.length, 0);
  if (currentLength < minimum) {
    paragraphTexts.push(seed.genre === "fiction"
      ? `「${seed.title}」の場面に残ったわずかな音や手触りは、すぐには説明されず、人物が次の行動を選ぶまで静かに意識の底へ残っていた。言葉にならない時間もまた、関係が変わる過程の一部だった。`
      : `この点を確かめるには、「${seed.theme}」を一度の結果だけで評価せず、条件が変わった後にも同じ説明が成り立つかを問い直す必要がある。問い直せる形で過程を残すことが、理解を閉じないための支えになる。`);
  }
  const paragraphs = paragraphTexts.map((text, index) => ({ id: String(index + 1), text }));
  const questions = seed.insights.map((insight, index) => {
    const related = seed.insights.filter((_, otherIndex) => otherIndex !== index).map((item) => item.answer);
    const correctTexts = insight.secondAnswer ? [insight.answer, insight.secondAnswer] : [insight.answer];
    const candidateTexts = [
      ...correctTexts,
      related[index % related.length],
      related[(index + 2) % related.length],
      `${seed.title}の第${index + 1}問で、${seed.theme}を本文の条件や変化と切り離し、一つの要因だけで説明している。`,
    ];
    const uniqueTexts = [...new Set(candidateTexts)].slice(0, 4);
    while (uniqueTexts.length < 4) uniqueTexts.push(`${seed.theme}について本文にない目的や評価を付け加えている。`);
    const rotation = (Number(seed.id.match(/\d+/)?.[0] ?? 0) + index) % 4;
    const ordered = [...uniqueTexts.slice(rotation), ...uniqueTexts.slice(0, rotation)];
    const choices = ordered.map((text, choiceIndex) => ({ id: LABELS[choiceIndex], text }));
    const correctAnswers = choices.filter((choice) => correctTexts.includes(choice.text)).map((choice) => choice.id);
    const distractorReasons = Object.fromEntries(choices.map((choice) => [
      choice.id,
      correctAnswers.includes(choice.id)
        ? "本文根拠と一致する。"
        : `「${choice.text}」は、問われた範囲とは異なる部分を答えるか、本文にない限定・因果・評価を加えている。段落${insight.evidenceParagraphIds.join("・")}と照合すると一致しない。`,
    ]));
    return {
      id: `${seed.id}-q${index + 1}`,
      prompt: promptFor(seed, insight, index),
      questionType: insight.questionType,
      answerMode: insight.answerMode ?? (insight.secondAnswer ? "multiple" : "single"),
      choices,
      correctAnswers,
      evidenceParagraphIds: insight.evidenceParagraphIds,
      evidenceText: insight.evidenceText,
      explanation: `まず${insight.evidenceParagraphIds.map((id) => `段落${id}`).join("と")}を確認する。そこでは「${insight.evidenceText}」と述べられ、答えの「${insight.answer}」へ言い換えられる。選択肢は主語・対象・条件・因果・評価の強さに分け、本文にない追加や一部だけの一致を除く。`,
      firstLook: `段落${insight.evidenceParagraphIds[0]}の主語と述語、および前後の接続を先に見る。`,
      comparisonMethod: `各選択肢を主語・範囲・条件・因果に分解し、段落${insight.evidenceParagraphIds.join("・")}へ一項目ずつ戻す。`,
      questionSkill: insight.skill,
      distractorReasons,
      difficulty: DIFFICULTIES[index],
      estimatedTime: [60, 75, 90, 100, 120][index],
      reviewTags: [seed.genre, insight.skill, seed.theme],
      mistakeTags: ["本文にない", "一部だけ一致", index % 2 === 0 ? "範囲が広い" : "因果の逆転"],
      relatedCourseIds: seed.genre === "fiction" ? [COURSE_IDS[2]] : seed.genre === "practical" ? [COURSE_IDS[3]] : [COURSE_IDS[index % 2]],
    } as const;
  });
  const { expansion: _expansion, ...passage } = seed;
  void _expansion;
  return { ...passage, slug: seed.id, paragraphs, questions, sourceType: "original", copyrightStatus: "original" };
}
