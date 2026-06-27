from app.llm.factory import LLMFactory

def test_llm_provider():
    llm = LLMFactory.get_provider().get_llm()
    assert llm is not None
