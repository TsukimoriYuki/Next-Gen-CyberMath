-- Initial schema generated from prisma/schema.prisma.
-- The production database already has this shape; baseline it with
-- `prisma migrate resolve --applied 20260716000000_initial_schema` before deploy.

CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "tagline" TEXT,
    "hasGraph" BOOLEAN NOT NULL DEFAULT false,
    "graphConfig" JSONB,
    "relatedLessonSlug" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "university" TEXT,
    "deviation" INTEGER,
    "year" INTEGER,
    "backgroundTag" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ExplanationStep" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "relatedLessonSlug" TEXT,
    CONSTRAINT "ExplanationStep_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "summary" TEXT,
    "content" TEXT NOT NULL,
    "relatedProblemSlugs" TEXT[],
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passcode" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ExamAttempt" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "difficulties" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "problemSlugs" TEXT[],
    "timeLimitSec" INTEGER NOT NULL,
    "wrongSlugs" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "score" INTEGER NOT NULL,
    "totalCount" INTEGER NOT NULL,
    "durationSec" INTEGER NOT NULL,
    "weakTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "userId" TEXT,
    CONSTRAINT "ExamAttempt_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EmergencyMission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemSlug" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "EmergencyMission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "senderId" TEXT,
    "receiverId" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EnglishAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EnglishAttempt_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ReviewItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "subjectId" TEXT,
    "sectionId" TEXT,
    "title" TEXT,
    "source" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "level" INTEGER NOT NULL DEFAULT 0,
    "wrongCount" INTEGER NOT NULL DEFAULT 1,
    "correctStreak" INTEGER NOT NULL DEFAULT 0,
    "reasonFlags" TEXT[],
    "skillTags" TEXT[],
    "nextReviewAt" TIMESTAMP(3) NOT NULL,
    "lastReviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ReviewItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DailyChallenge" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "slot" INTEGER NOT NULL,
    "problemId" TEXT NOT NULL,
    CONSTRAINT "DailyChallenge_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Problem_slug_key" ON "Problem"("slug");
CREATE INDEX "Problem_unit_idx" ON "Problem"("unit");
CREATE INDEX "Problem_difficulty_idx" ON "Problem"("difficulty");
CREATE UNIQUE INDEX "ExplanationStep_problemId_order_key" ON "ExplanationStep"("problemId", "order");
CREATE UNIQUE INDEX "Lesson_slug_key" ON "Lesson"("slug");
CREATE INDEX "Lesson_unit_idx" ON "Lesson"("unit");
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
CREATE INDEX "User_name_idx" ON "User"("name");
CREATE INDEX "User_role_idx" ON "User"("role");
CREATE INDEX "ExamAttempt_sessionId_idx" ON "ExamAttempt"("sessionId");
CREATE INDEX "ExamAttempt_createdAt_idx" ON "ExamAttempt"("createdAt");
CREATE INDEX "ExamAttempt_userId_idx" ON "ExamAttempt"("userId");
CREATE INDEX "EmergencyMission_userId_idx" ON "EmergencyMission"("userId");
CREATE INDEX "EmergencyMission_isCompleted_idx" ON "EmergencyMission"("isCompleted");
CREATE INDEX "EmergencyMission_createdAt_idx" ON "EmergencyMission"("createdAt");
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");
CREATE INDEX "Message_receiverId_idx" ON "Message"("receiverId");
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt");
CREATE INDEX "EnglishAttempt_userId_idx" ON "EnglishAttempt"("userId");
CREATE INDEX "EnglishAttempt_mode_idx" ON "EnglishAttempt"("mode");
CREATE INDEX "EnglishAttempt_createdAt_idx" ON "EnglishAttempt"("createdAt");
CREATE INDEX "ReviewItem_userId_status_idx" ON "ReviewItem"("userId", "status");
CREATE INDEX "ReviewItem_userId_nextReviewAt_idx" ON "ReviewItem"("userId", "nextReviewAt");
CREATE INDEX "ReviewItem_userId_subjectId_idx" ON "ReviewItem"("userId", "subjectId");
CREATE INDEX "ReviewItem_userId_sectionId_idx" ON "ReviewItem"("userId", "sectionId");
CREATE UNIQUE INDEX "ReviewItem_userId_itemType_itemId_key" ON "ReviewItem"("userId", "itemType", "itemId");
CREATE INDEX "DailyChallenge_date_idx" ON "DailyChallenge"("date");
CREATE UNIQUE INDEX "DailyChallenge_date_slot_key" ON "DailyChallenge"("date", "slot");

ALTER TABLE "ExplanationStep" ADD CONSTRAINT "ExplanationStep_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "EmergencyMission" ADD CONSTRAINT "EmergencyMission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "EnglishAttempt" ADD CONSTRAINT "EnglishAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReviewItem" ADD CONSTRAINT "ReviewItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DailyChallenge" ADD CONSTRAINT "DailyChallenge_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
