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


@pytest.fixture
def client():
    from fastapi.testclient import TestClient

    from app.main import app

    with TestClient(app) as c:
        yield c


@pytest.fixture
def make_user(db):
    """Cria um usuário com senha conhecida (`senha-forte-123`)."""
    from app.models import User
    from app.security import hash_password
    from tests.helpers import PASSWORD

    def _make(email="ana@exemplo.com", role="analyst", is_active=True, name="Ana Teste"):
        user = User(
            name=name,
            email=email,
            role=role,
            is_active=is_active,
            password_hash=hash_password(PASSWORD),
        )
        db.add(user)
        db.commit()
        return user

    return _make


@pytest.fixture
def admin(make_user):
    return make_user(email="admin@exemplo.com", role="admin", name="Ada Admin")


@pytest.fixture
def analyst(make_user):
    return make_user(email="analista@exemplo.com", role="analyst", name="Ana Analista")


@pytest.fixture
def admin_h(client, admin):
    from tests.helpers import auth_header

    return auth_header(client, admin.email)


@pytest.fixture
def analyst_h(client, analyst):
    from tests.helpers import auth_header

    return auth_header(client, analyst.email)
