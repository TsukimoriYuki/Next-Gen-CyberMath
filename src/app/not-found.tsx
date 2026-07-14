import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container flex max-w-xl flex-col items-center py-24 text-center sm:py-32">
      <p className="text-sm font-bold tracking-wide text-blue-700">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        ページが見つかりません
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
        URLが変更されたか、現在は公開されていないページです。ホームから公開中の教材を選び直してください。
      </p>
      <Link
        href="/"
        className="button-primary mt-8"
      >
        ホームへ戻る
      </Link>
    </div>
  );
}
