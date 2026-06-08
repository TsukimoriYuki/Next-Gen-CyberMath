"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Reduction formulas as symmetries of the unit circle. Slider θ moves P;
 * the mode selector maps P to its image under a rotation/reflection, and the
 * legs (cos, sin) show how the signs swap.
 *  0: π−θ (y軸対称)  1: −θ (x軸対称)  2: π+θ (原点対称)  3: π/2−θ (y=x 対称)
 */
const MODES = ["π−θ", "−θ", "π+θ", "π/2−θ"];

export function TrigUnitCircleTransformLab() {
  const rad = (d: number) => (d * Math.PI) / 180;
  const image = (c: number, s: number, m: number): [number, number] => {
    if (m === 0) return [-c, s];   // π−θ
    if (m === 1) return [c, -s];   // −θ
    if (m === 2) return [-c, -s];  // π+θ
    return [s, c];                 // π/2−θ
  };
  return (
    <JsxBoard
      boundingBox={[-1.7, 1.9, 1.7, -1.7]}
      keepAspectRatio
      ariaLabel="還元公式と単位円の対称性"
      init={(board) => {
        const b = board;
        b.create("circle", [[0, 0], 1], { strokeColor: NEON.muted, strokeWidth: 1.5, fillOpacity: 0, dash: 2 });

        const th = b.create("slider", [[-1.6, 1.75], [-0.1, 1.75], [10, 50, 80]], {
          name: "θ°", snapWidth: 1, ...sliderStyle(NEON.cyan),
        });
        const mode = b.create("slider", [[0.2, 1.75], [1.55, 1.75], [0, 0, 3]], {
          name: "変換", snapWidth: 1, ...sliderStyle(NEON.violet),
        });

        const C = () => Math.cos(rad(th.Value()));
        const S = () => Math.sin(rad(th.Value()));

        // original P
        const P = b.create("point", [C, S], { name: "P", ...pointStyle(NEON.cyan), fixed: true });
        b.create("segment", [[0, 0], P], curveStyle(NEON.cyan, 2));
        // legs cos, sin
        b.create("segment", [[0, 0], [C, 0]], { strokeColor: NEON.cyan, strokeWidth: 1, dash: 1 });
        b.create("segment", [[C, 0], P], { strokeColor: NEON.cyan, strokeWidth: 1, dash: 1 });

        // image Q
        const Qx = () => image(C(), S(), Math.round(mode.Value()))[0];
        const Qy = () => image(C(), S(), Math.round(mode.Value()))[1];
        const Q = b.create("point", [Qx, Qy], { name: "Q", ...pointStyle(NEON.magenta), fixed: true });
        b.create("segment", [[0, 0], Q], curveStyle(NEON.magenta, 2));
        b.create("segment", [[0, 0], [Qx, () => 0]], { strokeColor: NEON.magenta, strokeWidth: 1, dash: 1 });
        b.create("segment", [[Qx, () => 0], Q], { strokeColor: NEON.magenta, strokeWidth: 1, dash: 1 });

        b.create("text", [-1.65, -1.4, () => {
          const m = Math.round(mode.Value());
          const lbl = MODES[m];
          const map = ["sin(π−θ)=sinθ, cos(π−θ)=−cosθ", "sin(−θ)=−sinθ, cos(−θ)=cosθ", "sin(π+θ)=−sinθ, cos(π+θ)=−cosθ", "sin(π/2−θ)=cosθ, cos(π/2−θ)=sinθ"][m];
          return `Q = ${lbl} の像 :  ${map}`;
        }], { ...textStyle, fontSize: 12 });
      }}
    />
  );
}
