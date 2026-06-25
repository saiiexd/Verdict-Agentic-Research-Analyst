from pprint import pprint

from app.agents.financial_agent import FinancialAgent

agent = FinancialAgent()

result = agent.analyze("NVDA")

pprint(result)