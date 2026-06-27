from app.llm.provider import LLMProvider

llm = LLMProvider().get_llm()

response = llm.invoke(
    "Say hello in one sentence."
)

print(response.content)
