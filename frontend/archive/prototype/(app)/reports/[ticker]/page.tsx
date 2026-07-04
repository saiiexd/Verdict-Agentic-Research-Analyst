"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Globe,
  Shield,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento";
import { mockResearchResponse } from "@/lib/mock-data";
import {
  formatLargeNumber,
  formatPercent,
  getScoreColor,
  getScoreBg,
  getSentimentColor,
} from "@/lib/utils";
import type { ResearchResponse } from "@/lib/types";

interface ReportPageProps {
  params: Promise<{ ticker: string }>;
}

export default function ReportPage({ params }: ReportPageProps) {
  const [ticker, setTicker] = useState<string>("NVDA");
  const [data, setData] = useState<ResearchResponse>(mockResearchResponse);

  useEffect(() => {
    params.then(({ ticker: t }) => {
      setTicker(t.toUpperCase());
      // Prefer session data from research workflow
      const raw = sessionStorage.getItem("researchResult");
      const storedTicker = sessionStorage.getItem("researchTicker");
      if (raw && storedTicker === t.toUpperCase()) {
        try {
          const parsed = JSON.parse(raw) as ResearchResponse;
          setData(parsed);
        } catch {
          setData(mockResearchResponse);
        }
      }
    });
  }, [params]);

  const fd = data.financial_data;
  const cr = data.critic_report;
  const report = data.final_report || data.draft_report;
  const news = data.news || [];

  if (!report || !fd) {
    return (
      <div className="p-8">
        <p className="text-body text-[rgb(var(--text-secondary))]">Loading report...</p>
      </div>
    );
  }

  const isVerdictBullish =
    report.investment_outlook?.toLowerCase().includes("strong buy") ||
    report.investment_outlook?.toLowerCase().includes("buy");

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Back nav */}
      <Link
        href="/research"
        className="inline-flex items-center gap-2 text-caption text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Research
      </Link>

      {/* Report Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-ticker text-3xl font-black text-[rgb(var(--text-primary))]">
              {ticker}
            </span>
            <span className="text-subtitle text-[rgb(var(--text-secondary))]">
              {fd.company_name}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-caption px-2 py-0.5 rounded-full bg-[rgb(var(--bg-subtle))] border border-[rgb(var(--border-default))] text-[rgb(var(--text-tertiary))]">
              {fd.sector}
            </span>
            <span className="text-caption px-2 py-0.5 rounded-full bg-[rgb(var(--bg-subtle))] border border-[rgb(var(--border-default))] text-[rgb(var(--text-tertiary))]">
              {fd.industry}
            </span>
            {cr && (
              <span className={`text-caption px-2 py-0.5 rounded-full border font-semibold ${getScoreBg(cr.overall_score)} ${getScoreColor(cr.overall_score)}`}>
                AI Score: {cr.overall_score}/10
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <p className="text-display text-[rgb(var(--text-primary))] leading-none">
            ${fd.current_price?.toFixed(2)}
          </p>
          <p className="text-caption text-[rgb(var(--text-tertiary))] mt-1">Current Price</p>
        </div>
      </div>

      {/* Verdict Banner */}
      <div
        className={`mb-8 p-5 rounded-xl border flex items-start gap-4 ${
          isVerdictBullish
            ? "bg-emerald-400/8 border-emerald-400/25"
            : "bg-amber-400/8 border-amber-400/25"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
            isVerdictBullish
              ? "bg-emerald-400/15 border-emerald-400/30"
              : "bg-amber-400/15 border-amber-400/30"
          }`}
        >
          <Sparkles
            className={`w-5 h-5 ${isVerdictBullish ? "text-emerald-400" : "text-amber-400"}`}
          />
        </div>
        <div>
          <p
            className={`text-small font-bold uppercase tracking-wider mb-1 ${
              isVerdictBullish ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            AI Investment Verdict
          </p>
          <p className="text-small text-[rgb(var(--text-primary))] leading-relaxed">
            {report.investment_outlook.split("\n")[0]}
          </p>
        </div>
      </div>

      {/* Main Bento Grid */}
      <BentoGrid cols={12}>
        {/* Key Metrics — Full width */}
        <BentoCard span="full" className="col-span-12 p-6">
          <p className="text-label text-[rgb(var(--text-tertiary))] mb-4">Key Metrics</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { label: "Market Cap", value: formatLargeNumber(fd.market_cap!), positive: true },
              { label: "P/E Ratio", value: fd.pe_ratio?.toFixed(1) || "—", positive: null },
              { label: "EPS", value: `$${fd.eps?.toFixed(2)}` || "—", positive: (fd.eps || 0) > 0 },
              { label: "Revenue", value: formatLargeNumber(fd.revenue!), positive: true },
              { label: "Rev Growth", value: formatPercent((fd.revenue_growth || 0) * 100, 1), positive: (fd.revenue_growth || 0) > 0 },
              { label: "Gross Margin", value: formatPercent((fd.gross_margin || 0) * 100, 1), positive: (fd.gross_margin || 0) > 0.5 },
              { label: "ROE", value: formatPercent((fd.roe || 0) * 100, 1), positive: (fd.roe || 0) > 0.15 },
              { label: "Beta", value: fd.beta?.toFixed(2) || "—", positive: null },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-caption text-[rgb(var(--text-tertiary))] mb-1.5">{m.label}</p>
                <p
                  className={`text-small font-semibold ${
                    m.positive === true
                      ? "text-emerald-400"
                      : m.positive === false
                      ? "text-red-400"
                      : "text-[rgb(var(--text-primary))]"
                  }`}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* 52W Range — 6 col */}
        <BentoCard span="4" className="col-span-6 p-6">
          <p className="text-label text-[rgb(var(--text-tertiary))] mb-4">52-Week Range</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-small mb-2">
              <span className="text-red-400 font-semibold">${fd.fifty_two_week_low?.toFixed(2)}</span>
              <span className="text-[rgb(var(--text-tertiary))]">Current: ${fd.current_price?.toFixed(2)}</span>
              <span className="text-emerald-400 font-semibold">${fd.fifty_two_week_high?.toFixed(2)}</span>
            </div>
            {/* Range bar */}
            <div className="relative h-2 rounded-full bg-[rgb(var(--bg-subtle))]">
              <div
                className="absolute left-0 h-full rounded-full bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400"
                style={{ width: "100%" }}
              />
              {/* Current price marker */}
              <div
                className="absolute -top-1 w-4 h-4 rounded-full border-2 border-[rgb(var(--bg-base))] bg-[rgb(var(--accent-primary))] shadow-md -translate-x-1/2"
                style={{
                  left: `${
                    fd.current_price && fd.fifty_two_week_low && fd.fifty_two_week_high
                      ? ((fd.current_price - fd.fifty_two_week_low) /
                          (fd.fifty_two_week_high - fd.fifty_two_week_low)) *
                        100
                      : 50
                  }%`,
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[rgb(var(--bg-subtle))] rounded-lg p-3">
                <p className="text-caption text-[rgb(var(--text-tertiary))]">Debt/Equity</p>
                <p className="text-small font-semibold text-[rgb(var(--text-primary))] mt-0.5">{fd.debt_to_equity?.toFixed(2)}</p>
              </div>
              <div className="bg-[rgb(var(--bg-subtle))] rounded-lg p-3">
                <p className="text-caption text-[rgb(var(--text-tertiary))]">Analyst Rec</p>
                <p className="text-small font-semibold text-emerald-400 mt-0.5">{fd.analyst_recommendation}</p>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Critic Summary — 6 col */}
        {cr && (
          <BentoCard span="4" className="col-span-6 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-[rgb(var(--text-tertiary))]" />
              <p className="text-label text-[rgb(var(--text-tertiary))]">Report Quality Assessment</p>
            </div>
            <div className={`flex items-center gap-4 p-4 rounded-xl border mb-4 ${getScoreBg(cr.overall_score)}`}>
              <p className={`text-metric text-3xl font-black ${getScoreColor(cr.overall_score)}`}>
                {cr.overall_score}
                <span className="text-base font-normal text-[rgb(var(--text-tertiary))]">/10</span>
              </p>
              <div>
                <p className={`text-small font-semibold ${getScoreColor(cr.overall_score)}`}>
                  {cr.overall_score >= 8 ? "Excellent" : cr.overall_score >= 6 ? "Good" : "Fair"} Quality
                </p>
                <p className="text-caption text-[rgb(var(--text-tertiary))]">
                  Hallucination Risk: {cr.hallucination_risk}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {cr.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-caption text-[rgb(var(--text-secondary))]">{s}</p>
                </div>
              ))}
              {cr.weaknesses.map((w, i) => (
                <div key={i} className="flex items-start gap-2">
                  <TrendingDown className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-caption text-[rgb(var(--text-secondary))]">{w}</p>
                </div>
              ))}
            </div>
          </BentoCard>
        )}

        {/* Company Overview — 8 col */}
        <BentoCard span="full" className="col-span-8 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-[rgb(var(--accent-primary))]" />
            <p className="text-subtitle font-semibold text-[rgb(var(--text-primary))]">Company Overview</p>
          </div>
          <p className="text-body text-[rgb(var(--text-secondary))] leading-relaxed">
            {report.company_overview}
          </p>
        </BentoCard>

        {/* News Sentiment — 4 col */}
        <BentoCard span="4" className="col-span-4">
          <div className="p-5 border-b border-[rgb(var(--border-default))] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[rgb(var(--text-tertiary))]" />
            <p className="text-subtitle text-[rgb(var(--text-primary))]">Market News</p>
          </div>
          <div className="divide-y divide-[rgb(var(--border-default))]">
            {news.slice(0, 5).map((n, i) => (
              <div key={i} className="p-4">
                <p className="text-small text-[rgb(var(--text-primary))] line-clamp-2 mb-1.5 leading-snug">{n.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-caption text-[rgb(var(--text-tertiary))]">{n.source}</span>
                  {n.sentiment && (
                    <span className={`text-caption font-medium ${getSentimentColor(n.sentiment)}`}>
                      {n.sentiment}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Financial Analysis */}
        <BentoCard span="full" className="col-span-12 p-6">
          <p className="text-subtitle font-semibold text-[rgb(var(--text-primary))] mb-4">
            Financial Analysis
          </p>
          <p className="text-body text-[rgb(var(--text-secondary))] leading-relaxed">
            {report.financial_analysis}
          </p>
        </BentoCard>

        {/* Opportunities — 6 col */}
        <BentoCard span="4" className="col-span-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <p className="text-subtitle font-semibold text-[rgb(var(--text-primary))]">Opportunities</p>
          </div>
          <p className="text-body text-[rgb(var(--text-secondary))] leading-relaxed whitespace-pre-line">
            {report.opportunities}
          </p>
        </BentoCard>

        {/* Risks — 6 col */}
        <BentoCard span="4" className="col-span-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <p className="text-subtitle font-semibold text-[rgb(var(--text-primary))]">Risk Factors</p>
          </div>
          <p className="text-body text-[rgb(var(--text-secondary))] leading-relaxed whitespace-pre-line">
            {report.risks}
          </p>
        </BentoCard>

        {/* News Summary — full */}
        <BentoCard span="full" className="col-span-12 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-violet-400" />
            <p className="text-subtitle font-semibold text-[rgb(var(--text-primary))]">Recent News Summary</p>
          </div>
          <p className="text-body text-[rgb(var(--text-secondary))] leading-relaxed">
            {report.recent_news_summary}
          </p>
        </BentoCard>

        {/* Investment Outlook — full */}
        <div className="col-span-12">
          <div className={`p-8 rounded-xl border ${isVerdictBullish ? "bg-emerald-400/5 border-emerald-400/20" : "bg-amber-400/5 border-amber-400/20"}`}>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className={`w-5 h-5 ${isVerdictBullish ? "text-emerald-400" : "text-amber-400"}`} />
              <p className="text-title font-bold text-[rgb(var(--text-primary))]">Investment Outlook & Verdict</p>
            </div>
            <p className="text-body text-[rgb(var(--text-secondary))] leading-relaxed whitespace-pre-line">
              {report.investment_outlook}
            </p>
          </div>
        </div>
      </BentoGrid>

      {/* Disclaimer */}
      <p className="text-caption text-[rgb(var(--text-tertiary))] mt-8 text-center">
        This report is generated by AI agents and is for informational purposes only. It is not financial advice.
      </p>
    </div>
  );
}
