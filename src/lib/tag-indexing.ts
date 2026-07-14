export const TAG_INDEX_MIN_CONTENT_COUNT = 3;

/** Short notation-only tags have little standalone search value even at 3 items. */
export const LOW_SEARCH_VALUE_TAGS = new Set(["sin", "cos", "mod", "Sn", "telescoping"]);

/** Editorial candidates only. URLs and stored tags are intentionally unchanged. */
export const TAG_MERGE_CANDIDATE_GROUPS = [
  ["二次関数", "2次関数"],
  ["二次方程式", "2次方程式"],
  ["2倍角の公式", "2倍角公式"],
  ["3倍角の公式", "3倍角公式"],
  ["1/6公式", "6分の1公式"],
  ["telescoping", "テレスコーピング"],
  ["ド・モアブル", "ド・モアブルの定理"],
  ["ド・モルガン", "ド・モルガンの法則"],
  ["アポロニウス", "アポロニウスの円"],
  ["三平方", "三平方の定理"],
  ["帰納法", "数学的帰納法"],
  ["組合せ", "組み合わせ"],
] as const;

export type TagIndexingDecision = {
  index: boolean;
  includeInSitemap: boolean;
  isMergeCandidate: boolean;
  reason: "sufficient-content" | "thin" | "low-search-value";
};

export function getTagIndexingDecision(tag: string, contentCount: number): TagIndexingDecision {
  const isMergeCandidate = TAG_MERGE_CANDIDATE_GROUPS.some((group) =>
    (group as readonly string[]).includes(tag),
  );
  const isLowSearchValue = LOW_SEARCH_VALUE_TAGS.has(tag);
  const index = contentCount >= TAG_INDEX_MIN_CONTENT_COUNT && !isLowSearchValue;
  return {
    index,
    includeInSitemap: index,
    isMergeCandidate,
    reason: isLowSearchValue
      ? "low-search-value"
      : index
        ? "sufficient-content"
        : "thin",
  };
}
