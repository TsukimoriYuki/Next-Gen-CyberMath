import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { handleExamAttemptPost } from "@/lib/exam-attempt-api";

// Only structured, published booklet mocks are accepted here. Their answer keys
// and scoring groups let the server independently recompute every stored result.
export async function POST(request: Request) {
  return handleExamAttemptPost(request, {
    getSession,
    persistAttempt: (data) =>
      prisma.examAttempt.create({
        data,
        select: { id: true },
      }),
  });
}
