# Verdict Response Mapping Report

This document maps all backend response fields returned by FastAPI endpoints to the frontend components.

## 1. Field Mapping Table

| Backend Response Field | Target Frontend Component | Type / Schema | Mapped Purpose |
| :--- | :--- | :--- | :--- |
| `ticker` | `WorkspaceHeader.tsx` | String | Displays current stock ticker. |
| `financial_data.company_name` | `FinancialSummary.tsx` | String | Displays official corporation name. |
| `financial_data.sector` | `FinancialSummary.tsx` | String | Displays business classification. |
| `financial_data.industry` | `FinancialSummary.tsx` | String | Displays specific sub-industry. |
| `financial_data.current_price` | `FinancialSummary.tsx` | Number | Renders stock valuation metrics. |
| `financial_data.market_cap` | `FinancialSummary.tsx` | Number (Large) | Market capitalization widget. |
| `financial_data.pe_ratio` | `ValuationMetricsChart.tsx` | Number | Core P/E ratio comparison. |
| `financial_data.eps` | `FinancialSummary.tsx` | Number | Earnings Per Share key metric. |
| `financial_data.revenue` | `FinancialSummary.tsx` | Number (Large) | Total revenue index. |
| `financial_data.revenue_growth` | `FinancialSummary.tsx` | Number (Percent) | Year-over-year revenue velocity. |
| `financial_data.gross_margin` | `ReportPanel.tsx` / Chart | Number (Percent) | Gross profit margins KPI. |
| `financial_data.debt_to_equity` | `ReportPanel.tsx` | Number | Leverage metric KPI. |
| `financial_data.roe` | `ReportPanel.tsx` / Chart | Number (Percent) | Return on Equity KPI. |
| `financial_data.beta` | `ReportPanel.tsx` / Chart | Number | Volatility representation. |
| `financial_data.analyst_recommendation` | `FinancialSummary.tsx` | String | Consensus rating. |
| `news` (Array) | `NewsAnalysis.tsx` | Array[NewsArticle] | Standardized news index card. |
| `news[].sentiment` | `SentimentDistributionChart` | String | Sentiment color badge & overall pie chart. |
| `final_report.company_overview` | `ReportPanel.tsx` (Summary) | Markdown String | Executive Summary. |
| `final_report.financial_analysis` | `ReportPanel.tsx` (Financials)| Markdown String | Professional financial analysis overview. |
| `final_report.recent_news_summary` | `ReportPanel.tsx` (News) | Markdown String | Narrative summarizing market news flow. |
| `final_report.opportunities` | `ReportPanel.tsx` (Evidence) | Markdown String | Highlighted catalysts/growth vectors. |
| `final_report.risks` | `ReportPanel.tsx` (Risks) | Markdown String | Risk factors list. |
| `final_report.investment_outlook` | `ReportPanel.tsx` (Thesis) | Markdown String | Long-term outlook and conclusion. |
| `critic_report.overall_score` | `EvidenceConfidenceGauge` | Number (1-10) | Critic score scaled to 0-100% confidence. |
| `critic_report.strengths` | `ReportPanel.tsx` (Evidence) | Array[String] | Strengths bullets. |
| `critic_report.weaknesses` | `ReportPanel.tsx` (Risks) | Array[String] | Risk/gap bullets. |
| `critic_report.hallucination_risk` | `WorkflowAnalyticsPanel` | String | Logic validation audit. |
| `critic_report.recommendation` | `ReportPanel.tsx` (Thesis) | String | Actionable suggestion card. |
| `metadata.duration` | `WorkflowAnalyticsPanel` | Number | Execution duration in seconds. |
| `metadata.agent_count` | `WorkflowAnalyticsPanel` | Number | Active nodes in workflow. |
| `metadata.model_info` | `WorkflowAnalyticsPanel` | String | Active LLM model details. |

## 2. Dynamic Pipeline Verification
With this mapping fully integrated, any changes in the backend agents propagate immediately to the frontend. The dashboard elements read from the same state store, eliminating duplication.
