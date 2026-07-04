"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function WorkspaceBreadcrumbs() {
  const pathname = usePathname();

  const paths = React.useMemo(() => {
    if (!pathname) return [{ label: "Workspace", href: "/" }];

    const segments = pathname.split("/").filter(Boolean);
    const crumbs = [{ label: "Workspace", href: "/" }];

    segments.forEach((seg, index) => {
      // Skip grouping/layout folders if represented in route pathnames
      if (seg === "(app)" || seg === "app") return;

      const href = "/" + segments.slice(0, index + 1).join("/");
      
      let label = seg.charAt(0).toUpperCase() + seg.slice(1);
      if (seg === "dashboard") label = "Dashboard";
      if (seg === "history") label = "Research History";
      if (seg === "settings") label = "Settings Panel";
      if (seg === "reports") label = "Reports";
      
      // If it's a ticker code
      if (seg.length <= 5 && seg === seg.toUpperCase()) {
        label = seg;
      } else if (index === segments.length - 1 && segments[index - 1] === "reports") {
        label = seg.toUpperCase();
      }

      crumbs.push({ label, href });
    });

    return crumbs;
  }, [pathname]);

  return (
    <nav className="flex items-center gap-1.5 text-[10px] font-semibold text-[rgb(var(--text-tertiary))] select-none">
      {paths.map((crumb, idx) => {
        const isLast = idx === paths.length - 1;
        return (
          <div key={idx} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight className="h-3 w-3 text-[rgb(var(--border-strong))]" />}
            {isLast ? (
              <span className="text-[rgb(var(--text-secondary))] font-bold">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-[rgb(var(--text-secondary))] transition-colors">
                {crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
