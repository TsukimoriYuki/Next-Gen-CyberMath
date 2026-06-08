"use client";

import Markdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import type { Components } from "react-markdown";
import { LabRenderer } from "@/components/graph/LabRenderer";
import type { GraphKey } from "@/lib/types";

// Lab embeds are authored as a line token: @@lab:<graphKey>@@  (optional |caption).
// We split on it and render <LabRenderer> between the Markdown segments.
const LAB_TOKEN = /@@lab:([a-z0-9-]+)(?:\|[^@]*)?@@/g;

const mdComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 mb-3 font-display text-2xl font-bold tracking-wide text-foreground">
      <span className="text-neon-cyan">#</span> {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-7 mb-2 font-display text-lg font-semibold tracking-wide text-neon-cyan/90">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-3 leading-relaxed text-foreground/85">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-3 ml-5 list-disc space-y-1.5 marker:text-neon-cyan">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 ml-5 list-decimal space-y-1.5 marker:text-neon-cyan">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1 text-foreground/85">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="glass my-5 rounded-xl border-l-2 border-neon-magenta/60 px-5 py-3 text-foreground/90">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-neon-cyan">{children}</strong>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-neon-magenta underline decoration-neon-magenta/40 underline-offset-2 hover:decoration-neon-magenta"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-border/60" />,
  code: ({ children }) => (
    <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-sm text-neon-lime">
      {children}
    </code>
  ),
};

function MarkdownBlock({ children }: { children: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      components={mdComponents}
    >
      {children}
    </Markdown>
  );
}

export function LessonRenderer({ content }: { content: string }) {
  // Split the markdown around @@lab:...@@ tokens.
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of content.matchAll(LAB_TOKEN)) {
    const before = content.slice(last, m.index);
    if (before.trim()) {
      nodes.push(<MarkdownBlock key={key++}>{before}</MarkdownBlock>);
    }
    nodes.push(
      <div key={key++} className="my-6">
        <LabRenderer graphKey={m[1] as GraphKey} />
      </div>,
    );
    last = (m.index ?? 0) + m[0].length;
  }
  const tail = content.slice(last);
  if (tail.trim()) nodes.push(<MarkdownBlock key={key++}>{tail}</MarkdownBlock>);

  return <div className="lesson-prose">{nodes}</div>;
}
