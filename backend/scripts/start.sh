#!/bin/sh
# Entrypoint do container da API: migra, semeia (idempotente) e sobe o servidor.
set -e

alembic upgrade head

if [ "${SEED_DEMO:-true}" = "true" ]; then
  python -m app.seed
fi

exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --proxy-headers --no-access-log
