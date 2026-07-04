import { FinancialData } from "@/lib/types";
import { formatCurrency, formatLargeNumber, formatPercent } from "@/lib/utils";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { BentoGridItem } from "@/components/layout/bento-grid";
import { DollarSign, TrendingUp, BarChart, Percent, Activity } from "lucide-react";

export function FinancialSummary({ data }: { data: FinancialData }) {
  const metrics = [
    { label: "Current Price", value: data.current_price ? formatCurrency(data.current_price) : "N/A", icon: DollarSign },
    { label: "Market Cap", value: data.market_cap ? `$${formatLargeNumber(data.market_cap)}` : "N/A", icon: Activity },
    { label: "P/E Ratio", value: data.pe_ratio?.toFixed(2) ?? "N/A", icon: BarChart },
    { label: "EPS", value: data.eps ? `$${data.eps.toFixed(2)}` : "N/A", icon: TrendingUp },
    { label: "Revenue Growth", value: data.revenue_growth ? formatPercent(data.revenue_growth * 100) : "N/A", icon: Percent },
    { label: "Dividend Yield", value: data.dividend_yield ? formatPercent(data.dividend_yield * 100) : "N/A", icon: Percent },
  ];

  return (
    <BentoGridItem colSpan={{ md: 6, lg: 12 }} className="bg-[rgb(var(--bg-elevated))]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <CardTitle className="text-xl mb-1">{data.company_name || data.ticker}</CardTitle>
          <CardDescription>Sector: {data.sector || "Unknown"} • Industry: {data.industry || "Unknown"}</CardDescription>
        </div>
        <div className="text-right">
          <div className="text-display text-2xl tracking-tight">{data.current_price ? formatCurrency(data.current_price) : "N/A"}</div>
          {data.analyst_recommendation && (
            <div className="text-sm font-medium text-[rgb(var(--accent-secondary))] uppercase tracking-wider mt-1">
              {data.analyst_recommendation}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 border-t border-[rgb(var(--border-default))] pt-6 mt-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[rgb(var(--text-secondary))] mb-1">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-xs uppercase tracking-wider font-semibold">{m.label}</span>
              </div>
              <span className="text-lg font-bold tabular-nums">{m.value}</span>
            </div>
          );
        })}
      </div>
    </BentoGridItem>
  );
}
