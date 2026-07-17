import type {
  ElementaryInlineContent,
  ElementaryInlineSegment,
} from "@/types/elementary-content";

// 構造化テキスト（ElementaryInlineContent）を組み立てる共通ヘルパー。
// 小学生版の講座・単元・問題データで再利用する。

export const text = (value: string): ElementaryInlineSegment => ({
  type: "text",
  text: value,
});

export const ruby = (
  base: string,
  reading: string,
  exceptionId?: string,
): ElementaryInlineSegment =>
  exceptionId
    ? { type: "ruby", base, reading, exceptionId }
    : { type: "ruby", base, reading };

export const emphasis = (value: string): ElementaryInlineSegment => ({
  type: "emphasis",
  text: value,
});

export const term = (
  value: string,
  definition: string,
): ElementaryInlineSegment => ({ type: "term", text: value, definition });

export const content = (
  ...segments: ElementaryInlineSegment[]
): ElementaryInlineContent => segments;

export const plain = (value: string): ElementaryInlineContent => [text(value)];
