"use client";

import katex from "katex";
import { cn } from "@/lib/utils";
import { LabRenderer } from "@/components/graph/LabRenderer";
import type { GraphKey } from "@/lib/types";
import { WhyPopover } from "@/components/scaffolding/WhyPopover";

// KaTeX renders to an HTML string on the server (no DOM needed), so these
// stay as server components — zero client JS for static math.

function render(tex: string, displayMode: boolean): string {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    strict: false,
    trust: false,
    output: "html",
  });
}

export function InlineMath({ math }: { math: string }) {
  return (
    <span
      className="katex-inline"
      dangerouslySetInnerHTML={{ __html: render(math, false) }}
    />
  );
}

export function BlockMath({ math }: { math: string }) {
  return (
    <div
      className="katex-block"
      dangerouslySetInnerHTML={{ __html: render(math, true) }}
    />
  );
}

// ---- lightweight markdown + KaTeX rich text ----------------------------
// Supports:  $$display$$ (own line),  $inline$,  blank-line paragraphs,
// "- " bullet lines, and **bold** spans.

// @@why:<key>|<label>@@ トークンを WhyPopover に展開するパーサー。
// 毎回新しい RegExp を作成してグローバル状態を回避する。
function parseWhy(segment: string): { key: string; label: string } | null {
  const m = /^@@why:([a-z0-9-]+)\|([^@]+)@@$/.exec(segment);
  if (!m) return null;
  return { key: m[1], label: m[2] };
}

function renderInline(text: string, keyBase: string): React.ReactNode[] {
  // まず @@why:...@@ を分割。
  const whyParts = text.split(/(@@why:[a-z0-9-]+\|[^@]+@@)/g);
  return whyParts.flatMap((segment, wi) => {
    const why = parseWhy(segment);
    if (why) {
      return [
        <WhyPopover key={`${keyBase}-w${wi}`} noteKey={why.key} label={why.label} />,
      ];
    }
    // Split on $...$ inline math while keeping the delimiters' content.
    const parts = segment.split(/(\$[^$]+\$)/g);
    return parts.map((part, i) => {
      const key = `${keyBase}-${wi}-${i}`;
      if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
        return (
          <span
            key={key}
            dangerouslySetInnerHTML={{ __html: render(part.slice(1, -1), false) }}
          />
        );
      }
      // **bold**
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={key}>
          {boldParts.map((bp, j) =>
            bp.startsWith("**") && bp.endsWith("**") ? (
              <strong key={j} className="font-semibold text-foreground">
                {bp.slice(2, -2)}
              </strong>
            ) : (
              <span key={j}>{bp}</span>
            ),
          )}
        </span>
      );
    });
  });
}

export function MathText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const blocks = children.trim().split(/\n\s*\n/);

  return (
    <div className={cn("space-y-3 leading-relaxed", className)}>
      {blocks.map((block, bi) => {
        const trimmed = block.trim();

        // JSXGraph lab embed token: @@lab:<graphKey>@@ (optional |caption).
        // Renders the interactive lab; unknown keys render nothing (null-safe
        // placeholder for labs that are not implemented yet).
        const labMatch = trimmed.match(/^@@lab:([a-z0-9-]+)(?:\|[^@]*)?@@$/);
        if (labMatch) {
          return (
            <div key={bi} className="my-4">
              <LabRenderer graphKey={labMatch[1] as GraphKey} />
            </div>
          );
        }

        // Bullet list (every line starts with "- ")
        const lines = trimmed.split("\n");
        if (lines.length > 0 && lines.every((l) => l.trim().startsWith("- "))) {
          return (
            <ul
              key={bi}
              className="ml-1 space-y-1.5 [&>li]:relative [&>li]:pl-5"
            >
              {lines.map((l, li) => (
                <li key={li}>
                  <span className="absolute left-0 top-0 text-neon-cyan">
                    ▹
                  </span>
                  {renderInline(l.trim().slice(2), `${bi}-${li}`)}
                </li>
              ))}
            </ul>
          );
        }

        // Otherwise: split out any $$display$$ segments (even mid-paragraph),
        // rendering them as block math and the rest as inline paragraphs.
        const segments = trimmed.split(/(\$\$[\s\S]+?\$\$)/g);
        return (
          <div key={bi} className="space-y-3">
            {segments.map((seg, si) => {
              const s = seg.trim();
              if (!s) return null;
              if (s.startsWith("$$") && s.endsWith("$$")) {
                return <BlockMath key={si} math={s.slice(2, -2).trim()} />;
              }
              return (
                <p key={si}>
                  {renderInline(s.replace(/\n/g, " "), `${bi}-${si}`)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
