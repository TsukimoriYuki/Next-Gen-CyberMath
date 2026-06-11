import type { CommonTestConfidence } from "@/lib/common-test-history";

export interface AnswerEntry {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpentSec: number;
  confidence: CommonTestConfidence;
  skillTags: string[];
}
