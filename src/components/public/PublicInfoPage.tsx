import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type InfoSection = {
  title: string;
  body: string[];
};

export function PublicInfoPage({
  eyebrow,
  title,
  lead,
  sections,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  sections: InfoSection[];
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        ポータルへ戻る
      </Link>

      <header className="mt-8">
        <div className="inline-flex rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
          {eyebrow}
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          {lead}
        </p>
      </header>

      <div className="mt-8 space-y-4">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-border/70 bg-card/70 p-5"
          >
            <h2 className="font-display text-lg font-bold text-foreground">{section.title}</h2>
            <div className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
