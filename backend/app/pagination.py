"""Paginação por offset/limit e busca textual compartilhadas pelas listagens."""

from typing import Annotated

from fastapi import Query
from pydantic import BaseModel
from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.schemas import PG_INT_MAX

MAX_PAGE_SIZE = 100
# `page * page_size` precisa caber num bigint no OFFSET; o limite do int4 dá folga de sobra.
MAX_PAGE = PG_INT_MAX


class PageParams(BaseModel):
    page: int
    page_size: int

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.page_size


def page_params(
    page: Annotated[int, Query(ge=1, le=MAX_PAGE, description="Página, a partir de 1.")] = 1,
    page_size: Annotated[
        int, Query(ge=1, le=MAX_PAGE_SIZE, description="Itens por página (máx. 100).")
    ] = 20,
) -> PageParams:
    return PageParams(page=page, page_size=page_size)


def count(db: Session, stmt: Select) -> int:
    """Total do filtro, sem ordenação nem paginação."""
    return db.scalar(select(func.count()).select_from(stmt.order_by(None).subquery())) or 0


def like_pattern(term: str) -> str:
    """`%termo%` com `%`, `_` e `\\` escapados: o usuário busca texto, não padrões."""
    escaped = term.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")
    return f"%{escaped}%"
