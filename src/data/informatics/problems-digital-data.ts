import type { InformaticsProblem } from "./problem-types";

// 情報Ⅰ 第2スプリント — コンピュータとデジタルデータの表現。
// 数値問題の explanation には、問題文の値だけで再計算できる途中式を記録する。

export const INFORMATICS_DIGITAL_DATA_PROBLEMS: readonly InformaticsProblem[] = [
  // ── 講座1：コンピュータの構成と基本動作 ────────────────────────────────
  {
    id: "joho-comp-cpu-role",
    title: "CPUの2つの役割",
    lessonId: "computer-components-operation",
    kind: "single-choice",
    difficulty: "basic",
    estimatedMinutes: 1,
    prompt:
      "CPUの内部で、命令を解読してほかの装置へ動作を指示する部分と、加算や大小比較を行う部分の組合せとして最も適切なものを選んでください。",
    choices: [
      { id: "a", text: "制御装置と演算装置", reason: "正答。制御装置が命令を解読して指示を出し、演算装置が算術演算や論理的な比較を行います。" },
      { id: "b", text: "補助記憶装置と入力装置", reason: "誤り。補助記憶装置は長期保存、入力装置は外部情報の受け取りを担い、どちらもCPU内部の2部分ではありません。" },
      { id: "c", text: "主記憶装置と出力装置", reason: "誤り。主記憶装置は実行中の命令やデータを置き、出力装置は結果を外部へ伝えます。" },
      { id: "d", text: "OSとアプリケーション", reason: "誤り。OSとアプリケーションはソフトウェアの分類であり、CPU内部の装置名ではありません。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "CPUは処理の中心です。基本的な役割を分けると、制御装置は命令の取り出し・解読・各装置への指示を担い、演算装置は計算や比較を担います。CPUは主記憶装置と命令・データをやり取りしながら動きます。",
    reviewTags: ["CPU", "制御装置", "演算装置"],
  },
  {
    id: "joho-comp-memory-difference",
    title: "主記憶と補助記憶の違い",
    lessonId: "computer-components-operation",
    kind: "true-false",
    difficulty: "basic",
    estimatedMinutes: 1,
    prompt:
      "「主記憶装置は実行中の命令やデータをCPUが利用する作業場所であり、補助記憶装置は文書やプログラムを長期間保存する保管場所として使われる。」この記述は正しいですか。",
    choices: [
      { id: "true", text: "正しい", reason: "正答。主記憶はCPUが直接利用する作業場所、補助記憶は電源を切った後もデータを保つ長期保存場所という役割があります。" },
      { id: "false", text: "誤り", reason: "誤り。記述は両者の基本的な役割を正しく区別しています。速さだけでなく、CPUからの使われ方と保持の目的が異なります。" },
    ],
    correctChoiceIds: ["true"],
    explanation:
      "アプリやデータは補助記憶装置に保存され、利用時に必要部分が主記憶装置へ読み込まれます。一般的な主記憶は電源を切ると内容を失いますが、補助記憶は通常保持します。",
    reviewTags: ["主記憶装置", "補助記憶装置"],
  },
  {
    id: "joho-comp-instruction-cycle",
    title: "命令実行の順序",
    lessonId: "computer-components-operation",
    kind: "scenario",
    difficulty: "standard",
    estimatedMinutes: 2,
    prompt:
      "CPUが主記憶装置に置かれたプログラムを実行します。命令1つを処理する基本の順序として最も適切なものを選んでください。",
    choices: [
      { id: "a", text: "命令を取り出す → 解読する → 実行する → 結果を保存して次へ進む", reason: "正答。命令を主記憶から取り出し、制御装置が解読し、必要な処理を実行して結果を反映する流れです。" },
      { id: "b", text: "結果を保存する → 命令を作る → 電源を切る → 入力する", reason: "誤り。CPUは実行中に命令そのものを毎回作るのではなく、プログラムとして用意された命令を取り出します。" },
      { id: "c", text: "すべての命令を同時に解読する → 補助記憶だけで演算する", reason: "誤り。基本説明では命令を順に扱い、CPUは主記憶との間で命令・データをやり取りします。" },
      { id: "d", text: "出力する → 入力する → OSを削除する → 演算する", reason: "誤り。入出力の順序を固定したものではなく、OSを削除する処理でもありません。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "基本の流れは取り出し、解読、実行、結果の保存です。実際のCPUには高速化の工夫がありますが、情報Ⅰではこの流れで制御装置と演算装置、主記憶の関係を捉えます。",
    reviewTags: ["命令", "プログラム", "命令実行"],
  },
  {
    id: "joho-comp-os-functions",
    title: "OSが担う機能",
    lessonId: "computer-components-operation",
    kind: "multi-select",
    difficulty: "standard",
    estimatedMinutes: 2,
    prompt: "OSの基本的な役割として適切なものをすべて選んでください。",
    choices: [
      { id: "a", text: "複数のアプリへCPU時間や主記憶を割り当てる", reason: "正答。OSは処理装置や主記憶などの資源を管理し、複数の処理が動けるように調整します。" },
      { id: "b", text: "ファイルやフォルダを管理する", reason: "正答。データを名前や場所と結びつけて保存・取得できる仕組みを提供します。" },
      { id: "c", text: "入出力装置をアプリから利用できる共通の仕組みを提供する", reason: "正答。アプリが装置固有の制御をすべて直接実装せずに済むよう仲介します。" },
      { id: "d", text: "どのような誤った入力でも必ず正しい答えへ修正する", reason: "誤り。OSは資源や装置を管理しますが、アプリへ与えたデータの意味や計算結果の正しさを保証するものではありません。" },
    ],
    correctChoiceIds: ["a", "b", "c"],
    explanation:
      "OSはハードウェアとアプリケーションの間で、CPU・主記憶・ファイル・入出力装置などを管理します。利用者やアプリの誤りを自動的にすべて正す機能ではありません。",
    reviewTags: ["OS", "ハードウェア", "ソフトウェア"],
  },
  {
    id: "joho-comp-lab-bottleneck",
    title: "実習室PCの遅さを診断する",
    lessonId: "computer-components-operation",
    kind: "scenario",
    difficulty: "ct-prep",
    estimatedMinutes: 3,
    prompt:
      "実習室で画像編集アプリと表計算アプリを同時に使うと、アプリの切替に時間がかかります。【観測表】CPU使用率: 20〜35%、主記憶使用率: 98%、補助記憶装置への読み書き: 切替のたびに長時間発生、画面表示: 正常。生徒Aは『CPUが遅い』、生徒Bは『主記憶が不足し、作業中データを補助記憶へ頻繁に退避している』と考えました。観測から最も妥当な判断を選んでください。",
    choices: [
      { id: "a", text: "生徒Bの判断が妥当で、まず同時に開くアプリを減らすか主記憶容量を見直す", reason: "正答。主記憶がほぼ満杯で補助記憶への読み書きが多い一方、CPU使用率は低めです。観測と原因候補が対応しています。" },
      { id: "b", text: "CPU使用率が100%ではないので、コンピュータは何も処理していない", reason: "誤り。CPUは処理しており、主記憶不足によるデータ移動を待つ時間が生じている可能性があります。" },
      { id: "c", text: "画面が正常なので、主記憶装置と補助記憶装置は使われていない", reason: "誤り。正常表示は出力装置が動いていることを示すだけで、記憶装置が使われていない根拠にはなりません。" },
      { id: "d", text: "OSを削除すれば装置管理がなくなり、必ず速くなる", reason: "誤り。OSは装置と資源を管理する基盤です。削除は解決策ではなく、アプリを通常利用できなくなります。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "会話と表を組み合わせ、CPU・主記憶・補助記憶のどこに負荷があるかを判断します。主記憶98%と頻繁な補助記憶アクセスが同時に観測されているため、主記憶不足という説明が最も整合します。CPU使用率だけで性能を決めつけないことが重要です。",
    reviewTags: ["主記憶装置", "補助記憶装置", "OS", "状況判断"],
  },

  // ── 講座2：2進数・10進数・16進数 ──────────────────────────────────────
  {
    id: "joho-bin-to-decimal",
    title: "2進数から10進数への変換",
    lessonId: "number-systems-bits",
    kind: "single-choice",
    difficulty: "basic",
    estimatedMinutes: 2,
    prompt: "2進数 (101101)₂ を10進数へ変換した値を選んでください。",
    choices: [
      { id: "a", text: "43", reason: "誤り。8の位または2の位の扱いを誤った値です。1が立つ位は32、8、4、1です。" },
      { id: "b", text: "45", reason: "正答。1×32 + 0×16 + 1×8 + 1×4 + 0×2 + 1×1 = 45です。" },
      { id: "c", text: "51", reason: "誤り。0が立つ16と2の位を加えてはいけません。" },
      { id: "d", text: "101101", reason: "誤り。桁の並びを10進数として読んだだけで、位の重みを変換していません。" },
    ],
    correctChoiceIds: ["b"],
    explanation:
      "右端から1、2、4、8、16、32の重みです。(101101)₂ = 32 + 8 + 4 + 1 = 45。別の検算として、左から『現在値×2+次のbit』を繰り返しても、1→2→5→11→22→45になります。",
    reviewTags: ["2進数", "10進数", "基数変換"],
  },
  {
    id: "joho-dec-to-binary",
    title: "10進数から2進数への変換",
    lessonId: "number-systems-bits",
    kind: "single-choice",
    difficulty: "basic",
    estimatedMinutes: 2,
    prompt: "10進数58を2進数へ変換した値を選んでください。",
    choices: [
      { id: "a", text: "(111010)₂", reason: "正答。58 = 32 + 16 + 8 + 2なので、32,16,8,4,2,1の各位は1,1,1,0,1,0です。" },
      { id: "b", text: "(111100)₂", reason: "誤り。この値は32+16+8+4=60です。" },
      { id: "c", text: "(101110)₂", reason: "誤り。この値は32+8+4+2=46です。" },
      { id: "d", text: "(110110)₂", reason: "誤り。この値は32+16+4+2=54です。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "58以下の2の累乗を大きい順に使うと、58−32−16−8−2=0です。したがって111010。別の検算として2で割った余りを下から読むと、58÷2余り0、29÷2余り1、14余り0、7余り1、3余り1、1余り1で111010になります。",
    reviewTags: ["10進数", "2進数", "基数変換"],
  },
  {
    id: "joho-bin-to-hex",
    title: "2進数から16進数への変換",
    lessonId: "number-systems-bits",
    kind: "single-choice",
    difficulty: "standard",
    estimatedMinutes: 2,
    prompt: "2進数 (10101111)₂ を16進数へ変換した値を選んでください。",
    choices: [
      { id: "a", text: "(AF)₁₆（afも同値）", reason: "正答。右から4 bitずつ1010と1111に分けると、10=A、15=Fです。" },
      { id: "b", text: "(A15)₁₆", reason: "誤り。16進数では15を2桁の15ではなく1桁のFで表します。" },
      { id: "c", text: "(5F)₁₆", reason: "誤り。左の1010は5ではなく、8+2=10なのでAです。" },
      { id: "d", text: "(10101111)₁₆", reason: "誤り。2進数の桁をそのまま16進数として読み替えたもので、4 bit単位の変換になっていません。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "16=2⁴なので4 bitずつ対応します。1010=10=A、1111=15=FよりAFです。検算するとAFは10×16+15=175、元の2進数も128+32+8+4+2+1=175です。16進数の英字は大文字・小文字で値が変わらないため、AFとafは同値です。",
    reviewTags: ["2進数", "16進数", "基数変換"],
  },
  {
    id: "joho-bit-states-required",
    title: "状態数と必要bit数",
    lessonId: "number-systems-bits",
    kind: "multi-select",
    difficulty: "standard",
    estimatedMinutes: 2,
    prompt: "bit数と表現できる状態について、正しい記述をすべて選んでください。",
    choices: [
      { id: "a", text: "6 bitでは2⁶=64通りを表せる", reason: "正答。各bitが0または1の2通りなので、6桁の組合せは2⁶=64通りです。" },
      { id: "b", text: "50種類を区別するには最低6 bit必要である", reason: "正答。2⁵=32では不足し、2⁶=64で50種類を含められます。" },
      { id: "c", text: "1 B = 8 bitであり、1 Bでは256通りを表せる", reason: "正答。2⁸=256通りです。符号なし整数なら0〜255に対応します。" },
      { id: "d", text: "8 bitの符号なし整数では0から256までをすべて表せる", reason: "誤り。0を含む256通りなので範囲は0〜255です。256には9 bit必要です。" },
    ],
    correctChoiceIds: ["a", "b", "c"],
    explanation:
      "n bitの状態数は2ⁿです。必要bit数は必要な種類数以上になる最小のnを選びます。6 bitは64通り、1 B=8 bitは256通りです。0始まりの符号なし整数では最大値が状態数より1小さくなります。",
    reviewTags: ["bit", "byte", "状態数", "必要bit数"],
  },
  {
    id: "joho-bit-device-id-overflow",
    title: "端末IDのbit数を見直す",
    lessonId: "number-systems-bits",
    kind: "scenario",
    difficulty: "ct-prep",
    estimatedMinutes: 3,
    prompt:
      "学校の端末IDについて話し合っています。生徒A『現在は8 bitの符号なし整数でIDを付けている』、生徒B『普通教室120台と特別教室140台の合計260台へ、重複しないIDを0から順に付けたい』。【表】8 bit: 256通り・0〜255、9 bit: 512通り・0〜511。最も適切な判断を選んでください。",
    choices: [
      { id: "a", text: "8 bitでは4台分不足するため、最低9 bitへ増やす", reason: "正答。必要な状態は260通りで、8 bitの256通りを超えます。2⁹=512通りなので9 bitで足ります。" },
      { id: "b", text: "8 bitの最大値が255なので、端末255台までしか区別できない", reason: "誤り。ID 0も1台分として使えるため、0〜255で256台を区別できます。" },
      { id: "c", text: "260を2で割ると130なので、2 bitあれば足りる", reason: "誤り。bit数は割り算1回では決まりません。2ⁿが260以上になる最小のnを探します。" },
      { id: "d", text: "8 bitのまま256をIDとして使えば260台すべてに付けられる", reason: "誤り。8 bitの符号なし整数に256は表せず、桁あふれになります。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "必要数は120+140=260通りです。2⁸=256<260、2⁹=512≥260なので最低9 bitです。別検算として8 bitで使えるIDは0〜255の256個で、260−256=4台分が不足します。",
    reviewTags: ["必要bit数", "符号なし整数", "桁あふれ", "表の読解"],
  },

  // ── 講座3：文字・画像・音声のデジタル表現 ──────────────────────────────
  {
    id: "joho-media-character-code",
    title: "文字コードの役割",
    lessonId: "digital-text-image-audio",
    kind: "single-choice",
    difficulty: "basic",
    estimatedMinutes: 1,
    prompt: "文字コードの役割として最も適切な説明を選んでください。",
    choices: [
      { id: "a", text: "文字と数値を対応づけ、bit列を同じ規則で文字として解釈できるようにする", reason: "正答。送受信側が同じ対応規則を使うことで、数値から同じ文字を再現できます。" },
      { id: "b", text: "文字の意味を自動的に理解し、誤字を必ず修正する", reason: "誤り。文字コードは表現上の対応規則であり、文章の意味理解や校正を保証しません。" },
      { id: "c", text: "すべての文字を必ず1 Bで保存する", reason: "誤り。Unicodeの文字をbyte列にする方式や文字によって必要なbyte数は異なります。" },
      { id: "d", text: "画像の画素数を決める", reason: "誤り。画素数は画像の解像度に関する情報で、文字コードの役割ではありません。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "コンピュータは文字そのものではなく数値を記録します。文字コードは文字と数値の対応を定めます。Unicodeは多様な文字を共通に扱う体系ですが、実際のbyte列へ変換する方式は1つではありません。",
    reviewTags: ["文字コード", "Unicode"],
  },
  {
    id: "joho-media-resolution-gradation",
    title: "解像度・階調・RGB",
    lessonId: "digital-text-image-audio",
    kind: "multi-select",
    difficulty: "basic",
    estimatedMinutes: 2,
    prompt: "デジタル画像について正しい記述をすべて選んでください。",
    choices: [
      { id: "a", text: "800×600画素の画像は480,000画素から成る", reason: "正答。横画素数×縦画素数なので800×600=480,000画素です。" },
      { id: "b", text: "1画素を8 bitで表すと2⁸=256段階を区別できる", reason: "正答。n bitで表せる状態数は2ⁿ通りです。" },
      { id: "c", text: "RGB各8 bitなら1画素あたり24 bitである", reason: "正答。赤・緑・青の3成分が各8 bitなので8×3=24 bitです。" },
      { id: "d", text: "解像度を上げても画像の理論データ量は変わらない", reason: "誤り。1画素あたりbit数が同じなら、画素数が増えるほど理論データ量も増えます。" },
    ],
    correctChoiceIds: ["a", "b", "c"],
    explanation:
      "画像の細かさは画素数、1画素で表せる段階はbit数で考えます。RGB各8 bitは24 bit/画素です。非圧縮理論値は画素数×1画素あたりbit数なので、解像度を上げると増えます。",
    reviewTags: ["画素", "解像度", "階調", "RGB"],
  },
  {
    id: "joho-media-image-size",
    title: "画像データ量の計算",
    lessonId: "digital-text-image-audio",
    kind: "single-choice",
    difficulty: "standard",
    estimatedMinutes: 3,
    prompt:
      "横800画素、縦600画素、1画素24 bitの画像があります。1 B = 8 bitとし、ヘッダーや圧縮を無視した理論データ量をBで求めてください。",
    choices: [
      { id: "a", text: "1,440,000 B", reason: "正答。800×600×24÷8 = 1,440,000 Bです。" },
      { id: "b", text: "11,520,000 B", reason: "誤り。800×600×24=11,520,000はbit単位です。Bにするには8で割ります。" },
      { id: "c", text: "480,000 B", reason: "誤り。これは画素数です。1画素が24 bitであることを掛けていません。" },
      { id: "d", text: "60,000 B", reason: "誤り。画素数を8で割っただけで、1画素あたり24 bitを反映していません。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "画素数は800×600=480,000。bit量は480,000×24=11,520,000 bit。1 B=8 bitなので11,520,000÷8=1,440,000 Bです。別計算では24 bit=3 B/画素より480,000×3=1,440,000 Bです。これはヘッダー・圧縮を含まない理論値です。",
    reviewTags: ["画像データ量", "解像度", "bitとbyte"],
  },
  {
    id: "joho-media-audio-size",
    title: "音声データ量の計算",
    lessonId: "digital-text-image-audio",
    kind: "single-choice",
    difficulty: "standard",
    estimatedMinutes: 3,
    prompt:
      "標本化周波数44,100 Hz、量子化16 bit、2チャンネル、10秒の音声があります。1 B = 8 bitとし、ヘッダーや圧縮を無視した理論データ量をBで求めてください。",
    choices: [
      { id: "a", text: "1,764,000 B", reason: "正答。44,100×16×2×10÷8 = 1,764,000 Bです。" },
      { id: "b", text: "882,000 B", reason: "誤り。2チャンネルを掛けていないモノラル相当の値です。" },
      { id: "c", text: "14,112,000 B", reason: "誤り。計算結果14,112,000はbit単位であり、Bへ直すために8で割る必要があります。" },
      { id: "d", text: "705,600 B", reason: "誤り。10秒分とチャンネル数を正しく組み合わせた値ではありません。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "1秒あたり44,100標本×16 bit×2チャンネル。10秒では14,112,000 bit、8で割って1,764,000 Bです。別計算では16 bit=2 Bなので、44,100×2 B×2×10=1,764,000 B。実ファイルはヘッダーや圧縮で異なり得ます。",
    reviewTags: ["音声データ量", "標本化周波数", "量子化bit数"],
  },
  {
    id: "joho-media-recording-plan",
    title: "録音計画を表から選ぶ",
    lessonId: "digital-text-image-audio",
    kind: "scenario",
    difficulty: "ct-prep",
    estimatedMinutes: 4,
    prompt:
      "放送委員が非圧縮音声を2,000,000 Bの領域へ保存します。1 B = 8 bitです。【条件表】案A: 32,000 Hz・16 bit・モノラル・30秒、案B: 48,000 Hz・16 bit・ステレオ・20秒。ヘッダーは無視します。表と計算から最も適切な判断を選んでください。",
    choices: [
      { id: "a", text: "案Aだけ保存できる。案Aは1,920,000 B、案Bは3,840,000 Bである", reason: "正答。A=32,000×16×1×30÷8=1,920,000 B、B=48,000×16×2×20÷8=3,840,000 Bです。" },
      { id: "b", text: "案Bだけ保存できる。録音時間が短いほど必ず小さくなる", reason: "誤り。案Bは時間が短くても、標本化周波数とチャンネル数が大きいため容量を超えます。" },
      { id: "c", text: "両方保存できる。標本化周波数は音質だけに関係し、データ量には影響しない", reason: "誤り。標本化周波数は1秒あたりの標本数なので、データ量へ比例して影響します。" },
      { id: "d", text: "どちらも保存できない。16 bitを16 Bとして計算する必要がある", reason: "誤り。16 bitは2 Bであり16 Bではありません。案Aは容量内です。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "音声理論値は標本化周波数×量子化bit数×チャンネル数×秒数÷8です。案Aは1.92 MB相当で上限内、案Bは3.84 MB相当で上限超過です。標本化周波数・量子化bit数・チャンネル数・時間の全条件を確認します。",
    reviewTags: ["音声データ量", "標本化周波数", "表の読解", "複数条件"],
  },

  // ── 講座4：データ量・圧縮・誤差 ────────────────────────────────────────
  {
    id: "joho-size-bit-byte-units",
    title: "bit・B・KB・KiB",
    lessonId: "data-size-compression-error",
    kind: "multi-select",
    difficulty: "basic",
    estimatedMinutes: 2,
    prompt:
      "この問題では1 B = 8 bit、1 KB = 1000 B、1 KiB = 1024 B、1 MB = 1,000,000 Bとします。正しい記述をすべて選んでください。",
    choices: [
      { id: "a", text: "1 KiBは1 KBより24 B大きい", reason: "正答。1024 B−1000 B=24 Bです。" },
      { id: "b", text: "2 MBは16,000,000 bitである", reason: "正答。2×1,000,000 B×8=16,000,000 bitです。" },
      { id: "c", text: "1 KBと1 KiBは常に同じデータ量である", reason: "誤り。この問題の定義では1000 Bと1024 Bで異なります。" },
      { id: "d", text: "小文字bと大文字Bはどちらもbyteを表す", reason: "誤り。一般にbはbit、Bはbyteを表します。1 B=8 bitです。" },
    ],
    correctChoiceIds: ["a", "b"],
    explanation:
      "単位の定義を先に固定します。KBは1000 B、KiBは1024 Bなので1024−1000=24 B差です。2 MBは2,000,000 Bで、2×1,000,000×8=16,000,000 bitです。通信速度のbit/sとファイル量のBを混同しないようにします。",
    reviewTags: ["bitとbyte", "KB", "KiB", "単位換算"],
  },
  {
    id: "joho-compression-lossless-choice",
    title: "用途に応じた圧縮方式",
    lessonId: "data-size-compression-error",
    kind: "multi-select",
    difficulty: "basic",
    estimatedMinutes: 2,
    prompt: "圧縮方式の選択として適切なものをすべて選んでください。",
    choices: [
      { id: "a", text: "プログラムのソースコードは1文字の変化でも動作が変わるため、可逆圧縮を使う", reason: "正答。元のbit列を完全に復元する必要があります。" },
      { id: "b", text: "Web掲載用の写真は、許容できる画質を保てるなら非可逆圧縮で小さくする選択がある", reason: "正答。用途上不要な細部を減らし、容量を大幅に小さくできる場合があります。" },
      { id: "c", text: "測定値の原本は数値が少し変わってもよいので、常に非可逆圧縮だけを使う", reason: "誤り。原本の正確な数値を完全に復元する必要があるなら可逆圧縮を選びます。" },
      { id: "d", text: "可逆圧縮は復元すると必ず元と異なるデータになる", reason: "誤り。可逆圧縮は元のbit列へ完全に戻せる方式です。" },
    ],
    correctChoiceIds: ["a", "b"],
    explanation:
      "方式はデータの種類だけでなく、何を失ってよいかで選びます。文章・プログラム・正確な測定値は完全復元が必要です。写真・音声・動画は用途に応じ、品質と容量のバランスから非可逆圧縮を選べます。",
    reviewTags: ["可逆圧縮", "非可逆圧縮", "用途判断"],
  },
  {
    id: "joho-size-transfer-time",
    title: "転送時間の計算",
    lessonId: "data-size-compression-error",
    kind: "single-choice",
    difficulty: "standard",
    estimatedMinutes: 3,
    prompt:
      "24 MBのファイルを12 Mbit/sで転送します。1 B = 8 bit、1 MB = 1,000,000 B、1 Mbit = 1,000,000 bitとし、通信制御用データや遅延を無視した理論転送時間を求めてください。",
    choices: [
      { id: "a", text: "2秒", reason: "誤り。24÷12だけを計算し、MBとMbitの8倍の違いを反映していません。" },
      { id: "b", text: "16秒", reason: "正答。24 MB=192 Mbitなので、192÷12=16秒です。" },
      { id: "c", text: "24秒", reason: "誤り。データ量を通信速度で割る前に同じbit単位へそろえる必要があります。" },
      { id: "d", text: "96秒", reason: "誤り。24 MBをbitへ直す8倍は必要ですが、その後さらに不要な倍率を掛けています。" },
    ],
    correctChoiceIds: ["b"],
    explanation:
      "24 MB×8=192 Mbit、192 Mbit÷12 Mbit/s=16 sです。byteで別計算すると12 Mbit/s÷8=1.5 MB/s、24÷1.5=16秒です。これは制御情報・混雑・再送を無視した理論値です。",
    reviewTags: ["転送時間", "通信速度", "bitとbyte"],
  },
  {
    id: "joho-compression-ratio",
    title: "圧縮率と削減率",
    lessonId: "data-size-compression-error",
    kind: "single-choice",
    difficulty: "standard",
    estimatedMinutes: 2,
    prompt:
      "この問題では圧縮率を『圧縮後のデータ量÷圧縮前のデータ量×100%』と定義します。20 MBのデータを5 MBへ圧縮したときの圧縮率と削減率の組合せを選んでください。",
    choices: [
      { id: "a", text: "圧縮率25%、削減率75%", reason: "正答。5÷20×100=25%、減った量は15 MBなので15÷20×100=75%です。" },
      { id: "b", text: "圧縮率75%、削減率25%", reason: "誤り。圧縮後/圧縮前と、減少分/圧縮前を逆にしています。" },
      { id: "c", text: "圧縮率4%、削減率96%", reason: "誤り。20÷5=4という倍率をそのまま百分率としており、問題の定義に従っていません。" },
      { id: "d", text: "圧縮率250%、削減率−150%", reason: "誤り。5/20を25ではなく2.5として扱うなど、割合の計算が誤っています。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "圧縮率=5÷20×100=25%。削減率=(20−5)÷20×100=75%。25%+75%=100%で検算できます。用語の定義は資料により異なることがあるため、問題文の定義を優先します。",
    reviewTags: ["圧縮率", "削減率", "割合"],
  },
  {
    id: "joho-rounding-compression-plan",
    title: "観測データの保存と転送を判断する",
    lessonId: "data-size-compression-error",
    kind: "scenario",
    difficulty: "ct-prep",
    estimatedMinutes: 4,
    prompt:
      "研究班が観測データと画像を扱います。生徒A『測定値1.24と1.24を各々小数第1位へ四捨五入してから合計する』、生徒B『数値原本は完全復元できる方式で保存する』。【画像表】圧縮前40 MB、圧縮後10 MB、回線8 Mbit/s。1 B=8 bit、1 MB=1,000,000 B、1 Mbit=1,000,000 bit、圧縮率=圧縮後÷圧縮前×100%とし、通信の付加情報は無視します。正しい判断を選んでください。",
    choices: [
      { id: "a", text: "Aの合計は2.4、正確な合計を最後に丸めると2.5で差が出る。数値原本は可逆圧縮、画像の圧縮率は25%、理論転送時間は10秒", reason: "正答。1.24→1.2を2つで2.4、先に加えると2.48→2.5。10/40=25%、10 MB=80 Mbit、80/8=10秒です。" },
      { id: "b", text: "丸める順序で結果は変わらない。数値原本は非可逆圧縮、圧縮率75%、転送時間1.25秒", reason: "誤り。丸める時点で2.4と2.5の差が生じ、正確な原本に非可逆圧縮は不適切です。単位換算も誤っています。" },
      { id: "c", text: "Aの合計は2.48。圧縮後は40 MBで、転送時間40秒", reason: "誤り。Aは各値を先に小数第1位へ丸める条件なので2.4です。圧縮後は表にある10 MBです。" },
      { id: "d", text: "有限桁でも誤差は生じない。圧縮率は400%、転送時間80秒", reason: "誤り。丸めにより誤差が生じます。圧縮率は圧縮後/圧縮前なので25%、80 Mbitを8 Mbit/sで送ると10秒です。" },
    ],
    correctChoiceIds: ["a"],
    explanation:
      "丸めを途中で行うと1.2+1.2=2.4、正確に加えて最後に丸めると2.48→2.5で0.1差が出ます。数値原本は完全復元が必要なので可逆圧縮です。画像は10÷40×100=25%。10 MB×8=80 Mbit、80÷8=10秒です。会話・表・単位・用途の4条件を順に確認します。",
    reviewTags: ["丸め誤差", "可逆圧縮", "圧縮率", "転送時間", "複数条件"],
  },
];
