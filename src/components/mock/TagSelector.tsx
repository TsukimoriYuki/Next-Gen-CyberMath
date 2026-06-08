"use client";

import { useMemo } from "react";
import { Layers, X } from "lucide-react";
import { getUnitTagGroups } from "@/lib/exam-taxonomy";
import { UnitTagGroup } from "./UnitTagGroup";

interface Props {
  selected: string[];
  onChange: (tags: string[]) => void;
  /** 現在の選択タグ・難易度で対象になる問題数（サマリ表示用）。 */
  matchCount: number;
}

/** 要件B: 単元アコーディオン群をまとめる範囲セレクタ。状態は親が単一ソースで保持。 */
export function TagSelector({ selected, onChange, matchCount }: Props) {
  const groups = useMemo(() => getUnitTagGroups(), []);
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const toggleTag = (tag: string) => {
    if (selectedSet.has(tag)) onChange(selected.filter((t) => t !== tag));
    else onChange([...selected, tag]);
  };

  const toggleAll = (tags: string[], select: boolean) => {
    const next = new Set(selected);
    for (const t of tags) {
      if (select) next.add(t);
      else next.delete(t);
    }
    onChange(Array.from(next));
  };

  return (
    <section className="glass rounded-2xl p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold tracking-wide">
          <Layers className="h-4 w-4 text-neon-cyan" />
          出題範囲（単元・タグ）
        </h2>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">
            {selected.length} タグ / 対象{" "}
            <span className="font-bold text-neon-cyan">{matchCount}</span> 問
          </span>
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-neon-magenta"
            >
              <X className="h-3 w-3" /> 解除
            </button>
          )}
        </div>
      </div>

      <p className="mb-3 text-xs text-muted-foreground">
        未選択なら全範囲から出題します。単元名をクリックで開閉、左のチェックで単元ごと一括選択。
      </p>

      <div className="flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
        {groups.map((g) => (
          <UnitTagGroup
            key={g.unit}
            group={g}
            selected={selectedSet}
            onToggleTag={toggleTag}
            onToggleAll={toggleAll}
          />
        ))}
      </div>
    </section>
  );
}
