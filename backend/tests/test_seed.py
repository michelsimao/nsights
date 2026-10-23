from datetime import UTC, datetime

from sqlalchemy import func, select

from app.models import Case, CaseEvent, Entity, User
from app.security import verify_password
from app.seed import CASE_COUNT, ENTITIES, USERS, run_seed
from app.validators import is_valid_cnpj, is_valid_cpf


def counts(db) -> dict[str, int]:
    return {
        m.__tablename__: db.scalar(select(func.count()).select_from(m))
        for m in (User, Entity, Case, CaseEvent)
    }


def test_seed_twice_creates_nothing_the_second_time(db):
    first = run_seed(db)
    db.commit()
    after_first = counts(db)

    second = run_seed(db)
    db.commit()

    assert first["users"] == len(USERS)
    assert first["entities"] == len(ENTITIES)
    assert first["cases"] == CASE_COUNT
    assert first["events"] > CASE_COUNT
    assert second == {"users": 0, "entities": 0, "cases": 0, "events": 0}
    assert counts(db) == after_first


def test_seed_does_not_overwrite_demo_changes(db):
    run_seed(db)
    db.commit()
    case = db.scalar(select(Case).where(Case.code == "RK-2026-0001"))
    case.title = "Alterado na demo"
    case.risk_score = 99
    db.commit()

    run_seed(db)
    db.commit()
    db.refresh(case)
    assert (case.title, case.risk_score, case.risk_level) == ("Alterado na demo", 99, "alto")


def test_new_case_code_does_not_collide_with_seed(db):
    run_seed(db)
    db.commit()
    entity_id = db.scalar(select(Entity.id).limit(1))
    new = Case(entity_id=entity_id, title="Novo", risk_score=10, due_at=datetime.now(UTC))
    db.add(new)
    db.commit()
    db.refresh(new)
    assert new.code.endswith(f"-{CASE_COUNT + 1:04d}")

    # Rodar o seed de novo não volta a sequence para trás.
    run_seed(db)
    db.commit()
    newer = Case(entity_id=entity_id, title="Outro", risk_score=10, due_at=datetime.now(UTC))
    db.add(newer)
    db.commit()
    db.refresh(newer)
    assert newer.code.endswith(f"-{CASE_COUNT + 2:04d}")


def test_seed_data_is_consistent(db):
    run_seed(db)
    db.commit()
    for kind, document, _ in ENTITIES:
        assert (is_valid_cpf if kind == "PF" else is_valid_cnpj)(document)

    admin = db.scalar(select(User).where(User.email == "admin@nsights.demo"))
    assert admin.role == "admin"
    assert verify_password("riskops123", admin.password_hash)

    statuses = set(db.scalars(select(Case.status).distinct()))
    assert statuses == {"aberto", "em_analise", "aprovado", "reprovado"}

    # Todo caso tem o evento de criação, e nenhum evento está no futuro.
    without_created = db.scalar(
        select(func.count()).select_from(Case).where(~Case.events.any(CaseEvent.type == "created"))
    )
    assert without_created == 0
    assert db.scalar(select(func.max(CaseEvent.created_at))) <= datetime.now(UTC)
