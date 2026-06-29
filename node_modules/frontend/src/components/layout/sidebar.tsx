"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Clock,
  Home,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/research", label: "Research", icon: Sparkles },
  { href: "/history", label: "History", icon: Clock },
  { href: "/reports", label: "Reports", icon: BookOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full w-[220px] z-40",
        "flex flex-col gap-1",
        "bg-[rgb(var(--bg-surface))]",
        "border-r border-[rgb(var(--border-default))]",
        "py-6"
      )}
    >
      {/* Logo */}
      <div className="px-5 mb-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[rgb(var(--accent-primary))] flex items-center justify-center shadow-glow-accent">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[15px] tracking-tight text-[rgb(var(--text-primary))]">
            Verdict
          </span>
          <span className="text-[10px] font-semibold text-[rgb(var(--accent-primary))] bg-[rgb(var(--accent-primary))]/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
            AI
          </span>
        </Link>
      </div>

      {/* Nav section label */}
      <p className="px-5 text-label text-[rgb(var(--text-tertiary))] mb-1">Workspace</p>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                "text-[13.5px] font-medium",
                "transition-all duration-150",
                isActive
                  ? [
                      "bg-[rgb(var(--accent-primary))]/10",
                      "text-[rgb(var(--accent-primary))]",
                    ]
                  : [
                      "text-[rgb(var(--text-secondary))]",
                      "hover:bg-[rgb(var(--bg-subtle))]",
                      "hover:text-[rgb(var(--text-primary))]",
                    ]
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0 transition-all duration-150",
                  isActive ? "text-[rgb(var(--accent-primary))]" : "text-[rgb(var(--text-tertiary))]"
                )}
              />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[rgb(var(--accent-primary))]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 space-y-0.5 border-t border-[rgb(var(--border-default))] pt-3 mt-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg",
            "text-[13.5px] font-medium",
            "text-[rgb(var(--text-secondary))]",
            "hover:bg-[rgb(var(--bg-subtle))] hover:text-[rgb(var(--text-primary))]",
            "transition-all duration-150"
          )}
        >
          <Settings className="w-4 h-4 text-[rgb(var(--text-tertiary))]" />
          Settings
        </Link>

        <div className="px-3 py-2 flex items-center justify-between">
          <span className="text-caption text-[rgb(var(--text-tertiary))]">Appearance</span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
