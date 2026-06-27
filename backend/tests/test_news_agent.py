from app.agents.news_agent import NewsAgent
from app.tools.google_news import GoogleNewsTool
from app.tools.tavily_search import TavilyTool

def test_news_agent():
    agent = NewsAgent(google_tool=GoogleNewsTool(), tavily_tool=TavilyTool())
    articles = agent.analyze("NVIDIA")
    assert isinstance(articles, list)