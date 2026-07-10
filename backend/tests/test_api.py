from fastapi.testclient import TestClient
from app.main import app
from app.exceptions.research import InvalidTickerException

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_research_endpoint_invalid_ticker(monkeypatch):
    # Mock get_company_info to simulate early validation failure
    def mock_get_company_info(self, ticker: str):
        raise InvalidTickerException(f"Ticker '{ticker}' was not found.")

    monkeypatch.setattr("app.tools.yahoo_finance.YahooFinanceTool.get_company_info", mock_get_company_info)

    response = client.post("/research", json={"ticker": "INVALID_TICKER_THAT_DOES_NOT_EXIST"})
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()
