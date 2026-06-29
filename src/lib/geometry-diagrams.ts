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
    alt: "三角形の頂点から底辺の直線へ垂線を下ろし、高さを強調した模式図",
    point: "高さは辺そのものではなく、頂点から底辺の直線までの垂直距離として見る。",
  },
  "area-height-reverse": {
    title: "面積から高さを逆算",
    alt: "底辺と面積から高さを逆算する三角形の模式図",
    point: "面積と底辺が見えたら、まず高さを逆算できないかを疑う。",
  },
  "trig-height": {
    title: "三角比で高さを出す",
    alt: "斜辺と角からサインで高さを作る直角三角形の模式図",
    point: "高さは角の向かい側なので sin、底辺方向の射影は cos と読む。",
  },
  "incenter-incircle": {
    title: "内心と内接円",
    alt: "内心から三辺へ等しい半径を下ろした内接円の模式図",
    point: "内心は三辺から等距離。各辺へ下ろした垂線が内接円の半径になる。",
  },
  "circumcenter-circumcircle": {
    title: "外心と外接円",
    alt: "外心から三頂点へ等しい半径を引いた外接円の模式図",
    point: "外心は三頂点から等距離。半径は辺ではなく頂点へ向かう。",
  },
  "centroid-median": {
    title: "重心と中線",
    alt: "三角形の中線と重心の二対一の向きを示した模式図",
    point: "重心は中線の交点。2:1 は頂点側が長い向きで読む。",
  },
  "orthocenter-altitudes": {
    title: "垂心と高さ",
    alt: "三角形の三本の高さが垂心で交わる模式図",
    point: "垂心は高さの交点。辺の中点へ向かう線や垂直二等分線とは別物。",
  },
  "angle-bisector-ratio": {
    title: "角の二等分線定理",
    alt: "角の二等分線が対辺を隣接二辺の比に分ける模式図",
    point: "対辺の分割比は、二等分した角をはさむ二辺の比に対応する。",
  },
  "angle-bisector-length": {
    title: "角の二等分線の長さ",
    alt: "角の二等分線の長さを隣接二辺と対辺の分割から見る模式図",
    point: "まず二等分線定理で分割を確認し、その後に二等分線の長さを見る。",
  },
  "median-length": {
    title: "中線の長さ",
    alt: "頂点から対辺の中点へ引いた中線の模式図",
    point: "中線は対辺の中点へ向かう線。角を二等分しているとは限らない。",
  },
  "spatial-section": {
    title: "空間図形の断面",
    alt: "立体を高さを含む平面で切り、断面の直角三角形へ戻す模式図",
    point: "立体のまま計算せず、求めたい高さを含む断面の直角三角形へ戻す。",
  },
  "auxiliary-line-choice": {
    title: "補助線選択の比較",
    alt: "高さ、半径、中線と二等分線を条件から選ぶ比較模式図",
    point: "面積なら高さ、等距離なら半径、中点や比なら中線・二等分線を優先して疑う。",
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

function rightAngle(x: number, y: number, orientation: "br" | "tl" = "tl", color = SLATE) {
  const s = 14;
  if (orientation === "br") {
    return `<path d="M ${x} ${y - s} L ${x + s} ${y - s} L ${x + s} ${y}" fill="none" stroke="${color}" stroke-width="2"/>`;
  }
  return `<path d="M ${x - s} ${y} L ${x - s} ${y - s} L ${x} ${y - s}" fill="none" stroke="${color}" stroke-width="2"/>`;
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
    <polygon points="116,288 524,288 252,72" fill="#dbeafe" opacity="0.5" stroke="${SLATE}" stroke-width="3"/>
    ${line(252, 72, 252, 288, ROSE, 5)}
    ${rightAngle(252, 288)}
    ${dot(252, 72, "A", ROSE, 0, -14)}
    ${dot(116, 288, "B", SLATE, -18, 18)}
    ${dot(524, 288, "C", SLATE, 18, 18)}
    ${dot(252, 288, "H", ROSE, 0, 24)}
    ${text(318, 268, "底辺 BC", BLUE, 16)}
    ${text(278, 178, "高さ AH", ROSE, 18, "start")}
    ${text(66, 56, "見る線：頂点から底辺の直線へ垂直", SLATE, 16, "start")}
  `;
  return base(c, "垂線と高さ");
}

function areaHeightReverse() {
  const c = `
    <polygon points="104,286 536,286 430,84" fill="#ecfdf5" opacity="0.75" stroke="${SLATE}" stroke-width="3"/>
    ${line(430, 84, 430, 286, EMERALD, 5)}
    ${rightAngle(430, 286)}
    ${dot(430, 84, "A", EMERALD, 12, -10)}
    ${dot(430, 286, "H", EMERALD, 0, 24)}
    ${text(320, 316, "底辺 a", BLUE, 18)}
    ${text(456, 188, "高さ h", EMERALD, 18, "start")}
    ${text(190, 152, "面積 S", AMBER, 18)}
    ${text(92, 58, "面積と底辺が見えたら  h = 2S ÷ a", SLATE, 16, "start")}
  `;
  return base(c, "面積から高さを逆算");
}

function trigHeight() {
  const c = `
    <polygon points="118,286 502,286 502,86" fill="#eef2ff" opacity="0.75" stroke="${SLATE}" stroke-width="3"/>
    ${line(502, 86, 502, 286, ROSE, 5)}
    ${line(118, 286, 502, 286, BLUE, 4)}
    ${line(118, 286, 502, 86, VIOLET, 4)}
    ${rightAngle(502, 286)}
    <path d="M166 286 A52 52 0 0 1 186 246" fill="none" stroke="${AMBER}" stroke-width="4"/>
    ${text(192, 272, "θ", AMBER, 20)}
    ${text(314, 174, "斜辺 a", VIOLET, 18)}
    ${text(528, 190, "h = a sin θ", ROSE, 18, "start")}
    ${text(300, 314, "a cos θ", BLUE, 16)}
    ${text(80, 58, "高さ方向は sin、底辺方向は cos", SLATE, 16, "start")}
  `;
  return base(c, "三角比で高さを出す");
}

function incenterIncircle() {
  const c = `
    <polygon points="120,292 526,292 314,70" fill="#f0f9ff" opacity="0.85" stroke="${SLATE}" stroke-width="3"/>
    <circle cx="318" cy="215" r="62" fill="#ecfeff" stroke="${CYAN}" stroke-width="4"/>
    ${line(318, 215, 318, 277, CYAN, 4)}
    ${line(318, 215, 252, 170, CYAN, 3, "7 6")}
    ${line(318, 215, 386, 170, CYAN, 3, "7 6")}
    ${rightAngle(318, 277)}
    ${dot(318, 215, "I", CYAN, 0, -12)}
    ${text(342, 254, "r", CYAN, 18, "start")}
    ${text(100, 58, "内心 I：三辺から等距離", SLATE, 16, "start")}
    ${text(432, 232, "内接円", CYAN, 18, "start")}
  `;
  return base(c, "内心と内接円");
}

function circumcenterCircumcircle() {
  const c = `
    <circle cx="320" cy="188" r="142" fill="#eef2ff" stroke="${VIOLET}" stroke-width="4"/>
    <polygon points="320,46 184,230 456,230" fill="#ffffff" opacity="0.84" stroke="${SLATE}" stroke-width="3"/>
    ${line(320, 188, 320, 46, VIOLET, 3)}
    ${line(320, 188, 184, 230, VIOLET, 3)}
    ${line(320, 188, 456, 230, VIOLET, 3)}
    ${dot(320, 188, "O", VIOLET, 0, -12)}
    ${dot(320, 46, "A", SLATE, 0, -12)}
    ${dot(184, 230, "B", SLATE, -18, 18)}
    ${dot(456, 230, "C", SLATE, 20, 14)}
    ${text(78, 58, "外心 O：三頂点から等距離", SLATE, 16, "start")}
    ${text(372, 162, "R", VIOLET, 18)}
  `;
  return base(c, "外心と外接円");
}

function centroidMedian() {
  const c = `
    <polygon points="112,292 530,292 278,70" fill="#ecfdf5" opacity="0.75" stroke="${SLATE}" stroke-width="3"/>
    ${line(278, 70, 321, 292, EMERALD, 5)}
    ${line(112, 292, 530, 292, BLUE, 3)}
    ${dot(278, 70, "A", SLATE, 0, -14)}
    ${dot(321, 292, "M", BLUE, 0, 24)}
    ${dot(307, 218, "G", EMERALD, 22, 4)}
    ${text(294, 150, "2", EMERALD, 20)}
    ${text(316, 260, "1", EMERALD, 20)}
    ${text(82, 58, "重心 G は中線を頂点側から 2:1 に分ける", SLATE, 16, "start")}
    ${text(414, 312, "BM = MC", BLUE, 16)}
  `;
  return base(c, "重心と中線");
}

function orthocenterAltitudes() {
  const c = `
    <polygon points="124,292 520,292 314,70" fill="#fff7ed" opacity="0.75" stroke="${SLATE}" stroke-width="3"/>
    ${line(314, 70, 314, 292, ROSE, 4)}
    ${line(124, 292, 365, 58, ROSE, 4)}
    ${line(520, 292, 256, 56, ROSE, 4)}
    ${rightAngle(314, 292)}
    ${dot(314, 116, "H", ROSE, 22, 4)}
    ${text(78, 58, "垂心 H：三本の高さの交点", SLATE, 16, "start")}
    ${text(338, 154, "高さ", ROSE, 18, "start")}
  `;
  return base(c, "垂心と高さ");
}

function angleBisectorRatio() {
  const c = `
    <polygon points="118,292 526,292 292,66" fill="#f5f3ff" opacity="0.75" stroke="${SLATE}" stroke-width="3"/>
    ${line(292, 66, 286, 292, VIOLET, 5)}
    <path d="M258 100 A58 58 0 0 1 292 124" fill="none" stroke="${AMBER}" stroke-width="4"/>
    <path d="M292 124 A58 58 0 0 1 326 102" fill="none" stroke="${AMBER}" stroke-width="4"/>
    ${dot(292, 66, "A", VIOLET, 0, -14)}
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
    <path d="M270 102 A58 58 0 0 1 302 126" fill="none" stroke="${AMBER}" stroke-width="4"/>
    <path d="M302 126 A58 58 0 0 1 334 104" fill="none" stroke="${AMBER}" stroke-width="4"/>
    ${dot(302, 64, "A", ROSE, 0, -14)}
    ${dot(304, 292, "D", ROSE, 0, 24)}
    ${text(310, 178, "AD", ROSE, 20, "start")}
    ${text(214, 154, "AB", SLATE, 16)}
    ${text(422, 154, "AC", SLATE, 16)}
    ${text(202, 314, "BD", BLUE, 17)}
    ${text(414, 314, "DC", BLUE, 17)}
    ${text(62, 58, "AD の長さは AB・AC と BD・DC から見る", ROSE, 18, "start")}
  `;
  return base(c, "角の二等分線の長さ");
}

function medianLength() {
  const c = `
    <polygon points="110,292 530,292 318,66" fill="#eff6ff" opacity="0.75" stroke="${SLATE}" stroke-width="3"/>
    ${line(318, 66, 320, 292, BLUE, 5)}
    ${line(110, 292, 530, 292, SLATE, 3)}
    ${line(305, 284, 313, 300, EMERALD, 2)}
    ${line(327, 284, 335, 300, EMERALD, 2)}
    ${dot(318, 66, "A", SLATE, 0, -14)}
    ${dot(320, 292, "M", BLUE, 0, 24)}
    ${text(218, 314, "BM", EMERALD, 16)}
    ${text(422, 314, "MC", EMERALD, 16)}
    ${text(326, 180, "AM", BLUE, 20, "start")}
    ${text(70, 58, "M は BC の中点。AM が中線", SLATE, 16, "start")}
    ${text(320, 336, "BM = MC", EMERALD, 16)}
  `;
  return base(c, "中線の長さ");
}

function spatialSection() {
  const c = `
    <polygon points="170,278 440,278 530,220 270,220" fill="#e0f2fe" stroke="${SLATE}" stroke-width="3"/>
    <polygon points="170,278 320,62 530,220" fill="#ffffff" opacity="0.62" stroke="${SLATE}" stroke-width="3"/>
    <polygon points="270,220 350,248 320,62" fill="#fee2e2" opacity="0.62" stroke="${ROSE}" stroke-width="3"/>
    ${line(320, 62, 350, 248, ROSE, 5)}
    ${line(270, 220, 440, 278, BLUE, 4)}
    ${line(320, 62, 270, 220, AMBER, 3, "7 6")}
    ${line(320, 62, 440, 278, AMBER, 3, "7 6")}
    ${dot(320, 62, "A", ROSE, 0, -12)}
    ${dot(350, 248, "H", ROSE, 20, 2)}
    ${text(76, 58, "高さを含む断面を取り出す", SLATE, 16, "start")}
    ${text(374, 156, "高さ AH", ROSE, 18, "start")}
    ${text(412, 316, "断面の直角三角形", BLUE, 16)}
  `;
  return base(c, "空間図形の断面");
}

function auxiliaryLineChoice() {
  const c = `
    <g transform="translate(38 72)">
      <polygon points="28,182 166,182 84,34" fill="#dbeafe" stroke="${SLATE}" stroke-width="2.5"/>
      ${line(84, 34, 84, 182, ROSE, 4)}
      ${rightAngle(84, 182)}
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
