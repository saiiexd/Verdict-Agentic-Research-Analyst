"use client";

import { useAppStore } from "@/store/useAppStore";
import { Section, SectionHeader } from "@/components/layout/section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { slideUp } from "@/components/animations/variants";

export default function HistoryPage() {
  const { history, removeHistory, clearHistory } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = history.filter((item) =>
    item.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Section className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 border-b border-[rgb(var(--border-default))] pb-6">
        <SectionHeader title="Research History" subtitle="Your previously generated AI reports." className="mb-0" />
        {history.length > 0 && (
          <Button variant="outline" className="text-red-500 hover:text-red-500 hover:bg-red-500/10" onClick={clearHistory}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear History
          </Button>
        )}
      </div>

      <div className="mb-8 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--text-tertiary))]" />
        <Input 
          placeholder="Search tickers..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-24 bg-[rgb(var(--bg-elevated))] rounded-2xl border border-dashed border-[rgb(var(--border-strong))]">
          <p className="text-[rgb(var(--text-secondary))] mb-6">No research history found.</p>
          <Link href="/">
            <Button>
              Start Research <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              animate="visible"
              variants={slideUp}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col hover:border-[rgb(var(--accent-primary))]/40">
                <CardHeader className="pb-3 border-b border-[rgb(var(--border-default))] mb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl text-ticker tracking-tight">{item.ticker}</CardTitle>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs font-medium text-[rgb(var(--text-tertiary))]">
                        {formatDate(new Date(item.timestamp))}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-[rgb(var(--text-tertiary))] hover:text-red-500"
                        aria-label="Delete report"
                        onClick={(e) => {
                          e.preventDefault();
                          removeHistory(item.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-[rgb(var(--text-secondary))] line-clamp-3 mb-6 flex-1">
                    {item.data.final_report?.investment_outlook || "No report generated."}
                  </p>
                  <Link href={`/reports/${item.ticker}`} className="mt-auto">
                    <Button variant="secondary" className="w-full">
                      View Full Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}
