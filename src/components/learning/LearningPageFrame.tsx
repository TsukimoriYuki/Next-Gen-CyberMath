import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock3,
  LoaderCircle,
  LockKeyhole,
  WifiOff,
} from "lucide-react";
import type { ReactNode } from "react";
import { LearningPage, LearningPageContainer } from "@/components/learning/LearningPage";

export type LearningBreadcrumb = Readonly<{
  label: string;
  href?: string;
}>;

export type ContentMetaItem = Readonly<{
  label: string;
  value: ReactNode;
}>;

type LearningStateKind =
  | "loading"
  | "error"
  | "empty"
  | "login-required"
  | "unavailable"
  | "offline"
  | "unpublished";

type LearningStatusKind = "beta" | "completed" | "in-progress" | "review-due";

const SHELL_WIDTHS = {
  reading: "mx-auto max-w-4xl",
  content: "mx-auto max-w-6xl",
  wide: "",
  split: "",
} as const;

const STATE_ICONS = {
  loading: LoaderCircle,
  error: AlertCircle,
  empty: Clock3,
  "login-required": LockKeyhole,
  unavailable: AlertCircle,
  offline: WifiOff,
  unpublished: LockKeyhole,
} as const;

const STATUS_STYLES = {
  beta: "border-amber-200 bg-amber-50 text-amber-800",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  "in-progress": "border-blue-200 bg-blue-50 text-blue-800",
  "review-due": "border-violet-200 bg-violet-50 text-violet-800",
} as const;

const STATUS_LABELS = {
  beta: "ベータ公開",
  completed: "完了",
  "in-progress": "学習中",
  "review-due": "復習時期",
} as const;

export function LearningPageShell({
  children,
  width = "content",
  className = "",
}: {
  children: ReactNode;
  width?: keyof typeof SHELL_WIDTHS;
  className?: string;
}) {
  const content = (
    <div data-page-shell="learning" className={`${SHELL_WIDTHS[width]} ${className}`.trim()}>
      {children}
    </div>
  );

  if (width === "split") {
    return (
      <LearningPage>
        <div className="mx-auto w-[min(calc(100%_-_2rem),1500px)] py-8 sm:py-10">{content}</div>
      </LearningPage>
    );
  }

  return (
    <LearningPage>
      <LearningPageContainer>
        {content}
      </LearningPageContainer>
    </LearningPage>
  );
}

export function LearningBreadcrumbs({ items }: { items: readonly LearningBreadcrumb[] }) {
  return (
    <nav aria-label="パンくず" className="mb-6 text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />}
              {item.href && !isCurrent ? (
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-sm font-medium hover:text-blue-700 focus-visible:outline-offset-4"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isCurrent ? "page" : undefined} className={isCurrent ? "font-semibold text-slate-900" : ""}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function LearningPageHeader({
  eyebrow,
  title,
  description,
  meta,
  actions,
  status,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  meta?: readonly ContentMetaItem[];
  actions?: ReactNode;
  status?: LearningStatusKind;
}) {
  return (
    <header className="border-b border-slate-200 pb-8">
      <div className="flex flex-wrap items-center gap-3">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {status && <LearningStatusBadge status={status} />}
      </div>
      <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h1>
      {description && <div className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{description}</div>}
      {meta && meta.length > 0 && <ContentMeta items={meta} className="mt-6" />}
      {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
    </header>
  );
}

export function LearningSectionHeader({
  title,
  description,
}: {
  title: string;
  description?: ReactNode;
}) {
  return (
    <div className="mb-5 max-w-3xl">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
      {description && <div className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">{description}</div>}
    </div>
  );
}

export function ContentMeta({
  items,
  className = "",
}: {
  items: readonly ContentMetaItem[];
  className?: string;
}) {
  return (
    <dl className={`flex flex-wrap gap-x-6 gap-y-3 text-sm ${className}`.trim()}>
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="font-medium text-slate-500">{item.label}</dt>
          <dd className="mt-0.5 font-semibold text-slate-800">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function LearningStatusBadge({ status }: { status: LearningStatusKind }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

export function LearningState({
  kind,
  title,
  description,
  actions,
  compact = false,
  headingLevel = 2,
}: {
  kind: LearningStateKind;
  title: string;
  description: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
  headingLevel?: 1 | 2 | 3 | 4;
}) {
  const Icon = STATE_ICONS[kind];
  const isAlert = kind === "error" || kind === "offline" || kind === "unavailable";
  const Heading = `h${headingLevel}` as "h1" | "h2" | "h3" | "h4";

  return (
    <section
      role={isAlert ? "alert" : "status"}
      aria-live={kind === "loading" ? "polite" : undefined}
      aria-busy={kind === "loading" ? "true" : undefined}
      className={`rounded-2xl border border-slate-200 bg-white text-center shadow-sm ${compact ? "p-6" : "px-6 py-12 sm:px-10"}`}
      data-learning-state={kind}
    >
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700" aria-hidden="true">
        <Icon className={`h-5 w-5 ${kind === "loading" ? "animate-spin" : ""}`} />
      </span>
      <Heading className="mt-4 text-xl font-bold text-slate-950">{title}</Heading>
      <div className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">{description}</div>
      {actions && <div className="mt-6 flex flex-wrap justify-center gap-3">{actions}</div>}
    </section>
  );
}

export function CompletionSummary({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
