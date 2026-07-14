import type { CommonTestScoringGroup } from "@/data/common-test-mock-exams";

function scoringGroup(
  id: string,
  points: number,
  rationale: string,
  correctAnswers: Record<string, string | number>,
): CommonTestScoringGroup {
  return {
    id,
    answerLabels: Object.keys(correctAnswers),
    points,
    correctAnswers,
    rationale,
  };
}

/**
 * Groups follow the numbered derivation steps in the source PDFs. A multi-slot
 * value (for example [キク]) stays atomic, while results from separate steps can
 * earn credit independently. Single-choice questions remain question-level.
 */
export const MANUAL_MOCK_SCORING_GROUPS: Readonly<
  Record<string, CommonTestScoringGroup[]>
> = {
  "m1a-manual-001-s1-1-rationalize": [
    scoringGroup("conjugates", 3, "The two conjugate forms are one rationalization step.", { ア: "2", イ: "3" }),
    scoringGroup("sum-product", 3, "The sum and product are the two derived symmetric values.", { ウ: "4", エ: "1" }),
  ],
  "m1a-manual-001-s1-1-recurrence": [
    scoringGroup("recurrence", 2, "Both coefficients define the recurrence relation.", { オ: "4", カ: "1" }),
    scoringGroup("s3", 2, "S3 is one multi-digit result.", { キク: "52" }),
    scoringGroup("s7", 4, "S7 is one multi-digit result reached by the recurrence.", { ケコサシス: "10084" }),
  ],
  "m1a-manual-001-s1-1-integer-part": [
    scoringGroup("integer-part", 4, "The five boxes encode one integer value.", { セソタチツ: "10083" }),
  ],
  "m1a-manual-001-s1-2-tower-first": [
    scoringGroup("distance-equation", 2, "The distance ratio and subtraction coefficient form one equation.", { ト: "√3", ナ: "1" }),
    scoringGroup("height", 3, "The coefficient and radical terms encode one height.", { ニヌ: "30", ネ: "3", ノ: "1" }),
  ],
  "m1a-manual-001-s1-2-tower-cosine": [
    scoringGroup("cosine-law", 2, "Both coefficients belong to the same cosine-law expression.", { ハ: "4", ヒ: "1" }),
    scoringGroup("height", 2, "The two boxes encode one height.", { フヘ: "10" }),
  ],
  "m1a-manual-001-s2-1-vertex": [
    scoringGroup("vertex", 4, "The two coordinates identify one vertex.", { ア: "a", イ: "1" }),
  ],
  "m1a-manual-001-s2-1-composite": [
    scoringGroup("range-f", 4, "The minimum and maximum define the range used by the next step.", { ウ: "1", エ: "5" }),
    scoringGroup("range-composite", 4, "The minimum and maximum are the paired result for the composite function.", { オ: "1", カキ: "10" }),
  ],
  "m1a-manual-001-s2-2-quartiles": [
    scoringGroup("median", 1, "The median is independently read from the ordered data.", { ケコ: "22" }),
    scoringGroup("quartiles", 2, "Q1 and Q3 jointly define the interquartile range.", { サシ: "17", スセ: "25" }),
    scoringGroup("iqr", 2, "The interquartile range is a separate calculation.", { ソ: "8" }),
    scoringGroup("outlier", 2, "The two boxes encode the identified outlier.", { タチ: "40" }),
  ],
  "m1a-manual-001-s2-2-outlier-change": [
    scoringGroup("median-without-outlier", 2, "The two boxes encode the recalculated median.", { ツテ: "21" }),
    scoringGroup("mean-direction", 2, "The mean comparison is a separate interpretation.", { ト: "1" }),
    scoringGroup("candidate-count", 3, "The final count comes from the new-value condition.", { ナ: "0" }),
  ],
  "m1a-manual-001-s3-radius": [
    scoringGroup("section-radius", 5, "The two boxes encode one circle radius.", { アイ: "12" }),
  ],
  "m1a-manual-001-s3-tangent": [
    scoringGroup("tangent-length", 4, "The two boxes encode one tangent length.", { ウエ: "16" }),
  ],
  "m1a-manual-001-s3-power": [
    scoringGroup("secant-length", 4, "The two boxes encode one secant length.", { オカ: "32" }),
  ],
  "m1a-manual-001-s3-distance-formula": [
    scoringGroup("plane-distance", 3, "The selected option is the independently computed plane distance.", { キ: "2" }),
    scoringGroup("general-formula", 4, "The three boxes encode the constant in the general section formula.", { クケコ: "169" }),
  ],
  "m1a-manual-001-s4-order": [
    scoringGroup("total-arrangements", 1, "The three boxes encode the total permutation count.", { アイウ: "360" }),
    scoringGroup("smaller-first-digit", 1, "The multiplier and product count one preceding block.", { エ: "2", オカキ: "120" }),
    scoringGroup("smaller-second-digit", 1, "The multiplier and product count the next preceding block.", { ク: "2", ケコ: "24" }),
    scoringGroup("rank", 2, "The three boxes encode the final dictionary-order rank.", { サシス: "145" }),
  ],
  "m1a-manual-001-s4-prob-ab": [
    scoringGroup("probability-a", 2, "The numerator and denominator form P(A).", { セ: "1", ソ: "2" }),
    scoringGroup("conditional-b", 2, "The numerator and denominator form P(B|A).", { タ: "3", チ: "5" }),
  ],
  "m1a-manual-001-s4-cde": [
    scoringGroup("case-counts", 2, "The three values are the first-digit case split.", { ツ: "18", テ: "18", ト: "12" }),
    scoringGroup("total-cd", 1, "The two boxes encode the sum of those cases.", { ナニ: "48" }),
    scoringGroup("count-e", 1, "The two boxes encode the favorable count under E.", { ヌネ: "18" }),
    scoringGroup("conditional-e", 3, "The option pair forms the reduced conditional probability.", { ノ: "3", ハ: "8" }),
  ],
  "m1a-manual-002-s1-1-sets": [
    scoringGroup("set-range", 4, "The endpoints and element count describe the set P.", { ア: "-3", イ: "5", ウ: "9" }),
    scoringGroup("subset-count", 3, "The value and two-digit count describe Q_a within P.", { エ: "6", オカ: "10" }),
    scoringGroup("valid-parameter-count", 2, "The parameter count is a separate inclusion result.", { キ: "5" }),
    scoringGroup("probability", 3, "The numerator and denominator form the final probability.", { ク: "3", ケ: "8" }),
  ],
  "m1a-manual-002-s1-2-surveying": [
    scoringGroup("tower-height", 6, "The two equal distances are the paired height calculation.", { コサ: "72", シス: "72" }),
    scoringGroup("second-distance-angle", 3, "The derived distance and angle choice belong to one observation.", { セソ: "72", タ: "2" }),
    scoringGroup("angle-condition", 3, "The two choices identify the boundary condition for 30 degrees.", { チ: "2", ツ: "2" }),
    scoringGroup("region-radius", 6, "The coefficient and radical encode the radius of the valid region.", { テト: "72", ナ: "3" }),
  ],
  "m1a-manual-002-s2-1-quadratic": [
    scoringGroup("vertex", 3, "The two coordinates identify one vertex.", { ア: "a", イ: "-a" }),
    scoringGroup("range-at-one", 4, "The four values jointly give the specialized function and its range.", { ウ: "1", エオ: "-1", カ: "4", キ: "8" }),
    scoringGroup("minimum-cases", 4, "The two choices identify the case split for the minimum.", { ク: "2", ケ: "1" }),
    scoringGroup("maximum-cases", 4, "The four values encode the case split for the maximum.", { コサ: "-1", シ: "8", スセ: "-1", ソタ: "48" }),
    scoringGroup("composite-choice", 3, "The final option independently evaluates the composite function.", { チ: "3" }),
  ],
  "m1a-manual-002-s2-2-data": [
    scoringGroup("median", 1, "The median is independently read from the ordered data.", { ツテ: "22" }),
    scoringGroup("quartiles-iqr", 3, "Q1, Q3 and the option jointly determine the IQR.", { トナ: "20", ニヌ: "24", ネ: "2", ノ: "4", ハ: "2" }),
    scoringGroup("outlier-bound", 3, "The boundary and two options identify the outliers.", { ヒフ: "31", ヘ: "4", ホ: "2" }),
    scoringGroup("mean-without-outliers", 2, "The two fields encode the recalculated mean.", { マミ: "21", ム: "4" }),
    scoringGroup("median-without-outliers", 2, "The value and option encode the recalculated median.", { メモ: "21", ヤ: "5" }),
    scoringGroup("comparison", 1, "The final choice compares the two summaries.", { ユ: "0" }),
  ],
  "m1a-manual-002-s3-power-circle": [
    scoringGroup("tangent-length", 4, "The first result is the tangent length.", { ア: "8" }),
    scoringGroup("secant-length", 4, "The two boxes encode the secant result from power of a point.", { イウ: "16" }),
  ],
  "m1a-manual-002-s3-sphere-section": [
    scoringGroup("plane-distance", 4, "The coefficient and radical form one exact distance.", { エ: "2", オ: "5" }),
  ],
  "m1a-manual-002-s3-plane-circle": [
    scoringGroup("tangent-length", 3, "The first value is independently found by Pythagoras.", { カ: "3" }),
    scoringGroup("secant-length", 3, "The second value follows from power of a point.", { キ: "9" }),
    scoringGroup("interpretation", 2, "The final option tests the section-circle interpretation.", { ク: "1" }),
  ],
  "m1a-manual-002-s4-counting": [
    scoringGroup("all", 3, "The three boxes encode the total number of arrangements.", { アイウ: "360" }),
    scoringGroup("event-a", 3, "The three boxes encode the count for event A.", { エオカ: "120" }),
    scoringGroup("event-b", 3, "The three boxes encode the count for event B.", { キクケ: "216" }),
    scoringGroup("intersection", 3, "The two boxes encode the count for A∩B.", { コサ: "48" }),
  ],
  "m1a-manual-002-s4-probabilities": [
    scoringGroup("b-given-a", 2, "The numerator and denominator form P(B|A).", { シ: "2", ス: "5" }),
    scoringGroup("a-given-b", 2, "The numerator and denominator form P(A|B).", { セ: "2", ソ: "9" }),
    scoringGroup("union", 2, "The numerator and denominator form P(A∪B).", { タ: "4", チ: "5" }),
    scoringGroup("b-given-not-a", 2, "The numerator and denominator form P(B|A complement).", { ツ: "7", テト: "10" }),
  ],
};
