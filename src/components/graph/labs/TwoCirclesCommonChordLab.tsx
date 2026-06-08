"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Common chord of two circles. Radii R₁=4 (at O) and R₂=3 (at O' on the
 * x-axis); the slider sets the centre distance d. The chord is vertical, on
 * the radical axis x=(d²+R₁²−R₂²)/(2d), with half-length √(R₁²−x²). It exists
 * only while |R₁−R₂| < d < R₁+R₂.
 */
const R1 = 4;
const R2 = 3;

export function TwoCirclesCommonChordLab() {
  return (
    <JsxBoard
      boundingBox={[-5.4, 5.8, 9.4, -5.8]}
      keepAspectRatio
      ariaLabel="2 円の共通弦"
      init={(board) => {
        const b = board;
        const O = b.create("point", [0, 0], { name: "O", ...pointStyle(NEON.muted), fixed: true });

        const d = b.create("slider", [[-5, 5.2], [-1, 5.2], [1.2, 5, 7]], {
          name: "中心間 d", snapWidth: 0.05, ...sliderStyle(NEON.violet),
        });
        const Op = b.create("point", [() => d.Value(), 0], { name: "O'", ...pointStyle(NEON.muted) });

        b.create("circle", [O, R1], { strokeColor: NEON.cyan, strokeWidth: 2, fillOpacity: 0 });
        b.create("circle", [Op, R2], { strokeColor: NEON.magenta, strokeWidth: 2, fillOpacity: 0 });

        const xr = () => {
          const dd = d.Value();
          return (dd * dd + R1 * R1 - R2 * R2) / (2 * dd);
        };
        const half = () => {
          const v = R1 * R1 - xr() * xr();
          return v > 0 ? Math.sqrt(v) : NaN;
        };
        b.create(
          "segment",
          [
            [() => xr(), () => half()],
            [() => xr(), () => -half()],
          ],
          { strokeColor: NEON.lime, strokeWidth: 3, visible: () => Number.isFinite(half()) },
        );

        b.create("text", [-5.3, -5.0, () => {
          const h = half();
          if (!Number.isFinite(h)) return `d=${d.Value().toFixed(2)} → 2 円は交わらない（|R₁−R₂|<d<R₁+R₂ で交わる）`;
          return `d=${d.Value().toFixed(2)} → 共通弦の長さ = ${(2 * h).toFixed(2)}   （d=5 で 24/5=4.8）`;
        }], textStyle);
      }}
    />
  );
}
