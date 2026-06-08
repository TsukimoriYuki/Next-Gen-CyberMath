import katex from "katex";
import { cn } from "@/lib/utils";
import { LabRenderer } from "@/components/graph/LabRenderer";
import type { GraphKey } from "@/lib/types";

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

function renderInline(text: string, keyBase: string) {
  // Split on $...$ inline math while keeping the delimiters' content.
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`;
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
