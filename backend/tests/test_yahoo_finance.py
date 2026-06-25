from app.tools.yahoo_finance import YahooFinanceTool


tool = YahooFinanceTool()

info = tool.get_company_info("NVDA")

print(info["longName"])
print(info["sector"])
print(info["marketCap"])