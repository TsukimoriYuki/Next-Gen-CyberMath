"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Minus, Plus } from "lucide-react";
import type { ExamPaper } from "@/data/exam-papers";

interface Props {
  paper: ExamPaper;
  currentPage: number;
  zoom: number;
  onPageChange: (pageIndex: number) => void;
  onZoomChange: (zoom: number) => void;
}

export function ExamPaperViewer({
  paper,
  currentPage,
  zoom,
  onPageChange,
  onZoomChange,
}: Props) {
  const pageImages = paper.pageImages ?? [];
  const pageCount = pageImages.length;
  const pageImage = pageImages[currentPage];
  const canPrev = currentPage > 0;
  const canNext = currentPage + 1 < pageCount;

  function changeZoom(delta: number) {
    onZoomChange(Math.min(1.4, Math.max(0.75, Number((zoom + delta).toFixed(2)))));
  }

  return (
    <section className="flex min-h-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <div>
          <h2 className="text-sm font-extrabold text-slate-950">問題冊子</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            PDFをページ画像化した初期実装です。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {paper.paperPdfUrl && (
            <a
              href={paper.paperPdfUrl}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 hover:border-blue-200 hover:text-blue-700"
            >
              PDF
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <button
            type="button"
            onClick={() => changeZoom(-0.1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="縮小"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-12 text-center text-xs font-bold tabular-nums text-slate-600">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => changeZoom(0.1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="拡大"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canPrev}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          前へ
        </button>
        <div className="text-xs font-bold text-slate-500">
          {pageCount > 0 ? `${currentPage + 1} / ${pageCount}ページ` : "画像未登録"}
        </div>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canNext}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          次へ
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-slate-100 p-3 sm:p-4">
        {pageImage ? (
          <div className="mx-auto flex max-w-full justify-center">
            <div
              className="origin-top rounded-lg bg-white shadow-sm ring-1 ring-slate-200"
              style={{ width: `${Math.round(100 * zoom)}%`, maxWidth: "960px" }}
            >
              <Image
                src={pageImage}
                alt={`${paper.title} ${currentPage + 1}ページ`}
                width={960}
                height={1320}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="h-auto w-full rounded-lg"
                priority={currentPage === 0}
              />
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            ページ画像がまだ登録されていません。
          </div>
        )}
      </div>
    </section>
  );
}
