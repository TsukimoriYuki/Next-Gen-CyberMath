import {
  ELEMENTARY_CHARACTERS_BY_ID,
} from "../src/data/elementary/characters";
import {
  ELEMENTARY_JAPANESE_FEELINGS_LESSON,
  ELEMENTARY_LESSONS,
  ELEMENTARY_MATH_DIVISION_LESSON,
  ELEMENTARY_SOCIAL_MAP_LESSON,
} from "../src/data/elementary/lessons";
import { ELEMENTARY_UNITS } from "../src/data/elementary/units";
import {
  ELEMENTARY_CURRICULUM_ENTRIES_BY_ID,
  ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID,
} from "../src/data/elementary/curriculum";
import { getElementaryKanjiPolicy } from "../src/data/elementary/kanji/policies";
import {
  ELEMENTARY_PROHIBITED_PHRASES,
  getElementaryGradeSpeechPolicy,
} from "../src/data/elementary/speech-policies";
import { getApprovedElementaryVisualAsset } from "../src/lib/elementary-assets";
import { getProblemsForLesson } from "../src/lib/elementary-problems";
import { inspectElementaryText } from "../src/lib/elementary-kanji";
import {
  extractElementaryInlineText,
  getElementaryLessonTextFields,
} from "../src/lib/elementary-text";
import type {
  ElementaryDialogueBlock,
  ElementaryLesson,
} from "../src/types/elementary-content";

// 情報は現在のコードで確認する pilot 講座 QA。
// 実行例: npx tsx scripts/check-elementary-pilot-lessons.ts

const issues: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) issues.push(message);
};

const unitById = new Map(ELEMENTARY_UNITS.map((unit) => [unit.id, unit] as const));
const lessonIds = new Set(ELEMENTARY_LESSONS.map((lesson) => lesson.id));
const grade3Policy = getElementaryKanjiPolicy("grade-3");
const normalizedProhibitedPatterns = [
  /こんな.*簡単/u,
  /ことも分から/u,
  /当たり前/u,
  /ちゃんと考/u,
  /頭が悪/u,
];

function inspectLessonKanji(lesson: ElementaryLesson) {
  for (const field of getElementaryLessonTextFields(lesson)) {
    const result = inspectElementaryText({
      content: field.content,
      grade: 3,
      audience: "learner",
      policy: grade3Policy,
      context: "lesson",
      sourceLocation: `src/data/elementary/lessons/${lesson.slug}`,
      contentId: lesson.id,
      fieldPath: field.path,
    });
    for (const violation of result.violations) {
      issues.push(
        `kanji ${lesson.id}.${field.path}: ${violation.type} "${violation.character}" (${violation.reason})`,
      );
    }
  }
}

function validateDialogue(
  lesson: ElementaryLesson,
  block: ElementaryDialogueBlock,
  normalizedLines: Set<string>,
) {
  const policy = getElementaryGradeSpeechPolicy(lesson.grade);
  const limit = policy?.maxDialogueCharacters ?? 0;
  check(block.lines.length >= 2 && block.lines.length <= 4, `${lesson.id} ${block.id}: dialogue must have 2-4 lines`);
  check(new Set(block.lines.map((line) => line.speakerId)).size >= 2, `${lesson.id} ${block.id}: dialogue needs 2 speakers`);
  for (const line of block.lines) {
    const speaker = ELEMENTARY_CHARACTERS_BY_ID[line.speakerId];
    check(Boolean(speaker), `${lesson.id} ${line.id}: speaker must resolve`);
    check(speaker?.permittedIntents.includes(line.intent) === true, `${lesson.id} ${line.id}: intent "${line.intent}" not permitted for ${line.speakerId}`);
    const lineText = extractElementaryInlineText(line.content);
    check(lineText.length <= limit, `${lesson.id} ${line.id}: dialogue line exceeds ${limit} chars (${lineText.length})`);
    const normalized = lineText.replace(/\s+/gu, "");
    check(!normalizedLines.has(normalized), `${lesson.id} ${line.id}: duplicate dialogue line`);
    normalizedLines.add(normalized);
    check(
      !ELEMENTARY_PROHIBITED_PHRASES.some((phrase) => lineText.includes(phrase)) &&
        !normalizedProhibitedPatterns.some((pattern) => pattern.test(lineText)),
      `${lesson.id} ${line.id}: prohibited phrase`,
    );
  }
}

function validateLesson(lesson: ElementaryLesson, expectedSubject: string) {
  const label = lesson.id;
  check(lesson.subject === expectedSubject, `${label} subject must be ${expectedSubject}`);
  check(lesson.grade === "grade-3", `${label} must be grade-3`);
  check(lesson.courseType === "regular", `${label} must be regular course`);
  check(lesson.publicationStatus === "beta", `${label} must be limited-beta content`);
  check(lesson.reviewStatus === "pilot", `${label} must be pilot`);
  check(lesson.sourceType === "original", `${label} sourceType must be original`);
  check(lesson.copyrightStatus === "original", `${label} copyrightStatus must be original`);
  check(lesson.estimatedMinutes > 0, `${label} estimatedMinutes must be positive`);

  const unit = unitById.get(lesson.unitId);
  check(Boolean(unit), `${label} unit must resolve`);
  check(unit?.lessonIds.includes(lesson.id) === true, `${label} unit must list this lesson`);

  check(lesson.prerequisiteLessonIds.every((id) => lessonIds.has(id)), `${label} prerequisites must resolve`);
  check(!lesson.nextLessonId || lessonIds.has(lesson.nextLessonId), `${label} nextLessonId must resolve`);

  check(
    lesson.curriculumReferenceIds.every((id) => Boolean(ELEMENTARY_CURRICULUM_ENTRIES_BY_ID[id])),
    `${label} curriculum entries must resolve`,
  );
  check(
    lesson.curriculumObjectiveIds.every((id) => Boolean(ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID[id])),
    `${label} curriculum objectives must resolve`,
  );
  check(lesson.requirementCoverage.every((coverage) => coverage.lessonCoverage === "partial"), `${label} pilot lesson coverage must be partial`);

  // 問題参照。
  check(lesson.problemIds.length === 8, `${label} must reference 8 problems`);
  check(new Set(lesson.problemIds).size === 8, `${label} problem IDs must be unique`);
  const resolved = getProblemsForLesson(lesson.id);
  check(resolved.length === 8, `${label} must resolve 8 problems`);
  check(
    lesson.problemIds.every((id) => resolved.some((problem) => problem.id === id)),
    `${label} problem references must resolve`,
  );

  // ブロック構成。
  const blockIds = lesson.blocks.map((block) => block.id);
  check(new Set(blockIds).size === blockIds.length, `${label} block IDs must be unique`);
  const count = (type: string) => lesson.blocks.filter((block) => block.type === type).length;
  check(count("opening-question") === 1, `${label} needs exactly one opening-question`);
  check(count("learning-goals") === 1, `${label} needs exactly one learning-goals`);
  check(count("dialogue") >= 1, `${label} needs a dialogue`);
  check(count("explanation") >= 1, `${label} needs an explanation`);
  check(count("key-point") >= 1, `${label} needs a key-point`);
  check(count("guided-example") >= 1, `${label} needs a guided-example`);
  check(count("retry") >= 1, `${label} needs a retry`);
  check(count("summary") === 1, `${label} needs exactly one summary`);
  check(count("practice-set") === 1, `${label} needs exactly one practice-set`);

  // practice-set 参照。
  const practice = lesson.blocks.find((block) => block.type === "practice-set");
  if (practice && practice.type === "practice-set") {
    check(
      JSON.stringify(practice.problemIds) === JSON.stringify(lesson.problemIds),
      `${label} practice-set problemIds must match lesson problemIds`,
    );
  }

  // visual asset 一致。
  const visualIds = lesson.blocks.flatMap((block) => (block.type === "visual" && block.assetId ? [block.assetId] : []));
  check(
    JSON.stringify(visualIds) === JSON.stringify(lesson.visualAssetIds),
    `${label} visualAssetIds must match visual blocks`,
  );
  check(
    lesson.visualAssetIds.every((id) => Boolean(getApprovedElementaryVisualAsset(id))),
    `${label} visual assets must be approved`,
  );

  // 会話ルール。
  const normalizedLines = new Set<string>();
  const allLines = lesson.blocks
    .filter((block): block is ElementaryDialogueBlock => block.type === "dialogue")
    .flatMap((block) => block.lines.map((line) => ({ line, blockId: block.id })));
  for (const block of lesson.blocks) {
    if (block.type === "dialogue") validateDialogue(lesson, block, normalizedLines);
  }

  const firstMisconception = allLines.find(({ line }) => line.intent === "misconception");
  check(Boolean(firstMisconception), `${label} needs a misconception line`);
  if (firstMisconception) {
    const misconceptionLineId = firstMisconception.line.id;
    const misconceptionId = firstMisconception.line.intent === "misconception" ? firstMisconception.line.misconceptionId : "";
    const firstTeacher = allLines
      .slice(allLines.indexOf(firstMisconception) + 1)
      .find(({ line }) => line.speakerId === "tomiyama");
    check(firstTeacher?.line.intent === "acknowledgement", `${label} first teacher reply must acknowledge`);
    const teacherText = firstTeacher ? extractElementaryInlineText(firstTeacher.line.content) : "";
    check(teacherText.includes("？") && !/[＝=]/u.test(teacherText), `${label} first teacher reply must ask, not answer`);

    const handledLater = allLines.some(({ line }) => line.relatedLineId === misconceptionLineId && line.id !== misconceptionLineId);
    check(handledLater, `${label} misconception must be handled later`);

    const retried = lesson.blocks.some(
      (block) =>
        block.type === "retry" &&
        block.originalMisconceptionId === misconceptionId &&
        block.response.relatedLineId === misconceptionLineId &&
        block.response.speakerId === "hinano",
    );
    check(retried, `${label} misconception must be retried by hinano`);

    const retryBlock = lesson.blocks.find((block) => block.type === "retry");
    if (retryBlock && retryBlock.type === "retry") {
      const retryText = extractElementaryInlineText(retryBlock.response.content);
      check(retryText.length <= 60, `${label} retry response exceeds 60 chars`);
    }
  }
  check(
    allLines.some(({ line }) => line.speakerId === "hinano" && line.intent === "self-explanation"),
    `${label} needs a hinano self-explanation`,
  );

  // 開発者向け表現が子ども向け本文へ混ざらない。
  check(
    !/(?:学習指導要領|https?:\/\/|mext\.go\.jp|prototype|TODO|TBD)/iu.test(JSON.stringify(lesson.blocks)),
    `${label} child content must not include developer wording`,
  );

  inspectLessonKanji(lesson);
}

function main() {
  check(Boolean(grade3Policy), "grade-3 kanji policy must resolve");
  check(ELEMENTARY_LESSONS.length === 3, `pilot must ship 3 lessons (found ${ELEMENTARY_LESSONS.length})`);
  check(new Set(ELEMENTARY_LESSONS.map((l) => l.subject)).size === 3, "pilot lessons must cover 3 distinct subjects");

  validateLesson(ELEMENTARY_MATH_DIVISION_LESSON, "math");
  validateLesson(ELEMENTARY_JAPANESE_FEELINGS_LESSON, "japanese");
  validateLesson(ELEMENTARY_SOCIAL_MAP_LESSON, "social-studies");

  // 教材内容の軽い妥当性。
  const mathText = getElementaryLessonTextFields(ELEMENTARY_MATH_DIVISION_LESSON)
    .map((field) => extractElementaryInlineText(field.content))
    .join(" ");
  check(mathText.includes("わり算"), "math lesson must define わり算");
  const socialText = getElementaryLessonTextFields(ELEMENTARY_SOCIAL_MAP_LESSON)
    .map((field) => extractElementaryInlineText(field.content))
    .join(" ");
  check(socialText.includes("地図"), "social lesson must discuss 地図");

  // 物語本文の文字数。
  const storyBlock = ELEMENTARY_JAPANESE_FEELINGS_LESSON.blocks.find((block) => block.id === "feelings-story-text");
  if (storyBlock && storyBlock.type === "explanation") {
    const storyLength = storyBlock.paragraphs
      .map((paragraph) => extractElementaryInlineText(paragraph))
      .join("")
      .length;
    check(storyLength >= 700 && storyLength <= 1000, `Japanese story must be 700-1000 chars (found ${storyLength})`);
  } else {
    issues.push("Japanese lesson is missing its story block");
  }

  // 社会の地図 asset が社会 lesson の visual block から参照されている。
  const mapReferenced = ELEMENTARY_SOCIAL_MAP_LESSON.blocks.some(
    (block) => block.type === "visual" && block.assetId === "hikari-city-aoba-neighborhood-map",
  );
  check(mapReferenced, "social lesson must reference the neighborhood map asset");

  if (issues.length) {
    console.error(`elementary pilot-lesson QA FAILED: ${issues.length} issue(s).`);
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exitCode = 1;
    return;
  }
  console.log(
    `elementary pilot-lesson QA passed: 3 lessons (math / Japanese / social), block structure, dialogue rules, story length, asset and problem references, kanji grade-3 clean.`,
  );
}

main();
