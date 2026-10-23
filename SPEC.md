# Desafio técnico — Risk Ops Console (sênior)

## Contexto
Na n-sights a área de **Risk Ops** faz KYC/KYP e análise de risco. Queremos um mini-produto
interno: um **console para analistas gerenciarem casos de risco**. Você vai construí-lo do zero.

O enunciado é propositalmente **enxuto no "como"**: queremos ver as suas decisões de arquitetura,
qualidade e produto. Use IA à vontade (Claude Code, inclusive) — faz parte do que avaliamos.

## O que construir (domínio)
Um app web para gerenciar **Casos de Risco**. O mínimo do domínio:

- **Entidade analisada**: pessoa (CPF) ou empresa (CNPJ), com nome e identificador.
- **Caso**: vinculado a uma entidade, com **status** (ex.: aberto → em análise → aprovado/reprovado),  **nível de risco** (baixo/médio/alto ou score), analista responsável e datas.
- **Timeline/eventos** do caso (anotações, mudanças de status).
- **Listagem** com busca, filtro (status/risco) e paginação; **detalhe** com a timeline;
  **criar/editar**; e uma **visão de resumo** (contagens por status/risco).
Você pode ajustar o modelo — justifique as escolhas no README.

## Stack obrigatório (não negociável)
- **Frontend:** React + Vite + Tailwind, **responsivo** (mobile → desktop).
- **Backend:** Python + **FastAPI**, com **autenticação na API** (login + rotas protegidas).
- **Banco:** **PostgreSQL** com **SQLAlchemy** + **Alembic** (migrations versionadas).
- **Gerência de pacotes do backend:** **uv**.
- **Documentação da API:** exponha **OpenAPI** (`/openapi.json`) e uma página **ReDoc**, além do
  Swagger. As rotas devem ter tags, descrições e exemplos.
- **Design System:** use o **"Nsights Risk Ops — Design System Custom"** para construir os
  componentes e telas (tokens de cor/tipografia/spacing, componentes, guidelines).
  > ⚠️ Link do Design System: _(o Daniel vai te enviar)_ — abra, leia o README/tokens/componentes
  > e reproduza a identidade nas suas telas.

## Requisitos técnicos (must-have)
- Auth real: login que emite token, rotas protegidas, senha com hash. Pelo menos **2 papéis**
  (ex.: `analista` e `admin`) com **uma diferença de autorização que importe** (ex.: só admin
  reprova/encerra caso).
- Validação de entrada e **respostas de erro consistentes** (schema de erro padronizado).
- **Migrations** com Alembic (inicial + ao menos uma evolução) e um **seed** de dados demo.
- **CORS** configurado corretamente entre front e back.
- **Config por ambiente** (`.env`), com `.env.example`. Nada de segredo commitado.
- Rodar local de forma simples (idealmente `docker compose up` sobe o Postgres, e um README
  claro sobe front e back).

## Diferenciais (o que esperamos de um sênior)
- **Testes** no backend (pytest) cobrindo auth e um fluxo core; testes no front são bônus.
- **Observabilidade-lite**: logging estruturado, `/health`, correlação de request.
- **a11y** básica e estados de loading/erro/vazio no front.
- **CI** (lint + testes) e/ou **deploy** público (back + front + Postgres) com URL.
- Paginação/ordenação eficientes e índices onde fizer sentido.

## Entregáveis
- Repositório Git (pode ser público ou compartilhado) com histórico de commits legível.
- **README**: como rodar (uv, migrations, seed, front, back), variáveis de ambiente, e
  **decisões de arquitetura** (o que você escolheu e por quê, o que deixaria pra depois).
- `.env.example` e script/seed de dados demo.
- **NOTES.md — como você usou o Claude Code**: 5–10 linhas sobre como dirigiu a IA (prompts-chave,
  onde ela ajudou, onde errou e como você corrigiu/revisou). Isso conta na avaliação.



MCP para o Claude acessar o DS:

Use the claude_design MCP (https://api.anthropic.com/v1/design/mcp, auth via /design-login) to import this project:
https://claude.ai/design/p/766a898f-d785-4b8d-8eed-be2e1ad52acb

Focus on these files (the whole project is readable):
- `_adherence.oxlintrc.json`
- `_ds_bundle.css`
- `_ds_bundle.js`
- `_ds_manifest.json`
- `_ds_sync.json`
- `_preview/AiAsk.js`
- `_preview/AiCite.js`
- `_preview/AiCiteMarks.js`
- `_preview/AiConfidence.js`
- `_preview/AiHedge.js`
- `_preview/AiIdentity.js`
- `_preview/AiOpening.js`
- `_preview/AiQuota.js`
- `_preview/AiQuotaBreakdown.js`
- `_preview/AiSpark.js`
- `_preview/AiStream.js`
- `_preview/AiThread.js`
- `_preview/AiTrace.js`
- `_preview/AiTurn.js`
- `_preview/AiVote.js`
- `_preview/Alert.js`
- `_preview/AppShell.js`
- `_preview/Avatar.js`
- `_preview/AvatarStack.js`
- `_preview/Badge.js`
- `_preview/BarChart.js`
- `_preview/BarList.js`
- `_preview/Breadcrumb.js`
- `_preview/Button.js`
- `_preview/ChartLegend.js`
- `_preview/ChartPlot.js`
- `_preview/ChartShell.js`
- `_preview/Checkbox.js`
- `_preview/CheckCard.js`
- `_preview/Chip.js`
- `_preview/CommandPalette.js`
- `_preview/CoveragePill.js`
- `_preview/CoveragePills.js`
- `_preview/DataList.js`
- `Cor - Nsights Risk Ops.html`
- `Design System - Nsights Risk Ops.html`
- `Icones - Nsights Risk Ops.html`
- `README.md`

Implement: the selected files
