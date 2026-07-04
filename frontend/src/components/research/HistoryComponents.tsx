"use client";

import * as React from "react";
import { 
  FileText, 
  Trash2, 
  ArrowRight, 
  Pin, 
  Sparkles, 
  TrendingUp, 
  Activity, 
  Clock
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { HistoryItem } from "@/store/useAppStore";

// ─── 1. Recommendation Badge ─────────────────────────────────
export function RecommendationBadge({ score }: { score: number }) {
  let label = "Hold";
  let colorClass = "text-amber-500 border-amber-500/10 bg-amber-500/5";
  if (score >= 80) {
    label = score >= 90 ? "Strong Buy" : "Buy";
    colorClass = "text-emerald-500 border-emerald-500/10 bg-emerald-500/5";
  } else if (score < 60) {
    label = score < 40 ? "Strong Sell" : "Sell";
    colorClass = "text-red-500 border-red-500/10 bg-red-500/5";
  }

  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wide uppercase select-none", colorClass)}>
      {label}
    </span>
  );
}

// ─── 2. Reusable Research Card ───────────────────────────────
export function ResearchCard({ 
  item, 
  isPinned, 
  onTogglePin, 
  onDelete 
}: { 
  item: HistoryItem; 
  isPinned: boolean; 
  onTogglePin: () => void; 
  onDelete: () => void;
}) {
  const score = item.data.critic_report?.overall_score || 0;
  const companyName = item.data.financial_data?.company_name || "Securities Report";

  return (
    <div className="group relative rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] hover:border-[rgb(var(--text-tertiary))] p-5 transition-all duration-300 flex flex-col justify-between h-48 select-none">
      <div>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <span className="text-title font-extrabold tracking-tight text-[rgb(var(--text-primary))]">
              {item.ticker.toUpperCase()}
            </span>
            <RecommendationBadge score={score} />
          </div>
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => { e.preventDefault(); onTogglePin(); }}
              className={cn("p-1 rounded hover:bg-[rgb(var(--bg-surface))] transition-colors", isPinned ? "text-[rgb(var(--accent-primary))]" : "text-[rgb(var(--text-tertiary))]")}
              title="Pin Report"
            >
              <Pin className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); onDelete(); }}
              className="p-1 rounded hover:bg-[rgb(var(--bg-surface))] text-[rgb(var(--text-tertiary))] hover:text-red-500 transition-colors"
              title="Delete Report"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <span className="text-caption font-semibold text-[rgb(var(--text-secondary))] block truncate mb-3">
          {companyName}
        </span>
        <p className="text-caption text-[rgb(var(--text-tertiary))] line-clamp-2 leading-relaxed text-balance">
          {item.data.final_report?.company_overview || "No synthesized executive summary available."}
        </p>
      </div>

      <div className="flex justify-between items-center border-t border-[rgb(var(--border-default))]/40 pt-3 text-[10px]">
        <span className="font-mono text-[rgb(var(--text-tertiary))]">
          {new Date(item.timestamp).toLocaleDateString()}
        </span>
        <Link href={`/reports/${item.ticker.toLowerCase()}`} className="text-[rgb(var(--accent-primary))] font-semibold hover:underline inline-flex items-center gap-1">
          Open Workspace <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

// ─── 3. Reusable Research Row (List View) ────────────────────
export function ResearchRow({ 
  item, 
  isPinned, 
  onTogglePin, 
  onDelete 
}: { 
  item: HistoryItem; 
  isPinned: boolean; 
  onTogglePin: () => void; 
  onDelete: () => void;
}) {
  const score = item.data.critic_report?.overall_score || 0;
  const companyName = item.data.financial_data?.company_name || "Securities Report";

  return (
    <div className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] hover:border-[rgb(var(--text-tertiary))] transition-all select-none">
      <div className="flex items-center gap-4 flex-1 truncate">
        <div className="flex items-center gap-2">
          <span className="text-subtitle font-bold text-[rgb(var(--text-primary))]">
            {item.ticker.toUpperCase()}
          </span>
          <RecommendationBadge score={score} />
        </div>
        <span className="text-caption font-medium text-[rgb(var(--text-tertiary))] truncate max-w-[200px] hidden sm:block">
          {companyName}
        </span>
        <span className="text-[10px] text-[rgb(var(--text-tertiary))] hidden md:block">
          Confidence: {score}%
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <span className="font-mono text-[rgb(var(--text-tertiary))] text-[10px]">
          {new Date(item.timestamp).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={onTogglePin}
            className={cn("p-1 rounded hover:bg-[rgb(var(--bg-surface))] transition-colors", isPinned ? "text-[rgb(var(--accent-primary))]" : "text-[rgb(var(--text-tertiary))]" )}
            title="Pin Report"
          >
            <Pin className="h-3.5 w-3.5" />
          </button>
          <button 
            onClick={onDelete}
            className="p-1 rounded hover:bg-[rgb(var(--bg-surface))] text-[rgb(var(--text-tertiary))] hover:text-red-500 transition-colors"
            title="Delete Report"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <Link href={`/reports/${item.ticker.toLowerCase()}`} className="p-1 rounded hover:bg-[rgb(var(--bg-surface))] text-[rgb(var(--accent-primary))]">
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Dashboard Overview statistics ────────────────────────
export function DashboardOverview({ history }: { history: HistoryItem[] }) {
  const stats = React.useMemo(() => {
    if (history.length === 0) return { count: 0, avgConfidence: 0, bullishCount: 0 };
    
    let scoreTotal = 0;
    let bullishCount = 0;
    history.forEach((h) => {
      const score = h.data.critic_report?.overall_score || 0;
      scoreTotal += score;
      if (score >= 80) bullishCount++;
    });

    return {
      count: history.length,
      avgConfidence: Math.round(scoreTotal / history.length),
      bullishCount
    };
  }, [history]);

  const cards = [
    { label: "Research Runs", value: stats.count, icon: Activity, color: "text-[rgb(var(--accent-primary))]" },
    { label: "Average Confidence", value: `${stats.avgConfidence}%`, icon: Sparkles, color: "text-emerald-500" },
    { label: "Buy Recommendations", value: stats.bullishCount, icon: TrendingUp, color: "text-emerald-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-default))] flex items-center justify-center flex-shrink-0">
            <card.icon className={cn("h-5 w-5", card.color)} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))] block">{card.label}</span>
            <span className="text-subtitle font-extrabold text-[rgb(var(--text-primary))]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {card.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 5. Quick Actions ────────────────────────────────────────
export function QuickActions({ onClearAll }: { onClearAll: () => void }) {
  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-5 space-y-4 select-none">
      <h4 className="text-small font-bold uppercase tracking-widest text-[rgb(var(--text-tertiary))]">
        Quick Actions
      </h4>
      <div className="flex flex-col gap-2.5">
        <Link href="/">
          <button className="w-full h-9 rounded-lg bg-[rgb(var(--accent-primary))] hover:shadow-md text-[rgb(var(--bg-surface))] text-caption font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
            <Sparkles className="h-3.5 w-3.5" />
            <span>New Research</span>
          </button>
        </Link>
        <Link href="/history">
          <button className="w-full h-9 rounded-lg border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] hover:bg-[rgb(var(--bg-subtle))] text-[rgb(var(--text-secondary))] text-caption font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
            <Clock className="h-3.5 w-3.5" />
            <span>Browse History</span>
          </button>
        </Link>
        <button 
          onClick={onClearAll}
          className="w-full h-9 rounded-lg border border-[rgb(var(--border-default))] bg-red-500/5 hover:bg-red-500/10 text-red-500 text-caption font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear History Log</span>
        </button>
      </div>
    </div>
  );
}

// ─── 6. Recent Activity list ─────────────────────────────────
export function RecentActivity({ history }: { history: HistoryItem[] }) {
  const recents = history.slice(0, 4);

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-5 space-y-4 select-none">
      <h4 className="text-small font-bold uppercase tracking-widest text-[rgb(var(--text-tertiary))]">
        Recent Activity
      </h4>
      <div className="space-y-3.5">
        {recents.length === 0 ? (
          <p className="text-xs text-[rgb(var(--text-tertiary))] italic py-4">No recent activity logged.</p>
        ) : (
          recents.map((item) => (
            <div key={item.id} className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-2 truncate">
                <span className="font-bold text-xs text-[rgb(var(--text-primary))]">{item.ticker.toUpperCase()}</span>
                <span className="text-[10px] text-[rgb(var(--text-tertiary))] truncate max-w-[120px] hidden sm:inline">
                  {item.data.financial_data?.company_name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[rgb(var(--text-tertiary))]">
                {new Date(item.timestamp).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── 7. Empty History State ──────────────────────────────────
export function EmptyHistoryState() {
  return (
    <div className="text-center py-20 bg-[rgb(var(--bg-elevated))] rounded-xl border border-dashed border-[rgb(var(--border-default))] max-w-lg mx-auto p-6 space-y-4">
      <div className="h-12 w-12 rounded-full bg-[rgb(var(--bg-surface))] border border-[rgb(var(--border-default))] flex items-center justify-center mx-auto">
        <FileText className="h-5 w-5 text-[rgb(var(--text-tertiary))]" />
      </div>
      <div>
        <h4 className="text-subtitle font-bold text-[rgb(var(--text-primary))]">No Research Found</h4>
        <p className="text-caption text-[rgb(var(--text-secondary))] leading-relaxed max-w-xs mx-auto">
          Start your first multi-agent financial research session by typing a stock symbol in the workspace.
        </p>
      </div>
      <Link href="/">
        <button className="h-9 px-4 rounded-lg bg-[rgb(var(--accent-primary))] text-[rgb(var(--bg-surface))] text-caption font-semibold inline-flex items-center gap-1.5 cursor-pointer">
          Start Research <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </Link>
    </div>
  );
}
