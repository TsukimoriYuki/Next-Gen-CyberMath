"use client";

import { JsxBoard } from "../JsxBoard";
import { NEON, curveStyle, pointStyle, sliderStyle, textStyle } from "./theme";

/**
 * Circumcircle of radius R = 2. B and C are fixed on the lower arc; vertex A
 * slides along the upper (major) arc. By the inscribed-angle theorem ∠A stays
 * constant, so the sine rule a / sin A = 2R = 4 holds for every position of A.
 */
const R = 2;
const rad = (d: number) => (d * Math.PI) / 180;
const onCircle = (deg: number): [number, number] => [
  R * Math.cos(rad(deg)),
  R * Math.sin(rad(deg)),
];

export function CircumcircleSineRuleLab() {
  const B = onCircle(205);
  const C = onCircle(335);
  return (
    <JsxBoard
      boundingBox={[-2.7, 2.7, 2.7, -2.7]}
      keepAspectRatio
      ariaLabel="正弦定理 a/sinA = 2R と外接円"
      init={(board) => {
        const b = board;

        b.create("circle", [[0, 0], R], {
          strokeColor: NEON.muted,
          strokeWidth: 1.5,
          dash: 2,
          fillOpacity: 0,
        });
        b.create("point", [0, 0], { name: "O", size: 2, fillColor: NEON.muted, strokeColor: NEON.muted });

        const alpha = b.create(
          "slider",
          [[-2.5, 2.5], [0.4, 2.5], [25, 90, 155]],
          { name: "A位置°", snapWidth: 1, ...sliderStyle(NEON.cyan) },
        );

        const pB = b.create("point", B, { name: "B", ...pointStyle(NEON.lime), fixed: true });
        const pC = b.create("point", C, { name: "C", ...pointStyle(NEON.lime), fixed: true });
        const pA = b.create(
          "point",
          [() => onCircle(alpha.Value())[0], () => onCircle(alpha.Value())[1]],
          { name: "A", ...pointStyle(NEON.magenta), fixed: true },
        );

        b.create("segment", [pA, pB], curveStyle(NEON.magenta, 2));
        b.create("segment", [pA, pC], curveStyle(NEON.magenta, 2));
        b.create("segment", [pB, pC], curveStyle(NEON.cyan, 2.5)); // side a

        const aLen = Math.hypot(B[0] - C[0], B[1] - C[1]);
        const angleA = () => {
          const Ax = onCircle(alpha.Value())[0];
          const Ay = onCircle(alpha.Value())[1];
          const v1 = [B[0] - Ax, B[1] - Ay];
          const v2 = [C[0] - Ax, C[1] - Ay];
          const dot = v1[0] * v2[0] + v1[1] * v2[1];
          const m = Math.hypot(v1[0], v1[1]) * Math.hypot(v2[0], v2[1]);
          return Math.acos(Math.max(-1, Math.min(1, dot / m)));
        };

        b.create("text", [
          -2.6,
          -2.3,
          () => {
            const Adeg = (angleA() * 180) / Math.PI;
            const ratio = aLen / Math.sin(angleA());
            return `∠A = ${Adeg.toFixed(1)}°   a/sinA = ${ratio.toFixed(2)}  (=2R=4)`;
          },
        ], textStyle);
      }}
    />
  );
}
