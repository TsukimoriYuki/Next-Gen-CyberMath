import type { Metadata } from "next";
import Link from "next/link";
import {
  ELEMENTARY_EXPANSION_WAVE_2_HUMAN_REVIEW_ITEMS,
  ELEMENTARY_EXPANSION_WAVE_2_LESSON_AUDITS,
  ELEMENTARY_EXPANSION_WAVE_2_REVIEW_RESPONSE_TEMPLATE,
} from "@/data/elementary/expansion-wave-2-final-audit";
import { ELEMENTARY_EXPANSION_WAVE_2 } from "@/data/elementary/expansion-wave-2";
import { getElementaryVisualAsset } from "@/lib/elementary-assets";
import { getElementaryCurriculumEntry } from "@/lib/elementary-curriculum";
import { getElementaryLessonById, getElementaryUnitById } from "@/lib/elementary-lessons";
import { extractElementaryInlineText } from "@/lib/elementary-text";
import inventoryStyles from "../content-inventory/ContentInventory.module.css";
import reviewStyles from "./ExpansionWaveTwoReview.module.css";

export const metadata: Metadata = {
  title: "小学3年生 算数 expansion wave 2 人間レビュー",
  description: "hidden教材10講座を人間が実画面で確認するための内部ページです。",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ElementaryExpansionWaveTwoReviewPage() {
  const audit = ELEMENTARY_EXPANSION_WAVE_2.finalTechnicalAudit;
  if (!audit) throw new Error("Expansion wave 2 final technical audit metadata is required.");

  const lessons = ELEMENTARY_EXPANSION_WAVE_2_LESSON_AUDITS.map((record) => {
    const lesson = getElementaryLessonById(record.lessonId);
    const unit = lesson ? getElementaryUnitById(lesson.unitId) : undefined;
    const asset = lesson?.visualAssetIds[0]
      ? getElementaryVisualAsset(lesson.visualAssetIds[0])
      : undefined;
    const curriculum = lesson?.curriculumReferenceIds[0]
      ? getElementaryCurriculumEntry(lesson.curriculumReferenceIds[0])
      : undefined;
    if (!lesson || !unit || !asset || !curriculum) {
      throw new Error(`Unresolved Wave 2 review reference: ${record.lessonId}`);
    }
    return { record, lesson, unit, asset, curriculum } as const;
  });

  return (
    <div className={inventoryStyles.page} data-testid="elementary-expansion-wave-2-review" data-text-audience="developer">
      <header className={inventoryStyles.header}>
        <p className={inventoryStyles.eyebrow}>HUMAN REVIEW WORKSPACE</p>
        <h1>小学3年生 算数 Wave 2 人間レビュー</h1>
        <p>ユーザー本人が10講座を実画面で確認するための内部ページです。技術監査の完了は、人間レビューや公開承認を意味しません。</p>
      </header>

      <p className={reviewStyles.statusNote} role="status">
        技術監査はcompleteです。人間レビューはnot-reviewed、公開承認はpending、公開状態はhidden、automatic releaseはfalseです。ブラウザ上から状態を変更する機能はありません。
      </p>

      <section className={inventoryStyles.section} aria-labelledby="wave-two-review-overview-heading">
        <h2 id="wave-two-review-overview-heading">Wave 2概要</h2>
        <dl className={inventoryStyles.definitionGrid}>
          <div><dt>単元</dt><dd>{ELEMENTARY_EXPANSION_WAVE_2.unitIds.length}件</dd></div>
          <div><dt>講座</dt><dd>{audit.auditedLessonCount}件</dd></div>
          <div><dt>問題</dt><dd>{audit.auditedProblemCount}問</dd></div>
          <div><dt>教材画像</dt><dd>{audit.auditedAssetCount}件</dd></div>
          <div><dt>技術監査</dt><dd>{audit.status}</dd></div>
          <div><dt>人間レビュー</dt><dd>{ELEMENTARY_EXPANSION_WAVE_2.humanReviews.math}</dd></div>
          <div><dt>公開承認</dt><dd>{ELEMENTARY_EXPANSION_WAVE_2.explicitReleaseApproval}</dd></div>
          <div><dt>公開状態</dt><dd>{ELEMENTARY_EXPANSION_WAVE_2.publicationStatus}</dd></div>
          <div><dt>自動公開</dt><dd>{String(ELEMENTARY_EXPANSION_WAVE_2.automaticRelease)}</dd></div>
          <div><dt>残存blocking issue</dt><dd>{audit.remainingBlockingIssueCount}件</dd></div>
        </dl>
      </section>

      <section className={inventoryStyles.section} aria-labelledby="wave-two-review-lessons-heading">
        <h2 id="wave-two-review-lessons-heading">確認する10講座</h2>
        <div className={inventoryStyles.subjectGrid}>
          {lessons.map(({ record, lesson, unit, asset, curriculum }) => (
            <article className={inventoryStyles.subjectCard} key={lesson.id} data-testid="wave-two-review-lesson-card">
              <h3>{extractElementaryInlineText(lesson.title)}</h3>
              <dl>
                <div><dt>単元</dt><dd>{extractElementaryInlineText(unit.title)}</dd></div>
                <div><dt>問題</dt><dd>{lesson.problemIds.length}問</dd></div>
                <div><dt>教材画像</dt><dd>{asset.title}</dd></div>
                <div><dt>curriculum entry</dt><dd>{curriculum.title}</dd></div>
                <div><dt>coverage</dt><dd>{lesson.requirementCoverage[0]?.lessonCoverage}</dd></div>
                <div><dt>技術監査</dt><dd>{record.technicalAuditStatus}</dd></div>
                <div><dt>修正した問題</dt><dd>{record.correctedProblemCount}問</dd></div>
                <div><dt>修正した本文</dt><dd>{record.correctedLessonTextCount}か所</dd></div>
                <div><dt>修正した画像</dt><dd>{record.correctedAssetCount}件</dd></div>
              </dl>
              <h4>残っている注意事項</h4>
              <ul className={reviewStyles.noteList}>
                {record.remainingAttention.map((note) => <li key={note}>{note}</li>)}
              </ul>
              <h4>人間確認項目</h4>
              <ul className={reviewStyles.checkList} aria-label="講座ごとの人間確認項目">
                {ELEMENTARY_EXPANSION_WAVE_2_HUMAN_REVIEW_ITEMS.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Link
                className={reviewStyles.lessonLink}
                data-testid="wave-two-review-lesson-link"
                href={`/elementary/grade-3/math/units/${unit.slug}/lessons/${lesson.slug}`}
              >
                開発環境で講座を確認する
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={inventoryStyles.section} aria-labelledby="wave-two-review-response-heading">
        <h2 id="wave-two-review-response-heading">ChatGPTへ返す確認形式</h2>
        <p>各行の「問題なし」または「修正点」を残して返してください。ここへ個人情報を入力する必要はありません。</p>
        <pre className={reviewStyles.responseTemplate} data-testid="wave-two-review-response-template">
          {ELEMENTARY_EXPANSION_WAVE_2_REVIEW_RESPONSE_TEMPLATE.join("\n")}
        </pre>
      </section>
    </div>
  );
}
