"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, sliderStyle, textStyle } from "./theme";

/**
 * Area between a parabola and a line — the "1/6 formula".
 * f(x)=x² and g(x)=x+c meet at the roots α,β of x²−x−c=0. The enclosed
 * area equals ∫(g−f)dx = (1/6)(β−α)³, where β−α=√(1+4c). The slider c
 * shifts the line; the shaded area and the closed form stay in lock-step.
 */
const f = (x: number) => x * x;

export function AreaBetweenCurvesLab() {
  return (
    <JsxBoard
      boundingBox={[-2.4, 6.5, 3.2, -1.4]}
      keepAspectRatio={false}
      ariaLabel="2曲線間の面積と1/6公式"
      init={(board) => {
        const b = board;

        const c = b.create(
          "slider",
          [[-2.2, 5.9], [0.4, 5.9], [0, 2, 4]],
          { name: "c", snapWidth: 0.05, ...sliderStyle(NEON.violet) },
        );
        const g = (x: number) => x + c.Value();
        const alpha = () => (1 - Math.sqrt(1 + 4 * c.Value())) / 2;
        const beta = () => (1 + Math.sqrt(1 + 4 * c.Value())) / 2;

        // shaded region between the curves (updateDataArray pattern)
        const region = b.create("curve", [[0], [0]], {
          strokeWidth: 0,
          fillColor: NEON.amber,
          fillOpacity: 0.2,
        }) as unknown as {
          dataX: number[];
          dataY: number[];
          updateDataArray: () => void;
        };
        region.updateDataArray = function () {
          const a = alpha();
          const bb = beta();
          const N = 48;
          const xs: number[] = [];
          const ys: number[] = [];
          for (let i = 0; i <= N; i++) {
            const x = a + ((bb - a) * i) / N;
            xs.push(x);
            ys.push(f(x)); // bottom: parabola
          }
          for (let i = N; i >= 0; i--) {
            const x = a + ((bb - a) * i) / N;
            xs.push(x);
            ys.push(x + c.Value()); // top: line, back to α
          }
          this.dataX = xs;
          this.dataY = ys;
        };

        b.create("functiongraph", [f, -2.0, 2.9], curveStyle(NEON.cyan, 3));
        b.create(
          "functiongraph",
          [(x: number) => g(x), -2.2, 3.0],
          curveStyle(NEON.magenta, 2.5),
        );

        b.update();

        b.create("text", [-2.3, -0.8, () => {
          const d = beta() - alpha();
          const area = (d * d * d) / 6;
          return `面積 = ∫(g−f)dx = (1/6)(β−α)³ = ${area.toFixed(3)}   (β−α=${d.toFixed(3)})`;
        }], textStyle);
      }}
    />
  );
}
