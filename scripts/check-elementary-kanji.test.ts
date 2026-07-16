import { getElementaryKanjiPolicy } from "../src/data/elementary/kanji/policies";
import { ELEMENTARY_RUBY_EXCEPTIONS } from "../src/data/elementary/kanji/ruby-exceptions";
import { inspectElementaryText } from "../src/lib/elementary-kanji";
import type {
  ElementaryKanjiPolicy,
  ElementaryKanjiViolationType,
  ElementaryRubyException,
  ElementaryTextAudience,
} from "../src/types/elementary-kanji";

const grade3Policy = getElementaryKanjiPolicy("grade-3");
if (!grade3Policy) throw new Error("grade-3 policy is required for fixtures");

type FixtureContent = Parameters<typeof inspectElementaryText>[0]["content"];

function inspect(
  content: FixtureContent,
  overrides: Readonly<{
    grade?: unknown;
    audience?: ElementaryTextAudience | string;
    policy?: ElementaryKanjiPolicy;
    rubyExceptions?: readonly ElementaryRubyException[];
  }> = {},
) {
  return inspectElementaryText({
    content,
    grade: overrides.grade ?? 3,
    audience: overrides.audience ?? "learner",
    policy: overrides.policy ?? grade3Policy,
    context: "lesson",
    sourceLocation: "scripts/check-elementary-kanji.test.ts",
    contentId: "fixture",
    fieldPath: "content",
    rubyExceptions: overrides.rubyExceptions,
  });
}

function expectViolation(
  label: string,
  content: FixtureContent,
  type: ElementaryKanjiViolationType,
  overrides?: Parameters<typeof inspect>[1],
) {
  const result = inspect(content, overrides);
  if (!result.violations.some((violation) => violation.type === type)) {
    throw new Error(`${label}: expected ${type}, got ${result.violations.map((entry) => entry.type).join(",") || "pass"}`);
  }
}

function expectPass(
  label: string,
  content: FixtureContent,
  overrides?: Parameters<typeof inspect>[1],
) {
  const result = inspect(content, overrides);
  if (result.violations.length) {
    throw new Error(`${label}: expected pass, got ${result.violations.map((entry) => entry.type).join(",")}`);
  }
}

expectViolation("grade-4 kanji in grade-3", "愛", "unlearned-kanji");
expectViolation("unassigned kanji", "冨", "unassigned-kanji");
expectViolation(
  "ruby without exception",
  [{ type: "ruby", base: "愛", reading: "あい" }],
  "missing-ruby-exception",
);
expectViolation(
  "surface mismatch",
  [{ type: "ruby", base: "冨田", reading: "とみやま", exceptionId: "proper-name-tomiyama" }],
  "ruby-exception-mismatch",
);
expectViolation(
  "reading mismatch",
  [{ type: "ruby", base: "冨山", reading: "とやま", exceptionId: "proper-name-tomiyama" }],
  "ruby-exception-mismatch",
);

const pendingException: ElementaryRubyException = {
  id: "fixture-pending-name",
  surface: "冨山",
  reading: "とみやま",
  unassignedCharacters: ["冨"],
  category: "proper-name",
  allowedGrades: ["grade-3"],
  reason: "fixture only",
  reviewStatus: "pending",
};
const pendingPolicy: ElementaryKanjiPolicy = {
  ...grade3Policy,
  allowedRubyExceptionIds: ["fixture-pending-name"],
};
expectViolation(
  "unapproved exception",
  [{ type: "ruby", base: "冨山", reading: "とみやま", exceptionId: "fixture-pending-name" }],
  "unapproved-exception",
  { policy: pendingPolicy, rubyExceptions: [pendingException] },
);

expectPass(
  "approved Tomiyama exception",
  [{ type: "ruby", base: "冨山", reading: "とみやま", exceptionId: "proper-name-tomiyama" }],
  { rubyExceptions: ELEMENTARY_RUBY_EXCEPTIONS },
);
expectPass("learned kanji", "学校で学ぶ");
expectPass("kana numbers and math symbols", "りんご12こ÷3＝4こ");

const developerResult = inspect("開発者向け診断", { audience: "developer" });
if (!developerResult.excluded || developerResult.violations.length) {
  throw new Error("developer-only text must be explicitly excluded");
}
expectViolation("unknown audience", "学校", "learner-text-without-policy", { audience: "unknown" });
expectViolation("unknown grade", "学校", "learner-text-without-policy", { grade: "unknown" });

console.log("elementary kanji fixture test passed: 11 fail/pass boundaries are enforced without mutating production data.");
