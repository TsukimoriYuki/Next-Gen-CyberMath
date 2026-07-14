import { COMMON_TEST_MATH_1A_MANUAL_001 } from "@/data/common-test/manual-mocks/math1a-001";
import { COMMON_TEST_MATH_1A_MANUAL_002 } from "@/data/common-test/manual-mocks/math1a-002";

export type CommonTestMockSubject = "math-1a";

export type CommonTestDifficulty =
  | "basic"
  | "standard"
  | "hard"
  | "trap"
  | "time-consuming";

export type CommonTestAnswerFormat =
  | "blank"
  | "choice"
  | "multi-choice"
  | "numeric"
  | "expression";

export type ExamAsset =
  | {
      type: "table";
      id: string;
      title: string;
      headers: string[];
      rows: string[][];
      note?: string;
    }
  | {
      type: "graph";
      id: string;
      title: string;
      variant: "quadratic-domain";
      note?: string;
      alt?: string;
    }
  | {
      type: "diagram";
      id: string;
      title: string;
      variant: "tower-elevation" | "sphere-plane" | "circle-tangent";
      note?: string;
      alt: string;
    }
  | {
      type: "conversation";
      id: string;
      title: string;
      lines: { speaker: string; text: string }[];
    };

export type ExamBlank = {
  id: string;
  label: string;
  type: "integer" | "signed-integer" | "fraction" | "choice-symbol" | "expression";
  correctAnswer: string;
  width?: number;
};

export type ExamChoice = {
  id: string;
  label: string;
  text: string;
  isCorrect?: boolean;
  trap?: string;
};

export type CommonTestScoringGroup = {
  id: string;
  answerLabels: string[];
  points: number;
  correctAnswers: Record<string, string | number>;
  /** Why these answer slots form one indivisible scoring step. */
  rationale: string;
};

export type CommonTestQuestion = {
  id: string;
  prompt: string;
  answerFormat: CommonTestAnswerFormat;
  blanks?: ExamBlank[];
  choices?: ExamChoice[];
  scoringGroups?: CommonTestScoringGroup[];
  points: number;
  difficulty: CommonTestDifficulty;
  skillTags: string[];
  commonMistakes: string[];
  answer: string | string[] | Record<string, string>;
  explanation: string;
  shortSolution?: string;
  reviewLinks?: string[];
  measuredAbility: string;
  timeSavingTip: string;
  dependsOnPrevious?: boolean;
};

export type CommonTestSection = {
  id: string;
  title: string;
  unit: string;
  points: number;
  estimatedMinutes: number;
  theme: string;
  leadText: string;
  assets?: ExamAsset[];
  questions: CommonTestQuestion[];
};

export type CommonTestMockExam = {
  id: string;
  title: string;
  subject: CommonTestMockSubject;
  /**
   * 手動作成PDF正本の本番模試（4大問・70分・100点）は必ず 70/100。
   * 大問1問分の単独演習（source: "manual-section-practice"）は、その大問の
   * 実際の所要時間・配点をそのまま入れる（70分・100点固定ではない）。
   */
  durationMinutes: number;
  totalPoints: number;
  targetAverage: {
    min: number;
    max: number;
  };
  sections: CommonTestSection[];
  /**
   * PDF冊子の public 配下URL。存在する場合、本番導線はこのPDFをそのまま表示する
   * （問題本文をReactで再構成しない）。採点・解説はこのファイルとは独立して
   * sections/questions のデータから行う。
   */
  pdfUrl?: string;
  /**
   * "manual-section-practice": 大問1問分を通し演習として手動作成したもの。
   * PDF冊子は存在しないため、問題本文を CommonTestMockExamRunner でそのまま表示する
   * （これは PDF が正本の模試を Reactで再構成しているのではなく、そもそも PDF を
   * 持たない単独演習を最初から HTML/React で作っているため、正本を隠していない）。
   */
  source: "manual-pdf" | "ai-prototype" | "manual-section-practice";
  status: "published" | "draft";
  devOnly?: boolean;
  /** 解いた後に戻るべき中核講義（主に manual-section-practice 用）。 */
  lectureLinks?: { label: string; href: string }[];
};

export function choices(items: { text: string; correct?: boolean; trap?: string }[]): ExamChoice[] {
  return items.map((item, index) => ({
    id: String(index),
    label: String(index),
    text: item.text,
    isCorrect: item.correct,
    trap: item.trap,
  }));
}

export const COMMON_TEST_MATH_1A_AI_PROTOTYPE_001: CommonTestMockExam = {
  id: "common-test-math-1a-mock-001",
  title: "共通テスト型 数学I・数学A 試作版",
  subject: "math-1a",
  durationMinutes: 70,
  totalPoints: 100,
  targetAverage: { min: 38, max: 45 },
  source: "ai-prototype",
  status: "draft",
  devOnly: true,
  sections: [
    {
      id: "prototype-notice",
      title: "試作版",
      unit: "非公開",
      points: 100,
      estimatedMinutes: 70,
      theme: "AI生成の低品質な試作版のため、公開導線から外しています。",
      leadText:
        "この模試は現在、公開用の本番模試として扱っていません。共通テスト型本番模試は、手動作成版 第1回を利用してください。",
      questions: [
        {
          id: "m1a-ai-prototype-notice",
          prompt: "この試作版は採点対象外です。手動作成版 第1回へ移動してください。",
          answerFormat: "choice",
          choices: choices([{ text: "確認した", correct: true }]),
          points: 100,
          difficulty: "basic",
          skillTags: ["非公開"],
          commonMistakes: ["公開用模試と取り違える"],
          answer: "0",
          explanation:
            "方針: AI生成の試作版は公開導線に出しません。計算過程: なし。答え: 手動作成版を利用します。よくあるミス: 古いURLを使い続けること。時短ポイント: 一覧の最上部から手動作成版を選びます。復習リンク: /common-test/simulator/common-test-math-1a-manual-001",
          shortSolution: "手動作成版 第1回を利用してください。",
          reviewLinks: ["/common-test/simulator/common-test-math-1a-manual-001"],
          measuredAbility: "公開版と試作版を区別する",
          timeSavingTip: "一覧の先頭にある手動作成版を使う。",
        },
      ],
    },
  ],
};

export const COMMON_TEST_MATH_1A_MOCK_001 = COMMON_TEST_MATH_1A_MANUAL_001;

export const COMMON_TEST_MOCK_EXAMS: CommonTestMockExam[] = [
  COMMON_TEST_MATH_1A_MANUAL_001,
  COMMON_TEST_MATH_1A_MANUAL_002,
];

export const COMMON_TEST_MOCK_EXAM_DRAFTS: CommonTestMockExam[] = [
  COMMON_TEST_MATH_1A_AI_PROTOTYPE_001,
];

export function getCommonTestMockExam(id: string): CommonTestMockExam | null {
  return (
    COMMON_TEST_MOCK_EXAMS.find((exam) => exam.id === id) ??
    COMMON_TEST_MOCK_EXAM_DRAFTS.find((exam) => exam.id === id) ??
    null
  );
}

export function getPublicCommonTestMockExams(): CommonTestMockExam[] {
  return COMMON_TEST_MOCK_EXAMS.filter((exam) => exam.status === "published" && !exam.devOnly);
}

export function getCommonTestMockExamStats(exam: CommonTestMockExam) {
  const questions = exam.sections.flatMap((section) => section.questions);
  return {
    sectionCount: exam.sections.length,
    questionCount: questions.length,
    answerSlotCount: questions.reduce(
      (sum, question) => sum + Math.max(1, question.blanks?.length ?? 0),
      0,
    ),
    assetCount: exam.sections.reduce((sum, section) => sum + (section.assets?.length ?? 0), 0),
    totalPoints: exam.sections.reduce((sum, section) => sum + section.points, 0),
    estimatedMinutes: exam.sections.reduce((sum, section) => sum + section.estimatedMinutes, 0),
  };
}
