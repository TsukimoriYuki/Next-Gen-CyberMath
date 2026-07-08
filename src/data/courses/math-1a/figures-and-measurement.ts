import type { CourseLesson, CourseUnit } from "@/types/course";

const FIGURES_MEASUREMENT_BEGINNER: CourseLesson[] = [
{
lessonId: "geometry-measurement-learning-map",
lessonTitle: "図形と計量：問題タイプ別ロードマップ",
lessonDescription: "図形と計量を「公式暗記」ではなく「図形情報の翻訳と定理選択」の単元として整理し、目的別・苦手別に読む順番を決める。",
level: "beginner",
estimatedMinutes: 20,
prerequisites: [],
goals: [
"図形と計量が、図形情報を翻訳し定理を選ぶ単元だと理解できる",
"初学者・共通テスト・私大国公立で読む順番を選べる",
"今の失点原因から戻る講座を自分で決められる",
"単元全体の判断順を言葉にできる",
],
lessonBlocks: [
{
kind: "strategy",
title: "図形と計量の学習地図：公式暗記ではなく「翻訳」と「定理選択」で選ぶ",
body: "図形と計量は、三角比・正弦定理・余弦定理・面積公式を覚えるだけの単元ではありません。問題文と図を見た瞬間に、**何を求めたいか（辺・角・面積・高さ・半径）**と**何が分かっているか（2辺と間の角・辺と向かいの角・3辺・外接円半径…）**を分け、どの定理なら一番少ない情報で目的量に届くかを選ぶ単元です。\n\nこの単元の勝ち筋は、基礎で「三角比の意味・鈍角・相互関係・面積」を固め、その後に完全攻略講座で「定理選択・面積公式・鈍角とSSA・図形情報の翻訳」の判断を身につけることです。迷ったら、今の失点原因がどの型に近いかで戻る講座を決めます。",
emphasis: "図形と計量は、図形情報を辺・角・高さ・面積・半径へ翻訳し、最小の情報で目的量に届く定理を選ぶ単元。",
},
{
kind: "comparisonTable",
title: "目的別ルート：どの順で読むか",
body: "同じ図形と計量でも、目的によって読む順番を変えると迷いにくくなります。",
columns: ["ルート", "読む順番", "狙い"],
rows: [
{ cells: ["初学者", "三角比とは何か → 特別な角 → 鈍角の三角比と相互関係 → 三角形の面積と三角比", "辺と角の対応・高さを作る発想を崩さない"], highlight: true },
{ cells: ["共通テスト対策", "正弦定理と余弦定理 → 定理選択完全攻略 → 面積公式完全攻略 → 図形と計量の典型処理 → 総合演習", "誘導文の中で、どの道具を使うかを選ぶ"] },
{ cells: ["私大・国公立標準", "余弦定理・正弦定理 → 面積・内接円・外接円 → 鈍角・存在条件・SSA完全攻略 → 図形情報整理・翻訳完全攻略 → 融合問題", "角の候補・存在条件・複合図形まで詰める"], highlight: true },
{ cells: ["総合演習", "定理選択完全攻略 → 面積公式完全攻略 → 図形と計量の融合問題", "複数の道具を切り替える"] },
],
},
{
kind: "comparisonTable",
title: "苦手別：戻るべき完全攻略講座",
body: "模試や演習で崩れたら、間違えた問題の見た目ではなく、崩れた判断で戻り先を選びます。",
columns: ["症状", "戻る講座", "確認すること"],
rows: [
{ cells: ["sin / cos / tan の使い分けが苦手", "三角比とは何か", "対辺・隣辺・斜辺の対応、角の位置"], highlight: true },
{ cells: ["正弦定理と余弦定理の選択で迷う", "定理選択完全攻略", "求めたい量、情報の形、対応ペア"] },
{ cells: ["面積公式の使い分けが苦手", "面積公式完全攻略", "挟角、分割、同じ高さ・同じ底辺、r と R"] },
{ cells: ["sin だけで角を決めて事故る／鈍角判定", "鈍角・存在条件・SSA完全攻略", "cosの符号、最大辺、高さ h との比較、成立条件"], highlight: true },
{ cells: ["図から式にできない／情報が散らかる", "図形情報整理・翻訳完全攻略", "既知量の分類、同じ量を2通りで表す、補助線の目的"] },
{ cells: ["共通テストの図形問題が読めない／融合で止まる", "図形と計量の融合問題", "誘導の読み方、情報のリレー、別解比較"], highlight: true },
],
},
{
kind: "checkpoint",
title: "単元全体の最後の判断順",
body: "図形と計量の問題を見たら、次の順に確認します。\n\n1. 求めたい量は、辺・角・面積・高さ・外接円半径・内接円半径のどれか。\n2. 分かっている情報を、2辺と間の角・辺と向かいの角・3辺・外接円半径・面積…に分類する。\n3. 辺と向かいの角のペアがあれば正弦定理、2辺と間の角なら余弦定理・面積公式、3辺なら余弦定理で角。\n4. 面積は、底辺と高さ・$\\frac12ab\\sin C$・$S=rs$・$S=\\frac{abc}{4R}$ のどれが条件に合うか。\n5. 角を $\\sin$ から出したら、鋭角か鈍角かを $\\cos$ の符号・最大辺・図形条件で確認する。\n6. 長さは正、面積は非負、$|b-c|<a<b+c$ など存在条件を最後に検算する。",
emphasis: "図形と計量の仕上げは、公式を思い出すことではなく、図の見た目に頼らず条件から量を確定させること。",
},
],
checkQuestions: [
{
question: "図形と計量で、辺とその向かいの角のペアが見えているとき、まず候補にする定理は何か。",
answer: "正弦定理。$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R$ の対応を使う。",
hint: "辺と向かいの角がセットで見えているかを見る。",
},
{
question: "$\\sin\\theta$ の値だけでは角 $\\theta$ が1つに決まらないことがあるのはなぜか。",
answer: "$0^\\circ<\\theta<180^\\circ$ では $\\sin\\theta=\\sin(180^\\circ-\\theta)$ となり、鋭角と鈍角の2候補が同じ $\\sin$ の値をもつから。$\\cos$ の符号や最大辺で判定する。",
hint: "鋭角と鈍角で sin の値が一致する。",
},
{
question: "面積を求めたいが高さが見えず、2辺とその間の角が分かっているとき使う公式は。",
answer: "$S=\\frac12ab\\sin C$（$C$ は2辺 $a,b$ にはさまれた角）。",
hint: "高さを三角比で置き換える。",
},
],
relatedPracticeLinks: [
{ label: "三角比とは何か", href: "/courses/math-1a/figures-and-measurement/trigonometric-ratios-basic", description: "対辺・隣辺・斜辺の対応から始める" },
{ label: "定理選択完全攻略", href: "/courses/math-1a/figures-and-measurement/theorem-selection-mastery", description: "正弦定理・余弦定理・面積公式の選び方" },
{ label: "面積公式完全攻略", href: "/courses/math-1a/figures-and-measurement/triangle-area-mastery", description: "挟角・分割・面積比・r と R" },
{ label: "鈍角・存在条件・SSA完全攻略", href: "/courses/math-1a/figures-and-measurement/obtuse-ssa-existence-mastery", description: "角の候補・鈍角判定・成立条件" },
{ label: "図形情報整理・翻訳完全攻略", href: "/courses/math-1a/figures-and-measurement/figure-info-translation-mastery", description: "図から式へ、式から図へ翻訳する" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a", description: "共通テスト対策" },
],
qualityTags: ["学習ロードマップ", "問題タイプ別", "目的別ルート", "苦手別ルート", "判断フロー", "単元ナビ"],
},
{
lessonId: "trigonometric-ratios-basic",
lessonTitle: "三角比とは何か",
lessonDescription: "三角比を、公式暗記ではなく「直角三角形の辺の比」として理解する。",
level: "beginner",
estimatedMinutes: 55,
prerequisites: ["直角三角形", "比の計算", "平方根の基本"],
goals: [
"三角比が直角三角形の辺の比であることを説明できる",
"sin・cos・tanがどの辺の比を表すか判断できる",
"角度が同じなら三角形の大きさが変わっても三角比が同じになることを理解できる",
"三角比を使って辺の長さを求められる",
"正弦定理・余弦定理に進むための土台を作れる",
],
lessonBlocks: [
{
kind: "intro",
title: "三角比は何を表すのか",
body: "図形と計量の最初の山が三角比です。\n\n三角比という名前を見ると、いきなり $\\sin$、$\\cos$、$\\tan$ という記号が出てきて難しく感じるかもしれません。\n\nしかし、三角比の本質はとても単純です。三角比とは、**直角三角形の辺の長さの比**です。\n\n直角三角形で、ある角に注目したとき、その角に対して「向かい側の辺」「隣の辺」「斜辺」が決まります。\n\n三角比は、それらの辺の比を表すための道具です。\n\nつまり三角比は、角度と辺の長さをつなぐ言葉です。角度が分かれば辺の比が分かり、辺の比が分かれば角度や長さを調べられるようになります。",
},
{
kind: "strategy",
title: "まずこれだけ覚える",
body: "細かい話に入る前に、三角比で本当に大切な5つを先に頭へ入れます。これが全体の地図になります。",
emphasis:
"1. $\\sin$ は 対辺 / 斜辺。　2. $\\cos$ は 隣辺 / 斜辺。　3. $\\tan$ は 対辺 / 隣辺。　4. まず角 $\\theta$ の位置を決める。　5. 対辺・隣辺・斜辺を図で確認してから式を書く。",
},
{
kind: "concept",
title: "向かい側・隣・斜辺を区別する",
body: "三角比でまず大切なのは、辺の名前を正しく見ることです。\n\n直角三角形には、必ず1つ直角があります。直角の向かい側にある一番長い辺を斜辺といいます。\n\n次に、注目している角を決めます。その角の向かい側にある辺を対辺、その角に接していて斜辺ではない辺を隣辺と考えます。\n\nここで注意が必要です。対辺や隣辺は、どの角に注目するかで変わります。\n\n同じ直角三角形でも、角Aに注目する場合と角Bに注目する場合では、向かい側の辺が入れ替わります。\n\n三角比のミスの多くは、公式を忘れることより、どの辺が対辺でどの辺が隣辺かを間違えることから起こります。",
},
{
kind: "diagram",
title: "図で見る：直角三角形と三角比",
body: "角 $\\theta$ を決めると、向かい側が対辺、となりが隣辺、直角の向かい側が斜辺と決まります。$\\sin\\theta$ は「対辺/斜辺」、$\\cos\\theta$ は「隣辺/斜辺」、$\\tan\\theta$ は「対辺/隣辺」です。",
diagramType: "right-triangle-trig",
caption:
"三角比は直角三角形の辺の比。$\\sin\\theta$ は「対辺/斜辺」、$\\cos\\theta$ は「隣辺/斜辺」、$\\tan\\theta$ は「対辺/隣辺」と読む。",
},
{
kind: "comparisonTable",
title: "sin・cos・tanの意味",
body: "三角比は、対辺・隣辺・斜辺のどれを比べるかで決まります。",
columns: ["記号", "読むもの", "意味", "式"],
rows: [
{
cells: ["$\\sin A$", "サインA", "対辺と斜辺の比", "$\\sin A=\\frac{\\text{対辺}}{\\text{斜辺}}$"],
highlight: true,
},
{
cells: ["$\\cos A$", "コサインA", "隣辺と斜辺の比", "$\\cos A=\\frac{\\text{隣辺}}{\\text{斜辺}}$"],
},
{
cells: ["$\\tan A$", "タンジェントA", "対辺と隣辺の比", "$\\tan A=\\frac{\\text{対辺}}{\\text{隣辺}}$"],
},
],
},
{
kind: "comparisonTable",
title: "問題文の読み替え表",
body: "問題文の表現を「どの辺を見るか」に翻訳できると、図から三角比を読み取るのが速くなります。",
columns: ["問題文の表現", "意味", "使う考え方"],
rows: [
{
cells: ["$\\sin\\theta$", "対辺 / 斜辺", "角θの向かい側を見る"],
highlight: true,
},
{
cells: ["$\\cos\\theta$", "隣辺 / 斜辺", "角θのとなり側を見る"],
},
{
cells: ["$\\tan\\theta$", "対辺 / 隣辺", "斜辺を使わない"],
},
{
cells: ["角θが変わる", "対辺・隣辺も変わる", "角の位置を確認"],
},
{
cells: ["長さを求める", "三角比の式を作る", "比から方程式"],
},
],
},
{
kind: "workedExample",
title: "例1：三角比を読み取る",
body: "直角三角形で、角Aに対する対辺が $3$、隣辺が $4$、斜辺が $5$ であるとします。\n\nこのとき、\n\n$\\sin A=\\frac{\\text{対辺}}{\\text{斜辺}}=\\frac{3}{5}$\n\n$\\cos A=\\frac{\\text{隣辺}}{\\text{斜辺}}=\\frac{4}{5}$\n\n$\\tan A=\\frac{\\text{対辺}}{\\text{隣辺}}=\\frac{3}{4}$\n\nです。\n\nここで大切なのは、三角比が角Aに対する辺の比で決まっていることです。三角形の大きさではなく、辺の比を見ています。",
},
{
kind: "workedExample",
title: "例2：辺の長さを求める",
body: "直角三角形で、斜辺が $10$、角Aについて $\\sin A=\\frac{3}{5}$ とします。角Aの対辺の長さを求めます。\n\n$\\sin A$ は、対辺を斜辺で割ったものです。\n\nしたがって、\n\n$\\sin A=\\frac{\\text{対辺}}{\\text{斜辺}}$\n\n$\\frac{3}{5}=\\frac{\\text{対辺}}{10}$\n\n両辺に $10$ をかけて、\n\n$\\text{対辺}=10\\times\\frac{3}{5}=6$\n\nよって、対辺の長さは $6$ です。\n\n三角比は、辺の比から実際の長さを求める道具として使えます。",
},
{
kind: "workedExample",
title: "例3・標準：注目する角が変わると対辺・隣辺はどうなるか",
body: "**問題**　直角三角形 $ABC$（直角は $C$）で、$AB=5$、$BC=3$、$CA=4$ とする。$\\sin A$ と $\\sin B$ をそれぞれ求めよ。\n\n**まず注目すること**　対辺・隣辺は「どの角を見るか」で入れ替わる。斜辺は直角の向かい側 $AB=5$ で、角が変わっても同じ。\n\n**角 $A$ のとき**　角 $A$ の向かい側（対辺）は $BC=3$。よって $\\sin A=\\dfrac{\\text{対辺}}{\\text{斜辺}}=\\dfrac{3}{5}$。\n\n**角 $B$ のとき**　角 $B$ の向かい側（対辺）は $CA=4$。よって $\\sin B=\\dfrac{\\text{対辺}}{\\text{斜辺}}=\\dfrac{4}{5}$。\n\n**ポイント**　同じ三角形でも、注目する角を変えると対辺が変わるので $\\sin$ の値も変わる。斜辺だけは直角の向かい側で固定。\n\n**答え**　$\\sin A=\\dfrac{3}{5}$、$\\sin B=\\dfrac{4}{5}$。",
},
{
kind: "concept",
title: "なぜ三角形の大きさが変わっても三角比は同じか",
body: "角度が同じ直角三角形を大きくしたり小さくしたりすると、辺の長さそのものは変わります。\n\nしかし、対応する辺の比は変わりません。\n\n例えば、$3:4:5$ の直角三角形を2倍すると、$6:8:10$ になります。\n\n辺の長さは変わっていますが、対辺と斜辺の比は、$3/5$ でも $6/10$ でも同じです。\n\nこれが、角度が決まると三角比が決まる理由です。\n\n三角比は長さそのものではなく、角度によって決まる辺の比です。",
},
{
kind: "commonMistake",
title: "よくあるミス：注目する角を変えてしまう",
body: "三角比でよくあるミスは、途中で注目する角を変えてしまうことです。\n\n例えば、角Aについて $\\sin A$ を求めるなら、角Aの向かい側が対辺です。\n\nしかし、角Bを見れば、対辺と隣辺は入れ替わります。\n\n同じ三角形でも、どの角について考えるかで $\\sin$ や $\\cos$ の値は変わります。\n\n問題で角Aについて聞かれているなら、最後まで角Aを基準にしてください。",
},
{
kind: "commonMistake",
title: "よくあるミス：sin と cos を逆にする／角θを見ずに辺を決める",
body: "**NG**　$\\sin\\theta$ を「隣辺/斜辺」、$\\cos\\theta$ を「対辺/斜辺」と取り違える。あるいは、角 $\\theta$ の位置を確認しないまま、図の上の辺を勝手に対辺だと決める。\n\n**OK**　$\\sin\\theta=\\dfrac{\\text{対辺}}{\\text{斜辺}}$（角の向かい側）、$\\cos\\theta=\\dfrac{\\text{隣辺}}{\\text{斜辺}}$（角のとなり）。先に角 $\\theta$ の位置を決め、その向かい側＝対辺、となり＝隣辺と図で確認してから式を書く。\n\n**見分け方**　「サインは角の向かい（対辺）」と覚える。迷ったら $\\theta$ の頂点に印を付け、向かい側の辺をなぞってから式にする。",
},
{
kind: "commonMistake",
title: "よくあるミス：tan に斜辺を使う／斜辺を見た目で決める",
body: "**NG**　$\\tan\\theta$ の式に斜辺を入れてしまう。また、斜辺を「一番長そうに見える辺」で決める。\n\n**OK**　$\\tan\\theta=\\dfrac{\\text{対辺}}{\\text{隣辺}}$ で **斜辺は使わない**。斜辺は必ず **直角の向かい側の辺**（結果的に一番長い辺）。見た目ではなく直角の位置から決める。\n\n**見分け方**　まず直角マークを探し、その向かい側を斜辺と確定する。$\\tan$ は「斜辺なし＝対辺と隣辺だけ」と覚える。",
},
{
kind: "checkpoint",
title: "確認：三角比の基本",
body: "角Aに対して、対辺が $5$、隣辺が $12$、斜辺が $13$ の直角三角形を考えます。\n\nこのとき、\n\n$\\sin A=\\frac{5}{13}$\n\n$\\cos A=\\frac{12}{13}$\n\n$\\tan A=\\frac{5}{12}$\n\nです。\n\n対辺・隣辺・斜辺の対応を正しく見ることが最優先です。",
},
{
kind: "summary",
title: "まとめ",
body: "- 三角比は直角三角形の辺の比\n- 斜辺は直角の向かい側の一番長い辺\n- 対辺と隣辺は、注目する角によって変わる\n- $\\sin$ は対辺と斜辺の比\n- $\\cos$ は隣辺と斜辺の比\n- $\\tan$ は対辺と隣辺の比\n- 角度が同じなら、三角形の大きさが変わっても三角比は同じ",
},
{
kind: "nextStep",
title: "次は特別な角の三角比へ",
body: "三角比の意味が分かったら、次は $30^\\circ$、$45^\\circ$、$60^\\circ$ の三角比を学びます。\n\nこれらは図形と計量の計算で何度も出てくる重要な値です。丸暗記ではなく、正三角形や直角二等辺三角形から理解します。",
},
],
checkQuestions: [
{
question: "角Aに対して、対辺が $8$、隣辺が $15$、斜辺が $17$ の直角三角形がある。$\\sin A$、$\\cos A$、$\\tan A$ を求めよ。",
answer: "$\\sin A=\\frac{8}{17}$、$\\cos A=\\frac{15}{17}$、$\\tan A=\\frac{8}{15}$。",
hint: "sinは対辺/斜辺、cosは隣辺/斜辺、tanは対辺/隣辺。",
},
{
question: "斜辺が $20$、$\\sin A=\\frac{3}{5}$ のとき、角Aの対辺の長さを求めよ。",
answer: "$\\frac{\\text{対辺}}{20}=\\frac{3}{5}$ より、対辺は $20\\times\\frac{3}{5}=12$。",
hint: "$\\sin A=\\frac{\\text{対辺}}{\\text{斜辺}}$。",
},
{
question: "$\\tan A=\\frac{7}{4}$ のとき、角Aに対する対辺と隣辺の比を答えよ。",
answer: "$\\tan A=\\frac{\\text{対辺}}{\\text{隣辺}}$ なので、対辺:隣辺は $7:4$。",
hint: "tanは対辺と隣辺の比。",
},
{
question: "直角三角形 $ABC$（直角は $C$）で、$AB=13$、$BC=5$、$CA=12$ である。$\\cos A$ と $\\cos B$ を求めよ。",
answer: "斜辺は $AB=13$。角Aの隣辺は $CA=12$ なので $\\cos A=\\frac{12}{13}$。角Bの隣辺は $BC=5$ なので $\\cos B=\\frac{5}{13}$。",
hint: "注目する角が変わると隣辺が変わる。斜辺は直角の向かい側 $AB$ で固定。",
},
],
relatedPracticeLinks: [
{ label: "三角比 基礎演習", href: "/units/figures-and-measurement", description: "基礎ドリル" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a", description: "共通テスト対策" },
],
qualityTags: ["三角比", "直角三角形", "公式の意味", "よくあるミスあり", "確認問題3問", "diagram-upgraded", "right-triangle-trig", "読み替え表あり"],
},
{
lessonId: "special-angles-trigonometry",
lessonTitle: "30度・45度・60度の三角比",
lessonDescription: "特別な角の三角比を、暗記ではなく正三角形と直角二等辺三角形から導く。",
level: "beginner",
estimatedMinutes: 60,
prerequisites: ["三角比とは何か", "平方根の基本", "三平方の定理"],
goals: [
"30度・45度・60度の三角比を求められる",
"正三角形から30度・60度の三角比を導ける",
"直角二等辺三角形から45度の三角比を導ける",
"特別な角の値を辺の比とセットで理解できる",
"三角比の値を使って辺の長さを求められる",
],
lessonBlocks: [
{
kind: "intro",
title: "特別な角は図形から出てくる",
body: "三角比では、$30^\\circ$、$45^\\circ$、$60^\\circ$ の値が何度も出てきます。\n\nこれらは丸暗記してもよいですが、できれば図形から理解してください。\n\n$30^\\circ$ と $60^\\circ$ は正三角形を半分にして作ります。\n\n$45^\\circ$ は直角二等辺三角形から作ります。\n\nつまり、特別な角の三角比は、特別な三角形の辺の比から生まれます。",
},
{
kind: "concept",
title: "45度は直角二等辺三角形から考える",
body: "$45^\\circ$ の三角比は、直角二等辺三角形から分かります。\n\n直角二等辺三角形では、直角以外の2つの角がどちらも $45^\\circ$ です。\n\n2つの等しい辺をそれぞれ $1$ とすると、斜辺は三平方の定理より、\n\n$\\sqrt{1^2+1^2}=\\sqrt{2}$\n\nです。\n\nしたがって、$45^\\circ$ に対して、対辺は $1$、隣辺は $1$、斜辺は $\\sqrt{2}$ です。",
},
{
kind: "workedExample",
title: "45度の三角比を求める",
body: "直角二等辺三角形で、対辺 $1$、隣辺 $1$、斜辺 $\\sqrt{2}$ とします。\n\nすると、\n\n$\\sin45^\\circ=\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$\n\n$\\cos45^\\circ=\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$\n\n$\\tan45^\\circ=\\frac{1}{1}=1$\n\nです。\n\n$45^\\circ$ では対辺と隣辺が等しいので、$\\sin$ と $\\cos$ が同じ値になります。",
},
{
kind: "concept",
title: "30度と60度は正三角形から考える",
body: "$30^\\circ$ と $60^\\circ$ の三角比は、正三角形を半分にして考えます。\n\n1辺が $2$ の正三角形を考えます。正三角形の高さを下ろすと、底辺が半分に分かれ、$1$ と $1$ になります。\n\nこのとき、できる直角三角形の斜辺は $2$、短い辺は $1$ です。\n\n残りの高さは、三平方の定理より、\n\n$\\sqrt{2^2-1^2}=\\sqrt{3}$\n\nです。\n\nしたがって、$30^\\circ$、$60^\\circ$、$90^\\circ$ の直角三角形の辺の比は、$1:\\sqrt{3}:2$ になります。",
},
{
kind: "comparisonTable",
title: "特別な角の三角比",
body: "特別な角の三角比は、表だけでなく元になる三角形の辺の比も意識しましょう。",
columns: ["角度", "$\\sin$", "$\\cos$", "$\\tan$", "元になる三角形"],
rows: [
{
cells: ["$30^\\circ$", "$\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{\\sqrt{3}}$", "$1:\\sqrt{3}:2$"],
},
{
cells: ["$45^\\circ$", "$\\frac{\\sqrt{2}}{2}$", "$\\frac{\\sqrt{2}}{2}$", "$1$", "$1:1:\\sqrt{2}$"],
highlight: true,
},
{
cells: ["$60^\\circ$", "$\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2}$", "$\\sqrt{3}$", "$1:\\sqrt{3}:2$"],
},
],
},
{
kind: "workedExample",
title: "例：特別な角で辺を求める",
body: "直角三角形で、斜辺が $10$、角Aが $30^\\circ$ のとき、角Aの対辺を求めます。\n\n$\\sin30^\\circ=\\frac{1}{2}$ です。\n\nまた、$\\sin A=\\frac{\\text{対辺}}{\\text{斜辺}}$ なので、\n\n$\\frac{1}{2}=\\frac{\\text{対辺}}{10}$\n\nしたがって、対辺は\n\n$10\\times\\frac{1}{2}=5$\n\nです。\n\n特別な角の三角比を使うと、辺の長さをすぐに求められます。",
},
{
kind: "commonMistake",
title: "よくあるミス：30度と60度のsinとcosを逆にする",
body: "$30^\\circ$ と $60^\\circ$ の $\\sin$ と $\\cos$ は入れ替わります。\n\n$\\sin30^\\circ=\\frac{1}{2}$、$\\cos30^\\circ=\\frac{\\sqrt{3}}{2}$ です。\n\n一方、$\\sin60^\\circ=\\frac{\\sqrt{3}}{2}$、$\\cos60^\\circ=\\frac{1}{2}$ です。\n\n覚えにくい場合は、正三角形を半分にした $1:\\sqrt{3}:2$ の三角形を思い出してください。\n\n$30^\\circ$ の向かい側は短い辺 $1$、$60^\\circ$ の向かい側は長い辺 $\\sqrt{3}$ です。",
},
{
kind: "summary",
title: "まとめ",
body: "- $45^\\circ$ は直角二等辺三角形から考える\n- $30^\\circ$ と $60^\\circ$ は正三角形を半分にして考える\n- $45^\\circ$ の辺の比は $1:1:\\sqrt{2}$\n- $30^\\circ,60^\\circ,90^\\circ$ の辺の比は $1:\\sqrt{3}:2$\n- 30度と60度では、sinとcosの値が入れ替わる\n- 特別な角は、値だけでなく図形とセットで覚える",
},
{
kind: "nextStep",
title: "次は面積公式へ",
body: "三角比を使うと、直角三角形以外の三角形の面積も求められるようになります。\n\n次の講座では、$S=\\frac{1}{2}bc\\sin A$ という面積公式を、意味から理解します。",
},
],
checkQuestions: [
{
question: "$\\sin60^\\circ$、$\\cos60^\\circ$、$\\tan60^\\circ$ を求めよ。",
answer: "$\\sin60^\\circ=\\frac{\\sqrt{3}}{2}$、$\\cos60^\\circ=\\frac{1}{2}$、$\\tan60^\\circ=\\sqrt{3}$。",
hint: "30度・60度・90度の三角形の辺の比は $1:\\sqrt{3}:2$。",
},
{
question: "斜辺が $8$、角Aが $45^\\circ$ の直角三角形で、角Aの対辺を求めよ。",
answer: "$\\sin45^\\circ=\\frac{\\sqrt{2}}{2}$ より、対辺は $8\\times\\frac{\\sqrt{2}}{2}=4\\sqrt{2}$。",
hint: "$\\sin A=\\frac{\\text{対辺}}{\\text{斜辺}}$。",
},
{
question: "$30^\\circ$ の向かい側の辺が $6$ の直角三角形で、斜辺を求めよ。",
answer: "$30^\\circ$ の向かい側は、辺の比 $1:\\sqrt{3}:2$ の $1$ にあたる。したがって斜辺はその2倍で $12$。",
hint: "30度の向かい側は一番短い辺。",
},
],
relatedPracticeLinks: [
{ label: "特別な角 演習", href: "/units/figures-and-measurement" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a" },
],
qualityTags: ["特別な角", "三平方の定理", "平方根", "確認問題3問"],
},
{
lessonId: "trig-ratios-obtuse-identities",
lessonTitle: "鈍角の三角比と相互関係",
lessonDescription: "三角比を鈍角まで座標で広げ、補角の公式と相互関係（$\\sin^2\\theta+\\cos^2\\theta=1$ など）を意味から理解する。",
level: "beginner",
estimatedMinutes: 55,
prerequisites: ["三角比とは何か", "30度・45度・60度の三角比", "平方根の基本"],
goals: [
"三角比を座標で定義し、鈍角まで広げられる",
"鈍角では $\\cos$ が負、$\\sin$ が正になる理由を説明できる",
"補角の公式 $\\sin(180^\\circ-\\theta)=\\sin\\theta$ などを使える",
"相互関係 $\\sin^2\\theta+\\cos^2\\theta=1$、$\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$ を使える",
"1つの三角比から残りを、符号に注意して求められる",
],
lessonBlocks: [
{
kind: "intro",
title: "三角比は鈍角にも広がる",
body: "直角三角形の三角比は、$0^\\circ$ より大きく $90^\\circ$ より小さい角でしか定義できませんでした。\n\nしかし、三角形の内角には $90^\\circ$ より大きい鈍角もあります。余弦定理で $\\cos A=-\\frac12$ となり $A=120^\\circ$ になる、というのはその例です。\n\nそこで、三角比を **座標** を使って定義し直すと、$0^\\circ$ から $180^\\circ$ までの角に三角比を広げられます。\n\nこの講座では、鈍角の三角比・補角の公式・相互関係という、正弦定理・余弦定理を安全に使うための土台を作ります。",
},
{
kind: "strategy",
title: "まずこれだけ覚える",
body: "鈍角の三角比で本当に大切な5つを先に頭へ入れます。これが全体の地図になります。",
emphasis:
"1. 三角比は座標 $\\sin\\theta=\\frac{y}{r}$、$\\cos\\theta=\\frac{x}{r}$、$\\tan\\theta=\\frac{y}{x}$。　2. 鈍角では $\\cos\\theta<0$、$\\sin\\theta>0$。　3. $\\sin(180^\\circ-\\theta)=\\sin\\theta$、$\\cos(180^\\circ-\\theta)=-\\cos\\theta$、$\\tan(180^\\circ-\\theta)=-\\tan\\theta$。　4. $\\sin^2\\theta+\\cos^2\\theta=1$。　5. 平方根を取ったら、角の範囲で符号を決める。",
},
{
kind: "concept",
title: "座標で三角比を定義する",
body: "半径 $r$ の円をかき、中心を原点 $O$ に置きます。$x$ 軸の正の向きから測って角 $\\theta$ をとり、円周上の点を $P(x,y)$ とします。\n\nこのとき、三角比を次のように定義します。\n\n$\\sin\\theta=\\dfrac{y}{r}$、$\\cos\\theta=\\dfrac{x}{r}$、$\\tan\\theta=\\dfrac{y}{x}$\n\n$\\theta$ が鋭角のとき、点 $P$ は右上（第1象限）にあり、$x>0$、$y>0$ なので、直角三角形の三角比と一致します。\n\nこの定義は $\\theta$ が $90^\\circ$ や鈍角でも使えます。角を大きくすると点 $P$ が左へ動くので、鈍角では $x<0$ になります。",
},
{
kind: "concept",
title: "鈍角では cos が負、sin は正",
body: "$\\theta$ を $0^\\circ$ から $180^\\circ$ まで動かすと、点 $P$ は円の上半分を右から左へ動きます。\n\n$\\theta$ が鈍角（$90^\\circ<\\theta<180^\\circ$）のとき、点 $P$ は左上（第2象限）にあります。\n\nこのとき、横座標 $x$ は負なので $\\cos\\theta=\\dfrac{x}{r}<0$、縦座標 $y$ は正なので $\\sin\\theta=\\dfrac{y}{r}>0$ です。\n\nまた $\\tan\\theta=\\dfrac{y}{x}$ は、$y>0$、$x<0$ なので負になります。\n\nつまり、鈍角では **$\\sin$ は正のまま、$\\cos$ と $\\tan$ が負** になります。境目の $90^\\circ$ では $x=0$ なので、$\\cos90^\\circ=0$、$\\tan90^\\circ$ は定義されません。",
},
{
kind: "comparisonTable",
title: "0°〜180°での三角比の符号",
body: "角の範囲で、三角比の符号がどうなるかを整理します。",
columns: ["範囲", "$\\sin\\theta$", "$\\cos\\theta$", "$\\tan\\theta$"],
rows: [
{ cells: ["鋭角 $0^\\circ<\\theta<90^\\circ$", "正", "正", "正"], highlight: true },
{ cells: ["$\\theta=90^\\circ$", "$1$", "$0$", "なし"] },
{ cells: ["鈍角 $90^\\circ<\\theta<180^\\circ$", "正", "負", "負"], highlight: true },
],
},
{
kind: "formula",
title: "補角の公式（180°−θ）",
body: "点 $P$ の対称性から、$\\theta$ と $180^\\circ-\\theta$ の三角比には次の関係があります。\n\n$180^\\circ-\\theta$ は $\\theta$ を $y$ 軸で折り返した角なので、$y$ 座標は同じ、$x$ 座標は符号が反転します。だから $\\sin$ はそのまま、$\\cos$ と $\\tan$ は符号が変わります。",
formula: "\\sin(180^\\circ-\\theta)=\\sin\\theta,\\quad \\cos(180^\\circ-\\theta)=-\\cos\\theta,\\quad \\tan(180^\\circ-\\theta)=-\\tan\\theta",
},
{
kind: "comparisonTable",
title: "鈍角の特別な角の三角比",
body: "補角の公式を使うと、鈍角の特別な角も鋭角の値から出せます。",
columns: ["角度", "$\\sin$", "$\\cos$", "$\\tan$", "もとにする鋭角"],
rows: [
{ cells: ["$120^\\circ$", "$\\frac{\\sqrt{3}}{2}$", "$-\\frac{1}{2}$", "$-\\sqrt{3}$", "$180^\\circ-60^\\circ$"], highlight: true },
{ cells: ["$135^\\circ$", "$\\frac{\\sqrt{2}}{2}$", "$-\\frac{\\sqrt{2}}{2}$", "$-1$", "$180^\\circ-45^\\circ$"] },
{ cells: ["$150^\\circ$", "$\\frac{1}{2}$", "$-\\frac{\\sqrt{3}}{2}$", "$-\\frac{1}{\\sqrt{3}}$", "$180^\\circ-30^\\circ$"] },
],
},
{
kind: "workedExample",
title: "例1：補角の公式で鈍角の三角比を出す",
body: "$\\sin120^\\circ$、$\\cos120^\\circ$、$\\tan120^\\circ$ を求めます。\n\n$120^\\circ=180^\\circ-60^\\circ$ と見ます。\n\n$\\sin120^\\circ=\\sin(180^\\circ-60^\\circ)=\\sin60^\\circ=\\dfrac{\\sqrt{3}}{2}$\n\n$\\cos120^\\circ=\\cos(180^\\circ-60^\\circ)=-\\cos60^\\circ=-\\dfrac{1}{2}$\n\n$\\tan120^\\circ=\\tan(180^\\circ-60^\\circ)=-\\tan60^\\circ=-\\sqrt{3}$\n\n$\\sin$ は正のまま、$\\cos$ と $\\tan$ が負になっていることを確認します。",
},
{
kind: "formula",
title: "三角比の相互関係",
body: "座標の定義から、$\\theta$ の三角比の間には次の関係が成り立ちます。これらは鋭角でも鈍角でも成り立ちます。\n\n$\\tan\\theta=\\dfrac{\\sin\\theta}{\\cos\\theta}$ は $\\dfrac{y/r}{x/r}=\\dfrac{y}{x}$ から、$\\sin^2\\theta+\\cos^2\\theta=1$ は $x^2+y^2=r^2$ から出ます。",
formula: "\\sin^2\\theta+\\cos^2\\theta=1,\\quad \\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta},\\quad 1+\\tan^2\\theta=\\frac{1}{\\cos^2\\theta}",
},
{
kind: "workedExample",
title: "例2：sin から cos・tan を求める（鈍角）",
body: "$\\theta$ が鈍角で $\\sin\\theta=\\dfrac{3}{5}$ のとき、$\\cos\\theta$ と $\\tan\\theta$ を求めます。\n\n**相互関係を使う**　$\\sin^2\\theta+\\cos^2\\theta=1$ より、$\\cos^2\\theta=1-\\left(\\dfrac{3}{5}\\right)^2=1-\\dfrac{9}{25}=\\dfrac{16}{25}$。\n\n**符号を決める**　$\\cos\\theta=\\pm\\dfrac{4}{5}$ ですが、$\\theta$ は鈍角なので $\\cos\\theta<0$。したがって $\\cos\\theta=-\\dfrac{4}{5}$。\n\n**tan を出す**　$\\tan\\theta=\\dfrac{\\sin\\theta}{\\cos\\theta}=\\dfrac{3/5}{-4/5}=-\\dfrac{3}{4}$。\n\n**検算**　$\\sin^2\\theta+\\cos^2\\theta=\\dfrac{9}{25}+\\dfrac{16}{25}=1$。鈍角なので $\\cos<0$、$\\tan<0$ で符号も整合。\n\n**答え**　$\\cos\\theta=-\\dfrac{4}{5}$、$\\tan\\theta=-\\dfrac{3}{4}$。",
},
{
kind: "workedExample",
title: "例3：tan から sin・cos を求める（鈍角）",
body: "$\\theta$ が鈍角で $\\tan\\theta=-2$ のとき、$\\cos\\theta$ と $\\sin\\theta$ を求めます。\n\n**相互関係を使う**　$1+\\tan^2\\theta=\\dfrac{1}{\\cos^2\\theta}$ より、$\\dfrac{1}{\\cos^2\\theta}=1+(-2)^2=5$。よって $\\cos^2\\theta=\\dfrac{1}{5}$。\n\n**符号を決める**　鈍角なので $\\cos\\theta<0$。したがって $\\cos\\theta=-\\dfrac{1}{\\sqrt5}=-\\dfrac{\\sqrt5}{5}$。\n\n**sin を出す**　$\\tan\\theta=\\dfrac{\\sin\\theta}{\\cos\\theta}$ より $\\sin\\theta=\\tan\\theta\\cdot\\cos\\theta=(-2)\\left(-\\dfrac{\\sqrt5}{5}\\right)=\\dfrac{2\\sqrt5}{5}$。\n\n**検算**　$\\sin\\theta=\\dfrac{2\\sqrt5}{5}>0$ は鈍角と整合。$\\sin^2\\theta+\\cos^2\\theta=\\dfrac{20}{25}+\\dfrac{5}{25}=1$。\n\n**答え**　$\\cos\\theta=-\\dfrac{\\sqrt5}{5}$、$\\sin\\theta=\\dfrac{2\\sqrt5}{5}$。",
},
{
kind: "commonMistake",
title: "よくあるミス：平方根の符号を範囲で決めない",
body: "**NG**　$\\sin^2\\theta+\\cos^2\\theta=1$ から $\\cos\\theta$ を出すとき、$\\cos\\theta=\\pm\\dfrac{4}{5}$ の両方を答えにする、あるいは深く考えずに正の方を選ぶ。\n\n**OK**　平方して求めた値は、必ず **角の範囲で符号を決める**。鋭角なら $\\cos\\theta>0$、鈍角なら $\\cos\\theta<0$。$\\sin\\theta$ は $0^\\circ<\\theta<180^\\circ$ では常に正。\n\n**見分け方**　「鈍角と書いてあるか」「最大辺の向かいの角か」を先に読む。範囲が決まっていないなら、鋭角・鈍角の2通りを場合分けする。",
},
{
kind: "commonMistake",
title: "よくあるミス：sinの値だけで角を1つに決める",
body: "**NG**　$\\sin\\theta=\\dfrac12$ から $\\theta=30^\\circ$ とだけ答える。\n\n**OK**　$0^\\circ<\\theta<180^\\circ$ では $\\sin\\theta=\\sin(180^\\circ-\\theta)$ なので、$\\sin\\theta=\\dfrac12$ の解は $\\theta=30^\\circ$ と $\\theta=150^\\circ$ の **2つ**。どちらかに絞るには、$\\cos$ の符号や、三角形なら辺の大小・角の和の条件が必要。\n\n**見分け方**　$\\sin$ から角を出したら「鈍角側 $180^\\circ-\\theta$ もあり得るか」を必ず確認する。この判断は「鈍角・存在条件・SSA完全攻略」で深掘りする。",
},
{
kind: "checkpoint",
title: "確認：鈍角の三角比と相互関係",
body: "$\\theta$ が鈍角で $\\cos\\theta=-\\dfrac{5}{13}$ のとき、$\\sin\\theta$ と $\\tan\\theta$ を求めます。\n\n$\\sin^2\\theta=1-\\cos^2\\theta=1-\\dfrac{25}{169}=\\dfrac{144}{169}$。\n\n$0^\\circ<\\theta<180^\\circ$ で $\\sin\\theta>0$ なので $\\sin\\theta=\\dfrac{12}{13}$。\n\n$\\tan\\theta=\\dfrac{\\sin\\theta}{\\cos\\theta}=\\dfrac{12/13}{-5/13}=-\\dfrac{12}{5}$。",
},
{
kind: "summary",
title: "まとめ",
body: "- 三角比は座標で定義すると $0^\\circ$〜$180^\\circ$ に広がる\n- $\\sin\\theta=\\frac{y}{r}$、$\\cos\\theta=\\frac{x}{r}$、$\\tan\\theta=\\frac{y}{x}$\n- 鈍角では $\\sin$ は正、$\\cos$ と $\\tan$ は負\n- $\\sin(180^\\circ-\\theta)=\\sin\\theta$、$\\cos(180^\\circ-\\theta)=-\\cos\\theta$、$\\tan(180^\\circ-\\theta)=-\\tan\\theta$\n- $\\sin^2\\theta+\\cos^2\\theta=1$、$\\tan\\theta=\\frac{\\sin\\theta}{\\cos\\theta}$、$1+\\tan^2\\theta=\\frac{1}{\\cos^2\\theta}$\n- 平方根の符号は、角の範囲で決める",
},
{
kind: "nextStep",
title: "次は面積公式、そして正弦定理・余弦定理へ",
body: "鈍角の三角比が分かると、鈍角をはさむ三角形の面積や、余弦定理で出る鈍角も安心して扱えます。\n\n次は面積公式 $S=\\frac12bc\\sin A$ を学び、その後、一般の三角形で辺と角を結ぶ正弦定理・余弦定理へ進みます。鈍角の判定は「鈍角・存在条件・SSA完全攻略」でさらに深めます。",
},
],
checkQuestions: [
{
question: "$\\theta$ が鈍角で $\\sin\\theta=\\dfrac{4}{5}$ のとき、$\\cos\\theta$ と $\\tan\\theta$ を求めよ。",
answer: "$\\cos^2\\theta=1-\\dfrac{16}{25}=\\dfrac{9}{25}$。鈍角なので $\\cos\\theta=-\\dfrac{3}{5}$。$\\tan\\theta=\\dfrac{4/5}{-3/5}=-\\dfrac{4}{3}$。",
hint: "鈍角なら $\\cos<0$。符号を範囲で決める。",
},
{
question: "$\\sin135^\\circ$、$\\cos135^\\circ$、$\\tan135^\\circ$ を求めよ。",
answer: "$135^\\circ=180^\\circ-45^\\circ$ より、$\\sin135^\\circ=\\sin45^\\circ=\\dfrac{\\sqrt{2}}{2}$、$\\cos135^\\circ=-\\cos45^\\circ=-\\dfrac{\\sqrt{2}}{2}$、$\\tan135^\\circ=-\\tan45^\\circ=-1$。",
hint: "補角の公式を使う。",
},
{
question: "$0^\\circ<\\theta<180^\\circ$ で $\\sin\\theta=\\dfrac{1}{2}$ を満たす $\\theta$ をすべて求めよ。",
answer: "$\\theta=30^\\circ$ と $\\theta=150^\\circ$。$\\sin\\theta=\\sin(180^\\circ-\\theta)$ なので鋭角と鈍角の2つ。",
hint: "sinは鋭角・鈍角で同じ値になる。",
},
{
question: "$\\theta$ が鈍角で $\\tan\\theta=-\\dfrac{3}{4}$ のとき、$\\sin\\theta$ と $\\cos\\theta$ を求めよ。",
answer: "$\\dfrac{1}{\\cos^2\\theta}=1+\\dfrac{9}{16}=\\dfrac{25}{16}$ より $\\cos^2\\theta=\\dfrac{16}{25}$。鈍角なので $\\cos\\theta=-\\dfrac{4}{5}$。$\\sin\\theta=\\tan\\theta\\cdot\\cos\\theta=\\left(-\\dfrac{3}{4}\\right)\\left(-\\dfrac{4}{5}\\right)=\\dfrac{3}{5}$。",
hint: "$1+\\tan^2\\theta=\\frac{1}{\\cos^2\\theta}$ を使い、符号は鈍角で決める。",
},
],
relatedPracticeLinks: [
{ label: "三角比とは何か", href: "/courses/math-1a/figures-and-measurement/trigonometric-ratios-basic", description: "直角三角形での三角比に戻る" },
{ label: "鈍角・存在条件・SSA完全攻略", href: "/courses/math-1a/figures-and-measurement/obtuse-ssa-existence-mastery", description: "角が2候補になる事故を防ぐ" },
{ label: "正弦定理と余弦定理", href: "/courses/math-1a/figures-and-measurement/sine-law-cosine-law", description: "鈍角の cos を使う定理へ" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a", description: "共通テスト対策" },
],
qualityTags: ["鈍角の三角比", "座標定義", "補角の公式", "相互関係", "符号判定", "確認問題4問", "diagram-none-intentional", "よくあるミスあり", "検算あり"],
},
{
lessonId: "triangle-area-with-trigonometry",
lessonTitle: "三角形の面積と三角比",
lessonDescription: "三角比を使って、2辺とその間の角から三角形の面積を求める。",
level: "beginner",
estimatedMinutes: 60,
prerequisites: ["三角比とは何か", "30度・45度・60度の三角比", "三角形の面積"],
goals: [
"面積公式 $S=\\frac{1}{2}bc\\sin A$ の意味を説明できる",
"2辺とその間の角から面積を求められる",
"どの角が2辺にはさまれた角か判断できる",
"高さを三角比で表す考え方を理解できる",
"正弦定理・余弦定理に進むための準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "三角比で面積が求められる理由",
body: "三角形の面積は、基本的には\n\n$\\frac{1}{2}\\times\\text{底辺}\\times\\text{高さ}$\n\nで求めます。\n\nしかし、問題によっては高さが直接与えられていないことがあります。\n\nそこで三角比を使います。\n\n2辺とその間の角が分かっているとき、高さを $\\sin$ で表すことができます。\n\nその結果、三角形の面積を\n\n$S=\\frac{1}{2}bc\\sin A$\n\nで求められるようになります。",
},
{
kind: "formula",
title: "三角比を使う面積公式",
body: "三角形ABCで、角Aをはさむ2辺を $b$、$c$ とします。\n\nこのとき、三角形の面積 $S$ は、\n\n$S=\\frac{1}{2}bc\\sin A$\n\nで求められます。\n\nここで大切なのは、角Aが2辺 $b$ と $c$ の間の角であることです。",
formula: "S=\\frac{1}{2}bc\\sin A",
},
{
kind: "concept",
title: "高さをsinで表す",
body: "なぜ $S=\\frac{1}{2}bc\\sin A$ になるのでしょうか。\n\n辺 $c$ を底辺と考えます。\n\nもう一方の辺 $b$ から底辺に高さを下ろすと、その高さは $b\\sin A$ と表せます。\n\nなぜなら、$\\sin A$ は、直角三角形で対辺を斜辺で割ったものだからです。\n\n高さを $h$ とすると、\n\n$\\sin A=\\frac{h}{b}$\n\nよって、\n\n$h=b\\sin A$\n\nです。\n\nしたがって、面積は\n\n$S=\\frac{1}{2}\\times c\\times b\\sin A=\\frac{1}{2}bc\\sin A$\n\nとなります。",
},
{
kind: "strategy",
title: "この講座の勝ち筋・5秒で見るポイント",
body: "面積問題の勝ち筋は、**高さを直接出すか、高さを三角比で置き換えるか**を最初に決めることです。\n\n5秒で見るポイントは3つです。1つ目は、底辺にできる辺があるか。2つ目は、その底辺に対する高さが見えるか。3つ目は、高さが見えないなら、2辺とその間の角があるか。\n\n高さが見えるなら $S=\\frac12\\times\\text{底辺}\\times\\text{高さ}$。高さが見えず、2辺とその間の角が見えるなら $S=\\frac12ab\\sin C$。面積と半周長が絡むなら $S=rs$。3辺と外接円半径が絡むなら $S=\\frac{abc}{4R}$ まで候補にします。\n\n絶対に避けるミスは、**与えられた角が2辺にはさまれた角か確認せずに $\\frac12ab\\sin C$ へ代入すること**です。図を信じる前に、どの2辺とどの角が対応しているかを言葉で確認します。",
emphasis:
"本番では「底辺と高さでいくか、2辺と夹角でいくか」を最初に決める。高さが見えないから三角比で高さを作る、という順番で考える。",
},
{
kind: "comparisonTable",
title: "面積・高さで迷ったときの判断表",
body: "面積は公式暗記ではなく、条件の形から道具を選びます。",
columns: ["求めたい量", "最初に見るもの", "優先する道具"],
rows: [
{
cells: ["面積", "底辺と高さが見えるか", "$S=\\frac12ah$"],
highlight: true,
},
{
cells: ["面積", "2辺とその間の角があるか", "$S=\\frac12ab\\sin C$"],
highlight: true,
},
{
cells: ["高さ", "面積と底辺が分かるか", "$h=\\frac{2S}{a}$"],
},
{
cells: ["高さ", "直角三角形を作れるか", "三角比または三平方"],
},
{
cells: ["内接円半径", "面積と半周長があるか", "$S=rs$"],
},
{
cells: ["外接円半径", "3辺と面積があるか", "$abc=4RS$"],
},
],
},
{
kind: "workedExample",
title: "例1：2辺とその間の角から面積を求める",
body: "2辺の長さが $6$、$8$ で、その間の角が $30^\\circ$ の三角形の面積を求めます。\n\n面積公式を使います。\n\n$S=\\frac{1}{2}bc\\sin A$\n\nここで、$b=6$、$c=8$、$A=30^\\circ$ と考えます。\n\n$\\sin30^\\circ=\\frac{1}{2}$ なので、\n\n$S=\\frac{1}{2}\\times6\\times8\\times\\frac{1}{2}$\n\n$S=12$\n\nしたがって、面積は $12$ です。",
},
{
kind: "workedExample",
title: "例2：角が60度の場合",
body: "2辺の長さが $5$、$10$ で、その間の角が $60^\\circ$ の三角形の面積を求めます。\n\n$S=\\frac{1}{2}bc\\sin A$ を使います。\n\n$\\sin60^\\circ=\\frac{\\sqrt{3}}{2}$ なので、\n\n$S=\\frac{1}{2}\\times5\\times10\\times\\frac{\\sqrt{3}}{2}$\n\n$S=\\frac{25\\sqrt{3}}{2}$\n\nです。\n\n三角比を使う面積公式では、角の三角比の値を正確に使う必要があります。",
},
{
kind: "workedExample",
title: "代表例題：面積から高さを逆算する",
body: "**問題**　三角形 $ABC$ で、$BC=14$、面積が $84$ である。頂点 $A$ から $BC$ に下ろした高さを求めよ。\n\n**本番での判断順**　求めたい量は高さ。底辺 $BC$ と面積が分かっているので、三角比や余弦定理に行く前に $S=\\frac12\\times\\text{底辺}\\times\\text{高さ}$ を使う。\n\n**標準解答**　高さを $h$ とすると、$84=\\frac12\\times14\\times h$。右辺は $7h$ なので、$h=12$。\n\n**別解**　もし三辺が $13,14,15$ と分かっているなら、ヘロンの公式で面積 $84$ を出し、そこから $h=\\frac{2S}{14}=12$ と戻せる。\n\n**捨てるべき方針**　高さが欲しいだけなのに、いきなり角度を求めるのは遠回り。図から高さを読もうとするのも危険。\n\n**検算**　$\\frac12\\times14\\times12=84$ に戻る。高さは正の値で、底辺14に対して極端に大きすぎない。",
},
{
kind: "commonMistake",
title: "よくあるミス：はさまれた角を見ていない",
body: "面積公式 $S=\\frac{1}{2}bc\\sin A$ で使う角は、2辺にはさまれた角です。\n\n例えば、2辺 $5$ と $7$ が与えられていて、角 $60^\\circ$ も与えられているとしても、その角が2辺の間の角でなければ、この公式をそのまま使うことはできません。\n\n図形問題では、公式に入れる前に、どの2辺とどの角が対応しているかを確認してください。\n\n角がはさまれているかどうかを見ないまま代入すると、面積が間違います。",
},
{
kind: "commonMistake",
title: "絶対に避けるミス：とりあえず補助線・とりあえず三平方",
body: "**NG**　面積問題を見るたびに、目的を決めずに補助線を引く。あるいは、直角三角形が見えていないのに三平方の定理から始める。\n\n**OK**　まず「面積を出すのか、高さを出すのか」を決める。面積なら、底辺×高さ、$\\frac12ab\\sin C$、$S=rs$、$S=\\frac{abc}{4R}$ のどれが条件に合うかを見る。高さなら、面積から逆算できるか、直角三角形を作れるかを見る。\n\n**誤答分析**　補助線を先に引く人は、何を求めるための補助線かが曖昧になりやすい。三平方を先に使う人は、直角があるか、どの辺が斜辺かを確認せずに式を書きやすい。補助線も三平方も、目的が決まってから使う。",
},
{
kind: "checkpoint",
title: "確認：面積公式を使う",
body: "2辺が $4$、$9$、その間の角が $45^\\circ$ の三角形の面積を求めます。\n\n$S=\\frac{1}{2}\\times4\\times9\\times\\sin45^\\circ$\n\n$\\sin45^\\circ=\\frac{\\sqrt{2}}{2}$ なので、\n\n$S=18\\times\\frac{\\sqrt{2}}{2}=9\\sqrt{2}$\n\nです。",
},
{
kind: "summary",
title: "まとめ",
body: "- 三角形の面積は底辺と高さで求める\n- 高さがないとき、三角比で高さを表す\n- 2辺とその間の角が分かると、$S=\\frac{1}{2}bc\\sin A$ が使える\n- 使う角は、2辺にはさまれた角\n- 特別な角の三角比を正確に使う\n- 面積公式は、正弦定理・余弦定理と並んで図形と計量の基本",
},
{
kind: "nextStep",
title: "次は正弦定理と余弦定理へ",
body: "三角比を使う面積公式が分かると、直角三角形以外にも三角比を使えることが見えてきます。\n\n次の中級講座では、一般の三角形で辺と角を結びつける正弦定理・余弦定理を学びます。",
},
],
checkQuestions: [
{
question: "2辺が $7$、$8$、その間の角が $30^\\circ$ の三角形の面積を求めよ。",
answer: "$S=\\frac{1}{2}\\times7\\times8\\times\\sin30^\\circ=28\\times\\frac{1}{2}=14$。",
hint: "$\\sin30^\\circ=\\frac{1}{2}$。",
},
{
question: "2辺が $6$、$6$、その間の角が $60^\\circ$ の三角形の面積を求めよ。",
answer: "$S=\\frac{1}{2}\\times6\\times6\\times\\frac{\\sqrt{3}}{2}=9\\sqrt{3}$。",
hint: "$\\sin60^\\circ=\\frac{\\sqrt{3}}{2}$。",
},
{
question: "面積公式 $S=\\frac{1}{2}bc\\sin A$ を使うとき、角Aはどのような角である必要があるか。",
answer: "2辺 $b$ と $c$ にはさまれた角である必要がある。",
hint: "2辺とその間の角の関係を見る。",
},
],
relatedPracticeLinks: [
{ label: "面積公式完全攻略", href: "/courses/math-1a/figures-and-measurement/triangle-area-mastery", description: "この講座は面積の導入。選択・分割・面積比の深掘りはこちら" },
{ label: "三角形の面積 演習", href: "/units/figures-and-measurement" },
{ label: "問題解体型講座：第1問後半 図形と計量", href: "/common-test/problem-lectures/ct-ia-q1-back-geometry-measurement", description: "面積・高さ・外接円半径を冊子型問題で確認" },
{ label: "共通テスト型本番模試 第1回", href: "/common-test/simulator/common-test-math-1a-manual-001", description: "図形と計量の本番形式" },
{ label: "共通テスト型本番模試 第2回", href: "/common-test/simulator/common-test-math-1a-manual-002", description: "測量・三角比の本番形式" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a" },
],
qualityTags: ["面積公式", "三角比", "途中式あり", "確認問題3問", "勝ち筋あり", "5秒ポイントあり", "別解あり", "検算あり"],
},
];

const FIGURES_MEASUREMENT_STANDARD: CourseLesson[] = [
{
lessonId: "sine-law-cosine-law",
lessonTitle: "正弦定理と余弦定理",
lessonDescription: "一般の三角形で、辺と角を結びつける正弦定理・余弦定理を使い分ける。",
level: "standard",
estimatedMinutes: 80,
prerequisites: ["三角比とは何か", "三角形の面積と三角比"],
goals: [
"正弦定理の意味と使う場面を理解できる",
"余弦定理の意味と使う場面を理解できる",
"辺と角の情報から、どちらの定理を使うか判断できる",
"三角形の辺・角・面積を総合的に求められる",
"入試標準レベルの図形と計量問題に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "直角三角形でなくても三角比は使える",
body: "初級では、主に直角三角形で三角比を使いました。\n\nしかし、実際の図形問題では、直角三角形とは限らない三角形がたくさん出てきます。\n\n一般の三角形で辺と角を結びつけるための道具が、正弦定理と余弦定理です。\n\n正弦定理は、辺とその向かいの角の関係を表します。\n\n余弦定理は、2辺とその間の角から残りの辺を求めたり、3辺から角を求めたりするときに使います。\n\nこの2つを使い分けられるようになると、図形と計量の標準問題の多くが解けるようになります。",
},
{
kind: "strategy",
title: "まずこれだけ覚える",
body: "正弦定理・余弦定理は「どちらを使うか」の判断が勝負です。先にこの5つを地図として頭へ入れます。",
emphasis:
"1. 正弦定理は「辺と向かいの角」がセット。　2. 正弦定理は外接円半径 $R$ が出るときにも使う。　3. 余弦定理は「2辺とその間の角」があるときに使う。　4. 3辺が分かるときも余弦定理で角を求められる。　5. 迷ったら、与えられた情報が「向かい合う辺と角」か「2辺と間の角」かを見る。",
},
{
kind: "strategy",
title: "この講座の勝ち筋・5秒で見るポイント",
body: "この講座の勝ち筋は、**公式名ではなく、情報の形で初手を決めること**です。\n\n5秒で見るポイントは、(1) 辺と向かいの角のペアがあるか、(2) 2辺とその間の角があるか、(3) 3辺がそろっているか、(4) 外接円半径 $R$ が出ているか、の4つです。\n\n辺と向かいの角のペアがあれば正弦定理。2辺とその間の角なら余弦定理または面積公式。3辺なら余弦定理で角を出す。外接円半径なら正弦定理、または面積が分かるなら $abc=4RS$ を使います。\n\n絶対に避けるミスは、**$\\sin$ の値だけで角を決めること**です。$\\sin\\theta$ は $\\theta$ と $180^\\circ-\\theta$ で同じ値になるので、鋭角か鈍角かは $\\cos$ の符号、最大辺の向かいの角、図形条件で確認します。",
emphasis:
"本番では「正弦定理か余弦定理か」ではなく、「向かいのペアか、2辺と間の角か、3辺か」を見る。",
},
{
kind: "formula",
title: "正弦定理",
body: "三角形ABCで、辺 $a,b,c$ をそれぞれ角 $A,B,C$ の向かい側の辺とします。\n\nこのとき、正弦定理は次のようになります。\n\n辺と、その向かいの角の $\\sin$ の比が等しいという定理です。",
formula: "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R",
},
{
kind: "concept",
title: "正弦定理を使う場面",
body: "正弦定理は、辺とその向かいの角がセットで分かっているときに使いやすいです。\n\n例えば、辺 $a$ と角 $A$ が分かっていて、角 $B$ も分かっているなら、辺 $b$ を求められます。\n\nなぜなら、\n\n$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$\n\nという関係を使えるからです。\n\n正弦定理では、辺と角を対応させることが大切です。辺 $a$ は角 $A$ の向かい側、辺 $b$ は角 $B$ の向かい側です。",
},
{
kind: "diagram",
title: "図で見る：正弦定理（外接円）",
body: "辺と「向かいの角」が対応します。同じ色の辺と角がペアです。外接円の半径 $R$ ともつながり、$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R$ が成り立ちます。",
diagramType: "sine-rule-circumcircle",
caption:
"正弦定理は「辺」と「向かいの角」を対応させる公式。外接円の半径 $R$ ともつながり、$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R$ が成り立つ。",
},
{
kind: "workedExample",
title: "例1：正弦定理で辺を求める",
body: "三角形ABCで、$a=6$、$A=30^\\circ$、$B=45^\\circ$ とします。辺 $b$ を求めます。\n\n正弦定理より、\n\n$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$\n\nです。\n\n代入すると、\n\n$\\frac{6}{\\sin30^\\circ}=\\frac{b}{\\sin45^\\circ}$\n\n$\\sin30^\\circ=\\frac{1}{2}$、$\\sin45^\\circ=\\frac{\\sqrt{2}}{2}$ なので、\n\n$\\frac{6}{\\frac{1}{2}}=\\frac{b}{\\frac{\\sqrt{2}}{2}}$\n\n左辺は $12$ です。\n\nしたがって、\n\n$12=\\frac{b}{\\frac{\\sqrt{2}}{2}}$\n\n$b=12\\times\\frac{\\sqrt{2}}{2}=6\\sqrt{2}$\n\nです。",
},
{
kind: "formula",
title: "余弦定理",
body: "三角形ABCで、辺 $a$ が角 $A$ の向かい側にあるとします。\n\n余弦定理は次の式です。\n\n2辺とその間の角から、残りの辺を求めるときに特に便利です。",
formula: "a^2=b^2+c^2-2bc\\cos A",
},
{
kind: "concept",
title: "余弦定理を使う場面",
body: "余弦定理は、次のような場面で使います。\n\n1つ目は、2辺とその間の角が分かっていて、残りの辺を求める場合です。\n\n2つ目は、3辺が分かっていて、角を求める場合です。\n\n三平方の定理は直角三角形で使う定理でした。\n\n余弦定理は、三平方の定理を一般の三角形に拡張したものと考えることができます。\n\n実際、$A=90^\\circ$ なら $\\cos90^\\circ=0$ なので、余弦定理は $a^2=b^2+c^2$ になります。",
},
{
kind: "diagram",
title: "図で見る：余弦定理",
body: "角 $C$ をはさむ2辺 $a,b$（青）と、その向かいの辺 $c$（ローズ）の関係です。2辺とその間の角から、向かいの辺を求められます。",
diagramType: "cosine-rule-triangle",
caption:
"余弦定理は「2辺とその間の角」から、向かいの辺を求める公式。角が $90^\\circ$ のときは三平方の定理になる。",
},
{
kind: "workedExample",
title: "例2：余弦定理で辺を求める",
body: "三角形ABCで、$b=5$、$c=7$、$A=60^\\circ$ とします。辺 $a$ を求めます。\n\n余弦定理より、\n\n$a^2=b^2+c^2-2bc\\cos A$\n\nです。\n\n代入すると、\n\n$a^2=5^2+7^2-2\\cdot5\\cdot7\\cos60^\\circ$\n\n$\\cos60^\\circ=\\frac{1}{2}$ なので、\n\n$a^2=25+49-70\\cdot\\frac{1}{2}$\n\n$a^2=74-35=39$\n\nしたがって、\n\n$a=\\sqrt{39}$\n\nです。",
},
{
kind: "workedExample",
title: "例3・標準：正弦定理で外接円の半径を求める",
body: "**問題**　三角形 $ABC$ で、$a=6$、$A=30^\\circ$ のとき、外接円の半径 $R$ を求めよ。\n\n**まず注目すること**　外接円の半径 $R$ が問われている → 正弦定理の $\\dfrac{a}{\\sin A}=2R$ の部分を使う。\n\n**式を立てる**　$\\dfrac{a}{\\sin A}=2R$ より $2R=\\dfrac{6}{\\sin30^\\circ}=\\dfrac{6}{\\frac{1}{2}}=12$。\n\n**$R$ に直す**　$2R=12$ なので $R=6$。**ここで $2R$ をそのまま $R$ と答えないこと**（最後に $2$ で割る）。\n\n**答え**　$R=6$。",
},
{
kind: "workedExample",
title: "例4・標準：余弦定理で角を求める（3辺から）",
body: "**問題**　三角形 $ABC$ で、$a=7$、$b=5$、$c=3$ のとき、角 $A$ を求めよ。\n\n**まず注目すること**　3辺が分かっていて角を求める → 余弦定理を角について変形した形を使う。\n\n**式を立てる**　$\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}$。求める角 $A$ の向かいが $a$、残りの2辺が $b,c$。\n\n**代入**　$\\cos A=\\dfrac{5^2+3^2-7^2}{2\\cdot5\\cdot3}=\\dfrac{25+9-49}{30}=\\dfrac{-15}{30}=-\\dfrac{1}{2}$。\n\n**角に直す**　$\\cos A=-\\dfrac{1}{2}$ となる角は $A=120^\\circ$。\n\n**確認**　最大の辺 $a=7$ の向かいの角が鈍角になり、$\\cos$ が負なのと整合。\n\n**答え**　$A=120^\\circ$。",
},
{
kind: "comparisonTable",
title: "正弦定理と余弦定理の使い分け",
body: "どちらを使うか迷ったら、与えられた情報の形を見ます。",
columns: ["定理", "使いやすい場面", "見る情報"],
rows: [
{
cells: ["正弦定理", "辺と向かいの角のセットがある", "辺とその向かいの角"],
highlight: true,
},
{
cells: ["余弦定理", "2辺とその間の角がある", "はさまれた角"],
},
{
cells: ["余弦定理", "3辺から角を求める", "3辺の長さ"],
},
],
},
{
kind: "comparisonTable",
title: "求めたい量別の判断表",
body: "求めたい量が変わると、最初に疑う道具も変わります。",
columns: ["求めたい量", "優先して見る条件", "最初の候補"],
rows: [
{
cells: ["辺", "直角三角形がある", "三平方の定理"],
},
{
cells: ["辺", "2辺とその間の角がある", "余弦定理"],
highlight: true,
},
{
cells: ["角", "3辺が分かる", "余弦定理で $\\cos$ を出す"],
highlight: true,
},
{
cells: ["角", "外接円半径と対辺がある", "正弦定理。ただし鋭角・鈍角を確認"],
},
{
cells: ["面積", "2辺とその間の角がある", "$S=\\frac12ab\\sin C$"],
},
{
cells: ["高さ", "面積と底辺、または直角三角形がある", "面積から逆算、または三平方"],
},
{
cells: ["外接円半径", "辺と対角、または3辺と面積がある", "正弦定理、または $abc=4RS$"],
},
{
cells: ["内接円半径", "面積と半周長がある", "$S=rs$"],
},
],
},
{
kind: "comparisonTable",
title: "問題文の読み替え表",
body: "問題文の表現を「どちらの定理か」に翻訳できると、方針が一瞬で決まります。",
columns: ["問題文の表現", "意味", "使う定理"],
rows: [
{
cells: ["辺と向かいの角がある", "対応ペアが見えている", "正弦定理"],
highlight: true,
},
{
cells: ["外接円半径 $R$ が出る", "$2R$ とつながる", "正弦定理"],
highlight: true,
},
{
cells: ["2辺とその間の角", "向かいの辺を求める", "余弦定理"],
},
{
cells: ["3辺が分かる", "角を求める", "余弦定理"],
},
{
cells: ["角が $90^\\circ$ に近い", "三平方との関係を見る", "余弦定理"],
},
],
},
{
kind: "concept",
title: "定理の選び方：判断フロー",
body: "正弦定理と余弦定理のどちらを使うかは、与えられた情報の組み合わせで決まります。\n\n① 「辺とその向かいの角」のセットが分かっているか？\n\n→ YES → 正弦定理。$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$ の比を作れる。\n\n→ NO → 次へ進む。\n\n② 「2辺とその間の角」が分かっているか？\n\n→ YES → 余弦定理で第3辺を求める。$a^2=b^2+c^2-2bc\\cos A$。\n\n③ 「3辺」が分かっているか？\n\n→ YES → 余弦定理を変形して角を求める。$\\cos A=\\frac{b^2+c^2-a^2}{2bc}$。\n\n頻出パターン例：\n\n$b=5,c=7,A=60^\\circ$ → 2辺とその間の角 → 余弦定理\n\n$a=6,A=30^\\circ,B=45^\\circ$ → 辺と向かいの角のセット → 正弦定理\n\n$a=4,b=5,c=7$ → 3辺既知 → 余弦定理で角を求める",
},
{
kind: "commonMistake",
title: "よくあるミス：対応する角を間違える",
body: "正弦定理で最も多いミスは、辺と角の対応を間違えることです。\n\n辺 $a$ は角 $A$ の向かい側です。辺 $b$ は角 $B$ の向かい側です。\n\n隣にある角ではなく、向かい側の角を見ます。\n\n余弦定理では、$a^2=b^2+c^2-2bc\\cos A$ の角Aは、辺 $b$ と $c$ にはさまれた角です。\n\n対応関係を確認せずに代入すると、式そのものは合っていても答えが間違います。",
},
{
kind: "commonMistake",
title: "よくあるミス：余弦定理で「間の角」でない角を使う／符号を間違える",
body: "**NG**　$a^2=b^2+c^2-2bc\\cos A$ の $A$ に、辺 $b,c$ にはさまれていない角を入れる。あるいは $-2bc\\cos C$ の符号を $+$ にしてしまう。\n\n**OK**　余弦定理は「**向かいの辺$^2$ ＝ 残り2辺の2乗和 − 2×(その2辺の積)×cos(間の角)**」。$c^2=a^2+b^2-2ab\\cos C$ なら、$C$ は $a,b$ にはさまれ、$c$ はその向かい。符号は必ず「$-2ab\\cos C$」（マイナス）。\n\n**見分け方**　求めたい辺の向かいの角を使い、その角をはさむ2辺を $a,b$ に当てる。$\\cos$ の前は常にマイナス。$90^\\circ$ で $\\cos=0$ となり三平方に戻るかで符号を自己チェックできる。",
},
{
kind: "commonMistake",
title: "よくあるミス：R と 2R の混同／3辺なのに正弦定理を使う",
body: "**NG**　正弦定理 $\\dfrac{a}{\\sin A}=2R$ で求めた $2R$ をそのまま外接円の半径 $R$ と答える。また、3辺だけ分かっているのに正弦定理で角を出そうとする（角の $\\sin$ が分からず詰まる）。\n\n**OK**　$\\dfrac{a}{\\sin A}$ が等しいのは **$2R$（直径）**。半径 $R$ は最後に $2$ で割る。3辺が分かっているときは、向かい合う辺と角のペアが無いので **余弦定理** $\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}$ で角を求める。\n\n**見分け方**　正弦定理は「辺と向かいの角のペア」が必要。ペアが無い（3辺だけ・2辺と間の角）なら余弦定理。$R$ を答える前に「$2R$ で割ったか？」を確認する。",
},
{
kind: "workedExample",
title: "代表例題：$\\sin$ だけで角を決めない",
body: "**問題**　三角形 $ABC$ で、$a=7, b=5, c=3$ とする。角 $A$ の種類と $\\sin A$ を求めよ。\n\n**本番での判断順**　3辺がそろっているので、まず余弦定理で $\\cos A$ を出す。$\\sin A$ を先に出すより、角が鋭角か鈍角かを $\\cos$ の符号で確定する方が安全。\n\n**標準解答**　$\\cos A=\\frac{b^2+c^2-a^2}{2bc}=\\frac{25+9-49}{30}=-\\frac12$。したがって $A=120^\\circ$ で鈍角。$\\sin A=\\sqrt{1-\\cos^2 A}=\\sqrt{1-\\frac14}=\\frac{\\sqrt3}{2}$。\n\n**別解**　$a=7$ が最大辺なので、角 $A$ は最大角。さらに $7^2=49$、$5^2+3^2=34$ で $a^2>b^2+c^2$ だから鈍角と先に判断できる。その後、余弦定理で $\\cos A=-\\frac12$ と確認する。\n\n**捨てるべき方針**　$\\sin A=\\frac{\\sqrt3}{2}$ だけを見て $A=60^\\circ$ と決めるのは危険。$120^\\circ$ でも同じ $\\sin$ になる。\n\n**検算**　最大辺 $a=7$ の向かいの角が鈍角になっているので、辺の大小と整合する。",
},
{
kind: "commonMistake",
title: "捨てるべき方針：とりあえず正弦定理・とりあえず角度追い",
body: "**NG**　外接円が見えないのに正弦定理から始める。あるいは、求めたいものが辺や面積なのに、角度を全部追おうとする。\n\n**OK**　辺と向かいの角のペアがあるときだけ正弦定理を第一候補にする。2辺とその間の角なら、余弦定理で辺、面積公式で面積が同時に出る。3辺なら余弦定理で $\\cos$ を出し、必要なときだけ $\\sin$ へ進む。\n\n**誤答分析**　正弦定理に飛びつくミスは、対応する辺と角のペアを確認していないことが原因。角度追いのミスは、求めたい量を見失っていることが原因。本番では「求めたい量→条件の形→公式」の順に戻す。",
},
{
kind: "checkpoint",
title: "共通テスト大問との接続",
body: "冊子型模試の図形と計量では、正弦定理・余弦定理を単独で使うより、面積・高さ・外接円半径とつないで使う場面が多いです。\n\n第1回の図形と計量では、三辺から高さ・面積・角・外接円半径へ進みます。第2回では測量で仰角・水平距離・余弦定理の判断が必要になります。\n\n問題解体型講座「第1問後半 図形と計量」では、$13,14,15$ の三角形を使って、余弦定理、三平方、面積、外接円半径、鈍角判定を同じ問題の中でつなげています。この講座で道具を確認したら、必ずその問題で本番の判断順まで戻してください。",
},
{
kind: "summary",
title: "まとめ",
body: "- 正弦定理は、辺とその向かいの角を結びつける\n- 余弦定理は、2辺とその間の角、または3辺から角を求めるときに使う\n- 正弦定理では、辺と角の対応が重要\n- 余弦定理では、角が2辺にはさまれているかを確認する\n- 三平方の定理は、余弦定理の特別な場合と見られる\n- 図形問題では、何が分かっていて何を求めたいかを整理して定理を選ぶ",
},
],
checkQuestions: [
{
question: "三角形ABCで、$a=8$、$A=30^\\circ$、$B=60^\\circ$ のとき、$b$ を求めよ。",
answer: "正弦定理より $\\frac{8}{\\sin30^\\circ}=\\frac{b}{\\sin60^\\circ}$。左辺は $16$ なので、$b=16\\cdot\\frac{\\sqrt{3}}{2}=8\\sqrt{3}$。",
hint: "辺と向かいの角を対応させる。",
},
{
question: "$b=4$、$c=7$、$A=60^\\circ$ の三角形で、辺 $a$ を求めよ。",
answer: "余弦定理より $a^2=4^2+7^2-2\\cdot4\\cdot7\\cdot\\frac{1}{2}=16+49-28=37$。よって $a=\\sqrt{37}$。",
hint: "2辺とその間の角なので余弦定理。",
},
{
question: "余弦定理 $a^2=b^2+c^2-2bc\\cos A$ において、角Aはどの位置の角か。",
answer: "辺 $b$ と辺 $c$ にはさまれた角であり、辺 $a$ の向かい側の角。",
hint: "Aの向かい側がa。",
},
{
question: "三角形ABCで、$a=10$、$A=45^\\circ$ のとき、外接円の半径 $R$ を求めよ。",
answer: "正弦定理より $2R=\\frac{a}{\\sin A}=\\frac{10}{\\frac{\\sqrt{2}}{2}}=10\\sqrt{2}$。よって $R=5\\sqrt{2}$。",
hint: "$\\frac{a}{\\sin A}=2R$。最後に $2$ で割る。",
},
{
question: "三角形ABCで、$a=5$、$b=8$、$c=7$ のとき、角 $C$ を求めよ。",
answer: "余弦定理より $\\cos C=\\frac{a^2+b^2-c^2}{2ab}=\\frac{25+64-49}{2\\cdot5\\cdot8}=\\frac{40}{80}=\\frac{1}{2}$。よって $C=60^\\circ$。",
hint: "3辺が分かる→余弦定理を角について変形。$C$ の向かいが $c$。",
},
{
question: "「$b=6$、$c=9$、$A=120^\\circ$ で辺 $a$ を求める」とき、正弦定理と余弦定理のどちらを使うか。理由も答えよ。",
answer: "余弦定理。2辺 $b,c$ とその間の角 $A$ が分かっており、向かいの辺 $a$ を求める形だから（辺と向かいの角のペアが無いので正弦定理は使えない）。",
hint: "与えられた情報が「2辺と間の角」か「辺と向かいの角」かを見る。",
},
],
relatedPracticeLinks: [
{ label: "定理選択完全攻略", href: "/courses/math-1a/figures-and-measurement/theorem-selection-mastery", description: "この講座は定理の導入。選び方の深掘りはこちら" },
{ label: "正弦定理・余弦定理 演習", href: "/units/figures-and-measurement" },
{ label: "問題解体型講座：第1問後半 図形と計量", href: "/common-test/problem-lectures/ct-ia-q1-back-geometry-measurement", description: "三辺から高さ・角・外接円半径へつなぐ" },
{ label: "図形と計量 中核講義", href: "/common-test/lectures/geometry-measurement-intensive", description: "高さ・測量・公式選択を総復習" },
{ label: "共通テスト型本番模試 第1回", href: "/common-test/simulator/common-test-math-1a-manual-001", description: "第1問の図形と計量を確認" },
{ label: "共通テスト型本番模試 第2回", href: "/common-test/simulator/common-test-math-1a-manual-002", description: "測量・余弦定理の実戦確認" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a" },
],
qualityTags: ["正弦定理", "余弦定理", "使い分け", "確認問題3問", "diagram-upgraded", "sine-rule", "cosine-rule", "読み替え表あり", "よくあるミスあり", "勝ち筋あり", "5秒ポイントあり", "別解あり", "検算あり", "共通テスト接続あり"],
},
{
lessonId: "theorem-selection-mastery",
lessonTitle: "図形と計量：定理選択完全攻略",
lessonDescription: "正弦定理・余弦定理・面積公式・高さを下ろす解法のどれを選ぶかを、求めたい量と情報の形から判断できるようにする。",
level: "standard",
estimatedMinutes: 75,
prerequisites: ["正弦定理と余弦定理", "三角形の面積と三角比"],
goals: [
"求めたい量（辺・角・面積・半径）から使う道具を逆引きできる",
"情報の形（2辺と間の角・1辺2角・3辺・外接円半径）で定理を選べる",
"正弦定理と余弦定理を取り違える事故を防げる",
"$\\sin$ の値だけで角を決めない判断ができる",
"共通テストの誘導がどの定理へ向かわせているか読める",
],
lessonBlocks: [
{
kind: "strategy",
title: "Core：定理は「公式名」ではなく「情報の形」で選ぶ",
body: "図形と計量の道具選びは、公式名を思い出す作業ではありません。**まず何を求めたいか**を決め、次に**分かっている情報の形**を見て、対応する道具を選びます。\n\n求めたい量は、辺・角・面積・高さ・外接円半径・内接円半径のどれか。分かっている情報は、2辺とその間の角・辺と向かいの角のペア・3辺・外接円半径・面積…のどれか。この2つを分けるだけで、使う道具はほぼ決まります。\n\n正弦定理は「辺と向かいの角」がセットのとき、余弦定理は「2辺とその間の角」または「3辺」のとき、面積公式は「2辺とその間の角」または「底辺と高さ」のときに使います。",
emphasis: "初手は「求めたい量」と「情報の形」を分けること。公式はその交点で決まる。",
},
{
kind: "comparisonTable",
title: "Core：求めたい量から道具を逆引きする",
body: "求めたい量が変わると、最初に疑う道具も変わります。",
columns: ["求めたい量", "優先して見る条件", "最初の候補"],
rows: [
{ cells: ["辺", "2辺とその間の角があるか", "余弦定理（直角があれば三平方）"], highlight: true },
{ cells: ["辺", "辺と向かいの角のペアがあるか", "正弦定理"] },
{ cells: ["角", "3辺が分かるか", "余弦定理で $\\cos$ を出す"], highlight: true },
{ cells: ["面積", "2辺とその間の角があるか", "$S=\\frac12ab\\sin C$"], highlight: true },
{ cells: ["外接円半径", "辺と対角、または3辺と面積", "正弦定理、または $S=\\frac{abc}{4R}$"] },
{ cells: ["内接円半径", "面積と半周長があるか", "$S=rs$"] },
{ cells: ["高さ", "面積と底辺、または直角三角形", "面積から逆算、または三角比"] },
],
},
{
kind: "comparisonTable",
title: "Core：情報の形から定理を選ぶ",
body: "与えられた情報の形は、そのまま使う定理を指しています。",
columns: ["与えられた情報", "使う定理", "理由"],
rows: [
{ cells: ["2辺とその間の角", "余弦定理・面積公式", "向かいの辺と面積が同時に出る"], highlight: true },
{ cells: ["1辺と2角", "正弦定理", "残り1角は $180^\\circ$ から、辺は対応ペアで"] },
{ cells: ["3辺", "余弦定理", "$\\cos$ を出して角へ"], highlight: true },
{ cells: ["辺と向かいの角＋もう1角", "正弦定理", "対応する辺を求める"] },
{ cells: ["外接円半径 $R$", "正弦定理", "$\\frac{a}{\\sin A}=2R$ とつながる"] },
],
},
{
kind: "workedExample",
title: "Core 例題1：2辺とその間の角 → 余弦定理と面積",
body: "**問題**　三角形 $ABC$ で $b=8$、$c=5$、$A=60^\\circ$ のとき、辺 $a$ と面積 $S$ を求めよ。\n\n**判断**　求めたいのは辺と面積。情報は「2辺 $b,c$ とその間の角 $A$」。この形なら、辺は余弦定理、面積は面積公式で **同じ条件から両方** 出る。\n\n**辺 $a$**　$a^2=b^2+c^2-2bc\\cos A=64+25-2\\cdot8\\cdot5\\cdot\\dfrac12=89-40=49$。よって $a=7$。\n\n**面積 $S$**　$S=\\dfrac12bc\\sin A=\\dfrac12\\cdot8\\cdot5\\cdot\\dfrac{\\sqrt3}{2}=10\\sqrt3$。\n\n**検算**　$A=60^\\circ$ は鋭角で $a=7$ は $b=8$ より短く、最大辺 $b$ の向かい $B$ が最大角になり整合。$S=10\\sqrt3>0$。\n\n**答え**　$a=7$、$S=10\\sqrt3$。",
},
{
kind: "diagram",
title: "図で見る：余弦定理（2辺とその間の角）",
body: "角 $A$（この図では $C$）をはさむ2辺と、その向かいの辺の関係です。2辺とその間の角があれば、向かいの辺と面積の両方に進めます。",
diagramType: "cosine-rule-triangle",
caption:
"「2辺とその間の角」は、余弦定理（向かいの辺）と面積公式 $\\frac12ab\\sin C$ の両方に使える最も強い形。",
},
{
kind: "workedExample",
title: "Core 例題2：1辺と2角 → 正弦定理",
body: "**問題**　三角形 $ABC$ で $a=10$、$A=45^\\circ$、$B=60^\\circ$ のとき、辺 $b$ を求めよ。\n\n**判断**　情報は「1辺と2角」。辺 $a$ とその向かいの角 $A$ のペアがあり、$b$ の向かいの角 $B$ も分かる。対応ペアがそろうので正弦定理。\n\n**式を立てる**　$\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}$ より $b=\\dfrac{a\\sin B}{\\sin A}=\\dfrac{10\\sin60^\\circ}{\\sin45^\\circ}=\\dfrac{10\\cdot\\frac{\\sqrt3}{2}}{\\frac{\\sqrt2}{2}}=\\dfrac{10\\sqrt3}{\\sqrt2}=5\\sqrt6$。\n\n**検算**　$B=60^\\circ>A=45^\\circ$ なので $b>a$、つまり $5\\sqrt6\\approx12.2>10$ で整合。\n\n**答え**　$b=5\\sqrt6$。",
},
{
kind: "workedExample",
title: "Core 例題3：3辺 → 余弦定理で角",
body: "**問題**　三角形 $ABC$ で $a=3$、$b=5$、$c=7$ のとき、角 $C$ を求めよ。\n\n**判断**　情報は「3辺」。辺と向かいの角のペアが無いので正弦定理は使えない。角を出すには余弦定理を角について変形する。\n\n**式を立てる**　$\\cos C=\\dfrac{a^2+b^2-c^2}{2ab}=\\dfrac{9+25-49}{2\\cdot3\\cdot5}=\\dfrac{-15}{30}=-\\dfrac12$。\n\n**角に直す**　$0^\\circ<C<180^\\circ$ で $\\cos C=-\\dfrac12$ となるのは $C=120^\\circ$。\n\n**検算**　最大辺 $c=7$ の向かいの角 $C$ が最大角で、$c^2=49>a^2+b^2=34$ だから鈍角。$\\cos C<0$ と整合。三角形の成立も $3+5=8>7$ でOK。\n\n**答え**　$C=120^\\circ$。",
},
{
kind: "workedExample",
title: "Core 例題4：外接円半径 → 正弦定理",
body: "**問題**　三角形 $ABC$ で $a=8$、$A=30^\\circ$ のとき、外接円の半径 $R$ を求めよ。\n\n**判断**　求めたいのは外接円半径。辺 $a$ とその向かいの角 $A$ のペアがあるので、正弦定理の $\\dfrac{a}{\\sin A}=2R$ を使う。\n\n**式を立てる**　$2R=\\dfrac{a}{\\sin A}=\\dfrac{8}{\\sin30^\\circ}=\\dfrac{8}{\\frac12}=16$。\n\n**$R$ に直す**　$2R=16$ なので $R=8$。**$2R$ をそのまま答えない**（最後に $2$ で割る）。\n\n**答え**　$R=8$。",
},
{
kind: "strategy",
title: "Branch：迷いやすい分岐の決め方",
body: "情報がひと目で読めないときは、次の順に分岐します。\n\n① 辺と向かいの角のペアがあるか → あれば正弦定理を第一候補にする。\n\n② 無いなら、2辺とその間の角があるか → あれば余弦定理（辺）と面積公式（面積）。\n\n③ それも無く3辺だけなら → 余弦定理で角、必要なら面積はヘロン。\n\n④ 外接円半径や内接円半径が絡むなら → $2R$（正弦定理）、$S=\\frac{abc}{4R}$、$S=rs$ を候補にする。\n\n文字が多くて何から手をつけるか迷うときは、**求めたい量から逆算** します。目的量を含む式が1本立てば、そこに必要な情報だけを集めればよいからです。",
emphasis: "分岐の入口は必ず「対応ペアがあるか」。無ければ余弦定理へ落とす。",
},
{
kind: "comparisonTable",
title: "Trap：定理選択の事故パターン",
body: "定理選択の失点は、情報の形を確認しないことから起こります。",
columns: ["事故パターン", "なぜ危険か", "回避方法"],
rows: [
{ cells: ["とりあえず正弦定理", "対応ペアが無いと詰まる／対応ミス", "先に「辺と向かいの角」があるか確認"], highlight: true },
{ cells: ["3辺なのに正弦定理", "角の $\\sin$ が分からず進めない", "3辺なら余弦定理で $\\cos$ を出す"], highlight: true },
{ cells: ["$R$ と $2R$ の混同", "半径が2倍ずれる", "$\\frac{a}{\\sin A}=2R$、最後に $2$ で割る"] },
{ cells: ["$\\sin$ の値だけで角を決める", "鋭角・鈍角の2候補が出る", "$\\cos$ の符号・最大辺で確定"], highlight: true },
{ cells: ["余弦定理の符号ミス", "$-2bc\\cos A$ を $+$ にする", "$\\cos$ の前は常にマイナス、$90^\\circ$ で三平方に戻るか確認"] },
{ cells: ["挟角でない角で面積", "面積が合わない", "$\\frac12ab\\sin C$ の $C$ は $a,b$ の間の角"] },
],
},
{
kind: "workedExample",
title: "Trap 例題：$\\sin$ だけで角を決めない",
body: "**問題**　三角形 $ABC$ で $a=7$、$b=5$、$c=3$ のとき、角 $A$ の種類と $\\sin A$ を求めよ。\n\n**判断**　3辺がそろっているので、$\\sin$ を先に出すより、まず余弦定理で $\\cos A$ を出し、鋭角か鈍角かを **符号で確定** する方が安全。\n\n**標準解答**　$\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}=\\dfrac{25+9-49}{30}=-\\dfrac12$。よって $A=120^\\circ$ で鈍角。$\\sin A=\\sqrt{1-\\cos^2A}=\\sqrt{1-\\frac14}=\\dfrac{\\sqrt3}{2}$。\n\n**捨てるべき方針**　$\\sin A=\\dfrac{\\sqrt3}{2}$ だけを見て $A=60^\\circ$ と決めるのは危険。$120^\\circ$ でも同じ $\\sin$。\n\n**検算**　最大辺 $a=7$ の向かいが最大角。$a^2=49>b^2+c^2=34$ なので鈍角で整合。\n\n**答え**　$A=120^\\circ$（鈍角）、$\\sin A=\\dfrac{\\sqrt3}{2}$。",
},
{
kind: "commonMistake",
title: "誤答分析：公式を先に決めてしまう",
body: "**NG**　問題を見た瞬間に「これは正弦定理」と決めつけ、対応ペアや情報の形を確認しない。\n\n**OK**　公式は情報の形から選ぶ。2辺と間の角なら余弦定理、辺と向かいの角なら正弦定理、3辺なら余弦定理で角。求めたい量を含む式が立つかで判断する。\n\n**誤答分析**　正弦定理に飛びつくミスは、対応する辺と角のペアを確認していないことが原因。角度追いのミスは、求めたい量を見失っていることが原因。本番では「求めたい量 → 情報の形 → 公式」の順に戻す。",
emphasis: "道具は問いと情報で選ぶ。式変形を先に始めない。",
},
{
kind: "checkpoint",
title: "Synthesis：共通テスト・入試での戻り先",
body: "共通テストの図形と計量は、誘導が「まずこの辺」「次にこの角」「最後に半径や面積」と、道具の順番を指定してきます。その順番が、まさにこの講座の判断表です。\n\n誘導が $\\cos$ を先に問うなら余弦定理へ、$\\dfrac{a}{\\sin A}$ の形を出すなら正弦定理・外接円へ、面積を問うなら $\\frac12ab\\sin C$ へ向かっています。\n\n道具の使い方そのものは「正弦定理と余弦定理」「三角形の面積と三角比」に、面積の深掘りは「面積公式完全攻略」に、角の候補や鈍角判定は「鈍角・存在条件・SSA完全攻略」に戻って確認してください。",
},
{
kind: "summary",
title: "まとめ",
body: "- 定理は公式名ではなく、求めたい量と情報の形で選ぶ\n- 辺と向かいの角のペア → 正弦定理\n- 2辺とその間の角 → 余弦定理・面積公式\n- 3辺 → 余弦定理で角\n- 外接円半径 → 正弦定理の $2R$\n- $\\sin$ の値だけで角を決めず、$\\cos$ の符号・最大辺で確認する\n- 迷ったら求めたい量から逆算し、必要な情報だけ集める",
},
],
checkQuestions: [
{
question: "「$b=6$、$c=9$、$A=120^\\circ$ で辺 $a$ を求める」とき、どの定理を使うか。理由も答えよ。",
answer: "余弦定理。2辺 $b,c$ とその間の角 $A$ から向かいの辺 $a$ を求める形（辺と向かいの角のペアが無いので正弦定理は使えない）。$a^2=36+81-2\\cdot6\\cdot9\\cos120^\\circ=117+54=171$、$a=3\\sqrt{19}$。",
hint: "情報が「2辺と間の角」か「辺と向かいの角」かを見る。",
},
{
question: "3辺が $a=4$、$b=5$、$c=6$ のとき、最大角はどの角か、また鋭角か鈍角か。",
answer: "最大辺 $c=6$ の向かいの角 $C$ が最大角。$\\cos C=\\dfrac{16+25-36}{2\\cdot4\\cdot5}=\\dfrac{5}{40}=\\dfrac18>0$ なので鋭角。",
hint: "最大辺の向かいが最大角。cosの符号で鋭角・鈍角を判定。",
},
{
question: "三角形で $a=12$、$A=60^\\circ$ のとき、外接円半径 $R$ を求めよ。",
answer: "$2R=\\dfrac{a}{\\sin A}=\\dfrac{12}{\\frac{\\sqrt3}{2}}=\\dfrac{24}{\\sqrt3}=8\\sqrt3$。よって $R=4\\sqrt3$。",
hint: "$\\frac{a}{\\sin A}=2R$。最後に2で割る。",
},
],
relatedPracticeLinks: [
{ label: "正弦定理と余弦定理", href: "/courses/math-1a/figures-and-measurement/sine-law-cosine-law", description: "各定理の使い方の導入に戻る" },
{ label: "面積公式完全攻略", href: "/courses/math-1a/figures-and-measurement/triangle-area-mastery", description: "面積の道具選びを深掘り" },
{ label: "鈍角・存在条件・SSA完全攻略", href: "/courses/math-1a/figures-and-measurement/obtuse-ssa-existence-mastery", description: "sinの値だけで角を決めない判断" },
{ label: "問題解体型講座：第1問後半 図形と計量", href: "/common-test/problem-lectures/ct-ia-q1-back-geometry-measurement", description: "定理選択を冊子型問題で確認" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a", description: "共通テスト対策" },
],
qualityTags: ["定理選択", "判断フロー", "事故パターン表", "正弦定理", "余弦定理", "面積公式", "確認問題3問", "diagram-upgraded", "cosine-rule", "誤答分析あり", "検算あり", "共通テスト接続あり"],
},
{
lessonId: "area-radius-relations",
lessonTitle: "面積・内接円・外接円",
lessonDescription: "三角形の面積公式と、内接円・外接円の関係を整理する。",
level: "standard",
estimatedMinutes: 70,
prerequisites: ["三角形の面積と三角比", "正弦定理と余弦定理"],
goals: [
"三角形の複数の面積公式を使い分けられる",
"内接円の半径と面積の関係を理解できる",
"外接円の半径と正弦定理の関係を理解できる",
"問題文の条件から使う公式を選べる",
"入試標準の三角形計量問題を整理できる",
],
lessonBlocks: [
{
kind: "intro",
title: "三角形の面積公式は1つではない",
body: "三角形の面積は、$\\frac{1}{2}\\times\\text{底辺}\\times\\text{高さ}$ だけでなく、さまざまな形で表せます。\n\n図形と計量では、与えられた条件に応じて面積公式を使い分けることが重要です。\n\n2辺とその間の角が分かっているなら、$S=\\frac{1}{2}bc\\sin A$ が使えます。\n\n内接円の半径が関係するなら、$S=rs$ が使えます。\n\n外接円の半径が関係するなら、正弦定理の $2R$ が使えます。\n\n上級問題では、これらを組み合わせて解くこともあります。",
},
{
kind: "comparisonTable",
title: "三角形の面積公式",
body: "どの情報が与えられているかによって、使う面積公式を選びます。",
columns: ["公式", "使う場面", "意味"],
rows: [
{
cells: ["$S=\\frac{1}{2}ah$", "底辺と高さが分かる", "面積の基本"],
},
{
cells: ["$S=\\frac{1}{2}bc\\sin A$", "2辺とその間の角が分かる", "高さを三角比で表す"],
highlight: true,
},
{
cells: ["$S=rs$", "内接円半径が関係する", "$s$ は半周長"],
},
{
cells: ["$S=\\frac{abc}{4R}$", "3辺と外接円半径が関係する", "正弦定理から導く"],
},
],
},
{
kind: "strategy",
title: "この講座の勝ち筋・5秒で見るポイント",
body: "この講座の勝ち筋は、**面積をハブにして、内接円半径 $r$ と外接円半径 $R$ をつなぐこと**です。\n\n5秒で見るポイントは、(1) 底辺と高さ、(2) 2辺とその間の角、(3) 面積と半周長、(4) 3辺と外接円半径、の4つです。条件がどれに当たるかを見れば、使う公式はほぼ決まります。\n\n絶対に避けるミスは、$S=rs$ の $s$ を周長と間違えること、そして $S=\\frac{abc}{4R}$ の $R$ と正弦定理の $2R$ を混同することです。\n\n図を信じる前に、既知量を「3辺」「面積」「半周長」「内接円半径」「外接円半径」に分類します。角度を追うのは、その分類で足りないときだけで十分です。",
emphasis:
"面積はゴールにも中継点にもなる。$S$ が出たら、$S=rs$ と $abc=4RS$ の両方を候補にする。",
},
{
kind: "comparisonTable",
title: "面積公式の選択表",
body: "面積・内接円・外接円は、同じ三角形の情報を別の形で読む道具です。",
columns: ["見えている条件", "使う公式", "注意点"],
rows: [
{
cells: ["底辺と高さ", "$S=\\frac12ah$", "高さは底辺に垂直"],
highlight: true,
},
{
cells: ["2辺とその間の角", "$S=\\frac12ab\\sin C$", "角が2辺にはさまれているか確認"],
highlight: true,
},
{
cells: ["内接円半径 $r$ と半周長 $s$", "$S=rs$", "$s$ は周長の半分"],
},
{
cells: ["3辺 $a,b,c$ と外接円半径 $R$", "$S=\\frac{abc}{4R}$", "$R$ は半径、$2R$ ではない"],
},
{
cells: ["3辺だけ", "ヘロンで $S$、その後 $r,R$ へ", "計算は重いが確実"],
},
],
},
{
kind: "formula",
title: "内接円半径と面積",
body: "三角形の内接円の半径を $r$、半周長を $s=\\frac{a+b+c}{2}$ とすると、面積 $S$ は次のように表せます。\n\n三角形を、内心から各辺に下ろした3つの三角形に分けると、この公式が出てきます。",
formula: "S=rs",
},
{
kind: "workedExample",
title: "例1：内接円半径を求める",
body: "3辺が $5$、$6$、$7$ の三角形の面積が $6\\sqrt{6}$ であるとします。この三角形の内接円の半径 $r$ を求めます。\n\nまず半周長 $s$ を求めます。\n\n$s=\\frac{5+6+7}{2}=9$\n\n面積公式 $S=rs$ より、\n\n$6\\sqrt{6}=9r$\n\nしたがって、\n\n$r=\\frac{2\\sqrt{6}}{3}$\n\nです。\n\n内接円の半径が出てきたら、面積と半周長の関係を考えます。",
},
{
kind: "formula",
title: "外接円半径と面積",
body: "三角形の3辺を $a,b,c$、外接円の半径を $R$、面積を $S$ とすると、次の公式が成り立ちます。\n\nこの公式は、正弦定理と面積公式を組み合わせることで導けます。",
formula: "S=\\frac{abc}{4R}",
},
{
kind: "workedExample",
title: "例2：外接円半径を求める",
body: "三角形の3辺が $5$、$6$、$7$、面積が $6\\sqrt{6}$ のとき、外接円の半径 $R$ を求めます。\n\n公式 $S=\\frac{abc}{4R}$ を使います。\n\n$6\\sqrt{6}=\\frac{5\\cdot6\\cdot7}{4R}$\n\n$6\\sqrt{6}=\\frac{210}{4R}$\n\n両辺に $4R$ をかけて、\n\n$24\\sqrt{6}R=210$\n\nしたがって、\n\n$R=\\frac{210}{24\\sqrt{6}}=\\frac{35}{4\\sqrt{6}}=\\frac{35\\sqrt{6}}{24}$\n\nです。",
},
{
kind: "workedExample",
title: "代表例題：3辺から面積・内接円半径・外接円半径へ",
body: "**問題**　3辺が $13,14,15$ の三角形について、面積 $S$、内接円半径 $r$、外接円半径 $R$ を求めよ。\n\n**本番での判断順**　3辺がそろっているので、面積をまず確定する。高さが別に求まっていれば $S=\\frac12ah$、高さが見えなければヘロン。面積が出たら、$r$ は $S=rs$、$R$ は $abc=4RS$ でつなぐ。\n\n**標準解答**　半周長は $s=\\frac{13+14+15}{2}=21$。ヘロンより $S=\\sqrt{21(21-13)(21-14)(21-15)}=\\sqrt{21\\cdot8\\cdot7\\cdot6}=84$。内接円半径は $S=rs$ より $84=21r$、したがって $r=4$。外接円半径は $abc=4RS$ より $R=\\frac{13\\cdot14\\cdot15}{4\\cdot84}=\\frac{65}{8}$。\n\n**別解**　垂線を下ろして高さ $12$ が出ていれば、面積は $S=\\frac12\\times14\\times12=84$ とすぐに出る。その後の $r,R$ は同じ公式につなぐ。\n\n**捨てるべき方針**　外接円半径を出すために毎回角を求め直す必要はない。3辺と面積がそろったら $abc=4RS$ が最短。\n\n**検算**　$R=\\frac{65}{8}=8.125$ は最長辺15の半分7.5より大きく、外接円半径として妥当。$r=4$ なら $rs=4\\times21=84$ で面積に戻る。",
},
{
kind: "commonMistake",
title: "よくあるミス：sを周長と間違える",
body: "公式 $S=rs$ の $s$ は、周長ではなく半周長です。\n\nつまり、$s=a+b+c$ ではなく、\n\n$s=\\frac{a+b+c}{2}$\n\nです。\n\nここを間違えると、内接円の半径が2倍ずれてしまいます。\n\n内接円の公式を使うときは、まず半周長を計算する習慣をつけましょう。",
},
{
kind: "commonMistake",
title: "誤答分析：内接円と外接円を同じノリで扱う",
body: "**NG**　内接円半径も外接円半径も「円の半径」だから同じ公式で出せると思う。\n\n**OK**　内接円は三角形を3つの小三角形に分けるので $S=rs$。外接円は正弦定理と面積公式から $abc=4RS$。由来も使う条件も違います。\n\n**捨てるべき方針**　$R$ を求めたいのに $S=rs$ を使う、$r$ を求めたいのに $abc=4RS$ を使う、という式の取り違えは最初に消す。求めたいのが内接円なら半周長、外接円なら3辺と面積を探します。\n\n**検算**　$S=rs$ に戻して面積が一致するか、$abc=4RS$ に戻して両辺が一致するかを確認します。",
},
{
kind: "checkpoint",
title: "共通テスト大問との接続",
body: "冊子型模試の図形と計量では、外接円半径は単独の公式問題ではなく、前半で求めた面積や辺の長さを使って最後に出す形で現れます。\n\n第1回の図形と計量では、三辺から高さ・面積を出し、その面積を使って外接円半径へ進みます。問題解体型講座「第1問後半 図形と計量」でも、$13,14,15$ の三角形で $S=84$ を確定してから $R=\\frac{65}{8}$ に接続します。\n\nこの講座を読んだら、公式を覚えるだけでなく、面積が出た瞬間に「内接円 $r$ に行けるか、外接円 $R$ に行けるか」を反射的に確認してください。",
},
{
kind: "summary",
title: "まとめ",
body: "- 三角形の面積公式は条件によって使い分ける\n- 2辺とその間の角なら $S=\\frac{1}{2}bc\\sin A$\n- 内接円半径なら $S=rs$\n- $s$ は半周長\n- 外接円半径なら $S=\\frac{abc}{4R}$\n- 正弦定理・余弦定理・面積公式はセットで使うことが多い",
},
],
checkQuestions: [
{
question: "3辺が $4$、$5$、$6$ の三角形の面積を $S$、内接円半径を $r$ とする。半周長 $s$ を求めよ。",
answer: "$s=\\frac{4+5+6}{2}=\\frac{15}{2}$。",
hint: "sは周長ではなく半周長。",
},
{
question: "三角形の面積が $20$、半周長が $10$ のとき、内接円半径を求めよ。",
answer: "$S=rs$ より、$20=10r$。したがって $r=2$。",
hint: "内接円半径は $S=rs$。",
},
{
question: "3辺が $3$、$4$、$5$、面積が $6$ の三角形の外接円半径を求めよ。",
answer: "$S=\\frac{abc}{4R}$ より、$6=\\frac{3\\cdot4\\cdot5}{4R}=\\frac{60}{4R}$。よって $24R=60$、$R=\\frac{5}{2}$。",
hint: "外接円半径なら $S=\\frac{abc}{4R}$。",
},
],
relatedPracticeLinks: [
{ label: "面積公式完全攻略", href: "/courses/math-1a/figures-and-measurement/triangle-area-mastery", description: "面積を $r$・$R$ へ中継する判断を深掘り" },
{ label: "内接円・外接円 演習", href: "/units/figures-and-measurement" },
{ label: "問題解体型講座：第1問後半 図形と計量", href: "/common-test/problem-lectures/ct-ia-q1-back-geometry-measurement", description: "3辺・面積・外接円半径の接続" },
{ label: "共通テスト型本番模試 第1回", href: "/common-test/simulator/common-test-math-1a-manual-001", description: "外接円半径までの流れを確認" },
{ label: "共通テスト型本番模試 第2回", href: "/common-test/simulator/common-test-math-1a-manual-002", description: "図形と計量の本番形式" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a" },
],
qualityTags: ["面積公式", "内接円", "外接円", "正弦定理", "確認問題3問", "勝ち筋あり", "5秒ポイントあり", "別解あり", "検算あり", "共通テスト接続あり"],
},
{
lessonId: "triangle-area-mastery",
lessonTitle: "図形と計量：面積公式完全攻略",
lessonDescription: "$\\frac12ab\\sin C$ を暗記するのではなく、どの角を挟角に選ぶか、分割・面積比・逆算・最大化のどれで攻めるかを判断する。",
level: "standard",
estimatedMinutes: 75,
prerequisites: ["三角形の面積と三角比", "面積・内接円・外接円"],
goals: [
"条件に応じて面積公式を選び分けられる",
"挟角を正しく選んで $\\frac12ab\\sin C$ を使える",
"同じ高さ・同じ底辺・共有角による面積比を使える",
"面積から辺や角を逆算できる",
"面積の最大最小を二次関数・三角比と結びつけられる",
],
lessonBlocks: [
{
kind: "strategy",
title: "Core：面積は「どの形の情報があるか」で公式を選ぶ",
body: "三角形の面積は1つの公式では決まりません。**与えられた情報の形** に合わせて、次の中から選びます。\n\n底辺と高さが見えるなら $S=\\frac12\\times\\text{底辺}\\times\\text{高さ}$。2辺とその間の角なら $S=\\frac12ab\\sin C$。面積と半周長が絡むなら $S=rs$。3辺と外接円半径なら $S=\\frac{abc}{4R}$。3辺だけならヘロン。\n\n大切なのは、面積は **ゴールにも中継点にもなる** ことです。面積が出れば、$S=rs$ で内接円半径 $r$、$abc=4RS$ で外接円半径 $R$ へ進めます。逆に面積が与えられたら、辺や角や高さを逆算できます。",
emphasis: "面積は公式暗記ではなく、条件の形から選ぶ。出た面積は次の量への中継点にする。",
},
{
kind: "comparisonTable",
title: "Core：面積公式の選択表",
body: "見えている条件から、使う面積公式を選びます。",
columns: ["見えている条件", "使う公式", "注意点"],
rows: [
{ cells: ["底辺と高さ", "$S=\\frac12ah$", "高さは底辺に垂直"], highlight: true },
{ cells: ["2辺とその間の角", "$S=\\frac12ab\\sin C$", "角が2辺にはさまれているか確認"], highlight: true },
{ cells: ["内接円半径 $r$ と半周長 $s$", "$S=rs$", "$s=\\frac{a+b+c}{2}$（半分）"] },
{ cells: ["3辺と外接円半径 $R$", "$S=\\frac{abc}{4R}$", "$R$ は半径、$2R$ ではない"] },
{ cells: ["3辺だけ", "ヘロン $S=\\sqrt{s(s-a)(s-b)(s-c)}$", "計算は重いが確実"] },
],
},
{
kind: "concept",
title: "Core：高さを三角比で作るのが面積公式の正体",
body: "$S=\\frac12ab\\sin C$ は暗記用の別公式ではありません。底辺×高さ÷2の高さを、三角比で置き換えただけです。\n\n辺 $a$ を底辺とし、もう一方の辺 $b$ の端から底辺へ垂線を下ろすと、その高さは $b\\sin C$ です（$\\sin C=\\dfrac{\\text{高さ}}{b}$ より）。\n\nしたがって $S=\\dfrac12\\times a\\times b\\sin C=\\dfrac12ab\\sin C$。ここで $C$ は必ず **2辺 $a,b$ にはさまれた角**（挟角）です。挟角でない角を入れると高さがずれ、面積が合いません。",
},
{
kind: "diagram",
title: "図で見る：高さは「斜辺 × sin」で作る",
body: "直角三角形では対辺 $=$ 斜辺 $\\times\\sin$。三角形の高さも、辺を斜辺と見て $b\\sin C$ と表せます。これが面積公式 $S=\\frac12ab\\sin C$ の正体です。",
diagramType: "right-triangle-trig",
caption:
"高さ $=$ 辺 $\\times\\sin(\\text{挟角})$。$S=\\frac12\\times$ 底辺 $\\times$ 高さ $=\\frac12ab\\sin C$。",
},
{
kind: "workedExample",
title: "Core 例題1：挟角を選んで面積を出す",
body: "**問題**　三角形 $ABC$ で $b=7$、$c=8$、$A=60^\\circ$ のとき、面積 $S$ を求めよ。\n\n**判断**　「2辺 $b,c$ とその間の角 $A$」の形。$A$ は $b,c$ にはさまれた挟角なので $S=\\frac12bc\\sin A$ がそのまま使える。\n\n**計算**　$S=\\dfrac12\\cdot7\\cdot8\\cdot\\sin60^\\circ=28\\cdot\\dfrac{\\sqrt3}{2}=14\\sqrt3$。\n\n**検算**　$14\\sqrt3\\approx24.2$。底辺 $8$、もう一辺 $7$ の三角形として妥当な大きさ。\n\n**答え**　$S=14\\sqrt3$。",
},
{
kind: "workedExample",
title: "Core 例題2：面積から角を逆算する（2候補に注意）",
body: "**問題**　2辺の長さが $4$、$6$ で、その間の角を $\\theta$ とする。面積が $6$ のとき、$\\theta$ を求めよ。\n\n**判断**　面積と2辺が分かり、挟角 $\\theta$ を逆算する。$S=\\frac12ab\\sin\\theta$ を $\\sin\\theta$ について解く。\n\n**式を立てる**　$6=\\dfrac12\\cdot4\\cdot6\\cdot\\sin\\theta=12\\sin\\theta$。よって $\\sin\\theta=\\dfrac12$。\n\n**角の候補**　$0^\\circ<\\theta<180^\\circ$ で $\\sin\\theta=\\dfrac12$ となるのは $\\theta=30^\\circ$ と $\\theta=150^\\circ$ の **2つ**。面積だけからはどちらも起こり得る。\n\n**確認**　鋭角の三角形か鈍角の三角形かなど、追加条件があればそれで絞る。無ければ両方が答え。\n\n**答え**　$\\theta=30^\\circ$ または $\\theta=150^\\circ$。",
},
{
kind: "strategy",
title: "Branch：面積比は「何が共通か」で決まる",
body: "2つの三角形の面積を比べるとき、比を決めるのは **共通しているもの** です。\n\n高さが同じなら、面積比は底辺の比。底辺が同じなら、面積比は高さの比。角が共通なら、$S=\\frac12ab\\sin C$ で $\\sin C$ が共通なので、面積比はその角をはさむ2辺の積の比になります。\n\nこの考え方は、辺上の点で三角形を分けたり、1点から複数の三角形を作る問題で強力です。個々の面積を出さずに比だけで答えが決まることがあります。",
emphasis: "面積比は、共通する量（高さ・底辺・角）を見つけてから、残りの量の比で決める。",
},
{
kind: "comparisonTable",
title: "Branch：面積比のパターン",
body: "共通しているものによって、面積比の作り方が変わります。",
columns: ["共通しているもの", "面積比", "使う場面"],
rows: [
{ cells: ["高さが同じ", "底辺の比", "辺上の点で分けた三角形"], highlight: true },
{ cells: ["底辺が同じ", "高さの比", "同じ辺を共有する三角形"] },
{ cells: ["角が共通", "はさむ2辺の積の比", "1点から広がる三角形 $\\frac{\\frac12b'c'\\sin A}{\\frac12bc\\sin A}=\\frac{b'c'}{bc}$"], highlight: true },
],
},
{
kind: "workedExample",
title: "Branch 例題：同じ高さによる面積比",
body: "**問題**　三角形 $ABC$ の辺 $BC$ 上に点 $D$ を、$BD:DC=2:3$ となるようにとる。三角形 $ABC$ の面積が $30$ のとき、三角形 $ABD$ の面積を求めよ。\n\n**判断**　$ABD$ と $ADC$ は、頂点 $A$ から $BC$ に下ろした **高さが共通**。だから面積比は底辺の比 $BD:DC=2:3$。\n\n**計算**　$[ABD]:[ADC]=2:3$ で、$[ABD]+[ADC]=[ABC]=30$。よって $[ABD]=30\\times\\dfrac{2}{2+3}=12$。\n\n**検算**　$[ADC]=30\\times\\dfrac35=18$、$12+18=30$ で整合。\n\n**答え**　$[ABD]=12$。",
},
{
kind: "workedExample",
title: "Synthesis 例題1：3辺から面積、内接円半径へつなぐ",
body: "**問題**　3辺が $5$、$6$、$7$ の三角形の面積 $S$ と内接円半径 $r$ を求めよ。\n\n**判断**　3辺だけなので、まずヘロンで面積を確定し、面積が出たら $S=rs$ で内接円半径へ中継する。\n\n**面積**　$s=\\dfrac{5+6+7}{2}=9$。$S=\\sqrt{s(s-a)(s-b)(s-c)}=\\sqrt{9\\cdot4\\cdot3\\cdot2}=\\sqrt{216}=6\\sqrt6$。\n\n**内接円半径**　$S=rs$ より $6\\sqrt6=9r$、$r=\\dfrac{6\\sqrt6}{9}=\\dfrac{2\\sqrt6}{3}$。\n\n**検算**　$rs=\\dfrac{2\\sqrt6}{3}\\times9=6\\sqrt6=S$ に戻る。$s$ は周長 $18$ の半分 $9$ で正しい。\n\n**答え**　$S=6\\sqrt6$、$r=\\dfrac{2\\sqrt6}{3}$。",
},
{
kind: "workedExample",
title: "Synthesis 例題2：面積の最大化（二次関数との融合）",
body: "**問題**　2辺の長さが $x$ と $8-x$、その間の角が $30^\\circ$ の三角形の面積 $S$ を、$0<x<8$ で最大にする $x$ と最大値を求めよ。\n\n**判断**　挟角 $30^\\circ$ が固定で2辺が動く。面積を $x$ の式にすると二次関数になる。\n\n**式にする**　$S=\\dfrac12\\cdot x\\cdot(8-x)\\cdot\\sin30^\\circ=\\dfrac12x(8-x)\\cdot\\dfrac12=\\dfrac14x(8-x)$。\n\n**最大化**　$x(8-x)=-(x-4)^2+16$ なので、$x=4$ のとき最大。$S=\\dfrac14\\times16=4$。定義域 $0<x<8$ の内部にあるので有効。\n\n**検算**　$x=4$ なら2辺はともに $4$。$S=\\dfrac12\\cdot4\\cdot4\\cdot\\dfrac12=4$ に一致。\n\n**答え**　$x=4$ のとき最大値 $S=4$。",
},
{
kind: "commonMistake",
title: "誤答分析：面積公式でやりがちなミス",
body: "**挟角でない角を使う**　$S=\\frac12ab\\sin C$ の $C$ は必ず $a,b$ にはさまれた角。別の角を入れると高さがずれる。図で「どの2辺のどの角か」を言葉にしてから代入する。\n\n**面積比で高さの違いを無視する**　底辺の比＝面積比が成り立つのは高さが同じときだけ。高さが違う三角形どうしでは使えない。\n\n**$s$ を周長と間違える**　$S=rs$ の $s$ は半周長 $\\frac{a+b+c}{2}$。周長で計算すると $r$ が半分になる。\n\n**逆算で角を1つに決める**　面積から $\\sin\\theta$ を出したら、鋭角・鈍角の2候補を確認する。",
emphasis: "挟角・共通量・半周長・角の2候補。面積問題の失点はこの4点に集中する。",
},
{
kind: "checkpoint",
title: "最後の判断フロー",
body: "面積問題を見たら、次の順に処理します。\n\n1. 求めたいのは面積か、面積から先の量（$r$、$R$、高さ、角）か。\n2. 見えている条件を分類する。底辺と高さ・2辺と挟角・面積と半周長・3辺と外接円半径・3辺だけ。\n3. 対応する公式を選ぶ。$\\frac12ah$、$\\frac12ab\\sin C$、$S=rs$、$S=\\frac{abc}{4R}$、ヘロン。\n4. 面積が出たら、$S=rs$ と $abc=4RS$ で $r,R$ へ中継できるか見る。\n5. 面積が与えられているなら、辺・角・高さを逆算する。角は2候補を確認する。\n6. 面積比なら、共通する高さ・底辺・角を見つけてから比を作る。",
},
{
kind: "summary",
title: "まとめ",
body: "- 面積公式は条件の形で選ぶ\n- $S=\\frac12ab\\sin C$ の $C$ は挟角\n- 高さは辺 $\\times\\sin(\\text{挟角})$ で作れる\n- 面積比は共通量（高さ・底辺・角）で決まる\n- 面積が出たら $r$（$S=rs$）、$R$（$abc=4RS$）へ中継\n- 面積から角を逆算するときは2候補を確認\n- 挟角固定で2辺が動くと、面積は二次関数になる",
},
],
checkQuestions: [
{
question: "2辺が $5$、$6$、その間の角が $120^\\circ$ の三角形の面積を求めよ。",
answer: "$S=\\dfrac12\\cdot5\\cdot6\\cdot\\sin120^\\circ=15\\cdot\\dfrac{\\sqrt3}{2}=\\dfrac{15\\sqrt3}{2}$。",
hint: "$\\sin120^\\circ=\\frac{\\sqrt3}{2}$。挟角を確認。",
},
{
question: "三角形 $ABC$ の辺 $BC$ 上の点 $D$ が $BD:DC=3:1$ を満たす。$[ABC]=20$ のとき $[ADC]$ を求めよ。",
answer: "高さが共通なので面積比は底辺比 $3:1$。$[ADC]=20\\times\\dfrac{1}{3+1}=5$。",
hint: "同じ高さ→面積比は底辺比。",
},
{
question: "2辺が $3$、$4$、その間の角 $\\theta$ の三角形の面積が $3$ のとき、$\\theta$ を求めよ。",
answer: "$3=\\dfrac12\\cdot3\\cdot4\\sin\\theta=6\\sin\\theta$ より $\\sin\\theta=\\dfrac12$。$0^\\circ<\\theta<180^\\circ$ より $\\theta=30^\\circ$ または $150^\\circ$。",
hint: "面積から sin を出したら鋭角・鈍角の2候補。",
},
],
relatedPracticeLinks: [
{ label: "三角形の面積と三角比", href: "/courses/math-1a/figures-and-measurement/triangle-area-with-trigonometry", description: "面積公式の意味の導入に戻る" },
{ label: "面積・内接円・外接円", href: "/courses/math-1a/figures-and-measurement/area-radius-relations", description: "$S=rs$、$S=\\frac{abc}{4R}$ の導入" },
{ label: "定理選択完全攻略", href: "/courses/math-1a/figures-and-measurement/theorem-selection-mastery", description: "面積を含む道具全体の選び方" },
{ label: "鈍角・存在条件・SSA完全攻略", href: "/courses/math-1a/figures-and-measurement/obtuse-ssa-existence-mastery", description: "面積逆算での角の2候補を詰める" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a", description: "共通テスト対策" },
],
qualityTags: ["面積公式", "面積公式選択表", "面積比", "分割", "面積逆算", "最大最小", "確認問題3問", "diagram-upgraded", "right-triangle-trig", "誤答分析あり", "検算あり"],
},
{
lessonId: "obtuse-ssa-existence-mastery",
lessonTitle: "図形と計量：鈍角・存在条件・SSA完全攻略",
lessonDescription: "$\\sin$ の値だけで角を決める事故、鋭角・鈍角の判定、SSAで三角形が0・1・2個になる場合、三角形の成立条件を体系的に防ぐ。",
level: "standard",
estimatedMinutes: 75,
prerequisites: ["正弦定理と余弦定理", "鈍角の三角比と相互関係"],
goals: [
"$\\sin A=k$ のとき角が2候補になることを判断できる",
"$\\cos$ の符号・最大辺で鋭角・鈍角を判定できる",
"SSA（2辺と向かいの角）で三角形が0・1・2個になる場合を分けられる",
"三角形の成立条件 $|b-c|<a<b+c$ を使える",
"図の見た目に頼らず、条件から角を確定できる",
],
lessonBlocks: [
{
kind: "strategy",
title: "Core：sinの値だけでは角が決まらない",
body: "図形と計量で最も多い事故は、**$\\sin$ の値だけで角を1つに決めてしまう** ことです。\n\n$0^\\circ<\\theta<180^\\circ$ では $\\sin\\theta=\\sin(180^\\circ-\\theta)$ なので、$\\sin\\theta=k$（$0<k<1$）には鋭角と鈍角の2つの解があります。正弦定理で $\\sin B$ を出しても、$B$ が鋭角か鈍角かはそれだけでは決まりません。\n\n角を1つに絞る道具は3つです。① $\\cos$ の符号（正なら鋭角、負なら鈍角）。② 辺の大小（大きい辺の向かいの角ほど大きい）。③ 角の和（$A+B<180^\\circ$ でなければならない）。この3つで候補を確定します。",
emphasis: "$\\sin$ から角を出したら、必ず「鈍角側 $180^\\circ-\\theta$ もあり得るか」を確認する。",
},
{
kind: "comparisonTable",
title: "Core：鋭角・鈍角の判定法",
body: "角が鋭角か鈍角かは、$\\sin$ ではなく次で判定します。",
columns: ["判定の手がかり", "鋭角", "鈍角"],
rows: [
{ cells: ["$\\cos$ の符号", "$\\cos>0$", "$\\cos<0$"], highlight: true },
{ cells: ["3辺の関係（$A$ の向かいが $a$）", "$a^2<b^2+c^2$", "$a^2>b^2+c^2$"], highlight: true },
{ cells: ["最大辺との関係", "最大辺の向かい以外は必ず鋭角", "鈍角は最大辺の向かいだけ"] },
],
},
{
kind: "workedExample",
title: "Core 例題1：cosの符号で鈍角を確定する",
body: "**問題**　三角形 $ABC$ で $a=7$、$b=5$、$c=3$ のとき、角 $A$ が鋭角か鈍角かを判定し、$A$ を求めよ。\n\n**判断**　3辺があるので余弦定理で $\\cos A$ を出し、符号で鋭角・鈍角を決める。$\\sin$ を先に出さない。\n\n**計算**　$\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}=\\dfrac{25+9-49}{30}=\\dfrac{-15}{30}=-\\dfrac12<0$。\n\n**判定**　$\\cos A<0$ なので $A$ は鈍角。$\\cos A=-\\dfrac12$ より $A=120^\\circ$。\n\n**別の見方**　$a=7$ が最大辺で、$a^2=49>b^2+c^2=34$ だから、向かいの角 $A$ は鈍角。$\\cos$ の符号と一致。\n\n**答え**　$A$ は鈍角で $A=120^\\circ$。",
},
{
kind: "workedExample",
title: "Core 例題2：正弦定理の2候補を辺の大小で絞る",
body: "**問題**　三角形 $ABC$ で $a=\\sqrt6$、$b=2$、$A=60^\\circ$ のとき、角 $B$ を求めよ。\n\n**判断**　辺と向かいの角のペア $a,A$ があるので正弦定理。ただし出てくる $\\sin B$ から $B$ を絞るときに2候補に注意する。\n\n**計算**　$\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}$ より $\\sin B=\\dfrac{b\\sin A}{a}=\\dfrac{2\\cdot\\frac{\\sqrt3}{2}}{\\sqrt6}=\\dfrac{\\sqrt3}{\\sqrt6}=\\dfrac{1}{\\sqrt2}=\\dfrac{\\sqrt2}{2}$。\n\n**候補**　$\\sin B=\\dfrac{\\sqrt2}{2}$ より $B=45^\\circ$ または $135^\\circ$。\n\n**絞り込み**　$a=\\sqrt6\\approx2.449>b=2$ なので、辺の大小より $A>B$。$A=60^\\circ$ だから $B<60^\\circ$、よって $B=45^\\circ$（$135^\\circ$ は不適）。\n\n**検算**　$A=60^\\circ$、$B=45^\\circ$、$C=75^\\circ$ で和は $180^\\circ$。整合。\n\n**答え**　$B=45^\\circ$。",
},
{
kind: "strategy",
title: "Branch：SSA（2辺と向かいの角）は個数が変わる",
body: "1つの角 $A$ と、その角を **はさまない** 2辺（$A$ の向かいの辺 $a$ と、$A$ に隣り合う辺 $b$）が与えられる形を SSA といいます。この形は、三角形が **0個・1個・2個** のいずれにもなり得る、いわゆる「あいまいな場合」です。\n\n判定の鍵は、頂点から下ろした高さ $h=b\\sin A$ と、辺 $a$ の長さの比較です。$a$ が高さより短ければ辺が届かず三角形はできません。ちょうど高さなら直角三角形が1つ。高さより長く $b$ より短ければ2つ。$b$ 以上なら1つです。\n\n$A$ が直角・鈍角のときは、向かいの辺 $a$ が最大でなければならないので、$a>b$ のとき1個、$a\\leqq b$ のとき0個になります。",
emphasis: "SSA を見たら、$h=b\\sin A$ と $a$、そして $a$ と $b$ を比べて個数を決める。",
},
{
kind: "comparisonTable",
title: "Branch：SSAで三角形が何個できるか",
body: "角 $A$、向かいの辺 $a$、隣の辺 $b$ が与えられたとき（$h=b\\sin A$）。",
columns: ["$A$ の種類", "条件", "三角形の個数"],
rows: [
{ cells: ["鋭角", "$a<h$", "0個（辺が届かない）"] },
{ cells: ["鋭角", "$a=h$", "1個（直角三角形）"] },
{ cells: ["鋭角", "$h<a<b$", "2個（鋭角と鈍角の2通り）"], highlight: true },
{ cells: ["鋭角", "$a\\geqq b$", "1個"] },
{ cells: ["直角・鈍角", "$a>b$", "1個"], highlight: true },
{ cells: ["直角・鈍角", "$a\\leqq b$", "0個"] },
],
},
{
kind: "workedExample",
title: "Branch 例題1：三角形が2個できるSSA",
body: "**問題**　$A=30^\\circ$、$b=2\\sqrt2$、$a=2$ のとき、条件を満たす三角形は何個か。角 $B$ もすべて求めよ。\n\n**高さと比較**　$h=b\\sin A=2\\sqrt2\\cdot\\sin30^\\circ=2\\sqrt2\\cdot\\dfrac12=\\sqrt2\\approx1.41$。$a=2$ は $h=\\sqrt2$ より大きく、$b=2\\sqrt2\\approx2.83$ より小さい。$A$ は鋭角で $h<a<b$ なので **2個**。\n\n**角 $B$**　$\\sin B=\\dfrac{b\\sin A}{a}=\\dfrac{2\\sqrt2\\cdot\\frac12}{2}=\\dfrac{\\sqrt2}{2}$ より $B=45^\\circ$ または $135^\\circ$。\n\n**両方の妥当性**　$B=45^\\circ$ なら $C=105^\\circ$、$B=135^\\circ$ なら $C=15^\\circ$。どちらも角の和が $180^\\circ$ で正なので、2つとも成立。\n\n**答え**　三角形は2個、$B=45^\\circ$ と $B=135^\\circ$。",
},
{
kind: "workedExample",
title: "Branch 例題2：三角形ができないSSA",
body: "**問題**　$A=30^\\circ$、$b=4$、$a=1$ のとき、条件を満たす三角形は何個か。\n\n**高さと比較**　$h=b\\sin A=4\\cdot\\sin30^\\circ=4\\cdot\\dfrac12=2$。向かいの辺 $a=1$ は高さ $h=2$ より短い。\n\n**判定**　$A$ は鋭角で $a<h$ なので、辺 $a$ が対辺まで届かず三角形は **0個**。\n\n**確認**　$\\sin B=\\dfrac{b\\sin A}{a}=\\dfrac{4\\cdot\\frac12}{1}=2>1$ となり、$\\sin B=2$ を満たす角は存在しない。個数0と整合する。\n\n**答え**　0個。",
},
{
kind: "concept",
title: "Trap：三角形の成立条件",
body: "3辺の長さ $a,b,c$ が三角形を作れるのは、**最も長い辺が残り2辺の和より短い** ときです。まとめると\n\n$|b-c|<a<b+c$\n\nが成り立つときに限ります（どの辺を $a$ に選んでも同値）。\n\n文字を含む辺の問題では、この成立条件が答えの範囲を決めます。また、余弦定理で $\\cos$ を計算したとき $|\\cos|>1$ になったら、その三角形は存在しません。長さが負になる、面積が虚数になるといった結果も、存在しないことのサインです。",
},
{
kind: "workedExample",
title: "Trap 例題：文字を含む辺の成立条件",
body: "**問題**　3辺が $2$、$3$、$x$ の三角形が存在するような $x$ の範囲を求めよ。\n\n**成立条件を書く**　どの辺も残り2辺の和より短く、差より大きい。$|3-2|<x<3+2$。\n\n**計算**　$1<x<5$。\n\n**確認**　$x=1$ なら $2+ (-)$…実際 $2,3,1$ は $2=3-1$ でつぶれて三角形にならない。$x=5$ なら $2+3=5$ で一直線。どちらも境界は含まない。\n\n**答え**　$1<x<5$。",
},
{
kind: "commonMistake",
title: "誤答分析：図の見た目と sin で角を決める",
body: "**NG**　図が鋭角に見えるから鋭角、$\\sin B=\\frac{\\sqrt2}{2}$ だから $B=45^\\circ$ と即断する。共通テストの図は配置の理解用で、角度は正確ではない。\n\n**OK**　角は $\\cos$ の符号・辺の大小・角の和で確定する。$\\sin$ から出した角は $180^\\circ-\\theta$ も候補にする。SSA なら $h=b\\sin A$ と $a,b$ の比較で個数を先に決める。\n\n**誤答分析**　「2個あるのに1個で止める」「0個なのに無理に1個作る」ミスは、高さとの比較を飛ばすと必ず起きる。角を答える前に、鋭角・鈍角のどちらか、いくつあるかを言葉にする。",
emphasis: "角は sin と見た目で決めない。cosの符号・辺の大小・高さ比較で確定する。",
},
{
kind: "checkpoint",
title: "検算チェック",
body: "角と個数を出したら、次を確認します。\n\n- $\\sin$ から出した角は、鈍角側 $180^\\circ-\\theta$ も検討したか。\n- $\\cos$ の符号は、辺の大小（$a^2$ と $b^2+c^2$）と一致するか。\n- 求めた角をすべて足すと、他の角と合わせて $180^\\circ$ 未満に収まるか。\n- SSA なら $h=b\\sin A$ と $a$、$a$ と $b$ を比べて個数を確認したか。\n- 3辺が $|b-c|<a<b+c$ を満たすか。長さは正、面積は非負か。",
},
{
kind: "summary",
title: "まとめ",
body: "- $\\sin\\theta=k$ には鋭角・鈍角の2候補がある\n- 角は $\\cos$ の符号・辺の大小・角の和で確定\n- 最大辺の向かいだけが鈍角になり得る\n- SSA は $h=b\\sin A$ と $a,b$ の比較で0・1・2個を判定\n- 三角形の成立条件は $|b-c|<a<b+c$\n- 図の見た目に頼らず、条件から角と個数を決める",
},
],
checkQuestions: [
{
question: "三角形 $ABC$ で $b=8$、$c=5$、$a=7$ のとき、角 $A$ は鋭角か鈍角か。",
answer: "$\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}=\\dfrac{64+25-49}{80}=\\dfrac{40}{80}=\\dfrac12>0$ なので鋭角（$A=60^\\circ$）。",
hint: "余弦定理で cos の符号を見る。",
},
{
question: "$A=30^\\circ$、$b=6$、$a=4$ のとき、三角形は何個できるか。",
answer: "$h=b\\sin A=6\\cdot\\dfrac12=3$。$A$ は鋭角で $h=3<a=4<b=6$ なので $h<a<b$、三角形は2個。",
hint: "高さ $h=b\\sin A$ と $a$、$a$ と $b$ を比べる。",
},
{
question: "3辺が $x$、$4$、$6$ の三角形が存在する $x$ の範囲を求めよ。",
answer: "$|6-4|<x<6+4$ より $2<x<10$。",
hint: "$|b-c|<a<b+c$。",
},
],
relatedPracticeLinks: [
{ label: "鈍角の三角比と相互関係", href: "/courses/math-1a/figures-and-measurement/trig-ratios-obtuse-identities", description: "鈍角の cos が負になる土台" },
{ label: "正弦定理と余弦定理", href: "/courses/math-1a/figures-and-measurement/sine-law-cosine-law", description: "定理そのものの使い方に戻る" },
{ label: "定理選択完全攻略", href: "/courses/math-1a/figures-and-measurement/theorem-selection-mastery", description: "角を出す道具の選び方" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a", description: "共通テスト対策" },
],
qualityTags: ["鈍角判定", "SSA", "存在条件", "角の2候補", "検算", "確認問題3問", "diagram-none-intentional", "誤答分析あり"],
},
{
lessonId: "measurement-standard-strategy",
lessonTitle: "図形と計量の典型処理",
lessonDescription: "図形問題で、補助線・三角形分割・定理選択を使って解法を組み立てる。",
level: "standard",
estimatedMinutes: 75,
prerequisites: ["正弦定理と余弦定理", "面積・内接円・外接円"],
goals: [
"図形問題でどの三角形を見るか判断できる",
"補助線を引いて直角三角形や一般三角形に分解できる",
"正弦定理・余弦定理・面積公式を使い分けられる",
"与えられた情報を図に書き込み、解法を設計できる",
"上級の難関大レベル図形問題に進む準備ができる",
],
lessonBlocks: [
{
kind: "intro",
title: "図形問題はどこを見るかが勝負",
body: "図形と計量の標準問題では、公式そのものよりも、どの三角形に注目するかが重要です。\n\n図の中に複数の三角形があるとき、すべてを同時に見ようとすると混乱します。\n\nまず、求めたい辺や角が含まれている三角形を探します。\n\n次に、その三角形で使える情報が足りているかを確認します。\n\n足りない場合は、別の三角形から辺や角を求めて持ってきます。\n\nこのように、図形問題は公式を当てはめるだけではなく、情報の流れを作る問題です。",
},
{
kind: "strategy",
title: "図形と計量の解法手順",
body: "図形問題で迷ったら、次の手順で考えます。\n\n1. 求めたいものを確認する\n2. 求めたいものを含む三角形を探す\n3. その三角形で分かっている辺と角を書き込む\n4. 正弦定理・余弦定理・面積公式のどれが使えそうか考える\n5. 足りない情報があれば、別の三角形から求める\n6. 必要なら補助線を引いて三角形を作る\n\nこの流れを意識すると、図形問題で手が止まりにくくなります。",
},
{
kind: "strategy",
title: "この講座の勝ち筋・5秒で見るポイント",
body: "図形と計量の標準問題の勝ち筋は、**図を読む前に、既知量・求めたい量・使える公式を分けること**です。\n\n5秒で見るポイントは、(1) 求めたい量は辺・角・面積・高さ・半径のどれか、(2) 直角三角形があるか、(3) 2辺とその間の角があるか、(4) 辺と向かいの角のペアがあるか、(5) 面積が中継点になるか、の5つです。\n\n絶対に避けるミスは、**とりあえず補助線、とりあえず三平方、とりあえず角度追い**です。補助線は目的があって初めて引きます。三平方は直角があるときだけ使います。角度追いは、角が本当に必要なときだけで十分です。\n\n本番では、図の見た目より条件を信じます。長さ・角度・垂線の足の位置は、図から読むのではなく、辺の大小、三平方、余弦定理、面積公式で確定させます。",
emphasis:
"図形と計量は「公式を思い出す問題」ではなく「どの量を先に確定すると後ろが軽くなるか」を選ぶ問題。",
},
{
kind: "comparisonTable",
title: "何を見たらどの公式か",
body: "与えられた情報の形から、使う道具を選びます。",
columns: ["情報の形", "使う道具", "理由"],
rows: [
{
cells: ["2辺とその間の角", "余弦定理・面積公式", "残りの辺や面積が求まる"],
highlight: true,
},
{
cells: ["辺と向かいの角のセット", "正弦定理", "対応する辺や角を求められる"],
},
{
cells: ["3辺", "余弦定理", "角を求められる"],
},
{
cells: ["面積と半周長", "内接円公式", "内接円半径につながる"],
},
{
cells: ["3辺と面積", "外接円公式", "外接円半径につながる"],
},
],
},
{
kind: "comparisonTable",
title: "求めたい量別の最短判断表",
body: "問題文を見た瞬間に、求めたい量から道具を逆引きします。",
columns: ["求めたい量", "最初に確認すること", "優先順位"],
rows: [
{
cells: ["辺", "直角三角形があるか", "三平方 → 余弦定理 → 正弦定理 → 相似・比"],
highlight: true,
},
{
cells: ["角", "3辺が分かるか", "余弦定理で $\\cos$ → 正弦定理 → 円周角・接弦定理"],
},
{
cells: ["面積", "高さか2辺と夹角があるか", "底辺×高さ → $\\frac12ab\\sin C$ → ヘロン → $abc=4RS$"],
highlight: true,
},
{
cells: ["高さ", "面積から逆算できるか", "面積逆算 → 直角三角形 → 三角比 → 座標"],
},
{
cells: ["外接円半径", "辺と対角、または3辺と面積があるか", "正弦定理 → $abc=4RS$ → 直角三角形なら斜辺の半分"],
},
{
cells: ["内接円半径", "面積と半周長があるか", "$S=rs$ → 接線長の相等 → 角の二等分線"],
},
],
},
{
kind: "workedExample",
title: "例1：2辺と角から辺と面積を求める",
body: "三角形ABCで、$AB=5$、$AC=7$、$\\angle A=60^\\circ$ とします。辺 $BC$ と面積を求めます。\n\nまず、辺 $BC$ は角Aの向かい側です。2辺 $AB$、$AC$ とその間の角Aが分かっているので、余弦定理を使います。\n\n$BC^2=5^2+7^2-2\\cdot5\\cdot7\\cos60^\\circ$\n\n$=25+49-70\\cdot\\frac{1}{2}$\n\n$=74-35=39$\n\nしたがって、$BC=\\sqrt{39}$ です。\n\n次に面積は、\n\n$S=\\frac{1}{2}\\cdot5\\cdot7\\cdot\\sin60^\\circ$\n\n$=\\frac{35}{2}\\cdot\\frac{\\sqrt{3}}{2}$\n\n$=\\frac{35\\sqrt{3}}{4}$\n\nです。\n\n同じ2辺とその間の角から、余弦定理と面積公式の両方が使えます。",
},
{
kind: "workedExample",
title: "例2：情報を別の三角形から持ってくる",
body: "図形問題では、求めたい三角形に必要な情報が最初からそろっていないことがあります。\n\nその場合、別の三角形で先に辺や角を求めてから、目的の三角形に持ってきます。\n\n例えば、三角形ABCの中に点Dがあり、まず三角形ABDで辺 $BD$ を求め、その後三角形BCDで角や面積を求める、という流れです。\n\nこのような問題では、1つの三角形だけで完結しないことが多いです。\n\n図の中で「この三角形でこれを求める」「次にこの三角形で使う」という順番を作ることが大切です。",
},
{
kind: "workedExample",
title: "代表例題：13,14,15の三角形を体系的に処理する",
body: "**問題**　三角形 $ABC$ で $AB=13, AC=15, BC=14$ とする。$A$ から $BC$ に下ろした垂線の足を $D$ とするとき、$BD,DC,AD$、面積、外接円半径を求めよ。\n\n**本番での判断順**　三辺がそろっている。求めたい量は高さ・面積・半径。角度から入るより、垂線の足を置いて直角三角形を2つ作る方が後ろの設問まで使える。\n\n**標準解答**　$BD=x, DC=y$ と置くと $x+y=14$。三平方より $13^2=x^2+AD^2$、$15^2=y^2+AD^2$。2式を引いて $y^2-x^2=56$、つまり $(y-x)(y+x)=56$。$y+x=14$ だから $y-x=4$。よって $BD=5, DC=9$。高さは $AD^2=13^2-5^2=144$ より $AD=12$。面積は $S=\\frac12\\times14\\times12=84$。外接円半径は $R=\\frac{13\\cdot14\\cdot15}{4\\cdot84}=\\frac{65}{8}$。\n\n**別解**　面積だけならヘロンの公式で $s=21$、$S=\\sqrt{21\\cdot8\\cdot7\\cdot6}=84$ と出せる。そこから $AD=\\frac{2S}{BC}=12$、$R=\\frac{abc}{4S}$ へ進める。\n\n**捨てるべき方針**　図から $BD,DC$ を読む、垂線の足を中点だと思い込む、外接円半径のために角を全部求める、の3つは捨てる。\n\n**検算**　$BD+DC=14$、$AC>AB$ なので $DC>BD$、$\\frac12\\times14\\times12=84$、$R=\\frac{65}{8}$ は最長辺15の半分より少し大きい。すべて整合する。",
},
{
kind: "workedExample",
title: "代表例題：測量問題の読み替え",
body: "**問題**　観測点 $P$ から塔の頂点を見上げる仰角が $45^\\circ$、点 $P$ から塔の根元までの水平距離が $30$ m である。塔の高さを求めよ。\n\n**本番での判断順**　仰角は水平線との角。水平距離と高さで直角三角形を作る。求めたい量は高さなので、$\\tan$ を使う。\n\n**標準解答**　高さを $h$ とすると、$\\tan45^\\circ=\\frac{h}{30}$。$\\tan45^\\circ=1$ なので $h=30$。\n\n**別解**　$45^\\circ$ の直角二等辺三角形と見れば、水平距離と高さは等しいので即 $30$ m。\n\n**捨てるべき方針**　仰角を地面と塔の角ではなく、斜めの視線と塔の角として読むのは誤り。斜距離と水平距離を混同して三平方から始めるのも遠回り。\n\n**検算**　仰角 $45^\\circ$ なら高さと水平距離が等しい。答え $30$ m はこの性質と一致する。",
},
{
kind: "commonMistake",
title: "よくあるミス：公式を先に決めてしまう",
body: "図形問題でありがちなミスは、問題を見た瞬間に「これは正弦定理だ」と決めつけることです。\n\nしかし、公式は情報の形から選ぶものです。\n\n2辺とその間の角があるなら余弦定理が自然です。\n\n辺と向かいの角のセットがあるなら正弦定理が自然です。\n\n3辺があるなら余弦定理で角を求められます。\n\n公式を先に決めるのではなく、図に書かれた情報を見て、どの公式が使えるかを判断しましょう。",
},
{
kind: "commonMistake",
title: "誤答分析：図を信じすぎる・補助線を引きすぎる",
body: "**図を信じすぎるミス**　図で長そう、直角そう、二等分されていそう、という印象で式を立てる。共通テストの図は配置の理解に使うもので、長さや角度は条件から確定する。\n\n**補助線を引きすぎるミス**　目的のない補助線を何本も引いて、どの三角形を見ればよいか分からなくなる。補助線は、直角三角形を作る、底辺と高さを作る、三角形を分割する、という目的があるときだけ引く。\n\n**とりあえず三平方のミス**　三平方は直角があるときだけ使える。直角がないなら、余弦定理が三平方の一般化として使えるかを先に見る。\n\n**回収方法**　各ステップで「何を求めたいからこの線を引くのか」「この三角形には直角があるか」「この角はどの2辺にはさまれているか」を言葉にしてから式を書く。",
},
{
kind: "checkpoint",
title: "共通テスト大問との接続",
body: "共通テスト数学IAの図形と計量は、第1問の中で短い誘導に沿って、長さ・高さ・面積・角・半径を順に求める形で出ます。\n\n冊子型模試第1回では、三辺から垂線の足、高さ、面積、鈍角判定、外接円半径へ進む流れが中心です。冊子型模試第2回では、測量・仰角・水平距離を直角三角形に落とす読み替えが中心です。\n\n問題解体型講座「第1問後半 図形と計量」は、この講座の判断表を実際のPDF問題に当てはめた復習先です。MATHで道具を確認したら、問題解体型講座で本番の読み順に戻してください。",
},
{
kind: "summary",
title: "まとめ",
body: "- 図形問題では、まず求めたいものを含む三角形を見る\n- 分かっている辺と角を図に書き込む\n- 情報の形から正弦定理・余弦定理・面積公式を選ぶ\n- 足りない情報は別の三角形から持ってくる\n- 補助線は、使える三角形を作るために引く\n- 公式暗記より、情報の流れを作ることが重要",
},
],
checkQuestions: [
{
question: "2辺とその間の角が与えられているとき、残りの辺を求めるには主に何を使うか。",
answer: "余弦定理を使う。例えば $a^2=b^2+c^2-2bc\\cos A$。",
hint: "はさまれた角があるときは余弦定理。",
},
{
question: "辺とその向かいの角のセットが分かっているとき、別の辺や角を求めるには何を使いやすいか。",
answer: "正弦定理を使いやすい。$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}$。",
hint: "辺と向かいの角の対応を見る。",
},
{
question: "図形問題で、公式を使う前にまず確認すべきことを1つ答えよ。",
answer: "求めたいものを含む三角形がどれか、またその三角形で分かっている辺と角は何かを確認する。",
hint: "公式より先に図を見る。",
},
],
relatedPracticeLinks: [
{ label: "定理選択完全攻略", href: "/courses/math-1a/figures-and-measurement/theorem-selection-mastery", description: "求めたい量から道具を逆引きする判断" },
{ label: "図形情報整理・翻訳完全攻略", href: "/courses/math-1a/figures-and-measurement/figure-info-translation-mastery", description: "図から式への翻訳・同じ量を2通りで表す" },
{ label: "図形と計量 標準演習", href: "/units/figures-and-measurement" },
{ label: "問題解体型講座：第1問後半 図形と計量", href: "/common-test/problem-lectures/ct-ia-q1-back-geometry-measurement", description: "PDF問題を見ながら判断順を確認" },
{ label: "図形と計量 中核講義", href: "/common-test/lectures/geometry-measurement-intensive", description: "面積・高さ・測量の判別フロー" },
{ label: "共通テスト型本番模試 第1回", href: "/common-test/simulator/common-test-math-1a-manual-001", description: "三辺・高さ・外接円半径の実戦" },
{ label: "共通テスト型本番模試 第2回", href: "/common-test/simulator/common-test-math-1a-manual-002", description: "測量・三角比の実戦" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a" },
],
qualityTags: ["定理選択", "補助線", "情報整理", "確認問題3問", "勝ち筋あり", "5秒ポイントあり", "別解あり", "検算あり", "共通テスト接続あり"],
},
];

const FIGURES_MEASUREMENT_ADVANCED: CourseLesson[] = [
{
lessonId: "figure-info-translation-mastery",
lessonTitle: "図形と計量：図形情報整理・翻訳完全攻略",
lessonDescription: "図から情報を辺・角・高さ・面積・半径へ翻訳し、逆に式から図形条件を読み、同じ量を2通りで表して未知量を出す。",
level: "advanced",
estimatedMinutes: 85,
prerequisites: ["図形と計量の典型処理", "面積・内接円・外接円"],
goals: [
"図の情報を辺・角・高さ・面積・半径に分類できる",
"式から図形的な意味（直角・鈍角・外接円など）を読める",
"同じ量を2通りで表して未知量を求められる",
"補助線を「目的から逆算して」引ける",
"複数の三角形に情報をリレーできる",
],
lessonBlocks: [
{
kind: "strategy",
title: "Core：図形問題は「翻訳」と「整理」で決まる",
body: "図形と計量の上級問題は、公式を知っているかではなく、**図の情報を式に翻訳し、散らかった条件を整理できるか** で差がつきます。\n\n手順はいつも同じです。① 求めたい量を決める。② 分かっている量を、辺・角・高さ・面積・外接円半径・内接円半径に分類して図に書き込む。③ 求めたい量を含む三角形を選ぶ。④ 情報が足りなければ、別の三角形や補助線で補う。⑤ 同じ量を2通りで表せないか探す。\n\n公式を思い出すのは最後です。まず「何が辺で、何が角で、何が面積か」を仕分けるだけで、多くの問題は道筋が見えます。",
emphasis: "初手は公式ではなく仕分け。既知量を辺・角・高さ・面積・半径に分類してから道具を選ぶ。",
},
{
kind: "comparisonTable",
title: "Core：図 → 式 の翻訳表",
body: "図や問題文の表現を、そのまま式の形に翻訳します。",
columns: ["図・文の表現", "図形的な意味", "式への翻訳"],
rows: [
{ cells: ["外接円がある", "3頂点を通る円", "$\\frac{a}{\\sin A}=2R$"], highlight: true },
{ cells: ["内接円がある", "3辺に接する円", "$S=rs$、接線長が等しい"] },
{ cells: ["$AD$ が $\\angle A$ の二等分線", "面積を2つに分けられる", "$[ABD]+[ADC]=[ABC]$、角は $\\frac A2$ ずつ"], highlight: true },
{ cells: ["頂点から垂線", "直角三角形ができる", "高さ $=$ 辺 $\\times\\sin$、三平方"] },
{ cells: ["点 $P$ が辺上を動く", "長さが変化", "$AP=x$ と置き、定義域をつける"] },
],
},
{
kind: "workedExample",
title: "Core 例題1：面積を2通りで表して高さを出す",
body: "**問題**　3辺が $13$、$14$、$15$ の三角形で、辺 $14$ を底辺としたときの高さ $h$ を求めよ。\n\n**翻訳**　高さが欲しい。面積が分かれば $S=\\frac12\\times$ 底辺 $\\times$ 高さから逆算できる。3辺だけなので面積はヘロンで出す。つまり **面積を2通り**（ヘロンと 底辺×高さ）で表す。\n\n**面積（ヘロン）**　$s=\\dfrac{13+14+15}{2}=21$。$S=\\sqrt{21\\cdot8\\cdot7\\cdot6}=\\sqrt{7056}=84$。\n\n**高さへ逆算**　$S=\\dfrac12\\times14\\times h$ より $84=7h$、$h=12$。\n\n**検算**　$\\frac12\\times14\\times12=84$ でヘロンの面積に戻る。\n\n**答え**　$h=12$。",
},
{
kind: "strategy",
title: "Branch：同じ量を2通りで表す",
body: "図形と計量の強力な技は、**1つの量を2通りに表して等式を作る** ことです。未知の長さや角が、直接は求まらなくても、この等式から出てきます。\n\n代表的なのは面積の2通り表現です。面積を「底辺×高さ」と「$\\frac12ab\\sin C$」で表せば高さが出ます。面積を「全体」と「分割した三角形の和」で表せば、内部の長さ（角の二等分線など）が出ます。\n\n辺についても、2つの三角形が共有する辺を、それぞれの三角形で表して等しいと置けます。同じ量を別ルートで表す発想が、複合図形を解く鍵です。",
emphasis: "求めたい量が直接出ないときは、既知の量（多くは面積）を2通りで表して等式にする。",
},
{
kind: "workedExample",
title: "Branch 例題：角の二等分線の長さ（面積を2通り）",
body: "**問題**　三角形 $ABC$ で $AB=5$、$AC=3$、$\\angle A=120^\\circ$ とする。$\\angle A$ の二等分線が辺 $BC$ と交わる点を $D$ とするとき、$AD$ を求めよ。\n\n**翻訳**　$AD$ は直接は測れない。$AD$ を含む三角形 $ABD$、$ACD$ の面積の和が、全体 $ABC$ の面積に等しいことを使う（**面積を2通り**）。二等分線なので $\\angle BAD=\\angle DAC=60^\\circ$。\n\n**面積を分割で表す**　$[ABD]+[ACD]=\\dfrac12\\cdot5\\cdot AD\\sin60^\\circ+\\dfrac12\\cdot3\\cdot AD\\sin60^\\circ=\\dfrac12 AD\\sin60^\\circ(5+3)=4\\sin60^\\circ\\cdot AD=2\\sqrt3\\,AD$。\n\n**面積を全体で表す**　$[ABC]=\\dfrac12\\cdot5\\cdot3\\cdot\\sin120^\\circ=\\dfrac{15}{2}\\cdot\\dfrac{\\sqrt3}{2}=\\dfrac{15\\sqrt3}{4}$。\n\n**等式を解く**　$2\\sqrt3\\,AD=\\dfrac{15\\sqrt3}{4}$ より $AD=\\dfrac{15}{8}$。\n\n**検算**　$AD=\\dfrac{15}{8}=1.875$。2辺 $5,3$ の間に収まる内部の線分として妥当。\n\n**答え**　$AD=\\dfrac{15}{8}$。",
},
{
kind: "comparisonTable",
title: "Trap：式 → 図 の読解表",
body: "逆に、式が与える図形的な意味を読めると、方針が一気に決まります。",
columns: ["式・条件", "図形的な意味", "次の一手"],
rows: [
{ cells: ["$a^2=b^2+c^2$", "$A$ が直角", "直角三角形として三平方・三角比"], highlight: true },
{ cells: ["$a^2>b^2+c^2$", "$A$ が鈍角", "鈍角三角形、$\\cos A<0$"], highlight: true },
{ cells: ["$a^2<b^2+c^2$", "$A$ が鋭角", "$\\cos A>0$"] },
{ cells: ["$\\frac{a}{\\sin A}=2R$", "外接円がある", "$R$ と辺・角を結ぶ"] },
{ cells: ["$\\cos\\theta<0$", "$\\theta$ は鈍角", "角の候補を鈍角側に絞る"] },
],
},
{
kind: "workedExample",
title: "Trap 例題：式から図形の性質を読む",
body: "**問題**　三角形の3辺が $6$、$8$、$11$ である。この三角形は鋭角・直角・鈍角のどれか。\n\n**翻訳**　最大辺 $11$ の向かいの角が最大角。その角が鋭角・直角・鈍角のどれかは、$11^2$ と $6^2+8^2$ の大小で決まる（$a^2$ と $b^2+c^2$ の比較）。\n\n**比較**　$11^2=121$、$6^2+8^2=36+64=100$。$121>100$ なので、最大角は鈍角。\n\n**式で確認**　$\\cos\\theta=\\dfrac{6^2+8^2-11^2}{2\\cdot6\\cdot8}=\\dfrac{100-121}{96}=\\dfrac{-21}{96}<0$。負なので鈍角と一致。\n\n**答え**　鈍角三角形。",
},
{
kind: "workedExample",
title: "Synthesis 例題：情報を別の三角形へリレーする",
body: "**問題**　四角形 $ABCD$ で、$AB=2$、$BC=3$、$\\angle ABC=60^\\circ$ とする。対角線 $AC$ の長さを求め、続いて三角形 $ACD$ を扱う準備をせよ。\n\n**翻訳**　四角形のままでは三角比が使えない。対角線 $AC$ を引くと、三角形 $ABC$ と三角形 $ACD$ に分かれる。$AC$ は両方の三角形が **共有する辺**。まず $ABC$ で $AC$ を出し、次の三角形へ渡す。\n\n**三角形 $ABC$ で $AC$**　2辺 $AB,BC$ とその間の角 $\\angle ABC$ があるので余弦定理。$AC^2=2^2+3^2-2\\cdot2\\cdot3\\cos60^\\circ=13-6=7$。よって $AC=\\sqrt7$。\n\n**リレー**　この $AC=\\sqrt7$ を三角形 $ACD$ の1辺として使えば、$ACD$ の残りの条件と合わせて角や面積へ進める。\n\n**検算**　$AC=\\sqrt7\\approx2.65$ は $|3-2|=1$ より大きく $3+2=5$ より小さいので、三角形 $ABC$ の辺として成立。\n\n**答え**　$AC=\\sqrt7$（この値を次の三角形へ渡す）。",
},
{
kind: "commonMistake",
title: "誤答分析：目的のない補助線・図の見た目を信じる",
body: "**補助線を引きすぎる**　目的のない線を何本も引くと、どの三角形を見ればよいか分からなくなる。補助線は「直角三角形を作る」「四角形を分ける」「同じ量を2通りで表す」など、目的があるときだけ引く。\n\n**図を信じすぎる**　図で直角・二等分・長さが等しいように見えても、条件に書かれていなければ使えない。長さや角は、辺の大小・三平方・余弦定理・面積で確定する。\n\n**情報を分類しない**　与えられた量を辺・角・高さ・面積・半径に仕分けないまま公式を探すと、使える式に気づけない。まず仕分け、次に翻訳、最後に公式。\n\n**回収方法**　各ステップで「この線は何のためか」「この量は辺か角か面積か」「同じ量を別ルートで表せないか」を言葉にする。",
emphasis: "補助線は目的から逆算。長さ・角は図の見た目ではなく条件から確定する。",
},
{
kind: "checkpoint",
title: "チェックリスト：図を式にするとき",
body: "複合図形を見たら、次を確認します。\n\n- 求めたい量を1つに決めたか。\n- 既知量を辺・角・高さ・面積・外接円半径・内接円半径に分類したか。\n- 求めたい量を含む三角形を選んだか。\n- 情報が足りないとき、別の三角形や補助線で補えるか。\n- 同じ量（多くは面積）を2通りで表して等式にできないか。\n- 式が与える図形的意味（直角・鈍角・外接円）を読み落としていないか。\n- 図の見た目で長さ・角を決めていないか。",
},
{
kind: "summary",
title: "まとめ",
body: "- 図形問題は、翻訳（図→式）と整理（仕分け）で決まる\n- 既知量を辺・角・高さ・面積・半径に分類してから公式を選ぶ\n- 同じ量を2通りで表すと、直接測れない長さが出る\n- 面積の2通り表現・分割の和は特に強力\n- 式から図形的意味（直角・鈍角・外接円）を読む\n- 補助線は目的から逆算し、図の見た目は信じない",
},
],
checkQuestions: [
{
question: "3辺が $9$、$10$、$17$ の三角形は鋭角・直角・鈍角のどれか。",
answer: "最大辺 $17$ の向かいの角で判定。$17^2=289$、$9^2+10^2=81+100=181$。$289>181$ なので鈍角三角形。",
hint: "最大辺の $a^2$ と $b^2+c^2$ を比べる。",
},
{
question: "面積が $S$、辺 $BC=a$ を底辺とする高さ $h$ の関係を式で書け。この関係は何を2通りで表しているか。",
answer: "$S=\\dfrac12ah$。面積を「底辺×高さ」で表したもの。別途 $S=\\frac12ab\\sin C$ やヘロンで $S$ を出せば、$h=\\dfrac{2S}{a}$ と高さが逆算できる。",
hint: "面積を2通りで表す。",
},
{
question: "四角形 $ABCD$ の面積や辺を三角比で求めたいとき、最初に引く基本の補助線は何か。その目的も答えよ。",
answer: "対角線（例：$AC$）。四角形を2つの三角形に分け、共有する対角線を仲立ちに情報をリレーするため。",
hint: "四角形は三角形に戻す。",
},
],
relatedPracticeLinks: [
{ label: "補助線と三角形への翻訳", href: "/courses/math-1a/figures-and-measurement/auxiliary-lines-and-translation", description: "複雑な図形を三角形へ分解する導入" },
{ label: "図形と計量の典型処理", href: "/courses/math-1a/figures-and-measurement/measurement-standard-strategy", description: "どの三角形を見るかの標準手順" },
{ label: "面積公式完全攻略", href: "/courses/math-1a/figures-and-measurement/triangle-area-mastery", description: "面積の分割・面積比を深掘り" },
{ label: "図形と計量の融合問題", href: "/courses/math-1a/figures-and-measurement/figures-measurement-exam-standard", description: "翻訳と整理を融合問題で仕上げる" },
{ label: "共通テスト 数学IA", href: "/common-test/math-1a", description: "共通テスト対策" },
],
qualityTags: ["図形情報整理", "図と式の翻訳", "同じ量を2通り", "面積2通り", "情報リレー", "確認問題3問", "diagram-none-intentional", "誤答分析あり", "検算あり"],
},
{
lessonId: "auxiliary-lines-and-translation",
lessonTitle: "補助線と三角形への翻訳",
lessonDescription: "複雑な図形を、三角比・正弦定理・余弦定理が使える三角形へ分解する。",
level: "advanced",
estimatedMinutes: 85,
prerequisites: ["図形と計量の典型処理", "正弦定理と余弦定理"],
goals: [
"複雑な図形を三角形に分解できる",
"補助線を引く目的を説明できる",
"円・四角形・線分比を三角形の計量問題へ翻訳できる",
"どの三角形でどの情報を求めるか設計できる",
"難関大レベルの図形問題で初手を決められる",
],
lessonBlocks: [
{
kind: "intro",
title: "難しい図形は三角形に戻す",
body: "難関大レベルの図形と計量では、図が複雑に見えることがあります。\n\n円が絡んだり、四角形の中に対角線が引かれていたり、点が辺上を動いたりします。\n\nしかし、三角比・正弦定理・余弦定理が直接使えるのは、基本的には三角形です。\n\nしたがって、複雑な図形を見たときの基本方針は、**三角形に戻す**ことです。\n\n補助線は、公式を使える三角形を作るために引きます。\n\nつまり補助線は、なんとなく引くものではありません。目的を持って引くものです。",
},
{
kind: "strategy",
title: "補助線を引く目的",
body: "補助線には、主に次の目的があります。\n\n1. 三角形を作る\n2. 直角三角形を作る\n3. 既知の角を使える位置に移す\n4. 対角線で四角形を2つの三角形に分ける\n5. 円周角や中心角を使えるようにする\n\n補助線を引く前に、「この線を引くと何が分かるか」を考えます。\n\n例えば、四角形の面積を求めたいなら、対角線を引いて2つの三角形に分けるのが自然です。\n\n長さを求めたいなら、その長さを含む三角形を作れないか考えます。",
},
{
kind: "workedExample",
title: "例1：四角形を三角形に分ける",
body: "四角形ABCDで、対角線ACを引くと、四角形は三角形ABCと三角形ACDに分かれます。\n\nもし辺AB、BC、角Bが分かっていれば、三角形ABCで余弦定理を使ってACを求められます。\n\n次に、AC、CD、ADが分かれば、三角形ACDで角や面積を求められます。\n\nこのように、対角線は四角形を三角形に分解するための基本的な補助線です。\n\n四角形のまま考えるのではなく、どの対角線を引くと情報がつながるかを見ます。",
},
{
kind: "workedExample",
title: "例2：高さを下ろして直角三角形を作る",
body: "三角形の面積や高さが関係する問題では、頂点から底辺に垂線を下ろす補助線が有効です。\n\n例えば、三角形ABCで、辺ABと角Aが分かっているとします。\n\n頂点BからACに垂線を下ろすと、直角三角形ができます。\n\nその高さは、$AB\\sin A$ と表せます。\n\nこれにより、面積を $\\frac{1}{2}\\times AC\\times AB\\sin A$ と求められます。\n\nこの考え方が、面積公式 $S=\\frac{1}{2}bc\\sin A$ の背景にもなっています。",
},
{
kind: "comparisonTable",
title: "補助線の典型パターン",
body: "補助線は、作りたい構造から逆算して引きます。",
columns: ["目的", "引く補助線", "使える道具"],
rows: [
{
cells: ["四角形を処理する", "対角線", "三角形2つに分ける"],
highlight: true,
},
{
cells: ["高さがほしい", "垂線", "三角比・面積公式"],
},
{
cells: ["円の角を使いたい", "半径・弦・補助線", "円周角・二等辺三角形"],
},
{
cells: ["長さを求めたい", "求めたい線分を含む三角形", "正弦定理・余弦定理"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：補助線を引きすぎる",
body: "補助線は多ければよいわけではありません。\n\n目的のない補助線を何本も引くと、図が複雑になり、かえって何を見ればよいか分からなくなります。\n\n補助線を引くときは、必ず目的を持ちます。\n\nこの線を引くと直角三角形ができる。この線を引くと余弦定理が使える。この線を引くと四角形が2つの三角形になる。\n\nこのように、使いたい道具から逆算して補助線を引きましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 複雑な図形は三角形に戻す\n- 補助線は公式を使える形を作るために引く\n- 四角形は対角線で三角形に分ける\n- 高さが必要なら垂線を下ろす\n- 円がある場合は、半径や円周角が使えないかを見る\n- 補助線は目的を持って引く",
},
],
checkQuestions: [
{
question: "四角形の面積を三角形の面積に分けて求めたいとき、有効な補助線は何か。",
answer: "対角線。四角形を2つの三角形に分けられる。",
hint: "四角形のままではなく、三角形に分ける。",
},
{
question: "三角形の高さを三角比で表したいとき、どのような補助線を引くか。",
answer: "頂点から底辺に垂線を下ろす。直角三角形を作ることで、高さを $b\\sin A$ のように表せる。",
hint: "高さは垂線で作る。",
},
{
question: "補助線を引くときに最も大切なことは何か。",
answer: "目的を持つこと。何の定理や情報を使えるようにするための補助線かを考える。",
hint: "なんとなく引かない。",
},
],
relatedPracticeLinks: [
{ label: "図形情報整理・翻訳完全攻略", href: "/courses/math-1a/figures-and-measurement/figure-info-translation-mastery", description: "図→式の翻訳と、同じ量を2通りで表す技を深掘り" },
{ label: "補助線・図形処理 演習", href: "/units/figures-and-measurement" },
{ label: "図形と計量 中核講義", href: "/common-test/lectures/geometry-measurement-intensive", description: "三角形に戻す公式選択" },
{ label: "過去問道場", href: "/dojo" },
],
qualityTags: ["旧帝大準備", "補助線", "図形翻訳", "確認問題3問"],
},
{
lessonId: "parameter-geometry-measurement",
lessonTitle: "文字を含む図形計量",
lessonDescription: "辺や角に文字が入る図形問題を、条件整理と関数化で処理する。",
level: "advanced",
estimatedMinutes: 90,
prerequisites: ["図形と計量の典型処理", "二次関数の最大最小"],
goals: [
"文字を含む辺や角を整理できる",
"図形条件を式に翻訳できる",
"面積や長さを文字の関数として表せる",
"最大最小や範囲の問題へ接続できる",
"難関大レベルの図形計量問題に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "文字が入ると図形は関数になる",
body: "図形問題に文字が入ると、単に長さや角を求めるだけではなく、量が変化する問題になります。\n\n例えば、点Pが辺上を動くとき、三角形の面積がどう変わるかを考える問題があります。\n\nこのとき、点Pの位置を $x$ と置けば、面積が $x$ の関数として表せることがあります。\n\n図形と計量の上級問題では、図形を関数に翻訳する力が重要です。\n\nこれは二次関数の最大最小ともつながります。",
},
{
kind: "strategy",
title: "文字を含む図形問題の手順",
body: "文字を含む図形問題では、次の手順で考えます。\n\n1. 何が変化しているかを確認する\n2. 変化する量を $x$ や $t$ と置く\n3. 求めたい長さ・面積・角をその文字で表す\n4. 必要なら三角比・正弦定理・余弦定理を使う\n5. 関数になったら、最大最小や範囲を調べる\n\n特に重要なのは、定義域です。点が線分上を動くなら、$x$ の範囲が必ずあります。",
},
{
kind: "workedExample",
title: "例1：面積を文字で表す",
body: "三角形ABCで、$AB=10$、高さが $6$ とします。点Pが辺AB上を動き、$AP=x$ とします。三角形APCの面積を $x$ で表します。\n\n三角形APCの底辺を $AP=x$ と考えると、高さはもとの三角形と同じ $6$ です。\n\nしたがって、面積 $S$ は、\n\n$S=\\frac{1}{2}\\times x\\times6=3x$\n\nです。\n\n点Pが辺AB上にあるので、$0\\leq x\\leq10$ です。\n\nこのように、点の位置を文字で置くと、面積が関数として表せます。",
},
{
kind: "workedExample",
title: "例2：三角比を含む面積の関数化",
body: "2辺の長さが $x$ と $8$、その間の角が $60^\\circ$ の三角形の面積を考えます。\n\n面積公式より、\n\n$S=\\frac{1}{2}\\cdot x\\cdot8\\cdot\\sin60^\\circ$\n\n$\\sin60^\\circ=\\frac{\\sqrt{3}}{2}$ なので、\n\n$S=4x\\cdot\\frac{\\sqrt{3}}{2}=2\\sqrt{3}x$\n\nです。\n\nこのように、三角比を使って面積を文字の式にできます。\n\n図形問題で文字が出てきたら、最終的に関数として扱えるかを意識しましょう。",
},
{
kind: "workedExample",
title: "例3：最大最小への接続",
body: "周の長さが $20$ の長方形の面積の最大値を考えます。\n\n横を $x$、縦を $10-x$ とすると、面積 $S$ は、\n\n$S=x(10-x)$\n\n$S=-x^2+10x$\n\nです。\n\nこれは二次関数です。\n\n平方完成すると、\n\n$S=-(x-5)^2+25$\n\nしたがって、$x=5$ のとき最大値 $25$ をとります。\n\nこれは図形の問題ですが、文字で置くことで二次関数の最大最小問題に変わりました。",
},
{
kind: "commonMistake",
title: "よくあるミス：定義域を書かない",
body: "文字を含む図形問題では、定義域が非常に重要です。\n\n例えば、長さを $x$ と置いたなら、通常 $x$ は負になりません。\n\n点が線分上にあるなら、$0\\leq x\\leq10$ のような範囲があります。\n\n関数として最大最小を考えるとき、定義域を忘れると答えが変わることがあります。\n\n図形を関数化したら、必ず文字の範囲を確認しましょう。",
},
{
kind: "summary",
title: "まとめ",
body: "- 文字を含む図形問題では、変化する量を文字で置く\n- 求めたい量を文字の式にする\n- 面積公式や三角比を使って関数化する\n- 関数になれば、最大最小や範囲の問題にできる\n- 文字の定義域を必ず確認する\n- 図形と二次関数は、最大最小でつながる",
},
],
checkQuestions: [
{
question: "底辺が $x$、高さが $8$ の三角形の面積を $x$ で表せ。",
answer: "$S=\\frac{1}{2}\\times x\\times8=4x$。",
hint: "三角形の面積は底辺×高さ÷2。",
},
{
question: "2辺が $x$ と $6$、その間の角が $30^\\circ$ の三角形の面積を $x$ で表せ。",
answer: "$S=\\frac{1}{2}\\cdot x\\cdot6\\cdot\\sin30^\\circ=3x\\cdot\\frac{1}{2}=\\frac{3}{2}x$。",
hint: "$\\sin30^\\circ=\\frac{1}{2}$。",
},
{
question: "点Pが長さ12の線分AB上を動き、$AP=x$ とする。このとき $x$ の範囲を答えよ。",
answer: "Pが線分AB上にあるので、$0\\leq x\\leq12$。",
hint: "線分上なので端から端まで。",
},
],
relatedPracticeLinks: [
{ label: "文字を含む図形 演習", href: "/units/figures-and-measurement" },
{ label: "二次関数 最大最小", href: "/courses/math-1a/quadratic/quadratic-max-min-domain" },
],
qualityTags: ["旧帝大準備", "文字式", "最大最小", "図形の関数化", "確認問題3問"],
},
{
lessonId: "figures-measurement-exam-standard",
lessonTitle: "図形と計量の融合問題",
lessonDescription: "三角比・面積・正弦定理・余弦定理・補助線を組み合わせた入試標準から難関大レベルの問題を切り崩す。",
level: "advanced",
estimatedMinutes: 95,
prerequisites: ["補助線と三角形への翻訳", "文字を含む図形計量"],
goals: [
"複数の三角形を使う問題で情報の流れを作れる",
"正弦定理・余弦定理・面積公式を組み合わせられる",
"補助線を引く理由を説明できる",
"図形条件を関数や方程式へ翻訳できる",
"難関大風の図形と計量問題に対応できる",
],
lessonBlocks: [
{
kind: "intro",
title: "融合問題は情報のリレー",
body: "図形と計量の融合問題では、1つの三角形だけで答えが出るとは限りません。\n\nある三角形で辺を求め、その辺を別の三角形で使う。\n\nある角を求め、その角を面積公式に使う。\n\n補助線を引いて、四角形を2つの三角形に分ける。\n\nこのように、情報を次の場所へ渡していく必要があります。\n\n融合問題は、公式の暗記ではなく、情報のリレーを設計する問題です。",
},
{
kind: "strategy",
title: "融合問題の確認リスト",
body: "難しい図形問題を見たら、次の順番で確認します。\n\n1. 求めたいものは辺か角か面積か\n2. それを含む三角形はどれか\n3. その三角形で分かっている辺と角は何か\n4. 正弦定理・余弦定理・面積公式のどれが使えるか\n5. 足りない情報はどこから取れるか\n6. 補助線を引くと三角形に分けられるか\n7. 文字があるなら定義域と最大最小を確認する\n\nこの順番で整理すると、問題文の情報を使い切りやすくなります。",
},
{
kind: "workedExample",
title: "例1：余弦定理と面積公式の融合",
body: "三角形ABCで、$AB=6$、$AC=8$、$\\angle A=60^\\circ$ とします。辺 $BC$ と面積 $S$ を求めます。\n\nまず辺 $BC$ を求めます。2辺とその間の角が分かっているので、余弦定理を使います。\n\n$BC^2=6^2+8^2-2\\cdot6\\cdot8\\cos60^\\circ$\n\n$=36+64-96\\cdot\\frac{1}{2}$\n\n$=100-48=52$\n\nしたがって、\n\n$BC=2\\sqrt{13}$\n\nです。\n\n次に面積を求めます。\n\n$S=\\frac{1}{2}\\cdot6\\cdot8\\cdot\\sin60^\\circ$\n\n$=24\\cdot\\frac{\\sqrt{3}}{2}$\n\n$=12\\sqrt{3}$\n\nです。\n\nこのように、同じ条件から余弦定理と面積公式を両方使うことがあります。",
},
{
kind: "workedExample",
title: "例2：外接円半径までつなげる",
body: "例1の三角形で、さらに外接円半径 $R$ を求めます。\n\nすでに、$AB=6$、$AC=8$、$BC=2\\sqrt{13}$、面積 $S=12\\sqrt{3}$ が分かっています。\n\n外接円半径には、\n\n$S=\\frac{abc}{4R}$\n\nを使います。\n\nここで、3辺は $6$、$8$、$2\\sqrt{13}$ です。\n\n$12\\sqrt{3}=\\frac{6\\cdot8\\cdot2\\sqrt{13}}{4R}$\n\n右辺の分子は $96\\sqrt{13}$ なので、\n\n$12\\sqrt{3}=\\frac{96\\sqrt{13}}{4R}=\\frac{24\\sqrt{13}}{R}$\n\nしたがって、\n\n$12\\sqrt{3}R=24\\sqrt{13}$\n\n$R=\\frac{2\\sqrt{13}}{\\sqrt{3}}=\\frac{2\\sqrt{39}}{3}$\n\nです。\n\n辺、面積、外接円半径は互いにつながっています。",
},
{
kind: "workedExample",
title: "例3：図形を関数化する",
body: "2辺の長さが $x$ と $10-x$、その間の角が $60^\\circ$ の三角形の面積を考えます。ただし $0<x<10$ とします。\n\n面積 $S$ は、\n\n$S=\\frac{1}{2}\\cdot x\\cdot(10-x)\\cdot\\sin60^\\circ$\n\n$=\\frac{1}{2}x(10-x)\\cdot\\frac{\\sqrt{3}}{2}$\n\n$=\\frac{\\sqrt{3}}{4}x(10-x)$\n\nです。\n\nこれは $x$ の二次関数です。\n\n$x(10-x)=-(x-5)^2+25$ なので、$x=5$ のとき最大になります。\n\nしたがって、面積の最大値は、\n\n$\\frac{\\sqrt{3}}{4}\\cdot25=\\frac{25\\sqrt{3}}{4}$\n\nです。\n\nこの問題は図形の面積問題ですが、最終的には二次関数の最大値問題になっています。",
},
{
kind: "strategy",
title: "共通テスト誘導の読み方",
body: "共通テストの図形と計量は、白紙から解く問題ではなく、**誘導が道具の順番を指定してくる** 問題です。空欄の直前の文が、どの定理・公式を使えと言っているかを読み取れば、方針で迷いません。\n\n読み方のコツは3つです。① 空欄の少し前に出てくるキーワードを見る。$\\cos$ を問うなら余弦定理、$\\dfrac{a}{\\sin A}$ や外接円なら正弦定理、面積なら $\\frac12ab\\sin C$ へ向かっている。② 前の設問で求めた値を次で使う（情報のリレー）。前問の答えは、次の問のための材料。③ 一つ詰まっても、求めたい量から別ルートを探す。面積はヘロンでも $\\frac12ab\\sin C$ でも出る。\n\n誘導に乗ることは、思考停止ではありません。「なぜここで $\\cos$ を出させるのか」を読むと、次に何が来るかまで予測できます。",
emphasis: "誘導は道具の順番の指定。空欄直前のキーワードから使う定理を読み、前問の答えを次へリレーする。",
},
{
kind: "workedExample",
title: "共通テスト誘導型：辺だけから面積・外接円・内接円へ",
body: "**問題**　三角形 $ABC$ で $AB=8$、$BC=5$、$CA=7$ とする。次の順に求めよ。(1) $\\cos\\angle ABC$　(2) 面積 $S$　(3) 外接円の半径 $R$　(4) 内接円の半径 $r$。\n\n**(1) $\\cos\\angle ABC$**　$\\angle ABC$ は辺 $BA=8$ と $BC=5$ にはさまれ、向かいは $CA=7$。3辺があるので余弦定理を角について使う。$\\cos\\angle ABC=\\dfrac{8^2+5^2-7^2}{2\\cdot8\\cdot5}=\\dfrac{64+25-49}{80}=\\dfrac{40}{80}=\\dfrac12$。よって $\\angle ABC=60^\\circ$。\n\n**(2) 面積 $S$**　挟角 $\\angle ABC=60^\\circ$ とそれをはさむ2辺 $8,5$ があるので $S=\\dfrac12\\cdot8\\cdot5\\cdot\\sin60^\\circ=20\\cdot\\dfrac{\\sqrt3}{2}=10\\sqrt3$。\n\n**別解（面積）**　3辺 $5,7,8$ でヘロン。$s=10$、$S=\\sqrt{10\\cdot5\\cdot3\\cdot2}=\\sqrt{300}=10\\sqrt3$。(1)を使わなくても面積は出せる。\n\n**(3) 外接円半径 $R$**　辺 $CA=7$ とその向かいの角 $\\angle ABC=60^\\circ$ のペアがあるので正弦定理。$2R=\\dfrac{7}{\\sin60^\\circ}=\\dfrac{7}{\\frac{\\sqrt3}{2}}=\\dfrac{14}{\\sqrt3}=\\dfrac{14\\sqrt3}{3}$。よって $R=\\dfrac{7\\sqrt3}{3}$。\n\n**(4) 内接円半径 $r$**　面積が出たので $S=rs$ を使う。$s=10$ より $10\\sqrt3=10r$、$r=\\sqrt3$。\n\n**検算**　$R=\\dfrac{7\\sqrt3}{3}\\approx4.04$ は最長辺 $8$ の半分 $4$ より少し大きく妥当。$r=\\sqrt3$ なら $rs=10\\sqrt3=S$ に戻る。面積は2通りとも $10\\sqrt3$。\n\n**ふり返り**　辺の情報だけから、$\\cos\\to$ 面積 $\\to R\\to r$ と道具をリレーした。これが共通テスト誘導の典型的な流れ。",
},
{
kind: "comparisonTable",
title: "融合問題で使う道具",
body: "問題文の情報を分解し、必要な道具を選びます。",
columns: ["状況", "使う道具", "目的"],
rows: [
{
cells: ["2辺とその間の角", "余弦定理", "残りの辺を求める"],
highlight: true,
},
{
cells: ["2辺とその間の角", "面積公式", "面積を求める"],
},
{
cells: ["3辺と面積", "外接円公式", "外接円半径を求める"],
},
{
cells: ["面積と半周長", "内接円公式", "内接円半径を求める"],
},
{
cells: ["量が文字で変化", "二次関数", "最大最小を求める"],
},
],
},
{
kind: "commonMistake",
title: "よくあるミス：1つの公式だけで解こうとする",
body: "融合問題では、1つの公式だけで最後まで解けるとは限りません。\n\nまず余弦定理で辺を求め、次に面積公式を使い、さらに外接円公式を使う、という流れもあります。\n\n途中で求めた値を次の公式に渡す意識が必要です。\n\n公式を1つだけ探すのではなく、情報をどうつなぐかを考えましょう。",
},
{
kind: "comparisonTable",
title: "仕上げ：崩れた判断から戻る完全攻略講座",
body: "融合問題で崩れたら、間違えた問題の見た目ではなく、崩れた判断で戻り先を選びます。",
columns: ["崩れた判断", "戻る完全攻略講座", "確認すること"],
rows: [
{ cells: ["どの定理を使うか迷った", "定理選択完全攻略", "求めたい量・情報の形・対応ペア"], highlight: true },
{ cells: ["面積公式・面積比で詰まった", "面積公式完全攻略", "挟角・分割・同じ高さ・$r$ と $R$"] },
{ cells: ["$\\sin$ で角が絞れない・鈍角判定", "鈍角・存在条件・SSA完全攻略", "$\\cos$ の符号・最大辺・成立条件"], highlight: true },
{ cells: ["図から式にできない・情報が散らかる", "図形情報整理・翻訳完全攻略", "既知量の分類・同じ量を2通り"] },
{ cells: ["三角比の基本・鈍角の値で不安", "三角比とは何か／鈍角の三角比と相互関係", "辺の対応・補角の公式・符号"] },
],
},
{
kind: "checkpoint",
title: "総仕上げの判断順",
body: "融合問題・共通テスト型を解いたら、次を最後に確認します。\n\n1. 求めたい量を含む三角形を選び、既知量を辺・角・面積・半径に分類したか。\n2. 誘導の各空欄が、どの定理・公式を指しているか読めたか。\n3. 前の設問の答えを次でリレーできたか。\n4. $\\sin$ から出した角は鋭角・鈍角の2候補を確認したか。\n5. 面積は2通りで検算できたか。長さは正、$|b-c|<a<b+c$ を満たすか。\n6. 別解（ヘロンと $\\frac12ab\\sin C$、正弦定理と余弦定理）で答えが一致するか。",
emphasis: "総仕上げは、公式を1つ選ぶことではなく、道具をリレーし、別ルートで検算できること。",
},
{
kind: "summary",
title: "まとめ",
body: "- 融合問題は情報のリレーとして考える\n- まず求めたいものを含む三角形を見る\n- 2辺とその間の角なら余弦定理や面積公式\n- 3辺と面積なら外接円公式\n- 面積と半周長なら内接円公式\n- 文字があるなら関数化して最大最小を考える\n- 難問ほど、計算前の設計が重要\n- 崩れたら、判断の型で戻る完全攻略講座を選ぶ",
},
],
checkQuestions: [
{
question: "2辺が $5$、$9$、その間の角が $60^\\circ$ の三角形の面積を求めよ。",
answer: "$S=\\frac{1}{2}\\cdot5\\cdot9\\cdot\\sin60^\\circ=\\frac{45}{2}\\cdot\\frac{\\sqrt{3}}{2}=\\frac{45\\sqrt{3}}{4}$。",
hint: "2辺とその間の角なので面積公式。",
},
{
question: "2辺が $5$、$9$、その間の角が $60^\\circ$ の三角形で、残りの辺を求めるには何を使うか。",
answer: "余弦定理を使う。残りの辺を $a$ とすると、$a^2=5^2+9^2-2\\cdot5\\cdot9\\cos60^\\circ$。",
hint: "2辺とその間の角から残りの辺。",
},
{
question: "図形と計量の融合問題で、文字 $x$ を置いたあとに必ず確認すべきことは何か。",
answer: "$x$ の定義域。長さや点の位置には範囲があるため。",
hint: "関数化したら範囲を確認する。",
},
],
relatedPracticeLinks: [
{ label: "定理選択完全攻略", href: "/courses/math-1a/figures-and-measurement/theorem-selection-mastery", description: "どの定理を使うか迷ったら" },
{ label: "面積公式完全攻略", href: "/courses/math-1a/figures-and-measurement/triangle-area-mastery", description: "面積・面積比で詰まったら" },
{ label: "鈍角・存在条件・SSA完全攻略", href: "/courses/math-1a/figures-and-measurement/obtuse-ssa-existence-mastery", description: "角が絞れない・鈍角判定で迷ったら" },
{ label: "図形情報整理・翻訳完全攻略", href: "/courses/math-1a/figures-and-measurement/figure-info-translation-mastery", description: "図から式にできないとき" },
{ label: "図形と計量 中核講義", href: "/common-test/lectures/geometry-measurement-intensive", description: "冊子型模試の復習先" },
{ label: "二次関数 最大最小", href: "/courses/math-1a/quadratic/quadratic-max-min-domain" },
{ label: "過去問道場", href: "/dojo" },
],
qualityTags: ["旧帝大準備", "融合問題", "総合演習", "共通テスト誘導", "別解あり", "弱点別復習ルーティング", "余弦定理", "面積公式", "最大最小", "検算あり"],
},
];

export const FIGURES_AND_MEASUREMENT_UNIT: CourseUnit = {
unitId: "figures-and-measurement",
subjectId: "math-1a",
unitTitle: "図形と計量",
unitDescription:
"図形と計量は、三角比・正弦定理・余弦定理・面積公式を覚える単元ではありません。図形情報を辺・角・高さ・面積・円の半径へ翻訳し、どの定理を使えば一番少ない情報で目的量に届くかを判断する単元です。問題文と図を見た瞬間に、初手・補助線・使う定理・角の候補・存在条件・検算まで判断できる状態を目指します。基礎講座で三角比と定理の意味を固め、完全攻略講座で定理選択・面積公式・鈍角とSSA・図形情報の翻訳まで判断できるようにします。",
lessons: [
...FIGURES_MEASUREMENT_BEGINNER,
...FIGURES_MEASUREMENT_STANDARD,
...FIGURES_MEASUREMENT_ADVANCED,
],
};
