import { CriticReport } from "@/lib/types";
import { BentoGridItem } from "@/components/layout/bento-grid";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function CriticScore({ report }: { report: CriticReport }) {
  if (!report) return null;

  const score = report.overall_score;
  const isHigh = score >= 8;
  const isMed = score >= 5 && score < 8;
  
  const StatusIcon = isHigh ? ShieldCheck : isMed ? Shield : ShieldAlert;
  const statusColor = isHigh ? "text-emerald-500" : isMed ? "text-amber-500" : "text-red-500";
  const bgBadge = isHigh ? "bg-emerald-500/10 border-emerald-500/20" : isMed ? "bg-amber-500/10 border-amber-500/20" : "bg-red-500/10 border-red-500/20";

  return (
    <BentoGridItem colSpan={{ md: 6, lg: 8 }} className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className={cn("h-8 w-8 rounded-md flex items-center justify-center border", bgBadge)}>
            <StatusIcon className={cn("h-4 w-4", statusColor)} />
          </div>
          <div>
            <CardTitle>Critic Evaluation</CardTitle>
            <CardDescription>AI Bias & Quality check</CardDescription>
          </div>
        </div>
        <div className={cn("text-3xl font-bold tabular-nums tracking-tighter", statusColor)}>
          {score}<span className="text-sm font-medium text-[rgb(var(--text-tertiary))]">/10</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 flex-1">
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5 text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Strengths
          </h4>
          <ul className="space-y-2">
            {report.strengths?.map((s, i) => (
              <li key={i} className="text-sm text-[rgb(var(--text-secondary))] leading-snug">• {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5 text-amber-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Weaknesses
          </h4>
          <ul className="space-y-2">
            {report.weaknesses?.map((s, i) => (
              <li key={i} className="text-sm text-[rgb(var(--text-secondary))] leading-snug">• {s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[rgb(var(--bg-elevated))] rounded-lg p-4 border border-[rgb(var(--border-default))] mt-auto">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-[rgb(var(--text-secondary))] flex-shrink-0" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--text-secondary))] block mb-1">
              Hallucination Risk
            </span>
            <p className="text-sm text-[rgb(var(--text-primary))]">{report.hallucination_risk}</p>
          </div>
        </div>
      </div>
    </BentoGridItem>
  );
}
