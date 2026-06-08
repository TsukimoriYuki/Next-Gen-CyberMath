"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Unit circle with an adjustable integer-degree angle. The vertical
 * tangent segment at x = 1 has signed length tan θ. Companion to the
 * D+ problem "tan 1° は有理数か？": watch how tan of small integer
 * degrees behaves, and feel why 1° is the awkward generator.
 */
export function TanDegreeLab() {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  return (
    <JsxBoard
      boundingBox={[-1.4, 2.6, 2.6, -1.4]}
      ariaLabel="単位円と tan θ"
      init={(board) => {
        const b = board;

        b.create("circle", [[0, 0], 1], {
          strokeColor: NEON.muted,
          strokeWidth: 1.5,
          fillOpacity: 0,
        });
        // tangent line x = 1
        b.create("line", [[1, 0], [1, 1]], {
          strokeColor: NEON.faint,
          strokeWidth: 1,
          dash: 2,
        });

        const deg = b.create(
          "slider",
          [[-1.2, 2.4], [2.4, 2.4], [1, 30, 80]],
          { name: "θ°", snapWidth: 1, ...sliderStyle(NEON.cyan) },
        );

        const P = b.create(
          "point",
          [() => Math.cos(rad(deg.Value())), () => Math.sin(rad(deg.Value()))],
          { name: "", ...pointStyle(NEON.magenta) },
        );
        b.create("segment", [[0, 0], P], curveStyle(NEON.magenta, 2));

        // tan θ as the tangent-segment length on x = 1
        const T = b.create("point", [1, () => Math.tan(rad(deg.Value()))], {
          name: "",
          ...pointStyle(NEON.lime),
        });
        b.create("segment", [[1, 0], T], curveStyle(NEON.lime, 2.5));

        b.create("text", [
          -1.25,
          -1.0,
          () => {
            const d = Math.round(deg.Value());
            return `θ = ${d}°   tan θ = ${Math.tan(rad(d)).toFixed(4)}`;
          },
        ], textStyle);
      }}
    />
  );
}
