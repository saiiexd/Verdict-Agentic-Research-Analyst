# Report Experience & Interactive Layout Architecture

This document details the final layout structure, rendering logic, interactive workflows, and performance optimization details of Verdict's Report Panel experience.

---

## 1. Unified Interface Flow

The report page is engineered to present automated financial findings in an editorial-quality, distraction-free environment:

```
+----------------------------------------------------------------+
|  [Pulsing complete dot] Ticker Header                          |
|  ------------------------------------------------------------- |
|  [Focus Mode Toggle] [Copy Summary] [Export MD] [Print]        |
|  ------------------------------------------------------------- |
|  Metadata panel: status, core model version, audit details     |
|  ============================================================= |
|  [Executive Summary] (Large comfortable typography)            |
|  ------------------------------------------------------------- |
|  [Thesis Card] AI recommendation score, horizon, sentiment    |
|  ------------------------------------------------------------- |
|  [Financial Analysis] Metric grids, active category indicators  |
|  ------------------------------------------------------------- |
|  [Analytics Dashboard] Sentiment charts, confidence gauges     |
|  ------------------------------------------------------------- |
|  [News Intelligence] and [Citations Explorer] expanded cards   |
|  ------------------------------------------------------------- |
|  Report footer: Audit ID, disclosures, citation counts         |
+----------------------------------------------------------------+
```

---

## 2. Interactive Features & State Management

- **`Reading Mode` (Focus Mode)**: Handled globally through Zustand. Hides the agent pipeline sidebar, command search input, and global workspace headers to expand the report content block into a single column (`max-w-2xl mx-auto`), reducing eye strain and visual distraction.
- **Contextual Section Actions**: Hovering over headers reveals actions to `Copy Section` (copies localized text summary) and `Bookmark Section` (toggles local bookmarked state).
- **Keyword Search**: Highlights query terms instantly across all visible paragraphs using a dynamic RegExp highlight component.
- **Reading Progress Bar**: A thin, responsive progress bar is fixed to the top of the container, tracking window scroll position in real-time.
- **Citations Detail Drawers**: Citation cards expand and collapse detail drawers smoothly on click using height-eased framer-motion transitions.

---

## 3. High-Contrast Monochrome Design & Accessibility

- **Semantic landmarks**: Sections use structural `<section>` tags and appropriate `aria-expanded` and `aria-controls` properties for assistive reading.
- **High-contrast ratios**: All text categories adhere to minimum AAA contrast ratios for accessibility.
- **Reduced motion settings**: Easing vectors are restrained to fast, linear parameters to prevent user fatigue.
