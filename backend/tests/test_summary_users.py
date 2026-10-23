from datetime import UTC, datetime, timedelta

from sqlalchemy import func, select, update

from app.models import Case
from tests.helpers import create_case, create_entity, set_status


def test_resumo_vazio_tem_todas_as_chaves(client, analyst_h):
    body = client.get("/api/summary", headers=analyst_h).json()
    assert body == {
        "total": 0,
        "active": 0,
        "overdue": 0,
        "by_status": {"aberto": 0, "em_analise": 0, "aprovado": 0, "reprovado": 0},
        "by_risk_level": {"baixo": 0, "medio": 0, "alto": 0},
        "by_assignee": [],
    }


def test_resumo_conta_status_risco_responsavel_e_atraso(client, db, analyst, analyst_h, admin_h):
    entity = create_entity(client, analyst_h)
    a = create_case(client, analyst_h, entity["id"], risk_score=90, assignee_id=analyst.id)
    create_case(client, analyst_h, entity["id"], risk_score=10)
    c = create_case(client, analyst_h, entity["id"], risk_score=50)
    set_status(client, admin_h, c["code"], "em_analise")
    set_status(client, admin_h, c["code"], "aprovado")
    # caso `a` vencido
    db.execute(
        update(Case).where(Case.id == a["id"]).values(due_at=datetime.now(UTC) - timedelta(days=1))
    )
    db.commit()

    body = client.get("/api/summary", headers=analyst_h).json()
    assert body["total"] == 3
    assert body["active"] == 2
    assert body["overdue"] == 1
    assert body["by_status"] == {"aberto": 2, "em_analise": 0, "aprovado": 1, "reprovado": 0}
    assert body["by_risk_level"] == {"baixo": 1, "medio": 0, "alto": 1}  # só ativos
    assert body["by_assignee"] == [
        {"assignee": {"id": analyst.id, "name": analyst.name}, "active": 1, "overdue": 1},
        {"assignee": None, "active": 1, "overdue": 0},
    ]


def test_resumo_bate_com_o_banco_no_seed(client, db, analyst_h):
    from app.seed import run_seed

    run_seed(db)
    db.commit()
    body = client.get("/api/summary", headers=analyst_h).json()
    assert body["total"] == db.scalar(select(func.count()).select_from(Case)) == 30
    assert sum(body["by_risk_level"].values()) == body["active"]
    assert sum(a["active"] for a in body["by_assignee"]) == body["active"]


def test_usuarios_lista_ativos_por_nome(client, make_user, admin, analyst, analyst_h):
    make_user(email="saiu@exemplo.com", is_active=False, name="Zé Inativo")
    users = client.get("/api/users", headers=analyst_h).json()
    assert [u["name"] for u in users] == ["Ada Admin", "Ana Analista"]
    assert set(users[0]) == {"id", "name", "email", "role"}
    analysts = client.get("/api/users?role=analyst", headers=analyst_h).json()
    assert [u["role"] for u in analysts] == ["analyst"]


def test_rotas_de_dominio_exigem_autenticacao(client):
    for path in ["/api/summary", "/api/users", "/api/cases", "/api/cases/1"]:
        assert client.get(path).status_code == 401, path
