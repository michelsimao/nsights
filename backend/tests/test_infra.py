"""Envelope de erro, request-id, logging, CORS e documentação OpenAPI."""

import json
import logging

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.config import Settings
from app.errors import register_error_handlers
from app.observability import JsonFormatter, RequestIdMiddleware, request_id_var


def test_rota_inexistente_404_no_envelope(client):
    res = client.get("/api/nao-existe")
    assert res.status_code == 404
    assert res.json()["error"]["code"] == "not_found"
    assert res.json()["error"]["message"] == "Recurso não encontrado."
    assert res.json()["error"]["request_id"] == res.headers["X-Request-ID"]


def test_metodo_nao_permitido_405_no_envelope(client):
    res = client.delete("/api/auth/me")
    assert res.status_code == 405
    assert res.json()["error"]["code"] == "method_not_allowed"


def test_request_id_gerado_em_toda_resposta(client):
    a = client.get("/health").headers["X-Request-ID"]
    b = client.get("/health").headers["X-Request-ID"]
    assert len(a) == 32 and a != b


def test_request_id_do_cliente_e_reaproveitado(client):
    res = client.get("/health", headers={"X-Request-ID": "trace-abc.123"})
    assert res.headers["X-Request-ID"] == "trace-abc.123"


@pytest.mark.parametrize("bad", ["com espaco", "x" * 65, "quebra\\nlinha", "<script>"])
def test_request_id_invalido_e_substituido(client, bad):
    res = client.get("/health", headers={"X-Request-ID": bad})
    assert res.headers["X-Request-ID"] != bad
    assert len(res.headers["X-Request-ID"]) == 32


def test_erro_inesperado_500_sem_vazar_detalhes(caplog):
    app = FastAPI()
    register_error_handlers(app)
    app.add_middleware(RequestIdMiddleware)

    @app.get("/boom")
    def boom():
        raise RuntimeError("segredo interno")

    with TestClient(app) as c, caplog.at_level(logging.ERROR):
        res = c.get("/boom")
    assert res.status_code == 500
    err = res.json()["error"]
    assert err["code"] == "internal_error"
    assert "segredo" not in res.text
    assert err["request_id"] == res.headers["X-Request-ID"]
    # O detalhe fica no log, que leva o mesmo request-id.
    assert any("segredo interno" in (r.exc_text or "") or r.exc_info for r in caplog.records)


def test_log_json_com_request_id_e_extras():
    record = logging.makeLogRecord(
        {"name": "riskops.test", "levelno": logging.INFO, "levelname": "INFO", "msg": "olá %s"}
    )
    record.args = ("mundo",)
    record.status = 200
    token = request_id_var.set("rid-1")
    try:
        line = json.loads(JsonFormatter().format(record))
    finally:
        request_id_var.reset(token)
    assert line["message"] == "olá mundo"
    assert line["level"] == "INFO"
    assert line["request_id"] == "rid-1"
    assert line["status"] == 200


def test_cors_permite_origem_configurada(client):
    res = client.options(
        "/api/auth/me",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "authorization",
        },
    )
    assert res.status_code == 200
    assert res.headers["access-control-allow-origin"] == "http://localhost:5173"
    assert "access-control-allow-credentials" not in res.headers


def test_cors_bloqueia_origem_desconhecida(client):
    res = client.get("/health", headers={"Origin": "https://evil.example"})
    assert "access-control-allow-origin" not in res.headers


def test_cors_em_resposta_de_erro(client):
    res = client.get("/api/auth/me", headers={"Origin": "http://localhost:5173"})
    assert res.status_code == 401
    assert res.headers["access-control-allow-origin"] == "http://localhost:5173"
    assert "x-request-id" in res.headers["access-control-expose-headers"].lower()


def test_openapi_tem_oauth2_para_o_authorize_do_swagger(client):
    spec = client.get("/openapi.json").json()
    scheme = spec["components"]["securitySchemes"]["OAuth2PasswordBearer"]
    assert scheme["flows"]["password"]["tokenUrl"] == "/api/auth/login"
    assert spec["paths"]["/api/auth/me"]["get"]["security"] == [{"OAuth2PasswordBearer": []}]
    login = spec["paths"]["/api/auth/login"]["post"]
    assert login["responses"]["401"]["content"]["application/json"]["schema"]["$ref"].endswith(
        "/ErrorResponse"
    )
    assert {t["name"] for t in spec["tags"]} >= {"auth", "infra"}


def test_segredo_de_dev_recusado_fora_de_development():
    with pytest.raises(ValueError, match="JWT_SECRET"):
        Settings(app_env="production", jwt_secret="dev-only-insecure-secret-change-me-in-prod")
    with pytest.raises(ValueError, match="JWT_SECRET") as exc:
        Settings(app_env="production", jwt_secret="curto-mas-secreto")
    assert "curto-mas-secreto" not in str(exc.value)  # o erro não imprime segredos
    Settings(app_env="production", jwt_secret="x" * 40)


def test_mensagens_de_validacao_em_portugues(client, analyst_h):
    res = client.get("/api/cases?page=0&sort=x", headers=analyst_h)
    messages = {d["field"]: d["message"] for d in res.json()["error"]["details"]}
    assert messages["page"] == "Deve ser maior ou igual a 1."
    assert messages["sort"].startswith("Valor inválido. Opções: 'created_at'")
    res = client.post("/api/auth/login", data={"username": "a"})
    assert res.json()["error"]["details"][0]["message"] == "Campo obrigatório."


def test_openapi_documenta_dominio(client):
    spec = client.get("/openapi.json").json()
    assert {t["name"] for t in spec["tags"]} >= {"auth", "cases", "entities", "summary", "users"}
    for path, methods in spec["paths"].items():
        for method, op in methods.items():
            assert op.get("summary") and op.get("description"), f"{method} {path}"
            assert op.get("tags"), f"{method} {path}"
    schemas = spec["components"]["schemas"]
    for name in ["CaseCreate", "CaseUpdate", "StatusChange", "EntityCreate", "NoteCreate"]:
        assert schemas[name].get("examples"), name
    # erros documentados com o envelope
    status_op = spec["paths"]["/api/cases/{ref}/status"]["post"]
    assert {"401", "403", "404", "409", "422"} <= set(status_op["responses"])


# --- números fora do intervalo do Postgres --------------------------------------------

BIG = 2**31  # um acima do maior `integer` do Postgres


@pytest.mark.parametrize(
    ("method", "path", "json", "expected"),
    [
        ("GET", f"/api/cases/{BIG}", None, 404),
        ("GET", f"/api/cases/{BIG * 10**12}", None, 404),
        ("GET", f"/api/entities/{BIG}", None, 422),
        ("GET", f"/api/cases?entity_id={BIG}", None, 422),
        ("GET", f"/api/cases?assignee={BIG}", None, 422),
        ("GET", f"/api/cases?assignee={BIG * 10**12}", None, 422),
        ("GET", f"/api/cases?page={BIG * 10**6}", None, 422),
        ("POST", "/api/cases", {"entity_id": BIG, "title": "Alerta", "risk_score": 1}, 422),
        ("POST", "/api/cases/1/assignee", {"assignee_id": BIG}, 422),
    ],
)
def test_inteiro_fora_do_intervalo_nao_vira_500(client, admin_h, method, path, json, expected):
    res = client.request(method, path, json=json, headers=admin_h)
    assert res.status_code == expected, res.text
    body = res.json()["error"]
    assert body["code"] in {"not_found", "validation_error"}
    assert body["request_id"] == res.headers["X-Request-ID"]


def test_data_error_do_banco_vira_422(caplog):
    from sqlalchemy.exc import DataError

    app = FastAPI()
    register_error_handlers(app)
    app.add_middleware(RequestIdMiddleware)

    @app.get("/estoura")
    def estoura():
        raise DataError("SELECT 1", {}, Exception("integer out of range"))

    with TestClient(app) as c, caplog.at_level(logging.WARNING):
        res = c.get("/estoura")
    assert res.status_code == 422
    assert res.json()["error"]["code"] == "validation_error"
    assert "integer out of range" not in res.text
    assert any("integer out of range" in r.getMessage() for r in caplog.records)
