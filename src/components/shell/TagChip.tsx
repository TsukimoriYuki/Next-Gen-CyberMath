import Link from "next/link";
import { tagColor, tagSlug } from "@/data/tags";

export function TagChip({ tag }: { tag: string }) {
  const color = tagColor(tag);
  return (
    <Link
      href={`/tags/${tagSlug(tag)}`}
      className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs transition-colors"
      style={{
        color,
        borderColor: `color-mix(in oklch, ${color} 40%, transparent)`,
        background: `color-mix(in oklch, ${color} 8%, transparent)`,
      }}
    >
      #{tag}
    </Link>
  );
}

export function TagList({
  tags,
  className,
}: {
  tags?: string[];
  className?: string;
}) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className={className ?? "flex flex-wrap gap-1.5"}>
      {tags.map((t) => (
        <TagChip key={t} tag={t} />
      ))}
    </div>
  );
}
