"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, sliderStyle, textStyle } from "./theme";

/**
 * Mathematical induction as falling dominoes. Slider k topples dominoes 1..k.
 * The mode slider switches which predecessors are needed to topple the next
 * domino: 基本型 (n→n+1), 2項間 ((n−1,n)→n+1), 累積型 (1..n→n+1).
 */
const N = 8;
const MODES = ["基本型 n→n+1", "2項間 (n−1,n)→n+1", "累積型 1..n→n+1"];

export function DominoInductionLab() {
  return (
    <JsxBoard
      boundingBox={[-0.5, 2.4, 9.5, -1.2]}
      keepAspectRatio={false}
      ariaLabel="数学的帰納法のドミノ"
      init={(board) => {
        const b = board;
        const k = b.create("slider", [[0.5, 2.1], [4, 2.1], [0, 3, N]], {
          name: "k 倒す", snapWidth: 1, ...sliderStyle(NEON.cyan),
        });
        const mode = b.create("slider", [[5, 2.1], [8.5, 2.1], [0, 0, 2]], {
          name: "型", snapWidth: 1, ...sliderStyle(NEON.violet),
        });

        const fallen = (i: number) => i <= Math.round(k.Value());
        const target = () => Math.round(k.Value()) + 1;
        const isSupport = (i: number) => {
          const t = target();
          const m = Math.round(mode.Value());
          if (i >= t) return false;
          if (m === 0) return i === t - 1;
          if (m === 1) return i === t - 1 || i === t - 2;
          return true; // 累積型: 1..(t-1) すべて
        };

        for (let i = 1; i <= N; i++) {
          // standing: thin tall rect at x=i; fallen: low rect leaning right.
          const corners: [() => number, () => number][] = [
            [() => (fallen(i) ? i - 0.1 : i - 0.12), () => 0],
            [() => (fallen(i) ? i + 0.78 : i + 0.12), () => 0],
            [() => (fallen(i) ? i + 0.78 : i + 0.12), () => (fallen(i) ? 0.22 : 0.95)],
            [() => (fallen(i) ? i - 0.1 : i - 0.12), () => (fallen(i) ? 0.22 : 0.95)],
          ];
          b.create("polygon", corners, {
            borders: { strokeColor: NEON.muted, strokeWidth: 1 },
            fillColor: () =>
              fallen(i) ? NEON.cyan : isSupport(i) ? NEON.magenta : NEON.muted,
            fillOpacity: () => (fallen(i) ? 0.5 : isSupport(i) ? 0.4 : 0.15),
            vertices: { visible: false },
            fixed: true,
          });
          b.create("text", [i, -0.55, () => `${i}`], {
            anchorX: "middle", fontSize: 12,
            cssStyle: "color:#9fb0d6;font-family:var(--font-mono,monospace);",
          });
        }

        // arrow from last fallen to the target
        b.create("arrow", [
          [() => target() - 0.6, () => 1.2],
          [() => target() - 0.05, () => 1.0],
        ], {
          strokeColor: NEON.lime, strokeWidth: 2,
          visible: () => target() <= N,
        });

        b.create("text", [-0.4, -1.0, () => `型: ${MODES[Math.round(mode.Value())]}（マゼンタ＝次を倒すのに使う仮定）`], textStyle);
      }}
    />
  );
}
