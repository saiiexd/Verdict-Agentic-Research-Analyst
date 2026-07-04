"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  Search, 
  Grid, 
  List, 
  ArrowUpDown, 
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  ResearchCard, 
  ResearchRow, 
  EmptyHistoryState 
} from "@/components/research/HistoryComponents";

export default function HistoryPage() {
  const { history, pinnedTickers, togglePinTicker, removeHistory, clearHistory } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [ratingFilter, setRatingFilter] = useState<"All" | "Buy" | "Hold" | "Sell">("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "ticker" | "score">("newest");

  const handleClearHistoryLog = () => {
    if (confirm("Are you sure you want to delete all research entries?")) {
      clearHistory();
    }
  };

  const getRecommendationLabel = (score: number) => {
    if (score >= 80) return "Buy";
    if (score < 60) return "Sell";
    return "Hold";
  };

  // Filter and sort history list dynamically
  const processedHistory = useMemo(() => {
    let result = [...history];

    // 1. Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.ticker.toLowerCase().includes(q) || 
        (item.data.financial_data?.company_name || "").toLowerCase().includes(q)
      );
    }

    // 2. Filter by Rating Category
    if (ratingFilter !== "All") {
      result = result.filter(item => {
        const score = item.data.critic_report?.overall_score || 0;
        return getRecommendationLabel(score) === ratingFilter;
      });
    }

    // 3. Sort results
    result.sort((a, b) => {
      // Pinned reports always float to the top
      const isAPinned = pinnedTickers.includes(a.ticker.toUpperCase());
      const isBPinned = pinnedTickers.includes(b.ticker.toUpperCase());
      if (isAPinned && !isBPinned) return -1;
      if (!isAPinned && isBPinned) return 1;

      if (sortBy === "newest") {
        return b.timestamp - a.timestamp;
      }
      if (sortBy === "oldest") {
        return a.timestamp - b.timestamp;
      }
      if (sortBy === "ticker") {
        return a.ticker.localeCompare(b.ticker);
      }
      if (sortBy === "score") {
        const scoreA = a.data.critic_report?.overall_score || 0;
        const scoreB = b.data.critic_report?.overall_score || 0;
        return scoreB - scoreA;
      }
      return 0;
    });

    return result;
  }, [history, searchQuery, ratingFilter, sortBy, pinnedTickers]);

  return (
    <Section className="pb-24 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-[rgb(var(--border-default))] pb-6">
        <SectionHeader title="Research History Log" subtitle="Revisit and organize previously compiled analysis reports." className="mb-0" />
        {history.length > 0 && (
          <Button variant="outline" className="text-red-500 hover:text-red-500 hover:bg-red-500/10 cursor-pointer" onClick={handleClearHistoryLog}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear All History
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <EmptyHistoryState />
      ) : (
        <div className="space-y-6">
          {/* History Filters and Mode Switches Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-xl border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-elevated))] select-none">
            {/* Left side: Search & Filter options */}
            <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[rgb(var(--text-tertiary))]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ticker or company..."
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] focus:outline-none focus:ring-1 focus:ring-[rgb(var(--accent-primary))] transition-all"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <Filter className="h-3.5 w-3.5 text-[rgb(var(--text-tertiary))]" />
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value as "All" | "Buy" | "Hold" | "Sell")}
                  className="px-2.5 py-1.5 rounded-lg text-xs border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] focus:outline-none"
                >
                  <option value="All">All Ratings</option>
                  <option value="Buy">Buy Outlooks</option>
                  <option value="Hold">Hold Outlooks</option>
                  <option value="Sell">Sell Outlooks</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <ArrowUpDown className="h-3.5 w-3.5 text-[rgb(var(--text-tertiary))]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "ticker" | "score")}
                  className="px-2.5 py-1.5 rounded-lg text-xs border border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="ticker">Ticker A-Z</option>
                  <option value="score">Confidence Rating</option>
                </select>
              </div>
            </div>

            {/* Right side: layout mode selectors */}
            <div className="flex items-center gap-1 border border-[rgb(var(--border-default))] rounded-lg p-0.5 bg-[rgb(var(--bg-surface))] w-full sm:w-auto justify-center">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("p-1.5 rounded-md transition-colors", viewMode === "grid" ? "bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-primary))] shadow-sm" : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]" )}
                title="Grid layout cards"
              >
                <Grid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn("p-1.5 rounded-md transition-colors", viewMode === "list" ? "bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-primary))] shadow-sm" : "text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))]" )}
                title="List layout rows"
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Research log entries display wrapper */}
          <div className="w-full">
            {processedHistory.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-[rgb(var(--border-default))] rounded-xl">
                <p className="text-caption text-[rgb(var(--text-secondary))]">No matching search query entries found.</p>
              </div>
            ) : (
              <div className={cn(
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "flex flex-col gap-3"
              )}>
                {processedHistory.map((item) => {
                  const isPinned = pinnedTickers.includes(item.ticker.toUpperCase());
                  return (
                    <div key={item.id}>
                      {viewMode === "grid" ? (
                        <ResearchCard 
                          item={item} 
                          isPinned={isPinned} 
                          onTogglePin={() => togglePinTicker(item.ticker.toUpperCase())}
                          onDelete={() => removeHistory(item.id)}
                        />
                      ) : (
                        <ResearchRow 
                          item={item} 
                          isPinned={isPinned} 
                          onTogglePin={() => togglePinTicker(item.ticker.toUpperCase())}
                          onDelete={() => removeHistory(item.id)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
