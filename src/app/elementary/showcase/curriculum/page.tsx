import type { Metadata } from "next";
import {
  ELEMENTARY_CURRICULUM_DOMAINS,
  ELEMENTARY_CURRICULUM_ENTRIES,
  ELEMENTARY_CURRICULUM_SOURCES,
} from "@/data/elementary/curriculum";
import { ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE } from "@/data/elementary/showcases/division-dialogue";
import { getCurriculumCoverageSummary } from "@/lib/elementary-curriculum";
import type { ElementarySubjectId } from "@/types/elementary";
import styles from "./CurriculumShowcase.module.css";

export const metadata: Metadata = {
  title: "小学生版 Curriculum Registry 確認",
  description: "小学3年生の算数・国語・社会curriculum registryを確認する内部ページです。",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const SUBJECTS: readonly Readonly<{ id: ElementarySubjectId; label: string }>[] = [
  { id: "math", label: "算数" },
  { id: "japanese", label: "国語" },
  { id: "social-studies", label: "社会" },
];

const competencyLabel = {
  "knowledge-and-skills": "knowledge-and-skills（知識・技能）",
  "thinking-judgment-expression": "thinking-judgment-expression（思考・判断・表現）",
  "learning-attitude": "learning-attitude（学びに向かう力）",
} as const;

export default function ElementaryCurriculumShowcasePage() {
  const coverage = getCurriculumCoverageSummary([ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE]);
  const requiredCount = ELEMENTARY_CURRICULUM_ENTRIES.filter((entry) => entry.requirementType === "required").length;
  const enrichmentCount = ELEMENTARY_CURRICULUM_ENTRIES.length - requiredCount;
  const unconnectedCount = coverage.filter((entry) => entry.lessonCoverage === "not-started").length;

  return (
    <div className={styles.page} data-testid="elementary-curriculum-showcase" data-text-audience="developer">
      <header className={styles.header}>
        <p className={styles.eyebrow}>INTERNAL CURRICULUM INSPECTION</p>
        <h1 className={styles.title}>小学3年生 Curriculum Registry</h1>
        <p className={styles.lead}>文部科学省の平成29年告示と各教科の解説を照合し、公式本文を転載せず、教材へ接続できる短い要約として管理しています。</p>
        <p className={styles.audience}>対象：developer / guardian。学習者向け教材ページではありません。</p>
      </header>

      <section className={styles.section} aria-labelledby="curriculum-summary-heading">
        <h2 id="curriculum-summary-heading" className={styles.sectionTitle}>Registry summary</h2>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}><span>全entry</span><strong>{ELEMENTARY_CURRICULUM_ENTRIES.length}</strong></article>
          <article className={styles.summaryCard}><span>required</span><strong>{requiredCount}</strong></article>
          <article className={styles.summaryCard}><span>enrichment</span><strong>{enrichmentCount}</strong></article>
          <article className={styles.summaryCard}><span>未接続entry</span><strong>{unconnectedCount}</strong></article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="curriculum-sources-heading">
        <h2 id="curriculum-sources-heading" className={styles.sectionTitle}>MEXT sources</h2>
        <p className={styles.sectionLead}>外部リンクは文部科学省公式PDFです（新しいタブで開きます）。</p>
        <div className={styles.sourceGrid}>
          {ELEMENTARY_CURRICULUM_SOURCES.map((source) => (
            <article key={source.id} className={styles.sourceCard}>
              <h3>{source.title}</h3>
              <p>{source.notes}</p>
              <p>確認日：{source.retrievedAt}</p>
              <a className={styles.sourceLink} href={source.officialUrl} target="_blank" rel="noreferrer" aria-label={`${source.title}（文部科学省公式PDF・新しいタブ）`}>文部科学省公式PDFを開く</a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="curriculum-entries-heading">
        <h2 id="curriculum-entries-heading" className={styles.sectionTitle}>小学3年生の教科別entry</h2>
        <p className={styles.sectionLead}>理科と小学4〜6年の詳細entryはありません。</p>
        {SUBJECTS.map((subject) => {
          const subjectEntries = ELEMENTARY_CURRICULUM_ENTRIES.filter((entry) => entry.subject === subject.id);
          const domains = ELEMENTARY_CURRICULUM_DOMAINS.filter((domain) => domain.subject === subject.id).sort((left, right) => left.order - right.order);
          return (
            <section key={subject.id} className={styles.subject} data-subject={subject.id} aria-labelledby={`${subject.id}-heading`}>
              <h3 id={`${subject.id}-heading`} className={styles.subjectTitle}>{subject.label}（{subjectEntries.length} entries）</h3>
              {domains.map((domain) => {
                const entries = subjectEntries.filter((entry) => entry.domainId === domain.id);
                return (
                  <section key={domain.id} className={styles.domain} aria-labelledby={`${domain.id}-heading`}>
                    <h4 id={`${domain.id}-heading`} className={styles.domainTitle}>{domain.title}（{entries.length}）</h4>
                    <div className={styles.entryGrid}>
                      {entries.map((entry) => {
                        const entryCoverage = coverage.find((value) => value.entryId === entry.id);
                        return (
                          <article key={entry.id} className={styles.entryCard} data-requirement={entry.requirementType}>
                            <div className={styles.badges}>
                              <span className={styles.badge} data-requirement={entry.requirementType}>{entry.requirementType}</span>
                              <span className={styles.badge}>lesson coverage: {entryCoverage?.lessonCoverage ?? "not-started"}</span>
                            </div>
                            <h5>{entry.title}</h5>
                            <p className={styles.entrySummary}>{entry.summary}</p>
                            <p className={styles.entryMeta}>competency: {entry.competencies.map((value) => competencyLabel[value]).join(" / ")}</p>
                            <ul className={styles.objectiveList}>
                              {entry.objectives.map((objective) => (
                                <li key={objective.id}>{objective.summary}<small>assessment suitability: {objective.assessmentSuitability}</small></li>
                              ))}
                            </ul>
                            <p className={styles.relations}>prerequisite: {entry.prerequisiteEntryIds.length ? entry.prerequisiteEntryIds.join("、") : "なし"}<br />next: {entry.nextEntryIds.length ? entry.nextEntryIds.join("、") : "なし"}</p>
                            <details className={styles.details}>
                              <summary>developer detail</summary>
                              <code>{entry.id}</code>
                              <code>source: {entry.sourceIds.join(" / ")}</code>
                            </details>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </section>
          );
        })}
      </section>

      <section className={styles.section} aria-labelledby="curriculum-coverage-heading">
        <h2 id="curriculum-coverage-heading" className={styles.sectionTitle}>Coverage summary</h2>
        <article className={styles.coverageCard} data-testid="division-curriculum-coverage">
          <h3>わり算見本講座</h3>
          <p>lesson coverage: <strong>partial</strong> ／ assessment coverage: <strong>not-started</strong></p>
          <p>等分する場面、除法の意味、式、乗法との関係、場面に合う演算、答えの確かめだけを接続。余り・包含除・計算技能の全体はcoveredにしていません。</p>
        </article>
      </section>
    </div>
  );
}
