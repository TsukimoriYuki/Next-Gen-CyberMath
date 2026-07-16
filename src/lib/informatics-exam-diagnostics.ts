import type { CommonTestMockExam } from "@/data/common-test-mock-exams";
import type { CommonTestMockQuestionResult } from "@/lib/common-test-mock-scoring";

export type InformaticsDomainScore = {
  domain: string;
  earned: number;
  max: number;
};

export function buildInformaticsExamDiagnostics(
  exam: CommonTestMockExam,
  results: CommonTestMockQuestionResult[],
) {
  const domains = new Map<string, InformaticsDomainScore>();
  const mistakeCauses = new Map<string, number>();
  const priorityLessons: string[] = [];

  for (const result of results) {
    const questionDomains = result.question.diagnosticDomains?.length
      ? result.question.diagnosticDomains
      : result.question.skillTags;
    for (const domain of questionDomains) {
      const current = domains.get(domain) ?? { domain, earned: 0, max: 0 };
      const divisor = questionDomains.length;
      current.earned += result.earnedPoints / divisor;
      current.max += result.maxPoints / divisor;
      domains.set(domain, current);
    }
    if (!result.isCorrect) {
      for (const cause of result.question.mistakeCauseIds ?? result.question.commonMistakes) {
        mistakeCauses.set(cause, (mistakeCauses.get(cause) ?? 0) + 1);
      }
      for (const href of result.question.reviewLinks ?? []) {
        if (!priorityLessons.includes(href)) priorityLessons.push(href);
      }
    }
  }

  return {
    examId: exam.id,
    domainScores: [...domains.values()].map((score) => ({
      ...score,
      earned: Math.round(score.earned * 10) / 10,
      max: Math.round(score.max * 10) / 10,
    })),
    mistakeCauses: [...mistakeCauses.entries()]
      .map(([cause, count]) => ({ cause, count }))
      .sort((a, b) => b.count - a.count || a.cause.localeCompare(b.cause)),
    priorityLessons: priorityLessons.slice(0, 5),
  };
}
