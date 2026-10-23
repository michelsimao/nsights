from datetime import UTC, datetime, timedelta
from typing import Any

import jwt
from pwdlib import PasswordHash

from app.config import get_settings

JWT_ALGORITHM = "HS256"

# Argon2id com os parâmetros recomendados do pwdlib.
password_hash = PasswordHash.recommended()


def hash_password(plain: str) -> str:
    return password_hash.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    return password_hash.verify(plain, hashed)


# Hash fixo usado quando o email não existe: a verificação custa o mesmo tempo
# e a resposta não revela quais emails estão cadastrados.
DUMMY_PASSWORD_HASH = password_hash.hash("riskops-dummy-password")


def create_access_token(user_id: int, role: str) -> tuple[str, int]:
    """JWT HS256 com `sub`, `role`, `iat` e `exp`. Devolve o token e a validade em segundos."""
    settings = get_settings()
    now = datetime.now(UTC)
    expires_in = settings.jwt_expire_minutes * 60
    claims = {
        "sub": str(user_id),
        "role": role,
        "iat": now,
        "exp": now + timedelta(seconds=expires_in),
    }
    return jwt.encode(claims, settings.jwt_secret, algorithm=JWT_ALGORITHM), expires_in


def decode_access_token(token: str) -> dict[str, Any]:
    """Valida assinatura, algoritmo e expiração. Levanta `jwt.InvalidTokenError`."""
    return jwt.decode(
        token,
        get_settings().jwt_secret,
        algorithms=[JWT_ALGORITHM],
        options={"require": ["sub", "exp", "iat"]},
    )
