"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Apollonius circle. For fixed A(−1,0), B(1,0) the points P with PA:PB=k a
 * fixed ratio form a circle (a line when k=1, the perpendicular bisector).
 * Drag the glider P around the locus and change k: PA/PB stays equal to k.
 * As k→1 the circle swells and its visible arc flattens toward the y-axis.
 */
const A: [number, number] = [-1, 0];
const B: [number, number] = [1, 0];

export function ApolloniusCircleLab() {
  return (
    <JsxBoard
      boundingBox={[-3.6, 2.7, 3.6, -2.7]}
      keepAspectRatio
      ariaLabel="距離の比が一定の点の軌跡（アポロニウスの円）"
      init={(board) => {
        const b = board;

        const pA = b.create("point", A, { name: "A", ...pointStyle(NEON.muted), fixed: true });
        const pB = b.create("point", B, { name: "B", ...pointStyle(NEON.muted), fixed: true });

        const k = b.create("slider", [[-3.3, 2.3], [-0.7, 2.3], [0.35, 0.5, 2.8]], {
          name: "k = PA:PB", snapWidth: 0.05, ...sliderStyle(NEON.violet),
        });

        const cx = () => {
          const kk = k.Value();
          return -(1 + kk * kk) / (1 - kk * kk);
        };
        const rad = () => {
          const c = cx();
          return Math.sqrt(Math.max(0, c * c - 1));
        };

        const center = b.create("point", [cx, 0], {
          name: "", size: 1, fillColor: NEON.faint, strokeColor: NEON.faint,
        });
        const circle = b.create("circle", [center, () => rad()], {
          strokeColor: NEON.cyan, strokeWidth: 2.5, fillOpacity: 0,
        });

        // draggable point riding the locus
        const P = b.create("glider", [-2, 1, circle], { name: "P", ...pointStyle(NEON.magenta) });
        b.create("segment", [pA, P], { strokeColor: NEON.muted, strokeWidth: 1, dash: 2 });
        b.create("segment", [pB, P], { strokeColor: NEON.muted, strokeWidth: 1, dash: 2 });

        b.create("text", [-3.5, -2.2, () => {
          const pa = Math.hypot(P.X() - A[0], P.Y() - A[1]);
          const pb = Math.hypot(P.X() - B[0], P.Y() - B[1]);
          return `PA=${pa.toFixed(2)}, PB=${pb.toFixed(2)} → PA/PB=${(pa / pb).toFixed(2)} （= k=${k.Value().toFixed(2)}）`;
        }], textStyle);
      }}
    />
  );
}
