import type { CourseSubject } from "@/types/course";
import { CLASSICAL_JAPANESE_UNIT } from "./classical-japanese";
import { KANBUN_UNIT } from "./kanbun";

export const JAPANESE_COURSE_SUBJECT: CourseSubject = {
  subjectId: "japanese",
  parentSubjectId: "japanese",
  subjectName: "国語",
  description: "文脈・文法・主語・論理関係から、本文根拠を言葉にして読む国語講座です。",
  color: "#9333ea",
  units: [KANBUN_UNIT, CLASSICAL_JAPANESE_UNIT],
};

export * from "./classical-japanese";
export * from "./kanbun";
