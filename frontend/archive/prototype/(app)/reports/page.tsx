import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { BentoCard } from "@/components/ui/bento";
import { getScoreBg, getScoreColor } from "@/lib/utils";

const REPORTS = [
  { ticker: "NVDA", company: "NVIDIA Corporation", date: "2026-06-29", score: 9, verdict: "Strong Buy" },
  { ticker: "AAPL", company: "Apple Inc.", date: "2026-06-28", score: 7, verdict: "Hold" },
  { ticker: "MSFT", company: "Microsoft Corporation", date: "2026-06-25", score: 9, verdict: "Strong Buy" },
  { ticker: "GOOGL", company: "Alphabet Inc.", date: "2026-06-26", score: 8, verdict: "Buy" },
];

export default function ReportsPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-5 h-5 text-[rgb(var(--text-tertiary))]" />
        <div>
          <h1 className="text-headline text-[rgb(var(--text-primary))]">Reports</h1>
          <p className="text-body text-[rgb(var(--text-secondary))]">All generated research reports</p>
        </div>
      </div>
      <div className="space-y-3">
        {REPORTS.map((r) => (
          <BentoCard key={r.ticker} hover className="col-span-full">
            <Link href={`/reports/${r.ticker}`} className="flex items-center justify-between p-5 hover:bg-[rgb(var(--bg-subtle))] transition-colors duration-150">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[rgb(var(--accent-primary))]/10 border border-[rgb(var(--accent-primary))]/20 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-[rgb(var(--accent-primary))]">{r.ticker.slice(0, 2)}</span>
                </div>
                <div>
                  <span className="text-small font-bold text-ticker text-[rgb(var(--text-primary))]">{r.ticker}</span>
                  <p className="text-caption text-[rgb(var(--text-tertiary))]">{r.company} · {r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-small font-semibold ${r.score >= 8 ? "text-emerald-400" : "text-amber-400"}`}>{r.verdict}</span>
                <span className={`text-caption px-2.5 py-1 rounded-lg border ${getScoreBg(r.score)} ${getScoreColor(r.score)}`}>{r.score}/10</span>
                <ArrowRight className="w-4 h-4 text-[rgb(var(--text-tertiary))]" />
              </div>
            </Link>
          </BentoCard>
        ))}
      </div>
    </div>
  );
}
