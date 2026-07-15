import type { CourseLesson, CourseUnit } from "@/types/course";

function dataUseLesson(input: {
  lessonId: string;
  lessonTitle: string;
  lessonDescription: string;
  estimatedMinutes: number;
  prerequisites: string[];
  goals: string[];
  conceptTitle: string;
  concept: string;
  tableTitle: string;
  tableBody: string;
  columns: string[];
  rows: string[][];
  exampleTitle: string;
  example: string;
  workflowTitle: string;
  workflow: string;
  mistakes: string;
  summary: string;
  nextStep: string;
  checks: readonly [string, string, string?][];
  practiceId: string;
  tags: string[];
}): CourseLesson {
  return {
    lessonId: input.lessonId,
    lessonTitle: input.lessonTitle,
    lessonDescription: input.lessonDescription,
    level: "beginner",
    estimatedMinutes: input.estimatedMinutes,
    prerequisites: input.prerequisites,
    goals: input.goals,
    lessonBlocks: [
      { kind: "intro", title: "データの流れから考える", body: input.lessonDescription },
      { kind: "concept", title: input.conceptTitle, body: input.concept },
      {
        kind: "comparisonTable",
        title: input.tableTitle,
        body: input.tableBody,
        columns: input.columns,
        rows: input.rows.map((cells) => ({ cells })),
      },
      { kind: "workedExample", title: input.exampleTitle, body: input.example },
      { kind: "stepByStep", title: input.workflowTitle, body: input.workflow },
      { kind: "commonMistake", title: "よくある誤解", body: input.mistakes },
      { kind: "summary", title: "まとめ", body: input.summary },
      { kind: "nextStep", title: "次に学ぶ内容", body: input.nextStep },
    ],
    checkQuestions: input.checks.map(([question, answer, hint]) => ({ question, answer, hint })),
    relatedPracticeLinks: [
      {
        label: `${input.lessonTitle}の演習へ`,
        href: `/informatics/problems/${input.practiceId}`,
        description: "用語だけでなく、表・計算・状況から判断する練習をします。",
      },
    ],
    qualityTags: ["original", "informatics-1", "sprint-4", ...input.tags],
  };
}

export const NETWORK_DATA_USE_UNIT: CourseUnit = {
  unitId: "network-data-use",
  subjectId: "informatics-1",
  unitTitle: "ネットワークとデータ活用",
  unitDescription:
    "ネットワーク、Internet・Web、データベース、データ分析を、データが届き、整理され、判断に使われる流れとして学びます。",
  lessons: [
    dataUseLesson({
      lessonId: "network-communication",
      lessonTitle: "ネットワークと通信の仕組み",
      lessonDescription:
        "LANとWAN、クライアントとサーバ、パケット交換、プロトコル、通信速度・転送時間・遅延を関連づけます。",
      estimatedMinutes: 40,
      prerequisites: ["bitとBの違い", "データ量と転送時間の基本計算"],
      goals: [
        "LANとWANを範囲と接続の観点で区別できる",
        "クライアントとサーバの役割を要求と応答で説明できる",
        "パケット交換とプロトコルが通信に必要な理由を説明できる",
        "bit/sとデータ量から理論転送時間を計算し、遅延や実効速度との差を説明できる",
      ],
      conceptTitle: "ネットワークは決められた手順でデータを運ぶ",
      concept:
        "学校や家庭など限られた範囲のネットワークをLAN、離れたLAN同士を結ぶ広域のネットワークをWANと呼びます。サービスを要求する側がクライアント、要求を受けてデータや機能を提供する側がサーバです。大きなデータは小さなパケットに分け、宛先などの制御情報を付けて送ります。別々の経路を通ったパケットも受信側で並べ直せます。通信の形式や手順を定めるプロトコルがあるため、異なる機器同士でもやり取りできます。TCP/IPは複数のプロトコルの集まりとして、分割・到達確認や宛先に基づく配送などを分担します。",
      tableTitle: "通信の観点を区別する",
      tableBody: "帯域幅が大きくても遅延が小さいとは限りません。有線・無線も目的と環境で選びます。",
      columns: ["観点", "意味", "例・注意"],
      rows: [
        ["通信速度・帯域幅", "単位時間に運べる情報量。bit/sで表す", "100 Mbit/sなど。理論上限と実効速度は異なる"],
        ["遅延", "送ってから応答が届くまでの時間", "距離、混雑、処理待ちの影響を受ける"],
        ["有線", "ケーブルで接続", "安定しやすいが配線が必要"],
        ["無線", "電波などで接続", "移動しやすいが距離や障害物、混雑の影響を受ける"],
      ],
      exampleTitle: "24 MBを12 Mbit/sで送る理論時間",
      example:
        "問題中で1 B=8 bit、1 MB=1,000,000 Bと定めると、24 MBは24×8=192 Mbitです。理論転送時間は192 Mbit÷12 Mbit/s=16秒です。実際はパケットの制御情報、他の通信との共有、再送、機器の処理などがあるため、16秒以上になることがあります。",
      workflowTitle: "通信できないときの基本的な切り分け",
      workflow:
        "まず1台だけか複数台かを確かめます。次に物理的な接続や無線接続、端末の設定、同じLAN内の機器、LAN外の接続先の順に範囲を分けます。特定のWebサイトだけか、全ての通信か、名前では失敗してIPアドレスでは届くかを確認すると、端末・LAN・外部回線・名前解決のどこに原因がありそうか絞れます。攻撃や回避を試すのではなく、管理者へ観察結果を正確に伝えます。",
      mistakes:
        "- **100 Mbit/sなら100 MBを1秒で送れる** — 1 B=8 bitなので単位換算が必要です。\n- **帯域幅が大きければ遅延も必ず小さい** — 運べる量と応答までの時間は別の観点です。\n- **パケットは必ず同じ経路を通る** — 経路が分かれる場合があります。\n- **無線は常に遅く、有線は常に速い** — 規格、距離、混雑、機器など条件で変わります。",
      summary:
        "LANとWANは範囲、クライアントとサーバは要求と提供の役割で区別します。パケット交換はデータを分割して運び、プロトコルは通信の手順を共有します。転送時間はbitへ単位をそろえて計算し、理論値と実時間、帯域幅と遅延を分けて考えます。",
      nextStep:
        "通信の土台の上で、IPアドレス、ドメイン名、DNS、URL、HTTP・HTTPSがWebの要求と応答をどう支えるかを学びます。",
      checks: [
        ["LANとWANの違いを簡潔に答えてください。", "LANは限定された範囲、WANは離れたLANなどを結ぶ広域のネットワークです。"],
        ["8 MBは何Mbitですか。1 B=8 bitとします。", "64 Mbitです。"],
        ["理論転送時間より実時間が長くなる理由を一つ挙げてください。", "制御情報、混雑、再送、機器の処理などが加わるためです。"],
      ],
      practiceId: "joho-net-lan-wan",
      tags: ["network", "packet", "transfer"],
    }),
    dataUseLesson({
      lessonId: "internet-web-dns",
      lessonTitle: "インターネット・Web・名前解決",
      lessonDescription:
        "IPアドレス、ドメイン名、DNS、URL、HTTP・HTTPS、Web・メール、Cookieとセッションの基本を学びます。",
      estimatedMinutes: 40,
      prerequisites: ["クライアントとサーバ", "プロトコルの役割"],
      goals: [
        "IPアドレスとドメイン名をDNSが対応づける流れを説明できる",
        "URLのスキーム・ホスト・パスを区別できる",
        "ブラウザとWebサーバのHTTP要求・応答を説明できる",
        "HTTPSが保護する通信区間と、保証しない内容を説明できる",
      ],
      conceptTitle: "名前を宛先へ変換してWebサーバへ要求する",
      concept:
        "IPアドレスはネットワーク上の通信先を識別するための数値的な宛先です。人が扱いやすいドメイン名をIPアドレスへ対応づける仕組みがDNSです。URLは資源の場所を表し、`https://example.test/docs/page`ならhttpsがスキーム、example.testがホスト、/docs/pageがパスです。ブラウザはDNSで宛先を調べ、WebサーバへHTTPの要求を送り、サーバが文書などを応答します。",
      tableTitle: "Web通信で働く仕組み",
      tableBody: "仕組みごとに担当範囲が異なります。HTTPSだけでWebサイトの内容の信頼性まで保証されるわけではありません。",
      columns: ["仕組み", "主な役割", "注意"],
      rows: [
        ["DNS", "ドメイン名とIPアドレスを対応づける", "Web本文を転送する仕組みではない"],
        ["HTTP", "Webの要求と応答の形式を定める", "通信内容を暗号化しない"],
        ["HTTPS", "HTTP通信を暗号化し、改ざん検知や接続先確認を支える", "相手の提供内容や商取引の安全を無条件に保証しない"],
        ["Cookie・セッション", "複数の要求を同じ利用の流れとして扱う手掛かり", "Cookieそのものに重要情報を無制限に置くとは限らない"],
      ],
      exampleTitle: "URLから通信の流れを読む",
      example:
        "ブラウザで`https://study.example/lesson/3`を開くと、まずstudy.exampleに対応するIPアドレスをDNSで調べます。次にその宛先へ接続し、HTTPSで暗号化された通信路を作って、/lesson/3を求めるHTTP要求を送ります。Webサーバは状態コード、ヘッダー、本文などを応答し、ブラウザが表示します。",
      workflowTitle: "電子メールとWebセッション",
      workflow:
        "電子メールは送信者の端末から送信用サーバへ渡され、宛先側のサーバへ運ばれ、受信者が受信します。Webは要求ごとに独立しやすいため、ログイン後の利用者を区別する手掛かりとしてCookieとサーバ側セッションを組み合わせることがあります。Cookieはブラウザが次の要求に添える小さな情報で、セッションはサーバ側で利用状態を管理する考え方です。",
      mistakes:
        "- **DNSはWebページを保存するサーバ** — DNSは主に名前とIPアドレスを対応づけます。\n- **ドメイン名とIPアドレスは同じ文字列** — 人向けの名前と通信先識別の値で役割が異なります。\n- **HTTPSなら相手の内容も必ず安全** — 通信路は保護しても、相手が提供する情報の正しさや行為まで保証しません。\n- **Cookieは常にパスワードそのもの** — 実装はさまざまですが、通常は識別子などを安全属性とともに扱います。",
      summary:
        "DNSはドメイン名をIPアドレスへ対応づけ、URLはスキーム・ホスト・パスなどで場所を示します。ブラウザとWebサーバはHTTPで要求・応答し、HTTPSは通信路を暗号化します。Cookieとセッションは継続した利用状態を扱う導入的な仕組みです。",
      nextStep:
        "Webやアプリが集めたデータを、表、主キー、外部キーを使って重複を抑えながら整理し、検索・並べ替え・関連づけるデータベースへ進みます。",
      checks: [
        ["DNSの基本的な役割は何ですか。", "ドメイン名とIPアドレスを対応づけ、通信先を探せるようにすることです。"],
        ["URLのhttps、ホスト名、パスはそれぞれ何を表しますか。", "httpsは通信方式を示すスキーム、ホスト名は接続先、パスはその中の資源の場所を示します。"],
        ["HTTPSでも相手自体が安全とは限らないのはなぜですか。", "通信路の暗号化や接続先確認は支えますが、相手の内容や行為の正しさまでは保証しないからです。"],
      ],
      practiceId: "joho-web-dns-role",
      tags: ["internet", "dns", "web"],
    }),
    dataUseLesson({
      lessonId: "databases-data-organization",
      lessonTitle: "データベースとデータの整理",
      lessonDescription:
        "レコード・フィールド、主キー・外部キー、重複を抑えた複数表、検索・条件抽出・並べ替えを学びます。",
      estimatedMinutes: 45,
      prerequisites: ["行と列からなる表の読み取り", "条件に合うデータの選択"],
      goals: [
        "レコードとフィールドを行・列に対応づけられる",
        "主キーと外部キーの役割を区別できる",
        "複数表に分けることで重複と更新漏れを減らす考え方を説明できる",
        "SELECT・WHERE・ORDER BYの役割を製品に依存せず説明できる",
      ],
      conceptTitle: "表をキーで結び、同じ事実を何度も持たない",
      concept:
        "表形式データでは、1件分の行をレコード、項目を表す列をフィールドと呼びます。主キーは各レコードを一意に識別する値で、同じ表で重複しません。外部キーは別の表の主キーを参照し、表同士の関連を表します。例えば注文表に顧客名・住所を毎回書く代わりに顧客IDを置けば、顧客情報の重複を抑えられます。追加・更新・削除の際も、どの事実をどの表で管理するかを明確にします。",
      tableTitle: "顧客表と注文表の関係",
      tableBody: "注文表の顧客IDが顧客表の主キーを参照します。顧客名を注文ごとに重複保存しません。",
      columns: ["表", "主なフィールド", "キーと役割"],
      rows: [
        ["顧客", "顧客ID、氏名、地域", "顧客IDが主キー"],
        ["注文", "注文ID、顧客ID、商品、金額", "注文IDが主キー、顧客IDが外部キー"],
        ["関連結果", "注文ID、氏名、商品、金額", "顧客IDが一致する行を対応づけて得る"],
      ],
      exampleTitle: "条件抽出と並べ替え",
      example:
        "注文表から金額が3000以上の行だけを選ぶのが条件抽出です。その結果を金額の降順に並べれば、大きい注文から確認できます。SQLはデータベースへ操作を伝える言語で、導入的には`SELECT 項目 FROM 表 WHERE 条件 ORDER BY 項目`の順に、取得する項目、表、条件、並び順を指定します。実際の製品ごとの細部ではなく、操作の役割を押さえます。",
      workflowTitle: "データの追加・更新・削除を安全に考える",
      workflow:
        "追加では主キーが既存行と重複しないか、外部キーの参照先が存在するかを確認します。更新では同じ事実を複数箇所に重複保存していないか確認します。削除では参照している別表の行への影響を考えます。検索・条件抽出・並べ替えは元データを消す操作とは限らず、必要な見え方を作る操作です。",
      mistakes:
        "- **表の1列がレコード** — 通常、1行がレコード、1列がフィールドです。\n- **主キーは同じ値があってよい** — 各行を一意に識別するため重複できません。\n- **外部キーも必ずその表で一意** — 同じ顧客に複数注文があれば顧客IDは繰り返せます。\n- **並べ替えると元データの意味が変わる** — 行の表示順を変えるだけで、各レコードの値は変わりません。",
      summary:
        "行がレコード、列がフィールドです。主キーは各行を一意に識別し、外部キーは別表の主キーを参照します。重複を抑えて表を分け、キーで関連づけると更新漏れを減らせます。条件抽出、並べ替え、SQLの役割を区別します。",
      nextStep:
        "整理したデータを収集目的と品質から見直し、欠損・外れ値を扱い、表やグラフで可視化し、相関・モデル・予測の限界を評価します。",
      checks: [
        ["レコードとフィールドは表のどこに対応しますか。", "レコードは通常1行、フィールドは1列に対応します。"],
        ["主キーと外部キーの違いを答えてください。", "主キーは自表の行を一意に識別し、外部キーは別表の主キーを参照して関連を表します。"],
        ["WHEREとORDER BYの役割を答えてください。", "WHEREは条件に合う行を抽出し、ORDER BYは指定した項目で並べ替えます。"],
      ],
      practiceId: "joho-db-record-field",
      tags: ["database", "key", "query"],
    }),
    dataUseLesson({
      lessonId: "data-analysis-visualization-modeling",
      lessonTitle: "データ分析・可視化・モデル化",
      lessonDescription:
        "データ収集から前処理、グラフ、クロス集計、相関、モデル化・予測までを、偏りと限界を含めて学びます。",
      estimatedMinutes: 45,
      prerequisites: ["表の読み取り", "平均の基本", "割合の計算"],
      goals: [
        "収集目的と対象を確認し、欠損値・外れ値を理由なく削除しない判断ができる",
        "比較・時間変化・関係に合うグラフを選べる",
        "クロス集計を計算し、相関と因果関係を区別できる",
        "訓練データと評価データ、データの偏りが予測へ与える影響を説明できる",
      ],
      conceptTitle: "収集・整理・可視化・解釈を一つの流れとして扱う",
      concept:
        "分析は数値を計算する前から始まります。目的に合う対象・項目・方法でデータを集め、出所と利用条件が明らかなオープンデータも活用します。欠損値は未回答・測定失敗など理由を調べ、補完・除外・欠損として扱う判断を記録します。外れ値も入力誤りとは限らず、珍しいが重要な事例かもしれません。前処理で単位や表記をそろえ、元データを保ちながら変更内容を記録します。",
      tableTitle: "目的に合う可視化を選ぶ",
      tableBody: "グラフの見た目ではなく、何を比較・確認したいかから選びます。軸や対象範囲も明示します。",
      columns: ["目的", "向く表現", "読み取ること"],
      rows: [
        ["項目間の大きさを比較", "棒グラフ", "棒の長さの差"],
        ["時間に沿う変化", "折れ線グラフ", "増減や転換点"],
        ["2変量の関係", "散布図", "関係の向き・強さ、外れた点"],
        ["2分類の組合せ", "クロス集計表", "組ごとの件数・割合"],
      ],
      exampleTitle: "相関は原因を証明しない",
      example:
        "気温と冷たい飲料の販売数に正の相関が見られても、販売数が気温を上げたとは言えません。気温が販売へ影響した可能性、季節や休日など第三の要因、対象店舗の偏りを検討します。散布図は関係の手掛かりを示しますが、因果を確定するには調査設計や別の根拠が必要です。",
      workflowTitle: "モデルを作り、別データで確かめる",
      workflow:
        "現実の重要な関係を簡略化して表すのがモデルです。予測モデルを作るデータを訓練データ、作成中に使わなかった性能確認用データを評価データと呼びます。同じデータだけで作成と評価をすると、既知の例に合わせすぎた性能を過大評価する恐れがあります。収集対象が一部の地域・年代に偏れば、別の対象への予測も偏るため、対象範囲と限界を報告します。",
      mistakes:
        "- **欠損値や外れ値は必ず削除する** — 理由と目的を確認し、残す・補う・除く判断を記録します。\n- **相関があれば因果関係がある** — 第三の要因や逆方向の関係を検討します。\n- **大きく見せるグラフほど分かりやすい** — 軸の切り方で差を誇張しないようにします。\n- **訓練データで高精度なら将来も同じ** — 未使用の評価データと対象の偏りを確認します。",
      summary:
        "分析は目的に合う収集、品質確認、前処理、可視化、解釈、報告の流れです。欠損・外れ値を機械的に削除せず、棒・折れ線・散布図・クロス集計を目的で選びます。相関と因果を分け、モデルは別の評価データで確かめ、偏りと限界を示します。",
      nextStep:
        "16講座で学んだ問題解決、情報デザイン、セキュリティ、デジタル表現、プログラミング、ネットワーク、データ活用を横断する演習で復習します。",
      checks: [
        ["欠損値を見つけたら最初に何を確認しますか。", "欠損の理由、収集方法、分析目的への影響を確認します。"],
        ["時間変化と2変量の関係にはそれぞれ何が向きますか。", "時間変化には折れ線グラフ、2変量の関係には散布図が向きます。"],
        ["訓練データと評価データを分ける理由は何ですか。", "作成に使っていないデータで、未知の例への性能をより公平に確かめるためです。"],
      ],
      practiceId: "joho-data-missing-outlier",
      tags: ["data-analysis", "visualization", "modeling"],
    }),
  ],
};
