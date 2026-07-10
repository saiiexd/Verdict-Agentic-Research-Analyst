from app.config.settings import Settings


def test_settings_default_tavily_key_is_empty_string():
    settings = Settings(
        _env_file=None, # type: ignore
        TAVILY_API_KEY="dummy",
        LLM_PROVIDER="openrouter",
        LLM_MODEL="dummy-model",
        LLM_API_KEY="dummy-key"
    )

    assert settings.TAVILY_API_KEY == "dummy"
