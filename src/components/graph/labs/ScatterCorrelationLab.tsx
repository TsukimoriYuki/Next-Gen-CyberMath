"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Scatter plot of 8 points. A fixed "noise" pattern is added to a linear
 * trend whose slope a is controlled by the slider. As |a| grows the cloud
 * lines up and the correlation coefficient r → ±1; at a = 0, r ≈ 0.
 */
const XS = [1, 2, 3, 4, 5, 6, 7, 8];
const NOISE = [0.5, -0.8, 0.7, -0.3, 0.6, -0.7, 0.4, -0.4];

function corr(xs: number[], ys: number[]): number {
  const n = xs.length;
  const mx = xs.reduce((p, c) => p + c, 0) / n;
  const my = ys.reduce((p, c) => p + c, 0) / n;
  let sxy = 0,
    sxx = 0,
    syy = 0;
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
    syy += (ys[i] - my) ** 2;
  }
  return sxy / Math.sqrt(sxx * syy);
}

export function ScatterCorrelationLab() {
  const yAt = (i: number, a: number) => 4.5 + a * (XS[i] - 4.5) + NOISE[i];
  return (
    <JsxBoard
      boundingBox={[-0.8, 9.2, 9.2, -0.8]}
      keepAspectRatio={false}
      ariaLabel="散布図と相関係数 r"
      init={(board) => {
        const b = board;
        const a = b.create(
          "slider",
          [[0.5, 8.6], [4.0, 8.6], [-1, 0.6, 1]],
          { name: "傾き a", snapWidth: 0.05, ...sliderStyle(NEON.cyan) },
        );

        // trend line y = 4.5 + a(x − 4.5)
        b.create(
          "line",
          [
            [4.5, () => 4.5],
            [5.5, () => 4.5 + a.Value()],
          ],
          {
            strokeColor: NEON.faint,
            strokeWidth: 1.5,
            dash: 2,
            straightFirst: true,
            straightLast: true,
          },
        );

        for (let i = 0; i < XS.length; i++) {
          b.create("point", [XS[i], () => yAt(i, a.Value())], {
            name: "",
            ...pointStyle(NEON.magenta),
            fixed: true,
          });
        }

        b.create("text", [
          -0.7,
          -0.55,
          () => {
            const ys = XS.map((_, i) => yAt(i, a.Value()));
            return `相関係数 r = ${corr(XS, ys).toFixed(3)}`;
          },
        ], textStyle);
      }}
    />
  );
}
