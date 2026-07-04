"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/research/CommandPalette";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const router = useRouter();

  useEffect(() => {
    let sequence = "";
    const onKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.tagName === "SELECT")) {
        return;
      }
      
      sequence += e.key.toLowerCase();
      if (sequence.length > 4) {
        sequence = sequence.slice(-4);
      }

      if (sequence.endsWith("gd")) {
        router.push("/dashboard");
        sequence = "";
      } else if (sequence.endsWith("gh")) {
        router.push("/history");
        sequence = "";
      } else if (sequence.endsWith("gs")) {
        router.push("/settings");
        sequence = "";
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-base))]">
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300 flex flex-col min-h-screen",
          sidebarOpen ? "pl-64" : "pl-16"
        )}
      >
        <Topbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <CommandPalette />
    </div>
  );
}
