"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Squares modulo 3 never land on 2. The three residue slots 0,1,2 sit on a
 * small clock; slots 0 and 1 are reachable (green), slot 2 is forbidden
 * (red). Slide n and watch the marker for n² mod 3 hop only between 0 and 1.
 * This is the engine behind "a²+b²=c² forces a or b to be a multiple of 3".
 */
const pos = (j: number): [number, number] => {
  const a = (Math.PI / 2) - (j * 2 * Math.PI) / 3;
  return [1.4 * Math.cos(a), 1.4 * Math.sin(a)];
};

export function QuadraticResidueMod3Lab() {
  return (
    <JsxBoard
      boundingBox={[-2.2, 2.4, 2.2, -2.4]}
      keepAspectRatio
      ariaLabel="平方数を 3 で割った余り"
      init={(board) => {
        const b = board;
        b.create("circle", [[0, 0], 1.4], {
          strokeColor: NEON.muted, strokeWidth: 1, dash: 2, fillOpacity: 0,
        });

        // residue slots: 0,1 reachable (lime), 2 forbidden (magenta)
        for (let j = 0; j < 3; j++) {
          const reachable = j === 0 || j === 1;
          b.create("point", pos(j), {
            name: `${j}`,
            size: 6,
            fillColor: reachable ? NEON.lime : NEON.magenta,
            strokeColor: "#0b0f1a",
            fixed: true,
            label: { cssStyle: "color:#111827;font-family:var(--font-mono,monospace);" },
          });
        }

        const n = b.create("slider", [[-2.0, 2.1], [0.4, 2.1], [0, 4, 12]], {
          name: "n", snapWidth: 1, ...sliderStyle(NEON.violet),
        });
        const res = () => {
          const nn = Math.round(n.Value());
          return ((nn * nn) % 3 + 3) % 3;
        };
        b.create("point", [() => pos(res())[0], () => pos(res())[1]], {
          name: "n²", ...pointStyle(NEON.cyan),
        });

        b.create("text", [-2.1, -2.0, () => {
          const nn = Math.round(n.Value());
          return `n=${nn}, n²=${nn * nn}, n² mod 3 = ${res()}   （余り 2 には決して来ない）`;
        }], textStyle);
      }}
    />
  );
}
