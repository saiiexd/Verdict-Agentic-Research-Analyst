"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

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
    </div>
  );
}
