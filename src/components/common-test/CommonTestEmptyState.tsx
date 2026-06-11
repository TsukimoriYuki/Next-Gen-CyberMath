import Link from "next/link";

interface Cta {
  label: string;
  href: string;
  /** color scheme: "primary" uses amber, "subtle" uses white/10 */
  variant?: "primary" | "subtle";
}

interface Props {
  /** emoji or Lucide icon node */
  icon?: React.ReactNode;
  title: string;
  message: string;
  /** up to 2 CTAs */
  ctas?: [Cta] | [Cta, Cta];
}

export function CommonTestEmptyState({ icon, title, message, ctas }: Props) {
  return (
    <div
      className="rounded-2xl px-6 py-10 text-center"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {icon && (
        <div className="mb-4 flex justify-center text-white/15">{icon}</div>
      )}
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">
        {title}
      </p>
      <p className="mt-2 font-mono text-[11px] leading-relaxed text-white/25">
        {message}
      </p>
      {ctas && ctas.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {ctas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:opacity-90"
              style={
                cta.variant === "primary"
                  ? {
                      background: "rgba(251,191,36,0.10)",
                      border: "1px solid rgba(251,191,36,0.28)",
                      color: "#fbbf24",
                    }
                  : {
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.55)",
                    }
              }
            >
              {cta.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
