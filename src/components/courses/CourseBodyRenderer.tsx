// Server component — renders course block body text with $...$ KaTeX and **bold**.
// display math delimiter は禁止。インライン数式のみ使う。

import katex from "katex";

function renderKatex(tex: string): string {
  return katex.renderToString(tex, {
    displayMode: false,
    throwOnError: false,
    strict: false,
    output: "html",
  });
}

type InlineNode = React.ReactNode;

function normalizeLatexEscapes(text: string): string {
  return text.replace(/\f/g, "\\f");
}

function renderInline(text: string, keyBase: string): InlineNode[] {
  const parts = text.split(/(\$[^$\n]+\$)/g);
  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
      return (
        <span
          key={key}
          dangerouslySetInnerHTML={{ __html: renderKatex(part.slice(1, -1)) }}
        />
      );
    }
    const boldParts = part.split(/(\*\*[^*\n]+\*\*)/g);
    if (boldParts.length === 1) return <span key={key}>{part}</span>;
    return (
      <span key={key}>
        {boldParts.map((bp, j) =>
          bp.startsWith("**") && bp.endsWith("**") ? (
            <strong key={j} className="font-semibold text-slate-900">
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

export function CourseBodyRenderer({
  body,
  className,
}: {
  body: string;
  className?: string;
}) {
  const normalizedBody = normalizeLatexEscapes(body);

  if (!normalizedBody.trim()) return null;

  const paragraphs = normalizedBody.split(/\n\n+/);

  return (
    <div className={className ?? "space-y-2 text-xs leading-relaxed text-slate-700"}>
      {paragraphs.map((para, pi) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        const lines = trimmed.split("\n");
        const allBullet = lines.every((l) => l.trim().startsWith("- "));
        const allNumbered = lines.every((l) => /^\d+\.\s/.test(l.trim()));

        if (allBullet) {
          return (
            <ul key={pi} className="ml-4 space-y-1 list-disc marker:text-slate-400">
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.trim().slice(2), `${pi}-${li}`)}</li>
              ))}
            </ul>
          );
        }

        if (allNumbered) {
          return (
            <ol key={pi} className="ml-4 space-y-1 list-decimal marker:text-slate-400">
              {lines.map((l, li) => {
                const content = l.trim().replace(/^\d+\.\s/, "");
                return <li key={li}>{renderInline(content, `${pi}-${li}`)}</li>;
              })}
            </ol>
          );
        }

        return (
          <p key={pi}>
            {lines.flatMap((l, li) => [
              ...renderInline(l, `${pi}-${li}`),
              li < lines.length - 1 ? <br key={`br-${pi}-${li}`} /> : null,
            ])}
          </p>
        );
      })}
    </div>
  );
}
