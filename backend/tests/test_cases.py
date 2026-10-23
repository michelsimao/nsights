from datetime import UTC, datetime, timedelta

import pytest
from sqlalchemy import event

from app.cases import TRANSITIONS, risk_level_for
from app.db import engine
from tests.helpers import CPF, create_case, create_entity, set_status


@pytest.fixture
def entity(client, analyst_h):
    return create_entity(client, analyst_h)


def _error(res, status, code):
    assert res.status_code == status, res.text
    assert res.json()["error"]["code"] == code
    return res.json()["error"]


# --- fluxo principal (critério de aceite) --------------------------------------------


def test_fluxo_principal(client, analyst, analyst_h, admin_h):
    # 1. entidade e caso criados pelo analista
    entity = create_entity(client, analyst_h, document=CPF, kind="PF", name="Carlos Ramos")
    case = create_case(client, analyst_h, entity["id"], risk_score=75)
    ref = case["code"]
    assert case["status"] == "aberto"
    assert case["risk_level"] == "alto"
    assert case["assignee"] is None
    assert [e["type"] for e in case["events"]] == ["created"]
    assert case["allowed_transitions"] == ["em_analise"]

    # 2. analista coloca em análise e assume o caso
    res = set_status(client, analyst_h, ref, "em_analise")
    assert res.status_code == 200
    case = res.json()
    assert case["status"] == "em_analise"
    assert case["assignee"] == {"id": analyst.id, "name": analyst.name}
    assert case["allowed_transitions"] == ["aberto"]  # analista não aprova

    # 3. analista tenta aprovar: 403, nada muda
    _error(set_status(client, analyst_h, ref, "aprovado"), 403, "forbidden")
    assert client.get(f"/api/cases/{ref}", headers=analyst_h).json()["status"] == "em_analise"

    # 4. admin aprova
    res = set_status(client, admin_h, ref, "aprovado", "Sem apontamentos.")
    assert res.status_code == 200
    case = res.json()
    assert case["status"] == "aprovado"
    assert case["closed_at"] is not None
    assert case["allowed_transitions"] == []
    assert case["can_edit"] is False

    # 5. eventos registrados, em ordem
    events = [(e["type"], e["payload"]) for e in case["events"]]
    assert events == [
        ("created", {}),
        ("status_change", {"from": "aberto", "to": "em_analise"}),
        ("assignment", {"from": None, "to": {"id": analyst.id, "name": analyst.name}}),
        ("status_change", {"from": "em_analise", "to": "aprovado"}),
    ]
    assert case["events"][-1]["message"] == "Sem apontamentos."
    assert case["events"][-1]["author"]["name"] == "Ada Admin"

    # 6. transição inválida: 409
    err = _error(set_status(client, admin_h, ref, "em_analise"), 409, "case_closed")
    assert "encerrado" in err["message"]


# --- matriz de transições ------------------------------------------------------------


@pytest.mark.parametrize(
    ("path", "to", "role", "expected"),
    [
        ([], "aprovado", "admin", (409, "invalid_transition")),  # aberto → aprovado pula etapa
        ([], "aberto", "admin", (409, "invalid_transition")),  # mesmo status
        ([], "em_analise", "analyst", (200, None)),
        (["em_analise"], "aberto", "analyst", (200, None)),
        (["em_analise"], "reprovado", "analyst", (403, "forbidden")),
        (["em_analise"], "reprovado", "admin", (200, None)),
        (["em_analise", "reprovado"], "aberto", "admin", (409, "case_closed")),
    ],
)
def test_matriz(client, entity, analyst_h, admin_h, path, to, role, expected):
    ref = create_case(client, analyst_h, entity["id"])["code"]
    for step in path:
        assert set_status(client, admin_h, ref, step, "motivo").status_code == 200
    headers = admin_h if role == "admin" else analyst_h
    res = set_status(client, headers, ref, to, "motivo")
    assert res.status_code == expected[0], res.text
    if expected[1]:
        assert res.json()["error"]["code"] == expected[1]


def test_invalid_transition_informa_as_permitidas(client, entity, analyst_h):
    ref = create_case(client, analyst_h, entity["id"])["code"]
    err = _error(set_status(client, analyst_h, ref, "aprovado"), 409, "invalid_transition")
    assert err["details"] == {"from": "aberto", "to": "aprovado", "allowed": ["em_analise"]}


def test_reprovar_exige_justificativa(client, entity, analyst_h, admin_h):
    ref = create_case(client, analyst_h, entity["id"])["code"]
    set_status(client, admin_h, ref, "em_analise")
    err = _error(set_status(client, admin_h, ref, "reprovado"), 422, "validation_error")
    assert err["details"][0]["field"] == "message"
    assert set_status(client, admin_h, ref, "reprovado", "Sanção confirmada.").status_code == 200


def test_devolver_para_fila_mantem_responsavel(client, entity, analyst_h):
    ref = create_case(client, analyst_h, entity["id"])["code"]
    set_status(client, analyst_h, ref, "em_analise")
    case = set_status(client, analyst_h, ref, "aberto").json()
    assert case["status"] == "aberto"
    assert case["closed_at"] is None
    assert case["assignee"] is not None


def test_status_desconhecido_422(client, entity, analyst_h):
    ref = create_case(client, analyst_h, entity["id"])["code"]
    _error(set_status(client, analyst_h, ref, "arquivado"), 422, "validation_error")


def test_matriz_so_admin_encerra():
    for (_, to), roles in TRANSITIONS.items():
        if to in ("aprovado", "reprovado"):
            assert roles == {"admin"}


# --- criação -------------------------------------------------------------------------


def test_criacao_calcula_prazo_pelo_risco(client, entity, analyst_h):
    before = datetime.now(UTC)
    for score, days in [(10, 15), (50, 7), (90, 3)]:
        case = create_case(client, analyst_h, entity["id"], risk_score=score)
        due = datetime.fromisoformat(case["due_at"])
        assert before + timedelta(days=days) <= due <= datetime.now(UTC) + timedelta(days=days)
        assert case["risk_level"] == risk_level_for(score)
        assert case["code"].startswith(f"RK-{before.year}-")


def test_criacao_com_prazo_explicito(client, entity, analyst_h):
    due = "2030-01-31T12:00:00+00:00"
    case = create_case(client, analyst_h, entity["id"], due_at=due)
    assert datetime.fromisoformat(case["due_at"]) == datetime.fromisoformat(due)


@pytest.mark.parametrize(
    ("fields", "field"),
    [
        ({"entity_id": 999}, "entity_id"),
        ({"risk_score": 101}, "risk_score"),
        ({"risk_score": -1}, "risk_score"),
        ({"title": "  "}, "title"),
        ({"due_at": "2030-01-31T12:00:00"}, "due_at"),  # sem fuso
    ],
)
def test_criacao_invalida_422_no_campo(client, entity, analyst_h, fields, field):
    body = {"entity_id": entity["id"], "title": "Alerta", "risk_score": 50, **fields}
    err = _error(client.post("/api/cases", json=body, headers=analyst_h), 422, "validation_error")
    assert err["details"][0]["field"] == field


def test_analista_so_atribui_a_si_mesmo_na_criacao(client, entity, analyst, analyst_h, admin):
    _error(
        client.post(
            "/api/cases",
            json={
                "entity_id": entity["id"],
                "title": "Alerta",
                "risk_score": 1,
                "assignee_id": admin.id,
            },
            headers=analyst_h,
        ),
        403,
        "forbidden",
    )
    case = create_case(client, analyst_h, entity["id"], assignee_id=analyst.id)
    assert case["assignee"]["id"] == analyst.id
    assert [e["type"] for e in case["events"]] == ["created", "assignment"]


def test_admin_atribui_na_criacao_so_usuario_ativo(client, entity, admin_h, make_user):
    inactive = make_user(email="saiu@exemplo.com", is_active=False)
    err = _error(
        client.post(
            "/api/cases",
            json={
                "entity_id": entity["id"],
                "title": "Alerta",
                "risk_score": 1,
                "assignee_id": inactive.id,
            },
            headers=admin_h,
        ),
        422,
        "validation_error",
    )
    assert err["details"][0]["field"] == "assignee_id"


# --- edição --------------------------------------------------------------------------


def test_edicao_parcial_registra_diff(client, entity, analyst_h):
    case = create_case(client, analyst_h, entity["id"], risk_score=30)
    res = client.patch(
        f"/api/cases/{case['id']}",
        json={"title": "Alerta de PEP (sócio)", "risk_score": 80, "description": None},
        headers=analyst_h,
    )
    assert res.status_code == 200
    body = res.json()
    assert body["title"] == "Alerta de PEP (sócio)"
    assert body["risk_level"] == "alto"  # coluna gerada recalculada
    assert body["updated_at"] > case["updated_at"]
    update = body["events"][-1]
    assert update["type"] == "update"
    # description já era null: não entra no diff
    assert update["payload"] == {
        "changes": {
            "title": {"from": "Alerta de PEP", "to": "Alerta de PEP (sócio)"},
            "risk_score": {"from": 30, "to": 80},
        }
    }


def test_edicao_sem_mudanca_nao_gera_evento(client, entity, analyst_h):
    case = create_case(client, analyst_h, entity["id"])
    res = client.patch(f"/api/cases/{case['id']}", json={"title": case["title"]}, headers=analyst_h)
    assert len(res.json()["events"]) == 1


@pytest.mark.parametrize(
    "body",
    [{"status": "aprovado"}, {"assignee_id": 1}, {"title": None}, {"risk_score": 200}],
    ids=["status", "assignee", "titulo-nulo", "score"],
)
def test_edicao_rejeita_campos_fora_do_patch(client, entity, analyst_h, body):
    case = create_case(client, analyst_h, entity["id"])
    res = client.patch(f"/api/cases/{case['id']}", json=body, headers=analyst_h)
    _error(res, 422, "validation_error")


def test_caso_encerrado_nao_edita(client, entity, analyst_h, admin_h):
    ref = create_case(client, analyst_h, entity["id"])["code"]
    set_status(client, admin_h, ref, "em_analise")
    set_status(client, admin_h, ref, "aprovado")
    _error(
        client.patch(f"/api/cases/{ref}", json={"title": "Novo"}, headers=admin_h),
        409,
        "case_closed",
    )


# --- responsável ---------------------------------------------------------------------


def test_reatribuicao_so_admin(client, entity, analyst, analyst_h, admin_h):
    ref = create_case(client, analyst_h, entity["id"])["code"]
    body = {"assignee_id": analyst.id}
    _error(
        client.post(f"/api/cases/{ref}/assignee", json=body, headers=analyst_h), 403, "forbidden"
    )

    case = client.post(f"/api/cases/{ref}/assignee", json=body, headers=admin_h).json()
    assert case["assignee"]["id"] == analyst.id
    assert case["can_assign"] is True

    case = client.post(
        f"/api/cases/{ref}/assignee", json={"assignee_id": None}, headers=admin_h
    ).json()
    assert case["assignee"] is None
    assignments = [e["payload"] for e in case["events"] if e["type"] == "assignment"]
    assert assignments[-1] == {"from": {"id": analyst.id, "name": analyst.name}, "to": None}


def test_reatribuir_mesmo_responsavel_nao_gera_evento(client, entity, analyst, admin_h):
    ref = create_case(client, admin_h, entity["id"], assignee_id=analyst.id)["code"]
    case = client.post(
        f"/api/cases/{ref}/assignee", json={"assignee_id": analyst.id}, headers=admin_h
    ).json()
    assert [e["type"] for e in case["events"]] == ["created", "assignment"]


def test_iniciar_analise_nao_troca_responsavel_existente(client, entity, analyst, admin_h):
    ref = create_case(client, admin_h, entity["id"], assignee_id=analyst.id)["code"]
    case = set_status(client, admin_h, ref, "em_analise").json()
    assert case["assignee"]["id"] == analyst.id


# --- notas ---------------------------------------------------------------------------


def test_nota_entra_na_timeline_inclusive_em_caso_encerrado(client, entity, analyst_h, admin_h):
    ref = create_case(client, analyst_h, entity["id"])["code"]
    res = client.post(
        f"/api/cases/{ref}/notes", json={"message": "  Doc recebido. "}, headers=analyst_h
    )
    assert res.status_code == 201
    note = res.json()
    assert note["type"] == "note" and note["message"] == "Doc recebido."
    assert note["author"]["name"] == "Ana Analista"

    set_status(client, admin_h, ref, "em_analise")
    set_status(client, admin_h, ref, "reprovado", "Motivo.")
    assert (
        client.post(
            f"/api/cases/{ref}/notes", json={"message": "Pós"}, headers=analyst_h
        ).status_code
        == 201
    )
    _error(
        client.post(f"/api/cases/{ref}/notes", json={"message": ""}, headers=analyst_h),
        422,
        "validation_error",
    )


# --- leitura -------------------------------------------------------------------------


def test_detalhe_por_id_ou_codigo_e_404(client, entity, analyst_h):
    case = create_case(client, analyst_h, entity["id"])
    assert client.get(f"/api/cases/{case['id']}", headers=analyst_h).json()["code"] == case["code"]
    assert (
        client.get(f"/api/cases/{case['code'].lower()}", headers=analyst_h).json()["id"]
        == case["id"]
    )
    _error(client.get("/api/cases/RK-2026-9999", headers=analyst_h), 404, "not_found")
    _error(client.get("/api/cases/drop table", headers=analyst_h), 422, "validation_error")


@pytest.fixture
def seeded(db):
    from app.seed import run_seed

    run_seed(db)
    db.commit()


def test_listagem_filtros(client, seeded, analyst_h):
    def get(qs):
        res = client.get(f"/api/cases?{qs}", headers=analyst_h)
        assert res.status_code == 200, res.text
        return res.json()

    all_ = get("page_size=100")
    assert all_["total"] == 30

    abertos = get("status=aberto&page_size=100")
    assert abertos["total"] > 0 and {c["status"] for c in abertos["items"]} == {"aberto"}

    multi = get("status=aberto&status=em_analise&page_size=100")
    assert {c["status"] for c in multi["items"]} == {"aberto", "em_analise"}

    altos = get("risk_level=alto&page_size=100")
    assert {c["risk_level"] for c in altos["items"]} == {"alto"}

    sem_resp = get("assignee=none&page_size=100")
    assert sem_resp["total"] > 0 and all(c["assignee"] is None for c in sem_resp["items"])

    by_code = get("q=rk-2026-0007")
    assert [c["code"] for c in by_code["items"]] == ["RK-2026-0007"]

    by_entity = get("q=rota sul&page_size=100")
    assert by_entity["total"] > 0
    assert all(c["entity"]["name"] == "Transportes Rota Sul Ltda." for c in by_entity["items"])

    combined = get("status=aprovado&risk_level=alto&page_size=100")
    assert all(c["status"] == "aprovado" and c["risk_level"] == "alto" for c in combined["items"])

    overdue = get("overdue=true&page_size=100")
    assert all(c["is_overdue"] for c in overdue["items"])
    assert overdue["total"] + get("overdue=false")["total"] == 30


def test_listagem_meus_casos(client, entity, analyst, analyst_h, admin_h):
    create_case(client, analyst_h, entity["id"], assignee_id=analyst.id)
    create_case(client, admin_h, entity["id"])
    mine = client.get("/api/cases?assignee=me", headers=analyst_h).json()
    assert mine["total"] == 1
    by_id = client.get(f"/api/cases?assignee={analyst.id}", headers=admin_h).json()
    assert by_id["total"] == 1


def test_listagem_paginacao_e_ordenacao(client, seeded, analyst_h):
    p1 = client.get("/api/cases?page_size=10&sort=code", headers=analyst_h).json()
    p3 = client.get("/api/cases?page_size=10&page=3&sort=code", headers=analyst_h).json()
    assert p1["total"] == 30 and len(p1["items"]) == 10
    assert p1["items"][0]["code"] == "RK-2026-0001"
    assert p3["items"][-1]["code"] == "RK-2026-0030"
    assert client.get("/api/cases?page=4&page_size=10", headers=analyst_h).json()["items"] == []

    scores = [
        c["risk_score"]
        for c in client.get("/api/cases?sort=-risk_score&page_size=100", headers=analyst_h).json()[
            "items"
        ]
    ]
    assert scores == sorted(scores, reverse=True)

    created = [c["created_at"] for c in client.get("/api/cases", headers=analyst_h).json()["items"]]
    assert created == sorted(created, reverse=True)  # padrão: mais recentes primeiro


@pytest.mark.parametrize(
    "qs",
    [
        "sort=title;drop table cases",
        "sort=entity_id",
        "page=0",
        "page_size=101",
        "status=x",
        "assignee=x",
    ],
)
def test_listagem_parametros_invalidos_422(client, analyst_h, qs):
    _error(client.get(f"/api/cases?{qs}", headers=analyst_h), 422, "validation_error")


def test_listagem_sem_n_mais_1(client, seeded, analyst_h):
    """O número de queries não cresce com o tamanho da página."""

    def queries_for(page_size):
        statements = []

        def count(*args, **kwargs):
            statements.append(args[2])

        event.listen(engine, "before_cursor_execute", count)
        try:
            assert (
                client.get(f"/api/cases?page_size={page_size}", headers=analyst_h).status_code
                == 200
            )
        finally:
            event.remove(engine, "before_cursor_execute", count)
        return len(statements)

    assert queries_for(2) == queries_for(30)


def test_detalhe_sem_n_mais_1(client, seeded, analyst_h):
    def queries_for(ref):
        statements = []

        def count(*args, **kwargs):
            statements.append(args[2])

        event.listen(engine, "before_cursor_execute", count)
        try:
            client.get(f"/api/cases/{ref}", headers=analyst_h)
        finally:
            event.remove(engine, "before_cursor_execute", count)
        return len(statements)

    # caso 1: só evento de abertura; caso 3: 4 eventos com autores diferentes
    assert queries_for("RK-2026-0001") == queries_for("RK-2026-0003")
