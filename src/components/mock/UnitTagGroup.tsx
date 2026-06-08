"use client";

import { useState } from "react";
import { ChevronRight, Check, Minus } from "lucide-react";
import { tagColor } from "@/data/tags";
import type { UnitTagGroup as Group } from "@/lib/exam-taxonomy";

interface Props {
  group: Group;
  selected: Set<string>;
  onToggleTag: (tag: string) => void;
  onToggleAll: (tags: string[], select: boolean) => void;
}

/** 要件B: 単元1つ分の階層トグル（親=全選択/全解除、子=個別タグ）。 */
export function UnitTagGroup({
  group,
  selected,
  onToggleTag,
  onToggleAll,
}: Props) {
  const [open, setOpen] = useState(false);
  const selectedCount = group.tags.filter((t) => selected.has(t)).length;
  const total = group.tags.length;
  const state: "all" | "none" | "partial" =
    selectedCount === 0 ? "none" : selectedCount === total ? "all" : "partial";

  return (
    <div className="rounded-xl border border-border/70 bg-white/40">
      <div className="flex items-center gap-2 px-3 py-2.5">
        {/* 親チェックボックス（tri-state） */}
        <button
          type="button"
          onClick={() => onToggleAll(group.tags, state !== "all")}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors"
          style={{
            color:
              state === "none" ? "var(--muted-foreground)" : "var(--neon-cyan)",
            borderColor:
              state === "none"
                ? "var(--border)"
                : "color-mix(in oklch, var(--neon-cyan) 55%, transparent)",
            background:
              state === "none"
                ? "transparent"
                : "color-mix(in oklch, var(--neon-cyan) 14%, transparent)",
          }}
          aria-label={`${group.unit} を全${state === "all" ? "解除" : "選択"}`}
        >
          {state === "all" && <Check className="h-3.5 w-3.5" />}
          {state === "partial" && <Minus className="h-3.5 w-3.5" />}
        </button>

        {/* 単元名（クリックで開閉） */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-1 items-center gap-2 text-left"
        >
          <ChevronRight
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform"
            style={{ transform: open ? "rotate(90deg)" : "none" }}
          />
          <span className="font-display text-sm font-bold tracking-wide">
            {group.unit}
          </span>
          <span
            className="ml-auto font-mono text-xs"
            style={{
              color:
                selectedCount > 0
                  ? "var(--neon-cyan)"
                  : "var(--muted-foreground)",
            }}
          >
            {selectedCount}/{total}
          </span>
        </button>
      </div>

      {open && (
        <div className="flex flex-wrap gap-1.5 border-t border-border/60 px-3 py-3">
          {group.tags.map((t) => {
            const on = selected.has(t);
            const c = tagColor(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => onToggleTag(t)}
                className="rounded-full border px-2.5 py-0.5 font-mono text-xs transition-colors"
                style={{
                  color: on ? c : "var(--muted-foreground)",
                  borderColor: on
                    ? `color-mix(in oklch, ${c} 50%, transparent)`
                    : "var(--border)",
                  background: on
                    ? `color-mix(in oklch, ${c} 12%, transparent)`
                    : "transparent",
                }}
              >
                #{t}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
