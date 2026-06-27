from app.config.settings import Settings


def test_settings_default_tavily_key_is_empty_string():
    settings = Settings(_env_file=None)

    assert settings.TAVILY_API_KEY == ""
