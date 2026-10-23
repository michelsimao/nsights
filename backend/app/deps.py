"""Dependências compartilhadas pelas rotas: sessão, usuário autenticado e papéis."""

from collections.abc import Callable
from typing import Annotated

import jwt
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.db import get_db
from app.errors import AppError
from app.models import User
from app.security import decode_access_token

# `auto_error=False`: a falta de token cai no nosso 401 com envelope padrão.
# `tokenUrl` é o que o botão Authorize do Swagger usa para fazer login.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

DbSession = Annotated[Session, Depends(get_db)]


def _unauthorized(code: str, message: str) -> AppError:
    return AppError(401, code, message, headers={"WWW-Authenticate": "Bearer"})


def get_current_user(db: DbSession, token: Annotated[str | None, Depends(oauth2_scheme)]) -> User:
    """Usuário dono do token. Papel e status vêm do banco, não do token:
    desativar um usuário ou mudar seu papel vale já na próxima requisição."""
    if not token:
        raise _unauthorized("not_authenticated", "Autenticação necessária.")
    try:
        claims = decode_access_token(token)
        user_id = int(claims["sub"])
    except jwt.ExpiredSignatureError:
        raise _unauthorized("token_expired", "Sessão expirada. Entre novamente.") from None
    except (jwt.InvalidTokenError, ValueError):
        raise _unauthorized("invalid_token", "Token inválido.") from None

    user = db.get(User, user_id)
    if user is None or not user.is_active:
        raise _unauthorized("invalid_token", "Token inválido.")
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]


def require_role(*roles: str) -> Callable[[User], User]:
    """Dependência que exige um dos papéis. Uso: `Depends(require_role("admin"))`."""

    def checker(user: CurrentUser) -> User:
        if user.role not in roles:
            raise AppError(403, "forbidden", "Seu perfil não tem permissão para esta operação.")
        return user

    return checker


AdminUser = Annotated[User, Depends(require_role("admin"))]
