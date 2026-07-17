import { createHash } from "node:crypto";

import { COMMON_TEST_DRILL_QUESTIONS } from "../src/data/common-test-drills";
import { COMMON_TEST_EXAM_VARIANT_SETS } from "../src/data/common-test-exam-sets";
import { COMMON_TEST_EXAM_PRESETS } from "../src/data/common-test-exams";
import {
  COMMON_TEST_MOCK_EXAMS,
  type CommonTestMockExam,
  type CommonTestQuestion,
} from "../src/data/common-test-mock-exams";
import { SECTION_PRACTICE_EXAMS } from "../src/data/common-test/section-practice";
import { COURSE_SUBJECTS } from "../src/data/courses";
import { COMPREHENSION_PROBLEMS } from "../src/data/english-comprehension";
import { MULTI_SOURCE_PROBLEMS } from "../src/data/english-multisource";
import { SPEED_READING_PROBLEMS } from "../src/data/english-speed-reading";
import { EXAM_PAPERS } from "../src/data/exam-papers";
import { EXAM_SET_CATEGORIES } from "../src/data/exam-sets";
import { GRAMMAR_QUESTIONS } from "../src/data/grammar-drill";
import { INFORMATICS_SECTION_PRACTICES } from "../src/data/informatics/exam-practice";
import { INFORMATICS_PROBLEMS } from "../src/data/informatics/problems";
import { JAPANESE_PROBLEMS } from "../src/data/japanese";
import { JAPANESE_READING_PASSAGES } from "../src/data/japanese/reading";
import { LESSONS } from "../src/data/lessons";
import { PROBLEMS } from "../src/data/problems";
import { SUBJECTS } from "../src/data/subjects";
import { VOCAB_CARDS } from "../src/data/vocab-flashcards";
import { ENGLISH_USAGE_PROBLEMS } from "../src/data/english-usage";
import { buildElementaryContentInventory } from "../src/lib/elementary-inventory";
import type { ElementaryContentInventory } from "../src/types/elementary-inventory";

export const SUBJECT_IDS = ["math", "english", "informatics", "japanese"] as const;
export type InventorySubjectId = (typeof SUBJECT_IDS)[number];
export type NormalizedDifficulty = "基礎" | "標準" | "共通テスト実戦" | "高難度" | "未設定";
export type NormalizedQuestionType =
  | "単一選択"
  | "複数選択"
  | "数値入力"
  | "短答"
  | "並べ替え"
  | "対応選択"
  | "表・グラフ読解"
  | "長文読解"
  | "プログラム読解"
  | "大問誘導"
  | "模試採点欄"
  | "その他"
  | "未設定";
export type DuplicateStatus = "exact duplicate" | "shared reference" | "probable duplicate" | "unique";

export type InventoryItem = {
  id: string;
  subject: InventorySubjectId;
  unit: string;
  sourceFile: string;
  sourceType: string;
  rawDifficulty: string;
  difficulty: NormalizedDifficulty;
  rawQuestionType: string;
  questionType: NormalizedQuestionType;
  publicationStatus: string;
  relatedCourseId: string | null;
  isScorable: boolean;
  isCounted: boolean;
  duplicateStatus: DuplicateStatus;
  duplicateGroup: string;
};

export type SubjectSummary = {
  subjectId: InventorySubjectId;
  subjectName: string;
  publicationStatus: string;
  courseCount: number;
  courseTrackCount: number;
  scorableQuestionCount: number;
  nonScorableCheckpointCount: number;
  referenceQuestionCount: number;
  passageCount: number;
  practiceSetCount: number;
  mockExamCount: number;
  mockExamScoringItemCount: number;
  difficultyBreakdown: {
    normalized: Record<string, number>;
    raw: Record<string, number>;
    ratios: Record<string, number>;
  };
  questionTypeBreakdown: Record<string, number>;
  unitBreakdown: Record<string, number>;
  sourceFileBreakdown: Record<string, number>;
  duplicateIdCount: number;
  unresolvedReferenceCount: number;
  missingMetadataCount: number;
};

export type TargetPlan = {
  id: "A" | "B" | "C";
  name: string;
  targets: Record<InventorySubjectId, number>;
  total: number;
  merit: string;
  demerit: string;
  workload: string;
  fit: string;
};

export type ContentInventory = {
  generatedAt: string;
  gitCommit: string;
  countingRules: string[];
  totals: {
    scorableQuestionCount: number;
    courseCount: number;
    courseTrackCount: number;
    passageCount: number;
    practiceSetCount: number;
    mockExamCount: number;
    mockExamScoringItemCount: number;
    nonScorableCheckpointCount: number;
    referenceQuestionCount: number;
    duplicateIdCount: number;
    exactDuplicateCount: number;
    sharedReferenceCount: number;
    probableDuplicateCount: number;
    unresolvedReferenceCount: number;
    missingMetadataCount: number;
  };
  subjects: SubjectSummary[];
  items: InventoryItem[];
  targetPlans: TargetPlan[];
  recommendedPlan: "A";
  unresolvedReferences: string[];
};

export type CombinedContentInventory = Readonly<{
  generatedAt: string;
  gitCommit: string;
  highSchool: ContentInventory;
  elementary: ElementaryContentInventory;
  combined: Readonly<{
    highSchoolProblemCount: number;
    elementaryProblemCount: number;
    problemCount: number;
  }>;
}>;

export type PersistedContentInventory = ContentInventory &
  Readonly<{
    highSchool: Readonly<{
      schoolLevel: "highSchool";
      problemCount: number;
      subjects: readonly Readonly<{
        subjectId: InventorySubjectId;
        subjectName: string;
        problemCount: number;
      }>[];
    }>;
    elementary: ElementaryContentInventory;
    combined: CombinedContentInventory["combined"];
  }>;

type DraftItem = Omit<InventoryItem, "isCounted" | "duplicateStatus" | "duplicateGroup"> & {
  promptForHash?: string;
  sharedReference?: string;
};

const normalizedDifficultyOrder: NormalizedDifficulty[] = [
  "基礎",
  "標準",
  "共通テスト実戦",
  "高難度",
  "未設定",
];

function normalizeDifficulty(raw: string | undefined): NormalizedDifficulty {
  const value = (raw ?? "").toLowerCase();
  if (!value) return "未設定";
  if (["a", "basic", "easy", "textbook", "beginner"].includes(value)) return "基礎";
  if (["b", "c", "standard", "medium", "private_uni"].includes(value)) return "標準";
  if (["common-test-ready", "common-test-prep", "ct-prep", "common_test", "trap", "time-consuming"].includes(value)) return "共通テスト実戦";
  if (["d", "d_plus", "ex", "olympiad", "hard", "national_uni", "advanced", "abyss"].includes(value)) return "高難度";
  return "未設定";
}

function normalizeQuestionType(raw: string | undefined): NormalizedQuestionType {
  const value = raw ?? "";
  if (!value) return "未設定";
  if (["single-choice", "true-false", "scenario", "choice", "meaning", "context", "paraphrase", "connector", "logic", "usage", "auxiliary-verb", "honorific", "subject", "translation", "emotion", "content", "interpretation", "person-relation", "main-idea", "structure", "expression-effect"].includes(value)) return "単一選択";
  if (["multi-select", "multiple-choice"].includes(value)) return "複数選択";
  if (["number", "numeric", "blank-number", "digits"].includes(value)) return "数値入力";
  if (["blank", "fill-blank", "text", "written-reading", "construction"].includes(value)) return "短答";
  if (["reading-order", "sequence", "ordering"].includes(value)) return "並べ替え";
  if (["matching", "mark-combination", "information-match", "material-comparison", "algorithm-choice"].includes(value)) return "対応選択";
  if (["table-graph", "table-reading", "trace"].includes(value)) return "表・グラフ読解";
  if (["long-reading", "reading"].includes(value)) return "長文読解";
  if (["pseudocode-output", "program-reading"].includes(value)) return "プログラム読解";
  if (["guided", "common-test-guided"].includes(value)) return "大問誘導";
  if (["mock-slot", "blank", "exam-blank"].includes(value)) return "模試採点欄";
  return "その他";
}

function normalizeForHash(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/<[^>]+>/g, " ")
    .replace(/\\(?:left|right|mathrm|text|operatorname)/g, "")
    .replace(/[①②③④⑤⑥⑦⑧⑨⑩]|(?:^|\s)[A-DＡ-Ｄ][.)、:：]/g, " ")
    .replace(/[\s\r\n]+/g, " ")
    .replace(/[‐‑‒–—―]/g, "-")
    .trim()
    .toLowerCase();
}

function hashPrompt(value: string): string | null {
  const normalized = normalizeForHash(value);
  if (normalized.length < 60) return null;
  return createHash("sha256").update(normalized).digest("hex").slice(0, 16);
}

function countBy<T>(values: T[], key: (value: T) => string): Record<string, number> {
  const result: Record<string, number> = {};
  for (const value of values) {
    const name = key(value);
    result[name] = (result[name] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b, "ja")));
}

function topLevelSubject(subjectId: string): InventorySubjectId {
  if (subjectId.startsWith("math")) return "math";
  if (subjectId === "english-reading" || subjectId === "english") return "english";
  if (subjectId === "informatics") return "informatics";
  return "japanese";
}

function coursePublication(subjectId: string): string {
  return COURSE_SUBJECTS.find((subject) => subject.subjectId === subjectId)?.status ?? "available";
}

function buildCourseIndex() {
  return new Map(
    COURSE_SUBJECTS.flatMap((subject) =>
      subject.units.flatMap((unit) =>
        unit.lessons.map((lesson) => [lesson.lessonId, { subject: subject.parentSubjectId, unit: unit.unitTitle }] as const),
      ),
    ),
  );
}

function questionScoringUnits(question: CommonTestQuestion) {
  return question.scoringGroups?.length ? question.scoringGroups : [null];
}

function addMockItems(items: DraftItem[], exam: CommonTestMockExam, sourceFile: string, sourceType: "mock-exam" | "practice-set") {
  for (const section of exam.sections) {
    for (const question of section.questions) {
      questionScoringUnits(question).forEach((group, index) => {
        const groupId = group?.id ?? `question-${index + 1}`;
        items.push({
          id: `${exam.id}:${question.id}:${groupId}`,
          subject: topLevelSubject(exam.subject),
          unit: section.unit || section.id,
          sourceFile,
          sourceType,
          rawDifficulty: question.difficulty,
          difficulty: normalizeDifficulty(question.difficulty),
          rawQuestionType: sourceType === "mock-exam" ? "mock-slot" : "common-test-guided",
          questionType: sourceType === "mock-exam" ? "模試採点欄" : "大問誘導",
          publicationStatus:
            exam.status === "draft"
              ? "hidden"
              : exam.subject === "informatics"
                ? "beta"
                : "public",
          relatedCourseId: question.reviewLinks?.[0] ?? null,
          isScorable: true,
          promptForHash: `${question.prompt} ${group?.answerLabels.join(" ") ?? ""}`,
          sharedReference:
            sourceType === "mock-exam" && exam.subject === "informatics"
              ? "common mock registry and subject registry"
              : undefined,
        });
      });
    }
  }
}

function buildDraftItems(): { items: DraftItem[]; unresolvedReferences: string[] } {
  const items: DraftItem[] = [];
  const unresolvedReferences: string[] = [];
  const courseIndex = buildCourseIndex();
  const legacyLessonIds = new Set(LESSONS.map((lesson) => lesson.slug));

  for (const problem of PROBLEMS) {
    if (problem.unitPractice) {
      const practice = problem.unitPractice;
      items.push({
        id: practice.id,
        subject: "math",
        unit: practice.practiceArea,
        sourceFile: "src/data/math-1a-unit-practice.ts",
        sourceType: "single-question",
        rawDifficulty: practice.difficulty,
        difficulty: normalizeDifficulty(practice.difficulty),
        rawQuestionType: practice.questionType,
        questionType: normalizeQuestionType(practice.questionType),
        publicationStatus: practice.publicationStatus,
        relatedCourseId: practice.relatedCourseIds[0] ?? null,
        isScorable: true,
        promptForHash: problem.statement,
      });
      continue;
    }
    const related = problem.relatedLessonSlug ?? null;
    if (related && !legacyLessonIds.has(related)) unresolvedReferences.push(`math problem ${problem.slug} -> lesson ${related}`);
    items.push({
      id: problem.slug,
      subject: "math",
      unit: problem.unit,
      sourceFile: "src/data/problems.ts",
      sourceType: "reference-example",
      rawDifficulty: problem.difficulty,
      difficulty: normalizeDifficulty(problem.difficulty),
      rawQuestionType: "worked-solution",
      questionType: "その他",
      publicationStatus: problem.isMockOnly || problem.tier === "ABYSS" ? "hidden" : "public",
      relatedCourseId: related,
      isScorable: false,
      promptForHash: problem.statement,
    });
  }

  for (const subject of COURSE_SUBJECTS) {
    for (const unit of subject.units) {
      for (const lesson of unit.lessons) {
        lesson.checkQuestions.forEach((question, index) => {
          items.push({
            id: `${lesson.lessonId}:check:${index + 1}`,
            subject: topLevelSubject(subject.parentSubjectId),
            unit: unit.unitTitle,
            sourceFile: "src/data/courses/index.ts",
            sourceType: "course-checkpoint",
            rawDifficulty: lesson.level,
            difficulty: normalizeDifficulty(lesson.level),
            rawQuestionType: "checkpoint",
            questionType: "その他",
            publicationStatus: coursePublication(subject.subjectId),
            relatedCourseId: lesson.lessonId,
            isScorable: false,
            promptForHash: question.question,
          });
        });
        lesson.lessonBlocks.filter((block) => block.kind === "checkpoint").forEach((block, index) => {
          items.push({
            id: `${lesson.lessonId}:checkpoint-block:${index + 1}`,
            subject: topLevelSubject(subject.parentSubjectId),
            unit: unit.unitTitle,
            sourceFile: "src/data/courses/index.ts",
            sourceType: "course-checkpoint",
            rawDifficulty: lesson.level,
            difficulty: normalizeDifficulty(lesson.level),
            rawQuestionType: "checkpoint",
            questionType: "その他",
            publicationStatus: coursePublication(subject.subjectId),
            relatedCourseId: lesson.lessonId,
            isScorable: false,
            promptForHash: `${block.title} ${block.body}`,
          });
        });
      }
    }
  }

  const baseExamIds = new Set(COMMON_TEST_EXAM_PRESETS.slice(0, 3).map((preset) => preset.id));
  for (const question of COMMON_TEST_DRILL_QUESTIONS) {
    const subject = topLevelSubject(question.subjectId);
    const rawType = subject === "english" ? "long-reading" : "common-test-guided";
    items.push({
      id: question.id,
      subject,
      unit: `共通テスト演習/${question.subjectId}/${question.sectionId}`,
      sourceFile: "src/data/common-test-drills.ts",
      sourceType: "common-test-drill",
      rawDifficulty: question.difficulty,
      difficulty: normalizeDifficulty(question.difficulty),
      rawQuestionType: rawType,
      questionType: subject === "english" ? "長文読解" : "大問誘導",
      publicationStatus: "public",
      relatedCourseId: null,
      isScorable: true,
      promptForHash: `${question.passage ?? question.examPassage ?? question.sharedStem ?? ""} ${question.statement}`,
      sharedReference: baseExamIds.size ? "section drill and first mock exam" : undefined,
    });
  }

  for (const [examId, questions] of Object.entries(COMMON_TEST_EXAM_VARIANT_SETS)) {
    for (const question of questions) {
      const subject = topLevelSubject(question.subjectId);
      items.push({
        id: question.id,
        subject,
        unit: `共通テスト演習/${question.subjectId}/${question.sectionId}`,
        sourceFile: "src/data/common-test-exam-sets.ts",
        sourceType: "mock-exam",
        rawDifficulty: question.difficulty,
        difficulty: normalizeDifficulty(question.difficulty),
        rawQuestionType: subject === "english" ? "long-reading" : "mock-slot",
        questionType: subject === "english" ? "長文読解" : "模試採点欄",
        publicationStatus: "public",
        relatedCourseId: null,
        isScorable: true,
        promptForHash: `${question.passage ?? question.examPassage ?? question.sharedStem ?? ""} ${question.statement}`,
        sharedReference: `mock preset ${examId}`,
      });
    }
  }

  for (const exam of COMMON_TEST_MOCK_EXAMS) addMockItems(items, exam, "src/data/common-test-mock-exams.ts", "mock-exam");
  for (const exam of SECTION_PRACTICE_EXAMS) addMockItems(items, exam, "src/data/common-test/section-practice/index.ts", "practice-set");

  for (const paper of EXAM_PAPERS) {
    const isSample = paper.id.includes("sample");
    for (const slot of paper.answerSlots) {
      items.push({
        id: `${paper.id}:${slot.id}`,
        subject: "math",
        unit: paper.sections.find((section) => section.id === slot.sectionId)?.title ?? slot.sectionId,
        sourceFile: "src/data/exam-papers.ts",
        sourceType: isSample ? "practice-set" : "mock-exam",
        rawDifficulty: "unset",
        difficulty: "未設定",
        rawQuestionType: "mock-slot",
        questionType: "模試採点欄",
        publicationStatus: "public",
        relatedCourseId: null,
        isScorable: true,
      });
    }
  }

  for (const category of EXAM_SET_CATEGORIES) {
    for (const exam of category.examSets) {
      for (const section of exam.sections) {
        for (const problem of section.problems) {
          for (const blank of problem.blanks) {
            items.push({
              id: `${exam.id}:${problem.id}:${blank.label}`,
              subject: "math",
              unit: section.title,
              sourceFile: "src/data/exam-sets.ts",
              sourceType: "mock-exam",
              rawDifficulty: "unset",
              difficulty: "未設定",
              rawQuestionType: "exam-blank",
              questionType: "模試採点欄",
              publicationStatus: exam.status === "available" && exam.manualReviewed ? "public" : "hidden",
              relatedCourseId: null,
              isScorable: true,
            });
          }
        }
      }
    }
  }

  for (const question of GRAMMAR_QUESTIONS) {
    items.push({
      id: question.id,
      subject: "english",
      unit: `文法/${question.topic}`,
      sourceFile: "src/data/grammar-drill.ts",
      sourceType: "single-question",
      rawDifficulty: "unset",
      difficulty: "未設定",
      rawQuestionType: "single-choice",
      questionType: "単一選択",
      publicationStatus: "public",
      relatedCourseId: null,
      isScorable: true,
      promptForHash: question.sentence,
    });
  }

  for (const card of VOCAB_CARDS) {
    items.push({
      id: card.id,
      subject: "english",
      unit: `英単語・語彙/${card.category}`,
      sourceFile: "src/data/vocab-flashcards.ts",
      sourceType: "self-rated-checkpoint",
      rawDifficulty: card.level,
      difficulty: normalizeDifficulty(card.level),
      rawQuestionType: "self-rating",
      questionType: "その他",
      publicationStatus: "public",
      relatedCourseId: null,
      isScorable: false,
    });
  }

  for (const problem of ENGLISH_USAGE_PROBLEMS) {
    items.push({
      id: problem.id,
      subject: "english",
      unit: `英単語・語彙/${problem.area}`,
      sourceFile: "src/data/english-usage.ts",
      sourceType: "single-question",
      rawDifficulty: problem.difficulty,
      difficulty: normalizeDifficulty(problem.difficulty),
      rawQuestionType: problem.questionType,
      questionType: normalizeQuestionType(problem.questionType),
      publicationStatus: problem.publicationStatus,
      relatedCourseId: null,
      isScorable: true,
      promptForHash: problem.statement,
    });
  }

  const addEnglishPassageItems = (
    problems: Array<{ id: string; level: string; questions: Array<{ questionText: string }> }>,
    sourceFile: string,
    sourceType: string,
    unit: string,
    rawType: string,
  ) => {
    for (const problem of problems) {
      problem.questions.forEach((question, index) => {
        items.push({
          id: `${problem.id}:q${index + 1}`,
          subject: "english",
          unit,
          sourceFile,
          sourceType,
          rawDifficulty: problem.level,
          difficulty: normalizeDifficulty(problem.level),
          rawQuestionType: rawType,
          questionType: "長文読解",
          publicationStatus: "public",
          relatedCourseId: null,
          isScorable: true,
          promptForHash: question.questionText,
        });
      });
    }
  };
  addEnglishPassageItems(SPEED_READING_PROBLEMS, "src/data/english-speed-reading.ts", "reading-passage", "速読", "long-reading");
  addEnglishPassageItems(COMPREHENSION_PROBLEMS, "src/data/english-comprehension.ts", "reading-passage", "長文読解/英文解釈", "long-reading");
  addEnglishPassageItems(MULTI_SOURCE_PROBLEMS, "src/data/english-multisource.ts", "multi-source-passage", "共通テスト演習/複数資料", "long-reading");

  for (const problem of INFORMATICS_PROBLEMS) {
    const course = courseIndex.get(problem.lessonId);
    if (!course) unresolvedReferences.push(`informatics problem ${problem.id} -> course ${problem.lessonId}`);
    const rawType = problem.kind === "trace" ? "table-graph" : problem.kind;
    items.push({
      id: problem.id,
      subject: "informatics",
      unit: course?.unit ?? problem.lessonId,
      sourceFile: "src/data/informatics/problems.ts",
      sourceType: "single-question",
      rawDifficulty: problem.difficulty,
      difficulty: normalizeDifficulty(problem.difficulty),
      rawQuestionType: rawType,
      questionType: normalizeQuestionType(rawType),
      publicationStatus: "beta",
      relatedCourseId: problem.lessonId,
      isScorable: true,
      promptForHash: problem.prompt,
    });
  }
  for (const exam of INFORMATICS_SECTION_PRACTICES) addMockItems(items, exam, "src/data/informatics/exam-practice.ts", "practice-set");

  for (const problem of JAPANESE_PROBLEMS) {
    for (const related of problem.relatedCourseIds) {
      if (!courseIndex.has(related)) unresolvedReferences.push(`japanese problem ${problem.id} -> course ${related}`);
    }
    items.push({
      id: problem.id,
      subject: "japanese",
      unit: problem.area,
      sourceFile: problem.passageId ? "src/data/japanese/reading/index.ts" : "src/data/japanese/index.ts",
      sourceType: problem.passageId ? "reading-passage" : "single-question",
      rawDifficulty: problem.difficulty,
      difficulty: normalizeDifficulty(problem.difficulty),
      rawQuestionType: problem.questionType,
      questionType: problem.passageId ? "長文読解" : normalizeQuestionType(problem.questionType),
      publicationStatus: "beta",
      relatedCourseId: problem.relatedCourseIds[0] ?? null,
      isScorable: true,
      promptForHash: `${problem.passage} ${problem.prompt}`,
    });
  }

  return { items, unresolvedReferences: [...new Set(unresolvedReferences)].sort() };
}

function finalizeItems(drafts: DraftItem[]): InventoryItem[] {
  const idGroups = new Map<string, number[]>();
  const hashGroups = new Map<string, number[]>();
  drafts.forEach((item, index) => {
    const idKey = `${item.subject}:${item.id}`;
    idGroups.set(idKey, [...(idGroups.get(idKey) ?? []), index]);
    const hash = item.promptForHash ? hashPrompt(item.promptForHash) : null;
    if (hash) hashGroups.set(`${item.subject}:${hash}`, [...(hashGroups.get(`${item.subject}:${hash}`) ?? []), index]);
  });

  const duplicateMeta: Array<{
    status: DuplicateStatus;
    group: string;
    counted: boolean;
  }> = drafts.map((item) => ({
    status: item.sharedReference ? ("shared reference" as const) : ("unique" as const),
    group: item.sharedReference ? `shared-reference:${item.sharedReference}` : "unique",
    counted: item.isScorable,
  }));

  for (const [group, indexes] of idGroups) {
    if (indexes.length < 2) continue;
    indexes.forEach((index, position) => {
      duplicateMeta[index] = { status: "exact duplicate", group: `exact-id:${group}`, counted: drafts[index].isScorable && position === 0 };
    });
  }
  for (const [group, indexes] of hashGroups) {
    const eligible = indexes.filter((index) => duplicateMeta[index].status !== "exact duplicate");
    if (eligible.length < 2) continue;
    eligible.forEach((index, position) => {
      duplicateMeta[index] = { status: "exact duplicate", group: `exact-content:${group}`, counted: drafts[index].isScorable && position === 0 };
    });
  }

  return drafts.map((draft, index) => ({
    id: draft.id,
    subject: draft.subject,
    unit: draft.unit,
    sourceFile: draft.sourceFile,
    sourceType: draft.sourceType,
    rawDifficulty: draft.rawDifficulty,
    difficulty: draft.difficulty,
    rawQuestionType: draft.rawQuestionType,
    questionType: draft.questionType,
    publicationStatus: draft.publicationStatus,
    relatedCourseId: draft.relatedCourseId,
    isScorable: draft.isScorable,
    isCounted: duplicateMeta[index].counted,
    duplicateStatus: duplicateMeta[index].status,
    duplicateGroup: duplicateMeta[index].group,
  }));
}

function subjectContainerStats(subjectId: InventorySubjectId) {
  const courseTracks = COURSE_SUBJECTS.filter((subject) => subject.parentSubjectId === subjectId);
  const courseCount = courseTracks.reduce((sum, subject) => sum + subject.units.reduce((unitSum, unit) => unitSum + unit.lessons.length, 0), 0);
  if (subjectId === "math") {
    const commonTestMocks = COMMON_TEST_EXAM_PRESETS.filter((preset) => preset.subjectId.startsWith("math"));
    const basePracticeSections = COMMON_TEST_EXAM_PRESETS.slice(0, 3)
      .filter((preset) => preset.subjectId.startsWith("math"))
      .reduce((sum, preset) => sum + preset.sectionIds.length, 0);
    const examSets = EXAM_SET_CATEGORIES.flatMap((category) => category.examSets);
    const fullPapers = EXAM_PAPERS.filter((paper) => !paper.id.includes("sample"));
    const samplePapers = EXAM_PAPERS.filter((paper) => paper.id.includes("sample"));
    return {
      courseCount,
      courseTrackCount: courseTracks.length,
      passageCount: 0,
      practiceSetCount: SECTION_PRACTICE_EXAMS.length + basePracticeSections + samplePapers.length,
      mockExamCount: commonTestMocks.length + COMMON_TEST_MOCK_EXAMS.filter((exam) => exam.subject === "math-1a").length + fullPapers.length + examSets.length,
    };
  }
  if (subjectId === "english") {
    const englishPresets = COMMON_TEST_EXAM_PRESETS.filter((preset) => preset.subjectId === "english-reading");
    const baseEnglishSections = englishPresets[0]?.sectionIds.length ?? 0;
    const mockPassages = englishPresets.reduce((sum, preset) => sum + preset.sectionIds.length, 0);
    return {
      courseCount,
      courseTrackCount: courseTracks.length,
      passageCount: SPEED_READING_PROBLEMS.length + COMPREHENSION_PROBLEMS.length + MULTI_SOURCE_PROBLEMS.length + mockPassages,
      practiceSetCount: SPEED_READING_PROBLEMS.length + COMPREHENSION_PROBLEMS.length + MULTI_SOURCE_PROBLEMS.length + 2 + baseEnglishSections,
      mockExamCount: englishPresets.length,
    };
  }
  if (subjectId === "informatics") {
    return { courseCount, courseTrackCount: courseTracks.length, passageCount: 0, practiceSetCount: INFORMATICS_SECTION_PRACTICES.length, mockExamCount: 1 };
  }
  return { courseCount, courseTrackCount: courseTracks.length, passageCount: JAPANESE_READING_PASSAGES.length, practiceSetCount: JAPANESE_READING_PASSAGES.length, mockExamCount: 0 };
}

function buildSubjectSummary(subjectId: InventorySubjectId, items: InventoryItem[], unresolvedReferences: string[]): SubjectSummary {
  const subject = SUBJECTS.find((candidate) => candidate.id === subjectId)!;
  const subjectItems = items.filter((item) => item.subject === subjectId);
  const scorable = subjectItems.filter((item) => item.isScorable && item.isCounted);
  const duplicateIds = countBy(subjectItems, (item) => item.id);
  const normalized = Object.fromEntries(normalizedDifficultyOrder.map((difficulty) => [difficulty, scorable.filter((item) => item.difficulty === difficulty).length]));
  const ratios = Object.fromEntries(normalizedDifficultyOrder.map((difficulty) => [difficulty, scorable.length ? Number((((normalized[difficulty] ?? 0) / scorable.length) * 100).toFixed(1)) : 0]));
  const containers = subjectContainerStats(subjectId);
  return {
    subjectId,
    subjectName: subject.name,
    publicationStatus: subject.status,
    ...containers,
    scorableQuestionCount: scorable.length,
    nonScorableCheckpointCount: subjectItems.filter((item) => !item.isScorable && item.sourceType.includes("checkpoint")).length,
    referenceQuestionCount: subjectItems.filter((item) => !item.isScorable && item.sourceType === "reference-example").length,
    mockExamScoringItemCount: scorable.filter(
      (item) => item.sourceType === "mock-exam" || item.sourceType === "common-test-drill",
    ).length,
    difficultyBreakdown: { normalized, raw: countBy(scorable, (item) => item.rawDifficulty), ratios },
    questionTypeBreakdown: countBy(scorable, (item) => item.questionType),
    unitBreakdown: countBy(scorable, (item) => item.unit),
    sourceFileBreakdown: countBy(scorable, (item) => item.sourceFile),
    duplicateIdCount: Object.values(duplicateIds).filter((count) => count > 1).length,
    unresolvedReferenceCount: unresolvedReferences.filter((reference) => reference.startsWith(subjectId === "math" ? "math " : subjectId === "informatics" ? "informatics " : subjectId === "japanese" ? "japanese " : "english ")).length,
    missingMetadataCount: scorable.filter((item) => item.difficulty === "未設定" || item.questionType === "未設定" || !item.unit).length,
  };
}

export function buildContentInventory(gitCommit: string, generatedAt = new Date().toISOString()): ContentInventory {
  const draft = buildDraftItems();
  const items = finalizeItems(draft.items);
  const subjects = SUBJECT_IDS.map((subjectId) => buildSubjectSummary(subjectId, items, draft.unresolvedReferences));
  const sum = (key: keyof SubjectSummary) => subjects.reduce((total, subject) => total + Number(subject[key]), 0);
  const targetPlans: TargetPlan[] = [
    { id: "A", name: "共通テスト特化型", targets: { math: 900, english: 850, informatics: 550, japanese: 700 }, total: 3000, merit: "既存の共通テスト演習・模試基盤を再利用し、4教科の得点力へ直結する。", demerit: "高難度数学と英語リスニングは後順位になる。", workload: "中〜大。文章・大問・模試の人間レビュー比率が高い。", fit: "最適。現在の模試・大問導線と最も整合する。" },
    { id: "B", name: "4教科均衡型", targets: { math: 750, english: 750, informatics: 750, japanese: 750 }, total: 3000, merit: "教科間の見た目と学習量が均衡する。", demerit: "情報Ⅰへ相対的に多く投資し、数学・英語の範囲密度が下がる。", workload: "大。情報Ⅰの新規大問・模試制作が多い。", fit: "良いが、受験上の配点・範囲差を反映しにくい。" },
    { id: "C", name: "数学・英語重点型", targets: { math: 1050, english: 950, informatics: 450, japanese: 550 }, total: 3000, merit: "主要2教科の単元密度と難度幅を最大化できる。", demerit: "beta教科の完成感と共通テスト4教科体験が弱くなる。", workload: "中〜大。数学の採点UI整備が先行条件。", fit: "名称との相性は良いが、現在の4教科方針には偏る。" },
  ];
  return {
    generatedAt,
    gitCommit,
    countingRules: [
      "ユーザーが解答でき、正答または採点基準があり、独立得点になる項目だけを採点問題とする。",
      "模試は独立した scoringGroup または実際の採点欄を1問とする。",
      "大問演習と模試が同じIDを参照する場合は shared reference とし、採点問題数は1回だけ数える。",
      "講義内チェック、自己申告フラッシュカード、解答入力のない数学解説問題は別集計する。",
      "60文字未満の定型文は内容ハッシュによる重複判定から除外する。",
    ],
    totals: {
      scorableQuestionCount: sum("scorableQuestionCount"),
      courseCount: sum("courseCount"),
      courseTrackCount: sum("courseTrackCount"),
      passageCount: sum("passageCount"),
      practiceSetCount: sum("practiceSetCount"),
      mockExamCount: sum("mockExamCount"),
      mockExamScoringItemCount: sum("mockExamScoringItemCount"),
      nonScorableCheckpointCount: sum("nonScorableCheckpointCount"),
      referenceQuestionCount: sum("referenceQuestionCount"),
      duplicateIdCount: sum("duplicateIdCount"),
      exactDuplicateCount: new Set(
        items
          .filter((item) => item.duplicateStatus === "exact duplicate")
          .map((item) => item.duplicateGroup),
      ).size,
      sharedReferenceCount: items.filter((item) => item.duplicateStatus === "shared reference").length,
      probableDuplicateCount: items.filter((item) => item.duplicateStatus === "probable duplicate").length,
      unresolvedReferenceCount: draft.unresolvedReferences.length,
      missingMetadataCount: sum("missingMetadataCount"),
    },
    subjects,
    items,
    targetPlans,
    recommendedPlan: "A",
    unresolvedReferences: draft.unresolvedReferences,
  };
}

export function buildCombinedContentInventory(
  gitCommit: string,
  generatedAt = new Date().toISOString(),
): CombinedContentInventory {
  const highSchool = buildContentInventory(gitCommit, generatedAt);
  const elementary = buildElementaryContentInventory();
  const highSchoolProblemCount = highSchool.totals.scorableQuestionCount;
  const elementaryProblemCount = elementary.totals.problemCount;
  return Object.freeze({
    generatedAt,
    gitCommit,
    highSchool,
    elementary,
    combined: Object.freeze({
      highSchoolProblemCount,
      elementaryProblemCount,
      problemCount: highSchoolProblemCount + elementaryProblemCount,
    }),
  });
}

export function buildPersistedContentInventory(
  inventory: CombinedContentInventory,
): PersistedContentInventory {
  return {
    ...inventory.highSchool,
    highSchool: {
      schoolLevel: "highSchool",
      problemCount: inventory.highSchool.totals.scorableQuestionCount,
      subjects: inventory.highSchool.subjects.map((subject) => ({
        subjectId: subject.subjectId,
        subjectName: subject.subjectName,
        problemCount: subject.scorableQuestionCount,
      })),
    },
    elementary: inventory.elementary,
    combined: inventory.combined,
  };
}

function markdownTable(headers: string[], rows: Array<Array<string | number>>) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

export function renderContentInventoryMarkdown(inventory: ContentInventory): string {
  const subjectRows = inventory.subjects.map((subject) => [subject.subjectName, subject.publicationStatus, subject.courseCount, subject.scorableQuestionCount, subject.nonScorableCheckpointCount, subject.referenceQuestionCount, subject.passageCount, subject.practiceSetCount, subject.mockExamCount]);
  const difficultyRows = inventory.subjects.flatMap((subject) => normalizedDifficultyOrder.map((difficulty) => [subject.subjectName, difficulty, subject.difficultyBreakdown.normalized[difficulty] ?? 0, `${subject.difficultyBreakdown.ratios[difficulty] ?? 0}%`]));
  const typeRows = inventory.subjects.flatMap((subject) => Object.entries(subject.questionTypeBreakdown).map(([type, count]) => [subject.subjectName, type, count]));
  const planRows = inventory.targetPlans.map((plan) => [plan.id, plan.name, plan.targets.math, plan.targets.english, plan.targets.informatics, plan.targets.japanese, plan.total, plan.merit, plan.demerit, plan.workload, plan.fit]);
  const current = Object.fromEntries(inventory.subjects.map((subject) => [subject.subjectId, subject.scorableQuestionCount])) as Record<InventorySubjectId, number>;
  const coverageRows: Array<[string, string[]]> = [
    ["数学", ["数と式", "集合と命題", "二次関数", "図形と計量", "データの分析", "場合の数", "確率", "図形の性質", "数学ⅠA共通テスト演習", "大問別演習", "模試", "その他実装済み分野"]],
    ["英語", ["英単語・語彙", "文法", "語法", "英文解釈", "長文読解", "リスニング", "速読", "共通テスト演習", "模試", "その他実装済み分野"]],
    ["情報Ⅰ", ["情報社会", "情報デザイン", "デジタル表現", "コンピュータ", "ネットワーク", "セキュリティ", "データ活用", "プログラミング", "単問", "大問別演習", "模試"]],
    ["国語", ["現代文語彙", "現代文読解", "古文", "漢文", "講座問題", "読解文章", "今後必要な大問演習", "今後必要な模試"]],
  ];
  const coverage = coverageRows.flatMap(([subjectName, labels]) => {
    const subject = inventory.subjects.find((candidate) => candidate.subjectName === subjectName)!;
    return labels.map((label) => {
      const unitAlias: Record<string, string> = {
        現代文語彙: "modern-vocabulary",
        現代文読解: "modern-reading",
        古文: "classical-japanese",
        漢文: "kanbun",
      };
      let count = Object.entries(subject.unitBreakdown)
        .filter(([unit]) => unit.includes(unitAlias[label] ?? label.replace("数学ⅠA", "math-1a")) || unit.includes(label))
        .reduce((sum, [, value]) => sum + value, 0);
      if (label === "単問") count = inventory.items.filter((item) => item.subject === subject.subjectId && item.isCounted && item.sourceType === "single-question").length;
      if (label === "大問別演習") count = inventory.items.filter((item) => item.subject === subject.subjectId && item.isCounted && item.sourceType === "practice-set").length;
      if (label === "模試") count = subject.mockExamScoringItemCount;
      if (label === "数学ⅠA共通テスト演習") count = inventory.items.filter((item) => item.subject === "math" && item.isCounted && item.unit.includes("math-1a") && ["common-test-drill", "mock-exam"].includes(item.sourceType)).length;
      if (label === "講座問題") count = inventory.items.filter((item) => item.subject === "japanese" && item.isCounted && item.sourceType === "single-question").length;
      if (label === "読解文章") count = subject.passageCount;
      if (label.startsWith("今後必要な")) count = 0;
      return [subjectName, label, count];
    });
  });
  const unitTables = inventory.subjects.map((subject) => `### ${subject.subjectName}\n\n${markdownTable(["既存unit ID/名称", "採点問題数"], Object.entries(subject.unitBreakdown).map(([unit, count]) => [unit, count]))}`).join("\n\n");
  const sourceRows = inventory.subjects.flatMap((subject) => Object.entries(subject.sourceFileBreakdown).map(([file, count]) => [subject.subjectName, `\`${file}\``, count]));
  const publicationRows = inventory.subjects.map((subject) => [subject.subjectName, subject.publicationStatus, inventory.items.filter((item) => item.subject === subject.subjectId && ["public", "published", "available"].includes(item.publicationStatus) && item.isCounted).length, inventory.items.filter((item) => item.subject === subject.subjectId && item.publicationStatus === "beta" && item.isCounted).length, inventory.items.filter((item) => item.subject === subject.subjectId && ["hidden", "draft", "preparing"].includes(item.publicationStatus) && item.isCounted).length]);

  return `<!-- AUTO-GENERATED by npm run qa:content-inventory. Do not hand-edit sections 1-18. -->
# Cyber Math コンテンツ棚卸し

生成日時: ${inventory.generatedAt}
Git commit: \`${inventory.gitCommit}\`

この文書は全体が自動生成領域です。計画を変更する場合は \`scripts/content-inventory-lib.ts\` を編集して再生成してください。問題本文・正答本文は出力しません。

## 1. 集計ルール

${inventory.countingRules.map((rule) => `- ${rule}`).join("\n")}

「採点問題」「教材内確認」「参考例題」を分離し、PDFとWeb、演習と模試の共有参照は重複計上しません。

## 2. 現在の全体数

${markdownTable(["採点問題", "講座", "文章", "練習セット", "模試", "模試採点項目", "教材内確認", "参考例題"], [[inventory.totals.scorableQuestionCount, inventory.totals.courseCount, inventory.totals.passageCount, inventory.totals.practiceSetCount, inventory.totals.mockExamCount, inventory.totals.mockExamScoringItemCount, inventory.totals.nonScorableCheckpointCount, inventory.totals.referenceQuestionCount]])}

## 3. 教科別集計

${markdownTable(["教科", "公開状態", "講座", "採点問題", "教材内確認", "参考例題", "文章", "練習セット", "模試"], subjectRows)}

## 4. 単元別集計

既存ID・名称を保持した詳細です。要求された人間向け分類のカバレッジ表も併記します。

${markdownTable(["教科", "人間向け分類", "現在の採点問題数"], coverage)}

${unitTables}

## 5. 難易度分析

${markdownTable(["教科", "共通分類", "問題数", "比率"], difficultyRows)}

元の難易度値はJSONの \`difficultyBreakdown.raw\` と各itemの \`rawDifficulty\` に保持します。未設定は数学の採点欄と英語文法に集中しています。情報Ⅰ・国語は基礎〜共通テスト準備、英語は長文の標準〜高難度が厚く、数学は採点可能な単元別単問が存在しないことが最大の偏りです。

- 数学: 最大単元は「第2問 二次関数・データの分析」40件、最小は「数と式 / 集合と命題」7件。単元別採点単問が0件で、既存425件は大問誘導・模試採点欄だけです。
- 英語: 長文読解438件に対して客観採点語彙・語法・リスニングは0件。英文解釈と長文読解は同じ165件を観点別に参照するため、合計値として足しません。
- 情報Ⅰ: ネットワーク25件が最大、セキュリティ4件が最小。単一選択48件に比べ、プログラム読解1件・表グラフ読解4件が不足しています。
- 国語: 現代文読解100件に対し、現代文語彙・古文・漢文は各20件。大問誘導・模試採点欄は0件です。

## 6. 問題形式分析

${markdownTable(["教科", "共通形式", "問題数"], typeRows)}

- 数学: 模試採点欄と大問誘導へ偏り、採点可能な単元別単問が不足。
- 英語: 長文読解が厚い一方、客観採点できる語彙・語法・リスニングが不足。
- 情報Ⅰ: 単一選択が中心で、プログラム読解・表グラフ読解・数値入力の追加余地が大きい。
- 国語: 単問と文章付属設問はあるが、大問演習・模試が未実装。

## 7. 重複候補

${markdownTable(["区分", "件数"], [["exact duplicate", inventory.totals.exactDuplicateCount], ["shared reference", inventory.totals.sharedReferenceCount], ["probable duplicate", inventory.totals.probableDuplicateCount], ["unique", inventory.items.filter((item) => item.duplicateStatus === "unique").length]])}

shared reference は同じ問題を大問演習と模試などで参照する回数で、採点問題数には1回だけ計上しています。内容ハッシュは60文字以上に限定し、自動削除・自動統合はしません。

## 8. metadata不足

metadata不足は ${inventory.totals.missingMetadataCount} 件、参照切れは ${inventory.totals.unresolvedReferenceCount} 件です。詳細な参照切れはJSONの \`unresolvedReferences\` にのみ出力します。metadata不足は \`difficulty=未設定\`、形式未設定、unit欠落のいずれかで、現在は既存の模試採点欄と文法ドリルの難易度未定義が中心です。

${markdownTable(["教科", "metadata不足", "duplicate ID", "参照切れ"], inventory.subjects.map((subject) => [subject.subjectName, subject.missingMetadataCount, subject.duplicateIdCount, subject.unresolvedReferenceCount]))}

### source file別

${markdownTable(["教科", "source file", "採点問題数"], sourceRows)}

## 9. 公開状態別集計

${markdownTable(["教科", "教科状態", "public採点", "beta採点", "hidden/draft採点"], publicationRows)}

hidden/draftもコード棚卸しには含めますが、公開数とは分離しています。

## 10. 3,000問目標の3案

${markdownTable(["案", "名称", "数学", "英語", "情報Ⅰ", "国語", "合計", "メリット", "デメリット", "作業量", "適合性"], planRows)}

## 11. 推奨案

推奨は **A: 共通テスト特化型**（数学900・英語850・情報Ⅰ550・国語700）です。現在の大問演習・模試・復習導線を再利用でき、beta教科も完成形へ近づけられます。

目標内訳は、数学「単元別単問420 / 大問240 / 模試180 / 復習60」、英語「単問220 / 大問100 / 文章付属420 / 模試90 / 復習20」、情報Ⅰ「単問250 / 大問140 / 文章付属20 / 模試100 / 復習40」、国語「単問260 / 大問80 / 文章付属280 / 模試60 / 復習20」です。同一問題の再利用は含めません。

## 12. Tier 1〜Tier 4

${markdownTable(["Tier", "教科・単元", "現在", "目標", "追加", "形式", "難易度", "作業量/commit", "先行条件", "著作権", "QA・公開条件"], [
  ["Tier 1", "数学・単元別採点問題", 0, 240, 240, "単一選択/数値/短答", "基礎40% 標準40% 実戦20%", "20〜40問/commit × 7", "共通採点型と回答UI", "完全オリジナル", "型検査・採点fixture・人間レビュー後public"],
  ["Tier 1", "国語・大問演習/模試", 0, 140, 140, "長文/対応/大問誘導", "標準40% 実戦60%", "4〜8文章または2〜4大問/commit", "大問/模試型と履歴UI", "原文はオリジナルか権利確認", "根拠範囲・正答・誤答理由レビュー後beta"],
  ["Tier 2", "情報Ⅰ・データ/プログラミング", current.informatics, 360, Math.max(0, 360-current.informatics), "表グラフ/プログラム/数値", "標準40% 実戦60%", "20〜40問または2〜4大問/commit", "既存型を拡張", "図表も自作", "トレース検算・模試配点確認"],
  ["Tier 2", "英語・共通テスト/語彙語法", current.english, 680, Math.max(0, 680-current.english), "長文/情報照合/客観語彙", "標準45% 実戦45% 高難度10%", "4〜8文章または20〜50問/commit", "語彙客観問題型", "英文・資料を自作", "英文校閲・根拠照合後public"],
  ["Tier 3", "4教科・復習派生", 0, 140, 140, "誤答原因別の新規派生", "基礎30% 標準50% 実戦20%", "20〜30問/commit", "親問題ID/派生ID", "親問題のコピー再利用禁止", "重複hash・独立採点確認"],
  ["Tier 4", "数学高難度/英語リスニング", 0, 180, 180, "高難度/音声", "高難度中心", "20問または1音声セット/commit", "音声asset・採点型", "音声・台本の権利確認", "専門レビューとa11y後公開"],
])}

## 13. 短期ロードマップ

次の5作業で採点問題を約150〜220問追加し、1,350〜1,420問を目指します。公開状態は既存public/betaを維持し、各commitで型・専用QA・重複・参照を確認します。

1. 数学IAの採点可能単問40問と共通採点型を追加。
2. 国語の現代文・複数資料6文章（30問）と大問2セットを追加。
3. 情報Ⅰのデータ活用・プログラミング40問を追加。
4. 英語の客観語彙・語法40問を追加。
5. 国語の古文・漢文大問4セット（20〜30採点項目）を追加。

人間レビューは数学の採点基準、英文、国語の本文根拠、情報のトレースを必須とします。想定リスクは採点UIの型分散、文章著作権、類似問題の量産です。

## 14. 中期ロードマップ

合計1,500問では目安を「数学470 / 英語560 / 情報Ⅰ250 / 国語220」とします。模試16回前後、大問演習65セット前後を目標に、数学単問UIと国語模試基盤を完成させます。public/betaの区分は維持し、教科別専用QA、全registry、重複hash、参照検査を必須にします。全文章・全模試と高難度問題を人間レビュー対象とし、速度優先の一括生成を避けます。

## 15. 長期ロードマップ

3,000問は推奨案Aの「数学900 / 英語850 / 情報Ⅰ550 / 国語700」とします。模試は教科合計32〜40回、大問演習は120〜160セットを目安にします。公開はbatch単位で品質ゲートを通し、beta教科は単元カバレッジ・模試・復習導線が揃った段階でのみ再評価します。主なリスクは文章と図表の著作権、難易度の名目化、派生問題の実質重複、模試配点の不整合です。

## 16. 次に実装すべき作業

最優先は「数学の単元別問題を本当に採点可能にする共通型・回答UI」を独立工程で設計することです。その後は短期ロードマップの5作業を、単問20〜50問、文章4〜8本、大問2〜4セット、模試1回の上限で分割します。

## 17. 集計コマンド

\`npm run qa:content-inventory\` でJSONとこのMarkdownを再生成します。専用検査は \`npm run qa:content-inventory:test\` です。

## 18. 更新方法

1. 新しいregistryを \`scripts/content-inventory-lib.ts\` の対応adapterへ追加する。
2. 独立採点ID、unit、元難易度、元形式、公開状態、関連講座IDを渡す。
3. 集計コマンドと専用検査を実行する。
4. JSON差分で件数、重複、参照切れ、metadata不足を確認する。
5. 問題本文ではなくadapter・目標定数を変更してこの文書を再生成する。
`;
}

export function renderCombinedContentInventoryMarkdown(
  inventory: CombinedContentInventory,
): string {
  const elementary = inventory.elementary;
  const subjectRows = elementary.subjects.map((subject) => [
    subject.subject ?? "-",
    subject.lessonCount,
    subject.problemCount,
    subject.visualAssetCount,
    subject.lessonCoverage.partial,
    subject.assessmentCoverage.partial,
    subject.publicationStatus,
    subject.reviewStatus,
  ]);
  return `${renderContentInventoryMarkdown(inventory.highSchool).trimEnd()}

## 19. 小学生版と全体集計

高校版と hidden の小学生版を別の school level として集計し、高校版の従来値を維持します。小学生版の正式 lesson registry だけを対象にし、prototype showcase は含めません。

${markdownTable(["区分", "採点可能問題"], [
  ["高校版", inventory.combined.highSchoolProblemCount],
  ["小学生版", inventory.combined.elementaryProblemCount],
  ["全体", inventory.combined.problemCount],
])}

${markdownTable(["小学生版教科ID", "lesson", "problem", "approved asset", "lesson partial", "assessment partial", "公開状態", "review"], subjectRows)}

- 小学生版 unit: ${elementary.totals.unitCount}
- 小学生版 lesson: ${elementary.totals.lessonCount}
- 問題形式: single-choice ${elementary.totals.singleChoiceCount} / multiple-choice ${elementary.totals.multipleChoiceCount} / numeric-input ${elementary.totals.numericInputCount}
- 難易度: basic ${elementary.totals.basicCount} / standard ${elementary.totals.standardCount}
- curriculum参照: entry ${elementary.totals.curriculumEntryReferenceCount} / objective ${elementary.totals.curriculumObjectiveReferenceCount}
`;
}
