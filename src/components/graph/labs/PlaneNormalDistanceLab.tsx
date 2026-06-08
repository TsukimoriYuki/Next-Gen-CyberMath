"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, textStyle } from "./theme";

/**
 * Point-to-plane distance, shown edge-on in 2-D. The line 3x+4y−12=0 stands in
 * for a plane seen from the side; its normal is n=(3,4). Drag P; the foot H is
 * the projection of P onto the line along n, and the distance is the length of
 * the normal step: |3x₀+4y₀−12| / |n| = |…|/5.
 */
const f = (x: number, y: number) => 3 * x + 4 * y - 12;

export function PlaneNormalDistanceLab() {
  return (
    <JsxBoard
      boundingBox={[-2.5, 7.5, 9, -2.5]}
      keepAspectRatio
      ariaLabel="点と平面の距離（法線方向への射影）"
      init={(board) => {
        const b = board;

        // 平面（断面）3x+4y-12=0 と法線
        b.create("line", [[4, 0], [0, 3]], {
          strokeColor: NEON.cyan, strokeWidth: 2.5,
          straightFirst: true, straightLast: true,
        });
        const base = b.create("point", [2, 1.5], { visible: false });
        b.create("arrow", [base, [() => base.X() + 1.2, () => base.Y() + 1.6]], {
          strokeColor: NEON.violet, strokeWidth: 2,
        });

        const P = b.create("point", [6, 5], { name: "P", ...pointStyle(NEON.magenta) });
        const t = () => f(P.X(), P.Y()) / 25;
        const H = b.create("point", [() => P.X() - t() * 3, () => P.Y() - t() * 4], {
          name: "H", ...pointStyle(NEON.lime),
        });
        b.create("segment", [P, H], { strokeColor: NEON.muted, dash: 2, strokeWidth: 1.5 });

        b.create("text", [-2.4, -1.8, () => {
          const d = Math.abs(f(P.X(), P.Y())) / 5;
          return `距離 = |3x₀+4y₀−12| / |n| = ${Math.abs(f(P.X(), P.Y())).toFixed(1)} / 5 = ${d.toFixed(2)}`;
        }], textStyle);
      }}
    />
  );
}
