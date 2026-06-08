"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * Right-endpoint Riemann sum for ∫₀¹ x² dx = 1/3. Slider n raises the
 * number of rectangles; watch the staircase total close in on 1/3.
 * A fixed pool of rectangles is shown/hidden by a `visible` function so
 * any n works without recreating elements.
 */
const MAX = 40;

export function RiemannSumLab() {
  return (
    <JsxBoard
      boundingBox={[-0.22, 1.22, 1.22, -0.22]}
      keepAspectRatio={false}
      ariaLabel="区分求積法：∫₀¹ x² dx のリーマン和"
      init={(board) => {
        const b = board;
        const f = (x: number) => x * x;

        const n = b.create(
          "slider",
          [[0.05, 1.12], [0.75, 1.12], [1, 6, MAX]],
          { name: "n", snapWidth: 1, ...sliderStyle(NEON.cyan) },
        );

        // Rectangle pool (right-endpoint heights).
        for (let i = 0; i < MAX; i++) {
          const x0 = () => i / Math.round(n.Value());
          const x1 = () => (i + 1) / Math.round(n.Value());
          const h = () => f(x1());
          b.create(
            "polygon",
            [
              [x0, 0],
              [x1, 0],
              [x1, h],
              [x0, h],
            ],
            {
              borders: { strokeColor: NEON.magenta, strokeWidth: 1 },
              fillColor: NEON.magenta,
              fillOpacity: 0.16,
              vertices: { visible: false },
              visible: () => i < Math.round(n.Value()),
              fixed: true,
            },
          );
        }

        // The exact curve on top.
        b.create("functiongraph", [f, 0, 1], curveStyle(NEON.cyan, 3));

        b.create("text", [
          -0.2,
          -0.16,
          () => {
            const N = Math.round(n.Value());
            let sum = 0;
            for (let i = 1; i <= N; i++) sum += f(i / N) * (1 / N);
            return `Σ ≈ ${sum.toFixed(4)}   →   ∫₀¹x²dx = 0.3333…`;
          },
        ], textStyle);
      }}
    />
  );
}
