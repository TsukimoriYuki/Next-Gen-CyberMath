"use client";

import { useEffect, useRef } from "react";
// JSXGraph renders boards as SVG; its stylesheet only affects optional
// infobox/controls, so we skip importing it (avoids bundler subpath issues)
// and style elements explicitly instead.

// Minimal structural types — jsxgraph ships loose types and we only need a
// couple of entry points here. `create` is intentionally permissive so labs
// can build any element/slider without per-call casts.
export interface JxgElement {
  Value(): number;
  X(): number;
  Y(): number;
  [key: string]: unknown;
}
export interface JxgBoard {
  create(
    elementType: string,
    parents: unknown[],
    attributes?: Record<string, unknown>,
  ): JxgElement;
  update(): void;
  [key: string]: unknown;
}
type JxgModule = {
  JSXGraph: {
    initBoard: (
      el: HTMLElement,
      attrs: Record<string, unknown>,
    ) => JxgBoard;
    freeBoard: (board: JxgBoard) => void;
  };
  /** Global defaults. We retune a few for the Light Cyber (white) theme. */
  Options?: {
    grid?: Record<string, unknown>;
    [key: string]: unknown;
  };
};

export interface JsxBoardProps {
  /** [xmin, ymax, xmax, ymin] */
  boundingBox: [number, number, number, number];
  /** Build the scene. Receives the live board and the JXG module. */
  init: (board: JxgBoard, JXG: JxgModule) => void;
  axis?: boolean;
  keepAspectRatio?: boolean;
  grid?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function JsxBoard({
  boundingBox,
  init,
  axis = true,
  keepAspectRatio = true,
  grid = true,
  className,
  ariaLabel = "インタラクティブ・グラフ",
}: JsxBoardProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  // `init` only runs once (on mount); capture the first reference.
  const initRef = useRef(init);

  useEffect(() => {
    let board: JxgBoard | null = null;
    let JXG: JxgModule | null = null;
    let cancelled = false;

    (async () => {
      const mod = (await import("jsxgraph")) as unknown as {
        default: JxgModule;
      };
      JXG = mod.default ?? (mod as unknown as JxgModule);
      if (cancelled || !hostRef.current) return;

      // Light Cyber theme: a faint blue-grey grid on the white board.
      if (JXG.Options?.grid) {
        JXG.Options.grid.strokeColor = "#dbe3ef";
        JXG.Options.grid.strokeOpacity = 0.9;
      }

      board = JXG.JSXGraph.initBoard(hostRef.current, {
        boundingBox,
        axis,
        keepAspectRatio,
        grid,
        showCopyright: false,
        showNavigation: false,
        pan: { enabled: false },
        zoom: { wheel: false },
        defaultAxes: {
          x: {
            strokeColor: "#475569",
            strokeWidth: 1.4,
            ticks: {
              strokeColor: "#94a3b8",
              majorHeight: 8,
              label: { strokeColor: "#475569", cssStyle: "color:#475569;" },
            },
          },
          y: {
            strokeColor: "#475569",
            strokeWidth: 1.4,
            ticks: {
              strokeColor: "#94a3b8",
              majorHeight: 8,
              label: { strokeColor: "#475569", cssStyle: "color:#475569;" },
            },
          },
        },
      });

      initRef.current(board, JXG);

      // JSXGraph renders slider widgets as real, focusable <input type="range">
      // elements but never gives them an accessible name — axe-core flags this
      // as a critical "label" violation. Label each one here, centrally, once,
      // rather than patching every individual lab file that creates a slider.
      const labelSliders = () => {
        if (!hostRef.current) return;
        const sliders = hostRef.current.querySelectorAll('input[type="range"]');
        sliders.forEach((el, i) => {
          if (!el.hasAttribute("aria-label")) {
            el.setAttribute("aria-label", `${ariaLabel} — 操作用スライダー ${i + 1}`);
          }
        });
      };
      labelSliders();
      requestAnimationFrame(labelSliders);
    })();

    return () => {
      cancelled = true;
      if (board && JXG) JXG.JSXGraph.freeBoard(board);
    };
    // boundingBox is intentionally fixed for the component's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        background: "#ffffff",
        border: "1px solid oklch(0.58 0.1 215 / 0.25)",
        borderRadius: "0.75rem",
      }}
    />
  );
}
