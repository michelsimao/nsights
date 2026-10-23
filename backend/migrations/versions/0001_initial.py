"""Schema inicial: usuários, entidades, casos e eventos.

Revision ID: 0001_initial
Revises:
Create Date: 2026-10-23
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0001_initial"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

RISK_LEVEL_SQL = (
    "CASE WHEN risk_score >= 70 THEN 'alto' WHEN risk_score >= 40 THEN 'medio' ELSE 'baixo' END"
)
CASE_CODE_DEFAULT = (
    "'RK-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('case_code_seq')::text, 4, '0')"
)


def _timestamps() -> list[sa.Column]:
    return [
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
    ]


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(120), nullable=False),
        sa.Column("email", sa.String(254), nullable=False),
        sa.Column("password_hash", sa.String(255), nullable=False),
        sa.Column("role", sa.String(20), nullable=False),
        sa.Column("is_active", sa.Boolean(), server_default=sa.text("true"), nullable=False),
        *_timestamps(),
        sa.CheckConstraint("role IN ('analyst', 'admin')", name=op.f("ck_users_role")),
        sa.UniqueConstraint("email", name=op.f("uq_users_email")),
    )

    op.create_table(
        "entities",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("kind", sa.String(2), nullable=False),
        sa.Column("document", sa.String(14), nullable=False),
        sa.Column("name", sa.String(200), nullable=False),
        *_timestamps(),
        sa.CheckConstraint("kind IN ('PF', 'PJ')", name=op.f("ck_entities_kind")),
        sa.CheckConstraint(
            "document ~ '^[0-9]+$' AND ((kind = 'PF' AND length(document) = 11) "
            "OR (kind = 'PJ' AND length(document) = 14))",
            name=op.f("ck_entities_document_format"),
        ),
        sa.UniqueConstraint("document", name=op.f("uq_entities_document")),
    )

    op.execute("CREATE SEQUENCE case_code_seq")
    op.create_table(
        "cases",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("code", sa.String(20), server_default=sa.text(CASE_CODE_DEFAULT), nullable=False),
        sa.Column(
            "entity_id",
            sa.Integer(),
            sa.ForeignKey(
                "entities.id", name=op.f("fk_cases_entity_id_entities"), ondelete="RESTRICT"
            ),
            nullable=False,
        ),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("status", sa.String(20), server_default=sa.text("'aberto'"), nullable=False),
        sa.Column("risk_score", sa.Integer(), nullable=False),
        sa.Column("risk_level", sa.String(10), sa.Computed(RISK_LEVEL_SQL, persisted=True)),
        sa.Column(
            "assignee_id",
            sa.Integer(),
            sa.ForeignKey("users.id", name=op.f("fk_cases_assignee_id_users"), ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column(
            "created_by_id",
            sa.Integer(),
            sa.ForeignKey(
                "users.id", name=op.f("fk_cases_created_by_id_users"), ondelete="SET NULL"
            ),
            nullable=True,
        ),
        *_timestamps(),
        sa.CheckConstraint(
            "status IN ('aberto', 'em_analise', 'aprovado', 'reprovado')",
            name=op.f("ck_cases_status"),
        ),
        sa.CheckConstraint("risk_score BETWEEN 0 AND 100", name=op.f("ck_cases_risk_score_range")),
        sa.UniqueConstraint("code", name=op.f("uq_cases_code")),
    )
    op.execute("ALTER SEQUENCE case_code_seq OWNED BY cases.code")
    op.create_index(op.f("ix_cases_entity_id"), "cases", ["entity_id"])
    op.create_index(op.f("ix_cases_status"), "cases", ["status"])
    op.create_index(op.f("ix_cases_risk_level"), "cases", ["risk_level"])
    op.create_index(op.f("ix_cases_assignee_id"), "cases", ["assignee_id"])
    op.create_index("ix_cases_created_at", "cases", [sa.text("created_at DESC")])

    op.create_table(
        "case_events",
        sa.Column("id", sa.BigInteger(), primary_key=True),
        sa.Column(
            "case_id",
            sa.Integer(),
            sa.ForeignKey(
                "cases.id", name=op.f("fk_case_events_case_id_cases"), ondelete="CASCADE"
            ),
            nullable=False,
        ),
        sa.Column(
            "author_id",
            sa.Integer(),
            sa.ForeignKey(
                "users.id", name=op.f("fk_case_events_author_id_users"), ondelete="SET NULL"
            ),
            nullable=True,
        ),
        sa.Column("type", sa.String(20), nullable=False),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column(
            "payload",
            postgresql.JSONB(),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.CheckConstraint(
            "type IN ('created', 'note', 'status_change', 'assignment', 'update')",
            name=op.f("ck_case_events_type"),
        ),
    )
    op.create_index("ix_case_events_case_id_created_at", "case_events", ["case_id", "created_at"])


def downgrade() -> None:
    op.drop_table("case_events")
    op.drop_table("cases")  # a sequence OWNED BY cai junto
    op.drop_table("entities")
    op.drop_table("users")
