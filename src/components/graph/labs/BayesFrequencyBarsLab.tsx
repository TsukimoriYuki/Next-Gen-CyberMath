"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, sliderStyle, textStyle } from "./theme";

/**
 * Why a 99%-accurate test can still be usually wrong. With test sensitivity
 * and specificity fixed at 99%, the bar shows the make-up of everyone who
 * tests positive: true positives (green) vs false positives (magenta). When
 * the disease is rare, false positives dominate, so P(disease | positive)
 * stays small. Slide the prevalence to watch the green share grow.
 */
const N = 10000;
const SENS = 0.99;
const SPEC = 0.99;

export function BayesFrequencyBarsLab() {
  return (
    <JsxBoard
      boundingBox={[-0.7, 2.8, 10.7, -1.6]}
      keepAspectRatio={false}
      ariaLabel="ベイズ：陽性者に占める真陽性の割合"
      init={(board) => {
        const b = board;
        const p = b.create("slider", [[0.4, 2.4], [6, 2.4], [0.0001, 0.01, 0.3]], {
          name: "有病率 p", snapWidth: 0.0001, ...sliderStyle(NEON.violet),
        });
        const tp = () => N * p.Value() * SENS;
        const fp = () => N * (1 - p.Value()) * (1 - SPEC);
        const post = () => tp() / (tp() + fp());

        const mkRect = (x0: () => number, x1: () => number, color: string) => {
          const c = b.create("curve", [[0], [0]], {
            strokeWidth: 0, fillColor: color, fillOpacity: 0.55,
          }) as unknown as { dataX: number[]; dataY: number[]; updateDataArray: () => void };
          c.updateDataArray = function () {
            const a = x0();
            const d = x1();
            this.dataX = [a, d, d, a, a];
            this.dataY = [0, 0, 1.4, 1.4, 0];
          };
        };
        mkRect(() => 0, () => 10 * post(), NEON.lime); // true positives
        mkRect(() => 10 * post(), () => 10, NEON.magenta); // false positives
        b.update();

        b.create("text", [-0.6, -0.8, () => {
          return `有病率 p=${(p.Value() * 100).toFixed(2)}% → P(病気|陽性)=${(post() * 100).toFixed(1)}%   （緑=真陽性 / マゼンタ=偽陽性、検査精度 99%）`;
        }], { ...textStyle, fontSize: 13 });
      }}
    />
  );
}
