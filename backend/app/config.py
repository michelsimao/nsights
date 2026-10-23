from functools import lru_cache

from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configuração lida do ambiente (ou de um `.env` local, se existir)."""

    # hide_input_in_errors: um erro de validação não pode imprimir segredos no log.
    model_config = SettingsConfigDict(env_file=".env", extra="ignore", hide_input_in_errors=True)

    app_env: str = "development"
    database_url: str = "postgresql+psycopg://riskops:riskops@localhost:5433/riskops"
    jwt_secret: str = "dev-only-insecure-secret-change-me-in-prod"
    jwt_expire_minutes: int = 480
    # Lista separada por vírgula: "http://localhost:5173,http://127.0.0.1:5173"
    cors_origins: str = "http://localhost:5173"
    log_level: str = "INFO"
    # Senha dos usuários demo criados pelo seed (só na criação; o seed nunca a redefine).
    seed_demo_password: str = "riskops123"

    @model_validator(mode="after")
    def _check_jwt_secret(self) -> "Settings":
        # Fora de desenvolvimento, o default público do repo não pode assinar tokens.
        if self.app_env != "development" and (
            self.jwt_secret.startswith("dev-only") or len(self.jwt_secret) < 32
        ):
            raise ValueError("JWT_SECRET (>= 32 caracteres) é obrigatório fora de development")
        return self

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
