# API Documentation

## Endpoints

### 1. Health Check
`GET /`

**Response:**
```json
{
    "message": "Verdict Backend Running"
}
```

### 2. Generate Research Report
`POST /research`

Triggers the full LangGraph asynchronous research workflow for the specified ticker.

**Request Schema (`ResearchRequest`):**
```json
{
    "ticker": "AAPL"
}
```

**Response Schema (`ApiResponse`):**
```json
{
    "success": true,
    "message": "Research completed successfully.",
    "data": {
        "ticker": "AAPL",
        "financial_data": {
            "company_name": "Apple Inc.",
            "current_price": 185.00,
            "pe_ratio": 29.5,
            "...": "..."
        },
        "news": [
            {
                "title": "Apple announces new chips",
                "url": "https://example.com/news",
                "provider": "google_rss"
            }
        ],
        "draft_report": {
            "company_overview": "...",
            "financial_analysis": "..."
        },
        "critic_report": {
            "overall_score": 8,
            "recommendation": "..."
        },
        "final_report": {
            "company_overview": "...",
            "financial_analysis": "..."
        }
    }
}
```

**Status Codes:**
- `200 OK`: Workflow completed.
- `404 Not Found`: Ticker is invalid or not found.
- `500 Internal Server Error`: An unexpected failure occurred during processing.
