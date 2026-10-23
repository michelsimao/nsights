"""Prazo e encerramento de casos; busca por trigramas.

Evolução sobre um banco que já tem dados:
1. adiciona `cases.due_at` e `cases.closed_at` como nulas;
2. preenche os casos existentes (`closed_at` pelo último status_change terminal,
   `due_at` pelo prazo do nível de risco);
3. torna `due_at` obrigatória e amarra `closed_at` ao status com um CHECK;
4. cria índices GIN de trigramas para a busca "contém" em nome e título.

Revision ID: 0002_case_deadlines_and_search
Revises: 0001_initial
Create Date: 2026-10-23
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "0002_case_deadlines_and_search"
down_revision: str | None = "0001_initial"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("cases", sa.Column("due_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("cases", sa.Column("closed_at", sa.DateTime(timezone=True), nullable=True))

    # Prazo: 3 dias (alto), 7 (médio), 15 (baixo) a partir da abertura.
    op.execute(
        """
        UPDATE cases SET due_at = created_at + CASE risk_level
            WHEN 'alto' THEN interval '3 days'
            WHEN 'medio' THEN interval '7 days'
            ELSE interval '15 days' END
        """
    )
    # Encerramento: o último status_change para o status terminal atual;
    # sem evento (dado legado), cai no updated_at.
    op.execute(
        """
        UPDATE cases c SET closed_at = COALESCE(
            (SELECT max(e.created_at) FROM case_events e
              WHERE e.case_id = c.id AND e.type = 'status_change'
                AND e.payload ->> 'to' = c.status),
            c.updated_at)
        WHERE c.status IN ('aprovado', 'reprovado')
        """
    )

    op.alter_column("cases", "due_at", nullable=False)
    op.create_check_constraint(
        op.f("ck_cases_closed_at_matches_status"),
        "cases",
        "(status IN ('aprovado', 'reprovado')) = (closed_at IS NOT NULL)",
    )

    op.execute("CREATE EXTENSION IF NOT EXISTS pg_trgm")
    op.create_index(
        "ix_entities_name_trgm",
        "entities",
        ["name"],
        postgresql_using="gin",
        postgresql_ops={"name": "gin_trgm_ops"},
    )
    op.create_index(
        "ix_cases_title_trgm",
        "cases",
        ["title"],
        postgresql_using="gin",
        postgresql_ops={"title": "gin_trgm_ops"},
    )


def downgrade() -> None:
    # A extensão pg_trgm fica: pode haver outros objetos dependendo dela.
    op.drop_index("ix_cases_title_trgm", table_name="cases")
    op.drop_index("ix_entities_name_trgm", table_name="entities")
    op.drop_constraint(op.f("ck_cases_closed_at_matches_status"), "cases", type_="check")
    op.drop_column("cases", "closed_at")
    op.drop_column("cases", "due_at")
