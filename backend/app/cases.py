"""Regras de negócio dos casos: transições de status, papéis, edição e timeline.

Toda mudança grava o evento correspondente na mesma sessão; quem chama faz um
único commit, então caso e evento entram (ou falham) juntos.
"""

from datetime import UTC, datetime, timedelta
from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.errors import AppError, field_error
from app.models import SLA_DAYS, TERMINAL_STATUSES, Case, CaseEvent, Entity, User

ANY_ROLE = frozenset({"analyst", "admin"})
ADMIN = frozenset({"admin"})

# Matriz de transições: (de, para) → papéis autorizados. Fora daqui, a transição não existe.
TRANSITIONS: dict[tuple[str, str], frozenset[str]] = {
    ("aberto", "em_analise"): ANY_ROLE,
    ("em_analise", "aberto"): ANY_ROLE,  # devolve o caso para a fila
    ("em_analise", "aprovado"): ADMIN,
    ("em_analise", "reprovado"): ADMIN,
}
# Reprovar exige justificativa registrada na timeline.
MESSAGE_REQUIRED = {"reprovado"}

DEFAULT_STATUS_MESSAGES = {
    "em_analise": "Análise iniciada.",
    "aberto": "Caso devolvido para a fila.",
    "aprovado": "Caso aprovado.",
    "reprovado": "Caso reprovado.",
}


def risk_level_for(score: int) -> str:
    """Mesma faixa da coluna gerada `cases.risk_level` (fonte de verdade no banco)."""
    return "alto" if score >= 70 else "medio" if score >= 40 else "baixo"


def can_assign(user: User) -> bool:
    return user.role == "admin"


def allowed_transitions(case: Case, user: User) -> list[str]:
    return [
        to for (frm, to), roles in TRANSITIONS.items() if frm == case.status and user.role in roles
    ]


def _user_ref(user: User | None) -> dict[str, Any] | None:
    return {"id": user.id, "name": user.name} if user else None


def _add_event(
    db: Session,
    case: Case,
    actor: User,
    type_: str,
    message: str | None = None,
    payload: dict[str, Any] | None = None,
) -> CaseEvent:
    event = CaseEvent(case=case, author=actor, type=type_, message=message, payload=payload or {})
    db.add(event)
    return event


def _ensure_open(case: Case) -> None:
    if case.status in TERMINAL_STATUSES:
        raise AppError(
            409,
            "case_closed",
            f"O caso {case.code} está encerrado ({case.status}) e não pode ser alterado.",
        )


def _active_user(db: Session, user_id: int, field: str) -> User:
    user = db.get(User, user_id)
    if user is None or not user.is_active:
        raise field_error(field, "Usuário inexistente ou inativo.")
    return user


# --- leitura -------------------------------------------------------------------------


def get_case(db: Session, ref: str, *, for_update: bool = False) -> Case:
    """Busca por id numérico ou por código (`RK-2026-0001`). 404 se não existir."""
    stmt = select(Case)
    stmt = (
        stmt.where(Case.id == int(ref)) if ref.isdigit() else stmt.where(Case.code == ref.upper())
    )
    if for_update:
        # Trava a linha: duas transições simultâneas não passam ambas pela validação.
        stmt = stmt.with_for_update()
    else:
        stmt = stmt.options(
            selectinload(Case.entity),
            selectinload(Case.assignee),
            selectinload(Case.created_by),
            selectinload(Case.events).selectinload(CaseEvent.author),
        )
    case = db.scalar(stmt)
    if case is None:
        raise AppError(404, "not_found", "Caso não encontrado.")
    return case


# --- escrita -------------------------------------------------------------------------


def create_case(
    db: Session,
    actor: User,
    *,
    entity_id: int,
    title: str,
    description: str | None,
    risk_score: int,
    assignee_id: int | None,
    due_at: datetime | None,
) -> Case:
    if db.get(Entity, entity_id) is None:
        raise field_error("entity_id", "Entidade não encontrada.")
    assignee = None
    if assignee_id is not None:
        if assignee_id != actor.id and not can_assign(actor):
            raise AppError(403, "forbidden", "Analistas só podem atribuir o caso a si mesmos.")
        assignee = _active_user(db, assignee_id, "assignee_id")

    now = datetime.now(UTC)
    case = Case(
        entity_id=entity_id,
        title=title,
        description=description,
        risk_score=risk_score,
        assignee=assignee,
        created_by=actor,
        due_at=due_at or now + timedelta(days=SLA_DAYS[risk_level_for(risk_score)]),
    )
    db.add(case)
    _add_event(db, case, actor, "created", "Caso aberto.")
    if assignee is not None:
        _add_event(db, case, actor, "assignment", None, {"from": None, "to": _user_ref(assignee)})
    db.flush()
    return case


def update_case(db: Session, case: Case, actor: User, changes: dict[str, Any]) -> Case:
    _ensure_open(case)
    diff = {}
    for field, new in changes.items():
        old = getattr(case, field)
        if old != new:
            setattr(case, field, new)
            diff[field] = {
                "from": old.isoformat() if isinstance(old, datetime) else old,
                "to": new.isoformat() if isinstance(new, datetime) else new,
            }
    if diff:
        _add_event(db, case, actor, "update", "Caso editado.", {"changes": diff})
        db.flush()
    return case


def transition_case(
    db: Session, case: Case, actor: User, to_status: str, message: str | None = None
) -> Case:
    """Única porta para mudar status. 409: transição inexistente; 403: papel sem permissão."""
    from_status = case.status
    roles = TRANSITIONS.get((from_status, to_status))
    if roles is None:
        _ensure_open(case)
        raise AppError(
            409,
            "invalid_transition",
            f"Transição de '{from_status}' para '{to_status}' não é permitida.",
            {"from": from_status, "to": to_status, "allowed": allowed_transitions(case, actor)},
        )
    if actor.role not in roles:
        raise AppError(
            403, "forbidden", f"Só administradores podem mover casos para '{to_status}'."
        )
    if to_status in MESSAGE_REQUIRED and not message:
        raise field_error("message", "Informe a justificativa.")

    case.status = to_status
    case.closed_at = datetime.now(UTC) if to_status in TERMINAL_STATUSES else None
    _add_event(
        db,
        case,
        actor,
        "status_change",
        message or DEFAULT_STATUS_MESSAGES[to_status],
        {"from": from_status, "to": to_status},
    )
    # Quem inicia a análise de um caso sem responsável assume o caso.
    if to_status == "em_analise" and case.assignee_id is None:
        _assign(db, case, actor, actor)
    db.flush()
    return case


def _assign(db: Session, case: Case, actor: User, assignee: User | None) -> None:
    previous = case.assignee
    case.assignee = assignee
    _add_event(
        db,
        case,
        actor,
        "assignment",
        None,
        {"from": _user_ref(previous), "to": _user_ref(assignee)},
    )


def assign_case(db: Session, case: Case, actor: User, assignee_id: int | None) -> Case:
    if not can_assign(actor):
        raise AppError(403, "forbidden", "Só administradores podem reatribuir casos.")
    _ensure_open(case)
    assignee = _active_user(db, assignee_id, "assignee_id") if assignee_id is not None else None
    if case.assignee_id != (assignee.id if assignee else None):
        _assign(db, case, actor, assignee)
        db.flush()
    return case


def add_note(db: Session, case: Case, actor: User, message: str) -> CaseEvent:
    # Notas são permitidas mesmo em casos encerrados: complementam o histórico, não o alteram.
    event = _add_event(db, case, actor, "note", message)
    case.updated_at = datetime.now(UTC)
    db.flush()
    return event
