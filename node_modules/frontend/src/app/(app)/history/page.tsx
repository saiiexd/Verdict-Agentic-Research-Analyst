import Link from "next/link";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento";
import { getScoreBg, getScoreColor } from "@/lib/utils";

const HISTORY = [
  { ticker: "NVDA", company: "NVIDIA Corporation", date: "2026-06-29", score: 9, verdict: "Strong Buy", sector: "Technology" },
  { ticker: "AAPL", company: "Apple Inc.", date: "2026-06-28", score: 7, verdict: "Hold", sector: "Technology" },
  { ticker: "TSLA", company: "Tesla Inc.", date: "2026-06-27", score: 6, verdict: "Hold", sector: "Consumer Discretionary" },
  { ticker: "GOOGL", company: "Alphabet Inc.", date: "2026-06-26", score: 8, verdict: "Buy", sector: "Communication Services" },
  { ticker: "MSFT", company: "Microsoft Corporation", date: "2026-06-25", score: 9, verdict: "Strong Buy", sector: "Technology" },
  { ticker: "AMZN", company: "Amazon.com Inc.", date: "2026-06-24", score: 8, verdict: "Buy", sector: "Consumer Discretionary" },
];

export default function HistoryPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-headline text-[rgb(var(--text-primary))]">Research History</h1>
          <p className="text-body text-[rgb(var(--text-secondary))] mt-1">
            All previously generated research reports
          </p>
        </div>
        <div className="flex items-center gap-2 text-caption text-[rgb(var(--text-tertiary))]">
          <Clock className="w-3.5 h-3.5" />
          {HISTORY.length} reports
        </div>
      </div>

      <BentoGrid cols={12}>
        {HISTORY.map((item) => (
          <BentoCard key={item.ticker + item.date} span="4" className="col-span-4 p-0 overflow-hidden">
            <Link href={`/reports/${item.ticker}`} className="block p-5 h-full hover:bg-[rgb(var(--bg-subtle))] transition-colors duration-150">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-ticker text-xl font-black text-[rgb(var(--text-primary))]">{item.ticker}</span>
                  <p className="text-caption text-[rgb(var(--text-tertiary))] mt-0.5">{item.company}</p>
                </div>
                <span className={`text-caption font-semibold px-2.5 py-1 rounded-lg border ${getScoreBg(item.score)} ${getScoreColor(item.score)}`}>
                  {item.score}/10
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className={`w-3.5 h-3.5 ${item.score >= 8 ? "text-emerald-400" : "text-amber-400"}`} />
                <span className={`text-small font-semibold ${item.score >= 8 ? "text-emerald-400" : "text-amber-400"}`}>
                  {item.verdict}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="text-caption px-1.5 py-0.5 rounded-sm bg-[rgb(var(--bg-subtle))] text-[rgb(var(--text-tertiary))]">{item.sector}</span>
                </div>
                <div className="flex items-center gap-1 text-caption text-[rgb(var(--accent-primary))]">
                  View
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          </BentoCard>
        ))}
      </BentoGrid>
    </div>
  );
}
