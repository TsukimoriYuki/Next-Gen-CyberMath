import Link from "next/link";
import { ElementaryText } from "@/components/elementary/ElementaryText";
import { ELEMENTARY_LIMITED_BETA_RELEASE } from "@/data/elementary/release";
import styles from "./ElementaryBetaNotice.module.css";

export function ElementaryBetaNotice({ variant = "full" }: { variant?: "full" | "compact" }) {
  const copy = ELEMENTARY_LIMITED_BETA_RELEASE.learnerDisplay;

  return (
    <aside
      className={variant === "compact" ? styles.compact : styles.notice}
      aria-label="おしらせ"
      data-testid={`elementary-beta-notice-${variant}`}
      data-text-audience="learner"
      data-grade="grade-3"
    >
      <p className={styles.badge}><ElementaryText content={copy.badge} /></p>
      {variant === "compact" ? (
        <p className={styles.compactText}>小学3年生・算数、国語、社会の3つのおはなしを学べます。</p>
      ) : (
        <>
          <div className={styles.messages}>
            {copy.messages.map((message, index) => (
              <p key={index}><ElementaryText content={message} /></p>
            ))}
          </div>
          <Link className={styles.link} href="/elementary/for-guardians">
            くわしいことを、おうちの人と見る
          </Link>
        </>
      )}
    </aside>
  );
}
