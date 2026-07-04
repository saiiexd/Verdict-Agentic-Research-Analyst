"use client";

import * as React from "react";
import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Bell, 
  FolderPlus, 
  Settings2,
  Check
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { RecommendationBadge } from "./HistoryComponents";

// ─── 1. Personalized Watchlist Panel ────────────────────────
export function WatchlistPanel() {
  const { watchlist, addToWatchlist, removeFromWatchlist, history } = useAppStore();
  const [newTicker, setNewTicker] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTicker.trim()) {
      addToWatchlist(newTicker.trim().toUpperCase());
      setNewTicker("");
    }
  };

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-5 space-y-4 select-none">
      <div className="flex justify-between items-center border-b border-[rgb(var(--border-default))] pb-3">
        <div>
          <h4 className="text-small font-bold uppercase tracking-widest text-[rgb(var(--text-tertiary))]">
            Personal Watchlist
          </h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">
            Companies under active monitoring
          </span>
        </div>
        
        {/* Quick Ticker addition input */}
        <form onSubmit={handleAdd} className="flex items-center gap-1">
          <input
            type="text"
            placeholder="Add Ticker"
            value={newTicker}
            onChange={(e) => setNewTicker(e.target.value)}
            className="w-20 px-2 py-1 rounded text-[10px] border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] uppercase focus:outline-none"
          />
          <button 
            type="submit"
            className="p-1 rounded bg-[rgb(var(--accent-primary))] text-[rgb(var(--bg-surface))] cursor-pointer hover:shadow-sm"
          >
            <Plus className="h-3 w-3" />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {watchlist.map((ticker) => {
          // Attempt to find metadata from history run
          const historyMatch = history.find(h => h.ticker.toUpperCase() === ticker.toUpperCase());
          const score = historyMatch?.data.critic_report?.overall_score;

          return (
            <div 
              key={ticker} 
              className="p-3 rounded-lg border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] flex items-center justify-between gap-3 group/watch transition-all hover:border-[rgb(var(--text-tertiary))]"
            >
              <div className="flex flex-col gap-0.5 truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[rgb(var(--text-primary))]">{ticker}</span>
                  {score !== undefined && <RecommendationBadge score={score} />}
                </div>
                <span className="text-[9px] text-[rgb(var(--text-tertiary))] truncate">
                  {historyMatch?.data.financial_data?.company_name || "Equity Security"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {historyMatch ? (
                  <Link href={`/reports/${ticker.toLowerCase()}`} className="text-[9px] font-semibold text-[rgb(var(--accent-primary))] hover:underline">
                    View
                  </Link>
                ) : (
                  <Link href={`/?ticker=${ticker}`} className="text-[9px] font-semibold text-[rgb(var(--text-tertiary))] hover:underline">
                    Run
                  </Link>
                )}
                <button 
                  onClick={() => removeFromWatchlist(ticker)}
                  className="p-1 rounded hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-tertiary))] hover:text-red-500 opacity-0 group-hover/watch:opacity-100 transition-opacity"
                  title="Remove Ticker"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 2. Intelligence Insights Card dashboard ─────────────────
export function WorkspaceInsights() {
  const history = useAppStore((state) => state.history);

  const stats = React.useMemo(() => {
    if (history.length === 0) return { count: 0, avgConfidence: 0, sectors: "None" };
    
    let totalScore = 0;
    history.forEach(h => {
      totalScore += h.data.critic_report?.overall_score || 0;
    });

    return {
      count: history.length,
      avgConfidence: Math.round(totalScore / history.length),
      sectors: "Tech, Finance" // mock aggregate
    };
  }, [history]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
      <div className="p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] flex flex-col gap-1">
        <span className="text-[9px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">Coverage Count</span>
        <span className="text-subtitle font-extrabold text-[rgb(var(--text-primary))]" style={{ fontVariantNumeric: "tabular-nums" }}>{stats.count} Companies</span>
      </div>
      <div className="p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] flex flex-col gap-1">
        <span className="text-[9px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">Avg Critic Score</span>
        <span className="text-subtitle font-extrabold text-emerald-500" style={{ fontVariantNumeric: "tabular-nums" }}>{stats.avgConfidence}%</span>
      </div>
      <div className="p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] flex flex-col gap-1">
        <span className="text-[9px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">Core Sectors</span>
        <span className="text-subtitle font-extrabold text-[rgb(var(--text-primary))] truncate">{stats.sectors}</span>
      </div>
      <div className="p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] flex flex-col gap-1">
        <span className="text-[9px] uppercase font-bold tracking-wider text-[rgb(var(--text-tertiary))]">Agent Speed avg</span>
        <span className="text-subtitle font-extrabold text-[rgb(var(--text-primary))]" style={{ fontVariantNumeric: "tabular-nums" }}>~42 seconds</span>
      </div>
    </div>
  );
}

// ─── 3. Work Collections Module ──────────────────────────────
export function ResearchCollections() {
  const collections = [
    { name: "Semiconductors & AI", count: 4, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { name: "Growth Innovators", count: 2, color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    { name: "Healthcare Focus", count: 1, color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  ];

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-5 space-y-4 select-none">
      <div className="flex justify-between items-center border-b border-[rgb(var(--border-default))] pb-3">
        <div>
          <h4 className="text-small font-bold uppercase tracking-widest text-[rgb(var(--text-tertiary))]">
            Research Collections
          </h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">
            Group thematic categories and symbols
          </span>
        </div>
        <button className="p-1 rounded border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] hover:bg-[rgb(var(--bg-subtle))] cursor-pointer">
          <FolderPlus className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-2">
        {collections.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))]">
            <span className="text-xs font-semibold text-[rgb(var(--text-secondary))]">{item.name}</span>
            <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold border", item.color)}>
              {item.count} items
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Notifications center ─────────────────────────────────
export function WorkspaceNotificationCenter() {
  const { notifications, markAllNotificationsRead } = useAppStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-5 space-y-4 select-none">
      <div className="flex justify-between items-center border-b border-[rgb(var(--border-default))] pb-3">
        <div className="flex items-center gap-2">
          <Bell className={cn("h-4 w-4", unreadCount > 0 ? "text-[rgb(var(--accent-primary))] animate-bounce" : "text-[rgb(var(--text-tertiary))]" )} />
          <div>
            <h4 className="text-small font-bold uppercase tracking-widest text-[rgb(var(--text-tertiary))]">
              System Alerts
            </h4>
            <span className="text-[10px] text-[rgb(var(--text-tertiary))]">
              {unreadCount} unread system notices
            </span>
          </div>
        </div>

        {unreadCount > 0 && (
          <button 
            onClick={markAllNotificationsRead}
            className="text-[9px] font-semibold text-[rgb(var(--accent-primary))] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <Check className="h-3 w-3" /> Mark read
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-36 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-xs text-[rgb(var(--text-tertiary))] italic py-4 text-center">No alerts logged.</p>
        ) : (
          notifications.map((item) => (
            <div key={item.id} className={cn(
              "p-2.5 rounded-lg text-xs leading-relaxed border",
              item.read 
                ? "bg-[rgb(var(--bg-surface))]/40 border-[rgb(var(--border-default))]/40 text-[rgb(var(--text-tertiary))]" 
                : "bg-[rgb(var(--bg-surface))] border-[rgb(var(--border-default))] text-[rgb(var(--text-secondary))]"
            )}>
              {item.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── 5. Layout Personalization Density Dashboard Settings ────
export function PersonalizedLayout() {
  const { layoutDensity, setLayoutDensity } = useAppStore();

  return (
    <div className="rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] p-5 space-y-4 select-none">
      <div className="flex items-center gap-2 border-b border-[rgb(var(--border-default))] pb-3">
        <Settings2 className="h-4 w-4 text-[rgb(var(--text-tertiary))]" />
        <div>
          <h4 className="text-small font-bold uppercase tracking-widest text-[rgb(var(--text-tertiary))]">
            Personalization
          </h4>
          <span className="text-[10px] text-[rgb(var(--text-tertiary))]">
            Adjust workspace density and preferences
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold text-[rgb(var(--text-secondary))]">Density layout</span>
        <div className="flex border border-[rgb(var(--border-default))] rounded-lg p-0.5 bg-[rgb(var(--bg-surface))]">
          <button 
            onClick={() => setLayoutDensity("comfortable")}
            className={cn("px-2.5 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer", layoutDensity === "comfortable" ? "bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-primary))] shadow-sm" : "text-[rgb(var(--text-tertiary))]" )}
          >
            Comfortable
          </button>
          <button 
            onClick={() => setLayoutDensity("compact")}
            className={cn("px-2.5 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer", layoutDensity === "compact" ? "bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-primary))] shadow-sm" : "text-[rgb(var(--text-tertiary))]" )}
          >
            Compact
          </button>
        </div>
      </div>
    </div>
  );
}
