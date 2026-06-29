# API Documentation

This document describes the public interface exposed by the FastAPI application.

## Endpoints

### 1. Root Application Health
- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Verifies that the FastAPI application is alive and accepting requests.
- **Response** (200 OK):
  ```json
  {
      "message": "Verdict Backend Running"
  }
  ```

---

### 2. Initiate Equity Research
- **Endpoint**: `/research`
- **Method**: `POST`
- **Description**: Triggers the LangGraph multi-agent workflow to collect data and generate a research report for the requested stock ticker.

#### Request Schema
**`ResearchRequest`**
- `ticker` (str, required): The stock symbol to analyze (e.g., "AAPL", "NVDA").

**Example Payload**:
```json
{
    "ticker": "AAPL"
}
```

#### Response Schema
**`ApiResponse`**
- `success` (bool): Indicates if the operation completed without fatal errors.
- `message` (str): Contextual system message.
- `data` (dict): The final resolved state of the `ResearchState` graph dict.

**Example Response (200 OK)**:
```json
{
    "success": true,
    "message": "Research completed successfully.",
    "data": {
        "ticker": "AAPL",
        "financial_data": {
            "current_price": 150.0,
            "market_cap": ...
        },
        "news": [...],
        "report": "### Apple Inc. Equity Research\n..."
    }
}
```

#### Error Handling

- **404 Not Found**: Thrown when the `YahooFinanceTool` explicitly validates that the ticker does not exist.
  ```json
  {
      "detail": "Ticker 'INVALID' was not found."
  }
  ```

- **500 Internal Server Error**: A graceful catch-all when unhandled API outages or parsing failures occur within the tool integrations or LLM generation.
  ```json
  {
      "detail": "An internal server error occurred during research."
  }
  ```
