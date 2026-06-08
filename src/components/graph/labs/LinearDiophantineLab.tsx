"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * Integer solutions of 2x + 4y = c. The line is drawn over a lattice; points
 * with integer coordinates that lie on it light up. Since gcd(2,4)=2, a
 * solution exists only when c is even — slide c to an odd value and the line
 * passes between the lattice points (no solutions).
 */
const A = 2;
const Bc = 4;
const RANGE = 6;

export function LinearDiophantineLab() {
  return (
    <JsxBoard
      boundingBox={[-7, 7, 7, -7]}
      keepAspectRatio
      ariaLabel="一次不定方程式 2x+4y=c の格子点"
      init={(board) => {
        const b = board;
        const C = b.create("slider", [[-6, 6.4], [2, 6.4], [-8, 8, 8]], {
          name: "c", snapWidth: 1, ...sliderStyle(NEON.amber),
        });

        // the line 2x + 4y = c  →  y = (c − 2x)/4
        b.create("functiongraph", [(x: number) => (C.Value() - A * x) / Bc, -7, 7], curveStyle(NEON.cyan, 2));

        // lattice points; light up the ones on the line
        for (let i = -RANGE; i <= RANGE; i++) {
          for (let j = -RANGE; j <= RANGE; j++) {
            const onLine = () => A * i + Bc * j === Math.round(C.Value());
            b.create("point", [i, j], {
              name: "",
              size: () => (onLine() ? 4 : 2),
              fillColor: () => (onLine() ? NEON.lime : NEON.muted),
              strokeColor: () => (onLine() ? "#0b0f1a" : NEON.muted),
              strokeWidth: 1,
              fixed: true,
            });
          }
        }

        b.create("text", [-6.9, -6.5, () => {
          const c = Math.round(C.Value());
          const ok = c % 2 === 0;
          return `2x + 4y = ${c}   gcd(2,4)=2  →  ${ok ? "解あり（緑の格子点）" : "解なし（c が奇数）"}`;
        }], textStyle);
      }}
    />
  );
}
