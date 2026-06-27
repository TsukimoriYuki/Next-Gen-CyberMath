// 二次関数・確率の講義に差し込む図解 SVG を生成する。
// すべて data URI を返し、specialLectures の image ブロックで表示する。

function escapeSvg(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// ---------------------------------------------------------------------------
// 二次関数：軸が定義域の「左・中・右」にある3パターン
// 上に開く放物線で、最小値がどこで起きるかを視覚的に比較する。
// ---------------------------------------------------------------------------

type AxisCase = "left" | "in" | "right";

function quadPanel(ox: number, title: string, axisCase: AxisCase): string {
  const by = 206; // x軸（baseline）
  const top = 80;
  const px0 = ox + 16;
  const px1 = ox + 170;
  const L = ox + 58;
  const R = ox + 130;
  const ax = axisCase === "left" ? ox + 34 : axisCase === "in" ? ox + 94 : ox + 154;
  const vertexY = 192; // 頂点（最小）の画面上のy
  const k = 0.007;

  const y = (x: number) => Math.max(top, vertexY - k * (x - ax) * (x - ax));

  const samples: string[] = [];
  for (let x = px0; x <= px1; x += 4) {
    samples.push(`${x === px0 ? "M" : "L"}${x} ${Math.round(y(x) * 10) / 10}`);
  }
  const curve = samples.join(" ");

  const minX = axisCase === "left" ? L : axisCase === "right" ? R : ax;
  const minY = axisCase === "in" ? vertexY : y(minX);
  const minLabel =
    axisCase === "left" ? "左端が最小" : axisCase === "right" ? "右端が最小" : "頂点が最小";

  return `
    <g>
      <rect x="${ox + 4}" y="44" width="186" height="212" rx="12" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="${ox + 97}" y="62" text-anchor="middle" class="q-title">${escapeSvg(title)}</text>
      <line x1="${px0 - 6}" y1="${by}" x2="${px1 + 6}" y2="${by}" class="q-axis"/>
      <path d="${curve}" class="q-curve"/>
      <line x1="${ax}" y1="${by}" x2="${ax}" y2="${top}" class="q-axisline"/>
      <text x="${ax + 5}" y="${top + 2}" text-anchor="start" class="q-axislabel">軸</text>
      <line x1="${L}" y1="${by}" x2="${R}" y2="${by}" class="q-domain"/>
      <line x1="${L}" y1="${by - 5}" x2="${L}" y2="${by + 5}" class="q-tick"/>
      <line x1="${R}" y1="${by - 5}" x2="${R}" y2="${by + 5}" class="q-tick"/>
      <text x="${L - 2}" y="${by + 17}" text-anchor="middle" class="q-end">左端</text>
      <text x="${R + 2}" y="${by + 17}" text-anchor="middle" class="q-end">右端</text>
      <circle cx="${minX}" cy="${Math.round(minY)}" r="5" class="q-min"/>
      <text x="${ox + 97}" y="244" text-anchor="middle" class="q-note">${escapeSvg(minLabel)}</text>
    </g>
  `;
}

export function createQuadraticAxisCasesSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="620" height="266" viewBox="0 0 620 266" preserveAspectRatio="xMidYMid meet">
  <defs><style>
    .q-frame { fill: #f8fafc; stroke: #e2e8f0; }
    .q-heading { font: 700 16px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #0f172a; }
    .q-title { font: 700 13px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #1d4ed8; }
    .q-axis { stroke: #94a3b8; stroke-width: 1.5; }
    .q-axis-faint { stroke: #e2e8f0; stroke-width: 1; }
    .q-curve { fill: none; stroke: #2563eb; stroke-width: 2.5; }
    .q-axisline { stroke: #7c3aed; stroke-width: 1.6; stroke-dasharray: 5 4; }
    .q-axislabel { font: 700 11px system-ui, sans-serif; fill: #7c3aed; }
    .q-domain { stroke: #f59e0b; stroke-width: 4; stroke-linecap: round; }
    .q-tick { stroke: #b45309; stroke-width: 2; }
    .q-end { font: 600 10px system-ui, sans-serif; fill: #b45309; }
    .q-min { fill: #dc2626; stroke: #ffffff; stroke-width: 1.5; }
    .q-note { font: 700 12px system-ui, sans-serif; fill: #b91c1c; }
  </style></defs>
  <rect width="620" height="266" rx="16" class="q-frame"/>
  <text x="20" y="32" class="q-heading">軸（紫の点線）が定義域（オレンジ）のどこにあるかで、最小値の位置が変わる</text>
  ${quadPanel(14, "① 軸が定義域の左", "left")}
  ${quadPanel(214, "② 軸が定義域の中", "in")}
  ${quadPanel(414, "③ 軸が定義域の右", "right")}
</svg>`;
  return toDataUri(svg);
}

// ---------------------------------------------------------------------------
// 確率：玉の取り出し問題の「状態整理」表
// 全体の数え方（分母）と、各事象の数え方（分子）を1枚で見せる。
// ---------------------------------------------------------------------------

interface ProbabilityRow {
  event: string;
  count: string;
  prob: string;
}

export function createProbabilityCountingSvg(
  rows: ProbabilityRow[] = [
    { event: "赤を少なくとも1個", count: "20 − 1 = 19", prob: "19/20" },
    { event: "3色すべて異なる", count: "3 × 2 × 1 = 6", prob: "6/20 = 3/10" },
    { event: "赤がちょうど2個", count: "C(3,2)×C(3,1) = 9", prob: "9/20" },
  ],
): string {
  const balls = [
    { fill: "#ef4444", n: 3, label: "赤" },
    { fill: "#e2e8f0", stroke: "#94a3b8", n: 2, label: "白" },
    { fill: "#3b82f6", n: 1, label: "青" },
  ];

  let bx = 120;
  const ballMarks: string[] = [];
  for (const group of balls) {
    for (let i = 0; i < group.n; i += 1) {
      ballMarks.push(
        `<circle cx="${bx}" cy="70" r="13" fill="${group.fill}" stroke="${group.stroke ?? "#cbd5e1"}" stroke-width="1.5"/>`,
      );
      bx += 34;
    }
    bx += 8;
  }

  const rowHeight = 40;
  const tableTop = 130;
  const rowMarks = rows
    .map((row, i) => {
      const y = tableTop + 30 + i * rowHeight;
      const band = i % 2 === 0 ? `<rect x="24" y="${y - 26}" width="572" height="${rowHeight}" fill="#f8fafc"/>` : "";
      return `
        ${band}
        <text x="40" y="${y}" class="p-event">${escapeSvg(row.event)}</text>
        <text x="330" y="${y}" class="p-count">${escapeSvg(row.count)}</text>
        <text x="560" y="${y}" text-anchor="end" class="p-prob">${escapeSvg(row.prob)}</text>
      `;
    })
    .join("");

  const tableHeight = 30 + rows.length * rowHeight + 8;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="620" height="${tableTop + tableHeight + 16}" viewBox="0 0 620 ${tableTop + tableHeight + 16}" preserveAspectRatio="xMidYMid meet">
  <defs><style>
    .p-frame { fill: #ffffff; stroke: #e2e8f0; }
    .p-heading { font: 700 15px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #0f172a; }
    .p-sub { font: 600 12px system-ui, sans-serif; fill: #475569; }
    .p-total { font: 800 13px system-ui, sans-serif; fill: #1d4ed8; }
    .p-col { font: 700 11px system-ui, sans-serif; fill: #94a3b8; }
    .p-event { font: 700 13px system-ui, sans-serif; fill: #0f172a; }
    .p-count { font: 600 13px system-ui, sans-serif; fill: #334155; }
    .p-prob { font: 800 14px system-ui, sans-serif; fill: #7c3aed; }
  </style></defs>
  <rect width="620" height="${tableTop + tableHeight + 16}" rx="16" class="p-frame"/>
  <text x="24" y="30" class="p-heading">玉の取り出し：分母をそろえて数える</text>
  <text x="24" y="74" class="p-sub">袋の中</text>
  ${ballMarks.join("")}
  <text x="${bx + 6}" y="74" class="p-total">全体 = C(6,3) = 20 通り</text>
  <line x1="24" y1="100" x2="596" y2="100" stroke="#e2e8f0"/>
  <text x="40" y="${tableTop - 4}" class="p-col">事象</text>
  <text x="330" y="${tableTop - 4}" class="p-col">数え方（分子）</text>
  <text x="560" y="${tableTop - 4}" text-anchor="end" class="p-col">確率</text>
  <line x1="24" y1="${tableTop + 4}" x2="596" y2="${tableTop + 4}" stroke="#cbd5e1"/>
  ${rowMarks}
</svg>`;
  return toDataUri(svg);
}

// ---------------------------------------------------------------------------
// 図形の性質：方べきの定理（円と外部点・2本の割線）
// 円外の点Pから2本の割線を引き、PA·PB = PC·PD を見せる。
// ---------------------------------------------------------------------------

interface Vec2 {
  x: number;
  y: number;
}

// 点Pから方向dの直線と、中心O・半径rの円との交点（近い順）を返す。
function lineCircleHits(p: Vec2, d: Vec2, o: Vec2, r: number): [Vec2, Vec2] {
  const f = { x: p.x - o.x, y: p.y - o.y };
  const fd = f.x * d.x + f.y * d.y;
  const ff = f.x * f.x + f.y * f.y;
  const disc = Math.max(0, fd * fd - (ff - r * r));
  const root = Math.sqrt(disc);
  const tNear = -fd - root;
  const tFar = -fd + root;
  return [
    { x: p.x + tNear * d.x, y: p.y + tNear * d.y },
    { x: p.x + tFar * d.x, y: p.y + tFar * d.y },
  ];
}

export function createPowerOfPointSvg(): string {
  const o: Vec2 = { x: 340, y: 196 };
  const r = 110;
  const p: Vec2 = { x: 108, y: 196 };
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const dirUp: Vec2 = { x: Math.cos(rad(-16)), y: Math.sin(rad(-16)) };
  const dirDown: Vec2 = { x: Math.cos(rad(16)), y: Math.sin(rad(16)) };

  const [a, b] = lineCircleHits(p, dirUp, o, r); // 上の割線：近=A 遠=B
  const [d, c] = lineCircleHits(p, dirDown, o, r); // 下の割線：近=D 遠=C

  const R = (n: number) => Math.round(n * 10) / 10;
  const dot = (pt: Vec2, cls = "g-dot") => `<circle cx="${R(pt.x)}" cy="${R(pt.y)}" r="4" class="${cls}"/>`;
  const lbl = (s: string, pt: Vec2, anchor = "middle") =>
    `<text x="${R(pt.x)}" y="${R(pt.y)}" text-anchor="${anchor}" class="g-point">${escapeSvg(s)}</text>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="372" viewBox="0 0 520 372" preserveAspectRatio="xMidYMid meet">
  <defs><style>
    .g-frame { fill: #f8fafc; stroke: #e2e8f0; }
    .g-heading { font: 700 15px system-ui, -apple-system, "Segoe UI", sans-serif; fill: #0f172a; }
    .g-circle { fill: #ffffff; stroke: #0f172a; stroke-width: 2; }
    .g-secant { stroke: #2563eb; stroke-width: 2; }
    .g-dot { fill: #0f172a; }
    .g-dot-p { fill: #dc2626; }
    .g-point { font: 800 16px system-ui, sans-serif; fill: #0f172a; }
    .g-note { font: 800 15px system-ui, sans-serif; fill: #1d4ed8; }
    .g-sub { font: 600 12px system-ui, sans-serif; fill: #475569; }
  </style></defs>
  <rect width="520" height="372" rx="16" class="g-frame"/>
  <text x="20" y="30" class="g-heading">円の外の点Pから2本の割線 → 方べきの定理</text>
  <circle cx="${o.x}" cy="${o.y}" r="${r}" class="g-circle"/>
  <circle cx="${o.x}" cy="${o.y}" r="2.5" class="g-dot"/>
  <text x="${o.x + 8}" y="${o.y + 18}" class="g-sub">O</text>
  <line x1="${p.x}" y1="${p.y}" x2="${R(b.x)}" y2="${R(b.y)}" class="g-secant"/>
  <line x1="${p.x}" y1="${p.y}" x2="${R(c.x)}" y2="${R(c.y)}" class="g-secant"/>
  ${dot(p, "g-dot-p")}
  ${dot(a)}${dot(b)}${dot(c)}${dot(d)}
  ${lbl("P", { x: p.x - 16, y: p.y + 5 }, "end")}
  ${lbl("A", { x: a.x - 6, y: a.y - 12 })}
  ${lbl("B", { x: b.x + 6, y: b.y - 10 })}
  ${lbl("D", { x: d.x - 6, y: d.y + 22 })}
  ${lbl("C", { x: c.x + 8, y: c.y + 20 })}
  <text x="260" y="352" text-anchor="middle" class="g-note">PA・PB = PC・PD</text>
</svg>`;
  return toDataUri(svg);
}
