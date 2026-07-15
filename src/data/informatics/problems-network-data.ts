import type {
  InformaticsChoice,
  InformaticsDifficulty,
  InformaticsProblem,
  InformaticsProblemKind,
} from "./problem-types";

const choice = (id: string, text: string, correct: boolean, reason: string): InformaticsChoice => ({
  id,
  text,
  reason: `${correct ? "正答" : "誤り"}：${reason}`,
});

function problem(input: {
  id: string;
  title: string;
  lessonId: string;
  kind: InformaticsProblemKind;
  difficulty: InformaticsDifficulty;
  prompt: string;
  choices: readonly InformaticsChoice[];
  correctChoiceIds: readonly string[];
  explanation: string;
  solutionProcess: string;
  reviewTags: readonly string[];
  estimatedMinutes?: number;
}): InformaticsProblem {
  return {
    id: input.id,
    slug: input.id,
    title: input.title,
    lessonId: input.lessonId,
    kind: input.kind,
    difficulty: input.difficulty,
    estimatedMinutes: input.estimatedMinutes ?? (input.difficulty === "ct-prep" ? 6 : 3),
    prompt: input.prompt,
    choices: input.choices,
    correctChoiceIds: input.correctChoiceIds,
    explanation: input.explanation,
    solutionProcess: input.solutionProcess,
    reviewTags: input.reviewTags,
  };
}

function numberProblem(input: {
  id: string;
  title: string;
  lessonId: string;
  difficulty: InformaticsDifficulty;
  prompt: string;
  answer: number;
  mistake: number;
  mistakeReason: string;
  explanation: string;
  solutionProcess: string;
  reviewTags: readonly string[];
  estimatedMinutes?: number;
}): InformaticsProblem {
  return {
    ...problem({
      ...input,
      kind: "number",
      choices: [
        choice("answer", String(input.answer), true, "単位をそろえて独立計算した値と一致する。"),
        choice("mistake", String(input.mistake), false, input.mistakeReason),
      ],
      correctChoiceIds: ["answer"],
    }),
    correctNumber: input.answer,
  };
}

export const NETWORK_DATA_PROBLEMS: readonly InformaticsProblem[] = [
  problem({
    id: "joho-net-lan-wan",
    title: "LANとWANの区別",
    lessonId: "network-communication",
    kind: "single-choice",
    difficulty: "basic",
    prompt: "校内の教室と職員室を結ぶネットワークと、離れた複数校のLANを結ぶネットワークの説明として最も適切なものを選びなさい。",
    choices: [
      choice("a", "校内はLAN、離れたLAN同士を結ぶものはWAN", true, "限定範囲と広域接続の区別に合う。"),
      choice("b", "校内はWAN、離れた接続はLAN", false, "LANとWANの範囲を逆にしている。"),
      choice("c", "有線ならLAN、無線ならWAN", false, "有線・無線ではなく主に範囲と接続で区別する。"),
      choice("d", "サーバがあればWAN、なければLAN", false, "サーバの有無はLAN・WANの定義ではない。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "LANは学校や家庭など限定された範囲、WANは離れたLANなどを結ぶ広域ネットワークです。接続媒体だけでは決まりません。",
    solutionProcess: "範囲を確認：校内=限定範囲→LAN、複数校間=広域→WAN。",
    reviewTags: ["LAN", "WAN"],
  }),
  problem({
    id: "joho-net-client-server",
    title: "クライアントとサーバの役割",
    lessonId: "network-communication",
    kind: "single-choice",
    difficulty: "basic",
    prompt: "ブラウザが資料を要求し、別のコンピュータが資料を返す場面で、役割の説明として正しいものを選びなさい。",
    choices: [
      choice("a", "要求するブラウザ側がクライアント、提供する側がサーバ", true, "要求と提供の役割に合う。"),
      choice("b", "要求する側がサーバ、提供する側がクライアント", false, "役割を逆にしている。"),
      choice("c", "両方とも必ずサーバ", false, "この場面では要求側と提供側の役割を区別できる。"),
      choice("d", "端末の大きさだけで役割が決まる", false, "機器の大きさではなく通信時の役割で決まる。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "クライアントはサービスを要求し、サーバは要求を受けてデータや機能を提供します。同じ機器が場面により別の役割を持つこともあります。",
    solutionProcess: "資料要求→クライアント、要求を受け資料応答→サーバ。",
    reviewTags: ["クライアント", "サーバ"],
  }),
  problem({
    id: "joho-net-packet-protocol",
    title: "パケット交換とプロトコル",
    lessonId: "network-communication",
    kind: "multi-select",
    difficulty: "standard",
    prompt: "ネットワーク通信について正しい説明をすべて選びなさい。",
    choices: [
      choice("a", "データをパケットに分け、宛先などを付けて送る", true, "パケット交換の基本に合う。"),
      choice("b", "プロトコルは通信の形式や手順を共有する約束である", true, "異なる機器が同じ手順で通信する基礎になる。"),
      choice("c", "全パケットは必ず同じ経路を同じ時刻に通る", false, "経路や到着順が異なる場合がある。"),
      choice("d", "TCP/IPは1本の物理ケーブルの名称である", false, "通信を支える複数プロトコルの体系を指す。"),
    ],
    correctChoiceIds: ["a", "b"],
    explanation: "パケット交換では分割したデータに制御情報を付け、受信側で並べ直します。プロトコルは通信の約束です。正答集合はaとbです。",
    solutionProcess: "分割・宛先付与・再構成をパケット交換、形式・手順の共有をプロトコルとして判定。",
    reviewTags: ["パケット", "プロトコル", "TCP/IP"],
  }),
  numberProblem({
    id: "joho-net-transfer-time",
    title: "通信速度と理論転送時間",
    lessonId: "network-communication",
    difficulty: "standard",
    prompt: "20 MBのデータを10 Mbit/sで送る理論上の最短時間を秒で答えなさい。1 B=8 bit、1 MB=1,000,000 Bとし、制御情報・混雑・再送は無視する。",
    answer: 16,
    mistake: 2,
    mistakeReason: "MBをMbitへ換算せず、20÷10だけを計算している。",
    explanation: "20 MBは20×8=160 Mbitです。160 Mbit÷10 Mbit/s=16秒です。実通信では追加の時間がかかり得ます。",
    solutionProcess: "20 MB×8=160 Mbit、160÷10=16秒。",
    reviewTags: ["通信速度", "転送時間", "bit-byte"],
  }),
  problem({
    id: "joho-net-troubleshooting-ct",
    title: "通信障害を表から切り分ける",
    lessonId: "network-communication",
    kind: "scenario",
    difficulty: "ct-prep",
    estimatedMinutes: 7,
    prompt: "表：端末Aは校内共有サーバへ接続可・外部Web不可、端末Bも校内共有サーバへ接続可・外部Web不可、端末Cも同じ。最初に確認する範囲として最も適切なものを選びなさい。",
    choices: [
      choice("a", "各端末の画面設定だけでなく、校内LANから外部への接続経路を確認する", true, "複数端末で校内は通り外部だけ失敗するため、共通の外部接続側を優先できる。"),
      choice("b", "端末Aだけを初期化する", false, "3台で同じ症状なので1台固有の問題とは考えにくく、初期化は過剰である。"),
      choice("c", "共有サーバを交換する", false, "全端末から共有サーバへ接続できている。"),
      choice("d", "無条件に無線の速度不足と断定する", false, "接続可否の表だけでは媒体や速度不足と断定できない。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "複数端末で共通し、LAN内は利用でき外部だけ失敗しています。観察結果から共通部分を絞り、外部接続経路を確認します。",
    solutionProcess: "3台共通→端末固有の可能性は低い。校内可→LAN内経路は動作。外部不可→共通の外部接続側を優先。",
    reviewTags: ["通信障害", "切り分け", "表"],
  }),

  problem({
    id: "joho-web-dns-role",
    title: "DNSの役割",
    lessonId: "internet-web-dns",
    kind: "single-choice",
    difficulty: "basic",
    prompt: "Webサイトのドメイン名を入力したとき、DNSが担う基本的な役割を選びなさい。",
    choices: [
      choice("a", "ドメイン名に対応するIPアドレスを調べる", true, "名前から通信先を得る役割に合う。"),
      choice("b", "Webページ本文を必ず暗号化する", false, "暗号化はHTTPSなど別の仕組みが担う。"),
      choice("c", "画像を圧縮して保存する", false, "名前解決の役割ではない。"),
      choice("d", "利用者のパスワードを決める", false, "認証情報の設定はDNSの基本役割ではない。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "DNSは人が扱いやすいドメイン名と、通信先を示すIPアドレスを対応づけます。Web本文の転送や暗号化そのものではありません。",
    solutionProcess: "ドメイン名→DNSによる名前解決→対応IPアドレス→接続。",
    reviewTags: ["DNS", "ドメイン名", "IPアドレス"],
  }),
  problem({
    id: "joho-web-url-structure",
    title: "URLの構造",
    lessonId: "internet-web-dns",
    kind: "single-choice",
    difficulty: "basic",
    prompt: "URL `https://learn.example/course/5` の説明として正しいものを選びなさい。",
    choices: [
      choice("a", "httpsはスキーム、learn.exampleはホスト、/course/5はパス", true, "URLの各部分を正しく対応づけている。"),
      choice("b", "httpsはドメイン名、learn.exampleはパス", false, "httpsは通信方式を示すスキームである。"),
      choice("c", "/course/5がIPアドレス", false, "これはホスト内の資源位置を示すパスである。"),
      choice("d", "learn.exampleがHTTPの状態コード", false, "これはホストを示す名前である。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "URLはスキーム、ホスト、パスなどから成ります。この例ではhttps、learn.example、/course/5です。",
    solutionProcess: "`https://`で区切ってスキーム、次の`/`までをホスト、残りをパスとして読む。",
    reviewTags: ["URL", "スキーム", "パス"],
  }),
  problem({
    id: "joho-web-http-https",
    title: "HTTPとHTTPSの保護範囲",
    lessonId: "internet-web-dns",
    kind: "multi-select",
    difficulty: "standard",
    prompt: "HTTPとHTTPSについて正しい説明をすべて選びなさい。",
    choices: [
      choice("a", "HTTPはWebの要求と応答の形式を定める", true, "ブラウザとWebサーバのやり取りを支える。"),
      choice("b", "HTTPSは通信内容の暗号化や改ざん検知を支える", true, "通信路の保護範囲として正しい。"),
      choice("c", "HTTPSなら販売者や掲載内容も必ず安全で正しい", false, "通信路の保護は相手の行為や内容の正しさを保証しない。"),
      choice("d", "HTTPとHTTPSはどちらもDNSと同じ名前解決だけを行う", false, "DNSとWebの要求・応答は役割が異なる。"),
    ],
    correctChoiceIds: ["a", "b"],
    explanation: "HTTPは要求・応答、HTTPSはその通信路の暗号化などを支えます。相手の提供内容まで無条件に安全とは言えません。正答集合はaとbです。",
    solutionProcess: "要求・応答=HTTP、通信路保護=HTTPS、相手内容の保証=範囲外。",
    reviewTags: ["HTTP", "HTTPS", "暗号化"],
  }),
  problem({
    id: "joho-web-ip-domain",
    title: "IPアドレスとドメイン名",
    lessonId: "internet-web-dns",
    kind: "true-false",
    difficulty: "standard",
    prompt: "『ドメイン名は人が扱いやすい名前で、DNSを通してIPアドレスへ対応づけられる。ドメイン名とIPアドレスは役割が異なる』という記述を判定しなさい。",
    choices: [
      choice("true", "正しい", true, "名前と通信先識別の役割を区別している。"),
      choice("false", "誤り", false, "DNSによる対応づけと両者の役割の違いは正しい。"),
    ],
    correctChoiceIds: ["true"],
    explanation: "ドメイン名は人向けの名前、IPアドレスは通信先を識別する値で、DNSが両者を対応づけます。常に一対一とは限りません。",
    solutionProcess: "名前=ドメイン、通信先識別=IP、対応づけ=DNSなので記述は正しい。",
    reviewTags: ["IPアドレス", "ドメイン名", "DNS"],
  }),
  problem({
    id: "joho-web-session-ct",
    title: "Web閲覧とログイン状態の流れ",
    lessonId: "internet-web-dns",
    kind: "scenario",
    difficulty: "ct-prep",
    estimatedMinutes: 7,
    prompt: "会話：A『URLを開くと最初に名前を調べるね』B『ログイン後は次の要求でも利用者を区別したい』。資料：①DNS ②HTTP要求・応答 ③Cookieとサーバ側セッション ④HTTPS。流れと注意の組として最も適切なものを選びなさい。",
    choices: [
      choice("a", "①で宛先を調べ、②で取得し、③で状態を関連づけ、④は通信路を保護するが相手内容までは保証しない", true, "各仕組みの役割とHTTPSの限界を正しく組み合わせる。"),
      choice("b", "③がIPアドレスを決め、①がログイン状態を保存する", false, "DNSとCookie・セッションの役割を逆にしている。"),
      choice("c", "④があれば①〜③は不要", false, "HTTPSは名前解決やHTTP、状態管理を置き換えない。"),
      choice("d", "②だけで通信相手の商取引上の安全を保証する", false, "HTTP要求・応答だけで相手の信頼性は保証できない。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "DNS、HTTP、Cookie・セッション、HTTPSは担当が異なります。順序と保護範囲を混同しないことが重要です。",
    solutionProcess: "名前解決①→接続・要求応答②/④→継続状態③。④の保証範囲は通信路。",
    reviewTags: ["DNS", "HTTP", "Cookie", "セッション", "会話"],
  }),

  problem({
    id: "joho-db-record-field",
    title: "レコードとフィールド",
    lessonId: "databases-data-organization",
    kind: "single-choice",
    difficulty: "basic",
    prompt: "生徒表で、1人分の行と『氏名』という列の呼び方の組として正しいものを選びなさい。",
    choices: [
      choice("a", "1人分の行はレコード、氏名の列はフィールド", true, "行と列の基本的な対応に合う。"),
      choice("b", "行はフィールド、列はレコード", false, "呼び方を逆にしている。"),
      choice("c", "両方とも主キー", false, "主キーは行を一意に識別する特定フィールドである。"),
      choice("d", "両方とも外部キー", false, "外部キーは別表の主キーを参照するフィールドである。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "表形式データでは、通常1件分の行がレコード、項目を表す列がフィールドです。",
    solutionProcess: "1人分=1件→レコード、氏名=項目→フィールド。",
    reviewTags: ["レコード", "フィールド"],
  }),
  problem({
    id: "joho-db-primary-key",
    title: "主キーの選択",
    lessonId: "databases-data-organization",
    kind: "single-choice",
    difficulty: "basic",
    prompt: "会員表の主キーとして最も適切なものを選びなさい。会員番号は各会員に異なる値を割り当て、氏名・学年・地域は重複し得る。",
    choices: [
      choice("a", "会員番号", true, "各レコードを一意に識別できる。"),
      choice("b", "氏名", false, "同姓同名があり得る。"),
      choice("c", "学年", false, "同じ学年の会員が複数いる。"),
      choice("d", "地域", false, "同じ地域の会員が複数いる。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "主キーには各行を一意に識別でき、欠けない値を選びます。条件では会員番号だけが該当します。",
    solutionProcess: "候補ごとに重複可能性を確認し、重複しない会員番号を選ぶ。",
    reviewTags: ["主キー", "一意性"],
  }),
  problem({
    id: "joho-db-filter",
    title: "条件抽出の結果",
    lessonId: "databases-data-organization",
    kind: "single-choice",
    difficulty: "standard",
    prompt: "商品表：(A,文具,800)、(B,書籍,1800)、(C,文具,1200)、(D,書籍,900)。条件『分類=文具 and 価格>=1000』で抽出される商品IDを選びなさい。",
    choices: [
      choice("a", "C", true, "文具かつ価格1200で両条件を満たす。"),
      choice("b", "AとC", false, "Aは文具だが価格800で条件未満。"),
      choice("c", "BとC", false, "Bは価格条件を満たすが分類が書籍。"),
      choice("d", "B、C、D", false, "価格または分類の一方だけを満たす行を含めている。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "and条件は分類と価格の両方を満たす必要があります。Cだけが該当します。",
    solutionProcess: "A:真and偽、B:偽and真、C:真and真、D:偽and偽→C。",
    reviewTags: ["条件抽出", "WHERE", "and"],
  }),
  problem({
    id: "joho-db-sort",
    title: "並べ替えの結果",
    lessonId: "databases-data-organization",
    kind: "single-choice",
    difficulty: "standard",
    prompt: "注文表：(P,金額2400)、(Q,金額3600)、(R,金額1800)、(S,金額3000)を金額の降順に並べる。注文IDの順を選びなさい。",
    choices: [
      choice("a", "Q, S, P, R", true, "3600、3000、2400、1800の大きい順である。"),
      choice("b", "R, P, S, Q", false, "小さい順の昇順である。"),
      choice("c", "P, Q, R, S", false, "元の登録順のままである。"),
      choice("d", "Q, P, S, R", false, "3000のSと2400のPの順が逆である。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "降順は値が大きいものから並べます。元の行の値は変えず、表示順だけを変えます。",
    solutionProcess: "金額を比較：3600(Q)>3000(S)>2400(P)>1800(R)。",
    reviewTags: ["並べ替え", "ORDER BY", "降順"],
  }),
  problem({
    id: "joho-db-join-ct",
    title: "2表を外部キーで対応づける",
    lessonId: "databases-data-organization",
    kind: "scenario",
    difficulty: "ct-prep",
    estimatedMinutes: 7,
    prompt: "顧客表：(C1,青木)、(C2,伊藤)、(C3,上田)。注文表：(O1,C2,本)、(O2,C1,ペン)、(O3,C2,ノート)。注文表の顧客IDは外部キーである。顧客名と商品を対応づけた結果を選びなさい。",
    choices: [
      choice("a", "O1伊藤-本、O2青木-ペン、O3伊藤-ノート", true, "顧客IDが一致するレコードを正しく関連づけている。"),
      choice("b", "O1青木-本、O2伊藤-ペン、O3上田-ノート", false, "表の行順だけで対応づけている。"),
      choice("c", "O1伊藤-本、O2青木-ペンだけ", false, "同じC2を参照するO3も関連づけられる。"),
      choice("d", "上田の注文が必ず1件ある", false, "顧客表に存在しても注文表にC3の行はない。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "注文表の顧客IDと顧客表の主キーを一致させます。同じ顧客C2に複数注文があっても正しく対応します。",
    solutionProcess: "O1:C2→伊藤、O2:C1→青木、O3:C2→伊藤。C3は参照なし。",
    reviewTags: ["外部キー", "表の結合", "複数表"],
  }),

  problem({
    id: "joho-data-missing-outlier",
    title: "欠損値と外れ値の扱い",
    lessonId: "data-analysis-visualization-modeling",
    kind: "multi-select",
    difficulty: "basic",
    prompt: "収集データに欠損値と他より極端に大きい値が見つかった。適切な対応をすべて選びなさい。",
    choices: [
      choice("a", "欠損や外れの理由と収集方法を確認する", true, "処理を決める前に原因と影響を調べる。"),
      choice("b", "元データを保ち、補完・除外などの変更を記録する", true, "分析の再現性と検討可能性を保てる。"),
      choice("c", "欠損値は理由に関係なく必ず0へ置き換える", false, "0という実値と未観測を混同する恐れがある。"),
      choice("d", "外れ値は必ず誤入力なので全て削除する", false, "珍しい重要事例や実際の極端値の可能性がある。"),
    ],
    correctChoiceIds: ["a", "b"],
    explanation: "欠損値・外れ値は理由と目的を調べ、残す・補う・除く判断を記録します。機械的な置換や削除はしません。正答集合はaとbです。",
    solutionProcess: "品質確認→原因確認→目的への影響評価→処理選択→変更記録。",
    reviewTags: ["欠損値", "外れ値", "前処理"],
  }),
  problem({
    id: "joho-data-graph-choice",
    title: "目的に合うグラフ選択",
    lessonId: "data-analysis-visualization-modeling",
    kind: "single-choice",
    difficulty: "basic",
    prompt: "1年間の月別気温の変化を時間の順に確認したい。最も適切なグラフを選びなさい。",
    choices: [
      choice("a", "折れ線グラフ", true, "時間に沿う連続的な増減を追いやすい。"),
      choice("b", "散布図", false, "主に2変量の関係を見る用途である。"),
      choice("c", "クロス集計表だけ", false, "2分類の組合せ件数を見る用途が中心である。"),
      choice("d", "項目名を並べただけの文章", false, "月ごとの増減を視覚的に比較しにくい。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "時間の順に変化を追う目的には折れ線グラフが適します。棒グラフは項目間比較、散布図は2変量の関係に向きます。",
    solutionProcess: "目的=時間変化→横軸を時間にした折れ線グラフ。",
    reviewTags: ["可視化", "折れ線グラフ", "グラフ選択"],
  }),
  problem({
    id: "joho-data-correlation-causation",
    title: "相関と因果関係",
    lessonId: "data-analysis-visualization-modeling",
    kind: "true-false",
    difficulty: "standard",
    prompt: "『ある地域で日照時間と飲料販売数に強い正の相関があれば、飲料販売が日照時間を増やしたと断定できる』という記述を判定しなさい。",
    choices: [
      choice("true", "正しい", false, "相関だけで因果の向きや第三の要因を確定できない。"),
      choice("false", "誤り", true, "季節や気温など第三の要因を検討する必要がある。"),
    ],
    correctChoiceIds: ["false"],
    explanation: "相関は関係の手掛かりですが、因果関係の証明ではありません。逆方向や第三の要因、調査対象の偏りを検討します。",
    solutionProcess: "観測された共変化→相関。原因の操作・時間順序・第三要因の検討なし→因果断定不可。",
    reviewTags: ["相関", "因果関係", "第三の要因"],
  }),
  numberProblem({
    id: "joho-data-cross-tab",
    title: "クロス集計の件数",
    lessonId: "data-analysis-visualization-modeling",
    difficulty: "standard",
    prompt: "回答表：(1年,利用)、(1年,未利用)、(2年,利用)、(2年,利用)、(1年,利用)、(2年,未利用)。学年×利用状況でクロス集計したとき、『2年かつ利用』の件数を答えなさい。",
    answer: 2,
    mistake: 3,
    mistakeReason: "2年の全件数を数え、利用条件を適用していない。",
    explanation: "2年の3行のうち利用は2行なので、該当セルの件数は2です。",
    solutionProcess: "2年の行を抽出→(利用,利用,未利用)→利用を数えて2。",
    reviewTags: ["クロス集計", "件数", "条件抽出"],
  }),
  problem({
    id: "joho-data-bias-model-ct",
    title: "平均・評価データ・偏りを組み合わせる",
    lessonId: "data-analysis-visualization-modeling",
    kind: "scenario",
    difficulty: "ct-prep",
    estimatedMinutes: 8,
    prompt: "会話：A『訓練データの得点は60,70,80で平均を確認した』B『評価データ30,40では予測誤差が大きい。訓練データは都市部だけから集めた』。計算と判断の組として最も適切なものを選びなさい。",
    choices: [
      choice("a", "訓練平均70。収集対象の偏りと未知データへの性能を調べ、対象範囲と限界を報告する", true, "平均計算、評価データの役割、偏りへの対応がすべて適切。"),
      choice("b", "訓練平均210。訓練データで作ったので評価データは無視する", false, "210は合計で平均ではなく、評価データは未知例への性能確認に必要。"),
      choice("c", "訓練平均70。評価データを訓練データと同じ値に書き換える", false, "性能を公平に測れず、データ改変になる。"),
      choice("d", "訓練平均80。都市部だけでも全地域へ同じ精度を断定する", false, "平均が誤り、対象の偏りによる一般化の限界も無視している。"),
    ],
    correctChoiceIds: ["a"],
    explanation: "平均は(60+70+80)÷3=70です。評価データで性能が下がるなら、訓練対象の偏りやモデルの適用範囲を調べ、限界を明示します。",
    solutionProcess: "訓練合計210、件数3、平均70。評価値は別データ。都市部限定→母集団とのずれを確認。",
    reviewTags: ["平均", "訓練データ", "評価データ", "偏り", "会話"],
  }),
];
