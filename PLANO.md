# Nsights Risk Ops — Plano de implementação do MVP

Console interno para analistas gerenciarem casos de risco/KYC (ver `SPEC.md`). Stack fixa:
React + Vite + Tailwind · FastAPI · PostgreSQL + SQLAlchemy + Alembic · uv · Docker Compose.
Visual a partir do Design System importado (ver `DESIGN_SYSTEM.md`). Prazo: 1–3 dias.

Decisões já confirmadas:
- **Commits:** um commit ao fim de cada etapa, num branch `main` criado a partir de `43f87a4` (o checkout atual está em HEAD destacado).
- **README:** o README do DS foi renomeado para `DESIGN_SYSTEM.md`; a raiz recebe o README da aplicação.
- **Regra de papel:** só `admin` aprova/reprova e reatribui responsável.

---

## Diagnóstico do repositório (verificado)

**O que já existe:** apenas o Design System, num único commit.
- `_ds_bundle.js`: IIFE gerada pelo esbuild que expõe `window.RiskOpsUI` (120 componentes). Lê `window.React` **no momento em que carrega** (shim `require_react_shim`, linha ~57) e implementa `jsx/jsxs` com `React.createElement`. Não usa ReactDOM nem portais.
- `styles.css` faz `@import` de `tokens/tokens.css` e de `_ds_bundle.css`. O `_ds_bundle.css` já traz o **Preflight do Tailwind v4.3.3** copiado sem alterações e um `@import` do Google Fonts (Geist e Geist Mono).
- `components/<grupo>/<Nome>/`: os `.jsx` só reexportam `window.RiskOpsUI`, então não há fonte ESM para importar. Os `.d.ts` têm os props reais e os `.prompt.md` têm exemplos.
- `_vendor/react.js`: React 19.2.8, usado só nas páginas de preview.
- As telas `Screen*` não aceitam props e trazem os dados embutidos. **Servem de referência de composição, não de tela pronta.** Os primitivos aceitam dados controlados: AppShell, Sidebar, Topbar, OperationalPage, PageHeader, Toolbar, WorkspaceSearch, WorkspaceFilter, DataTable, Table, Pagination, Field, Button, Modal, Toast, Alert, Badge, StatusPill, MetricGrid, MetricTile, EmptyState e Skeleton.

**Arquivos que não devem ser carregados no app:** `revisao/patch-normalizacao.css` e `tokens-estado.css` (propostas de auditoria), `uploads/Nsights Design System/` (outra versão do DS), `ds-card-fixes.js`, `_preview/` e os `*.html` (ferramentas das fichas).

**O que falta:** toda a aplicação, ou seja, backend, frontend, banco, migrations, seed, Docker, testes, `.env.example`, README da aplicação e `NOTES.md`.

**Requisitos do SPEC.md além do pedido inicial:** ReDoc e Swagger com tags, descrições e exemplos; migration inicial mais pelo menos uma evolução; CORS; schema de erro padronizado. Diferenciais: logging estruturado, `/health`, request-id, a11y, estados de loading/erro/vazio, CI e índices.

---

## Decisões técnicas

**Estrutura do repo:** os arquivos do DS ficam intocados na raiz. Entram `backend/`, `frontend/`, `docker-compose.yml`, `.env.example`, `README.md`, `NOTES.md` e `.github/workflows/ci.yml`.

**Integração do DS no Vite:**
- `react@19.2.x` do npm, a mesma major do vendor, com `resolve.dedupe: ['react', 'react-dom']`.
- `src/ds/react-global.js` contém `import React from 'react'; window.React = React;`.
- `src/ds/index.js` faz `import './react-global.js'; import '@ds/_ds_bundle.js';` e depois `export const { ... } = window.RiskOpsUI;`. A ordem de avaliação dos módulos ESM garante que o React global exista antes do bundle, e só existe uma instância de React.
- CSS: `@ds/styles.css` mais Tailwind v4 **sem preflight** (`@import "tailwindcss/theme" layer(theme); @import "tailwindcss/utilities" layer(utilities);`). Tailwind entra só para layout responsivo; as cores vêm sempre dos tokens `var(--*)`.
- Alias `@ds` apontando para a raiz do repo e `server.fs.allow: ['..']`. O build Docker do front usa a raiz como contexto, com `.dockerignore` restritivo.
- JavaScript com JSDoc, sem TypeScript, para ganhar tempo.

**Backend:** estrutura plana em `app/`: `main`, `config`, `db`, `models`, `schemas`, `security`, `deps`, `errors`, `seed`, e `routers/` com `auth`, `entities`, `cases`, `summary` e `users`. As regras de status ficam numa única função `transition_case()`. Bibliotecas: SQLAlchemy 2 (síncrono, psycopg 3), pydantic-settings, PyJWT e `pwdlib[argon2]`.

**Modelo de dados:**
- `users`: name, email (único), password_hash, role (`analyst` ou `admin`), is_active.
- `entities`: kind (`PF` ou `PJ`), document (único, só dígitos, com dígito verificador validado), name.
- `cases`: code (único, ex.: `RK-2026-0001`), entity_id, title, status, risk_score (0–100), risk_level (derivado do score), assignee_id, created_at, updated_at, due_at, closed_at.
- `case_events`: case_id, author_id, type (`note`, `status_change`, `assignment`, `update`), message, payload (jsonb), created_at.

**Status:** `aberto → em_analise → aprovado | reprovado`, mais `em_analise → aberto` para devolver um caso. Estados terminais não mudam mais. Só o admin aprova, reprova e reatribui.

**Nível de risco:** derivado do score: baixo abaixo de 40, médio abaixo de 70, alto a partir de 70.

**Autenticação:** `POST /api/auth/login` recebe um formulário OAuth2 password, o que faz o botão Authorize do Swagger funcionar, e devolve um JWT HS256 com expiração. Também há `GET /api/auth/me`. O front guarda o token em `localStorage`; o trade-off frente a um cookie httpOnly fica documentado no README.

**Erros:** envelope único `{"error": {"code", "message", "details", "request_id"}}`.

**Containers:**
- `db`: postgres:16-alpine, volume `pgdata`, healthcheck com `pg_isready`, script de init que cria também `riskops_test`.
- `backend`: Python 3.12-slim com uv. Sobe com `alembic upgrade head`, depois o seed, depois uvicorn. Healthcheck em `/health`.
- `frontend`: build Vite servido por nginx, com proxy de `/api` para o backend.
- O compose usa defaults `${VAR:-...}` para funcionar num clone limpo sem `.env`.

---

## Plano de implementação

### Etapa 1 — Esqueleto e infraestrutura

**Riscos e pontos de atenção a resolver antes:**
- **HEAD destacado:** criar o branch `main` a partir de `43f87a4` e incluir no primeiro commit o rename `README.md → DESIGN_SYSTEM.md`, que já está no working tree.
- **Contexto de build do frontend na raiz:** o DS fica fora de `frontend/` e o repo tem 11 MB. Definir `.dockerignore` restritivo (`.git`, `uploads/`, `revisao/`, `_preview/`, `node_modules`, `backend/`) antes de escrever o Dockerfile.
- **Ordem de inicialização:** usar `depends_on` com `condition: service_healthy` (db → backend → frontend). Se não, o backend tenta migrar antes de o Postgres aceitar conexões.
- **Segredos:** definir que `JWT_SECRET` e as senhas do banco só têm defaults de desenvolvimento, marcados como tal, e que `.env` entra no `.gitignore`.

**Entregáveis:** `backend/` (uv init, FastAPI com `/health`), `frontend/` (Vite, React e Tailwind v4), Dockerfiles, `docker-compose.yml`, `.env.example`, `.gitignore`, `.dockerignore`.

**Critérios de aceite:**
- `docker compose up --build` num clone limpo sobe os 3 serviços como healthy.
- `/health` responde 200 com o banco acessível.
- O front abre uma página que carrega o CSS do DS.

### Etapa 2 — Banco, modelos, migrations e seed

**Riscos e pontos de atenção a resolver antes:**
- **Testes em Postgres real**, não SQLite, por causa de jsonb, enums e índices. O banco `riskops_test` precisa ser criado no init do container.
- **Enums no Alembic:** enums nativos do Postgres complicam o downgrade e a evolução. Decisão: `String` com `CheckConstraint`, mais simples de migrar.
- **Migration de evolução real** (exigência do SPEC): reservar para a `0002` algo com sentido, como `due_at`, `closed_at` e um índice de busca em `lower(name)`, em vez de criar tudo na `0001`.
- **Idempotência do seed:** upsert por chave natural (email, documento, código do caso). CPF e CNPJ do seed precisam ter dígitos verificadores válidos, porque a validação vai rejeitá-los.
- **Fuso horário:** colunas `timestamptz` e datas em UTC desde a primeira migration.

**Entregáveis:** models, `0001_initial`, `0002_*`, `app/seed.py` e a execução de migrations e seed no entrypoint do backend.

**Critérios de aceite:**
- `alembic upgrade head` e `alembic downgrade base` funcionam num banco vazio.
- Rodar o seed duas vezes não altera as contagens.
- Os dados persistem após `docker compose down` seguido de `up`.

### Etapa 3 — Autenticação, autorização e base transversal

**Riscos e pontos de atenção a resolver antes:**
- **Formato do erro definido antes das rotas:** handlers para `HTTPException`, `RequestValidationError` e exceções de domínio, para que todas as rotas já nasçam no envelope padrão.
- **Login compatível com Swagger:** usar `OAuth2PasswordRequestForm` (campo `username` recebe o email) para o Authorize do `/docs` funcionar.
- **Enumeração de usuários:** a mesma mensagem e o mesmo 401 para email inexistente e para senha errada. Usuário inativo não autentica.
- **CORS:** origens vindas de `CORS_ORIGINS` no env, sem `*` junto com credenciais.

**Entregáveis:** hash argon2, JWT, `/api/auth/login` e `/api/auth/me`, `get_current_user`, `require_role`, envelope de erro, middleware de request-id, logging JSON, CORS e o fixture de testes (pytest com `riskops_test`).

**Critérios de aceite:**
- Login inválido devolve 401 no envelope padrão.
- Rota protegida sem token devolve 401; token de analista em rota de admin devolve 403.
- O Authorize do `/docs` funciona.
- Os testes de autenticação passam.

### Etapa 4 — API de domínio

**Riscos e pontos de atenção a resolver antes:**
- **Matriz de transições e papéis fechada** antes de codificar, num lugar só (`transition_case()`). Transição inválida devolve 409; transição sem permissão devolve 403.
- **Edição de caso terminal:** casos aprovados ou reprovados não podem ser editados (409).
- **Consistência do evento:** a mudança de status ou de responsável e o evento correspondente gravados na mesma transação.
- **Paginação e busca eficientes:** offset/limit com `total`, ordenação por uma lista fechada de campos (evita injeção via `sort`), joins com `selectinload` no detalhe para evitar N+1.
- **Documentação:** tags, descrições e `examples` adicionados junto com cada schema, não no fim.

**Entregáveis:**
- Entidades: criar, listar, buscar e detalhar, com validação de CPF/CNPJ.
- Casos: listagem com filtros (`q`, `status`, `risk_level`, `assignee_id`), paginação e ordenação; detalhe com eventos; criação; edição parcial; transição de status; notas.
- `GET /api/summary` com contagens por status, risco e responsável.
- `GET /api/users` para a atribuição de responsável.

**Critérios de aceite:**
- O pytest cobre o fluxo principal: criar entidade, criar caso, colocar em análise, o analista tenta aprovar e recebe 403, o admin aprova, o evento é registrado, uma transição inválida devolve 409.
- `/redoc` e `/openapi.json` mostram tags, descrições e exemplos.

### Etapa 5 — Integração do DS e shell do frontend

**Riscos e pontos de atenção a resolver antes:**
- **React global e ordem de carga:** se o bundle carregar antes de `window.React`, quebra; se existirem duas cópias de React, os hooks falham. Antes de tudo, validar o loader com um componente que tem estado (Sidebar expandir/recolher).
- **Conflito entre Tailwind e o CSS do DS:** carregar Tailwind sem preflight e só as camadas theme e utilities. O CSS do DS, fora de layer, vence na cascata. Utilitários só para layout.
- **Telas `Screen*` são estáticas:** compor com primitivos, lendo o `.prompt.md` e o `.d.ts` de cada um antes de usar.
- **Navegação da Sidebar:** usar `onNavigate` para integrar com o React Router, sem recarregar a página.
- **Fontes via Google Fonts:** sem rede, o navegador usa a fonte de fallback. Não bloqueia; documentar.

**Entregáveis:** loader do bundle, importação do CSS, AppShell com Sidebar, Topbar e MobileNavigation, router, cliente `fetch` com token e tratamento de 401, contexto de autenticação, tela de Login e rotas protegidas.

**Critérios de aceite:**
- Login real com os usuários do seed.
- Recarregar a página mantém a sessão; um token expirado volta ao login.
- Nenhum erro de React duplicado no console.
- O layout funciona em 375px e no desktop.

### Etapa 6 — Telas de negócio

**Riscos e pontos de atenção a resolver antes:**
- **`DataTable` com paginação no servidor:** verificar se aceita total e página controlados de forma limpa. Se não aceitar, usar `Table`, `TableScroll`, `Pagination` e `Toolbar`.
- **Regras do DS:** estado nunca indicado só por cor (badge sempre com rótulo), ícones via `<Icon>`, identificadores e datas com a classe `mono`.
- **Erros de validação do backend:** mapear `details` do envelope para o `error` do `Field` correspondente.
- **Ações por papel:** o front esconde ou desabilita o que o papel não pode fazer, mas a autoridade continua sendo o backend.
- **Estado na URL:** filtros e página na query string, para links compartilháveis e para o botão voltar funcionar.

**Entregáveis:** Resumo (MetricGrid com as contagens), lista de casos, detalhe com timeline, ações de status e notas, formulário de criar e editar, entidades (lista e cadastro), estados de loading, erro e vazio, e a11y básica.

**Critérios de aceite:**
- O fluxo completo funciona pelo navegador com analista e com admin.
- Filtros e paginação refletem na URL.
- Erros do backend aparecem no campo correspondente.

### Etapa 7 — Documentação, CI e acabamento

**Riscos e pontos de atenção a resolver antes:**
- **Reprodutibilidade:** validar o README seguindo-o a partir de um clone limpo (`git clone` em diretório temporário), não do working tree atual.
- **CI sem segredos:** o GitHub Actions usa um service Postgres com credenciais de teste e não depende de `.env`.
- **NOTES.md fiel:** registrar prompts, acertos e correções reais ao longo das etapas, não reconstruídos no fim.

**Entregáveis:**
- `README.md`: como rodar e testar, credenciais demo, variáveis de ambiente, decisões de arquitetura e o que ficaria para depois.
- `NOTES.md`, com 5 a 10 linhas.
- CI com ruff, pytest e build do front.

**Critérios de aceite:**
- Seguir o README do zero reproduz o ambiente.
- `docker compose run --rm backend uv run pytest` passa.
- O CI passa.

---

## Verificação final

1. Num clone limpo, `docker compose up --build` sobe os 3 serviços como healthy.
2. No front: entrar como analista e como admin; criar entidade e caso; mudar o status; anotar; ver a timeline; confirmar que o analista recebe erro ao aprovar.
3. `/docs`, `/redoc` e `/openapi.json` estão acessíveis.
4. Os testes passam; o seed rodado duas vezes não duplica dados; os dados sobrevivem a um restart.
