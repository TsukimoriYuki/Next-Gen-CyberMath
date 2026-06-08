import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
      <div className="font-display text-7xl font-extrabold text-neon-magenta text-glow-12">
        404
      </div>
      <p className="mt-4 text-muted-foreground">
        この座標に問題は存在しません。定義域の外にいるようです。
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl border border-neon-cyan/40 px-5 py-3 text-sm font-semibold text-neon-cyan transition-colors hover:bg-neon-cyan/10"
      >
        原点 (ホーム) に戻る
      </Link>
    </div>
  );
}
