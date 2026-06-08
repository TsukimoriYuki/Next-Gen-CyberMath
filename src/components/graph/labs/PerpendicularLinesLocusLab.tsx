"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Locus of the intersection of two moving perpendicular lines.
 * ℓ₁: mx−y=0 passes through O(0,0); ℓ₂: x+my−2=0 passes through Q(2,0); their
 * slopes m and −1/m are always perpendicular. By Thales' theorem the
 * intersection P sees the segment OQ at a right angle, so P lies on the circle
 * with diameter OQ: (x−1)²+y²=1 (origin excluded). Slide m to trace it.
 */
export function PerpendicularLinesLocusLab() {
  return (
    <JsxBoard
      boundingBox={[-1.6, 2.2, 3.6, -2.2]}
      keepAspectRatio
      ariaLabel="直交する2直線の交点の軌跡（タレスの円）"
      init={(board) => {
        const b = board;

        const O = b.create("point", [0, 0], { name: "O", ...pointStyle(NEON.muted), fixed: true });
        const Q = b.create("point", [2, 0], { name: "Q", ...pointStyle(NEON.muted), fixed: true });

        // the locus: circle with diameter OQ
        b.create("circle", [[1, 0], 1], {
          strokeColor: NEON.cyan, strokeWidth: 2, dash: 2, fillOpacity: 0,
        });

        const m = b.create("slider", [[-1.3, 1.9], [1.0, 1.9], [-4, 1, 4]], {
          name: "m", snapWidth: 0.1, ...sliderStyle(NEON.violet),
        });

        // ℓ₁ through O with slope m
        b.create("line", [O, [() => 1, () => m.Value()]], {
          strokeColor: NEON.lime, strokeWidth: 1.6,
        });
        // ℓ₂ through Q : x+my=2  (two points, no division by m)
        b.create(
          "line",
          [
            [() => 2 + 2 * m.Value(), -2],
            [() => 2 - 2 * m.Value(), 2],
          ],
          { strokeColor: NEON.amber, strokeWidth: 1.6, straightFirst: true, straightLast: true },
        );

        // intersection P = (2/(1+m²), 2m/(1+m²))
        const P = b.create(
          "point",
          [
            () => 2 / (1 + m.Value() * m.Value()),
            () => (2 * m.Value()) / (1 + m.Value() * m.Value()),
          ],
          { name: "P", ...pointStyle(NEON.magenta) },
        );

        b.create("segment", [O, P], { strokeColor: NEON.muted, strokeWidth: 1, dash: 1 });
        b.create("segment", [Q, P], { strokeColor: NEON.muted, strokeWidth: 1, dash: 1 });

        b.create("text", [-1.55, -1.8, () => {
          const mm = m.Value();
          const x = 2 / (1 + mm * mm);
          const y = (2 * mm) / (1 + mm * mm);
          return `P=(${x.toFixed(2)}, ${y.toFixed(2)})  OP⊥QP より P は直径 OQ の円上 (x−1)²+y²=1`;
        }], textStyle);
      }}
    />
  );
}
