from typing import Annotated, Literal

from fastapi import APIRouter, Query
from sqlalchemy import select

from app.deps import CurrentUser, DbSession
from app.errors import error_responses
from app.models import User
from app.schemas import UserListItem

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get(
    "",
    response_model=list[UserListItem],
    summary="Listar usuários ativos",
    description="Usuários ativos, por nome. Usado para escolher o responsável de um caso.",
    responses=error_responses(401, 422),
)
def list_users(
    db: DbSession,
    _: CurrentUser,
    role: Annotated[Literal["analyst", "admin"] | None, Query()] = None,
) -> list[User]:
    stmt = select(User).where(User.is_active).order_by(User.name)
    if role:
        stmt = stmt.where(User.role == role)
    return list(db.scalars(stmt))
