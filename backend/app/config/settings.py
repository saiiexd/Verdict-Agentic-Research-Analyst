from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Central application configuration.
    """

    APP_NAME: str = "Verdict API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # CORS Configuration
    ALLOWED_ORIGINS: str = "*"

    # Search
    TAVILY_API_KEY: str = ""

    # LLM
    LLM_PROVIDER: str = "gemini"
    LLM_MODEL: str = "gemini-2.5-pro"
    LLM_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()