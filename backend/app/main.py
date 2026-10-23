from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text

from app.config import get_settings
from app.db import engine
from app.errors import register_error_handlers
from app.observability import REQUEST_ID_HEADER, RequestIdMiddleware, configure_logging
from app.routers import auth

settings = get_settings()
configure_logging(settings.log_level)

app = FastAPI(
    title="Nsights Risk Ops API",
    description=(
        "API do console de casos de risco e KYC.\n\n"
        "**Autenticação:** `POST /api/auth/login` devolve um JWT; envie-o como "
        "`Authorization: Bearer <token>` (no Swagger, botão *Authorize*).\n\n"
        "**Erros:** toda resposta de erro usa o envelope "
        '`{"error": {"code", "message", "details", "request_id"}}`. '
        "O `request_id` é o mesmo do header `X-Request-ID`, presente em todas as respostas."
    ),
    version="0.1.0",
    openapi_tags=[
        {"name": "auth", "description": "Login e sessão."},
        {"name": "infra", "description": "Saúde e operação do serviço."},
    ],
)

register_error_handlers(app)

# Ordem: o último adicionado é o mais externo. CORS fica por fora para que
# respostas de erro (inclusive 500) também levem os headers de CORS.
app.add_middleware(RequestIdMiddleware)
# O token vai no header Authorization, não em cookie: sem `allow_credentials`.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type", REQUEST_ID_HEADER],
    expose_headers=[REQUEST_ID_HEADER],
)

app.include_router(auth.router)


class HealthOut(BaseModel):
    status: str
    database: str


@app.get(
    "/health",
    tags=["infra"],
    summary="Saúde do serviço",
    description="Retorna 200 quando a API e o banco respondem; 503 se o banco estiver fora.",
    response_model=HealthOut,
    responses={503: {"model": HealthOut, "description": "Banco indisponível"}},
)
def health(response: Response) -> HealthOut:
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
    except Exception:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return HealthOut(status="degraded", database="unavailable")
    return HealthOut(status="ok", database="ok")
