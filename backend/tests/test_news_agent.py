<<<<<<< HEAD
=======
from unittest.mock import MagicMock
>>>>>>> bc7f3ac (Continue Verdict v1.0 development)
from app.agents.news_agent import NewsAgent
from app.tools.google_news import GoogleNewsTool
from app.tools.tavily_search import TavilyTool

def test_news_agent():
<<<<<<< HEAD
    agent = NewsAgent(google_tool=GoogleNewsTool(), tavily_tool=TavilyTool())
=======
    google_mock = MagicMock(spec=GoogleNewsTool)
    tavily_mock = MagicMock(spec=TavilyTool)
    
    agent = NewsAgent(google_tool=google_mock, tavily_tool=tavily_mock)
    
    # Mock the analyze method itself if we don't want to test its internal API calls,
    # or mock the search methods of the tools.
    google_mock.search.return_value = []
    tavily_mock.search.return_value = []
    
>>>>>>> bc7f3ac (Continue Verdict v1.0 development)
    articles = agent.analyze("NVIDIA")
    assert isinstance(articles, list)