# Nsights Risk Ops: console de casos de risco

Console interno para analistas de Risk Ops gerenciarem **casos de risco/KYC**:
- entidades analisadas (CPF/CNPJ);
- casos com status, score e nível de risco, responsável e prazo;
- timeline auditável de cada caso;
- visão de resumo da fila.

Stack: **React + Vite + Tailwind** · **FastAPI** · **PostgreSQL + SQLAlchemy + Alembic** · **uv** · **Docker Compose**. A interface usa o **Nsights Risk Ops Design System**, que fica na raiz do repo (ver [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)).

| Resumo | Detalhe do caso |
|---|---|
| ![Resumo](docs/img/resumo.png) | ![Detalhe do caso](docs/img/caso.png) |
| **Lista de casos** (filtros na URL) | **Mobile** (390px) |
| ![Lista de casos](docs/img/casos.png) | <img src="docs/img/mobile-caso.png" alt="Detalhe do caso no celular" width="260"> |

---

## Sumário

1. [Subir com Docker (recomendado)](#1-subir-com-docker-recomendado)
2. [Credenciais demo](#2-credenciais-demo)
3. [Rodar sem Docker (desenvolvimento)](#3-rodar-sem-docker-desenvolvimento)
4. [Testes, lint e CI](#4-testes-lint-e-ci)
5. [Variáveis de ambiente](#5-variáveis-de-ambiente)
6. [A API](#6-a-api)
7. [Modelo de dados](#7-modelo-de-dados)
8. [Decisões de arquitetura](#8-decisões-de-arquitetura)
9. [O que ficaria para depois](#9-o-que-ficaria-para-depois)
10. [Estrutura do repositório](#10-estrutura-do-repositório)

---

## 1. Subir com Docker (recomendado)

Pré-requisito: Docker com o plugin Compose. Não é preciso `.env`: todas as variáveis têm default de desenvolvimento.

```bash
git clone <url-do-repo> nsights && cd nsights
docker compose up --build -d
docker compose ps            # db, backend e frontend como (healthy)
```

| O quê | Onde |
|---|---|
| Aplicação | http://localhost:5173 |
| API: Swagger | http://localhost:8000/docs |
| API: ReDoc | http://localhost:8000/redoc |
| OpenAPI | http://localhost:8000/openapi.json |
| Health check | http://localhost:8000/health |
| Postgres | `localhost:5433` (usuário, senha e banco `riskops`) |

O container do backend sobe em três passos (`backend/scripts/start.sh`):
1. `alembic upgrade head`;
2. seed de demonstração (idempotente);
3. uvicorn.

O front é servido pelo nginx, que repassa `/api` para o backend. Front e API ficam na mesma origem, então o CORS não entra no caminho padrão.

**Comandos úteis**

```bash
docker compose logs -f backend                    # logs JSON com request_id
docker compose down                               # para tudo; os dados ficam no volume
docker compose down -v && docker compose up -d    # volta a demo ao estado inicial
```

As portas do host podem ser trocadas com `POSTGRES_HOST_PORT`, `BACKEND_HOST_PORT` e `FRONTEND_HOST_PORT`. O Postgres usa a 5433 por padrão porque a 5432 costuma estar ocupada.

## 2. Credenciais demo

A senha de todos é `riskops123`.

| Email | Papel | Nome |
|---|---|---|
| `admin@nsights.demo` | admin | Marina Costa |
| `analista@nsights.demo` | analista | Rafael Lima |
| `analista2@nsights.demo` | analista | Beatriz Souza |

O seed também cria 12 entidades (CPF/CNPJ com dígitos válidos) e 30 casos com timeline.

O seed **cria o que falta e nunca sobrescreve**:
- roda a cada start do container;
- alterações feitas na demo sobrevivem a restarts;
- para recomeçar do zero, use `docker compose down -v`.

**O que muda entre os papéis:**
- **Só o admin** aprova, reprova (com justificativa obrigatória) e reatribui casos.
- O analista abre casos para si mesmo ou sem responsável, inicia e devolve análises, edita e anota.
- A matriz completa está na [seção 6](#transições-de-status).

## 3. Rodar sem Docker (desenvolvimento)

Útil para hot reload. O Postgres continua no Docker.

```bash
docker compose up -d db              # Postgres em localhost:5433 (cria também o banco riskops_test)
```

**Backend** (Python 3.12 e [uv](https://docs.astral.sh/uv/)):

```bash
cd backend
uv sync                                          # cria .venv com as dependências (inclui dev)
export DATABASE_URL=postgresql+psycopg://riskops:riskops@localhost:5433/riskops
uv run alembic upgrade head                      # migrations
uv run python -m app.seed                        # seed demo (idempotente)
uv run uvicorn app.main:app --reload             # http://localhost:8000
```

Sem `DATABASE_URL`, o backend já usa `localhost:5433/riskops`. Um `backend/.env` também é lido, se existir.

**Frontend** (Node 24):

```bash
cd frontend
npm ci
npm run dev                                      # http://localhost:5173
```

O Vite repassa `/api` para `http://localhost:8000`; para outro endereço, use `VITE_API_PROXY`. Para apontar o build direto para uma API em outro domínio, use `VITE_API_URL`; nesse caso, inclua a origem do front em `CORS_ORIGINS`.

**Migrations novas:**

```bash
cd backend
uv run alembic revision --autogenerate -m "descricao"
uv run alembic upgrade head
uv run alembic check                             # modelos e migrations em sincronia
```

## 4. Testes, lint e CI

Os testes do backend rodam em **Postgres real**, no banco `riskops_test`. O schema é recriado do zero pelas próprias migrations a cada sessão. Hoje são 124 testes:
- autenticação e papéis;
- fluxo principal e matriz de transições;
- filtros, paginação e N+1;
- validação de CPF/CNPJ;
- migrations (ciclo completo e `alembic check`);
- idempotência do seed;
- envelope de erro, request-id e logs;
- números fora do intervalo do Postgres (404/422, nunca 500);
- OpenAPI.

```bash
# No Docker (não precisa de nada instalado além do Docker):
docker compose run --rm backend uv run pytest

# Local, com o db do compose no ar:
cd backend && uv run pytest
uv run ruff check . && uv run ruff format --check .

# Frontend:
cd frontend && npm run build
```

O **CI** (`.github/workflows/ci.yml`) roda a cada push no `main` e em pull requests. Tem dois jobs:
- **backend:** `ruff check`, `ruff format --check` e `pytest` contra um service Postgres 16;
- **frontend:** `npm ci` e `npm run build`.

Não usa segredos nem `.env`.

O front não tem testes automatizados no repo. A validação de cada etapa foi feita com roteiros Playwright, descritos em [`docs/etapa-5.md`](docs/etapa-5.md) e [`docs/etapa-6.md`](docs/etapa-6.md).

## 5. Variáveis de ambiente

Veja [`.env.example`](.env.example). Copie para `.env` na raiz se quiser trocar algo; o compose lê esse arquivo.

| Variável | Default | Para quê |
|---|---|---|
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | `riskops` | credenciais do Postgres do compose |
| `DATABASE_URL` | montada pelo compose | conexão da API (`postgresql+psycopg://…`) |
| `TEST_DATABASE_URL` | `…/riskops_test` | banco dos testes |
| `APP_ENV` | `development` | fora de `development`, a API **não sobe** com o `JWT_SECRET` padrão ou com menos de 32 caracteres |
| `JWT_SECRET` | valor de dev, público | assinatura HS256 dos tokens. Gere um próprio: `python -c "import secrets; print(secrets.token_urlsafe(48))"` |
| `JWT_EXPIRE_MINUTES` | `480` | validade do token (8 h) |
| `CORS_ORIGINS` | `http://localhost:5173` (o compose acrescenta `http://127.0.0.1:5173`) | origens liberadas (lista separada por vírgula) |
| `LOG_LEVEL` | `INFO` | nível dos logs JSON |
| `SEED_DEMO` | `true` | roda o seed no start do container |
| `SEED_DEMO_PASSWORD` | `riskops123` | senha dos usuários demo (só na criação) |
| `POSTGRES_HOST_PORT` / `BACKEND_HOST_PORT` / `FRONTEND_HOST_PORT` | `5433` / `8000` / `5173` | portas no host |
| `VITE_API_URL` | vazio (mesma origem) | base da API no build do front |
| `VITE_API_PROXY` | `http://localhost:8000` | alvo do proxy `/api` no `npm run dev` |

Nenhum segredo é commitado: `.env` está no `.gitignore`, e os defaults são marcados como só de desenvolvimento.

## 6. A API

A documentação interativa fica em `/docs` (Swagger, com o botão **Authorize** funcionando com as credenciais demo) e em `/redoc`. Toda rota tem tag, resumo, descrição, exemplos e as respostas de erro documentadas. Um teste garante isso.

**Autenticação:**
- `POST /api/auth/login` recebe um formulário OAuth2 *password* (o campo `username` é o email) e devolve um JWT para `Authorization: Bearer <token>`.
- `GET /api/auth/me` devolve o usuário do token.
- Email inexistente, senha errada e usuário inativo recebem o mesmo 401, com tempo de resposta equivalente.
- O papel e o `is_active` são lidos do banco a cada requisição. Rebaixar ou desativar um usuário vale na hora.

**Erros: um envelope só**, em todas as rotas (inclusive 404/405 do roteamento e 500):

```json
{"error": {"code": "validation_error", "message": "Dados inválidos.",
           "details": [{"field": "risk_score", "location": "body", "message": "Deve ser menor ou igual a 100.", "type": "less_than_equal"}],
           "request_id": "4c11436134464752bad3aaf1742b0d8e"}}
```

- `code` é estável: `invalid_credentials`, `token_expired`, `forbidden`, `not_found`, `invalid_transition`, `case_closed`, `entity_exists`, etc.
- As mensagens são em pt-BR. O front exibe `details[].message` no campo correspondente.
- O `request_id` é o mesmo do header `X-Request-ID` e dos logs.

**Rotas:**

| Método | Rota | Quem | Observação |
|---|---|---|---|
| GET | `/api/entities` | todos | `q` (nome ou documento), `kind`, `sort`, paginação |
| POST | `/api/entities` | todos | documento com ou sem máscara; 422 se o dígito verificador não confere, 409 se duplicado |
| GET | `/api/entities/{id}` | todos | entidade, contagens e casos |
| GET | `/api/cases` | todos | `q`, `status`* e `risk_level`* (repetíveis), `assignee` (`id`/`me`/`none`), `entity_id`, `overdue`, `sort`, `page`, `page_size` (máx. 100) |
| POST | `/api/cases` | todos | analista só deixa sem responsável ou atribui a si mesmo |
| GET | `/api/cases/{ref}` | todos | `ref` = id ou código (`RK-2026-0001`); timeline, `allowed_transitions`, `can_edit`, `can_assign` |
| PATCH | `/api/cases/{ref}` | todos | título, descrição, score, prazo; caso encerrado → 409 |
| POST | `/api/cases/{ref}/status` | conforme a matriz | ver abaixo |
| POST | `/api/cases/{ref}/assignee` | admin | `null` remove o responsável |
| POST | `/api/cases/{ref}/notes` | todos | permitido também em caso encerrado |
| GET | `/api/summary` | todos | contagens por status, por risco e por responsável (ativos), e atrasados |
| GET | `/api/users` | todos | usuários ativos (para atribuição) |
| GET | `/health` | público | 200 com o banco acessível, 503 sem ele |

### Transições de status

| de | para | quem |
|---|---|---|
| aberto | em_analise | analista, admin. Quem inicia um caso sem responsável passa a ser o responsável |
| em_analise | aberto | analista, admin (devolve o caso para a fila) |
| em_analise | aprovado | **admin** |
| em_analise | reprovado | **admin**, com justificativa obrigatória |

- Par fora da matriz → **409** `invalid_transition`, com as transições possíveis em `details`.
- Caso já encerrado → **409** `case_closed`.
- Par válido, mas o papel não pode → **403** `forbidden`.

A matriz vive num único lugar (`TRANSITIONS` em `backend/app/cases.py`) e só é aplicada por `transition_case()`. O detalhe do caso devolve `allowed_transitions` para o usuário atual, e o front mostra só esses botões, sem duplicar a regra.

## 7. Modelo de dados

```
users ─┐                          entities (kind PF|PJ, document único, name)
       │ assignee_id / created_by_id      │ entity_id
       └──────────────► cases ◄───────────┘
                         │ code RK-AAAA-NNNN, title, description, status,
                         │ risk_score 0–100, risk_level (gerada), due_at, closed_at
                         ▼
                    case_events (type created|status_change|assignment|update|note,
                                 message, payload jsonb, author_id, created_at)
```

O enunciado deixava o modelo em aberto. As escolhas e os motivos:

- **Score de 0 a 100, com o nível derivado.**
  - O score é o que um motor de risco devolveria; o nível (baixo < 40 ≤ médio < 70 ≤ alto) é o que o analista filtra.
  - `risk_level` é uma **coluna gerada** no Postgres: não há como gravar um nível incoerente com o score, e o filtro usa índice.
- **Prazo (`due_at`) e encerramento (`closed_at`).**
  - O prazo padrão é a abertura mais 3, 7 ou 15 dias, conforme o risco; dá para informar outro.
  - Um `CHECK` amarra `closed_at` aos status terminais.
  - É a migration de evolução (`0002`), com preenchimento dos dados que já existiam.
- **Timeline como tabela de eventos com `payload` jsonb.**
  - Cada escrita no caso (abertura, status, responsável, edição, nota) grava um evento **na mesma transação**.
  - A edição guarda o antes e o depois de cada campo. A reatribuição guarda `{id, name}` de quem saiu e de quem entrou, para a timeline não depender de joins nem de nomes que mudem.
- **Valores fechados como `String` + `CHECK`**, sem enum nativo do Postgres. Evoluir ou fazer downgrade de um enum nativo é trabalhoso; um `CHECK` se altera numa migration simples.
- **Código legível do caso** (`RK-2026-0031`), gerado por sequence no banco. A API e o front aceitam o código na URL (`/casos/RK-2026-0031`).
- **Datas em `timestamptz` (UTC)** desde a primeira migration. O front exibe no fuso do navegador.
- **Índices:**
  - nos filtros da listagem: `status`, `risk_level`, `assignee_id`, `entity_id`, `created_at DESC`, `(case_id, created_at)` dos eventos;
  - `pg_trgm` (GIN) em `entities.name` e `cases.title` para a busca parcial. Com os 30 casos da demo o Postgres prefere varredura sequencial; os índices passam a valer com volume.

## 8. Decisões de arquitetura

**Backend**
- **Estrutura plana em `app/`:**
  - regras de negócio em `cases.py`;
  - routers finos (validam, chamam o serviço, devolvem o detalhe relido do banco);
  - `schemas.py` (Pydantic, com exemplos), `errors.py` (envelope), `deps.py` (usuário atual e papéis), `observability.py`.
  - Para o tamanho do domínio, camadas extras (repositórios, casos de uso) seriam cerimônia.
- **SQLAlchemy 2 síncrono + psycopg 3.**
  - A carga é de CRUD com transações curtas; o FastAPI roda rotas síncronas num threadpool.
  - Async traria complexidade (sessões, testes) sem ganho real aqui.
- **Consistência:**
  - cada operação faz um único `commit`;
  - mudanças de status e de responsável travam a linha do caso (`SELECT … FOR UPDATE`) antes de validar a transição. Duas pessoas decidindo ao mesmo tempo não geram estado inválido: a segunda recebe 409.
- **Paginação offset/limit com `total`, e ordenação por lista fechada de campos.** O `sort` vira um `Literal`, sem SQL vindo do cliente. A busca escapa `%` e `_`.
- **Sem N+1:**
  - `contains_eager` / `selectinload` na listagem e no detalhe;
  - um teste exige o mesmo número de queries com 2 e com 30 itens.
- **Senhas com Argon2id** (`pwdlib`). **JWT HS256** com `sub`, `role`, `iat` e `exp`.
- **Observabilidade:**
  - logs JSON em uma linha (`ts`, `level`, `logger`, `message`, `request_id` e campos extras);
  - access log próprio com método, path, status e duração;
  - `X-Request-ID` aceito ou gerado em toda resposta e devolvido no envelope de erro;
  - `/health` checa o banco.
- **CORS** por `CORS_ORIGINS`, sem `*` e sem `allow_credentials`, porque o token vai em header, não em cookie.

**Frontend**
- **Integração com o Design System sem copiar nem alterar o DS.**
  - O DS é um bundle IIFE (`_ds_bundle.js`) que lê `window.React` no momento em que é avaliado.
  - `src/ds/react-global.js` publica o React do app, e só depois `src/ds/index.js` importa o bundle e reexporta os componentes de `window.RiskOpsUI`.
  - A ordem dos imports ESM garante a sequência, e `resolve.dedupe` garante uma única instância de React.
  - O CSS do DS entra inteiro; o Tailwind entra **sem preflight** (o DS já traz o reset) e só para layout responsivo. Cores e tipografia vêm sempre dos tokens `var(--*)`.
  - Os poucos complementos ficam em `src/app.css`, só com tokens: largura do diálogo, `select` em formulário, `Toolbar` que quebra linha.
- **Composição com primitivos, não com as telas `Screen*`** (que não aceitam dados).
  - As listas usam `Toolbar` + `Table` + `Pagination`, como no `ScreenAnalyses`.
  - O `DataTable` do DS pagina no cliente, e aqui a paginação é no servidor.
- **Estado de filtros e página na URL** (`useQueryState`): links compartilháveis, recarregar não perde nada e o voltar do navegador funciona.
- **Erros do backend no campo certo:** `fieldErrors()` transforma `details` do envelope em `{campo: mensagem}`, e o foco vai para o primeiro campo inválido.
- **O backend é a autoridade.** O front esconde ou desabilita ações pelo que a API devolve (`allowed_transitions`, `can_edit`, `can_assign`), sem reimplementar a matriz. Um 409 (alguém mudou o caso antes) recarrega o estado real.
- **Sessão:**
  - token em `localStorage`, restaurado com `/api/auth/me` ao recarregar;
  - a sessão expira sozinha no `exp` do JWT;
  - qualquer 401 com token volta ao login com o motivo ("sessão expirou" / "encerrada");
  - sair numa aba sai nas outras;
  - API fora do ar **não** desloga: mostra "tentar novamente".
- **a11y básica:**
  - estado nunca só por cor (badges sempre com rótulo);
  - diálogo com foco preso, Esc e retorno do foco;
  - `aria-live` nas contagens das listas;
  - título da aba por tela;
  - skip link do `AppShell`;
  - verificação com axe-core em todas as telas.
- **JavaScript com JSDoc, sem TypeScript**, para caber no prazo.

**Trade-off do token em `localStorage`.**
- Um XSS consegue ler o token.
- A alternativa, cookie `httpOnly` + `SameSite`, protege disso, mas exige proteção CSRF e um fluxo de refresh.
- Para um console interno de demo, com o front e a API na mesma origem atrás do nginx, ficou o mais simples. A mitigação é não injetar HTML (o React escapa por padrão) e limitar a validade do token (8 h, configurável).
- Em produção eu iria de cookie `httpOnly` com refresh token rotativo.

**Infra**
- O Compose sobe na ordem db → backend → frontend, cada um esperando o anterior ficar *healthy*.
- O seed roda sob `pg_advisory_xact_lock`, seguro com mais de uma réplica subindo junto.
- O nginx serve o build do front e repassa `/api`, com fallback de SPA para o `index.html`.

## 9. O que ficaria para depois

- **Rate limit no login** e bloqueio progressivo por tentativas (hoje não há limite).
- **Cookie `httpOnly` + refresh token** no lugar do token em `localStorage`; revogação de sessão.
- **Escopo por responsável:** hoje o analista age em qualquer caso, não só nos atribuídos a ele. Faz sentido como regra de produto, mas o enunciado não pedia.
- **Testes de front no CI** (Playwright com os roteiros das etapas 5 e 6) e testes de componente.
- **Deploy público** (por exemplo, Fly.io/Render + Postgres gerenciado) com segredos no provedor.
- **Busca e paginação em escala:** paginação por cursor (keyset) para filas grandes, e busca full-text em português (`tsvector`) além dos trigramas.
- **Anexos e evidências** no caso (upload para storage de objetos), e exportação do dossiê.
- **Notificações** de prazo vencendo; SLA configurável por política, não fixo por nível.
- **Auditoria de leitura** (quem viu qual caso), comum em KYC.
- **Seed com prazos mais variados:** hoje quase todos os casos ativos da demo já nascem vencidos.

## 10. Estrutura do repositório

```
backend/                 API FastAPI (uv)
  app/                   main, config, db, models, schemas, cases (regras), errors,
                         deps, security, observability, pagination, validators, seed
  app/routers/           auth, entities, cases, summary, users
  migrations/versions/   0001_initial, 0002_case_deadlines_and_search
  tests/                 pytest (Postgres real)
frontend/                React + Vite + Tailwind
  src/ds/                ponte com o bundle do Design System
  src/api/ src/auth/     cliente HTTP, sessão e rotas protegidas
  src/layout/ src/pages/ shell e telas
  src/components/ src/lib/  peças de domínio, diálogo, toasts, hooks e formatação
docker/db-init/          cria o banco riskops_test
docs/                    relatório de cada etapa (etapa-1.md … etapa-7.md) e pendências
.github/workflows/ci.yml lint + testes + build
_ds_bundle.*, styles.css, tokens/, components/, guidelines/   Design System (intocado)
PLANO.md · SPEC.md · NOTES.md · DESIGN_SYSTEM.md
```

O histórico de commits segue as etapas do [`PLANO.md`](PLANO.md). Cada etapa tem um relatório em `docs/etapa-N.md`, com as verificações feitas e um roteiro "Como validar".
