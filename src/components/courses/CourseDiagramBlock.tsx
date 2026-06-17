// SVG 概念図コンポーネント — Phase 20.1.5
// 二次関数の概念を直感的に理解できる図解。
// ラベルは plain text。caption は CourseBodyRenderer でインライン数式対応。

import type { DiagramType } from "@/types/course";
import { CourseBodyRenderer } from "./CourseBodyRenderer";

// ─── 共通スタイル ────────────────────────────────────────────────────────────

const AXIS_COLOR = "#94a3b8";
const BLUE = "#2563eb";
const VIOLET = "#7c3aed";
const ROSE = "#e11d48";
const EMERALD = "#059669";
const AMBER = "#d97706";
const GRAY = "#94a3b8";
const TEXT_COLOR = "#475569";

function AxisLabel({
  x,
  y,
  children,
  fill = TEXT_COLOR,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  fill?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize="9"
      fill={fill}
      textAnchor={anchor}
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    >
      {children}
    </text>
  );
}

// ─── 放物線基本図 ────────────────────────────────────────────────────────────

function ParabolaBasic() {
  return (
    <svg viewBox="0 0 240 180" width="100%" aria-label="放物線 y=x² の基本形">
      <rect x="0" y="0" width="240" height="180" rx="12" fill="#f8fafc" />

      {/* grid */}
      {[50, 90, 130, 170, 210].map((x) => (
        <line key={`vx-${x}`} x1={x} y1="18" x2={x} y2="155" stroke="#e2e8f0" strokeWidth="0.8" />
      ))}
      {[35, 70, 105, 140].map((y) => (
        <line key={`hy-${y}`} x1="18" y1={y} x2="220" y2={y} stroke="#e2e8f0" strokeWidth="0.8" />
      ))}

      {/* axes */}
      <line x1="20" y1="140" x2="220" y2="140" stroke={AXIS_COLOR} strokeWidth="1.3" />
      <polygon points="220,140 213,137 213,143" fill={AXIS_COLOR} />
      <line x1="120" y1="18" x2="120" y2="158" stroke={AXIS_COLOR} strokeWidth="1.3" />
      <polygon points="120,18 117,25 123,25" fill={AXIS_COLOR} />

      <AxisLabel x={224} y={144}>x</AxisLabel>
      <AxisLabel x={124} y={17}>y</AxisLabel>
      <AxisLabel x={127} y={154}>O</AxisLabel>

      {/* smooth parabola */}
      <path
        d="M 48 34 C 70 92, 92 140, 120 140 C 148 140, 170 92, 192 34"
        fill="none"
        stroke={BLUE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* vertex */}
      <circle cx="120" cy="140" r="4.5" fill={BLUE} />
      <AxisLabel x={126} y={134} fill={BLUE}>頂点</AxisLabel>

      {/* symmetry */}
      <line x1="120" y1="28" x2="120" y2="158" stroke={VIOLET} strokeWidth="1.2" strokeDasharray="4,4" />
      <AxisLabel x={128} y={42} fill={VIOLET}>軸</AxisLabel>

      <AxisLabel x={170} y={50} fill={BLUE}>y = x²</AxisLabel>
      <AxisLabel x={18} y={22} fill={BLUE}>係数aが正：下に凸</AxisLabel>
    </svg>
  );
}

// ─── 頂点と軸 ────────────────────────────────────────────────────────────────

function VertexAxis() {
  return (
    <svg viewBox="0 0 240 180" width="100%" aria-label="頂点と軸の対称軸">
      <rect x="0" y="0" width="240" height="180" rx="12" fill="#f8fafc" />

      {[40, 80, 120, 160, 200].map((x) => (
        <line key={`vx-${x}`} x1={x} y1="20" x2={x} y2="155" stroke="#e2e8f0" strokeWidth="0.8" />
      ))}
      {[35, 70, 105, 140].map((y) => (
        <line key={`hy-${y}`} x1="18" y1={y} x2="220" y2={y} stroke="#e2e8f0" strokeWidth="0.8" />
      ))}

      {/* axes */}
      <line x1="20" y1="105" x2="220" y2="105" stroke={AXIS_COLOR} strokeWidth="1.3" />
      <polygon points="220,105 213,102 213,108" fill={AXIS_COLOR} />
      <line x1="55" y1="20" x2="55" y2="158" stroke={AXIS_COLOR} strokeWidth="1.3" />
      <polygon points="55,20 52,27 58,27" fill={AXIS_COLOR} />

      <AxisLabel x={224} y={109}>x</AxisLabel>
      <AxisLabel x={59} y={19}>y</AxisLabel>

      {/* symmetry axis */}
      <line x1="130" y1="24" x2="130" y2="158" stroke={VIOLET} strokeWidth="1.3" strokeDasharray="5,4" />
      <AxisLabel x={137} y={38} fill={VIOLET}>軸 x=2</AxisLabel>

      {/* parabola */}
      <path
        d="M 55 30 C 78 88, 102 128, 130 128 C 158 128, 182 88, 205 30"
        fill="none"
        stroke={BLUE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle cx="130" cy="128" r="5" fill={ROSE} />
      <AxisLabel x={138} y={133} fill={ROSE}>頂点 (2, -1)</AxisLabel>

      <line x1="55" y1="128" x2="125" y2="128" stroke={ROSE} strokeWidth="1" strokeDasharray="4,3" />
      <AxisLabel x={24} y={132} fill={ROSE}>最小値</AxisLabel>

      <AxisLabel x={160} y={52} fill={BLUE}>y = (x-2)² - 1</AxisLabel>
    </svg>
  );
}

// ─── 平方完成による移動 ──────────────────────────────────────────────────────

function CompletingSquareShift() {
  return (
    <svg viewBox="0 0 260 210" width="100%" aria-label="平方完成による移動イメージ">
      <rect x="0" y="0" width="260" height="210" rx="12" fill="#f8fafc" />

      {[45, 85, 125, 165, 205, 245].map((x) => (
        <line key={`vx-${x}`} x1={x} y1="18" x2={x} y2="188" stroke="#e2e8f0" strokeWidth="0.8" />
      ))}
      {[40, 80, 120, 160].map((y) => (
        <line key={`hy-${y}`} x1="18" y1={y} x2="240" y2={y} stroke="#e2e8f0" strokeWidth="0.8" />
      ))}

      {/* axes */}
      <line x1="20" y1="102" x2="240" y2="102" stroke={AXIS_COLOR} strokeWidth="1.3" />
      <polygon points="240,102 233,99 233,105" fill={AXIS_COLOR} />
      <line x1="80" y1="18" x2="80" y2="190" stroke={AXIS_COLOR} strokeWidth="1.3" />
      <polygon points="80,18 77,25 83,25" fill={AXIS_COLOR} />

      <AxisLabel x={244} y={106}>x</AxisLabel>
      <AxisLabel x={84} y={17}>y</AxisLabel>

      {/* base parabola */}
      <path
        d="M 38 42 C 54 82, 66 102, 80 102 C 94 102, 106 82, 122 42"
        fill="none"
        stroke={GRAY}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="6,4"
      />
      <circle cx="80" cy="102" r="4" fill={GRAY} />
      <AxisLabel x={32} y={118} fill={GRAY}>頂点 (0,0)</AxisLabel>
      <AxisLabel x={124} y={44} fill={GRAY}>y = x²</AxisLabel>

      {/* shifted parabola */}
      <path
        d="M 92 86 C 112 150, 132 172, 160 172 C 188 172, 208 150, 228 86"
        fill="none"
        stroke={BLUE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="160" cy="172" r="5" fill={BLUE} />
      <AxisLabel x={166} y={183} fill={BLUE}>頂点 (2,-3)</AxisLabel>
      <AxisLabel x={178} y={92} fill={BLUE}>y = (x-2)² - 3</AxisLabel>

      {/* arrow */}
      <defs>
        <marker id="course-shift-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill={AMBER} />
        </marker>
      </defs>
      <path
        d="M 85 108 C 105 132, 126 154, 154 168"
        fill="none"
        stroke={AMBER}
        strokeWidth="1.6"
        strokeDasharray="4,3"
        markerEnd="url(#course-shift-arrow)"
      />
      <AxisLabel x={104} y={134} fill={AMBER}>右へ2、下へ3</AxisLabel>
    </svg>
  );
}

// ─── 定義域つき最大最小 ──────────────────────────────────────────────────────

function DomainMaxMin() {
  return (
    <svg viewBox="0 0 260 190" width="100%" aria-label="定義域つき最大最小">
      <rect x="0" y="0" width="260" height="190" rx="12" fill="#f8fafc" />

      {[40, 80, 120, 160, 200, 240].map((x) => (
        <line key={`vx-${x}`} x1={x} y1="18" x2={x} y2="165" stroke="#e2e8f0" strokeWidth="0.8" />
      ))}
      {[35, 70, 105, 140].map((y) => (
        <line key={`hy-${y}`} x1="18" y1={y} x2="240" y2={y} stroke="#e2e8f0" strokeWidth="0.8" />
      ))}

      {/* axes */}
      <line x1="20" y1="150" x2="240" y2="150" stroke={AXIS_COLOR} strokeWidth="1.3" />
      <polygon points="240,150 233,147 233,153" fill={AXIS_COLOR} />
      <line x1="40" y1="18" x2="40" y2="170" stroke={AXIS_COLOR} strokeWidth="1.3" />
      <polygon points="40,18 37,25 43,25" fill={AXIS_COLOR} />

      <AxisLabel x={244} y={154}>x</AxisLabel>
      <AxisLabel x={44} y={17}>y</AxisLabel>

      {/* domain highlight */}
      <line x1="55" y1="150" x2="215" y2="150" stroke={EMERALD} strokeWidth="4" strokeLinecap="round" />
      <AxisLabel x={55} y={166} fill={EMERALD} anchor="middle">0</AxisLabel>
      <AxisLabel x={215} y={166} fill={EMERALD} anchor="middle">4</AxisLabel>
      <AxisLabel x={135} y={181} fill={EMERALD} anchor="middle">定義域 0 から 4</AxisLabel>

      {/* vertical guides */}
      <line x1="55" y1="55" x2="55" y2="150" stroke={EMERALD} strokeWidth="1" strokeDasharray="4,3" />
      <line x1="215" y1="55" x2="215" y2="150" stroke={EMERALD} strokeWidth="1" strokeDasharray="4,3" />

      {/* parabola */}
      <path
        d="M 55 55 C 82 116, 104 128, 135 128 C 166 128, 188 116, 215 55"
        fill="none"
        stroke={BLUE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* vertex */}
      <circle cx="135" cy="128" r="5" fill={BLUE} />
      <AxisLabel x={143} y={125} fill={BLUE}>最小値</AxisLabel>
      <AxisLabel x={143} y={137} fill={BLUE}>頂点</AxisLabel>

      {/* endpoints */}
      <circle cx="55" cy="55" r="5" fill={ROSE} />
      <circle cx="215" cy="55" r="5" fill={ROSE} />
      <AxisLabel x={24} y={52} fill={ROSE}>端点</AxisLabel>
      <AxisLabel x={218} y={52} fill={ROSE}>端点</AxisLabel>
      <AxisLabel x={120} y={42} fill={ROSE} anchor="middle">最大値は端点比較</AxisLabel>
    </svg>
  );
}

// ─── 軸の位置と場合分け（3ケース横並び） ──────────────────────────────────

function MiniCase({
  axisX,
  domA,
  domB,
  vx,
  caseLabel,
  minAt,
  maxAt,
}: {
  axisX: number;
  domA: number;
  domB: number;
  vx: number;
  caseLabel: string;
  minAt: string;
  maxAt: string;
}) {
  const axisY = 88;
  const leftX = Math.max(5, vx - 42);
  const rightX = Math.min(105, vx + 42);

  return (
    <g>
      <line x1="4" y1={axisY} x2="108" y2={axisY} stroke={AXIS_COLOR} strokeWidth="0.9" />

      <path
        d={`M ${leftX} 34 Q ${vx} ${axisY} ${rightX} 34`}
        fill="none"
        stroke={BLUE}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <line x1={domA} y1={axisY} x2={domB} y2={axisY} stroke={EMERALD} strokeWidth="4" strokeLinecap="round" />
      <circle cx={domA} cy={axisY} r="3" fill={ROSE} />
      <circle cx={domB} cy={axisY} r="3" fill={ROSE} />

      <line x1={axisX} y1="10" x2={axisX} y2={axisY} stroke={VIOLET} strokeWidth="1.1" strokeDasharray="4,3" />
      <text x={axisX} y="9" fontSize="8" fill={VIOLET} textAnchor="middle">軸</text>

      <text x={(domA + domB) / 2} y={axisY + 12} fontSize="7.5" fill={EMERALD} textAnchor="middle">定義域</text>
      <text x={domA} y={axisY + 23} fontSize="7" fill={ROSE} textAnchor="middle">{minAt}</text>
      <text x={domB} y={axisY + 23} fontSize="7" fill={ROSE} textAnchor="middle">{maxAt}</text>

      <text x="55" y="123" fontSize="8" fill={VIOLET} textAnchor="middle">{caseLabel}</text>
    </g>
  );
}

function AxisPositionCases() {
  return (
    <svg viewBox="0 0 345 135" width="100%" aria-label="軸の位置による場合分け（3ケース）">
      <rect x="0" y="0" width="345" height="135" rx="12" fill="#f8fafc" />
      <line x1="115" y1="8" x2="115" y2="128" stroke="#e2e8f0" strokeWidth="1" />
      <line x1="230" y1="8" x2="230" y2="128" stroke="#e2e8f0" strokeWidth="1" />

      <g transform="translate(3,0)">
        <MiniCase axisX={18} domA={38} domB={88} vx={18} caseLabel="ケース1: 軸が左外" minAt="最小" maxAt="最大" />
      </g>

      <g transform="translate(118,0)">
        <MiniCase axisX={55} domA={20} domB={90} vx={55} caseLabel="ケース2: 軸が内側" minAt="端点" maxAt="端点" />
        <circle cx="55" cy="88" r="4" fill={BLUE} />
        <text x="61" y="84" fontSize="7" fill={BLUE}>最小</text>
      </g>

      <g transform="translate(233,0)">
        <MiniCase axisX={90} domA={12} domB={72} vx={90} caseLabel="ケース3: 軸が右外" minAt="最大" maxAt="最小" />
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
    markerEnd: "url(#course-flow-arrow)",
  };

  return (
    <svg viewBox="0 0 340 205" width="100%" aria-label="場合分けフローチャート">
      <rect x="0" y="0" width="340" height="205" rx="12" fill="#f8fafc" />

      <defs>
        <marker id="course-flow-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill={AXIS_COLOR} />
        </marker>
      </defs>

      <rect x="95" y="10" width="150" height="32" rx="8" {...boxStyle} fill="#eff6ff" stroke="#bfdbfe" />
      <text x="170" y="24" fontSize="9.5" fill={BLUE} textAnchor="middle" fontWeight="bold">軸の位置を確認</text>
      <text x="170" y="36" fontSize="8.5" fill={BLUE} textAnchor="middle">軸 x=p、定義域 [a,b]</text>

      <line x1="170" y1="42" x2="170" y2="56" {...arrowStyle} />

      <polygon points="170,56 222,78 170,100 118,78" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.2" />
      <text x="170" y="75" fontSize="9" fill={VIOLET} textAnchor="middle">p &lt; a ?</text>
      <text x="170" y="88" fontSize="8" fill={VIOLET} textAnchor="middle">軸が左外</text>

      <line x1="118" y1="78" x2="64" y2="78" {...arrowStyle} />
      <text x="91" y="71" fontSize="8" fill={GRAY}>Yes</text>
      <rect x="10" y="62" width="54" height="32" rx="6" {...boxStyle} fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="37" y="75" fontSize="8.5" fill={EMERALD} textAnchor="middle">左端</text>
      <text x="37" y="87" fontSize="8.5" fill={EMERALD} textAnchor="middle">で最小</text>

      <line x1="170" y1="100" x2="170" y2="116" {...arrowStyle} />
      <text x="176" y="110" fontSize="8" fill={GRAY}>No</text>

      <polygon points="170,116 226,138 170,160 114,138" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.2" />
      <text x="170" y="135" fontSize="9" fill={VIOLET} textAnchor="middle">a ≤ p ≤ b ?</text>
      <text x="170" y="148" fontSize="8" fill={VIOLET} textAnchor="middle">軸が内側</text>

      <line x1="114" y1="138" x2="64" y2="138" {...arrowStyle} />
      <text x="88" y="131" fontSize="8" fill={GRAY}>Yes</text>
      <rect x="10" y="122" width="54" height="32" rx="6" {...boxStyle} fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="37" y="135" fontSize="8.5" fill={EMERALD} textAnchor="middle">頂点</text>
      <text x="37" y="147" fontSize="8.5" fill={EMERALD} textAnchor="middle">で最小</text>

      <line x1="226" y1="138" x2="276" y2="138" {...arrowStyle} />
      <text x="249" y="131" fontSize="8" fill={GRAY}>No</text>
      <rect x="276" y="122" width="54" height="32" rx="6" {...boxStyle} fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="303" y="135" fontSize="8.5" fill={EMERALD} textAnchor="middle">右端</text>
      <text x="303" y="147" fontSize="8.5" fill={EMERALD} textAnchor="middle">で最小</text>

      <text x="170" y="184" fontSize="8" fill="#64748b" textAnchor="middle">
        係数aが正の場合。最大値は軸から遠い端点を確認。
      </text>
    </svg>
  );
}

// ─── 円: 円周角と中心角 ──────────────────────────────────────────────────────
// O(120,95) r=60。A(68,125), B(172,125) は下の弧の両端、P(120,35) は上の円周上。
// 中心角 ∠AOB（紫）と円周角 ∠APB（青）が同じ弧 AB（橙）を見ている。

function CircleInscribedCentralAngle() {
  return (
    <svg viewBox="0 0 240 180" width="100%" aria-label="円周角と中心角の関係図">
      <rect x="0" y="0" width="240" height="180" rx="12" fill="#f8fafc" />
      <circle cx="120" cy="95" r="60" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* 共通して見ている弧 AB（下側）を強調 */}
      <path d="M 68 125 A 60 60 0 0 1 172 125" fill="none" stroke={AMBER} strokeWidth="4" />

      {/* 中心角 ∠AOB（半径 OA, OB） */}
      <line x1="120" y1="95" x2="68" y2="125" stroke={VIOLET} strokeWidth="2" />
      <line x1="120" y1="95" x2="172" y2="125" stroke={VIOLET} strokeWidth="2" />

      {/* 円周角 ∠APB（弦 PA, PB） */}
      <line x1="120" y1="35" x2="68" y2="125" stroke={BLUE} strokeWidth="2" />
      <line x1="120" y1="35" x2="172" y2="125" stroke={BLUE} strokeWidth="2" />

      {/* 点 */}
      <circle cx="120" cy="95" r="3" fill={VIOLET} />
      <circle cx="68" cy="125" r="3" fill="#0f172a" />
      <circle cx="172" cy="125" r="3" fill="#0f172a" />
      <circle cx="120" cy="35" r="3" fill={BLUE} />

      {/* ラベル */}
      <AxisLabel x={120} y={108} anchor="middle" fill={VIOLET}>O</AxisLabel>
      <AxisLabel x={58} y={132} anchor="middle" fill="#0f172a">A</AxisLabel>
      <AxisLabel x={182} y={132} anchor="middle" fill="#0f172a">B</AxisLabel>
      <AxisLabel x={120} y={28} anchor="middle" fill={BLUE}>P</AxisLabel>
      <AxisLabel x={120} y={84} anchor="middle" fill={VIOLET}>∠AOB</AxisLabel>
      <AxisLabel x={120} y={52} anchor="middle" fill={BLUE}>∠APB</AxisLabel>
      <text x="120" y="172" fontSize="8" fill={AMBER} textAnchor="middle">
        橙の弧 AB を、中心と円周から見ている
      </text>
    </svg>
  );
}

// ─── 円: 同じ弧を見る円周角 ──────────────────────────────────────────────────
// 弦 AB（下）を、上側の異なる2点 P, Q から見る。位置が違っても角は等しい。

function CircleSameArcAngles() {
  return (
    <svg viewBox="0 0 240 180" width="100%" aria-label="同じ弧を見る円周角は等しい図">
      <rect x="0" y="0" width="240" height="180" rx="12" fill="#f8fafc" />
      <circle cx="120" cy="95" r="60" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* 共通の弧 AB（下側）を強調 */}
      <path d="M 68 125 A 60 60 0 0 1 172 125" fill="none" stroke={AMBER} strokeWidth="4" />

      {/* 円周角 ∠APB（P は右上寄り） */}
      <line x1="135" y1="37" x2="68" y2="125" stroke={BLUE} strokeWidth="2" />
      <line x1="135" y1="37" x2="172" y2="125" stroke={BLUE} strokeWidth="2" />

      {/* 円周角 ∠AQB（Q は左上寄り） */}
      <line x1="95" y1="41" x2="68" y2="125" stroke={EMERALD} strokeWidth="2" />
      <line x1="95" y1="41" x2="172" y2="125" stroke={EMERALD} strokeWidth="2" />

      {/* 点 */}
      <circle cx="68" cy="125" r="3" fill="#0f172a" />
      <circle cx="172" cy="125" r="3" fill="#0f172a" />
      <circle cx="135" cy="37" r="3" fill={BLUE} />
      <circle cx="95" cy="41" r="3" fill={EMERALD} />

      {/* ラベル */}
      <AxisLabel x={58} y={132} anchor="middle" fill="#0f172a">A</AxisLabel>
      <AxisLabel x={182} y={132} anchor="middle" fill="#0f172a">B</AxisLabel>
      <AxisLabel x={144} y={32} anchor="middle" fill={BLUE}>P</AxisLabel>
      <AxisLabel x={86} y={36} anchor="middle" fill={EMERALD}>Q</AxisLabel>
      <text x="120" y="172" fontSize="8" fill={AMBER} textAnchor="middle">
        P でも Q でも、同じ弧 AB を見れば角は等しい
      </text>
    </svg>
  );
}

// ─── 円: 接弦定理 ────────────────────────────────────────────────────────────
// A(86,144) で接線 AT、弦 AB、反対側の円周上の点 P(120,35)。
// 接線と弦のなす角 ∠BAT（橙）＝円周角 ∠APB（青）。

function CircleTangentChordAngle() {
  return (
    <svg viewBox="0 0 240 180" width="100%" aria-label="接弦定理の図">
      <rect x="0" y="0" width="240" height="180" rx="12" fill="#f8fafc" />
      <circle cx="120" cy="95" r="60" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* 接線 AT（A で円に接する） */}
      <line x1="65" y1="129" x2="121" y2="168" stroke={ROSE} strokeWidth="2" />

      {/* 弦 AB */}
      <line x1="86" y1="144" x2="154" y2="144" stroke={AMBER} strokeWidth="2.5" />

      {/* 円周角 ∠APB（弦 PA, PB） */}
      <line x1="120" y1="35" x2="86" y2="144" stroke={BLUE} strokeWidth="2" />
      <line x1="120" y1="35" x2="154" y2="144" stroke={BLUE} strokeWidth="2" />

      {/* 点 */}
      <circle cx="86" cy="144" r="3" fill="#0f172a" />
      <circle cx="154" cy="144" r="3" fill="#0f172a" />
      <circle cx="120" cy="35" r="3" fill={BLUE} />
      <circle cx="121" cy="168" r="3" fill={ROSE} />

      {/* ラベル */}
      <AxisLabel x={78} y={150} anchor="middle" fill="#0f172a">A</AxisLabel>
      <AxisLabel x={164} y={150} anchor="middle" fill="#0f172a">B</AxisLabel>
      <AxisLabel x={120} y={28} anchor="middle" fill={BLUE}>P</AxisLabel>
      <AxisLabel x={132} y={170} anchor="middle" fill={ROSE}>T</AxisLabel>
      <AxisLabel x={104} y={138} anchor="middle" fill={AMBER}>∠BAT</AxisLabel>
      <AxisLabel x={120} y={52} anchor="middle" fill={BLUE}>∠APB</AxisLabel>
      <text x="120" y="16" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        接線と弦の角＝反対側の円周角
      </text>
    </svg>
  );
}

// ─── 三角形: チェバの定理 ───────────────────────────────────────────────────
// 三角形ABCで、D, E, F が各辺上にあり、AD, BE, CF が1点Pで交わる。

function GeometryCevaTheorem() {
  return (
    <svg viewBox="0 0 260 190" width="100%" aria-label="チェバの定理の図">
      <rect x="0" y="0" width="260" height="190" rx="12" fill="#f8fafc" />

      {/* triangle */}
      <polygon
        points="130,24 38,158 222,158"
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="1.5"
      />

      {/* points chosen so AD, BE, CF pass through P */}
      <line x1="130" y1="24" x2="130" y2="158" stroke={BLUE} strokeWidth="2.2" />
      <line x1="38" y1="158" x2="158" y2="82" stroke={EMERALD} strokeWidth="2.2" />
      <line x1="222" y1="158" x2="84" y2="91" stroke={ROSE} strokeWidth="2.2" />

      {/* concurrency */}
      <circle cx="130" cy="100" r="5" fill={VIOLET} />
      <AxisLabel x={138} y={101} fill={VIOLET}>P</AxisLabel>

      {/* vertices */}
      <circle cx="130" cy="24" r="4" fill="#0f172a" />
      <circle cx="38" cy="158" r="4" fill="#0f172a" />
      <circle cx="222" cy="158" r="4" fill="#0f172a" />
      <AxisLabel x={130} y={17} anchor="middle" fill="#0f172a">A</AxisLabel>
      <AxisLabel x={29} y={166} anchor="middle" fill="#0f172a">B</AxisLabel>
      <AxisLabel x={231} y={166} anchor="middle" fill="#0f172a">C</AxisLabel>

      {/* side points */}
      <circle cx="130" cy="158" r="4" fill={BLUE} />
      <circle cx="158" cy="82" r="4" fill={EMERALD} />
      <circle cx="84" cy="91" r="4" fill={ROSE} />
      <AxisLabel x={130} y={174} anchor="middle" fill={BLUE}>D</AxisLabel>
      <AxisLabel x={166} y={82} fill={EMERALD}>E</AxisLabel>
      <AxisLabel x={75} y={88} anchor="end" fill={ROSE}>F</AxisLabel>

      {/* ratio hints */}
      <text x="84" y="151" fontSize="8" fill={BLUE} textAnchor="middle">BD</text>
      <text x="176" y="151" fontSize="8" fill={BLUE} textAnchor="middle">DC</text>
      <text x="154" y="55" fontSize="8" fill={EMERALD}>CE</text>
      <text x="174" y="112" fontSize="8" fill={EMERALD}>EA</text>
      <text x="92" y="55" fontSize="8" fill={ROSE}>AF</text>
      <text x="58" y="127" fontSize="8" fill={ROSE}>FB</text>

      <text x="130" y="184" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        AD, BE, CF が1点 P で交わるならチェバ
      </text>
    </svg>
  );
}

// ─── 三角形: メネラウスの定理 ───────────────────────────────────────────────
// D, E, F が一直線上。F は AB の延長線上に置き、外分点に注意する図。

function GeometryMenelausTheorem() {
  return (
    <svg viewBox="0 0 260 190" width="100%" aria-label="メネラウスの定理の図">
      <rect x="0" y="0" width="260" height="190" rx="12" fill="#f8fafc" />

      {/* triangle */}
      <polygon
        points="128,24 42,150 220,150"
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="1.5"
      />

      {/* extension of AB to F */}
      <line x1="42" y1="150" x2="28" y2="171" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* transversal F-D-E */}
      <line x1="28" y1="171" x2="166" y2="92" stroke={ROSE} strokeWidth="2.6" />

      {/* vertices */}
      <circle cx="128" cy="24" r="4" fill="#0f172a" />
      <circle cx="42" cy="150" r="4" fill="#0f172a" />
      <circle cx="220" cy="150" r="4" fill="#0f172a" />
      <AxisLabel x={128} y={17} anchor="middle" fill="#0f172a">A</AxisLabel>
      <AxisLabel x={33} y={158} anchor="middle" fill="#0f172a">B</AxisLabel>
      <AxisLabel x={229} y={158} anchor="middle" fill="#0f172a">C</AxisLabel>

      {/* collinear points */}
      <circle cx="64" cy="150" r="4" fill={BLUE} />
      <circle cx="166" cy="92" r="4" fill={EMERALD} />
      <circle cx="28" cy="171" r="4" fill={ROSE} />
      <AxisLabel x={64} y={165} anchor="middle" fill={BLUE}>D</AxisLabel>
      <AxisLabel x={174} y={94} fill={EMERALD}>E</AxisLabel>
      <AxisLabel x={20} y={181} anchor="middle" fill={ROSE}>F</AxisLabel>

      {/* labels */}
      <text x="53" y="143" fontSize="8" fill={BLUE} textAnchor="middle">BD</text>
      <text x="143" y="143" fontSize="8" fill={BLUE} textAnchor="middle">DC</text>
      <text x="177" y="68" fontSize="8" fill={EMERALD}>CE</text>
      <text x="148" y="61" fontSize="8" fill={EMERALD}>EA</text>
      <text x="75" y="100" fontSize="8" fill={ROSE}>AF</text>
      <text x="24" y="153" fontSize="8" fill={ROSE}>FB</text>

      <text x="130" y="184" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        D, E, F が一直線ならメネラウス。F は延長線上に来ることがある。
      </text>
    </svg>
  );
}

// ─── 三角形: チェバとメネラウスの比較 ───────────────────────────────────────

function GeometryCevaMenelausCompare() {
  return (
    <svg viewBox="0 0 340 170" width="100%" aria-label="チェバとメネラウスの比較図">
      <rect x="0" y="0" width="340" height="170" rx="12" fill="#f8fafc" />
      <line x1="170" y1="14" x2="170" y2="154" stroke="#e2e8f0" strokeWidth="1" />

      {/* Ceva mini */}
      <g transform="translate(12,12)">
        <text x="74" y="10" fontSize="9" fill={BLUE} textAnchor="middle" fontWeight="bold">チェバ</text>
        <polygon points="74,22 14,128 142,128" fill="#fff" stroke="#cbd5e1" strokeWidth="1.2" />
        <line x1="74" y1="22" x2="74" y2="128" stroke={BLUE} strokeWidth="1.8" />
        <line x1="14" y1="128" x2="93" y2="64" stroke={EMERALD} strokeWidth="1.8" />
        <line x1="142" y1="128" x2="49" y2="76" stroke={ROSE} strokeWidth="1.8" />
        <circle cx="74" cy="86" r="4" fill={VIOLET} />
        <text x="82" y="88" fontSize="8" fill={VIOLET}>1点で交わる</text>
        <text x="74" y="148" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">3本の線分 → 比の積=1</text>
      </g>

      {/* Menelaus mini */}
      <g transform="translate(184,12)">
        <text x="74" y="10" fontSize="9" fill={ROSE} textAnchor="middle" fontWeight="bold">メネラウス</text>
        <polygon points="74,22 18,128 142,128" fill="#fff" stroke="#cbd5e1" strokeWidth="1.2" />
        <line x1="18" y1="128" x2="6" y2="148" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="4,3" />
        <line x1="6" y1="148" x2="104" y2="72" stroke={ROSE} strokeWidth="2" />
        <circle cx="32" cy="128" r="3.5" fill={BLUE} />
        <circle cx="104" cy="72" r="3.5" fill={EMERALD} />
        <circle cx="6" cy="148" r="3.5" fill={ROSE} />
        <text x="75" y="103" fontSize="8" fill={ROSE}>3点が一直線</text>
        <text x="74" y="148" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">直線上の3点 → 比の積=1</text>
      </g>
    </svg>
  );
}

// ─── 円: 方べきの定理（交わる2弦）────────────────────────────────────────────

function GeometryPowerIntersectingChords() {
  return (
    <svg viewBox="0 0 260 190" width="100%" aria-label="方べきの定理：交わる2弦の図">
      <rect x="0" y="0" width="260" height="190" rx="12" fill="#f8fafc" />
      <circle cx="130" cy="94" r="62" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* chords */}
      <line x1="72" y1="52" x2="188" y2="136" stroke={BLUE} strokeWidth="2.4" />
      <line x1="68" y1="132" x2="192" y2="56" stroke={EMERALD} strokeWidth="2.4" />

      {/* point P */}
      <circle cx="130" cy="94" r="5" fill={VIOLET} />
      <AxisLabel x={138} y={96} fill={VIOLET}>P</AxisLabel>

      {/* endpoints */}
      <circle cx="72" cy="52" r="4" fill={BLUE} />
      <circle cx="188" cy="136" r="4" fill={BLUE} />
      <circle cx="68" cy="132" r="4" fill={EMERALD} />
      <circle cx="192" cy="56" r="4" fill={EMERALD} />
      <AxisLabel x={65} y={48} anchor="end" fill={BLUE}>A</AxisLabel>
      <AxisLabel x={196} y={144} fill={BLUE}>B</AxisLabel>
      <AxisLabel x={60} y={140} anchor="end" fill={EMERALD}>C</AxisLabel>
      <AxisLabel x={200} y={55} fill={EMERALD}>D</AxisLabel>

      {/* segment hints */}
      <text x="99" y="66" fontSize="8" fill={BLUE} textAnchor="middle">PA</text>
      <text x="164" y="124" fontSize="8" fill={BLUE} textAnchor="middle">PB</text>
      <text x="96" y="122" fontSize="8" fill={EMERALD} textAnchor="middle">PC</text>
      <text x="166" y="71" fontSize="8" fill={EMERALD} textAnchor="middle">PD</text>

      <text x="130" y="176" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        円の中で2本の弦が交わると、Pから両端までの積が等しい
      </text>
    </svg>
  );
}

// ─── 円: 方べきの定理（外部の点から2本の割線）────────────────────────────────

function GeometryPowerTwoSecants() {
  return (
    <svg viewBox="0 0 280 190" width="100%" aria-label="方べきの定理：外部の点から2本の割線の図">
      <rect x="0" y="0" width="280" height="190" rx="12" fill="#f8fafc" />
      <circle cx="166" cy="94" r="58" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* secants */}
      <line x1="32" y1="154" x2="226" y2="68" stroke={BLUE} strokeWidth="2.4" />
      <line x1="32" y1="154" x2="224" y2="133" stroke={EMERALD} strokeWidth="2.4" />

      {/* external point */}
      <circle cx="32" cy="154" r="5" fill={VIOLET} />
      <AxisLabel x={22} y={166} anchor="middle" fill={VIOLET}>P</AxisLabel>

      {/* intersections */}
      <circle cx="113" cy="118" r="4" fill={BLUE} />
      <circle cx="216" cy="72" r="4" fill={BLUE} />
      <circle cx="109" cy="146" r="4" fill={EMERALD} />
      <circle cx="221" cy="134" r="4" fill={EMERALD} />
      <AxisLabel x={113} y={111} anchor="middle" fill={BLUE}>A</AxisLabel>
      <AxisLabel x={225} y={68} fill={BLUE}>B</AxisLabel>
      <AxisLabel x={109} y={160} anchor="middle" fill={EMERALD}>C</AxisLabel>
      <AxisLabel x={229} y={141} fill={EMERALD}>D</AxisLabel>

      {/* segment hints */}
      <text x="74" y="130" fontSize="8" fill={BLUE} textAnchor="middle">PA</text>
      <text x="164" y="88" fontSize="8" fill={BLUE} textAnchor="middle">PB</text>
      <text x="72" y="151" fontSize="8" fill={EMERALD} textAnchor="middle">PC</text>
      <text x="166" y="143" fontSize="8" fill={EMERALD} textAnchor="middle">PD</text>

      <text x="140" y="176" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        外部点Pから円を切る2本の直線でも、外側×全体が等しい
      </text>
    </svg>
  );
}

// ─── 円: 方べきの定理（接線と割線）────────────────────────────────────────────

function GeometryPowerTangentSecant() {
  return (
    <svg viewBox="0 0 280 190" width="100%" aria-label="方べきの定理：接線と割線の図">
      <rect x="0" y="0" width="280" height="190" rx="12" fill="#f8fafc" />
      <circle cx="166" cy="94" r="58" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* tangent and secant */}
      <line x1="34" y1="150" x2="124" y2="43" stroke={ROSE} strokeWidth="2.6" />
      <line x1="34" y1="150" x2="225" y2="112" stroke={BLUE} strokeWidth="2.4" />

      {/* tangent point and radius guide */}
      <line x1="166" y1="94" x2="124" y2="43" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="4,3" />
      <text x="149" y="61" fontSize="8" fill="#64748b">半径</text>

      {/* external point */}
      <circle cx="34" cy="150" r="5" fill={VIOLET} />
      <AxisLabel x={24} y={162} anchor="middle" fill={VIOLET}>P</AxisLabel>

      {/* points */}
      <circle cx="124" cy="43" r="4" fill={ROSE} />
      <circle cx="109" cy="135" r="4" fill={BLUE} />
      <circle cx="220" cy="113" r="4" fill={BLUE} />
      <AxisLabel x={124} y={36} anchor="middle" fill={ROSE}>T</AxisLabel>
      <AxisLabel x={109} y={129} anchor="middle" fill={BLUE}>A</AxisLabel>
      <AxisLabel x={229} y={118} fill={BLUE}>B</AxisLabel>

      {/* right angle at tangent point */}
      <path d="M 130 49 L 136 42 L 130 36" fill="none" stroke="#94a3b8" strokeWidth="1" />

      {/* segment hints */}
      <text x="77" y="91" fontSize="8" fill={ROSE} textAnchor="middle">PT</text>
      <text x="72" y="146" fontSize="8" fill={BLUE} textAnchor="middle">PA</text>
      <text x="164" y="127" fontSize="8" fill={BLUE} textAnchor="middle">PB</text>

      <text x="140" y="176" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        接線があるときは、接線の長さの2乗＝割線の外側×全体
      </text>
    </svg>
  );
}

// ─── 三角形: 五心（外心・内心）──────────────────────────────────────────────

function GeometryCentersCircumIncenter() {
  return (
    <svg viewBox="0 0 300 210" width="100%" aria-label="三角形の五心：外心と内心の図">
      <rect x="0" y="0" width="300" height="210" rx="12" fill="#f8fafc" />

      {/* circumcircle and triangle */}
      <circle cx="150" cy="102" r="78" fill="#ffffff" stroke="#bfdbfe" strokeWidth="1.8" />
      <polygon points="150,24 54,164 246,164" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* incenter circle */}
      <circle cx="150" cy="116" r="34" fill="#ecfeff" stroke={EMERALD} strokeWidth="1.7" />

      {/* equal distances from circumcenter to vertices */}
      <line x1="150" y1="102" x2="150" y2="24" stroke={BLUE} strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="150" y1="102" x2="54" y2="164" stroke={BLUE} strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="150" y1="102" x2="246" y2="164" stroke={BLUE} strokeWidth="1.5" strokeDasharray="4,3" />

      {/* equal distances from incenter to sides */}
      <line x1="150" y1="116" x2="150" y2="164" stroke={EMERALD} strokeWidth="1.6" strokeDasharray="4,3" />
      <line x1="150" y1="116" x2="122" y2="65" stroke={EMERALD} strokeWidth="1.6" strokeDasharray="4,3" />
      <line x1="150" y1="116" x2="178" y2="65" stroke={EMERALD} strokeWidth="1.6" strokeDasharray="4,3" />

      {/* points */}
      <circle cx="150" cy="24" r="4" fill="#0f172a" />
      <circle cx="54" cy="164" r="4" fill="#0f172a" />
      <circle cx="246" cy="164" r="4" fill="#0f172a" />
      <circle cx="150" cy="102" r="5" fill={BLUE} />
      <circle cx="150" cy="116" r="5" fill={EMERALD} />

      <AxisLabel x={150} y={17} anchor="middle" fill="#0f172a">A</AxisLabel>
      <AxisLabel x={45} y={173} anchor="middle" fill="#0f172a">B</AxisLabel>
      <AxisLabel x={255} y={173} anchor="middle" fill="#0f172a">C</AxisLabel>
      <AxisLabel x={139} y={100} anchor="end" fill={BLUE}>O</AxisLabel>
      <AxisLabel x={160} y={120} fill={EMERALD}>I</AxisLabel>

      <text x="72" y="34" fontSize="8.5" fill={BLUE}>外心O: 頂点から等距離</text>
      <text x="165" y="152" fontSize="8.5" fill={EMERALD}>内心I: 辺から等距離</text>
      <text x="150" y="198" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        外心は外接円の中心、内心は内接円の中心
      </text>
    </svg>
  );
}

// ─── 三角形: 五心（重心・垂心）──────────────────────────────────────────────

function GeometryCentersCentroidOrthocenter() {
  return (
    <svg viewBox="0 0 300 210" width="100%" aria-label="三角形の五心：重心と垂心の図">
      <rect x="0" y="0" width="300" height="210" rx="12" fill="#f8fafc" />
      <polygon points="150,28 58,166 248,166" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* medians */}
      <line x1="150" y1="28" x2="153" y2="166" stroke={BLUE} strokeWidth="2" />
      <line x1="58" y1="166" x2="199" y2="97" stroke={BLUE} strokeWidth="1.8" strokeDasharray="5,4" />
      <line x1="248" y1="166" x2="104" y2="97" stroke={BLUE} strokeWidth="1.8" strokeDasharray="5,4" />

      {/* altitudes */}
      <line x1="150" y1="28" x2="150" y2="166" stroke={ROSE} strokeWidth="2.2" />
      <line x1="58" y1="166" x2="176" y2="67" stroke={ROSE} strokeWidth="1.8" strokeDasharray="4,3" />
      <line x1="248" y1="166" x2="121" y2="72" stroke={ROSE} strokeWidth="1.8" strokeDasharray="4,3" />

      {/* midpoint marks */}
      <circle cx="153" cy="166" r="3.5" fill={BLUE} />
      <circle cx="199" cy="97" r="3.5" fill={BLUE} />
      <circle cx="104" cy="97" r="3.5" fill={BLUE} />
      <AxisLabel x={161} y={181} fill={BLUE}>中点</AxisLabel>

      {/* centers */}
      <circle cx="151" cy="120" r="5" fill={BLUE} />
      <circle cx="150" cy="94" r="5" fill={ROSE} />
      <AxisLabel x={160} y={123} fill={BLUE}>G</AxisLabel>
      <AxisLabel x={138} y={91} anchor="end" fill={ROSE}>H</AxisLabel>

      {/* vertices */}
      <circle cx="150" cy="28" r="4" fill="#0f172a" />
      <circle cx="58" cy="166" r="4" fill="#0f172a" />
      <circle cx="248" cy="166" r="4" fill="#0f172a" />
      <AxisLabel x={150} y={21} anchor="middle" fill="#0f172a">A</AxisLabel>
      <AxisLabel x={49} y={174} anchor="middle" fill="#0f172a">B</AxisLabel>
      <AxisLabel x={257} y={174} anchor="middle" fill="#0f172a">C</AxisLabel>

      <text x="70" y="38" fontSize="8.5" fill={BLUE}>重心G: 中線の交点</text>
      <text x="176" y="47" fontSize="8.5" fill={ROSE}>垂心H: 高さの交点</text>
      <text x="150" y="198" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        中線は中点へ、高さは辺に垂直。見た目が似ても役割は別
      </text>
    </svg>
  );
}

// ─── 三角形: 五心の比較 ─────────────────────────────────────────────────────

function GeometryCentersFiveCompare() {
  const cards = [
    { x: 12, y: 18, title: "外心 O", sub: "頂点から等距離", cue: "垂直二等分線", fill: "#eff6ff", stroke: "#bfdbfe", color: BLUE },
    { x: 158, y: 18, title: "内心 I", sub: "辺から等距離", cue: "角の二等分線", fill: "#ecfdf5", stroke: "#a7f3d0", color: EMERALD },
    { x: 12, y: 80, title: "重心 G", sub: "中線の交点", cue: "2:1に分ける", fill: "#f5f3ff", stroke: "#ddd6fe", color: VIOLET },
    { x: 158, y: 80, title: "垂心 H", sub: "高さの交点", cue: "垂直を追う", fill: "#fff1f2", stroke: "#fecdd3", color: ROSE },
    { x: 85, y: 142, title: "傍心", sub: "外角の二等分線", cue: "三角形の外側", fill: "#fffbeb", stroke: "#fde68a", color: AMBER },
  ];

  return (
    <svg viewBox="0 0 300 210" width="100%" aria-label="三角形の五心の比較図">
      <rect x="0" y="0" width="300" height="210" rx="12" fill="#f8fafc" />
      {cards.map((card) => (
        <g key={card.title}>
          <rect x={card.x} y={card.y} width="130" height="48" rx="8" fill={card.fill} stroke={card.stroke} strokeWidth="1.3" />
          <text x={card.x + 10} y={card.y + 17} fontSize="10" fill={card.color} fontWeight="bold">
            {card.title}
          </text>
          <text x={card.x + 10} y={card.y + 31} fontSize="8.5" fill={TEXT_COLOR}>
            {card.sub}
          </text>
          <text x={card.x + 10} y={card.y + 43} fontSize="8" fill="#64748b">
            {card.cue}
          </text>
        </g>
      ))}
      <text x="150" y="199" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        「何から等距離か」「どの線が出ているか」で中心を判定する
      </text>
    </svg>
  );
}

// ─── 円: 内接四角形の対角 ───────────────────────────────────────────────────

function GeometryCyclicOppositeAngles() {
  return (
    <svg viewBox="0 0 300 210" width="100%" aria-label="内接四角形の対角の図">
      <rect x="0" y="0" width="300" height="210" rx="12" fill="#f8fafc" />
      <circle cx="150" cy="104" r="76" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.6" />

      {/* cyclic quadrilateral */}
      <polygon points="150,28 70,133 142,178 232,92" fill="#eff6ff" stroke={BLUE} strokeWidth="2" />
      <path d="M 136 47 Q 150 61 165 47" fill="none" stroke={ROSE} strokeWidth="2" />
      <path d="M 134 158 Q 146 145 158 158" fill="none" stroke={ROSE} strokeWidth="2" />
      <path d="M 90 128 Q 101 117 95 104" fill="none" stroke={EMERALD} strokeWidth="2" />
      <path d="M 212 96 Q 199 106 203 121" fill="none" stroke={EMERALD} strokeWidth="2" />

      {/* points */}
      <circle cx="150" cy="28" r="4" fill="#0f172a" />
      <circle cx="70" cy="133" r="4" fill="#0f172a" />
      <circle cx="142" cy="178" r="4" fill="#0f172a" />
      <circle cx="232" cy="92" r="4" fill="#0f172a" />
      <AxisLabel x={150} y={21} anchor="middle" fill="#0f172a">A</AxisLabel>
      <AxisLabel x={60} y={139} anchor="middle" fill="#0f172a">B</AxisLabel>
      <AxisLabel x={142} y={193} anchor="middle" fill="#0f172a">C</AxisLabel>
      <AxisLabel x={242} y={94} fill="#0f172a">D</AxisLabel>

      <text x="150" y="198" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        対角どうしの和は180°。AとC、BとDをペアで見る
      </text>
    </svg>
  );
}

// ─── 円: 内接四角形の外角 ───────────────────────────────────────────────────

function GeometryCyclicExteriorAngle() {
  return (
    <svg viewBox="0 0 300 210" width="100%" aria-label="内接四角形の外角と向かいの内角の図">
      <rect x="0" y="0" width="300" height="210" rx="12" fill="#f8fafc" />
      <circle cx="142" cy="104" r="74" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.6" />

      {/* cyclic quadrilateral and extension */}
      <polygon points="140,31 66,126 139,178 218,100" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.4" />
      <line x1="218" y1="100" x2="270" y2="49" stroke={ROSE} strokeWidth="2.4" />
      <line x1="139" y1="178" x2="218" y2="100" stroke={ROSE} strokeWidth="2.4" />
      <line x1="66" y1="126" x2="140" y2="31" stroke={BLUE} strokeWidth="2.4" />
      <line x1="66" y1="126" x2="139" y2="178" stroke={BLUE} strokeWidth="2.4" />

      {/* angle marks: exterior at D, opposite at B */}
      <path d="M 229 105 Q 231 83 213 79" fill="none" stroke={ROSE} strokeWidth="2.2" />
      <path d="M 83 125 Q 92 143 76 152" fill="none" stroke={BLUE} strokeWidth="2.2" />
      <text x="236" y="82" fontSize="8.5" fill={ROSE}>外角</text>
      <text x="88" y="150" fontSize="8.5" fill={BLUE}>向かいの内角</text>

      {/* points */}
      <circle cx="140" cy="31" r="4" fill="#0f172a" />
      <circle cx="66" cy="126" r="4" fill="#0f172a" />
      <circle cx="139" cy="178" r="4" fill="#0f172a" />
      <circle cx="218" cy="100" r="4" fill="#0f172a" />
      <circle cx="270" cy="49" r="3.5" fill={ROSE} />
      <AxisLabel x={140} y={24} anchor="middle" fill="#0f172a">A</AxisLabel>
      <AxisLabel x={56} y={132} anchor="middle" fill="#0f172a">B</AxisLabel>
      <AxisLabel x={139} y={193} anchor="middle" fill="#0f172a">C</AxisLabel>
      <AxisLabel x={224} y={112} fill="#0f172a">D</AxisLabel>
      <AxisLabel x={275} y={48} fill={ROSE}>E</AxisLabel>

      <text x="150" y="198" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        辺を延長してできる外角は、向かい側の内角に等しい
      </text>
    </svg>
  );
}

// ─── 円: 同じ弧を見る角 ─────────────────────────────────────────────────────

function GeometryCyclicSameArc() {
  return (
    <svg viewBox="0 0 300 210" width="100%" aria-label="内接四角形で同じ弧を見る角の図">
      <rect x="0" y="0" width="300" height="210" rx="12" fill="#f8fafc" />
      <circle cx="150" cy="104" r="76" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.6" />

      {/* points A, B and two points C, D seeing arc AB */}
      <path d="M 82 138 A 76 76 0 0 1 218 138" fill="none" stroke={AMBER} strokeWidth="4" />
      <line x1="82" y1="138" x2="121" y2="38" stroke={BLUE} strokeWidth="2.1" />
      <line x1="218" y1="138" x2="121" y2="38" stroke={BLUE} strokeWidth="2.1" />
      <line x1="82" y1="138" x2="187" y2="38" stroke={EMERALD} strokeWidth="2.1" />
      <line x1="218" y1="138" x2="187" y2="38" stroke={EMERALD} strokeWidth="2.1" />

      {/* angle marks */}
      <path d="M 130 54 Q 145 62 152 48" fill="none" stroke={BLUE} strokeWidth="2" />
      <path d="M 177 53 Q 162 62 154 48" fill="none" stroke={EMERALD} strokeWidth="2" />

      {/* points */}
      <circle cx="82" cy="138" r="4" fill="#0f172a" />
      <circle cx="218" cy="138" r="4" fill="#0f172a" />
      <circle cx="187" cy="38" r="4" fill={BLUE} />
      <circle cx="121" cy="38" r="4" fill={EMERALD} />
      <AxisLabel x={72} y={146} anchor="middle" fill="#0f172a">A</AxisLabel>
      <AxisLabel x={228} y={146} anchor="middle" fill="#0f172a">B</AxisLabel>
      <AxisLabel x={196} y={35} fill={BLUE}>C</AxisLabel>
      <AxisLabel x={112} y={35} anchor="end" fill={EMERALD}>D</AxisLabel>
      <text x="150" y="161" fontSize="8.5" fill={AMBER} textAnchor="middle">同じ弧AB</text>

      <text x="150" y="198" fontSize="8" fill={TEXT_COLOR} textAnchor="middle">
        Cから見てもDから見ても、同じ弧ABを見る円周角は等しい
      </text>
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
      case "parabola-basic":
        return <ParabolaBasic />;
      case "vertex-axis":
        return <VertexAxis />;
      case "completing-square-shift":
        return <CompletingSquareShift />;
      case "domain-max-min":
        return <DomainMaxMin />;
      case "axis-position-cases":
        return <AxisPositionCases />;
      case "case-split-flow":
        return <CaseSplitFlow />;
      case "circle-inscribed-central-angle":
        return <CircleInscribedCentralAngle />;
      case "circle-same-arc-angles":
        return <CircleSameArcAngles />;
      case "circle-tangent-chord-angle":
        return <CircleTangentChordAngle />;
      case "geometry-ceva-theorem":
        return <GeometryCevaTheorem />;
      case "geometry-menelaus-theorem":
        return <GeometryMenelausTheorem />;
      case "geometry-ceva-menelaus-compare":
        return <GeometryCevaMenelausCompare />;
      case "geometry-power-intersecting-chords":
        return <GeometryPowerIntersectingChords />;
      case "geometry-power-two-secants":
        return <GeometryPowerTwoSecants />;
      case "geometry-power-tangent-secant":
        return <GeometryPowerTangentSecant />;
      case "geometry-centers-circum-incenter":
        return <GeometryCentersCircumIncenter />;
      case "geometry-centers-centroid-orthocenter":
        return <GeometryCentersCentroidOrthocenter />;
      case "geometry-centers-five-compare":
        return <GeometryCentersFiveCompare />;
      case "geometry-cyclic-opposite-angles":
        return <GeometryCyclicOppositeAngles />;
      case "geometry-cyclic-exterior-angle":
        return <GeometryCyclicExteriorAngle />;
      case "geometry-cyclic-same-arc":
        return <GeometryCyclicSameArc />;
      default:
        return null;
    }
  })();

  if (!diagram) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-sky-200 bg-sky-50">
      <div className="p-3">{diagram}</div>
      {caption && (
        <div className="border-t border-sky-200 bg-white px-3 py-1.5">
          <CourseBodyRenderer body={caption} className="text-[10px] leading-relaxed text-slate-500" />
        </div>
      )}
    </div>
  );
}
