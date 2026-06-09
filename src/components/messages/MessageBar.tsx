import { MessageSquare } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function MessageBar() {
  const session = await getSession();
  if (!session) return null;

  const message = await prisma.message.findFirst({
    where: {
      OR: [
        { receiverId: session.sub },
        { receiverId: null },
      ],
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
    <div
      className="rounded-2xl border px-5 py-4"
      style={{
        borderColor: "color-mix(in oklch, var(--neon-violet) 35%, transparent)",
        background:
          "linear-gradient(135deg, color-mix(in oklch, var(--neon-violet) 6%, transparent), color-mix(in oklch, var(--neon-cyan) 4%, transparent))",
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <MessageSquare
          className="h-4 w-4"
          style={{ color: "var(--neon-violet)" }}
        />
        <span
          className="font-mono text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: "var(--neon-violet)" }}
        >
          {message.receiverId ? "師範からの DM" : "師範からの全体通知"}
        </span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
          {dateStr}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-foreground/80">{message.content}</p>
    </div>
  );
}
