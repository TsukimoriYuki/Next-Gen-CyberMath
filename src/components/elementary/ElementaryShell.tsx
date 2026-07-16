import Link from "next/link";
import type { ReactNode } from "react";
import { ELEMENTARY_SITE } from "@/data/elementary";
import styles from "./ElementaryShell.module.css";

export function ElementaryShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell} data-school-level="elementary" data-testid="elementary-shell">
      <p className={styles.internalBanner} data-testid="elementary-internal-banner">
        内部準備中 — 現在は公開されていません
      </p>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.brand}>{ELEMENTARY_SITE.name}</p>
          <nav aria-label="小学生版ナビゲーション" className={styles.nav}>
            <Link href="/elementary" className={styles.navLink}>
              小学生版トップ
            </Link>
            <Link href="/elementary/grade-3" className={styles.navLink}>
              3年生
            </Link>
          </nav>
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
  status = "準備中",
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
      <span className={styles.status}>{status}</span>
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
      <span className={styles.status}>内部シェルを開く</span>
    </Link>
  );
}
