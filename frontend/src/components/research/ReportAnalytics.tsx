"use client";

import * as React from "react";
import { useMemo } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Layers, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  Compass, 
  Plus
} from "lucide-react";
import type { ResearchResponse, NewsArticle, FinancialData } from "@/lib/types";

// Custom styles mapping to established luxury minimal themes
const COLORS = ["#10b981", "#64748b", "#ef4444"]; // Emerald, Slate, Red

/**
 * Renders news sentiment analysis pie chart and breakdown
 */
/**
 * Renders news sentiment analysis pie chart and breakdown
 */
export function SentimentDistributionChart({ articles }: { articles: NewsArticle[] }) {
  const data = useMemo(() => {
    let positive = 0;
    let neutral = 0;
    let negative = 0;

    articles.forEach((art) => {
      const s = (art.sentiment || "").toLowerCase();
      if (s.includes("pos")) positive++;
      else if (s.includes("neg")) negative++;
      else neutral++;
    });

    if (articles.length === 0) {
      return [];
    }

    return [
      { name: "Positive", value: positive },
      { name: "Neutral", value: neutral },
      { name: "Negative", value: negative }
    ];
  }, [articles]);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 flex flex-col items-center justify-center min-h-[220px] text-center">
        <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))] self-start">Market Sentiment Analysis</h4>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))] self-start mb-6">
          Collected news articles distribution
        </span>
        <span className="text-xs text-[rgb(var(--text-secondary))]">No news articles available for sentiment analysis.</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 space-y-4">
      <div>
        <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">Market Sentiment Analysis</h4>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">
          Collected news articles distribution ({total} total sources)
        </span>
      </div>

      <div className="h-44 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                background: "rgb(var(--bg-elevated))", 
                border: "1px solid rgb(var(--border-default))",
                borderRadius: "8px",
                fontSize: "12px"
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-[10px] font-bold text-[rgb(var(--text-tertiary))] uppercase">{item.name}</span>
            <span className="text-subtitle font-extrabold text-[rgb(var(--text-primary))]" style={{ color: COLORS[idx] }}>
              {item.value} ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Metric comparative breakdown chart
 */
export function ValuationMetricsChart({ financialData }: { financialData: FinancialData }) {
  const data = useMemo(() => {
    const rawData = [
      { name: "P/E", value: financialData.pe_ratio },
      { name: "ROE %", value: financialData.roe ? Math.round(financialData.roe * 100) : null },
      { name: "Gross %", value: financialData.gross_margin ? Math.round(financialData.gross_margin * 100) : null },
      { name: "Beta", value: financialData.beta ? Math.round(financialData.beta * 10) : null },
    ];
    return rawData.filter(item => item.value !== null && item.value !== undefined && item.value !== 0);
  }, [financialData]);

  const hasData = useMemo(() => {
    return financialData && data.length > 0;
  }, [financialData, data]);

  if (!hasData) {
    return (
      <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 flex flex-col items-center justify-center min-h-[220px] text-center">
        <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))] self-start">Performance Profile</h4>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))] self-start mb-6">
          Comparative core valuation metrics
        </span>
        <span className="text-xs text-[rgb(var(--text-secondary))]">No financial metrics available.</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 space-y-4">
      <div>
        <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">Performance Profile</h4>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">
          Comparative core valuation metrics
        </span>
      </div>

      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" stroke="rgb(var(--text-tertiary))" fontSize={11} tickLine={false} />
            <YAxis stroke="rgb(var(--text-tertiary))" fontSize={11} tickLine={false} />
            <Tooltip 
              cursor={{ fill: "rgba(var(--accent-primary-rgb), 0.05)" }}
              contentStyle={{ 
                background: "rgb(var(--bg-elevated))", 
                border: "1px solid rgb(var(--border-default))",
                borderRadius: "8px",
                fontSize: "12px"
              }} 
            />
            <Bar dataKey="value" fill="rgb(var(--accent-primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/**
 * Radial SVG gauge showing overall critic/evidence confidence
 */
export function EvidenceConfidenceGauge({ score }: { score: number }) {
  const radius = 50;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  if (!score) {
    return (
      <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 flex flex-col items-center justify-center min-h-[220px] text-center">
        <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))] self-start">Evidence Validation</h4>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))] self-start mb-6">
          Critic agent decision safety indicator
        </span>
        <span className="text-xs text-[rgb(var(--text-secondary))]">Validation score not available.</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 space-y-4 flex flex-col items-center justify-center text-center">
      <div className="w-full text-left">
        <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">Evidence Validation</h4>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">
          Critic agent decision safety indicator
        </span>
      </div>

      <div className="relative flex items-center justify-center h-36 w-36 mt-2 select-none">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="rgb(var(--border-default))"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="rgb(var(--accent-primary))"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-display font-extrabold text-[rgb(var(--text-primary))]">{score}%</span>
          <span className="text-[10px] font-bold uppercase text-[rgb(var(--text-tertiary))]">Confidence</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Execution metrics workflow log panel
 */
export function WorkflowAnalyticsPanel({ reportData }: { reportData: ResearchResponse }) {
  const duration = reportData.metadata?.duration 
    ? `${reportData.metadata.duration.toFixed(1)}s` 
    : "N/A";
  const agentCount = reportData.metadata?.agent_count 
    ? `${reportData.metadata.agent_count} Node Agents` 
    : "5 Node Agents";
  const modelInfo = reportData.metadata?.model_info
    ? reportData.metadata.model_info
    : "N/A";

  const rawRisk = reportData.critic_report?.hallucination_risk || "None";
  const truncatedRisk = rawRisk.length > 20 ? rawRisk.substring(0, 18) + "..." : rawRisk;

  const metrics = [
    { label: "Pipeline Duration", value: duration, icon: Clock, title: `Duration: ${duration}` },
    { label: "Orchestration Nodes", value: agentCount, icon: Cpu, title: `Orchestrated: ${agentCount}` },
    { label: "Model Info", value: modelInfo, icon: ShieldCheck, title: `Model: ${modelInfo}` },
    { label: "Hallucination Risk", value: truncatedRisk, icon: Layers, title: rawRisk }
  ];

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 space-y-4">
      <div>
        <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">Workflow Analytics</h4>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">
          Automated agent deployment metrics
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))]" title={item.title}>
            <div className="h-8 w-8 rounded bg-[rgb(var(--bg-subtle))] flex items-center justify-center flex-shrink-0 text-[rgb(var(--accent-primary))]">
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))] block">
                {item.label}
              </span>
              <span className="text-caption font-semibold text-[rgb(var(--text-primary))]">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Extensible Peer comparison module skeleton for future enhancements
 */
export function ComparativeAnalysisView() {
  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-[rgb(var(--border-default))] pb-3">
        <div>
          <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">Peer Comparison Workspace</h4>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">
            Compare active symbol valuation side-by-side
          </span>
        </div>
        <button className="h-7 px-3 rounded-lg border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] hover:bg-[rgb(var(--bg-subtle))] text-caption font-semibold inline-flex items-center gap-1.5 cursor-pointer">
          <Plus className="h-3.5 w-3.5" />
          <span>Add Peer Ticker</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-6 text-center max-w-sm mx-auto space-y-3">
        <Compass className="h-8 w-8 text-[rgb(var(--text-tertiary))]" />
        <div>
          <h5 className="text-small font-bold text-[rgb(var(--text-primary))]">Feature Upgrade Pending</h5>
          <p className="text-caption text-[rgb(var(--text-secondary))] leading-relaxed">
            Multi-ticker comparative pipelines will become accessible upon subsequent backend routing releases.
          </p>
        </div>
      </div>
    </div>
  );
}
