// SVG 概念図コンポーネント — Phase 20.0
// 二次関数の概念を直感的に理解できる図解。数学的に完全精密でなくてよい。
// display math delimiter は使わない。ラベルは plain text。

import type { DiagramType } from "@/types/course";

// ─── 共通スタイル ────────────────────────────────────────────────────────────

const AXIS_COLOR = "#94a3b8";  // slate-400
const BLUE = "#2563eb";
const VIOLET = "#7c3aed";
const ROSE = "#e11d48";
const EMERALD = "#059669";
const AMBER = "#d97706";
const GRAY = "#94a3b8";
const TEXT_COLOR = "#475569";  // slate-600

// ─── 放物線基本図 (y = x²) ──────────────────────────────────────────────────

function ParabolaBasic() {
  // Coordinate: x_svg = 100 + 35*x, y_svg = 130 - 25*y
  // x range: [-2, 2], y range: [0, 4]
  // vertex at (100, 130) = math (0, 0)
  const pts = "30,30 47,74 65,105 82,124 100,130 117,124 135,105 152,74 170,30";
  return (
    <svg viewBox="0 0 200 165" width="100%" aria-label="放物線 y=x² の基本形">
      {/* X 軸 */}
      <line x1="12" y1="130" x2="186" y2="130" stroke={AXIS_COLOR} strokeWidth="1.2" />
      <polygon points="186,130 179,127 179,133" fill={AXIS_COLOR} />
      {/* Y 軸 */}
      <line x1="100" y1="14" x2="100" y2="152" stroke={AXIS_COLOR} strokeWidth="1.2" />
      <polygon points="100,14 97,21 103,21" fill={AXIS_COLOR} />
      {/* 軸ラベル */}
      <text x="188" y="134" fontSize="11" fill={TEXT_COLOR} fontFamily="sans-serif">x</text>
      <text x="104" y="13" fontSize="11" fill={TEXT_COLOR} fontFamily="sans-serif">y</text>
      {/* 目盛り */}
      <line x1="65" y1="127" x2="65" y2="133" stroke={AXIS_COLOR} strokeWidth="1" />
      <text x="62" y="144" fontSize="9" fill={GRAY} textAnchor="middle">-1</text>
      <line x1="135" y1="127" x2="135" y2="133" stroke={AXIS_COLOR} strokeWidth="1" />
      <text x="135" y="144" fontSize="9" fill={GRAY} textAnchor="middle">1</text>
      <line x1="97" y1="105" x2="103" y2="105" stroke={AXIS_COLOR} strokeWidth="1" />
      <text x="90" y="108" fontSize="9" fill={GRAY} textAnchor="middle">1</text>
      {/* 放物線 */}
      <polyline points={pts} fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* 頂点 */}
      <circle cx="100" cy="130" r="3.5" fill={BLUE} />
      {/* 原点ラベル */}
      <text x="106" y="144" fontSize="9" fill={TEXT_COLOR} fontFamily="sans-serif">O</text>
      {/* 関数ラベル */}
      <text x="156" y="47" fontSize="10" fill={BLUE} fontFamily="sans-serif" fontStyle="italic">y = x²</text>
      {/* a &gt; 0 注記 */}
      <text x="8" y="20" fontSize="9" fill={BLUE}>a &gt; 0: 下に凸（上に開く）</text>
    </svg>
  );
}

// ─── 頂点と軸 (y = (x-2)² - 1) ─────────────────────────────────────────────

function VertexAxis() {
  // x_svg = 100 + 33*(x-2), y_svg = 110 - 22*(y+1)
  // vertex (2,-1) → (100, 110)
  // x=0: (34,22), x=1: (67,88), x=1.5: (83,104), x=2: (100,110), x=2.5: (116,104), x=3: (133,88), x=4: (166,22)
  const pts = "34,22 67,88 83,104 100,110 116,104 133,88 166,22";
  return (
    <svg viewBox="0 0 200 145" width="100%" aria-label="頂点と軸の対称軸">
      {/* X 軸 (y=0 → y_svg = 110 - 22*1 = 88) */}
      <line x1="10" y1="88" x2="185" y2="88" stroke={AXIS_COLOR} strokeWidth="1.2" />
      <polygon points="185,88 178,85 178,91" fill={AXIS_COLOR} />
      {/* Y 軸 (x=0 → x_svg=34) */}
      <line x1="34" y1="12" x2="34" y2="135" stroke={AXIS_COLOR} strokeWidth="1.2" />
      <polygon points="34,12 31,19 37,19" fill={AXIS_COLOR} />
      <text x="187" y="92" fontSize="10" fill={TEXT_COLOR}>x</text>
      <text x="37" y="11" fontSize="10" fill={TEXT_COLOR}>y</text>
      {/* 対称軸 (x=2 → x_svg=100) */}
      <line x1="100" y1="10" x2="100" y2="135" stroke={VIOLET} strokeWidth="1.2" strokeDasharray="4,3" />
      <text x="102" y="22" fontSize="9" fill={VIOLET}>軸 x=2</text>
      {/* 放物線 */}
      <polyline points={pts} fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* 頂点 */}
      <circle cx="100" cy="110" r="4" fill={ROSE} />
      {/* 頂点ラベル */}
      <text x="105" y="117" fontSize="9" fill={ROSE}>頂点 (2, -1)</text>
      {/* 最小値の横線 */}
      <line x1="34" y1="110" x2="97" y2="110" stroke={ROSE} strokeWidth="0.8" strokeDasharray="3,2" />
      <text x="2" y="114" fontSize="8" fill={ROSE}>最小</text>
      {/* 関数ラベル */}
      <text x="148" y="34" fontSize="9" fill={BLUE}>y=(x-2)²-1</text>
    </svg>
  );
}

// ─── 平方完成による移動 ──────────────────────────────────────────────────────

function CompletingSquareShift() {
  // x_svg = 70 + 28*x, y_svg = 100 - 20*y
  // y=x²: x in [-1,2] (gray) — vertex (70,100) = math (0,0)
  // y=(x-2)²-3: x in [0,4] (blue) — vertex (126,160) = math (2,-3)
  const grayPts = "42,80 70,100 98,80 126,20";   // x=-1,0,1,2
  const bluePts = "70,80 98,140 112,155 126,160 140,155 154,140 182,80"; // x=0..4
  return (
    <svg viewBox="0 0 220 185" width="100%" aria-label="平方完成による移動イメージ">
      {/* X 軸 (y=0 → y_svg=100) */}
      <line x1="8" y1="100" x2="210" y2="100" stroke={AXIS_COLOR} strokeWidth="1.2" />
      <polygon points="210,100 203,97 203,103" fill={AXIS_COLOR} />
      {/* Y 軸 (x=0 → x_svg=70) */}
      <line x1="70" y1="10" x2="70" y2="178" stroke={AXIS_COLOR} strokeWidth="1.2" />
      <polygon points="70,10 67,17 73,17" fill={AXIS_COLOR} />
      <text x="212" y="104" fontSize="10" fill={TEXT_COLOR}>x</text>
      <text x="74" y="9" fontSize="10" fill={TEXT_COLOR}>y</text>
      {/* 基の放物線 y=x² (グレー) */}
      <polyline points={grayPts} fill="none" stroke={GRAY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5,2" />
      <circle cx="70" cy="100" r="3" fill={GRAY} />
      <text x="44" y="97" fontSize="9" fill={GRAY}>頂点(0,0)</text>
      <text x="125" y="17" fontSize="9" fill={GRAY}>y=x²</text>
      {/* 移動後 y=(x-2)²-3 (青) */}
      <polyline points={bluePts} fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="126" cy="160" r="4" fill={BLUE} />
      <text x="131" y="167" fontSize="9" fill={BLUE}>頂点(2,-3)</text>
      <text x="162" y="86" fontSize="9" fill={BLUE}>y=(x-2)²-3</text>
      {/* 移動の矢印 */}
      <line x1="70" y1="100" x2="121" y2="158" stroke={AMBER} strokeWidth="1.2" strokeDasharray="3,2" markerEnd="url(#arrow-amber)" />
      <defs>
        <marker id="arrow-amber" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill={AMBER} />
        </marker>
      </defs>
      {/* 矢印ラベル */}
      <text x="83" y="120" fontSize="9" fill={AMBER}>右へ2</text>
      <text x="96" y="145" fontSize="9" fill={AMBER}>下へ3</text>
    </svg>
  );
}

// ─── 定義域つき最大最小 ──────────────────────────────────────────────────────

function DomainMaxMin() {
  // y = x²-4x+5 = (x-2)²+1, vertex (2,1)
  // x_svg = 50 + 30*x, y_svg = 130 - 20*y
  // domain [0,4]: x_svg 50..170
  // x=0: (50,30), x=1: (80,90), x=2: (110,110)vertex, x=3: (140,90), x=4: (170,30)
  const pts = "50,30 80,90 110,110 140,90 170,30";
  return (
    <svg viewBox="0 0 230 155" width="100%" aria-label="定義域つき最大最小">
      {/* X 軸 */}
      <line x1="18" y1="130" x2="205" y2="130" stroke={AXIS_COLOR} strokeWidth="1.2" />
      <polygon points="205,130 198,127 198,133" fill={AXIS_COLOR} />
      {/* Y 軸 */}
      <line x1="30" y1="12" x2="30" y2="145" stroke={AXIS_COLOR} strokeWidth="1.2" />
      <polygon points="30,12 27,19 33,19" fill={AXIS_COLOR} />
      <text x="207" y="134" fontSize="10" fill={TEXT_COLOR}>x</text>
      <text x="34" y="11" fontSize="10" fill={TEXT_COLOR}>y</text>
      {/* 定義域ハイライト (x=0..4) */}
      <line x1="50" y1="130" x2="170" y2="130" stroke={EMERALD} strokeWidth="3" strokeLinecap="round" />
      {/* 定義域端の垂線 */}
      <line x1="50" y1="30" x2="50" y2="130" stroke={EMERALD} strokeWidth="0.8" strokeDasharray="3,2" />
      <line x1="170" y1="30" x2="170" y2="130" stroke={EMERALD} strokeWidth="0.8" strokeDasharray="3,2" />
      <text x="46" y="143" fontSize="9" fill={EMERALD} textAnchor="middle">0</text>
      <text x="170" y="143" fontSize="9" fill={EMERALD} textAnchor="middle">4</text>
      {/* 放物線 */}
      <polyline points={pts} fill="none" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* 最小値 — 頂点 */}
      <circle cx="110" cy="110" r="4.5" fill={BLUE} />
      <text x="115" y="108" fontSize="9" fill={BLUE}>最小値 1</text>
      <text x="113" y="118" fontSize="9" fill={BLUE}>(x=2)</text>
      {/* 最大値 — 両端 */}
      <circle cx="50" cy="30" r="4.5" fill={ROSE} />
      <circle cx="170" cy="30" r="4.5" fill={ROSE} />
      <text x="8" y="28" fontSize="9" fill={ROSE}>最大値</text>
      <text x="8" y="38" fontSize="9" fill={ROSE}>5</text>
      {/* 定義域ラベル */}
      <text x="95" y="148" fontSize="9" fill={EMERALD}>定義域 [0, 4]</text>
    </svg>
  );
}

// ─── 軸の位置と場合分け（3ケース横並び） ──────────────────────────────────

function MiniCase({
  axisX,       // 対称軸の x 座標（ローカル）
  domA,        // 定義域左端
  domB,        // 定義域右端
  vx,          // 放物線頂点 x
  caseLabel,   // ケース説明テキスト
  minAt,       // 最小値の場所ラベル
  maxAt,       // 最大値の場所ラベル
}: {
  axisX: number; domA: number; domB: number; vx: number;
  caseLabel: string; minAt: string; maxAt: string;
}) {
  const AY = 95; // x 軸 y 座標
  const sc = 7;  // 放物線スケール
  // 放物線 polyline: vertex at (vx, AY), going up
  const pts = [
    [vx - sc * 2.5, AY - sc * 6.25],
    [vx - sc * 2, AY - sc * 4],
    [vx - sc * 1.5, AY - sc * 2.25],
    [vx - sc, AY - sc],
    [vx - sc * 0.5, AY - sc * 0.25],
    [vx, AY],
    [vx + sc * 0.5, AY - sc * 0.25],
    [vx + sc, AY - sc],
    [vx + sc * 1.5, AY - sc * 2.25],
    [vx + sc * 2, AY - sc * 4],
    [vx + sc * 2.5, AY - sc * 6.25],
  ].filter((p) => p[0] >= -5 && p[0] <= 115).map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  return (
    <g>
      {/* x 軸 */}
      <line x1="2" y1={AY} x2="108" y2={AY} stroke={AXIS_COLOR} strokeWidth="0.9" />
      {/* 定義域ハイライト */}
      <line x1={domA} y1={AY} x2={domB} y2={AY} stroke={EMERALD} strokeWidth="3" strokeLinecap="round" />
      {/* 定義域端マーカー */}
      <circle cx={domA} cy={AY} r="2.5" fill={ROSE} />
      <circle cx={domB} cy={AY} r="2.5" fill={ROSE} />
      {/* 対称軸 */}
      <line x1={axisX} y1="8" x2={axisX} y2={AY} stroke={VIOLET} strokeWidth="1.1" strokeDasharray="3,2" />
      <text x={axisX} y="7" fontSize="8" fill={VIOLET} textAnchor="middle">軸</text>
      {/* 放物線 */}
      <polyline points={pts} fill="none" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* 定義域ラベル */}
      <text x={(domA + domB) / 2} y={AY + 11} fontSize="7.5" fill={EMERALD} textAnchor="middle">定義域</text>
      {/* 最小・最大ラベル */}
      <text x={domA} y={AY + 21} fontSize="7" fill={ROSE} textAnchor="middle">{minAt}</text>
      <text x={domB} y={AY + 21} fontSize="7" fill={ROSE} textAnchor="middle">{maxAt}</text>
      {/* ケース説明 */}
      <text x="55" y="125" fontSize="8" fill={VIOLET} textAnchor="middle">{caseLabel}</text>
    </g>
  );
}

function AxisPositionCases() {
  return (
    <svg viewBox="0 0 345 130" width="100%" aria-label="軸の位置による場合分け（3ケース）">
      {/* 区切り線 */}
      <line x1="115" y1="3" x2="115" y2="127" stroke="#e2e8f0" strokeWidth="1" />
      <line x1="230" y1="3" x2="230" y2="127" stroke="#e2e8f0" strokeWidth="1" />
      {/* ケース1: 軸が左外 */}
      <g transform="translate(3,0)">
        <MiniCase axisX={18} domA={38} domB={88} vx={18}
          caseLabel="ケース1: 軸が左外"
          minAt="最小" maxAt="最大" />
      </g>
      {/* ケース2: 軸が内側 */}
      <g transform="translate(118,0)">
        <MiniCase axisX={55} domA={20} domB={90} vx={55}
          caseLabel="ケース2: 軸が内側"
          minAt="端点" maxAt="端点" />
        {/* 頂点マーカー */}
        <circle cx="55" cy="95" r="3.5" fill={BLUE} />
        <text x="60" y="92" fontSize="7" fill={BLUE}>最小</text>
      </g>
      {/* ケース3: 軸が右外 */}
      <g transform="translate(233,0)">
        <MiniCase axisX={90} domA={12} domB={72} vx={90}
          caseLabel="ケース3: 軸が右外"
          minAt="最大" maxAt="最小" />
      </g>
    </svg>
  );
}

// ─── 場合分けフローチャート ───────────────────────────────────────────────────

function CaseSplitFlow() {
  const boxStyle = {
    fill: "white",
    stroke: "#cbd5e1",
    strokeWidth: "1.2",
  };
  const arrowStyle = {
    stroke: AXIS_COLOR,
    strokeWidth: "1.2",
    markerEnd: "url(#flow-arrow)",
  };
  return (
    <svg viewBox="0 0 320 190" width="100%" aria-label="場合分けフローチャート">
      <defs>
        <marker id="flow-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill={AXIS_COLOR} />
        </marker>
      </defs>
      {/* スタートボックス */}
      <rect x="90" y="4" width="140" height="30" rx="6" {...boxStyle} fill="#eff6ff" stroke="#bfdbfe" />
      <text x="160" y="16" fontSize="9.5" fill={BLUE} textAnchor="middle" fontWeight="bold">軸の位置を確認</text>
      <text x="160" y="28" fontSize="8.5" fill={BLUE} textAnchor="middle">（軸 x=p、定義域 [a,b]）</text>
      {/* 下矢印 */}
      <line x1="160" y1="34" x2="160" y2="48" {...arrowStyle} />
      {/* ひし形 1: p < a? */}
      <polygon points="160,48 210,68 160,88 110,68" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.2" />
      <text x="160" y="64" fontSize="9" fill={VIOLET} textAnchor="middle">p &lt; a ?</text>
      <text x="160" y="76" fontSize="8" fill={VIOLET} textAnchor="middle">（軸が左外）</text>
      {/* Yes → 左 */}
      <line x1="110" y1="68" x2="55" y2="68" {...arrowStyle} />
      <text x="80" y="62" fontSize="8" fill={GRAY}>Yes</text>
      <rect x="2" y="54" width="53" height="30" rx="4" {...boxStyle} fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="28" y="66" fontSize="8.5" fill={EMERALD} textAnchor="middle">左端 x=a</text>
      <text x="28" y="77" fontSize="8.5" fill={EMERALD} textAnchor="middle">で最小</text>
      {/* No → 下 */}
      <line x1="160" y1="88" x2="160" y2="104" {...arrowStyle} />
      <text x="165" y="98" fontSize="8" fill={GRAY}>No</text>
      {/* ひし形 2: a ≤ p ≤ b? */}
      <polygon points="160,104 215,124 160,144 105,124" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.2" />
      <text x="160" y="120" fontSize="9" fill={VIOLET} textAnchor="middle">a ≤ p ≤ b ?</text>
      <text x="160" y="132" fontSize="8" fill={VIOLET} textAnchor="middle">（軸が内側）</text>
      {/* Yes → 左 */}
      <line x1="105" y1="124" x2="55" y2="124" {...arrowStyle} />
      <text x="78" y="118" fontSize="8" fill={GRAY}>Yes</text>
      <rect x="2" y="110" width="53" height="30" rx="4" {...boxStyle} fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="28" y="122" fontSize="8.5" fill={EMERALD} textAnchor="middle">頂点 (p,q)</text>
      <text x="28" y="133" fontSize="8.5" fill={EMERALD} textAnchor="middle">が最小</text>
      {/* No → 右 */}
      <line x1="215" y1="124" x2="265" y2="124" {...arrowStyle} />
      <text x="237" y="118" fontSize="8" fill={GRAY}>No</text>
      <rect x="265" y="110" width="53" height="30" rx="4" {...boxStyle} fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="291" y="122" fontSize="8.5" fill={EMERALD} textAnchor="middle">右端 x=b</text>
      <text x="291" y="133" fontSize="8.5" fill={EMERALD} textAnchor="middle">で最小</text>
      {/* 注記 */}
      <text x="160" y="162" fontSize="8" fill="#64748b" textAnchor="middle">※ a&gt;0（下に凸）のときの最小値。最大値は軸から遠い端点。</text>
    </svg>
  );
}

// ─── ディスパッチャー ────────────────────────────────────────────────────────

export function CourseDiagramBlock({
  diagramType,
  caption,
}: {
  diagramType: DiagramType;
  caption?: string;
}) {
  const diagram = (() => {
    switch (diagramType) {
      case "parabola-basic":          return <ParabolaBasic />;
      case "vertex-axis":             return <VertexAxis />;
      case "completing-square-shift": return <CompletingSquareShift />;
      case "domain-max-min":          return <DomainMaxMin />;
      case "axis-position-cases":     return <AxisPositionCases />;
      case "case-split-flow":         return <CaseSplitFlow />;
      default:                        return null;
    }
  })();

  if (!diagram) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-sky-200 bg-sky-50">
      <div className="p-3">{diagram}</div>
      {caption && (
        <div className="border-t border-sky-200 bg-white px-3 py-1.5 text-[10px] text-slate-500">
          {caption}
        </div>
      )}
    </div>
  );
}
