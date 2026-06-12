import type {
  CommonTestAnswerFormat,
  CommonTestDigitSlot,
  CommonTestDrillQuestion,
  CommonTestSkillTag,
  CommonTestSubjectId,
} from "@/data/common-test-drills";
import type { CommonTestGuidedReviewItem } from "@/lib/common-test-guided-review";
import { normalizeCommonTestAnswer } from "@/lib/common-test-answer-normalize";

export type CommonTestVariantTemplateId =
  | "math-1a-probability-cards"
  | "math-1a-quadratic-model"
  | "math-2bc-arithmetic-sequence"
  | "math-2bc-vector-coordinate";

export interface CommonTestVariantPracticeQuestion {
  id: string;
  templateId: CommonTestVariantTemplateId;
  subjectId: CommonTestSubjectId;
  sectionId: string;
  title: string;
  statement: string;
  options?: string[];
  correctAnswer: string;
  answerFormat: CommonTestAnswerFormat;
  digitSlots?: CommonTestDigitSlot[];
  explanation: string;
  strategy: string;
  trapExplanation: string;
  difficultyStage: CommonTestDrillQuestion["difficultyStage"];
  skillTags: CommonTestSkillTag[];
}

export interface CommonTestVariantValidationResult {
  ok: boolean;
  errors: string[];
}

interface VariantSource {
  questionId: string;
  subjectId: string;
  sectionId: string;
  skillTags: string[];
}

export function getCommonTestVariantTemplateId(
  source: VariantSource,
): CommonTestVariantTemplateId | null {
  if (source.subjectId === "math-1a" && source.sectionId === "section-4") {
    return "math-1a-probability-cards";
  }
  if (source.subjectId === "math-1a" && source.sectionId === "section-2") {
    return "math-1a-quadratic-model";
  }
  if (source.subjectId === "math-2bc" && source.sectionId === "section-3") {
    return "math-2bc-arithmetic-sequence";
  }
  if (source.subjectId === "math-2bc" && source.sectionId === "section-5") {
    return "math-2bc-vector-coordinate";
  }
  return null;
}

export function canGenerateCommonTestVariant(source: VariantSource): boolean {
  return getCommonTestVariantTemplateId(source) !== null;
}

export function generateCommonTestVariantPracticeQuestion(
  source: CommonTestGuidedReviewItem,
  variantIndex: number,
): CommonTestVariantPracticeQuestion | null {
  const templateId = getCommonTestVariantTemplateId(source);
  if (!templateId) return null;

  const seed = stableSeed(`${source.questionId}:${variantIndex}:${templateId}`);
  const question =
    templateId === "math-1a-probability-cards"
      ? buildProbabilityVariant(source, seed, variantIndex)
      : templateId === "math-1a-quadratic-model"
        ? buildQuadraticVariant(source, seed, variantIndex)
        : templateId === "math-2bc-arithmetic-sequence"
          ? buildSequenceVariant(source, seed, variantIndex)
          : buildVectorVariant(source, seed, variantIndex);

  const validation = validateCommonTestVariantPracticeQuestion(question);
  return validation.ok ? question : null;
}

export function validateCommonTestVariantPracticeQuestion(
  question: CommonTestVariantPracticeQuestion,
): CommonTestVariantValidationResult {
  const errors: string[] = [];
  const joined = [
    question.title,
    question.statement,
    question.correctAnswer,
    question.explanation,
    question.strategy,
    question.trapExplanation,
    ...(question.options ?? []),
  ].join("\n");

  if (!normalizeCommonTestAnswer(question.correctAnswer)) {
    errors.push("correctAnswer is empty");
  }
  if (/\$\$|\\\[|\\\(|\\\)/.test(joined)) {
    errors.push("contains forbidden math delimiter");
  }
  if (/NaN|Infinity/.test(joined)) {
    errors.push("contains invalid number");
  }
  if (question.answerFormat === "choice") {
    if (!question.options?.length) errors.push("choice question has no options");
    if (question.options && !question.options.includes(question.correctAnswer)) {
      errors.push("correctAnswer is not in options");
    }
  }
  if (question.answerFormat === "digits") {
    const slotLength = question.digitSlots?.reduce((sum, slot) => sum + slot.length, 0) ?? 0;
    const answerLength = normalizeCommonTestAnswer(question.correctAnswer).replace(/-/g, "").length;
    if (!question.digitSlots?.length) errors.push("digits question has no digitSlots");
    if (slotLength !== answerLength) {
      errors.push(`digitSlots length ${slotLength} does not match answer length ${answerLength}`);
    }
  }

  return { ok: errors.length === 0, errors };
}

function buildProbabilityVariant(
  source: CommonTestGuidedReviewItem,
  seed: number,
  variantIndex: number,
): CommonTestVariantPracticeQuestion {
  const n = 5 + (seed % 4);
  const oddCount = Math.ceil(n / 2);
  const evenCount = Math.floor(n / 2);
  const total = n * (n - 1);
  const favorable = oddCount * (oddCount - 1) + evenCount * (evenCount - 1);
  const answer = simplifyFraction(favorable, total);
  const distractors = uniqueOptions([
    answer,
    simplifyFraction(favorable, n * n),
    simplifyFraction(oddCount * evenCount * 2, total),
    simplifyFraction(evenCount * Math.max(evenCount - 1, 0), total),
  ]);

  return {
    id: buildVariantId(source, "probability", variantIndex),
    templateId: "math-1a-probability-cards",
    subjectId: "math-1a",
    sectionId: "section-4",
    title: "類題：カードを戻さずに取る確率",
    statement:
      `1から${n}までの数字が1つずつ書かれた${n}枚のカードから、2枚を順に取り出し、取り出したカードは戻さない。2枚の数字の和が偶数になる確率を求めよ。`,
    options: distractors,
    correctAnswer: answer,
    answerFormat: "choice",
    explanation:
      `全事象は順序を区別して ${n}×${n - 1}=${total} 通り。和が偶数になるのは、2枚とも奇数、または2枚とも偶数の場合である。奇数は${oddCount}枚、偶数は${evenCount}枚なので、有利な場合は ${oddCount}×${oddCount - 1}+${evenCount}×${evenCount - 1}=${favorable} 通り。したがって確率は ${answer}。`,
    strategy:
      "順に取り出す問題では、まず全事象を順序付きで数える。偶数和は「奇数同士」または「偶数同士」に分けると整理しやすい。",
    trapExplanation:
      "戻さずに取るため、2枚目は1枚少なくなる。全事象を $n^2$ としてしまうと確率がずれる。",
    difficultyStage: "standard",
    skillTags: ["条件整理", "選択肢消去"],
  };
}

function buildQuadraticVariant(
  source: CommonTestGuidedReviewItem,
  seed: number,
  variantIndex: number,
): CommonTestVariantPracticeQuestion {
  const a = 1 + (seed % 3);
  const b = 2 + ((seed >>> 3) % 4);
  const c = 58 + ((seed >>> 5) % 8) * 3;
  const answer = String(c);

  return {
    id: buildVariantId(source, "quadratic", variantIndex),
    templateId: "math-1a-quadratic-model",
    subjectId: "math-1a",
    sectionId: "section-2",
    title: "類題：二次関数モデルの最大値",
    statement:
      `あるデータの傾向を表すモデルとして $f(x)=-${a}(x-${b})^2+${c}$ を考える。このモデルの最大値を求めよ。`,
    correctAnswer: answer,
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: answer.length }],
    explanation:
      `$f(x)=-${a}(x-${b})^2+${c}$ は頂点が $(${b}, ${c})$ の上に開かない放物線である。$-${a}(x-${b})^2$ は0以下なので、最大値は $x=${b}$ のときの ${c}。`,
    strategy:
      "$-a(x-b)^2+c$ の形では、平方の部分が0になるとき最大になる。展開せず、頂点の形のまま読む。",
    trapExplanation:
      "$x$ の値と最大値を混同しやすい。最大となる $x$ は頂点の横座標、最大値は縦座標である。",
    difficultyStage: "guided",
    skillTags: ["データ読み取り", "数式変形", "計算処理"],
  };
}

function buildSequenceVariant(
  source: CommonTestGuidedReviewItem,
  seed: number,
  variantIndex: number,
): CommonTestVariantPracticeQuestion {
  const a1 = 6 + (seed % 8);
  const d = 2 + ((seed >>> 4) % 5);
  const k = 5 + ((seed >>> 7) % 6);
  const answer = String(a1 + (k - 1) * d);

  return {
    id: buildVariantId(source, "sequence", variantIndex),
    templateId: "math-2bc-arithmetic-sequence",
    subjectId: "math-2bc",
    sectionId: "section-3",
    title: "類題：等差数列の第n項",
    statement:
      `等差数列 $a_n$ について、初項が ${a1}、公差が ${d} である。このとき、第${k}項 $a_${k}$ を求めよ。`,
    correctAnswer: answer,
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: answer.length }],
    explanation:
      `等差数列の一般項は $a_n=a_1+(n-1)d$。したがって $a_${k}=${a1}+(${k}-1)×${d}=${answer}$。`,
    strategy:
      "等差数列では、何回公差を足したかを先に考える。第 $k$ 項では公差を $k-1$ 回足す。",
    trapExplanation:
      `第${k}項だからといって公差を${k}回足すのではない。初項を第1項として数えるので、足す回数は${k - 1}回である。`,
    difficultyStage: "standard",
    skillTags: ["誘導読解", "計算処理", "数式変形"],
  };
}

function buildVectorVariant(
  source: CommonTestGuidedReviewItem,
  seed: number,
  variantIndex: number,
): CommonTestVariantPracticeQuestion {
  const ax = 2 + (seed % 5);
  const ay = 1 + ((seed >>> 3) % 4);
  const bx = 1 + ((seed >>> 6) % 5);
  const by = 2 + ((seed >>> 9) % 4);
  const answer = String(ax * bx + ay * by);
  const formula = ["$", `${ax}×${bx}+${ay}×${by}=${answer}`, "$"].join("");

  return {
    id: buildVariantId(source, "vector", variantIndex),
    templateId: "math-2bc-vector-coordinate",
    subjectId: "math-2bc",
    sectionId: "section-5",
    title: "類題：座標ベクトルの内積",
    statement:
      `座標平面上で、$\\overrightarrow{OA}=(${ax},${ay})$、$\\overrightarrow{OB}=(${bx},${by})$ とする。このとき、内積 $\\overrightarrow{OA}\\cdot\\overrightarrow{OB}$ を求めよ。`,
    correctAnswer: answer,
    answerFormat: "digits",
    digitSlots: [{ label: "アイ", length: answer.length }],
    explanation:
      `成分表示されたベクトルの内積は、対応する成分の積の和である。よって ${formula}。`,
    strategy:
      "座標ベクトルの内積は $x$ 成分どうし、$y$ 成分どうしを掛けて足す。長さや角度を先に求める必要はない。",
    trapExplanation:
      "成分を足してから掛けたり、片方の成分だけで計算したりしない。対応する成分どうしの積を2つ作る。",
    difficultyStage: "basic",
    skillTags: ["計算処理", "数式変形"],
  };
}

function buildVariantId(
  source: CommonTestGuidedReviewItem,
  label: string,
  variantIndex: number,
): string {
  return `variant:${source.questionId}:${label}:${variantIndex}`;
}

function stableSeed(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x || 1;
}

function simplifyFraction(numerator: number, denominator: number): string {
  const g = gcd(numerator, denominator);
  return `${numerator / g}/${denominator / g}`;
}

function uniqueOptions(options: string[]): string[] {
  const result: string[] = [];
  for (const option of options) {
    if (!result.includes(option)) result.push(option);
  }
  const fallbacks = ["1/2", "1/3", "2/3", "3/4"];
  for (const option of fallbacks) {
    if (result.length >= 4) break;
    if (!result.includes(option)) result.push(option);
  }
  return result.slice(0, 4);
}
