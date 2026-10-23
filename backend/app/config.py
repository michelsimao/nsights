from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configuração lida do ambiente (ou de um `.env` local, se existir)."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_env: str = "development"
    database_url: str = "postgresql+psycopg://riskops:riskops@localhost:5433/riskops"
    jwt_secret: str = "dev-only-change-me"
    jwt_expire_minutes: int = 480
    # Lista separada por vírgula: "http://localhost:5173,http://127.0.0.1:5173"
    cors_origins: str = "http://localhost:5173"
    log_level: str = "INFO"
    # Senha dos usuários demo criados pelo seed (só na criação; o seed nunca a redefine).
    seed_demo_password: str = "riskops123"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
