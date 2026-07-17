import { ELEMENTARY_PROBLEMS } from "@/data/elementary/problems";
import { isElementaryResourceDiscoverable } from "@/lib/elementary-publication";
import type { ElementarySubjectId } from "@/types/elementary";
import type { ElementaryProblem } from "@/types/elementary-problems";

// 小学生版 pilot 問題の resolver。unknown ID は fail closed（undefined）。
// 出力順は order で安定させる。registry の配列は Object.freeze 済みで外部変更不可。

export {
  gradeElementaryAnswer,
  isElementaryAnswerCorrect,
  normalizeElementaryNumericInput,
} from "@/lib/elementary-grade";

const PROBLEM_BY_KEY: ReadonlyMap<string, ElementaryProblem> = new Map(
  ELEMENTARY_PROBLEMS.flatMap((problem) => [
    [problem.id, problem] as const,
    [problem.slug, problem] as const,
  ]),
);

function byOrder(a: ElementaryProblem, b: ElementaryProblem): number {
  return a.order - b.order;
}

/** 制作・開発確認用の resolver。hidden 教材の閲覧が許される文脈でのみ使う。 */
export function getElementaryProblem(
  idOrSlug: string | null | undefined,
): ElementaryProblem | undefined {
  if (!idOrSlug) return undefined;
  return PROBLEM_BY_KEY.get(idOrSlug);
}

/** 公開探索用の resolver。hidden/internal は返さず fail closed する。 */
export function getDiscoverableElementaryProblem(
  idOrSlug: string | null | undefined,
): ElementaryProblem | undefined {
  const problem = getElementaryProblem(idOrSlug);
  return problem && isElementaryResourceDiscoverable(problem.publicationStatus)
    ? problem
    : undefined;
}

export function getProblemsForLesson(
  lessonId: string,
): readonly ElementaryProblem[] {
  return ELEMENTARY_PROBLEMS.filter((problem) =>
    problem.lessonIds.includes(lessonId),
  ).sort(byOrder);
}

export function getProblemsForUnit(unitId: string): readonly ElementaryProblem[] {
  return ELEMENTARY_PROBLEMS.filter((problem) => problem.unitId === unitId).sort(
    byOrder,
  );
}

export function getProblemsForSubject(
  subjectId: ElementarySubjectId | string,
): readonly ElementaryProblem[] {
  return ELEMENTARY_PROBLEMS.filter(
    (problem) => problem.subject === subjectId,
  ).sort(byOrder);
}

/** 同じ講座内の次の問題（order 順）。最後の問題では undefined。 */
export function getNextElementaryProblem(
  problemId: string,
): ElementaryProblem | undefined {
  const problem = getElementaryProblem(problemId);
  if (!problem) return undefined;
  const siblings = getProblemsForLesson(problem.lessonIds[0] ?? "");
  const index = siblings.findIndex((entry) => entry.id === problem.id);
  return index >= 0 ? siblings[index + 1] : undefined;
}

/** lesson 内 practice-set などからの参照が実在するかを確認する。 */
export function validateElementaryProblemReference(problemId: string): boolean {
  return PROBLEM_BY_KEY.has(problemId);
}

/** practice-set の problemIds を、順序を保って問題データへ解決する。unknown は明確に失敗させる。 */
export function resolvePracticeSetProblems(
  problemIds: readonly string[],
): readonly ElementaryProblem[] {
  return problemIds.map((problemId) => {
    const problem = getElementaryProblem(problemId);
    if (!problem) {
      throw new Error(
        `elementary practice-set references an unknown problem: ${problemId}`,
      );
    }
    return problem;
  });
}
