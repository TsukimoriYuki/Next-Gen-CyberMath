"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Original data u = {3,4,5,6,7} (mean 5, variance 2). The transform
 * y = a·u + b is applied live via sliders. The points shift by b and scale
 * by a about the mean, so mean → a·5 + b and variance → a²·2 (SD → √2·|a|).
 * Deviation segments from each point to the mean make the a²-scaling visible.
 */
const U = [3, 4, 5, 6, 7];
const MEAN_U = 5;
const VAR_U = 2;

export function DeviationVarianceLab() {
  const y = (u: number, a: number, b: number) => a * u + b;
  return (
    <JsxBoard
      boundingBox={[-3, 1.8, 19, -1.8]}
      keepAspectRatio={false}
      ariaLabel="変量の変換 y = ax + b と平均・分散"
      init={(board) => {
        const b0 = board;
        const a = b0.create(
          "slider",
          [[1, 1.4], [8, 1.4], [0.3, 1, 2.2]],
          { name: "a", snapWidth: 0.05, ...sliderStyle(NEON.cyan) },
        );
        const bb = b0.create(
          "slider",
          [[1, 1.0], [8, 1.0], [-2, 0, 6]],
          { name: "b", snapWidth: 0.5, ...sliderStyle(NEON.violet) },
        );

        const meanY = () => a.Value() * MEAN_U + bb.Value();

        // mean line
        b0.create("line", [[() => meanY(), 0], [() => meanY(), 1]], {
          strokeColor: NEON.amber,
          strokeWidth: 1.5,
          dash: 1,
          straightFirst: true,
          straightLast: true,
        });

        // points + deviation connectors (staggered y for visibility)
        for (let i = 0; i < U.length; i++) {
          const yi = () => y(U[i], a.Value(), bb.Value());
          const yLevel = (i - 2) * 0.18;
          b0.create("segment", [[yi, yLevel], [() => meanY(), yLevel]], {
            strokeColor: NEON.magenta,
            strokeWidth: 1.5,
            strokeOpacity: 0.6,
          });
          b0.create("point", [yi, yLevel], {
            name: "",
            ...pointStyle(NEON.magenta),
            fixed: true,
          });
        }

        b0.create("text", [
          -2.9,
          -1.3,
          () => {
            const av = a.Value();
            return `平均 = ${meanY().toFixed(2)}   分散 = ${(av * av * VAR_U).toFixed(
              2,
            )}   標準偏差 = ${(Math.abs(av) * Math.sqrt(VAR_U)).toFixed(3)}`;
          },
        ], textStyle);
      }}
    />
  );
}
