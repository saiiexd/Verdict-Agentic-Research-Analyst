"use client";

import { BarChart3, TrendingUp } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const SCORE_DATA = [
  { ticker: "MSFT", score: 9 },
  { ticker: "NVDA", score: 9 },
  { ticker: "GOOGL", score: 8 },
  { ticker: "AMZN", score: 8 },
  { ticker: "AAPL", score: 7 },
  { ticker: "TSLA", score: 6 },
];

const TREND_DATA = [
  { date: "Jun 24", reports: 1 },
  { date: "Jun 25", reports: 2 },
  { date: "Jun 26", reports: 1 },
  { date: "Jun 27", reports: 2 },
  { date: "Jun 28", reports: 1 },
  { date: "Jun 29", reports: 2 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-headline text-[rgb(var(--text-primary))]">Analytics</h1>
        <p className="text-body text-[rgb(var(--text-secondary))] mt-1">Research performance overview</p>
      </div>

      <BentoGrid cols={12}>
        {/* Stats row */}
        {[
          { label: "Total Reports", value: "6", sub: "Last 7 days" },
          { label: "Avg AI Score", value: "7.8", sub: "Out of 10" },
          { label: "Strong Buys", value: "2", sub: "33% of reports" },
          { label: "Avg Duration", value: "~62s", sub: "Per research" },
        ].map((s) => (
          <BentoCard key={s.label} span="3" className="col-span-3 p-5">
            <p className="text-caption text-[rgb(var(--text-tertiary))] mb-2">{s.label}</p>
            <p className="text-metric text-2xl text-[rgb(var(--text-primary))]">{s.value}</p>
            <p className="text-caption text-[rgb(var(--text-tertiary))] mt-1">{s.sub}</p>
          </BentoCard>
        ))}

        {/* Score bar chart */}
        <BentoCard span="4" className="col-span-7 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-[rgb(var(--text-tertiary))]" />
            <p className="text-subtitle font-semibold text-[rgb(var(--text-primary))]">AI Scores by Ticker</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SCORE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--border-default), 0.4)" vertical={false} />
              <XAxis dataKey="ticker" tick={{ fontSize: 11, fill: "rgb(var(--text-tertiary))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "rgb(var(--text-tertiary))" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgb(var(--bg-elevated))",
                  border: "1px solid rgb(var(--border-default))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                cursor={{ fill: "rgba(var(--accent-primary), 0.06)" }}
              />
              <Bar dataKey="score" fill="rgb(var(--accent-primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BentoCard>

        {/* Research trend */}
        <BentoCard span="4" className="col-span-5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[rgb(var(--text-tertiary))]" />
            <p className="text-subtitle font-semibold text-[rgb(var(--text-primary))]">Research Volume</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={TREND_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 150, 0.15)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "rgb(var(--text-tertiary))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "rgb(var(--text-tertiary))" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgb(var(--bg-elevated))",
                  border: "1px solid rgb(var(--border-default))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="reports" stroke="rgb(var(--accent-secondary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </BentoCard>
      </BentoGrid>
    </div>
  );
}
