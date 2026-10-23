"""Logging estruturado (JSON, uma linha por evento) e request-id por requisição."""

import json
import logging
import re
import time
import uuid
from contextvars import ContextVar
from datetime import UTC, datetime

from starlette.types import ASGIApp, Message, Receive, Scope, Send

REQUEST_ID_HEADER = "X-Request-ID"
# Aceita o id do cliente/proxy só se for curto e sem caracteres estranhos (evita log injection).
_VALID_REQUEST_ID = re.compile(r"^[A-Za-z0-9._-]{1,64}$")

request_id_var: ContextVar[str | None] = ContextVar("request_id", default=None)
access_log = logging.getLogger("riskops.access")

# Atributos padrão de LogRecord; o que sobrar veio de `extra=` e vai para o JSON.
_RESERVED = set(vars(logging.makeLogRecord({}))) | {
    "message",
    "asctime",
    "taskName",
    "color_message",  # duplicata com ANSI que o uvicorn anexa
}


class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload = {
            "ts": datetime.fromtimestamp(record.created, UTC).isoformat(timespec="milliseconds"),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        if (rid := request_id_var.get()) is not None:
            payload["request_id"] = rid
        payload.update({k: v for k, v in vars(record).items() if k not in _RESERVED})
        if record.exc_info:
            payload["exc_info"] = self.formatException(record.exc_info)
        return json.dumps(payload, ensure_ascii=False, default=str)


def configure_logging(level: str = "INFO") -> None:
    """Root com handler JSON; loggers do uvicorn passam a propagar para ele."""
    handler = logging.StreamHandler()
    handler.setFormatter(JsonFormatter())
    root = logging.getLogger()
    root.handlers[:] = [handler]
    root.setLevel(level.upper())
    for name in ("uvicorn", "uvicorn.error", "uvicorn.access"):
        lg = logging.getLogger(name)
        lg.handlers.clear()
        lg.propagate = True
    # O access log do uvicorn é substituído pelo `riskops.access`, que tem request-id e duração.
    logging.getLogger("uvicorn.access").disabled = True


class RequestIdMiddleware:
    """Atribui um request-id, devolve no header `X-Request-ID` e registra o acesso.

    ASGI puro (não `BaseHTTPMiddleware`) para manter o contextvar visível nas rotas.
    Exceções não tratadas viram 500 aqui dentro, para que a resposta ainda carregue
    o request-id e o envelope de erro padrão.
    """

    def __init__(self, app: ASGIApp) -> None:
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        incoming = dict(scope["headers"]).get(REQUEST_ID_HEADER.lower().encode(), b"").decode()
        rid = incoming if _VALID_REQUEST_ID.match(incoming) else uuid.uuid4().hex
        scope.setdefault("state", {})["request_id"] = rid
        token = request_id_var.set(rid)

        status_code = 500
        started = False
        t0 = time.perf_counter()

        async def send_with_id(message: Message) -> None:
            nonlocal status_code, started
            if message["type"] == "http.response.start":
                started = True
                status_code = message["status"]
                message.setdefault("headers", [])
                message["headers"].append((REQUEST_ID_HEADER.lower().encode(), rid.encode()))
            await send(message)

        try:
            await self.app(scope, receive, send_with_id)
        except Exception:
            access_log.exception("erro não tratado")
            if started:
                raise
            from app.errors import internal_error_response  # evita import circular

            await internal_error_response(rid)(scope, receive, send_with_id)
        finally:
            # Healthcheck bem-sucedido roda a cada 10 s: só em DEBUG, para não poluir o log.
            quiet = scope["path"] == "/health" and status_code == 200
            access_log.log(
                logging.DEBUG if quiet else logging.INFO,
                "%s %s %s",
                scope["method"],
                scope["path"],
                status_code,
                extra={
                    "method": scope["method"],
                    "path": scope["path"],
                    "status": status_code,
                    "duration_ms": round((time.perf_counter() - t0) * 1000, 1),
                },
            )
            request_id_var.reset(token)
