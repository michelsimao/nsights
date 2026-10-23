# Etapa 3: autenticação, autorização e base transversal (relatório)

- **Commit:** `f4f7219`, no branch `main`
- **Data:** 2026-10-23
- **Status:** concluída. Todos os critérios de aceite foram atendidos.

## Resultado

A API passa a ter login com JWT, sessão (`/api/auth/me`), controle por papel e uma base comum para as rotas da Etapa 4:
- todo erro sai no envelope `{"error": {"code", "message", "details", "request_id"}}`;
- toda resposta leva o header `X-Request-ID`;
- os logs são JSON, uma linha por evento, com o request-id.

## Verificações

| Verificação | Resultado |
|---|---|
| Login com usuário do seed (`admin@nsights.demo` / `riskops123`) | 200, JWT + dados do usuário |
| Login com senha errada | 401 `invalid_credentials` no envelope, com `WWW-Authenticate: Bearer` |
| Email inexistente, senha errada e usuário inativo | mesma resposta 401; tempo de resposta igual (~53 ms nos três casos) |
| `/api/auth/me` sem token | 401 `not_authenticated` |
| Token expirado, com assinatura errada, `alg: none`, lixo | 401 `token_expired` / `invalid_token` |
| Token de usuário desativado ou com papel alterado | deixa de valer / passa a valer o papel novo já na próxima requisição |
| Token de analista em rota de admin | 403 `forbidden` |
| Rota inexistente, método errado, corpo inválido | 404, 405 e 422 no envelope; o 422 lista `{field, location, message, type}` |
| Exceção não tratada | 500 `internal_error`, sem vazar a mensagem; o traceback vai para o log com o mesmo request-id |
| `X-Request-ID` enviado pelo cliente | reaproveitado se for seguro (até 64 caracteres `[A-Za-z0-9._-]`); senão, um novo é gerado |
| CORS | origem de `CORS_ORIGINS` liberada (inclusive em respostas de erro); outras origens, não |
| Swagger: `securitySchemes` | `OAuth2PasswordBearer` com `tokenUrl: /api/auth/login`; a requisição que o *Authorize* envia (form com `grant_type=password`) devolve o token |
| `/docs`, `/redoc`, `/openapi.json` | 200; rotas com tag, descrição, exemplos e respostas de erro documentadas |
| Login pelo nginx do front (`localhost:5173/api/...`) | 200 |
| Testes (local e no container) | 52 passaram (33 novos) |
| `ruff check` e `ruff format --check` | ok |

## O que foi criado

- **`app/errors.py`:**
  - `AppError(status, code, message, details)` para erros de domínio.
  - Handlers para `AppError`, `HTTPException` (inclusive 404/405 do roteamento) e `RequestValidationError`.
  - Códigos estáveis (`not_found`, `validation_error`, `forbidden`, ...) e mensagens em pt-BR.
  - `error_responses(401, 403, ...)` documenta o envelope no OpenAPI de cada rota.
- **`app/observability.py`:**
  - `JsonFormatter`: `ts`, `level`, `logger`, `message`, `request_id` e os campos passados em `extra=`.
  - `configure_logging()`: os logs do uvicorn passam pelo mesmo formato. O access log do uvicorn foi trocado pelo `riskops.access`, que tem método, path, status, duração e request-id. Healthchecks bem-sucedidos só aparecem em `DEBUG`.
  - `RequestIdMiddleware`, em ASGI puro: gera ou reaproveita o id, guarda num `ContextVar`, devolve no header e converte exceções não tratadas em 500 no envelope.
- **`app/security.py`:** `create_access_token` / `decode_access_token` (PyJWT, HS256). Claims: `sub`, `role`, `iat` e `exp`; `sub`, `exp` e `iat` são obrigatórios na validação. Também tem um hash fixo usado quando o email não existe, para o login levar o mesmo tempo.
- **`app/deps.py`:**
  - `get_current_user`: lê o Bearer, valida o token e carrega o usuário do banco. O papel e o `is_active` vêm do banco, não do token.
  - `require_role(*papéis)`, mais os atalhos `CurrentUser` e `AdminUser`, para usar nas rotas da Etapa 4.
- **`app/routers/auth.py`:**
  - `POST /api/auth/login`: `OAuth2PasswordRequestForm`; o campo `username` recebe o email, sem diferenciar maiúsculas.
  - `GET /api/auth/me`.
- **`app/schemas.py`:** `UserOut` e `TokenOut`, com exemplos.
- **`app/main.py`:** handlers, middlewares (CORS por fora do request-id), router de auth e a descrição da API explicando autenticação e erros.
- **Configuração:**
  - `JWT_SECRET` fora de `development` precisa ter 32 caracteres ou mais e não pode ser o default do repo; senão a API não sobe. O erro de validação não imprime os valores da configuração (`hide_input_in_errors`), para não vazar senha do banco ou segredo no log.
  - O default de desenvolvimento foi alongado para 32+ bytes. O PyJWT avisa quando a chave HMAC é curta.
- **Testes:**
  - `test_auth.py`: login, não enumeração, tokens inválidos, papéis e login com os usuários do seed.
  - `test_infra.py`: envelope (404, 405, 422, 500), request-id, log JSON, CORS, OpenAPI e a validação do segredo.
  - Fixtures `client` e `make_user` no `conftest.py`; `tests/helpers.py` com `login` e `auth_header`.
- **Dependências:** `pyjwt` e `python-multipart` (exigido pelo FastAPI para formulários).

## O que mudou em relação ao plano

- **CORS sem `allow_credentials`:** o token vai no header `Authorization`, não em cookie, então credenciais de CORS não são necessárias. Métodos e headers liberados são uma lista fechada, não `*`.
- **401 com códigos distintos** (`not_authenticated`, `invalid_token`, `token_expired`, `invalid_credentials`): o front consegue mostrar "sessão expirada" sem tratar texto. Nenhum deles revela se um email existe.
- **Papel lido do banco a cada requisição:** o `role` no token é só informativo. Rebaixar ou desativar um usuário vale na hora, sem esperar o token expirar.
- **`require_role` testado num app mínimo:** ainda não existe rota de admin real. A Etapa 4 usa `AdminUser` nas rotas de aprovar, reprovar e reatribuir.
- **Log do seed também em JSON**, com as contagens num campo estruturado (`created_counts`).

## Pendências menores

- Sem limite de tentativas de login (rate limit). Fica registrado para o README, em "o que ficaria para depois".
- O *Authorize* do Swagger foi verificado pela requisição equivalente (curl e teste do `securitySchemes`), não clicando no navegador. O passo 4 do "Como validar" faz pelo navegador.
- As linhas de log do Alembic, no start do container, continuam em texto puro: vêm do `alembic.ini`, antes de a aplicação configurar o logging.
- Continua o aviso de depreciação do `TestClient`, vindo do Starlette.

## Próxima etapa

Etapa 4: API de domínio. Entidades, casos (listagem com filtros, paginação e ordenação; detalhe com eventos; criação; edição; transições de status; notas), `/api/summary` e `/api/users`, com o fluxo principal coberto por pytest.

## Como validar

Rode os comandos na raiz do repo.

### 1. Subir e conferir os logs JSON
```bash
docker compose up --build -d
docker compose ps                                    # 3 serviços (healthy)
docker compose logs backend | tail -5                # linhas JSON (uvicorn e seed)
```

### 2. Login e sessão
```bash
curl -s -X POST localhost:8000/api/auth/login -d 'username=admin@nsights.demo&password=riskops123'
# espera: {"access_token": "...", "token_type": "bearer", "expires_in": 28800, "user": {..., "role": "admin"}}

TOKEN=$(curl -s -X POST localhost:8000/api/auth/login \
  -d 'username=analista@nsights.demo&password=riskops123' | python3 -c 'import sys,json;print(json.load(sys.stdin)["access_token"])')
curl -s localhost:8000/api/auth/me -H "Authorization: Bearer $TOKEN"   # Rafael Lima, role analyst
```

### 3. Erros no envelope padrão
```bash
curl -si -X POST localhost:8000/api/auth/login -d 'username=admin@nsights.demo&password=errada'
# espera: 401, WWW-Authenticate: Bearer, X-Request-ID e
#         {"error":{"code":"invalid_credentials","message":"Email ou senha inválidos.","details":null,"request_id":"..."}}
curl -s -X POST localhost:8000/api/auth/login -d 'username=nao@existe.com&password=x'   # mesma resposta
curl -s localhost:8000/api/auth/me                                   # 401 not_authenticated
curl -s localhost:8000/api/auth/me -H 'Authorization: Bearer xyz'   # 401 invalid_token
curl -s localhost:8000/api/nao-existe                                # 404 not_found
curl -s -X POST localhost:8000/api/auth/login -d 'username=a'        # 422, details: [{"field":"password",...}]
```

### 4. Authorize do Swagger (navegador)
Abra http://localhost:8000/docs → **Authorize** → `username` = `admin@nsights.demo`, `password` = `riskops123` → **Authorize**. Depois, em `GET /api/auth/me` → **Try it out** → **Execute**: espera 200 com os dados da Marina Costa.

### 5. Request-id
```bash
curl -si localhost:8000/health -H 'X-Request-ID: meu-trace-1' | grep -i x-request-id   # meu-trace-1
docker compose logs backend | grep meu-trace-1        # nada: /health com 200 só loga em DEBUG
curl -s localhost:8000/api/nada -H 'X-Request-ID: meu-trace-2' > /dev/null
docker compose logs backend | grep meu-trace-2        # linha JSON do riskops.access com status 404
```

### 6. CORS
```bash
curl -si -X OPTIONS localhost:8000/api/auth/me -H 'Origin: http://localhost:5173' \
  -H 'Access-Control-Request-Method: GET' -H 'Access-Control-Request-Headers: authorization' | grep -i access-control-allow-origin
# espera: http://localhost:5173
curl -si localhost:8000/health -H 'Origin: https://evil.example' | grep -ic access-control-allow-origin   # 0
```

### 7. Papéis (403)
Ainda não há rota de admin na API; o 403 é coberto pelos testes `test_analista_em_rota_de_admin_403` e `test_papel_vem_do_banco_e_nao_do_token`:
```bash
docker compose exec backend uv run pytest -v tests/test_auth.py -k "admin or papel"
```

### 8. Segredo de produção obrigatório
```bash
docker compose run --rm -e APP_ENV=production backend python -c "import app.main"
# espera: ValidationError ... JWT_SECRET (>= 32 caracteres) é obrigatório fora de development
#         (sem imprimir os valores da configuração)
```

### 9. Testes e lint
```bash
docker compose exec backend uv run pytest -v         # 52 testes, em riskops_test
docker compose exec backend uv run ruff check .
```

### 10. Revisar o código
```bash
git show --stat f4f7219
```
Os arquivos principais são:
- `backend/app/errors.py`
- `backend/app/observability.py`
- `backend/app/security.py`
- `backend/app/deps.py`
- `backend/app/routers/auth.py`
- `backend/tests/test_auth.py`
- `backend/tests/test_infra.py`
