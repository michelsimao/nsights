"""Funções auxiliares dos testes de API."""

PASSWORD = "senha-forte-123"


def login(client, email, password=PASSWORD):
    return client.post("/api/auth/login", data={"username": email, "password": password})


def auth_header(client, email, password=PASSWORD) -> dict[str, str]:
    res = login(client, email, password)
    assert res.status_code == 200, res.text
    return {"Authorization": f"Bearer {res.json()['access_token']}"}
