"use client";

import Link from "next/link";
import { LearningPageShell, LearningState } from "@/components/learning/LearningPageFrame";

export default function ErrorPage({ unstable_retry }: { unstable_retry: () => void }) {
  return (
    <LearningPageShell width="reading">
      <LearningState
        kind="error"
        headingLevel={1}
        title="ページを表示できませんでした"
        description="通信状況を確認して、もう一度お試しください。解決しない場合は学習メニューへ戻れます。"
        actions={
          <>
            <button type="button" className="button-primary" onClick={() => unstable_retry()}>
              もう一度試す
            </button>
            <Link href="/learn" className="button-secondary">
              学習メニューへ戻る
            </Link>
          </>
        }
      />
    </LearningPageShell>
  );
}
