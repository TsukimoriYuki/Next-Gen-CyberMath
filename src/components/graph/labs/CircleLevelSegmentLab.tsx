"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Geometric meaning of minimizing x²+y² on the segment x+2y=4 (x,y≥0).
 * x²+y² is the squared distance from O to a point P on the segment. The
 * minimum is at the foot of the perpendicular F=(4/5,8/5) (value 16/5); the
 * maximum is at the farther endpoint (4,0) (value 16). The faint circle is the
 * level curve x²+y²=|OP|² for the current P.
 */
const END_A: [number, number] = [4, 0];
const END_B: [number, number] = [0, 2];

export function CircleLevelSegmentLab() {
  return (
    <JsxBoard
      boundingBox={[-4.6, 5, 5, -4.6]}
      keepAspectRatio
      ariaLabel="線分上で x²+y² を最大最小にする"
      init={(board) => {
        const b = board;
        const O = b.create("point", [0, 0], { name: "O", ...pointStyle(NEON.muted), fixed: true });

        b.create("segment", [END_A, END_B], { strokeColor: NEON.cyan, strokeWidth: 3 });
        b.create("point", END_A, { name: "(4,0)", ...pointStyle(NEON.amber), fixed: true });
        b.create("point", END_B, { name: "(0,2)", ...pointStyle(NEON.amber), fixed: true });
        // foot of perpendicular = minimum
        b.create("point", [0.8, 1.6], { name: "F 最小", ...pointStyle(NEON.lime), fixed: true });

        const t = b.create("slider", [[-4.3, 4.5], [-1.2, 4.5], [0, 1.6, 2]], {
          name: "y", snapWidth: 0.02, ...sliderStyle(NEON.violet),
        });
        const px = () => 4 - 2 * t.Value();
        const py = () => t.Value();
        const P = b.create("point", [px, py], { name: "P", ...pointStyle(NEON.magenta) });
        b.create("segment", [O, P], { strokeColor: NEON.muted, strokeWidth: 1, dash: 2 });
        // level curve x²+y² = |OP|²
        b.create("circle", [O, () => Math.hypot(px(), py())], {
          strokeColor: NEON.faint, strokeWidth: 1, dash: 1, fillOpacity: 0,
        });

        b.create("text", [-4.5, -4.0, () => {
          const v = px() * px() + py() * py();
          return `x²+y² = |OP|² = ${v.toFixed(2)}   （最小 16/5=3.2 は垂線の足、最大 16 は (4,0)）`;
        }], textStyle);
      }}
    />
  );
}
