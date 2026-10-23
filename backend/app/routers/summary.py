from datetime import UTC, datetime

from fastapi import APIRouter
from sqlalchemy import func, select

from app.deps import CurrentUser, DbSession
from app.errors import error_responses
from app.models import CASE_STATUSES, RISK_LEVELS, TERMINAL_STATUSES, Case, User
from app.schemas import AssigneeSummary, SummaryOut, UserRef

router = APIRouter(prefix="/api/summary", tags=["summary"])


@router.get(
    "",
    response_model=SummaryOut,
    summary="Resumo da operação",
    description=(
        "Contagens para o painel: total por status; casos ativos (aberto ou em análise) "
        "por nível de risco e por responsável; atrasados (ativos com prazo vencido). "
        "Todas as chaves de status e de risco aparecem, mesmo com zero."
    ),
    responses=error_responses(401),
)
def summary(db: DbSession, _: CurrentUser) -> SummaryOut:
    active = Case.status.not_in(TERMINAL_STATUSES)
    overdue = active & (Case.due_at < datetime.now(UTC))

    by_status = dict.fromkeys(CASE_STATUSES, 0)
    by_status.update(db.execute(select(Case.status, func.count()).group_by(Case.status)).all())

    by_risk = dict.fromkeys(RISK_LEVELS, 0)
    by_risk.update(
        db.execute(
            select(Case.risk_level, func.count()).where(active).group_by(Case.risk_level)
        ).all()
    )

    rows = db.execute(
        select(User.id, User.name, func.count(), func.count().filter(overdue))
        .select_from(Case)
        .outerjoin(User, User.id == Case.assignee_id)
        .where(active)
        .group_by(User.id, User.name)
        .order_by(func.count().desc(), User.name.nulls_last())
    ).all()
    by_assignee = [
        AssigneeSummary(
            assignee=UserRef(id=uid, name=name) if uid is not None else None,
            active=n_active,
            overdue=n_overdue,
        )
        for uid, name, n_active, n_overdue in rows
    ]

    return SummaryOut(
        total=sum(by_status.values()),
        active=by_status["aberto"] + by_status["em_analise"],
        overdue=db.scalar(select(func.count()).select_from(Case).where(overdue)) or 0,
        by_status=by_status,
        by_risk_level=by_risk,
        by_assignee=by_assignee,
    )
