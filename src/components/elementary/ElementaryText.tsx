import { Fragment } from "react";
import type { ElementaryInlineContent } from "@/types/elementary-content";

export function ElementaryText({
  content,
  className,
}: {
  content: ElementaryInlineContent;
  className?: string;
}) {
  return (
    <span className={className}>
      {content.map((segment, index) => {
        const key = `${segment.type}-${index}`;
        switch (segment.type) {
          case "text":
            return <Fragment key={key}>{segment.text}</Fragment>;
          case "ruby":
            return (
              <ruby key={key}>
                {segment.base}
                <rp>（</rp>
                <rt>{segment.reading}</rt>
                <rp>）</rp>
              </ruby>
            );
          case "emphasis":
            return <strong key={key}>{segment.text}</strong>;
          case "term":
            return (
              <dfn key={key} title={segment.definition}>
                {segment.text}
              </dfn>
            );
        }
      })}
    </span>
  );
}
