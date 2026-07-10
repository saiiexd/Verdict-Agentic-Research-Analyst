import { z } from "zod";

// ─── Request Schemas ────────────────────────────────────
export const ResearchRequestSchema = z.object({
  ticker: z
    .string()
    .min(1, "Ticker is required")
    .max(15, "Ticker must be 15 characters or fewer")
    .regex(/^[A-Z0-9.-]+$/, "Enter a valid ticker symbol (e.g. AAPL, RELIANCE.NS)"),
});
export type ResearchRequest = z.infer<typeof ResearchRequestSchema>;

// ─── Backend Response Schemas ───────────────────────────
export const FinancialDataSchema = z.object({
  company_name: z.string().optional(),
  ticker: z.string(),
  current_price: z.number().optional(),
  previous_close: z.number().optional(),
  market_cap: z.number().optional(),
  pe_ratio: z.number().nullable().optional(),
  eps: z.number().nullable().optional(),
  revenue: z.number().nullable().optional(),
  revenue_growth: z.number().nullable().optional(),
  gross_margin: z.number().nullable().optional(),
  operating_margin: z.number().nullable().optional(),
  debt_to_equity: z.number().nullable().optional(),
  roe: z.number().nullable().optional(),
  roa: z.number().nullable().optional(),
  fifty_two_week_high: z.number().optional(),
  fifty_two_week_low: z.number().optional(),
  dividend_yield: z.number().nullable().optional(),
  beta: z.number().nullable().optional(),
  forward_pe: z.number().nullable().optional(),
  enterprise_value: z.number().nullable().optional(),
  currency: z.string().nullable().optional(),
  financial_currency: z.string().nullable().optional(),
  exchange: z.string().nullable().optional(),
  quote_type: z.string().nullable().optional(),
  analyst_recommendation: z.string().optional(),
  sector: z.string().optional(),
  industry: z.string().optional(),
});

export const NewsArticleSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  source: z.string().optional(),
  published_at: z.string().optional(),
  sentiment: z.string().optional(),
});

export const ResearchReportSchema = z.object({
  company_overview: z.string(),
  financial_analysis: z.string(),
  recent_news_summary: z.string(),
  opportunities: z.string(),
  risks: z.string(),
  investment_outlook: z.string(),
});

export const CriticReportSchema = z.object({
  overall_score: z.number(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  hallucination_risk: z.string(),
  recommendation: z.string(),
});

export const ResearchResponseSchema = z.object({
  ticker: z.string(),
  financial_data: FinancialDataSchema.optional(),
  news: z.array(NewsArticleSchema).optional(),
  draft_report: ResearchReportSchema.optional(),
  critic_report: CriticReportSchema.optional(),
  final_report: ResearchReportSchema.optional(),
  metadata: z.object({
    duration: z.number().optional(),
    agent_count: z.number().optional(),
    status: z.string().optional(),
    model_info: z.string().optional()
  }).optional(),
});

export type FinancialData = z.infer<typeof FinancialDataSchema>;
export type NewsArticle = z.infer<typeof NewsArticleSchema>;
export type ResearchReport = z.infer<typeof ResearchReportSchema>;
export type CriticReport = z.infer<typeof CriticReportSchema>;
export type ResearchResponse = z.infer<typeof ResearchResponseSchema>;

// ─── Agent Workflow State ───────────────────────────────
export type AgentStatus = "idle" | "running" | "completed" | "failed" | "skipped";

export interface AgentNode {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  startedAt?: number;
  completedAt?: number;
  icon: string;
}
