import {
  assertUniqueRegistryKeys,
  indexByUniqueRegistryKey,
} from "@/lib/registry";
import type { InformaticsProblem } from "./problem-types";
import { INFORMATICS_SECURITY_DESIGN_PROBLEMS } from "./problems-security-design";
import { INFORMATICS_SOCIETY_PROBLEMS } from "./problems-society";

// 情報Ⅰ 演習問題 registry。
// 詳細な整合性（各講座5問・難易度内訳・正答の存在など）は
// scripts/check-informatics.ts（npm run qa:informatics）が検証する。

export const INFORMATICS_PROBLEMS: readonly InformaticsProblem[] = [
  ...INFORMATICS_SOCIETY_PROBLEMS,
  ...INFORMATICS_SECURITY_DESIGN_PROBLEMS,
];

assertUniqueRegistryKeys(
  INFORMATICS_PROBLEMS,
  (problem) => problem.id,
  "informatics problem ID registry",
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

export * from "./problem-types";
