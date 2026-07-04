"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Clock,
  Newspaper,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento";
import { mockResearchResponse } from "@/lib/mock-data";
import { formatCurrency, formatLargeNumber, formatPercent, getScoreColor, getScoreBg } from "@/lib/utils";

const RECENT_HISTORY = [
  { ticker: "NVDA", date: "2026-06-29", score: 9, verdict: "Strong Buy" },
  { ticker: "AAPL", date: "2026-06-28", score: 7, verdict: "Hold" },
  { ticker: "TSLA", date: "2026-06-27", score: 6, verdict: "Hold" },
  { ticker: "GOOGL", date: "2026-06-26", score: 8, verdict: "Buy" },
];

export default function DashboardPage() {
  const { financial_data, critic_report, final_report } = mockResearchResponse;
  const fd = financial_data!;

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-headline text-[rgb(var(--text-primary))]">Dashboard</h1>
            <p className="text-body text-[rgb(var(--text-secondary))] mt-1">
              AI-powered equity research workspace
            </p>
          </div>
          <Link
            href="/research"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[rgb(var(--accent-primary))] text-white text-[13px] font-semibold hover:bg-[rgb(var(--accent-primary-hover))] transition-all duration-200 shadow-glow-accent hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            New Research
          </Link>
        </div>
      </div>

      {/* Bento Grid */}
      <BentoGrid cols={12} className="auto-rows-auto">
        {/* Quick Research — Full width */}
        <BentoCard span="full" className="p-6 col-span-12">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-1 min-w-[280px]">
              <p className="text-label text-[rgb(var(--text-tertiary))] mb-1">Quick Research</p>
              <p className="text-body text-[rgb(var(--text-secondary))]">
                Enter a ticker to generate an AI research report
              </p>
            </div>
            <Link
              href="/research"
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] hover:border-[rgb(var(--accent-primary))]/40 hover:shadow-md transition-all duration-200 group cursor-pointer min-w-[260px]"
            >
              <div className="w-8 h-8 rounded-lg bg-[rgb(var(--accent-primary))]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[rgb(var(--accent-primary))]" />
              </div>
              <span className="flex-1 text-[rgb(var(--text-tertiary))] text-[14px]">
                Enter ticker (e.g. NVDA)...
              </span>
              <ArrowRight className="w-4 h-4 text-[rgb(var(--text-tertiary))] group-hover:text-[rgb(var(--accent-primary))] group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </BentoCard>

        {/* Latest Report Highlight — 8 col */}
        <BentoCard span="4" className="col-span-8 p-6 row-span-2">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-label text-[rgb(var(--text-tertiary))]">Latest Report</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-ticker text-2xl text-[rgb(var(--text-primary))]">NVDA</span>
                <span className="text-small text-[rgb(var(--text-secondary))]">{fd.company_name}</span>
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-lg border text-small font-semibold ${getScoreBg(critic_report!.overall_score)}`}>
              <span className={getScoreColor(critic_report!.overall_score)}>
                Score {critic_report!.overall_score}/10
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Price", value: `$${fd.current_price?.toFixed(2)}` },
              { label: "Market Cap", value: formatLargeNumber(fd.market_cap!) },
              { label: "P/E Ratio", value: fd.pe_ratio?.toFixed(1) || "N/A" },
            ].map((m) => (
              <div key={m.label} className="bg-[rgb(var(--bg-subtle))] rounded-lg p-3">
                <p className="text-caption text-[rgb(var(--text-tertiary))] mb-1">{m.label}</p>
                <p className="text-metric text-[rgb(var(--text-primary))] text-lg">{m.value}</p>
              </div>
            ))}
          </div>

          <p className="text-small text-[rgb(var(--text-secondary))] leading-relaxed line-clamp-4 mb-5">
            {final_report?.investment_outlook}
          </p>

          <Link
            href="/reports/NVDA"
            className="inline-flex items-center gap-2 text-[rgb(var(--accent-primary))] text-[13px] font-medium hover:gap-3 transition-all duration-200"
          >
            View full report
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </BentoCard>

        {/* Market sentiment card — 4 col */}
        <BentoCard span="4" className="col-span-4 p-5">
          <p className="text-label text-[rgb(var(--text-tertiary))] mb-4">Report Quality</p>
          <div className={`flex items-center justify-between p-4 rounded-xl border mb-3 ${getScoreBg(critic_report!.overall_score)}`}>
            <span className="text-small text-[rgb(var(--text-secondary))]">Overall Score</span>
            <span className={`text-metric text-2xl font-bold ${getScoreColor(critic_report!.overall_score)}`}>
              {critic_report!.overall_score}/10
            </span>
          </div>
          <div className="space-y-2">
            {critic_report!.strengths.slice(0, 2).map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-caption text-[rgb(var(--text-secondary))]">{s}</p>
              </div>
            ))}
            {critic_report!.weaknesses.slice(0, 1).map((w, i) => (
              <div key={i} className="flex items-start gap-2">
                <TrendingDown className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-caption text-[rgb(var(--text-secondary))]">{w}</p>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Analyst rec — 4 col */}
        <BentoCard span="4" className="col-span-4 p-5">
          <p className="text-label text-[rgb(var(--text-tertiary))] mb-4">Analyst Intelligence</p>
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 mb-3">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-title text-emerald-400 font-bold">{fd.analyst_recommendation}</p>
            <p className="text-caption text-[rgb(var(--text-tertiary))] mt-1">{fd.sector} · {fd.industry}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-[rgb(var(--bg-subtle))] rounded-lg p-2.5">
              <p className="text-caption text-[rgb(var(--text-tertiary))]">Beta</p>
              <p className="text-small font-semibold text-[rgb(var(--text-primary))]">{fd.beta?.toFixed(2)}</p>
            </div>
            <div className="bg-[rgb(var(--bg-subtle))] rounded-lg p-2.5">
              <p className="text-caption text-[rgb(var(--text-tertiary))]">Revenue Growth</p>
              <p className="text-small font-semibold text-emerald-400">{formatPercent((fd.revenue_growth || 0) * 100, 1)}</p>
            </div>
          </div>
        </BentoCard>

        {/* Recent History — 6 col */}
        <BentoCard span="4" className="col-span-6">
          <div className="p-5 border-b border-[rgb(var(--border-default))] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[rgb(var(--text-tertiary))]" />
              <p className="text-subtitle text-[rgb(var(--text-primary))]">Recent Research</p>
            </div>
            <Link href="/history" className="text-caption text-[rgb(var(--accent-primary))] hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-[rgb(var(--border-default))]">
            {RECENT_HISTORY.map((item) => (
              <Link
                key={item.ticker + item.date}
                href={`/reports/${item.ticker}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-[rgb(var(--bg-subtle))] transition-colors duration-150"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[rgb(var(--accent-primary))]/10 border border-[rgb(var(--accent-primary))]/20 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[rgb(var(--accent-primary))]">{item.ticker.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="text-small font-semibold text-ticker text-[rgb(var(--text-primary))]">{item.ticker}</p>
                    <p className="text-caption text-[rgb(var(--text-tertiary))]">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-caption font-semibold ${getScoreColor(item.score)}`}>{item.verdict}</span>
                  <span className={`text-caption px-2 py-0.5 rounded-md border ${getScoreBg(item.score)} ${getScoreColor(item.score)}`}>{item.score}/10</span>
                </div>
              </Link>
            ))}
          </div>
        </BentoCard>

        {/* News snapshot — 6 col */}
        <BentoCard span="4" className="col-span-6">
          <div className="p-5 border-b border-[rgb(var(--border-default))] flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-[rgb(var(--text-tertiary))]" />
            <p className="text-subtitle text-[rgb(var(--text-primary))]">Latest News</p>
            <span className="ml-auto text-caption text-[rgb(var(--text-tertiary))]">NVDA</span>
          </div>
          <div className="divide-y divide-[rgb(var(--border-default))]">
            {mockResearchResponse.news?.slice(0, 4).map((n, i) => (
              <div key={i} className="px-5 py-3.5">
                <p className="text-small text-[rgb(var(--text-primary))] leading-snug line-clamp-2 mb-1.5">{n.title}</p>
                <div className="flex items-center gap-3">
                  <span className="text-caption text-[rgb(var(--text-tertiary))]">{n.source}</span>
                  <span
                    className={`text-caption font-medium px-1.5 py-0.5 rounded-sm ${
                      n.sentiment?.toLowerCase().includes("bull")
                        ? "bg-emerald-400/10 text-emerald-400"
                        : n.sentiment?.toLowerCase().includes("bear")
                        ? "bg-red-400/10 text-red-400"
                        : "bg-amber-400/10 text-amber-400"
                    }`}
                  >
                    {n.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Key Metrics row — full */}
        <BentoCard span="full" className="col-span-12 p-5">
          <p className="text-label text-[rgb(var(--text-tertiary))] mb-4">Key Financials · NVDA</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { label: "Revenue", value: formatLargeNumber(fd.revenue!) },
              { label: "Gross Margin", value: formatPercent((fd.gross_margin || 0) * 100, 1) },
              { label: "EPS", value: `$${fd.eps?.toFixed(2)}` },
              { label: "ROE", value: formatPercent((fd.roe || 0) * 100, 1) },
              { label: "Debt/Equity", value: fd.debt_to_equity?.toFixed(2) },
              { label: "52W High", value: `$${fd.fifty_two_week_high?.toFixed(2)}` },
              { label: "52W Low", value: `$${fd.fifty_two_week_low?.toFixed(2)}` },
              { label: "Div Yield", value: fd.dividend_yield ? formatPercent((fd.dividend_yield || 0) * 100, 2) : "—" },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-caption text-[rgb(var(--text-tertiary))] mb-1">{m.label}</p>
                <p className="text-small font-semibold text-[rgb(var(--text-primary))]">{m.value}</p>
              </div>
            ))}
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
}
