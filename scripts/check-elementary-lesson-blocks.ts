import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import {
  ELEMENTARY_CHARACTERS,
  ELEMENTARY_CHARACTERS_BY_ID,
} from "../src/data/elementary/characters";
import { ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE } from "../src/data/elementary/showcases/division-dialogue";
import {
  ELEMENTARY_GRADE_SPEECH_POLICIES,
  ELEMENTARY_PROHIBITED_PHRASES,
  getElementaryGradeSpeechPolicy,
} from "../src/data/elementary/speech-policies";
import {
  getElementaryCourseType,
  getElementaryGrade,
  getElementarySubject,
} from "../src/data/elementary";
import { PRIMARY_NAVIGATION } from "../src/data/navigation";
import {
  extractElementaryInlineText,
  getElementaryLessonTextFields,
} from "../src/lib/elementary-text";
import {
  ELEMENTARY_CHARACTER_EMOTIONS,
  ELEMENTARY_DIALOGUE_INTENTS,
  type ElementaryDialogueBlock,
  type ElementaryDialogueLine,
  type ElementaryInlineContent,
  type ElementaryLesson,
  type ElementaryLessonBlock,
} from "../src/types/elementary-content";

type QaIssue = Readonly<{
  lessonId: string;
  blockId?: string;
  lineId?: string;
  fieldPath: string;
  ruleId: string;
  actual: unknown;
}>;

const issues: QaIssue[] = [];
const lesson: ElementaryLesson = ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE;
const lessons: readonly ElementaryLesson[] = [lesson];
const allowedBlockTypes = new Set([
  "opening-question",
  "learning-goals",
  "dialogue",
  "explanation",
  "key-point",
  "guided-example",
  "visual",
  "retry",
  "summary",
  "enrichment",
]);
const allowedSegmentTypes = new Set(["text", "ruby", "emphasis", "term"]);
const allowedEmotions = new Set<string>(ELEMENTARY_CHARACTER_EMOTIONS);
const allowedIntents = new Set<string>(ELEMENTARY_DIALOGUE_INTENTS);
const normalizedProhibitedPatterns = [
  /こんな.*簡単/u,
  /ことも分から/u,
  /当たり前/u,
  /ちゃんと考/u,
  /頭が悪/u,
  /勉強ができない/u,
  /普通は分か/u,
  /覚えるだけ/u,
  /理屈はいい/u,
];

function report(
  ruleId: string,
  fieldPath: string,
  actual: unknown,
  context: Readonly<{ blockId?: string; lineId?: string }> = {},
) {
  issues.push({
    lessonId: lesson.id,
    blockId: context.blockId,
    lineId: context.lineId,
    fieldPath,
    ruleId,
    actual,
  });
}

function requireRule(
  condition: boolean,
  ruleId: string,
  fieldPath: string,
  actual: unknown,
  context: Readonly<{ blockId?: string; lineId?: string }> = {},
) {
  if (!condition) report(ruleId, fieldPath, actual, context);
}

function hasDuplicates(values: readonly string[]): boolean {
  return new Set(values).size !== values.length;
}

function validateInlineContent(
  content: ElementaryInlineContent,
  fieldPath: string,
  context: Readonly<{ blockId?: string; lineId?: string }> = {},
) {
  requireRule(Array.isArray(content) && content.length > 0, "TEXT_CONTENT_REQUIRED", fieldPath, content, context);
  content.forEach((segment, segmentIndex) => {
    const segmentPath = `${fieldPath}[${segmentIndex}]`;
    requireRule(allowedSegmentTypes.has(segment.type), "TEXT_SEGMENT_TYPE", `${segmentPath}.type`, segment.type, context);
    const values = segment.type === "ruby"
      ? [segment.base, segment.reading]
      : [segment.text, ...(segment.type === "term" && segment.definition ? [segment.definition] : [])];
    values.forEach((value, valueIndex) => {
      requireRule(value.trim().length > 0, "TEXT_VALUE_REQUIRED", `${segmentPath}.value[${valueIndex}]`, value, context);
      requireRule(!/<\/?[a-z][^>]*>/iu.test(value), "TEXT_HTML_FORBIDDEN", `${segmentPath}.value[${valueIndex}]`, value, context);
      requireRule(!/(?:https?:\/\/|javascript:)/iu.test(value), "TEXT_DANGEROUS_URL", `${segmentPath}.value[${valueIndex}]`, value, context);
      requireRule(!/(?:TODO|TBD|PLACEHOLDER|LOREM)/iu.test(value), "TEXT_PLACEHOLDER_FORBIDDEN", `${segmentPath}.value[${valueIndex}]`, value, context);
    });
    if (segment.type === "ruby") {
      requireRule(segment.base.trim().length > 0, "RUBY_BASE_REQUIRED", `${segmentPath}.base`, segment.base, context);
      requireRule(segment.reading.trim().length > 0, "RUBY_READING_REQUIRED", `${segmentPath}.reading`, segment.reading, context);
    }
  });
  const extracted = extractElementaryInlineText(content);
  requireRule(extracted.trim().length > 0, "TEXT_EXTRACTION_REQUIRED", fieldPath, extracted, context);
}

function validateCharacters() {
  const ids = ELEMENTARY_CHARACTERS.map((character) => character.id);
  const displayNames = ELEMENTARY_CHARACTERS.map((character) => character.displayName);
  requireRule(ids.join(",") === "hinano,tomiyama", "CHARACTER_REQUIRED_IDS", "characters.ids", ids);
  requireRule(!hasDuplicates(ids), "CHARACTER_ID_UNIQUE", "characters.ids", ids);
  requireRule(!hasDuplicates(displayNames), "CHARACTER_NAME_UNIQUE", "characters.displayNames", displayNames);

  for (const character of ELEMENTARY_CHARACTERS) {
    requireRule(
      (character.id === "hinano" && character.role === "student") ||
        (character.id === "tomiyama" && character.role === "teacher"),
      "CHARACTER_ROLE_MATCH",
      `characters.${character.id}.role`,
      character.role,
    );
    requireRule(allowedEmotions.has(character.defaultEmotion), "CHARACTER_DEFAULT_EMOTION", `characters.${character.id}.defaultEmotion`, character.defaultEmotion);
    requireRule(character.permittedIntents.length > 0, "CHARACTER_INTENTS_REQUIRED", `characters.${character.id}.permittedIntents`, character.permittedIntents);
    character.permittedIntents.forEach((intent) => {
      requireRule(allowedIntents.has(intent), "CHARACTER_INTENT_VALID", `characters.${character.id}.permittedIntents`, intent);
    });
    requireRule(character.fallback.symbol.trim().length > 0, "CHARACTER_FALLBACK_SYMBOL", `characters.${character.id}.fallback.symbol`, character.fallback.symbol);
    requireRule(character.fallback.label.trim().length > 0, "CHARACTER_FALLBACK_LABEL", `characters.${character.id}.fallback.label`, character.fallback.label);
    validateInlineContent(character.displayNameContent, `characters.${character.id}.displayNameContent`);
    requireRule(character.characterLabel.trim().length > 0, "CHARACTER_LABEL_REQUIRED", `characters.${character.id}.characterLabel`, character.characterLabel);
    requireRule(character.accessibilityLabel.trim().length > 0, "CHARACTER_A11Y_LABEL", `characters.${character.id}.accessibilityLabel`, character.accessibilityLabel);
    requireRule(character.speechPolicy.principles.length > 0, "CHARACTER_SPEECH_POLICY", `characters.${character.id}.speechPolicy`, character.speechPolicy);
  }
  requireRule(ELEMENTARY_CHARACTERS_BY_ID.tomiyama?.displayName === "冨山先生", "TOMIYAMA_NAME", "characters.tomiyama.displayName", ELEMENTARY_CHARACTERS_BY_ID.tomiyama?.displayName);
  const tomiyamaName = ELEMENTARY_CHARACTERS_BY_ID.tomiyama?.displayNameContent;
  requireRule(
    tomiyamaName?.some(
      (segment) =>
        segment.type === "ruby" &&
        segment.base === "冨山" &&
        segment.reading === "とみやま" &&
        segment.exceptionId === "proper-name-tomiyama",
    ) === true,
    "TOMIYAMA_RUBY_NAME",
    "characters.tomiyama.displayNameContent",
    tomiyamaName,
  );
}

function validateSpeechPolicies() {
  const expectedLimits = new Map([
    ["grade-3", 60],
    ["grade-4", 70],
    ["grade-5", 80],
    ["grade-6", 90],
  ]);
  requireRule(ELEMENTARY_GRADE_SPEECH_POLICIES.length === 4, "SPEECH_POLICY_GRADES", "speechPolicies.length", ELEMENTARY_GRADE_SPEECH_POLICIES.length);
  for (const policy of ELEMENTARY_GRADE_SPEECH_POLICIES) {
    requireRule(policy.maxDialogueCharacters === expectedLimits.get(policy.gradeId), "SPEECH_POLICY_LIMIT", `speechPolicies.${policy.gradeId}.maxDialogueCharacters`, policy.maxDialogueCharacters);
    requireRule(policy.maxIdeasPerLine === 1, "SPEECH_POLICY_ONE_IDEA", `speechPolicies.${policy.gradeId}.maxIdeasPerLine`, policy.maxIdeasPerLine);
    requireRule(policy.rephraseDifficultTerms, "SPEECH_POLICY_REPHRASE", `speechPolicies.${policy.gradeId}.rephraseDifficultTerms`, policy.rephraseDifficultTerms);
  }
}

function validateDialogueBlock(
  block: ElementaryDialogueBlock,
  blockIndex: number,
  lineIds: Set<string>,
  normalizedLines: Set<string>,
  misconceptionLines: Map<string, Readonly<{ lineId: string; blockIndex: number }>>,
  allLines: Array<Readonly<{ line: ElementaryDialogueLine; blockIndex: number }>>,
) {
  const context = { blockId: block.id };
  requireRule(block.lines.length >= 2 && block.lines.length <= 4, "DIALOGUE_LINE_COUNT", `blocks[${blockIndex}].lines.length`, block.lines.length, context);
  requireRule(new Set(block.lines.map((line) => line.speakerId)).size >= 2, "DIALOGUE_MULTIPLE_SPEAKERS", `blocks[${blockIndex}].lines.speakers`, block.lines.map((line) => line.speakerId), context);
  const policy = getElementaryGradeSpeechPolicy(lesson.grade);

  block.lines.forEach((line, lineIndex) => {
    const lineContext = { blockId: block.id, lineId: line.id };
    const linePath = `blocks[${blockIndex}].lines[${lineIndex}]`;
    requireRule(!lineIds.has(line.id), "DIALOGUE_LINE_ID_UNIQUE", `${linePath}.id`, line.id, lineContext);
    lineIds.add(line.id);
    requireRule(Boolean(ELEMENTARY_CHARACTERS_BY_ID[line.speakerId]), "DIALOGUE_SPEAKER_RESOLVES", `${linePath}.speakerId`, line.speakerId, lineContext);
    requireRule(allowedIntents.has(line.intent), "DIALOGUE_INTENT_VALID", `${linePath}.intent`, line.intent, lineContext);
    requireRule(allowedEmotions.has(line.emotion), "DIALOGUE_EMOTION_VALID", `${linePath}.emotion`, line.emotion, lineContext);
    requireRule(ELEMENTARY_CHARACTERS_BY_ID[line.speakerId]?.permittedIntents.includes(line.intent) === true, "DIALOGUE_INTENT_PERMITTED", `${linePath}.intent`, line.intent, lineContext);
    validateInlineContent(line.content, `${linePath}.content`, lineContext);
    const lineText = extractElementaryInlineText(line.content);
    requireRule(lineText.length <= (policy?.maxDialogueCharacters ?? 0), "DIALOGUE_GRADE_LENGTH", `${linePath}.content`, { length: lineText.length, text: lineText }, lineContext);
    const normalized = lineText.replace(/\s+/gu, "");
    requireRule(!normalizedLines.has(normalized), "DIALOGUE_CONTENT_UNIQUE", `${linePath}.content`, lineText, lineContext);
    normalizedLines.add(normalized);
    requireRule(!ELEMENTARY_PROHIBITED_PHRASES.some((phrase) => lineText.includes(phrase)) && !normalizedProhibitedPatterns.some((pattern) => pattern.test(lineText)), "DIALOGUE_PROHIBITED_PHRASE", `${linePath}.content`, lineText, lineContext);
    if (line.intent === "misconception") {
      requireRule(line.misconceptionId.trim().length > 0, "MISCONCEPTION_ID_REQUIRED", `${linePath}.misconceptionId`, line.misconceptionId, lineContext);
      validateInlineContent(line.rationale, `${linePath}.rationale`, lineContext);
      misconceptionLines.set(line.misconceptionId, { lineId: line.id, blockIndex });
    }
    allLines.push({ line, blockIndex });
  });
}

function validateLesson() {
  requireRule(!hasDuplicates(lessons.map((entry) => entry.id)), "LESSON_ID_UNIQUE", "lessons.ids", lessons.map((entry) => entry.id));
  requireRule(!hasDuplicates(lessons.map((entry) => entry.slug)), "LESSON_SLUG_UNIQUE", "lessons.slugs", lessons.map((entry) => entry.slug));
  requireRule(Boolean(getElementaryGrade(lesson.grade)), "LESSON_GRADE_RESOLVES", "grade", lesson.grade);
  requireRule(Boolean(getElementarySubject(lesson.subject)), "LESSON_SUBJECT_RESOLVES", "subject", lesson.subject);
  requireRule(Boolean(getElementaryCourseType(lesson.courseType)), "LESSON_COURSE_RESOLVES", "courseType", lesson.courseType);
  requireRule(lesson.publicationStatus === "hidden", "LESSON_HIDDEN", "publicationStatus", lesson.publicationStatus);
  requireRule(lesson.sourceType === "original", "LESSON_SOURCE_ORIGINAL", "sourceType", lesson.sourceType);
  requireRule(lesson.copyrightStatus === "original", "LESSON_COPYRIGHT_ORIGINAL", "copyrightStatus", lesson.copyrightStatus);
  requireRule(lesson.reviewStatus === "prototype", "LESSON_REVIEW_PROTOTYPE", "reviewStatus", lesson.reviewStatus);
  requireRule(lesson.problemIds.length === 0, "LESSON_NO_PROBLEMS", "problemIds", lesson.problemIds);

  const blockIds = lesson.blocks.map((block) => block.id);
  requireRule(!hasDuplicates(blockIds), "LESSON_BLOCK_ID_UNIQUE", "blocks.ids", blockIds);
  for (const block of lesson.blocks) {
    requireRule(allowedBlockTypes.has(block.type), "LESSON_BLOCK_TYPE_VALID", `blocks.${block.id}.type`, block.type, { blockId: block.id });
  }
  const count = (type: ElementaryLessonBlock["type"]) => lesson.blocks.filter((block) => block.type === type).length;
  requireRule(count("opening-question") === 1, "LESSON_ONE_OPENING", "blocks.opening-question", count("opening-question"));
  requireRule(count("learning-goals") === 1, "LESSON_ONE_GOALS", "blocks.learning-goals", count("learning-goals"));
  requireRule(count("dialogue") >= 1, "LESSON_DIALOGUE_REQUIRED", "blocks.dialogue", count("dialogue"));
  requireRule(count("explanation") >= 1, "LESSON_EXPLANATION_REQUIRED", "blocks.explanation", count("explanation"));
  requireRule(count("key-point") >= 1, "LESSON_KEY_POINT_REQUIRED", "blocks.key-point", count("key-point"));
  requireRule(count("guided-example") >= 1, "LESSON_GUIDED_EXAMPLE_REQUIRED", "blocks.guided-example", count("guided-example"));
  requireRule(count("retry") >= 1, "LESSON_RETRY_REQUIRED", "blocks.retry", count("retry"));
  requireRule(count("summary") === 1, "LESSON_ONE_SUMMARY", "blocks.summary", count("summary"));

  const lineIds = new Set<string>();
  const normalizedLines = new Set<string>();
  const misconceptionLines = new Map<string, Readonly<{ lineId: string; blockIndex: number }>>();
  const allLines: Array<Readonly<{ line: ElementaryDialogueLine; blockIndex: number }>> = [];

  lesson.blocks.forEach((block, blockIndex) => {
    if (block.type === "dialogue") {
      validateDialogueBlock(block, blockIndex, lineIds, normalizedLines, misconceptionLines, allLines);
    }
    if (block.type === "guided-example") {
      requireRule(extractElementaryInlineText(block.answer).trim().length > 0, "GUIDED_ANSWER_REQUIRED", `blocks[${blockIndex}].answer`, block.answer, { blockId: block.id });
      requireRule(block.steps.length > 0, "GUIDED_STEPS_REQUIRED", `blocks[${blockIndex}].steps`, block.steps, { blockId: block.id });
    }
    if (block.type === "visual") {
      requireRule(extractElementaryInlineText(block.fallbackText).trim().length > 0, "VISUAL_FALLBACK_REQUIRED", `blocks[${blockIndex}].fallbackText`, block.fallbackText, { blockId: block.id });
    }
    if (block.type === "retry") {
      requireRule(block.response.speakerId === "hinano", "RETRY_HINANO_REQUIRED", `blocks[${blockIndex}].response.speakerId`, block.response.speakerId, { blockId: block.id, lineId: block.response.id });
      validateInlineContent(block.response.content, `blocks[${blockIndex}].response.content`, { blockId: block.id, lineId: block.response.id });
      const retryText = extractElementaryInlineText(block.response.content);
      requireRule(retryText.length <= 60, "RETRY_GRADE_LENGTH", `blocks[${blockIndex}].response.content`, { length: retryText.length, text: retryText }, { blockId: block.id, lineId: block.response.id });
    }
    if (block.type === "enrichment") {
      requireRule(block.requiredForCompletion === false, "ENRICHMENT_NOT_REQUIRED", `blocks[${blockIndex}].requiredForCompletion`, block.requiredForCompletion, { blockId: block.id });
    }
  });

  for (const [misconceptionId, misconception] of misconceptionLines) {
    const handledLater = allLines.some(({ line, blockIndex }) => blockIndex >= misconception.blockIndex && line.relatedLineId === misconception.lineId);
    const retriedLater = lesson.blocks.some((block) => block.type === "retry" && block.originalMisconceptionId === misconceptionId && block.response.relatedLineId === misconception.lineId);
    requireRule(handledLater, "MISCONCEPTION_HANDLED", `misconceptions.${misconceptionId}`, misconception, { lineId: misconception.lineId });
    requireRule(retriedLater, "MISCONCEPTION_RETRIED", `misconceptions.${misconceptionId}`, misconception, { lineId: misconception.lineId });
  }

  const firstMisconceptionIndex = allLines.findIndex(({ line }) => line.intent === "misconception");
  const firstTeacherResponse = allLines.slice(firstMisconceptionIndex + 1).find(({ line }) => line.speakerId === "tomiyama");
  requireRule(firstTeacherResponse?.line.intent === "acknowledgement", "TEACHER_ACKNOWLEDGES_FIRST", "dialogue.firstTeacherResponse.intent", firstTeacherResponse?.line.intent);
  const firstTeacherResponseText = firstTeacherResponse ? extractElementaryInlineText(firstTeacherResponse.line.content) : "";
  requireRule(firstTeacherResponseText.includes("？") && !/[＝=]/u.test(firstTeacherResponseText), "TEACHER_ASKS_BEFORE_ANSWER", "dialogue.firstTeacherResponse.content", firstTeacherResponseText);
  requireRule(allLines.some(({ line }) => line.speakerId === "hinano" && line.intent === "self-explanation"), "HINANO_SELF_EXPLANATION", "dialogue.intents", allLines.map(({ line }) => line.intent));

  const explanationText = lesson.blocks
    .filter((block) => block.type === "explanation" || block.type === "key-point")
    .flatMap((block) => block.type === "explanation" ? block.paragraphs : block.points)
    .map((value) => extractElementaryInlineText(value))
    .join(" ");
  requireRule(explanationText.includes("わり算"), "DEFINITION_OUTSIDE_DIALOGUE", "blocks.explanation/key-point", explanationText);
  const summaryText = lesson.blocks
    .filter((block) => block.type === "summary")
    .flatMap((block) => block.items)
    .map((value) => extractElementaryInlineText(value))
    .join(" ");
  requireRule(/同じ数ずつ|一人分/u.test(summaryText), "SUMMARY_MAJOR_IDEA", "blocks.summary", summaryText);

  for (const field of getElementaryLessonTextFields(lesson)) {
    validateInlineContent(field.content, field.path);
  }
}

async function validateDiscoveryBoundaries() {
  const root = process.cwd();
  const showcaseRoute = "/elementary/showcase/lesson-blocks";
  const sitemapUrls = (await sitemap()).map((entry) => entry.url);
  requireRule(!sitemapUrls.some((url) => url.includes(showcaseRoute)), "SHOWCASE_NOT_IN_SITEMAP", "sitemap", sitemapUrls.filter((url) => url.includes("elementary")));
  requireRule(!PRIMARY_NAVIGATION.some((item) => item.href === showcaseRoute), "SHOWCASE_NOT_IN_NAVIGATION", "navigation", PRIMARY_NAVIGATION);

  for (const sourcePath of [
    "src/app/elementary/page.tsx",
    "src/app/elementary/grade-3/page.tsx",
    "src/data/elementary/index.ts",
  ]) {
    const source = fs.readFileSync(path.join(root, sourcePath), "utf8");
    requireRule(!source.includes("lesson-blocks") && !source.includes("division-dialogue"), "SHOWCASE_NOT_IN_PUBLIC_REGISTRY", sourcePath, source.match(/lesson-blocks|division-dialogue/gu));
  }
}

async function main() {
  validateCharacters();
  validateSpeechPolicies();
  validateLesson();
  await validateDiscoveryBoundaries();

  if (issues.length > 0) {
    console.error(`elementary lesson-block QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) {
      console.error(JSON.stringify(issue));
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `elementary lesson-block QA passed: ${ELEMENTARY_CHARACTERS.length} characters, ${lesson.blocks.length} blocks, structured text, dialogue lifecycle, and hidden boundaries are valid.`,
  );
}

void main();
