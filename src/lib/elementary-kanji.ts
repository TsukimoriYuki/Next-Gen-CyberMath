import {
  ELEMENTARY_KANJI_BY_GRADE,
  ELEMENTARY_KANJI_ENTRIES,
  ELEMENTARY_KANJI_GRADES,
} from "@/data/elementary/kanji";
import { ELEMENTARY_RUBY_EXCEPTIONS } from "@/data/elementary/kanji/ruby-exceptions";
import type { ElementaryGradeId } from "@/types/elementary";
import type {
  ElementaryKanjiEntry,
  ElementaryKanjiGrade,
  ElementaryKanjiInspectionResult,
  ElementaryKanjiPolicy,
  ElementaryKanjiPolicyId,
  ElementaryReadonlyKanjiSet,
  ElementaryKanjiViolation,
  ElementaryRubyException,
  ElementaryTextAudience,
  ElementaryTextFieldContext,
} from "@/types/elementary-kanji";

const HAN_CHARACTER = /^\p{Unified_Ideograph}$/u;
const VARIATION_SELECTOR = /^[\uFE00-\uFE0F\u{E0100}-\u{E01EF}]$/u;
const INVALID_RUBY_READING = /<|>|^[\p{ASCII}\p{Number}\s]+$/u;

const POLICY_ID_BY_GRADE: Readonly<Record<ElementaryKanjiGrade, ElementaryKanjiPolicyId>> = {
  1: "grade-1",
  2: "grade-2",
  3: "grade-3",
  4: "grade-4",
  5: "grade-5",
  6: "grade-6",
};

const ELEMENTARY_GRADE_ID_BY_KANJI_GRADE: Readonly<
  Partial<Record<ElementaryKanjiGrade, ElementaryGradeId>>
> = {
  3: "grade-3",
  4: "grade-4",
  5: "grade-5",
  6: "grade-6",
};

class ReadonlySetView implements ElementaryReadonlyKanjiSet {
  readonly #values: Set<string>;

  constructor(values: Iterable<string>) {
    this.#values = new Set(values);
  }

  get size() {
    return this.#values.size;
  }

  has(value: string) {
    return this.#values.has(value);
  }

  values() {
    return this.#values.values();
  }

  [Symbol.iterator]() {
    return this.values();
  }
}

const cumulativeEntries = new Map<ElementaryKanjiGrade, readonly ElementaryKanjiEntry[]>();
const cumulativeSets = new Map<ElementaryKanjiGrade, ElementaryReadonlyKanjiSet>();
const assignedGradeByCharacter = new Map<string, ElementaryKanjiGrade>();

for (const entry of ELEMENTARY_KANJI_ENTRIES) {
  assignedGradeByCharacter.set(entry.character.normalize("NFC"), entry.grade);
}

for (const grade of ELEMENTARY_KANJI_GRADES) {
  const entries = Object.freeze(
    ELEMENTARY_KANJI_GRADES.filter((candidate) => candidate <= grade).flatMap(
      (candidate) => ELEMENTARY_KANJI_BY_GRADE[candidate],
    ),
  );
  cumulativeEntries.set(grade, entries);
  cumulativeSets.set(
    grade,
    new ReadonlySetView(entries.map((entry) => entry.character.normalize("NFC"))),
  );
}

export function isElementaryKanjiGrade(value: unknown): value is ElementaryKanjiGrade {
  return typeof value === "number" && ELEMENTARY_KANJI_GRADES.includes(value as ElementaryKanjiGrade);
}

export function getElementaryKanjiPolicyId(
  grade: ElementaryKanjiGrade,
): ElementaryKanjiPolicyId {
  return POLICY_ID_BY_GRADE[grade];
}

export function getKanjiGradeForGradeId(
  gradeId: ElementaryGradeId | ElementaryKanjiPolicyId | string,
): ElementaryKanjiGrade | undefined {
  const match = /^grade-([1-6])$/u.exec(gradeId);
  if (!match) return undefined;
  const grade = Number(match[1]);
  return isElementaryKanjiGrade(grade) ? grade : undefined;
}

export function getElementaryGradeIdForKanjiGrade(
  grade: ElementaryKanjiGrade,
): ElementaryGradeId | null {
  return ELEMENTARY_GRADE_ID_BY_KANJI_GRADE[grade] ?? null;
}

export function getKanjiForGrade(grade: unknown): readonly ElementaryKanjiEntry[] {
  return isElementaryKanjiGrade(grade) ? ELEMENTARY_KANJI_BY_GRADE[grade] : [];
}

export function getCumulativeKanjiThroughGrade(
  grade: unknown,
): readonly ElementaryKanjiEntry[] {
  return isElementaryKanjiGrade(grade) ? (cumulativeEntries.get(grade) ?? []) : [];
}

export function getCumulativeKanjiSetThroughGrade(
  grade: unknown,
): ElementaryReadonlyKanjiSet {
  return isElementaryKanjiGrade(grade)
    ? (cumulativeSets.get(grade) ?? new ReadonlySetView([]))
    : new ReadonlySetView([]);
}

export function getCumulativeKanjiForGradeId(
  gradeId: ElementaryGradeId | ElementaryKanjiPolicyId | string,
): readonly ElementaryKanjiEntry[] {
  const grade = getKanjiGradeForGradeId(gradeId);
  return grade ? getCumulativeKanjiThroughGrade(grade) : [];
}

export function getAssignedGradeForKanji(character: string): ElementaryKanjiGrade | null {
  const normalized = character.normalize("NFC");
  return assignedGradeByCharacter.get(normalized) ?? null;
}

export function isKanjiLearnedByGrade(character: string, grade: unknown): boolean {
  if (!isElementaryKanjiGrade(grade)) return false;
  const assignedGrade = getAssignedGradeForKanji(character);
  return assignedGrade !== null && assignedGrade <= grade;
}

export function isKanjiAllowedByPolicy(
  character: string,
  policy: ElementaryKanjiPolicy | undefined,
): boolean {
  if (!policy) return false;
  return policy.allowedKanjiSet.has(character.normalize("NFC"));
}

type InspectableInlineSegment =
  | Readonly<{ type: "text"; text: string }>
  | Readonly<{ type: "ruby"; base: string; reading: string; exceptionId?: string }>
  | Readonly<{ type: "emphasis"; text: string }>
  | Readonly<{ type: "term"; text: string; definition?: string }>;

export type ElementaryTextInspectionInput = Readonly<{
  content: string | readonly InspectableInlineSegment[];
  grade: unknown;
  audience: ElementaryTextAudience | string;
  policy?: ElementaryKanjiPolicy;
  context: ElementaryTextFieldContext;
  sourceLocation: string;
  contentId: string;
  fieldPath: string;
  rubyExceptions?: readonly ElementaryRubyException[];
}>;

function makeViolation(
  input: ElementaryTextInspectionInput,
  type: ElementaryKanjiViolation["type"],
  character: string,
  reason: string,
  suggestedAction: string,
  surroundingText: string,
  exceptionId: string | null = null,
): ElementaryKanjiViolation {
  const grade = isElementaryKanjiGrade(input.grade) ? input.grade : null;
  const normalizedCharacter = character.normalize("NFC");
  return {
    type,
    grade,
    character,
    normalizedCharacter,
    assignedGrade: character ? getAssignedGradeForKanji(normalizedCharacter) : null,
    sourceLocation: input.sourceLocation,
    contentId: input.contentId,
    fieldPath: input.fieldPath,
    surroundingText: surroundingText.slice(0, 160),
    exceptionId,
    reason,
    suggestedAction,
  };
}

function inspectPlainText(
  text: string,
  input: ElementaryTextInspectionInput,
  violations: ElementaryKanjiViolation[],
): number {
  let hanCount = 0;
  for (const character of Array.from(text.normalize("NFC"))) {
    if (VARIATION_SELECTOR.test(character)) {
      violations.push(
        makeViolation(
          input,
          "disallowed-variant",
          character,
          "異体字セレクタは明示的なvariant registryなしでは許可されません。",
          "標準字体へ戻すか、variant registryで個別レビューしてください。",
          text,
        ),
      );
      continue;
    }
    if (!HAN_CHARACTER.test(character)) continue;
    hanCount += 1;
    if (isKanjiAllowedByPolicy(character, input.policy)) continue;
    const assignedGrade = getAssignedGradeForKanji(character);
    violations.push(
      makeViolation(
        input,
        assignedGrade === null ? "unassigned-kanji" : "unlearned-kanji",
        character,
        assignedGrade === null
          ? "学年別漢字配当表にない漢字です。"
          : `第${assignedGrade}学年配当のため対象学年では未習です。`,
        "ひらがなか既習語へ変更し、固有名詞の場合だけruby例外を申請してください。",
        text,
      ),
    );
  }
  return hanCount;
}

function inspectRuby(
  segment: Extract<InspectableInlineSegment, { type: "ruby" }>,
  input: ElementaryTextInspectionInput,
  exceptions: readonly ElementaryRubyException[],
  violations: ElementaryKanjiViolation[],
): Readonly<{ hanCount: number; approved: boolean }> {
  const base = segment.base;
  const reading = segment.reading;
  if (!base) {
    violations.push(makeViolation(input, "empty-base", "", "rubyのbaseが空です。", "表示する語をbaseへ設定してください。", reading, segment.exceptionId ?? null));
    return { hanCount: 0, approved: false };
  }
  if (!reading) {
    violations.push(makeViolation(input, "empty-reading", base, "rubyのreadingが空です。", "ひらがなの読みを設定してください。", base, segment.exceptionId ?? null));
  } else if (INVALID_RUBY_READING.test(reading)) {
    violations.push(makeViolation(input, "invalid-ruby", base, "rubyのreadingが読み仮名として不正です。", "HTMLや英数字だけでなく、ひらがなの読みを設定してください。", `${base}（${reading}）`, segment.exceptionId ?? null));
  }

  const characters = Array.from(base.normalize("NFC")).filter((character) => HAN_CHARACTER.test(character));
  const unallowed = characters.filter((character) => !isKanjiAllowedByPolicy(character, input.policy));
  if (unallowed.length === 0) {
    return { hanCount: characters.length, approved: false };
  }

  if (!segment.exceptionId) {
    violations.push(makeViolation(input, "missing-ruby-exception", unallowed[0] ?? base, "未習漢字を含むrubyに例外IDがありません。", "一般語はひらがなへ変更し、固有名詞だけ例外を申請してください。", `${base}（${reading}）`));
    return { hanCount: characters.length, approved: false };
  }

  const exception = exceptions.find((entry) => entry.id === segment.exceptionId);
  if (!exception) {
    violations.push(makeViolation(input, "ruby-exception-mismatch", unallowed[0] ?? base, "登録されていないruby例外IDです。", "例外registryのIDを確認してください。", `${base}（${reading}）`, segment.exceptionId));
    return { hanCount: characters.length, approved: false };
  }
  if (exception.reviewStatus !== "approved") {
    violations.push(makeViolation(input, "unapproved-exception", unallowed[0] ?? base, "ruby例外がapprovedではありません。", "人間レビューを完了するか表現を変更してください。", `${base}（${reading}）`, exception.id));
    return { hanCount: characters.length, approved: false };
  }
  const grade = isElementaryKanjiGrade(input.grade) ? input.grade : null;
  const policyId = grade ? getElementaryKanjiPolicyId(grade) : null;
  if (
    exception.surface !== base ||
    exception.reading !== reading ||
    !policyId ||
    !exception.allowedGrades.includes(policyId) ||
    !input.policy?.allowedRubyExceptionIds.includes(exception.id)
  ) {
    violations.push(makeViolation(input, "ruby-exception-mismatch", unallowed[0] ?? base, "rubyのsurface、reading、対象学年、またはpolicyが例外registryと一致しません。", "登録済みの表面形・読み・対象学年を確認してください。", `${base}（${reading}）`, exception.id));
    return { hanCount: characters.length, approved: false };
  }
  return { hanCount: characters.length, approved: true };
}

export function inspectElementaryText(
  input: ElementaryTextInspectionInput,
): ElementaryKanjiInspectionResult {
  const audience = input.audience;
  if (audience === "developer" || audience === "internal") {
    return {
      audience,
      grade: isElementaryKanjiGrade(input.grade) ? input.grade : null,
      inspectedStringCount: 0,
      inspectedHanCount: 0,
      approvedExceptionCount: 0,
      excluded: true,
      violations: [],
    };
  }

  const violations: ElementaryKanjiViolation[] = [];
  const fullText = typeof input.content === "string"
    ? input.content
    : input.content.map((segment) => segment.type === "ruby" ? segment.base : segment.text).join("");
  if (audience !== "learner" || !isElementaryKanjiGrade(input.grade) || !input.policy || input.policy.grade !== input.grade) {
    violations.push(makeViolation(input, "learner-text-without-policy", "", "learner-facing文字列のaudience、grade、またはpolicyを解決できません。", "対象学年とlearner policyを明示してください。", fullText));
    return {
      audience: audience === "learner" ? audience : "unknown",
      grade: isElementaryKanjiGrade(input.grade) ? input.grade : null,
      inspectedStringCount: 1,
      inspectedHanCount: 0,
      approvedExceptionCount: 0,
      excluded: false,
      violations,
    };
  }

  let inspectedHanCount = 0;
  let approvedExceptionCount = 0;
  if (typeof input.content === "string") {
    inspectedHanCount += inspectPlainText(input.content, input, violations);
  } else {
    const exceptions = input.rubyExceptions ?? ELEMENTARY_RUBY_EXCEPTIONS;
    for (const segment of input.content) {
      if (segment.type === "ruby") {
        const result = inspectRuby(segment, input, exceptions, violations);
        inspectedHanCount += result.hanCount;
        if (result.approved) approvedExceptionCount += 1;
      } else {
        inspectedHanCount += inspectPlainText(segment.text, input, violations);
        if (segment.type === "term" && segment.definition) {
          inspectedHanCount += inspectPlainText(segment.definition, input, violations);
        }
      }
    }
  }

  return {
    audience: "learner",
    grade: input.grade,
    inspectedStringCount: 1,
    inspectedHanCount,
    approvedExceptionCount,
    excluded: false,
    violations,
  };
}
