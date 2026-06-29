import type { ResearchResponse } from "./types";

// ─── NVDA Mock Data ─────────────────────────────────────
export const mockResearchResponse: ResearchResponse = {
  ticker: "NVDA",
  financial_data: {
    ticker: "NVDA",
    company_name: "NVIDIA Corporation",
    current_price: 138.85,
    market_cap: 3_410_000_000_000,
    pe_ratio: 55.4,
    eps: 2.51,
    revenue: 44_870_000_000,
    revenue_growth: 0.781,
    gross_margin: 0.742,
    debt_to_equity: 0.43,
    roe: 0.845,
    fifty_two_week_high: 153.13,
    fifty_two_week_low: 75.61,
    dividend_yield: 0.0003,
    beta: 1.65,
    analyst_recommendation: "Strong Buy",
    sector: "Technology",
    industry: "Semiconductors",
  },
  news: [
    {
      title: "NVIDIA Announces Blackwell Ultra Architecture with 3x Performance Gains",
      description: "NVIDIA's next-generation Blackwell Ultra chips promise unprecedented AI training throughput.",
      source: "Reuters",
      published_at: "2026-06-28T12:00:00Z",
      sentiment: "Bullish",
    },
    {
      title: "Data Center Revenue Surges 409% YoY as Hyperscaler Demand Accelerates",
      description: "NVIDIA's data center segment continues its extraordinary growth trajectory.",
      source: "Bloomberg",
      published_at: "2026-06-26T09:30:00Z",
      sentiment: "Bullish",
    },
    {
      title: "US-China Chip Export Controls: NVIDIA Develops H20 Variants for Compliance",
      description: "NVIDIA navigates geopolitical headwinds by engineering compliant chips for Chinese market.",
      source: "Wall Street Journal",
      published_at: "2026-06-24T14:15:00Z",
      sentiment: "Neutral",
    },
    {
      title: "AMD Instinct MI350 Gains Enterprise Traction, Challenging NVIDIA's Dominance",
      description: "AMD's latest GPU offering is seeing increased adoption among budget-conscious enterprises.",
      source: "Financial Times",
      published_at: "2026-06-22T08:00:00Z",
      sentiment: "Bearish",
    },
    {
      title: "NVIDIA CUDA Ecosystem Remains 'Near-Impossible to Displace' — Goldman Sachs",
      description: "Goldman reiterates Buy rating with $175 price target, citing platform lock-in.",
      source: "Goldman Sachs Research",
      published_at: "2026-06-20T11:00:00Z",
      sentiment: "Bullish",
    },
  ],
  critic_report: {
    overall_score: 9,
    strengths: [
      "Exceptional financial data coverage with accurate figures",
      "Balanced treatment of competitive risks",
      "Clear and concise investment thesis",
    ],
    weaknesses: [
      "Limited discussion of valuation multiples vs. peers",
      "Could expand on sovereign AI compute demand drivers",
    ],
    hallucination_risk: "Low — all key figures are verifiable",
    recommendation: "Publish with minor enhancements to valuation section",
  },
  final_report: {
    company_overview:
      "NVIDIA Corporation (NVDA) is the world's dominant designer of Graphics Processing Units (GPUs) and AI accelerators. Founded in 1993 and headquartered in Santa Clara, California, NVIDIA's transformation from a gaming GPU maker into the backbone of the global AI infrastructure stack represents one of the most remarkable corporate pivots in technology history. The company's CUDA software ecosystem, cuDNN libraries, and NVLink interconnect technology have created an extraordinarily deep platform moat that competitors have struggled to replicate despite significant capital investment.",
    financial_analysis:
      "NVIDIA's financial performance in FY2025 was extraordinary by any measure. Revenue reached $44.87 billion, representing 78% year-over-year growth driven almost entirely by data center GPU demand from hyperscalers including Microsoft Azure, Google Cloud, and Amazon Web Services. The gross margin expanded to 74.2%, reflecting strong pricing power and the premium commanded by H100 and H200 GPUs. With an EPS of $2.51 and a forward P/E of 35x (on estimated FY2026 earnings), NVIDIA trades at a premium valuation that is justified by its growth trajectory and market position. The company's balance sheet remains pristine with a debt-to-equity ratio of 0.43, and its return on equity of 84.5% places it among the most capital-efficient businesses globally.",
    recent_news_summary:
      "Recent news flow is predominantly positive. NVIDIA's Blackwell Ultra architecture announcement signals continued product leadership extending into 2026-2027, with reports indicating 3x performance improvements over the current Blackwell generation. Hyperscaler capex commitments remain robust, with Microsoft, Google, and Meta all increasing their AI infrastructure budgets. The primary risk factor in recent coverage centers on US-China export controls, where NVIDIA has responded by developing H20 compliant variants — a pragmatic adaptation rather than a fundamental business threat. Competitive coverage notes AMD's MI350 gaining some enterprise traction, but analysts broadly agree that CUDA ecosystem lock-in represents a durable competitive moat.",
    opportunities:
      "1. Sovereign AI Infrastructure: Governments globally are investing in national AI compute capabilities, representing a structural demand driver beyond hyperscaler capex. 2. Inference Market Expansion: As AI models move from training to mass deployment, inference compute demand is expected to surpass training demand by 2027, benefiting NVIDIA's next-generation efficient architectures. 3. NVIDIA NIM Software Monetization: NVIDIA's enterprise AI software stack (NIM microservices) represents an emerging high-margin revenue stream that could evolve into a platform business comparable to early-stage AWS. 4. Automotive AI: NVIDIA's DRIVE platform is gaining design wins across multiple OEMs, with robotaxi and ADAS revenue expected to become material by FY2027-2028.",
    risks:
      "1. Geopolitical Risk: US export control escalations could materially impair access to the Chinese AI compute market, which represented approximately 20% of data center revenue prior to initial restrictions. 2. Concentration Risk: NVIDIA's top four customers (Microsoft, Google, Meta, Amazon) represent a substantial portion of data center revenue; any reduction in hyperscaler capex could disproportionately impact results. 3. Competitive Threat: AMD, Intel, and custom silicon from Google (TPUs), Amazon (Trainium), and Microsoft (Maia) represent long-term structural alternatives that could erode NVIDIA's market share at the margin. 4. Valuation Risk: At 55x trailing P/E, NVIDIA's valuation leaves limited margin of safety; any growth deceleration could trigger a significant multiple compression.",
    investment_outlook:
      "VERDICT: STRONG BUY. NVIDIA occupies a unique position at the nexus of the most important technology transition of the next decade. The company's platform advantages — CUDA ecosystem depth, NVLink interconnect supremacy, and software stack completeness — are not replicable on short timescales. While valuation is demanding, the combination of 78% revenue growth, 84% return on equity, and a rapidly expanding total addressable market justifies a premium multiple. Near-term catalysts include Blackwell Ultra volume ramp in Q2-Q3 FY2026, potential export restriction relaxation, and continued hyperscaler capex commitment disclosures. Target price: $165 (12-month), representing approximately 19% upside from current levels. Risk/reward remains compelling for long-term investors with a 3-5 year horizon.",
  },
};
