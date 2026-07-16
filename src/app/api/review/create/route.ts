import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getNextReviewDate } from "@/lib/review-schedule";
import { canAccessReviewItem } from "@/lib/review-publication";

// POST /api/review/create
// 復習アイテムを作成または更新（upsert）する。
// Body:
//   itemType: "common-test-drill" | "common-test-lecture" | "math-problem" | "english-problem"
//   itemId: string
//   subjectId?: string
//   sectionId?: string
//   title?: string
//   source: string
//   reasonFlags: string[]
//   skillTags: string[]
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      itemType,
      itemId,
      subjectId,
      sectionId,
      title,
      source,
      reasonFlags = [],
      skillTags = [],
    } = body ?? {};

    if (
      typeof itemType !== "string" ||
      typeof itemId !== "string" ||
      typeof source !== "string" ||
      !itemType ||
      !itemId ||
      !source ||
      (subjectId != null && typeof subjectId !== "string")
    ) {
      return Response.json({ ok: false, error: "missing required fields" }, { status: 400 });
    }

    const VALID_TYPES = ["common-test-drill", "common-test-lecture", "math-problem", "english-problem", "japanese-problem"];
    if (!VALID_TYPES.includes(itemType)) {
      return Response.json({ ok: false, error: "invalid itemType" }, { status: 400 });
    }
    if (!canAccessReviewItem({ itemType, itemId, subjectId })) {
      return Response.json({ ok: false, error: "not found" }, { status: 404 });
    }

    const tomorrow = getNextReviewDate(0);

    // 既存アイテムを確認してreasonFlags/skillTagsをマージ
    const existing = await prisma.reviewItem.findUnique({
      where: {
        userId_itemType_itemId: { userId: session.sub, itemType, itemId },
      },
    });

    let mergedReasonFlags: string[] = reasonFlags;
    let mergedSkillTags: string[] = skillTags;

    if (existing) {
      mergedReasonFlags = Array.from(
        new Set([...(existing.reasonFlags ?? []), ...(reasonFlags as string[])])
      );
      mergedSkillTags = Array.from(
        new Set([...(existing.skillTags ?? []), ...(skillTags as string[])])
      );
    }

    const item = await prisma.reviewItem.upsert({
      where: {
        userId_itemType_itemId: { userId: session.sub, itemType, itemId },
      },
      create: {
        userId: session.sub,
        itemType,
        itemId,
        subjectId: subjectId ?? null,
        sectionId: sectionId ?? null,
        title: title ?? null,
        source,
        level: 0,
        wrongCount: 1,
        correctStreak: 0,
        status: "ACTIVE",
        reasonFlags: mergedReasonFlags,
        skillTags: mergedSkillTags,
        nextReviewAt: tomorrow,
      },
      update: {
        status: "ACTIVE",
        level: 0,
        correctStreak: 0,
        wrongCount: { increment: 1 },
        reasonFlags: mergedReasonFlags,
        skillTags: mergedSkillTags,
        nextReviewAt: tomorrow,
        // title/subjectId/sectionId はより新しい情報で上書き
        ...(title ? { title } : {}),
        ...(subjectId ? { subjectId } : {}),
        ...(sectionId ? { sectionId } : {}),
      },
      select: {
        id: true,
        itemType: true,
        itemId: true,
        subjectId: true,
        sectionId: true,
        title: true,
        status: true,
        level: true,
        wrongCount: true,
        nextReviewAt: true,
      },
    });

    return Response.json({
      ok: true,
      item: {
        ...item,
        nextReviewAt: item.nextReviewAt.toISOString(),
      },
      created: !existing,
    });
  } catch (e) {
    console.error("review/create failed:", e);
    return Response.json({ ok: false, error: "db error" }, { status: 500 });
  }
}
