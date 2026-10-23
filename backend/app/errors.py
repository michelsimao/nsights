"""Envelope de erro único da API: `{"error": {"code", "message", "details", "request_id"}}`.

Todo erro sai nesse formato: exceções de domínio (`AppError`), `HTTPException`
(inclusive 404/405 do roteamento), validação do FastAPI e falhas inesperadas.
"""

from http import HTTPStatus
from typing import Any

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.observability import request_id_var


class ErrorDetail(BaseModel):
    code: str = Field(examples=["not_authenticated"], description="Código estável, para o cliente.")
    message: str = Field(examples=["Token ausente ou inválido."], description="Texto para humanos.")
    details: Any = Field(
        default=None,
        description="Informação adicional. Em `validation_error`: lista de "
        "`{field, location, message, type}`.",
    )
    request_id: str | None = Field(
        default=None,
        examples=["3f2b9c1e8a7d4e0f9b6a5c4d3e2f1a0b"],
        description="Igual ao header X-Request-ID.",
    )


class ErrorResponse(BaseModel):
    error: ErrorDetail


class AppError(Exception):
    """Erro de domínio com status HTTP e código estável."""

    def __init__(
        self,
        status_code: int,
        code: str,
        message: str,
        details: Any = None,
        headers: dict[str, str] | None = None,
    ) -> None:
        super().__init__(message)
        self.status_code = status_code
        self.code = code
        self.message = message
        self.details = details
        self.headers = headers


# Código padrão para HTTPException sem código de domínio (ex.: 404 de rota inexistente).
_HTTP_CODES = {
    400: "bad_request",
    401: "not_authenticated",
    403: "forbidden",
    404: "not_found",
    405: "method_not_allowed",
    409: "conflict",
    413: "payload_too_large",
    415: "unsupported_media_type",
    422: "validation_error",
    429: "too_many_requests",
}
# Mensagem em pt-BR quando a HTTPException traz só a frase padrão em inglês ("Not Found").
_HTTP_MESSAGES = {
    401: "Autenticação necessária.",
    403: "Sem permissão para esta operação.",
    404: "Recurso não encontrado.",
    405: "Método não permitido.",
}


def error_response(
    status_code: int,
    code: str,
    message: str,
    details: Any = None,
    headers: dict[str, str] | None = None,
    request_id: str | None = None,
) -> JSONResponse:
    body = ErrorResponse(
        error=ErrorDetail(
            code=code,
            message=message,
            details=details,
            request_id=request_id or request_id_var.get(),
        )
    )
    return JSONResponse(body.model_dump(), status_code=status_code, headers=headers)


def internal_error_response(request_id: str | None = None) -> JSONResponse:
    # Nunca expõe a exceção ao cliente; o detalhe fica no log, ligado pelo request-id.
    return error_response(500, "internal_error", "Erro interno.", request_id=request_id)


async def _app_error(_: Request, exc: AppError) -> JSONResponse:
    return error_response(exc.status_code, exc.code, exc.message, exc.details, exc.headers)


async def _http_error(_: Request, exc: StarletteHTTPException) -> JSONResponse:
    code = _HTTP_CODES.get(exc.status_code, "http_error")
    message = exc.detail if isinstance(exc.detail, str) else code
    if message == HTTPStatus(exc.status_code).phrase:
        message = _HTTP_MESSAGES.get(exc.status_code, message)
    details = None if isinstance(exc.detail, str) else exc.detail
    return error_response(exc.status_code, code, message, details, exc.headers)


def field_error(field: str, message: str, location: str = "body") -> AppError:
    """422 de regra de negócio no formato da validação do FastAPI (o front mapeia por campo)."""
    return AppError(
        422,
        "validation_error",
        "Dados inválidos.",
        [{"field": field, "location": location, "message": message, "type": "value_error"}],
    )


# Mensagens em pt-BR para os erros mais comuns do Pydantic (o front exibe no campo).
_PYDANTIC_MESSAGES = {
    "missing": "Campo obrigatório.",
    "extra_forbidden": "Campo não permitido aqui.",
    "literal_error": "Valor inválido. Opções: {expected}.",
    "greater_than_equal": "Deve ser maior ou igual a {ge}.",
    "less_than_equal": "Deve ser menor ou igual a {le}.",
    "string_too_short": "Deve ter pelo menos {min_length} caractere(s).",
    "string_too_long": "Deve ter no máximo {max_length} caracteres.",
    "string_pattern_mismatch": "Formato inválido.",
    "int_parsing": "Deve ser um número inteiro.",
    "int_type": "Deve ser um número inteiro.",
    "bool_parsing": "Deve ser verdadeiro ou falso.",
    "timezone_aware": "Informe a data com fuso horário.",
    "datetime_from_date_parsing": "Data e hora inválidas.",
    "datetime_parsing": "Data e hora inválidas.",
    "json_invalid": "JSON inválido.",
}


def _message(err: dict[str, Any]) -> str:
    template = _PYDANTIC_MESSAGES.get(err.get("type", ""))
    if template:
        try:
            return template.format(**err.get("ctx", {}))
        except (KeyError, IndexError):
            pass
    # Pydantic prefixa erros de validators com "Value error, ".
    return str(err.get("msg", "")).removeprefix("Value error, ")


def _field_errors(exc: RequestValidationError) -> list[dict[str, Any]]:
    out = []
    for err in exc.errors():
        loc = list(err.get("loc", ()))
        location = loc.pop(0) if loc and loc[0] in ("body", "query", "path", "header") else None
        out.append(
            {
                "field": ".".join(str(p) for p in loc) or None,
                "location": location,
                "message": _message(err),
                "type": err.get("type", ""),
            }
        )
    return out


async def _validation_error(_: Request, exc: RequestValidationError) -> JSONResponse:
    return error_response(422, "validation_error", "Dados inválidos.", _field_errors(exc))


def register_error_handlers(app: FastAPI) -> None:
    app.add_exception_handler(AppError, _app_error)
    app.add_exception_handler(StarletteHTTPException, _http_error)
    app.add_exception_handler(RequestValidationError, _validation_error)


def error_responses(*status_codes: int) -> dict[int | str, dict[str, Any]]:
    """`responses=` do OpenAPI documentando o envelope para os status indicados."""
    descriptions = {
        401: "Não autenticado (token ausente, inválido ou expirado).",
        403: "Sem permissão para esta operação.",
        404: "Recurso não encontrado.",
        409: "Conflito com o estado atual do recurso.",
        422: "Dados inválidos.",
    }
    return {
        code: {"model": ErrorResponse, "description": descriptions.get(code, "Erro.")}
        for code in status_codes
    }
