import type { ElementaryTextAudience } from "@/types/elementary-kanji";

export type ElementaryTsxCopyExclusion = Readonly<{
  sourcePath: string;
  attributeName: "aria-label" | "alt" | "title";
  expression: string;
  audience: ElementaryTextAudience;
  reason: string;
}>;

export const ELEMENTARY_TSX_COPY_EXCLUSIONS: readonly ElementaryTsxCopyExclusion[] = [
  {
    sourcePath: "src/components/elementary/ElementaryDialogue.tsx",
    attributeName: "aria-label",
    expression: "character.accessibilityLabel",
    audience: "learner",
    reason: "character registryのaccessibilityLabelを漢字QAで別途検査する。",
  },
  {
    sourcePath: "src/components/elementary/ElementaryText.tsx",
    attributeName: "title",
    expression: "segment.definition",
    audience: "learner",
    reason: "構造化教材のterm.definitionを漢字QAで別途検査する。",
  },
  {
    sourcePath: "src/components/elementary/ElementaryVisualAsset.tsx",
    attributeName: "alt",
    expression: "getElementaryAssetAltText(asset)",
    audience: "learner",
    reason: "asset registryのaltを学年別漢字QAとasset QAで別途検査する。",
  },
  {
    sourcePath: "src/app/elementary/showcase/curriculum/page.tsx",
    attributeName: "aria-label",
    expression: "`${source.title}（文部科学省公式PDF・新しいタブ）`",
    audience: "developer",
    reason: "developer/guardian向け確認ページのsource registry由来タイトルであり、学習者向けcopyではない。",
  },
] as const;
