"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, UserRound, ShieldCheck } from "lucide-react";

interface Student {
  id: string;
  name: string;
  role: string;
  createdAt: string;
  lastLoginAt: string | null;
  attemptCount: number;
  lastScore: number | null;
  lastWeakTags: string[];
  lastAttemptAt: string | null;
}

interface StudentRosterProps {
  students: Student[];
}

type SortKey = "name" | "createdAt" | "lastLoginAt" | "attemptCount" | "lastScore";

function fmt(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("ja-JP", { month: "short", day: "numeric" });
}

function ScoreBar({ score }: { score: number | null }) {
  if (score === null) return <span className="text-xs text-muted-foreground">—</span>;
  const color =
    score >= 80 ? "var(--neon-lime)" : score >= 60 ? "var(--neon-cyan)" : "var(--neon-magenta)";
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-1.5 w-20 overflow-hidden rounded-full bg-secondary/70">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span className="font-mono text-xs tabular-nums" style={{ color }}>
        {score}%
      </span>
    </div>
  );
}

export function StudentRoster({ students }: StudentRosterProps) {
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [asc, setAsc] = useState(false);
  const [query, setQuery] = useState("");

  const sorted = [...students]
    .filter((s) => s.name.includes(query))
    .sort((a, b) => {
      let va: string | number | null;
      let vb: string | number | null;
      if (sortKey === "name") { va = a.name; vb = b.name; }
      else if (sortKey === "createdAt") { va = a.createdAt; vb = b.createdAt; }
      else if (sortKey === "lastLoginAt") { va = a.lastLoginAt; vb = b.lastLoginAt; }
      else if (sortKey === "attemptCount") { va = a.attemptCount; vb = b.attemptCount; }
      else { va = a.lastScore; vb = b.lastScore; }

      if (va === null && vb === null) return 0;
      if (va === null) return asc ? -1 : 1;
      if (vb === null) return asc ? 1 : -1;
      if (va < vb) return asc ? -1 : 1;
      if (va > vb) return asc ? 1 : -1;
      return 0;
    });

  function handleSort(key: SortKey) {
    if (sortKey === key) setAsc((v) => !v);
    else { setSortKey(key); setAsc(false); }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return null;
    return asc ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  }

  const headers: { key: SortKey; label: string }[] = [
    { key: "name", label: "名前" },
    { key: "createdAt", label: "登録日" },
    { key: "lastLoginAt", label: "最終ログイン" },
    { key: "attemptCount", label: "模試回数" },
    { key: "lastScore", label: "最新スコア" },
  ];

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="名前で絞り込み..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-xs rounded-xl border border-border bg-white/60 px-4 py-2 text-sm outline-none transition-colors focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30"
      />

      <div className="overflow-x-auto rounded-2xl border border-border/60">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-secondary/30">
            <tr>
              {headers.map(({ key, label }) => (
                <th
                  key={key}
                  className="cursor-pointer px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-neon-cyan"
                  onClick={() => handleSort(key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {label}
                    <SortIcon k={key} />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                弱点タグ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  該当する門下生がいません
                </td>
              </tr>
            )}
            {sorted.map((s) => (
              <tr key={s.id} className="bg-white/30 transition-colors hover:bg-white/50">
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                    {s.role === "MENTOR" ? (
                      <ShieldCheck className="h-3.5 w-3.5 text-neon-amber" />
                    ) : (
                      <UserRound className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    {s.name}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {fmt(s.createdAt)}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {fmt(s.lastLoginAt)}
                </td>
                <td className="px-4 py-3 font-mono text-xs tabular-nums text-foreground/80">
                  {s.attemptCount}
                </td>
                <td className="px-4 py-3">
                  <ScoreBar score={s.lastScore} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {s.lastWeakTags.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-neon-magenta/10 px-1.5 py-0.5 font-mono text-[10px] text-neon-magenta/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">{sorted.length} 名表示中（全 {students.length} 名）</p>
    </div>
  );
}
