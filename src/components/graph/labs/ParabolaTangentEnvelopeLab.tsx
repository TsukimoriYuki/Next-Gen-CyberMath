"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * Envelope / passing region of the tangent family of y=x². Each line
 * y=2tx−t² touches the parabola at (t,t²); as t runs over ℝ the lines sweep
 * out exactly the region y ≤ x² (their envelope is the parabola). The faint
 * lines show the family; the slider highlights one; the shaded band is the
 * passing region.
 */
const sq = (x: number) => x * x;

export function ParabolaTangentEnvelopeLab() {
  return (
    <JsxBoard
      boundingBox={[-3.4, 6.2, 3.4, -3.2]}
      keepAspectRatio={false}
      ariaLabel="放物線の接線族と通過領域"
      init={(board) => {
        const b = board;

        // passing region y ≤ x² : below the parabola, inside the view
        const xs: number[] = [];
        const ys: number[] = [];
        const N = 60;
        for (let i = 0; i <= N; i++) {
          const x = -3.3 + (6.6 * i) / N;
          xs.push(x);
          ys.push(sq(x));
        }
        xs.push(3.3, -3.3);
        ys.push(-3.1, -3.1);
        b.create("curve", [xs, ys], {
          strokeWidth: 0, fillColor: NEON.amber, fillOpacity: 0.16,
        });

        // the tangent family (faint static lines)
        for (let i = -5; i <= 5; i++) {
          const t = i * 0.55;
          b.create("line", [[-3.4, 2 * t * -3.4 - t * t], [3.4, 2 * t * 3.4 - t * t]], {
            strokeColor: NEON.faint, strokeWidth: 1,
            straightFirst: true, straightLast: true,
          });
        }

        b.create("functiongraph", [sq, -2.6, 2.6], curveStyle(NEON.cyan, 3));

        const t = b.create("slider", [[-3.1, 5.6], [-0.6, 5.6], [-2.5, 1, 2.5]], {
          name: "t", snapWidth: 0.05, ...sliderStyle(NEON.violet),
        });

        // highlighted tangent + tangency point
        b.create(
          "line",
          [
            [-3.4, () => 2 * t.Value() * -3.4 - t.Value() * t.Value()],
            [3.4, () => 2 * t.Value() * 3.4 - t.Value() * t.Value()],
          ],
          { strokeColor: NEON.magenta, strokeWidth: 2.5, straightFirst: true, straightLast: true },
        );
        b.create("point", [() => t.Value(), () => sq(t.Value())], {
          name: "", size: 4, fillColor: NEON.magenta, strokeColor: "#0b0f1a",
        });

        b.create("text", [-3.3, -2.6, () => {
          const tv = t.Value();
          return `接線 y=2tx−t² （t=${tv.toFixed(2)}, 接点 (${tv.toFixed(2)}, ${sq(tv).toFixed(2)})）  通過領域は y ≤ x²`;
        }], { ...textStyle, fontSize: 13 });
      }}
    />
  );
}
