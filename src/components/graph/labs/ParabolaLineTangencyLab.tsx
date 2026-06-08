"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Tangency of a parabola and a line. y=x²+ax+1 vs y=2x−3. Eliminating y gives
 * x²+(a−2)x+4=0 with discriminant D=(a−2)²−16. Slide a: D>0 → two crossings,
 * D=0 → tangent (a=6 or a=−2), D<0 → no real intersection.
 */
export function ParabolaLineTangencyLab() {
  return (
    <JsxBoard
      boundingBox={[-6.2, 10, 6.2, -6.2]}
      keepAspectRatio={false}
      ariaLabel="放物線と直線が接する条件"
      init={(board) => {
        const b = board;

        const a = b.create("slider", [[-5.6, 9], [0, 9], [-3, 0, 7]], {
          name: "a", snapWidth: 0.05, ...sliderStyle(NEON.violet),
        });

        b.create(
          "functiongraph",
          [(x: number) => x * x + a.Value() * x + 1, -6, 6],
          curveStyle(NEON.cyan, 3),
        );
        b.create("line", [[-6, -15], [6, 9]], {
          strokeColor: NEON.magenta, strokeWidth: 2.5,
          straightFirst: true, straightLast: true,
        });

        // intersection points when D >= 0
        const root = (sign: number) => {
          const D = (a.Value() - 2) ** 2 - 16;
          return D >= 0 ? (-(a.Value() - 2) + sign * Math.sqrt(D)) / 2 : NaN;
        };
        for (const s of [1, -1]) {
          b.create("point", [() => root(s), () => 2 * root(s) - 3], {
            name: "", ...pointStyle(NEON.lime),
            visible: () => Number.isFinite(root(s)),
          });
        }

        b.create("text", [-6.1, -5.2, () => {
          const D = (a.Value() - 2) ** 2 - 16;
          const tag = Math.abs(D) < 0.05 ? "接する (D=0)" : D > 0 ? "2 交点 (D>0)" : "共有点なし (D<0)";
          return `D=(a−2)²−16 = ${D.toFixed(2)} → ${tag}   （接するのは a=6, a=−2）`;
        }], textStyle);
      }}
    />
  );
}
