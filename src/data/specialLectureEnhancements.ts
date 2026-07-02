import type { Lecture, LectureBlock } from "@/data/specialLectures";
import {
  createGeometryDiagramDataUri,
  GEOMETRY_DIAGRAM_META,
  type GeometryDiagramType,
} from "@/lib/geometry-diagrams";

type LectureEnhancement = {
  reviewedGaps: string[];
  blocks: LectureBlock[];
};

function geometryDiagramBlock(id: string, type: GeometryDiagramType): LectureBlock {
  const meta = GEOMETRY_DIAGRAM_META[type];
  return {
    id,
    type: "image",
    src: createGeometryDiagramDataUri(type),
    alt: meta.alt,
    caption: `この図で見るポイント: ${meta.point}`,
  };
}

const geometryMeasurementDrill: LectureBlock = {
  id: "geometry-measurement-final-drill",
  type: "discriminationDrill",
  title: "満点判別ドリル：図形と計量の初手30本",
  intro:
    "計算に入る前に、辺・角・面積・円・測量のどれが主役かを判別します。共通テストでは、この初手選択が小問全体の流れを決めます。",
  items: [
    {
      condition: "2辺とその間の角が与えられ、残りの1辺を求める。",
      goal: "第三辺",
      choices: ["余弦定理", "正弦定理", "内接円半径"],
      answer: "余弦定理",
      reason: "挟角を含む2辺から第三辺を直接出せるのは余弦定理です。",
    },
    {
      condition: "1組の向かい合う辺と角、さらに別の辺が分かっている。",
      goal: "別の角のsin",
      choices: ["正弦定理", "余弦定理", "方べき"],
      answer: "正弦定理",
      reason: "向かい合う辺と角の比をそろえ、別の角のsinへ運びます。",
    },
    {
      condition: "2辺とはさむ角があり、面積を求める小問が入っている。",
      goal: "三角形の面積",
      choices: ["面積公式", "正弦定理", "接弦定理"],
      answer: "面積公式",
      reason: "面積は、はさむ角のsinを使う公式にそのまま乗ります。",
    },
    {
      condition: "面積と2辺が与えられ、はさむ角のsinを求める。",
      goal: "sinの値",
      choices: ["面積公式から逆算", "余弦定理", "メネラウス"],
      answer: "面積公式から逆算",
      reason: "面積公式をsinについて解けば、角度を出さずにsinが求まります。",
    },
    {
      condition: "3辺がすべて分かっていて、角のcosを求める。",
      goal: "cosの値",
      choices: ["余弦定理", "正弦定理", "内角の二等分線"],
      answer: "余弦定理",
      reason: "3辺から角のcosを直接出せるのは余弦定理です。",
    },
    {
      condition: "余弦定理でcosが負になったあと、sinを求める。",
      goal: "sinの値",
      choices: ["相互関係", "正弦定理だけ", "方べき"],
      answer: "相互関係",
      reason: "三角形の内角ではsinは正なので、sin二乗とcos二乗の関係で正の値を取ります。",
    },
    {
      condition: "辺と向かいの角が1組あり、外接円半径を求める。",
      goal: "外接円半径",
      choices: ["正弦定理", "内接円の面積公式", "チェバ"],
      answer: "正弦定理",
      reason: "正弦定理の右端が外接円半径の2倍です。",
    },
    {
      condition: "3辺と面積が分かっていて、内接円半径を求める。",
      goal: "内接円半径",
      choices: ["面積と半周長", "正弦定理", "円周角"],
      answer: "面積と半周長",
      reason: "面積は内接円半径と半周長の積で表せます。",
    },
    {
      condition: "内接四角形で向かい合う角の一方が分かっている。",
      goal: "もう一方の角",
      choices: ["補角", "余弦定理", "面積公式"],
      answer: "補角",
      reason: "内接四角形の対角の和は180度なので、補角として扱います。",
    },
    {
      condition: "同じ弧を見込む角が複数あり、求めたい角を移せそう。",
      goal: "角の移動",
      choices: ["円周角", "内接円半径", "測量のtan"],
      answer: "円周角",
      reason: "同じ弧に対する円周角は等しいので、使いやすい位置へ角を移せます。",
    },
    {
      condition: "円の外の点から接線と割線があり、接線の長さを出したい。",
      goal: "接線長",
      choices: ["方べき", "正弦定理", "面積公式"],
      answer: "方べき",
      reason: "外部点から接線と割線が見えたら、接線の二乗と割線の積を対応させます。",
    },
    {
      condition: "距離と仰角が与えられ、高さを求める測量問題。",
      goal: "高さ",
      choices: ["tanで直角三角形にする", "余弦定理だけ", "チェバ"],
      answer: "tanで直角三角形にする",
      reason: "水平距離と高さの関係は直角三角形のtanで立式します。",
    },
    {
      condition: "2地点から同じ塔を見る仰角が与えられている。",
      goal: "塔の高さ",
      choices: ["2つの直角三角形", "外接円半径", "方べき"],
      answer: "2つの直角三角形",
      reason: "高さを共通文字にして、2つのtanの式を連立します。",
    },
    {
      condition: "立体の中で辺の長さや角を求める。",
      goal: "空間図形の計量",
      choices: ["断面の三角形", "立体のまま公式", "包除原理"],
      answer: "断面の三角形",
      reason: "求めたい長さや角を含む平面断面を取り出して、平面の三角比に戻します。",
    },
    {
      condition: "正四面体の高さを求める誘導で、底面の中心が出てきた。",
      goal: "高さ",
      choices: ["直角三角形を作る", "正弦定理", "接弦定理"],
      answer: "直角三角形を作る",
      reason: "頂点、底面中心、底面の頂点で直角三角形を作ります。",
    },
    {
      condition: "図形の性質で相似を作ったあと、辺と角から面積へ進む。",
      goal: "図形の性質との融合",
      choices: ["相似で辺を作ってから計量", "最初から面積公式", "確率の表"],
      answer: "相似で辺を作ってから計量",
      reason: "融合問題では、まず図形の性質で必要な辺や角を作り、その後に三角比を使います。",
    },
    {
      condition: "問題文が先に面積を聞き、次にsinを聞いている。",
      goal: "誘導の読み方",
      choices: ["面積からsinへ逆算", "角度を小数で求める", "場合分け"],
      answer: "面積からsinへ逆算",
      reason: "共通テストの小問順は道筋です。面積の結果を次のsinに使います。",
    },
    {
      condition: "角度そのものは求めにくいが、補角なら同じsinになる。",
      goal: "sinの移し替え",
      choices: ["補角のsin", "cosの符号を無視", "内接円半径"],
      answer: "補角のsin",
      reason: "補角ではsinが等しいため、求めやすい角へ移せます。",
    },
    {
      condition: "3辺から面積を求めるが、角は直接与えられていない。",
      goal: "面積",
      choices: ["余弦定理からsinへ", "正弦定理だけ", "順列"],
      answer: "余弦定理からsinへ",
      reason: "3辺からcosを出し、相互関係でsinを出して面積に入れます。",
    },
    {
      condition: "円に内接する四角形の対角が誘導で出てきた。",
      goal: "次に使う性質",
      choices: ["対角の補角", "端点比較", "条件付き確率"],
      answer: "対角の補角",
      reason: "内接四角形の対角和から角を作り、三角比へつなげます。",
    },
  ],
};

const geometryPropertiesDrill: LectureBlock = {
  id: "geometry-properties-final-drill",
  type: "discriminationDrill",
  title: "満点判別ドリル：図形の性質の定理選択30本",
  intro:
    "比・円・相似・補助線のどれが主役かを見抜く練習です。計算より前に、使う定理の候補を1つに絞ります。",
  items: [
    {
      condition: "三角形の内部の1点から3頂点へ線が引かれ、各辺が比で分けられている。",
      goal: "比の関係",
      choices: ["チェバの定理", "メネラウスの定理", "方べき"],
      answer: "チェバの定理",
      reason: "3本の線が三角形の内部で1点に集まる形はチェバです。",
    },
    {
      condition: "三角形を横切る一直線が3辺または延長を切っている。",
      goal: "比の関係",
      choices: ["メネラウスの定理", "チェバの定理", "接弦定理"],
      answer: "メネラウスの定理",
      reason: "一直線が三角形を横切る形はメネラウスです。",
    },
    {
      condition: "同じ弧を見込む2つの角がある。",
      goal: "角の等しさ",
      choices: ["円周角", "方べき", "トレミー"],
      answer: "円周角",
      reason: "同じ弧に対する円周角は等しくなります。",
    },
    {
      condition: "接線と弦が作る角が、円周角と対応している。",
      goal: "角の移動",
      choices: ["接弦定理", "内角の二等分線", "余事象"],
      answer: "接弦定理",
      reason: "接線と弦の角は、反対側の弧に対する円周角と等しくなります。",
    },
    {
      condition: "円外の点から2本の割線が引かれている。",
      goal: "線分の積",
      choices: ["方べき", "中点連結定理", "正弦定理"],
      answer: "方べき",
      reason: "外部点からの割線同士は、外側と全体の積が等しくなります。",
    },
    {
      condition: "円外の点から接線と割線が引かれている。",
      goal: "接線の長さ",
      choices: ["方べき", "トレミー", "チェバ"],
      answer: "方べき",
      reason: "接線の二乗と割線の外側・全体の積を対応させます。",
    },
    {
      condition: "2つの三角形で2角が等しい。",
      goal: "辺の比",
      choices: ["相似", "メネラウス", "反復試行"],
      answer: "相似",
      reason: "2角がそろえば相似で、対応する辺の比を使えます。",
    },
    {
      condition: "角の二等分線が対辺を分けている。",
      goal: "対辺の比",
      choices: ["内角の二等分線", "接弦定理", "トレミー"],
      answer: "内角の二等分線",
      reason: "内角の二等分線は、対辺を隣り合う2辺の比に分けます。",
    },
    {
      condition: "円に内接する四角形で4辺と対角線が関係している。",
      goal: "対角線の積",
      choices: ["トレミーの定理", "チェバの定理", "面積公式"],
      answer: "トレミーの定理",
      reason: "内接四角形の辺と対角線の関係はトレミーを疑います。",
    },
    {
      condition: "中点を結んだ線分が出てきた。",
      goal: "平行と長さ",
      choices: ["中点連結定理", "方べき", "条件付き確率"],
      answer: "中点連結定理",
      reason: "2辺の中点を結ぶ線分は残りの辺に平行で長さは半分です。",
    },
    {
      condition: "辺の比は見えるが、角の情報がまだ足りない。",
      goal: "補助線の候補",
      choices: ["平行線を引いて相似を作る", "いきなり方べき", "判別式"],
      answer: "平行線を引いて相似を作る",
      reason: "比を使う問題では、相似を作る補助線が第一候補です。",
    },
    {
      condition: "円周角で角が移せるが、長さがまだ出ない。",
      goal: "計量への接続",
      choices: ["相似や正弦定理につなぐ", "角だけで終了", "余事象"],
      answer: "相似や正弦定理につなぐ",
      reason: "角を移した後は、相似で辺を作るか、図形と計量へ接続します。",
    },
    {
      condition: "比の積が1になる形を作りたいが、線は内部で交わっている。",
      goal: "定理選択",
      choices: ["チェバの定理", "メネラウスの定理", "トレミーの定理"],
      answer: "チェバの定理",
      reason: "内部の3線が1点で交わる形ならチェバです。",
    },
    {
      condition: "比の積が1になる形を作りたいが、3点が一直線上にある。",
      goal: "定理選択",
      choices: ["メネラウスの定理", "チェバの定理", "中点連結定理"],
      answer: "メネラウスの定理",
      reason: "一直線上に3つの分点があるならメネラウスです。",
    },
    {
      condition: "接線が出ているのに、円周角だけでは角が足りない。",
      goal: "角の補充",
      choices: ["接弦定理", "方べき", "平方完成"],
      answer: "接弦定理",
      reason: "接線がある角問題では、接弦定理で円周角へ変換します。",
    },
    {
      condition: "円の中の2本の弦が交わり、4つの線分ができている。",
      goal: "線分の積",
      choices: ["方べき", "トレミー", "接弦定理"],
      answer: "方べき",
      reason: "交わる弦の積も方べきの一形態です。",
    },
    {
      condition: "図形の性質で得た辺を使って、三角形の面積を出す。",
      goal: "融合の初手",
      choices: ["まず相似で辺を確定", "まず面積公式だけ", "まず確率の表"],
      answer: "まず相似で辺を確定",
      reason: "融合問題は、性質で辺・角を作ってから計量に入ります。",
    },
    {
      condition: "内接四角形で対角の和が使え、さらに辺の長さが問われている。",
      goal: "次の接続",
      choices: ["補角から三角比へ", "順列で数える", "軸を調べる"],
      answer: "補角から三角比へ",
      reason: "補角で角を作り、正弦定理や余弦定理に接続します。",
    },
    {
      condition: "見た目が複雑だが、等しい角が2組見つかった。",
      goal: "辺の比",
      choices: ["相似", "方べき", "独立"],
      answer: "相似",
      reason: "等角2組は相似の合図です。複雑な図ほどまず相似を探します。",
    },
    {
      condition: "辺の比と角の二等分線が同時に出ている。",
      goal: "最初の定理",
      choices: ["内角の二等分線", "接弦定理", "余弦定理"],
      answer: "内角の二等分線",
      reason: "二等分線が対辺を分ける比を先に確定すると、後続の相似や計量に進めます。",
    },
  ],
};

const quadraticDrill: LectureBlock = {
  id: "quadratic-final-drill",
  type: "discriminationDrill",
  title: "満点判別ドリル：二次関数の条件整理（判別式・共有点まで）",
  intro:
    "軸・定義域・端点・判別式のどれを見るべきかを選びます。共通テストでは、式変形より先に条件の位置関係を整理します。",
  items: [
    {
      condition: "二次関数の最大最小で定義域が固定、軸に文字がある。",
      goal: "場合分け",
      choices: ["軸と定義域", "判別式", "余事象"],
      answer: "軸と定義域",
      reason: "軸が区間の左・内・右のどこにあるかで最小値が変わります。",
    },
    {
      condition: "最大値を求める問題で、上に開く放物線が区間上にある。",
      goal: "最大値",
      choices: ["端点比較", "頂点だけ", "正弦定理"],
      answer: "端点比較",
      reason: "上に開く放物線の最大は区間端点のどちらかです。",
    },
    {
      condition: "区間内に異なる2解を持つ条件を問われている。",
      goal: "共有点",
      choices: ["判別式と端点符号", "平方完成だけ", "組合せ"],
      answer: "判別式と端点符号",
      reason: "解の個数は判別式だけでなく、解が区間内に入る条件も必要です。",
    },
    {
      condition: "グラフとx軸が接する条件を問われている。",
      goal: "接する条件",
      choices: ["判別式が0", "端点比較", "円周角"],
      answer: "判別式が0",
      reason: "二次方程式が重解を持つとき、グラフはx軸に接します。",
    },
    {
      condition: "頂点の座標を素早く読む必要がある。",
      goal: "頂点",
      choices: ["平方完成", "方べき", "余事象"],
      answer: "平方完成",
      reason: "二次関数の軸と頂点は平方完成で読むのが最短です。",
    },
    {
      condition: "区間の両端の値が等しくなる境界を探す。",
      goal: "最大値の場合分け",
      choices: ["端点の値を等置", "判別式が0", "接弦定理"],
      answer: "端点の値を等置",
      reason: "最大値の端点切り替わりは、左右端点の値が等しいところです。",
    },
    {
      condition: "最小値の発生場所が左端、頂点、右端で変わる。",
      goal: "場合分け",
      choices: ["軸の位置", "x軸との共有点だけ", "反復試行"],
      answer: "軸の位置",
      reason: "最小値は軸が区間内なら頂点、外なら近い端点です。",
    },
    {
      condition: "不等式が常に成り立つ条件を問われた。",
      goal: "全範囲での上下",
      choices: ["頂点の値と開き方", "端点だけ", "メネラウス"],
      answer: "頂点の値と開き方",
      reason: "上に開くなら最小値、下に開くなら最大値を見るのが基本です。",
    },
    {
      condition: "会話文で、先にグラフの概形を選ばせてから値を求める。",
      goal: "共通テスト誘導",
      choices: ["概形から軸と端点を読む", "先に全部展開する", "表を数える"],
      answer: "概形から軸と端点を読む",
      reason: "誘導図は、場合分けの境界や端点比較を知らせるためにあります。",
    },
    {
      condition: "パラメータ付き二次関数で、最大値が一定になる範囲を問われた。",
      goal: "定数条件",
      choices: ["端点比較と軸の位置", "判別式だけ", "正弦定理"],
      answer: "端点比較と軸の位置",
      reason: "最大値がどちらの端点で出るか、軸がどこにあるかを同時に見ます。",
    },
    {
      condition: "放物線が $x$ 軸と異なる2点で交わる条件を求める。",
      goal: "共有点2個の条件",
      choices: ["判別式 $D>0$", "判別式 $D=0$", "頂点の $x$ 座標"],
      answer: "判別式 $D>0$",
      reason: "異なる2つの実数解は $D>0$。等号を含めない。",
    },
    {
      condition: "放物線が $x$ 軸に接する条件を求める。",
      goal: "接する条件",
      choices: ["判別式 $D=0$", "判別式 $D>0$", "端点比較"],
      answer: "判別式 $D=0$",
      reason: "重解を持つとき、グラフは $x$ 軸に接する。",
    },
    {
      condition: "上に凸の放物線が常に $x$ 軸より上にある（共有点なし）条件。",
      goal: "共有点なしの条件",
      choices: ["判別式 $D<0$", "判別式 $D=0$", "軸が区間内"],
      answer: "判別式 $D<0$",
      reason: "実数解を持たないので $D<0$。上に凸なら常に正になる。",
    },
    {
      condition: "二次不等式 $f(x)\\ge 0$ がすべての $x$ で成り立つ（上に凸）。",
      goal: "常に成立の条件",
      choices: ["頂点の $y$ 座標と開き方", "端点だけ", "判別式 $D>0$"],
      answer: "頂点の $y$ 座標と開き方",
      reason: "上に凸なら最小値（頂点）が0以上であればよい。",
    },
    {
      condition: "区間 $0\\le x\\le 3$ に異なる2解がともに入る条件を求める。",
      goal: "区間内に2解",
      choices: ["判別式・軸・端点の符号", "判別式だけ", "頂点だけ"],
      answer: "判別式・軸・端点の符号",
      reason: "解の個数は $D$、区間内かは軸の位置と端点の符号で確認する。",
    },
    {
      condition: "ボールの高さ $h(t)$ が二次関数。最高到達点を求めたい。",
      goal: "最大値の読解",
      choices: ["平方完成で頂点を読む", "判別式を計算", "端点を比較"],
      answer: "平方完成で頂点を読む",
      reason: "下に凸の最大は頂点。文章題でもまず平方完成で頂点を出す。",
    },
  ],
};

const probabilityDrill: LectureBlock = {
  id: "probability-final-drill",
  type: "discriminationDrill",
  title: "満点判別ドリル：確率の誘導読解（独立・排反・母集団まで）",
  intro:
    "順列・組合せ・余事象・条件付き確率・反復試行のどれを使うかを、問題文の言い方から判別します。",
  items: [
    {
      condition: "人を一列に並べる。順番が変われば別の並べ方になる。",
      goal: "総数",
      choices: ["順列", "組合せ", "余事象"],
      answer: "順列",
      reason: "順番を区別するので順列です。",
    },
    {
      condition: "委員を選ぶ。選ばれた集合だけが問題で、順番は関係ない。",
      goal: "選び方",
      choices: ["組合せ", "順列", "反復試行"],
      answer: "組合せ",
      reason: "順番を区別しない選び方なので組合せです。",
    },
    {
      condition: "少なくとも1回成功する確率を求める。",
      goal: "確率",
      choices: ["余事象", "順列", "方べき"],
      answer: "余事象",
      reason: "少なくとも1回は、1から1回も起きない確率を引くのが速いです。",
    },
    {
      condition: "Aが起きたと分かった後で、Bの確率を求める。",
      goal: "条件付き確率",
      choices: ["母集団の更新", "排反", "端点比較"],
      answer: "母集団の更新",
      reason: "条件付き確率では、分母をAが起きた世界に更新します。",
    },
    {
      condition: "同じ試行をn回繰り返し、成功回数が指定されている。",
      goal: "確率",
      choices: ["反復試行", "組合せだけ", "円周角"],
      answer: "反復試行",
      reason: "成功回数を選び、成功確率と失敗確率を掛けます。",
    },
    {
      condition: "AとBが同時に起こらないことが明記されている。",
      goal: "和の確率",
      choices: ["排反", "独立", "相似"],
      answer: "排反",
      reason: "同時に起こらないなら、和の確率は単純に足せます。",
    },
    {
      condition: "Aが起きてもBの確率が変わらない設定。",
      goal: "積の確率",
      choices: ["独立", "排反", "方べき"],
      answer: "独立",
      reason: "互いに影響しない事象は独立として積を取ります。",
    },
    {
      condition: "赤玉を引いて戻さず、次の玉を引く。",
      goal: "2回目の確率",
      choices: ["母集団の変化", "独立", "順列だけ"],
      answer: "母集団の変化",
      reason: "戻さないので、2回目の分母と中身が変わります。",
    },
    {
      condition: "2つの数を選ぶが、同じ組を逆順で二重に数えてしまいそう。",
      goal: "重複カウント防止",
      choices: ["組合せで数える", "順列で数える", "判別式"],
      answer: "組合せで数える",
      reason: "順序が不要なら組合せにして重複を避けます。",
    },
    {
      condition: "会話文の中で表を埋めながら、条件ごとの人数を整理する。",
      goal: "長文読解",
      choices: ["表で母集団を分ける", "暗算で一気に数える", "正弦定理"],
      answer: "表で母集団を分ける",
      reason: "共通テストの長文確率は、条件を表に落として分母を確認します。",
    },
    {
      condition: "「AまたはB」で、AとBが同時に起こりうる確率を求める。",
      goal: "和の確率",
      choices: ["包除で重複を引く", "そのまま足す", "余事象だけ"],
      answer: "包除で重複を引く",
      reason: "重なりが0でないので、足してから重複を一度引きます。",
    },
    {
      condition: "3つの条件のうち少なくとも1つを満たす個数を数える。",
      goal: "個数",
      choices: ["包除原理", "余事象1回だけ", "順列だけ"],
      answer: "包除原理",
      reason: "3条件は、足す→2重を引く→3重を足すで数えます。",
    },
    {
      condition: "サイコロを2回振る。1回目と2回目は互いに影響しない。",
      goal: "積の確率",
      choices: ["独立", "排反", "母集団の更新"],
      answer: "独立",
      reason: "毎回条件が同じで影響しないので、確率を掛けます。",
    },
    {
      condition: "「同時には起こらない」と明記された2事象の和の確率。",
      goal: "和の確率",
      choices: ["排反として足す", "独立として掛ける", "包除で引く"],
      answer: "排反として足す",
      reason: "排反は重なりが0なので、そのまま足します。",
    },
    {
      condition: "「ちょうど2回」と「少なくとも2回」を読み分ける。",
      goal: "回数の限定",
      choices: ["ちょうどは個数を固定、少なくともは余事象も候補", "どちらも同じ", "どちらも順列"],
      answer: "ちょうどは個数を固定、少なくともは余事象も候補",
      reason: "「ちょうど」は反復試行で個数固定、「少なくとも」は余事象が速いこともあります。",
    },
    {
      condition: "同じ文字を含む並べ方の総数を求める。",
      goal: "重複順列",
      choices: ["同じ文字の個数の階乗で割る", "そのまま階乗", "組合せだけ"],
      answer: "同じ文字の個数の階乗で割る",
      reason: "同じものを含む順列は、重複する並べ替えで割ります。",
    },
  ],
};

const finalProblemBlocks: Record<string, LectureBlock[]> = {
  "geometry-measurement-intensive": [
    {
      id: "geometry-measurement-final-problem",
      type: "problem",
      title: "本番形式演習3：円と三角比の融合",
      prompt:
        "円に内接する四角形ABCDがあり、AB=6, BC=5, 角ABC=120度とする。対角線ACをaとおく。\n\n(1) aの2乗を求めよ。\n(2) 三角形ABCの面積を求めよ。\n(3) 角ADCのsinを求めよ。\n(4) ACを含む三角形で外接円半径を求めるとき、最初に使うべき道具を選べ。",
      choices: [
        "余弦定理、面積公式、補角と正弦定理",
        "正弦定理だけで全て進める",
        "内接円半径から面積を出す",
        "方べきだけで角を求める",
      ],
      answer: "余弦定理、面積公式、補角と正弦定理",
      points: 12,
      mistakeTags: ["公式選択ミス", "図の見落とし", "条件見落とし"],
    },
  ],
  "geometry-properties-auxiliary-lines": [
    {
      id: "geometry-properties-final-problem-1",
      type: "problem",
      title: "本番形式演習2：比から定理を選ぶ",
      prompt:
        "三角形ABCの辺BC, CA, AB上にそれぞれ点D, E, Fがある。AD, BE, CFが1点で交わることが分かっている。\n\n(1) BD:DC と CE:EA が与えられたとき、AF:FBを求めるために使う定理を選べ。\n(2) 同じ比の条件で、D, E, Fが一直線上にある設定なら使う定理は何に変わるか。\n(3) 2つの設定の見分け方を述べよ。",
      choices: ["チェバからメネラウスへ切り替える", "常に方べきだけを使う", "常にトレミーだけを使う", "角の二等分線だけを見る"],
      answer: "チェバからメネラウスへ切り替える",
      points: 12,
      mistakeTags: ["公式選択ミス", "図の見落とし"],
    },
    {
      id: "geometry-properties-final-problem-2",
      type: "problem",
      title: "本番形式演習3：円から計量へ接続",
      prompt:
        "円に内接する四角形ABCDで、対角線ACとBDが交わる点をPとする。AP, PC, BPの長さが誘導で与えられ、さらに三角形ABPの面積を求める。\n\n(1) DPを求める最初の道具を選べ。\n(2) 角APBが分かった後、面積へ進む道具を選べ。\n(3) この問題が図形と計量と融合している理由を述べよ。",
      choices: ["方べきでDP、面積公式で面積", "接弦定理だけ", "チェバだけ", "順列と組合せ"],
      answer: "方べきでDP、面積公式で面積",
      points: 12,
      mistakeTags: ["公式選択ミス", "条件見落とし", "図の見落とし"],
    },
  ],
  "quadratic-case-split-intensive": [
    {
      id: "quadratic-final-problem-1",
      type: "problem",
      title: "本番形式演習2：動く軸と最小値",
      prompt:
        "関数 f(x)=x^2-2tx+3 を 0以上x以下4 の範囲で考える。\n\n(1) 軸を求めよ。\n(2) 最小値が左端、頂点、右端で起こるtの範囲を選べ。\n(3) 共通テストでこの誘導が出たとき、先に図に書くべきものを答えよ。",
      choices: ["軸tと区間0から4", "判別式だけ", "最大値の端点だけ", "円周角"],
      answer: "軸tと区間0から4",
      points: 12,
      mistakeTags: ["場合分け不足", "条件見落とし"],
    },
    {
      id: "quadratic-final-problem-2",
      type: "problem",
      title: "本番形式演習3：共有点と条件整理",
      prompt:
        "放物線 y=x^2-2ax+a と x軸の共有点について考える。\n\n(1) 共有点を持つ条件を判別式で表せ。\n(2) 共有点が2つとも 0以上x以下3 に入るには、判別式以外に何を確認するか。\n(3) 会話文でグラフの概形が示されたとき、どこを読み取るか。",
      choices: ["判別式、軸、端点の符号", "平方完成だけ", "端点比較だけ", "余事象"],
      answer: "判別式、軸、端点の符号",
      points: 12,
      mistakeTags: ["条件見落とし", "場合分け不足"],
    },
  ],
  "probability-guided-reading": [
    {
      id: "probability-final-problem-1",
      type: "problem",
      title: "本番形式演習2：表で読む条件付き確率",
      prompt:
        "ある検査で陽性・陰性の結果と、実際に条件Aを満たすかどうかの表が与えられている。\n\n(1) 陽性である人を母集団にしたとき、条件Aを満たす確率を求めるにはどの欄を分母にするか。\n(2) 条件Aを満たす人のうち陽性である確率とは何が違うか。\n(3) 2つを取り違えないために、最初に読む語を答えよ。",
      choices: ["何が分かった後かを読む", "全体人数を常に分母にする", "順列で並べる", "余弦定理を使う"],
      answer: "何が分かった後かを読む",
      points: 12,
      mistakeTags: ["問題文の読み違い", "条件見落とし"],
    },
    {
      id: "probability-final-problem-2",
      type: "problem",
      title: "本番形式演習3：会話文と反復試行",
      prompt:
        "成功確率が一定のゲームを5回行う。会話文では『少なくとも1回成功』と『ちょうど2回成功』を比べている。\n\n(1) 少なくとも1回成功はどの考え方が速いか。\n(2) ちょうど2回成功はどの考え方が必要か。\n(3) 2つの式で、分子の数え方がずれないようにするには何を確認するか。",
      choices: ["余事象と反復試行を使い分ける", "どちらも順列だけ", "どちらも排反だけ", "方べきで処理する"],
      answer: "余事象と反復試行を使い分ける",
      points: 12,
      mistakeTags: ["公式選択ミス", "問題文の読み違い"],
    },
  ],
};

const finalExplanationBlocks: Record<string, LectureBlock[]> = {
  "geometry-measurement-intensive": [
    {
      id: "geometry-measurement-final-explanation",
      type: "explanationTabs",
      tabs: [
        { label: "ヒント", body: "最初の小問で辺の2乗を求めさせているなら、余弦定理の誘導です。面積を出した後は、sinへ逆算できないかを見ます。" },
        { label: "方針", body: "辺を余弦定理で作る、面積公式でsinを作る、円周角や補角で角を移す、最後に正弦定理へつなぐ、という順番です。" },
        { label: "詳しい解説", body: "共通テストでは、1つ前の小問の結果を次の公式選択に使わせます。角を直接求めず、面積や補角からsinだけを移動するのが速い流れです。" },
        { label: "最速解法", body: "2辺と挟角なら余弦定理、面積が出たらsin逆算、円に内接なら補角または円周角。この3つを順に確認します。" },
        { label: "よくあるミス", body: "cosの符号、面積公式の2分の1、辺と向かいの角の対応、補角でcosまで同じにしてしまうミスに注意します。" },
        { label: "類題", body: "内接四角形で対角が補角になる問題、外接円半径を正弦定理で求める問題、測量でtanを2本立てる問題へ進みます。" },
      ],
    },
  ],
  "geometry-properties-auxiliary-lines": [
    {
      id: "geometry-properties-final-explanation-1",
      type: "explanationTabs",
      tabs: [
        { label: "ヒント", body: "内部で3線が交わるか、3点が一直線かを最初に見ます。" },
        { label: "方針", body: "内部の交点ならチェバ、横切る直線ならメネラウス。円が混ざるときは、先に円周角・方べきで辺や角を作ります。" },
        { label: "詳しい解説", body: "比の問題は式を立てる前に図の形で判別します。共通テストでは、会話文が『交わる』『一直線』という言葉で定理選択を誘導します。" },
        { label: "最速解法", body: "1点集中ならチェバ、一直線ならメネラウス、円外点なら方べき、接線と弦なら接弦定理です。" },
        { label: "よくあるミス", body: "チェバとメネラウスを比の式だけで暗記して、図の形を見ずに取り違えるミスが多いです。" },
        { label: "類題", body: "方べきから辺を作り、図形と計量の面積公式へ接続する融合問題を解きます。" },
      ],
    },
    {
      id: "geometry-properties-final-checklist",
      type: "checklist",
      title: "図形の性質 満点チェック",
      items: [
        "内部で交わる3線と一直線上の3点を見分けられる",
        "接線が見えたら接弦定理と方べきを同時に候補にできる",
        "円周角で角を移した後、相似か計量へ進める",
        "比を作るための平行線・補助線を自分で引ける",
      ],
    },
  ],
  "quadratic-case-split-intensive": [
    {
      id: "quadratic-final-explanation",
      type: "explanationTabs",
      tabs: [
        { label: "ヒント", body: "二次関数の最大最小は、軸・定義域・端点の3つを同じ数直線に置きます。" },
        { label: "方針", body: "平方完成で軸を読む。最小値は軸の位置、最大値は端点比較。共有点は判別式に加えて範囲条件を確認します。" },
        { label: "詳しい解説", body: "判別式だけで解の個数は分かりますが、区間内にあるかは軸や端点の符号を見ないと決まりません。共通テストはここを会話文で聞きます。" },
        { label: "最速解法", body: "軸を書く、区間を書く、左端と右端の値を書く。これで最大最小のほとんどの誘導に乗れます。" },
        { label: "よくあるミス", body: "最小値の境界と最大値の境界を混ぜる、端点比較を忘れる、判別式だけで区間条件を済ませるミスに注意します。" },
        { label: "類題", body: "軸が動く最大最小、共有点が区間内に2つある条件、常に正となる条件を続けて解きます。" },
      ],
    },
  ],
  "probability-guided-reading": [
    {
      id: "probability-final-explanation",
      type: "explanationTabs",
      tabs: [
        { label: "ヒント", body: "確率は、分母を何にするかが勝負です。問題文の『〜のうち』『〜と分かったとき』を先に丸で囲みます。" },
        { label: "方針", body: "順番を区別するか、少なくともか、条件が付いた後か、同じ試行の繰り返しかを順に判別します。" },
        { label: "詳しい解説", body: "共通テストの長文確率は、会話文が母集団の変化を誘導します。表や樹形図は計算の前に、何を分母にするかを固定するために使います。" },
        { label: "最速解法", body: "順番ありなら順列、順番なしなら組合せ、少なくともなら余事象、条件付きなら母集団更新、同じ試行なら反復試行です。" },
        { label: "よくあるミス", body: "条件付き確率で分母を全体のままにする、順列で二重カウントする、独立と排反を混ぜるミスが多いです。" },
        { label: "類題", body: "検査表の条件付き確率、カードを戻さない抽出、少なくとも1回成功とちょうどk回成功の比較に進みます。" },
      ],
    },
  ],
};

const finalRecoveryBlocks: Record<string, LectureBlock> = {
  "geometry-measurement-intensive": {
    id: "geometry-measurement-final-recovery",
    type: "mistakeRecovery",
    title: "満点ミス回収：図形と計量",
    intro: "失点原因を、戻るべき判別ポイントへ細かく接続します。",
    items: [
      { symptom: "辺と角の対応をずらした", action: "正弦定理の向かい合う組を確認する", href: "#tool-flow" },
      { symptom: "面積からsinへ戻せなかった", action: "sinを出す優先順位フローへ戻る", href: "#sin-priority-flow" },
      { symptom: "補角でcosまで同じにした", action: "鋭角・鈍角と符号確認へ戻る", href: "#angle-sign-heading" },
      { symptom: "外接円半径Rを辺だけで出そうとした", action: "外接円Rの章へ戻る", href: "#circumradius-heading" },
      { symptom: "内接円半径rで半周長を忘れた", action: "内接円rと面積の関係を確認する", href: "#inradius-heading" },
      { symptom: "測量で図を描かずに式を書いた", action: "測量・空間図形の章へ戻る", href: "#survey-space-heading" },
    ],
  },
  "geometry-properties-auxiliary-lines": {
    id: "geometry-properties-final-recovery",
    type: "mistakeRecovery",
    title: "満点ミス回収：図形の性質",
    intro: "図の見落としを、定理選択の見直しに変えます。",
    items: [
      { symptom: "内部交点と一直線を見分けなかった", action: "比の章でチェバとメネラウスを比較する", href: "#gp-ratio-heading" },
      { symptom: "接線があるのに接弦定理を候補にしなかった", action: "円の章で接線と弦の角を見る", href: "#gp-circle-heading" },
      { symptom: "方べきで外側と全体を取り違えた", action: "方べきの積の対応を確認する", href: "#gp-circle-heading" },
      { symptom: "相似を作る補助線を引けなかった", action: "図形レイヤーで補助線を確認する", href: "#geometry-properties-layer" },
      { symptom: "性質で終わって計量へ接続できなかった", action: "図形と計量の融合へ進む", href: "/common-test/lectures/geometry-measurement-intensive" },
    ],
  },
  "quadratic-case-split-intensive": {
    id: "quadratic-final-recovery",
    type: "mistakeRecovery",
    title: "満点ミス回収：二次関数",
    intro: "場合分けの不足を、軸・端点・判別式のどこで起きたかに分解します。",
    items: [
      { symptom: "軸を平方完成で読まなかった", action: "解法判別フローへ戻る", href: "#quadratic-flow" },
      { symptom: "最大値なのに頂点だけ見た", action: "端点比較の型へ戻る", href: "#quadratic-endpoint-callout" },
      { symptom: "境界値を作らず感覚で分けた", action: "境界値の章へ戻る", href: "#quadratic-boundary-heading" },
      { symptom: "判別式だけで区間内の解を判断した", action: "判別ドリルで条件を確認する", href: "#quadratic-drill" },
      { symptom: "会話文の図を使わなかった", action: "軸と定義域を同じ数直線に置く", href: "#quadratic-axis-cases-figure" },
    ],
  },
  "probability-guided-reading": {
    id: "probability-final-recovery",
    type: "mistakeRecovery",
    title: "満点ミス回収：確率",
    intro: "読み違いを、分母・分子・数え方のズレとして回収します。",
    items: [
      { symptom: "順番ありなしを確認しなかった", action: "解法判別フローへ戻る", href: "#probability-flow" },
      { symptom: "少なくともを直接数えて崩れた", action: "余事象の判断へ戻る", href: "#probability-complement-callout" },
      { symptom: "条件付き確率で分母を更新しなかった", action: "判別ドリルで母集団を確認する", href: "#probability-drill" },
      { symptom: "戻さない抽出を独立として扱った", action: "表と樹形図で母集団の変化を見る", href: "#probability-counting-figure" },
      { symptom: "会話文の条件を1つ読み落とした", action: "表で条件を行と列に分ける", href: "#probability-flow" },
    ],
  },
};

const geometryMeasurementCenterAltitudeBlocks: LectureBlock[] = [
  {
    id: "geometry-measurement-altitude-flow",
    type: "solutionFlow",
    title: "高さと半径の判別フロー",
    intro:
      "図形と計量で止まりやすい「高さ」「内接円半径」「外接円半径」「空間断面」を、条件から選び分けます。",
    steps: [
      {
        condition: "面積と底辺が分かっている",
        tool: "面積公式から高さを逆算",
        reason: "高さは直線への距離なので、垂足が外側に出ても同じ式で扱えます。",
      },
      {
        condition: "辺と角から高さを作りたい",
        tool: "垂線を下ろして sin",
        reason: "底辺方向は cos、高さ方向は sin。まず直角三角形を作ります。",
      },
      {
        condition: "三辺だけが分かっていて面積や高さがほしい",
        tool: "余弦定理から sin へ戻す",
        reason: "cos を出した後、三角形の内角では sin が正であることを使います。",
      },
      {
        condition: "内接円、三辺から等距離、半周長が見える",
        tool: "内心と面積公式",
        reason: "内接円半径は S=rs。三辺から等距離の垂線を面積に変えます。",
      },
      {
        condition: "外接円半径、向かい合う辺と角が見える",
        tool: "正弦定理",
        reason: "一辺と向かいの角がセットなら、a/sin A=2R が最短です。",
      },
      {
        condition: "立体の高さや距離を求める",
        tool: "必要な断面に切って平面へ戻す",
        reason: "底面中心、中点、重心を通る断面を選ぶと直角三角形に戻せます。",
      },
    ],
  },
  {
    id: "geometry-measurement-altitude-drill",
    type: "discriminationDrill",
    title: "高さと半径の判別ドリル",
    intro:
      "計算の前に、どの入口から解くかを選ぶ練習です。共通テストではこの一手で大きく時間差が出ます。",
    items: [
      {
        condition: "三角形の面積と底辺が先に与えられ、高さを求める",
        goal: "高さ",
        choices: ["面積公式から逆算", "正弦定理", "方べき"],
        answer: "面積公式から逆算",
        reason: "面積と底辺がそろっているので、高さは h=2S/a で直接戻せます。",
      },
      {
        condition: "辺とその辺が底辺となす角が与えられ、高さを作る",
        goal: "高さ",
        choices: ["垂線を下ろして sin", "垂直二等分線", "チェバの定理"],
        answer: "垂線を下ろして sin",
        reason: "高さ方向は斜辺に sin を掛ける方向です。",
      },
      {
        condition: "三辺が与えられ、面積を求めたいが角はない",
        goal: "面積",
        choices: ["余弦定理から sin", "正弦定理だけ", "中線の長さ"],
        answer: "余弦定理から sin",
        reason: "三辺から cos を作り、sin に戻せば面積公式へ進めます。",
      },
      {
        condition: "三辺と面積が分かり、内接円半径を求める",
        goal: "内接円半径",
        choices: ["S=rs", "外心の性質", "円周角"],
        answer: "S=rs",
        reason: "内接円半径は、面積を半周長で割るのが最短です。",
      },
      {
        condition: "一辺とその向かいの角が分かり、外接円半径を求める",
        goal: "外接円半径",
        choices: ["正弦定理", "内心の面積分割", "中線定理"],
        answer: "正弦定理",
        reason: "辺と向かいの角がセットなら a/sin A=2R が使えます。",
      },
      {
        condition: "直角三角形の外接円半径を求める",
        goal: "外接円半径",
        choices: ["斜辺の半分", "角の二等分線", "ヘロンの公式"],
        answer: "斜辺の半分",
        reason: "直角三角形の外心は斜辺の中点です。",
      },
      {
        condition: "正四角すいの高さを求める",
        goal: "立体の高さ",
        choices: ["頂点と底面中心を含む断面", "平面図だけで辺を延長", "方べき"],
        answer: "頂点と底面中心を含む断面",
        reason: "空間の高さは、高さを含む断面に切って直角三角形へ戻します。",
      },
      {
        condition: "点 P と直線 AB の距離を求めたい",
        goal: "距離",
        choices: ["三角形 PAB の高さ", "外接円半径", "中線の長さ"],
        answer: "三角形 PAB の高さ",
        reason: "点と直線の距離は、その直線を底辺にした高さです。",
      },
      {
        condition: "共通テストの誘導で先に面積が出て、次に sin を求める",
        goal: "sin",
        choices: ["面積公式から逆算", "角を測る", "重心を使う"],
        answer: "面積公式から逆算",
        reason: "面積公式を sin について解けば、角度を求めずに sin が出ます。",
      },
      {
        condition: "図形の性質で相似を作ったあと、辺と角から面積へ進む",
        goal: "融合問題",
        choices: ["必要な辺を作ってから図形と計量へ接続", "最初から公式暗記", "場合の数に変換"],
        answer: "必要な辺を作ってから図形と計量へ接続",
        reason: "融合問題は、図形の性質で辺を作り、最後に三角比や面積公式へ進みます。",
      },
    ],
  },
  {
    id: "geometry-measurement-altitude-problem",
    type: "problem",
    title: "本番形式演習：高さと内接円半径",
    prompt:
      "三角形 ABC の三辺は 13、14、15 である。\n(1) 面積を求めよ。\n(2) 内接円の半径を求めよ。\n(3) 辺 14 を底辺としたときの高さを求めよ。\nどの小問でどの公式を使うかも説明せよ。",
    choices: ["ヘロンの公式から S=rs と高さへ進む", "正弦定理だけで処理する", "中線を引いて重心を使う"],
    answer: "ヘロンの公式から S=rs と高さへ進む",
    points: 14,
  },
  {
    id: "geometry-measurement-altitude-recovery",
    type: "mistakeRecovery",
    title: "高さと半径のミス回収",
    intro: "高さ・内接円半径・外接円半径で迷ったときに戻る場所です。",
    items: [
      {
        symptom: "高さを辺の内部に落ちるものだと思い込んだ",
        action: "高さは直線への距離として読み直す",
        href: "#geometry-measurement-altitude-flow",
      },
      {
        symptom: "内接円半径を外接円半径の公式で処理した",
        action: "内心なら S=rs に戻る",
        href: "#geometry-measurement-altitude-flow",
      },
      {
        symptom: "空間図形を立体のまま考えて止まった",
        action: "高さを含む断面を切る",
        href: "#geometry-measurement-altitude-flow",
      },
    ],
  },
];

const geometryMeasurementCoreTextbookBlocks: LectureBlock[] = [
  {
    id: "geometry-measurement-core-scope",
    type: "heading",
    level: 2,
    text: "中核講義：図形と計量で何を扱うか",
  },
  {
    id: "geometry-measurement-core-scope-text",
    type: "paragraph",
    text:
      "図形と計量は、角度・長さ・面積を同じ三角形の中で翻訳する単元です。直角三角形なら三角比、一般の三角形なら正弦定理・余弦定理、面積が絡むなら $S=\\dfrac{1}{2}ab\\sin C$、高さが見えないなら垂線か面積から逆算します。共通テストでは、公式そのものを問うよりも、仰角・水平距離・断面・会話文の誘導を読み、どの三角形へ落とすかを選ばせます。",
  },
  {
    id: "geometry-measurement-core-importance",
    type: "callout",
    tone: "info",
    title: "なぜ共通テストで重要か",
    text:
      "図形と計量は第1問の中で短時間に出やすく、1つの読み違いが連鎖します。仰角を水平線との角として読めない、地面上の距離と斜距離を混ぜる、2辺と挟角なのに正弦定理へ行く、面積公式でどの辺を底辺にしたか曖昧にする。この4つを潰すだけで、冊子型模試の第1回・第2回の測量問題はかなり安定します。",
  },
  {
    id: "geometry-measurement-formula-list-heading",
    type: "heading",
    level: 2,
    text: "公式一覧：暗記ではなく条件とセットで持つ",
  },
  {
    id: "geometry-measurement-formula-list",
    type: "checklist",
    title: "図形と計量の公式セット",
    items: [
      "直角三角形: $\\sin\\theta=\\dfrac{\\text{対辺}}{\\text{斜辺}}$, $\\cos\\theta=\\dfrac{\\text{隣辺}}{\\text{斜辺}}$, $\\tan\\theta=\\dfrac{\\text{対辺}}{\\text{隣辺}}$",
      "面積: $S=\\dfrac{1}{2}ah=\\dfrac{1}{2}ab\\sin C$。高さは $h=\\dfrac{2S}{a}$ と逆算できる",
      "正弦定理: $\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}=2R$。辺と向かいの角が1組あるときに使う",
      "余弦定理: $a^2=b^2+c^2-2bc\\cos A$。2辺と挟角、または3辺から角を出すときに使う",
      "相互関係: $\\sin^2 A+\\cos^2 A=1$。三角形の内角では $\\sin A>0$、鈍角では $\\cos A<0$",
      "測量: 仰角・俯角は水平線との角。高さは水平距離に $\\tan$ を掛ける形をまず疑う",
      "空間図形: 立体のまま解かず、求めたい長さを含む平面断面へ落とす",
    ],
  },
  {
    id: "geometry-measurement-derivation-heading",
    type: "heading",
    level: 2,
    text: "公式の導出：なぜその式になるか",
  },
  {
    id: "geometry-measurement-area-derivation",
    type: "paragraph",
    text:
      "面積公式 $S=\\dfrac{1}{2}ab\\sin C$ は、高さの作り方から出ます。辺 $a$ を底辺にすると、もう一方の辺 $b$ から底辺へ下ろした高さは $b\\sin C$ です。したがって $S=\\dfrac{1}{2}\\times a\\times b\\sin C$。この導出を知っていると、面積から高さを戻す問題で、どの辺を底辺にしたかを見失いません。",
  },
  {
    id: "geometry-measurement-area-math",
    type: "math",
    expression: "h=b\\sin C\\quad\\Longrightarrow\\quad S=\\frac{1}{2}ah=\\frac{1}{2}ab\\sin C",
    caption: "高さは「辺に対する垂直距離」。鈍角三角形で垂足が外に出ても、底辺の直線への距離として同じ式を使う。",
  },
  {
    id: "geometry-measurement-cosine-derivation",
    type: "paragraph",
    text:
      "余弦定理は、1つの頂点から垂線を下ろして、底辺方向の射影を使うと導けます。辺 $b$ の底辺方向の成分が $b\\cos A$、高さ方向の成分が $b\\sin A$ なので、三平方の定理で $a^2=(c-b\\cos A)^2+(b\\sin A)^2$。展開すると $a^2=b^2+c^2-2bc\\cos A$ になります。",
  },
  {
    id: "geometry-measurement-cosine-derivation-math",
    type: "math",
    expression: "a^2=(c-b\\cos A)^2+(b\\sin A)^2=b^2+c^2-2bc\\cos A",
    caption: "余弦定理は三平方の定理の拡張。$A=90^\\circ$ なら $\\cos A=0$ で三平方そのものになる。",
  },
  {
    id: "geometry-measurement-sine-derivation",
    type: "paragraph",
    text:
      "正弦定理は、外接円の半径 $R$ と円周角から出ます。辺 $a$ は角 $A$ の向かいの弦です。中心角を使って弦の長さを読むと $a=2R\\sin A$。これを変形すると $\\dfrac{a}{\\sin A}=2R$ です。だから正弦定理は、辺と向かいの角を外接円半径という同じ物差しへそろえる公式です。",
  },
  {
    id: "geometry-measurement-sine-derivation-math",
    type: "math",
    expression: "a=2R\\sin A\\quad\\Longleftrightarrow\\quad \\frac{a}{\\sin A}=2R",
    caption: "辺と隣の角ではなく、辺と向かいの角を必ずセットにする。",
  },
  {
    id: "geometry-measurement-master-flow",
    type: "solutionFlow",
    title: "公式選択の判別フロー",
    intro:
      "図を見た瞬間に公式を決めない。まず条件の形を読み、上から順に止まるところを探します。",
    steps: [
      {
        condition: "直角三角形がすでにある、または垂線を下ろせば作れる",
        tool: "三角比",
        reason: "高さなら sin、水平距離なら cos、斜辺を使わない高さと水平距離の比なら tan。",
      },
      {
        condition: "2辺とその間の角がある",
        tool: "余弦定理",
        reason: "第三辺を作れる。面積も同じ2辺と挟角からすぐ出せる。",
      },
      {
        condition: "1辺とその向かいの角の組がある",
        tool: "正弦定理",
        reason: "別の辺・角・外接円半径へ情報を運べる。",
      },
      {
        condition: "面積が絡む、または高さ・sinを逆算したい",
        tool: "面積公式",
        reason: "$S=\\dfrac12 ab\\sin C$ または $S=\\dfrac12 ah$ を解き直す。",
      },
      {
        condition: "3辺だけがある",
        tool: "余弦定理で cos を出してから sin へ",
        reason: "角を直接求めず、$\\sin=\\sqrt{1-\\cos^2}$ で面積・高さへ進む。",
      },
      {
        condition: "仰角・俯角・塔・観測点がある",
        tool: "水平面と鉛直面に分ける",
        reason: "仰角は水平線との角。地面上の距離と斜距離を分けてから式を立てる。",
      },
      {
        condition: "空間図形で距離・高さ・断面円が出る",
        tool: "必要な平面断面へ落とす",
        reason: "断面上の直角三角形で三平方・三角比へ戻す。",
      },
    ],
  },
  {
    id: "geometry-measurement-height-priority-flow",
    type: "solutionFlow",
    title: "高さを求める優先順位",
    intro:
      "高さは、いきなり垂線を引く前に「もう面積から戻せないか」を見ると速くなります。",
    steps: [
      {
        condition: "面積と底辺が分かっている",
        tool: "面積公式から高さを逆算",
        reason: "$h=\\dfrac{2S}{a}$。最短で、鈍角でも使える。",
      },
      {
        condition: "底辺に対する斜辺と角がある",
        tool: "直角三角形を作る",
        reason: "高さ方向は $\\sin$、水平方向は $\\cos$。仰角なら $\\tan$ が第一候補。",
      },
      {
        condition: "一辺と対角の組があり、別の辺や角へ運べる",
        tool: "正弦定理",
        reason: "必要な辺を作ってから高さや面積へ戻す。",
      },
      {
        condition: "3辺、または2辺と挟角から角の情報が必要",
        tool: "余弦定理で cos を出し sin へ変換",
        reason: "三角形の内角では $\\sin>0$。鈍角なら $\\cos<0$ を落とさない。",
      },
      {
        condition: "補角・円周角で角が移せる",
        tool: "sin は同じ、cos は符号反転",
        reason: "$\\sin(180^\\circ-\\theta)=\\sin\\theta$、$\\cos(180^\\circ-\\theta)=-\\cos\\theta$。",
      },
      {
        condition: "空間図形で高さを求める",
        tool: "高さを含む断面に切る",
        reason: "立体ではなく、断面の直角三角形として処理する。",
      },
    ],
  },
  {
    id: "geometry-measurement-common-test-cautions",
    type: "checklist",
    title: "共通テスト型で落としやすい注意点",
    items: [
      "問題文の図をそのまま信じすぎない。長さや角は、本文の条件を自分で書き込んで確定する",
      "仰角は水平線との角。塔や木との角、視線と地面の角を混同しない",
      "距離が地面上の水平距離か、視線の斜距離かを必ず区別する",
      "観測点が一直線上か、平面上でずれているかを確認する。ずれていれば水平面の三角形を作る",
      "$\\sin$ から $\\cos$ を出すとき、鋭角か鈍角かで $\\cos$ の符号が変わる",
      "面積公式で高さを出すとき、どの辺を底辺にしたかを答案に残す",
      "空間図形は、まず平面断面へ落とす。断面に出た直角三角形で処理する",
    ],
  },
  {
    id: "geometry-measurement-example-1",
    type: "problem",
    title: "代表例題1：面積から高さを求める",
    prompt:
      "三角形ABCの面積は 24、辺BCの長さは 8 である。頂点Aから直線BCに下ろした高さを求めよ。また、この問題で三角比を使わずに済む理由を説明せよ。",
    choices: ["高さは6。面積と底辺がそろうので h=2S/BC を使う", "高さは3。面積を底辺で割ればよい", "高さは8。底辺と同じ長さになる", "高さは12。面積を2倍しない"],
    answer: "高さは6。面積と底辺がそろうので h=2S/BC を使う",
    points: 6,
    mistakeTags: ["公式選択ミス", "計算ミス"],
  },
  {
    id: "geometry-measurement-example-1-tabs",
    type: "explanationTabs",
    tabs: [
      { label: "方針", body: "高さを聞かれたら、まず面積と底辺がそろっているかを見る。そろっていれば $S=\\dfrac12 ah$ を高さについて解く。" },
      { label: "詳しい解説", body: "底辺を $BC=8$、高さを $h$ とすると、$24=\\dfrac12\\cdot8\\cdot h=4h$。よって $h=6$。ここでは角度も斜辺も不要なので、三角比を使うより面積公式から逆算するのが最短です。" },
      { label: "最速解法", body: "$h=\\dfrac{2S}{a}=\\dfrac{48}{8}=6$。底辺と面積が見えた瞬間にこの1行で終わる。" },
      { label: "よくあるミス", body: "面積を底辺で割って $3$ とするミスが多い。面積公式には $\\dfrac12$ があるので、必ず $2S$ を底辺で割る。垂足が辺BCの外に出る図でも、直線BCへの距離として同じ式を使う。" },
      { label: "類題", body: "三角形の面積が $15\\sqrt3$、底辺が $10$ のとき、高さは $3\\sqrt3$。底辺を変えたら高さも変わるので、どの辺を底辺にしたかを明記する。" },
    ],
  },
  {
    id: "geometry-measurement-example-2",
    type: "problem",
    title: "代表例題2：余弦定理・面積公式・正弦定理をつなぐ",
    prompt:
      "三角形ABCで、AB=6、AC=8、角A=60度とする。\n(1) BCの2乗を求めよ。\n(2) 面積Sを求めよ。\n(3) sinBを求めよ。\nどの条件でどの公式を使ったかも述べよ。",
    choices: [
      "$BC^2=52$, $S=12\\sqrt3$, $\\sin B=\\dfrac{4\\sqrt3}{\\sqrt{52}}$",
      "$BC^2=28$, $S=12\\sqrt3$, $\\sin B=\\dfrac{4\\sqrt3}{\\sqrt{28}}$",
      "$BC^2=52$, $S=24\\sqrt3$, $\\sin B=\\dfrac{8\\sqrt3}{\\sqrt{52}}$",
      "$BC^2=100$, $S=24\\sqrt3$, $\\sin B=\\dfrac{4\\sqrt3}{10}$",
    ],
    answer: "$BC^2=52$, $S=12\\sqrt3$, $\\sin B=\\dfrac{4\\sqrt3}{\\sqrt{52}}$",
    points: 9,
    mistakeTags: ["公式選択ミス", "計算ミス", "条件見落とし"],
  },
  {
    id: "geometry-measurement-example-2-tabs",
    type: "explanationTabs",
    tabs: [
      { label: "方針", body: "2辺と挟角があるので、まず余弦定理で $BC^2$。同じ2辺と挟角から面積公式。最後に、辺ACは角Bの向かいなので正弦定理で $\\sin B$ へ運ぶ。" },
      { label: "詳しい解説", body: "$BC^2=6^2+8^2-2\\cdot6\\cdot8\\cos60^\\circ=36+64-48=52$。\n\n$S=\\dfrac12\\cdot6\\cdot8\\sin60^\\circ=24\\cdot\\dfrac{\\sqrt3}{2}=12\\sqrt3$。\n\n正弦定理より $\\dfrac{AC}{\\sin B}=\\dfrac{BC}{\\sin A}$。したがって $\\sin B=\\dfrac{8\\sin60^\\circ}{\\sqrt{52}}=\\dfrac{4\\sqrt3}{\\sqrt{52}}$。" },
      { label: "最速解法", body: "挟角60度なので $BC^2=100-48=52$、面積は $24\\times\\dfrac{\\sqrt3}{2}=12\\sqrt3$。最後は $\\sin B=\\dfrac{8\\sin60^\\circ}{BC}$ と置く。" },
      { label: "よくあるミス", body: "正弦定理で $AB=6$ を角Bの向かいとして使ってしまう。角Bの向かいはAC=8。余弦定理では $2\\cdot6\\cdot8\\cos60^\\circ$ の $\\cos60^\\circ=\\dfrac12$ まで入れる。" },
      { label: "類題", body: "別解として、(2)の面積と $S=\\dfrac12\\cdot BC\\cdot AC\\sin B$ を使って $\\sin B=\\dfrac{2S}{BC\\cdot AC}$ と出してもよい。面積からsinを逆算する見方です。" },
    ],
  },
  {
    id: "geometry-measurement-example-3",
    type: "problem",
    title: "代表例題3：共通テスト型の測量",
    prompt:
      "高さh mの塔の真下をTとする。地点Aから塔の頂点Pを見上げる仰角は30度、地点Bからの仰角は45度である。A, T, B は一直線上にあり、AはBより塔から遠く、AB=20 mである。\n(1) AT, BTをhで表せ。\n(2) hを求めよ。\n(3) この問題で水平距離と斜距離を混同しないために、最初に図へ書くべき角を述べよ。",
    choices: [
      "$AT=\\sqrt3h$, $BT=h$, $h=10(\\sqrt3+1)$。仰角は水平線との角として書く",
      "$AT=h/\\sqrt3$, $BT=h$, $h=10(\\sqrt3-1)$。仰角は塔との角として書く",
      "$AT=\\sqrt3h$, $BT=h$, $h=20$。ABを斜距離として使う",
      "$AT=2h$, $BT=h$, $h=20$。30度をsinで処理する",
    ],
    answer: "$AT=\\sqrt3h$, $BT=h$, $h=10(\\sqrt3+1)$。仰角は水平線との角として書く",
    points: 10,
    mistakeTags: ["問題文の読み違い", "公式選択ミス", "図の見落とし"],
  },
  {
    id: "geometry-measurement-example-3-tabs",
    type: "explanationTabs",
    tabs: [
      { label: "方針", body: "測量は、水平距離と高さで直角三角形を2つ作る。仰角は水平線との角なので、$\\tan$ を使って高さと水平距離を結ぶ。" },
      { label: "詳しい解説", body: "地点Aでは $\\tan30^\\circ=\\dfrac{h}{AT}$。よって $AT=\\dfrac{h}{\\tan30^\\circ}=\\sqrt3h$。\n\n地点Bでは $\\tan45^\\circ=\\dfrac{h}{BT}=1$。よって $BT=h$。\n\nAはBより遠いので $AB=AT-BT=(\\sqrt3-1)h=20$。したがって $h=\\dfrac{20}{\\sqrt3-1}=10(\\sqrt3+1)$。" },
      { label: "最速解法", body: "仰角30度なら水平距離は $\\sqrt3h$、仰角45度なら水平距離は $h$。差が20なので $(\\sqrt3-1)h=20$。有理化して $h=10(\\sqrt3+1)$。" },
      { label: "よくあるミス", body: "仰角を塔との角だと思って $\\tan30^\\circ=AT/h$ と逆にする。ABを視線の長さとして使う。A, T, B が一直線上か、平面上でずれているかを確認せずに差を取る。" },
      { label: "類題", body: "第1回冊子型模試の後半のように、観測点が一直線上でなく $\\angle ATB$ が与えられる場合は、$AT$ と $BT$ を $h$ で表してから三角形ATBに余弦定理を使う。一直線なら差、ずれていれば余弦定理です。" },
    ],
  },
  {
    id: "geometry-measurement-advanced-connection",
    type: "callout",
    tone: "success",
    title: "発展への接続",
    text:
      "この単元の本質は、長さを成分に分解することです。数学IIの三角関数では単位円で sin・cos を座標として扱い、数学B・Cのベクトルでは内積が余弦定理の一般化として再登場します。空間図形を断面へ落とす発想は、ベクトル・空間座標・立体の最短距離にもそのままつながります。",
  },
  {
    id: "geometry-measurement-core-recovery",
    type: "mistakeRecovery",
    title: "冊子型模試から戻る復習先",
    intro:
      "第1回・第2回の図形と計量で落とした場合は、失点の症状ごとに戻る場所を変えます。",
    items: [
      { symptom: "第1回のタワー問題で、仰角から距離をhで表せなかった", action: "代表例題3と高さの優先順位へ戻る", href: "#geometry-measurement-example-3" },
      { symptom: "第1回の2地点がずれた設定で、余弦定理に接続できなかった", action: "公式選択の判別フローを確認する", href: "#geometry-measurement-master-flow" },
      { symptom: "第2回の測量で、観測点・水平距離・仰角の図示が崩れた", action: "共通テスト型の注意点と代表例題3へ戻る", href: "#geometry-measurement-common-test-cautions" },
      { symptom: "高さをどこから出すか迷った", action: "高さを求める優先順位へ戻る", href: "#geometry-measurement-height-priority-flow" },
      { symptom: "面積・正弦定理・余弦定理の順番が混ざった", action: "代表例題2の別解まで確認する", href: "#geometry-measurement-example-2" },
    ],
  },
];

const geometryPropertiesCoreTextbookBlocks: LectureBlock[] = [
  {
    id: "gp-core-scope",
    type: "heading",
    level: 2,
    text: "中核講義：図形の性質で何を扱うか",
  },
  {
    id: "gp-core-scope-text",
    type: "paragraph",
    text:
      "図形の性質は、円・比・内接四角形という3つの形から、角と長さを翻訳する単元です。円が出れば円周角・接弦定理・方べき、比が出ればチェバ・メネラウス・角の二等分線、内接四角形が出れば対角の和とトレミー。共通テストでは、これらを単独で問うより、図形と計量（正弦・余弦定理）へ辺や角を渡す前段階として使わせる出方が多くなります。",
  },
  {
    id: "gp-core-importance",
    type: "callout",
    tone: "info",
    title: "なぜ共通テストで重要か",
    text:
      "冊子型模試の第3問は、円・接線・方べき・球の断面のように、図形の性質が単独の大問として出ます。ここで使う定理の候補が多いため、「今見えている形」から定理を1つに絞れないと、時間だけが減っていきます。円・接線・比・内接四角形のどれが主役かを最初の30秒で判断できるかどうかが、この大問の得点を大きく左右します。",
  },
  {
    id: "gp-core-theorem-list-heading",
    type: "heading",
    level: 2,
    text: "定理一覧：条件とセットで持つ",
  },
  {
    id: "gp-core-theorem-list",
    type: "checklist",
    title: "図形の性質の定理セット",
    items: [
      "円周角の定理: 同じ弧に対する円周角は等しい。中心角はその弧に対する円周角の2倍",
      "接弦定理: 接線と弦のなす角は、その弦に対する反対側の弧の円周角に等しい",
      "接線の性質: 接点で半径と接線は垂直。同じ外部の点から引いた2本の接線の長さは等しい",
      "方べきの定理（接線・割線型）: $PT^2=PA\\cdot PB$",
      "方べきの定理（2本の割線型・円内交点型）: $PA\\cdot PB=PC\\cdot PD$",
      "内接四角形の性質: 向かい合う角の和は $180^\\circ$",
      "トレミーの定理: 内接四角形で $AC\\cdot BD=AB\\cdot CD+AD\\cdot BC$",
      "チェバの定理: 三角形の内部で3本の線分が1点に集まるとき、対応する比の積は1",
      "メネラウスの定理: 1本の直線が三角形の3辺（延長を含む）を横切るとき、対応する比の積は1",
      "角の二等分線定理: $BD:DC=AB:AC$",
      "中点連結定理: 2辺の中点を結ぶ線分は、残りの辺に平行で長さは半分",
      "球の断面: 球を平面で切ると断面は円。断面円の半径 $\\rho$、中心から平面までの距離 $d$、球の半径 $R$ について $\\rho^2+d^2=R^2$",
    ],
  },
  {
    id: "gp-core-usage-heading",
    type: "heading",
    level: 2,
    text: "定理の意味・使いどころ：どの条件でどの定理を使うか",
  },
  {
    id: "gp-core-circle-tangent-heading",
    type: "heading",
    level: 3,
    text: "1. 円と接線の判断",
  },
  {
    id: "gp-core-circle-tangent-text",
    type: "paragraph",
    text:
      "接線が出たら、まず接点における半径と接線の垂直を図に書き込みます。同じ外部の点から2本の接線が引かれているなら、その長さは必ず等しいので、片方が分かればもう片方も分かります。接線と割線がセットで見えたら方べきの定理、接線と弦のなす角が見えたら接弦定理で円周角へ変換します。円の外部の点から伸びる長さの関係は、まず「同じ点を基準にした距離」として整理すると式が立てやすくなります。",
  },
  geometryDiagramBlock("gp-core-tangent-diagram", "tangent-radius-equal-length"),
  {
    id: "gp-core-power-heading",
    type: "heading",
    level: 3,
    text: "2. 方べきの定理：3つの形",
  },
  {
    id: "gp-core-power-text",
    type: "paragraph",
    text:
      "方べきの定理には3つの形があります。外部の点から接線と割線が出る「接線・割線型」、外部の点から2本の割線が出る「2本の割線型」、円の内部で2本の弦が交わる「円内交点型」です。どの形でも、同じ基準点（外部点、または弦の交点）から円へ伸びる線分の積をそろえるのが目的です。共通テストでは長さの穴埋めとして出やすく、割線では「近い方の点×遠い方の点」を必ずセットにします。近い方と遠い方を取り違えると符号や大小が崩れるので、まずどちらが近いかを図に書き込みます。",
  },
  {
    id: "gp-core-power-math",
    type: "math",
    expression: "PT^2=PA\\cdot PB\\qquad(\\text{接線・割線型})\\qquad\\qquad PA\\cdot PB=PC\\cdot PD\\qquad(\\text{2本の割線型・円内交点型})",
    caption: "$PA, PC$ を基準点に近い方、$PB, PD$ を遠い方にそろえて式を立てる。",
  },
  {
    id: "gp-core-ceva-menelaus-heading",
    type: "heading",
    level: 3,
    text: "3. チェバ・メネラウス：比の追跡",
  },
  {
    id: "gp-core-ceva-menelaus-text",
    type: "paragraph",
    text:
      "三角形の内部で3頂点からの線分が1点に集まっていればチェバの定理、1本の直線が三角形の3辺（またはその延長）を横切っていればメネラウスの定理です。どちらも対応する比の積が1になる点は同じですが、図の向きと延長線の扱いが違います。共通テストでは、定理名を答えさせるより「比を追跡する」形で出ることが多く、辺の比が直接出しにくい場面では、頂点を共有し底辺が同一直線上にある三角形どうしの面積比で代用できることもあります。",
  },
  {
    id: "gp-core-ceva-menelaus-math",
    type: "math",
    expression: "\\frac{BD}{DC}\\cdot\\frac{CE}{EA}\\cdot\\frac{AF}{FB}=1",
    caption: "チェバ（内部の交点）もメネラウス（横切る直線）も式の形は同じ。図で内分か延長かを先に判定する。",
  },
  {
    id: "gp-core-cyclic-heading",
    type: "heading",
    level: 3,
    text: "4. 内接四角形・円周角",
  },
  {
    id: "gp-core-cyclic-text",
    type: "paragraph",
    text:
      "四角形が円に内接していれば、向かい合う角の和は $180^\\circ$ です。対角線と辺の積を結びたいときはトレミーの定理を使います。角が等しいことから逆に「4点は同一円周上にある」と判断する使い方（逆利用）もあり、これは補角・錯角・同位角の関係と組み合わせて考えます。図を見ただけで角が等しいと決めつけず、同じ弧を見ているか、対角の関係かを毎回確認します。",
  },
  {
    id: "gp-core-flow-heading",
    type: "heading",
    level: 2,
    text: "解法判別フロー：図形の性質",
  },
  {
    id: "gp-core-flow",
    type: "solutionFlow",
    title: "図形の性質 判別フロー",
    intro:
      "円→接線・割線、角度、比、球や空間図形の順に「今どれを求めたいか」で使う定理を絞ります。",
    steps: [
      {
        condition: "円があり、接線が見える",
        tool: "半径⊥接線を書き込み、接線の長さの相等・方べきを疑う",
        reason: "接点での半径⊥接線と、同じ外部点からの接線の長さの相等が、まず使える2つの武器になる。",
      },
      {
        condition: "円があり、割線（2本の割線、または円内で交わる弦）が見える",
        tool: "方べきの定理",
        reason: "基準点から円へ伸びる線分の積 $PA\\cdot PB=PC\\cdot PD$（接線なら $PT^2=PA\\cdot PB$）をそろえる。",
      },
      {
        condition: "角度を求めたい",
        tool: "円周角・内接四角形の対角・接弦定理",
        reason: "同じ弧の円周角、対角の和 $180^\\circ$、接線と弦の角の変換のいずれかへ、求めたい角を移す。",
      },
      {
        condition: "比を求めたい",
        tool: "チェバ・メネラウス・面積比",
        reason: "1点に集まればチェバ、一直線ならメネラウス。辺の比が出しにくいときは面積比で代用できることもある。",
      },
      {
        condition: "球や空間図形が出てきた",
        tool: "断面円に落として、平面図形として処理する",
        reason: "球の中心から平面へ下ろした垂線の足を中心とする断面円を考えれば、あとは平面上の円の性質がそのまま使える。",
      },
    ],
  },
  {
    id: "gp-core-sphere-heading",
    type: "heading",
    level: 2,
    text: "球の断面への接続",
  },
  {
    id: "gp-core-sphere-text",
    type: "paragraph",
    text:
      "球を平面で切ると、切り口（断面）は必ず円になります。この断面円の中心は、球の中心から平面へ下ろした垂線の足です。断面円の中では、平面上の円の性質（円周角・接弦定理・方べき）がそのまま使えます。つまり球の問題は、断面を取り出した瞬間に「円の問題」に変わります。断面円の半径 $\\rho$、球の半径 $R$、中心から平面までの距離 $d$ は、球の中心・断面円の中心・断面円上の点を結ぶ直角三角形でつながっており、$\\rho^2+d^2=R^2$ が成り立ちます。",
  },
  geometryDiagramBlock("gp-core-sphere-diagram", "sphere-cross-section"),
  {
    id: "gp-core-sphere-math",
    type: "math",
    expression: "\\rho^2+d^2=R^2",
    caption: "球の半径 $R$、中心から平面までの距離 $d$、断面円の半径 $\\rho$。どれか2つが分かれば残り1つが出る。",
  },
  {
    id: "gp-core-example1-heading",
    type: "heading",
    level: 2,
    text: "代表例題1：接線と方べきの基本",
  },
  {
    id: "gp-core-example1",
    type: "problem",
    title: "代表例題1：接線と方べきの基本",
    prompt:
      "円Oの半径は5、円外の点Pについて $OP=13$ とする。点Pから円Oに接線を引き、接点をTとする。また、点Pを通る直線が円Oと2点A, B（$PA<PB$）で交わり、$PA=8$ である。\n\n(1) $PT$ の長さを求めよ。\n(2) $PB$ の長さを求めよ。\n(3) 円周上に別の接点 $T'$ をとり、$PT'$ を接線とするとき、$PT'$ の長さを、計算し直さずに答えよ。",
    choices: [
      "$PT=12$、$PB=18$、$PT'=12$",
      "$PT=12$、$PB=10$、$PT'=13$",
      "$PT=8$、$PB=18$、$PT'=8$",
      "$PT=12$、$PB=18$、$PT'=13$",
    ],
    answer: "$PT=12$、$PB=18$、$PT'=12$",
    points: 10,
    mistakeTags: ["公式選択ミス", "計算ミス", "図の見落とし"],
  },
  {
    id: "gp-core-example1-tabs",
    type: "explanationTabs",
    tabs: [
      {
        label: "方針",
        body: "接線が出たらまず半径⊥接線。直角三角形OTPで $OT=5$、$OP=13$ から $PT$ を三平方で出す。次に接線と割線がセットなので方べきの定理 $PT^2=PA\\cdot PB$ を使う。",
      },
      {
        label: "詳しい解説",
        body:
          "(1) 三角形OTPは $\\angle OTP=90^\\circ$ の直角三角形。$OT=5$、$OP=13$ なので $PT=\\sqrt{13^2-5^2}=\\sqrt{144}=12$。\n\n(2) 方べきの定理より $PT^2=PA\\cdot PB$。$144=8\\cdot PB$ なので $PB=18$。\n\n(3) 同じ外部の点Pから引いた接線の長さはすべて等しいので、$PT'=PT=12$。計算し直す必要はない。",
      },
      {
        label: "別解",
        body: "(2) は方べきの定理を暗記していなくても、三角形PTAと三角形PBTが相似であることから導ける。接弦定理より $\\angle PTA=\\angle PBT$（接線と弦のなす角＝反対側の円周角）で、$\\angle P$ は共通。よって $\\triangle PTA\\sim\\triangle PBT$ より $PT:PB=PA:PT$、すなわち $PT^2=PA\\cdot PB$。公式を丸暗記するのではなく、相似から毎回導ける状態にしておくと忘れにくい。",
      },
      {
        label: "最速解法",
        body: "直角三角形の3辺 $5,12,13$ は超頻出。$13^2-5^2=169-25=144=12^2$ を覚えておけば(1)は一瞬。(2)は $144\\div8=18$。(3)は計算せず「同じ点からの接線は等しい」の一言で終わる。",
      },
      {
        label: "よくあるミス",
        body: "$OP=13$ をそのまま接線の長さだと思ってしまう（$OP$ は斜辺、$PT$ は直角三角形のもう1辺）。$PA\\cdot PB$ の代わりに $AB\\cdot PB$ を使ってしまう。同じ点からの接線でも長さが変わると思い込み、(3)を再計算しようとする。",
      },
      {
        label: "類題",
        body: "円の半径が9、$OP=15$ のとき、$PT$ の長さと、$PA=5$ のときの $PB$ を同じ流れで求めてみてください。$15^2-9^2=144=12^2$ になることを確認します。",
      },
    ],
  },
  {
    id: "gp-core-example1-takeaway",
    type: "callout",
    tone: "success",
    title: "この問題から何を学ぶか",
    text:
      "接線が出たら「半径⊥接線」で直角三角形を作り、複数の接線が出たら「長さの相等」を使い、割線が絡めば「方べき」を使う。3つの武器を同じ図の中で順番に使う練習です。",
  },
  {
    id: "gp-core-example2-heading",
    type: "heading",
    level: 2,
    text: "代表例題2：内接四角形・接弦定理・円周角",
  },
  {
    id: "gp-core-example2",
    type: "problem",
    title: "代表例題2：内接四角形・接弦定理・円周角",
    prompt:
      "円Oに内接する四角形ABCDが、この順に周上に並んでいる。$\\angle ABC=100^\\circ$、$\\angle CAD=30^\\circ$ とする。点Aにおける円Oの接線を引き、この接線と弦ADのなす角のうち、四角形の内部（辺AB, BCのある側）とは反対側にできる角を $\\angle x$ とする。\n\n(1) $\\angle ADC$ を求めよ。\n(2) $\\angle ACD$ を求めよ。\n(3) 接弦定理を用いて $\\angle x$ を求めよ。",
    choices: [
      "$\\angle ADC=80^\\circ$、$\\angle ACD=70^\\circ$、$\\angle x=70^\\circ$",
      "$\\angle ADC=100^\\circ$、$\\angle ACD=50^\\circ$、$\\angle x=50^\\circ$",
      "$\\angle ADC=80^\\circ$、$\\angle ACD=100^\\circ$、$\\angle x=30^\\circ$",
      "$\\angle ADC=80^\\circ$、$\\angle ACD=70^\\circ$、$\\angle x=100^\\circ$",
    ],
    answer: "$\\angle ADC=80^\\circ$、$\\angle ACD=70^\\circ$、$\\angle x=70^\\circ$",
    points: 10,
    mistakeTags: ["公式選択ミス", "図の見落とし", "条件見落とし"],
  },
  {
    id: "gp-core-example2-tabs",
    type: "explanationTabs",
    tabs: [
      {
        label: "方針",
        body: "(1)は内接四角形の対角の和 $180^\\circ$。(2)は三角形ACDの内角の和。(3)は接弦定理で、接線と弦ADのなす角を反対側の円周角へ移す。",
      },
      {
        label: "詳しい解説",
        body:
          "(1) 内接四角形の対角の和より $\\angle ADC=180^\\circ-\\angle ABC=180^\\circ-100^\\circ=80^\\circ$。\n\n(2) 三角形ACDの内角の和より $\\angle ACD=180^\\circ-\\angle ADC-\\angle CAD=180^\\circ-80^\\circ-30^\\circ=70^\\circ$。\n\n(3) 接弦定理より、接線と弦ADのなす角（B, C側と反対）は、弦ADに対してB, Cのある側の円周角に等しい。B, Cは弦ADに対して同じ側の弧上にあるので、その円周角の代表として $\\angle ACD$ が使え、$\\angle x=\\angle ACD=70^\\circ$。",
      },
      {
        label: "別解",
        body: "(3)は $\\angle ACD$ の代わりに $\\angle ABD$ を使っても同じ値になります。B, Cは弦ADに対して同じ弧上にあるので、同じ弧に対する円周角として $\\angle ABD=\\angle ACD$ が成り立ちます（円周角の定理の反復適用）。どちらの頂点を使っても $70^\\circ$ に一致することを確認すると、接弦定理の理解が深まります。",
      },
      {
        label: "最速解法",
        body: "「対角の和180°」→「三角形の内角の和180°」→「接弦定理で反対側の円周角へ」の3段を、この順番のまま覚えておく。角度問題の多くは、この3段の組み合わせで閉じます。",
      },
      {
        label: "よくあるミス",
        body: "接弦定理の「反対側」を取り違えて、$\\angle x$ を $\\angle ABC=100^\\circ$ など無関係な角と一致させてしまう。内接四角形の対角の和を「隣り合う角の和」と勘違いする。三角形ACDの内角の和を使わずに(2)を止めてしまう。",
      },
      {
        label: "類題",
        body: "同じ四角形で $\\angle ABC=112^\\circ$、$\\angle CAD=25^\\circ$ に変えたとき、$\\angle ADC$、$\\angle ACD$、接線と弦ADのなす角を同じ手順で求めてみてください。",
      },
    ],
  },
  {
    id: "gp-core-example2-takeaway",
    type: "callout",
    tone: "success",
    title: "この問題から何を学ぶか",
    text:
      "角度を求める問題では、求めたい角を「同じ弧の円周角」「対角の補角」「接弦定理の変換角」のどれかへ移すことを考えます。移した先で三角形の内角の和を使えば計算が閉じます。",
  },
  {
    id: "gp-core-example3-heading",
    type: "heading",
    level: 2,
    text: "代表例題3：チェバ・メネラウス・面積比",
  },
  {
    id: "gp-core-example3",
    type: "problem",
    title: "代表例題3：チェバ・メネラウス・面積比",
    prompt:
      "三角形ABCの辺BC上に点D、辺CA上に点Eがあり、$BD:DC=2:1$、$CE:EA=3:2$ である。\n\n(1) 線分AD, BE, CFが1点で交わるように辺AB上に点Fをとるとき、チェバの定理を用いて $AF:FB$ を求めよ。\n(2) 同じ比 $BD:DC=2:1$、$CE:EA=3:2$ を保ったまま、点Fを辺ABの延長上にとり、D, E, Fが一直線上に並ぶようにする。メネラウスの定理を用いて $AF:FB$ を求めよ。\n(3) (1)の設定で、三角形ABDと三角形ACDの面積比を使って $BD:DC=2:1$ を別の方法で確認せよ。",
    choices: [
      "(1) $AF:FB=1:3$、(2) $AF:FB=1:3$（Fは延長上）、(3) 面積比は底辺の比に等しい",
      "(1) $AF:FB=3:1$、(2) $AF:FB=1:3$、(3) 面積比は高さの比に等しい",
      "(1) $AF:FB=1:3$、(2) $AF:FB=3:1$、(3) 面積比は底辺の比に等しい",
      "(1) $AF:FB=2:3$、(2) $AF:FB=2:3$、(3) 面積比は角の比に等しい",
    ],
    answer: "(1) $AF:FB=1:3$、(2) $AF:FB=1:3$（Fは延長上）、(3) 面積比は底辺の比に等しい",
    points: 10,
    mistakeTags: ["公式選択ミス", "図の見落とし", "場合分け不足"],
  },
  {
    id: "gp-core-example3-tabs",
    type: "explanationTabs",
    tabs: [
      {
        label: "方針",
        body: "(1)はAD, BE, CFが1点に集まるのでチェバ。(2)はD, E, Fが一直線なのでメネラウス。どちらも比の積は1になるが、Fの位置（内分か延長上か）が変わる。(3)は頂点を共有し底辺が同一直線上にある三角形の面積比を使う。",
      },
      {
        label: "詳しい解説",
        body:
          "(1) チェバの定理より $\\dfrac{BD}{DC}\\cdot\\dfrac{CE}{EA}\\cdot\\dfrac{AF}{FB}=1$。$\\dfrac{2}{1}\\cdot\\dfrac{3}{2}\\cdot\\dfrac{AF}{FB}=1$ より $3\\cdot\\dfrac{AF}{FB}=1$、$AF:FB=1:3$。\n\n(2) メネラウスの定理でも同じ形の式 $\\dfrac{BD}{DC}\\cdot\\dfrac{CE}{EA}\\cdot\\dfrac{AF}{FB}=1$ が成り立ち、数値上は同じ $AF:FB=1:3$ になる。ただし今度はFが辺ABの延長上（外分点）にある点が(1)と異なる。\n\n(3) 三角形ABDと三角形ACDは頂点Aを共有し、底辺BD, DCが同一直線BC上にあるので、頂点Aから直線BCへの高さが共通。したがって面積比は底辺の比に等しく、$S_{\\triangle ABD}:S_{\\triangle ACD}=BD:DC=2:1$。逆に面積比が2:1と分かっていれば、$BD:DC=2:1$ が言える。",
      },
      {
        label: "別解",
        body: "(3)の面積比は、三角形ABCの面積を $S$ として $S_{\\triangle ABD}=\\dfrac{BD}{BC}S$、$S_{\\triangle ACD}=\\dfrac{DC}{BC}S$ と表しても同じ結論になる。共通因数 $S/BC$ をくくり出せば $S_{\\triangle ABD}:S_{\\triangle ACD}=BD:DC$ がすぐ出る、という比例式からの別ルートです。",
      },
      {
        label: "最速解法",
        body: "「1点に集まる→チェバ」「一直線→メネラウス」を式より先に図で判定する。比の積の式自体はどちらも同じ形なので、暗記の負担は1つで済みます。",
      },
      {
        label: "よくあるミス",
        body: "チェバとメネラウスを「比の式が同じだから同じ図」と思い込み、内部の1点か一直線かを確認しない。メネラウスで外分点を辺の内側だと勘違いする。面積比を使うときに「頂点を共有し、底辺が同一直線上にある」という条件を確認しない。",
      },
      {
        label: "類題",
        body: "$BD:DC=3:2$、$CE:EA=4:3$ に変えて、チェバでの $AF:FB$ と、面積比 $S_{\\triangle ABD}:S_{\\triangle ACD}$ を同じ手順で求めてみてください。",
      },
    ],
  },
  {
    id: "gp-core-example3-takeaway",
    type: "callout",
    tone: "success",
    title: "この問題から何を学ぶか",
    text:
      "比の問題では、まず「1点に集まるか、一直線か」を図で判別してから式を立てます。式の形が同じでも、内分か外分かという図の意味は別物として扱います。",
  },
  {
    id: "gp-core-cautions-heading",
    type: "heading",
    level: 2,
    text: "共通テスト型の注意点",
  },
  {
    id: "gp-core-cautions",
    type: "checklist",
    title: "図形の性質で落としやすい注意点",
    items: [
      "問題文の図が正確とは限らない。長さや角は本文の条件で確定する",
      "円の中心、接点、交点の位置を必ず確認する",
      "接線があれば、半径との垂直をその場で図に書き込む",
      "方べきの定理では「どの点を基準にした積か」を確認する",
      "割線の近い点・遠い点を取り違えない",
      "チェバとメネラウスを図の雰囲気だけで選ばない。1点に集まるか一直線かを確認する",
      "球の断面は、平面上の円として見直す",
      "空間図形は、まず断面図を書いてから考える",
    ],
  },
  {
    id: "gp-core-advanced-connection",
    type: "callout",
    tone: "success",
    title: "発展への接続",
    text:
      "円周角・方べき・比の性質は、数学Bの空間座標やベクトルで、内積や位置ベクトルとして再登場します。断面円の発想はそのまま、空間ベクトルでの球面や外接球の問題につながります。図形の性質で作った辺や角は、最後に図形と計量（正弦・余弦定理）へ渡して長さや角を仕上げる、という二段構えを覚えておくと発展問題にも対応しやすくなります。",
  },
  {
    id: "gp-core-mock-recovery",
    type: "mistakeRecovery",
    title: "冊子型模試 第1回・第2回 第3問から戻る復習先",
    intro:
      "第1回・第2回の第3問（円・接線・方べき・球の断面）で失点した場合は、症状ごとに戻る場所を変えます。",
    items: [
      {
        symptom: "球の断面で、断面半径をどの直角三角形から出すか迷った",
        action: "球の断面への接続へ戻る",
        href: "#gp-core-sphere-heading",
      },
      {
        symptom: "方べきで、どの点を基準にした積か分からなくなった",
        action: "方べきの定理：3つの形へ戻る",
        href: "#gp-core-power-heading",
      },
      {
        symptom: "接線の長さを求める前に、半径との垂直を書かなかった",
        action: "円と接線の判断へ戻る",
        href: "#gp-core-circle-tangent-heading",
      },
      {
        symptom: "チェバとメネラウスを図の雰囲気で選んだ",
        action: "代表例題3で1点集中か一直線かを確認する",
        href: "#gp-core-example3",
      },
      {
        symptom: "接弦定理でどちら側の円周角に移すか迷った",
        action: "代表例題2で角の移し方を確認する",
        href: "#gp-core-example2",
      },
    ],
  },
];

const geometryPropertiesCentersBlocks: LectureBlock[] = [
  {
    id: "geometry-properties-centers-flow",
    type: "solutionFlow",
    title: "中心と補助線の判別フロー",
    intro:
      "内心・外心・重心・垂心、角の二等分線、中線を、問題文の言葉から選び分けます。",
    steps: [
      {
        condition: "三辺から等距離、内接円が出る",
        tool: "内心と角の二等分線",
        reason: "二辺から等距離の点は角の二等分線上にあります。",
      },
      {
        condition: "三頂点から等距離、外接円が出る",
        tool: "外心と垂直二等分線",
        reason: "二点から等距離の点は垂直二等分線上にあります。",
      },
      {
        condition: "中点、中線、面積二等分が出る",
        tool: "重心または中線の長さ",
        reason: "重心は中線を二対一に分け、中線の長さはアポロニウスで処理できます。",
      },
      {
        condition: "高さ、垂線、直角が主役になる",
        tool: "垂心",
        reason: "垂心は三本の高さの交点です。高さと垂直二等分線を区別します。",
      },
      {
        condition: "対辺の分割比と隣の二辺の比が一致する",
        tool: "角の二等分線定理",
        reason: "比から二等分線を逆向きに判別できます。",
      },
      {
        condition: "角の二等分線の長さを求める",
        tool: "二等分線の長さ公式",
        reason: "隣の二辺と対辺の分割が分かれば、AD の二乗を直接作れます。",
      },
    ],
  },
  geometryDiagramBlock("geometry-properties-centers-incenter-diagram", "incenter-incircle"),
  geometryDiagramBlock("geometry-properties-centers-circumcenter-diagram", "circumcenter-circumcircle"),
  geometryDiagramBlock("geometry-properties-centers-centroid-diagram", "centroid-median"),
  geometryDiagramBlock("geometry-properties-centers-orthocenter-diagram", "orthocenter-altitudes"),
  geometryDiagramBlock("geometry-properties-centers-bisector-diagram", "angle-bisector-ratio"),
  geometryDiagramBlock("geometry-properties-centers-median-diagram", "median-length"),
  {
    id: "geometry-properties-centers-drill",
    type: "discriminationDrill",
    title: "中心と補助線の判別ドリル",
    intro:
      "言葉を見て、引くべき補助線と使う定理を即決する練習です。",
    items: [
      {
        condition: "三辺から等距離の点を作りたい",
        goal: "中心",
        choices: ["内心", "外心", "重心"],
        answer: "内心",
        reason: "三辺から等距離なら内心。補助線は角の二等分線です。",
      },
      {
        condition: "三頂点から等距離の点を作りたい",
        goal: "中心",
        choices: ["外心", "内心", "垂心"],
        answer: "外心",
        reason: "三頂点から等距離なら外心。補助線は垂直二等分線です。",
      },
      {
        condition: "三本の中線の交点が出た",
        goal: "中心",
        choices: ["重心", "垂心", "内心"],
        answer: "重心",
        reason: "中線の交点は重心で、中線を頂点側から二対一に分けます。",
      },
      {
        condition: "三本の高さの交点が出た",
        goal: "中心",
        choices: ["垂心", "外心", "重心"],
        answer: "垂心",
        reason: "高さの交点は垂心です。",
      },
      {
        condition: "辺の中点を通り、その辺に垂直な線がある",
        goal: "補助線",
        choices: ["垂直二等分線", "高さ", "中線"],
        answer: "垂直二等分線",
        reason: "垂直だけでなく中点を通るので、二点から等距離の線です。",
      },
      {
        condition: "頂点から対辺へ垂線を下ろす",
        goal: "補助線",
        choices: ["高さ", "垂直二等分線", "角の二等分線"],
        answer: "高さ",
        reason: "頂点から対辺へ下ろす垂線は高さです。中点を通るとは限りません。",
      },
      {
        condition: "対辺の分割比が隣の二辺の比と一致する",
        goal: "定理",
        choices: ["角の二等分線定理", "方べき", "トレミー"],
        answer: "角の二等分線定理",
        reason: "BD:DC=AB:AC の形は、角の二等分線定理のサインです。",
      },
      {
        condition: "二等分線 AD の長さを求めたい。AB、AC、BD、DC が分かる",
        goal: "長さ",
        choices: ["二等分線の長さ公式", "円周角", "接弦定理"],
        answer: "二等分線の長さ公式",
        reason: "AD^2=AB×AC-BD×DC がそのまま使えます。",
      },
      {
        condition: "直角三角形の外心を問われた",
        goal: "位置",
        choices: ["斜辺の中点", "直角の頂点", "内接円の中心"],
        answer: "斜辺の中点",
        reason: "直角三角形の外接円は斜辺を直径にします。",
      },
      {
        condition: "直角三角形の垂心を問われた",
        goal: "位置",
        choices: ["直角の頂点", "斜辺の中点", "重心"],
        answer: "直角の頂点",
        reason: "二本の辺がすでに高さになっているため、交点は直角の頂点です。",
      },
      {
        condition: "中点と中線の長さが問われ、三辺がそろっている",
        goal: "長さ",
        choices: ["アポロニウスの定理", "接弦定理", "正弦定理"],
        answer: "アポロニウスの定理",
        reason: "中線の長さは三辺と中点から直接処理できます。",
      },
      {
        condition: "内心から三辺へ垂線を下ろして面積を分ける",
        goal: "面積",
        choices: ["S=rs", "a/sin A=2R", "チェバの定理"],
        answer: "S=rs",
        reason: "三つの高さがすべて内接円半径 r になるためです。",
      },
    ],
  },
  {
    id: "geometry-properties-centers-problem",
    type: "problem",
    title: "本番形式演習：中心と二等分線",
    prompt:
      "三角形 ABC で、AB=6、AC=10、BC=12 とする。角 A の二等分線が BC と D で交わる。\n(1) BD と DC を求めよ。\n(2) AD の長さを求めよ。\n(3) この問題で、最初に角の二等分線定理を選ぶ理由を説明せよ。",
    choices: ["比で BD と DC を出して二等分線の長さ公式へ進む", "外心を作って半径を求める", "重心の二対一を使う"],
    answer: "比で BD と DC を出して二等分線の長さ公式へ進む",
    points: 14,
  },
  {
    id: "geometry-properties-centers-recovery",
    type: "mistakeRecovery",
    title: "中心と補助線のミス回収",
    intro: "中心名を暗記で処理して迷ったときは、条件の言葉に戻ります。",
    items: [
      {
        symptom: "内心と外心を取り違えた",
        action: "辺から等距離か、頂点から等距離かを確認する",
        href: "#geometry-properties-centers-flow",
      },
      {
        symptom: "高さと垂直二等分線を混同した",
        action: "頂点から下ろす線か、中点を通る線かを確認する",
        href: "#geometry-properties-centers-flow",
      },
      {
        symptom: "二等分線の長さ公式に入る前に分割を出し忘れた",
        action: "まず角の二等分線定理で BD と DC を決める",
        href: "#geometry-properties-centers-problem",
      },
    ],
  },
];

// ── 二次関数：平方完成・最大最小・合成関数の中核講義ブロック ───────────────
const quadraticCoreTextbookBlocks: LectureBlock[] = [
  {
    id: "quadratic-core-scope",
    type: "heading",
    level: 2,
    text: "二次関数で扱うこと",
  },
  {
    id: "quadratic-core-scope-text",
    type: "paragraph",
    text:
      "この講義では、平方完成、軸、定義域、端点比較、パラメータの場合分け、合成関数 f(f(x)) を、共通テスト型の誘導に沿って読み解きます。二次関数は計算単元に見えますが、点差がつくのは「最大値か最小値か」「軸が範囲に入るか」「内側の値域を次の定義域にできるか」を見抜く読解です。",
  },
  {
    id: "quadratic-core-importance",
    type: "callout",
    tone: "success",
    title: "共通テストで重要な理由",
    text:
      "冊子型模試の第2問のように、頂点、0≦x≦4での最大最小、M(a)、f(f(x)) が一続きで出ます。前問で出した値域を後半で使い、選択肢の式がどの端点の値かを読むため、途中の読解が崩れると後半の空欄まで連鎖します。",
  },
  {
    id: "quadratic-core-formulas-heading",
    type: "heading",
    level: 2,
    text: "公式・考え方一覧",
  },
  {
    id: "quadratic-core-formulas",
    type: "checklist",
    title: "まず持つ道具",
    items: [
      "平方完成：ax^2+bx+c を a(x-p)^2+q に直し、軸 x=p と頂点 (p,q) を読む。",
      "上に開く放物線：定義域なしなら最小値は頂点。定義域ありなら、軸が入れば頂点、入らなければ近い端点が最小。",
      "下に開く放物線：上に開く場合の最大・最小を入れ替える。",
      "最大値：上に開く放物線では端点比較。軸から遠い端点が大きい。",
      "端点比較の境目：f(左端)=f(右端) から出す。",
      "パラメータ：軸や端点が動くので、軸と定義域の位置関係を数直線で比べる。",
      "値域：定義域上での最小値と最大値から作る。",
      "合成関数：t=f(x) と置き、まず t の値域を出してから f(t) を考える。",
      "解の個数：判別式だけでなく、値域・軸・端点・グラフとの交点で数える。",
      "マーク式：境界値の等号、負号、選択肢番号を最後に確認する。",
    ],
  },
  {
    id: "quadratic-square-meaning",
    type: "callout",
    tone: "info",
    title: "平方完成の意味",
    text:
      "平方完成は、ただ式を変形する作業ではありません。二次関数をグラフへ翻訳する作業です。a(x-p)^2+q の形にすると、(x-p)^2 が0以上で、x=p のときだけ0になるため、頂点と軸が一目で分かります。最大最小は、この軸と定義域の位置関係を読む問題です。",
  },
  {
    id: "quadratic-reading-procedure",
    type: "solutionFlow",
    title: "二次関数の読解手順",
    intro:
      "計算に入る前に、何を聞かれているかと、どこを見るべきかを固定します。",
    steps: [
      {
        condition: "二次関数が出た",
        tool: "まず平方完成する",
        reason: "軸と頂点を読めないまま最大最小へ進まない。",
      },
      {
        condition: "軸を読んだ",
        tool: "定義域を見る",
        reason: "軸が使える点かどうかは定義域で決まる。",
      },
      {
        condition: "定義域がある",
        tool: "軸が定義域内か外かを判定",
        reason: "最小値は軸が入るかどうかで決まる。最大値は端点比較で決まる。",
      },
      {
        condition: "パラメータがある",
        tool: "軸や端点の大小関係で場合分け",
        reason: "軸が端点をまたぐ値、端点の大小が入れ替わる値が境界になる。",
      },
      {
        condition: "最大値・最小値・値域・個数のどれか",
        tool: "聞かれている量を言い換える",
        reason: "最大と最小では見る場所が違う。個数はグラフと値域で数える。",
      },
      {
        condition: "合成関数 f(f(x)) が出た",
        tool: "t=f(x) と置く",
        reason: "いきなり4次式に展開せず、内側の値域を外側の定義域にする。",
      },
    ],
  },
  {
    id: "quadratic-max-min-core-flow",
    type: "solutionFlow",
    title: "最大最小の判別フロー",
    intro:
      "二次関数の最大最小は、この順番でほぼ機械化できます。",
    steps: [
      { condition: "二次関数が出た", tool: "平方完成する", reason: "頂点形式にして軸を読む。" },
      { condition: "軸を読んだ", tool: "定義域があるか確認", reason: "定義域がなければ、上に開くなら最小値、下に開くなら最大値が頂点。" },
      { condition: "定義域がある", tool: "軸が定義域内か確認", reason: "最小値は軸、または軸に近い端点。" },
      { condition: "最大値を聞かれた", tool: "端点比較", reason: "上に開く放物線の最大値は、軸から遠い端点で起こる。" },
      { condition: "パラメータがある", tool: "軸と端点の位置関係で場合分け", reason: "最小値の境界は軸が端点に重なる値。" },
      { condition: "最大値の端点が変わる", tool: "f(左端)=f(右端)", reason: "端点の値が等しくなるところが最大値の境界。" },
      { condition: "合成関数", tool: "内側の値域を出す", reason: "t=f(x) の範囲を、外側 f(t) の定義域として扱う。" },
      { condition: "解の個数", tool: "グラフと値域で数える", reason: "値域外の t を使わず、各 t に対する x の個数を足す。" },
    ],
  },
  {
    id: "quadratic-parameter-core",
    type: "callout",
    tone: "warning",
    title: "パラメータの場合分けで見る境界",
    text:
      "軸が x=a のように動くときは、定義域 [0,4] との位置関係を見ます。最小値の境目は a=0,4。最大値の端点が変わる境目は、f(0)=f(4) または区間の中点です。境界値をどちらの範囲に含めるかは、式が同じ値になるかを確認してから決めます。",
  },
  {
    id: "quadratic-composition-core",
    type: "callout",
    tone: "info",
    title: "合成関数 f(f(x)) は値域から入る",
    text:
      "f(f(x)) をいきなり展開すると4次式になり、定義域の情報を失いやすくなります。t=f(x) と置き、まず x の範囲から t の値域を出します。次に f(t) をその t の範囲で考えます。f(f(x))=0 なら、まず f(t)=0 を解き、得られた t が値域内かを確認してから f(x)=t の解の個数を数えます。",
  },
  {
    id: "quadratic-common-test-cautions",
    type: "checklist",
    title: "共通テスト型の注意点",
    items: [
      "問題文の定義域を読み落とさない。0≦x≦4 のような範囲が点数の中心。",
      "軸が定義域の中にあるとは限らない。",
      "最大値と最小値で見る場所が違う。最小は軸、最大は端点比較。",
      "パラメータの境界値を含むか含まないかに注意する。",
      "選択肢の式を見て、どの端点の値か判断する。",
      "f(f(x)) をいきなり4次式に展開しない。",
      "値域を出してから次に進む。値域外の t は使わない。",
      "マーク式では負号、境界値、選択肢番号ミスに注意する。",
    ],
  },
  {
    id: "quadratic-example-1-heading",
    type: "heading",
    level: 2,
    text: "代表例題1：軸と定義域による最大最小",
  },
  {
    id: "quadratic-example-1",
    type: "problem",
    title: "0≦x≦4での最大値と最小値",
    prompt:
      "関数 f(x)=x^2-2ax+a^2-a を 0≦x≦4 で考える。\n\n(1) 軸と頂点を求めよ。\n(2) 最小値 m(a) を a の範囲で場合分けして求めよ。\n(3) 最大値 M(a) を a の範囲で場合分けして求めよ。",
    answer:
      "f(x)=(x-a)^2-a。軸は x=a、頂点は (a,-a)。最小値は a<0 で a^2-a、0≦a≦4 で -a、a>4 で a^2-9a+16。最大値は a<2 で a^2-9a+16、a≧2 で a^2-a。",
    points: 20,
    mistakeTags: ["場合分け不足", "条件見落とし", "公式選択ミス"],
  },
  {
    id: "quadratic-example-1-tabs",
    type: "explanationTabs",
    tabs: [
      {
        label: "方針",
        body:
          "平方完成して軸 x=a を読みます。最小値は軸が [0,4] に入るかで分け、最大値は f(0) と f(4) の端点比較で分けます。",
      },
      {
        label: "詳しい解説",
        body:
          "f(x)=x^2-2ax+a^2-a=(x-a)^2-a なので、軸は x=a、頂点は (a,-a) です。\n\n最小値は、軸が定義域より左なら左端、内側なら頂点、右なら右端です。a<0 なら m(a)=f(0)=a^2-a。0≦a≦4 なら m(a)=-a。a>4 なら m(a)=f(4)=16-8a+a^2-a=a^2-9a+16。\n\n最大値は端点比較です。f(0)=a^2-a、f(4)=a^2-9a+16。差をとると f(0)-f(4)=8a-16=8(a-2)。したがって a<2 なら f(4) が大きく、a≧2 なら f(0) が大きいので、M(a)=a^2-9a+16 (a<2)、M(a)=a^2-a (a≧2) です。",
      },
      {
        label: "別解",
        body:
          "最大値は計算せず、軸から遠い端点で判断できます。区間 [0,4] の中点は2です。軸 a が2より左なら右端4が遠く、a が2より右なら左端0が遠い。したがって境界は a=2 です。最後に端点の式 f(0), f(4) を代入すれば同じ答えになります。",
      },
      {
        label: "最速解法",
        body:
          "最小値の境界は軸が端点に重なる a=0,4。最大値の境界は端点の遠さが等しい a=2。境界値だけ先に書くと、場合分けの骨格が一気に決まります。",
      },
      {
        label: "よくあるミス",
        body:
          "最大値でも頂点を見てしまう、最小値の境界 0,4 を最大値にも使う、f(4) の -8a と -a を合わせ忘れる、a=2 の等号を落とす、が頻出です。",
      },
      {
        label: "類題",
        body:
          "第2回模試第2問の M(a) 判定に戻ります。この問題から学ぶことは、最小値は軸の位置、最大値は端点比較で境界が別になるということです。",
      },
    ],
  },
  {
    id: "quadratic-example-2-heading",
    type: "heading",
    level: 2,
    text: "代表例題2：合成関数 f(f(x))",
  },
  {
    id: "quadratic-example-2",
    type: "problem",
    title: "t=f(x) と置く",
    prompt:
      "f(x)=x^2-2x とし、0≦x≦4 で考える。\n\n(1) f(x) の値域を求めよ。\n(2) f(f(x)) の最小値と最大値を求めよ。\n(3) f(f(x))=0 の解の個数を求めよ。",
    answer:
      "f(x) の値域は -1≦f(x)≦8。f(f(x)) の最小値は -1、最大値は 48。f(f(x))=0 の解は x=0,2,1+√3 の3個。",
    points: 20,
    mistakeTags: ["条件見落とし", "問題文の読み違い", "計算ミス"],
  },
  {
    id: "quadratic-example-2-tabs",
    type: "explanationTabs",
    tabs: [
      {
        label: "方針",
        body:
          "t=f(x) と置きます。まず 0≦x≦4 での t の値域を出し、その範囲 -1≦t≦8 上で f(t)=t^2-2t を考えます。",
      },
      {
        label: "詳しい解説",
        body:
          "f(x)=x^2-2x=(x-1)^2-1 です。0≦x≦4 では、最小値は x=1 で -1、最大値は右端 x=4 で 8。したがって -1≦t=f(x)≦8 です。\n\n次に f(f(x))=f(t)=t^2-2t=(t-1)^2-1 を -1≦t≦8 で考えます。軸 t=1 は範囲内なので最小値は -1。最大値は端点比較で、f(-1)=3、f(8)=48 だから最大値は48です。\n\nf(f(x))=0 は f(t)=0、つまり t^2-2t=0 なので t=0,2。どちらも -1≦t≦8 に入ります。f(x)=0 は x=0,2。f(x)=2 は x^2-2x-2=0 より x=1±√3 で、0≦x≦4 に入るのは 1+√3 のみ。よって解の個数は3個です。",
      },
      {
        label: "別解",
        body:
          "f(f(x)) を4次式へ展開する方法もありますが、0≦x≦4 の範囲で増減が複雑になり、見通しが悪くなります。t=f(x) の値域を先に押さえると、外側はただの二次関数 f(t) になり、最大最小も解の個数も同じ道具で処理できます。",
      },
      {
        label: "最速解法",
        body:
          "内側の値域 -1≦t≦8 を出した瞬間に、外側は t の二次関数です。f(t)=0 の候補 t=0,2 が値域内かだけ確認し、各 t について f(x)=t の解を数えます。",
      },
      {
        label: "よくあるミス",
        body:
          "f(f(x)) を展開して4次式にする、t の値域を -1≦t≦8 ではなく 0≦t≦4 と誤る、t=2 から出る x=1-√3 を範囲外なのに数える、が典型です。",
      },
      {
        label: "類題",
        body:
          "第1回・第2回模試の合成関数パートに戻ります。この問題から学ぶことは、合成関数は展開ではなく、内側の値域を外側の定義域にすることです。",
      },
    ],
  },
  {
    id: "quadratic-example-3-heading",
    type: "heading",
    level: 2,
    text: "代表例題3：選択肢型のパラメータ場合分け",
  },
  {
    id: "quadratic-example-3",
    type: "problem",
    title: "最大値を与える端点を見抜く",
    prompt:
      "f(x)=x^2-2ax+a^2-a を 0≦x≦4 で考える。最大値 M(a) について、次のうち正しいものを選べ。\n\n① a<2 のとき M(a)=a^2-9a+16、a≧2 のとき M(a)=a^2-a\n② a<2 のとき M(a)=a^2-a、a≧2 のとき M(a)=a^2-9a+16\n③ 0≦a≦4 のとき M(a)=-a\n④ 常に M(a)=a^2-a",
    choices: ["①", "②", "③", "④"],
    answer: "①",
    points: 12,
    mistakeTags: ["公式選択ミス", "条件見落とし"],
  },
  {
    id: "quadratic-example-3-tabs",
    type: "explanationTabs",
    tabs: [
      {
        label: "方針",
        body:
          "選択肢の式を端点の値として読みます。f(0)=a^2-a、f(4)=a^2-9a+16 なので、あとはどちらが最大になるかを比べます。",
      },
      {
        label: "詳しい解説",
        body:
          "上に開く放物線なので、最大値は端点で起こります。f(0)=a^2-a、f(4)=a^2-9a+16 です。\n\nf(0)-f(4)=8a-16=8(a-2) だから、a<2 では f(0)<f(4) で右端 x=4 が最大、a>2 では f(0)>f(4) で左端 x=0 が最大です。a=2 では両端が等しいので、a≧2 の側に含めても値は一致します。\n\nしたがって、a<2 のとき M(a)=a^2-9a+16、a≧2 のとき M(a)=a^2-a。正解は①です。",
      },
      {
        label: "別解",
        body:
          "端点比較を式でしなくても、軸 x=a と区間 [0,4] の中点2を見ると分かります。軸が2より左なら右端4が遠く、軸が2より右なら左端0が遠い。最大値は軸から遠い端点なので、同じ境界 a=2 が出ます。",
      },
      {
        label: "最速解法",
        body:
          "選択肢に a^2-a があれば f(0)、a^2-9a+16 があれば f(4) です。式の意味を端点として読むと、選択肢処理が速くなります。",
      },
      {
        label: "よくあるミス",
        body:
          "頂点の値 -a を最大値候補にする、境界 a=2 の等号を逆側に入れて混乱する、選択肢の式がどの端点か見抜けない、の3つが多いです。",
      },
      {
        label: "類題",
        body:
          "共通テスト型の M(a) 選択肢問題に進みます。この問題から学ぶことは、式そのものではなく「その式がどの端点を表すか」を読む力です。",
      },
    ],
  },
  {
    id: "quadratic-core-recovery",
    type: "mistakeRecovery",
    title: "模試第2問からの戻り先",
    intro:
      "第1回・第2回の冊子型模試でどこを落としたかに合わせて、この講義内の戻る場所を決めます。",
    items: [
      { symptom: "頂点・軸・平方完成で誤った", action: "平方完成の意味と読解手順へ戻る", href: "#quadratic-square-meaning" },
      { symptom: "0≦x≦4 の最大最小で誤った", action: "最大最小の判別フローへ戻る", href: "#quadratic-max-min-core-flow" },
      { symptom: "M(a) の選択肢を誤った", action: "選択肢型のパラメータ場合分けへ戻る", href: "#quadratic-example-3" },
      { symptom: "f(f(x)) を展開して崩れた", action: "合成関数 f(f(x)) の代表例題へ戻る", href: "#quadratic-example-2" },
      { symptom: "境界値の等号を落とした", action: "パラメータの場合分けの境界へ戻る", href: "#quadratic-parameter-core" },
    ],
  },
  {
    id: "quadratic-core-related",
    type: "relatedProblems",
    title: "復習先と確認問題",
    items: [
      {
        title: "共通テスト型本番模試 数学I・A 第1回 第2問",
        href: "/common-test/simulator/common-test-math-1a-manual-001",
        note: "最大最小、値域、f(f(x))、パラメータ条件の復習。",
      },
      {
        title: "共通テスト型本番模試 数学I・A 第2回 第2問",
        href: "/common-test/simulator/common-test-math-1a-manual-002",
        note: "0≦x≦4、M(a)、f(f(x)) の復習。",
      },
      {
        title: "通常コース 二次関数",
        href: "/courses/math-1a/quadratic",
        note: "平方完成と最大最小を基礎から戻って確認する。",
      },
      {
        title: "共通テスト 数学IA 第2問",
        href: "/common-test/math-1a/section-2",
        note: "二次関数とデータ分析の大問演習。",
      },
    ],
  },
  {
    id: "quadratic-advanced-connection",
    type: "callout",
    tone: "info",
    title: "発展への接続",
    text:
      "軸・端点・値域の考え方は、二次不等式、解の配置、接線条件、数学IIの三角関数の最大最小、数学IIIの微分による最大最小へそのままつながります。合成関数で値域を先に見る発想は、指数・対数や三角関数の置換にも再登場します。",
  },
];

// ── 二次関数：文字定数つき最大最小・場合分け境界の満点ブロック ─────────────
const quadraticCaseSplitBlocks: LectureBlock[] = [
  {
    id: "quadratic-parameter-callout",
    type: "callout",
    tone: "info",
    title: "満点仕上げ：文字定数つき最大最小を機械化する",
    text:
      "軸か定義域に文字が入ると急に難しく見えますが、やることは同じです。軸が定義域の左・内・右のどこにあるかを場合分けするだけ。最小は軸の位置、最大は端点比較、境界は軸が端をまたぐ値から作ります。",
  },
  {
    id: "quadratic-parameter-flow",
    type: "solutionFlow",
    title: "軸と定義域の完全判別フロー",
    intro:
      "「最大か最小か」と「軸が定義域のどこにあるか」で、見るべき点が一意に決まります。式変形より先に、この判別を済ませます。",
    steps: [
      {
        condition: "最小値（上に凸）で、軸が定義域の内側にある",
        tool: "頂点が最小",
        reason: "軸が区間内なら最小は頂点 $f(a)$。端点は見なくてよい。",
      },
      {
        condition: "最小値（上に凸）で、軸が定義域の外側にある",
        tool: "軸に近い端点が最小",
        reason: "軸が左外なら左端、右外なら右端。近いほうが小さい。",
      },
      {
        condition: "最大値（上に凸）を求める",
        tool: "軸から遠い端点で端点比較",
        reason: "$f(\\text{左端})$ と $f(\\text{右端})$ を比べ、軸から遠い端点が最大。",
      },
      {
        condition: "下に凸（$x^2$ の係数が負）",
        tool: "最大と最小を入れ替えて考える",
        reason: "頂点が最大、端点が最小になる。上に凸の判断を裏返す。",
      },
      {
        condition: "軸が文字定数で動く",
        tool: "軸を文字で表し、定義域の端と大小比較",
        reason: "軸が定義域の端をまたぐ値が、場合分けの境界になる。",
      },
      {
        condition: "定義域が文字で動く（$a\\le x\\le a+2$ など）",
        tool: "区間に頂点が入るかで分ける",
        reason: "区間の位置で同じ判別。頂点が区間内か外かが分かれ目。",
      },
      {
        condition: "軸も定義域も動く",
        tool: "軸と区間の相対位置で1変数に集約",
        reason: "効くのは軸と区間の差だけ。相対位置で場合分けの数を減らす。",
      },
    ],
  },
  {
    id: "quadratic-boundary-drill",
    type: "discriminationDrill",
    title: "場合分け境界ドリル：どこで分ける？",
    intro:
      "二次関数で一番事故るのが場合分けの境界です。計算はせず、軸・定義域・頂点の位置から境界の条件だけを即答します。",
    items: [
      {
        condition: "上に凸、軸 $x=a$、定義域 $0\\le x\\le 2$。最小値が頂点で起こる $a$ の条件は？",
        goal: "最小が頂点になる条件",
        choices: ["$0\\le a\\le 2$", "$a<0$", "$a>2$"],
        answer: "$0\\le a\\le 2$",
        reason: "軸が定義域の内側にあるとき、最小は頂点で起こる。",
      },
      {
        condition: "上に凸、軸 $x=a$、定義域 $0\\le x\\le 2$。最小値が左端で起こる条件は？",
        goal: "最小が左端になる条件",
        choices: ["$a<0$", "$a>2$", "$0\\le a\\le 2$"],
        answer: "$a<0$",
        reason: "軸が定義域より左にあると、最小は最も近い左端。",
      },
      {
        condition: "上に凸、軸 $x=a$、定義域 $0\\le x\\le 2$。最小値が右端で起こる条件は？",
        goal: "最小が右端になる条件",
        choices: ["$a>2$", "$a<0$", "$0\\le a\\le 2$"],
        answer: "$a>2$",
        reason: "軸が定義域より右にあると、最小は最も近い右端。",
      },
      {
        condition: "上に凸、軸 $x=a$、定義域 $0\\le x\\le 2$。最大値が右端 $f(2)$ になる条件は？",
        goal: "最大が右端になる条件",
        choices: ["$a<1$", "$a>1$", "$0\\le a\\le 2$"],
        answer: "$a<1$",
        reason: "最大は軸から遠い端点。中点1より軸が左なら右端が遠い。",
      },
      {
        condition: "上に凸、軸 $x=a$、定義域 $0\\le x\\le 2$。最大値が左端 $f(0)$ になる条件は？",
        goal: "最大が左端になる条件",
        choices: ["$a>1$", "$a<1$", "$a=1$"],
        answer: "$a>1$",
        reason: "中点1より軸が右なら左端が遠く、左端が最大。",
      },
      {
        condition: "上に凸、定義域 $0\\le x\\le 2$。最大値の端点が左右で入れ替わる軸の位置は？",
        goal: "最大値の境界",
        choices: ["$a=1$（区間の中点）", "$a=0$", "判別式 $D=0$"],
        answer: "$a=1$（区間の中点）",
        reason: "両端からの距離が等しくなる中点で、最大の端点が切り替わる。",
      },
      {
        condition: "軸 $x=a$ が定義域 $1\\le x\\le 4$ の左側にある条件は？",
        goal: "軸が左外の条件",
        choices: ["$a<1$", "$a>4$", "$1\\le a\\le 4$"],
        answer: "$a<1$",
        reason: "軸が左端1より小さければ定義域の左外。",
      },
      {
        condition: "軸 $x=a$ が定義域 $1\\le x\\le 4$ の右側にある条件は？",
        goal: "軸が右外の条件",
        choices: ["$a>4$", "$a<1$", "$1\\le a\\le 4$"],
        answer: "$a>4$",
        reason: "軸が右端4より大きければ定義域の右外。",
      },
      {
        condition: "軸 $x=a$ が定義域 $1\\le x\\le 4$ の内側にある条件は？",
        goal: "軸が内側の条件",
        choices: ["$1\\le a\\le 4$", "$a<1$", "$a>4$"],
        answer: "$1\\le a\\le 4$",
        reason: "両端の間に軸があれば内側。最小は頂点。",
      },
      {
        condition: "定義域が $a\\le x\\le a+2$ と動く。これに $x=1$ が含まれる条件は？",
        goal: "区間が1を含む条件",
        choices: ["$-1\\le a\\le 1$", "$a\\le 1$", "$0\\le a\\le 2$"],
        answer: "$-1\\le a\\le 1$",
        reason: "$a\\le 1\\le a+2$ を解くと $-1\\le a\\le 1$。",
      },
      {
        condition: "定義域 $a\\le x\\le a+2$ に頂点 $x=2$ が含まれる条件は？",
        goal: "区間が頂点を含む条件",
        choices: ["$0\\le a\\le 2$", "$-1\\le a\\le 1$", "$a\\ge 2$"],
        answer: "$0\\le a\\le 2$",
        reason: "$a\\le 2\\le a+2$ を解くと $0\\le a\\le 2$。頂点が区間内なら最小は頂点。",
      },
      {
        condition: "上に凸、軸 $x=a$、定義域 $0\\le x\\le 2$。左端のほうが軸に近い条件は？",
        goal: "左端が軸に近い条件",
        choices: ["$a<1$", "$a>1$", "$a=1$"],
        answer: "$a<1$",
        reason: "$|a-0|<|a-2|$ は $a<1$ と同値。中点より左に軸。",
      },
      {
        condition: "上に凸、軸が右端に一致（$a=2$、定義域 $0\\le x\\le 2$）。最小値の位置は？",
        goal: "最小の位置",
        choices: ["右端（頂点と一致）", "左端", "区間の外"],
        answer: "右端（頂点と一致）",
        reason: "軸＝右端なので、頂点と右端が一致してそこが最小。",
      },
      {
        condition: "軸も定義域も $t$ で動く最大最小。場合分けを1変数にまとめる初手は？",
        goal: "場合分けの初手",
        choices: ["軸と区間の相対位置（軸−区間）で整理", "とりあえず展開する", "判別式を計算する"],
        answer: "軸と区間の相対位置（軸−区間）で整理",
        reason: "効くのは軸と区間の差だけ。相対位置で場合分けを減らせる。",
      },
      {
        condition: "文字定数つきの最大最小で、計算より先に紙に書くべきものは？",
        goal: "最初に書くもの",
        choices: ["軸と定義域を同じ数直線に置く", "判別式の値", "頂点の $y$ 座標だけ"],
        answer: "軸と定義域を同じ数直線に置く",
        reason: "軸・端点・頂点を一本の数直線で見ると、境界が目で分かる。",
      },
      {
        condition: "区間 $a\\le x\\le a+1$ が頂点 $x=3$ より右にある条件は？",
        goal: "区間が頂点の右の条件",
        choices: ["$a>3$", "$a<3$", "$a=3$"],
        answer: "$a>3$",
        reason: "区間の左端 $a$ が3より大きければ、区間全体が頂点の右側。",
      },
    ],
  },
  {
    id: "quadratic-parameter-problem",
    type: "problem",
    title: "本番形式演習：文字定数の最小値（軸が動く）",
    prompt:
      "関数 $f(x)=x^2-2ax+a^2+a$ を $0\\le x\\le 2$ で考える。\n\n(1) 軸と頂点の $y$ 座標を求めよ。\n(2) 最小値 $m(a)$ を $a$ の範囲で場合分けして求めよ。\n(3) $a=3$ のときの最小値を求めよ。",
    choices: [
      "$a<0$ で $a^2+a$、$0\\le a\\le 2$ で $a$、$a>2$ で $a^2-3a+4$。$a=3$ なら $4$",
      "常に頂点の値 $a$。$a=3$ なら $3$",
      "$a<0$ で $a$、$0\\le a\\le 2$ で $a^2+a$。$a=3$ なら $9$",
      "判別式で場合分けする。$a=3$ なら $0$",
    ],
    answer:
      "$a<0$ で $a^2+a$、$0\\le a\\le 2$ で $a$、$a>2$ で $a^2-3a+4$。$a=3$ なら $4$",
    points: 12,
    mistakeTags: ["場合分け不足", "条件見落とし", "計算ミス"],
  },
  {
    id: "quadratic-parameter-explanation",
    type: "explanationTabs",
    tabs: [
      {
        label: "ヒント",
        body: "平方完成すると $f(x)=(x-a)^2+a$。軸 $x=a$、頂点 $(a,\\ a)$。上に凸なので、最小は軸が定義域のどこにあるかで決まります。",
      },
      {
        label: "方針",
        body: "軸 $a$ が定義域 $[0,2]$ の左外・内・右外の3つに場合分けします。外なら近い端点、内なら頂点。境界は $a=0$ と $a=2$。",
      },
      {
        label: "詳しい解説",
        body:
          "$f(x)=(x-a)^2+a$。\n\n$a<0$ のとき軸が左外なので最小は左端 $f(0)=a^2+a$。\n\n$0\\le a\\le 2$ のとき軸が内側なので最小は頂点 $a$。\n\n$a>2$ のとき軸が右外なので最小は右端 $f(2)=4-4a+a^2+a=a^2-3a+4$。\n\n$a=3$ は $a>2$ なので $9-9+4=4$。",
      },
      {
        label: "最速解法",
        body: "軸 $x=a$ の位置だけを見ます。境界は $a=0,\\ 2$。3パターン（左端・頂点・右端）を並べれば終わりです。",
      },
      {
        label: "よくあるミス",
        body: "端点 $f(2)$ の展開ミス、$a=2$ をどの場合に入れるか曖昧、$a>2$ なのに頂点の値 $a$ を使ってしまう、の3つが頻出です。",
      },
      {
        label: "類題",
        body: "同じ関数で最大値 $M(a)$ を端点比較で場合分け、さらに最大値と最小値の差を $a$ で表す問題へ進みます。",
      },
    ],
  },
  {
    id: "quadratic-parameter-recovery",
    type: "mistakeRecovery",
    title: "文字定数・場合分けのミス回収",
    intro: "場合分けは、どこでつまずいたかで戻る場所が変わります。",
    items: [
      { symptom: "軸を見ずに端点だけで判断した", action: "軸と定義域の完全判別フローへ戻る", href: "#quadratic-parameter-flow" },
      { symptom: "軸が区間外なのに頂点を最小にした", action: "判別フローの「外なら近い端点」を確認", href: "#quadratic-parameter-flow" },
      { symptom: "場合分けの境界を感覚で作った", action: "場合分け境界ドリルをやり直す", href: "#quadratic-boundary-drill" },
      { symptom: "最大値と最小値を取り違えた", action: "端点比較の型へ戻る", href: "#quadratic-endpoint-callout" },
      { symptom: "定義域が動く問題で頂点の有無を見落とした", action: "境界ドリルで区間の場合を確認", href: "#quadratic-boundary-drill" },
    ],
  },
];

// ── 確率：読解・順列組合せ・条件付き確率の中核講義ブロック ───────────────────
const probabilityCoreGuidedReadingBlocks: LectureBlock[] = [
  {
    id: "probability-core-scope",
    type: "heading",
    level: 2,
    text: "場合の数と確率で扱うこと",
  },
  {
    id: "probability-core-scope-text",
    type: "paragraph",
    text:
      "この講義では、順列・組合せ・同じものを含む並べ方・余事象・和事象・積事象・条件付き確率を、問題文の日本語から選び分ける練習をします。共通テストの確率は、計算力よりも「何を同様に確からしい1通りとして数えるか」を決める読解で差がつきます。",
  },
  {
    id: "probability-core-importance",
    type: "callout",
    tone: "success",
    title: "共通テストで重要な理由",
    text:
      "冊子型模試の第4問のように、前問で数えた全体・条件A・条件B・共通部分を、後半の条件付き確率や選択肢判定に再利用します。分母を毎回360に固定したり、「AのもとでB」と「BのもとでA」を入れ替えたりすると、計算が合っていても失点します。",
  },
  {
    id: "probability-core-formulas-heading",
    type: "heading",
    level: 2,
    text: "公式・考え方一覧",
  },
  {
    id: "probability-core-formulas",
    type: "checklist",
    title: "まず持つ道具",
    items: [
      "和の法則：AまたはBで、重ならないなら足す。重なるなら包除で重なりを1回引く。",
      "積の法則：段階的に選ぶときは、各段階の通り数を掛ける。",
      "順列：並べる、席に座る、列を作る、役割を決めるなど、順序や位置を区別する。",
      "組合せ：選ぶだけ、代表を決めるだけなど、順序を区別しない。",
      "同じものを含む順列：区別できない並べ替えを、同じものの個数の階乗で割る。",
      "余事象：少なくとも1つ、1つもない、すべてではない、隣り合わないの一部で使う。",
      "包除：AまたはBは、Aの数+Bの数-AかつBの数。",
      "条件付き確率：P(B|A)=P(A∩B)/P(A)。条件が付いたら分母をAの世界へ変える。",
      "独立：片方が起きてももう片方の確率が変わらないとき、P(A∩B)=P(A)P(B)。",
      "排反：同時に起こらないとき、P(A∩B)=0。独立とは別物。",
    ],
  },
  {
    id: "probability-reading-procedure",
    type: "solutionFlow",
    title: "確率の読解手順",
    intro:
      "式を立てる前に、分母と条件の意味を固定します。ここが固まると、後の計算は短くなります。",
    steps: [
      {
        condition: "何を同様に確からしいと見るか",
        tool: "1通りの単位を決める",
        reason: "座り方なら人と席の対応、列なら並び、選ぶだけなら集合を1通りとする。",
      },
      {
        condition: "全事象を何で数えるか",
        tool: "分母を先に書く",
        reason: "最初の全体なのか、条件後の全体なのかを混ぜないため。",
      },
      {
        condition: "区別するもの・区別しないものがあるか",
        tool: "順序・役割・名前を確認",
        reason: "名前、席、カード、数字、順番を区別するかで順列と組合せが変わる。",
      },
      {
        condition: "条件が少なくとも1つ・どれもない",
        tool: "余事象を疑う",
        reason: "直接数えるより、反対側を全体から引くほうが速い場面が多い。",
      },
      {
        condition: "AまたはB、AかつBがある",
        tool: "和事象・積事象を分ける",
        reason: "またはは包除、かつは共通部分。重なりを二重に数えない。",
      },
      {
        condition: "Aが起こったもとでBか、Bが起こったもとでAか",
        tool: "条件付き確率の分母を決める",
        reason: "P(B|A) と P(A|B) は一般に違う。条件の直後の世界が分母。",
      },
      {
        condition: "隣り合う・隣り合わない",
        tool: "かたまり・余事象・すき間",
        reason: "隣り合うはかたまり、隣り合わないは余事象かすき間に置く。",
      },
    ],
  },
  {
    id: "probability-counting-decision-flow",
    type: "solutionFlow",
    title: "場合の数の判別フロー",
    intro:
      "公式名から入らず、問題文の動詞から入ります。共通テストでは、この判別を会話文や前問の結果に合わせて更新します。",
    steps: [
      { condition: "並べる？", tool: "順列", reason: "位置や順番を区別する。列、席、役割、辞書式順序はここ。" },
      { condition: "選ぶだけ？", tool: "組合せ", reason: "順番を区別しない。選ばれたメンバーだけが問題。" },
      { condition: "同じものを含む？", tool: "重複を割る", reason: "同じ並びを何度も数えた分を階乗で割る。" },
      { condition: "隣り合う？", tool: "かたまりにする", reason: "対象を1つのブロックとして並べ、ブロック内部の順序を掛ける。" },
      { condition: "隣り合わない？", tool: "余事象 or すき間", reason: "全体から隣り合う場合を引くか、先に他のものを並べてすき間を選ぶ。" },
      { condition: "少なくとも1つ？", tool: "余事象", reason: "1つもない場合を引く。直接の場合分けが多いときほど効く。" },
      { condition: "条件が複数ある？", tool: "積事象・和事象・場合分け", reason: "同時に満たすのか、どちらかでよいのか、場合が分かれるのかを分ける。" },
      { condition: "条件付き？", tool: "分母を条件後の世界に変える", reason: "前問の条件Aの個数が、そのまま新しい分母になることがある。" },
    ],
  },
  {
    id: "probability-conditional-core-heading",
    type: "heading",
    level: 2,
    text: "条件付き確率は分母が変わる",
  },
  {
    id: "probability-conditional-core-math",
    type: "paragraph",
    text:
      "条件付き確率は、条件が付いた後の狭い世界で確率を見直す考え方です。P(B|A)=P(A∩B)/P(A)、P(A|B)=P(A∩B)/P(B) なので、分子が同じでも分母が違います。表・樹形図・ベン図でA、B、A∩Bを先に数えると、前問の値を分母と分子に再利用できます。",
  },
  {
    id: "probability-complement-inclusion-core",
    type: "callout",
    tone: "info",
    title: "余事象と包除の読み替え",
    text:
      "「少なくとも1つ」は「1つもない」の反対、「AまたはB」は「A+B-両方」、「Aでない条件のもとでB」は B∩A^c を A^c で割る、と日本語で言い換えます。反対側や重なりを間違えやすいので、いきなり式にせず、何を引くのかを一文で書く習慣を作ります。",
  },
  {
    id: "probability-common-test-cautions",
    type: "checklist",
    title: "共通テスト型の注意点",
    items: [
      "問題文の「同様に確からしい」を読み落とさない。",
      "名前・席・カード・数字など、何を区別するかを最初に決める。",
      "「条件のもとで」の後は世界が狭くなる。分母を毎回360などに固定しない。",
      "前問で数えた値を、後半の分母・分子に再利用する。",
      "余事象の対象を間違えない。少なくとも1つの反対は、1つもない。",
      "AまたはBでは、AかつBを二重に数えていないか確認する。",
      "独立と条件付き確率、独立と排反を混同しない。",
      "確率は最後に約分する。マーク式では分子分母の選択肢番号ミスにも注意する。",
    ],
  },
  {
    id: "probability-example-1-heading",
    type: "heading",
    level: 2,
    text: "代表例題1：席に座る条件付き確率",
  },
  {
    id: "probability-example-1",
    type: "problem",
    title: "6席に4人が座る",
    prompt:
      "横一列に並んだ6席に、A、B、C、Dの4人が1人1席ずつ座る。すべての座り方を同様に確からしいとする。\n\n事象Xを「AとBが隣り合う」、事象Yを「AとBの少なくとも一方が端の席に座る」とする。\n\n(1) 全座り方、X、Y、X∩Y の場合の数を求めよ。\n(2) P(Y|X) と P(X|Y) を求めよ。",
    answer:
      "全体360通り、X=120通り、Y=216通り、X∩Y=48通り。P(Y|X)=2/5、P(X|Y)=2/9。",
    points: 20,
    mistakeTags: ["条件見落とし", "場合分け不足", "公式選択ミス"],
  },
  {
    id: "probability-example-1-tabs",
    type: "explanationTabs",
    tabs: [
      {
        label: "方針",
        body:
          "まず全体を6P4=360で固定します。XはAとBをかたまりにします。Yは「少なくとも一方が端」なので、AもBも端にいない余事象で数えます。条件付き確率は分母をXまたはYに変えます。",
      },
      {
        label: "詳しい解説",
        body:
          "全体は6席から4席を選んで4人を並べるので 6P4=360 通り。\n\nXはAとBの隣接ペアの位置が5通り、A/Bの順序が2通り、残りC,Dを残り4席へ入れる方法が4P2=12通りなので、5×2×12=120通り。\n\nYは余事象で数えます。AもBも端にいないなら、A,Bは中央4席に順に入るので4P2=12通り、C,Dは残り4席に4P2=12通り。よって余事象は144通り、Yは360-144=216通り。\n\nX∩Yでは、A/Bの隣接ペアが端を含むのは(1,2)または(5,6)の2通り。A/Bの順序2通り、C,Dは残り4席に4P2=12通りなので、2×2×12=48通り。\n\nしたがって P(Y|X)=48/120=2/5、P(X|Y)=48/216=2/9 です。",
      },
      {
        label: "別解",
        body:
          "Yを直接数えることもできます。Aが端に座る場合は、Aの端位置2通り、残りB,C,Dを5席へ入れて5P3=60通りなので120通り。Bが端の場合も120通り。AもBも両端に座る場合は2通り×4P2=24通りです。よって包除で120+120-24=216通り。余事象なら360-144=216通りで、こちらの方が短く安全です。",
      },
      {
        label: "最速解法",
        body:
          "第2回模試型では、前半で全体・A・B・A∩Bを数えさせ、後半で分母に再利用します。P(Y|X) なら分母はX、P(X|Y) なら分母はY、とだけ確認してから約分します。",
      },
      {
        label: "よくあるミス",
        body:
          "P(Y|X) と P(X|Y) を同じにする、Yの分母を360のままにする、A/Bの順序2通りを落とす、隣接ペアの端位置を4通りや5通りにしてしまう、の4つが頻出です。",
      },
      {
        label: "類題",
        body:
          "冊子型模試 第2回 第4問の条件付き確率、冊子型模試 第1回 第4問の辞書式順序と条件付き確率に戻ります。この問題で学ぶのは、条件が付いた瞬間に分母を条件後の世界へ変えることです。",
      },
    ],
  },
  {
    id: "probability-example-2-heading",
    type: "heading",
    level: 2,
    text: "代表例題2：余事象と包除",
  },
  {
    id: "probability-example-2",
    type: "problem",
    title: "1から20のカード",
    prompt:
      "1から20までの整数が1つずつ書かれたカードから1枚を等しい確率で選ぶ。Aを「偶数」、Bを「5の倍数」とする。\n\n(1) AまたはBである確率を求めよ。\n(2) AでもBでもない確率を求めよ。\n(3) Aでないと分かったとき、Bである確率を求めよ。",
    answer: "(1) 3/5、(2) 2/5、(3) 1/5。",
    points: 16,
    mistakeTags: ["公式選択ミス", "条件見落とし"],
  },
  {
    id: "probability-example-2-tabs",
    type: "explanationTabs",
    tabs: [
      {
        label: "方針",
        body:
          "AまたはBは包除、AでもBでもないは余事象、Aでないと分かったときは条件付き確率です。同じAとBでも、問われ方によって分母や道具が変わります。",
      },
      {
        label: "詳しい解説",
        body:
          "1から20で偶数は10個、5の倍数は4個、両方を満たす10の倍数は2個です。\n\n(1) AまたはBは 10+4-2=12 個なので、12/20=3/5。\n\n(2) AでもBでもないは、AまたはBの余事象なので、1-3/5=2/5。\n\n(3) Aでないカードは奇数10個です。その中でBであるカードは5と15の2個なので、2/10=1/5 です。式で書くなら P(B|A^c)=P(B∩A^c)/P(A^c) です。",
      },
      {
        label: "別解",
        body:
          "(2)は直接数えてもよいです。奇数10個のうち、5と15は5の倍数なので除くと8個。よって8/20=2/5。余事象と直接計算が一致することを確認できます。",
      },
      {
        label: "最速解法",
        body:
          "「または」は包除、「でもない」は余事象、「でないと分かったとき」は条件付き、と語で反応します。A^c が条件なら、分母はA^cの個数です。",
      },
      {
        label: "よくあるミス",
        body:
          "AまたはBで10+4=14として重複を引かない、(3)の分母を20にする、A^cの中のBを数えずにB全体4個を使う、が典型です。",
      },
      {
        label: "類題",
        body:
          "少なくとも1つ条件を満たす問題、AまたはBまたはCの包除、検査表でAでない条件のもとでBを求める問題に進みます。この問題で学ぶのは、余事象と包除の日本語変換です。",
      },
    ],
  },
  {
    id: "probability-example-3-heading",
    type: "heading",
    level: 2,
    text: "代表例題3：順序あり・順序なしの判別",
  },
  {
    id: "probability-example-3",
    type: "problem",
    title: "1から6の数字を使う",
    prompt:
      "1から6までの数字から異なる4個を使う。\n\n(1) 4個を左から順に並べて列を作るとき、列は何通りか。\n(2) 4個を選ぶだけなら何通りか。\n(3) (1)の列で、左端が1である確率を求めよ。\n(4) (2)の選び方で、1が選ばれている確率を求めよ。",
    answer: "(1) 360通り、(2) 15通り、(3) 1/6、(4) 2/3。",
    points: 16,
    mistakeTags: ["公式選択ミス", "問題文の読み違い"],
  },
  {
    id: "probability-example-3-tabs",
    type: "explanationTabs",
    tabs: [
      {
        label: "方針",
        body:
          "列を作るなら順序ありなので順列、選ぶだけなら順序なしなので組合せです。同じ数字集合でも、列と集合では全事象が変わります。",
      },
      {
        label: "詳しい解説",
        body:
          "(1) 左から順に4個並べるので 6P4=6×5×4×3=360 通り。\n\n(2) 選ぶだけなら 6C4=15 通り。\n\n(3) 左端を1に固定し、残り3桁を残り5個から順に並べるので 5P3=60 通り。よって60/360=1/6。\n\n(4) 1を含む4個の選び方は、残り3個を2から6の5個から選ぶので 5C3=10 通り。よって10/15=2/3 です。",
      },
      {
        label: "別解",
        body:
          "(3)は対称性で、左端に来る数字は1から6まで同様に確からしいので1/6。(4)は6個から4個を選ぶとき、各数字が選ばれる割合は4/6なので2/3。計算前に対称性を見られると速くなります。",
      },
      {
        label: "最速解法",
        body:
          "「列」「辞書式順序」「何番目」は順序あり、「集合」「選ぶだけ」「含まれる」は順序なしです。第1回模試の辞書式順序は、列の世界で数えると判断します。",
      },
      {
        label: "よくあるミス",
        body:
          "列なのに6C4で分母を15にする、選ぶだけなのに360を分母にする、左端が1と1を含むを同じ事象にする、が頻出です。",
      },
      {
        label: "類題",
        body:
          "辞書式順序、数字列の条件付き確率、並べた後に条件を追加する問題へ接続します。この問題で学ぶのは、公式暗記ではなく日本語から分母を選ぶことです。",
      },
    ],
  },
  {
    id: "probability-advanced-connection",
    type: "callout",
    tone: "info",
    title: "発展への接続",
    text:
      "条件付き確率の分母更新は、検査の陽性率、ベイズの公式、期待値、確率漸化式にもつながります。順列・組合せの判別は、二項定理、反復試行、数学Bの確率分布の土台です。",
  },
  {
    id: "probability-core-recovery",
    type: "mistakeRecovery",
    title: "模試第4問からの戻り先",
    intro:
      "第1回・第2回の冊子型模試でどこを落としたかに合わせて、この講義内の戻る場所を決めます。",
    items: [
      { symptom: "第1回第4問で辞書式順序や列の総数を誤った", action: "順序あり・順序なしの代表例題へ戻る", href: "#probability-example-3" },
      { symptom: "第1回第4問で条件付き確率や場合分けを誤った", action: "確率の読解手順と条件付き確率へ戻る", href: "#probability-reading-procedure" },
      { symptom: "第2回第4問で6席に4人が座る条件付き確率を誤った", action: "席に座る条件付き確率の代表例題へ戻る", href: "#probability-example-1" },
      { symptom: "少なくとも・または・でない条件を取り違えた", action: "余事象と包除の代表例題へ戻る", href: "#probability-example-2" },
      { symptom: "分母を最後まで全体のままにした", action: "条件付き確率は分母が変わる、を読み直す", href: "#probability-conditional-core-heading" },
    ],
  },
  {
    id: "probability-core-related",
    type: "relatedProblems",
    title: "復習先と確認問題",
    items: [
      {
        title: "共通テスト型本番模試 数学I・A 第1回 第4問",
        href: "/common-test/simulator/common-test-math-1a-manual-001",
        note: "辞書式順序、条件付き確率、複数選択の復習。",
      },
      {
        title: "共通テスト型本番模試 数学I・A 第2回 第4問",
        href: "/common-test/simulator/common-test-math-1a-manual-002",
        note: "6席に4人が座る条件付き確率の復習。",
      },
      {
        title: "通常コース 場合の数と確率",
        href: "/courses/math-1a/counting-probability",
        note: "基礎から順列・組合せ・余事象を戻って確認する。",
      },
      {
        title: "共通テスト 数学IA 対策",
        href: "/common-test/math-1a",
        note: "冊子型模試と技能分解ドリルの入口。",
      },
    ],
  },
];

// ── 確率：余事象・包除・条件付き・独立排反の満点ブロック ───────────────────
const probabilityConditionalBlocks: LectureBlock[] = [
  {
    id: "probability-conditional-callout",
    type: "callout",
    tone: "info",
    title: "満点仕上げ：確率は数える前に道具を決める",
    text:
      "確率の事故は、数え始めてから道具を変えることで起きます。順番を区別するか、少なくとも・ちょうど・すべて・どれもないのどれか、条件が付いた後か、独立か排反かを先に判別し、表や樹形図で母集団を固定してから数えます。",
  },
  {
    id: "probability-conditional-flow",
    type: "solutionFlow",
    title: "余事象・包除・条件付き・独立排反の判別フロー",
    intro:
      "問題文の言い方から、どの道具を使うかを先に決めます。語に反応できると、数え方がぶれません。",
    steps: [
      {
        condition: "「少なくとも1つ」「すべてではない」「どれも〜ない」",
        tool: "余事象",
        reason: "反対側（1つも〜ない）を数えて $1-$ で引くほうが速いことが多い。",
      },
      {
        condition: "「AまたはB」で、AとBが同時に起こりうる",
        tool: "包除（重複を引く）",
        reason: "$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$。重なりを一度引く。",
      },
      {
        condition: "「AまたはB」で、同時には起こらないと明記",
        tool: "排反（そのまま足す）",
        reason: "排反なら $P(A\\cap B)=0$ なので単純に和でよい。",
      },
      {
        condition: "「Aが起きたと分かったとき、Bの確率」",
        tool: "条件付き確率（母集団を更新）",
        reason: "分母をAが起きた世界に絞る。$P(B\\mid A)=\\dfrac{P(A\\cap B)}{P(A)}$。",
      },
      {
        condition: "片方が起きても、もう片方の確率が変わらない",
        tool: "独立（積を取る）",
        reason: "$P(A\\cap B)=P(A)P(B)$。戻す抽出や別々のサイコロなど。",
      },
      {
        condition: "戻さない抽出・段階で中身が変わる",
        tool: "母集団の変化を追う（表・樹形図）",
        reason: "2回目以降は分母と中身が変わる。独立として扱わない。",
      },
      {
        condition: "同じ条件の試行を繰り返し、成功回数を指定",
        tool: "反復試行",
        reason: "$\\binom{n}{k}p^k(1-p)^{n-k}$。成功回数の選び方×成功×失敗。",
      },
    ],
  },
  {
    id: "probability-conditional-drill",
    type: "discriminationDrill",
    title: "余事象・包除・条件付き・独立排反の判別ドリル",
    intro:
      "計算はしません。問題文の言い方から、余事象・包除・条件付き・独立排反のどれを使うかを即決します。",
    items: [
      {
        condition: "3個のサイコロを投げ、少なくとも1個が6である確率を求める。",
        goal: "確率",
        choices: ["余事象（1個も6でない）", "包除", "条件付き"],
        answer: "余事象（1個も6でない）",
        reason: "「少なくとも」は反対側（1個も6でない）を引くのが速い。",
      },
      {
        condition: "「AまたはB」で、AとBが同時に起こりうる。和の確率。",
        goal: "和の確率",
        choices: ["包除で重複を引く", "そのまま足す", "余事象だけ"],
        answer: "包除で重複を引く",
        reason: "$P(A)+P(B)-P(A\\cap B)$。重なりを一度引く。",
      },
      {
        condition: "「AまたはB」で、同時には起こらないと明記されている。",
        goal: "和の確率",
        choices: ["排反（そのまま足す）", "包除で重複を引く", "独立で掛ける"],
        answer: "排反（そのまま足す）",
        reason: "排反なら重複が0なので単純に足す。",
      },
      {
        condition: "3つの条件のうち少なくとも1つを満たす個数を数える。",
        goal: "個数",
        choices: ["包除原理（足して引いて足す）", "余事象1回だけ", "順列"],
        answer: "包除原理（足して引いて足す）",
        reason: "3条件は、足す→2重を引く→3重を足す。",
      },
      {
        condition: "「Bと分かったとき、Aである確率」を求める。",
        goal: "条件付き確率",
        choices: ["Bを母集団にして数え直す", "全体を分母にする", "独立として掛ける"],
        answer: "Bを母集団にして数え直す",
        reason: "条件付きは分母をBが起きた世界に更新する。",
      },
      {
        condition: "$P(A\\mid B)$ と $P(B\\mid A)$ は一般に同じか？",
        goal: "判断",
        choices: ["一般に異なる", "常に同じ", "常に積で等しい"],
        answer: "一般に異なる",
        reason: "分母（条件）が違うので別物。混同が典型のミス。",
      },
      {
        condition: "コインを2回投げる。1回目と2回目の結果の関係。",
        goal: "関係",
        choices: ["独立（積を取る）", "排反", "母集団が変わる"],
        answer: "独立（積を取る）",
        reason: "毎回条件が同じで互いに影響しない。",
      },
      {
        condition: "袋から戻さずに2個取る。1回目と2回目の関係。",
        goal: "関係",
        choices: ["母集団が変わる（独立でない）", "独立", "排反"],
        answer: "母集団が変わる（独立でない）",
        reason: "戻さないので2回目の分母と中身が変わる。",
      },
      {
        condition: "同じ事象について、独立かつ排反になるのはどんなとき？",
        goal: "判断",
        choices: ["どちらかの確率が0のときだけ", "いつでも両立する", "確率が等しいとき"],
        answer: "どちらかの確率が0のときだけ",
        reason: "独立 $P(A)P(B)=P(A\\cap B)$ と排反 $P(A\\cap B)=0$ は普通両立しない。",
      },
      {
        condition: "成功率一定のゲームを5回行い、ちょうど2回成功する確率。",
        goal: "確率",
        choices: ["反復試行", "余事象", "包除"],
        answer: "反復試行",
        reason: "回数を指定した同じ試行の繰り返しは反復試行。",
      },
      {
        condition: "2つの数の組を選ぶが、逆順を二重に数えてしまいそう。",
        goal: "重複カウント防止",
        choices: ["組合せで数える", "順列で数える", "包除"],
        answer: "組合せで数える",
        reason: "順序が不要なら組合せにして重複を消す。",
      },
      {
        condition: "同じ文字を含む文字列の並べ方の総数を求める。",
        goal: "総数",
        choices: ["同じ文字の個数の階乗で割る", "そのまま階乗", "組合せだけ"],
        answer: "同じ文字の個数の階乗で割る",
        reason: "同じものを含む順列は、重複する並べ替えで割る。",
      },
      {
        condition: "会話文で表を埋め、条件ごとの人数から確率を出す。",
        goal: "長文読解",
        choices: ["表で母集団を行と列に分ける", "暗算で一気に数える", "樹形図だけ"],
        answer: "表で母集団を行と列に分ける",
        reason: "長文の確率は、条件を表に落として分母を固定する。",
      },
      {
        condition: "「少なくとも1つ」と「ちょうど1つ」は同じ数え方か？",
        goal: "判断",
        choices: ["違う（ちょうどは個数を限定）", "同じ", "余事象なら同じ"],
        answer: "違う（ちょうどは個数を限定）",
        reason: "「ちょうど1つ」は他は起きない条件付き。範囲が違う。",
      },
      {
        condition: "会話文で条件が後から1つ追加され、母集団が狭まる。",
        goal: "対応",
        choices: ["追加条件で分母を更新する", "最初の全体のまま数える", "順列で数える"],
        answer: "追加条件で分母を更新する",
        reason: "条件追加は母集団リセット。分母が変わる。",
      },
      {
        condition: "余事象の反対側が場合分けだらけで複雑になりそう。",
        goal: "判断",
        choices: ["直接数える", "必ず余事象を使う", "必ず包除を使う"],
        answer: "直接数える",
        reason: "反対側が複雑なら、素直に直接数えるほうが速い。",
      },
    ],
  },
  {
    id: "probability-conditional-problem-1",
    type: "problem",
    title: "本番形式演習：戻さない抽出と条件付き確率",
    prompt:
      "赤玉3個、白玉2個が入った袋から、戻さずに2個続けて取り出す。\n\n(1) 2個とも赤である確率を求めよ。\n(2) 1個目が赤だったとき、2個目も赤である確率（条件付き確率）を求めよ。\n(3) 少なくとも1個が赤である確率を求めよ。",
    choices: [
      "(1) $\\dfrac{3}{10}$、(2) $\\dfrac{1}{2}$、(3) $\\dfrac{9}{10}$",
      "(1) $\\dfrac{3}{5}$、(2) $\\dfrac{3}{5}$、(3) $\\dfrac{1}{10}$",
      "(1) $\\dfrac{3}{10}$、(2) $\\dfrac{3}{5}$、(3) $\\dfrac{7}{10}$",
      "(1) $\\dfrac{1}{2}$、(2) $\\dfrac{1}{2}$、(3) $\\dfrac{4}{5}$",
    ],
    answer: "(1) $\\dfrac{3}{10}$、(2) $\\dfrac{1}{2}$、(3) $\\dfrac{9}{10}$",
    points: 12,
    mistakeTags: ["条件見落とし", "問題文の読み違い", "場合分け不足"],
  },
  {
    id: "probability-conditional-problem-2",
    type: "problem",
    title: "本番形式演習：包除と独立・排反の判定",
    prompt:
      "1 から 20 までの整数から1つを等しい確率で選ぶ。事象Aを「2の倍数」、事象Bを「3の倍数」とする。\n\n(1) AまたはBである確率を求めよ。\n(2) AでもBでもない確率を求めよ。\n(3) AとBは排反か、独立か。",
    choices: [
      "(1) $\\dfrac{13}{20}$、(2) $\\dfrac{7}{20}$、(3) 排反ではなく独立",
      "(1) $\\dfrac{16}{20}$、(2) $\\dfrac{4}{20}$、(3) 排反",
      "(1) $\\dfrac{13}{20}$、(2) $\\dfrac{7}{20}$、(3) 排反",
      "(1) $\\dfrac{4}{5}$、(2) $\\dfrac{1}{5}$、(3) 独立でも排反でもない",
    ],
    answer: "(1) $\\dfrac{13}{20}$、(2) $\\dfrac{7}{20}$、(3) 排反ではなく独立",
    points: 12,
    mistakeTags: ["公式選択ミス", "条件見落とし"],
  },
  {
    id: "probability-conditional-explanation",
    type: "explanationTabs",
    tabs: [
      {
        label: "ヒント",
        body: "「少なくとも」「〜でない」は余事象。「Aと分かったとき」は分母をAに更新。「または」で同時に起こりうるなら包除で重複を引きます。",
      },
      {
        label: "方針",
        body: "順番ありなら順列、順番なしなら組合せ、少なくともは余事象、または（重複あり）は包除、条件付きは母集団更新、繰り返しは反復試行、独立は積、排反は和。",
      },
      {
        label: "詳しい解説",
        body:
          "戻さない抽出は独立ではありません（母集団が変わる）。包除は $P(A)+P(B)-P(A\\cap B)$ で重なりを引きます。条件付きは $P(B\\mid A)=\\dfrac{P(A\\cap B)}{P(A)}$ で分母がAに変わります。独立は $P(A\\cap B)=P(A)P(B)$、排反は $P(A\\cap B)=0$ で、別の概念です。",
      },
      {
        label: "最速解法",
        body: "文中の語に反応します。「少なくとも」＝余事象、「のうち／と分かったとき」＝条件付き、「または」＝包除、「それぞれ独立に」＝積です。",
      },
      {
        label: "よくあるミス",
        body: "条件付きで全体を分母にする、包除で重複を引き忘れる、独立と排反を混同する、戻さないのに独立扱いにする、の4つが頻出です。",
      },
      {
        label: "類題",
        body: "検査表の条件付き確率、3条件の包除、戻さない抽出の連続、反復試行とちょうど k 回成功の比較に進みます。",
      },
    ],
  },
  {
    id: "probability-conditional-recovery",
    type: "mistakeRecovery",
    title: "条件付き・包除・独立排反のミス回収",
    intro: "どの数え方でつまずいたかに合わせて、戻る場所を変えます。",
    items: [
      { symptom: "順列と組合せを取り違えた", action: "解法判別フローへ戻る", href: "#probability-flow" },
      { symptom: "余事象を使うべき場面で直接数えた", action: "余事象の判断へ戻る", href: "#probability-complement-callout" },
      { symptom: "包除で重複分を引き忘れた", action: "包除の判別フローへ戻る", href: "#probability-conditional-flow" },
      { symptom: "条件付き確率で分母をリセットしなかった", action: "条件付きの判別フローへ戻る", href: "#probability-conditional-flow" },
      { symptom: "独立と排反を混同した", action: "判別ドリルで独立・排反を確認する", href: "#probability-conditional-drill" },
      { symptom: "会話文の条件を読み落とした", action: "状態整理表で母集団を分け直す", href: "#probability-counting-figure" },
    ],
  },
];

const lectureEnhancements: Record<string, LectureEnhancement> = {
  "geometry-measurement-intensive": {
    reviewedGaps: [
      "既存は三角比の公式選択が中心で、測量・空間図形・方べき接続の判別量が不足していた。",
      "本番形式演習が2題で、円周角や補角を使って三角比へ接続する誘導が少なかった。",
      "ミス回収が大分類中心で、辺と角の対応、半周長、測量の図示まで戻り先が分かれていなかった。",
    ],
    blocks: [
      {
        id: "geometry-measurement-review-callout",
        type: "callout",
        tone: "success",
        title: "満点仕上げ：図形と計量で最後に見る順番",
        text:
          "辺と角の対応、面積からsinへの逆算、外接円R、内接円r、補角・円周角、測量、空間断面、図形の性質との融合までを、判別ドリルと本番形式演習で確認します。",
      },
      ...geometryMeasurementCoreTextbookBlocks,
      ...geometryMeasurementCenterAltitudeBlocks,
      geometryMeasurementDrill,
      ...finalProblemBlocks["geometry-measurement-intensive"],
      ...finalExplanationBlocks["geometry-measurement-intensive"],
      finalRecoveryBlocks["geometry-measurement-intensive"],
    ],
  },
  "geometry-properties-auxiliary-lines": {
    reviewedGaps: [
      "既存は補助線発見の流れはあるが、接弦定理・トレミー・比から定理を選ぶ反復量が不足していた。",
      "本番形式演習が1題で、チェバとメネラウスの切り替え、円から計量への融合が足りなかった。",
      "ミス回収が図形の見落とし中心で、接線・方べき・相似補助線の戻り先が粗かった。",
      "中核講義テンプレート適用（2026-07-02）: 定理一覧、判別フロー、接線の長さの相等、方べき3形態、",
      "球の断面への接続、代表例題3題（接線と方べき／内接四角形と接弦定理／チェバ・メネラウス・面積比）、",
      "各例題の別解、共通テスト型の注意点、冊子型模試 第1回・第2回 第3問からの復習導線を追加した。",
    ],
    blocks: [
      {
        id: "geometry-properties-review-callout",
        type: "callout",
        tone: "success",
        title: "満点仕上げ：比・円・補助線の定理選択",
        text:
          "内部で交わるならチェバ、一直線ならメネラウス、接線なら接弦定理か方べき、内接四角形なら円周角・補角・トレミーを候補にします。",
      },
      ...geometryPropertiesCoreTextbookBlocks,
      ...geometryPropertiesCentersBlocks,
      geometryPropertiesDrill,
      ...finalProblemBlocks["geometry-properties-auxiliary-lines"],
      ...finalExplanationBlocks["geometry-properties-auxiliary-lines"],
      finalRecoveryBlocks["geometry-properties-auxiliary-lines"],
    ],
  },
  "quadratic-case-split-intensive": {
    reviewedGaps: [
      "既存は軸と場合分けの説明はあるが、文字定数つき最大最小と場合分け境界の反復量が不足していた。",
      "軸と定義域の完全判別フロー、境界ドリル15問、文字定数の本番形式演習を追加した。",
      "判別式と区間内共有点の判別、最大最小の取り違えへの戻り先を細分化した。",
    ],
    blocks: [
      {
        id: "quadratic-review-callout",
        type: "callout",
        tone: "success",
        title: "満点仕上げ：軸・端点・判別式を同じ図に置く",
        text:
          "平方完成で軸、定義域で区間、最大値は端点比較、共有点は判別式に加えて軸と端点の符号を確認します。",
      },
      ...quadraticCoreTextbookBlocks,
      ...quadraticCaseSplitBlocks,
      quadraticDrill,
      ...finalProblemBlocks["quadratic-case-split-intensive"],
      ...finalExplanationBlocks["quadratic-case-split-intensive"],
      finalRecoveryBlocks["quadratic-case-split-intensive"],
    ],
  },
  "probability-guided-reading": {
    reviewedGaps: [
      "既存は順列・組合せ・余事象の判別はあるが、包除・条件付き・独立排反の判別と反復量が不足していた。",
      "余事象・包除・条件付き・独立排反の判別フロー、判別ドリル15問、本番形式演習2題を追加した。",
      "分母更新・戻さない抽出・独立排反の混同・重複カウントへの戻り先を細分化した。",
    ],
    blocks: [
      {
        id: "probability-review-callout",
        type: "callout",
        tone: "success",
        title: "満点仕上げ：確率は分母を決めてから数える",
        text:
          "順番を区別するか、少なくともか、条件が付いた後か、同じ試行の繰り返しかを読み、表や樹形図で母集団を固定してから計算します。",
      },
      ...probabilityCoreGuidedReadingBlocks,
      ...probabilityConditionalBlocks,
      probabilityDrill,
      ...finalProblemBlocks["probability-guided-reading"],
      ...finalExplanationBlocks["probability-guided-reading"],
      finalRecoveryBlocks["probability-guided-reading"],
    ],
  },
};

export function getLectureReviewGaps(slug: string): string[] {
  return lectureEnhancements[slug]?.reviewedGaps ?? [];
}

export function enhanceSpecialLectures(lectures: Lecture[]): Lecture[] {
  return lectures.map((lecture) => {
    const enhancement = lectureEnhancements[lecture.slug];
    if (!enhancement) return lecture;
    return {
      ...lecture,
      recommendedMinutes: lecture.recommendedMinutes + 20,
      tags: Array.from(new Set([...lecture.tags, "満点仕上げ", "判別ドリル", "本番形式演習"])),
      blocks: [...lecture.blocks, ...enhancement.blocks],
    };
  });
}
