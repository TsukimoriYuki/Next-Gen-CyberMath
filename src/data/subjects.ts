import {
  assertUniqueRegistryKeys,
  indexByUniqueRegistryKey,
} from "@/lib/registry";

export type SubjectStatus = "public" | "beta" | "hidden";

export type SubjectCapabilities = Readonly<{
  courses: boolean;
  problems: boolean;
  exams: boolean;
  review: boolean;
}>;

export type SubjectConfig = Readonly<{
  id: string;
  name: string;
  shortName: string;
  href: `/${string}`;
  description: string;
  status: SubjectStatus;
  capabilities: SubjectCapabilities;
}>;

/**
 * Top-level subjects only. Course, problem, and exam details stay in their
 * existing domain registries so publication state has a single owner.
 */
export const SUBJECTS = [
  {
    id: "math",
    name: "数学",
    shortName: "数学",
    href: "/math",
    description: "講座、単元別演習、模試、復習をつなげて学ぶ高校数学。",
    status: "public",
    capabilities: {
      courses: true,
      problems: true,
      exams: true,
      review: true,
    },
  },
  {
    id: "english",
    name: "英語",
    shortName: "英語",
    href: "/english",
    description: "語彙、文法、読解、入試形式演習を段階的に学ぶ高校英語。",
    status: "public",
    capabilities: {
      courses: true,
      problems: true,
      exams: true,
      review: true,
    },
  },
  {
    id: "informatics",
    name: "情報Ⅰ",
    shortName: "情報",
    href: "/informatics",
    description:
      "情報社会、情報デザイン、セキュリティ、デジタル表現、プログラミング、ネットワーク、データ活用を学ぶ情報Ⅰ。",
    status: "beta",
    capabilities: {
      courses: true,
      problems: true,
      exams: false,
      review: false,
    },
  },
] as const satisfies readonly SubjectConfig[];

export type SubjectId = (typeof SUBJECTS)[number]["id"];

assertUniqueRegistryKeys(SUBJECTS, (subject) => subject.id, "subject ID registry");
assertUniqueRegistryKeys(SUBJECTS, (subject) => subject.href, "subject route registry");

export function filterVisibleSubjects<T extends SubjectConfig>(
  subjects: readonly T[],
): T[] {
  return subjects.filter(isVisibleSubject);
}

export function filterVisibleSubjectsByCapability<T extends SubjectConfig>(
  subjects: readonly T[],
  capability: keyof SubjectCapabilities,
): T[] {
  return subjects.filter(
    (subject) => isVisibleSubject(subject) && subject.capabilities[capability],
  );
}

export function isVisibleSubject(subject: SubjectConfig): boolean {
  return subject.status === "public" || subject.status === "beta";
}

export const PUBLIC_SUBJECTS = filterVisibleSubjects(SUBJECTS);

export const SUBJECTS_BY_ID = indexByUniqueRegistryKey(
  SUBJECTS,
  (subject) => subject.id,
  "subject ID registry",
);

export function getSubject(subjectId: string): SubjectConfig | undefined {
  return SUBJECTS.find((subject) => subject.id === subjectId);
}

export function requireSubject(subjectId: string): SubjectConfig {
  const subject = getSubject(subjectId);
  if (!subject) throw new Error(`subject registry is missing "${subjectId}"`);
  return subject;
}
