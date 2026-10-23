"""Schemas de entrada e saída da API (Pydantic)."""

from datetime import UTC, datetime
from typing import Annotated, Any, Literal

from pydantic import (
    AwareDatetime,
    BaseModel,
    ConfigDict,
    Field,
    StringConstraints,
    ValidationInfo,
    computed_field,
    field_validator,
)

from app.validators import is_valid_cnpj, is_valid_cpf, only_digits


class UserOut(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "examples": [
                {
                    "id": 1,
                    "name": "Marina Costa",
                    "email": "admin@nsights.demo",
                    "role": "admin",
                    "is_active": True,
                    "created_at": "2026-01-05T12:00:00Z",
                }
            ]
        },
    )

    id: int
    name: str
    email: str
    role: Literal["analyst", "admin"] = Field(description="`admin` aprova, reprova e reatribui.")
    is_active: bool
    created_at: datetime


class TokenOut(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    "token_type": "bearer",
                    "expires_in": 28800,
                    "user": UserOut.model_config["json_schema_extra"]["examples"][0],
                }
            ]
        }
    )

    access_token: str = Field(description="JWT; enviar como `Authorization: Bearer <token>`.")
    token_type: Literal["bearer"] = "bearer"
    expires_in: int = Field(description="Validade do token, em segundos.")
    user: UserOut


# --- tipos comuns --------------------------------------------------------------------

CaseStatus = Literal["aberto", "em_analise", "aprovado", "reprovado"]
RiskLevel = Literal["baixo", "medio", "alto"]
EntityKind = Literal["PF", "PJ"]
EventType = Literal["created", "note", "status_change", "assignment", "update"]

Title = Annotated[str, StringConstraints(strip_whitespace=True, min_length=3, max_length=200)]
LongText = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=5000)]
ShortText = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=2000)]


class Page[T](BaseModel):
    items: list[T]
    total: int = Field(description="Total de registros com os filtros aplicados.")
    page: int
    page_size: int


class UserRef(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class UserListItem(UserRef):
    email: str
    role: Literal["analyst", "admin"]


# --- entidades -----------------------------------------------------------------------


class EntityRef(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    kind: EntityKind
    document: str = Field(description="Só dígitos: CPF (11) ou CNPJ (14).")
    name: str


class EntityCreate(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {"kind": "PJ", "document": "11.222.333/0001-81", "name": "Exemplo Comércio Ltda."}
            ]
        }
    )

    kind: EntityKind = Field(description="`PF` (CPF) ou `PJ` (CNPJ).")
    document: str = Field(
        max_length=32, description="CPF ou CNPJ, com ou sem máscara; o dígito é validado."
    )
    name: Annotated[str, StringConstraints(strip_whitespace=True, min_length=2, max_length=200)]

    @field_validator("document")
    @classmethod
    def _valid_document(cls, value: str, info: ValidationInfo) -> str:
        digits = only_digits(value)
        kind = info.data.get("kind")
        if kind == "PF" and not is_valid_cpf(digits):
            raise ValueError("CPF inválido")
        if kind == "PJ" and not is_valid_cnpj(digits):
            raise ValueError("CNPJ inválido")
        return digits


class EntityOut(EntityRef):
    created_at: datetime
    case_count: int = Field(0, description="Casos da entidade (todos os status).")
    active_case_count: int = Field(0, description="Casos em aberto ou em análise.")


class CaseBrief(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    code: str
    title: str
    status: CaseStatus
    risk_score: int
    risk_level: RiskLevel
    created_at: datetime


class EntityDetail(EntityOut):
    cases: list[CaseBrief] = Field(description="Casos da entidade, mais recentes primeiro.")


# --- casos ---------------------------------------------------------------------------


class CaseEventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    type: EventType
    message: str | None
    payload: dict[str, Any] = Field(
        description="Detalhes estruturados. `status_change`: `{from, to}`; `assignment`: "
        "`{from, to}` com `{id, name}` ou null; `update`: `{changes: {campo: {from, to}}}`."
    )
    author: UserRef | None
    created_at: datetime


class CaseListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    code: str = Field(examples=["RK-2026-0031"])
    title: str
    status: CaseStatus
    risk_score: int = Field(ge=0, le=100)
    risk_level: RiskLevel = Field(description="Derivado do score: <40 baixo, <70 médio, ≥70 alto.")
    entity: EntityRef
    assignee: UserRef | None
    created_at: datetime
    updated_at: datetime
    due_at: datetime = Field(description="Prazo de análise (SLA por nível de risco).")
    closed_at: datetime | None

    @computed_field(description="Em aberto ou em análise e com o prazo vencido.")
    @property
    def is_overdue(self) -> bool:
        return self.closed_at is None and self.due_at < datetime.now(UTC)


class CaseDetail(CaseListItem):
    description: str | None
    created_by: UserRef | None
    events: list[CaseEventOut] = Field(description="Timeline, em ordem cronológica.")
    allowed_transitions: list[CaseStatus] = Field(
        default_factory=list,
        description="Status para os quais o usuário atual pode mover o caso agora.",
    )
    can_edit: bool = Field(False, description="O caso aceita edição (não está encerrado).")
    can_assign: bool = Field(False, description="O usuário atual pode reatribuir o caso.")


class CaseCreate(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "entity_id": 1,
                    "title": "Alerta de PEP",
                    "description": "Sócio identificado como pessoa exposta politicamente.",
                    "risk_score": 72,
                    "assignee_id": 2,
                }
            ]
        }
    )

    entity_id: int
    title: Title
    description: LongText | None = None
    risk_score: int = Field(ge=0, le=100)
    assignee_id: int | None = Field(
        None, description="Analista só pode deixar vazio ou indicar a si mesmo."
    )
    due_at: AwareDatetime | None = Field(
        None, description="Padrão: abertura + 3 (alto), 7 (médio) ou 15 (baixo) dias."
    )


class CaseUpdate(BaseModel):
    """Edição parcial. Status e responsável têm rotas próprias."""

    model_config = ConfigDict(
        extra="forbid",
        json_schema_extra={"examples": [{"title": "Alerta de PEP (sócio)", "risk_score": 80}]},
    )

    title: Title | None = None
    description: LongText | None = None
    risk_score: int | None = Field(None, ge=0, le=100)
    due_at: AwareDatetime | None = None

    @field_validator("title", "risk_score", "due_at")
    @classmethod
    def _not_null(cls, value: Any) -> Any:
        # Ausente = não mexe; `null` explícito não é permitido nesses campos.
        if value is None:
            raise ValueError("não pode ser nulo")
        return value


class StatusChange(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {"status": "em_analise"},
                {"status": "reprovado", "message": "Sanção OFAC confirmada para o sócio."},
            ]
        }
    )

    status: CaseStatus
    message: ShortText | None = Field(None, description="Justificativa. Obrigatória para reprovar.")


class AssignmentIn(BaseModel):
    model_config = ConfigDict(json_schema_extra={"examples": [{"assignee_id": 3}]})

    assignee_id: int | None = Field(description="`null` remove o responsável.")


class NoteCreate(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={"examples": [{"message": "Cliente enviou o contrato social."}]}
    )

    message: LongText


# --- resumo --------------------------------------------------------------------------


class AssigneeSummary(BaseModel):
    assignee: UserRef | None = Field(description="`null` agrupa os casos sem responsável.")
    active: int
    overdue: int


class SummaryOut(BaseModel):
    total: int
    active: int = Field(description="Casos em aberto ou em análise.")
    overdue: int = Field(description="Casos ativos com prazo vencido.")
    by_status: dict[CaseStatus, int]
    by_risk_level: dict[RiskLevel, int] = Field(description="Somente casos ativos.")
    by_assignee: list[AssigneeSummary] = Field(description="Somente casos ativos.")
