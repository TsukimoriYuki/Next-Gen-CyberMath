import type {
  ElementaryInlineContent,
  ElementaryLesson,
  ElementaryLessonBlock,
} from "@/types/elementary-content";
import { getElementaryGrade, getElementarySubject } from "@/data/elementary";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import {
  getCurriculumCoverageForLesson,
  getElementaryCurriculumEntry,
} from "@/lib/elementary-curriculum";
import { resolvePracticeSetProblems } from "@/lib/elementary-problems";
import { ElementaryDialogue, ElementaryDialogueLineView } from "./ElementaryDialogue";
import { ElementaryPracticeRunner } from "./ElementaryPracticeRunner";
import { ElementaryText } from "./ElementaryText";
import { ElementaryVisualAsset } from "./ElementaryVisualAsset";
import styles from "./ElementaryLesson.module.css";

function blockHeadingId(lessonId: string, blockId: string) {
  return `${lessonId}-${blockId}-heading`;
}

function copyContent(id: string): ElementaryInlineContent {
  return [{ type: "text", text: elementaryUiCopy(id) }];
}

function SectionHeading({
  id,
  content,
}: {
  id: string;
  content: ElementaryInlineContent;
}) {
  return (
    <h2 id={id} className={styles.blockTitle}>
      <ElementaryText content={content} />
    </h2>
  );
}

function assertNeverBlock(block: never): never {
  const unknownBlock = block as { id?: string; type?: string };
  throw new Error(
    `Unknown elementary lesson block: ${unknownBlock.type ?? "missing type"} (${unknownBlock.id ?? "missing id"})`,
  );
}

function renderBlock(lessonId: string, block: ElementaryLessonBlock) {
  const headingId = blockHeadingId(lessonId, block.id);
  switch (block.type) {
    case "opening-question":
      return (
        <section className={`${styles.block} ${styles.opening}`} aria-labelledby={headingId}>
          <SectionHeading id={headingId} content={copyContent("lesson-opening-heading")} />
          <p className={styles.openingQuestion}><ElementaryText content={block.question} /></p>
        </section>
      );
    case "learning-goals":
      return (
        <section className={styles.block} aria-labelledby={headingId}>
          <SectionHeading id={headingId} content={copyContent("lesson-goals-heading")} />
          <ul className={styles.itemList}>
            {block.items.map((item, index) => <li key={`${block.id}-${index}`}><ElementaryText content={item} /></li>)}
          </ul>
        </section>
      );
    case "dialogue":
      return (
        <section className={styles.block} aria-labelledby={headingId} data-testid="elementary-dialogue-block">
          <SectionHeading id={headingId} content={block.title ?? copyContent("lesson-dialogue-heading")} />
          <ElementaryDialogue block={block} />
        </section>
      );
    case "explanation":
      return (
        <section className={styles.block} aria-labelledby={headingId}>
          <SectionHeading id={headingId} content={block.title} />
          <div className={styles.prose}>
            {block.paragraphs.map((paragraph, index) => <p key={`${block.id}-${index}`}><ElementaryText content={paragraph} /></p>)}
          </div>
        </section>
      );
    case "key-point":
      return (
        <section className={`${styles.block} ${styles.keyPoint}`} aria-labelledby={headingId} data-testid="elementary-key-point">
          <SectionHeading id={headingId} content={block.title} />
          <ul className={styles.itemList}>
            {block.points.map((point, index) => <li key={`${block.id}-${index}`}><ElementaryText content={point} /></li>)}
          </ul>
        </section>
      );
    case "guided-example":
      return (
        <section className={`${styles.block} ${styles.guidedExample}`} aria-labelledby={headingId} data-testid="elementary-guided-example">
          <SectionHeading id={headingId} content={block.title} />
          <p className={styles.prompt}><ElementaryText content={block.prompt} /></p>
          <ol className={styles.stepList}>
            {block.steps.map((step) => <li key={step.id}><ElementaryText content={step.content} /></li>)}
          </ol>
          <div className={styles.answerBox}>
            <h3>{elementaryUiCopy("lesson-answer-heading")}</h3>
            <p><ElementaryText content={block.answer} /></p>
          </div>
          <div className={styles.checkBox}>
            <h3>{elementaryUiCopy("lesson-check-heading")}</h3>
            <p><ElementaryText content={block.check} /></p>
          </div>
        </section>
      );
    case "visual":
      return (
        <section className={styles.block} aria-labelledby={headingId} data-visual-purpose={block.visualPurpose}>
          <SectionHeading id={headingId} content={block.title} />
          <ElementaryVisualAsset
            assetId={block.assetId}
            fallbackText={block.fallbackText}
            captionOverride={block.captionOverride}
            creditDisplay={block.creditDisplay}
          />
        </section>
      );
    case "retry":
      return (
        <section className={`${styles.block} ${styles.retry}`} aria-labelledby={headingId} data-testid="elementary-retry-block">
          <SectionHeading id={headingId} content={block.title} />
          <p className={styles.prompt}><ElementaryText content={block.prompt} /></p>
          <ElementaryDialogueLineView line={block.response} />
        </section>
      );
    case "summary":
      return (
        <section className={`${styles.block} ${styles.summary}`} aria-labelledby={headingId} data-testid="elementary-summary-block">
          <SectionHeading id={headingId} content={copyContent("lesson-summary-heading")} />
          <ul className={styles.itemList}>
            {block.items.map((item, index) => <li key={`${block.id}-${index}`}><ElementaryText content={item} /></li>)}
          </ul>
        </section>
      );
    case "enrichment":
      return (
        <section className={`${styles.block} ${styles.enrichment}`} aria-labelledby={headingId}>
          <p className={styles.optionalLabel}>{elementaryUiCopy("lesson-enrichment-label")}</p>
          <SectionHeading id={headingId} content={block.title} />
          <div className={styles.prose}>
            {block.content.map((paragraph, index) => <p key={`${block.id}-${index}`}><ElementaryText content={paragraph} /></p>)}
          </div>
        </section>
      );
    case "practice-set": {
      const problems = resolvePracticeSetProblems(block.problemIds);
      return (
        <section className={styles.block} aria-labelledby={headingId} data-testid="elementary-practice-set">
          <SectionHeading id={headingId} content={block.title} />
          <div className={styles.prose}>
            <p><ElementaryText content={block.introduction} /></p>
          </div>
          <ElementaryPracticeRunner
            problems={problems}
            completionMessage={block.completionMessage}
            minimumScoreMessage={block.minimumScoreMessage}
          />
        </section>
      );
    }
    default:
      return assertNeverBlock(block);
  }
}

export function ElementaryLessonRenderer({ lesson }: { lesson: ElementaryLesson }) {
  const grade = getElementaryGrade(lesson.grade);
  const subject = getElementarySubject(lesson.subject);
  if (!grade || !subject) {
    throw new Error(`Unknown elementary lesson target: ${lesson.grade}/${lesson.subject}`);
  }
  const isPrototype = lesson.reviewStatus === "prototype";
  const curriculumCoverage = getCurriculumCoverageForLesson(lesson);
  const curriculumEntries = lesson.curriculumReferenceIds
    .map(getElementaryCurriculumEntry)
    .filter((entry) => entry !== undefined);
  return (
    <article className={styles.lesson} data-testid="elementary-lesson-renderer">
      <header className={styles.lessonHeader}>
        <p className={styles.prototypeLabel} data-text-audience="developer">
          {elementaryUiCopy(isPrototype ? "lesson-prototype-label" : "lesson-pilot-label")}
        </p>
        <h1 className={styles.lessonTitle}><ElementaryText content={lesson.title} /></h1>
        <p className={styles.lessonDescription}><ElementaryText content={lesson.description} /></p>
        <dl className={styles.lessonMeta} data-text-audience="developer">
          <div><dt>{elementaryUiCopy("lesson-meta-target-label")}</dt><dd>{grade.name}・{subject.name}</dd></div>
          <div><dt>{elementaryUiCopy("lesson-meta-duration-label")}</dt><dd>{elementaryUiCopy("lesson-meta-duration-prefix")}{lesson.estimatedMinutes}{elementaryUiCopy("lesson-meta-duration-suffix")}</dd></div>
          <div><dt>{elementaryUiCopy("lesson-meta-status-label")}</dt><dd>{elementaryUiCopy(isPrototype ? "lesson-meta-status-value" : "lesson-meta-pilot-status-value")}</dd></div>
        </dl>
        <p className={styles.prototypeNotice} data-text-audience="developer">
          {elementaryUiCopy(isPrototype ? "lesson-prototype-notice" : "lesson-pilot-notice")}
        </p>
        <aside className={styles.curriculumPanel} data-testid="elementary-curriculum-developer" data-text-audience="developer" aria-label="Curriculum接続">
          <h2>Curriculum接続</h2>
          <p>開発確認用です。子ども向け講座本文には表示しません。</p>
          <dl>
            <div><dt>必修entry</dt><dd>{curriculumEntries.map((entry) => entry.title).join("、")}</dd></div>
            <div><dt>objective</dt><dd>{lesson.curriculumObjectiveIds.length}件</dd></div>
            <div><dt>lesson coverage</dt><dd>{curriculumCoverage.map((coverage) => coverage.lessonCoverage).join("、")}</dd></div>
            <div><dt>assessment coverage</dt><dd>{curriculumCoverage.map((coverage) => coverage.assessmentCoverage).join("、")}</dd></div>
          </dl>
        </aside>
      </header>
      <div className={styles.blocks}>
        {lesson.blocks.map((block, index) => (
          <div
            key={block.id}
            data-lesson-block={block.type}
            data-block-index={index}
            className={styles.blockWrapper}
          >
            {renderBlock(lesson.id, block)}
          </div>
        ))}
      </div>
    </article>
  );
}
