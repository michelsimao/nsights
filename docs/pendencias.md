# Pendências acumuladas

Itens deixados para resolver no fim, depois da Etapa 7. Nenhum bloqueia uma etapa seguinte; se algum passar a bloquear, ele é tratado na própria etapa e sai desta lista.

## Para decidir

- **Credenciais demo na tela de login** (Etapa 5): hoje só vão para o README. Opção: exibi-las no rodapé do login.
- **Teste de navegador versionado** (Etapas 5 e 6): os roteiros Playwright da validação (sessão: 26 checagens; fluxo de negócio: 38) ficaram fora do repo. Opção: versioná-los, com ou sem CI.
- **Prazos do seed** (Etapa 4): 17 dos 18 casos ativos já nascem vencidos, o que deixa o painel de demo pouco variado. Ajustar o seed só vale após `docker compose down -v`, porque ele nunca sobrescreve.
- **Analista age em qualquer caso** (Etapa 4), não só nos atribuídos a ele. O plano não restringe.

- **CI nunca rodou no GitHub** (Etapa 7): o repo não tem remoto. O workflow passou no `actionlint` e os passos foram reproduzidos em containers limpos, mas a primeira execução real depende de publicar o repositório (decisão sua: onde e quando).
- **`NOTES.md` é um rascunho na sua voz** (Etapa 7): escrito a partir do que está registrado nos relatórios e nesta sessão. Revise, principalmente o que descreve a sua revisão, antes de entregar.

## Registradas no README (resolvidas na Etapa 7)

- Sem limite de tentativas de login (rate limit) (Etapa 3): seção 9.
- Token JWT em `localStorage`: trade-off frente a cookie httpOnly (Etapa 5): seção 8.

## Conhecidas, sem ação prevista

- Achados do axe-core que vêm do markup/cores do DS, não do app (Etapa 6): `label-content-name-mismatch` no link da marca da `Sidebar` (o texto visível concatena "n-sights" e "Risk Ops"); `color-contrast` em textos do cartão de login (`.auth-card-intro`, `.auth-card-kicker`, rodapé). As telas internas não têm outras violações.
- Avisos `<select>` e `<input>` da regra de aderência nos filtros e formulários (Etapa 6): o DS não tem select nem campo de texto controlados; `WorkspaceFilter` e `Field` recebem o elemento nativo, como no `ScreenAnalyses`.
- O app complementa o CSS do DS em `frontend/src/app.css` (largura do diálogo, `select` dentro de `Field`, quebra de linha da `Toolbar`, coluna de rótulo da `BarList`, `position: relative` no `TableScroll`) (Etapa 6).
- Avisos `<input>` da regra de aderência do DS no login: o DS não tem campo de texto; o próprio `ScreenLogin` usa `<input>` dentro do `Field` (Etapa 5).
- Aviso do build sobre o `@import` de fontes do `_ds_bundle.css`, inofensivo (Etapa 1).
- `npm install` não roda o script de instalação do esbuild (política do npm 11); o build funciona (Etapa 1).
- Aviso de depreciação do `TestClient`, vindo do Starlette (Etapas 1 a 4).
- Com só 30 casos o Postgres não usa os índices de trigramas (Etapas 2 e 4).
- `pg_trgm` não é removida no downgrade, por decisão (Etapa 2).
- Eventos `status_change` do seed sem o `assignment` correspondente (Etapa 4).
- Linhas de log do Alembic em texto puro no start do container (Etapa 3).
- O *Authorize* do Swagger foi verificado por requisição equivalente, não clicando no navegador (Etapa 3).
