from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text

from app.config import get_settings
from app.db import engine

settings = get_settings()

app = FastAPI(
    title="Nsights Risk Ops API",
    description="API do console de casos de risco e KYC.",
    version="0.1.0",
    openapi_tags=[
        {"name": "infra", "description": "Saúde e operação do serviço."},
    ],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID"],
)


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
