"""A evolução 0002 sobre um banco que já tem dados, e o ciclo completo de migrations."""

import pytest
from alembic import command
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.exc import IntegrityError

from tests.conftest import alembic_config


@pytest.fixture
def raw_engine(alembic_cfg):
    eng = create_engine(alembic_cfg.get_main_option("sqlalchemy.url"))
    yield eng
    eng.dispose()
    # Deixa o banco no head para os demais testes.
    command.downgrade(alembic_cfg, "base")
    command.upgrade(alembic_cfg, "head")


def test_0002_backfills_existing_cases(alembic_cfg, raw_engine):
    command.downgrade(alembic_cfg, "base")
    command.upgrade(alembic_cfg, "0001_initial")

    with raw_engine.begin() as conn:
        conn.execute(
            text(
                "INSERT INTO users (id, name, email, password_hash, role) "
                "VALUES (1, 'Admin', 'a@x.io', 'h', 'admin')"
            )
        )
        conn.execute(
            text("INSERT INTO entities (id, kind, document, name) VALUES (1, 'PF', :doc, 'X')"),
            {"doc": "52998224725"},
        )
        conn.execute(
            text(
                "INSERT INTO cases (id, entity_id, title, status, risk_score, created_at, "
                "updated_at) VALUES (:id, 1, :title, :status, :score, '2026-01-01', :updated)"
            ),
            [
                {"id": 1, "title": "Aprovado", "status": "aprovado", "score": 80,
                 "updated": "2026-01-09"},
                {"id": 2, "title": "Aberto", "status": "aberto", "score": 10,
                 "updated": "2026-01-01"},
                {"id": 3, "title": "Legado", "status": "reprovado", "score": 50,
                 "updated": "2026-01-07"},
            ],
        )  # fmt: skip
        conn.execute(
            text(
                "INSERT INTO case_events (case_id, author_id, type, payload, created_at) "
                "VALUES (1, 1, 'status_change', CAST(:payload AS jsonb), :at)"
            ),
            [
                {"payload": '{"from": "aberto", "to": "em_analise"}', "at": "2026-01-02"},
                {"payload": '{"from": "em_analise", "to": "aprovado"}', "at": "2026-01-05"},
            ],
        )

    command.upgrade(alembic_cfg, "0002_case_deadlines_and_search")

    with raw_engine.connect() as conn:
        rows = conn.execute(
            text("SELECT id, due_at::date::text, closed_at::date::text FROM cases ORDER BY id")
        ).all()
    assert rows == [
        (1, "2026-01-04", "2026-01-05"),  # alto: +3 dias; fechado no evento terminal
        (2, "2026-01-16", None),  # baixo: +15 dias; aberto
        (3, "2026-01-08", "2026-01-07"),  # médio: +7 dias; sem evento → updated_at
    ]

    # A regra nova vale para dados novos.
    with pytest.raises(IntegrityError), raw_engine.begin() as conn:
        conn.execute(
            text(
                "INSERT INTO cases (entity_id, title, status, risk_score, due_at) "
                "VALUES (1, 'Sem data', 'aprovado', 5, now())"
            )
        )


def test_full_downgrade_and_upgrade(alembic_cfg, raw_engine):
    command.upgrade(alembic_cfg, "head")
    command.downgrade(alembic_cfg, "base")
    assert set(inspect(raw_engine).get_table_names()) <= {"alembic_version"}
    command.upgrade(alembic_cfg, "head")
    assert {"users", "entities", "cases", "case_events"} <= set(
        inspect(raw_engine).get_table_names()
    )


def test_models_match_migrations():
    # Falha se algum modelo divergir do schema gerado pelas migrations.
    command.check(alembic_config())
