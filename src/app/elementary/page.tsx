import {
  ElementaryCardGrid,
  ElementaryGradeLink,
  ElementaryPageHeader,
  ElementarySection,
} from "@/components/elementary/ElementaryShell";
import { ElementaryBetaNotice } from "@/components/elementary/ElementaryBetaNotice";
import { ELEMENTARY_SITE, getElementaryGrade } from "@/data/elementary";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";

export default function ElementaryPage() {
  const grade3 = getElementaryGrade(ELEMENTARY_SITE.defaultGradeId);

  return (
    <>
      <ElementaryPageHeader
        eyebrow={elementaryUiCopy("home-eyebrow")}
        title={elementaryUiCopy("home-title")}
        description={elementaryUiCopy("home-description")}
      />
      <ElementaryBetaNotice />
      <ElementarySection title={elementaryUiCopy("home-section-title")}>
        <ElementaryCardGrid>
          {grade3?.href === "/elementary/grade-3" ? (
            <ElementaryGradeLink
              href={grade3.href}
              title={elementaryUiCopy("home-grade-3-title")}
              description={elementaryUiCopy("home-grade-3-description")}
            />
          ) : null}
        </ElementaryCardGrid>
      </ElementarySection>
    </>
  );
}
