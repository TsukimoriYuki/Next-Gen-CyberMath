"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Fixed sides CA = 4, CB = 3; the included angle C varies.
 * Area S = ½·4·3·sin C = 6 sin C is maximised (= 6) exactly at C = 90°.
 */
export function TriangleAreaLab() {
  const rad = (d: number) => (d * Math.PI) / 180;
  const A: [number, number] = [4, 0];
  return (
    <JsxBoard
      boundingBox={[-3.8, 4, 5, -1.3]}
      keepAspectRatio
      ariaLabel="三角形の面積 S = ½ab sinC"
      init={(board) => {
        const b = board;
        const gamma = b.create(
          "slider",
          [[-3.6, 3.7], [-0.6, 3.7], [5, 60, 175]],
          { name: "C°", snapWidth: 1, ...sliderStyle(NEON.cyan) },
        );

        const C: [number, number] = [0, 0];
        const Bx = () => 3 * Math.cos(rad(gamma.Value()));
        const By = () => 3 * Math.sin(rad(gamma.Value()));

        const pC = b.create("point", C, { name: "C", ...pointStyle(NEON.cyan), fixed: true });
        const pA = b.create("point", A, { name: "A", ...pointStyle(NEON.cyan), fixed: true });
        const pB = b.create("point", [Bx, By], { name: "B", ...pointStyle(NEON.magenta), fixed: true });

        b.create("polygon", [pC, pA, pB], {
          borders: { strokeColor: NEON.cyan, strokeWidth: 2 },
          fillColor: NEON.magenta,
          fillOpacity: 0.18,
          vertices: { visible: false },
        });

        b.create("text", [
          -3.7,
          -0.9,
          () => {
            const g = gamma.Value();
            const S = 6 * Math.sin(rad(g));
            const tag = Math.abs(g - 90) < 0.6 ? "  ← 最大" : "";
            return `S = 6 sin C = ${S.toFixed(3)}${tag}`;
          },
        ], textStyle);
      }}
    />
  );
}
