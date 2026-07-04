import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://verdict.ai"),
  title: {
    default: "Verdict – AI-Powered Equity Research",
    template: "%s | Verdict",
  },
  description:
    "Verdict is an AI-native equity research platform that synthesizes financial data, news, and analyst intelligence into premium investment research reports.",
  keywords: ["equity research", "AI", "stock analysis", "investment", "LangGraph", "financial data", "quant"],
  authors: [{ name: "Verdict AI Labs" }],
  openGraph: {
    title: "Verdict – AI-Powered Equity Research",
    description: "Premium AI-native investment research, powered by multi-agent intelligence.",
    url: "https://verdict.ai",
    siteName: "Verdict",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verdict – AI-Powered Equity Research",
    description: "Premium AI-native investment research, powered by multi-agent intelligence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
