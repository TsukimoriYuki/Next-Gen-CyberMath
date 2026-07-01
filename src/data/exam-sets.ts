import { STANDARD_PRIVATE_MATH_1A_001 } from "./exam-sets/standard-private-math-1a-001";

export type ExamSetCategoryId =
  | "standard-private"
  | "advanced-private"
  | "standard-national"
  | "advanced-national";

export type ExamSetStatus = "available" | "coming-soon";
export type ExamSetSubjectId = "math-1a" | "math-2bc" | "math-3c";

export type ExamSetBlank = {
  label: string;
  answer: string;
  points: number;
  placeholder?: string;
};

export type ExamSetProblem = {
  id: string;
  title: string;
  body: string[];
  blanks: ExamSetBlank[];
  explanation: string;
};

export type ExamSetSection = {
  id: string;
  title: string;
  points: number;
  description: string;
  problems: ExamSetProblem[];
};

export type ExamSet = {
  id: string;
  categoryId: ExamSetCategoryId;
  subjectId: ExamSetSubjectId;
  subjectTitle: string;
  roundTitle: string;
  title: string;
  description: string;
  targetLevel: string;
  durationMin: number;
  totalScore: number;
  expectedAverage: string;
  format: string;
  status: ExamSetStatus;
  sections: ExamSetSection[];
};

export type ExamSetCategory = {
  id: ExamSetCategoryId;
  title: string;
  subtitle: string;
  targetSchools: string;
  format: string;
  description: string;
  iconColorClass: string;
  accentTextClass: string;
  borderColorClass: string;
  examSets: ExamSet[];
};

export const EXAM_SET_CATEGORIES: ExamSetCategory[] = [
  {
    id: "standard-private",
    title: "中堅私立模試",
    subtitle: "Standard Private",
    targetSchools: "産近甲龍・日東駒専レベル",
    format: "穴埋め・短答形式中心",
    description:
      "標準問題を土台にしつつ、処理量と正確さを求める私立大レベルの実戦模試です。",
    iconColorClass: "bg-cyan-50 text-cyan-700",
    accentTextClass: "text-cyan-700",
    borderColorClass: "border-cyan-200",
    examSets: [STANDARD_PRIVATE_MATH_1A_001],
  },
  {
    id: "advanced-private",
    title: "上級私立模試",
    subtitle: "Advanced Private",
    targetSchools: "MARCH・関関同立・理科大上位など",
    format: "標準〜応用問題中心",
    description:
      "複数単元を横断する問題や、短時間での判断力を求める問題を想定した模試カテゴリです。",
    iconColorClass: "bg-fuchsia-50 text-fuchsia-700",
    accentTextClass: "text-fuchsia-700",
    borderColorClass: "border-fuchsia-200",
    examSets: [],
  },
  {
    id: "standard-national",
    title: "中堅国公立模試",
    subtitle: "Standard National",
    targetSchools: "地方国公立・中堅国公立など",
    format: "記述式・標準問題中心",
    description:
      "基本方針を答案として書く力を鍛えるための、国公立標準レベルの模試カテゴリです。",
    iconColorClass: "bg-emerald-50 text-emerald-700",
    accentTextClass: "text-emerald-700",
    borderColorClass: "border-emerald-200",
    examSets: [],
  },
  {
    id: "advanced-national",
    title: "難関国公立模試",
    subtitle: "Advanced National",
    targetSchools: "旧帝大・東工大・一橋大・神戸大・筑波大など",
    format: "記述式・応用融合問題",
    description:
      "発想力、論証力、計算の持久力を問う難関国公立向けの模試カテゴリです。",
    iconColorClass: "bg-amber-50 text-amber-700",
    accentTextClass: "text-amber-700",
    borderColorClass: "border-amber-200",
    examSets: [],
  },
];

export function getExamSetCategory(id: string): ExamSetCategory | undefined {
  return EXAM_SET_CATEGORIES.find((category) => category.id === id);
}

export function getExamSet(id: string): ExamSet | undefined {
  return EXAM_SET_CATEGORIES.flatMap((category) => category.examSets).find(
    (examSet) => examSet.id === id,
  );
}

export function getExamSetsBySubject(categoryId: string, subjectId: string): ExamSet[] {
  const category = getExamSetCategory(categoryId);
  return category?.examSets.filter((examSet) => examSet.subjectId === subjectId) ?? [];
}

export function getExamSetSubjects(categoryId: string) {
  const category = getExamSetCategory(categoryId);
  const subjectMap = new Map<
    string,
    { subjectId: ExamSetSubjectId; subjectTitle: string; count: number }
  >();

  for (const examSet of category?.examSets ?? []) {
    const current = subjectMap.get(examSet.subjectId);
    subjectMap.set(examSet.subjectId, {
      subjectId: examSet.subjectId,
      subjectTitle: examSet.subjectTitle,
      count: (current?.count ?? 0) + 1,
    });
  }

  return [...subjectMap.values()];
}
