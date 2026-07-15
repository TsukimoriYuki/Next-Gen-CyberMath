"use client";

import Markdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import type { Components } from "react-markdown";
import { LabRenderer } from "@/components/graph/LabRenderer";
import { GeometryDiagram } from "@/components/geometry/GeometryDiagram";
import { WhyPopover } from "@/components/scaffolding/WhyPopover";
import type { GeometryDiagramType } from "@/lib/geometry-diagrams";
import type { GraphKey } from "@/lib/types";

// Lab embeds are authored as a line token: @@lab:<graphKey>@@  (optional |caption).
// We split on it and render <LabRenderer> between the Markdown segments.
const EMBED_TOKEN = /@@(?:lab|geometry-diagram):([a-z0-9-]+)(?:\|([^@]*))?@@/g;

// CommonMark の強調フランキング規則は、`**太字**` が CJK の文字・句読点に直接
// 隣接すると認識に失敗し（例: `）**` の直後が `に` のような場合）、`**` が
// そのまま表示されてしまう。micromark のパース後（mdast）に残った `**…**` を
// 走査して strong ノードへ変換する小さな remark プラグインで補正する（依存なし）。
// 正しく解釈済みの太字は既に strong ノード（子テキストに `**` を含まない）なので
// 影響を受けず、数式（math/inlineMath）やコード（value のみで children を持たない）
// にも触れない。
interface MdNode {
  type: string;
  value?: string;
  children?: MdNode[];
}

function splitBold(value: string): MdNode[] {
  const out: MdNode[] = [];
  const re = /\*\*([^*\n]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) {
    if (m.index > last) out.push({ type: "text", value: value.slice(last, m.index) });
    out.push({ type: "strong", children: [{ type: "text", value: m[1] }] });
    last = m.index + m[0].length;
  }
  if (last < value.length) out.push({ type: "text", value: value.slice(last) });
  return out;
}

function remarkCjkBold() {
  return (tree: MdNode) => {
    const walk = (node: MdNode) => {
      if (!node.children) return;
      const next: MdNode[] = [];
      for (const child of node.children) {
        if (child.type === "text" && child.value?.includes("**")) {
          next.push(...splitBold(child.value));
        } else {
          walk(child);
          next.push(child);
        }
      }
      node.children = next;
    };
    walk(tree);
  };
}

// @@why:key|label@@ → [label](#why-key) so the `a` component can render <WhyPopover>.
const WHY_TOKEN = /@@why:([a-z0-9-]+)\|([^@]+)@@/g;

function preprocessWhy(src: string): string {
  return src.replace(WHY_TOKEN, (_, key, label) => `[${label}](#why-${key})`);
}

// remark-math (v6) の `$$...$$` の扱いには 2 つの落とし穴がある:
//   1. 同一行で開始し複数行に渡る `$$本文\n…\n本文$$` を「コードフェンス」と誤認し、
//      開始行をメタ扱いしてバックスラッシュを削り、独立行の閉じ `$$` が無いため以降を
//      丸ごと飲み込む。
//   2. 単一行の `$$…$$` は inline math（displayMode:false）として描画されるため、
//      中央寄せされず、`\tag` のような display 専用コマンドがエラーになる。
// いずれも区切り `$$` を独立行に置けば flow（block）math = display mode となり解決する。
// そこで全ての表示数式 `$$…$$` を独立行形式へ正規化する（旧 MathText の BlockMath と
// 同じ挙動）。inline `$…$`（単一 $）はこの正規表現に一致しないため影響を受けない。
const DISPLAY_MATH = /\$\$([\s\S]*?)\$\$/g;

function normalizeDisplayMath(src: string): string {
  return src.replace(DISPLAY_MATH, (_whole, inner: string) => `\n\n$$\n${inner.trim()}\n$$\n\n`);
}

function preprocess(src: string): string {
  return preprocessWhy(normalizeDisplayMath(src));
}

const mdComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mb-3 mt-10 text-2xl font-bold tracking-tight text-slate-950">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-7 text-lg font-bold text-slate-900">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-3 leading-7 text-slate-700">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-3 ml-5 list-disc space-y-1.5 marker:text-blue-600">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 ml-5 list-decimal space-y-1.5 marker:font-semibold marker:text-blue-700">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1 leading-7 text-slate-700">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-5 rounded-xl border border-blue-200 border-l-4 bg-blue-50 px-5 py-3 text-slate-800">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-slate-950">{children}</strong>
  ),
  a: ({ children, href }) => {
    if (href?.startsWith("#why-")) {
      return (
        <WhyPopover noteKey={href.slice(5)} label={String(children)} />
      );
    }
    return (
      <a
        href={href}
        className="rounded-sm font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900 hover:decoration-blue-700 focus-visible:outline-offset-4"
      >
        {children}
      </a>
    );
  },
  hr: () => <hr className="my-8 border-slate-200" />,
  code: ({ children }) => (
    <code className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-sm font-semibold text-slate-800">
      {children}
    </code>
  ),
};

function MarkdownBlock({ children }: { children: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkMath, remarkGfm, remarkCjkBold]}
      rehypePlugins={[rehypeKatex]}
      components={mdComponents}
    >
      {preprocess(children)}
    </Markdown>
  );
}

export function LessonRenderer({ content }: { content: string }) {
  // Split the markdown around embed tokens.
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of content.matchAll(EMBED_TOKEN)) {
    const before = content.slice(last, m.index);
    if (before.trim()) {
      nodes.push(<MarkdownBlock key={key++}>{before}</MarkdownBlock>);
    }
    if (m[0].startsWith("@@lab:")) {
      nodes.push(
        <div key={key++} className="my-6">
          <LabRenderer graphKey={m[1] as GraphKey} />
        </div>,
      );
    } else {
      nodes.push(
        <GeometryDiagram
          key={key++}
          type={m[1] as GeometryDiagramType}
          caption={m[2]}
        />,
      );
    }
    last = (m.index ?? 0) + m[0].length;
  }
  const tail = content.slice(last);
  if (tail.trim()) nodes.push(<MarkdownBlock key={key++}>{tail}</MarkdownBlock>);

  return <div className="lesson-prose">{nodes}</div>;
}
