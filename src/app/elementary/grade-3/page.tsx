import {
  ElementaryCardGrid,
  ElementaryPageHeader,
  ElementarySection,
  ElementaryStatusCard,
} from "@/components/elementary/ElementaryShell";
import {
  ELEMENTARY_COURSE_TYPES,
  ELEMENTARY_SUBJECTS_BY_ID,
  getElementaryGrade,
  getElementaryGradeSubjects,
} from "@/data/elementary";

export default function ElementaryGrade3Page() {
  const grade = getElementaryGrade("grade-3");
  const regularCourse = ELEMENTARY_COURSE_TYPES.find(
    (course) => course.id === "regular",
  );
  const subjects = getElementaryGradeSubjects("grade-3", "regular")
    .filter((entry) => entry.availability === "planned")
    .map((entry) => ELEMENTARY_SUBJECTS_BY_ID[entry.subjectId]);

  return (
    <>
      <ElementaryPageHeader
        eyebrow={regularCourse?.name ?? "通常コース"}
        title={grade?.name ?? "小学3年生"}
        description="算数・国語・社会を、学校の授業に沿って基礎から学ぶための内部シェルです。教科ページと教材はまだ作成していません。"
      />
      <ElementarySection title="最初に準備する教科">
        <ElementaryCardGrid>
          {subjects.map((subject) => (
            <ElementaryStatusCard
              key={subject.id}
              title={subject.name}
              description={subject.description}
              testId="elementary-subject-card"
            />
          ))}
        </ElementaryCardGrid>
      </ElementarySection>
      <ElementarySection title="現在の範囲">
        <ElementaryStatusCard
          title="技術基盤のみ"
          description="型、registry、公開ガード、layoutを確認する段階です。講座・問題・採点・進捗保存は含みません。"
          status="教材0件・問題0件"
        />
      </ElementarySection>
    </>
  );
}
