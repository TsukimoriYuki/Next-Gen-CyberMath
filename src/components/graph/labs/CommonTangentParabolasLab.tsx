"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * Common tangents of C₁:y=x² and C₂:y=−(x−2)²+a. A line tangent to C₁ at
 * (t,t²) is y=2tx−t²; forcing it to touch C₂ gives 2t²−4t+a=0, whose
 * discriminant 16−8a controls the count: a<2 → 2 lines, a=2 → 1, a>2 → 0.
 * Drag a to slide C₂ vertically and watch the green common tangents appear.
 */
const c1 = (x: number) => x * x;

export function CommonTangentParabolasLab() {
  return (
    <JsxBoard
      boundingBox={[-3.2, 8, 6, -4.3]}
      keepAspectRatio={false}
      ariaLabel="2放物線の共通接線の本数"
      init={(board) => {
        const b = board;

        const a = b.create("slider", [[-2.8, 7.2], [0.2, 7.2], [-1, 1, 5]], {
          name: "a", snapWidth: 0.05, ...sliderStyle(NEON.violet),
        });

        b.create("functiongraph", [c1, -2.6, 2.9], curveStyle(NEON.cyan, 3));
        b.create(
          "functiongraph",
          [(x: number) => -(x - 2) * (x - 2) + a.Value(), -0.8, 4.8],
          curveStyle(NEON.magenta, 3),
        );

        const tRoot = (sign: number) => {
          const D = 16 - 8 * a.Value();
          return D >= 0 ? 1 + (sign * Math.sqrt(D)) / 4 : NaN;
        };
        const mkLine = (sign: number) => {
          const tf = () => tRoot(sign);
          b.create(
            "line",
            [
              [-3, () => 2 * tf() * -3 - tf() * tf()],
              [6, () => 2 * tf() * 6 - tf() * tf()],
            ],
            {
              strokeColor: NEON.lime, strokeWidth: 2,
              straightFirst: true, straightLast: true,
              visible: () => Number.isFinite(tf()),
            },
          );
        };
        mkLine(1);
        mkLine(-1);

        b.create("text", [-3.1, -3.5, () => {
          const D = 16 - 8 * a.Value();
          const n = D > 0 ? 2 : D === 0 ? 1 : 0;
          return `a=${a.Value().toFixed(2)} → 共通接線 ${n} 本   （判別式 16−8a の符号で決まる）`;
        }], textStyle);
      }}
    />
  );
}
