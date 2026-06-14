import type { ExamSet } from "../exam-sets";

export const STANDARD_PRIVATE_MATH_1A_001: ExamSet = {
  id: "standard-private-math-1a-001",
  categoryId: "standard-private",
  subjectId: "math-1a",
  subjectTitle: "数学I・A",
  roundTitle: "第1回",
  title: "中堅私立模試 数学I・A 第1回",
  description:
    "産近甲龍・日東駒専レベルを想定した難化回です。基本事項を使いながら、場合分け、数え上げ、図形公式の選択までを一気通貫で確認します。",
  targetLevel: "産近甲龍・日東駒専レベルの難化回",
  durationMin: 60,
  totalScore: 100,
  expectedAverage: "35〜40点",
  format: "全問穴埋め・選択肢なし・式入力なし",
  problemCount: 18,
  status: "available",
  sections: [
    {
      id: "section-1",
      title: "第1問 小問集合",
      points: 25,
      description: "場合の数、集合、データの分析、整数の合同条件を確認する。",
      problems: [
        {
          id: "s1-1",
          title: "(1) 4桁の整数",
          body: [
            "0, 1, 2, 3, 4, 5 の6個の数字から異なる4個を選び、並べて4桁の整数を作る。ただし、千の位に0は使えない。",
            "作ることができる4桁の整数は [ア] 個。そのうち4の倍数であるものは [イ] 個。そのうち12の倍数であるものは [ウ] 個。",
            "作った整数が4の倍数であると分かっているとき、それが12の倍数である条件付き確率は [エ]/[オ]。",
          ],
          blanks: [
            { label: "ア", answer: "300", points: 3 },
            { label: "イ", answer: "72", points: 3 },
            { label: "ウ", answer: "22", points: 3 },
            { label: "エ", answer: "11", points: 2 },
            { label: "オ", answer: "36", points: 2 },
          ],
          explanation:
            "全体は千の位が5通り、残り3桁が5P3通りなので300個。4の倍数は下2桁だけで判定し、使った2桁を除いた残りから千の位を0以外で選ぶ。列挙すると72個。12の倍数は4の倍数かつ各桁の和が3の倍数なので22個。条件付き確率の分母は4の倍数である72個、分子は12の倍数である22個だから、22/72=11/36。",
        },
        {
          id: "s1-2",
          title: "(2) 3つの集合",
          body: [
            "50人の生徒について、A, B, C をそれぞれ英語・数学・理科が得意な生徒の集合とする。",
            "n(A)=31, n(B)=28, n(C)=25, n(A∩B)=18, n(B∩C)=15, n(C∩A)=14, n(A∪B∪C)=43 とする。",
            "このとき、n(A∩B∩C)=[カ]。3科目のうち、ちょうど1科目だけ得意な生徒は [キ] 人。",
          ],
          blanks: [
            { label: "カ", answer: "6", points: 2 },
            { label: "キ", answer: "8", points: 3 },
          ],
          explanation:
            "包除原理より43=31+28+25-18-15-14+n(A∩B∩C) なので、n(A∩B∩C)=6。ちょうど1科目だけ得意な人数は、Aだけが31-18-14+6=5、Bだけが28-18-15+6=1、Cだけが25-15-14+6=2。合計して8人。",
        },
        {
          id: "s1-3",
          title: "(3) 平均と分散",
          body: [
            "6個のデータ 4, 6, 10, a, b, 18 の平均が10、分散が25であり、a<b とする。",
            "このとき、a=[ク], b=[ケ]。",
          ],
          blanks: [
            { label: "ク", answer: "7", points: 3 },
            { label: "ケ", answer: "15", points: 2 },
          ],
          explanation:
            "平均が10なので合計は60、よって a+b=22。分散25より、平均10からの偏差平方和は25×6=150。既知の値の偏差平方和は36+16+0+64=116だから、(a-10)^2+(b-10)^2=34。a+b=22 と合わせると a, b は7, 15。a<b より a=7, b=15。",
        },
        {
          id: "s1-4",
          title: "(4) 合同条件",
          body: [
            "1以上200以下の整数 n のうち、n を6で割ると1余り、かつ n を10で割ると7余るものは [コ] 個ある。",
          ],
          blanks: [{ label: "コ", answer: "6", points: 2 }],
          explanation:
            "条件は n≡1 mod 6, n≡7 mod 10。10で割って7余る数は 7,17,27,...。このうち6で割って1余るものを調べると、37から30周期で現れる。1以上200以下では 37,67,97,127,157,187 の6個。",
        },
      ],
    },
    {
      id: "section-2",
      title: "第2問 二次関数",
      points: 35,
      description: "動く区間と頂点の位置関係、最大値・最小値の差を扱う。",
      problems: [
        {
          id: "s2-1",
          title: "(1) 平方完成",
          body: [
            "関数 f(x)=x^2-4x+1 を、区間 a≤x≤a+2 で考える。",
            "平方完成すると、f(x)=(x-[サ])^2-[シ]。",
          ],
          blanks: [
            { label: "サ", answer: "2", points: 2 },
            { label: "シ", answer: "3", points: 2 },
          ],
          explanation:
            "x^2-4x+1=(x-2)^2-4+1=(x-2)^2-3。頂点は x=2、最小値の基準は -3 になる。",
        },
        {
          id: "s2-2",
          title: "(2) 最小値",
          body: [
            "区間 a≤x≤a+2 における最小値を m(a) とする。",
            "a<[ス] のとき、m(a)=a^2-[セ]。",
            "[ス]≤a≤[ソ] のとき、m(a)=-[タ]。",
            "a>[ソ] のとき、m(a)=a^2-[チ]a+[ツ]。",
          ],
          blanks: [
            { label: "ス", answer: "0", points: 2 },
            { label: "セ", answer: "3", points: 1 },
            { label: "ソ", answer: "2", points: 2 },
            { label: "タ", answer: "3", points: 1 },
            { label: "チ", answer: "4", points: 2 },
            { label: "ツ", answer: "1", points: 1 },
          ],
          explanation:
            "頂点 x=2 が区間 [a,a+2] に入るのは 0≤a≤2。このとき最小値は -3。a<0 なら頂点は右外で、右端 a+2 が最小となり f(a+2)=a^2-3。a>2 なら頂点は左外で、左端 a が最小となり f(a)=a^2-4a+1。",
        },
        {
          id: "s2-3",
          title: "(3) 最大値",
          body: [
            "区間 a≤x≤a+2 における最大値を M(a) とする。",
            "a<[テ] のとき、M(a)=a^2-[ト]a+[ナ]。",
            "a≥[テ] のとき、M(a)=a^2-[ニ]。",
          ],
          blanks: [
            { label: "テ", answer: "1", points: 2 },
            { label: "ト", answer: "4", points: 1 },
            { label: "ナ", answer: "1", points: 2 },
            { label: "ニ", answer: "3", points: 2 },
          ],
          explanation:
            "上に開く放物線なので、最大値は端点比較で決まる。左端は f(a)=a^2-4a+1、右端は f(a+2)=a^2-3。差は f(a)-f(a+2)=4-4a なので、a<1 では左端、a≥1 では右端が最大。",
        },
        {
          id: "s2-4",
          title: "(4) 最大値と最小値の差",
          body: [
            "M(a)-m(a)=9 となる a の値は、小さい順に -[ヌ]/[ネ], [ノ]/[ハ]。",
          ],
          blanks: [
            { label: "ヌ", answer: "5", points: 2 },
            { label: "ネ", answer: "4", points: 1 },
            { label: "ノ", answer: "13", points: 2 },
            { label: "ハ", answer: "4", points: 1 },
          ],
          explanation:
            "a<0 では M-m=(a^2-4a+1)-(a^2-3)=-4a+4。これが9なので a=-5/4。a>2 では M-m=(a^2-3)-(a^2-4a+1)=4a-4。これが9なので a=13/4。中央の範囲では条件を満たさない。",
        },
        {
          id: "s2-5",
          title: "(5) 解をちょうど1つ含む区間",
          body: [
            "方程式 f(x)=0 が区間 a≤x≤a+2 にちょうど1つの解をもつような a の範囲は、",
            "-√[ヒ]≤a≤[フ]-√[ヘ] または √[ホ]≤a≤[マ]+√[ミ] である。",
          ],
          blanks: [
            { label: "ヒ", answer: "3", points: 2 },
            { label: "フ", answer: "2", points: 1 },
            { label: "ヘ", answer: "3", points: 2 },
            { label: "ホ", answer: "3", points: 1 },
            { label: "マ", answer: "2", points: 2 },
            { label: "ミ", answer: "3", points: 1 },
          ],
          explanation:
            "f(x)=0 の解は x=2±√3。区間の長さは2で、2つの解の間隔は2√3なので同時には入らない。下側の解 2-√3 が [a,a+2] に入る条件は -√3≤a≤2-√3。上側の解 2+√3 が入る条件は √3≤a≤2+√3。",
        },
      ],
    },
    {
      id: "section-3",
      title: "第3問 図形と計量",
      points: 20,
      description: "三角形の辺の長さから、角、面積、外接円、内接円、角の二等分線を求める。",
      problems: [
        {
          id: "s3-1",
          title: "(1) cos A と sin A",
          body: [
            "三角形ABCにおいて、AB=5, AC=7, BC=8 とする。角Aの二等分線と辺BCの交点をDとする。",
            "cos A=[ム]/[メ], sin A=[モ]√[ヤ]/[ユ]。",
          ],
          blanks: [
            { label: "ム", answer: "1", points: 2 },
            { label: "メ", answer: "7", points: 2 },
            { label: "モ", answer: "4", points: 2 },
            { label: "ヤ", answer: "3", points: 1 },
            { label: "ユ", answer: "7", points: 1 },
          ],
          explanation:
            "余弦定理より cos A=(AB^2+AC^2-BC^2)/(2・AB・AC)=(25+49-64)/70=1/7。sin A は正なので、sin A=√(1-1/49)=√48/7=4√3/7。",
        },
        {
          id: "s3-2",
          title: "(2) 面積",
          body: ["三角形ABCの面積をSとすると、S=[ヨ]√[ラ]。"],
          blanks: [
            { label: "ヨ", answer: "10", points: 2 },
            { label: "ラ", answer: "3", points: 1 },
          ],
          explanation:
            "面積は S=(1/2)・AB・AC・sin A。よって S=(1/2)・5・7・4√3/7=10√3。",
        },
        {
          id: "s3-3",
          title: "(3) 外接円の半径",
          body: ["外接円の半径Rは、R=[リ]√[ル]/[レ]。"],
          blanks: [
            { label: "リ", answer: "7", points: 2 },
            { label: "ル", answer: "3", points: 1 },
            { label: "レ", answer: "3", points: 1 },
          ],
          explanation:
            "外接円の半径は R=abc/(4S)。a=8, b=7, c=5, S=10√3 より R=280/(40√3)=7/√3=7√3/3。",
        },
        {
          id: "s3-4",
          title: "(4) 内接円の半径",
          body: ["内接円の半径rは、r=√[ロ]。"],
          blanks: [{ label: "ロ", answer: "3", points: 1 }],
          explanation:
            "半周長は (5+7+8)/2=10。面積 S=rs より、r=S/s=10√3/10=√3。",
        },
        {
          id: "s3-5",
          title: "(5) 角の二等分線",
          body: ["角Aの二等分線ADの長さは、AD=[ワ]√[ヲ]/[ン]。"],
          blanks: [
            { label: "ワ", answer: "5", points: 2 },
            { label: "ヲ", answer: "7", points: 1 },
            { label: "ン", answer: "3", points: 1 },
          ],
          explanation:
            "角Aの二等分線の長さは AD^2=AB・AC{1-(BC/(AB+AC))^2}。よって AD^2=35{1-(8/12)^2}=35・5/9=175/9。したがって AD=5√7/3。",
        },
      ],
    },
    {
      id: "section-4",
      title: "第4問 場合の数と確率",
      points: 20,
      description: "5桁整数を作り、8の倍数・24の倍数を下3桁と桁和で判定する。",
      problems: [
        {
          id: "s4-1",
          title: "(1) 全体の個数",
          body: [
            "0, 1, 2, 3, 4, 5, 6 の7個の数字から異なる5個を選び、並べて5桁の整数を作る。ただし、万の位に0は使えない。",
            "作ることができる5桁の整数は全部で [アア] 個。",
          ],
          blanks: [{ label: "アア", answer: "2160", points: 4 }],
          explanation:
            "万の位は0以外の6通り。残り4桁は残った6個から順に選ぶので 6P4=360通り。全体は6×360=2160個。",
        },
        {
          id: "s4-2",
          title: "(2) 8の倍数",
          body: ["8の倍数であるものは [イイ] 個。"],
          blanks: [{ label: "イイ", answer: "318", points: 4 }],
          explanation:
            "8の倍数は下3桁で判定する。0を含む下3桁も許されるが、同じ数字は使えない。下3桁を固定したあと、残りの数字から万の位を0以外で選び、千の位を選ぶ。0が残るかどうかで数え方が変わるため、下3桁ごとに残り2桁の作り方を丁寧に数えると318個。",
        },
        {
          id: "s4-3",
          title: "(3) 24の倍数",
          body: ["24の倍数であるものは [ウウ] 個。"],
          blanks: [{ label: "ウウ", answer: "104", points: 4 }],
          explanation:
            "24の倍数は8の倍数かつ3の倍数。したがって下3桁が8の倍数で、さらに5桁全体の各桁の和が3の倍数になるものを数える。0を含む場合も、万の位に0を置けないことに注意して数えると104個。",
        },
        {
          id: "s4-4",
          title: "(4) 条件付き確率",
          body: [
            "作った整数が8の倍数であると分かっているとき、それが24の倍数である条件付き確率は [エエ]/[オオ]。",
          ],
          blanks: [
            { label: "エエ", answer: "52", points: 4 },
            { label: "オオ", answer: "159", points: 4 },
          ],
          explanation:
            "条件付き確率の分母は8の倍数である318個、分子は24の倍数である104個。104/318 を約分して 52/159。",
        },
      ],
    },
  ],
};
