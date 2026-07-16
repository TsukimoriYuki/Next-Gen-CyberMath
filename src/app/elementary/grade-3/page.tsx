import {
  ElementaryCardGrid,
  ElementaryPageHeader,
  ElementarySection,
  ElementaryStatusCard,
} from "@/components/elementary/ElementaryShell";
import {
  getElementaryGradeSubjects,
} from "@/data/elementary";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";

const SUBJECT_COPY_IDS = {
  math: ["grade-3-math-title", "grade-3-math-description"],
  japanese: ["grade-3-japanese-title", "grade-3-japanese-description"],
  "social-studies": ["grade-3-social-title", "grade-3-social-description"],
} as const;

export default function ElementaryGrade3Page() {
  const subjects = getElementaryGradeSubjects("grade-3", "regular")
    .filter((entry) => entry.availability === "planned")
    .flatMap((entry) => {
      const copyIds = SUBJECT_COPY_IDS[entry.subjectId as keyof typeof SUBJECT_COPY_IDS];
      return copyIds ? [{ id: entry.subjectId, copyIds }] : [];
    });

  return (
    <>
      <ElementaryPageHeader
        eyebrow={elementaryUiCopy("grade-3-eyebrow")}
        title={elementaryUiCopy("grade-3-title")}
        description={elementaryUiCopy("grade-3-description")}
      />
      <ElementarySection title={elementaryUiCopy("grade-3-subject-section")}>
        <ElementaryCardGrid>
          {subjects.map((subject) => (
            <ElementaryStatusCard
              key={subject.id}
              title={elementaryUiCopy(subject.copyIds[0])}
              description={elementaryUiCopy(subject.copyIds[1])}
              testId="elementary-subject-card"
            />
          ))}
        </ElementaryCardGrid>
      </ElementarySection>
      <ElementarySection title={elementaryUiCopy("grade-3-status-section")}>
        <ElementaryStatusCard
          title={elementaryUiCopy("grade-3-status-title")}
          description={elementaryUiCopy("grade-3-status-description")}
          status={elementaryUiCopy("grade-3-status-badge")}
        />
      </ElementarySection>
      <aside data-text-audience="developer">
        <h2>{elementaryUiCopy("grade-3-developer-title")}</h2>
        <p>{elementaryUiCopy("grade-3-developer-description")}</p>
      </aside>
    </>
  );
}
