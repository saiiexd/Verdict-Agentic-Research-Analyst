"use client";

import * as React from "react";
import { useAppStore } from "@/store/useAppStore";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Pin } from "lucide-react";
import Link from "next/link";
import { 
  QuickActions, 
  RecommendationBadge 
} from "@/components/research/HistoryComponents";
import { 
  WatchlistPanel, 
  WorkspaceInsights, 
  ResearchCollections, 
  WorkspaceNotificationCenter, 
  PersonalizedLayout 
} from "@/components/research/WorkspaceDashboardComponents";

export default function DashboardPage() {
  const { history, pinnedTickers, clearHistory } = useAppStore();

  // Find reports matching pinned tickers
  const pinnedReports = React.useMemo(() => {
    return history.filter(item => pinnedTickers.includes(item.ticker.toUpperCase()));
  }, [history, pinnedTickers]);

  const recentResearch = history.slice(0, 3);

  const handleClearHistoryLog = () => {
    if (confirm("Are you sure you want to clear the entire research history log?")) {
      clearHistory();
    }
  };

  return (
    <Section className="pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-[rgb(var(--border-default))] pb-6">
        <SectionHeader title="Workspace Intelligence" subtitle="Track your automated AI research runs and execution benchmarks." className="mb-0" />
        <Link href="/">
          <Button size="lg" className="shadow-glow-accent cursor-pointer">
            New Research <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        {/* Workspace Insights Aggregated stats */}
        <WorkspaceInsights />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column (8/12) */}
          <div className="lg:col-span-8 space-y-8 w-full">
            {/* Reusable Watchlist panel */}
            <WatchlistPanel />

            {/* Pinned / Saved reports section */}
            {pinnedReports.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-[rgb(var(--border-default))] pb-2">
                  <Pin className="h-4 w-4 text-[rgb(var(--accent-primary))]" />
                  <h3 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">Pinned Research</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pinnedReports.slice(0, 4).map((item) => {
                    const score = item.data.critic_report?.overall_score || 0;
                    return (
                      <Link href={`/reports/${item.ticker.toLowerCase()}`} key={item.id}>
                        <div className="p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] hover:border-[rgb(var(--text-tertiary))] transition-all flex flex-col justify-between h-32 select-none">
                          <div>
                            <div className="flex justify-between items-center gap-2 mb-1.5">
                              <span className="font-extrabold text-sm">{item.ticker.toUpperCase()}</span>
                              <RecommendationBadge score={score} />
                            </div>
                            <p className="text-[11px] text-[rgb(var(--text-secondary))] truncate">
                              {item.data.financial_data?.company_name || "Securities Report"}
                            </p>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-[rgb(var(--text-tertiary))] mt-auto pt-2 border-t border-[rgb(var(--border-default))]/25">
                            <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                            <span className="font-semibold text-[rgb(var(--accent-primary))] hover:underline inline-flex items-center gap-0.5">
                              Open <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent Research list */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[rgb(var(--border-default))] pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[rgb(var(--text-secondary))]" />
                  <h3 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">Recent Reports</h3>
                </div>
                <Link href="/history">
                  <span className="text-xs font-semibold text-[rgb(var(--accent-primary))] hover:underline">
                    View All History
                  </span>
                </Link>
              </div>

              {recentResearch.length === 0 ? (
                <div className="py-12 text-center border border-dashed border-[rgb(var(--border-default))] rounded-xl">
                  <p className="text-[rgb(var(--text-secondary))] text-small mb-4">No reports generated yet.</p>
                  <Link href="/">
                    <Button variant="outline">Start first analysis</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recentResearch.map((item) => {
                    const score = item.data.critic_report?.overall_score || 0;
                    return (
                      <Link key={item.id} href={`/reports/${item.ticker.toLowerCase()}`}>
                        <div className="p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] hover:border-[rgb(var(--text-tertiary))] transition-all flex flex-col justify-between h-32 select-none">
                          <div>
                            <div className="flex justify-between items-center gap-2 mb-1.5">
                              <span className="font-extrabold text-sm">{item.ticker.toUpperCase()}</span>
                              <RecommendationBadge score={score} />
                            </div>
                            <p className="text-[11px] text-[rgb(var(--text-secondary))] line-clamp-2 leading-tight">
                              {item.data.final_report?.company_overview || "No overview summary available."}
                            </p>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-[rgb(var(--text-tertiary))] mt-auto pt-2 border-t border-[rgb(var(--border-default))]/25">
                            <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                            <span className="font-semibold text-[rgb(var(--accent-primary))] hover:underline inline-flex items-center gap-0.5">
                              Open <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Column (4/12) */}
          <div className="lg:col-span-4 space-y-6 w-full">
            <QuickActions onClearAll={handleClearHistoryLog} />
            <ResearchCollections />
            <WorkspaceNotificationCenter />
            <PersonalizedLayout />
          </div>
        </div>
      </div>
    </Section>
  );
}
