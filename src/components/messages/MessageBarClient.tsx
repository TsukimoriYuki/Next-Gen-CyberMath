"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";

interface MessageBarClientProps {
  id: string;
  content: string;
  dateStr: string;
  isDM: boolean;
}

const STORAGE_KEY = "cyber_msg_read";

export function MessageBarClient({ id, content, dateStr, isDM }: MessageBarClientProps) {
  const [visible, setVisible] = useState(false);

  // Hydration 後に localStorage を参照して表示判定
  useEffect(() => {
    const read = localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (read !== id) setVisible(true);
  }, [id]);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, id);
    setVisible(false);
  }

  if (!visible) return null;

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
        <MessageSquare className="h-4 w-4 shrink-0" style={{ color: "var(--neon-violet)" }} />
        <span
          className="font-mono text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: "var(--neon-violet)" }}
        >
          {isDM ? "師範からの DM" : "師範からの全体通知"}
        </span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">{dateStr}</span>
        <button
          type="button"
          onClick={dismiss}
          aria-label="メッセージを閉じる"
          className="rounded p-0.5 transition-colors hover:text-foreground text-muted-foreground/60"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="text-sm leading-relaxed text-foreground/80">{content}</p>
    </div>
  );
}
