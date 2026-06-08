"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * f(x) = x² − 2a·x + (a+2). When does f(x)=0 have two distinct positive
 * roots? Visualises the three governing conditions: D>0, axis a>0, f(0)>0.
 * Roots turn green exactly when all three hold (⇔ a>2).
 */
export function QuadRootPlacementLab() {
  const f = (x: number, a: number) => x * x - 2 * a * x + (a + 2);
  const disc = (a: number) => a * a - (a + 2); // D/4 = a² − a − 2
  return (
    <JsxBoard
      boundingBox={[-2.6, 8, 6.6, -4]}
      keepAspectRatio={false}
      ariaLabel="f(x)=x²−2ax+(a+2) の解の配置"
      init={(board) => {
        const b = board;

        const a = b.create(
          "slider",
          [[0.2, 7.2], [3.2, 7.2], [-3, 1, 5]],
          { name: "a", snapWidth: 0.05, ...sliderStyle(NEON.magenta) },
        );

        const allPositive = () => {
          const av = a.Value();
          return disc(av) > 0 && av > 0 && f(0, av) > 0;
        };

        // parabola
        b.create(
          "functiongraph",
          [(x: number) => f(x, a.Value()), -2.4, 6.4],
          curveStyle(NEON.cyan, 2.5),
        );

        // axis x = a
        b.create(
          "line",
          [[() => a.Value(), 0], [() => a.Value(), 1]],
          {
            strokeColor: NEON.violet,
            strokeWidth: 1.5,
            dash: 1,
            straightFirst: true,
            straightLast: true,
          },
        );

        // f(0) on the y-axis
        b.create("point", [0, () => f(0, a.Value())], {
          name: "f(0)",
          ...pointStyle(NEON.amber),
        });

        // the two roots (when real)
        for (const sign of [-1, 1]) {
          const root = () => {
            const av = a.Value();
            const d = disc(av);
            return d >= 0 ? av + sign * Math.sqrt(d) : NaN;
          };
          b.create("point", [root, 0], {
            name: "",
            size: 4,
            fillColor: () => (allPositive() ? NEON.lime : NEON.magenta),
            strokeColor: "#0b0f1a",
            strokeWidth: 1.5,
            visible: () => disc(a.Value()) >= 0,
            fixed: true,
          });
        }

        b.create("text", [
          -2.5,
          -2.6,
          () => {
            const av = a.Value();
            const ok = (cond: boolean) => (cond ? "○" : "×");
            const concl = allPositive() ? "→ 異なる2つの正の解" : "";
            return `D>0:${ok(disc(av) > 0)}  軸>0:${ok(av > 0)}  f(0)>0:${ok(
              f(0, av) > 0,
            )}  ${concl}`;
          },
        ], textStyle);
      }}
    />
  );
}
