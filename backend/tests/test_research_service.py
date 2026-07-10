from unittest.mock import patch
from app.services.research_service import ResearchService

@patch("app.services.research_service.YahooFinanceTool")
@patch("app.services.research_service.graph.invoke")
def test_research_service(mock_invoke, mock_yahoo):
    service = ResearchService()
    
    mock_yahoo_instance = mock_yahoo.return_value
    mock_yahoo_instance.get_company_info.return_value = {}
    
    mock_invoke.return_value = {
        "ticker": "AAPL",
        "financial_data": {},
        "news": [],
        "news_count": 0,
        "research_ready": True,
        "report": "Mock Draft",
        "critic_report": "Mock Critic",
        "final_report": "Mock Final",
        "citations": []
    }
    
    result = service.start_research("AAPL")
    
    assert result["ticker"] == "AAPL"
    assert result["draft_report"] == "Mock Draft"
    assert result["final_report"] == "Mock Final"
    mock_invoke.assert_called_once()
