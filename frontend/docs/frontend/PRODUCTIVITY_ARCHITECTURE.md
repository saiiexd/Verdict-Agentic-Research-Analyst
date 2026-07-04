# Productivity & Command Palette Architecture

This document describes the design patterns, keyboard interactions, registry schemas, and search indexing parameters governing Verdict's universal command palette and breadcrumb navigation.

---

## 1. Universal Command Palette (`CommandPalette.tsx`)

The Command Palette serves as the workspace-wide execution modal. It is bound globally to `Ctrl+K` / `Cmd+K` keyboard shortcuts:

- **Elegantly Eased Modal**: Uses Framer Motion scales and opacity transitions. Uses background blurs and high contrast border parameters.
- **Dynamic Command Registry**: Commands are registered as a structured index array. It aggregates:
  - System commands: new analysis start, toggle visual animations.
  - Page routes: dashboard, history, settings panel.
  - Active research runs: extracts history reports and lists them as shortcuts.
  - Active watchlists: appends watchlists as navigation shortcuts.
- **Keyboard navigation**:
  - `ArrowDown` / `ArrowUp` to shift selections.
  - `Enter` to confirm/execute active command actions.
  - `Escape` or backdrop click to dismiss.

---

## 2. Categorized Search & Filtering

Search lists match query strings against both item names and metadata descriptions, grouped semantically:
- **Commands**: Core execution actions.
- **Navigation**: Workspace view shortcuts.
- **History Reports**: Cache of generated company analyses.
- **Watchlist**: Tracked company shortcuts.

---

## 3. Workspace Breadcrumbs (`WorkspaceBreadcrumbs.tsx`)

A breadcrumb indicator is mounted on the topbar. It parses URL pathnames dynamically:
- Skips grouping segments (e.g. dynamic layout tokens).
- Translates routes to readable titles (e.g. `/dashboard` -> `Workspace > Dashboard`).
- Capitalizes tickers in report routes (e.g. `/reports/aapl` -> `Workspace > Reports > AAPL`).
- Keeps focus clean, lightweight, and typography-aligned.
