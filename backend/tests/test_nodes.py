from unittest.mock import patch, MagicMock
from app.graph.nodes import (
    financial_node,
    news_node,
    research_node,
    writer_node,
    critic_node,
    refiner_node
)
from app.graph.state import ResearchState

def get_base_state() -> ResearchState:
    return {
        "ticker": "AAPL",
        "financial_data": None,
        "news": [],
        "news_count": 0,
        "research_ready": False,
        "report": None,
        "critic_report": None,
        "final_report": None,
        "citations": []
    }

@patch("app.graph.nodes.get_financial_agent")
def test_financial_node(mock_get_agent):
    mock_agent = MagicMock()
    from app.schemas.financial import FinancialData
    dummy_data = FinancialData(ticker="AAPL")
    mock_agent.analyze.return_value = dummy_data
    mock_get_agent.return_value = mock_agent
    
    state = get_base_state()
    result = financial_node(state)
    assert result == {"financial_data": dummy_data}

@patch("app.graph.nodes.get_news_agent")
def test_news_node(mock_get_agent):
    mock_agent = MagicMock()
    from app.schemas.news import NewsArticle
    dummy_news = NewsArticle(title="news1", url="http", provider="test")
    mock_agent.analyze.return_value = [dummy_news]
    mock_get_agent.return_value = mock_agent
    
    state = get_base_state()
    result = news_node(state)
    assert result["news"] is not None
    assert len(result["news"]) == 1
    assert result["news"][0].title == "news1"

def test_research_node_ready():
    state = get_base_state()
    from app.schemas.financial import FinancialData
    from app.schemas.news import NewsArticle
    state["financial_data"] = FinancialData(ticker="AAPL")
    state["news"] = [NewsArticle(title="news1", url="http", provider="test")]
    
    result = research_node(state)
    assert result["research_ready"] is True
    assert result["news_count"] == 1

def test_research_node_not_ready():
    state = get_base_state()
    result = research_node(state)
    assert result["research_ready"] is False

@patch("app.graph.nodes.get_writer_agent")
def test_writer_node(mock_get_agent):
    mock_agent = MagicMock()
    
    from app.schemas.report import ResearchReport
    mock_report = ResearchReport(
        company_overview="mock report",
        financial_analysis="",
        recent_news_summary="",
        opportunities="",
        risks="",
        investment_outlook=""
    )
            
    mock_agent.analyze.return_value = mock_report
    mock_get_agent.return_value = mock_agent
    
    state = get_base_state()
    state["research_ready"] = True
    result = writer_node(state)
    assert result["report"] is not None
    assert result["report"].company_overview == "mock report"

@patch("app.graph.nodes.get_critic_agent")
def test_critic_node(mock_get_agent):
    mock_agent = MagicMock()
    
    from app.schemas.critic import CriticReport
    mock_critic = CriticReport(
        overall_score=8,
        strengths=[],
        weaknesses=[],
        hallucination_risk="",
        recommendation=""
    )
            
    mock_agent.analyze.return_value = mock_critic
    mock_get_agent.return_value = mock_agent
    
    state = get_base_state()
    from app.schemas.report import ResearchReport
    state["report"] = ResearchReport(company_overview="", financial_analysis="", recent_news_summary="", opportunities="", risks="", investment_outlook="")
    result = critic_node(state)
    assert result["critic_report"] is not None
    assert result["critic_report"].overall_score == 8

@patch("app.graph.nodes.get_refiner_agent")
def test_refiner_node(mock_get_agent):
    mock_agent = MagicMock()
    
    from app.schemas.report import ResearchReport
    mock_final = ResearchReport(
        company_overview="final",
        financial_analysis="",
        recent_news_summary="",
        opportunities="",
        risks="",
        investment_outlook=""
    )
            
    mock_agent.analyze.return_value = mock_final
    mock_get_agent.return_value = mock_agent
    
    state = get_base_state()
    from app.schemas.report import ResearchReport
    from app.schemas.critic import CriticReport
    state["report"] = ResearchReport(company_overview="", financial_analysis="", recent_news_summary="", opportunities="", risks="", investment_outlook="")
    state["critic_report"] = CriticReport(overall_score=8, strengths=[], weaknesses=[], hallucination_risk="", recommendation="")
    result = refiner_node(state)
    assert result["final_report"] is not None
    assert result["final_report"].company_overview == "final"
