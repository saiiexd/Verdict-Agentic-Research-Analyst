# Project Structure

Verdict's workspace layout:

```
Verdict-Agentic-Research-Analyst/
├── backend/                  # Python FastAPI/LangGraph Server
│   ├── app/
│   │   ├── api/              # Route endpoints (/research)
│   │   ├── workflow/         # LangGraph agents & state models
│   │   └── services/         # Scrapers (yfinance, tavily)
│   └── requirements.txt
│
├── frontend/                 # Next.js / TypeScript Workspace
│   ├── src/
│   │   ├── app/              # App router (dashboard, settings, reports)
│   │   ├── components/       # Reusable React widgets
│   │   ├── store/            # Zustand global state slices
│   │   └── hooks/            # API call modules (useResearch)
│   └── package.json
│
└── docs/                     # Engineering & Architecture Guidelines
```
