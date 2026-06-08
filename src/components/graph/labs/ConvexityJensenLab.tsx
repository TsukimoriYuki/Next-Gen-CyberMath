"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Convexity & Jensen. For the convex f(x)=x², the chord AB lies above the
 * graph and every tangent lies below it. The slider λ picks the weighted
 * point: the curve value f(λa+(1−λ)b) never exceeds the chord value
 * λf(a)+(1−λ)f(b) — that gap is exactly Jensen's inequality (and AM–GM).
 */
const A_X = -2;
const B_X = 2.4;
const f = (x: number) => x * x;

export function ConvexityJensenLab() {
  return (
    <JsxBoard
      boundingBox={[-3.3, 8, 3.3, -1.6]}
      keepAspectRatio={false}
      ariaLabel="凸関数とイェンゼンの不等式"
      init={(board) => {
        const b = board;

        b.create("functiongraph", [f, -2.7, 2.9], curveStyle(NEON.cyan, 3));

        const A = b.create("point", [A_X, f(A_X)], {
          name: "A",
          ...pointStyle(NEON.muted),
          fixed: true,
        });
        const B = b.create("point", [B_X, f(B_X)], {
          name: "B",
          ...pointStyle(NEON.muted),
          fixed: true,
        });
        // chord (lies above the convex graph)
        b.create("segment", [A, B], { strokeColor: NEON.magenta, strokeWidth: 2 });

        const s = b.create(
          "slider",
          [[-3, 7.2], [-0.4, 7.2], [0, 0.5, 1]],
          { name: "λ", snapWidth: 0.01, ...sliderStyle(NEON.violet) },
        );

        const xL = () => {
          const l = s.Value();
          return l * A_X + (1 - l) * B_X;
        };
        const yChord = () => {
          const l = s.Value();
          return l * f(A_X) + (1 - l) * f(B_X);
        };

        const Pc = b.create("point", [xL, yChord], {
          name: "",
          ...pointStyle(NEON.magenta),
        });
        const Pf = b.create("point", [xL, () => f(xL())], {
          name: "",
          ...pointStyle(NEON.lime),
        });
        // vertical gap = Jensen gap ≥ 0
        b.create("segment", [Pc, Pf], {
          strokeColor: NEON.muted,
          dash: 2,
          strokeWidth: 1,
        });

        // tangent at the curve point (slope 2x) — always below the chord
        b.create(
          "line",
          [
            [() => xL(), () => f(xL())],
            [() => xL() + 1, () => f(xL()) + 2 * xL()],
          ],
          {
            strokeColor: NEON.lime,
            strokeWidth: 1.5,
            dash: 1,
            straightFirst: true,
            straightLast: true,
          },
        );

        b.create("text", [-3.2, -1.0, () => {
          const l = s.Value();
          const lo = f(xL());
          const hi = l * f(A_X) + (1 - l) * f(B_X);
          return `f(λa+(1−λ)b)=${lo.toFixed(2)} ≤ ${hi.toFixed(2)}=λf(a)+(1−λ)f(b)`;
        }], textStyle);
      }}
    />
  );
}
