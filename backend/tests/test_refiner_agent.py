from unittest.mock import MagicMock
from app.agents.refiner_agent import RefinerAgent
from app.schemas.report import ResearchReport
from app.schemas.critic import CriticReport

def test_refiner_agent_analyze():
    mock_provider = MagicMock()
    
    expected_report = ResearchReport(
        company_overview="Apple Inc. Refined",
        financial_analysis="Strong",
        recent_news_summary="New iPhone",
        opportunities="Growth in services",
        risks="Competition",
        investment_outlook="Buy"
    )
    
    mock_provider.invoke_structured.return_value = expected_report
    
    agent = RefinerAgent(provider=mock_provider)
    
    input_report = ResearchReport(
        company_overview="Apple Inc.",
        financial_analysis="Strong",
        recent_news_summary="New iPhone",
        opportunities="Growth in services",
        risks="Competition",
        investment_outlook="Buy"
    )
    
    feedback = CriticReport(
        overall_score=8,
        strengths=["Good financials"],
        weaknesses=["Needs more news"],
        hallucination_risk="Low",
        recommendation="Add more recent news"
    )
    
    result = agent.analyze(input_report, feedback)
    
    assert result == expected_report
    mock_provider.invoke_structured.assert_called_once()
