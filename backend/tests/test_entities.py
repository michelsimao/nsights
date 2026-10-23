import pytest

from tests.helpers import CNPJ, CPF, create_case, create_entity


def test_cadastra_entidade_com_mascara_e_grava_so_digitos(client, analyst_h):
    body = create_entity(client, analyst_h, document=CPF, kind="PF", name="  Carlos Ramos ")
    assert body["document"] == "52998224725"
    assert body["name"] == "Carlos Ramos"
    assert body["case_count"] == 0


@pytest.mark.parametrize(
    ("kind", "document", "msg"),
    [
        ("PF", "529.982.247-26", "CPF inválido"),  # dígito errado
        ("PF", "111.111.111-11", "CPF inválido"),  # repetido
        ("PF", CNPJ, "CPF inválido"),  # CNPJ com tipo PF
        ("PJ", "11.222.333/0001-82", "CNPJ inválido"),
    ],
)
def test_documento_invalido_422_no_campo(client, analyst_h, kind, document, msg):
    res = client.post(
        "/api/entities",
        json={"kind": kind, "document": document, "name": "Fulano"},
        headers=analyst_h,
    )
    assert res.status_code == 422
    detail = res.json()["error"]["details"][0]
    assert detail["field"] == "document"
    assert detail["message"] == msg


def test_documento_duplicado_409_com_id(client, analyst_h):
    first = create_entity(client, analyst_h)
    res = client.post(
        "/api/entities",
        json={"kind": "PJ", "document": "11222333000181", "name": "Outro nome"},
        headers=analyst_h,
    )
    assert res.status_code == 409
    assert res.json()["error"]["code"] == "entity_exists"
    assert res.json()["error"]["details"] == {"id": first["id"]}


def test_lista_busca_por_nome_e_documento_e_pagina(client, analyst_h):
    create_entity(client, analyst_h, document=CNPJ, name="Transportes Rota Sul Ltda.")
    create_entity(client, analyst_h, document=CPF, kind="PF", name="Carlos Ramos")

    by_name = client.get("/api/entities?q=rota sul", headers=analyst_h).json()
    assert [e["name"] for e in by_name["items"]] == ["Transportes Rota Sul Ltda."]

    by_doc = client.get("/api/entities?q=529.982", headers=analyst_h).json()
    assert [e["name"] for e in by_doc["items"]] == ["Carlos Ramos"]

    # `%` é texto, não curinga
    assert client.get("/api/entities?q=%25", headers=analyst_h).json()["total"] == 0

    page = client.get("/api/entities?page_size=1&page=2&sort=name", headers=analyst_h).json()
    assert page["total"] == 2 and page["page"] == 2
    assert [e["name"] for e in page["items"]] == ["Transportes Rota Sul Ltda."]

    assert client.get("/api/entities?kind=PF", headers=analyst_h).json()["total"] == 1


def test_detalhe_traz_casos_e_contagens(client, analyst_h, admin_h):
    entity = create_entity(client, analyst_h)
    c1 = create_case(client, analyst_h, entity["id"])
    create_case(client, analyst_h, entity["id"], title="Mídia negativa")
    client.post(f"/api/cases/{c1['code']}/status", json={"status": "em_analise"}, headers=admin_h)
    client.post(f"/api/cases/{c1['code']}/status", json={"status": "aprovado"}, headers=admin_h)

    body = client.get(f"/api/entities/{entity['id']}", headers=analyst_h).json()
    assert body["case_count"] == 2
    assert body["active_case_count"] == 1
    assert [c["title"] for c in body["cases"]] == ["Mídia negativa", "Alerta de PEP"]

    listed = client.get("/api/entities", headers=analyst_h).json()["items"][0]
    assert (listed["case_count"], listed["active_case_count"]) == (2, 1)


def test_entidade_inexistente_404(client, analyst_h):
    res = client.get("/api/entities/999", headers=analyst_h)
    assert res.status_code == 404
    assert res.json()["error"]["code"] == "not_found"


def test_entidades_exigem_autenticacao(client):
    assert client.get("/api/entities").status_code == 401
    assert client.post("/api/entities", json={}).status_code == 401
