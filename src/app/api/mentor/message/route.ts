import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await req.json();
  const content: string = body.content ?? "";
  if (!content.trim()) {
    return NextResponse.json({ error: "content is required" }, { status: 400 });
  }
  const receiverId: string | null = body.receiverId || null;

  const message = await prisma.message.create({
    data: { senderId: session.sub, receiverId, content: content.trim() },
  });
  return NextResponse.json(message, { status: 201 });
}

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "MENTOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      sender: { select: { name: true } },
      receiver: { select: { name: true } },
    },
  });
  return NextResponse.json(messages);
}
