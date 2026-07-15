import type { SubjectPageAccess } from "@/lib/subject-route-guard";

export function SubjectPublicationNotice({
  access,
}: {
  access: SubjectPageAccess;
}) {
  const isHiddenSubjectPreview =
    access.runtime === "development" && access.subject.status === "hidden";

  if (!access.isResourcePreview && !access.isBeta && !isHiddenSubjectPreview) {
    return null;
  }

  return (
    <>
      {access.isResourcePreview && (
        <aside
          aria-label="教材の公開状態"
          className="border-b border-slate-300 bg-slate-100 text-slate-900"
        >
          <div className="mx-auto max-w-7xl px-4 py-2.5 text-sm leading-6 sm:px-6">
            <strong>未公開教材・開発確認用</strong>
            <span className="ml-2">
              この教材は本番環境とプレビュー環境では表示されません。
            </span>
          </div>
        </aside>
      )}

      {access.isBeta && (
        <aside
          aria-label="教科の公開状態"
          className="border-b border-amber-200 bg-amber-50 text-amber-950"
        >
          <div className="mx-auto max-w-7xl px-4 py-2.5 text-sm leading-6 sm:px-6">
            <strong>ベータ公開</strong>
            <span className="ml-2">
              この教科は公開中ですが、内容や機能を調整する場合があります。
            </span>
          </div>
        </aside>
      )}

      {isHiddenSubjectPreview && (
        <aside
          aria-label="教科の公開状態"
          className="border-b border-slate-300 bg-slate-100 text-slate-900"
        >
          <div className="mx-auto max-w-7xl px-4 py-2.5 text-sm leading-6 sm:px-6">
            <strong>未公開・開発確認用</strong>
            <span className="ml-2">
              この教科は本番環境とプレビュー環境では表示されません。
            </span>
          </div>
        </aside>
      )}
    </>
  );
}
