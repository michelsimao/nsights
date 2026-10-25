from datetime import UTC, datetime
from typing import Annotated, Literal

from fastapi import APIRouter, Depends, Path, Query, status
from sqlalchemy import or_, select
from sqlalchemy.orm import contains_eager, selectinload

from app import cases as svc
from app.deps import CurrentUser, DbSession
from app.errors import AppError, error_responses, field_error
from app.models import TERMINAL_STATUSES, Case, Entity, User
from app.pagination import PageParams, count, like_pattern, page_params
from app.schemas import (
    PG_INT_MAX,
    AssignmentIn,
    CaseCreate,
    CaseDetail,
    CaseEventOut,
    CaseListItem,
    CaseStatus,
    CaseUpdate,
    NoteCreate,
    Page,
    RiskLevel,
    StatusChange,
)
from app.validators import only_digits

router = APIRouter(prefix="/api/cases", tags=["cases"])

CaseSort = Literal[
    "created_at", "-created_at", "updated_at", "-updated_at", "due_at", "-due_at",
    "risk_score", "-risk_score", "code", "-code", "status", "-status",
]  # fmt: skip
# Lista fechada: o parâmetro `sort` nunca chega ao SQL como texto.
_SORT_COLUMNS = {
    "created_at": Case.created_at,
    "updated_at": Case.updated_at,
    "due_at": Case.due_at,
    "risk_score": Case.risk_score,
    "code": Case.code,
    "status": Case.status,
}

CaseRef = Annotated[
    str,
    Path(
        pattern=r"^(\d+|[A-Za-z]{2}-\d{4}-\d+)$",
        description="Id numérico ou código do caso (`RK-2026-0001`).",
        examples=["RK-2026-0001"],
    ),
]


def _detail(db: DbSession, ref: str, user: User) -> CaseDetail:
    """Lê o caso do banco já com os relacionamentos e as permissões do usuário."""
    db.expire_all()  # depois de uma escrita, relê valores gerados pelo banco
    case = svc.get_case(db, ref)
    return CaseDetail.model_validate(case).model_copy(
        update={
            "allowed_transitions": svc.allowed_transitions(case, user),
            "can_edit": case.status not in TERMINAL_STATUSES,
            "can_assign": svc.can_assign(user) and case.status not in TERMINAL_STATUSES,
        }
    )


@router.get(
    "",
    response_model=Page[CaseListItem],
    summary="Listar casos",
    description=(
        "Filtros combináveis (E entre filtros; OU dentro de `status` e `risk_level`, que "
        "aceitam repetição: `?status=aberto&status=em_analise`).\n\n"
        "`q` busca no código, no título, no nome da entidade e no documento (com ou sem "
        "máscara). `assignee`: id do usuário, `me` ou `none` (sem responsável)."
    ),
    responses=error_responses(401, 422),
)
def list_cases(
    db: DbSession,
    user: CurrentUser,
    pagination: Annotated[PageParams, Depends(page_params)],
    q: Annotated[str | None, Query(max_length=100)] = None,
    status_: Annotated[list[CaseStatus] | None, Query(alias="status")] = None,
    risk_level: Annotated[list[RiskLevel] | None, Query()] = None,
    assignee: Annotated[
        str | None,
        Query(pattern=r"^(\d{1,10}|me|none)$", description="Id, `me` ou `none`."),
    ] = None,
    entity_id: Annotated[int | None, Query(ge=1, le=PG_INT_MAX)] = None,
    overdue: Annotated[
        bool | None, Query(description="`true`: só ativos com prazo vencido.")
    ] = None,
    sort: Annotated[CaseSort, Query(description="Campo; prefixo `-` = decrescente.")] = (
        "-created_at"
    ),
) -> Page[CaseListItem]:
    stmt = select(Case).join(Case.entity)
    if q and (term := q.strip()):
        pattern = like_pattern(term)
        conditions = [
            Case.code.ilike(pattern, escape="\\"),
            Case.title.ilike(pattern, escape="\\"),
            Entity.name.ilike(pattern, escape="\\"),
        ]
        if len(digits := only_digits(term)) >= 3:
            conditions.append(Entity.document.contains(digits))
        stmt = stmt.where(or_(*conditions))
    if status_:
        stmt = stmt.where(Case.status.in_(status_))
    if risk_level:
        stmt = stmt.where(Case.risk_level.in_(risk_level))
    if assignee == "none":
        stmt = stmt.where(Case.assignee_id.is_(None))
    elif assignee == "me":
        stmt = stmt.where(Case.assignee_id == user.id)
    elif assignee is not None:
        if int(assignee) > PG_INT_MAX:
            raise field_error("assignee", f"Deve ser menor ou igual a {PG_INT_MAX}.", "query")
        stmt = stmt.where(Case.assignee_id == int(assignee))
    if entity_id is not None:
        stmt = stmt.where(Case.entity_id == entity_id)
    if overdue is not None:
        late = Case.status.not_in(TERMINAL_STATUSES) & (Case.due_at < datetime.now(UTC))
        stmt = stmt.where(late if overdue else ~late)

    total = count(db, stmt)
    column = _SORT_COLUMNS[sort.lstrip("-")]
    order = column.desc() if sort.startswith("-") else column.asc()
    cases = db.scalars(
        stmt.options(contains_eager(Case.entity), selectinload(Case.assignee))
        .order_by(order, Case.id.desc())
        .offset(pagination.offset)
        .limit(pagination.page_size)
    ).all()
    return Page[CaseListItem](
        items=[CaseListItem.model_validate(c) for c in cases],
        total=total,
        page=pagination.page,
        page_size=pagination.page_size,
    )


@router.post(
    "",
    response_model=CaseDetail,
    status_code=status.HTTP_201_CREATED,
    summary="Abrir caso",
    description=(
        "O código (`RK-AAAA-NNNN`) é gerado pelo banco. Sem `due_at`, o prazo é calculado "
        "pelo nível de risco. A timeline começa com o evento `created` (e `assignment`, "
        "se houver responsável)."
    ),
    responses=error_responses(401, 403, 422),
)
def create_case(body: CaseCreate, db: DbSession, user: CurrentUser) -> CaseDetail:
    case = svc.create_case(db, user, **body.model_dump())
    db.commit()
    return _detail(db, str(case.id), user)


@router.get(
    "/{ref}",
    response_model=CaseDetail,
    summary="Detalhar caso",
    description="Dados do caso, timeline completa e as ações que o usuário atual pode executar.",
    responses=error_responses(401, 404),
)
def get_case(ref: CaseRef, db: DbSession, user: CurrentUser) -> CaseDetail:
    return _detail(db, ref, user)


@router.patch(
    "/{ref}",
    response_model=CaseDetail,
    summary="Editar caso",
    description=(
        "Edição parcial de título, descrição, score e prazo; gera um evento `update` com o "
        "antes e depois de cada campo. Status e responsável têm rotas próprias. "
        "Caso encerrado → 409 `case_closed`."
    ),
    responses=error_responses(401, 404, 409, 422),
)
def update_case(ref: CaseRef, body: CaseUpdate, db: DbSession, user: CurrentUser) -> CaseDetail:
    case = svc.get_case(db, ref, for_update=True)
    svc.update_case(db, case, user, body.model_dump(exclude_unset=True))
    db.commit()
    return _detail(db, ref, user)


@router.post(
    "/{ref}/status",
    response_model=CaseDetail,
    summary="Mudar status",
    description=(
        "Transições permitidas:\n\n"
        "| de | para | quem |\n|---|---|---|\n"
        "| aberto | em_analise | analista, admin |\n"
        "| em_analise | aberto | analista, admin |\n"
        "| em_analise | aprovado | admin |\n"
        "| em_analise | reprovado | admin (justificativa obrigatória) |\n\n"
        "Aprovado e reprovado são terminais. Transição inexistente → 409 "
        "`invalid_transition`; papel sem permissão → 403. Quem inicia a análise de um caso "
        "sem responsável passa a ser o responsável."
    ),
    responses=error_responses(401, 403, 404, 409, 422),
)
def change_status(ref: CaseRef, body: StatusChange, db: DbSession, user: CurrentUser) -> CaseDetail:
    case = svc.get_case(db, ref, for_update=True)
    svc.transition_case(db, case, user, body.status, body.message)
    db.commit()
    return _detail(db, ref, user)


@router.post(
    "/{ref}/assignee",
    response_model=CaseDetail,
    summary="Reatribuir responsável",
    description="Somente admin. `assignee_id: null` remove o responsável. Caso encerrado → 409.",
    responses=error_responses(401, 403, 404, 409, 422),
)
def assign(ref: CaseRef, body: AssignmentIn, db: DbSession, user: CurrentUser) -> CaseDetail:
    if not svc.can_assign(user):  # antes do lock: não trava a linha à toa
        raise AppError(403, "forbidden", "Só administradores podem reatribuir casos.")
    case = svc.get_case(db, ref, for_update=True)
    svc.assign_case(db, case, user, body.assignee_id)
    db.commit()
    return _detail(db, ref, user)


@router.post(
    "/{ref}/notes",
    response_model=CaseEventOut,
    status_code=status.HTTP_201_CREATED,
    summary="Adicionar nota",
    description="Registra uma nota na timeline. Permitido também em casos encerrados.",
    responses=error_responses(401, 404, 422),
)
def add_note(ref: CaseRef, body: NoteCreate, db: DbSession, user: CurrentUser) -> CaseEventOut:
    case = svc.get_case(db, ref, for_update=True)
    event = svc.add_note(db, case, user, body.message)
    db.commit()
    db.refresh(event)
    return CaseEventOut.model_validate(event)
