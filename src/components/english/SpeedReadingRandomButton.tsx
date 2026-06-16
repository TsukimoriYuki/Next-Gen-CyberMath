"use client";

import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";

interface Props {
  /** 抽選対象の長文ID一覧（サーバー側でレベル絞り込み済み） */
  ids: string[];
  /** スピードサポートモードで開始するか */
  speedSupport?: boolean;
  /** 表示ラベル */
  label?: string;
  className?: string;
}

/**
 * 補助CTA: 一覧の中からランダムに1題を開く。
 * 主導線はあくまで長文一覧のカードで、これはクイックスタート用。
 */
export function SpeedReadingRandomButton({
  ids,
  speedSupport = false,
  label = "ランダムに1題読む",
  className,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (ids.length === 0) return;
    const randomValues = new Uint32Array(1);
    globalThis.crypto?.getRandomValues(randomValues);
    const index = randomValues[0] % ids.length;
    const suffix = speedSupport ? "?speedSupport=1" : "";
    router.push(`/english/speed-reading/${ids[index]}${suffix}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={ids.length === 0}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-mono text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      }
    >
      <Shuffle className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
