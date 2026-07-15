import { notFound, redirect } from "next/navigation";
import { MATH_1A_PAPER_001 } from "@/data/exam-papers";
import { resolveTopLevelSubjectId } from "@/lib/subject-publication";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

// 旧「冊子画像 + Webマークシート」実装。手動作成PDF正本の第1回へ一本化したため、
// このURLは常に新しい正本へ誘導する。
export default function Math1APaper001Page() {
  const subjectId = resolveTopLevelSubjectId(MATH_1A_PAPER_001.subject);
  if (!subjectId) notFound();

  // The legacy implementation never renders; the redirect itself is public.
  const resourcePublished = true;
  requireSubjectPageAccess(subjectId, "exams", { resourcePublished });
  redirect("/common-test/simulator/common-test-math-1a-manual-001");
}
