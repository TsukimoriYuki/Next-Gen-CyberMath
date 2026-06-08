"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Linear programming on a feasible region. Constraints x,y ≥ 0,
 * x + 2y ≤ 8, 3x + 2y ≤ 12 carve out a quadrilateral with vertices
 * (0,0), (4,0), (2,3), (0,4). The slider sweeps the objective line
 * 2x + 3y = z; its last contact with the region is the optimum, the
 * vertex (2,3) where z = 13.
 */
const VERTS: [number, number][] = [
  [0, 0],
  [4, 0],
  [2, 3],
  [0, 4],
];

export function RegionLinearProgrammingLab() {
  return (
    <JsxBoard
      boundingBox={[-1.2, 6.2, 6.4, -1.2]}
      keepAspectRatio
      ariaLabel="領域と線形計画法：目的関数の最大化"
      init={(board) => {
        const b = board;

        const pts = VERTS.map(([x, y]) =>
          b.create("point", [x, y], { visible: false }),
        );
        // feasible region
        b.create("polygon", [pts[0], pts[1], pts[2], pts[3]], {
          borders: { strokeColor: NEON.cyan, strokeWidth: 1.5 },
          fillColor: NEON.cyan,
          fillOpacity: 0.14,
          vertices: { visible: false },
        });

        // constraint boundaries
        b.create("line", [[8, 0], [0, 4]], {
          strokeColor: NEON.muted, strokeWidth: 1, dash: 2,
          straightFirst: true, straightLast: true,
        });
        b.create("line", [[4, 0], [0, 6]], {
          strokeColor: NEON.muted, strokeWidth: 1, dash: 2,
          straightFirst: true, straightLast: true,
        });

        const z = b.create(
          "slider",
          [[0.4, 5.6], [3.2, 5.6], [0, 6, 18]],
          { name: "z", snapWidth: 0.1, ...sliderStyle(NEON.magenta) },
        );

        // objective line 2x + 3y = z : draw across the view
        b.create(
          "line",
          [
            [-1.2, () => (z.Value() - 2 * -1.2) / 3],
            [6.4, () => (z.Value() - 2 * 6.4) / 3],
          ],
          { strokeColor: NEON.magenta, strokeWidth: 2.5 },
        );

        // the optimum vertex
        b.create("point", [2, 3], {
          name: "最適 (2,3)",
          ...pointStyle(NEON.lime),
          fixed: true,
        });

        b.create("text", [-1.1, -0.7, () => {
          const v = z.Value();
          const tag = v > 13.05 ? "（領域の外：実行不可能）" : v > 12.6 ? "（最適 z*=13 に到達）" : "";
          return `目的関数 z = 2x + 3y = ${v.toFixed(1)} ${tag}`;
        }], textStyle);
      }}
    />
  );
}
