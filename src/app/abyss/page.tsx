import { permanentRedirect } from "next/navigation";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export default function LegacyChallengeProblemsPage() {
  requireSubjectPageAccess("math", "problems");
  permanentRedirect("/challenge-problems");
}
