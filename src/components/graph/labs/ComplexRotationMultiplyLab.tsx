"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Multiplication on the complex plane is rotation × scaling.
 * Drag z; set α = r(cosθ + i sinθ) with the sliders. The product w = αz
 * has |w| = r|z| and arg w = θ + arg z. The faint circle marks |z|, and the
 * arrows show z (cyan) rotating/scaling into w (magenta).
 */
const rad = (d: number) => (d * Math.PI) / 180;

export function ComplexRotationMultiplyLab() {
  return (
    <JsxBoard
      boundingBox={[-4.2, 4.2, 4.2, -4.2]}
      keepAspectRatio
      ariaLabel="複素数の乗算：回転と拡大"
      init={(board) => {
        const b = board;
        const O: [number, number] = [0, 0];

        const r = b.create("slider", [[-4, 3.7], [-1.4, 3.7], [0.3, 1.3, 2.2]], {
          name: "r=|α|", snapWidth: 0.05, ...sliderStyle(NEON.amber),
        });
        const th = b.create("slider", [[-4, 3.1], [-1.4, 3.1], [0, 50, 180]], {
          name: "θ°", snapWidth: 1, ...sliderStyle(NEON.violet),
        });

        const z = b.create("point", [2.2, 0.8], {
          name: "z", ...pointStyle(NEON.cyan),
        });

        const wx = () => {
          const c = Math.cos(rad(th.Value()));
          const s = Math.sin(rad(th.Value()));
          return r.Value() * (c * z.X() - s * z.Y());
        };
        const wy = () => {
          const c = Math.cos(rad(th.Value()));
          const s = Math.sin(rad(th.Value()));
          return r.Value() * (s * z.X() + c * z.Y());
        };
        const w = b.create("point", [wx, wy], {
          name: "w=αz", ...pointStyle(NEON.magenta),
        });

        // |z| reference circle
        b.create("circle", [O, () => Math.hypot(z.X(), z.Y())], {
          strokeColor: NEON.faint, strokeWidth: 1, dash: 2, fillOpacity: 0,
        });

        b.create("arrow", [O, z], { strokeColor: NEON.cyan, strokeWidth: 2.5 });
        b.create("arrow", [O, w], { strokeColor: NEON.magenta, strokeWidth: 2.5 });

        b.create("text", [-4.1, -3.6, () => {
          const absz = Math.hypot(z.X(), z.Y());
          const absw = Math.hypot(wx(), wy());
          const argz = (Math.atan2(z.Y(), z.X()) * 180) / Math.PI;
          const argw = (Math.atan2(wy(), wx()) * 180) / Math.PI;
          return `|w|=${absw.toFixed(2)}=r|z|(${(r.Value() * absz).toFixed(2)})  arg w=${argw.toFixed(0)}°=θ+arg z(${(th.Value() + argz).toFixed(0)}°)`;
        }], textStyle);
      }}
    />
  );
}
