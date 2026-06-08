"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Triangle with fixed sides CA = 4, CB = 3 and a draggable included angle C.
 * The opposite side c = AB obeys c² = 4² + 3² − 2·4·3·cos C. At C = 90° the
 * triangle is the 3-4-5 right triangle (c = 5).
 */
export function LawOfCosinesLab() {
  const rad = (d: number) => (d * Math.PI) / 180;
  const A: [number, number] = [4, 0];
  return (
    <JsxBoard
      boundingBox={[-3.8, 4, 5, -1.3]}
      keepAspectRatio
      ariaLabel="余弦定理 c²=a²+b²−2ab cosC"
      init={(board) => {
        const b = board;
        const gamma = b.create(
          "slider",
          [[-3.6, 3.7], [-0.6, 3.7], [10, 90, 170]],
          { name: "C°", snapWidth: 1, ...sliderStyle(NEON.cyan) },
        );

        const C: [number, number] = [0, 0];
        const Bx = () => 3 * Math.cos(rad(gamma.Value()));
        const By = () => 3 * Math.sin(rad(gamma.Value()));

        const pC = b.create("point", C, { name: "C", ...pointStyle(NEON.cyan), fixed: true });
        const pA = b.create("point", A, { name: "A", ...pointStyle(NEON.cyan), fixed: true });
        const pB = b.create("point", [Bx, By], { name: "B", ...pointStyle(NEON.magenta), fixed: true });

        b.create("segment", [pC, pA], curveStyle(NEON.cyan, 2)); // b = 4
        b.create("segment", [pC, pB], curveStyle(NEON.cyan, 2)); // a = 3
        b.create("segment", [pA, pB], curveStyle(NEON.magenta, 3)); // c

        b.create("text", [
          -3.7,
          -0.9,
          () => {
            const g = gamma.Value();
            const c2 = 25 - 24 * Math.cos(rad(g));
            return `c² = 25 − 24cos C = ${c2.toFixed(2)}   c = ${Math.sqrt(c2).toFixed(3)}`;
          },
        ], textStyle);
      }}
    />
  );
}
