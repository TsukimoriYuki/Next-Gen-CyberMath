"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, sliderStyle, textStyle } from "./theme";

/**
 * One triangle, three lenses. The selector switches the overlay:
 * 0 初等幾何 (角の印・中線), 1 座標 (軸・グリッド・座標), 2 ベクトル (位置ベクトル).
 */
const A: [number, number] = [-2, -1.5];
const B: [number, number] = [3, -1.5];
const C: [number, number] = [0.5, 2.5];
const LENSES = ["初等幾何", "座標", "ベクトル"];

export function GeometryThreeLensesLab() {
  return (
    <JsxBoard
      boundingBox={[-4, 3.4, 4.5, -3]}
      keepAspectRatio
      ariaLabel="図形を3つのレンズで見る"
      init={(board) => {
        const b = board;
        const lens = b.create("slider", [[-3.6, 3.0], [-1, 3.0], [0, 0, 2]], {
          name: "レンズ", snapWidth: 1, ...sliderStyle(NEON.violet),
        });
        const is = (m: number) => Math.round(lens.Value()) === m;

        // coordinate grid (lens 1)
        for (let g = -3; g <= 4; g++) {
          b.create("line", [[g, -3], [g, 3]], {
            strokeColor: NEON.faint, strokeWidth: 1, dash: 0,
            straightFirst: true, straightLast: true, visible: () => is(1),
          });
          b.create("line", [[-4, g], [4, g]], {
            strokeColor: NEON.faint, strokeWidth: 1,
            straightFirst: true, straightLast: true, visible: () => is(1),
          });
        }

        const pA = b.create("point", A, { name: "A", size: 3, fillColor: NEON.cyan, fixed: true,
          label: { cssStyle: "color:#111827;font-family:var(--font-mono,monospace);" } });
        const pB = b.create("point", B, { name: "B", size: 3, fillColor: NEON.cyan, fixed: true,
          label: { cssStyle: "color:#111827;font-family:var(--font-mono,monospace);" } });
        const pC = b.create("point", C, { name: "C", size: 3, fillColor: NEON.cyan, fixed: true,
          label: { cssStyle: "color:#111827;font-family:var(--font-mono,monospace);" } });

        b.create("polygon", [pA, pB, pC], {
          borders: { strokeColor: NEON.cyan, strokeWidth: 2.5 },
          fillColor: NEON.cyan, fillOpacity: 0.06, vertices: { visible: false },
        });

        // lens 0: median to BC + midpoint
        const M = b.create("midpoint", [pB, pC], { name: "M", size: 2, fillColor: NEON.lime, visible: () => is(0) });
        b.create("segment", [pA, M], { strokeColor: NEON.lime, strokeWidth: 1.5, dash: 1, visible: () => is(0) });

        // lens 2: position vectors from origin
        b.create("arrow", [[0, 0], pA], { strokeColor: NEON.magenta, strokeWidth: 2, visible: () => is(2) });
        b.create("arrow", [[0, 0], pB], { strokeColor: NEON.magenta, strokeWidth: 2, visible: () => is(2) });
        b.create("arrow", [[0, 0], pC], { strokeColor: NEON.magenta, strokeWidth: 2, visible: () => is(2) });
        b.create("point", [0, 0], { name: "O", size: 2, fillColor: NEON.muted, visible: () => is(2) || is(1) });

        b.create("text", [-3.9, -2.6, () => `レンズ: ${LENSES[Math.round(lens.Value())]}`], textStyle);
      }}
    />
  );
}
