import type { CourseLesson, LessonBlock } from "@/types/course";

type JapaneseLessonDraft = Readonly<{
  id: string;
  title: string;
  description: string;
  minutes: number;
  prerequisites: readonly string[];
  goals: readonly string[];
  minimumKnowledge: string;
  firstLook: string;
  order: readonly string[];
  thinking: string;
  example: string;
  mistake: string;
  elimination?: string;
  marking?: string;
  previewQuestions?: string;
  paragraphRoles?: string;
  evidenceSearch?: string;
  finalCheck?: string;
  checkpoint: string;
  next: string;
}>;

export function makeJapaneseLesson(draft: JapaneseLessonDraft): CourseLesson {
  const isReadingLesson = draft.id.startsWith("reading-");
  const blocks: LessonBlock[] = [
    { kind: "intro", title: "最低限の知識", body: draft.minimumKnowledge },
    { kind: "strategy", title: "最初に見る場所", body: draft.firstLook },
    {
      kind: "stepByStep",
      title: "実際に解く順番",
      body: "",
      steps: draft.order.map((body, index) => ({ step: index + 1, label: `手順${index + 1}`, body })),
    },
    { kind: "concept", title: "頭の中で考えること", body: draft.thinking },
    ...(draft.marking
      ? [{ kind: "strategy" as const, title: "本文への線の引き方", body: draft.marking }]
      : []),
    ...(draft.previewQuestions
      ? [{ kind: "strategy" as const, title: "設問を先に見るべき場合", body: draft.previewQuestions }]
      : []),
    ...(draft.paragraphRoles
      ? [{ kind: "concept" as const, title: "段落の役割", body: draft.paragraphRoles }]
      : []),
    ...(draft.evidenceSearch
      ? [{ kind: "strategy" as const, title: "根拠の探し方", body: draft.evidenceSearch }]
      : []),
    { kind: "workedExample", title: "具体例", body: draft.example },
    { kind: "commonMistake", title: "よくある誤答", body: draft.mistake },
    ...(draft.elimination
      ? [{ kind: "strategy" as const, title: "選択肢の削り方", body: draft.elimination }]
      : []),
    ...(draft.finalCheck
      ? [{ kind: "summary" as const, title: "最後に検算すること", body: draft.finalCheck }]
      : []),
    { kind: "practice", title: "確認問題", body: draft.checkpoint },
    {
      kind: "summary",
      title: "詳しい解説",
      body: `${draft.thinking}\n\n誤りやすい点は「${draft.mistake}」。迷ったら最初に見る場所と解く順番へ戻り、根拠を一段ずつ確認する。`,
    },
    { kind: "nextStep", title: "次に学ぶ内容", body: draft.next },
  ];

  return {
    lessonId: draft.id,
    lessonTitle: draft.title,
    lessonDescription: draft.description,
    level: "beginner",
    estimatedMinutes: draft.minutes,
    prerequisites: [...draft.prerequisites],
    goals: [...draft.goals],
    lessonBlocks: blocks,
    checkQuestions: [
      {
        question: draft.checkpoint,
        answer: `講座の「実際に解く順番」に戻り、本文根拠を一つずつ確認する。${draft.thinking}`,
      },
    ],
    relatedPracticeLinks: [
      {
        label: "対応問題を解く",
        href: isReadingLesson
          ? `/japanese/reading?course=${draft.id}`
          : `/japanese/problems?course=${draft.id}`,
        description: isReadingLesson
          ? "この講座に対応する文章を、本文根拠と誤答理由まで確認します。"
          : "この講座に対応する5問を、本文根拠と誤答理由まで確認します。",
      },
      ...(isReadingLesson ? [{
        label: "共通テスト型の大問を解く",
        href: `/japanese/reading/exams?course=${draft.id}`,
        description: "この講座の読み方を、5問構成の大問と複数資料で実践します。",
      }] : []),
    ],
    qualityTags: ["japanese", "beginner", "evidence-first", "original-explanation"],
  };
}
