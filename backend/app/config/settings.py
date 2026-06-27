from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Central application configuration.
    Reads values from the .env file.
    """

    APP_NAME: str = "Verdict API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # API Keys
    TAVILY_API_KEY: str = Field(default="")

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()