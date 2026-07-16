import type {
  ElementaryInlineContent,
  ElementaryLesson,
  ElementaryLessonBlock,
} from "@/types/elementary-content";
import { ElementaryDialogue, ElementaryDialogueLineView } from "./ElementaryDialogue";
import { ElementaryText } from "./ElementaryText";
import styles from "./ElementaryLesson.module.css";

function blockHeadingId(lessonId: string, blockId: string) {
  return `${lessonId}-${blockId}-heading`;
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
          <SectionHeading id={headingId} content={[{ type: "text", text: "今日の問い" }]} />
          <p className={styles.openingQuestion}><ElementaryText content={block.question} /></p>
        </section>
      );
    case "learning-goals":
      return (
        <section className={styles.block} aria-labelledby={headingId}>
          <SectionHeading id={headingId} content={[{ type: "text", text: "できるようになること" }]} />
          <ul className={styles.itemList}>
            {block.items.map((item, index) => <li key={`${block.id}-${index}`}><ElementaryText content={item} /></li>)}
          </ul>
        </section>
      );
    case "dialogue":
      return (
        <section className={styles.block} aria-labelledby={headingId} data-testid="elementary-dialogue-block">
          <SectionHeading id={headingId} content={block.title ?? [{ type: "text", text: "会話で考えよう" }]} />
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
            <h3>答え</h3>
            <p><ElementaryText content={block.answer} /></p>
          </div>
          <div className={styles.checkBox}>
            <h3>たしかめ</h3>
            <p><ElementaryText content={block.check} /></p>
          </div>
        </section>
      );
    case "visual":
      return (
        <section className={styles.block} aria-labelledby={headingId}>
          <SectionHeading id={headingId} content={block.title} />
          <p className={styles.visualFallback} data-visual-asset={block.assetId}>
            <span className={styles.fallbackLabel}>図の代わりの説明</span>
            <ElementaryText content={block.fallbackText} />
          </p>
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
          <SectionHeading id={headingId} content={[{ type: "text", text: "今日のまとめ" }]} />
          <ul className={styles.itemList}>
            {block.items.map((item, index) => <li key={`${block.id}-${index}`}><ElementaryText content={item} /></li>)}
          </ul>
        </section>
      );
    case "enrichment":
      return (
        <section className={`${styles.block} ${styles.enrichment}`} aria-labelledby={headingId}>
          <p className={styles.optionalLabel}>発展・できなくても大丈夫</p>
          <SectionHeading id={headingId} content={block.title} />
          <div className={styles.prose}>
            {block.content.map((paragraph, index) => <p key={`${block.id}-${index}`}><ElementaryText content={paragraph} /></p>)}
          </div>
        </section>
      );
    default:
      return assertNeverBlock(block);
  }
}

export function ElementaryLessonRenderer({ lesson }: { lesson: ElementaryLesson }) {
  return (
    <article className={styles.lesson} data-testid="elementary-lesson-renderer">
      <header className={styles.lessonHeader}>
        <p className={styles.prototypeLabel}>開発用の講座見本</p>
        <h1 className={styles.lessonTitle}><ElementaryText content={lesson.title} /></h1>
        <p className={styles.lessonDescription}><ElementaryText content={lesson.description} /></p>
        <dl className={styles.lessonMeta}>
          <div><dt>対象</dt><dd>小学3年生・算数</dd></div>
          <div><dt>所要時間</dt><dd>約{lesson.estimatedMinutes}分</dd></div>
          <div><dt>状態</dt><dd>非公開プロトタイプ</dd></div>
        </dl>
        <p className={styles.prototypeNotice}>これは表示と構造を確認する見本で、正式教材ではありません。</p>
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
