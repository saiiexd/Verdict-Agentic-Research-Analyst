from unittest.mock import MagicMock
from app.agents.news_agent import NewsAgent
from app.tools.google_news import GoogleNewsTool
from app.tools.tavily_search import TavilyTool

def test_news_agent():
    google_mock = MagicMock(spec=GoogleNewsTool)
    tavily_mock = MagicMock(spec=TavilyTool)
    
    agent = NewsAgent(google_tool=google_mock, tavily_tool=tavily_mock)
    
    # Mock the search methods of the tools.
    google_mock.search.return_value = []
    tavily_mock.search.return_value = []
    
    articles = agent.analyze("NVIDIA")
    assert isinstance(articles, list)