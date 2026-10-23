from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select

from app.deps import CurrentUser, DbSession
from app.errors import AppError, error_responses
from app.models import User
from app.schemas import TokenOut, UserOut
from app.security import DUMMY_PASSWORD_HASH, create_access_token, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post(
    "/login",
    response_model=TokenOut,
    summary="Entrar",
    description=(
        "Formulário OAuth2 *password* (`application/x-www-form-urlencoded`): o campo "
        "`username` recebe o **email**. Devolve um JWT para o header "
        "`Authorization: Bearer <token>`.\n\n"
        "Email inexistente, senha errada e usuário inativo recebem a mesma resposta 401 "
        "(`invalid_credentials`), para não revelar quais contas existem.\n\n"
        "No Swagger, use o botão **Authorize** com as credenciais demo "
        "(ex.: `admin@nsights.demo` / `riskops123`)."
    ),
    responses=error_responses(401, 422),
)
def login(form: Annotated[OAuth2PasswordRequestForm, Depends()], db: DbSession) -> TokenOut:
    email = form.username.strip().lower()
    user = db.scalar(select(User).where(User.email == email))
    # Verifica um hash mesmo sem usuário: o tempo de resposta não denuncia o email.
    hashed = user.password_hash if user else DUMMY_PASSWORD_HASH
    password_ok = verify_password(form.password, hashed)
    if user is None or not password_ok or not user.is_active:
        raise AppError(
            401,
            "invalid_credentials",
            "Email ou senha inválidos.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token, expires_in = create_access_token(user.id, user.role)
    return TokenOut(access_token=token, expires_in=expires_in, user=UserOut.model_validate(user))


@router.get(
    "/me",
    response_model=UserOut,
    summary="Usuário autenticado",
    description="Dados do dono do token. O front usa para restaurar a sessão ao recarregar.",
    responses=error_responses(401),
)
def me(user: CurrentUser) -> User:
    return user
