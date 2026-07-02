"use client";

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

/**
 * 問題PDFを画面上部に固定表示するビューア。
 *
 * - 展開時: PC で高さ40vh程度、スマホで30〜35vh程度（Tailwindのレスポンシブ高さで対応）
 * - 最小化時: タイトルバーだけを表示し、iframeは高さ0で保持（スクロール位置を保つ）
 * - 別タブで開く／ダウンロード／全画面表示（アプリ内オーバーレイ）のボタンを備える
 * - すべてのボタンに aria-label を付ける
 */
export function StickyProblemViewer({
  pdfUrl,
  title,
}: {
  pdfUrl: string;
  title: string;
}) {
  const [minimized, setMinimized] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

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
          onToggleMinimize={() => setMinimized((v) => !v)}
          onToggleFullscreen={() => setFullscreen(false)}
        />
        <div className="min-h-0 flex-1 bg-white">{frame}</div>
      </div>
    );
  }

  return (
    <div className="sticky top-16 z-40 border-b border-slate-200 bg-white shadow-sm">
      <ViewerToolbar
        title={title}
        pdfUrl={pdfUrl}
        minimized={minimized}
        fullscreen={false}
        onToggleMinimize={() => setMinimized((v) => !v)}
        onToggleFullscreen={() => setFullscreen(true)}
      />
      <div
        className={cn(
          "overflow-hidden transition-[height] duration-200",
          minimized ? "h-0" : "h-[30vh] sm:h-[35vh] lg:h-[40vh]",
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
    <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <FileText className="h-4 w-4 shrink-0 text-blue-600" />
        <span className="truncate text-xs font-bold text-slate-700 sm:text-sm">
          {title}（問題PDF）
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
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <ExternalLink className="h-4 w-4" />
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
  children: React.ReactNode;
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
