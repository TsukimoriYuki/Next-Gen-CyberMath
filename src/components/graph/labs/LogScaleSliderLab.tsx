"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Three logarithmic rulers (base 2, e, 10) stacked. A slider sets a value x;
 * its marker on each ruler sits at logₐx. The three positions are always in a
 * fixed ratio — that ratio is exactly the change-of-base factor.
 */
const BASES = [
  { b: 2, y: 1.6, color: NEON.cyan, label: "底 2" },
  { b: Math.E, y: 0, color: NEON.lime, label: "底 e" },
  { b: 10, y: -1.6, color: NEON.amber, label: "底 10" },
];

export function LogScaleSliderLab() {
  const logb = (x: number, base: number) => Math.log(x) / Math.log(base);
  return (
    <JsxBoard
      boundingBox={[-1.5, 2.8, 5, -2.8]}
      keepAspectRatio={false}
      ariaLabel="底の異なる対数スケールの比較"
      init={(board) => {
        const b = board;
        const xS = b.create("slider", [[0.2, 2.5], [3.5, 2.5], [0.25, 8, 16]], {
          name: "x", snapWidth: 0.25, ...sliderStyle(NEON.magenta),
        });

        for (const { b: base, y, color, label } of BASES) {
          // ruler axis
          b.create("line", [[0, y], [1, y]], {
            strokeColor: color, strokeWidth: 1.5, straightFirst: false, straightLast: false,
          });
          // ticks at integer values of logₐ (i.e. x = base^k)
          for (let k = 0; k <= 4; k++) {
            b.create("point", [k, y], { name: "", size: 1.5, fillColor: color, strokeColor: color, fixed: true });
            b.create("text", [k, y - 0.35, `${Math.round(Math.pow(base, k))}`], {
              anchorX: "middle", fontSize: 10,
              cssStyle: "color:#9fb0d6;font-family:var(--font-mono,monospace);",
            });
          }
          b.create("text", [-1.4, y, label], { anchorX: "left", fontSize: 12,
            cssStyle: `color:${color};font-family:var(--font-mono,monospace);` });
          // marker at logₐ(x)
          b.create("point", [() => logb(xS.Value(), base), y], { name: "", ...pointStyle(color) });
        }

        b.create("text", [-1.45, -2.4, () => {
          const x = xS.Value();
          return `x=${x.toFixed(2)} :  log₂x=${logb(x, 2).toFixed(2)}, lnx=${logb(x, Math.E).toFixed(2)}, log₁₀x=${logb(x, 10).toFixed(2)}`;
        }], textStyle);
      }}
    />
  );
}
