# Etapa 2: banco, modelos, migrations e seed (relatório)

- **Commit:** `992f9f8`, no branch `main`
- **Data:** 2026-10-23
- **Status:** concluída. Todos os critérios de aceite foram atendidos.

## Resultado

Ao subir, o backend aplica as migrations (`0001_initial` e `0002_case_deadlines_and_search`), roda o seed idempotente e só então inicia a API.

Num banco vazio, o seed cria:
- 3 usuários (1 admin e 2 analistas);
- 12 entidades (5 pessoas físicas e 7 jurídicas);
- 30 casos, distribuídos por todos os status e níveis de risco;
- 70 eventos de timeline.

Nos starts seguintes não cria nada, e alterações feitas durante a demo são preservadas.

## Verificações

| Verificação | Resultado |
|---|---|
| Stack do zero (`down -v` e `up --build`) | migrations 0001 → 0002 aplicadas; seed criou 3 usuários, 12 entidades, 30 casos e 70 eventos |
| `alembic upgrade head`, `downgrade base`, `upgrade head` | ok |
| `alembic check` (modelos × migrations) | "No new upgrade operations detected" |
| Seed rodado 2× seguidas | a 2ª execução cria `{users: 0, entities: 0, cases: 0, events: 0}` |
| Título de um caso alterado no banco, depois restart do backend | alteração mantida; seed criou 0 |
| `docker compose down` seguido de `up` | dados e alteração mantidos (30 casos) |
| Caso novo criado após o seed | recebe `RK-2026-0031`, sem colidir com o seed; rodar o seed de novo não faz a sequence voltar |
| Evolução `0002` sobre dados existentes (teste) | `due_at` e `closed_at` preenchidos corretamente; CHECK novo rejeita caso aprovado sem `closed_at` |
| Testes no container (`riskops_test`) | 19 passaram; o banco de dev não foi tocado |
| `ruff check` e `ruff format --check` | ok |
| Cópia limpa do repo com outras portas | 3 serviços *healthy*, seed completo |

## O que foi criado

- **`app/models.py`:** `User`, `Entity`, `Case` e `CaseEvent`.
  - SQLAlchemy 2 com `Mapped`.
  - Valores fechados (status, papel, tipo de entidade, tipo de evento) como `String` com `CHECK`, sem enum nativo do Postgres.
  - `risk_level` é uma **coluna gerada** (`GENERATED ALWAYS AS … STORED`) a partir do `risk_score`. O banco é a fonte única da faixa (baixo < 40, médio < 70, alto ≥ 70), e a API não consegue gravar um nível incoerente com o score.
  - `cases.code` tem default no banco: `'RK-' || ano || '-' || nextval('case_code_seq')`.
- **`app/db.py`:** naming convention no `MetaData`, para que constraints e índices tenham nomes determinísticos.
- **`migrations/` (Alembic):**
  - `env.py` lê a URL de `DATABASE_URL`; os testes a sobrescrevem.
  - `0001_initial`: tabelas, FKs, CHECKs, UNIQUEs e índices dos filtros da listagem (`status`, `risk_level`, `assignee_id`, `entity_id`, `created_at DESC`, `(case_id, created_at)` nos eventos).
  - `0002_case_deadlines_and_search`, em cinco passos:
    1. adiciona `due_at` e `closed_at` como nulas;
    2. preenche os casos existentes: `due_at` = abertura + prazo por risco (3, 7 ou 15 dias) e `closed_at` = último `status_change` terminal, ou `updated_at` se não houver evento;
    3. `due_at` passa a ser `NOT NULL`;
    4. CHECK que amarra `closed_at` ao status terminal;
    5. `pg_trgm` com índices GIN em `entities.name` e `cases.title`.
  - O downgrade de cada migration desfaz tudo, exceto a extensão.
- **`app/seed.py`:** segue o desenho combinado.
  - Dados determinísticos e chaves naturais.
  - `ON CONFLICT DO NOTHING … RETURNING`; eventos só para casos recém-criados.
  - Hash de senha só para usuários novos.
  - `setval` com `GREATEST` na sequence dos códigos.
  - Transação única com `pg_advisory_xact_lock`.
- **`app/validators.py`:** normalização e dígitos verificadores de CPF e CNPJ. O seed gera documentos válidos a partir de uma base fixa; a API vai reutilizar esse módulo na Etapa 4.
- **`app/security.py`:** hash e verificação de senha com Argon2id (`pwdlib`). O JWT entra na Etapa 3.
- **`scripts/start.sh`:** `alembic upgrade head`, seed (se `SEED_DEMO=true`) e uvicorn.
- **Configuração:** `SEED_DEMO` e `SEED_DEMO_PASSWORD` adicionados ao compose e ao `.env.example`.
- **Testes:**
  - `conftest.py` aponta tudo para `riskops_test` e recria o schema pelas migrations.
  - `test_migrations.py`: evolução com dados, ciclo completo de migrations e `alembic check`.
  - `test_seed.py`: idempotência, preservação de alterações, sequence e consistência dos dados.
  - `test_validators.py`: CPF e CNPJ válidos e inválidos.

## O que mudou em relação ao plano

- **`risk_level` como coluna gerada no banco**, em vez de calculado no backend. Garante a mesma coerência com menos código; o backend só lê o valor.
- **`created_by_id` em `cases`:** coluna não listada no plano, para registrar quem abriu o caso.
- **Tipo de evento `created`:** também não estava listado. Toda timeline começa com o evento de abertura.
- **`due_at` obrigatório:** na Etapa 4, a API precisa calcular o prazo pelo nível de risco ao criar um caso.
- **SQLAlchemy 2.1:** `Result.tuples()` está depreciado nessa versão; usei `.all()`. Em insert em lote, o `rowcount` vem `-1`, então as contagens do seed usam `RETURNING`.

## Pendências menores

- Com só 30 casos, o Postgres prefere varredura sequencial a usar os índices de trigramas. Os índices estão criados e passam a valer com volume maior; a busca em si entra na Etapa 4.
- A extensão `pg_trgm` não é removida no downgrade (decisão intencional, documentada na migration).
- Continua o aviso de depreciação do `TestClient`, vindo do Starlette.

## Próxima etapa

Etapa 3: autenticação (login com JWT, `/api/auth/me`), `require_role`, envelope de erro padronizado, request-id, logging estruturado e testes de autenticação.

## Como validar

Rode os comandos na raiz do repo.

### 1. Subir do zero e ver migrations e seed
```bash
docker compose down -v && docker compose up --build -d
docker compose ps                                   # 3 serviços (healthy)
docker compose logs backend | grep -E "Running upgrade|seed"
# espera: 0001_initial, 0002_case_deadlines_and_search e
#         "criados: {'users': 3, 'entities': 12, 'cases': 30, 'events': 70}"
```

### 2. Inspecionar o schema
```bash
docker compose exec db psql -U riskops -c '\d cases'
# espera: risk_level "generated always as ... stored", due_at not null, closed_at,
#         índices ix_cases_* (incluindo ix_cases_title_trgm gin) e ck_cases_closed_at_matches_status
docker compose exec db psql -U riskops -c "select version_num from alembic_version"   # 0002_case_deadlines_and_search
```

### 3. Ver os dados de demonstração
```bash
docker compose exec db psql -U riskops -c "select status, risk_level, count(*) from cases group by 1,2 order by 1,2"
docker compose exec db psql -U riskops -c "select email, role from users"
docker compose exec db psql -U riskops -c "select code, status, risk_score, risk_level, created_at::date, due_at::date, closed_at::date from cases order by id limit 6"
```
Os usuários demo são `admin@nsights.demo`, `analista@nsights.demo` e `analista2@nsights.demo`, todos com a senha `riskops123`. O login só existe a partir da Etapa 3.

### 4. Idempotência do seed
```bash
docker compose exec backend python -m app.seed      # espera: criados: {'users': 0, 'entities': 0, 'cases': 0, 'events': 0}
```

### 5. O seed não sobrescreve alterações
```bash
docker compose exec db psql -U riskops -c "update cases set title='Alterado na demo' where code='RK-2026-0001'"
docker compose restart backend && sleep 8
docker compose exec db psql -U riskops -tAc "select title from cases where code='RK-2026-0001'"   # Alterado na demo
```
Para voltar ao estado inicial: `docker compose down -v && docker compose up -d`.

### 6. A sequence não colide com o seed
```bash
docker compose exec db psql -U riskops -c "insert into cases (entity_id, title, risk_score, due_at) values (1, 'Teste', 10, now()) returning code"
# espera: RK-2026-0031
```

### 7. Regras do banco
```bash
# risk_level não aceita escrita direta (coluna gerada): espera erro
docker compose exec db psql -U riskops -c "update cases set risk_level='baixo' where id=1"
# caso terminal sem closed_at: espera violação de ck_cases_closed_at_matches_status
docker compose exec db psql -U riskops -c "update cases set status='aprovado', closed_at=null where id=1"
# CPF com tamanho errado: espera violação de ck_entities_document_format
docker compose exec db psql -U riskops -c "insert into entities (kind, document, name) values ('PF', '123', 'X')"
```

### 8. Ciclo de migrations
```bash
docker compose exec backend alembic downgrade base
docker compose exec backend alembic upgrade head
docker compose exec backend alembic check            # No new upgrade operations detected
docker compose restart backend                       # o seed recria os dados apagados pelo downgrade
```

### 9. Testes e lint
```bash
docker compose exec backend uv run pytest -v          # 19 testes; rodam em riskops_test, não tocam o banco de dev
docker compose exec backend uv run ruff check .
```

### 10. Revisar o código
```bash
git show --stat 992f9f8
```
Os arquivos principais são:
- `backend/app/models.py`
- `backend/migrations/versions/0001_initial.py`
- `backend/migrations/versions/0002_case_deadlines_and_search.py`
- `backend/app/seed.py`
- `backend/tests/test_migrations.py`
- `backend/tests/test_seed.py`
