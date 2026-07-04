import { NewsArticle } from "@/lib/types";
import { BentoGridItem } from "@/components/layout/bento-grid";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function NewsAnalysis({ news }: { news: NewsArticle[] }) {
  if (!news || news.length === 0) return null;

  // Take top 4 for the bento grid
  const topNews = news.slice(0, 4);

  return (
    <BentoGridItem colSpan={{ md: 6, lg: 4 }} className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-md bg-violet-500/10 flex items-center justify-center">
          <Globe className="h-4 w-4 text-violet-500" />
        </div>
        <div>
          <CardTitle>Market News</CardTitle>
          <CardDescription>Recent headlines & sentiment</CardDescription>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {topNews.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="p-3 rounded-lg border border-transparent hover:border-[rgb(var(--border-default))] hover:bg-[rgb(var(--bg-elevated))] transition-colors">
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <span className="text-xs font-medium text-[rgb(var(--text-tertiary))] line-clamp-1">{article.source || "News Source"}</span>
                {article.sentiment && (
                  <Badge variant={
                    article.sentiment.toLowerCase().includes("bullish") || article.sentiment.toLowerCase().includes("positive") ? "success" :
                    article.sentiment.toLowerCase().includes("bearish") || article.sentiment.toLowerCase().includes("negative") ? "destructive" :
                    "secondary"
                  } className="text-[10px] px-1.5 py-0">
                    {article.sentiment}
                  </Badge>
                )}
              </div>
              <h4 className="text-sm font-semibold text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--accent-primary))] transition-colors line-clamp-2">
                {article.title}
                <ArrowUpRight className="inline-block w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              {article.published_at && (
                <div className="text-[10px] text-[rgb(var(--text-tertiary))] mt-1">
                  {new Date(article.published_at).toLocaleDateString()}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </BentoGridItem>
  );
}
