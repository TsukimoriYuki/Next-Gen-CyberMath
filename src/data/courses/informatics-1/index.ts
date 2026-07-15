import type { CourseSubject } from "@/types/course";
import { COMPUTER_DIGITAL_DATA_UNIT } from "./computer-digital-data";
import { INFORMATION_DESIGN_UNIT } from "./information-design";
import { INFORMATION_SOCIETY_UNIT } from "./information-society";
import { PROGRAMMING_ALGORITHMS_UNIT } from "./programming-algorithms";
import { NETWORK_DATA_USE_UNIT } from "./network-data-use";

// 情報Ⅰの講座registry。公開可否は親教科の状態と共通course publication guardで判定する。

export const INFORMATICS_1_COURSE_SUBJECT: CourseSubject = {
  subjectId: "informatics-1",
  parentSubjectId: "informatics",
  subjectName: "情報Ⅰ",
  description:
    "情報社会の問題解決、情報デザイン、セキュリティ、デジタル表現、プログラミング、ネットワーク、データ活用を、具体例と演習で学びます。",
  color: "#0d9488",
  units: [
    INFORMATION_SOCIETY_UNIT,
    INFORMATION_DESIGN_UNIT,
    COMPUTER_DIGITAL_DATA_UNIT,
    PROGRAMMING_ALGORITHMS_UNIT,
    NETWORK_DATA_USE_UNIT,
  ],
};

export * from "./computer-digital-data";
export * from "./information-design";
export * from "./information-society";
export * from "./programming-algorithms";
export * from "./network-data-use";
