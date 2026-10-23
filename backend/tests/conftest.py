import os

# Antes de importar o app: tudo (engine, Alembic, seed) aponta para o banco de teste.
os.environ["DATABASE_URL"] = os.environ.get(
    "TEST_DATABASE_URL", "postgresql+psycopg://riskops:riskops@localhost:5433/riskops_test"
)

from pathlib import Path  # noqa: E402

import pytest  # noqa: E402
from alembic import command  # noqa: E402
from alembic.config import Config  # noqa: E402
from sqlalchemy import text  # noqa: E402

from app.db import SessionLocal, engine  # noqa: E402

BACKEND_DIR = Path(__file__).resolve().parent.parent
TABLES = "case_events, cases, entities, users"


def alembic_config() -> Config:
    cfg = Config(str(BACKEND_DIR / "alembic.ini"))
    cfg.set_main_option("script_location", str(BACKEND_DIR / "migrations"))
    cfg.set_main_option("sqlalchemy.url", os.environ["DATABASE_URL"])
    cfg.attributes["configure_logger"] = False
    return cfg


@pytest.fixture(scope="session")
def alembic_cfg() -> Config:
    return alembic_config()


@pytest.fixture(scope="session", autouse=True)
def migrated(alembic_cfg):
    """Banco de teste recriado do zero pelas migrations, uma vez por sessão."""
    command.downgrade(alembic_cfg, "base")
    command.upgrade(alembic_cfg, "head")


@pytest.fixture
def db():
    """Sessão sobre um banco vazio (no schema head). Sequences reiniciadas."""
    with engine.begin() as conn:
        conn.execute(text(f"TRUNCATE {TABLES} RESTART IDENTITY CASCADE"))
    with SessionLocal() as session:
        yield session
