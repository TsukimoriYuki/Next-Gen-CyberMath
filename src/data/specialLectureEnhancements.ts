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
