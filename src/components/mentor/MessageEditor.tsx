"use client";
import { useState, useEffect, useCallback } from "react";
import { Send, Users, User, Radio, CheckCircle } from "lucide-react";

type Student = { id: string; name: string };
type SentMessage = {
  id: string;
  receiverId: string | null;
  content: string;
  createdAt: string;
  receiver: { name: string } | null;
};

export function MessageEditor({ students }: { students: Student[] }) {
  const [receiverId, setReceiverId] = useState<string>("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [flash, setFlash] = useState(false);
  const [messages, setMessages] = useState<SentMessage[]>([]);

  const loadMessages = useCallback(async () => {
    const res = await fetch("/api/mentor/message");
    if (res.ok) setMessages(await res.json());
  }, []);

  useEffect(() => { loadMessages(); }, [loadMessages]);

  async function handleSend() {
    if (!content.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/mentor/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: receiverId || null, content }),
      });
      if (res.ok) {
        setContent("");
        setFlash(true);
        setTimeout(() => setFlash(false), 2500);
        await loadMessages();
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* 宛先セレクター */}
      <div>
        <p className="mb-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          宛先
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setReceiverId("")}
            className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors"
            style={{
              borderColor: receiverId === ""
                ? "color-mix(in oklch, var(--neon-cyan) 60%, transparent)"
                : "color-mix(in oklch, var(--border) 80%, transparent)",
              background: receiverId === "" ? "color-mix(in oklch, var(--neon-cyan) 10%, transparent)" : "transparent",
              color: receiverId === "" ? "var(--neon-cyan)" : "var(--muted-foreground)",
            }}
          >
            <Radio className="h-3.5 w-3.5" />
            全員へ一斉送信
          </button>
          {students.map((s) => (
            <button
              key={s.id}
              onClick={() => setReceiverId(s.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm transition-colors"
              style={{
                borderColor: receiverId === s.id
                  ? "color-mix(in oklch, var(--neon-violet) 60%, transparent)"
                  : "color-mix(in oklch, var(--border) 80%, transparent)",
                background: receiverId === s.id ? "color-mix(in oklch, var(--neon-violet) 10%, transparent)" : "transparent",
                color: receiverId === s.id ? "var(--neon-violet)" : "var(--muted-foreground)",
              }}
            >
              <User className="h-3.5 w-3.5" />
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* メッセージ入力 */}
      <div>
        <p className="mb-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          メッセージ
        </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            receiverId
              ? `${students.find((s) => s.id === receiverId)?.name ?? "生徒"} へのメッセージ…`
              : "全門下生へのメッセージ…"
          }
          rows={4}
          className="w-full resize-none rounded-xl border border-border/60 bg-secondary/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-neon-violet/40"
        />
      </div>

      {/* 送信ボタン */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSend}
          disabled={!content.trim() || sending}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all disabled:opacity-40"
          style={{
            background: "linear-gradient(135deg, color-mix(in oklch, var(--neon-violet) 20%, transparent), color-mix(in oklch, var(--neon-cyan) 12%, transparent))",
            border: "1px solid color-mix(in oklch, var(--neon-violet) 50%, transparent)",
            color: "var(--neon-violet)",
          }}
        >
          <Send className="h-4 w-4" />
          {sending ? "送信中…" : receiverId ? "DM を送る" : "一斉送信する"}
        </button>
        {flash && (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
            <CheckCircle className="h-4 w-4" />
            送信完了
          </span>
        )}
      </div>

      {/* 送信済み一覧 */}
      {messages.length > 0 && (
        <div className="mt-4">
          <p className="mb-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            送信済みメッセージ（最新 {messages.length} 件）
          </p>
          <div className="space-y-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-border/40 bg-secondary/10 px-4 py-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  {m.receiverId ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-neon-violet">
                      <User className="h-3 w-3" />
                      {m.receiver?.name ?? m.receiverId}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-neon-cyan">
                      <Users className="h-3 w-3" />
                      全員
                    </span>
                  )}
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                    {new Date(m.createdAt).toLocaleString("ja-JP", {
                      month: "numeric", day: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm text-foreground/80">{m.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
