import type { SpeedReadingProblem } from "@/lib/english-types";

// ── 私立文系速読パック1：日東駒専 / 産近甲龍 対策（3問）───────────────────
// 語数 220〜270 語、COMMON_TEST〜PRIVATE_UNI、読みやすいテーマ

export const SPEED_READING_PRIVATE_PACK_1: SpeedReadingProblem[] = [
  // ── 問題 1: 産近甲龍 — SNS と精神健康（240語）────────────────────────────
  {
    id: "private-sr-social-media-wellbeing",
    title: "Social Media Use and Adolescent Well-being",
    level: "PRIVATE_UNI",
    universityGroup: "SANKINKORYU",
    timeLimit: 90,
    tags: ["論説文", "SNS", "精神健康", "産近甲龍", "約240語", "私立文系"],
    passage: `The relationship between social media use and the mental health of young people has become a major focus of psychological research over the past decade. While some studies suggest a negative correlation between heavy social media use and indicators of well-being such as self-esteem and life satisfaction, the picture is considerably more complex than early headlines suggested.

Researchers have found that the type of social media activity matters more than the total time spent online. Passive consumption — scrolling through other people's posts without interacting — is more strongly associated with feelings of envy, inadequacy, and loneliness than active engagement, which involves creating content, commenting, and connecting with others. A teenager who spends an hour watching peers' highlight reels may feel worse than one who spends the same hour in a supportive online community.

Context also plays a significant role. For young people who feel isolated in their offline environment, online connections can provide a genuine sense of belonging and access to supportive communities. Those dealing with minority identities or niche interests often report that online spaces allow them to find others who share their experiences. In these cases, social media may actually support rather than undermine mental health.

This nuanced picture suggests that policy responses should focus not on blanket restrictions of screen time, but on promoting healthier patterns of use, improving digital literacy, and ensuring that young people have access to offline social opportunities as well. The goal should be to help young people develop a balanced and intentional relationship with technology.`,
    questions: [
      {
        questionText: "According to the passage, which type of social media activity is most associated with negative well-being?",
        options: [
          "Creating and sharing original content",
          "Passively scrolling through other people's posts",
          "Participating in online support communities",
          "Commenting on friends' posts",
        ],
        correctAnswerIndex: 1,
        explanation: `第2段落に「受動的な消費（他人の投稿をスクロールするだけ）が嫉妬・不十分感・孤独感と最も強く関連する」と明記されている。`,
      },
      {
        questionText: "For which group of young people might social media be particularly beneficial?",
        options: [
          "Those who already have strong offline social networks",
          "Those who feel isolated in their offline environment",
          "Those who use social media for more than four hours a day",
          "Those who are already highly confident in their identities",
        ],
        correctAnswerIndex: 1,
        explanation: `第3段落に「オフラインで孤立感を感じる若者にとって，オンラインのつながりが帰属感を与えたり，サポートコミュニティへのアクセスを提供したりする」と述べられている。`,
      },
      {
        questionText: "What approach to social media policy does the author recommend?",
        options: [
          "Imposing strict limits on daily screen time for all young people",
          "Banning social media platforms from targeting users under eighteen",
          "Focusing on healthier usage patterns and digital literacy rather than blanket restrictions",
          "Requiring schools to provide dedicated social media education classes",
        ],
        correctAnswerIndex: 2,
        explanation: `第4段落で著者は「一律なスクリーンタイム制限ではなく，健全な使用パターンの促進・デジタルリテラシーの向上・オフラインの機会の確保」を提唱している。`,
      },
    ],
  },

  // ── 問題 2: 日東駒専 — サステナブル消費（230語）────────────────────────
  {
    id: "private-sr-sustainable-consumption",
    title: "Sustainable Consumption and the Limits of Individual Choice",
    level: "COMMON_TEST",
    universityGroup: "NITTOMASEN",
    timeLimit: 85,
    tags: ["論説文", "環境", "消費行動", "日東駒専", "約230語", "私立文系"],
    passage: `In recent years, the concept of sustainable consumption has moved from the margins of environmental discourse to the mainstream. Supermarkets advertise eco-friendly product lines, fashion brands promote recycling programs, and governments encourage citizens to reduce waste through tax incentives and public campaigns. The message is consistent: individual consumer choices can make a meaningful contribution to solving environmental problems.

There is undeniable truth in this view. When large numbers of consumers shift their behavior — choosing reusable bags, reducing meat consumption, or buying second-hand goods — the cumulative effect can be significant. Market signals from consumers can accelerate corporate adoption of greener practices and technologies.

However, critics argue that placing the burden of environmental responsibility primarily on individuals risks obscuring the structural causes of environmental degradation. The vast majority of greenhouse gas emissions come not from individual households but from industrial production, transportation systems, and energy infrastructure. These are shaped far more by policy decisions, corporate strategies, and investment patterns than by consumer preferences.

Moreover, focusing on individual behavior can create a form of guilt that is disproportionate to the actual impact individuals have. Many of the choices that have the greatest environmental impact — such as whether a city builds walkable neighborhoods or relies on car-dependent suburbs — are made by planners and politicians, not shoppers. Sustainable consumption is a valuable tool, but it is insufficient without systemic change.`,
    questions: [
      {
        questionText: "What does the author say about individual consumer choices?",
        options: [
          "They have no effect on corporate behavior or environmental outcomes",
          "They can be meaningful but are insufficient without broader systemic change",
          "They are the most powerful tool available for addressing climate change",
          "They are primarily influenced by government tax incentives",
        ],
        correctAnswerIndex: 1,
        explanation: `第2段落で消費者行動の肯定的な側面を認めつつ，第3・4段落では構造的変化なしには不十分だと論じている。全体の主張は「個人の選択は価値あるが，構造的変化なしには不十分」。`,
      },
      {
        questionText: "According to critics mentioned in the passage, what is a problem with emphasizing individual responsibility for the environment?",
        options: [
          "It makes consumers spend too much money on green products",
          "It ignores the far greater role of industrial and structural factors",
          "It discourages governments from creating environmental regulations",
          "It leads companies to produce lower quality eco-friendly goods",
        ],
        correctAnswerIndex: 1,
        explanation: `第3段落に「個人に環境責任の負担を主に負わせることは，環境悪化の構造的原因を覆い隠すリスクがある」と述べられている。温室効果ガスの大部分は家庭ではなく産業・輸送・エネルギーインフラから排出されるという指摘。`,
      },
      {
        questionText: "What example does the author give of an environmental decision made by planners rather than consumers?",
        options: [
          "Whether stores stock environmentally certified products",
          "Whether individuals choose to buy electric vehicles",
          "Whether a city builds walkable neighborhoods or car-dependent suburbs",
          "Whether households separate recyclable materials from regular waste",
        ],
        correctAnswerIndex: 2,
        explanation: `第4段落に「最も環境に大きな影響を持つ選択の多くは，買い物客ではなく都市計画者や政治家が行う。例として，歩行者中心の街と自動車依存の郊外のどちらを建設するかという選択が挙げられている。`,
      },
    ],
  },

  // ── 問題 3: 産近甲龍 — リモートワークの変容（255語）───────────────────
  {
    id: "private-sr-remote-work-future",
    title: "The Remote Work Revolution and the Future of Urban Life",
    level: "PRIVATE_UNI",
    universityGroup: "SANKINKORYU",
    timeLimit: 95,
    tags: ["論説文", "リモートワーク", "都市", "産近甲龍", "約255語", "私立文系"],
    passage: `The widespread adoption of remote work during and after the global pandemic of the early 2020s has prompted a fundamental rethinking of the relationship between employment, housing, and urban design. For the first time in the modern era, a significant proportion of knowledge workers gained the freedom to work from locations other than centrally located offices, challenging assumptions about where people choose to live and why.

One of the most discussed consequences has been the dispersal of workers away from major cities. As the necessity of daily commuting to urban centers weakened, many workers chose to relocate to smaller cities, suburban areas, or even rural communities, drawn by lower housing costs, larger living spaces, and a different quality of life. Real estate markets in previously overlooked regions experienced significant price increases as demand shifted.

This population movement has generated both opportunities and challenges. For receiving communities, an influx of higher-income remote workers can inject new economic vitality — filling restaurants, supporting local businesses, and funding public services through taxation. At the same time, rapid price increases can price out long-term residents and fundamentally alter the character of communities that lack the infrastructure to absorb growth.

For major cities, the picture has been equally complex. Declining demand for office space and the departure of some residents have created vacancies in commercial districts and pressured city budgets. Yet cities have also demonstrated resilience, with some districts adapting by converting commercial buildings to residential use and attracting new forms of business that value urban density and cultural amenities.`,
    questions: [
      {
        questionText: "What change in behavior did remote work enable for many knowledge workers?",
        options: [
          "The ability to work longer hours without physical fatigue",
          "Greater flexibility about where they chose to live",
          "The opportunity to collaborate with international teams in different time zones",
          "The freedom to set their own salaries and working conditions",
        ],
        correctAnswerIndex: 1,
        explanation: `第1段落に「多くのナレッジワーカーが，中心部のオフィス以外の場所から働く自由を得た」と述べられており，居住地の選択の自由が主要なテーマ。`,
      },
      {
        questionText: "According to the passage, what motivated some workers to leave major cities?",
        options: [
          "Concerns about the safety and quality of urban environments",
          "Government incentives and relocation subsidies",
          "Lower housing costs, more space, and a different quality of life",
          "The availability of faster internet connections in rural areas",
        ],
        correctAnswerIndex: 2,
        explanation: `第2段落に「より低い住宅コスト，より広い居住空間，異なる生活の質」が移住の動機として明示されている。`,
      },
      {
        questionText: "What negative effect of the population movement does the author describe?",
        options: [
          "Increased traffic congestion in smaller cities and towns",
          "A decline in the quality of remote work technology in rural areas",
          "Rising housing prices that may displace long-term residents",
          "A reduction in cultural diversity in major urban centers",
        ],
        correctAnswerIndex: 2,
        explanation: `第3段落に「急速な価格上昇が長年の住民を追い出し，成長を吸収するインフラが不十分なコミュニティの性格を根本的に変える可能性がある」と述べられている。`,
      },
    ],
  },
];
