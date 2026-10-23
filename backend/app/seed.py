"""Dados de demonstração. Idempotente: cria o que falta e nunca sobrescreve.

Cada registro tem chave natural (email, documento, código do caso) e entra com
`ON CONFLICT DO NOTHING`; alterações feitas na demo sobrevivem a novos starts.
Eventos só são gravados para casos criados nesta execução. Tudo roda numa
transação com advisory lock, então execuções simultâneas não competem.

Uso: `python -m app.seed`
"""

import logging
from datetime import UTC, datetime, timedelta

from sqlalchemy import select, text
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session

from app.config import get_settings
from app.db import SessionLocal
from app.models import SLA_DAYS, TERMINAL_STATUSES, Case, CaseEvent, Entity, User
from app.observability import configure_logging
from app.validators import cnpj_with_check_digits, cpf_with_check_digits

log = logging.getLogger("riskops.seed")

SEED_LOCK_KEY = "riskops-seed"
CASE_YEAR = 2026
CASE_COUNT = 30

USERS = [
    {"email": "admin@nsights.demo", "name": "Marina Costa", "role": "admin"},
    {"email": "analista@nsights.demo", "name": "Rafael Lima", "role": "analyst"},
    {"email": "analista2@nsights.demo", "name": "Beatriz Souza", "role": "analyst"},
]

# Nomes fictícios; documentos com dígito verificador válido gerado a partir da base.
ENTITIES = [
    ("PF", cpf_with_check_digits("529982247"), "Carlos Eduardo Ramos"),
    ("PF", cpf_with_check_digits("714602318"), "Helena Martins Duarte"),
    ("PF", cpf_with_check_digits("382915604"), "João Pedro Albuquerque"),
    ("PF", cpf_with_check_digits("650218943"), "Larissa Nogueira Pinto"),
    ("PF", cpf_with_check_digits("903471256"), "Otávio Ferreira Campos"),
    ("PJ", cnpj_with_check_digits("112223330001"), "Agropecuária Boa Vista S.A."),
    ("PJ", cnpj_with_check_digits("456781230001"), "Transportes Rota Sul Ltda."),
    ("PJ", cnpj_with_check_digits("097345680001"), "Construtora Horizonte Azul Ltda."),
    ("PJ", cnpj_with_check_digits("238905610001"), "Fintech Pagare Instituição de Pagamento S.A."),
    ("PJ", cnpj_with_check_digits("771204390001"), "Comercial Atlântico Importadora Ltda."),
    ("PJ", cnpj_with_check_digits("540318270001"), "Mineração Serra Dourada S.A."),
    ("PJ", cnpj_with_check_digits("365027810001"), "Clínica Vida Plena Serviços Médicos Ltda."),
]

CASE_TOPICS = [
    "Onboarding KYC",
    "Revisão periódica de cadastro",
    "Alerta de PEP",
    "Mídia negativa",
    "Processo judicial relevante",
    "Alteração no quadro societário",
    "Movimentação atípica",
    "Verificação de sanções",
]

# Ciclo de status dos 30 casos: mistura todos os estados para o resumo ficar informativo.
STATUS_CYCLE = [
    "aberto", "em_analise", "aprovado", "em_analise", "reprovado",
    "aberto", "aprovado", "em_analise", "aprovado", "aberto",
]  # fmt: skip

TERMINAL_MESSAGES = {
    "aprovado": "Análise concluída sem apontamentos impeditivos.",
    "reprovado": "Reprovado: apontamentos de risco não mitigados.",
}


def _case_rows(now: datetime, entity_ids: list[int], user_ids: dict[str, int]) -> list[dict]:
    """Gera os casos de forma determinística (mesma entrada → mesma saída)."""
    analysts = [user_ids["analista@nsights.demo"], user_ids["analista2@nsights.demo"]]
    admin = user_ids["admin@nsights.demo"]
    rows = []
    for i in range(1, CASE_COUNT + 1):
        status = STATUS_CYCLE[(i - 1) % len(STATUS_CYCLE)]
        score = (i * 37) % 101
        level = "alto" if score >= 70 else "medio" if score >= 40 else "baixo"
        opened = now - timedelta(days=3 + (i * 7) % 55, hours=i % 9)
        assignee = None if status == "aberto" and i % 4 == 0 else analysts[i % 2]
        events = [("created", opened, analysts[(i + 1) % 2], "Caso aberto.", {})]
        if status != "aberto":
            started = opened + timedelta(days=1)
            events.append(
                ("status_change", started, assignee, "Análise iniciada.",
                 {"from": "aberto", "to": "em_analise"})
            )  # fmt: skip
            if i % 3 == 0:
                events.append(
                    ("note", started + timedelta(hours=3), assignee,
                     "Documentação complementar solicitada ao cliente.", {})
                )  # fmt: skip
        if status in TERMINAL_STATUSES:
            events.append(
                ("status_change", opened + timedelta(days=2), admin, TERMINAL_MESSAGES[status],
                 {"from": "em_analise", "to": status})
            )  # fmt: skip
        last = max(e[1] for e in events)
        entity_id = entity_ids[(i - 1) % len(entity_ids)]
        rows.append(
            {
                "case": {
                    "code": f"RK-{CASE_YEAR}-{i:04d}",
                    "entity_id": entity_id,
                    "title": CASE_TOPICS[(i - 1) % len(CASE_TOPICS)],
                    "description": None,
                    "status": status,
                    "risk_score": score,
                    "assignee_id": assignee,
                    "created_by_id": events[0][2],
                    "created_at": opened,
                    "updated_at": last,
                    "due_at": opened + timedelta(days=SLA_DAYS[level]),
                    "closed_at": last if status in TERMINAL_STATUSES else None,
                },
                "events": events,
            }
        )
    return rows


def run_seed(session: Session, now: datetime | None = None) -> dict[str, int]:
    """Aplica o seed na sessão (sem commit). Retorna quantos registros foram criados."""
    from app.security import hash_password  # argon2 só é carregado se for preciso

    now = now or datetime.now(UTC)
    session.execute(text("SELECT pg_advisory_xact_lock(hashtext(:k))"), {"k": SEED_LOCK_KEY})

    # Usuários: só calcula hash para quem ainda não existe.
    existing = set(session.scalars(select(User.email)))
    password = get_settings().seed_demo_password
    missing = [
        {**u, "password_hash": hash_password(password)} for u in USERS if u["email"] not in existing
    ]
    created_users = 0
    if missing:
        created_users = len(
            session.execute(
                insert(User)
                .values(missing)
                .on_conflict_do_nothing(index_elements=["email"])
                .returning(User.id)
            ).all()
        )
    user_ids = dict(session.execute(select(User.email, User.id)).all())

    created_entities = len(
        session.execute(
            insert(Entity)
            .values([{"kind": k, "document": d, "name": n} for k, d, n in ENTITIES])
            .on_conflict_do_nothing(index_elements=["document"])
            .returning(Entity.id)
        ).all()
    )
    by_document = dict(
        session.execute(
            select(Entity.document, Entity.id).where(
                Entity.document.in_([d for _, d, _ in ENTITIES])
            )
        ).all()
    )
    entity_ids = [by_document[d] for _, d, _ in ENTITIES]

    rows = _case_rows(now, entity_ids, user_ids)
    new_cases = dict(
        session.execute(
            insert(Case)
            .values([r["case"] for r in rows])
            .on_conflict_do_nothing(index_elements=["code"])
            .returning(Case.code, Case.id)
        ).all()
    )

    events = [
        {
            "case_id": new_cases[r["case"]["code"]],
            "type": etype,
            "created_at": at,
            "author_id": author,
            "message": message,
            "payload": payload,
        }
        for r in rows
        if r["case"]["code"] in new_cases
        for etype, at, author, message, payload in r["events"]
    ]
    if events:
        session.execute(insert(CaseEvent).values(events))

    # Casos criados pelo app numeram pela sequence; ela nunca pode ficar atrás do seed.
    session.execute(
        text(
            "SELECT setval('case_code_seq', GREATEST((SELECT last_value FROM case_code_seq), :n))"
        ),
        {"n": CASE_COUNT},
    )

    return {
        "users": created_users,
        "entities": created_entities,
        "cases": len(new_cases),
        "events": len(events),
    }


def main() -> None:
    configure_logging(get_settings().log_level)
    with SessionLocal.begin() as session:
        created = run_seed(session)
    log.info("seed concluído; criados: %s", created, extra={"created_counts": created})


if __name__ == "__main__":
    main()
