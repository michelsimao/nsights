from datetime import UTC, datetime, timedelta

import jwt
import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.config import get_settings
from app.deps import AdminUser, CurrentUser
from app.errors import register_error_handlers
from app.security import create_access_token
from tests.helpers import auth_header, login


def assert_error(res, status, code):
    assert res.status_code == status, res.text
    body = res.json()
    assert set(body) == {"error"}
    assert body["error"]["code"] == code
    assert body["error"]["message"]
    assert body["error"]["request_id"] == res.headers["X-Request-ID"]
    return body["error"]


# --- login ---------------------------------------------------------------------------


def test_login_ok_devolve_token_e_usuario(client, make_user):
    make_user(email="ana@exemplo.com", role="admin")
    res = login(client, "  Ana@Exemplo.COM ")  # email normalizado
    assert res.status_code == 200
    body = res.json()
    assert body["token_type"] == "bearer"
    assert body["expires_in"] == get_settings().jwt_expire_minutes * 60
    assert body["user"]["email"] == "ana@exemplo.com"
    assert body["user"]["role"] == "admin"
    assert "password_hash" not in body["user"]

    claims = jwt.decode(body["access_token"], get_settings().jwt_secret, algorithms=["HS256"])
    assert claims["sub"] == str(body["user"]["id"])
    assert claims["role"] == "admin"


def test_login_senha_errada_401_no_envelope(client, make_user):
    make_user(email="ana@exemplo.com")
    res = login(client, "ana@exemplo.com", "senha-errada")
    err = assert_error(res, 401, "invalid_credentials")
    assert res.headers["WWW-Authenticate"] == "Bearer"
    assert err["details"] is None


def test_login_nao_revela_quais_emails_existem(client, make_user):
    make_user(email="ana@exemplo.com")
    make_user(email="inativo@exemplo.com", is_active=False)
    respostas = [
        login(client, "ana@exemplo.com", "senha-errada"),
        login(client, "ninguem@exemplo.com"),
        login(client, "inativo@exemplo.com"),  # senha certa, mas usuário inativo
    ]
    corpos = []
    for res in respostas:
        err = assert_error(res, 401, "invalid_credentials")
        corpos.append({k: v for k, v in err.items() if k != "request_id"})
    assert corpos[0] == corpos[1] == corpos[2]


def test_login_sem_campos_422_com_detalhes(client):
    res = client.post("/api/auth/login", data={"username": "ana@exemplo.com"})
    err = assert_error(res, 422, "validation_error")
    assert {"field": "password", "location": "body"}.items() <= err["details"][0].items()


# --- rotas protegidas ----------------------------------------------------------------


def test_me_sem_token_401(client):
    res = client.get("/api/auth/me")
    assert_error(res, 401, "not_authenticated")
    assert res.headers["WWW-Authenticate"] == "Bearer"


def test_me_com_token(client, make_user):
    make_user(email="ana@exemplo.com", name="Ana Teste")
    res = client.get("/api/auth/me", headers=auth_header(client, "ana@exemplo.com"))
    assert res.status_code == 200
    assert res.json()["name"] == "Ana Teste"


def _token(**overrides):
    now = datetime.now(UTC)
    claims = {"sub": "1", "role": "admin", "iat": now, "exp": now + timedelta(minutes=5)}
    claims.update(overrides)
    secret = claims.pop("secret", get_settings().jwt_secret)
    alg = claims.pop("alg", "HS256")
    return jwt.encode(claims, secret, algorithm=alg)


@pytest.mark.parametrize(
    ("token", "code"),
    [
        ("nao-e-um-jwt", "invalid_token"),
        (_token(secret="outro-segredo-com-tamanho-suficiente-123"), "invalid_token"),
        (_token(alg="none", secret=None), "invalid_token"),
        (_token(sub="abc"), "invalid_token"),
        (_token(exp=datetime.now(UTC) - timedelta(seconds=1)), "token_expired"),
    ],
    ids=["lixo", "assinatura-errada", "alg-none", "sub-nao-numerico", "expirado"],
)
def test_me_token_invalido(client, make_user, token, code):
    make_user(email="ana@exemplo.com")  # id 1: o token só falha pelo motivo do caso
    res = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert_error(res, 401, code)


def test_token_de_usuario_desativado_deixa_de_valer(client, make_user, db):
    user = make_user(email="ana@exemplo.com")
    headers = auth_header(client, "ana@exemplo.com")
    user.is_active = False
    db.commit()
    assert_error(client.get("/api/auth/me", headers=headers), 401, "invalid_token")


def test_token_de_usuario_removido_deixa_de_valer(client):
    token, _ = create_access_token(999, "admin")
    res = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert_error(res, 401, "invalid_token")


# --- papéis --------------------------------------------------------------------------


@pytest.fixture
def role_client(client):
    """App mínimo com uma rota só de admin, sobre a mesma infraestrutura da API."""
    app = FastAPI()
    register_error_handlers(app)

    @app.get("/admin-only")
    def admin_only(user: AdminUser):
        return {"id": user.id}

    @app.get("/qualquer-papel")
    def any_role(user: CurrentUser):
        return {"role": user.role}

    with TestClient(app) as c:
        yield c


def test_analista_em_rota_de_admin_403(client, role_client, make_user):
    make_user(email="ana@exemplo.com", role="analyst")
    res = role_client.get("/admin-only", headers=auth_header(client, "ana@exemplo.com"))
    assert res.status_code == 403
    assert res.json()["error"]["code"] == "forbidden"


def test_admin_em_rota_de_admin_200(client, role_client, make_user):
    admin = make_user(email="chefe@exemplo.com", role="admin")
    res = role_client.get("/admin-only", headers=auth_header(client, "chefe@exemplo.com"))
    assert res.status_code == 200
    assert res.json() == {"id": admin.id}


def test_rota_de_admin_sem_token_401(role_client):
    assert role_client.get("/admin-only").status_code == 401


def test_papel_vem_do_banco_e_nao_do_token(client, role_client, make_user, db):
    user = make_user(email="ana@exemplo.com", role="admin")
    headers = auth_header(client, "ana@exemplo.com")  # token emitido com role=admin
    user.role = "analyst"
    db.commit()
    assert role_client.get("/admin-only", headers=headers).status_code == 403
    assert role_client.get("/qualquer-papel", headers=headers).json() == {"role": "analyst"}


# --- seed + login real ---------------------------------------------------------------


def test_usuarios_do_seed_fazem_login(client, db):
    from app.seed import run_seed

    run_seed(db)
    db.commit()
    password = get_settings().seed_demo_password
    for email, role in [("admin@nsights.demo", "admin"), ("analista@nsights.demo", "analyst")]:
        res = login(client, email, password)
        assert res.status_code == 200
        assert res.json()["user"]["role"] == role
