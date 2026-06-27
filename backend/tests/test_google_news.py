from pprint import pprint

from app.tools.google_news import GoogleNewsTool

tool = GoogleNewsTool()

articles = tool.search("NVIDIA")

pprint(articles[:3])