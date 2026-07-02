import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";
import { CT_Q1_FRONT_ALGEBRA_LOGIC_ABS } from "./q1-front-algebra-logic-abs";
import { CT_Q1_BACK_GEOMETRY_MEASUREMENT } from "./q1-back-geometry-measurement";
import { CT_Q2_FRONT_QUADRATIC_1 } from "./q2-front-quadratic-1";
import { CT_Q2_FRONT_QUADRATIC_TRAPEZOID } from "./q2-front-quadratic-trapezoid";
import { CT_Q2_BACK_DATA_ANALYSIS } from "./q2-back-data-analysis";
import { CT_Q3_PLANE_GEOMETRY } from "./q3-plane-geometry";
import { CT_Q3_SPACE_GEOMETRY } from "./q3-space-geometry";
import { CT_Q4_PROBABILITY } from "./q4-probability";

// 共通テスト対策タブ「問題解体型講座」。public/problem1a/ のオリジナル問題PDFを公開用の正本とし、
// 見るべきポイント・本番での思考順・詳しい解説・よくあるミス・関連導線をまとめる。
// PDF本文は改変しない。problem1a/ はローカル投入用フォルダとしてgit管理しない。
export const COMMON_TEST_PROBLEM_LECTURES: CommonTestProblemLecture[] = [
  CT_Q1_FRONT_ALGEBRA_LOGIC_ABS,
  CT_Q1_BACK_GEOMETRY_MEASUREMENT,
  CT_Q2_FRONT_QUADRATIC_1,
  CT_Q2_FRONT_QUADRATIC_TRAPEZOID,
  CT_Q2_BACK_DATA_ANALYSIS,
  CT_Q3_PLANE_GEOMETRY,
  CT_Q3_SPACE_GEOMETRY,
  CT_Q4_PROBABILITY,
];

export function getCommonTestProblemLecture(id: string): CommonTestProblemLecture | undefined {
  return COMMON_TEST_PROBLEM_LECTURES.find((lecture) => lecture.id === id);
}

