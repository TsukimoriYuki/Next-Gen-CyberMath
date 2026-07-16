import {
  ElementaryCardGrid,
  ElementaryGradeLink,
  ElementaryPageHeader,
  ElementarySection,
} from "@/components/elementary/ElementaryShell";
import { ELEMENTARY_SITE, getElementaryGrade } from "@/data/elementary";

export default function ElementaryPage() {
  const grade3 = getElementaryGrade(ELEMENTARY_SITE.defaultGradeId);

  return (
    <>
      <ElementaryPageHeader
        eyebrow="FOUNDATION PREVIEW"
        title="小学生版の学び場を準備しています"
        description="このページは、学年別の通常コースを安全に作り始めるための内部シェルです。教材や問題はまだありません。"
      />
      <ElementarySection title="最初に準備する学年">
        <ElementaryCardGrid>
          {grade3?.href === "/elementary/grade-3" ? (
            <ElementaryGradeLink
              href={grade3.href}
              title={grade3.name}
              description="算数・国語・社会の通常コースを、これから順番に準備します。"
            />
          ) : null}
        </ElementaryCardGrid>
      </ElementarySection>
    </>
  );
}
