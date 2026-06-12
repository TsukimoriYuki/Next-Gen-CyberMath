import { COMMON_TEST_DRILL_QUESTIONS } from "@/data/common-test-drills";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import { COMMON_TEST_EXAM_VARIANT_SETS } from "@/data/common-test-exam-sets";
import type { CommonTestExamAnswerRecord } from "@/lib/common-test-exam-history";
import { getCommonTestAnswerFormat } from "@/lib/common-test-answer-normalize";
import { getCommonTestExamQuestions } from "@/lib/common-test-exams";

export type GuidedReviewStepKind =
  | "hint-1"
  | "hint-2"
  | "hint-3"
  | "strategy"
  | "explanation"
  | "trap";

export interface CommonTestGuidedReviewStep {
  kind: GuidedReviewStepKind;
  label: string;
  body: string;
}

export interface CommonTestGuidedReviewItem {
  questionId: string;
  examId?: string;
  subjectId: string;
  sectionId: string;
  title: string;
  statement: string;
  context?: string;
  passage?: string;
  examContext?: string;
  examPassage?: string;
  sharedStem?: string;
  sharedData?: CommonTestDrillQuestion["sharedData"];
  answerFormat: ReturnType<typeof getCommonTestAnswerFormat>;
  correctAnswerText: string;
  userAnswerText?: string;
  isCorrect?: boolean;
  dependsOnPrevious?: boolean;
  difficultyStage?: CommonTestDrillQuestion["difficultyStage"];
  skillTags: string[];
  nextHref: string;
  steps: CommonTestGuidedReviewStep[];
}

export function findCommonTestQuestionById(
  questionId: string,
  examId?: string,
): CommonTestDrillQuestion | undefined {
  if (examId) {
    const examQuestion = getCommonTestExamQuestions(examId).find((q) => q.id === questionId);
    if (examQuestion) return examQuestion;
  }

  const drillQuestion = COMMON_TEST_DRILL_QUESTIONS.find((q) => q.id === questionId);
  if (drillQuestion) return drillQuestion;

  for (const questions of Object.values(COMMON_TEST_EXAM_VARIANT_SETS)) {
    const found = questions.find((q) => q.id === questionId);
    if (found) return found;
  }

  return undefined;
}

export function buildCommonTestGuidedReviewItem(
  question: CommonTestDrillQuestion,
  answer?: Pick<
    CommonTestExamAnswerRecord,
    "selectedAnswer" | "correctAnswer" | "isCorrect"
  >,
  examId?: string,
): CommonTestGuidedReviewItem {
  const answerFormat = getCommonTestAnswerFormat(question);
  const correctAnswer = answer?.correctAnswer ?? question.correctAnswer;
  const userAnswerText = answerToText(answer?.selectedAnswer);
  const steps = buildGuidedReviewSteps(question);

  return {
    questionId: question.id,
    examId,
    subjectId: question.subjectId,
    sectionId: question.sectionId,
    title: question.title,
    statement: question.statement,
    context: question.context,
    passage: question.passage,
    examContext: question.examContext,
    examPassage: question.examPassage,
    sharedStem: question.sharedStem,
    sharedData: question.sharedData,
    answerFormat,
    correctAnswerText: answerToText(correctAnswer) || "未設定",
    userAnswerText: userAnswerText || undefined,
    isCorrect: answer?.isCorrect,
    dependsOnPrevious: question.dependsOnPrevious,
    difficultyStage: question.difficultyStage,
    skillTags: question.skillTags,
    nextHref: `/common-test/${question.subjectId}/${question.sectionId}`,
    steps,
  };
}

export function buildCommonTestGuidedReviewItemsFromAnswers(
  answers: CommonTestExamAnswerRecord[],
  examId?: string,
): CommonTestGuidedReviewItem[] {
  return answers
    .map((answer) => {
      const question = findCommonTestQuestionById(answer.questionId, examId);
      return question
        ? buildCommonTestGuidedReviewItem(question, answer, examId)
        : null;
    })
    .filter((item): item is CommonTestGuidedReviewItem => item !== null)
    .sort((a, b) => scoreReviewPriority(b) - scoreReviewPriority(a));
}

function buildGuidedReviewSteps(question: CommonTestDrillQuestion): CommonTestGuidedReviewStep[] {
  const steps: CommonTestGuidedReviewStep[] = [
    {
      kind: "hint-1",
      label: "ヒント1：着眼点",
      body: buildHint1(question),
    },
    {
      kind: "hint-2",
      label: "ヒント2：使う条件",
      body: buildHint2(question),
    },
    {
      kind: "hint-3",
      label: "ヒント3：式・根拠の立て方",
      body: buildHint3(question),
    },
  ];

  if (question.strategy) {
    steps.push({
      kind: "strategy",
      label: "解き方",
      body: question.strategy,
    });
  }

  if (question.explanation) {
    steps.push({
      kind: "explanation",
      label: "完全解説",
      body: question.explanation,
    });
  }

  if (question.trapExplanation) {
    steps.push({
      kind: "trap",
      label: "よくあるミス",
      body: question.trapExplanation,
    });
  }

  return steps;
}

function buildHint1(question: CommonTestDrillQuestion): string {
  if (question.subjectId === "english-reading") {
    if (question.skillTags.includes("情報照合")) {
      return "設問の条件語を先に確認し、本文中で同じ意味に言い換えられている表現を探しましょう。";
    }
    if (question.skillTags.includes("レポート完成")) {
      return "空欄の前後と資料の見出しを確認し、結論を支える根拠がどこにあるかを探しましょう。";
    }
    return "設問が何を聞いているかを確認し、本文の該当箇所を一つずつ照合しましょう。";
  }

  if (question.sharedData || question.examContext || question.context) {
    return "まず図・表・条件から、分かっている値と求める値を整理しましょう。";
  }
  return "問題文の条件を記号や数値に分け、最初に使える公式や関係式を探しましょう。";
}

function buildHint2(question: CommonTestDrillQuestion): string {
  if (question.dependsOnPrevious) {
    return "この問題は前の小問で求めた値や関係を使います。前問の結果を、今の設問の式や根拠に代入しましょう。";
  }

  if (question.subjectId === "english-reading") {
    if (question.examPassage || question.passage) {
      return "本文全体を読み直すより、設問の条件に合う文や表の行だけを絞って確認しましょう。";
    }
    return "選択肢を先に見て、本文に根拠があるものとないものを分けましょう。";
  }

  if (question.sharedStem) {
    return "共通設定の誘導文にある関係式や読み取り方を使います。新しい方法を探す前に、資料の条件をそのまま式にしましょう。";
  }
  return "問題文に直接与えられている条件を使います。必要な値を一つずつ代入して確認しましょう。";
}

function buildHint3(question: CommonTestDrillQuestion): string {
  if (question.subjectId === "english-reading") {
    if (question.skillTags.includes("情報照合")) {
      return "選択肢の語句そのものではなく、本文中の言い換え表現に注目してください。条件を一つでも満たさない選択肢は外します。";
    }
    if (question.skillTags.includes("レポート完成")) {
      return "資料の数値と説明文の両方に支えられる選択肢を選びます。片方の資料だけで決めないようにしましょう。";
    }
    return "根拠文と選択肢を対応させ、本文に書かれていない推測を含む選択肢を外しましょう。";
  }

  if (question.skillTags.includes("データ読み取り") || question.skillTags.includes("図表読解")) {
    return "表やグラフの値をそのまま読み、単位や行・列の取り違えがないか確認してから計算しましょう。";
  }
  if (question.skillTags.includes("条件整理")) {
    return "条件を満たす場合と満たさない場合を分けて、必要なら全体の場合の数から考えましょう。";
  }
  if (question.skillTags.includes("選択肢消去")) {
    return "まず明らかに条件と合わない選択肢を消し、残った候補を式や根拠で比較しましょう。";
  }
  if (question.answerFormat === "number" || question.answerFormat === "digits") {
    return "答えだけでなく、途中の式を短く書いてから数値を入力しましょう。桁や符号の入力ミスにも注意します。";
  }
  return "式を立てるときは、求める量を左辺に置き、問題文の条件を順番に代入していきましょう。";
}

function answerToText(value: string | string[] | null | undefined): string {
  if (Array.isArray(value)) return value.join(", ");
  if (value == null) return "";
  return String(value);
}

function scoreReviewPriority(item: CommonTestGuidedReviewItem): number {
  let score = 0;
  if (item.isCorrect === false) score += 10;
  if (!item.userAnswerText) score += 6;
  if (item.dependsOnPrevious) score += 2;
  if (item.difficultyStage === "advanced") score += 2;
  if (item.difficultyStage === "guided") score += 1;
  return score;
}
