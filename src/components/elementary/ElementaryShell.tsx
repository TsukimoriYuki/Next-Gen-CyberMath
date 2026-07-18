import Link from "next/link";
import type { ReactNode } from "react";
import { ElementaryBetaNotice } from "@/components/elementary/ElementaryBetaNotice";
import { ElementaryNavigation } from "@/components/elementary/ElementaryNavigation";
import { ELEMENTARY_SITE } from "@/data/elementary";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import styles from "./ElementaryShell.module.css";

export function ElementaryShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell} data-school-level="elementary" data-testid="elementary-shell">
      {ELEMENTARY_SITE.publicationStatus === "beta" ? (
        <ElementaryBetaNotice variant="compact" />
      ) : (
        <p className={styles.internalBanner} data-testid="elementary-internal-banner" data-text-audience="developer">
          {elementaryUiCopy("internal-banner")}
        </p>
      )}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/learn" className={styles.brand} aria-label="Cyber Math 学習トップ">
            {elementaryUiCopy("shell-brand")}
          </Link>
          <ElementaryNavigation />
        </div>
      </header>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export function ElementaryPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className={styles.pageHeader}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>{description}</p>
    </header>
  );
}

export function ElementaryRichPageHeader({
  eyebrow,
  heading,
  lead,
}: {
  eyebrow: string;
  heading: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <header className={styles.pageHeader}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{heading}</h1>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </header>
  );
}

export function ElementarySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

export function ElementaryCardGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function ElementaryStatusCard({
  title,
  description,
  status,
  testId,
}: {
  title: string;
  description: string;
  status?: string;
  testId?: string;
}) {
  return (
    <article className={styles.card} data-testid={testId}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{description}</p>
      <span className={styles.status}>{status ?? elementaryUiCopy("status-default")}</span>
    </article>
  );
}

export function ElementaryGradeLink({
  href,
  title,
  description,
}: {
  href: "/elementary/grade-3";
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className={styles.cardLink} data-testid="elementary-grade-link">
      <span className={styles.cardTitle}>{title}</span>
      <span className={styles.cardText}>{description}</span>
      <span className={styles.status}>{elementaryUiCopy("home-grade-3-status")}</span>
    </Link>
  );
}

export function ElementaryLinkCard({
  href,
  heading,
  description,
  meta,
  action,
  testId,
}: {
  href: string;
  heading: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  action: string;
  testId?: string;
}) {
  return (
    <Link href={href} className={styles.cardLink} data-testid={testId}>
      <span className={styles.cardTitle}>{heading}</span>
      {description ? <span className={styles.cardText}>{description}</span> : null}
      {meta ? <span className={styles.cardText}>{meta}</span> : null}
      <span className={styles.status}>{action}</span>
    </Link>
  );
}
