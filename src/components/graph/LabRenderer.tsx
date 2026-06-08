"use client";

import type { GraphKey } from "@/lib/types";
import { AmGmLab } from "./labs/AmGmLab";
import { SegmentEnvelopeLab } from "./labs/SegmentEnvelopeLab";
import { ParabolaFamilyLab } from "./labs/ParabolaFamilyLab";
import { TanDegreeLab } from "./labs/TanDegreeLab";
import { SineSynthesisLab } from "./labs/SineSynthesisLab";
import { CubicTangentsLab } from "./labs/CubicTangentsLab";
import { RootsOfUnityLab } from "./labs/RootsOfUnityLab";
import { RiemannSumLab } from "./labs/RiemannSumLab";
import { QuadMinOnIntervalLab } from "./labs/QuadMinOnIntervalLab";
import { QuadMinMovingIntervalLab } from "./labs/QuadMinMovingIntervalLab";
import { QuadRootPlacementLab } from "./labs/QuadRootPlacementLab";
import { LawOfCosinesLab } from "./labs/LawOfCosinesLab";
import { CircumcircleSineRuleLab } from "./labs/CircumcircleSineRuleLab";
import { TriangleAreaLab } from "./labs/TriangleAreaLab";
import { ScatterCorrelationLab } from "./labs/ScatterCorrelationLab";
import { BoxplotQuartilesLab } from "./labs/BoxplotQuartilesLab";
import { DeviationVarianceLab } from "./labs/DeviationVarianceLab";
import { LatticePathsLab } from "./labs/LatticePathsLab";
import { PascalTriangleLab } from "./labs/PascalTriangleLab";
import { InscribedAngleLab } from "./labs/InscribedAngleLab";
import { PowerOfPointLab } from "./labs/PowerOfPointLab";
import { CevaTheoremLab } from "./labs/CevaTheoremLab";
import { TrigGraphTransformLab } from "./labs/TrigGraphTransformLab";
import { ExpLogInverseLab } from "./labs/ExpLogInverseLab";
import { TangentSlopeLab } from "./labs/TangentSlopeLab";
import { VectorAddLab } from "./labs/VectorAddLab";
import { DominoInductionLab } from "./labs/DominoInductionLab";
import { GeometryThreeLensesLab } from "./labs/GeometryThreeLensesLab";
import { CauchySchwarzLab } from "./labs/CauchySchwarzLab";
import { TrigUnitCircleTransformLab } from "./labs/TrigUnitCircleTransformLab";
import { SpiderWebPlotLab } from "./labs/SpiderWebPlotLab";
import { ObliqueCoordinatesLab } from "./labs/ObliqueCoordinatesLab";
import { LogScaleSliderLab } from "./labs/LogScaleSliderLab";
import { EuclideanAlgorithmLab } from "./labs/EuclideanAlgorithmLab";
import { LinearDiophantineLab } from "./labs/LinearDiophantineLab";
import { ModularClockLab } from "./labs/ModularClockLab";
import { ConvexityJensenLab } from "./labs/ConvexityJensenLab";
import { RegionLinearProgrammingLab } from "./labs/RegionLinearProgrammingLab";
import { AreaBetweenCurvesLab } from "./labs/AreaBetweenCurvesLab";
import { ComplexRotationMultiplyLab } from "./labs/ComplexRotationMultiplyLab";
import { MeanValueTheoremLab } from "./labs/MeanValueTheoremLab";
import { Tetrahedron3dLab } from "./labs/Tetrahedron3dLab";
import { SignedAreaAccumulationLab } from "./labs/SignedAreaAccumulationLab";
import { AbsValueIntegralLab } from "./labs/AbsValueIntegralLab";
import { CubicHorizontalLineCountLab } from "./labs/CubicHorizontalLineCountLab";
import { CommonTangentParabolasLab } from "./labs/CommonTangentParabolasLab";
import { ApolloniusCircleLab } from "./labs/ApolloniusCircleLab";
import { ParabolaTangentEnvelopeLab } from "./labs/ParabolaTangentEnvelopeLab";
import { PerpendicularLinesLocusLab } from "./labs/PerpendicularLinesLocusLab";
import { AbsSumNumberLineLab } from "./labs/AbsSumNumberLineLab";
import { ParabolaLineTangencyLab } from "./labs/ParabolaLineTangencyLab";
import { CircleLevelSegmentLab } from "./labs/CircleLevelSegmentLab";
import { CyclicQuadrilateralLab } from "./labs/CyclicQuadrilateralLab";
import { SumSquaredDeviationLab } from "./labs/SumSquaredDeviationLab";
import { BayesFrequencyBarsLab } from "./labs/BayesFrequencyBarsLab";
import { TwoCirclesCommonChordLab } from "./labs/TwoCirclesCommonChordLab";
import { QuadraticResidueMod3Lab } from "./labs/QuadraticResidueMod3Lab";
import { PlaneNormalDistanceLab } from "./labs/PlaneNormalDistanceLab";
import { GroupedSequenceLab } from "./labs/GroupedSequenceLab";
import { ProbStateTransitionLab } from "./labs/ProbStateTransitionLab";
import { BinomialModeLab } from "./labs/BinomialModeLab";

const REGISTRY: Record<
  GraphKey,
  { Component: () => React.ReactElement; caption: string }
> = {
  "am-gm-min": {
    Component: AmGmLab,
    caption:
      "スライダー x を動かすと点が曲線上を走る。点線 y = 2 に触れるのは x = 1 のときだけ。",
  },
  "segment-envelope": {
    Component: SegmentEnvelopeLab,
    caption:
      "細い線分が線分族。スライダー a で 1 本を強調。シアンの曲線 √x+√y=1 が通過領域の境界(包絡線)。",
  },
  "parabola-family": {
    Component: ParabolaFamilyLab,
    caption:
      "スライダー t で放物線が動く。頂点(緑)が描く軌跡がシアンの放物線 y = −x²。",
  },
  "tan-degree-unit-circle": {
    Component: TanDegreeLab,
    caption:
      "θ を整数度で動かし、x = 1 上の接線分の長さ tan θ を観察する。",
  },
  "sine-synthesis": {
    Component: SineSynthesisLab,
    caption:
      "スライダー a, b で波を変形。マゼンタの合成波は常に 1 本のサインで、振幅は破線 ±R = ±√(a²+b²)。",
  },
  "cubic-tangents": {
    Component: CubicTangentsLab,
    caption:
      "点 P をドラッグ。y = x³ へ引ける接線(緑)の本数が、P の位置（領域）で 1〜3 本に変わる。",
  },
  "roots-of-unity": {
    Component: RootsOfUnityLab,
    caption:
      "スライダー n で、1 の n 乗根が単位円に内接する正 n 角形の頂点に並ぶ。緑が ζ₀ = 1。",
  },
  "riemann-sum": {
    Component: RiemannSumLab,
    caption:
      "スライダー n で長方形を細かくすると、リーマン和 Σ が ∫₀¹x²dx = 1/3 に収束していく。",
  },
  "quad-min-on-interval": {
    Component: QuadMinOnIntervalLab,
    caption:
      "区間 [0,2] は固定。スライダー a で軸 x=a を動かすと、最小点(緑)が左端→頂点→右端と移る。",
  },
  "quad-min-moving-interval": {
    Component: QuadMinMovingIntervalLab,
    caption:
      "放物線は固定。スライダー t で幅1の区間 [t, t+1] を動かすと、最小点(緑)が右端→頂点→左端と移る。",
  },
  "quad-root-placement": {
    Component: QuadRootPlacementLab,
    caption:
      "スライダー a で、D>0・軸>0・f(0)>0 の3条件を観察。3つ揃うと2解(緑)がともに正になる。",
  },
  "law-of-cosines": {
    Component: LawOfCosinesLab,
    caption:
      "2辺 CA=4, CB=3 は固定。挟角 C を動かすと対辺 c が変化。C=90° で c=5（3-4-5 直角三角形）。",
  },
  "circumcircle-sine-rule": {
    Component: CircumcircleSineRuleLab,
    caption:
      "頂点 A を同じ弧の上で動かしても ∠A は一定（円周角の定理）。よって a/sinA = 2R = 4 は不変。",
  },
  "triangle-area": {
    Component: TriangleAreaLab,
    caption:
      "S = ½·4·3·sin C = 6 sin C。挟角 C=90° のとき面積は最大 6 になる。",
  },
  "scatter-correlation": {
    Component: ScatterCorrelationLab,
    caption:
      "スライダー「傾き a」で点群が直線に揃うほど相関係数 r が ±1 に近づく。a=0 で r≈0。",
  },
  "boxplot-quartiles": {
    Component: BoxplotQuartilesLab,
    caption:
      "外れ値を大きくすると平均(▲)は引きずられるが、中央値(緑)はほとんど動かない＝中央値は頑健。",
  },
  "deviation-variance": {
    Component: DeviationVarianceLab,
    caption:
      "変換 y=ax+b。b で平行移動、a で平均まわりに拡大。平均は a·5+b、分散は a²·2 になる。",
  },
  "lattice-paths": {
    Component: LatticePathsLab,
    caption:
      "スライダーで格子の縦横を変えると、S→G の最短経路数 C(W+H, H) が更新される。",
  },
  "pascal-triangle": {
    Component: PascalTriangleLab,
    caption:
      "スライダーで内部のマスを選ぶと、そのマス(緑)＝左上＋右上(マゼンタ)。組合せの加法定理 C(n,k)=C(n−1,k−1)+C(n−1,k)。",
  },
  "inscribed-angle": {
    Component: InscribedAngleLab,
    caption:
      "頂点 A を弧の上で動かしても円周角 ∠BAC は一定で、つねに中心角 ∠BOC の半分。",
  },
  "power-of-a-point": {
    Component: PowerOfPointLab,
    caption:
      "点 P をドラッグ／直線を回転しても PA·PB = PC·PD は一定。値は |R²−OP²|（点の方べき）。",
  },
  "ceva-theorem": {
    Component: CevaTheoremLab,
    caption:
      "内部の点 P を動かすと、3 本のチェバ線が対辺を分ける比の積 (BD/DC)(CE/EA)(AF/FB) は常に 1。",
  },
  "euclidean-algorithm": {
    Component: EuclideanAlgorithmLab,
    caption:
      "a×b の長方形を最大の正方形で敷き詰めていく＝互除法。最後に残る最小の正方形の一辺が gcd(a,b)。",
  },
  "linear-diophantine": {
    Component: LinearDiophantineLab,
    caption:
      "直線 2x+4y=c 上の格子点(緑)が整数解。gcd(2,4)=2 なので c が偶数のときだけ解が現れる。",
  },
  "modular-clock": {
    Component: ModularClockLab,
    caption:
      "m 個の目盛りの時計を k 歩進むと k mod m に着く。法 m と k を変えて合同式を体感する。",
  },
  "trig-graph-transform": {
    Component: TrigGraphTransformLab,
    caption:
      "a, b, c, d を動かして y = a·sin(bx + c) + d の振幅・周期・位相・平行移動を観察する。",
  },
  "exp-log-inverse": {
    Component: ExpLogInverseLab,
    caption:
      "y = aˣ と y = logₐx は直線 y = x に関して対称（互いに逆関数）。底 a を変えて確認する。",
  },
  "tangent-slope": {
    Component: TangentSlopeLab,
    caption:
      "接点を動かすと接線の傾き＝微分係数 f'(x) が変わる。極値 x=±1 で傾きが 0 になる。",
  },
  "vector-add": {
    Component: VectorAddLab,
    caption:
      "A, B をドラッグすると和 a+b が平行四辺形の対角線になる。スライダーで b を実数倍。",
  },
  "domino-induction-visualizer": {
    Component: DominoInductionLab,
    caption:
      "スライダー k でドミノを倒す。「型」を変えると、次の 1 枚を倒すのに必要な仮定（マゼンタ）が変わる。",
  },
  "geometry-three-lenses": {
    Component: GeometryThreeLensesLab,
    caption:
      "1 つの三角形を「初等幾何／座標／ベクトル」の 3 つのレンズで切り替えて眺める。",
  },
  "cauchy-schwarz-vectors": {
    Component: CauchySchwarzLab,
    caption:
      "a, b をドラッグ。つねに |a·b| ≤ |a||b|。差（平行四辺形の面積）が 0 のとき＝平行で等号。",
  },
  "trig-unit-circle-transform": {
    Component: TrigUnitCircleTransformLab,
    caption:
      "θ と変換を選ぶと、単位円上の点 P が回転・折り返しで像 Q に移り、sin・cos の符号の入替が見える。",
  },
  "spider-web-plot": {
    Component: SpiderWebPlotLab,
    caption:
      "y=f(x) と y=x の間を階段状に進むクモの巣。不動点 x*（特性方程式の解）へ |r|<1 で収束、それ以外で発散。",
  },
  "oblique-coordinates": {
    Component: ObliqueCoordinatesLab,
    caption:
      "基底 e₁, e₂ をドラッグすると斜交グリッドが歪む。e₁∥e₂（det=0）で潰れる＝1 次従属。",
  },
  "log-scale-slider": {
    Component: LogScaleSliderLab,
    caption:
      "底 2 / e / 10 の対数目盛り。x を動かすと各スケールでの位置が一定比で動く＝底の変換。",
  },
  "convexity-jensen": {
    Component: ConvexityJensenLab,
    caption:
      "凸関数 y=x² では弦が上・接線が下。スライダー λ で、曲線の値 f(λa+(1−λ)b) が弦の値 λf(a)+(1−λ)f(b) を超えない＝イェンゼンの不等式。",
  },
  "region-linear-programming": {
    Component: RegionLinearProgrammingLab,
    caption:
      "制約が作る四角形の領域。スライダー z で目的関数の直線 2x+3y=z を平行移動。領域に最後に触れる頂点 (2,3) が最適で z*=13。",
  },
  "area-between-curves": {
    Component: AreaBetweenCurvesLab,
    caption:
      "放物線 y=x² と直線 y=x+c の間の面積。スライダー c を変えても、面積は常に (1/6)(β−α)³ に一致する＝1/6 公式。",
  },
  "complex-rotation-multiply": {
    Component: ComplexRotationMultiplyLab,
    caption:
      "複素数の積は回転×拡大。z をドラッグし α=r(cosθ+isinθ) を変えると、w=αz は |w|=r|z|・arg w=θ+arg z を満たす。",
  },
  "mean-value-theorem": {
    Component: MeanValueTheoremLab,
    caption:
      "平均値の定理。スライダー b を動かしても、c での接線（緑）は弦（マゼンタ）と常に平行＝f'(c)=(f(b)−f(a))/(b−a)。",
  },
  "tetrahedron-3d": {
    Component: Tetrahedron3dLab,
    caption:
      "正四面体を回転する影として表示。全6辺は等しく(2√2)、重心からの2ベクトルの成す角は arccos(−1/3)≈109.47°。",
  },
  "signed-area-accumulation": {
    Component: SignedAreaAccumulationLab,
    caption:
      "v(t)=3t²−6t の符号付き面積。スライダー T を動かすと位置 x(T)=∫₀ᵀv dt=T³−3T² が累積。0<t<2 では v<0 で面積が引かれ、x(3)=0 に戻る。",
  },
  "abs-value-integral": {
    Component: AbsValueIntegralLab,
    caption:
      "g(x)=x²−x の絶対値積分。破線が g、実線が |g|（折り返した姿）。スライダー b で ∫_{-1}^{b}|g|dx が累積し、b=2 で 11/6 に達する。",
  },
  "cubic-horizontal-line-count": {
    Component: CubicHorizontalLineCountLab,
    caption:
      "x³−3x²+2=k の実数解の個数を、曲線と水平線 y=k の交点数として見る。スライダー k が極大2・極小−2 をまたぐと 1↔2↔3 個と変わる。",
  },
  "common-tangent-parabolas": {
    Component: CommonTangentParabolasLab,
    caption:
      "C₁:y=x² と C₂:y=−(x−2)²+a の共通接線（緑）。スライダー a で C₂ を上下させると、判別式 16−8a の符号に応じて本数が 2→1→0 と変わる。",
  },
  "apollonius-circle": {
    Component: ApolloniusCircleLab,
    caption:
      "2 定点 A,B からの距離の比 PA:PB=k が一定の点はアポロニウスの円を描く。点 P を円上で動かすと PA/PB が常に k に等しい。k→1 で円は直線（垂直二等分線）へ。",
  },
  "parabola-tangent-envelope": {
    Component: ParabolaTangentEnvelopeLab,
    caption:
      "放物線 y=x² の接線族 y=2tx−t²。スライダー t で 1 本を強調。無数の接線が掃く通過領域はちょうど y≤x²（包絡線が放物線そのもの）。",
  },
  "perpendicular-lines-locus": {
    Component: PerpendicularLinesLocusLab,
    caption:
      "O を通る ℓ₁ と Q(2,0) を通る ℓ₂ は常に直交。交点 P はタレスの定理で直径 OQ の円 (x−1)²+y²=1 上を動く。スライダー m で追跡。",
  },
  "abs-sum-number-line": {
    Component: AbsSumNumberLineLab,
    caption:
      "|x−1|+|x+2| は数直線上で 2 点 −2,1 への距離の和。スライダー x を動かすと、x が 2 点の間にある限り和は 3（最小）で一定、外に出ると増える。",
  },
  "parabola-line-tangency": {
    Component: ParabolaLineTangencyLab,
    caption:
      "放物線 y=x²+ax+1 と直線 y=2x−3。スライダー a を動かすと判別式 D=(a−2)²−16 が変わり、D=0（a=6,−2）でちょうど接する。",
  },
  "circle-level-segment": {
    Component: CircleLevelSegmentLab,
    caption:
      "線分 x+2y=4 (x,y≥0) 上で x²+y²＝原点からの距離² を最大最小に。最小は垂線の足 F=(4/5,8/5)（16/5）、最大は遠い端 (4,0)（16）。",
  },
  "cyclic-quadrilateral": {
    Component: CyclicQuadrilateralLab,
    caption:
      "円に内接する四角形 ABCD。4 頂点を円周上でドラッグしても、対角の和 ∠A+∠C と ∠B+∠D はつねに 180°。これが cos D=−cos B の正体。",
  },
  "sum-squared-deviation": {
    Component: SumSquaredDeviationLab,
    caption:
      "f(t)=Σ(xᵢ−t)² は下に凸の放物線。スライダー t を動かすと、二乗偏差の和は t=平均 のときに最小（＝n×分散）になる。中心は平均。",
  },
  "bayes-frequency-bars": {
    Component: BayesFrequencyBarsLab,
    caption:
      "検査精度 99% でも、有病率が低いと陽性者の大半は偽陽性（マゼンタ）。スライダーで有病率を上げると真陽性（緑）の割合 P(病気|陽性) が増える。",
  },
  "two-circles-common-chord": {
    Component: TwoCirclesCommonChordLab,
    caption:
      "半径 4 と 3 の 2 円。スライダー中心間距離 d を変えると共通弦（緑）の長さが変わり、d=5 で 24/5=4.8。|R₁−R₂|<d<R₁+R₂ の外では交わらない。",
  },
  "quadratic-residue-mod3": {
    Component: QuadraticResidueMod3Lab,
    caption:
      "n² を 3 で割った余り。スライダー n を動かすと n² mod 3 は 0 と 1（緑）だけを行き来し、2（マゼンタ）には決して来ない。ピタゴラス数の証明の心臓。",
  },
  "plane-normal-distance": {
    Component: PlaneNormalDistanceLab,
    caption:
      "平面 3x+4y−12=0 を真横から見た断面。点 P をドラッグすると、平面への距離が法線方向への射影 |3x₀+4y₀−12|/|n| として測られる。垂線の足 H が緑。",
  },
  "grouped-sequence": {
    Component: GroupedSequenceLab,
    caption:
      "群数列 |1|2 3|4 5 6|…。第 g 群は g 個、累積は三角数 g(g+1)/2。スライダー N を動かすと、第 N 項がどの群の何番目かが浮かび上がる。",
  },
  "prob-state-transition": {
    Component: ProbStateTransitionLab,
    caption:
      "三角形の頂点を 1/2 ずつ移動する点。aₙ=P(A)=1/3+(2/3)(−1/2)ⁿ。スライダー n でディスクの大きさ（確率）が振動しながら一様 1/3 に収束する。",
  },
  "binomial-mode": {
    Component: BinomialModeLab,
    caption:
      "二項分布 P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ。スライダー n,p を動かすと、最頻値 k=⌊(n+1)p⌋（マゼンタ）が比 p_k/p_{k−1} の 1 越えに合わせて跳ぶ。",
  },
};

export function LabRenderer({ graphKey }: { graphKey: GraphKey }) {
  const entry = REGISTRY[graphKey];
  if (!entry) return null;
  const { Component, caption } = entry;

  return (
    <figure className="glass glow-cyan overflow-hidden rounded-xl p-3 sm:p-4">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neon-cyan/80">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-neon-cyan" />
        Interactive Lab
      </div>
      <Component />
      <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
