import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { ELEMENTARY_CHARACTERS } from "../src/data/elementary/characters";
import {
  ELEMENTARY_KANJI_BY_GRADE,
  ELEMENTARY_KANJI_ENTRIES,
  ELEMENTARY_KANJI_EXPECTED_COUNTS,
  ELEMENTARY_KANJI_EXPECTED_CUMULATIVE_COUNTS,
  ELEMENTARY_KANJI_GRADES,
} from "../src/data/elementary/kanji";
import { ELEMENTARY_KANJI_POLICIES, getElementaryKanjiPolicy } from "../src/data/elementary/kanji/policies";
import { ELEMENTARY_RUBY_EXCEPTIONS } from "../src/data/elementary/kanji/ruby-exceptions";
import {
  ELEMENTARY_KANJI_INDEPENDENT_ALL_SET_SHA256,
  ELEMENTARY_KANJI_INDEPENDENT_SET_SHA256,
  ELEMENTARY_KANJI_SOURCES,
} from "../src/data/elementary/kanji/sources";
import { ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE } from "../src/data/elementary/showcases/division-dialogue";
import { ELEMENTARY_TSX_COPY_EXCLUSIONS } from "../src/data/elementary/tsx-copy-policies";
import { ELEMENTARY_UI_COPY } from "../src/data/elementary/ui-copy";
import {
  getAssignedGradeForKanji,
  getCumulativeKanjiThroughGrade,
  getElementaryKanjiPolicyId,
  getKanjiForGrade,
  inspectElementaryText,
  isKanjiLearnedByGrade,
} from "../src/lib/elementary-kanji";
import { getElementaryLessonTextFields } from "../src/lib/elementary-text";
import type {
  ElementaryKanjiViolation,
  ElementaryTextAudience,
} from "../src/types/elementary-kanji";

const HAN_CHARACTER = /^\p{Unified_Ideograph}$/u;
const JAPANESE_TEXT = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u;
const issues: string[] = [];
const violations: ElementaryKanjiViolation[] = [];
let inspectedStringCount = 0;
let inspectedHanCount = 0;
let exclusionCount = 0;
let developerAudienceCount = 0;

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function sha256ForCharacters(characters: readonly string[]): string {
  return crypto
    .createHash("sha256")
    .update([...characters].sort().join(""))
    .digest("hex");
}

function addInspection(
  content: Parameters<typeof inspectElementaryText>[0]["content"],
  options: Readonly<{
    grade: unknown;
    audience: ElementaryTextAudience | string;
    policyId?: string;
    context: Parameters<typeof inspectElementaryText>[0]["context"];
    sourceLocation: string;
    contentId: string;
    fieldPath: string;
  }>,
) {
  const result = inspectElementaryText({
    content,
    grade: options.grade,
    audience: options.audience,
    policy: options.policyId ? getElementaryKanjiPolicy(options.policyId) : undefined,
    context: options.context,
    sourceLocation: options.sourceLocation,
    contentId: options.contentId,
    fieldPath: options.fieldPath,
  });
  inspectedStringCount += result.inspectedStringCount;
  inspectedHanCount += result.inspectedHanCount;
  if (result.excluded) exclusionCount += 1;
  violations.push(...result.violations);
}

function validateOfficialData() {
  const allCharacters = ELEMENTARY_KANJI_ENTRIES.map((entry) => entry.character);
  check(ELEMENTARY_KANJI_ENTRIES.length === 1026, "official assignment total must be 1,026");
  check(ELEMENTARY_KANJI_ENTRIES.length !== 1006, "old 1,006-character assignment must not be used");
  check(new Set(allCharacters).size === 1026, "cross-grade duplicate detected");
  check(
    sha256ForCharacters(allCharacters) === ELEMENTARY_KANJI_INDEPENDENT_ALL_SET_SHA256,
    "all-grade set differs from the independent MEXT on-kun allocation extraction",
  );

  const sourceIds = new Set(ELEMENTARY_KANJI_SOURCES.map((source) => source.id));
  for (const source of ELEMENTARY_KANJI_SOURCES) {
    check(source.authority === "MEXT", `${source.id}: authority must be MEXT`);
    check(source.reviewStatus === "reviewed", `${source.id}: source must be reviewed`);
    check(source.officialUrl.startsWith("https://www.mext.go.jp/"), `${source.id}: official URL must use mext.go.jp`);
  }

  for (const grade of ELEMENTARY_KANJI_GRADES) {
    const entries = ELEMENTARY_KANJI_BY_GRADE[grade];
    const characters = entries.map((entry) => entry.character);
    check(entries.length === ELEMENTARY_KANJI_EXPECTED_COUNTS[grade], `grade-${grade}: expected ${ELEMENTARY_KANJI_EXPECTED_COUNTS[grade]}, got ${entries.length}`);
    check(new Set(characters).size === entries.length, `grade-${grade}: duplicate detected`);
    check(
      sha256ForCharacters(characters) === ELEMENTARY_KANJI_INDEPENDENT_SET_SHA256[grade],
      `grade-${grade}: set differs from the independent MEXT on-kun allocation extraction`,
    );
    entries.forEach((entry, index) => {
      check(Array.from(entry.character).length === 1 && HAN_CHARACTER.test(entry.character), `grade-${grade}[${index}]: entry must be one unified ideograph`);
      check(entry.grade === grade, `grade-${grade}[${index}]: grade mismatch`);
      check(entry.order === index + 1, `grade-${grade}[${index}]: unstable order`);
      check(entry.sourceIds.every((sourceId) => sourceIds.has(sourceId)), `grade-${grade}[${index}]: unresolved source`);
    });
    check(
      getCumulativeKanjiThroughGrade(grade).length === ELEMENTARY_KANJI_EXPECTED_CUMULATIVE_COUNTS[grade],
      `grade-${grade}: cumulative count mismatch`,
    );
  }

  const grade4 = new Set(ELEMENTARY_KANJI_BY_GRADE[4].map((entry) => entry.character));
  const prefectureRevisionCharacters = Array.from("茨媛岡潟岐熊香佐埼崎滋鹿縄井沖栃奈梨阪阜");
  check(prefectureRevisionCharacters.every((character) => grade4.has(character)), "grade-4: 2017 prefecture-name revision is incomplete");
}

function validatePoliciesAndExceptions() {
  check(ELEMENTARY_KANJI_POLICIES.length === 6, "six grade policies are required");
  for (const policy of ELEMENTARY_KANJI_POLICIES) {
    check(policy.id === getElementaryKanjiPolicyId(policy.grade), `${policy.id}: policy ID does not resolve`);
    check(policy.allowedKanjiSet.size === ELEMENTARY_KANJI_EXPECTED_CUMULATIVE_COUNTS[policy.grade], `${policy.id}: allowed set size mismatch`);
    check((policy.allowedKanjiSet as unknown as { add?: unknown }).add === undefined, `${policy.id}: allowed set exposes mutation`);
    check(policy.enforcementMode === "strict", `${policy.id}: learner policy must be strict`);
    check(policy.sourceIds.every((sourceId) => ELEMENTARY_KANJI_SOURCES.some((source) => source.id === sourceId)), `${policy.id}: unresolved source`);
    check(policy.allowedRubyExceptionIds.every((id) => ELEMENTARY_RUBY_EXCEPTIONS.some((entry) => entry.id === id && entry.reviewStatus === "approved" && entry.allowedGrades.includes(policy.id))), `${policy.id}: unresolved or unapproved exception`);
  }
  check(getKanjiForGrade("unknown").length === 0, "unknown grade must fail closed");
  check(getElementaryKanjiPolicy("unknown") === undefined, "unknown policy must fail closed");
  check(!isKanjiLearnedByGrade("一", "unknown"), "unknown grade learned check must fail closed");
  check(getAssignedGradeForKanji("冨") === null, "冨 must remain unassigned without an explicit exception");

  const ids = ELEMENTARY_RUBY_EXCEPTIONS.map((entry) => entry.id);
  const surfaces = ELEMENTARY_RUBY_EXCEPTIONS.map((entry) => entry.surface);
  check(new Set(ids).size === ids.length, "ruby exception IDs must be unique");
  check(new Set(surfaces).size === surfaces.length, "ruby exception surfaces must be unique");
  for (const exception of ELEMENTARY_RUBY_EXCEPTIONS) {
    check(exception.surface.trim().length > 1, `${exception.id}: broad one-character exception is forbidden`);
    check(exception.reading.trim().length > 0, `${exception.id}: reading is required`);
    check(exception.allowedGrades.length > 0, `${exception.id}: allowed grades are required`);
    check(exception.reason.trim().length > 0, `${exception.id}: reason is required`);
  }
  const tomiyama = ELEMENTARY_RUBY_EXCEPTIONS.find((entry) => entry.id === "proper-name-tomiyama");
  check(tomiyama?.surface === "冨山" && tomiyama.reading === "とみやま", "approved Tomiyama surface and reading are required");
  check(tomiyama?.reviewStatus === "approved", "Tomiyama exception must be approved");
}

function validateLearnerContent() {
  const lesson = ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE;
  const lessonPolicyId = "grade-3";
  for (const field of getElementaryLessonTextFields(lesson)) {
    addInspection(field.content, {
      grade: 3,
      audience: "learner",
      policyId: lessonPolicyId,
      context: "lesson",
      sourceLocation: "src/data/elementary/showcases/division-dialogue.ts",
      contentId: lesson.id,
      fieldPath: field.path,
    });
  }

  for (const character of ELEMENTARY_CHARACTERS) {
    addInspection(character.displayNameContent, {
      grade: 3,
      audience: "learner",
      policyId: "grade-3",
      context: "dialogue",
      sourceLocation: "src/data/elementary/characters.ts",
      contentId: character.id,
      fieldPath: "displayNameContent",
    });
    for (const [fieldPath, text] of [
      ["accessibilityLabel", character.accessibilityLabel],
      ["fallback.symbol", character.fallback.symbol],
      ["fallback.label", character.fallback.label],
    ] as const) {
      addInspection(text, {
        grade: 3,
        audience: "learner",
        policyId: "grade-3",
        context: "accessibility",
        sourceLocation: "src/data/elementary/characters.ts",
        contentId: character.id,
        fieldPath,
      });
    }
  }

  for (const copy of ELEMENTARY_UI_COPY) {
    if (copy.audience === "developer") developerAudienceCount += 1;
    const grade = copy.policyId ? Number(copy.policyId.slice(-1)) : 3;
    addInspection(copy.text, {
      grade,
      audience: copy.audience,
      policyId: copy.policyId ?? undefined,
      context: copy.context,
      sourceLocation: copy.sourceLocation,
      contentId: copy.id,
      fieldPath: "text",
    });
  }
}

function attributeName(attribute: ts.JsxAttribute): string {
  return attribute.name.getText();
}

function developerAudienceForNode(node: ts.Node): boolean {
  let current: ts.Node | undefined = node;
  while (current) {
    if (ts.isJsxElement(current)) {
      const attribute = current.openingElement.attributes.properties.find(
        (property): property is ts.JsxAttribute =>
          ts.isJsxAttribute(property) &&
          attributeName(property) === "data-text-audience" &&
          property.initializer?.getText() === '"developer"',
      );
      if (attribute) return true;
    }
    current = current.parent;
  }
  return false;
}

function validateTsxStaticText() {
  const root = process.cwd();
  const files = [
    ...fs.readdirSync(path.join(root, "src/app/elementary"), { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
      .map((entry) => path.join(entry.parentPath, entry.name)),
    ...fs.readdirSync(path.join(root, "src/components/elementary"), { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
      .map((entry) => path.join(entry.parentPath, entry.name)),
  ];
  const semanticAttributes = new Set(["aria-label", "alt", "title"]);

  for (const absolutePath of files) {
    const sourcePath = path.relative(root, absolutePath).replaceAll("\\", "/");
    const sourceText = fs.readFileSync(absolutePath, "utf8");
    const source = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const inspectLiteral = (text: string, node: ts.Node, fieldPath: string) => {
      if (!JAPANESE_TEXT.test(text)) return;
      const position = source.getLineAndCharacterOfPosition(node.getStart(source));
      const developer = developerAudienceForNode(node);
      if (developer) developerAudienceCount += 1;
      addInspection(text, {
        grade: 3,
        audience: developer ? "developer" : "learner",
        policyId: developer ? undefined : "grade-3",
        context: "tsx-static",
        sourceLocation: `${sourcePath}:${position.line + 1}:${position.character + 1}`,
        contentId: sourcePath,
        fieldPath,
      });
    };

    const visit = (node: ts.Node) => {
      if (ts.isJsxText(node)) {
        inspectLiteral(node.text.trim(), node, "JSXText");
      } else if (ts.isJsxAttribute(node)) {
        const name = attributeName(node);
        if (semanticAttributes.has(name)) {
          if (node.initializer && ts.isStringLiteral(node.initializer)) {
            inspectLiteral(node.initializer.text, node.initializer, name);
          } else if (node.initializer && ts.isJsxExpression(node.initializer) && node.initializer.expression) {
            const expression = node.initializer.expression;
            if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) {
              inspectLiteral(expression.text, expression, name);
            } else if (!(ts.isCallExpression(expression) && expression.expression.getText(source) === "elementaryUiCopy")) {
              const expressionText = expression.getText(source);
              const exclusion = ELEMENTARY_TSX_COPY_EXCLUSIONS.find(
                (entry) => entry.sourcePath === sourcePath && entry.attributeName === name && entry.expression === expressionText,
              );
              if (exclusion) {
                exclusionCount += 1;
              } else {
                const position = source.getLineAndCharacterOfPosition(expression.getStart(source));
                violations.push({
                  type: "unresolved-dynamic-copy",
                  grade: 3,
                  character: "",
                  normalizedCharacter: "",
                  assignedGrade: null,
                  sourceLocation: `${sourcePath}:${position.line + 1}:${position.character + 1}`,
                  contentId: sourcePath,
                  fieldPath: name,
                  surroundingText: expressionText,
                  exceptionId: null,
                  reason: "learner-facingの動的属性が検証済みregistryへ解決できません。",
                  suggestedAction: "UI copyか構造化教材registryを使うか、理由付きの限定除外を登録してください。",
                });
              }
            }
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }

  for (const exclusion of ELEMENTARY_TSX_COPY_EXCLUSIONS) {
    check(exclusion.reason.trim().length > 0, `${exclusion.sourcePath}: TSX exclusion requires a reason`);
    check(exclusion.audience === "learner" || exclusion.audience === "developer" || exclusion.audience === "internal", `${exclusion.sourcePath}: TSX exclusion requires an audience`);
  }
}

function validatePlainTomiyamaBoundary() {
  const root = process.cwd();
  const learnerSourcePaths = [
    "src/app/elementary",
    "src/components/elementary",
    "src/data/elementary/showcases",
    "src/data/elementary/ui-copy.ts",
  ];
  for (const relativePath of learnerSourcePaths) {
    const absolutePath = path.join(root, relativePath);
    const files = fs.statSync(absolutePath).isDirectory()
      ? fs.readdirSync(absolutePath, { recursive: true, withFileTypes: true })
          .filter((entry) => entry.isFile() && /\.(?:ts|tsx)$/u.test(entry.name))
          .map((entry) => path.join(entry.parentPath, entry.name))
      : [absolutePath];
    for (const file of files) {
      check(!fs.readFileSync(file, "utf8").includes("冨山先生"), `plain learner-facing Tomiyama name remains in ${path.relative(root, file)}`);
    }
  }
}

function main() {
  validateOfficialData();
  validatePoliciesAndExceptions();
  validateLearnerContent();
  validateTsxStaticText();
  validatePlainTomiyamaBoundary();

  const approvedExceptionCount = ELEMENTARY_RUBY_EXCEPTIONS.filter((entry) => entry.reviewStatus === "approved").length;
  const unlearnedViolationCount = violations.filter((entry) => entry.type === "unlearned-kanji").length;
  const unassignedViolationCount = violations.filter((entry) => entry.type === "unassigned-kanji").length;
  const rubyViolationTypes = new Set(["invalid-ruby", "missing-ruby-exception", "ruby-exception-mismatch", "unapproved-exception", "empty-reading", "empty-base"]);
  const rubyViolationCount = violations.filter((entry) => rubyViolationTypes.has(entry.type)).length;

  console.log(`official assignment total: ${ELEMENTARY_KANJI_ENTRIES.length}`);
  console.log(`grade counts: ${ELEMENTARY_KANJI_GRADES.map((grade) => `${grade}=${ELEMENTARY_KANJI_BY_GRADE[grade].length}`).join(", ")}`);
  console.log(`cumulative counts: ${ELEMENTARY_KANJI_GRADES.map((grade) => `${grade}=${getCumulativeKanjiThroughGrade(grade).length}`).join(", ")}`);
  console.log(`inspected string count: ${inspectedStringCount}`);
  console.log(`inspected Han count: ${inspectedHanCount}`);
  console.log(`approved exception count: ${approvedExceptionCount}`);
  console.log(`unlearned-kanji violations: ${unlearnedViolationCount}`);
  console.log(`unassigned-kanji violations: ${unassignedViolationCount}`);
  console.log(`ruby violations: ${rubyViolationCount}`);
  console.log(`violations: ${violations.length}`);
  console.log(`exclusions: ${exclusionCount}`);
  console.log(`developer audience count: ${developerAudienceCount}`);

  if (issues.length || violations.length) {
    console.error(`elementary kanji QA FAILED: ${issues.length} data issue(s), ${violations.length} text violation(s).`);
    issues.forEach((issue) => console.error(`- ${issue}`));
    violations.forEach((violation) => console.error(JSON.stringify(violation)));
    process.exitCode = 1;
    return;
  }
  console.log("elementary kanji QA passed: official data, independent cross-check, policies, ruby, learner copy, and TSX boundaries are valid.");
}

main();
