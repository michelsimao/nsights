"""Funções auxiliares dos testes de API."""

PASSWORD = "senha-forte-123"


def login(client, email, password=PASSWORD):
    return client.post("/api/auth/login", data={"username": email, "password": password})


def auth_header(client, email, password=PASSWORD) -> dict[str, str]:
    res = login(client, email, password)
    assert res.status_code == 200, res.text
    return {"Authorization": f"Bearer {res.json()['access_token']}"}


CPF = "529.982.247-25"
CNPJ = "11.222.333/0001-81"


def create_entity(client, headers, document=CNPJ, kind="PJ", name="Exemplo Comércio Ltda."):
    res = client.post(
        "/api/entities", json={"kind": kind, "document": document, "name": name}, headers=headers
    )
    assert res.status_code == 201, res.text
    return res.json()


def create_case(client, headers, entity_id, **fields):
    body = {"entity_id": entity_id, "title": "Alerta de PEP", "risk_score": 50, **fields}
    res = client.post("/api/cases", json=body, headers=headers)
    assert res.status_code == 201, res.text
    return res.json()


def set_status(client, headers, ref, status, message=None):
    body = {"status": status} if message is None else {"status": status, "message": message}
    return client.post(f"/api/cases/{ref}/status", json=body, headers=headers)
