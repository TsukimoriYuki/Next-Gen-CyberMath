import { PROBLEMS } from "@/data/problems";
import { UNIT_META_BY_NAME } from "@/data/units-meta";
import type { Difficulty } from "@/lib/types";

// 模試スマートUI用の分類ロジック（純関数）。
// タグは Problem.tags[] で単元と独立だが、各問題の unit を使って
// 「単元 → その単元の問題に出現するタグ集合」を導出し、階層UIを作る。

export interface UnitTagGroup {
  unit: string;
  order: number;
  /** その単元の問題に出現するタグ（頻度の高い順）。 */
  tags: string[];
}

/** 全問題を走査し「単元 → 出現タグ集合」を作る。 */
export function getUnitTagGroups(): UnitTagGroup[] {
  const map = new Map<string, Map<string, number>>();
  for (const p of PROBLEMS) {
    if (!p.tags || p.tags.length === 0) continue;
    let tm = map.get(p.unit);
    if (!tm) {
      tm = new Map();
      map.set(p.unit, tm);
    }
    for (const t of p.tags) tm.set(t, (tm.get(t) ?? 0) + 1);
  }
  const groups: UnitTagGroup[] = [];
  for (const [unit, tm] of map) {
    const tags = Array.from(tm.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja"))
      .map(([t]) => t);
    groups.push({ unit, order: UNIT_META_BY_NAME[unit]?.order ?? 999, tags });
  }
  return groups.sort(
    (a, b) => a.order - b.order || a.unit.localeCompare(b.unit, "ja"),
  );
}

export interface Preset {
  id: string;
  label: string;
  /** 含める単元の order 範囲（inclusive）。 */
  orderRange?: [number, number];
  /** 個別単元名で指定する場合。 */
  unitNames?: string[];
  /** 難易度も同時に設定する場合（タグ指定が無ければ全タグ選択）。 */
  difficulties?: Difficulty[];
  /** タグ・難易度を初期化するだけ。 */
  clear?: boolean;
}

export const PRESETS: Preset[] = [
  { id: "ia", label: "数学IA 全範囲", orderRange: [1, 8] },
  { id: "iib", label: "数学IIB 全範囲", orderRange: [30, 38] },
  {
    id: "geometry",
    label: "図形系まとめ",
    unitNames: ["図形と計量", "図形の性質", "図形と方程式", "ベクトル"],
  },
  {
    id: "int-prob",
    label: "整数・確率",
    unitNames: ["整数の性質", "場合の数と確率"],
  },
  { id: "hard", label: "難問対策のみ", difficulties: ["C", "D", "D_PLUS"] },
  { id: "quiz", label: "小テスト(A・B)", difficulties: ["A", "B"] },
  { id: "clear", label: "全解除", clear: true },
];

/**
 * プリセットが選択するタグ集合を返す。
 * orderRange / unitNames を持たないプリセット（難問対策・小テスト）は全タグ選択。
 */
export function resolvePresetTags(
  preset: Preset,
  groups: UnitTagGroup[],
): string[] {
  if (preset.clear) return [];
  const hasScope = Boolean(preset.orderRange || preset.unitNames);
  const tags = new Set<string>();
  for (const g of groups) {
    const inRange = preset.orderRange
      ? g.order >= preset.orderRange[0] && g.order <= preset.orderRange[1]
      : false;
    const inNames = preset.unitNames?.includes(g.unit) ?? false;
    if (!hasScope || inRange || inNames) {
      for (const t of g.tags) tags.add(t);
    }
  }
  return Array.from(tags);
}
