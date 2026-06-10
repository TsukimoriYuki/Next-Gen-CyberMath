import Link from "next/link";
import { Sigma, BookOpen } from "lucide-react";

interface Props {
  current: "math" | "english";
}

export function MentorTabBar({ current }: Props) {
  const tabs = [
    { key: "math",    label: "MATH",    icon: Sigma,    href: "/mentor?tab=math" },
    { key: "english", label: "ENGLISH", icon: BookOpen, href: "/mentor?tab=english" },
  ] as const;

  return (
    <div
      className="inline-flex gap-1 rounded-xl p-1"
      style={{
        background: "rgba(var(--neon-amber-rgb, 251,191,36),0.05)",
        border: "1px solid rgba(var(--neon-amber-rgb, 251,191,36),0.18)",
      }}
    >
      {tabs.map((t) => {
        const active = current === t.key;
        const Icon = t.icon;
        return (
          <Link
            key={t.key}
            href={t.href}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-sm font-semibold transition-all duration-200"
            style={{
              background: active
                ? t.key === "math"
                  ? "color-mix(in oklch, var(--neon-cyan) 12%, transparent)"
                  : "color-mix(in oklch, var(--neon-lime) 12%, transparent)"
                : "transparent",
              border: active
                ? t.key === "math"
                  ? "1px solid color-mix(in oklch, var(--neon-cyan) 38%, transparent)"
                  : "1px solid color-mix(in oklch, var(--neon-lime) 38%, transparent)"
                : "1px solid transparent",
              color: active
                ? t.key === "math"
                  ? "var(--neon-cyan)"
                  : "var(--neon-lime)"
                : "var(--muted-foreground)",
            }}
          >
            <Icon className="h-4 w-4" />
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
