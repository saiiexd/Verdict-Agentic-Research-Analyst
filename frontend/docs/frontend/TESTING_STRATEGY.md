# Testing Strategy

This document outlines the testing philosophy, unit coverage, and automated integration validation procedures for Verdict.

---

## 1. Testing Layers

### Unit Testing
Focuses on pure utility validation and presentation-only components:
- Verification of parsing tools (e.g. date formatters).
- Mocking React hooks (e.g. `useResearch` status triggers).
- Standard UI widgets (e.g. rendering specific sentiment distributions based on mock parameters).

### Integration Testing
Validates interaction lifecycles across components:
- Submitting a query from `CommandSearch` and validating store state transitions from `Submitting` to `Running` to `Completed`.
- Confirming settings panel changes (like density adjustments) apply classes to layout wrappers correctly.

### E2E Testing
Simulates actual user behavior:
- Launching the app, searching for a ticker, checking that the report sections load, exporting markdown, and returning to the dashboard.

---

## 2. Mocking Backend Responses

Since backend tasks rely on external agent pipelines, integration tests should mock backend HTTP responses:
```typescript
const mockResearchResponse = {
  ticker: "AAPL",
  financial_data: { company_name: "Apple Inc.", current_price: 180.25 },
  final_report: { company_overview: "Apple designs consumer electronics..." }
};
```
This isolates frontend code validation from backend availability.
