import { Metadata } from "next";

type Props = {
  params: Promise<{ ticker: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const ticker = resolvedParams.ticker.toUpperCase();
  
  return {
    title: `${ticker} Investment Verdict | AI Research`,
    description: `Comprehensive AI-generated equity research report for ${ticker}, including financial analysis, news sentiment, and investment recommendations.`,
    openGraph: {
      title: `${ticker} AI Equity Research | Verdict`,
      description: `Read the latest AI-synthesized investment verdict for ${ticker}.`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${ticker} Investment Verdict`,
    },
  };
}

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
