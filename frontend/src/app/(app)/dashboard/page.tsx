"use client";

import { useAppStore } from "@/store/useAppStore";
import { Section, SectionHeader } from "@/components/layout/section";
import { BentoGrid, BentoGridItem } from "@/components/layout/bento-grid";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star, Activity } from "lucide-react";
import Link from "next/link";
import { formatDate, cn } from "@/lib/utils";

export default function DashboardPage() {
  const history = useAppStore((state) => state.history);
  const recentResearch = history.slice(0, 3);

  return (
    <Section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <SectionHeader title="Dashboard" subtitle="Welcome back to your workspace." className="mb-0" />
        <Link href="/">
          <Button size="lg" className="shadow-glow-accent">
            New Research <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <BentoGrid>
        {/* Market Summary */}
        <BentoGridItem colSpan={{ sm: 1, md: 6, lg: 8 }} className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-[rgb(var(--accent-primary))]" />
              <CardTitle>Market Overview</CardTitle>
            </div>
            <CardDescription>Major indices performance today.</CardDescription>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col">
              <span className="text-small text-[rgb(var(--text-secondary))] mb-1">S&P 500</span>
              <span className="text-title tabular-nums">5,123.45</span>
              <span className="text-sm text-emerald-500 font-medium">+1.24%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-small text-[rgb(var(--text-secondary))] mb-1">NASDAQ</span>
              <span className="text-title tabular-nums">16,234.12</span>
              <span className="text-sm text-emerald-500 font-medium">+1.56%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-small text-[rgb(var(--text-secondary))] mb-1">DOW</span>
              <span className="text-title tabular-nums">39,123.45</span>
              <span className="text-sm text-red-500 font-medium">-0.12%</span>
            </div>
          </div>
        </BentoGridItem>

        {/* Watchlist Quick View */}
        <BentoGridItem colSpan={{ sm: 1, md: 6, lg: 4 }} className="bg-[rgb(var(--bg-elevated))]">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-amber-500" />
            <CardTitle>Watchlist</CardTitle>
          </div>
          <div className="space-y-4">
            {[
              { ticker: "NVDA", price: 890.5, change: 2.4 },
              { ticker: "MSFT", price: 410.2, change: 0.8 },
              { ticker: "AAPL", price: 172.5, change: -1.2 },
            ].map((item) => (
              <div key={item.ticker} className="flex justify-between items-center">
                <span className="font-semibold text-ticker">{item.ticker}</span>
                <div className="text-right">
                  <div className="text-sm tabular-nums font-medium">${item.price.toFixed(2)}</div>
                  <div className={cn("text-xs tabular-nums font-medium", item.change > 0 ? "text-emerald-500" : "text-red-500")}>
                    {item.change > 0 ? "+" : ""}{item.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-xs">View All</Button>
        </BentoGridItem>

        {/* Recent Research History */}
        <BentoGridItem colSpan={{ lg: 12 }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[rgb(var(--text-secondary))]" />
              <CardTitle>Recent Research</CardTitle>
            </div>
            <Link href="/history">
              <Button variant="ghost" size="sm">View History</Button>
            </Link>
          </div>

          {recentResearch.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center">
              <p className="text-[rgb(var(--text-secondary))] mb-4">You haven&apos;t generated any research yet.</p>
              <Link href="/">
                <Button variant="outline">Start your first report</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentResearch.map((item) => (
                <Link key={item.id} href={`/reports/${item.ticker}`}>
                  <Card className="h-full hover:border-[rgb(var(--accent-primary))]/50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-ticker">{item.ticker}</CardTitle>
                        <span className="text-caption text-[rgb(var(--text-tertiary))]">
                          {formatDate(new Date(item.timestamp))}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-small text-[rgb(var(--text-secondary))] line-clamp-3">
                        {item.data.final_report?.investment_outlook || "No outlook available."}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </BentoGridItem>
      </BentoGrid>
    </Section>
  );
}
