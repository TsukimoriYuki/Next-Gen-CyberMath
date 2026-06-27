import type {
  CommonTestConfidence,
  CommonTestMistakeTagId,
  CommonTestRiskLevel,
} from "@/lib/common-test-history";

export interface AnswerEntry {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpentSec: number;
  confidence: CommonTestConfidence;
  skillTags: string[];
  mistakeTagIds?: CommonTestMistakeTagId[];
  riskLevel?: CommonTestRiskLevel;
}
