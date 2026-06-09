import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MessageBarClient } from "./MessageBarClient";

export async function MessageBar() {
  const session = await getSession();
  if (!session) return null;

  const message = await prisma.message.findFirst({
    where: {
      OR: [{ receiverId: session.sub }, { receiverId: null }],
    },
    orderBy: { createdAt: "desc" },
  });

  if (!message) return null;

  const dateStr = new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(message.createdAt));

  return (
    <MessageBarClient
      id={message.id}
      content={message.content}
      dateStr={dateStr}
      isDM={!!message.receiverId}
    />
  );
}
