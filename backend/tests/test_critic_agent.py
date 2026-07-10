from unittest.mock import MagicMock
from app.agents.critic_agent import CriticAgent
from app.schemas.report import ResearchReport
from app.schemas.critic import CriticReport

def test_critic_agent_analyze():
    mock_provider = MagicMock()
    
    mock_report = CriticReport(
        overall_score=8,
        strengths=["Good financials"],
        weaknesses=["Needs more news"],
        hallucination_risk="Low",
        recommendation="Add more recent news"
    )
    
    mock_provider.invoke_structured.return_value = mock_report
    
    agent = CriticAgent(provider=mock_provider)
    
    input_report = ResearchReport(
        company_overview="Apple Inc.",
        financial_analysis="Strong",
        recent_news_summary="New iPhone",
        opportunities="Growth in services",
        risks="Competition",
        investment_outlook="Buy"
    )
    
    result = agent.analyze(input_report)
    
    assert result == mock_report
    mock_provider.invoke_structured.assert_called_once()
