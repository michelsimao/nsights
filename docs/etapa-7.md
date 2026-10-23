# Etapa 7: documentação, CI e acabamento (relatório)

- **Commit:** `792e757`, no branch `main`
- **Data:** 2026-10-23
- **Status:** concluída. Os critérios de aceite foram atendidos, com uma ressalva: o CI ainda não rodou no GitHub, porque o repositório não tem remoto. Os passos dele foram reproduzidos localmente, em containers limpos.

## Resultado

- **`README.md`** da aplicação:
  - como subir com Docker e sem Docker;
  - credenciais demo;
  - testes, lint e CI;
  - variáveis de ambiente;
  - a API (autenticação, envelope de erro, rotas, matriz de transições);
  - modelo de dados com justificativas;
  - decisões de arquitetura, incluindo o trade-off do token em `localStorage`;
  - o que ficaria para depois;
  - estrutura do repo e 4 capturas de tela em `docs/img/`.
- **`NOTES.md`:** como o Claude Code foi dirigido (plano, etapas com portão de aprovação, onde ajudou, onde errou, como foi revisado). É um **rascunho na sua voz**: revise antes de entregar.
- **`.github/workflows/ci.yml`:** dois jobs.
  - `backend`: `uv sync --frozen`, `ruff check`, `ruff format --check` e `pytest`, com um service Postgres 16.
  - `frontend`: `npm ci` e `npm run build`.
  - Não usa `.env` nem segredos.

## Verificações

| Verificação | Resultado |
|---|---|
| README seguido a partir de um `git clone` limpo (outro projeto compose, portas 5437/8004/5177) | 3 serviços *healthy*; `/docs`, `/redoc`, `/openapi.json` e `/health` respondem 200; front 200; as 3 credenciais demo autenticam; o seed cria 3 usuários, 12 entidades, 30 casos e 70 eventos |
| `docker compose run --rm backend uv run pytest` (critério de aceite), no clone | 114 testes passaram |
| Roteiro de navegador da Etapa 6 contra o clone | 38 checagens passaram |
| Seção "Rodar sem Docker", no clone | `uv sync`, `alembic upgrade head`, seed, `uvicorn` e `pytest` locais ok; `npm ci` e `npm run dev` com `VITE_API_PROXY` funcionando |
| `actionlint` no workflow | sem apontamentos |
| Passos do job `backend` num clone limpo (imagem `uv:0.8.2` + `postgres:16-alpine`, como no CI) | ruff ok, formatação ok, 114 testes passaram |
| Passos do job `frontend` num clone limpo (`node:24`) | `npm ci` e build ok |
| Execução real no GitHub Actions | **não feita**: o repo não tem remoto (ver "Pendências") |

## O que foi criado

- `README.md`, `NOTES.md` e `.github/workflows/ci.yml`.
- `docs/img/`: `resumo.png`, `casos.png`, `caso.png` e `mobile-caso.png`, capturadas da stack local.
- `docs/pendencias.md` atualizado:
  - os dois itens "para registrar no README" foram registrados (seções 8 e 9);
  - entraram o CI pendente de execução real e a revisão do `NOTES.md`.

## O que mudou em relação ao plano

- **Validação do CI sem GitHub.** O plano previa "o CI passa". Sem remoto, os passos foram reproduzidos com as mesmas imagens, e o YAML foi validado com `actionlint`. Publicar o repositório é uma ação externa, por isso fica para você decidir.
- **README além do mínimo:**
  - tabela de rotas e matriz de transições;
  - modelo de dados justificado (o SPEC pede que as escolhas sejam justificadas);
  - seção "Rodar sem Docker" com migrations novas;
  - capturas de tela.
- **CI sem job de imagem Docker.** O plano pede ruff, pytest e build do front. Construir as imagens no CI dobraria o tempo do job, e o build Docker foi validado no clone limpo.

## Pendências

Estão em `docs/pendencias.md`, para resolvermos agora que as etapas acabaram. As que pedem decisão sua:
1. **Publicar o repo e ver o CI rodar no GitHub.**
2. **Revisar o `NOTES.md`.**
3. **Credenciais demo na tela de login.**
4. **Versionar os roteiros Playwright** (e, opcionalmente, rodá-los no CI).
5. **Prazos do seed:** quase todos os casos ativos nascem vencidos.
6. **Analista agir só nos casos atribuídos a ele.** Hoje está registrado no README como "para depois".

## Como validar

### 1. Seguir o README do zero
Use outras portas para não colidir com a stack que já está rodando:
```bash
git clone /home/michel/nsights /tmp/riskops-readme && cd /tmp/riskops-readme
export COMPOSE_PROJECT_NAME=riskops-readme POSTGRES_HOST_PORT=5437 BACKEND_HOST_PORT=8004 FRONTEND_HOST_PORT=5177
docker compose up --build -d && docker compose ps             # 3 serviços (healthy)
curl -s localhost:8004/health                                 # {"status":"ok","database":"ok"}
docker compose run --rm backend uv run pytest -q              # 114 passed
```
Abra http://localhost:5177 e entre com `admin@nsights.demo` / `riskops123`.

Para limpar:
```bash
docker compose down -v && cd - && rm -rf /tmp/riskops-readme
```

### 2. Passos do CI, localmente
```bash
cd backend && uv run ruff check . && uv run ruff format --check . && uv run pytest -q && cd ..
cd frontend && npm ci && npm run build && cd ..
docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:latest   # sem saída = sem problemas
```
O `pytest` local usa o banco do compose em `localhost:5433`.

### 3. Ler
- `README.md`: confira se as decisões e o "para depois" representam o que você defenderia na avaliação.
- `NOTES.md`: ajuste para a sua voz.

### 4. Revisar o código
```bash
git show --stat 792e757
```
