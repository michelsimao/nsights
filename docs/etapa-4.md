# Etapa 4: API de domínio (relatório)

- **Commit:** `PENDENTE`, no branch `main`
- **Data:** 2026-10-23
- **Status:** concluída. Todos os critérios de aceite foram atendidos.

## Resultado

A API cobre o domínio inteiro:
- entidades: cadastro com validação de CPF/CNPJ, listagem com busca e detalhe;
- casos: listagem com filtros, paginação e ordenação; detalhe com timeline; abertura; edição parcial; transições de status; reatribuição; notas;
- resumo para o painel e lista de usuários para atribuição.

Todas as rotas exigem autenticação e respondem erros no envelope da Etapa 3.

## Rotas

| Método | Rota | Quem | Observação |
|---|---|---|---|
| GET | `/api/entities` | todos | `q` (nome ou documento), `kind`, `sort`, paginação; traz contagem de casos |
| POST | `/api/entities` | todos | documento com ou sem máscara; 422 em `document` se inválido; 409 `entity_exists` se duplicado |
| GET | `/api/entities/{id}` | todos | entidade, contagens e casos |
| GET | `/api/cases` | todos | `q`, `status` (repetível), `risk_level` (repetível), `assignee` (`id`, `me`, `none`), `entity_id`, `overdue`, `sort`, `page`, `page_size` |
| POST | `/api/cases` | todos | analista só deixa sem responsável ou atribui a si mesmo |
| GET | `/api/cases/{ref}` | todos | `ref` = id ou código (`RK-2026-0001`); timeline, `allowed_transitions`, `can_edit`, `can_assign` |
| PATCH | `/api/cases/{ref}` | todos | título, descrição, score, prazo; 409 `case_closed` se encerrado |
| POST | `/api/cases/{ref}/status` | conforme a matriz | 409 `invalid_transition` / `case_closed`; 403 por papel |
| POST | `/api/cases/{ref}/assignee` | admin | `null` remove o responsável |
| POST | `/api/cases/{ref}/notes` | todos | permitido também em caso encerrado |
| GET | `/api/summary` | todos | por status, risco (ativos), responsável (ativos) e atrasados |
| GET | `/api/users` | todos | usuários ativos, filtro `role` |

## Matriz de transições

Definida num único lugar, `TRANSITIONS` em `app/cases.py`, e aplicada só por `transition_case()`.

| de | para | quem |
|---|---|---|
| aberto | em_analise | analista, admin |
| em_analise | aberto | analista, admin (devolve o caso para a fila) |
| em_analise | aprovado | admin |
| em_analise | reprovado | admin, com justificativa obrigatória |

- O par (de, para) não existe na matriz: 409 `invalid_transition`, com as transições permitidas em `details`. Se o caso já está encerrado: 409 `case_closed`.
- O par existe, mas o papel não pode: 403 `forbidden`.
- Quem inicia a análise de um caso sem responsável passa a ser o responsável (evento `assignment`).

## Verificações

| Verificação | Resultado |
|---|---|
| Fluxo do critério de aceite (pytest) | criar entidade → criar caso → analista coloca em análise → analista tenta aprovar (403, nada muda) → admin aprova → eventos na ordem certa → transição sobre caso encerrado (409) |
| Mutação: liberar "aprovar" para analista | o teste do fluxo falha, ou seja, o teste pega a regressão |
| Matriz completa (7 combinações parametrizadas) | 200, 403 ou 409 conforme a tabela |
| Edição de caso encerrado | 409 `case_closed` |
| Caso e evento na mesma transação | um único `commit` por operação; a linha do caso é travada (`SELECT … FOR UPDATE`) antes de validar |
| Filtros, busca, paginação e ordenação sobre o seed | resultados corretos; `sort` fora da lista, `page=0`, `page_size=101`, status desconhecido → 422 |
| `%` na busca | tratado como texto, não curinga |
| N+1 | o número de queries da listagem é igual com 2 e com 30 itens; o detalhe é igual com 1 e com 4 eventos |
| `/redoc`, `/docs`, `/openapi.json` | 200; um teste exige `summary`, `description` e tag em toda rota, `examples` nos schemas de entrada e o envelope nos erros |
| Smoke na stack (curl) | resumo, listagem filtrada, detalhe com `allowed_transitions` e 403 do analista conferidos |
| `alembic check` | sem diferença entre modelos e migrations |
| Roteiro do "Como validar" numa stack limpa (outro projeto compose, outras portas) | todas as saídas conferem com o esperado |
| Testes (local e no container) | 114 passaram (62 novos) |
| `ruff check` e `ruff format --check` | ok |

## O que foi criado

- **`app/cases.py`** (regras de negócio): matriz `TRANSITIONS`, `transition_case()`, `create_case()`, `update_case()`, `assign_case()`, `add_note()`, `allowed_transitions()` e `get_case()`.
  - Cada escrita grava o evento correspondente na mesma sessão. A rota faz um único commit.
  - O evento `update` guarda o antes e o depois de cada campo alterado. Edição sem mudança real não gera evento.
  - O evento `assignment` guarda `{id, name}` do responsável anterior e do novo, para a timeline não depender de joins.
  - O prazo padrão é a abertura mais 3, 7 ou 15 dias, conforme o nível de risco.
- **`app/routers/`:** `entities.py`, `cases.py`, `summary.py` e `users.py`. São finos: validam a entrada, chamam o serviço e devolvem o detalhe relido do banco.
- **`app/pagination.py`:** parâmetros `page`/`page_size` (máx. 100), contagem do total e escape de `%`, `_` e `\` na busca.
- **`app/schemas.py`:** `Page[T]`, referências (`UserRef`, `EntityRef`), schemas de entrada com `examples` e de saída. Também:
  - `is_overdue` calculado na resposta;
  - `CaseUpdate` com `extra="forbid"`: mandar `status` ou `assignee_id` no PATCH dá 422, porque eles têm rotas próprias.
- **`app/errors.py`:**
  - `field_error()` para erros de regra no mesmo formato da validação;
  - mensagens de validação em pt-BR para os erros mais comuns do Pydantic (campo obrigatório, valor fora da lista, mínimo/máximo, tamanho, data sem fuso), já que o front vai exibi-las no campo. Os demais tipos mantêm o texto do Pydantic, sem o prefixo `Value error, `.
- **`app/models.py`:** timeline ordenada por `(created_at, id)`, porque eventos da mesma transação têm o mesmo `created_at`. Não muda o schema.
- **Testes:** `test_cases.py`, `test_entities.py` e `test_summary_users.py`, mais o teste de documentação em `test_infra.py`. Fixtures `admin`, `analyst`, `admin_h` e `analyst_h`; helpers `create_entity`, `create_case` e `set_status`.

## O que mudou em relação ao plano

- **Transição pela rota `POST /cases/{ref}/status`** e reatribuição por `POST /cases/{ref}/assignee`, separadas do PATCH. Assim cada regra de papel tem um ponto de entrada e um evento próprios.
- **Detalhe aceita id ou código** (`/api/cases/RK-2026-0001`), para o front ter URLs legíveis.
- **O detalhe devolve `allowed_transitions`, `can_edit` e `can_assign`** para o usuário atual. O front da Etapa 6 mostra só os botões válidos sem duplicar a matriz; o backend continua sendo a autoridade.
- **Quem inicia a análise assume o caso** se ele estiver sem responsável. Isso é assumir, não reatribuir: não troca um responsável existente.
- **Justificativa obrigatória para reprovar.** Não estava no plano; é uma exigência comum em KYC.
- **Notas permitidas em caso encerrado.** O plano proíbe *editar* caso encerrado; nota não altera o caso, só complementa o histórico.
- **Filtros extras:** `entity_id`, `overdue` e `assignee=me`/`none`, além dos previstos.
- **Mudar o score não recalcula o prazo.** O `risk_level` muda (coluna gerada), mas `due_at` só muda se for enviado no PATCH, para o prazo não "pular" sem ninguém decidir.

## Pendências menores

- **Prazos do seed:** dos 18 casos ativos do seed, 17 já estão vencidos (aberturas de 3 a 58 dias atrás, com SLA de no máximo 15 dias). O resumo funciona, mas o painel de demo fica pouco variado. Ajustar o seed não altera bancos existentes (ele nunca sobrescreve); só vale após `docker compose down -v`. Posso ajustar se quiser.
- Os eventos `status_change` do seed não têm o `assignment` correspondente; só os casos criados pela API têm.
- Analistas podem agir em qualquer caso, não só nos atribuídos a eles. O plano não restringe; fica registrado.
- Com só 30 casos, o Postgres não usa os índices de trigramas (varredura sequencial é mais barata nesse volume).
- Continua o aviso de depreciação do `TestClient`, vindo do Starlette.

## Próxima etapa

Etapa 5: integração do Design System e shell do frontend. Loader do bundle, AppShell com Sidebar/Topbar, router, cliente `fetch` com token, contexto de autenticação, login e rotas protegidas.

## Como validar

Rode os comandos na raiz do repo. Os passos 2 a 7 usam as variáveis do passo 1.

### 1. Subir e obter tokens
```bash
docker compose up --build -d && docker compose ps     # 3 serviços (healthy)
B=localhost:8000
tok() { curl -s -X POST $B/api/auth/login -d "username=$1&password=riskops123" | python3 -c 'import sys,json;print(json.load(sys.stdin)["access_token"])'; }
ADM="Authorization: Bearer $(tok admin@nsights.demo)"
ANA="Authorization: Bearer $(tok analista@nsights.demo)"
J='Content-Type: application/json'
```

### 2. Resumo e listagem
```bash
curl -s $B/api/summary -H "$ANA"                      # by_status soma 30
curl -s "$B/api/cases?status=em_analise&risk_level=alto&sort=-risk_score&page_size=3" -H "$ANA"
curl -s "$B/api/cases?q=rota%20sul" -H "$ANA" | python3 -c 'import sys,json;print({c["entity"]["name"] for c in json.load(sys.stdin)["items"]})'
# {'Transportes Rota Sul Ltda.'}
curl -s "$B/api/cases?sort=nome" -H "$ANA"            # 422 no campo sort: "Valor inválido. Opções: ..."
```

### 3. Entidade (validação de CPF/CNPJ)
```bash
curl -s -X POST $B/api/entities -H "$ANA" -H "$J" -d '{"kind":"PF","document":"529.982.247-26","name":"Teste"}'
# 422, details: [{"field":"document","message":"CPF inválido",...}]
curl -s -X POST $B/api/entities -H "$ANA" -H "$J" -d '{"kind":"PJ","document":"12.345.678/0001-95","name":"Exemplo Ltda."}'
# 201 com "document":"12345678000195" (rodando de novo: 409 entity_exists com o id)
```

### 4. Fluxo principal
```bash
EID=$(curl -s "$B/api/entities?q=12345678" -H "$ANA" | python3 -c 'import sys,json;print(json.load(sys.stdin)["items"][0]["id"])')
REF=$(curl -s -X POST $B/api/cases -H "$ANA" -H "$J" -d "{\"entity_id\":$EID,\"title\":\"Alerta de PEP\",\"risk_score\":75}" | python3 -c 'import sys,json;print(json.load(sys.stdin)["code"])')
echo $REF                                                                              # RK-2026-0031 (ou seguinte)
curl -s -X POST $B/api/cases/$REF/status -H "$ANA" -H "$J" -d '{"status":"em_analise"}' | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d["status"],d["assignee"],d["allowed_transitions"])'
# em_analise {'id': 2, 'name': 'Rafael Lima'} ['aberto']
curl -s -X POST $B/api/cases/$REF/status -H "$ANA" -H "$J" -d '{"status":"aprovado"}'     # 403 forbidden
curl -s -X POST $B/api/cases/$REF/status -H "$ADM" -H "$J" -d '{"status":"aprovado","message":"Ok."}' | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d["status"],d["closed_at"]);[print(e["type"],e["payload"]) for e in d["events"]]'
# aprovado <data>; timeline: created, status_change, assignment, status_change
curl -s -X POST $B/api/cases/$REF/status -H "$ADM" -H "$J" -d '{"status":"aberto"}'       # 409 case_closed
curl -s -X PATCH $B/api/cases/$REF -H "$ADM" -H "$J" -d '{"title":"Novo"}'               # 409 case_closed
curl -s -X POST $B/api/cases/$REF/notes -H "$ANA" -H "$J" -d '{"message":"Nota pós-encerramento"}'   # 201
```

### 5. Transição inexistente e justificativa
```bash
curl -s -X POST $B/api/cases/RK-2026-0001/status -H "$ADM" -H "$J" -d '{"status":"aprovado"}'
# 409 invalid_transition, details.allowed = ["em_analise"]
curl -s -X POST $B/api/cases/RK-2026-0002/status -H "$ADM" -H "$J" -d '{"status":"reprovado"}'
# 422 no campo "message" (justificativa obrigatória)
```

### 6. Edição e reatribuição
```bash
curl -s -X PATCH $B/api/cases/RK-2026-0002 -H "$ANA" -H "$J" -d '{"risk_score":20}' | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d["risk_level"],d["events"][-1]["payload"])'
# baixo {'changes': {'risk_score': {'to': 20, 'from': 74}}}
curl -s -X PATCH $B/api/cases/RK-2026-0002 -H "$ANA" -H "$J" -d '{"status":"aprovado"}'   # 422 (status tem rota própria)
curl -s -X POST $B/api/cases/RK-2026-0002/assignee -H "$ANA" -H "$J" -d '{"assignee_id":3}'   # 403
curl -s -X POST $B/api/cases/RK-2026-0002/assignee -H "$ADM" -H "$J" -d '{"assignee_id":3}' | python3 -c 'import sys,json;print(json.load(sys.stdin)["assignee"])'
# {'id': 3, 'name': 'Beatriz Souza'}
```

### 7. Documentação
Abra http://localhost:8000/redoc: tags `auth`, `cases`, `entities`, `summary`, `users` e `infra`; em "Mudar status", a tabela de transições; cada rota com exemplos e respostas de erro.

### 8. Testes e lint
```bash
docker compose exec backend uv run pytest -v          # 114 testes, em riskops_test
docker compose exec backend uv run pytest -v tests/test_cases.py::test_fluxo_principal
docker compose exec backend uv run ruff check .
```
Para descartar as alterações feitas na demo: `docker compose down -v && docker compose up -d`.

### 9. Revisar o código
```bash
git show --stat PENDENTE
```
Os arquivos principais são:
- `backend/app/cases.py`
- `backend/app/routers/cases.py`
- `backend/app/routers/entities.py`
- `backend/app/routers/summary.py`
- `backend/tests/test_cases.py`
