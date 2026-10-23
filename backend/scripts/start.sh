#!/bin/sh
# Entrypoint do container da API. Migrations e seed entram aqui na etapa 2.
set -e

exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --proxy-headers
