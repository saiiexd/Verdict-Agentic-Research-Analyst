from pprint import pprint

from app.agents.news_agent import NewsAgent

agent = NewsAgent()

articles = agent.analyze("NVIDIA")

print(f"\nTotal Articles: {len(articles)}\n")

pprint(articles[:5])