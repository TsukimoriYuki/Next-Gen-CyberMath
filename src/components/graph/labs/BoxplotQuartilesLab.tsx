"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Nine fixed data points plus one slider-controlled outlier. The box plot
 * (min, Q1, median, Q3, max) and the mean/median readout update live: as the
 * outlier slides out, the mean chases it while the median barely moves —
 * the visual meaning of "the median is robust to outliers".
 */
const BASE = [3, 4, 5, 6, 7, 8, 9, 10, 11];

function stats(arr: number[]) {
  const s = [...arr].sort((a, b) => a - b);
  const n = s.length;
  const median = (a: number[]) => {
    const m = a.length;
    return m % 2 ? a[(m - 1) / 2] : (a[m / 2 - 1] + a[m / 2]) / 2;
  };
  const lower = n % 2 ? s.slice(0, (n - 1) / 2) : s.slice(0, n / 2);
  const upper = n % 2 ? s.slice((n + 1) / 2) : s.slice(n / 2);
  return {
    min: s[0],
    q1: median(lower),
    med: median(s),
    q3: median(upper),
    max: s[n - 1],
    mean: arr.reduce((p, c) => p + c, 0) / n,
  };
}

export function BoxplotQuartilesLab() {
  return (
    <JsxBoard
      boundingBox={[-1, 3, 31, -2.2]}
      keepAspectRatio={false}
      ariaLabel="箱ひげ図と外れ値・中央値"
      init={(board) => {
        const b = board;
        const out = b.create(
          "slider",
          [[2, 2.6], [14, 2.6], [3, 12, 30]],
          { name: "外れ値", snapWidth: 1, ...sliderStyle(NEON.magenta) },
        );

        const data = () => [...BASE, out.Value()];
        const S = () => stats(data());

        // data points on the number line (y = 0)
        for (let i = 0; i < BASE.length; i++) {
          b.create("point", [BASE[i], 0], {
            name: "",
            size: 3,
            fillColor: NEON.cyan,
            strokeColor: "#0b0f1a",
            strokeWidth: 1,
            fixed: true,
          });
        }
        b.create("point", [() => out.Value(), 0], {
          name: "",
          ...pointStyle(NEON.magenta),
          fixed: true,
        });

        // box (Q1..Q3) at y in [0.7, 1.5]
        b.create(
          "polygon",
          [
            [() => S().q1, 0.7],
            [() => S().q3, 0.7],
            [() => S().q3, 1.5],
            [() => S().q1, 1.5],
          ],
          {
            borders: { strokeColor: NEON.cyan, strokeWidth: 2 },
            fillColor: NEON.cyan,
            fillOpacity: 0.12,
            vertices: { visible: false },
          },
        );
        // median line
        b.create("segment", [[() => S().med, 0.7], [() => S().med, 1.5]], {
          strokeColor: NEON.lime,
          strokeWidth: 2.5,
        });
        // whiskers
        b.create("segment", [[() => S().min, 1.1], [() => S().q1, 1.1]], {
          strokeColor: NEON.muted,
          strokeWidth: 1.5,
        });
        b.create("segment", [[() => S().q3, 1.1], [() => S().max, 1.1]], {
          strokeColor: NEON.muted,
          strokeWidth: 1.5,
        });

        // mean marker (▼) on the number line
        b.create("point", [() => S().mean, -0.5], {
          name: "平均",
          size: 4,
          face: "^",
          fillColor: NEON.amber,
          strokeColor: NEON.amber,
        });

        b.create("text", [
          -0.9,
          -1.7,
          () => {
            const s = S();
            return `平均 = ${s.mean.toFixed(2)}   中央値 = ${s.med.toFixed(1)}`;
          },
        ], textStyle);
      }}
    />
  );
}
