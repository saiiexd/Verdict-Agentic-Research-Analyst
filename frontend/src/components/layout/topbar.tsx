"use client";

import * as React from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAppStore } from "@/store/useAppStore";
import { WorkspaceBreadcrumbs } from "./WorkspaceBreadcrumbs";

export function Topbar() {
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const toggleCommandPalette = useAppStore((state) => state.toggleCommandPalette);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))]/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <WorkspaceBreadcrumbs />
      </div>

      <div className="flex items-center gap-3">
        {/* Search trigger button for Command Palette */}
        <button 
          onClick={toggleCommandPalette}
          className="h-8 px-2.5 rounded-lg border border-[rgb(var(--border-default))] hover:border-[rgb(var(--text-tertiary))] bg-[rgb(var(--bg-elevated))] hover:bg-[rgb(var(--bg-subtle))] text-[rgb(var(--text-tertiary))] text-[10px] font-semibold flex items-center gap-2 transition-all cursor-pointer select-none"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Search workspace...</span>
          <kbd className="px-1 py-0.5 rounded border border-[rgb(var(--border-default))]/60 bg-[rgb(var(--bg-surface))] text-[8px] font-mono text-[rgb(var(--text-tertiary))] shadow-sm">
            ⌘K
          </kbd>
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
}
