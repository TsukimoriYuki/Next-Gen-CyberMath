import type { GeometryLayerBlock } from "@/data/specialLectures";

export type TriangleAuxiliaryLinePreset =
  | "none"
  | "altitude-from-a"
  | "altitude-from-b"
  | "median-from-a";

export type TriangleGeometrySvgLayerKind =
  | "base"
  | "conditions"
  | "equalAngles"
  | "auxiliary"
  | "formulas"
  | "route";

export interface TriangleGeometrySvgInput {
  title: string;
  description: string;
  pointLabels: {
    a: string;
    b: string;
    c: string;
  };
  sideLabels: {
    ab: string;
    bc: string;
    ca: string;
  };
  angleLabels: {
    a: string;
    b: string;
    c: string;
  };
  equalAngleLabel: string;
  auxiliaryLine: TriangleAuxiliaryLinePreset;
  formulaNotes: string[];
  routeSteps: string[];
}

export const DEFAULT_TRIANGLE_GEOMETRY_SVG_INPUT: TriangleGeometrySvgInput = {
  title: "図形レイヤー：条件から解法ルートまで",
  description:
    "同じ図形でも、見るレイヤーを分けると公式選択が安定します。条件、角、補助線、公式、求める順番を一つずつ重ねて確認します。",
  pointLabels: {
    a: "A",
    b: "B",
    c: "C",
  },
  sideLabels: {
    ab: "AB=6",
    bc: "BC=?",
    ca: "AC=8",
  },
  angleLabels: {
    a: "60°",
    b: "",
    c: "",
  },
  equalAngleLabel: "対応する辺と角を見る",
  auxiliaryLine: "altitude-from-a",
  formulaNotes: ["余弦定理", "面積公式", "正弦定理"],
  routeSteps: ["BCを求める", "面積を出す", "sinBへつなぐ"],
};

// ---------------------------------------------------------------------------
// 1. レイアウト定数と頂点座標
// ---------------------------------------------------------------------------
// すべてのレイヤーで同じ viewBox / 同じ三角形を共有する。図のサイズが
// レイヤー切替で動かないように、下部に公式・ルート用のパネル帯を常に確保する。

const VIEW = { w: 600, h: 482 };
const FIGURE_BOTTOM = 360; // 三角形を描く領域の下端
const PANEL = { x: 40, y: 384, w: 520, h: 78 };

interface Pt {
  x: number;
  y: number;
}

// 教科書的に自然な不等辺三角形。Aが頂点、B左下、C右下。
const POINTS: { a: Pt; b: Pt; c: Pt } = {
  a: { x: 248, y: 92 },
  b: { x: 132, y: FIGURE_BOTTOM },
  c: { x: 470, y: FIGURE_BOTTOM },
};

const CENTROID: Pt = {
  x: (POINTS.a.x + POINTS.b.x + POINTS.c.x) / 3,
  y: (POINTS.a.y + POINTS.b.y + POINTS.c.y) / 3,
};

// ---------------------------------------------------------------------------
// 2. ベクトル小道具
// ---------------------------------------------------------------------------

function sub(p: Pt, q: Pt): Pt {
  return { x: p.x - q.x, y: p.y - q.y };
}
function add(p: Pt, q: Pt): Pt {
  return { x: p.x + q.x, y: p.y + q.y };
}
function scale(p: Pt, k: number): Pt {
  return { x: p.x * k, y: p.y * k };
}
function len(p: Pt): number {
  return Math.hypot(p.x, p.y) || 1;
}
function unit(p: Pt): Pt {
  return scale(p, 1 / len(p));
}
function mid(p: Pt, q: Pt): Pt {
  return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
}
function round(p: Pt): Pt {
  return { x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 };
}

// 線分 QR 上への P の正射影（垂線の足）。
function footOfPerpendicular(p: Pt, q: Pt, r: Pt): Pt {
  const qr = sub(r, q);
  const t = (sub(p, q).x * qr.x + sub(p, q).y * qr.y) / (qr.x * qr.x + qr.y * qr.y);
  return add(q, scale(qr, t));
}

// ---------------------------------------------------------------------------
// 3. テキストと SVG エスケープ
// ---------------------------------------------------------------------------

function escapeSvg(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function text(
  value: string,
  p: Pt,
  className: string,
  anchor: "start" | "middle" | "end" = "middle",
): string {
  if (!value.trim()) return "";
  const r = round(p);
  return `<text x="${r.x}" y="${r.y}" text-anchor="${anchor}" class="${className}">${escapeSvg(
    value,
  )}</text>`;
}

// ---------------------------------------------------------------------------
// 4. ラベル配置（点・辺・角）
// ---------------------------------------------------------------------------

// 点名は重心と反対側（外側）へ少しだけ離して置く。
function pointLabel(value: string, v: Pt, className = "point"): string {
  const out = unit(sub(v, CENTROID));
  const pos = add(v, scale(out, 26));
  return text(value, { x: pos.x, y: pos.y + 6 }, className);
}

// 辺ラベルは中点から「向かいの頂点と反対方向（外側）」へ離す。
function sideLabel(value: string, p: Pt, q: Pt, opposite: Pt, className = "side"): string {
  const m = mid(p, q);
  const out = unit(sub(m, opposite));
  const pos = add(m, scale(out, 28));
  return text(value, { x: pos.x, y: pos.y + 6 }, className);
}

// 角の内側に沿った小さな円弧（角マーク）を描く。8分割の折れ線で近似し、
// SVG の sweep 曖昧さを避ける。返すのは <path> と、ラベル位置。
function angleArc(
  v: Pt,
  n1: Pt,
  n2: Pt,
  radius: number,
  className: string,
): { path: string; labelPos: Pt } {
  const d1 = unit(sub(n1, v));
  const d2 = unit(sub(n2, v));
  const a1 = Math.atan2(d1.y, d1.x);
  let delta = Math.atan2(d2.y, d2.x) - a1;
  while (delta <= -Math.PI) delta += 2 * Math.PI;
  while (delta > Math.PI) delta -= 2 * Math.PI;

  const steps = 10;
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const ang = a1 + (delta * i) / steps;
    pts.push({ x: v.x + radius * Math.cos(ang), y: v.y + radius * Math.sin(ang) });
  }
  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${round(p).x} ${round(p).y}`)
    .join(" ");

  // ラベルは二等分線方向、弧より少し外へ。
  const bisector = unit(add(d1, d2));
  const labelPos = add(v, scale(bisector, radius + 20));
  return { path: `<path d="${d}" class="${className}"/>`, labelPos };
}

// 角ラベル（角度の値）を頂点の内側に置く。
function angleValueLabel(value: string, v: Pt, n1: Pt, n2: Pt): string {
  if (!value.trim()) return "";
  const arc = angleArc(v, n1, n2, 34, "angle-arc");
  return `${arc.path}${text(value, { x: arc.labelPos.x, y: arc.labelPos.y + 5 }, "angle-value")}`;
}

// ---------------------------------------------------------------------------
// 5. 補助線
// ---------------------------------------------------------------------------

function rightAngleMark(foot: Pt, along: Pt, toward: Pt): string {
  // foot を直角の頂点として、along 方向と toward 方向に小さな正方形を描く。
  const s = 13;
  const u = scale(unit(sub(along, foot)), s);
  const w = scale(unit(sub(toward, foot)), s);
  const p1 = add(foot, u);
  const p2 = add(add(foot, u), w);
  const p3 = add(foot, w);
  return `<path d="M${round(p1).x} ${round(p1).y} L${round(p2).x} ${round(p2).y} L${round(p3).x} ${round(p3).y}" class="right-angle"/>`;
}

function auxiliaryLayer(input: TriangleGeometrySvgInput): string {
  const { a, b, c } = POINTS;
  switch (input.auxiliaryLine) {
    case "altitude-from-a": {
      const foot = footOfPerpendicular(a, b, c);
      return `
        <line x1="${a.x}" y1="${a.y}" x2="${round(foot).x}" y2="${round(foot).y}" class="aux-line"/>
        ${rightAngleMark(foot, c, a)}
        ${text("高さ", { x: foot.x + 30, y: (a.y + foot.y) / 2 }, "aux-label", "start")}
      `;
    }
    case "altitude-from-b": {
      const foot = footOfPerpendicular(b, a, c);
      return `
        <line x1="${b.x}" y1="${b.y}" x2="${round(foot).x}" y2="${round(foot).y}" class="aux-line"/>
        ${rightAngleMark(foot, a, b)}
        ${text("高さ", { x: (b.x + foot.x) / 2 - 6, y: (b.y + foot.y) / 2 + 18 }, "aux-label", "middle")}
      `;
    }
    case "median-from-a": {
      const m = mid(b, c);
      return `
        <line x1="${a.x}" y1="${a.y}" x2="${round(m).x}" y2="${round(m).y}" class="aux-line"/>
        <circle cx="${round(m).x}" cy="${round(m).y}" r="4.5" class="aux-dot"/>
        ${text("中点", { x: m.x, y: m.y + 28 }, "aux-label", "middle")}
        ${text("中線", { x: (a.x + m.x) / 2 + 14, y: (a.y + m.y) / 2 }, "aux-label", "start")}
      `;
    }
    case "none":
      return text("補助線なしで処理できる形か確認する", { x: VIEW.w / 2, y: FIGURE_BOTTOM + 16 }, "aux-label", "middle");
  }
}

// ---------------------------------------------------------------------------
// 6. 下部パネル（公式メモ・解法ルート）
// ---------------------------------------------------------------------------

function bottomPanel(
  title: string,
  items: string[],
  accent: "blue" | "violet",
  flow: boolean,
): string {
  const cleaned = items.map((item) => item.trim()).filter(Boolean);
  const panelClass = accent === "violet" ? "panel-violet" : "panel-blue";
  const titleClass = accent === "violet" ? "panel-title-violet" : "panel-title-blue";

  const header = `
    <rect x="${PANEL.x}" y="${PANEL.y}" width="${PANEL.w}" height="${PANEL.h}" rx="14" class="${panelClass}"/>
    ${text(title, { x: PANEL.x + 18, y: PANEL.y + 26 }, titleClass, "start")}
  `;

  if (flow) {
    // 横並びの矢印フロー（解法ルート向け）。
    const gap = PANEL.w / Math.max(cleaned.length, 1);
    const y = PANEL.y + 56;
    const nodes = cleaned
      .map((item, i) => {
        const cx = PANEL.x + gap * i + gap / 2;
        const arrow =
          i < cleaned.length - 1
            ? `<text x="${Math.round(cx + gap / 2)}" y="${y + 4}" text-anchor="middle" class="flow-arrow">→</text>`
            : "";
        return `${text(`${i + 1}. ${item}`, { x: cx, y }, "flow-step", "middle")}${arrow}`;
      })
      .join("");
    return `${header}${nodes}`;
  }

  // 箇条書き（公式メモ向け）。2列に折り返す。
  const colWidth = PANEL.w / 2;
  const rows = cleaned
    .map((item, i) => {
      const col = i % 2;
      const rowIndex = Math.floor(i / 2);
      const x = PANEL.x + 18 + col * colWidth;
      const y = PANEL.y + 52 + rowIndex * 22;
      return text(`・${item}`, { x, y }, "panel-item", "start");
    })
    .join("");
  return `${header}${rows}`;
}

// ---------------------------------------------------------------------------
// 7. レイヤーごとの重ね描き
// ---------------------------------------------------------------------------

function conditionsLayer(input: TriangleGeometrySvgInput): string {
  const { a, b, c } = POINTS;
  return [
    sideLabel(input.sideLabels.ab, a, b, c),
    sideLabel(input.sideLabels.bc, b, c, a),
    sideLabel(input.sideLabels.ca, c, a, b),
    angleValueLabel(input.angleLabels.a, a, b, c),
    angleValueLabel(input.angleLabels.b, b, a, c),
    angleValueLabel(input.angleLabels.c, c, a, b),
  ].join("");
}

function equalAnglesLayer(input: TriangleGeometrySvgInput): string {
  const { a, b, c } = POINTS;
  const arcB = angleArc(b, a, c, 30, "equal-angle");
  const arcC = angleArc(c, a, b, 30, "equal-angle");
  return `
    ${arcB.path}
    ${arcC.path}
    ${text("α", { x: arcB.labelPos.x, y: arcB.labelPos.y + 5 }, "equal-angle-text")}
    ${text("α", { x: arcC.labelPos.x, y: arcC.labelPos.y + 5 }, "equal-angle-text")}
    ${text(input.equalAngleLabel, { x: VIEW.w / 2, y: FIGURE_BOTTOM + 14 }, "equal-caption", "middle")}
  `;
}

function routeHighlight(): string {
  // ルート層では三角形を薄く強調し、視線誘導の数字を頂点付近に置く。
  const { a, b, c } = POINTS;
  const order: { p: Pt; n: string }[] = [
    { p: b, n: "1" },
    { p: c, n: "2" },
    { p: a, n: "3" },
  ];
  return order
    .map(({ p, n }) => {
      const inward = unit(sub(CENTROID, p));
      const pos = add(p, scale(inward, 30));
      return `<circle cx="${round(pos).x}" cy="${round(pos).y}" r="13" class="route-badge"/>${text(
        n,
        { x: pos.x, y: pos.y + 5 },
        "route-number",
      )}`;
    })
    .join("");
}

function overlayForLayer(input: TriangleGeometrySvgInput, layer: TriangleGeometrySvgLayerKind): string {
  switch (layer) {
    case "base":
      return "";
    case "conditions":
      return conditionsLayer(input);
    case "equalAngles":
      return equalAnglesLayer(input);
    case "auxiliary":
      return auxiliaryLayer(input);
    case "formulas":
      return bottomPanel("使う公式候補", input.formulaNotes, "blue", false);
    case "route":
      return `${routeHighlight()}${bottomPanel("解法ルート", input.routeSteps, "violet", true)}`;
  }
}

// ---------------------------------------------------------------------------
// 8. SVG 本体と data URI
// ---------------------------------------------------------------------------

const STYLE = `
  .figure-title { font: 700 18px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #0f172a; }
  .point { font: 800 19px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #0f172a; }
  .side { font: 700 17px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #1d4ed8; }
  .angle-arc { fill: none; stroke: #2563eb; stroke-width: 2; }
  .angle-value { font: 700 16px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #1d4ed8; }
  .equal-angle { fill: none; stroke: #7c3aed; stroke-width: 2.5; }
  .equal-angle-text { font: 800 17px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #7c3aed; }
  .equal-caption { font: 600 14px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #6d28d9; }
  .aux-line { stroke: #ea580c; stroke-width: 2.5; stroke-dasharray: 7 6; stroke-linecap: round; }
  .right-angle { fill: none; stroke: #ea580c; stroke-width: 2; }
  .aux-dot { fill: #ea580c; }
  .aux-label { font: 700 14px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #c2410c; }
  .panel-blue { fill: #eff6ff; stroke: #bfdbfe; stroke-width: 1; }
  .panel-violet { fill: #f5f3ff; stroke: #ddd6fe; stroke-width: 1; }
  .panel-title-blue { font: 800 14px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #1d4ed8; }
  .panel-title-violet { font: 800 14px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #6d28d9; }
  .panel-item { font: 600 14px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #334155; }
  .flow-step { font: 700 13px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #4c1d95; }
  .flow-arrow { font: 700 16px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #a78bfa; }
  .route-badge { fill: #7c3aed; }
  .route-number { font: 800 15px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #ffffff; }
`;

export function createTriangleGeometrySvg(
  input: TriangleGeometrySvgInput,
  layer: TriangleGeometrySvgLayerKind,
): string {
  const { a, b, c } = POINTS;
  const dot = (p: Pt) => `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#0f172a"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${VIEW.w}" height="${VIEW.h}" viewBox="0 0 ${VIEW.w} ${VIEW.h}" preserveAspectRatio="xMidYMid meet">
  <defs><style>${STYLE}</style></defs>
  <rect width="${VIEW.w}" height="${VIEW.h}" rx="20" fill="#ffffff"/>
  <rect x="16" y="16" width="${VIEW.w - 32}" height="${VIEW.h - 32}" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  ${text(input.title, { x: 36, y: 44 }, "figure-title", "start")}
  <polygon points="${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}" fill="#ffffff" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
  ${dot(a)}${dot(b)}${dot(c)}
  ${pointLabel(input.pointLabels.a, a)}
  ${pointLabel(input.pointLabels.b, b)}
  ${pointLabel(input.pointLabels.c, c)}
  ${overlayForLayer(input, layer)}
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function createTriangleGeometryLayerBlock(
  input: TriangleGeometrySvgInput,
  id: string,
): GeometryLayerBlock {
  return {
    id,
    type: "geometryLayers",
    title: input.title,
    description: input.description,
    baseImage: {
      src: createTriangleGeometrySvg(input, "base"),
      alt: `${input.title}の基本図`,
    },
    layers: [
      {
        id: `${id}-conditions`,
        label: "条件だけ",
        image: {
          src: createTriangleGeometrySvg(input, "conditions"),
          alt: `${input.title}の条件だけを示した図`,
        },
        explanation:
          "辺の長さ・角度・点名だけを確認します。ここで条件を拾い切ると、公式選択が安定します。",
      },
      {
        id: `${id}-equal-angles`,
        label: "等しい角",
        image: {
          src: createTriangleGeometrySvg(input, "equalAngles"),
          alt: `${input.title}の等しい角を示した図`,
        },
        explanation: input.equalAngleLabel || "等しい角や対応する角を確認します。",
      },
      {
        id: `${id}-auxiliary`,
        label: "補助線",
        image: {
          src: createTriangleGeometrySvg(input, "auxiliary"),
          alt: `${input.title}の補助線を示した図`,
        },
        explanation: "高さ・中線などの補助線を使うかを確認します。不要なら補助線なしで進みます。",
      },
      {
        id: `${id}-formulas`,
        label: "使う公式",
        image: {
          src: createTriangleGeometrySvg(input, "formulas"),
          alt: `${input.title}で使う公式候補を示した図`,
        },
        explanation: input.formulaNotes.filter(Boolean).join(" / ") || "使う公式候補を整理します。",
      },
      {
        id: `${id}-route`,
        label: "解法ルート",
        image: {
          src: createTriangleGeometrySvg(input, "route"),
          alt: `${input.title}の解法ルートを示した図`,
        },
        explanation: input.routeSteps.filter(Boolean).join(" → ") || "どの順に見るかを確認します。",
      },
    ],
  };
}
