"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Search, 
  History, 
  Settings, 
  Sparkles 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

const navItems = [
  { name: "Workspace", href: "/", icon: Search },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "History", href: "/history", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[rgb(var(--border-default))] bg-[rgb(var(--bg-surface))] transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-14 items-center justify-center border-b border-[rgb(var(--border-default))]">
        <Link href="/" className="flex items-center gap-2 overflow-hidden px-4">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--accent-primary))] text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span
            className={cn(
              "font-bold text-[15px] tracking-tight text-[rgb(var(--text-primary))] transition-opacity duration-300",
              sidebarOpen ? "opacity-100" : "opacity-0 hidden"
            )}
          >
            Verdict
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 p-2 mt-4">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-primary))] shadow-sm border border-[rgb(var(--border-default))]"
                  : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-subtle))] hover:text-[rgb(var(--text-primary))]",
                !sidebarOpen && "justify-center px-0"
              )}
              title={!sidebarOpen ? item.name : undefined}
            >
              <Icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-[rgb(var(--accent-primary))]")} />
              <span
                className={cn(
                  "transition-opacity duration-300",
                  sidebarOpen ? "opacity-100" : "opacity-0 hidden"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
      
      <div className={cn("p-4 border-t border-[rgb(var(--border-default))]", !sidebarOpen && "text-center")}>
        <div className="text-xs text-[rgb(var(--text-tertiary))] truncate">
          {sidebarOpen ? "Verdict AI v1.0" : "v1.0"}
        </div>
      </div>
    </aside>
  );
}
