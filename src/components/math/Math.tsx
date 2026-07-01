"use client";

import katex from "katex";
import { cn } from "@/lib/utils";
import { GeometryDiagram } from "@/components/geometry/GeometryDiagram";
import { LabRenderer } from "@/components/graph/LabRenderer";
import type { GeometryDiagramType } from "@/lib/geometry-diagrams";
import type { GraphKey } from "@/lib/types";
import { WhyPopover } from "@/components/scaffolding/WhyPopover";

type MathReadableContent =
  | string
  | {
      text: string;
      readable?: string;
      ariaLabel?: string;
    };

type MathLabelMap = Record<string, string>;

// KaTeX renders to an HTML string on the server (no DOM needed). Frequent
// formulas get readable labels here; callers can still override them per use.
const DEFAULT_MATH_LABELS: MathLabelMap = {
  "x^2-2ax": "エックスの二乗から、二エーエックスを引く式",
  "\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}":
    "二次方程式の解の公式。マイナスビー、プラスマイナス、平方根ビー二乗マイナス四エーシー、割る二エー",
  "\\sin^2\\theta+\\cos^2\\theta=1":
    "サイン二乗シータとコサイン二乗シータの和は一",
  "S=\\frac{1}{2}ah": "面積エスは、二分の一かける底辺エーかける高さエイチ",
  "S=rs": "面積エスは、内接円半径アールかける半周長エス",
  "a/\\sinA=2R": "辺エー割るサインエーは、外接円の直径二アール",
  "\\frac{a}{\\sinA}=2R": "辺エー割るサインエーは、外接円の直径二アール",
  "BD:DC=AB:AC": "ビー ディー 対 ディー シー は、エー ビー 対 エー シー",
  "AD^2=AB\\cdotAC-BD\\cdotDC":
    "エー ディー の二乗は、エー ビー かける エー シー から、ビー ディー かける ディー シー を引く",
  "AM^2=\\frac{2AB^2+2AC^2-BC^2}{4}":
    "エー エム の二乗は、二エー ビー 二乗プラス二エー シー 二乗マイナスビー シー 二乗、割る四",
  "P(A\\capB)=P(A)P(B)": "エーかつビーの確率は、エーの確率かけるビーの確率",
};

function normalizeMathKey(tex: string): string {
  return tex
    .replace(/\\dfrac/g, "\\frac")
    .replace(/\\left|\\right/g, "")
    .replace(/\s+/g, "");
}

function resolveMathLabel(
  tex: string,
  explicit?: string,
  labels?: MathLabelMap,
): string | undefined {
  if (explicit?.trim()) return explicit.trim();
  const key = normalizeMathKey(tex);
  return labels?.[key] ?? DEFAULT_MATH_LABELS[key];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// TeX が壊れていてもページ全体を落とさず、生のTeXをそのまま出すのではなく
// 「読める素のテキスト」へフォールバックする。throwOnError:false で大半は
// 赤字レンダリングになるが、想定外の例外はここで握りつぶす。
function render(tex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
      output: "htmlAndMathml",
    });
  } catch {
    return `<span class="katex-fallback">${escapeHtml(tex)}</span>`;
  }
}

export function InlineMath({
  math,
  ariaLabel,
  readable,
}: {
  math: string;
  ariaLabel?: string;
  readable?: string;
}) {
  const label = resolveMathLabel(math, ariaLabel ?? readable);
  return (
    <span
      className="katex-inline inline-block max-w-full overflow-x-auto overflow-y-hidden align-middle"
      tabIndex={0}
      role={label ? "math" : undefined}
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: render(math, false) }}
    />
  );
}

export function BlockMath({
  math,
  ariaLabel,
  readable,
}: {
  math: string;
  ariaLabel?: string;
  readable?: string;
}) {
  // スマホでも長い数式が見切れないよう、ブロック数式は横スクロール可にする。
  const label = resolveMathLabel(math, ariaLabel ?? readable);
  return (
    <div
      className="katex-block w-full max-w-full overflow-x-auto overflow-y-hidden"
      tabIndex={0}
      role={label ? "math" : undefined}
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: render(math, true) }}
    />
  );
}

// ---- lightweight markdown + KaTeX rich text ----------------------------
// Supports:  $$display$$ / \[display\],  $inline$ / \(inline\),
// blank-line paragraphs, "- " bullet lines, and **bold** spans.

// 教材データには `\( ... \)` `\[ ... \]` が混在する。レンダリング前に
// `$ ... $` `$$ ... $$` へ正規化して、デリミタ揺れによる raw 表示を防ぐ。
// `\\[6pt]` のような行間指定（直前にバックスラッシュがある）は変換しない。
export function normalizeMathDelimiters(input: string): string {
  return input
    .replace(/(?<!\\)\\\[/g, () => "$$")
    .replace(/(?<!\\)\\\]/g, () => "$$")
    .replace(/(?<!\\)\\\(/g, () => "$")
    .replace(/(?<!\\)\\\)/g, () => "$");
}

// @@why:<key>|<label>@@ トークンを WhyPopover に展開するパーサー。
// 毎回新しい RegExp を作成してグローバル状態を回避する。
function parseWhy(segment: string): { key: string; label: string } | null {
  const m = /^@@why:([a-z0-9-]+)\|([^@]+)@@$/.exec(segment);
  if (!m) return null;
  return { key: m[1], label: m[2] };
}

function renderInline(
  text: string,
  keyBase: string,
  mathLabels?: MathLabelMap,
): React.ReactNode[] {
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
        const math = part.slice(1, -1);
        const label = resolveMathLabel(math, undefined, mathLabels);
        return (
          <span
            key={key}
            className="katex-inline inline-block max-w-full overflow-x-auto overflow-y-hidden align-middle"
            tabIndex={0}
            role={label ? "math" : undefined}
            aria-label={label}
            dangerouslySetInnerHTML={{ __html: render(math, false) }}
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
  text,
  className,
  ariaLabel,
  readable,
  mathLabels,
}: {
  children?: MathReadableContent;
  text?: MathReadableContent;
  className?: string;
  ariaLabel?: string;
  readable?: string;
  mathLabels?: MathLabelMap;
}) {
  const content = text ?? children ?? "";
  const rawText = typeof content === "string" ? content : content.text;
  const wrapperLabel =
    ariaLabel ??
    readable ??
    (typeof content === "string" ? undefined : content.ariaLabel ?? content.readable);
  const blocks = normalizeMathDelimiters(rawText.trim()).split(/\n\s*\n/);

  return (
    <div
      className={cn("space-y-3 leading-relaxed", className)}
      aria-label={wrapperLabel}
    >
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

        const geometryDiagramMatch = trimmed.match(/^@@geometry-diagram:([a-z0-9-]+)(?:\|([^@]*))?@@$/);
        if (geometryDiagramMatch) {
          return (
            <GeometryDiagram
              key={bi}
              type={geometryDiagramMatch[1] as GeometryDiagramType}
              caption={geometryDiagramMatch[2]}
              className="my-4"
            />
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
                  {renderInline(l.trim().slice(2), `${bi}-${li}`, mathLabels)}
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
                const math = s.slice(2, -2).trim();
                return (
                  <BlockMath
                    key={si}
                    math={math}
                    ariaLabel={resolveMathLabel(math, undefined, mathLabels)}
                  />
                );
              }
              return (
                <p key={si}>
                  {renderInline(s.replace(/\n/g, " "), `${bi}-${si}`, mathLabels)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
