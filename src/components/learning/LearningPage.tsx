import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { SubjectConfig } from "@/data/subjects";

export type LearningAction = Readonly<{
  title: string;
  description: string;
  href: `/${string}` | `#${string}`;
  label: string;
  icon: LucideIcon;
  meta?: string;
}>;

export function LearningPage({ children }: { children: ReactNode }) {
  return <div className="learning-page">{children}</div>;
}

export function LearningPageContainer({ children }: { children: ReactNode }) {
  return <div className="page-container py-10 sm:py-14">{children}</div>;
}

export function LearningPageHero({
  eyebrow,
  title,
  description,
  actions,
  supporting,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: readonly { label: string; href: `/${string}` | `#${string}`; primary?: boolean }[];
  supporting?: ReactNode;
}) {
  return (
    <header className="page-hero">
      <div className={supporting ? "grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end" : ""}>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {description}
          </p>
          {actions && actions.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  data-hero-action={action.href}
                  data-primary-cta={action.primary ? "true" : undefined}
                  className={action.primary ? "button-primary" : "button-secondary"}
                >
                  {action.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          )}
        </div>
        {supporting}
      </div>
    </header>
  );
}

export function LearningSection({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-24 sm:mt-16">
      <div className="mb-5 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function LearningActionGrid({ actions }: { actions: readonly LearningAction[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {actions.map((action) => (
        <LearningActionCard key={`${action.href}-${action.title}`} action={action} />
      ))}
    </div>
  );
}

export function LearningActionCard({ action }: { action: LearningAction }) {
  const Icon = action.icon;
  return (
    <Link href={action.href} className="action-card group" data-learning-action={action.href}>
      <span className="icon-tile" aria-hidden="true">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        {action.meta && <span className="text-xs font-semibold text-blue-700">{action.meta}</span>}
        <span className="mt-0.5 block text-lg font-bold text-slate-950">{action.title}</span>
        <span className="mt-2 block text-sm leading-6 text-slate-600">{action.description}</span>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700">
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}

export function SubjectCard({ subject }: { subject: SubjectConfig }) {
  return (
    <Link href={subject.href} className="action-card group" data-subject-card={subject.id}>
      <span className="icon-tile text-sm font-bold" aria-hidden="true">
        {subject.shortName.slice(0, 1)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-xl font-bold text-slate-950">{subject.name}</span>
          {subject.status === "beta" && (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800">
              β
            </span>
          )}
        </span>
        <span className="mt-2 block text-sm leading-6 text-slate-600">{subject.description}</span>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700">
          {subject.name}の学習メニュー
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
