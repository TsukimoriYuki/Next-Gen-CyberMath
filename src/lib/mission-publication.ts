import { COMPREHENSION_PROBLEMS } from "@/data/english-comprehension";
import { MULTI_SOURCE_PROBLEMS } from "@/data/english-multisource";
import { SPEED_READING_PROBLEMS } from "@/data/english-speed-reading";
import { getAllProblems } from "@/lib/content";
import {
  canAccessSubject,
  type SubjectPublicationRuntime,
  resolveSubjectPublicationRuntime,
} from "@/lib/subject-publication";

const PUBLIC_MISSION_PROBLEM_SLUGS = new Set<string>([
  ...getAllProblems().map((problem) => problem.slug),
  ...SPEED_READING_PROBLEMS.map(
    (problem) => `english/speed-reading/${problem.id}`,
  ),
  ...COMPREHENSION_PROBLEMS.map(
    (problem) => `english/comprehension/${problem.id}`,
  ),
  ...MULTI_SOURCE_PROBLEMS.map(
    (problem) => `english/multi-source/${problem.id}`,
  ),
]);

/**
 * Existing English missions store a route-like `english/...` value, while
 * legacy mathematics missions store a registry slug without a slash. Reject
 * other prefixes so a future subject cannot silently inherit mathematics.
 */
export function resolveMissionTopLevelSubjectId(
  problemSlug: string,
): "math" | "english" | undefined {
  if (problemSlug.startsWith("english/")) return "english";
  if (problemSlug.length > 0 && !problemSlug.includes("/")) return "math";
  return undefined;
}

export function canAccessMissionProblem(
  problemSlug: string,
  runtime: SubjectPublicationRuntime = resolveSubjectPublicationRuntime(),
): boolean {
  const subjectId = resolveMissionTopLevelSubjectId(problemSlug);
  return Boolean(
    subjectId &&
      PUBLIC_MISSION_PROBLEM_SLUGS.has(problemSlug) &&
      canAccessSubject(subjectId, "problems", runtime),
  );
}
