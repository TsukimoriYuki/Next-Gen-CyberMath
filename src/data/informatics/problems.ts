import {
  assertUniqueRegistryKeys,
  indexByUniqueRegistryKey,
} from "@/lib/registry";
import type { InformaticsProblem } from "./problem-types";
import { INFORMATICS_DIGITAL_DATA_PROBLEMS } from "./problems-digital-data";
import { INFORMATICS_SECURITY_DESIGN_PROBLEMS } from "./problems-security-design";
import { INFORMATICS_SOCIETY_PROBLEMS } from "./problems-society";
import { PROGRAMMING_PROBLEMS } from "./problems-programming";
import { NETWORK_DATA_PROBLEMS } from "./problems-network-data";
import { INFORMATICS_UNIT_PRACTICE_PROBLEMS } from "./unit-practice";

// 情報Ⅰ 演習問題 registry。
// 詳細な整合性（各講座5問・難易度内訳・正答の存在など）は
// scripts/check-informatics.ts（npm run qa:informatics）が検証する。

export const INFORMATICS_PROBLEMS: readonly InformaticsProblem[] = [
  ...INFORMATICS_SOCIETY_PROBLEMS,
  ...INFORMATICS_SECURITY_DESIGN_PROBLEMS,
  ...INFORMATICS_DIGITAL_DATA_PROBLEMS,
  ...PROGRAMMING_PROBLEMS,
  ...NETWORK_DATA_PROBLEMS,
  ...INFORMATICS_UNIT_PRACTICE_PROBLEMS,
];

assertUniqueRegistryKeys(
  INFORMATICS_PROBLEMS,
  (problem) => problem.id,
  "informatics problem ID registry",
);
assertUniqueRegistryKeys(
  INFORMATICS_PROBLEMS,
  (problem) => problem.slug ?? problem.id,
  "informatics problem slug registry",
);

const INFORMATICS_PROBLEMS_BY_ID = indexByUniqueRegistryKey(
  INFORMATICS_PROBLEMS,
  (problem) => problem.id,
  "informatics problem ID registry",
);

export function getInformaticsProblem(
  problemId: string,
): InformaticsProblem | undefined {
  return INFORMATICS_PROBLEMS_BY_ID[problemId];
}

export function getInformaticsProblemsByLesson(
  lessonId: string,
): InformaticsProblem[] {
  return INFORMATICS_PROBLEMS.filter((problem) => problem.lessonId === lessonId);
}

export function getNextInformaticsProblem(
  problemId: string,
): InformaticsProblem | undefined {
  const index = INFORMATICS_PROBLEMS.findIndex(
    (problem) => problem.id === problemId || problem.slug === problemId,
  );
  if (index < 0) return undefined;
  return INFORMATICS_PROBLEMS[(index + 1) % INFORMATICS_PROBLEMS.length];
}

export * from "./problem-types";
export * from "./problems-programming";
export * from "./problems-network-data";
export * from "./unit-practice";
