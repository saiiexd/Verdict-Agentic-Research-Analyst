# Known Limitations

This document identifies operational constraints recognized in Verdict V1.0.

---

## 1. Local Caching
If users switch browsers or clear their local cache, watchlists and history logs will be lost since data is not synchronized to a centralized database.

## 2. API Rate Limiting
Yahoo Finance APIs and Tavily integrations are subject to upstream rate-limiting restrictions. High-velocity searches may occasionally trigger timeout fallbacks.

## 3. UI Chart Extensibility
Recharts provides excellent sentiment metrics and single-point valuation models; however, complex multi-year interactive candlestick patterns are beyond the bounds of the V1.0 dashboard.
