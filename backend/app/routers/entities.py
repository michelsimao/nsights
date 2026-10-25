from typing import Annotated, Literal

from fastapi import APIRouter, Depends, Path, Query, status
from sqlalchemy import func, or_, select
from sqlalchemy.exc import IntegrityError

from app.deps import CurrentUser, DbSession
from app.errors import AppError, error_responses
from app.models import TERMINAL_STATUSES, Case, Entity
from app.pagination import PageParams, count, like_pattern, page_params
from app.schemas import (
    PG_INT_MAX,
    CaseBrief,
    EntityCreate,
    EntityDetail,
    EntityKind,
    EntityOut,
    Page,
)
from app.validators import only_digits

router = APIRouter(prefix="/api/entities", tags=["entities"])

EntitySort = Literal["name", "-name", "created_at", "-created_at"]
_SORT_COLUMNS = {"name": Entity.name, "created_at": Entity.created_at}


def _case_counts():
    active = Case.status.not_in(TERMINAL_STATUSES)
    return (
        select(
            Case.entity_id,
            func.count().label("case_count"),
            func.count().filter(active).label("active_case_count"),
        )
        .group_by(Case.entity_id)
        .subquery()
    )


def _with_counts():
    counts = _case_counts()
    return select(
        Entity,
        func.coalesce(counts.c.case_count, 0),
        func.coalesce(counts.c.active_case_count, 0),
    ).outerjoin(counts, counts.c.entity_id == Entity.id)


def _entity_out(row, model=EntityOut, **extra):
    entity, total, active = row
    return model.model_validate(
        {
            **EntityOut.model_validate(entity).model_dump(),
            "case_count": total,
            "active_case_count": active,
            **extra,
        }
    )


@router.get(
    "",
    response_model=Page[EntityOut],
    summary="Listar entidades",
    description=(
        "Busca por nome (parcial, sem diferenciar maiúsculas) ou por documento "
        "(com ou sem máscara, a partir de 3 dígitos). Inclui a contagem de casos."
    ),
    responses=error_responses(401, 422),
)
def list_entities(
    db: DbSession,
    _: CurrentUser,
    pagination: Annotated[PageParams, Depends(page_params)],
    q: Annotated[str | None, Query(max_length=100, description="Nome ou documento.")] = None,
    kind: Annotated[EntityKind | None, Query(description="`PF` ou `PJ`.")] = None,
    sort: Annotated[EntitySort, Query(description="Campo; prefixo `-` = decrescente.")] = "name",
) -> Page[EntityOut]:
    stmt = _with_counts()
    if q and (term := q.strip()):
        conditions = [Entity.name.ilike(like_pattern(term), escape="\\")]
        if len(digits := only_digits(term)) >= 3:
            conditions.append(Entity.document.contains(digits))
        stmt = stmt.where(or_(*conditions))
    if kind:
        stmt = stmt.where(Entity.kind == kind)

    total = count(db, stmt)
    column = _SORT_COLUMNS[sort.lstrip("-")]
    order = column.desc() if sort.startswith("-") else column.asc()
    rows = db.execute(
        stmt.order_by(order, Entity.id).offset(pagination.offset).limit(pagination.page_size)
    ).all()
    return Page[EntityOut](
        items=[_entity_out(r) for r in rows],
        total=total,
        page=pagination.page,
        page_size=pagination.page_size,
    )


@router.post(
    "",
    response_model=EntityOut,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar entidade",
    description=(
        "CPF/CNPJ aceito com ou sem máscara e gravado só com dígitos. Dígito verificador "
        "inválido → 422 no campo `document`. Documento já cadastrado → 409 "
        "`entity_exists`, com o id da entidade existente em `details`."
    ),
    responses=error_responses(401, 409, 422),
)
def create_entity(body: EntityCreate, db: DbSession, _: CurrentUser) -> EntityOut:
    existing = db.scalar(select(Entity.id).where(Entity.document == body.document))
    if existing is None:
        entity = Entity(kind=body.kind, document=body.document, name=body.name)
        db.add(entity)
        try:
            db.commit()
            return EntityOut.model_validate(entity)
        except IntegrityError:  # cadastro simultâneo do mesmo documento
            db.rollback()
            existing = db.scalar(select(Entity.id).where(Entity.document == body.document))
    raise AppError(
        409, "entity_exists", "Já existe uma entidade com este documento.", {"id": existing}
    )


@router.get(
    "/{entity_id}",
    response_model=EntityDetail,
    summary="Detalhar entidade",
    description="Dados da entidade e seus casos (mais recentes primeiro).",
    responses=error_responses(401, 404),
)
def get_entity(
    entity_id: Annotated[int, Path(ge=1, le=PG_INT_MAX)], db: DbSession, _: CurrentUser
) -> EntityDetail:
    row = db.execute(_with_counts().where(Entity.id == entity_id)).one_or_none()
    if row is None:
        raise AppError(404, "not_found", "Entidade não encontrada.")
    cases = db.scalars(
        select(Case)
        .where(Case.entity_id == entity_id)
        .order_by(Case.created_at.desc(), Case.id.desc())
    ).all()
    return _entity_out(row, EntityDetail, cases=[CaseBrief.model_validate(c) for c in cases])
