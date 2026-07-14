"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StickyProblemViewerVariant = "top" | "side";

export function StickyProblemViewer({
  pdfUrl,
  title,
  variant = "top",
}: {
  pdfUrl: string;
  title: string;
  variant?: StickyProblemViewerVariant;
}) {
  const [minimized, setMinimized] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const isSide = variant === "side";

  const frame = (
    <iframe
      src={`${pdfUrl}#view=FitH`}
      title={title}
      className="h-full w-full border-0"
    />
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95">
        <ViewerToolbar
          title={title}
          pdfUrl={pdfUrl}
          minimized={false}
          fullscreen
          onToggleMinimize={() => setMinimized((value) => !value)}
          onToggleFullscreen={() => setFullscreen(false)}
        />
        <div className="min-h-0 flex-1 bg-white">{frame}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        isSide
          ? "flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          : "sticky top-16 z-40 border-b border-slate-200 bg-white shadow-sm",
        isSide && (minimized ? "h-auto" : "h-full"),
      )}
    >
      <ViewerToolbar
        title={title}
        pdfUrl={pdfUrl}
        minimized={minimized}
        fullscreen={false}
        onToggleMinimize={() => setMinimized((value) => !value)}
        onToggleFullscreen={() => setFullscreen(true)}
      />
      <div
        className={cn(
          "overflow-hidden bg-white transition-[height] duration-200",
          minimized
            ? "h-0"
            : isSide
              ? "min-h-0 flex-1"
              : "h-[30vh] sm:h-[35vh] lg:h-[40vh]",
        )}
        aria-hidden={minimized}
      >
        {frame}
      </div>
    </div>
  );
}

function ViewerToolbar({
  title,
  pdfUrl,
  minimized,
  fullscreen,
  onToggleMinimize,
  onToggleFullscreen,
}: {
  title: string;
  pdfUrl: string;
  minimized: boolean;
  fullscreen: boolean;
  onToggleMinimize: () => void;
  onToggleFullscreen: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-3 py-2 sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <FileText className="h-4 w-4 shrink-0 text-blue-600" />
        <span className="truncate text-xs font-bold text-slate-700 sm:text-sm">
          {title}・問題PDF
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {!fullscreen && (
          <ToolbarButton
            label={minimized ? "問題PDFを展開する" : "問題PDFを最小化する"}
            onClick={onToggleMinimize}
          >
            {minimized ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </ToolbarButton>
        )}
        {!fullscreen && (
          <ToolbarButton label="問題PDFを全画面表示する" onClick={onToggleFullscreen}>
            <Maximize2 className="h-4 w-4" />
          </ToolbarButton>
        )}
        {fullscreen && (
          <ToolbarButton label="全画面表示を閉じる" onClick={onToggleFullscreen}>
            <Minimize2 className="h-4 w-4" />
          </ToolbarButton>
        )}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="問題PDFを別タブで開く"
          className="inline-flex h-8 items-center justify-center gap-1 rounded-lg px-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <ExternalLink className="h-4 w-4" />
          <span>別タブでPDFを開く</span>
        </a>
        <a
          href={pdfUrl}
          download
          aria-label="問題PDFをダウンロードする"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Download className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function ToolbarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </button>
  );
}
