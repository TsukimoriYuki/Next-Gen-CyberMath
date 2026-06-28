export type GeometryDiagramType =
  | "altitude-basic"
  | "area-height-reverse"
  | "trig-height"
  | "incenter-incircle"
  | "circumcenter-circumcircle"
  | "centroid-median"
  | "orthocenter-altitudes"
  | "angle-bisector-ratio"
  | "angle-bisector-length"
  | "median-length"
  | "spatial-section"
  | "auxiliary-line-choice";

type DiagramMeta = {
  title: string;
  alt: string;
  point: string;
};

export const GEOMETRY_DIAGRAM_META: Record<GeometryDiagramType, DiagramMeta> = {
  "altitude-basic": {
    title: "垂線と高さ",
    alt: "三角形の頂点から底辺へ垂線を下ろし、高さを強調した図",
    point: "高さは辺そのものではなく、頂点から底辺の直線までの距離として見る。",
  },
  "area-height-reverse": {
    title: "面積から高さを逆算",
    alt: "底辺と面積から高さを逆算する三角形の図",
    point: "面積と底辺が見えたら、まず高さを戻す。鈍角でも考え方は同じ。",
  },
  "trig-height": {
    title: "三角比で高さを作る",
    alt: "斜辺と角からsinで高さを作る直角三角形の図",
    point: "角の向かい側が高さなら sin、底辺方向の射影なら cos を使う。",
  },
  "incenter-incircle": {
    title: "内心と内接円",
    alt: "三角形の内心から三辺へ等しい半径を下ろした図",
    point: "内心は三辺から等距離。内接円の半径は各辺への垂線になる。",
  },
  "circumcenter-circumcircle": {
    title: "外心と外接円",
    alt: "三角形の外心から三頂点へ等しい半径を引いた図",
    point: "外心は三頂点から等距離。辺ではなく頂点までの距離を見る。",
  },
  "centroid-median": {
    title: "重心と中線",
    alt: "三角形の中線と重心の二対一を示した図",
    point: "重心は中線の交点。頂点側から 2:1 に分ける向きを確認する。",
  },
  "orthocenter-altitudes": {
    title: "垂心と高さ",
    alt: "三角形の三本の高さが垂心で交わる図",
    point: "垂心は高さの交点。垂直二等分線ではなく、頂点から対辺への垂線を見る。",
  },
  "angle-bisector-ratio": {
    title: "角の二等分線定理",
    alt: "角の二等分線が対辺を隣の二辺の比に分ける図",
    point: "対辺の分割比は、二等分した角をはさむ二辺の比に対応する。",
  },
  "angle-bisector-length": {
    title: "角の二等分線の長さ",
    alt: "角の二等分線の長さを隣の二辺と対辺の分割から見る図",
    point: "長さ公式は、隣の二辺と対辺の分割がそろったときに使う。",
  },
  "median-length": {
    title: "中線の長さ",
    alt: "中点へ引いた中線とアポロニウスの定理を示す図",
    point: "中線は対辺の中点へ向かう線。角の二等分線と混ぜない。",
  },
  "spatial-section": {
    title: "空間図形の断面",
    alt: "正四角すいの高さを含む断面を取り出す図",
    point: "立体のまま計算せず、求めたい高さを含む断面の直角三角形へ戻す。",
  },
  "auxiliary-line-choice": {
    title: "補助線選択の比較",
    alt: "高さ、半径、中線、二等分線のどれを見るかを比較した図",
    point: "条件の言葉から、垂線・半径・中線・二等分線のどれを足すか決める。",
  },
};

const BLUE = "#2563eb";
const CYAN = "#0891b2";
const VIOLET = "#7c3aed";
const ROSE = "#e11d48";
const EMERALD = "#059669";
const AMBER = "#d97706";
const SLATE = "#475569";
const GRID = "#e2e8f0";
const BG = "#f8fafc";

function text(x: number, y: number, value: string, color = SLATE, size = 16, anchor = "middle") {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-size="${size}" font-weight="700" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">${value}</text>`;
}

function line(x1: number, y1: number, x2: number, y2: number, color = SLATE, width = 3, dash = "") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
}

function dot(x: number, y: number, label: string, color = SLATE, dx = 0, dy = -10) {
  return `<circle cx="${x}" cy="${y}" r="5" fill="${color}"/>${text(x + dx, y + dy, label, color, 15)}`;
}

function base(content: string, title: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" role="img" aria-label="${title}">
  <rect width="640" height="360" rx="18" fill="${BG}"/>
  <rect x="18" y="18" width="604" height="324" rx="16" fill="#ffffff" stroke="${GRID}"/>
  ${content}
</svg>`;
}

function altitudeBasic() {
  const c = `
    <polygon points="116,288 524,288 252,72" fill="#dbeafe" opacity="0.45" stroke="${SLATE}" stroke-width="3"/>
    ${line(252, 72, 252, 288, ROSE, 5)}
    ${line(238, 288, 238, 274, SLATE, 2)}${line(238, 274, 252, 274, SLATE, 2)}
    ${dot(252, 72, "A", ROSE, 0, -14)}
    ${dot(116, 288, "B", SLATE, -18, 18)}
    ${dot(524, 288, "C", SLATE, 18, 18)}
    ${dot(252, 288, "H", ROSE, 0, 24)}
    ${text(318, 268, "底辺 BC", BLUE, 16)}
    ${text(278, 178, "高さ AH", ROSE, 18, "start")}
    ${text(66, 56, "見る線: 頂点から底辺の直線へ", SLATE, 16, "start")}
  `;
  return base(c, "垂線と高さ");
}

function areaHeightReverse() {
  const c = `
    <polygon points="104,286 536,286 430,84" fill="#ecfdf5" opacity="0.7" stroke="${SLATE}" stroke-width="3"/>
    ${line(430, 84, 430, 286, EMERALD, 5)}
    ${line(416, 286, 416, 272, SLATE, 2)}${line(416, 272, 430, 272, SLATE, 2)}
    ${text(320, 316, "底辺 a", BLUE, 18)}
    ${text(456, 188, "高さ h", EMERALD, 18, "start")}
    ${text(168, 150, "面積 S が先", AMBER, 18)}
    ${text(92, 58, "S = 1/2 × a × h から h を戻す", SLATE, 16, "start")}
  `;
  return base(c, "面積から高さを逆算");
}

function trigHeight() {
  const c = `
    <polygon points="118,286 502,286 502,86" fill="#eef2ff" opacity="0.75" stroke="${SLATE}" stroke-width="3"/>
    ${line(502, 86, 502, 286, ROSE, 5)}
    ${line(118, 286, 502, 286, BLUE, 4)}
    ${line(118, 286, 502, 86, VIOLET, 4)}
    <path d="M166 286 A52 52 0 0 1 186 246" fill="none" stroke="${AMBER}" stroke-width="4"/>
    ${text(192, 272, "θ", AMBER, 20)}
    ${text(314, 174, "斜辺 a", VIOLET, 18)}
    ${text(528, 190, "h = a sin θ", ROSE, 18, "start")}
    ${text(300, 314, "a cos θ", BLUE, 16)}
    ${text(80, 58, "高さ方向は sin、底辺方向は cos", SLATE, 16, "start")}
  `;
  return base(c, "三角比で高さを作る");
}

function incenterIncircle() {
  const c = `
    <polygon points="120,292 526,292 314,70" fill="#f0f9ff" opacity="0.8" stroke="${SLATE}" stroke-width="3"/>
    <circle cx="318" cy="215" r="62" fill="#ecfeff" stroke="${CYAN}" stroke-width="4"/>
    ${line(318, 215, 318, 277, CYAN, 4)}
    ${line(304, 277, 304, 263, SLATE, 2)}${line(304, 263, 318, 263, SLATE, 2)}
    ${line(318, 215, 242, 151, CYAN, 3, "7 6")}
    ${line(318, 215, 405, 153, CYAN, 3, "7 6")}
    ${dot(318, 215, "I", CYAN, 0, -12)}
    ${text(342, 254, "r", CYAN, 18, "start")}
    ${text(100, 58, "内心 I: 三辺から等距離", SLATE, 16, "start")}
    ${text(430, 232, "内接円", CYAN, 18, "start")}
  `;
  return base(c, "内心と内接円");
}

function circumcenterCircumcircle() {
  const c = `
    <circle cx="320" cy="188" r="150" fill="#eef2ff" stroke="${VIOLET}" stroke-width="4"/>
    <polygon points="205,285 468,256 302,56" fill="#ffffff" opacity="0.82" stroke="${SLATE}" stroke-width="3"/>
    ${line(320, 188, 205, 285, VIOLET, 3)}
    ${line(320, 188, 468, 256, VIOLET, 3)}
    ${line(320, 188, 302, 56, VIOLET, 3)}
    ${dot(320, 188, "O", VIOLET, 0, -12)}
    ${dot(302, 56, "A", SLATE, 0, -12)}
    ${dot(205, 285, "B", SLATE, -18, 18)}
    ${dot(468, 256, "C", SLATE, 20, 14)}
    ${text(78, 58, "外心 O: 三頂点から等距離", SLATE, 16, "start")}
    ${text(378, 170, "R", VIOLET, 18)}
  `;
  return base(c, "外心と外接円");
}

function centroidMedian() {
  const c = `
    <polygon points="112,292 530,292 278,70" fill="#ecfdf5" opacity="0.7" stroke="${SLATE}" stroke-width="3"/>
    ${line(278, 70, 321, 292, EMERALD, 5)}
    ${line(112, 292, 530, 292, BLUE, 3)}
    ${dot(321, 292, "M", BLUE, 0, 24)}
    ${dot(292, 144, "G", EMERALD, 18, 0)}
    ${text(300, 178, "2", EMERALD, 20)}
    ${text(312, 248, "1", EMERALD, 20)}
    ${text(82, 58, "重心 G は中線を頂点側から 2:1", SLATE, 16, "start")}
    ${text(414, 312, "BM = MC", BLUE, 16)}
  `;
  return base(c, "重心と中線");
}

function orthocenterAltitudes() {
  const c = `
    <polygon points="124,292 520,292 314,70" fill="#fff7ed" opacity="0.75" stroke="${SLATE}" stroke-width="3"/>
    ${line(314, 70, 314, 292, ROSE, 4)}
    ${line(124, 292, 410, 174, ROSE, 4)}
    ${line(520, 292, 226, 164, ROSE, 4)}
    ${dot(314, 206, "H", ROSE, 20, 4)}
    ${text(78, 58, "垂心 H: 三本の高さの交点", SLATE, 16, "start")}
    ${text(342, 134, "高さ", ROSE, 18, "start")}
  `;
  return base(c, "垂心と高さ");
}

function angleBisectorRatio() {
  const c = `
    <polygon points="118,292 526,292 292,66" fill="#f5f3ff" opacity="0.75" stroke="${SLATE}" stroke-width="3"/>
    ${line(292, 66, 286, 292, VIOLET, 5)}
    <path d="M258 100 A58 58 0 0 1 292 124" fill="none" stroke="${AMBER}" stroke-width="4"/>
    <path d="M292 124 A58 58 0 0 1 326 102" fill="none" stroke="${AMBER}" stroke-width="4"/>
    ${dot(286, 292, "D", VIOLET, 0, 24)}
    ${text(196, 314, "BD", BLUE, 17)}
    ${text(404, 314, "DC", BLUE, 17)}
    ${text(190, 166, "AB", SLATE, 16)}
    ${text(420, 160, "AC", SLATE, 16)}
    ${text(76, 58, "BD : DC = AB : AC", VIOLET, 20, "start")}
  `;
  return base(c, "角の二等分線定理");
}

function angleBisectorLength() {
  const c = `
    <polygon points="116,292 528,292 302,64" fill="#fff1f2" opacity="0.72" stroke="${SLATE}" stroke-width="3"/>
    ${line(302, 64, 304, 292, ROSE, 5)}
    ${dot(304, 292, "D", ROSE, 0, 24)}
    ${text(308, 178, "AD", ROSE, 20, "start")}
    ${text(214, 154, "AB", SLATE, 16)}
    ${text(422, 154, "AC", SLATE, 16)}
    ${text(202, 314, "BD", BLUE, 17)}
    ${text(414, 314, "DC", BLUE, 17)}
    ${text(62, 58, "AD² = AB×AC - BD×DC", ROSE, 20, "start")}
  `;
  return base(c, "角の二等分線の長さ");
}

function medianLength() {
  const c = `
    <polygon points="110,292 530,292 318,66" fill="#eff6ff" opacity="0.75" stroke="${SLATE}" stroke-width="3"/>
    ${line(318, 66, 320, 292, BLUE, 5)}
    ${line(110, 292, 530, 292, SLATE, 3)}
    ${dot(320, 292, "M", BLUE, 0, 24)}
    ${text(218, 314, "BM", EMERALD, 16)}
    ${text(422, 314, "MC", EMERALD, 16)}
    ${text(318, 180, "AM", BLUE, 20, "start")}
    ${text(70, 58, "M は BC の中点。中線 AM を見る", SLATE, 16, "start")}
    ${text(320, 336, "BM = MC", EMERALD, 16)}
  `;
  return base(c, "中線の長さ");
}

function spatialSection() {
  const c = `
    <polygon points="170,278 440,278 530,220 270,220" fill="#e0f2fe" stroke="${SLATE}" stroke-width="3"/>
    <polygon points="170,278 320,62 530,220" fill="#ffffff" opacity="0.6" stroke="${SLATE}" stroke-width="3"/>
    ${line(320, 62, 350, 248, ROSE, 5)}
    ${line(270, 220, 440, 278, BLUE, 4)}
    ${line(320, 62, 270, 220, AMBER, 3, "7 6")}
    ${line(320, 62, 440, 278, AMBER, 3, "7 6")}
    ${dot(320, 62, "A", ROSE, 0, -12)}
    ${dot(350, 248, "O", ROSE, 20, 2)}
    ${text(76, 58, "高さを含む断面を取り出す", SLATE, 16, "start")}
    ${text(374, 156, "AO", ROSE, 18, "start")}
    ${text(412, 316, "断面の直角三角形", BLUE, 16)}
  `;
  return base(c, "空間図形の断面");
}

function auxiliaryLineChoice() {
  const c = `
    <g transform="translate(38 72)">
      <polygon points="28,182 166,182 84,34" fill="#dbeafe" stroke="${SLATE}" stroke-width="2.5"/>
      ${line(84, 34, 84, 182, ROSE, 4)}
      ${text(98, 116, "高さ", ROSE, 14, "start")}
    </g>
    <g transform="translate(238 72)">
      <polygon points="20,182 176,182 98,34" fill="#ecfeff" stroke="${SLATE}" stroke-width="2.5"/>
      <circle cx="98" cy="122" r="42" fill="none" stroke="${CYAN}" stroke-width="4"/>
      ${line(98, 122, 98, 164, CYAN, 3)}
      ${text(122, 126, "半径", CYAN, 14, "start")}
    </g>
    <g transform="translate(438 72)">
      <polygon points="20,182 176,182 86,34" fill="#f5f3ff" stroke="${SLATE}" stroke-width="2.5"/>
      ${line(86, 34, 98, 182, VIOLET, 4)}
      ${line(20, 182, 176, 182, BLUE, 2)}
      ${text(112, 112, "中線/二等分線", VIOLET, 13, "start")}
    </g>
    ${text(64, 48, "条件語から補助線を選ぶ", SLATE, 16, "start")}
    ${text(122, 300, "面積・距離", ROSE, 15)}
    ${text(326, 300, "内心・外心", CYAN, 15)}
    ${text(526, 300, "中点・比", VIOLET, 15)}
  `;
  return base(c, "補助線選択の比較");
}

const renderers: Record<GeometryDiagramType, () => string> = {
  "altitude-basic": altitudeBasic,
  "area-height-reverse": areaHeightReverse,
  "trig-height": trigHeight,
  "incenter-incircle": incenterIncircle,
  "circumcenter-circumcircle": circumcenterCircumcircle,
  "centroid-median": centroidMedian,
  "orthocenter-altitudes": orthocenterAltitudes,
  "angle-bisector-ratio": angleBisectorRatio,
  "angle-bisector-length": angleBisectorLength,
  "median-length": medianLength,
  "spatial-section": spatialSection,
  "auxiliary-line-choice": auxiliaryLineChoice,
};

export function createGeometryDiagramSvg(type: GeometryDiagramType): string {
  return renderers[type]();
}

export function createGeometryDiagramDataUri(type: GeometryDiagramType): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(createGeometryDiagramSvg(type))}`;
}

