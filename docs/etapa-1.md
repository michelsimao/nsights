# Etapa 1: esqueleto e infraestrutura (relatório)

- **Commit:** `37593f5`, no branch `main`
- **Data:** 2026-10-23
- **Status:** concluída. Todos os critérios de aceite foram atendidos.

## Resultado

Um clone limpo sobe os três serviços com `docker compose up --build`, sem precisar de `.env`. O `PLANO.md` e o rename do README para `DESIGN_SYSTEM.md` entraram no mesmo commit.

## Verificações

| Verificação | Resultado |
|---|---|
| Clone limpo em diretório temporário, com outras portas | db, backend e frontend chegam a *healthy*, nessa ordem |
| `GET /health` com o banco no ar | 200, `{"status":"ok","database":"ok"}` |
| `GET /health` com o Postgres parado | 503, `{"status":"degraded","database":"unavailable"}` |
| Persistência do volume | um dado gravado sobreviveu a `docker compose down` seguido de `up` |
| Front em `/` | 200, com os tokens do DS no CSS servido |
| Rota da aplicação (`/casos/123`) | 200: o nginx serve o `index.html` em vez de 404 |
| `/openapi.json`, `/docs`, `/redoc` | 200 |
| `uv run pytest` no container | 1 teste passou |
| `ruff check` e `ruff format --check` | ok |
| Banco `riskops_test` | criado na inicialização do Postgres |

## O que foi criado

- **`docker-compose.yml`:**
  - `db`: postgres:16-alpine, volume `pgdata`, healthcheck com `pg_isready`.
  - `backend` e `frontend`, encadeados por `depends_on: service_healthy`.
  - Todas as variáveis têm default `${VAR:-...}`, por isso o `.env` é opcional.
- **`backend/`:**
  - FastAPI com dependências gerenciadas pelo uv (`uv.lock` versionado).
  - Configuração por ambiente com pydantic-settings.
  - CORS controlado por `CORS_ORIGINS`.
  - `/health` executa `SELECT 1` no banco.
  - Dockerfile com healthcheck e o entrypoint `scripts/start.sh`.
- **`frontend/`:**
  - Vite 7, React 19.2.8 e Tailwind v4 sem preflight.
  - Alias `@ds` aponta para a raiz do repo, onde ficam os arquivos do DS.
  - Build multi-stage servido por nginx, que repassa `/api` para o backend.
- **Arquivos de raiz:**
  - `.env.example`, `.gitignore` e `.dockerignore`. O `.dockerignore` é uma lista de permissão: só os arquivos do DS que o app usa entram no build.
  - `docker/db-init/01-create-test-db.sql`, que cria o banco de testes.

## O que mudou em relação ao plano

- **Fontes do DS:**
  - O `_ds_bundle.css` importa as fontes Geist do Google Fonts no meio do arquivo, e o build do Vite descarta esse import.
  - A mesma URL passou a ser carregada por `<link>` no `frontend/index.html`, sem alterar o DS.
  - O build ainda mostra um aviso sobre o import descartado, que agora é inofensivo.
- **Portas no host:**
  - O Postgres usa a 5433, porque a 5432 já está ocupada nesta máquina.
  - O backend usa a 8000 e o front a 5173.
  - As três podem ser trocadas por variável de ambiente.
- **Versões:**
  - React 19.2.8, a mesma do `_vendor` do DS.
  - Vite 7 em vez do 8, porque o `@vitejs/plugin-react` mais recente exige o Vite 8.
- **Chamadas à API no Docker:**
  - O nginx repassa `/api`, então front e API ficam na mesma origem e o CORS não entra nesse caminho.
  - O CORS continua configurado para quem roda o front fora do Docker (`npm run dev`).
- **Ajuste durante a execução:**
  - O `pytest` não encontrava o pacote `app`.
  - Resolvido com `pythonpath = ["."]` no `pyproject.toml`.

## Pendências menores

- O `pytest` mostra um aviso de depreciação do `TestClient` vindo do Starlette. Não afeta os testes.
- O `npm install` não executou o script de instalação do esbuild, por causa da política de scripts do npm 11. O build funciona assim mesmo, localmente e no Docker.
- O README da aplicação ainda não existe. Está previsto para a Etapa 7.

## Próxima etapa

Etapa 2: modelos, migrations (`0001` inicial e `0002` de evolução) e seed idempotente executado no entrypoint do backend.

## Como validar

Rode os comandos na raiz do repo.

### 1. Subir do zero
```bash
docker compose down -v          # para tudo e apaga o volume do banco
docker compose up --build -d
docker compose ps               # os 3 serviços devem aparecer como (healthy)
```
O `down -v` apaga os dados do banco. Na Etapa 1 isso não importa, porque ainda não há dados.

### 2. Backend
```bash
curl -i localhost:8000/health   # espera 200 e {"status":"ok","database":"ok"}
```
No navegador:
- http://localhost:8000/docs (Swagger)
- http://localhost:8000/redoc
- http://localhost:8000/openapi.json

Por enquanto só aparece a rota `/health`.

### 3. Frontend
- http://localhost:5173 deve mostrar um cartão branco "Console de casos de risco" sobre o fundo lilás claro, com o rótulo roxo em caixa alta e a fonte Geist.
- http://localhost:5173/qualquer/rota deve mostrar a mesma página, e não um erro 404 do nginx.

### 4. Health check com o banco fora
```bash
docker compose stop db
curl -i localhost:8000/health   # espera 503 e "database":"unavailable"
docker compose start db
```

### 5. Persistência do volume
```bash
docker compose exec db psql -U riskops -c "create table t(x int); insert into t values (1);"
docker compose down && docker compose up -d
docker compose exec db psql -U riskops -c "select * from t; drop table t;"   # deve retornar 1
```

### 6. Testes e lint
```bash
docker compose exec backend uv run pytest -q
docker compose exec backend uv run ruff check .
docker compose exec db psql -U riskops -tAc "select datname from pg_database"   # deve listar riskops e riskops_test
```

### 7. Clone limpo
É a validação mais fiel ao que o avaliador vai fazer. As portas são outras para não colidir com a stack já em execução:
```bash
git clone /home/michel/nsights /tmp/riskops-clone && cd /tmp/riskops-clone
POSTGRES_HOST_PORT=5434 BACKEND_HOST_PORT=8001 FRONTEND_HOST_PORT=5174 \
  docker compose -p riskops-clean up --build -d
curl localhost:8001/health
docker compose -p riskops-clean down -v && cd - && rm -rf /tmp/riskops-clone
```

### 8. Revisar o código
```bash
git show --stat 37593f5
```
Os arquivos principais são:
- `docker-compose.yml`
- `backend/app/main.py`
- `frontend/vite.config.js`
- `frontend/nginx.conf`
- `.dockerignore`
- `.env.example`
