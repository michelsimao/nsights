"""Modelos do domínio. Refletem o schema em `alembic upgrade head`."""

from datetime import datetime
from typing import Any

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    Computed,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Sequence,
    String,
    Text,
    func,
    text,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

ROLES = ("analyst", "admin")
ENTITY_KINDS = ("PF", "PJ")
CASE_STATUSES = ("aberto", "em_analise", "aprovado", "reprovado")
TERMINAL_STATUSES = ("aprovado", "reprovado")
RISK_LEVELS = ("baixo", "medio", "alto")
EVENT_TYPES = ("created", "note", "status_change", "assignment", "update")

# Faixas do score (0–100) → nível. Fonte única: a coluna gerada no banco.
RISK_LEVEL_SQL = (
    "CASE WHEN risk_score >= 70 THEN 'alto' WHEN risk_score >= 40 THEN 'medio' ELSE 'baixo' END"
)
# Prazo de análise por nível de risco, em dias.
SLA_DAYS = {"alto": 3, "medio": 7, "baixo": 15}

case_code_seq = Sequence("case_code_seq", metadata=Base.metadata)
CASE_CODE_DEFAULT = (
    "'RK-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('case_code_seq')::text, 4, '0')"
)


def _in(values: tuple[str, ...]) -> str:
    return ", ".join(f"'{v}'" for v in values)


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )


class User(TimestampMixin, Base):
    __tablename__ = "users"
    __table_args__ = (CheckConstraint(f"role IN ({_in(ROLES)})", name="role"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    # Sempre minúsculo; a normalização é feita na escrita.
    email: Mapped[str] = mapped_column(String(254), nullable=False, unique=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("true"))


class Entity(TimestampMixin, Base):
    __tablename__ = "entities"
    __table_args__ = (
        CheckConstraint(f"kind IN ({_in(ENTITY_KINDS)})", name="kind"),
        CheckConstraint(
            "document ~ '^[0-9]+$' AND ((kind = 'PF' AND length(document) = 11) "
            "OR (kind = 'PJ' AND length(document) = 14))",
            name="document_format",
        ),
        Index(
            "ix_entities_name_trgm",
            "name",
            postgresql_using="gin",
            postgresql_ops={"name": "gin_trgm_ops"},
        ),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    kind: Mapped[str] = mapped_column(String(2), nullable=False)
    # Só dígitos: CPF (11) ou CNPJ (14). Dígito verificador validado na API.
    document: Mapped[str] = mapped_column(String(14), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)

    cases: Mapped[list["Case"]] = relationship(back_populates="entity")


class Case(TimestampMixin, Base):
    __tablename__ = "cases"
    __table_args__ = (
        CheckConstraint(f"status IN ({_in(CASE_STATUSES)})", name="status"),
        CheckConstraint("risk_score BETWEEN 0 AND 100", name="risk_score_range"),
        CheckConstraint(
            f"(status IN ({_in(TERMINAL_STATUSES)})) = (closed_at IS NOT NULL)",
            name="closed_at_matches_status",
        ),
        Index(
            "ix_cases_title_trgm",
            "title",
            postgresql_using="gin",
            postgresql_ops={"title": "gin_trgm_ops"},
        ),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str] = mapped_column(
        String(20), nullable=False, unique=True, server_default=text(CASE_CODE_DEFAULT)
    )
    entity_id: Mapped[int] = mapped_column(
        ForeignKey("entities.id", ondelete="RESTRICT"), nullable=False, index=True
    )
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    status: Mapped[str] = mapped_column(
        String(20), nullable=False, server_default=text("'aberto'"), index=True
    )
    risk_score: Mapped[int] = mapped_column(Integer, nullable=False)
    risk_level: Mapped[str] = mapped_column(
        String(10), Computed(RISK_LEVEL_SQL, persisted=True), index=True
    )
    assignee_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), index=True
    )
    created_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"))
    due_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    closed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    entity: Mapped[Entity] = relationship(back_populates="cases")
    assignee: Mapped[User | None] = relationship(foreign_keys=[assignee_id])
    created_by: Mapped[User | None] = relationship(foreign_keys=[created_by_id])
    events: Mapped[list["CaseEvent"]] = relationship(
        back_populates="case", order_by="CaseEvent.created_at", passive_deletes=True
    )


# Índice da listagem padrão (mais recentes primeiro).
Index("ix_cases_created_at", Case.created_at.desc())


class CaseEvent(Base):
    __tablename__ = "case_events"
    __table_args__ = (
        CheckConstraint(f"type IN ({_in(EVENT_TYPES)})", name="type"),
        Index("ix_case_events_case_id_created_at", "case_id", "created_at"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    case_id: Mapped[int] = mapped_column(ForeignKey("cases.id", ondelete="CASCADE"), nullable=False)
    author_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"))
    type: Mapped[str] = mapped_column(String(20), nullable=False)
    message: Mapped[str | None] = mapped_column(Text)
    # Detalhes estruturados: {"from": "aberto", "to": "em_analise"}, campos alterados etc.
    payload: Mapped[dict[str, Any]] = mapped_column(
        JSONB, nullable=False, server_default=text("'{}'::jsonb")
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    case: Mapped[Case] = relationship(back_populates="events")
    author: Mapped[User | None] = relationship()
