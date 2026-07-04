# Workspace Dashboard & History Architecture

This document details the architectural layout, state synchronization, and filtering schemas governing Verdict's research history management.

---

## 1. Persisted History States (`useAppStore.ts`)

Research runs are automatically cached on the client side using Zustand persistence hooks.
- **`history`**: Array of `HistoryItem` schemas containing dynamic payloads (`ticker`, `timestamp`, `data` from `/research`).
- **`pinnedTickers`**: Array of ticker uppercase strings representing favorited or pinned analysis.
- **`togglePinTicker`**: Local reducer that floats pinned reports to the top of list queries.

---

## 2. Reusable Layout Modules (`HistoryComponents.tsx`)

The dashboard is composed of visual components styled under established monochome/glass definitions:

- **`DashboardOverview`**: Renders dynamic aggregated stats (Run count, average critic validation, bullish recommendation count).
- **`QuickActions`**: Exposes direct routes for starting new research, browsing logs, or clearing cash.
- **`RecentActivity`**: Displays chronological list logs of generated symbols.
- **`ResearchCard` / `ResearchRow`**: Reusable cards housing ticker recommendation tags, metadata timestamps, toggle actions (copy section, pin, delete), and custom hover borders.

---

## 3. Filters, Sorting & Grid-List Controllers

History logs inside `history/page.tsx` coordinate dynamic filters outside direct database pipelines:

- **Search queries**: Text strings matching against both symbol tickers and company names.
- **Outlook categories**: Filters out entries based on rating ranges (Buy, Hold, Sell).
- **Sorting options**:
  - `Newest First` / `Oldest First` (using chronological timestamps)
  - `Ticker A-Z` (alphabetical string comparisons)
  - `Confidence Rating` (critic validation descending scores)

---

## 4. Accessibility and Semantic Landmarking

- **Grid/List Controllers**: Bind descriptive `title` tooltips and `aria-label` tags for screen reader assistants.
- **Dropdown menus**: Style custom options with high color-contrasts matching established Dark/Light variables.
- **Interactive Buttons**: Support tab-indexing and keyboard focus indicators seamlessly.
