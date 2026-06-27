from pprint import pprint

from app.tools.tavily_search import TavilyTool


tool = TavilyTool()

articles = tool.search("NVIDIA")

pprint(articles)