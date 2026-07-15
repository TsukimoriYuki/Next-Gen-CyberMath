import type { CourseSubject } from "@/types/course";
import { COMPUTER_DIGITAL_DATA_UNIT } from "./computer-digital-data";
import { INFORMATION_DESIGN_UNIT } from "./information-design";
import { INFORMATION_SOCIETY_UNIT } from "./information-society";

// 情報Ⅰの講座registry。親教科 "informatics" は subjects.ts で hidden のため、
// この course subject は production では公開されない（/courses/[subjectId] の
// layout guard が親教科の公開状態で判定する）。閲覧確認は local development で行う。

export const INFORMATICS_1_COURSE_SUBJECT: CourseSubject = {
  subjectId: "informatics-1",
  parentSubjectId: "informatics",
  subjectName: "情報Ⅰ",
  description:
    "情報社会の問題解決、情報モラル・セキュリティ、情報デザイン、コンピュータとデジタルデータの表現を、具体的な場面と計算で学びます。",
  color: "#0d9488",
  units: [
    INFORMATION_SOCIETY_UNIT,
    INFORMATION_DESIGN_UNIT,
    COMPUTER_DIGITAL_DATA_UNIT,
  ],
};

export * from "./computer-digital-data";
export * from "./information-design";
export * from "./information-society";
