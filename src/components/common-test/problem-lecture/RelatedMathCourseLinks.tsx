import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardList } from "lucide-react";
import type { RelatedLink } from "@/types/common-test-problem-lecture";

export function RelatedMathCourseLinks({
  relatedMathCourses,
  relatedMocks,
  nextProblemLectures,
}: {
  relatedMathCourses: RelatedLink[];
  relatedCoreLectures: RelatedLink[];
  relatedMocks: RelatedLink[];
  nextProblemLectures?: RelatedLink[];
}) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <LinkGroup
        icon={<BookOpen className="h-4 w-4 text-blue-600" />}
        title="基礎が不安なら：MATH講座"
        items={relatedMathCourses}
      />
      <LinkGroup
        icon={<ClipboardList className="h-4 w-4 text-emerald-600" />}
        title="関連する冊子型模試・大問別演習"
        items={relatedMocks}
      />
      {nextProblemLectures && nextProblemLectures.length > 0 && (
        <LinkGroup
          icon={<ArrowRight className="h-4 w-4 text-amber-600" />}
          title="次に解くべき問題解体型講座"
          items={nextProblemLectures}
        />
      )}
    </section>
  );
}

function LinkGroup({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: RelatedLink[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h3 className="text-xs font-extrabold text-slate-950">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              className="group flex items-start gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-700"
            >
              <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
              <span>
                {item.label}
                {item.description && (
                  <span className="ml-1 font-normal text-slate-500">・{item.description}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
